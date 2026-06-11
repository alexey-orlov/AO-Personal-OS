# inbox — LOCAL drop zone for the context wiki (private path)

Drop any file here (`.md`, `.txt`, `.pdf`, `.docx`) that should be folded into the live
context **without ever reaching GitHub** — sensitive notes, exported threads, anything
under the raw-transcript privacy policy.

- Contents are **git-ignored** (only this README is committed). Only the distilled facts
  land in committed wiki pages under `context/`; pages cite these drops as
  `(local drop: <filename>, YYYY-MM-DD)` without links.
- The next local `/context-update` sweep folds files here, then moves them to
  `inbox/processed/` (also local-only; safe to empty whenever).
- **The primary Drop Zone path is now cloud**: anything posted to the 📥 Drop Zone topic in
  Telegram is captured by n8n into `context/_inbox/` (committed) and folded by the daily
  cloud routine — no laptop needed. See `automations/telegram-inbox/README.md`. Use THIS
  local dir only for material that must stay off GitHub.
- Want something folded in without a file? Paste it in a Claude Code session and say
  "fold this into context".
