#!/usr/bin/env bash
# run.sh — monthly leg of the SoftServe contingent-worker report.
#
# launchd fires this at 08:00 on the 1st (com.user.ss-monthly-report); it builds
# LAST month's report. Everything numeric is done by the Python helpers here; the
# claude pass only makes the judgment calls the scripts refuse to guess (which
# project rows apply, whether a business trip belongs to this month, anomalies
# worth flagging) and writes the Telegram summary.
#
# Manual run:   ./run.sh              # last month
#               ./run.sh 2026-07      # a specific month
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=config.sh
source "$HERE/config.sh"
SKILL="$REPO_ROOT/.claude/skills/ss-monthly-report/SKILL.md"
[ -f "$SKILL" ] || { echo "[ssr] missing skill: $SKILL" >&2; exit 1; }

mkdir -p "$WORK"
RUN_OUT="$WORK/last_run.out"
log() { echo "[ssr $(date '+%F %T')] $*" >&2; }

# Best-effort Telegram → General topic (no reports topic exists yet; see README).
# A notification failure must never change the run's outcome, but it must be visible.
alert() {
  printf '%s\n' "$1" | "$REPO_ROOT/automations/telegram/telegram_send.sh" >/dev/null 2>&1 \
    || log "alert send FAILED (offline / no creds) — text was: $1"
}

# ---------------------------------------------------------------- which month
MONTH="${1:-$(date -v-1m +%Y-%m)}"                       # BSD date (macOS)
Y="${MONTH%-*}"; M="${MONTH#*-}"
LAST_DAY="$(date -jf '%Y-%m-%d' "$(date -v+1m -jf '%Y-%m-%d' "$Y-$M-01" +%Y-%m-01)" +%Y-%m-%d 2>/dev/null)"
LAST_DAY="$(date -v-1d -jf '%Y-%m-%d' "$LAST_DAY" +%d 2>/dev/null || echo 31)"
LABEL="$(date -jf '%Y-%m-%d' "$MONTH-01" "+%b'%y")"      # e.g. Jul'26
PREV="$(date -v-1m -jf '%Y-%m-%d' "$MONTH-01" "+%b'%y")" # e.g. Jun'26

TARGET="$REPORTS_DIR/${FILE_PREFIX}${LABEL}.xlsx"
TEMPLATE="$TARGET"
[ -f "$TEMPLATE" ] || TEMPLATE="$REPORTS_DIR/${FILE_PREFIX}${PREV}.xlsx"
if [ ! -f "$TEMPLATE" ]; then
  log "no workbook to build from (looked for $LABEL then $PREV)"
  alert "⚠️ SS monthly report ($LABEL): no workbook found in \"$REPORTS_DIR\".
Expected ${FILE_PREFIX}${LABEL}.xlsx or last month's ${FILE_PREFIX}${PREV}.xlsx."
  exit 0
fi

ENTRIES="$WORK/entries-$MONTH.json"

# ---------------------------------------------------------------- venv
if [ ! -x "$PY" ]; then
  log "creating venv ..."
  python3 -m venv "$VENV" >/dev/null 2>&1 && "$VENV/bin/pip" install -q openpyxl >/dev/null 2>&1
fi
[ -x "$PY" ] || { log "venv missing"; alert "⚠️ SS monthly report ($LABEL): python venv missing — run automations/ss-monthly-report/setup.sh"; exit 1; }

# ---------------------------------------------------------------- get entries
SOURCE=""
if [ -n "${CLOCKIFY_API_KEY:-}" ]; then
  log "fetching $MONTH from the Clockify API ..."
  if "$PY" "$HERE/clockify_fetch.py" --month "$MONTH" --project "$CLOCKIFY_PROJECT" \
        -o "$ENTRIES" 2>>"$RUN_OUT"; then
    SOURCE="clockify-api"
  else
    log "API fetch failed — see $RUN_OUT"
  fi
fi

if [ -z "$SOURCE" ]; then
  # Fallback: a detailed-report PDF Alex exported by hand. Newest match wins.
  PDF="$(find "$PDF_SEARCH_DIR" -maxdepth 1 -name 'Clockify_Time_Report_Detailed_*.pdf' \
         -newermt "$MONTH-01" 2>/dev/null | sort | tail -1)"
  if [ -n "$PDF" ] && "$PY" "$HERE/pdf_parse.py" "$PDF" -o "$ENTRIES" 2>>"$RUN_OUT"; then
    SOURCE="pdf:$(basename "$PDF")"
    log "parsed $PDF"
  fi
fi

if [ -z "$SOURCE" ]; then
  START="$(printf '%sT00:00:00.000Z' "$MONTH-01")"
  END="$(printf '%sT23:59:59.999Z' "$MONTH-$LAST_DAY")"
  # shellcheck disable=SC2059
  URL="$(printf "$CLOCKIFY_REPORT_URL_TMPL" "$START" "$END")"
  log "no entry source available"
  alert "📄 SS monthly report ($LABEL) needs its timesheet.

No Clockify API key on this Mac and no exported PDF in ~/Downloads, so the report could not be built.

Open the detailed report, set the period to $LABEL, then Export → PDF into ~/Downloads and re-run:
$URL

Then: automations/ss-monthly-report/run.sh $MONTH

To make this fully automatic, store your Clockify API key once:
security add-generic-password -U -a \"\$USER\" -s CLOCKIFY_API_KEY -w <key>"
  exit 0
fi

# ---------------------------------------------------------------- judgment pass
CLAUDE_BIN="$(command -v claude 2>/dev/null || true)"
if [ -z "$CLAUDE_BIN" ]; then
  for p in "$HOME/.local/bin/claude" /opt/homebrew/bin/claude /usr/local/bin/claude "$HOME/.npm-global/bin/claude"; do
    [ -x "$p" ] && CLAUDE_BIN="$p" && break
  done
fi
[ -n "$CLAUDE_BIN" ] || { log "claude binary not found"; alert "⚠️ SS monthly report ($LABEL): claude CLI not found on PATH."; exit 1; }

PROMPT="Headless monthly run. Build the SoftServe contingent-worker report for ${MONTH} (${LABEL}) per the ss-monthly-report skill.
  month=${MONTH}  label=${LABEL}  rate=${SSR_RATE}
  entries=${ENTRIES}   (already fetched from ${SOURCE} — do NOT re-fetch)
  template=${TEMPLATE}
  target=${TARGET}
  template_is_target=$([ "$TEMPLATE" = "$TARGET" ] && echo yes || echo no)
You are headless: no git, no interactive questions. Bash is limited to this automation's
own scripts. Finish by writing the Telegram summary text to ${WORK}/summary.txt — subtotals
per project, grand total, and every flag a human needs to check before sending."

: > "$WORK/summary.txt"
log "building $LABEL from $SOURCE ..."
set -o pipefail
"$CLAUDE_BIN" -p "$PROMPT" \
  --append-system-prompt "$(cat "$SKILL")" \
  ${SSR_MODEL:+--model "$SSR_MODEL"} \
  --allowedTools "Read,Glob,Grep,Write,Bash(automations/ss-monthly-report/:*)" \
  --max-turns 60 \
  --output-format text 2>&1 | tee "$RUN_OUT"
rc=${PIPESTATUS[0]}

# A billing automation that fails quietly is worse than one that never ran.
if [ "$rc" -ne 0 ] || grep -qiE 'not logged in|please run /login' "$RUN_OUT" 2>/dev/null; then
  reason="skill run failed (exit $rc)"
  hint=""
  if grep -qiE 'not logged in|please run /login' "$RUN_OUT" 2>/dev/null; then
    reason="Claude CLI is not authenticated (\"Not logged in\")"
    hint="
Fix: run  claude login  in a terminal on this Mac."
  fi
  log "FAILED — $reason"
  alert "⚠️ SS monthly report ($LABEL) FAILED — $reason
Timesheet source was: $SOURCE
Transcript: automations/ss-monthly-report/.work/last_run.out${hint}"
  exit 0
fi

# "Succeeded" but produced nothing is also a failure — say so.
if [ ! -s "$TARGET" ]; then
  log "no workbook at $TARGET after a clean run"
  alert "⚠️ SS monthly report ($LABEL): the run finished cleanly but no workbook was written to
$TARGET
Transcript: automations/ss-monthly-report/.work/last_run.out"
  exit 0
fi

SUMMARY="$(cat "$WORK/summary.txt" 2>/dev/null)"
[ -n "$SUMMARY" ] || SUMMARY="Report built at $TARGET (source: $SOURCE). No summary was written — check the transcript."
alert "🧾 SS monthly report — $LABEL

$SUMMARY

File: $TARGET
Source: $SOURCE"
log "done."
