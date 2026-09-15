/* Large docs processing and review — interactive walkthrough.
   Plain JS, no dependencies. State → render; the tour engine sits on top and
   only ever lets the designated control through while it is active. */
(function () {
  "use strict";
  var D = window.DEMO_DATA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var params = new URLSearchParams(location.search);

  /* ---------------- state ---------------- */
  var S = {
    screen: "upload",
    uploaded: false,
    docStatus: "Extracted",
    page: 1,
    tab: "review",
    open: {},
    selected: null,
    rows: {},
    history: [],
    hiRow: null
  };
  D.groups.forEach(function (g) {
    g.rows.forEach(function (r, i) {
      r.key = g.id + ":" + i;
      r.page = g.page;
      r.source = r.flag ? r.flag.suggested : r.service; /* what the page really says */
      S.rows[r.key] = { status: "pending", edited: false, service: r.service, flag: !!r.flag };
    });
  });

  function now() {
    var d = new Date();
    return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
  }
  function log(text, sub, kind) {
    S.history.unshift({ time: now(), text: text, sub: sub || "", kind: kind || "" });
  }
  function confLabel(c) { return c >= 90 ? "High" : c >= 75 ? "Medium" : "Low"; }
  function rowStatus(key) { return S.rows[key].status; }
  function pendingIn(g) { return g.rows.filter(function (r) { return rowStatus(r.key) === "pending"; }).length; }
  function allRows() { var out = []; D.groups.forEach(function (g) { g.rows.forEach(function (r) { out.push({ g: g, r: r }); }); }); return out; }
  function totalPending() { return allRows().filter(function (x) { return rowStatus(x.r.key) === "pending"; }).length; }
  function flaggedOpen() { return allRows().filter(function (x) { return S.rows[x.r.key].flag; }).length; }

  /* ---------------- navigation ---------------- */
  function go(screen) {
    S.screen = screen;
    $$(".screen").forEach(function (el) { el.hidden = el.dataset.screen !== screen; });
    $$(".nav-item").forEach(function (b) { b.classList.toggle("is-active", b.dataset.nav === (screen === "review" ? "documents" : screen)); });
    var crumbs = { upload: "<b>Upload</b>", documents: "<b>Documents</b>", history: "<b>History</b>", review: "Documents<i>›</i><b>" + esc(D.doc.id) + "</b><i>·</i>" + esc(D.doc.name) };
    $("#crumbs").innerHTML = crumbs[screen];
    if (screen === "documents") renderDocuments();
    if (screen === "upload") renderRecent();
    if (screen === "history") renderGlobalHistory();
    if (screen === "review") renderReview();
    tour.reposition();
  }
  $$(".nav-item").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.nav); }); });

  /* ---------------- upload + picker ---------------- */
  var picker = $("#picker"), pickerList = $("#picker-list"), pickerOpen = $("#picker-open");
  var pickedFile = null;
  function openPicker() {
    pickedFile = null; pickerOpen.disabled = true;
    pickerList.innerHTML = D.pickerFiles.map(function (f, i) {
      return '<li data-file="' + i + '"' + (f.main ? ' class="is-main"' : "") + '><span class="file-ico"><svg viewBox="0 0 24 24"><path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/></svg></span><div class="doc-name"><strong>' + esc(f.name) + "</strong><span>" + esc(f.kind) + '</span></div><span class="size">' + esc(f.size) + "</span></li>";
    }).join("");
    picker.hidden = false;
    tour.after("drop");
  }
  function selectFile(i) {
    pickedFile = D.pickerFiles[i];
    $$("li", pickerList).forEach(function (li) { li.classList.toggle("is-selected", +li.dataset.file === i); });
    pickerOpen.disabled = false;
    if (pickedFile.main) tour.after("pick");
  }
  function openFile() {
    if (!pickedFile) return;
    if (!pickedFile.main) { toast("This walkthrough follows one prepared document — pick the Meridian agreement."); return; }
    picker.hidden = true;
    tour.after("open");
    startProcessing();
  }
  pickerList.addEventListener("click", function (e) { var li = e.target.closest("li[data-file]"); if (li) selectFile(+li.dataset.file); });
  $("#picker-cancel").addEventListener("click", function () { picker.hidden = true; });
  pickerOpen.addEventListener("click", openFile);
  $("#dropzone").addEventListener("click", openPicker);

  function startProcessing() {
    var proc = $("#processing"), bar = $("#proc-bar"), stages = $$("#stages li");
    $("#dropzone").hidden = true; proc.hidden = false;
    $("#proc-file").textContent = D.doc.file; $("#proc-sub").textContent = D.doc.pages + " pages · " + D.doc.size;
    $("#proc-chip").textContent = "Processing"; $("#proc-chip").className = "chip chip--live";
    stages.forEach(function (li) { li.className = ""; $("em", li).textContent = ""; });
    var plan = [
      { ms: 700, done: "Supplier services agreement · rate schedule found" },
      { ms: 1500, done: D.doc.pages + " pages routed", tick: true },
      { ms: 1200, done: "25 values" },
      { ms: 900, done: "25 cited" },
      { ms: 700, done: "1 flag" }
    ];
    var t = 0, total = plan.reduce(function (a, p) { return a + p.ms; }, 0), acc = 0;
    plan.forEach(function (p, i) {
      setTimeout(function () { stages[i].classList.add("is-running"); if (p.tick) tickPages(stages[i], p.ms); }, t);
      acc += p.ms; t += p.ms;
      (function (i, pct, done) { setTimeout(function () { stages[i].classList.remove("is-running"); stages[i].classList.add("is-done"); $("em", stages[i]).textContent = done; bar.style.width = pct + "%"; }, t); })(i, Math.round(acc / total * 100), p.done);
    });
    setTimeout(function () { $("#proc-chip").textContent = "Extracted"; $("#proc-chip").className = "chip chip--ok"; }, t);
    setTimeout(function () {
      S.uploaded = true; S.docStatus = "Extracted";
      log("Extracted 25 values from " + D.doc.pages + " pages", "1 value flagged by validators · " + D.doc.id, "");
      log("Uploaded " + D.doc.file, "Classified as supplier services agreement · " + D.doc.id, "");
      $("#nav-doc-count").textContent = "3";
      go("documents");
      proc.hidden = true; $("#dropzone").hidden = false;
      tour.next();
    }, t + 700);
  }
  function tickPages(li, ms) {
    var em = $("em", li), n = 0, steps = 12, iv = setInterval(function () { n++; em.textContent = "Page " + Math.min(D.doc.pages, Math.round(n / steps * D.doc.pages)) + " / " + D.doc.pages; if (n >= steps) clearInterval(iv); }, ms / steps);
  }

  function docRows() {
    var rows = D.existingDocs.slice();
    if (S.uploaded) rows.push({ id: D.doc.id, name: D.doc.name, counterparty: D.doc.counterparty, category: D.doc.category, pages: D.doc.pages, uploaded: "Today", status: S.docStatus, values: 25, isNew: true, flagged: flaggedOpen(), pending: totalPending() });
    return rows;
  }
  function statusChip(s) {
    var k = { Extracted: "chip", Approved: "chip chip--ok", Exported: "chip chip--ok", "In review": "chip chip--warn" }[s] || "chip";
    return '<span class="' + k + '">' + esc(s) + "</span>";
  }
  function renderRecent() {
    $("#recent-list").innerHTML = docRows().slice().reverse().map(function (d) {
      return '<li><span class="file-ico"><svg viewBox="0 0 24 24"><path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/></svg></span><div class="doc-name"><strong>' + esc(d.name) + "</strong><span>" + esc(d.id) + " · " + d.pages + " pages · uploaded " + esc(d.uploaded) + "</span></div>" + statusChip(d.status) + "</li>";
    }).join("");
  }

  /* ---------------- documents ---------------- */
  function renderDocuments() {
    var rows = docRows();
    $("#doc-count-line").textContent = rows.length + " documents" + (rows.some(function (d) { return d.status === "Extracted"; }) ? " · 1 awaiting review" : "");
    $("#doc-table tbody").innerHTML = rows.map(function (d) {
      var extra = d.isNew && d.status !== "Exported" && d.pending ? ' <span class="chip chip--warn">' + d.pending + " pending" + (d.flagged ? " · " + d.flagged + " flagged" : "") + "</span>" : "";
      return '<tr class="clickable' + (d.isNew ? " is-new" : "") + '" data-doc="' + esc(d.id) + '"><td><div class="doc-name"><strong>' + esc(d.name) + "</strong><span>" + esc(d.id) + "</span></div></td><td>" + esc(d.counterparty) + "</td><td>" + esc(d.category) + '</td><td>' + d.pages + "</td><td>" + esc(d.uploaded) + "</td><td>" + statusChip(d.status) + extra + '</td><td class="num">' + d.values + "</td></tr>";
    }).join("");
  }
  $("#doc-table").addEventListener("click", function (e) {
    var tr = e.target.closest("tr[data-doc]"); if (!tr) return;
    if (tr.dataset.doc !== D.doc.id) { toast("Only the Meridian agreement opens in this walkthrough — the other rows are scenery."); return; }
    openDoc();
  });
  function openDoc() { go("review"); tour.after("open-doc"); }

  /* ---------------- review ---------------- */
  function renderReview() {
    $("#meta-title").textContent = D.doc.name;
    $("#viewer-file").textContent = D.doc.file;
    $("#pg-total").textContent = D.doc.pages;
    var st = $("#meta-status"); st.textContent = S.docStatus; st.className = S.docStatus === "Extracted" ? "chip" : "chip chip--ok";
    $("#approve-all").disabled = totalPending() === 0;
    $("#meta-grid").innerHTML = [
      ["Counterparty", D.doc.counterparty], ["Category", D.doc.category], ["Schedule", D.doc.schedule],
      ["Sites", D.doc.sites], ["Applicable from", D.doc.from], ["Applicable to", D.doc.to],
      ["Invoice currency", D.doc.currency], ["Source file", D.doc.file], ["Pages", D.doc.pages]
    ].map(function (p) { return "<div><dt>" + esc(p[0]) + "</dt><dd title=\"" + esc(p[1]) + "\">" + esc(p[1]) + "</dd></div>"; }).join("");
    renderGroups(); renderPage(S.page); renderDetails(); renderRatecard(); renderJson(); renderDocHistory();
    setTab(S.tab, true);
  }
  function renderGroups() {
    $("#groups").innerHTML = D.groups.map(function (g) {
      var pend = pendingIn(g), minConf = Math.min.apply(null, g.rows.map(function (r) { return r.conf; })), lbl = confLabel(minConf);
      var flag = g.rows.some(function (r) { return S.rows[r.key].flag; });
      var badge = pend ? '<span class="status status--pending">' + pend + " pending</span>" : '<span class="status status--approved">Approved</span>';
      var head = '<div class="group-head" data-toggle="' + g.id + '"><span class="chev"><svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg></span><span class="g-name">' + esc(g.name) + '</span><span class="g-badges"><span class="chip chip--muted">' + g.rows.length + (g.rows.length === 1 ? " value" : " values") + '</span><span class="chip ' + (lbl === "High" ? "chip--ok" : lbl === "Medium" ? "chip--warn" : "chip--bad") + '">' + lbl + "</span>" + (flag ? '<span class="chip chip--warn">1 flagged</span>' : "") + badge + '</span><span class="g-actions"><button class="btn btn--ghost btn--xs" data-gapprove="' + g.id + '" type="button"' + (pend ? "" : " disabled") + '>Approve</button><button class="btn btn--ghost btn--xs" data-greject="' + g.id + '" type="button"' + (pend ? "" : " disabled") + ">Reject</button></span></div>";
      var body = '<div class="group-body"><table class="table"><thead><tr><th>Src</th><th>Service</th><th>Sites</th><th>Rate basis</th><th class="num">Rate</th><th>Section</th><th>Confidence</th><th>Status</th></tr></thead><tbody>' + g.rows.map(function (r, i) {
        var rs = S.rows[r.key], lb = confLabel(r.conf), sel = S.selected === r.key;
        var stat = { pending: '<span class="status status--pending">Pending</span>', approved: '<span class="status status--approved">Approved' + (rs.edited ? " · edited" : "") + "</span>", rejected: '<span class="status status--rejected">Rejected</span>', na: '<span class="status status--na">N/A</span>' }[rs.status];
        return '<tr class="clickable' + (sel ? " is-selected" : "") + (rs.flag ? " has-flag" : "") + '" data-row="' + r.key + '"><td><button class="cite" data-cite="' + r.key + '" type="button" title="Show on page ' + r.page + '"><svg viewBox="0 0 24 24"><path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/></svg>p.' + r.page + "</button></td><td>" + esc(rs.service) + (rs.flag ? ' <span class="row-flag"><svg viewBox="0 0 24 24"><path d="M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 8.5v5M12 16.6v.4"/></svg>Validator</span>' : "") + "</td><td>" + esc(r.sites) + "</td><td>" + esc(r.basis) + '</td><td class="num"><b>' + esc(r.value) + (/%$/.test(r.value) ? "" : " " + D.doc.currency) + "</b></td><td>§" + esc(r.section) + '</td><td><span class="conf conf--' + lb.toLowerCase() + '"><i><b style="width:' + r.conf + '%"></b></i>' + r.conf + "%</span></td><td>" + stat + "</td></tr>";
      }).join("") + "</tbody></table></div>";
      return '<div class="group' + (S.open[g.id] ? " is-open" : "") + '" data-group="' + g.id + '">' + head + body + "</div>";
    }).join("");
    tour.reposition();
  }
  $("#groups").addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-cite]"))) { e.stopPropagation(); cite(t.dataset.cite); return; }
    if ((t = e.target.closest("[data-gapprove]"))) { e.stopPropagation(); decideGroup(t.dataset.gapprove, "approved"); return; }
    if ((t = e.target.closest("[data-greject]"))) { e.stopPropagation(); decideGroup(t.dataset.greject, "rejected"); return; }
    if ((t = e.target.closest("tr[data-row]"))) { selectRow(t.dataset.row); return; }
    if ((t = e.target.closest("[data-toggle]"))) { toggleGroup(t.dataset.toggle); }
  });
  function toggleGroup(id, force) {
    S.open[id] = force === undefined ? !S.open[id] : force;
    renderGroups();
    if (S.open[id]) tour.after(id === "cleaning" ? "expand" : id === "discount" ? "expand-discount" : "");
  }
  function selectRow(key) {
    var r = findRow(key); S.selected = key; S.hiRow = key;
    gotoPage(r.page); renderGroups(); renderDetails();
    if (S.rows[key].flag) tour.after("flag-row");
  }
  function cite(key) {
    var r = findRow(key); S.selected = key; S.hiRow = key;
    gotoPage(r.page); renderGroups(); renderDetails();
    tour.after("cite");
  }
  function findRow(key) { var out = null; allRows().forEach(function (x) { if (x.r.key === key) out = x.r; }); return out; }
  function findGroup(key) { var out = null; allRows().forEach(function (x) { if (x.r.key === key) out = x.g; }); return out; }

  function decideRow(key, status) {
    var rs = S.rows[key]; rs.status = status; rs.flag = false;
    var r = findRow(key);
    log({ approved: "Approved", rejected: "Rejected", na: "Marked N/A" }[status] + ": " + rs.service, "§" + r.section + " · p." + r.page + " · Jordan Mercer", status === "approved" ? "ok" : status === "rejected" ? "warn" : "");
    afterDecision();
    tour.after("approve-row");
  }
  function applyFix(key) {
    var rs = S.rows[key], r = findRow(key);
    rs.service = r.flag.suggested; rs.edited = true; rs.flag = false; rs.status = "approved";
    log("Corrected and approved: " + rs.service, "Was “" + r.service + "” · rule: " + r.flag.rule + " · Jordan Mercer", "ok");
    afterDecision();
    tour.after("fix");
  }
  function decideGroup(id, status) {
    var g = D.groups.filter(function (x) { return x.id === id; })[0], n = 0;
    g.rows.forEach(function (r) { var rs = S.rows[r.key]; if (rs.status === "pending" && !rs.flag) { rs.status = status; n++; } });
    log((status === "approved" ? "Approved " : "Rejected ") + n + " values in " + g.name, "Group action · Jordan Mercer", status === "approved" ? "ok" : "warn");
    if (g.rows.some(function (r) { return S.rows[r.key].flag; })) toast("1 flagged value in " + g.name + " still needs a decision.");
    afterDecision();
  }
  function approveAll() {
    var n = 0;
    allRows().forEach(function (x) { var rs = S.rows[x.r.key]; if (rs.status === "pending" && !rs.flag) { rs.status = "approved"; n++; } });
    log("Approved " + n + " remaining values", "Approve all · Jordan Mercer", "ok");
    if (flaggedOpen()) toast("Approved " + n + " values. 1 flagged value still needs a decision.");
    else toast("Approved " + n + " values — the document is ready to export.");
    afterDecision();
    tour.after("approve-all");
  }
  $("#approve-all").addEventListener("click", approveAll);
  function afterDecision() {
    if (totalPending() === 0 && S.docStatus === "Extracted") { S.docStatus = "Approved"; log("Document approved", "All 25 values decided", "ok"); }
    renderReview();
  }

  function renderDetails() {
    var box = $("#details");
    if (!S.selected) { box.hidden = true; return; }
    var r = findRow(S.selected), g = findGroup(S.selected), rs = S.rows[S.selected], lb = confLabel(r.conf);
    var unit = /%$/.test(r.value) ? "" : " " + D.doc.currency;
    var reason = rs.flag ? "Read cleanly from the tier text, but a business-rule validator disputes the boundary — see the flag." : rs.edited ? "Corrected by the reviewer against the cited page." : r.conf >= 90 ? "Value sits in the schedule table under a labelled rate column; unit and currency matched the column header." : r.conf >= 75 ? "Value found in running text rather than a table; unit inferred from the surrounding clause." : "Value partially legible.";
    var flag = rs.flag ? '<div class="d-flag"><strong>Validator: ' + esc(r.flag.rule) + "</strong>" + esc(r.flag.detail) + '<div class="sugg"><span>Suggested:</span><code>' + esc(r.flag.suggested) + '</code><button class="btn btn--ok btn--xs act-fix" type="button" data-fix="' + r.key + '">Apply correction</button></div></div>' : "";
    box.innerHTML = '<div class="details-head"><strong>Row details · ' + esc(g.name) + '</strong><button class="details-close" type="button" aria-label="Close" data-close-details><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>' +
      '<div class="details-grid"><div class="d-col"><span class="eyebrow">Extracted value</span><div class="d-val">' + esc(r.value) + unit + '</div><div class="d-sub">' + esc(rs.service) + "</div><div class=\"d-sub\">" + esc(r.basis) + " · " + esc(r.sites) + "</div>" + flag + "</div>" +
      '<div class="d-col"><span class="eyebrow">Evidence &amp; traceability</span><div class="d-line"><span>Source</span><button class="cite" type="button" data-cite="' + r.key + '">p.' + r.page + "</button> · §" + esc(r.section) + '</div><div class="d-line"><span>Scenario</span>' + esc(r.scenario) + '</div><div class="d-quote">“' + esc(r.source) + " — " + esc(r.value) + unit + " " + esc(r.basis.toLowerCase()) + ".”</div></div>" +
      '<div class="d-col"><span class="eyebrow">Confidence</span><div class="d-val">' + r.conf + "% · " + lb + '</div><div class="d-sub">' + reason + '</div><span class="eyebrow" style="margin-top:10px">Actions</span><div class="d-actions">' +
      (rs.status === "pending" ? '<button class="btn btn--ok btn--sm act-approve" type="button" data-decide="approved"' + (rs.flag ? ' disabled title="Resolve the validator flag first"' : "") + '>Approve</button><button class="btn btn--danger btn--sm" type="button" data-decide="rejected">Reject</button><button class="btn btn--ghost btn--sm" type="button" data-decide="na">Mark N/A</button>' : '<span class="status status--' + rs.status + '">' + { approved: "Approved" + (rs.edited ? " · edited" : ""), rejected: "Rejected", na: "N/A" }[rs.status] + '</span><button class="btn btn--ghost btn--xs" type="button" data-decide="pending">Reopen</button>') +
      "</div></div></div>";
    box.hidden = false;
    tour.reposition();
  }
  $("#details").addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-close-details]"))) { S.selected = null; renderGroups(); renderDetails(); return; }
    if ((t = e.target.closest("[data-cite]"))) { cite(t.dataset.cite); return; }
    if ((t = e.target.closest("[data-fix]"))) { applyFix(t.dataset.fix); return; }
    if ((t = e.target.closest("[data-decide]"))) {
      if (t.dataset.decide === "pending") { S.rows[S.selected].status = "pending"; S.rows[S.selected].edited = false; renderReview(); return; }
      decideRow(S.selected, t.dataset.decide);
    }
  });

  /* ---------------- page viewer ---------------- */
  function gotoPage(n) { S.page = Math.max(1, Math.min(D.doc.pages, n)); renderPage(S.page); }
  $("#pg-prev").addEventListener("click", function () { gotoPage(S.page - 1); });
  $("#pg-next").addEventListener("click", function () { gotoPage(S.page + 1); });
  $("#pg-input").addEventListener("change", function (e) { gotoPage(+e.target.value || 1); });
  function renderPage(n) {
    $("#pg-input").value = n;
    var c = D.pageContent(n), html = "";
    var head = '<div class="p-head"><span>Master Services Agreement · ' + esc(D.doc.id) + "</span><span>" + esc(D.doc.counterparty) + "</span></div>";
    var foot = '<div class="p-foot"><span>Confidential — for the parties only</span><span>Page ' + n + " of " + D.doc.pages + "</span></div>";
    if (c.kind === "cover") {
      html = '<div class="cover"><h3>Master Services Agreement</h3><div class="sub">for the provision of facility services</div><dl><dt>Between</dt><dd>Northgate Holdings B.V. (the Client)</dd><dt>And</dt><dd>' + esc(D.doc.counterparty) + " (the Supplier)</dd><dt>Reference</dt><dd>" + esc(D.doc.id) + "</dd><dt>Commencement</dt><dd>" + esc(D.doc.from) + "</dd><dt>Initial term</dt><dd>36 months, to " + esc(D.doc.to) + "</dd><dt>Schedules</dt><dd>A Definitions · B Rate card · C Services · D Sites · E Service levels · F Vetting · G Insurance</dd></dl></div>";
    } else if (c.kind === "toc") {
      var toc = [["1. Interpretation", 3], ["2. Term", 3], ["3. Services and ordering", 4], ["4. Charges, invoicing and payment", 5], ["Schedule B — Rate card", 6]];
      D.groups.forEach(function (g) { toc.push(["    " + g.section + " " + g.name, g.page]); });
      toc.push(["Schedule C — Services", 28], ["Schedule D — Sites", 34], ["Schedule E — Service levels", 37], ["Schedule F — Vetting", 43], ["Schedule G — Insurance", 46]);
      html = "<h3>Contents</h3><ul class=\"toc\">" + toc.map(function (t) { return "<li><span>" + esc(t[0]).replace(/^ {4}/, "&nbsp;&nbsp;&nbsp;&nbsp;") + "</span><span>" + t[1] + "</span></li>"; }).join("") + "</ul>";
    } else if (c.kind === "schedule-intro") {
      html = "<h3>Schedule B — Rate card</h3><p>This Schedule sets out the Charges for the Services. Rates are stated in " + esc(D.doc.currency) + ", exclusive of value added tax, and apply at the Sites listed in Schedule D unless a rate is expressly limited to one Site. Rates are fixed for the first contract year and thereafter subject to clause 8 (Indexation).</p><h4>B.0 General notes</h4><p>Where a Service is charged per visit, a visit means one attendance of the agreed scope at one Site on one day. Where a Service is charged per hour, time is recorded in quarter-hour increments from arrival on Site. Where a Service is charged per square metre, the area is the net internal area recorded in Schedule D.</p><p>Discounts in section B.3 apply to routine cleaning only and are calculated on the monthly invoice total for that Service before value added tax. Surcharges in section B.7 apply to labour rates only.</p><p>The Supplier shall not charge for travel, tools, consumables or supervision unless a rate for that item appears in this Schedule.</p>";
    } else if (c.kind === "table") {
      var g = c.group;
      html = "<h3>" + esc(g.section) + " " + esc(g.name) + "</h3><p>The following rates apply to " + esc(g.name.toLowerCase()) + " at the Sites indicated. Each rate is exclusive of value added tax.</p><table><thead><tr><th>Ref.</th><th>Service</th><th>Sites</th><th>Basis</th><th>Rate</th><th>Notes</th></tr></thead><tbody>" + g.rows.map(function (r) {
        var unit = /%$/.test(r.value) ? "" : " " + D.doc.currency;
        return '<tr data-src="' + r.key + '"' + (S.hiRow === r.key ? ' class="is-hi"' : "") + "><td>" + esc(r.section) + "</td><td>" + esc(r.source) + "</td><td>" + esc(r.sites) + "</td><td>" + esc(r.basis) + "</td><td>" + esc(r.value) + unit + "</td><td>" + esc(r.scenario) + "</td></tr>";
      }).join("") + "</tbody></table><p class=\"note\">Rates in this section are subject to the general notes in B.0 and to indexation under clause 8.</p>" + (g.id === "discount" ? "<p>Tiers are assessed on the number of routine cleaning visits scheduled across all Sites in the invoice month. A change of tier takes effect from the first day of the following month.</p>" : "<p>Any Service requested outside the scope described above is chargeable at the rates in section B.6 unless otherwise agreed in a change note.</p>");
    } else {
      html = c.items.map(function (cl, i) {
        var no = c.clauseNo + i;
        return "<h3>" + no + ". " + esc(cl[0]) + "</h3><p>" + no + ".1 " + esc(cl[1]) + "</p><p>" + no + ".2 " + esc(D.clauses[(no * 5 + 3) % D.clauses.length][1]) + "</p>";
      }).join("");
    }
    $("#paper").innerHTML = head + html + foot;
    var hi = $("#paper tr.is-hi"); if (hi) hi.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  /* ---------------- tabs, export, history ---------------- */
  function setTab(id, silent) {
    S.tab = id;
    $$(".tab").forEach(function (t) { t.classList.toggle("is-active", t.dataset.tab === id); });
    $$(".tabpane").forEach(function (p) { p.classList.toggle("is-active", p.dataset.pane === id); });
    $("#details").hidden = id !== "review" || !S.selected;
    if (!silent) tour.after(id === "ratecard" ? "tab-ratecard" : "");
    tour.reposition();
  }
  $("#tabs").addEventListener("click", function (e) { var t = e.target.closest(".tab"); if (t) setTab(t.dataset.tab); });
  function renderRatecard() {
    $("#ratecard-table tbody").innerHTML = allRows().map(function (x) {
      var rs = S.rows[x.r.key], unit = /%$/.test(x.r.value) ? "" : " " + D.doc.currency;
      return "<tr><td>" + esc(D.doc.id) + "</td><td>" + esc(D.doc.counterparty) + "</td><td>" + esc(x.g.name) + "</td><td>" + esc(rs.service) + "</td><td>" + esc(x.r.sites) + "</td><td>" + esc(x.r.basis) + '</td><td class="num">' + esc(x.r.value) + unit + "</td><td>" + esc(D.doc.currency) + "</td><td>§" + esc(x.r.section) + "</td><td>p." + x.r.page + "</td><td>" + esc({ pending: "Pending", approved: "Approved", rejected: "Rejected", na: "N/A" }[rs.status]) + "</td></tr>";
    }).join("");
  }
  function renderJson() {
    var out = { document: { id: D.doc.id, counterparty: D.doc.counterparty, category: D.doc.category, currency: D.doc.currency, applicable: { from: D.doc.from, to: D.doc.to } }, values: allRows().filter(function (x) { return S.rows[x.r.key].status === "approved"; }).map(function (x) {
      var rs = S.rows[x.r.key]; return { group: x.g.name, service: rs.service, sites: x.r.sites, basis: x.r.basis, rate: x.r.value, section: x.r.section, source_page: x.r.page, confidence: x.r.conf / 100, status: rs.edited ? "approved_edited" : "approved" };
    }) };
    $("#json-out").textContent = JSON.stringify(out, null, 2);
  }
  function renderDocHistory() { $("#history-list").innerHTML = timeline(S.history); }
  function renderGlobalHistory() {
    var base = [
      { time: "09:41", text: "Exported rate card for SLA-2025-081", sub: "17 values · Jordan Mercer", kind: "ok" },
      { time: "09:38", text: "Document approved: SLA-2025-081", sub: "All 17 values decided", kind: "ok" },
      { time: "Sep 11", text: "Document approved: LSA-2024-207", sub: "22 values · Priya Natarajan", kind: "ok" },
      { time: "Sep 11", text: "Uploaded LSA-2024-207_Riverside_DC_lease.pdf", sub: "Classified as property lease", kind: "" }
    ];
    $("#history-global").innerHTML = timeline(S.history.concat(base));
  }
  function timeline(items) {
    if (!items.length) return '<li><time>—</time><i></i><div><strong>Nothing yet</strong><span>Actions on this document will appear here.</span></div></li>';
    return items.map(function (h) { return "<li" + (h.kind ? ' class="' + h.kind + '"' : "") + "><time>" + esc(h.time) + "</time><i></i><div><strong>" + esc(h.text) + "</strong><span>" + esc(h.sub) + "</span></div></li>"; }).join("");
  }
  $("#download-xlsx").addEventListener("click", function () {
    var n = allRows().filter(function (x) { return S.rows[x.r.key].status === "approved"; }).length;
    if (!n) { toast("Nothing approved yet — approve values first."); return; }
    S.docStatus = "Exported";
    log("Exported rate card", "rate-card_" + D.doc.id + ".xlsx · " + n + " approved values · 1 sheet", "ok");
    toast('<svg viewBox="0 0 24 24"><path d="m5 12 4.5 4.5L19 7"/></svg><span><b>rate-card_' + D.doc.id + ".xlsx</b> downloaded · " + n + " approved values, 1 sheet</span>", 4200);
    renderReview();
    tour.after("download");
  });

  /* ---------------- toast ---------------- */
  var toastT;
  function toast(html, ms) {
    var t = $("#toast"); t.innerHTML = /^</.test(html) ? html : "<span>" + html + "</span>"; t.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, ms || 3000);
  }

  /* ---------------- tour ---------------- */
  var STEPS = [
    { id: "drop", major: 1, side: "right", title: "Upload the agreement", body: "Click the drop zone and choose the sample file. Nothing is really uploaded — the walkthrough uses a prepared 48-page supplier agreement.", target: function () { return $("#dropzone"); }, auto: openPicker },
    { id: "pick", major: 1, side: "right", title: "Choose the Meridian agreement", body: "Pick the highlighted file.", target: function () { return $("#picker-list li.is-main"); }, auto: function () { selectFile(0); } },
    { id: "open", major: 1, side: "top", title: "Open it", body: "The document is classified, its pages routed, the fields extracted, scored and cited — watch the stages.", target: function () { return $("#picker-open"); }, auto: openFile },
    { id: "open-doc", major: 2, side: "bottom", title: "Open the extracted document", body: "Extraction finished: 25 values from 48 pages, one of them flagged for a human. Click the row to review it.", target: function () { return $("#doc-table tr.is-new"); }, auto: openDoc },
    { id: "expand", major: 3, side: "left", title: "Expand a service group", body: "Each group holds the values extracted from one part of the schedule, with a confidence badge and a pending count. Open Routine cleaning.", target: function () { return $('.group[data-group="cleaning"] .group-head'); }, auto: function () { toggleGroup("cleaning", true); } },
    { id: "cite", major: 4, side: "left", title: "Follow the citation", body: "Every value cites its source page. Click p.7 — the viewer jumps to the page and highlights the line the value came from.", target: function () { return $('.group[data-group="cleaning"] [data-cite="cleaning:0"]'); }, auto: function () { cite("cleaning:0"); } },
    { id: "approve-row", major: 4, side: "top", title: "Approve the value", body: "Row details show the extracted value, its evidence and why the confidence is what it is. Approve it.", target: function () { return $("#details .act-approve"); }, anchor: function () { return $("#details .details-head"); }, auto: function () { decideRow("cleaning:0", "approved"); } },
    { id: "expand-discount", major: 5, side: "left", title: "Resolve the flagged value", body: "A business-rule validator caught a gap between two discount tiers. Open Volume discounts.", target: function () { return $('.group[data-group="discount"] .group-head'); }, auto: function () { toggleGroup("discount", true); } },
    { id: "flag-row", major: 5, side: "left", title: "Open the flagged row", body: "Click the row carrying the validator warning.", target: function () { return $('.group[data-group="discount"] tr.has-flag'); }, auto: function () { selectRow("discount:3"); } },
    { id: "fix", major: 5, side: "top", title: "Apply the suggested correction", body: "The validator names the rule and proposes the fix. One click corrects the value and records who changed what.", target: function () { return $("#details .act-fix"); }, anchor: function () { return $("#details .details-head"); }, auto: function () { applyFix("discount:3"); } },
    { id: "approve-all", major: 6, side: "left", title: "Approve everything else", body: "The remaining values are high-confidence. Approve all, then export.", target: function () { return $("#approve-all"); }, auto: approveAll },
    { id: "tab-ratecard", major: 6, side: "bottom", title: "Open the rate card", body: "The export is a flat rate card — the same columns as the file you download.", target: function () { return $('.tab[data-tab="ratecard"]'); }, auto: function () { setTab("ratecard"); } },
    { id: "download", major: 6, side: "left", title: "Download the rate card", body: "Only approved values are exported, each with its section and source page.", target: function () { return $("#download-xlsx"); }, auto: function () { $("#download-xlsx").click(); } }
  ];
  var MAJORS = 6;
  var tour = {
    active: false, i: 0, el: $("#tour"), target: null, tries: 0,
    start: function () { this.active = true; this.i = 0; document.body.classList.add("tour-on"); $("#tour-pill").hidden = false; $("#tour-toggle").textContent = "Exit guide"; this.show(); },
    show: function () {
      var st = STEPS[this.i], self = this, t = st.target();
      if (!t) { if (this.tries++ < 40) return void requestAnimationFrame(function () { self.show(); }); return; }
      this.tries = 0;
      if (this.target) this.target.classList.remove("tour-target");
      this.target = t; t.classList.add("tour-target");
      $("#tour-step").textContent = "Step " + st.major + " of " + MAJORS;
      $("#tour-title").textContent = st.title; $("#tour-body").textContent = st.body;
      var bars = ""; for (var k = 1; k <= MAJORS; k++) bars += '<i class="' + (k < st.major ? "is-done" : k === st.major ? "is-done" : "") + '"></i>';
      $("#tour-progress").innerHTML = bars;
      this.el.hidden = false; this.el.dataset.side = st.side;
      try { t.scrollIntoView({ block: "center", behavior: "smooth", inline: "nearest" }); } catch (e) {}
      this.reposition(); setTimeout(function () { self.reposition(); }, 350); setTimeout(function () { self.reposition(); }, 700);
    },
    after: function (id) { if (!this.active || !id) return; if (STEPS[this.i].id === id) this.next(); },
    next: function () {
      if (!this.active) return;
      if (STEPS[this.i].id === "open" && !S.uploaded) return; /* processing runs; documents screen calls next() */
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
      $("#gate-body").innerHTML = "One document went from upload to an exported rate card, and a human decided every value that left. Explore the workspace freely: open any group, follow any citation, reopen the JSON and history tabs.<ol><li>Upload and classify</li><li>Extract against the schema and rules</li><li>Score, cite and validate</li><li>Review beside the source page</li><li>Resolve what the validators flagged</li><li>Export only what was approved</li></ol>";
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
    if (e.target.closest("#tour, #tour-toggle, #gate")) return;
    var el = e.target.closest("button, a, tr.clickable, .group-head, li[data-file], .tab, .cite, input, label");
    if (!el) return;
    if (tour.target.contains(el) || el.contains(tour.target)) return;
    e.preventDefault(); e.stopPropagation(); tour.nudge();
  }, true);
  window.addEventListener("resize", function () { tour.reposition(); });
  document.addEventListener("scroll", function () { tour.reposition(); }, true);
  $("#tour-skip").addEventListener("click", function () { tour.skip(); });
  $("#tour-toggle").addEventListener("click", function () { if (tour.active) tour.exit(); else location.href = location.pathname; });

  /* ---------------- boot ---------------- */
  go("upload");
  if (params.get("tour") === "off") { tour.exit(); $("#gate").hidden = true; }
  else {
    $("#gate").hidden = false;
    $("#gate-start").addEventListener("click", function () { $("#gate").hidden = true; tour.start(); });
    $("#gate-free").addEventListener("click", function () { $("#gate").hidden = true; tour.exit(); });
  }
  window.DEMO = { state: S, tour: tour, go: go };
})();
