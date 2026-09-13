(function () {
  "use strict";

  window.PAGES = window.PAGES || {};

  function hero(C) {
    var UI = window.UI;
    var h = C.overview.hero;
    var ctas = h.ctas.map(function (cta) {
      return UI.button({ label: cta.label, href: cta.route, kind: cta.kind === "primary" ? "primary" : "secondary" });
    }).join("");
    var stats = h.stats.map(function (stat) {
      return '<li class="stat">' +
        '<p class="stat-value nums">' + UI.esc(stat.value) + "</p>" +
        '<p class="stat-label">' + UI.esc(stat.label) + "</p>" +
        "</li>";
    }).join("");

    return '<section class="hero">' +
      '<span class="hero-glow" aria-hidden="true"></span>' +
      '<img class="hero-sphere" src="assets/img/sphere.webp" alt="" aria-hidden="true" loading="eager" decoding="async">' +
      '<div class="wrap hero-inner">' +
        '<p class="eyebrow">' + UI.esc(C.site.owner) + " · " + UI.esc(C.site.tagline) + "</p>" +
        UI.headline(h.headline, "h1", "h1 hero-title") +
        '<p class="lead hero-lead">' + UI.esc(h.subhead) + "</p>" +
        '<div class="cta-row hero-cta">' + ctas + "</div>" +
        '<ul class="stat-row">' + stats + "</ul>" +
      "</div>" +
      "</section>";
  }

  function trustStrip(C) {
    var UI = window.UI;
    var strip = C.overview.trustStrip;
    var logos = strip.logos.map(function (logo) {
      var big = logo.name === "Oracle" ? " logo-strip-lg" : "";
      return '<img class="logo' + big + '" src="' + UI.esc(logo.file) + '" alt="' + UI.esc(logo.name) + '">';
    }).join("");
    return '<section class="section section--tight">' +
      '<div class="wrap">' +
        UI.divider(strip.dividerLabel, true) +
        '<div class="logo-strip">' + logos + "</div>" +
      "</div></section>";
  }

  function products(C) {
    var UI = window.UI;
    var intro = C.overview.productsIntro;
    var tiles = C.products.map(function (product) { return UI.card(product); }).join("");
    return '<section class="section" id="products">' +
      '<div class="wrap">' +
        UI.sectionHead({ title: intro.title, count: intro.count, link: { label: intro.cta.label, href: intro.cta.route } }) +
        '<p class="lead" style="margin-bottom:3rem">' + UI.esc(intro.body) + "</p>" +
        '<div class="tile-grid">' + tiles + "</div>" +
      "</div></section>";
  }

  function metricBlock(item) {
    var UI = window.UI;
    if (!item.metrics || !item.metrics.length) return "";
    var cells = item.metrics.map(function (metric) {
      return '<div class="metric">' +
        '<p class="metric-value nums">' + UI.esc(metric.value) + "</p>" +
        '<p class="metric-label">' + UI.esc(metric.label) + "</p>" +
        "</div>";
    }).join("");
    var notes = (item.footnotes || []).map(function (note) {
      return '<p class="footnote">' + UI.esc(note) + "</p>";
    }).join("");
    return '<div class="proof-metrics">' + cells +
      (notes ? '<div class="proof-footnotes">' + notes + "</div>" : "") + "</div>";
  }

  function proofRow(item, index) {
    var UI = window.UI;
    var reverse = index % 2 === 1;
    var copy = '<div class="proof-copy">' +
      '<p class="eyebrow eyebrow--accent">' + UI.esc(item.label) + "</p>" +
      (item.customer ? '<h3 class="proof-customer">' + UI.esc(item.customer) + "</h3>" : "") +
      (item.industry ? '<p class="proof-industry">' + UI.esc(item.industry) + "</p>" : "") +
      '<p class="body-text">' + UI.esc(item.body) + "</p>" +
      (item.scopeLine ? '<p class="proof-scope">' + UI.esc(item.scopeLine) + "</p>" : "") +
      (item.product ? '<p>' + UI.linkArrow({ label: item.product.name, href: "#/products/" + item.product.slug }) + "</p>" : "") +
      "</div>";
    return '<article class="proof-row reveal' + (reverse ? " proof-row--reverse" : "") + '">' +
      copy + metricBlock(item) + "</article>";
  }

  function noteCard(item) {
    var UI = window.UI;
    var title = item.title || item.industry || "";
    return '<article class="note-card reveal">' +
      '<p class="eyebrow eyebrow--accent">' + UI.esc(item.label) + "</p>" +
      (title ? '<h3 class="note-title">' + UI.esc(title) + "</h3>" : "") +
      '<p class="note-body">' + UI.esc(item.body) + "</p>" +
      (item.product ? '<p>' + UI.linkArrow({ label: item.product.name, href: "#/products/" + item.product.slug }) + "</p>" : "") +
      "</article>";
  }

  function evidence(C) {
    var UI = window.UI;
    var intro = C.overview.evidenceIntro;
    var bandOne = C.overview.evidence.filter(function (item) { return item.band === 1; });
    var bandTwo = C.overview.evidence.filter(function (item) { return item.band === 2; });
    var rows = bandOne.length
      ? bandOne.map(proofRow).join("")
      : UI.empty(intro.body);

    return '<section class="section" id="proof">' +
      '<div class="wrap">' +
        UI.divider(C.site.dividerLabels.proof) +
        '<div class="section-head" style="margin-top:2.5rem">' +
          '<h2 class="h2">' + UI.esc(intro.title) + "</h2>" +
        "</div>" +
        '<p class="lead" style="margin-bottom:2rem">' + UI.esc(intro.body) + "</p>" +
        rows +
        (bandTwo.length ? '<div class="note-grid">' + bandTwo.map(noteCard).join("") + "</div>" : "") +
      "</div></section>";
  }

  function servicesTeaser(C) {
    var UI = window.UI;
    var teaser = C.overview.servicesTeaser;
    var platforms = teaser.platforms.map(function (platform) {
      return '<li class="platform-item">' +
        '<p class="platform-name">' + UI.esc(platform.name) + "</p>" +
        '<p class="platform-body">' + UI.esc(platform.body) + "</p>" +
        "</li>";
    }).join("");

    return '<section class="section" id="practice">' +
      '<div class="wrap">' +
        UI.divider(C.site.dividerLabels.howWeEngage) +
        '<div class="light-band reveal" style="margin-top:2.5rem">' +
          '<div class="light-band-media">' +
            '<p class="band-label">Oracle platforms we focus on</p>' +
            '<ul class="platform-list">' + platforms + "</ul>" +
          "</div>" +
          '<div class="light-band-copy">' +
            '<h2 class="band-title">' + UI.esc(teaser.title) + "</h2>" +
            '<p class="band-body">' + UI.esc(teaser.body) + "</p>" +
            '<p class="band-body">' + UI.esc(teaser.secondParagraph) + "</p>" +
            UI.button({ label: teaser.cta.label.replace(/\s*→\s*$/, ""), href: teaser.cta.route, kind: "dark", iconAfter: "arrow" }) +
          "</div>" +
        "</div>" +
      "</div></section>";
  }

  function closing(C) {
    var UI = window.UI;
    var demo = C.forms.demo;
    return '<section class="closing" id="' + UI.esc(demo.anchor) + '">' +
      '<div class="wrap closing-inner">' +
        "<div>" +
          '<h2 class="h2">' + UI.esc(demo.heading) + "</h2>" +
          '<p class="lead" style="margin-top:1.25rem">' + UI.esc(demo.sub) + "</p>" +
        "</div>" +
        '<div id="demo-form-slot">' +
          '<div class="cta-row">' +
            UI.button({ label: demo.submitLabel, href: "#/services#" + C.forms.contact.anchor, kind: "primary" }) +
            UI.button({ label: C.overview.hero.ctas[1].label, href: C.overview.hero.ctas[1].route, kind: "quiet" }) +
          "</div>" +
        "</div>" +
      "</div></section>";
  }

  function overview() {
    var C = window.SITE_CONTENT;
    return hero(C) + trustStrip(C) + products(C) + evidence(C) + servicesTeaser(C) + closing(C);
  }

  overview.mount = function (params, root) {
    var slot = root.querySelector("#demo-form-slot");
    if (slot && window.FORMS && typeof window.FORMS.render === "function") {
      slot.innerHTML = window.FORMS.render("demo");
      if (typeof window.FORMS.mount === "function") window.FORMS.mount(slot, "demo");
    }
  };

  overview.title = function () { return window.SITE_CONTENT.site.title; };

  window.PAGES.overview = overview;
})();
