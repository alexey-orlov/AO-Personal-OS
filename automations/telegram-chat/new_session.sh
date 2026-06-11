#!/bin/bash
# Start a fresh bridge session ("/new" from Telegram). Kills whatever runs in
# the telegram-chat tmux window (the current claude session included) and
# respawns run.sh, which starts a clean session within seconds.
#
# Called by Claude itself per the CLAUDE.md rule — Claude must send its
# channel reply BEFORE running this, because the script kills that very
# session (this command never "returns" from Claude's point of view).
# Safe to run manually too.
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

SESSION="telegram-chat"

if tmux has-session -t "$SESSION" 2>/dev/null; then
  exec tmux respawn-window -k -t "$SESSION"
fi
# No tmux session — nothing to kill; the launchd supervisor (start.sh)
# recreates it within ~10s.
exit 0
