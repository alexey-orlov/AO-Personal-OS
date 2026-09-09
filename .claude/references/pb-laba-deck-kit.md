# PrivatBank / Laba lecture deck kit

Anatomy of Alex's own lecture template, measured out of the real decks on 2026-09-09
(PB corporate course `pb02/pb04/pb06/pb14`, Laba PM-course lesson 1 `1AOb5P…` 2026 and
`1_R0Jtaj…` 2024, and the merged source pack). Use this before rebuilding any slide "in
the PB style" — the numbers here are extracted, not invented.

**PB and Laba share one master.** The "Заняття NN" lesson opener is byte-identical in both;
only the bottom marker differs (PB = three yellow triangles, Laba = three circled-arrow PNGs).

## Global tokens
- Slide 10.00 × 5.625 in (9144000 × 5143500 EMU), 16:9. `dk1 #000000`, `lt1 #FFFFFF`.
- Accent **`#FFDA67`** (warm yellow) in both decks.
- Fonts: **Montserrat** (bold titles) and **Montserrat Medium** (everything else). Nothing else.
- Unsized runs inherit `defaultTextStyle` lvl1 = 14 pt.
- Body title standard used across Alex's English decks: L 0.39 / T 0.31 / W 9.12 / H 0.96,
  Montserrat 27 pt bold, black, `lIns/tIns/bIns 91425`, **`rIns 8725`**.

## Three distinct yellow-family slides — do not conflate them
| Role | Background | Title | Right-hand art |
|---|---|---|---|
| **Cover** (deck slide 1) | `#FFDA67` full bleed | 48 pt bold, **white** `a:highlight`, lnSpc 90 % | hand-drawn 3-block motif, transparent PNG |
| **Section divider** | `#FFDA67` full bleed | 36 pt bold (32 pt if long), **white** highlight, lnSpc 115 %, box **anchored `ctr` over the full slide height and overhanging the top by −0.2769 in** | cork board + sticky notes photo |
| **Lesson opener / agenda** | white | 36 pt bold, **yellow** `#FFDA67` highlight | ▶▶▶ marker bottom-right |

The highlight inverts: yellow background → white text highlight; white background → yellow highlight.

**Cover geometry** — title (0.5129, 0.4297, 5.18, 1.56) · subtitle 18 pt (0.5129, 2.7473, 5.70, 0.81) ·
period line 14 pt (0.5963, 4.4592) · name 14 pt (0.5963, 4.7925) · motif picture (6.0277, 1.0087, 3.66, 3.53).

**Divider geometry** — title (0.1934, **−0.2769**, 5.8776, 5.6250), anchor `ctr`, insets 45700 ·
cork picture (6.3282, 0.8463, 3.0617, 3.6617). Only two shapes; the design is deliberately austere,
so don't bolt a mini-agenda onto it.

**Opener marker** — group (8.3707, 4.6182, 1.0124, 0.3832): three `prstGeom triangle`, `adj 50000`,
fill `#FFDA67`, `rot="5423873"` (90.4°), 0.25 in pitch. Laba's variant is three 246×246 transparent
circled-arrow PNGs, and on the About-me slide it sits bottom-**left** with `rot="10800000"`.

## Laba "About me" (lesson 1, slide 3)
Pixel-identical in the 2026 and 2024 decks; only the bio text differs. White background.
Z-order: the gradient card is drawn first, everything else on top.

| Element | L | T | W | H |
|---|---|---|---|---|
| gradient card, `prstGeom roundRect adj 1220` | 3.2755 | 0.1645 | 6.5761 | 5.2960 |
| bio, one bulleted text frame | 3.9646 | 0.4222 | 5.1979 | auto |
| name, Montserrat 30 pt bold, **no** highlight | 0.3806 | 0.5416 | 2.7775 | 1.6831 |
| LinkedIn glyph, hyperlinked | 0.5130 | 1.9794 | 0.5077 | 0.5077 |
| circled-arrow group, `rot 180°` | 0.5130 | 4.7253 | 1.3594 | 0.4252 |

Bio bullets — one frame, one list, every paragraph identical:
`marL 457200 · indent −304800 · lnSpc 100 % · spcBef 10 pt · buChar "●" · buFont Montserrat Medium ·
buSzPts 1200 · run Montserrat Medium 12 pt`. The card is a soft out-of-focus periwinkle→blush
gradient — **there is no photo of Alex on this slide.**

⛔ The 2026 deck's first bullet and its slide 2 subtitle both name GigaCloud. Never carry those
across — see the hard rule in `CLAUDE.md`.

## PB "Product map" (Ключові питання продукту)
PB's canonical "what is your product" framework — **this, not a Lean Canvas, is the PB slide** when
a brief says "defining your product". It ships as one flat 1606×736 PNG, so a native rebuild is
needed whenever cells must be highlighted or greyed.

Native shapes on the slide: title 27 pt bold at (0.3878, 0.2626, 9.1230, 0.6690) · badge
`prstGeom round2SameRect adj1 16667 adj2 0`, fill `#FFDA67`, "FRAMEWORK: …" 11 pt bold, anchor `ctr`,
at (0.5130, 0.9098, 3.2035, 0.4360) · the map picture at (0.5130, 1.3455, 8.6092, 3.9459).

Grid: x = 0.5399 / 2.2553 / 3.9707 / 5.6861 / 7.4015 / 9.1169 (pitch 1.7154) ·
y = 1.3616 / 1.6726 / 3.3185 / 3.6295 / 5.2754 (header band 0.3110, body band 1.6459) ·
borders 0.75 pt `#434343`. Headers 13 pt bold, bodies 12 pt regular, centred both axes.

| Band | Cells (span) | Fill | Text |
|---|---|---|---|
| H1 | Audience (1) · Value for the customer (2) · Solution (2) | `75FA4C` · `73FBFD` · `5787E1` | black · black · **white** |
| B1 | Target segments · Problem · Importance and frequency of the problem · Value proposition · Capabilities (features) | `DCE9D5` · `D3DFE2` · `CCDAF5` · `CCDAF5` · `CCDAF5` | black |
| H2 | Value for the business (3) · Alternatives (2) | `F19D38` · `8B2CF5` | black · **white** |
| B2 | Business model · Business impact · Growth channels · Alternatives · Advantages | `F8E5D0` ×3 · `D8D3E7` ×2 | black |

Note the deliberate asymmetry: column 3's body is `CCDAF5`, not the `D3DFE2` of column 2, even though
both sit under the same cyan header. Reproduce it as-is. The baked image uses a neutral grotesque
(pasted from Sheets) — rebuild in Montserrat Medium so it matches the rest of the deck.
