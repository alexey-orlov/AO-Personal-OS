# Reading the SoftServe calendar from Outlook-on-the-web (OWA)

Read-only, via the **Claude-for-Chrome MCP** (`mcp__Claude_in_Chrome__*`). Runs in a background tab — it must **not** steal focus or change anything in OWA.

## 0. Connect to the right browser, and auto-restore the session
1. `list_connected_browsers` → pick the one named **"SS laptop"** (`$CALSYNC_CHROME_NAME`); `select_browser(deviceId)`.
2. `tabs_context_mcp{createIfEmpty:true}` → get a tab id (reuse the calendar-sync tab across runs).
3. `navigate(tabId, "https://outlook.office.com/calendar/view/week")` — once authed it redirects to `outlook.cloud.microsoft/calendar/...`; both are fine.
4. **Read the page and branch on what loaded:**
   - **Calendar** (title `Calendar - … - Outlook`) → continue to step 1.
   - **Account picker** ("Pick an account") with the SoftServe account `olekorlov@softserveinc.com` shown as **"Signed in"** → a routine token lapse (OWA access tokens expire ~hourly). **Click that account** to restore the session, wait ~2 s, and re-read. Locate it by its text — the button reads `Sign in with olekorlov@softserveinc.com work or school account.` — and click it. **Alex has pre-authorized this**: selecting an already-"Signed in" account restores an existing session and enters **no** credentials. If it then lands on the calendar → continue. Do this automatically every run; never wait for a human for this case.
   - **Anything that actually authenticates** — a password field, an MFA / Authenticator prompt, a consent screen, or a picker where the SoftServe account is **not** "Signed in" → **do not type, approve, or click through it.** Set `source_complete:false`, log `error:"OWA needs sign-in"`, and stop. The daily summary surfaces it, and Alex signs in once (checking **"Stay signed in?"** keeps the session alive for weeks, so this stays rare).

## 1. Capture the timezone calibration  (critical)
OWA renders this mailbox in **US/Pacific**, *not* Kyiv — a naïve copy is ~10 h wrong. The core self-calibrates, but you must hand it OWA's clock:
- From `read_page`, read the **"Go to today …"** button (e.g. `Go to today June 17, 2026`) → OWA's today date.
- Read the `main` node label `calendar view, current time: <Day> <h>:<mm> <AM/PM>` → OWA's current wall time.
- Build `owa_now_wall` = that date + that time as naive ISO, e.g. `2026-06-17T01:49:00`. Pass it in the reconcile input. (Do **not** convert it yourself.)

## 2. Enumerate events for the visible week
`read_page(tabId, filter:"interactive")`. Each event is a button whose aria-label follows:
```
<title>, <h>:<mm> <AM/PM> to <h>:<mm> <AM/PM>, <Weekday>, <Month> <d>, <YYYY>[, Microsoft Teams Meeting][, By <organizer>]
```
Example: `T-shirt packages kick-off, 8:00 AM to 8:30 AM, Wednesday, June 17, 2026, Microsoft Teams Meeting, By …`

Parse → `title`, `start_wall` (date + start time, naive ISO), `end_wall`, `online` (label contains "Microsoft Teams Meeting"/"Zoom"/"Meet" — or confirmed in step 3). Labels are **truncated** (organizer may be cut) — that's fine; the full join link/attendees come from step 3. All-day items sit in the top strip → `all_day:true`, dates only.

## 3. Get the join link (online events only)
The aria-label has no URL. For each online event: `left_click` its button → a detail flyout opens → `get_page_text`/`read_page` the flyout → take the first join URL matching `teams.microsoft.com/l/meetup-join`, `teams.microsoft.com/meet`, `zoom.us/j/`, `meet.google.com/`, or `*.webex.com/` → `join_url`. While open, also capture the **organizer** and any **attendee emails** (used for native-duplicate matching). Press `Escape` to close. No link found → leave `join_url:null` (still mirrored, just without a link).

## 4. Page to next week and repeat
Click the **"Go to next week …"** button (or `navigate` to `…/calendar/view/week` for the next Monday) → repeat steps 2–3. Two weeks total (this + next).

## 5. Assemble + completeness
Emit `source_events[]` (deduped across the two reads). Set `source_complete:true` **only** if both weeks read without error. If a read errored, a week looks suspiciously empty when events were expected, or the Chrome tab dropped → `source_complete:false` (the core then proposes **no deletions**, so a transient glitch never wipes copies).

## Gotchas
- Don't change OWA's view/timezone/settings — read only.
- Cancellations show up as a renamed event (`Отменено: …` / `Cancelled: …`); pass them through verbatim — the core treats them as deletions.
- Times are Pacific; always include `owa_now_wall` so the core can convert to Kyiv.
