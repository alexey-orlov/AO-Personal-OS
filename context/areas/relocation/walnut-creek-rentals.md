# Walnut Creek rental search

_status: active — 44 listings in the "WC appartment" tab, staged in its Stage column (2026-11-09): 4 To schedule, 3 Planned, 5 Visited, 32 not yet; the rental map colours them pink · blue · yellow (grey = Dismissed)_
_updated: 2026-11-09_
_source files: Google Sheet "Relocation planning", tab "WC appartment" (the shortlist) — registry entry in [external-sources](../../_meta/external-sources.md)_

Part of [relocation](README.md): finding the household's first US rental in Walnut Creek (ZIPs 94595–94598).

## Snapshot

- **The shortlist is the sheet.** One row per listing in the "WC appartment" tab of *Relocation planning*: area, address, title, **Stage**, **Next step**, **Visit**, starred, type, beds, price, sq ft, notes, link, availability, status, tour. **Stage** (a dropdown, 2026-11-09) is the one place a listing's state lives: To schedule (pink) · Planned (blue) · Visited (yellow) · Dismissed (grey) · empty; rows colour themselves from it. **Next step** says what to do and who; **Visit** holds the viewing's date and time ([map README](docs/walnut-creek-map/README.md)).
- **44 rows on 2026-11-08** (38 on 11-07): mostly 2–3 bedroom apartments at $2,395–3,600 a month; 20 rows have no beds filled in (sheet, 2026-11-08).
- **The [rental map](docs/walnut-creek-map/README.md)** (claude.ai artifact) shows every row with its middle-school zone, elementary and high school, and one of 32 neighborhood zones (housing mix, age, renter share). Filters combine: starred only, hide dismissed, stage, 2 or 3 beds. Each card has the four Stage buttons, ★ Star, and an editor for Visit, Next step and notes; the pins take their colour from Stage. Card edits show at once on every device and reach the sheet when Claude copies them over (`sync_edits.py`). These choices are saved in the map and show on every device but never change the sheet; a later change in the sheet (Stage, Starred box) takes over again ([README](docs/walnut-creek-map/README.md)).
- **Schools:** every listing but two maps to Walnut Creek SD → Walnut Creek Intermediate → Las Lomas High. 365 Masters Ct and Stoneridge Luxury Apartments (101 Hogan Ct) are Mt. Diablo USD: Bancroft Elementary, Foothill Middle, Northgate High ([map findings](docs/walnut-creek-map/README.md#findings-worth-knowing-2026-11-08-snapshot-44-rows)).
- **2425 Golden Rain Rd is inside Rossmoor**, whose rules bar residents under 18, so it doesn't fit the household ([map findings](docs/walnut-creek-map/README.md#findings-worth-knowing-2026-11-08-snapshot-44-rows)).

## Active threads

- **Tours and visits.** On 2026-11-06 Bridge at Walnut Creek (1435 Creekside Dr, $2,768) and Brio (161 N Civic Dr, $3,099) were toured and Oak & Iron (114 Sharene Ln, $2,665) requested (chat, 2026-11-07). By 11-08 six rows are yellow (visited): those three plus 1860 Almond Ave (on hold), 2720 Oak Rd Apt 133 and Villas at San Miguel. Starred: 2720 Oak Rd Apt 133, Villas at San Miguel, 1365 Mount Pisgah Rd, 1192 Walker Ave (sheet, 2026-11-08). Stage on 2026-11-09: Planned — 2696 Jones Rd Apt 3 (visit Mon 9 Nov 16:00), 2534 Jones Rd Unit 6, 1001 Harvey Dr; To schedule — Villas at San Miguel and 1365 Mount Pisgah Rd (Anya to call), castlewood apartments (call back), 538 Churchill Downs Ct (fill in the form with the green card); Visited — Bridge at WC, Brio, 1860 Almond Ave, Oak & Iron, 2720 Oak Rd Apt 133 (sheet, 2026-11-09). Owner: Mine.
- **Rental map.** Built 2026-11-07. On 2026-11-08 it gained the beds filter and planned-visit ticks, and now shows every row: rows without an address, the full price text ("Upon request", "2800-3167"), and a shared copy of the rows for views where the live Google Drive refresh can't run ([README](docs/walnut-creek-map/README.md)). The 5 addresses added since 11-07 are pinned along their block from Census address ranges, not yet checked against building outlines. Owner: Mine.

## People

-

## Decisions

-

## Open loops

- **Anya** — call Villas at San Miguel (price on request) and 1365 Mount Pisgah Rd (Next step "Ане позвонить", chat 2026-11-08).
- **Mine** — fill in the form with the green card for 538 Churchill Downs Ct; call back castlewood apartments (Next step in the sheet, chat 2026-11-09).
- **Mine** — on the first open of the [rental map](docs/walnut-creek-map/README.md), choose Continue on the Google Drive prompt so it reads the sheet live; the map's shared copy of the rows (what a phone without the connector shows) updates only from those live loads (chat, 2026-11-07; 2026-11-08).
- **Mine** — drop 2425 Golden Rain Rd (Rossmoor, no residents under 18) (chat, 2026-11-07).
- **Mine** — tidy the sheet: the 2720 Oak Rd Apt 133 row links to 2696 Jones Rd's Zillow page; 103 Sierra Dr (rows 14 and 30), 1192 Walker Ave (rows 16 and 40) and 1459 Creekside Dr (rows 10 and 11) appear twice; 20 rows have no beds, so the beds filter hides them ([map findings](docs/walnut-creek-map/README.md#findings-worth-knowing-2026-11-08-snapshot-44-rows)).

## Activity

- 2026-11-09 — [Visit column + card editor](docs/walnut-creek-map/README.md) — viewing date/time per listing (filled from the tour times and notes); the card edits Stage, Star, Visit, Next step and notes (chat, 2026-11-09).
- 2026-11-09 — [Stage and Next step columns](docs/walnut-creek-map/README.md) — the sheet now holds each listing's stage in one dropdown (rows colour themselves); the map reads it, the call notes and the green-card form moved into Next step, and the map's Planned ticks were folded in (chat, 2026-11-09).
- 2026-11-08 — [rental map update](docs/walnut-creek-map/README.md) — 2/3-bed filter, Planned visit / Like / Dislike on each listing, all 44 rows shown; a second Mt. Diablo USD listing (Stoneridge) surfaced (chat, 2026-11-08).
- 2026-11-07 — [Walnut Creek rental map](docs/walnut-creek-map/README.md) — map of the sheet with middle-school and neighborhood zones; flagged the Rossmoor listing and 365 Masters Ct (chat, 2026-11-07).
