/* Cross-system ERP Q&A — interactive walkthrough.
   Three product surfaces (Autonomous AI Lakehouse · Data Studio, AI Data
   Platform · Agent Hub, and a Redwood "Mapping review" app) under one neutral
   workspace switcher, plus the six-step guided tour.

   Every number on screen comes from window.ERPQA_DATA: computeKpis(state) for
   the health band, answer(qid, role, decisions) for each answer, and
   applyDecision(state, decision) for the steward's fix — so rejecting the
   Orion match recomputes the band, the duplicate list and the affected
   answers in one pass, exactly as tools/erp-qa-check.js asserts. */
(function () {
  "use strict";
  var D = window.ERPQA_DATA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s === null || s === undefined ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var params = new URLSearchParams(location.search);

  var ICON = {
    home: '<svg viewBox="0 0 24 24"><path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/></svg>',
    load: '<svg viewBox="0 0 24 24"><path d="M12 16V5M8 9l4-4 4 4"/><path d="M4 19h16"/></svg>',
    wand: '<svg viewBox="0 0 24 24"><path d="M5 19 16 8"/><path d="M15 4v4M13 6h4M18 12v3M16.5 13.5h3"/></svg>',
    chart: '<svg viewBox="0 0 24 24"><path d="M4 20V9M10 20V4M16 20v-7M22 20H3"/></svg>',
    bulb: '<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3Z"/></svg>',
    book: '<svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5Z"/></svg>',
    store: '<svg viewBox="0 0 24 24"><path d="M4 9h16l-1 11H5Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>',
    share: '<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.4"/><circle cx="17" cy="6" r="2.4"/><circle cx="17" cy="18" r="2.4"/><path d="M8.2 10.9 14.8 7.2M8.2 13.1l6.6 3.7"/></svg>',
    gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="m12 4 2.3 4.9 5.2.7-3.8 3.6 1 5.2-4.7-2.6-4.7 2.6 1-5.2L4.5 9.6l5.2-.7Z"/></svg>',
    chev: '<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>',
    chevd: '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
    chevl: '<svg viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></svg>',
    grid: '<svg viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="15" rx="1.5"/><path d="M3.5 9.5h17M9 9.5v10"/></svg>',
    view: '<svg viewBox="0 0 24 24"><path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.6"/></svg>',
    refresh: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.5-5.8"/><path d="M4 4v5h5"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l10-6.5z"/></svg>',
    stack: '<svg viewBox="0 0 24 24"><path d="m12 3 8 4.5-8 4.5-8-4.5Z"/><path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5"/></svg>',
    bot: '<svg viewBox="0 0 24 24"><rect x="4" y="7.5" width="16" height="12" rx="3"/><path d="M12 3.5v4M9 13h.01M15 13h.01M9.5 16.5h5"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
    code: '<svg viewBox="0 0 24 24"><path d="m9 8-5 4 5 4M15 8l5 4-5 4"/></svg>',
    route: '<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M6 8.5v5a3 3 0 0 0 3 3h6.5"/></svg>',
    info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.01"/></svg>',
    speak: '<svg viewBox="0 0 24 24"><path d="M5 9.5h3l4-3.5v12l-4-3.5H5Z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="m5 12 4.5 4.5L19 7"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    merge: '<svg viewBox="0 0 24 24"><path d="M6 4v5a4 4 0 0 0 4 4h8M18 4v5a4 4 0 0 1-4 4"/><path d="m15 10 3 3-3 3"/></svg>',
    shield: '<svg viewBox="0 0 24 24"><path d="M12 3.5 5 6v6c0 4.2 3 7 7 8.5 4-1.5 7-4.3 7-8.5V6Z"/><path d="m9 12 2 2 4-4"/></svg>',
    lock: '<svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>',
    mic: '<svg viewBox="0 0 24 24"><rect x="9.5" y="3.5" width="5" height="10" rx="2.5"/><path d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21"/></svg>',
    clip: '<svg viewBox="0 0 24 24"><path d="M17 8.5 10 15.5a2.5 2.5 0 0 0 3.5 3.5l7-7a5 5 0 0 0-7-7l-7 7a7.5 7.5 0 0 0 10.5 10.5"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    list: '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h11"/></svg>',
    ledger: '<svg viewBox="0 0 24 24"><rect x="4" y="3.5" width="16" height="17" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>'
  };

  var SYS_ENTITY = { "NG-EU": "FUSION", "NG-NA": "JDE", "NG-SV": "NETSUITE", GROUP: "CRM" };
  var CAT_OF = {}; D.sources.forEach(function (s) { CAT_OF[s.id] = s.catalog; });

  /* ------------------------------------------------------------- state */
  var S = {
    app: "lakehouse",
    dsScreen: "catalog",          /* catalog | feeds */
    dsCatalogs: D.sources.map(function (s) { return s.id; }),
    wbPanel: "home",              /* home | conversation | insights | catalog | sessions */
    rwTab: "matches",             /* matches | accounts | decisions */
    role: "CONTROLLER",
    qid: null,
    panel: null,                  /* trace | explore | explain | code */
    exploreKey: null,
    narrate: false,
    state: D.initialState(),
    pending: [],                  /* steward decisions taken but not yet re-resolved */
    log: [],                      /* applied decision rows, newest first */
    openProp: null,
    lastRun: "08:40",
    refreshedNow: false,
    busy: false,
    published: []
  };

  function money(n, dp) { if (n === null || n === undefined) return "—"; return Number(n).toLocaleString("en-US", { minimumFractionDigits: dp === undefined ? 2 : dp, maximumFractionDigits: dp === undefined ? 2 : dp }); }
  function kpis() { return D.computeKpis(S.state); }
  function decisions() { return S.state.decisions; }
  function ans(qid) { return D.answer(qid || S.qid || "q1", S.role, decisions()); }
  function persona() { return D.personas.filter(function (p) { return p.role === S.role; })[0]; }

  /* ===================================================================== */
  /* toast                                                                 */
  /* ===================================================================== */
  var toastT;
  function toast(html, ms) {
    var t = $("#toast");
    t.innerHTML = html;
    t.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(function () { t.hidden = true; }, ms || 4200);
  }
  $("#toast").addEventListener("click", function (e) {
    var b = e.target.closest("[data-toast-go]");
    if (!b) return;
    $("#toast").hidden = true;
    setApp(b.dataset.toastGo);
    tour.after("open-review");
  });

  /* ===================================================================== */
  /* app switcher                                                          */
  /* ===================================================================== */
  function setApp(app) {
    S.app = app;
    $$(".app").forEach(function (s) { s.hidden = s.dataset.app !== app; });
    $$(".ws-tab").forEach(function (b) {
      var on = b.dataset.go === app;
      b.classList.toggle("is-active", on);
      if (on) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    });
    if (app === "lakehouse") renderDs();
    if (app === "aidp") renderWb();
    if (app === "review") renderRw();
    tour.reposition();
  }
  $("#ws-tabs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-go]");
    if (!b) return;
    setApp(b.dataset.go);
    tour.after(b.dataset.go === "aidp" ? (tour.stepId() === "to-aidp-2" ? "to-aidp-2" : "to-aidp") : b.dataset.go === "review" ? "to-review" : "");
  });

  /* ===================================================================== */
  /* 1. DATA STUDIO                                                        */
  /* ===================================================================== */
  var DS_NAV = [
    { id: "overview", label: "Overview", icon: "home" },
    { id: "feeds", label: "Data Load", icon: "load", chev: true },
    { id: "assist", label: "Table AI Assist", icon: "wand" },
    { id: "analysis", label: "Analysis", icon: "chart" },
    { id: "insights", label: "Insights", icon: "bulb" },
    { id: "catalog", label: "Catalog", icon: "book" },
    { id: "market", label: "Marketplace", icon: "store" },
    { id: "dshare", label: "Data Share", icon: "share", chev: true }
  ];
  function renderDsNav() {
    $("#ds-nav").innerHTML = DS_NAV.map(function (n) {
      return '<button class="ds-item' + (n.id === S.dsScreen ? " is-active" : "") + '" type="button" data-ds="' + n.id + '">' + ICON[n.icon] + "<span>" + esc(n.label) + "</span>" + (n.chev ? '<span class="chev">' + ICON.chev + "</span>" : "") + "</button>";
    }).join("") + '<div class="ds-navfoot"><button class="ds-item" type="button" data-ds="settings">' + ICON.gear + "<span>Settings</span></button>" +
      '<button class="ds-item" type="button" data-ds="collapse"><span style="opacity:.7">&laquo;</span><span>Collapse</span></button></div>';
  }
  $("#ds-nav").addEventListener("click", function (e) {
    var b = e.target.closest("[data-ds]");
    if (!b) return;
    var id = b.dataset.ds;
    if (id === "catalog" || id === "feeds") { S.dsScreen = id; renderDs(); return; }
    toast("This walkthrough carries two Data Studio screens: <b>Catalog</b> and <b>Data Load &rsaquo; Feeds</b>.");
  });

  var OBJ_DESC = {
    AP_INVOICES_ALL: "payables invoice headers", AP_INVOICE_LINES_ALL: "payables invoice distribution lines",
    POZ_SUPPLIERS: "the supplier master", POZ_SUPPLIER_SITES_ALL_M: "supplier sites and pay-to addresses",
    HZ_PARTIES: "the trading-community party behind each supplier", GL_BALANCES: "general-ledger period balances",
    GL_CODE_COMBINATIONS: "account code combinations", GL_LEDGERS: "ledgers and their currencies",
    GL_PERIODS: "accounting-calendar periods", GL_DAILY_RATES: "daily and period-average exchange rates",
    F0411: "the accounts-payable ledger", F0101: "the address-book master", F0911: "account-ledger transactions",
    F0901: "the account master", F0006: "the business-unit master", F0010: "company constants", F0008: "date fiscal patterns",
    vendor: "vendor records", transaction: "transaction headers", transactionLine: "transaction lines",
    account: "the chart of accounts", subsidiary: "subsidiaries", customer: "customer records",
    CRB_CONTRACTS: "supplier contracts", CRB_REBATE_TERMS: "rebate thresholds and rates",
    CRB_SUPPLIER_XREF: "the contract to golden-supplier cross-reference",
    CRM_ACCOUNT: "accounts and their tier", CRM_OPPORTUNITY: "open opportunities"
  };
  function entities() {
    var out = [];
    D.views.forEach(function (v, i) {
      out.push({
        kind: "View", catalog: "LAKEHOUSE", schema: "GOLD", name: v.id, owner: "GROUP_FINANCE",
        desc: v.definition, rows: 0, fresh: S.refreshedNow ? 0 : 60, sortKey: i
      });
    });
    D.sources.forEach(function (s) {
      var n = s.objects.length;
      s.objects.forEach(function (o, i) {
        var share = (i === 0 ? 0.42 : i === 1 ? 0.24 : 0.34 / Math.max(1, n - 2));
        out.push({
          kind: "Table", catalog: s.catalog, schema: s.id === "CRM" ? "ICEBERG" : s.short.toUpperCase().replace(/[^A-Z]/g, ""), name: o,
          owner: s.entity, desc: "The table " + o + " provides a listing of " + (OBJ_DESC[o] || "records") + " in " + s.name + " for " + s.entityName + ".",
          rows: Math.max(24, Math.round(s.rowCount * share)), fresh: s.freshnessMin + i, sortKey: 100 + i, src: s.id
        });
      });
    });
    return out;
  }
  function freshLabel(min) {
    if (min <= 0) return "Updated few moments ago";
    if (min < 60) return "Updated " + min + " min ago";
    return "Updated " + Math.floor(min / 60) + " h " + ("0" + (min % 60)).slice(-2) + " min ago";
  }
  function renderDsCatalog() {
    var all = entities().filter(function (e) { return e.kind === "View" || S.dsCatalogs.indexOf(e.src) >= 0; });
    var groups = [["View", all.filter(function (e) { return e.kind === "View"; })], ["Table", all.filter(function (e) { return e.kind === "Table"; })]];
    var chips = D.sources.map(function (s) {
      var on = S.dsCatalogs.indexOf(s.id) >= 0;
      if (!on) return "";
      return '<span class="ds-cat">' + esc(s.catalog) + ' <em>' + esc(s.id === "CRM" ? "Iceberg" : "All Schemas") + '</em><button type="button" data-drop="' + s.id + '" aria-label="Remove ' + esc(s.catalog) + ' from scope">&times;</button></span>';
    }).join("");
    var list = groups.map(function (g) {
      if (!g[1].length) return "";
      return '<div class="ds-group">' + (g[0] === "View" ? ICON.view : ICON.grid) + esc(g[0]) + "</div>" + g[1].map(function (e) {
        return '<div class="ds-row"><span class="ds-av">' + esc(e.name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()) + "</span>" +
          '<div><div class="ds-chips">' + ICON.stack + esc(e.catalog) + " <i>&middot; " + esc(e.schema) + "</i></div>" +
          '<span class="ds-ent">' + esc(e.name) + "</span>" +
          '<span class="ds-desc">' + esc(e.desc) + "</span>" +
          (e.rows ? '<span class="ds-rows">' + e.rows.toLocaleString("en-US") + " rows</span>" : '<span class="ds-rows">certified &middot; Group Finance</span>') + "</div>" +
          '<span class="ds-upd">' + ICON.clock + esc(freshLabel(e.fresh)) + "</span></div>";
      }).join("");
    }).join("");
    if (!all.length) list = '<div class="ds-empty">No catalog in scope — add one back to see its entities.</div>';
    $("#ds-crumb").textContent = "Catalog";
    $("#ds-page").innerHTML =
      '<div class="ds-chiprow">' + chips + '<button class="ds-btn" type="button" data-all="1">Select Catalogs ...</button>' +
      '<span class="ds-right"><button class="ds-btn" type="button" data-manage="1">Manage Catalogs</button><span class="ds-ico">' + ICON.gear + '</span><span class="ds-ico">' + ICON.star + "</span></span></div>" +
      '<div class="ds-searchrow"><div class="ds-searchbox"><input type="search" placeholder="Search ..." aria-label="Search the catalog"><span class="ds-mag"></span></div></div>' +
      '<div class="ds-pills">' + ["Tables and Views", "Data Objects", "Files", "Connections", "All"].map(function (p, i) { return '<button class="ds-pill' + (i === 0 ? " is-on" : "") + '" type="button">' + esc(p) + "</button>"; }).join("") + "</div>" +
      '<div class="ds-meta"><b>Showing ' + all.length + ' entities</b><span class="ds-sort">Sort By: Updated (Newest to Oldest) ' + ICON.chevd + ICON.refresh + "</span></div>" +
      '<div class="ds-cols"><aside class="ds-filters"><h3>Filters</h3>' +
      '<div class="ds-facet"><b>' + ICON.chevd + "Entity type</b><div class=\"sub\">Data</div>" +
      '<label><input type="checkbox" checked>' + ICON.view + " View (" + groups[0][1].length + ")</label>" +
      '<label><input type="checkbox" checked>' + ICON.grid + " Table (" + groups[1][1].length + ")</label></div>" +
      '<div class="ds-facet"><b>' + ICON.chevd + "Catalog</b><div class=\"sub\">Mounted</div>" +
      D.sources.map(function (s) { return '<label><input type="checkbox"' + (S.dsCatalogs.indexOf(s.id) >= 0 ? " checked" : "") + ' data-cat="' + s.id + '">' + esc(s.catalog) + "</label>"; }).join("") +
      "</div></aside>" +
      '<div class="ds-list">' + list + "</div></div>";
  }
  function renderDsFeeds() {
    var k = kpis(), done = !!S.state.refreshed;
    $("#ds-crumb").textContent = "Data Load";
    $("#ds-page").innerHTML =
      '<div class="ds-head"><h1>Data Load</h1><span>Feeds &middot; scheduled and on-demand loads into the lakehouse</span></div>' +
      '<div class="ds-seg">' + ["Load Data", "Feeds", "Connections"].map(function (t, i) { return '<button type="button" class="' + (i === 1 ? "is-on" : "") + '">' + esc(t) + "</button>"; }).join("") + "</div>" +
      '<section class="job" id="ds-job"><div class="job-head"><span class="job-ico">' + ICON.stack + "</span>" +
      '<div><h2>Cross-system finance model (GOLD)</h2><div class="sub">Owner Group Finance &middot; five sources into one governed model &middot; ' + D.views.length + ' certified views &middot; last run <b id="ds-lastrun">' + esc(S.lastRun) + "</b></div></div>" +
      '<div class="job-act"><span class="job-chip" id="ds-jobchip">' + (done ? "Rebuilt 09:44" : "Scheduled hourly") + '</span><button class="btn btn--dark" id="ds-run-now" type="button">' + ICON.play + "Run now</button></div></div>" +
      '<div class="job-src">' + D.sources.map(function (s) {
        return "<div><div class=\"cat\">" + esc(s.catalog) + '</div><div class="nm">' + esc(s.short) + '</div><div class="fd">' + esc(s.feedShort) + '</div><span class="fr">' + esc(s.freshLabel) + " behind</span></div>";
      }).join("") + "</div>" +
      '<ol class="stages" id="ds-stages">' + D.refreshStages.map(function (st) {
        return "<li" + (done ? ' class="is-done"' : "") + "><i></i><span>" + esc(st.name) + "</span><em>" + (done ? esc(st.done) : "") + "</em></li>";
      }).join("") + "</ol>" +
      '<div class="job-bar" id="ds-bar"><b' + (done ? ' style="width:100%"' : "") + "></b></div>" +
      '<p class="job-note">' + (S.state.refreshed
        ? "Model rebuilt at <b>09:44</b> &middot; " + D.views.length + " certified views &middot; supplier records resolved " + k.resolved.pct.toFixed(1) + " % &middot; SQL Firewall allow-list FIN_QA_V3 refreshed."
        : "Sources are mounted and feeding; the model has not been rebuilt since <b>" + esc(S.lastRun) + "</b>. Run it to resolve identities, map accounts, reconcile the ledgers and rebuild the certified views.") + "</p></section>" +
      '<section class="out"><div class="out-head"><b>' + D.views.length + ' certified views</b><span>schema GOLD &middot; owner Group Finance &middot; signed-off definitions the answers cite by name</span></div>' +
      '<div class="out-grid">' + D.views.map(function (v) { return '<div><div class="vn">' + esc(v.name) + '</div><div class="vd">' + esc(v.definition) + "</div></div>"; }).join("") + "</div></section>" +
      '<p class="ds-aside">Mocked run — no job is submitted and nothing is written back to any source system.</p>';
  }
  function renderDs() {
    renderDsNav();
    if (S.dsScreen === "feeds") renderDsFeeds(); else renderDsCatalog();
  }
  $("#ds-page").addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("#ds-run-now"))) { runRefresh(); tour.after("runnow"); return; }
    if ((t = e.target.closest("[data-drop]"))) { S.dsCatalogs = S.dsCatalogs.filter(function (x) { return x !== t.dataset.drop; }); renderDs(); return; }
    if ((t = e.target.closest("[data-cat]"))) {
      var id = t.dataset.cat, i = S.dsCatalogs.indexOf(id);
      if (i >= 0) S.dsCatalogs.splice(i, 1); else S.dsCatalogs.push(id);
      renderDs(); return;
    }
    if ((t = e.target.closest("[data-all]"))) { S.dsCatalogs = D.sources.map(function (s) { return s.id; }); renderDs(); toast("All five catalogs are back in scope."); return; }
    if ((t = e.target.closest("[data-manage]"))) { toast("<span>Mounted catalogs: <b>" + D.sources.map(function (s) { return s.catalog; }).join(" &middot; ") + "</b> — read-only in this walkthrough.</span>"); }
  });

  /* the refresh: five stages, then the completion toast */
  function runRefresh() {
    if (S.busy || S.state.refreshed) { if (S.state.refreshed) toast("The model is already rebuilt — open <b>Mapping review</b> to see what it changed."); return; }
    S.busy = true;
    if (S.dsScreen !== "feeds") { S.dsScreen = "feeds"; renderDs(); }
    var ol = $("#ds-stages"), lis = $$("li", ol), bar = $("#ds-bar b");
    $("#ds-jobchip").textContent = "Running"; $("#ds-jobchip").className = "job-chip job-chip--live";
    $("#ds-run-now").disabled = true;
    var t = 0, total = D.refreshStages.reduce(function (a, s) { return a + s.ms; }, 0), acc = 0;
    D.refreshStages.forEach(function (st, i) {
      setTimeout(function () { if (lis[i]) lis[i].classList.add("is-running"); }, t);
      acc += st.ms; t += st.ms;
      (function (i, pc, st) {
        setTimeout(function () {
          if (!lis[i]) return;
          lis[i].classList.remove("is-running"); lis[i].classList.add("is-done");
          $("em", lis[i]).textContent = st.done;
          if (bar) bar.style.width = pc + "%";
        }, t);
      })(i, Math.round(acc / total * 100), st);
    });
    setTimeout(function () {
      S.busy = false;
      S.state = { refreshed: true, decisions: S.state.decisions };
      S.refreshedNow = true; S.lastRun = "09:44";
      var k = kpis();
      renderDs(); renderRw();
      toast('<span class="tok">' + ICON.check + "</span><span><b>Model rebuilt</b> &middot; " + D.views.length + " certified views &middot; " +
        k.records.total + " supplier records resolved to " + k.resolved.pct.toFixed(1) + " % &middot; " + k.accounts.unmappedBefore + " unmapped accounts cleared &middot; " +
        k.dupPairs.count + " duplicate-payment pairs surfaced</span><button class=\"tbtn\" type=\"button\" data-toast-go=\"review\">Open Mapping review</button>", 20000);
      tour.next();
    }, t + 500);
  }

  /* ===================================================================== */
  /* 2. AI DATA PLATFORM — Agent Hub                                       */
  /* ===================================================================== */
  var WB_NAV = [
    { id: "create", label: "Create", icon: "plus", plain: true },
    { id: "home", label: "Home", icon: "home" },
    { id: "insights", label: "Insights", icon: "chart" },
    { id: "catalog", label: "Catalog", icon: "book" },
    { id: "sessions", label: "Sessions", icon: "list" }
  ];
  function renderWbNav() {
    $("#wb-nav").innerHTML = WB_NAV.map(function (n) {
      var on = n.id === S.wbPanel || (n.id === "home" && S.wbPanel === "conversation");
      return '<button class="wb-item' + (on ? " is-active" : "") + '" type="button" data-wb="' + n.id + '">' + ICON[n.icon] + "<span>" + (n.plain ? "Create" : esc(n.label)) + "</span></button>";
    }).join("") +
      '<div class="wb-cap">Activity</div>' +
      '<div class="wb-recent">Finance Q&amp;A agent<br>GOLD certified views<br>Q3 close workspace</div>';
  }
  $("#wb-nav").addEventListener("click", function (e) {
    var b = e.target.closest("[data-wb]");
    if (!b) return;
    if (b.dataset.wb === "create") { toast("<span><b>Create</b> — agent flow &middot; job &middot; notebook &middot; SQL &middot; catalog &middot; schema. Read-only in this walkthrough.</span>"); return; }
    S.wbPanel = b.dataset.wb; S.panel = null; renderWb();
  });

  /* ---- user menu (View as) ---- */
  function renderWbMenu() {
    var cur = persona();
    $("#wb-user").textContent = cur.initials;
    $("#wb-menu").innerHTML = '<div class="mh">Signed in</div>' +
      '<div class="me is-on"><span class="ini">DW</span><span><b>Dana Whitfield</b><span>Group Controller &middot; all entities, unmasked</span></span></div><hr>' +
      '<div class="mh">View as</div>' +
      D.personas.filter(function (p) { return p.role !== "STEWARD"; }).map(function (p) {
        return '<button class="me' + (p.role === S.role ? " is-on" : "") + '" type="button" role="menuitem" data-role="' + p.role + '"><span class="ini' + (p.role === "ANALYST_NA" ? " ini--a" : "") + '">' + esc(p.initials) + "</span>" +
          "<span><b>" + esc(p.name) + "</b><span>" + esc(p.title) + " &middot; " + esc(p.scope) + "</span></span></button>";
      }).join("") +
      '<hr><div class="mh" style="text-transform:none;letter-spacing:0;font-weight:400;color:#8b857d">Row policies and column masking live in the database, so the view changes for every question at once.</div>';
  }
  function openMenu(open) {
    $("#wb-menu").hidden = !open;
    $("#wb-user").setAttribute("aria-expanded", String(!!open));
  }
  $("#wb-user").addEventListener("click", function () { openMenu($("#wb-menu").hidden); });
  $("#wb-menu").addEventListener("click", function (e) {
    var b = e.target.closest("[data-role]");
    if (!b) return;
    openMenu(false);
    setRole(b.dataset.role);
  });
  document.addEventListener("click", function (e) {
    if (!$("#wb-menu").hidden && !e.target.closest("#wb-menu, #wb-user")) openMenu(false);
  });
  function setRole(role) {
    S.role = role;
    var p = persona();
    renderWb();
    if (role === "ANALYST_NA") {
      var a = ans();
      toast("<span>Now answering as <b>" + esc(p.name) + "</b> &middot; " + esc(p.title) + ". The same question returns <b>" + a.rowCount + " rows</b> — the row policy limits them to NG-NA and the bank and tax columns are masked in the database.</span>", 7000);
    } else {
      toast("<span>Back as <b>" + esc(p.name) + "</b> &middot; " + esc(p.title) + ".</span>");
    }
    tour.after("viewas");
  }

  /* ---- Agent Hub home ---- */
  function hubHome() {
    var k = kpis();
    return '<div class="hub"><div class="hub-main">' +
      '<span class="hub-tile"></span>' +
      '<h1 class="hub-greet">Good morning, Dana</h1>' +
      '<div class="hub-ask"><span class="hub-mk"></span><span class="hub-ph"><b>Ask</b> Oracle</span>' +
      '<span class="ic">' + ICON.mic + '</span><span class="ic">' + ICON.clip + '</span>' +
      '<span class="hub-model">Finance Q&amp;A agent ' + ICON.chevd + "</span></div>" +
      '<div class="hub-sec">Saved questions</div><div class="hub-chips" id="hub-chips">' +
      D.questions.map(function (q) {
        var blocked = q.blockedFor && q.blockedFor.indexOf(S.role) >= 0;
        return '<button class="hub-chip' + (blocked ? " is-blocked" : "") + '" type="button" data-ask="' + q.id + '"><i>' + q.n + "</i>" + esc(q.chip) + (blocked ? " " + ICON.lock : "") + "</button>";
      }).join("") + "</div>" +
      '<div class="hub-sec">Agent</div>' +
      '<div class="hub-agent"><span class="ag-ico">' + ICON.bot + "</span>" +
      "<div><h3>Finance Q&amp;A agent</h3><p>Plain-English questions over the governed model: the agent resolves the business terms in the Master catalog, generates SQL against the certified views only, and answers with the rows, the source of every row and the SQL it ran.</p>" +
      '<div class="ag-meta">NL2SQL &middot; catalog connection LAKEHOUSE_GOLD &middot; ' + D.views.length + " certified views &middot; allow-list FIN_QA_V3</div></div>" +
      '<span class="job-chip">Running</span></div></div>' +
      '<aside class="hub-side"><h3>Today</h3><div class="hub-date">October 6th, 2026</div>' +
      '<div class="hs"><div class="k">Cross-system finance model</div><div class="v">' + (S.state.refreshed ? "Rebuilt at 09:44" : "Last run at " + esc(S.lastRun)) + '</div><div class="d">' +
      (S.state.refreshed ? D.views.length + " certified views over five sources &middot; " + k.resolved.pct.toFixed(1) + " % of supplier records resolved" : "Five sources mounted, not yet joined into one model") + "</div></div>" +
      '<div class="hs"><div class="k">Q3 close</div><div class="v">' + esc(D.world.closeState) + '</div><div class="d">' +
      (S.state.refreshed ? k.ledgers.tie + " of " + k.ledgers.total + " ledgers tie &middot; " + k.accounts.unmapped + " unmapped accounts" : k.ledgers.tieBefore + " of " + k.ledgers.total + " ledgers tie &middot; " + k.accounts.unmappedBefore + " unmapped accounts") + "</div></div>" +
      '<div class="hs"><div class="k">Stalest source</div><div class="v">' + esc(k.freshness.source) + " &middot; " + esc(k.freshness.stalestLabel) + '</div><div class="d">Freshness is a platform fact — CDC, pipelines and links, not a claim.</div></div>' +
      "</aside></div>";
  }

  /* ---- answer rendering ---- */
  function sysBadge(id) { return '<span class="sysb sysb--' + esc(id) + '">' + esc(D.sourceById[id] ? D.sourceById[id].short : id) + "</span>"; }
  function rowSystems(row, a) {
    if (row.systems && row.systems.length) return row.systems;
    if (row.sys) return [row.sys];
    if (row._pair) return [row._pair.a.sys, row._pair.b.sys];
    if (row._record) return [row._record.sys];
    if (row._rows && row._rows.length) { var o = []; row._rows.forEach(function (r) { if (o.indexOf(r.sys) < 0) o.push(r.sys); }); return o; }
    if (row.entity && SYS_ENTITY[row.entity]) return [SYS_ENTITY[row.entity]];
    return a.sources.map(function (s) { return s.id; });
  }
  function cell(row, c) {
    var v = row[c.key];
    if (c.kind === "badges") return (v || []).map(sysBadge).join("");
    if (c.kind === "badge") return D.sourceById[v] ? sysBadge(v) : '<span class="stat stat--auto">' + esc(v) + "</span>";
    if (c.kind === "money") return v === null || v === undefined ? "—" : money(v);
    if (c.kind === "num") return v === null || v === undefined ? "—" : esc(String(v));
    if (c.kind === "score") return v === null || v === undefined ? "—" : Number(v).toFixed(2);
    if (c.kind === "status") return '<span class="stat stat--' + esc(String(v).toLowerCase().replace(/[^a-z]/g, "")) + '">' + esc(v) + "</span>";
    if (c.kind === "mask") return '<span class="mono">' + esc(v) + "</span>";
    return esc(v);
  }
  function rowKey(row, i) { return row.golden || row.id || row.local || (row.group ? row.group + "-" + i : "r" + i); }
  function answerHtml(a) {
    var hasBadgeCol = a.columns.some(function (c) { return c.kind === "badges" || (c.kind === "badge" && ["sys", "systems"].indexOf(c.key) >= 0); });
    var head = (hasBadgeCol ? "" : '<th>Source</th>') + a.columns.map(function (c) { return '<th class="' + (c.align === "right" ? "r" : "") + '">' + esc(c.label) + "</th>"; }).join("") + "<th></th>";
    var body = a.rows.map(function (row, i) {
      var key = rowKey(row, i), isOrion = /^Orion/i.test(row.supplier || row.goldenName || "");
      return "<tr" + (row.status === "review" ? ' class="is-review"' : "") + ' data-row="' + esc(key) + '"' + (isOrion ? ' data-orion="1"' : "") + ">" +
        (hasBadgeCol ? "" : '<td class="sysc">' + rowSystems(row, a).map(sysBadge).join("") + "</td>") +
        a.columns.map(function (c) { return '<td class="' + (c.align === "right" ? "r " : "") + (c.kind === "badges" || c.kind === "badge" ? "sysc" : "") + '">' + cell(row, c) + "</td>"; }).join("") +
        '<td><button class="rowexp" type="button" data-explore="' + esc(key) + '" title="Explore this row" aria-label="Explore this row"' + (isOrion ? ' data-orion-btn="1"' : "") + ">" + ICON.search + "</button></td></tr>";
    }).join("");
    var grid = a.blocked
      ? '<div class="blocked"><span class="bi">' + ICON.lock + "</span><div><b>Refused by SQL Firewall</b>" +
        "<p>" + esc(a.firewall.reason) + "</p>" +
        '<span class="mono">allow-list ' + esc(a.firewall.allowList) + " &middot; status blocked &middot; audit row written</span></div></div>"
      : '<div class="ans-grid"><table class="agrid"><thead><tr>' + head + "</tr></thead><tbody>" + body + "</tbody></table></div>";
    var meta = a.blocked
      ? '<b>0 rows</b><span class="sep">|</span>Statement refused before execution<span class="sep">&middot;</span>' + esc(a.freshness.text)
      : "<b>Total rows: " + a.rowCount + "</b><span class=\"sep\">|</span>Displayed: " + a.displayed + '<span class="sep">&middot;</span>' + esc(a.freshness.text);
    var roleTag = S.role === "ANALYST_NA" ? '<span class="stat stat--review">Viewing as Marcus Bell &middot; Regional analyst NA</span>' : "";
    return '<button class="conv-back" type="button" data-back="1">' + ICON.chevl + "Agent Hub</button>" +
      '<div class="q-bubble">' + esc(a.text) + "</div>" +
      '<div class="ans" id="ans">' +
      '<div class="ans-meta">' + meta + (roleTag ? '<span class="sep">&middot;</span>' + roleTag : "") + '<span class="sep">&middot;</span>' + a.views.map(function (v) { return '<span class="mono">' + esc(v) + "</span>"; }).join(" ") + "</div>" +
      grid +
      (a.caveat ? '<div class="ans-caveat">' + ICON.info + " " + esc(a.caveat) + "</div>" : "") +
      '<div class="ans-acts">' +
      '<button class="achip' + (S.panel === "explore" ? " is-on" : "") + '" type="button" data-panel="explore">' + ICON.search + "Explore</button>" +
      '<button class="achip' + (S.panel === "explain" ? " is-on" : "") + '" type="button" data-panel="explain">' + ICON.bulb + "Explain</button>" +
      '<button class="achip' + (S.panel === "code" ? " is-on" : "") + '" type="button" data-panel="code">' + ICON.code + "Code View</button>" +
      '<button class="achip' + (S.panel === "trace" ? " is-on" : "") + '" type="button" data-panel="trace">' + ICON.route + "Trace</button>" +
      '<label class="narr"><input type="checkbox" id="narr-tog"' + (S.narrate ? " checked" : "") + ">Narrate</label>" +
      '<span class="right"><button class="achip" type="button" data-publish="1">' + ICON.shield + "Publish as certified view</button></span></div>" +
      (S.narrate ? '<div class="ans-narr"><span class="sp">' + ICON.speak + "</span><span>" + esc(a.narrate) + "</span></div>" : "") +
      (S.panel ? '<div class="ans-panel" id="ans-panel">' + panelHtml(a) + "</div>" : "") +
      "</div>" +
      '<div class="conv-comp"><span class="hub-mk"></span><span>Ask a Question...</span><span class="dis">AI models can make mistakes. Verify responses.</span></div>';
  }
  function panelHtml(a) {
    if (S.panel === "trace") return traceHtml(a);
    if (S.panel === "code") return codeHtml(a);
    if (S.panel === "explain") return explainHtml(a);
    return exploreHtml(a);
  }
  function panelHead(title, note) {
    return '<div class="panel-head"><b>' + esc(title) + "</b>" + (note ? '<span class="panel-note">' + note + "</span>" : "") +
      '<button class="btn btn--ghost btn--xs x" type="button" data-panel="">' + ICON.x + "Close</button></div>";
  }
  function traceHtml(a) {
    var max = Math.max.apply(null, a.trace.map(function (s) { return s.ms; }));
    var rows = a.trace.map(function (s) {
      return '<div class="tr' + (s.status === "blocked" ? " is-blocked" : "") + '"><span class="n"><b>' + esc(s.n) + "</b><span>" + esc(s.d) + '</span></span><span class="bar"><i style="width:' + Math.max(3, Math.round(s.ms / max * 100)) + '%"></i></span><span class="ms">' + (s.ms / 1000).toFixed(2) + "s</span></div>";
    }).join("");
    return panelHead("Trace", "every span the agent ran, in order") +
      '<div class="tr h"><span class="n">Agent task</span><span>Duration</span><span class="ms">Time</span></div>' + rows +
      '<div class="tr-sum"><span>Total <b>' + (a.traceMs / 1000).toFixed(2) + 's</b></span><span>Rows <b>' + a.rowCount + "</b></span><span>SQL <b>" + a.sqlLines + " lines</b></span><span>Views <b>" + a.views.length + "</b></span></div>" +
      '<div style="margin-top:10px">' +
      '<div class="fwline"><span class="k">SQL Firewall</span><span><span class="' + (a.firewall.status === "blocked" ? "fw-no" : "fw-ok") + '">' + esc(a.firewall.status) + "</span> &middot; allow-list <span class=\"mono\">" + esc(a.firewall.allowList) + "</span> &middot; " + esc(a.firewall.reason) + "</span></div>" +
      '<div class="fwline"><span class="k">Row policy</span><span>' + esc(a.firewall.rowPolicy) + "</span></div>" +
      '<div class="fwline"><span class="k">Column masking</span><span>' + esc(a.firewall.masking) + "</span></div></div>";
  }
  function codeHtml(a) {
    var sql = esc(a.sql).replace(/\b(SELECT|FROM|JOIN|LEFT|WHERE|AND|OR|GROUP|BY|ORDER|HAVING|ON|AS|CASE|WHEN|THEN|ELSE|END|SUM|COUNT|ROUND|MIN|MAX|DISTINCT|WITHIN|OVER|FETCH|FIRST|ROWS|ONLY|IN|IS|NOT|NULL|NULLS|LAST|GREATEST|DATE|LISTAGG|RATIO_TO_REPORT)\b/g, '<span class="kw">$1</span>')
      .replace(/('[^']*')/g, '<span class="st">$1</span>');
    return panelHead("Code View", "generated against the certified views only — SELECT, no DDL and no DML") +
      '<div class="sqlbox">' + sql + "</div>" +
      '<div class="tr-sum"><span>Objects <b>' + a.views.map(function (v) { return v; }).join(" · ") + "</b></span><span>Lines <b>" + a.sqlLines + "</b></span></div>";
  }
  function explainHtml(a) {
    return panelHead("Explain", "the business terms the agent resolved before it wrote any SQL") +
      a.glossaryHits.map(function (g) {
        if (!g) return "";
        return '<div class="gl"><b>' + esc(g.term) + '</b><div class="syn">also: ' + esc(g.synonyms.join(", ")) + '</div><div class="def">' + esc(g.definition) + '</div><div class="own">' + esc(g.owner) + " &middot; last changed " + esc(g.changed) + "</div></div>";
      }).join("") +
      '<div class="panel-note">Resolved through the Master catalog, so every role and every phrasing of the question lands on the same definition.</div>';
  }
  function matchFor(recIds) {
    var out = null;
    D.pendingMatches.forEach(function (m) {
      if (out) return;
      if (m.records.some(function (id) { return recIds.indexOf(id) >= 0; })) out = m;
    });
    return out;
  }
  function recTable(recs) {
    return '<table class="dgrid"><thead><tr><th>Source</th><th>Object</th><th>Key</th><th>Name</th><th>City</th><th>Tax id</th><th>Bank</th><th class="r">Q3 (local)</th><th class="r">Q3 (USD)</th></tr></thead><tbody>' +
      recs.map(function (r) {
        return "<tr><td>" + sysBadge(r.sys) + "</td><td><code>" + esc(r.table) + "</code></td><td><code>" + esc(r.srcRef) + "</code></td><td>" + esc(r.name) + "</td><td>" + esc(r.city) + " &middot; " + esc(r.country) + "</td><td><code>" + esc(r.taxId || "—") + '</code></td><td><code>&bull;&bull;&bull;&bull; ' + esc(r.bankLast4) + '</code></td><td class="r">' + esc(r.currency) + " " + money(r.spendLocal) + '</td><td class="r">' + money(r.spendUsd) + "</td></tr>";
      }).join("") + "</tbody></table>";
  }
  function exploreHtml(a) {
    if (a.blocked) return panelHead("Explore", "nothing to drill into — the statement never ran") + '<div class="panel-note">SQL Firewall refused the statement before execution, so there are no rows and no source records to open.</div>';
    if (!a.rows.length) return panelHead("Explore") + '<div class="panel-note">No rows inside your entity scope.</div>';
    var idx = 0;
    a.rows.forEach(function (r, i) { if (rowKey(r, i) === S.exploreKey) idx = i; });
    var row = a.rows[idx], key = rowKey(row, idx);
    var picker = '<div class="ev" style="margin:0 0 10px">' + a.rows.slice(0, 14).map(function (r, i) {
      var k = rowKey(r, i), lab = r.supplier || r.goldenName || r.account || r.groupName || r.entity || r.local || ("row " + (i + 1));
      return '<button class="evc ' + (k === key ? "evc--o" : "evc--o") + '" type="button" data-explore="' + esc(k) + '" style="cursor:pointer' + (k === key ? ";background:#e4eef3;border-color:#9dc0cf;color:#1d5f73" : "") + '">' + esc(lab) + "</button>";
    }).join("") + "</div>";
    var body = "";
    if (row._records && row._records.length) {
      var m = matchFor(row._records.map(function (r) { return r.id; }));
      body += "<h4>Source records behind this golden supplier</h4>" + recTable(row._records);
      if (m) {
        body += "<h4>Match evidence &middot; proposal " + esc(m.id) + "</h4><div class=\"ev\">" + m.evidence.map(function (c) {
          return '<span class="evc ' + (c.hit === true ? "evc--y" : c.hit === false ? "evc--n" : "evc--o") + '">' + esc(c.t) + "</span>";
        }).join("") + '<span class="evc evc--o">score ' + m.score.toFixed(2) + "</span></div>" +
          '<div class="recon">' + esc(m.note) + (row.status === "review" ? " <b>Applied provisionally — no steward has confirmed it.</b>" : "") + "</div>";
      } else {
        body += '<div class="recon">Confirmed cluster &middot; basis ' + esc(row.score >= 0.96 ? "exact tax registration number" : "name and address") + " &middot; score " + Number(row.score).toFixed(2) + ".</div>";
      }
      if (row.bySystem) {
        var inScope = row.systems && row.systems.length ? row.systems : Object.keys(row.bySystem);
        body += "<h4>Q3 spend by system</h4><table class=\"dgrid\"><tbody>" + Object.keys(row.bySystem).filter(function (s) { return row.bySystem[s] > 0 && inScope.indexOf(s) >= 0; }).map(function (s) {
          return "<tr><td>" + sysBadge(s) + "</td><td>" + esc(D.sourceById[s].entityName) + '</td><td class="r">USD ' + money(row.bySystem[s]) + "</td></tr>";
        }).join("") + "</tbody></table>";
      }
    } else if (row._rows && row._rows.length) {
      var tot = row._rows.reduce(function (t, r) { return t + r.amountUsd; }, 0);
      body += '<div class="recon">' + esc(row.line) + " &middot; group account " + esc(row.group) + " " + esc(row.groupName) + " = USD " + money(Math.round(tot * 100) / 100) +
        "<span class=\"mono\">sum of " + row._rows.length + " local account" + (row._rows.length === 1 ? "" : "s") + ", each translated at its ledger's Q3 average rate</span></div>" +
        "<h4>Local accounts behind this figure</h4>" +
        '<table class="dgrid"><thead><tr><th>Source</th><th>Local account</th><th>Local name</th><th class="r">Local amount</th><th class="r">Rate</th><th class="r">USD</th><th>Source row</th></tr></thead><tbody>' +
        row._rows.map(function (r) {
          return "<tr><td>" + sysBadge(r.sys) + "</td><td><code>" + esc(r.local) + "</code></td><td>" + esc(r.localName) + (r.wasUnmapped ? ' <span class="stat stat--review">was unmapped</span>' : "") + '</td><td class="r">' + esc(r.currency) + " " + money(r.amountLocal) + '</td><td class="r">' + r.rate.toFixed(4) + '</td><td class="r">' + money(r.amountUsd) + "</td><td><code>" + esc(r.srcRef) + "</code></td></tr>";
        }).join("") + "</tbody></table>";
    } else if (row._pair) {
      var p = row._pair;
      body += '<div class="recon">' + esc(p.goldenName) + " &middot; normalised invoice <b>" + esc(p.invoiceNorm) + "</b> &middot; USD " + money(p.amountUsd) +
        '<span class="mono">' + (p.note || "same golden supplier, same normalised number, amount within 0.5 % after translation, two different systems") + "</span></div>" +
        '<table class="dgrid"><thead><tr><th>Source</th><th>Entity</th><th>Document</th><th>Date</th><th class="r">Local amount</th><th>Source row</th></tr></thead><tbody>' +
        [p.a, p.b].map(function (d) {
          return "<tr><td>" + sysBadge(d.sys) + "</td><td>" + esc(d.entity) + "</td><td><b>" + esc(d.doc) + "</b></td><td>" + esc(d.date) + '</td><td class="r">' + esc(d.currency) + " " + money(d.amountLocal) + "</td><td><code>" + esc(d.ref) + "</code></td></tr>";
        }).join("") + "</tbody></table>";
    } else if (row._record) {
      body += "<h4>Source record</h4>" + recTable([row._record]);
    } else {
      body += '<div class="recon">This row comes straight from ' + a.views.map(function (v) { return "<b>" + esc(v) + "</b>"; }).join(" and ") + "; every column below is a column of that view." +
        '<span class="mono">' + rowSystems(row, a).map(function (s) { return D.sourceById[s] ? D.sourceById[s].name : s; }).join(" · ") + "</span></div>" +
        '<table class="dgrid"><tbody>' + a.columns.map(function (c) {
          return "<tr><td style=\"width:190px;color:#5d5a55\">" + esc(c.label) + "</td><td>" + cell(row, c) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    return panelHead("Explore", "where the figures on this row come from") + picker + body;
  }
  function renderWb() {
    renderWbNav(); renderWbMenu();
    var page = $("#wb-page");
    if (S.wbPanel === "conversation") { page.innerHTML = '<div class="conv">' + answerHtml(ans()) + "</div>"; return; }
    if (S.wbPanel === "insights") { page.innerHTML = insightsHtml(); return; }
    if (S.wbPanel === "catalog") { page.innerHTML = glossaryHtml(); return; }
    if (S.wbPanel === "sessions") { page.innerHTML = sessionsHtml(); return; }
    page.innerHTML = hubHome();
  }
  $("#wb-page").addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-ask]"))) { ask(t.dataset.ask); return; }
    if ((t = e.target.closest("[data-back]"))) { S.wbPanel = "home"; S.panel = null; renderWb(); return; }
    if ((t = e.target.closest("[data-explore]"))) {
      S.exploreKey = t.dataset.explore; S.panel = "explore"; renderWb();
      var p = $("#ans-panel"); if (p) p.scrollIntoView({ block: "nearest", behavior: "smooth" });
      tour.after("explore"); return;
    }
    if ((t = e.target.closest("[data-panel]"))) {
      var p2 = t.dataset.panel;
      S.panel = (p2 && S.panel === p2) ? null : (p2 || null);
      renderWb();
      var el = $("#ans-panel"); if (el) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
      tour.after(p2 === "trace" ? "trace" : "");
      return;
    }
    if ((t = e.target.closest("[data-publish]"))) { publish(); return; }
    if ((t = e.target.closest("[data-dash]"))) { toast("<span>Dashboard <b>" + esc(t.dataset.dash) + "</b> — static in this walkthrough; it reads the same certified views as the answers.</span>"); }
  });
  $("#wb-page").addEventListener("change", function (e) {
    if (e.target.id === "narr-tog") { S.narrate = e.target.checked; renderWb(); }
  });
  function ask(qid) {
    S.qid = qid; S.wbPanel = "conversation"; S.panel = null; S.exploreKey = null; S.narrate = false;
    renderWb();
    tour.after(qid === "q1" ? "ask-q1" : "");
  }
  function publish() {
    var a = ans();
    if (a.blocked) { toast("Nothing to publish — the statement was refused before it ran."); return; }
    if (S.published.indexOf(a.publishAs) < 0) S.published.push(a.publishAs);
    toast('<span class="tok">' + ICON.check + "</span><span><b>" + esc(a.publishAs) + "</b> added to the certified set &middot; " + a.rowCount + " rows &middot; owner Group Finance &middot; the definition, not the export, is what the next person reuses.</span>", 7000);
    tour.after("publish");
  }

  /* ---- Insights: three static dashboards ---- */
  /* truncate at a word boundary — never mid-word — and keep the full string
     in a <title> so the whole name is one hover away */
  function truncWord(str, n) {
    str = String(str);
    if (str.length <= n) return str;
    var cut = str.slice(0, n), sp = cut.lastIndexOf(" ");
    return (sp > n * 0.5 ? cut.slice(0, sp) : cut).replace(/[\s,·]+$/, "") + "\u2026";
  }
  function barChart(items, unit) {
    var max = Math.max.apply(null, items.map(function (i) { return i.v; })) || 1;
    var h = 156, w = 360, lab = 152, top = 8, rowH = Math.min(24, (h - top) / items.length), maxBar = 140;
    return '<svg class="chart" viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Bar chart">' +
      items.map(function (it, i) {
        var y = top + i * rowH, bw = Math.max(2, (it.v / max) * maxBar), lbl = truncWord(it.k, 27);
        return '<text class="lb" x="0" y="' + (y + 9) + '">' + esc(lbl) + (lbl === it.k ? "" : "<title>" + esc(it.k) + "</title>") + "</text>" +
          '<rect x="' + (lab + 2) + '" y="' + y + '" width="' + bw + '" height="' + (rowH - 7) + '" rx="2" fill="' + (it.c || "#4d7a2c") + '"><title>' + esc(it.k) + " · " + esc(it.l || (it.v + (unit || ""))) + "</title></rect>" +
          '<text class="vl" x="' + (lab + bw + 7) + '" y="' + (y + 9) + '">' + esc(it.l || (it.v + (unit || ""))) + "</text>";
      }).join("") +
      '<line class="ax" x1="' + (lab + 1) + '" y1="' + (top - 4) + '" x2="' + (lab + 1) + '" y2="' + (top + items.length * rowH - 4) + '"/></svg>';
  }
  function statusList(items) {
    return '<div class="statlist">' + items.map(function (it) {
      return '<div class="sl"><span class="k">' + esc(it.k) + '</span><span class="v v--' + esc(it.s) + '">' + esc(it.l) + "</span></div>";
    }).join("") + "</div>";
  }
  function insightsHtml() {
    var k = kpis();
    var spend = D.answer("q7", "CONTROLLER", decisions()).rows.slice(0, 6).map(function (r) {
      return { k: r.supplier, v: r.spendUsd, l: "USD " + D.fmtM(r.spendUsd), c: "#4d7a2c" };
    });
    var close = [
      { k: "Ledgers that tie to their trial balance", l: k.ledgers.tie + " / " + k.ledgers.total, s: "ok" },
      { k: "Residual after mapping and translation", l: "USD " + money(k.ledgers.residualUsd), s: "ok" },
      { k: "Local accounts still unmapped", l: String(k.accounts.unmapped), s: "ok" },
      { k: "Account mappings waiting for a steward", l: String(k.accounts.review), s: "warn" },
      { k: "Intercompany legs that do not agree", l: "2 unmatched · 1 timing", s: "bad" },
      { k: "Duplicate-payment pairs to check", l: String(k.dupPairs.count), s: "bad" }
    ];
    var o2c = D.answer("q6", "CONTROLLER", decisions()).rows.map(function (r) {
      return { k: r.account, v: r.daysLate, l: r.daysLate + " d", c: "#7d4064" };
    });
    var cards = [
      { d: D.dashboards[0], svg: barChart(spend) },
      { d: D.dashboards[1], svg: statusList(close) },
      { d: D.dashboards[2], svg: barChart(o2c) }
    ];
    return '<div class="wb-pg"><h1>Insights</h1><div class="sub">Operational dashboards on the same certified views the answers use</div><div class="wb-rule"></div>' +
      '<div class="dash">' + cards.map(function (c) {
        return '<button class="dash-card" type="button" data-dash="' + esc(c.d.name) + '" style="text-align:left;cursor:pointer"><h3>' + esc(c.d.name) + '</h3><div class="sub">' + esc(c.d.sub) + "</div>" + c.svg +
          '<div class="vs">' + c.d.views.map(function (v) { return "GOLD." + v; }).join(" · ") + "</div></button>";
      }).join("") + "</div>" +
      '<p class="honest">Static in this walkthrough. Each dashboard reads the certified views listed under it, so a change to a definition moves the dashboard and the answers together.</p></div>';
  }
  function glossaryHtml() {
    return '<div class="wb-pg"><h1>Catalog</h1><div class="sub">Business terms and their synonyms, resolved before any SQL is written</div><div class="wb-rule"></div>' +
      '<div class="wb-filter"><input type="search" placeholder="Filter terms" aria-label="Filter terms"><span class="honest" style="margin:0">' + D.glossary.length + " terms &middot; owned by Group Finance, Group Sales and Group Operations</span></div>" +
      '<table class="wb-tbl"><thead><tr><th style="width:130px">Term</th><th style="width:210px">Also called</th><th>Definition</th><th style="width:130px">Owner</th><th style="width:100px">Changed</th></tr></thead><tbody>' +
      D.glossary.map(function (g) {
        return "<tr><td><b>" + esc(g.term) + "</b></td><td>" + esc(g.synonyms.join(", ")) + "</td><td>" + esc(g.definition) + "</td><td>" + esc(g.owner) + "</td><td>" + esc(g.changed) + "</td></tr>";
      }).join("") + "</tbody></table>" +
      '<div class="sec-head"><b>Certified views</b><span>' + D.views.length + " views on signed-off definitions &middot; owner Group Finance</span></div>" +
      '<table class="wb-tbl"><thead><tr><th style="width:230px">View</th><th>Definition</th><th style="width:190px">Sources</th><th style="width:100px">Changed</th></tr></thead><tbody>' +
      D.views.map(function (v) {
        return '<tr><td><span class="mono">' + esc(v.name) + "</span></td><td>" + esc(v.definition) + "</td><td>" + v.sources.map(sysBadge).join("") + "</td><td>" + esc(v.changed) + "</td></tr>";
      }).join("") + "</tbody></table>" +
      '<p class="honest">Business terms, synonyms and lineage are documented for the Master catalog but Oracle has never shown them on screen; what it does ship there is an accept-or-reject queue over entities a metadata extractor proposed. This panel is our own modest rendering of the term side, in the Workbench idiom.</p></div>';
  }
  function sessionsHtml() {
    var mine = S.published.map(function (p, i) {
      return { id: "P-" + i, time: "09:47", user: "Dana Whitfield", role: "CONTROLLER", text: "Published " + p, sqlHash: "—", rows: "—", status: "allowed" };
    });
    return '<div class="wb-pg"><h1>Sessions</h1><div class="sub">Every question asked of the model, the statement it produced and what the database did with it</div><div class="wb-rule"></div>' +
      '<table class="wb-tbl"><thead><tr><th style="width:110px">Time</th><th style="width:140px">User</th><th style="width:120px">Role</th><th>Question</th><th style="width:150px">Statement</th><th style="width:70px" class="r">Rows</th><th style="width:90px">Result</th></tr></thead><tbody>' +
      mine.concat(D.audit).map(function (a) {
        return "<tr><td>" + esc(a.time) + "</td><td>" + esc(a.user) + "</td><td>" + esc(a.role) + "</td><td>" + esc(a.text) + '</td><td><span class="mono">' + esc(a.sqlHash) + '</span></td><td style="text-align:right">' + esc(a.rows) + '</td><td><span class="stat stat--' + (a.status === "blocked" ? "open" : "auto") + '">' + esc(a.status) + "</span></td></tr>";
      }).join("") + "</tbody></table>" +
      '<p class="honest">A blocked row is a refusal by SQL Firewall against the allow-list, written before the statement could reach any data.</p></div>';
  }

  /* ===================================================================== */
  /* 3. MAPPING REVIEW                                                     */
  /* ===================================================================== */
  function tileHtml(t, moved) {
    var showAfter = t.after !== null && t.after !== undefined;
    var big = showAfter ? t.after : t.before;
    var small = big.length > 16;
    var d = "";
    if (showAfter && t.dir === "new") {
      d = '<span class="dlt">new</span>';
    } else if (showAfter && t.dir !== "flat" && t.beforeValue !== null && t.afterValue !== null && t.afterValue !== t.beforeValue) {
      var up = t.afterValue > t.beforeValue;
      d = '<span class="dlt">' + (up ? "▲" : "▼") + " " + (t.id === "resolved" ? Math.abs(t.afterValue - t.beforeValue).toFixed(1) + " pts" : Math.abs(t.afterValue - t.beforeValue)) + "</span>";
    } else if (showAfter && t.dir === "flat") {
      d = '<span class="dlt dlt--flat">unchanged</span>';
    }
    return '<div class="tile ' + esc(t.dir) + (moved ? " is-moved" : "") + '" data-tile="' + esc(t.id) + '" title="' + esc(t.note) + '">' +
      '<span class="lab">' + esc(t.label) + "</span>" +
      '<span class="val">' + (showAfter ? '<span class="before">' + esc(t.before) + '</span><span class="arw">→</span>' : "") +
      '<span class="after' + (small ? " after--sm" : "") + '">' + esc(big) + "</span>" + d + "</span>" +
      '<span class="note">' + esc(t.noteShort || t.note) + "</span></div>";
  }
  var DECIDED_AT = "2026-10-06 09:46";
  var movedTiles = [];
  function renderBand() {
    var k = kpis();
    $("#rw-band").innerHTML = '<div class="band-head"><span class="eyebrow">Model health · ' +
      (S.state.refreshed ? "before the rebuild → now" : "exact match, system by system") + '</span>' +
      '<span class="muted">' + esc(D.world.period.label) + " &middot; " + esc(D.world.period.range) + " &middot; every figure computed from the mapping tables</span></div>" +
      '<div class="band-tiles" id="band-tiles">' + k.tiles.map(function (t) { return tileHtml(t, movedTiles.indexOf(t.id) >= 0); }).join("") + "</div>";
  }
  function renderRwState() {
    var el = $("#rw-state");
    if (!S.state.refreshed) { el.className = "rw-state is-stale"; el.innerHTML = '<span class="dot"></span>Model not rebuilt yet — run the feed in Data Studio'; return; }
    if (S.pending.length) { el.className = "rw-state is-stale"; el.innerHTML = '<span class="dot"></span>' + S.pending.length + " decision" + (S.pending.length === 1 ? "" : "s") + " waiting for the next resolution run"; return; }
    var r = D.resolution(decisions());
    el.className = "rw-state"; el.innerHTML = '<span class="dot"></span>Resolved ' + r.resolvedPct.toFixed(1) + " % &middot; " + r.pendingProposals + " proposals open";
  }
  function renderRwTabs() {
    var r = D.resolution(decisions());
    var tabs = [
      ["matches", "Supplier matches", r.openProposals.length + " to review"],
      ["accounts", "Account mappings", D.accounts.filter(function (a) { return a.status === "review"; }).length + " to review"],
      ["decisions", "Decisions log", (D.decisions.length + S.log.length + S.pending.length) + " decisions"]
    ];
    $("#rw-tabs").innerHTML = tabs.map(function (t) {
      return '<button class="rw-tab' + (S.rwTab === t[0] ? " is-on" : "") + '" type="button" role="tab" aria-selected="' + (S.rwTab === t[0]) + '" data-tab="' + t[0] + '">' + esc(t[1]) + "<i>" + esc(t[2]) + "</i></button>";
    }).join("");
  }
  function propHtml(m) {
    var a = D.recordById[m.records[0]], b = D.recordById[m.records[1]];
    var open = S.openProp === m.id;
    var isOrion = m.id === "M-ORION";
    var pend = S.pending.filter(function (x) { return x.decision.id === m.id; })[0];
    var spendA = m.spend[0] ? m.spend[0].usd : 0, spendB = m.spend[1] ? m.spend[1].usd : 0;
    var suggested = isOrion ? "Different tax ids — two companies" : "";
    return '<div class="prop' + (open ? " is-open" : "") + (pend ? " is-decided" : "") + '" data-prop="' + esc(m.id) + '"' + (isOrion ? ' data-orion="1"' : "") + ">" +
      '<button class="prop-head" type="button" data-openprop="' + esc(m.id) + '" aria-expanded="' + open + '">' +
      '<span class="rec"><span class="nm">' + esc(a.name) + '</span><span class="meta">' + sysBadge(a.sys) + "<code>" + esc(a.sysId) + "</code> &middot; " + esc(a.city) + "</span></span>" +
      '<span class="prop-vs">vs</span>' +
      '<span class="rec"><span class="nm">' + esc(b.name) + '</span><span class="meta">' + sysBadge(b.sys) + "<code>" + esc(b.sysId) + "</code> &middot; " + esc(b.city) + "</span></span>" +
      '<span class="prop-score"><b>' + m.score.toFixed(2) + "</b><span>score</span></span>" +
      '<span class="prop-spend">USD ' + money(spendA, 0) + "<br>USD " + money(spendB, 0) + "</span>" +
      '<span class="prop-chev">' + ICON.chev + "</span></button>" +
      (pend ? '<div class="prop-dec"><span class="stat stat--' + (pend.decision.action === "reject" ? "open" : "auto") + '">' + esc(pend.decision.action === "reject" ? "rejected" : "confirmed") + "</span>" +
        "<span>" + esc(pend.decision.by) + " &middot; &ldquo;" + esc(pend.decision.reason) + "&rdquo;</span>" +
        '<span class="pd-wait">waiting for the next resolution run</span></div>' : "") +
      '<div class="prop-body">' +
      '<div class="side2">' + [a, b].map(function (r) {
        return '<div class="card2"><div class="hd">' + sysBadge(r.sys) + "<b>" + esc(r.name) + "</b></div>" +
          '<dl class="kv"><dt>Object</dt><dd><code>' + esc(r.table) + "</code></dd>" +
          "<dt>Key</dt><dd><code>" + esc(r.srcRef) + "</code></dd>" +
          "<dt>Entity</dt><dd>" + esc(r.entity) + " &middot; " + esc(D.sourceById[r.sys].entityName) + "</dd>" +
          "<dt>Address</dt><dd>" + esc(r.city) + ", " + esc(r.country) + "</dd>" +
          "<dt>Tax id</dt><dd><code>" + esc(r.taxId || "not on file") + "</code></dd>" +
          "<dt>Bank</dt><dd><code>&bull;&bull;&bull;&bull; " + esc(r.bankLast4) + "</code></dd>" +
          "<dt>Q3 spend</dt><dd>" + esc(r.currency) + " " + money(r.spendLocal) + " &middot; USD " + money(r.spendUsd) + "</dd></dl></div>";
      }).join("") + "</div>" +
      '<div class="ev" style="margin-top:10px">' + m.evidence.map(function (c) {
        return '<span class="evc ' + (c.hit === true ? "evc--y" : c.hit === false ? "evc--n" : "evc--o") + '">' + esc(c.t) + "</span>";
      }).join("") + '<span class="evc evc--o">score ' + m.score.toFixed(2) + "</span><span class=\"evc evc--o\">" + esc(m.basis) + "</span></div>" +
      '<div class="prop-note">' + esc(m.note) + (m.score >= D.provThreshold ? " Applied provisionally at " + m.score.toFixed(2) + " (threshold " + D.provThreshold.toFixed(2) + "), so reporting is not blocked while it waits for you." : " Below the " + D.provThreshold.toFixed(2) + " threshold, so the records stay apart until you decide.") + "</div>" +
      (pend ? '<div class="rule-line">' + ICON.check + "<span>Decision recorded under " + esc(pend.decision.by) + "." +
        (pend.decision.rule ? " Rule kept for the next run: &ldquo;" + esc(pend.decision.rule) + "&rdquo;." : "") +
        " Re-run the resolution to apply it to the model.</span></div>" : "") +
      '<div class="prop-acts"' + (pend ? ' hidden' : "") + ">" +
      '<input type="text" id="reason-' + esc(m.id) + '" placeholder="Why? (kept with the decision)" value="' + esc(suggested) + '" aria-label="Reason for the decision">' +
      '<button class="btn" type="button" data-decide="confirm" data-prop="' + esc(m.id) + '">' + ICON.check + "Confirm</button>" +
      '<button class="btn" type="button" data-decide="reject" data-prop="' + esc(m.id) + '">' + ICON.x + "Reject</button>" +
      '<select data-merge="' + esc(m.id) + '" aria-label="Merge into another golden supplier"><option value="">Merge into…</option>' +
      D.suppliers.filter(function (g) { return g.multi && g.status === "confirmed"; }).slice(0, 10).map(function (g) { return '<option value="' + esc(g.id) + '">' + esc(g.name) + "</option>"; }).join("") +
      "</select></div></div></div>";
  }
  function renderRwPanel() {
    var el = $("#rw-panel"), r = D.resolution(decisions());
    if (!S.state.refreshed) {
      el.innerHTML = '<div class="empty">The mapping tables are empty until the model is rebuilt.<br>Open <b>Autonomous AI Lakehouse &middot; Data Studio</b>, go to Data Load &rsaquo; Feeds and run the cross-system finance model.</div>';
      return;
    }
    if (S.rwTab === "matches") {
      el.innerHTML = '<div class="rw-tools"><span><b>' + r.openProposals.length + "</b> proposals between 0.75 and 0.89 wait for a person; <b>" + r.confirmedProposals + "</b> at 0.90 and above were confirmed by the model.</span>" +
        '<span class="grow"></span><span>' + (S.pending.length ? "Re-run resolution to apply " + S.pending.length + " decision" + (S.pending.length === 1 ? "" : "s") : "Nothing waiting to be applied") + "</span></div>" +
        (r.openProposals.length ? r.openProposals.map(propHtml).join("") : '<div class="empty">Every proposal has been decided.</div>');
      return;
    }
    if (S.rwTab === "accounts") {
      var rev = D.accounts.filter(function (a) { return a.status === "review"; });
      var auto = D.accounts.filter(function (a) { return a.status === "auto"; });
      el.innerHTML = '<div class="rw-tools"><span><b>' + rev.length + "</b> local accounts carry two plausible group accounts; <b>" + auto.length + "</b> were mapped by rule and need no decision.</span></div>" +
        rev.map(function (a) {
          return '<div class="acc-card"><div class="acc-head">' + sysBadge(a.sys) + "<b>" + esc(a.local) + " &middot; " + esc(a.description) + '</b><span class="r">Q3 ' + esc(a.currency || D.sourceById[a.sys].currency) + " " + money(a.amountLocal) + " &middot; USD " + money(a.amountUsd) + " &middot; score " + a.score.toFixed(2) + "</span></div>" +
            '<div class="acc-opts"><div class="acc-opt is-prop"><div class="t">Model proposes</div><div class="a">' + esc(a.proposed) + " " + esc(a.groupName) + '</div><div class="w">' + esc(a.rule) + "</div></div>" +
            '<div class="acc-opt"><div class="t">Alternative</div><div class="a">' + esc(a.alt) + " " + esc(a.altName) + '</div><div class="w">' + esc(a.question) + "</div></div></div>" +
            '<div class="prop-acts"><input type="text" id="areason-' + esc(a.sys) + "-" + esc(a.local) + '" placeholder="Why? (kept with the decision)" aria-label="Reason for the decision">' +
            '<button class="btn" type="button" data-acc="' + esc(a.sys) + "|" + esc(a.local) + '" data-accpick="proposed">' + ICON.check + "Use " + esc(a.proposed) + "</button>" +
            '<button class="btn" type="button" data-acc="' + esc(a.sys) + "|" + esc(a.local) + '" data-accpick="alt">Use ' + esc(a.alt) + "</button></div></div>";
        }).join("") +
        '<div class="sec-head"><b>Mapped by rule</b><span>' + auto.length + " local accounts the model placed on its own — shown for audit, no decision needed</span></div>" +
        '<table class="rtbl"><thead><tr><th style="width:90px">System</th><th style="width:90px">Local</th><th>Local name</th><th style="width:210px">Group account</th><th class="r" style="width:80px">Score</th><th>Rule</th></tr></thead><tbody>' +
        auto.map(function (a) {
          return "<tr><td>" + sysBadge(a.sys) + "</td><td><code>" + esc(a.local) + "</code></td><td>" + esc(a.description) + "</td><td>" + esc(a.proposed) + " " + esc(a.groupName) + '</td><td class="r">' + a.score.toFixed(2) + "</td><td>" + esc(a.rule) + "</td></tr>";
        }).join("") + "</tbody></table>" +
        '<p class="honest">Account decisions are written to GOLD.MAPPING_DECISIONS and picked up by the next model rebuild; the consolidated P&amp;L in this walkthrough is built on the mapping as it stands now.</p>';
      return;
    }
    var rows = S.pending.map(function (d) { return { row: d.row, pending: true }; })
      .concat(S.log.map(function (d) { return { row: d, pending: false }; }))
      .concat(D.decisions.slice().sort(function (a, b) { return a.at < b.at ? 1 : -1; }).map(function (d) { return { row: d, pending: false }; }));
    el.innerHTML = '<table class="rtbl"><thead><tr><th style="width:150px">When</th><th style="width:150px">Who</th><th>Decision</th><th style="width:100px">Action</th><th>Why</th><th>Rule left behind</th></tr></thead><tbody>' +
      rows.map(function (x) {
        var d = x.row;
        return "<tr><td>" + esc(d.at) + (x.pending ? ' <span class="stat stat--review">not applied</span>' : "") + "</td><td>" + esc(d.by) + "<br><span style=\"color:#837d75;font-size:11px\">" + esc(d.role) + "</span></td><td>" + esc(d.title) + '</td><td><span class="stat stat--' + (d.action === "reject" ? "open" : "auto") + '">' + esc(d.action) + "</span></td><td>" + esc(d.reason) + "</td><td>" + (d.rule ? esc(d.rule) : "—") + "</td></tr>";
      }).join("") + "</tbody></table>" +
      '<p class="honest">The log is a certified view of its own (GOLD.MAPPING_DECISIONS), so a decision and the rule it leaves behind are as auditable as the figures they move.</p>';
  }
  function renderRw() { renderRwState(); renderBand(); renderRwTabs(); renderRwPanel(); }
  $("#rw-tabs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-tab]");
    if (!b) return;
    S.rwTab = b.dataset.tab; renderRwTabs(); renderRwPanel(); $("#rw-panel").scrollTop = 0; tour.reposition();
  });
  $("#rw-panel").addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-openprop]"))) {
      var id = t.dataset.openprop;
      S.openProp = S.openProp === id ? null : id;
      renderRwPanel();
      var el = $('.prop[data-prop="' + id + '"]'); if (el) el.scrollIntoView({ block: "start", behavior: "smooth" });
      tour.after(id === "M-ORION" ? "open-orion" : "");
      return;
    }
    if ((t = e.target.closest("[data-decide]"))) { decide(t.dataset.prop, t.dataset.decide); return; }
    if ((t = e.target.closest("[data-acc]"))) { decideAccount(t.dataset.acc, t.dataset.accpick); return; }
  });
  $("#rw-panel").addEventListener("change", function (e) {
    var s = e.target.closest("[data-merge]");
    if (!s || !s.value) return;
    decide(s.dataset.merge, "merge", s.options[s.selectedIndex].text);
  });
  function decide(mid, action, mergeInto) {
    var m = null;
    D.pendingMatches.forEach(function (x) { if (x.id === mid) m = x; });
    if (!m) return;
    if (S.pending.some(function (p) { return p.decision.id === mid; })) { toast("That proposal is already decided — re-run the resolution to apply it."); return; }
    var input = $("#reason-" + mid);
    var reason = (input && input.value.trim()) || (action === "reject" ? "Not the same party." : "Confirmed by the steward.");
    var a = D.recordById[m.records[0]], b = D.recordById[m.records[1]];
    var taxMiss = m.evidence.some(function (c) { return c.kind === "tax" && c.hit === false; });
    var rule = action === "reject" ? (m.learnedRule || (taxMiss ? "Different tax registration numbers never match, whatever the name score." : "")) : "";
    var title = action === "reject"
      ? a.name + " · " + D.sourceById[a.sys].short + " " + a.sysId + " and " + D.sourceById[b.sys].short + " " + b.sysId + " kept apart"
      : action === "merge"
        ? b.name + " · merged into " + mergeInto
        : a.name + " · " + D.sourceById[b.sys].short + " " + b.sysId + " confirmed onto the same party";
    var decision = {
      kind: "match", id: mid, target: mid, title: title,
      action: action === "merge" ? "confirm" : action,
      reason: reason + (action === "merge" ? " Merged into " + mergeInto + "." : ""),
      rule: rule, by: D.personas[1].name,
      at: DECIDED_AT
    };
    S.pending.push({ decision: decision, row: { at: decision.at, by: decision.by, role: "STEWARD", title: title, action: decision.action, reason: decision.reason, rule: rule } });
    S.openProp = null;
    renderRw();
    toast("<span><b>" + (action === "reject" ? "Rejected" : "Confirmed") + ".</b> " + esc(title) + ". " +
      (rule ? "Learned rule: &ldquo;" + esc(rule) + "&rdquo;. " : "") + "Re-run the resolution to apply it to the model.</span>", 8000);
    tour.after(mid === "M-ORION" && action === "reject" ? "reject" : "");
  }
  function decideAccount(key, pick) {
    var parts = key.split("|"), acc = null;
    D.accounts.forEach(function (a) { if (a.sys === parts[0] && a.local === parts[1]) acc = a; });
    if (!acc) return;
    var input = $("#areason-" + parts[0] + "-" + parts[1]);
    var chosen = pick === "alt" ? acc.alt + " " + acc.altName : acc.proposed + " " + acc.groupName;
    var row = {
      at: DECIDED_AT, by: D.personas[1].name, role: "STEWARD",
      title: D.sourceById[acc.sys].short + " " + acc.local + " " + acc.description + " mapped to " + chosen,
      action: "confirm", reason: (input && input.value.trim()) || acc.rule, rule: ""
    };
    S.log.unshift(row);
    renderRwTabs(); renderRwPanel();
    toast("<span><b>Mapping recorded.</b> " + esc(row.title) + " — written to GOLD.MAPPING_DECISIONS for the next rebuild.</span>", 6000);
  }
  $("#rw-rerun").addEventListener("click", function () { rerun(); tour.after("rerun"); });
  function rerun() {
    if (S.busy) return;
    if (!S.state.refreshed) { toast("Rebuild the model in Data Studio first."); return; }
    if (!S.pending.length) { toast("Nothing waiting — decide a proposal first, then re-run the resolution."); return; }
    S.busy = true;
    $("#rw-rerun").disabled = true;
    $("#rw-state").className = "rw-state is-stale";
    $("#rw-state").innerHTML = '<span class="dot"></span>Re-resolving identities…';
    setTimeout(function () {
      var changed = { tiles: [], questions: [], rules: [] };
      S.pending.forEach(function (p) {
        var res = D.applyDecision(S.state, p.decision);
        S.state = res.state;
        S.log.unshift(res.decision);
        res.changed.tiles.forEach(function (t) { if (changed.tiles.indexOf(t) < 0) changed.tiles.push(t); });
        res.changed.questions.forEach(function (q) { changed.questions.push(q); });
        if (res.changed.learnedRule) changed.rules.push(res.changed.learnedRule);
      });
      S.pending = [];
      S.busy = false;
      movedTiles = changed.tiles;
      $("#rw-rerun").disabled = false;
      renderRw();
      setTimeout(function () { movedTiles = []; renderBand(); }, 6000);
      var qs = changed.questions.map(function (q) { return "question " + q.n + " " + q.before + " &rarr; " + q.after + " rows"; }).join(", ");
      toast('<span class="tok">' + ICON.check + "</span><span><b>Resolution re-run.</b> " +
        (changed.tiles.length ? changed.tiles.length + " health tile" + (changed.tiles.length === 1 ? "" : "s") + " moved" : "The health band did not move") +
        (qs ? " &middot; answers that changed: " + qs : "") +
        (changed.rules.length ? " &middot; rule kept: &ldquo;" + esc(changed.rules[0]) + "&rdquo;" : "") + "</span>", 12000);
      tour.next();
    }, 1500);
  }

  /* ===================================================================== */
  /* TOUR                                                                  */
  /* ===================================================================== */
  var STEPS = [
    { id: "runnow", major: 1, side: "bottom",
      title: "Rebuild the model",
      body: "Five systems are mounted in the lakehouse and feeding — Fusion, JD Edwards, NetSuite, the in-house contracts schema and the CRM as an external table — but nothing has joined them yet. Click Run now to build one governed model over all five.",
      target: function () { return $("#ds-run-now"); }, anchor: function () { return $("#ds-job"); }, auto: runRefresh },
    { id: "open-review", major: 1, side: "top",
      title: "Open what the run produced",
      body: "Identities resolved, accounts mapped, ledgers translated and reconciled, certified views rebuilt. The mapping tables the run filled are the steward's work queue — open them from the toast.",
      target: function () { return $("#toast .tbtn"); }, anchor: function () { return $("#toast"); },
      auto: function () { $("#toast").hidden = true; setApp("review"); tour.after("open-review"); } },
    { id: "band", major: 2, side: "bottom", passive: true,
      title: "What the model made visible",
      body: "Read the band before touching anything. Five sources are now one model on thirteen certified views; supplier records resolved to a single golden record rise from 61.2 % to 93.2 %; the 37 local accounts nothing could place are mapped, so all three ledgers tie to their trial balance; and fourteen duplicate-payment pairs appear that no single system could see, because both legs live in different ERPs. Freshness is unchanged — it is a property of the feeds, not of the model.",
      target: function () { return $("#band-tiles"); }, anchor: function () { return $(".tile:last-child"); },
      auto: function () { tour.next(); } },
    { id: "to-aidp", major: 3, side: "bottom",
      title: "Ask the model a question",
      body: "The same governed model answers plain-English questions in the AI Data Platform's Agent Hub. Switch to it.",
      target: function () { return $('.ws-tab[data-go="aidp"]'); },
      auto: function () { setApp("aidp"); tour.after("to-aidp"); } },
    { id: "ask-q1", major: 3, side: "bottom",
      title: "Pick the cross-system question",
      body: "Ten questions are saved against this model. Ask the first one — which suppliers we pay from more than one system, and what we paid them last quarter. No single ERP can answer it.",
      target: function () { return $('[data-ask="q1"]'); }, anchor: function () { return $("#hub-chips"); },
      auto: function () { ask("q1"); } },
    { id: "trace", major: 4, side: "top",
      title: "See how the answer was produced",
      body: "Twelve suppliers, each with the systems it was paid from, its records, its Q3 spend in group currency and the score that resolved it. Open Trace: the terms the agent looked up, the SQL it generated against the certified views, the SQL Firewall check, and the rows it read.",
      target: function () { return $('[data-panel="trace"]'); },
      auto: function () { S.panel = "trace"; renderWb(); tour.after("trace"); } },
    { id: "explore", major: 4, side: "left",
      title: "Follow one figure back to its rows",
      body: "The trace ends in the rows; now go the other way. One row is flagged for review — open it and you get the two source records behind it, one in Fusion and one in JD Edwards, the evidence the model matched them on, and why it will not stand on its own.",
      target: function () { return $("[data-orion-btn]"); }, anchor: function () { return $("tr[data-orion] td:last-child"); },
      auto: function () { var b = $("[data-orion-btn]"); if (b) b.click(); } },
    { id: "to-review", major: 5, side: "bottom",
      title: "Overrule the model",
      body: "The match is wrong: the names agree and nothing else does. A steward decides it, and a steward's queue is the Mapping review app — switch to it.",
      target: function () { return $('.ws-tab[data-go="review"]'); },
      auto: function () { setApp("review"); tour.after("to-review"); } },
    { id: "open-orion", major: 5, side: "bottom",
      title: "Open the proposal",
      body: "Twenty-five proposals between 0.75 and 0.89 wait for a person; everything at 0.90 and above the model confirmed on its own. Open the first one.",
      target: function () { return $('.prop[data-orion] .prop-head'); }, anchor: function () { return $(".prop[data-orion]"); },
      auto: function () { S.openProp = "M-ORION"; renderRwPanel(); tour.after("open-orion"); } },
    { id: "reject", major: 5, side: "bottom",
      title: "Reject it, and say why",
      body: "Both records are here side by side: two different tax registration numbers, two different banks, two different countries. The reason is drafted for you — click Reject. The decision is logged under the steward's name and leaves a rule behind for the next run.",
      target: function () { return $('[data-decide="reject"][data-prop="M-ORION"]'); },
      auto: function () { decide("M-ORION", "reject"); } },
    { id: "rerun", major: 5, side: "left",
      title: "Re-run the resolution",
      body: "Your decision does not quietly change the numbers — it re-resolves the model. Click Re-run resolution and watch the band and the answers follow.",
      target: function () { return $("#rw-rerun"); }, auto: rerun },
    { id: "to-aidp-2", major: 6, side: "bottom",
      title: "Back to the answer",
      body: "The band moved: resolved 93.2 % to 93.7 %, and one duplicate pair disappeared with the match it depended on. The answer moved with it — go back to the Agent Hub.",
      target: function () { return $('.ws-tab[data-go="aidp"]'); },
      auto: function () { setApp("aidp"); tour.after("to-aidp-2"); } },
    { id: "viewas", major: 6, side: "left",
      title: "Now ask it as someone else",
      body: "Eleven rows now — the two Orion records stand apart. Governance is not a property of this screen: pick Marcus Bell, a regional analyst, and the same question re-runs under his row policy and column masking, enforced in the database.",
      target: function () { return $('#wb-menu [data-role="ANALYST_NA"]'); }, anchor: function () { return $("#wb-menu"); },
      before: function () { if (S.wbPanel !== "conversation") { S.qid = "q1"; S.wbPanel = "conversation"; S.panel = null; renderWb(); } openMenu(true); },
      auto: function () { openMenu(false); setRole("ANALYST_NA"); } },
    { id: "publish", major: 6, side: "top",
      title: "Hand the answer on",
      body: "Four rows, limited to North America, with the bank and tax columns masked — the trace shows the row policy and the masking that produced them. Publish the question as a certified view so the next person reuses the definition, not a spreadsheet.",
      target: function () { return $("[data-publish]"); },
      auto: publish }
  ];
  var MAJORS = 6;

  var tour = {
    active: false, i: 0, el: $("#tour"), target: null, tries: 0,
    stepId: function () { return STEPS[this.i] ? STEPS[this.i].id : ""; },
    start: function () {
      this.active = true; this.i = 0;
      document.body.classList.add("tour-on");
      $("#tour-pill").hidden = false; $("#tour-toggle").textContent = "Exit guide";
      S.app = "lakehouse"; S.dsScreen = "feeds"; setApp("lakehouse");
      this.show();
    },
    show: function () {
      var st = STEPS[this.i], self = this;
      if (!st) return;
      if (st.before && !st._did) { st._did = 1; st.before(); }
      var t = st.target();
      if (!t) { if (this.tries++ < 90) return void requestAnimationFrame(function () { self.show(); }); return; }
      this.tries = 0;
      if (this.target) this.target.classList.remove("tour-target");
      this.target = t; t.classList.add("tour-target");
      $("#tour-step").textContent = "Step " + st.major + " of " + MAJORS;
      $("#tour-title").textContent = st.title; $("#tour-body").textContent = st.body;
      var bars = "";
      for (var k = 1; k <= MAJORS; k++) bars += '<i class="' + (k <= st.major ? "is-done" : "") + '"></i>';
      $("#tour-progress").innerHTML = bars;
      $("#tour-next").hidden = !st.passive; $("#tour-skip").hidden = !!st.passive;
      this.el.hidden = false; this.el.dataset.side = st.side;
      try { t.scrollIntoView({ block: "nearest", behavior: "smooth", inline: "nearest" }); } catch (e) {}
      this.reposition();
      setTimeout(function () { self.reposition(); }, 320);
      setTimeout(function () { self.reposition(); }, 720);
    },
    after: function (id) { if (!this.active || !id) return; if (STEPS[this.i] && STEPS[this.i].id === id) this.next(); },
    next: function () {
      if (!this.active) return;
      var cur = STEPS[this.i] && STEPS[this.i].id;
      if ((cur === "runnow" || cur === "rerun") && S.busy) {
        this.el.hidden = true;
        if (this.target) { this.target.classList.remove("tour-target"); this.target = null; }
        return;
      }
      this.i++;
      if (this.i >= STEPS.length) return this.finish();
      var self = this;
      setTimeout(function () { self.show(); }, 280);
    },
    skip: function () { var st = STEPS[this.i]; if (st && st.auto) st.auto(); },
    exit: function () {
      this.active = false; this.el.hidden = true;
      if (this.target) this.target.classList.remove("tour-target");
      this.target = null;
      document.body.classList.remove("tour-on");
      $("#tour-pill").hidden = true; $("#tour-toggle").textContent = "Restart walkthrough";
    },
    finish: function () {
      this.exit();
      var g = $("#gate"), a = ans();
      $("#gate-title").textContent = "That is the whole loop";
      $("#gate-body").innerHTML = "Five systems joined into one governed model in a single run; the gain read off the model's own health band; a plain-English question answered across three ERPs with the source of every row on the row; one figure followed back to the two records behind it; a wrong match overruled by a steward, logged with a rule and re-resolved so the band, the duplicate list and the answers all moved together; and the same question re-run under a second role, limited and masked by the database itself. " +
        "<b>The demo gates mappings, never answers</b> — the human decision sits on the lakehouse mapping tables, and no answer waits for approval." +
        "<ol><li>Rebuild the cross-system model in Data Studio</li><li>Read what the model made visible, before and after</li><li>Ask across systems in the Agent Hub</li><li>Trace the answer and explore a row back to its sources</li><li>Reject a wrong match and re-run the resolution</li><li>Prove the governance for a second role and publish the answer</li></ol>" +
        '<div class="hints"><b>Still open for you:</b> the other nine saved questions — the consolidated P&amp;L drills to the local accounts behind each figure, the duplicate pairs open both documents, and <b>question 10 is refused outright</b> for the regional analyst by SQL Firewall; Insights holds three dashboards on the same certified views; Catalog holds the business glossary and the thirteen view definitions; Sessions holds the audit log, blocked attempts included; and in Mapping review the twenty-four remaining proposals, the two account mappings and the decisions log are all live.</div>';
      $("#gate-start").textContent = "Replay the walkthrough"; $("#gate-free").textContent = "Keep exploring";
      $("#gate-start").onclick = function () { location.href = location.pathname; };
      $("#gate-free").onclick = function () { g.hidden = true; };
      g.hidden = false;
    },
    reposition: function () {
      if (!this.active || !this.target || this.el.hidden) return;
      var st = STEPS[this.i];
      if (!document.body.contains(this.target)) {
        var t = st.target();
        if (t) { this.target.classList.remove("tour-target"); this.target = t; t.classList.add("tour-target"); } else return;
      }
      var anchor = (st.anchor && st.anchor()) || this.target;
      var r = anchor.getBoundingClientRect(), w = 306, h = this.el.offsetHeight || 160, gap = 14, s = st.side, top, left;
      var fits = { right: r.right + gap + w < innerWidth, left: r.left - gap - w > 0, bottom: r.bottom + gap + h < innerHeight, top: r.top - gap - h > 0 };
      if (!fits[s]) s = ["bottom", "top", "right", "left"].filter(function (k) { return fits[k]; })[0] || "bottom";
      if (s === "right") { left = r.right + gap; top = r.top - 8; }
      if (s === "left") { left = r.left - gap - w; top = r.top - 8; }
      if (s === "bottom") { left = r.left; top = r.bottom + gap; }
      if (s === "top") { left = r.left; top = r.top - gap - h; }
      top = Math.max(8, Math.min(innerHeight - h - 8, top));
      left = Math.max(8, Math.min(innerWidth - w - 8, left));
      this.el.style.top = top + "px"; this.el.style.left = left + "px"; this.el.dataset.side = s;
    },
    nudge: function () {
      var self = this;
      this.el.classList.remove("is-nudge"); void this.el.offsetWidth; this.el.classList.add("is-nudge");
      setTimeout(function () { self.el.classList.remove("is-nudge"); }, 400);
    }
  };

  /* the click guard: only the designated control acts while the tour runs */
  document.addEventListener("click", function (e) {
    if (!tour.active || !tour.target) return;
    if (e.target.closest("#tour, #tour-toggle, #gate")) return;
    var el = e.target.closest("button, a, input, select, textarea, label, [role=menuitem], .prop-head, .hub-chip, .ds-row, .tile");
    if (STEPS[tour.i] && STEPS[tour.i].passive) { e.preventDefault(); e.stopPropagation(); if (el) tour.nudge(); return; }
    if (!el) return;
    if (tour.target.contains(el) || el.contains(tour.target)) return;
    e.preventDefault(); e.stopPropagation(); tour.nudge();
  }, true);
  window.addEventListener("resize", function () { tour.reposition(); });
  document.addEventListener("scroll", function () { tour.reposition(); }, true);
  $("#tour-skip").addEventListener("click", function () { tour.skip(); });
  $("#tour-next").addEventListener("click", function () { tour.next(); });
  $("#tour-toggle").addEventListener("click", function () { if (tour.active) tour.exit(); else location.href = location.pathname; });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!$("#wb-menu").hidden) { openMenu(false); return; }
    if (!$("#gate").hidden && !tour.active) { $("#gate").hidden = true; }
  });

  /* ===================================================================== */
  /* boot                                                                  */
  /* ===================================================================== */
  function prime(name) {
    if (!name || name === "start") { S.state = D.initialState(); return; }
    S.state = D.stateFor(name);
    S.refreshedNow = true; S.lastRun = "09:44";
    if (name === "fixed" || name === "final") {
      var d = D.orionDecision;
      S.log.unshift({ id: "D-0004", at: d.at, by: d.by, role: "STEWARD", title: d.title, action: d.action, reason: d.reason, rule: d.rule });
    }
  }
  $("#ws-ctx").textContent = D.world.period.label + " close · " + D.world.todayLabel + " " + D.world.nowLabel;

  var wantState = params.get("state");
  var wantApp = params.get("app");
  var wantPanel = params.get("panel");
  var wantQ = params.get("q");

  if (params.get("ui") === "clean") { $("#tour-toggle").hidden = true; $("#tour-pill").hidden = true; }
  if (params.get("role") === "analyst") S.role = "ANALYST_NA";
  if (wantQ) { S.qid = "q" + wantQ; S.wbPanel = "conversation"; }
  if (wantPanel) {
    if (["trace", "explore", "code", "explain"].indexOf(wantPanel) >= 0) { S.panel = wantPanel; if (!S.qid) { S.qid = "q1"; S.wbPanel = "conversation"; } }
    else if (["catalog", "feeds"].indexOf(wantPanel) >= 0) S.dsScreen = wantPanel;
    else if (["home", "insights", "sessions", "conversation"].indexOf(wantPanel) >= 0) S.wbPanel = wantPanel;
    else if (["matches", "accounts", "decisions"].indexOf(wantPanel) >= 0) S.rwTab = wantPanel;
  }

  if (params.get("tour") === "off") {
    $("#gate").hidden = true;
    prime(wantState || "refreshed");
    tour.exit();
    $("#tour-toggle").textContent = "Restart walkthrough";
  } else {
    if (wantState) prime(wantState);
    $("#gate").hidden = false;
    $("#gate-start").addEventListener("click", function () { $("#gate").hidden = true; tour.start(); });
    $("#gate-free").addEventListener("click", function () {
      $("#gate").hidden = true; tour.exit();
      if (!S.state.refreshed) { prime("refreshed"); }
      renderDs(); renderWb(); renderRw();
    });
  }
  if (wantApp) S.app = wantApp;
  else if (tour.active === false && params.get("tour") === "off") S.app = S.wbPanel === "conversation" ? "aidp" : "lakehouse";

  renderDs(); renderWb(); renderRw();
  setApp(S.app);

  window.DEMO = {
    state: S, data: D, tour: tour,
    setApp: setApp, setRole: setRole, ask: ask, publish: publish,
    openPanel: function (p) { S.panel = p; renderWb(); },
    explore: function (key) { S.exploreKey = key; S.panel = "explore"; renderWb(); },
    setDsScreen: function (s) { S.dsScreen = s; renderDs(); },
    setWbPanel: function (p) { S.wbPanel = p; renderWb(); },
    setRwTab: function (t) { S.rwTab = t; renderRwTabs(); renderRwPanel(); },
    openProposal: function (id) { S.openProp = id; renderRwPanel(); },
    runRefresh: runRefresh, decide: decide, rerun: rerun,
    prime: function (n) { prime(n); renderDs(); renderWb(); renderRw(); },
    kpis: kpis, answer: ans, toast: toast
  };
})();
