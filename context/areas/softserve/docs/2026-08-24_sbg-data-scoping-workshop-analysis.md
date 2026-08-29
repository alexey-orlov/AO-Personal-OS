# SBG Project Planning AI — Data Scoping Workshop
## Detailed analysis, findings and action items

**Session:** Data availability and scope confirmation
**Date:** Monday 24 August 2026
**Duration:** ~2 hours
**Target kickoff:** 1 September 2026

**SBG:** Raja (sponsor, departed after ~45 min for a board meeting), Islam (session lead — technical and business background), Dr. Ramadan Abdeltawab Mohammad Azoz (planning and scheduling), cost controls engineer (presented the cost reporting stack — believed to be Eslam Esmail Ebied), Ahmed (IT).

**SoftServe / partners:** Bohdan Khomych (product), Volodymyr Chornyy (delivery), Karsten Tramborg (Oracle and NVIDIA relationships).

> *Note on names: the transcript garbles several proper nouns and conflates "Islam" and "Eslam." Where attribution is uncertain below, the role is given rather than the name. Confirm against the meeting transcript Raja was asked to produce before circulating externally.*

---

## 1. Executive summary

The session achieved its objective — the data was shown, not described — but it invalidated the central premise of our going-in position and replaced it with a better one.

**The retrospective anchor case is gone.** King Fahd Stadium Complex, and completed projects generally, cannot be used. SBG went through roughly a decade of difficulty, restarted about five years ago, and lost the institutional and system continuity that would make older project data retrievable. Dr. Ramadan added a second, independent objection: in mega-projects, a completed stage of one project is not comparable as historical data to the current stage of another.

**What replaced it is stronger.** The unit of retrospective analysis moves from the *project* to the *work package*. Both selected projects are ongoing, but individual packages within them are complete and their outcomes are known. This is a better fit for the use case than the original framing, and it is the client who confirmed it is viable.

**Time-series data is confirmed and this is the single most important outcome.** Monthly cost reports retained per month since project start. Two years of P6 updates in XER. Weekly and monthly progress reporting with historical trend extraction. The early-warning proposition is measurable.

**The client independently articulated our core thesis.** Package definitions are not consistent between contracts, they link by name only with no identifier, and the same scope item sits inside different packages on different projects. The cost engineer explained this at length, unprompted, including the commercial consequence: scope gaps between packages that no subcontractor accepts, discovered late and paid for by SBG. That is the normalisation layer, described by the customer in their own operational terms.

**The client also proposed a metric we had not.** Forecast volatility as a proxy for estimate reliability — a package whose forecast moves every month is poorly understood; one whose forecast holds steady is well estimated and well managed. That is a ready-made, data-available indicator and it came from them.

**The principal risk is now access, not data.** The shared folder failed, guest-account provisioning inside SBG's tenant is estimated at around two weeks, and cost data release still needs a director's final sign-off. Against a 1 September kickoff, that is the critical path.

---

## 2. Decisions taken in the session

| # | Decision | Detail |
|---|---|---|
| 1 | **Completed projects are out of scope** | Data from projects completed before the restart is not retrievable. Not contested. |
| 2 | **The two ongoing projects are confirmed** | SEVEN / "Town" (Dammam and Khobar) and the Stadium. No substitution. |
| 3 | **The analysis unit is the completed work package**, not the completed project | Retrospective evidence comes from packages already finished inside live projects |
| 4 | **Export format is XER**, with P6 XML acceptable | Excel explicitly rejected by both sides — activity codes and logic would be lost |
| 5 | **Exports must include history, not the latest snapshot** | Confirmed available across cost reports, P6 updates and progress trends |
| 6 | **Quality and Safety require a separate session** | Both departments to be brought in; not a blocker for the core use case |
| 7 | **Kickoff target 1 September**, possible slip of a few days | Oracle-side paperwork pending |
| 8 | **Delivery approach communicated and accepted** | NVIDIA AIQ framework, Nemotron 3 Super under evaluation, custom lightweight UI, workflow-driven rather than chat |

---

## 3. What changed against our going-in position

This is the section to read before revising the deck.

| Our position entering the session | Position after the session | Consequence |
|---|---|---|
| KFSC as retrospective anchor, outcome already known | Not available. Pre-restart data unreachable | **The deck's slide 3 business case and slide 5 recommendation both need rewriting** |
| Retrospective at project level | Retrospective at package level within live projects | Better fit; the use case name was always "package performance insights" |
| "Both reference projects are live" treated as a complication | Now the central design constraint | Snapshot and cut-off mechanics move from footnote to core |
| Cost proxy needed because actual cost is confidential | Cost data offered directly, with percentage masking available as fallback | Confidentiality risk lower than assumed |
| Package-to-schedule join was the open question | Still open, and now precisely defined | Hinges on whether P6 activity codes carry package or subcontractor |
| Early-warning lead time measured against a known failure | No known failure available to measure against | **KPI needs restating** — see section 8 |
| Contract PDF parsing was a phase 2 concern | Client positions subcontract BOQ as essential to package definition | May need to enter the PoC after all — see section 6.3 |

---

## 4. Confirmed data inventory

### 4.1 Schedule — Primavera P6

| Item | Status | Notes |
|---|---|---|
| XER export, all updates | **Confirmed available** | ~2 years of updates on SEVEN/Town |
| WBS hierarchy | **Confirmed** | Entertainment Complex → Facility → Base Build → phases → zones |
| Activity codes | **Partially confirmed** | Area, Zone, Building, Phase, Level, Crew, Movement all exist |
| Package / subcontractor code on activity | **UNCONFIRMED — critical** | Dr. Ramadan: sometimes assigned, sometimes not; to check with the planning department sponsor |
| Baseline plus revised plan | **Confirmed** | Both master plan and revised ("reset") plan available |
| Historical updates by date | **Confirmed** | Monthly, since project start |
| Earned value, duration, cost fields | **Confirmed extractable** | Configurable field export demonstrated live |

### 4.2 Cost — package-level reporting

| Item | Status | Notes |
|---|---|---|
| Package cost report | **Confirmed** | Budget, forecast, delta, AFA, awarded/committed, per package |
| Monthly retention | **Confirmed** | One folder per month, back to project start |
| Breakdown by asset | **Confirmed** | Four assets: EC Dammam, EC Khobar, Hotel Dammam, Water Park Dammam |
| Actuals per unit | **Confirmed** | "actual cost is here already… each one you have actual with each unit" |
| Provisional sums identified separately | **Confirmed** | Distinct block in the report |
| Release approval | **Pending** | Preliminary approval given; director's final sign-off required |
| Percentage masking if needed | **Offered by client** | Useful fallback |

### 4.3 Progress and performance reporting

| Item | Status | Notes |
|---|---|---|
| Weekly and monthly progress reports | **Confirmed** | Both cadences exist |
| Zone-level progress | **Confirmed** | With historical trend extraction |
| Manpower as primary measurement basis | **Confirmed for this project** | Plan, forecast and actual manpower |
| MED executive dashboard | **Confirmed** | Includes quality and safety KPI blocks |
| Phase breakdown | **Confirmed** | Engineering → Procurement → Construction → Testing & Commissioning, with defined overlaps |
| Self-perform vs subcontractor split | **Not currently reported separately** | Dr. Ramadan to ask the project sponsor whether it can be produced |

### 4.4 Subcontracts and commitments

| Item | Status | Notes |
|---|---|---|
| Subcontract agreements | **Confirmed** | Scanned PDF; mostly on SBG template |
| BOQ per package | **Confirmed, for subcontracted packages only** | Defines the activities constituting a package |
| Responsibility / scope matrix | **Confirmed** | Defines SBG vs subcontractor obligations item by item |
| Amendments | **Confirmed** | Change requests, de-scoping, added scope |
| Commitment log | **Confirmed** | ~200 entries, likely ~150 distinct subcontractors after amendments; ~50 main subcontractors |
| Root cause of cost change | **NOT RECORDED** | See 6.4 |

### 4.5 Quality and safety

| Item | Status | Notes |
|---|---|---|
| Quality KPIs at summary level | **Confirmed in MED** | Inspection reports, internal and external NCR, quality planning |
| Safety KPIs at summary level | **Confirmed in MED** | TRI, LTI, external NCR, internal audit, training |
| Detail by subcontractor | **Believed available** | Held by QA/QC and Safety departments |
| Detail by package | **Probably not** | Quality and safety appear to be tracked by subcontractor, not by package |
| SBG's own four-dimension evaluation | **Confirmed** | Cost, Time, Quality, Safety used in subcontractor performance evaluation |

---

## 5. The most valuable single finding

The cost engineer, explaining the monthly cost report:

> A package whose forecast changes every month is one where the trust level is low. A package whose forecast stays roughly the same month after month is one that was estimated correctly and is being managed well.

**Forecast volatility as a proxy for estimate reliability and management quality.**

This matters for three reasons.

It is **immediately computable** from data confirmed available today — monthly cost reports, retained since project start, at package level. No new collection, no integration, no dependency on the P6 join.

It **survives the loss of the anchor case.** We no longer have a known failure to measure early warning against, but volatility does not need one — it measures the stability of the estimate itself, and it can be validated against packages that have since closed out.

It **came from the client**, which makes it very hard to argue with, and it gives us a metric SBG already believes in rather than one we have to sell.

**Recommendation: make this the primary quantitative output of the PoC.** A package-level reliability index derived from forecast movement over time, validated against closed packages, with the drivers of volatility attributed where the data allows.

---

## 6. The hard problems, in order of difficulty

### 6.1 Package definitions are not stable — the core technical challenge

The cost engineer's explanation was the most substantive content of the session and it validates the normalisation thesis entirely.

- The same package name covers different scope on different contracts — "ten activities per package in this contract and eight in this contract"
- Surplus soil disposal sits inside the piling package on some projects and inside the environmental care package on others
- Piling is not one thing: bored piles, driven piles, stone piles. SBG can self-perform bored piles and cannot do stone piles at all
- Scaffolding is provided by SBG, therefore excluded from subcontractor packages, therefore invisible in the subcontract BOQ while existing as a separate package
- Vertical lifting is normally an SBG package, but for heavy steel it transfers to the subcontractor
- **Linking is by name only. There is no identifier.** Confirmed explicitly: *"it's just the name."*
- Human inconsistency is present and acknowledged — the same scope allocated to SBG on one subcontract and to the subcontractor on another, when the intended practice is uniformity

**The commercial consequence, in their words:** gaps open between packages, the scope is omitted from every subcontract, and SBG discovers late that nobody will do the work.

The client raised the hallucination risk themselves and accepted that human validation in the loop will be needed. That is an unusually good starting position — we did not have to argue for it.

**Implication for scope:** name-based matching across ~34 packages, ~150 subcontracts and thousands of BOQ lines, with SME adjudication. Plan for it explicitly. This is the largest single effort line in the PoC.

### 6.2 The cost-to-schedule join remains unresolved

Cost is organised by trade and package. Schedule is organised by facility, zone, building and phase. These are orthogonal.

Activity codes for Area, Zone, Building, Phase, Level, Crew and Movement are confirmed. **Whether a package or subcontractor code exists on activities is not.** Dr. Ramadan will check with the planning department sponsor.

**This is the highest-value open question from the session.** If the code exists, the join is direct and the PoC is substantially derisked. If it does not, the join must be constructed through the BOQ and package names — which is section 6.1's problem, at greater scale.

There is a second structural nuance that will bite if missed: **substructure is reported by zone, superstructure is reported by building.** A zone may span one building, two buildings, or two and a half. A zoning layout, a building layout and a combined layout all exist. The combined layout is required to reconcile the two, and should be requested by name.

### 6.3 Contract parsing may need to enter the PoC after all

Our position before this session was to keep subcontract PDF extraction out of scope. The client's position is that **package definition is not knowable without the BOQ and the responsibility matrix** — the name alone is misleading, and they said so repeatedly.

The documents are scanned PDFs with handwritten amendments, strikethroughs and checkbox matrices. This is real extraction difficulty, not incidental.

**Recommended compromise:** parse a bounded set — the BOQ and responsibility matrix for the packages selected for analysis, not the full contract corpus. Treat it as a scoped input to package definition rather than as a general document-intelligence capability. Confirm the count of packages in scope before committing.

### 6.4 Root cause of variance is not recorded anywhere

Confirmed directly. The cost report captures the position at award and at final account. The decisions in between — taken by the project director or project controls — are not recorded.

**This is the feedback loop gap, now confirmed from the cost side as well as the planning side.** It is also the strongest possible evidence for the target-state argument, because the client has now told us twice, independently, that the mechanism is invisible.

Root cause must therefore be **inferred** from correlation across cost movement, schedule movement, amendments, provisional-sum conversion and subcontractor identity — not read from a field. Set expectations accordingly. Findings will be *candidate* drivers requiring SME confirmation, and the evidence-coverage criterion becomes the mechanism for that.

### 6.5 Provisional sums will distort every naive analysis

Provisional sums are high-level estimates made when drawings are insufficient or time is short, with an accuracy the client puts at **40 to 60 percent**. Large subsequent movement is structural, not a performance failure.

On SEVEN/Town, provisional sums are approximately SAR 1.27bn against a SAR 5.97bn contract — roughly **21 percent of contract value**. Marine works, aquarium quarantine and the hotel were all provisional.

**Any variance analysis that does not segregate provisional-sum packages will produce findings that are simply wrong**, and will be dismissed on sight by anyone in project controls. Segregation must be built into the model from day one, and provisional-sum conversion accuracy is itself a worthwhile secondary analysis.

### 6.6 Reporting formats are not standardised between projects

Confirmed: *"the reporting format is not standardised… different reporting sheet… but the same concept."*

The templates are consistent within the project controls department's own outputs, but the two selected projects use different formats. Normalisation is therefore required between the two PoC projects, not only across historical data. Budget for it.

---

## 7. Risks

| # | Risk | Severity | Notes and mitigation |
|---|---|---|---|
| 1 | **Data access not resolved by 1 September** | **High** | SoftServe shared folder failed. Guest accounts in SBG's tenant estimated at ~2 weeks. Escalate to Raja and Ahmed immediately; propose SBG-hosted folder with two named external accounts as the fastest path |
| 2 | **Cost data release blocked** | **Medium-high** | Preliminary approval only. Director's sign-off outstanding. Percentage masking already offered as fallback — invoke it early rather than waiting |
| 3 | **No package code in P6** | **Medium-high** | Would move the join onto name matching at scale. Answer expected from the planning sponsor. Have a contingency plan before kickoff |
| 4 | **Insufficient completed packages** | **Medium** | See section 9, open question 1 — completion percentages need clarifying urgently |
| 5 | **Provisional-sum distortion** | **Medium** | Mitigated by design; must be in the model from the start |
| 6 | **Stadium data not prepared** | **Medium** | Everything demonstrated was SEVEN/Town. Subcontractor data for the Stadium was explicitly not ready |
| 7 | **Sponsor disengagement** | **Medium** | Raja left after 45 minutes and did not hear the substantive data discussion. He is the decision-maker on access and on phase 2 |
| 8 | **Quality and safety not package-attributable** | **Low-medium** | Appears tracked by subcontractor only. Two of the four evaluation dimensions may not join to packages |
| 9 | **Scanned-PDF extraction accuracy** | **Medium** | Handwritten amendments and strikethroughs. Human validation loop already accepted by client |
| 10 | **Oracle-side paperwork delaying kickoff** | **Low** | Flagged as a few days |

---

## 8. Consequence for the success measures

The early-warning lead time metric as drafted assumed a known failure to measure against. That no longer exists. Proposed revision:

| Measure | Revised definition |
|---|---|
| **Forecast stability index** *(primary, operational)* | Package-level forecast volatility across retained monthly reports, segregated by provisional vs firm, validated against closed-out packages. Directly answers the client's own reliability question |
| **Decision relevance** *(business)* | Unchanged. Share of findings that project controls and the project director judge usable for a packaging or subcontracting decision |
| **Package definition coverage** *(technical)* | Share of packages for which scope can be reconstructed from BOQ and responsibility matrix and matched across contracts, with confidence stated. This replaces evidence coverage and measures the normalisation layer directly |

Early-warning lead time should be retained as a **secondary measure** applied to closed packages: for packages that overran, how early was the overrun visible in forecast movement? That preserves the original insight without depending on a project-level failure case.

---

## 9. Open questions

Ordered by impact on scope.

1. **Completion percentage of each project.** The MED showed SEVEN/Town at approximately 15–18 percent. A figure of around 70 percent was discussed but appears to relate to the Stadium. This determines how many completed packages exist and therefore whether the Stadium, not SEVEN/Town, should be the primary PoC project. **Resolve this first.**
2. **Do P6 activities carry a package or subcontractor code?** Planning department sponsor to confirm.
3. **How many packages are complete on each project, and how many of those are subcontracted with BOQ available?**
4. **Can self-perform and subcontractor progress be reported separately?** Dr. Ramadan to ask the project sponsor.
5. **Are quality and safety records attributable to packages, or only to subcontractors?**
6. **Which packages are provisional sums and which are firm** — is this flagged in the data or must it be inferred?
7. **Is the combined zoning-and-building layout available in a machine-readable form**, or only as a drawing?
8. **Amendment tracking** — is there a register of amendments, or must they be read from the contract documents?
9. **Data residency and IT policy** — can SBG data be processed outside SBG's tenant, and does that affect where the PoC environment sits?

---

## 10. Action items — SBG

| # | Action | Owner | Priority | Due |
|---|---|---|---|---|
| S1 | **Resolve external data access** — either provision guest accounts in SBG's tenant or agree an alternative secure transfer route. Two named SoftServe individuals | Raja / Ahmed (IT) | **Critical** | Before 1 Sept |
| S2 | **Confirm whether a Teams channel with external members is permitted** by SBG policy; establish it if so | Ahmed (IT) | High | This week |
| S3 | **Obtain director's final approval for cost data release**; confirm whether masking is required | Cost controls engineer | **Critical** | This week |
| S4 | **Confirm whether P6 activities carry a package or subcontractor code** | Dr. Ramadan → planning sponsor | **Critical** | This week |
| S5 | **Produce the content index** — list of every data artefact with a sample screenshot, its update cycle (one-time / weekly / monthly), and its coverage period | Dr. Ramadan | High | This week |
| S6 | **Export XER for both projects, all updates, from project start** — not the latest snapshot | Dr. Ramadan | High | This week |
| S7 | **Provide monthly cost reports for all retained months**, both projects | Cost controls engineer | High | This week |
| S8 | **Provide subcontract agreements with BOQ and responsibility matrix** for completed packages, plus amendments | Cost controls engineer | High | This week |
| S9 | **Provide the commitment / subcontractor log** | Cost controls engineer | Medium | This week |
| S10 | **Prepare the equivalent Stadium data package**, including subcontractor data not available today | Cost controls engineer / Dr. Ramadan | High | Before kickoff |
| S11 | **Ask the project sponsor whether self-perform and subcontractor progress can be split** | Dr. Ramadan | Medium | This week |
| S12 | **Nominate Quality and Safety department representatives** for a dedicated session | Islam | Medium | Early Sept |
| S13 | **Provide the combined zoning and building layout** | Dr. Ramadan | Medium | Before kickoff |
| S14 | **Circulate the meeting transcript** as agreed | Raja / organiser | Low | This week |

---

## 11. Action items — SoftServe

| # | Action | Owner | Priority | Due |
|---|---|---|---|---|
| V1 | **Send the summary and data request by email** to the SBG distribution as requested in the session | Bohdan | **Critical** | Today |
| V2 | **Escalate data access to Raja directly** — it is the critical path to a 1 Sept start and he left before it was discussed | Bohdan | **Critical** | Today |
| V3 | **Issue a precise field-level specification** for the P6 export, so Dr. Ramadan can configure it once. He asked for this explicitly | Delivery / data lead | **Critical** | This week |
| V4 | **Close the Oracle-side commercial paperwork** | Karsten / Bohdan | **Critical** | Before 1 Sept |
| V5 | **Revise the PoV deck** — anchor case, business case, recommendation and KPI slides all require rework per sections 3 and 8 | Bohdan | High | Before next session |
| V6 | **Prepare a reference UI walkthrough** — the client asked explicitly to see an example agent interface at the next meeting | Bohdan / delivery | High | Next session |
| V7 | **Design the provisional-sum segregation** into the analysis model before any variance work begins | Data lead | High | Week 1 |
| V8 | **Build the contingency plan for a missing package code** in P6 — name-matching approach, SME adjudication effort, revised timeline | Delivery lead | High | Before kickoff |
| V9 | **Scope the contract parsing decision** — bounded BOQ and responsibility matrix extraction for selected packages only, with an effort estimate | Delivery lead | High | Before kickoff |
| V10 | **Define the SME validation loop** — who from SBG, how often, what adjudication volume. The client has accepted it in principle; convert that into a commitment | Bohdan | High | Before kickoff |
| V11 | **Set up the Teams channel and shared folder** once SBG confirms policy | Delivery | Medium | This week |
| V12 | **Plan the Quality and Safety session** | Volodymyr | Medium | Early Sept |
| V13 | **Prepare the broader capability presentation** Karsten offered — digital twins, physical AI, Omniverse, robotics | Karsten | Low | Post-kickoff |
| V14 | **Clarify the SoftServe / Oracle / NVIDIA construct in writing** — Islam asked how the three relate. It suggests the commercial arrangement is not understood at working level | Bohdan / Karsten | Medium | This week |

---

## 12. Recommended scope adjustment

Based on the session, the PoC should be restated as follows.

**Analyse completed work packages within the two live projects**, using retained monthly cost reports and P6 updates, to produce a package-level reliability picture: which packages were estimated well, which drifted, how early the drift was visible, and which characteristics correlate with drift.

**Segregate provisional-sum packages from firm packages throughout.** They behave differently by design and mixing them invalidates the analysis.

**Build the package normalisation layer as the primary technical deliverable**, reconciling package names across contracts using BOQ and responsibility-matrix content, with an SME validation loop. This is the asset, and the client has already described in their own terms why it does not exist and what it costs them.

**Treat root cause as inferred, not recorded.** Findings are candidate drivers presented with evidence and confidence, for SME confirmation — not assertions.

**Keep quality and safety out of the first phase**, pending the departmental session and confirmation of package attributability.

**Decide the primary project on completion percentage**, not on data readiness. The Stadium may be the better anchor despite SEVEN/Town being the better-prepared demonstration today.

---

## 13. Milestones

| Date | Milestone |
|---|---|
| **This week** | Data access resolved · cost approval obtained · package-code question answered · content index and first exports delivered |
| **~1 September** | Engagement kickoff (few days' slip possible on Oracle paperwork) |
| **Early September** | Quality and Safety departmental session |
| **Week 1 of engagement** | Data assessment complete · model and technology decisions confirmed · scope finalised against actual data |

---

## Appendix — technology position communicated to the client

Stated in the session and accepted without objection:

- **NVIDIA AIQ / NeMo Agent Toolkit** as the agent orchestration framework
- **Nemotron 3 Super** as the primary reasoning model, with alternatives to be evaluated in week one
- **Separate models per task** — document parsing and reasoning handled distinctly
- **Oracle AI packs** as a reference foundation
- **Custom lightweight UI**, not a chat interface — workflow-driven: upload, select, run, review insights
- **Designed for scale from the outset** — the PoC workflow should remain valid once connected to live data, rather than being rebuilt for production

The client asked whether execution would be on demand or triggered by new data arriving in the shared folder. Worth answering deliberately: designing for automated triggering, while running manually during the PoC, is consistent with the scale-by-design position already stated.
