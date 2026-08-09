# Bay Area relocation ranking — method

Companion to `bay-area-ranking.csv` and the Google Sheet. Household assumption: two children, one
entering Transitional Kindergarten / Kindergarten, one of middle/high-school age.

---

## 0. STATUS

**One table.** Every place — all 41 San Francisco Analysis Neighborhoods, all 100 other
incorporated Bay Area cities and towns, and 79 unincorporated communities — sits in a single
sorted table, scored on the same six criteria against the same population. The earlier split into
a finished San Francisco tab plus a separate all-places tab is gone: it existed only because
San Francisco was the only part with enough measured data to rank, and that is no longer true.

| | Status |
|---|---|
| Place list (220 places) | **Complete** |
| Drive time to SF, all 220 | **Complete** — modelled, mean absolute error 1.2 min vs 81 anchors |
| Urbanicity, all 220 | **Complete** — computed |
| Schools (elementary + middle/high) | **Complete for every district** — CAASPP 2025, primary source |
| School / TK capacity | Enrolment trend complete for every district; assignment system and TK capacity researched per district |
| Rent (2BR + 3BR) | Measured where a rental market exists and a publisher covers it |
| Crime (violent + property) | Measured for every incorporated place and every SF neighbourhood |

**Measured first, borrowed only where nothing exists.** No cell is ever filled from a county
average or a global median. But a 1,100-person unincorporated community genuinely has no rental
market, no police department and no school district of its own, so no publisher reports figures
for it — and a single missing input cascades: no rent → no supply band → no rent score → no total
→ no rank. Rather than leave those rows blank, each missing cell is taken from the **nearest
larger place it sits beside**, and every borrowed cell is labelled: **Data basis** reads
`Approximated` and **Approximated from** names the donor (Sunol ← Pleasanton, Diablo ← Danville,
Marin City ← Sausalito). 159 of 216 rows are measured throughout; 57 borrow at least one figure.
The two can always be told apart, so the ranking can be read either way.

### What changed since the first run, and why

The first run was capped at 200 web searches and had direct HTTP blocked, so it measured only 45
of 220 places and had to leave the wider Bay Area unranked. In this environment page fetching
works, which changed the approach at the root: instead of scraping a rating per place through
search results, three of the six criteria now come from **primary bulk sources**.

| Criterion | Was | Now |
|---|---|---|
| Schools | GreatSchools/Niche grades for ~24 districts, one blended number | **CAASPP 2025 research files** — every California district, split into an elementary band and a middle/high band |
| SF neighbourhood crime | Aggregator pages, which 404 for most SF neighbourhoods | **SFPD incident reports via DataSF**, tagged with the same Analysis Neighborhood geography, calibrated onto the aggregator scale |
| Enrolment trend | A word ("declining") where an agent found one | **Computed** from CAASPP tested-grade enrolment, 2023 vs 2025, every district |

---

## 1. The place list (220 places)

| Segment | Count | Basis |
|---|---|---|
| San Francisco neighbourhoods | 41 | SF Planning **Analysis Neighborhoods** — the city's official, exhaustive, non-overlapping taxonomy |
| Incorporated cities and towns | 100 | Every incorporated Bay Area municipality except San Francisco itself |
| Unincorporated communities (CDPs) | 79 | Census-designated places ~1,000+ residents, plus a few well-known smaller coastal/rural villages |

**Why the 41 Analysis Neighborhoods and not a realtor list.** Realtor-style lists ("Cow Hollow",
"Dogpatch", "NoPa") overlap each other and leave gaps, so rows would double-count and no criterion
could be computed consistently. The Analysis Neighborhoods tile the whole city exactly once, and
they are the geography SFPD incident data and the city's ACS profiles are published on — which is
what makes per-neighbourhood crime figures possible at all.

Four SF rows (Golden Gate Park, Lincoln Park, McLaren Park, the Presidio) are parkland with
negligible housing. They are kept for completeness but excluded from the ranking: a handful of
residents underneath a park-wide incident count produces a crime rate that looks real and is not.

**Coverage boundary, stated honestly:** unincorporated hamlets below ~1,000 residents are largely
excluded (Nicasio, Tomales, Muir Beach, Loma Mar, Princeton-by-the-Sea, Oakville, Rutherford).
They have no rental market, no school of their own and no published crime rate. A handful of
well-known ones (Stinson Beach, Point Reyes Station, Pescadero, La Honda, Geyserville) are kept as
reference markers for the rural end of the scale.

---

## 2. The six criteria

Six criteria, each **equally weighted at 1/6**, each converted to a **0-100 percentile rank within
the ranked population** before averaging. Percentile ranking rather than raw values is what makes
"equal weight" actually equal: it gives every criterion the same 0-100 spread, so a criterion with
a long tail — rent, or drive time — cannot silently dominate the total.

### 2.1 Crime and safety
- **Metric:** violent crime per 1,000 residents (65% of the criterion) and property crime per
  1,000 (35%), both inverted. Violent crime is weighted higher because it is what a relocating
  family actually decides on.
- **Cities and unincorporated communities:** CrimeGrade, taking violent and property from that
  same publisher so the two components are on one scale.
- **San Francisco neighbourhoods:** computed from **SFPD incident reports** (DataSF dataset
  `wg3w-h783`), most recent complete 12 months, counting FBI Part I categories — violent =
  assault, robbery, homicide, rape; property = larceny theft, motor vehicle theft, burglary,
  arson — divided by neighbourhood population.
- **The calibration, which matters.** SFPD's "Assault" category includes simple assault, which the
  FBI violent-crime definition excludes, so a raw SFPD-derived rate is *not* on the same scale as
  a CrimeGrade rate. Ranking them against each other unadjusted would make every San Francisco
  neighbourhood look more violent than it is, purely from a definitional difference. So the SFPD
  rates are put onto the CrimeGrade scale using the median ratio between the two sources measured
  across the neighbourhoods where both exist. The factors and the overlap size are printed by
  `pipeline/sf_crime.py` and recorded in the Sources column.
- **Known limitation:** any rate normalised by *residential* population overstates risk in a place
  with a large daytime or visitor population relative to residents. The Financial District,
  South of Market and the Tenderloin are the clearest cases in this table. This affects the
  aggregators identically; it is a property of the measure, not of the source.

### 2.2 Schools
- **Metric:** percent of students **meeting or exceeding standard** on CAASPP 2025, averaged
  across ELA and Math, enrolment-weighted across grades, computed separately for two bands:
  - **Elementary** = grades 3, 4, 5
  - **Middle/high** = grades 6, 7, 8, 11
  The two bands are then averaged, because the household has a child at each end.
- **Source:** California Department of Education CAASPP research files (`sb_ca2025_1_csv_v1`),
  the primary dataset underneath most published school ratings. Downloaded in bulk, so every
  district is covered on identical methodology.
- **The 1-10 rating column** is the district's decile against *all* California districts, provided
  because a "7/10" is easier to read than "49.13% met standard". The ranking uses the underlying
  percentage, not the rounded decile.
- **Where a place is served by two districts** — a K-8 elementary district plus a separate union
  high district, which is the common California pattern — the elementary band comes from the
  elementary district and the middle/high band from the high district. A single unified district
  supplies both.
- **Resolution limit:** ratings are at **district** level. Inside a large district (San Francisco
  Unified, Oakland Unified, San Jose Unified) individual schools vary far more than districts do.
  Read this column as "what district would you be in", not "what school will your child attend".
  Several places are also split between districts by address — Menlo Park, San Bruno and Daly City
  are flagged in Notes.

### 2.3 Cost of rental
- **Metric:** median 2BR rent and median 3BR rent, averaged, inverted so cheaper scores higher.
- **Source:** Zumper primarily, RentCafe as fallback — **both bedroom figures always from the same
  publisher and the same page.** This rule is load-bearing: publisher-to-publisher variance (~40%)
  is larger than the real 2BR→3BR bedroom premium, so mixing sources produces rows where the 3BR
  is cheaper than the 2BR, which is not a real market fact. In the first run this corrupted a
  string of rows (Noe Valley's 3BR was $4,693 on one site and $6,695 on another).
- **Bedroom-mix correction.** Where only one bedroom count exists, it is converted to its
  counterpart at the premium learned from the same-publisher pairs, so every place is compared on
  the same basis. Without this, a place with only a 2BR figure looks systematically cheaper than
  an identical place that happens to have both. Converted cells say so in Sources.
- **Sub-$4,000 supply.** Live listing counts turned out to be unusable: the listing sites cap a
  results page at 25 and report that cap as the count, and explicitly price-filtered pages are not
  indexed. So the share of stock below $4,000 is **modelled** from the market's median under a
  log-normal (sigma 0.28) and reported both as a percentage and as a coarse band
  (Plenty / Some / Few / Very few / Almost none). **Trust the band, not the point estimate.**

### 2.4 Distance from SF city centre
- **Metric:** typical **off-peak** driving minutes to the Ferry Building, plus straight-line miles.
- **Method:** no routing service is reachable, so drive time is **modelled**: within each of 15
  corridors, time is fitted as a linear function of great-circle distance, `t = a + b·d`. The
  intercept absorbs that corridor's fixed cost (Bay Bridge, Caldecott, Golden Gate approach,
  downtown surface streets) and the slope its effective speed.
- **Calibration:** least-squares against 81 anchor trips of well-established duration.
  **Mean absolute error 1.2 minutes.** Spot-checked independently: Palo Alto (33 mi, 38-45 min
  published vs 38 modelled), San Rafael (18.6 mi, 26-38 vs 30), Walnut Creek (24 mi, 30-45 vs 35).
- **Explicitly not modelled: rush hour.** Peak times diverge enormously by corridor — East Bay
  bridge approaches and the 101 Peninsula run degrade far more than a Marin or inner-SF trip. A
  place that looks close here can be a punishing weekday commute.

### 2.5 Ease of getting a free public school / TK place
This criterion means **capacity** — can you actually get a seat — not school quality, which is
criterion 2.2. Scored from three signals, because capacity is not a published number:
1. **Enrolment trend** sets the base. Declining enrolment means empty seats. Computed for every
   district from CAASPP tested-grade enrolment, 2023 vs 2025.
2. **Assignment system.** A strict address-based attendance boundary means your address
   effectively guarantees a seat (**+8**). A choice lottery means it does not (**-18**) — the
   biggest single swing in the rubric, and the reason San Francisco scores poorly here despite
   having thousands of empty seats.
3. **TK capacity.** California has completed its universal-TK rollout, so *offering* TK is not a
   discriminating fact. What discriminates is whether TK space runs out: waitlist or TK lottery
   (**-12**) versus genuinely open registration (**+6**).

### 2.6 Urban vs rural
- **Metric:** distance-decayed population potential — the population of every other place weighted
  by `exp(-distance/8km)`. More urban scores higher, per the brief.
- **Refinement:** each place's population is spread over a disc sized by its population rather than
  concentrated at its centroid. Without this, a 5,000-person CDP next to San Jose's centroid
  inherits all 983,000 of San Jose's residents as if they lived at a single point and ranks as the
  second most urban place in the Bay Area.

---

## 3. Anti-fabrication rules

Every research agent worked under these, and they are the reason blanks appear:

1. Report a number **only** if it was seen on a page fetched during the task. Never from
   background knowledge, never estimated.
2. Attach the publisher domain to every number, or the value is null.
3. A null is a correct answer; a guessed number is a defect that silently corrupts the ranking.
4. Never copy a rent or crime figure from a larger neighbouring place into a smaller one. (Naming
   the *district* that runs a CDP's schools is not covered by this — that district genuinely does
   carry a neighbouring town's name.)
5. Confirm the page is about the right place. These names collide constantly: Sleepy Hollow exists
   in both Marin and Contra Costa, there is an El Cerrito in Riverside County, Burbank in Santa
   Clara County is not Burbank in Los Angeles County.

Figures that failed a plausibility check — a 3BR cheaper than a 2BR, a 2BR under $900 or over
$12,000, a violent rate over 25/1k — were sent back to a second agent to be re-fetched and either
confirmed against the source or nulled.

---

## 4. Two defects found and fixed — do not reintroduce

1. **Percentile ranking was inverted** for every criterion, so Sea Ranch — the most remote place in
   the set — scored 100 for "close to downtown SF". Fixed in `pct_rank` (`reverse=higher_is_better`)
   and locked by `pipeline/test_scoring.py`, which fails if it regresses.
2. **Publisher mixing corrupted rents**, as described in 2.3. Now prevented at collection time by
   the same-publisher rule, with any residual inversion rebuilt from the 2BR and flagged.

---

## 5. What this ranking is not

- It has no opinion on **buying**, only renting.
- It ignores **transit** entirely. A car-free household would rank BART and Caltrain towns much
  higher than this table does.
- It ignores climate, air quality, wildfire and flood risk, commute to any employer other than
  downtown SF, and the character of a place beyond its density.
- School figures are district-level, not school-level (see 2.2).
- Equal weighting is the brief, not a recommendation. Rent and schools tend to dominate real
  decisions; every component column is kept in the table so the weights can be changed.

---

## 5a. The map

`bay-area-map.html` draws every place in its real boundary, shaded by score. Boundaries come from
the same authorities the ranking is built on: San Francisco's 41 Analysis Neighborhoods from
DataSF (an exact join — same geography, no name matching), and Census TIGER place files for every
other city, town and unincorporated community.

A polygon is accepted for a place only if its **centroid falls within 12 miles** of the
coordinates already held for that place. California reuses names relentlessly and the query
envelope reaches into the Delta, so a name match alone would quietly paint the wrong shape.

Three communities — Menlo Oaks, Burlingame Hills and Greenbrae — have no published boundary at
all (the Census has never delineated them, in the current vintage or in 2010), so they are drawn
as marked points rather than invented polygons. Highlands-Baywood Park is one row here but two
Census CDPs, so both polygons are drawn together.

**Base map.** Water and land come from the Census *cartographic* county boundaries (1:500k),
which — unlike the legal TIGER boundaries — are clipped to the shoreline. They serve twice: as
the land layer under the places, and as a clip on the place layer itself, so a legal city
boundary that extends into the bay (Alameda, Richmond and Sausalito all do) stops at the water's
edge instead of painting it. Anything land-coloured on the map is real territory that simply
is not one of the 220 ranked places. One implementation note: the clip must be a single merged
path with uniform ring winding — Chrome quietly dropped all but one child of a multi-child SVG
clipPath, which clipped the whole map to San Francisco county until merged.

**Filters.** The page carries a minimum-score slider per criterion; active filters combine (a
place must pass all of them), the map dims everything that fails, and the ranked list and a
counter follow.

## 6. Re-running

```bash
cd pipeline
python3 test_scoring.py        # regression tests -- run first
python3 caaspp.py              # district school data from the CAASPP files
python3 sf_crime.py            # SF neighbourhood crime from DataSF (--refresh to re-pull)
python3 single_table.py        # writes ../bay-area-ranking.csv
python3 build_map.py           # fetch + match boundaries -> map-data.json
python3 build_map_page.py      # writes ../bay-area-map.html
```

`merge_research.py <workflow-run-dir>` folds a research fan-out's output into `research.json`,
field by field, so a re-run corrects cells rather than duplicating rows.
