# AIDP × Telenor demo build — the 12 screens, transcribed (2026-10-12)

_Source: Alex's Apple Note "AIDP meeting 12 Oct" — 12 screenshots of Oscar Colino Garcia's (Oracle) screen share during the 2026-10-12 session "SS: AIDP PM team/Softserve", captured 12:10–12:24 Kyiv. Images: SoftServe OneDrive `Productization - General/Demo references/2026-10-12 Oracle AIDP Telenor finance demo build/` (`originals/` = full-resolution PNG, the folder root = WebP copies, plus a README). Call note: [calls/oracle/2026-10-12_130100_default_20261012120404C0E0AA4A.md](../calls/oracle/2026-10-12_130100_default_20261012120404C0E0AA4A.md). Distilled into [oracle-aidp](../oracle-aidp.md) and [oracle-ai-offerings](../oracle-ai-offerings.md#aidp-as-oracle-draws-it-and-the-surfaces-a-demo-touches-2026-10-02--10-12)._

_Oracle-internal tooling, a prospect's name and Oracle's demo catalogue: study only, never reused in anything external. Oracle tenancy identifiers (OCIDs, tenancy hosts, URL parameters) are deliberately left out. Executives' names on screen 04 are omitted. Offsets are into Alex's recording of the call (started 12:04:04)._

---

## 01 — Oscar's ChatGPT: the value-pitch prompt (12:10:32 · ≈06:28)

- **App:** the ChatGPT desktop app (Windows), model selector **GPT-6 Astra · High**, an "Approve for me" toggle. Oscar calls this tool "Codex" in the call.
- **How he organises the work — one project per workstream** (left sidebar, project → chat):
  - AIDP Pilot Program → "Create 90-day AI pilot plan"
  - AI Account Plan → "I am looking to build an account plan…"
  - OKR → "Build simplified OKR tracker"
  - Engagement Model → "Summarize report"
  - AIDP Execution Review → "Gather AIDP EMEA review content"
  - Pitch Deck → "Respond to greeting (2)" (open), "Check Field Advisory attendees", "Respond to greeting (3)", "Respond to greeting"
  - Video Demo Work → "Improve demo video narration", "Create cinematic island intro"
- **The thread, Fri Oct 2, 10:41 AM:** prompt "Can you work on the value pitch deck for Telenor" → "Worked for 23m 37s" → *"Value estimates are clearly labelled hypotheses, with calculations and source references in the speaker notes."* Deliverables listed: **Presentation script · Pilot business case · Demo dataset**, and the file **`Telenor_AI_Value_Pitch_Oct2026_Reviewed.pptx`** (Open in → Default app · Export to Google Slides · Show in File Explorer · Download a copy).
- The next prompt is visible below ("I need to do a deep insights demo for the Finance…", screen 04).

## 02 — Deck slide 04: "Three priority Deep Insights use cases" (12:11:23 · ≈07:19)

Subtitle: *"An agent investigates a difficult question and prepares an evidence-backed recommendation."*

| Priority and owner | Question for Deep Insights | Approved next action |
|---|---|---|
| **1 Revenue assurance** — CFO + billing owner | Where do contracts, active services, usage and invoices disagree? | Validate exceptions. Propose a tariff fix, customer credit or permitted rebilling. |
| **2 Profitable retention** — Commercial + customer care | Who needs a service repair, a better plan or a targeted retention offer? | Compare cost and likely benefit. Test the intervention against a control group. |
| **3 Network investment** — CTO + finance | Which congested areas justify maintenance, a capacity upgrade or reconfiguration? | Rank options by service impact and economics for engineering approval. |

Footnote: *"Recommended first pilot: revenue assurance in one market and one product family. Human approval remains mandatory for customer and network changes."* Footer on every slide: "Telenor / Oracle AI value discussion / October 2026".

## 03 — Deck slide 07: "3. Network investment prioritisation", in PowerPoint (12:12:31 · ≈08:27)

- **The question:** *"Where will the next unit of network spend improve customer service and project economics most?"*
- **Evidence to connect:** congestion and incident history, customer exposure, demand forecasts, maintenance records, costs and the approved capital plan.
- **Action and accountability:** engineers compare maintenance, configuration changes and upgrades; finance validates avoided spend without weakening coverage or resilience.
- **Value:** **NOK 69–115m** — *illustrative annual operating-cost reduction* = NOK 4,612m maintenance costs × 50% eligible × 3–5% avoidance. **Separate capital-plan opportunity:** NOK 10,535m × 40% × 2–4% = **NOK 84–169m avoided capex**.
- **Caveat on the slide:** *"Eligible scope and avoidance rates are assumptions. Capex avoidance affects cash and the capital plan, with no immediate equivalent EBITDA benefit."*
- **Speaker notes, first line (verbatim):** *"FY2025 operations and maintenance expense is NOK 4,612m. 50% eligible x 3-5% avoidance gives NOK 69.18-115.3m annual operating-cost reduction. Confirm…"* The second line is cut off at the screen edge; partial reading: confirm which costs are network-related and avoidable through the selected decisions, and count cancelled or avoided expenditure, not time released alone.
- **The deck's shape, from the thumbnail rail** (thumbnails are small; figures approximate):
  - 4 — Three priority Deep Insights use cases (screen 02).
  - 5 — "1. Revenue leakage and billing accuracy" — ≈NOK 28–163m, same template.
  - 6 — "2. Proactive, profitable retention" — ≈NOK 184–367m, same template.
  - 7 — this slide.
  - 8 — "Value framework for executive discussion" — the levers summed (≈NOK 211–520m headline; ≈NOK 201–433m annual operating value; a three-row table).
  - 9 — "Demo: a disputed enterprise invoice" — *"Why is this customer's invoice below the contract expectation, and what action is justified?"*, in three columns (≈ join the effective contract, activated services and rated usage and open the evidence behind each difference · check an approved discount and offer activation date and reject false positives before valuing the exception · show the justified correction, customer impact and expected contribution and route it to the authorised billing owner).

## 04 — Oscar's ChatGPT: the demo-script prompt (12:12:46 · ≈08:42)

- **Prompt, Oct 2, 11:09 AM:** *"I need to do a deep insights demo for the Finance group at Telenor. Can you investigate any information internally and externally around Telenor group organization and what the demo script could focusing on revenue and opex"* → "Worked for 4m 42s".
- **Answer:** *"Yes. I recommend a 'Finance Performance and Action Agent' demo, centred on: 'Why are revenue and opex off plan, what is genuinely controllable, and which actions will improve the forecast?'"* — "This gives Group Finance a broader reason to engage, with revenue leakage as one drill-down."
- **Sources it used:** "internal SharePoint documents, local account notes and public disclosures"; recent Finance demo emails read only as search previews, "pending your permission".
- **Organisation and audience:** Telenor introduced a more country-focused organisation in August 2026, removing the Nordic business-area layer; the answer names the Group CFO and the leader of Technology and Transformation as the audience (names omitted here).

## 05 — Oscar's ChatGPT: the script and the dataset (12:13:39 · ≈09:35)

- **Per-country storylines:**
  - **Norway:** Sikre mobile, business connectivity, and Oslo versus Vestland revenue performance.
  - **Sweden:** 5G broadband growth and Vimla.
  - **Denmark:** BusinessGo, commissions and overlapping IT platform costs.
  - **Finland:** DNA and Moi pricing, subscribers and commissions.
- **The agent's flow:** *"revenue and opex variance → supporting evidence → recommended actions → financial impact, including a delayed-delivery scenario."*
- **The dataset:** *"The ZIP contains 18 tables, 6,421 rows, 128 evidence documents, an AIDP import notebook, loading instructions and expected answers."* *"All financial and operational data is synthetic. Local validation passed; the loader has not yet been run in your AIDP environment."*
- **Files:** `Telenor_Finance_Demo_Script.docx`; Oscar asks "where is the data set?" → "Here is the dataset ZIP."

## 06 — GitHub: `oracle-samples/oracle-aidp-samples`, `ai/codex-plugins` (12:14:30 · ≈10:26)

- **Browser tabs:** Autonomous AI Database (Oracle) · Oracle AI Data Platform – FDEAIDP · Agent Hub – FDEAIDP · the repo. "FDEAIDP" / workspace "FDEWS" is the forward-deployed engineering team's own AIDP instance (inferred from the names).
- **README:** "Oracle AI Data Platform – Codex CLI Plugins. A marketplace of OpenAI Codex CLI plugins for Oracle AI Data Platform (AIDP)." Marketplace name `oracle-aidp-codex`; git-repository and local-directory manifests at `.agents/plugins/marketplace.json` ("The repository-root manifest supports GitHub marketplace installation. The nested manifest remains available when registering a local ai/codex-plugins checkout.").
- **Plugins table (first row):** `oracle-ai-data-platform-workbench-databricks-…` · 0.1.0 · Initial release · "Plan and execute automated Databricks to AIDP migrations from Codex."
- **Repo tree:** `ai/` → `agent-flows`, `agent-hub/agent-samples`, `aidp_chat_client`, `claude-code-plugins`, `codex-plugins` (`.agents/plugins`, `plugins`, `README.md`, `TESTING.md`), `ml-datascience`, `shared-plugin-content/…`, `supply_chain_agent`; top level → `data-engineering`, `getting-started`, `observability`, `shared-utils`.

## 07 — AIDP console: master catalog (12:17:51 · ≈13:47)

- **Navigation:** Create · Home · Master catalog · AI Registry · Workspaces → FDEWS (Workflow · Compute · Agents · Deep Insights · Experiments) · Credential store · Data sharing · Auto-populate catalog · Notifications · Roles · Audit logs · Settings · Activity.
- **Oracle's demo catalogs** (the visible part of the list): `lnk_demo_adw`, `lubricants`, `meridian_data`, `meridian_gold_data_ex`, `midwesttollway`, `nhs_fdi`, `nhs_hdi`, `novasky_adw`, `pfs_adw`, `qatar_rp_adw`, `sonymusic_ecat`, `stock_analysis`, `telecom_churn_analysis`, a vector-database catalog, `video_adb`, `vitalis`, `xenia`, `xeniaalh` — one catalog per demo or customer, two icon types (external database-backed vs native, inferred).
- **Opened:** `stock_analysis` with schemas **bronze · default · gold · silver**; bronze tables `us_income_annual`, `us_derived_annual`, `us_companies`, `us_cashflow_annual`, `us_balance_annual`, `markets`, `industries` — all Active, created Sun Oct 11, 2026 by Oscar. Oscar used it to show what the plugin builds (the three layers, files landing in bronze); it is a stock-analysis project, not the Telenor data (inferred from the names).

## 08 — Oracle slide: the AIDP architecture (12:21:57 · ≈17:53)

Slide 6 of an Oracle deck ("Copyright © 2026, Oracle and/or its affiliates"), shown when Alex asked whether Agent Hub is part of AIDP.
- **DELIVER — AI in the flow of work:** Agents (Agent Hub · Deep Insight Agents · Custom Agents) · Business Workflows (Actions · Approvals · Automation) · Applications (Embedded AI in Oracle and 3rd party) · Analytics (Insights · Research · Visualization).
- **BUILD & GOVERN — AI at scale:** AI Development & Operations (Build · Test · Deploy · Observe · Improve; Agentic Workbench · Low-code No-code · AI-Assisted Development · CI/CD & Deployment) · **Deep Insight Agents** (Investigate · Forecast · Scenario · Recommend · Act; Research · Driver Analysis · Forecasting & Scenarios · Recommendations · Human Approval) · **AI Registry** (Register · Test · Govern · Monitor · Rationalize; Discovery · Testing & Assurance · Policy Evaluation · Monitoring & Analytics · Lifecycle Management).
- **GROUND — AI in enterprise knowledge:** **Enterprise Ontology** — "a shared, governed representation of the business" (Entities · Relationships · Metrics · Cohorts · Rules · Policies · Processes · Action) · **Semantic Reasoning Engine** — "use business knowledge to determine and execute the right analysis" (Business Rules · Analytical Methods · Forecasting Functions · Expert Systems · Statistical & Scientific · Customer Models) · **AI Data Catalog** — "provides discovery, access controls and lineage" (Governance · Access Controls · Federated Data Access) · **AI Models and Frameworks** — "use the right model for the task" (Oracle · 3rd Party Models · Specialized Models · Model Management).
- **ENTERPRISE DATA ESTATE — access and curate data where it lives:** Core Business Apps (ERP · HCM · CX · SCM; Oracle or 3rd party; SaaS or on-premises) · Industry & Customer Apps · **Autonomous AI Lakehouse** (Open Formats, Apache Iceberg, Vector Search, Graph Analytics, Embedded AI) · Oracle and Non-Oracle Databases · Object Stores (Data Lake File Storage) · Streams (IoT · Events · Logs) · External catalogs (Partner Open Data).

## 09 — AI Registry: the Telenor agent's card (12:23:19 · ≈19:15)

- **"Telenor Finance Deep Insights" — AIDP agent | v1.0.0.** Description: *"FP&A analyst for Telenor's Nordic CFO review (SYNTHETIC demo data via OAC subject area 'Telenor Finance'): P&L vs budget, FX, revenue drivers, billing leakage, opex drivers, Q4 actions with evidence citations."* The demo data reaches the agent through an **Oracle Analytics Cloud subject area**.
- **Created by:** an OCI workload identity (an `ocid1.workload…` principal), i.e. created programmatically, by the plugin (inferred).
- **Agent card URL** (identifiers omitted): `https://aidp.<region>.oci.oraclecloud.com/20240831/dataLakes/<AIDP OCID>/workspaces/<workspace id>/deepinsights/agents/<agent id>/.well-known/agent-card.json` — an A2A agent card at the standard `.well-known` path.
- **Protocol** 0.3.0 · **Input modes** text/plain · Output modes (cut off). The card has a form view and a JSON view.

## 10 — AI Registry: the agent list (12:23:27 · ≈19:23)

*"AI Registry — A central registry for agents and tools, supporting open standards such as MCP and A2A."* Tabs **Agents · MCP servers · Credentials**; Register ▾; filter; sort "Date added (new-old)".

Agents, newest first: `Cummins_Planner_Sup…` (Material planning supervisor for Cummins EBS ASCP Plan 779…) · `dtcc_log_demo_agent` (Internal demo: proven DTCC high-code OAC MCP agent…) · `Cummins_ASCP_Plan_7…` (With KB) · `Cummins_ASCP_Plan_D…` (With KB) · `Cummins_ASCP_Plan_D…` (without any KB) · `SCM_Demo_Synthetic_…` (SCM_Demo_Synthetic_Material_Planning_DI) · `agent_DI_mcp` (Agent Version 1.0.0) · `MPDF_Planning_Except…` (Deep Insight for MPDF planning exceptions in…) · `Telenor_CFO_Copilot` (Telenor Nordic CFO Copilot (synthetic demo): explains…) · `Telenor Finance Deep In…` (FP&A analyst for Telenor's Nordic CFO review (SYNTHET…) · `JOSLOC Deep Insights` (Reasons over the Riyadh blending plant: formulations…) · `josloc_allocate_and_rep…` (Action agent for the Riyadh lubricant blending plant. Draf…) · `Analysis_Investigation_…` (Answers supply-chain and financial performance…) · `xenia_di` · `Analysis_Investigation_…` · `MeridianAmender` (Amender).

**Patterns visible** (inferred from the names and descriptions):
- A **Deep Insights agent paired with an action agent** for the same plant (JOSLOC: insight over formulations + an allocate-and-report action agent).
- **With-KB and without-KB variants** of one agent (Cummins ASCP), i.e. agents compared with and without a knowledge base.
- A **copilot and a Deep Insights agent** side by side for one customer (Telenor).
- **EBS-based agents** in practice (Cummins EBS ASCP material planning).
- **Oracle Analytics over MCP** (the DTCC high-code OAC MCP agent; the Telenor data via an OAC subject area).

## 11 — Agent Hub: the revenue-driver chart (12:24:06 · ≈20:02)

- Agent Hub runs on its own host next to the AIDP console (`…agenthub.datalake.oci.oraclecloud.com/chat/…`). Left: New chat · Registry · Chats (Today: "For September 2026, compare actu…") · the signed-in user (Oscar).
- **Chat:** *"For September 2026, compare actual revenue, opex and EBITDA with budget across ou[r]…"* (Oscar in the call: "…across the Nordic region").
- **Chart** — "ACTUAL minus BUDGET impact (NOK m)" by revenue driver: **FX translation −36.404 · Price/mix/adjustments +11.684 · Volume +0.72**.
- **Prompt bar:** "What are you trying to accomplish today?" · the agent chip **@Telenor Finance Deep Insights** (locked) · mode **Thinking ▾** · attach · a shield icon · voice · send.

## 12 — Agent Hub: the country gap ranking (12:24:20 · ≈20:16)

Section **"4. Country-level gap ranking"**:

| Rank | Entity | Revenue gap | Opex gap | EBITDA gap | Read-through |
|---|---|---|---|---|---|
| 1 | Norway | −15 | +12 | −22 | Largest EBITDA drag; 52.4% of net shortfall |
| 2 | Denmark | −7 | +12 | −18 | Opex pressure, led by legacy IT |
| 3 | Finland | −14 | +4 | −12 | Primarily a Revenue issue |
| 4 | Sweden | +12 | + (covered by the cursor) | +10 | Offset 23.8% of the perimeter EBITDA miss |
| — | TSS / Eliminations | 0 | 0 | 0 | Gap-neutral |
| Total | Nordic perimeter | −24 | +30 | −42 | — |

*"The priority sequence is therefore Norway first, Denmark second, Finland third. Sweden is favorable in aggregate but contains significant offsetting Revenue movements that should remain visible in the management narrative."* *"Sources: Management P&L Expert, Revenue Performance Expert and Opex Expert; synthesized at entity level."* The next section begins: "5. Underlying Revenue gaps".

---

**Not captured:** the opening of the deck (slides 1–3) and its last slides; the demo video; the second scripted question's answer ("why is Norway 50 million below revenue plan…", heard in the call); the rest of the Agent Hub answer after section 4.
