# Oracle AIDP — presales playbook (AI Data Platform)

_status: active — SoftServe is learning to sell and demo Oracle's AI Data Platform (AIDP) from its global product-strategy lead, **Oscar Colino Garcia**, in sessions on 09-29 (intro), 10-02 (the toolchain) and 10-12 (his Telenor Group Finance demo build, screens captured; the transcript is pending). SoftServe still has no AIDP tenancy (at its final step on 10-02), so nothing has been built on AIDP yet, and the first joint opportunity is not picked; Telenor is the live candidate (inferred)._
_updated: 2026-10-12_
_source files: reference kits in SoftServe OneDrive `Productization - General/Demo references/` — `2026-09-29 Oracle AIDP Deep Insights demo/` (Qatar Airways) and `2026-10-12 Oracle AIDP Telenor finance demo build/` (12 screens + README); both Oracle-confidential, study only → [registry](../../_meta/external-sources.md)_

## Snapshot

- **The ask (2026-09-29):** Oracle wants SoftServe to repeat its NVIDIA-pack role on AIDP / AI Lakehouse — the top ~5 qualified AIDP opportunities per region from the joint pipeline call, one opportunity worked jointly with Oscar's team, then SoftServe on its own, on Oracle's tooling ([intro](calls/oracle/2026-09-29_192726_default_2026092916023937929FAF.md)). Partnership context → [oracle](oracle.md); product reference → [offerings](oracle-ai-offerings.md#data--managed-services-layer-motion-b--aidp--ai-lakehouse--aidp-innovation-service).
- **Why it matters:** AIDP deals are **$1M+**, long and consultative (Neil, 2026-09-16); about half of the laser campaigns' 49 UK opportunities were AIDP ([pipeline](oracle-pipeline.md#lead-routing--the-joint-pipeline-call-first-held-2026-09-29)); partners usually lack the skills (Oscar, 10-02). **The bottleneck skill is building a customer-specific demo fast** — SoftServe needs it to scale past today's 50–60 opportunities (Oscar, 09-29).
- **The product to lead with is Deep Insights**: an AIDP deep data-analyst agent (investigate → forecast → scenario → recommend → act) on top of AIDP and AI Lakehouse that fits any industry or department; Oscar's pattern to scale ([offerings](oracle-ai-offerings.md#aidp-as-oracle-draws-it-and-the-surfaces-a-demo-touches-2026-10-02--10-12)).
- **Oracle's toolchain is public; two pieces are not.** The `oracle-samples/oracle-aidp-samples` repo ships Codex **and Claude Code** plugins that turn a demo script into synthetic data, AIDP tables and agents. Not shared: the FDE leader's demo-video plugin and Oscar's value-pitch skills — Oscar says a partner can build both quickly (10-02).

## The motion — outcome first (Oscar, 2026-09-29)

- **Why:** Snowflake and Databricks sell the lakehouse and Palantir sells outcomes; a technical-first pitch (multi-cloud, OCI) loses to the customer's existing platform. Lead with one business outcome, shorten the path to production.
- **Four steps, ~4–5 weeks from a C-level conversation to implementation:** (1) Oracle agrees the outcome with the **business buyer — the CFO, not the CDO / CIO**; opportunities should reach SoftServe with it defined, otherwise the two define it together. (2) **A demo** on synthetic data, pre-built per industry or custom per customer, **2–3 days per customer, 2–3 hours for the demo itself**. (3) Week 3: a pilot on the customer's own near-production data; **security is the friction every time** (sovereign cloud and DRCC are Oracle's answers). (4) A real demo on customer data within ~4 weeks; **production goes to SoftServe** for the customers won.
- **Value case:** somebody has to size the outcome, usually on the way to the pilot (Qatar: route profitability ≈0.5% of the cost base, $50–100M a year). Oscar now generates it with his own skills.
- Fit with the laser playbook: Spark → Show → Let them try → Prove the fit → Propose; reps are told workshops and tailored demos beat POCs ([deck notes](docs/2026-09-17_oracle-laser-campaigns-deck.md)).

## The demo recipe (Oscar, 2026-10-02, [call](calls/oracle/2026-10-12_125600_default_20261002161130216FBB00.md))

1. **Value pitch first:** one prompt per customer ("work on the value pitch deck for Telenor") in Oscar's own skills returns a deck plus a presentation script, a pilot business case and a demo dataset spec; value figures are labelled hypotheses, with the calculations and sources in the speaker notes. ⚠ screen-level detail of this step comes from the 10-12 screens; Oscar's narration awaits the transcript.
2. **Demo script:** a second prompt researches the customer (internal SharePoint, account notes, public disclosures) and writes the script around one executive question; the synthetic dataset comes with an AIDP import notebook, loading instructions and **expected answers**.
3. **Build with the plugin:** install it, give it the narration and the outcome, prompt; it creates the synthetic data, uploads it to AIDP and creates the agents. **Data pipelines** (ingestion, transformation) run through the same Codex / Claude plugin via AIDP's MCP integration; underneath it is mainly skills.
4. **Show it in Agent Hub** (AIDP's chat front end, Oscar's main demo surface; whitelisted per tenancy until it goes GA at Oracle AI World, ~20 days after 10-02) — or build your own UI with Claude / Codex on the agent's **chat URL** (Oscar sometimes uses Lovable). AIDP's **action framework** lets agents act on the system of record, not just answer.
5. **Optional video** for decks before an opportunity exists: Codex script → the FDE leader's plugin → a cinematic, marketing-style video in 2–3 hours. Oracle won't share it; "you could build something similar very quickly". The live demo matters more: customers want to drill down.

## Worked example — Telenor Group Finance (Oscar's build, screens 2026-10-12)

_From Alex's screenshots of Oscar's screen share (Apple Note "AIDP meeting 12 Oct"; kit in OneDrive). Built by Oscar with an FDE for Telenor's finance team; synthetic data throughout._
- **Value pitch deck** (`Telenor_AI_Value_Pitch_Oct2026_Reviewed.pptx`, ChatGPT desktop, 23 min 37 s from one prompt on 10-02). Slide 4, **three priority Deep Insights use cases** as owner · question · approved next action: **(1) Revenue assurance** — CFO + billing owner — "where do contracts, active services, usage and invoices disagree?" — validate exceptions, propose a tariff fix, customer credit or permitted rebilling; **(2) Profitable retention** — commercial + customer care — "who needs a service repair, a better plan or a targeted retention offer?" — compare cost and likely benefit, test against a control group; **(3) Network investment** — CTO + finance — "which congested areas justify maintenance, a capacity upgrade or reconfiguration?" — rank by service impact and economics for engineering approval. Recommended first pilot: revenue assurance in one market and one product family; human approval mandatory for customer and network changes.
- **One slide per use case, one template:** the question in the buyer's words · evidence to connect · action and accountability · an illustrative annual value range with its formula · a caveat. Slide 7: NOK 4,612m maintenance cost × 50% eligible × 3–5% avoidance = **NOK 69–115m a year**, plus a separate capex line (NOK 10,535m × 40% × 2–4% = NOK 84–169m) flagged as cash, not EBITDA. Slides 5 and 6 read ≈NOK 28–163m (leakage) and ≈NOK 184–367m (retention); slide 8 sums the levers into an executive value framework; slide 9 is the demo question, "why is this customer's invoice below the contract expectation, and what action is justified?" (thumbnail readings, approximate).
- **Demo script** (`Telenor_Finance_Demo_Script.docx`, 4 min 42 s): a "Finance Performance and Action Agent" around one question — *why are revenue and opex off plan, what is genuinely controllable, and which actions will improve the forecast?* — with revenue leakage as one drill-down, an audience map from Telenor's August 2026 country-focused reorganisation, and per-country storylines (Norway, Sweden, Denmark, Finland). Flow: variance → evidence → recommended actions → financial impact, incl. a delayed-delivery scenario. Dataset ZIP: **18 tables, 6,421 rows, 128 evidence documents**, an AIDP import notebook, loading instructions and expected answers.
- **In AIDP:** demo catalogs in the master catalog (a bronze / silver / gold medallion set loaded on 10-11); the **AI Registry** entry "Telenor Finance Deep Insights" (AIDP agent v1.0.0, an A2A agent card) — *FP&A analyst for the Nordic CFO review: P&L vs budget, FX, revenue drivers, billing leakage, opex drivers, Q4 actions with evidence citations*, its synthetic data served through an Oracle Analytics subject area — beside Oracle's other demo agents (EBS material planning, planning exceptions, supply-chain and financial investigation, a lubricant-plant action agent).
- **The live run in Agent Hub** ("Thinking" mode, the agent @-mentioned): "For September 2026, compare actual revenue, opex and EBITDA with budget…" → a revenue-driver chart (FX translation −36.4, price / mix +11.7, volume +0.7 NOK m) and a **country gap ranking** with a read-through per row (Norway first: 52.4% of the net EBITDA shortfall), ending in a priority sequence; sources cited as generated experts ("Management P&L Expert, Revenue Performance Expert, Opex Expert").

## Targets — where AIDP presales lands first

- **EMEA EBS customers** (Oscar's first pick, 10-02): legacy E-Business Suite, no AI, need help finding it. Oracle built agent templates on the EBS database and releases them to partners and the public within ~2 weeks of 10-02, a few now on request; running them needs an EBS VM (Oracle's EBS experts help). Laser segment "Extend Your EBS Investment with AI", 123 accounts. Caveat: many EBS estates sit behind Indian outsourcers' shared-services walls (Gero).
- **Accounts where SoftServe already sold compute or GenAI** — the natural next step to outcome-based use cases (Oscar). Telenor qualifies: SoftServe works its SDLC pillar ([pipeline](oracle-pipeline.md#lead-routing--the-joint-pipeline-call-first-held-2026-09-29)).
- **Fusion SaaS customers** already have AI: harder, not first.
- **Departments Deep Insights has been shown on:** airline route profitability (Qatar), telco group finance and revenue assurance (Telenor), planning exceptions and supply chain (Oracle's demo agents).

## Our kit and gaps

- **Have:** the two reference kits; the [interactive demo playbook](../../../.claude/references/interactive-demo-playbook.md) ("lead with the value" matches Oscar's order); the packaging skills (value cases, walkthroughs) → [packaging-skills](packaging-skills.md).
- **Missing:** an AIDP tenancy and Agent Hub whitelisting; hands-on time with the `claude-code-plugins` / `codex-plugins`; a value-pitch generator and a demo-video generator of our own (Oscar keeps his); an EBS environment for the templates.

## People

- **Oscar Colino Garcia** (Oracle) — AIDP product strategy, global; runs the sessions → [oracle-team](oracle-team.md#motion-b--the-data-platform-aidp--ai-lakehouse).
- **Pelin Ozbozkurt** (Oracle, Oscar's team) — will support SoftServe; EBS-agent and semantic-engine detail.
- **Oscar's FDE leader** (unnamed) — owns the video plugin; offered for the demo-build session.
- **Gero Gunkel** — qualifies the opportunities; owes the EBS agents document. **Helen** (London) — local AIDP PM.
- SoftServe: **Bohdan** (sessions, tenancy), **Alex** (productization), **Karsten** (Telenor / NVIDIA side).
- Pawel Domal — invited to the 10-12 session; affiliation and role not on record.

## Decisions

- 2026-10-02 — **Learn by building one opportunity together, not from training material.** Oscar's answer to Alex's ask for non-public material; he shows the Telenor build and the step-by-step path next session. [call](calls/oracle/2026-10-12_125600_default_20261002161130216FBB00.md)
- 2026-10-02 — **Build demos on Oracle's public plugins; the video plugin and value-pitch skills stay Oracle's.** Bohdan accepted that the presentation skills are Oscar's IP. [call](calls/oracle/2026-10-12_125600_default_20261002161130216FBB00.md)
- 2026-09-29 — **SoftServe works as an extension of Oracle's team on AIDP**: one opportunity jointly, then on its own. [intro](calls/oracle/2026-09-29_192726_default_2026092916023937929FAF.md)

## Open loops

Mine / SoftServe:
- **Bohdan — stand up SoftServe's AIDP tenancy** (final step on 10-02, "next week"), then send Oscar the tenancy details for Agent Hub whitelisting.
- **Pick the first joint AIDP opportunity** with Gero — Telenor (finance or revenue assurance, alongside SoftServe's SDLC work) is the live candidate (inferred); an EBS account is Oscar's segment pick.
- **Unassigned:** a SoftServe value-pitch generator and demo-video generator; who owns the week-3 security / CISO step and the value case before a pilot.

Theirs:
- **Oscar** — whitelist SoftServe's tenancy once it exists; the step-by-step demo build with his FDE leader (10-12 session, outcome pending its transcript).
- **Oracle** — EBS agent templates to partners (~2 weeks from 10-02), a few earlier on request. **Gero** — the Word document listing all the agents.

## Activity

- 2026-10-12 — **Demo-build session** (Oscar, Pelin, Gero, Karsten, Bohdan, Alex; Pawel Domal invited): Oscar walked through his Telenor Group Finance build; Alex's 12 screenshots captured → worked example above and the OneDrive kit; transcript pending.
- 2026-10-02 — [Toolchain follow-up](calls/oracle/2026-10-12_125600_default_20261002161130216FBB00.md) (processed 2026-10-12): the plugin flow, Agent Hub whitelisting, EBS templates, Telenor overlap.
- 2026-09-29 — [Intro](calls/oracle/2026-09-29_192726_default_2026092916023937929FAF.md): the outcome-first motion and the Qatar Airways Deep Insights demo.
