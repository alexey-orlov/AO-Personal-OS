(function () {
  "use strict";

  var C = window.SITE_CONTENT;
  var CFG = window.SITE_CONFIG;

  /* ————— helpers ————— */

  function esc(value) {
    if (value === null || value === undefined) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function attrs(map) {
    if (!map) return "";
    var out = [];
    Object.keys(map).forEach(function (key) {
      var value = map[key];
      if (value === false || value === null || value === undefined) return;
      if (value === true) { out.push(key); return; }
      out.push(key + '="' + esc(value) + '"');
    });
    return out.length ? " " + out.join(" ") : "";
  }

  var ICONS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"></path>',
    arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"></path>',
    check: '<path d="m4 12 5 5L20 6"></path>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path>',
    play: '<path d="M8 5.5v13l11-6.5z"></path>',
    download: '<path d="M12 4v11M7 12l5 5 5-5M5 20h14"></path>',
    search: '<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"></path>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"></path>',
    close: '<path d="M6 6l12 12M18 6 6 18"></path>',
    chevron: '<path d="m9 6 6 6-6 6"></path>',
    chevronDown: '<path d="m6 9 6 6 6-6"></path>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3.5 7 8.5 6 8.5-6"></path>',
    globe: '<circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z"></path>',
    linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"></rect><path d="M8 10.5V16M8 7.8v.2M12 16v-3.2a1.8 1.8 0 0 1 3.6 0V16"></path>',
    facebook: '<path d="M14.5 8.5h2.2M14.5 21v-9.4c0-1.7.9-2.6 2.4-2.6M11 12.6h5.4"></path><rect x="3.5" y="3.5" width="17" height="17" rx="2"></rect>',
    youtube: '<rect x="3" y="6" width="18" height="12" rx="3"></rect><path d="m11 9.8 3.6 2.2-3.6 2.2z"></path>',
    dot: '<circle cx="12" cy="12" r="4"></circle>',

    alert: '<path d="M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"></path><path d="M12 8.5v5M12 16.6v.4"></path>',
    spark: '<path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.3l-1.8-5.7L4.5 10.8 10.2 9z"></path><path d="m18.6 16.4.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7z"></path>',
    roi: '<path d="M4 18.5 9.5 13l3.5 3.2L20 8.5"></path><path d="M15.5 8.5H20v4.3"></path><path d="M3 21h18"></path>',
    clock: '<circle cx="12" cy="12" r="8.5"></circle><path d="M12 7v5.3l3.4 2"></path>',
    gauge: '<path d="M3.5 17a8.5 8.5 0 1 1 17 0"></path><path d="m12 17 4-5.5"></path><circle cx="12" cy="17" r="1"></circle>',
    users: '<circle cx="9" cy="8.5" r="3.2"></circle><path d="M3 19.5a6 6 0 0 1 12 0"></path><path d="M16 6.2a3 3 0 0 1 0 5.6M17.5 19.5a5.8 5.8 0 0 0-2.2-4.3"></path>',
    shield: '<path d="M12 3 4.5 6v6c0 4.2 3 7.6 7.5 9 4.5-1.4 7.5-4.8 7.5-9V6z"></path>',
    trendUp: '<path d="M4 17 9.5 11.5l3.5 3.3L20 7.5"></path><path d="M15 7.5h5v5"></path>',
    trendDown: '<path d="M4 7.5 9.5 13l3.5-3.3L20 17"></path><path d="M15 17h5v-5"></path>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"></rect><path d="M3.5 10h17M8 3v4M16 3v4"></path>',
    link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l2.6-2.6a4.5 4.5 0 0 0-6.4-6.4L11 6.6"></path><path d="M14 10a4.5 4.5 0 0 0-6.4 0L5 12.6a4.5 4.5 0 0 0 6.4 6.4L13 17.4"></path>',
    network: '<circle cx="12" cy="5" r="2.5"></circle><circle cx="5" cy="18" r="2.5"></circle><circle cx="19" cy="18" r="2.5"></circle><path d="M10.3 7.1 6.4 15.7M13.7 7.1l3.9 8.6M7.5 18h9"></path>',
    inbound: '<path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M4 20h16"></path>',
    outbound: '<path d="M12 21V9"></path><path d="m7 14 5-5 5 5"></path><path d="M4 4h16"></path>',
    trigger: '<path d="M20 12a8 8 0 1 1-2.4-5.7"></path><path d="M20.5 4v4.2h-4.2"></path>',
    eye: '<path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"></path><circle cx="12" cy="12" r="2.8"></circle>',
    audit: '<rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M9 8h6M9 12h6M9 16h3"></path>',

    "industry-manufacturing": '<path d="M3.5 20V11l5 3V11l5 3V7l5.5 4v9Z"></path><path d="M2.5 20h19"></path>',
    "industry-logistics": '<rect x="2.5" y="7" width="10.5" height="9" rx="1.5"></rect><path d="M13 10h4l4 3.5V16h-8z"></path><circle cx="7" cy="18.3" r="1.7"></circle><circle cx="17" cy="18.3" r="1.7"></circle>',
    "industry-utilities": '<path d="M13.2 2.5 5.5 13.2h5.6L10 21.5l7.8-11h-5.6z"></path>',
    "industry-telecom": '<path d="M12 10.5v10"></path><circle cx="12" cy="8" r="2"></circle><path d="M7.5 3.5a7 7 0 0 0 0 9M16.5 3.5a7 7 0 0 1 0 9"></path>',
    "industry-healthcare": '<rect x="3" y="3" width="18" height="18" rx="4.5"></rect><path d="M12 8v8M8 12h8"></path>',
    "industry-financial-services": '<path d="M3 10h18M4 10 12 4l8 6M6.5 10v7M10 10v7M14 10v7M17.5 10v7M3 20.5h18"></path>',
    "industry-insurance": '<path d="M12 3 4.5 6v6c0 4.2 3 7.6 7.5 9 4.5-1.4 7.5-4.8 7.5-9V6z"></path><path d="m9 12 2 2 4-4"></path>',
    "industry-retail": '<path d="M5 8h14l-1 12H6z"></path><path d="M9 8V6a3 3 0 0 1 6 0v2"></path>',
    "industry-energy": '<path d="M9 3v5M15 3v5"></path><path d="M6 8h12v3a6 6 0 0 1-12 0z"></path><path d="M12 17v4"></path>',
    "industry-public-sector": '<path d="M6 21V3.5"></path><path d="M6 4h11l-2 3.6L17 11H6"></path>',
    "industry-automotive": '<path d="M5 15.2 6.4 10A2 2 0 0 1 8.3 8.5h7.4A2 2 0 0 1 17.6 10L19 15.2"></path><rect x="3" y="15" width="18" height="4" rx="1.5"></rect><path d="M7 19v1.5M17 19v1.5"></path>',
    "industry-life-sciences": '<path d="M10 3v6L4.6 18a2 2 0 0 0 1.8 3h11.2a2 2 0 0 0 1.8-3L14 9V3"></path><path d="M9 3h6M7.3 14h9.4"></path>',
    "industry-professional-services": '<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M9 7V5.2A2.2 2.2 0 0 1 11.2 3h1.6A2.2 2.2 0 0 1 15 5.2V7M3 12.5h18"></path>',
    "industry-construction": '<path d="M4 16a8 8 0 0 1 16 0"></path><path d="M9.5 16V8.5a2.5 2.5 0 0 1 5 0V16"></path><rect x="2.5" y="16" width="19" height="3.5" rx="1.5"></rect>',
    "industry-travel-transport": '<path d="M21 3 3 10.5l7 2.8L12.8 21z"></path><path d="m10 13.3 11-10.3"></path>',
    "industry-cross-industry": '<circle cx="12" cy="12" r="8.5"></circle><path d="M3.5 12h17M12 3.5c2.4 2.5 3.6 5.4 3.6 8.5S14.4 18 12 20.5C9.6 18 8.4 15.1 8.4 12S9.6 6 12 3.5Z"></path>'
  };

  function icon(name, className) {
    var body = ICONS[name];
    if (!body) return "";
    return '<svg class="icon' + (className ? " " + className : "") +
      '" viewBox="0 0 24 24" aria-hidden="true">' + body + "</svg>";
  }

  function chip(options) {
    var opts = options || {};
    var kind = opts.kind || "meta";
    var classes = ["chip", "chip--" + kind];
    if (opts.className) classes.push(opts.className);
    var extra = opts.attrs ? Object.assign({}, opts.attrs) : {};
    if (opts.tip) {
      classes.push("tip");
      extra["data-tip"] = opts.tip;
      if (!extra.tabindex) extra.tabindex = "0";
    }
    if (opts.title) extra.title = opts.title;
    var tag = kind === "filter" ? "button" : "span";
    if (tag === "button") extra.type = "button";
    var dot = opts.dot ? '<span class="chip-dot chip-dot--' + esc(opts.dot) + '"></span>' : "";
    return "<" + tag + ' class="' + classes.join(" ") + '"' + attrs(extra) + ">" +
      dot + esc(opts.label) + "</" + tag + ">";
  }

  var AVAILABILITY_DOT = {
    "available": "available",
    "fixed-price-offer": "offer",
    "in-preparation": "preparation"
  };

  function availabilityChip(product) {
    return chip({
      label: product.availabilityChip,
      tip: product.availabilityTooltip,
      dot: AVAILABILITY_DOT[product.availability] || "preparation"
    });
  }

  function button(options) {
    var opts = options || {};
    var classes = ["btn", "btn--" + (opts.kind || "secondary")];
    if (opts.sm) classes.push("btn--sm");
    if (opts.className) classes.push(opts.className);
    var extra = opts.attrs ? Object.assign({}, opts.attrs) : {};
    var inner = (opts.icon ? icon(opts.icon) : "") + "<span>" + esc(opts.label) + "</span>" +
      (opts.iconAfter ? icon(opts.iconAfter) : "");
    if (opts.href) {
      extra.href = opts.href;
      if (/^https?:/.test(opts.href)) { extra.target = "_blank"; extra.rel = "noopener"; }
      return '<a class="' + classes.join(" ") + '"' + attrs(extra) + ">" + inner + "</a>";
    }
    extra.type = extra.type || "button";
    return '<button class="' + classes.join(" ") + '"' + attrs(extra) + ">" + inner + "</button>";
  }

  function linkArrow(options) {
    var opts = options || {};
    var label = String(opts.label || "").replace(/\s*→\s*$/, "");
    var extra = opts.attrs ? Object.assign({}, opts.attrs) : {};
    extra.href = opts.href || "#/";
    extra.class = "link-arrow" + (opts.className ? " " + opts.className : "");
    return "<a" + attrs(extra) + "><span>" + esc(label) + "</span>" + icon("arrow") + "</a>";
  }

  function divider(label, center) {
    return '<p class="divider' + (center ? " divider--center" : "") + '"><span>' + esc(label) + "</span></p>";
  }

  function headline(parts, tag, className) {
    var element = tag || "h1";
    var cls = className || "h1";
    return "<" + element + ' class="' + cls + '"><span class="accent">' + esc(parts.accent) +
      "</span> " + esc(parts.rest) + "</" + element + ">";
  }

  function sectionHead(options) {
    var opts = options || {};
    var count = (opts.count || opts.count === 0)
      ? '<span class="section-count nums">' + esc(opts.count) + "</span>" : "";
    var link = opts.link ? '<span class="section-link">' + linkArrow(opts.link) + "</span>" : "";
    return '<div class="section-head">' +
      '<h2 class="h2">' + esc(opts.title) + "</h2>" + count + link + "</div>";
  }

  function emptyState(text) {
    return '<div class="empty"><p>' + esc(text) + "</p></div>";
  }

  function facetLabel(id) {
    var found = C.facets.technology.filter(function (f) { return f.id === id; })[0];
    return found || { label: id, fullLabel: id };
  }

  function industryLabel(key) {
    var labels = (C.shared && C.shared.industryLabels) || {};
    return labels[key] || key;
  }

  function sectionLabel(key) {
    var labels = (C.shared && C.shared.sectionLabels) || {};
    return labels[key] || "";
  }

  function industryChips(keys) {
    if (!keys || !keys.length) return "";
    return '<ul class="ind-chips">' + keys.map(function (key) {
      return '<li class="ind-chip">' + icon("industry-" + key) +
        "<span>" + esc(industryLabel(key)) + "</span></li>";
    }).join("") + "</ul>";
  }

  function heroBackdrop(image, options) {
    var opts = options || {};
    if (!image || !image.file) return "";
    return '<div class="hero-bg" aria-hidden="true">' +
      '<img class="hero-bg-img" src="' + esc(image.file) + '" alt=""' +
      (image.focal ? ' style="object-position:' + esc(image.focal) + '"' : "") +
      ' loading="' + (opts.lazy ? "lazy" : "eager") + '" decoding="async"' +
      (opts.lazy ? "" : ' fetchpriority="high"') + ">" +
      '<span class="hero-bg-veil"></span>' +
      "</div>";
  }

  function media(key) {
    return (C.media && C.media[key]) || null;
  }

  function diagram(key) {
    var registry = window.SITE_DIAGRAMS;
    if (!registry || typeof registry.render !== "function") return "";
    return registry.render(key);
  }

  function figure(key, options) {
    var opts = options || {};
    var item = media(key);
    if (!item) return "";
    var classes = ["media-figure"];
    if (opts.className) classes.push(opts.className);
    var art = item.diagram ? diagram(item.diagram) : "";
    if (art) {
      classes.push("media-figure--diagram");
      return '<figure class="' + classes.join(" ") + '" role="img" aria-label="' +
        esc(opts.alt === false ? "" : item.alt) + '">' + art + "</figure>";
    }
    if (!item.src) return "";
    return '<figure class="' + classes.join(" ") + '">' +
      '<img src="' + esc(item.src) + '" alt="' + esc(opts.alt === false ? "" : item.alt) +
      '" loading="lazy" decoding="async">' +
      "</figure>";
  }

  function tilePlate(product) {
    var facet = facetLabel(product.facet);
    var item = media(product.slug);
    var hasArt = !!(item && item.src);
    var art = hasArt
      ? '<img class="tile-plate-img" src="' + esc(item.src) + '" alt="" loading="lazy" decoding="async">'
      : '<span class="tile-plate-name"><span class="accent">' + esc(product.headline.accent) +
        "</span> " + esc(product.headline.rest) + "</span>";
    return '<a class="tile-plate' + (hasArt ? " tile-plate--art" : "") + '" href="#/products/' +
      esc(product.slug) + '" aria-label="' + esc(product.name) + '">' +
      art +
      '<span class="tile-plate-foot">' +
        '<span class="tile-plate-facet" title="' + esc(facet.fullLabel) + '">' + esc(facet.label) + "</span>" +
        icon("arrow") +
      "</span>" +
      "</a>";
  }

  function card(product, options) {
    var opts = options || {};
    var marketplace = CFG.products[product.slug] && CFG.products[product.slug].marketplace;
    var chips = [
      chip({ label: product.categoryChip }),
      availabilityChip(product)
    ];
    if (marketplace && opts.marketplaceBadge !== false) {
      chips.push(chip({ label: C.facets.marketplace.badge }));
    }
    return '<article class="tile reveal">' +
      tilePlate(product) +
      '<div class="chip-row">' + chips.join("") + "</div>" +
      '<h3 class="tile-title"><a href="#/products/' + esc(product.slug) + '">' + esc(product.name) + "</a></h3>" +
      '<p class="tile-desc clamp-3">' + esc(product.oneLiner) + "</p>" +
      "</article>";
  }

  /* ————— modal ————— */

  var modalState = { node: null, lastFocus: null };

  function closeModal() {
    if (!modalState.node) return;
    modalState.node.remove();
    modalState.node = null;
    document.body.style.removeProperty("overflow");
    if (modalState.lastFocus && modalState.lastFocus.focus) modalState.lastFocus.focus();
    modalState.lastFocus = null;
  }

  function openModal(html, options) {
    var opts = options || {};
    closeModal();
    modalState.lastFocus = document.activeElement;
    var backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    if (opts.label) backdrop.setAttribute("aria-label", opts.label);
    backdrop.innerHTML = '<div class="modal-panel">' +
      '<button class="modal-close" type="button" aria-label="Close">' + icon("close") + "</button>" +
      html + "</div>";
    backdrop.addEventListener("click", function (event) {
      if (event.target === backdrop || event.target.closest(".modal-close")) closeModal();
    });
    document.body.appendChild(backdrop);
    document.body.style.overflow = "hidden";
    modalState.node = backdrop;
    var focusable = backdrop.querySelector("input:not([tabindex='-1']), textarea, select") ||
      backdrop.querySelector("button, a");
    if (focusable) focusable.focus();
    return backdrop;
  }

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (modalState.node) { closeModal(); return; }
      var menu = document.getElementById("mobile-menu");
      if (menu && !menu.hidden) {
        closeMobileMenu();
        var toggle = document.getElementById("menu-toggle");
        if (toggle) toggle.focus();
      }
      return;
    }
    if (event.key !== "Tab" || !modalState.node) return;
    var items = modalState.node.querySelectorAll(FOCUSABLE);
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.UI = {
    esc: esc,
    attrs: attrs,
    icon: icon,
    chip: chip,
    availabilityChip: availabilityChip,
    button: button,
    linkArrow: linkArrow,
    divider: divider,
    headline: headline,
    sectionHead: sectionHead,
    empty: emptyState,
    card: card,
    tilePlate: tilePlate,
    media: media,
    figure: figure,
    diagram: diagram,
    facetLabel: facetLabel,
    industryLabel: industryLabel,
    industryChips: industryChips,
    sectionLabel: sectionLabel,
    heroBackdrop: heroBackdrop,
    modal: { open: openModal, close: closeModal }
  };

  /* ————— header & footer ————— */

  function renderNav() {
    var links = C.site.nav.map(function (item) {
      return '<a class="nav-link" data-route="' + esc(item.route) + '" href="' + esc(item.route) + '">' +
        esc(item.label) + "</a>";
    }).join("");
    var cta = button({
      label: C.site.primaryCta.label,
      href: C.site.primaryCta.route,
      kind: "secondary",
      className: "nav-cta btn--sm",
      attrs: { "data-demo": "header" }
    });
    document.getElementById("primary-nav").innerHTML = links + cta;
    document.getElementById("mobile-menu").innerHTML = links + cta;
  }

  var SOCIAL_ICON = { SoftServe: "globe", LinkedIn: "linkedin", Facebook: "facebook", YouTube: "youtube" };

  function renderFooter() {
    var f = C.site.footer;
    var social = f.social.map(function (item) {
      return '<a class="social-link" href="' + esc(item.url) + '" target="_blank" rel="noopener" aria-label="' +
        esc(item.label) + '">' + icon(SOCIAL_ICON[item.label] || "globe") + "</a>";
    }).join("");
    var legal = f.legalLinks.map(function (item) {
      return '<a href="' + esc(item.url) + '" target="_blank" rel="noopener">' + esc(item.label) + "</a>";
    }).join("");

    document.getElementById("site-footer").innerHTML =
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          "<div>" +
            '<h2 class="footer-heading">' + esc(f.heading) + "</h2>" +
            '<p class="footer-desc">' + esc(f.description) + "</p>" +
            '<div class="footer-actions">' +
              button({ label: f.contactCta.label, href: f.contactCta.route, kind: "mail", icon: "mail" }) +
              '<span class="social-row" aria-label="' + esc(f.socialLabel) + '">' + social + "</span>" +
            "</div>" +
          "</div>" +
          '<div class="footer-right">' +
            '<div class="built-with">' +
              '<img src="assets/img/oracle-wordmark-white.svg" alt="Oracle" width="139" height="18" loading="lazy" decoding="async">' +
              '<img src="assets/img/nvidia-wordmark.svg" alt="NVIDIA" width="92" height="18" loading="lazy" decoding="async">' +
              '<span class="built-label">' + esc(f.builtWith) + "</span>" +
            "</div>" +
          "</div>" +
        "</div>" +
        '<div class="footer-legal">' + legal +
          '<p class="legal-line">' + esc(f.legalLine) + "</p>" +
        "</div>" +
        '<p class="trademark">' + esc(f.trademarkLine) + "</p>" +
      "</div>";
  }

  /* ————— router ————— */

  var ROUTES = [
    { pattern: /^\/$/, page: "overview", params: function () { return {}; } },
    { pattern: /^\/products$/, page: "products", params: function () { return {}; } },
    { pattern: /^\/products\/([^/]+)$/, page: "product", params: function (m) { return { slug: m[1] }; } },
    { pattern: /^\/products\/([^/]+)\/([^/]+)$/, page: "product", params: function (m) { return { slug: m[1], tab: m[2] }; } },
    { pattern: /^\/services$/, page: "services", params: function () { return {}; } }
  ];

  function decodePart(value) {
    try { return decodeURIComponent(String(value).replace(/\+/g, " ")); }
    catch (error) { return String(value); }
  }

  function parseHash() {
    var raw = window.location.hash.replace(/^#/, "");
    if (!raw) raw = "/";
    var anchorIndex = raw.indexOf("#");
    var anchor = "";
    if (anchorIndex >= 0) {
      anchor = raw.slice(anchorIndex + 1);
      raw = raw.slice(0, anchorIndex);
    }
    var query = {};
    var queryIndex = raw.indexOf("?");
    if (queryIndex >= 0) {
      raw.slice(queryIndex + 1).split("&").forEach(function (pair) {
        if (!pair) return;
        var eq = pair.indexOf("=");
        var key = decodePart(eq < 0 ? pair : pair.slice(0, eq));
        query[key] = eq < 0 ? "" : decodePart(pair.slice(eq + 1));
      });
      raw = raw.slice(0, queryIndex);
    }
    if (!raw) raw = "/";
    if (raw.length > 1) raw = raw.replace(/\/+$/, "");
    return { path: raw || "/", anchor: anchor, query: query };
  }

  function matchRoute(path) {
    for (var i = 0; i < ROUTES.length; i += 1) {
      var found = path.match(ROUTES[i].pattern);
      if (found) {
        var params = ROUTES[i].params(found);
        params.path = path;
        return { page: ROUTES[i].page, params: params };
      }
    }
    return null;
  }

  function notFound() {
    return '<section class="wrap route-note">' +
      '<p class="eyebrow eyebrow--accent">Page not found</p>' +
      '<h1 class="h1">NOTHING <span class="accent">HERE</span></h1>' +
      '<p class="lead">That address does not match a page on this site.</p>' +
      '<div class="cta-row">' +
        button({ label: "Back to the overview", href: "#/", kind: "secondary" }) +
        button({ label: "Browse the products", href: "#/products", kind: "quiet" }) +
      "</div></section>";
  }

  function setActiveNav(path) {
    var base = path === "/" ? "#/" : (path.indexOf("/products") === 0 ? "#/products" : "#" + path);
    var links = document.querySelectorAll(".nav-link");
    Array.prototype.forEach.call(links, function (link) {
      var isActive = link.getAttribute("data-route") === base;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });
  }

  /* A hero whose image cannot be fetched falls back to the gradient alone,
     never to a broken-image glyph over the headline. */
  function guardHeroImages(root) {
    Array.prototype.forEach.call(root.querySelectorAll(".hero-bg-img"), function (img) {
      function drop() { if (img.parentNode) img.parentNode.removeChild(img); }
      if (img.complete) {
        if (!img.naturalWidth) drop();
        return;
      }
      img.addEventListener("error", drop);
    });
  }

  var revealObserver = null;

  function initReveal(root) {
    var nodes = root.querySelectorAll(".reveal");
    if (!nodes.length) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(nodes, function (node) { node.classList.add("is-in"); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    }
    Array.prototype.forEach.call(nodes, function (node) { revealObserver.observe(node); });
    window.setTimeout(function () {
      Array.prototype.forEach.call(nodes, function (node) { node.classList.add("is-in"); });
    }, 1400);
  }

  var lastKey = null;

  function render() {
    var parsed = parseHash();
    var matched = matchRoute(parsed.path);
    var app = document.getElementById("app");
    closeModal();

    var key = matched ? matched.page + ":" + (matched.params.slug || "") : "404:" + parsed.path;
    var sameView = key === lastKey;

    if (!matched || typeof window.PAGES[matched.page] !== "function") {
      app.innerHTML = notFound();
      document.title = "Page not found — " + C.site.title;
    } else {
      var params = matched.params;
      params.anchor = parsed.anchor;
      params.query = parsed.query;
      app.innerHTML = window.PAGES[matched.page](params);
      var page = window.PAGES[matched.page];
      if (typeof page.mount === "function") page.mount(params, app);
      if (typeof page.title === "function") document.title = page.title(params);
      else document.title = C.site.title;
    }

    setActiveNav(parsed.path);
    guardHeroImages(app);
    initReveal(app);
    closeMobileMenu();

    if (parsed.anchor) {
      var target = document.getElementById(parsed.anchor);
      if (target) {
        var startedAt = window.pageYOffset;
        var scrollToAnchor = function (force) {
          var top = target.getBoundingClientRect().top + window.pageYOffset - 96;
          var smooth = !force && sameView && !document.hidden &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: top, behavior: smooth ? "smooth" : "instant" });
        };
        scrollToAnchor();
        window.requestAnimationFrame(function () { scrollToAnchor(); });
        window.setTimeout(function () {
          if (Math.abs(window.pageYOffset - startedAt) < 2) scrollToAnchor(true);
        }, 700);
      }
    } else if (!sameView) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    lastKey = key;
  }

  /* ————— header behaviour ————— */

  function closeMobileMenu() {
    var menu = document.getElementById("mobile-menu");
    var toggle = document.getElementById("menu-toggle");
    if (!menu || !toggle) return;
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  function initHeader() {
    var masthead = document.getElementById("masthead");
    var toggle = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");

    toggle.addEventListener("click", function () {
      var open = menu.hidden;
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMobileMenu();
    });

    var onScroll = function () {
      masthead.classList.toggle("is-scrolled", window.pageYOffset > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    document.addEventListener("click", function (event) {
      var trigger = event.target.closest ? event.target.closest("[data-demo]") : null;
      if (!trigger) return;
      if (!window.FORMS || typeof window.FORMS.render !== "function") return;
      event.preventDefault();
      closeMobileMenu();
      openModal(window.FORMS.render("demo"), { label: C.forms.demo.heading });
      var panel = document.querySelector(".modal-panel");
      if (panel && typeof window.FORMS.mount === "function") window.FORMS.mount(panel, "demo");
    });
  }

  function initHashLinks() {
    document.addEventListener("click", function (event) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var link = event.target.closest ? event.target.closest('a[href^="#"]') : null;
      if (!link || link.id === "skip-link" || link.hasAttribute("target")) return;
      var href = link.getAttribute("href");
      if (!href || href === "#") return;
      event.preventDefault();
      var sameHash = window.location.hash === href;
      window.ROUTER.go(href);
      if (sameHash && href.indexOf("#", 1) < 0 && link.classList.contains("nav-link")) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });
  }

  function initSkipLink() {
    var link = document.getElementById("skip-link");
    var app = document.getElementById("app");
    if (!link || !app) return;
    link.addEventListener("click", function (event) {
      event.preventDefault();
      app.setAttribute("tabindex", "-1");
      app.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }

  window.ROUTER = {
    go: function (hash) {
      if (window.location.hash === hash) render();
      else window.location.hash = hash;
    },
    current: parseHash,
    render: render
  };

  window.PAGES = window.PAGES || {};

  document.documentElement.classList.add("js-reveal");
  renderNav();
  renderFooter();
  initHeader();
  initHashLinks();
  initSkipLink();
  window.addEventListener("hashchange", render);
  render();
})();
