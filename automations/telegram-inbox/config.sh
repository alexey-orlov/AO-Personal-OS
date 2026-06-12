# config.sh — sourced by watch.sh / setup.sh.
# Inherits bot token + group chat id + topic map from the shared telegram lib.

TI_HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$TI_HERE/../.." && pwd)"

# shellcheck source=/dev/null
source "$REPO_ROOT/automations/telegram/config.sh"

# Where Drop Zone messages land. Since 2026-06-12 this is the committed cloud
# staging dir (the old git-ignored root inbox/ was retired) — if this local
# fallback watcher is ever revived, its drops join the same flow as the n8n
# capture and are folded + archived by the daily sweep.
INBOX_DIR="$REPO_ROOT/context/_inbox"

# Per-machine state (getUpdates offset). Never committed.
WORK_DIR="$TI_HERE/.work"

# Long-poll window for getUpdates, seconds. curl --max-time must exceed this.
POLL_TIMEOUT="${TI_POLL_TIMEOUT:-50}"
