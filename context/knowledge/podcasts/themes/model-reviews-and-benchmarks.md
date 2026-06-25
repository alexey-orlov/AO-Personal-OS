# Model reviews & benchmarks

_status: live theme — hands-on practitioner reviews and benchmark findings for frontier models_
_slug: model-reviews-and-benchmarks_
_updated: 2026-06-25 · 16 insights from 6 episodes · (split from ai-agents-and-applications, 2026-06-11)_

## The throughline
Two hands-on reviews — Opus 4.8 and Fable 5 — find the same wall from different angles. Opus 4.8 is strong on one-shot scaffolding and ergonomics (voice, token efficiency, platform tooling) but hallucinates under follow-up pressure, latches onto narrow signals with overconfidence, and fails the "last 10%" of real engineering tasks (bugs at edge cases, failure to integrate into live codebases). Fable 5 is purpose-built for long-horizon multi-agent runs and stands out on vision and document formatting, but burns ~2× the tokens and stalls after ~3 hours of continuous operation. Neither closes the gap between benchmark wins and production ROI; both carry the same operational lesson: match model to task type (Fable for long-form/vision, Opus/Sonnet for iterative spec work), validate outputs carefully on any accuracy-sensitive task, and never conflate one-shot success with real-world iteration reliability. These findings sit in deliberate tension with benchmark headlines elsewhere in the base: the same model releases that set leaderboard records are the ones this reviewer found "100% made up things based on hypothesis." Two new dimensions extend the picture. GitHub/Microsoft's weekly 'hill climbing' — thumbs-up/down signals, acceptance rates, frontier tuning on enterprise data — is the product-cycle answer to the lab-to-production gap: systematic telemetry-driven improvement that narrows the benchmark-vs.-iteration-ROI divide without huge bespoke training runs. And a developer-trust failure for Fable 5 (panelists on a Diamandis podcast reporting 30-day prompt retention and silent user downgrading to an inferior model) reveals a new production-risk category: vendor policy can undermine enterprise deployment even when the underlying model is technically superior, pushing adoption toward on-prem or open-weight alternatives. GLM 5.2 concretizes the open-weight alternative: benchmarks near Opus/GPT-5.5 on coding tasks, 1M-token context, full modern ergonomics (streaming, function calls, MCP, structured output), at ~$0.56/million tokens via OpenRouter — with strong agentic and long-document performance and a confirmed React/TypeScript reliability weakness. It establishes that the benchmark-vs.-production-ROI and model-choice tradeoff analyses in this cluster now apply equally to open-weight frontier-class models.

## Insights

### Excels one-shot but fails the last 10% consistently
When asked to plan and autonomously code a feature, Opus 4.8 could take a spec, write code for about twenty minutes, and ship a working preview — a true one-shot success. However, when the reviewer pushed the feature live and iterated (bug-hunting, refinements, follow-ups) the model repeatedly struggled on the final ~10% of work, introducing bugs and failing to finish details. That pattern matters because real engineering is heavy on iteration and edge-case fixes, not just initial scaffolding.
— How I AI · 2026-05-29 · guest: — · [▶ 2:51](https://www.youtube.com/watch?v=h0gZf1hL4D4&t=171) · `pi-h0gZf1hL4D4-01`

### Hallucinates and invents facts during follow-ups
During debugging and business-analysis follow-ups the reviewer observed Opus 4.8 fabricate statements and assert hypotheses as facts instead of grounding them in data. He reports the model "100% made up things based on hypothesis not data," even on high-effort tasks, which is unusual compared with other models he's used. That behavior undermines trusting the model for verification tasks or any work that requires accurate evidence-checking.
— How I AI · 2026-05-29 · guest: — · [▶ 3:40](https://www.youtube.com/watch?v=h0gZf1hL4D4&t=220) · `pi-h0gZf1hL4D4-02`
related: [Avatar likeness is roughly fifty percent accurate and inconsistent (in Generative media)](generative-media-and-multimodal.md#avatar-likeness-is-roughly-fifty-percent-accurate-and-inconsistent) (same "last 10%" reliability wall, different modality)

### Fails to integrate into existing codebases; edges produce bugs
When pointed at live repos and asked to rebase and reconcile branches after a large PR, Opus 4.8 repeatedly introduced edge-case bugs and required cycle-after-cycle of fixes. The reviewer says it struggled to 'understand the elevation at which it should be operating' — i.e., where to safely modify code versus where to leave invariants alone. In practice this means the model is risky on maintenance tasks and real engineering pipelines without heavy human oversight.
— How I AI · 2026-05-29 · guest: — · [▶ 4:25](https://www.youtube.com/watch?v=h0gZf1hL4D4&t=265) · `pi-h0gZf1hL4D4-03`

### Overconfident, narrow vision: latches on to tiny data points
Compared to Opus 4.7, which the reviewer describes as numbers-anchored and context-aware, Opus 4.8 over-weights small signals and draws strong conclusions from them. The model sometimes claimed it hadn't searched GitHub or validated a bug, yet still asserted confident recommendations — a pattern the reviewer attributes to the model being 'overtuned' and having a narrow operational focus. That trade-off appears to favor speed and brevity at the cost of broader contextualization and accuracy.
— How I AI · 2026-05-29 · guest: — · [▶ 10:23](https://www.youtube.com/watch?v=h0gZf1hL4D4&t=623) · `pi-h0gZf1hL4D4-04`

### Ergonomics are strong: voice, speed, tooling, and new features
The reviewer praises Opus 4.8 for a pleasant, concise voice ("not an annoying girlfriend"), token efficiency, fast responses in fast mode, and good tool use. He also highlights new platform features: cloud code now supports dynamic workflows (hundreds of parallel subagents) and cloud.ai/co-work expose effort-control settings from low to max. These strengths make the model attractive for rapid prototyping and experiments, provided outputs are validated for accuracy.
— How I AI · 2026-05-29 · guest: — · [▶ 9:34](https://www.youtube.com/watch?v=h0gZf1hL4D4&t=574) · `pi-h0gZf1hL4D4-05`

### Fable 5 consumes roughly twice the tokens of other models
Anthropic states Fable uses about 2x the rate limits and tokens compared with other models, and the reviewer observed heavy token burn while running on the highest 'extra high' setting. They recommend 'high' as the practical sweet spot because running at maximum quality rapidly increases cost without guaranteed proportional benefit. This matters because teams must match model "effort level" to task complexity to control cloud expense and ROI.
— How I AI · 2026-06-10 · guest: — · [▶ 3:05](https://www.youtube.com/watch?v=IREnr4I89Ho&t=185) · `pi-IREnr4I89Ho-01`
— also: Every · 2026-06-10 · guest: Mike Krieger (Instagram co-founder) · [▶ 26:50](https://www.youtube.com/watch?v=XWpTgCvgYaE&t=1610) · `pi-XWpTgCvgYaE-05` (Krieger bluntly: "Fable is also very expensive" — per-run cost shapes adoption tiers and forces sticky model-choice defaults per surface to avoid runaway bills)
related: [Token-maxing is deliberate; they spend heavily for quality (in Agent engineering)](agent-engineering-patterns.md#token-maxing-is-deliberate-they-spend-heavily-for-quality) (Conductor's offsetting discipline) · [Inference/token bills will become a material company expense; track attribution (in Agent engineering)](agent-engineering-patterns.md#inferencetoken-bills-will-become-a-material-company-expense-track-attribution)

### Built for multi-day, long-running workflows but reliability still uneven
Fable 5 is designed to run "for days," spin up sub-agents, and support dynamic multi-agent workflows; the reviewer ran sessions lasting several hours and successfully kicked off multi-agent runs. However, they also experienced stalls and orchestration errors (one run stalled after ~3 hours) and suspect some issues lie in Claude Code rather than the model itself. So while the model's long-horizon capability is real and valuable for complex planning, teams must expect engineering work to make persistent agent runs robust.
— How I AI · 2026-06-10 · guest: — · [▶ 3:29](https://www.youtube.com/watch?v=IREnr4I89Ho&t=209) · `pi-IREnr4I89Ho-02`
related: [Excels one-shot but fails the last 10% consistently](#excels-one-shot-but-fails-the-last-10-consistently) (the same reliability wall, now visible in long-horizon mode)

### Outstanding vision and document formatting compared to peers
The reviewer repeatedly found Fable 5 strong on vision tasks and PDF/document formatting: in a simple handwriting worksheet test Fable produced clearer spacing and layout than Opus 4A, and it parsed and formatted documents reliably. These wins were consistent across other document/vision checks, suggesting the model is especially well-suited for UI/UX automation, PDF transformation, and any task where output layout quality matters. That makes Fable a good choice when visual fidelity or structured document generation is a priority.
— How I AI · 2026-06-10 · guest: — · [▶ 10:10](https://www.youtube.com/watch?v=IREnr4I89Ho&t=610) · `pi-IREnr4I89Ho-04`

### Built-in safety classifiers with graceful fallback to Opus 4.8
Fable includes classifiers for sensitive categories (cybersecurity, biology, chemistry) and implements a fallback that downgrades flagged requests to Opus 4.8 instead of outright blocking them; the API supports this parameter. Anthropic keeps 30-day retention logs for misuse detection and says 95% of sessions did not trigger fallbacks, and Mythos-level access remains restricted to vetted partners while Fable is generally available. Practically, that means enterprises get a safety-first fringe: high-capability outputs plus a controlled downgrade path that preserves continuity and pricing predictability.
— How I AI · 2026-06-10 · guest: — · [▶ 7:03](https://www.youtube.com/watch?v=IREnr4I89Ho&t=423) · `pi-IREnr4I89Ho-05`
related: [Frontier labs are carving out sensitive capabilities into restricted models (in AI agents)](ai-agents-and-applications.md#frontier-labs-are-carving-out-sensitive-capabilities-into-restricted-models) (Rosalind/Mythos restriction at the model-tier level)

### Naive self-play produces adversarial, useless tasks unless grounded and judged
When an LM is trained to both generate tasks (the conjecturer) and solve them (the solver), optimizing the generator for tasks the solver finds hard leads it to invent pathologically complex or irrelevant problems instead of useful curriculum. In a formal-math experiment on 3,000 Lean problems, vanilla self-play plateaued at the same RL baseline (~60% asymptote); the paper's Self-Guided Selfplay (SGS) fixes this by (1) generating problems conditioned on real unsolved targets and (2) adding a guide that scores whether synthetic tasks are actually related and not artificially convoluted, yielding a 7B model that matches much bigger baselines when given more compute. The key lesson: synthetic curriculum must be grounded in a target distribution and judged for relevance, not only hardness.
— Y Combinator · 2026-06-12 · guest: Luke Bailey, Arnab Matei, Robert George, Luke Orthwine (Channel AI) · [▶ 32:23](https://www.youtube.com/watch?v=3rWSvrFahIY&t=1943) · `pi-3rWSvrFahIY-02`

### Continuous 'hill climbing' on real product data is central to improving models.
GitHub/Microsoft treat iterative improvement—using thumbs-up/down, acceptance rates, evals and telemetry—as the core way to make models better in practice, not just lab benchmarks. They run weekly hill-climbing cycles, combine hard and soft metrics, and use techniques like frontier tuning on enterprise data (e.g., M365 assets) to get meaningful gains without huge bespoke effort. That makes personalization and model routing tractable and helps avoid wild cost increases by matching problem difficulty to model choice.
— Every · 2026-06-17 · guest: Kyle (GitHub) · [▶ 20:42](https://www.youtube.com/watch?v=OCEVqy8kl7Q&t=1242) · `pi-OCEVqy8kl7Q-04`
related: [Eval suites are the modern PRD for AI-driven features (in Agent engineering)](agent-engineering-patterns.md#eval-suites-are-the-modern-prd-for-ai-driven-features) (GitHub's hill-climbing is the product-cycle operationalization of the eval-as-PRD principle — evals encode success, telemetry drives weekly improvement) · [Naive self-play produces adversarial, useless tasks unless grounded and judged](#naive-self-play-produces-adversarial-useless-tasks-unless-grounded-and-judged) (SGS grounding addresses the same distribution-drift risk that product hill-climbing solves empirically via real-user signals)

### Anthropic secretly downgraded users and retained prompts, undermining trust
Buried policy items in Anthropic's rollout triggered developer revolt: the company retained prompts and context for at least 30 days and admitted it would silently downgrade users it suspected of doing frontier AI research. That practice — plus the claim Anthropic reserved the right to 'poison' or alter outputs — destroys product trust for enterprises and researchers, pushing firms toward on‑premise, open‑weight models (including Chinese offerings) and inviting legal and antitrust scrutiny.
— Peter H. Diamandis · 2026-06-18 · guest: Alex, Dave, Salim · [▶ 42:02](https://www.youtube.com/watch?v=BX9ofqxmeYw&t=2522) · `pi-BX9ofqxmeYw-03`
related: [Built-in safety classifiers with graceful fallback to Opus 4.8](#built-in-safety-classifiers-with-graceful-fallback-to-opus-48) (`pi-IREnr4I89Ho-05` presented Anthropic's 30-day retention as a safety feature; this podcast panel presents the same policy as an enterprise trust failure — opposing reads of the same Fable 5 rollout) · theme → [Tech frontier & abundance](tech-frontier-and-abundance.md) (US export control forcing Fable suspension, `pi-BX9ofqxmeYw-02`, is the regulatory side of the same governance story)

### GLM 5.2 approaches Opus/GPT‑5.5 intelligence on benchmarks
Independent benchmark suites (Frontier Sweep, Post-Train Bench, Sweep Marathon, Sweep Bench Pro) place GLM 5.2 near Opus and above Gemini/GPT-5.5 on many tests, especially in coding tasks. That positions GLM 5.2 as a frontier-class model you can actually inspect and run yourself, meaning teams can get similar capabilities without being locked into expensive commercial endpoints.
— How I AI · 2026-06-24 · guest: — · [▶ 3:18](https://www.youtube.com/watch?v=ZoBfQZ5utQk&t=198) · `pi-ZoBfQZ5utQk-01`
related: [Open weights + hosted routing makes GLM 5.2 dramatically cheap](#open-weights--hosted-routing-makes-glm-52-dramatically-cheap) · [Anthropic secretly downgraded users and retained prompts, undermining trust](#anthropic-secretly-downgraded-users-and-retained-prompts-undermining-trust) (vendor-lock and trust failures accelerate interest in open-weight alternatives like GLM 5.2)

### It's text‑only but has a huge context window and modern features
GLM 5.2 supports a 1,000,000-token context window and standard modern model ergonomics — streaming, function calls, context caching, structured output and MCPs — but it accepts only text input and output. That limits multimodal use cases (no images/vision), yet makes it highly suitable for long-document coding, retrieval, and autonomous agent workflows where huge context and tool calls matter.
— How I AI · 2026-06-24 · guest: — · [▶ 4:19](https://www.youtube.com/watch?v=ZoBfQZ5utQk&t=259) · `pi-ZoBfQZ5utQk-02`
related: [Built for multi-day, long-running workflows but reliability still uneven](#built-for-multi-day-long-running-workflows-but-reliability-still-uneven) (Fable 5 is the multimodal/vision option for long-horizon tasks; GLM 5.2 is the text-only/cost option for the same task class)

### Open weights + hosted routing makes GLM 5.2 dramatically cheap
By routing GLM 5.2 through a provider like OpenRouter and using self-hosted or alternative inference providers, the author ran ~6 million tokens for $3.36 (with ~72% cache rate), a fraction of Opus/GPT-5.5 costs. That cost delta plus the ability to inspect weights and swap vendors matters for teams worried about vendor lock-in and API pricing volatility.
— How I AI · 2026-06-24 · guest: — · [▶ 25:40](https://www.youtube.com/watch?v=ZoBfQZ5utQk&t=1540) · `pi-ZoBfQZ5utQk-03`
related: [Fable 5 consumes roughly twice the tokens of other models](#fable-5-consumes-roughly-twice-the-tokens-of-other-models) (opposite end of the cost spectrum — Fable 5 at 2× rate-limits vs. GLM 5.2 at ~$0.56/M tokens; both findings push teams to deliberate model-cost strategies) · theme → [Growth, GTM & pricing](growth-gtm-and-pricing.md) (token-economics implications)

### Strong practical performance but flaky on React/TypeScript generation
In demos GLM 5.2 quickly explored a codebase, produced well-formed HTML/CSS and even built a prioritized Sentry/Vercel bug-fix plan during a long run, showing good agentic and data-integration ability. However, it repeatedly struggled writing React/TypeScript code (needed iterations to compile), so while fine for front-end design, HTML, and long-running tooling tasks, teams relying heavily on React/TS should validate outputs carefully.
— How I AI · 2026-06-24 · guest: — · [▶ 22:40](https://www.youtube.com/watch?v=ZoBfQZ5utQk&t=1360) · `pi-ZoBfQZ5utQk-04`
related: [Excels one-shot but fails the last 10% consistently](#excels-one-shot-but-fails-the-last-10-consistently) (GLM 5.2's React/TS weakness and Opus 4.8's last-10% gap are different failure modes on the same benchmark-vs.-production-reliability theme)

## Open questions
- The same week Opus 4.8 set SWEBench Pro records (`pi-aMyubFA106U-01` in Tech frontier), this reviewer found it "100% made up things based on hypothesis not data." What's the bridge between benchmark scores and real iteration ROI? Benchmarks test one-shot completion; practitioners test loops — the datasets may be measuring different things.
- SGS's grounding fix (`pi-3rWSvrFahIY-02`) implies that today's RL-trained reasoning models face the same problem at scale: the harder the curriculum, the more likely the training signal drifts from real task distributions. Whether this surfaces as the "last 10%" gap seen in Opus 4.8/Fable 5 remains an open question.

## Related themes
- [AI agents & applications](ai-agents-and-applications.md) — parent theme; the production deployment context for these models
- [Tech frontier & abundance](tech-frontier-and-abundance.md) — the benchmark-win side of the same model releases (`pi-aMyubFA106U-01`)
- [Generative media & multimodal production](generative-media-and-multimodal.md) — the "last 10%" reliability wall recurs in video generation

## Source episodes
- [How I AI — No hype Claude Opus 4.8 review (2026-05-29)](../episodes/2026/2026-05-29--howiai--no-hype-claude-opus-4-8-review.md)
- [How I AI — Claude Fable 5 - is this Mythos model worth the wait? (2026-06-10)](../episodes/2026/2026-06-10--howiai--claude-fable-5-mythos-worth-the-wait.md)
- [Every — How Anthropic Uses Claude Fable 5 With Mike Krieger (2026-06-10)](../episodes/2026/2026-06-10--every--anthropic-uses-claude-fable-5-mike-krieger.md)
- [Y Combinator — 5 Papers That Show Where AI Research Is Heading Right Now (2026-06-12)](../episodes/2026/2026-06-12--yc--5-papers-show-where-ai-research-heading.md)
- [Every — How GitHub Deals with 17 Million Pull Requests a Month (2026-06-17)](../episodes/2026/2026-06-17--every--how-github-deals-17-million-pull-requests-month.md)
- [Peter H. Diamandis — SpaceX IPOs at $2.89T, US Govt Suspends Fable & Mythos 5 (2026-06-18)](../episodes/2026/2026-06-18--diamandis--spacex-ipo-289t-us-govt-suspends-fable-mythos.md)
- [How I AI — GLM 5.2 is SO GOOD (and almost free) (2026-06-24)](../episodes/2026/2026-06-24--howiai--glm-52-so-good-and-almost-free.md)
