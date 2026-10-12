# Oracle AIDP — presales playbook (AI Data Platform)

_status: active, **waiting on the first opportunity** — SoftServe has learned Oracle's AIDP demo process from its global product-strategy lead, **Oscar Colino Garcia** (sessions 09-29, 10-02, 10-12), but holds no AIDP opportunity yet: Neil hands them out at the **pipeline call on Tue 2026-10-13**, and Oscar guides SoftServe through the first one. SoftServe's OCI tenancy exists but has **zero credits** after the Tier 2 renewal (partner credits requested, awaiting Oracle approval), so AIDP is not deployed yet._
_updated: 2026-10-12_
_source files: reference kits in SoftServe OneDrive `Productization - General/Demo references/` — `2026-09-29 Oracle AIDP Deep Insights demo/` (Qatar Airways) and `2026-10-12 Oracle AIDP Telenor finance demo build/` (12 screens + a README with the call timeline); both Oracle-confidential, study only → [registry](../../_meta/external-sources.md)_

## Snapshot

- **The ask (2026-09-29):** Oracle wants SoftServe to repeat its NVIDIA-pack role on AIDP / AI Lakehouse — the top ~5 qualified AIDP opportunities per region from the joint pipeline call, one opportunity worked jointly with Oscar's team, then SoftServe on its own, on Oracle's tooling; in Oscar's words, the role of his forward-deployed engineers ([intro](calls/oracle/2026-09-29_192726_default_2026092916023937929FAF.md) · [10-12](calls/oracle/2026-10-12_130100_default_20261012120404C0E0AA4A.md)). Partnership → [oracle](oracle.md); product reference → [offerings](oracle-ai-offerings.md#aidp-as-oracle-draws-it-and-the-surfaces-a-demo-touches-2026-10-02--10-12).
- **Why it matters:** AIDP deals are **$1M+**, long and consultative (Neil, 2026-09-16); about half of the laser campaigns' 49 UK opportunities were AIDP ([pipeline](oracle-pipeline.md#lead-routing--the-joint-pipeline-call-first-held-2026-09-29)); partners usually lack the skills (Oscar). The bottleneck skill is **building a customer-specific demo fast**.
- **The product to lead with is Deep Insights:** an AIDP agent on an **enterprise ontology** extracted from the customer's data sources — an advanced data analyst for any department (research, analysis, forecasting, recommendations; instant / thinking / pro modes). **The demo work is the data and the questions, not the agent:** its logic is standard, Oscar confirmed when Alex put it that way (10-12). Not GA yet: a partner's tenancy needs whitelisting.
- **Oracle's toolchain is public; two pieces are not.** `oracle-samples/oracle-aidp-samples` ships Codex **and Claude Code** plugins — an SDK / API for AIDP used for demos and production, plus migration plugins (Databricks, Snowflake, Microsoft Fabric, Informatica) and a Fusion connector. Not shared: the FDE leader's demo-video plugin and Oscar's value-pitch prompts / templates.

## The motion — outcome first, land and expand (Oscar)

- **Why outcome first:** Snowflake and Databricks sell the lakehouse and Palantir sells outcomes; a technical-first pitch (multi-cloud, OCI) loses to the customer's existing platform (09-29).
- **Four steps, ~4–5 weeks from a C-level conversation to implementation:** (1) agree the outcome with the **business buyer — the CFO, not the CDO / CIO**; (2) a demo on synthetic data in 2–3 days, pre-built per industry or custom; (3) week 3: a pilot on near-production data, where **security is the friction every time** (sovereign cloud, DRCC); (4) production with SoftServe for the customers won. Proof: an airline went from the executive discussion to production in **4 weeks**; only the CISO slowed it (10-12).
- **Land and expand:** land in one line of business with one use case, then expand — closer to Databricks' Genie / ontology idea than to a one-off build like predictive maintenance (10-12).
- **Getting in:** meet the business; your IT contacts should connect you to it. Take a **challenger approach** — research the company and bring the use case you believe it cares about to the right audience; easier than pitching bottom-up. The first demo meeting often redirects to another interest, which is the follow-up (10-12).
- **Demand runs both ways:** Oracle brings accounts, and SoftServe's existing customers (e.g. Telenor) are easier because the connections exist. Ask Oracle for **its install base in each account** — it feeds the value pitch (10-12).
- Fit with the laser playbook: Spark → Show → Let them try → Prove the fit → Propose; workshops and tailored demos beat POCs ([deck notes](docs/2026-09-17_oracle-laser-campaigns-deck.md)).

## The demo recipe (Oscar, 10-02 and 10-12)

1. **Value pitch deck** — one prompt to Codex (Oscar's ChatGPT desktop app, a premium model), fed AIDP's angle and Oracle's install base in the account; Oracle keeps templates that improve over time. Returns a deck with use cases and their business impact, plus a script, a pilot business case and a dataset spec; values are labelled hypotheses with formulas, sources in the speaker notes. **Pick the use case that fits the audience.** The demo can exist before the first meeting; there the customer picks a use case or proposes another.
2. **Demo script + dataset** — a second prompt researches the customer (internal SharePoint, account notes, public disclosures) and writes the script around one executive question, **including the questions to ask in the demo**, plus the synthetic dataset with an AIDP import notebook, loading instructions and **expected answers** — "the demo packet".
3. **Load and build with the plugin** — prompt "load these files into AIDP": it creates the bronze / silver / gold layers on the Autonomous AI Lakehouse, lands the files in bronze, builds the pipelines and agents. "It's all Codex"; you need **architecture skills more than coding**, because you sometimes fix things. MCP access works out of the box once AIDP is in the tenancy.
4. **Run it** — in **Agent Hub** (AIDP's agent interface), or from Claude / Codex over MCP, or in a tailored UI built with coding agents on the agent's **chat URL** (AI Registry → view details). Customers usually want their own interface. Actions on the underlying apps are coming.
5. **Optional video** — another plugin renders a cinematic video for decks, for use before an opportunity exists; Oracle won't share it. The live demo matters more.
- **Automation and cost:** after a few runs the chain (pitch deck → script → files → upload → video) can be automated end to end; ~**$10 of model spend per demo** — worth it across many opportunities. Oscar's 2–3 days per customer is mostly review and rehearsal (inferred).

## Worked example — Telenor Group Finance (Oscar's build, screens 2026-10-12)

_From Oscar's walkthrough and Alex's screenshots of it (Apple Note "AIDP meeting 12 Oct"; kit in OneDrive). A real Oracle opportunity, built by Oscar with an FDE; Oracle presents to Telenor's finance group on 10-13._
- **How it arose:** Telenor runs Oracle Analytics Cloud and Autonomous Data Warehouse; its technical team came to Oracle about **overspending on tokens in Oracle Analytics Cloud**, got interested in AIDP, and asked for a CFO use case — a tech-side entry turned into a business demo.
- **Value pitch deck** (`Telenor_AI_Value_Pitch_Oct2026_Reviewed.pptx`, 23 min 37 s of machine time). Slide 4, **three priority Deep Insights use cases** as owner · question · approved next action: **revenue assurance** (CFO + billing owner; "where do contracts, active services, usage and invoices disagree?"; validate exceptions, propose a tariff fix, credit or permitted rebilling) · **profitable retention** (commercial + care; "who needs a service repair, a better plan or a targeted retention offer?"; test against a control group) · **network investment** (CTO + finance; "which congested areas justify maintenance, an upgrade or reconfiguration?"; rank for engineering approval). Recommended first pilot: one market, one product family; human approval mandatory for customer and network changes.
- **One slide per use case, one template:** the question in the buyer's words · evidence to connect · action and accountability · an illustrative annual value range with its formula · a caveat. Slide 7: NOK 4,612m maintenance cost × 50% eligible × 3–5% avoidance = **NOK 69–115m a year**, plus capex (NOK 10,535m × 40% × 2–4%) flagged as cash, not EBITDA. Slides 5–6 read ≈NOK 28–163m (leakage) and ≈NOK 184–367m (retention); slide 8 sums the levers for the executive discussion; slide 9 is the demo question, "why is this customer's invoice below the contract expectation, and what action is justified?" (thumbnail readings, approximate).
- **Demo script** (`Telenor_Finance_Demo_Script.docx`, 4 min 42 s): a "Finance Performance and Action Agent" around *why are revenue and opex off plan, what is genuinely controllable, and which actions will improve the forecast?*, with an audience map from Telenor's August 2026 country-focused reorganisation and one storyline per Nordic country. Flow: variance → evidence → recommended actions → financial impact, incl. a delayed-delivery scenario. Dataset: **18 tables, 6,421 rows, 128 evidence documents**, a loader notebook and expected answers.
- **In AIDP:** the demo data in medallion schemas; the **AI Registry** entry "Telenor Finance Deep Insights" (AIDP agent v1.0.0, an A2A card) — *FP&A analyst for the Nordic CFO review: P&L vs budget, FX, revenue drivers, billing leakage, opex drivers, Q4 actions with evidence citations*, synthetic data served through an Oracle Analytics subject area — beside Oracle's other demo agents (EBS material planning, planning exceptions, supply-chain and financial investigation, a lubricant-plant action agent).
- **The live run** (Agent Hub, thinking mode): "For September 2026, compare actual revenue, opex and EBITDA with budget across the Nordic region" → a revenue-driver chart (FX −36.4, price / mix +11.7, volume +0.7 NOK m) and a **country gap ranking** with a read-through per row (Norway first: 52.4% of the net EBITDA shortfall) ending in a priority order; sources cited as generated experts (management P&L, revenue performance, opex). Follow-up question: "why is Norway 50 million below revenue plan…".

## Targets — where AIDP presales lands first

- **EMEA EBS customers** (Oscar's first pick, 10-02): legacy E-Business Suite, no AI. EBS agent templates go to partners within ~2 weeks of 10-02, a few earlier on request; they need an EBS VM. Laser segment "Extend Your EBS Investment with AI", 123 accounts. Caveat: many EBS estates sit behind Indian outsourcers' shared-services walls (Gero).
- **Accounts where SoftServe already sold compute or GenAI** — the natural next step. Telenor qualifies: SoftServe works its SDLC pillar ([pipeline](oracle-pipeline.md#lead-routing--the-joint-pipeline-call-first-held-2026-09-29)).
- **Migrations and Fusion data:** the migration plugins (Databricks, Snowflake, Microsoft Fabric, Informatica) and the Fusion connector make a migration or Fusion-data opportunity buildable too (10-12).
- **Fusion SaaS customers** already have AI: harder, not first. Deep Insights has been shown on airline route profitability (Qatar), telco group finance (Telenor), planning exceptions and supply chain.

## Our kit and gaps

- **Have:** the two reference kits; the [interactive demo playbook](../../../.claude/references/interactive-demo-playbook.md) ("lead with the value" matches Oscar's order); the packaging skills (value cases, walkthroughs) → [packaging-skills](packaging-skills.md); SoftServe builds with Claude, and Oracle ships Claude Code plugins.
- **Missing:** credits and AIDP in the tenancy, then Deep Insights whitelisting; hands-on time with the plugins; a value-pitch and demo-script generator of our own (Oscar keeps his templates) and a video generator; an EBS environment for the templates.

## People

- **Oscar Colino Garcia** (Oracle) — AIDP product strategy, global; runs the sessions and guides the first opportunity → [oracle-team](oracle-team.md#motion-b--the-data-platform-aidp--ai-lakehouse).
- **Pelin Ozbozkurt** (Oracle, Oscar's team) — will support SoftServe; EBS-agent and semantic-engine detail. **Oscar's FDE leader** (unnamed) — owns the video plugin.
- **Neil** (Oracle; "Neil Shulai" as transcribed 10-12) — assigns the opportunities. **Gero Gunkel** — qualifies them; owes the EBS agents document. **Helen** (London) — local AIDP PM.
- SoftServe: **Bohdan** (sessions, the Neil relationship), **Alex** (productization; the process questions), **Paweł Domal** (manages the OCI tenancy and the partner credits; likely the README's Pavlo Doma, Enterprise Solution Architect, Oracle-only — inferred), **Karsten** (Telenor / NVIDIA side).

## Decisions

- 2026-10-12 — **Follow Oscar's process as is; the demo work is customer data and questions, the agent stays standard.** Alex's summary, confirmed by Oscar; SoftServe tests it on the first assigned opportunity. [call](calls/oracle/2026-10-12_130100_default_20261012120404C0E0AA4A.md)
- 2026-10-02 — **Learn by building one opportunity together, not from training material**; build on Oracle's public plugins, while the video plugin and value-pitch skills stay Oracle's. [call](calls/oracle/2026-10-12_125600_default_20261002161130216FBB00.md)
- 2026-09-29 — **SoftServe works as an extension of Oracle's team on AIDP**: one opportunity jointly, then on its own. [intro](calls/oracle/2026-09-29_192726_default_2026092916023937929FAF.md)

## Open loops

Mine / SoftServe:
- **Take the first AIDP opportunity from the 10-13 pipeline call through Oscar's recipe**, with Oscar guiding; ask Oracle for the account's install base up front. [10-12](calls/oracle/2026-10-12_130100_default_20261012120404C0E0AA4A.md)
- **Paweł — partner credits onto the OCI tenancy** (requested; awaiting Oracle approval), then deploy AIDP for the team; then Oscar whitelists the tenancy for Deep Insights.
- **Telenor:** Oracle presents to the finance group on 10-13; decide with Gero and Oscar where SoftServe (SDLC pillar) joins.
- **Unassigned:** our own generator chain (value pitch → script → dataset → video); who owns the week-3 security / CISO step and the value case before a pilot.

Theirs:
- **Neil / Oracle** — assign opportunities at the 10-13 pipeline call. **Oscar** — guide the first one; whitelist the tenancy once AIDP is in.
- **Oracle** — EBS agent templates to partners (~2 weeks from 10-02). **Gero** — the Word document listing all the agents.

## Activity

- 2026-10-12 — [Demo-build session](calls/oracle/2026-10-12_130100_default_20261012120404C0E0AA4A.md): Oscar's end-to-end process on the Telenor Group Finance build, with Alex's 12 screens → recipe, worked example, OneDrive kit; SoftServe still waiting for opportunities (10-13 pipeline call); tenancy without credits.
- 2026-10-02 — [Toolchain follow-up](calls/oracle/2026-10-12_125600_default_20261002161130216FBB00.md) (processed 2026-10-12): the plugin flow, Agent Hub whitelisting, EBS templates, Telenor overlap.
- 2026-09-29 — [Intro](calls/oracle/2026-09-29_192726_default_2026092916023937929FAF.md): the outcome-first motion and the Qatar Airways Deep Insights demo.
