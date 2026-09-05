# config.sh — gym training log integration (Google Sheet "My training").
#
# Sourced by the gym-log skill. Credentials are the shared Google Sheets
# credential from automations/gsheets/ — one token for every sheet: the
# .work/token.json file on the Mac, the GSHEETS_TOKEN_JSON env var in cloud
# sessions and CI. This file adds only what is specific to the training sheet.

# Derived, not hardcoded: the same checkout is at ~/Documents/GitHub on the
# Mac and elsewhere in a cloud session / fresh clone.
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")/../.." && pwd)"
export REPO_ROOT

# Shared credential + python: exports GSHEETS_TOKEN, SHEETS_CREDS, PYTHON_BIN, GSHEETS.
# shellcheck source=/dev/null
source "$REPO_ROOT/automations/gsheets/config.sh"

export GYM_DIR="$REPO_ROOT/automations/gym-log"
export GYM_WORK="$GYM_DIR/.work"

export GYM_SHEET_ID="19JNFjYcnJJ-_haU_vLIf5nC5UVqDTEAR0P-LazbTUt0"
export GYM_TAB="Sheet1"

export GYM_SHEET="$GYM_DIR/gym_sheet.py"
