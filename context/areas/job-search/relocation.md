# US relocation — where to live

_status: active — Bay Area place ranking complete (220 places scored); visa timing tentatively Sep–Oct 2026, no place chosen yet_
_updated: 2026-08-12_

The practical other half of the US job search: once the move is real, which Bay Area place the household actually lands in. Positioning implications (SF-based framing, never mention Kyiv) live in [positioning.md](positioning.md) — this page is the logistics thread.

## Snapshot

- **Household assumption driving the whole model:** one child entering TK/Kindergarten, one of middle/high-school age. School access is therefore weighted as heavily as cost, and "can we actually get a free public seat" is its own criterion rather than a footnote.
- **Six equally-weighted criteria:** crime & safety · schools · rent cost · distance from downtown SF · ease of getting a free public school / TK seat · how urban the area is.
- **Coverage:** 220 places — 41 SF Analysis Neighborhoods, 84 cities, 16 towns, 79 unincorporated communities. 216 residential places ranked; 4 parkland rows deliberately unranked.
- **Data honesty is built into the table:** 159 rows are measured throughout; 57 borrow at least one figure from the nearest larger place they sit beside (never a county average), and say so in-row — `Data basis: Approximated` plus a named donor place.
- Schools, enrolment trend, and SF crime come from primary bulk sources (CDE CAASPP, DataSF SFPD incidents), not scraped aggregator ratings — the earlier aggregator-based version was replaced for this reason.

## Result

Top of the table (score /100, all six criteria): **Moraga 72.7** · Alamo 69.3 · Strawberry 68.0 · Broadmoor 67.5 · Hillsborough 67.2 · Orinda 67.2 · Danville 65.8 · Sleepy Hollow 65.8 · Tamalpais-Homestead Valley 65.7 · Sunol 65.4 · San Ramon 65.0 · Diablo 64.3.

The head of the ranking is dominated by **Contra Costa** (the Lamorinda / San Ramon valley cluster) and **Marin** — the equal weighting lets strong schools and low crime outweigh both rent and the SF commute. Anyone reading this as a recommendation should re-weight first: shifting weight onto "close to SF" or "rent cost" reorders the top ten substantially, which is exactly what the per-criterion map view is for.

## Deliverables

- **[bay-area-ranking.csv](docs/bay-area-relocation/bay-area-ranking.csv)** — the full-fidelity table (37 columns, 220 rows): six criterion scores, 2BR/3BR median rent and sub-$4,000 supply, violent/property crime per 1k, elementary and middle/high district with CAASPP results, drive time, urbanicity, population, enrolment trend, assignment system and TK capacity, plus per-row sources and notes. **Start here.**
- **Google Sheet** — https://docs.google.com/spreadsheets/d/1EaibAz0BCISjOyYDsIJCx6v_q6jW6cFDz-mD2dUxOYc/edit — same 220 rows, long provenance columns condensed. The shareable/browsable copy.
- **Map** — https://claude.ai/code/artifact/4174db4c-d08a-464e-8e19-3e18fce02ed4 — every place in its real boundary, shaded by total score, switchable to any single criterion.
- **[methodology.md](docs/bay-area-relocation/methodology.md)** — place list, per-criterion sources and rubric, known limitations.
- **[pipeline/](docs/bay-area-relocation/pipeline/)** — re-runnable code (place backbone, drive-time model, CAASPP + SFPD ingestion, scoring, map build, regression tests). The ranking can be rebuilt or re-weighted rather than redone by hand.

Superseded, kept only as a pointer: Sheets `1HiSmOvkFYEFvI31Pvsp7xWGYtrfPHiwdGqd-bXcOHXk` (old four-tab split) and `1PuVMIdO7yx9IwEDgyM9iBqA46fl9j1Qb-vcVdNjVFQY` (before small-place cells were filled).

## Open loops

- **Mine** — no place chosen; the ranking is decision *input*, not a decision. Natural next step when the move firms up: re-run the scoring with Alex's own criterion weights (the pipeline supports it) rather than accepting the equal-weight default.
- **Mine** — visa timing tentatively Sep–Oct 2026 (per a SoftServe 1:1); relocation planning stays provisional until that date is real.

## Activity

- 2026-08-12 — folded into the wiki — the deliverable had been sitting in `docs/` since 2026-08-09 with no wiki entry (chat, 2026-08-12).
- 2026-08-09 — [ranking + map complete](docs/bay-area-relocation/README.md) — built and finished in one day (6 commits): 220-place framework → one uniform table with all six criteria measured → small-place blanks filled from parent areas → map gained real boundaries, per-criterion filters, click-to-pin. Sheet published same day as "Bay Area relocation ranking — complete (2026-08-09 v2)".
