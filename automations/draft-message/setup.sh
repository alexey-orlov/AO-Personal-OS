#!/usr/bin/env bash
# setup.sh — one-time per machine. draft-message reuses re-engagement-outreach's
# Sheet auth + Python venv, so there's nothing to install here beyond a sanity
# check that the upstream pieces exist.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"

echo "[setup] draft-message — sanity check"
mkdir -p "$WORK"

if [ -f "$STATE_FILE" ]; then
  echo "[setup] state file exists: $STATE_FILE"
else
  echo '{"drafts": []}' > "$STATE_FILE"
  echo "[setup] initialised empty state: $STATE_FILE"
fi

if [ -x "$PYTHON_BIN" ]; then
  echo "[setup] Python ready: $PYTHON_BIN"
else
  echo "  ! Python venv not found. Run automations/re-engagement-outreach/setup.sh first."
fi

if [ -f "$SHEETS_CREDS" ]; then
  echo "[setup] Sheets OAuth client found: $SHEETS_CREDS"
else
  echo "  ! Sheets OAuth client NOT found at $SHEETS_CREDS."
  echo "    draft-message can still run — Sheet enrichment is a fallback, not required."
  echo "    To enable: run automations/re-engagement-outreach/setup.sh and follow its instructions."
fi

if [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELEGRAM_CHAT_ID:-}" ]; then
  echo "[setup] Telegram creds found in Keychain."
else
  echo "  ! Telegram creds NOT in Keychain. Run automations/telegram/setup.sh."
  echo "    Required: LIN drafts are delivered via Telegram with a deep-link button."
fi

echo "[setup] done."
