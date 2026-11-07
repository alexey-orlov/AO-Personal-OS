"""Shared geometry helpers: a local metric projection and OSM/GeoJSON loaders."""
import json, math
from shapely.geometry import shape, LineString, Polygon, MultiPolygon, mapping
from shapely.ops import transform, unary_union

LAT0, LON0 = 37.90, -122.06
KX = 111320 * math.cos(math.radians(LAT0))   # metres per degree of longitude
KY = 110950                                   # metres per degree of latitude


def to_m(g):
    return transform(lambda x, y, z=None: ((x - LON0) * KX, (y - LAT0) * KY), g)


def to_deg(g):
    return transform(lambda x, y, z=None: (x / KX + LON0, y / KY + LAT0), g)


def load_features(path):
    return json.load(open(path))["features"]


def osm_elements(path):
    return json.load(open(path))["elements"]


def way_line(e):
    pts = [(p["lon"], p["lat"]) for p in e.get("geometry") or [] if p]
    return LineString(pts) if len(pts) >= 2 else None


def way_poly(e):
    pts = [(p["lon"], p["lat"]) for p in e.get("geometry") or [] if p]
    if len(pts) >= 4 and pts[0] == pts[-1]:
        try:
            p = Polygon(pts)
            return p if p.is_valid else p.buffer(0)
        except Exception:
            return None
    return None


def relation_poly(e):
    """Outer/inner rings from an Overpass `out geom` relation."""
    from shapely.ops import linemerge, polygonize
    outers, inners = [], []
    for m in e.get("members", []):
        if m.get("type") != "way" or not m.get("geometry"):
            continue
        pts = [(p["lon"], p["lat"]) for p in m["geometry"] if p]
        if len(pts) < 2:
            continue
        (inners if m.get("role") == "inner" else outers).append(LineString(pts))
    if not outers:
        return None
    polys = list(polygonize(unary_union(outers)))
    if not polys:
        return None
    g = unary_union(polys)
    if inners:
        holes = list(polygonize(unary_union(inners)))
        if holes:
            g = g.difference(unary_union(holes))
    return g if g.is_valid else g.buffer(0)


def rnd(g, nd=5):
    return json.loads(json.dumps(mapping(g)), parse_float=lambda s: round(float(s), nd))


def largest_polygon(g):
    """Biggest Polygon inside any geometry (for label placement)."""
    from shapely.geometry import Polygon as _P
    best = None
    stack = [g]
    while stack:
        x = stack.pop()
        if isinstance(x, _P):
            if best is None or x.area > best.area:
                best = x
        elif hasattr(x, "geoms"):
            stack.extend(x.geoms)
    return best
