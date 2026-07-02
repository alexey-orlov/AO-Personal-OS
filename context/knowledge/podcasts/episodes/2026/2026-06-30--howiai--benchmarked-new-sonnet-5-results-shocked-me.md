# How I AI — I benchmarked the NEW Sonnet 5. The results shocked me.

_source: youtube · channel: How I AI · published: 2026-06-30_
_video: https://www.youtube.com/watch?v=yJ-1LB2hF-Q_
_guests: —_
_captured: 2026-07-02 (Path A) · digest run 20260702T0404_

## Summary
The host built a repeatable, partly-blind benchmark (the How I AI bench) to compare recent paid frontier models across tasks like PRDs, prototypes, agentic code searches, and agentic voice. The automatic leaderboard surprised him: automated LLM judges favored Gemini 3 Pro and Sonnet 5, while his human taste preferred Sonnet 46 and GPT 5.5; he argues model choice should be task-driven and that human 'vibe' still matters in evaluation.

## Insights extracted (4)

- `pi-yJ-1LB2hF-Q-01` — **Sonnet 5 excels at agentic tool use and is cost-competitive** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: Sonnet 5 produces longer-running agentic tool sessions and better browser/computer usage than Sonnet 46, and it approaches Opus 48's pass rates on long, complex tool tasks while being cheaper. The host cites launch pricing of $2 per million input tokens and $10 per million output tokens (introductory rate through the summer), making Sonnet 5 attractive for extended agentic workflows where Opus would be more expensive. That combination—strong agentic behavior plus lower price—makes it worth testing now despite some prototype instability noted later.
  - anchor: "Well, it's really good at agentic tool use." · t=168 · [▶ 2:48](https://www.youtube.com/watch?v=yJ-1LB2hF-Q&t=168)

- `pi-yJ-1LB2hF-Q-02` — **Automated LLM judges and human taste can sharply disagree** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: When the host ran a blind leaderboard that combined his vibe checks with LLM judges, models the automated judges ranked highly (Gemini 3 Pro and Sonnet 5 tied with GPT 5.5) differed from his human ranking, where he preferred Sonnet 46 and GPT 5.5. He observed that LLM judges tend to compress scores toward the middle and flag issues (broken code, ignored constraints) that a human rater might overlook when evaluating first-glance visuals or 'taste.' That divergence shows automated evals can miss qualities humans care about, so human-in-the-loop scoring remains important.
  - anchor: "I am the opposite of the automated benchmark" · t=951 · [▶ 15:51](https://www.youtube.com/watch?v=yJ-1LB2hF-Q&t=951)

- `pi-yJ-1LB2hF-Q-03` — **How I AI bench: frozen inputs, blind human scoring, plus LLM judges** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: The benchmark uses frozen inputs and blind presentation of models A–E, stores every model output in a local HTML page for structured human 'vibe' 1–5 scoring, and then adds two LLM judges (GPT 5.5 and Opus 48) to produce a combined, Clare-weighted index. Tasks tested included PRDs, prototype/wireframe generations (dozens of variants), an agentic multi-step code search, and agentic voice persona checks; the host saved JSON of human scores to compare against automated judgments. The setup aims to be repeatable and to let the host encode subjective taste alongside objective failure modes.
  - anchor: "frozen inputs, blind scoring where possible, a rubric" · t=379 · [▶ 6:19](https://www.youtube.com/watch?v=yJ-1LB2hF-Q&t=379)

- `pi-yJ-1LB2hF-Q-04` — **No single model is best — strengths depend on the task** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: Results were task-specific: GPT 5.5 performed best for PRD writing (comprehensive and clear), Sonnet 46 scored highest on agentic voice and certain prototypes (preferred 'vibe'), and Opus 48 shone on dense, complex front-end prototypes and coding tasks. Sonnet 5 showed promise on agentic/tool flows and affordability but produced more broken prototypes in this run, while Gemini 3 Pro was concise and ranked highly by automated judges despite the host finding it bare-bones. The practical takeaway is to choose the model by the job—PRD, prototyping, coding, or conversational persona—rather than expecting a universal best model.
  - anchor: "If you're writing a PRD, use GPT 5.5" · t=1437 · [▶ 23:57](https://www.youtube.com/watch?v=yJ-1LB2hF-Q&t=1437)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
