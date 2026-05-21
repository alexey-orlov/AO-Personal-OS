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

stamp="$(date +%Y-%m-%d_%H%M)"
note="$OUT_DIR/${stamp}_${type}.md"
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

# Auto-commit + push the note (best-effort).
if [ "${AUTO_GIT:-0}" = "1" ]; then
  "$HERE/git_sync.sh" "$note" "call-note: ${type} ${stamp}" || true
fi
