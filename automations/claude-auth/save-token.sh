#!/usr/bin/env bash
# save-token.sh — save a `claude setup-token` token into the Keychain item every
# unattended job reads (CLAUDE_CODE_OAUTH_TOKEN, see README.md), from the clipboard.
#
# Run it in the macOS Terminal app, never through a Claude session. Start it first,
# then copy the token when it asks: copying this command afterwards would replace
# the token on the clipboard. The token is never printed, never typed into a hidden
# prompt, and never lands in shell history; the line break a wrapped token carries
# is removed. It is on security's command line for a moment, which only this user
# and root can see.
set -euo pipefail
SERVICE=CLAUDE_CODE_OAUTH_TOKEN

echo "1. Select the whole token that 'claude setup-token' printed: it starts with"
echo "   sk-ant-oat01- and may wrap onto a second line. Press Cmd+C."
read -r -p "2. Come back to this window and press Enter. " _

tok="$(pbpaste | tr -d '[:space:]')"
case "$tok" in
  sk-ant-oat01-*) ;;
  *) echo "The clipboard doesn't hold a Claude token (it must start with sk-ant-oat01-). Nothing saved." >&2
     exit 1 ;;
esac
if [ "${#tok}" -lt 80 ]; then
  echo "The copied token has only ${#tok} characters, so part of it is missing. Nothing saved." >&2
  exit 1
fi

security add-generic-password -U -a "$USER" -s "$SERVICE" -w "$tok"
n=${#tok}
unset tok
pbcopy < /dev/null
echo "Saved a ${n}-character token to the Keychain item $SERVICE. Clipboard cleared."
