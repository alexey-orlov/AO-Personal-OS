"""Merge Census + Nominatim geocodes and test each point against the study areas.

usage: check_points.py <scratch_dir>
"""
import csv, json, math, os, sys
from shapely.geometry import shape, Point
from shapely.strtree import STRtree

S = sys.argv[1]
keys = json.load(open(f"{S}/data/geocode/keys.json"))
nom = json.load(open(f"{S}/data/geocode/nominatim.json"))
census = {}
for r in csv.reader(open(f"{S}/data/geocode/census_result.csv")):
    if len(r) > 5 and r[2] == "Match":
        lon, lat = map(float, r[5].split(","))
        census[r[0]] = (lat, lon, r[3], r[4])


def dist_m(a, b):
    dy = (a[0] - b[0]) * 111320
    dx = (a[1] - b[1]) * 111320 * math.cos(math.radians(a[0]))
    return math.hypot(dx, dy)


layers = []
for fn, label in (("mdusd_studyareas.geojson", "MDUSD"), ("acalanes_studyareas.geojson", "AUHSD")):
    d = json.load(open(f"{S}/data/ssl/{fn}"))
    geoms, props = [], []
    for f in d["features"]:
        if not f.get("geometry"):
            continue
        p = f["properties"]
        if not p.get("DISTRICT"):
            continue
        geoms.append(shape(f["geometry"]))
        props.append(p)
    layers.append((label, STRtree(geoms), geoms, props))

points = {}
for i, k in keys.items():
    c = census.get(i)
    n = nom.get(i, {})
    hit = None
    for h in n.get("hits", []):
        if h["cat"] in ("building", "place") or h["type"] in ("house", "apartments", "residential", "building", "yes"):
            if h.get("rank", 0) >= 28 or h["type"] == "house":
                hit = h
                break
    src, lat, lon = None, None, None
    if hit and c and dist_m((hit["lat"], hit["lon"]), (c[0], c[1])) < 250:
        src, lat, lon = "osm-building", hit["lat"], hit["lon"]
    elif c:
        src, lat, lon = "census-range", c[0], c[1]
    elif hit:
        src, lat, lon = "osm-building", hit["lat"], hit["lon"]
    d = dist_m((hit["lat"], hit["lon"]), (c[0], c[1])) if (hit and c) else None
    pt = Point(lon, lat)
    zones = []
    for label, tree, geoms, props in layers:
        for idx in tree.query(pt):
            if geoms[idx].contains(pt):
                p = props[idx]
                zones.append(f"{label}:{p.get('DISTRICT')} elem={p.get('ELEM_DESC') or p.get('ELEM_')} mid={p.get('MID_DESC') or p.get('MID_')} high={p.get('HIGH_DESC') or p.get('HIGH_')}")
    points[k["key"]] = {"lat": round(lat, 6), "lon": round(lon, 6), "src": src}
    print(f"{k['key'][:32]:32} {src:13} d={'' if d is None else round(d)} | {' || '.join(zones) or 'NO ZONE'}")
json.dump(points, open(f"{S}/build/geocode_cache.json", "w"), indent=1)
