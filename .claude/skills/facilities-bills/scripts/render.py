#!/usr/bin/env python3
"""Render page-snapshot bundles (from pagesnap.js download()) to PDFs with headless Chrome.

usage: python3 -I render.py --out OUT_DIR --work WORK_DIR BUNDLE.json [BUNDLE.json ...]

- Stylesheets are fetched once into WORK/assets; their fonts are inlined as data: URIs (a font
  fetched from a file:// page fails CORS and falls back to Helvetica), other url()s absolutized.
- Each page -> WORK/html/NNN.html -> OUT/<folder>/<sub>/<name>.pdf (headless Chrome, JS off,
  Chrome's own header/footer off: the snapshot's @page margin boxes carry date/title/url/page).
- Files the site served itself (bundle "files", from pagesnap.fetchFile) are written as they came.
- Prints one JSON line per PDF: {"pdf", "pages", "bytes"}; exits 1 if any page failed.
"""
import argparse, base64, concurrent.futures as cf, hashlib, json, os, re, subprocess, sys, time, urllib.parse, urllib.request

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
FONT_TYPES = {".ttf": "font/ttf", ".otf": "font/otf", ".woff": "font/woff", ".woff2": "font/woff2"}


FAILED = {}  # href -> error: never retried page after page (a hanging host once stalled a run for hours)


def fetch(url, tries=3):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    for i in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=15) as r:
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
    if href in FAILED:
        return None
    try:
        css = fetch(href).decode("utf-8")
    except OSError as e:
        same_site = urllib.parse.urlparse(href).netloc == urllib.parse.urlparse(page_url).netloc
        if same_site:
            raise SystemExit(f"stylesheet {href} is not in the bundle and cannot be fetched ({e}); "
                             "run `await __ps.collectAssets()` in the page before the download")
        FAILED[href] = str(e)
        print(f"warning: third-party stylesheet dropped: {href} ({e})", file=sys.stderr)
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


PRINT_MJS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "print.mjs")


def print_chunk(chunk, jobs_file, profile):
    """Print a list of jobs with print.mjs (one headless Chrome, DevTools printToPDF with scale).
    Scripts in the snapshots are stripped by pagesnap and blocked by the CSP meta added here;
    print.mjs gives Chrome no network, so a slow or blocking host can never stall a print.
    (`chrome --print-to-pdf` is not used: it has no scale, and --blink-settings=scriptEnabled=false
    makes it write nothing.)"""
    with open(jobs_file, "w", encoding="utf-8") as f:
        json.dump(chunk, f, ensure_ascii=False)
    try:
        out = subprocess.run(["node", PRINT_MJS, jobs_file, profile], capture_output=True, text=True,
                             timeout=60 + 30 * len(chunk)).stdout
    except subprocess.TimeoutExpired:
        out = ""
    done = {}
    for line in out.splitlines():
        try:
            r = json.loads(line)
            done[r["pdf"]] = r
        except ValueError:
            pass
    results = []
    for j in chunk:
        r = done.get(j["pdf"], {"ok": False, "err": "not printed (print.mjs timed out or crashed)"})
        ok = r["ok"] and os.path.exists(j["pdf"]) and os.path.getsize(j["pdf"]) > 1000
        pages = None
        if ok:
            info = subprocess.run(["pdfinfo", j["pdf"]], capture_output=True, text=True).stdout
            m = re.search(r"^Pages:\s+(\d+)", info, re.M)
            pages = int(m.group(1)) if m else None
        results.append({"pdf": j["pdf"], "ok": ok, "pages": pages,
                        "bytes": os.path.getsize(j["pdf"]) if ok else 0, "err": None if ok else r.get("err")})
    return results


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
                attr = f'href="{href.replace("&", "&amp;")}"'
                if local:
                    html = html.replace(attr, f'href="file://{local}"')
                else:  # unreachable third-party sheet (e.g. Google sign-in button): drop the link
                    html = re.sub(r"<link[^>]*" + re.escape(attr) + r"[^>]*>", "", html)
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
            os.makedirs(os.path.dirname(pdf), exist_ok=True)
            # scale < 1 = the print dialog's Scale: the page is laid out at width/scale, which keeps
            # responsive cabinets in their desktop layout (set per page by the provider script)
            # media "screen" = print with the screen styles (a site whose print sheet mangles the page)
            jobs.append({"html": hp, "pdf": pdf, "scale": p.get("scale") or 1, "media": p.get("media") or ""})
    # a few headless Chromes in parallel, each with its own profile and its share of the pages
    chunks = [jobs[i::a.workers] for i in range(a.workers) if jobs[i::a.workers]]
    results = []
    with cf.ThreadPoolExecutor(max_workers=len(chunks) or 1) as ex:
        futs = [ex.submit(print_chunk, c, os.path.join(a.work, f"jobs-{i}.json"), os.path.join(a.work, f"chrome-{i}"))
                for i, c in enumerate(chunks)]
        for fu in futs:
            results.extend(fu.result())
    # documents the site served itself (pagesnap.fetchFile): written as they came, never re-printed
    for bundle in bundles:
        for f in bundle.get("files") or []:
            parts = [safe(x) for x in (f["folder"], f.get("sub") or "") if x]
            pdf = os.path.join(a.out, *parts, safe(f["name"]) + ".pdf")
            os.makedirs(os.path.dirname(pdf), exist_ok=True)
            data = base64.b64decode(f["b64"])
            with open(pdf, "wb") as fh:
                fh.write(data)
            ok = data[:5] == b"%PDF-" and len(data) == f.get("bytes", len(data))
            info = subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout
            m = re.search(r"^Pages:\s+(\d+)", info, re.M)
            results.append({"pdf": pdf, "ok": ok and bool(m), "pages": int(m.group(1)) if m else None,
                            "bytes": len(data), "err": None if ok and m else "site file is not a readable PDF"})
    bad = 0
    for r in sorted(results, key=lambda r: r["pdf"]):
        bad += 0 if r["ok"] else 1
        print(json.dumps(r, ensure_ascii=False))
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
