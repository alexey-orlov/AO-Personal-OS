#!/usr/bin/env node
/**
 * check-grammar.js — asserts that every product in site/data/content.js fills
 * every slot of the visual grammar documented in docs/VISUAL-GRAMMAR.md.
 *
 *   node tools/check-grammar.js
 *
 * Exits 0 and prints "OK" when all seven products pass; exits 1 and lists
 * every failure otherwise. No dependencies.
 */

"use strict";

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var root = path.resolve(__dirname, "..");
var sandbox = { window: {} };
vm.createContext(sandbox);
["site/data/content.js", "site/data/config.js"].forEach(function (rel) {
  vm.runInContext(fs.readFileSync(path.join(root, rel), "utf8"), sandbox, { filename: rel });
});

var C = sandbox.window.SITE_CONTENT;
var CFG = sandbox.window.SITE_CONFIG;

var INDUSTRIES = [
  "manufacturing", "logistics", "utilities", "telecom", "healthcare",
  "financial-services", "insurance", "retail", "energy", "public-sector",
  "automotive", "life-sciences", "professional-services", "construction",
  "travel-transport", "cross-industry"
];
var VENDORS = ["oracle", "nvidia", "softserve", "other"];
var TIERS = ["proof-of-value", "rollout", "scaling"];

var failures = [];
var warnings = [];
function fail(where, message) { failures.push(where + " — " + message); }
function warn(where, message) { warnings.push(where + " — " + message); }

function str(v) { return typeof v === "string" && v.trim().length > 0; }
function arr(v) { return Array.isArray(v); }
function words(s) { return s.trim().split(/\s+/).length; }

function checkHeroImage(where, image) {
  if (!image || typeof image !== "object") return fail(where, "hero.image missing");
  ["file", "alt", "focal"].forEach(function (k) {
    if (!str(image[k])) fail(where, "hero.image." + k + " missing or empty");
  });
  if (!/^assets\/img\/heroes\/[a-z0-9-]+\.(jpg|jpeg|png|webp)$/.test(image.file)) {
    fail(where, 'hero.image.file "' + image.file + '" is not assets/img/heroes/<name>.<ext>');
  }
  /* Not a failure: the data layer and the imagery ship on separate tracks. */
  if (!fs.existsSync(path.join(root, "site", image.file))) {
    warn(where, "hero image not on disk yet: site/" + image.file);
  }
}

/* ---- shared heroes ---- */
checkHeroImage("overview", C.overview.hero && C.overview.hero.image);
checkHeroImage("services", C.services.hero && C.services.hero.image);

/* ---- products ---- */
if (!arr(C.products) || C.products.length !== 7) {
  fail("products", "expected exactly 7 products, got " + (arr(C.products) ? C.products.length : "none"));
}

(C.products || []).forEach(function (p) {
  var w = "products[" + p.slug + "]";
  var o = p.overview || {};
  var t = p.technology || {};
  var v = p.pov || {};

  /* identity + hero */
  ["slug", "name", "oneLiner"].forEach(function (k) {
    if (!str(p[k])) fail(w, k + " missing");
  });
  if (!arr(p.tags) || !p.tags.length) fail(w, "tags missing");
  if (!p.hero) fail(w, "hero missing"); else checkHeroImage(w, p.hero.image);
  if (!CFG.products[p.slug]) fail(w, "no matching SITE_CONFIG.products entry");
  else if (typeof CFG.products[p.slug].videoPoster !== "string") {
    fail(w, "config.videoPoster missing (must exist, may be empty)");
  }

  /* 2.1 problem → solution */
  var ps = o.problemSolution;
  if (!ps) fail(w, "overview.problemSolution missing");
  else ["problem", "solution"].forEach(function (side) {
    var panel = ps[side];
    if (!panel) return fail(w, "problemSolution." + side + " missing");
    ["title", "text", "icon"].forEach(function (k) {
      if (!str(panel[k])) fail(w, "problemSolution." + side + "." + k + " missing");
    });
  });

  /* 2.2 metrics */
  if (!arr(o.metrics) || o.metrics.length < 3 || o.metrics.length > 4) {
    fail(w, "overview.metrics must hold 3–4 tiles, got " + (arr(o.metrics) ? o.metrics.length : "none"));
  } else o.metrics.forEach(function (m, i) {
    var mw = w + ".metrics[" + i + "]";
    if (!(m.value === null || str(m.value))) fail(mw, "value must be a non-empty string or null");
    if (str(m.value) && m.value.length > 20) fail(mw, 'value "' + m.value + '" is too long to set large');
    ["label", "qualifier", "icon"].forEach(function (k) {
      if (!str(m[k])) fail(mw, k + " missing");
    });
    if (str(m.qualifier) && words(m.qualifier) > 14) fail(mw, "qualifier is " + words(m.qualifier) + " words (max 14)");
  });
  if (!str(o.metricsNote)) fail(w, "overview.metricsNote missing — a metric row never renders without it");

  /* 2.3 roi */
  if (!o.roi) fail(w, "overview.roi missing");
  else ["icon", "text"].forEach(function (k) {
    if (!str(o.roi[k])) fail(w, "overview.roi." + k + " missing");
  });

  /* 2.4 features */
  if (!arr(o.features) || o.features.length < 6 || o.features.length > 8) {
    fail(w, "overview.features must hold 6–8 items, got " + (arr(o.features) ? o.features.length : "none"));
  } else o.features.forEach(function (f, i) {
    if (!str(f)) return fail(w, "features[" + i + "] is not a string");
    if (words(f) > 12) fail(w, 'features[' + i + '] is ' + words(f) + ' words (max 12): "' + f + '"');
  });
  if (!arr(o.featuresDetail) || o.featuresDetail.length < 6) {
    fail(w, "overview.featuresDetail must keep the long-form list (≥6 entries)");
  }

  /* 2.5 industries */
  if (!arr(o.industries) || !o.industries.length) fail(w, "overview.industries missing");
  else o.industries.forEach(function (key) {
    if (INDUSTRIES.indexOf(key) === -1) fail(w, 'industry key "' + key + '" is not in the fixed set');
  });
  if (!str(o.industriesNote)) fail(w, "overview.industriesNote missing");

  /* 2.6 scope */
  if (!o.scope || !arr(o.scope.in) || !arr(o.scope.out)) fail(w, "overview.scope.in / .out missing");
  else {
    if (o.scope.in.length < 4) fail(w, "overview.scope.in needs ≥4 items");
    if (o.scope.out.length < 4) fail(w, "overview.scope.out needs ≥4 items");
  }

  /* 2.7 more detail */
  if (!arr(o.moreDetail) || o.moreDetail.length < 3) fail(w, "overview.moreDetail needs ≥3 entries");
  else o.moreDetail.forEach(function (d, i) {
    if (!str(d.title) || !str(d.body)) fail(w, "moreDetail[" + i + "] needs { title, body }");
  });

  /* 2.8 success story */
  if (!o.successStory || !str(o.successStory.state)) fail(w, "overview.successStory missing");

  /* 3.1 narrative */
  if (!str(t.narrative)) fail(w, "technology.narrative missing");
  else {
    var sentences = t.narrative.split(/(?<=[.!?])\s+/).filter(function (x) { return x.trim().length; });
    if (sentences.length > 3) fail(w, "technology.narrative is " + sentences.length + " sentences (max 3)");
  }

  /* 3.2 flow */
  if (!arr(t.flow) || t.flow.length !== 4) {
    fail(w, "technology.flow must hold exactly 4 steps, got " + (arr(t.flow) ? t.flow.length : "none"));
  } else t.flow.forEach(function (s, i) {
    if (!str(s.step) || !str(s.label)) fail(w, "flow[" + i + "] needs { step, label }");
    if (str(s.label) && words(s.label) > 10) fail(w, "flow[" + i + "].label is " + words(s.label) + " words (max 10)");
  });

  /* 3.3 groups */
  if (!arr(t.groups) || t.groups.length < 3) fail(w, "technology.groups needs ≥3 groups");
  else t.groups.forEach(function (g, i) {
    if (VENDORS.indexOf(g.vendor) === -1) fail(w, 'groups[' + i + '].vendor "' + g.vendor + '" is not a known vendor');
    if (!str(g.label)) fail(w, "groups[" + i + "].label missing");
    if (!arr(g.items) || !g.items.length) fail(w, "groups[" + i + "].items empty");
  });
  var vendors = (t.groups || []).map(function (g) { return g.vendor; });
  if (vendors.indexOf("softserve") === -1) fail(w, "technology.groups has no SoftServe column");
  if (vendors.indexOf("oracle") === -1) fail(w, "technology.groups has no Oracle column");
  if (!arr(t.notUsed)) fail(w, "technology.notUsed missing (may be empty, must exist)");

  /* 3.4 integration + security */
  ["integration", "security"].forEach(function (k) {
    if (!arr(t[k]) || t[k].length < 3) return fail(w, "technology." + k + " needs ≥3 entries");
    t[k].forEach(function (item, i) {
      if (!str(item.icon) || !str(item.text)) fail(w, "technology." + k + "[" + i + "] needs { icon, text }");
    });
  });

  /* 4 pov */
  if (!v.facts) fail(w, "pov.facts missing");
  else {
    ["duration", "team", "price"].forEach(function (k) {
      if (!str(v.facts[k])) fail(w, "pov.facts." + k + " missing");
    });
    if (typeof v.facts.deliverablesCount !== "number") fail(w, "pov.facts.deliverablesCount must be a number");
    else if (arr(v.deliverables) && v.facts.deliverablesCount !== v.deliverables.length) {
      fail(w, "pov.facts.deliverablesCount (" + v.facts.deliverablesCount + ") ≠ pov.deliverables.length (" + v.deliverables.length + ")");
    }
  }
  if (!arr(v.deliverables) || v.deliverables.length < 4) fail(w, "pov.deliverables needs ≥4");
  if (!arr(v.pricing) || v.pricing.length < 2) fail(w, "pov.pricing needs ≥2 rows");
  if (!arr(v.disclaimers) || !v.disclaimers.length) fail(w, "pov.disclaimers needs ≥1 — a price never renders bare");
  if (!arr(v.ladder) || v.ladder.length !== 3) fail(w, "pov.ladder must hold exactly 3 tiers");
  else v.ladder.forEach(function (tier, i) {
    if (tier.tier !== TIERS[i]) fail(w, 'ladder[' + i + '].tier is "' + tier.tier + '", expected "' + TIERS[i] + '"');
    if (!str(tier.pricing)) fail(w, "ladder[" + i + "].pricing missing");
  });

  /* invariants carried over from SCHEMA.md */
  if (!p.tile || !arr(p.tile.outcomes) || p.tile.outcomes.length !== 3) fail(w, "tile.outcomes must hold exactly 3");
});

/* ---- banned strings, site-wide ---- */
var raw = fs.readFileSync(path.join(root, "site/data/content.js"), "utf8");
[
  ["GigaCloud", "internal company name"],
  ["WinP", "internal deal-state vocabulary"],
  ["Bosch", "uncleared customer name"],
  ["BSH", "uncleared customer name"],
  ["Riyadh Air", "uncleared customer name"],
  ["DHL", "uncleared customer name"],
  ["TODO", "internal marker"],
  ["(assumed)", "internal marker"]
].forEach(function (pair) {
  if (raw.indexOf(pair[0]) !== -1) fail("content.js", 'contains banned string "' + pair[0] + '" (' + pair[1] + ")");
});

if (warnings.length) {
  console.warn("check-grammar: " + warnings.length + " warning(s)");
  warnings.forEach(function (x) { console.warn("  ! " + x); });
  console.warn("");
}

if (failures.length) {
  console.error("check-grammar: " + failures.length + " failure(s)\n");
  failures.forEach(function (f) { console.error("  ✗ " + f); });
  process.exit(1);
}
console.log("check-grammar: OK — 7 products, every grammar slot filled.");
