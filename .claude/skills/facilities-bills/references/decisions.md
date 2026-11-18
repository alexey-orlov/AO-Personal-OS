# facilities-bills: decisions and lessons

Rationale only. The runtime steps are in `SKILL.md`, and each lesson below is already built into a
script. When a lesson is revised, rewrite its entry to the current truth.

## 2026-11-18: first run (Yasno, 3 accounts, 49 PDFs)

### Decided by Alex
- The «Смоленская» folder is вул. Сім'ї Бродських 51. His note said "Smolenskaya = Antonovycha".
  Yasno lists Антоновича 160 and Сім'ї Бродських 51 as separate accounts, and Kyiv renamed
  Смоленська to Сім'ї Бродських, so I asked, and he confirmed the renamed street.
- Receipts cover 2025–2026, not every year back to 2021.
- Year rules: reprint the current year over the old file, keep previous years, and keep at least
  one previous year. A year's file printed before that year ended is reprinted once in the next
  year, because otherwise its last payments and charges would never be on file. The agent proposed
  this exception and Alex confirmed it.
- He offered his cabinet login for the repo. It was not stored: the agent may not type passwords
  in any case, and the repo rule forbids committing secrets, because autosync pushes to GitHub.

### Decided by the agent (Alex can overrule)
- **File names** are `Yasno - <Folder> - <Document> <YYYY>.pdf` and
  `Yasno - <Folder> - платіж <YYYY-MM-DD> <amount> грн.pdf`. The folder name stays in the file name
  so a file sent onward still says which apartment it is for. The provider prefix is there because
  other providers' bills will share the apartment folders.
- **History per year:** the page has no year filter, so each year's print hides the other years'
  rows. This matches the account book's year tabs and the rule that only the current year is
  reprinted.
- **Duplicate receipt names** are numbered oldest first. A new payment then never renames an older
  file, so the check for existing files stays correct.

### Lessons (each one is now built into a script)
1. **Printing.** Neither tool can operate Chrome's print dialog: the extension cannot reach it, and
   computer-use gets browsers only for viewing. So the page is snapshotted in the browser
   (`pagesnap.snap`) and printed locally with headless Chrome (`render.py`). Text stays
   selectable and the site's fonts are embedded.
2. **Getting the pages out.** A Blob download through an `<a download>` works. A click by the
   extension on an injected button gives it a user gesture. One bundle per run rather than one
   download per page.
3. **`~/Downloads` and the Bash sandbox.** `ls`, globs and `find` did not show files created there
   during the session, but `stat` and `mv` by exact path worked. Chrome's own download record
   confirmed the downloads had completed.
4. **Extension call length.** A `javascript_tool` call longer than about 15–20 s returns
   "connection lost" while the page keeps working. Long work therefore runs as `__ps.start` and is
   polled through `__ps.status()`.
5. **Cold loads.** The account book shows a 404 on a cold load. The fix is to navigate inside the
   app with pushState and popstate, which also keeps the injected script alive.
6. **Background tab.** When the tab is not in front, Chrome throttles its timers, after a few
   minutes to about one wake-up per minute. Polling waits built on `setTimeout` timed out on pages
   that had already loaded: two receipts at 15 s, then a whole history page after 181 s. Waits now
   react to DOM mutations, short pauses are MessageChannel turns, and `setTimeout` is only the
   give-up backstop. A re-test took 14 s. `yRun` also retries each failed receipt once.
   `status().vis` shows whether the tab is hidden.
7. **History loading.** History loads 40 payments per scroll and once stopped at 40 of 57. Loading
   on scroll needs a visible tab. The loader therefore stops as soon as the oldest loaded payment
   predates the earliest year needed, which 40 payments (about 3 years) already cover. A deep
   backfill needs the tab in front.
8. **Amount parsing.** The year leaked into the amount (`2026 397.44`) until the amount was matched
   only after the date.
9. **Headless Chrome.** `--blink-settings=scriptEnabled=false` makes `--print-to-pdf` write nothing
   and report no error. Scripts are stripped from the snapshot and blocked by a CSP meta tag
   instead.
10. **Fonts.** A `file://` page cannot load the site's web fonts (CORS), so `render.py` inlines the
    font files into its local copy of the CSS.
11. **Blank last page.** Wrappers with `min-height: 100vh` added an empty page. `snap` resets their
    min-height for print.
12. **Account book width.** At A4 portrait the table lost its «Сплачено» and «Баланс» columns.
    Landscape fits all seven.
13. **Network.** TLS handshakes to yasno.ua sometimes time out, so `render.py` retries its fetches.
14. **Drive uploads.** `create_file` with `base64Content = "sha256:<hex>:<absolute path>"` uploads
    a local file without its contents passing through the chat. A burst of 12 parallel calls had
    7 refused with "no confirmed answer … this connector is Google Drive", and nothing was created
    for those. Single retries a few minutes later succeeded, so uploads go in batches of at most
    4. After one `ERR_HTTP2_PROTOCOL_ERROR` the folder was listed first: nothing had been created.
15. **Drive search.** `search_files` returns about 5 results per page whatever `pageSize` says.
    Follow `nextPageToken` until the result is `{}`. Uploads are verified from the `create_file`
    responses (`fileSize` must equal the local size).
16. **Extension drop-outs.** The extension disconnected once mid-run and came back on retry. Read
    `__ps.status()` before resending a call that changes state.
