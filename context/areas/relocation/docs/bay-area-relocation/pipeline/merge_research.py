# -*- coding: utf-8 -*-
"""
Merge a research fan-out's output into research.json.

Field-level merge, not row-level: a new run may fill only the cells it was asked for, and must
not blank out a figure an earlier run established. For any given field the rule is
"a measured value beats a null, and the newer measured value wins" -- so re-running a batch
corrects it rather than duplicating it.

Usage:  python3 merge_research.py <workflow-run-dir> [<workflow-run-dir> ...]
        python3 merge_research.py --json <file-with-{"rows":[...]}>
"""
import glob
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
RESEARCH = os.path.join(HERE, "research.json")

# The collection schema names differ slightly from the storage schema kept since the first run.
FIELD_MAP = {
    "rent_2br_usd": "rent_2br_usd",
    "rent_3br_usd": "rent_3br_usd",
    "rent_source": ("rent_2br_source", "rent_3br_source"),
    "violent_crime_per_1k": "violent_crime_per_1k",
    "property_crime_per_1k": "property_crime_per_1k",
    "crime_source": "crime_source",
    "elementary_district": "elementary_district",
    "high_school_district": "high_school_district",
    "notes": "notes",
    "rent_url": "rent_url",
    "crime_url": "crime_url",
    "district_source": "district_source",
    # why a cell is still empty after a second pass -- "no rental market", "policed by the
    # county sheriff, no place-level rate published". A blank with a reason is a finding;
    # a blank without one is an unfinished lookup, and the table distinguishes them.
    "no_data_reason": "no_data_reason",
}


def rows_from_journal(run_dir):
    """Pull every {'rows':[...]} the agents returned, in journal order."""
    out = []
    jpath = os.path.join(run_dir, "journal.jsonl")
    if not os.path.exists(jpath):
        return out
    for line in open(jpath):
        try:
            rec = json.loads(line)
        except Exception:
            continue
        res = rec.get("result")
        if isinstance(res, str):
            s = res.strip()
            if s.startswith("```"):
                s = s.split("\n", 1)[-1].rsplit("```", 1)[0]
            try:
                res = json.loads(s)
            except Exception:
                continue
        if isinstance(res, dict) and isinstance(res.get("rows"), list):
            out.extend(r for r in res["rows"] if isinstance(r, dict) and r.get("place"))
    return out


def merge(new_rows, research_path=RESEARCH):
    R = json.load(open(research_path))
    by_name = {}
    for r in R["places"]:
        if r.get("place"):
            by_name[r["place"].strip().lower()] = r

    stats = {"new_places": 0, "updated_places": 0, "fields_filled": 0, "fields_overwritten": 0}
    for nr in new_rows:
        name = nr["place"].split(" (")[0].strip()
        key = name.lower()
        cur = by_name.get(key)
        if cur is None:
            cur = {"place": name}
            by_name[key] = cur
            R["places"].append(cur)
            stats["new_places"] += 1
        else:
            stats["updated_places"] += 1

        for src, dst in FIELD_MAP.items():
            val = nr.get(src)
            if val is None or val == "":
                continue
            targets = dst if isinstance(dst, tuple) else (dst,)
            for t in targets:
                if cur.get(t) in (None, ""):
                    stats["fields_filled"] += 1
                else:
                    stats["fields_overwritten"] += 1
                cur[t] = val
        cur["data_confidence"] = "search-verified"

    with open(research_path, "w") as f:
        json.dump(R, f, indent=1)
    return stats, len(R["places"])


if __name__ == "__main__":
    args = sys.argv[1:]
    rows = []
    if args and args[0] == "--json":
        for p in args[1:]:
            rows.extend(json.load(open(p)).get("rows", []))
    else:
        for d in args:
            got = rows_from_journal(d)
            print(f"  {os.path.basename(d)}: {len(got)} rows")
            rows.extend(got)
    if not rows:
        print("no rows found - nothing merged")
        sys.exit(1)
    stats, total = merge(rows)
    print(json.dumps(stats, indent=1))
    print(f"research.json now holds {total} places")
