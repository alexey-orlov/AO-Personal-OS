# Opus 5.5 & GPT-6 Soul — launch-week hands-on reviews

_status: live theme — practitioner reviews from Opus 5.5's 2026-09-22/23 launch week, paired against GPT-6 Soul: verbosity fix, pricing, long-running agent reliability, SVG/frontend strength, safety posture, effort-level tuning_
_slug: opus-5-5-launch-reviews_
_updated: 2026-09-25 · 13 insights from 3 episodes · split from Model reviews & benchmarks, 2026-09-25_

## The throughline
Three sources over two days (2026-09-22/23) converge on Opus 5.5 as the release that fixes Opus 5's core complaint: reviewers who had stopped using Claude because of its verbose, hedging "slop" report it now responds directly and conversationally, while staying ~40% cheaper and ~30% faster than Opus 5 and matching Fable/Astra-class performance on many tasks. Four long-running agent scenarios (email triage, a backend feature, long-term research, computer use) all completed successfully across 25–82 steps, including correctly ignoring a prompt-injection attempt — though a second reviewer's similarly long creative runs hit timeouts, so long-horizon reliability is real but still brittle under strict time budgets. Reviewers repeatedly call out SVG and frontend-prototyping strength as a standout, and a safety posture that routes cyber/bio-risk queries to hardened fallback variants and will refuse or scold risky requests outright (e.g., declining to push a release to production). Effort-level tuning (low/medium/high) emerges as a genuine cost/speed/completeness dial rather than a single fixed quality setting. GPT-6 Soul shares the spotlight as the cheap, fast, readable-prose default for everyday knowledge work at roughly half Opus 5.5's cost — and, alongside Astra, is independently named the stronger choice for vector illustration/SVG work by one reviewer, directly contradicting a second reviewer's Opus-5.5-as-SVG-standout verdict from the same week (an open reconciliation). Token-efficiency and caching improvements across the releases are reported to meaningfully cut real running costs, converting previously marginal automations (extra code reviews, proactive PR checks) into routine practice.

## Insights

### Opus 5.5 is no longer the annoyingly verbose Claude
The reviewer stopped using Claude months ago because prior versions were verbose, rambling, and frustrating to converse with; Opus 5.5, by contrast, responds directly and conversationally across programming, cognitive work, and casual chat. He tested it in real tasks and liked the new voice and brevity, though he observed a caveat: for long tasks the model sometimes goes silent for 8–9 minutes, producing a perceived slowdown even when underlying performance is good. That change is significant because conversational fluency was the reason he abandoned Claude previously, and fixing it makes the model usable again for interactive workflows.
— How I AI · 2026-09-22 · guest: — · [▶ video](https://www.youtube.com/watch?v=zObYdmNB2Bo) · `pi-zObYdmNB2Bo-01`
— also: How I AI · 2026-09-22 · guest: — · [▶ 6:57](https://www.youtube.com/watch?v=LMT-bknLmNo&t=417) · `pi-LMT-bknLmNo-01` (same reviewer, a second same-day video: reinstated Claude into daily use, fewer unhelpful repetitions, calmer tone, high blind-eval scores)
related: theme → [Model reviews & benchmarks](model-reviews-and-benchmarks.md#opus-5s-verbosity-and-hedging-slop-harms-readability) (the pain point this release fixes, per the same reviewer's earlier complaint about Opus 5)

### Opus 5.5 matches Fable-level performance at lower cost
Anthropic markets Opus 5.5 as similar to Fable in many tasks while being ~40% cheaper than Opus 5 and about 30% faster; the reviewer cites Anthropic's internal benchmarks where Opus 5.5 outperforms Opus 5 and matches his favorite GPT-6 Astra. He also reports explicit pricing snippets from the platform and notes the model's lower per-token cost reduces the expense of long agent runs, making it a more economical option for sustained usage. That combination (speed + price + competitive benchmarks) is the main practical argument for trying Opus 5.5 in production-flavored workflows.
— How I AI · 2026-09-22 · guest: — · [▶ 2:09](https://www.youtube.com/watch?v=zObYdmNB2Bo&t=129) · `pi-zObYdmNB2Bo-02`

### Opus 5.5 reliably completes long-running multi-step agent tasks
He ran four long-running agent scenarios—email triage, building a backend feature, long-term research, and 'use the computer'—and reports all four succeeded, with the model executing between ~25 and 82 steps per prompt. In the inbox triage test it ignored a prompt-injection attempt and followed business rules, and in research it identified that 41 of 44 tickets came from one client and adjusted strategy accordingly. Those concrete successes show Opus 5.5 can be trusted for extended, stateful agent work where robustness to injection and stepwise reasoning matter.
— How I AI · 2026-09-22 · guest: — · [▶ video](https://www.youtube.com/watch?v=zObYdmNB2Bo) · `pi-zObYdmNB2Bo-03`
related: [Opus 5.5 can run long background creative jobs but sometimes times out](#opus-55-can-run-long-background-creative-jobs-but-sometimes-times-out) (same launch week, a contrasting data point — Every's testers hit timeout/time-management failures on the same class of long-running task)

### Opus 5.5 excels at frontend prototyping and SVG illustrations
The reviewer repeatedly used Opus 5.5 to redesign web pages, prototypes, dashboards, and interactive UI components, praising its visual output and compositional layout choices even when some minor alignment or copy roughness remained. Notably, the model can generate high-quality SVG assets (plants, characters) with stylistic consistency and fewer geometric errors than competing models; he calls SVG-generation a standout feature and the model his go-to for UI/front-end design tasks. This makes it particularly useful for product teams that want rapid, visually coherent prototypes and vector assets without manual illustration work.
— How I AI · 2026-09-22 · guest: — · [▶ video](https://www.youtube.com/watch?v=zObYdmNB2Bo) · `pi-zObYdmNB2Bo-04`
related: [Astra and GPT‑6/Soul outperform rivals on vector illustrations and SVGs](#astra-and-gpt6soul-outperform-rivals-on-vector-illustrations-and-svgs) (same reviewer's follow-up review names different winners for SVG work — worth reconciling)

### Opus 5.5 is conservative: it scolds or refuses risky requests
Anthropic emphasises safety for Opus 5.5—external reviewers rated it their strongest model for alignment—and the model routes cyber/bio-risk queries to hardened variants (e.g., Opus 48). The reviewer gives examples: the model refused to push a release to production when asked and gave a cautionary, 'don't ship' response, and it generally resists prompt-injection attempts. That safety posture reduces abuse risk but also results in a chastising, sometimes overprotective assistant tone that can frustrate power users who want unguarded help.
— How I AI · 2026-09-22 · guest: — · [▶ video](https://www.youtube.com/watch?v=zObYdmNB2Bo) · `pi-zObYdmNB2Bo-05`
— also: How I AI · 2026-09-22 · guest: — · [▶ video](https://www.youtube.com/watch?v=LMT-bknLmNo) · `pi-LMT-bknLmNo-04` (same reviewer's second same-day video adds the mechanism: Opus 5.5 drops back to Opus 4.8 or blocks the request outright on detected bio/cyber risk)

### Opus 5.5 competes with top-tier models like Fable and Astra
Multiple reviewers report that Opus 5.5 feels comparable to Fable 5.x and even Astra on many creative and 3D tasks, which led some evaluators to shift back from OpenAI Codex/Codex-derived workflows. Editors noted it delivers a Fable-like personality and strength on everyday creative work while being more cost-efficient, and some tests showed it matching or exceeding Fable on specific examples (3D detail, UI generation). This matters because a smaller vendor model entering parity with established leaders changes user choices and where teams invest time and tokens.
— Every · 2026-09-22 · guest: طارق (Anthropic) · [▶ 3:58](https://www.youtube.com/watch?v=3BAcNmTgSG4&t=238) · `pi-3BAcNmTgSG4-01`

### Effort-level tuning yields useful sketches and detailed outputs
Opus 5.5's 'effort' setting is a practical control: low effort produces quick, scan-friendly sketches (e.g., a landing page in ~2 minutes), medium effort is often the sweet spot for programming, and high effort adds precision at higher cost and latency. Reviewers emphasize that low effort leaves space for the human to iterate (like a pencil sketch), whereas higher effort adds tested details; knowing which level to pick is a skill that shifts cost/benefit calculations. That tunability changes workflow design because you can choose speed/roughness versus completeness per task.
— Every · 2026-09-22 · guest: طارق (Anthropic) · [▶ video](https://www.youtube.com/watch?v=3BAcNmTgSG4) · `pi-3BAcNmTgSG4-02`

### Opus 5.5 can run long background creative jobs but sometimes times out
Hands-on examples show Opus 5.5 is capable of extended background runs—Natasha reports a 5-hour single-run creation of an interactive HTML tutorial and Tyler described a multi-day game build—producing multi-file, interactive outputs with JS and shaders. However, testers also flagged time-management issues in benchmarks (the model "failed" some tests because it did not finish within the allotted window), so long-running autonomy can be brittle under strict test limits. Practically, Opus can handle ambitious end-to-end creative jobs, but reliability and timeout behavior matter for production automation.
— Every · 2026-09-22 · guest: طارق (Anthropic) · [▶ video](https://www.youtube.com/watch?v=3BAcNmTgSG4) · `pi-3BAcNmTgSG4-03`
related: [Opus 5.5 reliably completes long-running multi-step agent tasks](#opus-55-reliably-completes-long-running-multi-step-agent-tasks) (same launch week, the more favorable data point — a different reviewer's four long-running agent runs all succeeded)

### The model makes stylistic and product decisions like a creative director
Reviewers found Opus 5.5 often takes reasonable design decisions rather than only following instructions verbatim: it changed brand color choices in a PowerPoint task (a choice the reviewer preferred), produced coherent SVG styles, attractive local maps, and even invented playful game details (e.g., a 'sourdough bread' sword). Those choices read as useful editorial judgment—the model is suggesting brand- and UX-level defaults a human would accept or iterate on. That capability reduces micro-management and can accelerate creative workflows where tasteful defaults matter.
— Every · 2026-09-22 · guest: طارق (Anthropic) · [▶ 3:31](https://www.youtube.com/watch?v=3BAcNmTgSG4&t=211) · `pi-3BAcNmTgSG4-04`

### Lower cost and token efficiency change the ROI for routine tasks
Several contributors emphasize that Opus 5.5 is cheaper and more efficient enough that tasks you formerly questioned (extra code reviews, proactive PR checks, or heavier use of Cloud Tag) become worth doing more often. That shifts organizational behavior: making models faster/cheaper increases usage frequency and turns previously marginal automations into everyday steps. In short, cost efficiency converts potential features into everyday tooling because the price/per-token friction is lowered.
— Every · 2026-09-22 · guest: طارق (Anthropic) · [▶ video](https://www.youtube.com/watch?v=3BAcNmTgSG4) · `pi-3BAcNmTgSG4-05`
related: [Token efficiency and caching improvements cut real running costs](#token-efficiency-and-caching-improvements-cut-real-running-costs) (same launch week, a second reviewer's version of the same cost/efficiency argument, focused on caching mechanics rather than usage-frequency behavior)

### GPT‑6 Soul is the cheap, fast choice for readable productivity
GPT‑6 Soul is both the lowest‑cost option tested and one of the fastest, and the reviewer repeatedly favored Soul for readable outputs like PRDs and email replies. He notes Opus 5.5 costs roughly twice what Soul does, and Soul's concise, clear prose made it the winner for daily knowledge‑work and documentation tasks where clarity and token efficiency matter. The practical implication: for high-volume, everyday workflows you can save money and get better readable outputs by defaulting to Soul.
— How I AI · 2026-09-22 · guest: — · [▶ video](https://www.youtube.com/watch?v=LMT-bknLmNo) · `pi-LMT-bknLmNo-02`

### Token efficiency and caching improvements cut real running costs
A central engineering change across these releases is reduced context re‑sent and improved token efficiency: providers focused on lower cost, lower cached input sizes, speed, and token economy. The reviewer observed significant savings in his ChatPRD usage when the models reduced re‑sent context, and warns that failing to optimize your own caching will make models far more expensive to run. In short, model improvements alone save money, but application design (cache strategy) multiplies those savings.
— How I AI · 2026-09-22 · guest: — · [▶ video](https://www.youtube.com/watch?v=LMT-bknLmNo) · `pi-LMT-bknLmNo-03`

### Astra and GPT‑6/Soul outperform rivals on vector illustrations and SVGs
In tests of SVGs and vector character illustrations, Astra and GPT‑6 (including Soul) produced noticeably better art and cleaner SVG code than many competitors; the reviewer specifically calls out Astra and Soul as top performers for character vector work. He also notes a particular model (labelled H in his blind tests) made especially good SVGs and micro‑illustrations, while most models failed at simple video trimming tasks. Conclusion: for creative, SVG and illustration generation you should try Astra/Soul first.
— How I AI · 2026-09-22 · guest: — · [▶ video](https://www.youtube.com/watch?v=LMT-bknLmNo) · `pi-LMT-bknLmNo-05`
related: [Opus 5.5 excels at frontend prototyping and SVG illustrations](#opus-55-excels-at-frontend-prototyping-and-svg-illustrations) (a different reviewer's same-week review names Opus 5.5 as its own SVG standout — worth reconciling)

## Open questions
- Two reviewers in the same launch week disagree on which model wins SVG/vector-illustration work: one names Opus 5.5 (`pi-zObYdmNB2Bo-04`), the other names Astra/Soul (`pi-LMT-bknLmNo-05`). Different test sets or genuinely different strengths per illustration style? Watch for a tie-breaking third review.

## Related themes
- [Model reviews & benchmarks](model-reviews-and-benchmarks.md) — parent theme this split from, 2026-09-25
- [GPT-6 Astra — launch-week hands-on reviews](gpt-6-astra-launch-reviews.md) — the same launch-week-review-cluster pattern, split from the same parent two weeks earlier
- [Fable 5.1 — launch-week hands-on reviews](fable-5-1-launch-reviews.md) — the prior model-launch review cluster split from the same parent in the same maintenance pass
- [GPT-5.6 (Soul) vs Fable — task-fit model choice](gpt-5-6-soul-vs-fable-model-choice.md) — the standing task-fit ranking GPT-6 Soul continues here

## Source episodes
- [How I AI — I reviewed Opus 5.5 and GPT-6 Sol live - and the results surprised me (2026-09-22)](../episodes/2026/2026-09-22--howiai--opus-5-5-vs-gpt-6-sol-live-review.md)
- [Every — Live: NEW MODEL VIBE CHECK (2026-09-22)](../episodes/2026/2026-09-22--every--live-new-model-vibe-check.md)
- [How I AI — Claude is BACK with Opus 5.5 (2026-09-22)](../episodes/2026/2026-09-22--howiai--claude-is-back-with-opus-5-5.md)
