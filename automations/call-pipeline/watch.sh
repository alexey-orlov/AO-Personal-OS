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

echo "[watch] polling: $VOICE_MEMOS_DIR  every ${INTERVAL}s"
echo "[watch] notes -> $OUT_DIR   ($(date '+%Y-%m-%d %H:%M'))"

while true; do
  while IFS= read -r -d '' path; do
    s2="$(stat -f%z "$path" 2>/dev/null || echo 0)"
    [ "$s2" -gt 0 ] || continue
    key="$(basename "$path"):$s2"
    grep -qxF "$key" "$LEDGER" && continue
    [ "$(count_fails "$key")" -ge "$MAX_TRIES" ] && continue
    sleep 2
    [ "$s2" = "$(stat -f%z "$path" 2>/dev/null || echo 0)" ] || continue
    echo "[watch] processing: $(basename "$path")"
    if "$HERE/process_one.sh" "$path"; then
      echo "$key" >> "$LEDGER"
    else
      echo "$key" >> "$FAILS"
      n="$(count_fails "$key")"
      echo "[watch] FAILED ($n/$MAX_TRIES, will retry): $(basename "$path")" >&2
      [ "$n" -ge "$MAX_TRIES" ] && echo "[watch] giving up on $(basename "$path") after $MAX_TRIES tries." >&2
    fi
  done < <(find "$VOICE_MEMOS_DIR" -name '*.m4a' -type f -print0 2>/dev/null)
  sleep "$INTERVAL"
done
