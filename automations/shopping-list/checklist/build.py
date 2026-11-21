"""Build the store checklist page (Target + ReStore tabs) from the shopping-list sheet.

usage: python3 build.py OUT.html

- Target tab: the rows curated in target.json (id → store department, hint, tag), in that
  order; name, US name, room, place, quantity and "для кого" come from the sheet, so a
  renamed or re-quantified row shows up correctly. Add or drop Target rows by editing
  target.json (only rows NOT ticked «Брать в IKEA» belong there).
- ReStore tab: computed by rule — furniture, lamps and ceiling lights, mirrors, wall art,
  the electric fireplace, rugs (not bath mats), the curtain rod and the step stool; each
  shows the IKEA model and price from «Где купить» as the new-price benchmark.
Then publish OUT.html to the existing artifact (Artifact tool, `url` =
https://claude.ai/artifact/KVAmZoKZHmESb4HZvLyH1P) — the marks live in its db and survive.
"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, ".."))
import shop  # noqa: E402  (the shopping-list helper; reads the sheet)

RESTORE_DEPT = {
    "Диваны и кресла": "Диваны и кресла", "Столы": "Столы и стулья", "Стулья и табуреты": "Столы и стулья",
    "Детская мебель": "Столы и стулья", "Тумбы": "Хранение", "Стеллажи и полки": "Хранение",
    "Перегородки": "Хранение", "Шкафы и комоды": "Хранение", "Уличная мебель": "Балкон",
    "Лампы и торшеры": "Свет", "Потолочный свет": "Свет", "Зеркала": "Декор и ковры",
    "Картины и рамки": "Декор и ковры", "Камины": "Декор и ковры", "Ковры": "Декор и ковры",
    "Шторы и жалюзи": "Декор и ковры", "Инструменты": "Разное"}
RESTORE_ORDER = ["Диваны и кресла", "Столы и стулья", "Хранение", "Свет", "Декор и ковры", "Балкон", "Разное"]
RESTORE_SKIP_ITEMS = {"Кольцевая лампа", "Лопасти для вентилятора", "Шторы", "Рулонная штора",
                      "Увеличительное зеркало", "Украшение на дверь"}
RESTORE_DEPT_BY_ITEM = {"Стеллаж для игрушек и книжек": "Хранение"}


def who(notes):
    n = notes or ""
    if not n.startswith("Для "):
        return ""
    w = re.split(r"[.,;]", n)[0].strip()
    return w[0].lower() + w[1:]


def base(r):
    return {"id": r["id"], "name": r["item"], "en": r["en"], "room": r["room"], "place": r["place"],
            "qty": r["qty"] if r["qty"] != "" else None, "who": who(r["notes"])}


def ikea_benchmark(where):
    m = re.match(r'=HYPERLINK\("([^"]*)","([^"]*)"\)', str(where))
    if not m:
        return ""
    lab = m.group(2).replace("Пример: ", "")
    return "Новое: " + lab if lab.startswith("IKEA") and "$" in lab else ""


def main(out):
    rows = {r["id"]: r for r in shop.read_rows()}
    gone = ("Куплено", "Отказались")
    target = []
    for c in json.load(open(os.path.join(HERE, "target.json"), encoding="utf-8")):
        r = rows.get(c["id"])
        if not r or r["status"] in gone:
            continue
        target.append({**base(r), "dept": c["dept"], "hint": c["hint"], "tag": c["tag"]})
    restore = []
    for r in rows.values():
        if r["status"] in gone or r["item"] in RESTORE_SKIP_ITEMS:
            continue
        if r["type"] == "Ковры" and r["room"] == "Ванные":
            continue
        d = RESTORE_DEPT_BY_ITEM.get(r["item"]) or RESTORE_DEPT.get(r["type"])
        if not d:
            continue
        tag = "под вопросом" if "под вопросом" in (r["notes"] or "").lower() else ""
        restore.append({**base(r), "dept": d, "hint": ikea_benchmark(r["where"]), "tag": tag})
    restore.sort(key=lambda o: (RESTORE_ORDER.index(o["dept"]), o["room"], o["name"]))
    page = open(os.path.join(HERE, "page.html"), encoding="utf-8").read()
    dump = lambda x: json.dumps(x, ensure_ascii=False, separators=(",", ":"))  # noqa: E731
    page = page.replace("__ITEMS__", dump(target)).replace("__RESTORE__", dump(restore))
    open(out, "w", encoding="utf-8").write(page)
    print(f"target {len(target)} rows, restore {len(restore)} rows → {out}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    main(sys.argv[1])
