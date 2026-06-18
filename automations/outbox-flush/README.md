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
- A failed send routes the card to the Send node's **error output** (`onError:
  continueErrorOutput`), which is unconnected — so the card stays queued (no DELETE) and is
  retried next day, while every *successfully* sent card in the same batch is deleted
  immediately. `.gitkeep` and non-JSON files are ignored.
- **2026-06-18 incident — one card delivered 3× (root cause + fix).** Two of three queued
  explore briefs had malformed inline buttons (`url` field = `"label https://…"`, invalid →
  Telegram `BUTTON_URL_INVALID`). The Send node had no `onError` handler, so after the two
  failed and the third (Enterprise) succeeded, the node **threw and stopped the workflow
  before `DELETE card` ran** — nothing was dequeued. Every later flush re-ran and re-sent the
  one card that succeeds, so Enterprise arrived 3× while the two malformed cards never
  delivered. Two structural fixes, both needed:
  1. **Send `onError: continueErrorOutput`** — a failed send no longer stops the batch; the
     success output (main 0) → DELETE, so each sent card is dequeued per-item and can never
     be re-sent because a sibling failed. (This is the real duplication fix.)
  2. **Button sanitize (Decode card node)** — drops any button whose `url` isn't a bare
     `https://…`, so a malformed card still delivers its text instead of erroring at all.
  Source-side fix: `.claude/skills/explore-brief/SKILL.md` (build cards via
  `telegram_send_with_button.sh` with separate `text`/`url` args; never hand-assemble the
  JSON). **The repo JSON change is inert until re-imported into the live n8n workflow via the
  n8n MCP** (see Ops notes) — until then the live flow still has the duplication bug.

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
