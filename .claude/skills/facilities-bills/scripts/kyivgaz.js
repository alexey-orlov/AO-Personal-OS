// Київгаз provider helpers for pagesnap (paste right after pagesnap.js, same javascript_tool call).
// Cabinet: https://cabinet.kyivgaz.ua (server-rendered, jQuery). Card: references/kyivgaz.md.
//
// acc = one entry of references/kyivgaz-accounts.json → {folder, account_number, address}
// Open a FRESH tab on https://cabinet.kyivgaz.ua/accrual-and-payment and run in the background:
//   __ps.start(async log => { await __ps.gRun(ACCOUNTS, ['2026', '2025'], log); log.push({ assets: await __ps.collectAssets() }); })
// then poll __ps.status().
//
// - One login holds several особові рахунки, but the cabinet shows one at a time: the "active"
//   one, switched by the account menu's GET /change-active-account/<id>. gRun switches inside a
//   frame and switches back at the end to the account that was active when it started.
// - «Рахунки та оплати» filters by year with plain GET forms (filter[year] for the gas
//   distribution bills, filter[toVbsgYear] for the building's ТО ВБСГ bills), so every year is a
//   page load: the frame loads the form's own URL with both years set.
Object.assign(window.__ps, {
  G_ORIGIN: 'https://cabinet.kyivgaz.ua',
  G_PAGE: '/accrual-and-payment',
  // The top bar and the side menu are position: fixed, so they print where they stand. The two
  // card columns need the width: A4 landscape at 0.65 lays the page out about 1600 px wide.
  G_PRINT: { landscape: true, scale: 0.65, fixed: 'absolute' },
  G_REMOVE: ['.preloader', '.modal'],
  // the account in the top-left corner (a link to "/" that reads "<10 digits> <address>")
  gActive(doc) {
    const a = [...doc.querySelectorAll('a')].find(x => x.getAttribute('href') === '/' && /\d{10}/.test(x.innerText));
    return a ? a.innerText.match(/\d{10}/)[0] : null;
  },
  gSwitchPath(doc, acct) {
    const a = [...doc.querySelectorAll('a[href*="/change-active-account/"]')].find(x => x.innerText.includes(acct));
    return a ? new URL(a.href).pathname : null;
  },
  gYearPath(doc, y) {
    const sel = doc.getElementById('filter[year]');
    if (!sel || ![...sel.options].some(o => o.value === String(y))) return null;
    const fd = new FormData(sel.form);
    fd.set('filter[year]', String(y));
    const vb = doc.getElementById('filter[toVbsgYear]');
    if (vb && [...vb.options].some(o => o.value === String(y))) fd.set('filter[toVbsgYear]', String(y));
    return this.G_PAGE + '?' + new URLSearchParams(fd).toString();
  },
  // rows per card, e.g. {"Рахунки": 11, "Оплати": 6, "Рахунки за ТО ВБСГ": 1, "Оплати 2": 0}
  gRows(doc) {
    const out = {};
    for (const h of doc.querySelectorAll('h3')) {
      let card = h.parentElement;
      while (card && !card.querySelector('table') && card !== doc.body) card = card.parentElement;
      let key = h.innerText.replace(/\s+/g, ' ').trim().replace(/ багатоквартирного будинку$/, '');
      while (key in out) key += ' 2';
      out[key] = card && card !== doc.body ? card.querySelectorAll('tbody tr').length : null;
    }
    return out;
  },
  // accounts: entries of kyivgaz-accounts.json; years: ['2026', '2025']
  async gRun(accounts, years, log) {
    if (location.origin !== this.G_ORIGIN) { log.push({ error: `open ${this.G_ORIGIN}${this.G_PAGE} first` }); return; }
    const start = this.gActive(document);
    if (!start) { log.push({ error: 'no account in the top bar (logged out?)' }); return; }
    for (const acc of accounts) {
      const sw = this.gSwitchPath(document, acc.account_number);
      if (!sw) { log.push({ acct: acc.account_number, error: 'account not in the account menu' }); continue; }
      await this.frame(sw);
      let d = (await this.frame(this.G_PAGE)).contentDocument;
      if (this.gActive(d) !== acc.account_number) { log.push({ acct: acc.account_number, error: `switch failed: active ${this.gActive(d)}` }); continue; }
      for (const y of years) {
        const path = this.gYearPath(d, y);
        if (!path) { log.push({ acct: acc.account_number, y, error: 'year not offered' }); continue; }
        d = (await this.frame(path)).contentDocument;
        const yearShown = d.getElementById('filter[year]')?.value;
        const vbsgShown = d.getElementById('filter[toVbsgYear]')?.value;
        if (this.gActive(d) !== acc.account_number || yearShown !== String(y)) {
          log.push({ acct: acc.account_number, y, error: `page shows ${this.gActive(d)} / ${yearShown}` });
          continue;
        }
        this.snap({ folder: acc.folder, sub: '', ...this.G_PRINT, remove: this.G_REMOVE,
          name: `Київгаз - ${acc.folder} - Рахунки та оплати ${y}`,
          title: `Київгаз — Рахунки та оплати ${y} — ${acc.folder}`,
          header: `Київгаз · Рахунки та оплати · ${y} рік · о/р ${acc.account_number} · ${acc.address}`,
          url: this.G_ORIGIN + this.G_PAGE }, d);
        log.push({ acct: acc.account_number, y, vbsgYear: vbsgShown, rows: this.gRows(d) });
      }
    }
    // leave the cabinet on the account that was active at the start
    const back = this.gSwitchPath(document, start);
    if (back) await this.frame(back);
    document.getElementById('ps-frame')?.remove();
    log.push({ restored: start });
  },
});
'kyivgaz helpers ready';
