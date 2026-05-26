# call-pipeline — agent notes

Voice Memo (iCloud-synced to this Mac) → AssemblyAI transcript → Google Calendar lookup at the recording-start timestamp → Claude classifies the call on two axes (TYPE + CONTEXT folder, calendar metadata fed in) → Claude analyses with `.claude/skills/<type>/SKILL.md` (calendar metadata fed in as context) → note in `outputs/call-notes/<context-folder>/` (calendar header prepended) → Claude runs the `english-coaching` skill on the same transcript → coaching note in `outputs/english-coaching/` (flat folder; same `${stamp}_${type}_${src_id}.md` filename, easy to correlate). Both notes are committed + pushed together in a single commit. After the push, `automations/coaching-notify/notify.sh` is invoked with the coaching note path — it generates a short digest (via the `english-coaching-digest` skill) and ships it to Telegram (via `automations/telegram/`) with a link to the just-pushed file. Send is non-fatal: a missed message never breaks the pipeline.

## Output foldering (context taxonomy)
`classify` returns two lines — `type:` (picks the analysis skill + filename) and `folder:` (the meeting-context subfolder under `outputs/call-notes/`). The folder dimension is orthogonal to type. Valid folders:
- `softserve` — SoftServe advisory / enablement / R&D.
- `gigacloud/product-issues-sukhenko` · `gigacloud/product-team-weekly` · `gigacloud/other` — GigaCloud-internal (Alex is CPO); the two recurring weeklies get their own folder, everything else → `other`.
- `job-search/intro-chats` — recruiter/talent-lead chats NOT tied to a specific vacancy.
- `job-search/vacancy-interviews/<company-slug>` — interviews/case presentations/recruiter debriefs tied to a specific role; slug = the HIRING company (not the recruiting firm), `_unknown` if unidentifiable.
- `laba` — Laba PM-course tutoring.
- `other` — top-level catch-all / low-confidence fallback.

`process_one.sh` sanitises the returned folder (lowercase, `[a-z0-9/_-]` only, neutralises `..`, strips slashes) before `mkdir -p`, so a malformed model response can't escape `call-notes/`. Only `call-notes` is foldered — `english-coaching` stays flat. To add or rename a context, edit Axis 2 of `.claude/skills/classify/SKILL.md`; no script change needed (folders are created on demand).

## Commands
- Setup (per machine): `./setup.sh`
- Smoke test one file: `source config.sh && ./process_one.sh "$(find "$VOICE_MEMOS_DIR" -name '*.m4a' -type f | head -1)"`
- Watcher (foreground): `./watch.sh`
- Background agent: copy `com.user.callpipeline.plist` → `~/Library/LaunchAgents/`, then `launchctl load` it.

## Design facts — do not "fix" without reason
- Skills are INLINED via `claude -p --append-system-prompt "$(cat .claude/skills/<name>/SKILL.md)"`. We cat the whole file — the model tolerates the YAML frontmatter as preamble — rather than relying on Claude Code's skill auto-trigger, because auto-trigger does not fire in headless `claude -p`. The same files double as user-invocable slash commands in interactive Claude Code (that's why they have the `name`/`description`/`user-invocable` frontmatter).
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
- Match rule: event whose `[start - CALENDAR_PRE_BUFFER_MIN, end + CALENDAR_POST_BUFFER_MIN]` contains the timestamp (defaults: 10 min before, 5 min after — covers recordings started slightly early or late). Only the recording-start timestamp is used; recording length is irrelevant. Tiebreak: prefer events with attendees, then shorter duration. All-day events are ignored.
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
- `process_one.sh`, `git_sync.sh`, `transcribe.py`, and `.claude/skills/**/SKILL.md` are re-read on every run (the watcher invokes `process_one.sh` per recording, which `source`s `config.sh` and exec's the rest). No reload needed.
- Never reboot the Mac to pick up a change — just reload the launchd agent.
