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
/* E3: the solution stack renders top → bottom in this order. A product may
   omit a layer (the Lakehouse pair has no NVIDIA engine) but may never
   re-order them — the Technology tab is the surface a technical buyer
   compares most directly across products. */
var STACK_KEYS = ["application", "ai-engine", "data-platform", "infrastructure", "custom"];
var STACK_VENDORS = ["oracle", "nvidia", "softserve"];
var DIRECTIONS = ["inbound", "outbound", "both"];

var failures = [];
var warnings = [];
function fail(where, message) { failures.push(where + " — " + message); }
function warn(where, message) { warnings.push(where + " — " + message); }

function str(v) { return typeof v === "string" && v.trim().length > 0; }
function arr(v) { return Array.isArray(v); }
function words(s) { return s.trim().split(/\s+/).length; }
function sentences(s) {
  return s.split(/(?<=[.!?])\s+/).filter(function (x) { return x.trim().length; }).length;
}
/* Assets and copy ship on separate tracks, so a missing file is a warning. */
function checkAsset(where, what, rel) {
  if (!fs.existsSync(path.join(root, "site", rel))) {
    warn(where, what + " not on disk yet: site/" + rel);
  }
}

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
  else {
    if (typeof CFG.products[p.slug].videoPoster !== "string") {
      fail(w, "config.videoPoster missing (must exist, may be empty)");
    }
    /* A string here would be truthy whatever it said, so "false" would turn
       the frame on. The flag decides a layout — it has to be a real boolean. */
    if (typeof CFG.products[p.slug].video !== "boolean") {
      fail(w, "config.video missing or not a boolean (true | false)");
    }
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

  /* E2 · How it works — the workflow stepper */
  if (!arr(o.steps) || o.steps.length < 3 || o.steps.length > 5) {
    fail(w, "overview.steps must hold 3–5 workflow steps, got " + (arr(o.steps) ? o.steps.length : "none"));
  } else {
    var covered = [];
    o.steps.forEach(function (s, i) {
      var sw = w + ".steps[" + i + "]";
      if (s.n !== i + 1) fail(sw, 'n is "' + s.n + '", expected ' + (i + 1) + " — steps are numbered in order from 1");
      ["title", "text", "image"].forEach(function (k) {
        if (!str(s[k])) fail(sw, k + " missing");
      });
      /* ≤ 2 lines in the stepper, whose column is narrow. */
      if (str(s.text) && words(s.text) > 30) fail(sw, "text is " + words(s.text) + " words (max 30 — it has to fit two lines)");
      if (str(s.image)) {
        var want = new RegExp("^assets/img/steps/" + p.slug + "-" + (i + 1) + "\\.(jpg|jpeg|png|webp|svg)$");
        if (!want.test(s.image)) fail(sw, 'image "' + s.image + '" must be assets/img/steps/' + p.slug + "-" + (i + 1) + ".jpg");
        else checkAsset(sw, "step image", s.image);
      }
      if (!arr(s.features) || !s.features.length) fail(sw, "features missing — every step carries the feature bullets that belong to it");
      else s.features.forEach(function (f) {
        if (!arr(o.features) || o.features.indexOf(f) === -1) fail(sw, 'feature "' + f + '" is not one of overview.features');
        else if (covered.indexOf(f) !== -1) fail(sw, 'feature "' + f + '" is claimed by more than one step');
        else covered.push(f);
      });
    });
    /* No bullet may fall between the steps: the stepper replaces the checklist. */
    (o.features || []).forEach(function (f) {
      if (covered.indexOf(f) === -1) fail(w, 'feature "' + f + '" belongs to no step — every overview.features item lands in exactly one');
    });
  }

  /* E2 · Industry use cases — the tab component */
  if (!arr(o.industryCases) || o.industryCases.length < 3 || o.industryCases.length > 6) {
    fail(w, "overview.industryCases must hold 3–6 cases, got " + (arr(o.industryCases) ? o.industryCases.length : "none"));
  } else {
    var seenKeys = [];
    o.industryCases.forEach(function (c, i) {
      var cw = w + ".industryCases[" + i + "]";
      if (INDUSTRIES.indexOf(c.industry) === -1) fail(cw, 'industry "' + c.industry + '" is not in the fixed set of 16');
      else if (seenKeys.indexOf(c.industry) !== -1) fail(cw, 'industry "' + c.industry + '" appears twice — one tab per industry');
      else seenKeys.push(c.industry);
      ["label", "image", "problem", "solution"].forEach(function (k) {
        if (!str(c[k])) fail(cw, k + " missing");
      });
      if (str(c.label) && C.shared.industryLabels[c.industry] && c.label !== C.shared.industryLabels[c.industry]) {
        fail(cw, 'label "' + c.label + '" does not match shared.industryLabels.' + c.industry);
      }
      if (str(c.image)) {
        var wantImg = new RegExp("^assets/img/industries/" + c.industry + "\\.(jpg|jpeg|png|webp)$");
        if (!wantImg.test(c.image)) fail(cw, 'image "' + c.image + '" must be assets/img/industries/' + c.industry + ".jpg");
        else checkAsset(cw, "industry image", c.image);
      }
      ["problem", "solution"].forEach(function (k) {
        if (str(c[k]) && (sentences(c[k]) < 2 || sentences(c[k]) > 3)) {
          fail(cw, k + " is " + sentences(c[k]) + " sentences (2–3)");
        }
      });
    });
  }

  /* E2 · the side rail's At-a-glance card */
  if (!o.sideFacts) fail(w, "overview.sideFacts missing — the side rail has no facts card without it");
  else ["category", "platform", "availability", "povDuration", "povPrice"].forEach(function (k) {
    if (!str(o.sideFacts[k])) fail(w, "overview.sideFacts." + k + " missing");
  });
  if (o.sideFacts && str(o.sideFacts.availability) && o.sideFacts.availability !== p.availabilityChip) {
    fail(w, "sideFacts.availability does not match availabilityChip");
  }
  if (o.sideFacts && v.facts) {
    if (str(o.sideFacts.povDuration) && o.sideFacts.povDuration !== v.facts.duration) {
      fail(w, "sideFacts.povDuration does not match pov.facts.duration");
    }
  }

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

  /* E3 · the layered solution stack */
  if (!arr(t.stack) || t.stack.length < 4 || t.stack.length > 5) {
    fail(w, "technology.stack must hold 4–5 layers, got " + (arr(t.stack) ? t.stack.length : "none"));
  } else {
    var lastIdx = -1;
    var sawSoftServe = false;
    t.stack.forEach(function (layer, i) {
      var lw = w + ".stack[" + i + "]";
      var idx = STACK_KEYS.indexOf(layer.key);
      if (idx === -1) return fail(lw, 'key "' + layer.key + '" is not one of ' + STACK_KEYS.join(" / "));
      if (idx <= lastIdx) fail(lw, 'layer "' + layer.key + '" is out of order — the stack renders ' + STACK_KEYS.join(" → "));
      lastIdx = idx;
      ["label", "summary"].forEach(function (k) {
        if (!str(layer[k])) fail(lw, k + " missing");
      });
      if (str(layer.summary) && sentences(layer.summary) > 1) fail(lw, "summary is " + sentences(layer.summary) + " sentences (the accordion row holds one line)");
      if (!arr(layer.vendors) || !layer.vendors.length) fail(lw, "vendors missing — every layer carries at least one vendor mark");
      else layer.vendors.forEach(function (vn) {
        if (STACK_VENDORS.indexOf(vn) === -1) fail(lw, 'vendor "' + vn + '" is not oracle / nvidia / softserve');
        if (vn === "softserve") sawSoftServe = true;
      });
      if (!arr(layer.items) || !layer.items.length) return fail(lw, "items empty");
      var required = 0;
      layer.items.forEach(function (item, j) {
        var iw = lw + ".items[" + j + "]";
        if (!str(item.name)) fail(iw, "name missing");
        if (typeof item.required !== "boolean") fail(iw, "required must be a boolean — Required / Optional is a tag, not a guess");
        else if (item.required) required += 1;
        if (item.direction !== undefined && DIRECTIONS.indexOf(item.direction) === -1) {
          fail(iw, 'direction "' + item.direction + '" is not inbound / outbound / both');
        }
        if (item.direction !== undefined && layer.key !== "custom") {
          fail(iw, "direction belongs on the custom layer — that is where integrations render as Inbound / Outbound lines");
        }
      });
      if (!required) fail(lw, "no Required item — a layer with nothing required is not a layer of this stack");
    });
    var keys = t.stack.map(function (l) { return l.key; });
    ["application", "data-platform", "infrastructure", "custom"].forEach(function (k) {
      if (keys.indexOf(k) === -1) fail(w, 'technology.stack has no "' + k + '" layer');
    });
    if (!sawSoftServe) fail(w, "technology.stack carries no SoftServe vendor mark");
    var custom = t.stack.filter(function (l) { return l.key === "custom"; })[0];
    if (custom && arr(custom.items)) {
      var dirs = custom.items.map(function (x) { return x.direction; }).filter(Boolean);
      if (dirs.indexOf("inbound") === -1 && dirs.indexOf("both") === -1) {
        fail(w, "stack custom layer names no inbound integration");
      }
      if (dirs.indexOf("outbound") === -1 && dirs.indexOf("both") === -1) {
        fail(w, "stack custom layer names no outbound integration");
      }
    }
  }

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

/* ---- E5 · the contact card ---- */
(function () {
  var k = C.shared && C.shared.contact;
  if (!k) return fail("shared.contact", "missing — the Contacts tab and the Services contact section both render it");
  ["name", "email", "photo", "blurb"].forEach(function (f) {
    if (!str(k[f])) fail("shared.contact", f + " missing");
  });
  /* The title is allowed to be empty — it is only printed when a source
     actually carries it — but the key must exist so the renderer can test it. */
  if (typeof k.title !== "string") fail("shared.contact", "title must be a string (empty when no source states it)");
  else if (!k.title.trim()) warn("shared.contact", "title is empty — the card renders name + email only");
  if (k.email !== "oracle@softserveinc.com") {
    fail("shared.contact", 'email must be the practice mailbox "oracle@softserveinc.com", got "' + k.email + '"');
  }
  if (str(k.blurb) && sentences(k.blurb) > 1) fail("shared.contact", "blurb is more than one line");
  if (str(k.photo)) {
    if (!/^assets\/img\/people\/[a-z0-9-]+\.(jpg|jpeg|png|webp)$/.test(k.photo)) {
      fail("shared.contact", 'photo "' + k.photo + '" is not assets/img/people/<name>.<ext>');
    } else checkAsset("shared.contact", "contact photo", k.photo);
  }
  if (k.linkedin !== undefined && !/^https:\/\/([a-z]{2,3}\.)?linkedin\.com\//.test(k.linkedin)) {
    fail("shared.contact", "linkedin, when present, must be a public linkedin.com URL — omit the key otherwise");
  }
  var tabs = (C.shared.productTabs || []).map(function (x) { return x.id; });
  if (tabs.indexOf("contacts") === -1) fail("shared.productTabs", 'no "contacts" tab — the demo tab was renamed in E5');
  if (tabs.indexOf("demo") !== -1) fail("shared.productTabs", 'the "demo" tab id is retired; /demo redirects to /contacts');
  if (!str(C.forms.demo && C.forms.demo.secondaryHeading)) {
    fail("forms.demo", "secondaryHeading missing — the form under the contact card is headed separately");
  }
})();

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
  ["(assumed)", "internal marker"],
  ["ktram@", "personal mailbox — the site prints the practice address only"],
  ["AIDP", "internal abbreviation; write Oracle AI Data Platform"],
  ["AltraDOC", "third-party product named in a customer's own estate"]
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
