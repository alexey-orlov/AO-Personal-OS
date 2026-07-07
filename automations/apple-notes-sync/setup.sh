#!/usr/bin/env bash
# setup.sh — one-time install of the apple-notes-sync launchd agent.
#
# Also triggers the macOS Automation permission prompt (host app → Notes) by
# doing one read, so the first unattended run doesn't stall on TCC.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$HERE/../.." && pwd)"

mkdir -p "$HERE/.work"
chmod +x "$HERE"/notes_list.sh "$HERE"/notes_body.sh "$HERE"/notes_set_body.sh "$HERE"/run.sh

echo "[setup] probing Apple Notes access (approve the Automation prompt if one appears) ..."
"$HERE/notes_list.sh" >/dev/null

PLIST_SRC="$HERE/com.user.apple-notes-sync.plist"
PLIST_DST="$HOME/Library/LaunchAgents/com.user.apple-notes-sync.plist"
mkdir -p "$HOME/Library/LaunchAgents"
sed "s|__REPO__|$REPO_ROOT|g" "$PLIST_SRC" >"$PLIST_DST"

launchctl bootout "gui/$(id -u)" "$PLIST_DST" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST_DST"
echo "[setup] launchd agent installed: com.user.apple-notes-sync (daily at 08:00)"
echo "[setup] logs: $HERE/.work/launchd.log"
