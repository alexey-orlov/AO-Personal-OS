# outbox-flush — queued Telegram notifications → forum group (n8n cloud)

One n8n cloud workflow, **"Outbox flush (cloud)"** (id `q8OQXe2gwMk4rOxN`),
laptop-independent:

```
Schedule 08:50 Kyiv ─▶ GET context/_inbox/outbox/*.json ─▶ sendMessage ─▶ DELETE card
```

When a fold run has no Telegram credentials (the claude.ai cloud routine sandbox),
`automations/telegram/telegram_send*.sh` with `TG_OUTBOX=1` queue each message as a JSON
card in `context/_inbox/outbox/` instead of sending. This workflow sends every queued
card to the forum group and deletes it (commit `notify: flush outbox <file>`). In the
current pipeline that means 📚 book and 🔭 explore notifications from the daily
drop-zone fold (~08:33 Kyiv); 08:50 is intentionally after it, so the morning's
notifications go out the same morning.

Card format (written by `tg_queue_outbox` in `automations/telegram/config.sh` — the
canonical spec lives there):

```json
{ "topic": "books", "thread_id": "6", "text": "…", "buttons": [[{"text":"…","url":"…"}]],
  "parse_mode": "", "queued_at": "2026-06-12T10:15:12Z" }
```

- `thread_id` is resolved from `automations/telegram/topics.env` at queue time; the group
  chat id lives only in n8n/Keychain, never in the card.
- A failed send leaves the card queued (no DELETE) — retried next day; crash alerts go via
  the shared error workflow ("Podcast streaming — error alerts" → Telegram).
- `.gitkeep` and non-JSON files are ignored.

## History

This workflow was born as **"Second-brain delivery (cloud)"** (folder
`automations/second-brain-delivery/`): outbox flush + posting each
`context/knowledge/goals-tasks.md` item as its own 🎯/☑️ message + handling Alex's 👍
done/reopen reactions. The goals/reactions halves were REMOVED 2026-06-12 when
goals-tasks.md and the 🎯 Goals & Tasks topic were retired — goal/task/insight captures
now flow into Alex's pinned Apple Notes via `automations/apple-notes-sync/`. Only the
flush survived, hence the rename.

## Ops notes

- **Edit via the n8n MCP, then re-export**: `./export.sh` (requires `N8N_API_KEY` +
  `TELEGRAM_GROUP_CHAT_ID` in Keychain) → commits the redacted JSON here. Never commit the
  bot token, group chat id, or webhook ids (CLAUDE.md hard rules).
- The bot token sits literally in the Telegram HTTP node's URL inside n8n (Telegram puts
  it in the URL path — no n8n auth type can inject it; same gotcha as telegram-inbox).
  After a token rotation, update the URL in n8n by hand.
- GitHub access: Header-Auth credential "GitHub PAT (AO-Personal-OS) v2" (Contents RW).

## Files

- `workflow-outbox-flush.json` — redacted export of the live workflow
  (disaster-recovery copy + diff history).
- `export.sh` — the only sanctioned export path (redacts + asserts nothing leaked).
