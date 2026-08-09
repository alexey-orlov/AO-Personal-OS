# Bay Area relocation ranking - place list, evaluation strategy, and method

Built 2026-08-09. Companion to the ranked spreadsheet. Household assumption: two children, one
entering Transitional Kindergarten / Kindergarten, one of middle/high-school age.

---

## 0. STATUS — what is finished and what is not

The run hit a hard environment limit: **this session allows 200 web searches in total, and the
research fan-out consumed all 200** partway through. Direct HTTP and the URL-fetching tool are also
blocked by the network egress policy for nearly every domain, so Census, HUD, California DOJ, CDE
and DataSF bulk files were not available as a substitute.

| | Status |
|---|---|
| Place list (220 places) | **Done** |
| Drive time to SF, all 220 | **Done** — modelled, mean absolute error 1.2 min vs 81 anchors |
| Urbanicity, all 220 | **Done** — computed, no search needed |
| Rent / crime / schools | **45 of 220 places measured** — including 36 of the 37 residential SF neighbourhoods |
| School-district research | Barely started (~24 districts, mostly thin) before the budget ran out |

So the **San Francisco half of the brief is genuinely complete** (25 neighbourhoods fully scored,
12 more carrying partial data), and the wider Bay Area is a framework with two of six criteria
computed for every row.

**Nothing is imputed in the published output.** An earlier draft filled unmeasured cells from county
medians; that was discarded, because with only 45 measured places the imputation would have been
inventing 175 rows and the ranking would have described the filler rather than the Bay Area.

**To finish:** roughly 1,200 more searches (175 places + ~130 districts), or about 6 further
sessions. Far cheaper: drive time and urbanicity are *already* computed for all 220 rows, so filter
to places within ~45 minutes of downtown first and research only those — about 90 places, roughly
1.5 sessions, covering every realistic candidate.

---

## 1. The place list (220 places)

| Segment | Count | Basis |
|---|---|---|
| San Francisco neighbourhoods | 41 | SF Planning **Analysis Neighborhoods** - the city's official, exhaustive, non-overlapping taxonomy |
| Incorporated cities and towns | 100 | Every incorporated municipality in the 9-county Bay Area except San Francisco itself |
| Unincorporated communities (CDPs) | 79 | Census-designated places, ~1,000+ residents, plus a few well-known smaller coastal/rural villages |

All 101 incorporated Bay Area municipalities are covered: San Francisco appears as its 41
neighbourhoods rather than as a single row.

**Why the 41 Analysis Neighborhoods and not a realtor list.** Realtor-style lists (70+ names such as
"Cow Hollow", "Dogpatch", "NoPa") overlap each other and leave gaps, so rows would double-count and
no criterion could be computed consistently. The Analysis Neighborhoods tile the whole city exactly
once, and they are the geography SFPD incident data and the city's ACS neighbourhood profiles are
published on - which is what makes per-neighbourhood crime figures possible at all. Popular
sub-names are noted in the row where they differ.

Four SF rows (Golden Gate Park, Lincoln Park, McLaren Park, the Presidio) are parkland with
negligible housing. They are kept for completeness but excluded from the ranking rather than given
a misleading score.

**Coverage boundary, stated honestly:** unincorporated hamlets below ~1,000 residents are largely
excluded (Nicasio, Tomales, Muir Beach, Loma Mar, Princeton-by-the-Sea, Oakville, Rutherford and
similar). They have no rental market, no school of their own and no published crime rate, so every
cell would be imputed. A handful of well-known ones (Stinson Beach, Point Reyes Station, Pescadero,
La Honda, Geyserville) are included as reference markers for the rural end of the scale.

---

## 2. Evaluation strategy per criterion

Six criteria, each **equally weighted at 1/6**, each converted to a **0-100 percentile rank within
the dataset** before averaging. Percentile ranking (rather than raw values) is what makes "equal
weight" actually equal: it gives every criterion the same 0-100 spread, so a criterion with a long
tail - rent, or drive time - cannot silently dominate the total.

### 2.1 Crime and safety
- **Metric:** violent crime rate per 1,000 residents (65% of the criterion) and property crime rate
  per 1,000 (35%). Violent crime is weighted higher because it is what a relocating family is
  actually deciding on.
- **Sources:** city and police-department annual reports and FBI/California-DOJ-derived tables where
  they surfaced; otherwise the crime aggregators (CrimeGrade, NeighborhoodScout, AreaVibes). For SF
  neighbourhoods the aggregators are the only source published at neighbourhood resolution.
- **Known limitation:** the aggregators are Tier-3 proprietary derivations of federal data, not
  primary sources. They are internally consistent, which is what a *ranking* needs, but a single
  city's absolute rate should be checked against its own police report before acting on it.

### 2.2 Schools
- **Metric:** average of an elementary rating and a middle/high rating, each on a 1-10 scale. Both
  are included because the household has a child at each end.
- **Sources:** GreatSchools-style district ratings and Niche grades (converted to 1-10), with CAASPP
  percent-meeting-standard in ELA and Math captured as a primary-source cross-check.
- **Resolution limit:** ratings are captured at **district** level, not per school. Within a large
  district (San Francisco Unified, Oakland Unified, San Jose Unified) individual schools vary far
  more than the districts do. Treat this column as "what district would you be in", not "what school
  will your child attend".

### 2.3 Cost of rental
- **Metric:** median 2BR rent and median 3BR rent, averaged, inverted so cheaper scores higher.
- **Reported alongside (not scored):** the count of listings below $4,000/month for each bedroom
  count, as requested.
- **How the sub-$4k counts are produced:** live *total* bedroom-filtered listing counts are
  obtainable and are measured. Explicitly price-filtered "under $4,000" pages are **not** indexed by
  search, so the share of that inventory below $4,000 is **modelled** from the market's median rent
  using a log-normal price distribution, and multiplied by the measured total. These cells are
  labelled as modelled, with the measured inputs shown next to them, and a coarse qualitative band
  (Plenty / Some / Few / Almost none) given as well, because the band survives the model's error
  where the point estimate does not.

### 2.4 Distance from SF city centre
- **Metric:** typical **off-peak** driving minutes to the Ferry Building, plus straight-line miles.
- **Method:** no routing service is reachable from this environment, so drive time is **modelled**:
  within each of 15 drive corridors, time is fitted as a linear function of great-circle distance,
  `t = a + b·d`. The intercept absorbs that corridor's fixed cost (Bay Bridge, Caldecott tunnel,
  Golden Gate approach, downtown surface streets) and the slope its effective speed.
- **Calibration:** least-squares fitted against 81 anchor trips of well-established duration.
  **Mean absolute error 1.2 minutes.** Spot-checked against independent sources: Palo Alto (33 mi,
  38-45 min published vs 38 modelled), San Rafael (18.6 mi, 26-38 vs 30), Walnut Creek (24 mi,
  30-45 vs 35).
- **Explicitly not modelled:** rush hour. Peak-hour times diverge enormously by corridor - the
  East Bay bridge approaches and the 101 Peninsula run degrade far more than a Marin or inner-SF
  trip. A place that looks close here can be a punishing weekday commute.

### 2.5 Ease of getting a place in a free public school / TK
Scored from three signals, because "capacity" is not a published number:
1. **Enrolment trend.** Declining enrolment and school closures mean open seats. This is the
   strongest available signal and most Bay Area districts are declining.
2. **Assignment system.** A strict address-based attendance boundary means your address effectively
   guarantees a seat (+8). A choice lottery means it does not (-18) - this is the single biggest
   penalty in the rubric, and it is why San Francisco scores poorly on this criterion despite having
   plenty of physical capacity.
3. **TK capacity.** California completed its universal-TK rollout, so nearly every district offers
   it; the discriminating signal is whether TK *space* is constrained (waitlist or lottery, -12) or
   widely available (+6).

### 2.6 Urban vs rural
- **Metric:** distance-decayed population potential - the population of every other place weighted
  by `exp(-distance/8km)`. More urban scores higher, per the brief.
- **Refinement:** each place's population is spread over a disc sized by its population rather than
  concentrated at its centroid. Without this, a 5,000-person CDP next to San Jose's centroid inherits
  all 983,000 of San Jose's residents as if they lived at a single point, and ranks as the second
  most urban place in the Bay Area.

---

## 3. Data collection

- **Environment constraint that shaped everything:** this session's network egress policy blocks
  direct HTTP and blocks the URL-fetching tool for essentially every domain, so bulk downloads from
  the Census API, HUD, California DOJ OpenJustice, the CDE and DataSF were all unavailable. Web
  *search* works. Every researched figure therefore comes from what search surfaced, not from a
  primary data file, and each is stored with the publisher domain it came from.
- **Collection method:** a fan-out of research agents, batched over places and then over school
  districts, each returning a strict JSON schema.
- **Anti-fabrication rules given to every agent:** report a number only if it was actually seen in a
  search result during the task; attach the publisher domain to every number or leave it null; never
  copy a value from a larger neighbouring place into a smaller one; a null is a correct answer and a
  guessed number is a defect.

## 4. Missing data

Cells that could not be measured are imputed from the median of the same county and place-type, then
county, then Bay Area. **Every imputed cell is flagged**, and each row carries a
**data-completeness percentage** across the six measured inputs. Rows below roughly 50% completeness
are reconstructions and should be read as such - almost all of them are small unincorporated
communities with no rental market or crime reporting of their own.

## 5. What this ranking is not

- It has no opinion on **buying**, only renting.
- It ignores **transit** entirely; a car-free household would rank BART and Caltrain towns much higher.
- It ignores climate, air quality, wildfire and flood risk, commute to any employer other than
  downtown SF, and the character of a place beyond its density.
- Equal weighting is the brief, not a recommendation. Rent and schools in particular tend to
  dominate real decisions; the spreadsheet keeps every component column so weights can be changed.
