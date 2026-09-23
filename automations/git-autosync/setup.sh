#!/usr/bin/env bash
# setup.sh — one-time per machine: install + load an autosync launchd agent.
#   ./setup.sh              this repo (AO-Personal-OS), agent com.user.gitautosync
#   ./setup.sh <repo-path>  another checkout, its own agent com.user.gitautosync.<repo-name>;
#                           the AO-Personal-OS agent is left running untouched
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
if [ $# -ge 1 ]; then
  AUTOSYNC_REPO_ROOT="$(cd "$1" && pwd)"
  export AUTOSYNC_REPO_ROOT
fi
# shellcheck source=/dev/null
source "$HERE/config.sh"

command -v git >/dev/null || { echo "! git missing. Run: xcode-select --install"; exit 1; }
git -C "$REPO_ROOT" remote get-url origin >/dev/null 2>&1 || { echo "! no 'origin' remote in $REPO_ROOT"; exit 1; }

mkdir -p "$WORK" "$HOME/Library/LaunchAgents"
if [ -z "${AUTOSYNC_REPO_ROOT:-}" ]; then
  LABEL="com.user.gitautosync"
  PLIST_DST="$HOME/Library/LaunchAgents/$LABEL.plist"
  cp "$HERE/com.user.gitautosync.plist" "$PLIST_DST"
else
  LABEL="com.user.gitautosync.$(basename "$REPO_ROOT")"
  PLIST_DST="$HOME/Library/LaunchAgents/$LABEL.plist"
  # Same agent, own label and logs, plus the repo it watches.
  sed -e "s|<string>com.user.gitautosync</string>|<string>$LABEL</string>|" \
      -e "s|/tmp/gitautosync\.|/tmp/$LABEL.|g" \
      -e "s|<key>RunAtLoad</key>|<key>EnvironmentVariables</key><dict><key>AUTOSYNC_REPO_ROOT</key><string>$REPO_ROOT</string></dict><key>RunAtLoad</key>|" \
      "$HERE/com.user.gitautosync.plist" > "$PLIST_DST"
  plutil -lint "$PLIST_DST" >/dev/null || { echo "! generated plist is invalid: $PLIST_DST"; exit 1; }
fi
launchctl unload "$PLIST_DST" 2>/dev/null || true
launchctl load "$PLIST_DST"
echo "[setup] $LABEL loaded — watching $REPO_ROOT (branch: $BRANCH)"
echo "[setup] activity log: $LOG"
