# GigaCloud — CPO

_status: CPO role; three workstreams — catalog ↔ Billing integration requirements; component cost-allocation & pricing redesign (steps 1–5 computed in Юніт.xlsx, results deck v23); product publication process + its CRM checklist (deck v9, 58 slides, 2026-10-12, plus a roadmap opening slide 2026-10-14; to be presented to department heads)_
_updated: 2026-10-14_
_source files: `~/Desktop/GigaCloud/` on Alex's MacBook Air (live plan + results decks, `Юніт.xlsx`, results toolchain) · `~/Downloads` on `KN7X2Y65NX` (older set: `Margin.xlsx`, brand template) — registry entry in [_meta/external-sources.md](../../_meta/external-sources.md); transfer snapshots + HANDOFF in [docs/margin-deck/](docs/margin-deck/HANDOFF.md)_

> ⛔ **Internal-only area.** GigaCloud is never named in any external-facing artefact — CV, LinkedIn profile or DMs, outreach, applications, interviews, bios, generated drafts. In interviews this period is referred to only as "a fractional project helping a European tech company (infrastructure provider) build an AI-enabled org"; in writing, as "fractional product leader for agentic-AI B2B startups". Rule + rationale: [job-search/positioning.md](../job-search/positioning.md).

## Snapshot

- Alex is CPO at GigaCloud (cloud infrastructure). [CLAUDE.md]
- Expected note streams (classify Axis 2 → `calls/` subfolders): `product-issues-sukhenko` (recurring weekly), `product-team-weekly`, `other`.
- Active product problem: automating the CREASHO/Krayshu product-catalog (CRM) → Billing integration, today a semi-manual Excel-over-email + Jira flow. [calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)
- Catalog shape (from 2026-08-27 exports): 96 products / 463 priced components; products are containers, only components carry prices, a sale is a case-by-case component set. Three component economic types: infra (GM 20–50%), license resell (2–5%), prof services (20–30%). (chat, 2026-08-27)

## Active threads

- **Catalog ↔ Billing integration — requirements scoping.** Working session (2026-07-21) scoped the business scenarios / edge cases for syncing catalog changes into Billing. Three layers named: (1) catalog data model, (2) an intermediate proxy model in CREASHO that reshapes catalog data into Billing format, (3) business scenarios — this call targeted layer 3. Complexity clusters around **price changes** (transactional model mismatch, GAF/government products, price-upon-request, quote-only, repricing existing customers, per-customer fixed prices). Guidance from Speaker B: don't re-invent the existing working mapping — describe already-implemented scenarios high-level, write a detailed per-scenario flow table only for price changes. → next: Alex collects/structures everything, reviews fresh, returns to Speaker B for clarifications, then takes it to Zhenya (object model + field-level mapping owner). Owner: Mine. [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)
  - _possible subproject: catalog↔billing integration? — promote to its own page on the next artifact._
- **Pricing & unit economics — component cost allocation.** Framework implemented in Юніт.xlsx: budget → expense types → 5 allocation buckets → 82 products → components; bucket costs reach each component by its Direct COGS, never by price. Steps 1–5 are computed for all five buckets; results deck v23 (43 slides, 2026-10-09) carries a Next steps block. Current state and open data items live on the subproject page. Owner: Mine. → [pricing-unit-economics](pricing-unit-economics.md)
- **Product publication process (PLM) — CRM checklist.** The 5-stage process (publication criteria → publication → «Готовність команд» → first customer → changes during the product's life) and its CRM automation (Data validation, a 24-item checklist, Head of Product exceptions, revision approvals) are documented in a UA deck v9 (58 shown slides, 2026-10-12, after four rounds of Alex's dictated feedback: colour-coded stage maps, the CRM checklist, step cards headed by step + Owner, stage 4 «Перший клієнт», the change types that need an approval, a stages × teams participation matrix, his action plan) for the department heads. A «Роадмап» opening slide (2026-10-14) adds the Q4 roadmap: better automatic price-change notifications, recording team hand-offs, non-standard prices in quotes. Next: Alex answers four small questions, aligns the roadmap slide with the action plan, then presents. Owner: Mine. → [publication-process](publication-process.md)

## Subprojects

- [pricing-unit-economics](pricing-unit-economics.md) — component cost allocation: steps 1–5 computed, plan deck v5 + results deck v23 (2026-10-09). Reasoning reference: [pricing-cost-allocation-approach.md](pricing-cost-allocation-approach.md).
- [publication-process](publication-process.md) — product publication process + CRM checklist: deck v9 (58 slides, 2026-10-12) + roadmap slide (2026-10-14), to be presented to department heads.

## People

- Sukhenko — counterpart of the recurring product-issues weekly (inferred from the call taxonomy; no notes yet).
- Zhenya — owns the object model / field-level catalog→Billing mapping; the requirements write-up goes to him. [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)
- Yaroslav — a key requirements person; Speaker B flagged his absence from the 2026-07-21 session. [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)
- Lyubomir Doroshenko — operations department. He is designing the per-customer fixed/frozen-price mechanism; the CRM has no mechanism for it yet. [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md) After an Operations kick-off he has 2 weeks to make sure the product's processes are documented and approved (CRM checklist, [publication-process](publication-process.md)).

## Decisions

- 2026-10-11 — Publication-process deck: the stage after publication is named «Готовність команд»; stage 4 (changes during product life) gets only a sub-header for now; action plan drafted for Alex's edit. [publication-process](publication-process.md)
- 2026-09-26 — Component allocation spreads bucket costs by Direct COGS, never by price; results-deck rulings (no ФОТ sums, tree counts 11/54, «Allocation methods» as authority, 82 products). [pricing-unit-economics](pricing-unit-economics.md)
- 2026-08-27 — Cost-allocation approach: ONE method (causal-level allocation + margin-stack recovery), not two; day-0 pricing design validated with legacy kept in denominators; resell exempt from overhead/CtS loading; Billing dept = transactional → per-line COGS charge. [pricing-unit-economics](pricing-unit-economics.md)
- 2026-07-21 — Requirements approach: lean on the existing working mapping, not a redo; keep implemented scenarios high-level, detail only price-change flows per-scenario. [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)

## Open loops

- Mine — collect + structure the shared requirements, review fresh, clarify with Speaker B, take to Zhenya (no firm date). [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)
- Open — GAF/government products: decide whether Billing gets a parent/child concept or treats GAF as a black box (avoid duplicating ~20 files per GAF product).
- Open — per-customer fixed/frozen prices: decide whether Billing must know or CRM stays master (mechanism being designed with Lyubomir).
- Open — confirm whether custom/quote-only prices are sent to Billing at all, and how per-customer prices get tagged (Billing has no customer reference field).
- Open — finish the remaining mass CRM↔Billing name-sync backlog (~half left) — likely a prerequisite before automation.
- Open — move from emailed Excel files to a Billing API endpoint ("not a big task", inferred next step).

## Activity

- 2026-10-14 — [publication-process roadmap slide](publication-process.md) — a «Роадмап» opening slide (today's four topics + the Q4 roadmap) sent to Alex to insert; its Q4 list differs from the action plan's roadmap row. (chat)
- 2026-10-12 — [publication-process decks v3–v9](publication-process.md) — 46 → 58 slides over Alex's feedback rounds (CRM checklist, stage headers, stage 4 «Перший клієнт», change types, hidden field-check slides, his action plan). (chat)
- 2026-10-11 — [publication-process deck v2](publication-process.md) — reworked on Alex's dictated feedback (42 slides); v1 (37 slides) the same day from his brief + Miro + the CRM checklist export; new subproject page. (chat)
- 2026-09-26 — [results deck](pricing-unit-economics.md) — 26-slide UA deck of allocation results (steps 1–4, 5 buckets, 5 methods, per-component examples) from Alex's brief + Юніт.xlsx; handoff rewritten for both decks. (chat)
- 2026-08-27 — [action-plan deck](pricing-unit-economics.md) — 11-slide UA deck for CFO/department alignment built from Alex's brief + Margin.xlsx (4-model taxonomy A–D, price stack, InfoSec P&L split, next steps). (chat)
- 2026-08-27 — [pricing approach](pricing-cost-allocation-approach.md) — component cost-allocation & pricing approach designed and verified; new subproject page created. (chat)
- 2026-07-21 — [catalog↔billing requirements](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md) — scoped the business scenarios/edge cases for automating the catalog→Billing sync; first GigaCloud product artifact in the OS.
