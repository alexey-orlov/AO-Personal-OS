#!/usr/bin/env bash
# run.sh — local fallback for the podcast-insights knowledge base.
#
# Folds the latest podcast digest into context/knowledge/podcasts/ by running the
# `podcast-insights` skill headlessly, then commits + pushes (best-effort).
# This is the LOCAL twin of the daily claude.ai cloud routine — same skill (the
# engine), different scheduler. Use it via `/loop 1d automations/podcast-knowledge/run.sh`
# or a launchd agent if the cloud routine is ever down. Idempotent: the skill's
# per-insight ledger means a no-op run changes nothing.
#
# Path A (n8n-committed _inbox/*.json) is the primary input and needs only
# Read/Glob/Grep/Edit/Write. Path B (parse the "Youtube podcasts digest" Gmail)
# is a fallback that additionally needs the Gmail MCP tools allowed — pass the
# server-specific tool names via GMAIL_TOOLS (env) if you want it here; the cloud
# routine handles Path B itself via the connected Gmail.
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$HERE/../.." && pwd)"
SKILL="$REPO_ROOT/.claude/skills/podcast-insights/SKILL.md"
[ -f "$SKILL" ] || { echo "[podcast-kb] missing skill: $SKILL" >&2; exit 1; }

# Absolute claude binary — works under launchd (no PATH) and interactively.
CLAUDE_BIN="$(command -v claude 2>/dev/null || true)"
if [ -z "$CLAUDE_BIN" ]; then
  for p in "$HOME/.local/bin/claude" /opt/homebrew/bin/claude /usr/local/bin/claude "$HOME/.npm-global/bin/claude"; do
    [ -x "$p" ] && CLAUDE_BIN="$p" && break
  done
fi
[ -n "$CLAUDE_BIN" ] || { echo "[podcast-kb] claude binary not found" >&2; exit 1; }

cd "$REPO_ROOT" || exit 1

# Tools: Path A toolset; append Gmail MCP tools if GMAIL_TOOLS is set (Path B).
TOOLS="Read,Glob,Grep,Edit,Write"
[ -n "${GMAIL_TOOLS:-}" ] && TOOLS="$TOOLS,$GMAIL_TOOLS"

echo "[podcast-kb] folding latest digest into context/knowledge/podcasts ..." >&2
"$CLAUDE_BIN" -p "Sweep mode: fold the latest podcast digest into context/knowledge/podcasts/ following the podcast-insights skill exactly. You have no Bash tool — do not attempt git; update the ledger (_meta/processed.txt) by Read + Write. If there are no new insights (zero-episode/heartbeat day), make no changes and just report." \
  --append-system-prompt "$(cat "$SKILL")" \
  ${PODCAST_MODEL:+--model "$PODCAST_MODEL"} \
  --allowedTools "$TOOLS" \
  --max-turns 60 \
  --output-format text || { echo "[podcast-kb] skill run failed (non-fatal)" >&2; exit 0; }

# Deliberate commit so git-autosync doesn't scoop a generic message. Best-effort.
if git diff --quiet -- context/knowledge/podcasts 2>/dev/null \
   && git diff --cached --quiet -- context/knowledge/podcasts 2>/dev/null \
   && [ -z "$(git ls-files --others --exclude-standard context/knowledge/podcasts)" ]; then
  echo "[podcast-kb] no changes — nothing to commit." >&2
  exit 0
fi
git add context/knowledge/podcasts 2>/dev/null || true
git commit -m "feat(podcasts): fold $(date +%F) digest into knowledge base" >/dev/null 2>&1 || true
if ! git pull --rebase --autostash --no-edit >/dev/null 2>&1; then
  git rebase --abort >/dev/null 2>&1 || true
fi
if git push >/dev/null 2>&1; then
  echo "[podcast-kb] pushed." >&2
else
  echo "[podcast-kb] push deferred (offline?) — autosync will sync later." >&2
fi
