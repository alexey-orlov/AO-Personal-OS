# calendar-sync — SoftServe (Apple Calendar) → Google Calendar mirror

One-way, always-on mirror of Alex's **SoftServe** work calendar into his **Google** calendar
(`orlov.alexej@gmail.com`) as `SS:`-prefixed copies, for **this week + next week**. Reads SS from the
**SoftServe Exchange account in Apple Calendar (EventKit)**; writes Google via the **Calendar API**.
Runs **hourly, weekdays 08:00–20:00 EET**. Sends **one** Telegram status per day.

## Architecture — pure code, no Claude session, no browser
SoftServe is Intune/VPN-managed (no third-party API login) and the new Outlook for Mac keeps no
parseable local store — so the only headless read is **EventKit**. The whole pipeline is deterministic
code; there is no live Claude session, no Chrome MCP, no Google connector.

```
Apple Calendar (EventKit, Swift)  →  sync_core.reconcile (brain)  →  Google Calendar API
   ss_cal_read.swift                    sync_core.py                    gcal.py
                         orchestrated by run.py, hosted by launchd → Terminal → run.sh
```

- **`ss_cal_read.swift`** → compiled to `.work/ss-cal-read`. Reads the SS Exchange calendar and emits
  one JSON row per event: uid, title, start/end (local Kyiv wall time), `all_day`, `recurring`,
  location, organizer (+email), **`my_status`** (the user's RSVP), online/join_url, notes, and
  `attendees[{name,email,status,is_me}]`.
- **`sync_core.py`** — deterministic brain: timezone math, per-occurrence keys, content-hash diff,
  ledger, payload + description building, status→Busy/Free mapping, schedule gate, daily-summary
  aggregation. Stdlib only, fully unit-tested.
- **`gcal.py`** — dependency-free Google client (stdlib urllib). OAuth installed-app flow; list /
  create / update / delete, always `sendUpdates=none`.
- **`run.py`** — one pass: EventKit read → `reconcile` → apply via `gcal`. Skips all-day events
  (holidays). Writes the last raw read to `.work/state/last-read.json` for diagnostics.
- **Host:** launchd `com.user.calendar-sync` fires `osascript → Terminal → run.sh daemon` hourly on the
  hour, Mon–Fri 08:00–20:00. Terminal is the host because EventKit + Full-Disk need its TCC grants — a
  plain background process is denied Calendar access.

## Files
| File | Role |
|---|---|
| `ss_cal_read.swift` | EventKit reader (built to `.work/ss-cal-read` by `setup.sh`) |
| `sync_core.py` | deterministic core (`reconcile` / `extract` / `schedule` / `log-run` / `daily-summary` / `commit`) |
| `gcal.py` | dependency-free Google Calendar client (`auth` once, then library calls) |
| `run.py` | orchestrator — EventKit → reconcile → Google |
| `run.sh` | Terminal-hosted runner: `now` (force) / `daemon` (gated + 08:00 daily summary) |
| `test_sync_core.py` | unit tests (28) |
| `config.sh` | constants + Keychain creds + `LIVE` flag |
| `setup.sh` | builds the reader (swiftc) + installs the launchd agent (one-time) |
| `.work/state/` | ledger.json, run-log.jsonl, gtoken.json, last-read.json, last-summary-date, LIVE (git-ignored) |

## Rules it enforces
- **One-way** SS → Google. Sole attendee is **always** `orlov.alexej@gmail.com`; every write uses
  `sendUpdates=none` — **nothing is emailed to SS colleagues**.
- Only events carrying our `extendedProperties.private.ssSync` marker (legacy: `[[ss-sync:…]]` in the
  description) are ever updated/deleted — **never** a native event.
- Cancellations (`Отменено:` / `Cancelled:` …) and out-of-window meetings → the copy is **deleted**
  (suppressed entirely if the read was incomplete).
- **Native dedup:** an SS meeting already on Google (same title, `olekorlov@softserveinc.com` as
  organizer/attendee) is **skipped**, not duplicated.

## Status sync — Busy/Free + "Your response"
Each copy mirrors the user's real SS RSVP:

| SS status (`my_status`) | Google `transparency` | Description line |
|---|---|---|
| accepted | **Busy** (opaque) | `Your response: accepted` |
| tentative | **Busy** (opaque) | `Your response: tentative` |
| declined | **Free** (transparent) | `Your response: declined` |
| not answered / unknown / not individually invited | **Free** (transparent) | `Your response: no response` |

Only meetings you positively committed to (accepted/tentative) hold your time. The description also
lists the organizer and the full participant roster with each person's status.

## Platform gotchas (hard-won — don't regress these)
1. **EventKit times default to GMT.** The reader sets `iso.timeZone = .current` so start/end are Kyiv
   wall time. (Verified: `T-shirt kick-off` reads 18:00 Kyiv, matching the desktop app.)
2. **A recurring series shares ONE EventKit id across all instances.** `source_key` therefore appends
   the Kyiv date for recurring events — otherwise weekly/daily occurrences collide on one key and one
   copy goes stale. The delete pass dedupes by Google event id so old collided copies get cleaned up.
3. **EventKit returns `attendees` in an unstable order across reads.** `build_description` sorts the
   roster deterministically — without this the description re-hashes every run and the daemon never
   converges (phantom hourly "N modified").
4. **Google forces the calendar OWNER's attendee `responseStatus` to `accepted`** on events you own, so
   the RSVP badge can't show tentative/needsAction. The honest signal is `transparency` (Busy/Free) plus
   the `Your response:` description line — not the attendee status.
5. **Read "my status" via `EKParticipant.isCurrentUser`**, not an SMTP email match — Exchange attendee
   URLs are often X500/DN and miss. An empty/unknown status is treated as **no response** (never accepted).
6. **TCC:** EventKit + Full-Disk are granted to **Terminal**, so the daemon runs via
   launchd→osascript→Terminal. A plain background/CLI process gets `EVENTKIT_DENIED`.

## Setup (one-time)
Run from a **Terminal with Full Disk Access + Calendar access**:
1. Add the SoftServe Exchange account to **Apple Calendar** (System Settings → Internet Accounts), so SS
   events appear in EventKit.
2. `bash automations/calendar-sync/setup.sh` — builds the reader and installs the launchd agent. It then
   prints the **Google OAuth** steps:
   - Enable the Calendar API; create a **Desktop-app** OAuth client; set the consent screen to **In
     production** (a "Testing" app expires the refresh token every 7 days).
   - Store the client id/secret in Keychain (`CALSYNC_GOOGLE_CLIENT_ID` / `_SECRET`).
   - `source config.sh && python3 -I gcal.py auth` to authorize once.
3. It runs in **DRY-RUN** (plans only) until you go live: `touch .work/state/LIVE`.

## Schedule & notifications
- Hourly, **Mon–Fri 08:00–20:00 Europe/Kyiv** (launchd `StartCalendarInterval`; `run.sh daemon`
  re-checks the gate so a stray tick is a no-op).
- **One** message/day to the **General** Telegram topic right after the 08:00 run:
  `SoftServe calendar sync: X attempts, Y successful. A events added/modified.` (+ error lines if any).
  It covers every run since the previous summary (previous working day 09:00–20:00 + today 08:00).

## Test / verify
```bash
# unit tests (no Calendar/network needed)
cd /tmp && python3 -I /Users/olekorlov/Documents/GitHub/AO-Personal-OS/automations/calendar-sync/test_sync_core.py
# force one real pass (from a Terminal with the grants)
automations/calendar-sync/run.sh now
# trigger the installed daemon out-of-cycle
launchctl kickstart -k "gui/$(id -u)/com.user.calendar-sync"
```

## Limits
- Runs only while the **Mac is awake/unlocked**. The daily summary makes liveness observable.
- A Google refresh-token lapse (only if the consent screen reverts to "Testing") needs a re-`auth`;
  surfaced via the daily summary as a write error.

## Uninstall
```bash
launchctl bootout "gui/$(id -u)" "$HOME/Library/LaunchAgents/com.user.calendar-sync.plist"
```
