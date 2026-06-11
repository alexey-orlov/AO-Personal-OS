#!/usr/bin/env bash
# setup.sh — one-time per machine: install + load the autosync launchd agent.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"

command -v git >/dev/null || { echo "! git missing. Run: xcode-select --install"; exit 1; }
git -C "$REPO_ROOT" remote get-url origin >/dev/null 2>&1 || { echo "! no 'origin' remote in $REPO_ROOT"; exit 1; }

mkdir -p "$WORK" "$HOME/Library/LaunchAgents"
PLIST_DST="$HOME/Library/LaunchAgents/com.user.gitautosync.plist"
cp "$HERE/com.user.gitautosync.plist" "$PLIST_DST"
launchctl unload "$PLIST_DST" 2>/dev/null || true
launchctl load "$PLIST_DST"
echo "[setup] com.user.gitautosync loaded — watching $REPO_ROOT (branch: $BRANCH)"
echo "[setup] activity log: $LOG"
