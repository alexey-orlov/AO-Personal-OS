#!/usr/bin/env bash
# git_sync.sh <file> <commit-message> — stage, commit, push one file.
# Best-effort: never breaks the pipeline. Offline commits push on next sync.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"
[ "${AUTO_GIT:-0}" = "1" ] || exit 0
command -v git >/dev/null || { echo "[git] git not found; skipping" >&2; exit 0; }

f="${1:?}"; msg="${2:-update}"
cd "$REPO_ROOT" 2>/dev/null || exit 0
git add -- "$f" 2>/dev/null || true
git commit -m "$msg" >/dev/null 2>&1 || true
# If the rebase hits a conflict it would leave the repo mid-rebase and jam
# future commits — abort to restore a clean state. Push may defer; that's fine.
if ! git pull --rebase --autostash --no-edit >/dev/null 2>&1; then
  git rebase --abort >/dev/null 2>&1 || true
fi
if git push >/dev/null 2>&1; then
  echo "[git] pushed: $(basename "$f")"
else
  echo "[git] push deferred (offline?) — will sync on next note/start." >&2
fi
