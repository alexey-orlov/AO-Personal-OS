# call-pipeline — agent notes

Voice Memo (iCloud-synced to this Mac) → AssemblyAI transcript → Google Calendar lookup at the recording-start timestamp → Claude classifies the call → Claude analyses with `skills/call-analysis/<type>.md` (calendar metadata fed in as context) → note in `outputs/call-notes/` (calendar header prepended), auto-committed + pushed.

## Commands
- Setup (per machine): `./setup.sh`
- Smoke test one file: `source config.sh && ./process_one.sh "$(find "$VOICE_MEMOS_DIR" -name '*.m4a' -type f | head -1)"`
- Watcher (foreground): `./watch.sh`
- Background agent: copy `com.user.callpipeline.plist` → `~/Library/LaunchAgents/`, then `launchctl load` it.

## Design facts — do not "fix" without reason
- Skills are INLINED via `claude -p --append-system-prompt "$(cat skill.md)"`. They are NOT Claude Code auto-loaded skills, because skill auto-trigger does not fire in headless `claude -p`.
- Analysis is pure stdin→stdout (transcript in, Markdown out): no tools, no permission flags.
- `config.sh` resolves `claude` and `python` by ABSOLUTE path so the launchd background job doesn't depend on PATH.
- Transcription routing: `speech_models=["universal-3-pro","universal-2"]`. Universal-3 Pro covers en/es/pt/fr/de/it natively; RU/UA fall back to Universal-2.

## Environment gotchas (already paid for in debugging)
- The launchd job runs as `/bin/bash` and needs its OWN Full Disk Access grant to read the Voice Memos folder — Terminal's grant does not transfer.
- Keychain: use `security add-generic-password -U …` to OVERWRITE a key; plain `add` errors "already exists" and silently keeps the old value.
- The Voice Memos store is a TCC-protected Group Container, auto-detected into `$VOICE_MEMOS_DIR`. It is invisible on iPhone and not on iCloud.com; only an iCloud-synced Mac exposes the real `.m4a` files.
- iCloud sync to the Mac takes minutes and occasionally needs Voice Memos opened on the phone to push.
- `.work/` holds audio + transcripts (private, git-ignored).

## Calendar matching
- `calendar_lookup.py` calls Google Calendar API directly (no MCP). OAuth Desktop-app credentials live in `.work/calendar/credentials.json`; refreshable token in `.work/calendar/token.json` (both git-ignored).
- Recording timestamp is parsed from the Voice Memo filename (`YYYYMMDD HHMMSS-...`), with file-mtime fallback.
- Match rule: event whose `[start, end]` contains the timestamp. Tiebreak: prefer events with attendees, then shorter duration. All-day events are ignored.
- Output: a Markdown header block prepended to the note (visible to the reader) AND a plain-text context block injected into the analyser's stdin between `<<<CALENDAR_EVENT_CONTEXT>>>` markers. If no match, header says so and no context is injected.
- Failures (no creds, API down, bad timestamp) degrade to "no match" — the pipeline never breaks because of the calendar step.

## Files
`config.sh` · `setup.sh` · `transcribe.py` · `calendar_lookup.py` · `process_one.sh` · `git_sync.sh` · `watch.sh` · `com.user.callpipeline.plist`

## Deploying changes
- Editing `watch.sh` or `config.sh` requires reloading the launchd agent — they are read once by the long-lived watcher process. Reload with:
  ```
  launchctl unload ~/Library/LaunchAgents/com.user.callpipeline.plist
  launchctl load   ~/Library/LaunchAgents/com.user.callpipeline.plist
  ```
- `process_one.sh`, `git_sync.sh`, `transcribe.py`, and `skills/**/*.md` are re-read on every run (the watcher invokes `process_one.sh` per recording, which `source`s `config.sh` and exec's the rest). No reload needed.
- Never reboot the Mac to pick up a change — just reload the launchd agent.
