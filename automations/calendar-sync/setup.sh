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

echo "[setup] building the EventKit reader..."
swiftc "$HERE/ss_cal_read.swift" -o "$HERE/.work/ss-cal-read"

# launchd plist: fire run.sh (gated) hourly on the hour, Mon-Fri 08:00-20:00 local (EET).
# Routed via Terminal so it inherits the Calendar + Full-Disk grants.
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
mkdir -p "$HOME/Library/LaunchAgents"
{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">'
  echo '<plist version="1.0"><dict>'
  echo "  <key>Label</key><string>$LABEL</string>"
  echo '  <key>ProgramArguments</key><array>'
  echo '    <string>/usr/bin/osascript</string><string>-e</string>'
  echo "    <string>tell application \"Terminal\" to do script \"$HERE/run.sh daemon\"</string>"
  echo '  </array>'
  echo '  <key>StartCalendarInterval</key><array>'
  for d in 1 2 3 4 5; do for h in 8 9 10 11 12 13 14 15 16 17 18 19 20; do
    echo "    <dict><key>Weekday</key><integer>$d</integer><key>Hour</key><integer>$h</integer><key>Minute</key><integer>0</integer></dict>"
  done; done
  echo '  </array>'
  echo "  <key>StandardOutPath</key><string>$HERE/.work/launchd.out.log</string>"
  echo "  <key>StandardErrorPath</key><string>$HERE/.work/launchd.err.log</string>"
  echo '</dict></plist>'
} > "$PLIST"

launchctl bootout "gui/$(id -u)" "$PLIST" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"

cat <<EOF

[setup] installed launchd agent: $LABEL  (Mon-Fri 08:00-20:00 EET, hourly, via Terminal)

ONE-TIME GOOGLE SETUP (only you can do this — it's your account):
  1) console.cloud.google.com -> create/select a project
  2) APIs & Services -> Library -> enable "Google Calendar API"
  3) APIs & Services -> OAuth consent screen -> External -> add yourself as a Test user
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
