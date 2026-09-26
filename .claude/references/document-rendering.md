# Document rendering & visual QA on Alex's Macs

How to render `.pptx`/`.docx` to images for visual QA on Alex's two Macs. Pointed from root
`CLAUDE.md` — read this BEFORE rendering or QA-ing any deck/doc. Findings are machine-specific
and dated; check which Mac you are on first (`scutil --get ComputerName`). Rewritten to current
truth 2026-09-26 (added the MacBook Air and the PowerPoint export path).

## Which path to use

| Machine | Best path | Fallback |
|---|---|---|
| **Alex's MacBook Air** (`Alexs-MacBook-Air.local`) | **PowerPoint → PDF → PyMuPDF** (true fonts, template backgrounds) — works since PowerPoint was activated 2026-09-26 | QuickLook (geometry only) |
| **`KN7X2Y65NX`** | QuickLook per-slide trick (below) | PowerPoint export only if its window shows no "View Only" banner (see below) |

Tool inventory: MacBook Air — no soffice, no poppler (`pdftoppm`), no Homebrew, system `python3` is
3.9 (so the pptx skill's `validate.py`, which needs ≥ 3.10, does not run; a clean PowerPoint open +
export is the practical validation). KN7X2Y65NX — soffice installed but `--convert-to` produces
nothing (verified 09-07/09/11: hangs or exits 255 with an empty outdir) — don't spend attempts on it.

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
5. `close presentation "<name>" saving no` — close by name. `repeat with p in presentations … close p`
   fails with -2763; a variable named `out` collides with PowerPoint's dictionary (-10003).
6. Rasterise with PyMuPDF (`pip install pymupdf` into a scratchpad venv): `page.get_pixmap(dpi=110)`
   → 2934 × 1650 px for the 2×-scale GigaCloud template.
A ready script: `context/areas/gigacloud/docs/margin-deck/toolchain/pp_render.sh` (PDF + per-slide
PNGs + contact sheets).

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
