#!/usr/bin/env bash
# watch.sh — long-poll the bot for messages in the "📥 Drop Zone" topic of the
# AO Personal OS forum group and save them into inbox/ for /context-update.
#
#   - Text messages  → inbox/tg-<stamp>-<msgid>.md (with a small provenance header)
#   - Documents      → inbox/tg-<stamp>-<msgid>-<original filename>
#   - Photos         → inbox/tg-<stamp>-<msgid>-photo.jpg
#   - Voice/audio    → inbox/tg-<stamp>-<msgid>-voice.oga (context-update won't
#                      transcribe these yet; saved so nothing is lost)
#   Captions on media are saved as a sidecar .md next to the file.
#
# After saving, the bot reacts 👍 to the message so Alex sees it was captured.
#
# Single consumer rule: Telegram allows ONE getUpdates consumer per bot.
# Run this watcher on ONE machine only (same machine as the call-pipeline).
#
# State: .work/offset holds the last processed update_id (per machine).
# Designed to run under launchd with KeepAlive — exits are respawned.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"

log() { printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }

if [ -z "${TELEGRAM_BOT_TOKEN:-}" ] || [ -z "${TELEGRAM_GROUP_CHAT_ID:-}" ] || [ -z "${TG_TOPIC_DROPZONE:-}" ]; then
  log "not configured (need bot token, group id, topics.env) — run automations/telegram/setup_group.sh"
  sleep 300   # don't hot-loop under launchd KeepAlive
  exit 1
fi

API="https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}"
FILE_API="https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}"
mkdir -p "$WORK_DIR" "$INBOX_DIR"
OFFSET_FILE="$WORK_DIR/offset"
offset="$(cat "$OFFSET_FILE" 2>/dev/null || echo 0)"

log "watching Drop Zone (chat $TELEGRAM_GROUP_CHAT_ID, thread $TG_TOPIC_DROPZONE), offset $offset"

react_ok() {  # react_ok <message_id> — best-effort 👍 confirmation
  curl -fsS --max-time 15 -X POST "$API/setMessageReaction" \
    -H "Content-Type: application/json" \
    -d "{\"chat_id\": ${TELEGRAM_GROUP_CHAT_ID}, \"message_id\": $1, \"reaction\": [{\"type\": \"emoji\", \"emoji\": \"👍\"}]}" \
    >/dev/null 2>&1 || true
}

download_file() {  # download_file <file_id> <dest_path>
  local fpath
  fpath="$(curl -fsS --max-time 30 "$API/getFile?file_id=$1" | jq -r '.result.file_path // empty')"
  [ -n "$fpath" ] || return 1
  curl -fsS --max-time 300 -o "$2" "$FILE_API/$fpath"
}

while :; do
  resp="$(curl -fsS --max-time $((POLL_TIMEOUT + 10)) \
    "$API/getUpdates?timeout=${POLL_TIMEOUT}&offset=$((offset))&allowed_updates=%5B%22message%22%5D" 2>/dev/null)" || {
    log "getUpdates failed (network?) — retrying in 30s"
    sleep 30
    continue
  }
  jq -e '.ok == true' >/dev/null 2>&1 <<<"$resp" || {
    log "getUpdates API error: $(head -c 300 <<<"$resp") — retrying in 60s"
    sleep 60
    continue
  }

  count="$(jq '.result | length' <<<"$resp")"
  [ "$count" -gt 0 ] || continue

  while IFS= read -r upd; do
    uid="$(jq -r '.update_id' <<<"$upd")"
    offset=$((uid + 1))

    # Only human messages in the Drop Zone topic of OUR group.
    keep="$(jq -r --argjson chat "$TELEGRAM_GROUP_CHAT_ID" --argjson thread "$TG_TOPIC_DROPZONE" '
      .message != null
      and (.message.chat.id == $chat)
      and ((.message.message_thread_id // 0) == $thread)
      and ((.message.from.is_bot // false) | not)' <<<"$upd")"
    [ "$keep" = "true" ] || continue

    msg="$(jq -c '.message' <<<"$upd")"
    msgid="$(jq -r '.message_id' <<<"$msg")"
    # Message date (sender's send time), not processing time — stable across replays.
    stamp="$(date -r "$(jq -r '.date' <<<"$msg")" '+%Y%m%d-%H%M%S')"
    base="tg-${stamp}-${msgid}"
    saved=""

    text="$(jq -r '.text // empty' <<<"$msg")"
    caption="$(jq -r '.caption // empty' <<<"$msg")"

    # --- documents (files) ---
    doc_id="$(jq -r '.document.file_id // empty' <<<"$msg")"
    if [ -n "$doc_id" ]; then
      fname="$(jq -r '.document.file_name // "file.bin"' <<<"$msg" | tr '/' '_')"
      dest="$INBOX_DIR/${base}-${fname}"
      if download_file "$doc_id" "$dest"; then saved="$dest"; else log "FAILED download doc msg $msgid"; fi
    fi

    # --- photos (largest rendition) ---
    photo_id="$(jq -r '(.photo // []) | last | .file_id // empty' <<<"$msg")"
    if [ -n "$photo_id" ]; then
      dest="$INBOX_DIR/${base}-photo.jpg"
      if download_file "$photo_id" "$dest"; then saved="$dest"; else log "FAILED download photo msg $msgid"; fi
    fi

    # --- voice / audio ---
    voice_id="$(jq -r '.voice.file_id // .audio.file_id // empty' <<<"$msg")"
    if [ -n "$voice_id" ]; then
      dest="$INBOX_DIR/${base}-voice.oga"
      if download_file "$voice_id" "$dest"; then saved="$dest"; else log "FAILED download voice msg $msgid"; fi
    fi

    # --- text body / caption sidecar ---
    note=""
    [ -n "$text" ] && note="$text"
    [ -n "$caption" ] && note="$caption"
    if [ -n "$note" ] || [ -z "$saved" ]; then
      # Plain text message, or caption accompanying a media file. A message
      # that is neither (e.g. a sticker) still gets an empty stub skipped.
      if [ -n "$note" ]; then
        md="$INBOX_DIR/${base}.md"
        {
          printf -- '---\nsource: telegram-dropzone\ndate: %s\nmessage_id: %s\n' \
            "$(date -r "$(jq -r '.date' <<<"$msg")" '+%Y-%m-%d %H:%M')" "$msgid"
          [ -n "$saved" ] && printf 'attachment: %s\n' "$(basename "$saved")"
          printf -- '---\n\n%s\n' "$note"
        } >"$md"
        saved="${saved:-$md}"
      fi
    fi

    if [ -n "$saved" ]; then
      log "saved msg $msgid → $(basename "$saved")"
      react_ok "$msgid"
    else
      log "msg $msgid had no savable content (sticker/service msg?) — skipped"
    fi
  done < <(jq -c '.result[]' <<<"$resp")

  printf '%s' "$offset" >"$OFFSET_FILE"
done
