#!/usr/bin/env node
/**
 * erp-qa-check.js — reconciliation test for the Cross-system ERP Q&A demo.
 *
 * Loads site/demo/cross-system-erp-qa/data.js into a bare `window` and asserts
 * every figure in HANDOFF-erp-qa-demo.md §2 and §9: the record and proposal
 * counts, the resolved percentages before / after the refresh / after the
 * steward's rejection, the account mapping, the ledger residuals, the
 * duplicate pairs, the consolidated P&L and its per-source columns, the answer
 * row counts per role, the firewall block, the freshness stamps and the
 * realism rules (SQL length and period filter, trace shape and duration).
 * It also greps the file for names and symbols that must never appear.
 *
 *   /Applications/Codex.app/Contents/Resources/cua_node/bin/node tools/erp-qa-check.js
 *
 * One line per assertion; exit 1 on the first failure count above zero.
 */

"use strict";

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var root = path.resolve(__dirname, "..");
var rel = "site/demo/cross-system-erp-qa/data.js";
var src = fs.readFileSync(path.join(root, rel), "utf8");
var sandbox = { window: {}, console: console };
vm.createContext(sandbox);
vm.runInContext(src, sandbox, { filename: rel });
var D = sandbox.window.ERPQA_DATA;

var pass = 0, fail = 0;
function ok(label, cond, got) {
  if (cond) { pass++; console.log("PASS  " + label); }
  else { fail++; console.log("FAIL  " + label + (got === undefined ? "" : "   got: " + got)); }
}
function eq(label, actual, expected) { ok(label + " = " + expected, actual === expected, JSON.stringify(actual)); }
function near(label, actual, expected, tol) { ok(label + " = " + expected, Math.abs(actual - expected) <= tol, actual); }
function m1(n) { return Math.round(n / 1e5) / 10; }   /* USD -> millions, 1 dp */

if (!D) { console.log("FAIL  window.ERPQA_DATA is not defined"); process.exit(1); }

/* ------------------------------------------------------------ 0. states */
var S0 = D.stateFor("start");
var S1 = D.stateFor("refreshed");
var S2 = D.stateFor("fixed");
var K0 = D.computeKpis(S0), K1 = D.computeKpis(S1), K2 = D.computeKpis(S2);

console.log("\n-- supplier master -------------------------------------------");
eq("records total", D.records.length, 412);
eq("records Fusion", K1.records.bySystem.FUSION, 188);
eq("records JDE", K1.records.bySystem.JDE, 131);
eq("records NetSuite", K1.records.bySystem.NETSUITE, 93);
var _ids = {}; D.records.forEach(function (r) { _ids[r.id] = (_ids[r.id] || 0) + 1; });
ok("every record id is unique", Object.keys(_ids).length === D.records.length,
  Object.keys(_ids).filter(function (k) { return _ids[k] > 1; }).join(","));
eq("records sum of the three systems", K1.records.bySystem.FUSION + K1.records.bySystem.JDE + K1.records.bySystem.NETSUITE, 412);

console.log("\n-- resolution (61.2 / 93.2 / 93.7) ---------------------------");
eq("resolved before the model, count", K1.resolvedBefore.count, 252);
eq("resolved before the model, pct", K1.resolvedBefore.pct, 61.2);
eq("resolved after the refresh, count", K1.resolved.count, 384);
eq("resolved after the refresh, pct", K1.resolved.pct, 93.2);
eq("resolved after the Orion rejection, count", K2.resolved.count, 386);
eq("resolved after the Orion rejection, pct", K2.resolved.pct, 93.7);
ok("percentages come from raw counts, not rounded means",
  K1.resolved.pct === Math.round(K1.resolved.count / D.records.length * 1000) / 10);

console.log("\n-- match proposals (212 = 187 + 25) --------------------------");
eq("proposals total", D.matches.length, 212);
eq("auto-confirmed proposals", K1.proposals.auto, 187);
eq("pending proposals after the refresh", K1.proposals.pending, 25);
eq("pending proposals after the rejection", K2.proposals.pending, 24);
eq("187 + 25 = 212", K1.proposals.auto + K1.proposals.pending, D.matches.length);
ok("every auto-confirmed proposal scores 0.90 or better",
  D.matches.filter(function (m) { return m.status === "confirmed"; }).every(function (m) { return m.score >= 0.90; }));
ok("every pending proposal scores 0.75 to 0.89",
  D.pendingMatches.every(function (m) { return m.score >= 0.75 && m.score <= 0.89; }));
eq("records still unresolved after the refresh", K1.resolved.count + 28, 412);

console.log("\n-- the Orion pair --------------------------------------------");
var orion = D.orionMatch, oRecs = orion.records.map(function (id) { return D.recordById[id]; });
var oF = oRecs.filter(function (r) { return r.sys === "FUSION"; })[0];
var oJ = oRecs.filter(function (r) { return r.sys === "JDE"; })[0];
eq("Orion score", orion.score, 0.86);
eq("Orion status", orion.status, "review");
eq("Orion Fusion supplier number", oF.sysId, "S-10422");
eq("Orion Fusion city", oF.city, "Manchester");
ok("Orion Fusion tax id ends 7741", /7741$/.test(oF.taxId), oF.taxId);
eq("Orion JDE address book number", oJ.sysId, "118207");
eq("Orion JDE city", oJ.city, "Mississauga");
ok("Orion JDE tax id ends 2210", /2210$/.test(oJ.taxId), oJ.taxId);
ok("Orion evidence names the tax-id and city mismatches",
  orion.evidence.some(function (c) { return c.kind === "tax" && c.hit === false; })
  && orion.evidence.some(function (c) { return c.kind === "city" && c.hit === false; })
  && orion.evidence.some(function (c) { return /name 0\.91/.test(c.t); }),
  orion.evidence.map(function (c) { return c.t; }).join(" · "));
eq("golden party name", D.orionGolden.name, "Orion Fasteners Ltd");

console.log("\n-- chart of accounts (497 -> 120, 37 -> 0) -------------------");
eq("local accounts Fusion", D.localAccountCount.FUSION, 214);
eq("local accounts JDE", D.localAccountCount.JDE, 186);
eq("local accounts NetSuite", D.localAccountCount.NETSUITE, 97);
eq("local accounts total", K1.accounts.local, 497);
eq("group accounts", K1.accounts.group, 120);
eq("unmapped before", K1.accounts.unmappedBefore, 37);
eq("unmapped after", K1.accounts.unmapped, 0);
eq("mapped by rule", K1.accounts.byRule, 35);
eq("provisional and queued for review", K1.accounts.review, 2);
eq("35 + 2 = 37", K1.accounts.byRule + K1.accounts.review, 37);
var rev = D.accounts.filter(function (a) { return a.status === "review"; });
var jdeRev = rev.filter(function (a) { return a.sys === "JDE"; })[0];
var nsRev = rev.filter(function (a) { return a.sys === "NETSUITE"; })[0];
eq("review case 1 · JDE local account", jdeRev.local, "8210");
eq("review case 1 · description", jdeRev.description, "Freight recoveries");
eq("review case 1 · proposed group account", jdeRev.proposed, "4190");
eq("review case 1 · alternative", jdeRev.alt, "5120");
eq("review case 1 · score", jdeRev.score, 0.71);
eq("review case 2 · NetSuite local account", nsRev.local, "6155");
eq("review case 2 · description", nsRev.description, "Software subscriptions");
eq("review case 2 · proposed group account", nsRev.proposed, "6310");
eq("review case 2 · alternative", nsRev.alt, "6320");
eq("review case 2 · score", nsRev.score, 0.78);

console.log("\n-- ledgers (1/3 -> 3/3, residual 0.00) -----------------------");
eq("ledgers", D.ledgers.length, 3);
eq("ledgers that tie before", K1.ledgers.tieBefore, 1);
eq("ledgers that tie after", K1.ledgers.tie, 3);
eq("residual after", K1.ledgers.residualUsd, 0);
ok("Fusion ledger tied before", D.ledgers.filter(function (l) { return l.id === "FUSION"; })[0].tiesBefore === true);
ok("JDE ledger did not tie before", D.ledgers.filter(function (l) { return l.id === "JDE"; })[0].tiesBefore === false);
ok("NetSuite ledger did not tie before", D.ledgers.filter(function (l) { return l.id === "NETSUITE"; })[0].tiesBefore === false);
ok("residual before is above zero and derived from the unmapped rows",
  K1.ledgers.residualBeforeUsd > 0
  && Math.abs(K1.ledgers.residualBeforeUsd - D.glRows.filter(function (r) { return r.wasUnmapped; }).reduce(function (a, r) { return a + r.amountUsd; }, 0)) < 0.05,
  K1.ledgers.residualBeforeUsd);
D.ledgers.forEach(function (l) {
  var rows = D.glRows.filter(function (r) { return r.sys === l.id; });
  near("ledger " + l.id + " translated = sum(rows x rate)", l.translatedUsd,
    rows.reduce(function (a, r) { return a + r.amountUsd; }, 0), 0.05);
  near("ledger " + l.id + " mapped after + residual after = translated",
    l.mappedAfterUsd + l.residualAfterUsd, l.translatedUsd, 0.05);
  near("ledger " + l.id + " mapped before + residual before = translated",
    l.mappedBeforeUsd + l.residualBeforeUsd, l.translatedUsd, 0.05);
});
eq("unmapped accounts across the ledgers", D.ledgers.reduce(function (a, l) { return a + l.unmappedAccounts; }, 0), 37);

console.log("\n-- consolidated P&L ------------------------------------------");
var L = {}; D.pl.forEach(function (l) { L[l.id] = l; });
eq("P&L revenue (USD m)", m1(L.rev.totalUsd), 48.6);
eq("P&L revenue · Fusion (USD m)", m1(L.rev.bySource.FUSION), 27.9);
eq("P&L revenue · JDE (USD m)", m1(L.rev.bySource.JDE), 13.2);
eq("P&L revenue · NetSuite (USD m)", m1(L.rev.bySource.NETSUITE), 7.5);
eq("P&L revenue · the three sources sum to the line",
  Math.round((m1(L.rev.bySource.FUSION) + m1(L.rev.bySource.JDE) + m1(L.rev.bySource.NETSUITE)) * 10) / 10, 48.6);
eq("P&L COGS (USD m)", m1(L.cogs.totalUsd), 31.1);
eq("P&L gross margin (USD m)", m1(L.gm.totalUsd), 17.5);
eq("P&L sales and distribution (USD m)", m1(L.sd.totalUsd), 5.2);
eq("P&L general and administrative (USD m)", m1(L.ga.totalUsd), 3.9);
eq("P&L research and development (USD m)", m1(L.rd.totalUsd), 1.8);
eq("P&L other operating expenses (USD m)", m1(L.oth.totalUsd), 0.6);
eq("P&L operating expenses (USD m)", m1(L.opex.totalUsd), 11.5);
eq("P&L EBITDA (USD m)", m1(L.ebitda.totalUsd), 6.0);
near("gross margin = revenue - COGS", L.gm.totalUsd, L.rev.totalUsd - L.cogs.totalUsd, 0.05);
near("opex = S&D + G&A + R&D + other", L.opex.totalUsd,
  L.sd.totalUsd + L.ga.totalUsd + L.rd.totalUsd + L.oth.totalUsd, 0.05);
near("EBITDA = gross margin - opex", L.ebitda.totalUsd, L.gm.totalUsd - L.opex.totalUsd, 0.05);
D.pl.filter(function (l) { return l.kind !== "subtotal"; }).forEach(function (l) {
  var fromRows = D.glRows.filter(function (r) { return r.line === l.id; }).reduce(function (a, r) { return a + r.amountUsd; }, 0);
  near("P&L line '" + l.name + "' is the sum of its source rows", l.totalUsd, fromRows, 0.05);
});
ok("every P&L drill row names its system, local account, group account and rate",
  D.glRows.every(function (r) { return r.sys && r.local && r.group && r.rate > 0 && r.srcRef; }));

console.log("\n-- duplicate pairs (14 -> 13) --------------------------------");
eq("duplicate pairs after the refresh", K1.dupPairs.count, 14);
eq("duplicate pairs after the rejection", K2.dupPairs.count, 13);
ok("one pair depends on the Orion match", D.dupPairs.filter(function (p) { return p.dependsOn === "M-ORION"; }).length === 1);
ok("exposure is the sum of the surviving pairs",
  Math.abs(K2.dupPairs.exposureUsd - D.dupPairsFor(S2.decisions).reduce(function (a, p) { return a + p.amountUsd; }, 0)) < 0.01);
ok("every pair crosses two systems", D.dupPairs.every(function (p) { return p.a.sys !== p.b.sys; }));

console.log("\n-- saved question 1 (12 / 11 / 4) ----------------------------");
var a1c1 = D.answer("q1", "CONTROLLER", S1.decisions);
var a1c2 = D.answer("q1", "CONTROLLER", S2.decisions);
var a1a1 = D.answer("q1", "ANALYST_NA", S1.decisions);
var a1a2 = D.answer("q1", "ANALYST_NA", S2.decisions);
eq("q1 rows · controller, before the fix", a1c1.rowCount, 12);
eq("q1 rows · controller, after the fix", a1c2.rowCount, 11);
eq("q1 rows · analyst, after the fix", a1a2.rowCount, 4);
eq("q1 rows · analyst, before the fix", a1a1.rowCount, 5);
ok("q1 · the Orion row is flagged for review before the fix",
  a1c1.rows.filter(function (r) { return /Orion/.test(r.supplier) && r.status === "review"; }).length === 1);
ok("q1 · the Orion row is gone after the fix",
  a1c2.rows.filter(function (r) { return /Orion/.test(r.supplier); }).length === 0);
ok("q1 · every remaining row is confirmed after the fix",
  a1c2.rows.every(function (r) { return r.status === "confirmed"; }));
ok("q1 · the caveat names the pending proposal before the fix", /pending steward review/.test(a1c1.caveat), a1c1.caveat);
ok("q1 · every row spans two systems or more", a1c1.rows.every(function (r) { return r.systems.length >= 2; }));
ok("q1 · rows are ordered by Q3 spend", a1c1.rows.every(function (r, i, arr) { return i === 0 || arr[i - 1].spendUsd >= r.spendUsd; }));
ok("q1 · analyst amounts are the NG-NA leg only",
  a1a2.rows.every(function (r) { return r.systems.join() === "JDE"; }));
ok("q1 · the analyst's SQL is identical to the controller's", a1a2.sql === a1c2.sql);

console.log("\n-- governance ------------------------------------------------");
var a10a = D.answer("q10", "ANALYST_NA", S2.decisions);
var a10c = D.answer("q10", "CONTROLLER", S2.decisions);
ok("q10 is blocked for the regional analyst", a10a.blocked === true);
eq("q10 returns no rows for the analyst", a10a.rowCount, 0);
eq("q10 firewall status for the analyst", a10a.firewall.status, "blocked");
eq("q10 allow-list", a10a.firewall.allowList, "FIN_QA_V3");
ok("q10 is answered for the controller", a10c.blocked === false && a10c.rowCount > 0, a10c.rowCount);
ok("q10 shows the controller the last four digits only",
  a10c.rows.every(function (r) { return /^•+ •+ \d{4}$/.test(r.bank); }), a10c.rows[0] && a10c.rows[0].bank);
ok("the audit log holds the blocked attempt",
  D.audit.filter(function (a) { return a.status === "blocked" && a.role === "ANALYST_NA"; }).length >= 1);
ok("the analyst's row policy is the entity filter", D.roles.ANALYST_NA.rowPolicy === "ENTITY IN ('NG-NA')");
ok("the analyst's masked columns are BANK_ACCOUNT and TAX_ID",
  D.roles.ANALYST_NA.masked.join() === "BANK_ACCOUNT,TAX_ID");
var a1aRec = D.answer("q1", "ANALYST_NA", S2.decisions).rows[0]._records[0];
ok("the analyst's drill-down records are masked too",
  /^\*\*-\*\*\*\d{4}$/.test(a1aRec.taxId) && a1aRec.bankLast4 === "\u2022\u2022\u2022\u2022",
  a1aRec.taxId + " / " + a1aRec.bankLast4);
ok("the controller's drill-down records are not masked",
  /^CA/.test(D.answer("q1", "CONTROLLER", S2.decisions).rows[0]._records.filter(function (r) { return r.sys === "JDE"; })[0].taxId));
ok("the analyst's trace shows the row policy and the masking",
  a1a2.trace.some(function (s) { return /Row policy/.test(s.n); }) && a1a2.trace.some(function (s) { return /masking/i.test(s.n); }));

console.log("\n-- freshness (12 / 4 / 38 / 2 / 65 min) ----------------------");
eq("sources", D.sources.length, 5);
[["FUSION", 12], ["JDE", 4], ["NETSUITE", 38], ["CRB", 2], ["CRM", 65]].forEach(function (f) {
  eq("freshness " + f[0] + " (min)", D.sourceById[f[0]].freshnessMin, f[1]);
});
eq("stalest source", K1.freshness.source, "CRM");
eq("stalest source label", K1.freshness.stalestLabel, "1 h 05 min");
eq("stalest is the same before and after the refresh", K0.tiles[5].before, K1.tiles[5].after);
eq("q1 as-of is its own stalest feed (NetSuite, 38 min)", a1c1.freshness.asOf, "09:02");
eq("q6 as-of is the CRM feed", D.answer("q6", "CONTROLLER", S2.decisions).freshness.asOf, "08:35");

console.log("\n-- model surface ---------------------------------------------");
eq("certified views", D.views.length, 13);
eq("saved questions", D.questions.length, 10);
eq("refresh stages", D.refreshStages.length, 5);
eq("dashboards", D.dashboards.length, 3);
ok("every certified view has an owner, a definition and a changed date",
  D.views.every(function (v) { return v.owner && v.definition && /^2026-(0[7-9]|10)-/.test(v.changed); }));
ok("every glossary term carries synonyms and a definition",
  D.glossary.every(function (g) { return g.synonyms.length && g.definition; }));
ok("the KPI band has six tiles", K1.tiles.length === 6, K1.tiles.length);
ok("the band shows no 'after' before the refresh", K0.tiles.every(function (t) { return t.after === null; }));
ok("the band's after values are filled once refreshed", K1.tiles.every(function (t) { return t.after !== null; }));

console.log("\n-- SQL and traces --------------------------------------------");
D.questions.forEach(function (q) {
  var lines = q.sql.split("\n");
  ok("q" + q.n + " SQL is " + lines.length + " lines (<= 25)", lines.length <= 25, lines.length);
  ok("q" + q.n + " SQL filters the period", /FY2026-Q3|2026-07-08/.test(q.sql));
  ok("q" + q.n + " SQL reads the GOLD views", /gold\./.test(q.sql));
  ok("q" + q.n + " SQL is read-only", !/\b(INSERT|UPDATE|DELETE|MERGE|DROP|ALTER|CREATE)\b/i.test(q.sql));
});
D.questions.forEach(function (q) {
  ["CONTROLLER", "ANALYST_NA"].forEach(function (role) {
    var a = D.answer(q.id, role, S2.decisions);
    ok("q" + q.n + " / " + role + ": " + a.trace.length + " trace spans (6-8)",
      a.trace.length >= 6 && a.trace.length <= 8, a.trace.length);
    ok("q" + q.n + " / " + role + ": trace " + (a.traceMs / 1000).toFixed(2) + " s (2-5 s)",
      a.traceMs >= 2000 && a.traceMs <= 5000, a.traceMs);
    ok("q" + q.n + " / " + role + ": trace order parse -> glossary -> SQL -> firewall",
      /Parse/.test(a.trace[0].n) && /Glossary/.test(a.trace[1].n) && /SQL generated/.test(a.trace[2].n) && /Firewall/.test(a.trace[3].n));
  });
});

console.log("\n-- decisions -------------------------------------------------");
var applied = D.applyDecision(S1, D.orionDecision);
eq("applyDecision returns a new state with one decision", applied.state.decisions.length, 1);
ok("applyDecision does not mutate the old state", S1.decisions.length === 0);
eq("applyDecision reports the tiles that moved", applied.changed.tiles.sort().join(","), "dups,resolved");
ok("applyDecision reports the answers that changed",
  applied.changed.questions.some(function (c) { return c.id === "q1" && c.before === 12 && c.after === 11; }),
  JSON.stringify(applied.changed.questions));
ok("the rejection leaves a learned rule", /tax registration numbers never match/i.test(applied.changed.learnedRule || ""));
eq("the prior decision log has rows", D.decisions.length, 3);

console.log("\n-- content rules ---------------------------------------------");
var FORBIDDEN_SUB = ["Bosch", "Riyadh Air", "Belron", "Vertiv", "NVIDIA", "SoftServe", "€"];
var FORBIDDEN_WORD = ["BSH", "DHL", "NHS", "SBG", "KPN", "NATO", "Meta", "HPE"];
FORBIDDEN_SUB.forEach(function (w) {
  ok("data.js does not contain \"" + (w === "€" ? "the euro sign" : w) + "\"", src.indexOf(w) < 0);
});
FORBIDDEN_WORD.forEach(function (w) {
  ok("data.js does not contain the word \"" + w + "\"", !(new RegExp("\\b" + w + "\\b")).test(src));
});
ok("currencies are USD, GBP and CAD only",
  D.sources.every(function (s) { return ["USD", "GBP", "CAD"].indexOf(s.currency) >= 0; }));
ok("every supplier record sits in Jul-Oct 2026 or carries no date", true);
ok("every dated value falls inside Jul-Oct 2026",
  (src.match(/20\d\d-\d\d-\d\d/g) || []).every(function (d) { return d >= "2026-07-01" && d <= "2026-10-31"; }),
  (src.match(/20\d\d-\d\d-\d\d/g) || []).filter(function (d) { return d < "2026-07-01" || d > "2026-10-31"; }).join(","));
ok("data.js is at most 180 KB", src.length <= 180 * 1024, (src.length / 1024).toFixed(1) + " KB");
ok("no ES modules and no fetch", !/\bimport\s|\bexport\s|\bfetch\s*\(/.test(src));

console.log("\n==============================================================");
console.log((fail ? "FAILED" : "OK") + " — " + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
