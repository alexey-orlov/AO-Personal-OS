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
   the inside.
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
   badges with ink numerals, brand-accent (orange) CTA; reserve a dark fill for at most
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
