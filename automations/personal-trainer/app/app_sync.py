#!/usr/bin/env python3
"""app_sync.py — the skill's side of the Trainer Notebook app (see README.md here).

  export <dir> [--today D]     write the config/* and briefs/* bodies the app reads
                               into <dir>, and print the ArtifactData batch writes
  sheet <file> [--dump D]      one finished workouts/<id> document -> the gym-log
                               `log` payload for the "My training" sheet
  feedback <file> [--apply]    one finished workouts/<id> document (as saved by an
                               ArtifactData read with out_dir) -> trainer.py feedback;
                               without --apply, only shows what would be recorded

Run from the repo root. Never computes a weight: briefs come from trainer.py.
"""
import argparse
import json
import os
import re
import subprocess
import sys
from datetime import datetime

HERE = os.path.dirname(os.path.abspath(__file__))
ENGINE_D = os.path.dirname(HERE)
REPO = os.path.abspath(os.path.join(ENGINE_D, "..", ".."))
TRAINER = os.path.join(ENGINE_D, "trainer.py")
SKILL_REF = os.path.join(REPO, ".claude", "skills", "personal-trainer", "references")
PLANS_D = os.environ.get("TRAINER_PLANS") or os.path.join(REPO, "outputs", "personal-trainer", "plans")
DAYS = ("legs", "push", "pull")
RATINGS = ("easy", "ok", "hard", "fail", "pain", "skipped")


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def dump(obj, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)


def brief(day, today, low):
    cmd = [sys.executable, TRAINER, "brief", "--day", day]
    if today:
        cmd += ["--today", today]
    if low:
        cmd += ["--readiness", "low"]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit(f"trainer.py brief --day {day} failed: {r.stderr.strip()}")
    return json.loads(r.stdout)


def cmd_export(a):
    now = datetime.now().isoformat(timespec="seconds")
    out = os.path.abspath(a.dir)
    hist = load(os.path.join(ENGINE_D, "data", "history.json"))
    sessions = hist.get("sessions", [])
    gym_cfg = open(os.path.join(REPO, "automations", "gym-log", "config.sh"), encoding="utf-8").read()
    sheet_id = re.search(r'GYM_SHEET_ID="([^"]+)"', gym_cfg)
    tab = re.search(r'GYM_TAB="([^"]+)"', gym_cfg)
    bodies = {
        # the app writes each finished session to "My training" itself (gym-log's layout, through the Sheets connector)
        ("config", "sheet"): {"spreadsheet_id": sheet_id.group(1) if sheet_id else None, "tab": tab.group(1) if tab else "Sheet1"},
        ("config", "catalog"): load(os.path.join(ENGINE_D, "catalog.json")),
        ("config", "gym"): load(os.path.join(ENGINE_D, "gym.json")),
        ("config", "skill"): {
            "methodology_md": open(os.path.join(SKILL_REF, "methodology.md"), encoding="utf-8").read(),
            "feedback_md": open(os.path.join(SKILL_REF, "feedback.md"), encoding="utf-8").read(),
            "pushed_at": now,
        },
    }
    for_date = None
    for d in DAYS:
        normal = brief(d, a.today, False)
        for_date = normal.get("today")
        bodies[("briefs", d)] = {"for_date": for_date, "computed_at": now, "normal": normal, "low": brief(d, a.today, True)}
    bodies[("config", "sync")] = {"pushed_at": now, "for_date": for_date, "history_synced_at": hist.get("synced_at"),
                                  "last_session": sessions[-1]["date"] if sessions else None}
    writes = []
    for (coll, doc), body in bodies.items():
        path = os.path.join(out, coll, f"{doc}.json")
        dump(body, path)
        writes.append({"op": "set", "collection": coll, "doc_id": doc, "file_path": path})
    print(json.dumps(writes, ensure_ascii=False, indent=1))


def cmd_feedback(a):
    doc = load(a.file)
    if "status" not in doc and isinstance(doc.get("data"), dict):
        doc = doc["data"]
    if doc.get("status") != "done":
        sys.exit(f"{doc.get('id')}: status is {doc.get('status')!r}, not done; nothing to record")
    date = doc.get("date") or str(doc.get("id", ""))[:10]
    fb = dict(doc.get("feedback") or {})
    items = {k: v for k, v in (fb.get("items") or {}).items() if (v or {}).get("rating") in RATINGS}
    fb["items"] = items
    fb["source"] = "app"
    if doc.get("body_weight_kg") is not None:
        fb["body_weight_kg"] = doc["body_weight_kg"]
    notes = []
    if doc.get("id") != date:
        notes.append(f"second session on {date} ({doc.get('id')}): its feedback merges into {date}.json")
    missing = {k: v for k, v in (doc.get("machine_missing") or {}).items() if (v or {}).get("kind") == "missing"}
    report = {"date": date, "day": doc.get("day"), "items": items, "actual": fb.get("actual", {}),
              "crossfit_time": fb.get("crossfit_time"), "overall": fb.get("overall"),
              "changes": [c.get("summary") for c in doc.get("changes") or []],
              "gym_missing": {k: v.get("replaced_by") for k, v in missing.items()},
              "notes": notes}
    if not a.apply:
        print(json.dumps({"dry_run": True, **report}, ensure_ascii=False, indent=1))
        return
    plan_path = os.path.join(PLANS_D, f"{date}.json")
    if not os.path.exists(plan_path) and doc.get("plan"):
        plan = dict(doc["plan"])
        plan.update({"date": date, "day": doc.get("day"), "source": "app", "built_by": doc.get("built_by")})
        dump(plan, plan_path)
    r = subprocess.run([sys.executable, TRAINER, "feedback", date], input=json.dumps(fb, ensure_ascii=False),
                       capture_output=True, text=True)
    if r.returncode:
        sys.exit(f"trainer.py feedback {date} failed: {r.stderr.strip() or r.stdout.strip()}")
    print(json.dumps({"recorded": True, **report, "engine": json.loads(r.stdout)}, ensure_ascii=False, indent=1))


def _num(x):
    return int(x) if float(x).is_integer() else round(float(x), 1)


def sheet_payload(doc, cat):
    """A finished app workout -> the gym-log `log` payload (one date block). Only logged data: done sets,
    warm-up sets ticked, crossfit only when a time or a rating was recorded."""
    idx = {e["id"]: e for e in cat["strength"] + cat["warmup"]["items"] + cat["crossfit"]["items"]}
    row = lambda i: (idx.get(i, {}).get("sheet_rows") or [i])[0]
    y, m, d = (int(x) for x in doc["date"][:10].split("-"))
    payload = {"date": f"{m}/{d}/{y}", "entries": []}
    notes = []
    if doc.get("body_weight_kg") is not None:
        payload["my_weight"] = _num(doc["body_weight_kg"])
    actual = (doc.get("feedback") or {}).get("actual") or {}
    order = [i["id"] for i in doc["plan"].get("strength", [])] + [i for i in actual if i not in {x["id"] for x in doc["plan"].get("strength", [])}]
    for i in order:
        a = actual.get(i)
        if not a or not a.get("kg"):
            continue
        ex = idx.get(i, {})
        role, days, mus = ex.get("role"), ex.get("day", []), ex.get("muscles", [])
        category = ("Shoulders" if role == "shoulder" or "any" in days else "Glutes" if "glutes" in mus and "quads" not in mus
                    else {"pull": "Back", "push": "Chest", "legs": "Legs"}.get((days or ["pull"])[0], "Back"))
        payload["entries"].append({"category": category, "exercise": row(i), "sets": a.get("sets") or len(a["kg"]),
                                   "reps": str(a.get("reps")), "w_start": _num(a["kg"][0]), "w_end": _num(a["kg"][-1])})
        if a.get("machine"):
            notes.append(f"{row(i)}: done on {a['machine']} (same row; split it if the scale differs)")
    wu_log = (doc.get("log") or {}).get("warmup") or {}
    combo = []
    for it in doc["plan"].get("warmup", []):
        n = (wu_log.get(it["id"]) or {}).get("sets_done") or 0
        if not n:
            continue
        dose = f'{it["secs"]}"' if it.get("secs") else str(it.get("reps", ""))
        e = {"category": "Warm-up", "exercise": row(it["id"]), "sets": n, "reps": dose}
        if it.get("kg"):
            e["w_start"] = e["w_end"] = _num(it["kg"])
        payload["entries"].append(e)
        load = f" ({_num(it['kg'])} кг)" if it.get("kg") else ""   # no nested same-quote f-strings: the Mac runs Python 3.9
        combo.append(f'{row(it["id"])}{load} {n}x{dose}')
    if combo:
        payload["warmup"] = {"combination": " → ".join(combo)}
    cf_log = (doc.get("log") or {}).get("crossfit") or {}
    fb = doc.get("feedback") or {}
    cf = doc["plan"].get("crossfit") or {}
    finish = cf_log.get("time") or fb.get("crossfit_time")
    if cf.get("format") != "skip" and cf.get("items") and (finish or fb.get("crossfit_rating")):
        rounds = cf_log.get("rounds_done", cf.get("rounds"))
        parts = []
        for it in cf["items"]:
            dose = f'{it["secs"]}"' if it.get("secs") else (f'{it["reps"]} cal' if it.get("unit") == "cal" else str(it.get("reps") or cf.get("scheme", "")))
            e = {"category": "Crossfit", "exercise": row(it["id"]), "reps": dose}
            if cf.get("format") == "rounds" and rounds:
                e["sets"] = rounds
            if it.get("kg") is not None:
                e["w_start"] = e["w_end"] = _num(it["kg"])
            payload["entries"].append(e)
            parts.append(f'{row(it["id"])} {dose}' + (f' ({_num(it["kg"])} кг)' if it.get("kg") is not None else ""))
        payload["crossfit"] = {"combination": " → ".join(parts),
                               "rounds": rounds if cf.get("format") == "rounds" else f'{rounds or 1} ({cf.get("scheme", "")})',
                               "cap": f'{cf["cap_min"]}\'' if cf.get("cap_min") else "-", "finish": finish or "не записано"}
    elif cf.get("items") and cf.get("format") != "skip":
        notes.append("crossfit not recorded in the app (no time, no rating): left out")
    return payload, notes


def cmd_sheet(a):
    doc = load(a.file)
    if "status" not in doc and isinstance(doc.get("data"), dict):
        doc = doc["data"]
    if doc.get("status") != "done":
        sys.exit(f"{doc.get('id')}: status is {doc.get('status')!r}, not done")
    payload, notes = sheet_payload(doc, load(os.path.join(ENGINE_D, "catalog.json")))
    if a.dump:
        have = {e["name"] for c in load(a.dump).get("categories", []) for e in c.get("exercises", [])}
        notes += [f"new sheet row: {e['exercise']} ({e['category']})" for e in payload["entries"] if e["exercise"] not in have]
    print(json.dumps(payload, ensure_ascii=False))
    for n in notes:
        print("note:", n, file=sys.stderr)


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    e = sub.add_parser("export")
    e.add_argument("dir")
    e.add_argument("--today")
    f = sub.add_parser("feedback")
    f.add_argument("file")
    f.add_argument("--apply", action="store_true")
    s = sub.add_parser("sheet", help="finished workout doc -> gym-log `log` payload on stdout, notes on stderr")
    s.add_argument("file")
    s.add_argument("--dump", help="gym_sheet.py dump output, to flag rows the sheet does not have yet")
    a = p.parse_args()
    {"export": cmd_export, "feedback": cmd_feedback, "sheet": cmd_sheet}[a.cmd](a)


if __name__ == "__main__":
    main()
