# Document rendering & visual QA on Alex's Macs

How to render `.pptx`/`.docx` to images for visual QA on Alex's two Macs. Pointed from root
`CLAUDE.md` — read this BEFORE rendering or QA-ing any deck/doc. Findings are machine-specific
and dated; check which Mac you are on first (`scutil --get ComputerName`). Rewritten to current
truth 2026-10-22 (PowerPoint export now works on KN7X2Y65NX too).

## Which path to use

| Machine | Best path | Fallback |
|---|---|---|
| **Alex's MacBook Air** (`Alexs-MacBook-Air.local`) | **PowerPoint → PDF → PyMuPDF** (true fonts, template backgrounds) — works since PowerPoint was activated 2026-09-26 | QuickLook (geometry only) |
| **`KN7X2Y65NX`** | **PowerPoint → PDF → `pdftoppm`** (true fonts) — worked for every export on 2026-10-22 (a 14-slide reference deck, three one-slide summaries, eight builds of a 13-slide deck with an embedded video), even with Alex's own decks open in PowerPoint | QuickLook per-slide trick (below), if the export writes no PDF |

Tool inventory: MacBook Air — no soffice, no poppler (`pdftoppm`), no Homebrew, system `python3` is
3.9 (so the pptx skill's `validate.py`, which needs ≥ 3.10, does not run; a clean PowerPoint open +
export is the practical validation). KN7X2Y65NX — Homebrew `pdftoppm` (poppler) rasterises the PDF
(`pdftoppm -r 80 -png deck.pdf out`), and system `python3` (3.14) runs the pptx skill's `validate.py`;
no PyMuPDF in the system Python. soffice is installed but `--convert-to` produces nothing (verified
09-07/09/11: hangs or exits 255 with an empty outdir) — don't spend attempts on it.

## PowerPoint export (the accurate path)

**Precondition: PowerPoint must be activated.** An unactivated install opens decks in **View Only**
("Activate Microsoft 365 to Create and Edit" banner), and then every AppleScript save/export fails
with **-9074** — that was the whole cause of the 2026-09-26 failures, and is the first thing to check
wherever -9074 appears. Activation is Alex's sign-in; never type credentials — ask him.

Working recipe (≈ 6–10 s for a 26-slide deck):
1. `cp deck.pptx ~/Library/Containers/com.microsoft.Powerpoint/Data/Documents/qa/<unique>.pptx`
   (PowerPoint is sandboxed; its own container is always readable/writable).
2. `open -a "Microsoft PowerPoint" <that file>` — **never** AppleScript `open`: it hangs and then
   blocks every later Apple Event until PowerPoint is restarted.
3. Poll `osascript -e 'tell application "Microsoft PowerPoint" to get name of presentations'` until
   the name appears.
4. `tell application "Microsoft PowerPoint" to save presentation "<name>" in (POSIX file "<out.pdf>") as save as PDF`
   (wrap in `with timeout of 270 seconds`; guard the call with `perl -e 'alarm N; exec @ARGV'`).
   Then check that the PDF exists and is non-empty before trusting the call: on KN7X2Y65NX on
   2026-10-02 it once returned without an error and wrote no file (View Only suspected, not
   confirmed); when that happens, fall back to QuickLook plus the builder's fit report.
5. `close presentation "<name>" saving no` — close by name. `repeat with p in presentations … close p`
   fails with -2763; a variable named `out` collides with PowerPoint's dictionary (-10003).
6. Rasterise with PyMuPDF (`pip install pymupdf` into a scratchpad venv): `page.get_pixmap(dpi=110)`
   → 2934 × 1650 px for the 2×-scale GigaCloud template.
A ready script: `context/areas/gigacloud/docs/margin-deck/toolchain/results-deck/pp_render.sh`
(PDF + per-slide PNGs + contact sheets; `PY=<venv python with pymupdf+pillow>`).

**Exact text widths come from the same export.** When a layout decision depends on whether a label fits on one line (chip
heights, table rows) and the brand font is not installed as a file (e-Ukraine is only embedded, compressed, in the GigaCloud
template), measure instead of estimating. Build a calibration deck with one no-wrap text box per (text, font, size), export it, and
read each line's bbox width from the PDF with PyMuPDF (`page.get_text('dict')`). Cache the widths as JSON and let the builder
read the cache, falling back to the estimate. PowerPoint wraps about 0.05 in before the measured width reaches the box edge. The
char-count estimate was off by −12 % to +5 % depending on the letters: Latin lowercase is narrow, Cyrillic and capitals wide.
Tools: `context/areas/gigacloud/docs/publication-process-deck/`'s toolchain (`tools/measure_build.py`, `tools/measure_read.py`).

**The PDF export leaves out hidden slides** (`<p:sld show="0">`), so the page numbers shift after each hidden slide and
the hidden slides themselves never get checked. To QA them, build a copy with them unhidden (a build flag,
e.g. `SHOW_HIDDEN=1`) and render that. Then build the deliverable with them hidden and confirm the page
count drops by the number of hidden slides (2026-10-12, the GigaCloud publication deck: 59 slides, 56 PDF pages).

Never close a presentation you didn't open; on a cold launch PowerPoint may show its start gallery
(dismiss with Cancel) or restore Alex's decks.

## QuickLook per-slide trick (geometry-only fallback)

QuickLook renders only slide 1 of a deck, so render slide *N* from a temp copy that contains only
that slide:

1. Read the source zip once. Write a new zip that keeps only the target `<p:sldId …/>` inside
   `<p:sldIdLst>` in `ppt/presentation.xml` and copies every other entry verbatim (`ZIP_STORED`).
   Use a **fresh `ZipInfo` per entry** — passing the source's `ZipInfo` to `writestr` mutates its
   header offset and the next read fails with "Bad CRC-32".
2. Delete `docProps/thumbnail.*` from the temp zip — otherwise QuickLook may serve Office's cached
   cover image instead of your slide.
3. `perl -e 'alarm 60; exec @ARGV' qlmanage -t -s 1600 -o <outdir> <one-slide.pptx>`.
4. Delete the temp file immediately (it is full deck size).
5. Contact sheets: PIL grid, ≤ ~2400 px wide so they stay readable in the Read tool.

**What QuickLook gets wrong — never judge text fit or looks from it:**
- Brand fonts substitute unless installed (e-Ukraine becomes a narrow serif, so overflow is hidden;
  e-Ukraine is much wider — ~0.009 in per pt per character in Bold).
- On the MacBook Air it drops the template's background images entirely (no cloud).
- `<a:highlight>` bands, `round2SameRect` fills and SVG images (`asvg:svgBlip`) render as nothing /
  empty white rectangles; an oversized table `graphicFrame` stretches the table.

## Fonts

- e-Ukraine (GigaCloud template) is embedded in the decks as EOT with MicroType-Express compression
  (`ppt/fonts/*.fntdata`, "LP" magic at byte 34) — not extractable without an MTX decoder; PowerPoint
  renders it from the embedded data, which is why the PowerPoint path is the accurate one.
- SoftServe faces live in `/Library/Fonts/Managed/` on KN7X2Y65NX; installing a face into
  `~/Library/Fonts/` makes QuickLook render it. Tell Alex if you leave fonts installed.
- Prove text fit with the font file where you have it: PIL `ImageFont.truetype(path, pt).getlength(s)/72`
  = inches; leave ~10 % slack.

## Hand-off default

Deliver the editable file; Alex exports the PDF himself when he needs one.
