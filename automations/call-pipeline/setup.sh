#!/usr/bin/env bash
# setup.sh — one-time per machine. Builds venv, installs SDK, checks tools.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"

echo "[setup] checking tools..."
command -v python3 >/dev/null || { echo "  ! python3 missing. Run: xcode-select --install"; exit 1; }
command -v git >/dev/null || echo "  ! git missing (needed for auto-sync). Run: xcode-select --install"
if [ -n "${CLAUDE_BIN:-}" ] && [ -x "$CLAUDE_BIN" ]; then
  echo "  - claude: $CLAUDE_BIN"
else
  echo "  ! WARNING: 'claude' not found. Install: curl -fsSL https://claude.ai/install.sh | bash"
fi

echo "[setup] building venv + installing assemblyai..."
mkdir -p "$WORK" "$INBOX" "$TRANSCRIPTS" "$STATE" "$OUT_DIR"
python3 -m venv "$WORK/venv"
"$WORK/venv/bin/pip" install --quiet --upgrade pip
"$WORK/venv/bin/pip" install --quiet assemblyai \
  google-api-python-client google-auth google-auth-oauthlib
echo "[setup] venv ready: $WORK/venv"

mkdir -p "$WORK/calendar"
if [ -f "$CALENDAR_CREDS" ]; then
  echo "[setup] calendar OAuth client found: $CALENDAR_CREDS"
else
  echo "  ! Calendar matching is OPTIONAL but recommended."
  echo "    1. https://console.cloud.google.com -> enable Calendar API."
  echo "    2. Create OAuth client (type: Desktop app)."
  echo "    3. Save the JSON as: $CALENDAR_CREDS"
  echo "    First processed call will open a browser once to authorise; token is cached."
fi

if security find-generic-password -a "$USER" -s ASSEMBLYAI_API_KEY -w >/dev/null 2>&1; then
  echo "[setup] AssemblyAI key found in Keychain."
else
  echo "  ! AssemblyAI key NOT in Keychain. Add it (note the -U to overwrite):"
  echo "      security add-generic-password -U -a \"\$USER\" -s ASSEMBLYAI_API_KEY -w 'YOUR_KEY'"
fi
echo "[setup] done."
