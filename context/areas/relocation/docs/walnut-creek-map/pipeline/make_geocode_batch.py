"""Write the Census batch-geocoder input from the sheet tab.

usage: make_geocode_batch.py <tab.json from fetch_sheet.py> <out_batch.csv> <out_keys.json>
"""
import csv, json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from addr import street_line, norm_key, zip_of

src, out_batch, out_keys = sys.argv[1:4]
rows = json.load(open(src, encoding="utf-8"))["rows"] if src.endswith(".json") else list(csv.reader(open(src, encoding="utf-8")))
hdr = [h.strip().lower() for h in rows[0]]
ai = hdr.index("address")
seen = {}
for r in rows[1:]:
    a = (r[ai] if ai < len(r) else "").strip()
    if not a:
        continue
    k = norm_key(a)
    if k in seen:
        continue
    line = street_line(a)
    line = re.sub(r"^(\d+)-\d+", r"\1", line)  # 2310-2334 -> 2310
    seen[k] = {"raw": a, "line": line, "zip": zip_of(a)}

with open(out_batch, "w", newline="") as f:
    w = csv.writer(f)
    for i, (k, v) in enumerate(seen.items(), 1):
        w.writerow([i, v["line"], "Walnut Creek", "CA", v["zip"]])
json.dump({str(i): {"key": k, **v} for i, (k, v) in enumerate(seen.items(), 1)},
          open(out_keys, "w"), ensure_ascii=False, indent=1)
print(len(seen), "unique addresses")
