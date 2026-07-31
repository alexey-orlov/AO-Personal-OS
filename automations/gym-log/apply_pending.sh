#!/usr/bin/env bash
# Flush queued gym-log session payloads into the "My training" sheet.
#
# Why this exists: the read-write Sheets token lives in the git-ignored
# .work/, so a session running anywhere but this Mac (Claude Code cloud,
# a fresh clone) cannot write the sheet. Instead of dropping the parsed
# session, it writes the ready `log` payload to pending/ and says so.
# Run this on the Mac to apply the queue:
#
#   automations/gym-log/apply_pending.sh
#
# Applied payloads move to pending/applied/, so re-running is a no-op.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=/dev/null
source "$here/config.sh"

shopt -s nullglob
files=("$here"/pending/*.json)
if [ ${#files[@]} -eq 0 ]; then
  echo "gym-log: pending queue is empty"
  exit 0
fi

mkdir -p "$here/pending/applied"
for f in "${files[@]}"; do
  echo "── applying $(basename "$f")"
  if "$PYTHON_BIN" "$GYM_SHEET" log < "$f"; then
    mv "$f" "$here/pending/applied/"
  else
    echo "gym-log: FAILED on $f — left in the queue, nothing moved" >&2
    exit 1
  fi
done

echo
echo "gym-log: queue flushed. Digest numbers for a session:"
echo "  source automations/gym-log/config.sh && \"\$PYTHON_BIN\" \"\$GYM_SHEET\" progress M/D/YYYY"
