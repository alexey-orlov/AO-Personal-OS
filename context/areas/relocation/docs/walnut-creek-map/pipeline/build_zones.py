"""Neighbourhood zones from the profiled faces plus a hand-made grouping/naming spec.

usage: build_zones.py <scratch_dir> <spec.json> <out_dir>
spec: {"zones": [{"name": ..., "faces": [ids], "note": optional}], ...}
Faces not named in the spec become their own zone labelled "Area <id>" (debug pass).
Each zone gets its housing mix re-aggregated from its faces, a character line derived
from that mix, a label point (polylabel), and a school-zone colour slot is NOT set here.
Writes <out_dir>/zones.json (compact layers "zones" and "labels").
"""
import json, os, sys
from shapely.geometry import shape, Point, mapping
from shapely.ops import unary_union, polylabel
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from geo_common import *
from encode import encode_fc

S, SPEC, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
faces = {f["properties"]["id"]: f for f in load_features(f"{S}/build/faces.geojson")}
spec = json.load(open(SPEC)) if os.path.exists(SPEC) else {"zones": []}
used = set()
groups = []
for z in spec["zones"]:
    ids = [i for i in z["faces"] if i in faces]
    used.update(ids)
    groups.append((z, ids))
for i in sorted(faces):
    if i not in used:
        groups.append(({"name": f"Area {i}", "debug": True}, [i]))

MIXK = ("sfd", "sfa", "u2_4", "u5_19", "u20p", "mobile")
PLACES = [(f["properties"]["NAME"], to_m(shape(f["geometry"])).buffer(0))
          for fn in ("places_inc", "places_cdp") for f in load_features(f"{S}/data/tiger/{fn}.geojson")]


def character(p, z):
    if z.get("sub"):
        return z["sub"]
    u = p.get("units") or 0
    if u < 60:
        return "Open space and a few homes" if p.get("open", 0) > 0.4 else "Few homes"
    sf = p["mix"]["sfd"]; th = p["mix"]["sfa"] + p["mix"]["u2_4"]
    apt = p["mix"]["u5_19"] + p["mix"]["u20p"]
    if sf >= 0.75:
        kind = "Single-family houses"
    elif sf >= 0.55:
        kind = "Mostly houses, some apartments" if apt > th else "Mostly houses, some townhomes"
    elif apt >= 0.6:
        kind = "Large apartment complexes" if p["mix"]["u20p"] >= 0.45 else "Apartment buildings"
    elif th >= 0.45:
        kind = "Townhomes and small multiplexes"
    else:
        kind = "Mixed houses, townhomes, apartments"
    era = ""
    if p.get("yr"):
        y = p["yr"]
        era = f"built ~{y // 10 * 10}s" if y < 2000 else "built 2000s+"
    return f"{kind} · {era}" if era else kind


zones, labels = [], []
for n, (z, ids) in enumerate(groups, 1):
    geoms = [to_m(shape(faces[i]["geometry"])).buffer(0) for i in ids]
    g = unary_union([x.buffer(1.5) for x in geoms]).buffer(-1.5)
    agg = {k: 0.0 for k in MIXK}; units = 0; occ = 0; rent = 0; yr_sum = 0; yr_w = 0; area = 0; openA = 0
    for i in ids:
        p = faces[i]["properties"]
        u = p.get("units") or 0
        units += u; area += p["km2"]; openA += (p.get("lu_open") or 0) * p["km2"]
        for k in MIXK:
            agg[k] += (p.get("p_" + k) or 0) * u
        if p.get("renters") is not None:
            occ += u; rent += p["renters"] * u
        if p.get("yr"):
            yr_sum += p["yr"] * u; yr_w += u
    props = {"id": n, "name": z["name"], "km2": round(area, 2), "units": round(units),
             "mix": {k: round(agg[k] / units, 2) if units else 0 for k in MIXK},
             "yr": round(yr_sum / yr_w) if yr_w else None,
             "rent": round(rent / occ, 2) if occ else None,
             "open": round(openA / area, 2) if area else 0,
             "faces": ids}
    if z.get("note"):
        props["note"] = z["note"]
    if z.get("debug"):
        props["debug"] = 1
    if z.get("flag"):
        props["flag"] = z["flag"]
    if z.get("open"):
        props["openSpace"] = 1
    share = {name: g.intersection(pg).area / g.area for name, pg in PLACES if g.intersects(pg)}
    city = share.get("Walnut Creek city", 0)
    if city >= 0.6:
        props["juris"] = "City of Walnut Creek"
    else:
        cdp = max((k for k in share if k.endswith(" CDP")), key=lambda k: share[k], default=None)
        props["juris"] = "Unincorporated Contra Costa County" + (f" ({cdp[:-4]})" if cdp else "")
    props["sub"] = character(props, z)
    zones.append({"type": "Feature", "properties": props, "geometry": rnd(to_deg(g.simplify(3)), 5)})
    part = largest_polygon(g)
    lp = to_deg(polylabel(part, tolerance=8))
    labels.append({"type": "Feature", "properties": {"id": n, "name": z["name"], "sub": props["sub"]},
                   "geometry": {"type": "Point", "coordinates": [round(lp.x, 5), round(lp.y, 5)]}})

os.makedirs(OUT, exist_ok=True)
json.dump({"zones": encode_fc({"type": "FeatureCollection", "features": zones}),
           "labels": encode_fc({"type": "FeatureCollection", "features": labels})},
          open(f"{OUT}/zones.json", "w"), separators=(",", ":"), ensure_ascii=False)
print(len(zones), "zones;", sum(1 for z in zones if z["properties"].get("debug")), "unnamed")
for z in zones:
    p = z["properties"]
    if not p.get("debug"):
        print(f"  {p['name']:34} {p['km2']:6} km2 units {p['units']:5}  {p['sub']}")
