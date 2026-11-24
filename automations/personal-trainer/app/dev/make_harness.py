"""Build a local test page for the Trainer Notebook app (index.html) with a stand-in window.claude.

  python3 automations/personal-trainer/app/app_sync.py export automations/personal-trainer/app/.work/harness/seed --today 2026-11-24
  python3 automations/personal-trainer/app/dev/make_harness.py   # writes .work/harness/harness.html

Serve it with the "trainer-app-harness" entry in .claude/launch.json (http://127.0.0.1:8798/harness.html).
The stand-in db holds the exported config/* and briefs/*; the stand-in Claude returns the page's own
deterministic DRAFT, so the Claude path, enforceWeights and the JS check all run. window.__writes records
every db write (the workouts/<id> body is what the skill's sync reads). dev/sheet_mock.js stands in for the Google
Sheets connector (window.__sheetRequests keeps what the page would send). Test page only: never published.
"""
import json
import os
import sys

APPDIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
H = os.path.join(APPDIR, ".work", "harness")
APP = sys.argv[1] if len(sys.argv) > 1 else os.path.join(APPDIR, "index.html")
seed = {}
for coll in ("config", "briefs", "workouts"):
    d = os.path.join(H, "seed", coll)
    if not os.path.isdir(d):
        continue
    for f in sorted(os.listdir(d)):
        body = json.load(open(os.path.join(d, f), encoding="utf-8"))
        seed[f"{coll}/{f[:-5]}"] = body.get("data", body) if coll == "workouts" else body   # ArtifactData out_dir files wrap the body
MOCK_SHEET = os.path.join(APPDIR, "dev", "sheet_mock.js")

mock = r"""
<script>
/* --- test harness only: shift "today" to 2026-11-24 (the brief's date) --- */
(() => {
  const Real = Date; const OFF = Date.UTC(2026, 10, 24, 16, 0, 0) - Real.now();
  class D extends Real { constructor(...a) { if (a.length) super(...a); else super(Real.now() + OFF); } static now() { return Real.now() + OFF; } }
  window.Date = D;
})();
/* --- in-memory db with the page's API surface (collection().onSnapshot, doc().set/get/update) --- */
(() => {
  const SEED = __SEED__;
  const store = new Map(Object.entries(SEED));
  const subs = new Map();   // collection -> [fn]
  const snapOf = coll => { const docs = [...store.entries()].filter(([k]) => k.split("/")[0] === coll && k.split("/").length === 2)
      .map(([k, v]) => ({ id: k.split("/")[1], exists: true, data: () => JSON.parse(JSON.stringify(v)), metadata: { fromCache: false, hasPendingWrites: false } }));
    return { docs, size: docs.length, empty: !docs.length, metadata: { fromCache: false, hasPendingWrites: false }, docChanges: () => [] }; };
  const notify = coll => (subs.get(coll) || []).forEach(fn => setTimeout(() => fn(snapOf(coll)), 0));
  const db = {
    collection: coll => ({ onSnapshot(next) { (subs.get(coll) || subs.set(coll, []).get(coll)).push(next); setTimeout(() => next(snapOf(coll)), 20); return () => {}; } }),
    doc: path => ({
      async set(data) { if (window.__dbDown) throw { code: "unavailable", message: "test: store down" }; window.__writes.push({ path, data: JSON.parse(JSON.stringify(data)) }); store.set(path, JSON.parse(JSON.stringify(data))); notify(path.split("/")[0]); },
      async update(data) { store.set(path, Object.assign({}, store.get(path), data)); notify(path.split("/")[0]); },
      async get() { const v = store.get(path); return { id: path.split("/")[1], exists: !!v, data: () => v && JSON.parse(JSON.stringify(v)) }; },
    }),
  };
  /* stand-in Claude: returns the page's own DRAFT (the deterministic plan) with a note, after one round */
  const sample = async (input, opts) => { window.__calls.push({ kind: "sample", input: String(input).slice(0, 300) }); const text = "Setup: seat so the pad sits on the shins.\nMove: slow 2-second lowering.\nBack: lower back stays on the pad.\nCommon mistake: bouncing at the bottom."; opts?.onText?.({ text, delta: text }); return { text, truncated: false }; };
  sample.json = async (input, opts) => { window.__calls.push({ kind: "json", input: String(input).slice(0, 300) }); const m = String(input).split("## DRAFT\n")[1]; const draft = JSON.parse(m); draft.note = "Composed (test stand-in)"; return draft; };
  sample.limits = async () => ({ maxPromptBytes: 262144, tools: { maxCount: 8 } });
  window.__writes = []; window.__calls = [];
  window.__store = store;
  window.claude = { use: async name => name === "db" ? db : name === "sample" ? (window.__noClaude ? null : sample) : name === "mcp" ? (window.__sheetMcp || null) : null };
})();
</script>
"""
sheet_js = open(MOCK_SHEET, encoding="utf-8").read() if os.path.exists(MOCK_SHEET) else ""
mock = mock.replace("__SEED__", json.dumps(seed, ensure_ascii=False).replace("<", "\\u003c"))
page = open(APP, encoding="utf-8").read()
html = ("<!doctype html><html><head><meta charset=utf-8><meta name=viewport content=\"width=device-width,initial-scale=1,viewport-fit=cover\">"
        "<style>:root{color-scheme:light}body{margin:0}</style></head><body>" + ("<script>" + sheet_js + "</script>" if sheet_js else "") + mock + page + "</body></html>")
out = os.path.join(H, "harness.html")
open(out, "w", encoding="utf-8").write(html)
print(out, len(html))
