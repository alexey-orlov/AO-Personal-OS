#!/usr/bin/env bash
# notify.sh <path-to-coaching-report.md>
# Generate a Telegram digest for an english-coaching report and send it.
# Non-fatal on any failure — callers should ignore the exit code.
#
# Composition only: agentic digest content comes from the english-coaching-digest
# skill; delivery comes from the standalone automations/telegram/ CLI; the
# GitHub URL is derived from `git config remote.origin.url`. This script is
# the only place that knows all three exist together.
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$HERE/../.." && pwd)"

report="${1:?usage: notify.sh <path-to-coaching-report.md>}"
[ -s "$report" ] || { echo "[notify] missing or empty report: $report" >&2; exit 1; }

# Resolve absolute claude binary — same approach as call-pipeline/config.sh, so
# this works under launchd (no PATH) as well as in an interactive shell.
CLAUDE_BIN="$(command -v claude 2>/dev/null || true)"
if [ -z "$CLAUDE_BIN" ]; then
  for p in "$HOME/.local/bin/claude" /opt/homebrew/bin/claude /usr/local/bin/claude "$HOME/.npm-global/bin/claude"; do
    [ -x "$p" ] && CLAUDE_BIN="$p" && break
  done
fi
[ -n "$CLAUDE_BIN" ] || { echo "[notify] claude binary not found" >&2; exit 1; }

DIGEST_SKILL="$REPO_ROOT/.claude/skills/english-coaching-digest/SKILL.md"
TELEGRAM_CLI="$REPO_ROOT/automations/telegram/telegram_send.sh"
[ -f "$DIGEST_SKILL" ] || { echo "[notify] missing digest skill: $DIGEST_SKILL" >&2; exit 1; }
[ -x "$TELEGRAM_CLI" ] || { echo "[notify] missing or non-exec telegram CLI: $TELEGRAM_CLI" >&2; exit 1; }

# Agentic step: pure stdin → stdout. No parsing of model output afterwards —
# the skill is constrained to emit just the digest body and nothing else.
digest="$(
  cat "$report" \
    | "$CLAUDE_BIN" -p "Condense the english-coaching report on input into a Telegram digest, following the english-coaching-digest skill exactly. Output plain text only — no Markdown, no link line." \
        --append-system-prompt "$(cat "$DIGEST_SKILL")" \
        --output-format text
)"
if [ -z "$digest" ]; then
  echo "[notify] digest skill returned empty output" >&2
  exit 1
fi

# Build a "blob/main/<rel-path>" GitHub URL from origin. Derives the owner/repo
# from git config so this script isn't pinned to a hardcoded URL.
origin="$(git -C "$REPO_ROOT" config --get remote.origin.url 2>/dev/null || true)"
case "$origin" in
  git@github.com:*) origin="https://github.com/${origin#git@github.com:}";;
esac
origin="${origin%.git}"
rel="${report#$REPO_ROOT/}"
gh_url="${origin:-https://github.com/alexey-orlov/AO-Personal-OS}/blob/main/${rel}"

{
  printf '%s\n\n📄 Full report: %s\n' "$digest" "$gh_url"
} | TG_TOPIC=english-coaching "$TELEGRAM_CLI"
