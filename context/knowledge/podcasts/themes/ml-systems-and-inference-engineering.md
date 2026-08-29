# ML Systems & Inference Engineering

_status: live theme — the hands-on engineering layer beneath AI capability gains: decoding algorithms, GPU kernels, heterogeneous inference hardware, hardware/software co-design for speed and energy efficiency_
_slug: ml-systems-and-inference-engineering_
_updated: 2026-08-28 · 11 insights from 4 episodes_

## The throughline
Two YC Paper Club sessions and a Jeff Dean interview lay out the stack from algorithm down to silicon. At the algorithm layer, speculative decoding variants (SSD) and diffusion-based planners (Diffusion MPC) trade extra compute for lower latency and fewer compounding errors, while regularizers (Sigg) and ensembling/distillation recipes buy outsized data and parameter efficiency when data or model size is constrained — the throughline being that inference speed is itself a capability, not just a cost line. At the systems layer, multi-GPU kernel design comes down to a handful of concrete trade-offs (transfer mechanism, comms/compute scheduling, buffer overhead), inference splits into heterogeneous phases (compute-bound prefill vs. bandwidth-bound decode) that want different accelerators, and whole RL simulators can be moved onto the GPU for 10–100× throughput gains. At the hardware layer, Jeff Dean's TPU history makes the underlying economics explicit: purpose-built low-precision chips beat general-purpose ones by 30–80× on energy and 20–30× on latency, and the deeper reason is that moving data costs roughly 1,000× more energy than operating on it — so most "model" problems that look intractable are actually I/O or power problems in disguise.

## Insights

### Inference speed will be considered an AI capability, not just cost
Tanishk argues that inference should be treated as a capability because model performance grows with the amount of 'thinking' (compute) done at inference time: tokens-per-second limits peak intelligence delivered to users. That reframes engineering work on faster decoding from cost-saving to a way to unlock higher capability (he imagines massive inference clusters devoted to 'thinking'). This motivates algorithms like speculative decoding and SSD that trade extra flops for lower latency and higher tokens/sec.
— Y Combinator · 2026-05-29 · guest: — · [▶ 5:53](https://www.youtube.com/watch?v=wE1ZgJdt4uM&t=353) · `pi-wE1ZgJdt4uM-01`

### Speculative Speculative Decoding (SSD) parallelizes drafting and verification
SSD removes the strict sequential dependency between a small 'draft' model and the large verifier by predicting likely verification outcomes and starting the next draft in parallel with verification. By keeping many plausible verification outcomes and decoding them in parallel, SSD hides drafting latency, increases accepted tokens per round, and achieves large speedups (authors report being able to sample at hundreds of tokens/sec for large Llama models on multiple GPUs). The key insight is you can predict verification outcomes well enough (≈80–90% hit rates) to make parallelization worthwhile.
— Y Combinator · 2026-05-29 · guest: — · [▶ 12:01](https://www.youtube.com/watch?v=wE1ZgJdt4uM&t=721) · `pi-wE1ZgJdt4uM-02`

### Diffusion MPC: diffusion models reduce compounding error and simplify planning
DMPC uses diffusion models for both multi-step action proposals and multi-step dynamics models so planners can sample candidate action sequences and roll them forward with fewer compounding errors. Empirically this approach simplifies planning (a simple sampling-based planner outperforms many prior methods) and supports runtime adaptation to new rewards or changed dynamics (e.g., recovering when a simulated agent has a damaged joint by retraining the dynamics model). It also opens the door to learning from video-only data via joint or observation-only formulations.
— Y Combinator · 2026-05-29 · guest: — · [▶ 20:37](https://www.youtube.com/watch?v=wE1ZgJdt4uM&t=1237) · `pi-wE1ZgJdt4uM-03`

### Sigg regularizer prevents latent collapse enabling cheap, fast world models
Lay World Model introduces the 'Sigg' regularizer: enforce that one-dimensional slices of latent embeddings are Gaussian to keep the latent distribution healthy and avoid collapse during prediction training. This inexpensive regularizer lets modeling and planning happen in a compact latent space, yielding models that are ~15M parameters, fit on a single <24GB GPU, and run ~50× faster than competitors on the paper's benchmarks. An added benefit is measurable model-error spikes on out-of-distribution perturbations (color changes, teleporting objects), enabling uncertainty detection at test time.
— Y Combinator · 2026-05-29 · guest: — · [▶ 39:14](https://www.youtube.com/watch?v=wE1ZgJdt4uM&t=2354) · `pi-wE1ZgJdt4uM-04`

### When data is scarce, ensembling+regularization+distillation buys large data efficiency
In a data-constrained setup (they use 200M pretraining tokens), the authors show aggressive regularization yields clean scaling power laws, but ensembling small models beats a single large model at the same compute and gives a lower asymptotic loss. Combining ensembling with regularization (the 'joint scaling recipe') produces roughly a 5× effective data efficiency win; practical variants (e.g., a 5-member ensemble of 1B models) give ~3.7×, and distilling an ensemble into a small dense model retains ~83% of the gain. They also demonstrate a continued-pretraining case where these techniques match full-data performance with a ~17× reduction in tokens.
— Y Combinator · 2026-05-29 · guest: — · [▶ 1:01:27](https://www.youtube.com/watch?v=wE1ZgJdt4uM&t=3687) · `pi-wE1ZgJdt4uM-05`

### Multi‑GPU kernels hinge on three concrete trade‑offs
Parallel Kittens argues that efficient multi‑GPU kernels require explicit trade‑offs across (1) transfer mechanism (copy engine vs TMA vs register ops), (2) how you schedule inter‑GPU comms with on‑GPU work (intra‑SM warp specialization vs dedicating SMs), and (3) design overheads such as intermediate buffers. Empirical evidence: TMA can saturate NVLink with ~15 SMs on Blackwell where copy engines need much larger messages, and removing Nickel's intermediate buffers can speed an all‑reduce by up to 80%. Recognizing and exposing those knobs lets a small set of CUDA primitives (PK) match or beat hand‑tuned kernels with only ~50–100 lines of device code.
— Y Combinator · 2026-07-29 · guest: Stuart (Stanford, Cursor), John, Mark (Core Auto, GPU Mode), Misha Manski, Brennan · [▶ 14:28](https://www.youtube.com/watch?v=n8dz2FX0_uY&t=868) · `pi-n8dz2FX0_uY-01`

### Inference is heterogeneous — separate phases need different accelerators
Prefill and autoregressive decode exercise different hardware: prefill tends to be compute‑bound (high arithmetic intensity) while decode is extremely bandwidth‑ and latency‑sensitive (batch‑size‑one problems). On‑die SRAM MVM accelerators (high on‑chip bandwidth) can radically improve decode latency but are capacity‑limited, so sensible system design disaggregates phases (or attention vs MLP) across specialized machines and balances TCO: offloading decode helps when output lengths or interactivity needs justify the extra hardware and networking overhead.
— Y Combinator · 2026-07-29 · guest: Stuart (Stanford, Cursor), John, Mark (Core Auto, GPU Mode), Misha Manski, Brennan · [▶ 47:33](https://www.youtube.com/watch?v=n8dz2FX0_uY&t=2853) · `pi-n8dz2FX0_uY-04`

### Putting whole simulators on GPUs yields massive RL throughput gains
By adopting game industry entity‑component‑system (ECS) patterns and packing many environments into GPU resident column stores, the team implemented 'batch simulators' that map each entity row to a GPU thread and run a persistent mega‑kernel with GPU garbage‑collection and fast sorts. Results: millions of frames per second and often 10–100× speedups versus CPU baselines, enabling end‑to‑end RL training and letting non‑GPU experts prototype environments quickly — but it exposes the need for higher‑level GPU scripting and dynamic memory primitives.
— Y Combinator · 2026-07-29 · guest: Stuart (Stanford, Cursor), John, Mark (Core Auto, GPU Mode), Misha Manski, Brennan · [▶ 1:05:51](https://www.youtube.com/watch?v=n8dz2FX0_uY&t=3951) · `pi-n8dz2FX0_uY-05`
related: [Most user queries could be served locally for far less energy (in Local AI hardware & infra)](local-ai-hardware-and-infra.md#most-user-queries-could-be-served-locally-for-far-less-energy) · [LLMs can write state‑of‑the‑art GPU kernels but benchmarks get gamed (in Eval design)](eval-design-and-practice.md#llms-can-write-stateoftheart-gpu-kernels-but-benchmarks-get-gamed) (same YC Paper Club episode, the reward-hacking/eval-gaming angle)

### Specialized inference hardware massively cuts latency and energy
Designing chips tuned for low-precision dense linear algebra (not general-purpose CPUs) can yield orders-of-magnitude savings in both energy and latency. Jeff cites the original TPU work: a chip generation that was 30–80× more energy efficient than CPUs/GPUs of the day and 20–30× lower latency, which made real-time, widely available ML services practical. The lesson: co-design hardware to match ML primitives if you want huge cost or responsiveness advantages.
— Y Combinator · 2026-07-30 · guest: Jeff Dean (Google) · [▶ 8:14](https://www.youtube.com/watch?v=CxXgV54KzpQ&t=494) · `pi-CxXgV54KzpQ-01`

### Data movement, not arithmetic, usually dominates AI energy cost
Moving data into the processor can consume roughly 1,000× more energy than doing the arithmetic on it, so system design must prioritize minimizing I/O and memory traffic. That gap explains why batching is required for efficient training, why low-latency single-request inference is costly, and why hardware and software that reduce data motion (on-chip memory, reduced precision, specialized interconnects) unlock new product possibilities. In practice, many problems framed as "model" issues are actually energy or IO constraints.
— Y Combinator · 2026-07-30 · guest: Jeff Dean (Google) · [▶ 12:21](https://www.youtube.com/watch?v=CxXgV54KzpQ&t=741) · `pi-CxXgV54KzpQ-02`
related: [Specialized inference hardware massively cuts latency and energy](#specialized-inference-hardware-massively-cuts-latency-and-energy) (same episode, hardware co-design vs. data-movement framing of the same systems-engineering thesis)

### Per‑model ASICs are now economically sensible for frontier models
Training a frontier model costs on the order of $3–5B and inference must pay back many billions, so a 20% efficiency improvement can justify a multi‑hundred‑million to billion‑dollar ASIC design. The discussion lays out the math: if inference needs to generate ~$10B in value, saving 20% equals ~$2B — enough to fund an application‑specific chip — and models are relatively stable artifacts (fixed weights), making bespoke silicon a rational investment. That changes the hardware economics: model providers and specialized chipmakers can capture outsized returns by optimizing tokens‑per‑dollar or tokens‑per‑watt for specific model architectures.
— a16z · 2026-08-28 · guest: — · [▶ 26:48](https://www.youtube.com/watch?v=Zx1Ec8LWFeM&t=1608) · `pi-Zx1Ec8LWFeM-05`
related: [Specialized inference hardware massively cuts latency and energy](#specialized-inference-hardware-massively-cuts-latency-and-energy) (Jeff Dean's TPU-generation case is the historical precedent for this per-model-ASIC economics argument) · theme → [Tech frontier & abundance](tech-frontier-and-abundance.md) (the same episode's capex and supply-constraint insights, `pi-Zx1Ec8LWFeM-01..02`)

## Related themes
- [Tech frontier & abundance](tech-frontier-and-abundance.md) — parent theme; split off 2026-08-25. The macro capability/compute/energy narrative (labs, benchmarks, AGI timelines, grid buildout, longevity, space) stays there; this page holds the hands-on decoding-algorithm/kernel/hardware-co-design layer beneath it.

## Source episodes
- [a16z — Why Top Founders Are Racing Into AI Infrastructure (2026-08-28)](../episodes/2026/2026-08-28--a16z--top-founders-racing-into-ai-infrastructure.md)
- [Y Combinator — Jeff Dean: The 1% Rule for Building in AI (2026-07-30)](../episodes/2026/2026-07-30--yc--jeff-dean-the-1-rule-for-building-in-ai.md)
- [Y Combinator — Multi-GPU Kernels, Intelligence per Watt, Heterogeneous Inference, and More | YC Paper Club (2026-07-29)](../episodes/2026/2026-07-29--yc--multi-gpu-kernels-intelligence-per-watt-paper-club.md)
- [Y Combinator — Inference, Diffusion, World Models, and More | YC Paper Club (2026-05-29)](../episodes/2026/2026-05-29--yc--inference-diffusion-world-models-paper-club.md)
