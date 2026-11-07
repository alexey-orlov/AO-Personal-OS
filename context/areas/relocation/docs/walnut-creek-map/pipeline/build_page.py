"""Assemble the publishable page and a local preview copy.

usage: build_page.py <scratch_dir> <sheet_tab.csv> <snapshot_unix_ms> [<workbook.xlsx>]
Writes build/site/index.html (artifact body, no doctype/head), build/site/preview.html
(the same body in a full document, for local testing), fonts/ and data/addr.json.
"""
import csv, json, os, shutil, sys, datetime

S, TAB_CSV, AT = sys.argv[1], sys.argv[2], int(sys.argv[3])
SITE = f"{S}/build/site"
tpl = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "page", "template.html"), encoding="utf-8").read()
css = open(f"{S}/data/vendor/maplibre-gl.css", encoding="utf-8").read()

rows = [r for r in csv.reader(open(TAB_CSV, encoding="utf-8"))]
while rows and not any(c.strip() for c in rows[-1]):
    rows.pop()
width = max((max((i for i, c in enumerate(r) if c.strip()), default=-1) for r in rows), default=0) + 1
rows = [r[:width] for r in rows]
# Row highlight colours (visited = yellow, planned = blue in the sheet) live only in the workbook's
# formatting, so they come from the xlsx export: {row index in `rows`: "RRGGBB"}, the solid fill
# most of the row's first 26 cells carry. Only this tab is read; the workbook never leaves the work dir.
fills = {}
if len(sys.argv) > 4:
    import openpyxl
    from collections import Counter
    wb = openpyxl.load_workbook(sys.argv[4], data_only=True)
    ws = next(w for w in wb.worksheets if w.title.strip().lower() == "wc appartment")
    for r in range(1, min(ws.max_row, len(rows)) + 1):
        c = Counter()
        for col in range(1, 27):
            f = ws.cell(r, col).fill
            if f is not None and f.fill_type == "solid" and f.fgColor is not None and f.fgColor.type == "rgb" and f.fgColor.rgb:
                c[str(f.fgColor.rgb)[-6:]] += 1
        if c:
            fills[r - 1] = c.most_common(1)[0][0]
snapshot = {"at": AT, "rows": rows, "fills": fills}

geo = json.load(open(f"{S}/build/geocode_cache.json"))
geocache = {k: [v["lat"], v["lon"], v["src"]] for k, v in geo.items()}
build = {"built": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%MZ")}


def js_json(o):
    return json.dumps(o, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")


page = (tpl.replace("/*@@MAPLIBRE_CSS@@*/", css)
           .replace("@@SNAPSHOT@@", js_json(snapshot))
           .replace("@@GEOCACHE@@", js_json(geocache))
           .replace("@@BUILD@@", js_json(build)))
open(f"{SITE}/index.html", "w", encoding="utf-8").write(page)
reset = ("<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}"
         "body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style>")
preview = ('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
           + reset + "</head><body>" + page + "</body></html>")
open(f"{SITE}/preview.html", "w", encoding="utf-8").write(preview)

# Map label glyphs (Noto Sans, from protomaps basemaps-assets) packed as base64 JSON:
# artifacts serve .json but not .pbf. The page's "glyphs://" protocol unpacks them.
import base64
shutil.rmtree(f"{SITE}/fonts", ignore_errors=True)
os.makedirs(f"{SITE}/fonts", exist_ok=True)
pack = {}
for f in ("noto-sans-regular", "noto-sans-medium", "noto-sans-italic"):
    for rng in ("0-255", "8192-8447"):
        pack[f"{f}/{rng}"] = base64.b64encode(open(f"{S}/data/vendor/fonts/{f}/{rng}.pbf", "rb").read()).decode()
json.dump(pack, open(f"{SITE}/fonts/glyphs.json", "w"), separators=(",", ":"))
shutil.copy(f"{S}/build/addr_index.json", f"{SITE}/data/addr.json")
total = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(SITE) for f in fs)
print("index.html", os.path.getsize(f"{SITE}/index.html") // 1024, "KB; site total", total // 1024, "KB;", len(rows) - 1, "rows in snapshot")
