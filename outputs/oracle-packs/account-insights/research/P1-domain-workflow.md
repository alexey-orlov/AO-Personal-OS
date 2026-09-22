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

**Step 3 — how long the manual version takes.** Two independent anchors:
- Microsoft's own adoption material and third-party write-ups put pre-call research at roughly **45 minutes for a standard account review** before AI assistance [T3]. LinkedIn positions Account IQ as letting sellers "complete account research in an easier and faster way", i.e. it is explicitly a research-compression product [T1].
- Salesforce's State of Sales data is the standard citation for the macro number: sellers spend the clear majority of their week on non-selling work, of which research is one named component [T1/T2 — see Sources]. The commonly circulated derivative figures (70–72% non-selling) are secondary restatements and are marked accordingly.

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

**(i) Intelligence tradecraft — ICD 203 (Intelligence Community Directive 203, "Analytic Standards")** [T1, intelligence.gov]. The governing standard for all-source analysis, and the cleanest available specification of how to express uncertainty in exactly this kind of "what happened → so what" product:
- Analysts must **indicate and explain uncertainties associated with major judgments**.
- **Likelihood and confidence are separate axes.** Likelihood of the event uses standardised probability language; **confidence in the judgment** is expressed as *high / moderate / low* and depends on the **quantity and quality of the underlying sources and how well the analyst understands the topic**.
- ICD 203 **explicitly prohibits combining a confidence level and a likelihood term in the same sentence**, because it confuses the reader about which thing is uncertain.
- Academic debate on whether the probability/confidence distinction survives contact with readers: Intelligence and National Security, Vol 39 No 4 [T2].
- ICD 203 has documented uptake in the private sector as a tradecraft import [T3, practitioner writing].

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

_pending_

---

## Sources

_pending_

## Unverified

_pending_
