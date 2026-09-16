(function () {
  "use strict";

  window.PAGES = window.PAGES || {};

  function C() { return window.SITE_CONTENT; }

  /* The home page's section head: Services tells the same story one level
     down, so it takes the same eyebrow, H2 and lead. A second head on the same
     screen passes `accent: false` and keeps its eyebrow dim. */
  function head(opts) {
    var UI = window.UI;
    return '<div class="home-head">' +
      '<p class="eyebrow' + (opts.accent === false ? "" : " eyebrow--accent") + '">' + UI.esc(opts.eyebrow) + "</p>" +
      '<h2 class="h2">' + UI.esc(opts.title) + "</h2>" +
      (opts.lead ? '<p class="lead home-head-lead">' + UI.esc(opts.lead) + "</p>" : "") +
      "</div>";
  }

  /* ————— S1: what SoftServe adds on Oracle, and who does it ————— */

  /* The four platforms are the technology facet itself, so they render as the
     same "Runs on" chips a product hero carries, keyed off the canonical facet
     ids. One button: the scoping call is the page's ask. */
  function hero(content) {
    var UI = window.UI;
    var h = content.services.hero;
    var ids = {};
    ((content.facets && content.facets.technology) || []).forEach(function (facet) {
      ids[facet.label] = facet.id;
    });
    var chips = (h.platforms || []).map(function (platform) {
      return ids[platform.name]
        ? UI.tagChip("tech", ids[platform.name])
        : UI.chip({ label: platform.name, kind: "meta", className: "chip--tag" });
    }).join("");

    return '<section class="product-hero services-hero has-hero-bg">' +
      UI.heroBackdrop(h.image) +
      '<span class="hero-glow" aria-hidden="true"></span>' +
      '<div class="wrap product-hero-inner product-hero-inner--single">' +
        '<p class="eyebrow">' + UI.esc(content.site.owner) + " · Services</p>" +
        UI.headline(h.headline, "h1", "h1 product-title services-title") +
        '<p class="lead product-lead">' + UI.esc(h.lead) + "</p>" +
        '<p class="body-text product-subline">' + UI.esc(h.secondParagraph) + "</p>" +
        (chips
          ? '<div class="services-platforms">' +
              '<p class="eyebrow">' + UI.esc(h.platformsTitle) + "</p>" +
              '<div class="chip-row">' + chips + "</div>" +
            "</div>"
          : "") +
        '<div class="cta-row product-hero-cta">' +
          UI.button({ label: h.cta.label, href: h.cta.route, kind: "primary" }) +
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

  /* ————— S2: how an engagement runs, and who runs it after go-live ————— */

  /* The home page's three-step track under the same step names, full width
     here because the reasons to pick the team are the hero's job on this page.
     The after-go-live choice closes the same screen as two peers with no
     button: the contact block is the page's one ask. */
  function engage(content) {
    var UI = window.UI;
    var block = content.services.howWeEngage;
    var after = content.services.afterGoLive;

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

    var panels = (after.panels || []).map(function (panel) {
      var bullets = (panel.bullets || []).map(function (line) {
        return "<li>" + UI.icon("check") + "<span>" + UI.esc(line) + "</span></li>";
      }).join("");
      return '<div class="way">' +
        '<span class="way-mark" aria-hidden="true">' + UI.icon(panel.icon) + "</span>" +
        '<h3 class="h4 way-title">' + UI.esc(panel.title) + "</h3>" +
        '<p class="body-text way-body">' + UI.esc(panel.body) + "</p>" +
        '<ul class="tick-list way-list">' + bullets + "</ul>" +
        "</div>";
    }).join("");

    return '<section class="section home-screen" id="' + UI.esc(block.anchor) + '"><div class="wrap">' +
      head({ eyebrow: block.eyebrow, title: block.title, lead: block.lead }) +
      '<div class="deliver-main reveal">' +
        '<div class="ladder3">' + steps + "</div>" +
        '<p class="footnote deliver-note">' + UI.esc(block.footnote) + "</p>" +
      "</div>" +
      '<div class="services-after" id="' + UI.esc(after.anchor) + '">' +
        head({ eyebrow: after.eyebrow, title: after.title, accent: false }) +
        '<div class="ways reveal">' + panels + "</div>" +
      "</div>" +
      "</div></section>";
  }

  /* ————— S3: how we measure it ————— */

  /* The page's one light band: the discipline on the left; on the right the one
     accuracy figure with its caveat, and the way back to the case studies that
     carry the figures. An internal route takes the arrow, not the external
     glyph an address carries. */
  function proof(content) {
    var UI = window.UI;
    var block = content.services.proof;
    var linkLabel = String(block.cta.label || "").replace(/\s*→\s*$/, "");

    return '<section class="section home-screen" id="' + UI.esc(block.anchor) + '"><div class="wrap">' +
      '<div class="light-band reveal">' +
        '<div class="light-band-media">' +
          '<p class="band-label">' + UI.esc(block.eyebrow) + "</p>" +
          '<h2 class="band-title">' + UI.esc(block.title) + "</h2>" +
          '<p class="band-body">' + UI.esc(block.lead) + "</p>" +
        "</div>" +
        '<div class="light-band-copy">' +
          '<div class="proof-stat">' +
            '<p class="about-stat-value nums">' + UI.esc(block.stat.value) + "</p>" +
            '<p class="proof-stat-label">' + UI.esc(block.stat.label) + "</p>" +
          "</div>" +
          '<p class="proof-note">' + UI.esc(block.footnote) + "</p>" +
          '<a class="band-link" href="' + UI.esc(block.cta.route) + '"><span>' + UI.esc(linkLabel) + "</span>" +
            UI.icon("arrow") + "</a>" +
        "</div>" +
      "</div>" +
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
    return hero(content) + statBand(content) + engage(content) + proof(content) + contact(content);
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
