# clockify-panel

A stupidly-simple, locally-hosted web panel for Clockify time tracking. Four
big physical-looking push buttons — one per project (**SS**, **GC**, **JS**,
**EF**) — plus a description field. Buttons reflect *live* Clockify state and
start/stop tracking with one tap.

```
┌─────────────────────────┐
│  TIME TRACKING      ↻    │
│  ┌──────┐   ┌──────┐     │
│  │  SS  │   │  GC  │     │   pressed = that project is tracking now
│  └──────┘   └──────┘     │   at most one pressed; none = idle
│  ┌──────┐   ┌──────┐     │
│  │  JS  │   │  EF  │     │
│  └──────┘   └──────┘     │
│  [ description…    ⏎ ]   │   editable only while a tracker is running
│  Tracking SS since 08:16 │
└─────────────────────────┘
```

## Architecture

- **`server.py`** — a zero-dependency Python (stdlib only) HTTP server on
  `127.0.0.1:7878`. It holds the API key and proxies to the Clockify REST API.
  The browser only ever talks to this local server, so **the API key never
  reaches the browser** (and there are no CORS issues).
- **`index.html`** — the single-page UI (inline CSS/JS, no build step).

### No-state-mismatch design (the whole point)

The danger this guards against: buttons showing stale state, you tap, and the
action can't be processed. Defenses:

1. **Truth is recomputed server-side on every action.** `/api/toggle` and
   `/api/description` re-fetch the live in-progress entry from Clockify *first*
   and act on the real current project + real entry id. There is no
   client-supplied entry id that can go stale.
2. **The UI always re-renders from the server's post-action response**, so it
   converges to truth after every click.
3. **Frontend refresh triggers:** initial load, the ↻ button, window focus,
   tab visibility change, and a 10 s interval poll — catches tracking that you
   started/stopped from the Clockify mobile or web app.
4. **In-flight guard:** buttons + field disable while a request is outstanding
   (no double-clicks); a server-side lock serializes mutating ops as backstop.
5. **Errors never lie:** on any failure the UI shows a banner and re-fetches —
   button state only changes to reflect confirmed truth.

### Why polling, not webhooks

Clockify webhooks require a public HTTPS callback URL — impossible for a
localhost-only app, and committing a live trigger URL is against this repo's
rules. Polling + focus-refresh + action-time revalidation is the sync model.

## Setup

```bash
cd automations/clockify-panel
./setup.sh <YOUR_CLOCKIFY_API_KEY>   # stores key in Keychain, validates,
                                     # sets project colors, installs launchd agent
```

The key is stored in the macOS Keychain (service `CLOCKIFY_API_KEY`) and read
at runtime — never committed. `setup.sh` is idempotent; re-run without the key
argument to just reload the agent.

`setup.sh` also normalises the four project colors in Clockify so the buttons
read clean violet/red/blue/green: SS `#7E57C2`, GC `#F44336`, JS `#2196F3`,
EF `#4CAF50`. The app then uses whatever colors Clockify reports (single source
of truth) — change a color in Clockify and the button follows.

## Run

Always-on (installed by `setup.sh`): the launchd agent starts the server at
login. Just open **http://localhost:7878** (bookmark it).

Manually:

```bash
./run.sh            # foreground; Ctrl-C to stop
```

Override the port with `PORT=9000 ./run.sh`.

## Managing the launchd agent

```bash
launchctl unload ~/Library/LaunchAgents/com.user.clockify-panel.plist   # stop + disable
launchctl load   ~/Library/LaunchAgents/com.user.clockify-panel.plist   # start + enable
tail -f .work/panel.log                                                 # logs
```

Editing `server.py` / `index.html` / `config.sh` → reload the agent to pick up
changes (the server reads them at startup).

## Files

`server.py` · `index.html` · `config.sh` · `setup.sh` · `run.sh` ·
`com.user.clockify-panel.plist` · `.work/` (git-ignored: logs)
