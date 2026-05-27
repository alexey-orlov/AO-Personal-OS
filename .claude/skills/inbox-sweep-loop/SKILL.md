---
name: inbox-sweep-loop
description: Single tick of the recurring inbox-sweep routine. Sends a Telegram heartbeat (so Alex can monitor liveness from his phone), then invokes /inbox-sweep. Intended to be wrapped in `/loop 8h /inbox-sweep-loop` inside a long-running Claude Code session — the loop's heartbeat-+-sweep-+-heartbeat-+-sweep cadence is what makes the inbox-sweep routine "always on" while a session stays open. Use this skill (not bare /inbox-sweep) whenever the goal is a scheduled recurring routine; the heartbeat is what makes it observable.
disable-model-invocation: false
user-invocable: true
---

# inbox-sweep-loop — one tick of the recurring routine

This skill is a thin wrapper around `/inbox-sweep` that adds **one extra step at the very start: a Telegram heartbeat**. That heartbeat is the single thing that lets Alex tell, from his phone, whether the routine is still alive — without it there's no signal that distinguishes "loop is healthy but inbox was quiet" from "loop died at 3am and nobody noticed for two days."

## What this skill does on each invocation

1. **Send a heartbeat to Telegram** via `automations/telegram/telegram_send.sh`. Plain text, no buttons, intentionally short.

   The heartbeat ALWAYS includes the current UTC timestamp. If this skill was invoked with an `expires:YYYY-MM-DD` argument (passed via the CronCreate prompt — see "Setup" below), also include the remaining days and the expiry calendar date. If the argument is missing or malformed, fall back to the plain format (no expiry info — never error out on this).

   **Format when `expires:` argument is provided:**
   ```
   🫀 inbox-sweep loop · alive at <ISO UTC> · cron expires in <N>d (<YYYY-MM-DD>) · starting sweep…
   ```
   Compute `<N>` = `floor((expiry_date_at_midnight_UTC - now_epoch) / 86400)`. When `<N> ≤ 1`, append `⚠️ re-schedule today` so the warning is impossible to miss on a phone glance. The expiry date is bound to the cron job's prompt, so clicking **Stop** in the Background Tasks UI (or `CronDelete`) cleans it up automatically — no orphan state to worry about.

   **Fallback format (no `expires:` argument or unparseable):**
   ```
   🫀 inbox-sweep loop · alive at <ISO UTC> · starting sweep…
   ```

2. **Invoke the `inbox-sweep` skill** via the Skill tool. The sweep runs as normal: Gmail leg, LinkedIn leg (with the 25-thread scroll + 5-15s pacing + 10-draft cap), TG digest if drafts > 0, state + log update.

3. **Done.** The cron (created via `CronCreate` or `/loop`) handles re-firing this skill on the schedule.

If the heartbeat send fails (Telegram down, network blip), proceed with the sweep anyway — the next heartbeat will signal that the loop is fine. Don't abort the run because of one missed heartbeat.

## Setup — how to start the routine

The loop runs **inside a Claude Code session that must stay open**. Closing that session stops the loop. The Claude Code session must also have **Chrome MCP paired** before the first tick fires, otherwise the LIN leg is skipped on that tick.

**Recommended host: Claude Desktop for Mac.** It already auto-starts at login (it's in your macOS Login Items) and tends to stay open across days. The CLI (`claude` in a terminal) and the VS Code plugin also work but are more fragile (sessions die when the terminal / VS Code closes).

### Per reboot, in order

1. **Open a new Claude Desktop conversation** in the repo directory (`~/Documents/GitHub/AO-Personal-OS`). Verify with `pwd` if unsure.
2. **Open Chrome** (or alt-tab if already running). Click the Chrome extension icon → pair it with this new Claude Desktop session. (Optional sanity check: ask Claude to "list connected browsers" — it should call `mcp__Claude_in_Chrome__list_connected_browsers` and return your browser.)
3. **Schedule the cron with the expiry date baked into the prompt**, then fire one immediate tick. Paste this to Claude verbatim (adjust the cron expression as needed):

   ```
   Compute today + 3 days as YYYY-MM-DD in UTC. Call this <EXPIRES>.
   Use CronCreate to schedule the prompt "/inbox-sweep-loop expires:<EXPIRES>"
   at cron "3 7,19 * * 1-6" with recurring: true.
   Then invoke /inbox-sweep-loop expires:<EXPIRES> once now so I see a heartbeat in Telegram.
   After scheduling, check the Background Tasks UI and tell me what "Ends Xd" shows — 
   if it differs from 3d, I'll need to delete and re-create with the right date.
   ```

   Default cron suggestion `3 7,19 * * 1-6` = 07:03 and 19:03 local time, Mon–Sat. Cron expressions use local time (Kyiv for Alex). Off-:00 minute reduces API pile-up.

4. **Leave the conversation tab open.** Heartbeat appears within a minute. Future ticks fire on the cron with the same `expires:` argument, so the countdown stays accurate without any external file.

### Why expiry is bound to the cron prompt

CronCreate jobs inside a Claude Code session live in memory and **auto-expire after a platform-specific ceiling** (observed ~3 days in Claude Desktop, up to 7 in Claude Code CLI per CronCreate's own docs — verify in the Background Tasks UI's "Ends Xd" field after scheduling, and adjust your `expires:` arg to match). They also die on Claude Desktop quit / Mac reboot / conversation close, whichever comes first. By encoding the expiry date into the cron's prompt itself (`/inbox-sweep-loop expires:YYYY-MM-DD`), the date travels with the job — clicking **Stop** in the Background Tasks UI or `CronDelete` removes both at once, and re-scheduling always produces a fresh value. No file to clean up, no stale state possible.

**If the displayed "Ends Xd" doesn't match your `expires:` arg**, the heartbeat countdown will lie — either claim more days left than the cron actually has (silent death), or claim fewer (premature warnings). The fix: delete and re-create the cron with `expires:` set to today + the UI's observed Xd.

### Simple-interval alternative

If you don't want a custom cron and a simple interval is fine (e.g., every 8 hours), use the `/loop` shorthand:

```
/loop 8h /inbox-sweep-loop expires:<YYYY-MM-DD>
```

Replace `<YYYY-MM-DD>` with today's date + 7 days in UTC. Pick "This session only" when prompted.

If you skip the `expires:` argument entirely (e.g., just `/loop 8h /inbox-sweep-loop`), heartbeats fall back to the plain format with no countdown — the loop still works, you just won't get the re-schedule reminder.

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
