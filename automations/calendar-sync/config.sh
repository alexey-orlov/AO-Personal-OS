#!/usr/bin/env bash
# config.sh — constants + secrets for calendar-sync (Apple Calendar -> Google).
# Resolved from $HOME so it works whether sourced from bash or zsh. The host app's shell may
# arrive without USER/HOME; the Keychain lookups below need USER.
export USER="${USER:-$(id -un)}" HOME="${HOME:-/Users/$(id -un)}"
export CALSYNC_REPO="${CALSYNC_REPO:-$HOME/Documents/GitHub/AO-Personal-OS}"
export CALSYNC_HERE="$CALSYNC_REPO/automations/calendar-sync"
export CALSYNC_STATE="$CALSYNC_HERE/.work/state"
export CALSYNC_LEDGER="$CALSYNC_STATE/ledger.json"
export CALSYNC_REV_LEDGER="$CALSYNC_STATE/reverse-ledger.json"   # reverse leg: key -> {ss_id, hash}
export CALSYNC_RUNLOG="$CALSYNC_STATE/run-log.jsonl"
export CALSYNC_READER="$CALSYNC_HERE/.work/ss-cal-read"
export CALSYNC_WRITER="$CALSYNC_HERE/.work/ss-cal-write"
export CALSYNC_GTOKEN="$CALSYNC_STATE/gtoken.json"

# --- sync parameters -------------------------------------------------------
export CALSYNC_CALENDAR_ID="orlov.alexej@gmail.com"   # Google primary (write target)
export CALSYNC_SS_EMAIL="olekorlov@softserveinc.com"  # SS identity (native-dup match)
export CALSYNC_ATTENDEE="orlov.alexej@gmail.com"      # sole attendee — never anyone else
export CALSYNC_TZ="Europe/Kyiv"
export CALSYNC_PREFIX="SS: "
export CALSYNC_DAYS_AHEAD=14                           # this week + next week

# --- the SoftServe account in Apple Calendar --------------------------------
# Both legs touch only this account: the forward leg reads its events, the writer puts the "Busy"
# blocks into its CALSYNC_SS_WRITE_CAL calendar. Names exactly as `ss-cal-read --list` prints them
# ("[<account>] (exchange) :: <calendar>"); a title two accounts share stops the run.
export CALSYNC_SS_SOURCE="${CALSYNC_SS_SOURCE:-Exchange}"
export CALSYNC_SS_WRITE_CAL="${CALSYNC_SS_WRITE_CAL:-Calendar}"

# --- reverse leg: calendars read straight from Apple Calendar ---------------------------
# "<type>:<calendar title>[=<Google calendar id it replaces>]", comma-separated, as
# `ss-cal-read --list` prints them; SoftServe's own account never counts. While the calendar is in
# Apple Calendar its events block SS directly and the Google calendar after "=" is skipped; while it
# isn't, that Google copy stays the source. GigaCloud: its Exchange account's «Календар» (added to
# Apple Calendar 2026-11-24) instead of Google's copy of its published feed, which lags 5-6 h.
# Set to "" to disable.
export CALSYNC_EK_SOURCES="${CALSYNC_EK_SOURCES-exchange:Календар=g1ijcmfb7h40pmmcj3f67cnpki8kn898@import.calendar.google.com}"

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
