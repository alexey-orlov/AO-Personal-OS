#!/usr/bin/env bash
# watch.sh — polls Voice Memos; processes each NEW .m4a once; records DONE only
# on success (so transient failures retry). Pushes any deferred commits on start.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"

mkdir -p "$STATE" "$OUT_DIR"
LEDGER="$STATE/processed.log"; touch "$LEDGER"
FAILS="$STATE/failures.log";   touch "$FAILS"
INTERVAL="${WATCH_INTERVAL:-30}"
MAX_TRIES="${MAX_TRIES:-3}"
# "Fully synced" detection: require the file size to be unchanged across
# $SYNC_CHECKS consecutive samples taken $SYNC_INTERVAL seconds apart.
SYNC_CHECKS="${SYNC_CHECKS:-3}"
SYNC_INTERVAL="${SYNC_INTERVAL:-5}"

[ -d "$VOICE_MEMOS_DIR" ] || { echo "VOICE_MEMOS_DIR not found: '$VOICE_MEMOS_DIR'. Check config.sh." >&2; exit 1; }

# Flush any locally-committed notes that didn't push (e.g. created while offline).
if [ "${AUTO_GIT:-0}" = "1" ] && command -v git >/dev/null; then
  ( cd "$REPO_ROOT" && git push >/dev/null 2>&1 && echo "[watch] flushed pending commits to git" ) || true
fi

# First run EVER: mark existing recordings as seen so we don't transcribe history.
if [ ! -s "$LEDGER" ]; then
  echo "[watch] first run: marking existing recordings as already-seen (won't be processed)."
  while IFS= read -r -d '' p; do
    echo "$(basename "$p"):$(stat -f%z "$p" 2>/dev/null || echo 0)" >> "$LEDGER"
  done < <(find "$VOICE_MEMOS_DIR" -name '*.m4a' -type f -print0 2>/dev/null)
  echo "[watch] seeded $(wc -l < "$LEDGER" | tr -d ' ') files. Only NEW recordings from now on."
fi

count_fails() { local n; n=$(grep -cxF "$1" "$FAILS" 2>/dev/null) || n=0; echo "$n"; }

# notify_failure <fname> <runlog> — alert Alex on Telegram (General topic) when
# the pipeline gives up on a recording after MAX_TRIES, so a silent failure
# pings the phone instead of sitting unnoticed. Fires exactly once per file
# (the file is skipped on subsequent loops once it hits MAX_TRIES). Best-effort:
# a Telegram failure must never break the watcher.
notify_failure() {
  local fname="$1" runlog="$2" sender tail_err
  sender="$REPO_ROOT/automations/telegram/telegram_send.sh"
  [ -x "$sender" ] || return 0
  tail_err="$(tail -c 700 "$runlog" 2>/dev/null || true)"
  # No TG_TOPIC => General topic (Alex's request). Link previews already off.
  printf '⚠️ Call pipeline FAILED — note NOT created\n\nRecording: %s\nGave up after %s attempts.\n\nLast output:\n%s\n\nFix: re-run process_one.sh on the file (full log at .work/state/last_failure.log).' \
    "$fname" "$MAX_TRIES" "$tail_err" \
    | "$sender" >/dev/null 2>&1 || echo "[watch] telegram alert failed (non-fatal)" >&2
}

echo "[watch] polling: $VOICE_MEMOS_DIR  every ${INTERVAL}s"
echo "[watch] notes -> $OUT_DIR   ($(date '+%Y-%m-%d %H:%M'))"

while true; do
  while IFS= read -r -d '' path; do
    fname="$(basename "$path")"
    dir="$(dirname "$path")"
    # Skip iCloud placeholder stubs (undownloaded files).
    if [ -e "$dir/.${fname}.icloud" ]; then
      continue
    fi
    s2="$(stat -f%z "$path" 2>/dev/null || echo 0)"
    [ "$s2" -gt 0 ] || continue
    key="${fname}:$s2"
    grep -qxF "$key" "$LEDGER" && continue
    [ "$(count_fails "$key")" -ge "$MAX_TRIES" ] && continue
    # Require the size to be stable across SYNC_CHECKS samples, SYNC_INTERVAL apart.
    stable=1
    prev="$s2"
    n=1
    while [ "$n" -lt "$SYNC_CHECKS" ]; do
      sleep "$SYNC_INTERVAL"
      cur="$(stat -f%z "$path" 2>/dev/null || echo 0)"
      if [ "$cur" != "$prev" ] || [ "$cur" -eq 0 ]; then
        stable=0
        break
      fi
      prev="$cur"
      n=$((n+1))
    done
    [ "$stable" = 1 ] || continue
    echo "[watch] processing: $fname"
    # Capture this run's output to a file so the cause survives even when the
    # launchd StandardErrorPath under /tmp gets reaped by macOS's periodic
    # tmp-cleaner (it deletes files >3 days old while the long-lived watcher
    # holds the handle open — output then goes to an unlinkable ghost inode).
    runlog="$STATE/lastrun.$$.log"
    if "$HERE/process_one.sh" "$path" >"$runlog" 2>&1; then
      cat "$runlog"
      echo "$key" >> "$LEDGER"
      rm -f "$runlog"
    else
      cat "$runlog" >&2
      echo "$key" >> "$FAILS"
      n="$(count_fails "$key")"
      echo "[watch] FAILED ($n/$MAX_TRIES, will retry): $fname" >&2
      if [ "$n" -ge "$MAX_TRIES" ]; then
        echo "[watch] giving up on $fname after $MAX_TRIES tries." >&2
        # Keep the last failed run's output at a stable path for inspection.
        cp "$runlog" "$STATE/last_failure.log" 2>/dev/null || true
        notify_failure "$fname" "$runlog"
      fi
      rm -f "$runlog"
    fi
  done < <(find "$VOICE_MEMOS_DIR" -name '*.m4a' -type f -print0 2>/dev/null)
  sleep "$INTERVAL"
done
