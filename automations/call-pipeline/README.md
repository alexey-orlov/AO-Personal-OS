# call-pipeline

Voice Memo (synced to this Mac) -> AssemblyAI transcript -> Claude classifies the
call type -> Claude analyses with the matching `.claude/skills/<type>/SKILL.md`
template -> Markdown note in `context/areas/<area>/calls/` + (when the classifier
says the call has enough of Alex's English speech — not a test recording or a
RU/UA call) an `english-coaching` note in `outputs/english-coaching/`, auto-
committed and pushed in one commit -> `automations/coaching-notify/` generates a
short digest and ships it to Telegram with a link to the just-pushed coaching
report -> the `context-update` skill folds the note into the context wiki
(`context/areas/<area>/README.md` + `context/index.md`), committed as `context: …`.

## Files
- `config.sh`     paths, key source, toggles (auto-detects Voice Memos folder + claude/python)
- `setup.sh`      one-time: builds `.work/venv`, installs the SDK, checks tools
- `transcribe.py` one file -> speaker-labelled transcript (kept local in `.work/`)
- `process_one.sh` orchestrates one recording end-to-end, then calls git_sync
- `git_sync.sh`   commit + push one or more notes in a single commit (best-effort, offline-safe)
- `watch.sh`      polls the folder; processes new recordings once; fills gaps after downtime
- `sync_guard.sh` self-heals a wedged Mac-side Voice Memos iCloud sync (sourced by watch.sh; also runs standalone)
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
| Telegram alert "Voice Memos iCloud sync looks WEDGED" | Mac-side CloudKit import stuck even after the guard's auto-restart | run the 3 commands from the alert, open Voice Memos on the iPhone, watch for new `.m4a`; see `.work/state/sync_guard.log` |

**Voice Memos sync staleness guard.** A long-running `VoiceMemos.app`/`voicememod`
can silently stop importing from iCloud while the watcher looks healthy
(2026-07-30 incident: 9 days of recordings missed). `watch.sh` therefore runs an
hourly check via `sync_guard.sh` on TWO signals — either one triggers: (1)
`CloudRecordings.db-wal` unwritten for `SYNC_STALE_HOURS` (config.sh, default 72;
`0` disables); (2) no new `.m4a` for `M4A_STALE_HOURS` (default 96; `0` disables)
— added after the 2026-08-12 incident, where a reboot's app relaunch rewrote the
wal without importing, so signal 1 read a still-wedged sync as "recovered" for a
week. On either: restart the app stack — quit by bundle id, kill `voicememod`,
relaunch hidden — never while an `.m4a` is open for write, max one kick per 24h.
Still suspect a day after a kick ⇒ Telegram alert (General topic) with the manual
fix; the wording hedges because a genuinely quiet stretch (nothing recorded for
4+ days) also trips signal 2 — expect at most one benign alert per such stretch.
Recovery (BOTH signals fresh) clears the episode. Events log to
`.work/state/sync_guard.log`; episode markers are
`.work/state/sync_guard_kicked` / `_alerted` (cleared on recovery). Manual check
right now (no hourly gate):

    cd ~/Documents/GitHub/AO-Personal-OS/automations/call-pipeline
    ./sync_guard.sh                    # real check; may actually restart the app
    SYNC_GUARD_DRYRUN=1 ./sync_guard.sh   # look only, no kick / no alert

`sync_guard.sh` (like `watch.sh`/`config.sh`) is read once by the long-lived
agent — after editing it or changing `SYNC_STALE_HOURS`/`M4A_STALE_HOURS`, reload:
`launchctl unload ~/Library/LaunchAgents/com.user.callpipeline.plist && launchctl load ~/Library/LaunchAgents/com.user.callpipeline.plist`.

**After a macOS major upgrade:** TCC can reset. Re-check Full Disk Access for `/bin/bash` and `claude`, restart the agent, and if Claude Code misbehaves run `rm -rf /tmp/claude-$(id -u)`.

**Reset state:** stop the agent, delete the ledger, restart. NOTE: this re-seeds existing memos as *already-seen* (it does NOT reprocess them). To reprocess a specific old memo, run `process_one.sh` on it directly.
    launchctl unload ~/Library/LaunchAgents/com.user.callpipeline.plist
    rm -f .work/state/processed.log .work/state/failures.log
    launchctl load ~/Library/LaunchAgents/com.user.callpipeline.plist