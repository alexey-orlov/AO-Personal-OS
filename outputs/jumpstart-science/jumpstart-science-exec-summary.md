# AI Jumpstart for Scientists: exec summary

_2026-10-19, v2 after a red-team pass. Condenses the 35-row [problems × tooling map](jumpstart-science-problems-x-tooling.md) into 16 use cases in 6 buckets. Two-page HTML version (screenshots and diagrams per bucket): SoftServe OneDrive `Projects/Jumpstart/AI Jumpstart for Scientists - exec summary.html`._

**Bottom line:** four AI workbenches for science are on the market. They help one scientist with literature, molecules and analysis, but none watches for new papers and patents, picks the next experiment from past runs, captures lab data, keeps engineering or regulatory records, or captures team routines. The Jumpstart builds that part, on the client's systems. Most jobs apply in every industry; five differ.

**How to read it:** every line is a job plain ChatGPT or Claude, even with Projects, can't do well. Vendor Yes = documented (October 2026); No = has to be built. Type = what the solution can't work without (one or two per row).

**Type:** 🔵 S Skills & sub-agents · 🟣 R RAG pipeline (document search) · 🟢 C Context store (shared memory) · 🟠 M MCP integration (system connector) · 🟡 A Automation (schedule or trigger) · ⚫ G Compute & models · 🔴 U Specialized UI

**Industries:** Pharma = pharma and biotech (drugs, agri-bio). Chem/energy = chemical makers, materials, oil, gas, power; one column because the same jobs apply to both. Engineered = engineered products (devices, vehicles, electronics).

| # | Problem it solves | Use case | How it works | Type | Claude Science | ChatGPT Rosalind | Microsoft Discovery | Gemini for Science | Pharma | Chem/energy | Engineered |
|---|---|---|---|---|---|---|---|---|---|---|---|
| | **1 · Know the literature** | | | | | | | | | | |
| 1 | Answers sit in 2,000 PDFs nobody can search; finding one value takes hours | Ask the team's whole library of papers and standards | Every document is indexed; each answer quotes the passage and links the page | 🟣 | No | No | Yes | No | Yes | Yes | Yes |
| 2 | Key new papers and patents get missed; scanning journals eats a day a week | Weekly watch of new papers and patents for each project | A weekly job searches literature and patent databases, skips what the team has seen, posts a digest | 🟠🟡 | No | No | No | No | Yes | Yes | Yes |
| 3 | Pulling numbers out of hundreds of papers by hand takes weeks | Numbers from hundreds of papers in one table | Two agents extract each value separately; matches go in with a quote, mismatches go to a person | 🔵 | Yes | No | No | Yes | Yes | Yes | No |
| 4 | Each target assessment takes weeks and can't be compared with the last | A standard dossier for each drug target | One template filled from genetics, chemistry and trial databases; every claim links to its record | 🔵🟠 | Yes | Yes | No | No | Yes | No | No |
| | **2 · Decide what to test** | | | | | | | | | | |
| 5 | Ideas get picked on gut feel; contradicting evidence surfaces late | Hypotheses checked against papers and our own past results | Agents propose hypotheses, argue for and against them using papers and our results, then rank them | 🔵🟢 | Yes ¹ | Yes ¹ | Yes | No ¹ | Yes | Yes | Yes |
| 6 | Too many settings to tune; changing one at a time burns months | Next experiment settings picked from all past runs | After each batch an optimizer fits all runs so far and proposes the next batch for approval | 🟢⚫ | No | No | No | No | Yes | Yes | Yes |
| | **3 · Run and capture** | | | | | | | | | | |
| 7 | Result files sit on lab PCs; a bad run is noticed weeks later | Lab results captured and checked the moment they are produced | Files are filed to their sample and checked as they land; robot scripts are dry-run first | 🟠🟡 | No | No | No | No | Yes | Yes | Yes |
| | **4 · Model and analyze** | | | | | | | | | | |
| 8 | A quick structure or docking check waits weeks for the modeling group | Molecular modeling: structures, docking, design | Prediction and docking models run on GPUs; results open in a 3D viewer with confidence scores | ⚫🔴 | Yes | Yes | Yes | No ² | Yes | Yes | No |
| 9 | Setting up each simulation costs the one expert days | Engineering simulation: stress, flow, circuits | Validated templates run parameter sweeps on the cluster; one report compares the designs | 🟠⚫ | No | No | Yes ³ | No | No | Yes | Yes |
| 10 | Everyone analyzes the same assay differently; results can't be reproduced | Every assay analyzed the same way, with a record of data and code | Each analysis method is a versioned skill; every run logs its data version, code and settings | 🔵🟢 | Yes | Yes ⁴ | Yes | No | Yes | Yes | Yes |
| | **5 · Keep traceable records** | | | | | | | | | | |
| 11 | Nobody knows what a part change breaks; old failures repeat | Engineering changes and failures traced through product records | Agents read product and quality records: what a change affects, whether a failure happened before | 🟣🟠 | No | No | No | No | No | Yes | Yes |
| 12 | Methods get rebuilt from memory; wrong or retracted references slip in | Reports and papers written from what was actually run | Methods come from notebook and run records; every reference is checked against its source | 🔵🟢 | Yes | No | No | No | Yes | Yes | Yes |
| 13 | Dossiers are stitched from scattered documents and every claim re-checked by hand | Regulatory dossiers with every statement traced to a source | Sections drafted from internal reports and guidance, each statement linked to its source; QA signs | 🔵🟣 | No | No | No | No | Yes | Yes | Yes |
| | **6 · Share across the team** | | | | | | | | | | |
| 14 | Past results and decisions live in people's heads and leave with them | One knowledge base the whole team and its agents share | Decisions, project pages and conventions live in one versioned store every agent reads first | 🟢 | No | No | Yes | No | Yes | Yes | Yes |
| 15 | Meeting decisions get lost; the Friday status takes two hours | Meetings and weekly status captured automatically | Transcripts become filed decisions and tasks; the Friday status is drafted from the week's changes | 🔵🟡 | No | No | No | No | Yes | Yes | Yes |
| 16 | Everyone prompts differently, so quality varies and good workflows don't spread | One shared skill set under admin control | Skills ship as one tested team package; restricted data is blocked | 🔵 | Yes | No | Yes | No | Yes | Yes | Yes |

¹ Claude Science and Rosalind do this in conversation; Microsoft Discovery runs a dedicated multi-agent loop. Google's Co-Scientist runs a dedicated debate-and-rank tournament, over the literature only.
² Gemini looks up AlphaFold and AlphaGenome predictions; it does not run docking or design.
³ Through separately licensed partner tools: PhysicsX (stress, flow, heat) and Synopsys (chips).
⁴ Life-science data only; Claude Science and Microsoft Discovery also take engineering and physics data.

**Status, Oct 2026:** Claude Science beta, included in Claude plans (since 30 Jun) · Rosalind Workbench research preview for verified organizations (since 28 Aug) · Microsoft Discovery generally available on Azure (June) · Gemini for Science on a Labs waitlist, enterprise preview via Google Cloud (May).

**Left out because plain chat or a Project already does it:** finding collaborators, sample-size and test-design basics, adapting one protocol, checking a reagent, notes from voice, a stats check on request, grant drafting, manuscript review, data-deposit forms.

## What the red-team pass changed (v1 → v2)

- Type dots cut to what each solution can't work without (1–2 per row); v1 tagged every part a solution touched (3–4 per row).
- Claude Science on line 1 changed to No: its docs cover literature reviews from public databases and reading local folders, not a standing team library with cited answers.
- "Runs when data lands" moved from analysis (line 10) to capture (line 7): the vendors run analyses on request, so their Yes on line 10 now holds.
- Overloaded rows cut to their core job (capture had five jobs, engineering records five, team routines three); the rest stays in the 35-row map.
- Jargon replaced with plain words (ELN, PLM/ALM/QMS, 8D, FEA/CFD, HPC, QC, omics, Bayesian optimization, provenance).
- Buckets regrouped by solution kind: capture (event pipelines) apart from analysis (compute), analysis joined modeling.
- The bench diagram hands over to line 10 instead of repeating analysis steps; colour dots removed from diagrams (shapes only).
- Problem column and industry relevance added. Relevance is per row, because per bucket it came out Yes almost everywhere.

## Pictures in the HTML version

| Bucket | Picture | Source |
|---|---|---|
| 1 | Claude Science literature review (cropped) | [Anthropic](https://www.anthropic.com/news/claude-science-ai-workbench) |
| 2 | AI co-scientist agents diagram (untouched) | [Google Research](https://research.google/blog/accelerating-scientific-breakthroughs-with-an-ai-co-scientist/) |
| 4 | Rosalind Workbench structure viewer (cropped to the window) | [OpenAI](https://developers.openai.com/blog/rosalind-workbench) |
| 3, 5, 6 | Diagrams drawn for this summary; no vendor covers these buckets | SoftServe |

## Which map rows each line covers

| Line | Map rows | Line | Map rows | Line | Map rows | Line | Map rows |
|---|---|---|---|---|---|---|---|
| 1 | 2, 27 | 5 | 8 | 9 | 12 | 13 | 29 |
| 2 | 1, 5 | 6 | 9 | 10 | 18–21 | 14 | 31 |
| 3 | 3, 4 | 7 | 10, 14–17 | 11 | 13, 22–26 | 15 | 30, 32, 33 |
| 4 | 7 | 8 | 11 | 12 | 6, 28 | 16 | 34, 35 |

## Sources

- Claude Science: [Anthropic announcement](https://www.anthropic.com/news/claude-science-ai-workbench) · [docs overview](https://claude.com/docs/claude-science/overview) · [connectors and skills](https://claude.com/docs/claude-science/connectors-and-skills)
- ChatGPT Rosalind Workbench: [OpenAI blog](https://developers.openai.com/blog/rosalind-workbench) · [GPT-Rosalind analysis (IntuitionLabs)](https://intuitionlabs.ai/articles/openai-gpt-rosalind-biochemical-reasoning-model)
- Microsoft Discovery: [Learn: agent concepts](https://learn.microsoft.com/en-us/azure/microsoft-discovery/concept-discovery-agent) · [Azure blog](https://azure.microsoft.com/en-us/blog/transforming-rd-with-agentic-ai-introducing-microsoft-discovery/) · [GA at Build 2026](https://rcpmag.com/articles/2026/06/02/microsoft-discovery-reaches-ga.aspx) · [PhysicsX toolchain](https://www.physicsx.ai/newsroom/agentic-engineering-revolution-the-physicsx-platform-and-microsoft-discovery-at-the-forefront-of-ai-innovation-part-1)
- Gemini for Science: [Google blog](https://blog.google/innovation-and-ai/technology/research/gemini-for-science-io-2026) · [ChatForest review](https://chatforest.com/reviews/google-gemini-for-science-research-ai-platform-review/)
- Industries: [2026-10-19 sync](../../context/areas/softserve/calls/jumpstart-science/2026-10-19_201609_default_pasted-science-jumpstart-sync.md) (pharma, chemical manufacturing, energy as the three targets)
