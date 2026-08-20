# one-on-one — 2026-08-20 — Dmytro Dundych: shaping the SBG PoC scope

_source: transcript supplied by Alex in chat, 2026-08-20 (RU/UA). Participants: **Dmytro Dundych** (Speaker A — owns the scope proposal; Volodymyr Chornyy asked him to propose a scope to SBG off the workshop) and **Alex** (Speaker B — joining to help shape it)._
_Working session, not a client call. Purpose: get Alex oriented enough to contribute to the written scope proposal._

## TL;DR

- **The end goal is now concrete**, and it is narrower than "project design document": an assistant that, from **historical evidence + current inputs on a new project**, lets SBG (a) **package work into work packages** and (b) **choose the execution model per package** — self-perform vs subcontract, and if subcontract, which subcontractor. Both decisions, evidence-backed.
- **Dmytro's PoC is stage 1 of three, deliberately.** Stage 1 = build the mechanics of working with historical data on ONE project (the stadium). Stage 2 = scale to N projects. Stage 3 = recommendations. He is explicit: "**I'm not proposing to recommend anything now. I'm proposing to build the mechanics by which we later recommend.**"
- **Alex's central concern, raised twice and not resolved: sample size.** ~100 projects company-wide, all different object types. Per work type there may be ~15 comparable instances, realistically ~7 after conditions differ, spread across ~6 contractors doing them once or twice. No data-grounded conclusion is possible from that — "it dissolves in fog". On ONE project it is worse: one data point per action item.
- **Both agreed the deliverable reduces to a table** ("essentially you need to build an Excel"). The value and the difficulty are entirely in the pipeline that produces it from heterogeneous raw exports.
- **Alex committed to writing the staged plan with explicit go/no-go gates by end of day 2026-08-20**, for Dmytro to fold into the scope proposal.

## What SBG actually does, per Dmytro

- Client arrives with a project and a frame ("a new stadium, 18 months, $1bn"). SBG sets a **project baseline** — the term and the money.
- They decompose the project into small volumes of work, run **pre-tender preparation** (this work, for this money, under these conditions), consolidate, and put it into a system for execution control. **Dmytro does not know what that control system actually is** — "there's some Primavera, there's Oracle; I don't know the name of the Oracle system the project information is pulled from."
- All of the above is **plan, not fact**.
- **They cannot skip process stages.** Everything runs to standards — a per-vertical, per-object-type standard equivalent to a DSTU/GOST/ISO document. So "they forgot a step" is not a failure mode.

## Where it actually goes wrong

- **The execution model is the primary failure point** — self-perform vs subcontract, and which subcontractor. "They took the wrong subcontractor and the subcontractor slipped half a year, didn't do something."
- **Time and money are the second and third** — but they are downstream impacts of the first choice.
- **Root cause: decisions ride on the individual project director** — his experience, his local contacts. "They rely on local experience" rather than the company's accumulated experience. Decisions span: what scope goes into a work package → which subcontractor → how much to spend → how to accept the work.
- **Blacklists exist and get ignored.** SBG maintains subcontractor blacklists for certain regions, "but project directors often turn a blind eye."

## The two decisions to be supported

1. **How to break and group the work into packages.** Digging the trench and pouring the foundation can be **one** package to a contractor with the competence and equipment, or **two** packages to two contractors. Which is right depends on local constraints — whether the region can even organise the work that way.
2. **Who executes** — self-perform or subcontract, and which subcontractor.

Alex's floated third layer — correlation analysis on grouping ("when action items 1 and 2 were done together the success rate was higher than done apart, therefore group them") — Dmytro classed as **a deeper analytics layer**, and flagged that he **cannot answer how they break and group today**: "I don't know their process, and nobody will tell you."

## Where the LLM is genuinely needed (Alex challenged this directly)

Alex pushed: is this really an AI/LLM problem, or correlation analysis and pure maths given enough data, plus text generation for the narrative? Dmytro agreed with the framing and located the LLM precisely:

> Collect information **from different sources**, **normalise** it, and **map it to a single work package**. The information is **raw, unstructured, in different forms and different meanings**, from different systems.

And the client-side symptom that justifies it: "**their problem right now is that they cannot clearly answer the question — what happened?**"

Later, both converged on the blunt version:
- **Alex:** "the substance of the project is producing an Excel out of their disconnected systems."
- **Dmytro:** "Yes — only to produce that Excel you have to shovel that much information, gather it raw from different sources, normalise it. It might be **PDF in one case, Excel in another, JSON in a third**. You bring it to one form, lay it on a timeline, and only then look for the insight."

Alex also confirmed it is **not** a build-once integration: for the PoC it is static raw exports; whether the future is direct integration or a periodic dump into one processing place is unknown. Dmytro's lean: their systems stay locked, with periodic exports flowing to one place.

## Dmytro's PoC design, in his own words

Scope: **one historical project — the stadium.** Company-wide he estimates **hundreds** of projects, but the PoC uses one.

On that one project: gather information from different sources (financial, planning, contractor), normalise, structure, **map to specific work packages**. Then find what happened, explain why, and find the proof in the data.

The three success measures, explained:

1. **Variance accuracy** — SBG knows there were, say, **20 deviations** on that project. Our system finds **18**. Deviations from plan: budget and time.
2. **Can we explain it** — that a given deviation was caused by e.g. someone not arriving on time, or a **cash-flow gap** leaving no money to pay.
3. **Evidence coverage** — traceability: locate in the exported sources the **proof** of those explanations, down to snippets from documents.

**Ground truth is human-only.** "Ground truth can only come from a person, there is no other." Method: sit with SBG SMEs, interview them — you know what the problems were, name them and explain what you think caused them — then run our pipeline, and have them **confirm in an interface**.

Alex's restatement of the close, which Dmytro accepted: experts name the causes; we show a system that crawls their systems, finds evidence, assembles it into statements ("here in the financial plan is a cash gap"), and lands on roughly the same conclusions their people did — "trust the system, you no longer have to ask the people." Alex named what that is: **"this second part is not about making the right decisions, it is post-mortem assessment."**

## The three stages

| Stage | What | Why it must come first |
|---|---|---|
| **1 — mechanics** | Build the historical-data pipeline and validate it on ONE project | It is the only project where SBG can realistically supply ground truth — sit with us, refresh their memory, state the real cause and confirm it |
| **2 — scale** | Extend to N more projects | More drivers, bigger sample on which contractor performs better at what |
| **3 — recommendation** | System proposes: break the work like this per your geography and constraints, use this execution model per package, and to avoid these known problems do 1-2-3 — a call to action for the project director | Only possible once the mechanics are proven and the sample exists |

Dmytro deliberately renamed stage 3: "**let's not call it prediction, let's call it recommendation.**" And on skipping ahead: "you cannot take inconsistent data and make recommendations — it will recommend you any old thing."

## Alex's risk: the sample may not support any of this

Raised, pushed back on, and **doubled down on**. Not resolved.

- If the portfolio is ~100 projects across different object types, a work type like "dig a pit" might have **~15 instances**, and after conditions differ, **~7 comparable** ones — done by ~6 different contractors, once or twice each. "Any conclusion **dissolves in fog**. You can't draw a data-based conclusion — only an expert one."
- Even the favourable case fails: if they built 5 stadiums in different countries with different contractors, "we get those data, there'll be different contractors because different countries, and that's the end of the story. **It's Excel** — a table, apply a filter, see two rows for one action item. **I don't see where the added value from NVIDIA and AI is.**"
- On the PoC's own one-project scope: each action item has **one data point** — done once, succeeded or didn't. "Any advice is grounded in nothing. There are 10 possible contractors plus doing it yourself, and we have one case."
- **Dmytro's answer, partial:** within one project there are "maybe hundreds of work packages", so there will be **dozens of recorded deviations and dozens of explanations** — enough to validate the mechanics, which is all stage 1 claims. He also conceded he cannot confirm the data volume: "**I don't know the answer to that. I think we'll know next week.**"
- **Dmytro's candid internal read** (not for client materials): the AI framing is partly demand-side theatre — every company like this, "especially the Arabs right now", wants something to be artificial intelligence, "some chat where you write something and get an answer."

## The cause-analysis half may be optional

Alex's read, which Dmytro accepted ("yeah, roughly"): **failure-reason analysis is not the critical part of the engagement.** Plan/fact alone may be enough — if a contractor screws up, why hardly matters; don't work with them. The "why" is hard, may not be findable in the source data, and may not be needed. **Treat it as an optional path: good if it works, fine if it doesn't.**

Dmytro's counterweight, from earlier in the call: attribution does matter where the cause is **SBG's own** — "the accountant failed to send the payment" — because then the recommendation becomes "on this type of work package, watch these drivers", not "avoid this contractor."

## On the stakeholder split — Dmytro contradicts Bohdan's read

Alex relayed Bohdan's account: very different stakeholder expectations, no convergence on A/B/C. **Dmytro disagreed:**

> "They are talking about plus-minus the same thing. They just have different understandings of **what the outcome of the PoC should be**, and whether we need a PoC at all. The problem itself they share."

The shared problem, as Alex named it and Dmytro confirmed: **opacity of decision-making that leads to inefficiency.**

The two flows are the same thing seen from two seats:
- **"Project planning support with AI assistant generating insight from historical data"** — the project person, who wants help breaking up work packages and deciding what to do with them.
- **"Subcontractor vs self-execution model choice"** — the finance person, who wants to track which subcontractor performs more efficiently.
- Dmytro: "**From the point of view of end value it is one and the same. It all concerns how to package the project.**"

And on the difference with Bohdan: "**Bohdan probably thinks in terms of value overall, a production solution; I think in terms of value stage by stage.**" The final goal is agreed — a tool that helps decide packages and design documentation ("design documentation *is* these work packages"). Only the PoC outcome differs, "and that needs to be conveyed to them, no more and no less."

## Decisions and commitments

- **PoC = retrospective analysis of one delivered project**, to establish whether the system can find the drivers and present them in a form SBG specialists can confirm. No recommendations in this phase.
- **Alex → write up the staged plan with explicit go/no-go gates by end of day 2026-08-20**, in a form that can be put to the client (per stage: what we do, and the condition that must hold to proceed). Dmytro then processes it against what he already wrote.
- **Dmytro → owns the scope proposal to SBG** (requested by Volodymyr Chornyy off the workshop).
- Delivery format to the client is open — possibly a screenshot out of Miro rather than a document.
- Sync again tomorrow if needed, otherwise Dmytro absorbs Alex's input.

## Alex's gate logic

The reason for the gates, in his framing: "if we launch this and see data where nobody screwed up, or where SBG screwed up everything themselves, then the next step — cause analysis, or scaling, or recommendations — makes no sense to take. That's one example. There will be more such gates."

And why it matters for how we write: "on every stage this creative idea that their data will tell us something, that you can find cash-flow gaps in the financial system and that will be the answer — **that is very, very assumptive**."

## Open questions named in the call

- **Data volume** — how many projects, how many work packages per project, whether they are comparable at all. **Answer expected next week.**
- **What the Oracle control system actually is** (Dmytro does not know its name).
- **How SBG breaks and groups work into packages today** — "I don't know their process, and nobody will tell you."
- **Portfolio composition** — how many stadiums vs housing vs offices; whether repeat object types exist in sufficient number.

## Artefacts referenced

- **Miro board "Discovery Workshop" / "Business case refinement"** — everything from the workshop and the client case collected there; password-protected, password sent in chat. Frame 7 is where Alex can add his scheme.
- Dmytro's scope note (PoC Objective / In Scope / Analytical Flow / Success Measures) → [logged](../../docs/2026-08-20_sbg-poc-scope-draft-dundych.md).
