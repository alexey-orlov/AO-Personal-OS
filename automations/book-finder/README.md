# automations/book-finder

Shared runtime + helpers for the `book-finder` skill (`.claude/skills/book-finder/`).
The skill is the orchestrator (it decides language, media, and source order and talks
to the web/MCP tools); this folder holds the deterministic pieces and the config.

## What's here

- `config.sh` — sourced by the scripts and the skill. Exports:
  - `BOOKS_DIR` — download target for fb2/epub. Defaults to
    `~/Library/Mobile Documents/com~apple~CloudDocs/Books` (iCloud Drive) so files
    sync to the iPhone Files app and can be imported into Google Play Books.
    Override with `export BOOKS_DIR=...` before sourcing.
  - `STATE_FILE` — `.work/state.json`, the acquisition log + dup guard (git-ignored).
  - `PYTHON_BIN` — interpreter for the scripts.
  - Telegram creds (re-exported from `automations/telegram/config.sh`).
- `setup.sh` — creates `BOOKS_DIR` + `.work/`, checks `python3`/`jq`/`curl`,
  flags whether calibre and Telegram are configured. Safe to re-run.
- `scripts/gbooks_search.py` — Google Books API search → canonical Play Books URL
  + review signal (rating / ratings count). Ebooks only (the API doesn't cover
  Play audiobooks). Always prints JSON, exits 0. Keyless use is rate-limited per IP
  (HTTP 429) — set `GOOGLE_BOOKS_API_KEY` in the environment to raise the limit
  (optional; on a 429 the script just returns `{"candidates": [], "error": ...}` and
  the skill falls back to WebSearch).
- `scripts/download_book.py` — downloads an epub/fb2 into `BOOKS_DIR`. Prefers EPUB,
  rejects PDF and unknown types, skips dups. Prints a JSON result.
- `.work/` — runtime state (auto-created; git-ignored via `**/.work/`).

## Setup

```bash
bash automations/book-finder/setup.sh
```

Telegram is optional — without it, the skill still returns links and file paths in-chat.
Set it up once via `automations/telegram/setup.sh` to get tappable links on your phone.

## Quick checks

```bash
# Find a Play Books link + rating for a title
python3 automations/book-finder/scripts/gbooks_search.py "Sapiens Harari"

# Download an epub (respects BOOKS_DIR; rejects pdf; skips if it already exists)
python3 automations/book-finder/scripts/download_book.py "https://www.gutenberg.org/ebooks/2600.epub3.images"
```

## fb2 → epub (optional)

Play Books upload accepts EPUB and PDF, not fb2. If you want fb2 downloads converted:

```bash
brew install --cask calibre
ebook-convert "book.fb2" "book.epub"
```
