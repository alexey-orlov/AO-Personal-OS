# config.sh — sourced by draft-message scripts.
#
# draft-message reuses re-engagement-outreach's Sheet lookup as a fallback
# when no prior thread is found and Alex didn't provide an address directly.
# The Sheet credential is the shared one from automations/gsheets/ (reached
# through the CRM config) — this skill does not maintain its own.
#
# Telegram credentials come from the shared automations/telegram/config.sh,
# which sources them from macOS Keychain.

# Derived, not hardcoded: the same checkout is at ~/Documents/GitHub on the
# Mac and elsewhere in a cloud session / fresh clone.
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")/../.." && pwd)"
export REPO_ROOT

export DM_DIR="$REPO_ROOT/automations/draft-message"
export WORK="$DM_DIR/.work"
export STATE_FILE="$WORK/state.json"

# Sheet config + Python venv: borrowed from re-engagement-outreach so we
# don't duplicate auth and dependencies.
# shellcheck source=/dev/null
source "$REPO_ROOT/automations/re-engagement-outreach/config.sh"

# Re-export the Sheet vars under DM_-prefixed names for clarity at the
# call site, while keeping re-engagement's originals intact.
export DM_SHEET_ID="$CRM_SHEET_ID"
export DM_CONTACTS_TAB="$CRM_CONTACTS_TAB"
export DM_ACCOUNTS_TAB="$CRM_ACCOUNTS_TAB"
