/* Internal review panel: TEMPORARY, for the prototype only.
   Renders the "Internal" button (bottom right) and the list of assumptions
   still to be confirmed, from window.SITE_REVIEW (data/review.js).
   Self-contained: the styles are injected from here, and the code touches
   nothing outside its own two elements. Before launch, delete this file,
   data/review.js and their two <script> tags (docs/START-HERE.md §8). */
(function () {
  "use strict";

  var DATA = window.SITE_REVIEW;
  if (!DATA || DATA.enabled === false || !DATA.groups) return;

  var STATUS_LABELS = { open: "To confirm", confirmed: "Confirmed", changed: "Changed" };
  var OPEN_KEY = "oracle-ai-solutions:review-open";

  var CLOSE_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  /* Amber marks everything internal, so the panel never reads as part of the
     site; teal stays the site's own accent. */
  var CSS = [
    ".review-toggle, .review-panel { --review-amber: #F2B544; --review-flag: #FF9F8F; }",
    ".review-toggle[hidden], .review-panel[hidden] { display: none; }",
    ".review-toggle {",
    "  position: fixed; right: 1rem; bottom: 1rem; z-index: 84;",
    "  display: inline-flex; align-items: center; gap: .5rem; min-height: 2.75rem;",
    "  padding: .375rem .875rem .375rem .375rem; border-radius: 9999px;",
    "  background: #0B0B0B; border: 1px dashed var(--review-amber); color: var(--text, #F1F0FD);",
    "  font: 600 .8125rem/1 var(--font-body, sans-serif); cursor: pointer;",
    "  box-shadow: 0 .5rem 1.5rem rgba(0, 0, 0, .55);",
    "}",
    ".review-toggle:hover { background: #1C1A14; }",
    ".review-toggle:focus-visible, .review-close:focus-visible { outline: 2px solid var(--review-amber); outline-offset: 3px; }",
    ".review-tag {",
    "  padding: .375rem .5rem; border-radius: 9999px; background: var(--review-amber); color: #131313;",
    "  font: 700 .6875rem/1 var(--font-display, sans-serif); letter-spacing: .08em; text-transform: uppercase;",
    "}",
    ".review-panel {",
    "  position: fixed; top: 0; right: 0; bottom: 0; z-index: 85;",
    "  display: flex; flex-direction: column; width: min(28rem, 100%);",
    "  background: var(--bg-raised, #181818); color: var(--text-body, #CFD6DC);",
    "  border-top: 3px solid var(--review-amber); border-left: 1px solid var(--border-panel, rgba(255, 255, 255, .16));",
    "  box-shadow: -1.5rem 0 3rem rgba(0, 0, 0, .55); font-family: var(--font-body, sans-serif);",
    "  animation: review-in .25s ease-out;",
    "}",
    "@keyframes review-in { from { transform: translateX(1.5rem); opacity: 0; } to { transform: none; opacity: 1; } }",
    ".review-head { position: relative; padding: 1.25rem 1.25rem 1rem; border-bottom: 1px solid var(--border-panel, rgba(255, 255, 255, .16)); }",
    ".review-eyebrow {",
    "  margin: 0 0 .5rem; color: var(--review-amber);",
    "  font: 700 .6875rem/1.2 var(--font-display, sans-serif); letter-spacing: .1em; text-transform: uppercase;",
    "}",
    ".review-title {",
    "  margin: 0 0 .5rem; padding-right: 3rem; color: var(--text, #F1F0FD);",
    "  font: 900 1.5rem/1.1 var(--font-display, sans-serif); text-transform: uppercase;",
    "}",
    ".review-title:focus { outline: none; }",
    ".review-intro { margin: 0 0 .625rem; font-size: .875rem; line-height: 1.5; }",
    ".review-summary { margin: 0; color: var(--review-amber); font-size: .8125rem; font-weight: 600; }",
    ".review-close {",
    "  position: absolute; top: .75rem; right: .75rem; display: grid; place-items: center;",
    "  width: 2.75rem; height: 2.75rem; padding: 0; border-radius: 9999px; cursor: pointer;",
    "  background: transparent; color: var(--text, #F1F0FD); border: 1px solid var(--border-panel, rgba(255, 255, 255, .16));",
    "}",
    ".review-close:hover { border-color: var(--review-amber); }",
    ".review-body { flex: 1; overflow-y: auto; overscroll-behavior: contain; padding: 0 1.25rem 1.25rem; }",
    ".review-group-title {",
    "  margin: 1.25rem 0 .25rem; color: var(--text-muted, #C2CDD8);",
    "  font: 700 .75rem/1.2 var(--font-display, sans-serif); letter-spacing: .08em; text-transform: uppercase;",
    "}",
    ".review-list { list-style: none; margin: 0; padding: 0; }",
    ".review-item { padding: .875rem 0; border-top: 1px solid var(--border-panel, rgba(255, 255, 255, .16)); }",
    ".review-chips { display: flex; flex-wrap: wrap; gap: .375rem; margin-bottom: .5rem; }",
    ".review-chip { padding: .3125rem .5rem; border-radius: 9999px; font-size: .6875rem; font-weight: 600; line-height: 1; }",
    ".review-chip--open { color: var(--review-amber); box-shadow: inset 0 0 0 1px var(--review-amber); }",
    ".review-chip--confirmed { color: var(--accent, #35CCBA); background: var(--accent-dim, rgba(53, 204, 186, .16)); }",
    ".review-chip--changed { color: var(--text, #F1F0FD); background: var(--surface-navy-hi, #31475D); }",
    ".review-chip--flag { color: var(--review-flag); background: rgba(255, 138, 122, .14); }",
    ".review-text { margin: 0; color: var(--text, #F1F0FD); font-size: .9375rem; font-weight: 600; line-height: 1.45; }",
    ".review-decision, .review-site { margin: .375rem 0 0; font-size: .8125rem; line-height: 1.5; }",
    ".review-site { color: var(--text-note, #9FB3C6); }",
    ".review-decision { color: var(--text-body, #CFD6DC); }",
    ".review-decision span, .review-site span { color: var(--text-muted, #C2CDD8); font-weight: 600; }",
    ".review-foot { margin: 0; padding: .75rem 1.25rem; border-top: 1px solid var(--border-panel, rgba(255, 255, 255, .16)); color: var(--text-dim, #7C93AB); font-size: .75rem; }",
    "@media (max-width: 480px) { .review-toggle { right: .75rem; bottom: .75rem; } }",
    "@media (prefers-reduced-motion: reduce) { .review-panel { animation: none; } }",
    "@media print { .review-toggle, .review-panel { display: none !important; } }"
  ].join("\n");

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function tally() {
    var counts = { open: 0, confirmed: 0, changed: 0 };
    DATA.groups.forEach(function (group) {
      (group.items || []).forEach(function (item) {
        counts[STATUS_LABELS[item.status] ? item.status : "open"] += 1;
      });
    });
    return counts;
  }

  function summaryText(counts) {
    var parts = [];
    if (counts.open) parts.push(counts.open + " to confirm");
    if (counts.confirmed) parts.push(counts.confirmed + " confirmed");
    if (counts.changed) parts.push(counts.changed + " changed");
    return parts.join(" · ");
  }

  function itemHtml(item) {
    var status = STATUS_LABELS[item.status] ? item.status : "open";
    return '<li class="review-item">' +
      '<div class="review-chips">' +
        '<span class="review-chip review-chip--' + status + '">' + esc(STATUS_LABELS[status]) + "</span>" +
        (item.flag ? '<span class="review-chip review-chip--flag">' + esc(item.flag) + "</span>" : "") +
      "</div>" +
      '<p class="review-text">' + esc(item.text) + "</p>" +
      (item.decision ? '<p class="review-decision"><span>Decided:</span> ' + esc(item.decision) + "</p>" : "") +
      (item.site ? '<p class="review-site"><span>On the site:</span> ' + esc(item.site) + "</p>" : "") +
    "</li>";
  }

  function panelHtml(counts) {
    var foot = [DATA.updated ? "Updated " + DATA.updated : "", DATA.footer || ""].filter(Boolean).join(" · ");
    return '<div class="review-head">' +
        (DATA.eyebrow ? '<p class="review-eyebrow">' + esc(DATA.eyebrow) + "</p>" : "") +
        '<h2 class="review-title" id="review-title" tabindex="-1">' + esc(DATA.title) + "</h2>" +
        (DATA.intro ? '<p class="review-intro">' + esc(DATA.intro) + "</p>" : "") +
        '<p class="review-summary">' + esc(summaryText(counts)) + "</p>" +
        '<button type="button" class="review-close" aria-label="Close the review list">' + CLOSE_SVG + "</button>" +
      "</div>" +
      '<div class="review-body">' +
        DATA.groups.map(function (group) {
          return '<section class="review-group">' +
            '<h3 class="review-group-title">' + esc(group.title) + "</h3>" +
            '<ul class="review-list">' + (group.items || []).map(itemHtml).join("") + "</ul>" +
          "</section>";
        }).join("") +
      "</div>" +
      (foot ? '<p class="review-foot">' + esc(foot) + "</p>" : "");
  }

  function mount() {
    var style = document.createElement("style");
    style.id = "review-style";
    style.textContent = CSS;
    document.head.appendChild(style);

    var counts = tally();

    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "review-toggle";
    toggle.setAttribute("aria-controls", "review-panel");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = '<span class="review-tag">Internal</span>' +
      "<span>" + esc(counts.open ? counts.open + " to confirm" : "Nothing to confirm") + "</span>";

    var panel = document.createElement("aside");
    panel.className = "review-panel";
    panel.id = "review-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "review-title");
    panel.hidden = true;
    panel.innerHTML = panelHtml(counts);

    document.body.appendChild(toggle);
    document.body.appendChild(panel);

    /* Open or closed survives a reload in the same tab: a republish reloads
       open previews, and a reviewer should not lose the list mid-read. */
    function remember(open) {
      try {
        if (open) window.sessionStorage.setItem(OPEN_KEY, "1");
        else window.sessionStorage.removeItem(OPEN_KEY);
      } catch (e) { /* storage unavailable: the panel just starts closed */ }
    }

    function setOpen(open, moveFocus) {
      panel.hidden = !open;
      toggle.hidden = open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      remember(open);
      if (moveFocus === false) return;
      if (open) panel.querySelector(".review-title").focus();
      else toggle.focus();
    }

    toggle.addEventListener("click", function () { setOpen(true); });
    panel.querySelector(".review-close").addEventListener("click", function () { setOpen(false); });

    /* Capture phase, so this runs before app.js closes its modal: while a
       site modal is open, Escape belongs to the modal. */
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || panel.hidden) return;
      if (document.querySelector(".modal-backdrop")) return;
      setOpen(false);
    }, true);

    var reopen = false;
    try { reopen = window.sessionStorage.getItem(OPEN_KEY) === "1"; } catch (e) { reopen = false; }
    if (reopen) setOpen(true, false);
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
