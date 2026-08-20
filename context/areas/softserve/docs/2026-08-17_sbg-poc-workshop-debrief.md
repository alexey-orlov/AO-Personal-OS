# SBG × Oracle × NVIDIA × SoftServe — Project Planning AI PoC: workshop debrief

_source: Bohdan Khomych's written debrief of the SBG scoping workshop #2, supplied by Alex in chat 2026-08-20. Workshop date 2026-08-17 (inferred — the [2026-08-18 SteerCo](../calls/oracle/2026-08-18_124942_default_202608181205216609E8E0.md) refers to it as "yesterday's scoping workshop"). Both underlying transcripts were truncated at ~30 min, so agreements may exist that this record does not capture._
_type: source material — read-only. Distilled state lives in [sbg-poc.md](../sbg-poc.md)._

## 1. Headline: what actually happened

The session had two halves with very different characters.

**First half** — Dr. Ramadan walked us through SBG's target PMO operating model (the six-box process on screen), and we probed it. This was productive and generated the single most valuable admission of the workshop: original corporate plans almost never survive contact with execution.

**Second half** — an attempt to converge on PoC scope. It did not converge. It surfaced a genuine three-way disagreement inside SBG about scope shape, an unresolved data-access question, and — critically — an implicit challenge to why this partnership exercise is needed at all when individuals can build agents themselves.

**Net position:** we left without an agreed scope. Raja explicitly requested that Oracle and NVIDIA send a written scope proposal by email, with the data requirements spelled out, for SBG to review and respond to. That document is now the critical path item and it is on our side of the table.

## 2. Who was in the room and what they actually want

| Participant | Role / affiliation | Position and what they're optimising for |
|---|---|---|
| Dr. Ramadan | SBG corporate control / PMO methodology owner | Owns and defends the target operating model. Deep EVM discipline. Answers process questions thoroughly but deflects political ones. Wants the PoC to validate his transparency agenda. Explicitly framed the new model as "penetrating the island" of project-level autonomy. |
| Eng. Mustafa | Senior SBG executive (most senior voice present) | The strategic sponsor. Repeatedly overrode diplomatic answers with blunt reality ("very rarely has execution come even closely to our original assumptions"). Gave us the King Fahd Stadium case unprompted. Insists the PoC must not be scoped so small it "doesn't capture the story." He is the one to design the PoC to satisfy. |
| Raja | SBG initiative coordinator / facilitator | Risk-managing. Framed himself and the team as "only facilitators." Wants the scope decision written down and collectively owned, not taken live in a meeting. Repeatedly reset expectations downward: concept test, not a system, outcomes not to be relied upon. |
| Ahmed (Oracle SE) | Oracle solution engineering | Mapped subcontractor performance to Oracle procurement / supplier performance review domain. Offered ranked subcontractor recommendation by trend, discipline and region. Pushed the question back to us: how do project directors actually make the self-execute vs subcontract call today? |
| Ahmed (SBG, separate speaker) | SBG data/systems side | Argued for live connection to Oracle and Primavera rather than exports, on the grounds that the two reference projects are ongoing with daily transactions. Was overruled on integration but won an important concession on raw data. |
| Milo | Our side (advisory) | Asked the sharpest structural question of the session — the missing feedback loop from execution back to corporate planning. Also raised the relationship-based packaging question. |
| Waldemar | Our side | Pressed on granularity: are KPIs and lessons learned captured per project or per work package? And is subcontractor post-performance captured at all? Both answers were revealing. |
| Bohdan | SoftServe | Scope framing, the hybrid segment-plus-target-design proposal, data availability session request. |
| "Michael" (uncertain — may be Mustafa) | SBG | Raised the "I can build agents myself, why do we need this?" challenge. See §7 — this is the one to prepare for. |

## 3. The as-is process — as SBG describes it

### 3.1 Operating model shift already underway

SBG is ~2 years into a transition from project-siloed control to a strong-matrix model with corporate control embedded from day zero.

- **Previously:** each project ran as an "island." The project director was effectively the only person with real knowledge of project state. Dr. Ramadan's phrase — it was "very hard to penetrate this privacy."
- **Target:** corporate control (PMO, cost control) works "hand in hand" with each project from day zero, with the project sponsor role transferred into the corporate control department so that corporate holds knowledge from day one.
- **Framing used:** not a full projectised or functional matrix, but at minimum a strong matrix with enforced transparency.
- **Stated goal of the shift:** transparency, clarified progress status, and consistent reporting.

**Insight for us:** this transition is the political engine behind the whole PoC. Anything we build that increases corporate visibility into project reality is aligned with Dr. Ramadan's mandate — and is, by the same token, a threat to project-director autonomy. Expect passive resistance at project level. Design the outputs so the project director is a beneficiary, not a subject of surveillance.

### 3.2 Pre-tender / planning stage

- Corporate produces the initial project hypothesis: timeline, milestones, phase breakdown, packaging strategy, vendor selection criteria, metrics.
- Two scenarios at tender: either the client imposes a timeframe and SBG judges whether it's achievable ("logic or not"), or SBG builds the achievable timeframe and negotiates it with the client. Dr. Ramadan positions this judgement capability as a core SBG strength born of long construction history.
- Baseline schedule is built with the progress measurement tool injected from day one so earned value is computable from the start.

### 3.3 Execution and control

- Handover from planning to control at execution start.
- SBG cannot dictate 100% of control methodology. Construction reality: many internal and external stakeholders, with the client's supervision team, PMC and site PMO holding legitimate views on how progress is measured.
- SBG's non-negotiable: earned value management must be implemented on site regardless. If the client's progress measurement tool is acceptable to all stakeholders, fine; if not, SBG runs its own EVM in addition to whatever the stakeholders require.
- Progress measurement tools vary by client: some mandate manpower as the measure, some mandate cost/money, some want a hybrid or something else entirely.
- Earned value derivation: planned vs actual executed quantities × BQ price.

**This is a first-class technical finding.** There is no single progress measurement standard across the portfolio, by design and by client contract. Any cross-project comparison layer we build must normalise across heterogeneous measurement bases. Dr. Ramadan was explicit: until corporate agrees a unified progress measurement approach, "you cannot mix all together in one way." That normalisation problem is arguably the highest-value and least-obvious piece of IP in this engagement.

### 3.4 Performance review and KPIs

- Standard KPIs presented: SPI and CPI.
- SPI comes straight from schedule — easy.
- CPI is politically constrained. Dr. Ramadan: it touches confidential information including fines and actual expenses, and is "not common to present." Treat CPI data as restricted; do not assume access.
- SBG also uses **efficiency** as a distinct concept: quantities converted to manpower via productivity rates, then planned vs actual manpower compared.
- **Granularity today: project by project, not work package by work package.** This is a current-state limitation, not a target-state one.
- On subcontractor-level performance: Dr. Ramadan's answer was conditional — if you have a progress measurement tool running to activity-ID level in one baseline schedule, then you can take any fragment (by WBS level, by subcontractor work package) and apply the measurement basis to it. In other words: **technically derivable, not currently produced.**

### 3.5 Data access and governance

- All projects sit within the SBG domain, so access follows the existing DOA (delegation of authority) — who is authorised to see what.
- Central head office departments do see all data related to their function across all projects. PMO sees schedule and cost control data for all projects.
- **But it is not automatically collected or surfaced.** A project director has to go and explore it. Confirmed explicitly.

**Insight:** the access rights already exist. The gap is aggregation, normalisation and proactive surfacing — which is precisely the space an AI workflow occupies. This is a strong, defensible value proposition and should be stated in exactly these terms in the scope document: we are not asking for new data rights, we are activating rights SBG already holds.

### 3.6 Systems landscape (from Raja)

- Today: distributed / isolated systems. No solid integrated ERP.
- Project control runs in one system; finance elsewhere; data not integrated.
- In flight: consolidated unified ERP, with Primavera integration and finance integrated with Unifier.
- **Target completion: end of 2027.** Only then does Raja consider the data reliable enough to base real decisions on.

**Insight:** this is both an obstacle and our opening. Raja has explicitly deferred "realistic outcomes" to post-2027. That deflates PoC expectations usefully — but it also risks the whole initiative being parked until the ERP lands. Our counter-narrative should be: the PoC's job is to define what good data looks like so the ERP programme builds toward it, rather than waiting for the ERP and discovering the data model doesn't support the decisions you need. Framing the PoC as de-risking the 2027 ERP investment turns a delay argument into an urgency argument.

## 4. The pain points, in SBG's own framing

### 4.1 Plan vs reality — the core admission

Milo asked how well the corporate hypothesis (timeline, phasing, packaging) survives contact with the project director. Dr. Ramadan deflected to "each project is unique, case by case." Mustafa then cut through:

> Execution has very rarely come even close to the original assumptions. Very rare. In the recent past, in all of them. For many reasons — and these are the insights we will use AI to dig into.

**This is the mandate for the PoC, stated by the most senior person in the room.** Every artefact we produce should trace back to this sentence.

### 4.2 The missing feedback loop

Milo's structural observation: if the original hypothesis is consistently wrong, you'd expect a feedback loop that makes corporate planning better over time. It isn't visibly there.

SBG's response was layered:
- Corporate does receive feedback from projects and reports insights to executive management.
- But: "how reliable is this data coming from the projects themselves? There are always side stories to every story."
- And Milo's follow-on, unanswered: reliability aside, **is the data acted upon?**

**Insight:** three distinct failure modes are stacked here — feedback not captured at sufficient granularity, feedback that is captured being unreliable, and reliable feedback not being acted upon. A PoC that only addresses the first will not change outcomes. The reliability question in particular argues for grounding recommendations in quantities, schedules and transaction records rather than in narrative project reports.

### 4.3 King Fahd Stadium — the reference failure

Offered by Mustafa unprompted, as the concrete answer to "has central planning being overruled ever demonstrably hurt a project?"

- Fast-track project.
- Roughly nine months during which the project director was isolated in Riyadh, making decisions without headquarters support.
- Result: roughly six months lost, then "very, very harsh" remedial measures.
- PMO was not getting feedback at the granularity it needed. Reporting was at a very high level — not by sector, by zone, by package, by trade.
- Mustafa: "Records are there... maybe when you give it to them, we'll find some."

**This is the highest-value item in the entire workshop.** It is a named, internally-acknowledged, well-documented failure with a quantified impact, offered voluntarily as a dataset. Everyone knows about it, so there's no political cost in examining it.

**Recommendation:** make King Fahd Stadium the anchor case for the PoC. Retrospectively demonstrating that available data contained early warning signals — visible at zone/package/trade level but invisible in the high-level reporting that actually reached PMO — would be a far more persuasive proof of value than a forward-looking recommendation nobody can validate. It also directly satisfies Mustafa's "capture the story" constraint and sidesteps the data-quality objection, because we're explaining a known outcome rather than predicting an unknown one.

### 4.4 Subcontractor selection — the "real trap"

Dr. Ramadan's most animated contribution, and the clearest articulated business problem:

- Subcontractor failures have caused problems repeatedly across multiple projects.
- Lessons learned from previous projects are not reaching decision-makers on new projects.
- Each new project director walks into "a real trap" — making selection decisions without the categorised subcontractor database and historical performance data.
- The same failure recurs project after project because this information is missing at the decision point.
- **His ask:** make this check compulsory in the process stream before a selection decision is taken.

Important refinement: it's not only about completed projects. A subcontractor may be performing at the ceiling of its capacity on current work, yet still bid for new work beyond that capacity — and the strain is already visible in the efficiency figures of their ongoing projects. So the requirement is **live monitoring of in-flight subcontractor performance**, not just closed-contract retrospectives.

**Oracle's response** (Ahmed, SE): supported by the procurement and subcontractor management domains, with supplier performance review covering quality, performance and delivery — for both ongoing and closed contracts — and capable of recommending best-performing subcontractors by trend, discipline and region for shortlisting.

**Open item:** whether that Oracle functionality is already licensed and accessible to SBG was asked and never clearly answered. Confirm before the scope document goes out — the answer materially changes what we build versus what we configure.

### 4.5 Self-execute vs subcontract — the decision we need to model

Ahmed (Oracle) turned the question back on the room: nobody can automate this until we understand how project directors decide it manually today. He offered a first-cut criteria set.

**Self-execution — four elements:**
1. Internal manpower capacity — do we have the people
2. Equipment availability
3. Procurement department capacity — procurement, delivery, inventory for materials
4. Associated risks

**Subcontracting:**
- Subcontractor availability in market — local vs international
- Cash flow sufficiency
- Market structure — is the discipline dominated by subcontractors, or by a single subcontractor, such that there is effectively no choice

Current state: done manually, recalling data from disparate sources. Required inputs identified: applications, costing, financials, internal manpower, internal materials and equipment.

**Action for our team:** Ahmed's explicit request was for a simulation of how a project director does this today, without AI and without applications. That artefact — a documented manual decision walkthrough with a real project director — is a prerequisite for credible scoping. We should offer to run it. It's low-cost, high-trust, and it gives us the ground truth Oracle is asking for.

### 4.6 Political sensitivities — noted and not pursued

Milo asked whether packaging decisions by project managers and directors are sometimes relationship-based rather than driven by cost, quality, scope and past experience. Response: **"No comment."** CPI treated as confidential (fines, actual expenses).

**Insight:** "No comment" from a senior participant, with a prior offer that it might be "something we see in the data later," is close to confirmation. Handle with care. Do not put relationship-based award patterns in a written proposal. But be aware that if the PoC surfaces variance between recommended and actual selections, that finding will be politically loaded — and it may be the most commercially significant thing we could demonstrate. Decide in advance how we'd handle it if it appears, and who at SBG we'd take it to.

## 5. PoC scope — where the discussion landed (and didn't)

### 5.1 Candidate flows on the table

Two flows were discussed, and there was visible confusion about which one was in scope.

**Flow A — Project Design (agreed focus).** Three steps as Bohdan articulated them:
1. Gather inputs from the project manager and team
2. Pull available information about the new project
3. Review comparable historical packages for insights — with subcontractor information as a large separate input

→ Output: a templated target project design document as a recommendation to the project manager, which they then iterate on by supplying different data sources or additional inputs.

**Flow B — Subcontractor / vendor selection support.** Ranked recommendations from historical and in-flight performance data.

**Resolution:** Bohdan asked whether these were primary and secondary or two parallel flows. Dr. Ramadan clarified that Flow B as displayed sat **post-decision** — after the project director has decided and it has moved to procurement, ARB and vendor selection — whereas what SBG actually wants is a **proactive decision at day one** of the project. Agreement landed on **project design as the focus**, not performance review, with subcontractor intelligence as an input into it.

Dr. Ramadan's verdict on Bohdan's three-step formulation: "It needs to be experimented. You cannot say like that from now." — i.e. directionally accepted, not confirmed.

### 5.2 The unresolved scope-shape question

Mustafa framed this as the fundamental open question and explicitly flagged it for the next session:

- **Option 1 — end-to-end workflow, imperfect data.** Test the whole flow accepting that input data quality is poor or distorted. Argument for: it tests the real thing, and you improve with iteration.
- **Option 2 — truncated segment, good data.** Take only the part of the workflow where representative, good-quality data exists.

Mustafa: "I don't know the answer. But we need to think about this."

**Bohdan's proposed third path** (recorded, worth pursuing): implement one segment properly, and separately spend a portion of the effort **designing** the target end-to-end workflow without implementing it. Rationale: taking the whole workflow risks missing the expected result; taking a segment and designing the rest gives you the implementation win plus the artefact needed for the future investment decision.

**Mustafa's binding constraint on any of these:**
> It should not be very small. You're already picking one element of the whole construction cycle, so you're already limited. Limit it further and you may not capture the story.

His own suggested resolution mechanism, which is a useful compromise: **keep the full scheduling workflow in scope, but drop the difficult elements from AI and put a human in the loop for them.** Breadth of workflow, selective depth of automation.

**Recommendation:** this reconciles cleanly with Bohdan's proposal and should be the spine of the scope document. Full workflow breadth, explicit human-in-the-loop markers on the hard steps, deep automation on the two or three steps where data supports it, plus a designed-not-built target state. It satisfies Mustafa on scope, Raja on risk, and Dr. Ramadan on process integration.

### 5.3 Expectation-setting from Raja — record this verbatim in our own notes

Raja was emphatic and repeated it several times. This is the frame SBG will hold us to:

- This is a proof of concept. 100% efficient outcome is not expected.
- The output may not be accurate and may not be used as the basis for a new package.
- SBG will not design their next project package based on the PoC outcome.
- "We are testing the concept of the model." Then tweaking, learning, and taking it into the investment decision.
- Data may mislead, because both internal and external factors are in play — a cash-flow issue, for example, may not be capturable as an insight.
- The failure mode he fears is explicit: "If the data is not there, the PoC will fail. Not because you don't have the system, not because the AI is wrong, because we didn't choose the right project or the right area where the data is available."

**Insight — act on this.** Raja has pre-built the narrative for a graceful failure and located the blame in scope/data selection. That protects him, and it means our success criteria must be defined in the scope document in terms he has already accepted — concept validation, data-readiness assessment, target-state design — rather than accuracy of output. If we let accuracy become the yardstick, we lose against a bar Raja himself says is unachievable. Conversely, his framing hands us a legitimate and achievable definition of success.

### 5.4 Agentic vs workflow — terminology correction

An SBG participant flagged that they kept hearing "agent" and wanted to confirm this isn't about building agents to perform activities. Confirmed on our side:
- The PoC targets a **recommendation workflow**, with human decision-making retained.
- Autonomous agents are a possible future-state maturity level, and are where the industry is heading, but are not this scope.

**Action:** purge "agent" from SBG-facing materials. Use workflow, recommendation engine, decision support. The word is actively creating misunderstanding and, worse, it invites the commoditisation objection in §7.

## 6. Data access — agreed and unresolved

### What was agreed

| Point | Position |
|---|---|
| Live system integration | **No.** Explicitly ruled out for the PoC — no contract in place, concept test only. Raised by Ahmed (SBG), overruled. |
| Data form | **Raw exports**, exactly as exported from source systems. |
| Data manipulation | **None, by any means.** Firm agreement. |
| Source systems | Primavera (schedule); Oracle (cost, subcontractor data) |
| Reference projects | Two ongoing projects — appear to be a "Seven"-related project and a stadium project. Confirm exact names and whether King Fahd Stadium is among them. |

Ahmed's argument for raw data won a genuinely important concession and his reasoning should be preserved: if we train and design on manipulated working files, the workflow will be built against data shapes that won't exist when live integration eventually happens, and it will fail at that point. Raw exports keep the PoC forward-compatible with the 2027 ERP.

### What is unresolved

- **No dedicated data availability session has been scheduled.** Bohdan requested one, with SBG walking us through available raw data exports, and asked for samples in advance so we can prepare. Not yet confirmed — chase this.
- Whether Oracle's supplier performance review / procurement functionality is already licensed and accessible to SBG.
- Whether CPI-adjacent data (fines, actual expenses) can be shared at all, and if not, what proxy we use.
- **Granularity actually available in exports:** is zone / package / trade level present in the historical data, or only high-level rollups? This determines whether the King Fahd Stadium retrospective is even possible — note that the stated problem was that *reporting* wasn't at that granularity, which may mean the underlying records exist but were never rolled up that way. Verify before committing.

## 7. The strategic risk nobody resolved

Late in the session an SBG participant made a challenge that we need a crisp answer to. Paraphrasing closely:

> There are many initiatives — ad-hoc, one-off, personal. With good models available in the market, a lot of work can be done today without sessions like this. I'm developing agents myself. Anyone can. Our team has built agents in Copilot that read document sets and return legal clauses and quick checks, and they add value. So is this the purpose, or are we talking about solutions embedded in our workflow?

SBG voices pushed back internally, and the counter-arguments are the right ones:
- Those are ad-hoc agent creations. This is corporate level, building IP owned by the company going forward — not a one-off personal solution.
- Individual capability is real, but you cannot dismiss what NVIDIA and Oracle bring to the construction sector specifically.
- Doing this properly needs investment, process understanding, data availability, and a purpose-built model.
- Raja: we are testing the concept of the model; we can't cover the entire construction process here.

**Assessment.** This is the most serious commercial risk in the transcript, and it was talked past rather than closed out. The objection is essentially: marginal capability is now free, so what are we paying for? It cannot be answered with model capability claims, because the challenger is right that model access is commoditised.

**The answer we should build, and put in the scope document:**
1. **The moat is the data normalisation, not the model.** Heterogeneous progress measurement bases (manpower vs cost vs hybrid, client-mandated per contract, per §3.3), reconciled across Primavera and Oracle and isolated systems, to a comparable cross-project basis. Nobody builds that in Copilot over a weekend. It is the actual hard problem and SBG has already told us it's unsolved.
2. **It's corporate IP with governance, not a personal tool.** Compulsory process gates (Dr. Ramadan's ask in §4.4), DOA-compliant access, auditability, survivability when the individual who built it leaves.
3. **It de-risks the 2027 ERP investment.** Defining the target data model now means the ERP programme builds toward decisions SBG actually needs, rather than discovering the gap after the money is spent. This reframes the timing argument entirely.
4. **Ad-hoc agents can coexist and should be acknowledged.** Do not dismiss the Copilot work — the legal clause checker genuinely does add value. Position our scope as the layer those tools cannot reach: cross-project, cross-system, governed, historical.

**Action:** assign an owner to draft this positioning before the scope email goes out. If the scope document doesn't answer this question implicitly, it will be asked again — and next time possibly by someone controlling budget.

## 8. Risk register

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| 1 | Scope not agreed; no formal decision mechanism beyond "send us an email" | High | Get the scope document out fast, with two or three explicitly costed options rather than one recommendation. Let SBG choose — Raja has said this cannot be a one-person decision. |
| 2 | Data quality / granularity insufficient at zone-package-trade level | High | Data availability session before scope is finalised. Treat data readiness assessment as a named PoC deliverable in its own right, so it produces value even if it produces bad news. |
| 3 | Commoditisation objection (§7) resurfaces at budget stage | High | Build and rehearse the IP / normalisation / ERP de-risking narrative now. |
| 4 | Scope too narrow → "doesn't capture the story" → Mustafa unconvinced | Medium-High | Adopt full-workflow-breadth, selective-automation-depth per Mustafa's own suggestion. |
| 5 | Scope too broad → no demonstrable result | Medium-High | Bohdan's hybrid: build one segment, design the rest. |
| 6 | Everything defers to the end-2027 ERP | Medium | Reframe PoC as ERP requirements de-risking, not as something the ERP replaces. |
| 7 | Politically sensitive findings (relationship-based awards, CPI) surface and stall the engagement | Medium | Agree handling protocol in advance. Keep out of written materials. Identify the right internal recipient. |
| 8 | Project-director-level resistance to a transparency tool | Medium | Design outputs so the PD is the primary beneficiary — "here's the historical intelligence you never had at decision time," not "here's how we'll monitor you." |
| 9 | "Agent" terminology continues to misframe the work | Low-Medium | Terminology discipline in all materials. |
| 10 | Both transcripts truncated at ~30 min; agreements may exist that we don't have | Low-Medium | Cross-check these notes against another attendee's record and against SBG's own minutes before acting. |

## 9. Open questions to close

**For SBG:**
1. Exact names of the two ongoing reference projects — and can King Fahd Stadium records be included?
2. Do historical exports contain zone / package / trade granularity, or only high-level rollups?
3. Is Oracle's supplier performance review / procurement functionality licensed and accessible today?
4. Can CPI-adjacent data be shared in any form? If not, what proxy is acceptable?
5. Who is the accountable decision-maker for scope sign-off? (Raja has declined to own it alone.)
6. Can we get a project director to walk us through a live self-execute vs subcontract decision?
7. When is the data availability session, and can sample exports come in advance?

**For our team:**
8. Which segment do we recommend for deep implementation, and can we defend it on data availability grounds?
9. Is the King Fahd Stadium retrospective technically feasible with the likely data? Highest-value option if yes.
10. Who owns the commoditisation counter-narrative?
11. What is our commercial position — is the ERP-requirements-de-risking angle a separate saleable workstream?

## 10. Next steps

| Action | Owner | Priority |
|---|---|---|
| Draft the scope proposal email — recommended focus, data requirements, success criteria in Raja's accepted terms, two-to-three options | SoftServe + Oracle + NVIDIA jointly | Critical path |
| Schedule the data availability session; request sample raw exports in advance | Bohdan | Critical path |
| Build the commoditisation / corporate-IP positioning narrative | TBD | High |
| Assess feasibility of the King Fahd Stadium retrospective as the anchor case | Technical team | High |
| Request a project director session to document the manual self-execute vs subcontract decision (Oracle's explicit ask) | Bohdan / Ahmed (Oracle) | High |
| Confirm Oracle procurement / supplier performance licensing status at SBG | Ahmed (Oracle) | High |
| Design the progress-measurement normalisation approach across manpower / cost / hybrid bases | Technical team | Medium-High |
| Purge "agent" from all SBG-facing materials | All | Medium |
| Cross-check these notes against other attendees' records (transcript truncation) | All | Medium |

## 11. Five things to remember if you read nothing else

1. **We left without agreed scope, and the ball is in our court** — Raja wants a written proposal by email before any decision.
2. **Mustafa gave us the mandate:** execution has very rarely come close to original assumptions, and he wants AI to find out why. Everything should trace back to that.
3. **King Fahd Stadium is the gift** — a known, documented, quantified failure (≈6 months lost, PD isolated ~9 months, PMO starved of granular feedback) offered to us voluntarily. Strongly consider making it the anchor case.
4. **The hard problem is normalisation, not modelling.** Client-mandated, mutually incompatible progress measurement bases across isolated systems. That's the defensible IP and the answer to "why not just use Copilot."
5. **Define success in Raja's terms, not on accuracy.** He has already told us accuracy is unachievable and pre-located the blame in scope selection. Concept validation, data readiness, target-state design — all achievable, all already accepted.
