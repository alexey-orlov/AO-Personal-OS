# coaching-notify — orchestrator: report → digest → Telegram

Single small script that turns an `english-coaching` report file into a Telegram message: runs the `english-coaching-digest` skill on it (agentic content step), builds the GitHub link from `git remote.origin.url`, and pipes the result into `automations/telegram/telegram_send.sh`.

This is the **only** place that composes those three pieces together. Callers (call-pipeline, the `english-coaching` skill in interactive mode) just invoke `notify.sh <path>` — they don't know about the digest skill, Telegram, or URL formatting.

## Dependencies (one-way)

- `.claude/skills/english-coaching-digest/SKILL.md` — produces the digest body.
- `automations/telegram/telegram_send.sh` — sends the message.
- `git` + `claude` on PATH (or in the well-known locations the script falls back to, same as the call-pipeline).

## Usage

```
automations/coaching-notify/notify.sh outputs/english-coaching/2026-05-22_*.md
```

Exit 0 on success, non-zero on any failure (missing report, missing dependency, empty digest, Telegram send error). Callers should suffix `|| true` if they want a missed message to be non-fatal — which is the right default, since the report itself is already saved and is the source of truth.

## Called from

- `automations/call-pipeline/process_one.sh` — after `git_sync.sh` succeeds, so the GitHub link resolves immediately.
- `.claude/skills/english-coaching/SKILL.md` — at the end of interactive Step 6, after the report file is written. (Link 404s until the user commits and pushes; that's expected.)
