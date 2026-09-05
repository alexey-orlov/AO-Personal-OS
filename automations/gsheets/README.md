# gsheets — the one Google Sheets credential

Shared library: **one credential for every Google Sheet Alex owns**, usable
from every place code runs — the Mac, Claude Code cloud sessions, GitHub
Actions — plus a small generic CLI. Any skill or automation that touches a
sheet (today: gym-log; crm-spreadsheet → re-engagement-outreach,
draft-message) sources `config.sh` from here and never carries its own token.
A new sheet-based use case adds its sheet ID / tab names to its own
`config.sh` and calls `gsheets.py` (or imports it) — no credential work.

## The credential

| What | Value |
| --- | --- |
| Type | OAuth 2.0 *authorized-user* token for Alex's Google account: refresh token + client id/secret in one JSON (Desktop-app OAuth client) |
| Scope | `https://www.googleapis.com/auth/spreadsheets` — **read-write on every spreadsheet the account can open** |
| Mac | file `automations/gsheets/.work/token.json` (git-ignored), written by `gsheets.py auth` |
| Claude Code cloud sessions | environment variable `GSHEETS_TOKEN_JSON` = the same JSON, base64 (raw JSON also accepted) |
| GitHub Actions | repository secret `GSHEETS_TOKEN_JSON`, same value |
| OAuth client | `automations/gsheets/.work/credentials.json` (git-ignored) — needed only by `auth` |

Precedence inside a process: `GSHEETS_TOKEN_JSON` → `GSHEETS_TOKEN` file.
(The pre-2026-09 name `GYM_SHEETS_TOKEN_JSON` is still honoured as a
fallback; delete those copies once the new name is everywhere.) The API
client is stdlib `urllib` — nothing to install anywhere except for `auth`.

## Files

- `config.sh` — exports `REPO_ROOT`, `GSHEETS_TOKEN`, `SHEETS_CREDS`,
  `PYTHON_BIN`, `GSHEETS`. Source it from any consumer's config.
- `gsheets.py` — credential loader + stdlib REST client + CLI
  (`auth | check | info | get | update | append | clear | batch-update`).
  Full reference in its docstring.
- `setup.sh` — one-time per Mac: venv for `auth`, migration of the
  pre-2026-09 per-skill files, credential check, prints the off-Mac steps.
- `.work/` — git-ignored: `credentials.json`, `token.json`, `venv/`.

## One-time setup

### 1. OAuth client (already exists — only when starting from zero)

Google Cloud console → APIs & Services → Library → enable **Google Sheets
API** → Credentials → Create OAuth client ID, type **Desktop app** →
Download JSON → save as `automations/gsheets/.work/credentials.json`.
Publish the OAuth consent screen: in *Testing* mode Google expires refresh
tokens after 7 days; published (unverified, personal use) they are durable.

### 2. Mac

```bash
cd ~/Documents/GitHub/AO-Personal-OS
automations/gsheets/setup.sh
```

Builds the venv, copies the existing OAuth client (from
`crm-spreadsheet/.work`) and the existing read-write token (from
`gym-log/.work`) into `automations/gsheets/.work/`, runs the browser consent
only if there is still no token, and ends with `gsheets.py check` — it must
print `"ok": true`.

### 3. Claude Code cloud environment

```bash
base64 < automations/gsheets/.work/token.json | tr -d '\n' | pbcopy
```

[claude.ai/code](https://claude.ai/code) → the cloud icon showing the
environment name (row above the message box) → hover the environment → gear
→ **Environment variables** → add one line `GSHEETS_TOKEN_JSON=<paste>` →
**Save changes**. Network access stays **Trusted** (`*.googleapis.com` is in
the default allowlist). Only sessions started afterwards see the variable;
running sessions keep the values they started with.

### 4. GitHub Actions

Repo → Settings → Secrets and variables → Actions → **New repository
secret** → name `GSHEETS_TOKEN_JSON`, value = the same paste. Used by
`.github/workflows/gym-log-apply.yml`; any future workflow reads the same
secret. Delete the old `GYM_SHEETS_TOKEN_JSON` secret once this one exists.

### 5. Verify from a cloud session

```bash
source automations/gsheets/config.sh && "$PYTHON_BIN" "$GSHEETS" check <SHEET_ID>
```

`"ok": true` with the spreadsheet's title and tabs = done for every sheet
the account can open. Exit 3 = the variable is missing, mis-pasted, or stale.

## Using it from a skill or script

Shell — the CLI (JSON out; ranges in A1 notation, tab first):

```bash
source automations/gsheets/config.sh
"$PYTHON_BIN" "$GSHEETS" info   <SHEET_ID>                       # title + tabs
"$PYTHON_BIN" "$GSHEETS" get    <SHEET_ID> 'Sheet1!A1:D20'
echo '[["Ann","42"]]' | "$PYTHON_BIN" "$GSHEETS" append <SHEET_ID> 'Sheet1'
echo '[["x"]]'        | "$PYTHON_BIN" "$GSHEETS" update <SHEET_ID> 'Sheet1!B2'
"$PYTHON_BIN" "$GSHEETS" clear  <SHEET_ID> 'Sheet1!A2:Z'
echo '[{"addSheet":{"properties":{"title":"New tab"}}}]' \
  | "$PYTHON_BIN" "$GSHEETS" batch-update <SHEET_ID>      # any structural edit
```

Python — a consumer with its own layout logic (what `gym_sheet.py` does):

```python
sys.path.insert(0, os.path.join(REPO_ROOT, "automations/gsheets")); import gsheets
svc = gsheets.service()          # raises gsheets.SheetsError (.code = exit code)
rows = svc.spreadsheets().values().get(spreadsheetId=ID, range="'Tab'").execute().get("values", [])
```

Conventions: JSON on stdout; exit codes 0 / 2 (bad input, API or network —
retry, never a fact about the data) / 3 (credential — tell Alex, never
"not found"); sheet IDs and tab names live in the consumer's `config.sh`;
no per-skill token, no second consent flow. The sheet must be one the
Google account can open — share a sheet created elsewhere with that account.

## Rotation / failure modes

| Symptom | Cause | Fix |
| --- | --- | --- |
| exit 3, "no Google Sheets credential" | env var unset in this environment, or `.work/` missing | step 3 (cloud) / step 2 (Mac) |
| exit 3, "token refresh rejected (400 … invalid_grant)" | refresh token revoked or expired: a re-`auth` elsewhere, consent screen in *Testing*, an account security event | Mac: `source automations/gsheets/config.sh && "$PYTHON_BIN" "$GSHEETS" auth`, then steps 3 + 4 again — the new token invalidates the old one everywhere |
| exit 3, 403 on one spreadsheet | that sheet is not shared with the account, or the Sheets API is disabled on the project | share the sheet / enable the API |
| exit 2, network error | sandbox network, not the credential | retry; never record it as "not found" |

Security: the JSON is a **secret** — env var / secret store only, never in
the repo, a chat message, an issue, or a commit message. The cloud
environment shows variable values to anyone who can open that environment
(it is Alex's personal one). Read-write on all sheets is deliberate — one
credential for every sheet use case; the tighter option, a service account
shared per sheet, needs google-auth for RS256 signing and is not wired.

## Consumers

- `automations/gym-log/` — `gym_sheet.py` imports the credential;
  `.github/workflows/gym-log-apply.yml` uses the secret.
- `automations/crm-spreadsheet/` — `sheets_lookup.py` (CRM reads) →
  `re-engagement-outreach`, `draft-message`.
