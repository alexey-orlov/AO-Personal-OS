# inbox — drop zone for the context wiki

Drop any file here (`.md`, `.txt`, `.pdf`, `.docx`) that should be folded into the live context: meeting notes from elsewhere, documents, Alex's draft notes, exported threads.

- Contents are **git-ignored** (only this README is committed): raw drops stay local for privacy, same policy as raw transcripts. Only the distilled facts land in committed wiki pages under `context/`.
- The next `/context-update` sweep reads everything here, folds it into the relevant `context/areas/<area>/` page(s), then moves the file to `inbox/processed/` (also local-only; safe to empty whenever).
- Want something folded in without a file? Just paste it in a Claude Code session and say "fold this into context".
