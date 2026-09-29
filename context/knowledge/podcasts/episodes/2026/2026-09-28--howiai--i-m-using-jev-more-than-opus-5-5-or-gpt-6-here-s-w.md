# How I AI — I’m using Jev more than Opus 5.5 or GPT-6. Here’s why.

_source: youtube · channel: How I AI · published: 2026-09-28_
_video: https://www.youtube.com/watch?v=-KIBgpGA_XI_
_guests: —_
_captured: 2026-09-29 (Path A) · digest run 20260929T0405_

## Summary
The host explains why Jev, a Type Safe AI decision model, has become his preferred tool for production use: it makes cheap, fast, type-safe decisions instead of generating free text. He demonstrates Jev classifying and tagging large unstructured datasets (pull requests, emails, YouTube comments) at scale, then feeding those labels into stronger LLMs for analysis and generation. The throughline: use Jev for high-volume filtering, routing, and scoring, and combine it with generative models where deep analysis or content creation is needed.

## Insights extracted (4)

- `pi--KIBgpGA_XI-01` — **Jev is a very cheap, high-speed decision engine for inputs** → theme [Type-safe decision models (Jev)](../../themes/type-safe-decision-models.md)
  - detail: Jev charges mainly for input tokens (a million input tokens costs about $0.04) because it returns tiny, type-safe values instead of verbose text, making it far cheaper than standard LLMs for high-volume processing. The host ran ~1,700 pull requests and 17,000 pairwise comparisons in about two minutes for nine cents, and later ran ~200,000 binary classifications across 1,100 signals for roughly $4. That makes real-time loops and bulk classification practical where full-text models would be cost-prohibitive.
  - anchor: "نموذج اتخاذ القرار System One السريع، والرخيص، والذي لا يتحدث" · t=33 · [▶ 0:33](https://www.youtube.com/watch?v=-KIBgpGA_XI&t=33)

- `pi--KIBgpGA_XI-02` — **Jev returns type-safe choices, scores, or nulls instead of text** → theme [Type-safe decision models (Jev)](../../themes/type-safe-decision-models.md)
  - detail: Unlike conventional LLMs that output free-form text, Jev outputs predefined, type-safe values: a selected option, a numeric score, or a null/Boolean probability. That deterministic structure makes it easy to convert model outputs directly into code branches, filters, and routing rules (for example routing 'good' PRs to a reviewer or scoring errors 1–5). Because outputs are constrained, it's more controllable and reliable for programmatic decision-making.
  - anchor: "مع Jev، تستقبل نصوصًا وتحصل على قيم آمنة" · t=— · [▶ video](https://www.youtube.com/watch?v=-KIBgpGA_XI)

- `pi--KIBgpGA_XI-03` — **Jev excels at classifying and grouping huge unstructured datasets** → theme [Type-safe decision models (Jev)](../../themes/type-safe-decision-models.md)
  - detail: The host used Jev to tag and group thousands of items—pull requests, support tickets, chat threads—and found it reliably identifies related items, groups topics, and produces actionable distributions. Examples: running topic classification on a marketing site (112 statements) cost ~$0.011, classifying 1,700 PRs cost $0.09, and aggregating 1,100 signals involved >200k binary operations for about $4. Those concrete costs and speeds let engineering and product teams answer quantity-of-work questions that were previously impractical to obtain.
  - anchor: "أهم استخداماتي له هو تصنيف مجموعات ضخمة من البيانات غير المهيكلة" · t=— · [▶ video](https://www.youtube.com/watch?v=-KIBgpGA_XI)

- `pi--KIBgpGA_XI-04` — **Use Jev to tag/filter, then hand groups to stronger LLMs** → theme [Type-safe decision models (Jev)](../../themes/type-safe-decision-models.md)
  - detail: The recommended pattern is a two-stage pipeline: Jev does fast, cheap tagging and routing (filtering, grouping, scoring), and then a higher-capability model (e.g., Astra, Soul, Luna, Gemini) performs deeper analysis or generation on the selected subsets. The host implemented this for product-insight pipelines—Jev produced labeled clusters from ~1,100 signals, then a smarter model distilled trends and insights—yielding context-rich outputs that would have been expensive to generate directly from an LLM.
  - anchor: "ما أود فعله باستخدام Jev هو معالجة مجموعة كبيرة" · t=— · [▶ video](https://www.youtube.com/watch?v=-KIBgpGA_XI)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
