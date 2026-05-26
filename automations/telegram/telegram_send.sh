#!/usr/bin/env bash
# telegram_send.sh — POST a message to Telegram. Reads text from stdin.
# Self-sourcing: reads TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID from Keychain
# via config.sh. Exit 0 on success, 1 on any failure — callers should treat
# a failure as non-fatal and continue.
#
# Link previews are disabled so a GitHub URL in the message body doesn't
# render a giant preview card on the phone.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"

if [ -z "${TELEGRAM_BOT_TOKEN:-}" ] || [ -z "${TELEGRAM_CHAT_ID:-}" ]; then
  echo "[telegram_send] not configured — run automations/telegram/setup.sh" >&2
  exit 1
fi

msg="$(cat)"
if [ -z "$msg" ]; then
  echo "[telegram_send] empty stdin, nothing to send" >&2
  exit 1
fi

# Telegram caps sendMessage text at 4096 chars. Safe-truncate just in case.
if [ "${#msg}" -gt 4000 ]; then
  msg="${msg:0:3990}"$'\n…[truncated]'
fi

resp="$(curl -fsS --max-time 15 \
  -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" \
  --data-urlencode "text=${msg}" \
  --data-urlencode "disable_web_page_preview=true" 2>&1)" || {
  echo "[telegram_send] HTTP failure: $resp" >&2
  exit 1
}

echo "$resp" | grep -q '"ok":true' || {
  echo "[telegram_send] API error: $resp" >&2
  exit 1
}
