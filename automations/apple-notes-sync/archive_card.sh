#!/usr/bin/env bash
# archive_card.sh — move consumed queue card(s) from the apple-notes queue into
# context/_inbox/processed/.
#
# WHY THIS EXISTS: run.sh runs the skill headlessly with Bash gated to
# `automations/apple-notes-sync/` helpers, and the Write/Edit tools cannot delete
# a file. So a headless run can COPY a filed card to processed/ but has no way to
# remove the queue original — leaving a permanent duplicate that keeps
# queue_count > 0 and re-forces a (Notes-activating) run every cycle. This helper
# is the sanctioned headless delete path: it matches the Bash gate, so the skill
# can call it to actually archive a consumed card.
#
# Usage: archive_card.sh <card.md> [<card.md> ...]
#   Each arg is a queue card as a repo-relative path
#   (context/_inbox/apple-notes/NAME.md) or a bare basename (NAME.md).
# Idempotent: a card already in processed/ (identical) just has its queue copy
# removed; already fully archived counts as success. A processed/ file of the same
# name but DIFFERENT content is never clobbered (the card is left queued, rc=1).
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$HERE/../.." && pwd)"
# shellcheck source=config.sh
source "$HERE/config.sh"      # QUEUE_DIR, PROCESSED_DIR (repo-relative)
cd "$REPO_ROOT"

[ "$#" -ge 1 ] || { echo "usage: archive_card.sh <card.md> [<card.md> ...]" >&2; exit 2; }

mkdir -p "$PROCESSED_DIR"
rc=0
for arg in "$@"; do
  base="$(basename "$arg")"
  # Only ever touch a plain *.md basename inside the queue — no path traversal,
  # no operating outside the queue dir.
  case "$base" in
    *.md) ;;
    *) echo "[archive] refuse (not a .md card): $arg" >&2; rc=1; continue ;;
  esac
  src="$QUEUE_DIR/$base"
  dst="$PROCESSED_DIR/$base"
  if [ ! -f "$src" ]; then
    if [ -f "$dst" ]; then echo "[archive] already archived: $base"; continue; fi
    echo "[archive] not found in queue: $base" >&2; rc=1; continue
  fi
  if [ -f "$dst" ]; then
    if cmp -s "$src" "$dst"; then
      rm -f "$src"; echo "[archive] already in processed/ — removed queue copy: $base"
    else
      echo "[archive] refuse (processed/ has a DIFFERENT file named $base) — left queued" >&2; rc=1
    fi
    continue
  fi
  mv "$src" "$dst"; echo "[archive] $base → processed/"
done
exit $rc
