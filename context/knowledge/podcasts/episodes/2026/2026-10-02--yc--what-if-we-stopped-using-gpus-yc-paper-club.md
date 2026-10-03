# Y Combinator — What If We Stopped Using GPUs? | YC Paper Club

_source: youtube · channel: Y Combinator · published: 2026-10-02_
_video: https://www.youtube.com/watch?v=xc2FTBGRSJo_
_guests: İlker (EPFL, photonic computing researcher), Alok (Standard VC / Stanford postdoc), Sean (Parasma)_
_captured: 2026-10-03 (Path A) · digest run 20261003T0404_

## Summary
The video is a YC Paper Club convening that asks whether we must keep building AI on GPUs and backprop. Speakers survey alternative substrates (photonic accelerators, neuromorphic/embodied neural tissue) and alternative optimizers, arguing that hardware-software co‑design — not blind scaling of GPUs and FLOPS — may be the path to orders‑of‑magnitude energy improvements. The throughline: some substrates (optics, spiking/analog/biological) offer extremely cheap forward computation, but require rethinking training algorithms and memory/IO to realize practical gains.

## Insights extracted (4)

- `pi-xc2FTBGRSJo-01` — **Transformer workloads shifted hardware priorities from FLOPS to memory and bandwidth** → theme [ML Systems & Inference Engineering](../../themes/ml-systems-and-inference-engineering.md)
  - detail: Modern transformer models made vendors and architects prioritize large memory capacity and bandwidth over raw FLOPS/Joule because attention scales as O(n^2) and demands large activations and high throughput. The transcript traces this shift around the Ampere era: Nvidia moved from maximizing GFLOPS/Joule (useful for CNNs and crypto) to designing chips with much more SRAM/HBM capacity and wider memory pipes. That explains why GFLOPS-per-joule improvements have slowed and why future efficiency wins will come from optimizing memory/bandwidth and co‑designing model structure with the substrate.
  - anchor: "بدأوا يهتمون بشكل أقل بكفاءة الحاسوب، وأكثر بسعة الذاكرة ونطاقها الترددي" · t=- · [▶ video](https://www.youtube.com/watch?v=xc2FTBGRSJo)

- `pi-xc2FTBGRSJo-02` — **Optical computing makes forward passes extremely cheap but faces ADC/DAC and programmability bottlenecks** → theme [ML Systems & Inference Engineering](../../themes/ml-systems-and-inference-engineering.md)
  - detail: Photonic systems can implement massive linear ops with near‑zero marginal FLOP cost (very low loss and huge bandwidth), so they promise dramatic inference energy savings if the forward computation dominates. The presenters demonstrated an optical diffusion‑model inference prototype (SLM+mirrors) that generated images (MNIST/fashion MNIST) with a measurable power advantage versus a GPU, but the prototype assumed fixed, fabricated weights; the real limits are converting digital weights to light (DAC), reading results back (ADC), implementing nonlinear activations, and reprogramming weights—these interface, storage and nonlinearity costs currently erode most of the theoretical gains.
  - anchor: "إجراء العمليات الحسابية باستخدام الضوء شبه مجاني" · t=- · [▶ video](https://www.youtube.com/watch?v=xc2FTBGRSJo)

- `pi-xc2FTBGRSJo-03` — **Zero‑order optimizers (SPSA) can train without backprop but scale only with cheap forward passes and model sharding** → theme [ML Systems & Inference Engineering](../../themes/ml-systems-and-inference-engineering.md)
  - detail: SPSA / finite‑difference (zero‑order) methods perturb parameters and estimate updates from forward‑only measurements, which lets you train systems that lack backprop or differentiable storage. The speaker trained a 1B‑parameter LSTM with many non‑gradient methods and found SPSA the best among them, but noted gradient‑estimation noise grows with model size: a monolithic large model becomes impractical to train this way. Splitting the model into many small experts reduces gradient noise so training becomes feasible — however that hinges on forward passes being very cheap (optical or analog substrates) and on minimizing expensive ADC/DAC and I/O.
  - anchor: "طريقة الفرق المحدود، أو SPSA، أو طريقة الفرق المركزي" · t=- · [▶ video](https://www.youtube.com/watch?v=xc2FTBGRSJo)

- `pi-xc2FTBGRSJo-04` — **The brain argues for hardware–software co‑design: memory, dynamics and inhibition matter** → theme [ML Systems & Inference Engineering](../../themes/ml-systems-and-inference-engineering.md)
  - detail: Speakers emphasize that the brain's efficiency (≈20 W) comes from co‑evolved hardware and learning rules: memory is embedded in synapses, computation is event‑driven (spiking, analog dynamics), and strong local inhibition (cortical columns) enables independent, efficient learning. The practical implication is that simply porting current deep‑learning architectures to new substrates is unlikely to capture those benefits — instead we must co‑design algorithms and devices (e.g., memristors, coupled oscillators, photonics, SRAM‑compute stacks) and choose which brain mechanisms actually translate to robust, manufacturable gains.
  - anchor: "الأجهزة والبرمجيات متطابقة، وقد تطورت معًا بطريقة فريدة" · t=- · [▶ video](https://www.youtube.com/watch?v=xc2FTBGRSJo)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
