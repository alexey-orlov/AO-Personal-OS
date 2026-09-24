#!/usr/bin/env bash
# auth.sh — SOURCED by every job that runs `claude` unattended (launchd legs,
# the Telegram bridge). Safe under `set -euo pipefail`; always returns 0.
#
# 1. Token. Exports CLAUDE_CODE_OAUTH_TOKEN from the Keychain item of the same
#    name (a one-year token from `claude setup-token`), so unattended runs stop
#    depending on the interactive login's refresh token. That login lapsed twice
#    (~2026-07-23 and 2026-08-24) and silently stopped every headless job — the
#    second time for a month. No Keychain item => nothing exported and `claude`
#    falls back to the interactive login.
#
# 2. Naming the failure. After a FAILED claude run, `claude_auth_failed <file>`
#    says whether its output is an authentication failure. Callers treat that as
#    "deferred" — the item they were processing must run again once auth is
#    fixed, never be counted as failed or parked. `claude_auth_fix` prints the
#    one-line fix; `claude_auth_alert <job> [detail]` sends it to Telegram at most
#    once per job per 24h; `claude_auth_ok <job>` re-arms that alert after a
#    successful run.
#
# No preflight on purpose: `claude auth status` reports loggedIn:true for ANY
# token, even an invalid one (tested 2026-09-24) — only a real call proves auth,
# so detect it from the real call's output.

CLAUDE_AUTH_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_AUTH_STATE="$CLAUDE_AUTH_DIR/.work"

if [ -z "${CLAUDE_CODE_OAUTH_TOKEN:-}" ] && command -v security >/dev/null 2>&1; then
  _claude_auth_tok="$(security find-generic-password -a "${USER:-$(id -un)}" -s CLAUDE_CODE_OAUTH_TOKEN -w 2>/dev/null || true)"
  if [ -n "$_claude_auth_tok" ]; then
    export CLAUDE_CODE_OAUTH_TOKEN="$_claude_auth_tok"
  fi
  unset _claude_auth_tok
fi

# Wordings seen from the CLI: "Failed to authenticate: OAuth session expired and
# could not be refreshed", "Failed to authenticate. API Error: 401 Invalid bearer
# token", "Not logged in · Please run /login", "Invalid API key · Please run /login".
# Match only against the output of a run that already failed.
CLAUDE_AUTH_FAIL_RE='Failed to authenticate|Not logged in|Please run /login|Invalid API key|Invalid bearer token|OAuth (session|token)[^.]*expired'

claude_auth_failed() {  # <file>... -> 0 if any file holds a Claude auth failure
  local f
  for f in "$@"; do
    if [ -f "$f" ] && grep -qiE "$CLAUDE_AUTH_FAIL_RE" "$f"; then return 0; fi
  done
  return 1
}

claude_auth_fix() {  # one-line fix for the auth mode in use
  if [ -n "${CLAUDE_CODE_OAUTH_TOKEN:-}" ]; then
    echo "Fix: the long-lived token was rejected (expired or revoked). In Terminal: claude setup-token — then save the new token with: security add-generic-password -U -a \"\$USER\" -s CLAUDE_CODE_OAUTH_TOKEN -w"
  else
    echo "Fix: in Terminal run: claude auth login — or, so it can't lapse again: claude setup-token, then save the token with: security add-generic-password -U -a \"\$USER\" -s CLAUDE_CODE_OAUTH_TOKEN -w"
  fi
}

claude_auth_alert() {  # <job> [detail] — Telegram (General topic), max once per job per 24h
  local job="$1" detail="${2:-}" stamp now last
  mkdir -p "$CLAUDE_AUTH_STATE" 2>/dev/null || true
  stamp="$CLAUDE_AUTH_STATE/alerted.$job"
  now="$(date +%s)"
  last="$(cat "$stamp" 2>/dev/null || echo 0)"
  if [ $((now - last)) -lt 86400 ]; then return 0; fi
  if printf '⚠️ %s: Claude CLI cannot authenticate.\n%s\n\n%s\n' \
       "$job" "$detail" "$(claude_auth_fix)" \
     | "$CLAUDE_AUTH_DIR/../telegram/telegram_send.sh" >/dev/null 2>&1; then
    echo "$now" > "$stamp"
  else
    echo "[claude-auth] Telegram alert for $job failed (non-fatal)" >&2
  fi
  return 0
}

claude_auth_ok() {  # <job> — after a successful claude run: the next auth failure alerts at once
  rm -f "$CLAUDE_AUTH_STATE/alerted.$1" 2>/dev/null || true
}

true
