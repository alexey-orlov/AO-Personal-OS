# Document rendering & visual QA on this Mac (`KN7X2Y65NX`)

How to render `.pptx`/`.docx` to PDF/images for visual QA or hand-off on Alex's Mac.
Pointed from root `CLAUDE.md` — read this BEFORE rendering or QA-ing any deck/doc on this
machine. Findings are machine-specific and dated; re-verify if OS or app versions change.

## soffice (LibreOffice) — the default QA path

- LibreOffice / `soffice` **works again as of 2026-07-23** (v26.2.4.2 at
  `/Applications/LibreOffice.app/Contents/MacOS/soffice`, also `/opt/homebrew/bin/soffice`)
  — the old Gatekeeper SIGKILL (exit 137) is gone.
- So the pptx-skill's normal QA path is fine here: `soffice --headless --convert-to pdf …`
  then `pdftoppm -jpeg -r 130` → view the images (verified rendering a 38-slide deck + a
  scratch build, rc=0, real PDFs).
- Guard the Bash call with a poll-loop + `kill` since `timeout`/`gtimeout` aren't
  installed.
- Caveat: **soffice substitutes the SoftServe brand fonts (Azurio `Azurio-Regular` /
  Replica `Replica LL TT`) with a serif/sans, so trust geometry/overflow, not exact glyph
  widths** (leave ~10% slack on tight text).

## True-font QA with soffice (UPDATE 2026-07-23)

The substitution is avoidable, so soffice CAN give a pixel-accurate true-font QA +
hand-off PDF:

1. Copy the four brand faces from `/Library/Fonts/Managed/` (`Azurio-Regular*.otf`,
   `Azurio-Semibold*.otf`, `ReplicaLLTT-Regular*.ttf`, `ReplicaLLTT-Bold*.ttf`) into
   `~/Library/Fonts/` and `pkill -x soffice` so it rescans.
2. In the deck reference the **exact PostScript name `Azurio-Regular`, NOT the family
   `Azurio`** (the family substitutes to serif; `Replica LL TT` resolves fine as a
   family).
3. Remove the `~/Library/Fonts` copies afterward to leave the system clean.

Belt-and-suspenders: also measure fit with the real font files via PIL `ImageFont`
(points==px at 72dpi; box-inches×72) to prove no overflow independent of any renderer.

## PowerPoint AppleScript export — alternative true-font path

When exact brand-font fidelity matters, the **PowerPoint AppleScript export** (`open` →
`save … as save as PDF` → `close saving no`, then `pdftoppm`) is an alternative — but:

- It **failed with `-9074` on 2026-07-23 writing to `/private/tmp`, `~/Documents`, AND
  OneDrive alike** (sandbox/PDF-engine), so the soffice-with-real-fonts route above is
  the more reliable true-font path. It was verified working 2026-07-21.
- On first cold launch it may restore Alex's previously-open decks and throw AppleEvent
  `-1712` — never close presentations you didn't open.
- Wrap the whole `tell` block in `with timeout of 550 seconds` or a large deck throws
  AppleEvent `-1712` (default 60 s AppleEvent timeout); note `timeout`/`gtimeout` aren't
  installed, so guard shell-side with the Bash tool's own timeout.
- Fonts substitute (Azurio/Replica → serif/Arial) but geometry is true, so trust
  layout/overflow, not exact glyph widths.
- This beats HTML twins when surgically editing an existing branded deck (unzip → edit
  `slideN.xml` → zip). MS Word gives the same true render for `.docx`. Both may hang on
  first-launch dialogs.

## Hand-off default

Deliver the editable file and let Alex export the PDF himself.

## UPDATE 2026-09-07 — soffice conversion hangs; QuickLook is the working fallback

- `soffice --headless --convert-to pdf …` **hung on every input** this morning (even a 12-byte
  `.txt`), with no PDF and no stderr, across five guarded attempts (fresh
  `-env:UserInstallation` profile included); `soffice --version` still answers instantly
  (26.2.4.2). Treat the soffice path as broken until re-verified — do not loop on it.
- **Working fallback: macOS QuickLook** — `perl -e 'alarm 90; exec @ARGV' qlmanage -t -s 2600
  -o <outdir> "<file.pptx>"` writes `<outdir>/<file>.pptx.png` in ~2 s (first slide only —
  for one specific slide, save a single-slide deck first by dropping the other `sldId`
  entries; python-pptx then writes only reachable parts, so the file shrinks to tens of KB).
  Geometry and fills are true; brand fonts substitute as with soffice; the SoftServe logo
  placeholder may draw as an empty square (renderer limitation, verify in PowerPoint).
- Guard rule unchanged: no bare `sleep` loops in Bash (the tool blocks foreground sleep);
  wrap long calls with `perl -e 'alarm N; exec @ARGV'`.

## UPDATE 2026-09-09 — LibreOffice is gone; QuickLook + installed brand fonts is the real QA loop

- **`soffice` is no longer installed on this Mac at all** (neither `/Applications/LibreOffice.app`
  nor `/opt/homebrew/bin/soffice`; `pdftoppm` absent too). Don't spend attempts on it — go
  straight to QuickLook.
- **Per-slide QuickLook works and is fast (~2 s/slide).** QuickLook only ever renders slide 1, so
  render slide *N* by saving a single-slide copy first: with python-pptx, drop every other
  `sldId` from `prs.slides._sldIdLst` **and** `prs.part.drop_rel(rId)` for each, save, then
  `perl -e 'alarm 60; exec @ARGV' qlmanage -t -s 1600 -o <dir> <one-slide.pptx>`. Unreachable
  parts aren't written, so each temp file is tens of KB.
- **Install the deck's brand fonts and the renders become font-accurate.** Google Fonts families
  (Montserrat, Caveat, …) come as single variable TTFs from the `google/fonts` repo, e.g.
  `https://github.com/google/fonts/raw/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf` → drop in
  `~/Library/Fonts/`. (`fonts.google.com/download?family=X` returns an HTML page, not a zip.)
  Tell Alex if you leave fonts installed; removal is `rm ~/Library/Fonts/<file>`.
- **Measure text fit with the same font file rather than eyeballing a render.** PIL
  `ImageFont.truetype(path, pt)` + `set_variation_by_name('Bold'|'Medium')` + `getlength(s)/72`
  gives inches directly (points == px at 72 dpi). This is the reliable way to prove a heading
  fits on one row: usable width = box_W − lIns − rIns.
- **QuickLook silently ignores some valid DrawingML** — `<a:highlight>` (text highlight bands) and
  the fill of `prstGeom round2SameRect` both render as nothing, and a table stretches to fill an
  oversized `graphicFrame` instead of sizing to its rows. Verify those three in Google Slides /
  PowerPoint, not in the QuickLook PNG, and set table frame heights to the real content height.

## UPDATE 2026-09-11 — soffice/pdftoppm are back on disk, but conversion is STILL broken

Correcting the 2026-09-09 note above: the binaries are **not** gone.

- `/opt/homebrew/bin/soffice` (26.2.4.2) and `/opt/homebrew/bin/pdftoppm` (poppler 26.06.0) are
  **both installed and answer `--version` instantly.** So "LibreOffice is gone" was wrong — or has
  since been undone. Don't repeat the "binary is absent" claim without checking `which`.
- **But conversion still produces nothing**, exactly as on 2026-09-07. Two guarded attempts on a
  94 MB `.pptx` — one with a custom `-env:UserInstallation=file://…` profile, one with the plain
  default profile — **both exited rc=255 with no PDF in `--outdir` and a completely empty
  stdout/stderr log.** The failure is silent but at least it is a non-zero exit, so a wrapper can
  detect it; still `ls` the outdir rather than trusting rc alone.
- **Read a backgrounded run's output only after the task reports completion.** Mid-run the output
  file is empty, and an empty `cat` sitting above unrelated output in the same command block reads
  as if it were the task's result — that is how the first draft of this note recorded a bogus
  "rc=0" for the second attempt. Wait for the completion notification, then re-read the file.
- **Consequence: any recipe that starts "soffice → PDF → `pdftoppm -r N`" is dead**, including
  contact-sheet/thumbnail workflows. `pdftoppm` itself is fine — there is just never a PDF to feed
  it.
- **The per-slide QuickLook loop above remains the working path** and is fast enough for whole-deck
  inventory work: 11 slides of a 94 MB deck rendered at `-s 1600` in well under a minute.
  Caveat for big decks — a single-slide copy is only small when the *other* slides owned the media;
  here each temp file still weighed ~73 MB because a shared media pool stayed reachable, so budget
  disk (11 × 73 MB ≈ 800 MB) and delete the temp dir afterwards.
- **QuickLook also drops `<a:blip>` SVG images** (`asvg:svgBlip` in the `a:extLst`) — an SVG arrow
  or icon renders as an empty white rectangle, so a diagram can look like it has missing connectors
  when the PPTX is fine. Add this to the "verify in PowerPoint, not the PNG" list alongside
  `<a:highlight>` and `round2SameRect`.
- **Contact sheets: build them from the QuickLook PNGs with PIL**, not `pdftoppm`. Downscale each
  render to a fixed thumb width, paste on a grid, label each cell with its slide number.

### Same day, second run (10-deck / 192-slide inventory) — two corrections + a much faster loop

- **soffice can HANG rather than exit 255.** Three attempts here (default profile, and a fresh
  `-env:UserInstallation`) produced no PDF, no stderr, and **no exit at all** — still running after
  8 min on a 48 KB file, and `perl -e 'alarm N; exec @ARGV'` did not kill it because the alarm dies
  with the launcher script while `soffice.bin` runs on. So do **not** rely on a non-zero rc to
  detect the failure: always `ls` the outdir, and clean up with `pkill -x soffice; pkill -f
  soffice.bin`. Conclusion is unchanged — the soffice path is dead; don't spend attempts on it.
- **PowerPoint and Keynote AppleScript export are also dead right now** (both produced nothing,
  silently). Two notes if you try anyway: PowerPoint's `open` does **not** return a document
  reference on this version — `open inPath` then `set d to active presentation` — and Alex normally
  has ~9 of his own decks open, so never `close` anything you didn't open.
- **Build the single-slide copy at the zip level, not with python-pptx — ~50× faster.** Read the
  source zip once; write a new one keeping only the target `<p:sldId .../>` inside
  `<p:sldIdLst>` in `ppt/presentation.xml`, and copy **every other entry verbatim** with
  `ZIP_STORED` (no re-compress, no rels bookkeeping, no `drop_rel`). ~0.04 s per temp file even for
  a 19 MB deck. **Whole run: 192 slides across 10 decks in ~71 s (~0.37 s/slide including the temp
  build)** — the "~2 s/slide" figure above is pessimistic. Reusable script:
  `oneslide.py` + `render.py` pattern (build → `qlmanage` → move PNG → delete temp immediately).
- **Delete `docProps/thumbnail.*` from the temp zip.** Office embeds a cover thumbnail, and without
  dropping it QuickLook can serve that cached cover instead of rendering your slide — a silent
  wrong-image failure. Verify once per deck that slide 1 and slide N render *differently*.
- Temp files are full deck size with this trick (all media kept), so budget disk and delete as you
  go — 192 slides never held more than one temp file at a time.
