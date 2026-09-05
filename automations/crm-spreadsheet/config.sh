# config.sh — shared CRM-spreadsheet integration.
#
# Sourced by any skill that wants to enrich a contact list from Alex's CRM
# Google Sheet. Today: /re-engagement-outreach, /draft-message (fallback).
#
# Credentials are NOT here: the lookup uses the shared Google Sheets
# credential from automations/gsheets/ (token file on the Mac, the
# GSHEETS_TOKEN_JSON env var in cloud sessions / CI), so it works anywhere.
# This file adds only what is CRM-specific — the sheet, its tabs, and the
# venv with rapidfuzz.

# Derived, not hardcoded: the same checkout is at ~/Documents/GitHub on the
# Mac and elsewhere in a cloud session / fresh clone.
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")/../.." && pwd)"
export REPO_ROOT

# Shared credential + python: exports GSHEETS_TOKEN, SHEETS_CREDS, PYTHON_BIN, GSHEETS.
# shellcheck source=/dev/null
source "$REPO_ROOT/automations/gsheets/config.sh"

export CRM_DIR="$REPO_ROOT/automations/crm-spreadsheet"
export CRM_WORK="$CRM_DIR/.work"

# Alex's CRM. Tabs are accessed by NAME, not gid, so renames here are the
# only place that needs to change if tab labels change in the sheet.
export CRM_SHEET_ID="1w3oxlQw8FXzcHBDSLDaPN2OYQ64XAaub0epfzZzLJbI"
export CRM_CONTACTS_TAB="CRM Contacts"
export CRM_ACCOUNTS_TAB="CRM Accounts"

# Prefer this automation's venv (setup.sh: rapidfuzz for fuzzy-name matching).
# Any other python3 works too — fuzzy matching then degrades to "no match".
if [ -x "$CRM_WORK/venv/bin/python3" ]; then
  export PYTHON_BIN="$CRM_WORK/venv/bin/python3"
fi

# Convenience for callers: the full path to the lookup script.
export CRM_LOOKUP="$CRM_DIR/sheets_lookup.py"
