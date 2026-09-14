(function () {
  "use strict";

  window.PAGES = window.PAGES || {};

  var VENDOR_MARK = {
    oracle: { src: "assets/img/oracle-wordmark-white.svg", alt: "Oracle" },
    nvidia: { src: "assets/img/nvidia-wordmark.svg", alt: "NVIDIA" },
    softserve: { src: "assets/img/softserve-wordmark-white.svg", alt: "SoftServe" }
  };

  var lastView = { slug: null, tab: null };

  function C() { return window.SITE_CONTENT; }
  function cfg(slug) { return window.SITE_CONFIG.products[slug] || {}; }
  function label(key) { return window.UI.sectionLabel(key); }

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

  function bulletList(items, className) {
    var UI = window.UI;
    return '<ul class="tick-list' + (className ? " " + className : "") + '">' + items.map(function (item) {
      return "<li>" + UI.icon("check") + "<span>" + UI.esc(item) + "</span></li>";
    }).join("") + "</ul>";
  }

  function plainList(items) {
    var UI = window.UI;
    return '<ul class="dash-list">' + items.map(function (item) {
      return "<li>" + UI.esc(item) + "</li>";
    }).join("") + "</ul>";
  }

  function iconList(items) {
    var UI = window.UI;
    return '<ul class="icon-list">' + items.map(function (item) {
      return "<li>" + UI.icon(item.icon) + "<span>" + UI.esc(item.text) + "</span></li>";
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

  function mediaRow(slug, inner, reverse) {
    var figure = window.UI.figure(slug);
    if (!figure) return '<section class="panel reveal">' + inner + "</section>";
    return '<section class="panel media-row' + (reverse ? " media-row--reverse" : "") + ' reveal">' +
      '<div class="media-copy">' + inner + "</div>" + figure + "</section>";
  }

  /* one band shape, used for ROI and for the Lakehouse governance note */
  function calloutBand(iconName, eyebrow, text) {
    var UI = window.UI;
    if (!text) return "";
    return '<section class="panel panel--flat reveal"><div class="roi-band">' +
      '<span class="roi-mark">' + UI.icon(iconName || "roi") + "</span>" +
      '<div class="roi-copy">' +
        '<p class="eyebrow eyebrow--accent">' + UI.esc(eyebrow) + "</p>" +
        '<p class="roi-text">' + UI.esc(text) + "</p>" +
      "</div></div></section>";
  }

  /* ————— hero ————— */

  function youtubeId(url) {
    var found = String(url || "").match(
      /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i
    );
    return found ? found[1] : "";
  }

  function posterFor(product) {
    var conf = cfg(product.slug);
    if (conf.videoPoster) return conf.videoPoster;
    var id = youtubeId(conf.videoUrl);
    if (id) return "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg";
    return (product.hero && product.hero.image && product.hero.image.file) || "";
  }

  /* The frame is promised before the file exists: `video: true` puts it on the
     page, `videoUrl` decides whether the click plays a recording or says when
     one is coming. Either way the hero keeps the same two-column shape, so a
     product does not change layout the day its video lands. */
  function heroMedia(product) {
    var UI = window.UI;
    var conf = cfg(product.slug);
    if (!conf.video && !conf.videoUrl) return "";
    var poster = posterFor(product);
    var caption = C().shared.videoCaption;
    var hook = conf.videoUrl
      ? ' data-video="' + UI.esc(conf.videoUrl) + '"' +
        ' data-video-title="' + UI.esc(product.name) + '"'
      : ' data-video-pending="' + UI.esc(product.slug) + '"';
    return '<div class="hero-media">' +
      '<button class="video-card" type="button"' + hook +
        ' aria-label="' + UI.esc(caption + " — " + product.name) + '">' +
        (poster
          ? '<img class="video-card-poster" src="' + UI.esc(poster) +
            '" alt="" loading="eager" decoding="async">'
          : "") +
        '<span class="video-card-veil" aria-hidden="true"></span>' +
        '<span class="video-card-play" aria-hidden="true">' + UI.icon("play", "icon--solid") + "</span>" +
        '<span class="video-card-caption">' + UI.esc(caption) + "</span>" +
      "</button></div>";
  }

  function heroCtas(product, hasMedia) {
    var UI = window.UI;
    var conf = cfg(product.slug);
    var out = [UI.button({
      label: C().site.primaryCta.label,
      href: "#/products/" + product.slug + "/demo",
      kind: "primary"
    })];
    if (conf.videoUrl && !hasMedia) {
      out.push(UI.button({
        label: C().shared.videoCaption, kind: "secondary", icon: "play",
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
        label: "Open the success story", href: conf.successStoryUrl,
        kind: "quiet", iconAfter: "external"
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
    if (conf.marketplaceUrl) {
      chips.push(UI.chip({ label: C().facets.marketplace.badge }));
    }
    var line = product.heroLine || product.heroCaption || "";
    var badges = product.badges
      ? '<ul class="hero-badges">' + product.badges.map(function (badge) {
          return "<li>" + UI.esc(badge) + "</li>";
        }).join("") + "</ul>"
      : "";

    var media = heroMedia(product);

    return '<section class="product-hero has-hero-bg' + (media ? " product-hero--media" : "") + '">' +
      UI.heroBackdrop(product.hero && product.hero.image) +
      '<span class="hero-glow" aria-hidden="true"></span>' +
      '<div class="wrap product-hero-inner' + (media ? "" : " product-hero-inner--single") + '">' +
      '<div class="product-hero-copy">' +
        '<nav class="crumbs" aria-label="Breadcrumb">' +
          '<a href="#/products">' + UI.esc(C().productsPage.title) + "</a>" +
          "<span aria-hidden=\"true\">/</span>" +
          "<span>" + UI.esc(product.categoryChip) + "</span>" +
        "</nav>" +
        (line ? '<p class="eyebrow eyebrow--accent hero-line">' + UI.esc(line) + "</p>" : "") +
        UI.headline(product.headline, "h1", "h1 product-title") +
        '<div class="chip-row product-hero-chips">' + chips.join("") + "</div>" +
        '<p class="lead product-lead">' + UI.esc(product.oneLiner) + "</p>" +
        (product.subLine ? '<p class="body-text product-subline">' + UI.esc(product.subLine) + "</p>" : "") +
        badges +
        heroCtas(product, !!media) +
      "</div>" +
      media +
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

  function problemSolution(block) {
    var UI = window.UI;
    if (!block) return "";
    function panel(side, isSolution) {
      return '<article class="ps-panel' + (isSolution ? " ps-panel--solution" : "") + '">' +
        '<span class="ps-mark">' + UI.icon(side.icon) + "</span>" +
        '<p class="eyebrow' + (isSolution ? " eyebrow--accent" : "") + '">' + UI.esc(side.title) + "</p>" +
        '<p class="ps-text">' + UI.esc(side.text) + "</p>" +
        "</article>";
    }
    return '<section class="panel panel--flat reveal"><div class="ps-strip">' +
      panel(block.problem, false) +
      '<span class="ps-arrow" aria-hidden="true">' + UI.icon("arrow") + "</span>" +
      panel(block.solution, true) +
      "</div></section>";
  }

  function metricTiles(o) {
    var UI = window.UI;
    if (!o.metrics || !o.metrics.length) return "";
    function valued(metric) {
      return metric.value !== null && metric.value !== undefined && metric.value !== "";
    }
    var anyValue = o.metrics.some(valued);
    var tiles = o.metrics.map(function (metric) {
      var hasValue = valued(metric);
      return '<div class="stat-tile">' +
        '<div class="stat-tile-top">' +
          (hasValue
            ? '<p class="stat-tile-value nums">' + UI.esc(metric.value) + "</p>"
            : '<span class="stat-tile-mark">' + UI.icon(metric.icon) + "</span>") +
        "</div>" +
        '<p class="stat-tile-label">' +
          (hasValue ? UI.icon(metric.icon) : "") +
          "<span>" + UI.esc(metric.label) + "</span></p>" +
        '<p class="stat-tile-qual">' + UI.esc(metric.qualifier) + "</p>" +
        "</div>";
    }).join("");
    return '<section class="panel reveal">' +
      blockHead(label(anyValue ? "metrics" : "metricsPlanned")) +
      '<div class="stat-tiles">' + tiles + "</div>" +
      (o.metricsNote ? '<p class="footnote stat-tiles-note">' + UI.esc(o.metricsNote) + "</p>" : "") +
      "</section>";
  }

  function featuresBlock(o) {
    var UI = window.UI;
    if (!o.features || !o.features.length) return "";
    return '<section class="panel reveal">' + blockHead(label("features")) +
      '<ul class="check-cols">' + o.features.map(function (item) {
        return "<li>" + UI.icon("check") + "<span>" + UI.esc(item) + "</span></li>";
      }).join("") + "</ul>" +
      (o.featuresNote ? '<p class="footnote">' + UI.esc(o.featuresNote) + "</p>" : "") +
      "</section>";
  }

  function industriesBlock(o) {
    var UI = window.UI;
    if (!o.industries || !o.industries.length) return "";
    return '<section class="panel panel--tight reveal">' + blockHead(label("industries")) +
      UI.industryChips(o.industries) +
      (o.industriesNote ? '<p class="footnote">' + UI.esc(o.industriesNote) + "</p>" : "") +
      "</section>";
  }

  function scopeBlock(o) {
    var UI = window.UI;
    if (!o.scope) return "";
    return '<section class="panel reveal">' + blockHead(label("scope")) +
      '<div class="scope-grid">' +
      '<div class="scope-col">' +
        '<p class="eyebrow eyebrow--accent">' + UI.esc(label("scopeIn")) + "</p>" +
        bulletList(o.scope.in) +
      "</div>" +
      '<div class="scope-col">' +
        '<p class="eyebrow">' + UI.esc(label("scopeOut")) + "</p>" +
        plainList(o.scope.out) +
      "</div></div></section>";
  }

  function detailEntries(items) {
    var UI = window.UI;
    return (items || []).map(function (item) {
      return '<div class="detail-entry">' +
        '<h3 class="detail-title">' + UI.esc(item.title) + "</h3>" +
        '<p class="detail-text">' + UI.esc(item.body) + "</p>" +
        "</div>";
    }).join("");
  }

  function moreDetail(o) {
    var UI = window.UI;
    var main = detailEntries(o.moreDetail);
    var features = detailEntries(o.featuresDetail);
    if (!main && !features) return "";
    return '<section class="panel panel--flat reveal">' +
      '<details class="disclosure disclosure--detail">' +
        "<summary><span>" + UI.esc(label("moreDetail")) + "</span>" + UI.icon("chevronDown") + "</summary>" +
        '<div class="detail-wrap">' +
          main +
          (features
            ? '<p class="eyebrow detail-sub">' + UI.esc(label("moreDetailFeatures")) + "</p>" + features
            : "") +
        "</div>" +
      "</details></section>";
  }

  /* No story, no band. A section whose only content is "nothing to show yet"
     is worse than its absence on a page a seller demos live. The numbers stay
     in the metric tiles above; the card carries the narrative and the link. */
  function successStory(product) {
    var UI = window.UI;
    var story = product.overview.successStory;
    var conf = cfg(product.slug);
    if (!story || !story.blurb) return "";

    return '<section class="panel panel--flat reveal">' +
      '<div class="story-band story-band--single">' +
        '<div class="story-band-copy">' +
          '<p class="band-label">' + UI.esc(story.title) + "</p>" +
          '<p class="band-body">' + UI.esc(story.blurb) + "</p>" +
          (story.scopeLine ? '<p class="band-scope">' + UI.esc(story.scopeLine) + "</p>" : "") +
          (conf.successStoryUrl
            ? UI.button({
                label: "Open the success story", href: conf.successStoryUrl,
                kind: "dark", iconAfter: "external"
              })
            : "") +
        "</div>" +
      "</div></section>";
  }

  function overviewTab(product) {
    var o = product.overview;
    return [
      problemSolution(o.problemSolution),
      metricTiles(o),
      calloutBand(o.roi && o.roi.icon, label("roi"), o.roi && o.roi.text),
      featuresBlock(o),
      industriesBlock(o),
      scopeBlock(o),
      moreDetail(o),
      successStory(product)
    ].join("");
  }

  /* ————— tab: technology ————— */

  function flowDiagram(tech) {
    var UI = window.UI;
    if (!tech.flow || !tech.flow.length) return "";
    var steps = tech.flow.map(function (step, index) {
      return '<li class="flow-step">' +
        '<span class="flow-index nums">' + UI.esc(index + 1) + "</span>" +
        '<p class="flow-name">' + UI.esc(step.step) + "</p>" +
        '<p class="flow-label">' + UI.esc(step.label) + "</p>" +
        "</li>";
    }).join("");
    return '<section class="panel reveal">' + blockHead(label("flow")) +
      '<ol class="flow">' + steps + "</ol></section>";
  }

  function componentGroup(group) {
    var UI = window.UI;
    var mark = VENDOR_MARK[group.vendor];
    return '<div class="component-group">' +
      '<div class="component-head">' +
        '<p class="component-name">' + UI.esc(group.label) + "</p>" +
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
      ? '<section class="panel reveal">' + blockHead(label("stack")) +
          '<div class="layer-table">' + tech.layers.map(function (layer) {
            return '<div class="layer-row">' +
              '<p class="layer-name">' + UI.esc(layer.layer) + "</p>" +
              '<p class="layer-by">' + UI.esc(layer.providedBy) + "</p>" +
              '<p class="layer-body">' + UI.esc(layer.body) + "</p>" +
              "</div>";
          }).join("") + "</div></section>"
      : "";

    var notUsed = tech.notUsed && tech.notUsed.length
      ? '<p class="footnote component-notused">' +
        UI.esc(label("notUsed") + ": " + tech.notUsed.join(" · ")) + "</p>"
      : "";

    return mediaRow(product.slug, blockHead(label("architecture")) +
        '<p class="lead">' + UI.esc(tech.narrative) + "</p>", true) +
      flowDiagram(tech) +
      '<section class="panel reveal">' + blockHead(label("components")) +
        '<div class="component-grid">' + tech.groups.map(componentGroup).join("") + "</div>" +
        notUsed +
      "</section>" +
      layers +
      (tech.governance
        ? calloutBand("shield", tech.governance.title, tech.governance.body)
        : "") +
      '<section class="panel reveal"><div class="scope-grid">' +
        '<div class="scope-col">' +
          '<p class="eyebrow eyebrow--accent">' + UI.esc(label("integration")) + "</p>" +
          iconList(tech.integration) +
        "</div>" +
        '<div class="scope-col">' +
          '<p class="eyebrow eyebrow--accent">' + UI.esc(label("security")) + "</p>" +
          iconList(tech.security) +
        "</div>" +
      "</div></section>";
  }

  /* ————— tab: POV Jumpstart ————— */

  function factStrip(pov) {
    var UI = window.UI;
    var facts = pov.facts;
    if (!facts) return "";
    var cells = [
      { label: label("povFactDuration"), value: facts.duration },
      { label: label("povFactTeam"), value: facts.team },
      { label: label("povFactPrice"), value: facts.price },
      { label: label("povFactDeliverables"), value: String(facts.deliverablesCount) }
    ].map(function (cell) {
      return '<div class="fact-tile">' +
        '<p class="fact-tile-value">' + UI.esc(cell.value) + "</p>" +
        '<p class="fact-tile-label">' + UI.esc(cell.label) + "</p>" +
        "</div>";
    }).join("");
    return '<div class="fact-strip">' + cells + "</div>";
  }

  function povDetailRows(pov) {
    var UI = window.UI;
    var rows = [
      pov.inScope ? { label: label("povScopeIn"), value: pov.inScope } : null,
      pov.notInScope ? { label: label("povScopeOut"), value: pov.notInScope } : null,
      pov.thenRollout ? { label: label("povRollout"), value: pov.thenRollout } : null,
      pov.phases ? { label: label("povPhases"), value: pov.phases } : null,
      pov.howMeasured ? { label: label("povMeasured"), value: pov.howMeasured } : null
    ].filter(Boolean);
    if (!rows.length) return "";
    var notes = [pov.durationNote, pov.gateNote].filter(Boolean).map(function (note) {
      return '<p class="footnote">' + UI.esc(note) + "</p>";
    }).join("");
    return '<dl class="metric-rows">' + rows.map(function (row) {
      return '<div class="metric-row"><dt>' + UI.esc(row.label) + "</dt><dd>" +
        UI.esc(row.value) + "</dd></div>";
    }).join("") + "</dl>" + notes;
  }

  function ladder(product) {
    var UI = window.UI;
    var columns = C().shared.ladderColumns;
    var cards = product.pov.ladder.map(function (tier, index) {
      var tierLabel = columns[index] && columns[index] !== tier.title
        ? columns[index] : "Step " + (index + 1);
      return '<article class="tier">' +
        '<div class="tier-body">' +
          '<p class="eyebrow' + (index === 0 ? " eyebrow--accent" : "") + '">' +
            UI.esc(tierLabel) + "</p>" +
          '<h3 class="tier-title">' + UI.esc(tier.title) + "</h3>" +
          '<p class="tier-scope">' + UI.esc(tier.scope) + "</p>" +
          bulletList(tier.includes, "tier-list") +
        "</div>" +
        '<div class="tier-foot">' +
          '<p class="tier-label">Duration</p><p class="tier-value">' + UI.esc(tier.duration) + "</p>" +
          '<p class="tier-label">Pricing</p><p class="tier-value">' + UI.esc(tier.pricing) + "</p>" +
        "</div>" +
        "</article>";
    }).join("");
    return '<section class="panel reveal">' + blockHead(label("ladder")) +
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
    return '<div class="table-scroll"><table class="matrix"><thead>' + head + "</thead><tbody>" + rows +
      "</tbody></table></div>" +
      '<p class="footnote">' + UI.esc(matrix.legend) + "</p>";
  }

  function stepList(block) {
    var UI = window.UI;
    return '<ol class="step-list">' + block.steps.map(function (step, index) {
      return '<li class="step"><span class="step-index nums">' + (index + 1) + "</span>" +
        '<div><p class="step-title">' + UI.esc(step.title) + "</p>" +
        '<p class="step-body">' + UI.esc(step.body) + "</p></div></li>";
    }).join("") + "</ol>" +
      (block.closing ? '<p class="body-text panel-extra">' + UI.esc(block.closing) + "</p>" : "");
  }

  /* Everything a POV carries beyond the four canonical blocks lives here, so
     the tab has the same shape on every product and a seller can flip between
     them without the page moving underneath the customer. */
  function povMoreDetail(pov) {
    var UI = window.UI;
    var parts = [];

    function push(title, body) {
      if (!body) return;
      parts.push('<p class="eyebrow detail-sub">' + UI.esc(title) + "</p>" + body);
    }

    if (pov.statStrip) parts.push('<p class="value-strip">' + UI.esc(pov.statStrip) + "</p>");
    parts.push(povDetailRows(pov));
    if (pov.statNotes) push(label("terms"), defGrid(pov.statNotes, "3"));
    if (pov.prerequisites) push(pov.prerequisites.title, plainList(pov.prerequisites.items));
    if (pov.howItRuns) push(pov.howItRuns.title, stepList(pov.howItRuns));
    if (pov.capabilityMatrix) push(label("matrix"), capabilityMatrix(pov.capabilityMatrix));

    var body = parts.filter(Boolean).join("");
    if (!body) return "";
    return '<section class="panel panel--flat reveal">' +
      '<details class="disclosure disclosure--detail">' +
        "<summary><span>" + UI.esc(label("moreDetail")) + "</span>" + UI.icon("chevronDown") + "</summary>" +
        '<div class="detail-wrap detail-wrap--stack">' + body + "</div>" +
      "</details></section>";
  }

  function povTab(product) {
    var UI = window.UI;
    var pov = product.pov;

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

    return '<section class="panel reveal">' + blockHead(label("povHeading")) +
        '<p class="lead">' + UI.esc(pov.scope) + "</p>" +
        factStrip(pov) +
      "</section>" +
      '<section class="panel reveal">' + blockHead(label("deliverables")) +
        bulletList(pov.deliverables) + "</section>" +
      '<section class="panel reveal">' + blockHead(label("pricing")) + pricing + "</section>" +
      ladder(product) +
      povMoreDetail(pov) +
      '<section class="panel reveal gate-note">' + blockHead(C().shared.preFlightGate.title) +
        '<p class="body-text">' + UI.esc(C().shared.preFlightGate.body) + "</p></section>" +
      '<section class="panel reveal">' + blockHead(credibility.heading) +
        defGrid(credibility.items, "4") + "</section>" +
      '<section class="panel panel--flat reveal">' +
        '<div class="cta-row">' +
          UI.button({
            label: C().site.primaryCta.label,
            href: "#/products/" + product.slug + "/demo",
            kind: "primary"
          }) +
        "</div>" +
        '<p class="panel-link">' + UI.linkArrow({
          label: C().shared.engageLink.label, href: C().shared.engageLink.route
        }) + "</p>" +
      "</section>";
  }

  /* ————— tab: request a demo ————— */

  function engagementSteps() {
    var UI = window.UI;
    var block = C().forms.engagementSteps;
    if (!block) return "";
    var steps = block.steps.map(function (step, index) {
      return '<li class="next-step">' +
        '<span class="next-step-index nums">' + (index + 1) + "</span>" +
        "<div>" +
          '<p class="next-step-title">' + UI.esc(step.title) + "</p>" +
          '<p class="next-step-body">' + UI.esc(step.body) + "</p>" +
        "</div></li>";
    }).join("");
    return '<div class="next-block">' +
      '<p class="eyebrow eyebrow--accent">' + UI.esc(block.title) + "</p>" +
      '<ol class="next-list">' + steps + "</ol>" +
      (block.responseLine ? '<p class="next-response">' + UI.esc(block.responseLine) + "</p>" : "") +
      "</div>";
  }

  function demoTab(product) {
    var UI = window.UI;
    if (!window.FORMS) return UI.empty(C().forms.demo.sub);
    var steps = engagementSteps();
    if (!steps) {
      return '<section class="panel panel--form reveal" id="product-demo-form">' +
        window.FORMS.render("demo", { product: product.slug }) + "</section>";
    }
    return '<section class="panel reveal">' +
      '<div class="demo-split">' +
        '<div class="demo-aside">' +
          blockHead(C().forms.demo.heading) +
          '<p class="body-text">' + UI.esc(C().forms.demo.sub) + "</p>" +
          steps +
        "</div>" +
        '<div class="panel--form" id="product-demo-form">' +
          window.FORMS.render("demo", { product: product.slug, heading: false }) +
        "</div>" +
      "</div></section>";
  }

  /* ————— tab: for sellers ————— */

  function gateUnlocked() {
    try {
      try { return window.localStorage.getItem(window.SITE_CONFIG.sellerGate.storageKey) === "1"; } catch (error) { return false; }
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
      ? UI.button({ label: gate.downloadLabel, href: url, kind: "secondary", sm: true, iconAfter: "external" })
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

  function loadSellerNotes(root, product) {
    var slot = root.querySelector("#seller-notes");
    var url = window.SITE_CONFIG.sellerGate.notesUrl;
    if (!slot || !url || typeof window.fetch !== "function") return;
    window.fetch(url, { credentials: "same-origin" }).then(function (response) {
      return response.ok ? response.json() : null;
    }).then(function (data) {
      if (!data) return;
      var lines = (data.products && data.products[product.slug]) || [];
      if (printsPrice(product)) lines = lines.concat(data.packagingNotes || []);
      if (!lines.length) return;
      slot.innerHTML = blockHead(C().sellerGate.notesHeading) + plainList(lines);
      slot.hidden = false;
    }).catch(function () { /* no notes available to this reader */ });
  }

  function sellerCtaBody(product) {
    var gate = C().sellerGate;
    var duration = product.pov && product.pov.durationShort;
    if (!duration) return gate.cta.bodyFallback || gate.cta.body;
    return gate.cta.body.replace("{duration}", duration);
  }

  function stateLegend(product) {
    var UI = window.UI;
    var legend = C().sellerGate.stateLegend || {};
    var seen = [];
    product.sellers.materials.forEach(function (material) {
      var url = (cfg(product.slug).materials || {})[material.key] || "";
      var state = url && material.state !== "superseded" ? "available" : material.state;
      if (legend[state] && seen.indexOf(legend[state]) < 0) seen.push(legend[state]);
    });
    return seen.length ? '<p class="footnote">' + UI.esc(seen.join(" · ")) + "</p>" : "";
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

    var notes = '<section class="panel reveal" id="seller-notes" hidden></section>';

    return '<section class="panel reveal" id="seller-panel">' +
        '<div class="gate-bar">' +
          '<p class="footnote">' + UI.esc(gate.accessNote) + "</p>" +
          UI.button({ label: gate.lockLabel, kind: "quiet", sm: true, icon: "lock", attrs: { id: "gate-lock" } }) +
        "</div>" +
        blockHead(gate.heading) +
        '<p class="body-text">' + UI.esc(gate.unlockedIntro) + "</p>" +
        (allLocked && product.sellers.emptyPanelCopy
          ? '<p class="body-text panel-extra">' + UI.esc(product.sellers.emptyPanelCopy) + "</p>" : "") +
        stateLegend(product) +
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
      '<section class="section section--tight section--tabs"><div class="wrap tab-body' +
        (active === "overview" ? " tab-body--compact" : "") + '" id="tab-body">' +
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
          window.FORMS.render("demo", { product: item.slug, role: "oracle-seller" }),
          { label: C().forms.demo.heading }
        );
        var panel = document.querySelector(".modal-panel");
        if (panel) window.FORMS.mount(panel, "demo");
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
          '<div class="video-wrap">' + embed + "</div>",
          { label: title, className: "modal-panel--media" });
      });
    });
  }

  /* A frame with no file behind it still has to answer the click honestly:
     name the product, say the recording is not ready, and hand over the one
     thing that is — a live demo. */
  function bindPendingVideo(root, item) {
    var UI = window.UI;
    var pending = C().shared.videoPending;
    Array.prototype.forEach.call(root.querySelectorAll("[data-video-pending]"), function (button) {
      button.addEventListener("click", function () {
        var panel = UI.modal.open('<h2 class="h3 modal-title">' + UI.esc(item.name) + "</h2>" +
          '<p class="body-text">' + UI.esc(pending.body) + "</p>" +
          '<div class="cta-row modal-cta">' + UI.button({
            label: pending.cta,
            href: "#/products/" + item.slug + "/demo",
            kind: "primary"
          }) + "</div>",
          { label: item.name, className: "modal-panel--note" });
        var cta = panel.querySelector(".modal-cta a");
        if (cta) cta.addEventListener("click", function () { UI.modal.close(); });
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
    bindPendingVideo(root, item);

    if (active === "sellers" && gateUnlocked()) loadSellerNotes(root, item);

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
