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

## When Alex says a slide EXISTS (rule, 2026-09-08)

If the brief marks a slide `[Exist; PB]` / `[EXIST, Laba]` / "exists in the X deck" and you cannot
find it — or you find it but it is unusable (a baked image that cannot be translated or
re-exampled, or it breaks a hard rule like naming GigaCloud) — **report that and ask.** Do not
quietly design a replacement and carry on. Alex knows his own decks; a "can't find it" is
information he can act on (he may know the other lesson it lives in), whereas a silent
substitution reads as done and he only discovers it in the room.

This is the deck-specific case of the standing rule that an environment limitation is never a
factual conclusion. "Not editable in the deck I looked at" is a finding, not a licence.

Practically: before substituting anything, sweep the other lessons for a build-up sequence of the
same framework — these decks often assemble a diagram across several slides out of real shapes,
and those slides ARE editable even when the single summary slide is a flat picture.

## Gotchas learned 2026-09-08 (building the lecture deck from the pack)

- **`read_file_content` silently TRUNCATES a large presentation.** On the 129-slide pack it
  returned ~64 k chars and stopped mid-word, ~128 slides in — with no error. Never derive
  slide numbering from it for a deck of this size. Export the `.pptx` and enumerate with
  python-pptx instead; that also gives the exact 1:1 numbering the user sees in the Slides UI.
- **Trimming without `drop_rel` leaves every removed slide in the package.** Removing
  `sldId` entries alone hides the slides but their parts stay reachable through
  `ppt/_rels/presentation.xml.rels`, so the file keeps its full size and `save()` emits
  `Duplicate name:` zipfile warnings. Always pair the `sldIdLst` removal with
  `prs.part.drop_rel(rId)` for each dropped slide (31 MB -> 12.5 MB on this deck).
- **The slide-duplication recipe does not work on python-pptx 1.0.2**:
  `_Relationships.add_relationship` no longer exists, and hand-building `_Relationship`
  objects fails the `isinstance(self._target, Part)` assert on save. If a slide is needed
  twice, rebuild the second copy natively from the first one's geometry (read positions
  with `Emu(sh.left).inches`) — it is quicker than fighting the OPC layer, and it lets you
  vary the copy (e.g. dim/highlight states) which is usually why you wanted the duplicate.
- **Position lookups must disambiguate label vs backing rectangle.** These decks stack a
  text shape a few hundredths of an inch over its coloured fill shape, so a tolerant
  position match hits the rectangle first and writes text nobody sees. Filter for shapes
  that already carry text.
- **Reorder by splicing an explicit target list, never by index arithmetic** after
  deletions and appends — off-by-one silently drops a slide (a section divider went
  missing this way and only a full title-by-title readback caught it). Build
  `target = before[:1] + [new] + before[2:32] + [new2]`, assert its length, then re-append.
- **Drop `ppt/fonts/` before uploading to Google Slides.** Google has Montserrat and Caveat
  natively, so the embedded font parts are dead weight (2.3 MB here). Remove the parts, the
  `<p:embeddedFontLst>` in `presentation.xml`, their `.rels` entries and their
  `[Content_Types]` overrides. With image downscaling this took 12.5 MB -> 2.1 MB.
- **QA in Google Slides, not locally.** `soffice --headless --convert-to pdf` still produced
  no output on 2026-09-08 (the hang documented in `document-rendering.md` persists), and
  Montserrat/Caveat are not installed on this Mac anyway. Importing and screenshotting the
  grid view is both faster and truer — it renders the real fonts.
- **Re-importing a corrected build:** select a slide, `cmd+a`, `Delete` empties the deck to
  0 slides (Google allows this), then import again — the URL and file stay the same. The
  Import dialog's buttons shift position once an injected mirror `<input>` is removed, so
  re-screenshot before clicking `Select all` / `Import slides`.

## Gotchas learned 2026-09-09 (rebuilding the lecture deck)

- **THE BIG ONE — new slides silently overwrite kept slides in a trimmed deck.**
  `Slides.add_slide` names the new part `/ppt/slides/slide{len(sldIdLst)+1}.xml`, but a trimmed
  deck keeps its slides' ORIGINAL part numbers (27, 52, … 115). So once you have added enough
  new slides, one of them is handed a partname a kept slide still uses; the zip holds one entry
  for that name and **the kept slide is gone**, replaced by a duplicate of the new one. It fails
  silently: the deck still has the right slide COUNT, and only a title-by-title readback catches
  it. Fix: right after trimming and before adding anything, renumber the kept parts contiguously —
  `for i, sl in enumerate(list(prs.slides), 1): sl.part.partname = PackURI('/ppt/slides/slide%d.xml' % i)`.
  Then assert no two `sldId` entries resolve to the same target before saving.
- **Never map slides to their sldId elements via parts or rIds after a `drop_rel` pass** — freed
  rIds get reused, so a rel-based lookup aliases two slides together. Capture each element when
  the slide is created (`list(prs.slides._sldIdLst)[-1]` right after `add_slide`) and order from
  that.
- **Import slides inserts AFTER the current selection, not at the end.** Skipping the `End`
  keypress puts the whole imported block behind slide 1. Click a filmstrip thumbnail and press
  `End` before every import — including the second and third.
- **This makes multi-file assembly easy:** to insert a block in the middle, split the deck at the
  insertion point and import part A → the block → part B, pressing `End` between each. No
  thumbnail dragging, and the order is exact. To replace one slide in place, select the slide
  BEFORE it, import a one-slide file, then delete the old one.
- **`<p:sld show="0">` (skip in slideshow) survives export, trimming and import.** A slide copied
  from a deck where it was hidden arrives hidden, showing an eye-with-slash on the thumbnail and
  silently vanishing in presentation mode. Check `slide.element.get('show')` across the deck and
  `del slide.element.attrib['show']` on anything flagged.
- **Real brand logos:** corporate marks are usually non-free, so Wikimedia Commons only has
  sub-brands. Get the genuine one from the Wikipedia infobox —
  `en.wikipedia.org/w/api.php?action=query&titles=<Company>&prop=pageimages&piprop=original` —
  then fetch it through `Special:FilePath/<File>.svg?width=600`, which renders SVG to a
  transparent PNG that python-pptx can place directly. Check what came back: the pageimage is
  sometimes a photo of the HQ rather than the logo.
- **`add_picture` then reposition**: place at (0,0), read `Emu(pic.height).inches`, then set
  `left`/`top` to centre on a tick and bottom-align a row of logos of different aspect ratios.

## Dead ends (do not retry)

- `drive.google.com` navigation is refused by the extension's site allowlist ("Navigation to this domain is not allowed"), so the Drive web UI cannot be used for uploads; `docs.google.com` works (permission prompt on first standalone `computer` call).
- `javascript_tool` results are suppressed as "[BLOCKED: Cookie/query string data]" when the returned string or the scanned DOM includes URLs with query strings or when scanning `document.querySelectorAll('*')`; return short strings and scope DOM scans to the dialog.
- Drive MCP `download_file_content` returns base64 in the tool result: fine for text exports, unusable for multi-MB binaries. `create_file` with base64 is likewise only for small files.
- The gsheets OAuth token is Sheets-only; there is no Drive/Slides API credential, and minting one needs Alex's consent flow.
- Foreground `computer wait` is capped at 10 s per action; chain two waits.

## Deliverable pattern

Google Slides deck = placeholder slides (cover, index with source deck + slide numbers, mapping to the brief, Reforge-note summaries, caveats) generated with python-pptx (`make_placeholders.py`, grey background, "PLACEHOLDER" footer) + the untouched copied blocks. Offline copy of the trimmed decks + `selection.json` manifest on the Desktop.
