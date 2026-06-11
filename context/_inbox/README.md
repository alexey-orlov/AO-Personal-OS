# context/_inbox — cloud drop-zone staging

Committed staging buffer for Telegram **📥 Drop Zone** captures. The n8n cloud workflow
**"Drop Zone capture (cloud)"** commits every drop here within seconds of posting
(see `automations/telegram-inbox/README.md`); the daily context-fold cloud routine
(~08:30 Kyiv) routes each drop to its Second-Brain home and moves the files to `processed/`.

- One `.md` card per drop — `tg-YYYYMMDD-HHMMSS-<msgid>.md`, frontmatter:
  `source`, `date`, `message_id`, `attachment` (when media). Media drops land next to
  their card (`…-photo.jpg`, `…-voice.oga`, `…-<filename>`).
- `processed/` — folded drops, kept permanently: wiki pages link here as provenance. Never delete.
- Unlike `inbox/` (local, git-ignored), this dir is **committed** — cloud capture requires it.
  Anything that must never reach the (private) GitHub repo goes to local `inbox/` instead.
- Routing taxonomy: `.claude/skills/context-update/SKILL.md`, step 3b (Drop taxonomy).
