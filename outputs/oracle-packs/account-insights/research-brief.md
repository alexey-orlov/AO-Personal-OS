# Research brief — Account Insights pack

_Synthesized 2026-09-22 from four Opus research passes (`research/P1`–`P4`), the signed DHL SoW, Vlad's one-pager and section-deck slides 9–10. Claims are labeled: **[F]** verified fact with a tiered source in the underlying pass · **[I]** inference · **[G]** gap. ~10 min read._

## The answer, first

**Vlad's pack is right about the shape and narrower than it needs to be in five specific ways — and one of its central claims is wrong in the expensive direction.**

1. **The shape is right.** The engagement moved to signal → per-account opportunity/risk, and the market has a name for that: **signal-based selling** (sales) / **early-warning systems** (banking). It is not a fringe pattern. **[F, P1]**
2. **The narrowing is real** (five ways, below), and the widening is nearly free because signal-triggered is a **superset**: a system that fans one event out to many accounts can always also research one account on demand; the reverse fails, because an account-triggered system has no persistent event stream. **[F, P1]**
3. **The Oracle-pack column is wrong.** The matrix credits the Oracle + NVIDIA baseline with one capability (vector search + reranking). AI-Q's deep research agent already ships planner → concurrent researchers → writer producing a **citation-backed report**, with **deterministic citation verification** against actually-retrieved sources. Tally across the 12 steps: **full 3 · partial 5 · none 4.** Claiming ~23 of 25 capabilities as ours will not survive a technical review by anyone who has read the AI-Q README. **[F, P4]**
4. **The real product is precisely the four steps the baseline does not cover:** define and maintain the **entity universe** (1), **entity resolution** (4), **mapping to the seller's own service catalog** (7), **cross-account ripple** (8) — plus the hard halves of two partials: **calibrated confidence + business magnitude** (9) and **CRM-schema structured write-back** (12). **[F, P4]**
5. **The room is occupied, and the incumbent is free.** Salesforce's Account Research & Meeting Prep went GA 2026-03-16; Clay's Account Research Agents ship structured auditable fields where each field carries the agent's reasoning, with human-approved write-back; Anthropic's Salesforce integration ships approval-gated account research. Below all of them sits Google Alerts + a shared doc. The pricing floor is "beat free plus twenty minutes of a rep's attention". **[F, P2]**
6. **So the differentiation is not "AI researches accounts".** It is the **join**: an external event × *your* account book × *your* own catalog of what you can sell — and the governance around it. Step 7 has **exactly one shipped implementation market-wide** (LinkedIn Account IQ, driven by a free-text product blurb). Step 8 has **zero**, in any market. Step 11 is nearly empty among the products a coverage team would actually buy. **[F, P2]**

## The five narrowings

| # | What Vlad's pack says | What the research says | Cost of leaving it |
|---|---|---|---|
| N1 | **Signal-triggered only** | Both patterns are named, productized and bought; account-triggered is the larger installed base because the CRM and the calendar impose it **[F, P1]** | Drops the dominant entry point and the DHL SoW's own original ask, for no engineering saving |
| N2 | **One pass** — "scheduled scan + manual submit" | Every mature vendor sells a **standing subscription per account**: cadence, a **delta against last run**, and a "nothing material this period" state. AlphaSense ships monthly cadence with dynamic variables; Clay's Signals are standing monitors **[F, P2 G1/G2]** | A briefing that re-states last month's facts is worthless; recurrence is what makes it a product rather than a report |
| N3 | **Sell-side only** — all four verticals are demand-side | The same engine serves **banking coverage, supplier & third-party risk, insurance underwriting, PE portfolio and origination, public-sector capture, professional-services client development** — eight validated scenarios against an entity test **[F, P3]** | Step 7 is *absent* in two of them and differs in five; handled as a config flag (`catalog_type = offering \| lever \| mitigation \| none`) this costs one setting, not a second product |
| N4 | **No governance layer** | Six steps are missing entirely: **eligibility gate** (relevant, true, and forbidden), **deadline trigger**, **portfolio aggregation**, **as-of freeze + negative assertion**, **routing/ownership**, **outcome capture**. The last two are universal and appear independently in P1's own 10-step reconstruction **[F, P1+P3]** | These are exactly what P2 calls "individually unglamorous and collectively unoccupied" — i.e. the actual differentiation |
| N5 | **Only 3 ○ rows in ~25** | T9: a matrix with almost nothing marked not-done is evidence the table is incomplete, not that the product is complete. The research returns **23 not-implemented rows and 12 empty-circle capabilities** **[F, P3]** | The capability matrix currently reads as a sales document, not an engineering one |

## Structural corrections to the 12 steps

- **Merge 3 + 4** into one **signal normalization** step. You cannot judge relevance until you know which entity the story is about, and de-duplication is largely a by-product of resolution. ZoomInfo ships one thing: a Pulse Feed "grouped by account". **[F, P2 O2]**
- **Consider merging 5 + 6.** Every vendor treats agentic retrieval + synthesis as one atomic invocation. Keeping them apart is justified **only** if the product deliberately shows the evidence set for review — which would be a differentiator, not a default. **[F, P2 O1]** — *worth keeping split, deliberately.*
- **Draw the 3 ↔ 5 line explicitly:** step 3 decides whether a signal enters the system at all (a corpus decision); step 5 decides what supports a specific claim about a specific entity (a claim decision). Undrawn, the build ends up with two relevance models that disagree. **[F, P3]**
- **Add routing/ownership and outcome capture.** Misrouting is the most common way a correct implication produces no action; without outcome capture the confidence score can only ever be asserted, never calibrated. **[F, P1+P3]**

## Where the market genuinely fails — the roadmap's honest source

Six failure modes have **no standard handling anywhere** — not in the baseline, not in any named competitor **[F, P4 B14]**:

1. **Inference validity.** Everyone verifies the quote is real. Nobody verifies the conclusion follows from it.
2. **The honest empty state.** No product will say "nothing material happened here this month, and here is what we checked." Commercial incentives run the other way.
3. **Retraction re-checking.** The standard exists (**IPTC `pubStatus`**); nothing in this market re-validates a cited source before reusing it.
4. **Conflict as a finding.** Contradiction between reliable sources is silently resolved by rank order.
5. **Calibrated confidence.** Market scores are ranking scores. Nothing emits a number meaning "80% of claims at this confidence are correct" — **and neither does the baseline**.
6. **The correction feedback loop.** A human correction is treated as an edit to one document, not as labelled data.

Two more are **mature in an adjacent market and absent here**: n-tier ripple reasoning (Interos, Everstream, D&B in supply-chain risk) and service-catalog mapping, which has no standard term at all — itself a signal it is not productized. **[F, P2+P4]**

**The ripple finding is the sharpest commercial point in the whole brief:** the edges are already purchasable — PredictLeads sells 359M+ vendor/partner/customer connections by REST, flat file, webhook and MCP; Bloomberg SPLC quantifies ~200k relationships by revenue exposure off the ASC 275 >10% disclosure rule. **Every piece is licensable and nobody has assembled them into an account implication.** **[F, P2 C1]**

## The boundary that keeps a widened claim honest (T4)

> It reasons over **fragmented external evidence against an entity universe the customer owns**, and maps the result onto **actions the customer can actually take**.

Not commentary over a clean internal ledger — that is BI. Not a general research chatbot — that is AI-Q's own blueprint, and it is free. Not a data provider — AlphaSense and Factiva own licensed corpora (500M+ documents; ~350k classification codes) and are structurally unbeatable there; we **license**, we do not crawl. **[I, from P2]**

## The metric problem

Every vendor claim in this market is about **time saved**, none about **being right**: "60 minutes to 60 seconds", "90% of research time", "~3 hours per prospect". Zero published accuracy claims for the implication step, anywhere. **[F, P2]**

The one defensible manual-effort anchor is primary: Salesforce State of Sales (6th ed., n=4,050) measures **9% of a seller's week researching prospects + 9% on preparation and planning = 18%**, more than they spend meeting customers in person (12%). Every other figure found (70–105 min per account, 5+ hrs/week, 45 min → 5 min) is vendor-sourced with no stated method. **[F, P1]**

**And the slide already states the right metric set:** *"Focus: accuracy + confidence — what the PoC measures, against reviewer approve / reject."* That is the differentiated axis, it is what the delivered PoC will actually produce, and it is the axis on which no competitor publishes anything. Use it; do not add a time-saved claim we cannot source. **[I]**

Caution on the reviewer signal: approve/reject measures **plausibility at review time**, not **correctness after the fact**. A calibration claim needs outcome capture (N4), which the PoC does not have. State the metric as reviewer agreement, not accuracy. **[I, from P3]**

## Contested between research passes — not resolved here

**Does human-in-the-loop ship with AI-Q?** P4 reports a **Clarifier agent** doing "HITL plan generation and approval before deep research" from the 2.1.0 docs. A separate pass reading the **develop** branch reports the v2.2.0 changelog saying, verbatim, *"…with bounded source-tool batching and **no research-plan approval step**"*, with zero README hits for approve/confidence/entity-resolution/CRM. **[G]**
Both may be true of different versions. Either way the distinction that matters for us is untouched: AI-Q's HITL, where present, is **approve-the-plan**, never **approve-the-finding**. The reviewer UI is ours. Verify against the pinned version before any artifact prints an AI-Q capability.

**Also flagged:** NVIDIA's AI-Q-on-OCI deployment samples are **community examples, explicitly "not covered by NVIDIA Enterprise Support"**, and **AI-Q requires the RAG Blueprint deployed first**. Both are material to an architecture slide. **[F]**

## Gaps

- **[G] No delivered results.** The PoC had not started. No artifact may print a performance figure; metrics print "results to follow".
- **[G] No record of the 2026-09-10 packaging session** — no recording, transcript or note. The reasoning behind the one-pager's scope choices is undocumented.
- **[G] The internal contact is unconfirmed.** Slide 10 prints `RnDrequest@softserveinc.com`, which appears in no source file; Khomych's address on record is `bkhomy@`.
- **[G] Source-licensing rights are absent from the whole pipeline.** For an enterprise buyer this is a procurement blocker, not a footnote — Factiva's differentiator is literally being "licensed for specific GenAI uses". The DHL SoW caps third-party data at €5,000 and three sources, which is a PoV constraint, not a product answer.
- **[G] "One JSON per affected account" vs the UI.** The one-pager says one JSON per account; the screenshot shows one signal view carrying several accounts' opportunities. Unit of *reasoning* = signal; unit of *delivery* = account. The artifacts should say both.
- **[G] Unverified counts from P2's own list** — LinkedIn State of Sales has no current edition; Forrester/Gartner seller-side hours-per-account benchmarks appear not to exist.

## The "general enough but not too general" test

| Test | Verdict |
|---|---|
| T1 three-vertical hold | **Pass** — eight scenarios validated against an entity test; the spine holds with differences confined to per-step configuration |
| T2 entity test | **Pass** — four candidates were demoted to config flags precisely because they only changed nouns |
| T3 label test | **Pass** for "Account Insights" in sell-side scenarios; **fails** for supplier risk and underwriting, where "account" is the wrong noun — a naming constraint on how far the pack may widen under this name |
| T4 honest boundary | **Pass** — boundary stated above |
| T5 no-quirk test | **Pass** — nothing in the spine exists only because DHL works that way; the seven named DHL data sources are a configuration, not a step |
| T6 failure path | **Pass** — every step has one; six are "not covered by anyone" and are stated as such |
| T7 ingress/egress | **Partial** — ingress named (news, filings, CRM, commercial feeds); egress is `tbd` pending the Oracle anchor question below |
| T8 instance test | **Pass** — the delivered case is one instance; its divergence is now a stale document, recorded |
| T9 empty-circle test | **Pass after correction** — 3 ○ rows was a fail; 23 not-implemented rows + 12 empty circles clears it |

**T3 is the binding constraint and it shapes the options:** the name "Account Insights" is settled (2026-09-11) and carries the mini-site, the tracker and the section deck — but it does not survive the supply-side and underwriting scenarios. Widening the *engine* past sell-side is free; widening the *name* is not.

## An open question the research raises and cannot answer

**Where is the Oracle anchor?** The same question is open on the document pack and unanswered since 2026-07-24. Here the research supplies a candidate and a threat in one: **Oracle Sales Command Center** (Fusion Agentic Applications for CX, announced 2026-04-09) already does signal-led account monitoring with external enrichment and next-best-action. If the customer owns Fusion CX, steps 1/2/6/10/11/12 have a native Oracle answer. **[F, P4]**
That is either the integration story that makes this pack Oracle-anchored — or the reason Oracle does not need it. It should be put to the Oracle side, not decided here.
