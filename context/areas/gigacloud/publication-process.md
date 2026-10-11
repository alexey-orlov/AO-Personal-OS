# Product publication process (PLM) — CRM checklist

_status: the process and its CRM automation are documented in a 37-slide UA deck v1 (2026-10-11), meant for the department heads. Next: Alex checks the yellow-highlighted assumptions and adds screenshots for 9 steps, then presents_
_updated: 2026-10-11_

## Snapshot

- **What it is.** The process that takes a product from draft to sellable and keeps it current, automated in the CRM (Creatio) product card. (chat, 2026-10-11)
  - The Data validation tab lists the required fields and conditions.
  - The Product checklist holds action items, each flagged «required before publication» or not, with Pending counters and a «Not needed» status.
  - Under Required action items → Exceptions, the Head of Product can move items marked (*) to after publication.
  - Product revisions carry team approvals; the «What do I approve» tab shows what each team approves.
- **Four stages**, from Alex's brief and his Miro. (chat, 2026-10-11)
  1. **Виконання критеріїв публікації:**
     - Data validation;
     - Pre-publication action items, in two groups: Operations (Supplier contracts, Operations kick-off, Contract process approval, Delivery process approval) and Technology (Infrastructure setup project, R&D PoC).
  2. **Публікація:** Publication approvals — finance investment, responsible for delivery, responsible for design, Head of product.
  3. **Готовність команд:**
     - Kick-off: send to billing, sales, tech, marketing brief;
     - Process confirmation;
     - Competence confirmation.
  4. **Зміни протягом життя продукту:** Contract process, Delivery process, Product.

  The stage «Upon first customer» (Delivery hand-off) sits between 3 and 4 and is out of scope for now.
- **CRM checklist** (export of 09.10.2026): 24 item types, 22 of them active. (chat, 2026-10-11)
  - 8 are required before publication: Supplier contract, Operations kickoff meeting, Approval of investment from finance dept, Infrastructure setup project, Approval from responsible for design, Contract process approval, Approval from responsible for delivery, Delivery process approval.
  - After publication, each team confirms separately:
    - contract process — VOK, Finance, Sales, VPM;
    - delivery process — InfoSec, Support;
    - competency — Presales, Support (L2), Delivery (L2–L3).
  - Also after publication: Sales and Technical kick-off, Marketing brief, Initial request to add to billing, R&D proof-of-concept.
  - The two Handoff items (R&D → Delivery, VPM → Support) are inactive.
- **Mandatory participants named in the CRM.** (chat, 2026-10-11)
  - Contract process: Finance, Legal and Customer Service (VOK).
  - Delivery process: Support.
  - Investment: the finance director approves.
  - After the Operations kick-off, the operations department has 2 weeks to make sure the processes are documented and approved.
- **Deck and toolchain:** [docs/publication-process-deck/HANDOFF.md](docs/publication-process-deck/HANDOFF.md). The live deck sits on the MacBook Air Desktop and is not committed.

## Active threads

- **Presenting the process to the department heads.** Deck v1 was delivered 2026-10-11. Next, Alex:
  - checks the yellow-highlighted assumptions, such as who owns Supplier contracts, Send to billing and Infrastructure setup project;
  - adds screenshots for the 9 steps that have none;
  - presents.

  Owner: Mine. [handoff](docs/publication-process-deck/HANDOFF.md)
- **CRM fixes found while building the deck** (the deck's draft action plan). Owner: Mine. (chat, 2026-10-11)
  - Write the empty descriptions: Supplier contract, Infrastructure setup project, Initial request to add to billing.
  - Fix the item-name typo «Compentency confirmation: Presales».
  - Replace the test scope values in «What do I approve» with real ones.
  - Decide whether R&D PoC should block publication. Miro shows it before publication; the CRM marks it not required.
  - Decide whether «Approval from Head of product» needs its own checklist item. Today only the exceptions mechanism exists.
- **Stage 4 detail** (how changes during the product's life get approved) is the next deliverable after the presentation (inferred). (chat, 2026-10-11)

## People

- Lyubomir Doroshenko — operations department. After an Operations kick-off he has 2 weeks to make sure the processes are documented and approved (CRM checklist description). See the area [README](README.md#people).

## Decisions

- 2026-10-11 — The stage after publication is named «Готовність команд». Stage 4 gets only a sub-header slide for now. The action plan is a draft for Alex to edit. (chat)

## Open loops

- Mine: check the deck's assumptions, add the missing screenshots, present to the department heads (no date).
- Mine: the CRM fixes listed under Active threads.
- Open: three topics are out of scope for now:
  - monitoring vendor changes, including revising the architecture or the terms when a vendor changes;
  - the R&D → Delivery hand-off (its CRM Handoff items are inactive);
  - supporting the first sales.

## Activity

- 2026-10-11 — [deck v1 + handoff](docs/publication-process-deck/HANDOFF.md) — 37-slide UA deck built from Alex's brief, his Miro and the CRM checklist export. A fresh reviewer checked it against those sources before delivery. (chat)
