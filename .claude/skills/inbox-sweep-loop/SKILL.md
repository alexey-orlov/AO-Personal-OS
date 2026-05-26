---
name: inbox-sweep-loop
description: Single tick of the recurring inbox-sweep routine. Sends a Telegram heartbeat (so Alex can monitor liveness from his phone), then invokes /inbox-sweep. Intended to be wrapped in `/loop 8h /inbox-sweep-loop` inside a long-running Claude Code session — the loop's heartbeat-+-sweep-+-heartbeat-+-sweep cadence is what makes the inbox-sweep routine "always on" while a session stays open. Use this skill (not bare /inbox-sweep) whenever the goal is a scheduled recurring routine; the heartbeat is what makes it observable.
disable-model-invocation: true
user-invocable: true
---

# inbox-sweep-loop — one tick of the recurring routine

This skill is a thin wrapper around `/inbox-sweep` that adds **one extra step at the very start: a Telegram heartbeat**. That heartbeat is the single thing that lets Alex tell, from his phone, whether the routine is still alive — without it there's no signal that distinguishes "loop is healthy but inbox was quiet" from "loop died at 3am and nobody noticed for two days."

## What this skill does on each invocation

1. **Send a heartbeat to Telegram** via `automations/telegram/telegram_send.sh`:
   ```
   🫀 inbox-sweep loop · alive at <ISO timestamp UTC> · starting sweep…
   ```
   This is plain text, no buttons. It's intentionally short so it doesn't clutter the chat.

2. **Invoke the `inbox-sweep` skill** via the Skill tool. The sweep runs as normal: Gmail leg, LinkedIn leg (with the 25-thread scroll + 5-15s pacing + 10-draft cap), TG digest if drafts > 0, state + log update.

3. **Done.** The outer `/loop` command (which the user set up once) handles re-firing this skill on the cadence.

If the heartbeat send fails (Telegram down, network blip), proceed with the sweep anyway — the next heartbeat in 8h will signal that the loop is fine. Don't abort the run because of one missed heartbeat.

## Setup — how to start the routine

The loop runs **inside a Claude Code session that must stay open**. Closing the terminal stops the loop.

1. Open a fresh terminal — ideally inside **tmux** or **screen** so disconnects don't kill the session. Example:
   ```sh
   tmux new -s inbox-sweep
   cd ~/Documents/GitHub/AO-Personal-OS
   claude
   ```
2. Inside Claude Code, run:
   ```
   /loop 8h /inbox-sweep-loop
   ```
3. Leave the terminal alone. The loop will fire `/inbox-sweep-loop` every 8 hours. You should see a Telegram heartbeat every 8h and a digest only when new drafts are produced.

## How to know the loop is alive (from your phone)

You should see a `🫀 inbox-sweep loop · alive at …` heartbeat in Telegram **every 8 hours**, give or take a few minutes. If you don't see a heartbeat for >9 hours, the loop is dead.

The heartbeat is the only reliable liveness signal — the digest doesn't fire on quiet runs, and "no digest in 24h" could mean "nothing to draft" OR "loop died." The heartbeat removes that ambiguity.

## What to do if the loop dies

Most common causes (in order of likelihood):
1. **You closed the terminal** with the Claude Code session.
2. **Laptop went to sleep deeply** and the session was suspended; tmux + caffeinate prevent this (see below).
3. **Network blip or Chrome restart** broke the Chrome MCP connection mid-sweep, and the session errored out.
4. **macOS auto-restarted** (software update, power loss).

Recovery:
1. Open a fresh terminal in the project directory.
2. Start Claude Code.
3. Run `/loop 8h /inbox-sweep-loop` again. The loop resumes; `state.json` ensures it doesn't re-draft threads it already handled.

## Tips to keep the loop alive

- **Run it inside tmux or screen.** A bare terminal dies when you close the window or your SSH connection drops. tmux survives. Reattach with `tmux attach -t inbox-sweep`.
- **Run `caffeinate -i` in the same shell** before starting Claude Code, to prevent the laptop from sleeping into a state that kills the session. Example:
  ```sh
  tmux new -s inbox-sweep
  caffeinate -i &
  claude
  /loop 8h /inbox-sweep-loop
  ```
- **Keep Chrome running and signed into LinkedIn.** The Chrome MCP needs the live browser session to drive the LIN leg.
- **Don't reboot the Mac** during business hours if you can help it. If you do, restart the loop afterward.

## To stop the loop

In the Claude Code session running the loop, press Ctrl+C, or use the `/loop` skill's stop mechanism. The skill leaves no residual state — just stop firing.

## When NOT to use this skill

- One-off sweep: just run `/inbox-sweep` directly. The heartbeat is for routines, not for ad-hoc runs.
- Outside the `/loop` wrapper: running `/inbox-sweep-loop` once by itself will produce one heartbeat + one sweep, but it won't recur. That's fine for a smoke test of the heartbeat, but not the intended usage.
