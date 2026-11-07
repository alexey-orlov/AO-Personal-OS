"""Base map layers (roads, rail, trails, water, green areas, buildings) from OSM.

usage: build_basemap.py <scratch_dir> <out_dir>
Writes <out_dir>/base.json: {"roads":FC,"water":FC,"green":FC,"bld":FC,"labels":FC}
Coordinates rounded to 5 decimals (~1 m); geometry simplified ~1.5 m.
"""
import json, os, sys
from shapely.geometry import box, mapping
from shapely.ops import unary_union
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from geo_common import *

S, OUT = sys.argv[1], sys.argv[2]
D = f"{S}/data/osm"
CLIP = box(-122.125, 37.845, -121.985, 37.955)

RCLASS = {"motorway": "mwy", "motorway_link": "link", "trunk": "trunk", "trunk_link": "link",
          "primary": "pri", "primary_link": "link", "secondary": "sec", "secondary_link": "link",
          "tertiary": "ter", "tertiary_link": "link", "unclassified": "res", "residential": "res",
          "living_street": "res", "road": "res", "cycleway": "trail", "path": "trail", "footway": "trail"}
SHORT = [(" Boulevard", " Blvd"), (" Avenue", " Ave"), (" Road", " Rd"), (" Street", " St"),
         (" Drive", " Dr"), (" Lane", " Ln"), (" Court", " Ct"), (" Place", " Pl"), (" Parkway", " Pkwy"),
         ("North ", "N "), ("South ", "S "), ("Mount ", "Mt "), (" Circle", " Cir"), (" Terrace", " Ter")]


def short(n):
    if not n:
        return ""
    for a, b in SHORT:
        n = n.replace(a, b)
    return n


def feat(g, props, tol=0.000013):
    g = g.intersection(CLIP)
    if g.is_empty:
        return None
    g = g.simplify(tol, preserve_topology=True)
    return {"type": "Feature", "properties": props, "geometry": rnd(g, 5)}


roads = []
for e in osm_elements(f"{D}/osm_roads.json"):
    t = e["tags"]; g = way_line(e)
    if not g:
        continue
    if t.get("railway") in ("subway", "rail", "light_rail"):
        f = feat(g, {"c": "rail", "n": "BART" if t.get("railway") == "subway" else ""})
    else:
        c = RCLASS.get(t.get("highway"))
        if not c:
            continue
        name = t.get("name") or ""
        if c == "mwy":
            name = {"Donald D Doyle Highway": "I-680", "Senator Daniel E Boatwright Highway": "SR-24",
                    "Senator Daniel E. Boatwright Highway": "SR-24", "CA 242": "SR-242"}.get(name, t.get("ref") or name)
            if t.get("ref"):
                name = t["ref"].replace("I ", "I-").replace("CA ", "SR-").split(";")[0]
        f = feat(g, {"c": c, "n": short(name) if c != "mwy" else name,
                     "b": 1 if t.get("bridge") == "yes" else 0})
    if f:
        roads.append(f)

water, waterlines = [], []
for e in osm_elements(f"{D}/osm_water.json"):
    t = e.get("tags", {})
    if e["type"] == "way" and "waterway" in t:
        if t.get("tunnel") or t.get("culvert"):
            continue
        g = way_line(e)
        if g:
            f = feat(g, {"k": "line", "w": t["waterway"], "n": t.get("name", "")})
            if f:
                waterlines.append(f)
    else:
        g = way_poly(e) if e["type"] == "way" else relation_poly(e)
        if g is not None and not g.is_empty:
            f = feat(g, {"k": "area", "n": t.get("name", "")}, tol=0.00002)
            if f:
                water.append(f)

GREEN = {"park": "park", "golf_course": "golf", "nature_reserve": "open", "recreation_ground": "park",
         "pitch": "pitch", "playground": "park", "garden": "park", "forest": "wood", "wood": "wood",
         "scrub": "open", "grassland": "open", "meadow": "open", "grass": "grass",
         "protected_area": "open", "cemetery": "grass"}
green = []
for e in osm_elements(f"{D}/osm_areas.json"):
    t = e.get("tags", {})
    kind = None
    for k in ("leisure", "landuse", "natural", "boundary"):
        if t.get(k) in GREEN:
            kind = GREEN[t[k]]; break
    if t.get("amenity") in ("school", "college") or t.get("landuse") == "education":
        kind = "school"
    if t.get("landuse") in ("commercial", "retail") or t.get("shop") == "mall":
        kind = "comm"
    if not kind:
        continue
    g = way_poly(e) if e["type"] == "way" else relation_poly(e)
    if g is None or g.is_empty:
        continue
    if to_m(g).area < 1500 and kind not in ("pitch",):
        continue
    f = feat(g, {"k": kind, "n": t.get("name", "") if kind in ("park", "golf", "open", "school") else ""}, tol=0.00002)
    if f:
        green.append(f)

bld = []
for e in osm_elements(f"{D}/osm_buildings.json"):
    t = e.get("tags", {})
    g = way_poly(e)
    if g is None:
        continue
    b = t.get("building", "yes")
    k = "res" if b in ("house", "detached", "residential", "semidetached_house", "terrace") else \
        "apt" if b == "apartments" else \
        "com" if b in ("commercial", "retail", "office", "industrial", "supermarket", "hotel") else "oth"
    f = feat(g, {"k": k}, tol=0.000008)
    if f:
        bld.append(f)

labels = []
for e in osm_elements(f"{D}/osm_places.json"):
    t = e.get("tags", {})
    c = e.get("center") or {"lat": e.get("lat"), "lon": e.get("lon")}
    if not c.get("lat"):
        continue
    if t.get("railway") == "station" or t.get("public_transport") == "station":
        kind = "station"
    elif t.get("place") in ("town", "city", "village"):
        kind = "town"
    else:
        continue
    labels.append({"type": "Feature", "properties": {"k": kind, "n": t.get("name", "")},
                   "geometry": {"type": "Point", "coordinates": [round(c["lon"], 5), round(c["lat"], 5)]}})

from encode import encode_fc
FC = lambda fs: {"type": "FeatureCollection", "features": fs}
os.makedirs(OUT, exist_ok=True)
base = {"roads": FC(roads), "water": FC(water), "waterlines": FC(waterlines), "green": FC(green),
        "bld": FC(bld), "labels": FC(labels)}
enc = {k: encode_fc(v) for k, v in base.items()}
json.dump(enc, open(f"{OUT}/base.json", "w"), separators=(",", ":"), ensure_ascii=False)
for k, v in enc.items():
    print(k, len(v["p"]), round(len(json.dumps(v, separators=(",", ":"))) / 1e6, 2), "MB")
