# GigaCloud — CPO

_status: CPO role; three workstreams in flight — catalog ↔ Billing integration requirements, component-level cost-allocation & pricing redesign (approach settled + action-plan deck built 2026-08-27), and Eduard's node-standardization + management-unbundling proposal awaiting Alex's decision (2026-08-29)_
_updated: 2026-08-29_

> ⛔ **Internal-only area.** GigaCloud is never named in any external-facing artefact — CV, LinkedIn profile or DMs, outreach, applications, interviews, bios, generated drafts. In interviews this period is referred to only as "a fractional project helping a European tech company (infrastructure provider) build an AI-enabled org"; in writing, as "fractional product leader for agentic-AI B2B startups". Rule + rationale: [job-search/positioning.md](../job-search/positioning.md).

## Snapshot

- Alex is CPO at GigaCloud (cloud infrastructure). [CLAUDE.md]
- Expected note streams (classify Axis 2 → `calls/` subfolders): `product-issues-sukhenko` (recurring weekly), `product-team-weekly`, `other`.
- Active product problem: automating the CREASHO/Krayshu product-catalog (CRM) → Billing integration, today a semi-manual Excel-over-email + Jira flow. [calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)
- Catalog shape (from 2026-08-27 exports): 96 products / 463 priced components; products are containers, only components carry prices, a sale is a case-by-case component set. Three component economic types: infra (GM 20–50%), license resell (2–5%), prof services (20–30%). (chat, 2026-08-27)
- Private-cloud platform shift in motion: new clients go on HCI stacks (VMware vSAN / Azure Local / Nutanix — all HCI-only by design), legacy separate-compute+SAN (iSCSI) architecture kept for existing clients only — aligned between Eduard, Kirill and Horlinskyi (inferred spelling); old stack is slower, higher-latency and dearer than HCI. (chat, 2026-08-29)

## Active threads

- **Catalog ↔ Billing integration — requirements scoping.** Working session (2026-07-21) scoped the business scenarios / edge cases for syncing catalog changes into Billing. Three layers named: (1) catalog data model, (2) an intermediate proxy model in CREASHO that reshapes catalog data into Billing format, (3) business scenarios — this call targeted layer 3. Complexity clusters around **price changes** (transactional model mismatch, GAF/government products, price-upon-request, quote-only, repricing existing customers, per-customer fixed prices). Guidance from Speaker B: don't re-invent the existing working mapping — describe already-implemented scenarios high-level, write a detailed per-scenario flow table only for price changes. → next: Alex collects/structures everything, reviews fresh, returns to Speaker B for clarifications, then takes it to Zhenya (object model + field-level mapping owner). Owner: Mine. [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)
  - _possible subproject: catalog↔billing integration? — promote to its own page on the next artifact._
- **Node standardization + management unbundling — Eduard's proposal, awaiting Alex's call.** Video memo recorded so decisions don't stall over Alex's vacation (chat, 2026-08-29). Part 1 — hardware for the HCI shift: a 5-node lineup priced end-to-end (Small SR635 1×16 AMD/128GB/L4 — vSAN-cert, Azure Local only via grandfathered-expansion logic, existing fleet, keep for the mini segment; Medium FX650v4 2×16/512GB/L40S and Large FX650v4 2×24/512GB/L40S — both triple-certified vSAN+Azure+Nutanix i.e. truly universal; Large+ SR650a V4 2×24/H200-RTX6000 — vSAN-only, so high-end-GPU clients land on VMware by constraint; OpenStack SR645 V3 2×32/uncertified — cheapest, viable only because OpenStack has no per-core licensing). Monthly cost ranking per stack: bare-metal < Azure Local < vSAN ≈ Nutanix (~3–4% apart). **Ask #1:** universal triple-certified fleet at a capex premium (Eduard quotes both ~10% saving foregone and 15–20% dearer node — unreconciled) vs per-product cheapest nodes; Eduard firmly pro-universal (reuse flexibility, no hardware zoo in inventory/maintenance/catalog, certification = vendor-support safety R&D insists on, premium dilutes in monthly COGS) — the per-product option is asserted, never quantified. Part 2 — pull management out of node pricing (today it eats client-allocated resources on VMware private cloud) into a shared management cluster as in Private Cloud Mini, sold as a mandatory catalog component: Mini tier (minimum viable set) / Base tier (current standard) + paid add-ons; catalog restructured into components (node, RAM extension, disk extension, mgmt tier, mgmt add-ons) → a NEW component group needing an expected margin — lands in the [pricing-unit-economics](pricing-unit-economics.md) framework. Not yet socialized with Horlinskyi (resistance expected). → next: Alex replies with support/pushback on both parts. Owner: Mine.
- **Pricing & unit economics — component cost allocation.** Approach recommended + adversarially verified 2026-08-27: allocate non-COGS costs at the highest causally-driven level ({category × component-type} cell or transaction), recover the rest via a required-margin stack; floor = COGS ÷ (1 − CtS% − acq% − OH% − profit%). Stakeholder action-plan deck built same day (11 slides, UA, GigaCloud template; simplified 4-model taxonomy A–D per Alex's brief — deck lettering is canonical in conversations, see the subproject page's lettering note). Next: present the deck + department/finance alignment, in parallel with the 4 data fixes + 8 required inputs → rate card. Owner: Mine. → [pricing-unit-economics.md](pricing-unit-economics.md)

## Subprojects

- [pricing-unit-economics](pricing-unit-economics.md) — component cost-allocation & pricing redesign; approach settled + action-plan deck built 2026-08-27; rate-card computation blocked on data fixes + inputs. Full recommendation: [pricing-cost-allocation-approach.md](pricing-cost-allocation-approach.md).

## People

- Eduard — owns hardware/node configuration + private-cloud packaging economics (inferred); author of the 2026-08-29 node-standardization & management-unbundling proposal. (chat, 2026-08-29)
- Kirill — supports the shift off legacy SAN-based private clouds to HCI for new clients (role unstated). (chat, 2026-08-29)
- Horlinskyi (ASR renders the surname variously as Горлинский/Гординский/Верлинский — likely one person; spelling inferred) — R&D side; insists on vendor-certified hardware, will resist the Small-node-on-Azure-Local exception and gatekeeps the management-model change. (chat, 2026-08-29)
- Sukhenko — counterpart of the recurring product-issues weekly (inferred from the call taxonomy; no notes yet).
- Zhenya — owns the object model / field-level catalog→Billing mapping; the requirements write-up goes to him. [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)
- Yaroslav — a key requirements person; Speaker B flagged his absence from the 2026-07-21 session. [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)
- Lyubomir — designing the per-customer fixed/frozen-price mechanism (no CRM mechanism yet). [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)

## Decisions

- 2026-08-27 — Cost-allocation approach: ONE method (causal-level allocation + margin-stack recovery), not two; day-0 pricing design validated with legacy kept in denominators; resell exempt from overhead/CtS loading; Billing dept = transactional → per-line COGS charge. [pricing-unit-economics](pricing-unit-economics.md)
- 2026-07-21 — Requirements approach: lean on the existing working mapping, not a redo; keep implemented scenarios high-level, detail only price-change flows per-scenario. [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)

## Open loops

- Mine — answer Eduard on both proposal parts: universal vs per-product node fleet, and the shared-management Mini/Base + add-ons packaging (he recorded it precisely so this doesn't wait out the vacation). (chat, 2026-08-29)
- Open — Small node on Azure Local rides on grandfathered-expansion certification only: decide to fight R&D (Horlinskyi) for it or accept the vendor-support risk; existing fleet + mini-segment fit argue for keeping it. (chat, 2026-08-29)
- Open — per-product node option is unpriced (no models/costs in Eduard's table) and his 10% vs 15–20% capex-delta figures conflict — ask for the comparison numbers before/while endorsing. (chat, 2026-08-29)
- Mine — collect + structure the shared requirements, review fresh, clarify with Speaker B, take to Zhenya (no firm date). [call](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md)
- Open — GAF/government products: decide whether Billing gets a parent/child concept or treats GAF as a black box (avoid duplicating ~20 files per GAF product).
- Open — per-customer fixed/frozen prices: decide whether Billing must know or CRM stays master (mechanism being designed with Lyubomir).
- Open — confirm whether custom/quote-only prices are sent to Billing at all, and how per-customer prices get tagged (Billing has no customer reference field).
- Open — finish the remaining mass CRM↔Billing name-sync backlog (~half left) — likely a prerequisite before automation.
- Open — move from emailed Excel files to a Billing API endpoint ("not a big task", inferred next step).

## Activity

- 2026-08-29 — Eduard's proposal — universal HCI node lineup (Small/Medium/Large/Large+/OpenStack, certification + supplier/monthly pricing) + management-cluster unbundling into Mini/Base tiers & add-on components; exec summary of options/criteria delivered to Alex in-session. (chat)
- 2026-08-27 — [action-plan deck](pricing-unit-economics.md) — 11-slide UA deck for CFO/department alignment built from Alex's brief + Margin.xlsx (4-model taxonomy A–D, price stack, InfoSec P&L split, next steps). (chat)
- 2026-08-27 — [pricing approach](pricing-cost-allocation-approach.md) — component cost-allocation & pricing approach designed and verified; new subproject page created. (chat)
- 2026-07-21 — [catalog↔billing requirements](calls/other/2026-07-21_180038_default_202607171304495CACCF1A.md) — scoped the business scenarios/edge cases for automating the catalog→Billing sync; first GigaCloud product artifact in the OS.
