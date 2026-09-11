# NATO AI use-case map — deck builder

Data-driven python-pptx builder for the SoftServe-branded "NATO AI use-case map" deck (Oracle Defense stream,
Karsten Tramborg's thread). Moved here from the cloud session's scratchpad on 2026-09-11 so a local session can
rebuild and extend the deck; the working report that explains the content is
`context/areas/softserve/docs/2026-09-03_nato-ai-use-case-map.md` (§3.1 = the map, §9 = the cases).

## Files

- `build_slide.py` — the builder. One renderer per slide kind: `render_map` (5 L1 lanes × 17 L2 tiles, chips + pills,
  visual key), `render_rows` (evidence slides: NATO demand signals, FreeTech cases), `render_criteria` (opener),
  `render_case` (six identical use-case slides), `render_next` (close). Prints a FIT report (`need` vs `have` in EMU,
  `OVERFLOW` when text will not fit the brand fonts) — a build with any OVERFLOW line is not done, with ONE known-benign
  exception on the default deck: `crit 4 desc  need 548640 have 420000` (the ×1.1 ragged-wrap allowance rounds a genuinely
  three-line criterion gloss up to four; it renders on three lines — measured 2026-09-11, present since v10).
- `slide_data.json` — the map (lanes, tiles, tags, chip labels), the key, the evidence slides, the criteria matrix, the
  next-steps blocks, and `views` (the slide order; footnote cross-references are generated from it).
- `case_slides.json` — the six case slides (problem / solution / KPI pills / diagram / proof strip).
- `slide_data_pipeline.json` — the **pipeline-cases review variant** (2026-09-11): the neutral map with a fourth pill family —
  outlined brand orange = a funded, scoped SoftServe pipeline case on Oracle, not yet delivered (2.1 DHL · 4.1 SBG · 1.3 NHS ·
  3.1 Channel 4) — plus a `pipe_slide` ("The Oracle pipeline cases", 2 × 2 cards in the FreeTech-slide skeleton). `cases_file: null`
  = no case slides. Builds `out/NATO map — pipeline cases (review).pptx`.
- `out/` — build output, git-ignored (the deliverable `NATO AI use-case map.pptx` + the `-qa.pptx` twin).

## Build

```bash
python3 .claude/references/nato-map-deck/build_slide.py          # → out/NATO AI use-case map.pptx + out/…-qa.pptx
DECK_DATA=path/to/variant.json python3 …/build_slide.py           # a variant data file builds a variant deck (its own `out`
                                                                  #   filename and `views`; `cases_file` names its case file,
                                                                  #   `null` = no case slides)
DECK_DATA=slide_data_pipeline.json python3 build_slide.py         # the 2-slide pipeline-cases review deck (run from this folder)
DECK_OUT_DIR=… DECK_BASE=… DECK_FONT_DIR=…                        # optional overrides
```

Needs `python-pptx`, `Pillow`, and the 41 KB base `.claude/references/softserve-deck-base.pptx` (next to this folder).
Text measurement uses metric stand-ins for the brand fonts: Liberation Sans / Mono (Linux, or `brew install --cask
font-liberation` on macOS) with Arial / Courier New as the macOS fallback; set `DECK_FONT_DIR` if neither is found.

## QA render (never deliver the twin)

**On Alex's Mac (brand fonts installed in `~/Library/Fonts`): render the DELIVERABLE with QuickLook, one slide at a time** — the
zip-level single-slide trick in `.claude/references/document-rendering.md` (keep one `<p:sldId>` in a temp copy, delete
`docProps/thumbnail.*`, `perl -e 'alarm 60; exec @ARGV' qlmanage -t -s 2400 -o <outdir> <one-slide.pptx>`; ~0.4 s per slide,
font-true). `soffice --convert-to` has been dead on that Mac since 2026-09-07 — do not spend attempts on it. QuickLook draws the
logo placeholder as an empty square and shows the base template's cached slide number on every slide; PowerPoint recomputes both.

**Headless (cloud) without the brand fonts:** the `-qa.pptx` twin swaps the brand fonts for Liberation so LibreOffice renders the
right widths:

```bash
cd .claude/references/nato-map-deck/out
soffice --headless --convert-to pdf "NATO AI use-case map-qa.pptx"
python3 -c "import pymupdf; d=pymupdf.open('NATO AI use-case map-qa.pdf'); [p.get_pixmap(dpi=120).save(f'slide-{i+1}.png') for i,p in enumerate(d)]"
```

Then look at every changed slide. Design rules: `.claude/references/slide-design.md`; template tokens, the pill grammar
and what two QA rounds caught: `.claude/references/softserve-deck-kit.md`.

## Versions

- v7 (2026-09-07) — four slides: demand signals · FreeTech cases · neutral map · first-wave map. The map Alex edited.
- v10 (2026-09-07) — twelve slides: criteria opener · the two evidence slides · the two maps · six case slides · next steps.
- v11 (2026-09-08) — v10 after the second design-QA pass (shared case-slide geometry, red 4.2 tile 2 pt, cuOpt / AI-Q /
  AI Lakehouse spellings, criteria matrix 4.2 last, next-steps reflow). This is what the checked-in data builds.
- v11.1 (2026-09-11) — builder gains the fourth pill family (`pipe_pill`, the tile slot between FT and Oracle, the key sample,
  `tag_style="pipe"` on the evidence renderer with one slot width per slide, `kind: pipe`, silent `cases_file: null`) and the
  pipeline-cases review variant (`slide_data_pipeline.json`, 2 slides). The default 12-slide build is byte-identical to v11.
