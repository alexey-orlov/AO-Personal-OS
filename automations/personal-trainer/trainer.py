#!/usr/bin/env python3
"""trainer.py — the deterministic half of the personal-trainer skill.

The skill (.claude/skills/personal-trainer/) makes the judgment calls; this
file does what must not drift between runs: the history, the pause, the day
rotation, every weight under the trainer's slow progression, the gym's
machines and substitutes, kg <-> lb, the warm-up trio and crossfit dose it
proposes, the phone table, and a lint of the finished plan.

Data (committed, so every device and the cloud see the same state):
  catalog.json        exercises, warm-up rungs, crossfit movements, never-list
  gym.json            current gym: units, steps, machines, substitutes, kit
  data/history.json   normalized snapshot of the "My training" sheet
  outputs/personal-trainer/plans/<date>.json   issued plans + Alex's feedback

Commands (brief prints compact JSON, the rest indented JSON or text):
  brief [--today D] [--day legs|push|pull] [--pain a,b] [--readiness low]
        [--time MIN] [--missing id,id]
  render PLAN [--fmt md|text] [--save]
  check PLAN                       exit 1 on errors
  feedback DATE < fb.json          record feedback; prints what moves next
  gym [--have id..] [--missing id..] [--use id=alt..] [--equip key=status..]
  sync                             full refresh with the Sheets token
  import-grid FILE.. [--replace]   Sheets-connector responses, stitched by range
  ingest < payload.json            one session in gym-log's `log` payload shape
  lb KG [--load stack|kb|ball|plate|db_each|db_single|bar]
  backtest [--from D] [--to D] [--verbose]

Exit codes: 0 ok, 1 check found errors, 2 bad input, 3 Sheets credential problem.
"""
import argparse
import glob
import json
import math
import os
import re
import sys
from collections import Counter
from datetime import date, datetime, timedelta

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
CATALOG_F = os.path.join(HERE, "catalog.json")
# Tests point these at fixtures so a scenario never touches the real state.
GYM_F = os.environ.get("TRAINER_GYM") or os.path.join(HERE, "gym.json")
HISTORY_F = os.environ.get("TRAINER_HISTORY") or os.path.join(HERE, "data", "history.json")
PLANS_D = os.environ.get("TRAINER_PLANS") or os.path.join(REPO, "outputs", "personal-trainer", "plans")
KG_LB = 2.20462
DAYS = ("legs", "push", "pull")
ROLE_RANK = {"main": 0, "secondary": 1, "isolation": 2, "shoulder": 3}
RATINGS = ("easy", "ok", "hard", "fail", "pain", "skipped")
JOINTS = {"lower_back": "поясница", "knee": "колено", "shoulder": "плечо", "elbow": "локоть",
          "wrist": "запястье", "neck": "шея", "hip": "бедро", "calf": "икра"}
JOINTS_ACC = {"lower_back": "поясницу", "knee": "колено", "shoulder": "плечо", "elbow": "локоть",
              "wrist": "запястье", "neck": "шею", "hip": "бедро", "calf": "икру"}
CORE = {"A", "B", "C"}
WARMUP_ROTATE = {"legs": "D", "push": "F", "pull": "C"}   # the slot the trainer rotated in per day
TRANSFER = {"cable": 0.9, "smith": 0.9, "free": 1.0, "plates": 0.85, "machine": 0.75}
CROSS_META = {"combination (crossfit)": "summary", "rounds": "rounds",
              "time cap / plan": "cap", "finish time": "finish"}
SUP = "¹²³⁴⁵⁶⁷⁸⁹"


# ---------------------------------------------------------------- utilities
def die(msg, code=2):
    sys.stderr.write(f"[trainer] {msg}\n")
    sys.exit(code)


def out(obj, compact=False):
    if compact:
        print(json.dumps(obj, ensure_ascii=False, separators=(",", ":")))
    else:
        print(json.dumps(obj, ensure_ascii=False, indent=1))


def norm(s):
    return re.sub(r"\s+", " ", str(s or "").strip().casefold()).rstrip(".")


def parse_date(s):
    if isinstance(s, date):
        return s
    s = str(s or "").strip()
    for fmt in ("%Y-%m-%d", "%m/%d/%Y", "%d.%m.%Y", "%d.%m.%y"):
        try:
            return datetime.strptime(s, fmt).date()
        except ValueError:
            pass
    return None


def cell_str(v):
    if v is None:
        return ""
    if isinstance(v, float) and v.is_integer():
        return str(int(v))
    return str(v).strip().lstrip("'")


def num(v):
    s = cell_str(v).replace(",", ".")
    if not s:
        return None
    try:
        return float(s)
    except ValueError:
        return None


def clean_num(x):
    if x is None:
        return None
    x = round(float(x), 1)
    return int(x) if x.is_integer() else x


def ddmm(d):
    return parse_date(d).strftime("%d.%m")


def nice(n):
    """A dose a coach would write: 35 not 34, 7 not 7.3."""
    if n is None:
        return None
    return int(5 * round(n / 5)) if n >= 15 else max(1, int(round(n)))


def load_json(path, default=None):
    if not os.path.exists(path):
        if default is not None:
            return default
        die(f"missing {os.path.relpath(path, REPO)}")
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def save_json(path, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
        f.write("\n")


def parse_reps(reps):
    """'10' single · '8-10' range · '10-9-8' per set · '40"' seconds · other text."""
    s = cell_str(reps).replace("–", "-").replace(" ", "").strip("()")
    if not s:
        return {"kind": "none"}
    if s.endswith(('"', "″")):
        n = num(s[:-1])
        return {"kind": "secs", "vals": [n]} if n is not None else {"kind": "text", "text": s}
    if re.fullmatch(r"\d+", s):
        return {"kind": "single", "vals": [int(s)]}
    m = re.fullmatch(r"(\d+)-(\d+)", s)
    if m:
        a, b = int(m.group(1)), int(m.group(2))
        return {"kind": "range" if a < b else "per_set", "vals": [a, b]}
    if re.fullmatch(r"\d+(-\d+){2,}", s):
        return {"kind": "per_set", "vals": [int(x) for x in s.split("-")]}
    return {"kind": "text", "text": s}


def fmt_w(vals):
    vals = [clean_num(v) for v in vals]
    if vals and len(set(vals)) == 1:
        return str(vals[0])
    return "/".join(str(v) for v in vals)


def lb_round(kg, step=5):
    return int(step * round(kg * KG_LB / step)) if kg is not None else None


# ---------------------------------------------------------------- catalog / gym
class Catalog:
    def __init__(self, data):
        self.data = data
        self.days = data["day_types"]
        self.cat_day = data.get("sheet_category_day", {})
        self.strength = {e["id"]: e for e in data["strength"]}
        self.warm = {e["id"]: e for e in data["warmup"]["items"]}
        self.cross = {e["id"]: e for e in data["crossfit"]["items"]}
        self.s_row, self.w_row, self.c_row = {}, {}, {}
        for idx, coll in ((self.s_row, self.strength), (self.w_row, self.warm), (self.c_row, self.cross)):
            for e in coll.values():
                for r in e.get("sheet_rows", []):
                    idx[norm(r)] = e["id"]

    def day_pool(self, day):
        return [e for e in self.strength.values()
                if (day in e["day"] or "any" in e["day"]) and e.get("status") != "alt"]

    @staticmethod
    def name(e):
        return e.get("en_short") or re.split(r"\s*[(,]", e.get("en", ""))[0].strip()


class Units:
    """Weights in the current gym's own units: kg (Kyiv) or lb (US)."""

    def __init__(self, cfg):
        self.cfg = cfg
        self.lb = cfg.get("units") == "lb"
        self.round_lb = cfg.get("round_lb", 5)
        self.grid = cfg.get("grid_lb", {})

    def name(self):
        return "lb" if self.lb else "kg"

    def _g(self, ex):
        return self.grid.get((ex or {}).get("step_class", ""), self.round_lb)

    def from_kg(self, kg, ex=None):
        if kg is None:
            return None
        if self.lb:
            g = self._g(ex)
            return int(g * math.floor(kg * KG_LB / g + 0.5))
        return round(kg * 2) / 2

    def floor_from_kg(self, kg, ex=None):
        if self.lb:
            g = self._g(ex)
            return int(g * math.floor(kg * KG_LB / g + 1e-9))
        return math.floor(kg * 2 + 1e-9) / 2

    def to_kg(self, u):
        return round(u / KG_LB, 1) if self.lb else round(u * 2) / 2

    def step(self, ex):
        if self.lb:
            return self.cfg.get("steps_lb", {}).get(ex.get("step_class", "stack"), 10)
        return ex.get("kyiv_step_kg", 2.5)

    def pair(self, vals):
        vals = [clean_num(v) for v in vals]
        if self.lb:
            return {"kg": [clean_num(self.to_kg(v)) for v in vals], "lb": vals}
        return {"kg": vals, "lb": [lb_round(v) for v in vals]}


def implement(kg, load, gym, cap_kg=None):
    """What to pick up: (kg text, lb text). In a lb gym the kg is what the US
    implement really weighs, so the two never disagree."""
    if kg is None:
        return "", ""
    lbgym = gym.get("units") == "lb"
    step = gym.get("db_lb_step", 5)

    def pick(choices, target):
        ok = [c for c in choices if cap_kg is None or c / KG_LB <= cap_kg * 1.1]
        return min(ok or choices, key=lambda c: abs(c - target))

    if load in ("db_each", "db_single", "db_pair_total"):
        per = kg / 2 if load == "db_pair_total" else kg
        cap = (cap_kg / 2 if load == "db_pair_total" else cap_kg) if cap_kg else None
        lb = int(step * round(per * KG_LB / step))
        while cap and lb > step and lb / KG_LB > cap * 1.1:
            lb -= step
        per_kg = clean_num(round(lb / KG_LB)) if lbgym else clean_num(per)
        if load == "db_single":
            return f"{per_kg} кг", f"{lb}-lb DB"
        return f"2×{per_kg} кг", f"2×{lb}-lb DB"
    if load in ("kb", "ball", "plate"):
        key = {"kb": "kb_lb", "ball": "ball_lb", "plate": "plate_lb"}[load]
        lb = pick(gym.get(key) or [lb_round(kg)], kg * KG_LB)
        word = {"kb": "KB", "ball": "ball", "plate": "plate"}[load]
        return f"{clean_num(round(lb / KG_LB)) if lbgym else clean_num(kg)} кг", f"{lb}-lb {word}"
    if load == "bar":
        lb = 5 * round(kg * KG_LB / 5)
        txt = f"{lb}-lb bar" if lb == gym.get("bar_lb", 45) else f"{lb} lb с грифом"
        return f"{clean_num(round(lb / KG_LB)) if lbgym else clean_num(kg)} кг", txt
    return f"{clean_num(kg)} кг", f"{lb_round(kg)} lb"


# ---------------------------------------------------------------- history
def section_of(category):
    c = norm(category)
    if c in ("warm-up", "warmup", "разминка"):
        return "warmup"
    if c in ("crossfit", "кроссфит"):
        return "crossfit"
    return "strength"


def empty_session(d):
    return {"date": d.isoformat(), "body_weight": None, "strength": [], "warmup": [],
            "crossfit": {"items": []}}


def grid_to_sessions(grid):
    def cell(r, c):
        row = grid[r] if r < len(grid) else []
        return row[c] if c < len(row) else ""

    row0 = grid[0] if grid else []
    blocks = [(c, parse_date(row0[c])) for c in range(2, len(row0)) if parse_date(row0[c])]
    sessions = {d: empty_session(d) for _, d in blocks}
    for c, d in blocks:
        sessions[d]["body_weight"] = clean_num(num(cell(2, c)))
    category = None
    for r in range(3, len(grid)):
        if cell_str(cell(r, 0)):
            category = cell_str(cell(r, 0))
        name = cell_str(cell(r, 1))
        if not name or category is None:
            continue
        sec = section_of(category)
        for c, d in blocks:
            vals = [cell(r, c + i) for i in range(4)]
            if not any(cell_str(v) for v in vals):
                continue
            s = sessions[d]
            if sec == "crossfit" and norm(name) in CROSS_META:
                s["crossfit"][CROSS_META[norm(name)]] = cell_str(vals[0])
                continue
            if sec == "warmup" and norm(name).startswith("combination"):
                s["warmup_summary"] = cell_str(vals[0])
                continue
            sets = num(vals[0])
            item = {"name": name, "sets": int(sets) if sets is not None and sets.is_integer() else sets,
                    "reps": cell_str(vals[1]),
                    "w_start": clean_num(num(vals[2])) if num(vals[2]) is not None else (cell_str(vals[2]) or None),
                    "w_end": clean_num(num(vals[3])) if num(vals[3]) is not None else (cell_str(vals[3]) or None)}
            if sec == "strength":
                item["category"] = category
                s["strength"].append(item)
            elif sec == "warmup":
                s["warmup"].append(item)
            else:
                s["crossfit"]["items"].append(item)
    return [sessions[d] for d in sorted(sessions)]


def stitch(files):
    """Several connector responses -> one grid, placed by each range's start cell."""
    def col_index(letters):
        n = 0
        for ch in letters:
            n = n * 26 + (ord(ch.upper()) - 64)
        return n - 1

    grid = []
    for f in files:
        data = load_json(f)
        values = data.get("values", []) if isinstance(data, dict) else data
        rng = data.get("range", "A1") if isinstance(data, dict) else "A1"
        m = re.search(r"\$?([A-Z]+)\$?(\d+)", rng.split("!")[-1])
        c0, r0 = (col_index(m.group(1)), int(m.group(2)) - 1) if m else (0, 0)
        for i, row in enumerate(values):
            r = r0 + i
            while len(grid) <= r:
                grid.append([])
            for j, v in enumerate(row):
                c = c0 + j
                while len(grid[r]) <= c:
                    grid[r].append("")
                if cell_str(v) != "" or grid[r][c] == "":
                    grid[r][c] = v
    return grid


def upsert(history, new_sessions, source, replace=False):
    by_date = {} if replace else {s["date"]: s for s in history.get("sessions", [])}
    for s in new_sessions:
        by_date[s["date"]] = s
    history["sessions"] = [by_date[k] for k in sorted(by_date)]
    history["source"] = source
    history["synced_at"] = datetime.now().isoformat(timespec="seconds")
    return history


# ---------------------------------------------------------------- state
class Occ:
    __slots__ = ("date", "sets", "reps", "ws", "we", "name")

    def __init__(self, d, it):
        self.date = d
        self.sets = it.get("sets") or 3
        self.reps = it.get("reps", "")
        we, ws = num(it.get("w_end")), num(it.get("w_start"))
        self.we = we if we is not None else ws
        self.ws = ws if ws is not None else self.we
        self.name = it.get("name")

    def brief(self):
        return {"date": ddmm(self.date), "sets": self.sets, "reps": self.reps,
                "kg": [clean_num(self.ws), clean_num(self.we)]}


class State:
    def __init__(self, today, day=None, pain=(), readiness="normal", time_min=None,
                 gym_key=None, use_plans=True, missing=(), cleared=()):
        self.cat = Catalog(load_json(CATALOG_F))
        self.cleared = {c.strip() for c in cleared if c and c.strip()}
        gyms = load_json(GYM_F)
        self.gym_key = gym_key or gyms["current"]
        self.gym = gyms["gyms"][self.gym_key]
        self.units = Units(self.gym)
        self.gym_since = parse_date(self.gym.get("since")) if self.gym.get("since") else None
        self.machines = dict(self.gym.get("machines") or {})
        self.missing_today = [m.strip() for m in missing if m and m.strip()]
        for m in self.missing_today:
            self.machines[m] = "missing"
        self.subs = dict(self.gym.get("substitutions") or {})
        self.equipment = dict(self.gym.get("equipment") or {})
        self.today = today
        hist = load_json(HISTORY_F, {"sessions": []})
        self.sessions = [s for s in hist.get("sessions", []) if parse_date(s["date"]) < today]
        self.history_synced = hist.get("synced_at")
        self.plans = self._load_plans() if use_plans else {}
        self._merge_plans()
        self.pain = {p.strip() for p in pain if p and p.strip()}
        self.readiness = readiness
        self.time_min = time_min
        self.day = day
        self.recent_pain = self._recent_pain()

    def _load_plans(self):
        plans = {}
        for f in glob.glob(os.path.join(PLANS_D, "*.json")):
            try:
                p = load_json(f)
            except (json.JSONDecodeError, OSError):
                continue
            d = parse_date(p.get("date") or os.path.basename(f)[:10])
            if d and d < self.today:
                plans[d] = p
        return plans

    def _merge_plans(self):
        """The sheet may never see a US session (no notebook photo). A plan with
        feedback counts as done: its strength stands in until gym-log logs the
        real numbers ('actual' in the feedback beats the prescription), and its
        warm-up / crossfit fill in what the sheet lacks."""
        by_date = {s["date"]: s for s in self.sessions}
        for d, p in self.plans.items():
            fb = p.get("feedback") or {}
            done = bool(fb) and fb.get("done", True)
            s = by_date.get(d.isoformat())
            if s is None and not done:
                continue
            if s is None:
                s = empty_session(d)
                s["from_plan"] = True
                actual = fb.get("actual") or {}
                for it in p.get("strength", []):
                    ex = self.cat.strength.get(it["id"])
                    a = actual.get(it["id"]) or {}
                    kg = a.get("kg") or ([round(x / KG_LB, 1) for x in a["lb"]] if a.get("lb") else it.get("kg"))
                    if not ex or (fb.get("items", {}).get(it["id"], {}).get("rating") == "skipped"):
                        continue
                    s["strength"].append({"name": ex["sheet_rows"][0], "category": None,
                                          "sets": a.get("sets", it.get("sets", 3)),
                                          "reps": str(a.get("reps", it.get("reps", ""))),
                                          "w_start": kg[0] if kg else None, "w_end": kg[-1] if kg else None})
                self.sessions.append(s)
                by_date[s["date"]] = s
            if not s.get("warmup") and p.get("warmup"):
                s["warmup"] = [{"id": w["id"], "sets": w.get("sets"), "reps": str(w.get("reps") or f'{w.get("secs", "")}"'),
                                "w_end": w.get("kg")} for w in p["warmup"]]
            if not (s.get("crossfit") or {}).get("items") and (p.get("crossfit") or {}).get("items"):
                cf = p["crossfit"]
                s["crossfit"] = {"rounds": str(cf.get("rounds", cf.get("scheme", ""))), "cap": cf.get("cap_min"),
                                 "finish": fb.get("crossfit_time"),
                                 "items": [{"id": i["id"], "reps": str(i.get("reps", i.get("secs", ""))),
                                            "w_end": i.get("kg")} for i in cf["items"]]}
        self.sessions.sort(key=lambda s: s["date"])

    def _recent_pain(self):
        """Joints Alex reported pain in during the last 14 days -> date (dd.mm)."""
        res = {}
        for d, p in sorted(self.plans.items()):
            for j in ((p.get("pre") or {}).get("cleared") or []):   # «колено нормально» said that day
                res.pop(j, None)
            if (self.today - d).days > 14:
                continue
            for ex_id, it in (((p.get("feedback") or {}).get("items")) or {}).items():
                if (it or {}).get("rating") != "pain":
                    continue
                src = self.cat.strength.get(ex_id) or {}
                joints = [it["joint"]] if it.get("joint") else src.get("joints") or \
                    (self.cat.cross.get(ex_id) or {}).get("avoid_if", [])
                for j in joints:
                    res[j] = ddmm(d)
        for j in self.cleared:
            res.pop(j, None)
        return res

    def fb(self, d, ex_id):
        p = self.plans.get(d)
        items = ((p or {}).get("feedback") or {}).get("items") or {}
        r = (items.get(ex_id) or {}).get("rating")
        return r if r in RATINGS else None

    def session_day(self, s):
        votes = Counter()
        for it in s["strength"]:
            d = self.cat.cat_day.get(it.get("category") or "")
            if d:
                votes[d] += 1
            else:
                ex = self.cat.strength.get(self.cat.s_row.get(norm(it["name"]), ""))
                if ex and len(ex["day"]) == 1 and ex["day"][0] in DAYS:
                    votes[ex["day"][0]] += 0.5
        if not votes:
            p = self.plans.get(parse_date(s["date"]))
            return (p or {}).get("day")
        return votes.most_common(1)[0][0]

    def group_gap(self, ex):
        """Days since a session of this exercise's day type ('any' = any session)."""
        days = [d for d in ex["day"] if d in DAYS]
        for s in reversed(self.sessions):
            if not days or self.session_day(s) in days:
                return (self.today - parse_date(s["date"])).days
        return 999

    def occurrences(self, ex_id):
        occ = []
        for s in self.sessions:
            d = parse_date(s["date"])
            for it in s["strength"]:
                if self.cat.s_row.get(norm(it["name"])) == ex_id:
                    o = Occ(d, it)
                    if o.we is not None:
                        occ.append(o)
        return occ

    def pause(self):
        if not self.sessions:
            return {"last_session": None, "days_since": None, "ask": True}
        last = parse_date(self.sessions[-1]["date"])
        by_day = {}
        for d in DAYS:
            for s in reversed(self.sessions):
                if self.session_day(s) == d:
                    by_day[d] = (self.today - parse_date(s["date"])).days
                    break
        gap = (self.today - last).days
        return {"last_session": last.isoformat(), "last_day": self.session_day(self.sessions[-1]),
                "days_since": gap, "days_since_by_day": by_day, "ask": gap >= 10}

    def rotation(self):
        last = {d: None for d in DAYS}
        for s in self.sessions:
            t = self.session_day(s)
            if t in last:
                last[t] = s["date"]
        order = sorted(DAYS, key=lambda d: (last[d] or "0000", DAYS.index(d)))
        res = {"last_by_day": last, "order": order, "next": order[0]}
        if self.pain:
            blocked = []
            for d in order:
                _, ids = template_for(self, d)
                if any(set(self.cat.strength[i].get("joints", [])) & self.pain
                       for i in ids if self.cat.strength[i]["role"] == "main"):
                    blocked.append(d)
            ok = [d for d in order if d not in blocked]
            if order[0] in blocked and ok:
                res["next"] = ok[0]
                res["moved_for_pain"] = (f"{self.cat.days[order[0]]['ru']} → {self.cat.days[ok[0]]['ru']}: главное "
                                         f"упражнение дня нагружает {', '.join(JOINTS_ACC.get(j, j) for j in sorted(self.pain))}")
        return res


def deload_factor(gap_days):
    """Working-weight cut after time away from a muscle group. Up to 5 weeks the
    trainer kept the top weight and only started lower (26-day break, 14.09:
    hack 85→120 vs 120 before, bench 80 as before); past that, cut."""
    if gap_days < 35:
        return 1.0
    if gap_days < 56:
        return 0.9
    if gap_days < 90:
        return 0.8
    return 0.7


def global_breaks(st):
    """Dates where training resumed after >= 14 days off (any day type)."""
    ds = [parse_date(s["date"]) for s in st.sessions]
    return [b for a, b in zip(ds, ds[1:]) if (b - a).days >= 14]


def template_for(st, day):
    """Exercise ids of the last session of that day type, else the active pool."""
    for s in reversed(st.sessions):
        if st.session_day(s) == day and s["strength"]:
            ids = []
            for it in s["strength"]:
                i = st.cat.s_row.get(norm(it["name"]))
                if i and i not in ids:
                    ids.append(i)
            if ids:
                return s["date"], ids
    return None, [e["id"] for e in st.cat.day_pool(day) if e.get("status") == "active"]


def resolve(st, ex_id):
    """What Alex does for a template exercise in this gym: (exercise, replaced id)."""
    status = st.machines.get(ex_id)
    base = st.cat.strength[ex_id]
    if ex_id in st.subs and status != "have" and st.subs[ex_id] in st.cat.strength:
        return st.cat.strength[st.subs[ex_id]], ex_id
    if status == "missing":
        for alt in base.get("alt_ids", []):
            if st.machines.get(alt) != "missing":
                return st.cat.strength[alt], ex_id
        return None, ex_id
    return base, None


# ---------------------------------------------------------------- progression
def shape(ex, top, step, ramp_first=None):
    sets = ex.get("sets", 3)
    if ex["scheme"] == "pyramid":
        return [max(top - step * (sets - 1 - i), step) for i in range(sets)]
    first = top if ramp_first is None else ramp_first
    return [first] + [top] * (sets - 1)


def suggest(st, ex, origin=None):
    """Next weights for one exercise, in the trainer's style: ramp in (1st set
    lighter) -> close the ramp -> reps to the top of the range -> hold the
    weight N sessions -> one step up on the 2nd and 3rd set. Pauses keep the
    weight and start lower; long pauses and another gym's machines cut it."""
    U = st.units
    lo, hi = ex["rep_range"]
    rep_txt = f"{lo}-{hi}" if lo != hi else str(hi)
    occ = st.occurrences(ex["id"])
    anchor = []
    if not occ and (ex.get("calibrate_from") or origin):
        anchor = st.occurrences(ex.get("calibrate_from") or origin)
    res = {"id": ex["id"], "ru": ex["ru"], "en": st.cat.name(ex), "role": ex["role"], "scheme": ex["scheme"],
           "sets": ex.get("sets", 3), "reps": rep_txt, "history": [o.brief() for o in (occ or anchor)[-3:]]}
    if origin:
        res["replaces"] = origin
    step = U.step(ex)
    if U.lb:
        res["step_lb"] = step
    transfer = ex.get("us_transfer", "machine")
    caution = ex.get("back") == "caution"
    hits = sorted(st.pain & set(ex.get("joints", [])))
    if hits:
        res.update(action="swap", why=f"сегодня болит {', '.join(JOINTS.get(j, j) for j in hits)} — заменить или убрать")
        return res

    def with_cue(action):
        if ex.get("back_cue_ru") and (caution or "lower_back" in st.pain) and (
                action in ("calibrate", "re_entry", "probe") or "lower_back" in st.pain
                or "lower_back" in st.recent_pain):
            res["cue"] = ex["back_cue_ru"]
        return res

    cur_own = [o for o in occ if not st.gym_since or o.date >= st.gym_since]
    if transfer == "probe" and st.gym_since and not cur_own:
        hint = ex.get("probe_hint_lb")
        res.update(action="probe", hint_lb=hint,
                   why=f"тренажёры разные: вес подобрать, {hi} повторов с запасом 2" + (f" (обычно {hint} lb)" if hint else ""))
        return with_cue("probe")
    if not occ and not anchor:
        res.update(action="new", why="истории нет: 1-й подход лёгкий, рабочий — где 2 повтора в запасе")
        return res

    base = occ or anchor
    cur = cur_own if occ else []
    last = (cur or base)[-1]
    gap = (st.today - last.date).days
    f = deload_factor(st.group_gap(ex))
    if caution and gap >= 21:
        f = min(f, 0.9)   # lumbar-caution moves come back lighter (pullover 50 -> 36-45 on 21.09)
    fb = st.fb(last.date, ex["id"]) if occ else None
    if fb == "pain":
        res.update(action="swap", why=f"{ddmm(last.date)} было больно — заменить из пула дня")
        return res
    W0 = U.from_kg(last.we, ex)
    F0 = U.from_kg(last.ws, ex)

    def ramp(top, first_steps=1):
        return shape(ex, top, step, None if ex["scheme"] == "pyramid" else max(top - first_steps * step, step))

    def wt(kg):
        return f"{U.from_kg(kg, ex)} lb" if U.lb else f"{clean_num(kg)} кг"

    def done(action, weights, why, reps=None):
        res.update(action=action, why=why, reps=reps or res["reps"], **U.pair(weights))
        joints_hit = sorted(set(ex.get("joints", [])) & set(st.recent_pain))
        if action in ("step_up", "close_ramp", "re_entry_up") and (st.readiness == "low" or joints_hit):
            keep = shape(ex, W0, step, F0 if F0 < W0 else None)
            reason = "самочувствие слабое" if st.readiness == "low" else \
                f"{JOINTS.get(joints_hit[0], joints_hit[0])} жаловалось {st.recent_pain[joints_hit[0]]}"
            res.update(action="hold", why=f"{why}; {reason} — без прибавки", **U.pair(keep))
        if action == "calibrate" and st.readiness == "low":
            res.update(why=why + "; самочувствие слабое — на шаг легче",
                       **U.pair([max(w - step, step) for w in weights]))
        return with_cue(res["action"])

    # A. first time on this gym's machine: the old gym's numbers are only a start
    if not cur:
        k = TRANSFER.get(transfer, 0.75)
        top = max(U.floor_from_kg(last.we * f * k, ex), 2 * step)
        src = f"{st.cat.strength[ex.get('calibrate_from') or origin]['ru']} " if anchor else ""
        why = (f"новый тренажёр: в Киеве {src}{clean_num(last.we)} кг ({ddmm(last.date)}) → "
               f"старт −{round((1 - f * k) * 100)} %")
        return done("calibrate", ramp(top, 2), why, str(lo) if gap >= 14 else rep_txt)

    W, F = W0, F0
    # B. back on this movement after 2+ weeks
    if gap >= 14:
        top = W if f == 1.0 else U.floor_from_kg(last.we * f, ex)
        why = (f"{gap} дн. без упражнения: вес как {ddmm(last.date)}, 1-й подход легче, повторы по нижней границе"
               if f == 1.0 else f"{gap} дн. без упражнения: −{round((1 - f) * 100)} % от {wt(last.we)}")
        return done("re_entry", ramp(top, 2), why, str(lo))

    per = parse_reps(last.reps)
    missed = per["kind"] == "per_set" and min(per["vals"]) < lo
    below_top = per["kind"] == "single" and per["vals"][0] < hi
    prev = cur[-2] if len(cur) > 1 else None
    fb_prev = st.fb(prev.date, ex["id"]) if prev else None

    # C. feedback and missed reps come before any increase
    if fb == "fail" or (fb == "hard" and fb_prev == "hard"):
        return done("step_back", shape(ex, max(W - step, step), step), "в прошлый раз не дожал — шаг назад")
    if fb == "hard" or missed:
        why = ("в прошлый раз было тяжело — держим вес" if fb == "hard"
               else f"не все повторы ({last.reps}) — держим вес, добираем повторы")
        return done("hold", shape(ex, W, step, F if F < W else None), why)

    # D. climbing back to the weight before a break or the gym change (first 3 sessions)
    marks = [b for b in global_breaks(st) if b <= last.date]
    if st.gym_since and st.gym_since <= last.date:
        marks.append(st.gym_since)
    if marks and not caution and transfer != "probe":
        mark = max(marks)
        own_since = [o for o in occ if o.date >= mark]
        before = [o for o in (occ if [o for o in occ if o.date < mark] else anchor) if o.date < mark]
        if before and len(own_since) <= 3:
            target = U.from_kg(before[-1].we, ex)
            if W < target:
                jump = 2 if fb == "easy" and W + 2 * step <= target else 1
                nxt = min(W + jump * step, target)
                return done("re_entry_up", ramp(nxt) if ex["scheme"] != "pyramid" else shape(ex, nxt, step),
                            f"возврат к весу до перерыва ({clean_num(before[-1].we)} кг в Киеве): +{jump} шаг")

    # E. normal slow progression
    need = max(1, ex.get("progress_n", 3) - (1 if fb == "easy" else 0))
    if ex["scheme"] == "pyramid":
        flat_n = 0
        for o in reversed(cur):
            if U.from_kg(o.we, ex) != W:
                break
            flat_n += 1
        if fb == "easy" or (flat_n >= need and not below_top):
            return done("step_up", shape(ex, W + step, step),
                        f"верх {wt(last.we)} " + ("было легко" if fb == "easy" else "сделан") + " → +1 шаг")
        if below_top:
            return done("add_reps", shape(ex, W, step), f"вес тот же, верхний подход до {hi} повторов", rep_txt)
        return done("hold", shape(ex, W, step), f"верх {wt(last.we)} — ещё {need - flat_n} трен. до прибавки")
    if F < W:
        nf = min(W, F + step)
        return done("close_ramp", shape(ex, W, step, nf if nf < W else None), "1-й подход подтягиваем к рабочему весу")
    if below_top:
        return done("add_reps", shape(ex, W, step), f"вес тот же, добрать до {hi} повторов", str(hi))
    flat_n = 0
    for o in reversed(cur):
        pr = parse_reps(o.reps)
        ok_reps = not (pr["kind"] == "single" and pr["vals"][0] < hi) and \
            not (pr["kind"] == "per_set" and min(pr["vals"]) < hi)
        if U.from_kg(o.we, ex) == W and U.from_kg(o.ws, ex) == W and ok_reps:
            flat_n += 1
        else:
            break
    if flat_n >= need:
        return done("step_up", shape(ex, W + step, step, W),
                    f"{wt(last.we)} × {hi} — {flat_n} раза → +1 шаг на 2-м и 3-м подходе", rep_txt)
    return done("hold", shape(ex, W, step), f"{wt(last.we)} — ещё {need - flat_n} ровн. трен. до прибавки")


# ---------------------------------------------------------------- warm-up
def warmup_history(st):
    hist = []
    for s in st.sessions:
        items = []
        for it in s.get("warmup", []):
            wid = it.get("id") or st.cat.w_row.get(norm(it.get("name")))
            if wid not in st.cat.warm:
                continue
            w = st.cat.warm[wid]
            lvl = w["level"]
            kg = num(it.get("w_end"))
            if w.get("loaded_level") and (kg or 0) >= w["loaded_level"]["load_kg"]:
                lvl = w["loaded_level"]["level"]
            items.append((wid, w["family"], lvl, cell_str(it.get("reps"))))
        if items:
            hist.append((s["date"], st.session_day(s), items))
    return hist


def rung(st, fam, level):
    """(id, kg) of a family's rung; kg None = unloaded."""
    for w in st.cat.warm.values():
        if w["family"] != fam:
            continue
        if w["level"] == level:
            return w["id"], w.get("load_kg")
        ll = w.get("loaded_level")
        if ll and ll["level"] == level:
            return w["id"], ll["load_kg"]
    return None, None


def warmup_suggest(st, day):
    """The trio the trainer would write: the last same-day warm-up, one slot
    rotated when the same three repeat, each family on its current rung (a
    one-session step-down never sticks), one rung up at most, loaded rungs
    unloaded after 3+ weeks off, stabilizers only when the back hurts."""
    hist = warmup_history(st)
    gap = (st.today - parse_date(st.sessions[-1]["date"])).days if st.sessions else 99
    uses = {}
    for d, dd, items in hist:
        for wid, fam, lvl, dose in items:
            uses.setdefault(fam, []).append((d, dd, lvl, dose))
    cur = {f: max(l for _, _, l, _ in u[-4:]) for f, u in uses.items()}

    def level_for(f):
        if f == "A":   # taps were the chest-day variant, Dog birds the rest
            same = [l for _, dd, l, _ in uses.get("A", []) if dd == day]
            if same:
                return same[-1]
        return cur.get(f, 1)

    same_day = [items for _, dd, items in hist if dd == day]
    base = [fam for _, fam, _, _ in (same_day[-1] if same_day else (hist[-1][2] if hist else []))]
    fams = []
    for f in base + ["E", "B", "A"]:
        if f not in fams:
            fams.append(f)
    fams = fams[:3]
    last2 = [{fam for _, fam, _, _ in items} for _, _, items in hist[-2:]]
    rot = WARMUP_ROTATE[day]
    notes = []
    if len(last2) == 2 and all(x == set(fams) for x in last2) and rot not in fams:
        def streak(f):
            n = 0
            for _, _, items in reversed(hist):
                if f in {fam for _, fam, _, _ in items}:
                    n += 1
                else:
                    break
            return n
        keep_core = [f for f in fams if f in CORE]
        cands = [f for f in fams if not (f in CORE and len(keep_core) == 1)]
        drop = max(cands, key=streak)
        fams[fams.index(drop)] = rot
        notes.append(f"сменили {drop} на {rot}")
    if "lower_back" in st.pain or "lower_back" in st.recent_pain:
        fams = ["A", "B", "C"]
        notes = ["поясница: только стабилизация"]
    if not set(fams) & CORE:
        fams[-1] = "A"
    items, advanced = [], False
    for f in fams:
        lvl = level_for(f)
        u = uses.get(f, [])
        n_at = 0
        for _, _, l, _ in reversed(u):
            if l != lvl:
                break
            n_at += 1
        wid, kg = rung(st, f, lvl)
        if wid is None:
            wid, kg = rung(st, f, 1)
        if gap >= 21 and kg is not None:
            down = next(((w2, k2) for l2 in range(lvl - 1, 0, -1)
                         for w2, k2 in [rung(st, f, l2)] if w2 and k2 is None), None)
            if not down:
                continue   # halo has no unloaded rung: the slot goes to a stabilizer below
            wid, kg = down
            notes.append(f"{f}: после паузы без веса")
        elif (not advanced and n_at >= 6 and gap < 14
              and not ({"lower_back"} & (st.pain | set(st.recent_pain)))):
            w2, k2 = rung(st, f, lvl + 1)
            if w2:
                wid, kg, advanced = w2, k2, True
                notes.append(f"{f}: ступень вверх после {n_at} трен.")
        w = st.cat.warm[wid]
        item = {"id": wid, "sets": w.get("sets", 2)}
        if w.get("secs"):
            last = num((u[-1][3] if u else "").strip('"″')) if u else None
            item["secs"] = int(last) if last and last >= w["secs"] else w["secs"]
        else:
            item["reps"] = w.get("reps", 15)
        if kg:
            item["kg"] = kg
        items.append(item)
    for f in ("C", "B", "A"):
        if len(items) >= 3:
            break
        if f not in [st.cat.warm[i["id"]]["family"] for i in items]:
            wid, kg = rung(st, f, level_for(f))
            w = st.cat.warm[wid]
            items.append({"id": wid, "sets": w.get("sets", 2), **({"secs": w["secs"]} if w.get("secs") else {"reps": w.get("reps", 15)})})
    fam_state = {f: {"rung": rung(st, f, cur[f])[0], "level": cur[f], "last": ddmm(u[-1][0])}
                 for f, u in sorted(uses.items())}
    return {"suggested": items, "notes": notes, "families": fam_state}


# ---------------------------------------------------------------- crossfit
def mmss(s):
    m = re.fullmatch(r"(\d+):(\d{2})(?::(\d{2}))?", cell_str(s))
    if not m:
        return None
    if m.group(3):   # h:mm:ss from a formatted duration
        return int(m.group(1)) * 60 + int(m.group(2)) + int(m.group(3)) / 60
    return int(m.group(1)) + int(m.group(2)) / 60


def crossfit_recent(st):
    """Combos in order, how often each movement was done, and the last load used."""
    rec, usage, loads = [], Counter(), {}
    for s in st.sessions:
        cf = s.get("crossfit") or {}
        ids = []
        for it in cf.get("items", []):
            cid = it.get("id") or st.cat.c_row.get(norm(it.get("name")))
            if cid in st.cat.cross:
                ids.append(cid)
                usage[cid] += 1
                if num(it.get("w_end")) is not None:
                    loads[cid] = num(it.get("w_end"))
        if ids:
            cap = num(re.sub(r"[^0-9.]", "", cell_str(cf.get("cap")))) if cf.get("cap") else None
            rec.append({"date": s["date"], "day": st.session_day(s), "rounds": cf.get("rounds"),
                        "finish": cf.get("finish"), "finish_min": mmss(cf.get("finish")), "cap_min": cap, "items": ids})
    return rec, usage, loads


def crossfit_dose(st):
    gap = (st.today - parse_date(st.sessions[-1]["date"])).days if st.sessions else 0
    dose = {"format": "rounds", "rounds": 3, "cap_min": 12, "scale": 1.0, "known_only": False, "movements": 4}
    if gap >= 21:
        dose.update(cap_min=8, scale=0.7, known_only=True)
    if st.readiness == "low":
        dose.update(rounds=2, cap_min=8, scale=0.7, known_only=True)
    if st.time_min and st.time_min <= 45:
        dose.update(rounds=2, cap_min=6, scale=0.7)
    elif st.time_min and st.time_min <= 60:
        dose.update(cap_min=min(dose["cap_min"], 8))
    if dose["known_only"] or (st.time_min and st.time_min <= 45):
        dose["movements"] = 3
    rec = crossfit_recent(st)[0]
    last = next((r for r in reversed(rec) if r["finish_min"] and r["cap_min"]), None)
    if last and gap < 21:   # the last combo overran its cap → smaller doses; far under → a bit more
        ratio = last["finish_min"] / last["cap_min"]
        if ratio > 1.1:
            dose["scale"] = round(dose["scale"] * 0.85, 2)
            dose["why"] = f"{ddmm(last['date'])}: {last['finish']} при cap {clean_num(last['cap_min'])}′ — повторы меньше"
        elif ratio < 0.6 and dose["scale"] >= 1.0:
            dose["scale"] = 1.15
            dose["why"] = f"{ddmm(last['date'])}: {last['finish']} при cap {clean_num(last['cap_min'])}′ — повторы больше"
    return dose


def crossfit_brief(st, day):
    rec, usage, loads = crossfit_recent(st)
    last10 = Counter(i for r in rec[-10:] for i in r["items"])
    dose = crossfit_dose(st)
    prim = set(st.cat.days[day]["primary_patterns"])
    sore = st.pain | set(st.recent_pain)
    pool = []
    for c in st.cat.cross.values():
        if c.get("status") == "retired" or set(c.get("avoid_if", [])) & sore:
            continue
        if "lower_back" in sore and c.get("back") == "caution":
            continue
        eq = c.get("equipment", "none")
        status = "have" if eq == "none" else st.equipment.get(eq, "unknown")
        if status == "missing":
            continue
        if dose["known_only"] and usage.get(c["id"], 0) < 2:
            continue
        e = {"id": c["id"], "ru": c["ru"], "kind": c["kind"], "day_muscles": bool(set(c["pattern"]) & prim),
             "back": c.get("back", "safe"), "uses": usage.get(c["id"], 0), "uses_last10": last10.get(c["id"], 0)}
        if c.get("secs"):
            e["secs"] = nice(c["secs"] * dose["scale"])
        else:
            e["reps"] = nice(c["reps"] * dose["scale"])
        if c.get("unit"):
            e["unit"] = c["unit"]
        if c.get("load_kg") is not None:   # the trainer's last load for it, within the cap
            e["kg"] = min(loads.get(c["id"], c["load_kg"]), c.get("max_kg") or 999)
        if status not in ("have", "seen"):
            e["equipment"] = f"{eq}: {status}"
            if c.get("fallback"):
                e["fallback"] = c["fallback"]
        pool.append(e)
    pool.sort(key=lambda x: (x["day_muscles"], x["uses_last10"], x["id"]))
    recent = [{"date": ddmm(r["date"]), "day": r["day"], "items": r["items"], "finish": r["finish"]} for r in rec[-4:]]
    return {"dose": dose, "recent": recent, "pool": pool}


def est_seconds(st, cf):
    """Rough time of a combo, for the cap: seconds per rep from the catalog
    plus 10 s per movement change (calibrated on 12.10: 11:00 est vs 11:00)."""
    items = cf.get("items", [])
    if not items or cf.get("format") == "skip":
        return 0
    rounds = cf.get("rounds", 3) if cf.get("format", "rounds") == "rounds" else 1
    total = 0
    for it in items:
        c = st.cat.cross.get(it["id"], {})
        if it.get("secs") or (c.get("secs") and not it.get("reps")):
            total += (float(it.get("secs") or c.get("secs") or 40) + 10) * rounds
            continue
        nums = [int(x) for x in re.findall(r"\d+", cell_str(it.get("reps", c.get("reps", 10))))] or [10]
        if len(nums) > 1:   # a ladder like 21-15-9: the whole ladder
            total += sum(nums) * c.get("sec", 3) + 10 * len(nums)
        else:
            total += (nums[0] * c.get("sec", 3) + 10) * rounds
    return int(total)


def session_minutes(st, plan):
    """Rough length: 2.5′ per warm-up movement, 6′ per strength exercise (4.5′
    inside a superset), the crossfit estimate, 5′ moving between stations."""
    items = plan.get("strength", [])
    s = sum(4.5 if (it.get("superset_next") or (k and items[k - 1].get("superset_next"))) else 6
            for k, it in enumerate(items))
    return round(2.5 * len(plan.get("warmup", [])) + s + est_seconds(st, plan.get("crossfit") or {}) / 60 + 5)


# ---------------------------------------------------------------- brief
def cmd_brief(a):
    today = parse_date(a.today) if a.today else date.today()
    st = State(today, a.day, (a.pain or "").split(","), a.readiness, a.time,
               missing=(a.missing or "").split(","), cleared=(a.ok or "").split(","))
    if not st.sessions:
        die("history is empty: run `sync` or `import-grid` first")
    rot = st.rotation()
    day = a.day or rot["next"]
    t_date, t_ids = template_for(st, day)
    strength, dropped = [], []
    for i in t_ids:
        ex, origin = resolve(st, i)
        if ex is None:
            why = "сегодня занят, замены нет" if i in st.missing_today else "нет в зале и нет замены"
            dropped.append({"id": i, "ru": st.cat.strength[i]["ru"], "why": why})
            continue
        s = suggest(st, ex, origin)
        if origin is None and st.machines.get(i) in ("unknown", "unlikely") and ex.get("alt_ids"):
            s["if_missing"] = st.cat.strength[ex["alt_ids"][0]]["ru"]
        strength.append(s)
    strength.sort(key=lambda s: st.cat.strength[s["id"]]["order"])
    used = {s["id"] for s in strength} | {s.get("replaces") for s in strength}
    pool = []
    for e in sorted(st.cat.day_pool(day), key=lambda e: e["order"]):
        if e["id"] in used or e.get("status") == "retired":
            continue
        ex, origin = resolve(st, e["id"])
        if ex is None:
            continue
        sg = suggest(st, ex, origin)
        occ = st.occurrences(e["id"])
        pool.append({k: v for k, v in {"id": ex["id"], "ru": ex["ru"], "role": ex["role"], "status": e.get("status"),
                                       "last_used": ddmm(occ[-1].date) if occ else None, "action": sg.get("action"),
                                       "kg": sg.get("kg"), "lb": sg.get("lb"), "hint_lb": sg.get("hint_lb"),
                                       "replaces": origin}.items() if v is not None})
    trim, trimmed = None, []
    warm = warmup_suggest(st, day)
    if st.time_min:   # the engine trims; the lists below are already cut to fit
        n_max = 4 if st.time_min <= 45 else 5 if st.time_min <= 60 else 7
        keep = sorted(strength, key=lambda s: (ROLE_RANK[s["role"]], st.cat.strength[s["id"]]["order"]))[:n_max]
        trimmed = [{"id": s["id"], "ru": s["ru"]} for s in strength if s not in keep]
        strength = [s for s in strength if s in keep]
        w_max = 2 if st.time_min <= 45 else 3
        core_first = sorted(warm["suggested"], key=lambda w: st.cat.warm[w["id"]]["family"] not in CORE)
        warm["suggested"] = [w for w in warm["suggested"] if w in core_first[:w_max]]
        trim = {"time_min": st.time_min, "strength_max": n_max, "warmup_max": w_max}
    streak = 0
    t_set = set(t_ids)
    for s in reversed(st.sessions):
        if st.session_day(s) != day or not s["strength"]:
            continue
        if {st.cat.s_row.get(norm(i["name"])) for i in s["strength"]} - {None} == t_set:
            streak += 1
        else:
            break
    p = st.pause()
    ask = []
    if p.get("ask"):
        ask.append(f"Тренировался после {ddmm(p['last_session'])}? В логе {p['days_since']} дн. без тренировок")
    for j in sorted(st.pain):   # red-flag screen before planning around pain
        extra = ", отдаёт в ногу?" if j == "lower_back" else (", отдаёт в руку?" if j in ("neck", "shoulder") else "?")
        ask.append(f"{JOINTS.get(j, j).capitalize()}: ноет тупо или острая боль{extra}")
    for j, d in sorted(st.recent_pain.items()):
        if j not in st.pain:
            ask.append(f"{JOINTS.get(j, j).capitalize()}: {d} было больно — как сейчас? (нормально → --ok {j})")
    brief = {
        "today": today.isoformat(), "day": day, "day_ru": st.cat.days[day]["ru"],
        "gym": {"name": st.gym["name"], "units": st.units.name(), "since": st.gym.get("since"),
                "first_session_here": bool(st.gym_since) and not any(
                    parse_date(s["date"]) >= st.gym_since for s in st.sessions)},
        "pause": p, "rotation": rot, "ask": ask,
        "pre": {"pain": sorted(st.pain), "readiness": st.readiness, "time_min": st.time_min,
                "missing": st.missing_today, "cleared": sorted(st.cleared), "recent_pain": st.recent_pain},
        "body_weight_kg": next((s["body_weight"] for s in reversed(st.sessions) if s.get("body_weight")), None),
        "strength": {"template_from": t_date, "template_streak": streak, "items": strength,
                     "dropped": dropped, "trimmed": trimmed, "pool": pool},
        "trim": trim,
        "warmup": warm,
        "crossfit": crossfit_brief(st, day),
        "history_synced_at": st.history_synced,
    }
    out(brief, compact=True)


# ---------------------------------------------------------------- render
def dose_txt(it, base):
    sets = it.get("sets", base.get("sets", 2))
    if it.get("secs") or (base.get("secs") and not it.get("reps")):
        return f"{sets}×{it.get('secs', base.get('secs'))}″"
    return f"{sets}×{it.get('reps', base.get('reps'))}"


def render_plan(plan, fmt="md", only=None):
    """The trainer's three-part page as three narrow tables (phone first).
    `only` = warmup | strength | crossfit renders that table alone (Mode 2)."""
    d = parse_date(plan["date"]) or date.today()
    st = State(d, use_plans=False)
    gym = st.gym
    md = fmt == "md"
    day = st.cat.days.get(plan["day"], {"ru": plan["day"], "en": ""})
    notes = []

    def bold(s):
        return f"**{s}**" if md else s

    def ital(s):
        return f"_{s}_" if md else s

    def mark(text):
        notes.append(text)
        return SUP[len(notes) - 1]

    def nm(ru, en, *foot):
        m = "".join(mark(t) for t in foot if t)
        if en and norm(en) != norm(ru):
            return f"{ru}{m} · *{en}*" if md else f"{ru}{m} ({en})"
        return f"{ru}{m}"

    def table(head, rows, labels=None):
        if md:
            res = ["| " + " | ".join(head) + " |", "|" + "|".join(["---"] * len(head)) + "|"]
            return res + ["| " + " | ".join(str(c).replace("|", "/") for c in r) + " |" for r in rows]
        lab = labels or [""] * len(head)
        return ["• " + " — ".join(f"{c}{(' ' + l) if l and c not in ('—', '') else ''}" for c, l in zip(r, lab)
                                  if str(c) not in ("", "—")) for r in rows]

    lines = [bold(f"{d:%d.%m} · {day['ru']} / {day['en']} · ≈{session_minutes(st, plan)}′")]
    if plan.get("note"):
        lines.append(ital(plan["note"]))
    if only:
        lines = []

    rows = []
    for w in plan.get("warmup", []) if only in (None, "warmup") else []:
        base = st.cat.warm.get(w["id"]) or {"ru": w.get("ru", w["id"]), "en": w.get("en", ""), "sets": 2, "family": "?"}
        ru, en, load, kg = base["ru"], Catalog.name(base), base.get("load"), w.get("kg")
        if base.get("loaded_level") and kg:
            ll = base["loaded_level"]
            ru, en, load = ll["ru"], Catalog.name(ll), ll["load"]
        elif kg is None and base.get("load_kg") and not base.get("loaded_level"):
            kg = base["load_kg"]
        if kg:
            kt, lt = implement(kg, load, gym, cap_kg=10 if base.get("family") == "E" else None)
            ru = f"{ru} {kt} ({lt})"
        rows.append([nm(ru, en, w.get("cue")), dose_txt(w, base)])
    if rows:
        lines += ["", bold("I. Разминка")] + table(["Упражнение", "×"], rows)

    rows, steps, probe = [], {}, False
    items = plan.get("strength", []) if only in (None, "strength") else []
    for k, it in enumerate(items):
        ex = st.cat.strength.get(it["id"]) or {"ru": it.get("ru", it["id"]), "en": it.get("en", ""), "load": "stack", "day": []}
        joined = k > 0 and items[k - 1].get("superset_next")
        kg = it.get("kg") or []
        lb = it.get("lb") or [lb_round(v) for v in kg]
        if kg:
            kg_s = fmt_w([round(v) for v in kg] if st.units.lb else kg)
            lb_s = fmt_w(lb)
            if ex.get("load") == "db_each":
                kg_s, lb_s = f"2×{kg_s}", f"2×{lb_s}"
        else:
            hint = [int(x) for x in re.findall(r"\d+", it.get("hint_lb") or "")]
            kg_s = ("~" + "–".join(str(round(x / KG_LB)) for x in hint)) if hint else "—"
            lb_s = f"~{it['hint_lb']}" if it.get("hint_lb") else "подобрать"
        if it.get("action") in ("calibrate", "probe"):
            probe = True
            if it.get("step_lb"):
                steps.setdefault(it["step_lb"], []).append(ex["ru"])
        reps = f"{it.get('sets', 3)}×{it.get('reps', '10')}"
        if ex.get("per_side"):
            reps += " на ногу" if "legs" in ex.get("day", []) else " на руку"
        smith = ex.get("unit_note_ru") if it.get("action") == "calibrate" else None
        rows.append([("+ " if joined else "") + nm(ex["ru"], Catalog.name(ex), it.get("cue"), smith,
                                                   f"нет тренажёра → {it['if_missing']}" if it.get("if_missing") else None),
                     kg_s, lb_s, reps])
    if rows:
        head = "II. Силовая" + (" · + суперсет" if any(i.get("superset_next") for i in items) else "")
        lines += ["", bold(head)] + table(["Упражнение", "кг", "lb", "×"], rows, ["", "кг", "lb", ""])
    if probe:
        common = max(steps, key=lambda s: len(steps[s])) if steps else None
        extra = ", ".join(f"{'/'.join(n.split(' (')[0] for n in names)} ±{s}" for s, names in sorted(steps.items(), reverse=True)
                          if s != common)
        step_txt = f" Шаг ±{common} lb" + (f" ({extra})" if extra else "") + "." if common else ""
        lines.append(ital("1-й подход — проба: легко → +шаг, тяжело → −шаг." + step_txt))
    if notes:
        lines += [f"{SUP[i]} {n}" for i, n in enumerate(notes)]
        notes.clear()

    cf = (plan.get("crossfit") or {}) if only in (None, "crossfit") else {"format": "none"}
    kind = cf.get("format", "rounds")
    if kind == "none":
        pass
    elif kind == "skip":
        lines += ["", bold("III. Кроссфит — сегодня без него")]
    else:
        h = {"rounds": f"III. Кроссфит ×{cf.get('rounds', 3)}",
             "ladder": f"III. Кроссфит {cf.get('scheme', '21-15-9')}"}.get(kind, f"III. Кроссфит {cf.get('label', kind)}")
        if cf.get("cap_min"):
            h += f" · cap {cf['cap_min']}′"
        est = est_seconds(st, cf)
        h += " · на время" + (f" (≈{max(1, round(est / 60))}′)" if est else "")
        rows = []
        for it in cf.get("items", []):
            base = st.cat.cross.get(it["id"]) or {"ru": it.get("ru", it["id"]), "en": it.get("en", "")}
            kg = it.get("kg", base.get("load_kg"))
            ru = base["ru"]
            if kg:
                kt, lt = implement(kg, base.get("load"), gym, base.get("max_kg"))
                ru += f" {kt} ({lt})"
            if it.get("fallback") and it["fallback"] in st.cat.cross:
                fbk = st.cat.cross[it["fallback"]]
                ratio = (num(it.get("reps")) or base.get("reps") or 1) / (base.get("reps") or 1)
                ru += f" (нет — {fbk['ru']} {nice((fbk.get('reps') or 10) * ratio)})"
            amount = it.get("reps", base.get("reps", ""))
            if it.get("secs") or (base.get("secs") and not it.get("reps")):
                amount = f"{it.get('secs', base.get('secs'))}″"
            unit = it.get("unit", base.get("unit", ""))
            rows.append([nm(ru, Catalog.name(base), it.get("cue")), f"{amount}{(' ' + unit) if unit else ''}"])
        lines += ["", bold(h)] + table(["Движение", "×"], rows)
        if notes:
            lines += [f"{SUP[i]} {n}" for i, n in enumerate(notes)]
    if cf.get("note"):
        lines += ["", ital(cf["note"])]
    if only:
        return "\n".join(lines).strip()
    if plan.get("why"):
        lines += ["", ital("Почему: " + "; ".join(plan["why"]))]
    lines += ["", ("После: на каком весе остановился и где было легко / тяжело / больно?" if probe
                   else "После: где было легко / тяжело / больно?")]
    return "\n".join(lines)


def cmd_render(a):
    plan = load_json(a.plan)
    text = render_plan(plan, a.fmt, a.only)
    print(text)
    if a.save:
        path = os.path.join(PLANS_D, f"{parse_date(plan['date']).isoformat()}.json")
        old = load_json(path, {}) if os.path.exists(path) else {}
        if old.get("feedback"):
            plan["feedback"] = old["feedback"]
        plan["rendered"] = render_plan(plan, a.fmt) if a.only else text
        save_json(path, plan)


# ---------------------------------------------------------------- check
NEVER_WORDS = ["становая", "deadlift", "румынск", "rdl", "good morning", "наклоны со штангой", "bent-over",
               "в наклоне", "kettlebell swing", "махи гир", "swing", "clean", "snatch", "взятие", "рывок",
               "back squat", "front squat", "со штангой на спине", "штангой на груди", "standing barbell",
               "жим штанги стоя", "jefferson", "landmine", "pendlay"]


def cmd_check(a):
    plan = load_json(a.plan)
    d = parse_date(plan.get("date"))
    if not d:
        die("plan.date missing or not a date")
    pre = plan.get("pre") or {}
    st = State(d, plan.get("day"), pre.get("pain", []), pre.get("readiness", "normal"), pre.get("time_min"),
               missing=pre.get("missing", []), cleared=pre.get("cleared", []))
    errors, warns = [], []
    day = plan.get("day")
    if day not in DAYS:
        errors.append(f"day must be one of {DAYS}")
    overrides = plan.get("overrides") or {}
    sore = st.pain | set(st.recent_pain)

    def custom_ok(it, where):
        name = norm(it.get("ru", "") + " " + it.get("en", ""))
        if any(w in name for w in NEVER_WORDS):
            errors.append(f"{where}: «{it.get('ru') or it.get('en')}» — из списка «никогда» (нагрузка на поясницу)")
        elif not it.get("reason"):
            errors.append(f"{where}: «{it.get('id')}» нет в каталоге — нужно ru, en и reason")
        else:
            warns.append(f"{where}: вне каталога «{it.get('ru')}» — {it['reason']}")

    # I
    wu = plan.get("warmup", [])
    if not 2 <= len(wu) <= 4:
        errors.append(f"разминка: {len(wu)} упражнений, у тренера 2–3")
    fams = []
    wsug = warmup_suggest(st, day) if day in DAYS else {"suggested": []}
    sug_ids = {i["id"]: i for i in wsug["suggested"]}
    for w in wu:
        base = st.cat.warm.get(w["id"])
        if not base:
            custom_ok(w, "разминка")
            continue
        fams.append(base["family"])
        kg = w.get("kg") or 0
        if base["family"] == "E" and kg > 10:
            errors.append("разминка: экстензия тяжелее 10 кг — из списка «никогда»")
        if "lower_back" in sore and (base["family"] in ("E",) or kg):
            errors.append(f"разминка: {base['ru']} — поясница жалуется, только стабилизация (A/B/C) без веса")
        s = sug_ids.get(w["id"])
        if s and kg and not s.get("kg"):
            warns.append(f"разминка: {base['ru']} с весом, а после паузы движок даёт без веса")
    if fams and not set(fams) & CORE:
        errors.append("разминка: нет стабилизации корпуса (Dog birds / планка / удержание резины)")
    if len(fams) != len(set(fams)):
        warns.append("разминка: два упражнения из одной семьи — тренер так не делал")

    # II
    sl = plan.get("strength", [])
    if not 3 <= len(sl) <= 7:
        errors.append(f"силовая: {len(sl)} упражнений, у тренера 4–6")
    trim_max = 4 if (st.time_min or 99) <= 45 else 5 if (st.time_min or 99) <= 60 else 7
    if len(sl) > trim_max:
        warns.append(f"силовая: {len(sl)} упражнений на {st.time_min} мин — не больше {trim_max}")
    ranks = []
    for k, it in enumerate(sl):
        ex = st.cat.strength.get(it["id"])
        if not ex:
            custom_ok(it, "силовая")
            continue
        if day in DAYS and day not in ex["day"] and "any" not in ex["day"] and it["id"] not in overrides:
            errors.append(f"силовая: {ex['ru']} — не из пула дня «{day}»")
        if ex.get("status") == "retired" and it["id"] not in overrides:
            errors.append(f"силовая: {ex['ru']} снято тренером ({ex.get('note_ru', '')})")
        if st.machines.get(it["id"]) == "missing":
            errors.append(f"силовая: {ex['ru']} — этого тренажёра в зале нет")
        hit = st.pain & set(ex.get("joints", []))
        if hit and it["id"] not in overrides:
            errors.append(f"силовая: {ex['ru']} нагружает {', '.join(JOINTS.get(j, j) for j in sorted(hit))}, а сегодня там болит")
        occ = st.occurrences(it["id"])
        if occ and st.fb(occ[-1].date, it["id"]) == "pain" and it["id"] not in overrides:
            errors.append(f"силовая: {ex['ru']} — в прошлый раз было больно, заменить")
        kg = it.get("kg") or []
        s = suggest(st, ex, it.get("replaces"))
        if not kg and s.get("action") not in ("new", "probe"):
            errors.append(f"силовая: {ex['ru']} без веса, а движок его знает ({s.get('action')})")
        if kg and len(kg) != it.get("sets", 3):
            errors.append(f"силовая: {ex['ru']} — {len(kg)} весов на {it.get('sets', 3)} подхода")
        ranks.append(ROLE_RANK.get(ex["role"], 2))
        if s.get("kg") and kg:
            top_plan, top_sug = max(kg), max(s["kg"])
            step_kg = st.units.to_kg(st.units.step(ex)) if st.units.lb else st.units.step(ex)
            if top_plan > top_sug + 0.6 * step_kg and it["id"] not in overrides:
                errors.append(f"силовая: {ex['ru']} {top_plan} кг выше расчёта {top_sug} кг ({s['action']}: {s['why']})")
            elif top_plan < top_sug - 1.6 * step_kg and it["id"] not in overrides:
                warns.append(f"силовая: {ex['ru']} {top_plan} кг заметно ниже расчёта {top_sug} кг — объясни в overrides")
        partner = ex.get("superset")
        if partner and any(x["id"] == partner for x in sl):
            j = next(i for i, x in enumerate(sl) if x["id"] == partner)
            if abs(j - k) != 1:
                warns.append(f"силовая: суперсет {ex['ru']} + {st.cat.strength[partner]['ru']} разнесён")
    if ranks != sorted(ranks):
        warns.append("силовая: порядок не «базовые → изоляция → плечи»")

    # III
    cf = plan.get("crossfit") or {}
    ci = cf.get("items", [])
    if cf.get("format") != "skip" and not 3 <= len(ci) <= 6:
        errors.append(f"кроссфит: {len(ci)} движений, у тренера 3–6")
    prim = set(st.cat.days.get(day, {}).get("primary_patterns", []))
    rec, usage, _ = crossfit_recent(st)
    dose = crossfit_dose(st)
    overlap, caution = [], 0
    for it in ci:
        base = st.cat.cross.get(it["id"])
        if not base:
            custom_ok(it, "кроссфит")
            continue
        if base.get("status") == "retired":
            errors.append(f"кроссфит: {base['ru']} — снято ({base.get('note_ru', '')})")
        if "hinge" in base.get("pattern", []):
            errors.append(f"кроссфит: {base['ru']} — наклон с весом, для поясницы не даём")
        if set(base.get("pattern", [])) & prim:
            overlap.append(base["ru"])
        if base.get("back") == "caution":
            caution += 1
        if set(base.get("avoid_if", [])) & sore:
            errors.append(f"кроссфит: {base['ru']} — болит {', '.join(JOINTS.get(j, j) for j in sorted(set(base['avoid_if']) & sore))}")
        if st.equipment.get(base.get("equipment", "none")) == "missing":
            errors.append(f"кроссфит: {base['ru']} — в зале нет ({base.get('equipment')})")
        kg = it.get("kg")
        if kg is not None and base.get("max_kg") is not None and kg > base["max_kg"]:
            errors.append(f"кроссфит: {base['ru']} {kg} кг — потолок {base['max_kg']} кг")
        if usage.get(it["id"], 0) == 0:
            warns.append(f"кроссфит: {base['ru']} — у тренера не было ни разу")
        if not dose["known_only"] and len(rec) >= 2 and all(it["id"] in r["items"] for r in rec[-2:]):
            warns.append(f"кроссфит: {base['ru']} было в двух последних комбо подряд")
    if len(overlap) >= 3:
        errors.append(f"кроссфит: {len(overlap)} движения добивают мышцы дня ({', '.join(overlap)}) — не больше 2, лучше 1")
    if caution > 2:
        errors.append(f"кроссфит: {caution} движения с осторожностью для поясницы — максимум 2")
    if "lower_back" in sore and caution:
        errors.append("кроссфит: поясница жалуется — без движений с пометкой caution")
    ids = sorted(x["id"] for x in ci)
    for r in rec[-3:]:
        if sorted(r["items"]) == ids:
            warns.append(f"кроссфит: тот же набор, что {ddmm(r['date'])}")
    est, cap = est_seconds(st, cf), cf.get("cap_min")
    if cap and est > cap * 60 * 1.15:
        warns.append(f"кроссфит: по прикидке ≈{round(est / 60)}′ при cap {cap}′ — убавь повторы или раунды")
    if cf.get("format") == "rounds" and cf.get("rounds", 3) > dose["rounds"]:
        warns.append(f"кроссфит: {cf.get('rounds')} раундов, движок даёт {dose['rounds']} (пауза/самочувствие/время)")
    if day in DAYS:   # the same exercises three sessions running: the trainer rotated a slot
        t_date, t_ids = template_for(st, day)
        streak = 0
        for s in reversed(st.sessions):
            if st.session_day(s) != day or not s["strength"]:
                continue
            if {st.cat.s_row.get(norm(i["name"])) for i in s["strength"]} - {None} == set(t_ids):
                streak += 1
            else:
                break
        if streak >= 3 and {x["id"] for x in sl} == set(t_ids):
            warns.append(f"силовая: тот же набор {streak} тренировки подряд — поменяй одно изолирующее из пула")
    session = session_minutes(st, plan)
    if st.time_min and session > st.time_min:
        warns.append(f"вся тренировка ≈{session}′ при {st.time_min}′ — убери упражнение или раунд")

    # a warning justified in overrides (by item id, or by section: warmup / strength / crossfit) is accepted
    sections = {"разминка": "warmup", "силовая": "strength", "кроссфит": "crossfit"}
    def ru_of(k):
        return (st.cat.strength.get(k) or st.cat.cross.get(k) or st.cat.warm.get(k) or {}).get("ru")

    accepted = []
    for w in list(warns):
        sec = sections.get(w.split(":")[0])
        hit = next((k for k in overrides if k == sec or (ru_of(k) and ru_of(k) in w)), None)
        if hit:
            warns.remove(w)
            accepted.append(f"{w} — {overrides[hit]}")
    res = {"ok": not errors, "errors": errors, "warnings": warns, "accepted": accepted,
           "estimate": {"session_min": session, "crossfit_min": round(est_seconds(st, cf) / 60, 1),
                        "cap_min": cf.get("cap_min")}}
    out(res)
    sys.exit(0 if not errors else 1)


# ---------------------------------------------------------------- feedback / gym
def cmd_feedback(a):
    d = parse_date(a.date) or die(f"bad date {a.date!r}")
    try:
        fb = json.load(sys.stdin)
    except json.JSONDecodeError as e:
        die(f"bad stdin JSON: {e}")
    for k, v in (fb.get("items") or {}).items():
        if (v or {}).get("rating") not in RATINGS:
            die(f"item {k}: rating must be one of {RATINGS}")
        if (v or {}).get("joint") and v["joint"] not in JOINTS:
            die(f"item {k}: joint must be one of {tuple(JOINTS)}")
    path = os.path.join(PLANS_D, f"{d.isoformat()}.json")
    plan = load_json(path, {"date": d.isoformat()})
    old = plan.get("feedback") or {}
    merged = {**old, **{k: v for k, v in fb.items() if k not in ("items", "actual")}}
    merged["items"] = {**(old.get("items") or {}), **(fb.get("items") or {})}
    merged["actual"] = {**(old.get("actual") or {}), **(fb.get("actual") or {})}
    merged["recorded_at"] = datetime.now().isoformat(timespec="seconds")
    plan["feedback"] = merged
    save_json(path, plan)
    g = load_json(GYM_F)
    cfg = g["gyms"][g["current"]]
    gym_updates = []
    if cfg.get("since") and parse_date(cfg["since"]) <= d:   # he trained on it, so this gym has it
        m = cfg.setdefault("machines", {})
        for ex_id, it in merged["items"].items():
            if ex_id in Catalog(load_json(CATALOG_F)).strength and it.get("rating") != "skipped" \
                    and m.get(ex_id) in (None, "unknown", "unlikely", "likely"):
                m[ex_id] = "have"
                gym_updates.append(ex_id)
        for ex_id in merged["actual"]:
            if m.get(ex_id) in (None, "unknown", "unlikely", "likely") and ex_id not in gym_updates:
                m[ex_id] = "have"
                gym_updates.append(ex_id)
        if gym_updates:
            save_json(GYM_F, g)
    st = State(d + timedelta(days=1))
    nxt = {}
    for ex_id in list(merged["items"]) + list(merged["actual"]):
        ex = st.cat.strength.get(ex_id)
        if not ex or ex_id in nxt:
            continue
        s = suggest(st, ex)
        nxt[ex_id] = {k: v for k, v in {"ru": ex["ru"], "action": s.get("action"), "lb": s.get("lb") if st.units.lb else None,
                                         "kg": s.get("kg"), "why": s.get("why")}.items() if v is not None}
    out({"ok": True, "saved": os.path.relpath(path, REPO), "next_time": nxt, "gym_now_have": gym_updates})


def cmd_gym(a):
    g = load_json(GYM_F)
    cfg = g["gyms"][g["current"]]
    cat = Catalog(load_json(CATALOG_F))
    m = cfg.setdefault("machines", {})
    subs = cfg.setdefault("substitutions", {})
    eq = cfg.setdefault("equipment", {})
    for i in a.have or []:
        if i not in cat.strength:
            die(f"unknown exercise id {i!r}")
        m[i] = "have"
        subs.pop(i, None)
    for i in a.missing or []:
        if i not in cat.strength:
            die(f"unknown exercise id {i!r}")
        m[i] = "missing"
    for u in a.use or []:
        i, _, alt = u.partition("=")
        if i not in cat.strength or alt not in cat.strength:
            die(f"--use needs id=alt with catalog ids, got {u!r}")
        subs[i] = alt
    for e in a.equip or []:
        k, _, v = e.partition("=")
        if v not in ("have", "missing", "seen", "likely", "unknown"):
            die(f"--equip needs key=have|missing|seen|likely|unknown, got {e!r}")
        eq[k] = v
    save_json(GYM_F, g)
    out({"gym": cfg["name"], "machines": m, "substitutions": subs, "equipment": eq})


# ---------------------------------------------------------------- history I/O
def cmd_ingest(a):
    """One session in gym-log's `log` payload shape (strength, Warm-up and
    Crossfit entries in one list, plus the warmup / crossfit summary objects)."""
    try:
        p = json.load(sys.stdin)
    except json.JSONDecodeError as e:
        die(f"bad stdin JSON: {e}")
    d = parse_date(p.get("date")) or die("payload.date missing")
    hist = load_json(HISTORY_F, {"sessions": []})
    by = {s["date"]: s for s in hist.get("sessions", [])}
    s = by.get(d.isoformat(), empty_session(d))
    s.setdefault("crossfit", {"items": []})
    if p.get("my_weight") is not None:
        s["body_weight"] = p["my_weight"]

    def item(e):
        return {"name": e["exercise"], "sets": e.get("sets"), "reps": cell_str(e.get("reps")),
                "w_start": e.get("w_start"), "w_end": e.get("w_end")}

    if p.get("entries") is not None:
        groups = {"strength": [], "warmup": [], "crossfit": []}
        for e in p["entries"]:
            groups[section_of(e.get("category"))].append(e)
        if groups["strength"]:
            s["strength"] = [{**item(e), "category": e.get("category")} for e in groups["strength"]]
        if groups["warmup"]:
            s["warmup"] = [item(e) for e in groups["warmup"]]
        if groups["crossfit"]:
            s["crossfit"]["items"] = [item(e) for e in groups["crossfit"]]
    wu, cf = p.get("warmup"), p.get("crossfit")
    if isinstance(wu, dict) and wu.get("combination"):
        s["warmup_summary"] = wu["combination"]
    if isinstance(cf, dict):
        for k_in, k_out in (("combination", "summary"), ("rounds", "rounds"), ("cap", "cap"), ("finish", "finish")):
            if cf.get(k_in) not in (None, ""):
                s["crossfit"][k_out] = cell_str(cf[k_in])
    upsert(hist, [s], hist.get("source", "ingest"))
    save_json(HISTORY_F, hist)
    out({"ok": True, "date": s["date"], "strength": len(s["strength"]), "warmup": len(s["warmup"]),
         "crossfit": len(s["crossfit"].get("items", [])), "sessions": len(hist["sessions"])})


def cmd_import_grid(a):
    grid = stitch(a.files)
    sess = grid_to_sessions(grid)
    if not sess:
        die("no date blocks found in the grid (row 1 must carry the dates; include columns A:B)")
    seen, cat = set(), None
    for row in grid[3:]:
        if row and cell_str(row[0]):
            cat = cell_str(row[0])
        if cat and len(row) > 1 and cell_str(row[1]):
            seen.add(section_of(cat))
    hist = load_json(HISTORY_F, {"sessions": []})
    if not a.replace:   # merge only the sections this grid covers
        old = {s["date"]: s for s in hist.get("sessions", [])}
        for s in sess:
            o = old.get(s["date"])
            if not o:
                continue
            for sec in ("strength", "warmup", "crossfit"):
                if sec not in seen:
                    s[sec] = o.get(sec, s[sec])
            if "warmup" not in seen and o.get("warmup_summary"):
                s["warmup_summary"] = o["warmup_summary"]
            if s.get("body_weight") is None:
                s["body_weight"] = o.get("body_weight")
    upsert(hist, sess, "My training sheet (connector grid)", replace=a.replace)
    save_json(HISTORY_F, hist)
    out({"ok": True, "imported": [s["date"] for s in sess], "sessions": len(hist["sessions"])})


def cmd_sync(a):
    gym_dir = os.path.join(REPO, "automations", "gym-log")
    if not os.environ.get("GYM_SHEET_ID"):
        cfg = open(os.path.join(gym_dir, "config.sh"), encoding="utf-8").read()
        m = re.search(r'GYM_SHEET_ID="([^"]+)"', cfg)
        os.environ["GYM_SHEET_ID"] = m.group(1) if m else ""
    os.environ.setdefault("GSHEETS_TOKEN", os.path.join(REPO, "automations", "gsheets", ".work", "token.json"))
    sys.path.insert(0, gym_dir)
    import gym_sheet  # noqa: E402  (exits 3 itself on a credential problem)
    grid = gym_sheet.Model(gym_sheet._service()).grid
    sess = grid_to_sessions(grid)
    hist = upsert({"sessions": []}, sess, f"My training sheet {os.environ['GYM_SHEET_ID']} (token)", replace=True)
    save_json(HISTORY_F, hist)
    out({"ok": True, "sessions": len(sess), "last": sess[-1]["date"] if sess else None})


def cmd_lb(a):
    gym = load_json(GYM_F)["gyms"]["us"]
    kg = float(a.kg)
    if a.load in ("kb", "ball", "plate", "db_each", "db_single", "db_pair_total", "bar"):
        kt, lt = implement(kg, a.load, gym)
        out({"kg": kg, "pick": lt, "kg_actual": kt})
    else:
        out({"kg": kg, "lb": Units(gym).from_kg(kg), "exact_lb": round(kg * KG_LB, 1)})


# ---------------------------------------------------------------- backtest
def cmd_backtest(a):
    hist = load_json(HISTORY_F)
    frm = parse_date(a.frm) if a.frm else date(2026, 9, 21)
    to = parse_date(a.to) if a.to else date.today()
    rows, day_hits, day_total = [], 0, 0
    for s in hist["sessions"]:
        d = parse_date(s["date"])
        if not (frm <= d <= to) or not s["strength"]:
            continue
        st = State(d, gym_key="kyiv", use_plans=False)
        st.gym_since = None
        actual_day = st.session_day(s)
        day_total += 1
        day_hits += st.rotation()["next"] == actual_day
        for it in s["strength"]:
            ex_id = st.cat.s_row.get(norm(it["name"]))
            if not ex_id:
                continue
            ex = st.cat.strength[ex_id]
            sg = suggest(st, ex)
            if not sg.get("kg"):
                continue
            act = Occ(d, it)
            step = ex.get("kyiv_step_kg", 2.5)
            dtop = round(act.we - max(sg["kg"]), 1)
            rows.append({"date": ddmm(d), "ex": ex["ru"], "action": sg["action"], "sug": fmt_w(sg["kg"]),
                         "act": f"{clean_num(act.ws)}→{clean_num(act.we)}", "d_top": dtop,
                         "top_within_step": abs(dtop) <= step + 0.01, "top_exact": abs(dtop) < 0.01})
    summary = {"sessions": day_total, "day_rotation_hits": day_hits, "exercises": len(rows),
               "top_exact": sum(r["top_exact"] for r in rows),
               "top_within_one_step": sum(r["top_within_step"] for r in rows),
               "engine_heavier": sum(1 for r in rows if r["d_top"] < -0.01),
               "engine_lighter": sum(1 for r in rows if r["d_top"] > 0.01)}
    res = {"summary": summary, "by_action": dict(Counter(r["action"] for r in rows))}
    res["rows" if a.verbose else "misses"] = rows if a.verbose else [r for r in rows if not r["top_within_step"]]
    out(res)


# ---------------------------------------------------------------- main
def main():
    p = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("sync")
    g = sub.add_parser("import-grid")
    g.add_argument("files", nargs="+")
    g.add_argument("--replace", action="store_true")
    sub.add_parser("ingest")
    b = sub.add_parser("brief")
    b.add_argument("--today")
    b.add_argument("--day", choices=DAYS)
    b.add_argument("--pain", default="")
    b.add_argument("--readiness", default="normal", choices=("low", "normal", "high"))
    b.add_argument("--time", type=int)
    b.add_argument("--missing", default="")
    b.add_argument("--ok", default="", help="joints that hurt recently and are fine today")
    r = sub.add_parser("render")
    r.add_argument("plan")
    r.add_argument("--fmt", default="md", choices=("md", "text"))
    r.add_argument("--save", action="store_true")
    r.add_argument("--only", choices=("warmup", "strength", "crossfit"))
    c = sub.add_parser("check")
    c.add_argument("plan")
    f = sub.add_parser("feedback")
    f.add_argument("date")
    gy = sub.add_parser("gym")
    gy.add_argument("--have", nargs="*")
    gy.add_argument("--missing", nargs="*")
    gy.add_argument("--use", nargs="*")
    gy.add_argument("--equip", nargs="*")
    lb = sub.add_parser("lb")
    lb.add_argument("kg")
    lb.add_argument("--load", default="stack")
    bt = sub.add_parser("backtest")
    bt.add_argument("--from", dest="frm")
    bt.add_argument("--to")
    bt.add_argument("--verbose", action="store_true")
    a = p.parse_args()
    {"sync": cmd_sync, "import-grid": cmd_import_grid, "ingest": cmd_ingest, "brief": cmd_brief,
     "render": cmd_render, "check": cmd_check, "feedback": cmd_feedback, "gym": cmd_gym, "lb": cmd_lb,
     "backtest": cmd_backtest}[a.cmd](a)


if __name__ == "__main__":
    main()
