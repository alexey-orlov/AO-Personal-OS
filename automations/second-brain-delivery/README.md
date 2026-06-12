# second-brain-delivery — Telegram delivery + 🎯 Goals & Tasks boards (n8n cloud)

The delivery half of the second-brain pipeline (capture half: `automations/telegram-inbox/`;
knowledge structure: `context/knowledge/README.md`). One n8n cloud workflow,
**"Second-brain delivery (cloud)"** (id `q8OQXe2gwMk4rOxN`), laptop-independent:

```
Schedule 08:50 Kyiv ──┬─▶ flush outbox: GET context/_inbox/outbox/*.json ─▶ sendMessage ─▶ DELETE card
                      └─▶ render boards: GET goals-tasks.md ─▶ render ─▶ editMessageText ×2 (pinned)
'Drop Zone capture' (gt:<id> button tap) ─▶ answerCallbackQuery ─▶ GET goals-tasks.md
                      ─▶ toggle line ─▶ PUT goals-tasks.md ─▶ render ─▶ editMessageText ×2
```

## The two jobs

**1. Outbox flush.** When a fold run has no Telegram credentials (the claude.ai cloud
routine sandbox), `automations/telegram/telegram_send*.sh` with `TG_OUTBOX=1` queue each
message as a JSON card in `context/_inbox/outbox/` instead of sending. This workflow sends
every queued card to the forum group and deletes it (commit `notify: flush outbox <file>`).
Card format (written by `tg_queue_outbox` in `automations/telegram/config.sh` — the
canonical spec lives there):

```json
{ "topic": "insights", "thread_id": "50", "text": "…", "buttons": [[{"text":"…","url":"…"}]],
  "parse_mode": "", "queued_at": "2026-06-12T10:15:12Z" }
```

- `thread_id` is resolved from `automations/telegram/topics.env` at queue time; the group
  chat id lives only in n8n/Keychain, never in the card.
- A failed send leaves the card queued (no DELETE) — retried next day; crash alerts go via
  the shared error workflow ("Podcast streaming — error alerts" → Telegram).
- `.gitkeep` and non-JSON files are ignored.

**2. 🎯 Goals & Tasks boards.** `context/knowledge/goals-tasks.md` is the source of truth;
two pinned messages in the 🎯 Goals & Tasks topic are a VIEW of it (one for Goals, one for
Tasks), each with inline toggle buttons (`✓ g1` → callback `gt:g1`). The pinned message ids
live in the file's frontmatter (`tg_goals_message_id` / `tg_tasks_message_id`).

- **Render** (daily 08:50 Kyiv, ~15 min after the drop-zone fold): re-renders both boards
  from the file — new items appear, check states preserved (they live in the file).
  "Message is not modified" 400s are expected no-ops (`onError: continue`).
- **Toggle** (button tap): Telegram sends the `callback_query` to the bot's webhook → the
  "Drop Zone capture (cloud)" workflow's *Callback gate* branch calls this workflow →
  checkbox flipped in the file (+` · done YYYY-MM-DD`), committed to main
  (`goals-tasks: done <id> (board tap)`), boards re-rendered. Tapping `↩` reopens.
- Render format (the ONE renderer is the "Toggle + render boards" Code node):
  `🎯 Goals — YYYY-MM-DD` / `☑️ Tasks — YYYY-MM-DD`, one `⬜|✅ <id> — <text>` line per item
  (text = part before the first ` · `), buttons in rows of 3.

## Ops notes

- **Edit via the n8n MCP, then re-export**: `./export.sh` (requires `N8N_API_KEY` +
  `TELEGRAM_GROUP_CHAT_ID` in Keychain) → commits the redacted JSON here. Never commit the
  bot token, group chat id, or webhook ids (CLAUDE.md hard rules).
- The bot token sits literally in the Telegram HTTP nodes' URLs inside n8n (Telegram puts
  it in the URL path — no n8n auth type can inject it; same gotcha as telegram-inbox).
  After a token rotation, update the URLs in n8n by hand.
- GitHub access: Header-Auth credential "GitHub PAT (AO-Personal-OS) v2" (Contents RW).
- **Re-pinning after a board message is lost/deleted:** send + pin two fresh messages in
  the 🎯 topic (any render is fine — the next workflow run overwrites it with canonical
  format), put their message ids into the goals-tasks.md frontmatter, push. Procedure used
  originally: session of 2026-06-12.
- The schedule (08:50) is intentionally AFTER the daily drop-zone fold (~08:33) and podcast
  fold (~08:03), so the morning's queued notifications and new board items go out the same
  morning.

## Files

- `workflow-second-brain-delivery.json` — redacted export of the live workflow
  (disaster-recovery copy + diff history).
- `export.sh` — the only sanctioned export path (redacts + asserts nothing leaked).
