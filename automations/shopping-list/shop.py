"""Shopping-list helper: add / update / delete / sort / show rows on 'Покупки'.

usage: shop.py add < items.json        (list of {room, place, cat, type, item, en, details,
                                         qty, prio, status, price, where, notes})
       shop.py update < [{"id": 3, "status": "Куплено", ...}]
       shop.py delete 3 7 ...
       shop.py sort | show
Every write re-reads the sheet first (hand edits survive) and re-sorts by the
order of the lists on 'Списки' (room → category → type → priority → item).
"""
import datetime, json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "gsheets"))
import gsheets  # noqa: E402

# "Квартира — список покупок" (registry: context/_meta/external-sources.md)
SID = os.environ.get("SHOPPING_SHEET_ID", "1cXoNLMtQ6ATPKUG1HK9nKRXFCa3eUvkC9MfviQfYUO4")
svc = gsheets.service()
V = svc.spreadsheets().values()

# column letter → field
COLS = ["id", "room", "place", "cat", "type", "item", "en", "details", "qty", "prio",
        "status", "price", "_sum", "where", "notes", "added"]
SUM = COLS.index("_sum")


def get(rng):
    return V.get(spreadsheetId=SID, range=rng, valueRenderOption="UNFORMATTED_VALUE",
                 dateTimeRenderOption="SERIAL_NUMBER").execute().get("values", [])


def col(rows, i):
    return [r[i] for r in rows if len(r) > i and str(r[i]).strip()]


def lists():
    rows = get("'Списки'!A2:J100")
    types = {r[4]: r[5] for r in rows if len(r) > 5 and r[4]}
    return {"room": col(rows, 0), "cat": col(rows, 2), "type": col(rows, 4),
            "prio": col(rows, 7), "status": col(rows, 9), "type2cat": types,
            "_n": {k: len(col(rows, i)) for k, i in (("room", 0), ("cat", 2), ("type", 4))}}


def read_rows():
    out = []
    for r in get("'Покупки'!A2:P1000"):
        r = list(r) + [""] * (16 - len(r))
        if any(str(x).strip() for j, x in enumerate(r) if j != SUM):
            out.append(dict(zip(COLS, r)))
    return out


def extend_lists(L, rows):
    """New room / category / type values → append to 'Списки' so dropdowns know them."""
    added, data = [], []
    for key, letter in (("room", "A"), ("cat", "C"), ("type", "E")):
        for r in rows:
            v = r.get(key, "")
            if v and v not in L[key]:
                L[key].append(v)
                row = L["_n"][key] + 2
                L["_n"][key] += 1
                vals = [[v, r.get("cat", "")]] if key == "type" else [[v]]
                if key == "type":
                    L["type2cat"][v] = r.get("cat", "")
                end = "F" if key == "type" else letter
                data.append({"range": f"'Списки'!{letter}{row}:{end}{row}", "values": vals})
                added.append(f"{key}: {v}")
    if data:
        V.batchUpdate(spreadsheetId=SID, body={"valueInputOption": "RAW", "data": data}).execute()
    return added


def key(L):
    def idx(lst, v):
        return lst.index(v) if v in lst else len(lst)
    return lambda r: (idx(L["room"], r["room"]), idx(L["cat"], r["cat"]),
                      idx(L["type"], r["type"]), idx(L["prio"], r["prio"]),
                      str(r["item"]).lower())


def write(rows, prev_n, L):
    rows.sort(key=key(L))
    n = len(rows)
    left = [[r[c] if r[c] != "" else "" for c in COLS[0:SUM]] for r in rows]
    right_raw = [[r["notes"], r["added"]] for r in rows]
    links = [[r["where"]] for r in rows]
    data_raw = [{"range": f"'Покупки'!A2:L{n + 1}", "values": left},
                {"range": f"'Покупки'!O2:P{n + 1}", "values": right_raw}]
    if n:
        V.batchUpdate(spreadsheetId=SID, body={"valueInputOption": "RAW", "data": data_raw}).execute()
        V.batchUpdate(spreadsheetId=SID, body={"valueInputOption": "USER_ENTERED", "data": [
            {"range": f"'Покупки'!N2:N{n + 1}", "values": links}]}).execute()
    if prev_n > n:
        V.batchClear(spreadsheetId=SID, body={"ranges": [
            f"'Покупки'!A{n + 2}:L{prev_n + 1}", f"'Покупки'!N{n + 2}:P{prev_n + 1}"]}).execute()


def today_serial():
    return (datetime.date.today() - datetime.date(1899, 12, 30)).days


def norm(item, L):
    r = {c: "" for c in COLS}
    r.update({k: v for k, v in item.items() if k in COLS and v is not None})
    if not r["cat"] and r["type"] in L["type2cat"]:
        r["cat"] = L["type2cat"][r["type"]]
    if not r["status"]:
        r["status"] = "Идея"
    for k in ("qty", "price"):
        if r[k] != "" and not isinstance(r[k], (int, float)):
            raise SystemExit(f"{k} must be a number: {r[k]!r} ({r['item']})")
    for k in ("prio", "status"):
        if r[k] and r[k] not in L[k]:
            raise SystemExit(f"unknown {k} {r[k]!r}; allowed: {L[k]}")
    return r


def show(rows):
    for r in rows:
        print(" | ".join(str(r[c]) for c in ("id", "room", "cat", "type", "item", "en", "details",
                                              "qty", "prio", "status", "price", "where", "notes")))


def main(argv):
    cmd = argv[0] if argv else "show"
    L = lists()
    rows = read_rows()
    prev_n = len(rows)
    if cmd == "show":
        show(sorted(rows, key=key(L)))
        return
    if cmd == "add":
        items = json.load(sys.stdin)
        nxt = max([int(r["id"]) for r in rows if str(r["id"]).strip()] + [0]) + 1
        new = []
        for it in items:
            r = norm(it, L)
            r["id"], r["added"] = nxt, today_serial()
            nxt += 1
            new.append(r)
        added = extend_lists(L, new)
        rows += new
        print("added ids:", [r["id"] for r in new])
        if added:
            print("new list values:", added)
    elif cmd == "update":
        for ch in json.load(sys.stdin):
            hit = [r for r in rows if str(r["id"]) == str(ch["id"])]
            if not hit:
                raise SystemExit(f"no id {ch['id']}")
            for k, v in ch.items():
                if k != "id":
                    hit[0][k] = v
            norm({k: v for k, v in hit[0].items()}, L)
        print("new list values:", extend_lists(L, rows))
    elif cmd == "delete":
        ids = set(argv[1:])
        rows = [r for r in rows if str(r["id"]) not in ids]
    elif cmd != "sort":
        raise SystemExit(__doc__)
    write(rows, prev_n, L)
    show(rows)


if __name__ == "__main__":
    main(sys.argv[1:])
