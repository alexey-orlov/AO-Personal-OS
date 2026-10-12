# Publication-process deck — handoff (continue on any machine)

_Rewritten 2026-10-12 on Alex's MacBook Air after v4 was delivered (v4 = v3 reworked on Alex's dictated feedback round 4 of the same day, plus his follow-up asking for a «Перед першим клієнтом» block). Read fully before touching the deck._

⛔ GigaCloud = internal-only area. The deck is internal; nothing from it goes into external-facing artifacts.

## The deck

| Deck | State | Live copy (Alex hand-edits it — living-documents rule) | In this repo |
|---|---|---|---|
| **Publication process** — `GigaCloud_Product Publication Process_12-OCT-2026 (v5).pptx`: the product publication process and its automation in the CRM | v5, 59 slides (56 shown + 3 hidden), UA (2026-10-12); v5 = v4 + the hidden field-check slides, the shown slides pixel-identical to v4; v1–v4 kept beside it | MacBook Air: `~/Desktop/GigaCloud/` | **not committed** (CRM screenshots, an employee name in a CRM description) |

**Deck map (v4):**
1. Cover.
2. Stages overview.
3. Process map: stage → block → step.
4. The same structure in the CRM: the product checklist screenshot with numbered outlines and a legend.
5. Section «Кроки процесу».
6. **Stage 1:** header; Product info ×2 (one card, two screenshots); Components info; Supplier contracts; the Operations kick-off → processes schema; Operations kick-off; Contract and Delivery process approval; Infrastructure setup project; R&D Proof of concept.
7. **Stage 2:** header; the two-roles slide; the design and delivery product-type tables; then the approvals in Alex's order: design → delivery → Head of Product ×2 (revision approval, exceptions) → finance. **Hidden slides 22, 23, 25** follow the approvals they detail: «Що перевіряє R&D» and «Що перевіряє Vendor manager» after the design approval, «Що перевіряє Delivery» after the delivery approval.
8. **Stage 3:** header; the team-readiness schema (publication → six streams); Send to billing ×2; Sales kick-off; Tech kick-off; Marketing brief; Contract and Delivery process confirmation; the three-competences schema; Presales, Support and Delivery competence.
9. **«Перед першим клієнтом»** (between stages 3 and 4): header; Go-live support (To be confirmed); PoC before first customer. Its Delivery hand-off block stays dashed grey, out of scope.
10. **Stage 4:** header; Contract process change; Delivery process change; Product change; the table of change types that need an approval.
11. Section «Участь команд» and 6 team slides (rows: stages 1–3, «Перед першим клієнтом», stage 4).
12. Section «Next steps»: the draft action plan and the out-of-scope questions.

**Sources:**
- **Brief:** Google Doc «Процеси» (id `1DOesPriI_ehSpQk6KyMLUCphRb7PNSMDekP22GAt00I`), with the Miro schema and 9 screenshots.
- **CRM exports:**
  - «Product Checklist Item Type» (09.10.2026, 24 item types);
  - «Product revision change type» (`toolchain/plm/product_revision_change_type_12_10_2026_19_59.xlsx`, 30 types). 17 of them need an approval: Responsible for delivery approves all 17; Head of Product and Responsible for design approve some. Every type also has its own notification flags.
- **Alex's dictated feedback**, all in `toolchain/plm/`:
  - round 2 (`feedback_2026-10-11_transcript.txt`), with his typed product-type → team mapping;
  - round 3 (`feedback_2026-10-12_transcript.txt`), with 10 screenshots;
  - round 4 (`feedback_2026-10-12_round4_transcript.txt`), with the checklist screenshot and the two product-page warnings for go-live support and PoC before the first customer.
- **Creatio process `GCLProcess_cc7cc57`** (`toolchain/plm/crm_process_GCLProcess_cc7cc57.json`, readable dump `crm_process_dump.txt`). It sets the product's 8 «Requires …» checkboxes.

## How it is built

- **Generator:** `~/Desktop/GigaCloud/toolchain/plm/build_plm4.py <base.pptx> <img_dir> <out.pptx>`.
  - **Content: `plm_data4.py`.** It holds:
    - the stage tokens and `OOS_STYLE` for blocks still out of scope;
    - the MAP and one dict per step card;
    - the schemas, `CHANGE_TYPES` and `CHECKLIST_SHOT`;
    - the product-type groups, the team matrix and the next steps.

    The recording wordings are constants there (`REC_*`, `manual()`). The paragraph classes are `BL` (bullet), `NOTE` (grey qualifier) and `NEW` (a new logical paragraph, with space above).
  - **Other modules:** `gcicons.py` (11 vector pictograms) and `gclib.py`. Older generators are kept for reference only.
- **Render and check:** `pp_render.sh` from `../margin-deck/toolchain/results-deck/`, then `tools/bottoms.py <pdf>`. It reads the table borders from the PowerPoint PDF and flags any card ending below 13.75″. The builder's own fit estimates run short on long cards, so trust the PDF.
  - PowerPoint's PDF export skips hidden slides. To QA them, build with `SHOW_HIDDEN=1` (they come out visible, so the PDF has 59 pages), then rebuild without it for delivery.
- **Field checks** (hidden slides): `FIELD_CHECKS` in `plm_data4.py` has one row per field. Each row holds the object, tab, block, field, a check per role (`rnd`, `vm`, `dlv`) and the change types that concern it (`CHANGE_ROUTES`, flags from the change-type export).
  - The check texts are constants (`R_*`, `V_*`, `D_*`), reused from the «Хто відповідає за …» tables wherever the check is the same.
  - On a slide, fields of one block with the same check and the same routing share a row.
  - Alex's marked screenshots are in `toolchain/plm/img/marks/` (m13–m24): red = R&D, blue = Vendor manager, green = Delivery.
- **Edited screenshots** are drawn in Montserrat (`~/Library/Fonts/Montserrat-var.ttf`), with sizes and weights fitted to the CRM by pixel difference:
  - revision fields: 25.6 px, weight 530;
  - checklist rows: 23.2 px, weight 500.

  The edited files are:
  - `revision_hop.png` and `revision_change.png` (Approval purpose, change type, description);
  - `product_checklist.png`: the hidden first letters of the Checklist item type column are re-rendered; the original is `product_checklist_orig.png`;
  - `marketing_brief.png` and `revision_delivery.png` (from round 3).
- **After v4 Alex owns the file.** Never regenerate over his edits. Build only the changed slides and clone them into his file, the margin deck's transplant approach (`../margin-deck/HANDOFF.md`). Before v4, v3 on the Desktop was checked byte-identical to the build, so no edits were lost.
- **QA on v4:** a fresh Opus reviewer checked the round-4 changes: `toolchain/plm/review_fidelity_v4.md` (earlier rounds: `review_fidelity_v3.md`, `review_fidelity_v2_deck2.md`).

## Decisions Alex made (2026-10-11/12, do not re-litigate)

- **Stages and timing.** «Коли відбувається» names the stage the step runs in: До публікації (stage 1), Під час публікації (stage 2), Після публікації (stage 3), Перед першим клієнтом, При змінах (stage 4).
  - The overview and the map carry the same words.
  - The overview shows the structure only (round 4 removed its bands and footer).
- **Header levels.** A section slide is full-bleed red. A stage header is a full-width band in the stage colour over the "you are here" strip and the stage's blocks. «Перед першим клієнтом» is teal `0F7C8A`.
- **Publication approvals order:** design → delivery → Head of Product → finance.
  - A two-roles slide opens stage 2.
  - The product-type tables are titled «Можливі Responsible for design / delivery», set at 20 pt, and share one footprint.
- **Head of Product:** two slides with one card. The first shows the revision with «Head of Product: approve product revision» (screenshot built from the design approval); the second shows the exceptions. «Погодженням у CRM» is confirmed, no highlight.
- **Step card.**
  - Header: the step name + «Owner: <role>».
  - Sections: Суть · Результат (a business result) · [Коли відбувається | Обов’язковий крок] · [Виняток / Примітка] · Як фіксується · Хто залучений / Що погоджує / Що підтверджує. Hybrid process cards add «Процес» first.
  - Cards hug their content (round 4: rows stretched to the frame height read as loose).
  - «Обов’язковий крок» is «Завжди», or «Якщо …» with a grey «Визначається автоматично» line.
  - «Як фіксується» has four wordings: Вручну в CRM / Автоматично / Погодженням у CRM / Підтвердженням у CRM.
- **Screenshots:** two frames, portrait and landscape, with a matte. Under each, a 20 pt caption with the UI path «Розділ <Section> → Сторінка <record> → <Tab>», with «Product catalogue» spelled as the CRM spells it.
- **Step facts confirmed or set by Alex:**
  - **Product manager** owns Data validation.
  - **Supplier contracts:**
    - owner Vendor manager, nobody else involved;
    - the CRM closes the step on its own once every vendor of the product's components has a signed contract with valid dates or auto-renewal.
  - **Infrastructure setup project:**
    - mandatory if the product is public infrastructure;
    - owner Delivery, R&D involved;
    - the PM logs the step after Delivery's project.
  - **R&D PoC:**
    - mandatory when R&D is responsible for design, and R&D can declare it unnecessary;
    - by default it runs before the first customer; R&D can pull it before publication;
    - result: the solution's use in near-customer conditions is tested in practice;
    - Delivery provides equipment if needed.
  - **Finance approval:** required when the PM specified vendor commitments or an infrastructure setup investment.
  - **Sales kick-off:** mandatory for every product type except Third-party licenses.
  - **Tech kick-off:** mandatory for the IaaS family (Core infrastructure, Specialized infrastructure, Add-on tools).
  - **Marketing brief:** the marketing department decides whether it is needed.
  - **Delivery process confirmation:** InfoSec, Support, Capacity manager, Vendor manager.
  - **PMO** = Operations · Business process lead.
  - **Highlights removed:** Managed licenses / Our services design scope, DPC, competences, Head of Product, team slides 1–2. Finance and Legal are no longer on Supplier contracts.
  - **Third-party design scope:**
    - conditions on the product and component pages and in the documentation;
    - access to the vendor or distributor channel and portals;
    - delivery by the Delivery process;
    - contracting by the Contract process and its template;
    - a supplier contract.
- **Перед першим клієнтом:**
  - **Go-live support:**
    - Presales facilitates every new product's go-live; a presales engineer is assigned, with escalation to the product team otherwise;
    - this is the current agreement, marked «To be confirmed» (questions about how it works, may change);
    - per the CRM process, the condition is the same as for Operations kick-off (inferred from the metadata).
  - **PoC before first customer:** a PoC deferred at launch is done before the first delivery; the CRM warns to add 30 days to equipment delivery and setup times.
- **Stage 4:**
  - Contract and Delivery process changes put the process back in Draft and the involved departments re-approve it. This happens:
    - automatically: on a change of the responsible teams, the documentation link or (contract only) the contract template, including a new template added;
    - manually: when the Business process lead judges the description changed materially.
  - Product changes go through a revision. The change-types table lists the 17 types that need an approval, with a note that the list is configurable by agreement with the approver.
  - The product-change screenshot shows «Product name changed» (Head of Product + delivery). Alex spoke of «New component added», which the export routes to delivery + design, not Head of Product.
- **Field-level checks** (hidden slides, from Alex's marked screenshots of 2026-10-12):
  - There is one slide per approver: R&D or Vendor manager as Responsible for design, Delivery as Responsible for delivery.
  - Fields are grouped as Продукт (by tab and block) and Компонент (the component card's Tech details).
  - «Що перевіряє» is a draft that carries the «Чернетка — перевірити» chip.
  - «При змінах» comes from the change-type export. The «Approval: RnD (responsible for design)» column is read as the design role, so it covers Vendor manager too (inferred).
  - Alex's rules:
    - R&D checks the Delivery process only when the process has R&D steps, and then confirms it understands its role.
    - On a component, R&D confirms the characteristics don't contradict the design (no too-small disk, no too-weak CPU).
    - Delivery confirms the component is described correctly, exists with those properties and can be delivered.
- **Team tables:** stages are rows (including «Перед першим клієнтом» and stage 4), teams are columns. Steps are numbered by their exact names; ★ = owns the step, ✎ = enters data or approves in the CRM. There are six slides, with Capacity manager on «Доставка» and Support + InfoSec on «Підтримка й безпека».
- **Product type → responsible teams** (his mapping):
  - Core / Specialized infrastructure / Add-on tools: design R&D + InfoSec; delivery Support + Delivery.
  - Managed licenses / Our services: design Product + R&D; delivery Delivery + Support + InfoSec.
  - Third-party licenses / services: design Vendor manager + Partner manager; delivery Vendor manager + Support + Partner manager.

## Deck conventions (v4)

- **Stage colours:**
  - 1 blue `2563A8`, 2 violet `6B46A3`, 3 green `2E8540`, «Перед першим клієнтом» teal `0F7C8A`, 4 orange `C2620F`;
  - a block still out of scope (Delivery hand-off) is grey dashed;
  - within a stage: full hue for the stage, medium tint for a block, light tint for a step.

  Rules 24–29 of `.claude/references/slide-design.md` hold the general versions.
- **Pictograms:** pencil = Responsible for design, truck = delivery, receipt = Billing, tag = Sales, gear = Технічні команди, clip = Операційні команди, mega = Marketing, board = Presales, headset = L2 Support, wrench = L3, user = an owner.
- **Yellow highlighter** = an inference no source states, with the legend «припущення: у CRM цього немає — перевірити». In v4 only the out-of-scope slide keeps one. Speaker notes carry the verbatim CRM record and the process condition.

## The CRM process (what sets the «Requires …» flags)

The process runs when a product draft changes, or when a component is added to or changed in a product, for products without government compliance services. It only switches flags on, and the PM can switch them on by hand.

- **Supplier contract:** the product has components whose vendor is not GigaCloud.
- **Ops kickoff** (and **go-live support**, same condition): something is new compared with the active products:
  - the Delivery process or the Contract process;
  - the SLA type + Uptime SLA pair;
  - the Virtualization platform;
  - a component vendor with no active products.
- **Investment approval:** a vendor commitment type with Commitment USD > 0, or one of two upfront infrastructure-investment types with Infra investment USD > 0.
- **Tech kickoff:** a product-type attribute, which per Alex means the IaaS family. **Sales kickoff:** a product field ≠ a value, which per Alex means the type is not Third-party licenses. **Infrastructure setup project:** per Alex, public infrastructure. **R&D PoC:** per Alex, Responsible for design = R&D.

## Open items for Alex

- The License delivery process page names Capacity manager as «Responsible for product delivery», but slide 20 doesn't list Capacity manager as a possible Responsible for delivery. Add it?
- The CRM has Delivery process confirmation items only for InfoSec and Support. The deck now names Capacity manager and Vendor manager too, and the action plan says to create their CRM items.
- InfoSec can hold L2/L3 support but has no competence-confirmation item. The Support lines block also has L4 Support (R&D), which the competence schema leaves out.
- Product-change screenshot: «Product name changed» instead of the spoken «New component added» (see Decisions). OK?
- **CRM data fixes** (in the action plan):
  - empty descriptions: Supplier contract, Infrastructure setup project, Initial request to add to billing;
  - typos: «Compentency confirmation: Presales», «Disitributors»;
  - the Delivery process page's warning mentions contract templates;
  - test scopes in What do I approve.
- The Handoff items (R&D → Delivery, VPM → Support) are inactive. That hand-off is out of scope for now.
