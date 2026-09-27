# Pricing & unit economics — component cost allocation

_status: allocation framework implemented in Юніт.xlsx — steps 1–3 done, step 4 (bucket costs → 1 unit of component) 60 % (Public Cloud (high) only), step 5 (margins) to do; results deck (26 slides) built 2026-09-26 for the results presentation (plan milestone 30 Sep)_
_updated: 2026-09-27_

## Snapshot

- Goal: attribute every expense to components so component prices deliver predictable per-component margins; end state is a repriced catalog with floor/target governance. (chat, 2026-08-27)
- Catalog model: 96 products (containers) / 463 priced components; a sale is a case-by-case component set within a product. Three component economic types (CFO cost sheet): infra GM 20–50 %, license resell 2–5 %, prof services 20–30 %. (chat, 2026-08-27)
- **Implemented framework (current truth, Юніт.xlsx):** a 5-level tree — Budget (ФОТ / не-ФОТ) → expense types (COGS Direct / Indirect · CAC · General) → 5 allocation buckets (Public Cloud (low) · Public Cloud (high) · Private Infra · Licenses · Our services) → 82 products (3 / 7 / 11 / 54 / 7) → components (13 / 52 / 147 / 202 / 13). Direct COGS never goes top-down: it is priced per unit from supplier prices or internal rates. (chat, 2026-09-26)
- **Step 1 (budget → types):** whole department to one type (per the «Allocation methods» tab) or an expert split with the department head; employee provisioning follows the ФОТ split; ФОТ of the mobilised → General; direct COGS (Delivery hardware/DC/colocation/power/IPs/channels/leasing; СТП hours on Cloud Admin Services) is excluded. (chat, 2026-09-26)
- **Step 2 (types → buckets), five methods:** Expert · Task-tracker · By ФОТ % · Sales data (Inbound: CAC per deal = cycle ÷ intensity × team payroll ÷ FTE-months, with the intensities scaled so the 2026 plan fills the team's FTE-months exactly; step 4 takes the per-deal value) · By Direct margin (General ₴17,9 M split by each bucket's share of direct margin: low 1,72 M / high 7,17 M / Private 8,90 M / Licenses 0,13 M / Our services 2 080 ₴). (chat, 2026-09-26/-27)
- **Step 4 rule — by Direct COGS, never by price:** Indirect COGS and General per unit = bucket pool ÷ Σ(Direct COGS × units at year-end × 12) × the component's Direct COGS, with year-end units = units × (1 + growth) × (1 − churn); CAC = pool ÷ (Σ Direct COGS of new sales × 12 × lifetime / 12) — new sales only, over the customer lifetime. Worked, Public Cloud (high) vCPU 1 GHz: Direct COGS 80,25 ₴/mo → Indirect COGS 5,61 + CAC 29,81 + General 20,85 ₴/mo. This replaces the approach doc's price-proportional spread and makes concrete Alex's 08-28 COGS-weight bridge. (chat, 2026-09-26)
- **Two decks** (UA, GigaCloud template; live files on Alex's MacBook Air in `~/Desktop/GigaCloud/`, hand-edited — living-documents rule; handoff: [docs/margin-deck/HANDOFF.md](docs/margin-deck/HANDOFF.md)):
  - **Plan deck v5** (13 slides, 08-27 → 09-26): goal, output-table schema, price stack, 6 principles, 4 attribution models **A1/A2/B/C/D** — ⚠ this lettering is canonical when Alex says «модель B/C/D» and matches neither the Margin.xlsx block labels nor the A–G classes of [pricing-cost-allocation-approach.md](pricing-cost-allocation-approach.md). (chat, 2026-08-27/-28)
  - **Results deck** (26 slides, 09-26): price stack, Alex's allocation tree rebuilt natively, steps & status, glossary, steps 1–4 with worked examples from the workbook. Not committed (employee names, mobilisation status). (chat, 2026-09-26)
- Reasoning reference: [pricing-cost-allocation-approach.md](pricing-cost-allocation-approach.md) (v5 recommendation, 2026-08-27) — floor = economic minimum at quote time, target price = loaded cost ÷ (1 − shares − profit %); мінімальна прибутковість = % від фактичної ціни продажу, approvers CFO + CEO + CBDO.

## Active threads

- **Allocation → margins.** Step 4 is computed for Public Cloud (high) only (3 components); next the other four buckets, then step 5 (margin per component and product). Right after the project: target profitability, prices & discount policy, cost-optimization zones. Owner: Mine. (chat, 2026-09-26)
- **Results presentation.** Deck ready for the plan's «Презентація результатів» milestone (30 Sep — board decision on minimum profitability). Owner: Mine. (chat, 2026-09-26)

## People

- CFO (unnamed) — owns the cost-center structure; approves the allocation logic and, with CEO + CBDO, the minimum profitability. (chat, 2026-08-27)

## Decisions

- 2026-09-27 — Sales-data method (step 2) prices CAC per deal from the sellers' time the deal takes, fully absorbed. Replaces the deal-months share split.
  - Formula: effort = cycle ÷ intensity (deals one rep runs in parallel on that bucket); CAC per deal = effort × team payroll ÷ FTE-months.
  - The expert sets only the intensity ratios between buckets. Their level is scaled so the 2026 plan's deals take exactly the team's FTE-months, so there is no idle capacity (Alex: total effort = full-time load under this year's plan). That superseded an interim version that kept idle capacity out of prices.
  - Unlike the other four methods, step 4 takes this CAC per deal, not the bucket's share.
  - Trade-off: CAC per deal moves with the plan's total volume, while the ratios between buckets come only from cycle and intensity.

  (chat)
- 2026-09-26 — Results deck rulings: names, teams and roles shown, no ФОТ sums; step-3 product counts follow the tree (11 / 54) over the tab (13 / 52); «Allocation methods» is the authority for "whole department → one type"; the glossary uses 82 products (brief said 89); the tree is rebuilt as native shapes, fully as drawn. (chat)
- 2026-09-26 — Step 4 spreads bucket costs by Direct COGS (₴ of cost per 1 ₴ of Direct COGS), never by price; CAC only over new sales × customer lifetime. (chat)
- 2026-08-28 — Product/group → component by the component's COGS weight, not price share (Alex overruled the price-share recommendation: prices are being redesigned, COGS is price-independent). (chat)
- 2026-08-27 — One approach: causal-level allocation + margin-stack recovery; legacy customers stay in every denominator; license resell exempt from overhead and acquisition spreads. (chat)

## Open loops

- Mine — step 4 for Public Cloud (low), Private Infra, Licenses, Our services; then step 5 margins.
- Mine — Inbound intensity ratios on slide 15 are my placeholders (15 : 8 : 3 : 15 : 5 for low / high / Private / Licenses / Our services). Set the ratios with the Inbound team lead; the level follows from the plan.
  - Plan realism: at the plan-implied effort, 2025's won deals would have filled only 53 % of the same 4 FTE, so the 2026 plan asks about 1.9× the 2025 workload.
  - Still open: the same method for the other sales teams; step 4 (slides 23–24) taking Inbound's CAC per deal instead of a bucket pool.
  - Slide 15 v6 went to Alex as a single slide; the live deck still has the old slide 15.

  (chat, 2026-09-27)
- Mine — reconcile the workbook: «Allocation methods» vs raw «ФОТ» (Preselling TAMs carry 60–70 % COGS, 4 Sales UA roles carry General) and «1-2 не-ФОТ» (Security, Billing mixed); «3.Products by buckets» 13 / 52 vs the tree's 11 / 54 (both Relational DB add-ons); «УГОДИ» has no Services plan (slide 15 uses 23 ≈ the typed 5 deal-months in «Таблиця сейлів» ÷ cycle 0,22); customer lifetime Public Cloud on VMware 44 (step-4 tab) vs 48 months (SysSettings); Product-dept ФОТ sums in «1-2. Allocation-ФОТ» vs the raw tab. (chat, 2026-09-26)
- Mine — plan deck: explicit «цільова прибутковість» column on the output-table slide (asked 2026-09-26, unanswered); redo the Model C example on COGS weights (standing offer). (chat, 2026-09-26)
- Mine — the August data fixes (593 vs 463 component reconciliation, Cubbit MRR anomaly, 187 zero-price rows, "new MRR" semantics) and the 8 required inputs from the [approach doc](pricing-cost-allocation-approach.md#required-inputs-to-compute-the-rate-card) — status not re-checked since 08-27.

## Activity

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
