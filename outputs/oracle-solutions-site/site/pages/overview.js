(function () {
  "use strict";

  window.PAGES = window.PAGES || {};

  /* The home page is seven screens, each one content-sized and separated from
     the next by a hairline: the offer, the two ways in, the catalogue, the
     delivery model, the proof, who builds it, and the way to start. Every
     screen opens on the same head — an accent eyebrow, an H2, an optional lead
     and an optional link at the right — so a reader always knows which of the
     seven they are in. */

  /* One grid, so the right-hand link sits on the H2's own baseline rather than
     wherever the lead happens to stop wrapping: eyebrow and lead span both
     columns, the H2 takes the first and the link the second. */
  function head(opts) {
    var UI = window.UI;
    return '<div class="home-head' + (opts.link ? " home-head--split" : "") + '">' +
      '<p class="eyebrow eyebrow--accent">' + UI.esc(opts.eyebrow) + "</p>" +
      '<h2 class="h2">' + UI.esc(opts.title) + "</h2>" +
      (opts.lead ? '<p class="lead home-head-lead">' + UI.esc(opts.lead) + "</p>" : "") +
      (opts.link ? '<p class="home-head-link">' + UI.linkArrow(opts.link) + "</p>" : "") +
      "</div>";
  }

  function categoryEntry(C, id) {
    var found = (C.facets.categories || []).filter(function (item) { return item.id === id; })[0];
    return found || { id: id, chip: id, full: id };
  }

  /* ————— S1: the offer, and what it is built on ————— */

  /* Three bands, drawn as peers of identical height: the workflow patterns and
     the products that instance them, the SoftServe layer that packages them,
     and the Oracle platforms underneath. The connectors draw in on load, which
     is the one thing a static diagram cannot say — that the stack is read from
     the bottom up. Everything inside is hidden from assistive technology; the
     frame carries one label that says the same thing in a sentence. */

  function stackLinks(position) {
    return '<svg class="bo-links bo-links--' + position + '" viewBox="0 0 100 16" ' +
      'preserveAspectRatio="none" aria-hidden="true">' +
      '<path class="bo-link" d="M16.67 0V16"></path>' +
      '<path class="bo-link" d="M50 0V16"></path>' +
      '<path class="bo-link" d="M83.33 0V16"></path>' +
      "</svg>";
  }

  function stackVisual(C) {
    var UI = window.UI;
    var stack = C.overview.hero.stack;
    var families = (C.shared && C.shared.tagFamilies) || {};
    var patternIcons = (families.pattern && families.pattern.icons) || {};
    var techIcons = (families.tech && families.tech.icons) || {};
    var products = UI.orderedProducts();

    var patternTiles = (C.facets.categories || []).map(function (category) {
      var chips = products.filter(function (product) {
        return product.category === category.id;
      }).map(function (product) {
        return '<li class="bo-chip">' + UI.esc(product.name) + "</li>";
      }).join("");
      return '<li class="bo-tile bo-tile--pattern">' +
        '<span class="bo-tile-head">' +
          UI.icon(patternIcons[category.id]) +
          '<span class="bo-tile-name">' + UI.esc(category.chip) + "</span>" +
        "</span>" +
        '<ul class="bo-chips">' + chips + "</ul>" +
        "</li>";
    }).join("");

    var layerTiles = ((stack.softserve && stack.softserve.items) || []).map(function (item) {
      return '<li class="bo-tile bo-tile--layer">' + UI.esc(item) + "</li>";
    }).join("");

    var platformTiles = (C.facets.technology || []).map(function (facet) {
      return '<li class="bo-tile bo-tile--platform">' +
        '<span class="bo-tile-head">' +
          UI.icon(techIcons[facet.id]) +
          '<span class="bo-tile-name">' + UI.esc(facet.label) + "</span>" +
        "</span>" +
        "</li>";
    }).join("");

    return '<div class="bo reveal" role="img" aria-label="' + UI.esc(stack.ariaLabel) + '">' +
      '<div class="bo-band bo-band--patterns" aria-hidden="true">' +
        '<p class="bo-owner"><span class="bo-owner-label">' + UI.esc(stack.patternsLabel) + "</span></p>" +
        '<ul class="bo-tiles bo-tiles--3">' + patternTiles + "</ul>" +
      "</div>" +
      stackLinks("upper") +
      '<div class="bo-band bo-band--softserve" aria-hidden="true">' +
        '<p class="bo-owner"><img class="bo-owner-mark" src="assets/img/softserve-wordmark-white.svg" ' +
          'alt="" width="80" height="14" decoding="async"></p>' +
        '<ul class="bo-tiles bo-tiles--3">' + layerTiles + "</ul>" +
      "</div>" +
      stackLinks("lower") +
      '<div class="bo-band bo-band--oracle" aria-hidden="true">' +
        '<p class="bo-owner">' +
          '<span class="bo-owner-label">' + UI.esc(stack.platformsLabel) + "</span>" +
          '<img class="bo-owner-mark" src="assets/img/oracle-wordmark-white.svg" ' +
            'alt="" width="77" height="10" decoding="async">' +
        "</p>" +
        '<ul class="bo-tiles bo-tiles--4">' + platformTiles + "</ul>" +
      "</div>" +
      "</div>";
  }

  function hero(C) {
    var UI = window.UI;
    var block = C.overview.hero;
    var ctas = (block.ctas || []).map(function (cta) {
      return UI.button({
        label: cta.label, href: cta.route,
        kind: cta.kind === "primary" ? "primary" : "secondary"
      });
    }).join("");

    return '<section class="home-hero has-hero-bg" id="top">' +
      '<span class="hero-glow" aria-hidden="true"></span>' +
      '<div class="wrap home-hero-inner">' +
        '<div class="home-hero-copy">' +
          '<p class="eyebrow">' + UI.esc(block.eyebrow) + "</p>" +
          '<h1 class="h1 home-title">' +
            '<span class="home-title-lead">' + UI.esc(block.headline.lead) + "</span> " +
            '<span class="accent home-title-accent">' + UI.esc(block.headline.accent) + "</span>" +
          "</h1>" +
          '<p class="lead home-lead">' + UI.esc(block.lead) + "</p>" +
          '<div class="cta-row hero-cta">' + ctas + "</div>" +
        "</div>" +
        '<div class="home-hero-visual">' + stackVisual(C) + "</div>" +
      "</div>" +
      "</section>";
  }

  /* The proof strip sits directly under the hero, in the band the other pages
     use for the same job, so the four figures are the first thing under the
     claim rather than a section of their own. */
  function statBand(C) {
    var UI = window.UI;
    var stats = (C.overview.hero.stats || []).map(function (stat) {
      return '<li class="stat">' +
        '<p class="stat-value nums">' + UI.esc(stat.value) + "</p>" +
        '<p class="stat-label">' + UI.esc(stat.label) + "</p>" +
        "</li>";
    }).join("");
    if (!stats) return "";
    return '<section class="stat-band">' +
      '<div class="wrap"><ul class="stat-row stat-row--band stat-row--home">' + stats + "</ul></div>" +
      "</section>";
  }

  /* ————— S2: the two ways in ————— */

  /* Two joined panels rather than two free-standing cards: the products and
     the practice are one offer read two ways, and a reader has to be able to
     take either without feeling they have chosen against the other. Both CTAs
     land on the same baseline because both are equally available. */
  function twoWays(C) {
    var UI = window.UI;
    var block = C.overview.twoWays;

    var panels = (block.panels || []).map(function (panel) {
      var bullets = (panel.bullets || []).map(function (line) {
        return "<li>" + UI.icon("check") + "<span>" + UI.esc(line) + "</span></li>";
      }).join("");
      return '<div class="way">' +
        '<span class="way-mark" aria-hidden="true">' + UI.icon(panel.icon) + "</span>" +
        '<h3 class="h4 way-title">' + UI.esc(panel.title) + "</h3>" +
        '<p class="body-text way-body">' + UI.esc(panel.body) + "</p>" +
        '<ul class="tick-list way-list">' + bullets + "</ul>" +
        '<p class="way-cta">' + UI.linkArrow({
          label: panel.cta.label,
          href: panel.cta.route,
          icon: panel.cta.direction === "down" ? "arrowDown" : "arrow"
        }) + "</p>" +
        "</div>";
    }).join("");

    return '<section class="section home-screen" id="two-ways"><div class="wrap">' +
      head({ eyebrow: block.eyebrow, title: block.title }) +
      '<div class="ways reveal">' + panels + "</div>" +
      "</div></section>";
  }

  /* ————— S3: the catalogue, by workflow pattern ————— */

  /* The pattern is the column, the product is the row: a reader looking for a
     job to fix reads three definitions and then seven one-line answers, rather
     than seven tiles that all look alike. A column with one product keeps its
     spare space — the pattern is what the column claims, not the count. */
  function catalog(C) {
    var UI = window.UI;
    var block = C.overview.catalog;
    var families = (C.shared && C.shared.tagFamilies) || {};
    var patternIcons = (families.pattern && families.pattern.icons) || {};
    var products = UI.orderedProducts();

    var columns = (block.patterns || []).map(function (pattern) {
      var category = categoryEntry(C, pattern.id);
      var rows = products.filter(function (product) {
        return product.category === pattern.id;
      }).map(function (product) {
        /* The row is a container, not a link: the badges beside the name are
           actions of their own, and an action cannot live inside a link. The
           name carries the link and an overlay stretches it over the row, so
           the whole row still answers to a click. */
        return '<div class="catalog-row">' +
          '<span class="catalog-row-head">' +
            '<a class="catalog-row-link" href="#/products/' + UI.esc(product.slug) + '">' +
              '<span class="catalog-row-name">' + UI.esc(product.name) + "</span>" +
            "</a>" +
            UI.badgeRow(product.slug, "catalog-row-badges") +
          "</span>" +
          '<p class="catalog-row-line small">' + UI.esc(product.shortLine) + "</p>" +
          (product.statusNote
            ? '<p class="catalog-row-note">' + UI.esc(product.statusNote) + "</p>"
            : "") +
          UI.icon("arrow", "catalog-row-arrow") +
          "</div>";
      }).join("");

      return '<div class="catalog-col reveal">' +
        '<div class="catalog-pattern">' +
          UI.icon(patternIcons[pattern.id], "catalog-pattern-icon") +
          '<h3 class="catalog-pattern-name">' + UI.esc(category.full) + "</h3>" +
          '<p class="catalog-pattern-def small muted">' + UI.esc(pattern.definition) + "</p>" +
        "</div>" +
        '<div class="catalog-rows">' + rows + "</div>" +
        "</div>";
    }).join("");

    return '<section class="section home-screen" id="products"><div class="wrap">' +
      head({
        eyebrow: block.eyebrow,
        title: block.title,
        lead: block.lead,
        link: { label: block.cta.label, href: block.cta.route }
      }) +
      '<div class="catalog">' + columns + "</div>" +
      "</div></section>";
  }

  /* ————— S4: how we deliver ————— */

  /* Three steps on one horizontal track, each ending on the one fact a reader
     wants from it — duration, and for the first step the price as well. The
     caveat sits under the track, in the same block as the figures it qualifies.
     The three reasons to pick this team are peers beside the ladder, not a
     fourth step in it. */
  function delivery(C) {
    var UI = window.UI;
    var block = C.overview.delivery;

    var steps = (block.steps || []).map(function (step, index) {
      return '<div class="ladder3-step">' +
        '<span class="ladder3-dot" aria-hidden="true"></span>' +
        '<span class="ladder3-index nums">' + UI.esc(String(index + 1)) + "</span>" +
        '<h3 class="ladder3-title">' + UI.esc(step.title) + "</h3>" +
        '<p class="ladder3-body small">' + UI.esc(step.body) + "</p>" +
        '<div class="ladder3-fact">' +
          '<p class="ladder3-fact-label">' + UI.esc(step.factLabel) + "</p>" +
          '<p class="ladder3-fact-value">' + UI.esc(step.fact) + "</p>" +
        "</div>" +
        "</div>";
    }).join("");

    var ctas = (block.ctas || []).map(function (cta, index) {
      return UI.button({
        label: cta.label, href: cta.route,
        kind: cta.kind === "primary" ? "primary" : "quiet",
        iconAfter: index === 0 ? "arrow" : null
      });
    }).join("");

    var pillars = ((block.why && block.why.pillars) || []).map(function (pillar) {
      return '<div class="pillar">' +
        '<span class="pillar-mark" aria-hidden="true">' + UI.icon(pillar.icon) + "</span>" +
        '<div class="pillar-copy">' +
          '<h3 class="pillar-title">' + UI.esc(pillar.title) + "</h3>" +
          '<p class="pillar-text">' + UI.esc(pillar.body) + "</p>" +
        "</div>" +
        "</div>";
    }).join("");

    return '<section class="section home-screen" id="' + UI.esc(block.anchor) + '"><div class="wrap">' +
      head({ eyebrow: block.eyebrow, title: block.title }) +
      '<div class="deliver reveal">' +
        '<div class="deliver-main">' +
          '<div class="ladder3">' + steps + "</div>" +
          '<p class="footnote deliver-note">' + UI.esc(block.footnote) + "</p>" +
          '<div class="cta-row deliver-cta">' + ctas + "</div>" +
        "</div>" +
        '<div class="deliver-why">' +
          /* One accent per screen: the teal on this one is the head eyebrow and
             the first step's dot, so the column label is the dim eyebrow. */
          '<p class="eyebrow">' + UI.esc(block.why.title) + "</p>" +
          '<div class="pillars">' + pillars + "</div>" +
        "</div>" +
      "</div>" +
      "</div></section>";
  }

  /* ————— S5: the engagements behind the products ————— */

  /* The rail says what the four cards are and how the figures were arrived at;
     the cards carry the figures. Measured, modeled and in preparation are three
     states of the same card, so no engagement has to be left out to keep the
     grid honest, and no customer is named on either side. */
  function caseStudies(C) {
    var UI = window.UI;
    var intro = C.overview.caseStudiesIntro;
    var method = (C.services && C.services.proof) || {};
    var cards = (C.overview.caseStudies || []).map(UI.caseCard).join("");

    var stat = method.stat
      ? '<div class="method-stat">' +
          '<p class="method-stat-value nums">' + UI.esc(method.stat.value) + "</p>" +
          '<p class="method-stat-label">' + UI.esc(method.stat.label) + "</p>" +
        "</div>"
      : "";

    return '<section class="section home-screen" id="case-studies"><div class="wrap">' +
      '<div class="cases">' +
        '<div class="cases-rail">' +
          head({ eyebrow: intro.eyebrow, title: intro.title, lead: intro.body }) +
          '<div class="cases-method">' +
            (method.lead ? '<p class="body-text small">' + UI.esc(method.lead) + "</p>" : "") +
            stat +
            (method.footnote ? '<p class="footnote">' + UI.esc(method.footnote) + "</p>" : "") +
          "</div>" +
          '<p class="small cases-nda">' + UI.esc(intro.ndaLine) + "</p>" +
          '<p class="cases-link">' + UI.linkArrow({ label: intro.cta.label, href: intro.cta.route }) + "</p>" +
        "</div>" +
        '<div class="case-grid cases-grid">' + cards + "</div>" +
      "</div>" +
      "</div></section>";
  }

  /* ————— S6: who builds it ————— */

  /* The one inverted screen on the page. The partner wordmarks sit on a navy
     strip inside the light panel rather than on the panel itself: navy is the
     surface this design system reserves for a stated fact, and the marks are
     white. The company address is a link and reads as one — the filled buttons
     on this page are kept for the two places that ask the reader for something. */
  function about(C) {
    var UI = window.UI;
    var block = C.overview.about;

    var stats = (block.stats || []).map(function (stat) {
      return '<div class="about-stat">' +
        '<p class="about-stat-value nums">' + UI.esc(stat.value) + "</p>" +
        '<p class="about-stat-label">' + UI.esc(stat.label) + "</p>" +
        "</div>";
    }).join("");

    var partners = (block.partners || []).map(function (partner) {
      return '<img class="about-partner-mark" src="' + UI.esc(partner.file) +
        '" alt="' + UI.esc(partner.name) + '" width="' + UI.esc(partner.width) +
        '" height="' + UI.esc(partner.height) + '" loading="lazy" decoding="async">';
    }).join("");

    return '<section class="section home-screen" id="about"><div class="wrap">' +
      '<div class="light-band reveal">' +
        '<div class="light-band-media">' +
          '<p class="band-label">' + UI.esc(block.eyebrow) + "</p>" +
          '<h2 class="band-title">' + UI.esc(block.title) + "</h2>" +
          '<p class="band-body">' + UI.esc(block.body) + "</p>" +
          '<a class="band-link" href="' + UI.esc(block.link.url) + '" target="_blank" rel="noopener">' +
            "<span>" + UI.esc(block.link.label) + "</span>" + UI.icon("external") +
          "</a>" +
        "</div>" +
        '<div class="light-band-copy">' +
          '<div class="about-stats">' + stats + "</div>" +
          '<div class="about-partners">' +
            '<span class="about-partners-label">' + UI.esc(block.partnerLine) + "</span>" +
            '<span class="about-partner-marks">' + partners + "</span>" +
          "</div>" +
        "</div>" +
      "</div>" +
      "</div></section>";
  }

  /* ————— S7: the way to start ————— */

  /* The same two-column component the Services page and a product's Contacts
     tab render, from the same objects: one named human on the left, one form on
     the right. Product pages deep-link into this section, so the anchor is read
     from the data rather than written twice. */
  function closing(C) {
    var UI = window.UI;
    var block = C.overview.contact;
    var demo = C.forms.demo;
    var form = window.FORMS && typeof window.FORMS.render === "function"
      ? '<div id="demo-form-slot">' +
          window.FORMS.render("demo", { heading: false, submitLabel: C.forms.labels.submitRequest }) +
        "</div>"
      : '<div id="demo-form-slot"></div>';

    return '<section class="closing" id="' + UI.esc(block.anchor) + '"><div class="wrap">' +
      '<div class="contact-head">' +
        '<h2 class="h2">' + UI.esc(block.heading) + "</h2>" +
        '<p class="lead">' + UI.esc(block.sub) + "</p>" +
      "</div>" +
      UI.contactSplit({
        cardHeading: UI.sectionLabel("contacts"),
        heading: demo.secondaryHeading,
        form: form
      }) +
      "</div></section>";
  }

  function overview() {
    var C = window.SITE_CONTENT;
    return hero(C) + statBand(C) + twoWays(C) + catalog(C) + delivery(C) +
      caseStudies(C) + about(C) + closing(C);
  }

  overview.mount = function (params, root) {
    var slot = root.querySelector("#demo-form-slot");
    if (slot && window.FORMS && typeof window.FORMS.mount === "function") {
      window.FORMS.mount(slot, "demo");
    }
  };

  overview.title = function () { return window.SITE_CONTENT.site.title; };

  window.PAGES.overview = overview;
})();
