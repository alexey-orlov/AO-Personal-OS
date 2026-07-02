# Agent delegation, loops & software factories

_status: live theme — overnight delegation patterns, loop design vocabulary, feedback→PR pipelines, memory engineering for sustained runs_
_slug: agent-delegation-and-loops_
_updated: 2026-07-02 · 17 insights from 5 episodes · (split from agent-engineering-patterns, 2026-06-25)_

## The throughline
Three practitioners — Krieger (Anthropic/Instagram co-founder), the Every software-factory author, and Replit's Amjad Masad — converged independently on what makes sustained agent delegation reliable rather than brittle. The enabling layer is memory engineering: 1M+ token context windows still need domain-aware compaction (delete bug-fix noise, preserve architectural facts, write durable markdown like raffle.md), mono-repo access so agents can grep rather than query-blindly, and nightly closed-loop refinement (Replit's autonomous agent analyzes interaction traces → proposes prompt changes → A/B tests in production → merges what passes sentiment and deploy-rate metrics). On top of that sits the delegation pattern itself: give Fable complex overnight jobs and wake to completions or documented fallbacks; automate the feedback→PR pipeline (batch Slack twice daily → classify → YAML records → Cursor/compound-engineering flow → auto-merge if CI green); use rich recordings (Rifreck: clicks + narration + network errors, not just video) so the model can reason about what to change rather than guess. The loop vocabulary generalizes these patterns: a loop is an autonomous scheduled automation — not a human typing messages — with a trigger (heartbeat / cron / hook) and either a time boundary or a validated success criterion. Goal loops (babysit PRs until merged, CI green) are the power form; they require precise success criteria or they burn tokens on marginal returns. Five composable primitives — work trees (isolation), skills (reusability), connectors (GitHub/Slack/Calendar), sub-agents (federated execution), state tracking (to-do / Linear) — are the building blocks that the other patterns assemble from.

## Insights

### Huge context windows plus tailored compaction enable effective agents
Replit says the usable context has jumped from ~16K to over 1 million tokens, but longevity requires smart compaction and multi-layer memories: delete 'bug-fix noise', preserve architectural facts (e.g., 'has a database'), and write durable long-term memory as markdown files like raffle.md. They maintain a graph-like memory and selectively compact so the agent keeps pointers to global state without being confused by extraneous history. The non-obvious point: bigger context without domain-aware pruning can degrade performance, so engineering the memory lifecycle is what makes large context useful.
— SaaStr AI · 2026-06-11 · guest: Amjad Masad (Replit) · [▶ 5:38](https://www.youtube.com/watch?v=RdalLtvn2-M&t=338) · `pi-RdalLtvn2-M-02`
related: [Mono-repos and file-system access make agents far more capable](#mono-repos-and-file-system-access-make-agents-far-more-capable)

### Agents can autonomously improve themselves via closed-loop prompt engineering
Replit runs an internal agent that nightly analyzes user interaction traces, generates pull requests with prompt/behavior changes, A/B tests them in production, and merges improvements that pass metrics like sentiment and deploy rate. This loop doesn't change model weights but iteratively improves prompts, search strategies, and integrations, producing steady capability gains the team can't fully track manually. It's significant because it demonstrates a practical path to self-improving agents today — faster iteration and scaling without retraining base models — and raises governance considerations.
— SaaStr AI · 2026-06-11 · guest: Amjad Masad (Replit) · [▶ 21:48](https://www.youtube.com/watch?v=RdalLtvn2-M&t=1308) · `pi-RdalLtvn2-M-03`
related: theme → [Tech frontier & abundance](tech-frontier-and-abundance.md) (Anthropic's pause request, `pi-P2HJEz3oqLs-01`, is the lab-scale version of this self-improvement loop)

### Mono-repos and file-system access make agents far more capable
Replit moved to a mono-repo architecture so agents can reuse code and share global context across apps (web, mobile, backend, admin), enabling an agent to fetch the right file-level context on demand instead of being limited to a single isolated project. Agents prefer searching file systems (grep-style) over SQL queries; having everything in one repo gives them pointers and immediate access to architecture, docs, and code, which improves accuracy and reduces expensive blind queries. The implication: how you organize company data and code (mono-repo, accessible file system, shared knowledge bases) materially affects agent performance.
— SaaStr AI · 2026-06-11 · guest: Amjad Masad (Replit) · [▶ 10:59](https://www.youtube.com/watch?v=RdalLtvn2-M&t=659) · `pi-RdalLtvn2-M-04`
related: [Huge context windows plus tailored compaction enable effective agents](#huge-context-windows-plus-tailored-compaction-enable-effective-agents) · [Proprietary context—not generic web knowledge—differentiates agents (in AI agents)](ai-agents-and-applications.md#proprietary-contextnot-generic-web-knowledgedifferentiates-agents)

### You can safely delegate long-running engineering tasks to the model
Krieger recounts routinely giving Fable complex jobs overnight—"wish Claude a good night, set it up on like a pretty complex task"—and waking to a completed implementation or a scaffolded fallback (e.g., temporary backend, documented caveats) that it tracked until dependent services returned. That persistent session capability turns the model into a teammate you can offload big chunks of work to, reducing iterative back-and-forth and enabling multi-hour or multi-day executions that previously required human supervision.
— Every · 2026-06-10 · guest: Mike Krieger (Instagram co-founder) · [▶ 3:31](https://www.youtube.com/watch?v=XWpTgCvgYaE&t=211) · `pi-XWpTgCvgYaE-01`
related: [Built for multi-day, long-running workflows but reliability still uneven (in Model reviews)](model-reviews-and-benchmarks.md#built-for-multi-day-long-running-workflows-but-reliability-still-uneven) (the reliability caveat behind the delegation claim)

### Trusting models requires new verification and judgment workflows
He emphasizes that although Fable often 'does it right' in one shot, teams must build verification loops: attach screenshots, video captures, end-to-end test flows, and staging accounts to each model-generated pull request to confirm behavior in production. Krieger also highlights model discernment—Fable can push back on code-review feedback or choose pragmatic quick fixes versus long-term rearchitecting—so verification combines automated artifacts plus human review of trade-offs.
— Every · 2026-06-10 · guest: Mike Krieger (Instagram co-founder) · [▶ 4:22](https://www.youtube.com/watch?v=XWpTgCvgYaE&t=262) · `pi-XWpTgCvgYaE-03`
related: [Conductor enforces a strict PR-first workflow; no direct edits (in Agent engineering)](agent-engineering-patterns.md#conductor-enforces-a-strict-pr-first-workflow-no-direct-edits) (same instinct: every output goes through a human-review chokepoint) · [Verification, not coding, is now the engineering bottleneck (in Agent engineering)](agent-engineering-patterns.md#verification-not-coding-is-now-the-engineering-bottleneck) (Fung's organizational framing of the same shift)

### Dynamic workflows let the model orchestrate multi-step engineering conversions
He describes creating a dynamic workflow that ported a Python codebase to TypeScript over a weekend: the workflow decomposed the job into spec, module-by-module translation, incremental testing, adversarial checks, and follow-up fixes. That orchestration—expressed as executable workflow code and runnable by the model—enables long-horizon, verified transformations that would be costly or impractical to do manually.
— Every · 2026-06-10 · guest: Mike Krieger (Instagram co-founder) · [▶ 48:28](https://www.youtube.com/watch?v=XWpTgCvgYaE&t=2908) · `pi-XWpTgCvgYaE-04`
related: [Emergent built an autonomous multi-agent system and proprietary infra (in Agent engineering)](agent-engineering-patterns.md#emergent-built-an-autonomous-multi-agent-system-and-proprietary-infra) (Emergent's multi-agent orchestration is the battle-tested version of the same decompose-and-coordinate pattern)

### Fable can automatically turn feedback into fixes and PRs
He uses Fable to read structured feedback, synthesize fixes, and create pull requests that include video walkthroughs of changes. In practice he kicks off the pipeline, Fable applies fixes in a branch and produces an artifact showing what changed, and he often just reviews and merges rather than hand-coding each fix. The result is a dramatic increase in feature-velocity: multiple reported items become a single, reviewable PR instead of many separate manual tasks.
— Every · 2026-06-11 · guest: — · [▶ 6:27](https://www.youtube.com/watch?v=rYX6m4gIys0&t=387) · `pi-rYX6m4gIys0-01`
related: [Conductor enforces a strict PR-first workflow; no direct edits (in Agent engineering)](agent-engineering-patterns.md#conductor-enforces-a-strict-pr-first-workflow-no-direct-edits) (PR-as-chokepoint runs through both systems)

### Rifreck captures richer feedback than a plain screen recording
Rifreck is an open-source wrapper for React that records clicks, spoken narration, network requests, and errors into a sharable file instead of just a video. That richer trace makes automated analysis possible: the pipeline can replay interactions or inspect requests and errors to produce more precise fixes. Having structured recordings in Slack is the input that lets the automation reason about what to change rather than guessing from a short video.
— Every · 2026-06-11 · guest: — · [▶ 2:51](https://www.youtube.com/watch?v=rYX6m4gIys0&t=171) · `pi-rYX6m4gIys0-02`

### Batch-processing Slack feedback twice daily keeps review manageable
He runs a scheduled task that scrapes Slack messages in the morning and evening, classifies items, downloads recordings, and writes YAML/markdown records for each issue. Those batches are then fed into a Cursor/compound-engineering flow that attempts fixes and leaves notes where human input is required, turning dozens of small reports into a few reviewable PRs. The batching reduces context-switching and makes it feasible for one person to validate many fixes rather than reviewing many tiny PRs.
— Every · 2026-06-11 · guest: — · [▶ 1:59](https://www.youtube.com/watch?v=rYX6m4gIys0&t=119) · `pi-rYX6m4gIys0-03`

### Compound engineering prevents repeating the same automation mistakes
The pipeline includes a compound step that uses prior runs to refine behavior, so when the system makes an error it learns not to repeat that same mistake on subsequent runs. He notes that iterative refinement means the automation improves over time, reducing the manual corrections you must make during review. That learning loop is what turns a brittle script into an increasingly reliable assistant.
— Every · 2026-06-11 · guest: — · [▶ 6:44](https://www.youtube.com/watch?v=rYX6m4gIys0&t=404) · `pi-rYX6m4gIys0-04`
related: [Agents can autonomously improve themselves via closed-loop prompt engineering](#agents-can-autonomously-improve-themselves-via-closed-loop-prompt-engineering) (Replit's nightly loop is the same principle at platform scale)

### You can safely auto-merge overnight if CI passes
He demonstrated kicking off the flow with an instruction like 'if everything looks good and the CI is green, merge it,' letting the system work overnight and waking to merged changes. In his example, the automated run finished while he slept and a teammate reported the design looked good the next morning—showing the process can produce deployable, high-quality updates without active daytime supervision. He does note the runs can take a few hours, but that latency is an acceptable tradeoff for asynchronous automation.
— Every · 2026-06-11 · guest: — · [▶ 7:09](https://www.youtube.com/watch?v=rYX6m4gIys0&t=429) · `pi-rYX6m4gIys0-05`

### A loop is an autonomous, scheduled automation an agent runs itself
A loop is not a human typing messages; it's an autonomous or semi-autonomous automation that kicks off an agent on a schedule or until a measurable outcome is reached. The host defines a loop as something that can prompt itself, run repeatedly (heartbeat/cron/hooks), and either stop when time is up or when the job's success criteria are met. Understanding this distinction reframes loops as low-touch 'employees' you design and onboard with explicit jobs and exit conditions.
— How I AI · 2026-06-17 · guest: — · [▶ 5:50](https://www.youtube.com/watch?v=JoXbk2fm7jM&t=350) · `pi-JoXbk2fm7jM-01`
related: [Good AI products are agentic loops with tools (in Agent engineering)](agent-engineering-patterns.md#good-ai-products-are-agentic-loops-with-tools) (Pedro's claim defines what AI apps ARE; this defines how loops work operationally — the same claim from opposite angles)

### You trigger loops three practical ways: heartbeats, crons, and hooks
Common trigger patterns are heartbeats (regular intervals), crons (fixed schedule times), and hooks (internal lifecycle events or external webhooks). The host gives the heartbeat example: "Every 5 minutes, check if I have a new Jira ticket, and if so, start a coding agent to triage and fix that Jira," showing how existing automation idioms map directly to prompting agents. Choosing the right trigger matters because it determines latency, cost, and how much data the loop can gather before acting.
— How I AI · 2026-06-17 · guest: — · [▶ 3:58](https://www.youtube.com/watch?v=JoXbk2fm7jM&t=238) · `pi-JoXbk2fm7jM-02`
related: [Goal loops run until a measurable outcome is validated](#goal-loops-run-until-a-measurable-outcome-is-validated) (the trigger type determines the stopping condition; heartbeats are interval-bounded, goal loops are outcome-bounded)

### Goal loops run until a measurable outcome is validated
A goal loop sets a concrete outcome and keeps an agent working (and spending compute) until that outcome can be validated or the agent is blocked. The video contrasts simple scheduled routines (e.g., morning briefings) with goal-based loops such as babysitting PRs until all merge checks pass, which Claude Code and Codex now support as first-class features. Goal loops are powerful because they turn open-ended work into verifiable tasks, but they require precise success criteria to avoid wasted compute.
— How I AI · 2026-06-17 · guest: — · [▶ 5:32](https://www.youtube.com/watch?v=JoXbk2fm7jM&t=332) · `pi-JoXbk2fm7jM-03`
related: [You can safely auto-merge overnight if CI passes](#you-can-safely-auto-merge-overnight-if-ci-passes) (CI green = the success criterion; babysit-PRs-until-merged is the canonical goal loop in practice) · [Loops can burn money and produce poor results without precise prompts](#loops-can-burn-money-and-produce-poor-results-without-precise-prompts) (goal loops specifically require crisp criteria to avoid runaway compute)

### Five engineering primitives make loops reliable and composable
To keep loops clean and safe you need: work trees (isolate agent code and avoid cross-contamination), skills (reusable task patterns), plugins/connectors (GitHub, Slack, Google Docs, etc.), sub-agents (spawned threads for federated tasks and validation), and state tracking (a to-do list or tracker like Linear). The host shows these in action—e.g., Claude Code routines using GitHub and Slack connectors and Codex spawning sub-agents to validate new skills—demonstrating how these primitives prevent conflicts and enable scale.
— How I AI · 2026-06-17 · guest: — · [▶ 6:21](https://www.youtube.com/watch?v=JoXbk2fm7jM&t=381) · `pi-JoXbk2fm7jM-04`
related: [Ship with many agentic workers: treat software work like a real-time strategy game (in Agent engineering)](agent-engineering-patterns.md#ship-with-many-agentic-workers-treat-software-work-like-a-real-time-strategy-game) (Channel AI's RTS framing maps directly to these primitives — worktrees, sub-agents, high-APM orchestration) · [Emergent built an autonomous multi-agent system and proprietary infra (in Agent engineering)](agent-engineering-patterns.md#emergent-built-an-autonomous-multi-agent-system-and-proprietary-infra) (Emergent's multi-agent orchestration + snapshotting is the production-scale implementation of these same primitives)

### Loops can burn money and produce poor results without precise prompts
Two main warnings: loops are easy to run continuously and can quickly consume tokens (cost), and goal-based loops in particular demand precise evaluation criteria and prompt engineering or they'll loop inefficiently. The speaker points to real examples (automations that spawn sub-agents and run validations) and recommends monitoring cost and writing strict success criteria—otherwise you get diligent agents that keep consuming compute for marginal returns.
— How I AI · 2026-06-17 · guest: — · [▶ 25:44](https://www.youtube.com/watch?v=JoXbk2fm7jM&t=1544) · `pi-JoXbk2fm7jM-05`
related: [Inference/token bills will become a material company expense; track attribution (in Agent engineering)](agent-engineering-patterns.md#inferencetoken-bills-will-become-a-material-company-expense-track-attribution) (Brex's Magpie is the attribution response to this exact risk) · [Eval suites are the modern PRD for AI-driven features (in Agent engineering)](agent-engineering-patterns.md#eval-suites-are-the-modern-prd-for-ai-driven-features) (evals solve the 'precise success criteria' problem this insight identifies as the root loop risk)

### Build 'loops'—systems that automate work and compound improvements
A 'loop' is a system you create that performs recurring tasks (like email triage or pipeline management) and learns from outcomes, so you intervene primarily at the start and end (the "human sandwich"). This gardening metaphor reframes knowledge work: invest in small, well‑documented processes, wire them into agents, and compound learnings instead of trying to remake everything at once.
— Every · 2026-07-01 · guest: Natalya (Head of Consulting, Every) · [▶ 26:19](https://www.youtube.com/watch?v=IiGt2_-NmbI&t=1579) · `pi-IiGt2_-NmbI-04`
related: [A loop is an autonomous, scheduled automation an agent runs itself](#a-loop-is-an-autonomous-scheduled-automation-an-agent-runs-itself) (same core definition — "human sandwich" is the practitioner's plain-language version of the trigger/success-criteria loop model)

## Related themes
- [Agent engineering & production infra](agent-engineering-patterns.md) — parent theme; architectural boundaries, security, eval infrastructure, and platform-scale governance that the delegation patterns depend on
- [Model reviews & benchmarks](model-reviews-and-benchmarks.md) — the reliability wall (last 10%, overnight stalls) that verification workflows address
- [Tech frontier & abundance](tech-frontier-and-abundance.md) — recursive self-improvement at lab scale (`pi-P2HJEz3oqLs-01`) is the same closed-loop principle at a different altitude
- [Leadership, careers & teams](leadership-careers-and-teams.md) — the human-role shift driven by delegation depth: verification as the new bottleneck, manager-as-IC imperative

## Source episodes
- [Every — How Anthropic Uses Claude Fable 5 With Mike Krieger (2026-06-10)](../episodes/2026/2026-06-10--every--anthropic-uses-claude-fable-5-mike-krieger.md)
- [Every — How I Built an AI Software Factory With Fable 5 (2026-06-11)](../episodes/2026/2026-06-11--every--ai-software-factory-with-fable-5.md)
- [SaaStr AI — What Agents That Actually Work Look Like Right Now (Replit) (2026-06-11)](../episodes/2026/2026-06-11--saastr--agents-that-actually-work-replit-amjad.md)
- [How I AI — Loop engineering for beginners (2026-06-17)](../episodes/2026/2026-06-17--howiai--loop-engineering-for-beginners.md)
- [Every — How Every's Head of Consulting Uses Codex Every Day (2026-07-01)](../episodes/2026/2026-07-01--every--everys-head-of-consulting-uses-codex-every-day.md)
