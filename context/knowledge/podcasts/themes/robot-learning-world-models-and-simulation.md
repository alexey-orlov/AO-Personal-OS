# Robot learning: world models, simulation & foundation-model controllers

_status: live theme — how robots learn: world models trained on the physical world, real-to-sim-to-real simulation, robot policies with memory and reasoning, and pretrained LLMs as robot controllers_
_slug: robot-learning-world-models-and-simulation_
_updated: 2026-11-25 · 20 insights from 7 episodes · split 2026-11-25 from Physical abundance signals_

## The throughline
_Synthesis, not evidence._ Robotics lacks an internet of physical-world data, so the feed's researchers attack the data gap from two sides: grounded world models and real-to-sim-to-real simulators that manufacture training and evaluation data (Amilabs, Scenix, Atlas), and robot policies that add memory, selective reasoning and zero-shot generalization (YC Paper Club). A newer thread argues general-purpose models may win anyway: pretrained LLMs already act as robot controllers through code-as-policies, with in-context learning saturating fast and deployment needing the outputs compiled into fast reusable skills. Startups are told to go teleop-first with data infrastructure rather than wait for the research to finish.

## Insights

### World models learn from the real world, not text
Alex defines a world model as a system trained directly on sensory experience—video, audio and robotic interaction—rather than on human-written text. The argument is that LLMs only learn what humans have described and therefore lack grounded common sense; training from raw perception builds the same experiential associations humans use to reason about objects and actions. That grounding is essential for tasks where direct interaction and long-horizon reasoning matter, such as home or service robots.
— Y Combinator · 2026-07-25 · guest: Alex (Amilabs) · [▶ 8:33](https://www.youtube.com/watch?v=FVsgX0AdDTo&t=513) · `pi-FVsgX0AdDTo-01`
related: [Data scale, curation, and multimodal labeling—not just models—are the gating problems for Physical AI](physical-abundance-signals.md#data-scale-curation-and-multimodal-labeling-not-just-models-are-the-gating-problems-for-physical-ai) (same episode-cluster's data-not-just-models thesis — Encord's practitioner tooling view vs. Amilabs' model-architecture view)

### World models target robotics and long-horizon, noisy tasks LLMs cannot
Alex claims LLMs excel at low-dimensional, symbol-sequence problems—language, math, programming—whereas world models are designed for high-dimensional, noisy, long-horizon problems like embodied robotics. He gives robotics as the immediate use case: current robots have advanced hardware but brittle 'brains' that can't generalize to open environments, and a grounded model would enable safe, flexible behaviors beyond narrow, single-purpose automation. This matters because using LLMs as a hammer-for-all (e.g., 'VLA' approaches) is slow, expensive, and often unsuitable for real-time embodied control.
— Y Combinator · 2026-07-25 · guest: Alex (Amilabs) · [▶ 12:03](https://www.youtube.com/watch?v=FVsgX0AdDTo&t=723) · `pi-FVsgX0AdDTo-02`

### Training world models requires massive talent, data, and scarce GPUs
Building foundation-scale world models needs three scarce inputs: specialized researchers, massive sensory datasets (lots of video and robotic interaction data), and huge GPU compute. Alex emphasizes that even with funding it's difficult to secure the necessary GPUs, which is a practical bottleneck and part of why Amilabs raised an unprecedented roughly €1bn seed to buy thousands of GPUs and fund long research runs. The combination makes this an expensive, high-risk endeavor that shifts startup economics and fundraising norms.
— Y Combinator · 2026-07-25 · guest: Alex (Amilabs) · [▶ 15:34](https://www.youtube.com/watch?v=FVsgX0AdDTo&t=934) · `pi-FVsgX0AdDTo-03`
related: theme → [Founders & fundraising](founders-and-fundraising.md) (the €1bn-seed fundraising story this scarcity necessitated, `pi-FVsgX0AdDTo-04`)

### Generative video was the tipping point toward practical robotics (physical AI)
Seeing neural models generate realistic video made Huang conclude that robots could learn articulation and manipulation by analogy — if you can generate a finger moving in video, you can teach a robot that motion. That realization led Nvidia to invest in simulation, world foundation models, and sim-to-real pipelines (Isaac Sim, Cosmos) to ground learning in physics; he sees self-driving and warehouse/autonomous navigation as first high-value applications. Nvidia already counts its physical-AI/robotics business in the billions and expects it to become a major industry over the next decade.
— Y Combinator · 2026-07-26 · guest: Jensen Huang (NVIDIA) · [▶ 34:21](https://www.youtube.com/watch?v=I4B37S1dyQQ&t=2061) · `pi-I4B37S1dyQQ-05`

### Real-to-sim-to-real digital worlds can replace scarce robotics data
Scenix's core approach is to reconstruct real environments into digitally aligned worlds so behaviors in simulation match the real world; this lets teams generate scalable training and evaluation data without exhaustive real-world collection. World Labs' Marble is an example base model that turns images/text prompts into geometrically consistent 3D representations, giving robots consistent spatial scenes to learn from. That matters because robotic development today is bottlenecked by limited and slow real-world data collection; a faithful digital twin lets you iterate and test far faster.
— a16z · 2026-07-28 · guest: Yunu (Scenix) · [▶ 4:38](https://www.youtube.com/watch?v=-tabaM5l3s0&t=278) · `pi--tabaM5l3s0-01`
related: [Physical AI depends on proprietary, in‑field data and large fleets](physical-abundance-signals.md#physical-ai-depends-on-proprietary-in-field-data-and-large-fleets) (same data-scarcity bottleneck — Applied Intuition scales via fleets, Scenix via simulated worlds) · [Training world models requires massive talent, data, and scarce GPUs](#training-world-models-requires-massive-talent-data-and-scarce-gpus) (Amilabs trains on real sensory data at scale; Scenix's sim worlds are a complementary data-generation route)

### Robotics foundation models must include actions as a core modality
A true foundation model for robotics is multimodal and must treat actions not just as outputs but as inputs too: frames+actions can serve as a forward simulator and action outputs become policies. This action-aware, omni-modal framing lets a single backbone predict how the world evolves under interventions and also propose the actions that achieve goals, making fine-tuning into concrete robotic tasks possible. Without action as a first-class modality, models risk lacking the coupling between perception and control that real-world robotics requires.
— a16z · 2026-07-28 · guest: Yunu (Scenix) · [▶ 11:22](https://www.youtube.com/watch?v=-tabaM5l3s0&t=682) · `pi--tabaM5l3s0-02`
related: [World models target robotics and long-horizon, noisy tasks LLMs cannot](#world-models-target-robotics-and-long-horizon-noisy-tasks-llms-cannot) (same action-grounded-vs-text-only-model argument, Amilabs' world-model framing corroborated from a second company)

### Simulation is essential because it enables counterfactual reasoning and scale
Simulations let you play out counterfactuals and scenarios you cannot or do not have enough real data for, a capability the speakers argue is fundamental to learning robust policies. They point to industrial examples like self-driving companies that rely on billions of hours of simulation and note teleoperation data collection is often slower than human task speed, so simulation provides both coverage and speed. The non-obvious takeaway: simulation isn't a substitute that will always fail — it's a complementary tool that provides systematic variability and safety that real data alone cannot supply.
— a16z · 2026-07-28 · guest: Yunu (Scenix) · [▶ 20:08](https://www.youtube.com/watch?v=-tabaM5l3s0&t=1208) · `pi--tabaM5l3s0-03`

### Model- and embodiment-agnostic simulated environments accelerate training and evaluation
The platform described is intentionally agnostic to robot body and learning model: the same digital world can host many embodiments (arms, mobile manipulators, grippers) and train or evaluate different policies. That matters because customers already use diverse hardware and need a single, consistent environment to compare checkpoints (e.g., distinguish 90% vs 92% performance) and to run systematic randomizations of lighting, friction, and object geometry for reliability. Being agnostic makes the infrastructure a practical integration point for companies at many stages rather than a single-vendor robot.
— a16z · 2026-07-28 · guest: Yunu (Scenix) · [▶ 27:53](https://www.youtube.com/watch?v=-tabaM5l3s0&t=1673) · `pi--tabaM5l3s0-04`

### Robotics won't scale until sensory-motor and sim-to-real gaps are solved
Progress is blocked by four hard, practical walls: physical real-world modeling (the sim-to-real gap), action-conditioned dynamics for deformable objects, a severe lack of human-like tactile sensing, and embodiment drift as actuators/batteries degrade. Video-trained world models routinely ignore true physics (e.g., a learned simulator can turn a grocery store into an open highway), robots typically have only sparse wrist cameras and single coin FT sensors rather than epidermal sensing, and teleop datasets go stale as hardware drifts — all forcing brittle, data-hungry systems. Solving these is necessary to avoid exponential data scaling and to get robots to operate reliably outside tightly constrained labs.
— Y Combinator · 2026-08-08 · guest: Marcel, Milan Gennai, Tyler Lum, Nico, Bill, Guan Ming · [▶ 2:49](https://www.youtube.com/watch?v=myDCd0hNqQU&t=169) · `pi-myDCd0hNqQU-01`
related: [Real-to-sim-to-real digital worlds can replace scarce robotics data](#real-to-sim-to-real-digital-worlds-can-replace-scarce-robotics-data) (same sim-to-real gap named as the core bottleneck, here diagnosed with the three other walls it compounds with)

### Adding memory to robot policies enables long-horizon, adaptable behavior
Policies without memory repeatedly fail on long tasks (wash forever, burn a grilled cheese) because they lack context of past steps; a compressed multiscale approach (MAM) splits control into a low-level reactive policy with short dense visual memory and a high-level policy with a compressed textual memory scratchpad. Short-term memory is implemented with temporal-attention ViT encoders that drop redundant tokens for efficiency, while the high-level text memory is cheap to store, editable, and supports minutes-long tasks and in-context adaptation (e.g., correcting mistakes after the first failure). This compression addresses both effectiveness (better behavior) and efficiency (lower compute and inference cost) challenges when extending horizon.
— Y Combinator · 2026-08-08 · guest: Marcel · [▶ 9:38](https://www.youtube.com/watch?v=myDCd0hNqQU&t=578) · `pi-myDCd0hNqQU-02`

### Selective, self-supervised textual reasoning improves robot action prediction
R&B encore is a self-supervised cycle that treats embodied reasoning as a latent variable: a proposer generates candidate textual 'chains of thought' (plans, gripper moves, perceptual traces) and a validator scores them by concision, non‑triviality and action‑predictiveness using a variational-inference grounded objective. Resampling high-scoring traces creates a synthetic, embodiment-aligned reasoning dataset to fine-tune vision-action models, which improves success rates, pruning distracting perceptual annotations (e.g., irrelevant bounding boxes) and generalizes across manipulation, locomotion, and driving tasks and model scales. Crucially, the method can produce reasoning for training but drop it at inference (action-forcing) to avoid latency.
— Y Combinator · 2026-08-08 · guest: Milan Gennai · [▶ 24:26](https://www.youtube.com/watch?v=myDCd0hNqQU&t=1466) · `pi-myDCd0hNqQU-03`

### A single sim-trained goal-conditioned policy generalizes zero-shot to novel tools
SimToolReal: massively-parallel simulated RL trains one goal-conditioned policy (22-DOF hand + 7-DOF arm) on primitive objects and random goals; at inference a human video supplies a sequence of object goal poses (via pose/SAM) and the frozen policy tracks them at 60Hz. This lets one policy execute diverse zero-shot tool tasks (brushes, hammers, screwdrivers) without retraining; training progress on random primitives correlates strongly with real-world success on unseen tools. Dominant failure modes were pose-tracking errors (~60% of failures), dropped objects, and occasional grasping misses — many recovery behaviors (regrasping) emerged because simulation included randomized perturbations.
— Y Combinator · 2026-08-08 · guest: Tyler Lum · [▶ 36:43](https://www.youtube.com/watch?v=myDCd0hNqQU&t=2203) · `pi-myDCd0hNqQU-04`

### Startups should be teleop-first robotics application companies with data infra
Nico (Rerun) argues the practical path to deployable robotics is the 'robotics application' company: pick a paying customer problem, deploy quickly with teleoperation and off-the-shelf hardware, replicate the customer's environment, define repeatable success metrics, and iterate while collecting task-focused data. Physical data is multimodal, episodic and 3D-heavy, so standard web-data infra fails; teams need tooling for logging, visualizing, querying, and annotating episodes (Rerun provides such an SDK/catalog). This operational focus (ops, simple hardware, tight evaluation, data loops) is often the main moat and lets small teams scale without massive funding.
— Y Combinator · 2026-08-08 · guest: Nico (Rerun) · [▶ 54:09](https://www.youtube.com/watch?v=myDCd0hNqQU&t=3249) · `pi-myDCd0hNqQU-05`
related: theme → [Resource Abundance: Nuclear Microreactors, Minerals Mining & Ocean Robotics](resource-abundance-nuclear-minerals-ocean.md#ulysses-was-founded-to-build-underwater-robots-for-one-specific-problem) (same single-customer-problem-first startup discipline, applied to robotics generally rather than one company's origin story)

### Atlas unlocks real-to-sim pipelines critical for robotics
The team argues Atlas will ease the data bottleneck in robotics by making dense real-world scene reconstruction and learned simulators practical: real scenes can be reconstructed from sparse captures into simulatable environments for policy training and randomized data generation. They cite an acquisition (formerly Synapse) and use-cases like training a cable-connecting robot where sim-to-real and randomization are essential, asserting Atlas helps convert real captures into rich simulation beds. That reduces costly manual simulation setup and accelerates training robust robot policies.
— a16z · 2026-09-04 · guest: Justin, Ben, Fei-Fei Li · [▶ video](https://www.youtube.com/watch?v=qn1QDDBnTA0) · `pi-qn1QDDBnTA0-04`
related: theme → [Generative media & multimodal production](generative-media-and-multimodal.md#view-prediction-is-a-new-primitive-for-3d-world-models) (same episode's core Atlas capability, `pi-qn1QDDBnTA0-01..03`)

### General-purpose models are beginning to replace specialized robotics models
The DriveBench demo reported GPT-6 Astra drove a Toyota Corolla through a 130-meter cone course and completed the route 100% on its second attempt, showing a general model plugged into a robot interface can perform specialized physical tasks. Panelists argue this reduces the need to train bespoke robotics models from scratch and suggests a future where a single strong foundation model + appropriate interface yields robotic competence. That flip has big implications for robotics research priorities, deployment speed, and which bottlenecks—compute, cost, or energy—will matter next.
— Peter H. Diamandis · 2026-09-27 · guest: — · [▶ 40:28](https://www.youtube.com/watch?v=Cbk7hdOwJj4&t=2428) · `pi-Cbk7hdOwJj4-04`
related: [Pretrained LLMs can serve as effective robot controllers](#pretrained-llms-can-serve-as-effective-robot-controllers) (same foundation-model-as-robot-controller thesis, here a concrete driving demo one day after the YC panel first named the pattern)

### Pretrained LLMs can serve as effective robot controllers
Rather than building robot-specific models from scratch, researchers repurpose large language models pretrained on web text, images and code to output actions (e.g., end-effector poses) or to call low-level tools. RT2 is cited as an early successful example: it fine-tuned a language-vision model to produce end-effector coordinates that translate directly to joint commands, showing strong zero-shot or few-shot capability without huge robot datasets. This matters because it leverages huge, already-available corpora and shortcuts slow, data-hungry robot-only training.
— Y Combinator · 2026-09-26 · guest: Vincent (Waddle Labs), Jay (RoboCurve), Hanming · [▶ video](https://www.youtube.com/watch?v=Jv5B5CEaPJI) · `pi-Jv5B5CEaPJI-01`
related: [Robotics won't scale until sensory-motor and sim-to-real gaps are solved](#robotics-wont-scale-until-sensory-motor-and-sim-to-real-gaps-are-solved) (same YC Paper Club robotics-research cluster, now extended with a foundation-model-as-controller angle) · [General-purpose models are beginning to replace specialized robotics models](#generalpurpose-models-are-beginning-to-replace-specialized-robotics-models) (same thesis, a concrete driving demo one day later)

### Code-as-policies: LLMs write programs that call robotic tools
Programming-agent paradigms give an LLM access to a set of robot APIs (pick, place, move) and let it write code that composes those primitives into complex behaviors. Papers and systems (DeepMind code-as-policies, Voyager-like agents) showed such agents often succeed on first attempt because the LLM already understands programming structure from pretraining on code, so it knows how to sequence tools and handle failures. That mechanism turns general coding competence into immediate robotic competence without massive new robot-specific supervision.
— Y Combinator · 2026-09-26 · guest: Vincent (Waddle Labs), Jay (RoboCurve), Hanming · [▶ video](https://www.youtube.com/watch?v=Jv5B5CEaPJI) · `pi-Jv5B5CEaPJI-02`

### In-context learning is powerful but saturates quickly
Using examples in the prompt (ICL) can dramatically improve an agent's behavior cheaply — no gradient steps — but it plateaus after a modest number of examples (the speakers cite saturation around 20–40 examples). The limit is the model's context window and its prior pretraining for role-structured learning; beyond that you need retrieval/active memory, LoRA-style updates, or full fine-tuning to continue improving. Practically, teams must mix fast contextual adaptation with periodic weight updates to scale capabilities.
— Y Combinator · 2026-09-26 · guest: Vincent (Waddle Labs), Jay (RoboCurve), Hanming · [▶ video](https://www.youtube.com/watch?v=Jv5B5CEaPJI) · `pi-Jv5B5CEaPJI-03`

### Computer-use and CAD data improve spatial reasoning for robotics
Models like Astra appear much better at spatial and design tasks because they were pretrained on large amounts of computer-use data (e.g., Blender/CAD interactions, UI manipulations) in addition to images and code. Those data expose models to transformations and 3D rotations via pointer/GUI actions, giving a substrate for spatial reasoning that transfers to physical manipulation without direct robot data. The non-obvious consequence is that carefully chosen non-robot datasets (UI traces, CAD edits, egocentric video) can be as valuable as robot logs for bootstrapping robotic skill.
— Y Combinator · 2026-09-26 · guest: Vincent (Waddle Labs), Jay (RoboCurve), Hanming · [▶ video](https://www.youtube.com/watch?v=Jv5B5CEaPJI) · `pi-Jv5B5CEaPJI-04`
related: theme → [GPT-6 Astra — launch-week hands-on reviews](gpt-6-astra-launch-reviews.md) (Astra's computer-use pretraining as the substrate this insight credits for spatial-reasoning transfer)

### Real deployment requires compiling LLM outputs into fast reusable skills
Running an LLM in the control loop (have it think every step) is often too slow and expensive — the video demo shows visible latency when Astra reasons step-by-step — so production systems must convert repeated LLM decisions into compact, fast code or learned policies. The panel recommends a hierarchy: use LLMs for exploration, skill synthesis and edge-case recovery, then distill those behaviors into lightweight routines (DreamCoder/DAgger-style or weight updates) for high-throughput operation.
— Y Combinator · 2026-09-26 · guest: Vincent (Waddle Labs), Jay (RoboCurve), Hanming · [▶ video](https://www.youtube.com/watch?v=Jv5B5CEaPJI) · `pi-Jv5B5CEaPJI-05`
related: [Adding memory to robot policies enables long-horizon, adaptable behavior](#adding-memory-to-robot-policies-enables-long-horizon-adaptable-behavior) (same skill-compilation-for-fast-deployment logic, MAM's memory compression vs. this insight's LLM-to-policy distillation)


## Related themes
- [Physical abundance signals: robotics, drones & energy hardware](physical-abundance-signals.md) — parent; split off 2026-11-25. Physical-economy market case, fleet-data moats, Waymo reliability, hardware founders
- [Generative media & multimodal production](generative-media-and-multimodal.md) — Atlas's 3D world-model capabilities behind the real-to-sim insight
- [GPT-6 Astra — launch-week hands-on reviews](gpt-6-astra-launch-reviews.md) — the model behind the DriveBench driving demo and the computer-use pretraining credited for spatial reasoning
- [Founders & fundraising](founders-and-fundraising.md) — the €1bn-seed fundraising story behind Amilabs' world-models bet

## Source episodes
- [Peter H. Diamandis — Jensen Pushes Back on Doomers, Xi & Trump Talk AI, and "AI" Gets a Rebrand | #294 MOONSHOTS Live (2026-09-27)](../episodes/2026/2026-09-27--diamandis--jensen-pushes-back-doomers-xi-trump-ai-rebrand.md)
- [Y Combinator — Robot-Use Agents: Why General-Purpose Models May Win in Robotics (2026-09-26)](../episodes/2026/2026-09-26--yc--robot-use-agents-why-general-purpose-models.md)
- [a16z — Why World Models Could Change Robotics, 3D, and Creativity (2026-09-04)](../episodes/2026/2026-09-04--a16z--why-world-models-could-change-robotics-3d.md)
- [Y Combinator — Why Robotics Still Isn't Solved - But Could Be Soon | YC Paper Club (2026-08-08)](../episodes/2026/2026-08-08--yc--why-robotics-still-isnt-solved-paper-club.md)
- [a16z — The Next Frontier of AI Is Spatial Intelligence | Fei-Fei Li on a16z (2026-07-28)](../episodes/2026/2026-07-28--a16z--the-next-frontier-of-ai-is-spatial-intelligence.md)
- [Y Combinator — Jensen Huang: The Mindset That Built NVIDIA (2026-07-26)](../episodes/2026/2026-07-26--yc--jensen-huang-mindset-that-built-nvidia.md)
- [Y Combinator — What Big Tech Missed And How Startups Can Still Win (2026-07-25)](../episodes/2026/2026-07-25--yc--what-big-tech-missed-and-how-startups-can-still-win.md)
