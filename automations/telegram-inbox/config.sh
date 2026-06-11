# config.sh — sourced by watch.sh / setup.sh.
# Inherits bot token + group chat id + topic map from the shared telegram lib.

TI_HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$TI_HERE/../.." && pwd)"

# shellcheck source=/dev/null
source "$REPO_ROOT/automations/telegram/config.sh"

# Where Drop Zone messages land. inbox/ is git-ignored by design — raw drops
# stay local; only distilled context (via /context-update) is committed.
INBOX_DIR="$REPO_ROOT/inbox"

# Per-machine state (getUpdates offset). Never committed.
WORK_DIR="$TI_HERE/.work"

# Long-poll window for getUpdates, seconds. curl --max-time must exceed this.
POLL_TIMEOUT="${TI_POLL_TIMEOUT:-50}"
