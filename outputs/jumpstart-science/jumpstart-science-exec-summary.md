# AI Jumpstart for Scientists: exec summary

_2026-10-19. Condenses the 44-row [problems × tooling map](jumpstart-science-problems-x-tooling.md) into 15 use cases, checked against the four vendor science workbenches._

**Bottom line:** the vendor workbenches handle one scientist's desk research, modeling and analysis well. None of them watches the literature and patents for you, drives the lab, keeps hardware engineering records, assembles regulatory dossiers or captures team meetings, and only Microsoft Discovery gives a team a shared knowledge base. That ground (the team layer, your own systems, pipelines that run on their own) is what the Jumpstart builds.

Yes = the vendor documents it as a built-in feature, bundled skill or ready connector (Oct 2026). No = not documented, so you would build it.

| # | Use case | What the Jumpstart builds | Claude Science | ChatGPT Rosalind | Microsoft Discovery | Gemini for Science |
|---|---|---|---|---|---|---|
| 1 | Desk research with citations: papers, databases, standards, target dossiers | Literature RAG · database MCPs · Citation Checker | Yes | Yes | Yes | Yes |
| 2 | Weekly digests of new papers, preprints and patents; prior-art landscapes | Scheduled `/lit-watch` · Patent MCP · digest in Messenger | No | No | No | No |
| 3 | Numbers from hundreds of papers in one evidence table | Dual Extractor · Evidence Table | Yes | No | No | Yes |
| 4 | Hypotheses generated and ranked, with evidence for and against | Hypothesis tournament over Context DB + Data Catalog | Yes ¹ | Yes ¹ | Yes | Yes |
| 5 | Experiment design: protocol, reagents, controls, sample size, next batch | Protocol Library · ELN/LIMS stock · Stats Reviewer · Experiment Optimizer | Yes | Yes | Yes | No |
| 6 | Lab automation and capture: robot scripts, ELN entries, instrument files, QC flags | Lab hardware control · Instrument data → Data Catalog | No | No | No | No |
| 7 | Molecular modeling: structure, docking, protein and molecule design (LS, chem) | Science model tools · GPU Workflow runner | Yes | Yes | Yes | No ² |
| 8 | Engineering simulation: FEA, CFD, circuits, design optimization (HW) | Simulation tools · CAD/EDA MCPs · HPC runner | No | No | Yes ³ | No |
| 9 | Analysis of your own data: assays, omics, statistics; reproducible, on your compute | Analysis Sandbox · per-assay skills · Run Log | Yes | Yes ⁴ | Yes | No |
| 10 | Hardware engineering records: parts, requirements, BOM changes, design reviews, test reports, failure analysis (HW) | PLM/ALM · QMS · Component distributor MCPs | No | No | No | No |
| 11 | Papers and grants: methods, figures, manuscript review, reference checks, funding search | `/methods-draft` from ELN · Reviewer Panel · Citation Checker | Yes | No ⁵ | No | No |
| 12 | Regulatory and quality dossiers, every statement traced to its source | Internal Docs + Specs & Standards RAG · Approval gate | No | No | No | No |
| 13 | One knowledge base the whole team and its agents read: decisions, documents, past results | Context DB · Internal Docs RAG · Entity Registry | No | No | Yes | No |
| 14 | Team routines captured: meeting decisions and actions, weekly status, handovers | `/process-meeting` · `/weekly-review` · `/handover` | No | No | No | No |
| 15 | One shared, versioned skill set, with admin controls and data rules | Team Plugin · Eval Set · data-classification hooks | Yes | No | Yes | No |

¹ In conversation. Gemini (Co-Scientist's generate–debate–rank tournament) and Microsoft (the Discovery Engine's hypothesis → experiment → analysis loop) have dedicated multi-agent engines for this.
² Gemini looks up AlphaFold DB and AlphaGenome predictions; it doesn't run docking or design.
³ Through separately licensed partner toolchains: PhysicsX (CFD, structural, thermal) and Synopsys (chip design). They check designs against manufacturing rules but link to no PLM/ALM records, so row 10 stays No.
⁴ Life-science data only (sequencing, structures, pathology slides). Claude Science and Microsoft Discovery also take engineering, materials and physics data.
⁵ OpenAI covers paper writing in Prism, a separate free LaTeX workspace.

**Status, Oct 2026:**
- **Claude Science:** beta since 30 Jun, included in Claude Pro, Max, Team and Enterprise.
- **ChatGPT Rosalind Workbench:** research preview in ChatGPT and Codex since 28 Aug, for verified organizations only.
- **Microsoft Discovery:** generally available on Azure since Build (June).
- **Gemini for Science:** Google's tailored product, announced at I/O in May; Labs waitlist, with an enterprise preview through Google Cloud.

## Which map rows each line covers

| Line | Map rows | Line | Map rows | Line | Map rows |
|---|---|---|---|---|---|
| 1 | 2, 7, 8, 33 | 6 | 13, 18–22 | 11 | 6, 34–36, 38 |
| 2 | 1, 5 | 7 | 14 | 12 | 37 |
| 3 | 3, 4 | 8 | 15 | 13 | 40 |
| 4 | 9 | 9 | 23–27 | 14 | 39, 41, 42 |
| 5 | 10–12, 16 | 10 | 17, 28–32 | 15 | 43, 44 |

## Sources

- Claude Science: [Anthropic announcement](https://www.anthropic.com/news/claude-science-ai-workbench) · [docs overview](https://claude.com/docs/claude-science/overview) · [connectors and skills](https://claude.com/docs/claude-science/connectors-and-skills)
- ChatGPT Rosalind Workbench: [OpenAI blog](https://developers.openai.com/blog/rosalind-workbench) · [GPT-Rosalind analysis (IntuitionLabs)](https://intuitionlabs.ai/articles/openai-gpt-rosalind-biochemical-reasoning-model) · [CBIRT](https://cbirt.net/rosalind-workbench-openai-connects-ai-genomics-and-scientific-workflows/)
- Microsoft Discovery: [Learn: agent concepts](https://learn.microsoft.com/en-us/azure/microsoft-discovery/concept-discovery-agent) · [Azure blog](https://azure.microsoft.com/en-us/blog/transforming-rd-with-agentic-ai-introducing-microsoft-discovery/) · [GA at Build 2026 (Redmond Channel Partner)](https://rcpmag.com/articles/2026/06/02/microsoft-discovery-reaches-ga.aspx) · [PhysicsX toolchain](https://www.physicsx.ai/newsroom/agentic-engineering-revolution-the-physicsx-platform-and-microsoft-discovery-at-the-forefront-of-ai-innovation-part-1)
- Gemini for Science: [Google blog](https://blog.google/innovation-and-ai/technology/research/gemini-for-science-io-2026) · [ChatForest review](https://chatforest.com/reviews/google-gemini-for-science-research-ai-platform-review/)
- OpenAI Prism: [TechCrunch](https://techcrunch.com/2026/01/27/openai-launches-prism-a-new-ai-workspace-for-scientists/)
