# Y Combinator — Inference, Diffusion, World Models, and More | YC Paper Club

_source: youtube · channel: Y Combinator · published: 2026-05-29_
_video: https://www.youtube.com/watch?v=wE1ZgJdt4uM_
_guests: —_
_captured: 2026-06-11 (Path A) · digest run 20260529T0855_

## Summary
A YC Paper Club session where five speakers present recent research that pushes how we think about inference, planning, and data efficiency in modern ML. Talks include speculative decoding (and SSD), diffusion-based model predictive control, a latent world-model regularizer (Sigg), a theoretical framing of deep generalization, and practical scaling recipes for data-constrained pretraining. The throughline is that algorithmic and systems choices — not just bigger models or more data — create capability and large practical wins.

## Insights extracted (5)

- `pi-wE1ZgJdt4uM-01` — **Inference speed will be considered an AI capability, not just cost** → theme [Tech frontier & abundance](../../themes/tech-frontier-and-abundance.md)
  - detail: Tanishk argues that inference should be treated as a capability because model performance grows with the amount of 'thinking' (compute) done at inference time: tokens-per-second limits peak intelligence delivered to users. That reframes engineering work on faster decoding from cost-saving to a way to unlock higher capability (he imagines massive inference clusters devoted to 'thinking'). This motivates algorithms like speculative decoding and SSD that trade extra flops for lower latency and higher tokens/sec.
  - anchor: "—" · t=353 · [▶ 5:53](https://www.youtube.com/watch?v=wE1ZgJdt4uM&t=353)

- `pi-wE1ZgJdt4uM-02` — **Speculative Speculative Decoding (SSD) parallelizes drafting and verification** → theme [Tech frontier & abundance](../../themes/tech-frontier-and-abundance.md)
  - detail: SSD removes the strict sequential dependency between a small 'draft' model and the large verifier by predicting likely verification outcomes and starting the next draft in parallel with verification. By keeping many plausible verification outcomes and decoding them in parallel, SSD hides drafting latency, increases accepted tokens per round, and achieves large speedups (authors report being able to sample at hundreds of tokens/sec for large Llama models on multiple GPUs). The key insight is you can predict verification outcomes well enough (≈80–90% hit rates) to make parallelization worthwhile.
  - anchor: "—" · t=721 · [▶ 12:01](https://www.youtube.com/watch?v=wE1ZgJdt4uM&t=721)

- `pi-wE1ZgJdt4uM-03` — **Diffusion MPC: diffusion models reduce compounding error and simplify planning** → theme [Tech frontier & abundance](../../themes/tech-frontier-and-abundance.md)
  - detail: DMPC uses diffusion models for both multi-step action proposals and multi-step dynamics models so planners can sample candidate action sequences and roll them forward with fewer compounding errors. Empirically this approach simplifies planning (a simple sampling-based planner outperforms many prior methods) and supports runtime adaptation to new rewards or changed dynamics (e.g., recovering when a simulated agent has a damaged joint by retraining the dynamics model). It also opens the door to learning from video-only data via joint or observation-only formulations.
  - anchor: "—" · t=1237 · [▶ 20:37](https://www.youtube.com/watch?v=wE1ZgJdt4uM&t=1237)

- `pi-wE1ZgJdt4uM-04` — **Sigg regularizer prevents latent collapse enabling cheap, fast world models** → theme [Tech frontier & abundance](../../themes/tech-frontier-and-abundance.md)
  - detail: Lay World Model introduces the 'Sigg' regularizer: enforce that one-dimensional slices of latent embeddings are Gaussian to keep the latent distribution healthy and avoid collapse during prediction training. This inexpensive regularizer lets modeling and planning happen in a compact latent space, yielding models that are ~15M parameters, fit on a single <24GB GPU, and run ~50× faster than competitors on the paper's benchmarks. An added benefit is measurable model-error spikes on out-of-distribution perturbations (color changes, teleporting objects), enabling uncertainty detection at test time.
  - anchor: "—" · t=2354 · [▶ 39:14](https://www.youtube.com/watch?v=wE1ZgJdt4uM&t=2354)

- `pi-wE1ZgJdt4uM-05` — **When data is scarce, ensembling+regularization+distillation buys large data efficiency** → theme [Tech frontier & abundance](../../themes/tech-frontier-and-abundance.md)
  - detail: In a data-constrained setup (they use 200M pretraining tokens), the authors show aggressive regularization yields clean scaling power laws, but ensembling small models beats a single large model at the same compute and gives a lower asymptotic loss. Combining ensembling with regularization (the 'joint scaling recipe') produces roughly a 5× effective data efficiency win; practical variants (e.g., a 5-member ensemble of 1B models) give ~3.7×, and distilling an ensemble into a small dense model retains ~83% of the gain. They also demonstrate a continued-pretraining case where these techniques match full-data performance with a ~17× reduction in tokens.
  - anchor: "—" · t=3687 · [▶ 1:01:27](https://www.youtube.com/watch?v=wE1ZgJdt4uM&t=3687)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
