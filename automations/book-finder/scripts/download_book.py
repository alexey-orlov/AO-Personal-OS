#!/usr/bin/env python3
"""
download_book.py — download an ebook file (epub/fb2) into the book-finder
download dir (iCloud Drive/Books by default) so it syncs to the iPhone Files app
and can be imported into Play Books.

Policy (mirrors the book-finder skill's hard rules):
  - Accept .epub, .fb2, .fb2.zip. Prefer EPUB (Play Books upload accepts EPUB/PDF,
    not fb2 — the skill should pass an EPUB url when one exists).
  - Reject .pdf ("pdf not desirable").
  - Reject unknown types (avoids saving an HTML error page as if it were a book).
  - Skip if a file with the same name already exists (dup-download guard).

Stdlib only. Prints a JSON result to stdout. Exit 0 on download or skip;
exit 1 on rejection or error. The caller should branch on the JSON "status"
("downloaded" | "skipped-exists" | "rejected" | "error") rather than just the code.

Usage:
  download_book.py "https://example.org/book.epub"
  download_book.py --name "Tolstoy - War and Peace" "https://host/file.fb2.zip"
  BOOKS_DIR=/tmp/books download_book.py "https://host/book.epub"
"""
import argparse
import json
import os
import re
import sys
import urllib.parse
import urllib.request

ALLOWED = (".fb2.zip", ".epub", ".fb2")  # longest suffix first so .fb2.zip wins
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)


def default_dir():
    d = os.environ.get("BOOKS_DIR")
    if d:
        return os.path.expanduser(d)
    return os.path.expanduser("~/Library/Mobile Documents/com~apple~CloudDocs/Books")


def sanitize(name):
    name = (name or "").strip().replace("/", "-")
    name = re.sub(r'[\x00-\x1f<>:"\\|?*]', "", name)
    name = re.sub(r"\s+", " ", name).strip()
    return name[:180]


def server_filename(url, headers):
    cd = headers.get("Content-Disposition", "") or ""
    m = re.search(r"filename\*=UTF-8''([^;]+)", cd, re.I) or re.search(r'filename="?([^";]+)"?', cd, re.I)
    if m:
        return urllib.parse.unquote(m.group(1)).strip()
    return os.path.basename(urllib.parse.urlparse(url).path)


def detect_ext(*names, content_type=""):
    for hay in names:
        low = (hay or "").lower()
        for ext in ALLOWED:
            if low.endswith(ext):
                return ext
        if low.endswith(".pdf"):
            return ".pdf"
    ct = (content_type or "").lower()
    if "epub" in ct:
        return ".epub"
    if "pdf" in ct:
        return ".pdf"
    return None


def strip_known_ext(base):
    low = base.lower()
    for ext in ALLOWED + (".pdf",):
        if low.endswith(ext):
            return base[: -len(ext)]
    return base


def result(status, **kw):
    obj = {"status": status}
    obj.update(kw)
    print(json.dumps(obj, ensure_ascii=False))
    return 0 if status in ("downloaded", "skipped-exists") else 1


def main():
    ap = argparse.ArgumentParser(description="Download an epub/fb2 into the iCloud Books dir.")
    ap.add_argument("url")
    ap.add_argument("--name", default=None, help="preferred base filename (extension is added automatically)")
    ap.add_argument("--dir", default=None, help="override download dir (else $BOOKS_DIR)")
    args = ap.parse_args()

    dest_dir = os.path.expanduser(args.dir) if args.dir else default_dir()
    os.makedirs(dest_dir, exist_ok=True)

    # Early reject: a URL that plainly points at a PDF — don't even fetch it.
    if urllib.parse.urlparse(args.url).path.lower().endswith(".pdf"):
        return result("rejected", url=args.url, reason="pdf-not-allowed")

    req = urllib.request.Request(args.url, headers={"User-Agent": UA})
    try:
        resp = urllib.request.urlopen(req, timeout=60)
    except Exception as e:  # noqa: BLE001
        return result("error", url=args.url, reason=f"request-failed: {e}")

    with resp:
        srv_name = server_filename(args.url, resp.headers)
        ext = detect_ext(args.name or "", srv_name, args.url, content_type=resp.headers.get("Content-Type"))

        if ext == ".pdf":
            return result("rejected", url=args.url, reason="pdf-not-allowed")
        if ext is None:
            return result(
                "rejected",
                url=args.url,
                reason="unsupported-type (not epub/fb2)",
                content_type=resp.headers.get("Content-Type"),
            )

        base = strip_known_ext(args.name) if args.name else strip_known_ext(srv_name)
        base = sanitize(base) or "book"
        filename = base + ext
        dest = os.path.join(dest_dir, filename)

        if os.path.exists(dest):
            return result("skipped-exists", path=dest, filename=filename, dir=dest_dir)

        tmp = dest + ".part"
        size = 0
        try:
            with open(tmp, "wb") as fh:
                while True:
                    chunk = resp.read(65536)
                    if not chunk:
                        break
                    fh.write(chunk)
                    size += len(chunk)
            os.replace(tmp, dest)
        except Exception as e:  # noqa: BLE001
            try:
                os.remove(tmp)
            except OSError:
                pass
            return result("error", url=args.url, reason=f"write-failed: {e}")

    return result("downloaded", path=dest, filename=filename, dir=dest_dir, bytes=size)


if __name__ == "__main__":
    sys.exit(main())
