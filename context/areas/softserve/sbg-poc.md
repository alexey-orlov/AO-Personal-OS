# SBG — Project Planning AI PoC (AIQ · Oracle × NVIDIA × SoftServe)

_status: active, pre-contract — scope NOT agreed. The client asked for a written scope proposal by email; that document is the critical path and it sits on our side. Alex joins Dmytro Dundych 2026-08-24 to close the use case; SoW targeted to Oracle in the week of 2026-08-24_
_updated: 2026-08-20_

## Snapshot

- **The deal:** SBG "AI-Powered Document Intelligence" (AIQ), **~€171k / 12 weeks**, Oracle owner **Gero Gunkel**, past mini-SOW + MDF. The live SBG deal and "one of the largest after DHL". A second SBG deal — **Workforce Planning & Scheduling (cuOpt, ~€120k / 10 wks)** — runs in parallel and is out of this page's scope. [pipeline](oracle-pipeline.md)
- **Funded as an Oracle/NVIDIA experiment, not a production solution** — an expectation deliberately set with the client. Useful cover, but delivery quality still counts. [SteerCo 2026-08-18](calls/oracle/2026-08-18_124942_default_202608181205216609E8E0.md)
- **Where it stands:** scoping workshop #2 (2026-08-17) did not converge. It surfaced a three-way disagreement inside SBG on scope shape, an unresolved data-access question, and a "why do we need you when I can build agents myself" challenge that was talked past rather than closed. [debrief](docs/2026-08-17_sbg-poc-workshop-debrief.md)
- **Two scope drafts now exist and they are not the same shape** — see [Scope options](#scope-options--the-open-decision). Reconciling them is the first job of the proposal.
- **Sold as a recommendation workflow, not agents.** The client explicitly pushed back on "agent" language; purge the word from all SBG-facing material. Use workflow / recommendation engine / decision support. [debrief §5.4](docs/2026-08-17_sbg-poc-workshop-debrief.md)

## The client and how they work today

- **SBG = Saudi Binladin Group** — Saudi construction contractor running large fast-track projects (King Fahd Stadium; a "Seven"-related project). Revenue model is project-based contracting: win a tender → break the job into work packages → decide self-perform vs subcontract per package → execute and measure. [pipeline](oracle-pipeline.md)
- **Operating model in transition (~2 years in):** from project-siloed control — each project an "island" where the project director was the only person with real knowledge of state — to a **strong matrix** with corporate control (PMO, cost control) embedded from day zero and the project-sponsor role moved into corporate control. Dr. Ramadan's framing: "penetrating the island". This transition is the political engine behind the PoC.
- **Planning:** corporate produces the project hypothesis (timeline, milestones, phasing, packaging strategy, vendor selection criteria, metrics). At tender, either the client imposes a timeframe and SBG judges its achievability, or SBG builds and negotiates one. Baseline schedule carries the progress-measurement tool from day one so earned value computes from the start.
- **Execution:** SBG cannot dictate control methodology — the client's supervision team, PMC and site PMO all hold legitimate views. **Progress measurement therefore varies by client contract** (manpower / cost / hybrid). SBG's only non-negotiable is that EVM runs on site regardless, derived as planned vs actual executed quantities × BQ price.
- **KPIs:** SPI (easy, straight from schedule) and CPI (**politically restricted** — touches fines and actual expenses, "not common to present"). Plus *efficiency*: quantities → manpower via productivity rates, planned vs actual. **Granularity today is project-by-project, not work-package-by-work-package** — package-level is technically derivable from an activity-ID-level baseline, but is not currently produced.
- **Systems:** distributed and isolated. Project control in one system, finance elsewhere, no integration. A unified ERP with Primavera integration and finance on Unifier is in flight, **due end-2027** — which Raja treats as the point when data becomes reliable enough for real decisions.
- **Access:** the rights already exist (DOA-governed; PMO sees schedule + cost data across all projects). The gap is aggregation, normalisation and proactive surfacing — nothing is collected or pushed automatically, a project director has to go looking. **State the value proposition in exactly these terms: we are activating rights SBG already holds, not asking for new ones.**

## The problem, in the client's own words

- **The mandate, from the most senior person in the room (Eng. Mustafa):** execution "has very rarely come even close to the original assumptions... in the recent past, in all of them" — and he wants AI to dig into why. Every artefact should trace back to that sentence. [debrief §4.1](docs/2026-08-17_sbg-poc-workshop-debrief.md)
- **The missing feedback loop.** Corporate receives project feedback and reports up, but three failure modes are stacked: it isn't captured at sufficient granularity, what is captured is of doubtful reliability ("there are always side stories"), and whether it is acted upon went unanswered. Argues for grounding findings in quantities, schedules and transaction records — not narrative project reports.
- **Subcontractor selection — "a real trap."** Dr. Ramadan's clearest articulated pain: subcontractor failures recur across projects because lessons learned never reach the next project director at the decision point, and there is no categorised subcontractor database. His ask is a **compulsory check in the process stream before selection**. Refinement: it must cover **in-flight** performance too — a subcontractor at its capacity ceiling still bids for more, and the strain is already visible in the efficiency figures of its running jobs.
- **King Fahd Stadium — the reference failure, offered voluntarily.** Fast-track project; the project director was isolated in Riyadh ~9 months making decisions without HQ; ~6 months lost, then "very, very harsh" remedial measures. PMO reporting was too high-level — not by sector, zone, package or trade. Mustafa: "Records are there." A known, quantified, politically safe failure handed to us as a dataset.
- **Not pursued:** whether packaging decisions are sometimes relationship-based drew a flat **"No comment."** Keep this out of written materials; decide in advance how to handle it if the data surfaces it.

## Use cases on the table

| # | Flow | Status |
|---|---|---|
| A | **Project design** — gather PM/team inputs → pull available info on the new project → review comparable historical packages (subcontractor data a large separate input) → output a **templated target project-design document** the PM iterates on | **Agreed as the focus** by Dr. Ramadan, but "it needs to be experimented — you cannot say like that from now": directionally accepted, not confirmed |
| B | **Subcontractor / vendor selection support** — ranked recommendations from historical + in-flight performance | Demoted to an **input into A**, not a parallel flow: as displayed it sat *post-decision* (procurement / ARB stage), while SBG wants a proactive call at day one |
| C | **Self-perform vs subcontract decision support** | Blocked on ground truth — Oracle (Ahmed, SE) asked for a **simulation of how a project director decides this manually today**, without AI or apps, before anyone scopes automation |
| D | **KFSC retrospective — package-level variance/pattern/driver analysis** | The shape of Dmytro's current scope draft; see below |

Oracle's position on B: covered by its procurement / subcontractor-management domains, with supplier performance review across quality, performance and delivery for both ongoing and closed contracts, able to rank subcontractors by trend, discipline and region. **Whether SBG has that licensed and accessible was asked and never answered** — the answer decides build vs configure.

## Scope options — the open decision

Eng. Mustafa named this as the fundamental unresolved question and flagged it for the next session ("I don't know the answer. But we need to think about this").

| Option | Shape | Pro | Con |
|---|---|---|---|
| **1 — end-to-end, imperfect data** | Run the whole flow, accept poor/distorted inputs | Tests the real thing; improves by iteration | High risk of no demonstrable result |
| **2 — truncated segment, good data** | Only the part of the workflow where representative data exists | Defensible on data grounds; likeliest to produce something | Mustafa's binding constraint: "It should not be very small... limit it further and you may not capture the story" |
| **3 — Bohdan's hybrid** (recommended) | Implement one segment properly **+** separately design the target end-to-end workflow without building it | Gives both the implementation win and the artefact needed for the future investment decision | Splits a fixed budget across build and design |
| **Mustafa's own compromise** | Keep the **full scheduling workflow in scope**, drop the hard elements from AI and put a **human in the loop** for them | Breadth of workflow, selective depth of automation — satisfies Mustafa on story, Raja on risk, Ramadan on process integration | Needs explicit human-in-the-loop markers or it reads as an unfinished product |

**The discrepancy to resolve first.** [Dmytro's current scope draft](docs/2026-08-20_sbg-poc-scope-draft-dundych.md) is Option 2 in pure form and **narrower than what the workshop landed on**: it anchors on KFSC retrospectively, and explicitly puts *out of scope* new-project packaging recommendations, work-package design, self-perform-vs-subcontract, subcontractor selection, and analysis of new-project inputs against historical ones — i.e. all of Flow A, the flow Dr. Ramadan agreed was the focus. It also omits the "design the target workflow" half of Bohdan's hybrid. Its analytical flow is Data → quality/completeness assessment → normalize & map (to Work Package/WBS) → detect variances → identify patterns & drivers → link evidence → validate, with **"we could not reliably generate this insight" counted as a valid finding**, and success measured as **variance accuracy · driver confirmation rate · evidence coverage** ("can we detect it? → explain it? → prove it?"). That success framing is well-aligned with Raja; the scope breadth is not yet aligned with Mustafa.

## What the client expects from us

- **Raja's explicit ask: a written scope proposal by email from Oracle and NVIDIA, with the data requirements spelled out**, for SBG to review and respond to. No decision will be taken live in a meeting — he has declined to own scope sign-off alone and wants it written down and collectively owned. This is the whole deliverable.
- **Give him two or three explicitly costed options, not one recommendation** — that matches how he has said the decision must be made, and it converts our lack of an agreed scope into a structured choice for them.
- **Define success in Raja's terms, not on accuracy.** He has repeated, emphatically: this is a concept test, 100% efficiency is not expected, the output may be inaccurate and will not be used as the basis for a new package, data may mislead. His feared failure mode is stated: "If the data is not there, the PoC will fail... because we didn't choose the right project or the right area where the data is available." He has pre-located the blame in scope/data selection — so success must be written as **concept validation · data-readiness assessment · target-state design**, all of which he has already accepted. If accuracy becomes the yardstick we lose against a bar he himself calls unachievable.
- **Answer the commoditisation challenge implicitly in the document.** An SBG participant asked why this partnership is needed when their team already builds Copilot agents that add real value. Model access *is* commoditised; the answer is not capability claims but: (1) **the moat is data normalisation, not the model** — reconciling client-mandated, mutually incompatible progress-measurement bases across Primavera, Oracle and isolated systems, which SBG has already told us is unsolved; (2) **corporate IP with governance** — compulsory process gates, DOA-compliant access, auditability, survives the individual leaving; (3) **it de-risks the end-2027 ERP investment** by defining the target data model now instead of discovering the gap after the money is spent; (4) **acknowledge the ad-hoc agents rather than dismissing them** and position our layer as the one they cannot reach — cross-project, cross-system, governed, historical.
- **Design the outputs so the project director is a beneficiary, not a subject.** "Here's the historical intelligence you never had at decision time," never "here's how we'll monitor you" — otherwise expect passive resistance at project level.

## Data — agreed and unresolved

- **Agreed:** no live Primavera/Oracle integration (no contract, concept test only); **raw exports exactly as they come out of the source systems**; **no manipulation by any means**. Sources: Primavera (schedule), Oracle (cost, subcontractor). Rationale worth preserving — designing against manipulated working files builds the workflow for data shapes that won't exist at live integration, so raw exports keep the PoC forward-compatible with the 2027 ERP.
- **Reference projects:** two ongoing ones — apparently a "Seven"-related project and a stadium project. Exact names unconfirmed, as is whether KFSC is among them.
- **Blocking:** the client sent a data file before the workshop that **SoftServe still cannot access** — feasibility can't be judged without it. [SteerCo 2026-08-18](calls/oracle/2026-08-18_124942_default_202608181205216609E8E0.md)
- **The load-bearing unknown:** does the historical export carry **zone / package / trade granularity, or only high-level rollups?** This decides whether the KFSC retrospective is possible at all. Note the stated problem was that *reporting* wasn't at that granularity — the underlying records may exist but were never rolled up that way. Verify before committing to the anchor case.
- Also open: whether CPI-adjacent data (fines, actual expenses) can be shared in any form, and what proxy is acceptable if not.

## People

- **Eng. Mustafa** (SBG) — most senior voice present, the strategic sponsor. Blunt; overrode diplomatic answers, gave up the King Fahd Stadium case unprompted. **Design the PoC to satisfy him.**
- **Dr. Ramadan** (SBG) — corporate control / PMO methodology owner. Deep EVM discipline, owns and defends the target operating model, wants the PoC to validate his transparency agenda. Thorough on process, deflects politics.
- **Raja** (SBG) — initiative coordinator / facilitator. Risk-managing, resets expectations downward, wants the scope decision written and collectively owned. Not the sign-off authority — that person is unidentified.
- **Ahmed** (SBG, data/systems) — argued for live integration over exports; overruled on integration, won the raw-data concession.
- **Ahmed** (Oracle, solution engineering) — mapped subcontractor performance onto Oracle procurement / supplier performance review; owns confirming SBG's licensing of it.
- **Milo · Waldemar** — vendor side (Oracle/NVIDIA/SoftServe coalition; exact affiliation unconfirmed in the debrief — Milo is likely **Milo Honegger**, Oracle AIDP sales/partner lead → [oracle-team](oracle-team.md)). Milo asked the sharpest structural question (the missing feedback loop) and raised relationship-based packaging; Waldemar pressed on per-project vs per-package granularity.
- **Bohdan Khomych** (SoftServe) — scope framing, the hybrid proposal, requested the data-availability session → [people page](../../people/bohdan-khomych.md).
- **Dmytro Dundych** (SoftServe, PdM) — owns the PoC scope draft; Alex joins him 2026-08-24 to close the use case.

## Decisions

- 2026-08-17 — **Project design (Flow A) is the focus, not performance review**; subcontractor intelligence becomes an input into it rather than a parallel flow. [debrief §5.1](docs/2026-08-17_sbg-poc-workshop-debrief.md)
- 2026-08-17 — **No live system integration for the PoC. Raw exports only, no manipulation.** [debrief §6](docs/2026-08-17_sbg-poc-workshop-debrief.md)
- 2026-08-17 — **"Agent" language dropped** for SBG-facing material; the PoC is a recommendation workflow with human decision-making retained. [debrief §5.4](docs/2026-08-17_sbg-poc-workshop-debrief.md)
- 2026-08-17 — **No scope agreed in the workshop**; SBG will respond to a written proposal instead of deciding live. [debrief §1](docs/2026-08-17_sbg-poc-workshop-debrief.md)

## Open loops

**Mine**
- **Join Dmytro Dundych Monday 2026-08-24 to shape and finalize the use case** (the regular owner is away), and reconcile his retrospective-only scope draft against the workshop's Flow-A focus + Mustafa's breadth constraint. A **one-pager describing the use case** (draftable from the workshop transcript) is owed before the next SBG meeting. [SteerCo 2026-08-18](calls/oracle/2026-08-18_124942_default_202608181205216609E8E0.md)
- Land the **written scope proposal** — recommended focus, spelled-out data requirements, success criteria in Raja's accepted terms, **2–3 costed options**. Joint SoftServe + Oracle + NVIDIA. Critical path.
- Decide **which segment we recommend for deep implementation** and whether it is defensible on data-availability grounds; assess whether the **KFSC retrospective is technically feasible** with the likely data.
- Settle our **commercial position**: is ERP-requirements de-risking a separate saleable workstream? Owner for the commoditisation counter-narrative is still **TBD**.

**Theirs**
- **SBG — grant access to the data file already sent**, and confirm the **data-availability session** (Bohdan requested it; sample raw exports wanted in advance). Unscheduled.
- **SBG — name the accountable decision-maker for scope sign-off**; confirm the two reference projects and whether KFSC records can be included; confirm zone/package/trade granularity in the exports; rule on CPI-adjacent data.
- **SBG — provide a project director** to walk through a live self-perform vs subcontract decision (Oracle's explicit ask).
- **Ahmed (Oracle)** — confirm whether SBG has Oracle procurement / supplier performance review licensed and accessible.
- **SoW to Oracle** targeted in the week of 2026-08-24; wrap-up within ~2 weeks. [SteerCo 2026-08-18](calls/oracle/2026-08-18_124942_default_202608181205216609E8E0.md)

## Risks

- **Scope never formally agreed** — no decision mechanism beyond "send us an email". → Get the document out fast with costed options; let SBG choose.
- **Data granularity insufficient** at zone/package/trade level. → Make the data-readiness assessment a **named deliverable in its own right**, so it produces value even when the news is bad (Dmytro's draft already does this: an unreachable insight counts as a valid finding).
- **Commoditisation objection resurfaces at budget stage**, possibly from someone controlling the money. → Rehearse the normalisation / corporate-IP / ERP-de-risking narrative now.
- **Too narrow → "doesn't capture the story"** (Mustafa unconvinced) vs **too broad → nothing demonstrable**. → Full workflow breadth, selective automation depth, plus design-not-build for the rest.
- **Everything defers to the end-2027 ERP.** → Reframe the PoC as ERP requirements de-risking, not as something the ERP replaces.
- **Politically loaded findings** (relationship-based awards, CPI) surface and stall the engagement. → Agree a handling protocol and the right internal recipient in advance; keep out of written materials.
- **Project-director-level resistance** to what reads as a transparency tool. → Make the PD the beneficiary of the output.
- **Source record is partial** — both workshop transcripts were truncated at ~30 minutes, so agreements may exist that we don't have. → Cross-check against another attendee's record and SBG's own minutes before acting.

## Activity

- 2026-08-20 — [scope draft (Dundych)](docs/2026-08-20_sbg-poc-scope-draft-dundych.md) — PoC objective, in/out of scope, analytical flow and three success measures written up; KFSC adopted as the retrospective anchor; scope is narrower than the workshop's Flow-A focus.
- 2026-08-17 — [workshop debrief (Khomych)](docs/2026-08-17_sbg-poc-workshop-debrief.md) — scoping workshop #2: as-is PMO model walked through, "plans never survive execution" admission from Mustafa, King Fahd Stadium offered as an anchor case, scope did not converge, written proposal requested.
- 2026-08-18 — [SteerCo](calls/oracle/2026-08-18_124942_default_202608181205216609E8E0.md) — SBG confirmed as the live SBG deal; SoW to Oracle targeted for the week of Aug 24; Alex assigned to close the use case with Dmytro on Aug 24.
