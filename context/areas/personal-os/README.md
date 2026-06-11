# Personal OS (this repo)

_status: live and under active build-out — call pipeline, git-autosync, inbox-sweep running; context tree reorganized into per-area folders 2026-06-11_
_updated: 2026-06-11_

## Snapshot

- Purpose: reusable skills + automations + committed artefacts for AI-assisted work, git-synced across devices.
- Running automations: call-pipeline (launchd watcher → AssemblyAI transcript → classified note + coaching report → Telegram digest), git-autosync (auto-commit/push within ~30 s, periodic pull), coaching-notify.
- Interactive routines: inbox-sweep (+ loop wrapper) for Gmail/LinkedIn reply drafts; draft-message; re-engagement-outreach; lsn-recruiters-search; book-finder/-shortlist.
- Context wiki: `context/index.md` + per-area folders `context/areas/<area>/` (README.md = live state, `calls/` = pipeline-routed notes, `docs/` = manually added materials, optional subproject pages). Updated only via the `context-update` skill; every new call note is auto-folded in by the pipeline hook.

## Active threads

- Context wiki bedding-in — watch the first unattended pipeline-hook runs against the new `context/areas/` layout; sweep with `/context-update` to catch anything missed.

## People

- -

## Decisions

- 2026-06-11 — Context approach: curated-wiki memory (Karpathy/GBrain style) over append-only logs or RAG; updates only via the `context-update` skill.
- 2026-06-11 — Call notes live in the context tree (`context/areas/<area>/calls/`), not `outputs/` — they are project context; `outputs/` keeps only non-context streams (english-coaching, inbox-sweep log).

## Open loops

- **Calendar OAuth token expired** — notes since Jun 8 carry `invalid_grant` instead of calendar headers; re-run consent or publish the OAuth app to production (procedure in `automations/call-pipeline/CLAUDE.md`); optionally backfill Jun 8–9 headers.
- Duplicate notes exist from re-processing the same recordings (softserve Jun 8–9 pairs, archive-resale Emily call ×3) — decide whether to prune.
- Reload the call-pipeline launchd agent at some point so the long-lived watcher picks up the new `OUT_DIR` (per-run behavior is already correct — `process_one.sh` re-sources config).

## Activity

- 2026-06-11 — context tree reorganized: call notes + manual transcripts moved into `context/areas/<area>/{calls,docs}/`; wiki pages became area READMEs; pipeline + skills + docs updated.
- 2026-06-11 — context wiki + `context-update` skill + pipeline hook added; ledger seeded with all existing notes.
- ~2026-06-10 — git-autosync automation added; classify upgraded to 3 axes (english-coaching gate). (inferred from repo state)
- 2026-06-09 — batch re-processing of Jun 8–9 recordings produced duplicate notes.
