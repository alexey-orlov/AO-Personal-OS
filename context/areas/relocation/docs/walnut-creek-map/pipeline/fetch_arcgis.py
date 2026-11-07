"""Page through an ArcGIS MapServer/FeatureServer layer and save it as GeoJSON.

usage: fetch_arcgis.py <layer_url> <out.geojson> [where] [bbox lon1,lat1,lon2,lat2]
"""
import json, sys, time, urllib.parse, urllib.request

url, out = sys.argv[1], sys.argv[2]
where = sys.argv[3] if len(sys.argv) > 3 else "1=1"
bbox = sys.argv[4] if len(sys.argv) > 4 else None
UA = "AO-Personal-OS relocation map builder (personal, low volume)"


def get(params):
    q = urllib.parse.urlencode(params)
    req = urllib.request.Request(url + "/query?" + q, headers={"User-Agent": UA})
    for attempt in range(3):
        try:
            return json.load(urllib.request.urlopen(req, timeout=120))
        except Exception as e:
            if attempt == 2:
                raise
            time.sleep(3)


base = {"where": where, "outFields": "*", "outSR": "4326", "f": "geojson",
        "returnGeometry": "true"}
if bbox:
    base.update({"geometry": bbox, "geometryType": "esriGeometryEnvelope",
                 "inSR": "4326", "spatialRel": "esriSpatialRelIntersects"})
feats, offset, page = [], 0, 1000
while True:
    d = get({**base, "resultOffset": offset, "resultRecordCount": page})
    if "error" in d:
        raise SystemExit("error: %s" % d["error"])
    fs = d.get("features", [])
    feats.extend(fs)
    print("offset", offset, "got", len(fs), file=sys.stderr)
    if len(fs) < page and not d.get("exceededTransferLimit") and not d.get("properties", {}).get("exceededTransferLimit"):
        break
    if not fs:
        break
    offset += len(fs)
    time.sleep(0.5)
json.dump({"type": "FeatureCollection", "features": feats}, open(out, "w"))
print(len(feats), "features ->", out)
