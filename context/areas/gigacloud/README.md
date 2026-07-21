# GigaCloud — CPO

_status: CPO role; first product artifact landed — a requirements-scoping effort for the CREASHO/Krayshu catalog ↔ Billing integration is in flight_
_updated: 2026-07-21_

## Snapshot

- Alex is CPO at GigaCloud (cloud infrastructure). [CLAUDE.md]
- Expected note streams (classify Axis 2 → `calls/` subfolders): `product-issues-sukhenko` (recurring weekly), `product-team-weekly`, `other`.
- Active product problem: automating the CREASHO/Krayshu product-catalog (CRM) → Billing integration, today a semi-manual Excel-over-email + Jira flow. [calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)

## Active threads

- **Catalog ↔ Billing integration — requirements scoping.** Working session (2026-07-21) scoped the business scenarios / edge cases for syncing catalog changes into Billing. Three layers named: (1) catalog data model, (2) an intermediate proxy model in CREASHO that reshapes catalog data into Billing format, (3) business scenarios — this call targeted layer 3. Complexity clusters around **price changes** (transactional model mismatch, GAF/government products, price-upon-request, quote-only, repricing existing customers, per-customer fixed prices). Guidance from Speaker B: don't re-invent the existing working mapping — describe already-implemented scenarios high-level, write a detailed per-scenario flow table only for price changes. → next: Alex collects/structures everything, reviews fresh, returns to Speaker B for clarifications, then takes it to Zhenya (object model + field-level mapping owner). Owner: Mine. [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)
  - _possible subproject: catalog↔billing integration? — promote to its own page on the next artifact._

## People

- Sukhenko — counterpart of the recurring product-issues weekly (inferred from the call taxonomy; no notes yet).
- Zhenya — owns the object model / field-level catalog→Billing mapping; the requirements write-up goes to him. [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)
- Yaroslav — a key requirements person; Speaker B flagged his absence from the 2026-07-21 session. [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)
- Lyubomir — designing the per-customer fixed/frozen-price mechanism (no CRM mechanism yet). [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)

## Decisions

- 2026-07-21 — Requirements approach: lean on the existing working mapping, not a redo; keep implemented scenarios high-level, detail only price-change flows per-scenario. [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)

## Open loops

- Mine — collect + structure the shared requirements, review fresh, clarify with Speaker B, take to Zhenya (no firm date). [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)
- Open — GAF/government products: decide whether Billing gets a parent/child concept or treats GAF as a black box (avoid duplicating ~20 files per GAF product).
- Open — per-customer fixed/frozen prices: decide whether Billing must know or CRM stays master (mechanism being designed with Lyubomir).
- Open — confirm whether custom/quote-only prices are sent to Billing at all, and how per-customer prices get tagged (Billing has no customer reference field).
- Open — finish the remaining mass CRM↔Billing name-sync backlog (~half left) — likely a prerequisite before automation.
- Open — move from emailed Excel files to a Billing API endpoint ("not a big task", inferred next step).

## Activity

- 2026-07-21 — [catalog↔billing requirements](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md) — scoped the business scenarios/edge cases for automating the catalog→Billing sync; first GigaCloud product artifact in the OS.
