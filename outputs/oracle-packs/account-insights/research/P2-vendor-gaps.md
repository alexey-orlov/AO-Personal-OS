# P2 — Vendor Taxonomy Gap Check & Competitor Classes

**Research status:** IN PROGRESS (skeleton created 2026-09-22 17:39)

**The job under study:** turning external developments (news, filings, disclosures, market events) plus a company's own first-party account data into account-specific implications — opportunities and risks — that a sales or coverage team can act on. Output = narrative account briefing or a structured per-account record.

**The 12-step reference decomposition being gap-checked:**
1. Define the account universe in scope
2. Ingest signals + first-party context (CRM, seller's own service/capability catalog, filings, news, commercial data feeds)
3. Filter for genuine, relevant signals; de-duplicate one story across many sources into one signal
4. Resolve which in-scope accounts a signal affects (entity resolution)
5. Retrieve and rank evidence per account, grounded in first-party + public sources
6. Reason the "so what" — implications, candidate opportunities, material risks per account
7. Map each implication to a concrete service line / product the seller actually offers
8. Trace second-order and cross-account ripples (suppliers, customers, competitors)
9. Score each item by magnitude and confidence; attach citations
10. Assemble the output artifact (briefing + discussion guide, or structured record)
11. Human review — approve / reject / comment
12. Deliver downstream (CRM, sales system, meeting prep)

**Source tiering:** T1 = primary vendor docs / product documentation / filings · T2 = analyst reports, reputable trade press · T3 = vendor marketing pages, blogs, press releases.

**Rule applied:** no capability asserted from memory. Every capability claim is read off a current vendor doc/page and carries a source + tier. Capabilities that could not be verified go to `## Unverified`.

---

## PART A — VENDOR TAXONOMY GAP CHECK

### A0. Vendors studied and why

Six primary (deep), four secondary (confirmatory). The six primaries were chosen because each one *names the steps differently*, which is what makes them informative as a taxonomy check:

| Vendor | Why it is informative | Depth |
|---|---|---|
| **AlphaSense** | The only one that treats *research itself* as the product surface. Its taxonomy is agent/workflow-shaped, not pipeline-shaped. Closest analogue to steps 2–3, 5–6, 9–10. | Primary |
| **ZoomInfo (GTM Studio / Copilot Workspace)** | The only one that names a **Signals** surface and a **Workflows** surface as separate products, and explicitly groups signals *by account*. Closest analogue to steps 1–4, 12. | Primary |
| **6sense** | Names its *data substrate* (Signalverse) and its *entity graph* (Company Graph) as branded surfaces — the only vendor to make entity resolution a named asset. | Primary |
| **Microsoft 365 Copilot for Sales** | Best-documented (Microsoft Learn is genuine T1 product documentation, not marketing). Shows exactly how far first-party CRM grounding goes in a shipped product. | Primary |
| **Salesforce Agentforce** | The CRM incumbent's answer; its agent taxonomy is job-role-shaped (SDR, Coach, Account Management) rather than step-shaped. | Primary |
| **Klue** | The competitive-intelligence shape of the same job: collect → curate → consume. The only vendor whose taxonomy makes *triage* a named tool. | Primary |
| LinkedIn Sales Navigator | The single-artifact answer (Account IQ). Shows the minimum viable version of the brief. | Secondary |
| Demandbase | ABM peer to 6sense; confirms/denies the Signalverse pattern. | Secondary |
| Dow Jones Factiva | The news-corpus/licensing layer. Shows where dedup and entity tagging live when they are a product. | Secondary |
| Clay | The "build the pipeline yourself" answer — waterfall enrichment + AI research columns. | Secondary |

### A1. Each vendor's own capability grouping, in their words

#### A1.1 AlphaSense

**Named surfaces (AlphaSense's own words, T1 help centre):**

| Surface | What AlphaSense says it is |
|---|---|
| **Generative Search** | "Get trusted, cited answers to business questions, with options for speed or depth." Has consolidated filters by *company, watchlist, industry, document*; an **'Auto' Mode** that "intelligently matches reasoning level to query complexity"; output selection via **Report** or **Grid** tiles. [T1] |
| **Deep Research** | An agent that "automates complex research and delivers decision-ready output reports… in minutes versus days, while maintaining easy deep-dive access to high quality underlying documents through **granular citations**." Can be **scheduled**. [T1/T3] |
| **Workflow Agents** | Pre-built agents that "automate entire analysis arcs like building company primers, competitive landscapes, and SWOT analyses." 12–13 new agents added Apr–May 2026 (Thesis Checker, Precedent Transaction Review, Industry Primer, Demand Supply Cycle, Clinical Trial Analysis…). **Custom Agents** support a **monthly scheduling cadence with dynamic variables using an "@" placeholder**. [T1] |
| **Workspaces** | Up to **5,000 document uploads**; "compare uploaded documents against broader AlphaSense library"; create Grids, Reports, **and Slides**. [T1] |
| **Smart Summaries** | "concise, relevant, AI generated summaries across earnings transcripts, broker research, and expert calls" with **deep-linked citations** to "the original source document and exact snippet." [T1] |
| **Document Search Alerts** | Daily/weekly email alerts on saved searches with GenAI summaries; two modes — **"Summarize Documents"** (per document) or **"Executive Brief"** (overall). Limit: five summarized alerts per user. [T1] |
| **AI-Led Expert Calls** | Launch an **AI Interviewer** per expert from the Call Projects portal; analyzed in Workspaces alongside human calls. [T1] |
| **Enterprise Intelligence** | Lets customers "include their **internal document libraries** in the analysis" and "analyze and contrast internal and external perspectives in one seamless output report." [T3 press release] |

**Taxonomy shape:** *content universe → search mode → agent → workspace → deliverable.* AlphaSense does NOT expose ingestion, dedup, entity resolution or scoring as user-facing surfaces — they are implicit in "the content universe" and in the "@" company picker.

**Notable for the gap check:**
- Scheduling is a first-class property of an agent (monthly cadence + dynamic variables) — i.e. *recurrence* is a named capability, which my 12 steps do not have.
- Output *format* is a user choice made before the run (Report vs. Grid vs. Slides) — a named step my list folds into "assemble the artifact".
- **No confidence score.** AlphaSense's trust mechanism is citation granularity, not calibration. Its press release for Deep Research mentions no confidence metric, no verification workflow, and no mandatory human review. [T3]

#### A1.2 ZoomInfo (Copilot Workspace / GTM Studio)

**Named surfaces (ZoomInfo's own words, T1 IR release + T3 product pages):**

| Surface | What ZoomInfo says it is |
|---|---|
| **GTM Workspace** (the upgrade of ZoomInfo Sales + ZoomInfo Copilot) | "a unified sales execution platform… to run their **entire book of business** from a single workspace." Brings together "CRM data, ZoomInfo intelligence, engagement history, and buying signals into one consolidated view." [T1 IR] |
| **Pulse Feed** | Surfaces "up to **1,000 daily signals** across **15+ signal types** including buying intent, job changes, funding, hiring activity, and competitive research, **grouped by account** and ready to act on." [T1 IR / T3] |
| **Signals** | A named, separately-addressable object in GTM Studio — "AI-powered Signals" used to build and enrich Audiences. [T3] |
| **Audiences** | Built and enriched with ZoomInfo data + Signals. [T3] |
| **Workflows** | "designed and activated using **triggers, conditions, and branching logic**" to automate GTM motions — named plays include *intent signal targeting, funding round outreach, persona expansion, competitive displacement*. [T3] |
| **Data foundation** | "more than 100 million companies, 500 million contacts, and **billions of signals**." [T3] |
| **Copilot Studio connector** | ZoomInfo data exposed natively into Microsoft Copilot Studio, M365 Copilot, Dynamics 365, Excel and Word. [T1 IR] |

**Taxonomy shape:** *data → signal → audience → workflow → activation*, with a single **book-of-business workspace** as the consumption surface.

**Notable for the gap check:**
- **"Grouped by account"** is called out as a feature of the Pulse Feed. This is exactly my step 4 (entity resolution) — but ZoomInfo sells it as an *output property of the feed*, not as a step.
- **Signal typology (15+ named types) is itself a product surface.** My step 2 says "ingest signals" with no taxonomy. ZoomInfo's position is that *the named list of signal types is the product*.
- **Volume control is the real problem they market against**: "up to 1,000 daily signals" is framed as a benefit but implies the customer's actual pain is triage. My step 3 covers filter+dedupe, but not *ranking within the day's feed* or *per-rep quota*.

#### A1.3 6sense

**Named surfaces (6sense's own words, T3 product pages):**

| Surface | What 6sense says it is |
|---|---|
| **Signalverse™** | The proprietary B2B signal network — "trillions of datapoints collected everyday." Branded as the *data substrate*. [T3] |
| **Company Graph** | "a 13-year structural map of B2B" used to "resolve raw signals into cited intelligence." [T3] |
| **6AI™** | Scores accounts by "**ICP fit, intent, and buying stage**"; "analyzes B2B buying patterns… to identify in-market opportunities." [T3] |
| **Buying stage prediction** | Classifies accounts into awareness / consideration / decision from activity patterns. [T3] |
| **Buying-group identity resolution** | "identity resolution at the **buying-group level**" — reveals "complete buying committees." [T3] |
| **AI Email Agents** | "Generate, send, and respond to emails **grounded in real buyer signals** and your brand voice." [T3] |
| **RevvyAI** | Conversational AI — "ask any question about your accounts or campaign performance and get an immediate answer." [T3] |

**Taxonomy shape:** *signal substrate → identity graph → score → stage → agent action.*

**Notable for the gap check:**
- 6sense is the only studied vendor that **brands entity resolution as an asset** (Company Graph) and claims it "resolves raw signals into **cited** intelligence" — the only ABM vendor using the word *cited*. [T3]
- 6sense **scores**, but the score is fit/intent/stage — a *propensity* score, not a **magnitude × confidence** score on an individual implication. My step 9 is not what they ship.
- The public pages **do not document** deduplication methodology, confidence calibration, per-claim citations, or any "why this account now" narrative artifact. That is a documented absence, not a claim that it doesn't exist — see `## Unverified`. [T3]

#### A1.4 Demandbase

_pending_

#### A1.5 Klue

**Named surfaces (Klue's own words, T3 product page):**

| Surface | What Klue says it is |
|---|---|
| **Compete Agent** | "Automatically **collect, curate, and share** competitive intel throughout your organization." |
| **Auto Insights** | "Auto-generating content for competitive research, sellers in live deals, and **the trusted source for your internal LLM**." |
| **Deal Support** | "Competitive deal support across your entire pipeline." |
| **Win-Loss Suite** | Win-Loss, Human Expert Interviews, **AI Interviewer**, Blindspots Interviews, Win & Loss Story Agent. |
| **Itemised features** | Real-Time Alerts & Competitor Monitoring · **Intel Triage Tools** · AI-Powered Review Analysis · Browser Intel Extensions · Dual-Purpose Analytics Suite · Built-In Intel Newsletters · **Dynamic Battlecard Creation** · Win-Loss Analysis. |

**Taxonomy shape:** the explicit **collect → curate → consume** triad, plus a *feedback* loop (win-loss) that none of the sales-intelligence vendors have.

**Notable for the gap check:**
- **"Intel Triage Tools" is a named product surface.** Nobody else names triage. My step 3 (filter/dedupe) is machine-side; Klue ships triage as a *human* workbench. That is a distinct task I do not have.
- **Win-Loss is the outcome-feedback loop** — did the intel actually help win the deal. My 12 steps end at step 12 (deliver) with no learning loop.
- **"The trusted source for your internal LLM"** — Klue positions its curated intel as *the retrieval corpus other AI reads*. That reframes the output artifact: not only a brief for a human, but a governed knowledge object.

#### A1.6 Salesforce Agentforce / Einstein sales intelligence

**Named agents (Salesforce's own naming, T1 Help + T2/T1 Trailhead):**

| Agent / surface | What Salesforce says it does | Grounding |
|---|---|---|
| **Agentforce for Sales Development (SDR)** | "Automates various sales development tasks" — personalized outreach, answers questions, schedules intro meetings, nurtures leads 24/7. | "grounded in your company's **sales, product, and customer data**" [T1 Trailhead] |
| **Agentforce Sales Coach** | "uses generative AI and CRM data to provide personalized feedback"; analyzes communication within Salesforce object records; interactive **role-playing** to prep reps for hard conversations. | "accesses CRM data and **RAG**"; "cross-references the sales rep's information with certain fields from the opportunity" [T1 Trailhead] |
| **Agentforce Account Management** | A "specialized **subagent**" of the Sales Management agent for account managers — lets sellers ask the agent to "perform **deep research**, summarize recent interactions, and **recommend next steps** instead of manually digging through multiple systems." | CRM + multiple systems [T1 Help, retrieved via search snippet — full page is JS-rendered, see `## Unverified`] |
| **Meeting and account briefs** | Delivered "in **Slack, ChatGPT, and mobile** — all packed with company summaries, recent conversations, **web updates**, and service history." | [T2/T3 Salesforce newsroom] |

**Taxonomy shape:** *job role → agent → topics/actions.* Salesforce does not decompose the job into steps at all; it decomposes it into **who the agent stands in for**.

**Notable for the gap check:**
- "Perform **deep research**" is one *action* inside one *subagent*. Salesforce collapses my steps 2–6 and 10 into a single verb.
- **Delivery surface is named and plural** (Slack, ChatGPT, mobile) — i.e. *where the brief is consumed* is a product decision, not an afterthought. My step 12 says "deliver downstream" without treating the surface as a design variable.
- "Recommend **next steps**" ≠ "map to the seller's service catalog". The SDR agent is grounded in "product… data", which is the closest documented thing to my step 7 — but it is grounding for *outreach copy*, not an explicit implication→offering mapping. See `## Unverified`.

#### A1.7 Microsoft 365 Copilot for Sales

**This is the best-documented vendor in the set — genuine T1 product documentation on Microsoft Learn, updated 2026-08-06.**

| Surface | What Microsoft documents it does |
|---|---|
| **Sales agent** (in M365 Copilot) | "an AI-powered chat interface that you can use to interact with your sales data by using natural language… ask questions and gain insights from your **CRM data, past customer conversations, emails, Teams meetings, and Teams messages**." [T1] |
| **Account / opportunity summary** | "a summary of an account or opportunity, including key information, **the pipeline, the three closest opportunities, and a summary of meetings from the last 30 days**." Admin-configurable: "Your CRM administrator can **customize the details included in the account and opportunity summary**." [T1] |
| **Meeting preparation** | "brings AI-generated insights, CRM data, and recent communications into a single, easy-to-read view alongside the Sales agent chat interface." Upcoming-meetings list = next 4 days, max 5 shown; past meetings = last 7 days. Each upcoming meeting card shows "up to **three high-value AI highlights**… written to be actionable and concise." [T1] |
| **Detailed meeting preparation view** | Opened with **"Prepare with insights"**; "explore deeper insights, ask follow-up questions, and access more context without leaving your workflow." [T1] |
| **Post-meeting experience** | **Key takeaways** + **Meeting summary** + **Action items** from the AI meeting recap. [T1] |
| **Inbox/calendar catch-up** | Summarize recent interactions with a contact, open questions and follow-ups across email/meetings/Teams. [T1] |

**Documented hard limits — valuable, because they are rare to find stated:**
- "Sales agent returns a **maximum of 30 CRM records per response**." [T1]
- "it typically takes **at least 15 minutes** for insights to be generated for new meetings." [T1]
- Meeting-prep features are **not** available in the embedded Outlook/Word/PowerPoint/Excel/Dynamics experiences — chat only. [T1]
- Graph-grounded data (Outlook/Teams/People) requires a separate M365 Copilot licence; CRM-only otherwise. [T1]
- "Sales agent **only surfaces information you have permission to access**." [T1]

**Taxonomy shape:** *data sources → chat agent → cards (meeting card, summary card) → recap.* Microsoft's taxonomy is **surface-shaped**, organized around where in Outlook/Teams the user is standing.

**Notable for the gap check:**
- The **strongest first-party grounding of any vendor studied**, and the only one that documents permission-trimming as a property of the answer.
- **No external news/market-event ingestion is documented in this page.** Everything named is first-party (CRM + Graph). The 2026 wave-1 plan mentions "additional data sources" and "automatically linked meetings to CRM records using AI" but I could not fetch the plan itself (redirect) — see `## Unverified`.
- **No confidence, no citations, no approve/reject.** Feedback is a `/share` debug dump to a Microsoft rep. [T1]

#### A1.8 LinkedIn Sales Navigator

| Surface | What LinkedIn says it does |
|---|---|
| **Account IQ** | "delivers instant, high-impact insights on target accounts and helps sellers **save time on research**, personalize outreach, and prepare smarter, faster **account plans**." Surfaces "**strategic priorities, likely pain points, how the company makes money, financials** and more, in one place." [T1 help + T3 blog] |
| **Lead IQ** | Person-level: "experience, achievements, interests, commonalities, and activities"; "passions, interests, or industry experience." [T3] |
| **Relationship Explorer** | "surfaces up to **eight** of the most relevant leads at an account based on the chosen target **Persona**"; find "hidden allies", "warm paths in", multi-thread. [T1 help] |
| **Buyer Intent** | "shows you which companies are actively showing interest"; account pages list activities taken **in the last 30 days** by contacts at the account expressing intent. [T1 help] |
| **Product & service personalization** | Optional: "customized insights showing **why your product is a good fit**"; coaching on "how to best **map your solution to their business needs**." [T1 help / T3 blog] |

**Sources LinkedIn names:** "**First-party LinkedIn data** (for example, executive team, headcount growth and decline)" and "**Public information**." [T1 help]

**Notable for the gap check:**
- Account IQ is the **only studied product that ships an explicit "map your solution to their business needs" surface** — the closest thing anyone has to my step 7. But it is configured from a free-text product description, not from a structured service catalog. See `## Unverified` and Part C.
- LinkedIn documents **coverage gaps honestly**: "Account IQ isn't currently available for all companies" and "some sections of the insights might not be displayed." [T1] No competitor states this.
- **No citations, no confidence scores.** [T1]

#### A1.9 Dow Jones Factiva

_pending_

#### A1.10 Clay

_pending_

### A2. Cross-vendor step map (which vendor names which step a separate surface)

_pending_

### A3. GAPS — steps/tasks I am missing

_pending_

### A4. OVER-SPLITS — steps I carry that no vendor treats as separate

_pending_

---

## PART B — COMPETITOR CLASSES (judged at the sub-job level)

### B0. Sub-job decomposition used for judging

_pending_

### B1. Direct competitors — sells this job

_pending_

### B2. Indirect substitutes — solves the pain another way

_pending_

### B3. Same-vendor overlap — Oracle and NVIDIA products that already ship part of it

_pending_

---

## PART C — THE HONEST GAPS

_pending_

---

## Sources

_pending_

## Unverified

_pending_
