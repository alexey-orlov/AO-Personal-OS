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

# Recording-start timestamp — for calendar matching. Voice Memos filenames
# look like "20260520 175738-XXXX.m4a"; fall back to the source file's mtime.
rec_ts=""
if [[ "$fname" =~ ([0-9]{4})([0-9]{2})([0-9]{2})[\ _T-]+([0-9]{2})([0-9]{2})([0-9]{2}) ]]; then
  rec_ts="${BASH_REMATCH[1]}-${BASH_REMATCH[2]}-${BASH_REMATCH[3]}T${BASH_REMATCH[4]}:${BASH_REMATCH[5]}:${BASH_REMATCH[6]}"
else
  _epoch="$(stat -f "%m" "$SRC" 2>/dev/null || stat -c "%Y" "$SRC" 2>/dev/null || true)"
  [ -n "$_epoch" ] && rec_ts="$(date -r "$_epoch" +"%Y-%m-%dT%H:%M:%S" 2>/dev/null || date -d "@$_epoch" +"%Y-%m-%dT%H:%M:%S" 2>/dev/null || true)"
fi

cal_header="$STATE/cal_header.$$.md"
cal_context="$STATE/cal_context.$$.txt"
: > "$cal_header"; : > "$cal_context"
if [ -n "$rec_ts" ]; then
  echo "[calendar] lookup for $rec_ts ..." >&2
  "$PYTHON_BIN" "$HERE/calendar_lookup.py" "$rec_ts" "$cal_header" "$cal_context" || true
else
  printf '> _Calendar match skipped: could not derive recording timestamp from %s._\n' "$fname" > "$cal_header"
fi

echo "[classify] ..." >&2
# Classify on three axes: TYPE (picks the analysis skill + filename), FOLDER
# (the meeting-context subfolder under call-notes), and COACHING (whether the
# english-coaching pass is worth running). The classify skill emits three
# lines: "type: <…>", "folder: <…>", "coaching: <yes|no>". Calendar context is
# fed in so the classifier can read attendees/title to resolve the context.
classify_out="$(
  {
    if [ -s "$cal_context" ]; then
      printf '<<<CALENDAR_EVENT_CONTEXT>>>\n'
      cat "$cal_context"
      printf '<<<END_CALENDAR_EVENT_CONTEXT>>>\n\n'
    fi
    cat "$txt"
  } | "$CLAUDE_BIN" -p "Classify the call transcript on input on all three axes. Follow the classify skill instructions exactly. Output only the three required lines (type: …, folder: …, coaching: …)." \
    --append-system-prompt "$(cat "$SKILLS_DIR/classify/SKILL.md")" \
    ${CLASSIFY_MODEL:+--model "$CLASSIFY_MODEL"} \
    --output-format text
)"
type="$(printf '%s' "$classify_out" | grep -iE '^[[:space:]]*type:' | head -1 | sed -E 's/^[[:space:]]*[Tt]ype:[[:space:]]*//' | LC_ALL=C tr '[:upper:]' '[:lower:]' | LC_ALL=C tr -cd '[:alnum:]-')"
folder="$(printf '%s' "$classify_out" | grep -iE '^[[:space:]]*folder:' | head -1 | sed -E 's/^[[:space:]]*[Ff]older:[[:space:]]*//')"
coaching="$(printf '%s' "$classify_out" | grep -iE '^[[:space:]]*coaching:' | head -1 | sed -E 's/^[[:space:]]*[Cc]oaching:[[:space:]]*//' | LC_ALL=C tr '[:upper:]' '[:lower:]' | LC_ALL=C tr -cd 'a-z')"
# Only an explicit "no" skips coaching; missing/malformed -> run it (status quo).
[ "$coaching" = "no" ] || coaching="yes"
if [ -z "$type" ] || [ ! -f "$SKILLS_DIR/$type/SKILL.md" ]; then
  echo "[classify] type '$type' unrecognised -> 'default'" >&2
  type="default"
fi
# Sanitize the folder path: lowercase; keep only [a-z0-9/_-]; neutralise any
# "../" traversal; collapse and strip slashes. Empty -> the 'other' catch-all.
folder="$(printf '%s' "$folder" \
  | LC_ALL=C tr '[:upper:]' '[:lower:]' \
  | LC_ALL=C tr -cd 'a-z0-9/_-' \
  | sed -E 's#\.\.+#.#g; s#/+#/#g; s#^/+##; s#/+$##')"
[ -n "$folder" ] || folder="other"
echo "[classify] -> type:$type  folder:$folder  coaching:$coaching" >&2

stamp="$(date +%Y-%m-%d_%H%M%S)"
# Sanitized identifier from the source recording's filename (alphanumerics only).
src_id="$(printf '%s' "${fname%.*}" | LC_ALL=C tr -cd '[:alnum:]')"
[ -n "$src_id" ] || src_id="rec"
dest_dir="$OUT_DIR/$folder"
mkdir -p "$dest_dir"
note="$dest_dir/${stamp}_${type}_${src_id}.md"
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
  if [ -s "$cal_header" ]; then
    cat "$cal_header"
    echo
  fi
  # Prepend calendar context to the transcript so the analyser can use it to
  # resolve speakers, "we"-references, agenda framing, etc. The marker keeps
  # it clearly separated from the transcript body.
  {
    if [ -s "$cal_context" ]; then
      printf '<<<CALENDAR_EVENT_CONTEXT>>>\n'
      cat "$cal_context"
      printf '<<<END_CALENDAR_EVENT_CONTEXT>>>\n\n'
    fi
    cat "$txt"
  } | "$CLAUDE_BIN" -p "Analyse the call transcript provided on input, following the instructions exactly. If a CALENDAR_EVENT_CONTEXT block is present, treat it as ground-truth metadata (title, attendees, scheduled time) for the call, but do NOT echo it back verbatim — use it only to disambiguate speakers, topics, and references in the transcript. Output Markdown only." \
    --append-system-prompt "$(cat "$SKILLS_DIR/$type/SKILL.md")" \
    ${ANALYZE_MODEL:+--model "$ANALYZE_MODEL"} \
    --output-format text
} > "$note"

echo "[done] $fname -> $note  (type: $type)"

# English-coaching pass — gated by the classifier's coaching axis: skipped
# outright for test recordings and predominantly-RU/UA calls where the user's
# English is negligible. When it does run, the skill self-filters to the
# user's English utterances and identifies the user from the project CLAUDE.md
# (auto-loaded by claude -p from the working directory — hence the cd into
# REPO_ROOT). coach_note stays empty when no report is produced.
coach_note=""
if [ "$coaching" = "no" ]; then
  echo "[english-coaching] skipped — classifier: no coachable English (test recording or RU/UA call)." >&2
else
  echo "[english-coaching] ..." >&2
  COACH_DIR="$REPO_ROOT/outputs/english-coaching"
  mkdir -p "$COACH_DIR"
  coach_body="$STATE/coach_body.$$.md"
  (
    cd "$REPO_ROOT"
    {
      if [ -s "$cal_context" ]; then
        printf '<<<CALENDAR_EVENT_CONTEXT>>>\n'
        cat "$cal_context"
        printf '<<<END_CALENDAR_EVENT_CONTEXT>>>\n\n'
      fi
      cat "$txt"
    } | "$CLAUDE_BIN" -p "Analyse the call transcript on input for English-language coaching, following the english-coaching skill instructions exactly. You are being invoked headlessly from the call-pipeline — do NOT write files, output Markdown analysis only on stdout. If a CALENDAR_EVENT_CONTEXT block is present, use it for speaker disambiguation only — do not echo it back." \
      --append-system-prompt "$(cat "$SKILLS_DIR/english-coaching/SKILL.md")" \
      ${ANALYZE_MODEL:+--model "$ANALYZE_MODEL"} \
      --output-format text
  ) > "$coach_body"
  # Second gate: the skill bails out with a sentinel line when the transcript
  # is unreadable or the user's English is too sparse to coach. Discard those
  # instead of saving a junk note. ("Could not identify ... which speaker"
  # bail-outs ARE saved — they flag a real call needing a manual re-run.)
  if grep -qE '^(No coaching performed:|Input does not look like a readable transcript)' "$coach_body"; then
    echo "[english-coaching] skipped — skill bailed out: $(grep -m1 -E '^(No coaching performed:|Input does not look like a readable transcript)' "$coach_body")" >&2
  else
    coach_note="$COACH_DIR/${stamp}_${type}_${src_id}.md"
    if [ -e "$coach_note" ]; then
      i=2
      while [ -e "${coach_note%.md}-${i}.md" ]; do i=$((i+1)); done
      coach_note="${coach_note%.md}-${i}.md"
    fi
    {
      echo "# english-coaching — ${stamp}"
      echo "_source: ${fname}_"
      echo
      if [ -s "$cal_header" ]; then
        cat "$cal_header"
        echo
      fi
      cat "$coach_body"
    } > "$coach_note"
    echo "[done] coaching -> $coach_note"
  fi
  rm -f "$coach_body"
fi

# Notes produced — drop the working audio copy so the inbox doesn't fill the disk.
# process_one re-copies from $SRC on each run, so this is safe. Transcripts stay.
rm -f "$dst" "$cal_header" "$cal_context"

# Auto-commit + push the note(s) in a single commit (best-effort).
if [ "${AUTO_GIT:-0}" = "1" ]; then
  "$HERE/git_sync.sh" "call-note: ${type} ${stamp}" "$note" ${coach_note:+"$coach_note"} || true
fi

# Hand the coaching report (if one was produced) off to the coaching-notify
# orchestrator (digest + Telegram). Non-fatal: the report is already saved
# (and pushed, if AUTO_GIT); a notify failure is just a missed message.
if [ -n "$coach_note" ]; then
  "$REPO_ROOT/automations/coaching-notify/notify.sh" "$coach_note" || true
fi

# Context-wiki update — fold the new call note into context/ (project pages +
# index) via the context-update skill, so the wiki tracks every call with no
# manual step. The ONE tool-enabled headless call in this pipeline: it edits
# files under context/, so it gets Read/Glob/Grep/Edit/Write — but NOT Bash;
# the commit happens here via git_sync.sh. Non-fatal: anything missed is
# caught by the next interactive `/context-update` sweep (the ledger knows).
if [ "${CONTEXT_UPDATE:-1}" = "1" ] && [ -f "$SKILLS_DIR/context-update/SKILL.md" ]; then
  echo "[context-update] ..." >&2
  rel_note="${note#"$REPO_ROOT"/}"
  if (
    cd "$REPO_ROOT"
    "$CLAUDE_BIN" -p "Single-artifact mode: fold the new call note at '$rel_note' into the context wiki, following the context-update skill instructions exactly. You have no Bash tool — do not attempt git; update the ledger by Read + Write of context/_meta/processed.txt." \
      --append-system-prompt "$(cat "$SKILLS_DIR/context-update/SKILL.md")" \
      ${CONTEXT_MODEL:+--model "$CONTEXT_MODEL"} \
      --allowedTools "Read,Glob,Grep,Edit,Write" \
      --max-turns 40 \
      --output-format text >/dev/null
  ); then
    "$HERE/git_sync.sh" "context: fold ${rel_note##*/}" "$REPO_ROOT/context" || true
    echo "[done] context wiki updated"
  else
    echo "[context-update] failed (non-fatal)" >&2
  fi
fi
