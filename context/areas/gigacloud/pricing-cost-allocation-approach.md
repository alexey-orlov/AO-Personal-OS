# Component pricing — cost → price model

_status: v5 — v4 (4 challenge reviews applied) + Alex's department clarifications folded in; 2026-08-27_
_updated: 2026-08-27_
_source: working session (chat, 2026-08-27); inputs = catalog exports (components, products, mapping), the cost-center sheet, and the P&L + org-structure + attribution workbook_

## The idea

Every component price must cover its direct cost, a share of the departments that sell and serve it, a share of general costs, and profit. Each cost is charged at the level where a real connection can be **measured** — per event (ticket, invoice line), per customer tier (account managers), per product category (sales & marketing) — never deeper. Below the measurable level it is spread evenly in proportion to price (standard practice — see Sources).

Every component gets **two numbers**:

- **Economic floor** = COGS + per-event charges. The hard minimum at quote time — selling below this loses money on the deal itself.
- **Target price** = `(COGS + per-event charges) ÷ (1 − sales% − retention% − general% − profit%)`. Governs list prices and margin reporting.

Sales between floor and target are allowed but flagged and tracked. This split is deliberate: forcing every deal to full-cost price cuts volume, which raises per-unit fixed cost, which raises the "floor" again — the classic death spiral.

The shares are % of the final price, so the target price is the loaded cost divided by what is left. Profit% is derived: target gross margin − the three shares (e.g. 50% − 8% − 12% − 10% = 20%).

**Rules:**

- Every cost lives in exactly one term — nothing is counted twice.
- All rates use **capacity, not actual volume**: per-event rates = pool ÷ team capacity (~85%) × standard time; pooled-hardware rates = pool ÷ (usable deployed capacity × planned utilization). Idle cost is a company loss shown separately — never a price increase.
- Capacity deployed ahead of demand ("growth reserve") is investment — excluded from current rates until commissioned into the sold pool. Internal, demo and trial usage consumes capacity at cost, booked internally — never absorbed into customer rates.
- Shares and floors are computed on **realized quoted price**, not list. A discount taking a line below floor is a named, approved margin concession.
- Resold licenses are exempt from the uniform shares (C/D/E) **only** — they still carry every directly caused cost: ₴/line billing, ₴/ticket for tickets they cause, per-deal partner payouts, license-program-management hours. Vendor rebates/MDF are netted into resell COGS, not booked as other income. A component is "resell" iff its COGS books to P&L line 2.8 — keep that flag in the component master.
- Prices are checked **per quote**: quote minimum = Σ line economic floors + product-level % + partner payout on partner-sourced deals. Zero-priced components are quotable only alongside the components that fund them. One-time setup is billed as its own one-time line, never baked into monthly rates.
- Rates are recomputed each year from the new budget.

## Attribution classes

| Class | Meaning | ₴ reaches a component as… |
|---|---|---|
| **A — Direct COGS** | caused by a specific component | the catalog COGS number |
| **B — Per-event charge** | countable events | ₴/ticket, ₴/invoice-line, ₴/setup-order, per-deal commission — added into that line's cost |
| **C — Sales share** (infra + services only) | acquisition cost, by product category | % of monthly realized price, spread over customer lifetime |
| **D — Retention share** (infra only) | account/technical-account managers by customer tier | % of monthly realized price |
| **E — General share** (infra + services only) | no honest driver exists | one uniform % of realized price |
| **G — Hardware cost** | equipment depreciation & leasing | dedicated devices: per device via the asset register; pooled platforms: pool ₴ ÷ (usable capacity × planned utilization) = ₴/unit |
| **X — Excluded** | non-operating / financial | not in prices at all |

## Full expense list × attribution (Q2-2026 actuals, ₴/quarter — illustrative; rates compute from full-year budget lines)

| P&L line | Q2-26 ₴ | Class | How the ₴ reaches a component | Gap / action |
|---|---|---|---|---|
| 2.1.1 ЗП Відділ архітектурних рішень | 4,484,878 | Product-% / E | Jira-tagged product work → that product's/category's product-sustaining pool (enters prices as the product-level %); untagged general research → general share | ⚠ Enforce product tags on Jira time (→ TODO 6) |
| 2.1.2 ЗП Департамент розвитку продуктів | 2,439,518 | E | General share — product development is not caused by current sales | ⚠ Misplaced in COGS today; confirm which org team (R&D 8 or Product 4) |
| 2.1.3 ЗП Відділ Інформаційної Безпеки | 1,912,936 | A / E split | Project hours (security components/products) → their COGS; general hours → general share | ⚠ Separate project vs general hours (Alex's todo, → TODO 6) |
| 2.1.4 ЗП Відділ білінгу | 1,211,460 | B | ÷ line capacity → ₴/invoice-line (system processing; ВОК's collection people are separate — class D) | — |
| 2.1.5 ЗП Департамент доставки ІТ послуг | 7,274,952 | A + B | Billable hours = services-component COGS; provisioning → ₴/setup-order | ⚠ Billable-hours share needed |
| 2.2 Податки на ЗП (соб.) | 3,200,736 | follows | Pro-rata on each salary line above | ⚠ Effective rate 18.5% vs 13.9% on admin salaries — verify once (→ TODO 12) |
| 2.3 Колокейшн | 16,388,920 | G-route | Per rack/kW via asset register; power follows the device class (GPU racks ≠ average) | ⚠ Asset register (→ TODO 5) |
| 2.4 Тех. підтримка обладнання | 1,651,177 | A | Vendor-support contracts per device class | ⚠ Same register |
| 2.5 Послуги передачі даних | 3,916,506 | A | Per circuit → telecom components | — |
| 2.6 Ліцензії ПО роялті | 26,959,720 | A | Per-core/per-VM cost → license components | — |
| 2.7 Накладні витрати (соб.) | 915,950 | E | Default general | ⚠ Review contents once (→ TODO 12) |
| 2.8 Роялті (ресейлінг) | 7,784,196 | A | Resell component COGS; **net vendor rebates/MDF into this line** | ⚠ Find where rebates land today (→ TODO 12) |
| 5.1.1.1 ЗП sales department | 9,456,450 | C | CRM category split → % on monthly price over lifetime | ⚠ CRM split needed; ⚠ if TAM salaries sit inside this line, split them out into D — class D has no cost basis today (→ TODO 3) |
| 5.1.1.2 ЗП маркетинг | 2,809,000 | C / E split | Campaign-tagged → that category's sales share; brand → general | ⚠ Tagged-vs-brand % |
| 5.1.1.3 ЗП ВОК | 1,030,714 | C / D split | Contract-signing → sales share; invoicing & collection → retention | ⚠ Activity split |
| 5.1.1.4 ЗП пресейл | 1,825,000 | C | Deal-based category split | — |
| 5.1.1.5 ЗП тех. підтримки | 2,252,038 | B | ÷ ticket capacity → ₴/ticket, split by SLA class when data allows | ⚠ Sits in sales & marketing today, but support is cost-to-serve; ticket volumes needed |
| 5.1.2–5.1.3 зп + податки S&M | 1,888,254 | follows | Pro-rata on the 5.1.1 lines | — |
| 5.1.4 Маркетинг і реклама | 3,343,809 | C / D / E | Targeted (events, digital, media, SEO, site ≈ ₴2.14M) → tagged category's sales share; client gifts ≈ ₴0.09M → retention; associations, print, other ≈ ₴0.97M → general | ⚠ ≈₴0.15M of sub-lines unlabeled — verify once |
| 5.1.6 Накладні (S&M) | 513,134 | follows | Pro-rata on the 5.1 lines | — |
| 5.1.7 Виплати реселерам і партнерам | 4,304,619 | B per deal | Commission attached to the partner-sourced quote's lines (incl. resell lines — they are not exempt from directly caused cost). List prices exclude it; the per-quote check adds it | ⚠ Check per-deal traceability |
| 5.2.1.1–5.2.1.6 ЗП адміністрація (внутр. ІТ 1.04M, Operations 2.73M, HR 1.64M, legal 1.06M, фінанси 2.42M, адмін-госп. 3.55M) | 12,441,983 | E | One general % | ⚠ Confirm Operations does nothing customer-facing |
| 5.2.2 Податки на ЗП (адм.) | 1,731,271 | E | With their salary lines | — |
| 5.2.3 Консультанти | 3,530,776 | E | General | ⚠ Unless project-specific (→ TODO 12) |
| 5.2.4 Відрядження | 232,217 | C / E | Sales trips → sales share; rest general | minor |
| 5.2.5 Оренда офісу | 3,223,539 | E | General (DC rent is in 2.3) | — |
| 5.2.7–5.2.14 (робочі місця 2.38M, телефонія, банк, канцтовари, навчання, страховка 0.58M, ПО персоналу 1.47M, інші 3.28M) | 8,127,590 | E | General; exception: bank **payment-processing fees** are per-invoice → join the ₴/line charge (B) | — |
| 7.x Інші доходи (курсова, % банку) | +3,570,073 | X | Not in prices — except any vendor rebates hiding here → net into 2.8 | ⚠ TODO 12 |
| 8.x Інші витрати | 1,795,136 | X | Not in prices | — |
| 13 Проценти к виплаті | 1,299,295 | X | Financing | ⚠ If it funds equipment → treat within G consistently with leases (→ TODO 16) |
| **14 Амортизація** | **10,930,338** | **G** | Dedicated → per device; pooled → ₴/unit at planned utilization | ⚠ See callout below |
| **15 Лізингові платежі** | **16,077,964** | **G** | Same route | ⚠ Same |
| 17 Податок на прибуток | 0 | X | Not in prices | — |

Completeness: the listed lines sum to the P&L section totals (COGS 78.1M · S&M 27.4M · admin 29.3M); ordinals 5.1.5 and 5.2.6 do not appear in the P&L (zero or unused). Any new P&L line defaults to class E until classified.

**Hardware is the biggest structural item.** Lines 14+15 put ~₴27M/q of hardware cost below EBITDA, outside COGS — true gross margin is ~51%, not the reported 64%. Reconcile with the catalog "equipment cost" so hardware is counted exactly once. Two rules when building the register: a fully depreciated server still in service carries a replacement-based cost, never zero (otherwise old hardware gets fake-cheap floors and refreshed hardware inflated ones); leased and owned devices of the same class must carry the same capital cost (strip financing interest or add it for both).

**Existing draft sheet (General):** the per-category columns are the right idea (today ₴120k placeholders). Spreading the ~₴60M pool by gross-profit share is wrong for sales costs — they must follow CRM/campaign causality (class C); an even spread is acceptable only for the general pool (class E). The admin columns all belong to one class-E rate — no per-category split needed. Action: TODO 15.

## Worked examples (real components; shares in ₴ at the target price)

Illustrative rates until budgets are plugged in — one line per price-list type:
- Infra: sales 8% · retention 12% · general 10% · profit 20% (= 50% target gross margin)
- Services: sales 5% · general 10% · profit 15% (= 30%)
- Resell: exempt from shares; minimum band = CFO decision (TODO 17)

| Component (real) | COGS ₴/mo | + per-event | Sales | Retention | General | Profit | = Target price | Current | Derivation |
|---|---|---|---|---|---|---|---|---|---|
| Node for Private Server (1×16c, 256 GB) | 30,440.57 | +180 support +8 billing → 30,628.57 | 4,901 | 7,351 | 6,126 | 12,251 | **61,257** | 50,730 | 30,628.57 ÷ 0.50; current price leaves ~9.6% profit vs 20% target |
| vCPU (Public Cloud), 1 GHz | 104.25 | +1.50 +0.20 → 105.95 | 16.95 | 25.43 | 21.19 | 42.38 | **211.90** | 180 | ₴8 billing is per line, split across the line's GHz. Pooled platform: the 104.25 must come from pool-cost ÷ (usable GHz × planned utilization) — verify against the register |
| AI Implementation Engineer, 1 h | 2,468 | ~₴0.1/h | 176 (5%) | — | 353 (10%) | 529 (15%) | **3,526** | 3,530 | 2,468 ÷ 0.70. If COGS is per *paid* (not billable) hour, ÷ ~72% utilization → **4,897** (TODO 11 resolves which) |
| Microsoft 365 Business Standard, monthly | 604.80 | +8 → 612.80 | — | — | — | per band | **625.31** at 2% | 660 | Exempt resell: 612.80 ÷ 0.98. Current clears at 7.15%; catalog resell margins actually run 6.4–9% — band decision is TODO 17 |

Economic floors (quote-time minimums) for the same rows: **30,629 · 105.95 · 2,468 · 612.80**.

## Two design questions, answered

**How is the 1-year budget vs the 4-year customer lifetime handled?**
No 4-year budget is ever needed. Running costs (support, billing, account managers, general): this year's budget ÷ this year's capacity or revenue = this year's rates, reset annually. Sales-type costs buy ~48 months of revenue, so: **sales % = annual pool ÷ (new infra+services MRR added that year × lifetime months)** — MRR = monthly recurring revenue; the % recovers the pool exactly (% × new-MRR × 48 = pool). For one-time products there is no spread: sales % = category pool ÷ category annual booked revenue. Use per-category lifetimes = new-MRR-weighted average of the segment lifetimes of that category's new customers, from billing history. One caveat, decided once: in the first years the % will not fully repay the pool — full recovery comes only once ~4 yearly customer intakes are paying at the same time. Book the gap as growth investment, or add it to the general share.

**Cost sits on "Private Cloud on VMware" as a product — how does it reach the components inside it?**
Never split by effort — impossible, and everyone who tried (telecom regulators included) standardized on a uniform spread. Product pool ÷ the product's budgeted revenue (via the taxonomy bridge, TODO 13) = a %, and **every component line billed under that product carries that % of its realized price**, joining the denominator next to sales/retention/general. A ₴50,730 node contributes ~₴4,058, a ₴180 vCPU ~₴14.40 — scales automatically, sums back exactly. Zero-priced components carry nothing — quote rules govern them. Per-event costs stay per event.

## Alex's TODO

**Collect (data that doesn't exist yet):**
1. CRM category split for sales + presale — metric decided once: **closed-won new MRR by category** (pipeline-weighted as fallback); campaign→category tags; ВОК activity split; partner-sourced revenue by category.
2. Volumes AND capacities: tickets by product + standard min/ticket + support capacity-minutes (later split ₴/ticket by SLA class); invoice-line counts + billing capacity-minutes + standard min/line; average units per invoice line (GHz, hours); Delivery billable-hours share.
3. AM/TAM book map (customers per tier, tier revenue by category) — and locate TAM salaries in the P&L (likely inside 5.1.1.1) so class D has a cost basis.
4. Retention by customer start-year per segment → real lifetimes (per-category = new-MRR-weighted average); net bad-debt rate by segment.
5. Asset register: each device → component group, its depreciation or lease ₴, its **billed-unit capacity** (GHz per host at design overcommit, TB per array at design fill, nodes per rack), power by device class; multi-group devices split by rated-capacity share; current **sold-vs-deployed utilization per platform**; growth-reserve designation per device.
6. Function confirmations: архітектурні рішення (pre- vs post-sale), Operations (customer-facing?), розвитку продуктів (which team), Інформаційна Безпека time split.

**Fix (known data errors):**
7. Component master vs product-mapping reconciliation: 54 master components map to zero products (retire or map); ~130 names in the mapping have no master row (no price/COGS).
8. Cubbit S3 ₴15.6B MRR anomaly; confirm "Q1-2026 new MRR" is monthly-recurring, not bookings.
9. Classify the 187 zero-price placeholder components (priced-on-quote vs included-in-parent).
10. Reconcile catalog COGS with the P&L: equipment cost vs lines 14/15 (no double count, no gap); support cost location (catalog says COGS, P&L says S&M).
11. Determine whether catalog services COGS is per paid or per billable hour (39% swing in the floor); if paid — use actual Delivery utilization, not the benchmark.
12. Review-once bucket: contents of 2.7; project-specific consultants in 5.2.3; whether line 13 interest funds equipment; where vendor rebates/MDF land (→ net into 2.8); the payroll-tax rate gap (18.5% vs 13.9%); the ≈₴0.15M unlabeled marketing sub-lines.

**Structure (one-time modeling decisions):**
13. One taxonomy bridge: P&L revenue lines ↔ 8 billing groups ↔ 17 catalog categories, with **product** as a level under category. Catalog Product Category = the canonical axis.
14. Org-team → P&L-salary-line map (support 19, TAM 4, SDR 3, Sales Enablement 5, R&D 8, Product 4 — several have no obvious line).
15. Replace the ₴60M gross-profit-share spread in the draft sheet with class C (CRM splits) + one class-E rate.
16. Decide-once book, written down: spread base = realized price; EUR price list = PL COGS ÷ (1 − the same category shares − profit%), ₴ per-event rates converted at budget FX (or commission separate PL pools — choose); setup billed as its own one-time line; resell flag = books to 2.8; depreciated-in-service assets carry replacement-based cost; lease-vs-owned interest treatment; internal/trial usage at cost.
17. Target gross margin per {category × component-type} cell — CFO decision, **including the resell minimum band** (supersedes the stale 2–5%; catalog runs 6.4–9%).

**Calculate (in this order):**
18. Monthly revenue per catalog category (billing groups through the bridge; full-year budget basis).
19. Per-event rates at ~85% capacity: ₴/ticket, ₴/invoice-line, ₴/setup-order. Per-component support charge = ₴/ticket × (product's monthly tickets ÷ product's billed component-unit count).
20. The shares: retention% per category = Σ (tier pool attributed to the category via the book map) ÷ category revenue; sales% per the formula above; general% = E-pool ÷ infra+services revenue.
21. Economic floor + target price per component; margin bridge current-vs-target per category; flag every component below floor.
22. Quarterly customer profitability (revenue − component COGS − actual per-event consumption − tier retention cost) and its curve — drives AM-tier assignment and renewal repricing of the legacy base.
23. Sanity checks, computed **net of resell revenue**: sales+marketing spend ÷ new annual recurring revenue ≈ 1.3 (SaaS benchmark); customer-win cost paid back by gross profit within 18 months; all rates × budgeted volumes re-sum to the annual budget, with the sales share reconciled per customer-intake year (the year-1 gap is the documented growth investment).

## Sources

Method follows standard practice: activity-based costing and capacity-based rates (Cooper, Kaplan & Anderson — HBR), telecom regulators' component-catalog costing (BEREC), the SaaS convention of recovering sales cost over customer lifetime, distributor economics for resell, and services-industry utilization benchmarks (SPI, ~69–73%). Detailed references available on request.
