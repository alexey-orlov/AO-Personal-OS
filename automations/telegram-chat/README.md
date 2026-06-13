# telegram-chat — chat with Claude Code from Telegram

Interactive two-way Telegram chat with a Claude Code session running in this
repo, via the **official Claude Code Channels plugin**
(`telegram@claude-plugins-official`, research preview, Claude Code ≥ 2.1.80).
Bot: **@ao_personal_os_conversation_bot** (a dedicated DM bot — see "Why a
second bot" below).

What you get in Telegram: send text / photos / documents, get Claude's
replies (with file attachments up to 50MB). Work runs on this Mac against the
real repo — so the bot is **only alive while the Mac is awake**.

**Permissions: auto mode.** The session runs with
`--dangerously-skip-permissions` (Alex's choice, 2026-06-11) so unattended
work never stalls on prompts. Trade-off: no gate if forwarded third-party
content carries a prompt injection — only forward content you trust. To dial
back, remove the flag in `run.sh` (prompts then relay to Telegram as
Allow/Deny buttons) and `./new_session.sh`.

Note: even in bypass mode, Claude Code still asks before the plugin's
*outbound* tools (reply/react/edit/download). Those are allowlisted via the
`mcp__plugin_telegram_telegram` rule in the repo's `.claude/settings.json`
(committed — carries over to a VPS). Remove that rule too if reverting to
prompted mode and you want sends gated.

## Architecture

```
launchd (com.user.telegram-chat, KeepAlive)
  └─ start.sh             supervisor: ensures the tmux session exists + WATCHDOG:
       │                  verifies bot.pid is alive and owned by this bridge,
       │                  respawns the bridge after ~90s of bad state (10s poll)
       └─ tmux session "telegram-chat"
            └─ run.sh     loop: each iteration = a FRESH claude session
                 │        exports TELEGRAM_CHANNEL_POLL=1 (see invariant below)
                 └─ claude --dangerously-load-development-channels \
                      plugin:telegram@ao-personal-os   ← the repo's gated fork
```

- The plugin long-polls the Telegram Bot API (no webhook → no trigger URL to
  leak, per the CLAUDE.md hard rule). Token lives in Keychain
  (`TELEGRAM_CC_BOT_TOKEN`) and in `~/.claude/channels/telegram/.env`
  (written by `setup.sh`, chmod 600, outside the repo).
- **/new**: not a native bot command. A CLAUDE.md rule tells Claude: when the
  Telegram user sends `/new` (or "new session"), reply first, then run
  `new_session.sh` — it respawns the tmux window, killing the current claude;
  `run.sh` starts a clean session in seconds.
- Inbound photos land in `~/.claude/channels/telegram/inbox/` and are passed
  to Claude; documents are fetched on demand (Bot API caps downloads at 20MB).
- Access control: pairing-code allowlist (one-time, see setup). Anyone on the
  allowlist can also approve permission relays — keep it to yourself.

## Single-poller invariant (2026-06-12 lost-messages incident)

Telegram allows ONE getUpdates consumer per bot. Upstream plugin behavior:
**every** session that loads the plugin (desktop app, headless `claude -p`,
any project — it was enabled at user scope) spawns `server.ts`, which
unconditionally SIGTERM-kills whatever process holds `bot.pid` ("stale poller"
takeover) and starts polling itself. In a non-channel session the polled
messages are emitted as channel notifications nobody consumes — **silently
eaten** (sender sees the typing indicator, then nothing). Claude Code never
restarts a dead stdio MCP server, so the bridge stayed deaf until manually
restarted. Upstream refs: claude-code issues #39808, #45146.

Three guards now enforce the invariant (defense in depth):

1. **The fork replaces the official plugin.** The only enabled telegram plugin
   is `telegram@ao-personal-os` — this repo's gated fork
   (`automations/telegram-chat/plugin/`, version `0.0.6-ao.1`), installed from
   the repo's own local marketplace (`ao-personal-os` = this directory,
   declared in `~/.claude/settings.json` `extraKnownMarketplaces`). The
   official `telegram@claude-plugins-official` is disabled in user settings.
   Keep it disabled **until** the rollback test below passes — the fork is a
   workaround, not a permanent preference, and re-enabling the un-gated
   upstream plugin reintroduces the takeover. (Its cache copy also carries the
   same gate patch, as a relic/extra belt.)
2. **Poll gate (in the fork, permanent)** — `server.ts` only touches `bot.pid`
   / polls when `TELEGRAM_CHANNEL_POLL=1`, which only `run.sh` exports.
   Desktop/headless/subagent sessions load the fork user-scope but run
   tools-only (their stderr logs `tools-only instance, not polling`); they
   serve reply/react tools harmlessly and can never steal the consumer slot.
3. **Watchdog (two layers)** — `start.sh` checks every 10s:
   - **Transport:** `bot.pid` points at a live process descending from the
     bridge's tmux pane; after ~90s of failure it respawns the window, whose
     fresh server reclaims the slot. Catches stolen/crashed pollers.
   - **Agent** (added 2026-06-13): the pane is scanned for a blocking *system*
     modal — usage-limit, trust-folder, dev-channels confirm, error dialogs —
     that freezes claude while its child poller keeps reacting 👀. Known-safe
     prompts are auto-answered (dev-channels/trust → Enter); the usage-limit
     and unknown modals are dismissed (Esc), escalated to a respawn if they
     won't clear, and Alex gets a DM so a stuck bridge is never silent. Tool
     permissions don't appear here (they relay to Telegram), so a local pane
     menu is always a system modal — and the normal working/idle panes don't
     match the modal strings, so a real task is never interrupted.

### Why this needed a second watchdog layer (2026-06-13 recurrence)

The original watchdog only tested the **transport** ("does the bridge own the
Telegram connection?"). On 2026-06-13 the bridge went silent again — but the
transport was *fine*: claude was frozen on the Claude-Max usage-limit modal
("You've hit your session limit"), and its still-alive poller kept reacting 👀,
so the transport check stayed green and the 👀 falsely reassured. The limit
reset at 13:00 yet the stale modal kept the session wedged for ~5 hours.

Lesson baked into the design: **a liveness check must verify the thing that
actually fails (the agent answers), not a proxy (the connection is held), and
every silent-failure mode must be made loud.** Hence the agent-layer scan +
the wedge DM. If the bridge ever 👀s but won't reply, the watchdog now clears
it within ~40s and tells you why.

**Rolling back to the official plugin (allowed once it's safe).** The fork only
exists to dodge an upstream behavior; going back is *desirable* when fixed —
it drops the `--dangerously-load-development-channels` flag + its auto-confirm
and restores upstream maintenance. The failure is silent (you just stop getting
messages), so don't roll back on a hunch — roll back only after this empirical
test passes on the candidate upstream version:

1. Install + enable `telegram@claude-plugins-official` at user scope. Keep the
   bridge running and confirm it owns `bot.pid` (watchdog green).
2. In a DIFFERENT project, start a plain `claude` session with **no** channels
   flag (the everyday case that broke us). Wait ~30s.
3. Check `~/.claude/channels/telegram/bot.pid` still points at the *bridge's*
   server (its pid descends from the `telegram-chat` tmux pane) AND a test
   Telegram message still gets a 👀 + reply.
4. **Pass** = upstream no longer polls/takes-over the bot in non-channel
   sessions → switch `run.sh` back to `--channels plugin:telegram@claude-plugins-official`,
   flip the two `enabledPlugins` (official `true`, fork `false`), retire the
   fork + its marketplace. **Fail** (bot.pid flipped to the other session, or
   the test message was eaten) = bug persists → stay on the fork, recheck next
   upstream release. Issue to watch: [claude-code#39808](https://github.com/anthropics/claude-code/issues/39808)
   (plugin enabled globally → every session's MCP server polls the one bot).

**Why `--dangerously-load-development-channels`:** CC's `--channels` only
accepts plugins on the Anthropic-managed approved-channels allowlist (official
marketplace only; `allowedChannelPlugins` can override it solely via managed
org settings). For a disabled or non-allowlisted plugin, `--channels` prints
"Listening" but silently never loads the channel — so the bridge launches the
fork with the dev-channels flag instead. That flag shows an interactive
confirmation on every claude start; the `start.sh` supervisor auto-confirms it
within ~10s (`classify_pane` → `devchannels` → Enter). If a CC update ever
changes that prompt's wording, update the greps in `classify_pane` — symptom:
bridge stuck at the warning screen, watchdog respawning every ~90s.

**Receipt ack:** `~/.claude/channels/telegram/access.json` sets
`"ackReaction": "👀"` — the server reacts 👀 to each accepted inbound message
the moment it hands it to the session. **👀 means *received*, not *answered*:**
it is emitted by the poller (a child process) before the agent runs, so it
fires even when claude is frozen on a system modal (the 2026-06-13 wedge).
No 👀 within seconds = never arrived (laptop asleep → arrives on wake; transport
broken → respawn within ~90s). 👀 but no reply within a minute while awake =
agent wedged → the agent-layer watchdog clears it within ~40s and DMs you.
Managed via `/telegram:access set ackReaction <emoji>`.

## Why a second bot (not the main AO Personal OS bot)

Telegram allows exactly one update consumer per bot (webhook XOR getUpdates).
The main bot's stream is consumed by the n8n "Drop Zone capture (cloud)"
webhook, so the chat bridge has its own bot. DM it directly; it is NOT in the
forum group (the plugin has no forum-topic support).

## Setup

```
./setup.sh    # idempotent: bun, plugin, .env from Keychain, launchd agent
```

Then pair (first run only): DM the bot → it replies with a code →
`tmux attach -t telegram-chat` → `/telegram:access pair <code>` →
`/telegram:access policy allowlist` → detach (Ctrl-B D).

## Ops

| Action | Command |
|---|---|
| Watch the live session | `tmux attach -t telegram-chat` (detach: Ctrl-B D) |
| Fresh session manually | `./new_session.sh` |
| Re-register bot menu (`/new` etc.) | `./register_commands.sh` (chat-scoped so the plugin's own menu writes don't clobber it; re-run after pairing a new sender) |
| Stop the bridge | `launchctl unload ~/Library/LaunchAgents/com.user.telegram-chat.plist && tmux kill-session -t telegram-chat` |
| Start it again | `launchctl load ~/Library/LaunchAgents/com.user.telegram-chat.plist` |
| Supervisor logs | `/tmp/telegram-chat.out.log`, `/tmp/telegram-chat.err.log` |
| Update the fork plugin | edit `plugin/` (the installed plugin runs LIVE from this repo dir) → `./new_session.sh` |
| Change the receipt emoji | `/telegram:access set ackReaction <emoji>` (or edit `~/.claude/channels/telegram/access.json`) |

## CLI version / auto-update (the "stuck version" trap, 2026-06-13)

`run.sh` invokes bare `claude` resolved via PATH → the **native** install at
`~/.local/bin/claude` → `~/.local/share/claude/versions/<v>`. Two things to know
before "updating the bridge binary":

- **The native install is pinned to the `stable` channel.** `claude update`
  checks stable only (the binary forces stable for non-Homebrew installs; the
  `latest` channel is reachable only via a `claude-code@latest` Homebrew cask).
  Whatever stable currently serves *is* "up to date" for this machine.
- **The "✗ Auto-update failed · v2.1.170+ available" banner is cosmetic.** It
  compares against the faster `latest`/canary pointer, not stable. You are not
  actually behind on the supported track.
- **Do NOT `claude install latest --force` to chase a canary build.** It lands
  the binary + symlink but isn't recorded as the install-of-record, so
  `autoUpdatesProtectedForNative` **reverts the symlink to the stable base on the
  next session start** (logged in `~/.claude/.last-update-result.json`). The
  bridge then silently respawns onto the old binary. Stay on stable.
- **`autoUpdates: false` in `~/.claude.json` is normal for native installs** and
  does NOT block updates — it disables the *legacy* updater; the native
  protection self-heal pulls future **stable** releases forward at startup.
  (Code: the disable-check returns "not disabled" when `installMethod==="native"
  && autoUpdatesProtectedForNative===true`.) Don't set `DISABLE_AUTOUPDATER` —
  that would actually stop stable updates.
- After any binary change, restart the bridge with `./new_session.sh` and verify:
  the dev-channels prompt still auto-confirms (the `start.sh` grep string
  `I am using this for local development` must exist in the new binary —
  check with `strings`), `~/.claude/channels/telegram/bot.pid` is a live
  descendant of the tmux pane, and the newest log under
  `~/Library/Caches/claude-cli-nodejs/-Users-…/mcp-logs-plugin-telegram-telegram/`
  shows `Channel notifications registered`.

## VPS migration (later, for laptop-independence)

Everything here is portable: on a Linux box, clone the repo (+ git-autosync),
install claude + bun + tmux, put the token in `~/.claude/channels/telegram/.env`
(no Keychain — adapt setup.sh step 4), authenticate claude once
(`claude setup-token`), and replace launchd with a systemd user unit running
`start.sh`. Stop the Mac launchd agent first — the bot allows only ONE
getUpdates consumer.

## Notes / limits

- Research preview: the `--channels` flag syntax and protocol may change.
  If the bridge breaks after a Claude Code update, check
  https://code.claude.com/docs/en/channels first.
- A laptop-independent "dispatch bot" alternative (n8n webhook → API-triggered
  cloud routine `/fire`) was considered and deferred: per-message sessions, no
  conversation memory, ~1–3 min latency, daily run cap. Good for one-shot task
  dispatch if ever needed; not chat.
