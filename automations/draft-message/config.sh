# config.sh — sourced by draft-message scripts.
#
# draft-message reuses re-engagement-outreach's Sheet lookup as a fallback
# when no prior thread is found and Alex didn't provide an address directly.
# The Sheet OAuth client and venv are the ones already wired up there — this
# skill does not maintain its own Sheets credentials.
#
# Telegram credentials come from the shared automations/telegram/config.sh,
# which sources them from macOS Keychain.

export REPO_ROOT="$HOME/Documents/GitHub/AO-Personal-OS"

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
