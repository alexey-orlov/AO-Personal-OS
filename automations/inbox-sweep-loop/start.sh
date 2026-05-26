#!/usr/bin/env bash
# start.sh — launch the inbox-sweep recurring routine in a detached session.
#
# Idempotent: if a session named 'inbox-sweep' already exists, the script just
# reports its status and exits without creating a duplicate.
#
# Uses tmux if available, otherwise falls back to `screen` (which ships with
# macOS by default, no install needed). Either gives us a persistent virtual
# TTY so Claude Code can keep running after we detach.
#
# What this does:
#   1. Creates (or attaches to) a session called 'inbox-sweep'
#   2. Runs `caffeinate -i` in that session so the laptop doesn't deep-sleep
#      and suspend Claude Code
#   3. Starts Claude Code interactively
#   4. Sends the `/loop 8h /inbox-sweep-loop` command to Claude Code
#
# After this the session keeps running in the background. You should see a
# 🫀 heartbeat in Telegram within a minute, then every 8 hours.

set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$HERE/../.." && pwd)"

SESSION="inbox-sweep"
LOOP_CMD="/loop 8h /inbox-sweep-loop"

# Pick a terminal multiplexer. Prefer tmux, fall back to screen.
# Probe known install locations in case the user's PATH doesn't include
# Homebrew's bin directory (a common state right after `brew install` if
# `eval "$(/opt/homebrew/bin/brew shellenv)"` hasn't been added to ~/.zshrc).
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

if [ -n "$TMUX_BIN" ]; then
  MUX="tmux"
elif [ -n "$SCREEN_BIN" ]; then
  MUX="screen"
else
  cat >&2 <<EOF
[start] Neither tmux nor screen is installed. You need one of them to keep
        Claude Code running after this script exits.

Options:
  1. Install Homebrew (one-time, recommended) and then tmux:
     /bin/bash -c "\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     brew install tmux

  2. On macOS, /usr/bin/screen normally ships with the OS. If it's missing,
     reinstall Command Line Tools:
     xcode-select --install

EOF
  exit 1
fi

# Locate the claude binary (PATH-free, so this works from LaunchAgent too).
CLAUDE_BIN="$(command -v claude 2>/dev/null || true)"
if [ -z "$CLAUDE_BIN" ]; then
  for p in "$HOME/.local/bin/claude" /opt/homebrew/bin/claude /usr/local/bin/claude "$HOME/.npm-global/bin/claude"; do
    [ -x "$p" ] && CLAUDE_BIN="$p" && break
  done
fi
[ -n "$CLAUDE_BIN" ] || { echo "[start] claude binary not found on PATH or in fallback locations." >&2; exit 1; }

# Already running? Bail out cleanly.
if [ "$MUX" = "tmux" ]; then
  if "$TMUX_BIN" has-session -t "$SESSION" 2>/dev/null; then
    echo "[start] tmux session '$SESSION' is already running."
    echo "[start] attach with:  tmux attach -t $SESSION"
    echo "[start] stop with:    $HERE/stop.sh"
    exit 0
  fi
else
  if "$SCREEN_BIN" -ls 2>/dev/null | grep -q "\.${SESSION}"; then
    echo "[start] screen session '$SESSION' is already running."
    echo "[start] attach with:  screen -r $SESSION"
    echo "[start] stop with:    $HERE/stop.sh"
    exit 0
  fi
fi

# Launch the multiplexer session and send the boot sequence.
if [ "$MUX" = "tmux" ]; then
  "$TMUX_BIN" new-session -d -s "$SESSION" -c "$REPO_ROOT"
  if command -v caffeinate >/dev/null 2>&1; then
    "$TMUX_BIN" send-keys -t "$SESSION" "caffeinate -i &" C-m
  fi
  "$TMUX_BIN" send-keys -t "$SESSION" "$CLAUDE_BIN" C-m
  sleep 6
  "$TMUX_BIN" send-keys -t "$SESSION" "$LOOP_CMD" C-m
  # /loop renders an interactive prompt: "Cloud schedule" vs "This session only".
  # Cloud schedule runs in Anthropic's cloud, which has NO access to the local
  # Chrome MCP, so the LIN leg of inbox-sweep would always fail there. We pick
  # option 2 (This session only) by sending Down + Enter. If Claude Code ever
  # changes this prompt or adds more options, this is the line to revisit.
  sleep 5
  "$TMUX_BIN" send-keys -t "$SESSION" Down Enter
  echo "[start] tmux session '$SESSION' launched (tmux: $TMUX_BIN)."
  echo "[start] sent: $LOOP_CMD  → auto-selected 'This session only'."
  echo "[start] attach with:  $TMUX_BIN attach -t $SESSION  (detach: Ctrl-B then D)"
  echo "[start] dump current screen state without attaching:"
  echo "[start]    $TMUX_BIN capture-pane -t $SESSION -p | tail -30"
else
  ( cd "$REPO_ROOT" && "$SCREEN_BIN" -dmS "$SESSION" )
  if command -v caffeinate >/dev/null 2>&1; then
    "$SCREEN_BIN" -S "$SESSION" -X stuff "caffeinate -i &"$'\r'
  fi
  "$SCREEN_BIN" -S "$SESSION" -X stuff "$CLAUDE_BIN"$'\r'
  sleep 6
  "$SCREEN_BIN" -S "$SESSION" -X stuff "$LOOP_CMD"$'\r'
  # Same Cloud/local prompt; in screen, Down arrow is the escape sequence
  # ESC [ B and Enter is \r.
  sleep 5
  "$SCREEN_BIN" -S "$SESSION" -X stuff $'\e[B\r'
  echo "[start] screen session '$SESSION' launched (screen: $SCREEN_BIN)."
  echo "[start] sent: $LOOP_CMD  → auto-selected 'This session only'."
  echo "[start] attach with:  $SCREEN_BIN -r $SESSION  (detach: Ctrl-A then D)"
fi

echo "[start] command sent to Claude Code: $LOOP_CMD"
echo "[start] stop the session:  $HERE/stop.sh"
echo "[start] expect a 🫀 heartbeat in Telegram within ~1 minute."
