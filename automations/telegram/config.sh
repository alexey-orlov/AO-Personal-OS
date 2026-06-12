# config.sh — sourced by telegram_send.sh / telegram_send_with_button.sh.
#
# Telegram credentials live in macOS Keychain (set up via setup.sh +
# setup_group.sh). Empty values cause the send scripts to error out with a
# clear message pointing the user at setup. Env-var fallback exists so a
# caller can override (e.g. in CI or for ad-hoc testing) without touching
# Keychain.
#
# Two delivery targets:
#   TELEGRAM_CHAT_ID       — legacy 1:1 DM chat with the bot (fallback)
#   TELEGRAM_GROUP_CHAT_ID — the "AO Personal OS" forum group with topics
# When the group id is configured, ALL sends go to the group; TG_TOPIC
# selects the topic ("folder"). When it isn't (e.g. a machine where
# setup_group.sh hasn't run), sends fall back to the DM chat and TG_TOPIC
# is ignored — so callers can always set TG_TOPIC unconditionally.

export TELEGRAM_BOT_TOKEN="$(security find-generic-password -a "$USER" -s TELEGRAM_BOT_TOKEN -w 2>/dev/null || echo "${TELEGRAM_BOT_TOKEN:-}")"
export TELEGRAM_CHAT_ID="$(security find-generic-password -a "$USER" -s TELEGRAM_CHAT_ID -w 2>/dev/null || echo "${TELEGRAM_CHAT_ID:-}")"
export TELEGRAM_GROUP_CHAT_ID="$(security find-generic-password -a "$USER" -s TELEGRAM_GROUP_CHAT_ID -w 2>/dev/null || echo "${TELEGRAM_GROUP_CHAT_ID:-}")"

# Topic map (TG_TOPIC_<NAME>=<message_thread_id>), written by setup_group.sh.
# Thread ids are not secrets — the file is committed so every machine shares
# the same map; only the chat ids + token live in Keychain.
_tg_here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=/dev/null
[ -f "$_tg_here/topics.env" ] && source "$_tg_here/topics.env"

# tg_resolve_target — compute where a message should go.
# Reads:  TG_TOPIC (optional topic slug, e.g. "english-coaching", "books",
#         "inbox-drafts", "daily-digest", "dropzone", "general")
# Sets:   TG_TARGET_CHAT_ID   — chat to post to
#         TG_TARGET_THREAD_ID — message_thread_id, empty = General topic / DM
# Unknown or unset TG_TOPIC lands in the group's General topic (catch-all),
# never fails — notifications must degrade, not die.
tg_resolve_target() {
  TG_TARGET_CHAT_ID="$TELEGRAM_CHAT_ID"
  TG_TARGET_THREAD_ID=""
  [ -n "${TELEGRAM_GROUP_CHAT_ID:-}" ] || return 0
  TG_TARGET_CHAT_ID="$TELEGRAM_GROUP_CHAT_ID"
  if [ -n "${TG_TOPIC:-}" ] && [ "${TG_TOPIC}" != "general" ]; then
    # slug → env var: "english-coaching" → TG_TOPIC_ENGLISH_COACHING
    local key="TG_TOPIC_$(printf '%s' "$TG_TOPIC" | tr 'a-z-' 'A-Z_')"
    TG_TARGET_THREAD_ID="${!key:-}"
    [ -n "$TG_TARGET_THREAD_ID" ] || \
      echo "[telegram] unknown TG_TOPIC '$TG_TOPIC' — sending to General" >&2
  fi
}

# tg_queue_outbox — TG_OUTBOX=1 fallback used by the send scripts when no
# Telegram credentials are available (e.g. claude.ai cloud routine sandboxes,
# which have the repo but not the Keychain). Writes the message as a JSON card
# to context/_inbox/outbox/ — the calling run commits it; the n8n "Second-brain
# delivery" workflow sends it to the forum group and deletes the file.
# The thread id is resolved from topics.env directly (works without chat ids);
# the group chat id itself lives only in Keychain / n8n, never in the card.
#   $1 = message text · $2 = inline_keyboard rows JSON (default []) · $3 = parse_mode ("" = plain)
tg_queue_outbox() {
  command -v jq >/dev/null 2>&1 || { echo "[telegram] jq required to queue outbox" >&2; return 1; }
  local repo_root; repo_root="$(cd "$_tg_here/../.." && pwd)"
  local dir="$repo_root/context/_inbox/outbox"
  mkdir -p "$dir"
  local slug="${TG_TOPIC:-general}"
  local key="TG_TOPIC_$(printf '%s' "$slug" | tr 'a-z-' 'A-Z_')"
  local thread="${!key:-}"
  local f="$dir/$(date -u +%Y%m%dT%H%M%SZ)-$$-${slug}.json"
  jq -nc --arg topic "$slug" --arg thread "$thread" --arg text "$1" \
        --argjson kb "${2:-[]}" --arg pm "${3:-}" \
    '{topic:$topic, thread_id:$thread, text:$text, buttons:$kb, parse_mode:$pm, queued_at:(now|todate)}' \
    >"$f" || return 1
  echo "[telegram] queued to outbox: context/_inbox/outbox/${f##*/}" >&2
}
