#!/usr/bin/env bash
# setup.sh — register czlonkowski/n8n-mcp with Claude Code at user scope.
#
# Idempotent: re-running re-registers with current config (use after rotating
# the key or changing N8N_API_URL). Non-interactive: if N8N_API_KEY is missing
# from Keychain, prints the one-liner to add it and exits 0 without registering.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./config.sh
source "$SCRIPT_DIR/config.sh"

command -v node   >/dev/null || { echo "node not found. Run: brew install node" >&2; exit 1; }
command -v npx    >/dev/null || { echo "npx not found. Reinstall node." >&2; exit 1; }
command -v claude >/dev/null || { echo "claude CLI not found. Install Claude Code." >&2; exit 1; }

# Resolve npx to an absolute path. Claude Code spawns MCP servers with a PATH
# that does not include Homebrew or nvm dirs, so an unqualified `npx` will fail
# with "command not found" even though it works in an interactive shell.
# We also need to inject npx's directory into PATH for the child process,
# because npx is itself a node script with `#!/usr/bin/env node` and will
# fail at startup if `node` is not resolvable on PATH.
NPX_BIN="$(command -v npx)"
NPX_DIR="$(dirname "$NPX_BIN")"
MCP_PATH="$NPX_DIR:/usr/bin:/bin"

if [ -z "${N8N_API_KEY:-}" ]; then
  cat <<EOF
n8n-mcp is unconfigured. Add your n8n API key to Keychain, then re-run this script:

    security add-generic-password -U -a "\$USER" -s N8N_API_KEY -w '<your-n8n-api-key>'

Generate the key in n8n: Settings -> API. Current N8N_API_URL:
    $N8N_API_URL
EOF
  exit 0
fi

claude mcp remove n8n-mcp --scope user >/dev/null 2>&1 || true
claude mcp add n8n-mcp --scope user \
  -e "PATH=$MCP_PATH" \
  -e MCP_MODE=stdio \
  -e LOG_LEVEL=error \
  -e DISABLE_CONSOLE_OUTPUT=true \
  -e "N8N_API_URL=$N8N_API_URL" \
  -e "N8N_API_KEY=$N8N_API_KEY" \
  -- "$NPX_BIN" -y n8n-mcp

echo "n8n-mcp registered at user scope."
echo "Restart Claude Code (close + reopen the VS Code Claude Code panel, or /exit in CLI) to load it."
