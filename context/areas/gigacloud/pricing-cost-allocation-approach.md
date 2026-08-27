# Component pricing — how company costs get into component prices

_status: recommended approach (plain-language version with worked examples), verified 2026-08-27; percentages are placeholders until department budgets are plugged in — formulas and mechanics are the method_
_updated: 2026-08-27_
_source: working session (chat, 2026-08-27); inputs = catalog exports in `~/Downloads/drive-download-20260827T071524Z-1-001/` + the cost-center Google Sheet (`docs.google.com/spreadsheets/d/1P1qZA89kObicG_k25XfF9rneTNxMCrpBT3TwCfmHADE`)_

## The idea in one paragraph

Every component price must cover four things: its direct cost (COGS), a fair share of the departments that sell and serve it, a share of general company costs, and profit. We charge each department's cost at the level where a real connection can be measured — per event (a support ticket, an invoice line), per customer tier (account management), or per product category (sales, marketing). We never pretend to measure deeper than that: below the measurable level, the cost is spread evenly across components in proportion to their price. The output for every component is a **floor price** (never sell below) and a **target price**. This is not invented here — it is how telecom regulators cost component catalogs, how activity-based costing says overheads should be handled, and how SaaS companies amortize sales cost over customer lifetime.

## The formula

```
floor price = (COGS + per-event charges) ÷ (1 − sales% − retention% − general% − profit%)
```

Why divide instead of add: the four shares are percentages **of the final price**. If they must add up to, say, 50% of the price, then the remaining 50% has to cover the loaded cost — so the price is the loaded cost divided by 0.50. The profit% is not chosen separately: it is what remains of the target gross margin after the three cost shares (e.g. 50% target margin − 8% sales − 12% retention − 10% general = 20% profit). Adding a full margin on top of the shares would double-charge.

## What happens to each department's budget

| Department | What its cost becomes | Why this way |
|---|---|---|
| Sales | Split across product categories using CRM data (e.g. 70% private cloud / 30% resell), then recovered as a small % on every month's bill over the customer's expected life (~4 years) | A sale creates ~48 months of revenue; charging it all to month one would misprice. This is the standard SaaS treatment of acquisition cost |
| Marketing — campaigns | To the product category each campaign promotes; joins that category's sales share | Campaign tags make this measurable |
| Marketing — brand | Into general costs | Nobody can honestly tie brand spend to a category |
| Partner department | Like sales, split by where partner-sourced revenue lands | Measurable from partner-deal records |
| VOK — contract signing | Joins the sales share of that category | Happens once per new contract |
| VOK — invoicing & collection | Joins the retention share | Recurring work on existing customers. (These are VOK people; the ₴8/line below is the separate billing-system team — no double count) |
| Account managers + TAMs | Cost per customer tier (50 high-touch / 400 medium / ~550 reactive) → the **retention %**, charged on infrastructure and services only — never on resold licenses | The AM exists because of the infrastructure relationship, not the license seats. Charging licenses would wipe their 2–9% margin |
| L1–L3 support | Cost per ticket → added into the COGS of components that cause tickets | Tickets are countable — this is the one place real per-component measurement exists. (First remove delivery hours already counted in services COGS) |
| Billing department | Cost per invoice line (~₴8) → added into each billed line's cost | Billing effort is genuinely per-line here — this answers the CFO sheet's open question |
| Product, R&D (new products), Operations, Finance | One **general-costs %** applied to infrastructure and services prices (not resell) | No honest driver exists; spreading them by any formula would be fake precision — so one transparent uniform rate |

**Five rules that keep it honest:**

1. **Every cost lives in exactly one term.** Support and billing go into COGS as per-event charges — they are NOT also inside the percentages.
2. **Per-event rates are computed from team capacity, not actual volume.** Rate = budget ÷ what the team *can* handle (at ~80–85% utilization) × standard time per event. In a weak year the idle-capacity cost is a company loss, not a price increase — otherwise weak sales raise prices, which weakens sales further (the death spiral).
3. **Resold licenses are exempt from all shares.** The market sets their price; the catalog shows 6–9% current margins on M365 (the cost sheet's 2–5% band looks stale — worth updating). They carry only the ₴8/line billing charge. Loading anything more prices us out of price-benchmarked SKUs.
4. **Prices are checked per deal, not per product.** Customers buy arbitrary subsets of components (average 8.6, up to 93 per product), so the floor/target check runs on each quote's actual component set. Zero-priced components are only quotable alongside the components that fund them.
5. **Rates are recomputed once a year** from the new budget. No multi-year forecast is ever needed.

## Table 1 — worked examples (real components, real COGS; shares shown at the floor price)

Illustrative rates until budgets land: infrastructure cell — sales 8%, retention 12% (AM/TAM 9 + VOK invoicing 3), general 10%, profit 20% (= 50% target margin). Services — sales 5%, general 10%, profit 15% (= 30% target margin). Resell — exempt, market-priced at 2–5% minimum.

| Component (real) | COGS ₴/mo | + Support & billing | Sales & mktg share | Retention share | General share | Profit | = Floor price | Current price | How derived |
|---|---|---|---|---|---|---|---|---|---|
| Node for Private Server (1×16 cores, 256 GB) | 30,440.57 | +180 support (0.3 tickets/mo × ₴600/ticket) +8 billing → loaded 30,628.57 | 4,900.57 (8%) | 7,350.86 (12%) | 6,125.71 (10%) | 12,251.43 (20%) | **61,257.14** | 50,730 | Floor = 30,628.57 ÷ 0.50. Current price covers only ~9.6% profit after the 30% cost shares — either raise toward floor or consciously accept the lower profit |
| vCPU (Public Cloud on VMware), 1 GHz | 104.25 | +1.50 support (product ticket pool ÷ GHz base) +0.20 billing (₴8/line ÷ ~40 GHz per line) → loaded 105.95 | 16.95 | 25.43 | 21.19 | 42.38 | **211.90** | 180 | Same formula, Public-cloud cell. Note the billing charge is per invoice LINE, so it splits across the GHz on that line |
| AI Implementation Engineer, 1 h | 2,468 (delivery labor) | ₴8/invoice-line ≈ ₴0.1/hour — negligible, charge per line | 176.29 (5%) | — (one-time work, no recurring relationship cost) | 352.57 (10%) | 528.86 (15%) | **3,525.71** | 3,530 | Floor = 2,468 ÷ 0.70. Current price exactly clears a 30% margin — IF ₴2,468 is cost per *billable* hour. If it is cost per *paid* hour, divide by ~72% billable utilization first (industry benchmark) → floor ₴4,897, and the current price is ~28% under |
| Microsoft 365 Business Standard, 1 user, monthly | 604.80 | +8 billing → loaded 612.80 | — exempt | — exempt | — exempt | 2% min / 5% target | **625.31 floor** (2%); 645.05 = 5% target price | 660 | Market-priced resell: floor = 612.80 ÷ 0.98. Current price clears with 7.15% effective margin — pricing is fine; the 2–5% band in the cost sheet is the thing to revise |

## Table 2 — the two questions, answered straight

| Question | Answer |
|---|---|
| **How is the 1-year budget vs 4-year customer lifetime handled?** | You never need a 4-year budget. Costs split into two kinds. **Running costs** (support, billing, account managers, VOK invoicing, general): this year's budget ÷ this year's capacity or revenue base = this year's rates; re-set annually — done. **Sales-type costs** (sales, campaigns, partner, contracting): they buy a customer who then pays for ~48 months, so each year's pool is recovered as a small % on every month's bill across the customer's life. The formula: sales % = annual pool ÷ (new MRR added that year × lifetime months). Check it recovers exactly: % × new-MRR × 48 = the pool. Use per-segment lifetimes from billing history (how long customers actually stay), not one blanket 4 years. One honest caveat: in the first years only the newest customer cohorts pay this %, so the pool under-recovers until ~4 cohorts stack; count the gap explicitly as growth investment or fold it into general costs — decide once, write it down. This is standard SaaS CAC amortization; accounting (ASC 340-40) amortizes sales commissions over the same ~4-year customer life |
| **We allocated cost to "Private Cloud on VMware" — how does it reach all the components inside it?** | You don't split the product's pool component-by-component by effort — nobody can, and everyone who tried (telecom regulators included) gave up and standardized on a uniform spread. Convert the pool into a percentage: product pool ÷ product's expected revenue = say 8%. Then **every component line billed under that product carries 8% of its own price**. A ₴50,000 node contributes ₴4,000, a ₴180 vCPU contributes ₴14.40 — the burden scales with price automatically, and at budgeted volumes the percentages sum back to exactly the pool. (Regulators do the same thing marking up over cost instead of price; both are sanctioned conventions — pick one base, document it, never mix.) Zero-priced components carry nothing — they're governed by the quote rule instead (sellable only alongside the components that fund them). The only exception: per-event costs (tickets, invoice lines) are charged per event, never via a % |

## What we still need before computing the real rate card

1. Data fixes: reconcile the component master (463 rows) with the product-mapping table (593 distinct components); fix the Cubbit S3 ₴15.6B MRR anomaly; classify the 187 zero-price placeholder rows; confirm the "Q1-2026 new MRR" column is truly monthly-recurring.
2. Inputs: CRM sales split by category; campaign→product tags; VOK contracting/invoicing split; partner-sourced MRR share; one quarter's ticket/invoice/contract volumes + team capacities and standard handling times; AM/TAM book map by tier; billing-cohort retention by segment; CFO's target margin per cell; R&D sustaining-vs-new split.

## Sources (what "best practice" means here)

Activity-based costing and the "allocate only where causal" rule — Cooper & Kaplan (HBR 1988/1991, *Cost & Effect* 1998). Per-event rates at practical capacity — Kaplan & Anderson, time-driven ABC (HBR 2004). Uniform mark-up over a component catalog for common costs — telecom-regulator costing practice (BEREC/ERG common position, LRIC+ models). Amortizing sales cost over customer lifetime — SaaS CAC/LTV convention (Skok; KeyBanc/Benchmarkit surveys); ASC 340-40 as the accounting analog for commissions. Market-priced resell exemption — distributor/reseller pricing practice (McKinsey; CSP benchmarks). Services priced off billable utilization — SPI Research benchmarks (~69–73% utilization).
