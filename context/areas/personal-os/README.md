# Personal OS (this repo)

_status: live and under active build-out — call pipeline, git-autosync, inbox-sweep, second-brain pipeline running; build backlog tracked in [knowledge/goals-tasks.md](../../knowledge/goals-tasks.md)_
_updated: 2026-06-12_

## Snapshot

- Purpose: reusable skills + automations + committed artefacts for AI-assisted work, git-synced across devices.
- Strategic direction: build this as a reference model for personal→team AI OS (scale from solo to team use) — goal g1 in [knowledge/goals-tasks.md](../../knowledge/goals-tasks.md).
- Running automations: call-pipeline (launchd watcher → AssemblyAI transcript → classified note + coaching report → Telegram digest), git-autosync (auto-commit/push within ~30 s, periodic pull), coaching-notify, podcast-streaming (n8n cloud — daily YouTube-podcast digest to Telegram + Gmail at 07:00 Kyiv; v3 with dual-path fetch + persistent ledger after the Jun 9–11 feed-throttling incident, see `automations/podcast-streaming/README.md`).
- Interactive routines: inbox-sweep (+ loop wrapper) for Gmail/LinkedIn reply drafts; draft-message; re-engagement-outreach; lsn-recruiters-search; book-finder/-shortlist.
- Context wiki: `context/index.md` + per-area folders `context/areas/<area>/` (README.md = live state, `calls/` = pipeline-routed notes, `docs/` = manually added materials, optional subproject pages). Updated only via the `context-update` skill; every new call note is auto-folded in by the pipeline hook.

## Active threads

- Context wiki bedding-in — watch the first unattended pipeline-hook runs against the new `context/areas/` layout; sweep with `/context-update` to catch anything missed.
- Build backlog — captured automation ideas live as tasks t1–t4 in [knowledge/goals-tasks.md](../../knowledge/goals-tasks.md) (GDrive navigator, vacancy screener, CV optimizer, company researcher). Prioritization TBD.

## People

- -

## Decisions

- 2026-06-11 — Context approach: curated-wiki memory (Karpathy/GBrain style) over append-only logs or RAG; updates only via the `context-update` skill.
- 2026-06-11 — Call notes live in the context tree (`context/areas/<area>/calls/`), not `outputs/` — they are project context; `outputs/` keeps only non-context streams (english-coaching, inbox-sweep log).

## Open loops

- **Calendar OAuth token expired** — notes since Jun 8 carry `invalid_grant` instead of calendar headers; re-run consent or publish the OAuth app to production (procedure in `automations/call-pipeline/CLAUDE.md`); optionally backfill Jun 8–9 headers.
- Duplicate notes exist from re-processing the same recordings (softserve Jun 8–9 pairs, archive-resale Emily call ×3) — decide whether to prune.
- (Cosmetic, optional) Reload the call-pipeline launchd agent to refresh the watcher's log banner to the new `OUT_DIR`. Not required — note routing is already correct since `process_one.sh` re-sources config every run; the watcher only uses `OUT_DIR` for a startup mkdir + log line.

## Activity

- 2026-06-12 — Second-brain restructure: knowledge tree v2 (goals-tasks.md, insights/, explore/ briefs, book-shortlist moved under knowledge/); Drop Zone goal/todo captures moved from this page's open loops into [goals-tasks.md](../../knowledge/goals-tasks.md) (g1–g2, t1–t5); root `inbox/` retired; per-category Telegram notifications added.
- 2026-06-12 — Drop Zone sweep: 5 automation ideas + team-OS direction goal captured; 2 explore topics → explore queue; AI engineering eras screenshot → knowledge insights.
- 2026-06-11 — podcast-streaming v3 documented in-repo (n8n cloud; rebuilt for resilience after six of seven YouTube feeds silently failed Jun 9–10, all seven Jun 11).
- 2026-06-11 — context tree reorganized: call notes + manual transcripts moved into `context/areas/<area>/{calls,docs}/`; wiki pages became area READMEs; pipeline + skills + docs updated.
- 2026-06-11 — context wiki + `context-update` skill + pipeline hook added; ledger seeded with all existing notes.
- ~2026-06-10 — git-autosync automation added; classify upgraded to 3 axes (english-coaching gate). (inferred from repo state)
