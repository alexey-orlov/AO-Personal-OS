#!/usr/bin/env bash
# setup.sh — idempotent one-time setup for the SoftServe monthly report.
#   * creates .work/ + a venv with openpyxl
#   * installs and loads the launchd agent (08:00 on the 1st of each month)
#
# Usage:
#   ./setup.sh              # install / refresh
#   ./setup.sh --uninstall  # unload and remove the agent (leaves .work alone)
set -euo pipefail
cd "$(dirname "$0")"
# shellcheck source=config.sh
source ./config.sh

LABEL="com.user.ss-monthly-report"
PLIST_DEST="$HOME/Library/LaunchAgents/$LABEL.plist"

if [ "${1:-}" = "--uninstall" ]; then
  launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || launchctl unload "$PLIST_DEST" 2>/dev/null || true
  rm -f "$PLIST_DEST"
  echo "Uninstalled $LABEL."
  exit 0
fi

echo "1/3  .work + venv"
mkdir -p "$WORK"
[ -x "$PY" ] || python3 -m venv "$VENV"
"$VENV/bin/pip" install -q --upgrade pip >/dev/null 2>&1 || true
"$VENV/bin/pip" install -q openpyxl
"$PY" -c 'import openpyxl; print("     openpyxl", openpyxl.__version__)'

command -v pdftotext >/dev/null 2>&1 \
  || echo "     WARNING: pdftotext missing (brew install poppler) — the PDF fallback will not work"
[ -x /Applications/LibreOffice.app/Contents/MacOS/soffice ] || command -v soffice >/dev/null 2>&1 \
  || echo "     WARNING: LibreOffice missing — report_verify.py cannot recalculate, so builds stay uncertified"

if [ -n "${CLOCKIFY_API_KEY:-}" ]; then
  echo "     Clockify API key: present (fully unattended runs enabled)"
else
  cat <<'EOS'
     Clockify API key: ABSENT — runs will ask you for an exported PDF instead.
     To make it unattended, create a key at Clockify → Profile settings → API, then:
       security add-generic-password -U -a "$USER" -s CLOCKIFY_API_KEY -w <key>
EOS
fi

echo "2/3  launchd agent"
mkdir -p "$HOME/Library/LaunchAgents"
sed "s|__REPO__|$REPO_ROOT|g" "$LABEL.plist" > "$PLIST_DEST"
launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || launchctl unload "$PLIST_DEST" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST_DEST" 2>/dev/null || launchctl load "$PLIST_DEST"

echo "3/3  verify"
if launchctl list | grep -q "$LABEL"; then
  echo "     $LABEL loaded — next run 08:00 on the 1st (builds the month that just ended)."
else
  echo "     WARNING: $LABEL not listed by launchctl; check $PLIST_DEST" >&2
fi
echo
echo "Dry-run a month now:  ./run.sh 2026-07"
