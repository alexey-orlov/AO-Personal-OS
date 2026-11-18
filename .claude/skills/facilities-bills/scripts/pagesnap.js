// pagesnap core — provider-agnostic. Paste this file, then the provider file (e.g. yasno.js),
// into ONE javascript_tool call on a logged-in cabinet tab. Everything lives on window.__ps.
//
// What it does: turns the page as rendered right now into a self-contained HTML snapshot
// (live CSSOM rules, scroll boxes opened, scripts stripped, a print header/footer added through
// @page margin boxes), queues it in __ps.pages, and hands the queue to Chrome's downloads as ONE
// JSON bundle that scripts/render.py prints to PDF with headless Chrome.
//
// Rules learned the hard way (see references/decisions.md):
// - javascript_tool drops calls that run longer than ~15-20 s: long work goes through start()
//   (a background job in the page) and is polled with status().
// - go() navigates the app's router with pushState+popstate, so this script survives page
//   changes; a full reload (the navigate tool) wipes it and it must be pasted again.
// - A download needs a real click: button() puts a button on the page; click it with the
//   extension's click by ref. Snapshots never include that button.
window.__ps = window.__ps || { pages: [] };
Object.assign(window.__ps, {
  // A hidden tab (another tab in front, window covered) gets its timers throttled to about one
  // wake-up per minute, so nothing here polls on setTimeout: waits react to DOM mutations, pauses
  // are MessageChannel turns (the app's React scheduler uses those too and keeps rendering), and
  // setTimeout is only the give-up backstop. Things that need painting (requestAnimationFrame,
  // IntersectionObserver, e.g. infinite scroll) still stall while hidden: see status().vis.
  sleep(ms) { return new Promise(r => setTimeout(r, ms)); },
  tick(n = 10) {
    return new Promise(resolve => {
      const ch = new MessageChannel();
      let left = n;
      ch.port1.onmessage = () => { if (--left <= 0) { ch.port1.close(); resolve(); } else ch.port2.postMessage(0); };
      ch.port2.postMessage(0);
    });
  },
  waitFor(pred, timeout = 30000) {
    return new Promise(resolve => {
      let done = false, obs = null, timer = null;
      const finish = v => { if (done) return; done = true; if (obs) obs.disconnect(); clearTimeout(timer); resolve(v); };
      const check = () => { try { if (pred()) finish(true); } catch (e) {} };
      obs = new MutationObserver(check);
      obs.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
      timer = setTimeout(() => { check(); finish(false); }, timeout);
      check();
    });
  },
  main() { return document.querySelector('main') || document.body; },
  text() { return (this.main()?.innerText || '').replace(/\s+/g, ' '); },
  norm(s) { return String(s).replace(/[\s  ]+/g, ''); },
  // pred must recognise the NEW page (e.g. its pathname plus content unique to it), or it can
  // match the page being left.
  async go(path, pred) {
    history.pushState({}, '', path);
    dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    await this.tick(5);
    const ok = await this.waitFor(pred || (() => true));
    await this.tick(30);
    return ok;
  },
  cssStr(s) { return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ') + '"'; },
  // meta: {folder, sub, name, title, header, url, landscape, remove: [css selectors]}
  // folder/sub/name = where render.py writes the PDF: OUT/<folder>/<sub>/<name>.pdf
  snap(meta) {
    const marks = [];
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (/(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 4) { el.setAttribute('data-ps-x', ''); marks.push(el); }
      if (cs.position === 'fixed' || cs.position === 'sticky') { el.setAttribute('data-ps-fixed', ''); marks.push(el); }
      // min-height: 100vh wrappers push an empty extra page into the print
      if (parseFloat(cs.minHeight) >= innerHeight * 0.5) { el.setAttribute('data-ps-mh', ''); marks.push(el); }
    }
    // CSS-in-JS rules can live only in the CSSOM (empty <style> text): serialize the sheets
    const styleTexts = [...document.querySelectorAll('style')].map(s => {
      try { return [...s.sheet.cssRules].map(r => r.cssText).join('\n'); } catch (e) { return null; }
    });
    const liveFields = [...document.querySelectorAll('input, textarea, select')];
    // URLs as the browser resolved them: <base href="/"> (Angular) makes attribute + location.href
    // wrong (a stylesheet resolved under /dashboard/ came back as the app's index.html)
    const liveLinks = [...document.querySelectorAll('link[rel="stylesheet"]')].map(l => l.href);
    const liveAnchors = [...document.querySelectorAll('a[href]')].map(a => a.href);
    const liveImgs = [...document.querySelectorAll('img')].map(i => i.currentSrc || i.src);
    const clone = document.documentElement.cloneNode(true);
    for (const el of marks) { el.removeAttribute('data-ps-x'); el.removeAttribute('data-ps-fixed'); el.removeAttribute('data-ps-mh'); }
    [...clone.querySelectorAll('style')].forEach((s, i) => { if (styleTexts[i] != null) s.textContent = styleTexts[i]; });
    // cloneNode copies attributes, not what is typed or picked: a filter field (the period of a
    // statement!) would print blank. Copy the live values in before anything is removed.
    [...clone.querySelectorAll('input, textarea, select')].forEach((c, i) => {
      const el = liveFields[i];
      if (!el) return;
      if (el.tagName === 'TEXTAREA') c.textContent = el.value;
      else if (el.tagName === 'SELECT') [...c.options].forEach((o, j) => o.toggleAttribute('selected', !!el.options[j]?.selected));
      else if (el.type === 'checkbox' || el.type === 'radio') c.toggleAttribute('checked', el.checked);
      else c.setAttribute('value', el.value);
    });
    const cssHrefs = [];
    [...clone.querySelectorAll('link[rel="stylesheet"]')].forEach((l, i) => { l.setAttribute('href', liveLinks[i]); cssHrefs.push(liveLinks[i]); });
    [...clone.querySelectorAll('a[href]')].forEach((a, i) => { if (liveAnchors[i]) a.setAttribute('href', liveAnchors[i]); });
    // images: a placeholder the renderer swaps for the data: URI collectAssets fetched in the page
    // (some servers refuse headless Chrome), or back to the plain URL
    const imgs = {};
    [...clone.querySelectorAll('img')].forEach((img, i) => {
      const src = liveImgs[i];
      img.removeAttribute('srcset');
      if (!src || src.startsWith('data:')) return;
      const key = 'ps-img:' + Object.keys(imgs).length;
      imgs[key] = src; img.setAttribute('src', key);
    });
    // relative url() in inline <style> resolve against the page, not against the file the renderer opens
    clone.querySelectorAll('style').forEach(s => {
      s.textContent = s.textContent.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (all, q, u) => {
        if (/^(data:|#|%23|[a-z]+:)/i.test(u)) return all;
        try { return `url("${new URL(u, document.baseURI).href}")`; } catch (e) { return all; }
      });
    });
    clone.querySelectorAll('#ps-dl, base, script, iframe, noscript, link[rel="preload"], link[rel="modulepreload"], link[rel="prefetch"], link[rel="manifest"]').forEach(e => e.remove());
    // provider widgets that are not part of the document (chat bubbles, toasts, open pickers)
    if (meta.remove && meta.remove.length) clone.querySelectorAll(meta.remove.join(',')).forEach(e => e.remove());
    const head = clone.querySelector('head');
    let title = head.querySelector('title');
    if (!title) { title = document.createElement('title'); head.appendChild(title); }
    title.textContent = meta.title;
    const printedAt = new Date().toLocaleString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const box = 'font: 7.5pt Arial, sans-serif; color: #555;';
    const st = document.createElement('style');
    st.id = 'ps-print';
    st.textContent = `@page { size: A4${meta.landscape ? ' landscape' : ''}; margin: 14mm 10mm 13mm 10mm;
  @top-left { content: ${this.cssStr(printedAt)}; ${box} }
  @top-center { content: ${this.cssStr(meta.header)}; ${box} }
  @bottom-left { content: ${this.cssStr(meta.url)}; ${box} }
  @bottom-right { content: counter(page) "/" counter(pages); ${box} } }
html, body { height: auto !important; min-height: 0 !important; overflow: visible !important; }
[data-ps-x] { overflow: visible !important; height: auto !important; max-height: none !important; }
[data-ps-fixed] { position: static !important; }
[data-ps-mh] { min-height: 0 !important; }`;
    head.appendChild(st);
    const html = '<!doctype html>\n' + clone.outerHTML;
    this.pages.push({ ...meta, printedAt, cssHrefs, imgs, html });
    return { name: meta.name, kb: Math.round(html.length / 1024), queued: this.pages.length };
  },
  // Background job: long loops must not run inside one javascript_tool call.
  start(fn) {
    const job = this.job = { done: false, log: [], err: null, t0: Date.now() };
    (async () => {
      try { await fn(job.log); } catch (e) { job.err = String((e && e.stack) || e); }
      job.done = true;
    })();
    return 'started';
  },
  status() {
    const j = this.job || {};
    return JSON.stringify({ done: j.done, err: j.err, secs: Math.round((Date.now() - (j.t0 || Date.now())) / 1000),
      vis: document.visibilityState, log: j.log, queued: this.pages.length, path: location.pathname });
  },
  button(file) {
    let b = document.getElementById('ps-dl');
    if (!b) {
      b = document.createElement('button'); b.id = 'ps-dl'; b.textContent = 'pagesnap download';
      b.style.cssText = 'position:fixed;left:8px;bottom:8px;z-index:2147483647;padding:10px 14px;background:#222;color:#fff;border-radius:8px;font:14px sans-serif';
      b.onclick = () => { b.dataset.n = String(this.download(b.dataset.file)); };
      document.body.appendChild(b);
    }
    b.dataset.file = file; b.dataset.n = '';
    return JSON.stringify({ queued: this.pages.length, file });
  },
  // Stylesheets and the fonts/images they point to, fetched inside the logged-in page and shipped
  // in the bundle: some cabinets answer 403 to anything that is not their own browser session.
  // Call before button(): await __ps.collectAssets()  (defaults to every sheet the queued pages use).
  async collectAssets(hrefs) {
    this.assets = this.assets || {};
    const want = [...new Set(hrefs || this.pages.flatMap(p => p.cssHrefs || []))].filter(h => !(h in this.assets));
    const urlRe = /url\(\s*(['"]?)([^'")]+)\1\s*\)/g;
    for (const href of want) {
      let text = null;
      try { const r = await fetch(href, { credentials: 'include' }); if (r.ok) text = await r.text(); } catch (e) {}
      if (text == null) { this.assets[href] = null; continue; }  // render.py will fetch it itself
      const map = {};
      for (const u of new Set([...text.matchAll(urlRe)].map(m => m[2]).filter(u => !/^(data:|#|%23)/.test(u)))) {
        const abs = new URL(u, href).href;
        map[u] = abs;
        try {
          const r = await fetch(abs, { credentials: 'include' });
          const b = r.ok ? await r.blob() : null;
          if (b && b.size < 2000000) map[u] = await new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(b); });
        } catch (e) {}
      }
      this.assets[href] = text.replace(urlRe, (all, q, u) => (map[u] ? `url("${map[u]}")` : all));
    }
    for (const src of new Set(this.pages.flatMap(p => Object.values(p.imgs || {})))) {
      if (src in this.assets) continue;
      this.assets[src] = null;
      try {
        const r = await fetch(src, { credentials: 'include' });
        const b = r.ok ? await r.blob() : null;
        if (b && b.size < 2000000) this.assets[src] = await new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(b); });
      } catch (e) {}
    }
    return Object.keys(this.assets).filter(h => this.assets[h]).length;
  },
  download(filename) {
    const blob = new Blob([JSON.stringify({ v: 2, pages: this.pages, assets: this.assets || {} })], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    const n = this.pages.length; this.pages = [];
    return n;
  },
});
'pagesnap ready';
