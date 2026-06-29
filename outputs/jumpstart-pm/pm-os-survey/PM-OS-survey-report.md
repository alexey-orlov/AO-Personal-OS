# PM-OS Survey — how Product-Manager agent systems implement context, skills & subagents

*Compiled 2026-06-29 for the SoftServe **AI-PM Jumpstart** program · Alex Orlov · 74 repos ranked, 48 deep-dived (actual files read, 902 file fetches), 79 canonical patterns.*

> **The companion workbook** `PM-OS-survey.xlsx` (13 tabs) + `csv/` holds the full machine-readable detail: every repo's every pattern, the mechanism, and **file-level source links**. This report is the lead-with-the-answer narrative on top.

---

## Bottom line

The field has **converged on a common skeleton** and is now competing on the hard parts (verification, memory, cost, governance). If you are standing up an AI-PM operating system, copy the skeleton wholesale and spend your effort on the four frontier layers below.

**The convergent skeleton** (present in the large majority of repos):
- **A root instruction file** (`CLAUDE.md`/`AGENTS.md`) — identity + rules + output standards, loaded every session [`CM-02`, 36/48].
- **Skills as the unit of capability** — `SKILL.md` + YAML frontmatter, auto-invoked by description-match [`SK-01`, 40/48], each a folder bundling references/templates/examples [`SK-02`, 34], with an **enforced-output contract** [`SK-09`, 41] and a **named methodology** baked in (JTBD/RICE/OST/Mom Test) [`SK-07`, 37].
- **The filesystem is the database** — index/map files [`CM-25`, 34] + document-handoff chains [`CM-08`, 33] + just-in-time loading [`CM-04`, 29] beat vector RAG. Nobody reaches for embeddings until forced.
- **Spec/PRD as the source of truth** [`CM-10`, 28] feeding a planner→workers / sequential-pipeline execution model, gated by a **constitution** [`CM-22`, 18].

**The four frontier layers — where the leading repos actually differentiate** (and where SS can lead):
1. **Verification by construction** — distrust agent output: gap-flagging [`SK-10`], adversarial fresh-context verifiers [`SA-07`], LLM-judge filters, and at the edge a **deterministic completion oracle** that re-runs work in a sandbox and emits an unfakable ship token (`anombyte93/prd-taskmaster`, new `CM-34`).
2. **Memory that compounds** — the second-brain lineage: tiered context trees, living LLM-maintained wikis, decay tiers, **corroboration-gated promotion** (a fact earns a page only at ≥2 independent mentions — new `CM-32`), and knowledge-graph memory with synthesis (`gbrain`).
3. **The OS evaluates & governs itself** — routing/memory evals as tested behavior (new `CM-30`), doc-drift CI gates (new `CM-35`), statistical reliability certification (new `SK-22`), skill-quality validators [`SK-21`, 27].
4. **Cost as a constitutional constraint** (new `CM-33`) — free-model pins, cost ledgers, named retrieval cost-modes with a $/mo matrix — not telemetry, a halting gate.

**Most useful single references** (mine these first):
- *Skills layer:* `phuryn/pm-skills` (breadth + framework encoding + command-chaining), `deanpeters/Product-Manager-Skills` (the **3-tier workflow→interactive→component** orchestration + the **Adaptive Decision Ladder** elicitation), `product-on-purpose/pm-skills` (the most engineering-mature: **SKILL+TEMPLATE+EXAMPLE** triad + **CI quality gates** + a `pm-critic` subagent).
- *Official baseline:* `anthropics/knowledge-work-plugins` (the real Anthropic PM plugin — 7 skills/7 commands, MCP connectors, **tool-agnostic `~~category` connector indirection** new `CM-29`) and `anthropics/skills` (the canonical format + a **skill-creator meta-skill**).
- *PRD→delivery backbone:* `github/spec-kit`, `bmad-code-org/BMAD-METHOD`, `automazeio/ccpm` (**PRD→GitHub-Issues-as-DB** + worktree parallelism + context firewall), `anombyte93/prd-taskmaster` (interview→graded PRD→task-graph→**evidence-gated** execution).
- *Context foundation (pattern donors):* `garrytan/gbrain`, `garrytan/gstack`, `huytieu/COG-second-brain` (closest analogue to AO-Personal-OS), `eugeniughelbur/obsidian-second-brain`.

**Caveat (selection bias):** raw stars over-weight general-purpose dev repos. The most *PM-relevant* repos (`product-on-purpose`, `itseffi/personal-os`, `Digidai`, `pratikshadake`) sit at 30–430 stars but carry the richest PM-craft. Rank on `Score` + `PM-fit`, not stars alone.

---

## Scope & method

**Scope** (per your brief): Product-Manager skills/OS, multi-agent **product teams**, and adjacent **PM+growth/marketing** — plus a labelled set of **pattern-donor** personal-OS / second-brain / orchestration repos included for their context-management & subagent mechanics (out of strict PM scope, in scope for *inspiration*). Vendor baselines from Anthropic anchor the formats.

**Method:** (1) 10 parallel discovery angles → 56 candidates + a completeness-critic (+20); (2) verify each for stars/recency/credibility/relevance; (3) **48 deep-dive agents read the actual files** and extracted the *mechanism* of every pattern, mapping each to a shared 79-code vocabulary anchored to your `jumpstart-pm` doc; (4) a reconcile pass merged 70 raw→canonical mappings and added 12 newly-discovered codes. All 48 profiles returned **high** confidence.

**Naming discipline:** every raw pattern is tagged with a canonical `CM-/SK-/SA-` code so the same idea reads the same way across repos — the tabs `02–04` define the codes; `05–07` show each repo's implementation; `11` is the repo×code adoption grid.

---

## The ranked field (top 24 of 74)

*Full 74 in workbook tab `01` / `csv/01_repos_ranked.csv`. `Score` = popularity bucket (0–6) + PM-fit (0–2) + maintained-in-2026 (0–1).*

| # | Score | Repo | Stars | Scope | PM-fit | Deep-dived | What it is |
|--:|--:|---|--:|---|---|:--:|---|
| 1 | 9 | [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | 118193 | pm-team | high | ✅ | A 232-agent "AI agency" roster (16 divisions incl. Product=5 and Project Management=7 agents) where each agent is a single markdow |
| 2 | 9 | [github/spec-kit](https://github.com/github/spec-kit) | 116309 | pm-framework | high | ✅ | A Spec-Driven Development framework + Python CLI (specify) that turns a natural-language feature description into an executable, d |
| 3 | 8 | [anthropics/skills](https://github.com/anthropics/skills) | 156570 | vendor-baseline | medium | ✅ | Anthropic's official reference collection of ~17 Agent Skills (document suite + creative/dev/enterprise examples) plus the canonic |
| 4 | 8 | [garrytan/gstack](https://github.com/garrytan/gstack) | 117932 | pattern-donor | medium | ✅ | An open-source Claude Code skill pack ("AI software factory") of 23+ slash-command roles (CEO, eng manager, designer, QA, security |
| 5 | 8 | [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) | 64570 | pattern-donor | high | ✅ | GSD ("Get Shit Done") is a multi-runtime (Claude Code / Codex / Gemini / Grok) spec-driven development framework that decomposes w |
| 6 | 8 | [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec) | 57608 | pm-framework | high | ✅ | A spec-driven-development framework + TypeScript CLI that makes AI coding assistants plan before they code: every change becomes a |
| 7 | 7 | [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) | 49830 | pm-framework | high | ✅ | "Breakthrough Method of Agile AI-Driven Development" (v6) — a full-SDLC framework where 12+ named persona agents (Analyst, PM, UX, |
| 8 | 7 | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | 31299 | vendor-baseline | high | ✅ | Anthropic's official Claude Code plugin marketplace: a single .claude-plugin/marketplace.json directory listing 243 installable pl |
| 9 | 7 | [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master) | 27718 | pm-framework | high | ✅ | A PRD-to-structured-tasks engine for AI-driven development: parses a written PRD into a hierarchical, dependency-aware task graph  |
| 10 | 7 | [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | 22148 | vendor-baseline | high | ✅ | Anthropic's official knowledge-work plugin marketplace; the product-management plugin is a skill-first PM toolkit — 8 auto-invoked |
| 11 | 7 | [phuryn/pm-skills](https://github.com/phuryn/pm-skills) | 21640 | pm-core | high | ✅ | A Claude/Codex marketplace of 9 installable PM plugins bundling ~68 framework-encoded skills (SKILL.md) and ~42 slash-command work |
| 12 | 6 | [ruvnet/claude-flow](https://github.com/ruvnet/claude-flow) | 62025 | pattern-donor | low | ✅ | A large multi-agent orchestration framework for Claude Code: a Queen-led hive-mind swarm with 74+ markdown-defined specialist agen |
| 13 | 6 | [wshobson/agents](https://github.com/wshobson/agents) | 37318 | subagent-catalog | medium | ✅ | A multi-harness agentic plugin marketplace: 88 plugins / 194 agents / 158 skills / 106 commands authored once as markdown under pl |
| 14 | 6 | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | 35383 | growth-marketing | medium | ✅ | A 45-skill Agent-Skills marketing library (CRO, copywriting, SEO, pricing, launch, positioning, RevOps) packaged as a cross-agent  |
| 15 | 6 | [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | 26791 | subagent-catalog | medium | — | A large curated 'awesome list' indexing 1,000+ (claimed 1,400+) agent skills from official dev teams (Anthropic, Google Labs, Verc |
| 16 | 6 | [garrytan/gbrain](https://github.com/garrytan/gbrain) | 24497 | pattern-donor | medium | ✅ | A markdown "brain" repo (people/companies/deals/concepts/…) that syncs into Postgres+pgvector (or zero-config PGLite/WASM) for hyb |
| 17 | 6 | [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | 22549 | subagent-catalog | medium | ✅ | A curated catalog of 154+ Claude Code subagents — single-file markdown agent definitions (system-prompt + frontmatter) organized i |
| 18 | 6 | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | 19345 | pattern-donor | high | ✅ | A 345-skill / 78-plugin / 93-agent monorepo "skills library" packaged as a Claude Code marketplace with cross-harness adapters (Co |
| 19 | 6 | [automazeio/ccpm](https://github.com/automazeio/ccpm) | 8233 | pm-framework | high | ✅ | A spec-driven project-management framework for Claude Code that turns a PRD into a technical epic, decomposes it into dependency-t |
| 20 | 6 | [deanpeters/Product-Manager-Skills](https://github.com/deanpeters/Product-Manager-Skills) | 5471 | pm-core | high | ✅ | A library of ~49-52 markdown PM-framework "skills" (component / interactive / workflow tiers) packaged for Claude Code, Codex, and |
| 21 | 5 | [contains-studio/agents](https://github.com/contains-studio/agents) | 12400 | pm-team | high | ✅ | A flat catalog of ~39 single-file Claude Code subagents organized into 8 "studio department" folders (engineering, design, marketi |
| 22 | 5 | [snarktank/ai-dev-tasks](https://github.com/snarktank/ai-dev-tasks) | 7769 | pm-framework | high | ✅ | A two-file, tool-agnostic markdown prompt-template framework that turns a one-line feature request into a clarified PRD, then a ch |
| 23 | 5 | [sdi2200262/agentic-project-management](https://github.com/sdi2200262/agentic-project-management) | 2344 | pm-framework | high | ✅ | A Node.js CLI (`apm init`) that installs a spec-driven multi-agent project-management framework into a repo: a Planner produces Sp |
| 24 | 5 | [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | 2205 | subagent-catalog | high | ✅ | A large aggregated catalog for Claude Code — 135 agents (markdown+frontmatter personas), 35 vendored skill folders (+a SkillKit ma |

---

## Curated shortlist for the AI-PM Jumpstart (by program station)

Weighted for PM-craft + credibility + studyability, not raw stars. These are the repos to lift patterns from for each station of the program.

**① Context foundation** — the product context system
- [`huytieu/COG-second-brain`](https://github.com/huytieu/COG-second-brain) — numbered knowledge tree + **tiered-enrichment people CRM** + **corroboration-gated promotion** (page only at ≥2 mentions). Closest structural analogue to a personal PM-OS.
- [`garrytan/gbrain`](https://github.com/garrytan/gbrain) — when scale forces it: markdown→pgvector **knowledge-graph memory**, synthesis-returns-the-answer, **bi-temporal facts**, 3 frozen **cost-mode** retrieval bundles with a $/mo matrix.
- [`eugeniughelbur/obsidian-second-brain`](https://github.com/eugeniughelbur/obsidian-second-brain) — **always-loaded `CRITICAL_FACTS.md` (~120 tokens)**, self-rewriting notes (ingest only 'succeeds' if it rewrote, not appended), injected index replaces filesystem discovery.
- [`coleam00/second-brain-starter`](https://github.com/coleam00/second-brain-starter) — **Session/PreCompact/SessionEnd hooks** + append-everything daily log → heartbeat promotion into a lean `MEMORY.md`.

**② Definition & delivery** — PRD/spec → tasks → verified execution
- [`github/spec-kit`](https://github.com/github/spec-kit) — `constitution → specify → plan → tasks → implement`; the spec is the canonical artifact, every command gates against it.
- [`automazeio/ccpm`](https://github.com/automazeio/ccpm) — **PRD → GitHub Issues as the database**; agents coordinate via issue comments, run in **git worktrees**, return only summaries (context firewall).
- [`anombyte93/prd-taskmaster`](https://github.com/anombyte93/prd-taskmaster) — interview → **letter-graded placeholder-proof PRD** → dependency-ordered `tasks.json` → **`ship-check.py` re-runs tests in a sandbox and emits `SHIP_CHECK_OK` once** (anti-fake gate).
- [`snarktank/ai-dev-tasks`](https://github.com/snarktank/ai-dev-tasks) — the cleanest teaching example: `create-prd → generate-tasks → process-task-list` one-task-at-a-time with human checkpoints; pure markdown.
- [`bmad-code-org/BMAD-METHOD`](https://github.com/bmad-code-org/BMAD-METHOD) — named personas (incl. a dedicated PM) + **sharded docs** + phase-numbered folders that hand off down the chain.

**③ Discovery & insight** — the PM skills themselves
- [`itseffi/personal-os`](https://github.com/itseffi/personal-os) — the richest PM-skill content: OST intake/target-selection, JTBD extraction/clustering, assumption mapping, experiment design — plus **routing & memory-impact evals** (new `CM-30`).
- [`Digidai/product-manager-skills`](https://github.com/Digidai/product-manager-skills) — **single-skill multi-domain operator**: 7 intent→framework→file tables route a natural-language ask to the right method + file.
- [`pratikshadake/claude-product-management-skills`](https://github.com/pratikshadake/claude-product-management-skills) — **decision/diagnosis** skills (problem-clarity, retention-drop-diagnoser), not doc-generators; one shared fixture across all examples = a single curriculum.
- [`assimovt/productskills`](https://github.com/assimovt/productskills) — methodology-pure (Mom Test, Shape Up, OST, RICE), minimal two-field frontmatter for max portability.

**④ The skills/plugin layer** — how to author & ship a skill library
- [`phuryn/pm-skills`](https://github.com/phuryn/pm-skills) (21640★) — 68 skills / 42 command-chains / 9 plugins; **skills=nouns, commands=verbs** split; provenance doubles as the trigger string.
- [`deanpeters/Product-Manager-Skills`](https://github.com/deanpeters/Product-Manager-Skills) (5471★) — **3-tier workflow→interactive→component** orchestration; **Adaptive Decision Ladder** (each option ships a decision-consequence gloss that teaches while it collects).
- [`product-on-purpose/pm-skills`](https://github.com/product-on-purpose/pm-skills) — **SKILL+TEMPLATE+EXAMPLE** triad; `trigger-fixtures.json` requires ≥2 adversarial near-miss negatives per collision pair; `pm-critic` grades each artifact against its originating skill's contract.
- [`anthropics/knowledge-work-plugins`](https://github.com/anthropics/knowledge-work-plugins) — the **official PM plugin**: 8 auto-skills + 1 command, **`~~category` connector indirection** so one skill body is portable across Jira/Linear/Notion via a `CONNECTORS.md` resolver.

**⑤ Teams & subagents** — multi-agent product org
- [`slgoodrich/agents`](https://github.com/slgoodrich/agents) — `product-manager` **router → 7 specialists** + team presets (validation-sprint, prd-stress-test, competitive-war-room); `idea-skeptic` self-rates its own confidence to avoid an over-zealous critic.
- [`aakashg/pm-claude-code-setup`](https://github.com/aakashg/pm-claude-code-setup) — **lowest-infrastructure** critic panel: a verbal `review as [role]` swap chain inside ONE context, zero agent files; + `HANDOFF.md` session transitions.
- [`contains-studio/agents`](https://github.com/contains-studio/agents) — agent frontmatter stuffs 3–4 `<example>` blocks as the invocation training signal; `sprint-prioritizer` (RICE/Kano/JTBD), `feedback-synthesizer`.
- [`msitarzewski/agency-agents`](https://github.com/msitarzewski/agency-agents) — full PM agent file anatomy + an 8-agents-in-parallel discovery exercise whose synthesis **preserves disagreement** ($29 vs $99 pricing) for a human (new `SA-19`).

**⑥ Adjacent: growth / marketing** (PM+growth/marketing teams)
- [`coreyhaines31/marketingskills`](https://github.com/coreyhaines31/marketingskills) (35383★) — best reference for **authoring a large skill library at scale**: structure, validators, multi-harness packaging, self-syncing catalog.
- [`zubair-trabzada/ai-marketing-claude`](https://github.com/zubair-trabzada/ai-marketing-claude) — a **router skill → 5 parallel scoring subagents**, each bound to one dimension, reduced via a published weight vector (the fleet IS the scoring model).
- [`AgriciDaniel/claude-seo`](https://github.com/AgriciDaniel/claude-seo) — domain decomposed into 25 sub-skills + 18 sub-agents with a **signal-gated conditional roster** (new `SA-20`) that degrades to sequential when the harness lacks subagents.

---

## Context-management patterns (35 canonical)

*Full repo lists + exemplars in tab `02` / `csv/02_context_patterns.csv`.*

| Code | Pattern | #repos | Mechanism |
|---|---|--:|---|
| `CM-01` | **Tiered context tree** | 17 | Three-tier layout: Tier-1 root always-loaded identity/rules, Tier-2 index that maps where info lives, Tier-3 just-in-time content files pulled only when relevant. |
| `CM-02` | **Root instruction file** | 36 | A CLAUDE.md / AGENTS.md at the root encoding identity, operating rules, and output standards loaded every session. |
| `CM-03` | **Always-loaded core facts** | 16 | A tiny token-budgeted 'critical facts' preamble loaded into every session as durable grounding. |
| `CM-04` | **Just-in-time / lazy retrieval** | 29 | Store IDs/keys/links/placeholders and load full objects only at runtime when actually needed. |
| `CM-05` | **Progressive disclosure / context drilling** | 24 | Load skill frontmatter or summaries first, drill into full content only once a match is established. |
| `CM-06` | **Context firewall** | 15 | A subagent returns a compact summary to the main thread; its raw working output never enters the parent context. |
| `CM-07` | **Fresh-context subagent / one-task-one-session** | 10 | Spawn a clean context for heavy or independent work so the main session stays uncluttered. |
| `CM-08` | **Document-handoff chain** | 33 | Each step writes an artifact the next step reads — the document is the baton passed down the pipeline. |
| `CM-09` | **Session-handoff / journal file** | 16 | A HANDOFF.md-style continuity doc carries working knowledge across sessions or compaction boundaries. |
| `CM-10` | **Spec/PRD-as-source-of-truth** | 28 | A written spec or PRD is the durable context artifact agents execute against. |
| `CM-11` | **Folder-per-change / artifact lifecycle state machine** | 8 | Propose/apply/archive style change folders whose presence and location encode lifecycle state. |
| `CM-12` | **Living wiki / LLM-maintained KB** | 11 | An agent continuously turns raw notes into an interlinked KB and self-rewrites/lints it (Karpathy LLM-Wiki). |
| `CM-13` | **Knowledge-graph memory** | 7 | Typed edges between entities, hybrid vector+keyword retrieval, synthesis that returns the answer rather than raw chunks. |
| `CM-14` | **DB-backed persistent memory** | 14 | Memory stored outside the context window in a database (SQLite FTS5 / pgvector / Postgres / issue tracker). |
| `CM-15` | **Memory tiering with decay** | 5 | Memory organized into decay tiers (core/active/warm/cold/archive), often Ebbinghaus-style, that age out over time. |
| `CM-16` | **Memory consolidation / periodic reconciliation** | 9 | A scheduled pass merges, dedups, and clusters accumulated memory. |
| `CM-17` | **Provenance & citations** | 10 | Source-linked claims with confidence levels attached to stored or generated knowledge. |
| `CM-18` | **Bi-temporal facts** | 2 | Facts track valid-time (when true in the world) separately from ingest-time (when recorded). |
| `CM-19` | **Lifecycle / compaction hooks** | 11 | SessionStart/PreCompact/SessionEnd/PreToolUse hooks fire to persist, gate, or steer state across the session lifecycle. |
| `CM-20` | **Structured inter-agent context passing** | 16 | A typed payload (context_packet JSON) is handed between agents as the unit of context transfer. |
| `CM-21` | **Self-evolving / delta-aware docs** | 10 | A command updates existing docs in place when something changes (e.g. /prd-evolve), rather than re-authoring from scratch. |
| `CM-22` | **Constitution / governance doc** | 18 | Non-negotiable principles encoded as an anti-drift gate the work is checked against. |
| `CM-23` | **Goal-anchored state** | 12 | A GOALS.md / BACKLOG.md drives prioritization and relevance scoring of work. |
| `CM-24` | **Context-scaffolding setup** | 16 | A command writes N starter context files into a fixed folder (e.g. .claude/product-context/) to bootstrap a project. |
| `CM-25` | **Index / map file** | 34 | An explicit index of where knowledge lives, used for retrieval without a vector DB. |
| `CM-26` | **People/entity CRM** | 5 | Tiered-enrichment person/entity profiles maintained as a relationship store. |
| `CM-27` | **Capture loop** | 18 | An end-of-session 'what did we learn' pass folds new learnings back into context. |
| `CM-28` | **Markdown-traversal-over-RAG** | 6 | Wikilinks and file traversal substitute for vector retrieval as the knowledge-navigation method. |
| `CM-29` | **Tool-agnostic connector indirection** | 1 | Skills address an abstract capability CATEGORY (e.g. ~~tracker, ~~chat); a separate resolver table binds the category to whatever MCP server the user actually connected, so one skill body is portable across competing tools. |
| `CM-30` | **Self-eval / routing eval harness** | 2 | A graded eval that empirically measures the OS's own behavior — skill-routing accuracy, memory contribution, or agent-session quality — against labeled cases with a min-pass-rate CI gate. |
| `CM-31` | **Externalized state-tree executors** | 4 | 100% of project state lives in an external file tree (.apm/, .gstack/, issue tracker); agents hold no durable state and are hot-swappable by construction — coordinating through a filesystem message bus or addressed memory blackboard rather than direct handoff. |
| `CM-32` | **Corroboration-gated promotion** | 2 | A concept/entity earns a durable first-class page only when independently mentioned ≥2 times across distinct sources; single-source mentions stay transient — counting signal prevents one-off noise from polluting the KB. |
| `CM-33` | **Cost-as-governing-constraint** | 3 | Spend is a first-class governance gate, not telemetry: free-tier/model pins, a cost ledger, named retrieval cost-mode bundles, and threshold alerts wired into the OS as halting checkpoints. |
| `CM-34` | **Deterministic completion oracle / anti-fake gate** | 1 | A runtime check that statically or by re-execution proves work is genuinely done — sandbox re-run emitting an unfakable ship token, reachability/orphan classification, or per-phase typed-evidence gate — blocking scaffolded-but-unwired code from counting as shipped. |
| `CM-35` | **Generated-counter integrity / doc-drift CI gate** | 3 | A CI script derives headline counts and cross-references from the actual directory tree and fails the build if committed docs (README/CLAUDE.md/manifests) disagree, keeping a large monorepo's self-description from drifting. |

## Skills patterns (23 canonical)

*Tab `03`.*

| Code | Pattern | #repos | Mechanism |
|---|---|--:|---|
| `SK-01` | **SKILL.md + YAML frontmatter** | 40 | A SKILL.md with name/description/trigger frontmatter; auto-invoked by description match. |
| `SK-02` | **Skill = folder with bundled resources** | 34 | A skill is a folder bundling references/, templates/, examples/, and scripts/ alongside SKILL.md. |
| `SK-03` | **Skill + Template + Example triad** | 17 | Each skill ships three files: a method file, a structure/template file, and a worked-example file. |
| `SK-04` | **Tiered/orchestrating skills** | 17 | Workflow skills call interactive skills which call component skills — a layered skill hierarchy. |
| `SK-05` | **Command/skill chaining** | 27 | Slash commands chain multiple skills into a workflow. |
| `SK-06` | **Interactive elicitation gate** | 24 | Ask 3-5 clarifying questions before producing output (e.g. an Adaptive Decision Ladder). |
| `SK-07` | **Methodology-encoded skills** | 37 | Named PM/business frameworks baked into skills (JTBD/RICE/OST/Mom Test/Shape Up/INSPIRED). |
| `SK-08` | **Decision/diagnosis skills** | 28 | Reasoning skills (problem-clarity, retention-drop-diagnoser) as opposed to doc-generation skills. |
| `SK-09` | **Enforced-output contract** | 41 | Required sections / N output rules / placeholder-proof gates constraining the deliverable shape. |
| `SK-10` | **Anti-hallucination / gap-flagging** | 22 | [NEED:…] markers and data-source/business-rule interrogation loops that surface missing inputs instead of inventing them. |
| `SK-11` | **Worked-example / few-shot grounding** | 14 | Sample outputs (often across fictional companies) ground the skill's expected quality. |
| `SK-12` | **Skill router / dispatcher** | 18 | One entry skill routes to other skills or subagents. |
| `SK-13` | **Executable skill** | 16 | A skill bundles runnable code (e.g. rice_prioritizer.py) it invokes deterministically. |
| `SK-14` | **Single-skill multi-domain operator** | 8 | One skill covers many sub-domains via internal routing. |
| `SK-15` | **Meta-skill / skills-generator** | 13 | Skills that generate project-specific skills. |
| `SK-16` | **Cross-harness packaging** | 23 | Adapters so one skill runs on Claude Code / Codex / Cursor / Gemini. |
| `SK-17` | **Plugin / marketplace bundling** | 22 | plugin.json / marketplace manifest / installable packs. |
| `SK-18` | **Self-improving skill** | 6 | Auto-memory curation, taste profiles, skill quarantine until proven. |
| `SK-19` | **CLI installer / package manager** | 23 | ccpi / specify / davila7-style install + validate command. |
| `SK-20` | **Commands-vs-skills split** | 24 | Explicit /commands (user-invoked) vs auto-invoked skills — a deliberate division of invocation surface. |
| `SK-21` | **Skill quality validators / contracts** | 27 | CI checks on skills: count, trigger accuracy, cross-ref, output quality, linter. |
| `SK-22` | **Statistical reliability certification** | 1 | A probabilistic harness runs many simulated invocations and produces confidence intervals + a certification grade — treating a skill like a flaky test suite and certifying its reliability, beyond boolean lint. |
| `SK-23` | **Domain re-skin of a coding-agent OS** | 3 | Forking an entire spec-driven dev toolchain and rebinding its slots (tests→metrics, code→assets, constitution→domain principles) to a wholly different function while keeping the CLI/command/template machinery intact — the OS is the fork-and-rebind recipe, not the content. |

## Subagent patterns (21 canonical)

*Tab `04`.*

| Code | Pattern | #repos | Mechanism |
|---|---|--:|---|
| `SA-01` | **Named role personas** | 24 | PM / PO / Architect / Analyst / Designer as distinct agents. |
| `SA-02` | **Orchestrator/router → specialists** | 20 | A dispatcher agent routes work to specialist agents. |
| `SA-03` | **Planner/Manager → Workers** | 19 | A planner produces a plan, then delegates tasks to worker agents. |
| `SA-04` | **Multi-agent team presets** | 5 | Bundled panels (validation-sprint, war-room) invoked together as a unit. |
| `SA-05` | **Parallel fan-out subagents** | 21 | N agents work different dimensions concurrently. |
| `SA-06` | **Reviewer/critic persona chain** | 17 | Engineer/designer/exec/skeptic review the output in sequence. |
| `SA-07` | **Adversarial / fresh-context verifier** | 17 | A skeptic agent reviews against spec in a fresh context to avoid confirmation bias. |
| `SA-08` | **Multi-agent debate / consensus** | 7 | Agents debate; adaptive consensus or graph verification drives toward a single answer. |
| `SA-09` | **Agent definition as markdown+frontmatter** | 28 | System prompt + tools + model declared in a .md file. |
| `SA-10` | **Worktree-isolated parallel execution** | 5 | Git worktrees per agent to avoid file conflicts. |
| `SA-11` | **Dependency-wave fleet** | 6 | Checker-gated parallel workers advancing across dependency waves. |
| `SA-12` | **Swarm / hive-mind** | 2 | Queen + workers, shared memory, topologies. |
| `SA-13` | **Context-handoff / memory transfer to fresh agents** | 11 | A handoff doc passes working knowledge to a new agent instance. |
| `SA-14` | **Framework-defined agents** | 3 | crewAI / LangGraph-style tasks.yaml role+task config. |
| `SA-15` | **Sequential specialized pipeline** | 14 | A fixed ordered chain (interrogator → researcher → writer → …). |
| `SA-16` | **Model-tiering per agent** | 15 | Fast/cheap model for triage, frontier model for reasoning. |
| `SA-17` | **Tool-scoped agents** | 18 | Least-privilege tool allowlist per agent. |
| `SA-18` | **Persona-council deliberation** | 2 | Multiple personas deliberate with a turn / PASS-DONE loop. |
| `SA-19` | **Disagreement-preserving synthesis** | 2 | A final pass over independent parallel outputs deliberately reports BOTH points of convergence (high-confidence signal) AND unresolved tensions, refusing to manufacture consensus — preserved disagreement is the deliverable, escalated to a human. |
| `SA-20` | **Signal-gated conditional roster** | 2 | A gate selects WHICH specialist personas join a run based on detected signals (business type, MCP/credential availability, prior-state existence) — a per-run roster composition decision rather than wave scheduling or unconditional fan-out; the same workflow also degrades to sequential single-context when the host harness lacks subagent spawning. |
| `SA-21` | **Trust-scored agent reputation** | 1 | Continuous quantitative trust/reputation scoring per agent, used to gate or weight its contribution in coordination and consensus. |

## 12 patterns this survey discovered (beyond the seed vocabulary)

*These are the genuinely novel mechanisms the divers surfaced — the frontier worth watching. Tab `12`.*

| Code | Pattern | Axis | What it is | Repos |
|---|---|---|---|---|
| `CM-29` | **Tool-agnostic connector indirection** | context_mgmt | Skills address an abstract capability CATEGORY (~~tracker, ~~chat); a separate resolver table binds it to whatever MCP server the user connected, so one skill body is portable across competing tools.  | anthropics/knowledge-work-plugins |
| `CM-30` | **Self-eval / routing eval harness** | context_mgmt | A graded eval measuring the OS's OWN behavior — skill-routing accuracy, memory contribution (A/B phrase-subset), or agent-session quality from session traces — against labeled cases with a min-pass-ra | itseffi/personal-os, amanaiproduct/personal-os |
| `CM-31` | **Externalized state-tree executors** | context_mgmt | 100% of project state lives in an external file tree / issue tracker / addressed memory blackboard; agents hold no durable state and are hot-swappable, coordinating via filesystem mailboxes or address | automazeio/ccpm, sdi2200262/agentic-project-management, ruvnet/claude-flow, msitarzewski/agency-agents |
| `CM-32` | **Corroboration-gated promotion** | context_mgmt | A concept/entity earns a durable first-class page only when independently mentioned ≥2 times across distinct sources; single-source mentions stay transient. Counting signal is the promotion gate. Inve | huytieu/COG-second-brain, iusztinpaul/ai-research-os-workshop |
| `CM-33` | **Cost-as-governing-constraint** | context_mgmt | Spend is a first-class governance gate: free-tier/model pins, a cost ledger, named retrieval cost-mode bundles, subscription-session runtime, and threshold alerts wired as halting checkpoints. No CM/S | modimihir07/agentic-os, garrytan/gbrain, smixs/agent-second-brain |
| `CM-34` | **Deterministic completion oracle / anti-fake gate** | context_mgmt | A runtime check that proves work is genuinely done — sandbox re-execution emitting an unfakable ship token, reachability/orphan classification, per-phase typed-evidence PreToolUse gate — blocking scaf | anombyte93/prd-taskmaster |
| `CM-35` | **Generated-counter integrity / doc-drift CI gate** | context_mgmt | A CI script derives headline counts and cross-references from the actual directory tree and fails the build if committed docs/manifests disagree (or regenerates them from source and self-commits). Kee | alirezarezvani/claude-skills, wshobson/agents, coreyhaines31/marketingskills |
| `SK-22` | **Statistical reliability certification** | skills | A probabilistic harness runs many simulated invocations and produces confidence intervals + a certification grade, treating a skill like a flaky test suite. Distinct from SK-21 (boolean lint) by being | wshobson/agents |
| `SK-23` | **Domain re-skin of a coding-agent OS** | skills | Forking an entire spec-driven dev toolchain and rebinding its slots (tests→metrics, code→assets, constitution→domain principles) to a different function while keeping the CLI/command/template machiner | agentii-ai/growth-hacking-kit, coreyhaines31/marketingskills, zubair-trabzada/ai-marketing-claude |
| `SA-19` | **Disagreement-preserving synthesis** | subagents | A synthesis pass over independent parallel outputs reports BOTH convergence (signal) AND unresolved tensions, refusing consensus — preserved disagreement is the deliverable, escalated to a human. Oppo | msitarzewski/agency-agents, eugeniughelbur/obsidian-second-brain |
| `SA-20` | **Signal-gated conditional roster** | subagents | A gate selects WHICH specialist personas join a run based on detected signals (business type, MCP/credential availability, prior-state), and degrades the same workflow to single-context sequential whe | AgriciDaniel/claude-seo, huytieu/COG-second-brain |
| `SA-21` | **Trust-scored agent reputation** | subagents | Continuous quantitative per-agent trust/reputation scoring used to gate or weight an agent's contribution in coordination/consensus. No SA code (closest SA-08/SA-16) covers reputation weighting. | ruvnet/claude-flow |

## The 10 biggest cross-repo themes

1. Skills are the universal substrate: SKILL.md + frontmatter (SK-01, 40 repos), enforced-output contracts (SK-09, 41), methodology-encoded frameworks (SK-07, 37), folder-with-resources (SK-02, 34) and a root CLAUDE.md/AGENTS.md (CM-02, 36) form the de-facto standard skeleton every repo shares — the field has converged on a common file format.

2. File-and-folder structure IS the database: the dominant memory strategy is index/map files (CM-25, 34) and document-handoff chains (CM-08, 33) over markdown traversal, not vector RAG. Many repos go further and make the FILESYSTEM the state machine and coordination bus — externalized state-tree executors (new CM-31: ccpm's GitHub-Issues-as-DB, APM's file mailboxes, claude-flow's blackboard) let stateless agents be hot-swapped.

3. Spec-driven development is the backbone workflow: spec/PRD-as-source-of-truth (CM-10, 28) feeds a Planner→Workers (SA-03) and sequential-pipeline (SA-15) execution model, with constitutions/governance docs (CM-22, 18) as the anti-drift gate. github/spec-kit, BMAD, OpenSpec, ccpm, task-master all instantiate the same propose→plan→build→verify loop.

4. Anti-hallucination and verification are first-class, escalating from soft to hard: gap-flagging (SK-10, 22) and adversarial verifiers (SA-07, 17) are common; the leading edge adds RUNTIME proof — deterministic completion oracles and reachability gates (new CM-34, anombyte93), confidence-gated LLM-judge filters (anthropics/claude-plugins-official), and self-disclosed-confidence skeptics (slgoodrich) — distrusting agent output by construction.

5. The OS now evaluates and governs ITSELF: a new cluster of meta-mechanisms appeared that has no single canonical home before this pass — self/routing evals (new CM-30), doc-drift/counter-integrity CI gates (new CM-35), statistical reliability certification (new SK-22), and skill-quality validators (SK-21, 27). Repos treat their own skills, routing, and docs as testable, drift-prone artifacts.

6. Cost has become a governing constraint, not an afterthought (new CM-33): free-model pins + cost ledgers (modimihir07), named retrieval cost-mode bundles with a $/mo matrix (gbrain), subscription-session runtimes (smixs), and cost-tiered verification ladders (cdeust) all treat spend as a constitutional gate — a theme absent from the original vocabulary.

7. Cross-harness portability is a deliberate design axis: cross-harness packaging (SK-16, 23), CLI installers (SK-19, 23), and plugin/marketplace bundling (SK-17, 22) are widespread, ranging from minimalist two-field frontmatter (assimovt) to full adapter compilers (wshobson) and 243-plugin pointer registries (anthropics/claude-plugins-official); the new SK-23 (domain re-skin) shows the whole OS itself being forked and rebound to marketing/growth.

8. Second-brain repos form a distinct sub-genre with shared DNA: tiered context trees (CM-01), living LLM-maintained wikis (CM-12), memory tiering/decay and consolidation (CM-15/CM-16), people CRMs (CM-26), and the new corroboration-gated promotion (CM-32) cluster almost entirely in gbrain/gstack/COG/obsidian/smixs/coleam00/iusztinpaul — a recognizably different lineage from the PRD/spec-driven repos.

9. Subagent wiring spans a wide infrastructure spectrum for the SAME outcome: from zero-infra verbal role-swap in one context (aakashg) to markdown-defined agents (SA-09, 28), parallel fan-out (SA-05, 21), worktree isolation (SA-10), dependency waves (SA-11), and full swarms with trust scores (new SA-21, claude-flow) — and a notable counter-current that REFUSES consensus (new SA-19, disagreement-preserving synthesis) treating preserved tension as the deliverable.

10. Graceful degradation is an emerging portability concern (new SA-20): the same multi-agent workflow is authored to collapse to single-context sequential when the host harness lacks subagents (AgriciDaniel) or per a one-field solo/team toggle (COG) — recognizing that the broad PM-OS audience runs on heterogeneous, often subagent-less harnesses.

---

## Takeaways for the SoftServe AI-PM program

Concrete moves, mapped to the program's stations (synthesised from the 308 per-repo takeaways in tab `09`):

- **Ship configured defaults, not blank tools.** Every credible repo bundles a root `CLAUDE.md` + a curated skill set + (often) a `/setup` that scaffolds N context files (`CM-24`). Give pilot PMs a pre-built repo, not a prompt cheatsheet.
- **Make skills the unit, with a hard skills-vs-commands split** (`phuryn`: nouns vs verbs). Auto-invoked skills carry the methodology; user-invoked `/commands` chain them. This is the single most-copied design decision.
- **Enforce output contracts + gap-flagging in every skill** (`SK-09`/`SK-10`): required sections, `[NEED:…]` markers, placeholder-proof gates. This is what makes a draft trustworthy enough to hand to engineering.
- **Build the context system as files + an index, not RAG** (`CM-25`/`CM-08`/`CM-04`). Reserve a vector graph (`gbrain`-style) for the one client whose corpus genuinely demands it.
- **Adopt spec-as-source-of-truth for the Definition station** (`spec-kit`/`ccpm`/`BMAD`): PRD → tasks → execution, with a **constitution** as the anti-drift gate. For ADLC clients, version the PRD like code.
- **Verify by construction.** Pair an adversarial fresh-context reviewer (`SA-07`) with — where stakes are high — a deterministic completion oracle (`anombyte93`). Teach PMs to distrust the first draft by default.
- **Tier the model + meter the cost from day one** (`SA-16`/new `CM-33`): cheap model for triage/classification, frontier for PRD/strategy; cost visible per pod, free-tier pins where it fits.
- **Install a capture loop + a self-eval** (`CM-27`/new `CM-30`): end-of-session 'what did we learn' folds into context; a small routing/quality eval keeps the skill library honest as it grows. `itseffi/personal-os` shows both as runnable scripts.
- **Plan for graceful degradation** (new `SA-20`): clients run heterogeneous, often subagent-less harnesses — author multi-agent workflows to collapse to single-context sequential (one `agent_mode` toggle, à la `COG`).
- **Distribute as a versioned plugin/marketplace** (`SK-17`): the SS PM-skills library becomes the scaling asset and the moat — exactly the 'referential library as IP' decision in the program one-pager.

---

## Gaps & caveats

- **Selection bias:** stars favour general-purpose dev/awesome-list repos; the PM-purest repos are small. Rank on `Score`+`PM-fit`. The few mega-star catalogs (`hesreallyhim/awesome-claude-code`, `davila7/claude-code-templates`) are **indexes** — discovery surfaces, not studyable implementations — so they sit lower despite the stars.
- **Recency:** snapshot at 2026-06-29. Several repos are weeks-fresh; a couple are stale or **archived** (`gsd-build/get-shit-done` → successor `open-gsd/gsd-core`) or stale (`automazeio/ccpm`, last push 2026-03). Flagged per-row.
- **License before reuse:** `BMAD-METHOD` is NOASSERTION/Other; `cdeust/ai-prd-generator-plugin` is commercial with partly-encrypted internals; `Digidai` is CC BY-NC-SA (non-commercial). The most reuse-friendly are MIT/Apache (`phuryn`, `anthropics/*`, `spec-kit`, `ccpm`, `contains-studio`, `coreyhaines31`).
- **Depth vs breadth:** 48 deep-dived; the remaining 26 are ranked from verification only (lighter evidence) — marked `Deep-dived = —` in tab `01`. A handful of low-star repos (`rodrigorjsf`, `nanagajui`, `Nonarkara`) carry outsized *pattern* value despite little adoption.
- **Not independently re-verified:** profiles are single-pass agent extractions (high self-rated confidence) against live repos; spot-check any pattern you intend to lift before building on it. Every row carries its source links for exactly this.

---

## Appendix — all 74 repos & source links

*Grouped by scope, ranked within group. Every deep-dived repo's file-level links are in tabs `05–07`.*
### PM skills / OS (core)

- 🔬 [phuryn/pm-skills](https://github.com/phuryn/pm-skills) — 21640★ · high-fit — A Claude/Codex marketplace of 9 installable PM plugins bundling ~68 framework-encoded skills (SKILL.md) and ~42 slash-command workflows that chain tho
- 🔬 [deanpeters/Product-Manager-Skills](https://github.com/deanpeters/Product-Manager-Skills) — 5471★ · high-fit — A library of ~49-52 markdown PM-framework "skills" (component / interactive / workflow tiers) packaged for Claude Code, Codex, and ChatGPT, where inte
- 🔬 [amanaiproduct/personal-os](https://github.com/amanaiproduct/personal-os) — 512★ · high-fit — A minimalist, file-based "personal OS" for AI-PMs by Aman Khan: a brain-dump BACKLOG.md is turned into goal-anchored, priority-capped task files by a 
- 🔬 [product-on-purpose/pm-skills](https://github.com/product-on-purpose/pm-skills) — 428★ · high-fit — A 68-skill PM library (30 phase + 11 foundation + 12 utility + 15 tool) organized on the Triple Diamond framework, where each skill is a SKILL.md + re
- 🔬 [Digidai/product-manager-skills](https://github.com/Digidai/product-manager-skills) — 117★ · high-fit — A single multi-domain PM "operator" skill: one SKILL.md routes any PM request across 7 knowledge domains (discovery, strategy, artifacts, finance, gro
- · [OpenSQZ/GTPlanner](https://github.com/OpenSQZ/GTPlanner) — 293★ · high-fit — AI-powered PRD / planning generator (Python, PocketFlow async flows) that turns natural-language descriptions into structured technical docs, system a
- 🔬 [shawnpang/startup-founder-skills](https://github.com/shawnpang/startup-founder-skills) — 251★ · high-fit — A 50-skill markdown library of founder/operator tasks (fundraising, sales, product, recruiting, eng, legal, marketing) where every skill is a SKILL.md
- 🔬 [aakashg/pm-claude-skills](https://github.com/aakashg/pm-claude-skills) — 87★ · high-fit — 5 drop-in Claude Code skills for product managers (LinkedIn post writer, idea validator, prompt engineer, product designer, status-update writer), eac
- 🔬 [itseffi/personal-os](https://github.com/itseffi/personal-os) — 80★ · high-fit — A multi-runtime "personal OS" that turns a markdown task/goal/knowledge file tree into an agentic productivity system, fronted by ~47 SKILL.md skill p
- 🔬 [assimovt/productskills](https://github.com/assimovt/productskills) — 48★ · high-fit — A clean, install-anywhere pack of 16 methodology-encoded product-management skills (Mom Test, Shape Up, RICE, JTBD/Forces of Progress, April Dunford p
- 🔬 [pratikshadake/claude-product-management-skills](https://github.com/pratikshadake/claude-product-management-skills) — 30★ · high-fit — A flat catalog of 15 Claude Code "decision/diagnosis" PM skills (problem-clarity, jtbd-extractor, assumption-mapper, value-vs-effort, retention-drop-d
- · [cdeust/ai-prd-generator](https://github.com/cdeust/ai-prd-generator) — 6★ · high-fit — Swift-based (80%) AI PRD generator with an MCP server, a skills/ai-prd-generator/ skill dir, and commands/. Produces enterprise PRDs plus JIRA tickets
- · [GarrusHuang/prd-writer](https://github.com/GarrusHuang/prd-writer) — 1★ · high-fit — A single Claude Code skill (SKILL.md + references/) that interrogates a fuzzy product idea through a multi-phase requirement loop (data source / busin
- · [charlie947/ai-second-brain](https://github.com/charlie947/ai-second-brain) — 83★ · medium-fit — A single Claude Code skill (SKILL.md + packaged .skill) that builds a searchable AI second brain from ChatGPT/Claude conversation history and research
- · [buildermethods/bm-skills](https://github.com/buildermethods/bm-skills) — — · low-fit — Open-source collection of builder skills from Brian Casel / Builder Methods.

### Multi-agent product teams

- 🔬 [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) — 118193★ · high-fit — A 232-agent "AI agency" roster (16 divisions incl. Product=5 and Project Management=7 agents) where each agent is a single markdown file with YAML fro
- 🔬 [contains-studio/agents](https://github.com/contains-studio/agents) — 12400★ · high-fit — A flat catalog of ~39 single-file Claude Code subagents organized into 8 "studio department" folders (engineering, design, marketing, product, project
- 🔬 [aakashg/pm-claude-code-setup](https://github.com/aakashg/pm-claude-code-setup) — 139★ · high-fit — A deliberately minimal, drop-in Claude Code starter for product managers: a ~70-line "config-not-manual" CLAUDE.md (identity + writing rules + a 6-rev
- 🔬 [slgoodrich/agents](https://github.com/slgoodrich/agents) — 109★ · high-fit — "AI PM Copilot for Claude Code" — a two-plugin marketplace (ai-pm-copilot + agent-teams) giving solo devs a product-manager router agent over 7 PM spe
- 🔬 [jinjin1/Cursor-for-Product-Managers](https://github.com/jinjin1/Cursor-for-Product-Managers) — 56★ · high-fit — A Cursor-native PM "OS" (forked lineage from ai-dev-tasks) that turns Cursor into a continuous-discovery + strategy copilot: one always-on .cursor/rul
- 🔬 [nanagajui/agentic_prd](https://github.com/nanagajui/agentic_prd) — 10★ · medium-fit — A crewAI scaffold that turns a one-line app idea into an agentic-coder-ready PRD via a 5-agent product team (PM, PO, Designer, SME, QA Designer) runni
- · [deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts) — — · medium-fit — Repository of generative-AI prompts for product managers (ChatGPT, Claude, Gemini), by the author of Product-Manager-Skills.

### PRD / spec / PM frameworks

- 🔬 [github/spec-kit](https://github.com/github/spec-kit) — 116309★ · high-fit — A Spec-Driven Development framework + Python CLI (specify) that turns a natural-language feature description into an executable, dependency-ordered bu
- 🔬 [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec) — 57608★ · high-fit — A spec-driven-development framework + TypeScript CLI that makes AI coding assistants plan before they code: every change becomes a folder of proposal 
- 🔬 [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) — 49830★ · high-fit — "Breakthrough Method of Agile AI-Driven Development" (v6) — a full-SDLC framework where 12+ named persona agents (Analyst, PM, UX, Architect, Dev, etc
- 🔬 [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master) — 27718★ · high-fit — A PRD-to-structured-tasks engine for AI-driven development: parses a written PRD into a hierarchical, dependency-aware task graph stored as a tag-part
- 🔬 [automazeio/ccpm](https://github.com/automazeio/ccpm) — 8233★ · high-fit — A spec-driven project-management framework for Claude Code that turns a PRD into a technical epic, decomposes it into dependency-tagged task files, sy
- 🔬 [snarktank/ai-dev-tasks](https://github.com/snarktank/ai-dev-tasks) — 7769★ · high-fit — A two-file, tool-agnostic markdown prompt-template framework that turns a one-line feature request into a clarified PRD, then a checkbox task list, th
- 🔬 [sdi2200262/agentic-project-management](https://github.com/sdi2200262/agentic-project-management) — 2344★ · high-fit — A Node.js CLI (`apm init`) that installs a spec-driven multi-agent project-management framework into a repo: a Planner produces Spec/Plan/Rules + a po
- 🔬 [buildermethods/agent-os](https://github.com/buildermethods/agent-os) — 4973★ · medium-fit — A spec-driven-development framework (Brian Casel / Builder Methods) that extracts a codebase's own conventions into versioned "standards" files, index
- 🔬 [anombyte93/prd-taskmaster](https://github.com/anombyte93/prd-taskmaster) — 561★ · high-fit — "Atlas engine" — a Claude Code plugin that turns a one-line goal into a PM-style discovery interview, a letter-graded placeholder-proof PRD, a depende
- 🔬 [cdeust/ai-prd-generator-plugin](https://github.com/cdeust/ai-prd-generator-plugin) — 8★ · high-fit — A commercial Claude Code / Cowork plugin that turns a single skill into an 8-step PRD-generation pipeline: type-adaptive clarification, codebase RAG i
- 🔬 [rodrigorjsf/prd-generator-plugin](https://github.com/rodrigorjsf/prd-generator-plugin) — 1★ · high-fit — A Claude Code plugin that drives a product idea through a fixed 9-agent pipeline (interrogate -> research -> validate -> analyze -> design -> write ->
- · [oimiragieo/BMAD-SPEC-KIT](https://github.com/oimiragieo/BMAD-SPEC-KIT) — 5★ · medium-fit — A fork of bmad-code-org/BMAD-METHOD positioned as a hybrid integrating the BMAD agile multi-agent method with spec-driven workflows. Contains the inhe
- · [buildermethods/design-os](https://github.com/buildermethods/design-os) — — · medium-fit — Builder Methods' 'missing design process between product idea and codebase' — structured product/design spec workflow for AI agents.
- · [dennisschneider/cursor-ai-prd-workflow](https://github.com/dennisschneider/cursor-ai-prd-workflow) — 0★ · low-fit — A fork (of nurettincoban/ai-prd-workflow) of a PRD/RFC-driven Cursor workflow: ~7 markdown prompt templates (PRD creation, verification, feature extra
- · [rohan-patnaik/cursor-prd-rules](https://github.com/rohan-patnaik/cursor-prd-rules) — 0★ · low-fit — A small set of three .mdc 'Markdown Command' files for the Cursor editor that scaffold an AI-assisted dev workflow: create-prd.mdc (turn a feature ide
- · [stellarlinkco/myclaude](https://github.com/stellarlinkco/myclaude) — — · low-fit — Multi-agent orchestration workflow spanning Claude Code, Codex, Gemini, OpenCode.

### Growth / marketing (adjacent)

- 🔬 [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) — 35383★ · medium-fit — A 45-skill Agent-Skills marketing library (CRO, copywriting, SEO, pricing, launch, positioning, RevOps) packaged as a cross-agent skills pack + Claude
- 🔬 [zubair-trabzada/ai-marketing-claude](https://github.com/zubair-trabzada/ai-marketing-claude) — 2002★ · low-fit — A Claude Code skill pack for marketing/agency work whose flagship `/market audit <url>` fans out 5 dimension-specialist subagents (content/conversion/
- · [kostja94/marketing-skills](https://github.com/kostja94/marketing-skills) — 680★ · low-fit — 160+ marketing SKILL.md skills across 9 categories: SEO, Content, Paid Ads (12+ platforms), Pages (40+ types), Components, Channels, Platforms, Strate
- · [OpenClaudia/openclaudia-skills](https://github.com/OpenClaudia/openclaudia-skills) — 521★ · medium-fit — 34+ (matrix references 67+) open-source MARKETING skills for Claude Code as SKILL.md files: SEO audits/keyword research/programmatic SEO, content/copy
- 🔬 [agentii-ai/growth-hacking-kit](https://github.com/agentii-ai/growth-hacking-kit) — 5★ · medium-fit — A Spec-Kit (github/spec-kit) fork that re-skins spec-driven development as spec-driven growth marketing: a growthkit CLI scaffolds /growthkit.specify→
- · [ericosiu/ai-marketing-skills](https://github.com/ericosiu/ai-marketing-skills) — — · medium-fit — Open-source AI marketing skills (Single Brain): growth experiments, sales pipeline, content ops, outbound, SEO, finance automation.
- · [talknerdytome-labs/claude-agents](https://github.com/talknerdytome-labs/claude-agents) — 14★ · low-fit — Small collection of production-ready growth-marketing subagents for Claude Code powered by Claude + MCP servers: Website Intelligence (competitor mess
- 🔬 [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) — — · low-fit — An MIT-licensed Claude Code plugin that decomposes the entire SEO domain into 25 sub-skills (skills/*/SKILL.md) + 18 specialist sub-agents (agents/*.m

### Pattern donors (personal-OS / second-brain / orchestration)

- 🔬 [garrytan/gstack](https://github.com/garrytan/gstack) — 117932★ · medium-fit — An open-source Claude Code skill pack ("AI software factory") of 23+ slash-command roles (CEO, eng manager, designer, QA, security, release engineer) 
- 🔬 [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) — 64570★ · high-fit — GSD ("Get Shit Done") is a multi-runtime (Claude Code / Codex / Gemini / Grok) spec-driven development framework that decomposes work into phases and 
- 🔬 [ruvnet/claude-flow](https://github.com/ruvnet/claude-flow) — 62025★ · low-fit — A large multi-agent orchestration framework for Claude Code: a Queen-led hive-mind swarm with 74+ markdown-defined specialist agents, 150+ slash comma
- 🔬 [garrytan/gbrain](https://github.com/garrytan/gbrain) — 24497★ · medium-fit — A markdown "brain" repo (people/companies/deals/concepts/…) that syncs into Postgres+pgvector (or zero-config PGLite/WASM) for hybrid vector+BM25 retr
- 🔬 [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) — 19345★ · high-fit — A 345-skill / 78-plugin / 93-agent monorepo "skills library" packaged as a Claude Code marketplace with cross-harness adapters (Codex/Gemini/Cursor/He
- 🔬 [huytieu/COG-second-brain](https://github.com/huytieu/COG-second-brain) — 567★ · high-fit — A markdown-only "second brain" / PM-OS plugin (v3.6.0, MIT) with a numbered 00-06 knowledge vault, a tiered-enrichment people CRM, 19 model-invoked sk
- 🔬 [eugeniughelbur/obsidian-second-brain](https://github.com/eugeniughelbur/obsidian-second-brain) — 2800★ · low-fit — A cross-platform Claude skill (44 slash commands) that turns an Obsidian vault into a self-rewriting LLM-Wiki: sources rewrite 5-15 existing pages ins
- 🔬 [coleam00/second-brain-starter](https://github.com/coleam00/second-brain-starter) — 641★ · medium-fit — A Claude Code skill that generates a personalized 9-phase PRD for building a persistent, multi-platform "second brain" AI assistant, shipped with mark
- · [NicholasSpisak/second-brain](https://github.com/NicholasSpisak/second-brain) — 487★ · medium-fit — LLM-maintained personal knowledge base for Obsidian implementing Andrej Karpathy's 'LLM Wiki' pattern: an agent continuously turns raw notes into an i
- 🔬 [iusztinpaul/ai-research-os-workshop](https://github.com/iusztinpaul/ai-research-os-workshop) — 93★ · high-fit — A Claude Code plugin ("ai-research-os") that builds and maintains a persistent, LLM-curated Obsidian "second-brain" research wiki: it ingests sources 
- 🔬 [modimihir07/agentic-os](https://github.com/modimihir07/agentic-os) — 59★ · high-fit — A locally-hosted FastAPI "operating system" that orchestrates three free-tier LLM agents (opencode/Hermes/Gemini CLI) over a shared markdown brain wit
- 🔬 [smixs/agent-second-brain](https://github.com/smixs/agent-second-brain) — 285★ · low-fit — A 24/7 voice-first personal knowledge system: Telegram voice notes -> a long-lived interactive Claude Code session that types/links them into an Obsid
- · [Nonarkara/second-brain-os](https://github.com/Nonarkara/second-brain-os) — 0★ · medium-fit — Personal OS merging Obsidian + Claude Code + a 'council' of three named AI sibling personas (Hannah, Radar, Tenet) running over Telegram bots with a P
- · [AgriciDaniel/claude-obsidian](https://github.com/AgriciDaniel/claude-obsidian) — — · medium-fit — Self-organizing AI second brain for Obsidian + Claude Code: drop any source, Claude reads/links/files it into a connected Markdown knowledge graph (Ka

### Subagent & skill catalogs

- 🔬 [wshobson/agents](https://github.com/wshobson/agents) — 37318★ · medium-fit — A multi-harness agentic plugin marketplace: 88 plugins / 194 agents / 158 skills / 106 commands authored once as markdown under plugins/<name>/ and ge
- · [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) — 26791★ · medium-fit — A large curated 'awesome list' indexing 1,000+ (claimed 1,400+) agent skills from official dev teams (Anthropic, Google Labs, Vercel, Stripe, Cloudfla
- 🔬 [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) — 22549★ · medium-fit — A curated catalog of 154+ Claude Code subagents — single-file markdown agent definitions (system-prompt + frontmatter) organized into 10 category fold
- 🔬 [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) — 2205★ · high-fit — A large aggregated catalog for Claude Code — 135 agents (markdown+frontmatter personas), 35 vendored skill folders (+a SkillKit marketplace pointer), 
- · [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) — 36800★ · low-fit — The canonical hand-curated awesome-list of Claude Code skills, hooks, slash-commands, agent orchestrators, plugins.
- · [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) — 28300★ · low-fit — CLI tool + huge library of ready-to-use Claude Code agents, commands, settings, hooks, MCPs, and project templates.
- · [jeremylongshore/claude-code-plugins-plus-skills](https://github.com/jeremylongshore/claude-code-plugins-plus-skills) — 2500★ · medium-fit — Large open-source marketplace/catalog for Claude Code: advertises 425 plugins, 2,810 skills, 200 agents, with the ccpi CLI package manager (npm @inten
- · [andyrewlee/awesome-agent-orchestrators](https://github.com/andyrewlee/awesome-agent-orchestrators) — — · low-fit — Curated list of agent orchestrators / multi-agent harnesses.
- · [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks) — — · low-fit — Anthropic's official notebooks/recipes for building with Claude; includes a dedicated skills/ directory with custom-skill and doc-gen (Excel/PPT/PDF) 
- · [netresearch/claude-code-marketplace](https://github.com/netresearch/claude-code-marketplace) — — · low-fit — Curated Agent Skills collection / marketplace built on the open agentskills.io standard, portable across Claude Code, Cursor, Copilot, Codex, Gemini C
- · [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) — — · low-fit — Curated list of Claude Skills, resources, and tools focused on customizing Claude workflows (esp. Claude Code).

### Vendor baselines (Anthropic)

- 🔬 [anthropics/skills](https://github.com/anthropics/skills) — 156570★ · medium-fit — Anthropic's official reference collection of ~17 Agent Skills (document suite + creative/dev/enterprise examples) plus the canonical SKILL.md spec, a 
- 🔬 [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) — 31299★ · high-fit — Anthropic's official Claude Code plugin marketplace: a single .claude-plugin/marketplace.json directory listing 243 installable plugins (mostly third-
- 🔬 [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) — 22148★ · high-fit — Anthropic's official knowledge-work plugin marketplace; the product-management plugin is a skill-first PM toolkit — 8 auto-invoked SKILL.md skills (wr

---
*Generated by the PM-OS survey workflow (discovery + 48-agent deep-dive + taxonomy reconcile) on 2026-06-29. Machine-readable detail: `PM-OS-survey.xlsx` (13 tabs) and `csv/` (12 files).*