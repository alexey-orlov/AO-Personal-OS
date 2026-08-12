# -*- coding: utf-8 -*-
"""
Flag implausible researched cells so they can be re-verified adversarially.

A number that arrived with a source attached is still wrong if it fails a physical sanity check.
This produces the work-list for the verification pass.
"""
import json, os, sys, statistics
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from places import PLACES

KIND = {p[0]: p[2] for p in PLACES}
COUNTY = {p[0]: p[1] for p in PLACES}
POP = {p[0]: p[5] for p in PLACES}


def num(x):
    try:
        return float(str(x).replace(",", "").replace("$", "")) if x is not None else None
    except Exception:
        return None


def check(research_path=f"{HERE}/research.json"):
    R = json.load(open(research_path))
    rows = R["places"]
    flags = []

    r2 = [num(r.get("rent_2br_usd")) for r in rows]
    r2 = [v for v in r2 if v]
    med2 = statistics.median(r2) if r2 else 3500

    for r in rows:
        p = r.get("place", "?")
        a, b = num(r.get("rent_2br_usd")), num(r.get("rent_3br_usd"))
        v, pr = num(r.get("violent_crime_per_1k")), num(r.get("property_crime_per_1k"))
        issues = []

        if a and b and b < a * 0.95:
            issues.append(f"3BR ${b:,.0f} below 2BR ${a:,.0f} - implausible bedroom ordering")
        if a and not (900 <= a <= 20000):
            issues.append(f"2BR ${a:,.0f} outside plausible $900-$20,000")
        if b and not (1200 <= b <= 30000):
            issues.append(f"3BR ${b:,.0f} outside plausible $1,200-$30,000")
        if a and a < med2 * 0.45:
            issues.append(f"2BR ${a:,.0f} is <45% of the dataset median ${med2:,.0f}")
        if a and a > med2 * 2.2:
            issues.append(f"2BR ${a:,.0f} is >2.2x the dataset median ${med2:,.0f}")
        if v is not None and not (0 <= v <= 40):
            issues.append(f"violent crime {v}/1k outside 0-40 (possible per-100k unit error)")
        if pr is not None and not (0 <= pr <= 200):
            issues.append(f"property crime {pr}/1k outside 0-200")
        if v is not None and pr is not None and v > pr:
            issues.append(f"violent {v}/1k exceeds property {pr}/1k - very unusual, check units")
        if (r.get("notes") or "").lower().count("conflict"):
            issues.append("agent flagged a cross-source conflict in notes")

        if issues:
            flags.append({
                "place": p, "county": COUNTY.get(p), "kind": KIND.get(p), "pop": POP.get(p),
                "rent_2br": a, "rent_3br": b, "violent": v, "property": pr,
                "sources": [r.get("rent_2br_source"), r.get("rent_3br_source"), r.get("crime_source")],
                "issues": issues,
            })
    return rows, flags


if __name__ == "__main__":
    rows, flags = check()
    print(f"{len(rows)} researched rows, {len(flags)} flagged\n")
    for f in flags:
        print(f"  {f['place']} ({f['county']})")
        for i in f["issues"]:
            print(f"      - {i}")
    with open(f"{HERE}/flags.json", "w") as fh:
        json.dump(flags, fh, indent=1)
    print(f"\nwrote {HERE}/flags.json")
