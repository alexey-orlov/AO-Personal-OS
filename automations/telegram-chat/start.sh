#!/bin/bash
# launchd-facing supervisor. Three jobs:
#   1. Ensure the "telegram-chat" tmux session exists and runs run.sh (tmux
#      gives claude the pty it needs; attach to watch: tmux attach -t telegram-chat).
#   2. TRANSPORT watchdog: ~/.claude/channels/telegram/bot.pid must point at a
#      LIVE process descending from this bridge's tmux pane (i.e. OUR claude's
#      plugin server is the active poller). Catches the poller-takeover /
#      crash / 409-exit deafness modes (2026-06-12 incident).
#   3. AGENT watchdog (added 2026-06-13): claude can sit FROZEN on an
#      interactive SYSTEM modal — usage-limit ("You've hit your session
#      limit"), trust-folder, the dev-channels confirmation, an error dialog.
#      While it's frozen the plugin server (a child proc) keeps polling +
#      reacting 👀, so the TRANSPORT check stays green and the 👀 falsely
#      reassures — but the agent answers nothing. Root cause of the 2026-06-13
#      recurrence: job #2 tested the transport, not whether the agent is
#      responsive. This job watches the pane for blocking modals, auto-handles
#      the known-safe ones, dismisses the rest, escalates to a respawn if one
#      won't clear, and DMs Alex so a stuck bridge is never silent.
#
#   NOTE: tool-permission prompts do NOT appear here — in channel mode they
#   relay to Telegram. So a local pane menu ("Enter to confirm" / "What do you
#   want to do?") is ALWAYS a system modal safe for the watchdog to act on; it
#   never collides with a normal "esc to interrupt" working state or the idle
#   input box (neither matches the modal strings below).
export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/local/bin:$PATH"

SESSION="telegram-chat"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$HOME/.claude/channels/telegram/bot.pid"
ENV_FILE="$HOME/.claude/channels/telegram/.env"
ACCESS_FILE="$HOME/.claude/channels/telegram/access.json"
NOTIFY_STATE="$DIR/.work/last_wedge_notify"
FAILS=0          # transport-failure cycles
MODAL_FAILS=0    # cycles a non-auto-confirmable modal has persisted
MAX_FAILS=9      # 9 × 10s ≈ 90s of transport bad-state before forced respawn —
                 # generous enough for claude + `bun install` cold starts.
MODAL_MAX=4      # 4 × 10s ≈ 40s: if a dismissed modal won't clear, respawn.

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

# Transport healthy = bot.pid alive AND descends from our tmux pane.
poller_healthy() {
  local bot_pid pane_pid
  bot_pid=$(cat "$PID_FILE" 2>/dev/null) && [ -n "$bot_pid" ] || return 1
  kill -0 "$bot_pid" 2>/dev/null || return 1
  pane_pid=$(tmux list-panes -t "$SESSION" -F '#{pane_pid}' 2>/dev/null | head -1)
  [ -n "$pane_pid" ] || return 1
  is_descendant "$bot_pid" "$pane_pid"
}

# DM Alex on the bridge bot itself (so the alert lands in the chat he's waiting
# on, not the forum group). Rate-limited to once / 30 min per wedge episode.
notify_wedge() {
  local msg="$1" now last tok cid
  now=$(date +%s)
  last=$(cat "$NOTIFY_STATE" 2>/dev/null || echo 0)
  [ $((now - last)) -lt 1800 ] && return
  tok=$(grep -m1 '^TELEGRAM_BOT_TOKEN=' "$ENV_FILE" 2>/dev/null | cut -d= -f2-)
  cid=$(python3 -c "import json;print(json.load(open('$ACCESS_FILE'))['allowFrom'][0])" 2>/dev/null)
  [ -n "$tok" ] && [ -n "$cid" ] || return
  curl -s -m 8 "https://api.telegram.org/bot$tok/sendMessage" \
    --data-urlencode "chat_id=$cid" --data-urlencode "text=$msg" >/dev/null 2>&1
  mkdir -p "$DIR/.work"; echo "$now" > "$NOTIFY_STATE"
}

# Classify the current pane. Echoes one of:
#   devchannels | trust | limit | modal | none
classify_pane() {
  local p; p=$(tmux capture-pane -t "$SESSION" -p 2>/dev/null)
  if echo "$p" | grep -q "I am using this for local development"; then echo devchannels; return; fi
  if echo "$p" | grep -qiE "trust this folder|Yes, I trust"; then echo trust; return; fi
  if echo "$p" | grep -qiE "session limit|Stop and wait for limit|Upgrade your plan"; then echo limit; return; fi
  # Generic blocking selection dialog (unknown). "Enter to confirm" is the
  # footer of CC's menu modals; idle ("? for shortcuts") and working
  # ("esc to interrupt") panes do NOT contain it.
  if echo "$p" | grep -qE "Enter to confirm|What do you want to do\?"; then echo modal; return; fi
  echo none
}

# Handle a non-healthy pane state. Returns 0 if it took care of things (reset
# transport counter), 1 if the caller should run the transport check.
handle_pane() {
  case "$(classify_pane)" in
    devchannels)
      echo "[telegram-chat] $(date '+%F %T') auto-confirming dev-channels prompt"
      tmux send-keys -t "$SESSION" Enter; MODAL_FAILS=0; return 0 ;;
    trust)
      # Repo dir is trusted already; accept (option 1) if it ever appears.
      echo "[telegram-chat] $(date '+%F %T') auto-accepting trust-folder prompt"
      tmux send-keys -t "$SESSION" Enter; MODAL_FAILS=0; return 0 ;;
    limit)
      MODAL_FAILS=$((MODAL_FAILS + 1))
      echo "[telegram-chat] $(date '+%F %T') usage-limit modal — dismissing (Esc), notifying Alex"
      tmux send-keys -t "$SESSION" Escape
      notify_wedge "⚠️ Bridge hit a Claude usage limit and was stuck on the limit dialog — I auto-cleared it. I can't answer while rate-limited; messages will go through once it resets. (👀 only means received, not answered.)"
      if [ "$MODAL_FAILS" -ge "$MODAL_MAX" ]; then
        echo "[telegram-chat] $(date '+%F %T') limit modal won't clear — respawning"
        tmux respawn-window -k -t "$SESSION"; MODAL_FAILS=0
      fi
      return 0 ;;
    modal)
      MODAL_FAILS=$((MODAL_FAILS + 1))
      echo "[telegram-chat] $(date '+%F %T') unknown blocking modal — dismissing (Esc) [$MODAL_FAILS/$MODAL_MAX]"
      tmux send-keys -t "$SESSION" Escape
      notify_wedge "⚠️ Bridge was stuck on a Claude system dialog — I auto-cleared it. If messages still get 👀 but no reply, send /new."
      if [ "$MODAL_FAILS" -ge "$MODAL_MAX" ]; then
        echo "[telegram-chat] $(date '+%F %T') modal won't clear — respawning"
        tmux respawn-window -k -t "$SESSION"; MODAL_FAILS=0
      fi
      return 0 ;;
    none)
      MODAL_FAILS=0; return 1 ;;
  esac
}

while true; do
  if ! tmux has-session -t "$SESSION" 2>/dev/null; then
    echo "[telegram-chat] $(date '+%F %T') (re)creating tmux session"
    tmux new-session -d -s "$SESSION" "exec '$DIR/run.sh'"
    FAILS=0; MODAL_FAILS=0
  elif handle_pane; then
    # A modal was present and handled (or auto-confirmed). Don't also count
    # this as a transport failure.
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
