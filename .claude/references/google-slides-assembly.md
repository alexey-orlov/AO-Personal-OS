# Composing a Google Slides deck from existing decks (agent procedure)

_Learned 2026-09-06/07 while building the Civitta GBSW "source slides" pack (155 slides from 9 decks). Read this before any task that says "pull slides from my existing decks into one presentation"._

## The rule

**Build files, don't click.** Alex's standing preference (2026-09-06): never assemble a deck by driving the Google Slides UI slide-by-slide (Import slides dialog, thumbnail picking, copy-paste between tabs). Produce `.pptx` files with code and let Google convert them. The browser is used only for the two things code cannot do without a Drive/Slides API credential we do not have: exporting the source decks and uploading the result.

## Working procedure

1. **Locate decks in Drive** with the Drive MCP (`search_files` by title / `parentId`). Alex's teaching material lives under one Drive folder (`1N6zCtx5VWja5vtT89seShWrOcsi1azK-`): `PB - Контент - Product management` (PrivatBank course, 22 lessons, Google Slides + a `Lectures / PDFs` folder), `Laba - Контент - Product management` (Laba course, Google Slides 2024 + 2023 `.pptx`), the Challenger 3.0 deck. Program sheets with lesson titles and homework: `Курс Product management / Програма та домашні завдання` (PB), `AOrlov - Product management - Програма курсу` (Laba).
2. **Read slide text with slide numbers**: Drive MCP `read_file_content` on a Google Slides file returns every slide as a block between `-----` markers, in presentation order, hidden slides included. That is enough to shortlist slides. The `text/plain` export has no slide separators; do not use it for numbering.
3. **Export each source deck to `.pptx`** by navigating the Claude-in-Chrome tab to `https://docs.google.com/presentation/d/<id>/export/pptx`. The tab stays where it is; Chrome saves the file to **`~/Desktop`** on this Mac (not `~/Downloads`). Check `~/Library/Application Support/Google/Chrome/Default/History` (copy it, query the `downloads` table with sqlite3) to confirm completion and paths. Sequential navigations in one tab worked for 9 decks in a row.
4. **Verify slide numbers visually**: `soffice --headless --convert-to pdf`, `pdftoppm -r 28 -png`, then `montage -tile 5x4` contact sheets (ImageMagick is installed). Hidden slides (`<p:sld show="0">`) are skipped by LibreOffice's PDF export, so PDF page numbers shift after a hidden slide; detect them with lxml on the slide XML root attribute. Text-count numbering was off by 1-2 slides on two decks; the contact sheets are the ground truth.
5. **Trim, don't merge.** Make one `.pptx` per source with only the selected slides (python-pptx: remove unwanted `sldId` entries from `prs.slides._sldIdLst` and `prs.part.drop_rel(rId)`; unreferenced parts are dropped on save). Order is preserved; masters, layouts and fonts stay intact. Cross-deck merging at the OPC level is possible but fragile and was not needed: Google's importer does the cross-theme merge.
6. **Keep each file under 10 MB** (the `file_upload` bridge cap, per call). Trimmed decks were 4-10 MB; one (Laba 8, 20 MB) needed `compress_pptx.py` (recompress images: max 1600 px, JPEG q80, PNG kept only when alpha is used; rewrites `.rels` + `[Content_Types]`): 19.9 -> 6.3 MB. Note in the deliverable which block was recompressed.
7. **Import into the destination Google Slides deck** (create it with Drive MCP `create_file`, mimeType presentation, in the right folder). In Chrome, per file: click a filmstrip thumbnail, press `End` (so the import appends at the end), click `File` -> `Import slides` (click the menu item by coordinates; `find`-ref clicks and the menu-search shortcut did not open it), click the `Upload` tab. The picker's file input sits in a same-origin `docs.google.com` iframe that `find`/`read_page` do not traverse, so: create a visible top-level `<input type=file id=aoMirror>` with `javascript_tool`, `find` it, `file_upload` into it, then in JS copy `mirror.files` into the iframe's input and dispatch `change`. Wait ~10 s, click `Select all`, then `Import slides` (both are top-document buttons; click via JS by text). "Keep original theme" is on by default. Each import took under 15 s; verify by pressing `End` and reading the last slide number in a screenshot. One file per `browser_batch`: the batch pre-validates the total upload size across all `file_upload` items.
8. Afterwards delete the default blank slide 1 (`Home`, `Delete` in the filmstrip) and remove the mirror input. Import-slides uploads did not leave `.pptx` files behind in Drive (checked with a mimeType + modifiedTime search).

## Dead ends (do not retry)

- `drive.google.com` navigation is refused by the extension's site allowlist ("Navigation to this domain is not allowed"), so the Drive web UI cannot be used for uploads; `docs.google.com` works (permission prompt on first standalone `computer` call).
- `javascript_tool` results are suppressed as "[BLOCKED: Cookie/query string data]" when the returned string or the scanned DOM includes URLs with query strings or when scanning `document.querySelectorAll('*')`; return short strings and scope DOM scans to the dialog.
- Drive MCP `download_file_content` returns base64 in the tool result: fine for text exports, unusable for multi-MB binaries. `create_file` with base64 is likewise only for small files.
- The gsheets OAuth token is Sheets-only; there is no Drive/Slides API credential, and minting one needs Alex's consent flow.
- Foreground `computer wait` is capped at 10 s per action; chain two waits.

## Deliverable pattern

Google Slides deck = placeholder slides (cover, index with source deck + slide numbers, mapping to the brief, Reforge-note summaries, caveats) generated with python-pptx (`make_placeholders.py`, grey background, "PLACEHOLDER" footer) + the untouched copied blocks. Offline copy of the trimmed decks + `selection.json` manifest on the Desktop.
