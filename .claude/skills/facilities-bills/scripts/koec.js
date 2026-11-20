// Київобленерго provider helpers for pagesnap (paste right after pagesnap.js, same javascript_tool call).
// Cabinet: https://ok.koec.com.ua/home/ of ТОВ «Київська обласна ЕК» (brand ONDO); Rails, jQuery UJS.
// Card: references/koec.md.
//
// acc = the entry of references/koec-accounts.json → {folder, account_number, account_path, address}
// Choose the account first (load https://ok.koec.com.ua<account_path>), then open a FRESH tab on
// https://ok.koec.com.ua/home/payments, paste, and run in the background:
//   __ps.start(async log => { await __ps.eRun(ACC, ['2026', '2025'], log); log.push({ assets: await __ps.collectAssets() }); })
// then poll __ps.status().
//
// - The site forbids frames (CSP frame-ancestors 'none'), so everything happens in this page. The
//   year tabs of «Історія платежів» are remote links: they update the page in place (the address
//   changes by pushState), so this script and its queue survive.
// - «Довідка про розрахунки» comes as the site's own PDF (/home/state.pdf?f[year]=Y), fetched in the
//   page and shipped in the bundle as is (fetchFile): no browser download, no prompt.
Object.assign(window.__ps, {
  E_ORIGIN: 'https://ok.koec.com.ua',
  // Fixed side menu and top bar print where they stand. Desktop layout from 1200 px: print media
  // queries see 718 px ÷ scale, so 0.55 (about 1305 px). Highcharts draws fixed-size SVG at the
  // screen's width; the extra CSS lets it shrink to the printed column.
  E_PRINT: { landscape: false, scale: 0.55, media: 'screen', fixed: 'absolute',
    css: 'svg.highcharts-root { width: 100% !important; height: auto !important; } .highcharts-container { width: 100% !important; height: auto !important; overflow: visible !important; }' },
  E_REMOVE: ['.gototop', '#wait-message', '.ajax-progress'],
  // the account in the top bar («№ 000400843314», with a non-breaking space after №)
  eActive() { const m = (document.querySelector('.user_abcode') || document.querySelector('#meta-nav') || document.body).textContent.match(/№\s*(\d{12})/); return m ? m[1] : null; },
  eBusy() { return /Завантажую/.test(document.body.innerText); },
  // the year tab that is not a link is the one shown
  eActiveYear() {
    const el = [...document.querySelectorAll('span, li, strong, b')].find(e => /^20\d\d$/.test(e.innerText.trim()) && e.children.length === 0);
    return el ? el.innerText.trim() : null;
  },
  // the expanded year group in the payments table, its payment rows and its total
  eTable() {
    const rows = [...(document.querySelector('table')?.querySelectorAll('tr') || [])].map(r => r.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean);
    return { group: rows.find(r => /^20\d\d$/.test(r)) || null, payments: rows.filter(r => /^\d+\. \d\d\.\d\d\.\d{4}/.test(r)), total: rows.find(r => /^Всього:/.test(r)) || null };
  },
  // Polls instead of waiting on DOM mutations: «Завантажую…» is hidden by a style change, which a
  // childList observer never sees (a 2026 wait timed out with every condition true). The tab is
  // in front during a run, so timers are not throttled.
  async eYear(y) {
    y = String(y);
    if (this.eActiveYear() !== y) {
      const a = document.querySelector(`a.payment_year_${y}`);
      if (!a) return false;
      a.click();
    }
    const ready = () => this.eActiveYear() === y && !this.eBusy() && this.eTable().group === y
      && [...document.querySelectorAll('.highcharts-title')].some(t => t.textContent.includes(`за ${y} рік`));
    const t0 = Date.now();
    while (!ready() && Date.now() - t0 < 20000) await this.sleep(300);
    await this.sleep(800);  // let the charts settle
    return ready();
  },
  async eRun(acc, years, log) {
    if (location.origin !== this.E_ORIGIN || location.pathname !== '/home/payments') { log.push({ error: `open ${this.E_ORIGIN}/home/payments first` }); return; }
    if (this.eActive() !== acc.account_number) { log.push({ error: `active account is ${this.eActive()}: load ${this.E_ORIGIN}${acc.account_path} first` }); return; }
    if (window.Highcharts) Highcharts.setOptions({ chart: { animation: false }, plotOptions: { series: { animation: false } } });
    await this.waitFor(() => !this.eBusy() && this.eActiveYear(), 20000);
    for (const y of years) {
      if (!(await this.eYear(y))) { log.push({ y, error: 'year did not load' }); continue; }
      const t = this.eTable();
      const wrong = t.payments.filter(r => !r.match(/^\d+\. \d\d\.\d\d\.(\d{4})/)[1].startsWith(String(y)));
      if (wrong.length) { log.push({ y, error: 'payments from another year', wrong }); continue; }
      this.snap({ folder: acc.folder, sub: '', ...this.E_PRINT, remove: this.E_REMOVE,
        name: `Київобленерго - ${acc.folder} - Історія платежів ${y}`,
        title: `Київобленерго — Історія платежів ${y} — ${acc.folder}`,
        header: `Київобленерго · Історія платежів · ${y} рік · о/р ${acc.account_number} · ${acc.address}`,
        url: this.E_ORIGIN + '/home/payments' });
      log.push({ y, payments: t.payments.length, total: t.total });
    }
    for (const y of years) {
      try {
        const bytes = await this.fetchFile(`/home/state.pdf?f%5Byear%5D=${y}`,
          { folder: acc.folder, sub: '', name: `Київобленерго - ${acc.folder} - Довідка про розрахунки ${y}` });
        log.push({ y, statePdf: bytes });
      } catch (e) { log.push({ y, error: String(e) }); }
    }
  },
});
'koec helpers ready';
