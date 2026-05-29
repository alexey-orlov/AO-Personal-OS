#!/usr/bin/env python3
"""
gbooks_search.py — search the Google Books API and return canonical Google
Play Books links plus a review signal (rating / ratings count).

Why it's bundled: every book-finder run that touches Google Play needs the same
two things from this API — a tappable Play Books URL for a title, and (during
the recommend step) averageRating/ratingsCount as one objective quality signal.
Deriving the API call by hand each run is wasteful and error-prone, so it lives
here once.

Scope: the Google Books `volumes` endpoint covers EBOOKS only. It does NOT cover
Play Books audiobooks — for those the skill uses WebSearch against
play.google.com/store/audiobooks (see references/sources.md).

Stdlib only (urllib). Always prints a JSON object to stdout and exits 0; on error
it returns {"candidates": [], "error": "..."} so the caller can parse the output
unconditionally and degrade to another source.

Usage:
  gbooks_search.py "Sapiens Yuval Noah Harari"
  gbooks_search.py --lang ru --max 5 "Сапиенс Харари"
"""
import argparse
import json
import os
import sys
import urllib.parse
import urllib.request

API = "https://www.googleapis.com/books/v1/volumes"
PLAY_BOOKS = "https://play.google.com/store/books/details?id="
UA = "book-finder/1.0 (+https://github.com/AO-Personal-OS)"


def search(query, lang=None, max_results=5):
    params = {
        "q": query,
        "maxResults": max(1, min(int(max_results), 20)),
        "country": "US",
        "printType": "books",
    }
    if lang:
        params["langRestrict"] = lang
    # Keyless use works but is rate-limited per IP (429). Set GOOGLE_BOOKS_API_KEY
    # to raise the limit; optional.
    key = os.environ.get("GOOGLE_BOOKS_API_KEY")
    if key:
        params["key"] = key
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as resp:
        data = json.load(resp)

    out = []
    for item in data.get("items", []):
        vi = item.get("volumeInfo", {})
        sale = item.get("saleInfo", {})
        access = item.get("accessInfo", {})
        vid = item.get("id")
        epub_ok = bool(access.get("epub", {}).get("isAvailable"))
        is_ebook = (
            bool(sale.get("isEbook"))
            or epub_ok
            or sale.get("saleability") in ("FOR_SALE", "FREE")
        )
        out.append(
            {
                "id": vid,
                "title": vi.get("title"),
                "subtitle": vi.get("subtitle"),
                "authors": vi.get("authors", []),
                "publishedDate": vi.get("publishedDate"),
                "language": vi.get("language"),
                "averageRating": vi.get("averageRating"),
                "ratingsCount": vi.get("ratingsCount"),
                "pageCount": vi.get("pageCount"),
                "ebook_available": bool(is_ebook),
                "epub_available": epub_ok,
                "saleability": sale.get("saleability"),
                # Play Books store link — only meaningful when it's a sellable/free ebook.
                "play_books_url": (PLAY_BOOKS + vid) if (vid and is_ebook) else None,
                "info_link": vi.get("infoLink"),
            }
        )
    return out


def main():
    ap = argparse.ArgumentParser(description="Search Google Books for Play Books links + review signal.")
    ap.add_argument("query", nargs="+", help="title and/or author")
    ap.add_argument("--lang", default=None, help="langRestrict, e.g. en or ru")
    ap.add_argument("--max", type=int, default=5, dest="max_results")
    args = ap.parse_args()
    query = " ".join(args.query)
    try:
        candidates = search(query, lang=args.lang, max_results=args.max_results)
        print(json.dumps({"query": query, "candidates": candidates}, ensure_ascii=False, indent=2))
    except Exception as e:  # noqa: BLE001 — degrade gracefully for the caller
        print(json.dumps({"query": query, "candidates": [], "error": str(e)}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
