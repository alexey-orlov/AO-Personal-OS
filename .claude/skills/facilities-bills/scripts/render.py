#!/usr/bin/env python3
"""Render page-snapshot bundles (from pagesnap.js download()) to PDFs with headless Chrome.

usage: python3 -I render.py --out OUT_DIR --work WORK_DIR BUNDLE.json [BUNDLE.json ...]

- Stylesheets are fetched once into WORK/assets; their fonts are inlined as data: URIs (a font
  fetched from a file:// page fails CORS and falls back to Helvetica), other url()s absolutized.
- Each page -> WORK/html/NNN.html -> OUT/<folder>/<sub>/<name>.pdf (headless Chrome, JS off,
  Chrome's own header/footer off: the snapshot's @page margin boxes carry date/title/url/page).
- Prints one JSON line per PDF: {"pdf", "pages", "bytes"}; exits 1 if any page failed.
"""
import argparse, base64, concurrent.futures as cf, hashlib, json, os, re, subprocess, sys, time, urllib.parse, urllib.request

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
FONT_TYPES = {".ttf": "font/ttf", ".otf": "font/otf", ".woff": "font/woff", ".woff2": "font/woff2"}


def fetch(url, tries=4):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    for i in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read()
        except OSError:  # yasno.ua TLS handshakes time out now and then
            if i == tries - 1:
                raise
            time.sleep(3 * (i + 1))


def asset_path(href, assets_dir):
    name = hashlib.sha1(href.encode()).hexdigest()[:10] + "-" + os.path.basename(urllib.parse.urlparse(href).path)
    return os.path.join(assets_dir, name)


def localize_css(href, assets_dir, page_url=""):
    path = asset_path(href, assets_dir)
    if os.path.exists(path):
        return path
    try:
        css = fetch(href).decode("utf-8")
    except OSError as e:
        same_site = urllib.parse.urlparse(href).netloc == urllib.parse.urlparse(page_url).netloc
        if same_site:
            raise SystemExit(f"stylesheet {href} is not in the bundle and cannot be fetched ({e}); "
                             "run `await __ps.collectAssets()` in the page before the download")
        print(f"warning: third-party stylesheet skipped: {href} ({e})", file=sys.stderr)
        return None

    def repl(m):
        ref = m.group(2)
        if ref.startswith(("data:", "#", "%23")):
            return m.group(0)
        absu = urllib.parse.urljoin(href, ref)
        ext = os.path.splitext(urllib.parse.urlparse(absu).path)[1].lower()
        if ext in FONT_TYPES:
            data = base64.b64encode(fetch(absu)).decode()
            return f'url("data:{FONT_TYPES[ext]};base64,{data}")'
        return f'url("{absu}")'

    css = re.sub(r"url\(\s*(['\"]?)([^'\")]+)\1\s*\)", repl, css)
    with open(path, "w", encoding="utf-8") as f:
        f.write(css)
    return path


def safe(part):
    return re.sub(r'[/\\:*?"<>|]', "-", part).strip()


def render_one(job):
    html_path, pdf_path, profile = job
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
    # NB: --blink-settings=scriptEnabled=false makes headless print-to-pdf silently write nothing;
    # scripts are stripped by the snapshotter and blocked by the CSP meta injected below instead.
    cmd = [CHROME, "--headless", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
           "--no-pdf-header-footer", "--allow-file-access-from-files",
           f"--user-data-dir={profile}", "--virtual-time-budget=3000",
           f"--print-to-pdf={pdf_path}", "file://" + html_path]
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    ok = os.path.exists(pdf_path) and os.path.getsize(pdf_path) > 1000
    pages = None
    if ok:
        info = subprocess.run(["pdfinfo", pdf_path], capture_output=True, text=True).stdout
        m = re.search(r"^Pages:\s+(\d+)", info, re.M)
        pages = int(m.group(1)) if m else None
    return {"pdf": pdf_path, "ok": ok, "pages": pages, "bytes": os.path.getsize(pdf_path) if ok else 0,
            "err": None if ok else r.stderr[-400:]}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    ap.add_argument("--work", required=True)
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("bundles", nargs="+")
    a = ap.parse_args()
    assets = os.path.join(a.work, "assets"); htmld = os.path.join(a.work, "html")
    os.makedirs(assets, exist_ok=True); os.makedirs(htmld, exist_ok=True)
    jobs, n = [], 0
    bundles = []
    for b in a.bundles:
        with open(b, encoding="utf-8") as f:
            bundles.append(json.load(f))
    # stylesheets shipped by pagesnap.collectAssets (fetched inside the logged-in page): written
    # into the asset cache first, so localize_css never has to fetch them (some sites answer 403)
    for bundle in bundles:
        for href, text in (bundle.get("assets") or {}).items():
            if text:
                path = asset_path(href, assets)
                if not os.path.exists(path):
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(text)
    for bundle in bundles:
        for p in bundle["pages"]:
            html = re.sub(r"<head([^>]*)>", r'<head\1><meta http-equiv="Content-Security-Policy" content="script-src \'none\'">',
                          p["html"], count=1)
            if p.get("landscape"):
                html = html.replace("size: A4;", "size: A4 landscape;", 1)
            for href in dict.fromkeys(p.get("cssHrefs", [])):
                local = localize_css(href, assets, p.get("url", ""))
                if local:
                    html = html.replace(f'href="{href.replace("&", "&amp;")}"', f'href="file://{local}"')
            shipped = {}
            for bundle_ in bundles:
                shipped.update({k: v for k, v in (bundle_.get("assets") or {}).items() if v})
            for key, src in (p.get("imgs") or {}).items():
                html = html.replace(f'src="{key}"', f'src="{shipped.get(src) or src.replace("&", "&amp;")}"')
            n += 1
            hp = os.path.join(htmld, f"{n:03d}.html")
            with open(hp, "w", encoding="utf-8") as f:
                f.write(html)
            parts = [safe(x) for x in (p["folder"], p.get("sub") or "") if x]
            pdf = os.path.join(a.out, *parts, safe(p["name"]) + ".pdf")
            jobs.append((hp, pdf, os.path.join(a.work, f"chrome-{n % a.workers}")))
    # one Chrome profile per worker slot: run slot-by-slot in parallel, jobs within a slot serially
    slots = {}
    for j in jobs:
        slots.setdefault(j[2], []).append(j)
    results = []
    with cf.ThreadPoolExecutor(max_workers=a.workers) as ex:
        for res in ex.map(lambda js: [render_one(j) for j in js], slots.values()):
            results.extend(res)
    bad = 0
    for r in sorted(results, key=lambda r: r["pdf"]):
        bad += 0 if r["ok"] else 1
        print(json.dumps(r, ensure_ascii=False))
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
