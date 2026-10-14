# Document rendering & visual QA (Alex's Macs and cloud sessions)

How to render `.pptx`/`.docx` to images for visual QA on Alex's two Macs and in Claude Code cloud
sessions. Pointed from root `CLAUDE.md` — read this BEFORE rendering or QA-ing any deck/doc. Findings
are machine-specific and dated; check where you are first (`scutil --get ComputerName` on a Mac; a
Linux container is a cloud session). Rewritten to current truth 2026-10-14 (the e-Ukraine font files
and the cloud-session path).

## Which path to use

| Machine | Best path | Fallback |
|---|---|---|
| **Alex's MacBook Air** (`Alexs-MacBook-Air.local`) | **PowerPoint → PDF → PyMuPDF** (true fonts, template backgrounds) — works since PowerPoint was activated 2026-09-26 | QuickLook (geometry only) |
| **`KN7X2Y65NX`** | QuickLook per-slide trick (below) | PowerPoint export only if its window shows no "View Only" banner (see below) |
| **Claude Code cloud session** (Linux container) | **LibreOffice → PDF → `pdftoppm`**, with the e-Ukraine OTFs installed (see Fonts): true fonts and template backgrounds, ~40 s for a 61-slide deck (2026-10-14, GigaCloud publication deck) | - |

Tool inventory: MacBook Air — no soffice, no poppler (`pdftoppm`), no Homebrew, system `python3` is
3.9 (so the pptx skill's `validate.py`, which needs ≥ 3.10, does not run; a clean PowerPoint open +
export is the practical validation). KN7X2Y65NX — soffice installed but `--convert-to` produces
nothing (verified 09-07/09/11: hangs or exits 255 with an empty outdir) — don't spend attempts on it.
Cloud session (2026-10-14) — soffice (use the pptx skill's `scripts/office/soffice.py` wrapper),
`pdftoppm`, python-pptx, Pillow and gcc present, the pptx skill's `validate.py` runs; no PyMuPDF.
LibreOffice skips hidden slides in the PDF too.

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
   2026-10-02 it returned without an error and wrote no file (View Only suspected, not confirmed),
   so the deck QA fell back to QuickLook plus the builder's fit report.
5. `close presentation "<name>" saving no` — close by name. `repeat with p in presentations … close p`
   fails with -2763; a variable named `out` collides with PowerPoint's dictionary (-10003).
6. Rasterise with PyMuPDF (`pip install pymupdf` into a scratchpad venv): `page.get_pixmap(dpi=110)`
   → 2934 × 1650 px for the 2×-scale GigaCloud template.
A ready script: `context/areas/gigacloud/docs/margin-deck/toolchain/results-deck/pp_render.sh`
(PDF + per-slide PNGs + contact sheets; `PY=<venv python with pymupdf+pillow>`).

**Text widths: compute them from the font file.** When a layout decision depends on whether a label fits on one line (chip
heights, table rows), measure with the real font: PIL `ImageFont.truetype(<otf>, 1000).getlength(s) / 1000 × pt / 72` = inches.
These are advance widths without kerning, so they are an upper bound. PowerPoint wraps about 0.05 in before the box edge; keep
≥ 0.2 in slack. The char-count estimate (`text_w` in the GigaCloud `lib.py`) is off by −12 % to +5 % (Latin lowercase narrow,
Cyrillic and capitals wide), so never size from it when the font is at hand. Before 2026-10-14 the e-Ukraine files were believed
unavailable, so the publication-deck toolchain measured widths through a PowerPoint calibration deck (one no-wrap text box per
text, widths read from the PDF with PyMuPDF `page.get_text('dict')`, cached as JSON: `tools/measure_build.py`,
`tools/measure_read.py`). That remains the check of PowerPoint's own line breaking.

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
  e-Ukraine is much wider — ~0.009 in per pt per character in Bold). With the e-Ukraine OTFs in
  `~/Library/Fonts/` it should render the real face (not yet verified on the Macs).
- On the MacBook Air it drops the template's background images entirely (no cloud).
- `<a:highlight>` bands, `round2SameRect` fills and SVG images (`asvg:svgBlip`) render as nothing /
  empty white rectangles; an oversized table `graphicFrame` stretches the table.

## Fonts

- **e-Ukraine (GigaCloud template) is a public font, and the decks embed exactly that font.** The OTFs are CC BY 4.0: official
  page thedigital.gov.ua/fonts, git mirror `github.com/bennetfabian/e-Ukraine` (`e-Ukraine-Light.otf`, `-Bold.otf`, …).
  The decks embed e-Ukraine Light and Bold as EOT with MicroType-Express compression (`ppt/fonts/*.fntdata`, EOT flags 0x4).
  On 2026-10-14 both were extracted from the publication deck and matched the mirror's files in every table except `head`
  (checksums only): same glyphs, widths and kerning, same version (69599).
- Install: Linux `~/.fonts/` then `fc-cache -f`; macOS `~/Library/Fonts/` (tell Alex if you leave fonts installed).
  The family names are «e-Ukraine Light» / «e-Ukraine Bold», which the decks reference. To query fontconfig, escape the
  hyphen (`fc-match 'e\-Ukraine Light'`). Unescaped, the name parses as something else and matches Inter.
- To pull an embedded font out of any deck: build libeot's `eot2ttf` (`github.com/umanwizard/libeot`; compile every `src/`
  file with `gcc -std=c99 -DDECOMPRESS_ON -I inc -I src`), run it on each `.fntdata`. For a CFF font, overwrite the first four
  bytes with `OTTO`, because libeot writes the TrueType tag `00010000` and FreeType then refuses the file.
- SoftServe faces live in `/Library/Fonts/Managed/` on KN7X2Y65NX; installing a face into
  `~/Library/Fonts/` makes QuickLook render it.
- Prove text fit with the font file (see "Text widths" above); leave ~10 % slack when the renderer is not PowerPoint.

## Hand-off default

Deliver the editable file; Alex exports the PDF himself when he needs one.
