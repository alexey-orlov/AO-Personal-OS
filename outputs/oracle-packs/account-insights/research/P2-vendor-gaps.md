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

2. **Common Room (now Zoom-owned)** [T2 acquisition] — the **closest single product to the whole job**. `Person360™` (identity unification across CRM, product, marketing, engagement) + `RoomieAI™ Capture` (account research over "earnings calls, 10-Ks, news articles, podcasts" *and* "Gong recordings, CRM records, product usage data", against **user-chosen research topics**, results surfaced in the account profile and filterable into workflows) + `RoomieAI™ Spark` / **Spark Brief** (a **daily morning email** summarizing "the most interesting buyer activity across your book of business" — web-visit spikes, job changes, company news — plus contacts, "who to engage, why they matter, and what to do next"). Claims "60 minutes to 60 seconds" and "90% on research time" [T3 blog]. **Docs make no mention of dedup, entity resolution at company level, confidence, citations, or human review** [T1 docs]. Wins SJ-3+SJ-4+SJ-6 combined; loses SJ-5 and SJ-7 entirely.

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

_pending_

---

## Sources

_pending_

## Unverified

_pending_
