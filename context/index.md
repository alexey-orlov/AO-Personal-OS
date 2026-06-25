# Context wiki — index

One-screen map of what Alex is working on right now. Maintained by the `context-update` skill (`/context-update`); the call-pipeline updates it automatically after every call note. Area pages distill the artifact stream — current truth with provenance links, not a log.

**For agents:** read this file first for any task touching Alex's work; open the relevant `areas/<area>/README.md` before answering area questions. Update only via `context-update` — don't hand-edit.

## Now (2026-06-25)

- Ramping into a part-time SoftServe engagement (~50–80 h/mo): product lead for the R&D Delivery Unit + agentic-AI SME. In flight: Oracle-partnership onboarding (Phase 1 / reactive familiarization through Jun; three NVIDIA-built packages — AIQ / cuOpt / VSS — via Karsten as single Oracle gateway; first Oracle call done Jun 16 — Bosch cuOpt POC tech sync, GPU 2 debug in flight, tenancy extended to 2026-08-26; Wed Jun 17 R&D cross-team update delivered — SoftServe positioned as Oracle's "vendor of choice" for verticalized accelerator packs, 5 Oracle+NVIDIA cases showcased, Alex introduced as product advisor driving repeatability; Jun 18 onboarding into the productization/scaling workstream — Gero confirmed owner, discovery call being set up; Jun 23 AIDP pitch strategy set — SoftServe as Oracle's ready-now AIDP delivery partner via a big-data "pod" model → monthly recurring revenue, Alex owns the AI-use-case pod definition (draft for week of Jun 29), new senior stakeholder Neil (above Gero) holds Oracle's build-vs-partner call; Jun 23 packs partnership sync — Oracle reorg: Vishnu + Dennis Kennetz move to a compute org, Accelerator Packs ownership → Nathan Thomas's org (incoming PM Pulkit Sindhwani, eng Wei Li), roadmap in ~2–3 weeks, SoftServe to bring a prioritized pack list next session), R&D strategy-session design, Iris client bootcamp (Product stream) starting ~Jun 29, and the PM-focused Jumpstart extension (Bogdan-driven) — v0.2 program one-pager (field-calibrated) Jun 12, review with Inna ~week of Jun 15. Jun 25 R&D IP brainstorm (org. Oleh Mamchych): a reusable-asset ownership model (expert + coached trainee) and a unified, filterable, gated case-study DB being designed (content owner Liudmyla Tatura to draft it).
- Job search (VP Product / CPO, US) active: Zipify Head-of-Product process live (deep-dive Jun 2); Archive Resale closed (rejected May 22 at final round); recruiter pipeline + LSN outreach waves running.
- GigaCloud CPO duties ongoing — no call artifacts in the OS yet.
- Laba PM-course tutoring ongoing — no artifacts yet.
- Building out this Personal OS: call pipeline + git-autosync + context wiki live; captured goals & build backlog live in the pinned Apple Notes (`_ToDo`), snapshotted at [areas/personal-os/apple-notes/](areas/personal-os/apple-notes/); open issue: calendar OAuth token expired (notes since Jun 8 lack calendar headers).
- US relocation planned, visa timing tentatively Sep–Oct 2026 (per SoftServe 1:1; positioning rules in [positioning](areas/job-search/positioning.md)).

## Areas

Each area folder holds: `README.md` (live state), `<subproject>.md` pages (one per thread Alex truly engages in — every vacancy gets one automatically), `calls/` (pipeline-routed call notes), `docs/` (manually added materials).

| Area | Status | Subprojects | Last artifact |
|---|---|---|---|
| [SoftServe](areas/softserve/README.md) | ramping in: part-time R&D product lead + agentic SME; Oracle productization workstream + AIDP delivery-partner pitch in flight (Alex owns the AI-use-case pod definition, draft week of Jun 29) | [oracle](areas/softserve/oracle.md) · [iris-bootcamp](areas/softserve/iris-bootcamp.md) · [jumpstart-pm](areas/softserve/jumpstart-pm.md) | 2026-06-25 |
| [Job search](areas/job-search/README.md) | active — one page per vacancy + outreach | [zipify](areas/job-search/zipify.md) · [outreach](areas/job-search/outreach.md) · [archive-resale](areas/job-search/archive-resale.md) (closed) | 2026-06-02 |
| [GigaCloud](areas/gigacloud/README.md) | CPO role; no call artifacts in the OS yet | - | - |
| [Laba](areas/laba/README.md) | PM-course tutoring; no artifacts yet | - | - |
| [Personal OS](areas/personal-os/README.md) | pipeline + autosync + context wiki live; backlog in Apple Notes (_ToDo); open: calendar OAuth expired | - | 2026-06-14 |

## Cross-area reference

- [knowledge/](knowledge/README.md) — the second brain (things I'm capturing and learning, vs. `areas/` = things I'm working on). Goals/tasks/insights flow to Alex's pinned Apple Notes (`_ToDo`) via the `context/_inbox/apple-notes/` queue + `apple-notes-sync` local leg (read-only snapshots: `areas/<area>/apple-notes/`); repo categories: [book-shortlist.md](knowledge/book-shortlist.md) (📚), [explore/](knowledge/explore/queue.md) (🔭), [podcasts/](knowledge/podcasts/index.md) (automated, owned by `/podcast-insights`). Map + rules: `knowledge/README.md`.
- [areas/job-search/positioning.md](areas/job-search/positioning.md) — job-search positioning: public vs. backend framing, recruiter story, target roles.
- `people/` — person pages, created on demand by `context-update` for recurring people.
- `areas/other/` — classifier catch-all for unrouted calls (mostly junk; `context-update` junk-gates it).

## Plumbing

- Updater: `.claude/skills/context-update/` — sweep via `/context-update`, automatic single-note runs from the call-pipeline hook.
- Call-note taxonomy under `areas/<area>/calls/` is owned by Axis 2 of `.claude/skills/classify/SKILL.md`.
- Ingestion ledger: `_meta/processed.txt` (repo-root-relative path per processed artifact).
- Drop zone: `context/_inbox/` (Telegram 📥 Drop Zone → n8n capture within seconds, folded daily ~08:33 Kyiv by the "Daily drop-zone & context fold" cloud routine, archived to `_inbox/processed/`). Drops route by TYPE (step 3b of `context-update`): goal/task/insight → `_inbox/apple-notes/` queue → pinned Apple Notes (silent); book → 📚 + book-finder; explore → 🔭 + explore-brief; area material · people → wiki pages. Sensitive material that must never reach GitHub is pasted directly into a Claude session instead ("fold this into context" — pasted mode, no file).
- `knowledge/podcasts/` is a separate engine: `/podcast-insights` (`.claude/skills/podcast-insights/`) with its own ledger (`knowledge/podcasts/_meta/processed.txt`). `context-update` owns the rest of `knowledge/` as outputs; the two engines never touch each other's subtrees.
