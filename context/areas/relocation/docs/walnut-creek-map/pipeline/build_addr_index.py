"""Compact street address-range index for in-page geocoding of new sheet rows.

usage: build_addr_index.py <addrfeat.shp> <out.json>
Output: {"v": vintage, "s": {normalised street: [[lf,lt,rf,rt,zipL,zipR,[lon,lat,...]], ...]}}
Coordinates are integers: round((lon+122.2)*1e5), round((lat-37.8)*1e5).
"""
import json, os, sys
import shapefile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from addr import SUFFIX, DIRS

W, S_, E, N = -122.14, 37.83, -121.97, 37.97
src, out = sys.argv[1], sys.argv[2]


def norm_street(name):
    words = name.lower().replace(".", "").split()
    res = []
    for w in words:
        if w == "mount":
            w = "mt"
        w = DIRS.get(w, w)
        w = SUFFIX.get(w, w)
        res.append(w)
    return " ".join(res)


def num(v):
    try:
        return int(str(v).strip())
    except Exception:
        return None


r = shapefile.Reader(src)
fields = [f[0] for f in r.fields[1:]]
idx = {f: i for i, f in enumerate(fields)}
streets = {}
n = 0
for sr in r.iterShapeRecords():
    pts = sr.shape.points
    if not pts:
        continue
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    if max(xs) < W or min(xs) > E or max(ys) < S_ or min(ys) > N:
        continue
    rec = sr.record
    name = (rec[idx["FULLNAME"]] or "").strip()
    if not name:
        continue
    lf, lt, rf, rt = (num(rec[idx[k]]) for k in ("LFROMHN", "LTOHN", "RFROMHN", "RTOHN"))
    if lf is None and rf is None:
        continue
    zl, zr = (rec[idx["ZIPL"]] or ""), (rec[idx["ZIPR"]] or "")
    flat = []
    for x, y in pts:
        flat += [round((x + 122.2) * 1e5), round((y - 37.8) * 1e5)]
    streets.setdefault(norm_street(name), []).append([lf, lt, rf, rt, zl, zr, flat])
    n += 1
json.dump({"v": "TIGER/Line 2025 ADDRFEAT, Contra Costa County", "s": streets},
          open(out, "w"), separators=(",", ":"))
print(n, "segments", len(streets), "streets", os.path.getsize(out) // 1024, "KB")
