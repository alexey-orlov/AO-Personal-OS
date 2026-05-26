#!/usr/bin/env bash
# start.sh — launch the inbox-sweep recurring routine in a detached tmux session.
#
# Idempotent: if a tmux session named 'inbox-sweep' already exists, the script
# just reports its status and exits without creating a duplicate.
#
# What this does:
#   1. Creates (or attaches to) a tmux session called 'inbox-sweep'
#   2. Runs `caffeinate -i` in that session so the laptop doesn't deep-sleep
#      and suspend Claude Code
#   3. Starts Claude Code interactively
#   4. Sends the `/loop 8h /inbox-sweep-loop` command to Claude Code
#
# After this, the tmux session keeps running in the background. Detach with
# Ctrl-B then D; reattach with `tmux attach -t inbox-sweep`.
#
# You should see a 🫀 heartbeat in Telegram within a minute. After that, one
# heartbeat (+ digest if drafts produced) every 8 hours.

set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$HERE/../.." && pwd)"

SESSION="inbox-sweep"
LOOP_CMD="/loop 8h /inbox-sweep-loop"

# If the session is already running, bail out cleanly.
if command -v tmux >/dev/null 2>&1 && tmux has-session -t "$SESSION" 2>/dev/null; then
  echo "[start] tmux session '$SESSION' is already running."
  echo "[start] attach with:  tmux attach -t $SESSION"
  echo "[start] stop with:    $HERE/stop.sh  (or tmux kill-session -t $SESSION)"
  echo "[start] verify the loop on phone: next 🫀 heartbeat in Telegram should arrive within 8h."
  exit 0
fi

# Dependency checks.
command -v tmux >/dev/null 2>&1 || {
  echo "[start] tmux not installed. Install with: brew install tmux" >&2
  exit 1
}
command -v caffeinate >/dev/null 2>&1 || {
  echo "[start] caffeinate not found (this is a macOS-only utility). The loop will still run,"
  echo "[start] but the laptop may deep-sleep and suspend Claude Code. Continuing anyway."
}

CLAUDE_BIN="$(command -v claude 2>/dev/null || true)"
if [ -z "$CLAUDE_BIN" ]; then
  for p in "$HOME/.local/bin/claude" /opt/homebrew/bin/claude /usr/local/bin/claude "$HOME/.npm-global/bin/claude"; do
    [ -x "$p" ] && CLAUDE_BIN="$p" && break
  done
fi
if [ -z "$CLAUDE_BIN" ]; then
  echo "[start] claude binary not found on PATH or in fallback locations." >&2
  exit 1
fi

# Create the tmux session (detached) in the repo root so /inbox-sweep finds its files.
tmux new-session -d -s "$SESSION" -c "$REPO_ROOT"

# Inside the session: caffeinate to prevent sleep suspension, then start Claude Code.
# Caffeinate runs in the foreground of the first pane; we open a second pane for Claude.
# Actually simpler: caffeinate in background of the same pane, then Claude in foreground.
if command -v caffeinate >/dev/null 2>&1; then
  tmux send-keys -t "$SESSION" "caffeinate -i &" C-m
fi

# Start Claude Code interactively.
tmux send-keys -t "$SESSION" "$CLAUDE_BIN" C-m

# Wait for Claude to be ready before sending the slash command.
# 4 seconds is usually enough; if Claude prompts for first-run setup the user
# will need to handle that manually (attach with: tmux attach -t inbox-sweep).
sleep 4

# Send the /loop command.
tmux send-keys -t "$SESSION" "$LOOP_CMD" C-m

echo "[start] launched tmux session '$SESSION'."
echo "[start] command sent to Claude Code: $LOOP_CMD"
echo "[start] watch the session:    tmux attach -t $SESSION  (detach: Ctrl-B then D)"
echo "[start] stop the session:     $HERE/stop.sh"
echo "[start] expect a 🫀 heartbeat in Telegram within ~1 minute."
