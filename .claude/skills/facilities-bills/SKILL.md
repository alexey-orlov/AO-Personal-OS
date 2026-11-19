---
name: facilities-bills
description: Save Alex's utility-cabinet statements and payment records as PDFs into his Google Drive folder "Facilities - bills". It has one folder per apartment and, inside each, one folder per utility. Yasno (electricity → «Электроэнергия») gets the Абонентська книжка and Історія платежів pages per year plus every payment's detail page as a receipt. Київводоканал (water → «Водоканал») gets the Абонентська книжка and Здійснені платежі statements per year. Each run reprints the current year and adds what is new. Works in Alex's logged-in Chrome session through the Claude in Chrome extension, makes true browser prints with headless Chrome without any prompt for Alex, and uploads with the Google Drive connector. Use on /facilities-bills, "update the Yasno bills", "download Yasno payment history", "выгрузи историю Водоканала", "оновити платежі Ясно", "скачай абонентську книжку", or when another facilities cabinet (heating, gas) needs the same treatment. Submitting meter readings is the separate meter-readings skill.
disable-model-invocation: false
user-invocable: true
---

# Facilities bills → Google Drive

Prints statements from Alex's utility cabinets to PDF and files them in Google Drive
**Facilities - bills** (`1WjeAASAugd8qbGU55PeL18Z1zox9JjvT`). The Drive tree is apartment, then
utility, then provider files; nothing goes straight into an apartment folder.

| Provider | Utility folder | Card | Accounts JSON | Page script |
|---|---|---|---|---|
| Yasno | Электроэнергия | `references/yasno.md` | `references/yasno-accounts.json` | `scripts/yasno.js` |
| Київводоканал | Водоканал | `references/vodokanal.md` | `references/vodokanal-accounts.json` | `scripts/vodokanal.js` |

The reasons behind each rule, and the lessons from the runs, are in `references/decisions.md`.

## What a run leaves in Drive

```
Facilities - bills/<Folder>/                 Антоновича · Победы · Смоленская
  Электроэнергия/
    Yasno - <Folder> - Абонентська книжка <YYYY>.pdf   (A4 landscape)
    Yasno - <Folder> - Історія платежів <YYYY>.pdf     (only that year's payments)
    Yasno - платежі/Yasno - <Folder> - платіж <YYYY-MM-DD> <amount> грн.pdf
  Водоканал/
    Київводоканал - <Folder> - Абонентська книжка <YYYY>.pdf   (filtered: account, Січень–Грудень)
    Київводоканал - <Folder> - Здійснені платежі <YYYY>.pdf    (filtered: account, 01.01–31.12)
```

Each PDF is a real print of the page: the site's own fonts, styles and selectable text, and the
filter fields as they were set. The header shows print time, document, account number and
address; the footer shows the page URL and page n/N.

## Year rules (Alex, 2026-11-18)

- **Current year:** reprint on every run; trash the old file and upload the new one.
- **Previous years:** keep them. Exception: a year's file printed before that year ended (its
  `createdTime` falls in that year) is reprinted once in the next year.
- **No previous-year file:** print the previous year.
- **Yasno receipts:** add every payment from a year with a saved history file that is not yet in
  `Yasno - платежі`. Never replace a receipt.

## Hard rules

- **Never type a password or OTP, and never solve a captcha.** On a login page, ask Alex to log in
  and continue when he says so. Store his credentials nowhere.
- **Seamless for Alex: exactly one download per run, from a fresh tab.** Chrome lets a tab's first
  download through silently and asks Alex from the second one on. Capture every account into one
  bundle. `__ps.button()` refuses a second download in the same tab.
- **If the interface no longer matches the provider card, stop and find the new way.** That
  includes missing buttons, renamed tabs or changed filters. When in doubt, ask Alex.
- **Copy identity data verbatim from a source that shows it intact.** Never "clean up" a garbled
  address: Yasno shows «буд. 5 1» for 5/1, and «51» was once printed on 16 PDFs.
- Trash, never delete; touch only the files this skill names. Bundles in `~/Downloads` hold account
  pages: move them into the scratchpad at once, never into the repo.
- Bash for scripts only: read files with Read and edit with Edit. Never write `cd … &&` chains.

## Run

**1. Preflight.** Load the Chrome tools with one ToolSearch call: the core set, `javascript_tool`,
`find` and `browser_batch`. Open a **new tab** on the provider's start page from its card. On a
login page, ask Alex to log in. The accounts on the page must match the accounts JSON. If one is
new, ask Alex which apartment it belongs to. Create its utility folder (and Yasno's receipts
subfolder) with `create_file` (contentMimeType `application/vnd.google-apps.folder`) and add the
account to the JSON.

**2. Inventory and plan.** List each account's utility folder (`folder_id`), and for Yasno its
`receipts_folder_id`, with `search_files` (`parentId = '<id>' and trashed = false`). Results come
about 5 per page: follow `nextPageToken` until the result is `{}`. Then decide the years from the
year rules and, for Yasno, the receipts already there (`have`, titles without `.pdf`).

**3. Capture.** Paste `scripts/pagesnap.js` and then the provider script into one `javascript_tool`
call, and end that call with a background job:
- Yasno: `__ps.start(async log => { for (const [acc, plan] of JOBS) await __ps.yRun(acc, plan, log); log.push({assets: await __ps.collectAssets()}); })`
- Київводоканал: `__ps.start(async log => { await __ps.vRun(ACCOUNTS, YEARS, log); log.push({assets: await __ps.collectAssets()}); })`

Poll `__ps.status()` every ~10 s. 12 Водоканал pages take about 15 s; 16 Yasno pages for one
account about 70 s. Read the log: every page should say `ok` or list its receipts. When done, run
`__ps.button('<provider>-<yyyymmdd>.json')`, `find` "pagesnap download" and `left_click` it by
ref. `document.getElementById('ps-dl').dataset.n` must equal the number of pages.

**4. Render and check.** The bundle lands in `~/Downloads/<name>.json`. The sandbox cannot list new
files in Downloads, so use the exact path with `stat` and `mv`, into a new empty scratchpad folder.
```
python3 -I scripts/render.py --out OUT --work WORK BUNDLE.json           # one JSON line per PDF; any "ok": false → stop
python3 -I scripts/qa.py --accounts references/<provider>-accounts.json OUT   # must end "0 problems"
```
The renderer prints through `scripts/print.mjs`: headless Chrome over DevTools, no network, scale
taken per page. Look at one page of each kind with `pdftoppm -r 45 -png`.

**5. Upload.**
`python3 -I scripts/manifest.py --accounts references/<provider>-accounts.json OUT > manifest.jsonl`.
- **Upload first, trash second.** `create_file` takes title, `parentId`, contentMimeType
  `application/pdf`, `disableConversionToGoogleType: true` and `base64Content` = the row's `ref`.
  Send at most 4 at a time.
- Only after the new file is in, `trash_file` the old one with the same title (the `replace: true`
  rows).
- "The file was not sent: … no confirmed answer …" means nothing was created: wait a minute and
  retry.
- After a network error, list the folder before retrying.

**6. Verify and report.** Every row needs a `create_file` response whose `fileSize` equals the
row's `bytes`, and each folder must list each title exactly once (`trashed = false`). Close your
tabs and release any computer-use hold. Report per account what was replaced, added and skipped,
with links to the folders.

## Adding a provider

Walk the path first, then write the card. Add `references/<provider>.md`,
`references/<provider>-accounts.json` and `scripts/<provider>.js`. The provider script uses the
pagesnap core: `snap` with `landscape`/`scale`/`remove`, `go`, `waitFor`, `tick` and `start`.
Ask Alex for the utility folder name. Add its document checks to `qa.py`.
