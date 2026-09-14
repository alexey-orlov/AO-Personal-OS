(function () {
  "use strict";

  window.PAGES = window.PAGES || {};

  var state = { tech: "", cat: "", mp: false, q: "" };

  function readState(query) {
    var q = query || {};
    var techIds = window.SITE_CONTENT.facets.technology.map(function (f) { return f.id; });
    var catIds = window.SITE_CONTENT.facets.categories.map(function (c) { return c.id; });
    state = {
      tech: techIds.indexOf(q.tech) >= 0 ? q.tech : "",
      cat: catIds.indexOf(q.cat) >= 0 ? q.cat : "",
      mp: q.mp === "1" && anyMarketplace(),
      q: typeof q.q === "string" ? q.q : ""
    };
  }

  function hashForState() {
    var parts = [];
    if (state.tech) parts.push("tech=" + encodeURIComponent(state.tech));
    if (state.cat) parts.push("cat=" + encodeURIComponent(state.cat));
    if (state.mp) parts.push("mp=1");
    if (state.q) parts.push("q=" + encodeURIComponent(state.q));
    return "#/products" + (parts.length ? "?" + parts.join("&") : "");
  }

  function isMarketplace(product) {
    var entry = window.SITE_CONFIG.products[product.slug];
    return !!(entry && entry.marketplaceUrl);
  }

  function anyMarketplace() {
    return window.SITE_CONTENT.products.some(isMarketplace);
  }

  function haystack(product) {
    var UI = window.UI;
    return [
      product.name,
      product.oneLiner,
      product.subLine || "",
      product.categoryChip,
      UI.facetLabel(product.facet).label,
      UI.facetLabel(product.facet).fullLabel,
      product.availabilityChip,
      product.tags.join(" "),
      product.tile.outcomes.join(" ")
    ].join(" ").toLowerCase();
  }

  function matches(product, filters) {
    if (filters.tech && product.facet !== filters.tech) return false;
    if (filters.cat && product.category !== filters.cat) return false;
    if (filters.mp && !isMarketplace(product)) return false;
    if (filters.q) {
      var needle = filters.q.trim().toLowerCase();
      if (needle && haystack(product).indexOf(needle) < 0) return false;
    }
    return true;
  }

  function filtered(overrides) {
    var filters = Object.assign({}, state, overrides || {});
    return window.SITE_CONTENT.products.filter(function (product) {
      return matches(product, filters);
    });
  }

  function marketTile(product) {
    var UI = window.UI;
    var chips = [
      UI.chip({ label: product.categoryChip }),
      UI.availabilityChip(product)
    ];
    if (isMarketplace(product)) {
      chips.push(UI.chip({ label: window.SITE_CONTENT.facets.marketplace.badge }));
    }
    var outcomes = product.tile.outcomes.map(function (line) {
      return "<li>" + UI.icon("check") + "<span>" + UI.esc(line) + "</span></li>";
    }).join("");

    return '<article class="market-tile reveal">' +
      UI.tilePlate(product) +
      '<div class="market-copy">' +
        '<div class="chip-row">' + chips.join("") + "</div>" +
        '<h2 class="market-title"><a href="#/products/' + UI.esc(product.slug) + '">' +
          UI.esc(product.name) + "</a></h2>" +
        '<p class="market-desc">' + UI.esc(product.oneLiner) + "</p>" +
        '<ul class="outcome-list">' + outcomes + "</ul>" +
        '<div class="market-actions">' +
          UI.linkArrow({ label: "View product", href: "#/products/" + product.slug }) +
          '<a class="link-quiet" href="#/products/' + UI.esc(product.slug) + '/demo">' +
            UI.esc(window.SITE_CONTENT.site.primaryCta.label) + "</a>" +
        "</div>" +
      "</div>" +
      "</article>";
  }

  function resultsHtml() {
    var UI = window.UI;
    var C = window.SITE_CONTENT;
    var list = filtered();
    if (list.length) return list.map(marketTile).join("");
    if (state.tech && !state.cat && !state.mp && !state.q) {
      return UI.empty(UI.facetLabel(state.tech).emptyState);
    }
    return UI.empty(C.facets.noResults);
  }

  function railOption(options) {
    var UI = window.UI;
    var empty = options.count === 0 && !options.on;
    return '<button class="rail-option' + (empty ? " is-empty" : "") +
      '" type="button" role="radio" tabindex="' + (options.on ? "0" : "-1") +
      '" data-group="' + UI.esc(options.group) +
      '" data-value="' + UI.esc(options.value) + '" aria-checked="' + (options.on ? "true" : "false") + '"' +
      (options.title ? ' title="' + UI.esc(options.title) + '"' : "") + ">" +
      '<span class="rail-option-label">' + UI.esc(options.label) + "</span>" +
      '<span class="rail-option-count nums">' + UI.esc(options.count) + "</span>" +
      "</button>";
  }

  function railHtml() {
    var UI = window.UI;
    var C = window.SITE_CONTENT;

    var tech = [railOption({
      group: "tech", value: "", label: C.facets.allLabel, on: !state.tech,
      count: filtered({ tech: "" }).length
    })].concat(C.facets.technology.map(function (facet) {
      return railOption({
        group: "tech", value: facet.id, label: facet.label, title: facet.fullLabel,
        on: state.tech === facet.id, count: filtered({ tech: facet.id }).length
      });
    })).join("");

    var cats = [railOption({
      group: "cat", value: "", label: C.facets.allLabel, on: !state.cat,
      count: filtered({ cat: "" }).length
    })].concat(C.facets.categories.map(function (category) {
      return railOption({
        group: "cat", value: category.id, label: category.chip, title: category.full,
        on: state.cat === category.id, count: filtered({ cat: category.id }).length
      });
    })).join("");

    return '<div class="rail-group">' +
        '<p class="rail-label" id="facet-tech-label">' + UI.esc(C.facets.technologyLabel) + "</p>" +
        '<div class="rail-options" role="radiogroup" aria-labelledby="facet-tech-label">' + tech + "</div>" +
        '<p class="rail-note">' + UI.esc(C.facets.footnote) + "</p>" +
      "</div>" +
      '<div class="rail-group">' +
        '<p class="rail-label" id="facet-cat-label">' + UI.esc(C.facets.categoryLabel) + "</p>" +
        '<div class="rail-options" role="radiogroup" aria-labelledby="facet-cat-label">' + cats + "</div>" +
      "</div>" +
      (anyMarketplace()
        ? '<div class="rail-group">' +
            '<label class="checkline"><input type="checkbox" id="facet-marketplace"' +
              (state.mp ? " checked" : "") + ">" +
              "<span>" + UI.esc(C.facets.marketplace.label) +
              ' <span class="rail-option-count nums">' + filtered({ mp: true }).length + "</span></span></label>" +
          "</div>"
        : "") +
      '<div class="rail-group">' +
        '<button class="btn btn--quiet btn--sm rail-clear" type="button" id="facet-clear">' +
          UI.icon("close") + "<span>" + UI.esc(C.facets.clearLabel) + "</span></button>" +
      "</div>";
  }

  function countLine() {
    var list = filtered();
    var total = window.SITE_CONTENT.products.length;
    return list.length === total
      ? String(total) + " products"
      : String(list.length) + " of " + total + " products";
  }

  function products(params) {
    var UI = window.UI;
    var C = window.SITE_CONTENT;
    var page = C.productsPage;
    readState(params && params.query);

    return '<section class="section section--tight">' +
        '<div class="wrap products-head">' +
          '<p class="eyebrow eyebrow--accent">' + UI.esc(C.site.owner) + " · " + UI.esc(C.site.tagline) + "</p>" +
          '<h1 class="h1">' + UI.esc(page.title) + "</h1>" +
          '<p class="lead products-intro">' + UI.esc(page.intro) + "</p>" +
          '<div class="search-field products-search">' + UI.icon("search") +
            '<label class="sr-only" for="product-search">' + UI.esc(page.searchPlaceholder) + "</label>" +
            '<input class="input" type="search" id="product-search" placeholder="' +
              UI.esc(page.searchPlaceholder) + '" value="' + UI.esc(state.q) + '">' +
          "</div>" +
        "</div>" +
      "</section>" +
      '<section class="section section--flush-top">' +
        '<div class="wrap">' +
          '<div class="rail-layout">' +
            '<aside class="rail" id="facet-rail" aria-label="' + UI.esc(C.facets.technologyLabel) + '">' +
              railHtml() +
            "</aside>" +
            '<div class="rail-content">' +
              '<div class="results-bar">' +
                '<p class="results-count" id="results-count" role="status" aria-live="polite">' +
                  UI.esc(countLine()) + "</p>" +
              "</div>" +
              '<div class="market-grid" id="product-results">' + resultsHtml() + "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>" +
      '<section class="closing">' +
        '<div class="wrap closing-inner">' +
          "<div>" +
            '<h2 class="h2">' + UI.esc(page.bottomBlock.heading) + "</h2>" +
            '<p class="lead" style="margin-top:1.25rem">' + UI.esc(page.bottomBlock.body) + "</p>" +
          "</div>" +
          '<div class="cta-row">' +
            UI.button({
              label: page.bottomBlock.cta.label.replace(/\s*→\s*$/, ""),
              href: page.bottomBlock.cta.route, kind: "primary"
            }) +
            UI.button({ label: "See the services", href: "#/services", kind: "quiet" }) +
          "</div>" +
        "</div>" +
      "</section>";
  }

  function revealNow(container) {
    var nodes = container.querySelectorAll(".reveal");
    window.setTimeout(function () {
      Array.prototype.forEach.call(nodes, function (node) { node.classList.add("is-in"); });
    }, 0);
  }

  products.mount = function (params, root) {
    var rail = root.querySelector("#facet-rail");
    var results = root.querySelector("#product-results");
    var count = root.querySelector("#results-count");
    var search = root.querySelector("#product-search");
    if (!rail || !results) return;

    function sync(keepFocus) {
      var active = keepFocus ? document.activeElement : null;
      var activeKey = active && active.getAttribute ?
        (active.getAttribute("data-group") || "") + ":" + (active.getAttribute("data-value") || "") : null;
      rail.innerHTML = railHtml();
      results.innerHTML = resultsHtml();
      count.textContent = countLine();
      if (activeKey && activeKey !== ":") {
        var next = rail.querySelector('[data-group="' + activeKey.split(":")[0] +
          '"][data-value="' + activeKey.split(":")[1] + '"]');
        if (next) next.focus();
      }
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", hashForState());
      }
      revealNow(results);
    }

    rail.addEventListener("click", function (event) {
      var option = event.target.closest(".rail-option");
      if (option) {
        var group = option.getAttribute("data-group");
        state[group] = option.getAttribute("data-value");
        sync(true);
        return;
      }
      if (event.target.closest("#facet-clear")) {
        state = { tech: "", cat: "", mp: false, q: "" };
        if (search) search.value = "";
        sync(false);
      }
    });

    rail.addEventListener("change", function (event) {
      if (event.target.id === "facet-marketplace") {
        state.mp = event.target.checked;
        sync(false);
      }
    });

    rail.addEventListener("keydown", function (event) {
      var option = event.target.closest(".rail-option");
      if (!option) return;
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      var group = option.parentNode.querySelectorAll(".rail-option");
      var index = Array.prototype.indexOf.call(group, option);
      var next = group[(index + (event.key === "ArrowDown" ? 1 : group.length - 1)) % group.length];
      if (!next) return;
      next.focus();
      next.click();
    });

    if (search) {
      search.addEventListener("input", function () {
        state.q = search.value;
        results.innerHTML = resultsHtml();
        count.textContent = countLine();
        rail.innerHTML = railHtml();
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", hashForState());
        }
        revealNow(results);
      });
      search.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && search.value) {
          search.value = "";
          state.q = "";
          sync(false);
        }
      });
    }
  };

  products.title = function () {
    return window.SITE_CONTENT.productsPage.title.charAt(0) +
      window.SITE_CONTENT.productsPage.title.slice(1).toLowerCase() +
      " — " + window.SITE_CONTENT.site.title;
  };

  window.PAGES.products = products;
})();
