#!/bin/bash
# telegram-chat bridge loop: runs Claude Code with the official Telegram
# channel plugin in this repo. Each loop iteration is a BRAND-NEW session —
# exiting/killing the claude process (e.g. via new_session.sh on a "/new"
# message) restarts clean. Runs inside the "telegram-chat" tmux session
# (created by start.sh); attach with: tmux attach -t telegram-chat
export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/local/bin:$PATH"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PLUGIN="plugin:telegram@claude-plugins-official"

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
