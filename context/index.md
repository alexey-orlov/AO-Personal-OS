# Context wiki — index

One-screen map of what Alex is working on right now. Maintained by the `context-update` skill (`/context-update`); the call-pipeline updates it automatically after every call note. Area pages distill the artifact stream — current truth with provenance links, not a log.

**For agents:** read this file first for any task touching Alex's work; open the relevant `areas/<area>/README.md` before answering area questions. Update only via `context-update` — don't hand-edit.

## Now (2026-06-11)

- Ramping into a part-time SoftServe engagement (~50–80 h/mo): product lead for the R&D Delivery Unit + agentic-AI SME. In flight: Oracle-partnership onboarding, R&D strategy-session design, Iris client bootcamp (Product stream) starting ~Jun 29.
- Job search (VP Product / CPO, US) active: Zipify Head-of-Product process live (deep-dive Jun 2); Archive Resale closed (rejected May 22 at final round); recruiter pipeline + LSN outreach waves running.
- GigaCloud CPO duties ongoing — no call artifacts in the OS yet.
- Laba PM-course tutoring ongoing — no artifacts yet.
- Building out this Personal OS: call pipeline + git-autosync + context wiki live; context tree reorganized into per-area folders (Jun 11); open issue: calendar OAuth token expired (notes since Jun 8 lack calendar headers).
- US relocation planned, visa timing tentatively Sep–Oct 2026 (per SoftServe 1:1; positioning rules in [positioning](areas/job-search/positioning.md)).

## Areas

Each area folder holds: `README.md` (live state), `calls/` (pipeline-routed call notes), `docs/` (manually added materials), and optional `<subproject>.md` pages as the area grows.

| Area | Status | Last artifact |
|---|---|---|
| [SoftServe](areas/softserve/README.md) | ramping in: part-time R&D product lead + agentic SME; Oracle onboarding, strategy-session prep, Iris bootcamp ~Jun 29 | 2026-06-09 |
| [Job search](areas/job-search/README.md) | Zipify HoP process live; recruiter pipeline + outreach waves; Archive Resale closed | 2026-06-02 |
| [GigaCloud](areas/gigacloud/README.md) | CPO role; no call artifacts in the OS yet | - |
| [Laba](areas/laba/README.md) | PM-course tutoring; no artifacts yet | - |
| [Personal OS](areas/personal-os/README.md) | pipeline + autosync + context wiki live; open: calendar OAuth expired | 2026-06-11 |

## Cross-area reference

- [areas/job-search/positioning.md](areas/job-search/positioning.md) — job-search positioning: public vs. backend framing, recruiter story, target roles.
- [book-shortlist.md](book-shortlist.md) — reading shortlist (not a project).
- `people/` — person pages, created on demand by `context-update` for recurring people.
- `areas/other/` — classifier catch-all for unrouted calls (mostly junk; `context-update` junk-gates it).

## Plumbing

- Updater: `.claude/skills/context-update/` — sweep via `/context-update`, automatic single-note runs from the call-pipeline hook.
- Call-note taxonomy under `areas/<area>/calls/` is owned by Axis 2 of `.claude/skills/classify/SKILL.md`.
- Ingestion ledger: `_meta/processed.txt` (repo-root-relative path per processed artifact).
- Drop zone: `inbox/` at repo root (git-ignored; raw files stay local) — next sweep folds files in, then moves them to `inbox/processed/`.
