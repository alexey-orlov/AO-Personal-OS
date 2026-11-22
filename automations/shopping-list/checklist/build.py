"""Build the apartment checklist page from the shopping-list sheet.

usage: python3 build.py OUT.html

Tabs by kind of thing (Alex, 2026-11-22): Мебель · Аксессуары и декор · Техника · Другое
(«Другое» only holds what fits none of the first three). Every sheet row is on the page;
whether it shows as bought or not needed comes only from the page's db, which sync.py keeps
equal to the sheet's «Статус» (Куплено / Отказались) — run sync.py before building.

Each card lists where to look:
- IKEA — the «Где купить» HYPERLINK (ticked «Брать в IKEA», or an IKEA example);
- Target — rows curated in target.json (id → hint), only rows NOT ticked for IKEA;
- ReStore — computed: furniture, lamps and ceiling fans, mirrors, wall art, the fireplace,
  rugs (not bath mats), the curtain rod and the step stool — places to look for used;
- other stores — OTHER_RULES below (item name → store, hint).
The page filters by store, so in a shop it shows only what to look for there.
Then publish OUT.html to the existing artifact (Artifact tool, `url` =
https://claude.ai/artifact/KVAmZoKZHmESb4HZvLyH1P) — the marks live in its db and survive.
"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, ".."))
import shop  # noqa: E402  (the shopping-list helper; reads the sheet)

TABS = ["furniture", "decor", "tech", "other"]

RESTORE_TYPES = {"Диваны и кресла", "Столы", "Стулья и табуреты", "Детская мебель", "Тумбы",
                 "Стеллажи и полки", "Перегородки", "Шкафы и комоды", "Уличная мебель",
                 "Лампы и торшеры", "Потолочный свет", "Зеркала", "Картины и рамки", "Камины",
                 "Ковры", "Шторы и жалюзи", "Инструменты"}
RESTORE_SKIP_ITEMS = {"Кольцевая лампа", "Лопасти для вентилятора", "Шторы", "Рулонная штора",
                      "Увеличительное зеркало", "Украшение на дверь"}

# Rows no store list covers: item name → (store label, hint).
OTHER_RULES = {
    "Растение": ("Trader Joe's · Home Depot", "Дешевле всего там: pothos около $8–10; в IKEA $13–17"),
    "Лопасти для вентилятора": ("Home Depot", "Модель — на наклейке мотора; комплект из 5 лопастей $13–37"),
    "Ручки для шкафчиков": ("Amazon", "Ищи self-adhesive cabinet handles; в IKEA и Target на липучке нет"),
    "Украшение на дверь": ("Amazon", "Ищи eagle wall decor"),
    "Присоска": ("Amazon", "Ищи heavy duty suction cup; крепче всего держат вакуумные с рычажком (lever)"),
    "Перфорированная панель": ("", "Магниты к обычной SKÅDIS (ДВП) не липнут — нужна стальная или клипсы"),
    "Телевизор": ("Best Buy · Costco · Target", "Чёрная пятница — 27 ноября"),
}


def tab_of(r):
    if r["cat"] == "Мебель":
        return "furniture"
    if (r["cat"] in ("Техника", "Электроника") or r["type"] == "Камины"
            or r["item"] in ("Кольцевая лампа", "Лопасти для вентилятора") or "ceiling fan" in str(r["en"]).lower()):
        return "tech"
    if (r["cat"] == "Одежда" or r["type"] in ("Уборка", "Инструменты", "Расходники", "Стирка и глажка")
            or r["item"] == "Мусорные пакеты"):
        return "other"
    return "decor"


def group_of(r, tab):
    return r["type"] if tab in ("furniture", "tech") else r["cat"]


def who(notes):
    n = notes or ""
    if not n.startswith("Для "):
        return ""
    w = re.split(r"[.,;]", n)[0].strip()
    return w[0].lower() + w[1:]


def hyperlink(where):
    m = re.match(r'=HYPERLINK\("([^"]*)","([^"]*)"\)', str(where))
    return (m.group(1), m.group(2)) if m else (None, None)


def main(out):
    L = shop.lists()
    rows = shop.read_rows()
    target = {c["id"]: c for c in json.load(open(os.path.join(HERE, "target.json"), encoding="utf-8"))}
    items = []
    for r in rows:
        tab = tab_of(r)
        stores = []
        url, label = hyperlink(r["where"])
        if label and "IKEA" in label:
            text = re.sub(r"^(Пример: )?IKEA\s*", "", label)
            stores.append({"s": "IKEA", "t": text if r["ikea"] is True else "пример — " + text, "u": url})
        if r["id"] in target and r["ikea"] is not True:
            stores.append({"s": "Target", "t": target[r["id"]]["hint"]})
        if (r["type"] in RESTORE_TYPES or r["cat"] == "Мебель") and r["item"] not in RESTORE_SKIP_ITEMS \
                and not (r["type"] == "Ковры" and r["room"] == "Ванные"):
            stores.append({"s": "ReStore", "t": "поискать б/у"})
        if r["item"] in OTHER_RULES:
            s, hint = OTHER_RULES[r["item"]]
            if s:
                stores.append({"s": s, "t": hint})
            elif stores:
                stores[0]["t"] = (stores[0]["t"] + ". " + hint).strip(". ")
        notes = (r["notes"] or "").lower()
        items.append({
            "id": r["id"], "tab": tab, "group": group_of(r, tab), "name": r["item"], "en": r["en"],
            "room": r["room"], "place": r["place"], "qty": r["qty"] if r["qty"] != "" else None,
            "who": who(r["notes"]), "details": r["details"],
            "tag": "под вопросом" if "под вопросом" in notes else "",
            "stores": stores,
        })
    order = {k: i for i, k in enumerate(L["room"])}
    gorder = {k: i for i, k in enumerate(L["type"] + L["cat"])}
    items.sort(key=lambda o: (TABS.index(o["tab"]), gorder.get(o["group"], 999), o["group"],
                              order.get(o["room"], 99), o["name"]))
    page = open(os.path.join(HERE, "page.html"), encoding="utf-8").read()
    dump = json.dumps(items, ensure_ascii=False, separators=(",", ":"))
    assert page.count("__ITEMS__") == 1
    open(out, "w", encoding="utf-8").write(page.replace("__ITEMS__", dump))
    from collections import Counter
    print(dict(Counter(o["tab"] for o in items)), "→", out)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    main(sys.argv[1])
