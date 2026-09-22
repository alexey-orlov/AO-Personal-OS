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

_pending_

---

## 4. How quality is judged

### 4a. Golden report / benchmark-against-human-analyst practice

_pending_

### 4b. Confidence scoring & calibration

_pending_

---

## 5. Vocabulary of the "so what" step

_pending_

---

## 6. Industry variation

_pending_

---

## Sources

_pending_

## Unverified

_pending_
