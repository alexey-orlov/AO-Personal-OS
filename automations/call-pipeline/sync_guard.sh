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
#   - TWO staleness signals; either one marks the sync "suspect":
#       1. CloudRecordings.db-wal mtime older than SYNC_STALE_HOURS
#          (config.sh, default 72; 0 disables this signal) — CloudKit
#          activity stopped altogether.
#       2. Newest .m4a mtime older than M4A_STALE_HOURS (config.sh, default
#          96; 0 disables this signal) — added after the 2026-08-12 incident:
#          an app relaunch (here: the Aug 11 reboot) rewrites the wal WITHOUT
#          importing, resetting signal 1, so a wedged sync read as
#          "recovered" while a week of recordings sat unfetched. Files on
#          disk can't be faked by a relaunch. A genuinely quiet stretch
#          (nothing recorded for days) trips it too — accepted cost: the
#          alert wording hedges for that and fires once per episode.
#   - Suspect: restart the stack — AppleScript-quit by BUNDLE ID (the name
#     "Voice Memos" does not resolve on this Mac), kill voicememod, relaunch
#     hidden with `open -gj -b com.apple.VoiceMemos`. Never while an .m4a is
#     open for write (recording/export in flight). Max one kick per
#     SYNC_KICK_COOLDOWN_HOURS (default 24).
#   - Still suspect one full cooldown after a kick => Telegram alert (General
#     topic) naming cause + manual fix — the repo hard rule that automations
#     surface their own failures. Once per wedge episode; a failed send is
#     retried at the next cooldown expiry. A send failure never breaks the
#     watcher.
#   - Recovery = BOTH signals fresh: clear episode state, log "recovered".
#     (A long quiet stretch keeps the episode open via signal 2: kicks stay
#     cooldown-limited and the single alert has already fired — no spam.)
#
# State in $STATE: sync_guard_checked (hourly gate), sync_guard_kicked +
# sync_guard_alerted (episode markers; mtime = when), sync_guard.log
# (persistent event log — /tmp watcher logs get reaped every ~3 days).

_sg_mtime() { stat -f%m "$1" 2>/dev/null || echo 0; }

_sg_newest_m4a_mtime() {
  # Newest .m4a mtime under the store; empty if none. One batched stat, and
  # only on the hourly real check — cheap at a few hundred files.
  find "$VOICE_MEMOS_DIR" -name '*.m4a' -type f -exec stat -f%m {} + 2>/dev/null | sort -rn | head -1
}

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
  local detail="$1"
  local sender="${REPO_ROOT:-}/automations/telegram/telegram_send.sh" msg
  if [ "${SYNC_GUARD_DRYRUN:-0}" = "1" ]; then
    sync_guard_log "DRY-RUN: would send Telegram alert ($detail)"
    return 0
  fi
  if [ ! -x "$sender" ]; then
    sync_guard_log "alert NOT sent — $sender missing/not executable"
    return 1
  fi
  msg="$(cat <<EOF
⚠️ Call pipeline: Voice Memos iCloud sync looks WEDGED on the Mac

${detail} An automatic restart of VoiceMemos.app + voicememod ~${SYNC_KICK_COOLDOWN_HOURS:-24}h ago did not revive it. iPhone recordings are likely NOT reaching the pipeline — unless there simply were none to sync.

Manual fix on the Mac:
osascript -e 'quit app id "com.apple.VoiceMemos"'
pkill -x voicememod
open -gj -b com.apple.VoiceMemos

Then open Voice Memos on the iPhone once (that also pushes pending uploads) and check for new .m4a files in the Recordings folder. Details: automations/call-pipeline/CLAUDE.md → Environment gotchas.
EOF
)"
  # No TG_TOPIC => General topic (deliberate). Non-fatal by contract.
  printf '%s' "$msg" | "$sender" >/dev/null 2>&1
}

sync_guard_check() {
  local stale_h="${SYNC_STALE_HOURS:-72}" cooldown_h="${SYNC_KICK_COOLDOWN_HOURS:-24}" m4a_stale_h="${M4A_STALE_HOURS:-96}"
  local kicked="$STATE/sync_guard_kicked" alerted="$STATE/sync_guard_alerted"
  local now wal wal_m wal_age_h wal_stale m4a_m m4a_age_h m4a_stale reason detail last_kick
  case "$stale_h"     in ''|*[!0-9]*) stale_h=72     ;; esac
  case "$cooldown_h"  in ''|*[!0-9]*) cooldown_h=24  ;; esac
  case "$m4a_stale_h" in ''|*[!0-9]*) m4a_stale_h=96 ;; esac
  if [ "$stale_h" -eq 0 ] && [ "$m4a_stale_h" -eq 0 ]; then return 0; fi

  now="$(date +%s)"
  wal_stale=0; m4a_stale=0; reason=""; detail=""

  # Signal 1: wal write age — CloudKit activity stopped altogether.
  wal="$VOICE_MEMOS_DIR/CloudRecordings.db-wal"
  if [ ! -f "$wal" ]; then wal="$VOICE_MEMOS_DIR/CloudRecordings.db"; fi
  if [ -f "$wal" ]; then
    wal_m="$(_sg_mtime "$wal")"
    wal_age_h=$(( (now - wal_m) / 3600 ))
    if [ "$wal_age_h" -lt 0 ]; then wal_age_h=0; fi
    if [ "$stale_h" -gt 0 ] && [ "$wal_age_h" -ge "$stale_h" ]; then
      wal_stale=1
      reason="wal stale ${wal_age_h}h (threshold ${stale_h}h)"
      detail="CloudRecordings.db-wal last written $(date -r "$wal_m" '+%Y-%m-%d %H:%M' 2>/dev/null || echo unknown) (~${wal_age_h}h ago; threshold ${stale_h}h)."
    fi
  else
    sync_guard_log "CloudRecordings.db(-wal) not found under $VOICE_MEMOS_DIR — cannot judge wal staleness"
  fi

  # Signal 2: newest-.m4a age — catches the relaunch-rewrites-wal blind spot
  # (2026-08-12 incident): a fresh-looking wal with no file landing for days.
  if [ "$m4a_stale_h" -gt 0 ]; then
    m4a_m="$(_sg_newest_m4a_mtime)"
    if [ -n "$m4a_m" ] && [ "$m4a_m" -gt 0 ] 2>/dev/null; then
      m4a_age_h=$(( (now - m4a_m) / 3600 ))
      if [ "$m4a_age_h" -lt 0 ]; then m4a_age_h=0; fi
      if [ "$m4a_age_h" -ge "$m4a_stale_h" ]; then
        m4a_stale=1
        reason="${reason:+$reason; }no new .m4a for ${m4a_age_h}h (threshold ${m4a_stale_h}h)"
        detail="${detail:+$detail }Newest recording on the Mac is from $(date -r "$m4a_m" '+%Y-%m-%d %H:%M' 2>/dev/null || echo unknown) (~${m4a_age_h}h ago; threshold ${m4a_stale_h}h) — nothing has imported since."
      fi
    fi
  fi

  if [ "$wal_stale" -eq 0 ] && [ "$m4a_stale" -eq 0 ]; then
    if [ -e "$kicked" ] || [ -e "$alerted" ]; then
      sync_guard_log "recovered — wal and newest-.m4a both fresh; clearing kick/alert state"
      rm -f "$kicked" "$alerted"
    fi
    return 0
  fi

  if sync_guard_recording_active; then
    sync_guard_log "suspect ($reason) but an .m4a is open for write / freshly touched — skipping kick"
    return 0
  fi

  last_kick="$(_sg_mtime "$kicked")"
  if [ -e "$kicked" ] && [ $(( now - last_kick )) -lt $(( cooldown_h * 3600 )) ]; then
    return 0  # kicked recently — give the restart time to work
  fi

  # A kick a full cooldown ago didn't help — surface it before re-kicking.
  if [ -e "$kicked" ] && [ ! -e "$alerted" ]; then
    if sync_guard_alert "$detail"; then
      touch "$alerted"
      sync_guard_log "ALERT sent — still suspect ($reason) a full cooldown after a kick"
    else
      sync_guard_log "ALERT send FAILED — still suspect ($reason); will retry next cycle"
    fi
  fi

  sync_guard_log "$reason — restarting VoiceMemos.app + voicememod"
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
