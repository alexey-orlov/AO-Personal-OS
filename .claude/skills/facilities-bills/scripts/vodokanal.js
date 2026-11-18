// Kyivvodokanal provider helpers for pagesnap (paste right after pagesnap.js, same javascript_tool call).
// Cabinet: https://my.vodokanal.kiev.ua/dashboard/ (Angular + PrimeNG). Page map: references/vodokanal.md.
//
// acc  = one entry of references/vodokanal-accounts.json → {folder, account_number, address}
// Both pages are statements filtered by account and period; one print per account and year.
// Start everything in the background:
//   __ps.start(log => __ps.vRun(ACCOUNTS, ['2026', '2025'], log))   then poll __ps.status().
Object.assign(window.__ps, {
  V_REMOVE: ['.chat-bot-block', '.p-toast', '.p-datepicker', '.p-dropdown-panel', '.p-overlay'],
  V_PAGES: {
    invoices: { path: '/dashboard/invoices', title: 'Абонентська книжка' },
    payments: { path: '/dashboard/payments', title: 'Здійснені платежі' },
  },
  // Count in-flight XHR/fetch: a search is finished only when its request is, otherwise an empty
  // or unchanged table from the previous search can be taken for the new result.
  vHookNet() {
    if (window.__psNet) return;
    const net = window.__psNet = { inflight: 0, done: 0 };
    const send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function (...a) {
      net.inflight++;
      this.addEventListener('loadend', () => { net.inflight--; net.done++; });
      return send.apply(this, a);
    };
    const f = window.fetch;
    window.fetch = (...a) => { net.inflight++; return f(...a).finally(() => { net.inflight--; net.done++; }); };
  },
  vRows() {
    return [...document.querySelectorAll('p-table tbody > tr, .p-datatable-tbody > tr')]
      .filter(r => !r.closest('.p-datepicker'))
      .map(r => r.innerText.replace(/\s+/g, ' ').trim());
  },
  vDropdown(re) { return [...document.querySelectorAll('p-dropdown')].find(d => re.test(d.innerText.trim())); },
  async vPickAccount(acct) {
    const dd = this.vDropdown(/^(По всіх рахунках|\d{7})$/);
    if (!dd) return false;
    if (dd.innerText.trim() === acct) return true;
    dd.querySelector('.p-dropdown').click();
    if (!(await this.waitFor(() => document.querySelector('.p-dropdown-panel .p-dropdown-item'), 10000))) return false;
    const li = [...document.querySelectorAll('.p-dropdown-panel .p-dropdown-item')].find(x => x.innerText.trim() === acct);
    if (!li) return false;
    li.click();
    return this.waitFor(() => dd.innerText.trim() === acct, 10000);
  },
  vCloseCalendar() {
    const inp = document.querySelector('p-calendar input');
    inp.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
    inp.blur();
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    document.body.click();
  },
  // Абонентська книжка: a month-range picker. Open it, step the year, click Січ then Гру.
  async vMonthRange(y) {
    const inp = document.querySelector('p-calendar input');
    const want = `Січень ${y} - Грудень ${y}`;
    if (inp.value === want) return true;
    document.querySelector('p-calendar button.p-datepicker-trigger').click();
    if (!(await this.waitFor(() => document.querySelector('.p-datepicker .p-monthpicker-month'), 10000))) return false;
    for (let i = 0; i < 30; i++) {
      const cur = Number(document.querySelector('.p-datepicker .p-datepicker-year')?.innerText.trim());
      if (cur === Number(y)) break;
      document.querySelector(cur > Number(y) ? '.p-datepicker .p-datepicker-prev' : '.p-datepicker .p-datepicker-next').click();
      await this.tick(10);
    }
    document.querySelectorAll('.p-datepicker .p-monthpicker-month')[0].click();
    await this.tick(10);
    document.querySelectorAll('.p-datepicker .p-monthpicker-month')[11].click();
    await this.tick(10);
    this.vCloseCalendar();
    await this.tick(10);
    return inp.value === want;
  },
  // Здійснені платежі: a typed day range. PrimeNG ignores an input event that no keydown preceded,
  // so a synthetic keydown goes first.
  async vDayRange(y) {
    const inp = document.querySelector('p-calendar input');
    const want = `01.01.${y} - 31.12.${y}`;
    if (inp.value === want) return true;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    inp.focus();
    inp.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: '1' }));
    setter.call(inp, want);
    inp.dispatchEvent(new Event('input', { bubbles: true }));
    await this.tick(10);
    this.vCloseCalendar();
    await this.tick(10);
    return inp.value === want;
  },
  // Click search, wait for its request to finish, then check that every row is this account's
  // and this year's (or that the table says there is no data).
  async vSearch(acct, y, kind) {
    this.vHookNet();
    const before = window.__psNet.done;
    const btn = [...document.querySelectorAll('button')].find(b => b.querySelector('.pi-search'));
    if (!btn) return 'no search button';
    btn.click();
    await this.waitFor(() => window.__psNet.done > before && window.__psNet.inflight === 0, 30000);
    await this.tick(30);
    const rows = this.vRows();
    if (rows.some(r => /Немає даних/.test(r))) return 'empty';
    const accts = [...new Set(rows.map(r => (r.match(/\b(\d{7})\b/) || [])[1]).filter(Boolean))];
    if (accts.length !== 1 || accts[0] !== acct) return 'accounts ' + accts.join(',');
    const years = kind === 'invoices'
      ? rows.map(r => (r.match(/[а-яії]+-(\d{4})/i) || [])[1]).filter(Boolean)
      : rows.map(r => (r.match(/\d\d\.\d\d\.(\d{4})/) || [])[1]).filter(Boolean);
    const other = [...new Set(years.filter(x => x !== String(y)))];
    return other.length ? 'other years ' + other.join(',') : 'ok';
  },
  async vRoute(kind) {
    const p = this.V_PAGES[kind];
    if (location.pathname === p.path && document.querySelector('p-calendar input')) return true;
    return this.go(p.path, () => location.pathname === p.path && document.querySelector('p-calendar input') && this.vDropdown(/^(По всіх рахунках|\d{7})$/));
  },
  // accounts: entries of vodokanal-accounts.json; years: ['2026', '2025']; kinds default to both pages
  async vRun(accounts, years, log, kinds = ['invoices', 'payments']) {
    for (const kind of kinds) {
      if (!(await this.vRoute(kind))) { log.push({ kind, error: 'page did not render' }); continue; }
      for (const y of years) {
        const ranged = kind === 'invoices' ? await this.vMonthRange(y) : await this.vDayRange(y);
        if (!ranged) { log.push({ kind, y, error: 'period not set' }); continue; }
        for (const acc of accounts) {
          if (!(await this.vPickAccount(acc.account_number))) { log.push({ kind, y, acct: acc.account_number, error: 'account not picked' }); continue; }
          const state = await this.vSearch(acc.account_number, y, kind);
          if (state !== 'ok' && state !== 'empty') { log.push({ kind, y, acct: acc.account_number, error: state }); continue; }
          const doc = this.V_PAGES[kind].title;
          this.snap({ folder: acc.folder, sub: '', landscape: true, remove: this.V_REMOVE,
            name: `Київводоканал - ${acc.folder} - ${doc} ${y}`,
            title: `Київводоканал — ${doc} ${y} — ${acc.folder}`,
            header: `Київводоканал · ${doc} · ${y} рік · о/р ${acc.account_number} · ${acc.address}`,
            url: 'https://my.vodokanal.kiev.ua' + this.V_PAGES[kind].path });
          log.push({ kind, y, acct: acc.account_number, rows: this.vRows().length, state });
        }
      }
    }
  },
});
'vodokanal helpers ready';
