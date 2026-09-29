# a16z — How Jev Turns AI Into Software That Gets Things Done

_source: youtube · channel: a16z · published: 2026-09-28_
_video: https://www.youtube.com/watch?v=Ut3LOjKNJaE_
_guests: Diogo (Type Safe)_
_captured: 2026-09-29 (Path A) · digest run 20260929T0405_

## Summary
Founder Diogo of Type Safe explains Jev, a model designed to embed probabilistic, stateful intelligence directly into software so programs can do new kinds of work rather than just having code produced faster. The central argument is that true economic value comes from reliable automation of real production tasks (not human-scored benchmarks), and Jev focuses on reliability, composability, and a probabilistic programming model to achieve that.

## Insights extracted (4)

- `pi-Ut3LOjKNJaE-01` — **AI should expand what software can do, not just write the same code faster** → theme [Type-safe decision models (Jev)](../../themes/type-safe-decision-models.md)
  - detail: Diogo argues that tools like Codex and Cloud Code generate code that looks like what humans already wrote, but they don't extend the expressive power of programs. Jev is designed to be embedded as a new kind of feature — a probabilistic, stateful layer you include in your application that accepts natural-language intent and makes decisions with confidence levels. That shift lets developers automate tasks that previously were too fuzzy for programmatic automation, turning language and intent into actionable program behavior.
  - anchor: "بدلًا من أتمتة هندسة البرمجيات، أريد توسيع" · t=— · [▶ video](https://www.youtube.com/watch?v=Ut3LOjKNJaE)

- `pi-Ut3LOjKNJaE-02` — **Reliability and predictable behavior are the product's core design constraints** → theme [Type-safe decision models (Jev)](../../themes/type-safe-decision-models.md)
  - detail: Type Safe delayed release and tuned Jev specifically for reliability because usable automation must be trustworthy in production. Diogo breaks reliability into dimensions — availability (SLA), determinism (consistent results for same inputs where required), and robustness (intelligence behaves usefully each time) — and aims for levels of reliability that let developers program against Jev without constantly falling back to human oversight. This focus is what distinguishes Jev from many early AI features that were flashy but fragile when embedded in workflows.
  - anchor: "أعتني كثيراً بالموثوقية، فهي جوهر هذا المشروع." · t=— · [▶ video](https://www.youtube.com/watch?v=Ut3LOjKNJaE)

- `pi-Ut3LOjKNJaE-03` — **Measure AI success by how much real production work it automates** → theme [Type-safe decision models (Jev)](../../themes/type-safe-decision-models.md)
  - detail: Instead of optimizing for human evaluation scores (the RLHF-era metric), Diogo says the right metric is how much real, productive work the system can automate in the field. He cites repeated industry failures — e.g., customer-support automation that looks good in demos but fails on long-tail exceptions — to argue that production automation (password resets vs unique cases) is the true yardstick. Jev is built to raise that practical automation rate by making probabilistic decisions inside applications and surfacing confidence, so developers can compose reliable automation.
  - anchor: "إلى أي مدى يمكننا أتمتة المهام الإنتاجية" · t=— · [▶ video](https://www.youtube.com/watch?v=Ut3LOjKNJaE)

- `pi-Ut3LOjKNJaE-04` — **This is a practical revival of probabilistic / neuro-symbolic programming** → theme [Type-safe decision models (Jev)](../../themes/type-safe-decision-models.md)
  - detail: Diogo frames Jev as part of a renewed era of probabilistic programming: language reasoning tied to state machines and typed program structures that can make choices with statistical confidence. He notes his cofounder Eric's background in these ideas and predicts this approach will let AI act like a 'smart database' or stateful service rather than a pure text generator. The consequence is new guarantees and composability for building systems that must balance speed, cost, and correctness.
  - anchor: "سيُفتح عصرٌ كاملٌ للبرمجة الاحتمالية." · t=— · [▶ video](https://www.youtube.com/watch?v=Ut3LOjKNJaE)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
