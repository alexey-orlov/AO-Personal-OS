#!/usr/bin/env bash
# process_one.sh <path-to-m4a> — transcribe, classify, analyse, write+sync note.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"

SRC="${1:?usage: process_one.sh <path-to-m4a>}"
mkdir -p "$INBOX" "$TRANSCRIPTS" "$OUT_DIR" "$STATE"

fname="$(basename "$SRC")"
dst="$INBOX/$fname"
cp "$SRC" "$dst"

if ! afinfo "$dst" >/dev/null 2>&1; then
  echo "[skip] $fname looks like an undownloaded iCloud stub, not real audio." >&2
  echo "       Fix: turn OFF 'Optimize Mac Storage', or open the memo once in Voice Memos." >&2
  exit 1
fi

echo "[transcribe] $fname ..." >&2
txt="$("$PYTHON_BIN" "$HERE/transcribe.py" "$dst" "$TRANSCRIPTS")"

echo "[classify] ..." >&2
type="$(
  "$CLAUDE_BIN" -p "$(cat "$SKILLS_DIR/classify.md")" \
    ${CLASSIFY_MODEL:+--model "$CLASSIFY_MODEL"} \
    --output-format text < "$txt" | tr -d '[:space:]'
)"
if [ -z "$type" ] || [ ! -f "$SKILLS_DIR/$type.md" ]; then
  echo "[classify] '$type' unrecognised -> 'default'" >&2
  type="default"
fi
echo "[classify] -> $type" >&2

stamp="$(date +%Y-%m-%d_%H%M%S)"
# Sanitized identifier from the source recording's filename (alphanumerics only).
src_id="$(printf '%s' "${fname%.*}" | LC_ALL=C tr -cd '[:alnum:]')"
[ -n "$src_id" ] || src_id="rec"
note="$OUT_DIR/${stamp}_${type}_${src_id}.md"
# Belt-and-braces: never overwrite an existing note.
if [ -e "$note" ]; then
  i=2
  while [ -e "${note%.md}-${i}.md" ]; do i=$((i+1)); done
  note="${note%.md}-${i}.md"
fi
{
  echo "# ${type} — ${stamp}"
  echo "_source: ${fname}_"
  echo
  "$CLAUDE_BIN" -p "Analyse the call transcript provided on input, following the instructions exactly. Output Markdown only." \
    --append-system-prompt "$(cat "$SKILLS_DIR/$type.md")" \
    ${ANALYZE_MODEL:+--model "$ANALYZE_MODEL"} \
    --output-format text < "$txt"
} > "$note"

echo "[done] $fname -> $note  (type: $type)"

# Note produced — drop the working audio copy so the inbox doesn't fill the disk.
# process_one re-copies from $SRC on each run, so this is safe. Transcripts stay.
rm -f "$dst"

# Auto-commit + push the note (best-effort).
if [ "${AUTO_GIT:-0}" = "1" ]; then
  "$HERE/git_sync.sh" "$note" "call-note: ${type} ${stamp}" || true
fi
