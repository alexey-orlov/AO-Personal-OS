# Product publication process (PLM) — CRM checklist

_status: the process and its CRM automation are documented in a UA deck v8 (2026-10-12: 58 shown slides after four rounds of Alex’s dictated feedback and his follow-ups, plus 3 hidden field-check slides), meant for the department heads. Next: Alex answers four small questions (Capacity manager as a delivery owner, the CRM items for two new confirming teams, L4 support / InfoSec competence, the product-change screenshot), then presents_
_updated: 2026-10-12_

## Snapshot

- **What it is.** The process that takes a product from draft to sellable and keeps it current, automated in the CRM (Creatio) product card. (chat, 2026-10-11)
  - The Data validation tab lists the required fields and conditions; the fields on it are examples, not the full list.
  - Product type cards hold business rules for which values a product may take, e.g. allowed contract types, subscription periods and billing frequency.
  - The Product checklist holds action items, each flagged «required before publication» or not, with Pending counters and a «Not needed» status.
  - Under Required action items → Exceptions, the Head of Product can move items marked (*) to after publication.
  - Product revisions carry the team approvals.
- **Five stages**, from Alex's brief, his Miro and his feedback. (chat, 2026-10-11/12)
  1. **Виконання критеріїв публікації:**
     - Data validation;
     - Pre-publication action items, in two groups: Operations (Supplier contracts, Operations kick-off, Contract process approval, Delivery process approval) and Technology (Infrastructure setup project, R&D PoC).
  2. **Публікація:** two roles, Responsible for design and Responsible for delivery, and the approvals in Alex's order — design → delivery → Head of Product (the revision, then exceptions) → finance investment.
  3. **Готовність команд:** publication starts six streams — Billing (send to billing), Sales (sales kick-off), technical teams (tech kick-off → competence confirmation), operations teams (contract process confirmation), delivery teams (delivery process confirmation), Marketing (marketing brief).
  4. **Перший клієнт** (Alex named it by its event, 2026-10-12):
     - before the first customer: go-live support, where Presales facilitates each new product's customer go-live (the current agreement, to be confirmed), and a PoC deferred at launch, done before the first delivery (+30 days to delivery times);
     - after the first customer: the Delivery hand-off (R&D → Delivery), out of scope for now.
  5. **Зміни протягом життя продукту:**
     - a changed contract or delivery process returns to Draft and the departments re-approve it;
     - a product change goes through a revision, and 17 of the 30 CRM change types need an approval: Responsible for delivery approves all 17, Head of Product or Responsible for design some.
- **Operations kick-off starts both processes** (Alex, feedback). (chat, 2026-10-11)
  - It is a joint meeting with all participants of contracting and delivery, owned by the Product manager.
  - Afterwards Operations (Business process lead) documents the contract and delivery processes with the departments. The teams then approve them before publication; the CRM closes the step when the process is approved on its page.
  - After publication, each participating team confirms that this particular product fits the process. For delivery that is InfoSec, Support, Capacity manager and Vendor manager.
- **Three technical competences** (Alex). (chat, 2026-10-12)
  - Presales — the Presales department.
  - L2 Support (consulting, help with standard scenarios) — Support, Delivery or InfoSec.
  - L3 Support (deeper technical expertise) — Delivery or InfoSec.

  The department for L2 and L3 is set per product on its page (Delivery tab → Support lines).
- **CRM checklist** (export of 09.10.2026): 24 item types, 22 of them active. (chat, 2026-10-11)
  - 8 are required before publication.
  - After publication, teams confirm separately: contract process — VOK, Finance, Sales, VPM; delivery process — InfoSec, Support; competency — Presales, Support (L2), Delivery (L2–L3).
  - The two Handoff items (R&D → Delivery, VPM → Support) are inactive.
- **When conditional steps are required.** The CRM process `GCLProcess_cc7cc57` sets 8 «Requires …» checkboxes on the product; Alex named the business rules behind them. (chat, 2026-10-11/12)
  - **Supplier contract:** some components come from a vendor other than GigaCloud. The CRM closes the step on its own once every such vendor has a signed contract with valid dates or auto-renewal.
  - **Ops kickoff / go-live support:** compared with the active products, the product brings a new delivery or contract process, a new SLA type + uptime pair, a new virtualization platform, or a vendor with no active products.
  - **Investment approval:** the PM specified vendor commitments or an infrastructure setup investment, with a USD amount > 0.
  - **Infrastructure setup project:** the product is public infrastructure. Delivery runs the project and the PM logs the step.
  - **Sales kickoff:** every product type except Third-party licenses.
  - **Tech kickoff:** the IaaS family — Core infrastructure, Specialized infrastructure, Add-on tools.
  - **R&D PoC:**
    - required when R&D is responsible for design;
    - by default it runs before the first customer; R&D can pull it before publication or declare it unnecessary.
  - **Marketing brief:** the marketing department decides.
- **What each approver checks, field by field** (Alex's marked CRM screenshots). (chat, 2026-10-12)
  - **R&D (design):** descriptions, FAQ and documentation don't contradict the technical design; categorization, technical details, components and their limits match the design; compatibility; the architect and the PoC decision. On the Delivery process it checks only its own steps, if there are any. On a component, the characteristics must not contradict the design.
  - **Vendor manager (design):** subscription and billing terms, categorization, components and their ordering rules, trial and commitments match the vendor contract; we can deliver and contract under the linked processes; vendor lead times; the component's vendor and SKU.
  - **Delivery:** we can deliver components, disks, datacenters, trial, the delivery process, times and automation as described; support lines are staffed; the infrastructure investment covers what must be built; components are described correctly and exist.
  - At publication every approver approves all their fields. On a change, the CRM routes most change types only to Responsible for delivery, so the change list should be agreed with the approvers.
- **Product type → responsible teams** (Alex, feedback). (chat, 2026-10-11)

  | Product types | Possible design owners | Possible delivery owners |
  |---|---|---|
  | Core and Specialized infrastructure, Add-on tools | R&D, InfoSec | Support, Delivery |
  | Managed licenses, Our services | Product, R&D | Delivery, Support, InfoSec |
  | Third-party licenses and services | Vendor manager, Partner manager | Vendor manager, Support, Partner manager |
- **Deck and toolchain:** [docs/publication-process-deck/HANDOFF.md](docs/publication-process-deck/HANDOFF.md). The live deck sits on the MacBook Air Desktop and is not committed.

## Active threads

- **Presenting the process to the department heads.** Deck v4 was delivered 2026-10-12. Next, Alex:
  - says whether Capacity manager is a possible Responsible for delivery (the License delivery process names it);
  - decides on L4 support (R&D) and an InfoSec competence item;
  - OKs the product-change screenshot («Product name changed» in place of «New component added»);
  - edits the draft action plan, then presents.

  Owner: Mine. [handoff](docs/publication-process-deck/HANDOFF.md)
- **CRM fixes found while building the deck** (the deck's draft action plan). Owner: Mine. (chat, 2026-10-11/12)
  - Write the empty descriptions: Supplier contract, Infrastructure setup project, Initial request to add to billing.
  - Fix the typos «Compentency confirmation: Presales» and «Disitributors», and the Delivery process page's warning that mentions contract templates.
  - Replace the test scope values in «What do I approve» with real ones.
  - Add Delivery process confirmation items for Capacity manager and Vendor manager.
  - Agree the list of product change types that need an approval with the approvers.

## People

- Lyubomir Doroshenko — operations department. After an Operations kick-off he has 2 weeks to make sure the processes are documented and approved (CRM checklist description). See the area [README](README.md#people).

## Decisions

- 2026-10-12 — v8 (Alex):
  - the block between stages 3 and 4 becomes stage 4 «Перший клієнт», with «Перед» and «Після першого клієнта» sub-blocks; «Зміни» becomes stage 5;
  - his action plan replaces the draft;
  - an accent slide with the formula opens and closes the deck: процеси, що працюють = прозорість флоу + автоматизація + buy-in учасників.
- 2026-10-12 — v4–v5 (all from Alex):
  - colour-band stage headers;
  - the CRM checklist after the map;
  - stage 4 detailed;
  - «Перед першим клієнтом» added;
  - the conditional-step rules set;
  - PMO = Operations;
  - Head of Product on two slides;
  - hidden field-check slides per approver.
- 2026-10-12 — v3 (Alex): approvals design → delivery → Head of Product → finance after a two-roles slide; cards headed by step + Owner with «when» and «mandatory» split, «Як фіксується» and business results; CRM paths under screenshots; team tables as stages × teams with ★/✎.
- 2026-10-11 — v2 (Alex): hybrid process-approval cards owned by Operations · Business process lead; two standard screenshot frames; one colour per stage on one grid. The stage after publication is «Готовність команд»; the action plan is a draft for Alex.

## Open loops

- Mine: answer the deck's four open questions (see Active threads) and present to the department heads (no date).
- Mine: the CRM fixes listed under Active threads.
- Open: three topics are out of scope for now:
  - monitoring vendor changes, including revising the architecture or the terms when a vendor changes;
  - the R&D → Delivery hand-off (its CRM Handoff items are inactive);
  - supporting the first sales beyond go-live support, which is itself to be confirmed.

## Activity

- 2026-10-12 — [deck v8](docs/publication-process-deck/HANDOFF.md) — stage 4 «Перший клієнт» / stage 5 «Зміни»; three screenshots enlarged as focused crops; Alex's action plan; accent slide at both ends; map chips sized from widths measured in PowerPoint. (chat)
- 2026-10-12 — [decks v5–v7](docs/publication-process-deck/HANDOFF.md) — hidden field-check slides per approver; slide 4 cut to one note; bold lead-ins in every scanned list. (chat)
- 2026-10-12 — [deck v4](docs/publication-process-deck/HANDOFF.md) — 56 slides: the CRM checklist slide, colour-band stage headers, «Перед першим клієнтом», stage 4 with the 17 change types that need an approval; fresh review applied. (chat)
- 2026-10-12 — [deck v3](docs/publication-process-deck/HANDOFF.md) — 46 slides: cards headed by step + Owner, UI-path captions, roles / team-readiness / competence schemas, transposed team tables. (chat)
- 2026-10-11 — [the dictated feedback memo](calls/other/2026-10-12_130201_default_20261011192457B8796AD2.md) (processed 2026-10-12, after a Voice Memos sync restart) — the source of v2's rework.
- 2026-10-11 — [decks v1 (37 slides) and v2 (42)](docs/publication-process-deck/HANDOFF.md) — built from Alex's brief, his Miro and the CRM checklist export, then reworked on his dictated feedback. (chat)
