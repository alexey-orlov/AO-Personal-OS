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
    proof. Likewise no "NEW" / status badges that single out the unproven peer, and no "target" or
    "focus" highlight on a subset of peers in an overview unless the requester ranked them
    (2026-10-22, Alex on the verticals slide: "don't highlight 2 as focus, all equal").
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
    In Ukrainian body text a one-letter word (в, у, і, з, й, а, о) binds to the next word, and a sentence
    of four words or more ends on two words, never one («прямо / в CRM.», not «прямо в / CRM.»). Keep that
    binding out of two- and three-word labels in narrow boxes, where it forces a mid-word break («Нова модел / ь»).
    In builder code write the characters as escapes (`' '`, `'‑'`), never the literal glyph: a
    rewritten file can come back with a literal U+00A0 turned into a plain space, and then every binding
    silently stops working (2026-11-25, the product-committee builder). After rewriting a builder, check the
    saved .pptx text for U+00A0 before rendering.
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
22. **A slide built to land one claim carries that claim as its headline** (a standalone thesis slide in a talk; in a navigated deck
    with sections and a spine, rule 45 wins: the title names the slide and the claim goes in the line under it) (2026-10-08, Alex on the GigaCloud «per component, not per
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
    to buy the width. The build enforces the floor on the saved file: every ink (body) run ≥ 17 pt, every other run ≥ 13.5 pt. Kept by
    eye, the rule failed: the committee deck's PLM and innovation slides went out at 15.5–16.5 pt to fit (Alex, 2026-11-25: «замалий
    шрифт»). Line counts come from real glyph widths, never character counts, which ran up to 22 % wide on bold Cyrillic and left
    rows with room for two lines that rendered in one. Where the deck's font is not installed, use Arial's advances scaled by a factor
    measured on a PowerPoint render (e-Ukraine: bold 1.16, light 1.20).
24. **A process or explainer deck says what each step is for and what really happens, in business terms — the system's own wording is
    input, never output** (2026-10-11, Alex on the GigaCloud publication-process deck: the step essences were "copied from the CRM card").
    - Each step states its purpose, the real activity (who meets, who documents, who tests what) and the result as a business state, not the
      fact that a record was logged.
    - When a screenshot or export shows a sample of fields or conditions, present them as examples, never as the full list.
    - A comma-run of criteria becomes a one-line generalisation plus bullets.
    - When a system computes when a step is required (a workflow sets a flag), state the business condition its logic encodes ("when the
      product brings a new contract or delivery process, vendor, SLA level or platform"); field names and GUIDs go to the speaker notes.
    - Ukrainian: «evidence» is «підтвердження», not «докази».
    - Every fact no source states is marked as an assumption, the "obvious" ones first: who records a step, whether the system closes it
      by itself, who is involved. Do not derive the recorder from the owner or the mechanism from the step's kind (2026-10-12, Alex
      corrected three such unmarked guesses: Supplier contracts closes automatically, the PM logs the infrastructure project, Finance and
      Legal are not involved).
25. **A card that carries a slide's content uses body-size type (20 pt at the GigaCloud 2× scale) in stacked, labelled sections, with one
    structure for every peer card, one question per field and one wording per answer** (2026-10-11 and 2026-10-12, same deck:
    "слишком мелкий шрифт… разношерстно написаны", then "давай его унифицируем").
    - Put the label (bold, accent colour) above its content, not in a 17 pt label|text table that reads as a form.
    - The card's header names the step and its owner («Owner: Product manager»), never the card's type («ДІЯ», «ПОГОДЖЕННЯ»). Where the
      step lives in the system is not card content: the screenshot caption carries it (rule 26), the field names go to the notes.
    - Two questions never share a field. "When is it mandatory" is two fields: when it happens, answered from a fixed set that mirrors the
      stage names (До / Під час / Після публікації / При змінах), and whether it is mandatory: «Завжди» with nothing appended, or the
      condition as a structured list. A condition the system computes ends on its own grey line «Визначається автоматично».
    - «Результат» is the business state after the step («Бриф передано відділу маркетингу»), never "the step is logged".
    - How the step is recorded is a field of its own on every card, and each method has one wording used verbatim wherever it applies
      (manual log with an evidence link, closed automatically by the system, an approval, a confirmation). Keep the wordings as constants
      in the build, so a second phrasing cannot appear.
    - Every card of a type has the same sections in the same order. A hybrid step (a to-do that ends in an approval) gets its own fixed
      section set. Two slides about the same step (two screenshots) carry the identical card.
    - A list the reader will scan — card sections, table cells — gets a bold one- or two-word lead-in per item («**Склад** — …»,
      the deck's own bold + dash style), and each item is cut to its essentials. Apply it to every peer list in the deck, not
      only the one flagged (2026-10-12, Alex on the design-scope table: "очень много текста… подзаголовок в одно-два слова,
      выделить жирным… если есть где-то такие лонгриды — то же самое").
    - Inside a field, a new logical paragraph gets visible space above it. A two-cell row is balanced: size the narrow cell so its
      answer fits on one line, or stack it as short bold lines with grey qualifiers; never one cell crammed and its neighbour loose
      (2026-10-12, Alex on the PoC card: "налеплено… не хватает пробелов-энтеров между логическими абзацами").
26. **Screenshots on peer slides sit in one standard frame, or in 2–3 standard frames chosen by orientation, with a matte filling the gap,
    and each carries a caption with its path in the product** (2026-10-11, Alex: "вписаны в один размер… с заполнением… либо же в 2-3";
    2026-10-12: "внизу, как заголовок… не мельче, чем шрифт текста в карточке").
    - Pick the frame by aspect (portrait form vs landscape) and centre the picture in it; never size a frame to each picture.
    - Frame the part the slide talks about with a native outline. When the whole screen is too small to read at frame size,
      choose by what the slide says:
      - **Location matters** (e.g. two hints in different panels of one page): keep the whole screen. Magnify each outlined part
        as a numbered zoom in the free space under the frame. Put the same number on the outline's corner, clear of UI text.
      - **Location doesn't matter** (a dialog's fields): crop to a collage of the title strip and the discussed part.

      Either way the frame stays standard, so the card beside it keeps its width. A taller frame alone doesn't enlarge a landscape
      screenshot next to a card: the width is the limit (2026-10-12, Alex on the go-live and PoC pages: the crop "теряет смысл",
      you can't see where the second hint sits).
    - Check readability per screenshot, not by eye on the contact sheet. The screen's body text must render at ≥ ~0.13 in on the
      2× slide (≈ 9 pt as presented). A 1× capture with ~16 px text needs ≥ 0.009 in/px; a 2× capture with ~26 px text needs
      ≥ 0.005 in/px. Alex flagged everything at 0.0054–0.0060 in/px for 1×-density pages and dialogs; the focused crops reached
      0.0082–0.0100 (2026-10-12, Alex: "очень мелкие скриншоты… не видно выделенного текста… не в ущерб карточки").
    - Under every screenshot: the UI path at body size, «Розділ <Section> → Сторінка <record> → <Tab>», section and tab names in the
      product's own English; one path vocabulary for the whole deck (always «Сторінка», never «картка» in one place and «сторінка» in
      another). When the path does not fit one line, break it at an arrow into two balanced lines.
    - A product screenshot is a straight-on capture of the real UI; vendor docs and launch blogs carry them. Never use a tilted
      or perspective marketing render. Where a category has no real screen, draw a simple native diagram in the deck's own
      diagram language instead (2026-10-22, Alex on the buckets slide: "where we had a rotated screen, make it straight view").
    - On an overview with one picture per item, the picture gets most of the card, and the text drops to the item's name plus
      one line. Choose a grid that keeps the frames wide (3×2, not six narrow columns) and draw the diagrams horizontally to
      fit them (2026-10-22, Alex: "less text, larger visuals").
    - After a conceptual map of something the system implements, show the system's own screen of the same structure (2026-10-12,
      Alex: the CRM checklist right after the stage/block/step map). This holds on a one-slide summary too: a results slide about
      a process automated in a system pairs the process diagram with that system's screen (2026-11-10, Alex on the half-year
      results deck's PLM slide).
    - What sits beside a screenshot is the point the screen proves for the process, in one note («the checklist is always current:
      it updates itself from the actions people log and from status changes»), never a tour of its interface. Counters, filters,
      columns and statuses explain themselves; numbered outlines are for the one area the slide talks about (2026-10-12, Alex:
      "все выделения на объяснении интерфейса — не нужно").
27. **A process structure gets one colour per stage, used in the same position on every slide that shows it** (2026-10-11, Alex: colour
    coding plus a unified structure and placement, so the stages, blocks and steps are remembered).
    - The overview, the full map and every section divider share one column grid.
    - A divider repeats the map as a "you are here" strip, with the current stage in colour and the rest grey.
    - Step slides carry the stage colour in the kicker pill and the card.
    - Within a stage: stage = full hue, block = medium tint, step = light tint (rule 5's tints of one hue).
    - Header levels look different: a section = full-bleed accent slide; a stage = a full-width band in the stage colour with the
      stage title over the "you are here" strip and the stage's blocks; content slides never borrow either look (2026-10-12, Alex:
      the stage slides "выглядят как контентные", they must read as the next header level).
    - The overview carries the structure only; explanatory bands and footnotes under it belong on the detail slides (2026-10-12).
      A navigation slide that opens a section shows its boxes with a one-line purpose each, never the item lists (done, next)
      that the following slides cover (2026-11-10, Alex: «просто три бакета з oneliner, який пояснює ціль»).
    - Peer detail slides (the four workflows of a process) get one hue each, taken from the source's own coding, and carry it
      wherever the item appears: its cards, tags, legend and a strip of the peers' pictograms with the current one lit. An overview
      slide opens the section on the detail slides' grid (same columns, same order) and names, per cell, the one or two items that
      carry it (a short name and a pictogram, shaded by level), so the slide can be retold: what is the same across the peers (the
      same chip in several rows), what differs. Unnamed shading tells nothing, and a column that does not serve that comparison
      goes (2026-11-25, Alex: "colorcoding in 4 colors like in the artifact"; then: "keeping unnamed steps with different
      transparency level brings no value … should be easy to retell for me").
    - A stage or block name must hold for every step in it. Name it by the event it centres on («Перший клієнт»), with before/after
      sub-blocks, not by a preposition that excludes some of its steps: «Перед першим клієнтом» was false for the hand-off, which
      comes after. A group that has its own steps is a numbered stage on the same equal-width grid, not a narrow in-between column
      (2026-10-12, Alex).
28. **Where a stage splits into parallel streams or roles, a schema slide comes first and its pictograms recur on the detail slides**
    (a list of principles or pillars likewise carries one relevant pictogram per item, so it reads and sticks; 2026-10-22, Alex)
    (2026-10-12, Alex on the same deck: the roles slide, the six-branch «готовність команд» schema, the three technical competences).
    - The schema shows the trigger, the streams and, per stream, the steps in sequence, each with a one-line purpose; a mark (*) with a
      footnote flags the steps whose obligation is conditional.
    - Give each stream or role a distinct pictogram, drawn as native vector shapes so it stays editable. Every detail slide of that
      stream repeats the pictogram and the stream's name at the right end of the kicker row, so the reader knows which box of the schema
      the slide opens.
    - When a schema slide also needs a screenshot as evidence that the system records it, the schema takes the top two thirds and the
      screenshot sits smaller in a bottom band with a one-line note beside it; the screenshot never competes with the schema for size.
29. **A who-does-what matrix of teams × process puts the process stages in rows and the teams in columns, and its cells list exact step
    names only** (2026-10-12, Alex on the team-participation slides: "этапы сверху вниз… команды — колонки", "без комментариев").
    - Each cell is a numbered list of the steps' names exactly as the step slides title them; no scenario notes («як responsible for
      design для Third-party…») — those live on the step slides.
    - Mark the role, not the prose: ★ = the team owns the step, ✎ = the team enters data or approves in the system, both when both apply,
      none when it only takes part; a legend under the table. The marks must agree with the cards (★ only where the card's Owner is that
      team).
30. **"It gets better with each round" is drawn as the change over the rounds, not as a loop of labelled boxes** (2026-10-22, Alex on
    the kit slide: the four-box loop "reads poorly", and a nested pyramid "breaks layout of the slide").
    - Show the quantity that changes per iteration, one bar per round: from the kit vs built for this client, per engagement.
    - Mark the tipping point on the bars ("default scenarios after 2 to 4") and label the two phases above them.
    - Use no figures unless they are data; the proportions carry the idea.
31. **A fit scale between two options is drawn as zones on one axis** (2026-10-22, Alex on Essential vs Extended: "improve the UI, it
    is not ideal to show the scale").
    - Zones: option A's zone, a narrow hybrid band, option B's zone.
    - Each criterion is a row with its two end values written inside the two zones.
    - Never draw split bars with the end values as captions underneath.
32. **Slides built to slot into a host presentation open the part with the host's own section divider and carry no contacts blocks**
    (2026-10-22, Alex on the Oracle practice-and-products slides: "remove the contacts blocks + add block title for my part (from
    original presentation)").
    - Find the host deck's divider for that part and carry it over verbatim (number, title, its line, its speaker note), ahead of the
      part's first slide; build every slide on the host's own masters, so the set pastes in unchanged.
    - Slides a person presents carry no per-item contact cards (names, photos, addresses); the presenter is the contact, and contacts
      stay on the leave-behinds (one-pagers, decks sent to sellers, the site). Where a dropped block leaves a band, extend the
      neighbouring block to the shared edge rather than leaving a gap.
33. **A named customer on a proof or reference panel carries its real logo, never its name typed in its place** (2026-10-22, Alex on the
    SBG and NHS panels: "must use real logos from internet, not just put their names").
    - Take the mark from Alex's own decks first, then from the customer's site or Wikimedia (SVG with a PNG fallback); a typed name
      beside real logos on peer panels reads unfinished.
    - A brand-usage caution (the NHS identity rules) is one line to Alex, not a reason to drop the logo on an internal partner deck.
      Size the marks so peer panels look equally heavy: a tall emblem gets more height than a wide wordmark.
    - A slide about one client (a case study) names it once, by its logo at the top left in the title's place; never its name as
      the title plus its logo in a facts cell elsewhere (2026-11-25, Alex on the Daxko and Payworks slides: "strange to have bold
      name at the top + logo at the bottom right corner"). The name stays as the logo's alt text.
34. **Every number names what it counts, and every line reads without the other slides** (2026-10-23, Alex on the principles slide:
    "1 week in Essential" right under "Essential … in six weeks" read as the whole version lasting a week, and "after 2 to 4" made
    sense only after the kit slide).
    - Write the noun and the scope: "1 week of discovery in Essential", "after 2 to 4 engagements".
    - When two lines on one slide give durations or counts of different things, name both things.
35. **Peer category labels carry equal visual weight; colour coding serves one dimension** (2026-11-10, Alex on the GigaCloud
    half-year results deck: «Product operations білий, Запуск продукту червоний — здається, що одне зроблено, а інше ні»).
    - Tags that sort items into categories (product launch · product update · product operations) share one chip style: the same
      fill, outline and type. They differ only by icon and word.
    - A filled peer next to an outlined one, a coloured one next to a white one, or a bright one next to a pale one reads as
      done vs not done, or important vs minor.
    - Reserve colour coding for the one dimension the audience must read at a glance (here: status).
36. **Status and roadmap are different slide types and must look it, not only be labelled** (2026-11-10, same deck: «явне
    відокремлення статусу і роадмапу… зараз це підписано, але візуально і структурно не зчитується»).
    - Give each kind its own colour (done = green, next = blue) and its own structure:
      - a done slide keeps the problem → solution → value anatomy and carries a green «Зроблено» pill;
      - a roadmap slide opens with a full-width band in the "next" colour and lists the next items in that colour.
    - A roadmap slide carries no recap of what is done, and a done slide carries no copy of the plan the roadmap slides show. In a
      table of done items each one gets its name and one line on what was done and why; a bare name tells the reader nothing
      (2026-11-25, Alex on the committee deck's Q2 → Q3 goal matrix: «залишити лише сфокусованим на Q2 — колонка назви і
      one-liner що і для чого зроблено»).
    - A table of a project's next steps opens with the done stage it builds on, as row 0 marked «Зроблено», so the reader sees
      the baseline before the plan (2026-11-25, Alex on the margin owners slide).
    - Items that serve different sub-directions of one goal are grouped under the named sub-direction (the "why"),
      never left as one flat list that hides the logic (2026-11-10, Alex: «пункти 1 і 3 — диверсифікація від Broadcom,
      пункт 2 — від продажу VM на користь K8s»).
    - A slide that mixes both colours its done and next parts by the same code.
37. **An initiative slide in a time-boxed talk carries four things: problem, solution, one plain visual of the change or its
    proof, value** (2026-11-10 and 2026-11-12, same deck: «в блоках проблема — рішення можна все робити набагато коротше… частина
    справа self explanatory і текст лише створює шум»; on v4: «будь-які технічні деталі, особливості, внутрянку — опускаємо. У нас 15
    хвилин»; on v5: «дай інфо про мін. кількість нод + на скільки % в середньому дешевше», «напиши, що вже є 11 клієнтів… + реальний
    логотип вендора… Рівні захисту прибираємо»).
    - The problem is one short line in the words of the everyday pain («все інше — через листування, кожен раз індивідуально»),
      not one mechanism detail («ліміт знижки — через PM»). The solution names the change in one line. Never restate in prose
      what the picture shows.
    - The visual shows the change or its proof: before → after, the price gap, the clients already using it, how the parts
      connect. A table of parameters or a ladder of feature tiers is not a visual.
    - Cut what explains how it works; keep what proves it matters. Specs, ratios, hours, tier and framework names, locations,
      conditions, UI paths and fine print go to the speaker notes. The numbers a manager asks first stay on the slide: how many
      clients already use it, the price gap to the alternative, the smallest configuration, and the technology partner, shown
      by its real logo (rule 33).
    - Tell the problem and the solution from the customer's side; the internal mechanism (a leasing scheme, a contract model)
      goes to the notes.
    - Never invent a structure or a claim to fill a visual: product variants, tiers or segments, «новий сегмент», new revenue —
      only when a source sells the thing as such (2026-11-12: the «new» government segment was an old one whose prices used to
      be calculated case by case; the OpenStack «versions for Large and Middle Enterprise» do not exist, the sales deck's
      target-client row was not a product split).
    - A label on a scheme names the thing that carries the value shown: «Ціна продажу», not «Продаж», over a currency.
38. **No closing «Дякую / Питання» slide**: Alex's decks end on their last content slide (2026-11-10).
39. **A section with several goals gives each goal a sub-header and keeps the current goal visible in every header** (2026-11-12,
    same deck: «слайди всіх трьох цілей ідуть підряд і складно зрозуміти, що до чого відноситься»).
    - Before each goal's slides, repeat the section's navigation slide with that goal in full colour and outlined, and the
      others greyed out and faint. Keep the geometry identical on every copy, so only the highlight moves.
    - On every slide of the goal, the header carries the goals' icons as a strip, the current one in full colour, next to the
      goal's name. A goal name in small kicker text alone is not enough.
40. **A one-pager for a time-poor reader is navigated, not read: one numbered anatomy, every item in a visual form** (2026-11-12, Alex on
    the first Jumpstart seller one-pagers, which stacked lead paragraphs, bullet lists and cards in a different form per block: "I expect
    very structured, visual one pager, it should be really easy to navigate, very systematic").
    - Number the sections and run them down one fixed left rail: number badge, section title, and the reader's question the section
      answers ("Why your client cares", "Whom to call first", "What it is worth"). The rail is the table of contents.
    - Every section has the same anatomy (rail + content area, hairline between sections); the content takes the visual form its job needs:
      icon cards for parallel items, a step flow for a sequence, a chain for cause and effect (process → baseline → gains → ROI), logo rows
      for proof, persona cards for people, a price ladder for the deal.
    - One pictogram family (one stroke weight, one style) carries the items; peer titles hold one line, peer texts two at most, and a
      paragraph longer than one line is a sign the block has not found its form yet.
    - Rule 9's variety lives inside the sections; the section anatomy itself never varies.
41. **Every slide element carries its message in the fewest words** (2026-11-13, Alex on the Jumpstart offering decks: "they are
    overloaded with text; deliver concisely exactly the same messages and ideas, same narrative and accents, just with less words").
    - Draft lean from the start: a card body is one short sentence, a cost or result line is a clause, a band is one line, and a caption
      that restates the visual above it goes.
    - A cut keeps every claim, number and accent. It drops restatements, qualifiers and secondary examples (those move to the speaker
      notes), never the point.
    - When a slide feels full, cut words before shrinking type, adding a slide or widening a box.
    - In a grid of cards, the line under a card's name is ≤ 6 words and never restates the name's object ("Write docs" → "Agents
      write; people review"); the build counts it. A band that repeats the slide's lead or cards goes, and tool and stack names
      (STM32, OpenOCD, GDB) go to the notes unless the buyer asked (2026-11-25, Alex on the ALSO deck: "all the oneliners in this
      kind of cards are too long … requirement for them to be clear still stands").
    - A status cell in a roadmap table says where the item is now, in a few words: the step in progress, in the present tense
      («Погоджуємо з безпекою і делівері»), or the last milestone when nothing is in progress, with its date when one is due. The
      % bar shows how far; what is done and what comes next go to the speaker notes (2026-11-25, Alex on the Q3 roadmap: «подумай,
      як скоротити статус, залишивши його зрозумілим»).
42. **A seller one-pager opens with who the offer is for, then the challenges that follow from it** (2026-11-13, Alex on the Jumpstart
    seller one-pagers: the account manager may not know the account even has an R&D unit, so the page must link the company to the work).
    - The first section starts with a who-it's-for frame: the kind of company, what its team does, and therefore what that work depends
      on, taken from the agreed definitions (for the Jumpstarts, the bio and hardware definitions in the account-research tracker). Beside
      it, one line of dated evidence that such companies already have the topic on their radar.
    - Each challenge is a concrete situation a seller who has never met that unit recognises at once, in the nouns of the client's desk,
      and it carries the same name as on the client deck.
    - Case studies on a one-pager are framed cards beside the proof logos, not extra rows under them.
43. **A slide made for one customer shows that customer, and a photo replaces text wherever it can carry the point** (2026-11-25,
    Alex on the ALSO deck: "should use images of their products … so that it feels more like them"; "hero photos could be used more
    to make it less text, more perception").
    - Their own products, from their own site, cropped to one frame size per row (never stretched); a product with no public picture
      gets an outlined "in development" frame of the same size with its pictogram, or an unbranded photo of its category, never a
      competitor's branded product.
    - On the slides after it, a photo of the thing the slide is about (the board, the bench, the team at work) takes the place of a
      paragraph that describes it.
44. **A deck hangs on one spine: introduce one set once and point back to it by the same numbers and names** (2026-11-25, Alex on the
    ALSO deck: "the concept of directions is now disconnected from general narrative"; "keeping same naming wording for same things
    helps navigation and better reader referencing").
    - The set (for the Jumpstart decks, the five challenges of "What we hear") organizes every later section: the customer's picks,
      one slide per pick with the pick's number and name as its kicker, the program's focus, the module slides, the highlight frames
      (numbered like the set) and the case tags.
    - Never a second taxonomy the reader has to map onto the first (the offering deck's "program directions" were one); a picked
      item's name on one slide is word for word the next slide's title.
    - Point back by pictogram and name, never by number: a number makes the reader decode, a pictogram reads at a glance. Every slide
      about one item carries a strip of the set's pictograms under its title, the current one lit (2026-11-25, Alex on the challenge
      numbers: "pick some other approach than numbering … so that cross-referencing on the next slides reads better").
    - Wherever pictograms appear without their names (a frame's badge), the slide carries a key that names each one used; keep
      the reference pictograms distinct from every other icon set on the same slides (2026-11-25, Alex: "Give legend of the
      challenges, which icons you've used").
    - The spine's items keep one colour on every slide, including where they are the customer's assumed starting points: those
      are spine items too, so they take the spine's colour, never a second one (2026-11-25, Alex: "challenges are coded in blue
      color, but when we talk about our hypotheses for Also we code them red … decide on the best color"). Choose the colour no
      other code uses (orange there: blue was SoftServe's and a workflow's).
45. **Headings name, the line under them says** (2026-11-25, Alex on the ALSO deck: two-line caps sentences as titles "are too heavy and
    do a poor job keeping the structure clear").
    - The title is the slide's name in one line of ≤ 6 words: the name its section divider lists, the spine item it is about, or the
      peer it details ("PROGRAM FOCUS", "MANUAL TESTS SLOW RELEASES", "FIRMWARE"). The build checks one line and the word count.
    - What the slide says goes in one sentence-case line under the title, after the strip that shows where the slide sits.
    - Retitle reused slides the same way, so every heading in the deck has one look.
46. **A multi-column slide shows where each column, group and row ends** (2026-11-25, Alex on the module slides: "hard to navigate
    (unclear where one line/column ends and overall structure)"; on slide 4: "a bit off compared to slide 2 and 3"; on the case
    slides: "a little bit clunky").
    - One container per column, its labelled band at the same height as its neighbours'; one card per group; hairlines between rows.
    - A tag sits next to the thing it labels, never right-aligned across white space.
    - Slides of one kind share one anatomy: the module slides took the option slides' three panels; a new slide in a section is drawn
      on a copy of its neighbour (slide 4 on slide 3's table).
    - One label style per deck (mono caps), applied to reused slides too.
47. **A program offer shows its program in two slides: an at-a-glance opener and a weekly program** (2026-11-25, Alex: "from a single
    glance it should make clear what the program is … series of training, what your team will be doing, what they'll get"; "showing
    sessions and what happens in between, mention formats … easy to read, visual"; later "name it AI Jumpstart at a glance … a sexier
    slide template … it misses the summary session at the end + potential extension").
    - The opener, "<Program> at a glance", in the hero-half layout of rule 49: on the white half the journey, one row per phase with
      its weeks (the weekly program's phase names), ending on the summary session, then a dashed step to what can follow (next
      cohorts, extended support); on the photo half the big numbers (weeks, team, workshops, labs), what the customer keeps as
      white icons (so no separate "what we build together" slide) and the tools on a white tile. Never the vendor's engagement-model
      breakdown (Assessment → Activation Pod → Enablement → Agentic team: "that's off").
    - The weekly program: weeks as columns under the phases, one row per session format with its length, one to three words a cell,
      sessions with us in blue and the team's own work between sessions in neutral grey (never a colour another code owns), KPI
      checkpoints marked with the KPI icon; tagged TEMPLATE (rule 52). Models: the AI PM Jumpstart "program journey" grid and the
      scientists' weekly rhythm (OneDrive `Projects/Jumpstart/`).
    - Ways of working (paired runs, skill sign-off, solo runs, the summary session) are drawn wherever the program is explained: one
      card each with who takes part as pictograms (the team in ink, us in blue), its week and one line; never a sentence in a lane
      ("told u before … to visualize interactive formats, not keep the line of text").
    - The opener, the how-it-runs slide, the weekly program and the examples use the same words and icons for the same sessions and
      deliverables: write them once (a concept list in the build data) and draw every slide from it (2026-11-25, Alex: "slide 18
      uses wording that I believe rephrases terms used on 16, 17 … if we can use visual icons introduced earlier on the slide 18 -
      makes sense"; rule 59).
48. **Highlight with a soft wash, never a frame, and put the marker icon in clear space** (2026-11-25, Alex on the program focus slide:
    "not like 'rectangular' frames but rather better looking highlights"; on the workflow slides: "don't like frame highlights (though
    icons are good, just make sure they are not hidden and placed properly)").
    - A column or group: a wash behind it with a short accent tab on its top edge. Marked cards: a wash behind each run of cards,
      narrow at the sides so washes in neighbouring columns stay apart. A grid cell: the cell itself takes the wash.
    - The marker icon (which item it is) sits on the wash's top edge in the gap under the header, never over a header, a frame
      or text; leave that gap in the layout.
    - Washes in one group at the back; the icons and their key in one group in front (two clicks remove the customer's marks).
49. **A deck opens with one or two bold statement slides before any detail, in the hero-half layout** (2026-11-25, Alex on the ALSO
    deck: "open with 2 bold, well thought off, few words focus slides"; then "the reference decks of SoftServe should have some better
    layouts for bold slides … Hero image (full slide, half slide would be great)").
    - SoftServe's own bold layout (AIDP Factory V2, slides 15 and 17): the claim (≤ 6 words, two lines, the second in the accent
      colour) and one visual on the white half; a full-height photo on the other half under a dark wash (a light band under the
      running header, clear in the middle, dark at the bottom), the running header and page number in white, and the one public
      number in white at display size with its caption and source.
    - The same visual on both statement slides so they read as a pair (one maturity ladder: where most teams are and where the gains
      are; then what holds the audience's teams below the next level). Under ~110 words a slide.
    - The evidence on the photo half proves the claim in its direction: a number that points the other way goes, however
      impressive (89% assistant use on "AI stops where the board starts"; Alex, 2026-11-25: "the number is high, but the goal was to
      say that for embedded/hardware it's low").
    - The reader draws the conclusion from the numbers at a glance: two numbers in one unit, about one population, from one
      source where possible, each captioned in plain words with exactly what was measured. Never a compound measure (a percent of
      a percent, a threshold on a financial ratio: "6% of companies credit AI with 5%+ of their EBIT") and never two populations
      side by side (Alex, 2026-11-26: "hard to process and make a conclusion from just by looking"). Ranges too wide to sit side by
      side at display size stack, each caption under its number.
    - A claim about why is shown as its reasons, not as a number. When the slide narrows the deck's claim to one kind of team, the
      reasons are a contrast with the general case (software beside embedded, the narrowed side bright), so the narrowing shows
      without reading (Alex, 2026-11-26: "make sure that slide 3 emphasises (visually) that it is specifics of embedded teams").
    - A maturity scale says each level's essence in three to five plain words on the visual itself, under its name ("Tests and
      fixes its code"), so a reader who never saw the scale gets it (Alex, 2026-11-25).
    - The photo: a brand abstract from SoftServe's decks or a CC0 photo of the thing at stake, cropped so no maker's logo shows; a
      darker wash where text runs over a busy photo.
50. **Neighbouring slides never share one anatomy** (2026-11-25, Alex on two adjacent row tables: "too monotonous and similar /
    indistinguishable. When I look I feel content fatigue … allowed to shorten or drop some parts … or rework visualization approach").
    When two slides in a row would be the same table, redraw one in the shape of its content (voices in speech bubbles; a road from
    first draft to working code with the blockers as barriers on it) and drop the columns it does not need.
51. **Label the work, not an object that reads as the agent's output** (2026-11-25, Alex on an overview chip "Parts": "looks weird
    (agent improves / creates parts?) … Review other word usage from this perspective"). A chip or card under "agents take …" names
    an activity (Part selection, Board layout, Prototyping, Lab testing, Data analysis, Software design); an object name only where
    agents make that object (Spec, Docs, Code, Fixes).
52. **Say what a slide is when it is not a fact: a one-word tag at the right end of the title row** (2026-11-25, Alex: "add some 1-2
    word labels at the top saying this is an assumed focus challenge for them"; "position it as template program (subject to
    adjust)"). HYPOTHESIS (orange outline) on the customer's assumed starting points, TEMPLATE (blue outline) on a schedule we adjust;
    one pill style, one position, mono caps.
53. **A customer deck carries the customer's logo** (2026-11-25, Alex: "Use Also logo where applicable (including title slide) - and
    that's for future customizations as well"). Cover: a co-brand lockup, SoftServe's logo, a thin rule, the customer's wordmark (set
    smaller when it is heavier, so the two weigh the same); the customer read slide: the wordmark at the right end of the title row.
    From the customer's own site, made transparent in a light and a dark version; ask before downloading.
54. **A slide family's legends sit in one fixed band at the foot** (2026-11-25, Alex on the overview and workflow slides: "check layouts
    of legends, a bit poor geometry and placement"). One hairline, then row 1 the scale (each swatch drawn like the mark it explains,
    its word, its meaning) and row 2 the customer key (its wash, the key line, each marker icon with its name), at the same height
    on every slide of the family; never squeezed beside a title or a lead.
55. **Process steps carry one heading each, numbered** (2026-11-25, Alex: "for stage names, having a heading / subheading is
    abundant. Just keep headings (maybe with numbers?)"). "1 Concept" in one line, the number in the workflow's colour; the number
    is the anchor across disciplines, and the overview's shared step names carry the same numbers.
56. **Examples of an overview slide say so in their structure** (2026-11-25, Alex: "Make it clear that 20-21 is about examples of 19
    slide (program focus). Do that by proper structure, headings/subheadings"). The running header names the parent, the line under
    the title starts "<Parent>, example deliverables:", the parent marks the items shown next ("EXAMPLE FOLLOWS ›"), the section
    divider lists them as examples.
57. **Colour means one thing per deck; where it means nothing, panels stay neutral** (2026-11-25, Alex on the module slides: "I don't
    get the color coding of the slides, that's confusing"; then on the challenges coded blue on one slide and red on another).
    - Three columns that are not a sequence get one style (white, grey band, no arrows); a single accent marks only the names a
      reader looks up (skill names, weeks).
    - Write the deck's code down before building (Jumpstart decks: orange = the challenges and the customer's starting points; blue
      = SoftServe and its sessions; one hue per workflow; neutral grey = the customer team's own work) and check every slide
      against it: a thing keeps its colour everywhere, and when a code takes a colour, every other use of that colour goes
      neutral (the team's own work moved from salmon to grey; a challenge → solution → outcome slide colours the challenge panel
      orange and the outcome panel neutral). The brand's accent line in hero titles is typography, not a code.
58. **A customer deck survives its buyer's skeptical read** (2026-11-25, a VP-of-Engineering review Alex asked for: "no nonsense, no AI
    content, no clear overstatement, no 'they don't know what they pitch' feelings").
    - A problem assigned to the customer names a symptom they would say themselves, never a verdict on their work ("Manual tests
      slow releases", not "Too few tests to ship safely"), and nothing guesses at their org or headcount.
    - Every number is sourced or worked out on the slide, agrees with our own ratings elsewhere in the deck, and measures one thing
      with one baseline (no "weeks → days" where the same deck rates that work Low). A source's number says whose it is on the slide
      ("Software development teams · Bain"), so no reader takes it for their own industry's.
    - The measure a problem slide names is the first metric of that problem's outcome later in the deck ("Time to a safe release"
      on both), and a contrast never says "only" where the other side does it too (host tests run in CI for firmware as well: "a
      change counts once it runs on a board", not "proven only on a real board"; review, 2026-11-26).
    - Domain words are the customer's own (their buses, rigs and boards; no hobby-board photos); a barrier never carries the name of
      the thing that removes it; nothing implies agents act unsupervised on hardware that can be damaged.
    - The problem section promises nothing: a column next to the problems names what needs improving, as the measure ("Lead time
      per change"), never the result ("Shorter lead time"); results come after the solution (2026-11-25, Alex: "what improves ->
      What needs improvement").
    - Before delivery, two fresh readers of the rendered PDF: a presentation designer (who also checks one name, one icon and one
      colour per thing) and the buyer; apply what does not reverse Alex's own calls, and list what was left.
59. **One icon per concept, wherever the concept appears** (2026-11-25, Alex: "in activities we don't use the icons for activities
    that were introduced on slide 17. Make sure that if we introduce icons for a concept, than we use it in other places").
    - Every concept the deck pictures (a session type, a deliverable, a program element) has one icon, or one who-and-what pair,
      kept in one list in the build data; every slide that names the concept as a labelled item (a chip, a card, a cell, a list
      row, a reused slide's box) draws that icon from the list. An item whose peers carry icons never stands without one.
    - One icon never marks two concepts: the same glyph for the KPI report and the summary session, or for a document and a
      review, makes the reader decode. The build lists any glyph that marks two things and any second name a review found (the
      glossary), and both lists must be empty before delivery.
    - Look-alikes count as one glyph: two files that draw the same picture mark two things just as one file would (2026-11-26:
      the Lab session's flask and the explainer's flask for board testing passed a check that compared file names). Compare the
      drawings, and check a new icon against every icon in use before drawing it in (the gauge first drawn for board testing was
      already a challenge's pictogram).
60. **An overview shows where, not how much** (2026-11-25, Alex on the four-workflows overview: "skip intensity grade to differentiate
    impact, that's too detailed for this one; if that's no change or wait - skip the item"). The page that opens a slide family
    shows which items exist, all in one style; ratings, and the items with nothing to show (no change, waiting), live on the
    detail slides only. Its lead claims only what the overview itself shows.
    - On a grid, a missing item reads as "not here". The same work is the same item in every row that has it, and a cell is
      empty only when nothing there qualifies (Alex, 2026-11-26: the Design column showed software design for firmware only,
      "while in fact it helps with software design and UX design for cloud & apps & embedded apps as well"). Choose a column's
      items for the whole column, not row by row, and re-check the grid after every filter (dropping waits had emptied a cell).
    - A map built from one source inherits its gaps: check each row's steps against what that discipline really does (software
      that people use has UX design) before trusting the list.
61. **A diagram's labels state relations, so it reads without explanation** (2026-11-26, Alex on the ladder with a wall: "it looks
    like embedded & hardware is positioned against the board, which is not right. improve so that it's clear with no
    explanation"). A marker names who stands where (a pill on the level: "Embedded teams"); a barrier's label names what it
    demands ("Level 3 needs the board"). Two labels of different kinds on either side of a line (a team here, a thing there) read
    as two opposing camps. Test before delivery: a reader who sees only the picture states its message in one sentence, and it is
    the slide's.
62. **A deck for a buyer who leads several teams speaks to each of them** (2026-11-26, Alex on the ALSO deck: "we designed our deck
    with deliberate focus on embed/firmware/hardware ... I'm worried that we're missing the opp-ty to present solution that fits
    software teams as well"; a fresh VP review then found the app teams first named on slide 10 and "14 of 15 cards say FIRMWARE").
    - Name every team the buyer leads before the detail starts (on the cover, in the problems), and mark what each problem,
      starting point, example and case is for with one marker set (the workflows' pictograms, lit where it applies, pale where it
      does not). A team that finds itself nowhere stops reading; the program slides are where it does.
    - Keep what is distinctive and say it as the extra a team faces, never as the only problem (embedded teams have "three more
      reasons" to stop at level 2, software muted beside embedded); the evidence a team would claim as its own says so (Daxko and
      Payworks marked as software teams).
    - Shared slides never assume one team's tools or place of work: labs run "where your code runs", agent work is verified "in CI
      and on boards", the program's core is "for product teams", and How to start shows the pilot team is picked together.
    - The customer read is organized by the buyer's teams, in the customer's own public names, coded to the deck's workflows, one
      possible starting point per kind of team where the signals allow.
    - One rule decides which teams a starting point is for, on every slide that shows it: the teams whose work the pilot changes
      (its modules). The read slide, the starting-point and example slides and the washes on the workflow slides then cannot
      disagree (2026-11-26: a designer found the same starting point lit for different teams on four slides). Mark the two meanings
      apart: "teams hit" for a problem, "pilot teams" for a starting point. The team that owns the rigs and test suites is a team
      too: give it its card and name it in the pilot.
