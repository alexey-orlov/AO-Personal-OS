# call-pipeline — agent notes

Voice Memo (iCloud-synced to this Mac) → AssemblyAI transcript → Claude classifies the call → Claude analyses with `skills/call-analysis/<type>.md` → note in `outputs/call-notes/`, auto-committed + pushed.

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

## Files
`config.sh` · `setup.sh` · `transcribe.py` · `process_one.sh` · `git_sync.sh` · `watch.sh` · `com.user.callpipeline.plist`
