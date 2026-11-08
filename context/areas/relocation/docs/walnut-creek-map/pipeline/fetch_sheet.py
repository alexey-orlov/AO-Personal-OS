"""Fetch the "WC appartment" tab through the Sheets API (the shared gsheets credential).

usage: fetch_sheet.py <out_tab.json>

Writes {"title", "at", "rows", "fills", "links"}:
  rows   every row from the header down to the last non-empty row, as the sheet shows it
         (formatted values, so text such as "Upon request" or "2800-3167" survives in a
         number column, which the gviz CSV export used to blank out)
  fills  {row index in rows: "RRGGBB"}, the solid background most of the row's first 26
         cells carry (yellow = visited, blue = planned; the page decides which is which)
  links  {row index: first http(s) hyperlink in the row}
  at     fetch time, epoch ms (the page shows it as "Snapshot from ...")
Only this tab is read; the workbook's other tabs never leave Google.
Exit codes follow automations/gsheets: 2 = API/network error (retry), 3 = credential problem.
"""
import json, os, sys, time
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
root = HERE
while root != "/" and not os.path.exists(os.path.join(root, "automations", "gsheets", "gsheets.py")):
    root = os.path.dirname(root)
sys.path.insert(0, os.path.join(root, "automations", "gsheets"))
import gsheets  # noqa: E402

SHEET_ID = "1PH4mTSafR9xAh68KjNQogvMtVsCH_WXsMdfq04Swwvs"
TAB_GID = 2137535785


def hex_fill(cell):
    bg = ((cell.get("userEnteredFormat") or {}).get("backgroundColor")) or None
    if not bg:
        return None
    rgb = tuple(round(255 * bg.get(k, 0)) for k in ("red", "green", "blue"))
    if rgb == (255, 255, 255):
        return None
    return "%02X%02X%02X" % rgb


def main(out):
    svc = gsheets.service()
    meta = svc.spreadsheets().get(spreadsheetId=SHEET_ID, fields="sheets(properties(title,sheetId))").execute()
    title = next(s["properties"]["title"] for s in meta["sheets"] if s["properties"]["sheetId"] == TAB_GID)
    grid = svc.spreadsheets().get(
        spreadsheetId=SHEET_ID, ranges=[f"'{title}'"], includeGridData="true",
        fields="sheets(data(rowData(values(formattedValue,hyperlink,userEnteredFormat(backgroundColor)))))").execute()
    data = grid["sheets"][0]["data"][0].get("rowData", [])
    cells = [r.get("values", []) for r in data]
    text = [[(c.get("formattedValue") or "") for c in r] for r in cells]
    last = max((i for i, r in enumerate(text) if any(v.strip() for v in r)), default=-1)
    width = max((max((j for j, v in enumerate(r) if v.strip()), default=-1) for r in text[:last + 1]), default=-1) + 1
    rows = [(r + [""] * width)[:width] for r in text[:last + 1]]
    fills, links = {}, {}
    for i, r in enumerate(cells[:last + 1]):
        c = Counter(h for h in (hex_fill(x) for x in r[:26]) if h)
        if c:
            fills[str(i)] = c.most_common(1)[0][0]
        url = next((x.get("hyperlink") for x in r if str(x.get("hyperlink") or "").startswith(("http://", "https://"))), None)
        if url:
            links[str(i)] = url
    snap = {"title": title, "at": int(time.time() * 1000), "rows": rows, "fills": fills, "links": links}
    json.dump(snap, open(out, "w", encoding="utf-8"), ensure_ascii=False)
    print(f"{title!r}: {len(rows) - 1} rows below the header, {width} columns, {len(fills)} highlighted, {len(links)} hyperlinks")


if __name__ == "__main__":
    try:
        main(sys.argv[1])
    except gsheets.SheetsError as e:
        print(e, file=sys.stderr)
        sys.exit(e.code)
