#!/bin/bash
# launchd-facing supervisor, two jobs:
#   1. Ensure the "telegram-chat" tmux session exists and runs run.sh (tmux
#      gives claude the pty it needs and lets Alex attach to watch:
#      tmux attach -t telegram-chat).
#   2. Watchdog the Telegram poller: ~/.claude/channels/telegram/bot.pid must
#      point at a LIVE process that is a DESCENDANT of this bridge's tmux
#      pane. Catches every known deafness mode: plugin server killed by a
#      poller takeover (2026-06-12 incident), server crash, 409-exit after
#      repeated conflicts, claude wedged at startup. On sustained failure the
#      bridge window is respawned — run.sh then starts a fresh session whose
#      server reclaims the slot (killing any foreign holder).
export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/local/bin:$PATH"

SESSION="telegram-chat"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$HOME/.claude/channels/telegram/bot.pid"
FAILS=0
MAX_FAILS=9   # 9 × 10s ≈ 90s of bad state before forced respawn — generous
              # enough for claude + `bun install` cold starts after a respawn.

# Does $1's ancestry (via ppid) reach $2?
is_descendant() {
  local pid="$1" root="$2" i=0
  while [ -n "$pid" ] && [ "$pid" -gt 1 ] 2>/dev/null && [ "$i" -lt 20 ]; do
    [ "$pid" = "$root" ] && return 0
    pid=$(ps -o ppid= -p "$pid" 2>/dev/null | tr -d ' ')
    i=$((i + 1))
  done
  return 1
}

# Healthy = bot.pid exists, its process is alive, and it descends from our
# tmux pane (i.e. OUR claude's plugin server is the active poller).
poller_healthy() {
  local bot_pid pane_pid
  bot_pid=$(cat "$PID_FILE" 2>/dev/null) && [ -n "$bot_pid" ] || return 1
  kill -0 "$bot_pid" 2>/dev/null || return 1
  pane_pid=$(tmux list-panes -t "$SESSION" -F '#{pane_pid}' 2>/dev/null | head -1)
  [ -n "$pane_pid" ] || return 1
  is_descendant "$bot_pid" "$pane_pid"
}

while true; do
  if ! tmux has-session -t "$SESSION" 2>/dev/null; then
    echo "[telegram-chat] $(date '+%F %T') (re)creating tmux session"
    tmux new-session -d -s "$SESSION" "exec '$DIR/run.sh'"
    FAILS=0
  elif poller_healthy; then
    FAILS=0
  else
    FAILS=$((FAILS + 1))
    if [ "$FAILS" -ge "$MAX_FAILS" ]; then
      echo "[telegram-chat] $(date '+%F %T') watchdog: poller dead or foreign for ~$((FAILS * 10))s — respawning bridge"
      tmux respawn-window -k -t "$SESSION"
      FAILS=0
    fi
  fi
  sleep 10
done
