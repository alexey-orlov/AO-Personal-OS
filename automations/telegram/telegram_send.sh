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

# Retry the send on transient network failure (e.g. Wi-Fi still reconnecting
# right after the laptop wakes and a missed cron tick fires). Because the
# heartbeat is the first network op of an inbox-sweep tick, this retry also
# acts as a network-readiness gate for the whole run. Bounded (~1 min default)
# so a genuinely-down network doesn't hang things. Only the network layer is
# retried; a successful HTTP call returning a non-ok API body (bad token /
# chat_id) is a semantic error and fails immediately.
retries="${TG_SEND_RETRIES:-5}"
retry_sleep="${TG_SEND_RETRY_SLEEP:-15}"
attempt=1
while :; do
  if resp="$(curl -fsS --max-time 15 \
    -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" \
    --data-urlencode "text=${msg}" \
    --data-urlencode "disable_web_page_preview=true" 2>&1)"; then
    break
  fi
  if [ "$attempt" -ge "$retries" ]; then
    echo "[telegram_send] HTTP failure after $attempt attempts: $resp" >&2
    exit 1
  fi
  echo "[telegram_send] send attempt $attempt failed, retrying in ${retry_sleep}s…" >&2
  sleep "$retry_sleep"
  attempt=$((attempt + 1))
done

echo "$resp" | grep -q '"ok":true' || {
  echo "[telegram_send] API error: $resp" >&2
  exit 1
}
