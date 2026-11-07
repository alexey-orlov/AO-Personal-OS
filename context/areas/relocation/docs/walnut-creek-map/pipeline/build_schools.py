"""School layers for the map.

usage: build_schools.py <scratch_dir> <out_dir>
Writes <out_dir>/schools.json with compact layers:
  mid    — middle/intermediate school zones (one feature per school)
  elem   — elementary zones (for the card lookup; WCSD/LSD from the 2015-16 federal map)
  assign — district + middle + high assignment polygons (for the card lookup)
  pts    — school locations (middle, K-8 and elementary)
"""
import json, os, sys
from collections import defaultdict
from shapely.geometry import shape, box, mapping, Point
from shapely.ops import unary_union
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from geo_common import *
from encode import encode_fc

S, OUT = sys.argv[1], sys.argv[2]
CLIP = box(-122.135, 37.835, -121.975, 37.965)
D = f"{S}/data"

FEEDER = {  # Acalanes study areas: elementary district -> its middle school
    "Walnut Creek School District": ("Walnut Creek Intermediate", "Walnut Creek SD"),
    "Lafayette School District": ("Stanley Middle", "Lafayette SD"),
    "Moraga School District": ("Joaquin Moraga Intermediate", "Moraga SD"),
    "Orinda Union School District": ("Orinda Intermediate", "Orinda Union SD"),
    "Canyon Elementary School": ("Canyon School (K-8)", "Canyon SD"),
}
MID_NAME = {"Foothill MS": "Foothill Middle", "Oak Grove MS": "Oak Grove Middle",
            "Pleasant Hill MS": "Pleasant Hill Middle", "Valley View MS": "Valley View Middle",
            "El Dorado MS": "El Dorado Middle", "Pine Hollow MS": "Pine Hollow Middle",
            "Diablo View MS": "Diablo View Middle", "Riverview MS": "Riverview Middle",
            "Stone Valley MS": "Stone Valley Middle", "Los Cerros MS": "Los Cerros Middle",
            "Charlotte Wood MS": "Charlotte Wood Middle", "Diablo Vista MS": "Diablo Vista Middle"}
HIGH_NAME = {"Las Lomas HS": "Las Lomas High", "Acalanes HS": "Acalanes High", "Campolindo HS": "Campolindo High",
             "Miramonte HS": "Miramonte High", "Northgate HS": "Northgate High", "College Park HS": "College Park High",
             "Ygnacio Valley HS": "Ygnacio Valley High", "Mt Diablo HS": "Mt. Diablo High", "Concord HS": "Concord High",
             "CVCHS  NonAssigned": "No assigned high school (Clayton Valley area: choose an MDUSD high school)",
             "San Ramon HS": "San Ramon Valley High", "Monte Vista HS": "Monte Vista High"}
HIGH_DIST = {"Las Lomas High": "Acalanes UHSD", "Acalanes High": "Acalanes UHSD", "Campolindo High": "Acalanes UHSD",
             "Miramonte High": "Acalanes UHSD", "San Ramon Valley High": "San Ramon Valley USD",
             "Monte Vista High": "San Ramon Valley USD"}

mid = defaultdict(list); assign = defaultdict(list); elem = defaultdict(list)


def clipped(f):
    g = f.get("geometry")
    if not g:
        return None
    s = shape(g).buffer(0)
    s = s.intersection(CLIP)
    return None if s.is_empty else s


# MDUSD — current locator
for f in load_features(f"{D}/ssl/mdusd_studyareas.geojson"):
    p = f["properties"]
    if not p.get("DISTRICT") or not p.get("MID_DESC"):
        continue
    g = clipped(f)
    if g is None:
        continue
    m = MID_NAME.get(p["MID_DESC"], p["MID_DESC"])
    h = HIGH_NAME.get(p.get("HIGH_DESC") or "", p.get("HIGH_DESC") or "")
    mid[(m, "Mt. Diablo USD", "cur")].append(g)
    assign[("Mt. Diablo USD", m, h, "Mt. Diablo USD")].append(g)
    if p.get("ELEM_DESC"):
        e = p["ELEM_DESC"].replace(" ES", " Elementary")
        elem[(e, "Mt. Diablo USD", "cur")].append(g)

# Acalanes UHSD feeders — current locator (district level only for elementary)
acal_by_district = defaultdict(list)
for f in load_features(f"{D}/ssl/acalanes_studyareas.geojson"):
    p = f["properties"]
    ed = p.get("ELEM_DESC")
    if not p.get("DISTRICT") or ed not in FEEDER:
        continue
    g = clipped(f)
    if g is None:
        continue
    m, dist = FEEDER[ed]
    h = HIGH_NAME.get(p.get("HIGH_DESC") or "", p.get("HIGH_DESC") or "")
    mid[(m, dist, "cur")].append(g)
    assign[(dist, m, h, HIGH_DIST.get(h, ""))].append(g)
    acal_by_district[dist].append(g)

# San Ramon Valley USD — locator copy from 2016-17
for f in load_features(f"{D}/ssl/srvusd1617_studyareas.geojson"):
    p = f["properties"]
    if not p.get("DISTRICT") or not p.get("MID_DESC"):
        continue
    g = clipped(f)
    if g is None:
        continue
    m = MID_NAME.get(p["MID_DESC"], p["MID_DESC"])
    h = HIGH_NAME.get(p.get("HIGH_DESC") or "", p.get("HIGH_DESC") or "")
    mid[(m, "San Ramon Valley USD", "2016-17")].append(g)
    assign[("San Ramon Valley USD", m, h, "San Ramon Valley USD")].append(g)
    if p.get("ELEM_DESC"):
        elem[(p["ELEM_DESC"].replace(" ES", " Elementary"), "San Ramon Valley USD", "2016-17")].append(g)

# WCSD / Lafayette SD elementary zones — NCES 2015-16 survey, clipped to today's district outline
dist_area = {k: unary_union(v) for k, v in acal_by_district.items()}
for f in load_features(f"{D}/sabs/wc_sabs.geojson"):
    p = f["properties"]
    if p.get("level") != "1" or p.get("leaid") not in ("0641250", "0620310"):
        continue
    dist = "Walnut Creek SD" if p["leaid"] == "0641250" else "Lafayette SD"
    g = clipped(f)
    if g is None or dist not in dist_area:
        continue
    g = g.intersection(dist_area[dist])
    if g.is_empty:
        continue
    name = p["schnam"].replace(" Elementary", "") + (" Elementary" if "Tice" not in p["schnam"] else " (K-8)")
    elem[(name, dist, "2015-16")].append(g)


def fc_from(groups, keys):
    feats = []
    for k, gs in groups.items():
        g = to_deg(to_m(unary_union(gs).buffer(0)).buffer(0.5).buffer(-0.5).simplify(3))
        if g.is_empty:
            continue
        feats.append({"type": "Feature", "properties": dict(zip(keys, k)), "geometry": rnd(g, 5)})
    return {"type": "FeatureCollection", "features": feats}


mid_fc = fc_from(mid, ("s", "d", "v"))
assign_fc = fc_from(assign, ("d", "m", "h", "hd"))
elem_fc = fc_from(elem, ("e", "d", "v"))

# colour slots: neighbours never share a slot; Walnut Creek Intermediate takes slot 0 (blue)
from shapely.ops import polylabel
mgeo = [to_m(shape(f["geometry"])) for f in mid_fc["features"]]
order = sorted(range(len(mgeo)), key=lambda i: (mid_fc["features"][i]["properties"]["s"] != "Walnut Creek Intermediate", -mgeo[i].area))
slot = {}
for i in order:
    near = {slot[j] for j in slot if mgeo[i].buffer(60).intersects(mgeo[j])}
    slot[i] = next(c for c in (0, 2, 1, 6, 4, 5, 3, 7) if c not in near)
mid_labels = []
for i, f in enumerate(mid_fc["features"]):
    f["properties"]["c"] = slot[i]
    vis = to_m(shape(f["geometry"]).intersection(box(-122.12, 37.85, -121.99, 37.95)))
    part = largest_polygon(vis) if not vis.is_empty else None
    part = part or largest_polygon(mgeo[i])
    lp = to_deg(polylabel(part, tolerance=10))
    mid_labels.append({"type": "Feature", "properties": {"s": f["properties"]["s"], "d": f["properties"]["d"], "c": slot[i]},
                       "geometry": {"type": "Point", "coordinates": [round(lp.x, 5), round(lp.y, 5)]}})

pts = []
for fn in ("mdusd_schools.geojson", "acalanes_schools.geojson"):
    for f in load_features(f"{D}/ssl/{fn}"):
        p = f["properties"]
        if p.get("SCHL_STATUS") not in ("RGLR",) or not f.get("geometry"):
            continue
        typ = p.get("SCHL_TYPE")
        if typ not in ("MS", "K8", "ES", "HS"):
            continue
        x, y = f["geometry"]["coordinates"]
        if not CLIP.contains(Point(x, y)):
            continue
        name = p.get("FULLNAME") or p.get("NAME")
        name = name.replace("MH Stanley Middle School", "Stanley Middle").replace(" School", "") \
                   .replace("Walnut Creek Intermediate", "Walnut Creek Intermediate")
        pts.append({"type": "Feature", "properties": {"n": name, "k": typ, "gr": p.get("GRD_RANGE") or "",
                    "a": f"{p.get('ADDRESS') or ''}, {p.get('CITY') or ''}".strip(", ")},
                    "geometry": {"type": "Point", "coordinates": [round(x, 5), round(y, 5)]}})

os.makedirs(OUT, exist_ok=True)
out = {"mid": encode_fc(mid_fc), "elem": encode_fc(elem_fc), "assign": encode_fc(assign_fc),
       "pts": encode_fc({"type": "FeatureCollection", "features": pts}),
       "midLabels": encode_fc({"type": "FeatureCollection", "features": mid_labels})}
print("slots", sorted((f["properties"]["s"], f["properties"]["c"]) for f in mid_fc["features"]))
json.dump(out, open(f"{OUT}/schools.json", "w"), separators=(",", ":"), ensure_ascii=False)
print("mid", sorted((f["properties"]["s"], f["properties"]["d"], f["properties"]["v"]) for f in mid_fc["features"]))
print("assign", len(assign_fc["features"]), "elem", len(elem_fc["features"]), "pts", len(pts))
print(sorted(set((f["properties"]["e"], f["properties"]["v"]) for f in elem_fc["features"] if f["properties"]["d"] != "Mt. Diablo USD")))
print(os.path.getsize(f"{OUT}/schools.json") // 1024, "KB")
