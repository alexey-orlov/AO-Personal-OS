# Jumpstart outreach tracker: registry and sync ledger

Maps each AI Jumpstart outreach account to its tracker docs and its wiki home, and records the tracker version the wiki has folded. The contract that uses it: `.claude/references/jumpstart-outreach-tracker.md`.

- **Tracker:** [California Jumpstart Outreach](https://claude.ai/artifact/5spjsfxGjGhj9ynmkh67qe), a private claude.ai artifact. Collections `accounts` (research) and `tracking` (status, next step, contacts, account summary), one doc per slug; read and written with `ArtifactData`.
- **Last full sync:** 2026-11-27, both directions, all rows below.

## Accounts

In the tracker's priority order. "Folded" is the `tracking` version the wiki reflects.

| Slug | Account | Wiki home | Folded | On |
|---|---|---|---|---|
| semtech | Semtech | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 9 | 2026-11-26 |
| horizon-surgical-systems | Horizon Surgical Systems | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 8 | 2026-11-22 |
| generac | Generac (with ecobee) | [generac](../areas/softserve/generac.md) | 11 | 2026-11-27 |
| blackberry | BlackBerry (QNX) | [blackberry](../areas/softserve/blackberry.md) | 11 | 2026-11-27 |
| nextera-energy | NextEra Energy | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 7 | 2026-11-23 |
| loreal-north-america | L'Oréal North America | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 5 | 2026-11-27 |
| also | ALSO (listed as Ride Also) | [also](../areas/softserve/also.md) | 12 | 2026-11-27 |
| maximo-robotics | Maximo Robotics | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 10 | 2026-11-26 |
| aes | AES (Maximo's parent) | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 2 | 2026-11-23 |
| lumentum | Lumentum | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 8 | 2026-11-23 |
| hexagon-mining | Hexagon Mining | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 3 | 2026-11-23 |
| georgia-pacific | Georgia-Pacific | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 6 | 2026-11-27 |
| shi-teoco | SHI / TEOCO | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 4 | 2026-11-26 |
| oncor-electric | Oncor Electric | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 4 | 2026-11-26 |
| brain-corp | Brain Corp | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 3 | 2026-11-23 |
| benchling | Benchling | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 3 | 2026-11-23 |
| genentech | Genentech | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 3 | 2026-11-23 |
| amgen | Amgen | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 3 | 2026-11-23 |
| intuitive-surgical | Intuitive Surgical | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 3 | 2026-11-23 |
| masimo | Masimo | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 2 | 2026-11-22 |
| dexcom | Dexcom | [jumpstart-science](../areas/softserve/jumpstart-science.md#active-threads) | 3 | 2026-11-23 |

## Pending pushes

Wiki changes made by a run that could not write the tracker. The next run with `ArtifactData` pushes them and clears the line.

-
