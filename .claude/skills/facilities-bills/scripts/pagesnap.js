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
  sleep(ms) { return new Promise(r => setTimeout(r, ms)); },
  async waitFor(pred, timeout = 30000) {
    const t0 = Date.now();
    while (Date.now() - t0 < timeout) { try { if (pred()) return true; } catch (e) {} await this.sleep(250); }
    return false;
  },
  main() { return document.querySelector('main') || document.body; },
  text() { return (this.main()?.innerText || '').replace(/\s+/g, ' '); },
  norm(s) { return String(s).replace(/[\s  ]+/g, ''); },
  async go(path, pred, settle = 800) {
    history.pushState({}, '', path);
    dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    await this.sleep(300);
    const ok = await this.waitFor(pred || (() => true));
    await this.sleep(settle);
    return ok;
  },
  cssStr(s) { return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ') + '"'; },
  // meta: {folder, sub, name, title, header, url, landscape}
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
    const clone = document.documentElement.cloneNode(true);
    for (const el of marks) { el.removeAttribute('data-ps-x'); el.removeAttribute('data-ps-fixed'); el.removeAttribute('data-ps-mh'); }
    [...clone.querySelectorAll('style')].forEach((s, i) => { if (styleTexts[i] != null) s.textContent = styleTexts[i]; });
    clone.querySelectorAll('#ps-dl, script, iframe, noscript, link[rel="preload"], link[rel="modulepreload"], link[rel="prefetch"], link[rel="manifest"]').forEach(e => e.remove());
    const cssHrefs = [];
    clone.querySelectorAll('link[rel="stylesheet"]').forEach(l => {
      const abs = new URL(l.getAttribute('href'), location.href).href; l.setAttribute('href', abs); cssHrefs.push(abs);
    });
    clone.querySelectorAll('a[href]').forEach(a => { try { a.setAttribute('href', new URL(a.getAttribute('href'), location.href).href); } catch (e) {} });
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
    this.pages.push({ ...meta, printedAt, cssHrefs, html });
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
      log: j.log, queued: this.pages.length, path: location.pathname });
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
  download(filename) {
    const blob = new Blob([JSON.stringify({ v: 1, pages: this.pages })], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    const n = this.pages.length; this.pages = [];
    return n;
  },
});
'pagesnap ready';
