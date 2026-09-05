#!/usr/bin/env bash
# setup.sh — one-time per Mac for the shared Google Sheets credential.
#
# 1. builds .work/venv with google-auth-oauthlib — only `auth` needs it;
#    every other call is stdlib urllib
# 2. migrates the pre-2026-09 per-skill files (crm-spreadsheet's OAuth
#    client, gym-log's read-write token) into the shared .work/ — copies, so
#    the old paths keep working until they are deleted
# 3. runs the consent flow only if there is still no token, then `check`
# 4. prints the two off-Mac steps (cloud environment variable, repo secret)
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"

CANON_CREDS="$GSHEETS_WORK/credentials.json"
CANON_TOKEN="$GSHEETS_WORK/token.json"
OLD_CREDS="$REPO_ROOT/automations/crm-spreadsheet/.work/sheets/credentials.json"
OLD_TOKEN="$REPO_ROOT/automations/gym-log/.work/sheets/token.json"

command -v python3 >/dev/null || { echo "  ! python3 missing. Run: xcode-select --install"; exit 1; }
mkdir -p "$GSHEETS_WORK"

echo "[setup] venv + google-auth-oauthlib (for the one-time consent flow)..."
python3 -m venv "$GSHEETS_WORK/venv"
"$GSHEETS_WORK/venv/bin/pip" install --quiet --upgrade pip
"$GSHEETS_WORK/venv/bin/pip" install --quiet google-auth-oauthlib
export PYTHON_BIN="$GSHEETS_WORK/venv/bin/python3"

if [ ! -f "$CANON_CREDS" ] && [ -f "$OLD_CREDS" ]; then
  cp "$OLD_CREDS" "$CANON_CREDS"
  echo "[setup] OAuth client copied from crm-spreadsheet/.work/sheets/"
fi
if [ ! -f "$CANON_TOKEN" ] && [ -f "$OLD_TOKEN" ]; then
  cp "$OLD_TOKEN" "$CANON_TOKEN"
  echo "[setup] read-write token copied from gym-log/.work/sheets/"
fi
chmod 600 "$CANON_CREDS" "$CANON_TOKEN" 2>/dev/null || true
export SHEETS_CREDS="$CANON_CREDS" GSHEETS_TOKEN="$CANON_TOKEN"

if [ ! -f "$CANON_CREDS" ]; then
  cat <<EOF
  ! No OAuth client at $CANON_CREDS
    Google Cloud console → APIs & Services → Credentials → the Desktop-app
    OAuth client (with the Google Sheets API enabled on the project) →
    Download JSON → save it at that path. Details: automations/gsheets/README.md
    → "OAuth client". Then re-run this script.
EOF
  exit 1
fi

if [ ! -f "$CANON_TOKEN" ]; then
  echo "[setup] no token yet — starting the browser consent (once)..."
  "$PYTHON_BIN" "$GSHEETS" auth
fi

echo "[setup] checking the credential..."
"$PYTHON_BIN" "$GSHEETS" check

cat <<EOF

[setup] Mac done. Now copy the same token to the two places that run off the
Mac (skip the ones already done; repeat all of it after every re-\`auth\`):

  base64 < $CANON_TOKEN | tr -d '\n' | pbcopy

  1. claude.ai/code → the cloud icon showing the environment name (row above
     the message box) → hover the environment → gear → Environment variables
     → add one line   GSHEETS_TOKEN_JSON=<paste>   → Save changes.
     Only sessions started afterwards see it.
  2. GitHub → repo Settings → Secrets and variables → Actions →
     New repository secret → name GSHEETS_TOKEN_JSON, value <paste>.

Full doc: automations/gsheets/README.md
EOF
