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
/* E3: the solution stack renders top → bottom in this order. A product may
   omit a layer (the Lakehouse pair has no NVIDIA engine) but may never
   re-order them — the Technology tab is the surface a technical buyer
   compares most directly across products. */
var STACK_KEYS = ["application", "ai-engine", "data-platform", "infrastructure", "custom"];
var STACK_VENDORS = ["oracle", "nvidia", "softserve"];
var DIRECTIONS = ["inbound", "outbound", "both"];
/* G: the Jumpstart block is the same three pillars on all seven, in this order. */
var PILLARS = ["fast", "low-risk", "tangible"];
var NEXT_TIERS = ["Integration", "Scale"];
/* A matrix row carrying a restrictive asterisk is PARTIAL: an unqualified
   SUPPORTED tag on it would overstate the source. */
var CAP_STATES = ["supported", "partial", "roadmap"];
/* Round 4, C1: a case study is measured or in progress. The status drives the
   chip and the metric eyebrow, so a third value would render an empty chip. */
var CASE_STATUSES = ["measured", "in-progress"];
/* Round 4, T1: the three tag families and the two availability badges. */
var PATTERN_IDS = ["deep-research", "processing-pipelines", "data-analysis"];
var FACET_IDS = ["oci-nvidia", "oracle-ai-data-platform", "oracle-autonomous-ai-lakehouse", "other"];
/* Round 4 (Alex, 2026-09-16): no customer may be named anywhere in the shipped
   data, and no customer logo may be referenced. The files stay on disk,
   unreferenced, pending customer approval. */
var CUSTOMER_NAMES = ["Bosch", "Riyadh Air", "RiyadhAir", "Riyahd", "DHL", "SBG", "BSH", "Binladin", "Belron", "Channel 4", "KPN", "NHS", "OMV"];
/* E: a one-liner says what the product does, for whom, with what outcome. It is
   not the place for the packaging story — that is what the Jumpstart tab is. */
var PACKAGING_PHRASES = [
  "packaged from proof of value",
  "from proof of value to enterprise scale",
  "fixed-price",
  "fixed price",
  "quick start",
  "proof of value to enterprise"
];

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
  var v = p.jumpstart || {};

  /* identity + hero */
  ["slug", "name", "oneLiner"].forEach(function (k) {
    if (!str(p[k])) fail(w, k + " missing");
  });
  if (str(p.oneLiner)) {
    var lowOne = p.oneLiner.toLowerCase();
    PACKAGING_PHRASES.forEach(function (phrase) {
      if (lowOne.indexOf(phrase) !== -1) {
        fail(w, 'oneLiner carries the packaging phrase "' + phrase + '" — the one-liner says what the product does, not how it is sold');
      }
    });
  }
  if (p.pov !== undefined) fail(w, "pov is superseded by jumpstart — nothing renders it");
  /* Round 4, T1: the three availability states became two badges driven by
     config flags. Nothing renders the chip model any more. */
  ["availability", "availabilityChip", "availabilityTooltip"].forEach(function (k) {
    if (p[k] !== undefined) fail(w, k + " is superseded by the availability badges — nothing renders it");
  });
  if (p.statusNote !== undefined) {
    if (!str(p.statusNote)) fail(w, "statusNote must be a non-empty string where present");
    else if (UNPACKAGED.indexOf(p.slug) === -1) {
      fail(w, "statusNote belongs only to the two unpackaged products (" + UNPACKAGED.join(", ") + ")");
    } else if (sentences(p.statusNote) > 1) {
      fail(w, "statusNote is " + sentences(p.statusNote) + " sentences — it is one muted line under the hero one-liner");
    }
  }
  if (UNPACKAGED.indexOf(p.slug) !== -1 && !str(p.statusNote)) {
    fail(w, "statusNote missing — an unpackaged product says so in one line, since it carries no availability badge");
  }
  (p.tags || []).forEach(function (tag) {
    if (RETIRED_TAGS.indexOf(tag) !== -1) {
      fail(w, 'tags carries the retired availability chip "' + tag + '" — availability is a badge now, not a tag');
    }
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
    /* Round 4, T1/T2: the Marketplace badge and the Marketplace facet both read
       this flag. A string would be truthy whatever it said. */
    if (typeof CFG.products[p.slug].marketplace !== "boolean") {
      fail(w, "config.marketplace missing or not a boolean (true | false)");
    }
    if (CFG.products[p.slug].marketplaceUrl && !CFG.products[p.slug].marketplace) {
      fail(w, "config.marketplaceUrl is set but config.marketplace is false — the badge would not render for a listing that exists");
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
  if (!arr(o.metrics) || o.metrics.length < 1 || o.metrics.length > 4) {
    fail(w, "overview.metrics must hold 1–4 tiles, got " + (arr(o.metrics) ? o.metrics.length : "none"));
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

  /* 2.5 industries — the chips are superseded by the industryCases tabs; only
     the "where else this applies" line survives, under the tab component. */
  if (o.industries !== undefined) fail(w, "overview.industries is superseded by overview.industryCases — nothing renders it");
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

  /* 2.8 case study — round 4, C1. An anonymized customer callout, or null.
     There is no empty state: a block whose only content is "nothing published
     yet" is worse than its absence on a page sellers demo live. */
  if (o.caseStudy === undefined) fail(w, "overview.caseStudy missing — it is null where no case study ships");
  if (o.successStory !== undefined) fail(w, "overview.successStory is superseded by overview.caseStudy — nothing renders it");
  if (o.caseStudy !== null && o.caseStudy !== undefined) {
    var cs = o.caseStudy;
    ["descriptor", "area", "industry", "image", "status", "metricsEyebrow", "story", "ndaLine", "downloadLabel"].forEach(function (k) {
      if (!str(cs[k])) fail(w, "overview.caseStudy." + k + " missing");
    });
    if (cs.customer !== undefined) fail(w, "overview.caseStudy.customer is banned — no customer is named on this site");
    if (cs.logo !== undefined || cs.logoStacked !== undefined) {
      fail(w, "overview.caseStudy carries a logo — the industry medallion replaced it and no customer mark ships");
    }
    if (CASE_STATUSES.indexOf(cs.status) === -1) {
      fail(w, 'overview.caseStudy.status "' + cs.status + '" is not ' + CASE_STATUSES.join(" / "));
    }
    /* The eyebrow says what the two figures are. A measured case may not label
       its figures as targets, and an in-progress one may not label targets as
       measured — that is the whole point of carrying the status. */
    var wantEyebrow = cs.status === "measured" ? "Measured" : "Target outcomes";
    if (str(cs.metricsEyebrow) && cs.metricsEyebrow !== wantEyebrow) {
      fail(w, 'overview.caseStudy.metricsEyebrow is "' + cs.metricsEyebrow + '", expected "' + wantEyebrow + '" for status "' + cs.status + '"');
    }
    if (INDUSTRIES.indexOf(cs.industry) === -1) {
      fail(w, 'overview.caseStudy.industry "' + cs.industry + '" is not in the fixed set of 16');
    } else if (str(cs.image)) {
      var wantCase = new RegExp("^assets/img/industries/" + cs.industry + "\\.(jpg|jpeg|png|webp)$");
      if (!wantCase.test(cs.image)) fail(w, 'overview.caseStudy.image "' + cs.image + '" must be assets/img/industries/' + cs.industry + ".jpg");
      else checkAsset(w, "case-study header image", cs.image);
    }
    if (!arr(cs.metrics) || cs.metrics.length !== 2) {
      fail(w, "overview.caseStudy.metrics must hold exactly 2 headline figures");
    } else cs.metrics.forEach(function (m, i) {
      if (!str(m.value) || !str(m.label)) fail(w, "caseStudy.metrics[" + i + "] needs { value, label }");
      if (str(m.value) && m.value.length > 18) fail(w, 'caseStudy.metrics[' + i + '].value "' + m.value + '" is too long to set large');
    });
    if (!arr(cs.scope) || cs.scope.length !== 3) {
      fail(w, "overview.caseStudy.scope must hold exactly 3 facts — the compact scope row");
    } else cs.scope.forEach(function (f, i) {
      if (!str(f.label) || !str(f.value)) fail(w, "caseStudy.scope[" + i + "] needs { label, value }");
    });
    /* Rule 1 of VISUAL-GRAMMAR: a number never renders away from its caveat,
       and this block has no footnote row of its own. */
    if (str(cs.story) && !/illustrative|modeled simulations|not contractual/i.test(cs.story)) {
      fail(w, "caseStudy.story carries figures with no caveat sentence — the block has no footnote row of its own");
    }
  }

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
        if (!want.test(s.image)) fail(sw, 'image "' + s.image + '" must be assets/img/steps/' + p.slug + "-" + (i + 1) + ".<jpg|png|webp|svg>");
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

  /* The At-a-glance card is gone (round 3, H): every fact it denormalised is
     printed by the block that owns it — the chips, the Jumpstart investment
     card, the stack. A summary card that restates them is a second place to
     keep in sync. */
  if (o.sideFacts !== undefined) fail(w, "overview.sideFacts is superseded — the At-a-glance card was removed; nothing renders it");

  /* 3.1 narrative */
  if (!str(t.narrative)) fail(w, "technology.narrative missing");
  else {
    var narrativeSentences = sentences(t.narrative);
    if (narrativeSentences > 3) fail(w, "technology.narrative is " + narrativeSentences + " sentences (max 3)");
  }

  /* The shapes the layered stack and the capability list replaced are gone from
     the data. A re-introduced one would render nowhere and drift out of sync in
     silence. `flow` went with the How-it-runs diagram (the stack reads top to
     bottom instead); `security` went with the Security-and-deployment block,
     its facts folded into the layer summaries, the scope lists and the
     Jumpstart pillars. */
  ["groups", "layers", "integration", "notUsed", "flow", "security"].forEach(function (k) {
    if (t[k] !== undefined) fail(w, "technology." + k + " is superseded — nothing renders it");
  });

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

  /* F · the capability list, grouped by the four workflow stages */
  if (!arr(t.capabilities) || t.capabilities.length !== 4) {
    fail(w, "technology.capabilities must hold exactly 4 workflow stages, got " + (arr(t.capabilities) ? t.capabilities.length : "none"));
  } else {
    var seenStages = [];
    t.capabilities.forEach(function (group, i) {
      var gw = w + ".capabilities[" + i + "]";
      if (!str(group.stage)) fail(gw, "stage missing");
      else if (seenStages.indexOf(group.stage) !== -1) fail(gw, 'stage "' + group.stage + '" appears twice');
      else seenStages.push(group.stage);
      if (!arr(group.items) || group.items.length < 3) fail(gw, "items needs ≥3 capabilities");
      else group.items.forEach(function (item, j) {
        if (!str(item.name)) fail(gw + ".items[" + j + "]", "name missing");
        if (item.state !== undefined && CAP_STATES.indexOf(item.state) === -1) {
          fail(gw + ".items[" + j + "]", 'state "' + item.state + '" is not supported / partial / roadmap — omit the key where no source states one');
        }
      });
    });
  }

  /* G · the Jumpstart Proof-of-Value block */
  if (!v || !Object.keys(v).length) fail(w, "jumpstart missing");
  else {
    ["title", "promise", "cta"].forEach(function (k) {
      if (k === "cta" ? !(v.cta && str(v.cta.label) && str(v.cta.route)) : !str(v[k])) {
        fail(w, "jumpstart." + k + " missing");
      }
    });
    if (str(v.title) && v.title !== "Jumpstart Proof-of-Value") {
      fail(w, 'jumpstart.title is "' + v.title + '" — the block title is the same on all seven');
    }
    if (!arr(v.pillars) || v.pillars.length !== 3) fail(w, "jumpstart.pillars must hold exactly 3");
    else v.pillars.forEach(function (pillar, i) {
      if (pillar.key !== PILLARS[i]) fail(w, 'pillars[' + i + '].key is "' + pillar.key + '", expected "' + PILLARS[i] + '"');
      ["title", "text"].forEach(function (k) {
        if (!str(pillar[k])) fail(w, "pillars[" + i + "]." + k + " missing");
      });
    });
    if (!arr(v.outcomes) || v.outcomes.length < 3 || v.outcomes.length > 4) {
      fail(w, "jumpstart.outcomes must hold 3–4 outcome lines, got " + (arr(v.outcomes) ? v.outcomes.length : "none"));
    }
    if (!arr(v.timeline) || v.timeline.length < 3 || v.timeline.length > 4) {
      fail(w, "jumpstart.timeline must hold 3–4 nodes, got " + (arr(v.timeline) ? v.timeline.length : "none"));
    } else v.timeline.forEach(function (node, i) {
      if (!str(node.label) || !str(node.text)) fail(w, "timeline[" + i + "] needs { label, text }");
    });
    if (!arr(v.needs) || v.needs.length !== 3) fail(w, "jumpstart.needs must hold exactly 3 items");
    var inv = v.investment;
    if (!inv) fail(w, "jumpstart.investment missing");
    else {
      /* A figure is a string or null: where nothing is published the card
         prints one scope line, not two tiles both reading the same
         placeholder. The footnote stays required — it renders with the
         figures, and a figure never renders without it. */
      ["price", "duration"].forEach(function (k) {
        if (!(inv[k] === null || str(inv[k]))) {
          fail(w, "jumpstart.investment." + k + " must be a non-empty string, or null where none is published");
        }
      });
      if (!str(inv.footnote)) fail(w, "jumpstart.investment.footnote missing — a figure never renders without it");
      if (!arr(inv.includes) || inv.includes.length < 3) fail(w, "jumpstart.investment.includes needs ≥3 lines");
      /* One footnote, not a disclaimer stack: the packaging-internal sentences
         were removed site-wide in round 3. */
      if (str(inv.footnote) && sentences(inv.footnote) > 2) {
        fail(w, "jumpstart.investment.footnote is " + sentences(inv.footnote) + " sentences — one footnote line, not a disclaimer stack");
      }
    }
    if (!arr(v.next) || v.next.length !== 2) fail(w, "jumpstart.next must hold exactly 2 steps — Integration and Scale");
    else v.next.forEach(function (step, i) {
      if (step.tier !== NEXT_TIERS[i]) fail(w, 'next[' + i + '].tier is "' + step.tier + '", expected "' + NEXT_TIERS[i] + '"');
      if (!str(step.text)) fail(w, "next[" + i + "].text missing");
      if (!str(step.price)) fail(w, "next[" + i + "].price missing — it reads Scoped per engagement where none is published");
    });
    if (v.cta && str(v.cta.route) && v.cta.route !== "#/products/" + p.slug + "/contacts") {
      fail(w, 'jumpstart.cta.route "' + v.cta.route + '" must point at this product’s contacts tab');
    }
    ["facts", "deliverables", "pricing", "disclaimers", "ladder", "ladderFootnote", "capabilityMatrix", "statStrip", "statNotes", "howItRuns", "prerequisites"].forEach(function (k) {
      if (v[k] !== undefined) fail(w, "jumpstart." + k + " is a superseded POV-tab shape — nothing renders it");
    });
  }

  /* invariants carried over from SCHEMA.md */
  if (!p.tile || !arr(p.tile.outcomes) || p.tile.outcomes.length !== 3) fail(w, "tile.outcomes must hold exactly 3");
});

/* ---- E5 · the contact card ---- */
(function () {
  var k = C.shared && C.shared.contact;
  if (!k) return fail("shared.contact", "missing — the Contacts tab and the Services contact section both render it");
  ["name", "email", "blurb"].forEach(function (f) {
    if (!str(k[f])) fail("shared.contact", f + " missing");
  });
  /* The photo is allowed to be empty — the card falls back to initials — but
     the key must exist so the renderer can test it. */
  if (typeof k.photo !== "string") fail("shared.contact", "photo must be a string (empty when no confirmed headshot ships)");
  else if (!k.photo.trim()) warn("shared.contact", "photo is empty — the card renders the initials avatar");
  /* The title is allowed to be empty — it is only printed when a source
     actually carries it — but the key must exist so the renderer can test it. */
  if (typeof k.title !== "string") fail("shared.contact", "title must be a string (empty when no source states it)");
  else if (!k.title.trim()) warn("shared.contact", "title is empty — the card renders name + email only");
  if (k.email !== "oracle@softserveinc.com") {
    fail("shared.contact", 'email must be the practice mailbox "oracle@softserveinc.com", got "' + k.email + '"');
  }
  if (str(k.blurb) && sentences(k.blurb) > 1) fail("shared.contact", "blurb is more than one line");
  /* E5 / round-3 C: the card is a bounded panel beside the form, and the list
     is what turns "get in touch" into a call someone can prepare for. */
  if (!str(k.bringTitle)) fail("shared.contact", "bringTitle missing — the heading of the Bring-to-the-call list");
  if (!arr(k.bring) || k.bring.length !== 3) fail("shared.contact", "bring must hold exactly 3 items");
  else k.bring.forEach(function (item, i) {
    if (!str(item)) fail("shared.contact", "bring[" + i + "] is not a string");
  });
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
  if (tabs.indexOf("jumpstart") === -1) fail("shared.productTabs", 'no "jumpstart" tab — the POV tab was renamed in round 3');
  if (tabs.indexOf("pov") !== -1) fail("shared.productTabs", 'the "pov" tab id is retired; /pov redirects to /jumpstart');
  var jump = (C.shared.productTabs || []).filter(function (x) { return x.id === "jumpstart"; })[0];
  if (jump && jump.legacyId !== "pov") fail("shared.productTabs", 'the jumpstart tab must carry legacyId "pov" so the old route still lands');
  if (!str(C.forms.demo && C.forms.demo.secondaryHeading)) {
    fail("forms.demo", "secondaryHeading missing — the form under the contact card is headed separately");
  }
})();

/* ---- banned strings, site-wide ---- */
var raw = fs.readFileSync(path.join(root, "site/data/content.js"), "utf8");
[
  ["GigaCloud", "internal company name"],
  ["WinP", "internal deal-state vocabulary"],
  /* Bosch and Riyadh Air are named on purpose (Alex, 2026-09-14) — they are the
     two customers whose proofs are written up on SoftServe's own external
     one-pagers. BSH stays banned: it is the internal entity abbreviation, and
     the business case behind it is an Oracle-confidential document. */
  ["BSH", "internal customer abbreviation — write Bosch"],
  ["DHL", "uncleared customer name"],
  ["€190K", "customer economics from a confidential business case"],
  ["€5.17", "customer economics from a confidential business case"],
  ["€11.03", "customer economics from a confidential business case"],
  ["Framed scope", "packaging-internal disclaimer, removed in round 3"],
  ["flexible add-ons", "packaging-internal disclaimer, removed in round 3"],
  ["beyond the frame", "packaging-internal disclaimer, removed in round 3"],
  ["set by specific constraints", "packaging-internal disclaimer, removed in round 3"],
  ["TODO", "internal marker"],
  ["(assumed)", "internal marker"],
  ["ktram@", "personal mailbox — the site prints the practice address only"],
  ["AIDP", "internal abbreviation; write Oracle AI Data Platform"],
  ["AltraDOC", "third-party product named in a customer's own estate"],
  ["modelled", "British spelling — the corpus is US English (modeled)"],
  ["minimis", "British spelling — the corpus is US English (minimize)"],
  ["optimis", "British spelling — the corpus is US English (optimize)"],
  ["organis", "British spelling — the corpus is US English (organize)"],
  ["normalis", "British spelling — the corpus is US English (normalize)"],
  ["enquir", "British spelling — the corpus is US English (inquiry)"],
  ["catalogue", "British spelling — the corpus is US English (catalog)"],
  ["prioritis", "British spelling — the corpus is US English (prioritize)"]
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
