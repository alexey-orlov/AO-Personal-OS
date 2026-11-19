// Kyivvodokanal meters, LIST view (all meters in one table, one «Надіслати покази»).
// Paste into the https://my.vodokanal.kiev.ua/dashboard/counters tab with javascript_tool.
// Typing values and ticking checkboxes is done with the extension's real clicks/typing (see
// SKILL.md); this file only READS the page and does the one guarded click on «Надіслати покази».
window.__vk = {
  // the list view has row inputs + «Надіслати покази»; the circle view (one meter, digit boxes,
  // «ПОДАТИ») is the other one: if it shows, click «Змінити вид» once
  view() {
    const send = [...document.querySelectorAll('button')].some(b => /Надіслати покази/.test(b.innerText));
    if (send && document.querySelector('table tbody tr td')) return 'list';
    if (/ПОДАТИ/.test(document.body.innerText)) return 'circle';
    return 'unknown';
  },
  rows() {
    return [...document.querySelectorAll('table tbody tr')].filter(r => !r.closest('.p-datepicker') && r.querySelectorAll('td').length > 5);
  },
  state() {
    return this.rows().map(r => {
      const td = [...r.querySelectorAll('td')];
      const inp = r.querySelector('input:not([type=checkbox])');
      return {
        acct: td[1]?.innerText.trim(),
        serial: td[4]?.innerText.trim(),
        kind: /\(ГВ\)/.test(td[2]?.innerText || '') ? 'hot' : 'cold',
        checked: !!r.querySelector('input[type=checkbox]')?.checked,
        prev: parseFloat(td[5]?.querySelector('.col-4')?.innerText),   // «Початковий» = previous reading
        value: inp?.value ?? null,
        qty: (td[5]?.innerText.trim().split(/\s+/) || []).pop(),         // «Кількість» = value - previous
        last: td[7]?.innerText.trim(),                                    // «Останнє внесення»
      };
    });
  },
  // expected = { '220047865 А': '00005.435', ... }. Presses «Надіслати покази» only when exactly
  // these rows are ticked, each holds its value and none is below its previous reading; then
  // returns the confirmation dialog's text (answer it with a real click on «Так»).
  async send(expected) {
    const st = this.state();
    const keys = Object.keys(expected);
    const problems = [];
    const ticked = st.filter(s => s.checked).map(s => s.serial);
    if (ticked.length !== keys.length || !keys.every(k => ticked.includes(k))) problems.push('ticked rows: ' + ticked.join(', '));
    for (const k of keys) {
      const s = st.find(x => x.serial === k);
      if (!s) { problems.push(k + ' is not on the page'); continue; }
      if (s.value !== expected[k]) problems.push(`${k} holds ${s.value}, expected ${expected[k]}`);
      if (parseFloat(expected[k]) < s.prev) problems.push(`${k}: ${expected[k]} is below the previous ${s.prev}`);
    }
    if (problems.length) return JSON.stringify({ sent: false, problems });
    [...document.querySelectorAll('button')].find(b => /Надіслати покази/.test(b.innerText)).click();
    for (let i = 0; i < 60 && !document.querySelector('.p-dialog, .p-confirm-dialog, .p-toast-message'); i++) await new Promise(r => setTimeout(r, 250));
    return JSON.stringify({ sent: 'awaiting confirmation', dialog: [...document.querySelectorAll('.p-dialog, .p-confirm-dialog, .p-toast-message')].map(e => e.innerText.replace(/\s+/g, ' ').trim()) });
  },
  // after «Так»: the toast and each meter's newest history line (period, from, to, qty, date, source)
  async verify(serials) {
    const out = { toast: [...document.querySelectorAll('.p-toast-message')].map(e => e.innerText.replace(/\s+/g, ' ').trim()) };
    for (const serial of serials) {
      const row = this.rows().find(r => r.innerText.includes(serial));
      if (!row) { out[serial] = 'row not found'; continue; }
      [...row.querySelectorAll('button')].find(b => /Історія/i.test(b.innerText)).click();
      for (let i = 0; i < 60 && !document.querySelector('.p-dialog table tbody tr td'); i++) await new Promise(r => setTimeout(r, 250));
      const dlg = document.querySelector('.p-dialog');
      out[serial] = dlg ? [...dlg.querySelectorAll('table tbody tr')].map(r => r.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean)[0] : 'no history dialog';
      dlg?.querySelector('.p-dialog-header-icon')?.click();
      for (let i = 0; i < 20 && document.querySelector('.p-dialog'); i++) await new Promise(r => setTimeout(r, 150));
    }
    return JSON.stringify(out);
  },
};
'vk helpers ready';
