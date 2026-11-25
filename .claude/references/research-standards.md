# Research & analysis output standards

Alex's standing expectations for ANY research, analysis, or comparative output this repo's
agents produce — explore briefs, company/topic research, vacancy analysis, competitive
notes, Telegram research summaries. Distilled from his Claude-Chat instructions
(2026-06-12). Skills cite this file instead of restating the rules.

## Epistemic discipline

- Label non-trivial claims: **[Fact / source]**, **[Practitioner consensus]**,
  **[Inference]**, **[Speculation]**. Never state inference as fact.
- Source priority: (1) primary — official docs, patents, engineering blogs, case studies
  with specifics; (2) practitioner commentary; (3) real-case reports; (4) reasoning from
  principles. Cite the tier. Press releases and marketing pages don't count as primary.
- Flag selection bias, recency, and jurisdiction limits proactively — not only when asked.
- Forecasts: give a range (best / likely / worst) with the anchor for each, never a single
  number.
- **Numbers rest on published data, the proof sits beside the page, and scores come from a separate
  reviewer held to Alex's anchors** (Alex, 2026-11-24, on the R&D explainer: he asked for "real, benchmarked numbers so I can
  trust", then, once he had them, "remove citations and proof links"). Derive each share, duration or
  percentage from the closest published data, and keep the sources and the derivation in an evidence
  file beside the page (SoftServe work: its OneDrive folder). An explainer shows the numbers clean:
  the number, its range on hover, "~" on an estimate and one footer line on where the figures come
  from; no source numbers, source lists or proof links. A score on a scale (impact, fit, maturity)
  comes from a fresh agent that holds only the items, the scale and the evidence it finds. Its brief
  says what the scale measures and gives Alex's anchors as fixed calibration. Each anchor keeps its
  own scope: one comparison he gives sets the size of a step, not an ordering for every row.
  For agentic-AI impact, the scale measures how much the work changes for the person, not throughput
  in older studies. "Radical" means agents do the work and people direct and check, as when people
  stop writing code and talk to an agent. A middle score names its one specific help, or it moves:
  down to none (everyday chatbot use, already automated, physical work, waiting) or up a level
  (Alex, 2026-11-24: "I still see lots of 1/3 and it's not clear whether it's a substantial thing
  or marginal improvement"). Without the anchors, scores drifted both ways:
  - the author's first pass rated 28 of 56 kinds of work "big";
  - the first independent review scored by measured productivity, rated 2 radical and capped coding at 2;
  - the re-review with anchors rated 13 radical, 19 moderate, 15 limited and 10 none. Its first pass
    still held nine data items too low, because my brief turned Alex's one release-metrics example
    into a rule for every layer.
- Comparative claims: judge competition at the **use-case** level (can it do the customer's
  job?), not the product-category label — a broad platform and a narrow primitive can compete
  head-on even when they're "different categories". Verify a product's *current* capability
  surface before ruling it in or out (vendors ship new modalities — e.g. a vision API adding
  streaming video); never assert "can't compete" from memory or without decomposing the use
  case into sub-jobs and checking each. Say which dimension each side wins.

## Specificity & gaps

- Name the source, vendor, system, metric, person, or number behind every claim. Replace
  "commonly used / most companies / typically" with a named instance — or say you can't.
- Mark gaps explicitly: "—", "no data", "⚠ gap", "unverified". Never fill with generics
  ("various tools", "industry-standard practices") or interpolation.
- Match metric granularity to the question — don't substitute an aggregate for a segment;
  flag the gap instead.
- Keep distinctions explicit. Don't quietly merge categories Alex has drawn.
- **Map a source onto a structure in the source's own units and words** (Alex, 2026-11-24, on mapping the Jumpstart deck onto the R&D
  explainer: "do direct mapping of either entire directions or examples, or nothing, but do not reframe"). The unit is what the source
  names (a direction, an example module), quoted as written. Mark it only where it targets the item directly; leave the rest blank, and
  say in chat what has no match. Do not add units of your own, "partly" marks or paraphrased labels. My first mapping split the
  deck's directions into lab steps and closest-row partial matches, and it read as a different offer.
- Don't force-fill a fixed framework. When mapping content into a given set of categories,
  a matrix, or a template, populate only cells the evidence supports and mark the rest "—".
  A fully-populated grid is a red flag (template-completion bias), not a win — separate
  verified from inferred per cell. And interrogate the framework itself: surface real
  content that none of the supplied buckets capture, rather than cramming it in or dropping
  it silently.
- Test every item against the stated inclusion bar by its core job, one item at a time. When
  Alex sets a bar for a list (e.g. "only what plain ChatGPT/Claude, even with Projects, can't do
  well"), ask whether the baseline does the job acceptably as people do it today, not whether
  the item's tooling goes beyond the baseline. An added integration doesn't lift a baseline job
  over the bar. If the baseline handles the core job, drop the item or narrow it to the part the
  baseline can't do, and list what was dropped in one line so he can contest it (Alex,
  2026-10-19, AI Jumpstart for Scientists: grant drafting, manuscript review and protocol
  adaptation had stayed in a "beyond Projects" list because their tooling cells named
  integrations).

## Tone & format

- Lead with the answer. No prompt-restating, no filler headers ("Overview", "Conclusion"),
  no closing pleasantries.
- Structured output (tables, numbered lists, bold captions + tight text) is the default
  for analytical or comparative content. Prose only when structure can't carry the meaning.
- Direct; density beats length. No hedging, no padding. **In chat, an answer to Alex's own question
  is exec-length by default:** the answer in one line, then at most five short bullets (~200 words);
  the full analysis only on request, even when he asks for several angles (Alex, 2026-11-19, after a
  ~1,400-word digital-twin scope answer: "TLDR, exec summary straight to the point").
- **Use-case catalogs: one row per problem a layperson would tell apart, in words a stranger
  understands** (Alex, 2026-11-19, on a 42-row digital-twin table: "no very similar / duplicate
  problems … explain to a person with no prior context and far from industry. Make it vivid").
  Before delivering, merge rows that are the same scene in another industry (queues at an airport, a
  till and a warehouse are one row) and name the industries in their own column. Each problem is a
  concrete everyday scene (who, what goes wrong, what it costs); each solution says what the person
  can now do and what changes. Translate or drop trade terms (PLC, takt, OEE, BIM, recall). The
  tangibility rule in `client-documents.md` holds for internal tables too. Any fit or rating column
  is a closed vocabulary (named components in a fixed order, or ✗), never a free-form comment, and a
  weak, hosting-only or far-fetched fit is ✗, not a hedged "Low" (Alex, same day, on the Oracle-fit
  column).
- **A list holds one altitude, and no two of its items overlap** (Alex, 2026-11-24, on business
  situations and VP challenges for the hardware Jumpstart: "too large", "more of VP points",
  "overlapping"). Name the altitude before writing: a company situation the CEO weighs (a launch, a
  migration, a regulator's deadline) versus a bottleneck the VP's team owns (slow testing). Move each
  lower-level item to the lower list or drop it. Test every pair: if one trigger or one fix covers
  both, merge them. Give the fewest items that cover the space, often the user's own examples plus one
  or two, each a name and one line, with no evidence or solution tails unless asked. My first cut held
  ten situations, four of them team-level, and eight challenges, three of them overlapping.
- **A page for executives is read in two minutes, so structure carries the information, not
  sentences** (Alex, 2026-10-13, on a two-page decision draft that was already a table: "right
  now it's a TLDR, make it executive-friendly, while not losing the meaning"). Every cell was a
  25-35-word sentence, and each review fix had added a qualifier. Lead with one line that gives the
  frame the list answers to (for the Oracle packs: Oracle's go-to-market), not with counts. Alex
  rejected the coverage tiles ("6 / 8 new", "4 / 4 campaigns") and a "keep 9, add 6" lead the same
  day: "too focused on pure numbers - we don't focus on counts that much". A count is a headline only
  when the number itself is the reader's information (the client-documents rule). Table cells are phrases on a word
  budget: a problem ≤ 14 words that names the role and ends on the cost (opening with the
  question the buyer asks also separates near-twin rows, so no routing rules are needed), a
  solution ≤ 15 ending on the measure that moves, a "built on" ≤ 8. A caveat is a marker plus one
  footnote line. Detail only a specialist needs stays in the long version, never on the page.
  Count the words per cell with a script before rendering, and make every review fix
  word-neutral or shorter.
- **A comparison table has the familiar case as its baseline column and splits the other side
  into "different" and "added" columns** (Alex, 2026-11-24, on embedded vs cloud app lifecycles).
  One row per step or attribute. A "different" cell states what replaces the same row's baseline
  cell, an "added" cell only what comes on top of it, and "-" means nothing. One term per thing
  across the table, no synonyms; cells are short noun phrases.
- For risk/decision questions: the call first (low / medium / high, yes / no / depends),
  then reasoning, then recommended action.
- **A multi-account research table is an interactive page** (Alex, 2026-11-12, CA Jumpstart
  outreach): an artifact with search, filters, sorting and per-row status kept in its database
  (one enumerated status field, a free-text next step and notes), not a spreadsheet or a Markdown
  table. Publish it early with the account rows and fill each row in as its research lands. Each
  row stays one scannable line of single numbers (headcount, team size) and short summaries
  written by hand, one or two dated facts in plain words that a colleague can read off the screen
  (Alex shares them with account execs): never a truncated first list item, a count of items or
  internal codes like S/M/W. A yes/no column shows Yes with the items or a one-line why, or just No. Everything else (lists, sources, method math, notes) opens under "Show
  details" as a full-width panel below the row, never crammed into narrow columns (Alex,
  2026-11-13).

## Process

- Proceed by default; state assumptions inline for small ambiguities. Ask at most ONE
  tight question, and only where a wrong guess forces a rebuild.
- Re-read existing artefacts before editing — don't act on memory.
- Flag, don't silently fix: name typos, contradictions, or wrong references in the request
  before proceeding.
- Treat pushback as signal: the most common cause is inference stated as fact, or
  reasoning where a search was due. Recalibrate from the failed rule, don't re-defend.
- **Personas come from the materials first** (Alex, 2026-11-12): when the request ships offer
  or product materials, take the buyer, champion and learner personas from their profile slides,
  with the example titles they cite, and map them onto each target's own organisation. A generic
  role list is the fallback, never the starting point.
- **Red-team account research before delivering it** (Alex, 2026-11-12, after asking for one): grade
  every buying signal S / M / W against a written rubric (S = recent, explicit budget, intent or acute
  pain in the exact workflow; job postings and company news are rarely S; an executive's general remark about AI, such as "like everybody else, we benefit from AI coding", is W: awareness, not intent; and a signal counts only from the team the offer serves, so an AI-tools ad for an operations role says nothing about the firmware team. Alex, 2026-11-13: ALSO's only AI-tools ad turned out to be for operations software, and a Generac CEO quote graded S read to him as no trigger at all, while the same company's ad for a leader to run its software teams' AI transformation was the real one); check that every
  recommendation uses the source decks' exact module names and only modules the decks mark ready; list the
  personas each account still lacks; list every search a limit or a blocked page left undone, and finish
  it. The first pass of the CA Jumpstart table had 7 of 13 angles leading with modules still in build.
- **A fact that sets a Yes gets an independent second pass** (Alex, 2026-11-13, on the tracker's Oracle
  column). This covers any per-account fact that sets a Yes: a vendor's product in use, an offer's fit. A fresh agent
  sees only the claim and its cited source, searches on its own first, then tries to disprove it. It looks for five
  things: a skill-only job-ad line, a copy it cannot trace to the company, an undated page, evidence older than 18
  months, a newer migration. Of the first pass's 20 Oracle claims, 3 failed and 4 were narrowed. The row shows Yes with
  the items, or No; each item's verdict and the dropped claims sit in the details.
- **A row added after review gets every check its reviewed peers got, before delivery** (Alex, 2026-11-18,
  on NextEra and BlackBerry). Run them as one gate:
  - the second pass on each Yes;
  - every signal opened at its source: date, quote, team, and whether the ad is still open ("hiring" only if it is, else "sought");
  - the hook and the two-pager's signals no older than 18 months and from the team the offer serves;
  - a likely problem that ends on money;
  - each internal claim traced to its source line and credited to whoever actually said it;
  - each title checked between Sales Navigator and public sources, with neutral wording when they differ;
  - each vendor attribution kept with its own date.

  The two rows added a day after the review shipped with:
  - an unchecked Oracle Yes;
  - a Feb 2025 job ad as the hook;
  - "hiring" for closed ads;
  - a colleague's remark credited to the account manager;
  - an SVP title that public sources give as VP.
- **Team sizing triangulates three estimates** (Alex, 2026-11-12): a Sales Navigator count × sampled
  precision × stale-profile and coverage factors; first principles from headcount or R&D spend; public
  disclosures. Agreement within ~1.5× → their middle; when a low LinkedIn count meets a higher
  first-principles figure, the count is a floor (it removes false matches but misses generic titles), so
  the conclusion is the geometric middle with the range shown. Show all three figures, never one number.
- **Named people at target accounts: Sales Navigator, read-only** (Alex, 2026-11-12): use his
  LinkedIn Sales Navigator through Claude in Chrome, one sequential agent at a human pace, from
  search-result cards only (opening a profile notifies the person); never connect, message, save
  or add to a list. Web sources cross-check; a name nobody can confirm stays out.

## Language

- If Alex writes in Russian or Ukrainian, answer in that language. Content drafted for
  someone else matches the recipient's register, not his.
