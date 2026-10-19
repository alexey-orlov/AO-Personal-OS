# AI Jumpstart for Scientists: problems × tooling

_Draft 2026-10-19. Life sciences (LS), hardware R&D (HW), or any research team (All)._

**Bar for a row:** it needs something a chat or a Project can't give: the team's shared Context DB, retrieval over a corpus too big for a Project, live systems through MCP, code run on real data, a scheduled pipeline, or a reviewer agent with an approval gate. Pillar (b) is the Knowledge layer column; pillar (c) is skills, sub-agents and pipelines; pillar (a) is section 7 plus every pipeline that posts to Messenger or Task tracker. Every building-block name means one thing and is defined once, in the glossary under the table. `/name` = a shared skill.

### 1. Literature, prior art and landscape

| # | Problem / task | For | Knowledge layer | Skills · sub-agents · compute | Pipeline: trigger → MCPs → output | Off-the-shelf now |
|---|---|---|---|---|---|---|
| 1 | Tracking papers, preprints, patents and abstracts eats Fridays; key work still slips | All | Context DB (active projects = relevance filter) · Literature RAG | `/lit-watch` · Literature Search Agent | Weekly → Literature MCPs, Patent MCP → ranked digest per project in Messenger; react to add to Literature RAG | — |
| 2 | Questions across our 2,000 PDFs (which buffer? creep at 600 °C?) mean hours of skimming | All | Literature RAG (tables, figures, supplements parsed) | `/ask-literature` · Citation Checker | On demand; nightly sync from Reference manager + open-access full text via Literature MCPs | PaperQA2 (open source) |
| 3 | Systematic or scoping review: 3,000 abstracts to screen, outcomes to extract, months of work | All | Evidence Table · Entity Registry (search synonyms) | `/review-plan` · `/screen-studies` · Literature Search Agent · Dual Extractor | Search → screen → extract, Approval gate after each stage; Literature MCPs, Reference manager; Run Log = PRISMA trail | Elicit Systematic Review, as second reviewer ¹ |
| 4 | Numbers scattered over hundreds of papers (kinetics, properties, IC50s) needed as one dataset | All | Evidence Table → Data Catalog · Entity Registry | `/extract-dataset` (units, plot digitizing) · Dual Extractor | On demand → Literature MCPs → dataset; every value carries quote, DOI, page | — |
| 5 | Before investing: who already patented or published this? Landscape and FTO prep take weeks | All | Literature RAG · Internal Docs RAG (our invention disclosures) | `/prior-art` (claim charts) · Literature Search Agent · Citation Checker | On demand → Patent MCP, Literature MCPs → landscape + claim charts → Approval gate: patent attorney | PatSnap, IPRally |
| 6 | Fake, wrong or retracted references slip into drafts | All | Literature RAG | Citation Checker | Every draft commit → Literature MCPs (Crossref with Retraction Watch data, OpenAlex) → a failed check blocks submission ² | citegate, citeguard (open source) |
| 7 | Finding collaborators, KOLs, CROs or suppliers runs on who-knows-whom | All | Context DB (people, past partners) | `/scout` · Literature Search Agent | On demand → Literature MCPs (authors, institutions), Patent MCP, Bio/chem DB MCPs (trial sites), Web search → shortlist with evidence | — |
| 8 | Target or indication assessment (genetics, tractability, trials, patents) takes weeks per target | LS | Literature RAG · Evidence Table · Context DB (go/no-go criteria) | `/target-dossier` · Citation Checker | On demand, quarterly refresh → Bio/chem DB MCPs, Patent MCP → dossier, every claim linked | Claude for Life Sciences connectors (Open Targets, ChEMBL, ClinicalTrials.gov) |

### 2. Hypotheses and study design

| # | Problem / task | For | Knowledge layer | Skills · sub-agents · compute | Pipeline: trigger → MCPs → output | Off-the-shelf now |
|---|---|---|---|---|---|---|
| 9 | Picking what to test next is gut feel; contradicting evidence surfaces late | All | Literature RAG · Evidence Table · Context DB (what we tried) · Data Catalog | `/hypothesis-tournament` (generate → debate → rank) · Reviewer Panel | Overnight run → Literature MCPs, Bio/chem DB MCPs → ranked hypotheses, evidence for and against, cheapest killing experiment | Google Co-Scientist (Gemini for Science); Edison Kosmos, $200/run |
| 10 | Underpowered or poorly controlled experiments and tests get repeated, months lost | All | Protocol Library · Data Catalog (past variance for power) | `/study-design` (controls, n, randomization, plate layout, DoE) · Stats Reviewer · Analysis Sandbox | On demand → plan + layout file into ELN/LIMS or the PLM/ALM test plan → Approval gate: PI or test lead | — |
| 11 | Too many knobs (formulation, media, process settings); one-factor-at-a-time burns months | All | Data Catalog (every past run: conditions, outcome) | `/next-batch` · Experiment Optimizer | Batch results land in ELN/LIMS → next batch proposed → Approval gate → run sheet or Lab hardware control | BayBE, Ax (open source) |
| 12 | Adapting a published protocol or test method to our kit, stock and safety rules | All | Protocol Library · Literature RAG · Specs & Standards RAG (SDSs, test standards) · Entity Registry | `/protocol-adapt` · `/risk-assessment` | On demand → ELN/LIMS (stock, lots) → protocol vN + run sheet + risk assessment → Approval gate: PI, safety officer | — |
| 13 | Robot and instrument scripts need an automation engineer; first runs waste samples | All | Protocol Library · Context DB (deck layouts, labware, instruments) | `/robot-script` · `/bench-script` · Analysis Sandbox (dry run) | Approved protocol → script → simulated run → Approval gate → Lab hardware control; outputs auto-register in Data Catalog | OpentronsAI (Opentrons only) |
| 14 | Quick in-silico checks (structure, binding, primers, guides) queue behind the computational group | LS | Entity Registry · Data Catalog | `/in-silico-check` · Analysis Sandbox | On demand → Science model tools, Bio/chem DB MCPs, Workflow runner (GPU) → result + confidence into ELN/LIMS | Claude Science (60+ skills and connectors); ToolUniverse |
| 15 | FEA, CFD or circuit simulation setup and sweeps cost the one expert days per variant | HW | Context DB (validated models, material cards) · Data Catalog (simulation vs test) | `/sim-setup` · `/sweep-compare` · Reviewer Panel (mesh, units, boundaries) | On demand → Simulation tools, CAD/EDA, Workflow runner (HPC) → comparison report; Run Log | MATLAB MCP Server + Agentic Toolkit |
| 16 | Antibodies or cell lines that don't work, or are misidentified, sink months | LS | Literature RAG · Entity Registry (RRIDs) · Internal Docs RAG (our validations) | `/reagent-check` | On demand → Bio/chem DB MCPs (Antibody Registry, Cellosaurus problem-line flags, Addgene) → evidence per candidate | — |
| 17 | Choosing parts and materials: datasheet trawling, then stock-outs and end-of-life surprises | HW | Specs & Standards RAG (datasheets) · Entity Registry (approved parts) · Context DB (derating rules) | `/part-select` · Dual Extractor (datasheet parameters) | On demand + weekly BOM scan → Component distributors, PLM/ALM → shortlist; stock and lifecycle alerts in Messenger | — |

### 3. Bench and data capture

| # | Problem / task | For | Knowledge layer | Skills · sub-agents · compute | Pipeline: trigger → MCPs → output | Off-the-shelf now |
|---|---|---|---|---|---|---|
| 18 | ELN entries written days later from memory; parameters and sample IDs missing | All | Protocol Library · Entity Registry · Context DB (entry conventions) | `/bench-note` (voice memo or notebook photo → structured entry) | Memo or photo → ELN/LIMS draft linked to protocol vN and samples → Approval gate: author signs | — |
| 19 | Instrument files sit on instrument PCs under cryptic names; last March's run is lost | All | Data Catalog · Entity Registry | `/register-run` (parse vendor formats, attach metadata) | New file in a watched folder → Instrument data, ELN/LIMS → catalogued and linked to its entry; orphans flagged in Messenger | TetraScience; Allotrope conversion skill (Claude for Life Sciences) |
| 20 | Bad runs (failed controls, drift, out-of-spec) found only at analysis or review | All | Data Catalog (baselines) · Protocol Library (acceptance criteria) | `/qc-check` (control-chart rules) | Every registered run → pass, or flag with reason in Messenger and ELN/LIMS | — |
| 21 | Reagents and parts run out or expire mid-study; reorders are manual | All | Entity Registry (catalog numbers, vendors) | `/reorder` | Weekly → ELN/LIMS inventory → draft orders in Procurement → Approval gate: lab manager | — |
| 22 | Partner data (CRO packages, supplier certificates, first-article reports) re-keyed and re-checked by hand | All | Data Catalog · Entity Registry (their IDs → ours) · Protocol Library (study plan, spec) | `/partner-intake` · Dual Extractor · `/qc-check` | Delivery arrives (Email, Docs / wiki) → extracted, checked against plan or spec → discrepancy list → Approval gate → Data Catalog | — |

### 4. Analysis

| # | Problem / task | For | Knowledge layer | Skills · sub-agents · compute | Pipeline: trigger → MCPs → output | Off-the-shelf now |
|---|---|---|---|---|---|---|
| 23 | Routine analyses (curves, qPCR, gating, image counts, waveforms) done differently by each person | All | Data Catalog · Protocol Library (analysis parameters per assay) | One skill per assay (`/dose-response`, `/qpcr`, `/waveform-metrics`) · Analysis Sandbox | Run passes QC → Instrument data, Science model tools (e.g. Cellpose) → results + house-style figures into ELN/LIMS; Run Log | Claude Science (Python/R kernels) |
| 24 | Omics on our or public data (GEO/SRA) waits weeks in the bioinformatics queue | LS | Data Catalog (samplesheets) · Context DB (genome builds, conventions) | `/run-omics` · `/omics-readout` (QC + plain-language results) | Samplesheet → Approval gate (compute spend) → Workflow runner (nf-core), Bio/chem DB MCPs → QC report + summary | Seqera AI + Seqera MCP; Claude Science |
| 25 | Wrong test, pseudo-replication, uncorrected multiple comparisons, caught by reviewers instead of us | All | Data Catalog (raw data structure) | Stats Reviewer · Analysis Sandbox | Every analysis notebook commit → Code repository → issues raised before results reach slides | — |
| 26 | Years of runs never analyzed together; nobody knows what really drives yield or failure | All | Data Catalog · Entity Registry (harmonized names, units) | `/cross-run-analysis` · Analysis Sandbox | On demand, monthly refresh → ELN/LIMS, Instrument data, Data warehouse / BI → drivers report + dashboard | — |
| 27 | A figure can't be reproduced 18 months later: which data, code, environment, AI steps? | All | Data Catalog (versioned) | Run Log · Analysis Sandbox (pinned environments) | Every agent run writes its Run Log automatically (hook) → Code repository | Claude Science provenance (artifact + code + environment + conversation) |

### 5. Engineering design, verification and compliance

| # | Problem / task | For | Knowledge layer | Skills · sub-agents · compute | Pipeline: trigger → MCPs → output | Off-the-shelf now |
|---|---|---|---|---|---|---|
| 28 | Requirements ambiguous, untestable or untraced, found at verification when fixes cost most | HW | Context DB (requirement-writing rules) · Entity Registry | `/req-review` · `/trace-gaps` | Every requirement change → PLM/ALM → review comments in place; weekly trace-gap report | Jama Connect Advisor; Polarion 2606 Copilot API |
| 29 | Swapping a part or material: what breaks across BOM, requirements, tests, certificates? | HW | Context DB · Internal Docs RAG (certification reports, design reviews) | `/change-impact` | New change request → PLM/ALM, QMS/eDMS, Component distributors (alternates) → impact report → Approval gate: change board | Teamcenter 2606 AI BOM Agent |
| 30 | Design reviews miss known issues; checklists and lessons learned live in people's heads | HW | Context DB (checklist, lessons learned) · Internal Docs RAG (past findings) · Specs & Standards RAG | `/design-review` · Reviewer Panel | Design milestone → CAD/EDA → findings with evidence in Task tracker | KiCad MCP Pro (community, review engine) |
| 31 | Test data to report: limits checked by hand, verification status unclear | HW | Data Catalog (test runs) · Specs & Standards RAG (limits) | `/test-report` | Test completed → Instrument data, PLM/ALM (test cases, requirement IDs) → report + trace-matrix update → Approval gate: test engineer | — |
| 32 | Failure investigation (8D, CAPA, deviation): "seen this before?" answered from memory | HW · GxP | Internal Docs RAG (past 8Ds, NCRs, field returns) · Data Catalog · Context DB (FMEA) | `/rca-8d` · `/fmea-update` | New NCR or CAPA → QMS/eDMS, PLM/ALM → similar cases + ranked candidate causes → Task tracker | — |
| 33 | What does the standard, regulation or datasheet actually require? Clause hunting, misquotes | All | Specs & Standards RAG | `/ask-specs` · Citation Checker (clause level) | On demand; library sync from Docs / wiki ³ | — |

### 6. Writing, grants and regulatory

| # | Problem / task | For | Knowledge layer | Skills · sub-agents · compute | Pipeline: trigger → MCPs → output | Off-the-shelf now |
|---|---|---|---|---|---|---|
| 34 | Methods rebuilt from memory: wrong parameters, missing versions and RRIDs | All | Protocol Library · Data Catalog · Entity Registry · Run Log | `/methods-draft` | On demand → ELN/LIMS, Code repository → draft; each statement links its ELN entry or run | — |
| 35 | Grants eat evenings: aims, significance, preliminary data, funder rules, page limits | All | Context DB (bios, past grants, preliminary-data index) · Literature RAG · Evidence Table | `/grant-draft` · Reviewer Panel (mock study section) · Citation Checker | On demand → Reference manager, Docs / wiki → outline, evidence, critique; the PI writes the science ⁴ | — |
| 36 | Pre-submission review and point-by-point rebuttals take weeks of back-and-forth | All | Literature RAG · Data Catalog | Reviewer Panel · Stats Reviewer · Citation Checker · `/rebuttal` · Analysis Sandbox | Draft milestone → ranked issue list; reviews received → response table + change map | OpenAI Prism (LaTeX workspace) |
| 37 | Regulatory and quality files (IND/CTD, DHF, technical file) stitched from scattered sources | All | Internal Docs RAG · Specs & Standards RAG · Data Catalog | `/reg-section-draft` · Citation Checker (statement → source document) | On demand → QMS/eDMS, PLM/ALM, ELN/LIMS → draft + source-trace table → Approval gate: QA/RA; Run Log as audit trail | — |
| 38 | Data deposit at publication (GEO, PRIDE, Zenodo): days of metadata wrangling | All | Data Catalog · Entity Registry | `/data-deposit` (metadata mapping, availability statement) | Paper accepted → Data repositories → submission package → Approval gate: PI | — |
| 39 | Friday progress slides for the PI, steering committee or sponsor take two hours | All | Context DB (project pages, milestones) · Data Catalog (new results) | `/weekly-review` · `/status-update` | Friday → ELN/LIMS, Task tracker, Docs / wiki → draft per audience; owner edits and sends | PM Work OS skills (reuse) |

### 7. Team knowledge, collaboration and guardrails

| # | Problem / task | For | Knowledge layer | Skills · sub-agents · compute | Pipeline: trigger → MCPs → output | Off-the-shelf now |
|---|---|---|---|---|---|---|
| 40 | "Tried this before? How do we do X? Where's the data?" Asked daily, answered slowly | All | Context DB · Internal Docs RAG · Data Catalog · Protocol Library | `/ask-lab` (also answers in Messenger) | On demand; nightly re-index from ELN/LIMS, Docs / wiki | — |
| 41 | A postdoc or engineer leaves; samples, data and half-done work become orphans | All | Context DB (handover page) · Data Catalog | `/handover` (interview + sweep of their entries, files, samples) | Notice given → ELN/LIMS (sample locations), Docs / wiki → handover page → Approval gate: PI | — |
| 42 | Lab meetings and design reviews: decisions and actions evaporate within a week | All | Context DB (decision log, project pages) | `/process-meeting` · `/decision-log-entry` | Meeting ends → Meeting recorder → summary, decisions, actions into Context DB + Task tracker; posted in Messenger | PM Work OS skills (reuse) |
| 43 | Everyone prompts differently; quality varies and good workflows don't spread | All | Context DB (steering file, team rules) | Team Plugin · Eval Set per skill | Skill change → pull request → Eval Set run → OS-admin approves → everyone updated | Claude Code plugin marketplace |
| 44 | "Can I put patient data, unpublished results or partner IP in here?" Nobody knows | All | Context DB (data classification: what may go where) | `/deidentify` · hooks · access-scoped MCPs | Every file read or upload → hook checks classification → block, de-identify, or route to an approved endpoint | HIPAA-ready Claude (Claude for Healthcare, Jan 2026) |

¹ Independent evaluations of Elicit found 37.9% search sensitivity against 93.5% for manual strategies, and extraction accuracy dropping on unseen papers. Run your own Eval Set before trusting it.
² Check retractions against Crossref's Retraction Watch data, never the model's memory.
³ Some standards bodies forbid entering their standards into AI tools (ISA does). Clear each licence before indexing.
⁴ NIH won't accept applications "substantially developed by AI" (NOT-OD-25-132, due dates from 25 Sep 2025). Use AI for structure, evidence and critique.

## Glossary: one name, one thing

**Knowledge layer (pillar b)**

| Name | What it is |
|---|---|
| Context DB | The team's git repo of markdown/YAML: projects, hypotheses, decisions, conventions, who knows what. Every agent reads it first; only `/context-update` writes it (the Work OS context system) |
| Protocol Library | Versioned protocols, SOPs and test procedures with parameters as fields; every run cites a version |
| Entity Registry | One canonical ID per gene, compound, cell line, antibody (UniProt, ChEBI, RRID) or part, material, test unit, with synonyms and internal codes |
| Data Catalog | One record per experiment or test dataset: sample or unit, protocol version, instrument, operator, file location, QC status (same name as in the PM Work OS) |
| Literature RAG | Full-text index of the team's papers and preprints, with tables, figures and supplements parsed (Docling, GROBID); hybrid search; answers cite page and figure |
| Internal Docs RAG | ELN text, lab-meeting slides, internal and test reports, theses; keeps source permissions |
| Specs & Standards RAG | Datasheets, standards, regulatory guidance, SDSs; clause- and table-aware; answers cite the clause |
| Evidence Table | Values extracted from papers or documents, each with quote, DOI or document ID, and page |

**Shared sub-agents and compute (pillar c)**

| Name | What it is |
|---|---|
| Literature Search Agent | Expands queries from the Entity Registry, searches every Literature MCP, dedupes, chases citations both ways |
| Citation Checker | Per reference: it exists (DOI resolves), metadata matches, the cited text supports the claim, it isn't retracted |
| Dual Extractor | Two independent extraction passes; disagreements go to a human |
| Stats Reviewer | Test choice, n versus replicates, multiplicity, effect sizes; re-runs the analysis |
| Reviewer Panel | Parallel critics (methods, novelty against Literature RAG, clarity, funder or journal rules) → one ranked list; the PM Work OS `/prd-challenge` pattern |
| Analysis Sandbox | Persistent Python/R kernels with pinned environments and read access to the Data Catalog |
| Experiment Optimizer | Bayesian-optimization service (Ax/BoTorch, BayBE) that proposes the next batch |
| `/name` | A shared skill in the Team Plugin; PM Work OS names kept where the job is the same |

**MCP integrations.** Generic names kept from the PM Jumpstart: Meeting recorder, Task tracker, Docs / wiki, Messenger, Email, Code repository, Web search, Data warehouse / BI.

| Name | Examples |
|---|---|
| Literature MCPs | PubMed/Europe PMC, bioRxiv/medRxiv, arXiv, OpenAlex, Semantic Scholar, Crossref (with Retraction Watch data), Unpaywall, Wiley Scholar Gateway |
| Reference manager | Zotero or EndNote group library |
| Bio/chem DB MCPs | UniProt, PDB/AlphaFold DB, Ensembl, NCBI, GEO/SRA, ChEMBL, PubChem, Open Targets, ClinicalTrials.gov, openFDA, Cellosaurus, Antibody Registry, Addgene; via BioContext, ToolUniverse or Claude for Life Sciences connectors |
| Patent MCP | USPTO Open Data Portal, EPO OPS, Google Patents, Lens.org |
| ELN/LIMS | Benchling (MCP connectors since Apr 2026), LabArchives, Labguru, SciNote; sample inventory |
| Instrument data | Instrument-PC shares or SDMS (TetraScience), Allotrope ASM conversion, LabVIEW TDMS, scope and DAQ exports |
| Lab hardware control | Opentrons, Hamilton via PyLabRobot; scopes, power supplies, SMUs via PyVISA/SCPI |
| Workflow runner | Seqera/Nextflow (nf-core), Snakemake, Slurm/HPC, cloud GPU batch |
| Science model tools | AlphaFold 3, Boltz-2, Chai, ESM, RDKit, docking, Primer3, Cellpose; via ToolUniverse or NVIDIA BioNeMo NIMs |
| Simulation tools | MATLAB MCP Server, OpenFOAM MCP, ngspice/LTspice, COMSOL and Ansys Python APIs |
| CAD/EDA | KiCad MCP, Altium and Onshape APIs, Autodesk Fusion MCP |
| PLM/ALM | Teamcenter, Windchill, Polarion, Jama Connect, DOORS Next, Codebeamer |
| QMS/eDMS | CAPA, NCR, deviations, controlled documents: Veeva Vault, MasterControl, Greenlight Guru |
| Component distributors | Octopart/Nexar, Digi-Key, Mouser, SiliconExpert |
| Data repositories | Zenodo, Figshare, GEO/SRA, PRIDE |
| Procurement | Quartzy, Coupa, SAP Ariba |

**Pipelines and governance**

| Name | What it is |
|---|---|
| Pipeline | A scheduled or event-triggered chain of skills and MCP calls that runs headless (cron, GitHub Actions, n8n) |
| Team Plugin | The shared, versioned package of skills, sub-agents, MCP config and hooks; everyone installs it from the team marketplace; an OS-admin approves changes to gated files |
| Approval gate | A named person signs before an irreversible or regulated step: robot run, ELN sign-off, submission, order |
| Run Log | Every agent output stored with its inputs (data versions, DOIs), code, environment, skill version and model |
| Eval Set | 20–50 team cases with known answers per skill, run before rollout and on every change |

**Left out on purpose:** refereeing other people's manuscripts and grants (confidentiality; NIH bars its reviewers from using AI), research software and firmware (the SDLC Jumpstart covers them), and anything a chat or Project already handles, such as summarizing one paper or polishing a paragraph.

**Off-the-shelf column:** vendor announcements and news up to October 2026. We haven't tested any of it.

## Sources (off-the-shelf column and footnotes)

- Claude Science, 2026-06-30: [The Next Web](https://thenextweb.com/news/anthropic-claude-science-ai-workbench-scientists)
- Claude for Life Sciences connectors, Jan 2026: [Healthomics](https://healthomics.substack.com/p/advancing-claude-for-healthcare-and)
- Gemini for Science / Co-Scientist: [Mezha](https://mezha.ua/en/news/google-gemini-science-311442/)
- Kosmos pricing: [The Rundown](https://www.therundown.ai/tools/kosmos)
- OpenAI Prism: [TechCrunch](https://techcrunch.com/2026/01/27/openai-launches-prism-a-new-ai-workspace-for-scientists/)
- Benchling AI Connectors: [Benchling](https://www.benchling.com/news/benchling-launches-ai-connectors-to-power-data-ecosystem)
- Seqera MCP: [Seqera docs](https://docs.seqera.io/platform-cloud/seqera-mcp/)
- MATLAB MCP Server: [EE Journal](https://www.eejournal.com/industry_news/mathworks-enables-ai-agents-to-execute-and-validate-engineering-workflows-within-matlab/)
- Teamcenter 2606 AI BOM Agent: [DRWE](https://www.drwe.de/en/blog/expert-knowledge-3/teamcenter-2606-is-here-here-are-three-new-features-you-should-know-about-411)
- Polarion 2606: [Siemens blog](https://blogs.sw.siemens.com/polarion/page/85/)
- KiCad MCP Pro: [GitHub](https://github.com/oaslananka/kicad-mcp-pro)
- ToolUniverse: [Zitnik lab](https://zitniklab.hms.harvard.edu/ToolUniverse/api/tooluniverse.smcp.html)
- BioContext MCP servers: [GitHub](https://github.com/BioContext)
- OpentronsAI: [Opentrons](https://opentrons.com/ai)
- Elicit evaluations: [Fast.io review](https://fast.io/resources/elicit-ai-review-2026/)
- citegate: [PyPI](https://pypi.org/project/citegate/)
- citeguard: [Glama](https://glama.ai/mcp/servers/wedo911/citeguard)
- NIH NOT-OD-25-132: [NIH](https://www.grants.nih.gov/grants/guide/notice-files/NOT-OD-25-132.html)
- ISA AI policy: [ISA](https://www.isa.org/products/overview-of-isa-iec-62443-for-product-suppliers-ic)
- Fusion MCP, OpenFOAM MCP: [Awesome Physical Engineering AI](https://github.com/010zx00x1/Awesome-Physical-Engineering-AI)
