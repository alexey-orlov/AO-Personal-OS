# NATO AI use-case map — deck builder

Data-driven python-pptx builder for the SoftServe-branded "NATO AI use-case map" deck (Oracle Defense stream,
Karsten Tramborg's thread). Moved here from the cloud session's scratchpad on 2026-09-11 so a local session can
rebuild and extend the deck; the working report that explains the content is
`context/areas/softserve/docs/2026-09-03_nato-ai-use-case-map.md` (§3.1 = the map, §9 = the cases).

## Files

- `build_slide.py` — the builder. One renderer per slide kind: `render_map` (5 L1 lanes × 17 L2 tiles, chips + pills,
  visual key), `render_rows` (evidence slides: NATO demand signals, FreeTech cases), `render_criteria` (opener),
  `render_case` (six identical use-case slides), `render_next` (close). Prints a FIT report (`need` vs `have` in EMU,
  `OVERFLOW` when text will not fit the brand fonts) — a build with any OVERFLOW line is not done.
- `slide_data.json` — the map (lanes, tiles, tags, chip labels), the key, the evidence slides, the criteria matrix, the
  next-steps blocks, and `views` (the slide order; footnote cross-references are generated from it).
- `case_slides.json` — the six case slides (problem / solution / KPI pills / diagram / proof strip).
- `out/` — build output, git-ignored (the deliverable `NATO AI use-case map.pptx` + the `-qa.pptx` twin).

## Build

```bash
python3 .claude/references/nato-map-deck/build_slide.py          # → out/NATO AI use-case map.pptx + out/…-qa.pptx
DECK_DATA=path/to/variant.json python3 …/build_slide.py           # a variant data file builds a variant deck (its own `out`
                                                                  #   filename and `views`; `cases_file` names its case file)
DECK_OUT_DIR=… DECK_BASE=… DECK_FONT_DIR=…                        # optional overrides
```

Needs `python-pptx`, `Pillow`, and the 41 KB base `.claude/references/softserve-deck-base.pptx` (next to this folder).
Text measurement uses metric stand-ins for the brand fonts: Liberation Sans / Mono (Linux, or `brew install --cask
font-liberation` on macOS) with Arial / Courier New as the macOS fallback; set `DECK_FONT_DIR` if neither is found.

## QA render (never deliver the twin)

The `-qa.pptx` twin swaps the brand fonts for Liberation so headless LibreOffice renders the right widths:

```bash
cd .claude/references/nato-map-deck/out
soffice --headless --convert-to pdf "NATO AI use-case map-qa.pptx"    # macOS path + gotchas: .claude/references/document-rendering.md
python3 -c "import pymupdf; d=pymupdf.open('NATO AI use-case map-qa.pdf'); [p.get_pixmap(dpi=120).save(f'slide-{i+1}.png') for i,p in enumerate(d)]"
```

Then look at every changed slide. Design rules: `.claude/references/slide-design.md`; template tokens, the pill grammar
and what two QA rounds caught: `.claude/references/softserve-deck-kit.md`.

## Versions

- v7 (2026-09-07) — four slides: demand signals · FreeTech cases · neutral map · first-wave map. The map Alex edited.
- v10 (2026-09-07) — twelve slides: criteria opener · the two evidence slides · the two maps · six case slides · next steps.
- v11 (2026-09-08) — v10 after the second design-QA pass (shared case-slide geometry, red 4.2 tile 2 pt, cuOpt / AI-Q /
  AI Lakehouse spellings, criteria matrix 4.2 last, next-steps reflow). This is what the checked-in data builds.
