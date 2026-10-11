# Publication-process deck — handoff (continue on any machine)

_Written 2026-10-11 on Alex's MacBook Air after the first version was delivered. Read fully before touching the deck._

⛔ GigaCloud = internal-only area. The deck is internal; nothing from it goes into external-facing artifacts.

## The deck

| Deck | State | Live copy (Alex hand-edits it — living-documents rule) | In this repo |
|---|---|---|---|
| **Publication process** — `GigaCloud_Product Publication Process_11-OCT-2026.pptx`: the product publication process and its automation in the CRM | v1, 37 slides, UA (2026-10-11) | MacBook Air: `~/Desktop/GigaCloud/` | **not committed** (CRM screenshots, an employee name in a CRM description) |

Deck map: 1 cover · 2 stages overview · 3 detailed schema (Miro) · 4 section «Кроки процесу» · stage 1 sub-header + 8 step slides · stage 2 sub-header + 4 · stage 3 sub-header + 9 · stage 4 sub-header only · section «Участь команд» + 4 team slides · section «Next steps» + action plan (draft) + out-of-scope questions.

Sources:
- Brief: Google Doc «Процеси» (id `1DOesPriI_ehSpQk6KyMLUCphRb7PNSMDekP22GAt00I`, link-shared): structure, the Miro schema picture, 9 CRM screenshots. Text snapshot: `~/Desktop/GigaCloud/toolchain/plm/brief_2026-10-11.txt`.
- CRM export «Product Checklist Item Type» (09.10.2026): 24 item types with category, name, description, is active, is required before publication. Copy: `toolchain/plm/product_checklist_item_type_09_10_2026_21_05.xlsx`. It is the source for every step table.

## How it is built

- **Generator:** `~/Desktop/GigaCloud/toolchain/plm/build_plm.py <base.pptx> <img_dir> <out.pptx>`, run with a Python that has `python-pptx`, `pillow` and `pymupdf`.
  - The base is `base_margin_v25.pptx`, a copy of the margin results deck. It supplies the masters, the embedded e-Ukraine fonts and the cover.
  - Content lives in `plm_data.py`:
    - the CRM records verbatim (they feed the speaker notes and asserts);
    - the stages and the Miro schema rows;
    - one dict per step slide;
    - the team matrix and the next steps.
  - `gclib.py` is the margin deck's `lib.py` plus a highlighter flag on text runs.
  - Render with `context/areas/gigacloud/docs/margin-deck/toolchain/results-deck/pp_render.sh` (true-font PowerPoint export).
- **After v1 Alex owns the file.** Never regenerate over his edits. Build only the changed slides and clone them into his file, the margin deck's transplant approach (`../margin-deck/HANDOFF.md`).
- **QA run on v1:** an Opus fresh-eyes reviewer compared the deck with the brief, the CRM export, the Miro and the screenshots. Its report is `toolchain/plm/review_fidelity_v2.md`: 0 blockers, 4 major, 40 minor. All of them were applied before delivery, except splitting the design/delivery halves of the What do I approve screenshot.

## Decisions Alex made (2026-10-11, do not re-litigate)

- The stage right after publication is named **«Готовність команд»**, replacing «Активності після публікації».
- Stage 4 «Зміни протягом життя продукту» gets **only its sub-header slide**: the Miro has no steps there.
- The action plan is **a draft from context**, marked «Чернетка — перевірити», for Alex to edit.
- The step tables come from **the CRM checklist export** he supplied.

## Deck conventions (set in v1)

- **Language.** Stage, block, step and team names stay in English, as in the Miro and the CRM; all other text is Ukrainian, with the і/й alternation applied.
- **Stages.** Four stages per the brief.
  - Upon first customer (Delivery hand-off) is shown grey, «поза межами обговорення». It is the brief's out-of-scope R&D → Delivery hand-off.
  - Marketing brief exists in the CRM but not in the Miro, so it was added to the Kick-off block.
- **Step slide layout:**
  - Kicker «Етап N · <block> [· <group>] · k/n»; title = the Miro step name.
  - Screenshot panel on the left: landscape pictures fill an 11.6-in panel, portrait ones the full height. Where no screenshot exists yet, an empty dashed panel reads «Скриншот з CRM». A red rounded outline marks the relevant part of the screenshot.
  - Table on the right. Header row: «Дія», «Погодження» or «Підтвердження», plus «У CRM: <item> · до/після публікації».
  - Type A rows: Суть і результат · Коли обов’язковий · Хто відповідає · Хто залучений.
  - Type B rows: Хто погоджує/підтверджує · Що погоджує/підтверджує й фіксує.
- **Yellow highlighter = an inference not in the CRM export or the screenshots.** The legend reads «припущення: у CRM цього немає — перевірити». Alex removes the highlight as he confirms each one.
- **Schema.** Native, editable Miro stickies:
  - block = deeper yellow, step = light yellow, out of scope = grey dashed;
  - laid out as two halves of rows;
  - the stage sub-headers reuse each stage's rows at scale 1.3.
- **Test values blurred.** On the What do I approve screenshot, the test scope values are blurred; on the VOK screenshot, the Process description «test» is blurred. Both are noted in the speaker notes.

## Open items for Alex (found while building)

- **R&D proof-of-concept placement.** The Miro puts it among the pre-publication steps; the CRM marks it «not required before publication». The deck follows the CRM, and the action plan asks for a decision.
- **Approval from Head of product** has no CRM checklist item. Only the exceptions mechanism is evidenced (Required action items → Exceptions).
- **CRM data:**
  - Empty descriptions: Supplier contract, Infrastructure setup project, Initial request to add to billing.
  - Typo in the item name «Compentency confirmation: Presales».
  - Test scope values in What do I approve.
  - The VOK description on the screenshot is older than the 09.10 export.
- **Inactive handoff items.** Handoff: R&D → Delivery and Handoff: VPM → Support are inactive in the CRM. They are the out-of-scope hand-off topic.
