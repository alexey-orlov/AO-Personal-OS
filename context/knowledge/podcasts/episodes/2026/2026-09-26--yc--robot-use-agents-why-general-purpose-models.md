# Y Combinator — Robot-Use Agents: Why General-Purpose Models May Win in Robotics

_source: youtube · channel: Y Combinator · published: 2026-09-26_
_video: https://www.youtube.com/watch?v=Jv5B5CEaPJI_
_guests: Vincent (Waddle Labs), Jay (RoboCurve), Hanming_
_captured: 2026-09-27 (Path A) · digest run 20260927T0402_

## Summary
The conversation argues that large, general-purpose pre-trained models (text, code, images, computer-use) are becoming effective controllers for real robots — often by writing code or calling tools rather than outputting natural language. Early work like RT2 and more recent demos (Astra, Voyager-style agents) show these models can produce robot policies zero- or one-shot; the panel explains why this is happening and what practical engineering (latency, skill compilation, retraining) remains. They claim the next steps are packaging contextual LLM outputs into fast reusable skills, augmenting with targeted fine-tuning, and feeding diverse data (CAD, UI interactions, egocentric video) to close the remaining gaps.

## Insights extracted (5)

- `pi-Jv5B5CEaPJI-01` — **Pretrained LLMs can serve as effective robot controllers** → theme [Physical abundance signals: robotics, drones & energy hardware](../../themes/physical-abundance-signals.md)
  - detail: Rather than building robot-specific models from scratch, researchers repurpose large language models pretrained on web text, images and code to output actions (e.g., end-effector poses) or to call low-level tools. RT2 is cited as an early successful example: it fine-tuned a language-vision model to produce end-effector coordinates that translate directly to joint commands, showing strong zero-shot or few-shot capability without huge robot datasets. This matters because it leverages huge, already-available corpora and shortcuts slow, data-hungry robot-only training.
  - anchor: "ورقة بحث RT2، حيث استخدموا نموذجاً لغوياً" · t=- · [▶ video](https://www.youtube.com/watch?v=Jv5B5CEaPJI)
- `pi-Jv5B5CEaPJI-02` — **Code-as-policies: LLMs write programs that call robotic tools** → theme [Physical abundance signals: robotics, drones & energy hardware](../../themes/physical-abundance-signals.md)
  - detail: Programming-agent paradigms give an LLM access to a set of robot APIs (pick, place, move) and let it write code that composes those primitives into complex behaviors. Papers and systems (DeepMind code-as-policies, Voyager-like agents) showed such agents often succeed on first attempt because the LLM already understands programming structure from pretraining on code, so it knows how to sequence tools and handle failures. That mechanism turns general coding competence into immediate robotic competence without massive new robot-specific supervision.
  - anchor: "وكيل البرمجة يتطلب استخداماً جيداً للأدوات وإنشاء الأدوات أثناء التشغيل." · t=- · [▶ video](https://www.youtube.com/watch?v=Jv5B5CEaPJI)
- `pi-Jv5B5CEaPJI-03` — **In-context learning is powerful but saturates quickly** → theme [Physical abundance signals: robotics, drones & energy hardware](../../themes/physical-abundance-signals.md)
  - detail: Using examples in the prompt (ICL) can dramatically improve an agent's behavior cheaply — no gradient steps — but it plateaus after a modest number of examples (the speakers cite saturation around 20–40 examples). The limit is the model's context window and its prior pretraining for role-structured learning; beyond that you need retrieval/active memory, LoRA-style updates, or full fine-tuning to continue improving. Practically, teams must mix fast contextual adaptation with periodic weight updates to scale capabilities.
  - anchor: "يصل إلى حد أقصى بسرعة كبيرة" · t=- · [▶ video](https://www.youtube.com/watch?v=Jv5B5CEaPJI)
- `pi-Jv5B5CEaPJI-04` — **Computer-use and CAD data improve spatial reasoning for robotics** → theme [Physical abundance signals: robotics, drones & energy hardware](../../themes/physical-abundance-signals.md)
  - detail: Models like Astra appear much better at spatial and design tasks because they were pretrained on large amounts of computer-use data (e.g., Blender/CAD interactions, UI manipulations) in addition to images and code. Those data expose models to transformations and 3D rotations via pointer/GUI actions, giving a substrate for spatial reasoning that transfers to physical manipulation without direct robot data. The non-obvious consequence is that carefully chosen non-robot datasets (UI traces, CAD edits, egocentric video) can be as valuable as robot logs for bootstrapping robotic skill.
  - anchor: "ربما تم تدريبها مسبقاً على بيانات استخدام الحاسوب" · t=- · [▶ video](https://www.youtube.com/watch?v=Jv5B5CEaPJI)
- `pi-Jv5B5CEaPJI-05` — **Real deployment requires compiling LLM outputs into fast reusable skills** → theme [Physical abundance signals: robotics, drones & energy hardware](../../themes/physical-abundance-signals.md)
  - detail: Running an LLM in the control loop (have it think every step) is often too slow and expensive — the video demo shows visible latency when Astra reasons step-by-step — so production systems must convert repeated LLM decisions into compact, fast code or learned policies. The panel recommends a hierarchy: use LLMs for exploration, skill synthesis and edge-case recovery, then distill those behaviors into lightweight routines (DreamCoder/DAgger-style or weight updates) for high-throughput operation.
  - anchor: "إذا جعلت "أسترا" في الحلقة تفكر في كل خطوة، فهذا بطيء حقاً." · t=- · [▶ video](https://www.youtube.com/watch?v=Jv5B5CEaPJI)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
