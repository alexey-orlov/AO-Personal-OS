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
- Direct; density beats length. No hedging, no padding.
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
- For risk/decision questions: the call first (low / medium / high, yes / no / depends),
  then reasoning, then recommended action.
- **A multi-account research table is an interactive page** (Alex, 2026-11-12, CA Jumpstart
  outreach): an artifact with search, filters, sorting and per-row status kept in its database
  (one enumerated status field, a free-text next step and notes), not a spreadsheet or a Markdown
  table. Publish it early with the account rows and fill each row in as its research lands. Each
  row stays one scannable line of single numbers (headcount, team size) and short summaries
  written by hand, one or two dated facts in plain words that a colleague can read off the screen
  (Alex shares them with account execs): never a truncated first list item, a count of items or
  internal codes like S/M/W. Everything else (lists, sources, method math, notes) opens under "Show
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
  pain in the exact workflow; job postings and company news are rarely S); check that every
  recommendation uses the source decks' exact module names and only modules the decks mark ready; list the
  personas each account still lacks; list every search a limit or a blocked page left undone, and finish
  it. The first pass of the CA Jumpstart table had 7 of 13 angles leading with modules still in build.
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
