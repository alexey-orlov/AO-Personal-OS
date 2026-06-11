#!/usr/bin/env bash
# setup.sh — install the telegram-inbox Drop Zone watcher as a launchd agent.
# Per-machine, re-runnable. Run automations/telegram/setup_group.sh FIRST
# (the watcher needs TELEGRAM_GROUP_CHAT_ID in Keychain + topics.env).
#
# IMPORTANT: run on ONE machine only — Telegram allows a single getUpdates
# consumer per bot; two watchers would steal updates from each other.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"

command -v jq >/dev/null 2>&1 || { echo "[setup] jq not installed (brew install jq)" >&2; exit 1; }

if [ -z "${TELEGRAM_GROUP_CHAT_ID:-}" ] || [ -z "${TG_TOPIC_DROPZONE:-}" ]; then
  echo "[setup] group not configured — run automations/telegram/setup_group.sh first" >&2
  exit 1
fi

mkdir -p "$WORK_DIR" "$INBOX_DIR"
chmod +x "$HERE/watch.sh"

PLIST_SRC="$HERE/com.user.telegram-inbox.plist"
PLIST_DST="$HOME/Library/LaunchAgents/com.user.telegram-inbox.plist"
mkdir -p "$HOME/Library/LaunchAgents"
cp "$PLIST_SRC" "$PLIST_DST"

launchctl unload "$PLIST_DST" 2>/dev/null || true
launchctl load "$PLIST_DST"
echo "[setup] launchd agent loaded: com.user.telegram-inbox"
echo "[setup] logs: /tmp/telegram-inbox.out.log /tmp/telegram-inbox.err.log"
echo "[setup] smoke-test: send a message in the 📥 Drop Zone topic and watch inbox/"
