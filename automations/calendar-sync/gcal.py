#!/usr/bin/env python3
"""
gcal.py — minimal, dependency-free Google Calendar client for calendar-sync.

Pure stdlib (urllib/http.server) — no pip, no venv. OAuth "installed app" flow:
  * `auth`     one-time: opens the browser, you consent, refresh-token saved to TOKEN_PATH.
  * library:   list_events / create_event / update_event / delete_event, called by run.py.

Credentials (your own Google Cloud "Desktop app" OAuth client) come from env:
  CALSYNC_GOOGLE_CLIENT_ID, CALSYNC_GOOGLE_CLIENT_SECRET  (config.sh reads them from Keychain)
Token cache: CALSYNC_GTOKEN  (default: .work/state/gtoken.json) — refresh token, chmod 600.
"""
import os
import sys
import json
import time
import urllib.parse
import urllib.request

AUTH_URI = "https://accounts.google.com/o/oauth2/v2/auth"
TOKEN_URI = "https://oauth2.googleapis.com/token"
API = "https://www.googleapis.com/calendar/v3"
# events: forward leg writes SS: copies. readonly: reverse leg enumerates calendars +
# reads busy events across all of them (calendarList/freeBusy need more than events scope).
SCOPE = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly"

CLIENT_ID = os.environ.get("CALSYNC_GOOGLE_CLIENT_ID", "")
CLIENT_SECRET = os.environ.get("CALSYNC_GOOGLE_CLIENT_SECRET", "")
TOKEN_PATH = os.environ.get("CALSYNC_GTOKEN") or os.path.expanduser(
    "~/Documents/GitHub/AO-Personal-OS/automations/calendar-sync/.work/state/gtoken.json")
CAL_ID = os.environ.get("CALSYNC_CALENDAR_ID", "orlov.alexej@gmail.com")


def _post(url, data):
    body = urllib.parse.urlencode(data).encode()
    req = urllib.request.Request(url, data=body, method="POST")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


def _api(method, path, payload=None, params=None):
    url = API + path
    if params:
        url += "?" + urllib.parse.urlencode(params)
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", "Bearer " + _access_token())
    if data is not None:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            raw = r.read().decode()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        raise RuntimeError("gcal %s %s -> HTTP %s: %s" % (method, path, e.code, e.read().decode()[:300]))


# --------------------------------------------------------------------------- #
# auth / token
# --------------------------------------------------------------------------- #
def _load_token():
    try:
        with open(TOKEN_PATH) as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def _save_token(tok):
    os.makedirs(os.path.dirname(TOKEN_PATH), exist_ok=True)
    with open(TOKEN_PATH, "w") as f:
        json.dump(tok, f)
    os.chmod(TOKEN_PATH, 0o600)


def _access_token():
    tok = _load_token()
    if tok.get("access_token") and tok.get("expiry", 0) > time.time() + 60:
        return tok["access_token"]
    rt = tok.get("refresh_token")
    if not rt:
        raise RuntimeError("No refresh token — run `gcal.py auth` once.")
    fresh = _post(TOKEN_URI, {"client_id": CLIENT_ID, "client_secret": CLIENT_SECRET,
                              "refresh_token": rt, "grant_type": "refresh_token"})
    tok["access_token"] = fresh["access_token"]
    tok["expiry"] = time.time() + int(fresh.get("expires_in", 3600))
    _save_token(tok)
    return tok["access_token"]


def auth():
    """One-time interactive consent via a localhost redirect; saves the refresh token."""
    import http.server
    import webbrowser
    if not CLIENT_ID or not CLIENT_SECRET:
        sys.exit("Set CALSYNC_GOOGLE_CLIENT_ID / _SECRET first (see setup.sh).")
    port = 8765
    redirect = "http://localhost:%d/" % port
    url = AUTH_URI + "?" + urllib.parse.urlencode({
        "client_id": CLIENT_ID, "redirect_uri": redirect, "response_type": "code",
        "scope": SCOPE, "access_type": "offline", "prompt": "consent"})
    code_box = {}

    class H(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            q = urllib.parse.urlparse(self.path).query
            code_box["code"] = urllib.parse.parse_qs(q).get("code", [None])[0]
            self.send_response(200); self.end_headers()
            self.wfile.write(b"calendar-sync: authorized. You can close this tab.")
        def log_message(self, *a): pass

    print("Opening browser for Google consent...\nIf it doesn't open, visit:\n" + url)
    webbrowser.open(url)
    srv = http.server.HTTPServer(("localhost", port), H)
    srv.handle_request()
    code = code_box.get("code")
    if not code:
        sys.exit("No authorization code received.")
    tok = _post(TOKEN_URI, {"client_id": CLIENT_ID, "client_secret": CLIENT_SECRET,
                            "code": code, "redirect_uri": redirect, "grant_type": "authorization_code"})
    if "refresh_token" not in tok:
        sys.exit("No refresh_token returned (revoke prior access at myaccount.google.com and retry).")
    _save_token({"refresh_token": tok["refresh_token"]})
    print("Saved refresh token to %s — auth complete." % TOKEN_PATH)


def authurl():
    """Print the consent URL only (no local server) — for authorizing from another device."""
    if not CLIENT_ID or not CLIENT_SECRET:
        sys.exit("Set CALSYNC_GOOGLE_CLIENT_ID / _SECRET first.")
    print(AUTH_URI + "?" + urllib.parse.urlencode({
        "client_id": CLIENT_ID, "redirect_uri": "http://localhost:8765/", "response_type": "code",
        "scope": SCOPE, "access_type": "offline", "prompt": "consent"}))


def exchange(arg):
    """Cross-device: exchange an auth code (or the full failed-redirect URL pasted from the
    browser address bar) for a refresh token. Pairs with `authurl`."""
    code = arg.strip()
    if "code=" in code:
        q = urllib.parse.urlparse(code).query or code.split("?", 1)[-1]
        code = urllib.parse.parse_qs(q).get("code", [code])[0]
    tok = _post(TOKEN_URI, {"client_id": CLIENT_ID, "client_secret": CLIENT_SECRET,
                            "code": code, "redirect_uri": "http://localhost:8765/",
                            "grant_type": "authorization_code"})
    if "refresh_token" not in tok:
        sys.exit("No refresh_token returned (code expired/used, or no re-consent — re-run authurl).")
    _save_token({"refresh_token": tok["refresh_token"]})
    print("Saved refresh token to %s — auth complete." % TOKEN_PATH)


# --------------------------------------------------------------------------- #
# calendar ops
# --------------------------------------------------------------------------- #
def list_calendars():
    """Every calendar in the user's list (primary, plus any shared or subscribed calendars).
    Each item carries id, summary, accessRole ('owner'/'reader'/'freeBusyReader'/'writer')."""
    out, page = [], None
    while True:
        p = {"maxResults": 250}
        if page:
            p["pageToken"] = page
        res = _api("GET", "/users/me/calendarList", params=p)
        out.extend(res.get("items", []))
        page = res.get("nextPageToken")
        if not page:
            break
    return out


def list_events(time_min, time_max, max_results=2500, calendar_id=None):
    cal = calendar_id or CAL_ID
    out, page = [], None
    while True:
        p = {"timeMin": time_min, "timeMax": time_max, "singleEvents": "true",
             "maxResults": 250, "showDeleted": "false"}
        if page:
            p["pageToken"] = page
        res = _api("GET", "/calendars/%s/events" % urllib.parse.quote(cal), params=p)
        out.extend(res.get("items", []))
        page = res.get("nextPageToken")
        if not page or len(out) >= max_results:
            break
    return out


def create_event(body):
    return _api("POST", "/calendars/%s/events" % urllib.parse.quote(CAL_ID),
                payload=body, params={"sendUpdates": "none"})


def update_event(event_id, body):
    return _api("PATCH", "/calendars/%s/events/%s" % (urllib.parse.quote(CAL_ID), event_id),
                payload=body, params={"sendUpdates": "none"})


def delete_event(event_id):
    return _api("DELETE", "/calendars/%s/events/%s" % (urllib.parse.quote(CAL_ID), event_id),
                params={"sendUpdates": "none"})


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "auth":
        auth()
    elif cmd == "authurl":
        authurl()
    elif cmd == "exchange" and len(sys.argv) > 2:
        exchange(sys.argv[2])
    elif cmd == "selftest":
        print("access token OK:", _access_token()[:12] + "...")
    else:
        sys.exit("usage: gcal.py {auth|authurl|exchange <code>|selftest}")
