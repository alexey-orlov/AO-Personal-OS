# Every — WATCH ME WRITE LIVE WITH CHATGPT VOICE

_source: youtube · channel: Every · published: 2026-07-29_
_video: https://www.youtube.com/watch?v=DXknnapb_GU_
_guests: Alex (OpenAI), Greg (OpenAI), Tibo (OpenAI), Mia (OpenAI)_
_captured: 2026-07-31 (Path A) · digest run 20260731T0402_

## Summary
The creator writes live while using ChatGPT voice mode and walks through a draft section about how 'thinking' UIs and test-time compute enabled Codeex's comeback. The core argument: models that can spend extra compute at inference — producing hidden 'thinking' tokens and running tests/tools before answering — changed both how models are built and how products like Codeex succeeded. The session mixes technical explanation (multiply-and-add as the atomic operation, RL/reward on verifiable tasks) with writing craft and metaphors to make the idea readable.

## Insights extracted (4)

- `pi-DXknnapb_GU-01` — **Test-time compute lets models think privately before answering** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: When a user sees the UI label 'thinking' the model is not merely showing a loading animation but running extra, often hidden, computation specific to that query. Those hidden tokens act like private working notes: the model can draft intermediate steps, run tools or tests, fold results back in, and only then emit the public answer. That change — paying for extra compute at inference for hard problems — is credited as essential to making Codeex compelling and commercially successful.
  - anchor: "you will see that word thinking shimmering in the place" · t=2291 · [▶ 38:11](https://www.youtube.com/watch?v=DXknnapb_GU&t=2291)

- `pi-DXknnapb_GU-02` — **First-gen chat models thought in public, like improv actors** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: Early large language models were 'external processors' — their entire reasoning had to be expressed as the answer token stream, so every trial was visible to the user. Prompting tricks like 'chain of thought' forced the model to show intermediate reasoning and often improved results, but it was a manual hack; the next wave turned that visible rehearsal into a private capability the model could use automatically. The difference explains why asking a model to 'think step by step' used to be a user trick and later became an engineered feature.
  - anchor: "The first generation of large language models were external processes." · t=4603 · [▶ 76:43](https://www.youtube.com/watch?v=DXknnapb_GU&t=4603)

- `pi-DXknnapb_GU-03` — **Verifiable, multi-step outcomes made long inference trainable and valuable** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: Researchers shifted toward training and rewarding behaviors that produced verifiable outcomes (tests passing, tasks completing), so models learned multi-step trajectories that tend to succeed. That training plus letting the model actually spend more compute at inference (test-time compute) produced measurable performance gains — summed up by the quote, "If we could increase test time compute, we got better performance." Those gains enabled product bets (like desktop/cloud Codeex) that scaled quickly and drew millions of users.
  - anchor: "If we could increase test time compute, we got better performance" · t=6157 · [▶ 102:37](https://www.youtube.com/watch?v=DXknnapb_GU&t=6157)

- `pi-DXknnapb_GU-04` — **The microscopic unit of model work is multiply-and-add** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md)
  - detail: At hardware level model inference is built from trivial operations: multiply one number by another and add it to a running total; matrix multiplies are simply billions of those operations in parallel. Framing 'thinking' in these physical terms makes clear what's changing: we pay for many more of those tiny operations (and loops of them) at inference so the system can explore options before committing to the next public token. That demystifies 'reasoning' as extended, repeated arithmetic rather than magic.
  - anchor: "Multiply one number by another, add it to a total." · t=2830 · [▶ 47:10](https://www.youtube.com/watch?v=DXknnapb_GU&t=2830)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
