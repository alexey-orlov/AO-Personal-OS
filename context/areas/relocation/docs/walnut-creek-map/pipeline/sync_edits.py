"""Copy edits made on the rental map's cards into the "WC appartment" tab.

usage: sync_edits.py <edits_dir> [--apply]

<edits_dir> holds the map database's `edits` documents as JSON files, one per listing (<listing id>.json),
e.g. saved with the ArtifactData tool (`list`, collection "edits", out_dir=<dir>). Each document is
{fields: {stage|star|visit|next|notes: {v, basis, at}}, address, title, link, row, at}.

For every field: the listing's row is found by the page's own listing id (street address + listing link, the same
hash the page uses), and the field is written only while the sheet still holds the value the edit was made
against (its basis). A field the sheet already holds is "done"; one whose sheet value changed since is "stale"
and is dropped, because the sheet wins. Without --apply nothing is written.

Prints a JSON report: per listing, what was applied / done / stale / not found, and which fields to remove from
the map's database afterwards ("clear"). Exit codes follow automations/gsheets: 2 API error, 3 credential problem.
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from addr import norm_key  # the page's normKey  # noqa: E402

root = HERE
while root != "/" and not os.path.exists(os.path.join(root, "automations", "gsheets", "gsheets.py")):
    root = os.path.dirname(root)
sys.path.insert(0, os.path.join(root, "automations", "gsheets"))
import gsheets  # noqa: E402

SHEET_ID = "1PH4mTSafR9xAh68KjNQogvMtVsCH_WXsMdfq04Swwvs"
TAB_GID = 2137535785
STAGE = {"to schedule": "To schedule", "нужно запланировать": "To schedule", "planned": "Planned", "запланировано": "Planned",
         "visited": "Visited", "смотрели": "Visited", "dismissed": "Dismissed", "отмели": "Dismissed"}
TRUE_RE = re.compile(r"^(true|yes|y|x|1|✓|✔|★|☑)$", re.I)


def hash32(s, seed):
    """FNV-1a over UTF-16 code units, as the page's hash32 (charCodeAt)."""
    h = seed & 0xFFFFFFFF
    b = s.encode("utf-16-le")
    for i in range(0, len(b), 2):
        h ^= b[i] | (b[i + 1] << 8)
        h = (h * 16777619) & 0xFFFFFFFF
    return "%08x" % h


def listing_id(address, link, title):
    u = re.sub(r"/+$", "", re.sub(r"[?#].*$", "", re.sub(r"^https?://(www\.)?", "", (link or "").lower())))
    basis = norm_key(address or "") + "|" + u + ("" if u else "|" + (title or "").lower().strip())
    return "l" + hash32(basis, 2166136261) + hash32(basis, 3735928559)


def col_letter(i):
    s = ""
    i += 1
    while i:
        i, r = divmod(i - 1, 26)
        s = chr(65 + r) + s
    return s


def load_sheet(svc):
    meta = svc.spreadsheets().get(spreadsheetId=SHEET_ID, fields="sheets(properties(title,sheetId))").execute()
    tab = next(s["properties"]["title"] for s in meta["sheets"] if s["properties"]["sheetId"] == TAB_GID)
    g = svc.spreadsheets().get(spreadsheetId=SHEET_ID, ranges=[f"'{tab}'"], includeGridData="true",
                               fields="sheets(data(rowData(values(formattedValue,hyperlink))))").execute()
    rd = g["sheets"][0]["data"][0].get("rowData", [])
    rows = [[(c.get("formattedValue") or "") for c in r.get("values", [])] for r in rd]
    links = [next((c.get("hyperlink") for c in r.get("values", []) if str(c.get("hyperlink") or "").startswith(("http://", "https://"))), None) for r in rd]
    hdr = [h.strip().lower() for h in rows[0]]

    def col(*names):
        for n in names:
            nn = re.sub(r"[^a-z]", "", n)
            for j, h in enumerate(hdr):
                if h == n or (nn and re.sub(r"[^a-z]", "", h) == nn):
                    return j
        return -1
    C = {"address": col("address"), "title": col("title", "name"), "link": col("link", "url"), "starred": col("starred", "star", "favorite", "favourite"),
         "stage": col("stage", "этап"), "next": col("next step", "next", "следующий шаг"), "visit": col("visit", "viewing", "визит", "просмотр"),
         "notes": col("notes", "comments")}
    for k in ("address", "stage", "next", "visit", "notes", "starred"):
        if C[k] < 0:
            raise SystemExit(f"column for {k!r} not found in the header: {rows[0]}")
    listings = {}
    for i, r in enumerate(rows[1:], start=1):
        get = lambda j: (r[j] if 0 <= j < len(r) else "").strip()
        if not any(v.strip() for v in r):
            continue
        address, title = get(C["address"]), get(C["title"])
        title_note = title[1:-1] if re.match(r"^<.*>$", title) else ""
        if title_note:
            title = ""
        link = links[i] or get(C["link"])
        link = link if re.match(r"^https?://", link, re.I) else ""
        lid = listing_id(address, link, title or title_note)
        # rows with the same address and link (duplicate rows) share one id and get the same edits
        listings.setdefault(lid, []).append({"row": i + 1, "address": address, "values": {
            "stage": STAGE.get(get(C["stage"]).lower(), ""), "star": bool(TRUE_RE.match(get(C["starred"]))),
            "visit": get(C["visit"]), "next": get(C["next"]), "notes": get(C["notes"])}})
    return tab, C, listings


def main(edits_dir, apply):
    svc = gsheets.service()
    tab, C, listings = load_sheet(svc)
    report, writes = [], []
    for fn in sorted(os.listdir(edits_dir)):
        if not fn.endswith(".json"):
            continue
        lid, doc = fn[:-5], json.load(open(os.path.join(edits_dir, fn), encoding="utf-8"))
        doc = doc.get("data", doc) if isinstance(doc, dict) else {}
        item = {"id": lid, "address": doc.get("address", ""), "applied": [], "done": [], "stale": [], "clear": []}
        rows = listings.get(lid)
        if not rows:
            item["not_found"] = True
            report.append(item)
            continue
        item["rows"] = [L["row"] for L in rows]
        for f, e in (doc.get("fields") or {}).items():
            if f not in rows[0]["values"] or not isinstance(e, dict):
                continue
            v, basis = e.get("v"), e.get("basis")
            for L in rows:
                cur = L["values"][f]
                if cur == v:
                    item["done"].append(f"{f}@{L['row']}")
                elif cur == basis:
                    item["applied"].append(f"{f}@{L['row']}")
                    cell = f"'{tab}'!{col_letter(C['starred' if f == 'star' else f])}{L['row']}"
                    writes.append({"range": cell, "values": [[bool(v) if f == "star" else (v or "")]]})
                else:
                    item["stale"].append({"field": f, "row": L["row"], "sheet": cur, "edit": v, "basis": basis})
            item["clear"].append(f)
        report.append(item)
    if apply and writes:
        res = svc.spreadsheets().values().batchUpdate(spreadsheetId=SHEET_ID, body={"valueInputOption": "RAW", "data": writes}).execute()
        print(f"wrote {res.get('totalUpdatedCells')} cells", file=sys.stderr)
    print(json.dumps({"apply": apply, "writes": writes, "listings": report}, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    try:
        main(sys.argv[1], "--apply" in sys.argv[2:])
    except gsheets.SheetsError as e:
        print(e, file=sys.stderr)
        sys.exit(e.code)
