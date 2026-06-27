# Context maintenance best practices — research brief

_question: How to keep a living wiki / knowledge base current and useful when the project underneath it constantly evolves; patterns to prevent "wiki rot"; hooks to AI-assisted context management_
_date: 2026-06-27 · sources: 5 · provenance: [drop](../../_inbox/processed/tg-20260626-190559-158.md)_

## TL;DR
Evolving-project wikis die when treated as artifacts. Four things prevent rot: (1) **atomic knowledge units** — one idea per note, independently updatable without cascading rewrites; (2) **mutation + dating over immutability** — capture how context evolves, not just what was decided; (3) **embed context into workflow** — surface decisions where work happens (PR templates, not a separate wiki); (4) for AI-assisted contexts, **LLMs handle interconnection while humans curate accuracy**. The hardest part: making updates a natural workflow step, not a separate ritual.

## What's known

1. **ADRs (Architecture Decision Records)** — Michael Nygard (2011); captures each decision with Context / Decision / Consequences as a short, append-only doc. When a decision reverses, a NEW ADR supersedes the old — both preserved, linked. ADR tooling (adr-tools, MADR template) surfaces relevant records in PRs. [Fact / primary: adr.github.io; endorsed by AWS Prescriptive Guidance, Microsoft Azure Well-Architected, GOV.UK]

2. **Mutation + dating beats strict immutability** — ADRs theoretically immutable, but in practice teams add dated annotations showing how context evolved as new information emerged. Append-only falls short when context genuinely shifts; dated mutations give the evolution record, not just the outcome. [Practitioner consensus / GitHub ADR repo community findings]

3. **Evergreen notes pattern** (Andy Matuschak) — Atomic (one idea), standalone (self-contained without source context), linked (to related notes), refined over time. Atomic structure means updating one node without cascading rewrites. Identical property makes atomic notes natural RAG chunks — retrieved without needing surrounding context. [Practitioner source / Matuschak notes, Zettelkasten literature]

4. **Diátaxis taxonomy** (Daniele Procida) — four types: Tutorial / How-to / Reference / Explanation. Each type has a different maintenance cadence: Reference is stable, How-to evolves with the product. Separating them avoids applying one update schedule to all docs. [Fact / primary: diataxis.fr]

5. **ROT prevention** (Redundant/Obsolete/Trivial) — Formal audit cadence (weekly/monthly/quarterly matched to change rate), assigned content owners, retention periods with automated alerts. Without scheduled review, wikis rot passively regardless of tooling. [Practitioner consensus / Tettra, Slite practitioner guides]

6. **Embed into workflow, not a separate wiki** — ADRs surfaced at PR creation, context checks as fitness functions in CI, wiki edits triggered by code/config changes. Context that appears where decisions are made gets maintained; context buried behind a separate URL does not. [Practitioner consensus / multiple engineering blog case studies]

7. **AI-assisted maintenance (2025-2026)** — LLMs auto-create cross-references, flag stale entries, and surface related content on each ingest. Human role shifts to curation and accuracy judgment; system handles interconnection + consistency. [Inference + vendor documentation / Confluence AI, Notion AI, Bosio Digital LLM knowledge bases 2026] ⚠ gap: no independent study quantifying maintenance-burden reduction; evidence is vendor-driven.

## For Alex

Personal OS already implements several of these patterns well:
- Rewrite-in-place area READMEs = evergreen pattern; the ≤120-line page budget enforces atomic-ish scope.
- Ledger + provenance links (`[source](calls/…)` on every claim) = ADR's traceability layer.
- Call-pipeline auto-running `context-update` = embedding into workflow.
- **Gap vs best practices**: no ADR-style decision log for the OS itself — skill design choices, automation decisions, and API picks live implicitly in `CLAUDE.md` without dates or supersession links. A lightweight `.claude/decisions/` folder with dated MADR-style records would make the OS's own evolution queryable. Low cost, high payoff as the OS compounds.

## Go deeper

- [adr.github.io](https://adr.github.io/) — canonical ADR resource; MADR template is the most structured for querying past decisions
- [Matuschak's evergreen notes](https://notes.andymatuschak.org/Evergreen_notes) — the atomic-notes canon; "Evergreen notes should be atomic" and "Prefer note titles with complete phrases to sharpen statements" are the key entries
- [diataxis.fr](https://diataxis.fr/) — Procida's full framework; most useful for separating stable reference (e.g. `positioning.md`) from fast-changing procedural content (skills)

## Gaps & caveats

- All evidence is practitioner consensus or case studies — no controlled comparisons of approaches.
- AI-maintenance claims (LLM auto-linking reducing burden) are largely vendor-driven; independent evidence thin as of mid-2026.
- Most literature targets team wikis; solo / Personal-OS scale is underrepresented. Team practices assume social accountability for updates — a solo system needs a procedural substitute (the sweep cadence here).
