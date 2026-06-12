# context/_inbox — cloud drop-zone staging

Committed staging buffer for Telegram **📥 Drop Zone** captures. The n8n cloud workflow
**"Drop Zone capture (cloud)"** commits every drop here within seconds of posting
(see `automations/telegram-inbox/README.md`); the daily context-fold cloud routine
(~08:30 Kyiv) routes each drop to its Second-Brain home and moves the files to `processed/`.

- One `.md` card per drop — `tg-YYYYMMDD-HHMMSS-<msgid>.md`, frontmatter:
  `source`, `date`, `message_id`, `attachment` (when media). Media drops land next to
  their card (`…-photo.jpg`, `…-voice.oga`, `…-<filename>`).
- `processed/` — folded drops, kept permanently: wiki pages link here as provenance. Never delete.
- This dir is **committed** — cloud capture requires it. Anything that must never reach the
  (private) GitHub repo is NOT dropped as a file at all: paste it into a Claude Code session
  and say "fold this into context" (pasted mode — distilled facts only, no raw file).
- `outbox/` — queued Telegram notifications written by a fold run that had no Telegram
  credentials (cloud); flushed and deleted by the n8n "Outbox flush (cloud)" workflow.
- `apple-notes/` — queued goal/task/insight cards written by the fold (one card per item);
  consumed by the Mac-local `apple-notes-sync` leg, which inserts them into Alex's pinned
  Apple Notes (`_ToDo`) and archives the cards to `processed/`.
- Routing taxonomy: `.claude/skills/context-update/SKILL.md`, step 3b (Drop taxonomy).
