// Київтеплоенерго provider helpers for pagesnap (paste right after pagesnap.js, same javascript_tool call).
// Cabinet: https://kte.kmda.gov.ua/my-cabinet/userhome_new (Drupal 7, server-rendered). Card: references/kte.md.
//
// acc = one entry of references/kte-accounts.json → {folder, account_number, cabinet_id, address}
// Open a FRESH tab on /my-cabinet/userhome_new and run everything in the background:
//   __ps.start(async log => { await __ps.kRun(ACCOUNTS, ['2026', '2025'], log); log.push({ assets: await __ps.collectAssets() }); })
// then poll __ps.status().
//
// - The status page («Мої особові рахунки») shows every account at once: it is printed once per
//   apartment folder, same content.
// - «Звіт про оплати» is one server page per account. A full navigation would wipe this script and
//   its queue, so each account's report page is opened in a same-origin iframe over this page and
//   printed from there (snap(meta, iframeDocument)).
// - The report form is Drupal AJAX bound to the button's mousedown. The answer replaces
//   #oborot-tables-wrapper; jQuery's request counter ($.active) says the request is over.
Object.assign(window.__ps, {
  K_ORIGIN: 'https://kte.kmda.gov.ua',
  K_HOME: '/my-cabinet/userhome_new',
  kReportPath(id) { return `/my-cabinet/personal_account/oborot_info_new/${id}`; },
  // «Послуга» select value · the caption the report prints · the name used in file names
  K_SERVICES: [
    { id: '3', caption: 'Гаряча вода', file: 'Гаряча вода' },
    { id: '5', caption: 'Теплова енергія', file: 'Теплова енергія' },
    { id: '13', caption: 'Плата за абонентське обслуговування ГВ', file: 'Абонплата ГВ' },
    { id: '11', caption: 'Плата за абонентське обслуговування ТЕ', file: 'Абонплата ТЕ' },
  ],
  K_REMOVE: ['.ajax-progress'],
  // Bootstrap 3 site: at A4 width (about 720 px) it falls to its phone layout; scale 0.7 lays the
  // page out at about 1030 px, the desktop grid
  K_PRINT: { landscape: false, scale: 0.7 },
  kToday() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  },
  // Full size and on screen: a hidden or tiny frame lays the page out differently.
  async kFrame(path) {
    document.getElementById('ps-frame')?.remove();
    const fr = document.createElement('iframe');
    fr.id = 'ps-frame';
    fr.style.cssText = 'position:absolute;left:0;top:0;width:1280px;height:1000px;border:0;background:#fff;z-index:2147483646';
    const loaded = new Promise(res => fr.addEventListener('load', () => res(true), { once: true }));
    fr.src = path;
    document.body.appendChild(fr);
    await Promise.race([loaded, this.sleep(60000)]);
    return fr;
  },
  kRows(d) {
    const wr = d.querySelector('#oborot-tables-wrapper');
    return wr ? [...wr.querySelectorAll('tbody tr')].map(r => r.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean) : [];
  },
  kCaption(d) {
    const h = d.querySelector('#oborot-tables-wrapper h3') || [...d.querySelectorAll('h3')].find(x => /^Послуга:/.test(x.innerText.trim()));
    return h ? h.innerText.replace(/\s+/g, ' ').trim() : '';
  },
  // Set service and period (Січень–Грудень of y), press «Сформувати», wait for the answer, then check
  // the caption and that every month row is from y. Returns 'ok', 'empty' or what went wrong.
  async kReport(fr, svc, y) {
    const w = fr.contentWindow, d = fr.contentDocument, $ = w && w.jQuery;
    const form = d && d.querySelector('#send-counters-oborotsaldo-ajax-form');
    if (!form || !$) return 'no report form';
    const pick = (name, v) => {
      const s = form.querySelector(`select[name="${name}"]`);
      if (!s || ![...s.options].some(o => o.value === v)) return false;
      s.value = v;
      return s.value === v;
    };
    if (!pick('service[name]', svc.id)) return `service ${svc.id} not offered`;
    if (!(pick('filter[datebegin][month]', '01') && pick('filter[datebegin][year]', String(y))
      && pick('filter[dateend][month]', '12') && pick('filter[dateend][year]', String(y)))) return `year ${y} not offered`;
    const btn = d.querySelector('#edit-filter-actions-load');
    if (!btn) return 'no «Сформувати» button';
    // Drupal 7 reports an AJAX error with alert(), which would block this page and the extension
    delete fr.dataset.alert;
    w.alert = msg => { fr.dataset.alert = String(msg).slice(0, 300); };
    const old = d.querySelector('#oborot-tables-wrapper');
    $(btn).trigger('mousedown');
    const ok = await this.waitFor(() => {
      if (fr.dataset.alert) return true;
      const wr = d.querySelector('#oborot-tables-wrapper');
      if (!wr || wr === old || $.active !== 0) return false;
      const cs = w.getComputedStyle(wr);
      return cs.display !== 'none' && cs.opacity === '1';
    }, 30000, d.documentElement, true);
    if (fr.dataset.alert) return 'site error: ' + fr.dataset.alert;
    if (!ok) return 'no answer in 30 s';
    await this.tick(10);
    const cap = this.kCaption(d);
    if (cap !== 'Послуга: ' + svc.caption) return 'caption ' + JSON.stringify(cap);
    const rows = this.kRows(d);
    if (!rows.length) return 'empty';
    const years = rows.map(r => (r.match(/^(\d{1,2}) (\d{4})\b/) || [])[2] || '?');
    const other = [...new Set(years.filter(x => x !== String(y)))];
    return other.length ? 'rows from other years ' + other.join(',') : 'ok';
  },
  // accounts: entries of kte-accounts.json; years: ['2026', '2025']; services default to the four reports
  async kRun(accounts, years, log, services = this.K_SERVICES) {
    if (location.pathname !== this.K_HOME) { log.push({ error: `open ${this.K_ORIGIN}${this.K_HOME} first` }); return; }
    const home = document.body.innerText.replace(/\s+/g, ' ');
    const missing = accounts.filter(a => !home.includes('Особовий рахунок: ' + a.account_number)).map(a => a.account_number);
    if (missing.length) { log.push({ error: 'accounts not on the status page (logged out, or the list changed)', missing }); return; }
    const day = this.kToday();
    for (const acc of accounts) {
      this.snap({ folder: acc.folder, sub: '', ...this.K_PRINT, remove: this.K_REMOVE,
        name: `Київтеплоенерго - Усі адреси - Стан оплат ${day}`,
        title: `Київтеплоенерго — Стан оплат усіх адрес — ${day}`,
        header: `Київтеплоенерго · Мої особові рахунки · стан оплат усіх адрес на ${day}`,
        url: this.K_ORIGIN + this.K_HOME });
    }
    log.push({ status: day, copies: accounts.length });
    for (const acc of accounts) {
      const fr = await this.kFrame(this.kReportPath(acc.cabinet_id));
      const d = fr.contentDocument;
      const t = d && d.body ? d.body.innerText.replace(/\s+/g, ' ') : '';
      if (!t.includes('Особовий рахунок: ' + acc.account_number)) {
        log.push({ acct: acc.account_number, error: 'report page did not open (logged out?)' });
        fr.remove();
        continue;
      }
      for (const y of years) {
        for (const svc of services) {
          const state = await this.kReport(fr, svc, y);
          if (state !== 'ok') { log.push({ acct: acc.account_number, y, svc: svc.file, [state === 'empty' ? 'skipped' : 'error']: state }); continue; }
          this.snap({ folder: acc.folder, sub: '', ...this.K_PRINT, remove: this.K_REMOVE,
            name: `Київтеплоенерго - ${acc.folder} - Звіт про оплати - ${svc.file} ${y}`,
            title: `Київтеплоенерго — Звіт про оплати — ${svc.file} ${y} — ${acc.folder}`,
            header: `Київтеплоенерго · Звіт про оплати · ${svc.file} · ${y} рік · о/р ${acc.account_number} · ${acc.address}`,
            url: this.K_ORIGIN + this.kReportPath(acc.cabinet_id) }, d);
          log.push({ acct: acc.account_number, y, svc: svc.file, rows: this.kRows(d).length });
        }
      }
      fr.remove();
    }
  },
});
'kte helpers ready';
