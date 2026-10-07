# Margin decks — handoff (continue on any machine)

_Rewritten 2026-09-26 on Alex's MacBook Air after the results deck was built. Read fully before touching either deck._

⛔ GigaCloud = internal-only area. Both decks are internal (fine), but nothing from them is ever quoted in external-facing artifacts.

## The two decks

| Deck | State | Live copy (Alex hand-edits it — living-documents rule) | In this repo |
|---|---|---|---|
| **Plan** — `GigaCloud_Product Margin Plan_27-AUG-2026.pptx` (goal, 4 attribution models A1/A2/B/C/D, next steps) | v5, 13 slides, UA — also the **slide template** for later decks | MacBook Air: `~/Desktop/GigaCloud/GigaCloud_Product Margin Plan_27-AUG-2026 (1).pptx` (newest); KN7X2Y65NX: `~/Downloads/…` | snapshot in this folder (refreshed 2026-09-26 from the Desktop copy) |
| **Results** — `GigaCloud_Product Margin Results_26-SEP-2026.pptx` (allocation results: steps 1–4, 5 buckets, 5 methods, per-component allocation) | **v17, 40 slides** (2026-10-08; v17 = Alex's v12_5 + Юніт 08.10, tab «4. Allocation by components (k)», built by `toolchain/build_v17.py` + `build_v17_results.py` + `v17_lib.py`: every workbook-driven slide refreshed, method 4 rewritten, one CAC flow in step 4, four new slides — intro «per component», cost per 1 UAH + FTE, licenses and services results), built inside the latest hand-edited copy Alex uploaded to the chat (v12 (3)) with `toolchain/update_v13.py` (slides 24/26/28/30 in place) and `add_slides_v13.py` (bucket margins after slide 30, action plan last), numbers from Юніт_UPD tab 4. **His file is the live version**: the Desktop copy is older, and the generator reproduces only the slides it changed (see "how it is built") | MacBook Air: `~/Desktop/GigaCloud/` | **not committed** — it shows employee names and mobilisation status (Alex's Q&A decision: names + roles, no ФОТ sums) |

Source workbook for the results deck: `~/Desktop/GigaCloud/Юніт.xlsx` (payroll by name — never commit). Brief: Google Doc «Результаты аллокации затрат и расчета маржинальности — бриф» (id `1ZHZtbE8M3LEhxXguR45BkCJrAXCrudftevvT8RdX_-I`; snapshot `~/Desktop/GigaCloud/toolchain/brief_2026-09-26.txt`).

Before any edit: re-read the live file, never regenerate over Alex's manual edits (`.claude/references/client-documents.md`). A rebuild with `build_deck.py` overwrites everything — use it only for a fresh version, then port his edits or patch the live file instead.

## Results deck — how it is built

- **Generator:** `~/Desktop/GigaCloud/toolchain/build_deck.py` (local only — contains names). It reads every number from `Юніт.xlsx` and asserts the key facts (Inbound CAC split = «ФОТ» r107; step-4 ratios/formulas incl. year-end = F × (1 + приріст) × (1 − churn); worked examples multiply out; General pool = method 5; 82 products; whole-department lists = «Allocation methods»). Run: `python build_deck.py <plan-deck.pptx as base> Юніт.xlsx out.pptx` in a venv with `python-pptx openpyxl pillow`.
- **Shared parts (committed):** `toolchain/results-deck/` — `lib.py` (helpers, brand constants, `nb()` non-breaking-space rules, one content right edge `SAFE_R = 21.8″` clear of the GO logomark), `tree.py` (the **native, editable reproduction of Alex's Miro allocation tree**, regularised: equal gaps, one axis, bucket pitch 249 px; connectors keep his drawn style — fan apex below the parent, small gap above the child), `pp_render.sh` (true-font PowerPoint render), `dump_deck.py` (text dump for reviewers).
- **Layouts:** content slides `cloud 001 logomark`; step dividers `cloud 003 logomark` (lightest cloud) with tree fragments at one scale (0.0118 in/px) and one column grid.
- **Colour code:** tree palette = level (yellow expense types, orange buckets, green products, lime components); red = allocation stage / result; greys = structure.
- **Editing Alex's live deck (since v11):** never regenerate it. Work in four steps:
  1. build the changed slides with `build_deck.py`;
  2. clone them into his file (`~/Desktop/GigaCloud/toolchain/transplant.py` for v11, `revert_sales.py` for v12). Each script copies the slides' shape trees and notes, replaces or inserts them by position and asserts every title first. `revert_sales.py` also restores slides from his older copy;
  3. re-apply his per-slide vertical offsets (below);
  4. render the whole file.

  The generator does not contain his other edits: slide 8 split into Спосіб 1 / Спосіб 2 with renamed headers, «задачі» instead of «завдання», and step-1 divider on one line. Its output is therefore not the live deck.
- **Alex's layout conventions** (hand edits, 2026-09-27):
  - The kicker stays at 1.02″. The title and everything under it sit lower, moved per slide by 0.33–0.79″; titles end up around 1.8–2.1″. Step-4 slides use about +0.55″; new slides take their neighbours' offset.
  - The status chip on dividers sits right after «Крок N», at (4.65″, 1.41″). This one is now in the generator.
  - «Дані» slides: title +0.40 / +0.44 / +0.69″. Step-5 table: not moved.
- **QA loop:** `pp_render.sh deck.pptx outdir` (needs activated PowerPoint — see `.claude/references/document-rendering.md`) → contact sheets → fresh-eyes reviewers. Two Opus reviewers ran on this deck (brief/data fidelity + visual); their reports are in `~/Desktop/GigaCloud/toolchain/review_*.md`.

## Results deck — decisions Alex made (2026-09-26/28, do not re-litigate)

- **Method 4 (Sales data) is an effort share** (final 2026-09-28, after a 09-27 detour through per-deal CAC and a CAC split, both dropped). Rows, in formula order:
  - plan deals 2026;
  - cycle (fact 2025);
  - deal-months 2026 = plan × cycle*. These are «Таблиця сейлів» Q4:Q8, where Licenses 25 and Our services 5 are typed in;
  - intensity** = deals one rep runs in parallel on that bucket alone, an expert estimate. Placeholders 15 / 8 / 3 / 15 / 5;
  - effort = deal-months ÷ intensity;
  - **the red result: the CAC Inbound Team split = effort share** (33 / 61 / 0 / 4 / 2 %).

  Step 4 takes this share, like every other method. Alex's reason: the plan is in both the step-2 share and the step-4 new-sales denominator, so it cancels. No text on the slide justifies the change (Alex).
- Method 1 example = Market UA promo channels; methods 2–5 = СТП payroll by line (L1/L2/TL), СТП non-payroll, Inbound (Таблиця сейлів → CAC Inbound Team), «Продукти для General». Old 7 groups map to the 5 buckets per the «1-2. Allocation-ФОТ» formulas (Openstack Public → low, VMware Public → high, all Private → Private Infra, Resell → Licenses).
- Personal data: names, teams, roles and the 100 % General column for the mobilised — **no ФОТ sums**.
- Step-3 product counts follow the tree picture (3 / 7 / **11** / **54** / 7), not the tab (13 / 52).
- Tree: rebuilt natively (editable), "fully as drawn", English labels kept.
- Slide 8 «весь відділ в один тип» follows the **«Allocation methods»** tab (Preselling ЮА + Sales UA → CAC; non-payroll + Security → General; Billing skipped — the tab marks two types).
- Glossary: **82** products (brief said 89).
- **Step-4 block** (Alex, 2026-09-27/28): principles → **«Огляд варіантів розподілу»** → a pair of slides (approach + example) for each of Indirect COGS · CAC · General.
  - The overview is a table of the price components (Direct COGS · Indirect COGS · CAC · General) × what is allocated × base × horizon. One merged cell reads «коефіцієнт × Direct COGS компонента». Direct COGS is shown as not allocated.
  - The CAC pair and the step-5 table use the tab's single CAC pool: vCPU 29,81 ₴, margin 24,2 %.
- **Step 5 and the «Дані» section** (built 2026-09-27 from the brief's new bullets; since v11 the data cells also show % of the FY2026 budget, as Alex asked).
  - **Step-5 margins table:** the three step-4 example components with their step-4 per-unit values as they are in the tab. Prices come from «Component» column G (monthly). Min. profit = 0. Each cell shows ₴ and % of price. Header colours = the price stack of slide 2. Price-structure bars sit under the table.
  - **«Дані» divider:** the template has no dark or red layout, so it is `no cloud no logo` with a full-bleed logomark red (#DE1F35).
  - **Data slides:** annual FY2026 amounts from «ФОТ» / «Не ФОТ» (sum × shares) in тис. грн, with every total = the sum of the shown cells.
  - **Assumed figures** (Direct COGS, and anything that depends on it) get a highlighter yellow `FFFF00` plus a legend, as the brief asks. It is deliberately not the tree's pastel yellows.
  - **Step 2** has 2 slides: the tree with totals aligned under the bucket boxes, then the full ФОТ / не-ФОТ pivot. The brief allows the split when the tree and table do not fit together.

## Open data items (for Alex, not blocking the deck)

- ⚠ **Step-4 pools are monthly.** «Висновок» = the raw «ФОТ» / «Не ФОТ» annual sums ÷ 12, verified exactly: B8 = General ФОТ ÷ 12. E-Cloud C40 / C41 / C43 feed them into «4. Allocation by components» as «FY2026» pools against the annual Direct COGS.
  - So the per-unit Indirect COGS / CAC / General on the step-4 slides, and the step-5 margins built from them, are 12× too low. The denominators, however, cover only 3 components.
  - The method-5 slide's «General FY2026 17 924 414» is also monthly (annual ≈ 215,1 M).
  - Fix in the workbook, then rebuild steps 4–5.
- **Direct COGS** is not in the budget file. The Data slides assume two things (yellow):
  - ФОТ = СТП ЮА payroll × its Our-services share;
  - не-ФОТ = Q2-2026 P&L direct lines × 4 («fin структура» rows 19–22, 24, 91, 93), split by bucket via MRR × (1 − direct margin) from «Продукти для General».
- **VAT basis of «Component» prices:** E-Cloud labels them «with VAT».
- **«ФОТ» G206** = SUM(G4:G198) − 47 000 000 has no explanation. The Data slides use the full 300,5 M.

- «Allocation methods» vs raw tabs: Preselling TAMs carry 60–70 % COGS and 4 Sales UA roles carry General in «ФОТ»; Security and Billing non-payroll are mixed in «1-2 не-ФОТ».
- «3.Products by buckets» has 13 / 52 for Private Infra / Licenses (both Relational DB add-ons in Private Infra) vs the tree's 11 / 54.
- «Таблиця сейлів» Inbound 2026 deal-months for Resale (25) and Services (5) are typed in, not plan × cycle. Since the method-4 rework only Services depends on them: «УГОДИ» has no Services plan, so the slide uses 23 ≈ 5 ÷ 0,22.
- Customer lifetime Public Cloud on VMware: 44 months in the step-4 tab vs 48 in SysSettings.
- «1-2. Allocation-ФОТ» Product-dept ФОТ sums (1,1–1,4 M) differ from the raw «ФОТ» tab (2,3 M each); the 64/20/16 non-payroll split matches the raw tab.

## Plan deck (v5) — kept from the previous handoff

- Files here: the v5 snapshot, `Margin.xlsx` (Finance P&L, Продукти, Models), the brand template `GigaCloud_HR Committee_19-AUG-2026.pptx`, and `toolchain/build.py` + `patch*.py` (reference code from rounds 1–3; scratchpad paths inside no longer exist).
- Deck map: 1 титулка · 2–3 Мета і ключові результати (3 = output-table schema) · 4 складові ціни · 5 ключові підходи · 6 моделі атрибуції · 7 зміни у P&L · 8–12 приклади A1, A2, B, C, D · 13 наступні кроки.
- Locked: deck lettering A1/A2/B/C/D is canonical with Alex; product→component bridge by the average COGS weight of the component in the average product configuration (identical note on slide 6 and B/C/D — keep verbatim); output-table example rows must stay internally consistent; мін. прибутковість = % від фактичної ціни продажу, approvers CFO + CEO + CBDO.
- Open since 2026-09-26: an explicit «цільова прибутковість» column on slide 3 (unanswered); redoing Model C's example on COGS weights (standing offer, do not act without Alex).

## Geometry & brand constants (template is 2× scale)

`SLIDE_W = 24387175` EMU (26.67″) · left edge `XL = 2.139″` · content right edge `21.8″` (clear of the logomark at x ≥ 22.47″, y ≥ 11″) · `sz` is hundredths of a point at 2× (`sz=1700` ≈ 8.5 pt on screen) · RED `C00000` · INK `101010` · GREY `595959` · LTGREY `BFBFBF` · LINE `E3E3E3` · PANEL `F4F4F4` · fonts `e-Ukraine Bold` / `e-Ukraine Light` (embedded in the decks; e-Ukraine is wide — ~0.009 in per pt per character in Bold, so size boxes from the PowerPoint render, never from QuickLook).

## Read next

`context/areas/gigacloud/README.md` → [`pricing-unit-economics.md`](../../pricing-unit-economics.md) → [`pricing-cost-allocation-approach.md`](../../pricing-cost-allocation-approach.md). Deck-design rules: `.claude/references/slide-design.md`. Rendering: `.claude/references/document-rendering.md`.
