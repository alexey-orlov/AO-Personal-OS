# second-brain-delivery — Telegram delivery + 🎯 Goals & Tasks items (n8n cloud)

The delivery half of the second-brain pipeline (capture half: `automations/telegram-inbox/`;
knowledge structure: `context/knowledge/README.md`). One n8n cloud workflow,
**"Second-brain delivery (cloud)"** (id `q8OQXe2gwMk4rOxN`), laptop-independent:

```
Schedule 08:50 Kyiv ──┬─▶ flush outbox: GET context/_inbox/outbox/*.json ─▶ sendMessage ─▶ DELETE card
                      └─▶ items: GET goals-tasks.md ─▶ post NEW items (one message each, stamp · tg:<id>
                            back into the file) + re-edit POSTED items to current ⬜/✅ state
'Drop Zone capture' (👍 added/removed on an item message) ─▶ GET goals-tasks.md
                      ─▶ flip the line's checkbox ─▶ PUT goals-tasks.md ─▶ edit that message
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

**2. 🎯 Goals & Tasks items.** `context/knowledge/goals-tasks.md` is the source of truth;
the 🎯 Goals & Tasks topic mirrors it as ONE MESSAGE PER ITEM — `🎯 g1 — <text>` for goals,
`☑️ t1 — <text>` for tasks, `✅ 🎯 g1 — <text> · done YYYY-MM-DD` once done. Alex's native
**👍 reaction marks an item done; removing the 👍 reopens it** (his explicit preference
over inline-button boards, 2026-06-12). Item text = the part of the line before the first
` · `.

- **Post + sync** (daily 08:50 Kyiv, ~15 min after the drop-zone fold): items WITHOUT a
  ` · tg:<id>` stamp are new → posted (sequentially, batchSize 1, so topic order matches
  file order) and the message id is stamped back into the line (one PUT, commit
  `goals-tasks: stamp tg ids …`). Items WITH a stamp are re-edited to current state — so
  completions made by other paths ("done X" drop, hand-edit) reach the chat within a day.
  "Message is not modified" 400s are expected no-ops (`onError: continue`).
- **Reaction toggle** (instant): Telegram sends `message_reaction` updates to the bot's
  webhook (bot must be a group admin — it is) → the "Drop Zone capture (cloud)" workflow's
  *Reaction gate* forwards 👍 add/remove on group messages here → the line whose
  ` · tg:<message_id>` matches is flipped (+/-` · done YYYY-MM-DD`), committed to main
  (`goals-tasks: done <id> (👍)`), and the message edited to ✅/open. Reactions on
  non-item messages and non-👍 emojis are ignored.
- The item renderer (`renderItem`) lives in TWO Code nodes — "Plan posts and edits" and
  "Apply reaction" — marked keep-in-sync; change both together.

## Ops notes

- **Edit via the n8n MCP, then re-export**: `./export.sh` (requires `N8N_API_KEY` +
  `TELEGRAM_GROUP_CHAT_ID` in Keychain) → commits the redacted JSON here. Never commit the
  bot token, group chat id, or webhook ids (CLAUDE.md hard rules).
- The bot token sits literally in the Telegram HTTP nodes' URLs inside n8n (Telegram puts
  it in the URL path — no n8n auth type can inject it; same gotcha as telegram-inbox).
  After a token rotation, update the URLs in n8n by hand.
- GitHub access: Header-Auth credential "GitHub PAT (AO-Personal-OS) v2" (Contents RW).
- **If an item message is lost/deleted:** remove that line's ` · tg:<id>` stamp in
  goals-tasks.md and push — the next daily run re-posts it and re-stamps. Never invent
  stamps by hand.
- The schedule (08:50) is intentionally AFTER the daily drop-zone fold (~08:33) and podcast
  fold (~08:03), so the morning's queued notifications and new board items go out the same
  morning.

## Files

- `workflow-second-brain-delivery.json` — redacted export of the live workflow
  (disaster-recovery copy + diff history).
- `export.sh` — the only sanctioned export path (redacts + asserts nothing leaked).
