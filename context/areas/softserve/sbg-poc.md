# SBG — Project Planning AI PoC (AIQ · Oracle × NVIDIA × SoftServe)

_status: active, pre-contract — scope NOT agreed. SBG asked for a written scope proposal by email; that document is the critical path and it sits on our side. **Alex is in as of 2026-08-20** and owes Dmytro a staged plan with go/no-go gates by EOD; Dmytro owns the proposal (asked by Volodymyr Chornyy). SoW targeted to Oracle in the week of 2026-08-24. **Biggest unresolved risk is sample size, not scope** — answer expected the week of 2026-08-24_
_updated: 2026-08-20_
_sources: the 2026-08-17 workshop **recordings are source of truth** — [part 1](docs/2026-08-17_sbg-workshop-transcript-1of2.md) · [part 2](docs/2026-08-17_sbg-workshop-transcript-2of2.md). Bohdan's [debrief](docs/2026-08-17_sbg-poc-workshop-debrief.md) and Dmytro's [scope draft](docs/2026-08-20_sbg-poc-scope-draft-dundych.md) are interpretations; where they disagree with the recording, the recording wins — see [divergences](#where-the-notes-diverge-from-the-recording). Both transcripts are truncated at ~30 min (TurboScribe free tier) and carry no speaker labels, so attributions below are inferred from context. Alex's 2026-08-20 shaping call with Dmytro adds the target end state, the three-stage roadmap and the sample-size risk → [Dmytro 1:1 2026-08-20](calls/sbg-poc/2026-08-20_one-on-one_dmytro-sbg-poc-shaping.md)._

## Snapshot

- **The deal:** SBG "AI-Powered Document Intelligence" (AIQ), **~€171k / 12 weeks**, Oracle owner **Gero Gunkel**, past mini-SOW + MDF, NDA still unclosed. The live SBG deal and "one of the largest after DHL". A second SBG deal — **Workforce Planning & Scheduling (cuOpt, ~€120k / 10 wks)** — runs in parallel and is out of this page's scope. [pipeline](oracle-pipeline.md)
- **The target end state, per Dmytro (2026-08-20):** an assistant that, from **historical evidence + current inputs on a new project**, lets SBG (a) **package work into work packages** and (b) **choose the execution model per package** — self-perform vs subcontract, and which subcontractor. Both decisions evidence-backed. "Design documentation *is* these work packages." [Dmytro 1:1 2026-08-20](calls/sbg-poc/2026-08-20_one-on-one_dmytro-sbg-poc-shaping.md)
- **The PoC is deliberately stage 1 of three** — mechanics on one project → scale to N projects → recommendations. Dmytro: "**I'm not proposing to recommend anything now. I'm proposing to build the mechanics by which we later recommend.**" This is the sequencing that was missing from the written draft, not a scope cut.
- **Funded as an Oracle/NVIDIA experiment, not a production solution** — an expectation deliberately set with the client. Useful cover, but delivery quality still counts. [SteerCo 2026-08-18](calls/oracle/2026-08-18_124942_default_202608181205216609E8E0.md)
- **Where it stands:** scoping workshop #2 (2026-08-17) did not converge on scope. SBG declined to decide live and asked for a written proposal instead.
- **Two scope drafts exist and they are not the same shape** — see [Scope shape](#scope-shape--where-it-landed). Reconciling them is the first job of the proposal.
- **Sold as a recommendation workflow, not agents.** SBG explicitly pushed back on "agent" language; our side confirmed the target is "the previous state, where the workflow provides recommendations. We can call it a workflow." Purge "agent" from all SBG-facing material.
- **No AI platform or pack was named in the room at any point** — see [Platform](#platform--pack--never-actually-named).

## The client and how they work today

- **SBG = Saudi Binladin Group** — Saudi construction contractor running large fast-track projects. Revenue is project-based contracting: win a tender → break the job into work packages → decide self-perform vs subcontract per package → execute and measure.
- **Operating model in transition (~2 years in):** from project-siloed control — each project an "island" where the project director was the only one who really knew its state, and it was "very hard to penetrate this privacy" — to a **strong matrix** with corporate control embedded from day zero and the project-sponsor role moved into the corporate control department. Stated aim: transparency, clearer progress status, consistent reporting. This transition is the political engine behind the PoC.
- **Planning:** corporate produces the project hypothesis (timeline, milestones, phasing, packaging strategy, vendor criteria, metrics). At tender, either the client imposes a timeframe and SBG judges whether it is "logic or not", or SBG builds the achievable one and puts it on the table. Ramadan positions this judgement as a core SBG strength. Baseline schedule carries the progress-measurement tool from day one so earned value computes from the start.
- **Execution:** SBG "cannot dictate the projects about the control 100% methodology" — the client, its supervision team, PMC and site PMO all hold legitimate views. **Progress measurement therefore varies by client contract** (manpower / cost / hybrid / something else). SBG's only non-negotiable is that its own EVM runs on site regardless, derived as planned vs actual executed quantities × BQ price.
- **KPIs:** SPI (straight from schedule) and CPI (**politically restricted** — touches fines and actual expenses, "not common to present"). Plus *efficiency*: quantities → manpower via productivity rates, planned vs actual. **Granularity today is project-by-project, not package-by-package** — package level is derivable from an activity-ID-level baseline ("you can take any fragment as you like"), but is not currently produced.
- **Systems:** distributed and isolated. Project control in one system, finance elsewhere, no integration. A unified ERP with Primavera integration and finance on Unifier is in flight, **due end-2027** — which Raja treats as the point when data becomes reliable enough for real decisions.
- **Access:** the rights already exist — all projects sit in the SBG domain and follow the DOA; central head-office departments see all data related to their function across all projects, and PMO sees schedule and cost control "from all projects". **But nothing is collected or surfaced automatically — a project director has to go and explore it.** State the value proposition in exactly these terms: we are activating rights SBG already holds, not asking for new ones.
- **What Ramadan says he wants from us**, verbatim in substance: SBG is "evaluating the role of NVIDIA, Oracle, X, Y, Z to **enhance the transparency** and provide a **clear and restricted transparency strategy for data sharing** between projects and the managerial / head-office level". The ask is a governed cross-project data-sharing capability, not a model.

## The problem, in the client's own words

- **The mandate, from Eng. Mustafa** (the most senior voice, cutting through Ramadan's diplomatic non-answer): "**very rarely has execution come even closely to our original assumptions. Very rare... in all of us, in the recent past. For many, many reasons — and maybe these are the insights we will use AI to dig into.**" Every artefact should trace back to that sentence.
- **The missing feedback loop** (Milo's structural question). SBG's answer stacked three failure modes: feedback isn't captured at the granularity PMO needs, what is captured is of doubtful reliability ("there are always side stories to every story"), and whether it is acted on went unanswered.
- **Subcontractor selection — "a real trap."** Ramadan's clearest pain: subcontractor failures recur across projects because lessons learned and a categorised subcontractor database never reach the next project director at the decision point. His ask is that the check be "**compulsory to be checked or taken into consideration before decision making**". Refinement: it must cover **in-flight** performance too — subcontractors at the ceiling of their capacity still bid for new work "behind their capabilities, which was clear in the efficiency of their ongoing project".
- **King Fahd Stadium — the reference failure, offered voluntarily.** Fast-track project; the project director "was isolated, sitting in Riyadh, making decisions without the support of headquarters" for a good part of nine months; **a good part of six months lost**, then "very, very harsh" remedial measures. PMO wasn't getting feedback at the needed detail — "reported at a very high level, rather than even by sector, by zone, by package, by trade". Mustafa: "**Records are there. Maybe when you give it to them, we'll find some.**"
- **Not pursued:** whether packaging decisions are sometimes relationship-based rather than cost/quality/scope-driven drew a flat **"No comment."** Keep out of written materials; decide in advance how to handle it if the data surfaces it.

## Use cases on the table

| # | Flow | Status |
|---|---|---|
| A | **Project design** — (1) gather inputs from the PM and team, (2) pull available info on the new project, (3) review comparable historical packages for insights (vendor/subcontractor info "a big separate piece") → **a templated target project-design document** the PM iterates on with different data sources | **Agreed as the focus.** Ramadan's verdict on the three-step formulation: "**It needs to be experimented. You cannot say like that from now**" — directionally accepted, not confirmed |
| B | **Subcontractor / vendor selection** — ranked recommendations from historical + in-flight performance | **Demoted to an input into A.** Ramadan: as displayed it sits after "the decision taken by the project director", at procurement / ARB — "what we are discussing now is to take **proactive decision from the project director starting from day one**" |
| C | **Self-perform vs subcontract** | Blocked on ground truth. Oracle's Ahmed listed the criteria (self-perform: internal manpower · equipment · procurement/delivery/inventory capacity · risk; subcontract: market availability local vs international · cash flow · whether the discipline is dominated by one sub so there is no choice) and asked for **"a simulation of the project director without AI, without applications — how they are doing this manually currently on the running projects"** |
| D | **KFSC retrospective** — package-level variance / pattern / driver analysis | The shape of Dmytro's current scope draft |

Oracle's answer to B: supported by "**the procurement domain and the subcontractor management domain in Oracle as an application backside, and there are some agents to support you**" — ongoing and closed contracts, quality/performance/delivery, able to recommend the best subcontractor "by trend, by discipline, by region". **Whether SBG has it licensed was asked and immediately talked over by Ramadan — never answered.** It decides build vs configure.

## Scope shape — where it landed

**"Segment" means a segment of the *scheduling workflow*, not of the construction cycle.** Mustafa framed the choice: "do we test an **end-to-end workflow** regardless of the quality of data... or do we **truncate the workflow** on only the part where we have good quality data" — "a **shorter, or a segment of the full workflow** where we have representative data that's of good quality."

| Option | Shape | Pro | Con |
|---|---|---|---|
| **1 — end-to-end, imperfect data** | Run the whole workflow, accept distorted inputs | "You improve with iteration" — tests the real thing | High risk of no demonstrable result |
| **2 — truncated segment, good data** | Only the part of the workflow where representative data exists | Defensible on data grounds | Hits Mustafa's floor (below) |
| **3 — Bohdan's hybrid** (recommended) | Take **one segment and implement it**, and spend part of the effort **designing the target workflow overall without implementing it** — specifically the part "where you'll need to make the future investment decision on" | Implementation win **plus** the artefact the investment decision needs | Splits a fixed budget across build and design |
| **Mustafa's compromise** | "**Drop some of the difficult elements from AI and let human in the loop for them, but have the full scheduling workflow**" — many elements deliberately with no AI in them | Breadth of workflow, selective depth of automation | Needs explicit human-in-the-loop markers or it reads as unfinished |

**Mustafa's floor is concrete and neither note captured it:** "It should not be very small. Remember, already you're just picking **one element of the whole construction cycle**, so you're already limited. And to limit it further, you may not capture the story. So maybe if, for example, **you're limited to how do we select vendors for subcontractor — that doesn't represent the scheduling cycle.**" So: **Flow B alone is explicitly named as too small.** Flow A is the element already picked.

**⚠️ The ambiguity to close:** Bohdan calls the unit the **project design** workflow; Mustafa says keep the **full scheduling workflow**. If "scheduling cycle" means the whole six-box process shown on screen and project design is one box, Mustafa is asking for more than Flow A. If it is a loose synonym for the planning/design workflow, they agree. This decides how big "full breadth" is — pin it down before writing the options.

**What our side already floated in the room** (and neither note recorded): **"two scenarios which we wanted to automate" based on the historical raw data**, plus expanding to **design the end-to-end flow**, plus **checking data readiness during the PoC**, with the PoC extendable "to MVP production stage later" — and framed as **proof of value**, not just proof of concept. That is Bohdan's hybrid plus Dmytro's data-readiness deliverable, already said aloud. Build the proposal on it.

**The three stages that reconcile Dmytro and Bohdan** (named by Dmytro 2026-08-20; not previously written down anywhere):

| Stage | What | Gate to the next |
|---|---|---|
| **1 — mechanics** | Build the historical-data pipeline and validate it on **one delivered project** (the stadium): gather from all sources → normalise → map to work packages → detect variances → explain → evidence | It is the only project where SBG can realistically supply ground truth. **This is the PoC.** |
| **2 — scale** | Extend to N more projects — more drivers, bigger sample on who performs how | Requires stage 1 to prove the mechanics work |
| **3 — recommendation** | Propose the packaging and the execution model per package, plus "watch these drivers" — a call to action for the project director | "You cannot take inconsistent data and make recommendations — it will recommend you any old thing" |

Dmytro deliberately renamed stage 3 from prediction to **recommendation**, and framed the difference with Bohdan as one of altitude, not direction: "**Bohdan thinks in terms of value overall, a production solution; I think in terms of value stage by stage.**" The end goal is agreed. Only the PoC outcome differs — **and that is what has to be conveyed to the client.**

**Alex's contribution to the proposal: explicit go/no-go gates between the stages.** Rationale: "if we launch this and see data where nobody screwed up, or where SBG screwed up everything themselves, then the next step makes no sense to take" — because "this creative idea that their data will tell us something, that you can find cash-flow gaps in the financial system and that will be the answer, **is very, very assumptive**." [Dmytro 1:1 2026-08-20](calls/sbg-poc/2026-08-20_one-on-one_dmytro-sbg-poc-shaping.md)

## Where the notes diverge from the recording

- **"Michael" is a distinct SBG participant, not Mustafa.** Bohdan's note hedged "may be Mustafa". The recording has someone addressing him directly — "To your point, Michael" — while Mustafa and Raja both respond to him. He is a separate voice to prepare for by name.
- **His challenge is softer than the note frames it.** Bohdan reads it as the top commercial risk ("marginal capability is now free, so what are we paying for?"). What he actually asked is a **coexistence and rollout question**: "some people are developing agents as we speak... **how does this reconcile with what we're now doing with Oracle and NVIDIA? I know they don't conflict, but if you want to roll out things...**" — plus "is this the purpose, or are we talking about solutions embedded within our workflow?" The right answer is a portfolio/governance one (where ad-hoc agents fit vs. corporate IP), not a defensive moat pitch. Bohdan's advice to answer it in the document still stands; the register should change.
- **The written-proposal ask did not originate with Raja.** A senior SBG voice addressing Raja ("you are leading this", Mustafa inferred) proposed it — "**why don't we receive by email what you suggest from your side as Oracle and NVIDIA to focus on, and what information is required for the PoC to be successful**" — and said "this is a critical decision. **If the data is not there, the PoC will fail** — not because you don't have the system, not because the AI is wrong, because we didn't choose the right project or the right area where the data is available." Raja then endorsed it ("it's not any one-person decision"). **The ask carries senior weight, not just facilitator caution.** Raja does own the expectation-setting that follows (concept test, output may not be accurate, will not be the basis for a new package, realistic outcomes deferred to the post-2027 ERP).
- **Mustafa steered us away from asking where the pain is.** Pressed on which step is most manual, he declined and said: "rather than asking us which part takes the most effort... **maybe this will be the outcome from looking at all the data, not the other way around**" — and that AI's job is that "**it can look at this fragmented unstructured data that comes in different formats, multi-modal, and get insights from it**", iteratively, human in the loop. **This supports the discovery/retrospective shape more than either note suggests** — and it is the closest thing in the room to an endorsement of an AIQ-shaped workload.
- **The two reference projects are ongoing, not finished** — "two projects, seven and stadiums, they are already alive. They are ongoing. It didn't finish." If the stadium project is King Fahd, Dmytro's "**retrospective** anchor case" is a live project, which changes both the data shape and the framing. Verify.
- **Dmytro contradicts Bohdan's "three-way disagreement" read.** Bohdan's debrief frames the stakeholders as having competing interests that must jointly pick a use case. Dmytro (2026-08-20): "**They are talking about plus-minus the same thing. They just have different understandings of what the outcome of the PoC should be, and whether we need a PoC at all. The problem itself they share**" — the shared problem being **opacity of decision-making that leads to inefficiency**. The two flows are one thing seen from two seats: the **finance** person wants to track which subcontractor performs better; the **project** person wants help breaking up work packages. "From the point of view of end value it is one and the same. It all concerns how to package the project." [Dmytro 1:1 2026-08-20](calls/sbg-poc/2026-08-20_one-on-one_dmytro-sbg-poc-shaping.md)
- **The data-availability session was answered "Okay"**, not merely requested — weak acceptance, still unscheduled. Chase it as a confirmation, not a fresh ask.

## Platform / pack — never actually named

- **Booked as NVIDIA AI-Q** ("AI-Powered *Document* Intelligence"), the same pack as Riyadh Air / NHS / DHL / KPN → [oracle-ai-offerings](oracle-ai-offerings.md). **Neither transcript nor either note mentions AIQ, cuOpt, AIDP, AI Lakehouse, NIM, NeMo or any blueprint — not once.** The only technology named in the room is the client's own (Primavera, Oracle, Unifier, the end-2027 ERP) plus Copilot.
- **Oracle's own SE answered with Fusion applications, not a pack** — procurement + subcontractor management "as an application backside, and there are some agents". That is a configure-Oracle-apps answer sitting unreconciled next to a build-on-AIQ deal.
- **Nothing was said about the data platform**, which is where the work actually is: normalising heterogeneous progress-measurement bases across Primavera, Oracle and isolated systems down to WBS. That is **AIDP / Autonomous AI Lakehouse + semantic layer** territory — the capability Oracle asked SoftServe for at the [2026-07-22 Neil session](oracle.md#snapshot) and enabled us on 2026-08-05/07.
- **Dmytro locates the LLM's real job precisely (2026-08-20):** collect from different sources, **normalise**, and **map to a single work package** — because the material is "raw, unstructured, in different forms and different meanings", arriving as "**PDF in one case, Excel in another, JSON in a third**". Alex and he converged on the blunt version: the deliverable **reduces to a table** ("the substance of the project is producing an Excel out of their disconnected systems") and all the value sits in the pipeline that gets there. That is a data-normalisation workload, which is the same conclusion the pack analysis reaches from the other end. [Dmytro 1:1 2026-08-20](calls/sbg-poc/2026-08-20_one-on-one_dmytro-sbg-poc-shaping.md)
- **Consequence:** the scope proposal must name the stack, or €171k gets committed against a pack choice nobody validated against the workload.

## Data — agreed and unresolved

- **Agreed:** no live Primavera/Oracle integration ("we will not do any live integration... this is only a PoC, it's not the real project, we don't have any contract"); **raw exports exactly as exported**; "**the data should not be manipulated by any means**". Sources: Primavera (schedule), Oracle (cost, subcontractor). SBG's own Ahmed won this point — training on manipulated working files builds for data shapes that won't exist at live integration, "so it will totally be failing in the future".
- **Blocking:** the client sent a data file before the workshop that **SoftServe still cannot access**. [SteerCo 2026-08-18](calls/oracle/2026-08-18_124942_default_202608181205216609E8E0.md)
- **The load-bearing unknown:** does the export carry **zone / package / trade granularity, or only high-level rollups?** It decides whether the KFSC case is possible. Ramadan says any fragment is derivable *if* the progress-measurement tool ran to activity-ID level in the baseline — so it hinges on whether that was true on that project.
- Also open: whether CPI-adjacent data (fines, actual expenses) can be shared in any form, and what proxy is acceptable if not.

## People

- **Eng. Mustafa** (SBG) — most senior voice, the strategic sponsor. Blunt; gave up the King Fahd Stadium case unprompted, set the scope floor, and steered us to find the insights in the data rather than interview for them. **Design the PoC to satisfy him.**
- **Dr. Ramadan** (SBG) — corporate control / PMO methodology owner. Deep EVM discipline, owns the target operating model, frames our role as enhancing cross-project transparency. Thorough on process, deflects politics ("I intentionally don't want to answer this").
- **Raja** (SBG) — initiative coordinator. "We are only facilitators." Risk-managing, resets expectations downward, wants scope agreed on paper by all stakeholders. **Not the sign-off authority** — that person is still unidentified.
- **"Michael"** (SBG) — raised the ad-hoc-agents / how-does-this-reconcile challenge. A distinct participant; prepare a named answer for him.
- **Ahmed** (SBG, data/systems) — argued for live integration, overruled, won the raw-data concession.
- **Ahmed** (Oracle, solution engineering) — mapped subcontractor performance onto Oracle procurement / supplier performance review; asked for the manual-decision simulation; owns confirming SBG's licensing. → [oracle-team](oracle-team.md)
- **Milo · Waldemar** — vendor side (Oracle's Ahmed defers to "Bohdan and Waldemar" on the flow comparison, so Waldemar is a technical/solution counterpart alongside Bohdan; Milo is likely **Milo Honegger**, Oracle AIDP sales/partner lead — inferred). Milo asked the feedback-loop and relationship-based-packaging questions; Waldemar pressed on per-project vs per-package granularity and post-performance capture.
- **Bohdan Khomych** (SoftServe) — scope framing, the hybrid proposal, the data-availability session ask → [people page](../../people/bohdan-khomych.md).
- **Dmytro Dundych** (SoftServe, PdM) — owns the PoC scope draft; Alex joins him 2026-08-24.

## Decisions

- 2026-08-17 — **Project design (Flow A) is the focus, not performance review**; subcontractor intelligence becomes an input, because Flow B as shown sat post-decision and SBG wants the call at day one. [transcript p2](docs/2026-08-17_sbg-workshop-transcript-2of2.md)
- 2026-08-17 — **No live system integration. Raw exports only, no manipulation.** [transcript p2](docs/2026-08-17_sbg-workshop-transcript-2of2.md)
- 2026-08-17 — **"Agent" language dropped**; the PoC is a recommendation workflow with human decision-making retained.
- 2026-08-17 — **No scope agreed live**; SBG will respond to a written proposal instead.

## Open loops

**Mine**
- **Join Dmytro Dundych Monday 2026-08-24 to shape and finalize the use case**, and reconcile his retrospective-only draft against Flow A + Mustafa's floor. A **one-pager describing the use case** is owed before the next SBG meeting.
- Land the **written scope proposal** — recommended focus, spelled-out data requirements, success criteria in the terms SBG already accepted (concept validation · data readiness · target-state design, **not** accuracy), **2–3 costed options**. Joint SoftServe + Oracle + NVIDIA. Critical path.
- **Name the platform** (AIQ vs AIDP/Lakehouse + semantic layer) and settle whether Oracle procurement / supplier performance review is in or out.
- Close the **"full scheduling workflow" vs "project design"** ambiguity; decide which segment gets deep implementation and whether it is defensible on data grounds; check whether KFSC is ongoing or complete.
- Draft the coexistence answer for Michael's question; decide the handling protocol for politically loaded findings.

**Theirs**
- **SBG — grant access to the data file already sent**, and schedule the **data-availability session** with sample raw exports in advance (answered "Okay", not yet booked).
- **SBG — name the accountable decision-maker for scope sign-off**; confirm the two reference projects; confirm zone/package/trade granularity; rule on CPI-adjacent data; provide a project director for the manual-decision walkthrough.
- **Ahmed (Oracle)** — confirm SBG's Oracle procurement / supplier performance licensing.
- **SoW to Oracle** targeted in the week of 2026-08-24; wrap-up within ~2 weeks. [SteerCo 2026-08-18](calls/oracle/2026-08-18_124942_default_202608181205216609E8E0.md)

## Risks

- **Scope never formally agreed** — no mechanism beyond "send us an email". → Ship the document fast with costed options; SBG has said it cannot be one person's decision.
- **Data granularity insufficient** at zone/package/trade level. → Make data-readiness a **named deliverable**, so the PoC produces value even when the news is bad (Dmytro's draft already counts an unreachable insight as a valid finding).
- **Too narrow → "doesn't capture the story"** vs **too broad → nothing demonstrable.** → Full workflow breadth, selective automation depth, design-not-build for the rest.
- **Everything defers to the end-2027 ERP.** → Reframe the PoC as ERP requirements de-risking, not as something the ERP replaces.
- **Politically loaded findings** (relationship-based awards, CPI) stall the engagement. → Protocol agreed in advance; out of written materials.
- **Project-director resistance** to what reads as surveillance. → Make the PD the beneficiary of the output.
- **Source record is partial** — both transcripts truncated at ~30 min, no speaker labels. → Attributions are inferred; cross-check against SBG's own minutes before acting.

## Activity

- 2026-08-20 — [workshop recordings logged](docs/2026-08-17_sbg-workshop-transcript-1of2.md) — primary source obtained; corrected the Michael/Mustafa attribution, the origin of the written-proposal ask, and the definition of "segment"; surfaced Mustafa's scope floor, his find-it-in-the-data steer, the ongoing status of the reference projects, and our own "two scenarios" proposal.
- 2026-08-20 — [scope draft (Dundych)](docs/2026-08-20_sbg-poc-scope-draft-dundych.md) — PoC objective, in/out of scope, analytical flow, three success measures; KFSC as retrospective anchor; narrower than Flow A.
- 2026-08-17 — [workshop debrief (Khomych)](docs/2026-08-17_sbg-poc-workshop-debrief.md) — scope did not converge; written proposal requested.
- 2026-08-18 — [SteerCo](calls/oracle/2026-08-18_124942_default_202608181205216609E8E0.md) — SBG confirmed the live deal; SoW targeted for the week of Aug 24; Alex assigned to close the use case with Dmytro.
