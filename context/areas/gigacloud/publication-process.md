# Product publication process (PLM) — CRM checklist

_status: the process and its CRM automation are documented in a 46-slide UA deck v3 (2026-10-12), reworked on Alex's third round of dictated feedback and meant for the department heads. Next: Alex names the CRM fields behind two conditional steps, checks the remaining yellow-highlighted assumptions, then presents_
_updated: 2026-10-12_

## Snapshot

- **What it is.** The process that takes a product from draft to sellable and keeps it current, automated in the CRM (Creatio) product card. (chat, 2026-10-11)
  - The Data validation tab lists the required fields and conditions; the fields on it are examples, not the full list.
  - Product type cards hold business rules for which values a product may take, e.g. allowed contract types, subscription periods and billing frequency.
  - The Product checklist holds action items, each flagged «required before publication» or not, with Pending counters and a «Not needed» status.
  - Under Required action items → Exceptions, the Head of Product can move items marked (*) to after publication.
  - Product revisions carry the team approvals.
- **Four stages**, from Alex's brief and his Miro. (chat, 2026-10-11/12)
  1. **Виконання критеріїв публікації:**
     - Data validation;
     - Pre-publication action items, in two groups: Operations (Supplier contracts, Operations kick-off, Contract process approval, Delivery process approval) and Technology (Infrastructure setup project, R&D PoC).
  2. **Публікація:** two roles, Responsible for design and Responsible for delivery, and the approvals in Alex's order — design → delivery → Head of Product → finance investment.
  3. **Готовність команд:** publication starts six streams — Billing (send to billing), Sales (sales kick-off), technical teams (tech kick-off → competence confirmation), operations teams (contract process confirmation), delivery teams (delivery process confirmation), Marketing (marketing brief).
  4. **Зміни протягом життя продукту:** Contract process, Delivery process, Product.

  The stage «Upon first customer» (Delivery hand-off) sits between 3 and 4 and is out of scope for now.
- **Operations kick-off starts both processes** (Alex, feedback). (chat, 2026-10-11)
  - It is a joint meeting with all participants of contracting and delivery, owned by the Product manager.
  - Afterwards Operations (Business process lead) documents the contract and delivery processes with the departments. The teams then approve them before publication; the CRM closes the step when the process is approved on its page.
  - After publication, each participating team confirms that this particular product fits the process.
- **Three technical competences** (Alex). (chat, 2026-10-12)
  - Presales — the Presales department.
  - L2 Support (consulting, help with standard scenarios) — Support, Delivery or InfoSec.
  - L3 Support (deeper technical expertise) — Delivery or InfoSec.

  The department for L2 and L3 is set per product on its page (Delivery tab → Support lines).
- **CRM checklist** (export of 09.10.2026): 24 item types, 22 of them active. (chat, 2026-10-11)
  - 8 are required before publication.
  - After publication, teams confirm separately: contract process — VOK, Finance, Sales, VPM; delivery process — InfoSec, Support; competency — Presales, Support (L2), Delivery (L2–L3).
  - The two Handoff items (R&D → Delivery, VPM → Support) are inactive.
- **The CRM process `GCLProcess_cc7cc57` decides when conditional steps are required.** It sets 8 «Requires …» checkboxes on the product. (chat, 2026-10-11)
  - **Supplier contract:** some components come from a vendor other than GigaCloud.
  - **Ops kickoff / go-live support:** compared with the active products, the product brings a new delivery or contract process, a new SLA type + uptime pair, a new virtualization platform, or a vendor with no active products.
  - **Investment approval:** the PM specified a vendor commitment or an upfront infrastructure investment, with a USD amount > 0.
  - **R&D PoC:** Responsible for design = R&D (Alex). By default it runs after publication; R&D can pull it before publication or declare it unnecessary. (chat, 2026-10-12)
  - **Tech kickoff, infrastructure setup project, sales kickoff:** these depend on product-type or product fields whose names the metadata does not show.
  - The process runs on product drafts and component changes, for products without government compliance services.
- **Product type → responsible teams** (Alex, feedback). (chat, 2026-10-11)

  | Product types | Design | Delivery |
  |---|---|---|
  | Core and Specialized infrastructure, Add-on tools | R&D, InfoSec | Support, Delivery |
  | Managed licenses, Our services | Product, R&D | Delivery, Support, InfoSec |
  | Third-party licenses and services | Vendor manager, Partner manager | Vendor manager, Support, Partner manager |
- **Deck and toolchain:** [docs/publication-process-deck/HANDOFF.md](docs/publication-process-deck/HANDOFF.md). The live deck sits on the MacBook Air Desktop and is not committed.

## Active threads

- **Presenting the process to the department heads.** Deck v3 was delivered 2026-10-12. Next, Alex:
  - names the CRM fields behind Sales kickoff and Infrastructure setup project, and confirms the tech-kickoff reading;
  - confirms that Process management office = Operations (Business process lead);
  - checks the remaining yellow-highlighted assumptions;
  - presents.

  Owner: Mine. [handoff](docs/publication-process-deck/HANDOFF.md)
- **CRM fixes found while building the deck** (the deck's draft action plan). Owner: Mine. (chat, 2026-10-11/12)
  - Write the empty descriptions: Supplier contract, Infrastructure setup project, Initial request to add to billing.
  - Fix the item-name typo «Compentency confirmation: Presales».
  - Replace the test scope values in «What do I approve» with real ones.
  - InfoSec can hold L2/L3 support but has no competence-confirmation item (inferred gap).
- **Stage 4 detail** (how changes during the product's life get approved) comes after the presentation (inferred). (chat, 2026-10-11)

## People

- Lyubomir Doroshenko — operations department. After an Operations kick-off he has 2 weeks to make sure the processes are documented and approved (CRM checklist description). See the area [README](README.md#people).

## Decisions

- 2026-10-12 — v3 feedback (all from Alex):
  - Publication approvals now run design → delivery → Head of Product → finance, after a slide with the two roles.
  - Each step card is headed by the step name and its Owner. «When» and «mandatory» are separate fields, each answered from a fixed vocabulary. A uniform «Як фіксується» field and a business result appear on every card.
  - Every screenshot carries its CRM path.
  - Stage 3 gets a six-stream schema with pictograms; the competence block gets its own schema.
  - The team tables put stages in rows and teams in columns, with ★ for the owner and ✎ for entering data or approving in the CRM.
- 2026-10-11 — v2 feedback (all from Alex):
  - Contract and Delivery process approvals are hybrid cards, owned by Operations · Business process lead.
  - Screenshots sit in two standard frames.
  - The stages are colour-coded on one grid across the overview, the map and the dividers.
- 2026-10-11 — The stage after publication is named «Готовність команд». Stage 4 gets only a sub-header slide for now. The action plan is a draft for Alex to edit. (chat)

## Open loops

- Mine: answer the deck's open CRM questions (fields behind Sales kickoff and Infrastructure setup project; PMO = Operations?), check the remaining assumptions, present to the department heads (no date).
- Mine: the CRM fixes listed under Active threads.
- Open: three topics are out of scope for now:
  - monitoring vendor changes, including revising the architecture or the terms when a vendor changes;
  - the R&D → Delivery hand-off (its CRM Handoff items are inactive);
  - supporting the first sales. The CRM flag «Requires go-live support» may belong here (inferred).

## Activity

- 2026-10-12 — [deck v3 + handoff](docs/publication-process-deck/HANDOFF.md) — 46 slides, reworked on Alex's third dictated feedback and his competence comment:
  - cards headed by step + Owner, with when/mandatory split and «Як фіксується»;
  - UI-path captions;
  - roles, team-readiness and competence schemas with vector pictograms;
  - transposed team tables with ★/✎.

  A fresh review was applied before delivery. (chat)
- 2026-10-11 — [the dictated feedback memo](calls/other/2026-10-12_130201_default_20261011192457B8796AD2.md) (processed 2026-10-12; it reached this Mac only after a Voice Memos sync restart) — the source of v2's rework; nothing new beyond what v2 applied.
- 2026-10-11 — [deck v2 + handoff](docs/publication-process-deck/HANDOFF.md) — 42 slides, reworked on Alex's dictated feedback: colour-coded process maps, stacked 20 pt step cards, an Operations kick-off → processes schema, product-type responsibility tables, «when required» rows taken from the CRM process `GCLProcess_cc7cc57`. (chat)
- 2026-10-11 — [deck v1 + handoff](docs/publication-process-deck/HANDOFF.md) — 37-slide UA deck built from Alex's brief, his Miro and the CRM checklist export, fidelity-reviewed. (chat)
