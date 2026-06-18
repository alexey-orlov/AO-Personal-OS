# outbox-flush — queued Telegram notifications → forum group (n8n cloud)

One n8n cloud workflow, **"Outbox flush (cloud)"** (id `q8OQXe2gwMk4rOxN`),
laptop-independent:

```
Schedule 08:50 Kyiv ─▶ list outbox/*.json ─▶ decode (sanitize buttons) ─▶ sendMessage
                          ─▶ DELETE card ─[on error]▶ Refetch sha ─[still there]▶ DELETE retry
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
- **DELETE is idempotent + self-healing** (see the git-autosync race below). `DELETE card`
  retries transient failures (`retryOnFail`, 3×/3s) — re-issuing re-reads `main`'s head, which
  resolves the common 409. If it still errors, its error output → `Refetch sha` (GET the file
  at `?ref=main`): a **404 there means the card is already gone = success** (terminal); a 200
  means it really still exists, so → `DELETE retry` with the **freshly-read sha**. Every node in
  this chain is `onError: continueErrorOutput`, so a card that genuinely can't be deleted just
  stays queued and is reported in the execution log — it never aborts the batch or blocks the
  other cards' per-item deletes.
- **2026-06-18 incident — one card delivered 3× (root cause + fix).** Two of three queued
  explore briefs had malformed inline buttons (`url` field = `"label https://…"`, invalid →
  Telegram `BUTTON_URL_INVALID`). The Send node had no `onError` handler, so after the two
  failed and the third (Enterprise) succeeded, the node **threw and stopped the workflow
  before `DELETE card` ran** — nothing was dequeued. Every later flush re-ran and re-sent the
  one card that succeeds, so Enterprise arrived 3× while the two malformed cards never
  delivered. Three structural fixes:
  1. **Send `onError: continueErrorOutput`** — a failed send no longer stops the batch; the
     success output (main 0) → DELETE, so each sent card is dequeued per-item and can never
     be re-sent because a sibling failed. (This is the real duplication fix.)
  2. **Button sanitize (Decode card node)** — drops any button whose `url` isn't a bare
     `https://…`, so a malformed card still delivers its text instead of erroring at all.
  3. **Idempotent, retrying DELETE (git-autosync race).** A follow-up manual flush surfaced a
     second cause: `DELETE card` 409'd on the 2nd of 2 cards. git-autosync commits to `main`
     every ~minute, so `main`'s head is a moving target — the first delete advances it and the
     second races the ref update (`is at <new> but expected <old>`); the card was delivered but
     left queued, so it would re-send next run. Fix: `DELETE card` now `retryOnFail`s (re-issuing
     re-reads head), and on a persistent error falls through `Refetch sha` → `DELETE retry` with a
     freshly-read sha; **404 anywhere = already gone = success**. All three nodes are
     `onError: continueErrorOutput` so a stuck delete is reported, not fatal. The delete must be
     idempotent + retrying — it can never assume a stable head.
  Source-side fix: `.claude/skills/explore-brief/SKILL.md` (build cards via
  `telegram_send_with_button.sh` with separate `text`/`url` args; never hand-assemble the
  JSON). **All three live-workflow fixes were applied via the n8n MCP and verified end-to-end on
  2026-06-18** (a 2-card self-test flush: both delivered once, both dequeued, the deliberate
  race on the 2nd delete absorbed by the recovery chain with the run still `success`). `export.sh`
  re-synced this repo copy to live.

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
- **Don't collapse the delete-recovery chain into one Code node.** This n8n cloud instance runs
  the external JS task runner, where `helpers.httpRequestWithAuthentication` is unavailable in
  Code nodes (verified 2026-06-18 — it throws "not supported in the Code Node"). Authenticated
  GitHub calls must therefore be **HTTP Request** nodes — which is why `Refetch sha` / `DELETE
  retry` are separate HTTP nodes wired through error outputs, not one tidy Code loop.

## Files

- `workflow-outbox-flush.json` — redacted export of the live workflow
  (disaster-recovery copy + diff history).
- `export.sh` — the only sanctioned export path (redacts + asserts nothing leaked).
