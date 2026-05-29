#!/usr/bin/env bash
# setup.sh — one-time setup for the book-finder skill.
# Creates the iCloud download dir + runtime .work/, checks deps, verifies TG.
# Safe to re-run (idempotent).
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"

echo "book-finder setup"
echo "─────────────────"

# 1. Download target (iCloud Drive/Books → syncs to iPhone Files app).
mkdir -p "$BOOKS_DIR"
echo "✓ download dir: $BOOKS_DIR"

# 2. Runtime state dir (git-ignored via **/.work/).
mkdir -p "$WORK"
[ -f "$STATE_FILE" ] || printf '{"acquired": []}\n' > "$STATE_FILE"
echo "✓ state file:   $STATE_FILE"

# 3. Required dependencies.
missing=0
for bin in python3 jq curl; do
  if command -v "$bin" >/dev/null 2>&1; then
    echo "✓ $bin"
  else
    echo "✗ $bin missing"
    missing=1
  fi
done

# 4. Optional: calibre, for fb2 → epub conversion (Play Books accepts EPUB, not fb2).
if command -v ebook-convert >/dev/null 2>&1; then
  echo "✓ calibre (ebook-convert) — fb2→epub conversion available"
else
  echo "· calibre not installed (optional). For fb2→epub: brew install --cask calibre"
fi

# 5. Telegram config (optional — links still land in-chat without it).
if [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELEGRAM_CHAT_ID:-}" ]; then
  echo "✓ Telegram configured (phone delivery enabled)"
else
  echo "· Telegram not configured (optional) — run automations/telegram/setup.sh for phone delivery"
fi

if [ "$missing" -eq 0 ]; then
  echo "Setup OK."
else
  echo "Setup incomplete — install the missing deps above." >&2
  exit 1
fi
