# Bay Area relocation ranking

Ranked comparison of Bay Area places to live, for a household with one child entering TK/Kindergarten
and one of middle/high-school age. Six equally-weighted criteria: crime and safety, schools, rent
cost, distance from downtown SF, ease of getting a free public school / TK seat, and how urban the
area is.

**Google Sheet:** https://docs.google.com/spreadsheets/d/1EaibAz0BCISjOyYDsIJCx6v_q6jW6cFDz-mD2dUxOYc/edit
— one tab, one table, 220 rows sorted by total score, every criterion filled.

**Map:** https://claude.ai/code/artifact/4174db4c-d08a-464e-8e19-3e18fce02ed4 — every place drawn
in its real boundary, shaded by score, switchable to any single criterion.

Superseded Sheets: `1HiSmOvkFYEFvI31Pvsp7xWGYtrfPHiwdGqd-bXcOHXk` (the old four-tab split) and
`1PuVMIdO7yx9IwEDgyM9iBqA46fl9j1Qb-vcVdNjVFQY` (before the small-place cells were filled).

## The deliverable

`bay-area-ranking.csv` — **one table**, one row per place, sorted by total score. All 220 places
(41 SF Analysis Neighborhoods + 100 incorporated cities and towns + 79 unincorporated communities)
with every data point in the same row: the six criterion scores, 2BR and 3BR median rent, sub-$4,000
supply, violent and property crime per 1,000, elementary and middle/high school district with their
CAASPP results, drive time, urbanicity, population, district enrolment trend, assignment system and
TK capacity, plus per-row sources and notes.

All 216 residential places are ranked. Where a place is too small for any publisher to report its
rent, crime or school data, the cell is borrowed from the nearest larger place it sits beside —
never from a county average — and the row says so: **Data basis** reads `Approximated` and
**Approximated from** names the donor. 159 rows are measured throughout; 57 borrow at least one
figure. The four parkland rows stay unranked.

## Files
- `bay-area-ranking.csv` — **the table**. Start here.
- `bay-area-map.html` — the choropleth (self-contained; generated, not hand-written).
- `methodology.md` — place list, per-criterion sources and rubric, known limitations, and
  section 0 on what is complete.
- `pipeline/` — re-runnable code:
  - `places.py` — the 220-place backbone
  - `geo.py` — drive-time model + urbanicity
  - `caaspp.py` — district school results and enrolment trend from the CAASPP research files
  - `sf_crime.py` — SF neighbourhood crime from SFPD incident data, calibrated
  - `single_table.py` — scoring and the single-table build
  - `merge_research.py` — folds a research fan-out into `research.json` field by field
  - `build_map.py` / `build_map_page.py` — boundary fetch + match, and the map page generator
  - `test_scoring.py` — regression tests for the bugs that previously shipped
  - `extract_policy.py` — pulls district assignment / TK findings into `district-policy.json`
  - `research.json` — collected figures with per-value source attribution
  - `district-policy.json` — per-district assignment system and TK capacity, with sources
  - `sf-crime-counts.json` — cached SFPD incident counts by Analysis Neighborhood
  - `fetch_caaspp.sh` — re-downloads the CAASPP files (gitignored: ~45 MB, published and immutable)

The Google Sheet carries the same 220 rows and every criterion, with the long provenance columns
condensed (`Assign`/`TK` as short labels, prose notes dropped). `bay-area-ranking.csv` in this
folder is the full-fidelity version — per-row sources, the reasoning behind each capacity score,
and the collection notes for every figure.

## Status
Complete. All six criteria are measured for the great majority of places; the rest carry an explicit
reason for each blank. Schools, enrolment trend and San Francisco crime now come from primary bulk
sources (CDE CAASPP, DataSF SFPD incidents) rather than scraped aggregator ratings.

Superseded and removed: `sf-neighbourhood-ranking.csv`, `all-220-places.csv` and
`bay-area-relocation.xlsx` — the split between a finished San Francisco tab and an unscored
all-places tab existed only because San Francisco was the only part with enough data to rank.
