(function () {
  "use strict";

  window.PAGES = window.PAGES || {};

  function products() {
    var C = window.SITE_CONTENT;
    var UI = window.UI;
    var page = C.productsPage;
    return '<section class="section">' +
      '<div class="wrap">' +
        '<h1 class="h1">' + UI.esc(page.title) + "</h1>" +
        '<p class="lead" style="margin-top:1.5rem">' + UI.esc(page.intro) + "</p>" +
        '<div class="tile-grid" style="margin-top:3rem">' +
          C.products.map(function (product) { return UI.card(product); }).join("") +
        "</div>" +
      "</div></section>";
  }

  products.title = function () {
    return window.SITE_CONTENT.productsPage.title + " — " + window.SITE_CONTENT.site.title;
  };

  window.PAGES.products = products;
})();
