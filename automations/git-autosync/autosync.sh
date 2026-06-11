#!/usr/bin/env bash
# autosync.sh — long-running watcher: auto-commit + push any local repo change.
# Every POLL_SECONDS: if the tree is dirty and has been quiet for QUIET_SECONDS,
# commit everything ("autosync: <host> <ts>") and push. Pull --rebase before
# push; a conflicted rebase is aborted rather than left jamming the repo.
# Best-effort daemon: offline pushes defer to the next tick, nothing is fatal.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=/dev/null
source "$HERE/config.sh"
mkdir -p "$WORK"
cd "$REPO_ROOT" || exit 1

log() { printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" >>"$LOG"; }
trim_log() {
  [ -f "$LOG" ] || return 0
  [ "$(stat -f%z "$LOG" 2>/dev/null || echo 0)" -gt "$LOG_MAX_BYTES" ] || return 0
  tail -c $((LOG_MAX_BYTES / 2)) "$LOG" >"$LOG.tmp" && mv "$LOG.tmp" "$LOG"
}

in_progress() { [ -d .git/rebase-merge ] || [ -d .git/rebase-apply ] || [ -f .git/MERGE_HEAD ]; }
dirty() { [ -n "$(git status --porcelain 2>/dev/null)" ]; }
ahead() { [ "$(git rev-list --count '@{u}..HEAD' 2>/dev/null || echo 0)" -gt 0 ]; }

safe_pull() {
  if ! git pull --rebase --autostash --no-edit >/dev/null 2>&1; then
    git rebase --abort >/dev/null 2>&1 || true
    log "pull --rebase failed (conflict or offline) — will retry next tick"
    return 1
  fi
}

log "autosync started (poll=${POLL_SECONDS}s quiet=${QUIET_SECONDS}s branch=${BRANCH})"
tick=0
while :; do
  tick=$((tick + 1))
  trim_log

  if in_progress || [ "$(git rev-parse --abbrev-ref HEAD 2>/dev/null)" != "$BRANCH" ]; then
    sleep "$POLL_SECONDS"
    continue
  fi

  if dirty; then
    # Debounce: wait until the tree stops changing so we don't commit a
    # half-written multi-file operation (e.g. call-pipeline mid-run).
    waited=0
    snap="$(git status --porcelain)"
    while [ "$waited" -lt "$MAX_QUIET_WAIT" ]; do
      sleep "$QUIET_SECONDS"
      waited=$((waited + QUIET_SECONDS))
      cur="$(git status --porcelain)"
      [ "$cur" = "$snap" ] && break
      snap="$cur"
    done
    if ! in_progress && dirty; then
      n="$(git status --porcelain | wc -l | tr -d ' ')"
      git add -A >/dev/null 2>&1
      if git commit -m "autosync: $(hostname -s) $(date '+%Y-%m-%d %H:%M') (${n} changed)" >/dev/null 2>&1; then
        log "committed ${n} change(s)"
      fi
    fi
  fi

  if ahead; then
    safe_pull
    if git push >/dev/null 2>&1; then
      log "pushed $(git rev-parse --short HEAD)"
    else
      log "push deferred (offline?) — will retry next tick"
    fi
  elif [ $((tick % PULL_EVERY_TICKS)) -eq 0 ] && ! dirty; then
    # Periodic inbound sync: pick up what other machines pushed.
    safe_pull || true
  fi

  sleep "$POLL_SECONDS"
done
