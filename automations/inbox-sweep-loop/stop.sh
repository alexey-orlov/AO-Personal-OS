#!/usr/bin/env bash
# stop.sh — terminate ALL inbox-sweep sessions (tmux or screen), ending the
# recurring routine. Robust against the case where multiple stale screen
# sessions accumulated (each `screen -dmS inbox-sweep` creates a new one if
# you don't first verify none exists; older runs with broken detection left
# duplicates behind).

set -euo pipefail

SESSION="inbox-sweep"
stopped=0

# Probe known install locations for tmux/screen.
TMUX_BIN="$(command -v tmux 2>/dev/null || true)"
if [ -z "$TMUX_BIN" ]; then
  for p in /opt/homebrew/bin/tmux /usr/local/bin/tmux; do
    [ -x "$p" ] && TMUX_BIN="$p" && break
  done
fi
SCREEN_BIN="$(command -v screen 2>/dev/null || true)"
if [ -z "$SCREEN_BIN" ] && [ -x /usr/bin/screen ]; then
  SCREEN_BIN="/usr/bin/screen"
fi

if [ -n "$TMUX_BIN" ] && "$TMUX_BIN" has-session -t "$SESSION" 2>/dev/null; then
  "$TMUX_BIN" kill-session -t "$SESSION"
  echo "[stop] killed tmux session '$SESSION'."
  stopped=1
fi

if [ -n "$SCREEN_BIN" ]; then
  # Kill EVERY screen session matching the name (handles duplicates from
  # earlier broken start.sh runs).
  pids="$("$SCREEN_BIN" -ls 2>/dev/null | awk -v name="$SESSION" '$0 ~ "\\."name"\\b" {sub(/\..*/, "", $1); print $1}')"
  if [ -n "$pids" ]; then
    while IFS= read -r pid; do
      [ -n "$pid" ] || continue
      "$SCREEN_BIN" -S "$pid.$SESSION" -X quit 2>/dev/null || true
      echo "[stop] killed screen session $pid.$SESSION."
      stopped=1
    done <<<"$pids"
    # Reap any zombies.
    "$SCREEN_BIN" -wipe >/dev/null 2>&1 || true
  fi
fi

if [ "$stopped" -eq 0 ]; then
  echo "[stop] no '$SESSION' session running (tmux or screen). Nothing to do."
fi

echo "[stop] no more 🫀 heartbeats will arrive in Telegram until you restart."
