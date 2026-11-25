# calendar-sync — SoftServe ↔ Google two-way busy sync

Always-on, **two-way busy sync** between Alex's **SoftServe** work calendar and his **Google** calendars,
for **this week + next week**:
- **Forward** — each SoftServe meeting is mirrored into Google as an `SS:`-prefixed copy (with the real
  Busy/Free status + organizer/participants).
- **Reverse** — wherever Alex is busy in **any** Google calendar (Alex Orlov / Family) or in GigaCloud's
  Exchange calendar, a content-free **"Busy"** placeholder is written into SoftServe so colleagues can't
  book over it.

Reads SS from the **SoftServe Exchange account in Apple Calendar (EventKit)**, reads/writes Google via the
**Calendar API**, and writes SS placeholders back via **EventKit**. Runs **every 30 minutes around the
clock, Monday–Friday, on the Mac's own clock** — Alex is in San Francisco and works with Europe and the
US at once. Sends **one** Telegram status per day. Both legs guard against feedback loops (see Reverse leg).

## Architecture — pure code, no Claude session, no browser
SoftServe is Intune/VPN-managed (no third-party API login) and the new Outlook for Mac keeps no
parseable local store — so the only headless read is **EventKit**. The whole pipeline is deterministic
code; there is no live Claude session, no Chrome MCP, no Google connector.

```
forward:  Apple Calendar (EventKit read)  →  sync_core.reconcile          →  Google Calendar API
reverse:  Google Calendar API (all cals)  →  sync_core.reverse_reconcile  →  Apple Calendar (EventKit write)
          + GigaCloud's Exchange calendar (EventKit read)
            ss_cal_read.swift / gcal.py        sync_core.py                   ss_cal_write.swift / gcal.py
                 both passes orchestrated by run.py, hosted by launchd → CalendarSync.app (no window) → run.sh
```

- **`ss_cal_read.swift`** → compiled to `.work/ss-cal-read`. Reads SoftServe's account
  (`--type exchange --source Exchange`) or one named calendar (`--type exchange --calendar Календар
  --from <iso>`; names exact and case-insensitive, as `--list` prints them) and emits one JSON row
  per event: uid, title, start/end (absolute ISO instants carrying the Mac's local offset), `all_day`,
  `recurring`, location, organizer (+email), **`my_status`** (the user's RSVP), online/join_url, notes,
  `attendees[{name,email,status,is_me}]`, and the event's `calendar`/`source`/`source_type`,
  `external_id` (iCal UID), `occurrence` (original start in a series), `detached`, `availability`,
  `status`. It never reads more than was named: an unknown flag exits 4 (`BAD_ARG`, e.g. the retired
  `--exchange`), a filter that matches no calendar exits 5 (`NO_MATCHING_CALENDAR`; EventKit reads every
  calendar for an empty list), and a `--source` title two accounts share exits 6 (`AMBIGUOUS_SOURCE`).
- **`ss_cal_write.swift`** → compiled to `.work/ss-cal-write`. Reverse leg: reads `create|update|delete`
  JSON commands on stdin and writes/removes `availability=.busy` "Busy" events (no attendees, a
  `[[gcal-busy:<key>]]` note) in exactly one calendar, `CALSYNC_SS_WRITE_CAL` of the Exchange account
  `CALSYNC_SS_SOURCE`, and exits 3 when that isn't exactly one calendar. It updates or deletes only
  events in that calendar that carry the marker, and refuses any other; echoes each event's
  `calendarItemIdentifier`.
- **`sync_core.py`** — deterministic brain: timezone math, per-occurrence keys, content-hash diff,
  ledgers, payload + description building, status→Busy/Free mapping, the reverse busy-filter +
  `reverse_reconcile`, schedule gate, daily-summary aggregation. Stdlib only, fully unit-tested.
- **`gcal.py`** — dependency-free Google client (stdlib urllib). OAuth installed-app flow (scopes:
  `calendar.events` for forward writes + `calendar.readonly` for the reverse multi-calendar read);
  `list_calendars` / list / create / update / delete, always `sendUpdates=none`.
- **`run.py`** — one tick = **forward pass** (EventKit read of SoftServe's account only → `reconcile` →
  `gcal`) then **reverse pass** (all Google calendars + `CALSYNC_EK_SOURCES` → `reverse_reconcile` →
  `ss-cal-write`). Skips all-day events; pulls our own `[[gcal-busy]]` placeholders out of the forward
  source. Writes, for diagnostics, `.work/state/last-read.json` (the SS read) and
  `.work/state/calendars.txt` (every Apple Calendar calendar with its count of timed events in the
  window). A DRY run lists every create and delete it would make, in both legs.
- **Host:** launchd `com.user.calendar-sync` runs `open -g -j -W ~/Applications/CalendarSync.app` every
  30 minutes (:00 and :30), Mon–Fri Mac-local time. The app is a faceless AppleScript applet built by
  `setup.sh` (`LSUIElement`: no window, no Dock icon) that runs `run.sh daemon` and holds the macOS
  privacy grants the run needs, Calendar and the Documents folder; a plain launchd process is denied
  both. Its output goes to `~/Library/Logs/calendar-sync/host.log` (outside `~/Documents`, so a lost
  Documents grant still leaves a trace), and a failed run posts a macOS notification. Until 2026-11-20
  each tick opened a Terminal window to borrow Terminal's grants; the windows popped up every hour and
  never closed (335 open). `setup.sh --terminal-host` keeps that path as a fallback, with each window
  closing itself.

## Files
| File | Role |
|---|---|
| `ss_cal_read.swift` | EventKit **reader** (built to `.work/ss-cal-read` by `setup.sh`) |
| `ss_cal_write.swift` | EventKit **writer** — reverse-leg "Busy" placeholders (built to `.work/ss-cal-write`) |
| `sync_core.py` | deterministic core (`reconcile` / `extract` / `reverse-sources` / `reverse-reconcile` / `schedule` / `log-run` / `daily-summary` / `commit`) |
| `gcal.py` | dependency-free Google Calendar client (`auth`/`authurl`/`exchange` once, then library calls) |
| `run.py` | orchestrator — forward pass (SS→Google) then reverse pass (Google→SS) |
| `run.sh` | runner, one run at a time (`.work/state/run.lock`, stale locks taken over): `now` (force) / `daemon` (gated + 08:00 daily summary) |
| `test_sync_core.py` | unit tests (42) |
| `config.sh` | constants + Keychain creds + `LIVE` flag + `CALSYNC_SS_SOURCE`/`CALSYNC_SS_WRITE_CAL` (SoftServe's account and calendar) + `CALSYNC_EK_SOURCES` (calendars read from Apple Calendar) |
| `setup.sh` | builds the reader + writer (swiftc), builds the host app if missing, installs the launchd agent. `--plist-only` reinstalls just the agent · `--build-host` builds the app only (test before switching) · `--rebuild-host` rebuilds it and reinstalls (macOS asks for the grants again) · `--terminal-host` installs the Terminal fallback. Lints the plist before replacing anything. |
| `~/Applications/CalendarSync.app` | the faceless host app (built by `setup.sh`, not in git); its grants live in System Settings → Privacy & Security → Calendars / Files and Folders |
| `~/Library/Logs/calendar-sync/host.log` | every run's console output, plus a line when the host can't start `run.sh` |
| `.work/state/` | ledger.json, **reverse-ledger.json**, run-log.jsonl, gtoken.json, last-read.json, calendars.txt, last-summary-date, LIVE (git-ignored) |

## Rules it enforces
- **One-way** SS → Google. Sole attendee is **always** `orlov.alexej@gmail.com`; every write uses
  `sendUpdates=none` — **nothing is emailed to SS colleagues**.
- Only events carrying our `extendedProperties.private.ssSync` marker (legacy: `[[ss-sync:…]]` in the
  description) are ever updated/deleted — **never** a native event.
- Cancellations (`Отменено:` / `Cancelled:` …) and out-of-window meetings → the copy is **deleted**
  (suppressed entirely if the read was incomplete).
- **Native dedup:** an SS meeting already on Google (same title, `olekorlov@softserveinc.com` as
  organizer/attendee) is **skipped**, not duplicated.
- **One copy per meeting, both legs:** when a slot ends up with two copies (two `SS:` events in Google
  with one `ssSync` key, or two SS "Busy" blocks with one `[[gcal-busy]]` key), each run keeps the one the
  ledger points at (else the first listed) and deletes the rest; the kept one's ledger entry stays.
  Until 2026-11-24 a duplicate of a live slot was never pruned: one `SS:` copy left an hour early by the
  CET bug and three doubled "Busy" blocks sat there for days. How one arises: a create times out on our
  side after the server already took it (the `SS:` copy, 2026-11-18), so the ledger never records it,
  and when it lies past the window the next run lists (the Google read stops at Monday + 16 days while
  the SS read runs 14 days from now, so Wed–Fri), that run creates it again. Such a pair is pruned
  once both are listed.

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

## Reverse leg — Google busy → SS "Busy"
After the forward pass, `run.py` blocks SS time wherever Alex is busy in Google:
- **Source:** every Google calendar (`list_calendars`) — primary, Family, Дети, **GigaCloud** — read
  in-window. Calendars hidden in Google's calendar list are skipped (2026-11-24: only "a.orlov", an
  empty URL import). A slot counts as **busy** if it is timed (not all-day), not `transparent` (Free),
  not cancelled, and not self-declined. iCloud Home/Work are not read (no timed events, 2026-11-24).
- **GigaCloud straight from Apple Calendar** (`CALSYNC_EK_SOURCES="exchange:Календар=<Google copy's
  id>"`, since 2026-11-24): Google's GigaCloud is a copy of its published Outlook feed that Google
  refreshes every 5–6 h (see Limits). Apple Calendar holds GigaCloud's own Exchange account (titled by
  its address; its main calendar is «Календар»), so the reverse leg reads that calendar through EventKit
  and skips Google's copy. `sync_core.eventkit_busy` applies the same busy rule, plus one the feed could
  not: a meeting Alex declined doesn't block. SoftServe's own account never counts as a source. The key
  is `ek:<iCal UID>` (plus the original start for an occurrence of a series) and names no calendar or
  account, because it sits in the SS block's notes, which SS colleagues with full-details access can
  read. If the account leaves Apple Calendar, Google's copy is the source again. If Apple Calendar can't
  be listed or read, neither copy is used and nothing is pruned that run, so one bad read never re-keys
  GigaCloud's blocks twice. The switch re-keyed them once (2026-11-24 16:42 PT: 25 Google-keyed blocks
  deleted, the same 25 slots created from Exchange; the next run changed nothing). EventKit reports some
  feeds' availability as `notSupported`; that counts as busy.
- **1:1 placeholders:** each busy slot → one SS event titled **"Busy"**, `availability=.busy`, **no
  attendees** (nothing emailed), **no details** (colleagues see only that the time is taken). Keyed by
  `calendarId::eventId` (Google) or `ek:<iCal UID>` (Apple Calendar); create/update/delete tracked in
  `reverse-ledger.json`. The idempotency hash is over the **absolute UTC instant** (Google and EventKit
  render the same moment with different offsets).
- **Anti-recursion (two loops, both broken):**
  - *SS→Google→SS:* the reverse source filter skips forward copies (`SS:` prefix **or** `ssSync` marker)
    and any event with `olekorlov@softserveinc.com` as organizer/attendee — so real SS meetings and our
    own copies are never blocked back.
  - *Google→SS→Google:* every placeholder carries a `[[gcal-busy:<key>]]` note; the forward reader pulls
    those out of its source, so placeholders are never mirrored into Google as `SS: Busy`.
- **Disable** with `CALSYNC_REVERSE=0`. Scope/granularity (e.g. work-hours only, or a calendar subset) is
  a small change in `sync_core.reverse_sources`.

## Platform gotchas (hard-won — don't regress these)
1. **The Mac's timezone is not Kyiv's.** The reader sets `iso.timeZone = .current` (EventKit's default
   is GMT), so each start/end carries the Mac's local offset: `+02:00` in Kyiv, `+01:00` in Poland,
   `-08:00` in California. `sync_core._to_tz` converts that **instant** to Kyiv and never re-reads the
   wall clock as Kyiv time. When it did (until 2026-11-19), a trip put the Mac on CET and every `SS:`
   copy in Google landed an hour early; on PST it would have been ten. Only an offset-less wall time
   (the legacy OWA scrape) is interpreted via `owa_tz`.
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
6. **TCC:** EventKit and `~/Documents` are granted to the **host app**, and `run.sh`, python and the
   Swift tools inherit them; a plain background/CLI process gets `EVENTKIT_DENIED`. The app is ad-hoc
   signed, so **rebuilding it drops its grants**: `setup.sh` builds it only when missing, and after
   `--rebuild-host` macOS asks again (Calendar, Documents folder) and a run that can't get them fails
   with `EVENTKIT_DENIED` in the daily summary or a host.log line plus a notification. The host's shell
   gets a bare environment, so it sets PATH to Terminal's (Homebrew python3 3.14, not `/usr/bin`'s 3.9)
   and `config.sh` defaults USER/HOME for the Keychain lookups.
7. **AppleScript `contents of t` on a tab held in a variable returns the tab, not its text** (the
   built-in `contents` operator dereferences the variable). Use Terminal's `history of tab 1 of w`.
   It silently matched nothing in the 2026-11-20 window cleanup until switched.
8. **Two Exchange accounts: everything SoftServe is pinned by account title.** Apple Calendar holds
   SoftServe's account ("Exchange", the name macOS gives a new Exchange account) and, since 2026-11-24,
   GigaCloud's. `CALSYNC_SS_SOURCE` pins the forward read (`--type exchange --source Exchange`) and the
   writer (`CALSYNC_SS_WRITE_CAL` of that account, nothing else), and the reverse leg never reads that
   account. A title two accounts share stops the run (reader exit 6, writer exit 3), so if another
   Exchange account ever arrives under the default name, rename one in System Settings → Internet
   Accounts. Why: the 16:30 PT run on 2026-11-24, minutes after the GigaCloud account was added, read its
   19 meetings as SoftServe (the old `--exchange` took every Exchange account) and put 18 `SS:` copies
   into Google (no one notified: Alex is their only attendee). The guard meant to stop it looked for a
   second calendar titled "Calendar", and GigaCloud's is «Календар». The pinned run at 16:42 deleted
   all 18.

## Setup (one-time)
1. Add the SoftServe Exchange account to **Apple Calendar** (System Settings → Internet Accounts), so SS
   events appear in EventKit.
2. `bash automations/calendar-sync/setup.sh` — builds the reader **and writer** and the host app, and
   installs the launchd agent. The host app's first run asks for **Calendar** and **Documents folder**
   access: allow both. It then prints the **Google OAuth** steps:
   - Enable the Calendar API; create a **Desktop-app** OAuth client; set the consent screen to **In
     production** (a "Testing" app expires the refresh token every 7 days).
   - Store the client id/secret in Keychain (`CALSYNC_GOOGLE_CLIENT_ID` / `_SECRET`).
   - `source config.sh && python3 -I gcal.py auth` to authorize once. Scopes: **`calendar.events`**
     (forward writes) **+ `calendar.readonly`** (reverse multi-calendar read). Authorizing from another
     device? Use `gcal.py authurl` (prints the consent URL) then `gcal.py exchange '<pasted redirect URL>'`.
3. It runs in **DRY-RUN** (plans only) until you go live: `touch .work/state/LIVE`.
4. **GigaCloud without Google's delay** (done 2026-11-24; only Alex can sign in): add the GigaCloud
   Microsoft 365 account to Apple Calendar as a Microsoft Exchange account. The next run reads its
   «Календар» instead of Google's copy; `.work/state/calendars.txt` lists it with its event count. A
   different title, or a calendar subscription to the published feed instead, needs only a new
   `CALSYNC_EK_SOURCES` value (`exchange:<title>` or `subscribed:<title>`).

## Schedule & notifications
- **Every 30 minutes (:00 and :30), around the clock, Mon–Fri on the Mac's local clock** (Alex,
  2026-11-24; hourly from 2026-11-19, because from SF he works with Europe and the US at once and
  European mornings fall in the Pacific night). launchd's `StartCalendarInterval` fires on that clock,
  and `run.sh daemon` re-checks the weekday in the zone it reads from `/etc/localtime`, so a weekend tick
  that launchd coalesces on wake is a no-op and the schedule follows the Mac when it changes timezone.
  (A gate fixed to Kyiv let 3 of 13 ticks through on PST and never reached the 08:00 summary.) A tick
  that fires while the previous run still holds `.work/state/run.lock` skips.
- **Weekend gap:** nothing runs from Friday 23:30 to Monday 00:00 Pacific, so a busy slot added over
  the weekend reaches SS at Monday 00:00 PT, which is 09:00 CET / 10:00 Kyiv.
- **One** message/day to the **General** Telegram topic right after the 08:00 (local) run:
  `SoftServe calendar sync: X attempts, Y successful. A events added/modified.` — plus a
  `Google→SS busy-blocks: N added/updated` line when the reverse leg was active, and error lines if any.
  It covers every run since the previous summary (on Monday, Friday 09:00 onward plus Monday's night).

## Test / verify
```bash
# unit tests (no Calendar/network needed)
cd /Users/olekorlov/Documents/GitHub/AO-Personal-OS/automations/calendar-sync && python3 -m unittest test_sync_core
# one real pass through the host app, no window (output in ~/Library/Logs/calendar-sync/host.log)
open -g -j -W ~/Applications/CalendarSync.app
# trigger the installed daemon out-of-cycle (the same path the half-hourly tick takes)
launchctl kickstart -k "gui/$(id -u)/com.user.calendar-sync"
```

## Limits
- Runs only while the **Mac is awake**. The daily summary makes liveness observable. On the power
  adapter KN7X2Y65NX never sleeps (`pmset` AC `sleep 0`); on battery it sleeps after 15 idle minutes,
  so the European-morning runs in the Pacific night need it plugged in (2026-11-23 02:15–06:56 it
  slept, on battery (inferred): the only two runs came in brief wakes and both timed out).
- **GigaCloud through Google lags by hours.** GigaCloud is an Exchange calendar that reaches Google
  only as a subscription by URL (`…@import.calendar.google.com`), and Google fetches that feed on its
  own timer. Observed 2026-10-26 → 11-24: GigaCloud changes landed in Google in 28 batches, always at
  :15 past an hour and never less than 5 h apart (25 of 27 gaps 6 h or more), so Google fetches the
  feed about every 5–6 h or less often (inferred). Reading GigaCloud's Exchange account in Apple
  Calendar (Reverse leg) cuts that to Calendar.app's own refresh of the account (Calendar → Settings →
  Accounts → Refresh Calendars) plus the next run, at most 30 min later. Google's own GigaCloud calendar
  stays hours behind, and Calendar.app refreshes only while the Mac is awake.
- A Google refresh-token lapse (only if the consent screen reverts to "Testing") needs a re-`auth`;
  surfaced via the daily summary as a write error.

## Uninstall
```bash
launchctl bootout "gui/$(id -u)" "$HOME/Library/LaunchAgents/com.user.calendar-sync.plist"
```
