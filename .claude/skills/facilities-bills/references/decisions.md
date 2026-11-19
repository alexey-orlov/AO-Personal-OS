# facilities-bills: decisions and lessons

Rationale only. The runtime steps are in `SKILL.md`, and each lesson below is already built into a
script. When a lesson is revised, rewrite its entry to the current truth.

## Decided by Alex
- **Folders:** apartment, then utility, then the provider's files; nothing at the apartment root
  (2026-11-18, after the first run had put Yasno's files at the root). Yasno goes in
  «Электроэнергия», Київводоканал in «Водоканал» (2026-11-19).
- **«Смоленская» is вул. Сім'ї Бродських, буд. 5/1.** His first note said "Smolenskaya =
  Antonovycha". Yasno lists both streets as separate accounts and Kyiv renamed Смоленська to
  Сім'ї Бродських, so I asked, and he confirmed the renamed street. Київводоканал accounts:
  1088235 Антоновича, 0251754 Победы, 0251689 Смоленская.
- **Year rules:** reprint the current year over the old file, keep previous years, and keep at
  least one previous year. A year's file printed before that year ended is reprinted once in the
  next year; the agent proposed this exception and Alex confirmed it. Yasno receipts cover
  2025–2026; older years only on request. Київводоканал: the account book and payments per year,
  with no receipts.
- **The process must be seamless:** no prompts for Alex during a run (2026-11-19, after Chrome
  asked him about multiple downloads).
- **If an interface changes,** find the new way; when in doubt, ask (2026-11-19).
- **No stored credentials.** He offered his logins for the repo. The agent may not type passwords
  in any case, and the repo rule forbids committing secrets, because autosync pushes to GitHub.

## Decided by the agent (Alex can overrule)
- **File names:** `<Provider> - <Folder> - <Document> <YYYY>.pdf`, and for Yasno receipts
  `Yasno - <Folder> - платіж <YYYY-MM-DD> <amount> грн.pdf`. The folder name stays in the file name
  so a file sent onward still says which apartment it is for.
- **Yasno history per year:** the page has no year filter, so each year's print hides the other
  years' rows. Київводоканал's pages have real period filters, so they are used.
- **Duplicate receipt names** are numbered oldest first, so a new payment never renames an older
  file.

## Lessons (each one is now built into a script)

### Getting the pages out of the browser
1. **No print dialog.** Neither tool can operate it, so each page is snapshotted in the browser
   (`pagesnap.snap`) and printed locally with headless Chrome.
2. **One download per tab.** A Blob download through an injected button that the extension clicks
   works. Chrome lets a tab's first download through and asks about the second one, and Alex had
   to answer that prompt during the first runs. So a run now collects everything into one bundle,
   downloads it once from a fresh tab, and `button()` refuses a second download.
3. **`~/Downloads` and the sandbox.** `ls`, globs and `find` do not show files created there
   during the session; `stat` and `mv` by exact path do.
4. **Extension call length.** A `javascript_tool` call longer than about 15–20 s returns
   "connection lost" while the page keeps working. Long work runs as `__ps.start` and is polled
   through `__ps.status()`; read the status before resending anything after a drop-out.

### Making the snapshot faithful
5. **`<base href="/">`** (Angular): resolving a link's attribute against the page URL put 4 of 7
   Київводоканал stylesheets under /dashboard/, where the server returns the app's HTML. The page
   then printed unstyled. Snapshots take browser-resolved `link.href`, `a.href` and `img.src`, drop
   `<base>`, and make relative `url()` in inline styles absolute.
6. **Field values.** `cloneNode` copies attributes, not typed or picked values, so the period field
   printed blank. Live values are now copied in.
7. **Blocked assets.** Київводоканал answers 403 to anything but the browser session. Stylesheets,
   their fonts and images are fetched in the page (`collectAssets`) and shipped in the bundle.
8. **CSS-in-JS rules** that live only in the CSSOM are serialized; `min-height: 100vh` wrappers
   are reset so they add no blank page.

### Printing
9. **No network for the renderer.** A failing third-party stylesheet (Google sign-in) was retried
   for every page and, while the Mac slept, stalled a render for 3 hours. Chrome now prints with
   every host unresolvable; a failed stylesheet is remembered and dropped.
10. **Scale.** At A4 width Київводоканал switches to its mobile layout and the statement table loses
    columns. CSS zoom does not help, because breakpoints still see the narrow page. `print.mjs`
    prints through DevTools with the dialog's scale (0.6): desktop layout, 3 pages instead of 7.
    `chrome --print-to-pdf` has no scale, and `--blink-settings=scriptEnabled=false` makes it
    write nothing.
11. **Fonts** from `file://` fail CORS, so they are inlined as data: URIs. Yasno's account book
    needs A4 landscape; Київводоканал's pages need landscape at 0.6.

### Driving the apps
12. **Cold loads.** Yasno's account book shows a 404 on a cold load; pages are navigated inside the
    app with pushState and popstate, which keeps the injected script alive.
    `/my/personal-accounts?accountId=` and `/my/payments/history?accountId=` load cold.
13. **Background tabs.** Chrome throttles timers to about one wake-up per minute. Waits react to DOM
    mutations or to the request counter (`vNetIdle`), and `setTimeout` is only the give-up
    backstop. Painting-dependent loading, such as Yasno's infinite scroll, needs a visible tab.
14. **Yasno history** loads 40 payments per scroll. The loader stops once the oldest loaded payment
    predates the earliest year needed.
15. **PrimeNG (Київводоканал).**
    - A typed value is ignored unless a keydown came first.
    - An open date picker swallows the next click; only its trigger closes it.
    - A closing dropdown panel lingers in the DOM, so its items select nothing.
    - The search button carries no `.pi-search` on one page; `.p-fluid-button` is on both.
    - The table re-renders before the request's `loadend`, so waits are on the request itself.

    Before these fixes a run took 5 minutes with failures; after them, 15 s.
16. **Amount parsing:** the year leaked into the amount until the amount was matched only after the
    date.

### Drive
17. `create_file` with `base64Content = "sha256:<hex>:<absolute path>"` uploads a local file without
    its contents passing through the chat. Parallel bursts get refused ("no confirmed answer …"),
    so send at most 4 at a time. After a network error, list the folder before retrying.
18. `search_files` returns about 5 results per page, and may include trashed files unless the
    query says `trashed = false`. Uploads are verified from the `create_file` responses. Replacing
    a file means upload first, then trash the old one by its ID.

### Data
19. **Addresses are copied, never repaired.** Yasno prints «буд. 5 1»; it was "cleaned" to «51» and
    went into the headers of 16 PDFs. Київводоканал showed «5/1», and the 16 files were reprinted
    and replaced on 2026-11-19.
