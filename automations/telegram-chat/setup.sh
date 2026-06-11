#!/bin/bash
# One-time (idempotent) setup for the Telegram ↔ Claude Code chat bridge.
# Prereq: the bot token is in Keychain as TELEGRAM_CC_BOT_TOKEN
#   security add-generic-password -U -a "$USER" -s TELEGRAM_CC_BOT_TOKEN -w '<token>'
set -e
export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/local/bin:$PATH"

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLIST="com.user.telegram-chat.plist"

echo "== 1/5 Claude Code version (need >= 2.1.80 for channels)"
claude --version

echo "== 2/5 Bun (channel plugins are Bun scripts)"
if ! command -v bun >/dev/null; then
  brew install oven-sh/bun/bun
fi
bun --version

echo "== 3/5 Telegram channel plugin"
claude plugin install telegram@claude-plugins-official 2>/dev/null \
  || echo "   (already installed)"

echo "== 4/5 Bot token -> ~/.claude/channels/telegram/.env (from Keychain, never committed)"
TOKEN="$(security find-generic-password -a "$USER" -s TELEGRAM_CC_BOT_TOKEN -w)"
mkdir -p "$HOME/.claude/channels/telegram"
printf 'TELEGRAM_BOT_TOKEN=%s\n' "$TOKEN" > "$HOME/.claude/channels/telegram/.env"
chmod 600 "$HOME/.claude/channels/telegram/.env"

echo "== 5/5 launchd agent (supervises the telegram-chat tmux session)"
cp "$DIR/$PLIST" "$HOME/Library/LaunchAgents/$PLIST"
launchctl unload "$HOME/Library/LaunchAgents/$PLIST" 2>/dev/null || true
launchctl load "$HOME/Library/LaunchAgents/$PLIST"

cat <<'EOF'

Done. The bridge starts within ~10s. One-time pairing (first run only):
  1. DM the bot (@ao_personal_os_conversation_bot) any message -> it replies with a pairing code
  2. tmux attach -t telegram-chat
  3. In the session run:  /telegram:access pair <code>
     then:                /telegram:access policy allowlist
  4. Detach (Ctrl-B D). Chat away.
EOF
