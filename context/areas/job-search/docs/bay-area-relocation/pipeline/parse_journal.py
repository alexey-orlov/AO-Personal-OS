# -*- coding: utf-8 -*-
"""Extract structured agent results from a workflow journal into research.json."""
import json, sys, os, glob

BASE = "/root/.claude/projects/-home-user-AO-Personal-OS/d13b3c34-2805-51c9-80da-5179e1911a53/subagents/workflows"
RUNS = sys.argv[1:] or sorted(os.path.basename(p) for p in glob.glob(os.path.join(BASE, "wf_*")))

places, districts, other = [], [], []
seen_place, seen_district = set(), set()
stats = {"records": 0, "with_result": 0, "place_rows": 0, "district_rows": 0}

def absorb(obj):
    """Pull rows out of whatever shape the agent returned."""
    if not isinstance(obj, dict):
        return
    rows = obj.get("rows")
    if not isinstance(rows, list):
        return
    for r in rows:
        if not isinstance(r, dict):
            continue
        if "place" in r:
            # some agents echoed the whole descriptor, e.g.
            # "Newark (Alameda County, city, pop ~47529)" -- keep only the name
            r["place"] = r["place"].split(" (")[0].strip()
            key = r["place"].lower()
            if key not in seen_place:
                seen_place.add(key)
                places.append(r)
                stats["place_rows"] += 1
        elif "district" in r:
            key = r["district"].strip().lower()
            if key not in seen_district:
                seen_district.add(key)
                districts.append(r)
                stats["district_rows"] += 1

def try_json(s):
    if not isinstance(s, str):
        return None
    s = s.strip()
    if s.startswith("```"):
        s = s.split("\n", 1)[-1].rsplit("```", 1)[0]
    try:
        return json.loads(s)
    except Exception:
        return None

for run in RUNS:
    jpath = os.path.join(BASE, run, "journal.jsonl")
    if not os.path.exists(jpath):
        continue
    for line in open(jpath):
        try:
            rec = json.loads(line)
        except Exception:
            continue
        stats["records"] += 1
        res = rec.get("result")
        if res is None:
            continue
        stats["with_result"] += 1
        if isinstance(res, str):
            parsed = try_json(res)
            if parsed is not None:
                res = parsed
            else:
                other.append(res)
                continue
        absorb(res)
stats["runs"] = RUNS

out = {"places": places, "districts": districts, "narrative": other, "stats": stats}
path = "/tmp/claude-0/-home-user-AO-Personal-OS/d13b3c34-2805-51c9-80da-5179e1911a53/scratchpad/research.json"
with open(path, "w") as f:
    json.dump(out, f, indent=1)
print(json.dumps(stats, indent=1))
print(f"wrote {path}")
