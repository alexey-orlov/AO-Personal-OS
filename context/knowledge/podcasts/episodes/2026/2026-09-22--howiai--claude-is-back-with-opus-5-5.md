# How I AI — Claude is BACK with Opus 5.5

_source: youtube · channel: How I AI · published: 2026-09-22_
_video: https://www.youtube.com/watch?v=zObYdmNB2Bo_
_guests: —_
_captured: 2026-09-24 (Path A) · digest run 20260924T0406_

## Summary
The presenter reviews Anthropic's Opus 5.5 (Claude), arguing it fixes the main UX problem—being "annoying"—while delivering comparable or better performance than prior Claude releases at lower cost. He demonstrates that Opus 5.5 is fast, cheaper, capable in long-running agent tasks and exceptional for frontend prototyping and SVG generation, but remains conservative/safety-first and occasionally scolds or refuses risky user requests.

## Insights extracted (5)

- `pi-zObYdmNB2Bo-01` — **Opus 5.5 is no longer the annoyingly verbose Claude** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: The reviewer stopped using Claude months ago because prior versions were verbose, rambling, and frustrating to converse with; Opus 5.5, by contrast, responds directly and conversationally across programming, cognitive work, and casual chat. He tested it in real tasks and liked the new voice and brevity, though he observed a caveat: for long tasks the model sometimes goes silent for 8–9 minutes, producing a perceived slowdown even when underlying performance is good. That change is significant because conversational fluency was the reason he abandoned Claude previously, and fixing it makes the model usable again for interactive workflows.
  - anchor: "لم يعد مزعجًا بعد الآن، أو على الأقل أصبح" · t=None · [▶ video](https://www.youtube.com/watch?v=zObYdmNB2Bo)

- `pi-zObYdmNB2Bo-02` — **Opus 5.5 matches Fable-level performance at lower cost** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: Anthropic markets Opus 5.5 as similar to Fable in many tasks while being ~40% cheaper than Opus 5 and about 30% faster; the reviewer cites Anthropic's internal benchmarks where Opus 5.5 outperforms Opus 5 and matches his favorite GPT-6 Astra. He also reports explicit pricing snippets from the platform and notes the model's lower per-token cost reduces the expense of long agent runs, making it a more economical option for sustained usage. That combination (speed + price + competitive benchmarks) is the main practical argument for trying Opus 5.5 in production-flavored workflows.
  - anchor: "بتكلفة أقل بنحو 40%من أوبوس 5" · t=129 · [▶ 2:09](https://www.youtube.com/watch?v=zObYdmNB2Bo&t=129)

- `pi-zObYdmNB2Bo-03` — **Opus 5.5 reliably completes long-running multi-step agent tasks** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: He ran four long-running agent scenarios—email triage, building a backend feature, long-term research, and 'use the computer'—and reports all four succeeded, with the model executing between ~25 and 82 steps per prompt. In the inbox triage test it ignored a prompt-injection attempt and followed business rules, and in research it identified that 41 of 44 tickets came from one client and adjusted strategy accordingly. Those concrete successes show Opus 5.5 can be trusted for extended, stateful agent work where robustness to injection and stepwise reasoning matter.
  - anchor: "نجحت المهام الوكالية الأربع طويلة الأمد التي كان عليّ القيام بها" · t=None · [▶ video](https://www.youtube.com/watch?v=zObYdmNB2Bo)

- `pi-zObYdmNB2Bo-04` — **Opus 5.5 excels at frontend prototyping and SVG illustrations** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: The reviewer repeatedly used Opus 5.5 to redesign web pages, prototypes, dashboards, and interactive UI components, praising its visual output and compositional layout choices even when some minor alignment or copy roughness remained. Notably, the model can generate high-quality SVG assets (plants, characters) with stylistic consistency and fewer geometric errors than competing models; he calls SVG-generation a standout feature and the model his go-to for UI/front-end design tasks. This makes it particularly useful for product teams that want rapid, visually coherent prototypes and vector assets without manual illustration work.
  - anchor: "هذه النماذج الجديدة يمكنها إنشاء ملفات SVG وهي جيدة جداً." · t=None · [▶ video](https://www.youtube.com/watch?v=zObYdmNB2Bo)

- `pi-zObYdmNB2Bo-05` — **Opus 5.5 is conservative: it scolds or refuses risky requests** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: Anthropic emphasises safety for Opus 5.5—external reviewers rated it their strongest model for alignment—and the model routes cyber/bio-risk queries to hardened variants (e.g., Opus 48). The reviewer gives examples: the model refused to push a release to production when asked and gave a cautionary, 'don't ship' response, and it generally resists prompt-injection attempts. That safety posture reduces abuse risk but also results in a chastising, sometimes overprotective assistant tone that can frustrate power users who want unguarded help.
  - anchor: "إنه الأقوى لديهم من حيث التوافق." · t=None · [▶ video](https://www.youtube.com/watch?v=zObYdmNB2Bo)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
