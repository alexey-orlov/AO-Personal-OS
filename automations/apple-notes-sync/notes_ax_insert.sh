#!/usr/bin/env bash
# notes_ax_insert.sh <note name> <anchor line text> <item text> [occurrence]
#
# Insert a new list item RIGHT AFTER the anchor line, via UI automation:
#   ⌘F → paste anchor → Return ×occurrence → Esc (match selected in body)
#   → ⌘→ (end of line) → Return (Notes continues the list: real CHECKBOX row in a
#   checklist, bullet in a bulleted list) → paste item text.
#
# This is the ONLY way to extend native checklists programmatically — AppleScript
# body writes flatten/destroy them (verified 2026-06-12). Also works for bullets.
# Self-verifying: reads the AX text before/after; on mismatch undoes (⌘Z) and
# exits 1 with the card left for the caller to keep queued.
#
# Needs: screen unlocked, Accessibility permission. Exit 3 = Notes not frontable.
# Caller contract: item text goes in VERBATIM (add the trailing 📥 yourself).
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=config.sh
source "$HERE/config.sh"

[ $# -ge 3 ] || { echo "usage: notes_ax_insert.sh <note> <anchor> <item> [occurrence]" >&2; exit 2; }
NOTE="$1"; ANCHOR="$2"; ITEM="$3"; OCC="${4:-1}"

key() { osascript -e "tell application \"System Events\" to $1" >/dev/null; }

BEFORE="$("$HERE/notes_ax_read.sh" "$NOTE")" || exit $?
case "$BEFORE" in *"$ANCHOR"*) ;; *) echo "[ax-insert] anchor not found in note text: $ANCHOR" >&2; exit 1;; esac
case "$BEFORE" in *"$ITEM"*) echo "[ax-insert] item already present — dup, nothing to do" >&2; exit 0;; esac

CLIP_SAVE="$(pbpaste 2>/dev/null || true)"

# Find-navigate to the anchor (note is already open + frontmost from the read).
printf '%s' "$ANCHOR" | pbcopy
key 'keystroke "f" using command down'; sleep 0.4
key 'keystroke "a" using command down'; sleep 0.2   # clear any previous query
key 'keystroke "v" using command down'; sleep 0.5
i=0; while [ "$i" -lt "$OCC" ]; do key 'key code 36'; sleep 0.3; i=$((i+1)); done  # Return → jump to match
key 'key code 53'; sleep 0.4                         # Esc → close find, match selected in body
key 'key code 124 using command down'; sleep 0.3     # ⌘→ → caret to end of anchor line
key 'key code 36'; sleep 0.4                         # Return → new row, same list type
printf '%s' "$ITEM" | pbcopy
key 'keystroke "v" using command down'; sleep 0.6    # paste item text

AFTER="$("$HERE/notes_ax_read.sh" "$NOTE")" || AFTER=""
printf '%s' "$CLIP_SAVE" | pbcopy

EXPECTED_OK=1
case "$AFTER" in *"$ANCHOR"$'\n'"$ITEM"*) ;; *) EXPECTED_OK=0;; esac
# every original line must still be there
if [ "$EXPECTED_OK" -eq 1 ]; then
  while IFS= read -r line; do
    [ -z "$line" ] && continue
    case "$AFTER" in *"$line"*) ;; *) EXPECTED_OK=0; break;; esac
  done <<<"$BEFORE"
fi

if [ "$EXPECTED_OK" -eq 1 ]; then
  echo "[ax-insert] OK: inserted after '$ANCHOR'"
  exit 0
fi

echo "[ax-insert] verification FAILED — undoing" >&2
u=0; while [ "$u" -lt 5 ]; do
  key 'keystroke "z" using command down'; sleep 0.4
  NOW="$("$HERE/notes_ax_read.sh" "$NOTE")" || NOW=""
  [ "$NOW" = "$BEFORE" ] && { echo "[ax-insert] undo restored original state" >&2; exit 1; }
  u=$((u+1))
done
echo "[ax-insert] could not confirm restore — CHECK THE NOTE MANUALLY: $NOTE" >&2
exit 1
