# -*- coding: utf-8 -*-
"""
Generate the self-contained map page from map-data.json.

Written as a generator rather than a hand-authored HTML file because the geometry is ~400 KB of
coordinates: it belongs in the file, not in a prompt. Run build_map.py first.

Output: ../bay-area-map.html -- page content only (no doctype/html/head/body), ready for Artifact.
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
DATA = os.path.join(HERE, "map-data.json")
OUT = os.path.join(REPO, "bay-area-map.html")

CSS = """
<style>
:root{
  --bg:#F2F4F4; --panel:#FFFFFF; --ink:#16232B; --ink-2:#425864; --ink-3:#7C929D;
  --line:#DBE2E4; --line-2:#C3CFD3; --accent:#B4671F; --accent-soft:#F0E0CE; --on-accent:#FFFFFF;
  --ramp-0:#EDF2F1; --ramp-1:#C9DCDA; --ramp-2:#97C1C0; --ramp-3:#5F9FA3;
  --ramp-4:#357A85; --ramp-5:#134E5C; --nodata:#E4E7E7; --park:#DFE6DF;
  --shadow:0 1px 2px rgba(16,35,43,.06),0 8px 24px rgba(16,35,43,.06);
}
@media (prefers-color-scheme:dark){
  :root{
    --bg:#0E1619; --panel:#16232A; --ink:#EAF1F2; --ink-2:#A7BCC3; --ink-3:#6D858E;
    --line:#243740; --line-2:#31474F; --accent:#E39B4E; --accent-soft:#3A2A17; --on-accent:#17110A;
    --ramp-0:#1B2A30; --ramp-1:#22454C; --ramp-2:#2A6069; --ramp-3:#3A8189;
    --ramp-4:#5FA8AC; --ramp-5:#9BCFCC; --nodata:#1D2A2F; --park:#22302A;
    --shadow:0 1px 2px rgba(0,0,0,.4),0 8px 24px rgba(0,0,0,.35);
  }
}
:root[data-theme="light"]{
  --bg:#F2F4F4; --panel:#FFFFFF; --ink:#16232B; --ink-2:#425864; --ink-3:#7C929D;
  --line:#DBE2E4; --line-2:#C3CFD3; --accent:#B4671F; --accent-soft:#F0E0CE; --on-accent:#FFFFFF;
  --ramp-0:#EDF2F1; --ramp-1:#C9DCDA; --ramp-2:#97C1C0; --ramp-3:#5F9FA3;
  --ramp-4:#357A85; --ramp-5:#134E5C; --nodata:#E4E7E7; --park:#DFE6DF;
  --shadow:0 1px 2px rgba(16,35,43,.06),0 8px 24px rgba(16,35,43,.06);
}
:root[data-theme="dark"]{
  --bg:#0E1619; --panel:#16232A; --ink:#EAF1F2; --ink-2:#A7BCC3; --ink-3:#6D858E;
  --line:#243740; --line-2:#31474F; --accent:#E39B4E; --accent-soft:#3A2A17; --on-accent:#17110A;
  --ramp-0:#1B2A30; --ramp-1:#22454C; --ramp-2:#2A6069; --ramp-3:#3A8189;
  --ramp-4:#5FA8AC; --ramp-5:#9BCFCC; --nodata:#1D2A2F; --park:#22302A;
  --shadow:0 1px 2px rgba(0,0,0,.4),0 8px 24px rgba(0,0,0,.35);
}
*{box-sizing:border-box}
body{
  margin:0;background:var(--bg);color:var(--ink);
  font-family:"Inter var",-apple-system,BlinkMacSystemFont,"Segoe UI Variable Text","Segoe UI",
    Roboto,"Helvetica Neue",Arial,sans-serif;
  font-size:14px;line-height:1.5;-webkit-font-smoothing:antialiased;
}
.wrap{max-width:1400px;margin:0 auto;padding:24px 20px 40px;display:flex;flex-direction:column;gap:16px}
header{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 18px;border-bottom:1px solid var(--line);padding-bottom:14px}
h1{margin:0;font-size:23px;font-weight:660;letter-spacing:-.021em;text-wrap:balance}
.sub{color:var(--ink-2);font-size:13.5px;max-width:74ch}
.stats{margin-left:auto;display:flex;gap:16px;font-variant-numeric:tabular-nums}
.stat b{display:block;font-size:17px;font-weight:640;letter-spacing:-.01em}
.stat span{font-size:10.5px;text-transform:uppercase;letter-spacing:.085em;color:var(--ink-3)}
.toolbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.seg{display:flex;flex-wrap:wrap;gap:2px;background:var(--panel);border:1px solid var(--line);
  border-radius:9px;padding:2px;box-shadow:var(--shadow)}
.seg button{appearance:none;border:0;background:transparent;color:var(--ink-2);cursor:pointer;
  font:inherit;font-size:12.5px;padding:6px 11px;border-radius:7px;white-space:nowrap}
.seg button:hover{color:var(--ink);background:var(--bg)}
.seg button[aria-pressed="true"]{background:var(--accent);color:var(--on-accent);font-weight:560}
.ctl{display:flex;align-items:center;gap:7px;background:var(--panel);border:1px solid var(--line);
  border-radius:9px;padding:5px 10px;box-shadow:var(--shadow);font-size:12.5px;color:var(--ink-2)}
.ctl input[type=search]{appearance:none;border:0;background:transparent;color:var(--ink);font:inherit;
  width:150px;outline:none}
.ctl button{appearance:none;border:0;background:transparent;font:inherit;font-size:12.5px;
  color:var(--ink-2);cursor:pointer;padding:0}
.ctl button:hover{color:var(--accent)}
.layout{display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:16px;align-items:start}
@media (max-width:940px){.layout{grid-template-columns:minmax(0,1fr)}}
.mapcard{position:relative;background:var(--panel);border:1px solid var(--line);border-radius:14px;
  overflow:hidden;box-shadow:var(--shadow)}
svg#map{display:block;width:100%;height:min(76vh,820px);touch-action:none;cursor:grab;
  background:var(--panel)}
svg#map.dragging{cursor:grabbing}
.place{stroke:var(--panel);stroke-width:.6;stroke-linejoin:round;transition:fill .15s ease;
  vector-effect:non-scaling-stroke}
.place:hover{stroke:var(--accent);stroke-width:1.6;paint-order:stroke}
.place.sel{stroke:var(--accent);stroke-width:2.2;paint-order:stroke}
.place.dim{opacity:.24}
.pt{stroke:var(--panel);stroke-width:1;vector-effect:non-scaling-stroke}
.lbl{fill:var(--ink-3);font-size:7.2px;font-weight:560;letter-spacing:.02em;pointer-events:none;
  paint-order:stroke;stroke:var(--panel);stroke-width:2.2px}
.legend{position:absolute;left:14px;bottom:14px;background:var(--panel);border:1px solid var(--line);
  border-radius:10px;padding:9px 11px;box-shadow:var(--shadow);font-size:11px}
.legend .t{font-size:10px;text-transform:uppercase;letter-spacing:.085em;color:var(--ink-3);margin-bottom:6px}
.bar{display:flex;height:9px;width:186px;border-radius:3px;overflow:hidden}
.bar i{flex:1}
.ticks{display:flex;justify-content:space-between;color:var(--ink-3);margin-top:3px;
  font-variant-numeric:tabular-nums;font-size:10px}
.hint{position:absolute;right:14px;top:14px;background:var(--panel);border:1px solid var(--line);
  border-radius:8px;padding:5px 9px;font-size:11px;color:var(--ink-3);box-shadow:var(--shadow)}
.rail{display:flex;flex-direction:column;gap:12px;position:sticky;top:16px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:13px 14px;
  box-shadow:var(--shadow)}
.card h2{margin:0 0 2px;font-size:15.5px;font-weight:640;letter-spacing:-.012em}
.meta{color:var(--ink-3);font-size:11.5px;margin-bottom:10px}
.rankpill{display:inline-flex;align-items:center;gap:5px;background:var(--accent-soft);color:var(--accent);
  border-radius:999px;padding:2px 9px;font-size:11.5px;font-weight:640;font-variant-numeric:tabular-nums}
.bars{display:flex;flex-direction:column;gap:5px;margin:10px 0 12px}
.brow{display:grid;grid-template-columns:88px 1fr 30px;align-items:center;gap:8px;font-size:11.5px}
.brow span{color:var(--ink-2)}
.track{height:6px;background:var(--bg);border-radius:3px;overflow:hidden}
.fill{height:100%;background:var(--ramp-4);border-radius:3px}
.brow b{text-align:right;font-weight:580;font-variant-numeric:tabular-nums;color:var(--ink)}
dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:3px 12px;font-size:12px}
dt{color:var(--ink-3)}
dd{margin:0;text-align:right;font-variant-numeric:tabular-nums}
.flag{margin-top:10px;padding:7px 9px;border-radius:8px;background:var(--accent-soft);color:var(--accent);
  font-size:11.5px;line-height:1.42}
.list{max-height:330px;overflow:auto}
.list ol{margin:0;padding:0;list-style:none;display:flex;flex-direction:column}
.list li{display:grid;grid-template-columns:26px 1fr auto;gap:8px;padding:4px 6px;border-radius:6px;
  cursor:pointer;font-size:12px;align-items:baseline}
.list li:hover{background:var(--bg)}
.list li.on{background:var(--accent-soft)}
.list i{font-style:normal;color:var(--ink-3);font-variant-numeric:tabular-nums;text-align:right}
.list b{font-weight:580;font-variant-numeric:tabular-nums}
.ttl{font-size:10px;text-transform:uppercase;letter-spacing:.085em;color:var(--ink-3);margin-bottom:7px}
footer{border-top:1px solid var(--line);padding-top:12px;color:var(--ink-3);font-size:11.5px;
  display:flex;flex-direction:column;gap:5px}
footer a{color:var(--accent)}
.tip{position:fixed;pointer-events:none;z-index:20;background:var(--panel);border:1px solid var(--line-2);
  border-radius:9px;padding:7px 10px;box-shadow:var(--shadow);font-size:12px;opacity:0;transition:opacity .1s}
.tip.on{opacity:1}
.tip b{display:block;font-weight:620;margin-bottom:1px}
.tip span{color:var(--ink-3);font-variant-numeric:tabular-nums}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:6px}
</style>
"""

BODY = """
<title>Bay Area relocation — map</title>
<div class="wrap">
  <header>
    <div>
      <h1>Where the ranking lands on the map</h1>
      <div class="sub">Every place in the ranking, drawn in its real boundary and shaded by score.
        Darker is better. Switch the shading to any single criterion to see what is driving a place
        up or down.</div>
    </div>
    <div class="stats">
      <div class="stat"><b id="s-count">0</b><span>places drawn</span></div>
      <div class="stat"><b id="s-meas">0</b><span>fully measured</span></div>
    </div>
  </header>

  <div class="toolbar">
    <div class="seg" id="metrics" role="group" aria-label="Shade the map by"></div>
    <label class="ctl"><span aria-hidden="true">⌕</span>
      <input type="search" id="q" placeholder="Find a place" aria-label="Find a place">
    </label>
    <div class="ctl"><button id="z-sf" type="button">Zoom to San Francisco</button></div>
    <div class="ctl"><button id="z-all" type="button">Whole Bay Area</button></div>
  </div>

  <div class="layout">
    <div class="mapcard">
      <svg id="map" role="img" aria-label="Choropleth of Bay Area places shaded by relocation score"></svg>
      <div class="legend">
        <div class="t" id="leg-title">Total score</div>
        <div class="bar"><i style="background:var(--ramp-0)"></i><i style="background:var(--ramp-1)"></i><i style="background:var(--ramp-2)"></i><i style="background:var(--ramp-3)"></i><i style="background:var(--ramp-4)"></i><i style="background:var(--ramp-5)"></i></div>
        <div class="ticks"><span id="leg-lo">0</span><span>worse ← → better</span><span id="leg-hi">100</span></div>
      </div>
      <div class="hint">Scroll to zoom · drag to pan · click a place to pin it</div>
    </div>

    <div class="rail">
      <div class="card" id="detail"></div>
      <div class="card">
        <div class="ttl">Ranked places</div>
        <div class="list"><ol id="rank"></ol></div>
      </div>
    </div>
  </div>

  <footer>
    <div><b>Boundaries:</b> San Francisco's 41 Analysis Neighborhoods from DataSF; every other city,
      town and unincorporated community from the US Census TIGER place files. Each polygon was
      accepted only if its centroid fell within 12 miles of the coordinates already held for that
      place, so a name collision cannot paint the wrong shape.</div>
    <div><b>Reading the shading:</b> scores are percentile ranks within this set of places, so the
      colour says how a place compares with the other 215 — not an absolute grade.</div>
    <div id="foot-approx"></div>
  </footer>
</div>
<div class="tip" id="tip"></div>
"""


def main():
    data = json.load(open(DATA))
    payload = json.dumps(data, separators=(",", ":"))
    js = SCRIPT.replace("__DATA__", payload)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(CSS + BODY + js)
    print(f"wrote {OUT} ({os.path.getsize(OUT)//1024} KB)")
    print(f"  {len(data['places'])} places, "
          f"{sum(1 for p in data['places'] if not p['rings'])} drawn as points")


SCRIPT = r"""
<script>
const DATA = __DATA__;
const PLACES = DATA.places, METRICS = DATA.metrics;
const RAMP = ['--ramp-0','--ramp-1','--ramp-2','--ramp-3','--ramp-4','--ramp-5'];
let metric = 'total', selected = null, hovered = null, query = '';

const svg = document.getElementById('map');
const tip = document.getElementById('tip');
const NS = 'http://www.w3.org/2000/svg';

/* ---------- projection: equirectangular, longitude squeezed by cos(latitude) ---------- */
let lo0=999, lo1=-999, la0=999, la1=-999;
for (const p of PLACES){
  const pts = p.rings.length ? p.rings.flat() : (p.point ? [p.point] : []);
  for (const [x,y] of pts){ if(x<lo0)lo0=x; if(x>lo1)lo1=x; if(y<la0)la0=y; if(y>la1)la1=y; }
}
const K = Math.cos((la0+la1)/2 * Math.PI/180);
const W = 1000, PAD = 12;
const spanX = (lo1-lo0)*K, spanY = (la1-la0);
const SC = (W - PAD*2) / spanX;
const H = Math.round(spanY*SC + PAD*2);
const px = x => PAD + (x-lo0)*K*SC;
const py = y => PAD + (la1-y)*SC;
svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
svg.setAttribute('preserveAspectRatio','xMidYMid meet');

/* ---------- scales ---------- */
function values(m){ return PLACES.map(p=>p.scores[m]).filter(v=>v!=null); }
function shade(p){
  const v = p.scores[metric];
  if (!p.residential) return 'var(--park)';
  if (v == null) return 'var(--nodata)';
  const i = Math.min(RAMP.length-1, Math.max(0, Math.floor(v/100*RAMP.length)));
  return `var(${RAMP[i]})`;
}
const fmtMoney = v => v==null ? '—' : '$'+Math.round(v).toLocaleString();
const fmt1 = v => v==null ? '—' : (Math.round(v*10)/10).toLocaleString();

/* ---------- draw ---------- */
const gPlaces = document.createElementNS(NS,'g');
const gLabels = document.createElementNS(NS,'g');
svg.append(gPlaces, gLabels);
const nodes = new Map();

for (const p of PLACES){
  let el;
  if (p.rings.length){
    el = document.createElementNS(NS,'path');
    el.setAttribute('d', p.rings.map(r=>'M'+r.map(([x,y])=>px(x).toFixed(1)+','+py(y).toFixed(1)).join('L')+'Z').join(' '));
    el.setAttribute('class','place');
  } else {
    el = document.createElementNS(NS,'circle');
    el.setAttribute('cx', px(p.point[0]).toFixed(1));
    el.setAttribute('cy', py(p.point[1]).toFixed(1));
    el.setAttribute('r', 3.4);
    el.setAttribute('class','place pt');
  }
  el.setAttribute('fill', shade(p));
  el.dataset.name = p.name;
  gPlaces.appendChild(el);
  nodes.set(p.name, el);
}

/* orientation labels: the few places big enough to anchor the eye, plus the city itself */
const anchors = PLACES.filter(p=>p.pop>=95000 && p.rings.length)
  .sort((a,b)=>b.pop-a.pop).slice(0,9);
function ringCentre(p){
  let best=null,bl=0;
  for(const r of p.rings){ if(r.length>bl){bl=r.length;best=r;} }
  let sx=0,sy=0; for(const [x,y] of best){sx+=x;sy+=y;}
  return [sx/best.length, sy/best.length];
}
for (const p of anchors){
  const [cx,cy] = ringCentre(p);
  const t = document.createElementNS(NS,'text');
  t.setAttribute('x', px(cx).toFixed(1)); t.setAttribute('y', py(cy).toFixed(1));
  t.setAttribute('text-anchor','middle'); t.setAttribute('class','lbl');
  t.textContent = p.name;
  gLabels.appendChild(t);
}
const sfp = PLACES.filter(p=>p.county==='San Francisco' && p.rings.length);
if (sfp.length){
  let sx=0,sy=0,n=0;
  for(const p of sfp){ const [x,y]=ringCentre(p); sx+=x; sy+=y; n++; }
  const t = document.createElementNS(NS,'text');
  t.setAttribute('x', px(sx/n).toFixed(1)); t.setAttribute('y', (py(sy/n)-16).toFixed(1));
  t.setAttribute('text-anchor','middle'); t.setAttribute('class','lbl');
  t.textContent = 'SAN FRANCISCO';
  gLabels.appendChild(t);
}

/* ---------- metric buttons ---------- */
const segs = document.getElementById('metrics');
for (const m of METRICS){
  const b = document.createElement('button');
  b.type='button'; b.textContent = m.label; b.dataset.k = m.key;
  b.setAttribute('aria-pressed', String(m.key===metric));
  b.onclick = ()=>{ metric = m.key; repaint(); };
  segs.appendChild(b);
}

/* ---------- interaction ---------- */
function repaint(){
  for (const p of PLACES) nodes.get(p.name).setAttribute('fill', shade(p));
  for (const b of segs.children) b.setAttribute('aria-pressed', String(b.dataset.k===metric));
  document.getElementById('leg-title').textContent =
    (METRICS.find(m=>m.key===metric)||{}).label || 'Score';
  applyFilter();
  renderList();
  renderDetail(selected || hovered);
}
function applyFilter(){
  const q = query.trim().toLowerCase();
  for (const p of PLACES){
    const el = nodes.get(p.name);
    const hit = !q || p.name.toLowerCase().includes(q) || p.county.toLowerCase().includes(q);
    el.classList.toggle('dim', !hit);
  }
}
function setSel(name){
  selected = name;
  for (const [n,el] of nodes) el.classList.toggle('sel', n===name);
  renderDetail(name);
  renderList();
}
svg.addEventListener('mousemove', e=>{
  const t = e.target.closest('.place');
  if (!t){ tip.classList.remove('on'); hovered=null; if(!selected) renderDetail(null); return; }
  const p = PLACES.find(x=>x.name===t.dataset.name);
  hovered = p.name;
  const v = p.scores[metric];
  tip.innerHTML = `<b>${p.name}</b><span>${p.rank?('#'+p.rank+' · '):''}${
    (METRICS.find(m=>m.key===metric)||{}).label}: ${v==null?'—':fmt1(v)}</span>`;
  tip.classList.add('on');
  tip.style.left = Math.min(window.innerWidth-190, e.clientX+14)+'px';
  tip.style.top  = Math.max(8, e.clientY-42)+'px';
  if (!selected) renderDetail(p.name);
});
svg.addEventListener('mouseleave', ()=>{ tip.classList.remove('on'); hovered=null;
  if(!selected) renderDetail(null); });
svg.addEventListener('click', e=>{
  const t = e.target.closest('.place');
  setSel(t ? (t.dataset.name===selected ? null : t.dataset.name) : null);
});

/* ---------- detail ---------- */
function renderDetail(name){
  const el = document.getElementById('detail');
  const p = name ? PLACES.find(x=>x.name===name) : null;
  if (!p){
    el.innerHTML = `<div class="ttl">Place detail</div>
      <div class="meta">Hover a place to preview it, click to pin it.</div>`;
    return;
  }
  const bars = METRICS.filter(m=>m.key!=='total').map(m=>{
    const v = p.scores[m.key];
    return `<div class="brow"><span>${m.label}</span>
      <div class="track"><div class="fill" style="width:${v==null?0:v}%"></div></div>
      <b>${v==null?'—':Math.round(v)}</b></div>`;
  }).join('');
  el.innerHTML = `
    <h2>${p.name}</h2>
    <div class="meta">${p.kind} · ${p.county} County${p.pop?' · pop '+p.pop.toLocaleString():''}</div>
    ${p.rank?`<div class="rankpill">#${p.rank} of 216 · ${fmt1(p.scores.total)}</div>`:
      `<div class="meta">Not ranked — parkland</div>`}
    <div class="bars">${bars}</div>
    <dl>
      <dt>2BR rent</dt><dd>${fmtMoney(p.rent2)}</dd>
      <dt>3BR rent</dt><dd>${fmtMoney(p.rent3)}</dd>
      <dt>Drive to Ferry Bldg</dt><dd>${p.drive==null?'—':fmt1(p.drive)+' min'}</dd>
      <dt>Violent crime /1k</dt><dd>${fmt1(p.violent)}</dd>
      <dt>Property crime /1k</dt><dd>${fmt1(p.property)}</dd>
      <dt>Elementary CAASPP</dt><dd>${p.elem==null?'—':fmt1(p.elem)+'%'}</dd>
      <dt>Middle/high CAASPP</dt><dd>${p.midhigh==null?'—':fmt1(p.midhigh)+'%'}</dd>
    </dl>
    ${p.elemD?`<div class="meta" style="margin:9px 0 0">${p.elemD}${
      p.midhighD&&p.midhighD!==p.elemD?' · '+p.midhighD:''}</div>`:''}
    ${p.approx?`<div class="flag"><b>Approximated.</b> ${p.approxFields} taken from
      ${p.approxFrom} — no publisher reports these for a place this small.</div>`:''}
    ${!p.rings.length?`<div class="flag">No published boundary for this community, so it is drawn
      as a point at its centre.</div>`:''}`;
}

/* ---------- ranked list ---------- */
function renderList(){
  const ol = document.getElementById('rank');
  const q = query.trim().toLowerCase();
  const rows = PLACES.filter(p=>p.rank && (!q || p.name.toLowerCase().includes(q)
      || p.county.toLowerCase().includes(q)))
    .sort((a,b)=> (b.scores[metric]??-1) - (a.scores[metric]??-1));
  ol.innerHTML = rows.slice(0,60).map(p=>`<li data-n="${p.name}" class="${p.name===selected?'on':''}">
      <i>${p.rank}</i><span>${p.name}</span><b>${fmt1(p.scores[metric])}</b></li>`).join('');
  for (const li of ol.children){
    li.onclick = ()=> setSel(li.dataset.n);
    li.onmouseenter = ()=> renderDetail(li.dataset.n);
  }
}

/* ---------- zoom / pan ---------- */
let vb = {x:0,y:0,w:W,h:H};
const LBL_BASE = 7.2, LBL_STROKE = 2.2;
function setVB(){
  svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
  // SVG text is measured in user units, so it would balloon as the viewBox shrinks.
  // Rescale it with the zoom so labels stay a constant size on screen.
  const k = vb.w / W;
  for (const t of gLabels.children){
    t.style.fontSize = (LBL_BASE * k).toFixed(2) + 'px';
    t.style.strokeWidth = (LBL_STROKE * k).toFixed(2) + 'px';
  }
}
svg.addEventListener('wheel', e=>{
  e.preventDefault();
  const r = svg.getBoundingClientRect();
  const mx = vb.x + (e.clientX-r.left)/r.width*vb.w;
  const my = vb.y + (e.clientY-r.top)/r.height*vb.h;
  const k = e.deltaY>0 ? 1.12 : 1/1.12;
  const nw = Math.max(W*0.03, Math.min(W, vb.w*k));
  const nh = nw*H/W;
  vb.x = mx - (mx-vb.x)*(nw/vb.w); vb.y = my - (my-vb.y)*(nh/vb.h);
  vb.w = nw; vb.h = nh; clampVB(); setVB();
}, {passive:false});
let drag=null;
svg.addEventListener('pointerdown', e=>{ drag={x:e.clientX,y:e.clientY,vx:vb.x,vy:vb.y};
  svg.classList.add('dragging'); svg.setPointerCapture(e.pointerId); });
svg.addEventListener('pointermove', e=>{
  if(!drag) return;
  const r = svg.getBoundingClientRect();
  vb.x = drag.vx - (e.clientX-drag.x)/r.width*vb.w;
  vb.y = drag.vy - (e.clientY-drag.y)/r.height*vb.h;
  clampVB(); setVB();
});
for (const ev of ['pointerup','pointercancel','pointerleave'])
  svg.addEventListener(ev, ()=>{ drag=null; svg.classList.remove('dragging'); });
function clampVB(){
  vb.x = Math.max(-W*0.1, Math.min(W*1.1-vb.w, vb.x));
  vb.y = Math.max(-H*0.1, Math.min(H*1.1-vb.h, vb.y));
}
function zoomTo(pts, pad){
  let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;
  for(const [x,y] of pts){ const X=px(x),Y=py(y);
    if(X<x0)x0=X; if(X>x1)x1=X; if(Y<y0)y0=Y; if(Y>y1)y1=Y; }
  const w = Math.max(x1-x0, (y1-y0)*W/H) * pad;
  vb.w = w; vb.h = w*H/W;
  vb.x = (x0+x1)/2 - vb.w/2; vb.y = (y0+y1)/2 - vb.h/2;
  setVB();
}
document.getElementById('z-sf').onclick = ()=>{
  const pts = PLACES.filter(p=>p.county==='San Francisco').flatMap(p=>p.rings.flat());
  if (pts.length) zoomTo(pts, 1.25);
};
document.getElementById('z-all').onclick = ()=>{ vb={x:0,y:0,w:W,h:H}; setVB(); };

/* ---------- search ---------- */
document.getElementById('q').addEventListener('input', e=>{
  query = e.target.value; applyFilter(); renderList();
});

/* ---------- theme: the ramp is defined per theme, so repaint when it flips ---------- */
const mq = window.matchMedia('(prefers-color-scheme: dark)');
mq.addEventListener?.('change', repaint);
new MutationObserver(repaint).observe(document.documentElement, {attributes:true,
  attributeFilter:['data-theme']});

/* ---------- init ---------- */
document.getElementById('s-count').textContent = PLACES.filter(p=>p.rings.length||p.point).length;
document.getElementById('s-meas').textContent = PLACES.filter(p=>p.rank && !p.approx).length;
const nApprox = PLACES.filter(p=>p.approx).length;
document.getElementById('foot-approx').innerHTML =
  `<b>Approximated places:</b> ${nApprox} of 216 have at least one figure borrowed from a larger
   neighbour, because no publisher reports rent, crime or school data for a community that small.
   Every one is named in its detail card, with the donor. The other
   ${PLACES.filter(p=>p.rank&&!p.approx).length} are measured throughout.`;
repaint();
renderDetail(null);
</script>
"""


if __name__ == "__main__":
    main()
