# config.sh — sourced by telegram_send.sh.
#
# Telegram credentials live in macOS Keychain (set up via setup.sh).
# Empty values cause telegram_send.sh to error out with a clear message
# pointing the user at setup.sh. Env-var fallback exists so a caller can
# override (e.g. in CI or for ad-hoc testing) without touching Keychain.

export TELEGRAM_BOT_TOKEN="$(security find-generic-password -a "$USER" -s TELEGRAM_BOT_TOKEN -w 2>/dev/null || echo "${TELEGRAM_BOT_TOKEN:-}")"
export TELEGRAM_CHAT_ID="$(security find-generic-password -a "$USER" -s TELEGRAM_CHAT_ID -w 2>/dev/null || echo "${TELEGRAM_CHAT_ID:-}")"
