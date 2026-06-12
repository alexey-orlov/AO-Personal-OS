#!/bin/bash
# One-time (idempotent) setup for the Telegram ↔ Claude Code chat bridge.
# Prereq: the bot token is in Keychain as TELEGRAM_CC_BOT_TOKEN
#   security add-generic-password -U -a "$USER" -s TELEGRAM_CC_BOT_TOKEN -w '<token>'
set -e
export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/local/bin:$PATH"

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLIST="com.user.telegram-chat.plist"

echo "== 1/6 Claude Code version (need >= 2.1.80 for channels)"
claude --version

echo "== 2/6 Bun (channel plugins are Bun scripts)"
if ! command -v bun >/dev/null; then
  brew install oven-sh/bun/bun
fi
bun --version

echo "== 3/6 Telegram channel plugin — the repo's GATED FORK via local marketplace"
# Single-poller invariant (see README): the official plugin must stay disabled;
# only the fork (with the TELEGRAM_CHANNEL_POLL gate) may be enabled.
claude plugin marketplace add "$DIR" 2>/dev/null || true
claude plugin install telegram@ao-personal-os --scope user 2>/dev/null \
  || echo "   (already installed)"
python3 - <<'PY'
import json, os
p = os.path.expanduser('~/.claude/settings.json')
d = json.load(open(p)) if os.path.exists(p) else {}
ep = d.setdefault('enabledPlugins', {})
ep['telegram@claude-plugins-official'] = False
ep['telegram@ao-personal-os'] = True
json.dump(d, open(p, 'w'), indent=2)
print('   enabledPlugins: official=False, ao-personal-os fork=True')
PY

echo "== 4/6 Bot token -> ~/.claude/channels/telegram/.env (from Keychain, never committed)"
TOKEN="$(security find-generic-password -a "$USER" -s TELEGRAM_CC_BOT_TOKEN -w)"
mkdir -p "$HOME/.claude/channels/telegram"
printf 'TELEGRAM_BOT_TOKEN=%s\n' "$TOKEN" > "$HOME/.claude/channels/telegram/.env"
chmod 600 "$HOME/.claude/channels/telegram/.env"

echo "== 5/6 launchd agent (supervises the telegram-chat tmux session)"
cp "$DIR/$PLIST" "$HOME/Library/LaunchAgents/$PLIST"
launchctl unload "$HOME/Library/LaunchAgents/$PLIST" 2>/dev/null || true
launchctl load "$HOME/Library/LaunchAgents/$PLIST"

echo "== 6/6 Bot command menu (/new etc.; needs a paired chat — skipped if none yet)"
"$DIR/register_commands.sh" || true

cat <<'EOF'

Done. The bridge starts within ~10s. One-time pairing (first run only):
  1. DM the bot (@ao_personal_os_conversation_bot) any message -> it replies with a pairing code
  2. tmux attach -t telegram-chat
  3. In the session run:  /telegram:access pair <code>
     then:                /telegram:access policy allowlist
  4. Detach (Ctrl-B D). Chat away.
EOF
