# draft-message automation

Supporting plumbing for the `/draft-message` slash-command skill at
`.claude/skills/draft-message/`. The skill orchestrates everything; this
folder only holds config + an append-only state log.

## What lives here

- `config.sh` — env vars (paths, state file). Sources
  `automations/re-engagement-outreach/config.sh` to inherit the Sheet
  config + Python venv, and `automations/telegram/config.sh` for TG creds.
- `setup.sh` — one-time per machine. Initialises `.work/state.json` and
  sanity-checks the upstream dependencies (Sheets venv, Telegram creds).
- `.work/state.json` — gitignored. Append-only audit log of every
  invocation: contact, channel decision, thread found, message-writing
  output, delivery result.

## One-time setup

```bash
./setup.sh
```

draft-message reuses `automations/re-engagement-outreach/`'s Sheets OAuth
and Python venv, so make sure that automation's `setup.sh` has been run
first. Telegram creds come from `automations/telegram/setup.sh`.

## How to invoke

Run the skill, not a script directly:

```
/draft-message
<free-form: who, what channel, what angle. Or paste a thread + intent.>
```

The skill handles channel resolution (asking when ambiguous), thread
lookup (Gmail / LinkedIn / pasted), Sheet fallback for missing addresses,
voice via `message-writing`, in-chat preview gate, and delivery
(Gmail draft or Telegram with deep-link button).

See `.claude/skills/draft-message/SKILL.md` for the full spec, including
the rule for when to invoke `/draft-message` vs `/message-writing`.

## State + idempotency

`.work/state.json` is an append-only audit log. There is no per-contact
deduplication at the campaign level (unlike `re-engagement-outreach`) —
each invocation is intentionally one-off. Idempotency for email comes
from Gmail's `list_drafts` check, which flags existing drafts on the same
thread before creating a new one. LIN has no analogous dedup since LIN
drafts only live in Telegram.

Safe to truncate `.work/state.json` manually if it grows long; the skill
re-initialises it to `{"drafts": []}` on next run if missing.
