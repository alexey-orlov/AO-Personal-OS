#!/usr/bin/env bash
# run.sh — start the Clockify panel server. Sourced env from config.sh.
# Logs to .work/panel.log. Used both interactively and by the launchd agent.
set -euo pipefail
cd "$(dirname "$0")"

# shellcheck disable=SC1091
source ./config.sh
mkdir -p "$WORK"

exec "$PYTHON_BIN" "$PANEL_DIR/server.py"
