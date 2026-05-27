# re-engagement-outreach automation

Supporting plumbing for the `/re-engagement-outreach` slash-command skill at
`.claude/skills/re-engagement-outreach/`. The skill orchestrates everything;
this folder only holds the per-campaign state and a thin config that wires
up the two shared dependencies (CRM and Telegram).

## What lives here

- `config.sh` — sources `automations/crm-spreadsheet/config.sh` (Sheet
  enrichment) and `automations/telegram/config.sh` (TG creds), then exports
  the skill-specific `STATE_FILE` path.
- `.work/state.json` — per-campaign per-contact draft state (gitignored).

## What lives in the shared automation folders

- **CRM Sheet integration**: `automations/crm-spreadsheet/` — owns the venv,
  OAuth credentials, `sheets_lookup.py`, and one-time `setup.sh`. See its
  README for setup steps and the consumer pattern.
- **Telegram**: `automations/telegram/` — Keychain-backed bot token + chat
  ID, plus the `telegram_send.sh` and `telegram_send_with_button.sh`
  scripts the skill uses to deliver LIN drafts and digests.

## One-time setup

Run `automations/crm-spreadsheet/setup.sh` once (builds the venv and prints
GCP/OAuth instructions). Telegram is already set up if `/inbox-sweep` is
working on this machine.

## How to invoke

Run the skill, don't invoke any of this plumbing directly:

```
/re-engagement-outreach
<paste contact list — names, emails, LinkedIn URLs, mixed is fine>

Campaign angle: <free text, e.g. "re-engage about agentic AI work at GigaCloud">
```

The skill handles contact normalization, thread-finding (Gmail → LIN →
calendar-invite fallback), Sheet enrichment, voice via `message-writing`,
Gmail-draft creation, TG delivery, the spot-check gate, and end-of-run digest.

See `.claude/skills/re-engagement-outreach/SKILL.md` for the full spec.

## State + idempotency

`.work/state.json` tracks per-campaign per-contact progress. Re-running the
skill on the same day with the same angle resolves to the same campaign slug
and skips already-drafted contacts. A different day = a new slug = a fresh
campaign.
