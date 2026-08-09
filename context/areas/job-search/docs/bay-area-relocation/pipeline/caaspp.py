# -*- coding: utf-8 -*-
"""
District-level school quality and enrolment trend, from the CAASPP research files.

Why this source
---------------
The prior run took school ratings from aggregators (GreatSchools / Niche grades). Those are
proprietary derivations, they were only obtainable for a couple of dozen districts, and they
publish a single blended number that cannot be split into "how are the elementary schools" and
"how are the middle and high schools" -- which this household needs, because it has one child at
each end.

The California Department of Education's CAASPP research files are the primary source underneath
most of those ratings. They are downloadable in bulk (no per-district scraping), they cover every
district in the state, and they are broken out BY GRADE -- so the elementary and middle/high
figures are computed separately and honestly rather than inferred.

  Test ID 1 = ELA, 2 = Math.  Student Group 1 = All Students.  Type ID 6 = district.
  Grade 13 = "all grades combined"; grades 3-8 and 11 are the individually tested grades.

  ELEMENTARY  = grades 3, 4, 5
  MIDDLE/HIGH = grades 6, 7, 8, 11

Both are enrolment-weighted across grades and averaged across ELA and Math, giving
"percent meeting or exceeding standard" for each band.

Enrolment trend
---------------
Computed as the change in tested-grade enrolment between the 2023 and 2025 files. This is a
proxy for total district enrolment -- CAASPP only tests grades 3-8 and 11 -- but it is the
right proxy for this criterion: it measures the school-age cohort that actually competes for
seats, from a primary source, on identical methodology in both years.
"""
import os
import zipfile
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "caaspp-data")

BAY_COUNTIES = {
    "01": "Alameda", "07": "Contra Costa", "21": "Marin", "28": "Napa",
    "38": "San Francisco", "41": "San Mateo", "43": "Santa Clara",
    "48": "Solano", "49": "Sonoma",
}

ELEM_GRADES = {"3", "4", "5"}
MIDHIGH_GRADES = {"6", "7", "8", "11"}


def _open_year(year):
    """Yield parsed rows of the CAASPP file for a year, from the zip or the extracted txt."""
    txt = os.path.join(DATA, f"sb_ca{year}_1_csv_v1.txt")
    zp = os.path.join(DATA, f"caaspp{year}.zip")
    if os.path.exists(txt):
        fh = open(txt, encoding="utf-8", errors="ignore")
        close = [fh]
    elif os.path.exists(zp):
        z = zipfile.ZipFile(zp)
        name = [n for n in z.namelist() if n.endswith(".txt")][0]
        import io
        fh = io.TextIOWrapper(z.open(name), encoding="utf-8", errors="ignore")
        close = [fh, z]
    else:
        raise FileNotFoundError(f"no CAASPP data for {year} in {DATA}")
    hdr = fh.readline().rstrip("\n").split("^")
    idx = {h: i for i, h in enumerate(hdr)}
    for line in fh:
        p = line.rstrip("\n").split("^")
        if len(p) < len(hdr):
            continue
        yield p, idx
    for c in close:
        c.close()


def _f(v):
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


# The 2023 and 2025 files use different column names for the same quantities, and 2023 has no
# "Type ID" column at all -- a district row is identified there by a zero school code. These
# helpers hide that difference so both years parse through one code path.
_ALIASES = {
    "enrolled": ("Total Students Enrolled", "Students Enrolled"),
    "tested": ("Total Students Tested", "Students Tested"),
    "pct_met_above": ("Percentage Standard Met and Above",),
}


def _get(p, idx, field):
    for name in _ALIASES[field]:
        if name in idx:
            return p[idx[name]]
    return None


def _is_district_row(p, idx):
    if "Type ID" in idx:
        return p[idx["Type ID"]] == "6"
    # 2023 layout: district total = non-zero district code with a zero school code
    return p[idx["District Code"]] not in ("00000", "0000000") and \
        p[idx["School Code"]] in ("0000000", "000000", "0")


def district_scores(year=2025):
    """
    -> {(county_code, district_code): {name, county, elem_pct, midhigh_pct, tested_elem,
                                       tested_midhigh, enrolled}}
    elem_pct / midhigh_pct = percent meeting or exceeding standard, ELA and Math averaged,
    enrolment-weighted across the grades in the band.
    """
    # acc[(cc,dc)][band][test] = [sum(pct*tested), sum(tested)]
    acc = defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: [0.0, 0.0])))
    names = {}
    enrolled = defaultdict(float)
    for p, idx in _open_year(year):
        if not _is_district_row(p, idx):      # districts only
            continue
        cc = p[idx["County Code"]]
        if cc not in BAY_COUNTIES:
            continue
        dc = p[idx["District Code"]]
        key = (cc, dc)
        if "District Name" in idx:
            names[key] = p[idx["District Name"]].strip()
        grade = p[idx["Grade"]]
        test = p[idx["Test ID"]]

        if grade == "13" and test == "1":
            # all-grades row, ELA -- use for the enrolment trend series
            e = _f(_get(p, idx, "enrolled"))
            if e:
                enrolled[key] += e
            continue

        band = "elem" if grade in ELEM_GRADES else ("midhigh" if grade in MIDHIGH_GRADES else None)
        if band is None:
            continue
        pct = _f(_get(p, idx, "pct_met_above"))
        tested = _f(_get(p, idx, "tested"))
        if pct is None or not tested:
            continue
        acc[key][band][test][0] += pct * tested
        acc[key][band][test][1] += tested

    out = {}
    for key, bands in acc.items():
        rec = {"name": names.get(key), "county": BAY_COUNTIES[key[0]],
               "county_code": key[0], "district_code": key[1],
               "enrolled": enrolled.get(key) or None}
        for band in ("elem", "midhigh"):
            per_test, tested_total = [], 0.0
            for test in ("1", "2"):
                s, n = bands.get(band, {}).get(test, [0.0, 0.0])
                if n:
                    per_test.append(s / n)
                    tested_total = max(tested_total, n)
            rec[f"{band}_pct"] = round(sum(per_test) / len(per_test), 2) if per_test else None
            rec[f"{band}_tested"] = int(tested_total) or None
        out[key] = rec
    return out


def enrolment_trend(y_old=2023, y_new=2025):
    """-> {(cc,dc): {'old':n,'new':n,'pct_change':x}} tested-grade enrolment change."""
    def totals(year):
        t = defaultdict(float)
        for p, idx in _open_year(year):
            if not _is_district_row(p, idx):
                continue
            cc = p[idx["County Code"]]
            if cc not in BAY_COUNTIES:
                continue
            if p[idx["Grade"]] != "13" or p[idx["Test ID"]] != "1":
                continue
            e = _f(_get(p, idx, "enrolled"))
            if e:
                t[(cc, p[idx["District Code"]])] += e
        return t

    old, new = totals(y_old), totals(y_new)
    out = {}
    for key in set(old) | set(new):
        o, n = old.get(key), new.get(key)
        if o and n and o >= 100:      # ignore tiny districts where noise swamps the signal
            out[key] = {"old": int(o), "new": int(n),
                        "pct_change": round(100.0 * (n - o) / o, 1)}
    return out


def statewide_bands(year=2025):
    """
    Percent-meeting-standard for EVERY California district, split into the same two grade bands.

    Used only to convert a district's CAASPP percentage into a familiar 1-10 rating. The decile
    is taken against the whole state, not against the Bay Area, so a "7" here means the same
    thing a GreatSchools 7 is meant to mean: better than roughly 70% of California districts.
    Ranking within this spreadsheet still uses the underlying percentage, not the rounded rating.
    """
    acc = defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: [0.0, 0.0])))
    for p, idx in _open_year(year):
        if not _is_district_row(p, idx):
            continue
        grade = p[idx["Grade"]]
        band = "elem" if grade in ELEM_GRADES else ("midhigh" if grade in MIDHIGH_GRADES else None)
        if band is None:
            continue
        pct = _f(_get(p, idx, "pct_met_above"))
        tested = _f(_get(p, idx, "tested"))
        if pct is None or not tested:
            continue
        key = (p[idx["County Code"]], p[idx["District Code"]])
        acc[key][band][p[idx["Test ID"]]][0] += pct * tested
        acc[key][band][p[idx["Test ID"]]][1] += tested

    bands = {"elem": [], "midhigh": []}
    for key, b in acc.items():
        for band in bands:
            per_test, tested = [], 0.0
            for test in ("1", "2"):
                s, n = b.get(band, {}).get(test, [0.0, 0.0])
                if n:
                    per_test.append(s / n)
                    tested = max(tested, n)
            # districts with a handful of tested students are noise, not signal
            if per_test and tested >= 50:
                bands[band].append(sum(per_test) / len(per_test))
    for band in bands:
        bands[band].sort()
    return bands


def rating_10(pct, distribution):
    """CAASPP percent-meeting-standard -> 1-10 statewide decile rating."""
    if pct is None or not distribution:
        return None
    below = sum(1 for v in distribution if v < pct)
    decile = int(10.0 * below / len(distribution)) + 1
    return max(1, min(10, decile))


def build():
    """Merged district record keyed by lowercased district name."""
    sc = district_scores(2025)
    tr = enrolment_trend()
    dist = statewide_bands(2025)
    by_name = {}
    for key, rec in sc.items():
        rec = dict(rec)
        t = tr.get(key)
        rec["enrol_pct_change_23_25"] = t["pct_change"] if t else None
        rec["enrol_2023"] = t["old"] if t else None
        rec["enrol_2025"] = t["new"] if t else None
        # a band with almost nobody tested is noise; drop it rather than rate it
        for band in ("elem", "midhigh"):
            if (rec.get(f"{band}_tested") or 0) < 25:
                rec[f"{band}_pct"] = None
        rec["elem_rating_10"] = rating_10(rec.get("elem_pct"), dist["elem"])
        rec["midhigh_rating_10"] = rating_10(rec.get("midhigh_pct"), dist["midhigh"])
        if rec["name"]:
            by_name[rec["name"].strip().lower()] = rec
    return by_name


if __name__ == "__main__":
    d = build()
    print(f"{len(d)} Bay Area districts with CAASPP 2025 data\n")
    hdr = f"{'district':52s} {'county':13s} {'elem%':>6} {'mh%':>6} {'enrol':>7} {'d23-25%':>8}"
    print(hdr)
    print("-" * len(hdr))
    for name, r in sorted(d.items(), key=lambda kv: -(kv[1]["elem_pct"] or 0)):
        if not (r["elem_pct"] or r["midhigh_pct"]):
            continue
        print(f"{(r['name'] or '')[:52]:52s} {r['county'][:13]:13s} "
              f"{r['elem_pct'] if r['elem_pct'] is not None else float('nan'):6.1f} "
              f"{r['midhigh_pct'] if r['midhigh_pct'] is not None else float('nan'):6.1f} "
              f"{int(r['enrolled'] or 0):7d} "
              f"{r['enrol_pct_change_23_25'] if r['enrol_pct_change_23_25'] is not None else float('nan'):8.1f}")
