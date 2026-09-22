# P3 — Scenario differentiation: signal→implication engines beyond logistics sales

**Status:** skeleton up (in progress)
**Job under study:** turn external developments (news, filings, disclosures, market events) + a company's own first-party data into account-specific, actionable implications (opportunities and risks) for a commercial team.

---

## 0. How to read this document

Three moves in order: validate the scenario set (MOVE 1), test the 12 steps against it (MOVE 2), then find the real per-step differences (MOVE 3). A closing sweep names what a complete product has and a first build will not.

**Conventions**
- `(reasoning)` — structured reasoning, deliberately uncited. Empirical claims carry a source and a tier.
- `[T1]` primary (regulator, standards body, statute, bar association) · `[T2]` analyst / reputable trade press / law-firm client alert · `[T3]` vendor marketing, vendor blog, relayed survey.
- `—` in the MOVE 3 grid means **no real difference at this cell**. It is a finding, not a blank.
- `NI-n` marks a proposed feature row or configuration setting that is **not implemented** in a first build.
- **Relay** in a citation means I read the claim through a secondary source, not at the primary. All relays are also listed under `## Unverified`.

**Scenario codes used throughout**

| Code | Scenario | Primary entity | My relation to it |
|---|---|---|---|
| S1 | Logistics & industrial enterprise sales | Customer account (+ trade lane, site) | sell-to |
| S2 | Financial services coverage / relationship banking | Counterparty / obligor group (+ exposure) | sell-to **and** exposed-to |
| S3a | PE portfolio monitoring | Portfolio company (+ thesis) | own |
| S3b | Deal origination (PE pipeline + corp dev) | Candidate target | compete-for, not yet known |
| S4 | Supplier & third-party risk | Supplier (+ obligation, contract clause) | depend-on, accountable-for |
| S5 | Public sector & defense capture | Procurement opportunity / program | compete-for a future event |
| S6 | Insurance underwriting & broking | Geolocated risk unit (+ accumulation zone) | exposed-to, shared with market |
| S7 | Professional services client development | Matter (+ adverse party) | sell-to, with veto |

---

## MOVE 1 — Validate the scenario set

### 1.1 The entity test (what makes a scenario fundamentally different)

"Different entities" needs an operational definition or every industry looks different. I use a four-dimension schema. A scenario is a genuinely new case only if it moves on **at least one** dimension in a way that changes what the pipeline must hold in memory. (reasoning)

| Dim | Question | Values seen |
|---|---|---|
| **(a) Primary entity type** | What kind of object does the implication attach to? | organization · physical asset · dated instrument · future event · geolocated risk unit · engagement/matter · person |
| **(b) Relation** | What is my standing toward it? | sell-to · depend-on · own · am-exposed-to · am-accountable-for · compete-for |
| **(c) Universe closure** | Where does the in-scope list come from? | closed & named · semi-open (docketed) · open & discovered · **unnamable** (exists, cannot be enumerated) |
| **(d) Implication target** | What internal object does the "so what" bind to? | service line · exposure/limit · thesis assumption · obligation · bid decision · portfolio aggregate · eligibility verdict |

An industry that only changes vocabulary — different nouns, same four values — is a **configuration**, not a scenario. I apply that strictly below, including against candidates I would rather have added.

### 1.2 Verdict on the four candidates

**S1 Logistics & industrial enterprise sales — genuinely distinct, and the right baseline.** `(a) organization + physical lane/site · (b) sell-to · (c) closed & named · (d) service line`. The non-obvious part is not the account; it is that **a lane and a site are first-class resolution targets that the account is reached *through***. A canal-transit restriction or a port labour action attaches to a lane, and the affected accounts are derived from who ships on it. That is a two-hop resolution the generic "news → company" model does not have. Keep as reference case.

**S2 Financial services coverage — genuinely distinct.** `(b)` is the break: the counterparty is *simultaneously a revenue object and a loss object*, so one signal must yield two implications with different owners. Two further entity facts have no S1 analogue: (i) the **exposure** — a signed position with a maturity, seniority and limit, which is not a "service line" because it already exists and can lose money; (ii) the **obligor / connected-client group**, a legally defined grouping that does **not** coincide with the commercial account hierarchy. Entity resolution here has to land on the regulatory grouping, which is built from accounting-consolidation logic rather than sales hierarchy [T1: LEI ROC on Level-2 direct/ultimate accounting consolidating parent]. Keep.

**S3 Private equity / investment funds — genuinely distinct, but it is secretly TWO scenarios. This is my main challenge to the set.** As stated it bundles two object models that disagree on `(b)`, `(c)` and `(d)`:
- **S3a Portfolio monitoring** — `(b) own · (c) closed & named · (d) thesis assumption`. You control the entity, you get its management accounts, and the scoring frame is a **falsifiable investment thesis**: signals are evidence for or against named assumptions, not opportunities. A signal that is huge but thesis-irrelevant is noise. Nothing in S1 has an entity like "an assumption I underwrote".
- **S3b Deal origination** — `(b) compete-for · (c) open & discovered · (d) ownability/approach timing`. The entity universe is an **output of the system**, not an input. Resolution runs backwards: from a signal to candidate entities that are in no list.
These need different universe definitions, different resolution directions and different outputs. Splitting them is not pedantry — a build that serves S3a will fail S3b at step 1 and step 4. **Split.**

**S4 Supplier & third-party risk — genuinely distinct, and the sharpest of the four after S1.** Two entity facts do the work. (i) A **compliance obligation is itself an entity** — UFLPA, OFAC's ownership-aggregation rule, CSDDD due-diligence duty — existing independently of any supplier and matched *against* the supplier set [T1: DHS UFLPA FAQ; T1: European Commission CSDDD page]. S1 has no object of that kind. (ii) `(c)` is **unnamable**: the entities you are accountable for extend into sub-tiers you have no contract with and frequently cannot enumerate. Survey evidence is directionally unanimous even though the numbers are not reconcilable: ~90% of organizations have tier-1 visibility against ~58% at tier 2 and below [T3 relay of McKinsey 2025]; only 6% claim full tier-2/3 visibility [T3 relay of Achilles]; only 12% can monitor more than half their tier-2 base [T3 relay of EcoVadis]. Keep.

**Net verdict on the four:** none is fake. One (S3) is two. The inversion Alex flagged in S4 is real but is not the *only* direction break in the set — S3a's `own` and S5's `compete-for a future event` are two more.

### 1.3 Additional scenarios that pass the entity test

**S5 — Public sector & defense capture.** `(a) future event · (b) compete-for · (c) semi-open (docketed) · (d) bid decision + eligibility`.
Entity difference: **the primary entity is a procurement opportunity that does not yet exist as a transaction.** It has a lifecycle state (forecast → sources-sought → RFI → draft RFP → RFP → award → protest), an expected solicitation date, an **incumbent with a contract end date**, and a **contract vehicle that gates eligibility** — you cannot pursue what you hold no vehicle for, regardless of fit. None of those objects exists in S1, where the customer exists continuously and eligibility is not a concept. The signal universe is also structurally different: a public docket with defined artifact types, not ambient news.
Concrete example: a defense IT integrator tracking the recompete of an agency's enterprise network O&M contract. The entity is the *program*, keyed on its option-year exercise date and its incumbent; the "so what" is a teaming decision 18 months out, not a pitch. Roughly 80% of the federal buying decision is reported to be made before the RFP is published, and GovWin claims 73% of its tracked opportunities sit in forecast/pre-RFP stage — i.e. the commercially useful window closes before the entity appears on SAM.gov at all [T3 GovDash; T3 Deltek].

**S6 — Insurance underwriting & broking.** `(a) geolocated risk unit · (b) am-exposed-to, shared with the market · (c) closed but overlapping · (d) portfolio aggregate + renewal decision`.
Entity difference, two parts. (i) The entity is **not a company but a risk unit with a location and a peril profile** — a warehouse, a fleet, a cyber posture — and the *same physical object can be an entity inside many unrelated accounts at once*. (ii) The implication target is frequently a **portfolio aggregate that has no per-account form**: individual entities can each be immaterial while their correlation through one accumulation zone is binding. S1's ripples propagate along relationships you own; S6's correlate through a peril shared with the whole market. A hard renewal-date clock sits under all of it — an implication delivered after the renewal binds is worth nothing, and submission triage is already the named bottleneck of the function [T2 Insurance Journal].
Concrete example: a revised wildfire perimeter changes aggregate exposure across several hundred policies in one ZIP-level accumulation zone; the action is suspending a binding authority, which exists at no single account.

**S7 — Professional services (law / consulting) client development.** `(a) matter · (b) sell-to, with veto · (c) open + a second adverse-party universe · (d) eligibility verdict`.
Entity difference, three parts. (i) The revenue object is the **matter** — a bounded engagement — not an account; a client with ten matters is ten entities with ten economics. (ii) A **second entity universe of adverse parties and former clients runs alongside the prospect universe**, and a hit in it *vetoes* the opportunity. Under ABA Model Rule 1.10, one lawyer's conflict is imputed to every lawyer in the firm, and Rule 1.7 bars representation directly adverse to a current client [T1 ABA Rule 1.10; T1 ABA Rule 1.7 comment]. This is the only scenario in the set where **a positive commercial signal can produce a mandatory negative output** computed against a different entity set. (iii) The relationship is held by an individual, not the firm, and leaves with them.
Concrete example: the corporate group spots a take-private signal at a target; the firm already acts for the likely bidder's lender on an unrelated matter; the pursuit is dead firmwide before any commercial reasoning happens — and the firm can be disqualified merely from having taken confidential information at the prospective-client stage [T2 Hinshaw].

### 1.4 Considered and rejected (fails the entity test)

I would rather have a shorter, honest set than a longer decorative one. These four were examined and did **not** clear the bar. Each yields a **configuration flag** instead — which is where their real difference belongs.

**Corporate development / M&A — REJECT. It is S3b.** Same four values on every dimension: open discovered universe, unowned targets, thesis-scored, output is approach timing. Strategic-buyer differences (synergy rather than IRR, integration complexity rather than exit path) are **scoring-function** differences inside an identical object model. Say it plainly: corp dev is a `buyer_type` setting on S3b, not a scenario.

**Telco wholesale — REJECT. It is S1's object model with different nouns.** accounts→carriers, trade lanes→routes, sites→POPs. One genuine novelty survives: **the same counterparty is simultaneously buy-side and sell-side on different routes**, so an implication must be netted before it is acted on. That is real, but it is a relation flag (`counterparty_is_bilateral`), and it also appears in energy trading and in contract manufacturing. Ship it as a setting spanning S1 and S4, not as a ninth column.

**Commercial real estate — REJECT, and this was the closest call.** `(a)` genuinely moves (a building is a physical, immovable, individually named entity with a capital stack), and the signal frequently originates at a **tenant who is not in my universe at all** and must be propagated tenant → lease → asset NOI → loan debt yield → refinanceability. The 2026 maturity calendar makes that chain concrete: ~$76.6B of hard CMBS maturities, of which ~36% carry debt yields at or below 8%, the band with the worst refinance and delinquency record [T2 CRE Daily / Trepp data]. But on `(b) am-exposed-to`, `(c) closed & named` and `(d) instrument outcome`, CRE lands exactly where S2 lands. Verdict: **S2 with `entity_has_fixed_location = true` and `signal_source_may_be_out_of_universe = true`.** What would flip it to a scenario: if the product had to *own the physical-asset model itself* — floorplate, submarket comps, capex state — rather than treat location as an attribute.

**Healthcare payer–provider — REJECT, narrowly.** Two features argued for inclusion: the purchase decision splits across a **three-body structure** where the IDN owns the site of care, the GPO holds the contract and the payer decides reimbursement — three legal persons, movable independently [T3 Excelerant; T3 HIRC]; and a **reimbursement code is a routing intermediary**, so a coverage-policy signal resolves onto codes first and onto providers who bill them second. But the *in-scope universe* remains organizations you sell to, `(b)` and `(c)` do not move, and the code is a hop in step 4, not an entity that carries an implication. Verdict: **S1 with `buyer_contract_payer_are_distinct = true` and a code-level resolution intermediary.** Both are genuinely missing from a first build (see NI rows), which is the useful finding — not a new column.

Two further cases, named for completeness and deliberately left outside the set:
- **Recruiting / talent coverage** passes `(a)` (the entity is a *person*, whose state changes with no public filing, and who carries a PII regime S1 never touches) but the commercial-team framing is weak and the privacy surface would dominate the design. Adjacent job, not this one.
- **Regulatory & policy affairs** passes `(a)` (the entity is a legal instrument moving through a legislative lifecycle) but inverts the direction to **inward**: the affected object is your own product or market, not a third party. That is a different job wearing the same pipeline.

### 1.5 The validated scenario set

**Eight scenarios.** Three of Alex's four survive unchanged, the fourth splits, three are added, four candidates are demoted to configuration flags.

| # | Scenario | (a) entity | (b) relation | (c) closure | (d) implication target |
|---|---|---|---|---|---|
| S1 | Logistics & industrial sales | org + lane/site | sell-to | closed & named | service line |
| S2 | Banking coverage | obligor group + exposure | sell-to **and** exposed-to | closed & named | exposure / limit action |
| S3a | PE portfolio monitoring | portfolio co. + thesis | own | closed & named | thesis assumption / VCP lever |
| S3b | Deal origination | candidate target | compete-for | open & discovered | ownability + approach timing |
| S4 | Supplier & third-party risk | supplier + obligation | depend-on, accountable-for | **unnamable** (n-tier) | obligation consequence |
| S5 | Public-sector capture | procurement event | compete-for a future event | semi-open (docketed) | bid decision + vehicle eligibility |
| S6 | Insurance underwriting | geolocated risk unit | exposed-to, market-shared | overlapping | portfolio aggregate + renewal |
| S7 | Prof. services client dev. | matter + adverse party | sell-to, with veto | open + veto universe | eligibility verdict |

Coverage check: all six `(b)` values are represented; all four `(c)` values are represented; `(a)` covers organization, event, geolocated unit, engagement and (through S2/S4) instrument and obligation. The set spans the schema without redundancy. (reasoning)

---

## MOVE 2 — Challenge the 12 steps

### 2.1 Step × Scenario grid (holds / differs / absent)

`holds` = the step does the same work on the same kind of data with the same failure mode. `differs` = the step must do something different, needs different data, or fails differently. `absent` = the step does not occur.

| # | Step | S1 | S2 | S3a | S3b | S4 | S5 | S6 | S7 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Define entity universe | holds | differs | holds | differs | differs | differs | differs | differs |
| 2 | Ingest signals + first-party | holds | differs | differs | holds | differs | differs | differs | differs |
| 3 | Filter + de-duplicate | holds | differs | differs | holds | differs | differs | differs | holds |
| 4 | Resolve affected entities | holds | differs | holds | differs | differs | differs | differs | differs |
| 5 | Retrieve + rank evidence | holds | differs | differs | differs | differs | differs | differs | differs |
| 6 | Reason the "so what" | holds | differs | differs | differs | differs | differs | differs | differs |
| 7 | Map to a service line | holds | differs | **absent** | **absent** | differs | differs | differs | differs |
| 8 | Trace ripples | holds | differs | differs | differs | differs | differs | differs | differs |
| 9 | Score magnitude + confidence | holds | differs | differs | holds | differs | differs | differs | differs |
| 10 | Assemble the artifact | holds | differs | differs | differs | differs | differs | differs | differs |
| 11 | Human review | holds | differs | differs | holds | differs | differs | differs | differs |
| 12 | Deliver downstream | holds | differs | differs | holds | differs | differs | differs | differs |

**Headline reading (reasoning).** 20 of 96 cells hold, and 12 of those 20 are S1 itself. **The 12 steps are the shape of S1 and only S1.** Every other scenario bends at least seven of them, and the two buy-side scenarios lose one outright. That is not a criticism of the decomposition — it is the definition of the product problem: the steps are the right skeleton, and almost all of the engineering is in the per-step configuration.

The two `absent` cells fall in the same row. **Step 7 presupposes the organization has something to sell.** S3a maps implications to an internal value-creation lever; S3b maps them to nothing, because fund-mandate fit was already applied at step 1. A build that treats "map to offering" as mandatory will emit a null-shaped field in both — worse, it will hallucinate a catalog entry to fill it.

### 2.2 Notes for every non-"holds" cell

**Step 1 — Define entity universe**
- S2 `differs` — universe must be the regulatory obligor / connected-client group, built from accounting-consolidation logic, which does not match the sales hierarchy [T1 LEI ROC].
- S3b `differs` — universe is an *output*. Scope is a thesis-shaped screen, not a list; the step produces candidates rather than bounding them.
- S4 `differs` — scope is spend × criticality × obligation reach and extends into sub-tiers with no contract; the in-scope set is partly unnamable.
- S5 `differs` — scope is future procurement events filtered by vehicle eligibility, NAICS and set-aside status, not by customer.
- S6 `differs` — appetite rules replace the list: the entity set arrives as inbound submissions, and one account contributes units to many accumulation zones.
- S7 `differs` — two universes must be defined: the prospect set and the adverse-party/former-client set that can veto it.

**Step 2 — Ingest signals + first-party context**
- S2 `differs` — exposure, limit and rating data sit behind information barriers; some first-party context cannot legally be blended into the same reasoning context [T2 Proskauer].
- S3a `differs` — the richest first-party source is board-level management reporting, which is MNPI; ingesting it creates a wall-crossing record [T2 Sidley].
- S4 `differs` — first-party context is contracts and clauses (audit rights, flow-downs, notice obligations) plus an obligation register; external feeds include sanctions, entity and customs lists.
- S5 `differs` — the primary feed is a structured public docket with object *state transitions* (forecast → sources-sought → draft RFP), not documents to be read.
- S6 `differs` — ingest includes geospatial hazard data and catastrophe-model output, a data type with no analogue in the other seven.
- S7 `differs` — first-party context is the matter and time-entry ledger, whose access is itself restricted by ethical walls inside the firm.

**Step 3 — Filter + de-duplicate**
- S2 `differs` — de-dup must not collapse an official disclosure and a rumour into one signal; provenance class governs what may lawfully be acted on.
- S3a `differs` — relevance is thesis-relevance. A market-moving story that touches no underwritten assumption is noise, however large.
- S4 `differs` — relevance is obligation-triggered: a minor story matching a listed entity outranks a major story that matches nothing.
- S5 `differs` — de-dup runs across *lifecycle stages of one object* (the same procurement as forecast, sources-sought and draft RFP), not across outlets.
- S6 `differs` — de-dup is across event footprints (one catastrophe, many bulletins) and must preserve the footprint geometry, not just the narrative.

**Step 4 — Resolve affected entities**
- S2 `differs` — must resolve to the obligor group and ultimate parent, not the traded name; commercial string matching produces the wrong risk grouping.
- S3b `differs` — resolution is inverted: signal → candidate entities that exist in no list. This is discovery, not matching.
- S4 `differs` — must traverse the ownership graph with fractional aggregation (OFAC's 50% test aggregates stakes held by several blocked persons) and follow n-tier supply paths to entities with no record [T3 relay of OFAC guidance].
- S5 `differs` — resolves to a program/opportunity keyed on agency + NAICS + vehicle + incumbent, not to a company record.
- S6 `differs` — resolution is geospatial: which insured locations fall inside an event footprint polygon.
- S7 `differs` — dual resolution. Every signal is resolved against the prospect universe *and* the conflict universe; a hit in the second vetoes the first firmwide [T1 ABA Rule 1.10].

**Step 5 — Retrieve + rank evidence**
- S2 `differs` — evidence must stay separable by wall side; public-side and private-side material cannot be merged into one ranked set.
- S3a `differs` — evidence is ranked against named thesis assumptions, so relevance is defined by the underwriting model, not by recency or magnitude.
- S3b `differs` — evidence is sparse and largely inferential; ranking must reward corroboration across independent proxies over recency.
- S4 `differs` — evidence is retained as a dated due-diligence record; the obligation is to show what was known and when, not only what is true now.
- S5 `differs` — evidence includes award history, past performance and protest record, ranked by effect on win probability rather than on relevance.
- S6 `differs` — much of the evidence is model output (hazard scores, modelled PML) and must be ranked and labelled as model-derived, not observed.
- S7 `differs` — evidence about a prospect may be confidential from another matter and must be *excluded* from ranking even though the firm holds it.

**Step 6 — Reason the "so what"**
- S2 `differs` — two-sided: one signal must yield a commercial implication and a credit/limit implication, with different owners and different clocks.
- S3a `differs` — the output is thesis confirmation or disconfirmation plus a value-creation-plan change, not an opportunity.
- S3b `differs` — the output is *ownability and approach timing* ("is this now buyable, and by us"), not what to sell.
- S4 `differs` — the output is exposure, substitutability and obligation consequence; "opportunity" has no meaning on this side.
- S5 `differs` — the output is a bid/no-bid stance and a shaping action, positioned against a procurement calendar rather than a relationship.
- S6 `differs` — the output is an appetite, pricing or aggregate-limit action; per-entity implications can each be immaterial while jointly binding.
- S7 `differs` — the output set includes "do not pursue" as a mandatory verdict; a genuine opportunity can produce a negative result.

**Step 7 — Map to a service line**
- S2 `differs` — maps into two catalogs at once: product holdings to sell, and credit actions (limit, covenant, collateral, hedge) to take.
- S3a `absent` — no sellable catalog exists. Replaced by mapping to a value-creation lever or governance action inside a company you own.
- S3b `absent` — nothing to map to. Fund-mandate fit was the step-1 screen; re-applying it here is redundant and invites a fabricated catalog entry.
- S4 `differs` — maps to a mitigation playbook (dual-source, audit, corrective-action plan, exit), not to an offering.
- S5 `differs` — maps to three things simultaneously: a solution, an eligible contract vehicle, and a teaming shape. Two of the three are eligibility, not fit.
- S6 `differs` — maps to appetite class, product form and authority level; the "offering" is a permission to write, not a thing to pitch.
- S7 `differs` — the mapping target includes a **person**: the practice group plus the named partner who holds the relationship.

**Step 8 — Trace ripples**
- S2 `differs` — the ripple is contagion through correlated exposures and sector concentration; it must be *aggregated*, not narrated.
- S3a `differs` — the ripple is comparable-company read-across to other holdings and into the fund's reported mark.
- S3b `differs` — the ripple is competitive: does the same signal reach rival bidders and move the price against us?
- S4 `differs` — the ripple is sub-tier dependency and single-point-of-failure discovery, usually through entities never contracted with.
- S5 `differs` — the ripple runs along the teaming graph; a signal about a partner can flip them to a competitor, or create an organizational conflict of interest, on a different bid.
- S6 `differs` — the ripple is accumulation: many independent entities correlated by one peril, plus reinsurance and retrocession dependency behind them.
- S7 `differs` — the ripple is conflict propagation: accepting matter A forecloses pursuit B across the whole firm, permanently.

**Step 9 — Score magnitude + confidence**
- S2 `differs` — the score must be reproducible and defensible to an auditor or regulator, with a recorded basis and version; directional confidence is not sufficient [T2 relay of FCA 2026 CDD review].
- S3a `differs` — magnitude is expressed in value terms (EBITDA, multiple, valuation impact) and can move a reported mark.
- S4 `differs` — thresholds are asymmetric: a low-confidence item that later proves true is a compliance failure, so the cost of a false negative is not symmetric with a false positive.
- S5 `differs` — magnitude is contract value × probability of win, and confidence must feed a bid/no-bid gate that has its own cost of pursuit.
- S6 `differs` — magnitude is expected loss or PML, computed rather than judged; a narrative confidence label is unusable downstream.
- S7 `differs` — conflict findings are binary and are not scored at all. Scoring applies only to the residue that clears the veto.

**Step 10 — Assemble the artifact**
- S2 `differs` — must split into a relationship briefing and a risk/compliance record, with different audiences, retention periods and disclosure exposure.
- S3a `differs` — the artifact is a monitoring pack and board input on a fixed reporting cadence, not an ad-hoc briefing.
- S3b `differs` — the artifact is a target profile and approach memo about a company with which there is no relationship to brief on.
- S4 `differs` — the artifact is a supplier risk record plus an escalation, and it is itself a retained compliance document.
- S5 `differs` — the artifact is a capture plan / bid-no-bid pack anchored to the procurement calendar, not to a meeting.
- S6 `differs` — two artifacts, not one: a per-risk underwriting note and a portfolio accumulation view that has no per-risk form.
- S7 `differs` — the artifact cannot circulate until it carries a clearance status; the status is part of the document, not metadata about it.

**Step 11 — Human review**
- S2 `differs` — review is a named control with accountable first- and second-line roles, and must be evidenced, not merely performed.
- S3a `differs` — the reviewer is a deal partner or board member who may be wall-crossed; the act of review itself creates an MNPI record.
- S4 `differs` — rejecting a flagged item is a recorded risk acceptance with a named owner and an expiry, not a dismissal.
- S5 `differs` — review is a formal gate (a bid/no-bid board) producing a decision record; it is not approve/reject on content quality.
- S6 `differs` — review follows a referral and authority hierarchy; above a threshold it must escalate to a senior underwriter, and below one it may be absent entirely.
- S7 `differs` — an ethics/conflicts clearance by a separate function sits alongside the commercial review, and the commercial reviewer cannot override it.

**Step 12 — Deliver downstream**
- S2 `differs` — delivery targets both CRM and the risk/KYC case system, and an event-driven review may have to be *opened as a case*, not merely noted [T3 KYC360].
- S3a `differs` — delivery is into the portfolio monitoring pack, the board file and the valuation file, on the quarter's clock.
- S4 `differs` — delivery must trigger contractual machinery (notice, audit right, corrective-action plan), not just inform someone.
- S5 `differs` — delivery is into the capture/pipeline system and gate calendar, and must respect procurement communication blackout rules.
- S6 `differs` — delivery lands in the policy-admin or binding-authority system where it changes what may be written, not what someone knows.
- S7 `differs` — delivery is gated by clearance; an uncleared item must not reach the pursuit team at all, which means suppression has to be a delivery outcome.

### 2.3 Steps that are MISSING from the 12

Six. Four appear only in some scenarios; two are universal and are therefore the more serious omissions.

**A. Scenario-specific missing steps**

| ID | Missing step | Where it sits | Scenarios that need it | Why the 12 do not cover it |
|---|---|---|---|---|
| **M1** | **Eligibility / permission-to-act gate** — a binary authorization test run *before* reasoning: restricted list, information barrier, conflict imputation, contract-vehicle eligibility, sanctions block. | between 4 and 5 | S2, S3a, S3b, S4, S5, S7 | Step 3 is a *relevance* filter and step 9 is a *confidence* score. Neither can express "this is relevant, high-confidence, and we are forbidden to act on it." In S7 the gate is the output. |
| **M2** | **Scheduled / deadline trigger** — emit ahead of a dated instrument even with no new signal, and suppress after the date passes. | before 1, as a second entry point | S2 (review due dates), S5 (solicitation and option-year dates), S6 (renewal dates), S3a (quarter end) | The 12 steps are event-driven end to end. Four scenarios are *date*-driven: the most valuable output is produced because a clock ran out, not because something happened. |
| **M3** | **Portfolio aggregation** — roll per-entity implications into a correlated group (peril zone, sector, obligor group, sub-tier chokepoint) and evaluate the group. | after 8 | S6 (mandatory), S2, S4, S3a | Step 8 traces ripples *outward from one entity*. Aggregation runs *inward across many*. In S6 the only material output can be an aggregate; an entity-by-entity pipeline never produces it. |
| **M4** | **As-of freeze + negative assertion** — record the evidence state at a point in time, and record "screened, nothing found, on date X, against sources Y". | after 9 | S2, S3a, S4, S6 | The 12 steps emit only when something is found, and index only the latest state. Where the output is auditable or feeds a valuation, silence must be a record, and "what did we know on 12 June" must be answerable. |

**B. Universal missing steps — present in every scenario, absent from the 12**

| ID | Missing step | Why it matters |
|---|---|---|
| **M5** | **Routing / ownership assignment** — decide which named human owns this item, in which system, with what SLA. | Step 12 says "deliver downstream" and silently assumes the owner is known. It is not: in S1 territory rules decide it, in S2 the commercial and risk owners differ for the same signal, in S7 the relationship is held by an individual partner. Misrouting is the most common way a correct implication produces no action. The sibling P1 workflow reconstruction also carries this as its own step, from a completely different evidence base. |
| **M6** | **Outcome capture and calibration** — label what happened to each item (pursued / won / lost / risk materialized / false positive) and feed it back into scoring. | Nothing in the 12 steps learns. Step 11's approve/reject is the only feedback and it measures *plausibility at review time*, not *correctness after the fact*. Without M6 the confidence score at step 9 can never be calibrated, only asserted — and in S2/S4 an uncalibrated confidence score is the exact artifact a regulator will ask about. |

**One step that deserves a challenge in the other direction.** Steps 3 and 5 overlap. Step 3 filters for relevance; step 5 ranks evidence by relevance. In six of eight scenarios these are the same judgment applied twice with different names, and a build will end up with two relevance models that disagree. The defensible split is: **step 3 decides whether a signal enters the system at all (a corpus decision); step 5 decides what supports a specific claim about a specific entity (a claim decision).** If the build does not draw the line that way, merge them. (reasoning)

---

## MOVE 3 — Per-step differences ("what matters here")

### 3.1 The grid

One table per step. `—` means **no real difference here** — the step does what the generic version does. 16 of 96 cells are dashes; that is the honest count, and the dashes cluster exactly where you would expect (S1 is the baseline, S3b is the thinnest-context scenario, S7 concentrates all its divergence in resolution and delivery).

**Step 1 — Define the entity universe**

| | What matters here | Gap |
|---|---|---|
| S1 | Lanes and sites are entities in scope, not account attributes | |
| S2 | Use the regulatory obligor group; the sales hierarchy is the wrong grouping | NI-1 |
| S3a | — | |
| S3b | The universe is an output; define a thesis screen, not a list | NI-10 |
| S4 | Scope reaches suppliers you cannot name; closure by criticality, not contract | NI-2 |
| S5 | Scope is future events, gated by vehicle eligibility and set-aside status | NI-4 |
| S6 | Appetite replaces the list; entities arrive inbound, spanning many accumulation zones | NI-12 |
| S7 | Two universes: prospects, plus an adverse-party set that vetoes them | NI-5 |

**Step 2 — Ingest signals + first-party context**

| | What matters here | Gap |
|---|---|---|
| S1 | — | |
| S2 | First-party exposure data is wall-restricted; ingestion must respect barrier sides | NI-11 |
| S3a | Board-level management accounts are MNPI; ingesting them creates a wall-crossing record | NI-11 |
| S3b | — | |
| S4 | Ingest contract clauses and obligation registers, not only news and filings | NI-2 |
| S5 | Ingest object state transitions from a public docket, not documents | NI-7 |
| S6 | Geospatial hazard and catastrophe-model output are a first-class input type | NI-8 |
| S7 | Matter-ledger access is itself walled inside the firm | NI-11 |

**Step 3 — Filter and de-duplicate**

| | What matters here | Gap |
|---|---|---|
| S1 | — | |
| S2 | Keep provenance class; never merge a rumour with an official disclosure | NI-6 |
| S3a | Relevance means thesis-relevance; a huge off-thesis story is noise | NI-9 |
| S3b | — | |
| S4 | A tiny story matching a listed entity outranks a large unmatched one | NI-2 |
| S5 | De-duplicate across lifecycle stages of one procurement, not across outlets | NI-7 |
| S6 | De-duplicate event bulletins while preserving footprint geometry, not just narrative | NI-8 |
| S7 | — | |

**Step 4 — Resolve which entities a signal affects**

| | What matters here | Gap |
|---|---|---|
| S1 | Two hops: signal hits a lane or site, accounts derive from it | NI-8 |
| S2 | Resolve to ultimate parent and obligor group, not the traded name | NI-1 |
| S3a | — | |
| S3b | Inverted: signal to candidates that exist in no list yet | NI-10 |
| S4 | Traverse ownership with fractional aggregation, and n-tier paths to unrecorded entities | NI-3 |
| S5 | Key on agency, NAICS, vehicle and incumbent, not a company | NI-7 |
| S6 | Geospatial: which insured locations sit inside the event footprint polygon | NI-8 |
| S7 | Resolve twice; a conflict hit vetoes the commercial hit firmwide | NI-5 |

**Step 5 — Retrieve and rank evidence**

| | What matters here | Gap |
|---|---|---|
| S1 | — | |
| S2 | Public-side and private-side evidence must stay in separate ranked sets | NI-11 |
| S3a | Rank against named thesis assumptions, not against recency or magnitude | NI-9 |
| S3b | Sparse and inferential; reward corroboration across independent proxies over recency | NI-9 |
| S4 | Retain with retrieval date; the record is what you knew when | NI-13 |
| S5 | Award, past-performance and protest history, ranked by effect on Pwin | NI-16 |
| S6 | Label model output as model-derived; never rank it beside observed fact | NI-6 |
| S7 | Exclude evidence the firm holds but may not use here | NI-11 |

**Step 6 — Reason the "so what"**

| | What matters here | Gap |
|---|---|---|
| S1 | — | |
| S2 | Produce both: commercial opportunity and credit action, with different owners | NI-14 |
| S3a | Output is thesis confirmed or broken, plus a value-creation-plan change | NI-9 |
| S3b | Output is ownability and approach timing, not what to sell | NI-9 |
| S4 | Output is exposure, substitutability and obligation consequence; "opportunity" is meaningless | NI-14 |
| S5 | Output is a bid/no-bid stance and a shaping move, calendar-anchored | NI-17 |
| S6 | The output may exist only at the aggregate; per-risk reasoning misses it | NI-12 |
| S7 | "Do not pursue" is a valid and mandatory output | NI-4 |

**Step 7 — Map to a concrete service line / offering**

| | What matters here | Gap |
|---|---|---|
| S1 | — | |
| S2 | Two catalogs at once: products to sell, credit actions to take | NI-14 |
| S3a | No catalog. Map to a value-creation lever inside a company you own | NI-15 |
| S3b | Nothing to map to; forcing this field invents a catalog entry | NI-15 |
| S4 | Map to a mitigation playbook: dual-source, audit, corrective action, exit | NI-15 |
| S5 | Solution plus eligible vehicle plus teaming shape; two of three are eligibility | NI-4 |
| S6 | The "offering" is a permission to write, bounded by authority level | NI-15 |
| S7 | The mapping target includes a person: the partner holding the relationship | NI-5 |

**Step 8 — Trace second-order and cross-entity ripples**

| | What matters here | Gap |
|---|---|---|
| S1 | Ripples run along lanes and sites that several accounts share | NI-8 |
| S2 | Contagion through correlated exposures; must be aggregated, not narrated | NI-12 |
| S3a | Comparable-company read-across to other holdings, and into the reported mark | NI-12 |
| S3b | Does the same signal reach rival bidders and move the price? | |
| S4 | Sub-tier dependency and single points of failure, via entities never contracted with | NI-2 |
| S5 | Teaming graph: a partner signal can create an organizational conflict elsewhere | NI-5 |
| S6 | Accumulation across unrelated entities, plus reinsurance dependency behind them | NI-12 |
| S7 | Accepting matter A forecloses pursuit B firmwide, permanently | NI-5 |

**Step 9 — Score by magnitude and confidence**

| | What matters here | Gap |
|---|---|---|
| S1 | — | |
| S2 | Reproducible, versioned, auditor-defensible basis; directional confidence is not enough | NI-13 |
| S3a | Magnitude in value terms; the score can move a reported mark | NI-16 |
| S3b | — | |
| S4 | Asymmetric thresholds: a missed true positive is a compliance failure | NI-13 |
| S5 | Contract value times Pwin, netted against a real cost of pursuit | NI-16 |
| S6 | Expected loss or PML, computed; a narrative confidence label is unusable | NI-16 |
| S7 | Conflict findings are binary and unscored; score only what clears | NI-4 |

**Step 10 — Assemble the output artifact**

| | What matters here | Gap |
|---|---|---|
| S1 | — | |
| S2 | Two artifacts: relationship briefing and risk record, different retention and readers | NI-14 |
| S3a | A monitoring pack on the reporting calendar, not an ad-hoc brief | NI-17 |
| S3b | A target profile; there is no relationship to brief anyone on | |
| S4 | The artifact is itself a retained compliance record, not a note | NI-13 |
| S5 | A capture plan anchored to the procurement calendar, not to a meeting | NI-17 |
| S6 | Per-risk note and portfolio view are separate artifacts with separate readers | NI-12 |
| S7 | Clearance status is part of the document, not metadata about it | NI-20 |

**Step 11 — Human review**

| | What matters here | Gap |
|---|---|---|
| S1 | — | |
| S2 | An evidenced control with named first- and second-line accountable roles | NI-18 |
| S3a | The reviewer may be wall-crossed; reviewing itself creates an MNPI record | NI-11 |
| S3b | — | |
| S4 | Rejection is a recorded risk acceptance with an owner and an expiry | NI-18 |
| S5 | A formal bid/no-bid gate producing a decision record, not content approval | NI-18 |
| S6 | Authority hierarchy: escalate above a threshold, skip review below one | NI-18 |
| S7 | A separate ethics clearance that the commercial reviewer cannot override | NI-4 |

**Step 12 — Deliver downstream**

| | What matters here | Gap |
|---|---|---|
| S1 | — | |
| S2 | May have to open a case, not merely notify a banker | NI-19 |
| S3a | Lands in the board pack and valuation file, on the quarter's clock | NI-17 |
| S3b | — | |
| S4 | Must fire contractual machinery: notice, audit right, corrective-action plan | NI-19 |
| S5 | Respect procurement communication blackouts; delivery timing can disqualify you | NI-17 |
| S6 | Delivery changes what may be written, not what someone knows | NI-19 |
| S7 | Suppression is a delivery outcome; uncleared items must not arrive | NI-20 |

### 3.2 Not-implemented feature rows / configuration settings implied by the grid

Every row below is the answer to "at this step, this scenario could not be trusted the way S1 can". All are **not implemented**. `F` = feature row (new capability to build). `C` = configuration setting (a switch on an existing capability). Ordered by how many scenarios they unblock.

| ID | Kind | What it is | Closes step(s) | Scenarios | Status |
|---|---|---|---|---|---|
| **NI-4** | F | **Eligibility gate** as a first-class stage between resolution and reasoning, with pluggable rule packs (restricted list, conflict imputation, vehicle/set-aside, sanctions block). Can suppress a correct, high-confidence item and log why. | new (M1), 6, 7, 9, 11 | S2, S3a, S3b, S4, S5, S7 | not implemented |
| **NI-12** | F | **Portfolio aggregation layer**: correlation groups (peril zone, obligor group, sector, sub-tier chokepoint) evaluated as the unit, surfacing items individually immaterial and jointly binding. | new (M3), 1, 6, 8, 10 | S6, S2, S4, S3a | not implemented |
| **NI-13** | F | **As-of freeze + negative assertion**: immutable evidence snapshot per output, plus "screened, clear, on date X, against sources Y" as a recorded result. | new (M4), 5, 9, 10 | S2, S3a, S4, S6 | not implemented |
| **NI-11** | F | **Information-barrier-aware context assembly**: evidence tagged by wall side; the reasoning context refuses to blend sides; every crossing is logged. | 2, 5, 11 | S2, S3a, S7 | not implemented |
| **NI-17** | F | **Deadline trigger**: bind entities to dated instruments, emit ahead of the date with no new signal, suppress or downgrade after it passes. | new (M2), 6, 10, 12 | S5, S6, S2, S3a | not implemented |
| **NI-15** | C | **Catalog abstraction** — `catalog_type = offering \| lever \| mitigation \| permission \| none`, with a null-safe mode so step 7 can be switched off rather than fabricating a mapping. | 7 | S3a, S3b, S4, S6 | not implemented |
| **NI-16** | F | **Computed-magnitude adapters**: plug an external calculator (PML, expected loss, Pwin × value, EBITDA impact) in place of a judged score. | 5, 9 | S6, S5, S2, S3a | not implemented |
| **NI-8** | F | **Geospatial resolution**: polygon ↔ location matching, footprint-preserving de-duplication, and lane/port geography as a resolution hop. | 2, 3, 4, 8 | S6, S1 | not implemented |
| **NI-9** | F | **Thesis object**: named falsifiable assumptions with an evidence-for/against ledger; relevance and scoring computed against assumptions. | 3, 5, 6, 9 | S3a, S3b | not implemented |
| **NI-2** | F | **Unnamable-universe scoping**: n-tier expansion producing inferred entities flagged `discovered_not_contracted`, each with a confidence-of-existence. | 1, 2, 3, 8 | S4 | not implemented |
| **NI-5** | F | **Conflict-imputation graph**: firmwide adverse-party graph across open and closed matters, with imputation and screening-wall exceptions. | 1, 4, 7, 8 | S7 | not implemented |
| **NI-14** | F | **Dual-implication generation**: one signal yields an opportunity and a risk, routed to different owners with different SLAs; neither may suppress the other. | 6, 7, 10, 12 | S2, S4, S6 | not implemented |
| **NI-18** | F | **Evidenced review control**: reviewer identity, role, rationale; rejection recorded as risk acceptance with an owner and an expiry, never a delete. | 11 | S2, S4, S5, S6 | not implemented |
| **NI-19** | F | **Write-path delivery connectors**: open a case, fire a contractual notice, change a binding authority — as distinct from read-path notification. | 12 | S2, S4, S6 | not implemented |
| **NI-6** | C | **Provenance class** as a first-class field (`official_disclosure \| regulated_filing \| reported \| rumour \| model_output`) with action gating by class. | 3, 5, 9 | S2, S6 | not implemented |
| **NI-1** | C | **Entity grouping mode** — `sales_hierarchy \| obligor_group \| legal_entity` — resolving via accounting-consolidation hierarchy rather than name match. | 1, 4 | S2 | not implemented |
| **NI-3** | F | **Ownership-graph traversal with fractional aggregation**: sum stakes held by several listed parties to a threshold, emit a blocked verdict. | 4 | S4, S2 | not implemented |
| **NI-7** | F | **Docket state machine**: model a procurement as an object with lifecycle states; de-duplicate across states; emit on transitions. | 2, 3, 4 | S5 | not implemented |
| **NI-10** | F | **Reverse resolution / discovery mode**: signal → candidate entities in no existing list, bounded by a screen rather than a roster. | 1, 4 | S3b | not implemented |
| **NI-20** | C | **Suppression as a delivery outcome**: an item can be correct and still must not be delivered; suppression is logged and reviewable. | 10, 12 | S7, S2 | not implemented |

**Three configuration settings carried over from the demoted candidates in §1.4** — they are real requirements even though their industries did not earn a column:

| ID | Kind | What it is | Step(s) | From |
|---|---|---|---|---|
| **NI-21** | C | `buyer_contract_payer_are_distinct` + a **code-level routing intermediary**: resolve a policy signal onto billing/product codes first, then onto entities that use them. | 4, 7 | Healthcare payer–provider |
| **NI-22** | C | `counterparty_is_bilateral`: the same counterparty is buy-side and sell-side on different objects; implications must be netted before action. | 6 | Telco wholesale (also energy trading, contract manufacturing) |
| **NI-23** | C | `entity_has_fixed_location` + `signal_source_may_be_out_of_universe`: propagate from a non-counterparty (a tenant) through a physical asset to a dated instrument. | 4, 8 | Commercial real estate |

---

## The empty-circle sweep — capabilities a complete product has that a first build will not

_pending_

---

## Sources

_pending_

## Unverified

_pending_
