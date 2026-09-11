# AI in mathematical research

_status: live theme — LLMs doing genuine research-level mathematics: literature search, proof construction, novel results, and the limits of that capability_
_slug: ai-mathematical-research_
_updated: 2026-09-11 · 14 insights from 6 episodes · split from Tech frontier & abundance, 2026-09-11_

## The throughline
Across six episodes spanning June–September, a consistent picture emerges of LLMs moving from contest-style math into genuine open research. The capability side is concrete and repeatedly corroborated: a reported disproof of an Erdős conjecture surprised Timothy Gowers; OpenAI's unreleased Astra produced ten new, machine-checkable results (geometry, coding theory, group theory, quantum complexity, combinatorics) for about $2,000 of total compute; a companion a16z episode five weeks later showed the same class of model finding buried literature references in minutes, reliably executing the finicky epsilon-delta bookkeeping once a human supplies the core idea, exploring and backtracking through search trees more judiciously than humans, deriving a tighter asymptotic sphere-packing bound (~2^-0.61d), and producing a short (~15-page) proof of a non-sofic countable group; and a reported solution to the Navier–Stokes Millennium Problem (~10,000 agents, 88 hours, $6.5M inference spend) pushed the same capability toward a Clay-level grand challenge. The limits are just as consistent: models read as human-like on chain-of-thought and are strong at computation, literature retrieval, and technical execution, but a working mathematician's own account is that they lack the fuzzy conceptual analogies that drive genuinely new theory — reasoning scales in natural language rather than formal proof corpora, which explains why outputs look like stepwise human argument but miss the informal motivations experts use. Two counterweights temper the hype: math wins don't imply near-term economic value (many solved problems historically had no market incentive), and cheap, fast proof generation risks incentivizing low-quality "slot-machine" arXiv papers that a supervisor hasn't meaningfully engaged with. One open path forward: a graded curriculum of increasingly hard conjectures, with the right reward structure, could in principle teach a model the theory-building skill it currently lacks.

## Insights

### LLMs are already solving research-level math, not just contest problems
Benchmarks have progressed from middle-school math (GSM8K) to research tasks (Riemann bench), and recent model work reportedly produced a disproof of an Erdős conjecture using novel algebraic-geometry techniques. Leading mathematicians reacted with surprise — Timothy Gowers first misread the result as an upper bound and was relieved to find it was a counterexample — which shows the work is nontrivial and sometimes surprising even to experts. This matters because it demonstrates models are moving from closed, contest-style tasks to open research that can shift expert workflows and raise questions about the future role of human researchers.
— Every · 2026-06-24 · guest: Edwin · [▶ 3:50](https://www.youtube.com/watch?v=omX6wrLuX08&t=230) · `pi-omX6wrLuX08-01`
related: [Naive self-play produces adversarial, useless tasks unless grounded and judged (in Model reviews)](model-reviews-and-benchmarks.md#naive-self-play-produces-adversarial-useless-tasks-unless-grounded-and-judged) (SGS grounding on Lean problems is the training-side complement — this insight shows the capability already landing on research problems in practice) · theme → [AI agents & applications](ai-agents-and-applications.md) (autonomous research goal-setting, `pi-omX6wrLuX08-03`)

### AI solved decade‑old math problems at a $2,000 compute cost
OpenAI's unreleased model Astra produced ten new, machine‑checkable results across mathematics (geometry, coding theory, group theory, quantum complexity, combinatorics) and published a 249‑page manuscript with verifiable proofs. Field medalist Tom Gowers praised the work and the total compute cost for producing all ten results was estimated at about $2,000 — orders of magnitude cheaper than traditional research resources — meaning serious mathematical discovery can now be automated and widely accessible. That cheap, verifiable automation threatens to 'bulk solve' whole research domains and will very likely propagate from math into physics, materials and biology, changing who does research and what problems are tractable.
— Peter H. Diamandis · 2026-08-08 · guest: — · [▶ 46:06](https://www.youtube.com/watch?v=Jku8b2YKuy0&t=2766) · `pi-Jku8b2YKuy0-02`
related: [LLMs are already solving research-level math, not just contest problems](#llms-are-already-solving-research-level-math-not-just-contest-problems) (same research-math-automation thread — the earlier Erdős-conjecture disproof surprised experts; Astra's ten verified results at $2,000 total compute is the next, far cheaper data point)

### AI math breakthroughs don't imply immediate economic value
The transcript argues that many solved math problems historically lacked strong market incentives, so AI succeeding at them isn't proof it will unlock broad economic value. The speakers note researchers often worked for low pay (e.g., long postdoc stints) on problems without commercial demand, so an AI that accelerates that work may be powerful academically but not necessarily the bottleneck for industrial problems. This matters because treating math wins as a proxy for imminent economic or scientific revolutions risks overestimating real-world impact.
— a16z · 2026-08-25 · guest: — · [▶ 3:19](https://www.youtube.com/watch?v=GHPB1MwlKU0&t=199) · `pi-GHPB1MwlKU0-01`
related: [LLMs are already solving research-level math, not just contest problems](#llms-are-already-solving-research-level-math-not-just-contest-problems) (same research-math thread — that insight shows the capability landing, this one is the skeptical counterweight on what it's actually worth)

### LLMs produce human-like reasoning but lack deep mathematical intuition
The models' outputs often read like a human mathematician's chain of thought—recognizable summaries and stepwise arguments—yet they rarely generate the fuzzy, big‑picture conceptual analogies that drive new theory. Evidence: the guest felt the released chain‑of‑thoughts were recognizable and that many model results look like humans applying known techniques; models are strong at computation and combining technical ideas but weak at proposing new high‑level philosophies or analogies. That matters because deep mathematical progress typically requires proposing conceptual frameworks, not just grinding proofs.
— a16z · 2026-09-01 · guest: Daniel · [▶ 6:22](https://www.youtube.com/watch?v=tQI35CSNB08&t=382) · `pi-tQI35CSNB08-01`
related: [LLMs are already solving research-level math, not just contest problems](#llms-are-already-solving-research-level-math-not-just-contest-problems) (the capability-landing claim this insight's "still lacks intuition" finding qualifies)

### Reasoning scales in natural language, not formal proof corpora
Progress appears to come from models learning to reason in natural language rather than being trained on large bodies of machine‑checkable proofs, so their outputs generalize across informal mathematical writing and explanations. Evidence: the guest points out labs scaled natural‑language reasoning (chain‑of‑thought) even though textbooks and papers are polished and lack thought traces, which helps models be useful in many tasks but leaves them missing the informal motivations and experimental traces human mathematicians use. This explains why models can produce plausible human‑style proofs but often miss the motivations or the unwritten intuition.
— a16z · 2026-09-01 · guest: Daniel · [▶ 8:00](https://www.youtube.com/watch?v=tQI35CSNB08&t=480) · `pi-tQI35CSNB08-02`

### AI is most useful for experiments, examples, and coding tasks
Models excel as tools for running many parallel examples, exploring constructions, and doing technical computation or coding—tasks that speed up the exploratory steps of research. Evidence: the guest uses models as a substitute for literature searches, to run mass examples, and to handle coding chores that he otherwise would have postponed; in one paper he describes finding a better lemma statement by hand, after which the model quickly produced the formal proof. This makes AI a powerful accelerant for iterative experimentation but not a replacement for human conceptual insight.
— a16z · 2026-09-01 · guest: Daniel · [▶ 19:15](https://www.youtube.com/watch?v=tQI35CSNB08&t=1155) · `pi-tQI35CSNB08-03`

### Cheap AI proofs risk incentivizing low-quality 'slot-machine' papers
Because models can generate many proofs quickly, there is a surge of low‑value or duplicated arXiv submissions where the human author hasn't meaningfully engaged, which can distort academic incentives. Evidence: the guest notes multiple near‑identical papers appearing within days and describes the temptation for early‑career researchers to 'produce a lot of papers' by repeatedly prompting models until a proof appears. This matters because it undermines the development of human mathematical understanding and the pipeline that trains future researchers.
— a16z · 2026-09-01 · guest: Daniel · [▶ 36:40](https://www.youtube.com/watch?v=tQI35CSNB08&t=2200) · `pi-tQI35CSNB08-04`

### Theory-building can be learned by models with the right curriculum
The guest believes models can eventually acquire the fuzzier skills of theory development given appropriate environments, reward structures, and curricula of increasingly difficult conjectures. Evidence: he expects continued capability growth and suggests using a graded sequence of mathematical conjectures and better RL/harness designs to teach models intermediate goals and reward signals that correspond to building understanding, not just producing checked proofs. If correct, this path would move models from applied technique‑generators to creators of new mathematical frameworks.
— a16z · 2026-09-01 · guest: Daniel · [▶ 26:59](https://www.youtube.com/watch?v=tQI35CSNB08&t=1619) · `pi-tQI35CSNB08-05`
related: [Naive self-play produces adversarial, useless tasks unless grounded and judged (in Model reviews)](model-reviews-and-benchmarks.md#naive-self-play-produces-adversarial-useless-tasks-unless-grounded-and-judged) (same graded-curriculum-for-reasoning principle, here proposed for mathematical theory-building specifically)

### AI can rapidly find buried literature references humans miss
A concrete example: the speaker plugged a hard combinatorics problem into GPT-5 and within minutes the model found an existing reference that humans had spent hours seeking. The point is that literature search across specialized papers is often 'humanely hard' and the model's cross-domain familiarity and retrieval-like abilities let it make connections quickly, saving researchers wasted effort and pointing to reachable problems.
— a16z · 2026-09-08 · guest: — · [▶ 3:30](https://www.youtube.com/watch?v=1JvyLGd2Sfs&t=210) · `pi-1JvyLGd2Sfs-01`
related: [LLMs are already solving research-level math, not just contest problems](#llms-are-already-solving-research-level-math-not-just-contest-problems) (same research-math-automation thread, a companion a16z episode adding the literature-search accelerant angle)

### Models reliably execute finicky technical steps once an idea exists
The speakers note a recurring pattern: humans often have the core idea but get stuck in epsilon-delta-level bookkeeping, while the model 'nails these kinds of arguments' and carries out the detailed calculations and inequalities. That reliability turns borderline human plans into complete proofs (e.g., progress on unit-distance and other Astro problems) because the AI consistently handles the tedious but essential correctness checks.
— a16z · 2026-09-08 · guest: — · [▶ 5:22](https://www.youtube.com/watch?v=1JvyLGd2Sfs&t=322) · `pi-1JvyLGd2Sfs-02`
related: [AI is most useful for experiments, examples, and coding tasks](#ai-is-most-useful-for-experiments-examples-and-coding-tasks) (same execution-not-conception division of labor, here the specific finding that AI's reliability is at the technical-bookkeeping layer)

### AI doggedly explores, backtracks, and updates likelihoods better than humans
Rather than brute-forcing everything, the model tries a limited set of plausible approaches, backtracks when they fail, and updates how promising each path is — often more judiciously than human researchers. That behavior lets it prune enormous search trees, pursue the right avenues for long enough to succeed, and run parallel sessions to explore alternate hypotheses without 'polluting' prior context.
— a16z · 2026-09-08 · guest: — · [▶ 8:25](https://www.youtube.com/watch?v=1JvyLGd2Sfs&t=505) · `pi-1JvyLGd2Sfs-03`

### AI derived a tighter asymptotic bound for high-dimensional sphere packing
Using the linear-programming (LP) framework for sphere packing, the model produced a function f that yields an upper bound with asymptotics roughly equivalent to about 2^{-0.61 d}, and it also argued no LP-function could do better. This both explains earlier numeric conjectures and gives the best bound obtainable within that LP relaxation, turning a numerics-led guess into an analytic, relatively short argument.
— a16z · 2026-09-08 · guest: — · [▶ 23:25](https://www.youtube.com/watch?v=1JvyLGd2Sfs&t=1405) · `pi-1JvyLGd2Sfs-04`

### AI constructed a short proof producing a non-sofic countable group
Sofic groups are those that can be approximated by finite groups; the model found a concrete combinatorial obstruction and a short (≈15-page) group-theory proof producing a non-sofic countable group. This contrasts with earlier disproofs of broader conjectures that required hundreds of pages and connections to quantum complexity — here the AI stayed within classical group theory and completed the 'last mile' of the argument.
— a16z · 2026-09-08 · guest: — · [▶ 46:55](https://www.youtube.com/watch?v=1JvyLGd2Sfs&t=2815) · `pi-1JvyLGd2Sfs-05`
related: [AI solved decade‑old math problems at a $2,000 compute cost](#ai-solved-decadeold-math-problems-at-a-2000-compute-cost) (same short-proof-of-a-longstanding-open-problem pattern, here classical group theory instead of Astra's ten Erdős-style results)

### A generalist model reportedly solved Navier–Stokes with modest inference spend
OpenAI and other teams published solutions to a Clay Millennium problem (Navier–Stokes) after one report that OpenAI used ~10,000 agents over 88 hours, 130 billion tokens, and roughly $6.5M of inference compute to reach a solution. If reproducible, this is direct evidence that modern agentic models can attack long‑standing grand‑challenge math/physics problems at scale, accelerating scientific progress but also creating urgent questions about attribution, credit, and who benefits from frontier compute.
— Peter H. Diamandis · 2026-09-09 · guest: — · [▶ 48:05](https://www.youtube.com/watch?v=vAgEf4jX_1o&t=2885) · `pi-vAgEf4jX_1o-03`
related: [AI solved decade‑old math problems at a $2,000 compute cost](#ai-solved-decadeold-math-problems-at-a-2000-compute-cost) (same research-math-automation thread — a Clay Millennium Problem is a far higher-profile target than Astra's ten results, at far higher but still modest compute cost) · [LLMs are already solving research-level math, not just contest problems](#llms-are-already-solving-research-level-math-not-just-contest-problems)

## Related themes
- [Tech frontier & abundance](tech-frontier-and-abundance.md) — parent theme this split from, 2026-09-11
- [Model reviews & benchmarks](model-reviews-and-benchmarks.md) — the self-play/grounding training discipline (`#naive-self-play-produces-adversarial-useless-tasks-unless-grounded-and-judged`) that underlies the RL-training side of this capability
- [AI agents & applications](ai-agents-and-applications.md) — autonomous research goal-setting as an application of the same underlying capability

## Source episodes
- [a16z — Inside OpenAI's Breakthroughs in Mathematical Reasoning (2026-09-08)](../episodes/2026/2026-09-08--a16z--openai-breakthroughs-in-mathematical-reasoning.md)
- [Peter H. Diamandis — OpenAI Agents Hijack a German Website, Jensen Declares AGI Arrived, and OpenAI Solves Navier-Stokes (2026-09-09)](../episodes/2026/2026-09-09--diamandis--openai-agents-hijack-german-website-jensen-agi.md)
- [a16z — Can AI Learn Mathematical Intuition? (2026-09-01)](../episodes/2026/2026-09-01--a16z--can-ai-learn-mathematical-intuition.md)
- [a16z — The Evolution of Computers (2026-08-25)](../episodes/2026/2026-08-25--a16z--the-evolution-of-computers.md)
- [Peter H. Diamandis — Google's Jeff Dean Exits, SpaceX Hits $100B in Rev & OpenAI's Astra Solves Decade-Old Math Problems (2026-08-08)](../episodes/2026/2026-08-08--diamandis--jeff-dean-exits-spacex-100b-openai-astra.md)
- [Every — Building a School Where AI Models Learn About Humanity (2026-06-24)](../episodes/2026/2026-06-24--every--building-school-ai-models-learn-humanity.md)
