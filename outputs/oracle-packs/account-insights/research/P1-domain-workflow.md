# P1 — Domain Workflow: Account Intelligence & Signal-to-Action

**Research status:** IN PROGRESS (skeleton created 2026-09-22)

**The job, in a buyer's words:** "Keep up with what is happening at the companies we sell to or depend on, work out what each development means for us, and turn it into something an account team can act on before the next conversation."

**Names this job goes by today:** account research / account planning, pre-meeting briefing preparation, customer intelligence, market & account signal monitoring, trigger-event selling, relationship-manager coverage prep, portfolio monitoring.

**Source tiering:** T1 = primary vendor docs / filings / standards · T2 = analyst reports, reputable trade press, academic · T3 = marketing pages, blogs, secondary.

---

## Executive answer (the short version)

1. **Both trigger patterns are real and named in the market.** The account-triggered pattern is the older, dominant one in B2B sales and is called **account planning / account research / pre-call (pre-meeting) prep**. The signal-triggered pattern is younger, has exploded since ~2023, and is called **signal-based selling** (sales side) or **early warning systems / event-driven monitoring** (financial services side). Neither is a niche.
2. **They are not competing designs — they are two halves of one loop.** Signal-triggered systems produce the raw "this happened + which of your accounts it touches"; account-triggered systems consume it at plan or meeting time. Most mature deployments run both; the difference is which end holds the clock.
3. **The industry-standard term for the "so what" step is not one term.** Sales uses *trigger event*, *buying signal*, *intent*, *propensity*, *whitespace*. Intelligence/CI tradecraft uses *implications*, *analytic judgment*, *assessment*, *So What?*. Banking uses *early warning indicator (EWI)*, *alert*, *action plan*, *watchlist*.
4. The canonical workflow below is 10 steps. Steps 1–4 are largely universal; steps 5–7 (the reasoning and routing) are where the industry-specific logic lives; steps 8–10 (artifact, consumption, feedback) vary by whether the org is account-triggered or signal-triggered.

---

## 1. The canonical workflow (6–12 steps)

### Step table

| # | Industry-standard term | What actually happens | Universal / industry-specific | Where the human decision sits | How it's done without AI |
|---|---|---|---|---|---|
| 1 | **Coverage / book definition** (sales: *territory & account segmentation*; banking: *portfolio / book of business*) | Decide which accounts are in scope and at what tier — strategic vs. managed vs. long-tail. | Universal | Human owns it entirely — it is a resourcing decision, not an analytic one. | Annual/quarterly planning exercise by sales ops or the coverage head; spreadsheets + CRM hierarchy. Weeks per cycle. |
| 2 | **Source / watchlist configuration** (banking: *early warning indicator catalogue*; sales: *signal setup*) | Decide what counts as a watchable source and what counts as a watchable event type for each tier. | Universal in shape, industry-specific in content (EWIs in credit vs. funding/hiring in SaaS) | Human chooses the indicator catalogue and thresholds. | Google Alerts, news aggregator saved searches, LinkedIn Sales Nav alerts, RSS; credit teams hand-build indicator lists. Ongoing, ~hours/week per analyst. |
| 3 | **Collection / monitoring** (*market & account signal monitoring*, *account research*) | Pull filings, earnings calls, news, job postings, leadership changes, product launches, funding, regulatory notices, internal CRM and conversation history. | Universal | Almost none — pure gathering. This is the step everyone tries to automate first. | Manual reading. Analysts scan news/filings; reps Google the account + check LinkedIn. 30–60 min per account per touch (see §1 detail). |
| 4 | **Entity resolution & relevance filtering** (*deduplication*, *disambiguation*, *noise reduction*) | Work out whether "Acme" in the news is *your* Acme, which legal entity/subsidiary, and whether the item is material at all. | Universal | Human adjudicates edge cases (name collisions, subsidiaries, ticker vs. brand). | Reading and judgment. The single biggest silent time sink; nobody logs it separately. |
| 5 | **Impact / implication analysis** (*the "so what"*; CI: *implications*; banking: *alert triage*) | Move from "this happened" to "therefore this account is now more/less likely to buy, churn, default, or need us". | **Industry-specific** — the rulebook is the domain | **This is the core human decision.** Everything else is plumbing. | An experienced rep, analyst or RM reasons from the event to the account's situation. 10–30 min per material item. Rarely written down as a rule. |
| 6 | **Prioritization / scoring** (*lead & account scoring*, *propensity*, *severity rating*) | Rank what survived step 5 — which accounts to act on now, which to watch. | Universal in shape | Human sets the cut line; scoring model proposes the order. | Gut feel plus a spreadsheet. In banking, a severity band tied to a mandated action plan. |
| 7 | **Routing / assignment** (*alert routing*, *task assignment*, *case creation*) | Get the item to the person who owns that account, in the tool they work in. | Universal | Human overrides misroutes; owner accepts or rejects. | Email forwards, Slack/Teams messages, manual CRM task creation. Minutes each, but at volume it dominates. |
| 8 | **Synthesis into the artifact** (*account brief*, *pre-meeting brief*, *account plan*, *credit memo / watchlist entry*) | Write the thing the human will actually read — narrative brief, structured record, or a CRM task. | Universal in shape, industry-specific in template | Human writes or edits; this is where voice and judgment land. | Hand-written. A pre-meeting brief: 30–60 min. A full strategic account plan: multiple hours to days, often a facilitated workshop. |
| 9 | **Consumption / decision** (*account review*, *pipeline review*, *call plan*, *credit committee*, *QBR*) | The artifact is read and a decision is made — outreach angle, plan change, limit change, escalation. | Universal | Entirely human. | A meeting. Weekly pipeline review, quarterly account review, credit committee. |
| 10 | **Action capture & feedback** (*next best action*, *follow-up*, *plan refresh*, *closure of the alert*) | Log what was done, close the loop, and feed the outcome back so the indicator set improves. | Universal | Human decides whether the signal was actually useful. | CRM notes and the alert's disposition field. Chronically skipped — which is why signal quality rarely improves. |

### Step-by-step detail

**Step 3 — how long the manual version takes.** The best number available is primary and precise.

**Salesforce, State of Sales, 6th edition [T1, read from the report PDF]:** *"Reps only spend 30% of their time selling during an average week — a figure that is virtually unchanged from the 2022 State of Sales report, when reps spent 28% of their time selling."* and *"Reps spend 70% of their time on nonselling tasks."* The published breakdown of the week:

| Activity | Share of week |
|---|---|
| Meeting in-person with customers | 12% |
| Generating quotes / proposals and gaining approvals | 10% |
| **Researching prospects** | **9%** |
| **Preparation and planning** | **9%** |
| Connecting virtually with customers | 9% |
| Administrative tasks | 9% |
| Manually entering customer and sales information | 9% |
| Internal meetings and trainings | 9% |
| Prospecting | 8% |
| Prioritizing leads / opportunities | 8% |
| Downtime | 8% |

**This is the single most load-bearing number in the whole research.** "Researching prospects" (9%) + "Preparation and planning" (9%) = **18% of a seller's working week is exactly the job described in the brief** — bigger than any other non-customer-facing block, and bigger than in-person customer meetings (12%). Add "Prioritizing leads / opportunities" (8%), which is step 6, and the addressable block is **26%**.

Secondary anchors, all directional: Microsoft-adjacent write-ups put pre-call research at ~45 minutes for a standard account review, compressed to under 5 minutes with AI [T3]; vendor blogs cite 70–105 min per account for initial research and 5+ hrs/week per rep [T3]. LinkedIn positions Account IQ explicitly as letting sellers "complete account research in an easier and faster way" — i.e. it is sold as a research-compression product [T1].

**Step 5 is the step that is actually hard.** Every vendor in both camps automates steps 3, 4, 6, 7 and 8 with high confidence and hedges on step 5. AlphaSense's positioning — "trained to think like an analyst", agents that "reason across qualitative insights, structured financial data, and your own internal knowledge" — is a claim about step 5, and it is the claim they wrap in citations and auditability rather than accuracy scores [T1/T3].

**Step 8's artifact is the deliverable, but step 9 is the product.** In every discipline examined, the brief has no standing of its own — it exists to make a specific recurring meeting go better (the call, the account review, the credit committee). This matters for packaging: the unit of value is *the meeting that went better*, not *the document that got generated*.

---

## 2. Account-triggered vs. signal-triggered — the central axis

**Answer: both patterns exist as named, productised market practices, and the market has separate vocabulary, separate vendors and separate buyers for each.** The two differ in what holds the clock:

| | **Account-triggered** | **Signal-triggered** |
|---|---|---|
| Entry point | A human picks an account (or a calendar event picks it) | An external event arrives |
| Clock | Calendar — a meeting, a QBR, a planning cycle | The event's own freshness; the "urgency clock" |
| First question | "What is going on at this account?" | "Which of my accounts does this touch?" |
| Direction of fan-out | one account → many sources | one event → many accounts |
| Named practice | account planning, pre-call/pre-meeting prep, account research, coverage prep | signal-based selling, trigger-event selling, early warning systems, event-driven monitoring |
| Failure mode | stale plans, "shelfware" account plans nobody reads | alert fatigue, noise, low-relevance routing |
| Named products | Altify, DemandFarm, Arpedio, Prolifiq, Kapta, LinkedIn Account IQ, MS 365 Copilot Sales agent, AlphaSense Deep Research | UserGems Signal Platform, Common Room, Pocus (→ Apollo), ZoomInfo Copilot / Signals, Bombora Company Surge, bank EWS platforms, Law.com Radar |

### 2a. Account-triggered pattern — evidence

**The methodology layer is 40 years old and still the default framing.** Miller Heiman's Large Account Management Process (LAMP) and its paper artifacts — the **Blue Sheet** (single-opportunity strategy), **Green Sheet** (single-meeting/call planning), and **Gold Sheet** (large-account management) — are the canonical instruments, and the Green Sheet is explicitly the *pre-meeting* artifact: it "helps sales professionals structure specific customer interactions, prepare relevant questions, and plan how to advance opportunities" [T3, multiple restatements]. That an entire named artifact exists for *one meeting* is the strongest evidence that pre-meeting prep is a first-class, account-triggered job — it predates any software.

**The SAMA (Strategic Account Management Association) process** is the professional-body framing: customer business understanding → customer value research → account team alignment → joint objective setting → value co-creation → governance and review cadence → continuous improvement [T3 restatement of a T2 body of practice — see Unverified]. Note that every step is account-scoped; no step in the canonical account-planning methodology starts from an external event.

**Productised, named, account-triggered:**
- **LinkedIn Sales Navigator Account IQ** [T1]. Generated per-account summary of "strategic priorities, likely pain points, how the company makes money, and financials"; blends LinkedIn first-party data (executive team, headcount growth/decline, employee posts) with third-party data. LinkedIn's own framing is that it lets sellers "complete account research in an easier and faster way" and supports "account qualification, prioritization, and preparing for lead engagement". Caveat stated by LinkedIn: not available for all companies; "some sections of the insights might not be displayed".
- **Microsoft 365 Copilot Sales agent** [T1]. The documented scenarios are explicitly account- and meeting-triggered: *Scenario 1 — "Become an expert on your accounts and opportunities"* (for users who "recently took over an account" or "want to quickly get up to speed on an account or opportunity they plan to engage with"); *Scenario 2 — "Be prepared and confident in customer meetings"*. Sample prompts are all account-name-parameterised ("Get me the account summary for `<account name>`", "What was discussed in the previous meeting with `<account name>`?"). Microsoft also ships a **daily meeting prep notification** — "a single, consolidated notification summarizing your next set of upcoming sales meetings" [T1] — i.e. a *calendar*-triggered variant, which is still account-triggered in the sense that the calendar picks the account.
- **AlphaSense Deep Research** [T1 press release]. Runs on an explicit research request; produces "comprehensive company and industry primers", "M&A screening analyses", and briefings including "compil[ing] executive priorities and competitive movements for meeting preparation". Sources: 500M+ documents (equity research, earnings calls, expert interviews, filings, news) plus enterprise internal libraries. This is the analyst-grade version of the same account-triggered job.

**Human decision location:** in the account-triggered pattern the human decision is at *step 1* (which account, why now) and *step 9* (what to do about it). The middle is delegable.

### 2b. Signal-triggered pattern — evidence

**Sales side — "signal-based selling" is now a named category with its own vendors.**
- **UserGems Signal Platform** [T1]. Named components: **Signals**, **Workflows**, **Writing Agent**, **Buying Groups**, **Scoring**. Named signal types include **Past Champions** (a known champion changes employer) and **New Hires & Promotions**. The documented flow is unambiguously event-first: signal detected → "Playbooks using pre-built or custom workflows, sequences, and notifications" fire in Salesforce / HubSpot / Slack / Outreach / Salesloft → AI generates personalised messaging → outreach executes. Note what the artifact is here: **not a briefing document — a workflow trigger, a notification, and a drafted message.**
- **Common Room** [T3 comparative] — aggregates community/product signals (GitHub, Slack, Discord, social) with firmographics and "rout[es] signals to reps when a target account engages heavily".
- **Pocus** [T3] — first- and third-party intent signals for prospecting; acquired by Apollo in March 2026 and now waitlist-only. Worth noting as a market-structure datapoint: the standalone signal-platform category is consolidating into larger GTM suites.
- **Bombora Company Surge** [T1/T3] — the reference scoring mechanic for topic-level intent (see §4b).

**Financial services side — the same pattern, older, regulated, and called something else.**
Banking calls this **Early Warning Systems (EWS)** and it is genuinely signal-triggered by design: a catalogue of **early warning indicators (EWIs)** with thresholds is evaluated continuously; a backend engine "calculates and identifies customers meeting alarm parameters" and logs "counterparties causing alarms"; alerts carry **severity levels with associated immediate action plans**; dashboards are role-specific for **credit analysts, portfolio managers, and relationship managers** [T3 vendor/consultancy material, corroborated across Reply, Deloitte, EY, Evalueserve]. A named worked example of composite signal logic: an alert when "a corporate client's debt-to-equity ratio increases alongside negative industry news" — i.e. an internal structured metric crossed with an external unstructured event. Regulatory pressure is an explicit driver: "regulators expect banks to adopt effective early warning systems" [T3].

**Professional services / legal — signal-triggered business development.**
Law firms run litigation- and news-alert feeds and map hits to clients and practice areas; the stated strategy is to "cast a wide net — setting up alerts based on geographic regions, industries, and practice areas", then convert hits into **client alerts** (an outbound artifact) or BD outreach [T3, LexisNexis / Law.com Radar / Bloomberg Law]. Bloomberg Law's critique is a useful quality signal: client alerts fail when they summarise the development without tailoring it to the specific client's situation — i.e. the failure is *skipping step 5*.

### 2c. Which is more common, and where

**By installed base: account-triggered is far more common.** It is the default in every B2B sales organisation that has a CRM, because it is what the CRM's object model and the sales calendar already impose. Account planning is a discipline with a professional association, a training industry and a software category; signal-based selling is a category roughly five years old.

**By growth and by where new money is going: signal-triggered.** The sales-intelligence market grew from ~$2.95B (2022) to ~$4B (2025) [T3 restatement — see Unverified], and every major GTM suite has added a signals layer. The Gartner-attributed driver most cited is that buyers complete the majority of their journey before contacting a vendor (commonly quoted as 67–70% rep-free / seller-free) — which destroys the value of scheduled outreach and rewards event-timed outreach [T2-attributed via T3 restatements].

**Industry split, as observed:**

| Industry | Dominant pattern | Why |
|---|---|---|
| Enterprise B2B software / complex sales | **Account-triggered**, with a signal layer bolted on | Few, large, named accounts; long cycles; the account plan is a governance object |
| SMB / velocity / PLG sales | **Signal-triggered** | Too many accounts to plan; the signal *is* the prioritisation |
| Commercial & corporate banking, credit | **Signal-triggered** (EWS) for risk; **account-triggered** for coverage/RM prep | Risk side is continuous and regulated; the coverage side is meeting-driven |
| Asset & investment management | **Signal-triggered** (portfolio monitoring) | The portfolio is fixed; the news is what changes |
| Legal / professional services | **Signal-triggered** for BD; account-triggered for client team planning | Matters originate from events (litigation, regulation, transactions) |
| Insurance / reinsurance | — | Not researched; see Unverified |

**The structurally important finding for packaging:** the two patterns are *not* substitutes — they resolve to the same steps 4–8, executed in a different order with a different fan-out direction. Account-triggered fans one account out across many sources. Signal-triggered fans one event out across many accounts. A system that can do the second can always do the first; the reverse is not true, because account-triggered systems typically have no persistent event stream and no event→portfolio mapping index.

---

## 3. Standard output artifacts

The artifact differs systematically by trigger pattern. This is the second-most-useful finding after §2.

### 3a. Account-triggered → a narrative document, read once, before a meeting

| Artifact | Industry-standard name | Who consumes it | How | Cadence |
|---|---|---|---|---|
| Single-meeting prep sheet | **Green Sheet** (Miller Heiman); **pre-meeting brief**; **call plan** | The rep / RM attending the call | Read 10–30 min before the call; sometimes reviewed in an internal pre-meeting | Per meeting |
| Per-account research summary | **account brief**, **account summary**, **Account IQ** | The rep, plus anyone newly assigned to the account | Read on account pages in the CRM/sales tool; increasingly consumed as chat answers rather than a document [T1, MS Sales agent] | On demand / on assignment |
| Full account strategy | **strategic account plan**; **Gold Sheet**; LAMP plan | Account team + sales leadership | Reviewed in an account review; used as the meeting agenda | Quarterly to annual |
| Customer-facing review | **QBR** (quarterly business review) / **EBR** (executive business review) | Customer stakeholders + vendor account team | A deck, presented. QBR = operational, run by AM/CSM with day-to-day contacts; EBR = strategic, annual/semi-annual, C-suite both sides [T3] | Quarterly / annual |
| Institutional-grade research | **primer**, **briefing**, **diligence-ready company profile** [T1 AlphaSense] | Analysts, PMs, deal teams, boards | Read as a document with citations; "fully auditable" is the stated quality property | On demand |

A sharp practitioner observation worth carrying into packaging: *"A plan reviewed once a year is a document; a plan reviewed monthly is a habit"*, and the **commitment list** — not the plan — is what opens the next review [T3]. The durable artifact is the list of open commitments, not the narrative.

### 3b. Signal-triggered → not a document. A routed object with a state.

In the signal-triggered pattern the output is deliberately *not* a briefing. Evidence:
- **UserGems** [T1]: outputs are workflow triggers in Salesforce / HubSpot / Slack / Outreach / Salesloft, sequence notifications, and AI-generated personalised messaging. There is no "briefing document" in the product's own description of its outputs.
- **Common Room** [T3]: "rout[es] signals to reps when a target account engages heavily" — a routed notification.
- **Banking EWS** [T3]: the object is an **alert** against a named counterparty, carrying a **severity level** with an **associated immediate action plan**; it is logged in a database, surfaced on role-specific dashboards (credit analyst / portfolio manager / RM), and *has a disposition* — it must be closed.
- **Legal BD** [T3]: the hit becomes either a **client alert** (an outbound publication) or a BD task.

So: **account-triggered produces prose; signal-triggered produces a record with a lifecycle** (open → triaged → assigned → actioned → closed). The record usually carries: the event, the affected entity, a severity or score, an owner, a recommended action, and a due date.

### 3c. The convergent middle

Both patterns now converge on a third artifact type: **the chat answer**. Microsoft's Sales agent documentation contains no document deliverable at all — it is entirely a prompt library ("Get me the account summary for `<account name>`") [T1]. This matters: for the account-triggered job, the market is actively moving the artifact from *document* to *answer-on-demand*, while for the signal-triggered job it is moving from *notification* to *drafted action*.

---

## 4. How quality is judged

Quality is judged in three distinct and largely non-overlapping ways depending on who is paying.

**(i) Commercially, by downstream conversion.** The sales-side literature judges account/signal intelligence almost entirely by revenue proxies — response rate, meeting rate, win rate, time-to-first-touch. Circulated figures (all T3, all vendor-sourced, treat as directional only): trigger-acted accounts at 37% win rate vs. 19% for cold outreach; first-mover-after-trigger 5x more likely to win; signal-specific personalisation at 18% reply rate vs. a 5.2x-lower generic baseline. **None of these are independently verified and all come from vendors selling the capability.** See Unverified.

**(ii) Operationally, by alert economics.** In banking EWS and in any routed-alert system, the judged quantities are false-positive rate, alert volume per analyst, and time from signal to intervention ("automation… reduces the time between signal detection and intervention" [T3]). This is the only place in this research where a *cost of a wrong answer* is explicitly modelled — because a missed early warning is a credit loss and a false one burns an RM relationship.

**(iii) Analytically, by comparison to an expert-written reference.** This is where the "golden report" practice actually lives.

### 4a. Golden report / benchmark-against-human-analyst practice

**The practice exists and is well-specified — but in the AI-evaluation literature, not in the sales/CI literature.**

- **Generic ML practice — "golden dataset".** A reviewed, versioned set of representative inputs with trusted expected outputs, labels, rubrics or reference context, hand-labelled by humans with domain expertise, used for regression evals and production-trace checks. Explicitly an evaluation asset, not training data [T3, multiple eval-tooling vendors: Langfuse, Arize, Confident AI, Innodata].
- **The rubric variant, which is the right one for this job.** For "Synthesizer Agents" with a moderate cost of failure, evaluation targets a **"Golden Rubric"** — datasets of inputs plus checklists of qualitative criteria such as *"cites three sources"*, *"tone is neutral"*, *"avoids speculation"* [T2, arXiv 2510.13857]. This is directly transferable: an account brief is a synthesizer output.
- **The state-of-the-art benchmark-against-human-analyst design: DeepResearch Bench II** [T2, arXiv 2601.08536]. Method, in its own terms:
  - Reference reports are **"high-quality, expert-written investigative reports from reputable open-access venues"** — 132 tasks across 22 domains.
  - Rubrics are built by a four-stage pipeline: LLM extraction from the source article → **self-evaluation iteration** (rubrics that score below 90% accuracy against their own source article are regenerated, to mitigate hallucination) → manual revision by annotators → **expert review, 400+ hours**.
  - Three evaluation dimensions: **Information Recall** (did it find the relevant information), **Analysis** (did it "synthesize the retrieved information and derive higher-level insights"), **Presentation** (clear, user-accessible, verifiable).
  - Headline finding: **"Even the strongest agents fail to pass more than 50% of the rubrics"**, with the largest deficits in Information Recall and Analysis.
  - The paper's stated motivation is a direct critique of the naive approach: prior benchmarks let LLMs define the criteria, which "can introduce systematic misalignment with human expert judgments", and their rubrics were "overly coarse and weakly interpretable".
- **Predecessor: DeepResearch Bench** [T2, arXiv 2506.11763] — 100 PhD-level tasks across 22 fields, with a reference-based adaptive-criteria method for report quality plus a separate framework scoring **effective citation count and citation accuracy**. Citation accuracy as a *separate, mechanically checkable* axis is the most directly reusable idea for this job.
- **Related benchmarks worth knowing:** DEER (expert report generation, arXiv 2512.17776), Dr. Bench (arXiv 2510.02190), MMDeepResearch-Bench (140 expert-crafted multimodal tasks, arXiv 2601.12346), DR³-Eval (arXiv 2604.14683), ResearchRubrics (five axes: human-written rubrics / expert-curated tasks / open-ended tasks / non-technical domains included / LLM-as-judge used).

**The gap:** I found **no** evidence of a published golden-report or human-analyst-benchmark practice specific to *account briefs* or *sales intelligence*. Vendors in that segment publish conversion metrics, not accuracy metrics. AlphaSense — the closest to an analyst-grade product — substitutes **auditability** for accuracy: "granular citations", "deep-dive access to underlying content", "fully auditable" [T1]. That is a *verifiability* claim, not a *correctness* claim, and it is the standard move in this market.

### 4b. Confidence scoring & calibration

Two genuinely different traditions, and the difference is instructive.

**(i) Intelligence tradecraft — ICD 203 (Intelligence Community Directive 203, "Analytic Standards")** [T1, read verbatim from the ODNI PDF]. The governing standard for all-source analysis, and by some distance the cleanest specification anywhere of how to express uncertainty in a "what happened → so what" product. **Analytic Standard 2, "Properly expresses and explains uncertainties associated with major analytic judgments":**

> "Analytic products should indicate and explain the basis for the uncertainties associated with major analytic judgments, specifically the likelihood of occurrence of an event or development, and the analyst's confidence in the basis for this judgment. Degrees of likelihood encompass a full spectrum from remote to nearly certain. Analysts' confidence in an assessment or judgment may be based on the logic and evidentiary base that underpin it, including the quantity and quality of source material, and their understanding of the topic."

Four operational rules, each directly transferable:

1. **Likelihood and confidence are separate axes and must stay separate.** ICD 203(b), verbatim: products expressing confidence *"must not combine a confidence level and a degree of likelihood, which refers to an event or development, in the same sentence."*
2. **The likelihood vocabulary is fixed and numerically banded.** An analytic product *"must use one of the following sets of terms"* — two interchangeable rows mapped to explicit probability bands:

| almost no chance | very unlikely | unlikely | roughly even chance | likely | very likely | almost certain(ly) |
|---|---|---|---|---|---|---|
| remote | highly improbable | improbable (improbably) | roughly even odds | probable (probably) | highly probable | nearly certain |
| **01–05%** | **05–20%** | **20–45%** | **45–55%** | **55–80%** | **80–95%** | **95–99%** |

  Analysts are *"strongly encouraged not to mix terms from different rows"*; products that do must carry a disclaimer that the terms indicate the same probability.
3. **Causes of uncertainty must be named, not gestured at.** Products *"should note causes of uncertainty (e.g., type, currency, and amount of information, knowledge gaps, and the nature of the issue) and explain how uncertainties affect analysis (e.g., to what degree and how a judgment depends on assumptions)."*
4. **Ship the tripwires with the judgment.** *"As appropriate, products should identify indicators that would alter the levels of uncertainty for major analytic judgments."* This is the most under-copied idea in the standard: the brief tells you what would change its mind.

Standard 3 is also worth noting: products must *"clearly distinguish statements that convey underlying intelligence information used in analysis from statements that convey assumptions or judgments"* — i.e. an enforced separation between the "this happened" and the "therefore" that the commercial market does not impose.

- Academic challenge to whether the probability/confidence distinction survives contact with readers: *Intelligence and National Security*, Vol 39 No 4 [T2].
- ICD 203 has documented uptake in the private sector as a deliberate tradecraft import [T3, practitioner writing].

**(ii) Commercial intent scoring — a calibrated-deviation score, not a confidence statement.**
- **Bombora Company Surge** [T1 customer docs + T3]: score **0–100** where **50 = average consumption**; **≥60 is "spiking"** — "a statistically significant increase in consumption of the given topic compared to their baseline activity". Measured as **aggregated account-level intent over a 3-week period relative to a 12-week baseline**. Inputs to the score: number of topic events, number of unique users at the business researching the topic, topic relevancy weight, and depth of content engagement. Bombora's own threshold guidance: **"setting scores at a minimum of 60"**, and a **topic threshold of at least 25% of the total topics in your report or cluster**.
- **ZoomInfo Signal Score** [T3]: 60–100, same shape — "how far recent content consumption sits above that company's historical baseline".
- Practitioner guidance: audit match-rate accuracy quarterly; filter signals below confidence thresholds so reps don't chase unreliable leads; layer a broad-reach provider with a high-confidence source plus first-party data [T3].

**The synthesis that matters:** the commercial world has calibration for the *detection* step (is this signal real?) and nothing for the *implication* step (is this conclusion right?). ICD 203 has a mature, mandated vocabulary for exactly the implication step. Nobody in the commercial account-intelligence market appears to have imported it.

---

## 5. Vocabulary of the "so what" step

The move from "this happened" to "therefore we should" has **no single industry-standard term**. It has four vocabularies, and which one a buyer uses tells you which world they come from.

**(a) Sales / GTM vocabulary — event-centric, about timing.**

| Term | Precise meaning as used | Note |
|---|---|---|
| **Trigger event** | An observable change at a target account (funding, hiring, exec change, tech change) indicating increased likelihood to buy | The oldest term; "trigger-event selling" is the named practice |
| **Buying trigger** | A discrete, **dated** event with an **urgency clock** — funding, exec change, M&A. Moves a buyer from passive to active | Distinguished from "signal" by having a date and a clock [T3] |
| **Buying signal** | An observable **behavior** — site visits, hiring posts, tech-stack changes | Continuous, not dated |
| **Buying intent** | The **probability score** you get when you weight signals and triggers by ICP fit and **recency decay** | The scored synthesis of the two above |
| **Signal-based selling** | The methodology: "every outreach decision is driven by real-time buying signals rather than static lists" | The 2023– category name |
| **Propensity** | Modelled likelihood to buy / to churn / to expand | Statistical framing, usually from a model not an event |
| **Next best action** | The recommended action output | Borrowed from banking/CRM |

The signal / trigger / intent three-way split is the most precise piece of vocabulary in the sales world and is worth adopting verbatim: *signals are behaviors, triggers are dated events with a clock, intent is the weighted score* [T3].

**(b) Account-planning vocabulary — account-centric, about opportunity shape.**

- **Whitespace / white space analysis** — mapping the customer's business units and needs against the full product portfolio, flagging where they own nothing or only part of a solution, and ranking those gaps by revenue potential and fit [T3, Altify/Upland — the originators of the term in this sense].
- **Relationship map / stakeholder map** — the political structure and influence web inside the account; "connects whitespace opportunities directly to key stakeholders and influencers".
- **Buying influence** — Miller Heiman's term for a role in the decision (Economic / User / Technical Buyer, Coach).
- **Red flags** — Miller Heiman's term for what is unknown or adverse in the deal; the Blue Sheet's explicit "what could kill this" field.
- **Account health**, **growth potential** — Gold Sheet vocabulary.

**(c) Intelligence / CI tradecraft vocabulary — judgment-centric, about the reasoning itself.**

- **Implications** — the operative word in SCIP's own definition of CI: intelligence "regarding the **implications** of business environment, competitors, and the organization itself" [T3 quoting SCIP]. This is the closest thing to a formal name for the "so what" step.
- **Actionable intelligence** — "data organized and interpreted to reveal underlying patterns, trends, and interrelationships", as distinct from raw information.
- **Analytic judgment / assessment** — the ICD 203 term for the conclusion itself.
- **Tradecraft** — the named discipline of doing step 5 well; defined as ensuring "dedication to objectivity, and delivery of products to the right people in time to be useful in their decision-making".
- **"So What?"** survives as an informal but widely used section heading in briefing templates [T3 — commonly asserted, not formally standardised; see Unverified].

**(d) Financial-services vocabulary — exposure-centric, about consequence.**

- **Early warning indicator (EWI)** — the watchable metric or event.
- **Alert** with a **severity level** and an **associated immediate action plan**.
- **Watchlist** — the state an account moves to.
- **Affected exposures / counterparty impact** — the fan-out from event to portfolio.
- **Risk driver** — the specific cause surfaced on the analyst's dashboard.

**The packaging-relevant conclusion:** if the target buyer is a sales org, the "so what" step must be called *trigger / signal / intent*. If it is a bank or an asset manager, it must be called *early warning indicator / alert / affected exposure*. If it is a research or strategy function, it must be called *implications / assessment*. Using the wrong vocabulary reads as off-domain immediately — and there is no neutral term that works in all three.

---

## 6. Industry variation

### 6a. What is genuinely universal

Steps 1, 3, 4, 6, 7, 9, 10 are structurally identical across every industry examined. The artefacts differ, the sources differ, the severity language differs — the shape does not. Specifically universal:
- An entity-resolution problem that nobody names and everybody pays for (step 4).
- A routing problem where the bottleneck is "who owns this account today" (step 7).
- A feedback step that is skipped almost everywhere (step 10), which is why indicator catalogues go stale.

### 6b. What is genuinely industry-specific

**Only step 5 and the source set.** The implication rulebook is the domain:

| Industry | The implication rule looks like | The named source set |
|---|---|---|
| Enterprise B2B software | "New CTO + posted platform-engineering roles + competitor's contract renewal window → displacement window open" | Filings, job postings, LinkedIn exec changes, funding, tech-stack detection, earnings-call language |
| Commercial / corporate banking | "Debt-to-equity rising + adverse sector news → downgrade watchlist, RM outreach, covenant review" [T3, Reply] | Internal financials, behavioral/transaction data, macro data, 4M+ news sources with source-authoritativeness weighting [T2/T3, Deloitte Risk Alert] |
| Asset / investment management | "Broker research flags a thematic risk → which holdings carry that exposure" [T3, AlphaSense] | Equity research, earnings calls, expert interviews, filings, news — 500M+ documents [T1] |
| Insurance underwriting / broking | "Loss signals, plaintiff tactics and jurisdictional trends move into underwriting **ahead of renewal**" — an explicitly stated shift from a retrospective to a continuous cycle [T3] | Broker submissions, loss runs, engineering reports, financial filings, news, IoT/satellite telemetry, cyber threat intel, supply-chain data |
| Legal / professional services | "New litigation or regulation in a client's jurisdiction/practice area → client alert or BD approach" | Docket/litigation feeds, regulatory publications, regional/industry news |

### 6c. Cross-industry observations worth carrying forward

1. **The insurance case is the clearest statement of the direction of travel anywhere in this research:** the underwriting cycle is described as changing "from a largely retrospective process into a more continuous one" [T3]. That is precisely the account-triggered → signal-triggered migration, stated as an industry trend rather than a product feature.
2. **Banking has already built what sales is currently buying.** The Deloitte Risk Alert description — NLP over 4M+ sources across multiple jurisdictions and languages, an engine that **"assess[es] the authoritativeness of the source" to reduce false signals**, role-configured dashboards for CRO / Credit Officer / Portfolio Manager / RM / Credit Analyst, and "a single summary of all threats relating to borrowers" — is a mature signal→portfolio system. It also, notably, publishes **no quantified metrics** on effort reduction or false-positive rate.
3. **Adoption, not capability, is the recurring failure.** Independent of industry, the account-triggered artifact fails the same way: "account planning is often the first thing account executives deprioritize when time is scarce"; "account planning efforts that live outside the CRM are doomed to low adoption"; "adoption falls when the rep has to assemble the answer manually across multiple systems" [T3]. The corresponding signal-triggered failure is alert fatigue. Any packaging of this job has to pick which of those two failure modes it is claiming to solve.
4. **Manual effort baseline.** The defensible number is Salesforce's [T1, §1]: **18% of a seller's week** (9% researching prospects + 9% preparation and planning), rising to 26% if lead/opportunity prioritisation is counted. Vendor-blog figures — 70–105 min per account for initial research, ~45 min per enterprise meeting at 5–10 meetings/week, 5+ hrs/week, ~6 hrs/week saved, 45 min → under 5 min — are all T3 with no stated method and should be treated as directional only.

---

## Sources

### T1 — primary vendor documentation, filings, standards

1. **Intelligence Community Directive 203, "Analytic Standards"** — Office of the Director of National Intelligence. https://www.intelligence.gov/assets/documents/intelligence-community-directives/ICD_203.pdf (mirror: https://irp.fas.org/dni/icd/icd-203.pdf) — the likelihood-vs-confidence separation, the high/moderate/low confidence scale, the prohibition on mixing the two in one sentence.
2. **Microsoft Learn — "Overview of Sales agent in Microsoft 365 Copilot"** (ms.date 2026-08-06). https://learn.microsoft.com/en-us/microsoft-sales-copilot/sales-chat-overview — the three documented scenarios and the full sample-prompt library; the account-name-parameterised prompt pattern.
3. **Microsoft Learn — "Start your day with a Copilot for Sales meeting summary"** (2025 Wave 1 release plan). https://learn.microsoft.com/en-us/copilot/release-plan/2025wave1/copilot-sales/start-day-copilot-sales-meeting-summary — the daily consolidated meeting-prep notification.
4. **Microsoft Adoption — Copilot Scenario Library: "Accelerate customer research and sales preparation"** and **"Improve customer meetings"**. https://adoption.microsoft.com/en-us/scenario-library/sales/accelerate-customer-research-and-sales-preparation/
5. **LinkedIn Sales Navigator Help — "Account IQ in Sales Navigator"**. https://www.linkedin.com/help/sales-navigator/answer/a1655021 — data sources, caveats ("isn't currently available for all companies", "some sections… might not be displayed").
6. **LinkedIn Business blog — "Meet Account IQ"** and **"Introducing the new Lead IQ & Enhanced Account IQ"**. https://www.linkedin.com/business/sales/blog/product-updates/introducing-account-iq-what-it-is-and-how-to-best-use-it — the generated sections (strategic priorities, likely pain points, how the company makes money, financials).
7. **UserGems — "Introducing UserGems Signal Platform"**. https://www.usergems.com/news/usergems-signal-platform — named components (Signals, Workflows, Writing Agent, Buying Groups, Scoring); Past Champions and New Hires & Promotions signal types; the detect → playbook → message → execute flow.
8. **AlphaSense press release — "AlphaSense Launches Deep Research…"** (PR Newswire). https://www.prnewswire.com/news-releases/alphasense-launches-deep-research-automating-in-depth-analysis-with-agentic-ai-on-high-value-content-302476710.html — 500M+ documents; primers, M&A screens, meeting-prep briefings; "granular citations", "fully auditable".
9. **AlphaSense platform / technology pages**. https://www.alpha-sense.com/platform/ , https://www.alpha-sense.com/technology — "trained to think like an analyst"; multi-agent reasoning across qualitative, structured-financial and internal knowledge.
10. **Bombora customer docs — "Score & Topic Thresholding"**. https://customers.bombora.com/crc-brand/thresholding — "scores of 60 or more… are considered spiking"; "setting scores at a minimum of 60"; topic threshold ≥25% of topics in the report/cluster.
11. **Bombora Company Surge Analytics User Guide (PDF)**. https://customers.bombora.com/hubfs/CRC_Brand_Files%20and%20Videos/CRC_Company%20Surge/bombora-company-surge-analytics-user-guide.pdf
12. **Gartner press release — "Gartner Sales Survey Finds 67% of B2B Buyers Prefer a Rep-Free Experience"**, 9 March 2026. https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience — survey of 646 B2B buyers, Aug–Sep 2025; up from 61%; 45% used AI during a recent purchase; quote from Alyssa Cruz, Senior Principal Analyst, Gartner Sales Practice.
13. **Gartner press release — 61% figure, 25 June 2025** (the prior-year comparator). https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience
14. **Salesforce State of Sales Report, 6th edition (PDF)** — *read directly, section "Productivity Lags as Nonselling Tasks Dominate Time"*. https://assets.ctfassets.net/f43wltp2j5se/2gHMpCURXzpMW7PJ3SlWZJ/3cad8d7e8496abbd3c0f99d5c7f16ef4/salesforce-state-of-sales-report-6-ed.pdf — 30% selling / 70% non-selling; the eleven-line weekly breakdown including **Researching prospects 9%** and **Preparation and planning 9%**; 2022 comparator of 28% selling. Same report: 67% of reps don't expect to meet quota this year, 84% missed it last year.
15. **SAMA — Strategic Account Management Association**, incl. the Certified Strategic Account Manager outline (PDF). https://strategicaccounts.org/ , https://strategicaccounts.org/wp-content/uploads/2025/03/CSAM_2024_lglayout.pdf

### T2 — analyst, academic, reputable trade press

16. **DeepResearch Bench II: Diagnosing Deep Research Agents via Rubrics from Expert Reports**, arXiv 2601.08536. https://arxiv.org/html/2601.08536 — 132 tasks / 22 domains from expert-written investigative reports; 4-stage rubric pipeline with a 90% self-evaluation gate and 400+ hours of expert review; Information Recall / Analysis / Presentation axes; "even the strongest agents fail to pass more than 50% of the rubrics".
17. **DeepResearch Bench: A Comprehensive Benchmark for Deep Research Agents**, arXiv 2506.11763. https://arxiv.org/abs/2506.11763 — 100 PhD-level tasks, 22 fields; reference-based adaptive criteria; separate effective-citation-count and citation-accuracy framework. Repo: https://github.com/Ayanami0730/deep_research_bench
18. **DEER: A Benchmark for Evaluating Deep Research Agents on Expert Report Generation**, arXiv 2512.17776. https://arxiv.org/pdf/2512.17776
19. **Dr. Bench: A Multidimensional Evaluation for Deep Research Agents, from Answers to Reports**, arXiv 2510.02190. https://arxiv.org/html/2510.02190
20. **MMDeepResearch-Bench**, arXiv 2601.12346. https://arxiv.org/html/2601.12346v1 — 140 expert-crafted tasks, 21 domains, citation-grounded report generation.
21. **DR³-Eval: Towards Realistic and Reproducible Deep Research Evaluation**, arXiv 2604.14683. https://arxiv.org/pdf/2604.14683
22. **"From Craft to Constitution: A Governance-First Paradigm for Principled Agent Engineering"**, arXiv 2510.13857. https://arxiv.org/pdf/2510.13857 — the "Golden Rubric" construct for Synthesizer Agents and its example criteria ("cites three sources", "tone is neutral", "avoids speculation").
23. **"Probability or confidence, a distinction without a difference?"**, *Intelligence and National Security* Vol 39 No 4. https://www.tandfonline.com/doi/abs/10.1080/02684527.2023.2276582 — the academic challenge to the ICD 203 likelihood/confidence split.
24. **Deloitte UK — "Risk Alert: The Early Warning system of the future"**. https://www.deloitte.com/uk/en/services/consulting-risk/services/risk-alert-the-early-warning-system-of-the-future.html — NLP over 4M+ sources, multi-jurisdiction/multi-language, source-authoritativeness assessment, role-configured dashboards (CRO / Credit Officer / Portfolio Manager / RM / Credit Analyst), "a single summary of all threats relating to borrowers".
25. **EY — "The future of early warning systems in banking"**. https://www.ey.com/en_us/insights/banking-capital-markets/the-future-of-early-warning-systems (listed in search results; the specific URL tried returned 404 — see Unverified).
26. **Bloomberg Law — "INSIGHT: Why Your Client Alerts Fail; Three Ways to Fix Them"**. https://news.bloomberglaw.com/us-law-week/insight-why-your-client-alerts-fail-three-ways-to-fix-them
27. **LexisNexis — "Elevate Your Law Firm's Business Development with News Monitoring"**. https://www.lexisnexis.com/community/insights/legal/b/thought-leadership/posts/elevate-your-law-firm-s-business-development-with-news-monitoring
28. **Demand Gen Report — "LinkedIn Introduces Sales Navigator AI-Assisted Search & Account IQ"**. https://www.demandgenreport.com/solution-spotlight/linkedin-introduces-sales-navigator-ai-assisted-search-account-iq/8075/
29. **Wikipedia — Competitive intelligence** (for the SCIP definition wording) and **Intelligence analysis** (for tradecraft). https://en.wikipedia.org/wiki/Competitive_intelligence

### T3 — marketing pages, vendor blogs, secondary restatements

30. Altify / Upland — **"What Is Whitespace Analysis?"** and the Account Planning glossary. https://uplandsoftware.com/altify/resources/blog/whitespace-the-missing-sales-metric/ , https://altify.com/glossary/what-is-whitespace-analysis/ , https://altify.com/glossary/account-planning/
31. DemandFarm — **White Space Analysis of Key Accounts**, **Strategic Account Planning**, **Strategic Account Management Guide** (SAMA seven-step restatement). https://www.demandfarm.com/blog/white-space-analysis/ , https://www.demandfarm.com/strategic-account-management/
32. Miller Heiman Blue/Green/Gold Sheet restatements — Arist, Salesmotion, Sybill (LAMP). https://arist.com/resources/blogs/miller-heiman-blue-sheet-guide , https://salesmotion.io/blog/miller-heiman-blue-sheet , https://www.sybill.ai/blogs/miller-heiman-lamp
33. Salesmotion — signal-tracking platform comparison, buying-triggers guides, sales-rep research-time posts. https://salesmotion.io/blog/best-signal-tracking-platforms , https://salesmotion.io/blog/buying-triggers , https://salesmotion.io/blog/sales-team-manual-account-research-time , https://salesmotion.io/blog/sales-rep-time-selling
34. UserGems blog — **"Best AI sales signal tools in 2026"**. https://www.usergems.com/blog/best-ai-sales-signal-tools-in-2026 ; **"The 23 Most Important Sales Trigger Events for B2B Sales"**. https://www.usergems.com/blog/sales-trigger-events
35. Boomerang — **"Buying Signals vs Buying Triggers vs Buying Intent"** (the three-way vocabulary split, incl. "urgency clock" and "recency decay"). https://www.getboomerang.ai/glossaries/buying-signals-triggers-intent-2026
36. ZoomInfo — **"Signal-Based Selling: A Complete How-To Guide"**; Signal Score restatements. https://pipeline.zoominfo.com/sales/top-sales-teams-buying-signals , https://www.smarte.pro/blog/zoominfo-intent-data-review
37. Autobound, Unify, Fullcast, Tapistro — signal-based-selling guides (category framing + the circulated conversion statistics). https://www.autobound.ai/blog/signal-based-selling-complete-guide , https://www.unifygtm.com/explore/signal-based-selling
38. Technology Reply — **Credit Risk Monitoring / Early Warning**. https://www.reply.com/technology-reply/en/early-warning ; Evalueserve — **Early Warning Systems**. https://www.evalueserve.com/blog/early-warning-systems/ ; Credit Benchmark — credit-risk-monitoring knowledge base. https://www.creditbenchmark.com/knowledge-base/credit-risk-monitoring-tools/
39. Law.com Radar — **"Using Litigation Alerts to Support Business Development"**. https://www.exploreradar.law.com/blog/using-litigation-alerts-to-support-business-development-a-strategic-guide-for-law-firms
40. Eval-tooling vendors on golden datasets — Langfuse, Arize, Confident AI, Innodata, FutureAGI. https://langfuse.com/resources/engineering/golden-dataset-evaluation , https://arize.com/resource/golden-dataset/ , https://www.confident-ai.com/docs/llm-evaluation/core-concepts/test-cases-goldens-datasets
41. Sybill — **"AI Pre-Meeting Briefs for Sales Calls"** (the 45-min → 5-min claim, and the "account brief before QBR slides" framing). https://www.sybill.ai/blogs/ai-pre-meeting-brief-sales-call-prospect-research
42. Warmly / Prolifiq / Salesmotion — UserGems, Common Room, Pocus and Altify/Revegy competitive write-ups (source for Pocus→Apollo acquisition, March 2026, and Revegy discontinuation, March 2026). https://www.warmly.ai/p/blog/usergems-alternatives , https://www.prolifiq.com/post/altify-alternatives , https://salesmotion.io/common-room-alternatives
43. Eric Ford (LinkedIn) — **"The Value of ICD 203 Analytical Tradecraft Standards in the Private Sector"**. https://www.linkedin.com/pulse/value-icd-203-analytical-tradecraft-standards-private-eric-ford
44. Kapta / Sybill / PartnerStandard — QBR vs EBR cadence and ownership. https://kapta.com/resources/key-account-management-blog/your-first-100-days-as-an-account-management-leader-part-4-establishing-a-qbr-cadence , https://pro.partnerstandard.com/glossary/quarterly-business-review-qbr
45. OIP Insurtech / Veridion / World Finance Informs — insurance renewal and underwriting-signal material. https://www.oipinsurtech.com/seven-mistakes-insurance-brokers-make-with-renewals/ , https://veridion.com/insights/articles/insurance-underwriting-tool-types

---

## Unverified

Items I could not confirm to the tier they would need, or could not confirm at all. **None of these should be used as fact.**

1. **Every conversion statistic in §4(i).** "37% win rate vs 19%", "5x more likely to win as first mover after a trigger", "18% reply rate / 5.2x improvement", "3x higher conversion for job-change signals". All originate from vendors selling signal platforms and are restated across T3 blogs without a traceable methodology. I found no primary study behind any of them. — **Directional only.**
2. **Sales-intelligence market size ($2.95B 2022 → $4B 2025).** Quoted in a T3 blog with no named research firm. Could not trace to a primary market-sizing report. — **—**
3. ~~The "70–72% of rep time is non-selling" figures.~~ **RESOLVED — now T1.** Read directly from the Salesforce State of Sales 6th-edition PDF: 30% selling / 70% non-selling, with the full eleven-line breakdown reproduced in §1. The circulating "72%" is a T3 corruption; **70%** is the published figure. The 9% + 9% (researching prospects + preparation and planning) split is also primary.
4. **All other manual-effort time figures** (70–105 min initial account research; 45 min per enterprise meeting; 5+ hrs/week; 6 hrs/week saved; 45 min → under 5 min). Every one is from a vendor blog with no stated method. — **Directional only.** Use the Salesforce percentages instead wherever a number is needed.
5. **SAMA seven-step process wording.** The seven-step framing is consistently restated across multiple independent T3 sources and is clearly real, but I could not open a SAMA primary document that states the seven steps in those words. The step names given in §2a are therefore a T3 consensus restatement, not SAMA's own wording. — **Name-level accuracy not verified.**
6. **EY "The future of early warning systems in banking".** Appeared in search results; the URL I tried returned HTTP 404. Content not read; cited only as existing. — **—**
7. **Whether Account IQ is auto-generated or user-triggered.** LinkedIn's help page does not state it; the section names of the generated summary are also not enumerated in the help doc (the section list in §2a comes from LinkedIn's blog + T3 restatements). — **—**
8. **Salesforce Agentforce's specific account-brief / pre-call-research feature set.** Searches returned Microsoft material and a general Salesforce financial-services "Client Meeting Preparation" use-case page; I did not confirm a named Agentforce account-briefing capability from Salesforce primary docs. — **—**
9. **Insurance/reinsurance trigger pattern.** The "retrospective → continuous" quote is from a single T3 trade source. I did not find a named signal-triggered product in insurance comparable to UserGems or a bank EWS. The row in §2c is marked "—" deliberately.
10. **"So What?" as a formally standardised briefing-template section heading.** Widely used informally; I found no standard (ICD, SCIP or otherwise) that mandates it as a named section. — **—**
11. **Any golden-report / human-analyst-benchmark practice specific to account briefing or sales intelligence.** Searched directly; found none. The benchmark practice documented in §4a is from the AI research-agent literature and would be an *import* into this domain, not existing practice in it. — **Confirmed absent, not merely unverified.**
12. **Revegy discontinuation (March 2026) and Pocus acquisition by Apollo (March 2026).** Both stated in T3 competitive-comparison blogs published by competitors. Not confirmed against a press release or filing. — **Treat as likely but unconfirmed.**
13. **ZoomInfo Signal Score range (60–100).** From a T3 review, not from ZoomInfo's own documentation. The Bombora equivalent **is** T1-confirmed; the ZoomInfo one is not.
14. **Bombora's 3-week / 12-week window.** Stated in T3 restatements; Bombora's own thresholding page confirms the ≥60 threshold and the baseline concept but **does not state the time windows**. — **Windows unverified.**

