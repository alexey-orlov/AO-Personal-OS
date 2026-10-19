# AI Jumpstart for Scientists: exec summary

_2026-10-19. Condenses the 35-row [problems × tooling map](jumpstart-science-problems-x-tooling.md) into 16 use cases, checked against the vendor science workbenches._

**Bottom line:** the vendor workbenches cover one scientist's literature work, modeling and analysis. None of them runs a literature and patent watch, picks the next experiments from your run history, drives the lab, keeps hardware engineering records, assembles regulatory dossiers or captures team routines, and only Microsoft Discovery gives a team a shared knowledge base. That ground (your systems, your team's memory, pipelines that run on their own) is what the Jumpstart builds.

**Bar for a line:** plain ChatGPT or Claude, even with Projects, can't do the job, or does it poorly or slowly. Each line needs the team's data at a scale no Project holds, live lab or engineering systems, code run on real data, a schedule, or skills shared across the team.

**Flags:** Yes = the vendor documents it as a built-in feature, bundled skill or ready connector (Oct 2026). No = not documented, so you would build it.

| # | Use case | What the Jumpstart builds | Claude Science | ChatGPT Rosalind | Microsoft Discovery | Gemini for Science |
|---|---|---|---|---|---|---|
| 1 | Answers from the team's whole library, thousands of papers and standards, cited to the page | Literature RAG · Specs & Standards RAG · Citation Checker | Yes | No | Yes | No |
| 2 | Weekly digests of new papers, preprints and patents per project; patent landscapes | Scheduled `/lit-watch` · Patent MCP · digest in Messenger | No | No | No | No |
| 3 | Evidence tables from hundreds of papers, every value with quote and page | Dual Extractor · Evidence Table | Yes | No | No | Yes |
| 4 | Target and indication dossiers from genetics, chemistry and trial databases (LS) | Bio/chem DB MCPs · `/target-dossier` | Yes | Yes | No | No |
| 5 | Hypotheses ranked against the literature and our own past results | Hypothesis tournament over Context DB + Data Catalog | Yes ¹ | Yes ¹ | Yes | No ¹ |
| 6 | Next experiments picked from all past runs by Bayesian optimization | Experiment Optimizer over the Data Catalog | No | No | No | No |
| 7 | Lab automation and capture: robot scripts, instrument files, QC on every run, partner data, reorders | Lab hardware control · Instrument data → Data Catalog · ELN/LIMS | No | No | No | No |
| 8 | Molecular modeling: structure, docking, protein and molecule design (LS, chem) | Science model tools · GPU Workflow runner | Yes | Yes | Yes | No ² |
| 9 | Engineering simulation: FEA, CFD, circuits, design optimization (HW) | Simulation tools · CAD/EDA MCPs · HPC runner | No | No | Yes ³ | No |
| 10 | Analysis to one standard: same method every run, omics pipelines, all runs mined, full provenance | Per-assay skills · Analysis Sandbox · Run Log | Yes | Yes ⁴ | Yes | No |
| 11 | Hardware engineering records: BOM risk, requirements, change impact, design reviews, test reports, failure analysis (HW) | PLM/ALM · QMS · Component distributor MCPs | No | No | No | No |
| 12 | Methods and results drafted from the actual records; every reference checked against its source | `/methods-draft` · Citation Checker | Yes | No | No | No |
| 13 | Regulatory and quality dossiers, every statement traced to its source document | Internal Docs RAG · Specs & Standards RAG · Approval gate | No | No | No | No |
| 14 | One knowledge base the whole team and its agents share: decisions, documents, past results | Context DB · Internal Docs RAG · Entity Registry | No | No | Yes | No |
| 15 | Team routines captured on their own: meeting decisions, Friday status, handovers | `/process-meeting` · `/weekly-review` · `/handover` | No | No | No | No |
| 16 | One shared, versioned skill set, with admin controls and data rules | Team Plugin · Eval Set · data-classification hooks | Yes | No | Yes | No |

¹ Claude Science and Rosalind do this in conversation, and Microsoft's Discovery Engine runs a dedicated multi-agent loop over your documents. Google's Co-Scientist runs a dedicated generate–debate–rank tournament, but over the literature only, not your data.
² Gemini looks up AlphaFold DB and AlphaGenome predictions; it doesn't run docking or design.
³ Through separately licensed partner toolchains: PhysicsX (CFD, structural, thermal) and Synopsys (chip design). They check designs against manufacturing rules but link to no PLM/ALM records, so line 11 stays No.
⁴ Life-science data only (sequencing, structures, pathology slides). Claude Science and Microsoft Discovery also take engineering, materials and physics data.

**Status, Oct 2026:**
- **Claude Science:** beta since 30 Jun, included in Claude Pro, Max, Team and Enterprise.
- **ChatGPT Rosalind Workbench:** research preview in ChatGPT and Codex since 28 Aug, for verified organizations only.
- **Microsoft Discovery:** generally available on Azure since Build (June).
- **Gemini for Science:** Google's tailored product, announced at I/O in May; Labs waitlist, with an enterprise preview through Google Cloud.

**Dropped because plain chat or a Project handles it well enough:** collaborator scouting, power and DoE basics, adapting one protocol, reagent and cell-line checks, ELN notes from voice or photos, stats review on request, grant drafting, manuscript review and rebuttals, data-deposit metadata.

## Which map rows each line covers

| Line | Map rows | Line | Map rows | Line | Map rows | Line | Map rows |
|---|---|---|---|---|---|---|---|
| 1 | 2, 27 | 5 | 8 | 9 | 12 | 13 | 29 |
| 2 | 1, 5 | 6 | 9 | 10 | 18–21 | 14 | 31 |
| 3 | 3, 4 | 7 | 10, 14–17 | 11 | 13, 22–26 | 15 | 30, 32, 33 |
| 4 | 7 | 8 | 11 | 12 | 6, 28 | 16 | 34, 35 |

## Sources

- Claude Science: [Anthropic announcement](https://www.anthropic.com/news/claude-science-ai-workbench) · [docs overview](https://claude.com/docs/claude-science/overview) · [connectors and skills](https://claude.com/docs/claude-science/connectors-and-skills)
- ChatGPT Rosalind Workbench: [OpenAI blog](https://developers.openai.com/blog/rosalind-workbench) · [GPT-Rosalind analysis (IntuitionLabs)](https://intuitionlabs.ai/articles/openai-gpt-rosalind-biochemical-reasoning-model) · [CBIRT](https://cbirt.net/rosalind-workbench-openai-connects-ai-genomics-and-scientific-workflows/)
- Microsoft Discovery: [Learn: agent concepts](https://learn.microsoft.com/en-us/azure/microsoft-discovery/concept-discovery-agent) · [Azure blog](https://azure.microsoft.com/en-us/blog/transforming-rd-with-agentic-ai-introducing-microsoft-discovery/) · [GA at Build 2026 (Redmond Channel Partner)](https://rcpmag.com/articles/2026/06/02/microsoft-discovery-reaches-ga.aspx) · [PhysicsX toolchain](https://www.physicsx.ai/newsroom/agentic-engineering-revolution-the-physicsx-platform-and-microsoft-discovery-at-the-forefront-of-ai-innovation-part-1)
- Gemini for Science: [Google blog](https://blog.google/innovation-and-ai/technology/research/gemini-for-science-io-2026) · [ChatForest review](https://chatforest.com/reviews/google-gemini-for-science-research-ai-platform-review/)
