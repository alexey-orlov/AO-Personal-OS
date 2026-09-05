#!/usr/bin/env python3
"""gsheets.py — the ONE Google Sheets credential, plus a small generic CLI.

Every skill or automation that reads or writes any of Alex's Google Sheets
goes through this file. There is exactly one credential — an OAuth
authorized-user token for Alex's Google account with the read-write
`spreadsheets` scope — and a process finds it in one of two places:

  GSHEETS_TOKEN_JSON  the token JSON inline, raw or base64. This is how a
                      Claude Code cloud session (environment variable) and
                      GitHub Actions (secret of the same name) get it. Wins
                      when set.
  GSHEETS_TOKEN       path of the same JSON on disk — the Mac, where `auth`
                      writes it (automations/gsheets/.work/token.json,
                      git-ignored).

The Sheets API is called with stdlib urllib, so python3 alone is enough
anywhere: Mac, cloud session, CI runner. Only `auth` — the one-time browser
consent that mints the token — needs google-auth-oauthlib, i.e. the venv
that setup.sh builds on the Mac.

CLI (JSON on stdout, diagnostics on stderr):
  auth                            Mac only: browser consent → writes GSHEETS_TOKEN
  check [SHEET_ID]                refresh the token (proves the credential); with
                                  an id, also read that spreadsheet's title + tabs
  info SHEET_ID                   title + tabs (title, sheetId, rows, cols)
  get SHEET_ID RANGE              values as a 2-D array
  update SHEET_ID RANGE < rows    write a 2-D array with its top-left at RANGE
  append SHEET_ID RANGE < rows    append rows below the table that holds RANGE
  clear SHEET_ID RANGE            clear values (formatting stays)
  batch-update SHEET_ID < body    raw spreadsheets.batchUpdate body (or a bare
                                  list of requests): tabs, rows, merges,
                                  formats — the escape hatch for everything else
RANGE is A1 notation with the tab first: 'Sheet1!A1:D10', 'CRM Contacts'.
`update` / `append` parse input like typing (USER_ENTERED: formulas, dates,
numbers); add --raw to store strings verbatim. Rows on stdin are JSON:
[["Name","Score"],["Ann",42]].

Library — from any script in the repo:
  sys.path.insert(0, "<repo>/automations/gsheets"); import gsheets
  gsheets.service()          Sheets handle with googleapiclient's call shapes:
                             svc.spreadsheets().values().get(spreadsheetId=…,
                             range=…).execute()
  gsheets.load_token()       (token_dict, source) — source = env var name or path
  gsheets.fetch_access_token(tok)
  gsheets.SheetsError        .code is the exit code below

Exit codes: 0 ok · 2 bad input / API or network error · 3 credential problem
(missing, malformed, or rejected → re-run `auth` on the Mac, then refresh
every copy of GSHEETS_TOKEN_JSON).
Setup and rotation: automations/gsheets/README.md
"""
import base64
import json
import os
import stat
import sys
import urllib.error
import urllib.parse
import urllib.request

TOKEN_ENV = "GSHEETS_TOKEN_JSON"
# Pre-2026-09 name (gym-log's private copy of the same token). Honoured so
# nothing breaks between the rename and the last copy being updated.
LEGACY_TOKEN_ENVS = ("GYM_SHEETS_TOKEN_JSON",)
ENV_SOURCES = (TOKEN_ENV,) + LEGACY_TOKEN_ENVS

TOKEN_FILE = os.environ.get("GSHEETS_TOKEN", "")
CREDS_FILE = os.environ.get("SHEETS_CREDS", "")
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
API = "https://sheets.googleapis.com/v4/spreadsheets"
TOKEN_URL = "https://oauth2.googleapis.com/token"
README = "automations/gsheets/README.md"


class SheetsError(Exception):
    """Anything that must stop the caller. `code` is the exit-code convention
    shared by every Sheets script in the repo: 2 = bad input or API/network
    error (retry-able, never a fact about the data), 3 = credential problem
    (only Alex can fix it — re-`auth` on the Mac, then refresh the copies)."""

    def __init__(self, msg, code=2):
        super().__init__(msg)
        self.code = code


# ---- credential ----------------------------------------------------------

def is_file_source(src):
    """True when load_token() read the JSON from a file (so a refreshed token
    can be written back); False when it came from an env var."""
    return src not in ENV_SOURCES


def _parse(raw, src):
    raw = raw.strip()
    if not raw.startswith("{"):
        try:
            raw = base64.b64decode("".join(raw.split())).decode()
        except Exception:
            raise SheetsError(f"credential in {src} is neither JSON nor base64-encoded JSON", 3)
    try:
        tok = json.loads(raw)
    except Exception as e:
        raise SheetsError(f"credential in {src} is not valid JSON ({e})", 3)
    if not isinstance(tok, dict):
        raise SheetsError(f"credential in {src} is not a JSON object", 3)
    missing = [k for k in ("client_id", "client_secret", "refresh_token") if not tok.get(k)]
    if missing:
        raise SheetsError(f"credential in {src} is missing {', '.join(missing)}", 3)
    return tok


def load_token():
    """Return (token_dict, source): the authorized-user JSON and where it came
    from — an env var name (GSHEETS_TOKEN_JSON first, then the legacy name)
    or the GSHEETS_TOKEN file path."""
    for name in ENV_SOURCES:
        raw = os.environ.get(name, "")
        if raw.strip():
            return _parse(raw, f"${name}"), name
    if TOKEN_FILE and os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE) as f:
            return _parse(f.read(), TOKEN_FILE), TOKEN_FILE
    raise SheetsError(
        f"no Google Sheets credential: set ${TOKEN_ENV} (cloud-session env var / CI secret) "
        f"or run `gsheets.py auth` on the Mac to create GSHEETS_TOKEN={TOKEN_FILE!r} — {README}", 3)


def fetch_access_token(tok):
    """Exchange the long-lived refresh token for a ~1h access token."""
    data = urllib.parse.urlencode({
        "client_id": tok["client_id"], "client_secret": tok["client_secret"],
        "refresh_token": tok["refresh_token"], "grant_type": "refresh_token",
    }).encode()
    req = urllib.request.Request(
        tok.get("token_uri") or TOKEN_URL, data=data,
        headers={"Content-Type": "application/x-www-form-urlencoded"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read().decode())["access_token"]
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")[:200]
        raise SheetsError(
            f"token refresh rejected ({e.code}: {detail}) — the refresh token is stale or "
            f"revoked: re-run `gsheets.py auth` on the Mac, then refresh every copy of "
            f"${TOKEN_ENV} ({README})", 3)
    except Exception as e:
        raise SheetsError(
            f"token refresh failed ({type(e).__name__}: {e}) — network, not the credential; retry", 2)


# ---- transport (stdlib) --------------------------------------------------
# One code path everywhere. Call shapes mirror googleapiclient's
# svc.spreadsheets().values().get(...).execute(), so a consumer written
# against the Google client library works unchanged.

def _http(method, path, token, query=None, body=None):
    url = API + path + (("?" + urllib.parse.urlencode(query, doseq=True)) if query else "")
    payload = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=payload, method=method, headers={
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json; charset=utf-8"})
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            return json.loads(r.read().decode() or "{}")
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")[:400]
        raise SheetsError(f"Sheets API {method} {path} → {e.code}: {detail}",
                          3 if e.code in (401, 403) else 2)
    except Exception as e:
        raise SheetsError(f"Sheets API {method} {path} failed ({type(e).__name__}: {e})", 2)


def _q(kw):
    q = {k: v for k, v in kw.items() if v is not None}
    return q or None


class _Call:
    """Deferred request — googleapiclient hands back an object you .execute()."""

    def __init__(self, *args):
        self.args = args

    def execute(self):
        return _http(*self.args)


class _Values:
    def __init__(self, token):
        self.token = token

    @staticmethod
    def _path(spreadsheetId, range):
        return f"/{spreadsheetId}/values/{urllib.parse.quote(range, safe='')}"

    def get(self, spreadsheetId, range, **kw):
        return _Call("GET", self._path(spreadsheetId, range), self.token, _q(kw))

    def batchGet(self, spreadsheetId, ranges, **kw):
        return _Call("GET", f"/{spreadsheetId}/values:batchGet", self.token,
                     _q(dict(kw, ranges=ranges)))

    def update(self, spreadsheetId, range, body, valueInputOption="USER_ENTERED", **kw):
        return _Call("PUT", self._path(spreadsheetId, range), self.token,
                     _q(dict(kw, valueInputOption=valueInputOption)), body)

    def append(self, spreadsheetId, range, body, valueInputOption="USER_ENTERED",
               insertDataOption="INSERT_ROWS", **kw):
        return _Call("POST", self._path(spreadsheetId, range) + ":append", self.token,
                     _q(dict(kw, valueInputOption=valueInputOption,
                             insertDataOption=insertDataOption)), body)

    def clear(self, spreadsheetId, range, body=None):
        return _Call("POST", self._path(spreadsheetId, range) + ":clear", self.token,
                     None, body or {})

    def batchUpdate(self, spreadsheetId, body):
        return _Call("POST", f"/{spreadsheetId}/values:batchUpdate", self.token, None, body)

    def batchClear(self, spreadsheetId, body):
        return _Call("POST", f"/{spreadsheetId}/values:batchClear", self.token, None, body)


class _Sheets:
    def __init__(self, token):
        self.token = token

    def spreadsheets(self):
        return self

    def values(self):
        return _Values(self.token)

    def get(self, spreadsheetId, **kw):          # fields=, ranges=, includeGridData=
        return _Call("GET", f"/{spreadsheetId}", self.token, _q(kw))

    def batchUpdate(self, spreadsheetId, body):
        return _Call("POST", f"/{spreadsheetId}:batchUpdate", self.token, None, body)


def service():
    """The shared credential → a Sheets API handle. Raises SheetsError."""
    tok, _src = load_token()
    return _Sheets(fetch_access_token(tok))


# ---- one-time consent (Mac) ---------------------------------------------

def run_consent_flow():
    """Browser consent → writes the authorized-user JSON to GSHEETS_TOKEN.
    Needs google-auth-oauthlib (setup.sh's venv) and the OAuth client file."""
    try:
        from google_auth_oauthlib.flow import InstalledAppFlow
    except ImportError:
        raise SheetsError(
            "google-auth-oauthlib is not installed — run automations/gsheets/setup.sh, then "
            "`source automations/gsheets/config.sh && \"$PYTHON_BIN\" \"$GSHEETS\" auth`", 2)
    if not TOKEN_FILE:
        raise SheetsError("GSHEETS_TOKEN is not set — source automations/gsheets/config.sh first", 2)
    if not (CREDS_FILE and os.path.exists(CREDS_FILE)):
        raise SheetsError(
            f"no OAuth client at SHEETS_CREDS={CREDS_FILE!r} — see {README}, 'OAuth client'", 3)
    flow = InstalledAppFlow.from_client_secrets_file(CREDS_FILE, SCOPES)
    creds = flow.run_local_server(port=0, prompt="consent")
    os.makedirs(os.path.dirname(TOKEN_FILE), exist_ok=True)
    with open(TOKEN_FILE, "w") as f:
        f.write(creds.to_json())
    os.chmod(TOKEN_FILE, stat.S_IRUSR | stat.S_IWUSR)
    return {"ok": True, "token": TOKEN_FILE, "scopes": SCOPES, "next": [
        "A new refresh token invalidates the old one everywhere — re-copy it now:",
        f"  base64 < {TOKEN_FILE} | tr -d '\\n' | pbcopy",
        f"  claude.ai/code → cloud icon → gear on the environment → Environment variables → "
        f"{TOKEN_ENV}=<paste> → Save changes → start a new session",
        f"  GitHub → repo Settings → Secrets and variables → Actions → {TOKEN_ENV} = <paste>",
        f"  {README}",
    ]}


# ---- CLI ------------------------------------------------------------------

USAGE = """usage: gsheets.py <command> [args] [--raw]
  auth | check [SHEET_ID] | info SHEET_ID | get SHEET_ID RANGE
  update SHEET_ID RANGE < rows.json | append SHEET_ID RANGE < rows.json
  clear SHEET_ID RANGE | batch-update SHEET_ID < body.json
(full reference: the docstring at the top of this file)"""


def _stdin_json(what):
    raw = sys.stdin.read()
    if not raw.strip():
        raise SheetsError(f"expected {what} on stdin", 2)
    try:
        return json.loads(raw)
    except Exception as e:
        raise SheetsError(f"stdin is not valid JSON ({e})", 2)


def _stdin_rows():
    rows = _stdin_json("a 2-D JSON array of rows")
    if not isinstance(rows, list) or not all(isinstance(r, list) for r in rows):
        raise SheetsError('expected a 2-D JSON array of rows, e.g. [["Name","Score"],["Ann",42]]', 2)
    return rows


def _need(args, n, what):
    if len(args) < n:
        raise SheetsError(f"missing argument: {what}\n{USAGE}", 2)


def info(svc, sheet_id):
    meta = svc.spreadsheets().get(
        spreadsheetId=sheet_id, fields="properties.title,sheets.properties").execute()
    tabs = []
    for s in meta.get("sheets", []):
        p = s.get("properties", {})
        g = p.get("gridProperties", {})
        tabs.append({"title": p.get("title"), "sheetId": p.get("sheetId"),
                     "rows": g.get("rowCount"), "cols": g.get("columnCount")})
    return {"id": sheet_id, "title": meta.get("properties", {}).get("title"), "tabs": tabs}


def check(args):
    tok, src = load_token()
    svc = _Sheets(fetch_access_token(tok))
    scopes = tok.get("scopes") or []
    out = {"ok": True, "credential_source": src, "scopes": scopes,
           "write": (any(s.rstrip("/").endswith("/auth/spreadsheets") for s in scopes)
                     if scopes else None)}
    if args:
        out["spreadsheet"] = info(svc, args[0])
    return out


def main(argv):
    raw = "--raw" in argv
    argv = [a for a in argv if a != "--raw"]
    cmd, args = (argv[0] if argv else ""), argv[1:]
    vio = "RAW" if raw else "USER_ENTERED"
    try:
        if cmd == "auth":
            out = run_consent_flow()
        elif cmd == "check":
            out = check(args)
        elif cmd == "info":
            _need(args, 1, "SHEET_ID")
            out = dict(ok=True, **info(service(), args[0]))
        elif cmd == "get":
            _need(args, 2, "SHEET_ID RANGE")
            resp = service().spreadsheets().values().get(
                spreadsheetId=args[0], range=args[1], majorDimension="ROWS").execute()
            out = {"ok": True, "range": resp.get("range"), "values": resp.get("values", [])}
        elif cmd == "update":
            _need(args, 2, "SHEET_ID RANGE")
            rows = _stdin_rows()
            resp = service().spreadsheets().values().update(
                spreadsheetId=args[0], range=args[1], body={"values": rows},
                valueInputOption=vio).execute()
            out = dict(ok=True, **resp)
        elif cmd == "append":
            _need(args, 2, "SHEET_ID RANGE")
            rows = _stdin_rows()
            resp = service().spreadsheets().values().append(
                spreadsheetId=args[0], range=args[1], body={"values": rows},
                valueInputOption=vio).execute()
            out = dict(ok=True, **resp)
        elif cmd == "clear":
            _need(args, 2, "SHEET_ID RANGE")
            resp = service().spreadsheets().values().clear(
                spreadsheetId=args[0], range=args[1]).execute()
            out = dict(ok=True, **resp)
        elif cmd == "batch-update":
            _need(args, 1, "SHEET_ID")
            body = _stdin_json("a spreadsheets.batchUpdate body")
            if isinstance(body, list):
                body = {"requests": body}
            resp = service().spreadsheets().batchUpdate(spreadsheetId=args[0], body=body).execute()
            out = dict(ok=True, **resp)
        else:
            raise SheetsError(USAGE, 2)
    except SheetsError as e:
        sys.stderr.write(f"[gsheets] {e}\n")
        print(json.dumps({"ok": False, "error": str(e)}, ensure_ascii=False))
        return e.code
    print(json.dumps(out, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
