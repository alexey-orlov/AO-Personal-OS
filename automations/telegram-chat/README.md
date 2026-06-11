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

## Architecture

```
launchd (com.user.telegram-chat, KeepAlive)
  └─ start.sh             supervisor: ensures the tmux session exists (10s poll)
       └─ tmux session "telegram-chat"
            └─ run.sh     loop: each iteration = a FRESH `claude --channels …` session
                 └─ claude --channels plugin:telegram@claude-plugins-official
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
| Stop the bridge | `launchctl unload ~/Library/LaunchAgents/com.user.telegram-chat.plist && tmux kill-session -t telegram-chat` |
| Start it again | `launchctl load ~/Library/LaunchAgents/com.user.telegram-chat.plist` |
| Supervisor logs | `/tmp/telegram-chat.out.log`, `/tmp/telegram-chat.err.log` |

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
