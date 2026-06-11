# telegram-inbox — Drop Zone → `inbox/` watcher

Long-polls @ao_personal_os_bot for messages Alex posts in the **📥 Drop Zone**
topic of the "AO Personal OS" Telegram forum group and saves them into the
repo's `inbox/` drop zone, where the next `/context-update` sweep folds them
into the context wiki.

## What gets saved

| Message type | Lands as |
|---|---|
| Text | `inbox/tg-<stamp>-<msgid>.md` (frontmatter: source, date, message id) |
| File / document | `inbox/tg-<stamp>-<msgid>-<original name>` (+ caption sidecar `.md`) |
| Photo | `inbox/tg-<stamp>-<msgid>-photo.jpg` (largest rendition) |
| Voice note / audio | `inbox/tg-<stamp>-<msgid>-voice.oga` (saved raw; not auto-transcribed) |

The bot reacts 👍 on each captured message, so the phone shows confirmation.
`inbox/` is git-ignored — raw drops stay local; only distilled context is
committed (same privacy policy as call transcripts).

Messages in every other topic (English Coaching, Inbox & Drafts, …) are
ignored — those are bot→Alex channels.

## Architecture

- `watch.sh` — infinite `getUpdates` long-poll loop (50s window), filters to
  `chat_id == TELEGRAM_GROUP_CHAT_ID && message_thread_id == TG_TOPIC_DROPZONE`,
  downloads media via `getFile`. Offset persisted in `.work/offset`.
- `config.sh` — inherits token/chat ids/topic map from `automations/telegram/`.
- `com.user.telegram-inbox.plist` — launchd agent, `KeepAlive`, logs in `/tmp/`.

## Setup (per machine — but see the single-consumer rule)

1. One-time, any machine: `automations/telegram/setup_group.sh` (creates
   topics, stores `TELEGRAM_GROUP_CHAT_ID` in Keychain, writes `topics.env`).
2. `automations/telegram-inbox/setup.sh` — installs + loads the launchd agent.

**Single-consumer rule:** Telegram allows ONE `getUpdates` consumer per bot.
Run this watcher on ONE machine only (keep it with the call-pipeline machine).
A second machine that also runs it would silently steal updates.

## Ops

```bash
tail -f /tmp/telegram-inbox.out.log                                  # liveness
launchctl unload ~/Library/LaunchAgents/com.user.telegram-inbox.plist  # stop
launchctl load   ~/Library/LaunchAgents/com.user.telegram-inbox.plist  # start
rm automations/telegram-inbox/.work/offset                            # replay nothing — offset only moves forward; deleting re-fetches whatever Telegram still buffers (~24h)
```
