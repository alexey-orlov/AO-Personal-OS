#!/usr/bin/env bash
# run.sh — local leg of the second-brain pipeline: file queued goal/task/insight
# cards from context/_inbox/apple-notes/ into Alex's pinned Apple Notes (_ToDo
# folder), then refresh the per-area note snapshots in the repo.
#
# Invoked by launchd every 30 min (com.user.apple-notes-sync). Cheap when idle:
# exits before touching Claude unless the queue has cards or snapshots are stale.
# The cloud fold (claude.ai routine) WRITES the queue; only this Mac can reach
# Apple Notes, so this is deliberately a local launchd job, not a cloud routine.
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$HERE/../.." && pwd)"
# shellcheck source=config.sh
source "$HERE/config.sh"
SKILL="$REPO_ROOT/.claude/skills/apple-notes-sync/SKILL.md"
[ -f "$SKILL" ] || { echo "[notes-sync] missing skill: $SKILL" >&2; exit 1; }

cd "$REPO_ROOT" || exit 1

# Pick up queue cards committed by the cloud fold (best-effort; autosync also pulls).
if ! git pull --rebase --autostash --no-edit >/dev/null 2>&1; then
  git rebase --abort >/dev/null 2>&1 || true
fi

queue_count="$(find "$QUEUE_DIR" -maxdepth 1 -name '*.md' -type f 2>/dev/null | wc -l | tr -d ' ')"

# Snapshot freshness: with an empty queue, still refresh snapshots every N days
# so the repo view of the notes doesn't rot.
stale_snapshots=0
if [ "$queue_count" -eq 0 ]; then
  newest="$(find context/areas/*/apple-notes -name '*.md' -type f -mtime -"$SNAPSHOT_MAX_AGE_DAYS" 2>/dev/null | head -1)"
  any="$(find context/areas/*/apple-notes -name '*.md' -type f 2>/dev/null | head -1)"
  if [ -z "$newest" ] && [ -n "$any" ]; then stale_snapshots=1; fi
  if [ -z "$any" ]; then stale_snapshots=1; fi   # never snapshotted yet
fi

if [ "$queue_count" -eq 0 ] && [ "$stale_snapshots" -eq 0 ]; then
  exit 0   # nothing to do — stay silent and free
fi

# Absolute claude binary — works under launchd (no PATH) and interactively.
CLAUDE_BIN="$(command -v claude 2>/dev/null || true)"
if [ -z "$CLAUDE_BIN" ]; then
  for p in "$HOME/.local/bin/claude" /opt/homebrew/bin/claude /usr/local/bin/claude "$HOME/.npm-global/bin/claude"; do
    [ -x "$p" ] && CLAUDE_BIN="$p" && break
  done
fi
[ -n "$CLAUDE_BIN" ] || { echo "[notes-sync] claude binary not found" >&2; exit 1; }

NOTES_MODEL="${NOTES_MODEL:-claude-fable-5}"

if [ "$queue_count" -gt 0 ]; then
  PROMPT="Sweep mode: process every queue card in $QUEUE_DIR following the apple-notes-sync skill exactly, then refresh the note snapshots. You are headless: no git (the wrapper commits), no Telegram. Bash is allowed ONLY for the automations/apple-notes-sync/ helper scripts."
else
  PROMPT="Snapshot mode: the queue is empty — only refresh the Apple Notes snapshots per the apple-notes-sync skill (no insertions). You are headless: no git, no Telegram. Bash is allowed ONLY for the automations/apple-notes-sync/ helper scripts."
fi

echo "[notes-sync] queue: $queue_count card(s); running skill ..." >&2
"$CLAUDE_BIN" -p "$PROMPT" \
  --append-system-prompt "$(cat "$SKILL")" \
  ${NOTES_MODEL:+--model "$NOTES_MODEL"} \
  --allowedTools "Read,Glob,Grep,Edit,Write,Bash(automations/apple-notes-sync/:*)" \
  --max-turns 80 \
  --output-format text || { echo "[notes-sync] skill run failed (non-fatal)" >&2; exit 0; }

# Deliberate commit so git-autosync doesn't scoop a generic message. Best-effort.
if git status --porcelain -- context/ | grep -q .; then
  git add context/ 2>/dev/null || true
  git commit -m "notes-sync: $(date +%F) — filed queue into Apple Notes, snapshots refreshed" >/dev/null 2>&1 || true
  if ! git pull --rebase --autostash --no-edit >/dev/null 2>&1; then
    git rebase --abort >/dev/null 2>&1 || true
  fi
  git push >/dev/null 2>&1 || echo "[notes-sync] push deferred (offline?) — autosync will sync later." >&2
fi
echo "[notes-sync] done." >&2
