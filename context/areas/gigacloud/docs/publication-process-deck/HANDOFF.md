# Publication-process deck — handoff (continue on any machine)

_Rewritten 2026-10-12 on Alex's MacBook Air after v3 was delivered (v3 = v2 reworked on Alex's dictated feedback round 3 of the same day, plus his comment asking for a technical-competences schema). Read fully before touching the deck._

⛔ GigaCloud = internal-only area. The deck is internal; nothing from it goes into external-facing artifacts.

## The deck

| Deck | State | Live copy (Alex hand-edits it — living-documents rule) | In this repo |
|---|---|---|---|
| **Publication process** — `GigaCloud_Product Publication Process_12-OCT-2026 (v3).pptx`: the product publication process and its automation in the CRM | v3, 46 slides, UA (2026-10-12); v1 (37 slides) and v2 (42) kept beside it | MacBook Air: `~/Desktop/GigaCloud/` | **not committed** (CRM screenshots, an employee name in a CRM description) |

**Deck map (v3):**
1. Cover.
2. Stages overview.
3. Process map: stage → block → step.
4. Section «Кроки процесу».
5. **Stage 1:** sub-header; Product info ×2 (one card, two screenshots); Components info; Supplier contracts; the Operations kick-off → processes schema; Operations kick-off; Contract and Delivery process approval; Infrastructure setup project; R&D Proof of concept.
6. **Stage 2:** sub-header; the two-roles slide (Responsible for design / for delivery); the design and delivery product-type tables; then the approvals in Alex's order: design → delivery → Head of Product → finance.
7. **Stage 3:** sub-header; the team-readiness schema (publication → six streams); Send to billing ×2 (automatic e-mail, manual log); Sales kick-off; Tech kick-off; Marketing brief; Contract and Delivery process confirmation; the three-competences schema; Presales, Support and Delivery competence.
8. **Stage 4:** sub-header only.
9. Section «Участь команд» and 5 team slides.
10. Section «Next steps»: the draft action plan and the out-of-scope questions.

**Sources:**
- **Brief:** Google Doc «Процеси» (id `1DOesPriI_ehSpQk6KyMLUCphRb7PNSMDekP22GAt00I`), with the Miro schema and 9 screenshots.
- **CRM checklist export** «Product Checklist Item Type» (09.10.2026, 24 item types).
- **Alex's dictated feedback:** round 2 (`toolchain/plm/feedback_2026-10-11_transcript.txt`) with his typed product-type → team mapping; round 3 (`toolchain/plm/feedback_2026-10-12_transcript.txt`) with 10 more screenshots (both process pages, the billing e-mail and manual log, Sales and Tech kick-off, DPC Support, Presales and Delivery competence, the product's Support lines) and a typed comment on the three technical competences.
- **Creatio process `GCLProcess_cc7cc57`** (`toolchain/plm/crm_process_GCLProcess_cc7cc57.json`, readable dump `crm_process_dump.txt`). It sets the product's 8 «Requires …» checkboxes, which decide when the conditional steps are mandatory.

## How it is built

- **Generator:** `~/Desktop/GigaCloud/toolchain/plm/build_plm3.py <base.pptx> <img_dir> <out.pptx>`.
  - Content: `plm_data3.py` — stage tokens, the MAP, one dict per step card, the schemas (ops, roles, team readiness, competences), product-type groups, the team matrix, next steps. The recording wordings are constants there (`REC_*`, `manual()`), so a second phrasing cannot appear.
  - `gcicons.py`: 11 vector pictograms as native grouped shapes (user, pencil, truck, receipt, tag, gear, clip, mega, board, headset, wrench).
  - `gclib.py`: the margin deck's `lib.py` with a highlighter flag, freeform styling and auto-numbered lists.
  - v1/v2 generators are kept for reference only.
- **Render and check:** `pp_render.sh` from `../margin-deck/toolchain/results-deck/`, then `tools/bottoms.py <pdf>` — it reads the table borders from the PowerPoint PDF and flags any card ending below 13.75″. The builder's own fit estimates run ~0.3″ short on long cards, so trust the PDF.
- **After v3 Alex owns the file.** Never regenerate over his edits. Build only the changed slides and clone them into his file, the margin deck's transplant approach (`../margin-deck/HANDOFF.md`).
- **QA on v3:** a fresh Opus reviewer compared the rendered deck with the round-3 transcript and the competence comment: `toolchain/plm/review_fidelity_v3.md`.

## Decisions Alex made (2026-10-11/12, do not re-litigate)

- **Stages:** the stage after publication is «Готовність команд»; stage 4 gets only a sub-header; the action plan is a draft for him to edit.
- **Publication approvals order:** design → delivery → Head of Product → finance (changed 2026-10-12 from v2's design → HoP → delivery → finance). A two-roles slide opens stage 2; the two product-type tables follow it and carry the role's pictogram.
- **Step card:** the header is the step name + «Owner: <role>»; no «У CRM» line, no type label.
  - Sections: Суть · Результат (a business result) · [Коли відбувається | Обов’язковий крок] in one row · [Виняток] · Як фіксується · Хто залучений / Що погоджує / Що підтверджує. Hybrid process cards add «Процес» first and end on «Хто погоджує».
  - «Коли відбувається» names the stage the step runs in: До публікації (stage 1), Під час публікації (stage 2, all four approvals), Після публікації (stage 3, Send to billing included), При змінах (stage 4). The overview and the map carry the same four words over the stages. R&D PoC is the one stage-1 step that runs after publication by default. «Обов’язковий крок» is «Завжди» with nothing appended, or «Якщо …» (structured) + a grey «Визначається автоматично» when the CRM sets the flag.
  - «Як фіксується» uses four wordings: «Вручну в CRM: <role> логує крок і додає посилання на підтвердження»; «Автоматично: CRM …»; «Погодженням у CRM: …»; «Підтвердженням у CRM: …».
- **Screenshots:** two frames, portrait 7.4×9.0″ and landscape 11.0×7.8″ (2× scale), with a matte; a 20 pt caption under each with the UI path «Розділ <Section> → Сторінка <record> → <Tab>» in English names, «Product catalogue» as the CRM spells it. The process pages and very wide screens are cropped collages so their text stays readable.
- **Step facts confirmed or set by Alex:**
  - Product manager owns Data validation.
  - Infrastructure setup project: Owner Delivery, R&D involved.
  - R&D PoC: after publication by default, before it if R&D decides; mandatory when Responsible for design = R&D, and R&D can declare it unnecessary; Delivery provides equipment.
  - Finance approval is required automatically when the PM specified vendor commitments or an upfront infrastructure investment.
  - The Head of Product slide does not mention that the CRM has no item for that approval.
  - The Managed licenses / Our services design scope, the DPC and the competence texts are correct (highlights removed).
- **Ops schema:** owners in the boxes with a user pictogram: Product manager; Business process lead; none on the publication box; «Усі залучені відділи» on the confirmations. That phrase is the deck's one name for the participating departments (process approvals «Хто погоджує», confirmation Owners).
- **Team readiness schema:** publication → six streams: Billing (Send to billing), Sales (Sales kick-off*), Технічні команди (Tech kick-off* → Competence confirmation), Операційні команди (Contract process confirmation), Команди доставки (Delivery process confirmation), Marketing (Marketing brief*); * = obligation set by conditions. The stage-3 step slides repeat their stream's pictogram in the kicker row.
- **Three technical competences:** Presales — Presales; L2 Support (consulting, standard scenarios) — Support, Delivery or InfoSec; L3 Support (deeper expertise) — Delivery or InfoSec; which department, per product, is set on the product page (Delivery tab → Support lines).
- **"You are here" strips:** the two product-type tables and the two role approvals carry a strip of the two roles in the kicker row, the current role in colour; the three competence slides carry the three competences (Delivery lights L2 and L3). The other stage-3 slides carry their stream's pictogram.
- **Send to billing:** two slides with the same card: the automatic CRM e-mail and the manual log (date + billing ticket number).
- **Marketing brief screenshot** is synthesised from the Tech kick-off one (Montserrat 530, the CRM's own description text), as Alex asked.
- **Team tables:** stages are rows, teams are columns; numbered exact step names; ★ = owns the step, ✎ = enters data or approves in the CRM; a legend.
- **Product type → responsible teams** (his mapping): Core / Specialized infrastructure / Add-on tools — design R&D + InfoSec, delivery Support + Delivery; Managed licenses / Our services — design Product + R&D, delivery Delivery + Support + InfoSec; Third-party licenses / services — design Vendor manager + Partner manager, delivery Vendor manager + Support + Partner manager. The delivery scope is one description for all types.

## Deck conventions (v3)

- **Stage colours:** 1 blue `2563A8`, 2 violet `6B46A3`, 3 green `2E8540`, 4 orange `C2620F`, Upon first customer grey dashed. Within a stage: full hue for the stage, medium tint for a block, light tint for a step. One column grid for the overview, the map and the divider mini-map. Rules 24–29 of `.claude/references/slide-design.md` hold the general versions.
- **Pictograms:** pencil = Responsible for design, truck = delivery (the role and «Команди доставки»), receipt = Billing, tag = Sales, gear = Технічні команди, clip = Операційні команди, mega = Marketing, board = Presales, headset = L2 Support, wrench = L3 (Delivery competence's L2–L3), user = an owner.
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
- **Sales kickoff:** one product field ≠ one value; the field is not named in the metadata. **R&D PoC:** one product field = one value — per Alex, Responsible for design = R&D.

## Open items for Alex

- Name the fields behind Sales kickoff and Infrastructure setup project, and confirm the tech-kickoff reading. The deck shows «<умова з даних продукту — уточнити>», highlighted.
- Confirm that Process management office = Operations (Business process lead).
- Still highlighted: Vendor manager as Supplier contracts owner, with Legal and Finance involved; Delivery among the Delivery process approvers; go-live support belonging to first-sales support.
- InfoSec can hold L2/L3 support, but the CRM checklist has competence confirmation only for Presales, Support and Delivery. The Support lines block also has an L4 Support (R&D) that the competence schema leaves out — show it or not?
- Highlights removed on v2's slides 18 (design scope) and 19 (Head of Product timing), reading «оставляй как есть, всё корректно» as "confirmed". If he meant keep the highlight, restore it.
- The Head of Product approval's recording is highlighted: the CRM has no item for it, so «Погодженням у CRM» is a target, not a fact.
- **CRM data fixes:**
  - empty descriptions: Supplier contract, Infrastructure setup project, Initial request to add to billing;
  - the typo «Compentency confirmation: Presales»;
  - test scopes in What do I approve;
  - the VOK description on the screenshot is older than the 09.10 export.
- The Handoff items (R&D → Delivery, VPM → Support) are inactive. That hand-off is out of scope for now.
