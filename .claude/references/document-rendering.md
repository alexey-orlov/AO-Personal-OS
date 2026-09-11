# Document rendering & visual QA on this Mac (`KN7X2Y65NX`)

How to render `.pptx`/`.docx` to images for visual QA or hand-off on Alex's Mac. Pointed from
root `CLAUDE.md` — read this BEFORE rendering or QA-ing any deck/doc on this machine. Findings
are machine-specific and dated; re-verify if OS or app versions change. Rewritten to current
truth 2026-09-11 (it had accumulated three contradictory dated updates).

## State of the tools (verified 2026-09-11)

| Tool | State | Use it? |
|---|---|---|
| **QuickLook** (`qlmanage`) | works, ~0.4 s/slide with the zip-level single-slide trick below | **yes — the QA path** |
| **soffice** (LibreOffice 26.2.4.2, `/Applications/LibreOffice.app/…` and `/opt/homebrew/bin/soffice`) | installed, `--version` answers, but **`--convert-to` produces nothing** — hangs indefinitely or exits 255 with an empty outdir; verified 09-07, 09-09 and 09-11 (default profile, fresh `-env:UserInstallation` profile, after killing stale instances and moving the stale `~/Library/Application Support/LibreOffice/4/.lock`) | **no — don't spend attempts** |
| `pdftoppm` / `pdftotext` (poppler) | fine | only if a PDF already exists (e.g. one Alex exported) |
| PowerPoint / Keynote AppleScript export | unreliable: `-9074` write failures in July, silent no-output on 09-11 | last resort only |

Rules that follow:
- If you still try soffice, run it guarded and **`ls` the outdir** — never trust rc. The `perl -e
  'alarm N; exec @ARGV'` guard kills only the launcher script; `soffice.bin` runs on, so finish
  with `pkill -x soffice; pkill -f soffice.bin`. A leftover instance also swallows every later
  invocation silently (single-instance IPC), so check `pgrep -f soffice.bin` before blaming the tool.
- No bare `sleep` loops in Bash (the tool blocks foreground sleep); wrap long calls with the perl
  alarm or the Bash tool's own `timeout`; `timeout`/`gtimeout` are not installed.
- Read a backgrounded run's output only after the task reports completion — an empty output file
  read mid-run has produced bogus "rc=0" conclusions before (09-11).

## The QA loop: QuickLook per slide (zip-level single-slide trick)

QuickLook renders only slide 1 of a deck, so render slide *N* from a temp copy that contains only
that slide:

1. Read the source zip once. Write a new zip that keeps only the target `<p:sldId …/>` inside
   `<p:sldIdLst>` in `ppt/presentation.xml` and copies **every other entry verbatim**
   (`ZIP_STORED`, no re-compress, no rels bookkeeping). ~0.04 s per temp file even for a 19 MB
   deck. (python-pptx `drop_rel` variants work too but are ~50× slower.)
2. **Delete `docProps/thumbnail.*` from the temp zip** — otherwise QuickLook may serve Office's
   cached cover image instead of your slide (a silent wrong-image failure). Verify once per deck
   that slide 1 and slide N render differently.
3. `perl -e 'alarm 60; exec @ARGV' qlmanage -t -s 1600 -o <outdir> <one-slide.pptx>` writes
   `<outdir>/<one-slide>.pptx.png` (`-s` = long edge in px; 2600 for close reading).
4. Delete the temp file immediately — it is full deck size (all media kept). Whole-deck runs:
   192 slides across 10 decks in ~71 s (2026-09-11). Reusable scripts from that pass live in that
   session's scratchpad (`oneslide.py`, `render.py`, `contact.py`); re-derive from the steps above
   if gone.
5. Contact sheets: PIL — downscale each render to a fixed thumb width, paste on a grid, label each
   cell with its slide number. Keep sheets ≤ ~2400 px wide so they stay readable in the Read tool.
6. Huge decks (hundreds of MB of embedded video): stream from the zip with a reachability walk,
   prune each master's `sldLayoutIdLst` too (else all layouts drag their media in) and stub the
   `.mp4` parts → 450 MB became 3–13 MB per slide (09-11).

**What QuickLook gets wrong — verify these in PowerPoint / Google Slides, not in the PNG:**
- Brand fonts substitute unless installed (see below). Azurio is genuinely a high-contrast serif
  (checked against the font file) — a serif title is not by itself a substitution artefact;
  Replica LL TT is a sans.
- `<a:highlight>` text bands and the fill of `prstGeom round2SameRect` render as nothing.
- **SVG images (`asvg:svgBlip`) render as empty white rectangles** — a diagram can look like it
  lost its arrows/icons when the PPTX is fine.
- A table stretches to fill an oversized `graphicFrame` instead of sizing to its rows — set
  frame heights to the real content height.
- The SoftServe logo placeholder draws as an empty square.

## Font-accurate renders and text-fit proof

- Install the deck's faces into `~/Library/Fonts/` and QuickLook renders them: the SoftServe
  brand faces are in `/Library/Fonts/Managed/` (`Azurio-Regular*.otf`, `Azurio-Semibold*.otf`,
  `ReplicaLLTT-Regular*.ttf`, `ReplicaLLTT-Bold*.ttf`, `RobotoMono-*.ttf`); Google Fonts families
  come as single variable TTFs from the `google/fonts` repo (e.g.
  `https://github.com/google/fonts/raw/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf`;
  `fonts.google.com/download?family=X` returns HTML, not a zip). In QA copies only, a face name
  the renderer does not resolve can be rewritten to the installed family (`Azurio-Regular` →
  `Azurio`, `Roboto Mono SS` → `Roboto Mono`). Tell Alex if you leave fonts installed; removal is
  `rm ~/Library/Fonts/<file>`. (As of 09-11 `RobotoMono-{Regular,Light,Bold}.ttf` are installed.)
- **Prove text fit with the font file, not the eye:** PIL `ImageFont.truetype(path, pt)` (+
  `set_variation_by_name('Bold'|'Medium')` for variable fonts), `getlength(s)/72` gives inches
  (points == px at 72 dpi); usable width = box width − lIns − rIns. Leave ~10% slack on tight
  text.

## PowerPoint AppleScript notes (if you must)

`open inPath` does not return a document reference on this version — follow with `set d to
active presentation`; wrap the `tell` block in `with timeout of 550 seconds` (default AppleEvent
timeout is 60 s → `-1712`); on a cold launch it may restore Alex's previously open decks (he
normally has several open) — **never close a presentation you didn't open**. Export failed with
`-9074` to `/private/tmp`, `~/Documents` and OneDrive alike (2026-07-23) and produced nothing at all
on 2026-09-11. MS Word behaves the same for `.docx`.

## Hand-off default

Deliver the editable file and let Alex export the PDF himself. LibreOffice-made PDFs (when
soffice worked, Jul–Aug 2026) carried substituted fonts; true-font PDFs come from PowerPoint.
