# config.sh — sourced by the call-pipeline scripts.

# Repo location (you chose this path):
export REPO_ROOT="$HOME/Documents/GitHub/AO-Personal-OS"

export PIPELINE_DIR="$REPO_ROOT/automations/call-pipeline"
export WORK="$PIPELINE_DIR/.work"                 # machine-local, git-ignored
export SKILLS_DIR="$REPO_ROOT/skills/call-analysis"
export OUT_DIR="$REPO_ROOT/outputs/call-notes"    # committed + pushed (synced across devices)

# Voice Memos source — auto-detected (handles macOS-version differences).
_DEFAULT_VM="$HOME/Library/Group Containers/group.com.apple.VoiceMemos.shared/Recordings"
if [ -d "$_DEFAULT_VM" ]; then
  export VOICE_MEMOS_DIR="$_DEFAULT_VM"
else
  _FOUND="$(find "$HOME/Library" -ipath '*voicememos*' -name '*.m4a' -type f 2>/dev/null | head -1)"
  export VOICE_MEMOS_DIR="$(dirname "$_FOUND" 2>/dev/null)"
fi

# Working dirs (git-ignored). Audio + transcripts stay LOCAL for privacy.
export INBOX="$WORK/inbox"
export TRANSCRIPTS="$WORK/transcripts"
export STATE="$WORK/state"

# Python from the project venv (created by setup.sh); fallback to system python3.
export PYTHON_BIN="$WORK/venv/bin/python3"
[ -x "$PYTHON_BIN" ] || export PYTHON_BIN="$(command -v python3)"

# Claude CLI absolute path, so background jobs don't depend on PATH.
export CLAUDE_BIN="$(command -v claude 2>/dev/null)"
if [ -z "$CLAUDE_BIN" ]; then
  for p in "$HOME/.local/bin/claude" /opt/homebrew/bin/claude /usr/local/bin/claude "$HOME/.npm-global/bin/claude"; do
    [ -x "$p" ] && CLAUDE_BIN="$p" && break
  done
fi
export CLAUDE_BIN

# AssemblyAI key from macOS Keychain.
export ASSEMBLYAI_API_KEY="$(security find-generic-password -a "$USER" -s ASSEMBLYAI_API_KEY -w 2>/dev/null || echo "${ASSEMBLYAI_API_KEY:-}")"

# Google Calendar matching. credentials.json is a Desktop-app OAuth client
# (downloaded from Google Cloud Console). token.json is written on first run
# after browser consent and auto-refreshes thereafter. Both live in .work/
# (git-ignored). Empty CALENDAR_TZ = use the Mac's local timezone.
export CALENDAR_CREDS="$WORK/calendar/credentials.json"
export CALENDAR_TOKEN="$WORK/calendar/token.json"
export CALENDAR_IDS="primary"
export CALENDAR_TZ=""

# Optional `claude -p` model overrides (empty = default model).
export CLASSIFY_MODEL=""   # e.g. "haiku"
export ANALYZE_MODEL=""    # e.g. "sonnet"

export USE_EU_ENDPOINT="0" # 1 = AssemblyAI EU data residency
export WATCH_INTERVAL="30"
export MAX_TRIES="3"
export AUTO_GIT="1"        # 1 = auto commit+push each note, 0 = off
