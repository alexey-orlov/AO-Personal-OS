"""Compact layer encoding shared by every build script; the page's decodeLayer() reverses it.

A layer is {"p": [props, ...], "t": [type, ...], "g": [coords, ...]} where coords are
integers at 1e-5 degree, origin (-122.2, 37.8), each line/ring delta-encoded:
[x0, y0, dx1, dy1, ...].  type: 1 Point, 2 LineString, 3 Polygon, 4 MultiLineString,
5 MultiPolygon.
"""
X0, Y0, Q = -122.2, 37.8, 1e5
TYPES = {"Point": 1, "LineString": 2, "Polygon": 3, "MultiLineString": 4, "MultiPolygon": 5}


def _line(coords):
    out, px, py = [], 0, 0
    for i, (x, y) in enumerate(coords):
        ix, iy = round((x - X0) * Q), round((y - Y0) * Q)
        if i == 0:
            out += [ix, iy]
        else:
            if ix == px and iy == py:
                continue
            out += [ix - px, iy - py]
        px, py = ix, iy
    return out


def encode_geom(g):
    t = g["type"]; c = g["coordinates"]
    if t == "Point":
        return 1, [round((c[0] - X0) * Q), round((c[1] - Y0) * Q)]
    if t == "LineString":
        return 2, _line(c)
    if t == "Polygon":
        return 3, _poly(c)
    if t == "MultiLineString":
        return 4, [_line(l) for l in c]
    if t == "MultiPolygon":
        polys = [p for p in (_poly(p) for p in c) if p]
        return 5, polys
    raise ValueError(t)


def _poly(rings):
    """Rings with fewer than 4 points after rounding are dropped (a dropped shell drops the polygon)."""
    enc = [_line(r) for r in rings]
    if len(enc[0]) < 8:
        return []
    return [enc[0]] + [r for r in enc[1:] if len(r) >= 8]


def encode_fc(fc):
    P, T, G = [], [], []
    for f in fc["features"]:
        g = f.get("geometry")
        if not g:
            continue
        if g["type"] == "GeometryCollection":
            for sub in g["geometries"]:
                if sub["type"] in TYPES:
                    t, c = encode_geom(sub); P.append(f["properties"]); T.append(t); G.append(c)
            continue
        t, c = encode_geom(g)
        P.append(f["properties"]); T.append(t); G.append(c)
    return {"p": P, "t": T, "g": G}
