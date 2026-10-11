# Publication-process deck — handoff (continue on any machine)

_Rewritten 2026-10-11 on Alex's MacBook Air after v2 was delivered (v2 = v1 reworked on Alex's dictated feedback of the same day). Read fully before touching the deck._

⛔ GigaCloud = internal-only area. The deck is internal; nothing from it goes into external-facing artifacts.

## The deck

| Deck | State | Live copy (Alex hand-edits it — living-documents rule) | In this repo |
|---|---|---|---|
| **Publication process** — `GigaCloud_Product Publication Process_11-OCT-2026 (v2).pptx`: the product publication process and its automation in the CRM | v2, 42 slides, UA (2026-10-11); v1 (37 slides) kept beside it | MacBook Air: `~/Desktop/GigaCloud/` | **not committed** (CRM screenshots, an employee name in a CRM description) |

**Deck map:**
1. Cover.
2. Stages overview.
3. Process map: stage → block → step.
4. Section «Кроки процесу».
5. Stage 1: sub-header, 3 Data validation slides, the Operations kick-off → processes schema, 6 action-item slides.
6. Stage 2: sub-header and 6 slides — design approval, its product-type table, Head of Product, delivery approval, its product-type table, finance.
7. Stage 3: sub-header and 9 slides.
8. Stage 4: sub-header only.
9. Section «Участь команд» and 5 team slides.
10. Section «Next steps»: the draft action plan and the out-of-scope questions.

**Sources:**
- **Brief:** Google Doc «Процеси» (id `1DOesPriI_ehSpQk6KyMLUCphRb7PNSMDekP22GAt00I`), with the Miro schema and 9 screenshots.
- **CRM checklist export** «Product Checklist Item Type» (09.10.2026, 24 item types).
- **Alex's dictated feedback** (`toolchain/plm/feedback_2026-10-11_transcript.txt`), plus his typed product-type → team mapping and 3 more screenshots: the vendor card, a product type, the product investment block.
- **Creatio process `GCLProcess_cc7cc57`** (`toolchain/plm/crm_process_GCLProcess_cc7cc57.json`, readable dump `crm_process_dump.txt`). It sets the product's 8 «Requires …» checkboxes, which decide when the conditional steps are mandatory.

## How it is built

- **Generator:** `~/Desktop/GigaCloud/toolchain/plm/build_plm2.py <base.pptx> <img_dir> <out.pptx>`. Content lives in `plm_data2.py`: stage colour tokens, the stage → block → step MAP, one dict per step card, the ops schema, the product-type groups, the team matrix, next steps. `gclib.py` is the margin deck's `lib.py` with a highlighter flag added. Render with `../margin-deck/toolchain/results-deck/pp_render.sh`. v1's `build_plm.py` / `plm_data.py` are kept for reference only.
- **After v2 Alex owns the file.** Never regenerate over his edits. Build only the changed slides and clone them into his file, the margin deck's transplant approach (`../margin-deck/HANDOFF.md`).
- **QA on v2:** a fresh Opus reviewer compared the deck with the feedback, the CRM export, the process dump and the screenshots. Its report is `toolchain/plm/review_fidelity_v2_deck2.md`: 36 feedback items, 29 applied and 7 partial; 0 blockers, 7 major. The majors and most minors were fixed before delivery. Still open: slide counters' minor variance and the two circular conditions, which wait on Alex's answers below.

## Decisions Alex made (2026-10-11, do not re-litigate)

- The stage after publication is «Готовність команд». Stage 4 gets only a sub-header. The action plan is a draft for him to edit.
- **Publication approvals order:** design → Head of Product → delivery → finance. The map and the slides follow it.
- **Operations kick-off → processes schema** goes before the Operations kick-off slide. It shows five elements: the kick-off, two parallel approvals, the publication convergence point, then two confirmations.
- **Process approvals are hybrid cards.** Contract and Delivery process approval are «Дія + погодження», responsible Operations · Business process lead, with a «Процес» section saying what the process covers.
- **Product type → responsible teams** (his mapping):
  - Core / Specialized infrastructure / Add-on tools: design R&D + InfoSec; delivery Support + Delivery.
  - Managed licenses / Our services: design Product + R&D; delivery Delivery + Support + InfoSec.
  - Third-party licenses / services: design Vendor manager + Partner manager; delivery Vendor manager + Support + Partner manager.

  The delivery scope is one description for all types. The design scope has one description per group; the Managed licenses / Our services scope is drafted and highlighted.
- **Delivery-approval screenshot:** a copy of the design-approval revision with «Responsible for Delivery: approve product revision» set in Montserrat Medium 25.6 px (the Creatio font). The What-do-I-approve screenshot is removed.
- **Screenshot frames:** two standard sizes, portrait 7.4×9.9″ and landscape 11.0×7.8″ (2× scale), with a matte fill around the picture. Very wide screens are rebuilt as stacked fragments so their text stays readable: the vendor card and the investment block.

## Deck conventions (v2)

- **Stage colours:** 1 blue `2563A8`, 2 violet `6B46A3`, 3 green `2E8540`, 4 orange `C2620F`, Upon first customer grey dashed. Within a stage, the stage is the full hue, a block the medium tint and a step the light tint.
- **One column grid** is used by the overview, the map and the divider mini-map («you are here»). Step slides carry a stage pill in the kicker. Rules 24–27 of `.claude/references/slide-design.md` hold the general versions.
- **Step card:** a one-column table.
  - Header: type + timing + «У CRM: …».
  - Sections, each a label above 20 pt text:
    - A: Суть · Результат · Коли обов’язковий · [Виняток] · Хто відповідає · Хто залучений.
    - B: Суть · Результат · Коли · Хто погоджує/підтверджує · Що.
    - H: Процес · Суть · Результат · Коли · Хто відповідає · Хто погоджує.
  - Unconditional timing reads «Завжди, до/під час/після публікації.» Conditional timing reads «До/Після публікації — якщо …».
- **Yellow highlighter** = an inference that no source states, with the legend «припущення: у CRM цього немає — перевірити». Speaker notes carry the verbatim CRM record and the process condition.

## The CRM process (what sets the «Requires …» flags)

The process runs when a product draft changes, or when a component is added to or changed in a product, for products without government compliance services. It only switches flags on, and the PM can switch them on by hand.

- **Supplier contract:** the product has components whose vendor is not GigaCloud.
- **Ops kickoff** (and **go-live support**, same condition): something is new compared with the active products:
  - the Delivery process or the Contract process;
  - the SLA type + Uptime SLA pair;
  - the Virtualization platform;
  - a component vendor with no active products.
- **Investment approval:** a vendor commitment type with Commitment USD > 0, or one of two upfront infrastructure-investment types with Infra investment USD > 0.
- **Tech kickoff:** an attribute of the product type. The deck reads it as the technical types, highlighted.
- **Infrastructure setup project:** the same product-type attribute plus two product fields whose names the metadata hides. Alex's rule is «public infrastructure built in advance», but the 09.10 checklist screenshot shows it for Private Cloud on VMware vSAN.
- **Sales kickoff:** one product field ≠ one value. **R&D PoC:** one product field = one value. Neither field is named in the metadata.

## Open items for Alex

- Name the fields behind Sales kickoff, R&D PoC and Infrastructure setup project, and confirm the tech-kickoff reading. The deck shows «<умова з картки продукту — уточнити>», highlighted.
- Confirm that Process management office = Operations (Business process lead).
- **CRM data fixes:**
  - empty descriptions: Supplier contract, Infrastructure setup project, Initial request to add to billing;
  - the typo «Compentency confirmation: Presales»;
  - test scopes in What do I approve;
  - the VOK description on the screenshot is older than the 09.10 export.
- Decide whether R&D PoC should block publication, and whether Head of Product's approval needs its own checklist item. Both are in the action plan.
- The Handoff items (R&D → Delivery, VPM → Support) are inactive. That hand-off is out of scope for now.
