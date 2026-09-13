(function () {
  "use strict";

  window.PAGES = window.PAGES || {};

  var GROUP_MARK = {
    "Oracle Cloud Infrastructure": { src: "assets/img/oracle-wordmark-white.svg", alt: "Oracle" },
    "Oracle AI Data Platform": { src: "assets/img/oracle-wordmark-white.svg", alt: "Oracle" },
    "Oracle Autonomous AI Lakehouse": { src: "assets/img/oracle-wordmark-white.svg", alt: "Oracle" },
    "NVIDIA": { src: "assets/img/nvidia-wordmark.svg", alt: "NVIDIA" }
  };

  var lastView = { slug: null, tab: null };

  function C() { return window.SITE_CONTENT; }
  function cfg(slug) { return window.SITE_CONFIG.products[slug] || {}; }

  function findProduct(slug) {
    var list = C().products;
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].slug === slug) return list[i];
    }
    return null;
  }

  function tabId(params) {
    var tabs = C().shared.productTabs;
    var wanted = params.tab || "overview";
    for (var i = 0; i < tabs.length; i += 1) {
      if (tabs[i].id === wanted) return wanted;
    }
    return "overview";
  }

  /* ————— small blocks ————— */

  function blockHead(title) {
    return '<h2 class="h3 block-title">' + window.UI.esc(title) + "</h2>";
  }

  function noteBlock(block, extraClass) {
    if (!block) return "";
    var UI = window.UI;
    return '<section class="panel reveal' + (extraClass ? " " + extraClass : "") + '">' +
      blockHead(block.title) +
      '<p class="body-text">' + UI.esc(block.body) + "</p>" +
      (block.extra ? '<p class="body-text panel-extra">' + UI.esc(block.extra) + "</p>" : "") +
      "</section>";
  }

  function bulletList(items, className) {
    var UI = window.UI;
    return '<ul class="' + (className || "tick-list") + '">' + items.map(function (item) {
      return "<li>" + UI.icon("check") + "<span>" + UI.esc(item) + "</span></li>";
    }).join("") + "</ul>";
  }

  function plainList(items) {
    var UI = window.UI;
    return '<ul class="dash-list">' + items.map(function (item) {
      return "<li>" + UI.esc(item) + "</li>";
    }).join("") + "</ul>";
  }

  function defGrid(items, columns) {
    var UI = window.UI;
    return '<div class="def-grid' + (columns ? " def-grid--" + columns : "") + '">' +
      items.map(function (item) {
        return '<div class="def">' +
          '<h3 class="def-title">' + UI.esc(item.title) + "</h3>" +
          '<p class="def-body">' + UI.esc(item.body) + "</p>" +
          "</div>";
      }).join("") + "</div>";
  }

  function factRow(items) {
    var UI = window.UI;
    var cells = items.filter(function (item) { return item && item.value; }).map(function (item) {
      return '<div class="fact">' +
        '<p class="fact-label">' + UI.esc(item.label) + "</p>" +
        '<p class="fact-value">' + UI.esc(item.value) + "</p>" +
        (item.note ? '<p class="footnote">' + UI.esc(item.note) + "</p>" : "") +
        "</div>";
    }).join("");
    return cells ? '<div class="fact-row">' + cells + "</div>" : "";
  }

  /* ————— hero ————— */

  function heroCtas(product) {
    var UI = window.UI;
    var conf = cfg(product.slug);
    var out = [UI.button({
      label: C().site.primaryCta.label,
      href: "#/products/" + product.slug + "/demo",
      kind: "primary"
    })];
    if (conf.videoUrl) {
      out.push(UI.button({
        label: "Watch the demo", kind: "secondary", icon: "play",
        attrs: { "data-video": conf.videoUrl, "data-video-title": product.name }
      }));
    }
    if (conf.marketplaceUrl) {
      out.push(UI.button({
        label: C().facets.marketplace.heroCta, href: conf.marketplaceUrl,
        kind: "quiet", iconAfter: "external"
      }));
    }
    if (conf.successStoryUrl) {
      out.push(UI.button({
        label: "Download the success story", href: conf.successStoryUrl,
        kind: "quiet", icon: "download", attrs: { download: "" }
      }));
    }
    return '<div class="cta-row product-hero-cta">' + out.join("") + "</div>";
  }

  function hero(product) {
    var UI = window.UI;
    var facet = UI.facetLabel(product.facet);
    var conf = cfg(product.slug);
    var chips = [
      UI.chip({ label: product.categoryChip }),
      UI.chip({ label: facet.label, title: facet.fullLabel }),
      UI.availabilityChip(product)
    ];
    if (conf.marketplace) {
      chips.push(UI.chip({ label: C().facets.marketplace.badge }));
    }
    var badges = product.badges
      ? '<ul class="hero-badges">' + product.badges.map(function (badge) {
          return "<li>" + UI.esc(badge) + "</li>";
        }).join("") + "</ul>"
      : "";

    return '<section class="product-hero">' +
      '<span class="hero-glow" aria-hidden="true"></span>' +
      '<div class="wrap product-hero-inner">' +
        '<nav class="crumbs" aria-label="Breadcrumb">' +
          '<a href="#/products">' + UI.esc(C().productsPage.title) + "</a>" +
          "<span aria-hidden=\"true\">/</span>" +
          "<span>" + UI.esc(product.categoryChip) + "</span>" +
        "</nav>" +
        (product.heroLine ? '<p class="eyebrow eyebrow--accent hero-line">' + UI.esc(product.heroLine) + "</p>" : "") +
        UI.headline(product.headline, "h1", "h1 product-title") +
        '<div class="chip-row product-hero-chips">' + chips.join("") + "</div>" +
        '<p class="lead product-lead">' + UI.esc(product.oneLiner) + "</p>" +
        (product.subLine ? '<p class="body-text product-subline">' + UI.esc(product.subLine) + "</p>" : "") +
        badges +
        heroCtas(product) +
        (product.heroCaption ? '<p class="hero-caption">' + UI.esc(product.heroCaption) + "</p>" : "") +
      "</div>" +
      "</section>";
  }

  function tabbar(product, active) {
    var UI = window.UI;
    var tabs = C().shared.productTabs.map(function (tab) {
      return '<a class="tab' + (tab.id === active ? " is-active" : "") +
        '" href="#/products/' + UI.esc(product.slug) + "/" + UI.esc(tab.id) + '"' +
        (tab.id === active ? ' aria-current="page"' : "") + ">" +
        (tab.locked ? UI.icon("lock") : "") + "<span>" + UI.esc(tab.label) + "</span></a>";
    }).join("");
    return '<nav class="tabbar" id="product-tabs" aria-label="' + UI.esc(product.name) +
      ' sections"><div class="wrap tabbar-inner">' + tabs + "</div></nav>";
  }

  /* ————— tab: overview ————— */

  function problemBlock(block) {
    var UI = window.UI;
    if (!block) return "";
    return '<section class="panel reveal">' +
      blockHead(block.title) +
      '<p class="lead">' + UI.esc(block.lead) + "</p>" +
      (block.bullets && block.bullets.length ? defGrid(block.bullets, "3") : "") +
      (block.context ? '<p class="body-text panel-extra">' + UI.esc(block.context) + "</p>" : "") +
      "</section>";
  }

  function solutionBlock(block) {
    var UI = window.UI;
    if (!block) return "";
    return '<section class="panel reveal">' +
      blockHead(block.title) +
      '<p class="lead">' + UI.esc(block.lead) + "</p>" +
      (block.valueStrip ? '<p class="value-strip">' + UI.esc(block.valueStrip) + "</p>" : "") +
      (block.items && block.items.length ? defGrid(block.items, "3") : "") +
      (block.expanded
        ? '<details class="disclosure"><summary><span>How it works in detail</span>' +
            UI.icon("chevronDown") + "</summary>" +
            '<p class="body-text">' + UI.esc(block.expanded) + "</p></details>"
        : "") +
      (block.closing ? '<p class="body-text panel-extra">' + UI.esc(block.closing) + "</p>" : "") +
      "</section>";
  }

  function todayTomorrow(block) {
    var UI = window.UI;
    if (!block) return "";
    return '<section class="panel reveal">' +
      '<div class="split-two">' +
        '<div class="split-col">' +
          '<p class="eyebrow">' + UI.esc(block.today.title) + "</p>" +
          '<p class="body-text">' + UI.esc(block.today.body) + "</p>" +
        "</div>" +
        '<div class="split-col split-col--accent">' +
          '<p class="eyebrow eyebrow--accent">' + UI.esc(block.tomorrow.title) + "</p>" +
          '<p class="body-text">' + UI.esc(block.tomorrow.body) + "</p>" +
        "</div>" +
      "</div></section>";
  }

  function metricsBlock(block) {
    var UI = window.UI;
    if (!block) return "";
    var body;
    if (block.rows && block.rows.length) {
      body = '<dl class="metric-rows">' + block.rows.map(function (row) {
        return '<div class="metric-row">' +
          "<dt>" + UI.esc(row.label) + "</dt>" +
          "<dd>" + UI.esc(row.value) + "</dd>" +
          "</div>";
      }).join("") + "</dl>" +
      (block.footnote ? '<p class="footnote">' + UI.esc(block.footnote) + "</p>" : "");
    } else {
      body = UI.empty(block.emptyState || "");
    }
    return '<section class="panel reveal">' + blockHead(block.title) + body +
      (block.proofLine ? '<p class="body-text panel-extra">' + UI.esc(block.proofLine) + "</p>" : "") +
      "</section>";
  }

  function scopeLists(product) {
    var UI = window.UI;
    var overview = product.overview;
    if (!overview.inScope && !overview.outOfScope) return "";
    var columns = [overview.inScope, overview.outOfScope].filter(Boolean).map(function (block) {
      return '<div class="scope-col">' +
        '<p class="eyebrow' + (block === overview.inScope ? " eyebrow--accent" : "") + '">' +
          UI.esc(block.title) + "</p>" +
        (block === overview.inScope ? bulletList(block.items) : plainList(block.items)) +
        "</div>";
    }).join("");
    return '<section class="panel reveal"><div class="scope-grid">' + columns + "</div></section>";
  }

  function successStory(product) {
    var UI = window.UI;
    var story = product.overview.successStory;
    var conf = cfg(product.slug);
    var results = story.results && story.results.length
      ? '<div class="proof-metrics">' + story.results.map(function (item) {
          return '<div class="metric">' +
            '<p class="metric-value nums">' + UI.esc(item.value) + "</p>" +
            '<p class="metric-label">' + UI.esc(item.label) + "</p>" +
            "</div>";
        }).join("") +
        (story.footnotes && story.footnotes.length
          ? '<div class="proof-footnotes">' + story.footnotes.map(function (note) {
              return '<p class="footnote">' + UI.esc(note) + "</p>";
            }).join("") + "</div>"
          : "") +
        "</div>"
      : UI.empty(story.emptyLabel);

    return '<section class="panel reveal">' + blockHead(story.title) +
      '<div class="story-grid">' +
        '<div class="story-copy">' +
          (story.blurb ? '<p class="body-text">' + UI.esc(story.blurb) + "</p>" : "") +
          (story.scopeLine ? '<p class="proof-scope">' + UI.esc(story.scopeLine) + "</p>" : "") +
          (conf.successStoryUrl
            ? UI.button({
                label: "Download the success story", href: conf.successStoryUrl,
                kind: "secondary", icon: "download", attrs: { download: "" }
              })
            : "") +
        "</div>" +
        results +
      "</div></section>";
  }

  function overviewTab(product) {
    var UI = window.UI;
    var o = product.overview;
    var parts = [
      noteBlock(o.pattern),
      problemBlock(o.problem),
      solutionBlock(o.solution),
      todayTomorrow(o.todayTomorrow),
      o.pullQuote ? '<blockquote class="pull-quote reveal">' + UI.esc(o.pullQuote) + "</blockquote>" : "",
      o.whatWeHear ? '<section class="panel reveal">' + blockHead(o.whatWeHear.title) +
        defGrid(o.whatWeHear.items, "2") + "</section>" : "",
      noteBlock(o.scopeParagraph),
      noteBlock(o.evidenceDefinition),
      noteBlock(o.useCaseBoundaries),
      noteBlock(o.scopeBoundary),
      noteBlock(o.exclusions),
      metricsBlock(o.metrics),
      noteBlock(o.roi),
      o.whereItApplies ? '<section class="panel reveal">' + blockHead(o.whereItApplies.title) +
        (o.whereItApplies.lead ? '<p class="lead">' + UI.esc(o.whereItApplies.lead) + "</p>" : "") +
        defGrid(o.whereItApplies.items, "2") + "</section>" : "",
      '<section class="panel reveal">' + blockHead(o.features.title) +
        defGrid(o.features.items, "2") +
        (o.features.footnote ? '<p class="footnote">' + UI.esc(o.features.footnote) + "</p>" : "") +
        "</section>",
      scopeLists(product),
      noteBlock(o.deliveredAtRollout),
      noteBlock(o.roadmap),
      successStory(product),
      o.closingDisclaimer ? '<p class="footnote closing-note">' + UI.esc(o.closingDisclaimer) + "</p>" : ""
    ];
    return parts.join("");
  }

  /* ————— tab: technology ————— */

  function componentGroup(group) {
    var UI = window.UI;
    var mark = GROUP_MARK[group.group];
    var muted = group.items.length === 1 && /^Not (used|required)/i.test(group.items[0]);
    return '<div class="component-group' + (muted ? " is-muted" : "") + '">' +
      '<div class="component-head">' +
        '<p class="component-name">' + UI.esc(group.group) + "</p>" +
        (mark ? '<img class="group-mark" src="' + UI.esc(mark.src) + '" alt="' + UI.esc(mark.alt) + '">' : "") +
      "</div>" +
      '<ul class="component-items">' + group.items.map(function (item) {
        return "<li>" + UI.esc(item) + "</li>";
      }).join("") + "</ul>" +
      "</div>";
  }

  function technologyTab(product) {
    var UI = window.UI;
    var tech = product.technology;
    var layers = tech.layers && tech.layers.length
      ? '<section class="panel reveal">' + blockHead("Solution stack") +
          '<div class="layer-table">' + tech.layers.map(function (layer) {
            return '<div class="layer-row">' +
              '<p class="layer-name">' + UI.esc(layer.layer) + "</p>" +
              '<p class="layer-by">' + UI.esc(layer.providedBy) + "</p>" +
              '<p class="layer-body">' + UI.esc(layer.body) + "</p>" +
              "</div>";
          }).join("") + "</div></section>"
      : "";

    return '<section class="panel reveal">' + blockHead("Architecture") +
        '<p class="lead">' + UI.esc(tech.narrative) + "</p></section>" +
      layers +
      '<section class="panel reveal">' + blockHead("Components") +
        '<div class="component-grid">' + tech.components.map(componentGroup).join("") + "</div></section>" +
      noteBlock(tech.governance) +
      '<section class="panel reveal"><div class="scope-grid">' +
        '<div class="scope-col">' +
          '<p class="eyebrow eyebrow--accent">Integration</p>' + plainList(tech.integration) +
        "</div>" +
        '<div class="scope-col">' +
          '<p class="eyebrow eyebrow--accent">Security and deployment</p>' + plainList(tech.security) +
        "</div>" +
      "</div></section>";
  }

  /* ————— tab: POV Jumpstart ————— */

  function ladder(product) {
    var UI = window.UI;
    var columns = C().shared.ladderColumns;
    var cards = product.pov.ladder.map(function (tier, index) {
      var label = columns[index] && columns[index] !== tier.title
        ? columns[index] : "Step " + (index + 1);
      return '<article class="tier">' +
        '<p class="eyebrow' + (index === 0 ? " eyebrow--accent" : "") + '">' +
          UI.esc(label) + "</p>" +
        '<h3 class="tier-title">' + UI.esc(tier.title) + "</h3>" +
        '<p class="tier-scope">' + UI.esc(tier.scope) + "</p>" +
        bulletList(tier.includes, "tier-list") +
        '<div class="tier-foot">' +
          '<p class="tier-label">Duration</p><p class="tier-value">' + UI.esc(tier.duration) + "</p>" +
          '<p class="tier-label">Pricing</p><p class="tier-value">' + UI.esc(tier.pricing) + "</p>" +
        "</div>" +
        "</article>";
    }).join("");
    return '<section class="panel reveal">' + blockHead("From proof of value to scale") +
      '<div class="tier-grid">' + cards + "</div>" +
      (product.pov.ladderFootnote ? '<p class="footnote">' + UI.esc(product.pov.ladderFootnote) + "</p>" : "") +
      "</section>";
  }

  function capabilityMatrix(matrix) {
    var UI = window.UI;
    if (!matrix) return "";
    var columns = C().shared.ladderColumns;
    var head = '<tr><th scope="col">Capability</th>' + columns.map(function (column) {
      return '<th scope="col">' + UI.esc(column) + "</th>";
    }).join("") + "</tr>";
    var rows = matrix.rows.map(function (row) {
      return '<tr><th scope="row">' + UI.esc(row.label) + "</th>" +
        '<td class="nums">' + UI.esc(row.pov) + "</td>" +
        '<td class="nums">' + UI.esc(row.rollout) + "</td>" +
        '<td class="nums">' + UI.esc(row.scaling) + "</td></tr>";
    }).join("");
    return '<section class="panel reveal">' + blockHead("What is included at each step") +
      '<div class="table-scroll"><table class="matrix"><thead>' + head + "</thead><tbody>" + rows +
      "</tbody></table></div>" +
      '<p class="footnote">' + UI.esc(matrix.legend) + "</p></section>";
  }

  function povTab(product) {
    var UI = window.UI;
    var pov = product.pov;
    var facts = factRow([
      { label: "Duration", value: pov.duration, note: pov.durationNote },
      { label: "Team", value: pov.team },
      { label: "Phases", value: pov.phases, note: pov.gateNote },
      { label: "How it is measured", value: pov.howMeasured }
    ]);

    var scopeLines = [
      pov.inScope ? { label: "In scope", value: pov.inScope } : null,
      pov.notInScope ? { label: "Not in the proof of value", value: pov.notInScope } : null,
      pov.thenRollout ? { label: "Then at roll-out", value: pov.thenRollout } : null
    ].filter(Boolean);

    var pricing = '<div class="price-table">' + pov.pricing.map(function (line) {
      return '<div class="price-row">' +
        '<p class="price-label">' + UI.esc(line.label) + "</p>" +
        '<p class="price-value nums">' + UI.esc(line.value) + "</p>" +
        (line.note ? '<p class="footnote price-note">' + UI.esc(line.note) + "</p>" : "") +
        "</div>";
    }).join("") + "</div>" +
      '<div class="price-disclaimers">' + pov.disclaimers.map(function (line) {
        return '<p class="footnote">' + UI.esc(line) + "</p>";
      }).join("") + "</div>" +
      (pov.creditNote ? '<p class="credit-note">' + UI.esc(pov.creditNote) + "</p>" : "");

    var credibility = C().shared.credibilityBlock;

    return '<section class="panel reveal">' + blockHead(pov.heading) +
        '<p class="lead">' + UI.esc(pov.scope) + "</p>" +
        (pov.statStrip ? '<p class="value-strip">' + UI.esc(pov.statStrip) + "</p>" : "") +
        facts +
        (scopeLines.length ? '<dl class="metric-rows">' + scopeLines.map(function (line) {
          return '<div class="metric-row"><dt>' + UI.esc(line.label) + "</dt><dd>" +
            UI.esc(line.value) + "</dd></div>";
        }).join("") + "</dl>" : "") +
      "</section>" +
      (pov.statNotes ? '<section class="panel reveal">' + blockHead("The terms, in full") +
        defGrid(pov.statNotes, "3") + "</section>" : "") +
      (pov.prerequisites ? '<section class="panel reveal">' + blockHead(pov.prerequisites.title) +
        plainList(pov.prerequisites.items) + "</section>" : "") +
      (pov.howItRuns ? '<section class="panel reveal">' + blockHead(pov.howItRuns.title) +
        '<ol class="step-list">' + pov.howItRuns.steps.map(function (step, index) {
          return '<li class="step"><span class="step-index nums">' + (index + 1) + "</span>" +
            "<div><p class=\"step-title\">" + UI.esc(step.title) + "</p>" +
            '<p class="step-body">' + UI.esc(step.body) + "</p></div></li>";
        }).join("") + "</ol>" +
        (pov.howItRuns.closing ? '<p class="body-text panel-extra">' + UI.esc(pov.howItRuns.closing) + "</p>" : "") +
        "</section>" : "") +
      '<section class="panel reveal">' + blockHead(pov.deliverablesTitle || "Deliverables") +
        bulletList(pov.deliverables) + "</section>" +
      '<section class="panel reveal">' + blockHead("Pricing") + pricing + "</section>" +
      capabilityMatrix(pov.capabilityMatrix) +
      ladder(product) +
      '<section class="panel reveal gate-note">' + blockHead(C().shared.preFlightGate.title) +
        '<p class="body-text">' + UI.esc(C().shared.preFlightGate.body) + "</p></section>" +
      '<section class="panel reveal">' + blockHead(credibility.heading) +
        defGrid(credibility.items, "4") + "</section>" +
      '<p class="panel-link">' + UI.linkArrow({
        label: C().shared.engageLink.label, href: C().shared.engageLink.route
      }) + "</p>";
  }

  /* ————— tab: request a demo ————— */

  function demoTab(product) {
    if (!window.FORMS) return window.UI.empty(C().forms.demo.sub);
    return '<section class="panel panel--form reveal" id="product-demo-form">' +
      window.FORMS.render("demo", { product: product.slug }) + "</section>";
  }

  /* ————— tab: for sellers ————— */

  function gateUnlocked() {
    try {
      return window.localStorage.getItem(window.SITE_CONFIG.sellerGate.storageKey) === "1";
    } catch (error) {
      return false;
    }
  }

  function materialRow(product, material) {
    var UI = window.UI;
    var gate = C().sellerGate;
    var url = (cfg(product.slug).materials || {})[material.key] || "";
    var usable = url && material.state !== "superseded";
    var control = usable
      ? UI.button({ label: gate.downloadLabel, href: url, kind: "secondary", sm: true, icon: "download" })
      : UI.button({
          label: C().shared.materialStates[material.state] || gate.linkPendingLabel,
          kind: "quiet", sm: true, attrs: { disabled: true, "aria-disabled": "true" }
        });
    return '<li class="material">' +
      "<div>" +
        '<p class="material-title">' + UI.esc(material.title) + "</p>" +
        '<p class="material-desc">' + UI.esc(material.description) + "</p>" +
      "</div>" +
      '<div class="material-action">' + control + "</div>" +
      "</li>";
  }

  function printsPrice(product) {
    var pov = product.pov || {};
    var priced = /[€$£]/;
    return (pov.pricing || []).some(function (line) { return priced.test(line.value); }) ||
      (pov.ladder || []).some(function (tier) { return priced.test(tier.pricing); });
  }

  function sellerCtaBody(product) {
    var gate = C().sellerGate;
    var duration = product.pov && product.pov.durationShort;
    if (!duration) return gate.cta.bodyFallback || gate.cta.body;
    return gate.cta.body.replace("{duration}", duration);
  }

  function sellersTab(product) {
    var UI = window.UI;
    var gate = C().sellerGate;
    var unlocked = gateUnlocked();
    var allLocked = product.sellers.materials.every(function (material) {
      return !((cfg(product.slug).materials || {})[material.key]);
    });

    if (!unlocked) {
      return '<section class="panel panel--gate reveal" id="seller-gate">' +
        '<span class="gate-mark">' + UI.icon("lock") + "</span>" +
        blockHead(gate.heading) +
        '<p class="body-text">' + UI.esc(gate.lockedBody) + "</p>" +
        '<form class="gate-form" id="gate-form">' +
          '<label class="field-label" for="gate-email">' + UI.esc(gate.emailLabel) + "</label>" +
          '<div class="gate-row">' +
            '<input class="input" type="email" id="gate-email" placeholder="' +
              UI.esc(gate.emailPlaceholder) + '" autocomplete="email">' +
            UI.button({ label: gate.unlockLabel, kind: "secondary", attrs: { type: "submit" } }) +
          "</div>" +
          '<p class="field-error" id="gate-error" role="alert" hidden></p>' +
          '<p class="footnote">' + UI.esc(gate.accessNote) + "</p>" +
        "</form>" +
        "</section>";
    }

    var noteLines = product.sellers.notes.slice();
    if (printsPrice(product)) {
      noteLines = noteLines.concat(gate.packagingNotes || []);
    }
    var notes = noteLines.length
      ? '<section class="panel reveal">' + blockHead("Seller notes") +
          plainList(noteLines) + "</section>"
      : "";

    return '<section class="panel reveal" id="seller-panel">' +
        '<div class="gate-bar">' +
          '<p class="footnote">' + UI.esc(gate.accessNote) + "</p>" +
          UI.button({ label: gate.lockLabel, kind: "quiet", sm: true, icon: "lock", attrs: { id: "gate-lock" } }) +
        "</div>" +
        blockHead(gate.heading) +
        '<p class="body-text">' + UI.esc(gate.unlockedIntro) + "</p>" +
        (allLocked && product.sellers.emptyPanelCopy
          ? '<p class="body-text panel-extra">' + UI.esc(product.sellers.emptyPanelCopy) + "</p>" : "") +
        '<ul class="material-list">' + product.sellers.materials.map(function (material) {
          return materialRow(product, material);
        }).join("") + "</ul>" +
      "</section>" +
      notes +
      '<section class="panel panel--cta reveal">' +
        blockHead(gate.cta.heading) +
        '<p class="body-text">' + UI.esc(sellerCtaBody(product)) + "</p>" +
        '<p class="footnote">' + UI.esc(gate.cta.contactLabel) + "</p>" +
        '<div class="cta-row">' +
          UI.button({
            label: gate.cta.action, kind: "primary",
            attrs: { id: "seller-contact", "data-product": product.slug }
          }) +
        "</div>" +
      "</section>";
  }

  /* ————— related & neighbours ————— */

  function related(product) {
    var UI = window.UI;
    function rank(item) {
      return (item.category === product.category ? 2 : 0) + (item.facet === product.facet ? 1 : 0);
    }
    var list = C().products.filter(function (item) {
      return item.slug !== product.slug && rank(item) > 0;
    }).map(function (item, index) {
      return { item: item, index: index };
    }).sort(function (a, b) {
      return rank(b.item) - rank(a.item) || a.index - b.index;
    }).slice(0, 3).map(function (entry) { return entry.item; });
    if (!list.length) return "";
    var cards = list.map(function (item) {
      return '<a class="related-card" href="#/products/' + UI.esc(item.slug) + '">' +
        '<p class="eyebrow">' + UI.esc(item.categoryChip) + "</p>" +
        '<p class="related-name">' + UI.esc(item.name) + "</p>" +
        '<p class="related-desc clamp-2">' + UI.esc(item.oneLiner) + "</p>" +
        '<span class="related-arrow">' + UI.icon("arrow") + "</span>" +
        "</a>";
    }).join("");
    return '<section class="section section--tight"><div class="wrap">' +
      UI.sectionHead({ title: "Related products", count: list.length }) +
      '<div class="related-grid">' + cards + "</div>" +
      "</div></section>";
  }

  function neighbours(product) {
    var UI = window.UI;
    var list = C().products;
    var index = list.map(function (item) { return item.slug; }).indexOf(product.slug);
    var prev = list[(index - 1 + list.length) % list.length];
    var next = list[(index + 1) % list.length];
    return '<nav class="pager" aria-label="Products">' +
      '<div class="wrap pager-inner">' +
        '<a class="pager-link pager-link--prev" href="#/products/' + UI.esc(prev.slug) + '">' +
          UI.icon("arrow") + "<span><em>Previous</em>" + UI.esc(prev.name) + "</span></a>" +
        '<a class="pager-link pager-link--next" href="#/products/' + UI.esc(next.slug) + '">' +
          "<span><em>Next</em>" + UI.esc(next.name) + "</span>" + UI.icon("arrow") + "</a>" +
      "</div></nav>";
  }

  /* ————— page ————— */

  function product(params) {
    var UI = window.UI;
    var item = findProduct(params.slug);
    if (!item) {
      return '<section class="wrap route-note">' +
        '<p class="eyebrow eyebrow--accent">Not found</p>' +
        '<h1 class="h1">NO SUCH <span class="accent">PRODUCT</span></h1>' +
        '<p class="lead">' + UI.esc(C().productsPage.intro) + "</p>" +
        '<div class="cta-row">' +
          UI.button({ label: "Browse the products", href: "#/products", kind: "secondary" }) +
        "</div></section>";
    }

    var active = tabId(params);
    var body;
    if (active === "technology") body = technologyTab(item);
    else if (active === "pov") body = povTab(item);
    else if (active === "demo") body = demoTab(item);
    else if (active === "sellers") body = sellersTab(item);
    else body = overviewTab(item);

    return hero(item) + tabbar(item, active) +
      '<section class="section section--tight"><div class="wrap tab-body" id="tab-body">' +
        body +
      "</div></section>" +
      related(item) + neighbours(item);
  }

  function bindGate(root, item, rerender) {
    var gate = C().sellerGate;
    var form = root.querySelector("#gate-form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var input = form.querySelector("#gate-email");
        var error = form.querySelector("#gate-error");
        var value = input.value.trim().toLowerCase();
        var at = value.lastIndexOf("@");
        var domain = at >= 0 ? value.slice(at + 1) : "";
        var allowed = window.SITE_CONFIG.sellerGate.allowedDomains.some(function (item2) {
          return domain === item2 || domain.slice(-(item2.length + 1)) === "." + item2;
        });
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          error.textContent = C().forms.labels.invalidEmail;
          error.hidden = false;
          input.focus();
          return;
        }
        if (!allowed) {
          error.textContent = gate.rejected;
          error.hidden = false;
          input.focus();
          return;
        }
        try { window.localStorage.setItem(window.SITE_CONFIG.sellerGate.storageKey, "1"); }
        catch (storageError) { /* unlock stays for this view only */ }
        rerender();
      });
    }

    var lock = root.querySelector("#gate-lock");
    if (lock) {
      lock.addEventListener("click", function () {
        try { window.localStorage.removeItem(window.SITE_CONFIG.sellerGate.storageKey); }
        catch (storageError) { /* nothing stored */ }
        rerender();
      });
    }

    var contact = root.querySelector("#seller-contact");
    if (contact) {
      contact.addEventListener("click", function () {
        window.UI.modal.open(
          window.FORMS.render("contact", { product: item.slug, role: "oracle-seller" }),
          { label: C().forms.contact.heading }
        );
        var panel = document.querySelector(".modal-panel");
        if (panel) window.FORMS.mount(panel, "contact");
      });
    }
  }

  function embedUrl(url) {
    var value = String(url || "");
    var found;
    if (/youtube\.com\/embed\/|youtube-nocookie\.com\/embed\/|player\.vimeo\.com\/video\//i.test(value)) {
      return value;
    }
    found = value.match(/youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|live\/)([A-Za-z0-9_-]{6,})/i) ||
      value.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/i);
    if (found) return "https://www.youtube.com/embed/" + found[1];
    found = value.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if (found) return "https://player.vimeo.com/video/" + found[1];
    return value;
  }

  function bindVideo(root, item) {
    Array.prototype.forEach.call(root.querySelectorAll("[data-video]"), function (button) {
      button.addEventListener("click", function () {
        var url = button.getAttribute("data-video");
        var title = button.getAttribute("data-video-title") || item.name;
        var embed = /youtube\.com|youtu\.be|youtube-nocookie\.com|vimeo\.com|\.sharepoint\.com|web\.microsoftstream\.com/i.test(url)
          ? '<iframe class="video-frame" src="' + window.UI.esc(embedUrl(url)) +
            '" title="' + window.UI.esc(title) +
            '" allow="autoplay; fullscreen; picture-in-picture"></iframe>'
          : '<video class="video-frame" src="' + window.UI.esc(url) + '" controls playsinline></video>';
        window.UI.modal.open('<h2 class="h3 modal-title">' + window.UI.esc(title) + "</h2>" +
          '<div class="video-wrap">' + embed + "</div>", { label: title });
      });
    });
  }

  product.mount = function (params, root) {
    var item = findProduct(params.slug);
    if (!item) return;
    var active = tabId(params);

    function rerender() {
      window.ROUTER.render();
    }

    bindGate(root, item, rerender);
    bindVideo(root, item);

    if (active === "demo" && window.FORMS) {
      var slot = root.querySelector("#product-demo-form");
      if (slot) window.FORMS.mount(slot, "demo", { product: item.slug });
    }

    var switched = lastView.slug === params.slug && lastView.tab !== active;
    lastView = { slug: params.slug, tab: active };

    if (switched) {
      var tabs = root.querySelector("#product-tabs");
      if (tabs) {
        var top = tabs.getBoundingClientRect().top + window.pageYOffset - 76;
        if (window.pageYOffset > top) window.scrollTo({ top: top, behavior: "instant" });
      }
    }
  };

  product.title = function (params) {
    var item = findProduct(params.slug);
    return (item ? item.name + " — " : "") + C().site.title;
  };

  window.PAGES.product = product;
})();
