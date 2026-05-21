# call-pipeline

Voice Memo (synced to this Mac) -> AssemblyAI transcript -> Claude classifies the
call type -> Claude analyses with the matching `skills/call-analysis/<type>.md`
template -> Markdown note in `outputs/call-notes/`, auto-committed and pushed.

## Files
- `config.sh`     paths, key source, toggles (auto-detects Voice Memos folder + claude/python)
- `setup.sh`      one-time: builds `.work/venv`, installs the SDK, checks tools
- `transcribe.py` one file -> speaker-labelled transcript (kept local in `.work/`)
- `process_one.sh` orchestrates one recording end-to-end, then calls git_sync
- `git_sync.sh`   commit + push one note (best-effort, offline-safe)
- `watch.sh`      polls the folder; processes new recordings once; fills gaps after downtime
- `com.user.callpipeline.plist` launchd agent for hands-off background running

## Privacy
Raw audio (`.work/inbox`) and transcripts (`.work/transcripts`) stay LOCAL and are
git-ignored. Only the analysis notes are committed. To version transcripts too,
move `TRANSCRIPTS` into `outputs/` in config.sh (accept the data-governance trade-off).

## Run
See the repo-root setup commands. Smoke test:

    cd ~/Documents/GitHub/AO-Personal-OS/automations/call-pipeline && source config.sh
    ./process_one.sh "$(find "$VOICE_MEMOS_DIR" -name '*.m4a' -type f | head -1)"

Background agent:

    cp com.user.callpipeline.plist ~/Library/LaunchAgents/
    launchctl load ~/Library/LaunchAgents/com.user.callpipeline.plist
    # then grant /bin/bash Full Disk Access (Privacy & Security), and reload.

## Add a call type
Create `skills/call-analysis/<label>.md` (analysis template) and add `<label>` +
its definition to `skills/call-analysis/classify.md`. That's the whole change.
