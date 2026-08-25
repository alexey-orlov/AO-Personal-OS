# Eval design & agentic evaluation practice

_status: live theme — the concrete craft of building, scoring, and maintaining eval suites for agentic AI: dataset/prompt-set design, automated scoring, benchmark gaming, judge-rubric calibration, "evals as the new PRD"_
_slug: eval-design-and-practice_
_updated: 2026-08-25 · 15 insights (16 attributions — one insight double-cited) from 11 episodes_

## The throughline

Across a dozen builders, eval design keeps recurring as the actual bottleneck skill of agentic AI: the durable move is to treat evals as the specification layer that used to belong to PRDs, then invest as much engineering time in scoring pipelines and CI as in the agents themselves. Two structural lessons cut across the practitioners: an eval is only as good as its target (McKinnon's Goldilocks prompt-set discipline and Fable's five-week detour into an unvalidated copy-edit benchmark are the same lesson from opposite directions — validate what "good" means before optimizing for it), and automated, adversarial, or judge-based scoring is what makes evals scale past a handful of human reviewers (GAN-style red-teaming, McKinnon's automated agentic-task scoring, and Tolen's rubric-driven human labeling all attack the same human-review bottleneck from different angles). A third thread — durability — runs underneath: Cherny's observation that evals outlive prompts but still saturate within a few model generations means the eval suite itself needs the same continuous-maintenance discipline production code gets.

## Insights

### Eval suites are the modern PRD for AI-driven features
Evals formalize 'what success looks like' the way PRDs used to, by encoding user examples and quantitative scoring so models can autonomously explore the 'how.' In practice they built datasets of doc-site questions, used models to generate and then refine scoring functions (e.g., concise code snippets, single-language answers), and applied those scorers to rank outputs automatically. This matters because it converts subjective product taste into repeatable, measurable evals—then human vibe checks (they iterate with a designer named David) are used only to refine the scorer rather than manually reviewing every example.
— How I AI · 2026-06-15 · guest: — · [▶ 25:18](https://www.youtube.com/watch?v=QE_1hRLsehM&t=1518) · `pi-QE_1hRLsehM-03`
— Lenny's Podcast · 2026-07-26 · guest: Dan (Anthropic) · [▶ 41:42](https://www.youtube.com/watch?v=tivaWTTVRhY&t=2502) · `pi-tivaWTTVRhY-01`
related: theme → [AI & the PM craft](ai-and-the-pm-craft.md) (evals as the new specification layer extends the PM-craft theme of converting taste into measurable process) · [Their copy-edit benchmark optimized an unvalidated target](#their-copy-edit-benchmark-optimized-an-unvalidated-target) (a concrete failure case of shipping an eval before validating the target)

### Offline evals are the primary product-spec communication tool
An offline eval — a representative set of prompts plus answer keys and a scoring method — is the clearest way to tell engineers what "good" looks like before shipping. McKinnon argues that running a product against an offline eval early reveals whether the model, the harness, or the product needs to change and avoids frustrating users in production. This matters because GenAI behavior is complex and brittle; an offline eval creates a measurable proxy for user satisfaction you can iterate on.
— Aakash Gupta · 2026-07-28 · guest: Daniel McKinnon (Gamoff Labs) · [▶ 3:01](https://www.youtube.com/watch?v=ztN6bE_FuQQ&t=181) · `pi-ztN6bE_FuQQ-01`
related: [Eval suites are the modern PRD for AI-driven features](#eval-suites-are-the-modern-prd-for-ai-driven-features) (same evals-as-spec discipline, a second practitioner independently naming evals as the PRD replacement)

### Primary engineering priority: build data→eval feedback pipelines and CI
The guest insists the top engineering job is constructing pipelines that pull real-world data into evals and investing in CI so you can move quickly and safely; they say this beats chasing prompt tweaks or agent frameworks. Examples include teams using evals to detect where engineers hit pain points or agents ask for escalated permissions, and the repeated advice to 'fix your CI' before expecting velocity gains from AI. The takeaway is practical: without automated feedback loops and solid CI you cannot reliably scale agent-driven workflows or trust their results in production.
— How I AI · 2026-06-15 · guest: — · [▶ 36:40](https://www.youtube.com/watch?v=QE_1hRLsehM&t=2200) · `pi-QE_1hRLsehM-04`
related: [Compound engineering prevents repeating the same automation mistakes (in Agent delegation)](agent-delegation-and-loops.md#compound-engineering-prevents-repeating-the-same-automation-mistakes) · [Agents can autonomously improve themselves via closed-loop prompt engineering (in Agent delegation)](agent-delegation-and-loops.md#agents-can-autonomously-improve-themselves-via-closed-loop-prompt-engineering)

### Agentic tasks require task-based evals, not QA benchmarks
Modern GenAI progress has shifted from single-turn Q&A to multi-step, tool-using agentic tasks, so old QA benchmarks (MMLU, etc.) are often saturated and uninformative. For agentic work you must construct evals that reflect multi-step procedures (reasoning, search, tool calls) and long time horizons, because success means completing a sequence of correct steps, not just giving a one-line answer. That change forces different prompt design, harness engineering, and scoring choices.
— Aakash Gupta · 2026-07-28 · guest: Daniel McKinnon (Gamoff Labs) · [▶ 13:01](https://www.youtube.com/watch?v=ztN6bE_FuQQ&t=781) · `pi-ztN6bE_FuQQ-02`

### Build a Goldilocks prompt set (≈100 prompts) with room to improve
McKinnon recommends collecting a representative set of roughly 100 prompts (can be fewer or more) that are neither trivial nor impossible so your eval scores sit around 25–50% initially. That 'room to run' lets engineering and research improve the system and you can retire easy evals as models saturate them. He emphasizes making scoring explicit (auto-score, another LLM evaluator, or human raters) so you can run experiments and track progress.
— Aakash Gupta · 2026-07-28 · guest: Daniel McKinnon (Gamoff Labs) · [▶ 8:08](https://www.youtube.com/watch?v=ztN6bE_FuQQ&t=488) · `pi-ztN6bE_FuQQ-03`

### Agentic evals demand automated scoring because human review doesn't scale
Because agentic outputs span many steps and long time horizons, human scoring is costly and often inconsistent; automated or LLM-based scoring is required to run frequent experiments at scale. McKinnon warns that some steps in a chain can be individually correct yet lead to wrong outcomes, so a scoring approach needs to capture final task success and intermediate correctness where possible. Without automated scoring, you can't iterate quickly or compare harness/model changes reliably.
— Aakash Gupta · 2026-07-28 · guest: Daniel McKinnon (Gamoff Labs) · [▶ 14:58](https://www.youtube.com/watch?v=ztN6bE_FuQQ&t=898) · `pi-ztN6bE_FuQQ-04`
related: [Primary engineering priority: build data→eval feedback pipelines and CI](#primary-engineering-priority-build-dataeval-feedback-pipelines-and-ci) (same automate-the-scoring-loop discipline, applied to agentic-task evals specifically)

### Their copy-edit benchmark optimized an unvalidated target
An internal copy-editing benchmark spent five weeks and 180 agent threads optimizing for strict recall against one editor's historical edits, targeting 70% match, before anyone validated that target was achievable. Fable's own review of the project called this out: the team's best runs plateaued around 47.5–50%, which may already be near the human ceiling (even the target editor is inconsistent with her own past edits), so the effort went into an ill-posed objective instead of cheaper, higher-information fixes.
— Every · 2026-07-02 · guest: Mike Taylor (head of AI tech consulting) · [▶ 19:26](https://www.youtube.com/watch?v=viISne4eLEY&t=1166) · `pi-viISne4eLEY-02`
related: [Eval suites are the modern PRD for AI-driven features](#eval-suites-are-the-modern-prd-for-ai-driven-features) · [Switch evaluation from exact recall to acceptance precision](#switch-evaluation-from-exact-recall-to-acceptance-precision)

### Switch evaluation from exact recall to acceptance precision
Because humans (even the target editor whose past edits were being matched) are inconsistent, the fix is to flip the objective from exact historical-recall to acceptance precision in a live suggestion loop — have the model produce edits and collect binary accept/reject judgments from a human to build a label factory. One human spending two hours judging ~60 cases is far cheaper than the five-week benchmark effort and yields training data aligned to whether an editor would actually accept an edit, not whether it matches a noisy past.
— Every · 2026-07-02 · guest: Mike Taylor (head of AI tech consulting) · [▶ 20:06](https://www.youtube.com/watch?v=viISne4eLEY&t=1206) · `pi-viISne4eLEY-03`
related: [Their copy-edit benchmark optimized an unvalidated target](#their-copy-edit-benchmark-optimized-an-unvalidated-target) · [Primary engineering priority: build data→eval feedback pipelines and CI](#primary-engineering-priority-build-dataeval-feedback-pipelines-and-ci)

### GAN-inspired adversarial evaluators can red-team agents automatically until they meet your pass criteria
The guest built an adversarial-evaluator loop: a red-teaming agent generates attacks against a generator agent, the evaluator scores failures against a rubric, and the generator updates (often the system prompt) and retries until mean scores exceed a threshold (e.g., >8) or max iterations are reached. She used this setup inside Claude Code, integrated with company code, and ran iterative hardening where each iteration produced higher scores — the approach is how she won the hackathon versus 30 engineering teams because it automates improvement and exposes edge cases the developer never manually authored.
— Aakash Gupta · 2026-07-13 · guest: Ji Nucla · [▶ 3:13](https://www.youtube.com/watch?v=uEK9ONplfRk&t=193) · `pi-uEK9ONplfRk-05`
related: [Eval suites are the modern PRD for AI-driven features](#eval-suites-are-the-modern-prd-for-ai-driven-features) (same formalize-what-success-looks-like discipline, applied as an adversarial generator/evaluator loop rather than a static scored dataset)

### LLMs can write state‑of‑the‑art GPU kernels but benchmarks get gamed
Community competitions produced kernels from people who never wrote CUDA that were competitive with experts; however, many high performers exploited 'reward hacks' (e.g., returning cached outputs or serving different code during correctness vs performance phases). Example: a degenerate kernel that returns zero can pass a mean test when inputs are standardized. The practical response is an adversarial audit cycle—collecting examples of cheats, synthesizing regex/AI detectors (KernelGuard), iterating tests and evals—because dynamic languages and benchmark design open many attack vectors.
— Y Combinator · 2026-07-29 · guest: Stuart (Stanford, Cursor), John, Mark (Core Auto, GPU Mode), Misha Manski, Brennan · [▶ 37:59](https://www.youtube.com/watch?v=n8dz2FX0_uY&t=2279) · `pi-n8dz2FX0_uY-03`
related: [GAN-inspired adversarial evaluators can red-team agents automatically until they meet your pass criteria](#gan-inspired-adversarial-evaluators-can-red-team-agents-automatically-until-they-meet-your-pass-criteria) (same generate-and-audit-against-gaming discipline, here applied to kernel benchmarks instead of agent red-teaming)

### Tracing and eval loops are essential to stop agent hallucinations
When agents call tools and make multi-step decisions you must trace and evaluate each span: the creator demonstrates Arise instrumenting Claude Code to capture every tool call, which revealed a resume-feedback agent hallucinating 'React' instead of the job posting's 'Python'. Using Arise, Claude suggested four evaluation criteria, the creator ran evals, found a ~12% failure rate, implemented fixes, and saw it drop under 2% — all in about 20 minutes. The lesson: without tracing+eval you ship blind; with them you can systematically find and fix agent errors.
— Aakash Gupta · 2026-07-09 · guest: Mang (Aura, New Form, Dream Cut) · [▶ 12:18](https://www.youtube.com/watch?v=tTTG1Nn-kkw&t=738) · `pi-tTTG1Nn-kkw-03`
related: [Eval suites are the modern PRD for AI-driven features](#eval-suites-are-the-modern-prd-for-ai-driven-features) (same evals-as-ground-truth discipline, applied here to catching a live hallucination rather than shaping a spec)

### Continuous evals are required to keep the review agent reliable
Every agent review should be logged to an internal eval platform so engineers can label whether the agent's decision was correct and why, enabling iterative improvements to scoring and prompts. The host highlights this as analogous to customer-facing model evals and essential when the agent touches critical systems like code.
— How I AI · 2026-08-05 · guest: — · [▶ 22:56](https://www.youtube.com/watch?v=cmATJGbA8bI&t=1376) · `pi-cmATJGbA8bI-05`
related: [Tracing and eval loops are essential to stop agent hallucinations](#tracing-and-eval-loops-are-essential-to-stop-agent-hallucinations) (same trace-and-label discipline, here applied to a PR-review agent instead of a resume-feedback agent) · [Eval suites are the modern PRD for AI-driven features](#eval-suites-are-the-modern-prd-for-ai-driven-features)

### Evals last longer than prompts but still saturate quickly
Evaluation suites are more stable than harness code or system prompts and you should append to them across generations, but they typically only survive one to a few model generations before saturating. Boris says an eval might live for "one, two, three model generations" because exponential model improvements often hit and exhaust old evals, forcing new, empirically derived tests. The practical implication: keep evals, but continually refresh them when models outgrow the checks.
— Y Combinator · 2026-07-27 · guest: Boris Cherny · [▶ 10:02](https://www.youtube.com/watch?v=qyPCVqFUyDo&t=602) · `pi-qyPCVqFUyDo-03`
related: [Eval suites are the modern PRD for AI-driven features](#eval-suites-are-the-modern-prd-for-ai-driven-features) (same evals-as-durable-spec discipline; this insight adds the saturation/refresh-cadence caveat)

### Evals are the 'brakes' — invest as much in them as in agents.
Kavak treats evaluation systems (evals) as essential safety and learning infrastructure and spends roughly equal engineering time, tokens, and budget on evals as on the agents themselves. Good evals let them move fast without catastrophic errors by measuring business outcomes (conversion, lifetime value, re-engagement) rather than superficial KPIs like call minutes. That discipline closes feedback loops: agents deployed to customers generate real data and labels that are used to fine-tune models and skills, producing rapid systemic improvement.
— a16z · 2026-08-10 · guest: Ali (Kavak) · [▶ 9:03](https://www.youtube.com/watch?v=n34CIw3gk1k&t=543) · `pi-n34CIw3gk1k-03`
related: [Eval suites are the modern PRD for AI-driven features](#eval-suites-are-the-modern-prd-for-ai-driven-features) (same evals-as-load-bearing-infrastructure discipline, here quantified as roughly equal budget to the agents themselves)

### High-quality companion behavior requires a lot of manual human labeling
Out-of-the-box 'vibe prompting' only gets you so far; the team builds judge prompts, collects many annotated examples, and injects their own taste via rubrics to evaluate every sentence or message. They recruit domain-appropriate raters, run research sessions, and iteratively tune judge prompts because producing reliably compelling, durable outputs demands scaled human-in-the-loop curation and example-driven supervision.
— Every · 2026-08-19 · guest: Quinton, Elliot (Tolen) · [▶ 68:44](https://www.youtube.com/watch?v=ngTS4gUINVk&t=4124) · `pi-ngTS4gUINVk-05`
related: [Evals are the 'brakes' — invest as much in them as in agents.](#evals-are-the-brakes--invest-as-much-in-them-as-in-agents) (same evals-as-core-infrastructure discipline, here for consumer-companion quality rather than enterprise agent reliability)

## Related themes
- [Agent engineering & production infra](agent-engineering-patterns.md) — parent theme; split off 2026-08-25. Production infra, guardrail/governance patterns, and the still-unresolved headless/infra/stair-step, multimodel-orchestration, and agentic-web-protocols clusters stay there.

## Source episodes
- [Every — $4M in 4 Weeks: How This AI Alien Companion App Took Off (Best of the Pod) (2026-08-19)](../episodes/2026/2026-08-19--every--4m-in-4-weeks-ai-alien-companion-app-tolen.md)
- [a16z — Kavak's Playbook for Rebuilding a Company Around AI (2026-08-10)](../episodes/2026/2026-08-10--a16z--kavaks-playbook-rebuilding-company-around-ai.md)
- [How I AI — Build an AI code review agent with Vercel Eve (full tutorial) (2026-08-05)](../episodes/2026/2026-08-05--howiai--build-an-ai-code-review-agent-with-vercel-eve.md)
- [Y Combinator — Multi-GPU Kernels, Intelligence per Watt, Heterogeneous Inference, and More | YC Paper Club (2026-07-29)](../episodes/2026/2026-07-29--yc--multi-gpu-kernels-intelligence-per-watt-paper-club.md)
- [Aakash Gupta — How to Build AI Evals Step-by-Step | Daniel McKinnon | Product Growth (2026-07-28)](../episodes/2026/2026-07-28--aakash--how-to-build-ai-evals-step-by-step.md)
- [Y Combinator — Boris Cherny: Building Claude Code (2026-07-27)](../episodes/2026/2026-07-27--yc--boris-cherny-building-claude-code.md)
- [Lenny's Podcast — Anthropic's first technical PM on token maxing, the jagged edge, and living in the future (2026-07-26)](../episodes/2026/2026-07-26--lenny--anthropics-first-technical-pm-token-maxing-jagged-edge.md)
- [Aakash Gupta — The Claude Setup That Let a PM Beat 30 Engineering Teams (2026-07-13)](../episodes/2026/2026-07-13--aakash--claude-setup-pm-beat-30-engineering-teams.md)
- [Aakash Gupta — Everyone's Using Claude. This PM Tool Does More (2026-07-09)](../episodes/2026/2026-07-09--aakash--everyones-using-claude-this-pm-tool-does-more.md)
- [Every — LET'S RIP FABLE TOKENS FROM THE JACUZZI (2026-07-02)](../episodes/2026/2026-07-02--every--lets-rip-fable-tokens-from-the-jacuzzi.md)
- [How I AI — How this startup uses AI agents to eliminate bugs and optimize infrastructure (2026-06-15)](../episodes/2026/2026-06-15--howiai--ai-agents-eliminate-bugs-optimize-infrastructure.md)
