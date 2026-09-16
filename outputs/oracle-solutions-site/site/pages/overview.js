(function () {
  "use strict";

  window.PAGES = window.PAGES || {};

  function divider(label, title, center) {
    var same = String(label || "").trim().toLowerCase() === String(title || "").trim().toLowerCase();
    return same ? "" : window.UI.divider(label, center);
  }

  function hero(C) {
    var UI = window.UI;
    var h = C.overview.hero;
    var ctas = h.ctas.map(function (cta) {
      return UI.button({ label: cta.label, href: cta.route, kind: cta.kind === "primary" ? "primary" : "secondary" });
    }).join("");

    return '<section class="hero has-hero-bg">' +
      UI.heroBackdrop(h.image) +
      '<span class="hero-glow" aria-hidden="true"></span>' +
      '<div class="wrap hero-inner">' +
        '<p class="eyebrow">' + UI.esc(C.site.owner) + " · " + UI.esc(C.site.tagline) + "</p>" +
        UI.headline(h.headline, "h1", "h1 hero-title") +
        '<p class="lead hero-lead">' + UI.esc(h.subhead) + "</p>" +
        '<div class="cta-row hero-cta">' + ctas + "</div>" +
      "</div>" +
      "</section>";
  }

  /* The stat row sits in the band under the hero, not inside the image block. */
  function statBand(C) {
    var UI = window.UI;
    var stats = C.overview.hero.stats.map(function (stat) {
      return '<li class="stat">' +
        '<p class="stat-value nums">' + UI.esc(stat.value) + "</p>" +
        '<p class="stat-label">' + UI.esc(stat.label) + "</p>" +
        "</li>";
    }).join("");
    if (!stats) return "";
    return '<section class="stat-band">' +
      '<div class="wrap"><ul class="stat-row stat-row--band">' + stats + "</ul></div>" +
      "</section>";
  }

  function trustStrip(C) {
    var UI = window.UI;
    var strip = C.overview.trustStrip;
    var SIZES = {
      Oracle: { w: 231, h: 30 },
      NVIDIA: { w: 92, h: 18 },
      SoftServe: { w: 149, h: 26 }
    };
    var logos = strip.logos.map(function (logo) {
      var big = logo.name === "Oracle" ? " logo-strip-lg" : "";
      var size = SIZES[logo.name] || { w: 120, h: 24 };
      return '<img class="logo' + big + '" src="' + UI.esc(logo.file) + '" alt="' + UI.esc(logo.name) +
        '" width="' + size.w + '" height="' + size.h + '" loading="lazy" decoding="async">';
    }).join("");
    return '<section class="section section--tight">' +
      '<div class="wrap">' +
        divider(strip.dividerLabel, "", true) +
        '<div class="logo-strip">' + logos + "</div>" +
      "</div></section>";
  }

  function products(C) {
    var UI = window.UI;
    var intro = C.overview.productsIntro;
    var tiles = UI.orderedProducts().map(function (product, index) {
      return UI.card(product, { eager: index < 2 });
    }).join("");
    return '<section class="section" id="products">' +
      '<div class="wrap">' +
        UI.sectionHead({ title: intro.title, count: intro.count, link: { label: intro.cta.label, href: intro.cta.route } }) +
        '<p class="lead" style="margin-bottom:3rem">' + UI.esc(intro.body) + "</p>" +
        '<div class="tile-grid">' + tiles + "</div>" +
      "</div></section>";
  }

  /* One card per engagement, one anatomy — measured, modeled, in preparation.
     The status chip carries that distinction, so no card needs a hand-written
     label, and no customer is named on either surface. */
  function caseStudies(C) {
    var UI = window.UI;
    var intro = C.overview.caseStudiesIntro;
    var cards = (C.overview.caseStudies || []).map(UI.caseCard).join("");

    return '<section class="section" id="proof">' +
      '<div class="wrap">' +
        divider(C.site.dividerLabels.howWeProveIt, intro.title) +
        '<div class="section-head" style="margin-top:2.5rem">' +
          '<h2 class="h2">' + UI.esc(intro.title) + "</h2>" +
        "</div>" +
        '<p class="lead" style="margin-bottom:2.5rem">' + UI.esc(intro.body) + "</p>" +
        (cards ? '<div class="case-grid">' + cards + "</div>" : UI.empty(intro.body)) +
        (intro.cta
          ? '<p class="panel-link">' + UI.linkArrow({ label: intro.cta.label, href: intro.cta.route }) + "</p>"
          : "") +
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
        divider(C.site.dividerLabels.howWeEngage, teaser.title) +
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
        '<div class="closing-copy">' +
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
    return hero(C) + statBand(C) + trustStrip(C) + products(C) + caseStudies(C) +
      servicesTeaser(C) + closing(C);
  }

  overview.mount = function (params, root) {
    var slot = root.querySelector("#demo-form-slot");
    if (slot && window.FORMS && typeof window.FORMS.render === "function") {
      slot.innerHTML = window.FORMS.render("demo", { heading: false });
      if (typeof window.FORMS.mount === "function") window.FORMS.mount(slot, "demo");
    }
  };

  overview.title = function () { return window.SITE_CONTENT.site.title; };

  window.PAGES.overview = overview;
})();
