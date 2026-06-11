#!/bin/bash
# launchd-facing supervisor: makes sure the "telegram-chat" tmux session
# exists and is running run.sh. tmux gives claude the pty it needs and lets
# Alex attach locally to watch the bridge (tmux attach -t telegram-chat).
export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/local/bin:$PATH"

SESSION="telegram-chat"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

while true; do
  if ! tmux has-session -t "$SESSION" 2>/dev/null; then
    echo "[telegram-chat] $(date '+%F %T') (re)creating tmux session"
    tmux new-session -d -s "$SESSION" "exec '$DIR/run.sh'"
  fi
  sleep 10
done
