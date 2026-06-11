# Model reviews & benchmarks

_status: live theme — hands-on practitioner reviews and benchmark findings for frontier models_
_slug: model-reviews-and-benchmarks_
_updated: 2026-06-11 · 9 insights from 2 episodes · (split from ai-agents-and-applications, 2026-06-11)_

## The throughline
Two hands-on reviews — Opus 4.8 and Fable 5 — find the same wall from different angles. Opus 4.8 is strong on one-shot scaffolding and ergonomics (voice, token efficiency, platform tooling) but hallucinates under follow-up pressure, latches onto narrow signals with overconfidence, and fails the "last 10%" of real engineering tasks (bugs at edge cases, failure to integrate into live codebases). Fable 5 is purpose-built for long-horizon multi-agent runs and stands out on vision and document formatting, but burns ~2× the tokens and stalls after ~3 hours of continuous operation. Neither closes the gap between benchmark wins and production ROI; both carry the same operational lesson: match model to task type (Fable for long-form/vision, Opus/Sonnet for iterative spec work), validate outputs carefully on any accuracy-sensitive task, and never conflate one-shot success with real-world iteration reliability. These findings sit in deliberate tension with benchmark headlines elsewhere in the base: the same model releases that set leaderboard records are the ones this reviewer found "100% made up things based on hypothesis."

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

## Open questions
- The same week Opus 4.8 set SWEBench Pro records (`pi-aMyubFA106U-01` in Tech frontier), this reviewer found it "100% made up things based on hypothesis not data." What's the bridge between benchmark scores and real iteration ROI? Benchmarks test one-shot completion; practitioners test loops — the datasets may be measuring different things.

## Related themes
- [AI agents & applications](ai-agents-and-applications.md) — parent theme; the production deployment context for these models
- [Tech frontier & abundance](tech-frontier-and-abundance.md) — the benchmark-win side of the same model releases (`pi-aMyubFA106U-01`)
- [Generative media & multimodal production](generative-media-and-multimodal.md) — the "last 10%" reliability wall recurs in video generation

## Source episodes
- [How I AI — No hype Claude Opus 4.8 review (2026-05-29)](../episodes/2026/2026-05-29--howiai--no-hype-claude-opus-4-8-review.md)
- [How I AI — Claude Fable 5 - is this Mythos model worth the wait? (2026-06-10)](../episodes/2026/2026-06-10--howiai--claude-fable-5-mythos-worth-the-wait.md)
