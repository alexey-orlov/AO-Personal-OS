# call-pipeline

Voice Memo (synced to this Mac) -> AssemblyAI transcript -> Claude classifies the
call type -> Claude analyses with the matching `.claude/skills/<type>/SKILL.md`
template -> Markdown note in `outputs/call-notes/` + an `english-coaching` note
in `outputs/english-coaching/`, both auto-committed and pushed in one commit
-> `automations/coaching-notify/` generates a short digest and ships it to
Telegram with a link to the just-pushed coaching report.

## Files
- `config.sh`     paths, key source, toggles (auto-detects Voice Memos folder + claude/python)
- `setup.sh`      one-time: builds `.work/venv`, installs the SDK, checks tools
- `transcribe.py` one file -> speaker-labelled transcript (kept local in `.work/`)
- `process_one.sh` orchestrates one recording end-to-end, then calls git_sync
- `git_sync.sh`   commit + push one or more notes in a single commit (best-effort, offline-safe)
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
Create `.claude/skills/<label>/SKILL.md` (frontmatter + analysis template) and add
`<label>` + its definition to `.claude/skills/classify/SKILL.md`. That's the whole change.


cat >> ~/Documents/GitHub/AO-Personal-OS/automations/call-pipeline/README.md << 'EOF'

## Health check & troubleshooting

**Is the agent running?**
    launchctl list | grep callpipeline
A PID in the left column = running. Missing/`-` = not running → `launchctl load ~/Library/LaunchAgents/com.user.callpipeline.plist`.

**Watch it live:**
    tail -f /tmp/callpipeline.out.log    # activity
    tail -f /tmp/callpipeline.err.log    # errors

**Test the pipeline directly (bypasses the watcher) to isolate a problem:**
    cd ~/Documents/GitHub/AO-Personal-OS/automations/call-pipeline && source config.sh
    ./process_one.sh "$(ls -t "$VOICE_MEMOS_DIR"/*.m4a | head -1)"

**Symptom -> fix**

| Symptom | Likely cause | Fix |
|---|---|---|
| Agent not in `launchctl list` | not loaded after login | `launchctl load ...plist` |
| out.log says `seeded 0 files` (memos exist) | `/bin/bash` lacks Full Disk Access | grant `/bin/bash` FDA, reload agent |
| TCC popup for `claude` / "2.x.x" | `claude` lacks FDA | grant `~/.local/bin/claude` FDA (drag it in from Finder), reload |
| New memo never processes | recorded before agent started (seeded as seen), Mac asleep, or not synced | record after agent is up; open Voice Memos on phone to push sync; keep Mac awake |
| `[transcribe]` then "Invalid API key" | wrong/rotated AssemblyAI key | `security add-generic-password -U -a "$USER" -s ASSEMBLYAI_API_KEY -w 'KEY'` |
| `claude: command not found` | CLAUDE_BIN unresolved | check `echo $CLAUDE_BIN`; confirm `~/.local/bin/claude` exists |
| Note written but not on GitHub | git push failed (auth/offline) | run `git push` in the repo; re-enter token if asked |
| Note pushed but no Telegram message | Telegram unconfigured / network / token wrong | `automations/telegram/setup.sh`; smoke-test with `echo hi \| automations/telegram/telegram_send.sh` |
| `[skip] ... iCloud stub` | file not fully downloaded | turn off Optimize Mac Storage, or open the memo in Voice Memos |

**After a macOS major upgrade:** TCC can reset. Re-check Full Disk Access for `/bin/bash` and `claude`, restart the agent, and if Claude Code misbehaves run `rm -rf /tmp/claude-$(id -u)`.

**Reset state:** stop the agent, delete the ledger, restart. NOTE: this re-seeds existing memos as *already-seen* (it does NOT reprocess them). To reprocess a specific old memo, run `process_one.sh` on it directly.
    launchctl unload ~/Library/LaunchAgents/com.user.callpipeline.plist
    rm -f .work/state/processed.log .work/state/failures.log
    launchctl load ~/Library/LaunchAgents/com.user.callpipeline.plist
EOF
cd ~/Documents/GitHub/AO-Personal-OS && git add -A && git commit -m "docs: agent health-check & troubleshooting" && git push