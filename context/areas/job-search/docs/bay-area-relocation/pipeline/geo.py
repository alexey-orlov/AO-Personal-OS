# -*- coding: utf-8 -*-
"""
Deterministic criteria: (1) off-peak drive time to downtown SF, (2) urbanicity.

Drive time
----------
No routing service is reachable from this environment (all egress blocked), so drive time is
MODELLED, not fetched. Model: within each drive corridor, travel time is linear in great-circle
distance to the SF Ferry Building --  t = a_c + b_c * d.  The intercept a_c absorbs the fixed cost
of that corridor (bridge/toll plaza, Caldecott, downtown approach) and the slope b_c its effective
door-to-door speed. Parameters are least-squares fitted per corridor against anchor trips whose
typical off-peak duration is well established; the fit residuals are reported so the error is visible.

Urbanicity
----------
"How urban" is measured as distance-decayed population potential: the population of every other
place in the dataset, weighted by exp(-distance / 8 km). This is a standard agglomeration index and
is computable entirely from the backbone, needing no land-area data.
"""
import math
import sys

import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from places import PLACES

SF_DOWNTOWN = (37.7955, -122.3937)  # Ferry Building


def haversine_mi(lat1, lon1, lat2, lon2):
    R = 3958.8
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = math.radians(lat2 - lat1)
    dl = math.radians(lon2 - lon1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * R * math.asin(math.sqrt(a))


BY_NAME = {p[0]: p for p in PLACES}


def gc(name):
    p = BY_NAME[name]
    return haversine_mi(p[3], p[4], *SF_DOWNTOWN)


# Anchor trips: typical OFF-PEAK (midday weekday) driving minutes to the Ferry Building /
# downtown SF. A sample of these is independently spot-checked against web sources; see
# calibration report.
ANCHORS = {
    "SF": [("Chinatown", 5), ("North Beach", 6), ("Mission", 12), ("Bayview Hunters Point", 15),
           ("Outer Richmond", 21), ("Sunset/Parkside", 22), ("Excelsior", 17)],
    "EB_BAYBRIDGE": [("Oakland", 20), ("Emeryville", 18), ("Berkeley", 25), ("Alameda", 22),
                     ("Richmond", 29), ("El Cerrito", 27), ("Hercules", 34)],
    "EB_HWY24": [("Orinda", 25), ("Lafayette", 30), ("Walnut Creek", 35), ("Concord", 40),
                 ("Martinez", 38)],
    "EB_680": [("Danville", 40), ("San Ramon", 42), ("Alamo", 38)],
    "EB_580": [("Castro Valley", 30), ("Hayward", 33), ("San Leandro", 26), ("Fremont", 43),
               ("Dublin", 44), ("Livermore", 52), ("Pleasanton", 45)],
    "EB_EASTCOUNTY": [("Pittsburg", 52), ("Antioch", 57), ("Brentwood", 63), ("Oakley", 60)],
    "PEN_101": [("Brisbane", 12), ("South San Francisco", 16), ("Burlingame", 22), ("San Mateo", 25),
                ("Redwood City", 32), ("Palo Alto", 38), ("Sunnyvale", 47), ("Menlo Park", 35)],
    "PEN_280": [("Daly City", 15), ("Colma", 16), ("Hillsborough", 24), ("Woodside", 38),
                ("Portola Valley", 40)],
    "COAST_S": [("Pacifica", 20), ("Half Moon Bay", 35), ("Montara", 28), ("Pescadero", 62)],
    "NB_101": [("Sausalito", 15), ("Mill Valley", 22), ("Corte Madera", 25), ("San Rafael", 30),
               ("Novato", 38), ("Petaluma", 45), ("Santa Rosa", 60), ("Cloverdale", 85)],
    "NB_COAST": [("Stinson Beach", 50), ("Point Reyes Station", 65), ("Guerneville", 92),
                 ("Sea Ranch", 145)],
    "SOL_80": [("Vallejo", 35), ("Benicia", 38), ("Fairfield", 50), ("Vacaville", 58), ("Dixon", 66)],
    "NAPA_VALLEY": [("American Canyon", 45), ("Napa", 55), ("St. Helena", 75), ("Calistoga", 82)],
    "SONOMA_VALLEY": [("Sonoma", 55), ("Glen Ellen", 62), ("Kenwood", 68)],
    "SOUTH_BAY": [("Milpitas", 45), ("Santa Clara", 52), ("San Jose", 55), ("Cupertino", 52),
                  ("Los Gatos", 58), ("Morgan Hill", 75), ("Gilroy", 87)],
}


def fit_linear(xs, ys):
    """Least-squares fit y = a + b x."""
    n = len(xs)
    mx = sum(xs) / n
    my = sum(ys) / n
    sxx = sum((x - mx) ** 2 for x in xs)
    sxy = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    b = sxy / sxx if sxx else 0.0
    a = my - b * mx
    return a, b


def build_drive_model(verbose=True):
    params, report = {}, []
    for corridor, anchors in ANCHORS.items():
        xs = [gc(n) for n, _ in anchors]
        ys = [m for _, m in anchors]
        a, b = fit_linear(xs, ys)
        params[corridor] = (a, b)
        resid = [(n, obs, a + b * gc(n)) for n, obs in anchors]
        mae = sum(abs(o - p) for _, o, p in resid) / len(resid)
        worst = max(resid, key=lambda r: abs(r[1] - r[2]))
        report.append((corridor, len(anchors), a, b, 60 / b if b > 0 else float("nan"), mae, worst))
        if verbose:
            print(f"{corridor:16s} n={len(anchors):2d}  t = {a:6.2f} + {b:5.3f}*d   "
                  f"(~{60/b if b>0 else 0:4.1f} mph eff)  MAE={mae:4.1f}min  "
                  f"worst={worst[0]} obs{worst[1]} pred{worst[2]:.0f}")
    return params, report


def drive_minutes(params, place):
    name, county, kind, lat, lon, pop, corridor = place
    d = haversine_mi(lat, lon, *SF_DOWNTOWN)
    a, b = params[corridor]
    return max(4.0, a + b * d), d


def assumed_density(kind, pop):
    """Typical residents per square mile, used only to give each place a physical footprint."""
    if kind == "sf_hood":
        return 18000.0
    if pop >= 100000:
        return 6000.0
    if pop >= 20000:
        return 4500.0
    if pop >= 5000:
        return 3000.0
    return 1500.0


def footprint_radius_mi(kind, pop):
    area = max(pop, 200) / assumed_density(kind, pop)
    return math.sqrt(area / math.pi)


def urbanicity(places, decay_km=8.0):
    """
    Distance-decayed population potential (agglomeration index).

    Each place's population is treated as spread over a disc rather than concentrated at its
    centroid -- otherwise a tiny CDP sitting next to San Jose's centroid inherits all 983k of
    San Jose's residents as if they lived at one point. The effective distance to place j is
    sqrt(d^2 + (0.7*r_j)^2), which floors how close you can be to a spatially extended population.
    """
    radii = {p[0]: footprint_radius_mi(p[2], p[5]) for p in places}
    out = {}
    for p in places:
        total = 0.0
        for q in places:
            d_mi = haversine_mi(p[3], p[4], q[3], q[4])
            r_eff = 0.7 * radii[q[0]]
            d_eff_km = math.hypot(d_mi, r_eff) * 1.60934
            total += q[5] * math.exp(-d_eff_km / decay_km)
        out[p[0]] = total
    return out


if __name__ == "__main__":
    print("=== DRIVE-TIME MODEL CALIBRATION (off-peak minutes to SF Ferry Building) ===")
    params, report = build_drive_model()
    allres = [(n, o, params[c][0] + params[c][1] * gc(n)) for c, ancs in ANCHORS.items() for n, o in ancs]
    mae = sum(abs(o - p) for _, o, p in allres) / len(allres)
    print(f"\nOVERALL: {len(allres)} anchors, MAE = {mae:.2f} min")

    print("\n=== SAMPLE PREDICTIONS ===")
    for nm in ["Noe Valley", "Piedmont", "Kensington", "Moraga", "Blackhawk", "Foster City",
               "Los Altos", "Saratoga", "Tiburon", "Windsor", "Bodega Bay", "Rio Vista",
               "Discovery Bay", "Angwin", "San Martin", "Stanford", "Sunol"]:
        p = BY_NAME[nm]
        t, d = drive_minutes(params, p)
        print(f"  {nm:26s} {d:5.1f} mi gc  ->  {t:5.1f} min")

    print("\n=== URBANICITY (top 12 / bottom 12) ===")
    u = urbanicity(PLACES)
    ranked = sorted(u.items(), key=lambda kv: -kv[1])
    for nm, v in ranked[:12]:
        print(f"  {nm:34s} {v:12,.0f}")
    print("  ...")
    for nm, v in ranked[-12:]:
        print(f"  {nm:34s} {v:12,.0f}")
