#!/bin/bash
# telegram-chat bridge loop: runs Claude Code with the official Telegram
# channel plugin in this repo. Each loop iteration is a BRAND-NEW session —
# exiting/killing the claude process (e.g. via new_session.sh on a "/new"
# message) restarts clean. Runs inside the "telegram-chat" tmux session
# (created by start.sh); attach with: tmux attach -t telegram-chat
export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/local/bin:$PATH"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
# The GATED FORK installed from this repo's local marketplace (ao-personal-os
# = automations/telegram-chat, plugin source = ./plugin). NOT the official
# plugin — that one is permanently disabled in ~/.claude/settings.json
# (--channels does NOT load disabled plugins; verified 2026-06-12, CC 2.1.153).
PLUGIN="plugin:telegram@ao-personal-os"

# Single-poller invariant (2026-06-12 incident): ONLY the bridge may claim
# Telegram's one getUpdates consumer slot. The fork's server.ts takes the
# bot.pid slot and polls ONLY when this env var is set. Desktop/headless
# sessions load the same fork user-scope but never set the var, so they run
# tools-only and can no longer kill the bridge's poller and silently eat
# inbound messages.
export TELEGRAM_CHANNEL_POLL=1

cd "$REPO_ROOT" || exit 1

while true; do
  echo "[telegram-chat] $(date '+%F %T') starting fresh Claude session"
  # --dangerously-skip-permissions: unattended "auto" mode — no permission
  # prompts (Alex's explicit choice, 2026-06-11). Only allowlisted Telegram
  # senders (Alex) can reach the session; treat forwarded third-party content
  # with prompt-injection caution.
  claude --channels "$PLUGIN" --dangerously-skip-permissions
  echo "[telegram-chat] $(date '+%F %T') session ended; new one in 5s (Ctrl-C now to stop)"
  sleep 5
done
