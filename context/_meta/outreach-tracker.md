# Jumpstart outreach tracker: registry and sync ledger

Maps each AI Jumpstart outreach account to its tracker docs and its wiki home, and records the tracker version the wiki has folded. The contract that uses it: `.claude/references/jumpstart-outreach-tracker.md`.

- **Tracker:** [California Jumpstart Outreach](https://claude.ai/artifact/5spjsfxGjGhj9ynmkh67qe), a private claude.ai artifact. Collections `accounts` (research) and `tracking` (status, next step, contacts, account summary), one doc per slug; read and written with `ArtifactData`.
- **Last full sync:** 2026-11-23, both directions, all rows below.

## Accounts

In the tracker's priority order. "Folded" is the `tracking` version the wiki reflects.

| Slug | Account | Wiki home | Folded | On |
|---|---|---|---|---|
| semtech | Semtech | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 6 | 2026-11-25 |
| horizon-surgical-systems | Horizon Surgical Systems | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 8 | 2026-11-22 |
| generac | Generac (with ecobee) | [generac](../areas/softserve/generac.md) | 8 | 2026-11-22 |
| blackberry | BlackBerry (QNX) | [blackberry](../areas/softserve/blackberry.md) | 8 | 2026-11-22 |
| nextera-energy | NextEra Energy | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 7 | 2026-11-23 |
| loreal-north-america | L'Oréal North America | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 4 | 2026-11-23 |
| also | ALSO (listed as Ride Also) | [also](../areas/softserve/also.md) | 7 | 2026-11-25 |
| maximo-robotics | Maximo Robotics | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 7 | 2026-11-23 |
| aes | AES (Maximo's parent) | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 2 | 2026-11-23 |
| lumentum | Lumentum | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 8 | 2026-11-23 |
| hexagon-mining | Hexagon Mining | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 3 | 2026-11-23 |
| georgia-pacific | Georgia-Pacific | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 5 | 2026-11-23 |
| shi-teoco | SHI / TEOCO | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 1 | 2026-11-23 |
| oncor-electric | Oncor Electric | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 1 | 2026-11-23 |
| brain-corp | Brain Corp | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 3 | 2026-11-23 |
| benchling | Benchling | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 3 | 2026-11-23 |
| genentech | Genentech | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 3 | 2026-11-23 |
| amgen | Amgen | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 3 | 2026-11-23 |
| intuitive-surgical | Intuitive Surgical | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 3 | 2026-11-23 |
| masimo | Masimo | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 2 | 2026-11-22 |
| dexcom | Dexcom | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 3 | 2026-11-23 |

## Pending pushes

Wiki changes made by a run that could not write the tracker. The next run with `ArtifactData` pushes them and clears the line.

- `semtech` — from the [11-25 intro call with Olha Bilak](../areas/softserve/calls/2026-11-25_094002_default_2026112508331879C4E3FA.md) (counterpart inferred; headless fold, 2026-11-25); status unchanged (talking). `tracking.notes`: replace the 11-25 call with the next step: Alex sends Olha a client-facing one-pager (the two-pager is internal) and more slides (the C-level business view, VP of Engineering pains) and books a sync next week (from 11-30); for it Olha maps the stakeholders the offer fits (California-based ones flagged, Sales Navigator), brings 5–6 public Semtech pains for Alex to answer, and asks delivery what SoftServe's designer covers; her procurement meeting is in December; two tracks agreed: the Jumpstart through the existing contacts, other SoftServe solutions matched to Semtech's public pains; keep every point Alex wrote that still holds. `tracking.updated_at`: 2026-11-25 (the next step changed). `tracking.contacts`: add Olha Bilak (SoftServe CRO rep, assigned by Andrew Dunifer) if she isn't there. `tracking.account_summary`: SoftServe works only in Sierra Wireless's cloud direction (inferred; the head of cloud as counterpart, DevOps, a few testers, one designer), with no engineering work and no SDLC Jumpstart offered; its reachable contacts sit outside California.
- `also` — from the [11-24](../areas/softserve/calls/2026-11-25_092146_default_202611240904364F05371A.md) and [11-25](../areas/softserve/calls/2026-11-25_091841_default_20261125063320BAC4658D.md) calls (headless fold, 2026-11-25); status unchanged (yes). `tracking.notes`: replace the preliminary 11-24 follow-up (held, inferred) with the next step: Ira and Yuliia meet Kelly, ALSO's VP of Software (firmware & embedded, Tools & Validation, Cloud Platforms), Mon 12-07, 30 min booked to pitch manufacturing, raising the new-product-launch problems as questions to win a dedicated meeting; before it Alex sends Ira 2–3 executive-summary slides and a question list (firmware & embedded and Tools & Validation first, hardware a bonus via Kelly's recommendation to the CTO; public facts only, nothing traceable to ALSO's Confluence, no model names) and books a morning pre-sync the week of 11-30; keep every point Alex wrote that still holds. `tracking.updated_at`: 2026-11-25 (the next step changed). `tracking.contacts`: add Ira (SoftServe, ALSO account team; surname not said) if a slot is free. `tracking.account_summary`: SoftServe works on ALSO's cloud side, in Cloud Platforms under Kelly (with one of her reports), never on firmware; Ira holds SoftServe's ADP for ALSO; HIL testing ($600K) still open in CRM. `accounts/also` people: add Kelly (VP of Software, a peer of the CTO; the way in, likely the buyer for firmware & embedded, inferred); Johnny Wall: director of embedded engineering in Kelly's org, firmware (about 10) under him; the hardware directors (battery, chassis) report to the CTO.
