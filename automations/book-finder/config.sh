# config.sh — book-finder skill-specific config.
#
# Inherits Telegram credentials (Keychain-backed) from automations/telegram/.
# Adds the few things genuinely specific to this skill:
#   - BOOKS_DIR  : where fb2/epub downloads land. Defaults to iCloud Drive so
#                  files sync to the iPhone Files app (they show up under
#                  "Books") and can be imported into Google Play Books.
#   - STATE_FILE : acquisition log + dup-download guard (git-ignored .work/).
#   - PYTHON_BIN : interpreter for the bundled stdlib scripts.

export REPO_ROOT="$HOME/Documents/GitHub/AO-Personal-OS"

export BOOKFINDER_DIR="$REPO_ROOT/automations/book-finder"
export WORK="$BOOKFINDER_DIR/.work"
export STATE_FILE="$WORK/state.json"

# Download target for fb2/epub. iCloud Drive/Books by default so the files reach
# the iPhone. Override before sourcing if you want them elsewhere:
#   export BOOKS_DIR="$HOME/Downloads/Books"
export BOOKS_DIR="${BOOKS_DIR:-$HOME/Library/Mobile Documents/com~apple~CloudDocs/Books}"

# Python: prefer python3 on PATH, fall back to the system interpreter.
export PYTHON_BIN="${PYTHON_BIN:-$(command -v python3 || echo /usr/bin/python3)}"

# Telegram (shared): exports TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
# shellcheck source=/dev/null
source "$REPO_ROOT/automations/telegram/config.sh"
