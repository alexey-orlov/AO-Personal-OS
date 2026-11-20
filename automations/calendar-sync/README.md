# calendar-sync — SoftServe ↔ Google two-way busy sync

Always-on, **two-way busy sync** between Alex's **SoftServe** work calendar and his **Google** calendars,
for **this week + next week**:
- **Forward** — each SoftServe meeting is mirrored into Google as an `SS:`-prefixed copy (with the real
  Busy/Free status + organizer/participants).
- **Reverse** — wherever Alex is busy in **any** Google calendar (Alex Orlov / Family / GigaCloud), a
  content-free **"Busy"** placeholder is written into SoftServe so colleagues can't book over it.

Reads SS from the **SoftServe Exchange account in Apple Calendar (EventKit)**, reads/writes Google via the
**Calendar API**, and writes SS placeholders back via **EventKit**. Runs **every hour around the clock,
Monday–Friday, on the Mac's own clock** — Alex is in San Francisco and works with Europe and the US at
once. Sends **one** Telegram status per day. Both legs guard against feedback loops (see Reverse leg).

## Architecture — pure code, no Claude session, no browser
SoftServe is Intune/VPN-managed (no third-party API login) and the new Outlook for Mac keeps no
parseable local store — so the only headless read is **EventKit**. The whole pipeline is deterministic
code; there is no live Claude session, no Chrome MCP, no Google connector.

```
forward:  Apple Calendar (EventKit read)  →  sync_core.reconcile          →  Google Calendar API
reverse:  Google Calendar API (all cals)  →  sync_core.reverse_reconcile  →  Apple Calendar (EventKit write)
            ss_cal_read.swift / gcal.py        sync_core.py                   ss_cal_write.swift / gcal.py
                 both passes orchestrated by run.py, hosted by launchd → CalendarSync.app (no window) → run.sh
```

- **`ss_cal_read.swift`** → compiled to `.work/ss-cal-read`. Reads the SS Exchange calendar and emits
  one JSON row per event: uid, title, start/end (absolute ISO instants carrying the Mac's local
  offset), `all_day`, `recurring`,
  location, organizer (+email), **`my_status`** (the user's RSVP), online/join_url, notes, and
  `attendees[{name,email,status,is_me}]`.
- **`ss_cal_write.swift`** → compiled to `.work/ss-cal-write`. Reverse leg: reads `create|update|delete`
  JSON commands on stdin and writes/removes `availability=.busy` "Busy" events (no attendees, a
  `[[gcal-busy:<key>]]` note) in the SS Exchange calendar; echoes each event's `calendarItemIdentifier`.
- **`sync_core.py`** — deterministic brain: timezone math, per-occurrence keys, content-hash diff,
  ledgers, payload + description building, status→Busy/Free mapping, the reverse busy-filter +
  `reverse_reconcile`, schedule gate, daily-summary aggregation. Stdlib only, fully unit-tested.
- **`gcal.py`** — dependency-free Google client (stdlib urllib). OAuth installed-app flow (scopes:
  `calendar.events` for forward writes + `calendar.readonly` for the reverse multi-calendar read);
  `list_calendars` / list / create / update / delete, always `sendUpdates=none`.
- **`run.py`** — one tick = **forward pass** (EventKit read → `reconcile` → `gcal`) then **reverse pass**
  (all Google calendars → `reverse_reconcile` → `ss-cal-write`). Skips all-day events; pulls our own
  `[[gcal-busy]]` placeholders out of the forward source. Writes `.work/state/last-read.json` for diagnostics.
- **Host:** launchd `com.user.calendar-sync` runs `open -g -j -W ~/Applications/CalendarSync.app` every
  hour on the hour, Mon–Fri Mac-local time. The app is a faceless AppleScript applet built by
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
| `test_sync_core.py` | unit tests (35) |
| `config.sh` | constants + Keychain creds + `LIVE` flag |
| `setup.sh` | builds the reader + writer (swiftc), builds the host app if missing, installs the launchd agent. `--plist-only` reinstalls just the agent · `--build-host` builds the app only (test before switching) · `--rebuild-host` rebuilds it and reinstalls (macOS asks for the grants again) · `--terminal-host` installs the Terminal fallback. Lints the plist before replacing anything. |
| `~/Applications/CalendarSync.app` | the faceless host app (built by `setup.sh`, not in git); its grants live in System Settings → Privacy & Security → Calendars / Files and Folders |
| `~/Library/Logs/calendar-sync/host.log` | every run's console output, plus a line when the host can't start `run.sh` |
| `.work/state/` | ledger.json, **reverse-ledger.json**, run-log.jsonl, gtoken.json, last-read.json, last-summary-date, LIVE (git-ignored) |

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

## Reverse leg — Google busy → SS "Busy"
After the forward pass, `run.py` blocks SS time wherever Alex is busy in Google:
- **Source:** every Google calendar (`list_calendars`) — primary, Family, **GigaCloud** (a `reader`-role
  imported calendar) — read in-window. A slot counts as **busy** if it is timed (not all-day), not
  `transparent` (Free), not cancelled, and not self-declined.
- **1:1 placeholders:** each busy slot → one SS event titled **"Busy"**, `availability=.busy`, **no
  attendees** (nothing emailed), **no details** (colleagues see only that the time is taken). Keyed by
  `calendarId::eventId`; create/update/delete tracked in `reverse-ledger.json`. The idempotency hash is
  over the **absolute UTC instant** (Google and EventKit render the same moment with different offsets).
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

## Schedule & notifications
- **Every hour, around the clock, Mon–Fri on the Mac's local clock** (Alex, 2026-11-19: from SF he works
  with Europe and the US at once, so European mornings fall in the Pacific night). launchd's
  `StartCalendarInterval` fires on that clock, and `run.sh daemon` re-checks the weekday in the zone it
  reads from `/etc/localtime`, so a weekend tick that launchd coalesces on wake is a no-op and the
  schedule follows the Mac when it changes timezone. (A gate fixed to Kyiv let 3 of 13 ticks through on
  PST and never reached the 08:00 summary.)
- **One** message/day to the **General** Telegram topic right after the 08:00 (local) run:
  `SoftServe calendar sync: X attempts, Y successful. A events added/modified.` — plus a
  `Google→SS busy-blocks: N added/updated` line when the reverse leg was active, and error lines if any.
  It covers every run since the previous summary (on Monday, Friday 09:00 onward plus Monday's night).

## Test / verify
```bash
# unit tests (no Calendar/network needed)
cd /tmp && python3 -I /Users/olekorlov/Documents/GitHub/AO-Personal-OS/automations/calendar-sync/test_sync_core.py
# one real pass through the host app, no window (output in ~/Library/Logs/calendar-sync/host.log)
open -g -j -W ~/Applications/CalendarSync.app
# trigger the installed daemon out-of-cycle (the same path the hourly tick takes)
launchctl kickstart -k "gui/$(id -u)/com.user.calendar-sync"
```

## Limits
- Runs only while the **Mac is awake**. The daily summary makes liveness observable.
- A Google refresh-token lapse (only if the consent screen reverts to "Testing") needs a re-`auth`;
  surfaced via the daily summary as a write error.

## Uninstall
```bash
launchctl bootout "gui/$(id -u)" "$HOME/Library/LaunchAgents/com.user.calendar-sync.plist"
```
