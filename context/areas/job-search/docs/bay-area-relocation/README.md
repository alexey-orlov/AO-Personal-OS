# Bay Area relocation ranking

Ranked comparison of Bay Area places to live, for a household with one child entering TK/Kindergarten
and one of middle/high-school age. Six equally-weighted criteria: safety, schools, rent cost,
distance from downtown SF, ease of getting a public school / TK seat, and how urban the area is.

**Google Sheet:** https://docs.google.com/spreadsheets/d/1HiSmOvkFYEFvI31Pvsp7xWGYtrfPHiwdGqd-bXcOHXk/edit

## Files
- `methodology.md` — place list, per-criterion evaluation strategy, and **section 0: what is finished
  and what is not**. Read section 0 first.
- `sf-neighbourhood-ranking.csv` — the completed piece: 25 SF neighbourhoods fully scored, 12 more
  with partial data.
- `all-220-places.csv` — every SF neighbourhood + every Bay Area city/town/CDP, with drive time and
  urban rank computed for all of them and a `Data status` column.
- `bay-area-relocation.xlsx` — the same, as a 4-tab workbook.
- `pipeline/` — the code that produced it (place backbone, drive-time model, scoring, exporters) plus
  `research-raw.json`, the raw agent output with per-figure source attribution. Re-runnable.

## Status (2026-08-09)
Complete for San Francisco. The rest of the Bay Area has drive time and urbanicity for every row but
no rent/crime/school data: the session's 200-search cap was consumed before the fan-out reached those
places. Unmeasured cells are left blank on purpose, never imputed. See methodology section 0 for the
cheapest path to finishing.
