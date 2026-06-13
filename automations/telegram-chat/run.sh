#!/bin/bash
# telegram-chat bridge loop: runs Claude Code with the official Telegram
# channel plugin in this repo. Each loop iteration is a BRAND-NEW session —
# exiting/killing the claude process (e.g. via new_session.sh on a "/new"
# message) restarts clean. Runs inside the "telegram-chat" tmux session
# (created by start.sh); attach with: tmux attach -t telegram-chat
export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/local/bin:$PATH"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
# The GATED FORK installed from this repo's local marketplace (ao-personal-os
# = automations/telegram-chat, plugin source = ./plugin). NOT the official
# plugin — that one is permanently disabled in ~/.claude/settings.json.
# Non-official channel plugins aren't on CC's built-in approved-channels
# allowlist, so the fork must load via --dangerously-load-development-channels
# (NOT --channels, which silently skips it). That flag shows a one-time
# interactive warning on EVERY claude start — start.sh auto-confirms it.
PLUGIN="plugin:telegram@ao-personal-os"

# Single-poller invariant (2026-06-12 incident): ONLY the bridge may claim
# Telegram's one getUpdates consumer slot. The fork's server.ts takes the
# bot.pid slot and polls ONLY when this env var is set. Desktop/headless
# sessions load the same fork user-scope but never set the var, so they run
# tools-only and can no longer kill the bridge's poller and silently eat
# inbound messages.
export TELEGRAM_CHANNEL_POLL=1

# Pre-approved tools — why this exists (2026-06-13):
# This account ("…'s Organization") enforces AUTO-MODE at the account level:
# permissionMode stays `default` even WITH --dangerously-skip-permissions, so
# every tool call NOT on an allow-list is relayed to Telegram as a
# "Permission: X → Allow?" message. A local flag/env can't disable the policy
# (DISABLE_GROWTHBOOK etc. tested, no effect) — but an explicit allow-list IS
# honored inside auto-mode (verified: a gated `touch` runs silently once Bash
# is allowed). So we pre-approve the tools the bridge actually uses, scoped to
# THIS process via --allowedTools (other sessions keep their classifier).
# Residual by design: a hard "dangerous command" floor (e.g. `rm -rf`) still
# prompts even when allowlisted — Anthropic enforces that and it's not
# removable; it's a good last-resort guard against forwarded prompt-injection.
# To silence a newly-used tool/MCP server, add its token here (built-in name
# like `Write`, whole MCP server like `mcp__n8n-mcp`, or `mcp__server__tool`).
ALLOWED_TOOLS="Bash Edit MultiEdit Write NotebookEdit Read Glob Grep WebFetch WebSearch Task TodoWrite Skill SlashCommand BashOutput KillShell mcp__plugin_telegram_telegram mcp__n8n-mcp mcp__ms365 mcp__Claude_in_Chrome"

cd "$REPO_ROOT" || exit 1

while true; do
  echo "[telegram-chat] $(date '+%F %T') starting fresh Claude session"
  # --dangerously-skip-permissions: Alex's explicit unattended-mode choice
  # (2026-06-11). Account policy downgrades it to auto-mode (see ALLOWED_TOOLS
  # above); the allow-list is what actually keeps routine work prompt-free.
  # Only allowlisted Telegram senders (Alex) can reach the session; treat
  # forwarded third-party content with prompt-injection caution.
  claude --dangerously-load-development-channels "$PLUGIN" \
         --dangerously-skip-permissions \
         --allowedTools "$ALLOWED_TOOLS"
  echo "[telegram-chat] $(date '+%F %T') session ended; new one in 5s (Ctrl-C now to stop)"
  sleep 5
done
