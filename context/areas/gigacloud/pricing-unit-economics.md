# Pricing & unit economics — component cost allocation

_status: v4 model done (2026-08-27) — full P&L expense-attribution table + 23-item TODO; challenged by 4 independent reviews and fixed; next = Alex runs the TODO (collect 1–6, fix 7–12, structure 13–17, calculate 18–23)_
_updated: 2026-08-27_

## Snapshot

- Goal: attribute non-COGS expenses to components so component prices deliver predictable per-component margins; end state is a repriced catalog with floor/target governance. (chat, 2026-08-27)
- Catalog model: 96 products (containers) / 463 priced components; a sale is a case-by-case component set within a product. Product families: Resell 52, IaaS 32, Prof services 9, Bundles 3. Q1-2026 new-MRR mix excl. the Cubbit anomaly: IaaS 71.5% / Resell 28.4% / Services 0.1%.
- Three component economic types (CFO cost sheet): infra GM 20–50%, license resell 2–5%, prof services 20–30%.
- Recommended approach: **allocate at the highest level where a causal driver operates ({product-category × component-type} cell, or per transaction); recover the rest via a required-margin stack**; floor = COGS ÷ (1 − CtS% − acq% − OH% − profit%). Full recommendation: [pricing-cost-allocation-approach.md](pricing-cost-allocation-approach.md).
- Verified against Alex's five stated challenges + a unit-economics best-practice checklist (multi-agent adversarial review, 2026-08-27); 20 issues found and fixed, incl. quote-level (not product-level) margin governance and the resell exemption from overhead/CtS spreads.

## Active threads

- **Cost-allocation approach → rate card.** Approach settled; blocked on data fixes (master↔mapping reconciliation 593 vs 463 components; Cubbit ₴15.6B MRR anomaly; 187 zero-price placeholder rows; "new MRR" column semantics) and the 8 required inputs (CRM sales split, TDABC volumes/capacities, AM book map, cohort lifetimes, CFO GM bands, R&D roadmap split, practical-capacity assumption, feasibility gate). Owner: Mine. (chat, 2026-08-27)

## People

- CFO (unnamed) — owns the cost-center structure sheet; open question on Billing dept allocation resolved by the recommendation (transactional → per-line COGS charge). (chat, 2026-08-27)

## Decisions

- 2026-08-27 — One approach, not two: causal-level allocation + margin-stack recovery (EPMU inside cells). Component-level attribution not attempted by design. (chat)
- 2026-08-27 — Day-0 unit-economics design validated for **price architecture**, but legacy customers stay in every capacity/revenue denominator (anti-death-spiral) and get migrated at renewal over 6–18 mo. (chat)
- 2026-08-27 — License resell exempt from overhead, acquisition amortization, and AM/TAM+VOK cost-to-serve spreads; carries only transactional billing charges. (chat)

## Open loops

- Mine — run the 4 data fixes (reconciliation, Cubbit, zero-price designation, MRR column semantics) before computing any rate.
- Mine — collect the 8 required inputs (see the [recommendation doc](pricing-cost-allocation-approach.md#required-inputs-to-compute-the-rate-card)); CFO decisions needed on GM band per cell + transition-shortfall treatment.

## Activity

- 2026-08-27 — [v4](pricing-cost-allocation-approach.md) — added the real Q2-2026 P&L (₴216.7M revenue, EBITDA 37%), org chart and billing-group revenue from the CFO workbook; produced the full expense-line × attribution-class table + 23-item TODO. Headline finding: ~₴27M/q of hardware cost (амортизація + лізинг) sits below EBITDA — true GM ≈ 51%, not 64%. Four challenge reviews applied: two-price system (economic floor vs target price), utilization-based costing for pooled platforms, resell exemption narrowed (carries directly-caused costs; vendor rebates net into COGS), customer-profitability step added. (chat)

- 2026-08-27 — [recommendation](pricing-cost-allocation-approach.md) rewritten in plain language with worked examples on 4 real components (Private Server node, Public Cloud vCPU, AI Impl. Engineer hour, M365 BS monthly) + straight answers to the 1-yr-budget-vs-4-yr-lifetime and product-pool→components questions; second adversarial pass applied (EPMU relabel, capacity wording, M365 floor/target labels; the claimed acquisition-formula "blocker" was re-derived and rejected — the formula recovers the pool exactly). Findings: node and vCPU price below illustrative floors (~9.6%/11.1% implied profit vs 20% target); AI-engineer hour clears 30% GM only if COGS is per-billable-hour; M365 catalog margins 6.4–9% vs the cost sheet's stated 2–5%. (chat)
- 2026-08-27 — [recommendation](pricing-cost-allocation-approach.md) — cost-allocation & pricing approach designed and adversarially verified; catalog exports + cost-center sheet profiled. (chat)
