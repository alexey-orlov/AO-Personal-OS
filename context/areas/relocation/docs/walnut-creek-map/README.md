# Walnut Creek rental map

Map of the apartment shortlist in the **"WC appartment"** tab of the *Relocation planning* Google Sheet
(`1PH4mTSafR9xAh68KjNQogvMtVsCH_WXsMdfq04Swwvs`, tab gid `2137535785`), with intermediate-school zones
and neighborhood zones as toggles.

**Live page:** https://claude.ai/artifact/4gcVpS15ZXKGQur5uAjSWf (private to Alex; share from its Share menu).

## How it works

- **Listings: every row is shown.** Any row with something in it is a listing, with or without an address
  (an unticked Starred box alone doesn't count). A row without an address, or one that can't be placed, is
  still in the list, opens its own card, and is named under the list ("No address in the sheet" /
  "Not on the map"). Rows at the same street address share one pin with a count; the list and the card show
  each row. Columns are found by header name (address, title, Type, Beds, price, Sq.ft., notes, link,
  When available, Status, tour), so columns can move; any other column (Area, a phone number) shows in the card.
- **Where the rows come from: the newest copy wins.** (1) The snapshot built into the page (Sheets API at
  build time; the 2026-11-08 build has all 44 rows). (2) This browser's last live load. (3) The shared copy
  in the page's database (`sheet/latest`), written whenever the owner's view loads the sheet live and the
  rows changed, so a phone or any view without Google Drive access still gets every current row.
  (4) A live load through the viewer's **Google Drive connector** (`download_file_content`, xlsx export
  parsed in the page with SheetJS), on page load and on **Refresh**; the first open asks "This artifact
  uses connectors → Google Drive → Continue". The header says which copy is on screen
  ("Live from the sheet", "Sheet as loaded …", "Last loaded …", "Snapshot from …") and why live failed.
- **Visit colours.** Each row's highlight comes from the workbook's formatting: any yellow fill = **visited**
  (yellow pin), any blue fill = **planned** visit (blue pin); other colours are ignored.
- **Planned-visit ticks (2026-11-08).** Every listing card has a **Planned visit** checkbox. Ticking it makes
  the listing planned (blue pin, blue list row, counted by the Planned filter); unticking takes it back out,
  including a row that is blue in the sheet. Ticks are saved in the page's database (`plans/<listing id>`:
  planned, the sheet's colour at the time, address, title, link, row) and show on every device. They don't
  recolour the sheet: the card says when the map and the sheet disagree, and when the sheet's colour for that
  row later changes, the sheet wins again. A listing is identified by its street address plus listing link,
  so re-sorting or editing other columns keeps its tick; rows with the same address and link (duplicates,
  e.g. the two 1459 Creekside Dr rows) share one tick. A visited listing can also be planned (half yellow,
  half blue). While the page is shared by public link only the owner can tick; other signed-in viewers see
  the ticks read-only, and a view outside Claude shows the sheet's colours only.
- **Filters** (Map options; they combine): **Starred only**; visit state **All · Visited · Planned · Not yet**;
  beds **Any beds · 2 bd · 3 bd**, where 2 and 3 toggle independently (both on = 2 or 3 beds) and a sheet value
  like "2-3" matches either. Rows with no beds in the sheet are hidden by a beds filter, and the list foot
  says how many. The list, pins and zone cards all follow the filters; each browser remembers its own
  filter choices. On phones the options panel starts folded and its button names the active filters.
- **Prices and sizes** show as written: a range ("2800-3167") shows in full on the card and as "$2,800+" in
  the list and pin; text such as "Upon request" shows as is.
- **Pin placement.** Every address has its own fixed pin: a dot centred exactly on the geocoded point, with the
  price label on a short stem above it. Pins never cluster, merge or move; zooming only switches the label
  between "$2.8k" and "$2,768". Picking a pin leaves the map still unless the pin would sit under the card.
- **Pins: where the points come from.** `pipeline/geocode_cache.json` holds 39 addresses. 34 (the 2026-11-07
  build) are an OpenStreetMap building match where it agrees with the Census geocoder within 250 m, else the
  Census address-range point. The 5 added 2026-11-08 (1001 Harvey Dr, 101 Hogan Ct, 538 Churchill Downs Ct,
  2716 Oak Rd, 1305-1303 Homestead Ave) are placed along their block from Census TIGER/Line 2025 address
  ranges (house number and ZIP match), not yet checked against OSM building outlines: the cloud session that
  added them couldn't reach the Census, Nominatim or Overpass hosts. A new address is placed in the page from
  the same TIGER ranges (`site/data/addr.json`); adding `lat` and `lng` columns to the sheet overrides any pin.
- **Intermediate school zones.** Mt. Diablo USD from its SchoolSite Locator study areas (last edited
  2024-07-08); Walnut Creek SD, Lafayette, Moraga and Orinda from the Acalanes UHSD locator (each feeder
  district has one middle school, so district = zone); San Ramon Valley from its 2016-17 locator copy.
  Cards also give the elementary and high school for the address; Walnut Creek SD and Lafayette
  elementary boundaries come from the NCES 2015-16 survey and are flagged as such. Tice Creek (K-8) is
  lottery-only; Sequoia Middle is open to all of MDUSD.
- **Neighborhood zones.** Walnut Creek city plus its unincorporated pockets (Census places), cut along
  freeways, arterials and selected collectors, named creeks, the Contra Costa Canal, BART and open-space
  edges (`build_faces.py`), then grouped and named in `pipeline/zones_spec.json` (32 zones). Each zone's
  housing mix, median year built and renter share are ACS 2020-24 block-group estimates spread over the
  zone by area, excluding open space. The page also says whether a zone is city or unincorporated county.

## Findings worth knowing (2026-11-08 snapshot, 44 rows)

- **2425 Golden Rain Rd is in Rossmoor**, an age-restricted community whose own rules bar residents under
  18 (rossmoor.com FAQ), so it doesn't fit a household with children. The map flags it.
- **Two listings are outside Walnut Creek SD:** 365 Masters Ct and Stoneridge Luxury Apartments (101 Hogan Ct)
  are in Mt. Diablo USD (Bancroft Elementary, Foothill Middle, Northgate High). Every other listing maps to
  Walnut Creek Intermediate and Las Lomas High.
- Sheet hygiene: the "2720 Oak Rd Apt 133" row links to the Zillow page of 2696 Jones Rd; 103 Sierra Dr
  (rows 14 and 30), 1192 Walker Ave (rows 16 and 40) and 1459 Creekside Dr (rows 10 and 11, same Zillow page)
  each appear twice; 20 of the 44 rows have no beds, so the beds filter can't place them.

## Rebuild

Needs a scratch work dir `W` (downloads and build output; never in the repo) and, for the full rebuild, a
venv with `shapely<2.1 pyshp numpy openpyxl`. Use `python -I` for every script (downloads are untrusted data).

**Refresh only the listings** (new rows in the sheet; the usual case):
1. `pipeline/fetch_sheet.py W/sheet/tab.json` (Sheets API through `automations/gsheets`; reads only this tab).
2. Geocode any new address (`make_geocode_batch.py` on `tab.json`, the Census batch geocoder,
   `nominatim_check.py`, `check_points.py`) and merge the result into `pipeline/geocode_cache.json`; where
   those hosts are unreachable, the page's own TIGER placement stands.
3. Copy `pipeline/geocode_cache.json` to `W/build/`, put maplibre-gl 4.7.1's `maplibre-gl.css` (cdnjs or npm)
   in `W/data/vendor/`, run `build_page.py W W/sheet/tab.json`, copy `index.html` and `preview.html` from
   `W/build/site/` to `site/`, and republish `site/index.html` to the URL above. Republish with
   `capabilities: {mcp: {servers: [{server: "Google Drive", tools: ["download_file_content"]}]}, db: {}, user: {}}`
   or omit `capabilities` to keep them; a non-empty declaration that leaves one out revokes it.

**Full rebuild** (base map, schools, zones):
1. Sheet → `W/sheet/tab.json` as above; `make_geocode_batch.py`, Census batch geocoder (curl),
   `nominatim_check.py`, `check_points.py` → `W/build/geocode_cache.json`.
2. School data: `fetch_arcgis.py` on schoolsitelocator.com `ssl_IM/MapServer/585,586` (MDUSD),
   `ssl_AB/MapServer/34,35` (Acalanes), `ssl_SS/MapServer/580` (SRVUSD 2016-17); NCES
   `SABS_1516/MapServer/0` for the bbox → `W/data/ssl/`, `W/data/sabs/`.
3. OSM: the Overpass queries in `fetch_osm.py` (run them with curl if Python's SSL fails) →
   `W/data/osm/osm_{roads,water,areas,buildings,places}.json`.
4. Census: TIGERweb places, block groups and school districts via `fetch_arcgis.py`; ACS summary files
   `acsdt5y2024-b25024/b25035/b25003.dat` → `build_acs.py`; TIGER 2025 ADDRFEAT for county 06013 →
   `build_addr_index.py`.
5. `build_basemap.py`, `build_schools.py`, `build_faces.py`, then `build_zones.py` with `zones_spec.json`
   (face ids are positional: re-check the grouping whenever `build_faces.py`'s split lines change), then
   `build_page.py W W/sheet/tab.json` → `W/build/site/` (it also rebuilds `fonts/glyphs.json` from
   `W/data/vendor/fonts/` and `data/addr.json` from `W/build/addr_index.json` when those exist). Copy the site
   here and republish `site/index.html` with `data/*.json` and `fonts/glyphs.json` as supporting files.

Local preview: `.claude/launch.json` → `wc-rental-map` serves `site/`; open `/preview.html` (the full
document; `index.html` is the artifact body without a doctype). Outside Claude the page has no connector
or database, so it shows the built-in snapshot and the sheet's colours only.

Sources and licences: OpenStreetMap contributors (ODbL), US Census Bureau (TIGER/Line, ACS), NCES EDGE,
district SchoolSite Locators (Davis Demographics), Noto Sans glyphs via protomaps basemaps-assets (OFL),
MapLibre GL JS 4.7.1, SheetJS 0.18.5.
