# -*- coding: utf-8 -*-
"""
Build the choropleth: every place in the ranking, drawn in its real boundary and coloured by score.

Boundaries come from the two authorities that publish the geographies this table is built on:
  * San Francisco's 41 Analysis Neighborhoods -- DataSF `ajp5-b2md`. These are the same
    neighbourhood definitions the ranking uses, so the join is exact and needs no name fuzzing.
  * Every other city, town and unincorporated community -- Census TIGERweb, "Incorporated Places"
    (layer 28) and "Census Designated Places" (layer 30), clipped to a Bay Area envelope.

Matching is verified, not assumed: a polygon is only accepted for a place if its centroid lands
within MATCH_MILES of the coordinates the ranking already holds for that place. California reuses
names relentlessly, and the envelope reaches into the Delta, so a name match alone would quietly
paint the wrong polygon.

Output: map-data.json -- simplified rings plus the per-place values the page colours and labels by.
"""
import json
import math
import os
import subprocess
import sys
import urllib.parse

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
REPO = os.path.dirname(HERE)
CACHE = os.path.join(HERE, "map-cache")

MATCH_MILES = 12.0        # a polygon centroid further than this from our point is a different place
SIMPLIFY_DEG = 0.0009     # ~100 m cap; keeps coastlines readable without carrying 200k vertices
BBOX = "-123.7,36.7,-121.1,39.0"

SF_NEIGHBOURHOODS = "https://data.sfgov.org/resource/ajp5-b2md.geojson?$limit=100"

# Census CARTOGRAPHIC county boundaries (cb_*_500k via plotly's mirror). Unlike the legal TIGER
# boundaries -- which extend into the bay and three miles into the Pacific -- these are clipped
# to the shoreline, which is what makes them usable as a land/water base layer AND as a mask
# that clips place polygons to the coast.
COUNTIES_URL = "https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_050_00_500k.json"
BAY_FIPS = {"06001", "06013", "06041", "06055", "06075", "06081", "06085", "06095", "06097"}
# generous envelope: every county that could appear while panning
CO_BOX = (-124.3, -120.7, 36.2, 39.4)
TIGER = ("https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_Current/"
         "MapServer/{layer}/query")

# DataSF's neighbourhood labels differ from the SF Planning names the ranking uses in a
# handful of places. Left is DataSF, right is ours.
# Census splits one of our places into two CDPs, so both polygons are taken and drawn together.
MERGED = {"Highlands-Baywood Park": ("Highlands", "Baywood Park")}

# Unincorporated communities the Census does not delineate at all -- they are real places with
# real addresses, but no authority publishes a boundary for them (they were never CDPs, or were
# dropped after 2000). Drawn as a marked point rather than an invented polygon.
NO_BOUNDARY_MARKER = True

SF_ALIASES = {
    "Financial District": "Financial District/South Beach",
    "Oceanview/Merced/Ingleside": "Oceanview/Merced/Ingleside",
    "Castro/Upper Market": "Castro/Upper Market",
}


def _fetch(url, path):
    if os.path.exists(path) and os.path.getsize(path) > 1000:
        # tolerant decode: the 500k county file carries a few stray Latin-1 bytes in place names
        return json.loads(open(path, "rb").read().decode("utf-8", "replace"))
    os.makedirs(os.path.dirname(path), exist_ok=True)
    raw = subprocess.run(["curl", "-sSL", "--max-time", "240", url],
                         capture_output=True).stdout
    data = json.loads(raw.decode("utf-8", "replace"))
    with open(path, "w") as f:
        json.dump(data, f)
    return data


def fetch_boundaries():
    sf = _fetch(SF_NEIGHBOURHOODS, os.path.join(CACHE, "sf_hoods.geojson"))
    layers = {}
    for layer in (28, 30):
        q = urllib.parse.urlencode({
            "where": "STATE='06'",
            "geometry": BBOX,
            "geometryType": "esriGeometryEnvelope",
            "inSR": "4326",
            "spatialRel": "esriSpatialRelIntersects",
            "outFields": "BASENAME,NAME,GEOID",
            "returnGeometry": "true",
            "outSR": "4326",
            "f": "geojson",
        })
        layers[layer] = _fetch(f"{TIGER.format(layer=layer)}?{q}",
                               os.path.join(CACHE, f"tiger_{layer}.geojson"))
    return sf, layers


# ------------------------------------------------------------------ geometry helpers
def rings_of(geom):
    """Polygon / MultiPolygon -> list of exterior rings (holes dropped; none matter at this scale)."""
    if not geom:
        return []
    t, c = geom.get("type"), geom.get("coordinates") or []
    if t == "Polygon":
        return [c[0]] if c else []
    if t == "MultiPolygon":
        return [poly[0] for poly in c if poly]
    return []


def _dp_open(pts, tol):
    """Douglas-Peucker on an OPEN polyline, iteratively (rings run to thousands of points)."""
    n = len(pts)
    if n < 3:
        return list(pts)
    keep = [False] * n
    keep[0] = keep[n - 1] = True
    stack = [(0, n - 1)]
    while stack:
        a, b = stack.pop()
        if b <= a + 1:
            continue
        (x1, y1), (x2, y2) = pts[a], pts[b]
        dx, dy = x2 - x1, y2 - y1
        seg = math.hypot(dx, dy)
        worst, wi = -1.0, a
        for i in range(a + 1, b):
            x, y = pts[i]
            if seg < 1e-12:
                d = math.hypot(x - x1, y - y1)          # degenerate segment: use point distance
            else:
                d = abs(dy * x - dx * y + x2 * y1 - y2 * x1) / seg
            if d > worst:
                worst, wi = d, i
        if worst > tol:
            keep[wi] = True
            stack.append((a, wi))
            stack.append((wi, b))
    return [pts[i] for i in range(n) if keep[i]]


def simplify(ring, tol=None):
    """
    Douglas-Peucker for a CLOSED ring, with the tolerance scaled to the ring's own size.

    A fixed tolerance is wrong here because the map mixes a 1 km San Francisco neighbourhood with
    a 60 km rural county town. 130 m barely touches the town and flattens the neighbourhood into
    a triangle. The tolerance is therefore a fraction of each ring's own diagonal, floored so a
    tiny ring keeps real detail and capped so a huge one still sheds points.

    Running plain DP straight over a closed ring does nothing: its first and last point are the
    same, so the baseline is a zero-length segment, every vertex measures as infinitely far from
    it, and the algorithm subdivides all the way down and keeps every point. The ring is instead
    cut at the vertex farthest from the start, and the two open halves are simplified separately.
    """
    if len(ring) < 5:
        return ring
    if tol is None:
        xs = [p[0] for p in ring]
        ys = [p[1] for p in ring]
        diag = math.hypot(max(xs) - min(xs), max(ys) - min(ys))
        tol = min(SIMPLIFY_DEG, max(0.00006, 0.0035 * diag))
    closed = ring[0] == ring[-1]
    pts = ring[:-1] if closed else list(ring)
    if len(pts) < 4:
        return ring

    x0, y0 = pts[0]
    far = max(range(len(pts)), key=lambda i: (pts[i][0] - x0) ** 2 + (pts[i][1] - y0) ** 2)
    out = _dp_open(pts[:far + 1], tol)[:-1] + _dp_open(pts[far:], tol)
    if closed:
        out = out + [out[0]]
    return out if len(out) >= 4 else ring


def centroid(rings):
    """Area-weighted centroid of the largest ring -- good enough to verify a name match."""
    best, best_area = None, -1.0
    for ring in rings:
        a = cx = cy = 0.0
        for i in range(len(ring) - 1):
            x0, y0 = ring[i]
            x1, y1 = ring[i + 1]
            cross = x0 * y1 - x1 * y0
            a += cross
            cx += (x0 + x1) * cross
            cy += (y0 + y1) * cross
        if abs(a) < 1e-12:
            continue
        a *= 0.5
        if abs(a) > best_area:
            best_area = abs(a)
            best = (cx / (6 * a), cy / (6 * a))
    return best


def miles(lat1, lon1, lat2, lon2):
    return 3958.8 * 2 * math.asin(math.sqrt(
        math.sin(math.radians(lat2 - lat1) / 2) ** 2
        + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2))
        * math.sin(math.radians(lon2 - lon1) / 2) ** 2))


def norm(s):
    return " ".join((s or "").lower().replace(".", "").replace("'", "").split())


def county_layer():
    """
    Shoreline-clipped county polygons for the base map.

    Deliberately NOT simplified: the same rings are drawn twice -- as the land fill under the
    places and as the holes in the water mask above them -- and simplifying each independently
    would open slivers along shared county borders that the even-odd fill would paint as thin
    water lines across dry land. The source file is already generalised (1:500k), so the full
    rings are only a few thousand vertices for the whole Bay Area.
    """
    try:
        d = _fetch(COUNTIES_URL, os.path.join(CACHE, "us_counties.geojson"))
    except Exception as exc:
        print(f"  ! county base layer unavailable ({exc}); map will render without land/water")
        return []
    x0, x1, y0, y1 = CO_BOX
    out = []
    for f in d.get("features", []):
        props = f.get("properties") or {}
        if props.get("STATE") != "06":
            continue
        fid = "06" + (props.get("COUNTY") or "")
        keep = []
        for ring in rings_of(f.get("geometry")):
            xs = [p[0] for p in ring]
            ys = [p[1] for p in ring]
            if max(xs) < x0 or min(xs) > x1 or max(ys) < y0 or min(ys) > y1:
                continue
            keep.append([[round(x, 5), round(y, 5)] for x, y in ring])
        if keep:
            out.append({"fips": fid, "study": fid in BAY_FIPS, "rings": keep})
    return out


# ------------------------------------------------------------------------- build
def build():
    import single_table as ST
    rows, ranked = ST.build()
    by_name = {norm(r["place"]): r for r in rows}

    sf, layers = fetch_boundaries()
    matched, unmatched, rejected = {}, [], []

    merge_lookup = {norm(part): whole for whole, parts in MERGED.items() for part in parts}

    def consider(name, geom, source):
        key = norm(name)
        whole = merge_lookup.get(key)
        if whole is not None:
            key = norm(whole)          # both Census CDPs feed the one row we rank
        row = by_name.get(key)
        if row is None:
            return False
        if key in matched and whole is None:
            return False
        rings = rings_of(geom)
        if not rings:
            return False
        c = centroid(rings)
        if c is None:
            return False
        d = miles(row["lat"], row["lon"], c[1], c[0])
        if d > MATCH_MILES:
            rejected.append((name, source, round(d, 1)))
            return False
        new_rings = [[[round(x, 4), round(y, 4)] for x, y in simplify(r)] for r in rings]
        if key in matched:
            matched[key]["rings"].extend(new_rings)     # second half of a merged place
        else:
            matched[key] = {"rings": new_rings, "source": source, "centroid_miles": round(d, 1)}
        return True

    for f in sf.get("features", []):
        nm = (f["properties"] or {}).get("nhood")
        consider(SF_ALIASES.get(nm, nm), f.get("geometry"), "DataSF Analysis Neighborhoods")

    for layer, label in ((28, "Census TIGER incorporated place"),
                         (30, "Census TIGER census-designated place")):
        for f in layers[layer].get("features", []):
            p = f["properties"] or {}
            consider(p.get("BASENAME") or p.get("NAME"), f.get("geometry"), label)

    # what did we fail to place?
    for r in rows:
        if norm(r["place"]) not in matched:
            unmatched.append(r["place"])

    CRIT = [("total", "TOTAL SCORE"), ("c_safety", "Crime & safety"), ("c_schools", "Schools"),
            ("c_rent", "Rent cost"), ("c_distance", "Close to SF"),
            ("c_capacity", "School/TK place"), ("c_urban", "Urban density")]
    feats = []
    for r in rows:
        key = norm(r["place"])
        m = matched.get(key)
        if m is None:
            m = {"rings": [], "source": "no published boundary (drawn as a point)"}
        feats.append({
            "name": r["place"],
            "county": r["county"],
            "kind": ST.KIND_LABEL.get(r["kind"], r["kind"]),
            "rank": r.get("rank"),
            "scores": {k: (round(r[k], 1) if isinstance(r.get(k), (int, float)) else None)
                       for k, _ in CRIT},
            "rent2": r.get("rent_2br"), "rent3": r.get("rent_3br"),
            "drive": r.get("drive_min"), "pop": r.get("pop"),
            "violent": r.get("violent"), "property": r.get("property"),
            "elem": r.get("elem_pct"), "midhigh": r.get("midhigh_pct"),
            "elemD": r.get("elem_district"), "midhighD": r.get("high_district"),
            "approx": bool(r.get("approx_fields")),
            "approxFrom": r.get("approx_from"),
            "approxFields": ", ".join(dict.fromkeys(r.get("approx_fields") or [])) or None,
            "residential": r["residential"],
            "rings": m["rings"],
            "point": None if m["rings"] else [round(r["lon"], 4), round(r["lat"], 4)],
            "boundarySource": m["source"],
        })

    out = {"metrics": [{"key": k, "label": lab} for k, lab in CRIT],
           "places": feats,
           "counties": county_layer(),
           "unmatched": unmatched,
           "rejected": rejected}
    path = os.path.join(HERE, "map-data.json")
    with open(path, "w") as f:
        json.dump(out, f, separators=(",", ":"))
    pts = sum(len(rg) for p in feats for rg in p["rings"])
    print(f"{len(feats)} places with boundaries, {pts:,} vertices after simplification")
    print(f"  wrote {path} ({os.path.getsize(path)//1024} KB)")
    if rejected:
        print(f"  rejected {len(rejected)} name matches whose polygon was in the wrong place:")
        for n, s, d in rejected[:10]:
            print(f"    {n} ({s}) centroid {d} mi away")
    if unmatched:
        print(f"  no boundary found for {len(unmatched)}: {', '.join(unmatched)}")
    return out


if __name__ == "__main__":
    build()
