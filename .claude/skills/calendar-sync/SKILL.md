---
name: calendar-sync
description: Mirror Alex's SoftServe (SS) work calendar into his Google Calendar as "SS:"-prefixed copies. Reads the SS calendar from Outlook-on-the-web via the Claude-for-Chrome MCP (background tab, no focus-steal), reconciles against Google with a deterministic Python core, then creates / updates / deletes copies through the Google Calendar connector. One-way (SS -> Google), idempotent, and self-calibrating for OWA's display timezone. The sole attendee is always orlov.alexej@gmail.com and nothing is ever emailed to SS colleagues. Use on /calendar-sync, "sync my SoftServe calendar", "mirror my SS meetings to Google", or headlessly each hour from the calendar-sync-loop skill. Honors a DRY_RUN gate for supervised first runs.
disable-model-invocation: false
user-invocable: true
---

# calendar-sync

Mirror this-week + next-week SoftServe (SS) meetings into Google Calendar as `SS: <title>` copies. One pass = one reconcile. The deterministic logic (timezone conversion, matching, diffing, the ledger, payload shaping, the schedule gate) lives in `automations/calendar-sync/sync_core.py`; this skill is the I/O shell around it.

## Non-negotiable safety rules
- **One-way only:** SS (read) → Google (write). Never write back to Outlook/OWA.
- **Sole attendee** of every copy is `orlov.alexej@gmail.com`. **Never** add SS invitees/organizers as attendees, and **never** send email — every create/update/delete uses `notificationLevel: NONE`.
- **Touch only our own copies.** Only events carrying the hidden `[[ss-sync:…]]` marker (created by this skill) may be updated or deleted. Never modify a native Google event.
- **No deletes on a bad read.** If the OWA read failed or looks incomplete, set `source_complete:false` — the core then proposes zero deletions.

## Inputs / setup
```bash
source automations/calendar-sync/config.sh      # CALSYNC_* incl. CALSYNC_DRY_RUN
NOW_UTC="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
CORE="automations/calendar-sync/core.sh"        # wraps `python3 -I sync_core.py` (TCC-safe)
```
The **Google Calendar connector** tools are `mcp__4ce225fb-07bf-42fd-b241-c181ddf16bc1__{list_events,create_event,update_event,delete_event}` (if the id differs in your session, use the connected Google Calendar connector's equivalents). Target calendar = `orlov.alexej@gmail.com`.

## Procedure (one sync pass)

1. **Read SS from OWA** via the Claude-for-Chrome MCP — follow `references/read-owa.md`. Produces:
   - `source_events[]` — `{title, start_wall, end_wall, all_day, online, join_url, location, organizer, attendees}` (times are OWA's *displayed* wall clock; do **not** pre-convert).
   - `owa_now_wall` — OWA's displayed "today date + current time" (naive ISO). **Required** for timezone self-calibration — OWA shows this mailbox in US/Pacific, not Kyiv.
   - `source_complete` — `true` only if both weeks read cleanly.

2. **Read Google copies + natives** over the window:
   - `list_events(calendarId=$CALSYNC_CALENDAR_ID, startTime=<this-Monday>, endTime=<+16d>, pageSize=250)`.
   - Pipe the returned events into `extract` to split ours vs. native, with marker binding intact:
     ```bash
     echo "$LIST_EVENTS_JSON" | $CORE extract   # -> {google_copies, google_native}
     ```

3. **Load the ledger:** read `$CALSYNC_LEDGER` (JSON object) if it exists, else `{}`.

4. **Reconcile** — assemble the input and run the core:
   ```bash
   echo "$INPUT" | $CORE reconcile   # INPUT = {now_utc, owa_now_wall, source_events,
                                      #          source_complete, ledger, google_copies, google_native}
   ```
   Output = `{creates[], updates[], deletes[], skips[], counts, owa_offset_minutes, window}`. Each create/update carries a ready `payload`. See `references/matching-rules.md` for what reconcile guarantees.

5. **DRY-RUN gate.** If `CALSYNC_DRY_RUN=1`: print the plan (counts + a one-line list of creates/updates/deletes), log the run, and **stop — make no Google writes**:
   ```bash
   echo '{"path":"'"$CALSYNC_RUNLOG"'","ok":true,"added":0,"modified":0,"deleted":0}' | $CORE log-run
   ```

6. **Apply (live only, `CALSYNC_DRY_RUN=0`).** Map each `payload` to the connector per `references/google-payload.md`:
   - **creates** → `create_event(...)`; capture the new event id.
   - **updates** → `update_event(eventId=<google_event_id>, ...)` (summary/start/end/timeZone/location/description/visibility/notificationLevel — leave attendees alone).
   - **deletes** → `delete_event(eventId=<google_event_id>, notificationLevel="NONE")`.
   Continue past individual failures; remember which succeeded.

7. **Commit the ledger** with only what actually applied:
   ```bash
   echo '{"path":"'"$CALSYNC_LEDGER"'","applied":{"creates":[...],"updates":[...],"deletes":[...]}}' | $CORE commit
   ```
   (each create/update item = `{source_key, content_hash, google_event_id, start_kiev, title}`; delete item = `{source_key}`.)

8. **Log the run:**
   ```bash
   echo '{"path":"'"$CALSYNC_RUNLOG"'","ok":true,"added":<#creates>,"modified":<#updates>,"deleted":<#deletes>}' | $CORE log-run
   ```
   On a hard failure (OWA unreachable, connector error): `ok:false` and `"error":"<one line>"`, then report and stop. The daily Telegram summary (08:00, owned by `calendar-sync-loop`) will surface it.

9. **Report** the counts in chat (or to the caller): `created N, updated M, deleted K, skipped S` (+ `DRY-RUN` when applicable).

## Notes
- Idempotent: a second pass with no SS changes yields all-skips and zero writes.
- The window is Monday-of-this-week through +14 days (this + next week), `Europe/Kyiv`.
- Recurring meetings appear as one event per day in OWA → one copy per instance (keyed by date).
- This skill never sends Telegram itself; liveness/summary is the loop's job.
