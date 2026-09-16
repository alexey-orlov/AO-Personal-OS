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
  function nextId(sys) {
    _rc[sys]++;
    if (sys === "FUSION") return "S-" + (10100 + _rc[sys] * 7);
    if (sys === "JDE") return String(110000 + _rc[sys] * 53);
    return "V-" + (4000 + _rc[sys] * 3);
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
  /* the hand-written tax-id clusters count towards the same 228 */
  handGolden.forEach(function (g) { if (g.basis === "taxId") g.records.forEach(function (rid) { byId(rid).exactBefore = true; }); });
  function byId(id) { return RBY[id]; }
  var RBY = {}; records.forEach(function (r) { RBY[r.id] = r; });
  handGolden.forEach(function (g) { if (g.basis === "taxId") g.records.forEach(function (rid) { RBY[rid].exactBefore = true; }); });
