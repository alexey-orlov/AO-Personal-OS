"""Contact sheet of the app's own exercise figures (the FIG renderer in index.html + figures.json), to look at every
frame before it ships (README, "Exercise figures").

  python3 automations/personal-trainer/app/dev/figure_gallery.py     # writes .work/harness/figures.html

Open http://127.0.0.1:8798/figures.html (the "trainer-app-harness" entry in .claude/launch.json).
URL flags: ?dark / ?light (force a theme), ?only=id,id (just those), ?big (larger frames), ?thumbs (the small list pictures too).
Test page only: never published.
"""
import json
import os
import re

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
H = os.path.join(APP, ".work", "harness")
page = open(os.path.join(APP, "index.html"), encoding="utf-8").read()
style = re.search(r"<style>(.*?)</style>", page, re.S).group(1)
block = page[page.index("/* FIGURES:BEGIN */"): page.index("/* FIGURES:END */")]
figs = json.load(open(os.path.join(APP, "figures.json"), encoding="utf-8"))
cat = json.load(open(os.path.join(os.path.dirname(APP), "catalog.json"), encoding="utf-8"))
order = ([[e["id"], e.get("en_short") or e["en"], e.get("ru", ""), e.get("muscles", []), "strength", e.get("status", "")] for e in cat["strength"]]
         + [[e["id"], e.get("en_short") or e["en"], e.get("ru", ""), [], "warm-up", ""] for e in cat["warmup"]["items"]]
         + [[e["id"], e.get("en_short") or e["en"], e.get("ru", ""), [], "crossfit", e.get("status", "")] for e in cat["crossfit"]["items"]])
js = lambda v: json.dumps(v, ensure_ascii=False).replace("<", "\\u003c")
html = f"""<!doctype html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Figures</title>
<style>{style}
body {{ padding: 0 }}
.g {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 12px; padding: 12px }}
.big .g {{ grid-template-columns: repeat(auto-fill, minmax(520px, 1fr)) }}
.it {{ background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 10px; display: grid; gap: 8px }}
.it h3 {{ font: 600 17px/1.2 var(--f-display) }} .it .id {{ font: 12px ui-monospace, monospace; color: var(--ink-3) }}
.fr {{ display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 8px }}
.pn {{ background: var(--fig-bg); border-radius: 10px; overflow: hidden }}
.lb {{ font: 600 11px/1 var(--f-body); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-3); margin: 6px 0 2px }}
.cue {{ font-size: 12.5px; color: var(--ink-2) }}
.miss {{ color: var(--pain); font-weight: 600 }}
.th {{ display: flex; gap: 8px; align-items: center }} .th .pn {{ width: 46px; height: 46px }} .th .pn.s {{ width: 34px; height: 34px }}
</style></head><body><div id=g class=g></div>
<script>{block}
const FIGS = {js(figs.get("items", {}))};
const ORDER = {js(order)};
const q = new URLSearchParams(location.search);
if (q.has("dark")) document.documentElement.dataset.theme = "dark";
if (q.has("light")) document.documentElement.dataset.theme = "light";
if (q.has("big")) document.body.classList.add("big");
const only = q.get("only") ? q.get("only").split(",") : null;
const g = document.getElementById("g"); let missing = [];
for (const [id, name, ru, mus, part, status] of ORDER) {{
  if (only && !only.includes(id)) continue;
  const b = FIG.of(id, FIGS, mus); const d = document.createElement("div"); d.className = "it";
  const h = document.createElement("div"); h.innerHTML = `<h3></h3><div class=id></div>`; h.querySelector("h3").textContent = name; h.querySelector(".id").textContent = `${{id}} · ${{part}}${{status ? " · " + status : ""}} · ${{ru}}`; d.append(h);
  if (!b) {{ missing.push(id); const m = document.createElement("div"); m.className = "miss"; m.textContent = "no figure"; d.append(m); g.append(d); continue; }}
  const fr = document.createElement("div"); fr.className = "fr";
  b.svgs.forEach((s, i) => {{ const c = document.createElement("div"); c.innerHTML = `<div class=pn>${{s}}</div><div class=lb></div><div class=cue></div>`;
    c.querySelector(".lb").textContent = `${{i + 1}} · ${{b.labels[i]}}`; c.querySelector(".cue").textContent = b.cues[i]; fr.append(c); }});
  d.append(fr);
  if (q.has("thumbs")) {{ const t = document.createElement("div"); t.className = "th"; const s = FIG.thumb(id, FIGS, mus); t.innerHTML = `<div class=pn>${{s}}</div><div class="pn s">${{s}}</div>`; d.append(t); }}
  g.append(d);
}}
document.title = `Figures · ${{missing.length}} missing`;
window.__missing = missing;
</script></body></html>"""
os.makedirs(H, exist_ok=True)
out = os.path.join(H, "figures.html")
open(out, "w", encoding="utf-8").write(html)
print(out, len(html), "figures:", len(figs.get("items", {})))
