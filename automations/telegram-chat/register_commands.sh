#!/bin/bash
# Register the bot's command menu (incl. /new) for every allowlisted chat.
#
# Why chat-scoped: the channel plugin overwrites the all_private_chats menu
# with its own three commands (start/help/status) on every session start.
# A chat-specific scope takes precedence in Telegram and survives that.
#
# /new is NOT handled by the plugin — it falls through to Claude as message
# text, and the CLAUDE.md rule makes Claude restart the session via
# new_session.sh. Registering it here only makes it show in the menu.
#
# Idempotent; re-run after pairing a new sender.
set -e
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

TOKEN="$(security find-generic-password -a "$USER" -s TELEGRAM_CC_BOT_TOKEN -w)"
ACCESS="$HOME/.claude/channels/telegram/.config/access.json"
[ -f "$ACCESS" ] || ACCESS="$HOME/.claude/channels/telegram/access.json"

CHAT_IDS="$(python3 -c "import json,sys; print('\n'.join(json.load(open('$ACCESS')).get('allowFrom',[])))")"
[ -n "$CHAT_IDS" ] || { echo "no allowlisted chats in $ACCESS — pair first"; exit 1; }

for CHAT in $CHAT_IDS; do
  curl -s "https://api.telegram.org/bot$TOKEN/setMyCommands" \
    -H 'Content-Type: application/json' \
    -d "{\"scope\":{\"type\":\"chat\",\"chat_id\":$CHAT},\"commands\":[
      {\"command\":\"new\",\"description\":\"Start a fresh Claude Code session\"},
      {\"command\":\"start\",\"description\":\"Welcome and setup guide\"},
      {\"command\":\"help\",\"description\":\"What this bot can do\"},
      {\"command\":\"status\",\"description\":\"Check your pairing status\"}]}" \
    | grep -q '"ok":true' && echo "menu registered for chat $CHAT"
done
