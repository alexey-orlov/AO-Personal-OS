# AI Jumpstart for Scientists: exec summary

_2026-10-19. Condenses the 35-row [problems × tooling map](jumpstart-science-problems-x-tooling.md) into 16 use cases in 6 buckets, checked against the vendor science workbenches. Two-page HTML version (with screenshots and diagrams per bucket): SoftServe OneDrive `Projects/Jumpstart/AI Jumpstart for Scientists - exec summary.html`._

**Bottom line:** the vendor workbenches cover one scientist's literature work, modeling and analysis. None of them runs a literature and patent watch, picks the next experiments from your run history, captures lab data, keeps engineering or regulatory records, or captures team routines, and only Microsoft Discovery gives a team a shared knowledge base. That ground (your systems, your team's memory, pipelines that run on their own) is what the Jumpstart builds.

**Bar for a line:** plain ChatGPT or Claude, even with Projects, can't do the job, or does it poorly or slowly.

**Flags:** Yes = the vendor documents it as a built-in feature, bundled skill or ready connector (Oct 2026). No = not documented, so you would build it.

**Built from:** 🔵 S Skills & sub-agents · 🟣 R RAG pipeline · 🟢 C Context store · 🟠 M MCP integration · 🟡 A Automation (schedule or trigger) · ⚫ G Compute & models (GPU, HPC) · 🔴 U Specialized UI

| # | Use case | How it works | Built from | What the Jumpstart builds | Claude Science | ChatGPT Rosalind | Microsoft Discovery | Gemini for Science |
|---|---|---|---|---|---|---|---|---|
| | **1 · Literature, patents and databases** (indexes, extraction agents, a weekly job) | | | | | | | |
| 1 | Answers from the team's whole library, thousands of papers and standards, cited to the page | The team's papers and standards, synced from the reference manager, are indexed passage by passage; an agent answers and links each claim to its page. | 🔵🟣🟠 | Literature RAG · Specs & Standards RAG · Citation Checker | Yes | No | Yes | No |
| 2 | Weekly digests of new papers, preprints and patents per project; patent landscapes | Every Monday a job searches papers, preprints and patents with each project's terms, drops what the team has seen, and posts a ranked digest. | 🔵🟢🟠🟡 | Scheduled `/lit-watch` · Patent MCP · digest in Messenger | No | No | No | No |
| 3 | Evidence tables from hundreds of papers, every value with its quote and page | Papers are fetched from the literature databases; two agents fill the same fields separately, agreements go in with their quote, disagreements to a person. | 🔵🟢🟠 | Dual Extractor · Evidence Table | Yes | No | No | Yes |
| 4 | Target and indication dossiers from genetics, chemistry and trial databases (LS) | A fixed template is filled from genetics, chemistry and trial databases, every claim linked to its record, and refreshed each quarter. | 🔵🟢🟠🟡 | Bio/chem DB MCPs · `/target-dossier` | Yes | Yes | No | No |
| | **2 · What to test next** (debating agents, an optimizer) | | | | | | | |
| 5 | Hypotheses ranked against the literature and our own past results | Agents propose hypotheses from papers and our past results, argue for and against them in rounds, and rank the survivors with the cheapest test to kill each. | 🔵🟣🟢 | Hypothesis tournament over Context DB + Data Catalog | Yes ¹ | Yes ¹ | Yes | No ¹ |
| 6 | Next experiments picked from all past runs by Bayesian optimization | When a batch's results land, an optimizer fits every run so far and proposes the next batch; a scientist approves it before it runs. | 🟢🟠🟡⚫ | Experiment Optimizer over the Data Catalog | No | No | No | No |
| | **3 · Modeling and simulation** (models and solvers on GPU and HPC) | | | | | | | |
| 7 | Molecular modeling: structure, docking, protein and molecule design (LS, chem) | The agent runs structure prediction, docking and design models on GPUs and shows the structures with confidence scores in a 3D viewer. | 🟠⚫🔴 | Science model tools · GPU Workflow runner | Yes | Yes | Yes | No ² |
| 8 | Engineering simulation: FEA, CFD, circuits, design optimization (HW) | The agent builds the run from a validated template, sweeps parameters on HPC through the simulation tools, and compares the variants in one report. | 🔵🟠⚫ | Simulation tools · CAD/EDA MCPs · HPC runner | No | No | Yes ³ | No |
| | **4 · Bench to result** (pipelines triggered by new data) | | | | | | | |
| 9 | Lab capture and automation: instrument files, QC, robot scripts, partner data, reorders | Instrument files are filed against their sample and protocol and QC-checked as they land; failures go to the team channel; robot scripts are simulated first. | 🔵🟢🟠🟡 | Lab hardware control · Instrument data → Data Catalog · ELN/LIMS | No | No | No | No |
| 10 | Analysis to one standard: same method every run, omics pipelines, all runs mined, provenance | Each assay's analysis is a versioned skill that runs when data lands, on the team's GPUs or HPC, logging data version, code and environment. | 🔵🟢🟡⚫ | Per-assay skills · Analysis Sandbox · Run Log | Yes | Yes ⁴ | Yes | No |
| | **5 · Traceable records** (agents inside systems of record, sign-off) | | | | | | | |
| 11 | Engineering records: requirements, change impact, design reviews, tests, failures (HW) | On every change in PLM, ALM or QMS, agents flag weak requirements, trace a part swap to affected tests and certificates, and match failures to past 8Ds. | 🔵🟣🟠🟡 | PLM/ALM · QMS · Component distributor MCPs | No | No | No | No |
| 12 | Methods and results drafted from the actual records; every reference checked | Methods are written from the ELN entries and run logs; every reference is checked to exist, to support its sentence and not to be retracted. | 🔵🟢🟠 | `/methods-draft` · Citation Checker | Yes | No | No | No |
| 13 | Regulatory and quality dossiers, every statement traced to its source document | Each section is drafted from internal reports and the governing guidance, with a table tracing every statement to its source; QA signs before release. | 🔵🟣🟠 | Internal Docs RAG · Specs & Standards RAG · Approval gate | No | No | No | No |
| | **6 · Team layer** (shared repo, routines, governed skills) | | | | | | | |
| 14 | One knowledge base the whole team and its agents share: decisions, documents, results | Decisions, project pages and conventions live in one versioned store every agent reads first; people browse it in a console or ask in the team channel. | 🟣🟢🟠🔴 | Context DB · Internal Docs RAG · Entity Registry | No | No | Yes | No |
| 15 | Team routines captured on their own: meeting decisions, Friday status, handovers | Meeting transcripts become decisions and tasks filed to project pages and the tracker; Friday status is drafted from what changed during the week. | 🔵🟢🟠🟡 | `/process-meeting` · `/weekly-review` · `/handover` | No | No | No | No |
| 16 | One shared, versioned skill set, with admin controls and data rules | Skills ship as one team package; each change passes review and a test set before everyone gets it, and hooks block restricted data. | 🔵🟡 | Team Plugin · Eval Set · data-classification hooks | Yes | No | Yes | No |

¹ Claude Science and Rosalind do this in conversation; Microsoft's Discovery Engine runs a dedicated multi-agent loop over your documents. Google's Co-Scientist runs a dedicated generate-debate-rank tournament, over the literature only.
² Gemini looks up AlphaFold DB and AlphaGenome predictions; it doesn't run docking or design.
³ Through separately licensed partner toolchains, PhysicsX (CFD, structural, thermal) and Synopsys (chip design); they link to no PLM or ALM records, so line 11 stays No.
⁴ Life-science data only. Claude Science and Microsoft Discovery also take engineering, materials and physics data.

**Status, Oct 2026:**
- **Claude Science:** beta since 30 Jun, included in Claude Pro, Max, Team and Enterprise.
- **ChatGPT Rosalind Workbench:** research preview in ChatGPT and Codex since 28 Aug, for verified organizations only.
- **Microsoft Discovery:** generally available on Azure since Build (June).
- **Gemini for Science:** Google's tailored product, announced at I/O in May; Labs waitlist, with an enterprise preview through Google Cloud.

**Dropped because plain chat or a Project handles it well enough:** collaborator scouting, power and DoE basics, adapting one protocol, reagent and cell-line checks, ELN notes from voice or photos, stats review on request, grant drafting, manuscript review and rebuttals, data-deposit metadata.

## Pictures in the HTML version

| Bucket | Picture | Source |
|---|---|---|
| 1 | Claude Science literature review: parallel searches, reviewer finding, compiled PDF (cropped) | [Anthropic announcement](https://www.anthropic.com/news/claude-science-ai-workbench) |
| 2 | AI co-scientist specialized agents diagram (untouched) | [Google Research](https://research.google/blog/accelerating-scientific-breakthroughs-with-an-ai-co-scientist/) |
| 3 | Rosalind Workbench molecular structure viewer (cropped to the window) | [OpenAI](https://developers.openai.com/blog/rosalind-workbench) |
| 4, 5, 6 | Diagrams drawn for this summary; no vendor covers these buckets | SoftServe |

## Which map rows each line covers

| Line | Map rows | Line | Map rows | Line | Map rows | Line | Map rows |
|---|---|---|---|---|---|---|---|
| 1 | 2, 27 | 5 | 8 | 9 | 10, 14–17 | 13 | 29 |
| 2 | 1, 5 | 6 | 9 | 10 | 18–21 | 14 | 31 |
| 3 | 3, 4 | 7 | 11 | 11 | 13, 22–26 | 15 | 30, 32, 33 |
| 4 | 7 | 8 | 12 | 12 | 6, 28 | 16 | 34, 35 |

## Sources

- Claude Science: [Anthropic announcement](https://www.anthropic.com/news/claude-science-ai-workbench) · [docs overview](https://claude.com/docs/claude-science/overview) · [connectors and skills](https://claude.com/docs/claude-science/connectors-and-skills)
- ChatGPT Rosalind Workbench: [OpenAI blog](https://developers.openai.com/blog/rosalind-workbench) · [GPT-Rosalind analysis (IntuitionLabs)](https://intuitionlabs.ai/articles/openai-gpt-rosalind-biochemical-reasoning-model) · [CBIRT](https://cbirt.net/rosalind-workbench-openai-connects-ai-genomics-and-scientific-workflows/)
- Microsoft Discovery: [Learn: agent concepts](https://learn.microsoft.com/en-us/azure/microsoft-discovery/concept-discovery-agent) · [Azure blog](https://azure.microsoft.com/en-us/blog/transforming-rd-with-agentic-ai-introducing-microsoft-discovery/) · [GA at Build 2026 (Redmond Channel Partner)](https://rcpmag.com/articles/2026/06/02/microsoft-discovery-reaches-ga.aspx) · [PhysicsX toolchain](https://www.physicsx.ai/newsroom/agentic-engineering-revolution-the-physicsx-platform-and-microsoft-discovery-at-the-forefront-of-ai-innovation-part-1)
- Gemini for Science: [Google blog](https://blog.google/innovation-and-ai/technology/research/gemini-for-science-io-2026) · [ChatForest review](https://chatforest.com/reviews/google-gemini-for-science-research-ai-platform-review/) · [Google Research: AI co-scientist](https://research.google/blog/accelerating-scientific-breakthroughs-with-an-ai-co-scientist/)
