# Type-safe decision models (Jev)

_status: live theme — Jev, a cheap, high-speed model that returns type-safe choices/scores/nulls instead of free text, and the tag-then-hand-off pipeline pattern_
_slug: type-safe-decision-models_
_updated: 2026-10-01 · 14 insights from 4 episodes

## The throughline
Two same-day episodes (a How I AI hands-on and an a16z conversation with Type Safe's Diogo) describe Jev as a different tool class from chat LLMs: it emits typed values (an option, a score, a null/Boolean probability) rather than prose, so input-token pricing dominates (~$0.04 per million input tokens as reported), and it is positioned as a reliable classifier/router feeding stronger models. Synthesis (inferred): the pitch is reliability and automatable production work rather than benchmark scores.

## Insights

### Jev is a very cheap, high-speed decision engine for inputs
Jev charges mainly for input tokens (a million input tokens costs about $0.04) because it returns tiny, type-safe values instead of verbose text, making it far cheaper than standard LLMs for high-volume processing. The host ran ~1,700 pull requests and 17,000 pairwise comparisons in about two minutes for nine cents, and later ran ~200,000 binary classifications across 1,100 signals for roughly $4. That makes real-time loops and bulk classification practical where full-text models would be cost-prohibitive.
— How I AI · 2026-09-28 · guest: — · [▶ 0:33](https://www.youtube.com/watch?v=-KIBgpGA_XI&t=33) · `pi--KIBgpGA_XI-01`

### Jev returns type-safe choices, scores, or nulls instead of text
Unlike conventional LLMs that output free-form text, Jev outputs predefined, type-safe values: a selected option, a numeric score, or a null/Boolean probability. That deterministic structure makes it easy to convert model outputs directly into code branches, filters, and routing rules (for example routing 'good' PRs to a reviewer or scoring errors 1–5). Because outputs are constrained, it's more controllable and reliable for programmatic decision-making.
— How I AI · 2026-09-28 · guest: — · [▶ video](https://www.youtube.com/watch?v=-KIBgpGA_XI) · `pi--KIBgpGA_XI-02`

### Jev excels at classifying and grouping huge unstructured datasets
The host used Jev to tag and group thousands of items—pull requests, support tickets, chat threads—and found it reliably identifies related items, groups topics, and produces actionable distributions. Examples: running topic classification on a marketing site (112 statements) cost ~$0.011, classifying 1,700 PRs cost $0.09, and aggregating 1,100 signals involved >200k binary operations for about $4. Those concrete costs and speeds let engineering and product teams answer quantity-of-work questions that were previously impractical to obtain.
— How I AI · 2026-09-28 · guest: — · [▶ video](https://www.youtube.com/watch?v=-KIBgpGA_XI) · `pi--KIBgpGA_XI-03`

### Use Jev to tag/filter, then hand groups to stronger LLMs
The recommended pattern is a two-stage pipeline: Jev does fast, cheap tagging and routing (filtering, grouping, scoring), and then a higher-capability model (e.g., Astra, Soul, Luna, Gemini) performs deeper analysis or generation on the selected subsets. The host implemented this for product-insight pipelines—Jev produced labeled clusters from ~1,100 signals, then a smarter model distilled trends and insights—yielding context-rich outputs that would have been expensive to generate directly from an LLM.
— How I AI · 2026-09-28 · guest: — · [▶ video](https://www.youtube.com/watch?v=-KIBgpGA_XI) · `pi--KIBgpGA_XI-04`

### AI should expand what software can do, not just write the same code faster
Diogo argues that tools like Codex and Cloud Code generate code that looks like what humans already wrote, but they don't extend the expressive power of programs. Jev is designed to be embedded as a new kind of feature — a probabilistic, stateful layer you include in your application that accepts natural-language intent and makes decisions with confidence levels. That shift lets developers automate tasks that previously were too fuzzy for programmatic automation, turning language and intent into actionable program behavior.
— a16z · 2026-09-28 · guest: Diogo (Type Safe) · [▶ video](https://www.youtube.com/watch?v=Ut3LOjKNJaE) · `pi-Ut3LOjKNJaE-01`

### Reliability and predictable behavior are the product's core design constraints
Type Safe delayed release and tuned Jev specifically for reliability because usable automation must be trustworthy in production. Diogo breaks reliability into dimensions — availability (SLA), determinism (consistent results for same inputs where required), and robustness (intelligence behaves usefully each time) — and aims for levels of reliability that let developers program against Jev without constantly falling back to human oversight. This focus is what distinguishes Jev from many early AI features that were flashy but fragile when embedded in workflows.
— a16z · 2026-09-28 · guest: Diogo (Type Safe) · [▶ video](https://www.youtube.com/watch?v=Ut3LOjKNJaE) · `pi-Ut3LOjKNJaE-02`

### Measure AI success by how much real production work it automates
Instead of optimizing for human evaluation scores (the RLHF-era metric), Diogo says the right metric is how much real, productive work the system can automate in the field. He cites repeated industry failures — e.g., customer-support automation that looks good in demos but fails on long-tail exceptions — to argue that production automation (password resets vs unique cases) is the true yardstick. Jev is built to raise that practical automation rate by making probabilistic decisions inside applications and surfacing confidence, so developers can compose reliable automation.
— a16z · 2026-09-28 · guest: Diogo (Type Safe) · [▶ video](https://www.youtube.com/watch?v=Ut3LOjKNJaE) · `pi-Ut3LOjKNJaE-03`

### This is a practical revival of probabilistic / neuro-symbolic programming
Diogo frames Jev as part of a renewed era of probabilistic programming: language reasoning tied to state machines and typed program structures that can make choices with statistical confidence. He notes his cofounder Eric's background in these ideas and predicts this approach will let AI act like a 'smart database' or stateful service rather than a pure text generator. The consequence is new guarantees and composability for building systems that must balance speed, cost, and correctness.
— a16z · 2026-09-28 · guest: Diogo (Type Safe) · [▶ video](https://www.youtube.com/watch?v=Ut3LOjKNJaE) · `pi-Ut3LOjKNJaE-04`

### Decisions API adds rapid decision-making models with vision
The Decisions API is a low-latency, constrained-output model (positioned as a Jev-style competitor) that includes vision, enabling very fast classification/selection tasks. The presenter used it to scan ~100 video frames and pick non-awkward thumbnail frames in under ten seconds and to classify a hot dog image with instant high confidence, illustrating real-world automation wins for media pipelines and UX flows. Because it pairs speed with visual input, it can be slotted into product stacks where quick, deterministic choices matter.
— How I AI · 2026-10-01 · guest: Kath (product lead, Sites) · [▶ 15:06](https://www.youtube.com/watch?v=pJNM1z9l5mU&t=906) · `pi-pJNM1z9l5mU-04`

### Jev is extremely fast and nearly free for real-time use
Jev's main practical advantage is latency and cost: it responds almost instantly and demo runs cost cents rather than dollars. John and Claire recount processing >20,000 records and even a ~5GB JSON job that cost only a few dozen cents, which makes exploratory, iterative workflows feasible where traditional LLM inference would be prohibitively slow or expensive. That change in economics unlocks interactive, real-time features and experimentation that were previously impractical.
— How I AI · 2026-10-01 · guest: John Lindqvist · [▶ video](https://www.youtube.com/watch?v=dAIIaepNhQM) · `pi-dAIIaepNhQM-01`

### Jev outputs structured, typed decisions instead of freeform text
Unlike general-purpose LLMs that return unstructured text, Jev returns constrained, typed decisions and discrete outputs (choices, function calls, classifications). That makes integration with APIs and deterministic workflows much easier because the model's output can be validated, matched to functions, and used directly as program inputs without heavy postprocessing. The result is safer, more predictable automation for UIs and backend orchestration.
— How I AI · 2026-10-01 · guest: John Lindqvist · [▶ video](https://www.youtube.com/watch?v=dAIIaepNhQM) · `pi-dAIIaepNhQM-02`

### Cheap large-scale data matching and deduplication becomes practical
John demonstrates using Jev to match and merge large datasets (tens of thousands to hundreds of thousands of records) in seconds for cents, with configurable confidence thresholds. That capability turns previously avoided tasks—like cleaning millions of JSON records or deduplicating contacts—into quick, iterative analyses you can afford to run and sample-validate with an LLM afterwards. It directly reduces engineering friction for data hygiene, PR triage, and bulk operations.
— How I AI · 2026-10-01 · guest: John Lindqvist · [▶ 3:19](https://www.youtube.com/watch?v=dAIIaepNhQM&t=199) · `pi-dAIIaepNhQM-03`

### Real-time voice-driven orchestration and presentation coaching
Jev can process streaming, unstructured voice input and map it to structured actions in real time—examples include a live todo list that classifies utterances into add/delete/priority actions and a presentation coach that tracks covered bullet points as you speak. Because the model decides when it has 'enough' to call a function, it supports always-on, low-latency workflows (live dictation, in-conference tooling) that keep users on task. This reduces friction for natural input modalities and enables interfaces that previously required heavy UX engineering.
— How I AI · 2026-10-01 · guest: John Lindqvist · [▶ video](https://www.youtube.com/watch?v=dAIIaepNhQM) · `pi-dAIIaepNhQM-04`

### Speed yields new decision-tree workflows — 10x faster, 4x cheaper
In game demos (chess/Tetris) Jev was reported ~10x faster per move and ~4x cheaper than a conventional LLM pipeline, showing that speed can be the difference between interactive and unusable experiences. That performance opens up multi-step decision architectures where you can quickly narrow options with Jev and call more expensive models only for refinement, enabling hybrid chains that balance cost, latency, and intelligence. Fast decision models thus change product design trade-offs around real-time interactivity.
— How I AI · 2026-10-01 · guest: John Lindqvist · [▶ video](https://www.youtube.com/watch?v=dAIIaepNhQM) · `pi-dAIIaepNhQM-05`

## Related themes
- [Agent engineering & production infra](agent-engineering-patterns.md) — reliability and predictable behaviour as production constraints
- [Model reviews & benchmarks](model-reviews-and-benchmarks.md) — practitioner model comparisons (Jev is reviewed against Opus 5.5 / GPT-6)
- [Eval design & agentic evaluation practice](eval-design-and-practice.md) — measuring automated production work rather than human-preference scores

## Source episodes
- [How I AI — I’m using Jev more than Opus 5.5 or GPT-6. Here’s why. (2026-09-28)](../episodes/2026/2026-09-28--howiai--i-m-using-jev-more-than-opus-5-5-or-gpt-6-here-s-w.md)
- [a16z — How Jev Turns AI Into Software That Gets Things Done (2026-09-28)](../episodes/2026/2026-09-28--a16z--how-jev-turns-ai-into-software-that-gets-things-do.md)
- [How I AI — OpenAI DevDay 2026: Dots, Spaces, and ULTRAFAST (2026-10-01)](../episodes/2026/2026-10-01--howiai--openai-devday-2026-dots-spaces-and-ultrafast.md)
- [How I AI — Jev: 8 real use cases this fast, cheap model (2026-10-01)](../episodes/2026/2026-10-01--howiai--jev-8-real-use-cases-this-fast-cheap-model.md)
