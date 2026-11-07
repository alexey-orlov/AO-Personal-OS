# Walnut Creek rental map

Map of the apartment shortlist in the **"WC appartment"** tab of the *Relocation planning* Google Sheet
(`1PH4mTSafR9xAh68KjNQogvMtVsCH_WXsMdfq04Swwvs`, tab gid `2137535785`), with intermediate-school zones
and neighborhood zones as toggles.

**Live page:** https://claude.ai/artifact/4gcVpS15ZXKGQur5uAjSWf (private to Alex; share from its Share menu).

## How it works

- **Listings.** The page opens on a snapshot of the tab taken at build time, then reads the live sheet
  through the viewer's **Google Drive connector** (`download_file_content`, xlsx export, parsed in the page
  with SheetJS). The first open asks "This artifact uses connectors → Google Drive → Continue"; after that,
  page load and the **Refresh** button both pull the current rows. Columns are found by header name
  (address, title, Type, Beds, price, Sq.ft., notes, link, When available, Status, tour), so columns can
  move; extra unnamed columns show in the card (a phone number shows as "Contact").
- **Visit colours and stars (2026-11-07).** The page reads each row's highlight from the workbook's formatting:
  any yellow fill = **visited** (yellow pin), any blue fill = **planned** visit (blue pin); other colours are
  ignored. A location with both shows a half-yellow, half-blue pin. The **Starred** checkbox column puts a ★ on
  the pin (and on clusters holding a starred listing) while starred and unstarred listings are both on screen.
  Map options hold the filters: **Starred only** plus **All · Visited · Planned · Not yet**; they combine, and
  the list, pins and zone cards all follow them.
- **Pins.** The 34 addresses in the sheet on 2026-11-07 are pre-geocoded in `pipeline/geocode_cache.json`
  (OpenStreetMap building match where it agrees with the Census geocoder within 250 m, else the Census
  address-range point). A new address is placed in the page from Census TIGER/Line 2025 address ranges
  (`site/data/addr.json`). An address that still won't place is listed under the list; adding `lat` and
  `lng` columns to the sheet overrides any pin.
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

## Findings worth knowing (2026-11-07 snapshot)

- **2425 Golden Rain Rd is in Rossmoor**, an age-restricted community whose own rules bar residents under
  18 (rossmoor.com FAQ), so it doesn't fit a household with children. The map flags it.
- **365 Masters Ct is the only listing outside Walnut Creek SD**: Mt. Diablo USD (Bancroft Elementary,
  Foothill Middle, Northgate High). Every other listing maps to Walnut Creek Intermediate and Las Lomas High.
- Sheet hygiene: the "2720 Oak Rd Apt 133" row links to the Zillow page of 2696 Jones Rd; 103 Sierra Dr
  and 1459 Creekside Dr each appear twice.

## Rebuild

Needs a scratch work dir `W` (raw downloads, ~120 MB; never in the repo) and a venv with
`shapely<2.1 pyshp numpy openpyxl`. Use `python -I` for every script (downloads are untrusted data).

1. Sheet → `W/sheet/tab.csv` (gviz CSV export of gid 2137535785) and `W/sheet/wb.xlsx` (the `export?format=xlsx`
   workbook, for the row colours; it holds every private tab, so it stays in `W`); `make_geocode_batch.py`,
   Census batch geocoder (curl), `nominatim_check.py`, `check_points.py` → `W/build/geocode_cache.json`.
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
   `build_page.py W W/sheet/tab.csv <snapshot ms> W/sheet/wb.xlsx` → `W/build/site/`. Copy the site here and republish `site/index.html` to the URL above
   with `data/*.json` and `fonts/glyphs.json` as supporting files.

Local preview: `.claude/launch.json` → `wc-rental-map` serves `site/`; open `/preview.html` (the full
document; `index.html` is the artifact body without a doctype).

Sources and licences: OpenStreetMap contributors (ODbL), US Census Bureau (TIGER/Line, ACS), NCES EDGE,
district SchoolSite Locators (Davis Demographics), Noto Sans glyphs via protomaps basemaps-assets (OFL),
MapLibre GL JS 4.7.1, SheetJS 0.18.5.
