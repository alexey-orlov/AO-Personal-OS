#!/usr/bin/env bash
# notes_list.sh [--full] — list notes in the _ToDo Apple Notes folder.
#   default : one line per note: <name>\t<chars>\t<modified ISO>
#   --full  : per note: "=== <name>" header + full plaintext (the skill's read view)
# Read-only. Requires Automation permission (host app → Notes), granted on first use.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=config.sh
source "$HERE/config.sh"

MODE="${1:-}"

osascript - "$NOTES_FOLDER" "$MODE" <<'EOF'
on run argv
  set folderName to item 1 of argv
  set fullMode to false
  if (count of argv) > 1 and item 2 of argv is "--full" then set fullMode to true
  set out to ""
  tell application "Notes"
    set f to folder folderName
    repeat with n in notes of f
      if fullMode then
        set out to out & "=== " & name of n & linefeed & plaintext of n & linefeed & "=== END" & linefeed
      else
        set md to modification date of n
        set isoDate to (year of md as string) & "-" & text -2 thru -1 of ("0" & (month of md as integer)) & "-" & text -2 thru -1 of ("0" & day of md)
        set out to out & name of n & tab & (length of (plaintext of n)) & tab & isoDate & linefeed
      end if
    end repeat
  end tell
  return out
end run
EOF
