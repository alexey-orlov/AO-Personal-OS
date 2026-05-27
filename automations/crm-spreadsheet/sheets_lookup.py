#!/usr/bin/env python3
"""sheets_lookup.py — enrich a contact list from Alex's CRM Google Sheet.

Contract: JSON in on stdin, JSON out on stdout, stderr for diagnostics.
Always exits 0 — auth / API failures degrade to `matched:false` for every
contact so the orchestrator can proceed without enrichment.

Input shape:
  {"contacts": [
     {"raw": "...", "name": "...", "email": "...", "lin_url": null}
   ],
   "sheet_id": "...",
   "contacts_tab": "CRM Contacts",
   "accounts_tab": "CRM Accounts"}

Output shape:
  {"enriched": [
     {"raw": "...", "matched": true,
      "match_strategy": "email-exact" | "lin-exact" | "fuzzy-name" | "none" | "error",
      "match_confidence": 1.0,
      "row": {"name": "...", "email": "...", "lin_url": "...",
              "company": "...", "angle": "...", "last_touch_date": "...",
              "<any-other-column>": "..."},
      "account": {"company": "...", "<any-other-account-column>": "..."}
     }
   ],
   "errors": ["..."]}

Env (set by config.sh):
  SHEETS_CREDS   OAuth Desktop-app client_secret JSON path
  SHEETS_TOKEN   refreshable user token JSON path (written on first run)
"""
import json
import os
import re
import sys
from pathlib import Path


CREDS = os.environ.get("SHEETS_CREDS", "")
TOKEN = os.environ.get("SHEETS_TOKEN", "")

SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

# Column-name synonyms. Header strings from the sheet are normalized
# (lowercased, non-alphanumeric stripped) before lookup. Unknown columns
# pass through into `row` verbatim under their original header.
COLUMN_SYNONYMS = {
    "name": {"name", "fullname", "contact", "contactname", "displayname"},
    "email": {"email", "emailaddress", "mail", "personalemail", "workemail"},
    "lin_url": {"linkedin", "linkedinurl", "linurl", "linkedinprofile", "lin", "linkedinlink"},
    "company": {"company", "account", "companyname", "accountname", "org", "organization"},
    "angle": {"angle", "notes", "angleornotes", "context", "anglenotes", "comment", "comments"},
    "last_touch_date": {
        "lasttouch", "lasttouchdate", "lastcontact", "lastcontacted",
        "lastcontactdate", "lasttouched", "lastinteraction",
    },
}


def _normalize_header(s):
    return re.sub(r"[^a-z0-9]", "", (s or "").lower())


def _build_header_map(raw_headers):
    """Return: {canonical_field: column_index, ...} plus raw_headers preserved.

    Unknown columns are still kept under their original header name so the
    orchestrator can see them — useful if the sheet has columns the synonym
    map doesn't know about yet.
    """
    mapping = {}
    for idx, raw in enumerate(raw_headers):
        norm = _normalize_header(raw)
        for canonical, synonyms in COLUMN_SYNONYMS.items():
            if norm in synonyms and canonical not in mapping:
                mapping[canonical] = idx
                break
    return mapping


def _row_to_dict(row, raw_headers, header_map):
    """Project a row (list of cell strings) into a dict.

    Canonical fields (name, email, lin_url, company, angle, last_touch_date)
    appear under their canonical key. Every other column appears under its
    original header (verbatim).
    """
    out = {}
    for canonical, idx in header_map.items():
        out[canonical] = row[idx] if idx < len(row) else ""

    # Pass-through everything else under original header names.
    mapped_indices = set(header_map.values())
    for idx, header in enumerate(raw_headers):
        if idx in mapped_indices:
            continue
        if not header:
            continue
        value = row[idx] if idx < len(row) else ""
        if value:
            out[header] = value
    return out


def _normalize_lin_url(url):
    if not url:
        return ""
    s = url.strip().lower()
    s = re.sub(r"^https?://", "", s)
    s = re.sub(r"^www\.", "", s)
    s = s.split("?", 1)[0]
    s = s.rstrip("/")
    return s


def _sheets_service():
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build

    creds = None
    if TOKEN and Path(TOKEN).exists():
        creds = Credentials.from_authorized_user_file(TOKEN, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not (CREDS and Path(CREDS).exists()):
                raise RuntimeError(
                    f"no Google OAuth client at SHEETS_CREDS={CREDS!r}. "
                    "Drop a Desktop-app credentials.json into .work/sheets/."
                )
            flow = InstalledAppFlow.from_client_secrets_file(CREDS, SCOPES)
            creds = flow.run_local_server(port=0)
        if TOKEN:
            Path(TOKEN).parent.mkdir(parents=True, exist_ok=True)
            Path(TOKEN).write_text(creds.to_json())
    return build("sheets", "v4", credentials=creds, cache_discovery=False)


def _read_tab(svc, sheet_id, tab_name):
    """Return (raw_headers, [row, row, ...]) for an entire tab.

    Trailing-empty cells in a row are not returned by the Sheets API, so
    downstream code must tolerate row lengths shorter than header length.
    """
    rng = f"'{tab_name}'"
    resp = svc.spreadsheets().values().get(
        spreadsheetId=sheet_id,
        range=rng,
        majorDimension="ROWS",
    ).execute()
    values = resp.get("values", [])
    if not values:
        return [], []
    return values[0], values[1:]


def _match_contact(contact, contacts_rows, headers, header_map):
    """Run the priority-ordered matching algorithm. Returns a dict shaped per
    the output contract (without the `account` field, which is joined later).
    """
    raw = contact.get("raw", "")
    input_email = (contact.get("email") or "").strip().lower()
    input_lin = _normalize_lin_url(contact.get("lin_url") or "")
    input_name = (contact.get("name") or "").strip()

    # Build candidates with their indices for "newest by last_touch_date" tiebreak.
    candidates_by_email = []
    candidates_by_lin = []
    for row in contacts_rows:
        row_dict = _row_to_dict(row, headers, header_map)
        row_email = (row_dict.get("email") or "").strip().lower()
        row_lin = _normalize_lin_url(row_dict.get("lin_url") or "")
        if input_email and row_email == input_email:
            candidates_by_email.append(row_dict)
        if input_lin and row_lin and row_lin == input_lin:
            candidates_by_lin.append(row_dict)

    def _pick_newest(cands):
        # ISO-date sort works lexically; missing dates sort last.
        return sorted(cands, key=lambda r: r.get("last_touch_date") or "", reverse=True)[0]

    if candidates_by_email:
        if len(candidates_by_email) > 1:
            sys.stderr.write(
                f"[sheets_lookup] {raw!r}: {len(candidates_by_email)} email matches, taking newest\n"
            )
        return {
            "raw": raw, "matched": True, "match_strategy": "email-exact",
            "match_confidence": 1.0, "row": _pick_newest(candidates_by_email),
        }

    if candidates_by_lin:
        if len(candidates_by_lin) > 1:
            sys.stderr.write(
                f"[sheets_lookup] {raw!r}: {len(candidates_by_lin)} LIN-URL matches, taking newest\n"
            )
        return {
            "raw": raw, "matched": True, "match_strategy": "lin-exact",
            "match_confidence": 1.0, "row": _pick_newest(candidates_by_lin),
        }

    # Fuzzy-name fallback. Only run if we have an input name AND no exact hit.
    if input_name:
        try:
            from rapidfuzz import process, fuzz

            row_dicts = [_row_to_dict(r, headers, header_map) for r in contacts_rows]
            names = [(r.get("name") or "").strip() for r in row_dicts]
            indexed = [(n, i) for i, n in enumerate(names) if n]
            if indexed:
                scored = process.extract(
                    input_name,
                    [n for n, _ in indexed],
                    scorer=fuzz.WRatio,
                    limit=3,
                )
                # scored: [(matched_name, score, position_in_indexed_list), ...]
                top = [s for s in scored if s[1] >= 85]
                if len(top) >= 2 and (top[0][1] - top[1][1]) < 5:
                    sys.stderr.write(
                        f"[sheets_lookup] {raw!r}: ambiguous fuzzy-name match "
                        f"({top[0][0]!r}={top[0][1]} vs {top[1][0]!r}={top[1][1]})\n"
                    )
                    return {
                        "raw": raw, "matched": False,
                        "match_strategy": "none", "match_confidence": 0.0,
                    }
                if top:
                    matched_name, score, pos = top[0]
                    orig_idx = indexed[pos][1]
                    return {
                        "raw": raw, "matched": True,
                        "match_strategy": "fuzzy-name",
                        "match_confidence": score / 100.0,
                        "row": row_dicts[orig_idx],
                    }
        except ImportError:
            sys.stderr.write("[sheets_lookup] rapidfuzz missing — skipping fuzzy-name fallback\n")

    return {
        "raw": raw, "matched": False,
        "match_strategy": "none", "match_confidence": 0.0,
    }


def _attach_account(enriched_entry, accounts_rows, acc_headers, acc_header_map):
    """If the contact's row has a `company`, look it up in CRM Accounts and
    attach the joined record as `account`. Missing match = no `account` field.
    """
    row = enriched_entry.get("row") or {}
    company = (row.get("company") or "").strip()
    if not company:
        return
    target = company.lower()
    for acc_row in accounts_rows:
        acc_dict = _row_to_dict(acc_row, acc_headers, acc_header_map)
        acc_company = (acc_dict.get("company") or "").strip().lower()
        if acc_company == target:
            enriched_entry["account"] = acc_dict
            return


def main():
    try:
        payload = json.load(sys.stdin)
    except Exception as e:
        sys.stdout.write(json.dumps({
            "enriched": [], "errors": [f"bad stdin JSON: {e}"]
        }))
        return 0

    contacts = payload.get("contacts") or []
    sheet_id = payload.get("sheet_id") or ""
    contacts_tab = payload.get("contacts_tab") or "CRM Contacts"
    accounts_tab = payload.get("accounts_tab") or "CRM Accounts"

    if not sheet_id:
        sys.stdout.write(json.dumps({
            "enriched": [
                {"raw": c.get("raw", ""), "matched": False,
                 "match_strategy": "error", "match_confidence": 0.0}
                for c in contacts
            ],
            "errors": ["sheet_id missing in input"],
        }))
        return 0

    errors = []
    try:
        svc = _sheets_service()
    except Exception as e:
        sys.stderr.write(f"[sheets_lookup] auth: {e}\n")
        sys.stdout.write(json.dumps({
            "enriched": [
                {"raw": c.get("raw", ""), "matched": False,
                 "match_strategy": "error", "match_confidence": 0.0}
                for c in contacts
            ],
            "errors": [f"auth: {e}"],
        }))
        return 0

    try:
        c_headers, c_rows = _read_tab(svc, sheet_id, contacts_tab)
    except Exception as e:
        sys.stderr.write(f"[sheets_lookup] read {contacts_tab}: {e}\n")
        sys.stdout.write(json.dumps({
            "enriched": [
                {"raw": c.get("raw", ""), "matched": False,
                 "match_strategy": "error", "match_confidence": 0.0}
                for c in contacts
            ],
            "errors": [f"read {contacts_tab}: {e}"],
        }))
        return 0

    try:
        a_headers, a_rows = _read_tab(svc, sheet_id, accounts_tab)
    except Exception as e:
        sys.stderr.write(f"[sheets_lookup] read {accounts_tab} (non-fatal): {e}\n")
        errors.append(f"read {accounts_tab}: {e}")
        a_headers, a_rows = [], []

    c_header_map = _build_header_map(c_headers)
    a_header_map = _build_header_map(a_headers)

    enriched = []
    for contact in contacts:
        entry = _match_contact(contact, c_rows, c_headers, c_header_map)
        if entry.get("matched") and a_rows:
            _attach_account(entry, a_rows, a_headers, a_header_map)
        enriched.append(entry)

    sys.stdout.write(json.dumps({"enriched": enriched, "errors": errors}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
