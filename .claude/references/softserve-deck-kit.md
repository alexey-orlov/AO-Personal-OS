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

## The wide automotive deck family (`Presales/Toyota Oracle.pptx`, 2026-09-02)

Scott's automotive/Toyota deck is SoftServe-branded but on a **different, larger canvas —
18288000 × 10287000 EMU (20" × 11.25")** with four masters / 56 layouts; nothing from the
12192000-wide kit above transfers geometrically. What worked when adding the Oracle
partnership section (slides 30–34):
- **Section header idiom** = layout `DEFAULT` (slideLayout1) with hand-drawn shapes: bg
  `26292B`, left rect 6949380 wide with a top-down gradient `459FDD → C1DFF3 → FFFFFF`,
  the number in `Roboto Mono SS` sz 16500 at (914400, 4000500), `SECTION NN` label sz 975
  bold blue `459FDD` spc 78 right-aligned, title `Azurio` sz 4500 white right-aligned in a
  4165890 × 1295400 box (two lines max). Duplicate slide 6 with `add_slide.py` and swap the
  three `<a:t>` runs.
- **Content slides** = layout `Title-1Column` (slideLayout17): placeholders `body idx=34`
  (top-right running label), `sldNum idx=4`, `title` — title run is `Replica LL TT` bold
  sz 4800 `26292B`, UPPERCASE, at (538101, 1622980); keep it to ONE line (≤ ~40 chars at
  16.4M width) or it eats the intro line. Content area y 3.45M → 9.5M, x 538101 → 17772000.
- **Palette in use:** blue accent `459FDD` (labels, stat numbers) / `1485C3` (diagram
  fills), ink `26292B`, body `262626`, muted `4C5156`, panel `F7F9FA`, hairline `E1E7EB`,
  rule `BDCBD7`; orange `F36949` appears sparingly. Stat-tile idiom: `F7F9FA` tile, number
  in `Roboto Mono SS` (blue), caption mono sz 825 `4C5156` spc 33.
- The pack "solution layers" colour stack (from the R&D monthly deck) transfers as-is:
  tint/bar pairs `FDEDE8/F36949` (SoftServe) · `D2E7F6/1485C3` (Oracle + SoftServe) ·
  `EAF3FB/6DB2E2` (NVIDIA) · `EEF1F3/6B7680` (OCI), bar width 45720.
- QA trick for a 270 MB deck: copy the unpacked dir, prune `<p:sldIdLst>` to the new
  slides, run `clean.py`, zip → a ~15 MB deck that soffice renders in seconds; the full
  deck only needs `validate.py --original`.

## QA gotchas (this template family)

- `markitdown` returns EMPTY for these table slides — for content QA use `pdftotext` on
  the QA PDF or grep `<a:t>` runs in the slide XML instead.
- soffice substitutes Azurio → serif in renders (geometry true, glyphs wrong); the
  true-font path and the `timeout`-not-installed guard live in `document-rendering.md`.
- A soffice convert immediately after `pkill -x soffice` can fail silently once — rerun.
- **Headless (cloud) QA without the brand fonts** (2026-09-06, NATO map slide): the default
  fallback (DejaVu Sans) is ~15% wider than Replica, so every 2-line tile looks like a 3-line
  overflow and lane labels wrap that won't wrap on a Mac. Render a throwaway twin instead:
  copy the pptx and in its XML replace `typeface="ReplicaLLTT-Regular"` → `Liberation Sans`
  and `typeface="Roboto Mono"` → `Liberation Mono` (Helvetica-metric fonts that soffice has
  by default) — wraps and fits then match the real deck closely; never deliver the twin.
  Layout-only checks, per the geometry rule; glyph shapes are still wrong.
- **Fit-check text widths in the builder, don't eyeball the render** (2026-09-06, NATO map
  v4): measure every string that must stay on one line with PIL on the Liberation stand-ins
  (`ImageFont.truetype(".../LiberationSans-Regular.ttf", pt*20).getlength(s)/20*12700`, +6%
  safety for the brand fonts) against its box width and print a `need vs have` report — the
  render only shows wraps for the stand-in font, the report catches the ones Replica will
  add. Same trick sizes legend rows before they overflow the content column.
- **Map/menu slides — the geometry that survived two feedback rounds** (NATO map v4):
  tinted (F1F2F5) hairline-framed L1 containers with a two-line header (outlined oval badge +
  13 pt bold name; 9 pt grey one-liner on line 2), white hairline L2 tiles justified inside,
  container gap ≈ 3.7× the tile gap (220000 vs 60000 EMU), tile number in 808080 bold so the
  17 names form the scan layer, a bottom tag row with fixed-width chips left (7.5 pt mono;
  lit = 595959 fill/white text, unused = DCDCDC outline/808080 text) and pills right, and a
  visual key in the footer (sample tag + 8 pt label per family, tile order) instead of a
  text legend. The "recommended" view is the identical slide with orange-tint tiles + an
  orange border; its ranking lives in the key row (a miniature "4.1" tile + bold label), so
  slide 1 stays fully greyscale and the reveal lands. Builder: the session scratchpad's
  `build_slide.py` + `slide_data.json` pattern (data-driven; views = neutral / highlight).
- **Evidence slides + pill semantics that survived the fourth round** (NATO map v7, 2026-09-07):
  one renderer for every "evidence behind the tags" slide — a container per source (a NATO
  body, a delivered case) with the exact pill it puts on the map in a reserved slot (an empty
  slot when the source drives no tag — rule 3), a 13 pt bold name, a 9 pt plain-language line,
  then rows of `text · map case` with a right-aligned mono "MAP CASE(S)" column heading; the
  row pitch is computed once for the whole slide, so a 7-row block and a 1-row block share a
  baseline grid. Pill grammar: **outlined = demand, solid = delivered proof**, one hue per
  proof source (brand orange for own deliveries on the partner's stack, a single off-palette
  hue — violet 6A4C9C — when the requester wants a second proof source told apart); pill
  width follows the label (`text_w() + 60000`) so a name like "Riyadh Air" fits without
  shrinking the family. Three mechanics worth keeping: copy the base slide's slide-number
  placeholder onto every added slide with a fresh `cNvPr.id` (`shapes._next_shape_id`) or
  PowerPoint "repairs" the file; generate footnote cross-references ("…on slide 2") from the
  view order, never hard-code them — the requester reordered the deck between rounds and the
  old text went stale silently; and re-derive a chip rule from a sharp definition ("lit = the
  case's analytical engine, not a results table") before a reviewer finds the two tiles that
  contradict each other. What the Opus design-QA pass on the renders then caught (measure,
  don't eyeball): white 7 pt text on brand orange F36949 is 3.0:1 — use ink on orange pills
  (5.7:1) and keep white only on hues ≥ 6:1 (595959 lit chips 7.0:1, violet 6A4C9C 6.7:1);
  an outlined pill at 1.25 pt out-weighs the filled pills next to it — outline at 0.75 pt;
  808080 values on the F1F2F5 panel are 3.6:1 — use 595959 for anything that must be read;
  a tile or source that carries no tag gets an empty pill instance in the slot, not a bare gap
  (rule 3), and the key shows that empty instance next to the ghost chip; a highlight sample
  in the key leads and matches its peers' weight; wrapped card bodies hang from a shared top
  edge and the row height is sized to the longest body (+160000 EMU), never to the column.
