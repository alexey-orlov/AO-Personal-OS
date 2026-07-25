#!/usr/bin/env bash
# run.sh — local leg of the second-brain pipeline: file queued goal/task/insight
# cards from context/_inbox/apple-notes/ into Alex's pinned Apple Notes (_ToDo
# folder), then refresh the per-area note snapshots in the repo.
#
# Invoked by launchd once daily at 08:00 (com.user.apple-notes-sync). Cheap when idle:
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

mkdir -p "$HERE/.work"
RUN_OUT="$HERE/.work/last_run.out"      # full transcript of the most recent skill run
FAIL_COUNT="$HERE/.work/consecutive_failures"

# Timestamped, so launchd.log can actually be correlated with a day's outcome
# (it previously had no dates at all, which made diagnosis guesswork).
log() { echo "[notes-sync $(date '+%F %T')] $*" >&2; }

# Best-effort Telegram alert → General topic. telegram_send.sh falls back to the
# outbox queue when creds are unavailable, so the n8n cloud flush still delivers it.
# Never let a notification problem change the run's outcome.
alert() {
  printf '%s\n' "$1" | "$REPO_ROOT/automations/telegram/telegram_send.sh" >/dev/null 2>&1 \
    || log "alert send failed (offline / no creds) — details in $RUN_OUT"
}

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

log "queue: $queue_count card(s); running skill ..."
set -o pipefail
"$CLAUDE_BIN" -p "$PROMPT" \
  --append-system-prompt "$(cat "$SKILL")" \
  ${NOTES_MODEL:+--model "$NOTES_MODEL"} \
  --allowedTools "Read,Glob,Grep,Edit,Write,Bash(automations/apple-notes-sync/:*)" \
  --max-turns 80 \
  --output-format text 2>&1 | tee "$RUN_OUT"
rc=${PIPESTATUS[0]}

# A broken delivery leg must be LOUD. Until 2026-07-25 this branch only echoed
# "skill run failed (non-fatal)" into .work/launchd.log and exited 0 — so two days
# of "Not logged in" went unnoticed and a queued card silently missed Apple Notes.
if [ "$rc" -ne 0 ] || grep -qiE 'not logged in|please run /login' "$RUN_OUT" 2>/dev/null; then
  fails=$(( $(cat "$FAIL_COUNT" 2>/dev/null || echo 0) + 1 ))
  echo "$fails" > "$FAIL_COUNT"
  reason="skill run failed (exit $rc)"
  hint=""
  if grep -qiE 'not logged in|please run /login' "$RUN_OUT" 2>/dev/null; then
    reason="Claude CLI is not authenticated (\"Not logged in\")"
    hint="
Fix: run  claude login  in a terminal on this Mac."
  fi
  log "FAILED — $reason (day $fails); $queue_count card(s) left queued"
  alert "⚠️ apple-notes-sync failed — ${fails} day(s) in a row
${reason}
${queue_count} card(s) still queued (nothing lost; they wait for the next run).${hint}"
  exit 0
fi
: > "$FAIL_COUNT"

# Deliberate commit so git-autosync doesn't scoop a generic message. Best-effort.
if git status --porcelain -- context/ | grep -q .; then
  git add context/ 2>/dev/null || true
  git commit -m "notes-sync: $(date +%F) — filed queue into Apple Notes, snapshots refreshed" >/dev/null 2>&1 || true
  if ! git pull --rebase --autostash --no-edit >/dev/null 2>&1; then
    git rebase --abort >/dev/null 2>&1 || true
  fi
  git push >/dev/null 2>&1 || log "push deferred (offline?) — autosync will sync later."
fi

# The run "succeeded" but couldn't file everything: also worth surfacing. Three cards
# sat un-filed from mid-June to 2026-07-25 because a clean exit said nothing about
# them. A card the skill knows is permanently unfilable belongs in _blocked/ (outside
# this glob), so anything left here is genuinely unresolved and should be seen.
left="$(find "$QUEUE_DIR" -maxdepth 1 -name '*.md' -type f 2>/dev/null | wc -l | tr -d ' ')"
if [ "$left" -gt 0 ]; then
  log "completed, but $left card(s) remain queued"
  alert "⚠️ apple-notes-sync: ${left} card(s) could not be filed this run and are still queued.
Transcript: automations/apple-notes-sync/.work/last_run.out"
fi
log "done."
