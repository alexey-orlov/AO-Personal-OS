# -*- coding: utf-8 -*-
"""
Pull the district assignment-system / TK-capacity findings out of a workflow run into
district-policy.json, which single_table.py reads for criterion 5.

Usage: python3 extract_policy.py <workflow-run-dir> [<workflow-run-dir> ...]
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "district-policy.json")


def rows_from_journal(run_dir):
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
        if isinstance(res, dict) and isinstance(res.get("districts"), list):
            out.extend(d for d in res["districts"] if isinstance(d, dict) and d.get("district"))
    return out


def main(dirs):
    existing = {}
    if os.path.exists(OUT):
        for d in json.load(open(OUT)).get("districts", []):
            existing[d["district"].strip().lower()] = d

    added = updated = 0
    for run in dirs:
        got = rows_from_journal(run)
        print(f"  {os.path.basename(run)}: {len(got)} districts")
        for d in got:
            name = re.sub(r"\s*\([^)]*\)\s*$", "", d["district"].strip()).strip()
            d = dict(d, district=name)
            key = name.lower()
            if key in existing:
                # keep whichever pass actually established a fact
                cur = existing[key]
                for f in ("assignment_system", "tk_capacity_note", "enrollment_note", "source"):
                    if d.get(f) and not cur.get(f):
                        cur[f] = d[f]
                updated += 1
            else:
                existing[key] = d
                added += 1

    districts = sorted(existing.values(), key=lambda d: d["district"])
    with open(OUT, "w") as f:
        json.dump({"districts": districts}, f, indent=1)

    n_a = sum(1 for d in districts if d.get("assignment_system"))
    n_t = sum(1 for d in districts if d.get("tk_capacity_note"))
    n_lottery = sum(1 for d in districts
                    if re.search(r"lotter|choice", (d.get("assignment_system") or ""), re.I))
    print(f"\n{len(districts)} districts in {OUT} (+{added} new, {updated} merged)")
    print(f"  assignment system established : {n_a}")
    print(f"    of which choice/lottery     : {n_lottery}")
    print(f"  TK capacity established       : {n_t}")
    return districts


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    ds = main(sys.argv[1:])
    print("\nchoice/lottery districts (the -18 penalty cases):")
    for d in ds:
        if re.search(r"lotter|choice", (d.get("assignment_system") or ""), re.I):
            print(f"  {d['district'][:44]:44s} {d['assignment_system'][:72]}")
