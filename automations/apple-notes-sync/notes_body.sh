#!/usr/bin/env bash
# notes_body.sh <note name> — print the HTML body of one note in the _ToDo folder.
# Read-only. Errors if the name doesn't match exactly one note in the folder.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=config.sh
source "$HERE/config.sh"

[ $# -eq 1 ] || { echo "usage: notes_body.sh <note name>" >&2; exit 2; }

osascript - "$NOTES_FOLDER" "$1" <<'EOF'
on run argv
  set folderName to item 1 of argv
  set noteName to item 2 of argv
  tell application "Notes"
    set f to folder folderName
    set hits to (notes of f whose name is noteName)
    if (count of hits) is 0 then error "no note named '" & noteName & "' in " & folderName
    if (count of hits) > 1 then error "ambiguous: " & (count of hits) & " notes named '" & noteName & "' in " & folderName
    return body of item 1 of hits
  end tell
end run
EOF
