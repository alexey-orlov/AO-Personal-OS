# inbox-sweep-loop — launcher for the recurring inbox-sweep routine

This folder holds the bash launcher and macOS LaunchAgent that bring up the recurring `/inbox-sweep` routine inside a long-lived tmux session. The actual recurring logic lives in the **skill** at `.claude/skills/inbox-sweep-loop/SKILL.md` — this folder is just the operational scaffolding (start / stop / auto-restart on reboot).

## What's in here

- `start.sh` — launch a detached `tmux` session named `inbox-sweep`, run `caffeinate` in it, start Claude Code, send `/loop 8h /inbox-sweep-loop`. Idempotent: a second invocation while a session exists is a no-op.
- `stop.sh` — kill the `inbox-sweep` tmux session. The next 🫀 heartbeat will NOT arrive until you restart.
- `com.user.inbox-sweep-loop.plist` — macOS LaunchAgent that runs `start.sh` on login. Optional but recommended; lets the routine come back automatically after reboots.

## Day-to-day usage

```sh
# Start the routine (one-time, or after a reboot if you skip the LaunchAgent setup)
./start.sh

# Watch the live session (detach with Ctrl-B then D)
tmux attach -t inbox-sweep

# Stop the routine
./stop.sh
```

You should see a 🫀 heartbeat in Telegram within about a minute of `./start.sh` succeeding. Then one heartbeat every 8 hours after that, plus a 📥 digest only when the sweep actually produced drafts.

## Prerequisites

- `tmux` installed (`brew install tmux`)
- `claude` (Claude Code CLI) on `PATH` or in one of the fallback locations probed by `start.sh`
- Chrome running and signed into LinkedIn (the loop needs the Claude in Chrome MCP via your live browser)
- Telegram bot configured via `automations/telegram/setup.sh` (you've already done this)

## Auto-restart on reboot (one-time setup)

1. Make sure `start.sh` and `stop.sh` are executable:
   ```sh
   chmod +x start.sh stop.sh
   ```

2. Create the runtime log directory (one time):
   ```sh
   mkdir -p .work
   ```

3. Copy the LaunchAgent plist into the user-level LaunchAgents directory:
   ```sh
   cp com.user.inbox-sweep-loop.plist ~/Library/LaunchAgents/
   ```

4. Load it into launchd:
   ```sh
   launchctl load ~/Library/LaunchAgents/com.user.inbox-sweep-loop.plist
   ```

After this, the launcher fires on every login. To **disable** auto-restart later:

```sh
launchctl unload ~/Library/LaunchAgents/com.user.inbox-sweep-loop.plist
rm ~/Library/LaunchAgents/com.user.inbox-sweep-loop.plist
```

### Verifying the LaunchAgent works without rebooting

```sh
launchctl start com.user.inbox-sweep-loop
```

This triggers the start-script as if you just logged in. You should see the `inbox-sweep` tmux session come up and a Telegram heartbeat shortly after.

### Where to look if it didn't start

- `.work/launchd.out.log` — stdout from `start.sh`
- `.work/launchd.err.log` — stderr (most useful when something failed)
- `tmux list-sessions` — confirms whether the session is alive

## Why tmux + LaunchAgent (and not just LaunchAgent running claude directly)

`claude` is an interactive process that expects a TTY. LaunchAgents don't give you one. Running `claude` inside a tmux session gives it a virtual TTY, plus the side benefit that the session survives terminal-window closes, disconnects, and accidental Cmd-Q.

The chain is:
- login → LaunchAgent fires → `start.sh` runs → `tmux new-session` creates the TTY → `claude` runs inside → `send-keys` types the `/loop` command → `start.sh` exits → tmux session lives on with Claude Code looping inside it.

## When NOT to use this

If you only want to run a sweep once, just run `/inbox-sweep` (not the loop). The loop is for recurring routines only.
