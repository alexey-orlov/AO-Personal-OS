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
      "</div></section>";
  }

  /* The stat row sits in the band under the hero, not inside the image block. */
  function statBand(content) {
    var UI = window.UI;
    var stats = (content.services.hero.stats || []).map(function (stat) {
      return '<li class="stat">' +
        '<p class="stat-value nums">' + UI.esc(stat.value) + "</p>" +
        '<p class="stat-label">' + UI.esc(stat.label) + "</p>" +
        "</li>";
    }).join("");
    if (!stats) return "";
    return '<section class="stat-band">' +
      '<div class="wrap"><ul class="stat-row stat-row--band services-stats">' + stats + "</ul></div>" +
      "</section>";
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

    /* Outlined, not the solid navy pill: the navy pill is the technology family
       (T1, "Runs on"), and an application family is the closer relative of the
       workflow-pattern chip. The tooltip names the family, as it does on the
       product pages. */
    var tip = w.familyTooltip;
    var families = '<div class="chip-row family-row">' + w.families.map(function (family) {
      return UI.chip({
        label: family,
        kind: "outline",
        className: "chip--tag",
        title: tip,
        attrs: { "aria-label": family + " — " + tip }
      });
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

  /* Services carries the method, not the outcomes: the same engagements the
     home page tells as case studies are compressed here to one line each —
     what is measured and against what — with the figures left on the Overview
     cards the closing link points back to. */
  function proof(content) {
    var UI = window.UI;
    var block = content.services.proof;

    var lines = (block.engagements || []).map(function (item) {
      return '<li class="method-item">' +
        '<p class="method-descriptor">' + UI.esc(item.descriptor) + "</p>" +
        '<p class="method-line">' + UI.esc(item.line) + "</p>" +
        (item.product
          ? '<p class="method-link">' + UI.linkArrow({
              label: item.product.name, href: "#/products/" + item.product.slug
            }) + "</p>"
          : "") +
        "</li>";
    }).join("");

    var stat = block.stat
      ? '<div class="method-stat">' +
          '<p class="method-stat-value nums">' + UI.esc(block.stat.value) + "</p>" +
          '<p class="method-stat-label">' + UI.esc(block.stat.label) + "</p>" +
        "</div>"
      : "";

    return '<section class="section" id="proof"><div class="wrap">' +
      divider(block.dividerLabel, block.title) +
      '<div class="section-head services-head"><h2 class="h2">' + UI.esc(block.title) + "</h2></div>" +
      '<div class="method-split">' +
        '<p class="body-text method-lead">' + UI.esc(block.lead) + "</p>" +
        stat +
      "</div>" +
      (lines
        ? '<section class="panel reveal method-panel">' +
            blockHead(block.engagementsTitle) +
            '<ul class="method-list">' + lines + "</ul>" +
          "</section>"
        : "") +
      (block.cta
        ? '<p class="panel-link">' + UI.linkArrow({ label: block.cta.label, href: block.cta.route }) + "</p>"
        : "") +
      (block.footnote
        ? '<p class="footnote case-method-note">' + UI.esc(block.footnote) + "</p>"
        : "") +
      "</div></section>";
  }

  /* ————— contact ————— */

  /* The same two-column component a product's Contacts tab renders, from the
     same object: the named human on the left, the form on the right. */
  function contact(content) {
    var UI = window.UI;
    var form = content.forms.contact;
    var body = window.FORMS && typeof window.FORMS.render === "function"
      ? '<div id="contact-form-slot">' + window.FORMS.render("contact", { heading: false }) + "</div>"
      : '<div class="cta-row">' +
          UI.button({ label: content.services.hero.cta.label, href: "#/products", kind: "primary" }) +
        "</div>";

    return '<section class="closing" id="' + UI.esc(form.anchor) + '">' +
      '<div class="wrap">' +
        '<div class="contact-head">' +
          '<h2 class="h2">' + UI.esc(content.services.contact.heading) + "</h2>" +
          '<p class="lead">' + UI.esc(content.services.contact.sub) + "</p>" +
        "</div>" +
        UI.contactSplit({
          cardHeading: UI.sectionLabel("contacts"),
          heading: content.forms.demo.secondaryHeading,
          sub: form.sub,
          form: body
        }) +
      "</div></section>";
  }

  /* ————— page ————— */

  function services() {
    var content = C();
    return hero(content) + statBand(content) + platforms(content) + whatWeDo(content) + wrapAround(content) +
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
