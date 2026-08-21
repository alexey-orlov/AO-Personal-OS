# SoftServe-branded decks — build kit

Everything reusable from the 2026-08-20 US-contract-terms slide build, so the next
SoftServe deck starts from a ready base instead of re-deriving the brand from the 26 MB
template. Read WITH `.claude/references/slide-design.md` (always) and
`client-documents.md` (if a client will see it). Rendering/QA mechanics for this Mac:
`document-rendering.md`.

## Fast path: the stripped base

`.claude/references/softserve-deck-base.pptx` — 41 KB single-slide shell derived from the
full template: real master + theme + logo, ONE layout (the white content layout,
`slideLayout20`), one placeholder table slide, zero media bloat. All content is
placeholder ("Label" / "Value" / "Slide title"); the third row + footnote keep the
orange-asterisk idiom as a copy-ready exemplar.

Workflow: copy it to the scratchpad under the output name → unzip → edit
`ppt/slides/slide6.xml` placeholders (duplicate/remove `<a:tr>` blocks for more/fewer
rows; keep `ext cy` ≈ rows × row height) → zip from inside the dir → validate with
`--original <the base>` → render QA. Never edit the base in place.

## Full template (for other layouts)

OneDrive **root** (not `Projects/`): `Presentation templates/BEST_TEMPLATE_Oracle
SoftServe EMEA Business Alignment July 2026.pptx`. Slide map (saves a thumbnail pass):
1 dark photo title · 2 dark contents · 3/4/8/10/13/22 orange gradient section dividers ·
5/6/7 white table slides (6 = leanest, the base's ancestor) · 9/11/12/14–17 white
boxed-content slides · 23 dark photo closing · 18–21 hidden junk. Other decks in that
folder are content decks, not templates.

## Brand tokens

- Colors: accent orange `F36949` · label grey `808080` · hairline rules `DCDCDC` ·
  footnote text `595959` · body black `000000`.
- Fonts: titles `+mj-lt` (= Azurio; keep the theme reference, don't hardcode) · body
  `ReplicaLLTT-Regular` (panose `020B0504010101010104`, pitchFamily 34, charset 77) ·
  table labels / small keys `Roboto Mono` (pitchFamily 49, cs `Calibri`).
- Sizes that worked: title 2800 · table values 1600 · table labels 1150 · footnote 1000.

## Geometry constants (EMU, 12192000 × 6858000 canvas)

- Left margin / content x: `358732`; content width: `11493500` (right margin ≈ left).
- Title: y `1081987`, cy `396858`.
- Table: y `1850000`; row h `940000` (4 rows) or `760000` (5 rows); label col `3300000`, value col `8193500`.
- Footnote: y `5760000` cy `320000` (one line) or y `5800000` cy `480000` (two lines, e.g. `*` + `**` markers); sz 1000, `lIns/tIns/rIns/bIns=0`.
- Table cell idiom (the base embodies it — copy cells, don't rebuild): insets
  `marL/R 72009, marT/B 72000`, `anchor="ctr"`; fills transparent (`FFFFFF` alpha 0);
  no vertical rules (`lnL/lnR w="0"`); first row `lnT` = orange `12700`, every other
  `lnT`/`lnB` = `DCDCDC 9525`.

## Deriving a new shell from the full template (pruning recipe)

Only needed for a NEW base (e.g. a divider or dark-title shell): keep the wanted slide in
`<p:sldIdLst>` → prune the master's `<p:sldLayoutIdLst>` + its `_rels` to the layout(s)
actually used → **the pptx-skill's `clean.py` does NOT sweep orphaned layouts** — delete
the layout files + their `_rels` by hand, strip their `<Override>` entries from
`[Content_Types].xml`, then delete media no longer referenced by any surviving `.rels` →
`validate.py out.pptx --original <full template>`. Result should be ~40 KB.

## QA gotchas (this template family)

- `markitdown` returns EMPTY for these table slides — for content QA use `pdftotext` on
  the QA PDF or grep `<a:t>` runs in the slide XML instead.
- soffice substitutes Azurio → serif in renders (geometry true, glyphs wrong); the
  true-font path and the `timeout`-not-installed guard live in `document-rendering.md`.
- A soffice convert immediately after `pkill -x soffice` can fail silently once — rerun.
