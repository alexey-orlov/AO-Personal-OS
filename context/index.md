# Context wiki — index

One-screen map of what Alex is working on right now. Maintained by the `context-update` skill (`/context-update`); the call-pipeline updates it automatically after every call note. Pages distill the artifact stream in `outputs/` — current truth with provenance links, not a log.

**For agents:** read this file first for any task touching Alex's work; open the relevant `projects/` page before answering project questions. Update only via `context-update` — don't hand-edit.

## Now (2026-06-11)

- Ramping into a part-time SoftServe engagement (~50–80 h/mo): product lead for the R&D Delivery Unit + agentic-AI SME. In flight: Oracle-partnership onboarding, R&D strategy-session design, Iris client bootcamp (Product stream) starting ~Jun 29.
- Job search (VP Product / CPO, US) active: Zipify Head-of-Product process live (deep-dive Jun 2); Archive Resale closed (rejected May 22 at final round); recruiter pipeline + LSN outreach waves running.
- GigaCloud CPO duties ongoing — no call artifacts in the OS yet.
- Laba PM-course tutoring ongoing — no artifacts yet.
- Building out this Personal OS: call pipeline + git-autosync + context wiki live; open issue: calendar OAuth token expired (notes since Jun 8 lack calendar headers).
- US relocation planned, visa timing tentatively Sep–Oct 2026 (per SoftServe 1:1; positioning rules in [job-search.md](job-search.md)).

## Active projects

| Project | Status | Last artifact |
|---|---|---|
| [SoftServe](projects/softserve.md) | ramping in: part-time R&D product lead + agentic SME; Oracle onboarding, strategy-session prep, Iris bootcamp ~Jun 29 | 2026-06-09 |
| [Job search](projects/job-search.md) | Zipify HoP process live; recruiter pipeline + outreach waves; Archive Resale closed | 2026-06-02 |
| [GigaCloud](projects/gigacloud.md) | CPO role; no call artifacts in the OS yet | - |
| [Laba](projects/laba.md) | PM-course tutoring; no artifacts yet | - |
| [Personal OS](projects/personal-os.md) | pipeline + autosync + context wiki live; open: calendar OAuth expired | 2026-06-11 |

## Reference layer (durable docs — link, don't duplicate)

- [job-search.md](job-search.md) — positioning: public vs. backend framing, recruiter story, target roles.
- [book-shortlist.md](book-shortlist.md) — reading shortlist (not a project).
- `people/` — person pages, created on demand by `context-update` for recurring people.
- `transcripts/` — manually added raw transcripts (Archive Resale case, Conga session).

## Plumbing

- Updater: `.claude/skills/context-update/` — sweep via `/context-update`, automatic single-note runs from the call-pipeline hook.
- Ingestion ledger: `_meta/processed.txt` (repo-root-relative path per processed artifact).
- Drop zone: `inbox/` at repo root (git-ignored; raw files stay local) — next sweep folds files in, then moves them to `inbox/processed/`.
