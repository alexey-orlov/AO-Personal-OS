# config.sh — shared CRM-spreadsheet integration.
#
# Sourced by any skill that wants to enrich a contact list from Alex's CRM
# Google Sheet. Today: /re-engagement-outreach. Likely future consumers:
# /draft-message (look up email/LIN by name), /inbox-sweep (enrich unknown
# senders), any outbound campaign skill.
#
# Auth uses OAuth Desktop-app flow (same pattern as call-pipeline's calendar
# integration). credentials.json + token.json live in .work/sheets/ (git-
# ignored). One consent flow on first use; token refreshes silently after.

export REPO_ROOT="$HOME/Documents/GitHub/AO-Personal-OS"

export CRM_DIR="$REPO_ROOT/automations/crm-spreadsheet"
export CRM_WORK="$CRM_DIR/.work"

export SHEETS_CREDS="$CRM_WORK/sheets/credentials.json"
export SHEETS_TOKEN="$CRM_WORK/sheets/token.json"

# Alex's CRM. Tabs are accessed by NAME, not gid, so renames here are the
# only place that needs to change if tab labels change in the sheet.
export CRM_SHEET_ID="1w3oxlQw8FXzcHBDSLDaPN2OYQ64XAaub0epfzZzLJbI"
export CRM_CONTACTS_TAB="CRM Contacts"
export CRM_ACCOUNTS_TAB="CRM Accounts"

# Python venv (built by setup.sh) has google-api-python-client + rapidfuzz.
# Fall back to the call-pipeline venv (google libs but no rapidfuzz — fuzzy
# name matching degrades to "no match"), then system python3 as last resort.
export PYTHON_BIN="$CRM_WORK/venv/bin/python3"
[ -x "$PYTHON_BIN" ] || export PYTHON_BIN="$REPO_ROOT/automations/call-pipeline/.work/venv/bin/python3"
[ -x "$PYTHON_BIN" ] || export PYTHON_BIN="$(command -v python3)"

# Convenience for callers: the full path to the lookup script.
export CRM_LOOKUP="$CRM_DIR/sheets_lookup.py"
