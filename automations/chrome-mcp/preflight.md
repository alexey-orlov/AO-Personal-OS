# Chrome MCP pre-flight — canonical procedure

Shared procedure for any skill that needs LinkedIn access via the Claude in Chrome MCP. Run this ONCE at the start of the LIN-using phase of your workflow; don't re-run per item.

## What it does

Detects whether the Claude in Chrome MCP is reachable AND the LIN session is alive, sends one of two canonical TG nudges if not, and returns a flag the caller checks before every LIN operation.

## Procedure

1. **Chrome MCP reachability check.** Look for any `mcp__Claude_in_Chrome__*` tool in the current session's tool list (e.g. `list_connected_browsers`, `navigate`, `read_page`). If none are loaded:
   - Set `lin_available = false`, `lin_skip_reason = "chrome-mcp-unreachable"`.
   - Send `NUDGE_CHROME_OFF` (below) via `automations/telegram/telegram_send.sh`.
   - Skip the LIN session check; the caller proceeds Gmail-only.

2. **LinkedIn session check.** If Chrome MCP IS loaded, navigate to `https://www.linkedin.com/messaging/` and read the page once:
   - If it shows the login screen / "Sign in to continue" / no messaging sidebar:
     - Set `lin_available = false`, `lin_skip_reason = "lin-session-expired"`.
     - Send `NUDGE_LIN_SESSION_EXPIRED` (below).
     - Caller proceeds Gmail-only.
   - If the messaging sidebar renders cleanly:
     - Set `lin_available = true`, `lin_skip_reason = null`.

3. Record the outcome in your skill's state. Suggested key names: `lin_available: bool`, `lin_skip_reason: string|null`. Where this lives depends on the skill's state model (per-run, per-campaign, per-tick).

## Canonical nudge strings (verbatim)

Use these exact strings so nudges from different skills read consistently in TG. If you want a skill-specific prefix, prepend it on a separate line, but keep the canonical body intact.

**NUDGE_CHROME_OFF:**
```
⚠️ Claude in Chrome not connected — open Chrome with the extension active to enable LIN lookup. Continuing Gmail-only for this run.
```

**NUDGE_LIN_SESSION_EXPIRED:**
```
⚠️ LinkedIn session expired — sign in to refresh LIN lookup.
```

## Why one-time, not per-item

Re-running the pre-flight per contact/thread would (a) waste 1-3 seconds per item, (b) re-send the same TG nudge N times, (c) leave a half-broken run where some LIN attempts work and others don't. One check at the start; one flag for the rest of the run.

## What "Chrome MCP reachable" actually means

The `mcp__Claude_in_Chrome__*` tools are provided dynamically by the Claude for Chrome browser extension when it's running and signed in. They are NOT registered as a stable MCP server in `~/.claude.json` — they appear at session start only if the extension is active. So "reachable" here means the agent's current tool list contains these names, full stop. If it doesn't, the user needs to start Chrome with the extension before the next session — there's no in-session recovery.

## Skills that use this procedure

Citations should be one-line: `Follow the procedure in [automations/chrome-mcp/preflight.md](../../automations/chrome-mcp/preflight.md)`. The skill keeps its own orchestration (when in the flow this runs, what to do with the result); the canonical procedure + nudge text lives only here.

Current callers:
- `.claude/skills/inbox-sweep/SKILL.md` — Step 2 (start of LIN leg)
- `.claude/skills/draft-message/SKILL.md` — Step 3b (start of LIN thread search)
- `.claude/skills/re-engagement-outreach/SKILL.md` — Step 6.0 (before the per-contact loop)
