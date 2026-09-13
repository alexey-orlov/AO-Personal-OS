(function () {
  "use strict";

  window.PAGES = window.PAGES || {};

  function findProduct(slug) {
    var list = window.SITE_CONTENT.products;
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].slug === slug) return list[i];
    }
    return null;
  }

  function product(params) {
    var C = window.SITE_CONTENT;
    var UI = window.UI;
    var item = findProduct(params.slug);
    if (!item) {
      return '<section class="wrap route-note">' +
        '<p class="eyebrow eyebrow--accent">Not found</p>' +
        '<h1 class="h1">NO SUCH <span class="accent">PRODUCT</span></h1>' +
        '<p class="lead">' + UI.esc(C.productsPage.intro) + "</p>" +
        '<div class="cta-row">' + UI.button({ label: "Browse the products", href: "#/products", kind: "secondary" }) + "</div>" +
        "</section>";
    }

    var tabs = C.shared.productTabs.map(function (tab) {
      var active = (params.tab || "overview") === tab.id;
      return '<a class="tab' + (active ? " is-active" : "") + '" href="#/products/' + UI.esc(item.slug) + "/" + UI.esc(tab.id) + '">' +
        (tab.locked ? UI.icon("lock") : "") + UI.esc(tab.label) + "</a>";
    }).join("");

    return '<section class="section section--tight">' +
      '<div class="wrap">' +
        '<div class="chip-row" style="margin-bottom:1.5rem">' +
          UI.chip({ label: item.categoryChip }) + UI.availabilityChip(item) +
        "</div>" +
        UI.headline(item.headline, "h1", "h1") +
        '<p class="lead" style="margin-top:1.5rem">' + UI.esc(item.oneLiner) + "</p>" +
      "</div></section>" +
      '<div class="tabbar"><div class="wrap" style="display:flex">' + tabs + "</div></div>" +
      '<section class="section"><div class="wrap">' +
        UI.empty(item.subLine || item.oneLiner) +
      "</div></section>";
  }

  product.title = function (params) {
    var item = findProduct(params.slug);
    return (item ? item.name + " — " : "") + window.SITE_CONTENT.site.title;
  };

  window.PAGES.product = product;
})();
