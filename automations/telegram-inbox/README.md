# telegram-inbox — 📥 Drop Zone capture (cloud-first)

Captures everything Alex posts in the **📥 Drop Zone** topic of the "AO Personal OS"
Telegram forum group and stages it for the context wiki.

## Primary: n8n cloud capture (laptop-independent, since 2026-06-11)

n8n workflow **"Drop Zone capture (cloud)"** in <https://alexorlovco.app.n8n.cloud>:

```
Telegram webhook ─▶ gate (group + Drop Zone topic + not-bot) ─▶ build card (.md → base64)
   ─▶ [media? PUT attachment to GitHub] ─▶ PUT card to GitHub   →  context/_inbox/ on main
```

The trigger receives `message` updates only. (Until 2026-06-12 it also received
`message_reaction` updates and forwarded 👍 toggles to the "Second-brain delivery"
workflow's goals board — removed together with `context/knowledge/goals-tasks.md`;
goal/task/insight captures now land in Alex's pinned Apple Notes via the
`apple-notes-sync` local leg.)

- Captures within seconds of posting; each drop is a `dropzone: capture tg-<stamp>-<msgid>` commit.
- After the card commits, the **"React 👍 on capture"** node sets a 👍 reaction on the message
  (Bot API `setMessageReaction` via HTTP node — the native Telegram node can't react), so the phone
  shows the same capture confirmation the old local watcher gave. The node is `onError: continue`,
  so a reaction hiccup never fails the capture or fires an alert.
  **n8n gotcha:** `{{ $credentials.* }}` does NOT resolve in regular node expressions (credential
  definitions only), and Telegram puts the token in the URL *path*, which no generic n8n auth type
  can inject — so the token must sit literally in this node's URL inside n8n. That's why exports go
  through `export.sh`, which regex-strips any `bot<id>:<token>` before writing the JSON here.
- Card naming/format mirrors the local watcher (`tg-YYYYMMDD-HHMMSS-<msgid>.md`, frontmatter
  `source/date/message_id/attachment`; media alongside: `-photo.jpg`, `-voice.oga`, sanitized doc names).
  The card ALWAYS exists, even for captionless media — `/context-update` discovery keys on it.
- The daily claude.ai cloud routine **"Daily drop-zone & context fold"** (05:33 UTC = 08:33 Kyiv,
  same environment as the podcast routines) runs `/context-update` in sweep mode: routes each
  drop per the Drop taxonomy (step 3b of the skill), then moves card + attachments to
  `context/_inbox/processed/`. Engine-vs-scheduler, same philosophy as `podcast-knowledge`.
  Its push lands on a `main-*` branch — `.github/workflows/auto-merge-routine.yml` merges it
  into `main` automatically (the sandbox can't push to `main` directly). Goal/task/insight
  drops become queue cards in `context/_inbox/apple-notes/`, consumed by the local
  `apple-notes-sync` launchd leg (`automations/apple-notes-sync/`) — the cloud sandbox cannot
  reach Apple Notes. Book/explore Telegram notifications from the run are queued to
  `context/_inbox/outbox/` (`TG_OUTBOX=1`) and sent by the n8n **"Outbox flush (cloud)"**
  workflow at ~08:50 Kyiv (`automations/outbox-flush/README.md`).

  **Canonical routine prompt** (claude.ai → Code → Routines → "Daily drop-zone & context fold" —
  keep the routine in sync with this block):
  > First `export TG_OUTBOX=1` (this sandbox has no Telegram credentials — book/explore
  > notifications queue to `context/_inbox/outbox/` for the n8n "Outbox flush (cloud)"
  > workflow). Then run the `context-update` skill in **sweep** mode, following
  > `.claude/skills/context-update/SKILL.md` exactly: route each unprocessed Drop Zone card
  > by the Drop taxonomy (goals/tasks/insights → ONE queue card each in
  > `context/_inbox/apple-notes/` per the skill's card format — they are filed into Alex's
  > pinned Apple Notes by the local apple-notes-sync leg; NEVER attempt Apple Notes access
  > from this sandbox and send no Telegram message for them; books →
  > `context/knowledge/book-shortlist.md` + run the `book-finder` skill links-only, no
  > downloads; explore topics → `context/knowledge/explore/queue.md` + run the `explore-brief`
  > skill; area material → area pages), dedupe re-sent drops, move folded cards to
  > `context/_inbox/processed/`, update the ledger, send/queue the notifications the skill
  > specifies, commit `context: …` (include any outbox and apple-notes queue files), then push
  > the commit to the `main` ref explicitly: **`git push origin HEAD:main`**. (A bare `git push`
  > would land it on the agent's `claude/*` working branch, which the auto-merge net misses — the
  > 2026-06-13 silent-drop incident.) The sandbox proxy redirects the push onto a `main-*` branch —
  > expected; `.github/workflows/auto-merge-routine.yml` (triggers on `main-*`) lands it on `main`.
  > If there are no unprocessed drops, change nothing and just report. Output only the
  > skill's run-summary block.
- **Failure handling**: workflow `errorWorkflow` = "Podcast streaming — error alerts" → Telegram
  alert on crash. Success is silent (quiet-by-default, like the podcast digest).
- **Security**: the Telegram trigger validates Telegram's `secret_token` header — forged POSTs to
  the webhook URL are rejected. The exported JSON below REDACTS the group chat id and the trigger
  `webhookId` (per the CLAUDE.md hard rule: no live trigger URLs in the repo); restore both in the
  n8n UI if ever re-importing from this file.
- Voice notes are staged raw (no transcription yet); the daily fold reports them as `pending-voice`
  and leaves them in the backlog.

**Consequence of cloud capture:** drops are committed to the private GitHub repo
(`context/_inbox/`, then `processed/`). Anything that must never reach GitHub is not dropped
as a file at all — paste it into a Claude Code session and say "fold this into context"
(pasted mode). The old git-ignored root `inbox/` dir was retired 2026-06-12.

## Fallback: local watcher (original implementation, decommissioned 2026-06-11)

`watch.sh` + launchd agent — long-polls `getUpdates`, saves to a local inbox dir.
Unloaded and plist removed from `~/Library/LaunchAgents`; files kept here for fallback.
NOTE: the root `inbox/` dir it wrote to was retired 2026-06-12 — if ever reactivated,
point its `INBOX_DIR` at `context/_inbox/` (committed) in `config.sh` first.

Telegram allows webhook **XOR** `getUpdates` per bot: while the n8n workflow is active the
watcher cannot run (409 Conflict). To revert to local capture:

1. Deactivate "Drop Zone capture (cloud)" in n8n.
2. `TOKEN=$(security find-generic-password -a "$USER" -s TELEGRAM_BOT_TOKEN -w); curl "https://api.telegram.org/bot$TOKEN/deleteWebhook"`
3. `automations/telegram-inbox/setup.sh` — reinstalls the launchd agent.

Single-consumer rule still applies to the fallback (run on ONE machine only).

## What gets saved (both paths)

| Message type | Lands as |
|---|---|
| Text | `tg-<stamp>-<msgid>.md` (frontmatter: source, date, message id) |
| File / document | `tg-<stamp>-<msgid>-<sanitized name>` + card `.md` |
| Photo | `tg-<stamp>-<msgid>-photo.jpg` (large rendition) + card `.md` |
| Voice / audio | `tg-<stamp>-<msgid>-voice.oga` + card `.md` (not auto-transcribed) |

## Files

- `workflow-dropzone-capture.json` — redacted export of the live n8n workflow (disaster-recovery
  copy + diff history). Re-export after any n8n edit via `export.sh`.
- `export.sh` — the ONLY sanctioned export path: strips group chat id, trigger webhookId, and any
  bot token (regex, rotation-proof), then asserts nothing leaked before writing the file.
- `watch.sh`, `config.sh`, `com.user.telegram-inbox.plist`, `setup.sh` — the local fallback.
