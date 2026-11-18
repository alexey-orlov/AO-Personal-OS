---
name: facilities-bills
description: Save Alex's utility-cabinet payment records as PDFs into his Google Drive folder "Facilities - bills" (one subfolder per apartment). Provider so far is Yasno electricity, with 3 accounts. For each account it prints the Абонентська книжка (account book) and Історія платежів (payment history) pages per year, plus every payment's detail page as a receipt in a "Yasno - платежі" subfolder. Each run reprints the current year and adds new receipts. Works in Alex's logged-in Chrome session through the Claude in Chrome extension, makes true browser prints with headless Chrome, and uploads them with the Google Drive connector. Use on /facilities-bills, "update the Yasno bills", "download Yasno payment history", "save Yasno receipts to Drive", "оновити платежі Ясно", "скачай історію платежів Ясно", "роздрукуй абонентську книжку", or when another facilities cabinet (water, heating, gas) needs the same treatment.
disable-model-invocation: false
user-invocable: true
---

# Facilities bills → Google Drive

Prints the pages of Alex's utility cabinets to PDF and files them in Google Drive
**Facilities - bills** (`1WjeAASAugd8qbGU55PeL18Z1zox9JjvT`), which has one folder per apartment.
The only provider so far is **Yasno**. Its page map is in `references/yasno.md`. The accounts and
their Drive folders are in `references/yasno-accounts.json`. The reasons behind each rule and the
lessons from the first run are in `references/decisions.md`.

## What a run leaves in Drive

```
Facilities - bills/<Folder>/                 Антоновича · Победы · Смоленская
  Yasno - <Folder> - Абонентська книжка <YYYY>.pdf   account book, that year's tab (A4 landscape)
  Yasno - <Folder> - Історія платежів <YYYY>.pdf     payment history, only that year's payments
  Yasno - платежі/
    Yasno - <Folder> - платіж <YYYY-MM-DD> <amount> грн.pdf    one payment's detail page
```

Each PDF is a real print of the page: the site's own fonts and selectable text. The header shows
the print time, the document, the account number and the address. The footer shows the page URL
and page n/N. When two payments share a date and an amount, the second (counted oldest first) gets
" (2)".

## Year rules (Alex, 2026-11-18)

- **Current year:** reprint the account book and the history on every run. Trash the old file and
  upload the new one.
- **Previous years:** keep them as they are. One exception: if a year's file was printed before
  that year ended (its Drive `createdTime` falls in the same year), reprint it once, so the last
  months are not missing.
- If there is no file for the previous year, print it.
- **Receipts:** add every payment from a year that has a saved history file and whose receipt is
  not yet in `Yasno - платежі`. Never replace a receipt. The first run (2026-11-18) covered
  2025–2026. Go back to 2021 only if Alex asks.

## Hard rules

- **Never type a password or an OTP.** Alex logs in himself in Chrome. If the cabinet shows a
  login page, stop, ask him to log in, and continue once he says it's done. Never store his
  credentials anywhere, including the repo.
- Trash files, never delete them. Touch only the files this skill names.
- Work in your own tab of the extension's tab group and close it at the end.
- Bundles saved to `~/Downloads` contain account pages. Move them into the scratchpad at once,
  and never into the repo.
- Bash for scripts only: read files with Read and edit with Edit. Never write `cd … &&` chains.

## Run

**1. Preflight.** Load the Chrome tools with one ToolSearch: the core set plus `javascript_tool`,
`find` and `browser_batch`. Create a tab and open `https://yasno.ua/my/personal-accounts`.
- If you land on a login page, ask Alex to log in.
- The account list must match `yasno-accounts.json` by each account's `match` keyword.
- If an account is new, ask Alex which Drive folder it belongs to. Create the folder and its
  `Yasno - платежі` subfolder with `create_file` (contentMimeType
  `application/vnd.google-apps.folder`), then add the account to the JSON.

**2. Inventory and plan.** For each account, list its folder and its receipts folder with
`search_files` (`parentId = '<id>'`, excludeContentSnippets). Results come about 5 per page: follow
`nextPageToken` until the result is `{}`. Then write one plan per account, as JSON:
`{historyYears, bookYears, receiptYears, have}`.
- `historyYears` and `bookYears`: the current year, plus any year the year rules say to print.
- `receiptYears`: from the earliest saved history year to the current year.
- `have`: the titles already in the receipts folder, without `.pdf`.

**3. Capture.** Paste `scripts/pagesnap.js`, then `scripts/yasno.js`, into one `javascript_tool`
call. End that call with
`__ps.start(async log => { for (const [acc, plan] of JOBS) await __ps.yRun(acc, plan, log); })`,
where `JOBS` holds the `[account entry, plan]` pairs.
- Poll `__ps.status()` every ~10 s: a `browser_batch` of wait 10 s, then `javascript_tool`. One
  account with 1 new receipt takes about 15 s. The first run (3 accounts, 37 receipts) took about
  3 minutes.
- Waits react to page changes, so a hidden tab still works. Scrolling further back than ~3 years
  needs the tab in front, though. If `vis` is `hidden` and `loaded` stays short of the years in
  the plan, ask Alex to bring the Chrome window with the Yasno tab to the front.
- `yRun` already retries each failed receipt once. If `failed` is still non-empty, start one more
  job for those accounts, with `have` extended by the names already captured.
- When the log is complete, call `__ps.button('yasno-<yyyymmdd>.json')`. `find` "pagesnap
  download", then `left_click` it by ref.
- Check that `document.getElementById('ps-dl').dataset.n` equals the number of pages queued.
- If the extension reports "not connected", retry once. Then read `__ps.status()` before resending
  anything, because the job may already be running.

**4. Render and check.** The bundle lands in `~/Downloads/<name>.json`. The Bash sandbox cannot
list files created in Downloads during the session, so use the exact path with `stat` and `mv`.
Move it into a new, empty scratchpad folder. Then:
```
python3 -I scripts/render.py --out OUT --work WORK BUNDLE.json    # one JSON line per PDF; any "ok": false → stop
python3 -I scripts/qa.py --accounts references/yasno-accounts.json OUT   # must end "0 problems"
```
Render one page of each kind with `pdftoppm -r 50 -png` and look at it.

**5. Upload.** Build the list:
`python3 -I scripts/manifest.py --accounts references/yasno-accounts.json OUT > manifest.jsonl`.
- For each row with `replace: true`, search its `parent_id` for the same title and `trash_file`
  it. Do this before the upload.
- Then call `create_file` with title, `parentId`, contentMimeType `application/pdf`,
  `disableConversionToGoogleType: true` and `base64Content` = the row's `ref`. Send at most 4
  calls at a time.
- "The file was not sent: … no confirmed answer … this connector is Google Drive" means nothing
  was created. Wait a minute, then retry.
- After a network error such as `ERR_HTTP2_PROTOCOL_ERROR`, list the folder before retrying,
  because the file may already exist.

**6. Verify and report.**
- Every manifest row needs a `create_file` response whose `fileSize` equals the row's `bytes`.
- Every folder that had a failed or retried upload must list each title exactly once.
- Close your Chrome tab and release any computer-use hold.
- Report per account: what was replaced, added and skipped, with links to the folders.

## Adding a provider

Write `references/<provider>.md`, `references/<provider>-accounts.json` and `scripts/<provider>.js`.
The provider script's helpers call the pagesnap core (`snap`, `go`, `start`, `button`). Keep the
Drive layout: the same apartment folders, files named `<Provider> - <Folder> - …`, and receipts in
`<Provider> - платежі`. Generalise `qa.py` and `manifest.py` (both read Yasno names today), then
add the provider to this file's description.
