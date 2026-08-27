# Component pricing — cost → price model

_status: v3 — plain-language model + full P&L expense-attribution table + Alex's TODO; verified 2026-08-27_
_updated: 2026-08-27_
_source: working session (chat, 2026-08-27); inputs = catalog exports (`~/Downloads/drive-download-20260827T071524Z-1-001/`), cost-center sheet (`…CfmHADE`), P&L + org + attribution workbook (`…vtmsp`)_

## The idea and the formula

Every component price must cover its direct cost, a share of the departments that sell and serve it, a share of general costs, and profit. Each cost is charged at the level where a real connection can be **measured** — per event (ticket, invoice line), per customer tier (account managers), per product category (sales, marketing) — never deeper. Below the measurable level it is spread evenly in proportion to price. This is standard practice (activity-based costing; telecom-regulator catalog costing; SaaS treatment of sales cost).

```
floor price = (COGS + per-event charges) ÷ (1 − sales% − retention% − general% − profit%)
```

The shares are % of the final price, so the price is the loaded cost divided by what's left. Profit% is derived: target gross margin − the three shares (e.g. 50% − 8% − 12% − 10% = 20%). Rules that keep it honest: every cost lives in exactly one term; per-event rates use team **capacity** (~85%), not actual volume (idle cost is a company loss, not a price increase); **resold licenses are exempt from all shares** (market-priced, they carry only the ₴/line billing charge); prices are checked **per quote** (customers buy arbitrary component subsets); rates are recomputed each year from the new budget.

## Attribution classes

| Class | Meaning | ₴ reaches a component as… |
|---|---|---|
| **A — Direct COGS** | already caused by a specific component | the catalog COGS number |
| **B — Per-event charge** | countable events | ₴/ticket, ₴/invoice-line added into COGS |
| **C — Sales share** | acquisition cost, split by product category | % of monthly price, spread over customer lifetime |
| **D — Retention share** | serving existing customers, by tier | % of monthly price (infra + services only) |
| **E — General share** | no honest driver exists | one uniform % of price (infra + services only) |
| **G — Hardware cost** | equipment depreciation & leasing | into component COGS via the asset register |
| **F — Excluded** | non-operating / financial | not in prices at all |

## Full expense list × attribution (Q2-2026 actuals, ₴/quarter)

| P&L line | Q2-26 ₴ | Class | How the ₴ reaches a component | Gap / action |
|---|---|---|---|---|
| 2.1.1 ЗП Відділ архітектурних рішень | 4,484,878 | C or A | If pre-sale solution design → sales share by deal records; if post-sale engineering → per-order setup charge | ⚠ Confirm the team's actual function — largest unclear salary line |
| 2.1.2 ЗП Департамент розвитку продуктів | 2,439,518 | E | General share (product development is not caused by current sales) | ⚠ Misplaced in COGS today; confirm which org team this is (R&D 8 or Product 4) |
| 2.1.3 ЗП Відділ Інформаційної Безпеки | 1,912,936 | A / E split | Hours on security components (SOC, Protected Cloud) → those components' COGS; platform security → general | ⚠ Needs a one-time time split |
| 2.1.4 ЗП Відділ білінгу | 1,211,460 | B | ÷ invoice-line capacity → ₴/line into every billed line | — |
| 2.1.5 ЗП Департамент доставки ІТ послуг | 7,274,952 | A + B | Billable hours = services-component COGS; provisioning work → per-order charge on infra components | ⚠ Need billable-hours share |
| 2.2 Податки на ЗП (соб.) | 3,200,736 | follows | Pro-rata on top of each salary line above | — |
| 2.3 Колокейшн | 16,388,920 | A | Per rack/kW via the asset register → nodes, arrays, switches | ⚠ Asset register needed |
| 2.4 Тех. підтримка обладнання | 1,651,177 | A | Vendor-support contracts per device class → those components | ⚠ Same register |
| 2.5 Послуги передачі даних | 3,916,506 | A | Per circuit → telecom components (bandwidth, L2 lines) | — |
| 2.6 Ліцензії ПО роялті | 26,959,720 | A | Per-core/per-VM license cost → license components | — |
| 2.7 Накладні витрати (соб.) | 915,950 | E | Default general share | ⚠ Review contents once |
| 2.8 Роялті (ресейлінг) | 7,784,196 | A | Resell component COGS | — |
| 5.1.1.1 ЗП sales department | 9,456,450 | C | CRM category split → % on monthly price over lifetime | ⚠ CRM split needed |
| 5.1.1.2 ЗП маркетинг | 2,809,000 | C / E split | Campaign-tagged share → that category's sales share; brand share → general | ⚠ Tagged-vs-brand % needed |
| 5.1.1.3 ЗП ВОК | 1,030,714 | C / D split | Contract-signing → sales share; invoicing & collection → retention share | ⚠ Activity split needed |
| 5.1.1.4 ЗП пресейл | 1,825,000 | C | Same as sales (deal-based category split) | — |
| 5.1.1.5 ЗП тех. підтримки | 2,252,038 | B | ÷ ticket capacity → ₴/ticket into COGS of ticket-causing components | ⚠ Sits in S&M today, but support is cost-to-serve; ticket volumes by product needed |
| 5.1.2–5.1.3 зп + податки S&M | 1,888,254 | follows | Pro-rata on the 5.1.1 lines | — |
| 5.1.4 Маркетинг і реклама (11 sub-lines) | 3,343,809 | C / D / E | Targeted (events 1.26M, digital 0.47M, ЗМІ 0.21M, SEO 0.12M, сайт 0.07M) → tagged category's sales share; client gifts 0.09M → retention; associations 0.84M, поліграфія 0.11M, інше → general | ⚠ Tag each sub-line once; keep tagging campaigns going forward |
| 5.1.6 Накладні (S&M) | 513,134 | C | Pro-rata over the S&M lines | — |
| 5.1.7 Виплати реселерам і партнерам | 4,304,619 | A per deal | Commission on the partner-sourced deal's lines (variable selling cost); if untraceable → C by partner-sourced revenue share | ⚠ Check per-deal traceability |
| 5.2.1.1–5.2.1.6 ЗП адміністрація (внутр. ІТ 1.04M, Operations 2.73M, HR 1.64M, legal 1.06M, фінанси 2.42M, адмін-госп. 3.55M) | 12,441,983 | E | One general % on infra + services prices | ⚠ Confirm Operations does nothing customer-facing |
| 5.2.2 Податки на ЗП (адм.) | 1,731,271 | E | With their salary lines | — |
| 5.2.3 Консультанти | 3,530,776 | E | General | ⚠ Unless project-specific — check once |
| 5.2.4 Відрядження | 232,217 | C / E | Sales trips → sales share; rest → general | minor |
| 5.2.5 Оренда офісу | 3,223,539 | E | General (DC rent already in 2.3) | — |
| 5.2.7–5.2.14 (робочі місця 2.38M, телефонія, банк, канцтовари, навчання, страховка 0.58M, ПО персоналу 1.47M, інші 3.28M) | 8,127,590 | E | General | — |
| 7.x Інші доходи (курсова, % банку) | +3,570,073 | F | Not in prices | — |
| 8.x Інші витрати (курсова, інше) | 1,795,136 | F | Not in prices | — |
| 13 Проценти к виплаті | 1,299,295 | F | Financing cost | ⚠ If it funds equipment, fold into G capital cost instead |
| **14 Амортизація** | **10,930,338** | **G** | Per device → the components running on it (node, array, switch) | ⚠ **Biggest structural item: sits below EBITDA today. With 15, ~₴27M/q of hardware cost is outside COGS — true GM ≈ 51%, not 64%. Must reconcile with catalog COGS ("equipment cost") — verify no double count and no gap** |
| **15 Лізингові платежі** | **16,077,964** | **G** | Same asset-register route | ⚠ Same |
| 17 Податок на прибуток | 0 | F | Not in prices | — |

**Assessment of the existing attribution draft (General sheet):** direct per-category columns (Маркетинг/Продажі/Пресейл) — right instinct, currently ₴120k placeholders. The ~₴60M pool spread by **gross-profit share** — replace: GP-share spreading is the "peanut-butter" anti-pattern for sales costs (they must follow CRM/campaign causality, class C); it is acceptable only for the general pool (class E), and even there price-proportional within infra+services is cleaner. The admin columns (ЗП/бюджети/оренда/ІТ/інше with ₴12M placeholders) all belong to one class-E rate — no need to split them per category at all.

## Worked examples (real components; shares in ₴ at the floor price)

Illustrative rates until budgets are plugged in: infra — sales 8%, retention 12%, general 10%, profit 20% (=50% target GM); services — sales 5%, general 10%, profit 15% (=30%); resell — exempt, 2–5% min.

| Component (real) | COGS ₴/mo | + per-event | Sales | Retention | General | Profit | = Floor | Current | Derivation |
|---|---|---|---|---|---|---|---|---|---|
| Node for Private Server (1×16c, 256 GB) | 30,440.57 | +180 support +8 billing → 30,628.57 | 4,901 | 7,351 | 6,126 | 12,251 | **61,257** | 50,730 | 30,628.57 ÷ 0.50; current price leaves ~9.6% profit vs 20% target |
| vCPU (Public Cloud), 1 GHz | 104.25 | +1.50 +0.20 → 105.95 | 16.95 | 25.43 | 21.19 | 42.38 | **211.90** | 180 | ₴8 billing is per line, split across the line's GHz |
| AI Implementation Engineer, 1 h | 2,468 | ~₴0.1/h | 176 (5%) | — | 353 (10%) | 529 (15%) | **3,526** | 3,530 | 2,468 ÷ 0.70. If COGS is per *paid* (not billable) hour, ÷ ~72% utilization → floor **4,897** |
| Microsoft 365 Business Standard, monthly | 604.80 | +8 → 612.80 | — | — | — | 2% min / 5% target | **625.31** floor; 645.05 target | 660 | Exempt resell; current clears at 7.15%. The cost sheet's 2–5% band looks stale (catalog runs 6.4–9%) |

## The two questions

| Question | Answer |
|---|---|
| **1-year budget vs 4-year lifetime?** | No 4-year budget is ever needed. Running costs (support, billing, AMs, general): this year's budget ÷ this year's capacity or revenue = this year's rates, reset annually. Sales-type costs buy ~48 months of revenue, so: **sales % = annual pool ÷ (new MRR added that year × lifetime months)** — it recovers the pool exactly (% × new-MRR × 48 = pool). Use per-segment lifetimes from billing history. Caveat, decide once: early years under-recover until ~4 cohorts stack — book the gap as growth investment or fold into general |
| **Cost sits on "Private Cloud on VMware" — how does it reach its components?** | Never split by effort — impossible; regulators standardized on a uniform spread instead. Pool ÷ product's expected revenue = a %, and **every component line billed under that product carries that % of its own price** (₴50,730 node → ₴4,058; ₴180 vCPU → ₴14.40). Scales automatically, sums back exactly. Zero-priced components carry nothing — quote rules govern them. Per-event costs stay per event |

## Alex's TODO

**Collect (data that doesn't exist yet):**
1. CRM category split for sales + presale (opportunities, activities, pipeline); campaign→category tags; ВОК activity split (contracting vs invoicing); partner-sourced revenue by category.
2. Ticket volumes by product + support team capacity-minutes + standard minutes/ticket; invoice-line counts; Delivery billable-hours share.
3. TAM/AM book map (which customers per tier, tier revenue by category).
4. Billing-cohort retention by segment → real lifetimes (replace the blanket 4 years).
5. Asset register: each server/array/switch → component group it serves, with its depreciation or lease payment. Unlocks classes A and G.
6. Function confirmations: архітектурні рішення (pre- vs post-sale), Операції (any customer-facing work), розвитку продуктів (which org team), Інформаційна Безпека time split.

**Fix (known data errors):**
7. Component master (463) vs product-mapping (593) reconciliation; retire or map the 54 orphans.
8. Cubbit S3 ₴15.6B MRR anomaly; confirm "Q1-2026 new MRR" is monthly-recurring, not bookings.
9. Classify the 187 zero-price placeholder components (priced-on-quote vs included-in-parent).
10. Reconcile catalog COGS with the P&L: does the catalog "equipment cost" equal the depreciation+leasing per unit (lines 14/15)? No double count, no gap. Same check for support (catalog says COGS, P&L says S&M).

**Structure (one-time modeling decisions):**
11. One taxonomy bridge: P&L revenue lines (ProCloud/Public/інший) ↔ 8 billing groups (E-Cloud, S-Cloud…) ↔ 17 catalog categories. Make catalog Product Category the canonical axis; billing groups feed revenue per category through the bridge.
12. Org-team → P&L-salary-line map (19 support people, TAM 4, SDR 3, Sales Enablement 5, RND 8, Product 4 — several teams have no obvious P&L line).
13. Replace the ₴60M GP-share spread in the draft sheet with: class C via CRM splits + class E as one uniform rate.
14. Decide once and document: spread base = price; EUR/PL price list gets its own cost base (PL COGS column exists in the catalog; the P&L here is UA).
15. Set the target GM per {category × component-type} cell (CFO decision, within stated envelopes), profit% derived.

**Calculate (in this order):**
16. Monthly revenue per catalog category (billing groups through the bridge).
17. Per-event rates at ~85% capacity: ₴/ticket, ₴/invoice-line, ₴/order setup.
18. Retention % per tier → per category; acquisition % per category (pool ÷ new-MRR-added ÷ lifetime-months); general % (E-pool ÷ infra+services revenue).
19. Floors per component (the formula); margin bridge current price vs floor per category; flag every component below floor.
20. Sanity checks: CAC ratio (S&M ÷ new ARR ≈ 1.3 benchmark), GM-adjusted payback < 18 mo, and total: all rates × budgeted volumes must re-sum to the annual budget.

## Sources

Activity-based costing / allocate-only-where-causal: Cooper & Kaplan (HBR 1988/1991; *Cost & Effect*). Capacity-based per-event rates: Kaplan & Anderson (TDABC, HBR 2004). Uniform mark-up over a component catalog: telecom-regulator practice (BEREC/ERG LRIC+). Sales-cost amortization over customer life: SaaS CAC/LTV convention (Skok; KeyBanc/Benchmarkit); ASC 340-40 analog. Market-priced resell exemption: distributor pricing (McKinsey). Services utilization: SPI Research (~69–73%).
