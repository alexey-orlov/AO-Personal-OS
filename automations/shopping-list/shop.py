"""Shopping-list helper: add / update / delete / sort / show rows on 'Покупки'.

usage: shop.py add < items.json        (list of {room, place, cat, type, item, en, details,
                                         qty, prio, status, price, where, notes})
       shop.py update < [{"id": 3, "status": "Куплено", ...}]
       shop.py delete 3 7 ...
       shop.py sort | show
Every write re-reads the sheet first (hand edits survive) and re-sorts by the
order of the lists on 'Списки' (room → category → type → priority → item).
Columns are found by their header text, so Alex can reorder them by hand.
"""
import datetime, json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "gsheets"))
import gsheets  # noqa: E402

# "Квартира — список покупок" (registry: context/_meta/external-sources.md)
SID = os.environ.get("SHOPPING_SHEET_ID", "1cXoNLMtQ6ATPKUG1HK9nKRXFCa3eUvkC9MfviQfYUO4")
svc = gsheets.service()
V = svc.spreadsheets().values()

# header prefix → field (a header only has to START with the prefix)
FIELDS = {"№": "id", "Комната": "room", "Место в комнате": "place", "Категория": "cat",
          "Тип": "type", "Что купить": "item", "Как называется в US": "en", "Детали": "details",
          "Кол-во": "qty", "Приоритет": "prio", "Статус": "status", "Цена за шт": "price",
          "Сумма": "_sum", "Брать в IKEA": "ikea", "Где купить": "where", "Заметки": "notes",
          "Добавлено": "added"}


def letter(i):
    s = ""
    i += 1
    while i:
        i, r = divmod(i - 1, 26)
        s = chr(65 + r) + s
    return s


def get(rng):
    return V.get(spreadsheetId=SID, range=rng, valueRenderOption="UNFORMATTED_VALUE",
                 dateTimeRenderOption="SERIAL_NUMBER").execute().get("values", [])


def layout():
    head = get("'Покупки'!1:1")[0]
    cols = {}
    for i, h in enumerate(head):
        for pre, f in FIELDS.items():
            if str(h).strip().startswith(pre):
                cols[f] = i
    missing = sorted(set(FIELDS.values()) - set(cols))
    if missing:
        raise SystemExit(f"header has no column for {missing}; header is {head}")
    return cols, len(head)


COLS, WIDTH = layout()


def col(rows, i):
    return [r[i] for r in rows if len(r) > i and str(r[i]).strip()]


def lists():
    rows = get("'Списки'!A2:J100")
    types = {r[4]: r[5] for r in rows if len(r) > 5 and r[4]}
    return {"room": col(rows, 0), "cat": col(rows, 2), "type": col(rows, 4),
            "prio": col(rows, 7), "status": col(rows, 9), "type2cat": types,
            "_n": {k: len(col(rows, i)) for k, i in (("room", 0), ("cat", 2), ("type", 4))}}


def read_rows():
    """Values as numbers/booleans/dates, except cells holding a formula (e.g. a
    HYPERLINK in «Где купить»), which come back as the formula so a rewrite keeps them."""
    rng = f"'Покупки'!A2:{letter(WIDTH - 1)}1000"
    vals = get(rng)
    forms = V.get(spreadsheetId=SID, range=rng, valueRenderOption="FORMULA").execute().get("values", [])
    out = []
    for k, r in enumerate(vals):
        r = list(r) + [""] * (WIDTH - len(r))
        fr = (forms[k] if k < len(forms) else []) + [""] * WIDTH
        r = [fr[j] if isinstance(fr[j], str) and fr[j].startswith("=") else x for j, x in enumerate(r)]
        filled = any(str(x).strip() for j, x in enumerate(r) if j not in (COLS["_sum"], COLS["ikea"]))
        if filled or r[COLS["ikea"]] is True:
            out.append({f: r[i] for f, i in COLS.items()})
    return out


def extend_lists(L, rows):
    """New room / category / type values → append to 'Списки' so dropdowns know them."""
    added, data = [], []
    for key, lt in (("room", "A"), ("cat", "C"), ("type", "E")):
        for r in rows:
            v = r.get(key, "")
            if v and v not in L[key]:
                L[key].append(v)
                row = L["_n"][key] + 2
                L["_n"][key] += 1
                vals = [[v, r.get("cat", "")]] if key == "type" else [[v]]
                if key == "type":
                    L["type2cat"][v] = r.get("cat", "")
                end = "F" if key == "type" else lt
                data.append({"range": f"'Списки'!{lt}{row}:{end}{row}", "values": vals})
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


def segments():
    """Contiguous column spans to write — every column except the formula one."""
    s = COLS["_sum"]
    return [(a, b) for a, b in ((0, s), (s + 1, WIDTH)) if b > a]


def write(rows, prev_n, L):
    rows.sort(key=key(L))
    n = len(rows)
    by_pos = {i: f for f, i in COLS.items()}
    full = [[r.get(by_pos[i], "") if i in by_pos else "" for i in range(WIDTH)] for r in rows]
    if n:
        data = [{"range": f"'Покупки'!{letter(a)}2:{letter(b - 1)}{n + 1}",
                 "values": [row[a:b] for row in full]} for a, b in segments()]
        V.batchUpdate(spreadsheetId=SID, body={"valueInputOption": "RAW", "data": data}).execute()
        # USER_ENTERED pass: the «Где купить» column (plain URLs become links) and any
        # other cell holding a formula, so formulas are re-entered as formulas.
        w = letter(COLS["where"])
        ue = [{"range": f"'Покупки'!{w}2:{w}{n + 1}", "values": [[r["where"]] for r in rows]}]
        for k, row in enumerate(full):
            for j, x in enumerate(row):
                if j not in (COLS["_sum"], COLS["where"]) and isinstance(x, str) and x.startswith("="):
                    ue.append({"range": f"'Покупки'!{letter(j)}{k + 2}", "values": [[x]]})
        V.batchUpdate(spreadsheetId=SID, body={"valueInputOption": "USER_ENTERED", "data": ue}).execute()
    if prev_n > n:
        V.batchClear(spreadsheetId=SID, body={"ranges": [
            f"'Покупки'!{letter(a)}{n + 2}:{letter(b - 1)}{prev_n + 1}" for a, b in segments()]}).execute()


def today_serial():
    return (datetime.date.today() - datetime.date(1899, 12, 30)).days


def norm(item, L):
    r = {f: "" for f in FIELDS.values()}
    r.update({k: v for k, v in item.items() if k in r and v is not None})
    if not r["cat"] and r["type"] in L["type2cat"]:
        r["cat"] = L["type2cat"][r["type"]]
    if not r["status"]:
        r["status"] = "Идея"
    if r["ikea"] == "":
        r["ikea"] = False
    for k in ("qty", "price"):
        if r[k] != "" and not isinstance(r[k], (int, float)):
            raise SystemExit(f"{k} must be a number: {r[k]!r} ({r['item']})")
    for k in ("prio", "status"):
        if r[k] and r[k] not in L[k]:
            raise SystemExit(f"unknown {k} {r[k]!r}; allowed: {L[k]}")
    return r


def show(rows):
    for r in rows:
        print(" | ".join(str(r[c]) for c in ("id", "room", "prio", "place", "cat", "type", "item", "en",
                                              "details", "qty", "status", "price", "where", "notes")))


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
            norm(dict(hit[0]), L)
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
