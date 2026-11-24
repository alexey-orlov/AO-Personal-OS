#!/usr/bin/env python3
"""trainer.py — the deterministic half of the personal-trainer skill.

The skill (.claude/skills/personal-trainer/) makes the judgment calls: which
exercises, which warm-up rung, which crossfit combo, how to read Alex's
feedback. This file does what must not drift between runs: reading the
history, the pause, the day rotation, the weight for every exercise under the
trainer's slow progression, kg <-> lb for the gym Alex is in, the notebook
format, and a lint of the finished plan.

Data (all committed, so every device and the cloud see the same state):
  catalog.json            exercises, warm-up rungs, crossfit movements, never-list
  gym.json                current gym, its units and weight steps
  data/history.json       normalized snapshot of the "My training" sheet
  outputs/personal-trainer/plans/<date>.json   issued plans + Alex's feedback

Commands (JSON on stdout unless noted):
  sync                    rebuild data/history.json from the sheet with the Sheets
                          token (source automations/gym-log/config.sh first)
  import-grid FILE...     upsert sessions from values grids saved from the Sheets
                          connector ({"range": "Sheet1!A1:DJ73", "values": [...]});
                          several files are stitched by their start column
                          (always include columns A:B for the names)
  ingest < payload.json   upsert one session in gym-log payload shape
  brief [--today D] [--day legs|push|pull] [--pain a,b] [--readiness low|normal]
        [--time MIN]      everything a plan needs, for the skill to compose from
  render PLAN [--fmt md|text] [--save]   plan in the trainer's notebook format
  check PLAN              lint against the methodology; exit 1 on errors
  feedback DATE < fb.json merge Alex's feedback into plans/DATE.json
  lb KG [--load stack|plates|smith|db_each|cable|kb|ball|bar|plate]
  backtest [--from D] [--to D] [--verbose]   engine vs the trainer's real choices

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
from datetime import date, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
CATALOG_F = os.path.join(HERE, "catalog.json")
GYM_F = os.environ.get("TRAINER_GYM") or os.path.join(HERE, "gym.json")
# Tests point these at fixtures so a scenario never touches the real state.
HISTORY_F = os.environ.get("TRAINER_HISTORY") or os.path.join(HERE, "data", "history.json")
PLANS_D = os.environ.get("TRAINER_PLANS") or os.path.join(REPO, "outputs", "personal-trainer", "plans")
KG_LB = 2.20462
DAYS = ("legs", "push", "pull")
ROLE_RANK = {"main": 0, "secondary": 1, "isolation": 2, "shoulder": 3}
RATINGS = ("easy", "ok", "hard", "fail", "pain")
CROSS_META = {"combination (crossfit)": "summary", "rounds": "rounds",
              "time cap / plan": "cap", "finish time": "finish"}


# ---------------------------------------------------------------- utilities
def die(msg, code=2):
    sys.stderr.write(f"[trainer] {msg}\n")
    sys.exit(code)


def out(obj):
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
        if a < b:
            return {"kind": "range", "vals": [a, b]}
        return {"kind": "per_set", "vals": [a, b]}
    if re.fullmatch(r"\d+(-\d+){2,}", s):
        return {"kind": "per_set", "vals": [int(x) for x in s.split("-")]}
    return {"kind": "text", "text": s}


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
        self.never = data.get("never", {}).get("items", [])

    def day_pool(self, day):
        return [e for e in self.strength.values() if day in e["day"] or "any" in e["day"]]


class Units:
    """Weights in the current gym's own units: kg (Kyiv) or lb (US)."""

    def __init__(self, gym_cfg):
        self.cfg = gym_cfg
        self.lb = gym_cfg.get("units") == "lb"
        self.round_lb = gym_cfg.get("round_lb", 5)

    def name(self):
        return "lb" if self.lb else "kg"

    def from_kg(self, kg):
        if kg is None:
            return None
        if self.lb:
            return self.round_lb * round(kg * KG_LB / self.round_lb)
        return round(kg * 2) / 2

    def floor_from_kg(self, kg):
        if self.lb:
            return self.round_lb * math.floor(kg * KG_LB / self.round_lb + 1e-9)
        return math.floor(kg * 2 + 1e-9) / 2

    def to_kg(self, u):
        return round(u / KG_LB, 1) if self.lb else round(u * 2) / 2

    def step(self, ex):
        if self.lb:
            return self.cfg.get("steps_lb", {}).get(ex.get("step_class", "stack"), 10)
        return ex.get("kyiv_step_kg", 2.5)

    def pair(self, vals):
        """gym-unit list -> {'kg': [...], 'lb': [...]}"""
        vals = [clean_num(v) for v in vals]
        if self.lb:
            return {"kg": [clean_num(self.to_kg(v)) for v in vals], "lb": vals}
        return {"kg": vals, "lb": [lb_round(v) for v in vals]}


def lb_round(kg, step=5):
    return int(step * round(kg * KG_LB / step)) if kg is not None else None


def lb_for_load(kg, load, gym_cfg):
    """Practical US equivalent of a free-weight load (what to pick up)."""
    if kg is None:
        return ""
    if load == "kb":
        lb = min(gym_cfg.get("kb_lb", [9, 13, 18, 26, 35, 44, 53, 62, 70]), key=lambda x: abs(x - kg * KG_LB))
        return f"{lb}-lb KB"
    if load == "ball":
        lb = min(gym_cfg.get("ball_lb", [10, 14, 20]), key=lambda x: abs(x - kg * KG_LB))
        return f"{lb}-lb ball"
    if load == "plate":
        lb = min(gym_cfg.get("plate_lb", [5, 10, 25, 35, 45]), key=lambda x: abs(x - kg * KG_LB))
        return f"{lb}-lb plate"
    if load == "db_each":
        return f"{lb_round(kg)}-lb DB each"
    if load == "db_pair_total":
        return f"2×{lb_round(kg / 2)}-lb DBs"
    if load == "bar":
        return f"{lb_round(kg)} lb incl. bar"
    return f"{lb_round(kg)} lb"


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
    """Several connector responses -> one grid, placed by each range's start column."""
    def col_index(letters):
        n = 0
        for ch in letters:
            n = n * 26 + (ord(ch.upper()) - 64)
        return n - 1

    grid = []
    for f in files:
        data = load_json(f)
        values = data.get("values", data if isinstance(data, list) else [])
        rng = data.get("range", "A1") if isinstance(data, dict) else "A1"
        m = re.search(r"!?\$?([A-Z]+)\$?(\d+)", rng.split("!")[-1])
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
        we = num(it.get("w_end"))
        ws = num(it.get("w_start"))
        self.we = we if we is not None else ws
        self.ws = ws if ws is not None else self.we
        self.name = it.get("name")

    def brief(self):
        return {"date": ddmm(self.date), "sets": self.sets, "reps": self.reps,
                "kg": [clean_num(self.ws), clean_num(self.we)]}


class State:
    def __init__(self, today, day=None, pain=(), readiness="normal", time_min=None,
                 gym_key=None, use_plans=True):
        self.cat = Catalog(load_json(CATALOG_F))
        gyms = load_json(GYM_F)
        self.gym_key = gym_key or gyms["current"]
        self.gym = gyms["gyms"][self.gym_key]
        self.units = Units(self.gym)
        self.gym_since = parse_date(self.gym.get("since")) if self.gym.get("since") else None
        self.today = today
        hist = load_json(HISTORY_F, {"sessions": []})
        self.sessions = [s for s in hist.get("sessions", []) if parse_date(s["date"]) < today]
        self.history_synced = hist.get("synced_at")
        self.plans = self._load_plans() if use_plans else {}
        self._merge_plans()
        self.pain = {p.strip() for p in pain if p.strip()}
        self.readiness = readiness
        self.time_min = time_min
        self.day = day

    def _merge_plans(self):
        """The sheet logs strength only, and a US session may never be photographed.
        A plan with feedback counts as done: its strength stands in until gym-log
        logs the real numbers (feedback 'actual' wins over the prescription), and
        its warm-up / crossfit are the only record of those parts."""
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
                    if not ex or not kg or (fb.get("items", {}).get(it["id"], {}).get("rating") == "skipped"):
                        continue
                    s["strength"].append({"name": ex["sheet_rows"][0], "category": None,
                                          "sets": a.get("sets", it.get("sets", 3)), "reps": str(a.get("reps", it.get("reps", ""))),
                                          "w_start": kg[0], "w_end": kg[-1]})
                self.sessions.append(s)
                by_date[s["date"]] = s
            if not s["warmup"] and p.get("warmup"):
                s["warmup"] = [{"id": w["id"], "sets": w.get("sets"), "reps": str(w.get("reps") or w.get("secs", "")),
                                "w_end": w.get("kg")} for w in p["warmup"]]
            if not (s.get("crossfit") or {}).get("items") and (p.get("crossfit") or {}).get("items"):
                cf = p["crossfit"]
                s["crossfit"] = {"rounds": str(cf.get("rounds", cf.get("scheme", ""))), "cap": cf.get("cap_min"),
                                 "finish": fb.get("crossfit_time"),
                                 "items": [{"id": i["id"], "reps": str(i.get("reps", "")), "w_end": i.get("kg")}
                                           for i in cf["items"]]}
        self.sessions.sort(key=lambda s: s["date"])

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

    def fb(self, d, ex_id):
        p = self.plans.get(d)
        items = ((p or {}).get("feedback") or {}).get("items") or {}
        r = (items.get(ex_id) or {}).get("rating")
        return r if r in RATINGS else None

    def session_day(self, s):
        votes = Counter()
        for it in s["strength"]:
            d = self.cat.cat_day.get(it.get("category", ""))
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

    # ------------------------------------------------------------ pause & rotation
    def pause(self):
        if not self.sessions:
            return {"last_session": None, "days_since": None, "class": "unknown", "ask": True}
        last = parse_date(self.sessions[-1]["date"])
        gap = (self.today - last).days
        cls = ("none" if gap < 8 else "short" if gap < 14 else "medium" if gap < 21
               else "long" if gap < 35 else "very_long" if gap < 56 else "restart")
        return {"last_session": last.isoformat(), "last_day": self.session_day(self.sessions[-1]),
                "days_since": gap, "class": cls, "deload_pct": round((1 - deload_factor(gap)) * 100),
                "ask": gap >= 10}

    def rotation(self):
        last = {d: None for d in DAYS}
        for s in self.sessions:
            t = self.session_day(s)
            if t in last:
                last[t] = s["date"]
        order = sorted(DAYS, key=lambda d: (last[d] or "0000", DAYS.index(d)))
        return {"last_by_day": last, "next": order[0], "rule": "least recently trained day first"}


def deload_factor(gap_days):
    """Working-weight cut after time away from a movement. Up to 5 weeks the
    trainer kept the top weight and only started lower (26-day break, 14.09:
    hack 85→120 vs 120 before, bench 80 as before); past that, cut."""
    if gap_days < 35:
        return 1.0
    if gap_days < 56:
        return 0.9
    if gap_days < 90:
        return 0.8
    return 0.7


CALIBRATION = 0.9   # first time on another gym's machine: start 10 % under (03.08 Smith: 50 was too heavy, dropped to 40)


def global_breaks(st):
    """Dates where training resumed after >= 14 days off (any day type)."""
    ds = [parse_date(s["date"]) for s in st.sessions]
    return [b for a, b in zip(ds, ds[1:]) if (b - a).days >= 14]


# ---------------------------------------------------------------- progression
def shape(ex, top, step, ramp_first=None):
    sets = ex.get("sets", 3)
    if ex["scheme"] == "pyramid":
        return [max(top - step * (sets - 1 - i), step) for i in range(sets)]
    first = top if ramp_first is None else ramp_first
    return [first] + [top] * (sets - 1)


def suggest(st, ex):
    """Next weights for one exercise, in the trainer's style:
    ramp in (1st set lighter) -> close the ramp -> reps to the top of the range ->
    hold the weight N sessions -> one step up on the 2nd and 3rd set. Pauses keep
    the weight and start lower; long pauses and a new gym cut it."""
    U = st.units
    lo, hi = ex["rep_range"]
    rep_txt = f"{lo}-{hi}" if lo != hi else str(hi)
    occ = st.occurrences(ex["id"])
    res = {"id": ex["id"], "ru": ex["ru"], "en": ex["en"], "role": ex["role"], "scheme": ex["scheme"],
           "sets": ex.get("sets", 3), "reps": rep_txt, "history": [o.brief() for o in occ[-3:]]}
    if ex.get("back") == "caution" and ex.get("back_cue_ru"):
        res["cue"] = ex["back_cue_ru"]
    hits = sorted(st.pain & set(ex.get("joints", [])))
    if hits:
        res.update(action="swap", why=f"сегодня болит: {', '.join(hits)} — заменить или убрать")
        return res
    if not occ:
        res.update(action="new", why="истории нет: 1-й подход лёгкий, рабочий вес — где 2 повтора в запасе")
        return res

    step = U.step(ex)
    pyramid = ex["scheme"] == "pyramid"
    caution = ex.get("back") == "caution"
    cur = [o for o in occ if not st.gym_since or o.date >= st.gym_since]
    last = (cur or occ)[-1]
    gap = (st.today - last.date).days
    # Strength fades with time off the MUSCLES, not off one machine: 07.10 the trainer
    # kept 70 on a chest press unused for 58 days because chest was trained weekly.
    f = deload_factor(st.group_gap(ex))
    if caution and gap >= 21:
        f = min(f, 0.9)   # lumbar-caution moves come back lighter (pullover 50 -> 36-45 on 21.09)
    fb = st.fb(last.date, ex["id"])
    if fb == "pain":
        res.update(action="swap", why=f"{ddmm(last.date)} было больно — заменить из пула дня")
        return res

    def ramp(top, first_steps=1):
        return shape(ex, top, step, None if pyramid else max(top - first_steps * step, step))

    def done(action, weights, why, reps=None):
        res.update(action=action, why=why, reps=reps or res["reps"], **U.pair(weights))
        if st.readiness == "low" and action in ("step_up", "close_ramp", "re_entry_up"):
            keep = shape(ex, U.from_kg(last.we), step, U.from_kg(last.ws) if U.from_kg(last.ws) < U.from_kg(last.we) else None)
            res.update(action="hold", why=why + "; самочувствие слабое — без прибавки", **U.pair(keep))
        return res

    # A. first time on this gym's machine: Kyiv numbers are only a starting point
    if not cur:
        top = U.floor_from_kg(last.we * f * CALIBRATION)
        cut = round((1 - f * CALIBRATION) * 100)
        why = (f"новый тренажёр: в Киеве {clean_num(last.we)} кг ({ddmm(last.date)}) → старт −{cut} %; "
               f"1-й подход — проба, если 2-й легко на {hi}+ — 3-й на шаг тяжелее")
        return done("calibrate", ramp(top, 2), why, str(lo) if gap >= 14 else rep_txt)

    W, F = U.from_kg(last.we), U.from_kg(last.ws)

    # B. back on this movement after 2+ weeks
    if gap >= 14:
        top = W if f == 1.0 else U.floor_from_kg(last.we * f)
        why = (f"{gap} дн. без упражнения: вес как {ddmm(last.date)}, 1-й подход легче, повторы по нижней границе"
               if f == 1.0 else f"{gap} дн. без упражнения: −{round((1 - f) * 100)} % от {clean_num(last.we)} кг")
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
    if marks and not caution:   # caution moves climb by the normal slow rule only
        mark = max(marks)
        since = [o for o in occ if o.date >= mark]
        before = [o for o in occ if o.date < mark]
        if before and len(since) <= 3:
            target = U.from_kg(before[-1].we)
            if W < target:
                jump = 2 if fb == "easy" and W + 2 * step <= target else 1
                nxt = min(W + jump * step, target)
                return done("re_entry_up", ramp(nxt) if not pyramid else shape(ex, nxt, step),
                            f"возврат к весу до перерыва ({clean_num(before[-1].we)} кг): +{jump} шаг")

    # E. normal slow progression
    need = max(1, ex.get("progress_n", 3) - (1 if fb == "easy" else 0))
    if pyramid:
        flat_n = 0
        for o in reversed(cur):
            if U.from_kg(o.we) != W:
                break
            flat_n += 1
        if flat_n >= need and not below_top:
            return done("step_up", shape(ex, W + step, step), f"верх {clean_num(last.we)} кг сделан → +1 шаг")
        return done("hold", shape(ex, W, step), f"верх {clean_num(last.we)} кг: {flat_n} из {need} до прибавки")
    if F < W:
        nf = min(W, F + step)
        return done("close_ramp", shape(ex, W, step, nf if nf < W else None),
                    "1-й подход подтягиваем к рабочему весу")
    if below_top:
        return done("add_reps", shape(ex, W, step), f"вес тот же, добрать до {hi} повторов", str(hi))
    flat_n = 0
    for o in reversed(cur):
        pr = parse_reps(o.reps)
        ok_reps = not (pr["kind"] == "single" and pr["vals"][0] < hi) and \
            not (pr["kind"] == "per_set" and min(pr["vals"]) < hi)
        if U.from_kg(o.we) == W and U.from_kg(o.ws) == W and ok_reps:
            flat_n += 1
        else:
            break
    if flat_n >= need:
        return done("step_up", shape(ex, W + step, step, W),
                    f"{clean_num(last.we)} кг × {hi} — {flat_n} раза → +1 шаг на 2-м и 3-м подходе", rep_txt)
    return done("hold", shape(ex, W, step), f"{clean_num(last.we)} кг: {flat_n} из {need} ровных тренировок до прибавки")


# ---------------------------------------------------------------- warm-up / crossfit state
def warmup_state(st):
    fam_hist = {}
    recent = []
    unmapped = set()
    for s in st.sessions:
        ids = []
        for it in s["warmup"]:
            wid = it.get("id") or st.cat.w_row.get(norm(it.get("name")))
            if wid not in st.cat.warm:
                unmapped.add(it.get("name") or str(wid))
                continue
            w = st.cat.warm[wid]
            lvl = w["level"]
            if w.get("loaded_level") and (num(it.get("w_end")) or 0) >= w["loaded_level"]["load_kg"]:
                lvl = w["loaded_level"]["level"]
            fam_hist.setdefault(w["family"], []).append((s["date"], wid, lvl, it.get("reps")))
            ids.append(wid + ("+kg" if lvl != w["level"] else ""))
        if ids:
            recent.append({"date": ddmm(s["date"]), "day": st.session_day(s), "items": ids})
    gap = (st.today - parse_date(st.sessions[-1]["date"])).days if st.sessions else 99
    fams = {}
    for fam, h in sorted(fam_hist.items()):
        _, wid, lvl, reps = h[-1]
        n = 0
        for _, _, l2, _ in reversed(h):
            if l2 == lvl:
                n += 1
            else:
                break
        rungs = sorted({(e["level"], e["id"]) for e in st.cat.warm.values() if e["family"] == fam})
        if any(e.get("loaded_level") for e in st.cat.warm.values() if e["family"] == fam):
            rungs = sorted(set(rungs) | {(e["loaded_level"]["level"], e["id"] + "+kg")
                                         for e in st.cat.warm.values() if e["family"] == fam and e.get("loaded_level")})
        hint = "hold"
        loaded = bool(st.cat.warm[wid].get("load_kg")) or lvl != st.cat.warm[wid]["level"]
        if gap >= 21 and loaded:
            hint = "step_down_after_pause"
        elif n >= 6 and any(r[0] > lvl for r in rungs) and "lower_back" not in st.pain:
            hint = "may_advance"
        fams[fam] = {"current": wid + ("+kg" if lvl != st.cat.warm[wid]["level"] else ""), "level": lvl,
                     "uses_at_level": n, "last_used": ddmm(h[-1][0]), "last_dose": reps,
                     "rungs": [r[1] for r in rungs], "hint": hint}
    return {"families": fams, "recent": recent[-6:], "unmapped": sorted(unmapped)}


def crossfit_state(st):
    recent, usage = [], Counter()
    for s in st.sessions:
        cf = s.get("crossfit") or {}
        items = []
        for it in cf.get("items", []):
            cid = it.get("id") or st.cat.c_row.get(norm(it.get("name")), "?" + str(it.get("name")))
            load = it.get("w_end")
            items.append(cid + (f" {it.get('reps')}" if it.get("reps") else "") + (f" ({load} кг)" if load else ""))
            usage[cid] += 1
        if items:
            recent.append({"date": ddmm(s["date"]), "day": st.session_day(s), "rounds": cf.get("rounds"),
                           "cap": cf.get("cap"), "finish": cf.get("finish"), "items": items})
    last10 = Counter()
    for r in recent[-10:]:
        for i in r["items"]:
            last10[i.split(" ")[0]] += 1
    return {"recent": recent[-6:], "usage_last10": dict(last10.most_common()), "all_time": dict(usage.most_common())}


# ---------------------------------------------------------------- brief
def template_for(st, day):
    for s in reversed(st.sessions):
        if st.session_day(s) == day and s["strength"]:
            ids = []
            for it in s["strength"]:
                i = st.cat.s_row.get(norm(it["name"]))
                if i and i not in ids:
                    ids.append(i)
            return s["date"], ids
    return None, [e["id"] for e in st.cat.day_pool(day) if e.get("status") == "active"]


def cmd_brief(a):
    today = parse_date(a.today) if a.today else date.today()
    st = State(today, a.day, (a.pain or "").split(","), a.readiness, a.time)
    if not st.sessions:
        die("history is empty: run `sync` or `import-grid` first")
    rot = st.rotation()
    day = a.day or rot["next"]
    t_date, t_ids = template_for(st, day)
    items = sorted((st.cat.strength[i] for i in t_ids), key=lambda e: e["order"])
    strength = [suggest(st, e) for e in items]
    used = set(t_ids)
    pool = []
    for e in sorted(st.cat.day_pool(day), key=lambda e: e["order"]):
        if e["id"] in used:
            continue
        occ = st.occurrences(e["id"])
        pool.append({"id": e["id"], "ru": e["ru"], "en": e["en"], "role": e["role"], "status": e.get("status"),
                     "last_used": ddmm(occ[-1].date) if occ else None, "uses": len(occ),
                     "suggest": suggest(st, e) if e.get("status") != "retired" else None})
    bw = next((s["body_weight"] for s in reversed(st.sessions) if s.get("body_weight")), None)
    brief = {
        "today": today.isoformat(), "gym": {"key": st.gym_key, "name": st.gym["name"], "units": st.units.name(),
                                            "since": st.gym.get("since"),
                                            "first_session_here": bool(st.gym_since) and not any(
                                                parse_date(s["date"]) >= st.gym_since for s in st.sessions)},
        "pause": st.pause(), "rotation": rot, "day": day, "day_ru": st.cat.days[day]["ru"],
        "body_weight_kg": bw, "pre": {"pain": sorted(st.pain), "readiness": st.readiness, "time_min": st.time_min},
        "strength": {"template_from": t_date, "items": strength, "pool": pool},
        "warmup": warmup_state(st), "crossfit": crossfit_state(st),
        "day_primary_patterns": st.cat.days[day]["primary_patterns"],
        "history_synced_at": st.history_synced,
    }
    out(brief)


# ---------------------------------------------------------------- render
SUP = "¹²³⁴⁵⁶⁷⁸⁹"


def fmt_w(vals):
    vals = [clean_num(v) for v in vals]
    if vals and len(set(vals)) == 1:
        return str(vals[0])
    return "/".join(str(v) for v in vals)


def short_en(en):
    return re.split(r"\s*[(,]", en or "")[0].strip()


def dose(it, base):
    sets = it.get("sets", base.get("sets", 2))
    if it.get("secs") or (base.get("secs") and not it.get("reps")):
        return f"{sets}×{it.get('secs', base.get('secs'))}″"
    return f"{sets}×{it.get('reps', base.get('reps'))}"


def render_plan(plan, fmt="md"):
    """The trainer's three-part page as three narrow tables (phone-first)."""
    st = State(parse_date(plan["date"]) or date.today(), use_plans=False)
    gym = st.gym
    md = fmt == "md"
    day = st.cat.days.get(plan["day"], {"ru": plan["day"], "en": ""})
    d = parse_date(plan["date"])
    notes = []

    def bold(s):
        return f"**{s}**" if md else s

    def name(ru, en, cue=None):
        mark = ""
        if cue:
            notes.append(cue)
            mark = SUP[len(notes) - 1]
        en = short_en(en)
        if not en or norm(en) == norm(ru):
            return f"{ru}{mark}"
        return f"{ru}{mark} · *{en}*" if md else f"{ru}{mark} / {en}"

    def table(head, rows):
        if md:
            res = ["| " + " | ".join(head) + " |", "|" + "|".join(["---"] * len(head)) + "|"]
            return res + ["| " + " | ".join(str(c).replace("|", "/") for c in r) + " |" for r in rows]
        return [" — ".join(str(c) for c in r if str(c) not in ("", "—")) for r in rows]

    lines = [bold(f"{d:%d.%m} · {day['ru']} / {day['en']}")]
    if plan.get("note"):
        lines.append(f"_{plan['note']}_" if md else plan["note"])

    rows = []
    for w in plan.get("warmup", []):
        base = st.cat.warm.get(w["id"], {"ru": w.get("ru", w["id"]), "en": w.get("en", ""), "sets": 2})
        ru, en, load = base["ru"], base["en"], base.get("load")
        kg = w.get("kg") if "kg" in w else (None if base.get("loaded_level") else base.get("load_kg"))
        if base.get("loaded_level") and w.get("kg"):
            lv = base["loaded_level"]
            ru, en, load = lv["ru"], lv["en"], lv.get("load", "plate")
        if kg:
            ru = re.sub(r"\s*\([^)]*кг\)", "", ru) + f" {clean_num(kg)} кг ({lb_for_load(kg, load, gym)})"
        rows.append([name(ru, en, w.get("cue")), dose(w, base)])
    lines += ["", bold("I. Разминка")] + table(["Упражнение", "×"], rows)

    rows = []
    items = plan.get("strength", [])
    for k, it in enumerate(items):
        ex = st.cat.strength.get(it["id"], {"ru": it.get("ru", it["id"]), "en": it.get("en", ""), "load": "stack"})
        joined = k > 0 and items[k - 1].get("superset_next")
        kg = it.get("kg") or []
        lb = it.get("lb") or [lb_round(v) for v in kg]
        kg_show = [round(v) for v in kg] if st.units.lb else kg   # in a lb gym kg is for reference only
        kg_s, lb_s = (fmt_w(kg_show), fmt_w(lb)) if kg else ("—", "—")
        if ex.get("load") == "db_each" and kg:
            kg_s, lb_s = f"2×{kg_s}", f"2×{lb_s}"
        rows.append([("+ " if joined else "") + name(ex["ru"], ex["en"], it.get("cue")), kg_s, lb_s,
                     f"{it.get('sets', 3)}×{it.get('reps', '10')}"])
    head = "II. Силовая" + (" · + суперсет" if any(i.get("superset_next") for i in items) else "")
    lines += ["", bold(head)] + table(["Упражнение", "кг", "lb", "×"], rows)

    cf = plan.get("crossfit") or {}
    kind = cf.get("format", "rounds")
    if kind == "skip":
        lines += ["", bold("III. Кроссфит — сегодня без него")]
    else:
        h = {"rounds": f"III. Кроссфит ×{cf.get('rounds', 3)}",
             "ladder": f"III. Кроссфит {cf.get('scheme', '21-15-9')}"}.get(kind, f"III. Кроссфит {cf.get('label', kind)}")
        if cf.get("cap_min"):
            h += f" · cap {cf['cap_min']}′"
        rows = []
        for it in cf.get("items", []):
            base = st.cat.cross.get(it["id"], {"ru": it.get("ru", it["id"]), "en": it.get("en", "")})
            kg = it.get("kg", base.get("load_kg"))
            ru = re.sub(r"\s*\([^)]*(кг|kg)\)", "", base["ru"])
            ru = re.sub(r"\s*\(.*?\)", "", ru) if "/" not in ru else ru.split(" / ")[0]
            if kg:
                ru += f" {clean_num(kg)} кг ({lb_for_load(kg, base.get('load'), gym)})"
            amount = it.get("reps", base.get("reps", ""))
            if it.get("secs") or (base.get("secs") and not it.get("reps")):
                amount = f"{it.get('secs', base.get('secs'))}″"
            unit = it.get("unit", base.get("unit", ""))
            rows.append([name(ru, base["en"], it.get("cue")), f"{amount}{(' ' + unit) if unit else ''}"])
        lines += ["", bold(h + " · на время")] + table(["Движение", "×"], rows)
    if cf.get("note"):
        lines.append(f"_{cf['note']}_" if md else cf["note"])
    if notes:
        lines += [""] + [f"{SUP[i]} {n}" for i, n in enumerate(notes)]
    if plan.get("why"):
        why = "Почему: " + "; ".join(plan["why"])
        lines += ["", f"_{why}_" if md else why]
    return "\n".join(lines)


def cmd_render(a):
    plan = load_json(a.plan)
    text = render_plan(plan, a.fmt)
    print(text)
    if a.save:
        path = os.path.join(PLANS_D, f"{parse_date(plan['date']).isoformat()}.json")
        old = load_json(path, {}) if os.path.exists(path) else {}
        if old.get("feedback"):
            plan["feedback"] = old["feedback"]
        plan["rendered"] = text
        save_json(path, plan)
        sys.stderr.write(f"[trainer] saved {os.path.relpath(path, REPO)}\n")


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
    st = State(d, plan.get("day"), pre.get("pain", []), pre.get("readiness", "normal"), pre.get("time_min"))
    errors, warns = [], []
    day = plan.get("day")
    if day not in DAYS:
        errors.append(f"day must be one of {DAYS}")
    overrides = plan.get("overrides") or {}

    def custom_ok(it, where):
        name = norm(it.get("ru", "") + " " + it.get("en", ""))
        if any(w in name for w in NEVER_WORDS):
            errors.append(f"{where}: «{it.get('ru') or it.get('en')}» — из списка «никогда» (нагрузка на поясницу)")
        elif not it.get("reason"):
            errors.append(f"{where}: «{it.get('id')}» нет в каталоге — нужно ru, en и reason")
        else:
            warns.append(f"{where}: новое упражнение «{it.get('ru')}» вне каталога — {it['reason']}")

    # warm-up
    wu = plan.get("warmup", [])
    if not 2 <= len(wu) <= 4:
        errors.append(f"разминка: {len(wu)} упражнений, у тренера 2–3")
    fams = []
    for w in wu:
        base = st.cat.warm.get(w["id"])
        if not base:
            custom_ok(w, "разминка")
            continue
        fams.append(base["family"])
        kg = w.get("kg") or 0
        if base["family"] == "E" and kg > 10:
            errors.append("разминка: экстензия тяжелее 10 кг — из списка «никогда»")
    if fams and not set(fams) & {"A", "B", "C"}:
        errors.append("разминка: нет стабилизации корпуса (Dog birds / планка / удержание резины)")
    if len(fams) != len(set(fams)):
        warns.append("разминка: два упражнения из одной семьи — тренер так не делал")

    # strength
    sl = plan.get("strength", [])
    if not 3 <= len(sl) <= 7:
        errors.append(f"силовая: {len(sl)} упражнений, у тренера 4–6")
    sug = {}
    for e in st.cat.day_pool(day) if day in DAYS else []:
        sug[e["id"]] = suggest(st, e)
    ranks = []
    for k, it in enumerate(sl):
        ex = st.cat.strength.get(it["id"])
        if not ex:
            custom_ok(it, "силовая")
            continue
        if day in DAYS and day not in ex["day"] and "any" not in ex["day"]:
            (warns if it["id"] in overrides else errors).append(
                f"силовая: {ex['ru']} — не из пула дня «{day}»")
        if ex.get("status") == "retired" and it["id"] not in overrides:
            errors.append(f"силовая: {ex['ru']} снято тренером ({ex.get('note_ru', '')})")
        hit = st.pain & set(ex.get("joints", []))
        if hit and it["id"] not in overrides:
            errors.append(f"силовая: {ex['ru']} нагружает {', '.join(sorted(hit))}, а сегодня там болит")
        kg = it.get("kg") or []
        if len(kg) != it.get("sets", 3):
            errors.append(f"силовая: {ex['ru']} — {len(kg)} весов на {it.get('sets', 3)} подхода")
        ranks.append(ROLE_RANK.get(ex["role"], 2))
        s = sug.get(it["id"])
        if s and s.get("kg") and kg:
            top_plan, top_sug = max(kg), max(s["kg"])
            step_kg = st.units.to_kg(st.units.step(ex)) if st.units.lb else st.units.step(ex)
            if top_plan > top_sug + 0.6 * step_kg and it["id"] not in overrides:
                errors.append(f"силовая: {ex['ru']} {top_plan} кг выше расчёта {top_sug} кг "
                              f"({s['action']}: {s['why']}) — снизить или объяснить в overrides")
            elif top_plan < top_sug - 1.6 * step_kg and it["id"] not in overrides:
                warns.append(f"силовая: {ex['ru']} {top_plan} кг заметно ниже расчёта {top_sug} кг — объясни в overrides")
        partner = ex.get("superset")
        if partner and any(x["id"] == partner for x in sl):
            j = next(i for i, x in enumerate(sl) if x["id"] == partner)
            if abs(j - k) != 1:
                warns.append(f"силовая: суперсет {ex['ru']} + {st.cat.strength[partner]['ru']} разнесён")
    if ranks != sorted(ranks):
        warns.append("силовая: порядок не «базовые → изоляция → плечи»")

    # crossfit
    cf = plan.get("crossfit") or {}
    ci = cf.get("items", [])
    if not 3 <= len(ci) <= 6 and cf.get("format") != "skip":
        errors.append(f"кроссфит: {len(ci)} движений, у тренера 3–6")
    prim = set(st.cat.days.get(day, {}).get("primary_patterns", []))
    overlap, caution = [], 0
    for it in ci:
        base = st.cat.cross.get(it["id"])
        if not base:
            custom_ok(it, "кроссфит")
            continue
        if base.get("status") == "retired":
            errors.append(f"кроссфит: {base['ru']} — {base.get('note_ru', 'снято')}")
        if set(base.get("pattern", [])) & prim:
            overlap.append(base["ru"])
        if base.get("back") == "caution":
            caution += 1
        if set(base.get("avoid_if", [])) & st.pain:
            errors.append(f"кроссфит: {base['ru']} — сегодня болит {', '.join(sorted(set(base['avoid_if']) & st.pain))}")
        kg = it.get("kg")
        if kg is not None and base.get("max_kg") is not None and kg > base["max_kg"]:
            errors.append(f"кроссфит: {base['ru']} {kg} кг — потолок {base['max_kg']} кг")
    if len(overlap) >= 3:
        errors.append(f"кроссфит: {len(overlap)} движения добивают мышцы дня ({', '.join(overlap)}) — максимум 1")
    elif len(overlap) == 2:
        warns.append(f"кроссфит: 2 движения на мышцы дня ({', '.join(overlap)}) — у тренера обычно 1")
    if caution > 2:
        errors.append(f"кроссфит: {caution} движения с осторожностью для поясницы — максимум 2")
    if "lower_back" in st.pain and caution:
        errors.append("кроссфит: сегодня болит поясница — без движений с пометкой caution")
    ids = sorted(x["id"] for x in ci)
    recent = [r for r in crossfit_state(st)["recent"][-3:]]
    for r in recent:
        if sorted(i.split(" ")[0] for i in r["items"]) == ids:
            warns.append(f"кроссфит: тот же набор, что {r['date']} — разнообразь")
    if day in DAYS:
        p = st.pause()
        if p.get("days_since") and p["days_since"] >= 21 and cf.get("format") == "rounds" and cf.get("rounds", 3) > 3:
            warns.append("кроссфит: после паузы 3+ недели — не больше 3 раундов")

    res = {"ok": not errors, "errors": errors, "warnings": warns}
    out(res)
    sys.exit(0 if not errors else 1)


# ---------------------------------------------------------------- feedback / ingest / sync
def cmd_feedback(a):
    d = parse_date(a.date) or die(f"bad date {a.date!r}")
    try:
        fb = json.load(sys.stdin)
    except json.JSONDecodeError as e:
        die(f"bad stdin JSON: {e}")
    for k, v in (fb.get("items") or {}).items():
        if (v or {}).get("rating") not in RATINGS:
            die(f"item {k}: rating must be one of {RATINGS}")
    path = os.path.join(PLANS_D, f"{d.isoformat()}.json")
    plan = load_json(path, {"date": d.isoformat()})
    old = plan.get("feedback") or {}
    items = {**(old.get("items") or {}), **(fb.get("items") or {})}
    plan["feedback"] = {**old, **{k: v for k, v in fb.items() if k != "items"}, "items": items,
                        "recorded_at": datetime.now().isoformat(timespec="seconds")}
    save_json(path, plan)
    out({"ok": True, "saved": os.path.relpath(path, REPO), "feedback": plan["feedback"]})


def cmd_ingest(a):
    try:
        p = json.load(sys.stdin)
    except json.JSONDecodeError as e:
        die(f"bad stdin JSON: {e}")
    d = parse_date(p.get("date")) or die("payload.date missing")
    hist = load_json(HISTORY_F, {"sessions": []})
    by = {s["date"]: s for s in hist.get("sessions", [])}
    s = by.get(d.isoformat(), empty_session(d))
    if p.get("my_weight") is not None:
        s["body_weight"] = p["my_weight"]
    if p.get("entries") is not None:
        s["strength"] = [{"name": e["exercise"], "category": e.get("category"), "sets": e.get("sets"),
                          "reps": cell_str(e.get("reps")), "w_start": e.get("w_start"), "w_end": e.get("w_end")}
                         for e in p["entries"]]
    if p.get("warmup") is not None:
        s["warmup"] = p["warmup"]
    if p.get("crossfit") is not None:
        s["crossfit"] = p["crossfit"]
    upsert(hist, [s], hist.get("source", "ingest"))
    save_json(HISTORY_F, hist)
    out({"ok": True, "date": s["date"], "sessions": len(hist["sessions"])})


def cmd_import_grid(a):
    grid = stitch(a.files)
    sess = grid_to_sessions(grid)
    if not sess:
        die("no date blocks found in the grid (row 1 must carry the dates; include columns A:B)")
    hist = load_json(HISTORY_F, {"sessions": []})
    upsert(hist, sess, "My training sheet (connector grid)", replace=a.replace)
    save_json(HISTORY_F, hist)
    out({"ok": True, "imported": [s["date"] for s in sess], "sessions": len(hist["sessions"])})


def cmd_sync(a):
    gym_dir = os.path.join(REPO, "automations", "gym-log")
    if not os.environ.get("GYM_SHEET_ID"):
        cfg = open(os.path.join(gym_dir, "config.sh"), encoding="utf-8").read()
        m = re.search(r'GYM_SHEET_ID="([^"]+)"', cfg)
        os.environ["GYM_SHEET_ID"] = m.group(1) if m else ""
    sys.path.insert(0, gym_dir)
    import gym_sheet  # noqa: E402  (exits 3 itself on a credential problem)
    svc = gym_sheet._service()
    grid = gym_sheet.Model(svc).grid
    sess = grid_to_sessions(grid)
    hist = upsert({"sessions": []}, sess, f"My training sheet {os.environ['GYM_SHEET_ID']} (token)", replace=True)
    save_json(HISTORY_F, hist)
    out({"ok": True, "sessions": len(sess), "last": sess[-1]["date"] if sess else None})


def cmd_lb(a):
    gym = load_json(GYM_F)["gyms"]["us"]
    kg = float(a.kg)
    if a.load in ("kb", "ball", "plate", "db_each", "db_pair_total", "bar"):
        out({"kg": kg, "lb": lb_for_load(kg, a.load, gym)})
    else:
        u = Units(gym)
        out({"kg": kg, "lb": u.from_kg(kg), "exact_lb": round(kg * KG_LB, 1)})


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
        actual_day = st.session_day(s)
        rot = st.rotation()
        day_total += 1
        day_hits += rot["next"] == actual_day
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
            dfirst = round(act.ws - sg["kg"][0], 1)
            rows.append({"date": ddmm(d), "ex": ex["ru"], "action": sg["action"], "sug": fmt_w(sg["kg"]),
                         "act": f"{clean_num(act.ws)}→{clean_num(act.we)}", "d_top": dtop, "d_first": dfirst,
                         "top_within_step": abs(dtop) <= step + 0.01, "top_exact": abs(dtop) < 0.01})
    n = len(rows)
    summary = {"sessions": day_total, "day_rotation_hits": day_hits, "exercises": n,
               "top_exact": sum(r["top_exact"] for r in rows),
               "top_within_one_step": sum(r["top_within_step"] for r in rows),
               "engine_heavier": sum(1 for r in rows if r["d_top"] < -0.01),
               "engine_lighter": sum(1 for r in rows if r["d_top"] > 0.01)}
    by_action = Counter(r["action"] for r in rows)
    res = {"summary": summary, "by_action": dict(by_action)}
    if a.verbose:
        res["rows"] = rows
    else:
        res["misses"] = [r for r in rows if not r["top_within_step"]]
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
    r = sub.add_parser("render")
    r.add_argument("plan")
    r.add_argument("--fmt", default="md", choices=("md", "text"))
    r.add_argument("--save", action="store_true")
    c = sub.add_parser("check")
    c.add_argument("plan")
    f = sub.add_parser("feedback")
    f.add_argument("date")
    lb = sub.add_parser("lb")
    lb.add_argument("kg")
    lb.add_argument("--load", default="stack")
    bt = sub.add_parser("backtest")
    bt.add_argument("--from", dest="frm")
    bt.add_argument("--to")
    bt.add_argument("--verbose", action="store_true")
    a = p.parse_args()
    {"sync": cmd_sync, "import-grid": cmd_import_grid, "ingest": cmd_ingest, "brief": cmd_brief,
     "render": cmd_render, "check": cmd_check, "feedback": cmd_feedback, "lb": cmd_lb,
     "backtest": cmd_backtest}[a.cmd](a)


if __name__ == "__main__":
    main()
