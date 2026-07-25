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

Commands (JSON out on stdout):
  auth              interactive OAuth consent (opens browser once)
  dump              structure snapshot for the calling agent
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

Env (set by config.sh): GYM_SHEET_ID, GYM_TAB, GYM_SHEETS_TOKEN, SHEETS_CREDS.
Exit codes: 0 ok, 2 bad input, 3 auth problem (re-run `gym_sheet.py auth`).
"""
import json
import os
import re
import sys

SHEET_ID = os.environ.get("GYM_SHEET_ID", "")
TAB = os.environ.get("GYM_TAB", "Sheet1")
TOKEN = os.environ.get("GYM_SHEETS_TOKEN", "")
CREDS = os.environ.get("SHEETS_CREDS", "")
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

FIRST_BLOCK_COL = 2   # zero-based index of column C
BLOCK_W = 4           # Sets | Reps | Weight start | Weight end
FIRST_DATA_ROW = 3    # zero-based index of row 4
SUB_HEADERS = ["Sets", "Reps per set", "Weight (start)", "Weight (end)"]


def _die(msg, code=2):
    sys.stderr.write(f"[gym_sheet] {msg}\n")
    print(json.dumps({"ok": False, "error": msg}, ensure_ascii=False))
    sys.exit(code)


def _norm(s):
    s = (s or "").strip().casefold().rstrip(".")
    return re.sub(r"\s+", " ", s)


def _col_letter(idx):
    out = ""
    idx += 1
    while idx:
        idx, r = divmod(idx - 1, 26)
        out = chr(65 + r) + out
    return out


def _service():
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from googleapiclient.discovery import build

    if not (TOKEN and os.path.exists(TOKEN)):
        _die(f"no token at GYM_SHEETS_TOKEN={TOKEN!r}; run `gym_sheet.py auth`", 3)
    creds = Credentials.from_authorized_user_file(TOKEN, SCOPES)
    try:
        if not creds.valid:
            creds.refresh(Request())
            with open(TOKEN, "w") as f:
                f.write(creds.to_json())
    except Exception as e:
        _die(f"token refresh failed ({e}); run `gym_sheet.py auth`", 3)
    return build("sheets", "v4", credentials=creds, cache_discovery=False)


def _auth():
    from google_auth_oauthlib.flow import InstalledAppFlow

    if not (CREDS and os.path.exists(CREDS)):
        _die(f"no OAuth client at SHEETS_CREDS={CREDS!r}", 3)
    flow = InstalledAppFlow.from_client_secrets_file(CREDS, SCOPES)
    creds = flow.run_local_server(port=0, prompt="consent")
    os.makedirs(os.path.dirname(TOKEN), exist_ok=True)
    with open(TOKEN, "w") as f:
        f.write(creds.to_json())
    print(json.dumps({"ok": True, "token": TOKEN}))


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
        self.value_writes = []   # {range, values} in FINAL coordinates
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

    def exercise_row(self, name):
        for r in range(FIRST_DATA_ROW, self.last_data_row() + 1):
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

    # ---- edit planning -------------------------------------------------
    def _write(self, r, c, v, n=1):
        vals = v if isinstance(v, list) else [v]
        rng = f"'{TAB}'!{_col_letter(c)}{r + 1}"
        if len(vals) > 1:
            rng += f":{_col_letter(c + len(vals) - 1)}{r + 1}"
        self.value_writes.append({"range": rng, "values": [vals]})
        for i, x in enumerate(vals):
            self._set_local(r, c + i, str(x))

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
        r = self.exercise_row(exercise)
        if r is not None:
            return r
        cats = self.categories()
        cat = next((c for c in cats if _norm(c["name"]) == _norm(category)), None)
        last = self.last_data_row()
        if cat is None:
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
            self.svc.spreadsheets().values().batchUpdate(
                spreadsheetId=SHEET_ID,
                body={"valueInputOption": "USER_ENTERED", "data": self.value_writes},
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
        cats.append({"name": c["name"], "exercises": exercises})
    weights = {b["date"]: m._cell(2, b["col"]) for b in blocks if m._cell(2, b["col"])}
    print(json.dumps({"ok": True, "sheet": SHEET_ID, "tab": TAB,
                      "dates": [b["date"] for b in blocks],
                      "my_weights": weights, "categories": cats},
                     ensure_ascii=False, indent=1))


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
        for k in ("category", "exercise", "sets", "reps", "w_start", "w_end"):
            if e.get(k) in (None, ""):
                _die(f"entry {e.get('exercise', '?')!r}: field {k!r} missing")

    svc = _service()
    m = Model(svc)
    col = m.ensure_block(date)
    if payload.get("my_weight") is not None:
        m._write(2, col, payload["my_weight"])
    rows = {}
    for e in entries:
        r = m.ensure_exercise(e["category"], e["exercise"])
        m._write(r, col, [e["sets"], e["reps"], e["w_start"], e["w_end"]])
        rows[e["exercise"]] = r + 1
    m.flush()
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
    elif cmd == "log":
        cmd_log()
    else:
        _die("usage: gym_sheet.py auth|dump|log")


if __name__ == "__main__":
    main()
