# config.sh — re-engagement-outreach skill-specific config.
#
# Inherits the CRM integration (Sheet ID, OAuth creds, Python venv with
# the right deps, lookup script path) from automations/crm-spreadsheet/.
# Inherits TG credentials (Keychain-backed) from automations/telegram/.
# Only adds the per-campaign STATE_FILE — that's the only thing genuinely
# specific to this skill.

# Derived, not hardcoded: the same checkout is at ~/Documents/GitHub on the
# Mac and elsewhere in a cloud session / fresh clone.
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")/../.." && pwd)"
export REPO_ROOT

export REOUT_DIR="$REPO_ROOT/automations/re-engagement-outreach"
export WORK="$REOUT_DIR/.work"
export STATE_FILE="$WORK/state.json"

# CRM lookup (shared): exports CRM_SHEET_ID, CRM_CONTACTS_TAB,
# CRM_ACCOUNTS_TAB, PYTHON_BIN, CRM_LOOKUP — and, via automations/gsheets/,
# the shared Google Sheets credential (GSHEETS_TOKEN / GSHEETS_TOKEN_JSON).
# shellcheck source=/dev/null
source "$REPO_ROOT/automations/crm-spreadsheet/config.sh"

# Telegram (shared): exports TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
# shellcheck source=/dev/null
source "$REPO_ROOT/automations/telegram/config.sh"
