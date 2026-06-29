# PM-OS Survey — context, skills & subagent patterns

Survey of how the most popular & credible **Product-Manager agent systems** on GitHub implement
**context management, skills, and subagents** — the *mechanism*, not just the topic — as a source of
inspiration for the SoftServe **AI-PM Jumpstart** program (see `../jumpstart-pm-program-one-pager.md`).

**74 repos ranked · 48 deep-dived (actual files read, 902 file fetches) · 79 canonical patterns · compiled 2026-06-29.**

## Files
- **`PM-OS-survey.xlsx`** — the deliverable. 13 tabs. Drag into Google Drive → opens as a multi-tab Google Sheet.
  - `00 Read me` · `01 Repos (ranked)` · `02–04` pattern taxonomies (context / skills / subagents) ·
    `05–07` per-repo **implementations with file-level source links** · `08` standout ideas ·
    `09` jumpstart takeaways · `10` cross-repo insights · `11` repo×pattern adoption matrix · `12` newly-discovered patterns.
- **`PM-OS-survey-report.md`** — lead-with-the-answer narrative: bottom line, curated shortlist by program station,
  full taxonomies, the 10 biggest themes, takeaways, gaps/caveats, and a 74-repo source appendix.
- **`csv/`** — every tab as CSV (git-diffable, importable).

## Naming discipline
Every raw pattern across every repo is mapped to one shared vocabulary (`CM-` context, `SK-` skills, `SA-` subagents),
anchored to the terms already used in the Jumpstart-PM one-pager — so the same idea is named the same way everywhere
and unique patterns are searchable without manual reconciliation.

## How it was built
Two background multi-agent workflows: (1) discovery + verify + completeness-critic → ranked candidate list;
(2) 48 deep-dive agents read the actual SKILL.md / agent / command / hook / config files, mapped each pattern to the
shared vocabulary, and a reconcile pass merged 70 raw→canonical mappings (+12 new codes) into the final taxonomy.
Regenerate from the workflow JSON with the builder scripts kept in the session scratchpad.
