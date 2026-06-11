# Personal OS (this repo)

_status: live and under active build-out — call pipeline, git-autosync, inbox-sweep running; context wiki added 2026-06-11_
_updated: 2026-06-11_

## Snapshot

- Purpose: reusable skills + automations + committed artefacts for AI-assisted work, git-synced across devices.
- Running automations: call-pipeline (launchd watcher → AssemblyAI transcript → classified note + coaching report → Telegram digest), git-autosync (auto-commit/push within ~30 s, periodic pull), coaching-notify.
- Interactive routines: inbox-sweep (+ loop wrapper) for Gmail/LinkedIn reply drafts; draft-message; re-engagement-outreach; lsn-recruiters-search; book-finder/-shortlist.
- Context wiki (`context/index.md` + `projects/`) + `context-update` skill + pipeline hook — added 2026-06-11; every new call note is auto-folded in.

## Active threads

- Context wiki bedding-in — watch the first unattended pipeline-hook runs; sweep with `/context-update` to catch anything missed.

## People

- -

## Decisions

- 2026-06-11 — Context approach: curated-wiki memory in `context/` (Karpathy/GBrain style) over append-only logs or RAG; updates only via the `context-update` skill.

## Open loops

- **Calendar OAuth token expired** — notes since Jun 8 carry `invalid_grant` instead of calendar headers; re-run consent or publish the OAuth app to production (procedure in `automations/call-pipeline/CLAUDE.md`); optionally backfill Jun 8–9 headers.
- Duplicate notes exist from re-processing the same recordings (softserve Jun 8–9 pairs, archive-resale Emily call ×3) — decide whether to prune.

## Activity

- 2026-06-11 — context wiki + `context-update` skill + pipeline hook added; ledger seeded with all 22 existing notes.
- ~2026-06-10 — git-autosync automation added; classify upgraded to 3 axes (english-coaching gate). (inferred from repo state)
- 2026-06-09 — batch re-processing of Jun 8–9 recordings produced duplicate notes.
