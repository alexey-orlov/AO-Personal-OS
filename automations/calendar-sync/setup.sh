#!/usr/bin/env bash
# setup.sh — install the calendar-sync daemon (Apple Calendar -> Google).
# Run from a Terminal that has Full Disk Access AND Calendar access (the same
# Terminal you granted when you ran ss-cal-read).
set -euo pipefail
REPO="${CALSYNC_REPO:-$HOME/Documents/GitHub/AO-Personal-OS}"
HERE="$REPO/automations/calendar-sync"
LABEL="com.user.calendar-sync"

mkdir -p "$HERE/.work/state"
chmod +x "$HERE/run.sh" "$HERE/setup.sh" 2>/dev/null || true

if [ "${1:-}" != "--plist-only" ]; then   # --plist-only: reinstall the schedule, keep the built binaries
  echo "[setup] building the EventKit reader + writer..."
  swiftc "$HERE/ss_cal_read.swift" -o "$HERE/.work/ss-cal-read"
  swiftc "$HERE/ss_cal_write.swift" -o "$HERE/.work/ss-cal-write"   # reverse leg: SS 'Busy' placeholders
fi

# launchd plist: fire run.sh (gated) every hour on the hour, Mon-Fri, on the Mac's local clock
# (Alex works with Europe and the US at once). Routed via Terminal so it inherits the Calendar +
# Full-Disk grants. The AppleScript waits for the run's shell to exit, then closes that window:
# the Basic profile keeps a window after its shell exits, and each tick used to leave one behind
# (329 open on 2026-11-19). The script is inline (-e), so osascript never reads ~/Documents.
APPLESCRIPT=(
  'tell application "Terminal"'
  "set t to do script \"$HERE/run.sh daemon; exit\""
  'set theTTY to ""'
  'try'
  'set theTTY to tty of t'
  'end try'
  'set wid to missing value'
  'repeat with w in windows'
  'try'
  'if tty of tab 1 of w is theTTY then'
  'set wid to id of w'
  'exit repeat'
  'end if'
  'end try'
  'end repeat'
  'repeat 300 times'
  'delay 3'
  'try'
  'if (count of (processes of t)) is 0 then exit repeat'
  'on error'
  'exit repeat'
  'end try'
  'end repeat'
  'set outcome to "window not found"'
  'try'
  'if wid is not missing value then'
  'if (count of (processes of t)) is 0 then'
  'close window id wid'
  'set outcome to "closed window " & wid'
  'else'
  'set outcome to "left window " & wid & " open: run still busy"'
  'end if'
  'end if'
  'on error errMsg'
  'set outcome to "close failed: " & errMsg'
  'end try'
  'end tell'
  'return (do shell script "date +%FT%T") & " " & outcome'   # -> launchd.out.log
)
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
mkdir -p "$HOME/Library/LaunchAgents"
# Check before replacing anything: an AppleScript that doesn't compile would fail every tick
# with nothing but a line in launchd.err.log.
OSA_ARGS=(); for line in "${APPLESCRIPT[@]}"; do OSA_ARGS+=(-e "$line"); done
osacompile -o "$HERE/.work/launch-check.scpt" "${OSA_ARGS[@]}" || { echo "[setup] AppleScript does not compile — agent left unchanged"; exit 1; }
rm -f "$HERE/.work/launch-check.scpt"
{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">'
  echo '<plist version="1.0"><dict>'
  echo "  <key>Label</key><string>$LABEL</string>"
  echo '  <key>ProgramArguments</key><array>'
  echo '    <string>/usr/bin/osascript</string>'
  for line in "${APPLESCRIPT[@]}"; do   # XML-escape: the AppleScript concatenates with &
    printf '    <string>-e</string><string>%s</string>\n' \
      "$(printf '%s' "$line" | sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g')"
  done
  echo '  </array>'
  echo '  <key>StartCalendarInterval</key><array>'
  for d in 1 2 3 4 5; do   # no Hour key = every hour of that weekday
    echo "    <dict><key>Weekday</key><integer>$d</integer><key>Minute</key><integer>0</integer></dict>"
  done
  echo '  </array>'
  echo "  <key>StandardOutPath</key><string>$HERE/.work/launchd.out.log</string>"
  echo "  <key>StandardErrorPath</key><string>$HERE/.work/launchd.err.log</string>"
  echo '</dict></plist>'
} > "$PLIST.new"
plutil -lint "$PLIST.new" >/dev/null || { echo "[setup] generated plist is invalid — agent left unchanged"; rm -f "$PLIST.new"; exit 1; }
mv "$PLIST.new" "$PLIST"

launchctl bootout "gui/$(id -u)" "$PLIST" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"

echo "[setup] installed launchd agent: $LABEL  (every hour Mon-Fri on the Mac's local clock, via Terminal)"
[ "${1:-}" = "--plist-only" ] && exit 0

cat <<EOF

ONE-TIME GOOGLE SETUP (only you can do this — it's your account):
  1) console.cloud.google.com -> create/select a project
  2) APIs & Services -> Library -> enable "Google Calendar API"
  3) APIs & Services -> OAuth consent screen -> External -> add yourself as a Test user,
     THEN set "Publishing status" to "In production" (Publish app). This is important:
     a "Testing" app expires the refresh token every 7 days; a published one does not.
     (You'll see an "unverified app" warning at sign-in once -> Advanced -> proceed.)
  4) Credentials -> Create credentials -> OAuth client ID -> "Desktop app" -> copy the Client ID + Secret
  5) store them in Keychain:
       security add-generic-password -U -a "\$USER" -s CALSYNC_GOOGLE_CLIENT_ID     -w '<client id>'
       security add-generic-password -U -a "\$USER" -s CALSYNC_GOOGLE_CLIENT_SECRET -w '<client secret>'
  6) authorize once (opens a browser):
       source "$HERE/config.sh" && python3 -I "$HERE/gcal.py" auth

THEN TEST + GO LIVE:
  source "$HERE/config.sh" && "$HERE/run.sh" now        # DRY-RUN: prints the plan, no writes
  touch "$HERE/.work/state/LIVE"                          # flip to live writes
  "$HERE/run.sh" now                                      # first real sync

Logs:      tail -f "$HERE/.work/launchd.err.log"
Uninstall: launchctl bootout "gui/\$(id -u)" "$PLIST"
EOF
