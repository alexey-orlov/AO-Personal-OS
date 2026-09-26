# Margin-deck handoff — continue the work on any machine

_written 2026-09-26 by the deck-build session on Mac KN7X2Y65NX (session transcript stays on that Mac). Read this fully before touching the deck._

⛔ GigaCloud = internal-only area. This deck is internal (fine), but nothing from it is ever quoted in external-facing artifacts.

## What this is

The GigaCloud product-marginality action-plan deck: **`GigaCloud_Product Margin Plan_27-AUG-2026.pptx` — currently v5, 13 slides, Ukrainian**, built on the GigaCloud brand template, iterated over 3 feedback rounds with Alex (2026-08-27 → 2026-09-26).

## Files in this folder

| File | What it is |
|---|---|
| `GigaCloud_Product Margin Plan_27-AUG-2026.pptx` | **Transfer snapshot of v5**, copied 2026-09-26 from `~/Downloads` on KN7X2Y65NX — includes Alex's own manual cosmetic edits (he hand-edits the delivered file) |
| `Margin.xlsx` | Source workbook (sheets: Finance P&L, Продукти, Models) — basis for every example table and for verifying any grouping claim against the P&L |
| `GigaCloud_HR Committee_19-AUG-2026.pptx` | The brand template the deck was built from. Only needed for a full rebuild or `validate.py --original`; patch rounds don't need it |
| `toolchain/build.py` | Full deck generator (v1–v2 state, 11 slides). Superseded by the patches as a generator, but it is the reference for the shared helper library and the slide-5/6 geometry |
| `toolchain/patch.py` | Round 2a: A → A1/A2 split on the models slide + the new A2 (Cubbit) example slide |
| `toolchain/patch2.py` | Round 2b: the product→component **bridge note** rolled out to the models slide + B/C/D example slides — holds the exact `NOTE_LEAD`/`NOTE_BODY` strings |
| `toolchain/patch3.py` | Round 3 (latest): the output-table slide (now slide 3) + step 10 on «Наступні кроки» |

The toolchain scripts were recovered from the session transcript after the scratchpad was wiped by tmp-cleanup; all four replayed cleanly and compile. They reference scratchpad paths that no longer exist — treat them as **reference code** (helpers, geometry, exact strings), not as runnable-as-is.

## Single source of truth (living-documents rule)

Alex hand-edits the delivered file directly. The live copy is `~/Downloads/GigaCloud_Product Margin Plan_27-AUG-2026.pptx` **on whichever machine he last worked on**. The snapshot here is frozen at 2026-09-26.

To resume on a new machine: copy the snapshot to `~/Downloads`, work there, and before **any** patch re-read the current file from Downloads — never regenerate over his edits (`.claude/references/client-documents.md`). If machine-hopping continues, refresh this snapshot after each delivered round.

## Iteration workflow (established over rounds 1–3, keep it)

1. `cp ~/Downloads/<deck>.pptx scratchpad/currentN.pptx`
2. Write `patchN.py` with python-pptx, reusing the helper block from `toolchain/patch3.py` (`E()`, `R()`, `P()`, `make_p()`, `set_paras()`, `add_box`, `add_card`, `add_rect`, `add_table`, `cell_set`, `cell_borders`) → `patchedN.pptx`
3. Validate with the pptx skill's `validate.py patchedN.pptx --original <template>` (if the skill is available)
4. Visual QA: `soffice --headless --convert-to pdf` + `pdftoppm -jpeg -r 110 [-f N -l N]` — worked in all rounds of these sessions; if broken on the target machine, see `.claude/references/document-rendering.md` (note: that doc is written for KN7X2Y65NX)
5. `cp patchedN.pptx ~/Downloads/<deck>.pptx` → deliver via SendUserFile

Deps: `python-pptx` (patching), `openpyxl` (xlsx probing). No venv travelled — install fresh.

## Geometry & brand constants (template is 2× scale)

- `SLIDE_W = 24387175` EMU (26.67″) · `X0 = 1955800` (2.139″) · `CW = SLIDE_W − 2·X0` · `TITLE_Y = 1133475`
- Font `sz` is hundredths of a point **at 2× scale**: `sz=1700` ≈ 8.5 pt effective on screen
- Colors: RED `C00000` · INK `101010` · GREY `595959` · LTGREY `BFBFBF` · LINEGREY `E3E3E3` · PANEL `F4F4F4`
- Fonts: `e-Ukraine Bold` (FB) / `e-Ukraine Light` (FL); `Calibri` for Excel-mimic tables. If e-Ukraine isn't installed on the target machine, renders substitute glyphs — trust geometry, not glyph widths (`.claude/references/document-rendering.md`)

## Deck map (v5, 13 slides)

1 титулка · 2 Мета і ключові результати · 3 Мета і ключові результати — **output-table schema** (11 columns, color-coded by data type, 2 example rows, legend chips, «Як читати») · 4 складові ціни («стовпчик», 2 версії) · 5 Ключові підходи (6 принципів) · 6 Моделі атрибуції витрат (3 panels: COGS A1+A2 / Збут B,C / General D + standard note bar) · 7 Зміни у структурі P&L (InfoSec 2.1.3 → split B + D) · 8 приклад A1 · 9 приклад A2 (Cubbit S3) · 10 приклад B · 11 приклад C · 12 приклад D · 13 Наступні кроки (10 кроків, 3 фази)

## Locked content decisions — do NOT re-litigate

- **Deck lettering is canonical in conversation with Alex** (≠ Margin.xlsx block labels, ≠ the A–G classes in `../pricing-cost-allocation-approach.md`): A1 = direct FTE (Delivery/Support → COGS) · A2 = закупівлі у постачальника (Units included × supplier unit price → COGS; Cubbit example; ⚠ CRM stores the reciprocal `0.0001` in "Supplier units included") · B = specific products (Sales/CAC, one-time → lifetime) · C = product groups (ВОК → Resell) · D = general. Grouping on slide 6: A1+A2 → COGS · B,C → витрати на збут · D → general (verified against the Margin.xlsx P&L sections).
- **Product→component bridge — Alex's decision (supersedes the assistant's price-share recommendation):** product/group-level attribution reaches components by **середня вага COGS компонента в середній конфігурації продукту**; a separate analysis will decide whether average configurations are computed per client segment. The note is IDENTICAL on slide 6 and the B/C/D example slides — keep it verbatim on every edit:
  - lead: `До рівня компонента: `
  - body: `атрибуцію рівня продукту чи групи розкладаємо на компоненти за середньою вагою COGS компонента в середній конфігурації продукту. Окремо проаналізуємо, чи рахувати середні конфігурації за сегментами клієнтів окремо (Enterprise vs менший клієнт).`
- **Output table (slide 3):** 11 columns — Компонент / COGS, грн / CAC, грн / Загальні, грн / Поточна ціна, грн / Прибуток зараз, грн / Прибуток зараз, % / Мін. прибутковість, % / Нова ціна, грн / Зміна ціни, % / Мін. ціна продажу, грн. Header colors = data types: RED «обчислюємо за моделями A1–D» · GREY «COGS вже пораховано — перевіримо повторно» · LTGREY «поточна ціна фіксована на час проєкту» · INK «мін. прибутковість — політичне рішення». The two example rows must stay internally consistent: **Node** 30 000+4 000+6 000 = 40 000 → ціна 45 000 (11 %) → нова 50 000 (+11 %), floor 44 444 = 40 000÷0.9; **vCPU** 60+10+14 = 84 → ціна 180 (53 %) → нова 120 (−33 %), floor 93 ≈ 84÷0.9. Numbers are marked illustrative on the slide.
- **Мінімальна прибутковість** = % від **фактичної ціни продажу** (not прайсової — знижки can apply); мін. ціна продажу = (COGS + CAC + загальні) ÷ (1 − мін. прибутковість). Step 10 of «Наступні кроки»: «в нуль» не продаємо; approvers **CFO + CEO + CBDO**.

## Open items (as of 2026-09-26)

- **Awaiting Alex's answer:** on slide 3 the «Нова ціна» examples use a target profitability that has no column of its own — offered to add an explicit «цільова прибутковість» column (a second "political decision" next to the minimum) or a note. Asked 2026-09-26, unanswered.
- **Standing offer, do NOT act without Alex:** the Model C example table (slide 11) still shows the revenue-based group→product mile («Частка групи», «3,45 % від місячної ціни кожного продукту групи»), while the bridge note governs the product→component mile on COGS weights. Offered to redo the whole chain on COGS weights; no decision.
- Data fixes on the bridge's critical path (187 zero-price rows, catalog↔P&L reconciliation) — tracked on the wiki page.

## Read next

`context/areas/gigacloud/README.md` → [`pricing-unit-economics.md`](../pricing-unit-economics.md) (subproject state + decisions; its "presentation layer" note explains the lettering) → [`pricing-cost-allocation-approach.md`](../pricing-cost-allocation-approach.md) (the full underlying model — the deck simplifies it deliberately). Deck-design rules: `.claude/references/slide-design.md`.
