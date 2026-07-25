#!/usr/bin/env bash
# notes_ax_read.sh <note name> — read a _ToDo note's FULL visible text via the
# Accessibility (AX) tree of the Notes window.
#
# Why this exists: native checklist items are INVISIBLE to AppleScript (`body`
# returns them as empty <li>s, `plaintext` omits their text entirely — verified
# 2026-06-12). The AX value of the note's text area is what's actually on screen,
# checklist items included. Needs: Notes frontable (screen unlocked) +
# Accessibility permission for the host app.
#
# Exit 3 = Notes can't come frontmost (locked screen / no GUI session) — caller
# should leave work queued and retry later.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=config.sh
source "$HERE/config.sh"

[ $# -eq 1 ] || { echo "usage: notes_ax_read.sh <note name>" >&2; exit 2; }

osascript - "$NOTES_FOLDER" "$1" <<'EOF'
on run argv
  set folderName to item 1 of argv
  set noteName to item 2 of argv
  tell application "Notes"
    set hits to (notes of folder folderName whose name is noteName)
    if (count of hits) is 0 then error "no note named '" & noteName & "' in " & folderName
    show item 1 of hits
    activate
  end tell
  delay 0.6
  tell application "System Events"
    if frontmost of process "Notes" is false then error number 3
    tell process "Notes"
      -- NEVER use `entire contents` here: it recursively materialises the whole
      -- AX tree (folder list + note list + body) and hangs for minutes once any
      -- note is large — that silently broke every checklist read until 2026-07-25.
      -- The editor is a direct scroll-area child of the splitter group, so walk
      -- only those and match on the note name in the text area's value.
      repeat with sa in scroll areas of splitter group 1 of window 1
        try
          set v to value of text area 1 of sa
          if v contains noteName then return v
        end try
      end repeat
      -- Fallback: some macOS builds nest the editor one group deeper.
      repeat with grp in groups of splitter group 1 of window 1
        try
          repeat with sa in scroll areas of grp
            set v to value of text area 1 of sa
            if v contains noteName then return v
          end repeat
        end try
      end repeat
    end tell
  end tell
  error "note body text area not found in Notes window"
end run
EOF
