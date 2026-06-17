---
name: calendar-sync-loop
description: One tick of the always-on SoftServe->Google calendar-sync routine. Checks the clock; if it's a weekday between 08:00 and 20:00 Europe/Kyiv it runs /calendar-sync once; and on the first tick of the 08:00 hour each day it sends ONE daily status summary to the General Telegram topic (covering every run since the previous summary). Outside that window it is a no-op. Meant to be wrapped in `/loop 1h /calendar-sync-loop` inside the always-on session started by automations/calendar-sync/start.sh. Don't invoke directly except for testing.
disable-model-invocation: false
user-invocable: true
---

# calendar-sync-loop

One tick of the SoftServe → Google calendar mirror. The hourly cadence comes from the wrapping `/loop 1h`; this skill decides whether *this* tick should act. There are **no heartbeats** — the once-daily 08:00 summary is the only Telegram message.

## Procedure

1. **Load config & read the clock:**
   ```bash
   source automations/calendar-sync/config.sh
   SCHED="$(printf '{}' | bash "$CALSYNC_CORE" schedule)"   # {in_window,is_open_hour,hour,...}
   ```
   Parse `in_window` and `is_open_hour` from `$SCHED`.

2. **Outside the window?** If `in_window` is false → print `calendar-sync: outside Mon–Fri 08:00–20:00 EET — skipping` and **STOP**. The `/loop 1h` fires again in ~1h.

3. **Run one sync:** invoke the **`calendar-sync`** skill (the `/calendar-sync` command). It self-gates on `CALSYNC_DRY_RUN`, applies the plan (or prints it in dry-run), and **logs its own run record** to the run-log. Note the counts it reports.

4. **Daily summary — 08:00 hour only, once per day.** Only when `is_open_hour` is true (EET hour == 8) **and** `.work/state/last-summary-date` ≠ today's Kyiv date:
   ```bash
   TODAY="$(TZ=Europe/Kyiv date +%F)"
   LAST="$(cat automations/calendar-sync/.work/state/last-summary-date 2>/dev/null || true)"
   if [ "$TODAY" != "$LAST" ]; then
     # compute the message WITHOUT marking runs reported yet (dry_run:true)
     MSG="$(printf '{"path":"%s","dry_run":true}' "$CALSYNC_RUNLOG" | bash "$CALSYNC_CORE" daily-summary \
            | python3 -I -c 'import sys,json;print(json.load(sys.stdin)["message"])')"
     if printf '%s' "$MSG" | bash automations/telegram/telegram_send.sh; then   # General (no TG_TOPIC)
       printf '{"path":"%s"}' "$CALSYNC_RUNLOG" | bash "$CALSYNC_CORE" daily-summary >/dev/null  # now mark reported
       printf '%s' "$TODAY" > automations/calendar-sync/.work/state/last-summary-date
     fi
   fi
   ```
   The message reads `SoftServe calendar sync: X attempts, Y successful. A events added/modified.` (+ error lines when any run failed). It covers all runs since the last summary — previous working day 09:00–20:00 plus today's 08:00 — because the run-log marks each run reported exactly once.

5. **STOP.** Nothing else is sent.

## Notes
- Mark-reported and `last-summary-date` are written **only after** Telegram send succeeds, so a transient send failure rolls those runs into the next day's summary instead of dropping them.
- If the Mac/session was down at 08:00, no summary goes out that day; those runs surface in the next successful 08:00 summary.
