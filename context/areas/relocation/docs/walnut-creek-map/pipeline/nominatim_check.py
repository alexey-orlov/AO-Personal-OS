"""Look each address up in Nominatim (1 request/second, per its usage policy).

usage: nominatim_check.py <keys.json> <out.json>
Keeps only house/building-level hits; the Census interpolation stays the
fallback for the rest.
"""
import json, sys, time, urllib.parse, urllib.request

keys = json.load(open(sys.argv[1]))
out = {}
UA = "AO-Personal-OS relocation map builder (personal, low volume)"
for i, v in keys.items():
    q = f"{v['line']}, Walnut Creek, CA {v['zip']}".strip()
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode(
        {"q": q, "format": "jsonv2", "limit": 3, "countrycodes": "us", "addressdetails": 1})
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        res = json.load(urllib.request.urlopen(req, timeout=30))
    except Exception as e:  # network trouble is a retry, never "not found"
        out[i] = {"key": v["key"], "error": str(e)}
        time.sleep(1.2)
        continue
    hits = [{"lat": float(r["lat"]), "lon": float(r["lon"]), "cat": r.get("category"),
             "type": r.get("type"), "rank": r.get("place_rank"), "name": r.get("display_name")}
            for r in res]
    out[i] = {"key": v["key"], "q": q, "hits": hits}
    time.sleep(1.2)
json.dump(out, open(sys.argv[2], "w"), indent=1)
print("done", len(out))
