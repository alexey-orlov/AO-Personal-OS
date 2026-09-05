#!/usr/bin/env bash
# setup.sh — one-time per machine. Builds the CRM venv (rapidfuzz) and checks
# that the shared Google Sheets credential is in place.
#
# Credentials are NOT set up here: they are the shared Google Sheets
# credential — automations/gsheets/setup.sh, one token for every sheet.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"

echo "[setup] checking tools..."
command -v python3 >/dev/null || { echo "  ! python3 missing. Run: xcode-select --install"; exit 1; }

echo "[setup] building venv + installing rapidfuzz (fuzzy-name matching)..."
mkdir -p "$CRM_WORK"
python3 -m venv "$CRM_WORK/venv"
"$CRM_WORK/venv/bin/pip" install --quiet --upgrade pip
"$CRM_WORK/venv/bin/pip" install --quiet rapidfuzz
echo "[setup] venv ready: $CRM_WORK/venv"

if [ -f "$GSHEETS_TOKEN" ]; then
  echo "[setup] Google Sheets credential found: $GSHEETS_TOKEN"
else
  echo "  ! No Google Sheets credential yet. Run automations/gsheets/setup.sh"
  echo "    (one credential for every sheet — see automations/gsheets/README.md),"
  echo "    then re-run this script."
fi

echo "[setup] done."
