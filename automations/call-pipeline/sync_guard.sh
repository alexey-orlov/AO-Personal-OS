#!/usr/bin/env bash
# sync_guard.sh — Voice Memos iCloud sync staleness guard (2026-07-30 incident).
#
# A long-running VoiceMemos.app/voicememod stack can silently stop importing
# from CloudKit: the phone uploads fine, but no new .m4a files land and
# CloudRecordings.db-wal stops being written — the watcher sees an empty feed
# and looks healthy while days of recordings are missed. Restarting the app
# stack un-wedges it instantly.
#
# Sourced by watch.sh (read ONCE by the long-lived launchd process — after
# editing, reload with launchctl unload/load, see "Deploying changes" in
# CLAUDE.md). Also runs standalone for an immediate manual check:
#   cd automations/call-pipeline && ./sync_guard.sh        # real check now
#   SYNC_GUARD_DRYRUN=1 ./sync_guard.sh                    # no kick, no alert
#
# Behavior (sync_guard_tick, called every watcher tick, ~one stat call):
#   - At most once per SYNC_GUARD_CHECK_SECS (default 3600) run a real check.
#   - If CloudRecordings.db-wal mtime is older than SYNC_STALE_HOURS
#     (config.sh, default 72; 0 disables the guard): restart the stack —
#     AppleScript-quit by BUNDLE ID (the name "Voice Memos" does not resolve
#     on this Mac), kill voicememod, relaunch hidden with
#     `open -gj -b com.apple.VoiceMemos`. Never while an .m4a is open for
#     write (recording/export in flight). Max one kick per
#     SYNC_KICK_COOLDOWN_HOURS (default 24).
#   - Still stale one full cooldown after a kick => Telegram alert (General
#     topic) naming cause + manual fix — the repo hard rule that automations
#     surface their own failures. Once per wedge episode; a failed send is
#     retried at the next cooldown expiry. A send failure never breaks the
#     watcher.
#   - When the wal goes fresh again: clear episode state, log "recovered".
#
# State in $STATE: sync_guard_checked (hourly gate), sync_guard_kicked +
# sync_guard_alerted (episode markers; mtime = when), sync_guard.log
# (persistent event log — /tmp watcher logs get reaped every ~3 days).
#
# Known blind spot: if merely relaunching the app rewrites the wal without
# actually importing, a still-broken sync reads as "recovered" and the alert
# never fires (guard then just re-kicks every ~SYNC_STALE_HOURS). Next
# hardening step if that's ever observed: track newest-.m4a mtime too.

_sg_mtime() { stat -f%m "$1" 2>/dev/null || echo 0; }

sync_guard_log() {
  # Watcher stdout (/tmp log) AND the persistent event log, timestamped.
  echo "[watch] sync-guard: $*"
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$STATE/sync_guard.log" 2>/dev/null || true
}

sync_guard_recording_active() {
  # True if it is unsafe to restart the stack: an .m4a somewhere under the
  # store is open for write (Mac-side recording/export), or .m4a files were
  # touched in the last 10 min (sync resumed on its own / import in flight).
  if [ -n "$(find "$VOICE_MEMOS_DIR" -name '*.m4a' -type f -mmin -10 -print -quit 2>/dev/null)" ]; then
    return 0
  fi
  command -v lsof >/dev/null 2>&1 || return 1
  # Capture first: lsof's own exit code is quirky, and under pipefail an
  # early-exiting consumer would SIGPIPE it and eat a real match.
  local open_files
  open_files="$(lsof -F an +D "$VOICE_MEMOS_DIR" 2>/dev/null || true)"
  printf '%s\n' "$open_files" | awk '
    /^a/ { mode = $0 }
    /^n/ { if (tolower($0) ~ /\.m4a$/ && mode ~ /[wu]/) found = 1 }
    END { exit found ? 0 : 1 }'
}

sync_guard_kick() {
  if [ "${SYNC_GUARD_DRYRUN:-0}" = "1" ]; then
    sync_guard_log "DRY-RUN: would restart VoiceMemos.app + voicememod"
    return 0
  fi
  # Quit via bundle id; osascript can hang on a TCC automation prompt in a
  # headless context, so poll-and-kill it (no coreutils `timeout` on this Mac).
  /usr/bin/osascript -e 'quit app id "com.apple.VoiceMemos"' >/dev/null 2>&1 &
  local osa=$! i=0
  while kill -0 "$osa" 2>/dev/null && [ "$i" -lt 15 ]; do sleep 1; i=$((i+1)); done
  kill "$osa" 2>/dev/null || true
  wait "$osa" 2>/dev/null || true
  sleep 3
  # Graceful quit didn't land (e.g. TCC denial)? TERM the app directly — safe,
  # we already verified no recording is in progress.
  if pgrep -xq VoiceMemos 2>/dev/null; then
    pkill -x VoiceMemos 2>/dev/null || true
    sleep 2
  fi
  pkill -x voicememod 2>/dev/null || true
  sleep 2
  /usr/bin/open -gj -b com.apple.VoiceMemos 2>/dev/null || true
}

sync_guard_alert() {
  local wal_ts="$1" age_h="$2"
  local sender="${REPO_ROOT:-}/automations/telegram/telegram_send.sh" msg
  if [ "${SYNC_GUARD_DRYRUN:-0}" = "1" ]; then
    sync_guard_log "DRY-RUN: would send Telegram alert (wal ${age_h}h stale)"
    return 0
  fi
  if [ ! -x "$sender" ]; then
    sync_guard_log "alert NOT sent — $sender missing/not executable"
    return 1
  fi
  msg="$(cat <<EOF
⚠️ Call pipeline: Voice Memos iCloud sync looks WEDGED on the Mac

CloudRecordings.db-wal last written ${wal_ts} (~${age_h}h ago; threshold ${SYNC_STALE_HOURS:-72}h). An automatic restart of VoiceMemos.app + voicememod ~${SYNC_KICK_COOLDOWN_HOURS:-24}h ago did not revive it. iPhone recordings since ${wal_ts} are likely NOT reaching the pipeline — unless there simply were none.

Manual fix on the Mac:
osascript -e 'quit app id "com.apple.VoiceMemos"'
pkill -x voicememod
open -gj -b com.apple.VoiceMemos

Then open Voice Memos on the iPhone once and check for new .m4a files in the Recordings folder. Details: automations/call-pipeline/CLAUDE.md → Environment gotchas.
EOF
)"
  # No TG_TOPIC => General topic (deliberate). Non-fatal by contract.
  printf '%s' "$msg" | "$sender" >/dev/null 2>&1
}

sync_guard_check() {
  local stale_h="${SYNC_STALE_HOURS:-72}" cooldown_h="${SYNC_KICK_COOLDOWN_HOURS:-24}"
  local kicked="$STATE/sync_guard_kicked" alerted="$STATE/sync_guard_alerted"
  local now wal wal_m age_s age_h last_kick wal_ts
  case "$stale_h"    in ''|*[!0-9]*) stale_h=72    ;; esac
  case "$cooldown_h" in ''|*[!0-9]*) cooldown_h=24 ;; esac
  if [ "$stale_h" -eq 0 ]; then return 0; fi

  wal="$VOICE_MEMOS_DIR/CloudRecordings.db-wal"
  if [ ! -f "$wal" ]; then wal="$VOICE_MEMOS_DIR/CloudRecordings.db"; fi
  if [ ! -f "$wal" ]; then
    sync_guard_log "CloudRecordings.db(-wal) not found under $VOICE_MEMOS_DIR — cannot judge staleness"
    return 0
  fi

  now="$(date +%s)"
  wal_m="$(_sg_mtime "$wal")"
  age_s=$(( now - wal_m ))
  if [ "$age_s" -lt 0 ]; then age_s=0; fi
  age_h=$(( age_s / 3600 ))

  if [ "$age_s" -lt $(( stale_h * 3600 )) ]; then
    if [ -e "$kicked" ] || [ -e "$alerted" ]; then
      sync_guard_log "recovered — $(basename "$wal") fresh again (${age_h}h old); clearing kick/alert state"
      rm -f "$kicked" "$alerted"
    fi
    return 0
  fi

  if sync_guard_recording_active; then
    sync_guard_log "wal stale (${age_h}h) but an .m4a is open for write / freshly touched — skipping kick"
    return 0
  fi

  last_kick="$(_sg_mtime "$kicked")"
  if [ -e "$kicked" ] && [ $(( now - last_kick )) -lt $(( cooldown_h * 3600 )) ]; then
    return 0  # kicked recently — give the restart time to work
  fi

  # A kick a full cooldown ago didn't help — surface it before re-kicking.
  if [ -e "$kicked" ] && [ ! -e "$alerted" ]; then
    wal_ts="$(date -r "$wal_m" '+%Y-%m-%d %H:%M' 2>/dev/null || echo unknown)"
    if sync_guard_alert "$wal_ts" "$age_h"; then
      touch "$alerted"
      sync_guard_log "ALERT sent — still stale ${age_h}h after a kick"
    else
      sync_guard_log "ALERT send FAILED — still stale ${age_h}h after a kick; will retry next cycle"
    fi
  fi

  sync_guard_log "wal stale ${age_h}h (threshold ${stale_h}h) — restarting VoiceMemos.app + voicememod"
  sync_guard_kick
  touch "$kicked"
  return 0
}

sync_guard_tick() {
  # Called every watcher tick (~30s); cheap gate so the real check runs at
  # most once per SYNC_GUARD_CHECK_SECS.
  local gate="$STATE/sync_guard_checked" now last
  now="$(date +%s)"
  last="$(_sg_mtime "$gate")"
  if [ $(( now - last )) -lt "${SYNC_GUARD_CHECK_SECS:-3600}" ]; then return 0; fi
  touch "$gate"
  sync_guard_check
  return 0
}

# Executed directly (not sourced): one immediate check, no hourly gate.
if [ "${BASH_SOURCE[0]:-}" = "${0:-}" ]; then
  set -euo pipefail
  _SG_HERE="$(cd "$(dirname "$0")" && pwd)"
  if [ -z "${VOICE_MEMOS_DIR:-}" ] || [ -z "${STATE:-}" ]; then
    # shellcheck source=/dev/null
    source "$_SG_HERE/config.sh"
  fi
  mkdir -p "$STATE"
  sync_guard_check
fi
