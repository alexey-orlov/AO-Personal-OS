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

## Executive answer

1. **Nobody decomposes this job into steps.** Ten vendors, four different taxonomy *shapes*: content-and-agent-shaped (AlphaSense), signal-pipeline-shaped (ZoomInfo, Clay, Demandbase), job-role-shaped (Salesforce), and surface-shaped (Microsoft). A 12-step pipeline is my model, not the market's — so "which step do vendors name" is the wrong question; "which steps does anyone *sell separately*" is the right one, and the answer is: ingest, entity-resolve, deliver.
2. **Step 8 (cross-account ripple) is empty for all ten.** Not under-marketed — absent. And yet the graph exists and is *quantified*: Bloomberg's **SPLC** covers 900k supplier–customer relationships, 200k with revenue exposure attached, built on the ASC 275 >10%-of-revenue disclosure rule — sold to **investors**. Supply-chain risk vendors (Resilinc, Interos, Everstream) traverse the same edges **inbound** for procurement. Nobody traverses them **outbound for a seller**.
3. **Step 7 (map to the seller's own catalog) has exactly one shipped implementation** — LinkedIn Account IQ's "why your product is a good fit", driven by a free-text product blurb. Everything else is RAG over sales collateral.
4. **Step 11 (human review) is nearly empty too**, and unlike step 8 it is not hard. Only Klue ships triage as a stage; Moody's ships an editable credit memo. This is the cheapest available differentiator.
5. **Fourteen tasks are missing from my 12 steps.** The six that matter: cadence/recurrence as an object, delta reasoning ("what changed"), output-format-as-input, the signal-type catalog, **source licensing rights**, and human triage as distinct from machine filtering.
6. **Five of my steps are probably over-split.** Strongest: 5+6 (retrieve/rank + reason) are one atomic agent call in every product; 3+4 (dedupe + entity-resolve) are one normalization step; step 9 mostly restates 6 and 10.
7. **No direct competitor wins more than three of the seven sub-jobs.** The corpus belongs to AlphaSense/Factiva/Moody's (licensing, not crawling — structurally unbeatable by a build); first-party grounding belongs to Microsoft/Salesforce; nobody owns the catalog mapping or the governance.
8. **Every vendor's claim is about time saved, none about being right.** "60 minutes to 60 seconds", "90% of research time", "~3 hours per prospect", "up to 30%". Zero published accuracy claims for the implication step, and zero calibrated confidence anywhere.
9. **The analyst data says this is exactly where deployments will fail.** Gartner expects 95% of sellers' research workflows to begin with AI by 2027, AI agents to outnumber sellers 10:1 by 2028 — and **fewer than 40% of sellers to say agents improved productivity**, with "agent sprawl" and data foundations named as the cause [T2].
10. **The defensible shape, if one is being packaged:** licensed/first-party grounding + a structured seller catalog + evidence-class labelling + a triage/approval stage + a "nothing happened" state. Each of those is individually unglamorous and collectively unoccupied.

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

| Surface | What Demandbase says it is |
|---|---|
| **Context Intelligence** | "a proprietary layer applying **company-specific GTM context** to analyze account signals and patterns **against pipeline goals**." [T3 press release] |
| **Demandbase MCP** | "a secure, intelligent gateway that enables natural language access to **both first-party Demandbase tenant data and third-party B2B intelligence**, allowing AI agents like Claude, ChatGPT, and other agents to retrieve insights on companies, people, engagement, intent, and more." Exposes "deep company, contact, technographic, and intent data" to ChatGPT, Claude, Copilot, Gemini. [T3] |
| **Demandbase AI Chat** | Prompt-based insights for Pipeline Influence measurement and GTM performance analysis. [T3] |
| **Site Customization Agent** | Conversational refinement of campaign-matched landing pages. [T3] |
| **Pipeline Predictive Score** | "Account-specific… shows which accounts are displaying patterns of buying behavior." [T2 review aggregators] |
| **Data graph** | "native B2B data graph (firmographics, contact data, technographics, and **owned intent signals**)" + B2B DSP + sales intelligence + ABX orchestration. [T2] |

**Notable for the gap check:**
- **Demandbase is the one vendor that has conceded the reasoning layer to general-purpose LLMs.** Its MCP is explicitly a *gateway* that lets Claude/ChatGPT/Gemini do the "so what". That is a strategic statement: the defensible asset is the data + entity graph, not the analysis. Directly relevant to Part B2.
- "**against pipeline goals**" is the only place any vendor ties the implication back to *the seller's own commercial targets* — a weak cousin of my step 7.
- The AI release contains **no** account-research/briefing agent, and **no** mention of grounding, citations, or human review. [T3]

#### A1.4b Where Demandbase and 6sense actually differ from the rest

Both ABM vendors sell **account-level propensity**, not **event-level implication**. They answer "which accounts are in market" — a *ranking* problem. They do not answer "this specific filing means this specific thing for this specific account" — a *reasoning* problem. That distinction is the single most useful thing Part A produced, and it survives into Part B.

#### A1.5 Klue

**Named surfaces (Klue's own words, T3 product page):**

| Surface | What Klue says it is |
|---|---|
| **Compete Agent** | "Automatically **collect, curate, and share** competitive intel throughout your organization." |
| **Auto Insights** | "Auto-generating content for competitive research, sellers in live deals, and **the trusted source for your internal LLM**." |
| **Deal Support** | "Competitive deal support across your entire pipeline." |
| **Win-Loss Suite** | Win-Loss, Human Expert Interviews, **AI Interviewer**, Blindspots Interviews, Win & Loss Story Agent. |
| **Itemised features** | Real-Time Alerts & Competitor Monitoring · **Intel Triage Tools** · AI-Powered Review Analysis · Browser Intel Extensions · Dual-Purpose Analytics Suite · Built-In Intel Newsletters · **Dynamic Battlecard Creation** · Win-Loss Analysis. |

**Klue's own stage names (verified verbatim from Klue's methodology post, T3):**
1. **Collect** — "Collect Market and Competitive Intelligence" via the Klue browser extension, Alerts **monitoring 3.5 million sources**, and email submissions.
2. **Curate** — "Curate Insights and Competitive Strategy" via Dashboards, Competitor Profiles built from topical boards, and Sales Battlecards.
3. **Distribute** — "Distribute & Compete with Sales Battlecards" through on-demand access, email digests, integrations, and mobile.

On triage, Klue's own words are that the curator can "**kick it to the curb as not relevant**" and that "**Klue will learn and filter algorithms will improve over time**" — i.e. the human triage decision is explicitly a *training signal*, the only vendor in the set to say so. Klue does **not** document deduplication mechanics beyond relevance filtering [T3].

**Taxonomy shape:** the explicit **collect → curate → distribute** triad, plus a *feedback* loop (win-loss) that none of the sales-intelligence vendors have.

**Corporate note (verified, because it is easy to get wrong):** Klue has bought its way into both ends of the loop — **DoubleCheck Research** (win-loss) and **Ignition** ("an agentic AI platform built for product marketers") [T3 klue.com blog; T2 BetaKit]. Separately, **Crayon** the competitive-intelligence platform is a *different company* from **Crayon Group Holding**, the Norwegian IT advisory firm SoftwareOne completed acquiring on 2025-07-02 [T2]. Klue and Crayon (CI) remain distinct competitors; **no Klue–Crayon merger has occurred** [T2]. I did not study Crayon's own docs in depth — see `## Unverified`.

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

**Spring '26 release (launching 2026-02-23) — the strongest Salesforce statement on this exact job** [T3 salesforce.com newsroom, verbatim]:
> "Agentforce now **removes the heavy lift of account research**, giving sellers an instant, always-complete view of every customer." … "It continuously pulls together insights from **Salesforce, third-party data, conversations, and more** so your account intelligence is always fresh, aligned, and actionable." … "With automated research, synthesized summaries, and clear next steps, sellers can **prep for meetings in seconds instead of hours**."

Also new: **Sales Workspace** — "brings together agents, analytics, and predictive insights in a new, intelligent hub for every rep"; a lens onto "how Agentforce has been helping them across meetings, Opportunities, Leads, **Account Research**, and more." [T3]
The release announcement makes **no mention of human review, approval, citations, or confidence** and does not state GA status per feature. [T3]

**Financial-services branch, for contrast** [T3 salesforce.com FS use-case page]: the named meeting-prep artifacts are **Wealth Client Interaction Summary** (GA Oct 2024) and **Business Relationship Plan Interaction Summary** ("coming soon"). They consolidate **only internal CRM data** — "emails, call notes, and past conversations with clients" — over Accounts, Cases, Financial Plans, Financial Goals and Interaction Summaries. **No external news or market events, no compliance/approval workflow documented**, and a forward-looking-statements disclaimer. That is a notable contrast with Moody's, whose FS answer *starts* from headlines.

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

| Surface | What Dow Jones says it is |
|---|---|
| **Dow Jones Intelligent Identifiers (DJID) / Factiva Taxonomy** | ~**350,000 taxonomy codes** covering industries, regions, news subjects, companies and organizations, used to classify Factiva content. Each item has a **unique Factiva Code**, with lookup by **Dow Jones Ticker, CUSIP, DUNS and ISIN**. The **DJID Taxonomy API** lets you "look for exact codes from a search string, such as searching for a company name to retrieve its corresponding code" (`GET /factiva-companies/search`). [T1 developer docs via API registries] |
| **Factiva Smart Summary** | Launched Nov 2024. Summaries "fully transparent and traceable," drawing on "thousands of trusted news sources that Dow Jones has **licensed for specific GenAI uses**." Built on Google Gemini on Google Cloud. [T2/T3] |
| **Alerts / curated newsletters** | "customized alerts to support decision-making in areas like competitive intelligence and reputational risk management"; track "market trends, executive movements, mergers and acquisitions, and industry developments through **APIs, feeds, and curated newsletters**." [T3] |
| **Factiva Feed for GenAI · Dow Jones Newswires GenAI Feed** | Content feeds explicitly licensed for GenAI consumption. [T3] |
| **Dow Jones Integrity Check · RiskCenter Advanced Screening and Monitoring** | Risk/compliance screening and monitoring. [T3] |

**Notable for the gap check:**
- Factiva is the only vendor here where **entity resolution is a licensed, versioned, API-addressable asset with an identifier system** (DJID, ~350k codes, cross-walked to ticker/CUSIP/DUNS/ISIN). My step 4 treats entity resolution as a processing step. Factiva treats it as **a data product with a schema**.
- **Content licensing is a first-class capability.** "Licensed for specific GenAI uses" is not a feature, it is a legal precondition — and it is the one thing an in-house build genuinely cannot reproduce. My 12 steps have no notion of *source rights*.
- I could **not** verify Dow Jones documenting **deduplication of the same story across sources** as a named capability — see `## Unverified`.

#### A1.10 Clay

| Surface | What Clay says it is |
|---|---|
| **Audiences** | "Centralize your **first and third party data sources** in Clay." [T1 clay.com] |
| **Data Marketplace / Waterfall** | "Buy data from 200+ providers in one place"; "Combine multiple data providers for the best coverage" — providers run in sequence, credit charged only on a hit. [T1/T2] |
| **Claygent** | "Research target companies and people with AI" — a web research agent that browses any URL and answers custom research questions. **Claygent Builder** adds "version control, A/B testing, and risk-free prompt development." [T1 clay.com + Clay docs] |
| **Account Agents** | AI-powered research at the account level. [T1] |
| **Custom Signals** | "Turn **any of Clay's 200+ enrichments or an AI agent query** into a signal." Named types: **web intent, product usage, tech stack, social listening, funding news, career movement**. [T1 clay.com/signals] |
| **Signal actions** | Book meetings, turn visitors into pipeline, **"sending bundled and prioritized Slack messages per account"**, alert reps, run ads, **update CRM lead scoring**, queue AI emails, auto-generate prospects. [T1] |
| **Workflows / Functions / AI Formatting** | Orchestration, custom logic, data standardization. [T1] |
| **CRM sync** | "automatically sync back to the **right account** in your CRM"; "identify duplicates" in bulk CRM enrichment; "automated **ICP scoring** before syncing to Salesforce." [T1] |
| **MCP for Reps · Agent Plugin CLI/API** | Expose Clay data to the rep's AI tools; build Clay tables via a coding agent. [T1] |

**Notable for the gap check:**
- Clay is the only vendor that makes **"an AI agent query IS a signal"** an explicit primitive. That collapses my steps 2, 3 and 6 into one composable unit — the most interesting architectural idea in the whole vendor set.
- **"Bundled and prioritized Slack messages per account"** is a named delivery behaviour. It is my steps 3+4+9+12 compressed into one product decision: *one message per account per period, ranked*.
- **Claygent Builder ships prompt version control and A/B testing.** No other vendor in the set exposes *evaluation of the reasoning step* as a user-facing surface. That is a real gap in my list — see A3.

### A2. Cross-vendor step map

**Legend:** ● = a **separately named product surface** the buyer can point at · ◐ = shipped but folded inside another surface · ○ = not found in that vendor's current docs.

| My step | AlphaSense | ZoomInfo | 6sense | Demandbase | Klue | Salesforce | MS Copilot | LinkedIn SN | Factiva | Clay |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 Account universe | ◐ (watchlist) | ● Audiences | ◐ ICP/segments | ● Audiences | ● Rivals | ◐ (CRM list views) | ○ | ◐ (saved lists) | ◐ (watchlist) | ● Audiences |
| 2 Ingest signals + first-party | ● Workspaces (5k docs) / Enterprise Intelligence | ● Signals (15+ types) | ● Signalverse | ● data graph + MCP | ● Compete Agent (collect) | ◐ Data Cloud / RAG | ● CRM + Graph connectors | ◐ 1st-party LinkedIn + public | ● Feeds / APIs | ● Data Marketplace + Waterfall |
| 3 Filter + **dedupe** | ○ | ◐ (Pulse ranking) | ○ | ○ | ● **Intel Triage Tools** | ○ | ○ | ○ | ◐ (taxonomy filters) | ◐ ("identify duplicates", CRM) |
| 4 Entity resolution | ◐ ("@" company picker) | ◐ ("grouped by account") | ● **Company Graph** | ● data graph | ◐ (competitor mapping) | ◐ | ◐ (auto-link meeting→CRM record) | ◐ | ● **DJID / ~350k codes** | ● "sync back to the right account" |
| 5 Retrieve + rank evidence | ● Generative Search (Auto mode) | ● Pulse Feed | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ● Search | ● Claygent |
| 6 Reason the "so what" | ● **Deep Research / Workflow Agents** | ◐ | ◐ (stage prediction) | **deliberately outsourced via MCP** | ● Auto Insights | ● **Account Management agent ("perform deep research")** | ◐ ("3 high-value AI highlights") | ● **Account IQ** | ● Smart Summary | ● Claygent |
| 7 Map to **seller's own catalog** | ○ | ◐ (sales plays in workflows) | ○ | ◐ ("against pipeline goals") | ● **Battlecards** (vs competitor, not to catalog) | ◐ ("grounded in… product data"; Engagement Agent uses "product FAQ, case studies, and **sales plays**") | ○ | ● **"why your product is a good fit"** (free-text product description) | ○ | ◐ (prompt-level) |
| 8 **Second-order / cross-account ripple** | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| 9 Magnitude + confidence + citations | ◐ **citations only, no confidence** | ○ | ◐ fit/intent/stage score (propensity, not per-item confidence) | ◐ Pipeline Predictive Score | ○ | ○ | ○ | ○ | ◐ "transparent and traceable" | ○ |
| 10 Assemble artifact | ● Report / Grid / **Slides** | ◐ | ○ | ○ | ● Battlecards / Newsletters | ● Account brief | ● **Meeting prep card** | ● Account IQ panel | ● Smart Summary / newsletters | ◐ (table columns) |
| 11 Human review / approve | ○ | ○ | ○ | ○ | ● **Triage** (curate before publish) | ◐ (Pipeline agent has "suggestive or autonomous modes") | ○ (`/share` debug only) | ○ | ○ | ◐ (table = review surface) |
| 12 Deliver downstream | ◐ (alerts, Notion index) | ● Workflows / Activation | ● Email Agents / orchestration | ● DSP / ABX orchestration | ● Salesforce, HubSpot, Gong, Chorus, Slack | ● **Slack, ChatGPT, mobile** | ● Outlook / Teams cards | ◐ (in-product) | ● APIs, feeds, newsletters | ● CRM sync, Slack, Sequencer, Ads |

**Read of the map:**
- **Step 8 is empty across all ten vendors.** Nobody ships cross-account ripple reasoning as a surface. Held for Part C.
- **Step 11 is nearly empty.** Only Klue (triage) and, weakly, Salesforce (suggestive vs. autonomous) and Clay (the table is the review surface) give the human a place to stand. This is the largest *shipped-product* gap, and unlike step 8 it is not hard — it is just unglamorous.
- **Step 9 splits into two different things** that vendors conflate: *account-level propensity* (6sense, Demandbase — shipped, mature) and *per-claim confidence on an individual implication* (nobody). My step 9 currently means the second; the market word "score" means the first. Naming collision to be careful about.
- **Steps 2 and 12 are where everyone competes** and where nothing is differentiated.

---

### A3. GAPS — steps and tasks I am missing

Fourteen. Over-returned as instructed; the first six are the ones I would actually act on.

**G1 — Recurrence / cadence is a first-class object, not a run.**
AlphaSense ships **Custom Agents with a monthly scheduling cadence and dynamic variables via an "@" placeholder**; Deep Research "can be scheduled"; Document Search Alerts are daily/weekly [T1]. Clay's Signals are standing monitors, not runs. My 12 steps describe **one pass**. The real product is a **standing subscription per account** with a cadence, a diff against last run, and a "nothing material this period" state. *Missing task: schedule / cadence configuration, and suppression of unchanged output.*

**G2 — "What changed since last time" (delta reasoning).**
Implied by every alerting product but named by none; strongly implied by ZoomInfo's Pulse Feed being *daily* and by Klue's newsletters. A briefing that re-states last month's facts is worthless. *Missing task: state carry-over and change detection against the previously delivered brief.*

**G3 — Output format is chosen before the run, not after.**
AlphaSense makes the user pick **Report vs. Grid vs. Slides** as a tile before generation, and filters differ by output type [T1]. My step 10 treats the artifact as a rendering afterthought. It is actually an *input* that changes retrieval depth and structure. *Missing task: output-contract selection.*

**G4 — Signal taxonomy as a configurable, named asset.**
ZoomInfo: "**15+ signal types**" [T1 IR]. Clay names six and lets you define more. Factiva has ~350k classification codes [T1]. My step 2 says "ingest signals" with no typology. The typology is what makes filtering, routing and scoring possible at all. *Missing task: define and maintain the signal/event-type catalog.*

**G5 — Source licensing and rights.**
Factiva's differentiator is literally "licensed for **specific GenAI uses**" [T2/T3]; it ships separate "Feed for GenAI" products. AlphaSense's moat is a licensed "premium content universe of 500M+ documents" including broker research [T3]. My 12 steps contain no step where you establish *whether you are allowed to put this source into a model and redistribute the output*. For an enterprise buyer this is a procurement blocker, not a footnote. *Missing task: source-rights / licensing gate.*

**G6 — Triage as a human workbench, distinct from machine filtering.**
Klue ships "**Intel Triage Tools**" as a named feature [T3]. My step 3 (machine filter+dedupe) and step 11 (review the finished artifact) leave out the middle: a human sweeping the raw inbound and marking keep/kill/merge *before* anything is written. This is also the cheapest place to collect training signal.

**G7 — Volume budgeting / per-rep quota.**
ZoomInfo advertises "**up to 1,000 daily signals**" [T1 IR]; Clay ships "**bundled and prioritized Slack messages per account**" [T1]; Microsoft caps the meeting list at 5 and CRM results at **30 records per response** [T1]. Every mature product enforces a ceiling. My step 9 ranks but never truncates. *Missing task: decide how many items a human gets, per account, per period.*

**G8 — Permission-trimming and data-access scoping.**
Microsoft documents it explicitly: "Sales agent **only surfaces information you have permission to access**" [T1]. In a real CRM, the brief must not leak another team's opportunity. My step 2 says "ingest first-party context" with no access-control notion. *Missing task: per-viewer entitlement filtering.*

**G9 — Coverage/availability honesty (the "no data on this account" state).**
LinkedIn documents that "Account IQ **isn't currently available for all companies**" and "some sections of the insights might not be displayed" [T1]. Long-tail and private accounts are the majority of most books. My list implicitly assumes every account yields a brief. *Missing task: declare and display coverage gaps rather than hallucinating into them.*

**G10 — Evaluation of the reasoning step itself.**
Clay ships **Claygent Builder** with "version control, A/B testing, and risk-free prompt development" [T1]. AlphaSense ships a **"Thesis Checker"** agent [T1]. My list has no step where the quality of step 6 is measured or regression-tested. *Missing task: prompt/agent versioning and eval.*

**G11 — Outcome feedback loop (did it help?).**
Klue is the only vendor with a structural answer: the **Win-Loss Suite**, including an **AI Interviewer** and "Blindspots Interviews" [T3]. My step 11 is *approve/reject the artifact*; nothing closes the loop from *deal outcome* back to *signal quality*. (This matches P1's step 10 finding that the loop is "chronically skipped".)

**G12 — Consumption surface as a design variable.**
Salesforce ships briefs "in **Slack, ChatGPT, and mobile**" [T2/T3]; Microsoft's whole taxonomy is surface-shaped; Demandbase and Clay both ship **MCP** so the brief is consumed inside someone else's assistant. My step 12 says "deliver downstream" as if it were a webhook. Where it is read changes what it must contain.

**G13 — Enrichment waterfall / source fallback.**
Clay's core primitive: run providers in sequence, "only charges a credit if a provider finds a result" [T1/T2]. My step 2 assumes sources are a set. In practice they are an *ordered* set with cost and hit-rate per tier.

**G14 — The corpus as a governed object other systems read.**
Klue: "**the trusted source for your internal LLM**" [T3]. Demandbase/Clay MCP servers. The output of this job is increasingly *not* a document for a human but a retrieval corpus for other agents. My step 10 assumes a human reader.

---

### A4. OVER-SPLITS — steps I carry that no vendor treats as separate

Five candidates, ranked by how confident I am that the split is wrong.

**O1 — Steps 5 and 6 (retrieve/rank evidence · reason the "so what") are one step in every product.** Strong.
AlphaSense's **Deep Research** and **Workflow Agents**, Salesforce's *"perform deep research"* action, LinkedIn's **Account IQ**, Factiva's **Smart Summary**, Clay's **Claygent** — every one of them is a single invocation whose internals are retrieval+reasoning. No vendor exposes "ranked evidence" as an artifact the user sees before the reasoning. *The market treats agentic retrieval and synthesis as one atomic unit.* Keeping them apart is only justified if the product deliberately shows the evidence set for review — which would be a differentiator, not a default.

**O2 — Steps 3 and 4 (filter/dedupe · entity resolution) are one step.** Strong.
ZoomInfo ships one thing: a Pulse Feed "**grouped by account**". 6sense's Company Graph "resolves raw signals into cited intelligence" — resolution and relevance in one motion. You cannot judge whether a story is relevant *until* you know which entity it is about, and dedup is largely a by-product of having resolved entities. In practice this is a single **signal-normalization** step.

**O3 — Steps 1 and 2's first half (define universe · ingest first-party context) collapse.** Medium.
ZoomInfo, Demandbase and Clay all call this one thing — **Audiences** — built *from* the CRM. The account universe is not defined independently and then joined to CRM; it *is* a query over CRM plus enrichment. Splitting them implies a manual scoping step that only the largest enterprises actually perform separately.

**O4 — Step 9 (score magnitude + confidence + attach citations) bundles three unrelated things, and two of them are not separate steps.** Medium.
Citations are a *property of generation* (AlphaSense's "granular citations", Factiva's "transparent and traceable") — emitted inline, not attached afterward. Magnitude is part of reasoning (step 6). Only **confidence** is arguably its own act, and no vendor ships it (see Part C). So step 9 as written is mostly a restatement of steps 6 and 10.

**O5 — Step 11 (human review) as a pipeline stage vs. a property of the surface.** Weak — I think my split is right and the vendors are wrong.
No vendor except Klue makes review a stage; Salesforce's version is a mode toggle ("suggestive or autonomous"), Clay's is "the table exists". But the absence here looks like a genuine market gap (see Part C), not evidence of over-splitting. Keep the step; note that shipping it will be read as unusual.

**Not over-split, defended:** step 7 (map to the seller's own catalog) and step 8 (ripple). Only LinkedIn ships anything resembling step 7, and nobody ships step 8 — which is a reason to keep them named, not to fold them away.

---

## PART B — COMPETITOR CLASSES (judged at the sub-job level)

### B0. Sub-job decomposition used for judging

Competitors are judged per sub-job, not per category label. Seven sub-jobs, derived from the A2 map by collapsing the over-splits found in A4:

| # | Sub-job | Plain-English test |
|---|---|---|
| **SJ-1** | **Own the corpus** | Do you have the sources, licensed, at coverage? |
| **SJ-2** | **Normalize the signal** (entity-resolve + dedupe + relevance) | Can you say "this story, once, is about *our* Acme Inc."? |
| **SJ-3** | **Ground in first party** | Can you see our CRM, our conversations, our service history — with permissions honoured? |
| **SJ-4** | **Reason the "so what"** | Can you get from event → implication for this account? |
| **SJ-5** | **Map to our own offerings** | Can you say which of *our* service lines this implication buys? |
| **SJ-6** | **Package + deliver where work happens** | Does it land in the meeting, the CRM, the Slack channel, the assistant? |
| **SJ-7** | **Govern it** (triage, review, confidence, audit, feedback) | Can a human stand behind it in front of a client? |

### B1. Direct competitors — sells this job

**Who wins each sub-job:**

| Sub-job | Winner | On what dimension | Runner-up |
|---|---|---|---|
| SJ-1 corpus | **AlphaSense** (500M+ licensed docs incl. broker research, expert calls) / **Factiva** (licensed for named GenAI uses, ~350k taxonomy codes) | *Licensing*, not crawling. Structurally unbeatable by a build. | Moody's (ratings + Orbis) for credit |
| SJ-2 normalize | **Factiva** (DJID codes ↔ ticker/CUSIP/DUNS/ISIN) | Identifier cross-walk, i.e. it survives contact with a messy CRM | 6sense Company Graph; Common Room Person360 (person-level) |
| SJ-3 first party | **Microsoft Copilot for Sales** | Depth + documented **permission-trimming**; CRM + Outlook + Teams natively | Salesforce Agentforce (Data Cloud); Common Room (CRM+product+Gong) |
| SJ-4 "so what" | **AlphaSense Deep Research / Workflow Agents** | Analyst-grade output with granular citations; schedulable | Common Room RoomieAI Capture; Salesforce Account Management agent |
| SJ-5 map to own offerings | **LinkedIn Sales Navigator Account IQ** — *and it is weak* | Only shipped "why your product is a good fit" surface. Free-text product description, not a catalog. | Introhive (service-line whitespace, professional services); Salesforce Engagement Agent (sales plays) |
| SJ-6 package + deliver | **Salesforce Agentforce** (Slack + ChatGPT + mobile) / **Common Room** (Slack + daily email) | Distribution into the incumbent workflow | Microsoft (Outlook/Teams cards); Clay (CRM, Slack, ads, sequencer) |
| SJ-7 govern | **Klue** (Intel Triage + win-loss feedback) | The only shipped human-in-the-loop *stage* | Moody's Automated Credit Memo ("fully written and **editable** narrative") |

**The nine direct competitors, with what they actually sell:**

1. **AlphaSense** — sells SJ-1 + SJ-4. Deep Research + Workflow Agents + Enterprise Intelligence (internal document libraries alongside the licensed corpus, "20+ everyday work systems" via Connectors, SCIM user management, entitlements). **Does not sell SJ-5**, and CRM is not a documented connector [T1 developer docs — see `## Unverified`]. Wins on evidence quality and citation granularity; loses on CRM grounding and on catalog mapping.

2. **Common Room — acquired by Zoom, announced and closed July 2026** [T1 Zoom newsroom / GlobeNewswire; terms undisclosed]. Zoom's own framing: Common Room "turns fragmented signals and siloed customer data into complete, person-level buyer intelligence and activates it with AI agents", to be folded into **Zoom Revenue Accelerator** [T1]. This is the **closest single product to the whole job**. `Person360™` (identity unification across CRM, product, marketing, engagement) + `RoomieAI™ Capture` (account research over "earnings calls, 10-Ks, news articles, podcasts" *and* "Gong recordings, CRM records, product usage data", against **user-chosen research topics**, results surfaced in the account profile and filterable into workflows) + `RoomieAI™ Spark` / **Spark Brief** (a **daily morning email** summarizing "the most interesting buyer activity across your book of business" — web-visit spikes, job changes, company news — plus contacts, "who to engage, why they matter, and what to do next"). Claims "60 minutes to 60 seconds" and "90% on research time" [T3 blog]. **Docs make no mention of dedup, entity resolution at company level, confidence, citations, or human review** [T1 docs]. Wins SJ-3+SJ-4+SJ-6 combined; loses SJ-5 and SJ-7 entirely.

3. **Microsoft 365 Copilot for Sales** — wins SJ-3 outright. Meeting-prep card, account/opportunity summary, admin-configurable summary fields, permission-trimmed answers. **No documented external news ingestion** on the current Learn pages. Loses SJ-1 and SJ-5.

4. **Salesforce Agentforce** — the **Account Management Agent** is the single closest named product to the brief: "embedded account research with company overviews, key performance indicators, competitive insights, and industry trends", "always-up-to-date account intelligence pulling from **Salesforce, web, third-party sources, conversations, and enablement materials**", delivered as "account briefs and meeting preparation in Slack/ChatGPT/mobile" [T3 salesforce.com]. Note "**enablement materials**" — that is the nearest thing to SJ-5 shipped by a CRM vendor, but it is retrieval over collateral, not a mapping to a structured service catalog. Wins SJ-6; strong on SJ-3; weak on SJ-1.

5. **Aomni** — sells exactly this job to sellers: research → strategy → engagement, "1,000+ data points per account from 20+ sources", structured account strategy with per-stakeholder messaging; claims ~3 hours saved per prospect [T3 only — aomni.com returned 503, all claims are secondary; see `## Unverified`]. **Notable: Oracle and NVIDIA are cited as customers** [T3] — relevant to Part B3 framing.

6. **Rox** — "a single **System of Context** — a unified data fabric that blends your private CRM data with public intelligence", with per-account agent swarms (account monitoring, prospecting, CRM enrichment); $1.2B valuation Mar 2026 [T2/T3]. Its own homepage documents only an **Outbound Agent** and carries a disclaimer that autopilot features "operate within user-defined parameters and require initial configuration and ongoing oversight" [T1]. The *positioning* is a direct hit on this job; the *documented* surface is much narrower. See `## Unverified`.

7. **Introhive** — the professional-services-firm answer, and **the only vendor whose value proposition is explicitly service-line cross-sell**. Ships `Signals` ("proactively surface critical signs of risk or opportunity"), `AI account summaries`, `Pathways` (2nd/3rd-degree relationships), `Champion Tracking`, `Alumni Tracking`, `Lonely Client Analysis`, `Succession Planning`, and **"pre-meeting and on-demand email digests packed with rich insights into critical events like leadership changes or industry news to help identify opportunities to offer new services"** [T3 introhive.com]. Named verticals: legal, accounting, consulting, built environment. This is the nearest competitor to a *seller-catalog-aware* briefing, and it is aimed at exactly the buyer a professional-services accelerator pack would target.

8. **Moody's** — the financial-services direct competitor, and the most *complete* one on governance. `Research Assistant` ("generates bespoke company or sector research for **client meeting preparation** in business development", claims up to 30% research time saved), `Early Warning System` ("monitors headlines and alerts clients to breaking news that may impact **their portfolios**" — signal → portfolio mapping, i.e. SJ-2 at book level), `Loan Monitoring` ("risk prioritization by identifying trends and patterns across your portfolio"), `Automated Credit Memo` ("fully written and **editable** narrative" — an explicit human-edit step) [T1 moodys.com]. Also `QUIQspread`, `Automated Covenants`.

9. **ZoomInfo GTM Workspace + Klue** (a pair, not one product) — ZoomInfo wins the signal feed (15+ types, 1,000/day, grouped by account); Klue wins triage and the curated artifact. Neither alone does the job; together they approximate it. That they are *not* one product is itself a market observation.

**What the B1 table says in one line:** no single direct competitor wins more than three of the seven sub-jobs, and **SJ-5 (map to the seller's own offerings) has no strong winner at all** — LinkedIn's version is a free-text blurb and Introhive's is a relationship-graph inference, not a catalog mapping.

### B2. Indirect substitutes — solves the pain another way

_pending_

### B3. Same-vendor overlap — Oracle and NVIDIA products that already ship part of it

_pending_

---

## PART C — THE HONEST GAPS

The four named in the brief, plus three more the research surfaced. Each is stated as *what is missing*, with the evidence that it is missing rather than merely un-marketed.

### C1. Cross-account ripple reasoning — **nobody ships it, in any adjacent market**

**Evidence of absence:** step 8 is the only row in the A2 map that is empty (○) for all ten vendors. No account-intelligence, ABM, sales-intelligence, CI or news-analytics vendor examined names a capability that reasons "this event at company X implies something for company Y because Y supplies / sells to / competes with X."

**But the graph exists — in a different industry.** Multi-tier relationship graphs are a mature, shipped product category in **supply-chain risk**:
- **Resilinc Multi-Tier Mapping** — "builds a digital twin of the full supply network, tracing the network from raw material suppliers through to final assembly", identifies "part-to-site links across all tiers using 15+ years of validated data", detects "critical nodes and bottlenecks that standard ERP tools miss" [T3 resilinc.ai].
- **Interos** — n-tier mapping, "uncovers Nth-party risk", identifies "high-risk tier 2 and tier 3 companies and understand how they connect to you" [T3 interos.ai].
- **Everstream Discover** — "reviews multiple supplier tiers to identify risks from sourcing through receiving", using "digital twins… of its supplier network" [T3].

**And a quantified, bi-directional version already exists — in a capital-markets terminal.** Bloomberg's **SPLC** function:
- covers "**900,000 identified global supply chain relationships**"; load an equity and "all the company's suppliers **and customers** will display" [T3 university library guides, which document terminal functions accurately];
- lets you "analyse **revenue exposure** for the central company, its suppliers, and its customers", plus geographic, commodity, sustainability and risk exposures [T3];
- is explicitly built on the disclosure rule: "**since companies are required to disclose customers representing over 10% of their revenue**", Bloomberg uses "bi-directional data — along with a team of industry analysts who utilize a proprietary algorithm to create estimates — to quantify companies' supply chain exposures on both the demand and production sides", yielding "**200,000 quantified supplier-customer relationships**" [T3];
- ships **SPLC GeoRiskFactors** measuring "supply chain exposure to specific countries by analyzing **point-in-time** supplier and customer relationships" [T3].

The underlying disclosure regime is real and citable: **ASC 275-10-50-16 through -20** requires entities deriving **>10% of total revenues from a major customer** to disclose the concentration, with "information adequate to inform users of the general nature of the risk"; ASC 280 governs the segment-reporting frame [T1 SEC EDGAR filings and SEC comment-letter correspondence].

**So the honest gap is precisely locatable, and it is not "can the graph be built":**

| Who has the graph | Direction they traverse it | Who it is sold to |
|---|---|---|
| Resilinc / Interos / Everstream | inbound — *my* suppliers' risk | procurement, supply-chain risk |
| Bloomberg SPLC | both, quantified by revenue exposure | **investors**, in a terminal |
| Every vendor in Part A | **none** | sales / coverage teams |

Nobody traverses it **outbound for a seller**: "company X had an event; which of *my accounts* is exposed to X as a supplier, customer or competitor, and what does that mean for them — and therefore for me." Those are the same edges Bloomberg already quantifies, read from the other end, for a different buyer.

**Why it stays unsolved (honest read, not vendor bashing):** three reasons, in order of weight.
1. **Buyer mismatch.** The graph is priced and packaged for investors and procurement. Neither AlphaSense-class research vendors nor ABM vendors have any reason to license a supply-chain relationship dataset for a sales seat.
2. **Coverage cliff.** The 10%-disclosure regime covers public issuers. For a private mid-market account, the customer-concentration edge essentially does not exist — and Bloomberg's own answer to that is *analyst estimates*, which is expensive and doesn't scale to a long-tail book.
3. **Citation difficulty.** "Acme had a bad quarter" is citable to a filing. "Therefore Beta is at risk" is an inference over an edge that may itself be an estimate — the exact claim type that needs the evidence-class labelling of C3, which nobody ships.

That makes this a **data-availability and packaging gap wearing the costume of a reasoning gap**. Worth naming precisely because the tractable subset — public accounts, disclosed >10% relationships, named-customer risk factors, public contract and tender awards — is small, sourceable, and completely unserved on the sell side.

### C2. Mapping to the seller's OWN service catalog — **one weak implementation, market-wide**

**What exists:**
- **LinkedIn Sales Navigator Account IQ** — the only shipped surface that says "why *your* product is a good fit" and coaches on "how to best map your solution to their business needs" [T1 LinkedIn help]. But it is driven by a **free-text product description** the admin types, not a structured catalog, and LinkedIn documents **no citations and no confidence** for it, plus honest coverage caveats [T1].
- **Salesforce Engagement Agent** — grounded in "product FAQ, case studies, and **sales plays**"; **Account Management Agent** pulls from "**enablement materials**" [T3]. This is RAG over collateral, not a mapping from implication → offering.
- **Introhive** — infers cross-service opportunity from the **relationship graph** ("who already knows a prospect or client"), whitespace and "Lonely Client Analysis" [T3]. It answers *who can sell* far better than *what to sell*.
- **Demandbase Context Intelligence** — analyzes signals "against pipeline goals" [T3]. Goals, not catalog.

**What does not exist anywhere in the ten vendors + nine direct competitors studied:** a surface where the seller **loads a structured catalog** (service lines, SKUs, delivery capabilities, qualifications, reference cases, price bands) and the system returns, per implication, **which specific offering it buys and why** — with the offering cited as precisely as the news is.

**Why this is the most commercially interesting gap.** Every vendor in Part A is a horizontal tool sold to thousands of sellers, so the catalog is necessarily the customer's problem. An accelerator pack built for one seller (or one seller archetype — a systems integrator, a professional-services firm, a bank's coverage team) can treat the catalog as *a first-class input*, which no horizontal product can. This is the sub-job (SJ-5) with no strong winner in B1.

### C3. Confidence calibration — **not shipped by anyone, and academically known to be hard**

**Vendor evidence (absence):**
- AlphaSense's entire trust story is **citation granularity**, not calibration — "deep-linked citations… the original source document and exact snippet" [T1]. Its Deep Research launch mentions **no** confidence metric, verification workflow, or required human review [T3].
- Factiva Smart Summary: "fully transparent and **traceable**" [T2/T3] — again provenance, not probability.
- 6sense and Demandbase ship **propensity** scores (fit/intent/stage; Pipeline Predictive Score) — a score *about the account*, not a confidence *about the claim*. Conflating these is the single most common category error in this market.
- Microsoft, Salesforce, LinkedIn, Common Room, Clay, Klue: **no confidence mechanism documented at all.**

**Academic evidence that it is genuinely unsolved, not merely unshipped:**
- Benchmarks report LLMs are "systematically overconfident when verbalizing", with verbal scores "cluster[ing] on a handful of round-number values, collapsing their discriminative power" [T2 arXiv 2609.10996].
- "calibration in autonomous **agents** remains notably sparse" — i.e. the tool-use/agentic setting is worse-studied than single-turn QA [T2 arXiv 2601.07264, *The Confidence Dichotomy: Analyzing and Mitigating Miscalibration in Tool-Use Agents*].
- Purpose-built work on exactly this artifact exists and is very recent: Yuan, Wang & Lei, *Towards Trustworthy Report Generation: A Deep Research Agent with Progressive Confidence Estimation and Calibration* [T2 arXiv 2604.05952], whose stated problem is that deep-research agents "generate claims without appropriate confidence indicators" and that "their internal confidence assessments often don't align with actual accuracy", producing reports that "appear authoritative but may contain unsupported or inaccurate information."

**The honest version of this gap:** a calibrated per-claim probability is a research problem. But **a calibrated *evidence-class* label is not** — "disclosed in a filing" vs. "reported by one trade outlet" vs. "inferred by the model from two weak signals" is a deterministic property of the retrieval path, is auditable, and is what a coverage banker or a partner actually needs before repeating a claim to a client. Nobody ships even that. The gap is real; the *tractable* version of it is much closer than the literature suggests.

### C4. First-party CRM grounding — **solved by the CRM vendors, absent from the research vendors, and undermined by the data itself**

**The split is clean and it is structural:**

| | Deep external corpus | Deep first-party grounding |
|---|---|---|
| AlphaSense, Factiva, Moody's | ✅ (licensed, 500M+ docs / ~350k codes / ratings) | ❌ — AlphaSense's Enterprise Intelligence indexes *internal document libraries* and "20+ everyday work systems", but **CRM is not a documented connector** [T1 developer.alpha-sense.com; see `## Unverified`] |
| Microsoft, Salesforce | ❌ (thin/undocumented external news) | ✅ — CRM + Graph + conversations, **permission-trimmed** [T1 Microsoft Learn] |
| Common Room, Rox, Clay | partial | partial |

**Common Room and Rox are the two making the explicit bet on closing it** — Common Room's Capture searches "earnings calls, 10-Ks, news articles, podcasts" *and* "Gong recordings, CRM records, product usage data" in one pass [T3]; Rox sells a "**System of Context** — a unified data fabric that blends your private CRM data with public intelligence" [T2/T3]. Neither documents entity resolution, dedup, confidence, citations or review [T1 Common Room docs; T1 rox.com].

**And then the data undercuts everyone.** Grounding in first-party data is only as good as the CRM:
- B2B contact data decays ≈**22.5% per year** at aggregate level, 25–30% for contacts, 70%+ for some field types; **65.8% of contacts change job title or function within any 12-month window** [T2/T3 aggregated vendor benchmarks — all downstream of ZoomInfo/Cognism data, treat with caution].
- **76% of CRM users say less than half their organization's CRM data is accurate and complete** [T3].
- Gartner: **trust in AI tools drops by 60% when sellers doubt data accuracy** [T2 restatement of Gartner; the Gartner page itself is paywalled — see `## Unverified`].

**So the honest gap is not "connect to the CRM".** It is that **no product treats first-party data as untrustworthy and shows its work.** Nobody says "I asserted this from a CRM field last touched 14 months ago." Microsoft's permission-trimming is the only first-party *governance* feature documented anywhere in the set, and it is about access, not freshness.

### C5. Human review as a stage — **almost universally missing, and it is the cheap one**

Step 11 is nearly empty in the A2 map. Only **Klue** ships a named review stage (**Intel Triage Tools**, plus curation before newsletter/battlecard publish) [T3]; **Moody's Automated Credit Memo** produces a "fully written and **editable** narrative" [T1]; **Salesforce Pipeline Management Agent** has "suggestive or autonomous modes" [T3]; Clay's table is a de facto review surface.

This matters because it is the named failure mode in the analyst data:
- Gartner: **"by 2027, 40% of enterprises will demote or decommission autonomous AI agents due to governance gaps identified only after production incidents"** [T2 restatement].
- Gartner (Dan Gottlieb, VP Analyst): *"more agents will not automatically mean more productivity… Without the right data foundation, workflow integration and seller experience, CSOs risk creating **agent sprawl**, with more digital activity, but little improvement in seller impact."* [T2 press release restatement, 2026-07-28]
- Gartner predicts **AI agents will outnumber sellers 10:1 by 2028, yet fewer than 40% of sellers will say agents improved productivity**; survey of **210 CSOs and senior sales executives, Jan–Feb 2026** [T2].
- Gartner also predicts **95% of sellers' research workflows will begin with AI by 2027, up from <20% in 2024** (survey of **227 CSOs, Aug–Sep 2025**, presented May 2026) [T2].

Read together: research-by-AI is about to become universal, and roughly six in ten sellers are expected to say it did not help. The differentiator will not be the research; it will be whether a human can stand behind the output. Almost nobody is building for that.

### C6. Recurrence and "nothing happened" — unserved

Only AlphaSense ships an explicit cadence object (monthly Custom Agents with dynamic variables; daily/weekly Doc Search Alerts) [T1]; Common Room ships a daily Spark Brief [T1]. **Nobody ships a documented "no material change this period" state.** Every product is optimized to produce output. An account-coverage product that runs weekly across 200 accounts must be optimized to *withhold* output — and that is the property that decides whether reps keep reading it in month three. Not a hard problem; simply not anyone's problem today.

### C7. Evaluation of the "so what" — one vendor, by accident

Clay's **Claygent Builder** ships "version control, A/B testing, and risk-free prompt development" [T1] — the only user-facing evaluation surface for the reasoning step in the entire set, and it is framed as a prompt-engineering convenience rather than a quality system. AlphaSense's **Thesis Checker** agent [T1] is adjacent (it checks a *user's* thesis, not its own output). Klue's triage-as-training-signal ("Klue will learn and filter algorithms will improve over time" [T3]) is the only feedback mechanism named anywhere.

Nobody publishes a benchmark, a golden-set methodology, or an accuracy claim for the implication step. Trade analysis of the category says the same thing about the *data* layer, where measurement is easier: "data accuracy in sales intelligence is hard to compare because every vendor measures it differently"; "**vendor accuracy claims are self-reported benchmarks, not independent audits**" [T3 comparison write-ups]. If that is true of a verifiable email address, it is more true of an unverifiable inference.

Given P1's finding that the "so what" is the core human decision, this is a conspicuous silence — every vendor claim I found is about **time saved** (Common Room "60 minutes to 60 seconds" and "90% on research time"; Aomni "~3 hours per prospect"; Moody's "up to 30%"; Salesforce "meetings in seconds instead of hours"; LinkedIn "save time on research") and **none** are about **being right**. Meanwhile golden-dataset evaluation and hallucination benchmarking are entirely standard practice elsewhere in AI [T3]. The methods exist; this category simply does not compete on them.

---

## Sources

**Tier key:** T1 = primary vendor product documentation / filings / developer docs · T2 = analyst firm, reputable trade press, peer-reviewed or arXiv · T3 = vendor marketing pages, press releases, blogs, review aggregators.

### Part A — vendor taxonomies

| # | Source | Tier |
|---|---|---|
| A-1 | AlphaSense Help Center — Product Updates April 2026 · https://help.alpha-sense.com/hc/en-us/articles/51403579155731-AlphaSense-Product-Updates-April-2026 | T1 |
| A-2 | AlphaSense Help Center — Product Updates January / May 2026 (Generative Search 'Auto' mode; 13 new Workflow Agents) | T1 |
| A-3 | AlphaSense Help Center — Accessing Generative Search; Smart Summaries · https://help.alpha-sense.com/hc/en-us/articles/41669307479443-Get-Instant-Insights-and-Save-Time-with-Smart-Summaries | T1 |
| A-4 | AlphaSense press — "AlphaSense launches Deep Research…" · https://www.alpha-sense.com/press/alphasense-launches-deep-research-automating-in-depth-analysis-with-agentic-ai-on-high-value-content | T3 |
| A-5 | AlphaSense developer docs — Enterprise Intelligence · https://developer.alpha-sense.com/enterprise | T1 |
| A-6 | ZoomInfo IR — "ZoomInfo Copilot Workspace: Complete Book of Business in One Workspace…" · https://ir.zoominfo.com/news-releases/news-release-details/zoominfo-copilot-workspace-complete-book-business-one-workspace/ | T1 |
| A-7 | ZoomInfo IR — "ZoomInfo Data Now Integrated With Microsoft Copilot Studio…" · https://ir.zoominfo.com/news-releases/news-release-details/zoominfo-copilot-studio-and | T1 |
| A-8 | ZoomInfo — GTM Studio certification / "What Is ZoomInfo?" · https://pipeline.zoominfo.com/sales/what-is-zoominfo | T3 |
| A-9 | 6sense — 6AI product page · https://6sense.com/6ai/ | T3 |
| A-10 | 6sense — Predictive Analytics / Intent Data pages · https://6sense.com/platform/predictive-analytics/ | T3 |
| A-11 | Demandbase press release — "Demandbase AI: Pipeline Engine for Modern GTM" · https://www.demandbase.com/press-release/demandbase-ai/ | T3 |
| A-12 | Demandbase Help Center — April 2026 Product Update · https://support.demandbase.com/hc/en-us/articles/48876024044699-April-2026-Product-Update (403 on fetch — content taken from search snippet) | T1 (unfetched) |
| A-13 | Klue — Competitive Intelligence Platform · https://klue.com/competitive-intelligence-platform | T3 |
| A-14 | Klue blog — DoubleCheck Research acquisition · https://klue.com/blog/klue-acquisition-doublecheck-research ; Ignition acquisition · https://klue.com/blog/klue-acquires-ignition | T3 |
| A-15 | BetaKit — "Klue doubles down on AI with Ignition acquisition" · https://betakit.com/klue-doubles-down-on-ai-with-ignition-acquisition/ | T2 |
| A-16 | Switzerland Global Enterprise — SoftwareOne to acquire Crayon Group (closed 2025-07-02) · https://www.s-ge.com/invest/en/articles/news/softwareone-acquire-crayon-group | T2 |
| A-17 | Salesforce Help — AI Sales Agents · https://help.salesforce.com/s/articleView?language=en_US&id=sales.sales_cloud_agents.htm&type=5 (JS-rendered; not fetchable) | T1 (unfetched) |
| A-18 | Salesforce Help — Agentforce Account Management Overview · https://help.salesforce.com/s/articleView?language=en_US&id=sales.account_mgmt_overview.htm&type=5 (JS-rendered; content from search snippet) | T1 (unfetched) |
| A-19 | Salesforce Trailhead — Discover Agentforce Sales Agents · https://trailhead.salesforce.com/content/learn/modules/agentforce-sales-agents-quick-look/discover-agentforce-sales-agents | T1 |
| A-20 | Salesforce — AI Sales Agent product page (Prospecting / Engagement / Pipeline Management / Account Management / Sales Coaching / Quoting / Partner Success agents) · https://www.salesforce.com/sales/ai-sales-agent/ | T3 |
| A-21 | Microsoft Learn — Use Sales agent in Microsoft 365 Copilot (updated 2026-08-06) · https://learn.microsoft.com/en-us/microsoft-sales-copilot/use-sales-chat | T1 |
| A-22 | Microsoft Learn — Prepare for your Sales meetings in Microsoft 365 Copilot (preview) · https://learn.microsoft.com/en-us/microsoft-sales-copilot/meeting-prep-sales-chat | T1 |
| A-23 | Microsoft Learn — View a meeting preparation card · https://learn.microsoft.com/en-us/microsoft-sales-copilot/meeting-prep | T1 |
| A-24 | Microsoft Learn — Copilot for Sales 2026 release wave 1 (301-redirects to aka.ms; NOT fetched) · https://learn.microsoft.com/en-us/copilot/release-plan/2026wave1/copilot-sales/ | T1 (unfetched) |
| A-25 | LinkedIn Sales Navigator Help — Account IQ · https://www.linkedin.com/help/sales-navigator/answer/a1655021 | T1 |
| A-26 | LinkedIn Sales Navigator Help — Account Pages · https://www.linkedin.com/help/sales-navigator/answer/a106045 | T1 |
| A-27 | LinkedIn business blog — Introducing the new Lead IQ & Enhanced Account IQ · https://www.linkedin.com/business/sales/blog/product-updates/introducing-the-new-lead-iq-and-enhanced-account-iq-features-for-sales-navigator | T3 |
| A-28 | Dow Jones Developer Platform — Factiva DJID Taxonomy API · https://dowjones.developerprogram.org/site/docs/factiva_apis/factiva_djid_taxonomy_api/index.gsp (TLS cert expired at fetch time; content via APIs.io/Postman mirrors) | T1 (unfetched) |
| A-29 | APIs.io — Factiva DJID Taxonomy API / Factiva Code API OpenAPI listings · https://apis.io/apis/factiva/factiva-djid-taxonomy-api/ | T1 |
| A-30 | PRNewswire — "Dow Jones Launches Factiva Smart Summary" · https://www.prnewswire.com/news-releases/dow-jones-launches-factiva-smart-summary-302304385.html | T3 |
| A-31 | Clay — CRM Enrichment use case · https://www.clay.com/use-cases/crm-enrichment | T1 |
| A-32 | Clay — Custom Signals · https://www.clay.com/signals | T1 |
| A-33 | Clay — Claygent · https://www.clay.com/claygent ; Clay Docs — Claygent Builder · https://university.clay.com/docs/claygent-builder | T1 |

### Part B — competitors

| # | Source | Tier |
|---|---|---|
| B-1 | Zoom newsroom — "Zoom to Acquire Common Room, Bringing Buyer Intelligence to its AI Revenue Platform" (2026-07-02) · https://news.zoom.com/zoom-to-acquire-common-room-bringing-buyer-intelligence-to-its-ai-revenue-platform/ ; GlobeNewswire mirror | T1 |
| B-2 | Common Room — product/AI page (Person360™, RoomieAI™, Enrichment, Prospector, AI Scoring, Buying Committee) · https://www.commonroom.io/product/ai/ | T1 |
| B-3 | Common Room Docs — RoomieAI Spark (Spark alerts + daily Spark Brief) · https://www.commonroom.io/docs/using-common-room/roomie-ai/roomie-ai-spark-alerts/ | T1 |
| B-4 | Common Room blog — "Introducing RoomieAI™ Capture: Cut account prioritization and personalization from 60 minutes to 60 seconds" · https://www.commonroom.io/blog/ai-research-account-prioritization-and-personalization/ | T3 |
| B-5 | Aomni — aomni.com (HTTP 503 at fetch time; all Aomni claims are from secondary directories) · https://www.aomni.com/ | T3 |
| B-6 | Rox — rox.com homepage (Outbound Agent; autopilot disclaimer) · https://rox.com/ | T1 |
| B-7 | GZ Consulting / Kavout / aiagentsdirectory — Rox "System of Context", $1.2B valuation Mar 2026, agent swarm descriptions | T2/T3 |
| B-8 | Introhive — Relationship Intelligence · https://www.introhive.com/relationship-intelligence/ | T3 |
| B-9 | Introhive — Professional Services Business Development; Managing Client Relationships · https://www.introhive.com/solutions/business-development/ | T3 |
| B-10 | Moody's — AI and GenAI Risk Solutions (Research Assistant, Early Warning System, Loan Monitoring, Automated Credit Memo, QUIQspread, Automated Covenants) · https://www.moodys.com/web/en/us/capabilities/gen-ai.html | T1 |
| B-11 | Moody's — Banking Solutions & Risk Management · https://www.moodys.com/web/en/us/who-we-serve/banking.html | T1 |
| B-12 | FactSet IR — AI financial crime risk management tools integrated into Workstation for corporate banks (Mar 2026) · https://investor.factset.com/news-releases/news-release-details/factset-integrates-advanced-ai-financial-crime-risk-management | T1 |

### Part C — the gaps

| # | Source | Tier |
|---|---|---|
| C-1 | Resilinc — Multi-Tier & Agentic Supply Chain Mapping · https://resilinc.ai/products/multi-tier-mapping/ | T3 |
| C-2 | Interos — Supply Chain Mapping & Visibility · https://www.interos.ai/solutions/supply-chain-mapping | T3 |
| C-3 | Z2Data — Top 7 Supply Chain Risk Management Software Tools for 2026 (Everstream Discover, digital twins) · https://www.z2data.com/insights/top-7-supply-chain-risk-management-software-tools-for-2026/ | T3 |
| C-3b | Bloomberg SPLC function — 900k relationships, 200k quantified, revenue exposure, GeoRiskFactors. Documented via university terminal guides (Copenhagen Business School, Cranfield, NYPL, Brooklyn College, US Dept of Commerce library) and Bloomberg Professional insights · https://libguides.cbs.dk/c.php?g=663644&p=4693363 · https://www.bloomberg.com/professional/insights/trading/researching-supply-chain-exposures-how-to-analyse-coronavirus-related-risks/ | T3 |
| C-3c | ASC 275-10-50-16 through -20 (major-customer concentration disclosure, >10% of revenue) and ASC 280 segment reporting — as applied in 10-K filings and SEC comment-letter correspondence on EDGAR · https://www.sec.gov/Archives/edgar/data/1131554/000113155414000005/filename1.htm | T1 |
| C-4 | arXiv 2609.10996 — *Rethinking Verbalized Confidence for LLM-as-a-Judge: A Compatibility Shift on Post-2025 Proprietary Models* · https://arxiv.org/abs/2609.10996 | T2 |
| C-5 | arXiv 2601.07264 — *The Confidence Dichotomy: Analyzing and Mitigating Miscalibration in Tool-Use Agents* · https://arxiv.org/pdf/2601.07264 | T2 |
| C-6 | arXiv 2604.05952 — Yuan, Wang & Lei, *Towards Trustworthy Report Generation: A Deep Research Agent with Progressive Confidence Estimation and Calibration* · https://arxiv.org/pdf/2604.05952 | T2 |
| C-7 | arXiv 2603.25052 — *Closing the Confidence-Faithfulness Gap in Large Language Models* · https://arxiv.org/pdf/2603.25052 | T2 |
| C-8 | Gartner press release (2026-07-28) — "AI Agents Will Outnumber Sellers 10 to 1 by 2028, Yet Fewer Than 40% of Sellers Will Say Agents Improved Productivity"; survey of 210 CSOs/senior sales execs, Jan–Feb 2026; Dan Gottlieb "agent sprawl" quote · https://www.gartner.com/en/newsroom/press-releases/2026-07-28-gartner-predicts-ai-agents-will-outnumber-sellers-10-to-1-by-2028-yet-fewer-than-40-percent-of-sellers-will-say-agents-improved-productivity (gartner.com returns 403 to fetch; content via search index + trade-press restatements) | T2 |
| C-9 | Gartner press release (2026-05-20) — AI-enabled next best actions 2.6x; "95% of sellers' research workflows will begin with AI by 2027, up from <20% in 2024"; survey of 227 CSOs, Aug–Sep 2025 · businesswire/Morningstar mirrors | T2 |
| C-10 | Gartner — "AI for Sellers: Building Trust With Proprietary Data" (trust drops 60% when sellers doubt data accuracy) · https://www.gartner.com/en/articles/ai-for-sellers (403; via search index) | T2 |
| C-11 | Gartner press release (2025-06-25) — Over 40% of agentic AI projects will be canceled by end of 2027 · https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 | T2 |
| C-12 | Demand Gen Report — "Gartner: AI Is Reshaping B2B Buying, but Human Sellers Still Close the Confidence Gap" · https://www.demandgenreport.com/industry-news/news-brief/gartner-ai-is-reshaping-b2b-buying-but-human-sellers-still-close-the-confidence-gap/53046/ (403 on fetch) | T2 (unfetched) |
| C-13 | B2B data-decay benchmarks (22.5%/yr aggregate; 25–30% contacts; 65.8% title/function change in 12 months; 76% say <half of CRM data accurate; Gartner $12.9–15M/yr cost) — aggregated from ZoomInfo, Cognism, RecordContext, Derrick compilations | T3 (vendor-sourced; treat with caution) |

## Unverified

Items I could **not** confirm from a primary source. None of these are asserted as fact above.

1. **Salesforce Agentforce Account Management — exact topics and actions.** `help.salesforce.com` is a JS-rendered SPA that returns a CSS-error shell to WebFetch. Everything I have about the Account Management subagent ("perform deep research", "summarize recent interactions", "recommend next steps") comes from a **search-index snippet of the Salesforce Help page** plus the salesforce.com product page. The action list, whether external web data is truly in scope, and whether there is an approval step are all **unverified**. Needs a browser-based read or a Salesforce release-notes PDF.
2. **Whether Salesforce grounds the Account Management agent in a structured product catalog.** "Enablement materials", "product FAQ, case studies, and sales plays" are documented as RAG sources [T3]. Whether any Salesforce agent consumes CPQ/Product2 catalog objects to recommend a specific offering is **unverified**.
3. **Microsoft Copilot for Sales — external news/market-signal ingestion.** The Learn pages I read document only CRM + Microsoft Graph. The 2026 wave-1 release plan mentions "additional data sources" but the URL 301-redirects to `aka.ms` and was not followed. Whether Copilot for Sales now reads external news about an account is **unverified** — do not assert either way.
4. **AlphaSense — CRM as a connector.** Enterprise Intelligence documents "a library of out-of-the-box data connectors", "20+ everyday work systems", SCIM, entitlements — but the developer overview page does **not** name Salesforce or any CRM. Marketing pages mention "integrates with enterprise tools like Salesforce and Slack" [T3]. Whether CRM *records* (as opposed to files) can ground an AlphaSense answer is **unverified**.
5. **Dow Jones Factiva — deduplication of the same story across sources.** Not found as a named capability in anything I could reach. `dowjones.com` is blocked to this fetcher and the developer portal's TLS certificate has expired. Factiva's dedup behaviour is **unverified**.
6. **Demandbase April 2026 product update** — the Help Center article returned HTTP 403. Everything attributed to it is from the search index.
7. **Aomni** — aomni.com returned HTTP 503. All Aomni capability claims, the "1,000+ data points / 20+ sources" figure, the "~3 hours saved per prospect" and "up to 40% close-rate" claims, and the **Oracle and NVIDIA customer references** are **T3 secondary only** and should be re-verified before being repeated anywhere client-facing.
8. **Rox** — the marketing narrative ("System of Context", agent swarms for monitoring/prospecting/enrichment) is entirely T2/T3. rox.com itself documents only an Outbound Agent. Treat Rox's coverage of this job as **claimed, not verified**.
9. **6sense** — dedup methodology, confidence calibration, per-claim citations and any narrative account brief. The public pages do not describe them. Absence from marketing is *not* proof of absence from the product; this needs a demo or customer documentation.
10. **Common Room** — company-level (as opposed to person-level) entity resolution, and whether Capture results are stored as structured fields. Person360 is documented at person level only.
11. **Crayon (the CI platform)** — not studied from its own docs at all. Klue was chosen as the CI representative. Crayon's current capability surface is **unknown** here.
12. **Gartner figures (C-8, C-9, C-10, C-12)** — gartner.com, businesswire and demandgenreport all returned 403 to this fetcher. The statistics, survey sizes and the Gottlieb quote come from the search index and trade-press restatements. They are consistent across multiple independent restatements, but **no Gartner page was read directly**. Do not put these in a client deliverable without opening the source.
13. **B2B data-decay statistics (C-13)** — every figure traces back to data-vendor marketing (ZoomInfo, Cognism and downstream compilations). Self-interested sources for a claim that sells data refresh. Directionally useful, numerically unreliable.
14. **LinkedIn Account IQ output section names** — LinkedIn's help page and blog describe capabilities but publish **no canonical list of section headings**. The section names circulating (company overview, financial highlights, strategic priorities, business challenges, talking points) are **not verified** from LinkedIn's own documentation.
15. **Bloomberg SPLC figures (900k relationships, 200k quantified).** Sourced from university library terminal guides and a Bloomberg Professional insights post, not from a Bloomberg product datasheet. Library guides are generally reliable on terminal functions but the counts may be dated. **Current SPLC coverage numbers are unverified**; the existence and shape of the function are well-corroborated across five independent guides.
16. **Whether any sell-side product licenses SPLC-class relationship data.** I found none, but "I found none" is weaker than "none exists" — this deserves one targeted check (Bloomberg Data License / Enterprise Access Point customers) before being stated as fact in a deliverable.
17. **ZoomInfo's 15+ signal types** — the count is stated in ZoomInfo's IR release; the *enumerated list* was not found on a fetchable page (the GTM Studio certification page returned 403). Only five types are confirmed by name (buying intent, job changes, funding, hiring activity, competitive research).
