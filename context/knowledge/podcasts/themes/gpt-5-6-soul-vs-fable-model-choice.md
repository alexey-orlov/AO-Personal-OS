# GPT-5.6 (Soul) vs Fable — task-fit model choice

_status: live theme — four independent practitioner reviews converge on the same task-fit verdict between OpenAI's GPT-5.6 ("Soul") and Anthropic's Fable 5_
_slug: gpt-5-6-soul-vs-fable-model-choice_
_updated: 2026-07-20 · 14 insights from 4 episodes · (split from model-reviews-and-benchmarks, 2026-07-11)_

## The throughline
Four independent reviewers, testing across two weeks, triangulate on the same verdict: GPT-5.6 (OpenAI's "Soul") is the practical daily default — fast, steerable, cheap ($5/$30 per million tokens vs. Fable's $10/$50), and strong at concise writing, prototyping, browser automation, visual design, and reliable agentized knowledge-work loops — while Fable retains a real, now triple-confirmed edge on the hardest senior-engineer coding rewrites (~90/100 vs. 56/100 on the same benchmark, reproduced by a third practitioner independently). A fourth, design-focused review corroborates the pattern visually: GPT-5.6 took creative risks (semantic color coding, better "theory of mind" for the viewer) that Fable, Claude, Tara, Luna, and Sonnet did not, converging instead on dense, conservative outputs. The two-sided read on Fable sharpens across all four reviews: technically precise and exhaustive, but built "for agents by agents" — pedantic, over-engineered, and hard for humans to collaborate with directly, the same verbosity complaint the AI & PM craft theme documents for spec-writing. OpenAI's strategic bet reads as a deliberate contrast to Anthropic's: rather than a single enormous, high-latency model, Soul is smaller but heavily post-trained for ergonomics, speed, and cost — a bet that steerability and cheap iteration beat peak one-shot capability for most day-to-day work.

## Insights

### GPT‑5.6 is A‑tier: fast, inexpensive, and highly usable
After a month of use the reviewer reports 5.6 is the default model for almost everything because it balances speed, cost, and capability. It consistently delivers usable outputs across coding, writing, and design without long waits or high token costs, making it practical for day‑to‑day workflows and collaboration. The conclusion is that 5.6 is the pragmatic sweet spot for most users who value ergonomics over ultimate raw power.
— Every · 2026-07-09 · guest: — · [▶ 2:47](https://www.youtube.com/watch?v=13tHN3iP5kQ&t=167) · `pi-13tHN3iP5kQ-01`
related: theme → [Model reviews & benchmarks](model-reviews-and-benchmarks.md) ("No single model is best — strengths depend on the task" — 5.6 is this reviewer's pick for the "default, most tasks" slot in that broader framework)

### Fable outperforms 5.6 on complex senior‑engineer coding tasks
On a senior‑engineer benchmark that asks models to rewrite a messy codebase from first principles, GPT‑5.6 scored 56/100 versus Fable's 91/100, and even 5.5 had runs as high as 62.5. In practice 5.6 can rewrite codebases effectively but tends to produce more complicated abstractions, whereas Fable produces simpler, more senior‑engineer‑level architectures. That means use 5.6 for most coding, but switch to Fable (or use Fable with 5.6 as a subagent) for the biggest, hardest rethinks.
— Every · 2026-07-09 · guest: — · [▶ 4:04](https://www.youtube.com/watch?v=13tHN3iP5kQ&t=244) · `pi-13tHN3iP5kQ-02`
— also: Every · 2026-07-09 · guest: Dom/Roman/Kyle Cobber (OpenAI), Claire Vo · [▶ 35:28](https://www.youtube.com/watch?v=g3a4qyFfSho&t=2128) · `pi-g3a4qyFfSho-04` (independent corroboration on the same benchmark, same 56/100 score for 5.6 vs. ~90/100 for Fable — third source now confirms this exact gap)

### GPT‑5.6 is unusually strong at concise, practical writing
The reviewer finds 5.6 superior to both 4.8 and Fable for one‑shot, pragmatic writing: emails, marketing copy, taglines, and short reflections. Where Fable and 4.8 tend to over‑explain or produce florid, long outputs, 5.6 gives clear, to‑the‑point text quickly — enabling reliable single‑prompt marketing emails and fast compositional workflows. That speed and brevity makes it a go‑to for daily knowledge‑work communication.
— Every · 2026-07-09 · guest: — · [▶ 6:31](https://www.youtube.com/watch?v=13tHN3iP5kQ&t=391) · `pi-13tHN3iP5kQ-03`
related: theme → [AI & the PM craft](ai-and-the-pm-craft.md) — Fable overthinks like a 'seasoned engineer,' producing unreadable specs (same verbosity complaint about Fable, opposite finding for 5.6 on the same writing task class)

### 5.6 makes reliable agentized knowledge‑work automation practical
Because 5.6 is smart, fast, and a good writer, the reviewer uses it as the intelligence inside systems that automate rote knowledge tasks — e.g., turning emails into action cards (the Tend app), summarizing meeting transcripts, tracking meals from photos, and managing marketplace purchases. The model can run in a loop as a subagent, surfacing decisions for a human to approve, which lets people 'work on the system' instead of doing every task manually. This is presented as a step change: 5.6 is the first model the reviewer trusts to reliably run those end‑to‑end workflows.
— Every · 2026-07-09 · guest: — · [▶ 9:12](https://www.youtube.com/watch?v=13tHN3iP5kQ&t=552) · `pi-13tHN3iP5kQ-04`

### OpenAI appears to favor smaller, well post‑trained models over giant models
The reviewer frames 5.6 (Soul) as a strategic contrast to Fable: rather than being enormous and slow, Soul seems smaller but heavily post‑trained to maximize ergonomics, speed, and cost‑effectiveness. Fable shows the 'big model smell'—greater capability at the absolute top end but higher latency and cost—whereas 5.6 is tuned for collaboration and everyday use. The implication is that for most users and most tasks this design choice is a smarter product bet.
— Every · 2026-07-09 · guest: — · [▶ 12:31](https://www.youtube.com/watch?v=13tHN3iP5kQ&t=751) · `pi-13tHN3iP5kQ-05`
related: theme → [Model reviews & benchmarks](model-reviews-and-benchmarks.md) (Fable 5 consumes roughly twice the tokens of other models — the "big model smell" cost/latency tradeoff is the same token-burn finding from a different practitioner)

### GPT‑5.6 plus the merged Codex app becomes a knowledge‑work default
The hosts call GPT‑5.6 (Soul) combined with the Codex desktop experience the new "gold standard" for knowledge work because it balances power, speed, and usability. They say it replaced most of their daily workflows — writing, design, coding, and routine office automations — because it's fast to iterate with and returns usable outputs quickly, which reduces friction for non‑specialists. That matters because tool adoption depends more on steady productivity gains than peak technical capability.
— Every · 2026-07-09 · guest: Dom/Roman/Kyle Cobber (OpenAI), Claire Vo · [▶ 2:52](https://www.youtube.com/watch?v=g3a4qyFfSho&t=172) · `pi-g3a4qyFfSho-01`
related: [GPT‑5.6 is A‑tier: fast, inexpensive, and highly usable](#gpt-56-is-atier-fast-inexpensive-and-highly-usable) (same "default model" claim, now with the merged Codex app as the delivery vehicle) · [GPT-5.6 'Soul' is the author's preferred model overall](#gpt-56-soul-is-the-authors-preferred-model-overall) (third independent source preferring 5.6/Soul for everyday work)

### GPT‑5.6 prioritizes speed, steerability, and revision ergonomics
Reviewers repeatedly emphasized that 5.6 is noticeably fast and "steerable": you can make many rapid iterations, tell the model what's off, and get a high‑quality second pass quickly. The team cited workflows that went through dozens of drafts in a short span (24 drafts of a vibe check) and praised the model for maintaining context while applying corrections, which keeps momentum in collaborative work. This matters because cheap, reliable revision often beats stronger one‑shot intelligence in day‑to‑day productivity.
— Every · 2026-07-09 · guest: Dom/Roman/Kyle Cobber (OpenAI), Claire Vo · [▶ 4:40](https://www.youtube.com/watch?v=g3a4qyFfSho&t=280) · `pi-g3a4qyFfSho-03`
related: [GPT‑5.6 is unusually strong at concise, practical writing](#gpt-56-is-unusually-strong-at-concise-practical-writing) (same ergonomics-over-raw-power thesis, from a different reviewer)

### GPT-5.6 'Soul' is the author's preferred model overall
After blind, repeatable bench tests across PRDs, prototyping, code debugging, and agentic voice, the reviewer gave Soul the highest 'taste' score using a 70/30 human-to-LLM weighting. Soul consistently produced the outputs the reviewer found most useful and inspiring across dozens of evals, and she reports favoring Soul's outputs by a wide margin in full-fidelity prototype tasks. This preference wasn't just subjective fluff — it was the outcome of a structured evaluation harness and manual grading of artifacts.
— How I AI · 2026-07-09 · guest: — · [▶ 7:40](https://www.youtube.com/watch?v=gAWbvEwUoiI&t=460) · `pi-gAWbvEwUoiI-01`
related: theme → [Model reviews & benchmarks](model-reviews-and-benchmarks.md) (How I AI bench: frozen inputs, blind human scoring, plus LLM judges — same reviewer's structured bench methodology from an earlier run; "No single model is best" extends that task-fit lineup)

### Soul is materially cheaper than Fable per token
The presenter lists API pricing: Soul charges $5 per million input tokens and $30 per million output tokens, while Fable is about $10 input and $50 output per million. That price gap makes Soul substantially more affordable for heavy prototyping and production usage, and could affect how vendors include models in subscription tiers. Lower cost plus comparable or better performance changes the practical calculus for teams choosing a default model.
— How I AI · 2026-07-09 · guest: — · [▶ 2:17](https://www.youtube.com/watch?v=gAWbvEwUoiI&t=137) · `pi-gAWbvEwUoiI-02`
related: theme → [Model reviews & benchmarks](model-reviews-and-benchmarks.md) (Fable 5 consumes roughly twice the tokens of other models — Krieger's "very expensive" corroboration now has explicit per-token pricing behind it; Open weights + hosted routing makes GLM 5.2 dramatically cheap — Soul sits between GLM 5.2's near-free routing and Fable's premium pricing)

### Fable is technically precise but poor at human collaboration
The reviewer describes Fable as highly intelligent and good at security/technical tasks, but writes that its outputs are pedantic, inscrutable, and geared 'for agents by agents,' which makes it hard to collaborate with as a human product worker. She gives examples where Fable produced hardened architectures and tool-calling loops that only worked with GPT-5.5, blocking broader integration and iteration. In short, Fable excels when you need deterministic, exhaustive technical analysis, but struggles when you need pragmatic, user-focused product work.
— How I AI · 2026-07-09 · guest: — · [▶ 20:00](https://www.youtube.com/watch?v=gAWbvEwUoiI&t=1200) · `pi-gAWbvEwUoiI-03`
— also: Every · 2026-07-20 · guest: — · [▶ 2:53](https://www.youtube.com/watch?v=bghV183c418&t=173) · `pi-bghV183c418-03` (independent corroboration on a design task: Fable's dense wireframes read as optimized for model-to-model handoffs rather than direct human consumption — same "for agents by agents" verdict, now on visual output)
related: theme → [AI & the PM craft](ai-and-the-pm-craft.md) — Fable overthinks like a 'seasoned engineer,' producing unreadable specs (same complaint — dense, agent-oriented output that fails human-facing product work)

### Soul delivers more usable, opinionated end-to-end prototypes and designs
Across multiple prototype types (dense ops dashboards, dev tools, creative websites, habit trackers, and a gamified homework app), Soul produced cleaner visual hierarchy, semantic color choices, and more functional, click-through-ready designs than Fable. The reviewer repeatedly preferred Soul's opinionated aesthetic and functionality because it yielded actionable prototypes and inspiration rather than generic wireframes. She also used Soul to rebuild her chat PRD into a comprehensive 0→1 prototype and found the result easier to parse and iterate on.
— How I AI · 2026-07-09 · guest: — · [▶ 10:29](https://www.youtube.com/watch?v=gAWbvEwUoiI&t=629) · `pi-gAWbvEwUoiI-04`
related: theme → [AI & the PM craft](ai-and-the-pm-craft.md) — Prototypes are replacing PRDs as the primary communication artifact (Soul's opinionated prototypes are exactly the artifact type that craft theme argues now drives alignment) · [Risk-taking model produced more distinctive, usable designs](#risk-taking-model-produced-more-distinctive-usable-designs) (independent corroboration on a new design domain)

### Risk-taking model produced more distinctive, usable designs
GPT-5.6 diverged from the crowd and produced visually distinct, more usable designs—semantic color coding, clearer red/yellow meanings, and more white space—whereas Fable, Tara, Luna, and Sonnet converged on similar dark-mode, dense wireframes. The speaker judged GPT-5.6 superior because its design was easier to parse at-a-glance, fulfilling the prompt goal of immediate comprehension. That matters because conservative model behavior can produce functional but indistinguishable outputs; creative risk-taking yields clarity and recognizability.
— Every · 2026-07-20 · guest: — · [▶ 1:21](https://www.youtube.com/watch?v=bghV183c418&t=81) · `pi-bghV183c418-01`
related: [Soul delivers more usable, opinionated end-to-end prototypes and designs](#soul-delivers-more-usable-opinionated-end-to-end-prototypes-and-designs) (independent corroboration on a new design domain — data/timeline visualization — of the same GPT-5.6/Soul-beats-Fable-on-design pattern)

### GPT-5.6 demonstrates stronger theory-of-mind for user needs
Evaluators found GPT-5.6 better at anticipating the human reader's goal—e.g., making a timeline of Israel and Judah instantly readable—claiming it showed a 'better theory of mind' about what a user needs from a visual. This translated to layout, color semantics, and information density choices that prioritized immediate human understanding. The implication is that models tuned for human-facing outputs can be more effective collaborators than those optimized for internal model workflows.
— Every · 2026-07-20 · guest: — · [▶ 2:47](https://www.youtube.com/watch?v=bghV183c418&t=167) · `pi-bghV183c418-02`

### Models carry recognizable stylistic fingerprints that affect outputs
The speakers could immediately identify Claude's recurring visual motif—'burnt orange glowy suns'—and said they penalized Claude for predictable styling that didn't fit the brief. That shows models develop stable aesthetic habits which can bias results away from the user's needs unless explicitly corrected in prompts. For designers, that means model selection and prompt specification must account for each model's signature tendencies.
— Every · 2026-07-20 · guest: — · [▶ 1:35](https://www.youtube.com/watch?v=bghV183c418&t=95) · `pi-bghV183c418-04`

## Related themes
- [Model reviews & benchmarks](model-reviews-and-benchmarks.md) — parent theme; the Opus 4.8/Fable-5-initial/GLM-5.2/Sonnet-5 reviews this cluster split from
- [AI & the PM craft](ai-and-the-pm-craft.md) — the verbosity/spec-writing complaint about Fable this cluster corroborates from the coding/prototyping side

## Source episodes
- [Every — I Tested GPT‑5.6 Sol for a Month (2026-07-09)](../episodes/2026/2026-07-09--every--i-tested-gpt-5-6-sol-for-a-month.md)
- [Every — GPT-5.6 SOL: THE GOLD STANDARD FOR KNOWLEDGE WORK (2026-07-09)](../episodes/2026/2026-07-09--every--gpt-5-6-sol-gold-standard-knowledge-work.md)
- [How I AI — GPT-5.6 Sol: Better AND cheaper than Fable (2026-07-09)](../episodes/2026/2026-07-09--howiai--gpt-5-6-sol-better-and-cheaper-than-fable.md)
- [Every — Why GPT-5.6 Beats Fable, Claude & Sonnet on Design (Taking Risks Wins) (2026-07-20)](../episodes/2026/2026-07-20--every--why-gpt-56-beats-fable-claude-sonnet-design.md)
