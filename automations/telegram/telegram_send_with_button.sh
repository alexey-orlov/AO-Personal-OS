#!/usr/bin/env bash
# telegram_send_with_button.sh <btn1_text> <btn1_url> [<btn2_text> <btn2_url> ...]
#
# POST a Telegram message with one or more inline URL buttons. Message body is
# read from stdin. Each (text, url) pair becomes one button on its own row.
#
# Used by inbox-sweep to deliver per-thread drafts:
#   - LIN-only:  one row → "Open in LinkedIn"
#   - LIN→email: two rows → "Open Gmail Drafts" + "Open in LinkedIn"
#
# Self-sourcing: reads TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID from Keychain
# via config.sh. Exit 0 on success, 1 on any failure — callers should treat
# a failure as non-fatal and continue.
#
# Link previews are disabled so URLs in the body don't render preview cards.
#
# Optional env: TG_PARSE_MODE=HTML (or MarkdownV2) enables Telegram parse_mode
# so callers can use <pre>…</pre> code blocks for tap-to-copy on mobile. When
# enabled, the CALLER is responsible for escaping reserved chars in the body
# (HTML: &, <, >; MarkdownV2: see Telegram docs). Unset = plain text (default).

set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"

if [ "$#" -lt 2 ] || [ $(($# % 2)) -ne 0 ]; then
  echo "[telegram_send_with_button] usage: $0 <text1> <url1> [<text2> <url2> ...]" >&2
  echo "[telegram_send_with_button] one (text, url) pair per button row" >&2
  exit 1
fi

if [ -z "${TELEGRAM_BOT_TOKEN:-}" ] || [ -z "${TELEGRAM_CHAT_ID:-}" ]; then
  echo "[telegram_send_with_button] not configured — run automations/telegram/setup.sh" >&2
  exit 1
fi

command -v jq >/dev/null 2>&1 || {
  echo "[telegram_send_with_button] jq not installed (brew install jq)" >&2
  exit 1
}

msg="$(cat)"
if [ -z "$msg" ]; then
  echo "[telegram_send_with_button] empty stdin, nothing to send" >&2
  exit 1
fi

# Telegram caps sendMessage text at 4096 chars. Safe-truncate.
if [ "${#msg}" -gt 4000 ]; then
  msg="${msg:0:3990}"$'\n…[truncated]'
fi

# Build inline_keyboard JSON from variadic (text, url) pairs.
# Each pair = one row containing one button.
keyboard="$(jq -nc '[]')"
while [ "$#" -gt 0 ]; do
  btn_t="$1"
  btn_u="$2"
  keyboard="$(jq -c --arg t "$btn_t" --arg u "$btn_u" \
    '. + [[ { text: $t, url: $u } ]]' <<<"$keyboard")"
  shift 2
done

payload="$(jq -nc \
  --arg chat_id    "$TELEGRAM_CHAT_ID" \
  --arg text       "$msg" \
  --arg parse_mode "${TG_PARSE_MODE:-}" \
  --argjson kb     "$keyboard" \
  '{
    chat_id: $chat_id,
    text: $text,
    disable_web_page_preview: true,
    reply_markup: { inline_keyboard: $kb }
  }
  + (if $parse_mode == "" then {} else { parse_mode: $parse_mode } end)')"

# Retry on transient network failure (same rationale as telegram_send.sh:
# covers the Wi-Fi-still-reconnecting race on laptop wake). Bounded (~1 min
# default). Only the network layer is retried; a non-ok API body fails fast.
retries="${TG_SEND_RETRIES:-5}"
retry_sleep="${TG_SEND_RETRY_SLEEP:-15}"
attempt=1
while :; do
  if resp="$(curl -fsS --max-time 15 \
    -H "Content-Type: application/json" \
    -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -d "$payload" 2>&1)"; then
    break
  fi
  if [ "$attempt" -ge "$retries" ]; then
    echo "[telegram_send_with_button] HTTP failure after $attempt attempts: $resp" >&2
    exit 1
  fi
  echo "[telegram_send_with_button] send attempt $attempt failed, retrying in ${retry_sleep}s…" >&2
  sleep "$retry_sleep"
  attempt=$((attempt + 1))
done

echo "$resp" | grep -q '"ok":true' || {
  echo "[telegram_send_with_button] API error: $resp" >&2
  exit 1
}
