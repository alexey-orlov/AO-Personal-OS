# config.sh — shared constants for the apple-notes-sync automation.
# Sourced by the helper scripts and run.sh. No secrets here.

# The Apple Notes folder holding Alex's pinned working todo notes.
# Pinned status is NOT readable via AppleScript — folder membership is the contract:
# every note in this folder is a routing candidate for queued items.
NOTES_FOLDER="_ToDo"

# Queue of items written by the daily cloud fold (context-update step 3b):
# one card per goal/task/insight, consumed by the apple-notes-sync skill.
QUEUE_DIR="context/_inbox/apple-notes"

# Where consumed queue cards are archived (same convention as drop cards).
PROCESSED_DIR="context/_inbox/processed"

# Per-note body backups taken before every write (recovery path).
BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.work/backups"

# Snapshot cap — notes longer than this are truncated in the repo snapshot.
SNAPSHOT_MAX_CHARS=12000

# Re-snapshot cadence for run.sh when the queue is empty (days).
SNAPSHOT_MAX_AGE_DAYS=7
