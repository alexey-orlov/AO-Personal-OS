#!/usr/bin/env bash
# stop.sh — terminate the inbox-sweep tmux session, ending the recurring routine.

set -euo pipefail

SESSION="inbox-sweep"

if ! command -v tmux >/dev/null 2>&1; then
  echo "[stop] tmux not installed; nothing to stop."
  exit 0
fi

if tmux has-session -t "$SESSION" 2>/dev/null; then
  tmux kill-session -t "$SESSION"
  echo "[stop] killed tmux session '$SESSION'."
  echo "[stop] no more 🫀 heartbeats will arrive in Telegram until you restart."
else
  echo "[stop] no tmux session '$SESSION' running. Nothing to do."
fi
