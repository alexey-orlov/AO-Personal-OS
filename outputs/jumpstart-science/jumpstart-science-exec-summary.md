# AI Jumpstart for Scientists: exec summary

_2026-10-19, v6. Condenses the 37-row [problems × tooling map](jumpstart-science-problems-x-tooling.md) into 15 use cases in 6 buckets, checked against three vendor science workbenches. Two-page HTML version (screenshots and diagrams per bucket): SoftServe OneDrive `Projects/Jumpstart/AI Jumpstart for Scientists - exec summary.html`; the buckets on Microsoft's R&D flow and across its phases sit next to it._

**Bottom line:** three AI workbenches for science (Claude Science, ChatGPT Rosalind, Microsoft Discovery) help one scientist with literature, molecules and analysis. None watches papers, patents and rules, picks the next experiment from past runs, captures lab data, or keeps the paper trail that changes and regulators demand; the Jumpstart builds that for the whole team. Most jobs fit every industry; the rest depend on having a lab, molecules or hardware.

**How to read it:** every line is a job plain ChatGPT or Claude, even with Projects, can't do well. Vendor Yes = documented (October 2026); No = has to be built. Type = what the solution can't work without (one or two per row). Typical data sources = the systems the line's agents read from or write to.

**Type:** 🔵 S Skills & sub-agents · 🟣 R RAG pipeline (document search) · 🟢 C Context store (shared memory) · 🟠 M MCP integration (system connector) · 🟡 A Automation (schedule or trigger) · ⚫ G Compute & models · 🔴 U Specialized UI

**Industries** (one answer per bucket; a note says which part applies where only part does): Life sci = pharma, biotech, crop science, diagnostics, CROs. Materials = materials & process industries: chemicals, energy, semiconductors, metals, batteries, food and consumer formulation. Engineered = engineered products: devices, vehicles, electronics. AI research = research teams without a lab, SoftServe's own included. Not covered yet: energy geoscience (seismic, well data).

| # | Use case | Problem it solves | How it works | Typical data sources | Type | Claude Science | ChatGPT Rosalind | Microsoft Discovery | Life sci | Materials | Engineered | AI research |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | **1 · Know the literature** | | | | | | | | **Yes** | **Yes** | **Yes (library, watch)** | **Yes** |
| 1 | Cited answers from our papers and standards | Answers sit in 2,000 PDFs nobody can search; one value takes hours | Every document is indexed; each answer quotes the passage and links the page | PDF folders on SharePoint, Zotero, purchased standards | 🟣 | No | No | Yes | | | | |
| 2 | Weekly watch: papers, patents, rules | New papers, patents and rules slip by; scanning eats a day a week | A weekly job scans the sources and posts a digest of what's new per project | PubMed, arXiv, Google Patents, EUR-Lex, Federal Register | 🟠🟡 | No | No | No | | | | |
| 3 | Numbers from hundreds of papers in one table | Pulling numbers out of hundreds of papers by hand takes weeks | Two agents extract each value; matches go in with a quote, mismatches to a person | Paper PDFs, publisher APIs (Elsevier, Springer) | 🔵 | Yes | No | No | | | | |
| | **2 · Learn from our results** | | | | | | | | **Yes** | **Yes** | **Yes** | **Yes** |
| 4 | One analysis method per assay, fully logged | Each person analyzes differently; results can't be reproduced | Each method is a versioned skill; every run logs data version, code and settings | Instrument CSVs, Excel, sequencing files, Git | 🔵🟢 | Yes | Yes ³ | Yes | | | | |
| 5 | Hypotheses checked against papers and past runs | Ideas get picked on gut feel; contradicting evidence surfaces late | Agents propose, debate and rank hypotheses against papers and our results | ELN (Benchling, LabArchives), the library, result sheets | 🔵🟢 | Yes ¹ | Yes ¹ | Yes | | | | |
| 6 | Next experiment picked from all past runs | Too many settings to tune; changing one at a time burns months | After each batch, an optimizer fits all past runs and proposes the next for approval | Excel run logs, LIMS, JMP or Design-Expert files | 🟢⚫ | No | No | No | | | | |
| | **3 · Run and capture** | | | | | | | | **Yes** | **Yes** | **Yes** | **No** |
| 7 | Lab results captured and checked as produced | Result files sit on lab PCs; a bad run is noticed weeks later | Each file is filed to its sample and checked on arrival; robot scripts get a dry run | Instrument PCs, LIMS (LabWare), ELN, Opentrons robots | 🟠🟡 | No | No | No | | | | |
| | **4 · Model before building** | | | | | | | | **Yes (molecules, footprint)** | **Yes** | **Yes (designs, footprint)** | **No** |
| 8 | Molecular and materials modeling | A quick structure or docking check waits weeks for the modeling group | Models run on GPUs; results open in a 3D viewer with confidence scores | PDB, ChEMBL, compound registry, Materials Project | ⚫🔴 | Yes | Yes | Yes | | | | |
| 9 | Engineering simulation: stress, flow, circuits | Setting up each simulation costs the one expert days | Validated templates sweep parameters on the cluster; one report compares designs | CAD (SolidWorks, Creo), Ansys or COMSOL models | 🟠⚫ | No | No | Yes ² | | | | |
| 10 | Early footprint check (carbon, energy, water) | Carbon footprint is calculated after design, when a change costs most | A life-cycle model scores each candidate's recipe and process and flags hotspots | ecoinvent, openLCA or SimaPro, recipe sheets | 🟠⚫ | No | No | No | | | | |
| | **5 · Keep the paper trail** | | | | | | | | **Yes (inventions, regulators)** | **Yes** | **Yes** | **Yes (inventions)** |
| 11 | Invention disclosures from the lab record | Inventions go unreported or late; a disclosure takes days to write | Drafted from dated lab records with a patent search; inventor and attorney review | ELN, IP docketing (Anaqua), Google Patents | 🔵🟠 | No | No | No | | | | |
| 12 | See what a design change affects | A part swap quietly breaks a certified feature; old failures repeat | Agents trace a change to the tests, certificates and past failures it touches | PLM (Teamcenter, Windchill), QMS failure reports | 🟣🟠 | No | No | No | | | | |
| 13 | Regulator files with every claim sourced | One unsupported claim in a regulator file can delay approval for months | Drafted from lab and test records, every statement cited; a quality lead signs off | Veeva Vault or SharePoint, LIMS, FDA, EMA, ECHA guidance | 🔵🟣 | No | No | No | | | | |
| | **6 · Share across the team** | | | | | | | | **Yes** | **Yes** | **Yes** | **Yes** |
| 14 | One knowledge base for the team and agents | Past results and decisions live in people's heads and leave with them | One store of decisions and conventions every agent reads; meetings keep it current | SharePoint or Confluence, Teams, meeting recordings | 🟢 | No | No | Yes | | | | |
| 15 | One shared skill set under admin control | Everyone prompts differently; quality varies, good workflows don't spread | Skills ship as one tested team package; restricted data is blocked | Git repo (GitHub, Azure DevOps), data-classification policy | 🔵 | Yes | No | Yes | | | | |

¹ Claude Science and Rosalind do this in conversation; Microsoft Discovery runs a dedicated multi-agent loop.
² Via separately licensed partners: PhysicsX (stress, flow, heat), Synopsys (chips).
³ Life-science data only.

**Not compared:** Google's Gemini for Science, a Labs experiment for single researchers that covers one of these jobs (tables from papers).

**Status, Oct 2026:** Claude Science beta, included in Claude plans (since 30 Jun) · Rosalind Workbench research preview for verified organizations (since 28 Aug) · Microsoft Discovery generally available on Azure (June).

**Left out because plain chat or a Project already does it:** finding collaborators, sample-size and test-design basics, adapting one protocol, checking a reagent, notes from voice, a stats check on request, grant drafting, manuscript review, data-deposit forms. **In the full map, not shown here:** drug-target dossiers, write-ups from run records, meeting capture.

## What changed along the way

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
- Added after checking Microsoft's sample R&D flow: invention disclosures from the lab record (covers its IP boxes) and an early footprint check (its sustainability box); the weekly watch widened to regulations (its regulatory-plan box). Market, financial, supply-chain and launch boxes stay out: product and commercial work, the PM Jumpstart's ground.
- Problem column and industry relevance added. Relevance is per row, because per bucket it came out Yes almost everywhere. Four groups: the call's three targets fold into life sciences and materials & process (chemicals and energy share every flag); engineered products and AI & data research cover R&D outside them.
- Use case moved to the first text column and shortened; a "Typical data sources" column added (the systems each line connects to), and the page-2 diagrams name the same systems.
- Google's Gemini for Science dropped from the comparison: one Yes in 15 rows, a Labs experiment for single researchers, and not among the lead-giving partners named in the 2026-10-19 sync. The bucket-2 picture changed from Google's co-scientist diagram to a Microsoft Discovery screen.

## Pictures in the HTML version

| Bucket | Picture | Source |
|---|---|---|
| 1 | Claude Science literature review (cropped) | [Anthropic](https://www.anthropic.com/news/claude-science-ai-workbench) |
| 2 | Microsoft Discovery proposing candidates from internal knowledge and literature, with sources (video thumbnail) | [Microsoft, Build announcement video](https://www.youtube.com/watch?v=UbSHV6l2h-o) |
| 4 | Rosalind Workbench structure viewer (cropped to the window) | [OpenAI](https://developers.openai.com/blog/rosalind-workbench) |
| 3, 5, 6 | Diagrams drawn for this summary, naming the same systems as the table; no vendor covers these buckets | SoftServe |

## Which map rows each line covers

| Line | Map rows | Line | Map rows | Line | Map rows | Line | Map rows |
|---|---|---|---|---|---|---|---|
| 1 | 2, 27 | 5 | 8 | 9 | 12 | 13 | 29 |
| 2 | 1, 5 | 6 | 9 | 10 | 36 | 14 | 31 |
| 3 | 3, 4 | 7 | 10, 14–17 | 11 | 37 | 15 | 34, 35 |
| 4 | 18–21 | 8 | 11 | 12 | 13, 22–26 |  |  |

Not in the exec view (kept in the map): rows 6, 7, 28 (write-ups and drug-target dossiers) and 30, 32, 33 (status, handover, meetings).

## Sources

- Claude Science: [Anthropic announcement](https://www.anthropic.com/news/claude-science-ai-workbench) · [docs overview](https://claude.com/docs/claude-science/overview) · [connectors and skills](https://claude.com/docs/claude-science/connectors-and-skills)
- ChatGPT Rosalind Workbench: [OpenAI blog](https://developers.openai.com/blog/rosalind-workbench) · [GPT-Rosalind analysis (IntuitionLabs)](https://intuitionlabs.ai/articles/openai-gpt-rosalind-biochemical-reasoning-model)
- Microsoft Discovery: [Learn: agent concepts](https://learn.microsoft.com/en-us/azure/microsoft-discovery/concept-discovery-agent) · [Azure blog](https://azure.microsoft.com/en-us/blog/transforming-rd-with-agentic-ai-introducing-microsoft-discovery/) · [GA at Build 2026](https://rcpmag.com/articles/2026/06/02/microsoft-discovery-reaches-ga.aspx) · [PhysicsX toolchain](https://www.physicsx.ai/newsroom/agentic-engineering-revolution-the-physicsx-platform-and-microsoft-discovery-at-the-forefront-of-ai-innovation-part-1) · [Build announcement video](https://www.youtube.com/watch?v=UbSHV6l2h-o)
- Not compared: [Google, Gemini for Science](https://blog.google/innovation-and-ai/technology/research/gemini-for-science-io-2026) · [ChatForest review](https://chatforest.com/reviews/google-gemini-for-science-research-ai-platform-review/)
- Industries: [2026-10-19 sync](../../context/areas/softserve/calls/jumpstart-science/2026-10-19_201609_default_pasted-science-jumpstart-sync.md) (pharma, chemical manufacturing, energy as the three targets)
