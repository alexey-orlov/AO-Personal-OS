#!/usr/bin/env bash
# setup.sh — one-time per machine. Builds the CRM venv and checks creds.
#
# This sets up the SHARED CRM-spreadsheet integration. Any skill that wants
# to enrich a contact list from the sheet (re-engagement-outreach today,
# more later) reads from .work/sheets/ and uses the venv built here.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"

echo "[setup] checking tools..."
command -v python3 >/dev/null || { echo "  ! python3 missing. Run: xcode-select --install"; exit 1; }

echo "[setup] building venv + installing Google libs + rapidfuzz..."
mkdir -p "$CRM_WORK/sheets"
python3 -m venv "$CRM_WORK/venv"
"$CRM_WORK/venv/bin/pip" install --quiet --upgrade pip
"$CRM_WORK/venv/bin/pip" install --quiet \
  google-api-python-client google-auth google-auth-oauthlib rapidfuzz
echo "[setup] venv ready: $CRM_WORK/venv"

if [ -f "$SHEETS_CREDS" ]; then
  echo "[setup] Sheets OAuth client found: $SHEETS_CREDS"
else
  echo "  ! Sheets OAuth client NOT found. Required for CRM enrichment."
  echo "    1. https://console.cloud.google.com -> APIs & Services -> Library"
  echo "       -> enable 'Google Sheets API' (on the same OAuth client used by"
  echo "       call-pipeline for Calendar, if you want to reuse it — same"
  echo "       Desktop-app type works for both)."
  echo "    2. Save the OAuth client JSON as:"
  echo "         $SHEETS_CREDS"
  echo "    First CRM lookup will open a browser once to authorise the"
  echo "    spreadsheets.readonly scope; token caches at"
  echo "         $SHEETS_TOKEN"
  echo "    and auto-refreshes thereafter."
fi

echo "[setup] done."
