#!/usr/bin/env bash
# setup.sh — install the calendar-sync always-on launchd agent (one-time).
# Run from a Terminal that has Full Disk Access (so it can reach ~/Documents).
set -euo pipefail
REPO="${CALSYNC_REPO:-$HOME/Documents/GitHub/AO-Personal-OS}"
HERE="$REPO/automations/calendar-sync"
LABEL="com.user.calendar-sync"

mkdir -p "$HERE/.work/state"
chmod +x "$HERE/start.sh" "$HERE/core.sh" "$HERE/setup.sh" 2>/dev/null || true

PLIST_SRC="$HERE/$LABEL.plist"
PLIST_DST="$HOME/Library/LaunchAgents/$LABEL.plist"
mkdir -p "$HOME/Library/LaunchAgents"
sed "s|__REPO__|$REPO|g" "$PLIST_SRC" > "$PLIST_DST"

launchctl bootout "gui/$(id -u)" "$PLIST_DST" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST_DST"
launchctl kickstart -k "gui/$(id -u)/$LABEL" 2>/dev/null || true

cat <<EOF

[setup] installed launchd agent: $LABEL
[setup] a Terminal window will open running the always-on session (tmux session 'calendar-sync').

Before it does anything useful, confirm in that session:
  • the Google Calendar connector and Claude-for-Chrome MCP are both available
  • you are signed into https://outlook.office.com in the "SS laptop" Chrome

It stays in DRY-RUN (plans only, no Google writes) until you go live:
    touch "$HERE/.work/state/LIVE"

Tail logs:           tail -f "$HERE/.work/launchd.err.log"
Attach the session:  tmux attach -t calendar-sync     (detach: Ctrl-b then d)
Uninstall:           launchctl bootout "gui/\$(id -u)" "$PLIST_DST"
EOF
