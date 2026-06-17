#!/usr/bin/env bash
# config.sh — constants + secrets for calendar-sync (Apple Calendar -> Google).
# Resolved from $HOME so it works whether sourced from bash or zsh.
export CALSYNC_REPO="${CALSYNC_REPO:-$HOME/Documents/GitHub/AO-Personal-OS}"
export CALSYNC_HERE="$CALSYNC_REPO/automations/calendar-sync"
export CALSYNC_STATE="$CALSYNC_HERE/.work/state"
export CALSYNC_LEDGER="$CALSYNC_STATE/ledger.json"
export CALSYNC_RUNLOG="$CALSYNC_STATE/run-log.jsonl"
export CALSYNC_READER="$CALSYNC_HERE/.work/ss-cal-read"
export CALSYNC_GTOKEN="$CALSYNC_STATE/gtoken.json"

# --- sync parameters -------------------------------------------------------
export CALSYNC_CALENDAR_ID="orlov.alexej@gmail.com"   # Google primary (write target)
export CALSYNC_SS_EMAIL="olekorlov@softserveinc.com"  # SS identity (native-dup match)
export CALSYNC_ATTENDEE="orlov.alexej@gmail.com"      # sole attendee — never anyone else
export CALSYNC_TZ="Europe/Kyiv"
export CALSYNC_PREFIX="SS: "
export CALSYNC_DAYS_AHEAD=14                           # this week + next week

# --- secrets (macOS Keychain) ----------------------------------------------
# Your own Google Cloud "Desktop app" OAuth client. Store once:
#   security add-generic-password -U -a "$USER" -s CALSYNC_GOOGLE_CLIENT_ID     -w '<client id>'
#   security add-generic-password -U -a "$USER" -s CALSYNC_GOOGLE_CLIENT_SECRET -w '<client secret>'
export CALSYNC_GOOGLE_CLIENT_ID="$(security find-generic-password -a "$USER" -s CALSYNC_GOOGLE_CLIENT_ID -w 2>/dev/null || echo "${CALSYNC_GOOGLE_CLIENT_ID:-}")"
export CALSYNC_GOOGLE_CLIENT_SECRET="$(security find-generic-password -a "$USER" -s CALSYNC_GOOGLE_CLIENT_SECRET -w 2>/dev/null || echo "${CALSYNC_GOOGLE_CLIENT_SECRET:-}")"

# --- live vs dry-run -------------------------------------------------------
# Writes to Google ONLY when .work/state/LIVE exists; otherwise plan-only.
#   touch automations/calendar-sync/.work/state/LIVE
if [ -f "$CALSYNC_STATE/LIVE" ]; then export CALSYNC_DRY_RUN=0; else export CALSYNC_DRY_RUN=1; fi

mkdir -p "$CALSYNC_STATE" 2>/dev/null || true
