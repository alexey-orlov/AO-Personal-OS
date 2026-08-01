# Every — WATCH MY WRITING PROCESS LIVE WITH CHATGPT FOR WORK

_source: youtube · channel: Every · published: 2026-07-30_
_video: https://www.youtube.com/watch?v=jhVKliA9Jpk_
_guests: Greg Brockman (OpenAI), Tibo Sautio (OpenAI), Alexander (OpenAI)_
_captured: 2026-08-01 (Path A) · digest run 20260801T0403_

## Summary
Dan Shipper live-streams his process of writing a definitive history of Codex while using ChatGPT (voice mode) as a drafting partner. The session alternates between editing the draft, asking the model to make technical clarifications and placeholder notes, and explaining two linked arguments: that reasoning models + a "thinking" UI created a new scaling axis (test-time compute), and that programming was the clearest strategic application because code gives machine-checkable feedback. He also frames the project as "open kitchen storytelling": publishing with transparent source material so readers can inspect interviews and evidence.

## Insights extracted (4)

- `pi-jhVKliA9Jpk-01` — **Reasoning models plus a shimmering "thinking" UI created test‑time compute as a new scaling axis** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: Dan explains that early LLMs answered immediately and publicly, while the next generation—reasoning models—can 'think' before answering. That shift means performance on hard problems improves if you allow the model more compute at query time (test‑time compute) instead of only buying improvement through larger pre‑training; OpenAI's development of such models (e.g., their '01' reasoning model) made longer, internal deliberation a lever for better results. This is important because it reframes how teams prioritize product work and compute allocation: you can now scale capability on hard tasks at run time rather than only by training bigger models in advance.
  - anchor: "thinking shimmering where the response will appear" · t=318 · [▶ 5:18](https://www.youtube.com/watch?v=jhVKliA9Jpk&t=318)

- `pi-jhVKliA9Jpk-02` — **Programming became the strategic bet because code provides a closed loop of machine‑checkable feedback** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: Greg Brockman and Dan argue programming is unusually well suited to the reasoning paradigm because an agent can edit a real repository, run a compiler or tests, and get immediate, objective signals about success or failure. That closed verification loop means extra test‑time compute can be spent iterating (try, check, revise) and produce measurable improvement, not just longer prose; training signals can also reinforce trajectories that lead to correct outcomes. In short, software engineering combines scale, verifiability, and high economic value, making it a strong domain for applying reasoning models.
  - anchor: "Programming was unusually suited to the new reasoning paradigm" · t=1127 · [▶ 18:47](https://www.youtube.com/watch?v=jhVKliA9Jpk&t=1127)

- `pi-jhVKliA9Jpk-03` — **Declaring coding a company priority triggered many overlapping, bottom‑up efforts toward Codex** → theme [Leadership, careers & teams](../../themes/leadership-careers-and-teams.md)
  - detail: When OpenAI made "coding/software engineering" a top‑level company goal in early 2025, that mandate didn't produce a single linear project but unlocked multiple parallel experiments across teams—examples include Tibo Sautio joining an internal coding‑agent effort (Dec 2024) to accelerate research infrastructure and Alexander pushing an interactive coding product concept. Dan frames Codex's origin as 'many beginnings': the priority served as a rallying name that encouraged diverse teams to explore different approaches and keep those that produced evidence. That explains why Codex emerged from a spreading set of initiatives rather than one centrally planned route.
  - anchor: "coding software engineering as a top level company goal" · t=634 · [▶ 10:34](https://www.youtube.com/watch?v=jhVKliA9Jpk&t=634)

- `pi-jhVKliA9Jpk-04` — **Open‑kitchen storytelling: publish with transparent sources and live investigable quotes** → theme [Narrative & media strategy](../../themes/narrative-and-media-strategy.md)
  - detail: Dan proposes making articles clickable so any quoted line opens the full interview in a sidebar (and allows agents to inspect the source), calling this approach 'open kitchen storytelling.' The idea is to avoid isolated quotes that lack context by exposing source material and letting readers (or automated agents) follow the chain of evidence themselves, improving trust and enabling independent verification. It's both a reporting practice and a product idea that complements transparent, agent‑driven reading workflows.
  - anchor: "open kitchen storytelling is exactly it's such a good term" · t=219 · [▶ 3:39](https://www.youtube.com/watch?v=jhVKliA9Jpk&t=219)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
