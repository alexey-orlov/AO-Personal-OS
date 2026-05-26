# config.sh — sourced by setup.sh.
#
# N8N_API_KEY lives in macOS Keychain (set up via setup.sh walkthrough).
# N8N_API_URL has a default (Alex's n8n Cloud instance) but can be overridden
# by env var for other instances.

export N8N_API_URL="${N8N_API_URL:-https://alexorlovco.app.n8n.cloud}"
export N8N_API_KEY="$(security find-generic-password -a "$USER" -s N8N_API_KEY -w 2>/dev/null || echo "${N8N_API_KEY:-}")"
