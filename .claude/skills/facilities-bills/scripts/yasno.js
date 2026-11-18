// Yasno provider helpers for pagesnap (paste right after pagesnap.js, same javascript_tool call).
// Cabinet: https://yasno.ua/my/ (a single-page app). Page map and quirks: references/yasno.md.
//
// acc  = one entry of references/yasno-accounts.json → {folder, account_id, account_number, address, match}
// plan = {historyYears: ['2026'], bookYears: ['2026'], receiptYears: ['2025','2026'], have: ['<existing receipt name>', ...]}
// Start a whole account in the background:  __ps.start(log => __ps.yRun(acc, plan, log))
// then poll __ps.status() every ~10 s until done.
Object.assign(window.__ps, {
  Y_MONTHS: { 'січ': '01', 'лют': '02', 'бер': '03', 'квіт': '04', 'трав': '05', 'черв': '06',
              'лип': '07', 'серп': '08', 'вер': '09', 'жовт': '10', 'лист': '11', 'груд': '12' },
  Y_CARD: 'main a[href*="/my/payments/"]',
  // "9 вер 2026 397.44 ₴" / "15 лип 2026 1 395.36 ₴" → {date: '2026-09-09', amount: '397.44', ...}
  yParseCard(a) {
    const t = a.innerText.replace(/[\s  ]+/g, ' ').trim();
    const d = t.match(/(\d{1,2}) ([а-яіїєґ']+)\.? (20\d\d)/i);
    // match the amount only after the date, or the year's digits leak into it ("2026 397.44")
    const m = (d ? t.slice(d.index + d[0].length) : t).match(/(-?\d[\d ]*[.,]\d{2}) ?₴/);
    const path = a.getAttribute('href').split('?')[0];
    return {
      id: path.split('/').pop(), path, raw: t,
      dateText: d ? d[0] : null,
      date: d ? `${d[3]}-${this.Y_MONTHS[d[2].toLowerCase()] || '??'}-${d[1].padStart(2, '0')}` : null,
      year: d ? d[3] : null,
      amount: m ? m[1].replace(/ /g, '').replace(',', '.') : null,
    };
  },
  yPayments() { return [...document.querySelectorAll(this.Y_CARD)].map(a => this.yParseCard(a)); },
  // History loads 40 payments per scroll. Stop once the oldest loaded one is older than minYear
  // (or the count stops growing). A background tab loads slowly, hence the patient stop rule.
  async yLoadPayments(minYear) {
    let prev = -1, stable = 0;
    for (let i = 0; i < 80 && stable < 4; i++) {
      const cards = document.querySelectorAll(this.Y_CARD);
      const n = cards.length;
      const oldest = n ? this.yParseCard(cards[n - 1]).year : null;
      if (minYear && oldest && Number(oldest) < Number(minYear)) break;
      stable = n === prev ? stable + 1 : 0; prev = n;
      window.scrollTo(0, document.body.scrollHeight);
      await this.sleep(1500);
    }
    window.scrollTo(0, 0);
    return document.querySelectorAll(this.Y_CARD).length;
  },
  // The history page has no year filter: a year's print hides the other years' rows.
  // Each child of the list holds one payment card; a month's first card also holds the month label.
  yRow(a) { return a.closest('[class*="_list"] > *') || a.parentElement; },
  yFilterYear(year) {
    for (const a of document.querySelectorAll(this.Y_CARD)) this.yRow(a).style.display = this.yParseCard(a).year === String(year) ? '' : 'none';
  },
  yUnfilter() { for (const a of document.querySelectorAll(this.Y_CARD)) this.yRow(a).style.display = ''; },
  // Stable receipt names: numbered oldest-first, so a later payment never renames an older file.
  yNames(acc, list) {
    const seen = {}, out = new Map();
    for (const p of [...list].reverse()) {
      const base = `Yasno - ${acc.folder} - платіж ${p.date} ${p.amount} грн`;
      seen[base] = (seen[base] || 0) + 1;
      out.set(p.id, seen[base] > 1 ? `${base} (${seen[base]})` : base);
    }
    return out;
  },
  dmy(iso) { const [y, m, d] = iso.split('-'); return `${d}.${m}.${y}`; },
  async yHistory(acc, years, minYear) {
    // history → history with another accountId keeps the mounted list: leave the route first
    if (location.pathname === '/my/payments/history') await this.go('/my', () => true, 500);
    const ok = await this.go('/my/payments/history?accountId=' + acc.account_id,
      () => this.text().includes(acc.match) && document.querySelectorAll(this.Y_CARD).length > 0);
    if (!ok) return { error: 'history did not render' };
    const total = await this.yLoadPayments(minYear);
    for (const y of years) {
      this.yFilterYear(y);
      await this.sleep(300);
      this.snap({ folder: acc.folder, sub: '', name: `Yasno - ${acc.folder} - Історія платежів ${y}`,
        title: `Yasno — Історія платежів ${y} — ${acc.folder}`,
        header: `Yasno · Історія платежів · ${y} рік · о/р ${acc.account_number} · ${acc.address}`,
        url: 'https://yasno.ua/my/payments/history' });
      this.yUnfilter();
    }
    return { total, list: this.yPayments() };
  },
  async yReceipt(acc, p, name) {
    const want = [this.norm(p.amount) + '₴', this.norm(p.dateText), 'Деталіплатежу'];
    const ok = await this.go(p.path, () => location.pathname === p.path && want.every(w => this.norm(this.text()).includes(w)));
    if (!ok) return false;
    const acct = (this.text().match(/Світло\s*(\d{6,})/) || [])[1] || acc.account_number;
    this.snap({ folder: acc.folder, sub: 'Yasno - платежі', name,
      title: `Yasno — Платіж ${this.dmy(p.date)} — ${p.amount} грн`,
      header: `Yasno · Платіж ${this.dmy(p.date)} · ${p.amount} грн · о/р ${acct} · ${acc.address}`,
      url: 'https://yasno.ua' + p.path });
    return true;
  },
  async yAccountBook(acc, years) {
    const ok = await this.go(`/my/account-book?accountId=${acc.account_id}&accountNumber=${acc.account_number}`,
      () => this.text().includes('Абонентська книжка') && /\d{4} рік/.test(this.text()));
    if (!ok) return ['account book did not render'];
    const done = [];
    for (const y of years) {
      const tab = [...document.querySelectorAll('main button')].find(x => x.textContent.trim() === String(y));
      if (!tab) { done.push(y + ': no tab'); continue; }
      tab.click();
      const shown = await this.waitFor(() => this.text().includes(`${y} рік`)
        && !this.text().includes(`${Number(y) + 1} рік`) && !this.text().includes(`${Number(y) - 1} рік`));
      await this.sleep(600);
      // landscape: the 7-column table is clipped at portrait width
      this.snap({ folder: acc.folder, sub: '', landscape: true, name: `Yasno - ${acc.folder} - Абонентська книжка ${y}`,
        title: `Yasno — Абонентська книжка ${y} — ${acc.folder}`,
        header: `Yasno · Абонентська книжка · ${y} рік · о/р ${acc.account_number} · ${acc.address}`,
        url: 'https://yasno.ua/my/account-book' });
      done.push(y + (shown ? '' : ': year filter not confirmed'));
    }
    return done;
  },
  async yRun(acc, plan, log) {
    const years = [...new Set([...plan.historyYears, ...plan.receiptYears])].map(Number);
    const h = await this.yHistory(acc, plan.historyYears, Math.min(...years));
    if (h.error) { log.push({ folder: acc.folder, error: h.error }); return; }
    const names = this.yNames(acc, h.list);
    const have = new Set(plan.have || []);
    const todo = h.list.filter(p => plan.receiptYears.includes(p.year) && !have.has(names.get(p.id)));
    log.push({ folder: acc.folder, loaded: h.total, history: plan.historyYears, receiptsToDo: todo.length });
    const failed = [];
    for (const p of todo) if (!(await this.yReceipt(acc, p, names.get(p.id)))) failed.push(p);
    const stillFailed = [];
    for (const p of failed) if (!(await this.yReceipt(acc, p, names.get(p.id)))) stillFailed.push(p.date + ' ' + p.amount);
    const book = plan.bookYears.length ? await this.yAccountBook(acc, plan.bookYears) : [];
    log.push({ folder: acc.folder, receipts: todo.length - stillFailed.length, failed: stillFailed, book });
  },
});
'yasno helpers ready';
