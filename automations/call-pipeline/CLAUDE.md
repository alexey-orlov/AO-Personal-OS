# call-pipeline — agent notes

Voice Memo (iCloud-synced to this Mac) → AssemblyAI transcript → Google Calendar lookup at the recording-start timestamp → Claude classifies the call on three axes (TYPE + CONTEXT folder + COACHING yes/no, calendar metadata fed in) → Claude analyses with `.claude/skills/<type>/SKILL.md` (calendar metadata fed in as context) → note in `context/areas/<area>/calls/<sub-context>/` (calendar header prepended; notes live next to the area's wiki page) → if `coaching: yes`, Claude runs the `english-coaching` skill on the same transcript → coaching note in `outputs/english-coaching/` (flat folder; same `${stamp}_${type}_${src_id}.md` filename, easy to correlate). The note(s) are committed + pushed together in a single commit. After the push, `automations/coaching-notify/notify.sh` is invoked with the coaching note path (when one was produced) — it generates a short digest (via the `english-coaching-digest` skill) and ships it to Telegram (via `automations/telegram/`) with a link to the just-pushed file. Send is non-fatal: a missed message never breaks the pipeline. Finally, the `context-update` skill folds the new call note into the context wiki (`context/` — project pages + index), committed separately as `context: fold <note>`; also non-fatal — anything missed is caught by the next interactive `/context-update` sweep via the ledger (`context/_meta/processed.txt`).

## English-coaching gate (two layers)
Test recordings and predominantly-RU/UA calls (where Alex's English is just scattered terms) must NOT produce coaching reports or Telegram digests:
1. **Classifier gate (free).** `classify` Axis 3 returns `coaching: yes|no`; `process_one.sh` skips the whole coaching invocation on `no`. Missing/malformed `coaching:` line falls back to `yes` (run it) so a classifier format hiccup can't silently kill coaching.
2. **Skill bail-out (belt-and-braces).** If coaching runs anyway and the `english-coaching` skill finds <~150 words of Alex's own English (or no readable transcript), it emits a `No coaching performed: …` sentinel line; `process_one.sh` greps for the sentinels (`No coaching performed:`, `Input does not look like a readable transcript`) and discards the output — no note, no commit, no Telegram. The "Could not identify … which speaker" bail-out IS still saved, because it flags a real call needing a manual re-run.

## Output foldering (context taxonomy)
`classify` returns three lines — `type:` (picks the analysis skill + filename), `folder:` (the logical meeting context `<area>[/<sub>]`; `process_one.sh` maps it to `context/areas/<area>/calls/<sub>` on disk, so notes sit next to the area's wiki page), and `coaching:` (yes/no — see the gate section above). The folder dimension is orthogonal to type. Valid contexts:
- `softserve` — SoftServe advisory / enablement / R&D.
- `gigacloud/product-issues-sukhenko` · `gigacloud/product-team-weekly` · `gigacloud/other` — GigaCloud-internal (Alex is CPO); the two recurring weeklies get their own folder, everything else → `other`.
- `job-search/intro-chats` — recruiter/talent-lead chats NOT tied to a specific vacancy.
- `job-search/vacancy-interviews/<company-slug>` — interviews/case presentations/recruiter debriefs tied to a specific role; slug = the HIRING company (not the recruiting firm), `_unknown` if unidentifiable.
- `laba` — Laba PM-course tutoring.
- `other` — top-level catch-all / low-confidence fallback.

`process_one.sh` sanitises the returned folder (lowercase, `[a-z0-9/_-]` only, neutralises `..`, strips slashes) before `mkdir -p`, so a malformed model response can't escape `context/areas/`. Only call notes are foldered — `english-coaching` stays flat under `outputs/english-coaching/`. To add or rename a context, edit Axis 2 of `.claude/skills/classify/SKILL.md`; no script change needed (folders are created on demand).

## Commands
- Setup (per machine): `./setup.sh`
- Smoke test one file: `source config.sh && ./process_one.sh "$(find "$VOICE_MEMOS_DIR" -name '*.m4a' -type f | head -1)"`
- Watcher (foreground): `./watch.sh`
- Background agent: copy `com.user.callpipeline.plist` → `~/Library/LaunchAgents/`, then `launchctl load` it.

## Design facts — do not "fix" without reason
- Skills are INLINED via `claude -p --append-system-prompt "$(cat .claude/skills/<name>/SKILL.md)"`. We cat the whole file — the model tolerates the YAML frontmatter as preamble — rather than relying on Claude Code's skill auto-trigger, because auto-trigger does not fire in headless `claude -p`. The same files double as user-invocable slash commands in interactive Claude Code (that's why they have the `name`/`description`/`user-invocable` frontmatter).
- Analysis is pure stdin→stdout (transcript in, Markdown out): no tools, no permission flags.
- EXCEPTION: the final context-update step is the ONE tool-enabled headless call (`--allowedTools "Read,Glob,Grep,Edit,Write"`, `--max-turns 40`) — it edits `context/` but deliberately has NO Bash; the commit is done by the script via `git_sync.sh` (`context:` message). Gated by `CONTEXT_UPDATE` in `config.sh` (default 1); model override `CONTEXT_MODEL`.
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
- **Token expiry — Testing-mode trap (RESOLVED 2026-06-11).** The OAuth app (GCP project `true-conduit-473514-q3`, "AO-Personal-OS") sat in "Testing" publishing status, so Google invalidated the refresh token every 7 days (`invalid_grant: Token has been expired or revoked`). Fixed by publishing the app to "In production" (Google Cloud Console → Google Auth Platform → Audience) and re-minting the token once — production-status refresh tokens do not auto-expire. The app stays unverified (fine for a single personal user; consent screen shows an "unverified app" warning you click through). A token can still die in rare cases: manual revocation at myaccount.google.com, ~6 months of zero use, or reverting the app to Testing. Recovery: delete `.work/calendar/token.json`, re-run consent — `source config.sh && .work/venv/bin/python3 -c "from google_auth_oauthlib.flow import InstalledAppFlow; from pathlib import Path; import os; s=['https://www.googleapis.com/auth/calendar.readonly']; c=InstalledAppFlow.from_client_secrets_file(os.environ['CALENDAR_CREDS'], s).run_local_server(port=0); Path(os.environ['CALENDAR_TOKEN']).write_text(c.to_json())"` — then backfill missed headers: grep notes for `Calendar match skipped`, take each note's `_source:` filename timestamp, run `calendar_lookup.py <iso-ts> /tmp/h /tmp/c`, and replace the skipped line with the `/tmp/h` content.
- Recording timestamp is parsed from the Voice Memo filename (`YYYYMMDD HHMMSS-...`), with file-mtime fallback.
- Match rule: event whose `[start - CALENDAR_PRE_BUFFER_MIN, end + CALENDAR_POST_BUFFER_MIN]` contains the timestamp (defaults: 10 min before, 5 min after — covers recordings started slightly early or late). Only the recording-start timestamp is used; recording length is irrelevant. Tiebreak: prefer events with attendees, then shorter duration. All-day events are ignored.
- **Duration guardrail (`CALENDAR_MAX_EVENT_MIN`, default 480 = 8h).** Timed events longer than this are rejected before matching. A multi-day block (vacation, OOO, travel, conference) is a *timed* event with attendees, so it dodges the all-day filter and the recording-start timestamp can land anywhere inside its multi-day span — producing an obviously-wrong match that even wins the "has attendees" tiebreak when it's the only candidate (this happened: an 11.6-day "Anna vacation" block matched a real Jumpstart call on 2026-06-11). 8h clears the longest legitimate workshop while killing multi-day blocks. Bump the env var only if a genuine full-day offsite needs to match.
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
