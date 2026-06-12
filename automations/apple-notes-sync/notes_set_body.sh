#!/usr/bin/env bash
# notes_set_body.sh <note name> <html-file> — replace the body of one _ToDo note.
#
# Safety rails (this is the ONLY sanctioned write path into Apple Notes):
#   - operates only on notes inside the _ToDo folder, matched by exact unique name;
#   - refuses if the CURRENT body carries native-checklist markup ("checklist" /
#     "<input") — AppleScript writes flatten real checkboxes, which would destroy
#     Alex's ticked state. Keep agent-fed lists as plain bullets (see README);
#   - backs up the current body + plaintext to .work/backups/ before writing;
#   - prints the post-write plaintext to stdout so the caller can verify the edit
#     (must equal old plaintext + the inserted lines, nothing else changed).
#
# Recovery: notes_set_body.sh "<note>" .work/backups/<stamp>-<slug>.html
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=config.sh
source "$HERE/config.sh"

[ $# -eq 2 ] || { echo "usage: notes_set_body.sh <note name> <html-file>" >&2; exit 2; }
NOTE_NAME="$1"
HTML_FILE="$(cd "$(dirname "$2")" && pwd)/$(basename "$2")"
[ -s "$HTML_FILE" ] || { echo "[notes-set-body] missing/empty html file: $HTML_FILE" >&2; exit 2; }

mkdir -p "$BACKUP_DIR"
STAMP="$(date +%Y%m%d-%H%M%S)"
SLUG="$(printf '%s' "$NOTE_NAME" | tr -cs 'A-Za-z0-9' '-' | tr 'A-Z' 'a-z' | sed 's/^-*//;s/-*$//')"
BK_BASE="$BACKUP_DIR/$STAMP-$SLUG"

osascript - "$NOTES_FOLDER" "$NOTE_NAME" "$HTML_FILE" "$BK_BASE" <<'EOF'
on run argv
  set folderName to item 1 of argv
  set noteName to item 2 of argv
  set htmlPath to item 3 of argv
  set bkBase to item 4 of argv
  set newBody to read POSIX file htmlPath as «class utf8»
  tell application "Notes"
    set f to folder folderName
    set hits to (notes of f whose name is noteName)
    if (count of hits) is 0 then error "no note named '" & noteName & "' in " & folderName
    if (count of hits) > 1 then error "ambiguous: " & (count of hits) & " notes named '" & noteName & "' in " & folderName
    set n to item 1 of hits
    set oldBody to body of n
    set oldText to plaintext of n
    -- native-checklist guard: AppleScript is BLIND to checklist content — items
    -- render as empty <li><br></li> in body and are absent from plaintext
    -- (verified 2026-06-12). A body write would DESTROY them. Empty <li>s are
    -- the only AppleScript-visible signature, so any empty list item = refuse;
    -- the UI insertion path (notes_ax_insert.sh) handles those notes.
    if (oldBody contains "<li><br></li>") or (oldBody contains "checklist") or (oldBody contains "<input") then
      error "refusing to write: '" & noteName & "' has AppleScript-invisible list items (native checklist?) — use notes_ax_insert.sh"
    end if
    -- backups before touching anything
    set bkHtml to open for access POSIX file (bkBase & ".html") with write permission
    write oldBody to bkHtml as «class utf8»
    close access bkHtml
    set bkTxt to open for access POSIX file (bkBase & ".txt") with write permission
    write oldText to bkTxt as «class utf8»
    close access bkTxt
    set body of n to newBody
    delay 1
    return plaintext of n
  end tell
end run
EOF
