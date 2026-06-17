#!/usr/bin/env bash
# config.sh — constants for calendar-sync. Sourced by the skill and the loop.
# Edit values here; secrets (Telegram) come from automations/telegram/config.sh.
# NB: resolved from $HOME, not ${BASH_SOURCE[0]}, so it works whether sourced
# from bash OR zsh (zsh leaves BASH_SOURCE unset). Override with CALSYNC_REPO.
export CALSYNC_REPO="${CALSYNC_REPO:-$HOME/Documents/GitHub/AO-Personal-OS}"
export CALSYNC_HERE="$CALSYNC_REPO/automations/calendar-sync"
export CALSYNC_CORE="$CALSYNC_HERE/core.sh"
export CALSYNC_STATE="$CALSYNC_HERE/.work/state"
export CALSYNC_LEDGER="$CALSYNC_STATE/ledger.json"
export CALSYNC_RUNLOG="$CALSYNC_STATE/run-log.jsonl"
export CALSYNC_LOCK="$CALSYNC_HERE/.work/run.lock"

# --- sync parameters -------------------------------------------------------
export CALSYNC_CALENDAR_ID="orlov.alexej@gmail.com"   # Google primary (write target)
export CALSYNC_SS_EMAIL="olekorlov@softserveinc.com"  # SS identity (native-dup match)
export CALSYNC_ATTENDEE="orlov.alexej@gmail.com"      # sole attendee — never anyone else
export CALSYNC_TZ="Europe/Kyiv"
export CALSYNC_PREFIX="SS: "
export CALSYNC_DAYS_AHEAD=14                          # this week + next week
export CALSYNC_OWA_URL="https://outlook.office.com/calendar/view/week"
export CALSYNC_CHROME_NAME="SS laptop"                # Chrome to read OWA from

# --- live vs dry-run -------------------------------------------------------
# Writes to Google ONLY when .work/state/LIVE exists; otherwise plan-only.
# Go live:  touch automations/calendar-sync/.work/state/LIVE
if [ -f "$CALSYNC_STATE/LIVE" ]; then export CALSYNC_DRY_RUN=0; else export CALSYNC_DRY_RUN=1; fi

mkdir -p "$CALSYNC_STATE" 2>/dev/null || true
