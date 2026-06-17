# calendar-sync — SoftServe (OWA) → Google Calendar mirror

One-way, always-on mirror of Alex's **SoftServe** work calendar into his **Google** calendar
(`orlov.alexej@gmail.com`) as `SS:`-prefixed copies, for **this week + next week**. Reads SS from
**Outlook-on-the-web** in a background Chrome tab (no focus-steal); writes Google via the connector.
Runs **hourly, weekdays 08:00–20:00 EET**. Sends **one** Telegram status per day.

## Architecture — agentic shell around a deterministic core
The OWA read (Chrome MCP) and the Google write (connector) only exist inside a live Claude session,
so this is a skill orchestrating a pure-Python core — **not** a headless script.

- **`.claude/skills/calendar-sync/`** — the agentic skill: read OWA → `reconcile` → apply via connector.
  References: `read-owa.md`, `matching-rules.md`, `google-payload.md`.
- **`sync_core.py`** — deterministic brain: timezone self-calibration, matching, diff, ledger,
  payload building, the schedule gate, the daily-summary aggregation. Stdlib only.
- **`.claude/skills/calendar-sync-loop/`** — one tick: clock gate → run `/calendar-sync` → (08:00) daily summary.
- **Host:** `com.user.calendar-sync` (launchd → Terminal → `start.sh` → tmux `caffeinate claude`
  running `/loop 1h /calendar-sync-loop`). Terminal gives it the user TCC context the connectors/Chrome need.

## Files
| File | Role |
|---|---|
| `sync_core.py` | deterministic core (`reconcile` / `extract` / `schedule` / `log-run` / `daily-summary` / `commit`) |
| `test_sync_core.py` | unit tests (16) |
| `core.sh` | TCC-safe runner — `cd /tmp; python3 -I sync_core.py …` |
| `config.sh` | constants (calendar id, window, prefix, attendee, DRY_RUN flag) |
| `start.sh` | brings up the always-on tmux session |
| `setup.sh` | installs the launchd agent (one-time) |
| `com.user.calendar-sync.plist` | launchd agent (`__REPO__` templated by setup.sh) |
| `.work/state/` | ledger.json, run-log.jsonl, last-summary-date, LIVE flag (git-ignored) |

## Rules it enforces
- **One-way** SS → Google. Sole attendee is **always** `orlov.alexej@gmail.com`; every write uses
  `notificationLevel: NONE` — **nothing is emailed to SS colleagues**.
- Only events carrying the hidden `[[ss-sync:…]]` marker are ever updated/deleted — **never** a native event.
- Cancellations (`Отменено:`/`Cancelled:` …) and out-of-window meetings → the copy is **deleted**
  (suppressed entirely if the OWA read was incomplete).
- **Native dedup:** an SS meeting already on Google (same title, `olekorlov@softserveinc.com` as
  organizer/attendee) is **skipped**, not duplicated.

## Timezone gotcha (important)
OWA renders this mailbox in **US/Pacific**, not Kyiv. The core self-calibrates from OWA's displayed
"current time" (or an explicit `owa_tz`) and converts to `Europe/Kyiv`. Verified end-to-end:
`T-shirt kick-off` 8:00 AM PDT → **18:00 Kyiv**, matching the desktop app.

## Setup
1. From a Terminal **with Full Disk Access**: `bash automations/calendar-sync/setup.sh`
2. In the opened `calendar-sync` tmux session, confirm: the **Google Calendar** connector and the
   **Claude-for-Chrome** MCP are available, and you're signed into `outlook.office.com` in the **"SS laptop"** Chrome.
3. It runs in **DRY-RUN** (plans only, no writes) until you go live:
   `touch automations/calendar-sync/.work/state/LIVE`

## Schedule & notifications
- Hourly, **Mon–Fri 08:00–20:00 Europe/Kyiv** (in-skill gate; off-hours/weekend ticks are no-ops).
- **One** message/day to the **General** Telegram topic right after the 08:00 run:
  `SoftServe calendar sync: X attempts, Y successful. A events added/modified.` (+ error lines if any).
  It covers every run since the previous summary (previous working day 09:00–20:00 + today 08:00).

## Test / verify
```bash
# unit tests
cd /tmp && python3 -I /Users/olekorlov/Documents/GitHub/AO-Personal-OS/automations/calendar-sync/test_sync_core.py
# a dry reconcile (plan only)
printf '%s' '{"now_utc":"2026-06-17T09:00:00Z","owa_tz":"America/Los_Angeles","source_events":[…]}' \
  | bash automations/calendar-sync/core.sh reconcile
```

## Limits
- Runs only while the **Mac is awake/unlocked** and you're **signed into OWA**. The daily summary is the liveness signal.
- The new Outlook for Mac keeps **no parseable local calendar store**, so OWA is the read path. If the SS
  Exchange account is ever added to macOS **Calendar.app**, an EventKit read would be more robust (works while
  locked, fully headless) — see the plan's "Future upgrade".

## Uninstall
```bash
launchctl bootout "gui/$(id -u)" "$HOME/Library/LaunchAgents/com.user.calendar-sync.plist"
tmux kill-session -t calendar-sync 2>/dev/null || true
```
