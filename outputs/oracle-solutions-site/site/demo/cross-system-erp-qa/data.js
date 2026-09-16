/* Demo data — Norwell Group, a fictional multi-entity group on three ERPs
   (Oracle Fusion Cloud ERP, JD Edwards EnterpriseOne, NetSuite) plus one
   in-house Oracle Database schema and one non-Oracle CRM landed as Iceberg
   tables. Everything here is synthetic: invented entities, suppliers, tax
   registration numbers, accounts and balances. Oracle object and column names
   are real (POZ_SUPPLIERS, F0411.RPDOC, transactionLine, ...) because the
   demo runs on those products; no customer of any kind appears.

   Nothing in the KPI band is typed in. The page calls computeKpis(state) and
   answer(qid, role, decisions); both derive every figure from the arrays
   below, so the steward's decision in step 5 recomputes the band, the answers
   and the duplicate list at once. tools/erp-qa-check.js asserts the lot.

   Public API on window.ERPQA_DATA
   -------------------------------------------------------------------------
   world, sources[], views[], glossary[], roles{}, personas[], suppliers[],
   records[], matches[], accounts[], groupAccounts{}, glRows[], ledgers[],
   pl[], dupPairs[], questions[], audit[], refreshStages[], decisions[]

   initialState()                     -> {refreshed:false, decisions:[]}
   computeKpis(state)                 -> {tiles[], records, resolved, ...}
   applyDecision(state, decision)     -> {state, decision, changed}
   answer(questionId, role, decisions)-> {rows[], columns[], sql, trace[], ...}
   resolution(decisions)              -> {golden[], resolvedIds, pending, ...}
   goldenSuppliers(decisions)         -> golden party list for that state
   plLines(decisions) / ledgerRecon() / dupPairsFor(decisions)
   traceFor(qid, role) / freshnessFor(qid) / sqlFor(qid)
   fmtUsd(n) / fmtMoney(n, ccy) / maskTaxId(t) / pct1(a, b)
   ------------------------------------------------------------------------- */
window.ERPQA_DATA = (function () {
  "use strict";

  /* ------------------------------------------------------------ helpers */
  function r2(n) { return Math.round(n * 100) / 100; }
  function r1(n) { return Math.round(n * 10) / 10; }
  function pct1(a, b) { return Math.round((a / b) * 1000) / 10; }
  function sum(a, f) { var t = 0, i; for (i = 0; i < a.length; i++) t += f ? f(a[i], i) : a[i]; return t; }
  function fmtUsd(n) { return "USD " + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function fmtMoney(n, ccy) { return ccy + " " + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function fmtM(n) { return (Math.round(n / 1e5) / 10).toFixed(1) + " M"; }
  function maskTaxId(t) { return t ? "**-***" + String(t).slice(-4) : "—"; }
  /* one seeded generator for the whole file, so every run of the page and of
     the check script produces byte-identical data */
  var _seed = 20261006;
  function rnd() { _seed = (_seed * 1103515245 + 12345) % 2147483648; return _seed / 2147483648; }
  function ri(lo, hi) { return lo + Math.floor(rnd() * (hi - lo + 1)); }
  function shuffled(n) { var a = [], i, j, t; for (i = 0; i < n; i++) a.push(i); for (i = n - 1; i > 0; i--) { j = Math.floor(rnd() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* --------------------------------------------------------------- world */
  var TODAY = "2026-10-06", NOW_MIN = 9 * 60 + 40; /* 09:40 local */
  function clock(minAgo) {
    var m = NOW_MIN - minAgo, h = Math.floor(m / 60);
    return ("0" + h).slice(-2) + ":" + ("0" + (m - h * 60)).slice(-2);
  }
  function dur(min) { return min < 60 ? min + " min" : Math.floor(min / 60) + " h " + ("0" + (min % 60)).slice(-2) + " min"; }

  var world = {
    company: "Norwell Group",
    subtitle: "Multi-entity group · plants, distribution and services",
    currency: "USD",
    period: { id: "FY2026-Q3", label: "Q3 FY2026", range: "1 Jul – 30 Sep 2026", start: "2026-07-01", end: "2026-09-30", short: "Q3 FY2026" },
    today: TODAY,
    todayLabel: "Tue 6 Oct 2026",
    nowLabel: "09:40",
    closeState: "Close in progress · day 4 of the Q3 close",
    entities: [
      { id: "NG-EU", name: "Norwell Europe", system: "FUSION", currency: "GBP", note: "Plants and central procurement" },
      { id: "NG-NA", name: "Norwell North America", system: "JDE", currency: "CAD", note: "JDE company 00100 · distribution" },
      { id: "NG-SV", name: "Arden Services", system: "NETSUITE", currency: "USD", note: "Field and project services" }
    ]
  };

  var personas = [
    { id: "dana", name: "Dana Whitfield", title: "Group Controller", initials: "DW", role: "CONTROLLER", scope: "All entities · unmasked" },
    { id: "priya", name: "Priya Natarajan", title: "Finance data steward", initials: "PN", role: "STEWARD", scope: "Owns Mapping review" },
    { id: "marcus", name: "Marcus Bell", title: "Regional analyst, North America", initials: "MB", role: "ANALYST_NA", scope: "NG-NA only · bank and tax masked" }
  ];

  var roles = {
    CONTROLLER: {
      id: "CONTROLLER", name: "Group Controller", persona: "dana",
      rowPolicy: null, rowPolicyText: "No row restriction · all three entities",
      masked: [], maskedText: "No column masking",
      allowList: "FIN_QA_V3", entities: ["NG-EU", "NG-NA", "NG-SV"]
    },
    ANALYST_NA: {
      id: "ANALYST_NA", name: "Regional analyst NA", persona: "marcus",
      rowPolicy: "ENTITY IN ('NG-NA')",
      rowPolicyText: "Row policy GOLD_RLS_ENTITY applied · ENTITY IN ('NG-NA')",
      masked: ["BANK_ACCOUNT", "TAX_ID"],
      maskedText: "BANK_ACCOUNT redacted · TAX_ID partially redacted",
      allowList: "FIN_QA_V3", entities: ["NG-NA"]
    }
  };

  /* ------------------------------------------------------------- sources */
  var sources = [
    { id: "FUSION", name: "Oracle Fusion Cloud ERP", short: "Fusion", entity: "NG-EU", entityName: "Norwell Europe",
      kind: "Oracle application", catalog: "FUSION_ERP", currency: "GBP", rate: 1.2740,
      objects: ["AP_INVOICES_ALL", "AP_INVOICE_LINES_ALL", "POZ_SUPPLIERS", "POZ_SUPPLIER_SITES_ALL_M", "HZ_PARTIES", "GL_BALANCES", "GL_CODE_COMBINATIONS", "GL_LEDGERS", "GL_PERIODS", "GL_DAILY_RATES"],
      rowCount: 4128600, feed: "Prebuilt Fusion pipeline · BICC extracts to OCI Object Storage, hourly", feedShort: "Fusion pipeline · hourly", freshnessMin: 12 },
    { id: "JDE", name: "JD Edwards EnterpriseOne 9.2", short: "JDE", entity: "NG-NA", entityName: "Norwell North America",
      kind: "Oracle application", catalog: "JDE_E1", currency: "CAD", rate: 0.7315,
      objects: ["F0411", "F0101", "F0911", "F0901", "F0006", "F0010", "F0008"],
      rowCount: 2840190, feed: "Oracle GoldenGate change data capture", feedShort: "GoldenGate CDC", freshnessMin: 4 },
    { id: "NETSUITE", name: "NetSuite", short: "NetSuite", entity: "NG-SV", entityName: "Arden Services",
      kind: "Oracle application", catalog: "NETSUITE", currency: "USD", rate: 1.0,
      objects: ["vendor", "transaction", "transactionLine", "account", "subsidiary", "customer"],
      rowCount: 986240, feed: "NetSuite pipeline · SuiteAnalytics Connect, every 30 min", feedShort: "SuiteAnalytics Connect · 30 min", freshnessMin: 38 },
    { id: "CRB", name: "Contracts and rebates (in-house)", short: "Contracts", entity: "NG-EU", entityName: "Group procurement",
      kind: "Oracle Database 23ai · schema CRB", catalog: "CRB_INHOUSE", currency: "USD", rate: 1.0,
      objects: ["CRB_CONTRACTS", "CRB_REBATE_TERMS", "CRB_SUPPLIER_XREF"],
      rowCount: 18420, feed: "Database link", feedShort: "Database link", freshnessMin: 2 },
    { id: "CRM", name: "CRM (non-Oracle)", short: "CRM", entity: "GROUP", entityName: "Group sales",
      kind: "Iceberg tables in object storage", catalog: "CRM_ICEBERG", currency: "USD", rate: 1.0,
      objects: ["CRM_ACCOUNT", "CRM_OPPORTUNITY"],
      rowCount: 212840, feed: "External table over Iceberg, refreshed hourly", feedShort: "External table · hourly", freshnessMin: 65 }
  ];
  var SRC = {}; sources.forEach(function (s) { s.freshLabel = dur(s.freshnessMin); s.asOf = clock(s.freshnessMin); SRC[s.id] = s; });
  var stalest = sources.slice().sort(function (a, b) { return b.freshnessMin - a.freshnessMin; })[0];

  /* ------------------------------------------------- certified views (13) */
  var views = [
    ["SUPPLIER_360", "One row per golden supplier with every source record, the match score and the match reason.", "2026-09-28", ["FUSION", "JDE", "NETSUITE", "CRB"]],
    ["AP_INVOICE_X", "Payables invoices from all three ERPs on one grain, document type and status harmonised through DOC_MAP.", "2026-09-28", ["FUSION", "JDE", "NETSUITE"]],
    ["SUPPLIER_SPEND_Q", "Invoiced amount per golden supplier, source system and group period, translated at the period average rate.", "2026-09-30", ["FUSION", "JDE", "NETSUITE"]],
    ["DUP_INVOICE_PAIRS", "Candidate duplicate payments: same golden supplier, same normalised invoice number, amount within 0.5 % after translation, different source systems.", "2026-09-30", ["FUSION", "JDE", "NETSUITE"]],
    ["COA_MAP", "Local account to group account, with the mapping rule, its score and its status.", "2026-10-06", ["FUSION", "JDE", "NETSUITE"]],
    ["ENTITY_MAP", "Legal entity, business unit and JDE company to reporting entity.", "2026-08-14", ["FUSION", "JDE", "NETSUITE"]],
    ["PERIOD_MAP", "Source accounting calendar to group period. JDE's fiscal year opens in July, so JDE period 3 is calendar September.", "2026-07-30", ["FUSION", "JDE", "NETSUITE"]],
    ["DOC_MAP", "Document types and payment statuses across systems: JDE RPDCT PV/PR/PM, Fusion INVOICE_TYPE_LOOKUP_CODE STANDARD/CREDIT/PREPAYMENT, NetSuite VendBill/VendCred.", "2026-08-03", ["FUSION", "JDE", "NETSUITE"]],
    ["GROUP_TRIAL_BALANCE", "Per ledger: trial-balance total in local currency, the period average rate, the translated total, the mapped total and the residual.", "2026-10-06", ["FUSION", "JDE", "NETSUITE"]],
    ["CONSOLIDATED_PL", "Group profit and loss by group account and source system for a group period, on mapped and translated balances.", "2026-10-06", ["FUSION", "JDE", "NETSUITE"]],
    ["IC_MATCHES", "Intercompany balances by entity pair with tolerance and translation applied: matched, timing difference or unmatched.", "2026-09-30", ["FUSION", "JDE", "NETSUITE"]],
    ["O2C_EXCEPTIONS", "Order lines past their promised date and not shipped, joined to the CRM account and its tier.", "2026-09-22", ["FUSION", "NETSUITE", "CRM"]],
    ["MAPPING_DECISIONS", "Every steward decision on a supplier match or an account mapping: who, when, why, and the rule it left behind.", "2026-10-06", ["FUSION", "JDE", "NETSUITE"]]
  ].map(function (v) {
    return { id: v[0], name: "GOLD." + v[0], owner: "Group Finance", definition: v[1], changed: v[2], sources: v[3] };
  });

  /* ------------------------------------------------- Master catalog terms */
  var glossary = [
    { term: "supplier", synonyms: ["vendor", "address book", "creditor", "payee"],
      definition: "A party we buy from. Fusion POZ_SUPPLIERS joined to HZ_PARTIES, JDE F0101 rows with search type V, NetSuite vendor. Resolved to one golden party in GOLD.SUPPLIER_360.",
      owner: "Group Finance", changed: "2026-08-14" },
    { term: "last quarter", synonyms: ["Q3", "the quarter", "this quarter"],
      definition: "Q3 FY2026, 1 Jul – 30 Sep 2026, resolved through GOLD.PERIOD_MAP. JDE's fiscal year opens in July, so JDE periods 1–3 are the group's Q3.",
      owner: "Group Finance", changed: "2026-07-30" },
    { term: "group spend", synonyms: ["spend", "paid", "we paid", "invoiced amount"],
      definition: "Invoiced amount on payables documents, translated to USD at the Q3 average rate from GL_DAILY_RATES. Credit memos net off; prepayments are excluded.",
      owner: "Group Finance", changed: "2026-09-04" },
    { term: "paid", synonyms: ["settled", "payment made"],
      definition: "AP_INVOICES_ALL.PAYMENT_STATUS_FLAG = 'Y' · F0411.RPPST = 'P' · NetSuite status = 'paidInFull'.",
      owner: "Group Finance", changed: "2026-08-03" },
    { term: "group account", synonyms: ["account", "consolidated account", "group chart"],
      definition: "One of the 120 accounts in the group chart. Local accounts reach it through GOLD.COA_MAP; anything unmapped is reported as a residual, never silently dropped.",
      owner: "Group Finance", changed: "2026-10-06" },
    { term: "duplicate payment", synonyms: ["paid twice", "double payment"],
      definition: "Two payables documents on the same golden supplier with the same normalised invoice number and an amount within 0.5 % after translation, in different source systems.",
      owner: "Group Finance", changed: "2026-09-30" },
    { term: "best accounts", synonyms: ["top customers", "key accounts", "tier A"],
      definition: "CRM accounts with tier A, read from the external Iceberg table CRM_ACCOUNT.",
      owner: "Group Sales", changed: "2026-09-22" },
    { term: "delayed order", synonyms: ["late order", "overdue order", "slipped order"],
      definition: "An order line whose promised date has passed and which has not shipped.",
      owner: "Group Operations", changed: "2026-09-22" },
    { term: "intercompany", synonyms: ["IC", "related party", "counterparty"],
      definition: "A balance between two reporting entities of the group, matched by entity pair through GOLD.ENTITY_MAP with a 0.5 % tolerance after translation.",
      owner: "Group Finance", changed: "2026-09-30" },
    { term: "rebate", synonyms: ["volume rebate", "supplier rebate", "claim"],
      definition: "An entitlement in CRB_REBATE_TERMS whose threshold is met by group spend in the period and for which no claim document exists.",
      owner: "Group Procurement", changed: "2026-08-22" }
  ];
  var GLOSS = {}; glossary.forEach(function (g) { GLOSS[g.term] = g; });

  /* ================================================================== */
  /* SUPPLIER MASTER — 412 records, 200 golden parties                  */
  /* ================================================================== */
  /* Composition, fixed by construction so the band's counts hold exactly:
       confirmed clusters  173 covering 360 records (160 pairs, 12 triples,
                               1 quad) -> 187 auto-confirmed proposals
       loose records        52 = 24 verified singletons
                               + 22 records proposed onto a confirmed cluster
                               + 6 records in 3 proposed pairs
       pending proposals    25 (22 + 3), covering the 28 unresolved records
       records by system    Fusion 188 · JDE 131 · NetSuite 93 = 412
     "Resolved" = in a confirmed cluster, or a verified singleton. Before the
     model (exact match, system by system) only the 228 records in clusters
     an exact tax-id match would have found, plus the 24 unique singletons,
     were resolved: 252 of 412. */

  var STEM = ["Alderney", "Ashcombe", "Barnwell", "Bexley", "Braeburn", "Bramley", "Brindle", "Calderwood", "Carrick", "Corbridge", "Cranbourne", "Denholm", "Dunmore", "Ebbsworth", "Elmsworth", "Fairholme", "Fernlea", "Garrick", "Glenmoor", "Grantley", "Halden", "Harbury", "Hartwell", "Havenbrook", "Inverleith", "Jessamine", "Kestrel", "Kingsmere", "Kirkland", "Langmere", "Larkfield", "Marchwood", "Marlowe", "Merrion", "Norbury", "Northline", "Oakfield", "Orion", "Pembury", "Pennington", "Pentland", "Quainton", "Ravenscourt", "Redgrave", "Rookwood", "Sedgemoor", "Selwyn", "Stanhope", "Tamsin", "Thornby", "Ulverton", "Vantry", "Welbeck", "Westbourne", "Wexford", "Whitmore", "Yardley", "Aldwych", "Bickerton", "Camberley", "Draycott", "Eastbury", "Foxhollow", "Granby", "Hasketon", "Ingleby", "Kilnwood", "Loxley", "Melbury", "Netherby", "Ospringe", "Padstow", "Quarrington", "Ramsden", "Shelbourne", "Tarrington", "Upwood", "Vernham", "Wharton", "Yalding", "Abberley", "Blakeney", "Crowmarsh", "Duxbury", "Everleigh", "Fordwich", "Gadbrook", "Hedingham", "Ilmington", "Jarrow", "Kelsale", "Linstead", "Mattingley", "Newnham", "Ormskirk", "Prestbury", "Quenby", "Rothbury", "Sandwell", "Thurlow"];
  var TRADE = ["Components", "Logistics", "Packaging", "Tooling", "Industrial Supplies", "Electrical", "Chemicals", "Freight Services", "Bearings", "Castings", "Instrumentation", "Fabrication", "Hydraulics", "Coatings", "Fasteners", "Abrasives", "Seals", "Gaskets", "Motors", "Controls", "Automation", "Calibration", "Plastics", "Metals", "Timber", "Adhesives", "Lubricants", "Filtration", "Valves", "Pumps", "Conveyors", "Safety Equipment", "Uniforms", "Catering Services", "Facilities", "Print Services", "Laboratory Supplies", "Machining", "Welding Supplies", "Cable Assemblies"];
  var CITY = {
    FUSION: ["Manchester", "Leeds", "Bristol", "Sheffield", "Coventry", "Derby", "Swindon", "Reading", "Glasgow", "Cardiff", "Norwich", "Preston", "Luton", "Ipswich", "Exeter", "Dundee"],
    JDE: ["Mississauga", "Brampton", "Hamilton", "Windsor", "Kitchener", "Oshawa", "Barrie", "Guelph", "Cambridge", "Laval", "Longueuil", "Burnaby", "Surrey", "Calgary", "Edmonton", "Winnipeg"],
    NETSUITE: ["Columbus", "Akron", "Dayton", "Toledo", "Fort Wayne", "Peoria", "Rockford", "Springfield", "Davenport", "Wichita", "Tulsa", "Omaha", "Boise", "Reno", "Spokane", "Albany"]
  };
  var SUFFIX = { FUSION: ["Ltd", "Ltd", "Ltd", "PLC", "Group Ltd"], JDE: ["Ltd", "Inc", "Ltd", "Corp"], NETSUITE: ["Inc", "LLC", "Corp", "Inc"] };
  var COUNTRY = { FUSION: "GB", JDE: "CA", NETSUITE: "US" };
  var SYSMETA = {
    FUSION: { table: "POZ_SUPPLIERS", keyCol: "SEGMENT1", nameCol: "HZ_PARTIES.PARTY_NAME", docTable: "AP_INVOICES_ALL", docKey: "INVOICE_NUM" },
    JDE: { table: "F0101", keyCol: "ABAN8", nameCol: "ABALPH", docTable: "F0411", docKey: "RPDOC" },
    NETSUITE: { table: "vendor", keyCol: "entityid", nameCol: "companyname", docTable: "transaction", docKey: "tranid" }
  };

  var records = [], suppliers = [], matches = [];
  var _rc = { FUSION: 0, JDE: 0, NETSUITE: 0 }, _mid = 0, _usedName = {};
  /* generated ids live in their own band so they can never collide with the
     hand-written ones (Fusion S-1xxxx, JDE 11xxxx, NetSuite V-4xxx) */
  function nextId(sys) {
    _rc[sys]++;
    if (sys === "FUSION") return "S-" + (20000 + _rc[sys] * 7);
    if (sys === "JDE") return String(120000 + _rc[sys] * 7);
    return "V-" + (5000 + _rc[sys] * 3);
  }
  function taxFor(sys, tail) {
    var t = tail || ("" + ri(1000, 9999));
    if (sys === "FUSION") return "GB" + ri(70, 98) + ri(100000, 999999) + t;
    if (sys === "JDE") return "CA" + ri(70, 98) + ri(1000, 9999) + t;
    return "US" + ri(30, 89) + ri(1000, 9999) + t;
  }
  function genName(sys) {
    var n, guard = 0;
    do { n = STEM[ri(0, STEM.length - 1)] + " " + TRADE[ri(0, TRADE.length - 1)] + " " + SUFFIX[sys][ri(0, SUFFIX[sys].length - 1)]; guard++; } while (_usedName[n] && guard < 60);
    _usedName[n] = 1; return n;
  }
  var RBY = {};
  function mkRecord(sys, o) {
    o = o || {};
    var sysId = o.sysId || nextId(sys);
    var name = o.name || genName(sys), city = o.city || CITY[sys][ri(0, CITY[sys].length - 1)];
    var local = o.spendLocal === undefined ? (ri(0, 10) > 7 ? 0 : ri(1800, 264000)) : o.spendLocal;
    var r = {
      id: sys + ":" + sysId, sys: sys, sysId: sysId,
      name: name, city: city, country: COUNTRY[sys],
      taxId: o.taxId || taxFor(sys), bankLast4: o.bank || ("" + ri(1000, 9999)),
      currency: SRC[sys].currency, spendLocal: local, spendUsd: r2(local * SRC[sys].rate),
      entity: SRC[sys].entity, table: SYSMETA[sys].table,
      cluster: null, proposal: null, exactBefore: false
    };
    r.srcRef = SYSMETA[sys].table + "." + SYSMETA[sys].keyCol + " = " + (sys === "JDE" ? r.sysId : "'" + r.sysId + "'");
    records.push(r); RBY[r.id] = r; return r;
  }
  function byId(id) { return RBY[id]; }

  var _gid = 0;
  function mkGolden(name, recs, basis, score, status) {
    _gid++;
    var g = {
      id: "G-" + (1000 + _gid), name: name, records: recs.map(function (r) { return r.id; }),
      systems: [], basis: basis, score: score, status: status || "confirmed",
      country: recs[0].country, city: recs[0].city, taxId: recs[0].taxId
    };
    recs.forEach(function (r) { if (g.systems.indexOf(r.sys) < 0) g.systems.push(r.sys); if (status !== "provisional") r.cluster = g.id; });
    g.spendUsd = r2(sum(recs, function (r) { return r.spendUsd; }));
    suppliers.push(g); return g;
  }
  function mkMatch(a, b, score, basis, status, ev, note) {
    _mid++;
    var m = {
      id: "M-" + (2000 + _mid), records: [a.id, b.id], score: score, basis: basis,
      status: status, evidence: ev.map(chip), note: note || "",
      spend: [{ sys: a.sys, usd: a.spendUsd }, { sys: b.sys, usd: b.spendUsd }],
      systems: a.sys === b.sys ? [a.sys] : [a.sys, b.sys]
    };
    matches.push(m); return m;
  }
  function chip(t) {
    var last = t.slice(-1);
    return { t: t, kind: t.split(" ")[0], hit: last === "✓" ? true : last === "✗" ? false : null };
  }

  /* ---- 1. the eleven hand-written confirmed cross-system parties ------- */
  /* These are the suppliers that carry Q3 invoices in more than one system —
     the answer to saved question 1. Every other cross-system cluster in the
     master has Q3 spend in one system only. */
  var HAND = [
    { name: "Halden Tooling Group", basis: "name+address+contract", score: 0.97, pattern: "FFJN",
      recs: [
        { sys: "FUSION", sysId: "S-10118", name: "Halden Tooling Ltd", city: "Sheffield", taxId: "GB8114027", bank: "3318", spendLocal: 412600 },
        { sys: "FUSION", sysId: "S-11640", name: "Halden Tooling (Derby) Ltd", city: "Derby", taxId: "GB8114027", bank: "3318", spendLocal: 188340 },
        { sys: "JDE", sysId: "114820", name: "HALDEN TOOLING CANADA LTD", city: "Cambridge", taxId: "CA7746118", bank: "7204", spendLocal: 486220 },
        { sys: "NETSUITE", sysId: "V-4066", name: "Halden Tooling Inc", city: "Toledo", taxId: "US3644190", bank: "9911", spendLocal: 289410 }
      ], ev: ["name 0.96", "tax id ✓", "bank ✓", "city ✗", "contract CRB-2104 ✓"] },
    { name: "Bramley Logistics", basis: "taxId", score: 0.99, pattern: "FN",
      recs: [
        { sys: "FUSION", sysId: "S-10204", name: "Bramley Logistics Ltd", city: "Leeds", taxId: "GB7748102", bank: "5520", spendLocal: 642180 },
        { sys: "NETSUITE", sysId: "V-4102", name: "Bramley Logistics LLC", city: "Columbus", taxId: "US3644072", bank: "5520", spendLocal: 368240 }
      ], ev: ["name 0.98", "tax id ✓", "bank ✓", "city ✗"] },
    { name: "Kestrel Components", basis: "name+address", score: 0.94, pattern: "FFJ",
      recs: [
        { sys: "FUSION", sysId: "S-10337", name: "Kestrel Components Ltd", city: "Coventry", taxId: "GB7719440", bank: "6612", spendLocal: 402880 },
        { sys: "FUSION", sysId: "S-11988", name: "Kestrel Component Supplies", city: "Coventry", taxId: "GB7719440", bank: "6612", spendLocal: 96420 },
        { sys: "JDE", sysId: "115380", name: "KESTREL COMPONENTS INC", city: "Brampton", taxId: "CA8840216", bank: "1188", spendLocal: 448160 }
      ], ev: ["name 0.93", "tax id ✗", "bank ✗", "city ✗", "contract CRB-2118 ✓"] },
    { name: "Tamsin Packaging", basis: "taxId", score: 1.00, pattern: "FN",
      recs: [
        { sys: "FUSION", sysId: "S-10455", name: "Tamsin Packaging Ltd", city: "Bristol", taxId: "GB7702884", bank: "4471", spendLocal: 421660 },
        { sys: "NETSUITE", sysId: "V-4141", name: "Tamsin Packaging Inc", city: "Akron", taxId: "US3617028", bank: "4471", spendLocal: 275480 }
      ], ev: ["name 1.00", "tax id ✓", "bank ✓", "city ✗"] },
    { name: "Wexford Industrial Supplies", basis: "name+address", score: 0.96, pattern: "FN",
      recs: [
        { sys: "FUSION", sysId: "S-10611", name: "Wexford Industrial Supplies Ltd", city: "Preston", taxId: "GB7760318", bank: "2290", spendLocal: 368220 },
        { sys: "NETSUITE", sysId: "V-4188", name: "Wexford Industrial Supply Corp", city: "Dayton", taxId: "US3690114", bank: "8817", spendLocal: 219040 }
      ], ev: ["name 0.95", "tax id ✗", "bank ✗", "city ✗", "contract CRB-2137 ✓"] },
    { name: "Ravenscourt Electrical", basis: "name+address", score: 0.93, pattern: "JN",
      recs: [
        { sys: "JDE", sysId: "116240", name: "RAVENSCOURT ELECTRICAL LTD", city: "Oshawa", taxId: "CA7781402", bank: "3360", spendLocal: 486320 },
        { sys: "NETSUITE", sysId: "V-4213", name: "Ravenscourt Electrical Inc", city: "Rockford", taxId: "US3644881", bank: "3360", spendLocal: 249060 }
      ], ev: ["name 0.97", "tax id ✗", "bank ✓", "city ✗"] },
    { name: "Aldwych Chemicals", basis: "name+address", score: 0.98, pattern: "FN",
      recs: [
        { sys: "FUSION", sysId: "S-10740", name: "Aldwych Chemicals Ltd", city: "Norwich", taxId: "GB7714026", bank: "7702", spendLocal: 284160 },
        { sys: "NETSUITE", sysId: "V-4240", name: "Aldwych Chemicals LLC", city: "Wichita", taxId: "US3690227", bank: "7702", spendLocal: 161900 }
      ], ev: ["name 0.99", "tax id ✗", "bank ✓", "city ✗"] },
    { name: "Marlowe Freight Services", basis: "name+address", score: 0.91, pattern: "FJ",
      recs: [
        { sys: "FUSION", sysId: "S-10862", name: "Marlowe Freight Services Ltd", city: "Luton", taxId: "GB7726940", bank: "1140", spendLocal: 214380 },
        { sys: "JDE", sysId: "117180", name: "MARLOWE FREIGHT SVCS LTD", city: "Hamilton", taxId: "CA7740228", bank: "6690", spendLocal: 292640 }
      ], ev: ["name 0.92", "tax id ✗", "bank ✗", "city ✗", "contract CRB-2166 ✓"] },
    { name: "Pentland Bearings", basis: "taxId", score: 0.99, pattern: "FN",
      recs: [
        { sys: "FUSION", sysId: "S-10977", name: "Pentland Bearings Ltd", city: "Glasgow", taxId: "GB7733118", bank: "8840", spendLocal: 238420 },
        { sys: "NETSUITE", sysId: "V-4266", name: "Pentland Bearings Inc", city: "Davenport", taxId: "US3611884", bank: "8840", spendLocal: 138100 }
      ], ev: ["name 0.98", "tax id ✓", "bank ✓", "city ✗"] },
    { name: "Calderwood Castings", basis: "name+address", score: 0.95, pattern: "FN",
      recs: [
        { sys: "FUSION", sysId: "S-11042", name: "Calderwood Castings Ltd", city: "Cardiff", taxId: "GB7707442", bank: "2214", spendLocal: 212640 },
        { sys: "NETSUITE", sysId: "V-4291", name: "Calderwood Castings Corp", city: "Peoria", taxId: "US3628840", bank: "5573", spendLocal: 127620 }
      ], ev: ["name 0.96", "tax id ✗", "bank ✗", "city ✗", "contract CRB-2172 ✓"] },
    { name: "Stanhope Instrumentation", basis: "name+address", score: 0.92, pattern: "FN",
      recs: [
        { sys: "FUSION", sysId: "S-11136", name: "Stanhope Instrumentation Ltd", city: "Ipswich", taxId: "GB7790226", bank: "9930", spendLocal: 186940 },
        { sys: "NETSUITE", sysId: "V-4318", name: "Stanhope Instruments LLC", city: "Spokane", taxId: "US3670114", bank: "9930", spendLocal: 117980 }
      ], ev: ["name 0.90", "tax id ✗", "bank ✓", "city ✗"] }
  ];
  var handGolden = [];
  HAND.forEach(function (h) {
    var recs = h.recs.map(function (rr) { _usedName[rr.name] = 1; return mkRecord(rr.sys, rr); });
    var g = mkGolden(h.name, recs, h.basis, h.score, "confirmed");
    g.multi = true; g.evidence = h.ev.map(chip); g.pattern = h.pattern;
    handGolden.push(g);
    /* one auto-confirmed proposal per edge inside the cluster */
    for (var i = 1; i < recs.length; i++) mkMatch(recs[0], recs[i], h.score, h.basis, "confirmed", h.ev);
  });
  /* the hand-written clusters consume: FFJN x1, FFJ x1, FN x7, FJ x1, JN x1 */

  /* ---- 2. the generated confirmed clusters ---------------------------- */
  /* pattern -> how many clusters the generator still owes, so that the
     per-system record totals land on 188 / 131 / 93 exactly */
  var GEN2 = [["FF", 52], ["FJ", 21], ["FN", 12], ["JJ", 34], ["JN", 12], ["NN", 20]];   /* 151 pairs   */
  var GEN3 = [["FFJ", 2], ["FFN", 4], ["FJN", 3], ["JJN", 2]];                             /* 11 triples  */
  var SYSOF = { F: "FUSION", J: "JDE", N: "NETSUITE" };
  function expand(defs) { var out = []; defs.forEach(function (d) { for (var i = 0; i < d[1]; i++) out.push(d[0]); }); return out; }
  var pat2 = expand(GEN2), pat3 = expand(GEN3);
  /* exactly 105 of the 151 generated pairs and 4 of the 11 generated triples
     are exact tax-id matches; with the three hand-written tax-id pairs that
     puts 228 records inside clusters an exact match would already have found */
  var taxPick2 = {}, taxPick3 = {};
  shuffled(pat2.length).slice(0, 105).forEach(function (i) { taxPick2[i] = 1; });
  shuffled(pat3.length).slice(0, 4).forEach(function (i) { taxPick3[i] = 1; });

  var genClusters = [];
  function buildCluster(pattern, isTax, idx) {
    var base = genName(SYSOF[pattern[0]]), stemName = base.replace(/ (Ltd|PLC|Inc|LLC|Corp|Group Ltd)$/, "");
    var tax = "" + ri(1000, 9999), bank = "" + ri(1000, 9999), city0 = null;
    var recs = pattern.split("").map(function (c, i) {
      var sys = SYSOF[c];
      var nm = i === 0 ? base : stemName + " " + SUFFIX[sys][ri(0, SUFFIX[sys].length - 1)];
      if (!city0) city0 = CITY[sys][ri(0, CITY[sys].length - 1)];
      return mkRecord(sys, {
        name: nm, city: sys === SYSOF[pattern[0]] ? city0 : CITY[sys][ri(0, CITY[sys].length - 1)],
        taxId: taxFor(sys, tax), bank: isTax ? bank : "" + ri(1000, 9999)
      });
    });
    var score = isTax ? r2(0.96 + rnd() * 0.04) : r2(0.90 + rnd() * 0.05);
    var ev = isTax
      ? ["name " + r2(0.92 + rnd() * 0.08).toFixed(2), "tax id ✓", "bank ✓", "city " + (recs[0].city === recs[recs.length - 1].city ? "✓" : "✗")]
      : ["name " + r2(0.90 + rnd() * 0.07).toFixed(2), "tax id ✗", "bank " + (rnd() > 0.5 ? "✓" : "✗"), "city " + (recs[0].city === recs[recs.length - 1].city ? "✓" : "✗")];
    var g = mkGolden(stemName, recs, isTax ? "taxId" : "name+address", score, "confirmed");
    g.evidence = ev.map(chip); g.pattern = pattern; g.multi = false;
    for (var i = 1; i < recs.length; i++) mkMatch(recs[0], recs[i], score, g.basis, "confirmed", ev);
    if (isTax) recs.forEach(function (r) { r.exactBefore = true; });
    genClusters.push(g); return g;
  }
  pat2.forEach(function (p, i) { buildCluster(p, !!taxPick2[i], i); });
  pat3.forEach(function (p, i) { buildCluster(p, !!taxPick3[i], i); });
  /* the three hand-written tax-id clusters count towards the same 228 */
  handGolden.forEach(function (g) { if (g.basis === "taxId") g.records.forEach(function (rid) { byId(rid).exactBefore = true; }); });

  /* ---- 3. the 25 proposals still waiting for a steward ---------------- */
  /* Twenty-two propose a new record onto a supplier the model already
     confirmed; three propose two loose records to each other. The Orion pair
     is the false one the steward rejects in step 5. */
  var PENDING = [
    /* [aSys, aName, aCity, aTax, aBank, aSpendLocal,
        bSys, bName, bCity, bTax, bBank, bSpendLocal, score, evidence, note] */
    ["FUSION", "Orion Fasteners Ltd", "Manchester", "GB8842317741", "4418", 356940,
     "JDE", "ORION FASTENING SYSTEMS INC", "Mississauga", "CA844162210", "9032", 393260, 0.86,
     ["name 0.91", "tax id ✗", "bank ✗", "city ✗", "country ✗"],
     "Normalised names agree, nothing else does. Both records carry Q3 invoices."],
    ["FUSION", "Whitmore Abrasives Ltd", "Sheffield", "GB7712048830", "2207", 84220,
     "FUSION", "Whitmoor Abrasives Limited", "Sheffield", "", "2207", 31480, 0.88,
     ["name 0.89", "tax id —", "bank ✓", "city ✓"],
     "Second record has no tax registration number on file."],
    ["JDE", "NORTHLINE CARTAGE LTD", "Hamilton", "CA7719033185", "5510", 142860,
     "NETSUITE", "Northline Cartage LLC", "Toledo", "US3644719021", "8841", 61240, 0.81,
     ["name 0.94", "tax id ✗", "bank ✗", "city ✗"],
     "Same trading name on two continents; no shared identifier."],
    ["FUSION", "Pennington Valves Ltd", "Leeds", "GB7740118206", "6641", 128420,
     "FUSION", "Pennington Valve Co", "Leeds", "GB7740118206", "6641", 22180, 0.87,
     ["name 0.86", "tax id ✓", "bank ✓", "city ✓"], "Looks like a second site opened as its own supplier."],
    ["FUSION", "Grantley Coatings Ltd", "Derby", "GB7788204412", "3092", 96340,
     "NETSUITE", "Grantley Coatings Inc", "Dayton", "US3660214408", "7718", 48220, 0.83,
     ["name 0.95", "tax id ✗", "bank ✗", "city ✗"], "Group buys from both; the legal link is unconfirmed."],
    ["FUSION", "Sedgemoor Bearings Ltd", "Swindon", "GB7702118840", "1174", 74160,
     "FUSION", "Sedgmoor Bearings Ltd", "Swindon", "GB7702118840", "1174", 18640, 0.89,
     ["name 0.88", "tax id ✓", "bank ✓", "city ✓"], "One character apart; same registration."],
    ["FUSION", "Ashcombe Adhesives Ltd", "Reading", "GB7714408820", "5548", 62740,
     "JDE", "ASHCOMBE ADHESIVE PRODUCTS", "Brampton", "CA7788114026", "2261", 88420, 0.79,
     ["name 0.82", "tax id ✗", "bank ✗", "city ✗"], "Trade names overlap; products differ."],
    ["FUSION", "Larkfield Plastics Ltd", "Coventry", "GB7760228014", "8830", 58120,
     "FUSION", "Larkfield Polymer Ltd", "Coventry", "GB7760228014", "4417", 26480, 0.77,
     ["name 0.74", "tax id ✓", "bank ✗", "city ✓"], "Same registration, different trading name and bank."],
    ["FUSION", "Cranbourne Filtration Ltd", "Norwich", "GB7733018842", "2206", 51480,
     "NETSUITE", "Cranbourne Filtration Corp", "Akron", "US3690114472", "9903", 37260, 0.84,
     ["name 0.96", "tax id ✗", "bank ✗", "city ✗"], "Sister companies or a coincidence of name."],
    ["FUSION", "Thornby Welding Supplies Ltd", "Preston", "GB7719902244", "6618", 44920,
     "FUSION", "Thornbury Welding Supplies", "Preston", "", "6618", 12840, 0.85,
     ["name 0.87", "tax id —", "bank ✓", "city ✓"], "Second record predates the tax-id field being mandatory."],
    ["FUSION", "Ebbsworth Lubricants Ltd", "Ipswich", "GB7706118834", "3374", 68240,
     "JDE", "EBBSWORTH LUBRICANTS CANADA", "Guelph", "CA7740228116", "5529", 96180, 0.84,
     ["name 0.93", "tax id ✗", "bank ✗", "city ✗", "contract CRB-2291 ✓"], "One group contract covers both."],
    ["FUSION", "Marchwood Conveyors Ltd", "Luton", "GB7748820104", "7741", 39860,
     "FUSION", "Marchwood Conveyor Systems", "Luton", "GB7748820104", "7741", 14220, 0.82,
     ["name 0.80", "tax id ✓", "bank ✓", "city ✓"], "Probably the same entity re-registered after a rename."],
    ["FUSION", "Rookwood Timber Ltd", "Exeter", "GB7714022890", "9917", 47320,
     "FUSION", "Rookwood Timber Products Ltd", "Exeter", "GB7714022890", "9917", 21640, 0.86,
     ["name 0.85", "tax id ✓", "bank ✓", "city ✓"], "Parent and its products arm on one registration."],
    ["FUSION", "Havenbrook Safety Ltd", "Glasgow", "GB7790114408", "4462", 36480,
     "JDE", "HAVENBROOK SAFETY EQUIPMENT", "Kitchener", "CA7702281140", "1108", 74260, 0.80,
     ["name 0.88", "tax id ✗", "bank ✗", "city ✗"], "Distributor of the same brand, not necessarily the same party."],
    ["FUSION", "Denholm Gaskets Ltd", "Cardiff", "GB7728804412", "5583", 33140,
     "FUSION", "Denholme Gaskets Ltd", "Cardiff", "GB7728804412", "5583", 9840, 0.87,
     ["name 0.90", "tax id ✓", "bank ✓", "city ✓"], "Spelling variant on the same registration."],
    ["FUSION", "Kingsmere Calibration Ltd", "Dundee", "GB7711440228", "2238", 28620,
     "NETSUITE", "Kingsmere Calibration LLC", "Peoria", "US3644028816", "6674", 24180, 0.78,
     ["name 0.94", "tax id ✗", "bank ✗", "city ✗"], "No shared identifier beyond the name."],
    ["JDE", "WESTBOURNE FABRICATION LTD", "Windsor", "CA7740118206", "8804", 118240,
     "JDE", "WESTBOURNE FABRICATING LTD", "Windsor", "CA7740118206", "8804", 24860, 0.89,
     ["name 0.88", "tax id ✓", "bank ✓", "city ✓"], "Two address-book numbers for one creditor."],
    ["JDE", "CARRICK MOTORS AND CONTROLS", "Oshawa", "CA7788024411", "3317", 96420,
     "FUSION", "Carrick Motor Controls Ltd", "Coventry", "GB7714408226", "7728", 42180, 0.83,
     ["name 0.91", "tax id ✗", "bank ✗", "city ✗"], "Shared brand, separate legal entities on file."],
    ["JDE", "SELWYN INDUSTRIAL CHEMICALS", "Barrie", "CA7702114408", "6690", 88140,
     "JDE", "SELWYN INDUSTRIAL CHEMICAL CO", "Barrie", "CA7702114408", "6690", 19420, 0.86,
     ["name 0.89", "tax id ✓", "bank ✓", "city ✓"], "Singular and plural of the same creditor."],
    ["JDE", "FERNLEA LABORATORY SUPPLIES", "Laval", "CA7719028840", "1162", 64280,
     "JDE", "FERNLEA LAB SUPPLIES INC", "Laval", "CA7719028840", "1162", 17240, 0.88,
     ["name 0.84", "tax id ✓", "bank ✓", "city ✓"], "Abbreviated name opened as a second address book record."],
    ["JDE", "CORBRIDGE MACHINING LTD", "Burnaby", "CA7733114402", "9948", 72640,
     "FUSION", "Corbridge Machining (UK) Ltd", "Leeds", "GB7788110226", "3340", 51820, 0.81,
     ["name 0.92", "tax id ✗", "bank ✗", "city ✗", "contract CRB-2304 ✓"], "One contract names both; ownership unclear."],
    ["NETSUITE", "Yardley Print Services LLC", "Columbus", "US3611440228", "7702", 42860,
     "FUSION", "Yardley Printing Services Ltd", "Norwich", "GB7740228806", "1194", 28140, 0.83,
     ["name 0.90", "tax id ✗", "bank ✗", "city ✗"], "Same brand, two registrations."],
    ["NETSUITE", "Elmsworth Catering Group", "Wichita", "US3690228114", "4426", 38240,
     "FUSION", "Elmsworth Catering Ltd", "Reading", "GB7714028840", "8816", 22960, 0.75,
     ["name 0.86", "tax id ✗", "bank ✗", "city ✗"], "Lowest-scoring proposal in the queue."],
    ["NETSUITE", "Garrick Facilities LLC", "Omaha", "US3628811440", "3348", 34180,
     "FUSION", "Garrick Facility Management Ltd", "Luton", "GB7702288114", "6620", 19840, 0.84,
     ["name 0.87", "tax id ✗", "bank ✗", "city ✗"], "Facilities contracts run in both entities."],
    ["NETSUITE", "Inverleith Seals Corp", "Boise", "US3670224408", "5561", 29640,
     "NETSUITE", "Inverleith Seal Products Inc", "Reno", "US3670224408", "5561", 11280, 0.82,
     ["name 0.83", "tax id ✓", "bank ✓", "city ✗"], "Same registration, two subsidiaries on file."]
  ];
  /* the A side of the twenty-two attach proposals is an existing confirmed
     record: take one intra-system pair per proposal and give it the authored
     identity, so the queue shows a real golden supplier on the left */
  /* the three proposals between two loose records carry their own source keys:
     the Orion pair is the one the tour rejects, so its Fusion supplier number
     and JDE address book number are fixed */
  var LOOSE_IDS = { 0: ["S-10422", "118207"], 1: ["S-11384", "S-11902"], 2: ["121440", "V-4187"] };
  var intra = { FUSION: [], JDE: [], NETSUITE: [] };
  genClusters.forEach(function (g) { if (g.pattern === "FF") intra.FUSION.push(g); else if (g.pattern === "JJ") intra.JDE.push(g); else if (g.pattern === "NN") intra.NETSUITE.push(g); });
  var pendingMatches = [], looseRecords = [];
  PENDING.forEach(function (p, i) {
    var aSys = p[0], bSys = p[6], a, b, loose2 = i < 3;
    if (loose2) {
      a = mkRecord(aSys, { sysId: LOOSE_IDS[i] && LOOSE_IDS[i][0], name: p[1], city: p[2], taxId: p[3], bank: p[4], spendLocal: p[5] });
      looseRecords.push(a);
    } else {
      var host = intra[aSys].shift();
      a = byId(host.records[0]);
      a.name = p[1]; a.city = p[2]; a.taxId = p[3]; a.bankLast4 = p[4];
      a.spendLocal = p[5]; a.spendUsd = r2(p[5] * SRC[aSys].rate);
      host.name = p[1].replace(/ (Ltd|PLC|Inc|LLC|Corp|Group Ltd)$/, "");
      host.city = p[2]; host.taxId = p[3];
      host.spendUsd = r2(sum(host.records, function (rid) { return byId(rid).spendUsd; }));
    }
    b = mkRecord(bSys, { sysId: LOOSE_IDS[i] && LOOSE_IDS[i][1], name: p[7], city: p[8], taxId: p[9], bank: p[10], spendLocal: p[11] });
    looseRecords.push(b);
    var m = mkMatch(a, b, p[12], "name+address", "review", p[13], p[14]);
    m.pending = true; m.newRecords = loose2 ? [a.id, b.id] : [b.id];
    a.proposal = a.proposal || m.id; b.proposal = m.id;
    pendingMatches.push(m);
  });
  var ORION = pendingMatches[0];
  ORION.id = "M-ORION";
  ORION.records.forEach(function (rid) { byId(rid).proposal = "M-ORION"; });
  ORION.learnedRule = "Different tax registration numbers never match, whatever the name score.";

  /* ---- 4. the verified singletons ------------------------------------- */
  /* 24 records with a unique tax registration number and no candidate above
     0.75 — resolved, and resolved before the model too. */
  var SINGLETON = { FUSION: 9, JDE: 9, NETSUITE: 6 };
  Object.keys(SINGLETON).forEach(function (sys) {
    for (var i = 0; i < SINGLETON[sys]; i++) {
      var r = mkRecord(sys, {});
      r.exactBefore = true; r.singleton = true;
      var g = mkGolden(r.name.replace(/ (Ltd|PLC|Inc|LLC|Corp|Group Ltd)$/, ""), [r], "unique", 1.00, "confirmed");
      g.pattern = sys[0]; g.singleton = true;
      g.evidence = [chip("tax id ✓"), chip("no candidate ≥ 0.75")];
    }
  });

  /* ================================================================== */
  /* CHART OF ACCOUNTS, LEDGERS AND THE CONSOLIDATED P&L                */
  /* ================================================================== */
  /* 497 local accounts (Fusion 214 · JDE 186 · NetSuite 97) roll into a group
     chart of 120. The rows below are the Q3 movements the consolidated P&L
     reads; a line's total, a source's column and a ledger's residual are all
     sums over them, never typed in. Convention: amounts are absolute Q3
     movements in the ledger's own currency, and the group account decides
     which P&L line they land on. */
  var localAccountCount = { FUSION: 214, JDE: 186, NETSUITE: 97 };
  var groupAccountCount = 120;

  var plLines = [
    { id: "rev", name: "Revenue", kind: "income", order: 1 },
    { id: "cogs", name: "Cost of goods sold", kind: "cost", order: 2 },
    { id: "gm", name: "Gross margin", kind: "subtotal", order: 3, of: ["rev", "-cogs"] },
    { id: "sd", name: "Sales and distribution", kind: "cost", order: 4 },
    { id: "ga", name: "General and administrative", kind: "cost", order: 5 },
    { id: "rd", name: "Research and development", kind: "cost", order: 6 },
    { id: "oth", name: "Other operating expenses", kind: "cost", order: 7 },
    { id: "opex", name: "Operating expenses", kind: "subtotal", order: 8, of: ["sd", "ga", "rd", "oth"] },
    { id: "ebitda", name: "EBITDA", kind: "subtotal", order: 9, of: ["gm", "-opex"] }
  ];
  var groupAccounts = {
    "4100": ["Product revenue", "rev"], "4110": ["Service revenue", "rev"], "4120": ["Spare parts revenue", "rev"], "4190": ["Other operating income", "rev"],
    "5100": ["Materials", "cogs"], "5110": ["Direct labour", "cogs"], "5120": ["Freight out", "cogs"], "5130": ["Subcontracted services", "cogs"], "5140": ["Inventory adjustments", "cogs"], "5150": ["Warranty and returns", "cogs"],
    "6100": ["Sales salaries", "sd"], "6110": ["Commissions", "sd"], "6120": ["Marketing", "sd"], "6130": ["Travel — selling", "sd"],
    "6200": ["Administrative salaries", "ga"], "6210": ["Professional fees", "ga"], "6220": ["Insurance", "ga"], "6230": ["Facilities", "ga"], "6240": ["Bank and FX charges", "ga"],
    "6310": ["IT services", "oth"], "6320": ["Software licences", "oth"], "6330": ["Communications", "oth"], "6340": ["Other operating expenses", "oth"],
    "6400": ["Engineering salaries", "rd"], "6410": ["Prototype and test", "rd"], "6420": ["Design services", "rd"]
  };

  /* [system, local account, local name, group account, Q3 movement in local ccy] */
  var GL = [
    ["FUSION", "41010", "Product revenue — plant Ashcombe", "4100", 9214660],
    ["FUSION", "41020", "Product revenue — plant Redmoor", "4100", 6882140],
    ["FUSION", "41200", "Spare parts revenue", "4120", 3417920],
    ["FUSION", "41500", "Service contracts", "4110", 2372344.36],
    ["FUSION", "51010", "Raw materials consumed", "5100", 7116480],
    ["FUSION", "51100", "Direct labour — production", "5110", 3842310],
    ["FUSION", "51300", "Subcontract machining", "5130", 1994750],
    ["FUSION", "51500", "Warranty provisions", "5150", 871373.66],
    ["FUSION", "61000", "Sales salaries", "6100", 1428900],
    ["FUSION", "61100", "Commissions", "6110", 486220],
    ["FUSION", "61200", "Marketing and events", "6120", 427431.02],
    ["FUSION", "62000", "Administrative salaries", "6200", 942180],
    ["FUSION", "62100", "Professional fees", "6210", 361440],
    ["FUSION", "62300", "Facilities and utilities", "6230", 351521.29],
    ["FUSION", "64000", "Engineering salaries", "6400", 812660],
    ["FUSION", "64100", "Prototype and test", "6410", 295087.25],
    ["FUSION", "63100", "IT services", "6310", 164220],
    ["FUSION", "63300", "Communications", "6330", 73488.01],

    ["JDE", "4010", "Sales — distribution", "4100", 9884220],
    ["JDE", "4020", "Sales — parts", "4120", 4127640],
    ["JDE", "8210", "Freight recoveries", "4190", 176480],
    ["JDE", "4050", "Service revenue", "4110", 3876731.77],
    ["JDE", "5010", "Cost of goods sold", "5100", 7442180],
    ["JDE", "5020", "Direct labour", "5110", 2614900],
    ["JDE", "5095", "Inventory shrinkage — DC2", "5140", 128440],
    ["JDE", "5096", "Rework and scrap", "5140", 94260],
    ["JDE", "5097", "Duty and customs adjustments", "5100", 156720],
    ["JDE", "5098", "Cycle-count adjustments", "5140", 61340],
    ["JDE", "5040", "Freight out", "5120", 1780013.73],
    ["JDE", "6010", "Selling salaries", "6100", 1142760],
    ["JDE", "6075", "Trade show costs", "6120", 72180],
    ["JDE", "6076", "Sales travel — regional", "6130", 88640],
    ["JDE", "6077", "Customer demo units", "6120", 45920],
    ["JDE", "6020", "Sales commissions", "6110", 718524.61],
    ["JDE", "7010", "Administrative salaries", "6200", 884260],
    ["JDE", "7085", "Board and governance costs", "6200", 64180],
    ["JDE", "7086", "Insurance — fleet", "6220", 57420],
    ["JDE", "7087", "Property taxes — DC1", "6230", 83940],
    ["JDE", "7088", "Bank charges — CAD accounts", "6240", 29760],
    ["JDE", "7089", "FX revaluation — AP", "6240", 41280],
    ["JDE", "7020", "Legal and audit fees", "6210", 335154.53],
    ["JDE", "7485", "Test rig consumables", "6410", 38620],
    ["JDE", "7486", "Design outsourcing", "6420", 72940],
    ["JDE", "7400", "Engineering services", "6400", 293744.17],
    ["JDE", "7685", "Software maintenance", "6320", 46220],
    ["JDE", "7686", "Mobile and data plans", "6330", 31480],
    ["JDE", "7687", "Waste disposal", "6340", 22640],
    ["JDE", "7688", "Security services", "6340", 27360],
    ["JDE", "7689", "Training — operations", "6340", 18940],
    ["JDE", "7690", "Subscriptions — industry data", "6340", 14720],
    ["JDE", "7600", "IT services", "6310", 110642.73],

    ["NETSUITE", "4000", "Services revenue", "4110", 4214660],
    ["NETSUITE", "4020", "Project revenue", "4110", 2186340],
    ["NETSUITE", "4085", "Recharges to group entities", "4190", 98420],
    ["NETSUITE", "4040", "Parts resale", "4120", 996960],
    ["NETSUITE", "5000", "Cost of services", "5130", 2884120],
    ["NETSUITE", "5075", "Materials on projects", "5100", 112640],
    ["NETSUITE", "5076", "Travel rechargeable", "5130", 64280],
    ["NETSUITE", "5020", "Subcontractor costs", "5130", 1446790],
    ["NETSUITE", "6075", "Partner commissions", "6110", 86240],
    ["NETSUITE", "6076", "Digital advertising", "6120", 54120],
    ["NETSUITE", "6077", "Client entertainment", "6130", 21460],
    ["NETSUITE", "6000", "Sales salaries", "6100", 542470],
    ["NETSUITE", "7000", "Admin salaries", "6200", 386240],
    ["NETSUITE", "6185", "Office insurance", "6220", 42180],
    ["NETSUITE", "6186", "Co-working space", "6230", 68940],
    ["NETSUITE", "6187", "Merchant fees", "6240", 31260],
    ["NETSUITE", "6188", "Recruitment fees", "6200", 24880],
    ["NETSUITE", "7020", "Accounting and audit", "6210", 144040],
    ["NETSUITE", "6485", "Lab and test accounts", "6410", 18420],
    ["NETSUITE", "6400", "Solution development", "6400", 80230],
    ["NETSUITE", "6155", "Software subscriptions", "6310", 28640],
    ["NETSUITE", "6156", "Cloud hosting", "6310", 21480],
    ["NETSUITE", "6157", "Telephony", "6330", 12360],
    ["NETSUITE", "6158", "Courier and postage", "6340", 8940],
    ["NETSUITE", "6159", "Sundry expenses", "6340", 6720],
    ["NETSUITE", "6300", "IT support", "6310", 25470]
  ];

  /* the 37 local accounts the exact-match run could not place, with what the
     model proposed. 35 carried a rule; 2 are provisional and queued. */
  var ACC = [
    ["JDE", "8210", "Freight recoveries", "4190", 0.71, "review", "5120", "Name matches both an income and a cost account in the group chart; the sign of the Q3 movement favours other operating income.", "Freight recoveries are netted against freight out in the NA entity, so the group account depends on a policy call."],
    ["NETSUITE", "6155", "Software subscriptions", "6310", 0.78, "review", "6320", "Synonym match on 'software' hits two group accounts; usage history favours IT services.", "Subscriptions are a service in the group chart but a licence in the NetSuite chart."],
    ["JDE", "5095", "Inventory shrinkage — DC2", "5140", 0.94, "auto", null, "JDE object range 5090–5099 maps to inventory adjustments.", ""],
    ["JDE", "5096", "Rework and scrap", "5140", 0.92, "auto", null, "JDE object range 5090–5099 maps to inventory adjustments.", ""],
    ["JDE", "5097", "Duty and customs adjustments", "5100", 0.88, "auto", null, "Landed-cost components roll into materials.", ""],
    ["JDE", "5098", "Cycle-count adjustments", "5140", 0.95, "auto", null, "JDE object range 5090–5099 maps to inventory adjustments.", ""],
    ["JDE", "6075", "Trade show costs", "6120", 0.93, "auto", null, "Synonym match on the group marketing definition.", ""],
    ["JDE", "6076", "Sales travel — regional", "6130", 0.96, "auto", null, "Exact synonym on selling travel.", ""],
    ["JDE", "6077", "Customer demo units", "6120", 0.86, "auto", null, "Parent account 6070 already maps to marketing.", ""],
    ["JDE", "7085", "Board and governance costs", "6200", 0.89, "auto", null, "Sibling accounts 7010–7084 map to administrative salaries and fees.", ""],
    ["JDE", "7086", "Insurance — fleet", "6220", 0.97, "auto", null, "Exact synonym on insurance.", ""],
    ["JDE", "7087", "Property taxes — DC1", "6230", 0.91, "auto", null, "Facilities definition names property taxes.", ""],
    ["JDE", "7088", "Bank charges — CAD accounts", "6240", 0.98, "auto", null, "Exact synonym on bank charges.", ""],
    ["JDE", "7089", "FX revaluation — AP", "6240", 0.90, "auto", null, "Group definition puts translation differences with bank and FX charges.", ""],
    ["JDE", "7485", "Test rig consumables", "6410", 0.92, "auto", null, "Parent account 7480 maps to prototype and test.", ""],
    ["JDE", "7486", "Design outsourcing", "6420", 0.94, "auto", null, "Exact synonym on design services.", ""],
    ["JDE", "7685", "Software maintenance", "6320", 0.90, "auto", null, "Maintenance on licensed software follows the licence account.", ""],
    ["JDE", "7686", "Mobile and data plans", "6330", 0.95, "auto", null, "Exact synonym on communications.", ""],
    ["JDE", "7687", "Waste disposal", "6340", 0.87, "auto", null, "No closer group account; falls to other operating expenses.", ""],
    ["JDE", "7688", "Security services", "6340", 0.86, "auto", null, "No closer group account; falls to other operating expenses.", ""],
    ["JDE", "7689", "Training — operations", "6340", 0.88, "auto", null, "No closer group account; falls to other operating expenses.", ""],
    ["JDE", "7690", "Subscriptions — industry data", "6340", 0.85, "auto", null, "Data subscriptions are not software licences in the group definition.", ""],
    ["NETSUITE", "4085", "Recharges to group entities", "4190", 0.91, "auto", null, "Recharges are other operating income until intercompany elimination.", ""],
    ["NETSUITE", "5075", "Materials on projects", "5100", 0.93, "auto", null, "Exact synonym on materials.", ""],
    ["NETSUITE", "5076", "Travel rechargeable", "5130", 0.87, "auto", null, "Rechargeable cost sits with subcontracted services in the group chart.", ""],
    ["NETSUITE", "6075", "Partner commissions", "6110", 0.96, "auto", null, "Exact synonym on commissions.", ""],
    ["NETSUITE", "6076", "Digital advertising", "6120", 0.95, "auto", null, "Exact synonym on marketing.", ""],
    ["NETSUITE", "6077", "Client entertainment", "6130", 0.86, "auto", null, "Group definition puts entertainment with selling travel.", ""],
    ["NETSUITE", "6185", "Office insurance", "6220", 0.97, "auto", null, "Exact synonym on insurance.", ""],
    ["NETSUITE", "6186", "Co-working space", "6230", 0.90, "auto", null, "Facilities definition covers leased workspace.", ""],
    ["NETSUITE", "6187", "Merchant fees", "6240", 0.93, "auto", null, "Card acquiring fees sit with bank charges.", ""],
    ["NETSUITE", "6188", "Recruitment fees", "6200", 0.85, "auto", null, "Group definition keeps recruitment with administrative salaries.", ""],
    ["NETSUITE", "6485", "Lab and test accounts", "6410", 0.89, "auto", null, "Synonym match on prototype and test.", ""],
    ["NETSUITE", "6156", "Cloud hosting", "6310", 0.94, "auto", null, "Hosting is a service in the group definition.", ""],
    ["NETSUITE", "6157", "Telephony", "6330", 0.96, "auto", null, "Exact synonym on communications.", ""],
    ["NETSUITE", "6158", "Courier and postage", "6340", 0.88, "auto", null, "No closer group account; falls to other operating expenses.", ""],
    ["NETSUITE", "6159", "Sundry expenses", "6340", 0.99, "auto", null, "Exact synonym on other operating expenses.", ""]
  ];
  var ACCKEY = {};
  var accounts = ACC.map(function (a) {
    var o = {
      sys: a[0], local: a[1], description: a[2], proposed: a[3],
      groupName: groupAccounts[a[3]][0], line: groupAccounts[a[3]][1],
      score: a[4], status: a[5],
      alt: a[6], altName: a[6] ? groupAccounts[a[6]][0] : null, altLine: a[6] ? groupAccounts[a[6]][1] : null,
      rule: a[7], question: a[8], entity: SRC[a[0]].entity, amountLocal: 0, amountUsd: 0
    };
    ACCKEY[a[0] + "|" + a[1]] = o; return o;
  });

  var glRows = GL.map(function (g, i) {
    var rate = SRC[g[0]].rate, unm = ACCKEY[g[0] + "|" + g[1]] || null;
    var row = {
      id: "GL-" + (100 + i), sys: g[0], entity: SRC[g[0]].entity, local: g[1], localName: g[2],
      group: g[3], groupName: groupAccounts[g[3]][0], line: groupAccounts[g[3]][1],
      currency: SRC[g[0]].currency, rate: rate,
      amountLocal: r2(g[4]), amountUsd: r2(g[4] * rate),
      wasUnmapped: !!unm, mapStatus: unm ? unm.status : "mapped",
      srcRef: g[0] === "FUSION" ? "GL_BALANCES · GL_CODE_COMBINATIONS.SEGMENT3 = '" + g[1] + "'"
        : g[0] === "JDE" ? "F0911 · F0901.GMOBJ = " + g[1] + " · GMMCU 00100"
          : "transactionLine · account.acctnumber = '" + g[1] + "'"
    };
    if (unm) { unm.amountLocal = row.amountLocal; unm.amountUsd = row.amountUsd; unm.currency = row.currency; unm.rate = rate; }
    return row;
  });

  /* ---------------------------------------------- the consolidated P&L */
  var PLSYS = ["FUSION", "JDE", "NETSUITE"];
  function buildPl() {
    var byLine = {}, byAccount = {};
    plLines.forEach(function (l) { byLine[l.id] = { id: l.id, name: l.name, kind: l.kind, order: l.order, bySource: { FUSION: 0, JDE: 0, NETSUITE: 0 }, totalUsd: 0, accounts: [] }; });
    glRows.forEach(function (r) {
      var L = byLine[r.line];
      L.bySource[r.sys] = r2(L.bySource[r.sys] + r.amountUsd);
      var k = r.line + "|" + r.group;
      if (!byAccount[k]) { byAccount[k] = { line: r.line, group: r.group, groupName: r.groupName, bySource: { FUSION: 0, JDE: 0, NETSUITE: 0 }, totalUsd: 0, rows: [] }; L.accounts.push(byAccount[k]); }
      byAccount[k].bySource[r.sys] = r2(byAccount[k].bySource[r.sys] + r.amountUsd);
      byAccount[k].rows.push(r);
    });
    Object.keys(byAccount).forEach(function (k) { var a = byAccount[k]; a.totalUsd = r2(sum(PLSYS, function (s) { return a.bySource[s]; })); });
    plLines.forEach(function (l) {
      var L = byLine[l.id];
      if (l.kind === "subtotal") {
        PLSYS.forEach(function (s) { L.bySource[s] = r2(sum(l.of, function (t) { return t.charAt(0) === "-" ? -byLine[t.slice(1)].bySource[s] : byLine[t].bySource[s]; })); });
      }
      L.totalUsd = r2(sum(PLSYS, function (s) { return L.bySource[s]; }));
      L.accounts.sort(function (a, b) { return a.group < b.group ? -1 : 1; });
    });
    return plLines.map(function (l) { return byLine[l.id]; });
  }
  var pl = buildPl();
  var PLBY = {}; pl.forEach(function (l) { PLBY[l.id] = l; });

  /* ------------------------------------------------- ledger reconciliation */
  var LEDGERNAME = { FUSION: "NORWELL_EU_PRIMARY", JDE: "Company 00100 · NORWELL NA", NETSUITE: "Arden Services · subsidiary 3" };
  var LEDGERREF = { FUSION: "GL_LEDGERS.NAME", JDE: "F0010.CCCO", NETSUITE: "subsidiary.name" };
  var ledgers = PLSYS.map(function (s) {
    var rows = glRows.filter(function (r) { return r.sys === s; });
    var tbLocal = r2(sum(rows, function (r) { return r.amountLocal; }));
    var translated = r2(sum(rows, function (r) { return r.amountUsd; }));
    var residualBefore = r2(sum(rows.filter(function (r) { return r.wasUnmapped; }), function (r) { return r.amountUsd; }));
    return {
      id: s, ledger: LEDGERNAME[s], ledgerRef: LEDGERREF[s], system: SRC[s].name, systemShort: SRC[s].short,
      entity: SRC[s].entity, entityName: SRC[s].entityName, currency: SRC[s].currency, rate: SRC[s].rate,
      rateNote: "Q3 FY2026 average · GL_DAILY_RATES",
      tbLocal: tbLocal, translatedUsd: translated,
      unmappedAccounts: rows.filter(function (r) { return r.wasUnmapped; }).length,
      mappedBeforeUsd: r2(translated - residualBefore), residualBeforeUsd: residualBefore, tiesBefore: residualBefore === 0,
      mappedAfterUsd: translated, residualAfterUsd: 0, tiesAfter: true
    };
  });

  /* ------------------------------------------------------- duplicate pairs */
  var DUP = [
    ["G-HALDEN", "Halden Tooling Group", "HT-44120", 34210.00, "FUSION", "HT-44120", "2026-08-12", "JDE", "44120", "2026-08-14", "open"],
    ["G-BRAMLEY", "Bramley Logistics", "BL-90218", 27140.00, "FUSION", "BL-90218", "2026-07-22", "NETSUITE", "BL-90218", "2026-07-24", "open"],
    ["G-KESTREL", "Kestrel Components", "KC-11840", 23980.00, "FUSION", "KC-11840", "2026-09-03", "JDE", "11840", "2026-09-08", "open"],
    ["G-TAMSIN", "Tamsin Packaging", "TP-20714", 19570.00, "FUSION", "TP-20714", "2026-07-30", "NETSUITE", "TP20714", "2026-08-03", "open"],
    ["M-ORION", "Orion Fasteners Ltd", "ORF-88214", 21090.00, "FUSION", "ORF-88214", "2026-08-19", "JDE", "88214", "2026-08-21", "review"],
    ["G-WEXFORD", "Wexford Industrial Supplies", "WX-30288", 15810.00, "FUSION", "WX-30288", "2026-09-11", "NETSUITE", "WX30288", "2026-09-15", "open"],
    ["G-RAVENS", "Ravenscourt Electrical", "RV-77104", 14470.00, "JDE", "77104", "2026-08-06", "NETSUITE", "RV-77104", "2026-08-10", "open"],
    ["G-ALDWYCH", "Aldwych Chemicals", "AC-60142", 12380.00, "FUSION", "AC-60142", "2026-07-15", "NETSUITE", "AC60142", "2026-07-17", "open"],
    ["G-MARLOWE", "Marlowe Freight Services", "MF-51208", 11240.00, "FUSION", "MF-51208", "2026-09-22", "JDE", "51208", "2026-09-24", "open"],
    ["G-PENTLAND", "Pentland Bearings", "PB-41190", 9670.00, "FUSION", "PB-41190", "2026-08-28", "NETSUITE", "PB41190", "2026-08-31", "open"],
    ["G-HALDEN", "Halden Tooling Group", "HT-44988", 8630.00, "FUSION", "HT-44988", "2026-09-17", "NETSUITE", "HT44988", "2026-09-21", "open"],
    ["G-CALDER", "Calderwood Castings", "CW-22086", 7410.00, "FUSION", "CW-22086", "2026-07-09", "NETSUITE", "CW22086", "2026-07-13", "open"],
    ["G-STANHOPE", "Stanhope Instrumentation", "SI-33140", 5970.00, "FUSION", "SI-33140", "2026-09-29", "NETSUITE", "SI33140", "2026-09-30", "open"],
    ["G-BRAMLEY", "Bramley Logistics", "BL-90744", 4840.00, "FUSION", "BL-90744", "2026-08-04", "NETSUITE", "BL90744", "2026-08-06", "open"]
  ];
  function docRef(sys, doc) {
    if (sys === "FUSION") return "AP_INVOICES_ALL.INVOICE_NUM = '" + doc + "'";
    if (sys === "JDE") return "F0411.RPDOC = " + doc + " · RPDCT = 'PV' · RPCO = '00100'";
    return "transaction.tranid = '" + doc + "' · type VendBill";
  }
  var dupPairs = DUP.map(function (d, i) {
    var rateA = SRC[d[4]].rate, rateB = SRC[d[7]].rate;
    var localA = r2(d[3] / rateA), localB = r2((d[3] * (1 + (i % 2 ? 0.003 : -0.002))) / rateB);
    return {
      id: "D-" + (300 + i), matchId: d[0], goldenName: d[1], invoiceNorm: d[2], amountUsd: d[3],
      a: { sys: d[4], doc: d[5], date: d[6], ref: docRef(d[4], d[5]), amountLocal: localA, currency: SRC[d[4]].currency, entity: SRC[d[4]].entity },
      b: { sys: d[7], doc: d[8], date: d[9], ref: docRef(d[7], d[8]), amountLocal: localB, currency: SRC[d[7]].currency, entity: SRC[d[7]].entity },
      status: d[10], dependsOn: d[0] === "M-ORION" ? "M-ORION" : null,
      note: d[0] === "M-ORION" ? "Only a pair while the two Orion records are one supplier." : ""
    };
  });

  /* ================================================================== */
  /* RESOLUTION STATE — golden parties as a function of the decisions    */
  /* ================================================================== */
  /* A cross-system cluster the generator built carries Q3 invoices in one
     system only; the eleven hand-written ones carry them in two or three.
     That is what makes saved question 1 a twelve-row answer rather than a
     sixty-seven-row one. */
  genClusters.forEach(function (g) {
    if (g.systems.length < 2) return;
    var recs = g.records.map(byId).sort(function (a, b) { return b.spendUsd - a.spendUsd; });
    var keep = recs[0].sys;
    recs.forEach(function (r) { if (r.sys !== keep) { r.spendLocal = 0; r.spendUsd = 0; } });
    g.spendUsd = r2(sum(g.records, function (rid) { return byId(rid).spendUsd; }));
  });

  /* the three proposals between two loose records get a provisional party */
  var PROV_THRESHOLD = 0.85;   /* the model rolls a proposal up provisionally at
                                  0.85 and above so reporting is not blocked,
                                  and flags it pending review; below that the
                                  records stay separate until a steward decides */
  pendingMatches.forEach(function (m) {
    if (m.newRecords.length !== 2) return;
    var recs = m.records.map(byId);
    var g = mkGolden(recs[0].name.replace(/ (Ltd|PLC|Inc|LLC|Corp|Group Ltd|LIMITED|LTD|INC)$/i, ""), recs, "name+address", m.score, "provisional");
    g.evidence = m.evidence; g.proposal = m.id; g.provisional = true;
    g.pattern = recs.map(function (r) { return r.sys[0]; }).join("");
    g.multi = recs[0].sys !== recs[1].sys;
    m.golden = g.id;
  });
  var goldenById = {}; suppliers.forEach(function (g) { goldenById[g.id] = g; });
  var ORION_GOLDEN = goldenById[ORION.golden];
  ORION_GOLDEN.name = "Orion Fasteners Ltd";

  var BASE_RESOLVED = records.filter(function (r) { return r.cluster || r.singleton; }).length;
  var PENDING_RECORD_IDS = []; pendingMatches.forEach(function (m) { m.newRecords.forEach(function (id) { PENDING_RECORD_IDS.push(id); }); });

  function decisionsOf(x) {
    if (!x) return [];
    if (Array.isArray(x)) return x;
    if (x.decisions) return x.decisions;
    return [];
  }
  function matchDecisions(dec) { var o = {}; dec.forEach(function (d) { if (d.kind === "match") o[d.id] = d; }); return o; }

  /* resolution(decisions) -> the model's state after the steward's decisions */
  function resolution(decisions) {
    var dec = decisionsOf(decisions), byMatch = matchDecisions(dec);
    var open = [], decided = [], freed = 0, split = [];
    pendingMatches.forEach(function (m) {
      var d = byMatch[m.id];
      if (!d) { open.push(m); return; }
      decided.push({ match: m, decision: d });
      freed += m.newRecords.length;
      if (d.action === "reject") split.push(m);
    });
    var resolvedCount = BASE_RESOLVED + freed;
    return {
      resolvedCount: resolvedCount, totalRecords: records.length,
      resolvedPct: pct1(resolvedCount, records.length),
      pendingProposals: open.length, pendingRecords: records.length - resolvedCount,
      openProposals: open, decidedProposals: decided, rejected: split,
      confirmedProposals: matches.filter(function (m) { return m.status === "confirmed"; }).length
    };
  }

  /* goldenSuppliers(decisions) -> the parties SUPPLIER_360 exposes right now */
  function goldenSuppliers(decisions) {
    var dec = decisionsOf(decisions), byMatch = matchDecisions(dec), out = [];
    suppliers.forEach(function (g) {
      if (g.status !== "provisional") { out.push(viewOf(g, "confirmed", null)); return; }
      var m = matchesById[g.proposal], d = byMatch[g.proposal];
      if (d && d.action === "reject") {
        g.records.forEach(function (rid) {
          var r = byId(rid);
          out.push(viewOf({ id: g.id + ":" + r.sysId, name: r.name, records: [rid], systems: [r.sys], basis: "steward", score: 1.00, city: r.city, country: r.country, taxId: r.taxId }, "confirmed", "Split by " + (d.by || "the steward") + " · " + (d.reason || "")));
        });
        return;
      }
      if (d && d.action === "confirm") { out.push(viewOf(g, "confirmed", "Confirmed by " + (d.by || "the steward"))); return; }
      if (m.score >= PROV_THRESHOLD) { out.push(viewOf(g, "review", "Applied provisionally · proposal " + m.id + " waiting for review")); return; }
      g.records.forEach(function (rid) {
        var r = byId(rid);
        out.push(viewOf({ id: g.id + ":" + r.sysId, name: r.name, records: [rid], systems: [r.sys], basis: "unresolved", score: m.score, city: r.city, country: r.country, taxId: r.taxId }, "pending", "Below the 0.85 provisional threshold · proposal " + m.id));
      });
    });
    /* records proposed onto a confirmed cluster: provisionally inside it when
       the score clears the threshold, otherwise standing on their own */
    pendingMatches.forEach(function (m) {
      if (m.newRecords.length === 2) return;
      var b = byId(m.newRecords[0]), host = byId(m.records[0]).cluster, d = byMatch[m.id];
      var hg = out.filter(function (g) { return g.id === host; })[0];
      if (d && d.action === "reject") { out.push(viewOf({ id: host + ":" + b.sysId, name: b.name, records: [b.id], systems: [b.sys], basis: "steward", score: 1.00, city: b.city, country: b.country, taxId: b.taxId }, "confirmed", "Split by " + (d.by || "the steward"))); return; }
      if ((d && d.action === "confirm") || m.score >= PROV_THRESHOLD) {
        if (hg) {
          hg.records = hg.records.concat([b.id]);
          if (hg.systems.indexOf(b.sys) < 0) hg.systems = hg.systems.concat([b.sys]);
          hg.spendUsd = r2(hg.spendUsd + b.spendUsd);
          hg.bySystem = spendBySystem(hg.records);
          if (!(d && d.action === "confirm")) { hg.status = "review"; hg.reviewNote = "Proposal " + m.id + " applied provisionally"; hg.score = Math.min(hg.score, m.score); }
        }
        return;
      }
      out.push(viewOf({ id: host + ":" + b.sysId, name: b.name, records: [b.id], systems: [b.sys], basis: "unresolved", score: m.score, city: b.city, country: b.country, taxId: b.taxId }, "pending", "Below the 0.85 provisional threshold · proposal " + m.id));
    });
    return out;
  }
  var matchesById = {}; matches.forEach(function (m) { matchesById[m.id] = m; });
  function spendBySystem(ids) {
    var o = {};
    ids.forEach(function (id) { var r = byId(id); o[r.sys] = r2((o[r.sys] || 0) + r.spendUsd); });
    return o;
  }
  function viewOf(g, status, note) {
    return {
      id: g.id, name: g.name, records: g.records.slice(), systems: g.systems.slice(),
      basis: g.basis, score: g.score, status: status, note: note || "",
      city: g.city, country: g.country, taxId: g.taxId,
      spendUsd: r2(sum(g.records, function (rid) { return byId(rid).spendUsd; })),
      bySystem: spendBySystem(g.records)
    };
  }

  /* dupPairsFor(decisions) -> the pairs that survive the steward's decisions */
  function dupPairsFor(decisions) {
    var byMatch = matchDecisions(decisionsOf(decisions));
    return dupPairs.filter(function (p) {
      if (!p.dependsOn) return true;
      var d = byMatch[p.dependsOn];
      return !(d && d.action === "reject");
    });
  }

  /* ================================================================== */
  /* KPI BAND — six tiles, every figure derived                          */
  /* ================================================================== */
  function initialState() { return { refreshed: false, decisions: [] }; }
  var RESOLVED_BEFORE = records.filter(function (r) { return r.exactBefore; }).length;
  var UNMAPPED_BEFORE = accounts.length;
  var TIE_BEFORE = ledgers.filter(function (l) { return l.tiesBefore; }).length;
  var RESIDUAL_BEFORE = r2(sum(ledgers, function (l) { return l.residualBeforeUsd; }));

  function computeKpis(state) {
    state = state || initialState();
    var on = !!state.refreshed, res = resolution(state.decisions), dups = dupPairsFor(state.decisions);
    var exposure = r2(sum(dups, function (d) { return d.amountUsd; }));
    var byRule = accounts.filter(function (a) { return a.status === "auto"; }).length;
    var inReview = accounts.filter(function (a) { return a.status === "review"; }).length;
    var tiles = [
      { id: "sources", label: "Sources in one governed model",
        before: sources.length + " sources · 0 joined", after: sources.length + " sources · 1 model · " + views.length + " certified views",
        beforeValue: 0, afterValue: views.length, dir: "new",
        note: sources.map(function (s) { return s.short; }).join(" · ") },
      { id: "resolved", label: "Supplier records resolved to one golden record",
        before: RESOLVED_BEFORE_PCT.toFixed(1) + " %", after: res.resolvedPct.toFixed(1) + " %",
        beforeValue: RESOLVED_BEFORE_PCT, afterValue: res.resolvedPct, dir: "up",
        note: records.length + " records: Fusion " + bySys.FUSION + ", JDE " + bySys.JDE + ", NetSuite " + bySys.NETSUITE
          + " · " + res.resolvedCount + " of " + records.length + " resolved · " + res.pendingProposals + " proposals ("
          + res.pendingRecords + " records) pending review" },
      { id: "accounts", label: "Unmapped local accounts in the consolidated P&L",
        before: String(UNMAPPED_BEFORE), after: "0",
        beforeValue: UNMAPPED_BEFORE, afterValue: 0, dir: "down",
        note: localAccountTotal + " local accounts (Fusion " + localAccountCount.FUSION + ", JDE " + localAccountCount.JDE
          + ", NetSuite " + localAccountCount.NETSUITE + ") to " + groupAccountCount + " group accounts · " + byRule
          + " mapped by rule, " + inReview + " provisional and queued for review" },
      { id: "ledgers", label: "Ledgers that tie to their trial balance",
        before: TIE_BEFORE + " / " + ledgers.length, after: ledgers.length + " / " + ledgers.length,
        beforeValue: TIE_BEFORE, afterValue: ledgers.length, dir: "up",
        note: "residual 0.00 after mapping and translation; before, " + ledgers.filter(function (l) { return !l.tiesBefore; }).map(function (l) { return l.systemShort; }).join(" and ")
          + " carried " + fmtUsd(RESIDUAL_BEFORE) + " in unmapped accounts" },
      { id: "dups", label: "Duplicate-payment pairs found across systems",
        before: "—", after: String(dups.length),
        beforeValue: null, afterValue: dups.length, dir: "new",
        note: "same golden supplier, same normalised invoice number, amount within 0.5 % after translation, different systems · " + fmtUsd(exposure) + " in scope" },
      { id: "freshness", label: "Stalest source",
        before: stalest.freshLabel, after: stalest.freshLabel,
        beforeValue: stalest.freshnessMin, afterValue: stalest.freshnessMin, dir: "flat",
        note: "freshness per source is a platform fact (CDC, pipelines, links), not a claim · " + sources.map(function (s) { return s.short + " " + s.freshLabel; }).join(" · ") }
    ];
    if (!on) tiles.forEach(function (t) { t.after = null; t.afterValue = null; });
    return {
      refreshed: on,
      records: { total: records.length, bySystem: bySys },
      resolvedBefore: { count: RESOLVED_BEFORE, pct: RESOLVED_BEFORE_PCT },
      resolved: { count: res.resolvedCount, pct: res.resolvedPct },
      proposals: { total: matches.length, auto: res.confirmedProposals, pending: res.pendingProposals, decided: res.decidedProposals.length },
      accounts: { local: localAccountTotal, group: groupAccountCount, unmappedBefore: UNMAPPED_BEFORE, unmapped: 0, byRule: byRule, review: inReview },
      ledgers: { total: ledgers.length, tieBefore: TIE_BEFORE, tie: ledgers.length, residualBeforeUsd: RESIDUAL_BEFORE, residualUsd: 0 },
      dupPairs: { count: dups.length, exposureUsd: exposure },
      views: { count: views.length },
      freshness: { stalestMin: stalest.freshnessMin, stalestLabel: stalest.freshLabel, source: stalest.short, asOf: stalest.asOf },
      tiles: tiles
    };
  }
  var bySys = { FUSION: 0, JDE: 0, NETSUITE: 0 };
  records.forEach(function (r) { bySys[r.sys]++; });
  var RESOLVED_BEFORE_PCT = pct1(RESOLVED_BEFORE, records.length);
  var localAccountTotal = localAccountCount.FUSION + localAccountCount.JDE + localAccountCount.NETSUITE;

  /* ================================================================== */
  /* THE REFRESH, THE DECISION LOG AND THE SAVED QUESTIONS              */
  /* ================================================================== */
  var refreshStages = [
    { id: "sync", name: "Sync sources", done: "CDC · pipelines · links · " + sources.length + " catalogs mounted", ms: 1000 },
    { id: "identity", name: "Resolve supplier identities", done: records.length + " records · " + matches.length + " proposals · " + (matches.length - 25) + " auto-confirmed", ms: 1100 },
    { id: "coa", name: "Map accounts to the group chart", done: "497 local accounts to 120 group accounts · 37 newly mapped", ms: 950 },
    { id: "ledgers", name: "Translate and reconcile ledgers", done: ledgers.length + " ledgers · Q3 average rates · residual 0.00", ms: 1050 },
    { id: "views", name: "Rebuild certified views", done: views.length + " certified views · SQL Firewall allow-list FIN_QA_V3 refreshed", ms: 900 }
  ];
  var priorDecisions = [
    { id: "D-0001", kind: "match", target: "M-2104", title: "Barnwell Coatings · two Fusion records merged", action: "confirm", reason: "Same registration and bank; one site opened its own supplier record.", by: "Priya Natarajan", role: "STEWARD", at: "2026-09-29 15:12", rule: "" },
    { id: "D-0002", kind: "account", target: "JDE|5044", title: "JDE 5044 Pallet hire mapped to 5120 Freight out", action: "confirm", reason: "Pallet hire is a distribution cost in the group definition.", by: "Priya Natarajan", role: "STEWARD", at: "2026-10-02 11:48", rule: "" },
    { id: "D-0003", kind: "match", target: "M-2210", title: "Thurlow Metals · Fusion and NetSuite records kept apart", action: "reject", reason: "Different owners since the 2024 sale; only the trading name is shared.", by: "Priya Natarajan", role: "STEWARD", at: "2026-10-05 09:06", rule: "Shared trading name alone never merges two parties." }
  ];
  var ORION_DECISION = {
    kind: "match", id: "M-ORION", target: "M-ORION",
    title: "Orion Fasteners Ltd · Fusion S-10422 and JDE AB 118207 kept apart",
    action: "reject", reason: "Different tax ids — two companies.",
    by: "Priya Natarajan", role: "STEWARD", at: "2026-10-06 09:44",
    rule: ORION.learnedRule
  };
  function stateFor(name) {
    if (name === "refreshed") return { refreshed: true, decisions: [] };
    if (name === "fixed" || name === "final") return { refreshed: true, decisions: [ORION_DECISION] };
    return initialState();
  }
  var _dseq = priorDecisions.length;
  function applyDecision(state, decision) {
    state = state || initialState();
    _dseq++;
    var row = {
      id: "D-" + ("000" + _dseq).slice(-4), kind: decision.kind || "match",
      target: decision.id || decision.target, title: decision.title || "",
      action: decision.action, reason: decision.reason || "", rule: decision.rule || "",
      by: decision.by || "Priya Natarajan", role: "STEWARD", at: decision.at || (world.todayLabel + " · " + world.nowLabel)
    };
    var d = { kind: row.kind, id: row.target, action: row.action, reason: row.reason, by: row.by, at: row.at, rule: row.rule };
    var next = { refreshed: state.refreshed, decisions: state.decisions.concat([d]) };
    var before = computeKpis(state), after = computeKpis(next);
    var changed = { tiles: [], questions: [], learnedRule: row.rule || null };
    after.tiles.forEach(function (t, i) { if (t.after !== before.tiles[i].after) changed.tiles.push(t.id); });
    questions.forEach(function (q) {
      if (!q.build) return;
      var a = answer(q.id, "CONTROLLER", state.decisions), b = answer(q.id, "CONTROLLER", next.decisions);
      if (a.rowCount !== b.rowCount) changed.questions.push({ id: q.id, n: q.n, before: a.rowCount, after: b.rowCount, text: q.text });
    });
    return { state: next, decision: row, changed: changed };
  }

  /* ------------------------------------------------------- saved questions */
  var WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  function words(n) { return WORDS[n] || String(n); }
  function cap(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  function col(k, l, o) { o = o || {}; return { key: k, label: l, kind: o.kind || "text", align: o.align || (o.kind === "money" || o.kind === "num" || o.kind === "score" ? "right" : "left"), sub: o.sub || "" }; }
  var IC = [
    ["NG-EU", "NG-NA", 1284600.00, 1284600.00, "matched", "Both legs posted in period 3."],
    ["NG-NA", "NG-EU", 486220.00, 486220.00, "matched", "Both legs posted in period 3."],
    ["NG-EU", "NG-SV", 642180.00, 598340.00, "timing", "Invoice posted 30 Sep in NG-EU, received 2 Oct in NG-SV."],
    ["NG-SV", "NG-EU", 214760.00, 214760.00, "matched", "Both legs posted in period 3."],
    ["NG-NA", "NG-SV", 312470.00, 287120.00, "unmatched", "Service recharge coded to a third entity in NetSuite."],
    ["NG-SV", "NG-NA", 96840.00, 118290.00, "unmatched", "Two credit notes not mirrored in JDE."]
  ];
  var O2C = [
    ["Fenwick Industrial", "A", "NG-SV", "SO-20481", 2, "2026-09-18", 18, 184620.00, "NETSUITE"],
    ["Aldercroft Retail Group", "A", "NG-EU", "1004872", 1, "2026-09-22", 14, 142380.00, "FUSION"],
    ["Trenholm Utilities", "A", "NG-EU", "1004918", 3, "2026-09-25", 11, 96740.00, "FUSION"],
    ["Barrowfield Foods", "A", "NG-SV", "SO-20536", 1, "2026-09-28", 8, 78210.00, "NETSUITE"],
    ["Nettleton Engineering", "A", "NG-EU", "1005024", 2, "2026-09-29", 7, 54860.00, "FUSION"],
    ["Quenby Water Services", "A", "NG-SV", "SO-20588", 4, "2026-09-30", 6, 31440.00, "NETSUITE"]
  ];
  var REBATE = [
    ["Halden Tooling Group", "CRB-2104", "2.00 % of spend above the threshold", 1000000, 2.0, "NG-EU"],
    ["Kestrel Components", "CRB-2118", "1.50 % of spend above the threshold", 750000, 1.5, "NG-EU"],
    ["Wexford Industrial Supplies", "CRB-2137", "1.00 % of spend above the threshold", 600000, 1.0, "NG-EU"],
    ["Marlowe Freight Services", "CRB-2166", "1.00 % of spend above the threshold", 400000, 1.0, "NG-NA"],
    ["Calderwood Castings", "CRB-2172", "0.75 % of spend above the threshold", 350000, 0.75, "NG-EU"]
  ];
  var BANKCH = [
    ["Ravenscourt Electrical", "JDE", "NG-NA", "2026-08-14", "AP clerk · JDE user MCARTER", "3360", 148220.00, 4],
    ["Aldwych Chemicals", "FUSION", "NG-EU", "2026-07-29", "Supplier portal · self-service", "7702", 96480.00, 3],
    ["Northline Cartage Ltd", "JDE", "NG-NA", "2026-09-02", "AP clerk · JDE user RPATEL", "5510", 42860.00, 2],
    ["Stanhope Instrumentation", "NETSUITE", "NG-SV", "2026-08-21", "Vendor record edit · NetSuite user T.HOLT", "9930", 28140.00, 2],
    ["Garrick Facilities LLC", "NETSUITE", "NG-SV", "2026-09-11", "Vendor record edit · NetSuite user T.HOLT", "3348", 0.00, 0]
  ];

  function multiSystemRows(dec) {
    var gs = goldenSuppliers(dec), out = [];
    gs.forEach(function (g) {
      var sys = Object.keys(g.bySystem).filter(function (s) { return g.bySystem[s] > 0; });
      if (sys.length < 2) return;
      out.push({
        golden: g.id, supplier: g.name, systems: sys, records: g.records.length,
        spendUsd: r2(sum(sys, function (s) { return g.bySystem[s]; })),
        bySystem: g.bySystem, score: g.score, status: g.status,
        entities: sys.map(function (s) { return SRC[s].entity; }),
        note: g.note, _records: g.records.map(byId)
      });
    });
    out.sort(function (a, b) { return b.spendUsd - a.spendUsd; });
    return out;
  }

  var questions = [
    { id: "q1", n: 1, text: "Which suppliers do we pay from more than one system, and what did we pay them last quarter?",
      chip: "Suppliers paid from more than one system",
      sources: ["FUSION", "JDE", "NETSUITE"], views: ["SUPPLIER_360", "SUPPLIER_SPEND_Q", "PERIOD_MAP"],
      terms: ["supplier", "last quarter", "group spend"], joins: 2, parse: "Aggregate over suppliers · 1 metric · 1 period filter · 1 having clause",
      t: [210, 340, 980, 90, 640, 380],
      narrate: function (rows, R) {
        var tot = r2(sum(rows, function (r) { return r.spendUsd; })), pend = rows.filter(function (r) { return r.status === "review"; }).length;
        var scope = R.id === "CONTROLLER" ? "in more than one source system" : "in more than one source system and invoices inside NG-NA";
        var big = function (n) { return n >= 1e6 ? "USD " + fmtM(n) : fmtUsd(n); };
        var lead = rows.length ? ", led by " + rows[0].supplier + " at " + big(rows[0].spendUsd)
          + (rows[0].systems.length > 1 ? " across " + rows[0].systems.map(function (x) { return SRC[x].short; }).join(", ") : " in " + SRC[rows[0].systems[0]].short) : "";
        return cap(words(rows.length)) + " suppliers carry Q3 invoices " + scope + ", " + (tot >= 1e6 ? "USD " + fmtM(tot) : fmtUsd(tot))
          + (R.id === "CONTROLLER" ? " in total" : " inside your entity scope") + lead + ". "
          + (pend ? cap(words(pend)) + " of them " + (pend === 1 ? "is a proposal" : "are proposals") + " the model applied provisionally and no steward has confirmed."
            : "Every one of them is a match a steward or an exact identifier confirmed.");
      },
      columns: [col("supplier", "Golden supplier"), col("systems", "Systems", { kind: "badges" }), col("records", "Records", { kind: "num" }), col("spendUsd", "Q3 spend (USD)", { kind: "money" }), col("score", "Match score", { kind: "score" }), col("status", "Status", { kind: "status" })],
      build: function (R, dec) {
        var rows = multiSystemRows(dec);
        if (R.id === "CONTROLLER") return rows;
        var out = rows.filter(function (r) { return r.bySystem.JDE > 0; }).map(function (r) {
          var c = {}; Object.keys(r).forEach(function (k) { c[k] = r[k]; });
          c.spendUsd = r.bySystem.JDE; c.systems = ["JDE"]; c.masked = true;
          c.records = r._records.filter(function (x) { return x.sys === "JDE"; }).length;
          c._records = r._records.filter(function (x) { return x.sys === "JDE"; });
          return c;
        });
        out.sort(function (a, b) { return b.spendUsd - a.spendUsd; });
        return out;
      },
      colLabelFor: { ANALYST_NA: { spendUsd: "Q3 spend, NG-NA (USD)", systems: "Systems in scope" } },
      policyNote: "The multi-system flag comes from SUPPLIER_360, which is master data; the amounts come from SUPPLIER_SPEND_Q, where the row policy applies.",
      sql: [
        "SELECT s.golden_name                             AS supplier,",
        "       LISTAGG(DISTINCT q.source_system, ' · ')",
        "         WITHIN GROUP (ORDER BY q.source_system) AS systems,",
        "       COUNT(DISTINCT q.source_record_id)        AS records,",
        "       ROUND(SUM(q.spend_usd), 2)                AS q3_spend_usd,",
        "       MIN(s.match_score)                        AS match_score,",
        "       MIN(s.match_status)                       AS status",
        "FROM   gold.supplier_spend_q q",
        "JOIN   gold.supplier_360     s ON s.golden_id = q.golden_id",
        "JOIN   gold.period_map       p ON p.period_id = q.period_id",
        "WHERE  p.group_period = 'FY2026-Q3'",
        "  AND  q.spend_usd > 0",
        "GROUP  BY s.golden_id, s.golden_name",
        "HAVING COUNT(DISTINCT q.source_system) > 1",
        "ORDER  BY 4 DESC;"
      ].join("\n") },

    { id: "q2", n: 2, text: "Show the consolidated Q3 P&L by group account with source attribution.",
      chip: "Consolidated Q3 P&L by group account",
      sources: ["FUSION", "JDE", "NETSUITE"], views: ["CONSOLIDATED_PL", "COA_MAP", "PERIOD_MAP"],
      terms: ["group account", "last quarter"], joins: 2, parse: "Pivot over group accounts · 3 source columns · 1 period filter",
      t: [180, 300, 1120, 80, 880, 420],
      narrate: "Group revenue for Q3 is USD 48.6 M — Fusion 27.9, JDE 13.2, NetSuite 7.5 — against COGS of 31.1 M, leaving a gross margin of 17.5 M and EBITDA of 6.0 M after 11.5 M of operating expense. Every line ties back to the three trial balances with a residual of 0.00.",
      columns: [col("line", "P&L line"), col("group", "Group account"), col("groupName", "Account name"), col("fusion", "Fusion (USD)", { kind: "money" }), col("jde", "JDE (USD)", { kind: "money" }), col("netsuite", "NetSuite (USD)", { kind: "money" }), col("totalUsd", "Group (USD)", { kind: "money" })],
      build: function (R) {
        var out = [];
        pl.forEach(function (L) {
          if (L.kind === "subtotal") return;
          L.accounts.forEach(function (a) {
            var row = {
              line: L.name, lineId: L.id, group: a.group, groupName: a.groupName,
              fusion: a.bySource.FUSION, jde: a.bySource.JDE, netsuite: a.bySource.NETSUITE,
              totalUsd: a.totalUsd, entity: null, _rows: a.rows
            };
            if (R.id === "CONTROLLER") { out.push(row); return; }
            if (a.bySource.JDE <= 0) return;
            out.push({ line: L.name, lineId: L.id, group: a.group, groupName: a.groupName, fusion: null, jde: a.bySource.JDE, netsuite: null, totalUsd: a.bySource.JDE, entity: "NG-NA", _rows: a.rows.filter(function (r) { return r.sys === "JDE"; }) });
          });
        });
        return out;
      },
      sql: [
        "SELECT m.pl_line, m.group_account, m.group_name,",
        "       SUM(CASE WHEN c.source_system = 'FUSION'   THEN c.amount_usd END) AS fusion_usd,",
        "       SUM(CASE WHEN c.source_system = 'JDE'      THEN c.amount_usd END) AS jde_usd,",
        "       SUM(CASE WHEN c.source_system = 'NETSUITE' THEN c.amount_usd END) AS netsuite_usd,",
        "       SUM(c.amount_usd)                                                AS group_usd",
        "FROM   gold.consolidated_pl c",
        "JOIN   gold.coa_map    m ON m.source_system = c.source_system",
        "                        AND m.local_account = c.local_account",
        "JOIN   gold.period_map p ON p.period_id     = c.period_id",
        "WHERE  p.group_period = 'FY2026-Q3'",
        "GROUP  BY m.pl_line_order, m.pl_line, m.group_account, m.group_name",
        "ORDER  BY m.pl_line_order, m.group_account;"
      ].join("\n") },

    { id: "q3", n: 3, text: "Which local accounts are still unmapped, and what did the model propose?",
      chip: "Local accounts the model had to propose",
      sources: ["FUSION", "JDE", "NETSUITE"], views: ["COA_MAP"],
      terms: ["group account"], joins: 0, parse: "Filter over the mapping table · 2 statuses · 1 period filter",
      t: [160, 240, 760, 70, 620, 320],
      narrate: "Thirty-seven local accounts had no group account before the run; thirty-five were mapped by rule and two are provisional and waiting for a steward. Nothing was dropped: every one of them is now inside the consolidated P&L.",
      columns: [col("sys", "System", { kind: "badge" }), col("local", "Local account"), col("description", "Local name"), col("proposed", "Group account"), col("groupName", "Group name"), col("amountUsd", "Q3 (USD)", { kind: "money" }), col("score", "Score", { kind: "score" }), col("status", "Status", { kind: "status" })],
      build: function (R) {
        return accounts.filter(function (a) { return R.entities.indexOf(a.entity) >= 0; })
          .sort(function (a, b) { return (a.status === b.status ? 0 : a.status === "review" ? -1 : 1) || (a.sys < b.sys ? -1 : 1); });
      },
      sql: [
        "SELECT m.source_system, m.local_account, m.local_name,",
        "       m.group_account, m.group_name, m.amount_usd,",
        "       m.map_score, m.map_status, m.map_rule",
        "FROM   gold.coa_map m",
        "WHERE  m.effective_period = 'FY2026-Q3'",
        "  AND  m.map_status IN ('proposed', 'review')",
        "ORDER  BY CASE m.map_status WHEN 'review' THEN 0 ELSE 1 END,",
        "          m.source_system, m.local_account;"
      ].join("\n") },

    { id: "q4", n: 4, text: "Same invoice number and amount paid in two systems this quarter.",
      chip: "Same invoice paid in two systems",
      sources: ["FUSION", "JDE", "NETSUITE"], views: ["DUP_INVOICE_PAIRS", "SUPPLIER_360", "PERIOD_MAP"],
      terms: ["duplicate payment", "supplier", "last quarter"], joins: 2, parse: "Filter over candidate pairs · 1 period filter · ordered by value",
      t: [170, 280, 840, 80, 520, 340],
      narrate: function (rows) {
        var tot = r2(sum(rows, function (r) { return r.amountUsd; })), dep = rows.filter(function (r) { return r.status === "review"; }).length;
        return cap(words(rows.length)) + " candidate pairs sit across two systems in Q3, " + fmtUsd(tot)
          + " in total, every one of them on a supplier the model resolved to a single golden record. "
          + (dep ? "They are candidates, not confirmed duplicates: " + words(dep) + " of them depends on a supplier match no steward has confirmed."
            : "They are candidates, not confirmed duplicates — each one needs a look at both documents before anything is recovered.");
      },
      columns: [col("goldenName", "Golden supplier"), col("invoiceNorm", "Invoice (normalised)"), col("amountUsd", "Amount (USD)", { kind: "money" }), col("aRef", "First document"), col("bRef", "Second document"), col("status", "Status", { kind: "status" })],
      policyNote: "The row policy admits a pair when either leg is inside your entity scope — a duplicate is only reviewable with both legs in view.",
      build: function (R, dec) {
        return dupPairsFor(dec).filter(function (p) {
          return R.id === "CONTROLLER" || R.entities.indexOf(p.a.entity) >= 0 || R.entities.indexOf(p.b.entity) >= 0;
        }).map(function (p) {
          return {
            id: p.id, goldenName: p.goldenName, invoiceNorm: p.invoiceNorm, amountUsd: p.amountUsd,
            aRef: SRC[p.a.sys].short + " " + p.a.doc + " · " + p.a.date, bRef: SRC[p.b.sys].short + " " + p.b.doc + " · " + p.b.date,
            status: p.status, entity: p.a.entity, _pair: p
          };
        });
      },
      sql: [
        "SELECT d.golden_name, d.invoice_norm, d.amount_usd,",
        "       d.system_a, d.doc_a, d.doc_date_a,",
        "       d.system_b, d.doc_b, d.doc_date_b, d.pair_status",
        "FROM   gold.dup_invoice_pairs d",
        "JOIN   gold.supplier_360 s ON s.golden_id = d.golden_id",
        "JOIN   gold.period_map   p ON p.period_id = d.period_id",
        "WHERE  p.group_period = 'FY2026-Q3'",
        "ORDER  BY d.amount_usd DESC;"
      ].join("\n") },

    { id: "q5", n: 5, text: "Intercompany balances that do not match at quarter end.",
      chip: "Intercompany balances that do not agree",
      sources: ["FUSION", "JDE", "NETSUITE"], views: ["IC_MATCHES", "ENTITY_MAP", "PERIOD_MAP"],
      terms: ["intercompany", "last quarter"], joins: 2, parse: "Matrix over entity pairs · 1 gap metric · 1 period filter",
      t: [190, 320, 1040, 90, 610, 360],
      narrate: "Four of the six intercompany legs agree after translation; one is a timing difference of USD 43,840 on an invoice posted on 30 September and received on 2 October, and two are genuinely unmatched for USD 46,800 together. Elimination should not run until the two unmatched legs are cleared.",
      columns: [col("entity", "Entity"), col("counterparty", "Counterparty"), col("ourUsd", "Our balance (USD)", { kind: "money" }), col("theirUsd", "Their balance (USD)", { kind: "money" }), col("gapUsd", "Gap (USD)", { kind: "money" }), col("status", "Status", { kind: "status" }), col("reason", "Why")],
      build: function (R) {
        return IC.filter(function (r) { return R.entities.indexOf(r[0]) >= 0; }).map(function (r) {
          return { entity: r[0], counterparty: r[1], ourUsd: r[2], theirUsd: r[3], gapUsd: r2(r[2] - r[3]), status: r[4], reason: r[5], entityRef: r[0] };
        });
      },
      sql: [
        "SELECT i.entity, i.counterparty,",
        "       i.our_balance_usd, i.their_balance_usd,",
        "       i.our_balance_usd - i.their_balance_usd AS gap_usd,",
        "       i.match_status, i.reason",
        "FROM   gold.ic_matches i",
        "JOIN   gold.entity_map e ON e.entity_id  = i.entity",
        "JOIN   gold.period_map p ON p.period_id  = i.period_id",
        "WHERE  p.group_period = 'FY2026-Q3'",
        "ORDER  BY CASE i.match_status WHEN 'unmatched' THEN 0",
        "                              WHEN 'timing'    THEN 1 ELSE 2 END,",
        "          ABS(i.our_balance_usd - i.their_balance_usd) DESC;"
      ].join("\n") },

    { id: "q6", n: 6, text: "Which delayed orders are hurting our best accounts?",
      chip: "Delayed orders on tier A accounts",
      sources: ["FUSION", "NETSUITE", "CRM"], views: ["O2C_EXCEPTIONS", "PERIOD_MAP"],
      terms: ["delayed order", "best accounts"], joins: 3, parse: "Join to the external CRM table · 2 filters · ordered by open value",
      t: [230, 420, 1280, 100, 1140, 460],
      narrate: "Six order lines are past their promised date on tier A accounts, USD 588,250 of open value, the largest a services order 18 days late. The CRM feed is the stalest source in this answer, so the account tiers are as of 08:35.",
      columns: [col("account", "Account"), col("tier", "Tier", { kind: "badge" }), col("orderRef", "Order"), col("line", "Line", { kind: "num" }), col("promised", "Promised"), col("daysLate", "Days late", { kind: "num" }), col("valueUsd", "Open value (USD)", { kind: "money" }), col("sys", "System", { kind: "badge" })],
      build: function (R) {
        return O2C.filter(function (r) { return R.entities.indexOf(r[2]) >= 0; }).map(function (r) {
          return { account: r[0], tier: r[1], entity: r[2], orderRef: r[3], line: r[4], promised: r[5], daysLate: r[6], valueUsd: r[7], sys: r[8] };
        });
      },
      sql: [
        "SELECT a.account_name, a.tier, e.entity, e.order_ref, e.order_line,",
        "       e.promised_date, e.days_late, e.open_value_usd, e.source_system",
        "FROM   gold.o2c_exceptions e",
        "JOIN   crm_iceberg.crm_account a ON a.account_id = e.crm_account_id",
        "JOIN   gold.period_map         p ON p.period_id  = e.period_id",
        "WHERE  p.group_period = 'FY2026-Q3'",
        "  AND  a.tier = 'A'",
        "  AND  e.exception_type = 'PAST_PROMISED_NOT_SHIPPED'",
        "ORDER  BY e.open_value_usd DESC;"
      ].join("\n") },

    { id: "q7", n: 7, text: "Top 20 suppliers by group spend in Q3.",
      chip: "Top 20 suppliers by group spend",
      sources: ["FUSION", "JDE", "NETSUITE"], views: ["SUPPLIER_360", "SUPPLIER_SPEND_Q", "PERIOD_MAP"],
      terms: ["supplier", "group spend", "last quarter"], joins: 2, parse: "Ranked aggregate · 1 metric · top 20",
      t: [150, 260, 720, 70, 690, 310],
      narrate: "The top twenty suppliers account for a little under a third of Q3 group spend, and the leader is a supplier no single system could have ranked first — its invoices sit in three of them. Spend is translated at the Q3 average rate.",
      columns: [col("rank", "#", { kind: "num" }), col("supplier", "Golden supplier"), col("systems", "Systems", { kind: "badges" }), col("spendUsd", "Q3 spend (USD)", { kind: "money" }), col("sharePct", "Share of Q3 spend", { kind: "score" })],
      build: function (R, dec) {
        var gs = goldenSuppliers(dec).filter(function (g) { return g.spendUsd > 0; });
        if (R.id !== "CONTROLLER") {
          gs = gs.filter(function (g) { return g.bySystem.JDE > 0; }).map(function (g) {
            var c = {}; Object.keys(g).forEach(function (k) { c[k] = g[k]; });
            c.spendUsd = g.bySystem.JDE; c.systems = ["JDE"]; return c;
          });
        }
        var total = sum(gs, function (g) { return g.spendUsd; });
        gs.sort(function (a, b) { return b.spendUsd - a.spendUsd; });
        return gs.slice(0, 20).map(function (g, i) {
          return { rank: i + 1, golden: g.id, supplier: g.name, systems: g.systems, spendUsd: g.spendUsd, sharePct: Math.round(g.spendUsd / total * 1000) / 10, status: g.status, _records: g.records.map(byId) };
        });
      },
      sql: [
        "SELECT s.golden_name,",
        "       LISTAGG(DISTINCT q.source_system, ' · ')",
        "         WITHIN GROUP (ORDER BY q.source_system)        AS systems,",
        "       ROUND(SUM(q.spend_usd), 2)                       AS q3_spend_usd,",
        "       ROUND(RATIO_TO_REPORT(SUM(q.spend_usd))",
        "               OVER () * 100, 1)                        AS share_pct",
        "FROM   gold.supplier_spend_q q",
        "JOIN   gold.supplier_360     s ON s.golden_id = q.golden_id",
        "JOIN   gold.period_map       p ON p.period_id = q.period_id",
        "WHERE  p.group_period = 'FY2026-Q3'",
        "GROUP  BY s.golden_id, s.golden_name",
        "ORDER  BY 3 DESC",
        "FETCH  FIRST 20 ROWS ONLY;"
      ].join("\n") },

    { id: "q8", n: 8, text: "Rebate terms we have not claimed this quarter.",
      chip: "Rebate terms not yet claimed",
      sources: ["FUSION", "JDE", "NETSUITE", "CRB"], views: ["SUPPLIER_360", "SUPPLIER_SPEND_Q", "PERIOD_MAP"],
      terms: ["rebate", "group spend", "last quarter"], joins: 4, parse: "Join to the in-house contracts schema · threshold test · 1 period filter",
      t: [200, 380, 1180, 90, 740, 400],
      narrate: "Five rebate terms cleared their Q3 threshold on group spend and carry no claim document, worth USD 13,539.92 together on the spend above each threshold. Every one of the five clears its threshold only once spend from more than one system is added up.",
      columns: [col("supplier", "Golden supplier"), col("contract", "Contract"), col("basis", "Basis"), col("thresholdUsd", "Threshold (USD)", { kind: "money" }), col("spendUsd", "Q3 spend (USD)", { kind: "money" }), col("entitlementUsd", "Entitlement (USD)", { kind: "money" }), col("claimed", "Claimed", { kind: "status" })],
      build: function (R, dec) {
        var gs = goldenSuppliers(dec), byName = {};
        gs.forEach(function (g) { byName[g.name] = g; });
        return REBATE.filter(function (r) { return R.entities.indexOf(r[5]) >= 0; }).map(function (r) {
          var g = byName[r[0]], spend = g ? g.spendUsd : 0;
          return {
            supplier: r[0], contract: r[1], basis: r[2], thresholdUsd: r[3],
            spendUsd: spend, entitlementUsd: r2(Math.max(0, spend - r[3]) * r[4] / 100),
            claimed: "No", entity: r[5], systems: g ? g.systems : []
          };
        }).filter(function (r) { return r.spendUsd >= r.thresholdUsd; });
      },
      sql: [
        "SELECT s.golden_name, t.contract_ref, t.rebate_basis, t.threshold_usd,",
        "       ROUND(SUM(q.spend_usd), 2)                          AS q3_spend_usd,",
        "       ROUND(GREATEST(SUM(q.spend_usd) - t.threshold_usd, 0)",
        "               * t.rate_pct / 100, 2)                      AS entitlement_usd,",
        "       t.claimed_flag",
        "FROM   crb.crb_rebate_terms    t",
        "JOIN   crb.crb_supplier_xref   x ON x.contract_ref = t.contract_ref",
        "JOIN   gold.supplier_360       s ON s.golden_id    = x.golden_id",
        "JOIN   gold.supplier_spend_q   q ON q.golden_id    = s.golden_id",
        "JOIN   gold.period_map         p ON p.period_id    = q.period_id",
        "WHERE  p.group_period = 'FY2026-Q3'",
        "  AND  t.claimed_flag = 'N'",
        "GROUP  BY s.golden_name, t.contract_ref, t.rebate_basis,",
        "          t.threshold_usd, t.rate_pct, t.claimed_flag",
        "HAVING SUM(q.spend_usd) >= t.threshold_usd",
        "ORDER  BY 6 DESC;"
      ].join("\n") },

    { id: "q9", n: 9, text: "Suppliers whose bank account changed in the last 90 days, with payments since.",
      chip: "Bank details changed in the last 90 days",
      sources: ["FUSION", "JDE", "NETSUITE"], views: ["SUPPLIER_360", "AP_INVOICE_X", "PERIOD_MAP"],
      terms: ["supplier", "paid"], joins: 2, parse: "Change history · 90-day window · payment roll-up",
      t: [220, 360, 1320, 110, 820, 430],
      narrate: "Five supplier bank records changed since 8 July and four of them were paid afterwards, USD 315,700 in total. The bank column is reduced to its last four digits for every role, and hidden altogether for the regional analyst.",
      columns: [col("supplier", "Golden supplier"), col("sys", "System", { kind: "badge" }), col("changedOn", "Changed on"), col("changedBy", "Changed by"), col("bank", "Bank (last four)", { kind: "mask" }), col("paidSinceUsd", "Paid since (USD)", { kind: "money" }), col("documents", "Documents", { kind: "num" })],
      build: function (R) {
        return BANKCH.filter(function (r) { return R.entities.indexOf(r[2]) >= 0; }).map(function (r) {
          return { supplier: r[0], sys: r[1], entity: r[2], changedOn: r[3], changedBy: r[4], bank: R.masked.indexOf("BANK_ACCOUNT") >= 0 ? "••••" : "•••• " + r[5], paidSinceUsd: r[6], documents: r[7] };
        });
      },
      sql: [
        "SELECT s.golden_name, s.source_system, s.bank_changed_on,",
        "       s.bank_changed_by, s.bank_account, s.entity,",
        "       ROUND(SUM(i.amount_usd), 2) AS paid_since_usd,",
        "       COUNT(i.invoice_id)         AS documents",
        "FROM   gold.supplier_360 s",
        "LEFT   JOIN gold.ap_invoice_x i",
        "         ON i.golden_id    = s.golden_id",
        "        AND i.payment_date >= s.bank_changed_on",
        "LEFT   JOIN gold.period_map p ON p.period_id = i.period_id",
        "WHERE  s.bank_changed_on >= DATE '2026-07-08'",
        "  AND  (p.group_period = 'FY2026-Q3' OR i.invoice_id IS NULL)",
        "GROUP  BY s.golden_name, s.source_system, s.bank_changed_on,",
        "          s.bank_changed_by, s.bank_account, s.entity",
        "ORDER  BY 7 DESC NULLS LAST;"
      ].join("\n") },

    { id: "q10", n: 10, text: "Show full bank account numbers for all suppliers.",
      chip: "Full bank account numbers",
      sources: ["FUSION", "JDE", "NETSUITE"], views: ["SUPPLIER_360", "PERIOD_MAP"],
      terms: ["supplier"], joins: 1, parse: "Projection over master data · 1 sensitive column requested",
      t: [260, 420, 980, 160, 620, 420],
      blockedFor: ["ANALYST_NA"],
      blockReason: "Object GOLD.SUPPLIER_360 column BANK_ACCOUNT is not on allow-list FIN_QA_V3 for this database user. The statement was refused before execution and the attempt was written to the audit trail.",
      narrate: "The database returns the last four digits only: the masking policy on BANK_ACCOUNT applies to every role, including this one. For the regional analyst the statement never runs — SQL Firewall refuses it against the allow-list and logs the attempt.",
      narrateBlocked: "SQL Firewall refused the statement against allow-list FIN_QA_V3 before it reached the data, and the attempt is in the audit trail. Masking and row policies live in the database, so the same question is refused however it is phrased.",
      columns: [col("supplier", "Golden supplier"), col("sys", "System", { kind: "badge" }), col("entity", "Entity"), col("bank", "Bank account", { kind: "mask" }), col("currency", "Currency"), col("taxId", "Tax id", { kind: "mask" })],
      build: function (R, dec) {
        var top = records.slice().sort(function (a, b) { return b.spendUsd - a.spendUsd; }).slice(0, 12);
        return top.filter(function (r) { return R.entities.indexOf(r.entity) >= 0; }).map(function (r) {
          return { supplier: r.name, sys: r.sys, entity: r.entity, bank: "•••• •••• " + r.bankLast4, currency: r.currency, taxId: r.taxId, _record: r };
        });
      },
      sql: [
        "SELECT s.golden_name, s.source_system, s.entity,",
        "       s.bank_account, s.bank_currency, s.tax_id",
        "FROM   gold.supplier_360 s",
        "JOIN   gold.period_map   p ON p.period_id = s.last_paid_period",
        "WHERE  p.group_period = 'FY2026-Q3'",
        "  AND  s.bank_account IS NOT NULL",
        "ORDER  BY s.golden_name;"
      ].join("\n") }
  ];
  var QBY = {}; questions.forEach(function (q) { QBY[q.id] = q; });

  /* ------------------------------------------------------------- freshness */
  function freshnessFor(qid) {
    var q = QBY[qid], list = q.sources.map(function (s) { return SRC[s]; });
    var st = list.slice().sort(function (a, b) { return b.freshnessMin - a.freshnessMin; })[0];
    return {
      asOf: st.asOf, stalest: { id: st.id, name: st.short, min: st.freshnessMin, label: st.freshLabel },
      perSource: list.map(function (s) { return { id: s.id, name: s.short, asOf: s.asOf, label: s.freshLabel }; }),
      text: "as of " + st.asOf + " (stalest: " + st.short + ", " + st.freshLabel + " behind)"
    };
  }
  /* ---------------------------------------------------------------- traces */
  function traceFor(qid, role, rowCount) {
    var q = QBY[qid], R = roles[role] || roles.CONTROLLER, t = q.t, spans = [];
    var blocked = !!(q.blockedFor && q.blockedFor.indexOf(R.id) >= 0);
    spans.push({ n: "Parse the question", d: q.parse, ms: t[0] });
    spans.push({ n: "Glossary terms resolved", d: q.terms.map(function (k) { return k + " → " + (GLOSS[k] ? GLOSS[k].definition.split(".")[0] : ""); }).join(" · "), ms: t[1] });
    spans.push({ n: "SQL generated", d: "Select AI over GOLD · " + q.views.length + " certified " + (q.views.length === 1 ? "view" : "views") + " · " + q.joins + " joins · " + q.sql.split("\n").length + " lines", ms: t[2] });
    spans.push({ n: "SQL Firewall check", d: blocked ? "allow-list " + R.allowList + " · refused: " + q.blockReason.split(".")[0] : "allow-list " + R.allowList + " · SELECT only · " + q.views.length + " objects in scope · allowed", ms: t[3], status: blocked ? "blocked" : "allowed" });
    if (blocked) {
      spans.push({ n: "Audit row written", d: "GOLD.MAPPING_DECISIONS is untouched; the attempt is in the session log as blocked", ms: 120 });
      spans.push({ n: "Refusal composed", d: "No rows returned · the question is answered for the Group Controller with the last-four column only", ms: t[5] });
      return spans;
    }
    if (R.rowPolicy) spans.push({ n: "Row policy applied", d: R.rowPolicyText + (q.policyNote ? " · " + q.policyNote : ""), ms: 70 });
    if (R.masked.length) spans.push({ n: "Column masking applied", d: R.maskedText, ms: 90 });
    spans.push({ n: "Executed", d: (rowCount === undefined ? "?" : rowCount) + " rows · " + t[4] + " ms · " + q.sources.map(function (s) { return SRC[s].short; }).join(" + "), ms: t[4] });
    spans.push({ n: "Answer composed", d: "grid + source badges per row + freshness line", ms: t[5] });
    return spans;
  }
  function sqlFor(qid) { return QBY[qid].sql; }

  /* Drill-down payloads carry raw source records; a role with a column policy
     must see them masked there too, not only in the grid. */
  function maskRecord(r, R) {
    if (!r || !R.masked.length) return r;
    var c = {}; Object.keys(r).forEach(function (k) { c[k] = r[k]; });
    if (R.masked.indexOf("TAX_ID") >= 0) c.taxId = maskTaxId(r.taxId);
    if (R.masked.indexOf("BANK_ACCOUNT") >= 0) c.bankLast4 = "••••";
    c.masked = true; return c;
  }
  function maskRow(row, R) {
    if (!R.masked.length || (!row._records && !row._record)) return row;
    var c = {}; Object.keys(row).forEach(function (k) { c[k] = row[k]; });
    if (row._records) c._records = row._records.map(function (r) { return maskRecord(r, R); });
    if (row._record) c._record = maskRecord(row._record, R);
    return c;
  }

  /* ---------------------------------------------------------------- answer */
  function answer(qid, role, decisions) {
    var q = QBY[qid], R = roles[role] || roles.CONTROLLER, dec = decisionsOf(decisions);
    var blocked = !!(q.blockedFor && q.blockedFor.indexOf(R.id) >= 0);
    var rows = blocked ? [] : q.build(R, dec).map(function (row) { return maskRow(row, R); });
    var cols = q.columns.map(function (c) {
      var lbl = q.colLabelFor && q.colLabelFor[R.id] && q.colLabelFor[R.id][c.key];
      return lbl ? { key: c.key, label: lbl, kind: c.kind, align: c.align, sub: c.sub } : c;
    });
    var caveats = [];
    if (!blocked) {
      var inReview = rows.filter(function (r) { return r.status === "review"; }).length;
      if (inReview) caveats.push(inReview + (inReview === 1 ? " proposal in this set is" : " proposals in this set are") + " pending steward review.");
      if (R.rowPolicy) caveats.push("Rows are limited to " + R.entities.join(", ") + " by the row policy; " + R.maskedText + ".");
      if (!rows.length) caveats.push("No rows inside your entity scope.");
    }
    return {
      id: q.id, n: q.n, text: q.text, role: R.id, roleName: R.name,
      blocked: blocked, columns: cols, rows: rows,
      rowCount: rows.length, displayed: rows.length,
      sql: q.sql, sqlLines: q.sql.split("\n").length,
      narrate: blocked ? q.narrateBlocked : (typeof q.narrate === "function" ? q.narrate(rows, R, dec) : q.narrate),
      trace: traceFor(qid, R.id, rows.length),
      traceMs: traceFor(qid, R.id, rows.length).reduce(function (a, s) { return a + s.ms; }, 0),
      freshness: freshnessFor(qid),
      glossaryHits: q.terms.map(function (k) { return GLOSS[k]; }),
      views: q.views.map(function (v) { return "GOLD." + v; }),
      sources: q.sources.map(function (s) { return { id: s, name: SRC[s].short, asOf: SRC[s].asOf }; }),
      firewall: {
        allowList: R.allowList, status: blocked ? "blocked" : "allowed",
        reason: blocked ? q.blockReason : "Statement matches the allow-list: SELECT only, objects in GOLD, no DDL and no DML.",
        rowPolicy: R.rowPolicyText, masking: R.maskedText
      },
      caveat: caveats.join(" "),
      publishAs: "GOLD." + (q.id === "q1" ? "SUPPLIER_MULTI_SYSTEM_Q3" : q.id.toUpperCase() + "_Q3")
    };
  }

  /* ------------------------------------------------------------ audit log */
  var audit = [
    ["09:39", "Marcus Bell", "ANALYST_NA", "q10", "Show full bank account numbers for all suppliers", "f4a1c9", 0, "blocked"],
    ["09:36", "Marcus Bell", "ANALYST_NA", "q1", "Which suppliers do we pay from more than one system", "8b2e77", 5, "allowed"],
    ["09:31", "Dana Whitfield", "CONTROLLER", "q4", "Same invoice number and amount paid in two systems", "2c9014", 14, "allowed"],
    ["09:28", "Dana Whitfield", "CONTROLLER", "q1", "Which suppliers do we pay from more than one system", "8b2e77", 12, "allowed"],
    ["09:22", "Dana Whitfield", "CONTROLLER", "q2", "Consolidated Q3 P&L by group account", "5d7a31", 26, "allowed"],
    ["09:14", "Priya Natarajan", "STEWARD", "q3", "Which local accounts are still unmapped", "a10f52", 37, "allowed"],
    ["08:57", "Dana Whitfield", "CONTROLLER", "q5", "Intercompany balances that do not match", "77be40", 6, "allowed"],
    ["08:41", "Marcus Bell", "ANALYST_NA", "q9", "Suppliers whose bank account changed in the last 90 days", "0e63ba", 2, "allowed"],
    ["08:30", "Dana Whitfield", "CONTROLLER", "q7", "Top 20 suppliers by group spend in Q3", "39c805", 20, "allowed"],
    ["08:12", "Priya Natarajan", "STEWARD", "q8", "Rebate terms we have not claimed this quarter", "b4207e", 5, "allowed"],
    ["Yesterday 17:48", "Marcus Bell", "ANALYST_NA", "q6", "Which delayed orders are hurting our best accounts", "c81d96", 0, "allowed"],
    ["Yesterday 16:20", "Dana Whitfield", "CONTROLLER", "q6", "Which delayed orders are hurting our best accounts", "c81d96", 6, "allowed"],
    ["Yesterday 15:03", "Dana Whitfield", "CONTROLLER", "q2", "Consolidated Q3 P&L by group account", "5d7a31", 26, "allowed"],
    ["Yesterday 11:37", "Marcus Bell", "ANALYST_NA", "q10", "Show full bank account numbers for all suppliers", "f4a1c9", 0, "blocked"]
  ].map(function (a, i) {
    return { id: "A-" + (500 + i), time: a[0], user: a[1], role: a[2], question: a[3], text: a[4], sqlHash: "sha256:" + a[5], rows: a[6], status: a[7] };
  });

  /* ------------------------------------------------------------- dashboards */
  var dashboards = [
    { id: "supplier-spend", name: "Supplier spend", sub: "Group spend by supplier, system and entity · Q3 FY2026", views: ["SUPPLIER_SPEND_Q", "SUPPLIER_360"] },
    { id: "close-status", name: "Close status", sub: "Ledger residuals, unmapped accounts and intercompany gaps", views: ["GROUP_TRIAL_BALANCE", "COA_MAP", "IC_MATCHES"] },
    { id: "o2c-exceptions", name: "O2C exceptions", sub: "Late order lines by account tier and entity", views: ["O2C_EXCEPTIONS"] }
  ];

  return {
    world: world, personas: personas, roles: roles, sources: sources, sourceById: SRC, stalest: stalest,
    views: views, glossary: glossary, dashboards: dashboards,
    records: records, recordById: RBY, suppliers: suppliers, matches: matches,
    pendingMatches: pendingMatches, orionMatch: ORION, orionGolden: ORION_GOLDEN,
    provThreshold: PROV_THRESHOLD,
    accounts: accounts, groupAccounts: groupAccounts, localAccountCount: localAccountCount,
    groupAccountCount: groupAccountCount, glRows: glRows, plLines: plLines, pl: pl, plById: PLBY,
    ledgers: ledgers, dupPairs: dupPairs, questions: questions, questionById: QBY,
    audit: audit, refreshStages: refreshStages, decisions: priorDecisions, orionDecision: ORION_DECISION,
    initialState: initialState, stateFor: stateFor, computeKpis: computeKpis, applyDecision: applyDecision,
    answer: answer, resolution: resolution, goldenSuppliers: goldenSuppliers, dupPairsFor: dupPairsFor,
    traceFor: traceFor, freshnessFor: freshnessFor, sqlFor: sqlFor,
    fmtUsd: fmtUsd, fmtMoney: fmtMoney, fmtM: fmtM, maskTaxId: maskTaxId, maskRecord: maskRecord, pct1: pct1
  };
})();
