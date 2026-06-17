#!/usr/bin/env bash
# run.sh — one calendar-sync pass. Runs in Terminal (which holds the Calendar +
# Full-Disk grants the headless daemon needs). Invoked manually for testing, or
# hourly by the launchd agent via osascript -> Terminal.
#   run.sh now      force a run regardless of the clock (testing)
#   run.sh daemon   gated to Mon-Fri 08:00-20:00 EET; 08:00 also sends the daily summary
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
source "$HERE/config.sh"
PY="$(command -v python3 || echo /usr/bin/python3)"
core() { ( cd /tmp && "$PY" -I "$CALSYNC_HERE/sync_core.py" "$@" ); }
field() { "$PY" -I -c "import sys,json;print(json.load(sys.stdin).get('$1'))" 2>/dev/null; }

MODE="${1:-daemon}"
OPEN8="False"
if [ "$MODE" = "daemon" ]; then
  SCHED="$(printf '{}' | core schedule)"
  [ "$(printf '%s' "$SCHED" | field in_window)" = "True" ] || { echo "[calendar-sync] outside Mon-Fri 08:00-20:00 EET — skip"; exit 0; }
  OPEN8="$(printf '%s' "$SCHED" | field is_open_hour)"
fi

echo "[calendar-sync] $(date '+%F %T %Z')  DRY_RUN=$CALSYNC_DRY_RUN"
( cd /tmp && "$PY" -I "$CALSYNC_HERE/run.py" ); RC=$?

# Daily status: only on the 08:00 hour, once per day, to General (no TG_TOPIC).
if [ "$OPEN8" = "True" ]; then
  TODAY="$(TZ=Europe/Kyiv date +%F)"
  if [ "$TODAY" != "$(cat "$CALSYNC_STATE/last-summary-date" 2>/dev/null || true)" ]; then
    MSG="$(printf '{"path":"%s","dry_run":true}' "$CALSYNC_RUNLOG" | core daily-summary | "$PY" -I -c 'import sys,json;print(json.load(sys.stdin)["message"])')"
    if printf '%s' "$MSG" | bash "$CALSYNC_REPO/automations/telegram/telegram_send.sh"; then
      printf '{"path":"%s"}' "$CALSYNC_RUNLOG" | core daily-summary >/dev/null
      printf '%s' "$TODAY" > "$CALSYNC_STATE/last-summary-date"
    fi
  fi
fi
exit $RC
