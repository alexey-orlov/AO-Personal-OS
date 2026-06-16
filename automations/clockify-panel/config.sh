# config.sh — sourced by run.sh / setup.sh for the Clockify panel.

export REPO_ROOT="$HOME/Documents/GitHub/AO-Personal-OS"
export PANEL_DIR="$REPO_ROOT/automations/clockify-panel"
export WORK="$PANEL_DIR/.work"                    # machine-local, git-ignored

# Local port the panel listens on (loopback only).
export PORT="${PORT:-7878}"

# Python from system (stdlib only — no venv needed).
export PYTHON_BIN="$(command -v python3)"

# Clockify API key from macOS Keychain (never committed). Falls back to an
# already-exported env var if present.
export CLOCKIFY_API_KEY="$(security find-generic-password -a "$USER" -s CLOCKIFY_API_KEY -w 2>/dev/null || echo "${CLOCKIFY_API_KEY:-}")"
