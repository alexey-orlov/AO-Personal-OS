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

_pending_

### 2.2 Notes for every non-"holds" cell

_pending_

### 2.3 Steps that are MISSING from the 12 (scenario-specific)

_pending_

---

## MOVE 3 — Per-step differences ("what matters here")

### 3.1 The grid

_pending_

### 3.2 Not-implemented feature rows / configuration settings implied by the grid

_pending_

---

## The empty-circle sweep — capabilities a complete product has that a first build will not

_pending_

---

## Sources

_pending_

## Unverified

_pending_
