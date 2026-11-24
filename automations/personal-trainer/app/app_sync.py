#!/usr/bin/env python3
"""app_sync.py — the skill's side of the Trainer Notebook app (see README.md here).

  export <dir> [--today D]     write the config/* and briefs/* bodies the app reads
                               into <dir>, and print the ArtifactData batch writes
  feedback <file> [--apply]    one finished workouts/<id> document (as saved by an
                               ArtifactData read with out_dir) -> trainer.py feedback;
                               without --apply, only shows what would be recorded

Run from the repo root. Never computes a weight: briefs come from trainer.py.
"""
import argparse
import json
import os
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
    bodies = {
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


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    e = sub.add_parser("export")
    e.add_argument("dir")
    e.add_argument("--today")
    f = sub.add_parser("feedback")
    f.add_argument("file")
    f.add_argument("--apply", action="store_true")
    a = p.parse_args()
    {"export": cmd_export, "feedback": cmd_feedback}[a.cmd](a)


if __name__ == "__main__":
    main()
