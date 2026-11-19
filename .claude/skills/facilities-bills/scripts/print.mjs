#!/usr/bin/env node
// Print local HTML files to PDF through headless Chrome's DevTools protocol (one Chrome for all).
// usage: node print.mjs JOBS.json PROFILE_DIR
//   JOBS.json = [{ "html": "/abs/page.html", "pdf": "/abs/out.pdf", "scale": 0.6 }, ...]
// Prints one JSON line per job: {"pdf", "ok", "err"}.
//
// Why not `chrome --print-to-pdf`: it has no scale. A print laid out at A4 width trips the mobile
// breakpoint of responsive cabinets (Kyivvodokanal's statement table lost half its columns); the
// print dialog's "Scale" lays the page out at width/scale, which is what `scale` does here.
// The page's own @page rule decides paper size, margins and the header/footer margin boxes.
// The renderer gets no network at all: everything must come from the bundle (file:, data:).
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [jobsFile, profile] = process.argv.slice(2);
const jobs = JSON.parse(readFileSync(jobsFile, 'utf8'));

const chrome = spawn(CHROME, ['--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', '--allow-file-access-from-files', '--host-resolver-rules=MAP * ~NOTFOUND',
  `--user-data-dir=${profile}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
const wsUrl = await new Promise((res, rej) => {
  let buf = '';
  chrome.stderr.on('data', d => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) res(m[1]); });
  setTimeout(() => rej(new Error('headless Chrome did not start')), 30000);
});

const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej); });
let seq = 0;
const pending = new Map();
const listeners = new Set();
ws.addEventListener('message', e => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  else if (msg.method) for (const l of listeners) l(msg);
});
const send = (method, params = {}, sessionId) => new Promise(res => {
  const id = ++seq;
  pending.set(id, res);
  ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
});
const sleep = ms => new Promise(r => setTimeout(r, ms));

const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);

for (const j of jobs) {
  try {
    await send('Page.navigate', { url: 'file://' + j.html }, sessionId);
    for (let i = 0; i < 150; i++) {  // up to 15 s; local files normally load at once
      const r = await send('Runtime.evaluate', { expression: 'document.readyState + "|" + location.href' }, sessionId);
      const [state, href] = String(r.result?.result?.value || '').split('|');
      if (state === 'complete' && href.endsWith(j.html.split('/').pop())) break;
      await sleep(100);
    }
    await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => true)', awaitPromise: true }, sessionId);
    await sleep(200);
    const r = await send('Page.printToPDF', { preferCSSPageSize: true, printBackground: true,
      displayHeaderFooter: false, scale: j.scale || 1 }, sessionId);
    if (r.error) throw new Error(r.error.message);
    mkdirSync(dirname(j.pdf), { recursive: true });
    writeFileSync(j.pdf, Buffer.from(r.result.data, 'base64'));
    console.log(JSON.stringify({ pdf: j.pdf, ok: true, err: null }));
  } catch (e) {
    console.log(JSON.stringify({ pdf: j.pdf, ok: false, err: String(e).slice(0, 300) }));
  }
}
ws.close();
chrome.kill();
