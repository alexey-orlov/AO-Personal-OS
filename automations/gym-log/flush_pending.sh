#!/usr/bin/env bash
# flush_pending.sh — apply staged gym-log sessions to the "My training" sheet.
#
# Why this exists: the sheet write needs the OAuth token in .work/ (git-ignored,
# Mac-only), so a cloud/web session can read the photo and parse it but CANNOT
# write. Those sessions stage the parsed payload as pending/<YYYY-MM-DD>.json
# and this script applies it on the Mac.
#
# Per repo hard rule, a delivery leg must make its own failure visible: a failed
# write leaves the payload in place, alerts Telegram, and exits non-zero.
#
# Usage: automations/gym-log/flush_pending.sh [file.json ...]
# With no args, flushes every pending/*.json in date order.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"

PENDING_DIR="$HERE/pending"
alert() {
  printf '🏋️ gym-log flush FAILED\n%s\n' "$1" \
    | TG_TOPIC=trainings "$REPO_ROOT/automations/telegram/telegram_send.sh" || true
}

if [ "$#" -gt 0 ]; then
  files=("$@")
else
  shopt -s nullglob
  files=("$PENDING_DIR"/*.json)
  shopt -u nullglob
fi

if [ "${#files[@]}" -eq 0 ]; then
  echo "[gym-log] nothing pending"
  exit 0
fi

rc=0
for f in "${files[@]}"; do
  date_str="$("$PYTHON_BIN" -c 'import json,sys;print(json.load(open(sys.argv[1]))["date"])' "$f")"
  echo "[gym-log] applying $(basename "$f") -> $date_str"

  if ! out="$("$PYTHON_BIN" "$GYM_SHEET" log < "$f" 2>&1)"; then
    echo "$out" >&2
    case "$out" in
      *"exit 3"*|*invalid_grant*) hint="token expired - run: $PYTHON_BIN $GYM_SHEET auth" ;;
      *)                          hint="$out" ;;
    esac
    alert "$(basename "$f") ($date_str) not written: $hint"
    rc=1
    continue          # leave the payload staged so the work is not dropped
  fi
  echo "$out"

  # Deltas for the digest, straight from the sheet - never hand-computed.
  "$PYTHON_BIN" "$GYM_SHEET" progress "$date_str" \
    > "$PENDING_DIR/$(basename "${f%.json}").progress.json" || true
  echo "[gym-log] progress -> $PENDING_DIR/$(basename "${f%.json}").progress.json"

  rm -f "$f"
done

if [ "$rc" -ne 0 ]; then
  echo "[gym-log] some sessions were NOT written - payloads left in $PENDING_DIR" >&2
  exit "$rc"
fi

echo "[gym-log] done. Send the 🏋️ digest with: /gym-log digest"
