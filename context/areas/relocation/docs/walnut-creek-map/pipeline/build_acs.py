"""Block-group housing profile (ACS 2020-2024 5-year) for the map area.

usage: build_acs.py <acs_dir> <out.geojson>
Reads B25024 (units in structure), B25035 (median year built), B25003 (tenure)
from the table-based summary files and joins them to TIGERweb block groups.
"""
import json, sys

acs, out = sys.argv[1], sys.argv[2]
PREFIX = "1500000US06013"


def read(table):
    rows = {}
    with open(f"{acs}/{table}.dat") as f:
        hdr = f.readline().rstrip("\n").split("|")
        for line in f:
            if not line.startswith(PREFIX):
                continue
            v = line.rstrip("\n").split("|")
            rows[v[0][9:]] = dict(zip(hdr, v))
    return rows


def num(x):
    try:
        return float(x)
    except Exception:
        return None


u = read("b25024"); y = read("b25035"); t = read("b25003")
bgs = json.load(open(f"{acs}/bg.geojson"))["features"]
feats = []
for f in bgs:
    g = f["properties"]["GEOID"]
    a = u.get(g); b = y.get(g); c = t.get(g)
    if not a:
        continue
    E = lambda k: num(a.get(f"B25024_E{k:03d}")) or 0
    p = {
        "geoid": g,
        "units": E(1), "sfd": E(2), "sfa": E(3), "u2_4": E(4) + E(5),
        "u5_19": E(6) + E(7), "u20p": E(8) + E(9), "mobile": E(10) + E(11),
        "yr": num(b.get("B25035_E001")) if b else None,
        "occ": num(c.get("B25003_E001")) if c else None,
        "rent": num(c.get("B25003_E003")) if c else None,
    }
    if p["yr"] is not None and p["yr"] < 1900:   # annotation codes, not years
        p["yr"] = None
    feats.append({"type": "Feature", "properties": p, "geometry": f["geometry"]})
json.dump({"type": "FeatureCollection", "features": feats}, open(out, "w"))
print(len(feats), "block groups with ACS")
