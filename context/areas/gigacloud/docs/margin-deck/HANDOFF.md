# Margin decks — handoff (continue on any machine)

_Rewritten 2026-09-26 on Alex's MacBook Air after the results deck was built. Read fully before touching either deck._

⛔ GigaCloud = internal-only area. Both decks are internal (fine), but nothing from them is ever quoted in external-facing artifacts.

## The two decks

| Deck | State | Live copy (Alex hand-edits it — living-documents rule) | In this repo |
|---|---|---|---|
| **Plan** — `GigaCloud_Product Margin Plan_27-AUG-2026.pptx` (goal, 4 attribution models A1/A2/B/C/D, next steps) | v5, 13 slides, UA — also the **slide template** for later decks | MacBook Air: `~/Desktop/GigaCloud/GigaCloud_Product Margin Plan_27-AUG-2026 (1).pptx` (newest); KN7X2Y65NX: `~/Downloads/…` | snapshot in this folder (refreshed 2026-09-26 from the Desktop copy) |
| **Results** — `GigaCloud_Product Margin Results_26-SEP-2026.pptx` (allocation results: steps 1–4, 5 buckets, 5 methods, per-component allocation) | v5, 26 slides, UA, delivered 2026-09-26 | MacBook Air: `~/Desktop/GigaCloud/` | **not committed** — it shows employee names and mobilisation status (Alex's Q&A decision: names + roles, no ФОТ sums) |

Source workbook for the results deck: `~/Desktop/GigaCloud/Юніт.xlsx` (payroll by name — never commit). Brief: Google Doc «Результаты аллокации затрат и расчета маржинальности — бриф» (id `1ZHZtbE8M3LEhxXguR45BkCJrAXCrudftevvT8RdX_-I`; snapshot `~/Desktop/GigaCloud/toolchain/brief_2026-09-26.txt`).

Before any edit: re-read the live file, never regenerate over Alex's manual edits (`.claude/references/client-documents.md`). A rebuild with `build_deck.py` overwrites everything — use it only for a fresh version, then port his edits or patch the live file instead.

## Results deck — how it is built

- **Generator:** `~/Desktop/GigaCloud/toolchain/build_deck.py` (local only — contains names). It reads every number from `Юніт.xlsx` and asserts the key facts (Inbound CAC split = «ФОТ» r107; step-4 ratios/formulas incl. year-end = F × (1 + приріст) × (1 − churn); worked examples multiply out; General pool = method 5; 82 products; whole-department lists = «Allocation methods»). Run: `python build_deck.py <plan-deck.pptx as base> Юніт.xlsx out.pptx` in a venv with `python-pptx openpyxl pillow`.
- **Shared parts (committed):** `toolchain/results-deck/` — `lib.py` (helpers, brand constants, `nb()` non-breaking-space rules, one content right edge `SAFE_R = 21.8″` clear of the GO logomark), `tree.py` (the **native, editable reproduction of Alex's Miro allocation tree**, regularised: equal gaps, one axis, bucket pitch 249 px; connectors keep his drawn style — fan apex below the parent, small gap above the child), `pp_render.sh` (true-font PowerPoint render), `dump_deck.py` (text dump for reviewers).
- **Layouts:** content slides `cloud 001 logomark`; step dividers `cloud 003 logomark` (lightest cloud) with tree fragments at one scale (0.0118 in/px) and one column grid.
- **Colour code:** tree palette = level (yellow expense types, orange buckets, green products, lime components); red = allocation stage / result; greys = structure.
- **QA loop:** `pp_render.sh deck.pptx outdir` (needs activated PowerPoint — see `.claude/references/document-rendering.md`) → contact sheets → fresh-eyes reviewers. Two Opus reviewers ran on this deck (brief/data fidelity + visual); their reports are in `~/Desktop/GigaCloud/toolchain/review_*.md`.

## Results deck — decisions Alex made (2026-09-26, do not re-litigate)

- Method 1 example = Market UA promo channels; methods 2–5 = СТП payroll by line (L1/L2/TL), СТП non-payroll, Inbound (Таблиця сейлів → CAC Inbound Team), «Продукти для General». Old 7 groups map to the 5 buckets per the «1-2. Allocation-ФОТ» formulas (Openstack Public → low, VMware Public → high, all Private → Private Infra, Resell → Licenses).
- Personal data: names, teams, roles and the 100 % General column for the mobilised — **no ФОТ sums**.
- Step-3 product counts follow the tree picture (3 / 7 / **11** / **54** / 7), not the tab (13 / 52).
- Tree: rebuilt natively (editable), "fully as drawn", English labels kept.
- Slide 8 «весь відділ в один тип» follows the **«Allocation methods»** tab (Preselling ЮА + Sales UA → CAC; non-payroll + Security → General; Billing skipped — the tab marks two types).
- Glossary: **82** products (brief said 89).

## Open data items (for Alex, not blocking the deck)

- «Allocation methods» vs raw tabs: Preselling TAMs carry 60–70 % COGS and 4 Sales UA roles carry General in «ФОТ»; Security and Billing non-payroll are mixed in «1-2 не-ФОТ».
- «3.Products by buckets» has 13 / 52 for Private Infra / Licenses (both Relational DB add-ons in Private Infra) vs the tree's 11 / 54.
- Inbound 2026 deal-months for Resale (25) and Services (5) are typed in, not plan × cycle.
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
