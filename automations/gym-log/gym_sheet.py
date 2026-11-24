#!/usr/bin/env python3
"""gym_sheet.py — read/write Alex's "My training" Google Sheet.

Layout contract (tab GYM_TAB, default "Sheet1"):
  Row 1: A1:A2 "Category" (merged), B1:B2 "Excercise" (merged), then one
         4-column block per training date: date in row 1 merged across the
         4 cols; row 2 = Sets | Reps per set | Weight (start) | Weight (end).
  Row 3: A3:B3 "My weight" (merged label); per block a merged 4-col cell
         with the body-weight measurement for that date.
  Row 4+: one exercise per row. Column A holds the category name on the
         first row of each category group (merged down when >1 row);
         column B the canonical exercise name. Same exercise = same row
         across all date blocks — that is the whole point of the sheet.
  Below the strength categories: "Warm-up" (notebook section I) and
         "Crossfit" (section III, with summary rows Combination / Rounds /
         Time cap / Finish time merged across each block). Same blocks,
         not strength work: see NON_STRENGTH.

Commands (JSON out on stdout):
  auth              interactive OAuth consent (opens browser once)
  dump              structure snapshot for the calling agent
  progress M/D/YYYY per-exercise deltas for that session vs the previous
                    occurrence and vs a ~3-month baseline (earliest entry in
                    the 90 days before the date) — feeds the Telegram digest
  log < payload     upsert one training session:
                    {"date": "7/22/2026",          # M/D/YYYY, US style
                     "my_weight": 73.6,            # optional
                     "entries": [{"category": "Back",
                                  "exercise": "Верт. тяга",
                                  "sets": 3, "reps": 10,
                                  "w_start": 52, "w_end": 62}, ...]}

`log` is an upsert: an existing date block / exercise row is reused, cells
are overwritten; missing block/row/category is created (block appended at
the right edge, exercise row at the end of its category group, category at
the bottom). Formats are cloned from the neighbouring block / row above, so
the template styling propagates without hand-tuning.

Exercise matching here is EXACT (normalized: casefold, collapsed spaces,
stripped trailing dots). Fuzzy "Жим лёжа" vs "Жим лежа руками" matching is
the calling agent's job — see .claude/skills/gym-log/references/exercises.md.

Env (set by config.sh): GYM_SHEET_ID, GYM_TAB, plus the shared Google Sheets
credential exported by automations/gsheets/config.sh — the GSHEETS_TOKEN file
on the Mac, or GSHEETS_TOKEN_JSON holding the same JSON inline (raw or
base64) where there is no .work/ (cloud sessions, CI, fresh clones). See
automations/gsheets/README.md. With neither googleapiclient nor google-auth
installed the file falls back to a stdlib REST client, so python3 alone is
enough; GYM_FORCE_REST=1 forces that path.
Exit codes: 0 ok, 2 bad input, 3 auth problem (re-run `gsheets.py auth` on
the Mac, then refresh every copy of GSHEETS_TOKEN_JSON).
"""
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

SHEET_ID = os.environ.get("GYM_SHEET_ID", "")
TAB = os.environ.get("GYM_TAB", "Sheet1")
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
API = "https://sheets.googleapis.com/v4/spreadsheets"

# The ONE Google Sheets credential, shared by every sheet consumer in the repo
# (automations/gsheets/README.md): loader + refresh live there, not here.
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "gsheets"))
import gsheets  # noqa: E402

FIRST_BLOCK_COL = 2   # zero-based index of column C
BLOCK_W = 4           # Sets | Reps per set | Weight start | Weight end
FIRST_DATA_ROW = 3    # zero-based index of row 4
SUB_HEADERS = ["Sets", "Reps per set", "Weight (start)", "Weight (end)"]
# Categories below the strength part: notebook section I (warm-up) and section
# III (crossfit). They share the date blocks but are not strength work, so
# `progress` skips them, exercise names match only inside their own section,
# and a new strength category is inserted above them instead of at the bottom.
NON_STRENGTH = {"warm-up", "crossfit"}


def _die(msg, code=2):
    sys.stderr.write(f"[gym_sheet] {msg}\n")
    print(json.dumps({"ok": False, "error": msg}, ensure_ascii=False))
    sys.exit(code)


def _norm(s):
    s = (s or "").strip().casefold().rstrip(".")
    return re.sub(r"\s+", " ", s)


def _section(category):
    """'warm-up' / 'crossfit' for the non-strength categories, else 'strength'."""
    n = _norm(category)
    return n if n in NON_STRENGTH else "strength"


# Summary rows of sections I and III: payload key -> row name (column B). Each
# is one merged cell per date block, written in the block's first column.
SUMMARY = {"warmup": ("Warm-up", {"combination": "Combination (warm-up)"}),
           "crossfit": ("Crossfit", {"combination": "Combination (crossfit)",
                                     "rounds": "Rounds", "cap": "Time cap / plan",
                                     "finish": "Finish time"})}


def _cell_value(v):
    """Value for a USER_ENTERED write. Values are written as typed, so text that
    starts like a number ("8-10", "10/10", '40"', "21-15-9") would turn into a
    date or a number: it gets a leading apostrophe. Plain numbers pass through."""
    if v is None:
        return ""
    if isinstance(v, (int, float)) or not isinstance(v, str):
        return v
    s = v.strip()
    if not s or s.startswith("'") or re.fullmatch(r"-?\d+(\.\d+)?", s):
        return s
    return "'" + s if s[0].isdigit() or s[0] in "+-=" else s


def _finish_value(v):
    """Crossfit finish time: "11:53" or the notebook's 11'53" -> a day fraction,
    shown as 11:53 by the row's [m]:ss format; anything else stays text."""
    m = re.fullmatch(r"\s*(\d{1,3})\s*[:'′]\s*(\d{1,2})\s*(\"|″|'')?\s*", str(v))
    if m:
        return round((int(m.group(1)) * 60 + int(m.group(2))) / 86400, 12)
    return v


def _col_letter(idx):
    out = ""
    idx += 1
    while idx:
        idx, r = divmod(idx - 1, 26)
        out = chr(65 + r) + out
    return out


# ---- credentials: gsheets.load_token / gsheets.fetch_access_token (shared) ----


# ---- transport ---------------------------------------------------------
# googleapiclient when it is installed (the Mac venvs have it), else a stdlib
# stand-in covering exactly the four call shapes this file uses — so a box
# with nothing but python3 can still log a session. GYM_FORCE_REST=1 picks
# the stdlib path everywhere, which is how the fallback stays exercised.

def _http(method, path, token, query=None, body=None):
    url = API + path + (("?" + urllib.parse.urlencode(query)) if query else "")
    payload = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=payload, method=method, headers={
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json; charset=utf-8"})
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            return json.loads(r.read().decode() or "{}")
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")[:400]
        _die(f"Sheets API {method} {path} → {e.code}: {body}",
             3 if e.code in (401, 403) else 2)
    except Exception as e:
        _die(f"Sheets API {method} {path} failed ({type(e).__name__}: {e})")


class _Call:
    """Deferred request — googleapiclient hands back an object you .execute()."""

    def __init__(self, *args):
        self.args = args

    def execute(self):
        return _http(*self.args)


class _RestValues:
    def __init__(self, token):
        self.token = token

    def get(self, spreadsheetId, range, **kw):
        query = {k: v for k, v in kw.items() if v is not None}
        path = f"/{spreadsheetId}/values/{urllib.parse.quote(range, safe='')}"
        return _Call("GET", path, self.token, query)

    def batchUpdate(self, spreadsheetId, body):
        return _Call("POST", f"/{spreadsheetId}/values:batchUpdate",
                     self.token, None, body)


class _RestSheets:
    def __init__(self, token):
        self.token = token

    def spreadsheets(self):
        return self

    def values(self):
        return _RestValues(self.token)

    def get(self, spreadsheetId, fields=None):
        return _Call("GET", f"/{spreadsheetId}", self.token,
                     {"fields": fields} if fields else None)

    def batchUpdate(self, spreadsheetId, body):
        return _Call("POST", f"/{spreadsheetId}:batchUpdate", self.token, None, body)


def _service():
    try:
        tok, src = gsheets.load_token()
    except gsheets.SheetsError as e:
        _die(str(e), e.code)
    if os.environ.get("GYM_FORCE_REST") != "1":
        try:
            from google.auth.transport.requests import Request
            from google.oauth2.credentials import Credentials
            from googleapiclient.discovery import build
        except ImportError:
            pass
        else:
            creds = Credentials.from_authorized_user_info(tok, SCOPES)
            try:
                if not creds.valid:
                    creds.refresh(Request())
                    if gsheets.is_file_source(src):  # refresh the file, never the env var
                        with open(src, "w") as f:
                            f.write(creds.to_json())
            except Exception as e:
                _die(f"token refresh failed ({e}); run `gsheets.py auth` on the Mac", 3)
            return build("sheets", "v4", credentials=creds, cache_discovery=False)
    try:
        return _RestSheets(gsheets.fetch_access_token(tok))
    except gsheets.SheetsError as e:
        _die(str(e), e.code)


def _auth():
    """Delegates to the shared consent flow: the token it writes is the one
    every Sheets consumer in the repo uses, not a gym-log copy."""
    try:
        print(json.dumps(gsheets.run_consent_flow(), ensure_ascii=False))
    except gsheets.SheetsError as e:
        _die(str(e), e.code)


class Model:
    """In-memory mirror of the sheet's layout, updated as edit requests are
    planned so later coordinates account for earlier row insertions."""

    def __init__(self, svc):
        self.svc = svc
        meta = svc.spreadsheets().get(
            spreadsheetId=SHEET_ID,
            fields="sheets(properties(sheetId,title,gridProperties),merges,"
                   "data(columnMetadata(pixelSize)))",
        ).execute()
        sheet = next((s for s in meta["sheets"] if s["properties"]["title"] == TAB), None)
        if sheet is None:
            _die(f"tab {TAB!r} not found")
        self.sheet_id = sheet["properties"]["sheetId"]
        self.n_cols = sheet["properties"]["gridProperties"]["columnCount"]
        self.merges = sheet.get("merges", [])
        self.col_px = [cm.get("pixelSize", 100)
                       for cm in sheet.get("data", [{}])[0].get("columnMetadata", [])]
        resp = svc.spreadsheets().values().get(
            spreadsheetId=SHEET_ID, range=f"'{TAB}'", majorDimension="ROWS",
            valueRenderOption="FORMATTED_VALUE",
        ).execute()
        self.grid = resp.get("values", [])
        self.requests = []       # structural/format requests, in execution order
        # {"r", "c", "vals"}; structural requests all run before any value write,
        # so a planned write moves down with every row inserted above it later
        # in the same call (see _insert_local_row) and lands in final coordinates
        self.value_writes = []
        self.created = {"blocks": [], "categories": [], "exercises": []}

    # ---- readers -------------------------------------------------------
    def _cell(self, r, c):
        row = self.grid[r] if r < len(self.grid) else []
        return row[c] if c < len(row) else ""

    def blocks(self):
        """[{date, col}] parsed from row 1, left to right."""
        out = []
        c = FIRST_BLOCK_COL
        while True:
            v = self._cell(0, c)
            if not v:
                break
            out.append({"date": v, "col": c})
            c += BLOCK_W
        return out

    def last_data_row(self):
        last = FIRST_DATA_ROW - 1
        for r in range(FIRST_DATA_ROW, len(self.grid)):
            if self._cell(r, 1):
                last = r
        return last

    def categories(self):
        """[{name, start, end}] from column A over the data rows."""
        cats, last = [], self.last_data_row()
        for r in range(FIRST_DATA_ROW, last + 1):
            a = self._cell(r, 0)
            if a:
                cats.append({"name": a, "start": r, "end": r})
            elif cats:
                cats[-1]["end"] = r
        return cats

    def exercise_row(self, name, section=None):
        """Row of `name`; with `section`, only inside that section's categories
        (a crossfit «Pull-ups» row must never take a strength entry)."""
        for c in self.categories():
            if section is not None and _section(c["name"]) != section:
                continue
            for r in range(c["start"], c["end"] + 1):
                if _norm(self._cell(r, 1)) == _norm(name):
                    return r
        return None

    def merge_at(self, r, c):
        for m in self.merges:
            if m["startRowIndex"] <= r < m["endRowIndex"] and m["startColumnIndex"] <= c < m["endColumnIndex"]:
                return m
        return None

    # ---- local-grid mutation helpers ----------------------------------
    def _set_local(self, r, c, v):
        while len(self.grid) <= r:
            self.grid.append([])
        row = self.grid[r]
        while len(row) <= c:
            row.append("")
        row[c] = v

    def _insert_local_row(self, r):
        self.grid.insert(r, [])
        for m in self.merges:
            if m["startRowIndex"] >= r:
                m["startRowIndex"] += 1
                m["endRowIndex"] += 1
            elif m["endRowIndex"] > r:  # insertion inside the merge
                m["endRowIndex"] += 1
        for w in self.value_writes:      # planned writes follow their row down
            if w["r"] >= r:
                w["r"] += 1

    # ---- edit planning -------------------------------------------------
    def _write(self, r, c, v):
        vals = [_cell_value(x) for x in (v if isinstance(v, list) else [v])]
        w = {"r": r, "c": c, "vals": vals}
        self.value_writes.append(w)
        for i, x in enumerate(vals):
            self._set_local(r, c + i, str(x).lstrip("'"))
        return w

    def _copy_fmt(self, r0, r1, c0, c1, dr0, dr1, dc0, dc1):
        self.requests.append({"copyPaste": {
            "source": {"sheetId": self.sheet_id, "startRowIndex": r0, "endRowIndex": r1,
                       "startColumnIndex": c0, "endColumnIndex": c1},
            "destination": {"sheetId": self.sheet_id, "startRowIndex": dr0, "endRowIndex": dr1,
                            "startColumnIndex": dc0, "endColumnIndex": dc1},
            "pasteType": "PASTE_FORMAT", "pasteOrientation": "NORMAL"}})

    def _merge(self, r0, r1, c0, c1):
        rng = {"sheetId": self.sheet_id, "startRowIndex": r0, "endRowIndex": r1,
               "startColumnIndex": c0, "endColumnIndex": c1}
        self.requests.append({"mergeCells": {"range": rng, "mergeType": "MERGE_ALL"}})
        self.merges.append({"startRowIndex": r0, "endRowIndex": r1,
                            "startColumnIndex": c0, "endColumnIndex": c1})

    def ensure_block(self, date):
        for b in self.blocks():
            if b["date"] == date:
                return b["col"]
        blocks = self.blocks()
        src = blocks[-1]["col"] if blocks else None
        col = (blocks[-1]["col"] + BLOCK_W) if blocks else FIRST_BLOCK_COL
        if col + BLOCK_W > self.n_cols:
            self.requests.append({"appendDimension": {
                "sheetId": self.sheet_id, "dimension": "COLUMNS", "length": BLOCK_W}})
            self.n_cols += BLOCK_W
        last = self.last_data_row()
        if src is not None:
            # clone header + weight-row + data-region formatting and widths
            self._copy_fmt(0, 3, src, src + BLOCK_W, 0, 3, col, col + BLOCK_W)
            if last >= FIRST_DATA_ROW:
                self._copy_fmt(FIRST_DATA_ROW, last + 1, src, src + BLOCK_W,
                               FIRST_DATA_ROW, last + 1, col, col + BLOCK_W)
            for i in range(BLOCK_W):
                if src + i < len(self.col_px):
                    self.requests.append({"updateDimensionProperties": {
                        "range": {"sheetId": self.sheet_id, "dimension": "COLUMNS",
                                  "startIndex": col + i, "endIndex": col + i + 1},
                        "properties": {"pixelSize": self.col_px[src + i]},
                        "fields": "pixelSize"}})
        self._merge(0, 1, col, col + BLOCK_W)      # date header
        self._merge(2, 3, col, col + BLOCK_W)      # my-weight cell
        self._write(0, col, date)
        self._write(1, col, SUB_HEADERS)
        self.created["blocks"].append(date)
        return col

    def ensure_exercise(self, category, exercise):
        r = self.exercise_row(exercise, _section(category))
        if r is not None:
            return r
        cats = self.categories()
        cat = next((c for c in cats if _norm(c["name"]) == _norm(category)), None)
        last = self.last_data_row()
        if cat is None:
            first_other = next((c for c in cats if _section(c["name"]) != "strength"), None)
            if _section(category) == "strength" and first_other is not None:
                # a new strength category goes above the warm-up / crossfit rows
                r = first_other["start"]
                self.requests.append({"insertDimension": {
                    "range": {"sheetId": self.sheet_id, "dimension": "ROWS",
                              "startIndex": r, "endIndex": r + 1},
                    "inheritFromBefore": True}})
                self._insert_local_row(r)
            else:
                r = last + 1
                if r > FIRST_DATA_ROW:  # clone row format from the row above
                    self._copy_fmt(r - 1, r, 0, self.n_cols, r, r + 1, 0, self.n_cols)
            self._write(r, 0, category)
            self._write(r, 1, exercise)
            self.created["categories"].append(category)
        else:
            r = cat["end"] + 1
            if r <= last:  # rows exist below -> make room, shifting them down
                self.requests.append({"insertDimension": {
                    "range": {"sheetId": self.sheet_id, "dimension": "ROWS",
                              "startIndex": r, "endIndex": r + 1},
                    "inheritFromBefore": True}})
                self._insert_local_row(r)
            else:
                self._copy_fmt(r - 1, r, 0, self.n_cols, r, r + 1, 0, self.n_cols)
            m = self.merge_at(cat["start"], 0)
            if m:
                if m["endRowIndex"] < r + 1:  # not auto-extended by the insert
                    self.requests.append({"unmergeCells": {"range": {
                        "sheetId": self.sheet_id,
                        "startRowIndex": m["startRowIndex"], "endRowIndex": m["endRowIndex"],
                        "startColumnIndex": 0, "endColumnIndex": 1}}})
                    self.merges.remove(m)
                    self._merge(cat["start"], r + 1, 0, 1)
            else:
                self._merge(cat["start"], r + 1, 0, 1)
            self._write(r, 1, exercise)
        self.created["exercises"].append(exercise)
        return r

    # ---- flush ---------------------------------------------------------
    def flush(self):
        if self.requests:
            self.svc.spreadsheets().batchUpdate(
                spreadsheetId=SHEET_ID, body={"requests": self.requests}).execute()
        if self.value_writes:
            data = []
            for w in self.value_writes:
                rng = f"'{TAB}'!{_col_letter(w['c'])}{w['r'] + 1}"
                if len(w["vals"]) > 1:
                    rng += f":{_col_letter(w['c'] + len(w['vals']) - 1)}{w['r'] + 1}"
                data.append({"range": rng, "values": [w["vals"]]})
            self.svc.spreadsheets().values().batchUpdate(
                spreadsheetId=SHEET_ID,
                body={"valueInputOption": "USER_ENTERED", "data": data},
            ).execute()


def cmd_dump():
    svc = _service()
    m = Model(svc)
    blocks = m.blocks()
    cats = []
    for c in m.categories():
        exercises = []
        for r in range(c["start"], c["end"] + 1):
            name = m._cell(r, 1)
            if not name:
                continue
            entries = {}
            for b in blocks:
                sets = m._cell(r, b["col"])
                if sets:
                    entries[b["date"]] = [m._cell(r, b["col"] + i) for i in range(BLOCK_W)]
            exercises.append({"row": r + 1, "name": name, "entries": entries})
        cats.append({"name": c["name"], "section": _section(c["name"]), "exercises": exercises})
    weights = {b["date"]: m._cell(2, b["col"]) for b in blocks if m._cell(2, b["col"])}
    print(json.dumps({"ok": True, "sheet": SHEET_ID, "tab": TAB,
                      "dates": [b["date"] for b in blocks],
                      "my_weights": weights, "categories": cats},
                     ensure_ascii=False, indent=1))


def _to_num(s):
    try:
        return float(str(s).replace(",", "."))
    except (TypeError, ValueError):
        return None


def _delta(today, then):
    if today is None or then is None or then == 0:
        return None
    kg = round(today - then, 1)
    return {"delta_kg": kg, "delta_pct": round(kg / then * 100, 1)}


def cmd_progress():
    from datetime import datetime, timedelta

    if len(sys.argv) < 3:
        _die("usage: gym_sheet.py progress M/D/YYYY")
    try:
        target = datetime.strptime(sys.argv[2], "%m/%d/%Y")
    except ValueError:
        _die(f"bad date {sys.argv[2]!r} (want M/D/YYYY)")
    horizon = target - timedelta(days=90)

    svc = _service()
    m = Model(svc)
    dated = []
    for b in m.blocks():
        try:
            dated.append({"dt": datetime.strptime(b["date"], "%m/%d/%Y"), **b})
        except ValueError:
            continue
    # Column order is not chronological (a backfilled date is appended at the
    # right edge, e.g. 7/29 after 8/3), and "previous" / "baseline" below
    # mean previous in time.
    dated.sort(key=lambda b: b["dt"])
    cur = next((b for b in dated if b["dt"] == target), None)
    if cur is None:
        _die(f"no logged session on {sys.argv[2]}")

    def block_entry(r, b):
        if not m._cell(r, b["col"]):
            return None
        s, rp, ws, we = (m._cell(r, b["col"] + i) for i in range(BLOCK_W))
        return {"date": b["date"], "sets": s, "reps": rp,
                "w_start": _to_num(ws), "w_end": _to_num(we)}

    exercises = []
    for c in m.categories():
        if _section(c["name"]) != "strength":
            continue                      # warm-up / crossfit rows: no kg deltas
        for r in range(c["start"], c["end"] + 1):
            today = block_entry(r, cur)
            if today is None:
                continue
            earlier = [(b, block_entry(r, b)) for b in dated if b["dt"] < target]
            earlier = [(b, x) for b, x in earlier if x]
            prev = earlier[-1][1] if earlier else None
            in_win = [x for b, x in earlier if b["dt"] >= horizon]
            base = in_win[0] if in_win else None
            item = {"category": c["name"], "exercise": m._cell(r, 1),
                    "today": today, "is_new": prev is None}
            if prev:
                item["prev"] = {**prev, **(_delta(today["w_end"], prev["w_end"]) or {})}
            if base and prev and base["date"] != prev["date"]:
                item["base_3mo"] = {**base, **(_delta(today["w_end"], base["w_end"]) or {})}
            exercises.append(item)

    w_today = _to_num(m._cell(2, cur["col"]))
    w_prevs = [(b, _to_num(m._cell(2, b["col"])))
               for b in dated if b["dt"] < target]
    w_prevs = [(b, v) for b, v in w_prevs if v is not None]
    my_weight = {"today": w_today}
    if w_today is not None and w_prevs:
        b, v = w_prevs[-1]
        my_weight["prev"] = {"date": b["date"], "value": v,
                             "delta_kg": round(w_today - v, 1)}
    print(json.dumps({
        "ok": True, "date": sys.argv[2], "my_weight": my_weight,
        "exercises": exercises,
        "new_count": sum(1 for e in exercises if e["is_new"]),
        "compared_count": sum(1 for e in exercises if not e["is_new"]),
    }, ensure_ascii=False, indent=1))


def cmd_log():
    try:
        payload = json.load(sys.stdin)
    except Exception as e:
        _die(f"bad stdin JSON: {e}")
    date = payload.get("date") or _die("`date` missing")
    if not re.fullmatch(r"\d{1,2}/\d{1,2}/\d{4}", date):
        _die(f"date {date!r} must be M/D/YYYY")
    entries = payload.get("entries") or []
    for e in entries:
        # strength rows need the full set; warm-up / crossfit cells may be
        # blank (bodyweight, no round count on the page)
        need = ("category", "exercise")
        if _section(e.get("category")) == "strength":
            need += ("sets", "reps", "w_start", "w_end")
        for k in need:
            if e.get(k) in (None, ""):
                _die(f"entry {e.get('exercise', '?')!r}: field {k!r} missing")
    for key, (_cat, fields) in SUMMARY.items():
        extra = set(payload.get(key) or {}) - set(fields)
        if extra:
            _die(f"`{key}`: unknown field(s) {sorted(extra)}; allowed {sorted(fields)}")

    svc = _service()
    m = Model(svc)
    col = m.ensure_block(date)
    if payload.get("my_weight") is not None:
        m._write(2, col, payload["my_weight"])
    planned = []                       # (label, write) — rows are final only at the end
    for e in entries:
        r = m.ensure_exercise(e["category"], e["exercise"])
        w = m._write(r, col, [e.get("sets"), e.get("reps"), e.get("w_start"), e.get("w_end")])
        label = e["exercise"] if _section(e["category"]) == "strength" \
            else f"{e['category']}: {e['exercise']}"
        planned.append((label, w))
    for key, (cat, fields) in SUMMARY.items():
        given = payload.get(key) or {}
        for field, row_name in fields.items():
            if given.get(field) in (None, ""):
                continue
            v = _finish_value(given[field]) if field == "finish" else given[field]
            r = m.ensure_exercise(cat, row_name)
            planned.append((f"{cat}: {row_name}", m._write(r, col, v)))
    m.flush()
    rows = {label: w["r"] + 1 for label, w in planned}
    print(json.dumps({"ok": True, "date": date, "rows": rows,
                      "created": m.created}, ensure_ascii=False))


def main():
    if not SHEET_ID:
        _die("GYM_SHEET_ID not set — source automations/gym-log/config.sh")
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "auth":
        _auth()
    elif cmd == "dump":
        cmd_dump()
    elif cmd == "progress":
        cmd_progress()
    elif cmd == "log":
        cmd_log()
    else:
        _die("usage: gym_sheet.py auth|dump|progress|log")


if __name__ == "__main__":
    main()
