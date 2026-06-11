#!/usr/bin/env bash
# config.sh — git-autosync settings. Sourced by autosync.sh and setup.sh.
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$HERE/../.." && pwd)"

BRANCH="main"           # only autosync on this branch; anything else is deliberate work
POLL_SECONDS=20         # how often to check the tree for changes
QUIET_SECONDS=5         # tree must be unchanged this long before committing (debounce)
MAX_QUIET_WAIT=60       # stop debouncing after this many seconds and commit anyway
PULL_EVERY_TICKS=15     # every N polls (~5 min), also pull when clean so this machine RECEIVES remote changes

WORK="$HERE/.work"      # git-ignored runtime dir
LOG="$WORK/autosync.log"
LOG_MAX_BYTES=1000000
