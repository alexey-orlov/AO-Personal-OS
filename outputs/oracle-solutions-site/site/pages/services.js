(function () {
  "use strict";

  window.PAGES = window.PAGES || {};

  function services() {
    var C = window.SITE_CONTENT;
    var UI = window.UI;
    var hero = C.services.hero;
    return '<section class="section">' +
      '<div class="wrap">' +
        UI.headline(hero.headline, "h1", "h1") +
        '<p class="lead" style="margin-top:1.5rem">' + UI.esc(hero.lead) + "</p>" +
        '<p class="lead" style="margin-top:1rem">' + UI.esc(hero.secondParagraph) + "</p>" +
        '<div class="cta-row" style="margin-top:2.5rem">' +
          UI.button({ label: hero.cta.label, href: hero.cta.route, kind: "primary" }) +
        "</div>" +
      "</div></section>";
  }

  services.title = function () {
    return "Services — " + window.SITE_CONTENT.site.title;
  };

  window.PAGES.services = services;
})();
