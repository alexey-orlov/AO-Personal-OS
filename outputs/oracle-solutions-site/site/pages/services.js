(function () {
  "use strict";

  window.PAGES = window.PAGES || {};

  function C() { return window.SITE_CONTENT; }

  function divider(label, title) {
    var same = String(label || "").trim().toLowerCase() === String(title || "").trim().toLowerCase();
    return same ? "" : window.UI.divider(label);
  }

  function blockHead(title) {
    return '<h2 class="h3 block-title">' + window.UI.esc(title) + "</h2>";
  }

  function dashList(items) {
    var UI = window.UI;
    return '<ul class="dash-list">' + items.map(function (item) {
      return "<li>" + UI.esc(item) + "</li>";
    }).join("") + "</ul>";
  }

  /* ————— hero ————— */

  function hero(content) {
    var UI = window.UI;
    var h = content.services.hero;
    var stats = (h.stats || []).map(function (stat) {
      return '<li class="stat">' +
        '<p class="stat-value nums">' + UI.esc(stat.value) + "</p>" +
        '<p class="stat-label">' + UI.esc(stat.label) + "</p>" +
        "</li>";
    }).join("");

    return '<section class="product-hero services-hero has-hero-bg">' +
      UI.heroBackdrop(h.image) +
      '<span class="hero-glow" aria-hidden="true"></span>' +
      '<div class="wrap product-hero-inner product-hero-inner--single">' +
        '<p class="eyebrow">' + UI.esc(content.site.owner) + " · Services</p>" +
        UI.headline(h.headline, "h1", "h1 product-title services-title") +
        '<p class="lead product-lead">' + UI.esc(h.lead) + "</p>" +
        '<p class="body-text product-subline">' + UI.esc(h.secondParagraph) + "</p>" +
        '<div class="cta-row product-hero-cta">' +
          UI.button({ label: h.cta.label, href: h.cta.route, kind: "primary" }) +
          UI.button({
            label: content.overview.hero.ctas[1].label,
            href: content.overview.hero.ctas[1].route,
            kind: "quiet", iconAfter: "arrow"
          }) +
        "</div>" +
        (stats ? '<ul class="stat-row services-stats">' + stats + "</ul>" : "") +
      "</div></section>";
  }

  /* ————— platforms ————— */

  function platforms(content) {
    var UI = window.UI;
    var h = content.services.hero;
    var cards = h.platforms.map(function (platform) {
      return '<article class="plat-card reveal">' +
        '<p class="eyebrow eyebrow--accent">' + UI.esc(platform.short) + "</p>" +
        '<h3 class="plat-name">' + UI.esc(platform.name) + "</h3>" +
        '<p class="plat-body">' + UI.esc(platform.long) + "</p>" +
        "</article>";
    }).join("");

    return '<section class="section section--tight" id="platforms"><div class="wrap">' +
      divider(content.site.dividerLabels.builtOn, h.platformsTitle) +
      '<h2 class="h2 plat-title">' + UI.esc(h.platformsTitle) + "</h2>" +
      '<div class="plat-grid">' + cards + "</div>" +
      "</div></section>";
  }

  /* ————— what we do ————— */

  function layerStack(items) {
    var UI = window.UI;
    return '<div class="layer-stack reveal">' + items.map(function (item, index) {
      return '<div class="layer-band' + (index === 0 ? " layer-band--lead" : "") + '">' +
        '<p class="layer-band-label">' + UI.esc(item.band) + "</p>" +
        '<p class="layer-band-body">' + UI.esc(item.body) + "</p>" +
        "</div>";
    }).join("") + "</div>";
  }

  function whatWeDo(content) {
    var UI = window.UI;
    var w = content.services.whatWeDo;

    var families = '<div class="chip-row family-row">' + w.families.map(function (family) {
      return UI.chip({ label: family });
    }).join("") + "</div>";

    var stack = '<div class="layer-table layer-table--duo">' + w.solutionStack.layers.map(function (layer) {
      return '<div class="layer-row">' +
        '<p class="layer-name">' + UI.esc(layer.layer) + "</p>" +
        '<p class="layer-by">' + UI.esc(layer.providedBy) + "</p>" +
        "</div>";
    }).join("") + "</div>";

    var teams = '<div class="split-two reveal">' +
      '<div class="split-col split-col--accent">' +
        '<p class="eyebrow eyebrow--accent">' + UI.esc(w.whoYouWorkWith.title) + "</p>" +
        '<p class="body-text">' + UI.esc(w.whoYouWorkWith.body) + "</p>" +
      "</div>" +
      '<div class="split-col">' +
        '<p class="eyebrow eyebrow--accent">' + UI.esc(w.whoDeliversIt.title) + "</p>" +
        '<p class="body-text">' + UI.esc(w.whoDeliversIt.body) + "</p>" +
      "</div></div>";

    return '<section class="section" id="what-we-do"><div class="wrap stack-lg">' +
      "<div>" +
        UI.sectionHead({ title: w.title }) +
        '<p class="lead services-lead">' + UI.esc(w.lead) + "</p>" +
      "</div>" +
      layerStack(w.layering) +
      '<section class="panel reveal">' +
        blockHead(w.familiesTitle) + families +
        '<p class="footnote">' + UI.esc(w.familiesSuffix) + "</p>" +
      "</section>" +
      '<section class="panel reveal">' + blockHead(w.solutionStack.title) + stack + "</section>" +
      teams +
      "</div></section>";
  }

  /* ————— wrap-around services (the one light band) ————— */

  function wrapAround(content) {
    var UI = window.UI;
    var w = content.services.whatWeDo;
    var items = w.wrapAroundServices.items.map(function (item) {
      return '<li class="platform-item">' +
        '<p class="platform-name">' + UI.esc(item.title) + "</p>" +
        '<p class="platform-body">' + UI.esc(item.body) + "</p>" +
        "</li>";
    }).join("");

    return '<section class="section section--tight" id="wrap-around"><div class="wrap">' +
      '<div class="light-band reveal">' +
        '<div class="light-band-media">' +
          '<p class="band-label">' + UI.esc(w.wrapAroundServices.title) + "</p>" +
          '<ul class="platform-list">' + items + "</ul>" +
        "</div>" +
        '<div class="light-band-copy">' +
          '<h2 class="band-title">' + UI.esc(w.attachesToEvery.title) + "</h2>" +
          '<p class="band-body">' + UI.esc(w.attachesToEvery.body) + "</p>" +
          UI.button({
            label: content.services.hero.cta.label,
            href: content.services.hero.cta.route,
            kind: "dark", iconAfter: "arrow"
          }) +
        "</div>" +
      "</div></div></section>";
  }

  /* ————— how we engage ————— */

  function ladder(engage) {
    var UI = window.UI;
    var columns = C().shared.ladderColumns;
    var cards = engage.ladder.map(function (tier, index) {
      var label = columns[index] && columns[index] !== tier.title
        ? columns[index] : "Step " + (index + 1);
      return '<article class="tier ladder-step">' +
        '<div class="tier-body">' +
          '<span class="ladder-mark" aria-hidden="true"><span class="ladder-dot"></span></span>' +
          '<p class="eyebrow' + (index === 0 ? " eyebrow--accent" : "") + '">' +
            UI.esc(label) + "</p>" +
          '<h3 class="tier-title">' + UI.esc(tier.title) + "</h3>" +
          '<p class="tier-scope">' + UI.esc(tier.whatItIs) + "</p>" +
        "</div>" +
        '<div class="tier-foot">' +
          '<p class="tier-label">Duration</p><p class="tier-value">' + UI.esc(tier.duration) + "</p>" +
          '<p class="tier-label">Pricing</p><p class="tier-value">' + UI.esc(tier.pricing) + "</p>" +
        "</div>" +
        "</article>";
    }).join("");
    return '<div class="tier-grid ladder-track reveal">' + cards + "</div>";
  }

  function howWeEngage(content) {
    var UI = window.UI;
    var engage = content.services.howWeEngage;

    var steps = '<ol class="step-list">' + engage.howAPovRuns.steps.map(function (step, index) {
      return '<li class="step"><span class="step-index nums">' + (index + 1) + "</span>" +
        '<div><p class="step-title">' + UI.esc(step.title) + "</p>" +
        '<p class="step-body">' + UI.esc(step.body) + "</p></div></li>";
    }).join("") + "</ol>";

    return '<section class="section" id="' + UI.esc(engage.anchor) + '"><div class="wrap stack-lg">' +
      "<div>" +
        divider(content.site.dividerLabels.howWeEngage, engage.title) +
        '<div class="section-head services-head"><h2 class="h2">' + UI.esc(engage.title) + "</h2></div>" +
        '<p class="lead services-lead">' + UI.esc(engage.lead) + "</p>" +
      "</div>" +
      ladder(engage) +
      '<div class="ladder-notes">' +
        dashList(engage.ladderRules) +
        '<p class="footnote">' + UI.esc(engage.ladderFootnote) + "</p>" +
      "</div>" +
      '<section class="panel reveal">' +
        blockHead(engage.howAPovRuns.title) + steps +
        '<p class="body-text panel-extra">' + UI.esc(engage.howAPovRuns.closing) + "</p>" +
      "</section>" +
      "</div></section>";
  }

  /* ————— why softserve ————— */

  function whySoftServe(content) {
    var UI = window.UI;
    var why = content.services.whySoftServe;
    var items = why.items.map(function (item) {
      return '<article class="def reveal">' +
        '<h3 class="def-title">' + UI.esc(item.title) + "</h3>" +
        '<p class="def-body">' + UI.esc(item.body) + "</p>" +
        "</article>";
    }).join("");

    return '<section class="section section--tight" id="why-softserve"><div class="wrap">' +
      UI.sectionHead({ title: why.title }) +
      '<div class="def-grid why-grid">' + items + "</div>" +
      "</div></section>";
  }

  /* ————— proof ————— */

  function evidenceById(content, id) {
    var list = content.overview.evidence;
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function briefCard(item) {
    var UI = window.UI;
    var metrics = (item.metrics || []).map(function (metric) {
      return '<div class="brief-metric">' +
        '<p class="brief-value nums">' + UI.esc(metric.value) + "</p>" +
        '<p class="brief-label">' + UI.esc(metric.label) + "</p>" +
        "</div>";
    }).join("");
    var notes = (item.footnotes || []).map(function (note) {
      return '<p class="footnote">' + UI.esc(note) + "</p>";
    }).join("");

    return '<article class="brief reveal">' +
      '<p class="eyebrow eyebrow--accent">' + UI.esc(item.label) + "</p>" +
      (item.customer ? '<h3 class="brief-title">' + UI.esc(item.customer) + "</h3>" : "") +
      (item.industry ? '<p class="brief-industry">' + UI.esc(item.industry) + "</p>" : "") +
      '<p class="brief-body">' + UI.esc(item.body) + "</p>" +
      (metrics ? '<div class="brief-metrics">' + metrics + "</div>" : "") +
      (item.scopeLine ? '<p class="footnote">' + UI.esc(item.scopeLine) + "</p>" : "") +
      (notes ? '<div class="brief-notes">' + notes + "</div>" : "") +
      (item.product
        ? '<p class="brief-link">' + UI.linkArrow({
            label: item.product.name, href: "#/products/" + item.product.slug
          }) + "</p>"
        : "") +
      "</article>";
  }

  function noteCard(item) {
    var UI = window.UI;
    var title = item.title || item.industry || "";
    return '<article class="note-card reveal">' +
      '<p class="eyebrow eyebrow--accent">' + UI.esc(item.label) + "</p>" +
      (title ? '<h3 class="note-title">' + UI.esc(title) + "</h3>" : "") +
      '<p class="note-body">' + UI.esc(item.body) + "</p>" +
      (item.product
        ? "<p>" + UI.linkArrow({ label: item.product.name, href: "#/products/" + item.product.slug }) + "</p>"
        : "") +
      "</article>";
  }

  function proof(content) {
    var UI = window.UI;
    var block = content.services.proof;
    var items = block.evidenceIds.map(function (id) {
      return evidenceById(content, id);
    }).filter(Boolean);
    var briefs = items.filter(function (item) { return item.metrics && item.metrics.length; });
    var notes = items.filter(function (item) { return !(item.metrics && item.metrics.length); });

    var body = items.length
      ? (briefs.length ? '<div class="brief-grid">' + briefs.map(briefCard).join("") + "</div>" : "") +
        (notes.length ? '<div class="note-grid">' + notes.map(noteCard).join("") + "</div>" : "")
      : UI.empty("Proof points are published once a customer clears them.");

    return '<section class="section" id="proof"><div class="wrap">' +
      divider(block.dividerLabel, block.title) +
      '<div class="section-head services-head"><h2 class="h2">' + UI.esc(block.title) + "</h2></div>" +
      body +
      "</div></section>";
  }

  /* ————— contact ————— */

  function engagementSteps(content) {
    var UI = window.UI;
    var block = content.forms.engagementSteps;
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

  function contact(content) {
    var UI = window.UI;
    var form = content.forms.contact;
    return '<section class="closing" id="' + UI.esc(form.anchor) + '">' +
      '<div class="wrap contact-band">' +
        '<div class="contact-copy">' +
          '<h2 class="h2">' + UI.esc(content.services.contact.heading) + "</h2>" +
          '<p class="lead">' + UI.esc(content.services.contact.sub) + "</p>" +
          engagementSteps(content) +
        "</div>" +
        '<div class="contact-form" id="contact-form-slot">' +
          (window.FORMS && typeof window.FORMS.render === "function"
            ? window.FORMS.render("contact", { heading: false })
            : '<div class="cta-row">' +
                UI.button({ label: content.services.hero.cta.label, href: "#/products", kind: "primary" }) +
              "</div>") +
        "</div>" +
      "</div></section>";
  }

  /* ————— page ————— */

  function services() {
    var content = C();
    return hero(content) + platforms(content) + whatWeDo(content) + wrapAround(content) +
      howWeEngage(content) + whySoftServe(content) + proof(content) + contact(content);
  }

  services.mount = function (params, root) {
    var slot = root.querySelector("#contact-form-slot");
    if (slot && window.FORMS && typeof window.FORMS.mount === "function") {
      window.FORMS.mount(slot, "contact");
    }
  };

  services.title = function () {
    return "Services — " + C().site.title;
  };

  window.PAGES.services = services;
})();
