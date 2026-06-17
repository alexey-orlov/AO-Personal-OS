#!/usr/bin/env bash
# core.sh — run sync_core.py the only way that works under macOS TCC.
#
# `-I` drops the cwd from sys.path and `cd /tmp` keeps Python's import machinery
# from scanning ~/Documents (which TCC blocks, breaking `import zoneinfo`).
# Reads JSON on stdin, writes JSON on stdout.
#   usage: core.sh {reconcile|extract|schedule|log-run|daily-summary|commit}
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PY="$(command -v python3 || echo /usr/bin/python3)"
cd /tmp
exec "$PY" -I "$HERE/sync_core.py" "$@"
