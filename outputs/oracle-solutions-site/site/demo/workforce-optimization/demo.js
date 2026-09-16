/* Workforce optimization — interactive walkthrough.
   Plain JS, no dependencies. State → render; the tour engine sits on top and
   only ever lets the designated control through while it is active. Three
   plans share one information model: the uploaded current allocation, the
   optimized plan, and the plan re-run after dispatcher feedback. */
(function () {
  "use strict";
  var D = window.WFO_DATA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var params = new URLSearchParams(location.search);
  var USER = D.user.name;
  var ICON = {
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M12 21s6-5.4 6-10a6 6 0 0 0-12 0c0 4.6 6 10 6 10Z"/><circle cx="12" cy="11" r="2.2"/></svg>',
    gauge: '<svg viewBox="0 0 24 24"><path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l3.5-4.5"/></svg>',
    bolt: '<svg viewBox="0 0 24 24"><path d="M13 3 5 14h6l-1 7 8-11h-6z"/></svg>',
    warn: '<svg viewBox="0 0 24 24"><path d="M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 8.5v5M12 16.6v.4"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="m5 12 4.5 4.5L19 7"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>',
    user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>',
    users: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 20a4.5 4.5 0 0 1 5.5-4.3"/></svg>',
    cal: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>'
  };
  var WD = D.days.filter(function (d) { return d.working; });
  var ZI = {}; D.zones.forEach(function (z) { ZI[z.id] = z; });
  var TI = {}; D.techs.forEach(function (t) { TI[t.id] = t; });
  function dayOf(k) { return D.days.filter(function (d) { return d.d === k; })[0]; }
  function fmtDay(k) { var d = dayOf(k); return d ? d.dow + " " + d.n + " " + d.mon : k; }
  function fmtShort(k) { var d = dayOf(k); return d ? d.n + " " + d.mon : k; }

  /* ---------------- state ---------------- */
  var S = { ran: false, version: "v1", view: "opt", sched: "zone", week: 1, filters: { zones: [], techs: [] }, sel: { cur: null, opt: null }, decisions: {}, history: [], exported: false, sent: false, pickedFile: null, runFile: null, busy: false };
  function optKey() { return S.ran ? S.version : null; }
  function planFor(card) { return card === "cur" ? "cur" : (optKey() || "cur"); }
  function resetDecisions() { S.decisions = {}; D.zones.forEach(function (z) { S.decisions[z.id] = { status: "pending", comment: "" }; }); }
  resetDecisions();
  function now() { var d = new Date(); return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }
  function log(text, sub, kind) { S.history.unshift({ time: now(), text: text, sub: sub || "", kind: kind || "" }); }

  /* ---------------- allocation ---------------- */
  var memo = {};
  function absentOn(t, k) { for (var i = 0; i < t.absent.length; i++) { var a = t.absent[i]; if (k >= a.from && k <= a.to) return a.kind; } return ""; }
  function alloc(pk) {
    if (memo[pk]) return memo[pk];
    var A = { byTech: {}, byZone: {}, absent: {} };
    D.techs.forEach(function (t) { A.byTech[t.id] = {}; A.absent[t.id] = {}; });
    D.zones.forEach(function (z) { A.byZone[z.id] = {}; });
    var ov = {};
    D.overrides[pk].forEach(function (o) { o.dates.forEach(function (k) { (ov[o.tech + "|" + k] = ov[o.tech + "|" + k] || []).push(o); }); });
    D.techs.forEach(function (t) {
      WD.forEach(function (d) {
        var k = d.d, ab = absentOn(t, k);
        if (ab) { A.absent[t.id][k] = ab; return; }
        var list = t.zones.map(function (z) { return { zone: z, kind: "default" }; });
        (ov[t.id + "|" + k] || []).forEach(function (o) {
          if (o.kind === "moved") list = [{ zone: o.zone, kind: "moved", ov: o }];
          else if (o.kind === "temp") list.push({ zone: o.zone, kind: "temp", partial: !!o.partial, ov: o });
          else if (o.kind === "off") list = [{ zone: o.zone, kind: "off", ov: o }];
          else list.forEach(function (e) { if (e.zone === o.zone) { e.kind = o.kind; e.ov = o; } });
        });
        A.byTech[t.id][k] = list;
        list.forEach(function (e) { (A.byZone[e.zone][k] = A.byZone[e.zone][k] || []).push({ tech: t.id, kind: e.kind, partial: e.partial, ov: e.ov }); });
      });
    });
    memo[pk] = A; return A;
  }
  function techZones(pk, tid) { /* zones with day counts and kind */
    var A = alloc(pk), out = {}, order = [];
    Object.keys(A.byTech[tid]).forEach(function (k) { A.byTech[tid][k].forEach(function (e) { if (!out[e.zone]) { out[e.zone] = { zone: e.zone, days: 0, kind: e.kind, dates: [], ov: e.ov }; order.push(e.zone); } out[e.zone].days++; out[e.zone].dates.push(k); if (e.kind !== "default" && e.kind !== "off") { out[e.zone].kind = e.kind; out[e.zone].ov = e.ov; } }); });
    return order.map(function (z) { return out[z]; });
  }
  function zoneTechs(pk, zid) {
    var A = alloc(pk), out = {}, order = [];
    Object.keys(A.byZone[zid]).sort().forEach(function (k) { A.byZone[zid][k].forEach(function (e) { if (!out[e.tech]) { out[e.tech] = { tech: e.tech, days: 0, kind: e.kind, dates: [], ov: e.ov }; order.push(e.tech); } out[e.tech].days++; out[e.tech].dates.push(k); if (e.kind !== "default" && e.kind !== "off") { out[e.tech].kind = e.kind; out[e.tech].ov = e.ov; } }); });
    return order.map(function (t) { return out[t]; });
  }
  function visitsFor(pk, zid, tid) { /* the zone's demand split by assigned days */
    var list = zoneTechs(pk, zid), total = 0, mine = 0;
    list.forEach(function (e) { var w = e.kind === "temp" && e.ov && e.ov.partial ? 0.5 : 1; total += e.days * w; if (e.tech === tid) mine = e.days * w; });
    if (!total) return 0;
    return Math.round(ZI[zid].demand * mine / total);
  }
  function sampleVisits(pk, zid, tid) {
    var e = zoneTechs(pk, zid).filter(function (x) { return x.tech === tid; })[0]; if (!e) return [];
    var n = visitsFor(pk, zid, tid), dates = e.dates.filter(function (k) { return !(ZI[zid].backfillDates || []).length || ZI[zid].backfillDates.indexOf(k) < 0; }), rows = [], i = 0;
    var seed = (parseInt(tid.slice(2), 10) * 7 + parseInt(zid.slice(3), 10)) % 5;
    for (var d = 0; d < dates.length && rows.length < 6; d++) {
      var per = Math.min(3, Math.max(1, Math.round(n / Math.max(1, dates.length))));
      for (var j = 0; j < per && rows.length < 6; j++) {
        var pinned = zid === "HV-11" && tid === "T-1057" && dates[d] === "2026-10-08" && j < 3;
        rows.push({ date: dates[d], type: D.jobTypes[(seed + i) % D.jobTypes.length], dur: "1 h", sla: pinned ? "Confirmed · parts allocated" : D.slaTypes[(seed + i) % D.slaTypes.length], pinned: pinned }); i++;
      }
    }
    return { rows: rows, more: Math.max(0, n - rows.length) };
  }

  /* ---------------- KPIs (methodology) ---------------- */
  var kmemo = {};
  function kpis(pk) {
    if (kmemo[pk]) return kmemo[pk];
    var A = alloc(pk), out = { techs: {}, zones: {}, fleet: {} }, sumProd = 0, sumJobs = 0, sumWD = 0;
    D.techs.forEach(function (t) {
      var wd = WD.length - Object.keys(A.absent[t.id]).length, off = 0;
      Object.keys(A.byTech[t.id]).forEach(function (k) { if (A.byTech[t.id][k].some(function (e) { return e.kind === "off"; })) off++; });
      var dwj = Math.max(1, wd - off), jobs = t.jobs[pk], prod = Math.round(jobs / dwj * 100) / 100, cap = Math.min(100, Math.round(jobs / (wd * D.capacityPerDay) * 100));
      out.techs[t.id] = { workingDays: wd, daysWithJobs: dwj, jobs: jobs, prod: prod, cap: cap };
      sumProd += prod; sumJobs += jobs; sumWD += wd;
    });
    var wsum = 0, dsum = 0;
    D.zones.forEach(function (z) { out.zones[z.id] = { wait: z.wait[pk] }; wsum += z.wait[pk] * z.demand; dsum += z.demand; });
    out.fleet = { prod: Math.round(sumProd / D.techs.length * 100) / 100, cap: Math.round(sumJobs / (sumWD * D.capacityPerDay) * 100), wait: Math.round(wsum / dsum * 10) / 10, jobs: sumJobs, techDays: sumWD };
    kmemo[pk] = out; return out;
  }
  function pct(a, b) { return Math.round((b - a) / a * 1000) / 10; }
  function delta(before, after, opts) { /* opts: {unit, dp, lowerIsBetter} */
    opts = opts || {};
    var dp = opts.dp === undefined ? 1 : opts.dp, u = opts.unit || "";
    if (after === undefined || after === null) return "<b>" + before.toFixed(dp) + u + "</b>";
    var cls = after === before ? "flat" : (after > before ? (opts.lowerIsBetter ? "up-bad" : "up-good") : (opts.lowerIsBetter ? "down-good" : "down-bad"));
    return before.toFixed(dp) + u + ' <span class="delta ' + cls + '">→ ' + after.toFixed(dp) + u + "</span>";
  }
  function flagsFor(pk) { return D.flags[pk] || []; }
  function zoneFlag(pk, zid) { return flagsFor(pk).filter(function (f) { return f.zone === zid && !f.tech; })[0]; }
  function techFlag(pk, tid) { return flagsFor(pk).filter(function (f) { return f.tech === tid; })[0]; }

  /* ---------------- rendering: shell ---------------- */
  function renderPlanState() {
    var el = $("#plan-state"), k = optKey();
    if (!k) { el.innerHTML = '<span class="chip chip--muted">Current allocation · from the field-service system</span><span>No optimized plan for this period yet</span>'; return; }
    var K = kpis(k), B = kpis("cur"), acc = D.zones.filter(function (z) { return S.decisions[z.id].status === "accepted"; }).length, rej = D.zones.filter(function (z) { return S.decisions[z.id].status === "rejected"; }).length;
    el.innerHTML = '<span class="chip chip--live">Plan ' + k + (k === "v2" ? " · with feedback" : " · optimized") + '</span><span><b>' + D.zones.length + "</b> zones · <b>" + D.techs.length + "</b> technicians · <b>" + K.fleet.jobs.toLocaleString("en-US") + "</b> visits placed (" + (K.fleet.jobs - B.fleet.jobs > 0 ? "+" : "") + (K.fleet.jobs - B.fleet.jobs) + ")</span><span>" + acc + " accepted · " + rej + " rejected · " + (D.zones.length - acc - rej) + " pending</span>";
    $("#version-chip").textContent = "v1.0 · plan " + k;
  }
  $("#avatar").textContent = D.user.initials; $("#avatar").title = D.user.name + " · " + D.user.role;

  /* ---------------- rendering: maps ---------------- */
  function pillW(s) { return Math.round(s.length * 6.3 + 22); }
  function mapSvg(card, pk) {
    var A = alloc(pk), m = D.map, fz = S.filters.zones, ft = S.filters.techs, sel = S.sel[card];
    var s = '<svg class="map" viewBox="0 0 ' + m.w + " " + m.h + '" preserveAspectRatio="xMidYMid meet" aria-label="Schematic map of the region">';
    s += '<rect x="-400" y="-200" width="1800" height="700" fill="#F6F7F9"/>';
    s += '<polygon class="sea" points="' + m.sea.map(function (p) { return p.join(","); }).join(" ") + '"/>';
    /* zones */
    D.zones.forEach(function (z) {
      var dim = fz.length && fz.indexOf(z.id) < 0, isSel = sel && sel.kind === "zone" && sel.id === z.id;
      var changed = pk !== "cur" && zoneTechs(pk, z.id).some(function (e) { return e.kind !== "default"; });
      s += '<path class="zone' + (dim ? " is-dim" : "") + (isSel ? " is-selected" : "") + (changed ? " is-changed" : "") + '" data-zone="' + z.id + '" data-card="' + card + '" fill="' + z.color + '" d="M' + z.poly.map(function (p) { return p[0] + "," + p[1]; }).join("L") + 'Z"><title>' + esc(z.label) + "</title></path>";
    });
    /* water + roads */
    s += '<path class="river" d="' + m.river + '"/><path class="river-in" d="' + m.river + '"/>';
    m.roads.forEach(function (r) { s += '<line class="road" x1="' + r[0][0] + '" y1="' + r[0][1] + '" x2="' + r[1][0] + '" y2="' + r[1][1] + '"/><line class="road-in" x1="' + r[0][0] + '" y1="' + r[0][1] + '" x2="' + r[1][0] + '" y2="' + r[1][1] + '"/>'; });
    s += '<ellipse class="road" cx="' + m.ring.cx + '" cy="' + m.ring.cy + '" rx="' + m.ring.rx + '" ry="' + m.ring.ry + '"/><ellipse class="road-in" cx="' + m.ring.cx + '" cy="' + m.ring.cy + '" rx="' + m.ring.rx + '" ry="' + m.ring.ry + '"/>';
    s += '<text class="place" x="' + m.harbourLabel[0] + '" y="' + m.harbourLabel[1] + '" text-anchor="middle">HARBOUR</text>';
    /* routes for the selected technician */
    var selTech = sel && sel.kind === "tech" ? sel.id : null;
    var routeFor = function (tid) { var t = TI[tid]; techZones(pk, tid).forEach(function (e) { var z = ZI[e.zone]; s += '<line class="route ' + (e.kind === "default" || e.kind === "pinned" || e.kind === "backfill" || e.kind === "off" ? "" : e.kind) + '" x1="' + t.home[0] + '" y1="' + t.home[1] + '" x2="' + z.c[0] + '" y2="' + z.c[1] + '"/>'; }); };
    if (selTech) routeFor(selTech); else if (ft.length) ft.forEach(routeFor);
    /* zone labels + pills */
    D.zones.forEach(function (z) {
      var dim = fz.length && fz.indexOf(z.id) < 0; if (dim) return;
      var list = zoneTechs(pk, z.id), n = list.filter(function (e) { return e.kind !== "off"; }).length, fl = zoneFlag(pk, z.id);
      var txt = n + " · " + z.demand + " visits", w = pillW(txt) + 14;
      s += '<text class="zlabel" x="' + z.c[0] + '" y="' + (z.c[1] - 14) + '" text-anchor="middle">' + esc(z.label) + "</text>";
      s += '<g class="zpill' + (fl ? " is-warn" : "") + '" transform="translate(' + (z.c[0] - w / 2) + "," + (z.c[1] - 6) + ')"><rect width="' + w + '" height="20" rx="10"/><text x="10" y="14"><tspan class="k">' + n + "</tspan> tech · " + z.demand + " visits" + (fl ? " ▲" : "") + "</text></g>";
    });
    /* technician homes */
    D.techs.forEach(function (t) {
      var dim = (ft.length && ft.indexOf(t.id) < 0) || (fz.length && !t.zones.some(function (z) { return fz.indexOf(z) >= 0; }));
      var isSel = selTech === t.id, sp = t.skill === "Specialist";
      s += '<g class="home' + (dim ? " is-dim" : "") + (isSel ? " is-selected" : "") + '" data-tech="' + t.id + '" data-card="' + card + '" transform="translate(' + t.home[0] + "," + t.home[1] + ')">' + (isSel ? '<circle class="ring" r="13"/>' : "") + '<circle class="o' + (sp ? " sp" : "") + '" r="7"/><path d="M-3.2 0.6 0 -2.6 3.2 0.6M-2.4 0v2.9h4.8V0"/><title>' + t.id + " · " + t.skill + "</title></g>";
    });
    s += "</svg>";
    return s;
  }
  function mapCard(card, pk, title, sub) {
    var banner = "";
    if (card === "opt" && !S.ran) banner = '<div class="banner">No optimized plan yet — <b>run the optimization</b> to see the proposal</div>';
    var changed = pk === "cur" ? 0 : D.zones.filter(function (z) { return zoneTechs(pk, z.id).some(function (e) { return e.kind !== "default"; }); }).length;
    return '<div class="mapcard" data-card="' + card + '"><div class="map-head"><h2>' + esc(title) + " <span>— " + D.zones.length + " zones" + (pk !== "cur" ? " · " + changed + " changed" : "") + "</span></h2>" +
      '<div class="map-tools"><button class="icon-btn" type="button" title="Fit to region" aria-label="Fit to region"><svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button></div></div>' +
      '<div class="map-wrap">' + banner + '<div class="zoom"><button type="button" aria-label="Zoom in">+</button><button type="button" aria-label="Zoom out">−</button></div>' + mapSvg(card, pk) + '<span class="map-note">Schematic map · ' + esc(D.region.name) + "</span>" + detailsHtml(card, pk) + "</div>" +
      '<div class="legend"><span><i class="sw"></i>Service zone</span><span><i class="dot"></i>Technician home</span><span><i class="ln"></i>Default zone route</span><span><i class="ln ln--dash"></i>Temporary zone route</span><span><i class="home"></i>Specialist</span></div></div>';
  }
  function renderMaps() {
    var el = $("#maps"), k = optKey();
    el.classList.toggle("is-compare", S.view === "compare");
    if (S.view === "compare") el.innerHTML = mapCard("cur", "cur", "Current allocation", "") + mapCard("opt", k || "cur", "Optimized allocation", "");
    else if (S.view === "cur") el.innerHTML = mapCard("cur", "cur", "Current allocation", "");
    else el.innerHTML = mapCard("opt", k || "cur", k ? "Optimized allocation" : "Service zones", "");
    tour.reposition();
  }
  $("#maps").addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-close-details]"))) { S.sel[t.dataset.closeDetails] = null; renderMaps(); renderSchedule(); return; }
    if ((t = e.target.closest("[data-toggle-item]"))) { t.closest(".d-item").classList.toggle("is-open"); tour.reposition(); return; }
    if ((t = e.target.closest("[data-jump-zone]"))) { selectZone(t.dataset.card, t.dataset.jumpZone); return; }
    if ((t = e.target.closest("[data-jump-tech]"))) { selectTech(t.dataset.card, t.dataset.jumpTech); return; }
    if ((t = e.target.closest(".zone[data-zone]"))) { selectZone(t.dataset.card, t.dataset.zone); return; }
    if ((t = e.target.closest(".home[data-tech]"))) { selectTech(t.dataset.card, t.dataset.tech); return; }
    if ((t = e.target.closest(".zoom button, .map-tools button"))) { toast("The schematic map has one zoom level in this walkthrough."); }
  });
  function selectZone(card, zid) { S.sel[card] = { kind: "zone", id: zid }; renderMaps(); renderSchedule(); tour.after(card === "opt" && zid === "HV-11" ? "zone" : card === "opt" && zid === "HV-09" ? "zone-cmp" : ""); }
  function selectTech(card, tid) { S.sel[card] = { kind: "tech", id: tid }; renderMaps(); renderSchedule(); tour.after(card === "opt" && tid === "T-1048" ? "tech-row" : ""); }

  /* ---------------- rendering: details ---------------- */
  function kindLabel(k, partial) { return k === "temp" ? (partial ? "temporary · part of the day" : "temporary") : k === "moved" ? "moved here" : k === "pinned" ? "non-movable kept" : k === "backfill" ? "historical demand" : k === "off" ? "no visits" : "default"; }
  function whyBox(o, cls) { if (!o) return ""; return '<div class="why' + (cls ? " " + cls : "") + '"><b>' + esc(o.rule) + "</b>" + esc(o.why) + "</div>"; }
  function visitsTable(pk, zid, tid) {
    var v = sampleVisits(pk, zid, tid); if (!v.rows || !v.rows.length) return '<div class="muted" style="font-size:11.5px;padding:4px 0">No booked visits on these dates — allocated on historical demand.</div>';
    return '<table class="visits">' + v.rows.map(function (r) { return "<tr><td>" + esc(fmtShort(r.date)) + "</td><td>" + esc(r.type) + "</td><td>" + esc(r.dur) + "</td><td" + (r.pinned ? ' class="pin"' : "") + ">" + (r.pinned ? "⚑ " : "") + esc(r.sla) + "</td></tr>"; }).join("") + (v.more ? '<tr><td colspan="4" class="more">+ ' + v.more + " more booked visits</td></tr>" : "") + "</table>";
  }
  function detailsHtml(card, pk) {
    var sel = S.sel[card]; if (!sel) return "";
    var B = kpis("cur"), K = kpis(pk), after = pk !== "cur", body = "";
    if (sel.kind === "zone") {
      var z = ZI[sel.id], list = zoneTechs(pk, z.id), fl = zoneFlag(pk, z.id), seen = {};
      body += '<div class="d-title"><span class="zdot" style="background:' + z.color + '"></span><b>' + esc(z.label) + "</b></div><div class=\"d-kind\">" + esc(z.kind) + "</div>";
      body += '<div class="pcs">' + z.postcodes.map(function (p) { return "<span>" + esc(p) + "</span>"; }).join("") + "</div>";
      body += '<div class="d-kpi"><div><span>Avg wait, booking → visit</span><b>' + delta(B.zones[z.id].wait, after ? K.zones[z.id].wait : undefined, { unit: " d", lowerIsBetter: true }) + "</b></div><div><span>Booked visits</span><b>" + z.demand + (z.backfill ? ' <span class="muted">+ ' + z.backfill + " on history</span>" : "") + "</b></div></div>";
      if (fl) body += '<div class="why ' + (fl.kind === "wait-worse" || fl.kind === "uncovered" || fl.kind === "absence" || fl.kind === "over-capacity" ? "bad" : "warn") + '"><b>' + esc(fl.title) + "</b>" + esc(fl.text) + "</div>";
      body += '<span class="eyebrow">Technicians · ' + list.filter(function (e) { return e.kind !== "off"; }).length + "</span><ul class=\"d-list\">";
      list.forEach(function (e) {
        var t = TI[e.tech], n = visitsFor(pk, z.id, e.tech);
        body += '<li class="d-item' + (e.kind === "temp" || e.kind === "moved" ? " is-temp" : "") + '"><div class="d-item-head" data-toggle-item><b>' + ICON.user + esc(t.id) + ' <span class="chip chip--skill' + (t.skill === "Specialist" ? " chip--specialist" : "") + '">' + esc(t.skill) + '</span></b><span class="meta">' + n + " visits · " + e.days + (e.days === 1 ? " day" : " days") + " · " + kindLabel(e.kind, e.ov && e.ov.partial) + "</span>" + ICON.chev + '</div><div class="d-item-body">' + visitsTable(pk, z.id, e.tech) + '<div style="margin-top:6px"><button class="btn btn--ghost btn--xs" type="button" data-jump-tech="' + t.id + '" data-card="' + card + '">Show ' + esc(t.id) + " on the map</button></div></div></li>";
        if (e.ov && !seen[e.ov.rule + e.ov.tech]) { seen[e.ov.rule + e.ov.tech] = 1; }
      });
      body += "</ul>";
      var whys = []; list.forEach(function (e) { if (e.ov && whys.indexOf(e.ov) < 0) whys.push(e.ov); });
      if (whys.length) { body += '<span class="eyebrow">Why this allocation</span>' + whys.map(function (o) { return whyBox(o, o.kind === "moved" ? "warn" : ""); }).join(""); }
    } else {
      var t2 = TI[sel.id], zl = techZones(pk, t2.id), tb = B.techs[t2.id], tk = after ? K.techs[t2.id] : null, tf = techFlag("cur", t2.id);
      body += '<div class="d-title">' + ICON.user + "<b>" + esc(t2.id) + '</b><span class="chip chip--skill' + (t2.skill === "Specialist" ? " chip--specialist" : "") + '">' + esc(t2.skill) + "</span></div>";
      body += '<div class="d-kind">Home: ' + esc(ZI[t2.zones[0]].label) + " · " + esc(t2.homePostcode) + " · default zone" + (t2.zones.length > 1 ? "s" : "") + ": " + t2.zones.join(", ") + (t2.absent.length ? " · " + t2.absent.map(function (a) { return a.kind.toLowerCase() + " " + fmtShort(a.from) + (a.to !== a.from ? " – " + fmtShort(a.to) : ""); }).join(", ") : "") + "</div>";
      body += '<div class="d-kpi"><div><span>Capacity used</span><b>' + delta(tb.cap, tk ? tk.cap : undefined, { unit: "%", dp: 0 }) + "</b></div><div><span>Jobs per working day</span><b>" + delta(tb.prod, tk ? tk.prod : undefined, { dp: 2 }) + "</b></div><div><span>Visits in the period</span><b>" + (tk ? tb.jobs + ' <span class="delta ' + (tk.jobs > tb.jobs ? "up-good" : tk.jobs < tb.jobs ? "down-bad" : "flat") + '">→ ' + tk.jobs + "</span>" : tb.jobs) + "</b></div><div><span>Working days</span><b>" + tb.workingDays + " of " + WD.length + "</b></div></div>";
      if (tf) body += '<div class="why ' + (after ? "ok" : "bad") + '"><b>' + (after ? "Fixed in the optimized plan" : esc(tf.title)) + "</b>" + esc(tf.text) + (after ? " Two movable visits now go to T-1050 on that day, so T-1048 is at 7." : "") + "</div>";
      body += '<span class="eyebrow">Zones · ' + zl.filter(function (e) { return e.kind !== "off"; }).length + "</span><ul class=\"d-list\">";
      zl.forEach(function (e) {
        var z2 = ZI[e.zone], n2 = visitsFor(pk, z2.id, t2.id);
        body += '<li class="d-item' + (e.kind === "temp" || e.kind === "moved" ? " is-temp" : "") + '"><div class="d-item-head" data-toggle-item><b><span class="zdot" style="background:' + z2.color + '"></span>' + esc(z2.label) + '</b><span class="meta">' + n2 + " visits · " + e.days + (e.days === 1 ? " day" : " days") + " · " + kindLabel(e.kind, e.ov && e.ov.partial) + "</span>" + ICON.chev + '</div><div class="d-item-body">' + visitsTable(pk, z2.id, t2.id) + '<div style="margin-top:6px"><button class="btn btn--ghost btn--xs" type="button" data-jump-zone="' + z2.id + '" data-card="' + card + '">Show ' + esc(z2.label) + " on the map</button></div></div></li>";
      });
      body += "</ul>";
      var whys2 = []; zl.forEach(function (e) { if (e.ov && whys2.indexOf(e.ov) < 0) whys2.push(e.ov); });
      if (whys2.length) { body += '<span class="eyebrow">Why this allocation</span>' + whys2.map(function (o) { return whyBox(o, o.kind === "moved" ? "warn" : ""); }).join(""); }
    }
    return '<div class="details" data-details="' + card + '"><div class="details-head"><div><strong>Details</strong><span class="sub">' + ICON.cal + esc(D.period.short) + " · plan " + (pk === "cur" ? "current" : pk) + '</span></div><button class="icon-btn" type="button" aria-label="Close" data-close-details="' + card + '">' + ICON.x + '</button></div><div class="details-body">' + body + "</div></div>";
  }

  /* ---------------- rendering: schedule ---------------- */
  function pill(label, kind, extra, isZone) {
    var g = kind === "temp" ? "↓ " : kind === "moved" ? "↑ " : kind === "off" ? "— " : kind === "backfill" ? "≈ " : "";
    return '<span class="pill pill--' + kind + (isZone ? " pill--zone" : "") + '" title="' + esc(kindLabel(kind)) + '">' + g + esc(label) + (extra ? " <i>" + esc(extra) + "</i>" : "") + "</span>";
  }
  function renderSchedule() {
    var k = optKey(), pk = k || "cur", A = alloc(pk), B = kpis("cur"), K = k ? kpis(k) : null, wk = D.days.filter(function (d) { return d.week === S.week; });
    $("#sched-week").textContent = "Week " + S.week + " of " + D.weeks.length + " · " + D.weeks[S.week - 1].label;
    $("#week-prev").disabled = S.week === 1; $("#week-next").disabled = S.week === D.weeks.length;
    $("#btn-accept-remaining").hidden = !k; $("#btn-reopt").hidden = !(k === "v1" && D.zones.some(function (z) { return S.decisions[z.id].status === "rejected"; }));
    var fz = S.filters.zones, ft = S.filters.techs;
    var head = "", body = "";
    var dayHead = wk.map(function (d) { return "<th" + (d.working ? "" : ' class="nonwork"') + ">" + d.dow + "<b>" + d.n + "</b>" + (d.holiday ? '<span class="hol">' + esc(d.holiday) + "</span>" : "") + "</th>"; }).join("");
    if (S.sched === "zone") {
      head = '<tr><th class="first"><b>Zone</b><span class="muted">' + esc(D.period.short) + '</span><span class="kpi-line">' + ICON.clock + delta(B.fleet.wait, K ? K.fleet.wait : undefined, { unit: " d", lowerIsBetter: true }) + " avg wait</span></th>" + dayHead + '<th class="dec">Decision<span class="muted" style="display:block;text-transform:none;letter-spacing:0;margin-top:2px">whole period · ' + esc(D.period.short) + "</span></th></tr>";
      var rows = D.zones.filter(function (z) { return (!fz.length || fz.indexOf(z.id) >= 0) && (!ft.length || zoneTechs(pk, z.id).some(function (e) { return ft.indexOf(e.tech) >= 0; })); });
      rows.forEach(function (z) {
        var fl = zoneFlag(pk, z.id), dec = S.decisions[z.id], sel = S.sel[S.view === "cur" ? "cur" : "opt"], isSel = sel && sel.kind === "zone" && sel.id === z.id;
        var first = '<td class="first"><div class="row-name"><span class="zdot" style="background:' + z.color + '"></span>' + esc(z.label) + '</div><div class="row-sub">' + esc(D.period.short) + '</div><div class="row-kpi">' + ICON.clock + "<span>" + delta(B.zones[z.id].wait, K ? K.zones[z.id].wait : undefined, { unit: " d", lowerIsBetter: true }) + ' avg wait</span></div><div class="row-kpi">' + ICON.pin + "<span>" + z.postcodes.length + " postcodes</span></div>" + (fl ? '<div class="row-flag' + (fl.kind === "wait-worse" ? " bad" : "") + '">' + ICON.warn + esc(fl.title) + "</div>" : "") + "</td>";
        var cells = wk.map(function (d) {
          if (!d.working) return '<td class="nonwork"></td>';
          var list = (A.byZone[z.id][d.d] || []).filter(function (e) { return !ft.length || ft.indexOf(e.tech) >= 0; });
          return '<td><div class="cell-pills">' + list.map(function (e) { return pill(e.tech, e.kind, e.kind === "pinned" ? "3 fixed" : e.kind === "temp" && e.partial ? "part" : ""); }).join("") + "</div></td>";
        }).join("");
        var decision;
        if (!k) decision = '<td class="dec"><span class="muted">—</span></td>';
        else if (dec.status === "pending" || dec.status === "reproposed") decision = '<td class="dec"><div class="decision">' + (dec.status === "reproposed" ? '<span class="status status--reproposed">Re-proposed</span>' : "") + '<button class="btn btn--ok" type="button" data-decide="accepted" data-zone="' + z.id + '">' + ICON.check + 'Accept</button><button class="btn btn--danger" type="button" data-decide="rejected" data-zone="' + z.id + '">' + ICON.x + 'Reject</button><button class="btn btn--ghost" type="button" data-comment="' + z.id + '">' + ICON.chat + "Comment</button>" + (dec.comment ? '<span class="cmt">“' + esc(dec.comment) + "”</span>" : "") + "</div></td>";
        else decision = '<td class="dec"><div class="decision"><span class="status status--' + dec.status + '">' + (dec.status === "accepted" ? ICON.check + "Accepted" : ICON.x + "Rejected") + '</span><button class="btn btn--ghost" type="button" data-comment="' + z.id + '">' + ICON.chat + 'Comment</button><button class="btn btn--ghost btn--xs" type="button" data-decide="pending" data-zone="' + z.id + '">Reopen</button>' + (dec.comment ? '<span class="cmt">“' + esc(dec.comment) + "”</span>" : "") + "</div></td>";
        body += '<tr class="clickable' + (isSel ? " is-selected" : "") + (fl ? " is-flag" : "") + '" data-zone="' + z.id + '">' + first + cells + decision + "</tr>";
      });
      if (!rows.length) body = '<tr><td colspan="' + (wk.length + 2) + '" class="empty-plan">No zone matches the filters.</td></tr>';
    } else {
      head = '<tr><th class="first"><b>Technician</b><span class="muted">' + esc(D.period.short) + '</span><span class="kpi-line">' + ICON.gauge + delta(B.fleet.cap, K ? K.fleet.cap : undefined, { unit: "%", dp: 0 }) + ' capacity</span><span class="kpi-line">' + ICON.bolt + delta(B.fleet.prod, K ? K.fleet.prod : undefined, { dp: 2 }) + " jobs/day</span></th>" + dayHead + "</tr>";
      var trows = D.techs.filter(function (t) { return (!ft.length || ft.indexOf(t.id) >= 0) && (!fz.length || t.zones.some(function (z) { return fz.indexOf(z) >= 0; }) || techZones(pk, t.id).some(function (e) { return fz.indexOf(e.zone) >= 0; })); });
      trows.forEach(function (t) {
        var tb = B.techs[t.id], tk = K ? K.techs[t.id] : null, tf = techFlag("cur", t.id), sel = S.sel[S.view === "cur" ? "cur" : "opt"], isSel = sel && sel.kind === "tech" && sel.id === t.id;
        var first = '<td class="first"><div class="row-name">' + esc(t.id) + ' <span class="chip chip--skill' + (t.skill === "Specialist" ? " chip--specialist" : "") + '">' + esc(t.skill) + '</span></div><div class="row-kpi">' + ICON.gauge + "<span>" + delta(tb.cap, tk ? tk.cap : undefined, { unit: "%", dp: 0 }) + ' capacity</span></div><div class="row-kpi">' + ICON.bolt + "<span>" + delta(tb.prod, tk ? tk.prod : undefined, { dp: 2 }) + ' jobs/day</span></div><div class="row-zones">' + t.zones.map(function (z) { return '<span><i class="zdot" style="background:' + ZI[z].color + '"></i>' + esc(ZI[z].label) + "</span>"; }).join("") + "</div>" + (tf ? '<div class="row-flag' + (k ? "" : " bad") + '">' + (k ? ICON.check + "Capacity fixed on " + esc(fmtShort(tf.date)) : ICON.warn + esc(tf.title) + " · " + esc(fmtShort(tf.date))) + "</div>" : "") + "</td>";
        var cells = wk.map(function (d) {
          if (!d.working) return '<td class="nonwork"></td>';
          var ab = A.absent[t.id][d.d]; if (ab) return '<td class="absent">ABSENT<small>' + esc(ab) + "</small></td>";
          var list = (A.byTech[t.id][d.d] || []).filter(function (e) { return !fz.length || fz.indexOf(e.zone) >= 0 || e.kind === "off"; });
          return '<td><div class="cell-pills">' + list.map(function (e) { return pill(ZI[e.zone].label, e.kind, e.kind === "pinned" ? "3 fixed" : e.kind === "temp" && e.partial ? "part" : "", true); }).join("") + "</div></td>";
        }).join("");
        body += '<tr class="clickable' + (isSel ? " is-selected" : "") + (tf && !k ? " is-flag" : "") + '" data-tech="' + t.id + '">' + first + cells + "</tr>";
      });
      if (!trows.length) body = '<tr><td colspan="' + (wk.length + 1) + '" class="empty-plan">No technician matches the filters.</td></tr>';
    }
    $("#grid thead").innerHTML = head; $("#grid tbody").innerHTML = body;
    tour.reposition();
  }
  $("#grid").addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-decide]"))) { decide(t.dataset.zone, t.dataset.decide); return; }
    if ((t = e.target.closest("[data-comment]"))) { openComment(t.dataset.comment); return; }
    if ((t = e.target.closest("tr[data-zone]"))) { selectZone(S.view === "cur" ? "cur" : "opt", t.dataset.zone); return; }
    if ((t = e.target.closest("tr[data-tech]"))) { selectTech(S.view === "cur" ? "cur" : "opt", t.dataset.tech); }
  });
  $("#view-seg").addEventListener("click", function (e) { var b = e.target.closest("[data-view]"); if (b) setSched(b.dataset.view); });
  function setSched(v) { S.sched = v; $$("#view-seg button").forEach(function (b) { b.classList.toggle("is-active", b.dataset.view === v); }); renderSchedule(); tour.after(v === "tech" ? "techview" : "zoneview"); }
  $("#week-prev").addEventListener("click", function () { if (S.week > 1) { S.week--; renderSchedule(); } });
  $("#week-next").addEventListener("click", function () { if (S.week < D.weeks.length) { S.week++; renderSchedule(); } });
  $("#plan-seg").addEventListener("click", function (e) { var b = e.target.closest("[data-plan]"); if (b) setView(b.dataset.plan); });
  function setView(v) { S.view = v; $$("#plan-seg button").forEach(function (b) { b.classList.toggle("is-active", b.dataset.plan === v); }); renderMaps(); renderSchedule(); tour.after(v === "compare" ? "compare" : ""); }

  /* ---------------- decisions ---------------- */
  function decide(zid, status) {
    var dec = S.decisions[zid], z = ZI[zid];
    dec.status = status;
    if (status !== "pending") log((status === "accepted" ? "Accepted" : "Rejected") + " the allocation for " + z.label, "Plan " + optKey() + " · " + USER, status === "accepted" ? "ok" : "warn");
    renderSchedule(); renderPlanState();
    tour.after(zid === "HV-09" && status === "rejected" ? "reject" : "");
  }
  function acceptRemaining() {
    var k = optKey(), n = 0, skipped = [];
    D.zones.forEach(function (z) { var d = S.decisions[z.id]; if (d.status === "pending" || d.status === "reproposed") { if (zoneFlag(k, z.id)) skipped.push(z); else { d.status = "accepted"; n++; } } });
    log("Accepted " + n + " remaining zone allocations", "Accept remaining · " + USER, "ok");
    toast("Accepted " + n + " zones." + (skipped.length ? " " + skipped.map(function (z) { return z.label; }).join(", ") + " is flagged and still needs your decision — Accept remaining never touches a flag." : " Every zone is decided — the plan is ready to export."), 5200);
    renderSchedule(); renderPlanState();
    tour.after("accept-all");
  }
  $("#btn-accept-remaining").addEventListener("click", acceptRemaining);
  var commentZone = null;
  function openComment(zid) {
    commentZone = zid; $("#comment-title").textContent = "Comment — " + ZI[zid].label;
    var ta = $("#comment-text"); ta.value = S.decisions[zid].comment || (tour.active && zid === "HV-09" ? D.suggestedComment : ""); $("#comment-count").textContent = ta.value.length + "/300";
    $("#comment").hidden = false; setTimeout(function () { ta.focus(); }, 50);
    tour.after(zid === "HV-09" ? "comment" : "");
  }
  $("#comment-text").addEventListener("input", function (e) { $("#comment-count").textContent = e.target.value.length + "/300"; });
  function saveComment() {
    if (!commentZone) return;
    var v = $("#comment-text").value.trim(); S.decisions[commentZone].comment = v; $("#comment").hidden = true;
    if (v) log("Comment on " + ZI[commentZone].label, "“" + v + "” · " + USER, "");
    renderSchedule();
    tour.after(commentZone === "HV-09" ? "save" : "");
    commentZone = null;
  }
  $("#comment-save").addEventListener("click", saveComment);
  $("#comment-cancel").addEventListener("click", function () { $("#comment").hidden = true; commentZone = null; });
  $("#comment-close").addEventListener("click", function () { $("#comment").hidden = true; commentZone = null; });

  /* ---------------- run + re-run ---------------- */
  var runModal = $("#run"), runForm = $("#run-form"), runProg = $("#run-progress");
  function openRun() {
    runForm.hidden = false; runProg.hidden = true; $("#run-title").textContent = "Run optimization";
    var sel = $("#run-region"); sel.innerHTML = [D.region.name].concat(D.region.others).map(function (r) { return "<option>" + esc(r) + "</option>"; }).join("");
    $("#sources").innerHTML = "<span>Sources</span>" + D.sources.map(function (s) { return '<span class="chip ' + (s.ok ? "chip--ok" : "chip--muted") + '">' + esc(s.name) + " · " + esc(s.state) + "</span>"; }).join("");
    setRunFile(S.runFile);
    runModal.hidden = false;
    tour.after("run");
  }
  function setRunFile(f) {
    S.runFile = f; var fb = $("#run-file");
    fb.classList.toggle("is-set", !!f);
    $(".fb-text", fb).innerHTML = f ? "<strong>" + esc(f.name) + "</strong><em>" + esc(f.kind) + " · " + esc(f.size) + " · sheets " + D.inputSheets.join(", ") + "</em>" : "<strong>Click to upload</strong><em>XLSX only · sheets: " + D.inputSheets.join(", ") + "</em>";
    $("#run-go").disabled = !f;
  }
  $("#btn-run").addEventListener("click", openRun);
  $("#run-close").addEventListener("click", function () { if (!S.busy) runModal.hidden = true; });
  $("#run-example").addEventListener("click", function (e) { e.preventDefault(); toast("<b>example-input.xlsx</b> downloaded · the seven sheets the optimizer expects, with two rows each"); });
  $("#run-region").addEventListener("change", function (e) { if (e.target.value !== D.region.name) { toast("Only " + D.region.name + " is loaded in this walkthrough — the other regions run on their own rule sets."); e.target.value = D.region.name; } });
  $("#run-file").addEventListener("click", function () { openPicker(); tour.after("file"); });

  var picker = $("#picker"), pickerList = $("#picker-list"), pickerOpen = $("#picker-open");
  function openPicker() {
    S.pickedFile = null; pickerOpen.disabled = true;
    pickerList.innerHTML = D.pickerFiles.map(function (f, i) { return '<li data-file="' + i + '"' + (f.main ? ' class="is-main"' : "") + '><span class="file-ico"><svg viewBox="0 0 24 24"><path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/></svg></span><div class="doc-name"><strong>' + esc(f.name) + "</strong><span>" + esc(f.kind) + '</span></div><span class="size">' + esc(f.size) + "</span></li>"; }).join("");
    picker.hidden = false;
  }
  function selectFile(i) {
    S.pickedFile = D.pickerFiles[i];
    $$("li", pickerList).forEach(function (li) { li.classList.toggle("is-selected", +li.dataset.file === i); });
    pickerOpen.disabled = false;
    if (S.pickedFile.main) tour.after("pick");
  }
  function openFile() {
    if (!S.pickedFile) return;
    if (!S.pickedFile.main) { toast("This walkthrough follows one prepared period — pick the Harborview file for 5 Oct."); return; }
    picker.hidden = true; setRunFile(S.pickedFile);
    tour.after("open");
  }
  pickerList.addEventListener("click", function (e) { var li = e.target.closest("li[data-file]"); if (li) selectFile(+li.dataset.file); });
  $("#picker-cancel").addEventListener("click", function () { picker.hidden = true; });
  pickerOpen.addEventListener("click", openFile);

  function runStages(list, onDone) {
    var bar = $("#proc-bar"), ol = $("#stages");
    ol.innerHTML = list.map(function (s) { return "<li><i></i><span>" + esc(s.name) + "</span><em></em></li>"; }).join("");
    var lis = $$("li", ol); bar.style.width = "0%"; $("#proc-chip").textContent = "Processing"; $("#proc-chip").className = "chip chip--live";
    var t = 0, sum = list.reduce(function (a, p) { return a + p.ms; }, 0), acc = 0;
    list.forEach(function (p, i) {
      setTimeout(function () { lis[i].classList.add("is-running"); if (p.tick) tickSolve(lis[i], p.ms); }, t);
      acc += p.ms; t += p.ms;
      (function (i, pct, p) { setTimeout(function () { lis[i].classList.remove("is-running"); lis[i].classList.add("is-done"); if (p.warn) { lis[i].classList.add("has-warn"); warnToast(D.uploadWarning); } $("em", lis[i]).textContent = p.done; bar.style.width = pct + "%"; }, t); })(i, Math.round(acc / sum * 100), p);
    });
    setTimeout(function () { $("#proc-chip").textContent = "Done"; $("#proc-chip").className = "chip chip--ok"; }, t);
    setTimeout(onDone, t + 600);
  }
  function tickSolve(li, ms) { var em = $("em", li), n = 0, steps = 10, iv = setInterval(function () { n++; em.textContent = "iteration " + (n * 40) + " · objective " + (0.62 + n * 0.031).toFixed(2); if (n >= steps) clearInterval(iv); }, ms / steps); }
  function startProcessing() {
    if (!S.runFile || S.busy) return;
    S.busy = true; runForm.hidden = true; runProg.hidden = false;
    $("#proc-file").textContent = S.runFile.name; $("#proc-sub").textContent = D.region.name + " · " + D.period.label; $("#proc-note").hidden = false;
    runStages(D.stages, function () {
      S.busy = false; S.ran = true; S.version = "v1"; resetDecisions(); S.exported = false; S.sent = false; S.sel = { cur: null, opt: null }; S.view = "opt"; S.week = 1;
      $$("#plan-seg button").forEach(function (b) { b.classList.toggle("is-active", b.dataset.plan === "opt"); });
      log("Plan v1 optimized: " + D.region.name + ", " + D.period.label, D.zones.length + " zones · " + D.techs.length + " technicians · " + kpis("v1").fleet.jobs.toLocaleString("en-US") + " visits placed · 2 flags", "");
      log("Input validated: " + S.runFile.name, "7 sheets · 1 warning (home location missing for 2 technicians)", "warn");
      runModal.hidden = true; hideWarn();
      renderAll();
      toast("<b>Plan v1 is ready.</b> " + D.zones.filter(function (z) { return zoneTechs("v1", z.id).some(function (e) { return e.kind !== "default"; }); }).length + " of 12 zones changed · 2 flags for you to look at.", 4200);
      tour.next();
    });
  }
  $("#run-go").addEventListener("click", function () { tour.after("optimize"); startProcessing(); });
  function reoptimize() {
    if (S.busy || optKey() !== "v1") return;
    S.busy = true; $("#run-title").textContent = "Re-optimize with feedback"; runForm.hidden = true; runProg.hidden = false; $("#proc-note").hidden = true;
    $("#proc-file").textContent = "Plan v1 + dispatcher feedback"; $("#proc-sub").textContent = D.zones.filter(function (z) { return S.decisions[z.id].status === "rejected"; }).length + " rejected zone · " + D.zones.filter(function (z) { return S.decisions[z.id].comment; }).length + " comment · minimal disruption on";
    runModal.hidden = false;
    runStages(D.reoptStages, function () {
      S.busy = false; S.version = "v2";
      ["HV-09", "HV-10"].forEach(function (z) { var d = S.decisions[z]; d.status = "reproposed"; });
      log("Plan v2 re-optimized with feedback", "HV-09 Marsh End keeps its Wednesday coverage · HV-10 Southbank overflow → T-1053 · 2 zones re-proposed · " + USER, "ok");
      runModal.hidden = true; S.sel = { cur: null, opt: null };
      renderAll();
      toast("<b>Plan v2.</b> Marsh End's average wait is back to 5.0 d; two zones are re-proposed for your decision. Fleet productivity: 4.77 → 4.75 jobs/day.", 5200);
      tour.next();
    });
  }
  $("#btn-reopt").addEventListener("click", function () { tour.after("reopt"); reoptimize(); });

  /* ---------------- export ---------------- */
  function exportRows(pk) {
    var rows = [];
    D.techs.forEach(function (t) {
      techZones(pk, t.id).forEach(function (e) {
        if (e.kind === "off") return;
        var dows = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
        e.dates.forEach(function (k) { dows[dayOf(k).dow] = 1; });
        var dec = S.decisions[e.zone];
        rows.push([t.id, "", e.zone, D.period.start, D.period.end, "100", "weekly", "1", e.kind === "default" || e.kind === "pinned" || e.kind === "backfill" ? "regular" : "temporary", dows.Mon, dows.Tue, dows.Wed, dows.Thu, dows.Fri, dows.Sat, dows.Sun, dec.status === "accepted" ? "Accepted" : dec.status === "rejected" ? "Rejected" : "Not decided", dec.comment || ""]);
      });
    });
    return rows;
  }
  function openExport() {
    var k = optKey(); if (!k) { toast("Run the optimization first — the export carries the optimized plan and your decisions."); return; }
    var rows = exportRows(k), acc = D.zones.filter(function (z) { return S.decisions[z.id].status === "accepted"; }).length, rej = D.zones.filter(function (z) { return S.decisions[z.id].status === "rejected"; }).length;
    $("#export-meta").innerHTML = '<span class="chip chip--muted">Template: work-zone assignment import v2</span><span class="chip chip--muted">Plan ' + k + '</span><span class="chip chip--muted">' + esc(D.period.label) + '</span><span class="chip ' + (acc === D.zones.length ? "chip--ok" : "chip--warn") + '">' + acc + " accepted · " + rej + " rejected · " + (D.zones.length - acc - rej) + " pending</span>";
    $("#export-table thead").innerHTML = "<tr>" + D.exportColumns.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr>";
    $("#export-table tbody").innerHTML = rows.slice(0, 16).map(function (r) { return "<tr>" + r.map(function (c, i) { return "<td" + (i >= 9 && i <= 15 ? ' class="num"' : "") + ">" + esc(c) + "</td>"; }).join("") + "</tr>"; }).join("") + (rows.length > 16 ? '<tr><td colspan="' + D.exportColumns.length + '" class="muted">… ' + (rows.length - 16) + " more rows</td></tr>" : "");
    $("#export-count").textContent = rows.length + " rows · " + D.techs.length + " technicians · " + D.zones.length + " zones · decisions and comments included";
    $("#export").hidden = false;
    tour.after("download");
  }
  $("#btn-download").addEventListener("click", openExport);
  $("#export-close").addEventListener("click", function () { $("#export").hidden = true; });
  $("#export-download").addEventListener("click", function () {
    var k = optKey(), rows = exportRows(k), file = "work-zone-assignment_harborview_" + D.period.start + "_" + k + ".xlsx";
    S.exported = true; log("Exported the plan", file + " · " + rows.length + " rows · " + USER, "ok");
    $("#export").hidden = true;
    toast(ICON.check + "<span><b>" + esc(file) + "</b> downloaded · " + rows.length + " rows in the field-service import format, with every decision and comment</span>", 4600);
    tour.after("export-dl");
  });
  $("#export-send").addEventListener("click", function () {
    var acc = D.zones.filter(function (z) { return S.decisions[z.id].status === "accepted"; }).length;
    if (!acc) { toast("Nothing accepted yet — accept zone allocations first; only accepted zones are written back."); return; }
    S.sent = true; log("Sent " + acc + " accepted zone allocations to the field-service system", "Connector: field-service system · rejected and pending zones stay on the current plan · " + USER, "ok");
    $("#export").hidden = true;
    toast(ICON.check + "<span>Queued for the field-service system · <b>" + acc + " accepted zone allocations</b> · rejected and pending zones stay on the current plan</span>", 4600);
  });

  /* ---------------- filters ---------------- */
  function renderFilters() {
    var fz = S.filters.zones, ft = S.filters.techs;
    $("#filter-zone .select-label").textContent = fz.length ? fz.length + " selected" : "All zones";
    $("#filter-tech .select-label").textContent = ft.length ? ft.length + " selected" : "All technicians";
    $("#filter-zone .chips-sel").innerHTML = fz.map(function (z) { return '<span class="chip chip--muted">' + esc(ZI[z].label) + '<button type="button" data-unsel="zone" data-id="' + z + '" aria-label="Remove">×</button></span>'; }).join("");
    $("#filter-tech .chips-sel").innerHTML = ft.map(function (t) { return '<span class="chip chip--muted">' + esc(t) + '<button type="button" data-unsel="tech" data-id="' + t + '" aria-label="Remove">×</button></span>'; }).join("");
  }
  function ddList(kind) {
    var wrap = $("#filter-" + kind), q = ($("input", wrap).value || "").toLowerCase(), sel = S.filters[kind === "zone" ? "zones" : "techs"];
    var items = kind === "zone" ? D.zones.map(function (z) { return { id: z.id, label: z.label, color: z.color }; }) : D.techs.map(function (t) { return { id: t.id, label: t.id + " · " + t.skill }; });
    var shown = items.filter(function (i) { return !q || i.label.toLowerCase().indexOf(q) >= 0; });
    $(".dd-list", wrap).innerHTML = '<li class="dd-all' + (sel.length === items.length ? " is-on" : sel.length ? " is-some" : "") + '" data-all="1"><i></i>Select all</li>' + shown.map(function (i) { return '<li data-id="' + i.id + '"' + (sel.indexOf(i.id) >= 0 ? ' class="is-on"' : "") + "><i></i>" + (i.color ? '<span class="zdot" style="background:' + i.color + '"></span>' : "") + esc(i.label) + "</li>"; }).join("");
  }
  $$(".filter").forEach(function (wrap) {
    var kind = wrap.id === "filter-zone" ? "zone" : "tech", btn = $(".select", wrap), dd = $(".dropdown", wrap);
    btn.addEventListener("click", function () { var open = dd.hidden; $$(".dropdown").forEach(function (d) { d.hidden = true; }); $$(".select").forEach(function (s) { s.classList.remove("is-open"); }); if (open) { ddList(kind); dd.hidden = false; btn.classList.add("is-open"); } });
    $("input", wrap).addEventListener("input", function () { ddList(kind); });
    $(".dd-list", wrap).addEventListener("click", function (e) {
      var li = e.target.closest("li"); if (!li) return;
      var key = kind === "zone" ? "zones" : "techs", all = kind === "zone" ? D.zones.map(function (z) { return z.id; }) : D.techs.map(function (t) { return t.id; });
      if (li.dataset.all) S.filters[key] = S.filters[key].length === all.length ? [] : all.slice();
      else { var i = S.filters[key].indexOf(li.dataset.id); if (i >= 0) S.filters[key].splice(i, 1); else S.filters[key].push(li.dataset.id); }
      ddList(kind); renderFilters(); renderMaps(); renderSchedule();
    });
    wrap.addEventListener("click", function (e) { var b = e.target.closest("[data-unsel]"); if (!b) return; var key = b.dataset.unsel === "zone" ? "zones" : "techs"; S.filters[key] = S.filters[key].filter(function (x) { return x !== b.dataset.id; }); renderFilters(); renderMaps(); renderSchedule(); });
  });
  document.addEventListener("click", function (e) { if (!e.target.closest(".filter")) { $$(".dropdown").forEach(function (d) { d.hidden = true; }); $$(".select").forEach(function (s) { s.classList.remove("is-open"); }); } });
  $("#btn-filters").addEventListener("click", function () { var f = $("#filters"); f.hidden = !f.hidden; $("#btn-filters").setAttribute("aria-expanded", String(!f.hidden)); tour.reposition(); });
  $("#btn-reset").addEventListener("click", function () { S.filters = { zones: [], techs: [] }; S.sel = { cur: null, opt: null }; S.week = 1; setView("opt"); setSched("zone"); renderFilters(); toast("Filters, selection and views reset — the plan and your decisions are kept."); });

  /* ---------------- drawers: runs, settings ---------------- */
  function timeline(items) { return '<ol class="timeline">' + items.map(function (h) { return "<li" + (h.kind ? ' class="' + h.kind + '"' : "") + "><time>" + esc(h.time) + "</time><i></i><div><strong>" + esc(h.text) + "</strong><span>" + esc(h.sub) + "</span></div></li>"; }).join("") + "</ol>"; }
  function openDrawer(panel) {
    var body = "";
    if (panel === "runs") {
      $("#drawer-eyebrow").textContent = "Runs and history"; $("#drawer-title").textContent = D.region.name;
      body = timeline(S.history.concat(D.priorHistory));
    } else {
      var st = D.settings;
      $("#drawer-eyebrow").textContent = "Optimization settings"; $("#drawer-title").textContent = D.region.name + " · rule set";
      body = '<div class="set-block"><h3>Planning</h3><dl class="set-kv"><dt>Mode</dt><dd>' + esc(st.mode) + "</dd><dt>Horizon</dt><dd>" + esc(st.horizon) + "</dd><dt>Capacity</dt><dd>" + esc(st.capacity) + '</dd><dt>Disruption</dt><dd><span class="toggle"><i></i>Minimal disruption of the current allocation</span></dd></dl></div>';
      body += '<div class="set-block"><h3>Objectives and weights</h3>' + st.objectives.map(function (o) { return '<div class="obj"><span><b>' + esc(o.name) + "</b><em>" + esc(o.desc) + '</em></span><i><b style="width:' + o.weight + '%"></b></i><span class="w">' + o.weight + "</span></div>"; }).join("") + "</div>";
      body += '<div class="set-block"><h3>Rules and guardrails</h3><ul class="rules">' + st.rules.map(function (r) { return "<li><b>" + esc(r.name) + '</b><span class="chip ' + (r.type === "Hard" ? "chip--bad" : "chip--muted") + '">' + esc(r.type) + "</span><span>" + esc(r.desc) + "</span></li>"; }).join("") + "</ul></div>";
      body += '<div class="set-block"><h3>Regions</h3><ul class="set-list">' + st.regions.map(function (r) { return "<li><b>" + esc(r.name) + "</b><span>" + esc(r.state) + " · " + r.zones + " zones · " + r.techs + " technicians</span></li>"; }).join("") + "</ul></div>";
      body += '<div class="set-block"><h3>Connectors</h3><ul class="set-list">' + st.connectors.map(function (c) { return "<li><b>" + esc(c.name) + '</b><span class="chip ' + (c.state === "Connected" ? "chip--ok" : "chip--muted") + '">' + esc(c.state) + "</span><span>" + esc(c.dir) + "</span></li>"; }).join("") + "</ul></div>";
      body += '<p class="muted" style="font-size:12px">Read-only in this walkthrough. Rule sets, weights and connectors are configured per region during roll-out.</p>';
    }
    $("#drawer-body").innerHTML = body; $("#drawer").hidden = false;
    $$(".rail-item").forEach(function (b) { b.classList.toggle("is-active", b.dataset.panel === panel); });
  }
  function closeDrawer() { $("#drawer").hidden = true; $$(".rail-item").forEach(function (b) { b.classList.toggle("is-active", b.dataset.panel === "dashboard"); }); }
  $$(".rail-item").forEach(function (b) { b.addEventListener("click", function () { if (b.dataset.panel === "dashboard") closeDrawer(); else openDrawer(b.dataset.panel); }); });
  $("#drawer-close").addEventListener("click", closeDrawer);
  $("#drawer").addEventListener("click", function (e) { if (e.target === $("#drawer")) closeDrawer(); });

  /* ---------------- toasts ---------------- */
  var toastT;
  function toast(html, ms) {
    var t = $("#toast"); t.innerHTML = /^</.test(html) ? html : "<span>" + html + "</span>"; t.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, ms || 3400);
  }
  var warnT;
  function warnToast(w) { var t = $("#warn-toast"); t.innerHTML = "<strong>" + ICON.warn + esc(w.title) + "</strong>" + esc(w.text) + '<button class="icon-btn" type="button" aria-label="Dismiss" data-dismiss-warn>' + ICON.x + "</button>"; t.hidden = false; clearTimeout(warnT); warnT = setTimeout(hideWarn, 9000); }
  function hideWarn() { $("#warn-toast").hidden = true; }
  $("#warn-toast").addEventListener("click", function (e) { if (e.target.closest("[data-dismiss-warn]")) hideWarn(); });

  function renderAll() { renderPlanState(); renderFilters(); renderMaps(); renderSchedule(); }

  /* ---------------- tour ---------------- */
  var STEPS = [
    { id: "run", major: 1, side: "bottom", title: "Run the optimization", body: "The dashboard shows today's allocation from the field-service system. Click Run optimization to plan the next four weeks.", target: function () { return $("#btn-run"); }, auto: openRun },
    { id: "file", major: 1, side: "right", title: "Attach the period's file", body: "Region and period are set. The technicians, skills, calendars, zones and booked visits come in one XLSX — click the file field and choose the prepared one. Nothing is really uploaded.", target: function () { return $("#run-file"); }, anchor: function () { return $("#run-file"); }, auto: function () { openPicker(); } },
    { id: "pick", major: 1, side: "right", title: "Choose the Harborview file", body: "Pick the highlighted file.", target: function () { return $("#picker-list li.is-main"); }, auto: function () { selectFile(0); } },
    { id: "open", major: 1, side: "top", title: "Open it", body: "The file is attached to the run.", target: function () { return $("#picker-open"); }, auto: openFile },
    { id: "optimize", major: 1, side: "top", title: "Optimize", body: "The input is validated, the travel matrix and the rules are loaded, the GPU solver places every visit, and the KPIs are computed before and after — watch the stages.", target: function () { return $("#run-go"); }, auto: startProcessing },
    { id: "zone", major: 2, side: "left", title: "Read the plan on the map", body: "Every zone shows its technicians and booked visits; dashed outlines mark zones the solver changed. Click Old Harbour (HV-11) to open its details.", target: function () { return $('.mapcard[data-card="opt"] .zone[data-zone="HV-11"]'); }, auto: function () { selectZone("opt", "HV-11"); } },
    { id: "compare", major: 3, side: "bottom", title: "Compare with today's plan", body: "Details list each technician with visits and days, the non-movable appointments the solver kept, and why every change was made. Now switch to Compare.", target: function () { return $('#plan-seg [data-plan="compare"]'); }, auto: function () { setView("compare"); } },
    { id: "zone-cmp", major: 3, side: "left", title: "Look at what changed", body: "Current on the left, optimized on the right. Click Marsh End (HV-09) on the optimized map — the solver moved its technician to Southbank on Wednesdays, and its wait time got worse.", target: function () { return $('.mapcard[data-card="opt"] .zone[data-zone="HV-09"]'); }, auto: function () { selectZone("opt", "HV-09"); } },
    { id: "techview", major: 4, side: "top", title: "Check the KPIs per technician", body: "Capacity and jobs per day are computed the same way for both plans. Switch the schedule to Technician view.", target: function () { return $('#view-seg [data-view="tech"]'); }, auto: function () { setSched("tech"); } },
    { id: "tech-row", major: 4, side: "top", title: "Open an over-capacity day", body: "T-1048 had 8 visits on one day against a capacity of 7. Click the row — the details on the map explain how the plan fixed it.", target: function () { return $('#grid tr[data-tech="T-1048"]'); }, auto: function () { selectTech("opt", "T-1048"); } },
    { id: "zoneview", major: 5, side: "top", title: "Resolve the exception", body: "Decisions are made per zone for the whole period. Switch back to Zone view.", target: function () { return $('#view-seg [data-view="zone"]'); }, auto: function () { setSched("zone"); } },
    { id: "reject", major: 5, side: "left", title: "Reject Marsh End's allocation", body: "Its average wait rises from 5.1 to 6.4 days — the coastal run cannot slip to Thursday. Click Reject.", target: function () { return $('#grid tr[data-zone="HV-09"] [data-decide="rejected"]'); }, auto: function () { decide("HV-09", "rejected"); } },
    { id: "comment", major: 5, side: "left", title: "Tell the solver why", body: "A comment travels with the decision into the export and the next run. Click Comment.", target: function () { return $('#grid tr[data-zone="HV-09"] [data-comment]'); }, auto: function () { openComment("HV-09"); } },
    { id: "save", major: 5, side: "top", title: "Save the comment", body: "The note is drafted for you. Save it.", target: function () { return $("#comment-save"); }, anchor: function () { return $("#comment-save"); }, auto: saveComment },
    { id: "reopt", major: 5, side: "bottom", title: "Re-optimize with the feedback", body: "The rejection and the comment become a constraint; the solver re-plans with minimal disruption to the ten zones you did not touch.", target: function () { return $("#btn-reopt"); }, auto: reoptimize },
    { id: "accept-all", major: 6, side: "bottom", title: "Accept everything else", body: "Plan v2 keeps Marsh End covered on Wednesdays. Accept remaining takes every pending zone that carries no flag — a flagged zone always waits for a person.", target: function () { return $("#btn-accept-remaining"); }, auto: acceptRemaining },
    { id: "download", major: 6, side: "bottom", title: "Export the plan", body: "Click Download to see the work-zone assignment file in the field-service system's import format.", target: function () { return $("#btn-download"); }, auto: openExport },
    { id: "export-dl", major: 6, side: "top", title: "Download the file", body: "One row per technician and zone, the weekdays it applies to, and every decision and comment. The same rows can be sent to the connected field-service system directly.", target: function () { return $("#export-download"); }, anchor: function () { return $("#export-download"); }, auto: function () { $("#export-download").click(); } }
  ];
  var MAJORS = 6;
  var tour = {
    active: false, i: 0, el: $("#tour"), target: null, tries: 0,
    start: function () { this.active = true; this.i = 0; document.body.classList.add("tour-on"); $("#tour-pill").hidden = false; $("#tour-toggle").textContent = "Exit guide"; this.show(); },
    show: function () {
      var st = STEPS[this.i], self = this, t = st.target();
      if (!t) { if (this.tries++ < 60) return void requestAnimationFrame(function () { self.show(); }); return; }
      this.tries = 0;
      if (this.target) this.target.classList.remove("tour-target");
      this.target = t; t.classList.add("tour-target");
      $("#tour-step").textContent = "Step " + st.major + " of " + MAJORS;
      $("#tour-title").textContent = st.title; $("#tour-body").textContent = st.body;
      var bars = ""; for (var k = 1; k <= MAJORS; k++) bars += '<i class="' + (k <= st.major ? "is-done" : "") + '"></i>';
      $("#tour-progress").innerHTML = bars;
      this.el.hidden = false; this.el.dataset.side = st.side;
      try { t.scrollIntoView({ block: "center", behavior: "smooth", inline: "nearest" }); } catch (e) {}
      this.reposition(); setTimeout(function () { self.reposition(); }, 350); setTimeout(function () { self.reposition(); }, 750);
    },
    after: function (id) { if (!this.active || !id) return; if (STEPS[this.i].id === id) this.next(); },
    next: function () {
      if (!this.active) return;
      var cur = STEPS[this.i].id;
      if ((cur === "optimize" && S.busy) || (cur === "reopt" && S.busy)) { this.el.hidden = true; if (this.target) { this.target.classList.remove("tour-target"); this.target = null; } return; }
      this.i++;
      if (this.i >= STEPS.length) return this.finish();
      var self = this; setTimeout(function () { self.show(); }, 260);
    },
    skip: function () { var st = STEPS[this.i]; if (st && st.auto) st.auto(); },
    exit: function () { this.active = false; this.el.hidden = true; if (this.target) this.target.classList.remove("tour-target"); this.target = null; document.body.classList.remove("tour-on"); $("#tour-pill").hidden = true; $("#tour-toggle").textContent = "Restart walkthrough"; },
    finish: function () {
      this.exit();
      var g = $("#gate");
      $("#gate-title").textContent = "That is the whole loop";
      $("#gate-body").innerHTML = "Four weeks planned in one run, one exception caught and fed back, and a dispatcher decided every zone that left. Still open for you: Stonebridge (HV-07) is allocated on last year's demand for three dates and waits for a decision; Filters narrow the map and the schedule to a few zones or one technician; the Runs panel keeps the audit trail; Settings shows the rules, objectives, regions and connectors; and the export can be sent straight to the field-service system.<ol><li>Run the optimization on the period's data</li><li>Read the plan on the map, zone by zone</li><li>Compare it with today's allocation</li><li>Check the KPIs, before and after</li><li>Reject, comment, re-optimize</li><li>Accept and export to the field-service system</li></ol>";
      $("#gate-start").textContent = "Replay the walkthrough"; $("#gate-free").textContent = "Keep exploring";
      $("#gate-start").onclick = function () { location.href = location.pathname; };
      $("#gate-free").onclick = function () { g.hidden = true; };
      g.hidden = false;
    },
    reposition: function () {
      if (!this.active || !this.target || this.el.hidden) return;
      if (!document.body.contains(this.target)) { var t = STEPS[this.i].target(); if (t) { this.target.classList.remove("tour-target"); this.target = t; t.classList.add("tour-target"); } else return; }
      var anchor = (STEPS[this.i].anchor && STEPS[this.i].anchor()) || this.target;
      var r = anchor.getBoundingClientRect(), w = 300, h = this.el.offsetHeight || 150, gap = 16, s = STEPS[this.i].side, top, left;
      var fits = { right: r.right + gap + w < innerWidth, left: r.left - gap - w > 0, bottom: r.bottom + gap + h < innerHeight, top: r.top - gap - h > 0 };
      if (!fits[s]) s = ["right", "left", "bottom", "top"].filter(function (k) { return fits[k]; })[0] || "bottom";
      if (s === "right") { left = r.right + gap; top = r.top - 10; }
      if (s === "left") { left = r.left - gap - w; top = r.top - 10; }
      if (s === "bottom") { left = r.left; top = r.bottom + gap; }
      if (s === "top") { left = r.left; top = r.top - gap - h; }
      top = Math.max(8, Math.min(innerHeight - h - 8, top)); left = Math.max(8, Math.min(innerWidth - w - 8, left));
      this.el.style.top = top + "px"; this.el.style.left = left + "px"; this.el.dataset.side = s;
    },
    nudge: function () { var self = this; this.el.classList.remove("is-nudge"); void this.el.offsetWidth; this.el.classList.add("is-nudge"); setTimeout(function () { self.el.classList.remove("is-nudge"); }, 400); }
  };
  document.addEventListener("click", function (e) {
    if (!tour.active || !tour.target) return;
    if (e.target.closest("#tour, #tour-toggle, #gate, #warn-toast")) return;
    var el = e.target.closest("button, a, tr.clickable, .zone, .home, li[data-file], .dd-list li, .select, input, label, select, textarea, .d-item-head");
    if (!el) return;
    if (tour.target.contains(el) || el.contains(tour.target)) return;
    e.preventDefault(); e.stopPropagation(); tour.nudge();
  }, true);
  window.addEventListener("resize", function () { tour.reposition(); });
  document.addEventListener("scroll", function () { tour.reposition(); }, true);
  $("#tour-skip").addEventListener("click", function () { tour.skip(); });
  $("#tour-toggle").addEventListener("click", function () { if (tour.active) tour.exit(); else location.href = location.pathname; });

  /* ---------------- keyboard ---------------- */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape" || tour.active) return;
    if (!picker.hidden) { picker.hidden = true; return; }
    if (!$("#comment").hidden) { $("#comment").hidden = true; return; }
    if (!$("#export").hidden) { $("#export").hidden = true; return; }
    if (!runModal.hidden && !S.busy) { runModal.hidden = true; return; }
    if (!$("#drawer").hidden) { closeDrawer(); return; }
    if (!$("#gate").hidden) { $("#gate").hidden = true; return; }
    if (S.sel.cur || S.sel.opt) { S.sel = { cur: null, opt: null }; renderMaps(); renderSchedule(); }
  });

  /* ---------------- boot ---------------- */
  function primeSolved(version, decided) {
    S.ran = true; S.version = version; resetDecisions();
    if (version === "v2") { S.decisions["HV-09"].status = "rejected"; S.decisions["HV-09"].comment = D.suggestedComment; S.decisions["HV-09"].status = "reproposed"; S.decisions["HV-10"].status = "reproposed"; }
    if (decided) D.zones.forEach(function (z) { if (!zoneFlag(version, z.id)) S.decisions[z.id].status = "accepted"; });
    log("Plan v1 optimized: " + D.region.name + ", " + D.period.label, D.zones.length + " zones · " + D.techs.length + " technicians · " + kpis("v1").fleet.jobs.toLocaleString("en-US") + " visits placed · 2 flags", "");
    if (version === "v2") log("Plan v2 re-optimized with feedback", "HV-09 Marsh End keeps its Wednesday coverage · 2 zones re-proposed · " + USER, "ok");
  }
  if (params.get("ui") === "clean") { $("#tour-toggle").hidden = true; } /* screenshot mode: product UI only */
  var state = params.get("state");
  if (params.get("tour") === "off") {
    tour.exit(); $("#gate").hidden = true;
    if (state !== "start") primeSolved(state === "final" || state === "v2" ? "v2" : "v1", state === "final");
  } else {
    $("#gate").hidden = false;
    $("#gate-start").addEventListener("click", function () { $("#gate").hidden = true; tour.start(); });
    $("#gate-free").addEventListener("click", function () { $("#gate").hidden = true; tour.exit(); if (!S.ran) { primeSolved("v1", false); renderAll(); } });
  }
  if (params.get("view") === "tech") S.sched = "tech";
  if (params.get("plan")) S.view = params.get("plan");
  if (params.get("week")) S.week = Math.max(1, Math.min(D.weeks.length, +params.get("week") || 1));
  $$("#view-seg button").forEach(function (b) { b.classList.toggle("is-active", b.dataset.view === S.sched); });
  $$("#plan-seg button").forEach(function (b) { b.classList.toggle("is-active", b.dataset.plan === S.view); });
  if (params.get("filters") === "open") { $("#filters").hidden = false; $("#btn-filters").setAttribute("aria-expanded", "true"); }
  renderAll();
  window.DEMO = { state: S, tour: tour, selectZone: selectZone, selectTech: selectTech, setView: setView, setSched: setSched, kpis: kpis, alloc: alloc, openRun: openRun, openExport: openExport, openDrawer: openDrawer };
})();
