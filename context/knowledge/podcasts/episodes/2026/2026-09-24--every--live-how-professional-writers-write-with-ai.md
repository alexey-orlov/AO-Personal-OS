# Every — LIVE: How Professional Writers Write with AI | Write-along

_source: youtube · channel: Every · published: 2026-09-24_
_video: https://www.youtube.com/watch?v=OQgO26GvAXM_
_guests: —_
_captured: 2026-09-26 (Path A) · digest run 20260926T0404_

## Summary
A live demonstration from Every's editorial team showing how they use modern LLMs (Claude/Opus 5.5, ChatGPT/Astra) to write and edit articles. The throughline: AI can accelerate writing—if you design and constrain the context, run structured interviews with the model, iterate section-by-section, and have human editors and tooling to prune and enforce quality. The session mixes a failure case (overloaded context that broke outputs) with the concrete workflow and tools they rebuilt and now use.

## Insights extracted (4)

- `pi-OQgO26GvAXM-01` — **Saving everything to AI context breaks model behavior** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Kate recounts a concrete failure: she told her model to persist every draft, note, and decision, which created internally conflicting instructions and produced flat, confused outputs. That experiment produced 91 drafts and destroyed her trust in the system until she archived everything and rebuilt from scratch. The key takeaway is that indiscriminate persistence (what she calls a 'Verschlimmbesserung') can make a helpful context unusable.
  - anchor: "اتخذت قرارًا كارثيًا بإخبار جهازي بحفظ كل ما ينتجه" · t=— · [▶ video](https://www.youtube.com/watch?v=OQgO26GvAXM)

- `pi-OQgO26GvAXM-02` — **Prune context; delete is better than add** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: After the collapse she took a deliberate 'KonMari' approach: move old folders to an archive, recreate style.md and voice.md, and only keep targeted reference points. She frames this as active trimming—'prune your context like a bonsai'—because accumulated examples and templates had merged into an impossible-to-satisfy checklist. Practically, she now saves anchors and examples selectively rather than every experiment, which restored model usefulness.
  - anchor: "قلّم سياقك كما تُقلم شجرة البونساي." · t=— · [▶ video](https://www.youtube.com/watch?v=OQgO26GvAXM)

- `pi-OQgO26GvAXM-03` — **Use a strict iterative workflow: interview → outline → draft → edit** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: Their 'compound/compound engineering' workflow breaks writing into discrete phases: brainstorming (they run an AI interview), planning (10% and 30% outlines), section-by-section drafting, then revision with human reviewers and specialized AI skills. The team uses reviewer-personas (Hitchcock, Sorkin, Vonnegut) and tools like Titan Draft and Kate Bench to enforce voice, tighten copy (10–15% cuts), and remove jargon. This modular pipeline prevents dumping large tasks on the model at once and surfaces structural issues early.
  - anchor: "نبدأ بالعصف الذهني، ثم نمر بمرحلة التخطيط" · t=— · [▶ video](https://www.youtube.com/watch?v=OQgO26GvAXM)

- `pi-OQgO26GvAXM-04` — **Treat the model as an interviewer, not the sole author** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: Kate demonstrates prompting the model to conduct a question-by-question interview to elicit her ideas and tone, rather than asking it to invent a finished piece. That interview-first method gives outputs shaped by her thinking and makes it easier to guide the model through outline and draft stages. The approach preserves authorial control and reduces the risk that the model will overproduce generic, 'flattened' drafts.
  - anchor: "أجري مقابلة معي، سؤالًا تلو الآخر" · t=— · [▶ video](https://www.youtube.com/watch?v=OQgO26GvAXM)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
