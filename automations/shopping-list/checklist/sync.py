"""Two-way sync of the checklist page's lasting marks with the sheet's «Статус» column.

usage: python3 sync.py DB_DIR [--apply]

DB_DIR holds the page's db as ArtifactData exports it with `out_dir` (list each
collection with `query.limit` 1000): DB_DIR/bought/r<№>.json, DB_DIR/unneeded/r<№>.json,
and DB_DIR/meta/sync.json — the state both sides agreed on at the last sync (absent the
first time).

Lasting states only: «Куплено» on the page ↔ status «Куплено»; «Не нужно» ↔ «Отказались».
«Беру» / «Не здесь» are trip marks and stay on the page.

Three-way rule per row (prev = last agreed state):
  page == sheet               → nothing to do
  page changed, sheet didn't  → the sheet follows the page
  sheet changed, page didn't  → the page follows the sheet (a db write)
  both changed, differently   → the page wins (the latest tap in a store); reported
A row leaving «Куплено»/«Отказались» goes back to status «Идея».

Without --apply it only prints the plan. With --apply it writes the sheet and prints:
  - DB_WRITES: the db writes left to do, as ArtifactData batch entries (deletes need the
    document's `if_version`, which ArtifactData's list shows next to each file);
  - META: the new meta/sync document to write (collection `meta`, doc `sync`).
Then rebuild and republish the page (build.py) — the sheet changed.
"""
import datetime, glob, json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, ".."))
import shop  # noqa: E402

STATUS = {"bought": "Куплено", "unneeded": "Отказались"}
FROM_STATUS = {v: k for k, v in STATUS.items()}


def load_coll(db_dir, coll):
    out = {}
    for f in glob.glob(os.path.join(db_dir, coll, "r*.json")):
        doc = os.path.basename(f)[:-5]
        try:
            body = json.load(open(f, encoding="utf-8"))
        except Exception:
            body = {}
        out[doc[1:]] = body
    return out


def main(db_dir, apply):
    bought = load_coll(db_dir, "bought")
    unneeded = load_coll(db_dir, "unneeded")
    meta_f = os.path.join(db_dir, "meta", "sync.json")
    prev_doc = json.load(open(meta_f, encoding="utf-8")) if os.path.exists(meta_f) else {}
    prev = {str(i): "bought" for i in prev_doc.get("bought", [])}
    prev.update({str(i): "unneeded" for i in prev_doc.get("unneeded", [])})

    rows = shop.read_rows()
    ids = {str(r["id"]) for r in rows}
    sheet_updates, db_writes, conflicts, final_state = [], [], [], {}
    for r in rows:
        i = str(r["id"])
        if i in bought and i in unneeded:   # both on the page: the later tap wins
            page = "bought" if bought[i].get("at", "") >= unneeded[i].get("at", "") else "unneeded"
        else:
            page = "bought" if i in bought else "unneeded" if i in unneeded else None
        sheet = FROM_STATUS.get(r["status"])
        was = prev.get(i)
        if page == sheet:
            final = page
        elif page != was and sheet == was:
            final = page
        elif sheet != was and page == was:
            final = sheet
        else:
            final = page
            conflicts.append(f"№{i} {r['item']}: страница {page}, таблица {sheet}, было {was} → страница")
        if final:
            final_state[i] = final
        if final != sheet:
            sheet_updates.append({"id": r["id"], "status": STATUS[final] if final else "Идея"})
        for coll, src in (("bought", bought), ("unneeded", unneeded)):
            want = final == coll
            if want and i not in src:
                db_writes.append({"op": "set", "collection": coll, "doc_id": "r" + i,
                                  "data": {"item": r["item"], "at": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"), "by": "sheet"}})
            if not want and i in src:
                db_writes.append({"op": "delete", "collection": coll, "doc_id": "r" + i})
    stray = sorted((set(bought) | set(unneeded)) - ids)
    meta = {"bought": sorted(int(k) for k, v in final_state.items() if v == "bought"),
            "unneeded": sorted(int(k) for k, v in final_state.items() if v == "unneeded"),
            "at": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")}

    print(f"sheet updates: {len(sheet_updates)}; db writes: {len(db_writes)}; conflicts: {len(conflicts)}; "
          f"marks for rows not in the sheet: {stray or 'none'}")
    for u in sheet_updates:
        print("  sheet", u)
    for c in conflicts:
        print("  conflict", c)
    if apply and sheet_updates:
        import subprocess
        subprocess.run([sys.executable, os.path.join(HERE, "..", "shop.py"), "update"],
                       input=json.dumps(sheet_updates, ensure_ascii=False), text=True,
                       check=True, stdout=subprocess.DEVNULL)
        print("sheet written")
    print("DB_WRITES " + json.dumps(db_writes, ensure_ascii=False))
    print("META " + json.dumps(meta, ensure_ascii=False))


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if a != "--apply"]
    if len(args) != 1:
        raise SystemExit(__doc__)
    main(args[0], "--apply" in sys.argv)
