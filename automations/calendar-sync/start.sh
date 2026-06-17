#!/usr/bin/env bash
# start.sh — bring up / keep the always-on Claude session that runs the
# calendar-sync loop. Launched by com.user.calendar-sync via Terminal so it
# inherits the user TCC context (Chrome extension, claude.ai connectors, and
# read access to ~/Documents). Idempotent: a no-op if the session already exists.
set -euo pipefail
SESSION="calendar-sync"
REPO="$HOME/Documents/GitHub/AO-Personal-OS"
LOOP_CMD="/loop 1h /calendar-sync-loop"

# PATH-independent binary resolution (launchd has a minimal PATH).
TMUX_BIN="$(command -v tmux 2>/dev/null || true)"
if [ -z "$TMUX_BIN" ]; then
  for p in /opt/homebrew/bin/tmux /usr/local/bin/tmux; do [ -x "$p" ] && TMUX_BIN="$p" && break; done
fi
CLAUDE_BIN="$(command -v claude 2>/dev/null || true)"
if [ -z "$CLAUDE_BIN" ]; then
  for p in "$HOME/.local/bin/claude" /opt/homebrew/bin/claude /usr/local/bin/claude "$HOME/.npm-global/bin/claude"; do
    [ -x "$p" ] && CLAUDE_BIN="$p" && break
  done
fi
[ -n "$TMUX_BIN" ]   || { echo "[start] tmux not found";   exit 1; }
[ -n "$CLAUDE_BIN" ] || { echo "[start] claude not found"; exit 1; }

if "$TMUX_BIN" has-session -t "$SESSION" 2>/dev/null; then
  echo "[start] session '$SESSION' already running"; exit 0
fi

# caffeinate -i runs claude as its child and holds off idle sleep for its lifetime.
# --dangerously-skip-permissions: this is an UNATTENDED loop — it must never block on a
# permission prompt. The session only ever runs the bounded calendar-sync-loop skill on
# the user's own machine/data, so auto-approving its tool calls is the intended posture.
"$TMUX_BIN" new-session -d -s "$SESSION" -x 220 -y 50 "cd \"$REPO\" && exec caffeinate -i \"$CLAUDE_BIN\" --dangerously-skip-permissions"
sleep 6                                   # let the session reach its prompt
"$TMUX_BIN" send-keys -t "$SESSION" "$LOOP_CMD" Enter
echo "[start] launched '$SESSION' with: $LOOP_CMD"
