"""Cut the Walnut Creek study area into faces along major roads, creeks, canal and BART,
merge slivers, and profile each face (buildings, land use, ACS housing mix).

usage: build_faces.py <scratch_dir>      -> build/faces.geojson
"""
import json, math, os, statistics, sys
from collections import Counter, defaultdict
from shapely.geometry import shape, Point, mapping
from shapely.ops import unary_union
from shapely.strtree import STRtree
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from geo_common import *

S = sys.argv[1]
D = f"{S}/data"

STUDY = {"Walnut Creek city", "Shell Ridge CDP", "Acalanes Ridge CDP", "Contra Costa Centre CDP",
         "Castle Hill CDP", "North Gate CDP", "San Miguel CDP", "Saranap CDP"}
places = load_features(f"{D}/tiger/places_inc.geojson") + load_features(f"{D}/tiger/places_cdp.geojson")
study = to_m(unary_union([shape(f["geometry"]).buffer(0) for f in places if f["properties"]["NAME"] in STUDY]))
study = study.buffer(1).buffer(-1)

MAJOR = {"motorway", "trunk", "primary", "secondary"}
TERTIARY = {"Walnut Avenue", "Walnut Boulevard", "Tice Valley Boulevard", "San Miguel Drive",
            "Rudgear Road", "Oak Grove Road", "Buena Vista Avenue", "Boulevard Way", "Newell Avenue",
            "Bancroft Road", "North Broadway", "South California Boulevard", "Civic Drive",
            "Mount Diablo Boulevard", "Olympic Boulevard", "North Main Street", "Lawrence Way",
            "Cherry Lane", "Parkside Drive", "Mountain View Boulevard", "Buskirk Avenue", "Jones Road",
            "Marchbanks Drive", "Walker Avenue"}
EXTRA = {"Castle Rock Road", "Homestead Avenue", "San Carlos Drive", "Larkey Lane"}
CREEKS = {"Walnut Creek", "San Ramon Creek", "Las Trampas Creek", "Tice Creek", "Pine Creek",
          "Grayson Creek", "Sans Crainte Creek", "Contra Costa Canal", "Ygnacio Canal"}
EXTRA = set(json.loads(os.environ.get("WC_EXTRA_SPLITS", "null")) or EXTRA)

lines = [study.boundary]
for e in osm_elements(f"{D}/osm/osm_roads.json"):
    t = e["tags"]; g = way_line(e)
    if not g:
        continue
    hw = t.get("highway")
    if hw in MAJOR or (hw == "tertiary" and t.get("name") in TERTIARY) or t.get("railway") == "subway" \
            or (hw in ("residential", "tertiary", "unclassified") and t.get("name") in EXTRA):
        lines.append(to_m(g))
for e in osm_elements(f"{D}/osm/osm_water.json"):
    t = e.get("tags", {})
    if e["type"] != "way" or t.get("name") not in CREEKS:
        continue
    g = way_line(e)
    if not g:
        continue
    gm = to_m(g)
    if (t.get("tunnel") or t.get("culvert")) and gm.length > 150:
        continue
    lines.append(gm)
OPEN_EDGES = []
for e in osm_elements(f"{D}/osm/osm_areas.json"):
    t = e.get("tags", {})
    if not (t.get("boundary") == "protected_area" or t.get("leisure") == "nature_reserve"):
        continue
    g = way_poly(e) if e["type"] == "way" else relation_poly(e)
    if g is None or g.is_empty:
        continue
    gm = to_m(g).buffer(0)
    if gm.area > 300000 and gm.intersects(study):
        lines.append(gm.boundary); OPEN_EDGES.append(gm)
open_union = unary_union(OPEN_EDGES) if OPEN_EDGES else None

from shapely.ops import polygonize
noded = unary_union(lines)
faces = []
for p in polygonize(noded):
    if p.area < 500 or not p.representative_point().within(study):
        continue
    q = p.intersection(study)
    if not q.is_empty:
        faces.append(largest_polygon(q))
print("raw faces", len(faces))


def compact(p):
    return 4 * math.pi * p.area / (p.length ** 2) if p.length else 0


# merge slivers (dual carriageways, ramps) and small faces into the neighbour sharing most edge
import math
changed = True
while changed:
    changed = False
    faces.sort(key=lambda p: p.area)
    tree = STRtree(faces)
    for i, f in enumerate(faces):
        small = f.area < 45000 or (f.area < 160000 and compact(f) < 0.12)
        if not small:
            continue
        best, best_len = None, 0
        for j in tree.query(f.buffer(2)):
            if j == i:
                continue
            shared = f.boundary.intersection(faces[j].buffer(2)).length
            if shared > best_len:
                best, best_len = j, shared
        if best is not None and best_len > 0:
            merged = unary_union([faces[best], f]).buffer(0.5).buffer(-0.5)
            faces[best] = largest_polygon(merged)
            faces.pop(i)
            changed = True
            break
print("faces after merge", len(faces))

# ---- profiles -------------------------------------------------------------
bld = []
for e in osm_elements(f"{D}/osm/osm_buildings.json"):
    p = way_poly(e)
    if p is None:
        continue
    pm = to_m(p)
    bld.append((pm.centroid, pm.area, e["tags"].get("building", "yes")))
btree = STRtree([b[0] for b in bld])

OPEN = ("park", "golf_course", "nature_reserve", "recreation_ground", "forest", "meadow", "grass",
        "wood", "scrub", "grassland", "protected_area", "cemetery")
COMM = ("commercial", "retail", "mall", "office")
lu = defaultdict(list)
for e in osm_elements(f"{D}/osm/osm_areas.json"):
    t = e.get("tags", {})
    g = way_poly(e) if e["type"] == "way" else relation_poly(e)
    if g is None or g.is_empty:
        continue
    kind = None
    for k in ("leisure", "landuse", "natural", "boundary", "shop", "amenity"):
        v = t.get(k)
        if v in OPEN:
            kind = "open"
        elif v in COMM:
            kind = "comm"
        elif v == "industrial":
            kind = "ind"
        elif v == "residential" and k == "landuse":
            kind = "res"
        elif v in ("school", "college", "education"):
            kind = "school"
        if kind:
            break
    if kind:
        lu[kind].append(to_m(g).buffer(0))
lu_union = {k: unary_union(v) for k, v in lu.items()}

acs = []
for f in load_features(f"{S}/build/acs_bg.geojson"):
    g = to_m(shape(f["geometry"])).buffer(0)
    usable = g.difference(lu_union.get("open", Point(0, 0).buffer(0)))
    acs.append((g, usable if usable.area > 0.2 * g.area else g, f["properties"]))
atree = STRtree([a[0] for a in acs])

out = []
for i, f in enumerate(sorted(faces, key=lambda p: (-p.centroid.y, p.centroid.x))):
    st = {"id": i + 1, "km2": round(f.area / 1e6, 3)}
    idx = btree.query(f)
    areas, kinds = [], Counter()
    for j in idx:
        c, a, k = bld[j]
        if f.contains(c):
            areas.append(a); kinds[k] += 1
    st["bld"] = len(areas)
    st["bld_med"] = round(statistics.median(areas)) if areas else None
    st["bld_big"] = sum(1 for a in areas if a > 1200)
    st["bld_apt"] = kinds.get("apartments", 0)
    for k, u in lu_union.items():
        st["lu_" + k] = round(f.intersection(u).area / f.area, 2)
    agg = Counter(); yr_w = 0; yr_sum = 0
    for j in atree.query(f):
        g, usable, p = acs[j]
        w = f.intersection(usable).area / usable.area if usable.area else 0
        if w <= 0.01:
            continue
        for k in ("units", "sfd", "sfa", "u2_4", "u5_19", "u20p", "mobile", "occ", "rent"):
            agg[k] += (p.get(k) or 0) * w
        if p.get("yr"):
            yr_sum += p["yr"] * (p["units"] or 0) * w; yr_w += (p["units"] or 0) * w
    st["units"] = round(agg["units"])
    if agg["units"] > 0:
        for k in ("sfd", "sfa", "u2_4", "u5_19", "u20p", "mobile"):
            st["p_" + k] = round(agg[k] / agg["units"], 2)
    st["renters"] = round(agg["rent"] / agg["occ"], 2) if agg["occ"] else None
    st["yr"] = round(yr_sum / yr_w) if yr_w else None
    out.append({"type": "Feature", "properties": st, "geometry": rnd(to_deg(f.simplify(4)), 5)})
json.dump({"type": "FeatureCollection", "features": out}, open(f"{S}/build/faces.geojson", "w"))
print("wrote", len(out), "faces")
for o in out:
    p = o["properties"]
    print(p["id"], p["km2"], "units", p["units"], "sfd", p.get("p_sfd"), "sfa", p.get("p_sfa"),
          "u5-19", p.get("p_u5_19"), "u20+", p.get("p_u20p"), "yr", p["yr"], "rent", p["renters"],
          "bld", p["bld"], p["bld_med"], "open", p.get("lu_open"), "comm", p.get("lu_comm"))
