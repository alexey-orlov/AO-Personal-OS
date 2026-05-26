#!/usr/bin/env bash
# setup.sh — first-time Telegram configuration check.
# Non-interactive: if both Keychain entries exist, confirms and exits 0.
# Otherwise prints the BotFather walkthrough and exits 0 (the user does
# the steps themselves; this script never prompts).
set -euo pipefail

have_token="$(security find-generic-password -a "$USER" -s TELEGRAM_BOT_TOKEN -w 2>/dev/null || true)"
have_chat="$(security find-generic-password -a "$USER" -s TELEGRAM_CHAT_ID -w 2>/dev/null || true)"

if [ -n "$have_token" ] && [ -n "$have_chat" ]; then
  echo "Telegram configured. Smoke-test with:"
  echo "  echo 'hello' | automations/telegram/telegram_send.sh"
  exit 0
fi

cat <<'EOF'
Telegram is unconfigured. Do these one-time steps:

  1. Open Telegram, search @BotFather, send /newbot.
     Pick a display name and a username ending in 'bot' (e.g. ao_personal_os_bot).
     BotFather returns a token like 1234567890:ABCDEF…

  2. Search your new bot in Telegram and send it any message (e.g. "hi").
     The bot can only DM you AFTER you initiate the chat.

  3. In your browser, open:
        https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
     Find result[0].message.chat.id (a number; negative for group chats).

  4. Store both in Keychain (the -U flag overwrites if already set —
     plain `add` errors "already exists" and silently keeps the old value):

        security add-generic-password -U -a "$USER" -s TELEGRAM_BOT_TOKEN -w '<token>'
        security add-generic-password -U -a "$USER" -s TELEGRAM_CHAT_ID  -w '<chat_id>'

  5. Smoke-test:
        echo "hello from AO-Personal-OS" | automations/telegram/telegram_send.sh

  6. If you use the call-pipeline launchd watcher, reload it so the new env
     is picked up by the long-lived process:

        launchctl unload ~/Library/LaunchAgents/com.user.callpipeline.plist
        launchctl load   ~/Library/LaunchAgents/com.user.callpipeline.plist
EOF
