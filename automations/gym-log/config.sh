# config.sh — gym training log integration (Google Sheet "My training").
#
# Sourced by the gym-log skill. Reuses the crm-spreadsheet OAuth client
# (credentials.json) but keeps its OWN token, because this one carries the
# read-write `spreadsheets` scope while the CRM token is readonly.

export REPO_ROOT="$HOME/Documents/GitHub/AO-Personal-OS"

export GYM_DIR="$REPO_ROOT/automations/gym-log"
export GYM_WORK="$GYM_DIR/.work"

export GYM_SHEET_ID="19JNFjYcnJJ-_haU_vLIf5nC5UVqDTEAR0P-LazbTUt0"
export GYM_TAB="Sheet1"

export GYM_SHEETS_TOKEN="$GYM_WORK/sheets/token.json"
export SHEETS_CREDS="$REPO_ROOT/automations/crm-spreadsheet/.work/sheets/credentials.json"

# Reuse the crm-spreadsheet venv (google-api-python-client lives there).
export PYTHON_BIN="$REPO_ROOT/automations/crm-spreadsheet/.work/venv/bin/python3"
[ -x "$PYTHON_BIN" ] || export PYTHON_BIN="$REPO_ROOT/automations/call-pipeline/.work/venv/bin/python3"
[ -x "$PYTHON_BIN" ] || export PYTHON_BIN="$(command -v python3)"

export GYM_SHEET="$GYM_DIR/gym_sheet.py"
