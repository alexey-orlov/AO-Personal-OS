# Relocation — moving the household to the US

_status: active — Bay Area place ranking complete (220 places scored, 2026-08-09); visa timing tentatively Sep–Oct 2026; no place chosen. **October logistics now on SoftServe's agenda** — a dedicated meeting is being set to settle location, cost and the base-vs-quarterly-bonus split_
_updated: 2026-08-18_

The move itself: visa timing, where the household lands, schools, and the logistics around them. Distinct from the [job search](../job-search/README.md) — that area owns roles and how Alex is positioned (including the SF-based public framing); this one owns the physical move. The two share a dependency in both directions (an offer's location can constrain the place; the visa date gates when a start date is real) but they are not the same thread.

## Snapshot

- **Household shape drives every decision:** one child entering TK/Kindergarten, one of middle/high-school age. School access is weighted as heavily as cost, and "can we actually get a free public seat" is treated as its own criterion rather than a footnote.
- **Visa:** tentatively Sep–Oct 2026 (per a SoftServe 1:1). Everything downstream stays provisional until that date firms up. Green card is in final administrative processing — sensitive framing rules live in [job-search/positioning.md](../job-search/positioning.md), never restated here.
- **Target geography:** Bay Area. A full ranking exists (below); no place has been chosen.

## Active threads

- **October logistics with SoftServe — a dedicated meeting, not a 1:1 topic (2026-08-18).** The move's employer-facing side came up in Alex's [SoftServe 1:1](../softserve/calls/2026-08-18_141300_one-on-one_20260818132936005C1280.md) and was deliberately split out into its own session, to be held **before Bohdan's Friday 07:30 meeting**. Four things to settle: **location · cost · expectations · impact framing**, plus the **split between base and quarterly bonus** in the post-move compensation shape. Alex sends the invite and prepares the inputs; **Bohdan prepares the internal argumentation/justification for the relocation costs** ahead of that Friday meeting. Related: US replication of SoftServe's managed-service offering is floated as possibly tied to the move ([jumpstart-pm](../softserve/jumpstart-pm.md)), and full-time SoftServe employment stays "possible after the US move" ([softserve](../softserve/README.md)). Owner: Mine (invite + inputs) / Theirs (cost case).
- **Where to live — ranking done, decision open.** The 220-place Bay Area comparison is complete and re-runnable. Next natural step when the move firms up: re-score with Alex's own criterion weights rather than accepting the equal-weight default — the pipeline supports it. Owner: Mine.
- **Visa timing.** Waiting on the Sep–Oct 2026 window to become concrete. Owner: Theirs (processing), then Mine.

## The Bay Area ranking

Six equally-weighted criteria: crime & safety · schools · rent cost · distance from downtown SF · ease of getting a free public school / TK seat · how urban the area is.

**Coverage:** 220 places — 41 SF Analysis Neighborhoods, 84 cities, 16 towns, 79 unincorporated communities. 216 residential places ranked; 4 parkland rows deliberately unranked.

**Result** (score /100): **Moraga 72.7** · Alamo 69.3 · Strawberry 68.0 · Broadmoor 67.5 · Hillsborough 67.2 · Orinda 67.2 · Danville 65.8 · Sleepy Hollow 65.8 · Tamalpais-Homestead Valley 65.7 · Sunol 65.4 · San Ramon 65.0 · Diablo 64.3.

The head of the table is dominated by **Contra Costa** (the Lamorinda / San Ramon valley cluster) and **Marin** — equal weighting lets strong schools and low crime outweigh both rent and the SF commute. Read it as input, not a recommendation: shifting weight onto "close to SF" or "rent cost" reorders the top ten substantially, which is what the per-criterion map view is for.

**Data honesty is built in:** 159 rows are measured throughout; 57 borrow at least one figure from the nearest larger place they sit beside (never a county average) and say so in-row — `Data basis: Approximated` plus a named donor. Schools, enrolment trend, and SF crime come from primary bulk sources (CDE CAASPP, DataSF SFPD incidents), not scraped aggregator ratings; the earlier aggregator-based version was replaced for that reason.

**Deliverables:**
- **[bay-area-ranking.csv](docs/bay-area-relocation/bay-area-ranking.csv)** — the full-fidelity table (37 columns × 220 rows): six criterion scores, 2BR/3BR median rent and sub-$4,000 supply, violent/property crime per 1k, elementary and middle/high district with CAASPP results, drive time, urbanicity, population, enrolment trend, assignment system and TK capacity, plus per-row sources. **Start here.**
- **Google Sheet** — https://docs.google.com/spreadsheets/d/1EaibAz0BCISjOyYDsIJCx6v_q6jW6cFDz-mD2dUxOYc/edit — "Bay Area relocation ranking — complete (2026-08-09 v2)"; same 220 rows, provenance columns condensed. The browsable copy.
- **Map** — https://claude.ai/code/artifact/4174db4c-d08a-464e-8e19-3e18fce02ed4 — every place in its real boundary, shaded by total score, switchable to any single criterion.
- **[methodology.md](docs/bay-area-relocation/methodology.md)** — place list, per-criterion sources and rubric, known limitations.
- **[pipeline/](docs/bay-area-relocation/pipeline/)** — re-runnable code (place backbone, drive-time model, CAASPP + SFPD ingestion, scoring, map build, regression tests), so the ranking can be re-weighted rather than redone.

Superseded, kept only as pointers: Sheets `1HiSmOvkFYEFvI31Pvsp7xWGYtrfPHiwdGqd-bXcOHXk` (old four-tab split) and `1PuVMIdO7yx9IwEDgyM9iBqA46fl9j1Qb-vcVdNjVFQY` (before small-place cells were filled).

## People

- Bohdan Khomych — SoftServe engagement lead; owns the internal cost justification for the October move → [people page](../../people/bohdan-khomych.md).

## Decisions

- 2026-08-12 — **Relocation is its own area**, not a job-search subproject: the move has its own goal, timeline, and criteria, and only touches the job search at the edges (Alex, chat, 2026-08-12).
- 2026-08-09 — Ranking scores all 220 places on **six equal weights** rather than picking a favoured criterion, and fills small-place gaps from the **nearest larger place** rather than a county average — both choices recorded in-row so a re-weighting can undo them ([methodology](docs/bay-area-relocation/methodology.md)).

## Open loops

- **Mine** — send the calendar invite for the dedicated SoftServe relocation/logistics meeting (before Bohdan's Friday 07:30 call) and prepare the inputs: location, cost, expectations, impact framing.
- **Theirs (Bohdan)** — prepare the argumentation/justification for the October relocation costs ahead of that meeting.
- **Mine** — no place chosen; the ranking is decision input. Re-run the scoring with Alex's own weights when the move firms up.
- **Mine** — visa timing tentatively Sep–Oct 2026; relocation planning stays provisional until that date is real.

## Activity

- 2026-08-18 — [October logistics split into its own SoftServe meeting](../softserve/calls/2026-08-18_141300_one-on-one_20260818132936005C1280.md) — location, cost, expectations, impact framing and the base-vs-quarterly-bonus split to be settled before Bohdan's Friday 07:30 call; Alex sends the invite, Bohdan prepares the internal cost case.
- 2026-08-12 — area created and the ranking folded in — the deliverable had been sitting in `docs/` since 2026-08-09 with no wiki entry (chat, 2026-08-12).
- 2026-08-09 — [ranking + map complete](docs/bay-area-relocation/README.md) — built and finished in one day (6 commits): 220-place framework → one uniform table with all six criteria measured → small-place blanks filled from parent areas → map gained real boundaries, per-criterion filters, click-to-pin.
