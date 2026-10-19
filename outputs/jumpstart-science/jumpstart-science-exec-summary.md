# AI Jumpstart for Scientists: exec summary

_2026-10-19, v4: red-teamed, industry relevance per bucket, three minor rows dropped. Condenses the 35-row [problems × tooling map](jumpstart-science-problems-x-tooling.md) into 13 use cases in 6 buckets. Two-page HTML version (screenshots and diagrams per bucket): SoftServe OneDrive `Projects/Jumpstart/AI Jumpstart for Scientists - exec summary.html`._

**Bottom line:** four AI workbenches for science help one scientist with literature, molecules and analysis. None watches new papers and patents, picks the next experiment from past runs, captures lab data, or keeps the paper trail that design changes and regulators demand; the Jumpstart builds that, for the whole team. Most jobs apply in every industry; the rest depend on having a lab, molecules or hardware.

**How to read it:** every line is a job plain ChatGPT or Claude, even with Projects, can't do well. Vendor Yes = documented (October 2026); No = has to be built. Type = what the solution can't work without (one or two per row).

**Type:** 🔵 S Skills & sub-agents · 🟣 R RAG pipeline (document search) · 🟢 C Context store (shared memory) · 🟠 M MCP integration (system connector) · 🟡 A Automation (schedule or trigger) · ⚫ G Compute & models · 🔴 U Specialized UI

**Industries** (one answer per bucket; the row text shows which part applies where only part does): Life sci = pharma, biotech, crop science, diagnostics, CROs. Materials = materials & process industries: chemicals, energy, semiconductors, metals, batteries, food and consumer formulation. Engineered = engineered products: devices, vehicles, electronics. AI research = research teams without a lab, SoftServe's own included. Not covered yet: energy geoscience (seismic, well data).

| # | Problem it solves | Use case | How it works | Type | Claude Science | ChatGPT Rosalind | Microsoft Discovery | Gemini for Science | Life sci | Materials | Engineered | AI research |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | **1 · Know the literature** | | | | | | | | **Yes** | **Yes** | **Yes (library, watch)** | **Yes** |
| 1 | Answers sit in 2,000 PDFs nobody can search; finding one value takes hours | Ask the team's whole library of papers and standards | Every document is indexed; each answer quotes the passage and links the page | 🟣 | No | No | Yes | No | | | | |
| 2 | Key new papers and patents get missed; scanning journals eats a day a week | Weekly watch of new papers and patents for each project | A weekly job searches papers and patents, skips what the team has seen, posts a digest | 🟠🟡 | No | No | No | No | | | | |
| 3 | Pulling numbers out of hundreds of papers by hand takes weeks | Numbers from hundreds of papers in one table | Two agents extract each value separately; matches go in with a quote, mismatches go to a person | 🔵 | Yes | No | No | Yes | | | | |
| | **2 · Learn from our results** | | | | | | | | **Yes** | **Yes** | **Yes** | **Yes** |
| 4 | Everyone analyzes the same experiment differently; results can't be reproduced | Every experiment analyzed the same way, with a record of data and code | Each analysis method is a versioned skill; every run logs its data version, code and settings | 🔵🟢 | Yes | Yes ⁴ | Yes | No | | | | |
| 5 | Ideas get picked on gut feel; contradicting evidence surfaces late | Hypotheses checked against papers and our own past results | Agents propose hypotheses, argue for and against them using papers and our results, then rank them | 🔵🟢 | Yes ¹ | Yes ¹ | Yes | No ¹ | | | | |
| 6 | Too many settings to tune; changing one at a time burns months | Next experiment settings picked from all past runs | After each batch an optimizer fits all runs so far and proposes the next batch for approval | 🟢⚫ | No | No | No | No | | | | |
| | **3 · Run and capture** | | | | | | | | **Yes** | **Yes** | **Yes** | **No** |
| 7 | Result files sit on lab PCs; a bad run is noticed weeks later | Lab results captured and checked the moment they are produced | Files are filed to their sample and checked as they land; robot scripts are dry-run first | 🟠🟡 | No | No | No | No | | | | |
| | **4 · Model before building** | | | | | | | | **Yes (molecules)** | **Yes** | **Yes (designs)** | **No** |
| 8 | A quick structure or docking check waits weeks for the modeling group | Molecular and materials modeling: structures, docking, design | Models run on GPUs; results open in a 3D viewer with confidence scores | ⚫🔴 | Yes | Yes | Yes | No ² | | | | |
| 9 | Setting up each simulation costs the one expert days | Engineering simulation: stress, flow, circuits | Validated templates run parameter sweeps on the cluster; one report compares the designs | 🟠⚫ | No | No | Yes ³ | No | | | | |
| | **5 · Keep the paper trail** | | | | | | | | **Yes (regulator files)** | **Yes** | **Yes** | **No** |
| 10 | A part swap quietly breaks a certified feature; old failures repeat | See what a design change affects before making it | Agents trace a change to the tests, certificates and past failures it touches | 🟣🟠 | No | No | No | No | | | | |
| 11 | One unsupported claim in a regulator file can delay approval for months | Files for regulators where every claim points to its evidence | Drafted from lab and test records, every statement cited; a quality lead signs off | 🔵🟣 | No | No | No | No | | | | |
| | **6 · Share across the team** | | | | | | | | **Yes** | **Yes** | **Yes** | **Yes** |
| 12 | Past results and decisions live in people's heads and leave with them | One knowledge base the whole team and its agents share | Decisions and conventions in one store every agent reads; meeting notes keep it current | 🟢 | No | No | Yes | No | | | | |
| 13 | Everyone prompts differently, so quality varies and good workflows don't spread | One shared skill set under admin control | Skills ship as one tested team package; restricted data is blocked | 🔵 | Yes | No | Yes | No | | | | |
¹ Claude Science and Rosalind do this in conversation; Microsoft Discovery runs a dedicated multi-agent loop. Google's Co-Scientist runs a dedicated debate-and-rank tournament, over the literature only.
² Gemini looks up AlphaFold and AlphaGenome predictions; it does not run docking or design.
³ Through separately licensed partner tools: PhysicsX (stress, flow, heat) and Synopsys (chips).
⁴ Life-science data only; Claude Science and Microsoft Discovery also take engineering and physics data.

**Status, Oct 2026:** Claude Science beta, included in Claude plans (since 30 Jun) · Rosalind Workbench research preview for verified organizations (since 28 Aug) · Microsoft Discovery generally available on Azure (June) · Gemini for Science on a Labs waitlist, enterprise preview via Google Cloud (May).

**Left out because plain chat or a Project already does it:** finding collaborators, sample-size and test-design basics, adapting one protocol, checking a reagent, notes from voice, a stats check on request, grant drafting, manuscript review, data-deposit forms. **In the full map, not shown here:** drug-target dossiers, write-ups from run records, meeting capture.

## What the red-team pass changed (v1 → v2)

- Type dots cut to what each solution can't work without (1–2 per row); v1 tagged every part a solution touched (3–4 per row).
- Claude Science on line 1 changed to No: its docs cover literature reviews from public databases and reading local folders, not a standing team library with cited answers.
- "Runs when data lands" moved from analysis (line 10) to capture (line 7): the vendors run analyses on request, so their Yes on line 10 now holds.
- Overloaded rows cut to their core job (capture had five jobs, engineering records five, team routines three); the rest stays in the 35-row map.
- Jargon replaced with plain words (ELN, PLM/ALM/QMS, 8D, FEA/CFD, HPC, QC, omics, Bayesian optimization, provenance).
- Buckets regrouped by solution kind: capture (event pipelines) apart from analysis (compute), analysis joined modeling.
- The bench diagram hands over to line 10 instead of repeating analysis steps; colour dots removed from diagrams (shapes only).
- Line 10 (analysis) and line 12 (reports and papers) moved into bucket 2, now "Learn from our results"; bucket 4 became "Model before building". Every bucket then gets one Yes/No per industry, with a one-word note where only part applies.
- Dropped as minor or overlapping: the drug-target dossier (one industry, already covered by two vendors), write-ups from run records (mostly plain drafting; the rest overlaps lines 4 and 11), meeting and status capture (generic; it now just keeps the knowledge base current).
- The records bucket rewritten for readers without background: "Keep the paper trail" names which records (a product's design and test records; files for regulators), what traceability means (every claim and change points to its evidence) and why it matters (a broken certification, approval delayed for months).
- Problem column and industry relevance added. Relevance is per row, because per bucket it came out Yes almost everywhere. Four groups: the call's three targets fold into life sciences and materials & process (chemicals and energy share every flag); engineered products and AI & data research cover R&D outside them.

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
| 1 | 2, 27 | 5 | 8 | 9 | 12 | 13 | 34, 35 |
| 2 | 1, 5 | 6 | 9 | 10 | 13, 22–26 |  |  |
| 3 | 3, 4 | 7 | 10, 14–17 | 11 | 29 |  |  |
| 4 | 18–21 | 8 | 11 | 12 | 31 |  |  |

Not in the exec view (kept in the map): rows 6, 7, 28 (write-ups and drug-target dossiers) and 30, 32, 33 (status, handover, meetings).

## Sources

- Claude Science: [Anthropic announcement](https://www.anthropic.com/news/claude-science-ai-workbench) · [docs overview](https://claude.com/docs/claude-science/overview) · [connectors and skills](https://claude.com/docs/claude-science/connectors-and-skills)
- ChatGPT Rosalind Workbench: [OpenAI blog](https://developers.openai.com/blog/rosalind-workbench) · [GPT-Rosalind analysis (IntuitionLabs)](https://intuitionlabs.ai/articles/openai-gpt-rosalind-biochemical-reasoning-model)
- Microsoft Discovery: [Learn: agent concepts](https://learn.microsoft.com/en-us/azure/microsoft-discovery/concept-discovery-agent) · [Azure blog](https://azure.microsoft.com/en-us/blog/transforming-rd-with-agentic-ai-introducing-microsoft-discovery/) · [GA at Build 2026](https://rcpmag.com/articles/2026/06/02/microsoft-discovery-reaches-ga.aspx) · [PhysicsX toolchain](https://www.physicsx.ai/newsroom/agentic-engineering-revolution-the-physicsx-platform-and-microsoft-discovery-at-the-forefront-of-ai-innovation-part-1)
- Gemini for Science: [Google blog](https://blog.google/innovation-and-ai/technology/research/gemini-for-science-io-2026) · [ChatForest review](https://chatforest.com/reviews/google-gemini-for-science-research-ai-platform-review/)
- Industries: [2026-10-19 sync](../../context/areas/softserve/calls/jumpstart-science/2026-10-19_201609_default_pasted-science-jumpstart-sync.md) (pharma, chemical manufacturing, energy as the three targets)
