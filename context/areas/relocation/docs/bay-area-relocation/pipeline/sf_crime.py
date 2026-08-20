# -*- coding: utf-8 -*-
"""
Violent and property crime for all 41 San Francisco neighbourhoods, from SFPD incident reports.

Why not the aggregators
-----------------------
CrimeGrade and AreaVibes publish city-level pages reliably but their San Francisco NEIGHBOURHOOD
pages mostly 404, which left a third of the city with no crime figure at all. San Francisco
publishes the underlying police data itself, on DataSF, and -- critically -- tags every incident
with its **Analysis Neighborhood**, which is the exact geography these 41 rows are built on. So
the primary source is both available and a perfect join, with no name matching required.

Comparability, which is the real hazard
---------------------------------------
The non-San-Francisco places in this table carry CrimeGrade rates, which are derived from FBI
Part I definitions. SFPD's "Assault" category includes simple assault, which FBI violent crime
excludes, so a raw SFPD-derived rate is NOT on the same scale as a CrimeGrade rate. Ranking the
two against each other unadjusted would make every San Francisco neighbourhood look more violent
than it is, purely from a definitional difference.

So the SFPD rates are CALIBRATED onto the CrimeGrade scale: for the neighbourhoods where both
sources exist, the ratio between them is measured, and the median ratio is applied to all 41.
The calibration factor and the size of the overlap it was fitted on are reported, so the
adjustment is visible rather than buried.

Window: the most recent complete 12 months, so seasonality cannot tilt one neighbourhood.
"""
import json
import os
import statistics
import subprocess
import urllib.parse

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "sf-crime-counts.json")

DATASET = "https://data.sfgov.org/resource/wg3w-h783.json"
VIOLENT = ("Assault", "Robbery", "Homicide", "Rape")
PROPERTY = ("Larceny Theft", "Motor Vehicle Theft", "Burglary", "Arson")
WINDOW = ("2025-07-01T00:00:00", "2026-07-01T00:00:00")


def fetch_counts(force=False):
    """Incident counts per Analysis Neighborhood for the window. Cached on disk."""
    if os.path.exists(CACHE) and not force:
        return json.load(open(CACHE))
    cats = "','".join(VIOLENT + PROPERTY)
    where = (f"incident_date between '{WINDOW[0]}' and '{WINDOW[1]}' "
             f"AND incident_category in('{cats}')")
    q = urllib.parse.urlencode({
        "$select": "analysis_neighborhood,incident_category,count(*)",
        "$where": where,
        "$group": "analysis_neighborhood,incident_category",
        "$limit": 2000,
    })
    out = subprocess.run(["curl", "-s", "--max-time", "90", f"{DATASET}?{q}"],
                         capture_output=True, text=True).stdout
    data = json.loads(out)
    payload = {"window": WINDOW, "rows": data}
    with open(CACHE, "w") as f:
        json.dump(payload, f, indent=1)
    return payload


def rates(populations, force=False):
    """
    -> {neighbourhood: {'violent_raw': per1k, 'property_raw': per1k, 'incidents': n}}
    Raw = SFPD definitions, before calibration onto the CrimeGrade scale.
    """
    payload = fetch_counts(force=force)
    agg = {}
    for r in payload["rows"]:
        n = r.get("analysis_neighborhood")
        if not n:
            continue
        cur = agg.setdefault(n, {"v": 0, "p": 0})
        cur["v" if r["incident_category"] in VIOLENT else "p"] += int(r["count"])
    out = {}
    for n, c in agg.items():
        pop = populations.get(n)
        if not pop:
            continue
        out[n] = {"violent_raw": 1000.0 * c["v"] / pop,
                  "property_raw": 1000.0 * c["p"] / pop,
                  "incidents": c["v"] + c["p"]}
    return out


def calibrate(sf_rates, reference):
    """
    Put SFPD-derived rates on the same scale as the CrimeGrade rates used elsewhere.

    reference: {neighbourhood: (violent_per1k, property_per1k)} from CrimeGrade, for whichever
    neighbourhoods it actually published. The median source-to-source ratio on that overlap
    becomes the factor applied to all 41.
    """
    vr, pr = [], []
    for n, (v_ref, p_ref) in reference.items():
        got = sf_rates.get(n)
        if not got:
            continue
        if v_ref and got["violent_raw"] > 0:
            vr.append(v_ref / got["violent_raw"])
        if p_ref and got["property_raw"] > 0:
            pr.append(p_ref / got["property_raw"])
    kv = statistics.median(vr) if len(vr) >= 3 else 1.0
    kp = statistics.median(pr) if len(pr) >= 3 else 1.0
    for n, r in sf_rates.items():
        r["violent"] = r["violent_raw"] * kv
        r["property"] = r["property_raw"] * kp
    return {"violent_factor": kv, "property_factor": kp,
            "overlap_violent": len(vr), "overlap_property": len(pr)}


if __name__ == "__main__":
    import sys
    sys.path.insert(0, HERE)
    from places import PLACES
    pops = {p[0]: p[5] for p in PLACES if p[2] == "sf_hood"}
    R = rates(pops, force="--refresh" in sys.argv)

    research = json.load(open(os.path.join(HERE, "research.json")))
    ref = {}
    for r in research["places"]:
        n = (r.get("place") or "").strip()
        if n in pops and r.get("violent_crime_per_1k") and r.get("property_crime_per_1k"):
            src = (r.get("crime_source") or "").lower()
            if "crimegrade" in src:
                ref[n] = (float(r["violent_crime_per_1k"]), float(r["property_crime_per_1k"]))
    info = calibrate(R, ref)
    print(f"SFPD window {WINDOW[0][:10]} .. {WINDOW[1][:10]}, {len(R)} neighbourhoods")
    print(f"calibration to CrimeGrade scale: violent x{info['violent_factor']:.3f} "
          f"(n={info['overlap_violent']}), property x{info['property_factor']:.3f} "
          f"(n={info['overlap_property']})\n")
    print(f"{'neighbourhood':34s} {'violent':>8} {'property':>9}   {'(raw SFPD)':>18}")
    for n, r in sorted(R.items(), key=lambda kv: kv[1]["violent"]):
        print(f"{n[:34]:34s} {r['violent']:8.2f} {r['property']:9.2f}   "
              f"{r['violent_raw']:8.2f}/{r['property_raw']:.1f}")
