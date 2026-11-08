"""Assemble the publishable page and a local preview copy.

usage: build_page.py <scratch_dir> <tab.json>
<tab.json> comes from fetch_sheet.py (Sheets API: formatted values, row fills, hyperlinks).
Writes build/site/index.html (artifact body, no doctype/head) and build/site/preview.html
(the same body in a full document, for local testing). Also rebuilds fonts/glyphs.json and
data/addr.json when their sources are in the scratch dir; otherwise the copies already in
the repo's site/ stay as they are (they change only when the fonts or the TIGER index do).
Needs <scratch_dir>/data/vendor/maplibre-gl.css (maplibre-gl 4.7.1, from cdnjs or npm) and
<scratch_dir>/build/geocode_cache.json (start from pipeline/geocode_cache.json).
"""
import base64, datetime, json, os, shutil, sys

S, TAB = sys.argv[1], sys.argv[2]
SITE = f"{S}/build/site"
os.makedirs(SITE, exist_ok=True)
tpl = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "page", "template.html"), encoding="utf-8").read()
css = open(f"{S}/data/vendor/maplibre-gl.css", encoding="utf-8").read()

tab = json.load(open(TAB, encoding="utf-8"))
snapshot = {"at": tab["at"], "rows": tab["rows"], "fills": tab.get("fills", {}), "links": tab.get("links", {})}

geo = json.load(open(f"{S}/build/geocode_cache.json"))
geocache = {k: [v["lat"], v["lon"], v["src"]] for k, v in geo.items()}
build = {"built": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%MZ")}


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
wrote = ["index.html", "preview.html"]

# Map label glyphs (Noto Sans, from protomaps basemaps-assets) packed as base64 JSON:
# artifacts serve .json but not .pbf. The page's "glyphs://" protocol unpacks them.
fonts = f"{S}/data/vendor/fonts"
if os.path.isdir(fonts):
    shutil.rmtree(f"{SITE}/fonts", ignore_errors=True)
    os.makedirs(f"{SITE}/fonts", exist_ok=True)
    pack = {}
    for f in ("noto-sans-regular", "noto-sans-medium", "noto-sans-italic"):
        for rng in ("0-255", "8192-8447"):
            pack[f"{f}/{rng}"] = base64.b64encode(open(f"{fonts}/{f}/{rng}.pbf", "rb").read()).decode()
    json.dump(pack, open(f"{SITE}/fonts/glyphs.json", "w"), separators=(",", ":"))
    wrote.append("fonts/glyphs.json")
if os.path.exists(f"{S}/build/addr_index.json"):
    os.makedirs(f"{SITE}/data", exist_ok=True)
    shutil.copy(f"{S}/build/addr_index.json", f"{SITE}/data/addr.json")
    wrote.append("data/addr.json")
print("wrote", ", ".join(wrote), "·", os.path.getsize(f"{SITE}/index.html") // 1024, "KB page ·",
      len(snapshot["rows"]) - 1, "rows in snapshot ·", len(geocache), "pre-geocoded addresses")
