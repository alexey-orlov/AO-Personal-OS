# -*- coding: utf-8 -*-
"""
Build THE table: one row per place, every data point, one sort order.

The prior deliverable was split across four tabs -- a finished San Francisco ranking, a separate
all-places sheet, and method notes -- because only San Francisco had enough measured data to rank.
That split is now gone. Every place is scored on the same six criteria against the same
population, so there is exactly one comparable table.

Six criteria, each 1/6 of the score, each a 0-100 percentile rank within the ranked population:
  1 SAFETY      violent crime /1k (65%) + property crime /1k (35%), inverted
  2 SCHOOLS     CAASPP % meeting standard, elementary band and middle/high band averaged
  3 RENT        median 2BR and 3BR, averaged, inverted
  4 DISTANCE    modelled off-peak drive minutes to the Ferry Building, inverted
  5 TK/SEAT     enrolment trend + assignment system + TK capacity
  6 URBANICITY  distance-decayed population potential

Percentile ranking is what makes equal weighting actually equal: every criterion gets the same
0-100 spread, so rent's long tail cannot silently outweigh drive time.

Every figure is MEASURED first. Nothing is ever filled from a county average or a global median.
Where a place genuinely has no data of its own -- a 1,100-person unincorporated community has no
rental market, no police department and no school district that anyone publishes figures for --
the cell is borrowed from the nearest LARGER place, and every borrowed cell is labelled: the
donor is named in "Approximated from" and the row's Data basis reads "Approximated". A row that
is entirely measured says so, so the two can always be told apart and the ranking can be read
either way. See fill_from_parent().
"""
import csv
import json
import math
import os
import re
import statistics
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
REPO = os.path.dirname(HERE)

from places import PLACES                                    # noqa: E402
from geo import (build_drive_model, drive_minutes, urbanicity,  # noqa: E402
                 haversine_mi)
import caaspp                                                 # noqa: E402
import sf_crime                                               # noqa: E402
from score import pct_rank, num                               # noqa: E402

NON_RESIDENTIAL = {"Golden Gate Park", "Lincoln Park", "McLaren Park", "Presidio"}
KIND_LABEL = {"sf_hood": "SF neighbourhood", "city": "City", "town": "Town",
              "cdp": "Unincorporated community"}
SIGMA = 0.28          # log-normal spread of asking rents within a market


# --------------------------------------------------------------------- rent supply
def share_under(median, threshold=4000.0, sigma=SIGMA):
    """P(rent < threshold) under a log-normal centred on the reported median."""
    if not median or median <= 0:
        return None
    z = (math.log(threshold) - math.log(median)) / sigma
    return 0.5 * (1 + math.erf(z / math.sqrt(2)))


def rent_index(r2, r3, premium):
    """
    A place's rent level on ONE consistent basis: the mean of a 2BR and a 3BR.

    Averaging "whatever bedroom counts happen to be present" biases the ranking. A 3BR runs
    roughly `premium` times a 2BR, so a place with only a 2BR figure would look systematically
    cheaper than an identical place that happens to have both. When one bedroom count is
    missing, the other is converted to its counterpart at the learned premium so that every
    place is compared on the same basis. The converted half is flagged in the output.
    """
    if r2 and r3:
        return (r2 + r3) / 2.0
    if r2:
        return (r2 + r2 * premium) / 2.0
    if r3:
        return (r3 / premium + r3) / 2.0
    return None


def band(share):
    if share is None:
        return ""
    if share >= 0.60:
        return "Plenty"
    if share >= 0.30:
        return "Some"
    if share >= 0.10:
        return "Few"
    if share >= 0.02:
        return "Very few"
    return "Almost none"


# ------------------------------------------------------------- district name matching
_NOISE = re.compile(
    r"\b(school district|schools|district|unified|union|elementary|high|joint|city|public)\b")


def _norm(name):
    s = (name or "").lower().replace("&", "and")
    s = re.sub(r"[^a-z0-9 ]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def _core(name):
    """The distinguishing part of a district name, with the boilerplate words removed."""
    return re.sub(r"\s+", " ", _NOISE.sub(" ", _norm(name))).strip()


def match_district(name, districts):
    """
    Map a researched district name onto a CAASPP district record.

    Agents report names like "San Rafael City Elementary School District" while CAASPP holds
    "San Rafael City Elementary". Exact match first, then a match on the distinguishing words
    with the boilerplate stripped -- and when several CAASPP districts share those words
    (an elementary district and a union high district usually do), prefer the one whose full
    name shares the most words with what was reported.
    """
    if not name:
        return None
    key = _norm(name)
    if key in districts:
        return districts[key]
    stripped = _norm(re.sub(r"\bschool district\b", "", name, flags=re.I))
    if stripped in districts:
        return districts[stripped]

    want = _core(name)
    if not want:
        return None
    cands = [d for k, d in districts.items() if _core(k) == want]
    if not cands:
        cands = [d for k, d in districts.items()
                 if want and (want in _core(k) or _core(k) in want)]
    if not cands:
        return None
    want_words = set(_norm(name).split())
    return max(cands, key=lambda d: len(want_words & set(_norm(d["name"]).split())))


def classify_assignment(assignment):
    """
    "address" | "lottery" | None, from the district's assignment description.

    Read the LEADING clause, not the whole string. Most California districts are address-based
    but also run some optional intra-district transfer, so their description reads
    "address-based attendance area - with an intra-district school-choice option". Searching the
    whole string for "choice" classifies those as lotteries and hands them the -18 penalty, which
    is wrong and would have hit 7 of the 11 districts that mention the word. The research agents
    were told to lead with the classification, so the first clause is what decides it.
    """
    a = (assignment or "").strip().lower()
    if not a:
        return None
    head = re.split(r"[-—(:;,]", a, maxsplit=1)[0].strip()
    if "address" in head or "attendance area" in head or "boundar" in head or "neighborhood" in head:
        return "address"
    if "lotter" in head or "choice" in head:
        return "lottery"
    # no verdict in the leading clause: fall back to the whole string, address-based first
    if "address-based" in a or "attendance area" in a:
        return "address"
    if "lotter" in a or "choice" in a:
        return "lottery"
    return None


_TK_TIGHT = ("waitlist", "wait list", "lotter", "constrain", "limited", "no sites available",
             "not offering", "oversubscrib", "space is capped", "space-gated", "overflow",
             "subject to capacity", "when space is available", "may not be at")
_TK_OPEN = ("widely available", "space available at all", "no waitlist", "at all elementary",
            "always guaranteed", "always welcome", "placement is always")
# "no TK waitlist, TK lottery, or seat cap is stated" says the OPPOSITE of what a bare keyword
# search reads it as. Strip these negated spans before testing for tightness.
_NEGATED = re.compile(
    r"\b(?:no|not|without|never|neither)\b[^.;]{0,80}?"
    r"\b(?:waitlist|wait list|lotter\w*|cap|caps|seat cap|constraint\w*)\b", re.I)


def classify_tk(tk_note):
    """
    "tight" | "open" | None, from the district's TK-capacity description.

    Used by BOTH the score and the published label, so the spreadsheet can never disagree with
    the ranking. Negated spans are removed first: an agent writing "no TK waitlist, TK lottery,
    or seat cap is stated" is reporting the ABSENCE of a constraint, and a bare keyword search
    turns that into a penalty.
    """
    s = (tk_note or "").lower()
    if not s:
        return None
    if "not established" in s or "not applicable" in s:
        return None
    s = _NEGATED.sub(" ", s)
    if any(w in s for w in _TK_TIGHT):
        return "tight"
    if any(w in s for w in _TK_OPEN):
        return "open"
    return None


# --------------------------------------------------------------------- capacity rubric
def capacity_score(trend_pct, assignment, tk_note):
    """
    0-100 ease of actually getting a public-school seat and a TK seat.

    Three signals, because "capacity" is not a published number:
      * enrolment trend -- declining enrolment means empty seats, and most Bay Area districts
        are declining. This is the strongest available signal, so it sets the base.
      * assignment system -- a strict address-based attendance boundary means your address
        effectively guarantees a seat (+8); a choice lottery means it does not (-18). This is
        the single biggest swing in the rubric and it is why San Francisco scores badly here
        despite having thousands of empty seats.
      * TK capacity -- California finished its universal-TK rollout, so the discriminating
        signal is whether TK space is constrained (-12) or genuinely open (+6).
    """
    if trend_pct is None:
        return None, ""
    # -6% or worse over two years = clearly emptying; +6% or more = filling up
    base = 60 + max(-25.0, min(25.0, -trend_pct * 3.0))
    notes = []
    # Where the district's assignment system or TK position could not be established, the score
    # rests on the enrolment trend alone -- it gets neither the address-based bonus nor the
    # lottery penalty, so it sits mid-field. That is stated in the row rather than hidden.
    if not assignment and not tk_note:
        notes.append("enrolment trend only; assignment system and TK position not established")
    if trend_pct <= -3:
        notes.append(f"enrolment {trend_pct:+.1f}% 2023-25 (seats opening)")
    elif trend_pct >= 3:
        notes.append(f"enrolment {trend_pct:+.1f}% 2023-25 (filling)")
    else:
        notes.append(f"enrolment {trend_pct:+.1f}% 2023-25 (flat)")

    kind = classify_assignment(assignment)
    if kind == "lottery":
        base -= 18
        notes.append("choice/lottery assignment")
    elif kind == "address":
        base += 8
        notes.append("address-based assignment")

    tk = classify_tk(tk_note)
    if tk == "tight":
        base -= 12
        notes.append("TK constrained")
    elif tk == "open":
        base += 6
        notes.append("TK widely available")
    return max(0.0, min(100.0, base)), "; ".join(notes)


# ------------------------------------------------------------------------------ build
FILLABLE = [
    ("rent_2br", "2BR rent"), ("rent_3br", "3BR rent"),
    ("violent", "violent crime"), ("property", "property crime"),
    ("elem_pct", "elementary schools"), ("midhigh_pct", "middle/high schools"),
    ("capacity_raw", "school/TK capacity"),
]


def fill_from_parent(rows, max_miles=25.0):
    """
    Fill a small place's missing cells from the larger place it sits inside or beside.

    A 1,100-person unincorporated community has no rental market of its own, no police
    department of its own, and no school district of its own -- so no publisher reports figures
    for it, and a single missing input (usually rent) cascades: no rent -> no supply band ->
    no rent score -> no total -> no rank. Rather than leave the row blank, each missing cell is
    borrowed from the nearest LARGER place that has it, preferring the same county.

    This is an approximation and it is labelled as one on every row it touches: the donor is
    named in "Approximated from" and the row's Data basis becomes "Approximated". The measured
    rows are still distinguishable, so the ranking can be read either way.
    """
    donors_by_field = {f: [r for r in rows if r["residential"] and r.get(f) is not None]
                       for f, _ in FILLABLE}
    filled = 0
    for r in rows:
        if not r["residential"]:
            continue
        borrowed = []
        for field, label in FILLABLE:
            if r.get(field) is not None:
                continue
            best, best_d = None, None
            for d in donors_by_field[field]:
                if d is r or d["pop"] <= r["pop"]:      # borrow DOWN the hierarchy only
                    continue
                miles = haversine_mi(r["lat"], r["lon"], d["lat"], d["lon"])
                if miles > max_miles:
                    continue
                # same county first, then nearest
                key = (0 if d["county"] == r["county"] else 1, miles)
                if best_d is None or key < best_d:
                    best, best_d = d, key
            if best is not None:
                r[field] = best[field]
                r.setdefault("approx_fields", []).append(label)
                r.setdefault("approx_donors", []).append(best["place"])
                borrowed.append(field)
        if borrowed:
            filled += 1
            # name the donors once, deduped, in the order the fields were filled
            seen, donors = set(), []
            for d in r["approx_donors"]:
                if d not in seen:
                    seen.add(d)
                    donors.append(d)
            r["approx_from"] = ", ".join(donors)
    fill_from_parent.rows_filled = filled
    return filled


def load_research():
    path = os.path.join(HERE, "research.json")
    R = json.load(open(path))
    return {r["place"].strip().lower(): r for r in R["places"] if r.get("place")}


def load_policy():
    """
    District assignment-system / TK facts, keyed for lookup.

    Agents label a district "Brentwood Union (Contra Costa County)" while CAASPP holds
    "Brentwood Union", so the parenthetical is stripped and the record is filed under both the
    normalised full name and the distinguishing core, letting match_district find it either way.
    """
    path = os.path.join(HERE, "district-policy.json")
    if not os.path.exists(path):
        return {}
    P = json.load(open(path))
    out = {}
    for r in P.get("districts", []):
        raw = (r.get("district") or "").strip()
        if not raw:
            continue
        clean = re.sub(r"\s*\([^)]*\)\s*$", "", raw).strip()
        # match_district() reads a "name" key, same as the CAASPP records
        r = dict(r, district=clean, name=clean)
        out.setdefault(_norm(clean), r)
        out.setdefault(clean.lower(), r)
    return out


def sf_neighbourhood_crime(pres):
    """
    Calibrated SFPD-derived crime rates for the San Francisco neighbourhoods.

    CrimeGrade's SF neighbourhood pages mostly do not exist, so a third of the city had no crime
    figure. San Francisco publishes the incident data itself, tagged with the same Analysis
    Neighborhood geography these rows use. Those rates are put on the CrimeGrade scale (see
    sf_crime.py) so San Francisco stays comparable with the rest of the table.
    """
    pops = {p[0]: p[5] for p in PLACES if p[2] == "sf_hood" and p[0] not in NON_RESIDENTIAL}
    try:
        rates = sf_crime.rates(pops)
    except Exception as exc:                      # never fail the build over one source
        print(f"  ! SF crime unavailable ({exc}); falling back to whatever was researched")
        return {}, {}
    ref = {}
    for r in pres.values():
        n = (r.get("place") or "").strip()
        if n in pops and r.get("violent_crime_per_1k") and r.get("property_crime_per_1k") \
                and "crimegrade" in (r.get("crime_source") or "").lower():
            ref[n] = (float(r["violent_crime_per_1k"]), float(r["property_crime_per_1k"]))
    info = sf_crime.calibrate(rates, ref)
    return rates, info


def build():
    pres = load_research()
    policy = load_policy()
    districts = caaspp.build()
    params, _ = build_drive_model(verbose=False)
    urb = urbanicity(PLACES)
    sf_rates, sf_cal = sf_neighbourhood_crime(pres)

    rows = []
    for p in PLACES:
        name, county, kind, lat, lon, pop, corridor = p
        r = pres.get(name.lower(), {})
        t, gc = drive_minutes(params, p)

        ed_name = (r.get("elementary_district") or "").strip()
        hd_name = (r.get("high_school_district") or "").strip()
        if kind == "sf_hood":
            ed_name = hd_name = "San Francisco Unified"
        ed = match_district(ed_name, districts)
        hd = match_district(hd_name, districts) or ed

        # An elementary district has no middle/high band and a union high district has no
        # elementary band; take each band from the district that actually teaches it.
        elem_pct = (ed or {}).get("elem_pct")
        midhigh_pct = (hd or {}).get("midhigh_pct")
        if midhigh_pct is None and ed:
            midhigh_pct = ed.get("midhigh_pct")
        if elem_pct is None and hd:
            elem_pct = hd.get("elem_pct")

        # capacity is driven by the district the child would actually enrol in for TK
        trend = (ed or hd or {}).get("enrol_pct_change_23_25")
        # match on the CAASPP name first (canonical), then on whatever the place research called it
        pol = (match_district((ed or {}).get("name"), policy)
               or match_district(ed_name, policy)
               or {})
        cap, cap_why = capacity_score(trend, pol.get("assignment_system"), pol.get("tk_capacity_note"))

        violent, prop = num(r.get("violent_crime_per_1k")), num(r.get("property_crime_per_1k"))
        crime_src = r.get("crime_source")
        sfc = sf_rates.get(name) if kind == "sf_hood" else None
        if sfc and name not in NON_RESIDENTIAL:
            violent, prop = round(sfc["violent"], 2), round(sfc["property"], 2)
            crime_src = ("DataSF SFPD incident reports 2025-07..2026-07, calibrated to the "
                         "CrimeGrade scale")
        elif name in NON_RESIDENTIAL:
            # parkland: a handful of residents under a citywide incident count produces a
            # meaningless rate, so publish nothing rather than a number that looks real
            violent = prop = None

        r2, r3 = num(r.get("rent_2br_usd")), num(r.get("rent_3br_usd"))
        rows.append({
            "place": name, "county": county, "kind": kind, "pop": pop,
            "lat": lat, "lon": lon,          # used by fill_from_parent and the map build
            "residential": name not in NON_RESIDENTIAL,
            "drive_min": round(t, 1), "gc_mi": round(gc, 1),
            "urban_index": urb[name],
            "rent_2br": r2, "rent_3br": r3,
            "rent_src": r.get("rent_source"),
            "violent": violent,
            "property": prop,
            "crime_src": crime_src,
            "elem_district": (ed or {}).get("name") or ed_name or None,
            "high_district": (hd or {}).get("name") or hd_name or None,
            "elem_pct": elem_pct, "midhigh_pct": midhigh_pct,
            "elem_rating": (ed or {}).get("elem_rating_10"),
            "midhigh_rating": (hd or {}).get("midhigh_rating_10") or (ed or {}).get("midhigh_rating_10"),
            "enrol_trend": trend,
            "assignment": pol.get("assignment_system"),
            "tk_note": pol.get("tk_capacity_note"),
            "capacity_raw": cap, "capacity_why": cap_why,
            "policy_src": pol.get("source"),
            "no_data_reason": r.get("no_data_reason"),
            "notes": r.get("notes"),
        })

    premium, _ = _repair_rent_inversions(rows)
    fill_from_parent(rows)

    # ------- criteria -------
    live = [r for r in rows if r["residential"]]
    for r in live:
        pair = [x for x in (r["elem_pct"], r["midhigh_pct"]) if x is not None]
        r["_school_raw"] = sum(pair) / len(pair) if pair else None
        r["_rent_raw"] = rent_index(r["rent_2br"], r["rent_3br"], premium)
        if r["_rent_raw"] is not None and not (r["rent_2br"] and r["rent_3br"]):
            r["rent_basis"] = (f"one bedroom count measured; the other converted at the "
                               f"{premium:.2f}x premium for comparability")

    v = pct_rank([r["violent"] for r in live], higher_is_better=False)
    pr = pct_rank([r["property"] for r in live], higher_is_better=False)
    for r, a, b in zip(live, v, pr):
        r["c_safety"] = (0.65 * a + 0.35 * b) if (a is not None and b is not None) else None
    for r, s in zip(live, pct_rank([r["_school_raw"] for r in live], True)):
        r["c_schools"] = s
    for r, s in zip(live, pct_rank([r["_rent_raw"] for r in live], False)):
        r["c_rent"] = s
    for r, s in zip(live, pct_rank([r["drive_min"] for r in live], False)):
        r["c_distance"] = s
    for r, s in zip(live, pct_rank([r["capacity_raw"] for r in live], True)):
        r["c_capacity"] = s
    for r, s in zip(live, pct_rank([r["urban_index"] for r in live], True)):
        r["c_urban"] = s

    CRITS = ["c_safety", "c_schools", "c_rent", "c_distance", "c_capacity", "c_urban"]
    LABEL = {"c_safety": "crime", "c_schools": "schools", "c_rent": "rent",
             "c_distance": "drive time", "c_capacity": "school/TK capacity",
             "c_urban": "urbanicity"}
    ranked, unranked = [], []
    for r in live:
        missing = [LABEL[c] for c in CRITS if r.get(c) is None]
        r["missing"] = missing
        if missing:
            r["total"] = None
            why = r.get("no_data_reason")
            r["rank_status"] = ("Not ranked - no data for " + ", ".join(missing)
                                + (f" ({why})" if why else ""))
            unranked.append(r)
        else:
            r["total"] = sum(r[c] for c in CRITS) / 6.0
            r["rank_status"] = ("Ranked" if not r.get("approx_fields")
                                else "Ranked - " + ", ".join(dict.fromkeys(r["approx_fields"]))
                                     + " approximated from " + r["approx_from"])
            ranked.append(r)

    ranked.sort(key=lambda r: -r["total"])
    for i, r in enumerate(ranked, 1):
        r["rank"] = i
    # unranked rows keep their data but sort to the bottom, best-documented first
    unranked.sort(key=lambda r: (len(r["missing"]), r["place"]))
    for r in unranked:
        r["rank"] = None
    for r in rows:
        if not r["residential"]:
            r["rank"] = None
            r["total"] = None
            r["rank_status"] = "Not ranked - parkland, negligible housing"
            r["missing"] = []

    parkland = [r for r in rows if not r["residential"]]
    build.sf_calibration = sf_cal
    return ranked + unranked + parkland, ranked


def _repair_rent_inversions(rows):
    """
    A 3BR cheaper than a 2BR is not a real market fact -- it means the two figures came from
    different publishers, whose level differences (~40%) swamp the real bedroom premium. The
    collection rules forbid mixing publishers, so this should now be rare; when it still happens
    the 3BR is rebuilt from the 2BR using the premium learned from same-publisher pairs, and the
    cell is flagged in Sources.
    """
    good = [(r["rent_2br"], r["rent_3br"]) for r in rows
            if r["rent_2br"] and r["rent_3br"] and r["rent_3br"] >= r["rent_2br"]]
    ratios = [b / a for a, b in good if a > 0]
    premium = statistics.median(ratios) if len(ratios) >= 5 else 1.32
    n = 0
    for r in rows:
        a, b = r["rent_2br"], r["rent_3br"]
        if a and b and b < a * 0.95:
            r["rent_3br"] = round(a * premium)
            r["rent_src"] = f"{r['rent_src'] or '?'} (3BR reconstructed from 2BR x {premium:.2f})"
            n += 1
    _repair_rent_inversions.premium = premium
    _repair_rent_inversions.repaired = n
    return premium, n


# ------------------------------------------------------------------------------ output
COLUMNS = [
    ("rank", "Rank"),
    ("place", "Place"),
    ("county", "County"),
    ("kind_label", "Type"),
    ("total", "TOTAL SCORE"),
    ("c_safety", "Crime & safety"),
    ("c_schools", "Schools"),
    ("c_rent", "Rent cost"),
    ("c_distance", "Close to SF"),
    ("c_capacity", "School/TK place"),
    ("c_urban", "Urban density"),
    ("rent_2br", "2BR median rent $"),
    ("rent_3br", "3BR median rent $"),
    ("u4k_2br_n", "2BR under $4k (est. listings)"),
    ("u4k_2br_band", "2BR under $4k supply"),
    ("u4k_3br_n", "3BR under $4k (est. listings)"),
    ("u4k_3br_band", "3BR under $4k supply"),
    ("violent", "Violent crime /1k"),
    ("property", "Property crime /1k"),
    ("elem_district", "Elementary district"),
    ("elem_pct", "Elementary CAASPP % met"),
    ("elem_rating", "Elementary rating /10"),
    ("high_district", "Middle/high district"),
    ("midhigh_pct", "Middle/high CAASPP % met"),
    ("midhigh_rating", "Middle/high rating /10"),
    ("drive_min", "Drive to Ferry Bldg (min, off-peak)"),
    ("gc_mi", "Miles to SF (straight line)"),
    ("urban_index", "Urbanicity index"),
    ("pop", "Population"),
    ("enrol_trend", "District enrolment change 2023-25 %"),
    ("assignment", "School assignment system"),
    ("tk_note", "TK capacity"),
    ("rank_status", "Rank status"),
    ("data_basis", "Data basis"),
    ("approx_from", "Approximated from"),
    ("sources", "Sources"),
    ("notes", "Notes"),
]


def r1(x):
    return round(x, 1) if isinstance(x, (int, float)) else ""


def money(x):
    return int(round(x)) if isinstance(x, (int, float)) else ""


def present(r):
    """One output row: raw values, rounded for reading, blanks where nothing was measured."""
    s2 = share_under(r.get("rent_2br"))
    s3 = share_under(r.get("rent_3br"))
    srcs = [x for x in (r.get("rent_src"), r.get("crime_src")) if x]
    if r.get("elem_pct") is not None or r.get("midhigh_pct") is not None:
        srcs.append("CAASPP 2025 (CDE)")
    if r.get("policy_src"):
        srcs.append(r["policy_src"])
    if r.get("rent_basis"):
        srcs.append(r["rent_basis"])
    out = {
        "rank": r.get("rank") or "",
        "place": r["place"],
        "county": r["county"],
        "kind_label": KIND_LABEL.get(r["kind"], r["kind"]),
        "total": r1(r.get("total")),
        "c_safety": r1(r.get("c_safety")),
        "c_schools": r1(r.get("c_schools")),
        "c_rent": r1(r.get("c_rent")),
        "c_distance": r1(r.get("c_distance")),
        "c_capacity": r1(r.get("c_capacity")),
        "c_urban": r1(r.get("c_urban")),
        "rent_2br": money(r.get("rent_2br")),
        "rent_3br": money(r.get("rent_3br")),
        "u4k_2br_band": band(s2),
        "u4k_3br_band": band(s3),
        "u4k_2br_n": f"{s2*100:.0f}% of 2BR stock" if s2 is not None else "",
        "u4k_3br_n": f"{s3*100:.0f}% of 3BR stock" if s3 is not None else "",
        "violent": r1(r.get("violent")),
        "property": r1(r.get("property")),
        "elem_district": r.get("elem_district") or "",
        "elem_pct": r1(r.get("elem_pct")),
        "elem_rating": r.get("elem_rating") or "",
        "high_district": r.get("high_district") or "",
        "midhigh_pct": r1(r.get("midhigh_pct")),
        "midhigh_rating": r.get("midhigh_rating") or "",
        "drive_min": r1(r.get("drive_min")),
        "gc_mi": r1(r.get("gc_mi")),
        "urban_index": int(r["urban_index"]) if r.get("urban_index") else "",
        "pop": r.get("pop") or "",
        "enrol_trend": r1(r.get("enrol_trend")),
        "assignment": r.get("assignment") or "",
        "tk_note": r.get("tk_note") or ("not established" if r.get("capacity_raw") is not None else ""),
        "rank_status": r.get("rank_status") or "",
        "data_basis": ("Approximated" if r.get("approx_fields")
                       else ("Measured" if r.get("residential") else "")),
        "approx_from": r.get("approx_from") or "",
        "sources": "; ".join(dict.fromkeys(srcs)),
        "notes": "; ".join(x for x in (r.get("capacity_why"), (r.get("notes") or "")[:520]) if x),
    }
    return out


def write_csv(rows, path):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow([label for _, label in COLUMNS])
        for r in rows:
            o = present(r)
            w.writerow([o[key] for key, _ in COLUMNS])


if __name__ == "__main__":
    rows, ranked = build()
    out = os.path.join(REPO, "bay-area-ranking.csv")
    write_csv(rows, out)
    print(f"{len(rows)} rows written -> {out}")
    print(f"  ranked          {len(ranked)}")
    print(f"  unranked        {len([r for r in rows if r['residential'] and not r.get('rank')])}")
    print(f"  parkland        {len([r for r in rows if not r['residential']])}")
    print(f"  rent inversions repaired {_repair_rent_inversions.repaired} "
          f"(premium {_repair_rent_inversions.premium:.2f})")
    print()
    hdr = (f"{'#':>4} {'place':32s} {'county':13s} {'tot':>5} {'safe':>5} {'schl':>5} "
           f"{'rent':>5} {'dist':>5} {'cap':>5} {'urb':>5} {'2BR':>6} {'3BR':>6} {'min':>5}")
    print(hdr)
    print("-" * len(hdr))
    for r in ranked[:30]:
        print(f"{r['rank']:>4} {r['place'][:32]:32s} {r['county'][:13]:13s} {r['total']:5.1f} "
              f"{r['c_safety']:5.1f} {r['c_schools']:5.1f} {r['c_rent']:5.1f} "
              f"{r['c_distance']:5.1f} {r['c_capacity']:5.1f} {r['c_urban']:5.1f} "
              f"{r['rent_2br'] or 0:6.0f} {r['rent_3br'] or 0:6.0f} {r['drive_min']:5.0f}")
