# config.sh — sourced by run.sh / setup.sh for the SoftServe monthly report.

export REPO_ROOT="${REPO_ROOT:-$HOME/Documents/GitHub/AO-Personal-OS}"
export SSR_DIR="$REPO_ROOT/automations/ss-monthly-report"
export WORK="$SSR_DIR/.work"                 # machine-local, git-ignored (venv, logs, run state)
export VENV="$WORK/venv"
export PY="$VENV/bin/python"

# Where Alex keeps the client workbooks. The report for month M lands here as
# "Contingent Worker Subcontractor_Oleksii Orlov_<Mon>'<yy>.xlsx".
export REPORTS_DIR="${REPORTS_DIR:-$HOME/Desktop/Monthly reports}"
export FILE_PREFIX="Contingent Worker Subcontractor_Oleksii Orlov_"

# Billing. Rate is per contract; override per-run with SSR_RATE=… if it changes.
export SSR_RATE="${SSR_RATE:-120}"
export CLOCKIFY_PROJECT="${CLOCKIFY_PROJECT:-SS}"

# Clockify REST key (never committed). Shared with automations/clockify-panel.
# Absent is a supported state: run.sh then falls back to an exported PDF.
export CLOCKIFY_API_KEY="$(security find-generic-password -a "$USER" -s CLOCKIFY_API_KEY -w 2>/dev/null || echo "${CLOCKIFY_API_KEY:-}")"

# Where a manually exported Clockify PDF is looked for when there is no API key.
export PDF_SEARCH_DIR="${PDF_SEARCH_DIR:-$HOME/Downloads}"

# Deep link to the detailed report, pre-filtered to the SS project. %s placeholders
# are start/end ISO instants, filled by run.sh. Not a secret and not a trigger URL —
# it only opens the Clockify UI in a browser.
export CLOCKIFY_REPORT_URL_TMPL='https://app.clockify.me/reports/detailed?start=%s&end=%s&filterValuesData=%%7B%%22projects%%22:%%5B%%226894c10f8e5d37467df46fbb%%22%%5D%%7D&filterOptions=%%7B%%22projects%%22:%%7B%%22status%%22:%%22ACTIVE%%22%%7D%%7D'

# Model for the judgment pass. Fable is enough: the arithmetic is all in Python.
export SSR_MODEL="${SSR_MODEL:-claude-fable-5}"
