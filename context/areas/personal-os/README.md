# Personal OS (this repo)

_status: live and under active build-out — call pipeline, git-autosync, inbox-sweep, second-brain pipeline running; build backlog tracked in Apple Notes (_ToDo). Document-rendering QA on this Mac moved to QuickLook 2026-09-11 (soffice `--convert-to` is dead)_
_updated: 2026-11-25_

## Snapshot

- Purpose: reusable skills + automations + committed artefacts for AI-assisted work, git-synced across devices.
- Strategic direction: build this as a reference model for personal→team AI OS (scale from solo to team use) — captured in Apple Notes (_ToDo).
- Running automations: call-pipeline (launchd watcher → AssemblyAI transcript → classified note + coaching report → Telegram digest), git-autosync (auto-commit/push within ~30 s, periodic pull), coaching-notify, podcast-streaming (n8n cloud — daily YouTube-podcast digest to Telegram + Gmail at 07:00 Kyiv; v3 with dual-path fetch + persistent ledger after the Jun 9–11 feed-throttling incident, see `automations/podcast-streaming/README.md`).
- Interactive routines: inbox-sweep (+ loop wrapper) for Gmail/LinkedIn reply drafts; draft-message; re-engagement-outreach; lsn-recruiters-search; book-finder/-shortlist.
- Context wiki: `context/index.md` + per-area folders `context/areas/<area>/` (README.md = live state, `calls/` = pipeline-routed notes, `docs/` = manually added materials, optional subproject pages). Updated only via the `context-update` skill; every new call note is auto-folded in by the pipeline hook.

## Active threads

- Context wiki bedding-in — watch the first unattended pipeline-hook runs against the new `context/areas/` layout; sweep with `/context-update` to catch anything missed.
- Build backlog — tracked in Apple Notes (_ToDo); new 2026-06-13 task: produce a comprehensive backlog of Personal OS improvements.

## People

- -

## Decisions

- 2026-06-11 — Context approach: curated-wiki memory (Karpathy/GBrain style) over append-only logs or RAG; updates only via the `context-update` skill.
- 2026-06-11 — Call notes live in the context tree (`context/areas/<area>/calls/`), not `outputs/` — they are project context; `outputs/` keeps only non-context streams (english-coaching, inbox-sweep log).

## Open loops

- **Decide whether to blanket-allow `python3` in the repo's Claude Code permission allowlist.** 88 Bash-prefix rules were added to `.claude/settings.json` on 2026-09-11 to stop a permission-prompt storm during deck builds; `python3` was deliberately left prompting pending Alex's call, since it is the one prefix that can do anything. (chat, 2026-09-11)
- **Long-lived Claude token for unattended runs — done 2026-11-25.** Alex saved a one-year `claude setup-token` token to the Keychain item `CLAUDE_CODE_OAUTH_TOKEN` on this Mac (KN7X2Y65NX); a headless `claude -p` call with the pipeline's own `config.sh` now succeeds, so the call pipeline and the other unattended jobs (apple-notes-sync among them) authenticate again. Pasting into the hidden prompt of `security … -w` failed, so a new helper, `automations/claude-auth/save-token.sh`, saves a token from the clipboard (checked, newline-proof, never printed); the claude-auth README, the alert text and the pipeline README point to it. **Renewal due around 2027-11-25:** `claude setup-token`, copy the token, run `save-token.sh` (`automations/claude-auth/README.md`). (chat, 2026-11-25)
- Duplicate notes exist from re-processing the same recordings (softserve Jun 8–9 pairs, archive-resale Emily call ×3) — decide whether to prune.
- (Cosmetic, optional) Reload the call-pipeline launchd agent to refresh the watcher's log banner to the new `OUT_DIR`. Not required — note routing is already correct since `process_one.sh` re-sources config every run; the watcher only uses `OUT_DIR` for a startup mkdir + log line.

## Activity

- 2026-11-25 — Unattended `claude` runs authenticate again (chat, 2026-11-25) — a one-year token in Keychain (`CLAUDE_CODE_OAUTH_TOKEN`), saved with the new `automations/claude-auth/save-token.sh`; the four recordings waiting since 11-24 were processed by hand that morning: the [ALSO follow-up](../softserve/calls/2026-11-25_092146_default_202611240904364F05371A.md), the [11-24 1:1](../softserve/calls/2026-11-25_092814_one-on-one_20261124144031AE96DFF0.md), the [ALSO prep call](../softserve/calls/2026-11-25_091841_default_20261125063320BAC4658D.md) and the [Semtech intro call](../softserve/calls/2026-11-25_094002_default_2026112508331879C4E3FA.md).
- 2026-11-09 — Three waiting recordings processed by hand (chat, 2026-11-09): the 11-09 Oracle Marketplace build session (the note covers the meeting only, at Alex's request), the 11-09 R&D session and the 10-29 Numerix workshop, all marked done in the watcher's ledger. The cause was the missing long-lived token, fixed 2026-11-25 (open loops); the stale calendar-OAuth loop is gone (fixed 2026-06-11; the 11-09 lookups authenticated). One recording's AssemblyAI upload was reset five times while a same-size one went through, and a re-encoded copy transcribed at once, so `transcribe.py` now retries a reset upload once with a re-encoded copy by itself ([ops note](../../../automations/call-pipeline/CLAUDE.md)).
- 2026-09-11 — `.claude/references/document-rendering.md` rewritten to current truth (chat, 2026-09-11) — it had stacked three contradictory dated updates; now one verified state table: **QuickLook (`qlmanage`) with the zip-level single-slide trick is THE deck/doc QA path** (~0.4 s/slide), **soffice `--convert-to` is dead on this Mac** (LibreOffice 26.2.4.2 answers `--version` but hangs or exits 255 with an empty outdir — verified 09-07, 09-09, 09-11 across fresh profiles), `pdftoppm` only for PDFs that already exist, PowerPoint/Keynote AppleScript export a last resort. Same day 88 Bash-prefix allow rules were added to `.claude/settings.json` to end the permission-prompt storm during deck builds.
- 2026-06-12 — Second-brain restructure: knowledge tree v2 (goals-tasks.md, insights/, explore/ briefs, book-shortlist moved under knowledge/); Drop Zone goal/todo captures moved from this page's open loops into [goals-tasks.md](../../knowledge/goals-tasks.md) (g1–g2, t1–t5); root `inbox/` retired; per-category Telegram notifications added.
- 2026-06-12 — Drop Zone sweep: 5 automation ideas + team-OS direction goal captured; 2 explore topics → explore queue; AI engineering eras screenshot → knowledge insights.
- 2026-06-11 — podcast-streaming v3 documented in-repo (n8n cloud; rebuilt for resilience after six of seven YouTube feeds silently failed Jun 9–10, all seven Jun 11).
- 2026-06-11 — context tree reorganized: call notes + manual transcripts moved into `context/areas/<area>/{calls,docs}/`; wiki pages became area READMEs; pipeline + skills + docs updated.
- 2026-06-11 — context wiki + `context-update` skill + pipeline hook added; ledger seeded with all existing notes.
- ~2026-06-10 — git-autosync automation added; classify upgraded to 3 axes (english-coaching gate). (inferred from repo state)
