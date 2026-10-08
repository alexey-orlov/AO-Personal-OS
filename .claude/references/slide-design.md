# Slide-deck & one-pager design rules

Alex's standing design rules for building or editing slide decks and one-pagers
(2026-07-10, from his design feedback on the Oracle partnership deck; rule 9 added
2026-07-20 from one-pager feedback). Pointed from root `CLAUDE.md` — read BEFORE any
deck or one-pager work.

1. **Size containers to content** — a box more than ~half empty means the type is too
   small or the box too big; prefer large editorial statements over small text floating
   in big cards.
2. **Same-level elements get identical size and geometry** — never mix wide and narrow
   cells for peers; if one cell holds several items, keep the outer cell equal and vary
   the inside. The text inside counts too: **peer titles in a row take the same number
   of lines**, so everything under them starts level. Set the break by hand at the same
   kind of point in each (e.g. before the final noun: *Deep research & / investigation*,
   *Document / processing*) and size the type so each line holds; never rename to fit,
   and never leave the count to the box width, which mixes one- and two-line titles in
   some row at almost any width (Alex, 2026-09-29, on the mini-site's group tiles).
3. **Show absence as an empty instance of the same container** (e.g. a "not filled in
   yet" panel next to a filled one), never as missing/shrunken structure or a bare gap.
4. **No free-floating side text** — annotations/principles live inside a structured
   panel or card.
5. **Color semantics follow the source outline's own coding mapped to brand hues**: two
   stages of the same dimension = lighter vs fuller tint of ONE hue (e.g. ramp-up =
   light orange, strategic = orange), reserving a contrasting hue for a different
   dimension. On mode-coded slides, in-content highlights use the same hue family as the
   mode coding (orange), not a contrasting one.
6. **Large all-grey compositions read weak** — give repeated panels a light brand tint
   or frames.
7. **Shape semantics from the source outline are load-bearing**: "<>" between nodes = a
   bidirectional arrow with a text label, an annotation next to a flow = text, never
   promote them to boxes; conversely questions/prompts = outlined containers (frame, no
   fill) while answers/assets = filled containers, and peer answers share ONE color.
8. **Avoid heavy black/ink fills for small badges (numbers) and CTA banners** — outlined
   badges with ink numerals, brand-action (blue `1485C3`) CTA — since the 2026 rebrand blue is the action colour and orange is accent-only; reserve a dark fill for at most
   one anchor node per diagram.
9. **Compositional variety** (2026-07-20, one-pagers): don't render every section as
   another full-width row of same-shaped cards — content at different abstraction layers
   (summary stats, scope, mechanics, results, people) should read as visually different
   forms. Mix directions: pair a narrow vertical stack against a wide vertical list in a
   two-column band, keep true sequences horizontal (flows with arrows), and reserve
   repeated same-form rows for genuinely peer content.
10. **Structure by hierarchy, not by tinting every group** (2026-09-02, Toyota/Oracle
    practice slide): a slide where every content group sits in its own coloured panel
    (three grey cards + blue panel + orange panel + chip row + two stat bands) gives the
    reader no entry point. Pick ONE primary structure (e.g. numbered rows with hairlines)
    and at most ONE tinted panel for the secondary structure; colour carries ≤ 2 meanings
    per slide, and two stages of the same thing are two tints of one hue (rule 5).
11. **Peer claims: all or none** (2026-09-02, packs slide): when outcome/KPI evidence
    exists for only some items in a peer set, drop the evidence row for every item rather
    than showing "—" / "pending" next to proven ones — a visible gap undermines the whole
    set. Rule 3's "empty instance" applies to structure (an unfilled panel), never to
    proof. Likewise no "NEW" / status badges that single out the unproven peer.
12. **Partner-facing stacks: partner first, with official logos, and layers that differ
    in weight, not just hue** (2026-09-02): when the audience is the partner (Oracle
    sellers), the partner's layer leads (top) and each layer carries the official logo —
    pull it from a brand deck's vector asset (recolour the white-on-dark SVG, render, crop
    to bounds, make the background transparent) rather than a text stand-in. Differentiate
    the layers by weight and shape (solid ink tiles on a framed band vs light rounded cards
    on a tinted band), not by tint alone.
13. **External slides carry no internal operating numbers** (2026-09-02): headcount,
    POD counts, capacity commitments, prices of internal packages are for internal
    alignment decks; a customer/partner-facing slide describes capabilities and operating
    model qualitatively. Strip them before the deck leaves SoftServe.
14. **Card-grid slides: header, gutter, legend and emphasis craft** (2026-09-11, design pass on
    the Oracle use-case map, approved by Alex): (a) a panel header is two lines — the bold
    L1 name, then the grey L2 list on its own line — never one mixed paragraph, which wraps
    mid-name as soon as the list is long; (b) inter-panel gutters are one value across every
    row, and the grid snaps to the master's own rules and furniture (left/right edges, the
    bottom hairline with ≥ 0.09" clearance), not to round numbers; (c) the emphasised cards
    (orange tiers) are never set in the slide's smallest type — same size as their peers,
    bold/colour carry the emphasis; (d) a card that spans two columns to fit its label is a
    rule-2 violation — normalise the width and break the label instead; (e) legends
    right-anchor to the grid edge with one pitch and swatches shaped like the things they
    stand for; (f) for a partner/exec audience, do not add a legend row for the default state
    ("no offering yet" on ~90% of cards) — it advertises the gap (rule 11's spirit); the
    unmarked state reads as neutral context on its own. Peer geometry (rule 2) still wins over
    "half-empty" (rule 1) when a row-mate forces the height and no re-deal of the rows fits
    the width, but the box may not stay half-empty either: give the sparse peer its peers'
    anatomy — the same slots (a picture where they carry one, a list where they list, the
    action at the foot), each holding its own content — never shrink it, never pad it with
    air (2026-09-29, the Oracle mini-site's catalog "Looking for another solution?" tile: a
    title and two lines stretched beside a full product tile, "looks too empty").
15. **A SoftServe-template cover carries the family's hero photograph, shared across the packs;
    an ink-only cover is an unfinished state, never a deliverable** (2026-09-23, Alex, on the
    Account Insights sales deck: "why is the title slide not like in the WfO package — with image,
    SoftServe style template — but just a black background?", then: "the title slide image can be
    shared across the packs"). The cover hero is one picture for the whole pack family — the
    reference deck's — and every pack's deck inherits it unless that pack deliberately chooses its
    own; a build must never strip it for want of a per-pack choice. Only the customer-specific
    pictures (a logo, a product screen) are per pack.
16. **A diagram Alex drew goes into the deck as native, editable shapes, reproduced in full**
    (2026-09-26, GigaCloud results deck: "можеш картинку перетворити на нативну, щоб вона була
    редагована, але повністю відтвори дерево як я його намалював"). Measure the picture (node boxes and
    colours by segmentation, connector end points, label rows) and rebuild every node, chip, connector,
    label and colour. Keep his drawing's language, including labels in their original language and the
    connector style. Regularise only hand-placement noise (equal gaps, one axis). Build it once as a
    function. Section slides reuse fragments of it at **one common scale and one column grid**, so the
    family of dividers looks alike.
17. **One content right edge for the whole deck, ≥ 0.5 in clear of the template's corner logomark**
    (2026-09-26 review of the same deck: tables and callouts at 24.5 in on some slides and 22.3 in on
    others, 0.19 in from the GO mark). Pick the edge once (GigaCloud 2× template: 21.8 in) and set every
    table, card, callout and hairline to it.
18. **Line-break hygiene:** a numeral never splits from its unit («1 шт.», «1 грн») and a two-word term
    never splits («Direct COGS»). Use non-breaking spaces, except inside narrow table headers, where a
    non-breaking space forces a mid-word break («Direct CO / GS»); use an explicit line break there.
    Multi-step formulas go one step per line, never one operand per line. Titles on section slides
    break by hand before the preposition («… бюджету / за типами»), never leaving an orphan word.
19. **A worked-example table shows exactly what the result is computed from, in formula order, and
    the numbers live in the table, not in notes** (2026-09-27, Alex on the Sales-data slide).
    - Trace the source formula backwards from the result cell. Cut every row or column that is not
      on that path, however "contextual" it looks. First case: 2025 won-deals and 2025 deal-month rows
      that fed a different split, not the 2026 one shown.
    - Order the rows that stay the way the formula reads.
    - Every input of the formula is a row, including a team-level scalar. Show a scalar such as
      FTE-months or the team budget as one row merged across the per-bucket columns, never only as
      prose under the table. Alex redrew a note like «вартість FTE-місяця = бюджет ÷ (4 × 12)» as two
      such rows.
    - The row the next step consumes is the red result row. A reconciliation after it is labelled
      «Довідково» and styled as a normal row.
    - When a method differs in what it passes on (a per-unit rate instead of a share), the callout
      says so in its own bold-lead line.
    - Text outside the table stays within one callout of ≤ 2 lines plus ≤ 2 short lines under the
      table. Provenance, calibration and caveats beyond that go to the speaker notes.
20. **Editing a deck the user has hand-edited: diff the geometry, not only the text, and carry their layout
    into every slide you replace or add** (2026-09-27, GigaCloud results deck). A text diff caught Alex's
    wording edits but missed that he had moved the title and the whole block under the kicker down
    0.33–0.79″ on ~20 slides and put the divider status chip next to «Крок N». The first transplant of
    regenerated slides silently undid that on 7 slides.
    - Before replacing slides, compare each of the user's slides with the generator's version shape by
      shape (dx, dy, dw, dh). Re-apply the per-slide offsets to the replacements.
    - Give new slides the offset of their neighbours.
    - Fold systematic changes (like the chip position) into the generator.
    - Work in the user's file (clone new slides in, keep theirs). Never regenerate the whole deck over it.
21. **A chart that must show ₴ and % for every part: a clean chart plus one legend-table, never a label list beside each
    bar** (2026-09-30, Alex on the GigaCloud bucket-margin slide: «багато тексту біля графіка, не бест практіс»). The first
    cut put «name · ₴ · %» next to every segment of both columns, with leader lines that crossed. Every name was repeated
    per bar, and the thin segments pushed their labels away from their marks.
    - The chart carries only what reads at a glance: % inside a segment where it fits, the total on the cap, the
      category under the bar. Thin segments stay unlabelled.
    - One table beside the chart holds every value, and each name appears once there. Its rows follow the stack (top
      row = top segment), with subtotal rows for the whole and for the cost block. Each row carries its swatch, so the
      table is also the legend.
    - Columns normalised to 100 % say so in the lead; their absolute totals sit on the caps.
22. **A slide built to land one claim carries that claim as its headline** (2026-10-08, Alex on the GigaCloud «per component, not per
    deal» slide: «зроби головний акцент на тезу, має бути виділено»). The first cut kept the intro series title («Коректна алокація
    витрат у ціну компонентів») as the headline and put the thesis in the grey lead under it, so the slide's one point read as a caption.
    - The thesis is the title, at title size, with its key phrase in the accent colour; break it by hand into ≤ 2 lines.
    - A series title that would otherwise sit there moves into the kicker («Загальне завдання · …»); drop the lead rather than
      restate the thesis in it.
    - The closing panel says what follows from the thesis («Тому …»), not the thesis again.
23. **Text that carries the slide's message is never set at caption size** (2026-10-08, Alex on the GigaCloud results slides, twice:
    first the bucket labels under the columns and the key-insight panel, then the labels again and the cost/FTE table). Category labels
    under a chart, table body text, an insight panel's heading and its statements are read first, not looked up. At the GigaCloud 2×
    scale: labels under a chart 18 pt (name) / 17 pt (bucket), table body 17 pt with 15 pt headers, insight statements 16 pt, panel
    heading 18 pt; only provenance and support lines go down to 13.5–14 pt. When a larger label runs into its neighbour, break it into
    two lines («бакет» / name) rather than shrinking it back, and drop a column that is constant or off the message (billing cycles)
    to buy the width.
