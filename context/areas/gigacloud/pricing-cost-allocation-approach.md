# Component cost-allocation & pricing approach — recommendation

_status: recommended approach, verified against best practice 2026-08-27; awaiting required inputs to compute the actual rate card_
_updated: 2026-08-27_
_source: working session (chat, 2026-08-27); inputs = catalog exports (`component_27_08_2026_10_07.xlsx`, `components-in-products_*.xlsx`, `nproduct_27_08_2026_10_03.xlsx`, in `~/Downloads/drive-download-20260827T071524Z-1-001/`) + the cost-center Google Sheet (`docs.google.com/spreadsheets/d/1P1qZA89kObicG_k25XfF9rneTNxMCrpBT3TwCfmHADE`)_

Goal: attribute non-COGS expenses to components so component prices deliver predictable per-component margins. Catalog model: products are containers, only components carry prices, a sale is a case-by-case component set within a product.

## The approach (one, not two)

**Allocate every cost pool at the highest level where a causal driver actually operates; recover everything below that level through a required-margin stack on the component price.** Two rival methods would be a false choice — practitioner reality is exactly this blend [fact — Cooper & Kaplan cost-hierarchy doctrine, HBR 1991 / *Cost & Effect* 1998; BEREC/CRTC LRIC+ "EPMU" telecom-costing standard; practitioner consensus — SaaS contribution-margin convention].

Mechanics:

1. **Two stages.** Stage 1: allocate each department's budget causally to a **{product-category × component-type}** cell (or to a transaction, where the driver is truly per-event). Stage 2: inside the cell, spread uniformly as a % of price (EPMU — equal proportionate mark-up). Component-level effort attribution is not attempted by anyone — even telecom regulators abandoned it for EPMU [fact — BEREC LRIC+ guidance].
2. **Price floor per component:** `floor = COGS ÷ (1 − CtS% − acq% − OH% − profit%)`, with the four rates read from the component's cell.
3. **Single-home rule — every cost pool lives in exactly one term:**
   - **Component COGS (numerator):** equipment, licenses, DC, telecom + **L1–L3 support and Billing dept as TDABC per-unit charges** (per ticket / per invoice line). This resolves the CFO's open Billing question: it is genuinely transactional here, so it prices per line, not as G&A. Carve professional-services Delivery hours out of the support pool first — that labor is already services-component COGS.
   - **CtS% (recurring cost-to-serve):** AM/TAM + VOK-invoicing/collection only.
   - **acq% (acquisition, amortized over segment lifetime):** Sales, attributable marketing campaigns, Partner dept, VOK-contracting.
   - **OH% (overhead recovery):** Product dept, new-product R&D, Operations, Finance, brand marketing — never allocated below company level [fact — Kaplan/Cooper: facility-sustaining allocation is arbitrary].
4. **Margin decomposition:** target gross margin per cell = CtS% + acq% + OH% + profit%, so **profit% is derived by subtraction** (e.g. infra at 50% GM − 12% CtS − 8% acq − 10% OH = 20% operating profit). Plugging the GM band in as profit% double-loads every price.
5. **Three margin classes, never one blended target** (matches the CFO sheet's component types):
   - **Infra (hardware/virtualized):** target within the CFO's 20–50% GM envelope; feasibility-gated — current compute-node median GM is ~12.9% (mean −20.8%), so upper-envelope targets imply multi-x repricing: run a current-vs-target margin bridge per category + competitive price check first.
   - **License resell:** market-priced at 2–5% GM; **exempt from OH%, acq% and the AM/TAM+VOK CtS spreads** — carries only the transactional billing charge. Loading overhead onto price-benchmarked SKUs prices you out (KVI logic) [practitioner — McKinsey distributor pricing; CSP benchmarks]. The AM's effort is caused by the infra relationship, not the license seats — so CtS spreads run over non-resell components only (by gross-profit share, which self-corrects).
   - **Prof services:** 20–30% GP, priced off utilization; excluded from subscription math [practitioner — Service Leadership MSP benchmarks].
6. **All capacity rates at practical capacity (80–85%)**, recomputed annually from the 1-year budget: rate = pool ÷ practical-capacity minutes × standard handle time. Unabsorbed capacity is a period variance, never loaded into prices — the anti-death-spiral guard [fact — Kaplan & Anderson, TDABC, HBR 2004].
7. **Shared components (124 span >1 product):** the cell follows the **parent product of the invoice line at billing time** — every sold line has a defined cell. The published list price of a shared component uses its dominant parent category by revenue (a documented convention, not a derivation).
8. **Margin governance at the quote/deal level** (CPQ-style): floor + target evaluated on each deal's actual component set (a sale is a subset — mean 8.6, max 93 components/product — so a product-level "full set" check is neither necessary nor sufficient). Zero-price components get attach rules: quotable only alongside named funding components, else reprice or kill. Auto-approve above floor, escalate near floor [fact — Zilliant/Vendavo pricing-governance docs].

## Allocation-principle table

| Cost pool | Attribution level | Driver | Mechanic | Worked example (illustrative UAH) |
|---|---|---|---|---|
| Sales | Product category | CRM-derived category split (opportunities/activities/pipeline); quarterly rep interviews only as cross-check (flag >10pp deviation — self-reported splits are biased) [fact — Kaplan & Anderson] | Category pool → amortize over segment lifetime → % line on component price | 60M/yr × 70% private cloud = 42M; ÷ annualized new-MRR base (Q1 187M × 4 ≈ 748M — first validate the column is truly monthly-recurring, not quarterly bookings); ÷ 48 mo ≈ **0.12% monthly-price line** |
| Marketing — campaigns | Product / group | Campaign tags | Joins that category's acquisition pool | Veeam campaign loads only onto Business-continuity products |
| Marketing — brand | Company | — | OH% only; never allocated | — |
| Partner dept | Category | Partner-sourced new-MRR share | Acquisition, amortized like sales | 40% of resell new MRR partner-sourced → 40% of budget onto resell |
| VOK — contracting | Category | New contracts (TDABC) | Acquisition, amortized | per-contract TDABC cost × contracts signed |
| VOK — invoicing/collection | Transaction / customer | Invoices | Recurring CtS% — spread by gross-profit share over **non-resell** components; resell lines carry only the billing per-line charge | 6M ÷ 750k practical-capacity min × 50 std-min/invoice ≈ 400/invoice (12k invoices ≈ 80% utilization; slack = period variance) |
| AM / TAM (retention) | Customer tier | Books: 50 high / 400 medium / ~550 reactive | Tier cost per customer-month → categories by tier revenue mix → recurring CtS over non-resell components; kept separate from CAC [practitioner — cost-of-retention convention, Benchmarkit] | 20M × 50% high tier ÷ 50 ÷ 12 ≈ 16.7k/customer-month over those accounts' non-resell mix |
| L1–L3 support | Product; component where tickets tag one | Tickets × standard handle time (TDABC, practical capacity) | Per-unit charge into **component COGS (numerator only)**; carve out prof-services Delivery hours + one-time products' expected tickets first | 30M ÷ 2.0M practical-capacity min × 40 std-min ≈ 600/ticket |
| Billing dept | Transaction | Invoice lines | Per-line charge into **component COGS** — genuinely transactional here (per-component monthly billing); resolves the CFO's open question | 3M ÷ 375k practical line-capacity ≈ 8/component-line/month |
| Product + R&D | Split | Roadmap time share | Product-sustaining share → product family; **new-product development → OH%, never charged to current components** [fact — Kaplan/Cooper] | 60% sustaining VMware-platform work → IaaS families |
| Operations, Finance, G&A | Company | — | OH% | — |

**OH% =** driver-less pools ÷ planned revenue of **infra + services only** (resell exempt by design — 2–5% GM can't carry it; document the exemption). Also absorbs transition-period under-recovery of the amortized acquisition lines, unless the CFO books that as growth investment.

## The five challenges — resolved

- **C1 — which depts split by product category:** Sales, campaign marketing, Partner, AM/TAM, VOK. Per-transaction (not category-split): Billing, L1–L3 support. Never split: Product, R&D, Ops, Finance, brand marketing.
- **C2 — no component-level attribution possible:** resolved by construction. "Sales 70% private cloud / 30% resell" is exactly the right altitude — benchmark surveys measure S&M no deeper [practitioner — KeyBanc/Benchmarkit methodology]; below the cell, EPMU uniform spread is the deliberate, documented convention.
- **C3 — one-time vs subscription, 4-year lifetime:** the recurring/acquisition split does the work. Subscription products: acquisition ÷ lifetime-months as a monthly price line (annual billing = same math, annual periodicity). One-time products: **zero recurring lines**; recover attributable acquisition in the single sale; handle post-sale support via a warranty allowance (TDABC ticket cost × expected tickets) or by excluding their tickets from the support pool. Free products: no price line; governed by deal-level attach/margin rules. Replace the blanket 4 years with 2–3 **segment lifetimes from billing-cohort survival curves** (not 1/churn) [practitioner — SaaS CFO consensus]; cap at ~5 yrs and discount far years [Skok]. Lifetime-free sanity checks: CAC ratio (annual S&M ÷ new ARR, benchmark ~1.3 blended) and GM-adjusted payback <18 mo.
- **C4 — legacy customers:** day-0 is **right for price design** (forward-looking LRIC precedent), **wrong for cost absorption** — keep legacy customers in every capacity/revenue denominator, or the shrinking base inflates new rates (the textbook death spiral [fact — Kaplan/Cooper downward-demand-spiral]); **incomplete without migration** — move legacy at renewal/upgrade inflection points over 6–18 months on a versioned, effective-dated rate card; track a "legacy discount" waterfall line [practitioner — Simon-Kucher, ProfitWell grandfathering guidance].
- **C5 — 1-year budget vs 4-year lifetime:** dissolves. All rates come from the 1-year budget at practical capacity; the lifetime is only the amortization divisor (+ LTV/payback tests). One caveat: a 48-month amortized line reaches full annual recovery only once ~4 cohorts stack — in transition years, absorb the shortfall in OH% or book it as growth investment; pick one and write it down. Reprice annually from each new budget.

## Data fixes required first

1. **Master↔mapping reconciliation:** relationship table holds 593 distinct components vs 463 in the master — ~130 mapped components lack price/COGS/type rows; 54 master components map to zero products (keep or retire). Close the join before publishing any rate.
2. **Cubbit S3 anomaly:** Q1-2026 new MRR shows ₴15.6B (~100× the next product) — would swallow any revenue-share cascade.
3. **Zero-price rows:** 187 components have price 0 and COGS 0 (price-upon-request placeholders) — designate each as "priced-on-quote" vs "included in parent" so attach rules can bind.
4. **Column semantics:** validate "Q1-2026 new MRR" is truly monthly-recurring, not quarterly bookings (the CAC-ratio sanity check depends on it).

## Required inputs (to compute the rate card)

1. Sales category split from CRM + campaign→product tags + VOK contracting/invoicing split + partner-sourced MRR share.
2. One quarter's volumes AND capacities: tickets by product, invoice lines, contracts, available minutes per dept, standard handle times.
3. AM/TAM book map: customers per tier, tier revenue by category.
4. Billing-cohort retention by segment → segment lifetimes.
5. CFO's target GM band per cell (within stated envelopes: infra 20–50%, resell 2–5%, services 20–30%); profit% is then derived.
6. Product/R&D roadmap split: % sustaining vs new development.
7. Practical-capacity assumption per department (default 80–85%).
8. Feasibility gate: current-vs-target margin bridge per category + competitive price check for infra targets.

## What NOT to do

- No revenue-proportional peanut-butter spread **across categories/pools** as a substitute for causal allocation (documented anti-pattern [fact — Cooper & Kaplan 1988]); within a causally-allocated cell, uniform spread is the deliberate convention — that distinction IS the method.
- No component-level effort attribution — regulators abandoned it too.
- No overhead loading on license resell — thin margin is the business model. But if a resell category fails acquisition recovery, that's a **decision point** (confirmed attach play with tracked attach rate / motion change to self-serve or partner-led / price-floor change), not a validation — Business Software is ~₴128M of Q1 new MRR with real sales effort behind it.
- Never compute rates at actual volume — practical capacity only; a soft year must not mechanically raise prices.
- No single blended margin target across the three economic types.
- No permanent grandfathering; never exclude legacy revenue from denominators.
- No 4-year P&L forecast — the lifetime is arithmetic, not a budget.

## Display variant (the only real fork)

Same numbers, two renderings: **(a) per-unit charge cascade** — each component shows explicit UAH lines (support/ticket, billing/line, AM…) summing to fully-loaded cost + markup — best for CFO communication; **(b) rate stack** — % rates per cell, floor = COGS ÷ (1 − required margin) — best for operations and CPQ governance. Run (b), render (a) when explaining.
