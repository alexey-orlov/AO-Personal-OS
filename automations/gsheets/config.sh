# config.sh — the shared Google Sheets credential. Source this from any skill
# or script that touches ANY Google Sheet; add the sheet's own ID / tab names
# in the consumer's config — never another token, never a second consent.
#
# How a process gets the credential (resolved by gsheets.py, in this order):
#   GSHEETS_TOKEN_JSON  the authorized-user token JSON inline (raw or base64)
#                       — a Claude Code cloud-environment variable and the
#                       GitHub Actions secret of the same name
#   GSHEETS_TOKEN       path of the same JSON on the Mac (git-ignored .work/)
# Full setup, rotation, failure modes: automations/gsheets/README.md

# Derived, not hardcoded: the same checkout is at ~/Documents/GitHub on the
# Mac and elsewhere in a cloud session / fresh clone.
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")/../.." && pwd)"
export REPO_ROOT

export GSHEETS_DIR="$REPO_ROOT/automations/gsheets"
export GSHEETS_WORK="$GSHEETS_DIR/.work"

# OAuth Desktop-app client (the GCP project's client_secret JSON). Needed
# only by `gsheets.py auth`, i.e. on the Mac, once.
export SHEETS_CREDS="$GSHEETS_WORK/credentials.json"
# The token `auth` writes: read-write `spreadsheets` scope, every sheet.
export GSHEETS_TOKEN="$GSHEETS_WORK/token.json"

# Transitional (2026-09): until setup.sh has migrated a Mac, fall back to the
# pre-shared per-skill files so nothing breaks in between. Delete this block
# once every machine has run automations/gsheets/setup.sh.
_gs_old_creds="$REPO_ROOT/automations/crm-spreadsheet/.work/sheets/credentials.json"
_gs_old_token="$REPO_ROOT/automations/gym-log/.work/sheets/token.json"
if [ ! -f "$SHEETS_CREDS" ] && [ -f "$_gs_old_creds" ]; then export SHEETS_CREDS="$_gs_old_creds"; fi
if [ ! -f "$GSHEETS_TOKEN" ] && [ -f "$_gs_old_token" ]; then export GSHEETS_TOKEN="$_gs_old_token"; fi
unset _gs_old_creds _gs_old_token

# Python: the API client is stdlib, so any python3 works. This venv
# (setup.sh) adds google-auth-oauthlib for `auth`; the other venvs are
# accepted so a consumer needing extra libs (crm-spreadsheet: rapidfuzz)
# can override PYTHON_BIN after sourcing this file.
export PYTHON_BIN="$GSHEETS_WORK/venv/bin/python3"
[ -x "$PYTHON_BIN" ] || export PYTHON_BIN="$REPO_ROOT/automations/crm-spreadsheet/.work/venv/bin/python3"
[ -x "$PYTHON_BIN" ] || export PYTHON_BIN="$REPO_ROOT/automations/call-pipeline/.work/venv/bin/python3"
[ -x "$PYTHON_BIN" ] || export PYTHON_BIN="$(command -v python3)"

# Convenience for callers: the CLI / library path.
export GSHEETS="$GSHEETS_DIR/gsheets.py"
