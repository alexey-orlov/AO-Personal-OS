# Client-facing document conventions

Rules for any client-facing offer, proposal, or delivered document, plus the
living-documents rule for updating anything already delivered. Pointed from root
`CLAUDE.md` — read BEFORE drafting a client document or touching an existing deliverable.

## Offers / proposals (2026-07-07)

- Write in third person ("the instructor" — never I/we/my).
- Keep Alex's internal strategic framings out of the document (e.g. "part-advisory" is
  an internal read, not client language).
- Don't echo the client's brief back verbatim — restate it in own words and add Alex's
  educated read of their underlying challenge (moderate inference, no invented
  specifics).
- De-AI the typography and vocabulary: no em-dashes (use ":" or "-" instead), no
  "↔"-style glyphs (write "<>"), no cutesy workshop names ("clinic"), say "customers"
  not "users" in B2B docs.
- Never include internal reference pricing/benchmarks (e.g. what another client paid) in
  a client document.
- **Summary altitude is read as the whole offering**: any figure in an at-a-glance
  strip, totals row, or headline stat is taken to describe the entire program, so never
  put a part's number there — a pilot subgroup's "5-10 people" reads as the program's
  total reach, and counting "demos" in format totals reads as many when one module holds
  one. Keep part-level numbers in the section that contextualizes them.
- In tables and diagrams, a row/label's annotation line is one short complete sentence
  that reads unambiguously on its own, not a keyword-fragment list; prefer
  industry-standard role/term names ("champions", "early adopters") over invented blends
  ("power adopters") (2026-07-14).
- Client-facing identity (2026-07-19): "Alex Orlov" + ao@alexorlov.co in headers,
  signatures, and footers of client documents (not "Oleksii"; no phone by default).

## Generated deliverables are living documents (2026-07-19)

Alex edits them directly in Word after delivery (restyling — e.g. the SoftServe amber
template, renaming, content changes). Before matching, updating, or basing new work on
ANY existing deliverable, READ the current file from disk — never work from the
generating script or the conversation's memory of it, and never regenerate over a
hand-edited file (the script is stale the moment he edits; port his edits first or build
inside the edited file's shell).

## Marketing copy: persona first, scaffolding last (2026-09-16)

From Alex's review of the Oracle mini-site home page: the copy "overemphasized the
counts and the scaffolding, not the essence" and used internal vocabulary
("workflow patterns", "packaged") as if it were customer language.

- **A problem statement is tangible** (2026-09-22, Alex on a pack's problem line *"Commercial
  teams work out what a development means for their accounts by hand…"*: "kind of waterish").
  It names a role and a situation that person would describe in their own words, with the
  nouns on their desk — *"Account managers can't keep up with all the market signals, internal
  insights and updates happening in their accounts"* — never categories standing in for them
  ("a development", "second order", "the offer"). Test: could that person say the sentence
  about their own week? The solution line passes the same test from the other side — what
  they do afterwards, not the machinery. And readable with zero context (2026-09-22, Alex on a
  candidate table whose problem cells read *"the call turns on two millimetres nobody
  measured"*: "hard to comprehend out of context"): a reader outside the company with no
  briefing — for a pack, the Oracle or SoftServe seller who will pitch it and has never worked in
  the industry — can restate it: name the business in the sentence, use literal words, introduce
  everything you refer to, no cleverness or ellipsis; if the pain is obvious only to insiders, one
  clause first says it exists and why it hurts (Alex, 2026-09-22: "the Oracle rep should know the
  issue first — many won't have that in their mental model").
- **Metrics are business metrics, never proof criteria** (2026-09-23, Alex on a sales one-pager
  whose tiles read *"Reviewer agreement ↑ · Confidence calibrated · Coverage ↑"*): a metric on a
  sales artifact is something the buyer's business already tracks or would put in a quarterly
  review, in money, time, volume, risk or quality terms, moved directly by using the solution —
  "time from damage report to booked job", "cost per claim", "planning cycle time". Technical
  acceptance criteria (agreement, precision, coverage, latency), vanity counts (signals processed,
  users onboarded) and vague gains ("better decisions", "visibility") never stand as the metric;
  when the engagement only defined technical criteria, derive the business metrics they serve,
  mark them as modelled or "results to follow", and put them to Alex as a proposal. Each metric is
  specific yet clear to a reader outside the industry, with the industry term in brackets if needed,
  and has a buyer-side owner who would sign off on it. A delivered-case block speaks about the
  customer's problem and what changed for them, never the engagement's mechanics (weeks, phases,
  source counts, contract status).
- **Structure before copy — a page is an argument, not an inventory** (2026-09-16, from
  Alex's review of the Services page: "very poorly structured, too long, no grand
  narrative"). Before choosing components, settle audience → positioning (what this page
  offers that its sibling pages don't) → three or four messages, each answering a reader
  problem → one screen per message, with a length target set up front ("a couple of
  screens"). A block that carries no message is cut or moved to the page that owns the
  detail; a page that repeats a sibling page's steps under different names is a structure
  bug, not a copy one.
- **Headings are display lines, not sentences** (2026-09-16, Alex on the Services H1 *"From
  Oracle's platforms to agents in production."*: "too long of a heading"). Uppercase display
  type multiplies length, so budget from the rendered size before writing: an H1 is two to
  four words (≤ ~24 characters a line, two lines at most), an H2 five words or fewer (≤ ~30
  characters), and the argument moves into the lead. **Since SoftServe's 2026 rebrand the
  display type is sentence case, not uppercase** (Azurio serif at weight 400), so the
  multiplier is gone but the budget is not: measured on the mini-site's own hero, an H1
  holds ~15 characters a line at 96px in a 700px column, a product name ~22 at 64px and an
  H2 ~30. Re-measure against the rendered size rather than reusing the uppercase numbers.
  Record: `~/Documents/GitHub/Oracle-Solutions-Site/docs/SS26-THEME.md` §6. Check the phone break too: no line
  left holding a lone short word.
- **A hero's lead is the promise, not the procedure** (2026-09-24, Alex on the Oracle mini-site
  replacing a lead that walked through *"a fixed-scope Jumpstart … taken to production in your
  tenancy"* with *"leading enterprise AI practice, accelerated delivery methodology combined with
  the power of Oracle data & cloud … accelerate their time-to-value with AI"*). In one sentence it
  says what the company brings and what the reader gets. The stages, the scope and where it runs
  belong to the section that explains them. When the owner's drafts repeat the promise in several
  headings, say it once, big, in the hero, and give every other heading its own facet of it (on the
  site: *A head start that scales.* · *Kick off your AI adoption.* · *The method behind the
  speed.*). Polishing a draft keeps its meaning, the owner's key verbs and the noun that names the
  offer (2026-09-25: Alex restored *"…with accelerator apps"* after the polish had cut his
  *"Applications to kick-off your AI adoption"* to *"Kick off your AI adoption."* because the eyebrow
  said *Products*; an eyebrow is micro-type and does not carry the message). It cuts only a heading
  that merely lists what the elements under it already name. Where a site has a checker, assert the
  promise's key phrase in the lead and forbid the procedure words there.
- **A picture carries its item's own idea, one picture per idea** (2026-09-25, Alex on the Oracle
  mini-site's category tiles, which set a product screenshot as a window on a chrome photograph:
  *"I don't like current mix of screenshots with backgrounds; purely SoftServe's abstract
  backgrounds will lack category relevance (each of the categories should have the image
  relevant to it)"*). At tile or card size a UI screenshot cannot be read, and a decorative
  background says nothing about the job, so the composite is two pictures and no idea. Draw each
  item's own job simply, as its typical flow, in the brand's own illustration language (on the
  site: softserveinc.com's Offers-tile line, one thin line gathering into a spark), and keep the
  set one family: one weight, one motif, one crop. Test: would a reader who covers the title name
  the job from the picture? Where a site has a checker, hold every picture to the family's rules.
- **A label earns its words** (2026-09-23, Alex on the Oracle mini-site: cut the *By industry*
  heading from the Use cases tab, and *"with filters"* from *See all products, with
  filters*). A heading over controls that already name what they hold is a third label for
  one thing: a tab bar saying *Use cases* over a row of industry tabs needs nothing between
  them. A link names where it goes, never the mechanics of the page it opens (*with
  filters*, *searchable*, *interactive*). Before shipping a heading or a link, ask what the
  reader learns from it that the elements around it don't already say. If nothing, cut it,
  and where a site has a checker, assert it there.
- Name the readers before drafting (for the Oracle site: an Oracle rep opening the page
  live on a call, and an enterprise buyer on Oracle), and write every headline and lead
  from their seat: the job it does and the outcome, in their words. A count, a taxonomy
  name or a packaging term ("seven products", "three workflow patterns", "packaged",
  "scoped") is a headline only when the number itself is the reader's information (a
  price split, a duration); otherwise it goes into body text or nowhere.
- Internal vocabulary stays internal: taxonomy labels, operating-model words ("pods",
  "packaged offering", "accelerator pack"), delivery jargon. The test for every
  sentence: would the rep say it out loud on the call? Concrete jobs ("read your
  contracts, plan your field workforce") beat category labels every time.
- Before delivering, count word frequency per screen or section and across the piece:
  no content word three times on one screen except proper nouns, one word for one
  thing across the piece (not "products" here and "solutions" there), and no claim
  repeated in more than two places. Peers set side by side (cards, tiles, figures in
  one grid) also never open on the same words or share a sentence pattern: *"Hours,
  not quarters"* beside *"Hours, not weeks"* reads as a template even though no word
  appears three times (Alex, 2026-09-23). Give each peer its own claim shape — a
  turnaround, a coverage, a number — and, where a site has a checker, assert it there.
- **A message read outside the product stands alone** (2026-09-23, Alex on the sales-kit
  email's opener *"Thanks for requesting it."*: "make sure that email text reads well
  outside this session and website context"). An email, a notification or a forwarded link
  is read cold, in an inbox, possibly days later, by someone who may not remember the form
  or never saw the site. Its first sentence says who is writing and what the message is.
  Nothing points back at context the reader must supply ("it", "your request", "the site",
  "the team") before the text has named it in full. An internal notice explains the form and
  the site to a colleague who has never opened either. Review a message the way it arrives:
  render it, and read From, Subject, preview line and body top to bottom. Hand that rendering,
  not the copy fields, to a fresh-context reviewer. Copy written field by field against a
  schema passes every field check and still fails this read.
- **A form does its job or says it can't; it never hands the visitor a mechanism**
  (2026-09-24, Alex on the mini-site's fallback that opened his mail app: "WTF is client? it
  just had to send message in the background, and communicate it as 10000 websites do").
  A form on anything we ship posts in the background and confirms the outcome in the words
  sites use (*Thanks, your request is in*, *Check your inbox*). It never opens a mail app or
  asks the visitor to finish the job by hand, never shows a success mark for something that
  did not happen, and never promises a result (*we'll email you*) on a copy that cannot deliver
  it. Where a copy cannot send (a preview host that blocks requests), it says so under the form
  before anyone types, and names the address to write to. Make it work where the user will
  try it: their own browser, the link they were given. A setup that works only in the agent's
  own tab is not working, whatever caveat came with it. Enforce it in the build's checker.
- The checks above are the Fable part; the counting, the persona read-through and the
  before/after record can be delegated to an Opus critic, as long as the rewrite itself
  stays with the session that owns the messaging.
