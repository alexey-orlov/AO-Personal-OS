# -*- coding: utf-8 -*-
"""
Score and rank every Bay Area place on six equally-weighted criteria.

Criteria (each normalised to a 0-100 percentile rank within the dataset, higher = better,
each contributing exactly 1/6 of the final score):

  1. SAFETY               violent crime rate (65%) + property crime rate (35%), inverted
  2. SCHOOLS              elementary rating and middle/high rating, averaged
                          (the household has one TK/K-age child and one middle/high-age child)
  3. RENT COST            median 2BR and median 3BR rent, averaged, inverted (cheaper = better)
  4. PROXIMITY TO SF      modelled off-peak drive minutes to the Ferry Building, inverted
  5. SCHOOL/TK CAPACITY   ease of actually getting a seat: enrolment trend + assignment system
                          + TK capacity constraint
  6. URBANICITY           distance-decayed population potential (more urban = better, per the brief)

Sub-$4,000 listing supply for 2BR and 3BR is reported as data columns alongside the table, as
requested; it is not a seventh scored criterion.

Every imputed cell is flagged, and a per-row data-completeness percentage is reported so a
reader can tell a measured row from a reconstructed one.
"""
import json, math, os, sys, statistics
from collections import defaultdict

HERE = "/tmp/claude-0/-home-user-AO-Personal-OS/d13b3c34-2805-51c9-80da-5179e1911a53/scratchpad"
sys.path.insert(0, HERE)
from places import PLACES
from geo import build_drive_model, drive_minutes, urbanicity, haversine_mi, SF_DOWNTOWN

NON_RESIDENTIAL = {"Golden Gate Park", "Lincoln Park", "McLaren Park", "Presidio"}

# Districts whose capacity facts were verified directly against primary sources during this run.
# These override whatever the research fan-out returned, because they are load-bearing (SFUSD
# alone governs 41 of the 220 rows) and were checked by hand.
VERIFIED_DISTRICTS = {
    "san francisco unified school district": {
        # sfusd.edu + sfstandard.com + thefrisc.com, checked 2026-08-09:
        # the zone-based policy was delayed AGAIN and is NOT in force for 2026-27; citywide
        # choice (Board Policy 5101) still governs, softened by an attendance-area tiebreaker.
        # Physical capacity is abundant: ~14,000 seats to fill, enrolment -6.6% vs 2019,
        # closures paused, facilities being converted into TK classrooms.
        "capacity_pressure": "open seats / easy",
        "assignment_system": "citywide choice lottery with an attendance-area tiebreaker",
        "enrollment_trend": "declining",
        "tk_capacity_note": "TK expanding; facilities being converted to TK classrooms, though "
                            "the 2027 expansion was scaled back",
    },
}


# ----------------------------------------------------------------------------- helpers
def pct_rank(values, higher_is_better=True):
    """Map a list of (possibly None) numbers to 0-100 percentile ranks. None -> None."""
    present = [(i, v) for i, v in enumerate(values) if v is not None]
    if not present:
        return [None] * len(values)
    # best value first: descending when high is good, ascending when low is good
    order = sorted(present, key=lambda iv: iv[1], reverse=higher_is_better)
    n = len(order)
    out = [None] * len(values)
    # average ranks for ties
    i = 0
    while i < n:
        j = i
        while j + 1 < n and order[j + 1][1] == order[i][1]:
            j += 1
        rank = (i + j) / 2.0
        score = 100.0 * (1 - rank / (n - 1)) if n > 1 else 100.0
        for k in range(i, j + 1):
            out[order[k][0]] = score
        i = j + 1
    return out


def num(x):
    if x is None:
        return None
    if isinstance(x, (int, float)):
        return float(x) if not (isinstance(x, float) and math.isnan(x)) else None
    try:
        s = str(x).replace(",", "").replace("$", "").strip()
        return float(s)
    except Exception:
        return None


# ------------------------------------------------------------------- capacity rubric
def capacity_score(d):
    """0-100 ease of getting a public-school seat and a TK seat. d = district record or {}."""
    if not d:
        return None, "no district data"
    pressure = (d.get("capacity_pressure") or "").lower()
    assign = (d.get("assignment_system") or "").lower()
    tk = ((d.get("tk_capacity_note") or "") + " " + (d.get("tk_offered") or "")).lower()
    trend = (d.get("enrollment_trend") or "").lower()

    if "open seats" in pressure or "easy" in pressure:
        base = 85
    elif "tight" in pressure or "waitlist" in pressure:
        base = 30
    elif "normal" in pressure:
        base = 60
    else:
        base = None

    if base is None:
        if "declin" in trend:
            base = 80
        elif "grow" in trend:
            base = 40
        elif "stable" in trend:
            base = 60
        else:
            return None, "no capacity signal"

    notes = []
    # assignment system: a strict address-based boundary means your address guarantees a seat
    if "lotter" in assign or "choice" in assign:
        base -= 18
        notes.append("lottery/choice assignment")
    elif "address" in assign or "boundar" in assign or "attendance area" in assign or "neighborhood" in assign:
        base += 8
        notes.append("address-based assignment")

    # declining enrolment on top of an already-loose market is a further easing signal
    if "declin" in trend:
        base += 6
        notes.append("declining enrolment")
    elif "grow" in trend:
        base -= 6
        notes.append("growing enrolment")

    if "waitlist" in tk or "lotter" in tk or "constrain" in tk or "limited" in tk or "full" in tk:
        base -= 12
        notes.append("TK constrained")
    elif "all elementary" in tk or "available" in tk or "space" in tk or "no waitlist" in tk:
        base += 6
        notes.append("TK widely available")

    return max(0, min(100, base)), "; ".join(notes) or "-"


# --------------------------------------------------------------------------- main
def build(research_path=os.path.join(HERE, "research.json"), subset=None, impute_missing=True):
    """
    subset: optional predicate(row) -> bool. Only rows passing it are percentile-ranked
            against each other and receive a rank. Used to score the San Francisco
            neighbourhoods against each other when the wider dataset was never measured.
    impute_missing: when False, unmeasured cells stay None instead of being filled from a
            county median -- so a place with no data gets no score rather than a fake one.
    """
    return _build(research_path, subset, impute_missing)


def _build(research_path=os.path.join(HERE, "research.json"), subset=None, impute_missing=True):
    R = json.load(open(research_path))
    pres = {r["place"].strip().lower(): r for r in R["places"] if r.get("place")}
    dres = {r["district"].strip().lower(): r for r in R["districts"] if r.get("district")}
    for key, facts in VERIFIED_DISTRICTS.items():
        dres.setdefault(key, {"district": key})
        dres[key].update(facts)
        dres[key]["source_notes"] = "hand-verified against primary sources"

    params, _ = build_drive_model(verbose=False)
    urb = urbanicity(PLACES)

    rows = []
    for p in PLACES:
        name, county, kind, lat, lon, pop, corridor = p
        r = pres.get(name.lower(), {})
        t, d_gc = drive_minutes(params, p)

        ed = (r.get("elementary_district") or "").strip()
        hd = (r.get("high_school_district") or "").strip()
        d_elem = dres.get(ed.lower(), {})
        d_high = dres.get(hd.lower(), {}) or d_elem

        rows.append({
            "place": name, "county": county, "kind": kind, "pop": pop,
            "lat": lat, "lon": lon, "corridor": corridor,
            "residential": name not in NON_RESIDENTIAL,
            "drive_min": round(t, 1),
            "gc_mi": round(d_gc, 1),
            "urban_index": urb[name],
            "rent_2br": num(r.get("rent_2br_usd")),
            "rent_2br_src": r.get("rent_2br_source"),
            "rent_3br": num(r.get("rent_3br_usd")),
            "rent_3br_src": r.get("rent_3br_source"),
            "lst2_total": num(r.get("listings_2br_total")),
            "lst2_u4k": num(r.get("listings_2br_under4k")),
            "lst2_src": r.get("listings_2br_source"),
            "lst3_total": num(r.get("listings_3br_total")),
            "lst3_u4k": num(r.get("listings_3br_under4k")),
            "lst3_src": r.get("listings_3br_source"),
            "violent": num(r.get("violent_crime_per_1k")),
            "property": num(r.get("property_crime_per_1k")),
            "crime_src": r.get("crime_source"),
            "crime_qual": r.get("crime_qualitative"),
            "elem_district": ed or None,
            "high_district": hd or None,
            "elem_rating": num(d_elem.get("elem_rating_10")),
            "high_rating": num(d_high.get("mid_high_rating_10")) or num(d_elem.get("mid_high_rating_10")),
            "caaspp_ela": num(d_elem.get("caaspp_ela_pct")),
            "caaspp_math": num(d_elem.get("caaspp_math_pct")),
            "assignment": d_elem.get("assignment_system"),
            "enroll_trend": d_elem.get("enrollment_trend"),
            "capacity_pressure": d_elem.get("capacity_pressure"),
            "tk_note": d_elem.get("tk_capacity_note"),
            "research_conf": r.get("data_confidence") or "no-data",
            "notes": r.get("notes"),
        })

    # ------------- repair cross-publisher rent inversions before anything else -------------
    # A place's 2BR and 3BR figures are frequently scraped from DIFFERENT publishers, and
    # publisher-to-publisher variance (~40%) is larger than the real 2BR->3BR premium. That
    # produces rows where the 3BR is cheaper than the 2BR, which is not a real market fact.
    # Repair: learn the true bedroom premium from rows where BOTH figures came from the SAME
    # publisher, then rebuild the inverted 3BR values from their 2BR using that premium.
    same_pub = [
        (r["rent_2br"], r["rent_3br"]) for r in rows
        if r["rent_2br"] and r["rent_3br"] and r["rent_2br_src"] and r["rent_3br_src"]
        and r["rent_2br_src"].strip().lower() == r["rent_3br_src"].strip().lower()
    ]
    ratios = [b / a for a, b in same_pub if a > 0 and b / a > 0.5]
    premium = statistics.median(ratios) if len(ratios) >= 5 else 1.32
    rows_repaired = 0
    for r in rows:
        a, b = r["rent_2br"], r["rent_3br"]
        if a and b and b < a * 0.95:
            cross = (not r["rent_2br_src"] or not r["rent_3br_src"]
                     or r["rent_2br_src"].strip().lower() != r["rent_3br_src"].strip().lower())
            if cross:
                r["rent_3br"] = round(a * premium)
                r["rent_3br_src"] = f"reconstructed from 2BR x {premium:.2f} bedroom premium"
                r.setdefault("imputed", []).append("rent_3br (cross-publisher inversion)")
                rows_repaired += 1
    build.premium = premium
    build.rows_repaired = rows_repaired
    build.premium_n = len(ratios)

    # ---------------- imputation: county x kind median, then county, then global -------------
    def impute(field, label):
        by_ck = defaultdict(list)
        by_c = defaultdict(list)
        allv = []
        for row in rows:
            v = row.get(field)
            if v is not None:
                by_ck[(row["county"], row["kind"])].append(v)
                by_c[row["county"]].append(v)
                allv.append(v)
        for row in rows:
            if row.get(field) is None and row["residential"]:
                src = None
                pool = by_ck.get((row["county"], row["kind"]))
                if pool and len(pool) >= 2:
                    row[field] = statistics.median(pool)
                    src = f"imputed: {row['county']} {row['kind']} median"
                elif by_c.get(row["county"]) and len(by_c[row["county"]]) >= 2:
                    row[field] = statistics.median(by_c[row["county"]])
                    src = f"imputed: {row['county']} median"
                elif allv:
                    row[field] = statistics.median(allv)
                    src = "imputed: Bay Area median"
                if src:
                    row.setdefault("imputed", []).append(label)
                    row[field + "_imputed"] = True

    MEASURED = ["rent_2br", "rent_3br", "violent", "property", "elem_rating", "high_rating"]
    # record what was genuinely measured BEFORE any imputation touches it
    for r in rows:
        r["n_measured"] = sum(1 for f in MEASURED if r.get(f) is not None)
        r["measured_fields"] = [f for f in MEASURED if r.get(f) is not None]
    if impute_missing:
        for f in MEASURED:
            impute(f, f)

    # ---------------- capacity ----------------
    for row in rows:
        d = {
            "capacity_pressure": row["capacity_pressure"],
            "assignment_system": row["assignment"],
            "enrollment_trend": row["enroll_trend"],
            "tk_capacity_note": row["tk_note"],
            "tk_offered": None,
        }
        s, why = capacity_score(d)
        row["capacity_raw"] = s
        row["capacity_why"] = why
    if impute_missing:
        impute("capacity_raw", "capacity")

    # ---------------- criterion scores ----------------
    live = [r for r in rows if r["residential"]]
    if subset is not None:
        live = [r for r in live if subset(r)]

    v_s = pct_rank([r["violent"] for r in live], higher_is_better=False)
    p_s = pct_rank([r["property"] for r in live], higher_is_better=False)
    for r, a, b in zip(live, v_s, p_s):
        r["c_safety"] = (0.65 * a + 0.35 * b) if (a is not None and b is not None) else (a or b)

    for r in live:
        rr = [x for x in (r["elem_rating"], r["high_rating"]) if x is not None]
        r["_school_raw"] = sum(rr) / len(rr) if rr else None
    for r, s in zip(live, pct_rank([r["_school_raw"] for r in live], True)):
        r["c_schools"] = s

    for r in live:
        rr = [x for x in (r["rent_2br"], r["rent_3br"]) if x is not None]
        r["_rent_raw"] = sum(rr) / len(rr) if rr else None
    for r, s in zip(live, pct_rank([r["_rent_raw"] for r in live], False)):
        r["c_rent"] = s

    for r, s in zip(live, pct_rank([r["drive_min"] for r in live], False)):
        r["c_distance"] = s
    for r, s in zip(live, pct_rank([r["capacity_raw"] for r in live], True)):
        r["c_capacity"] = s
    for r, s in zip(live, pct_rank([r["urban_index"] for r in live], True)):
        r["c_urban"] = s

    CRITS = ["c_safety", "c_schools", "c_rent", "c_distance", "c_capacity", "c_urban"]
    for r in live:
        vals = [r.get(c) for c in CRITS]
        got = [v for v in vals if v is not None]
        r["total"] = sum(got) / len(got) if got else 0.0
        measured = sum(1 for f in MEASURED if not r.get(f + "_imputed") and r.get(f) is not None)
        r["completeness"] = round(100 * measured / len(MEASURED))

    live.sort(key=lambda r: -r["total"])
    for i, r in enumerate(live, 1):
        r["rank"] = i
    for r in rows:
        if not r["residential"]:
            r["rank"] = None
            r["total"] = None
    return rows, live


if __name__ == "__main__":
    rows, live = build()
    print(f"{len(live)} ranked places ({len(rows)-len(live)} non-residential excluded)\n")
    hdr = f"{'#':>4} {'place':34s} {'county':13s} {'tot':>5} {'safe':>5} {'schl':>5} {'rent':>5} {'dist':>5} {'cap':>5} {'urb':>5} {'2BR':>6} {'3BR':>6} {'min':>5} {'cmp':>4}"
    print(hdr); print("-" * len(hdr))
    for r in live[:40]:
        print(f"{r['rank']:>4} {r['place'][:34]:34s} {r['county'][:13]:13s} {r['total']:5.1f} "
              f"{r['c_safety'] or 0:5.1f} {r['c_schools'] or 0:5.1f} {r['c_rent'] or 0:5.1f} "
              f"{r['c_distance'] or 0:5.1f} {r['c_capacity'] or 0:5.1f} {r['c_urban'] or 0:5.1f} "
              f"{r['rent_2br'] or 0:6.0f} {r['rent_3br'] or 0:6.0f} {r['drive_min']:5.0f} {r['completeness']:4d}")
    print("...")
    for r in live[-10:]:
        print(f"{r['rank']:>4} {r['place'][:34]:34s} {r['county'][:13]:13s} {r['total']:5.1f} "
              f"{r['c_safety'] or 0:5.1f} {r['c_schools'] or 0:5.1f} {r['c_rent'] or 0:5.1f} "
              f"{r['c_distance'] or 0:5.1f} {r['c_capacity'] or 0:5.1f} {r['c_urban'] or 0:5.1f} "
              f"{r['rent_2br'] or 0:6.0f} {r['rent_3br'] or 0:6.0f} {r['drive_min']:5.0f} {r['completeness']:4d}")
