"""Fetch OpenStreetMap layers for the Walnut Creek map from the Overpass API.

usage: fetch_osm.py <out_dir>
Writes one Overpass JSON per layer group (roads, water, areas, buildings, places).
"""
import json, os, sys, time, urllib.parse, urllib.request

out = sys.argv[1]
BBOX = "37.845,-122.125,37.955,-121.985"   # S,W,N,E
UA = "AO-Personal-OS relocation map builder (personal, low volume)"
ENDPOINTS = ["https://overpass-api.de/api/interpreter",
             "https://overpass.kumi.systems/api/interpreter"]
Q = {
    "roads": f"""[out:json][timeout:180];
( way["highway"~"^(motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|residential|living_street|road)$"]({BBOX});
  way["highway"~"^(cycleway|path|footway)$"]["name"~"Trail|Iron Horse|Canal",i]({BBOX});
  way["railway"~"^(subway|rail|light_rail)$"]({BBOX}); );
out geom tags;""",
    "water": f"""[out:json][timeout:180];
( way["waterway"~"^(river|stream|canal|ditch|drain)$"]({BBOX});
  way["natural"="water"]({BBOX}); relation["natural"="water"]({BBOX}); );
out geom tags;""",
    "areas": f"""[out:json][timeout:180];
( way["leisure"~"^(park|golf_course|nature_reserve|recreation_ground|pitch|playground|garden)$"]({BBOX});
  relation["leisure"~"^(park|golf_course|nature_reserve)$"]({BBOX});
  way["landuse"~"^(residential|commercial|retail|industrial|grass|meadow|forest|recreation_ground|cemetery|religious|education|institutional)$"]({BBOX});
  relation["landuse"~"^(residential|commercial|retail|industrial|forest)$"]({BBOX});
  way["boundary"="protected_area"]({BBOX}); relation["boundary"="protected_area"]({BBOX});
  way["natural"~"^(wood|scrub|grassland)$"]({BBOX});
  way["amenity"~"^(school|college|hospital|parking)$"]({BBOX});
  way["shop"="mall"]({BBOX}); );
out geom tags;""",
    "buildings": f"""[out:json][timeout:240];
( way["building"]({BBOX}); );
out geom tags;""",
    "places": f"""[out:json][timeout:120];
( node["place"~"^(suburb|neighbourhood|quarter|hamlet|village|town|city)$"]({BBOX});
  way["place"~"^(suburb|neighbourhood|quarter)$"]({BBOX});
  relation["place"~"^(suburb|neighbourhood|quarter)$"]({BBOX});
  node["railway"="station"]({BBOX}); node["public_transport"="station"]({BBOX}); );
out center tags;""",
}

for name, q in Q.items():
    path = os.path.join(out, f"osm_{name}.json")
    if os.path.exists(path) and os.path.getsize(path) > 1000:
        print(name, "cached"); continue
    for ep in ENDPOINTS:
        try:
            data = urllib.parse.urlencode({"data": q}).encode()
            req = urllib.request.Request(ep, data=data, headers={"User-Agent": UA})
            raw = urllib.request.urlopen(req, timeout=300).read()
            js = json.loads(raw)
            open(path, "wb").write(raw)
            print(name, len(js.get("elements", [])), "elements", round(len(raw) / 1e6, 1), "MB from", ep)
            break
        except Exception as e:
            print(name, "failed at", ep, e, file=sys.stderr)
            time.sleep(10)
    time.sleep(5)
