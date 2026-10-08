# Pricing & unit economics — component cost allocation

_status: allocation framework implemented in Юніт.xlsx — steps 1–5 computed for all five buckets in tab «4. Allocation by components (k)» (Юніт 08.10); results deck v18 (40 slides, 10-08): Public Cloud on OpenStack and Licenses cost more than their current average check (+32 %, +15 %), professional services 111× the check_
_updated: 2026-10-08_

## Snapshot

- Goal: attribute every expense to components so component prices deliver predictable per-component margins; end state is a repriced catalog with floor/target governance. (chat, 2026-08-27)
- Catalog model: 96 products (containers) / 463 priced components; a sale is a case-by-case component set within a product. Three component economic types (CFO cost sheet): infra GM 20–50 %, license resell 2–5 %, prof services 20–30 %. (chat, 2026-08-27)
- **Implemented framework (current truth, Юніт.xlsx):** a 5-level tree — Budget (ФОТ / не-ФОТ) → expense types (COGS Direct / Indirect · CAC · General) → 5 allocation buckets (Public Cloud (low) · Public Cloud (high) · Private Infra · Licenses · Our services) → 82 products (3 / 7 / 11 / 54 / 7) → components (13 / 52 / 147 / 202 / 13). Direct COGS never goes top-down: it is priced per unit from supplier prices or internal rates. (chat, 2026-09-26)
- **Step 1 (budget → types):** whole department to one type (per the «Allocation methods» tab) or an expert split with the department head; employee provisioning follows the ФОТ split; ФОТ of the mobilised → General; direct COGS (Delivery hardware/DC/colocation/power/IPs/channels/leasing; СТП hours on Cloud Admin Services) is excluded. (chat, 2026-09-26)
- **Step 2 (types → buckets), five methods:** Expert · Task-tracker · By ФОТ % · Sales data (Inbound: the team's CAC splits by the sellers' effort share, effort = deal-months 2026 (plan × cycle) ÷ an expert intensity of parallel deals per rep) · By Direct margin (General ₴17,9 M split by each bucket's share of direct margin: low 1,72 M / high 7,17 M / Private 8,90 M / Licenses 0,13 M / Our services 2 080 ₴). Every method hands step 4 a bucket share. (chat, 2026-09-26/-28)
- **Step 4 rule — by Direct COGS, never by price:** Indirect COGS and General per unit = bucket pool ÷ Σ(Direct COGS × units at year-end × 12) × the component's Direct COGS, with year-end units = units × (1 + growth) × (1 − churn); CAC = pool ÷ (Σ Direct COGS of new sales × 12 × lifetime / 12) — new sales only, over the customer lifetime. Worked, Public Cloud (high) vCPU 1 GHz: Direct COGS 80,25 ₴/mo → Indirect COGS 5,61 + CAC 29,81 + General 20,85 ₴/mo. This replaces the approach doc's price-proportional spread and makes concrete Alex's 08-28 COGS-weight bridge. (chat, 2026-09-26)
- **Two decks** (UA, GigaCloud template; live files on Alex's MacBook Air in `~/Desktop/GigaCloud/`, hand-edited — living-documents rule; handoff: [docs/margin-deck/HANDOFF.md](docs/margin-deck/HANDOFF.md)):
  - **Plan deck v5** (13 slides, 08-27 → 09-26): goal, output-table schema, price stack, 6 principles, 4 attribution models **A1/A2/B/C/D** — ⚠ this lettering is canonical when Alex says «модель B/C/D» and matches neither the Margin.xlsx block labels nor the A–G classes of [pricing-cost-allocation-approach.md](pricing-cost-allocation-approach.md). (chat, 2026-08-27/-28)
  - **Results deck v18** (40 slides, 10-08; Alex's hand-edited file is the live copy; results first, then «Методологія»): intro incl. «margin per component, not per deal» (seller hours, support incidents, partner commissions vs one component price); results — budget by type and by bucket (CAC incl. Sales ФОТ), cost per 1 UAH of Direct COGS + FTE per bucket (COGS 57,4 / CAC 59,0 FTE), product margins on three slides with key-insight panels: infrastructure (OpenStack costs 132 % of its 3 369 ₴ check, VMware 61 % of 20 991 ₴, Private Cloud on VMware 76 % of 805 127 ₴), licenses (115 % of 6 586 ₴) and professional services (costs 10,85 M ₴ = 111× the 97 808 ₴ check, CAC 194 ₴ per 1 ₴ of Direct COGS — shown on an absolute scale), action plan; methodology — steps 1–5 with worked examples from tab (k) (Public Cloud (low): HDD 200 IOPS, vRAM Linux, Additional IP — rows 58/61/59). Not committed (employee names, mobilisation status). (chat, 2026-09-26 → 10-08)
- Reasoning reference: [pricing-cost-allocation-approach.md](pricing-cost-allocation-approach.md) (v5 recommendation, 2026-08-27) — floor = economic minimum at quote time, target price = loaded cost ÷ (1 − shares − profit %); мінімальна прибутковість = % від фактичної ціни продажу, approvers CFO + CEO + CBDO.

## Active threads

- **Allocation → margins.** Step 4 is computed for Public Cloud (high) only (3 components); next the other four buckets, then step 5 (margin per component and product). Right after the project: target profitability, prices & discount policy, cost-optimization zones. Owner: Mine. (chat, 2026-09-26)
- **Results presentation.** Deck ready for the plan's «Презентація результатів» milestone (30 Sep — board decision on minimum profitability). Owner: Mine. (chat, 2026-09-26)

## People

- CFO (unnamed) — owns the cost-center structure; approves the allocation logic and, with CEO + CBDO, the minimum profitability. (chat, 2026-08-27)

## Decisions
- 2026-10-08 — Step 2, method 4 (Sales data) reworked: each sales team's payroll (Inbound, Outbound, Growth, Enterprise; 32,7 M) is split across buckets in proportion to deals × relative effort per deal (expert: low 1, high 2, Private 8, Licenses 1, Services 2); cloud deals from the 2026 sales plan, licenses/services deals expert-estimated. Step 4 has one CAC formula for the whole pool (CAC w/o Sales ФОТ + Sales ФОТ). (chat)

  - Why the plan dependence is fine (Alex): the plan enters both the step-2 share and the step-4 denominator (new sales). A small Licenses share is therefore spread over few new units, and per-unit CAC does not depend on how much of a bucket the plan expects.
  - This holds only if step 4's new sales come from the same plan.
  - Replaces the 09-27 per-deal / allocation-to-customer design. Lesson: before agreeing that a dependence in one step distorts unit costs, trace it to the end of the chain, where it may cancel.
- 2026-09-26 — Results deck rulings: names, teams and roles shown, no ФОТ sums; step-3 product counts follow the tree (11 / 54) over the tab (13 / 52); «Allocation methods» is the authority for "whole department → one type"; the glossary uses 82 products (brief said 89); the tree is rebuilt as native shapes, fully as drawn. (chat)
- 2026-09-26 — Step 4 spreads bucket costs by Direct COGS (₴ of cost per 1 ₴ of Direct COGS), never by price; CAC only over new sales × customer lifetime. (chat)
- 2026-08-28 — Product/group → component by the component's COGS weight, not price share (Alex overruled the price-share recommendation: prices are being redesigned, COGS is price-independent). (chat)
- 2026-08-27 — One approach: causal-level allocation + margin-stack recovery; legacy customers stay in every denominator; license resell exempt from overhead and acquisition spreads. (chat)

## Open loops

- Mine/Alex — **FTE figures in the licenses/services insights vs the FTE slide.** The slide computes FTE from «1-2. Allocation-ФОТ» (type share × bucket split; SALES UA's 39 positions by the Sales ФОТ key): licenses CAC 6,0 FTE (insight: ≈5, incl. 3,2 Sales), services CAC 4,8 FTE (insight: 7,5). Alex to confirm which basis to show. (chat, 2026-10-08)
- Theirs (Alex) — method-4 deals differ from the 2026 plan in two cells: Outbound low 12 (plan 4), Enterprise low 0 (plan 1). (chat, 2026-10-08)
- Fixed in Юніт 08.10 tab (k): annual CAC/General pools, the high bucket's CAC pool (no longer ÷ lifetime) and the «Our services» average check (SUMPRODUCT). (chat, 2026-10-08)
- Mine — step-5 / Data open items (chat, 2026-09-27):
  - VAT basis of «Component» prices: E-Cloud labels them «with VAT».
  - Direct COGS is not in the budget file. The Data slides assume ФОТ = СТП's Our-services share (833 тис. ₴) and не-ФОТ = Q2 P&L direct lines × 4 (334,8 M ₴), split by MRR × (1 − direct margin). Both are yellow on the slides; replace them with the Capacity / FY2026 direct-cost budget.
  - «ФОТ» G206 = SUM(G4:G198) − 47 000 000 has no explanation. The Data slides use the full 300,5 M.
  - Exploitation's IP-address and DC-services lines sit in Indirect COGS although the rules make them Direct.
- Mine — step 4 for Public Cloud (low), Private Infra, Licenses, Our services; then step 5 margins.
- Mine — Inbound intensities on the Sales-data slide are placeholders (15 / 8 / 3 / 15 / 5 for low / high / Private / Licenses / Our services); the slide shows an effort share of 33 / 61 / 0 / 4 / 2 %.
  - Set the intensities with the Inbound team lead, then do the same for the other sales teams.
  - Carry them into «Таблиця сейлів», which still splits by deal-months without intensity (47 / 46 / 0 / 6 / 1 %).
  - Make step 4's new sales come from the same sales plan; the tab uses 7 % growth.

  (chat, 2026-09-28)
- Mine — reconcile the workbook: «Allocation methods» vs raw «ФОТ» (Preselling TAMs carry 60–70 % COGS, 4 Sales UA roles carry General) and «1-2 не-ФОТ» (Security, Billing mixed); «3.Products by buckets» 13 / 52 vs the tree's 11 / 54 (both Relational DB add-ons); «УГОДИ» has no Services plan (slide 15 uses 23 ≈ the typed 5 deal-months in «Таблиця сейлів» ÷ cycle 0,22); customer lifetime Public Cloud on VMware 44 (step-4 tab) vs 48 months (SysSettings); Product-dept ФОТ sums in «1-2. Allocation-ФОТ» vs the raw tab. (chat, 2026-09-26)
- Mine — plan deck: explicit «цільова прибутковість» column on the output-table slide (asked 2026-09-26, unanswered); redo the Model C example on COGS weights (standing offer). (chat, 2026-09-26)
- Mine — the August data fixes (593 vs 463 component reconciliation, Cubbit MRR anomaly, 187 zero-price rows, "new MRR" semantics) and the 8 required inputs from the [approach doc](pricing-cost-allocation-approach.md#required-inputs-to-compute-the-rate-card) — status not re-checked since 08-27.

## Activity
- 2026-10-08 — v17 (40 slides) from Юніт 08.10 tab (k): intro «per component», cost-per-1-UAH + FTE slide, licenses and services results with insights, method 4 rewritten, one CAC flow in step 4.
- 2026-10-06 — v16 from Юніт 06.10: data slides 8–9, method 5, step-4/5 examples and the products slide refreshed; the overflow above the current price/check is now drawn on one scale.
- 2026-10-01 — v15: products slide with Private Infra added and Public Cloud refreshed from Alex's updated workbook; the step-4/5 example slides still show the 09-30 low-bucket pools.
- 2026-09-30 — v14: bucket-margin slide redrawn as clean columns + legend-table after Alex's «too much text» note.
- 2026-09-30 — results deck v13 (35 slides) from Юніт_UPD: step-4/5 examples moved to Public Cloud (low), bucket-level margin slide, action plan.

- 2026-09-28 — results deck v12 (34 slides), built in Alex's latest file.
  - The Sales-data slide is back to deal-months, plus the intensity and effort rows.
  - The allocation-to-customer pair is dropped.
  - The CAC slides and the step-5 table are back to his own single-CAC versions.
  - The step-4 overview is trimmed to four rows. (chat)
- 2026-09-27 — results deck v11 (36 slides), built inside Alex's hand-edited copy: step-4 overview, a CAC split (reverted 09-28), and data slides with % of budget. His per-slide layout offsets were re-applied to every replaced slide. (chat)
- 2026-09-27 — results deck, 6 new slides from the updated brief. They cover:
  - the step-5 divider and a margins table (price, the four cost types, min. profit = 0, margin, in ₴ and % of price, plus price-structure bars);
  - a red full-bleed «Дані» section divider;
  - the FY2026 budget by type (tree + table);
  - the budget by bucket, over 2 slides (tree with aligned totals + the full ФОТ / не-ФОТ pivot).

  Found the step-4 monthly-pool error while building them. (chat)
- 2026-09-27 — results deck slide 15 (Sales data) — single-slide v2–v6 for Alex:
  - deal-months explained and the off-path 2025 rows cut;
  - reworked to the intensity method after his challenge to the plan-share split;
  - rebuilt to his table layout: team FTE-months and payroll as merged rows, CAC per deal as the result, fewer notes;
  - fully absorbed at his request: the plan's effort sums to the team's 48 FTE-months.

  Generator synced; live deck untouched. (chat)
- 2026-09-26 — results deck — 26-slide UA deck from Alex's brief + Юніт.xlsx: native tree, steps & status, glossary, steps 1–4 with method examples and step-4 pipelines; two independent reviewers (data fidelity, visual QA), five build iterations; true-font PowerPoint render set up on the MacBook Air. (chat)
- 2026-09-26 — [handoff](docs/margin-deck/HANDOFF.md) — rewritten to cover both decks; plan-deck snapshot refreshed from the Desktop copy; name-free toolchain committed under `docs/margin-deck/toolchain/`. (chat)
- 2026-08-28 — plan deck v3–v5 — A split into A1/A2 (Cubbit example), COGS-weight bridge note, output-table slide, step 10 (minimum profitability). (chat)
- 2026-08-27 — plan deck — 11-slide UA action-plan deck from Alex's brief + `Margin.xlsx` (4-model taxonomy, price stack, InfoSec P&L split, next steps). (chat)
- 2026-08-27 — [approach v4–v5](pricing-cost-allocation-approach.md) — real Q2-2026 P&L, expense-line × class table, 23-item TODO; ~₴27M/q hardware cost below EBITDA → true GM ≈ 51 %, not 64 %. (chat)
