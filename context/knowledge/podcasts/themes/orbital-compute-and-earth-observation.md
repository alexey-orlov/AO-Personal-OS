# Orbital compute & earth observation

_status: live theme — satellite imagery archives paired with LLMs, and the emerging economics of running compute in orbit_
_slug: orbital-compute-and-earth-observation_
_updated: 2026-08-06 · 8 insights from 3 episodes · (split from tech-frontier-and-abundance, 2026-07-11)_

## The throughline
Two companies are independently proving the same thesis from opposite ends. Planet's "large earth models" pair a unique, ~150 PB daily-refreshed global imagery archive (~200 satellites, ~25 TB/day) with LLMs so users can ask concrete physical questions about any point on Earth — and Planet's own economics study argues that once launch costs fall to ~$200–300/kg, running energy-heavy compute in orbit (abundant solar, no terrestrial power/water constraints) becomes cheaper than ground data centers. StarCloud has already moved this from thesis to demonstrated production: StarCloud-1 flew an NVIDIA H100, trained a tiny GPT model in orbit, and ran inference on SAR imagery, with StarCloud-3 sized to pack ~50 units per Starship launch (~10 MW per launch). Together they show orbital compute is no longer speculative — it's a working, if early, deployment path for data-center capacity that terrestrial grids and land can't supply fast enough.

## Insights

### Large earth models pair Planet's global imagery archive with LLMs to answer physical questions
Planet is building "large earth models" — multimodal models trained on daily global imagery to let users ask concrete, physical questions about the planet rather than abstract theory. Planet operates ~200 satellites producing ~25 TB of imagery per day and claims ~3,000 images for every land point over the last 10 years (roughly 150 PB of archived data), which is what enables comparative, time-series queries for farmers, journalists, and national security users. Making that archive searchable and accessible via embeddings + APIs is the immediate commercial market before predictive/video-future models are scaled.
— Peter H. Diamandis · 2026-06-26 · guest: Will Marshall (Planet) · [▶ 4:39](https://www.youtube.com/watch?v=kPSLLeccrik&t=279) · `pi-kPSLLeccrik-01`

### Putting compute in orbit cuts latency and could become cheaper than ground data centers
Planet and partners have started experimenting with GPUs/TPUs on satellites to do edge inference in space so results can be returned in minutes instead of hours; Will reports Nvidia GPUs were flown in a test and Google is funding TPU tech demos. Their economic study says when launch costs fall to ~$200–$300/kg, it becomes cheaper to run energy-heavy compute in orbit (abundant solar, removes terrestrial energy/water constraints), making orbital inference the likely near-term use case and a candidate frontier for large-scale data center migration.
— Peter H. Diamandis · 2026-06-26 · guest: Will Marshall (Planet) · [▶ 5:23](https://www.youtube.com/watch?v=kPSLLeccrik&t=323) · `pi-kPSLLeccrik-02`
related: theme → [Tech frontier & abundance](tech-frontier-and-abundance.md) (SpaceX's launch-cadence pivot into a hyperscaler, `pi-isd2y37j8v4-05`, supplies the falling-launch-cost side of this economics)

### Planet's data advantage is a unique, daily global historical imagery stack
Planet claims to image the entire land mass every day and to be the only provider with high-quality historical coverage for any lat/long (archive back ~10 years). That capability includes multiple fleets (3 m daily scan, high-res ~30–50 cm 'pelicans', and a hyperspectral imager with ~400 bands) and underpins use cases from crop diagnostics to tracking construction of data centers and military activity — where trend comparison to the archive is essential to detect anomalies.
— Peter H. Diamandis · 2026-06-26 · guest: Will Marshall (Planet) · [▶ 7:18](https://www.youtube.com/watch?v=kPSLLeccrik&t=438) · `pi-kPSLLeccrik-03`

### Space-based data centers are commercially viable and scaling now
StarCloud launched StarCloud-1 (Nov 2025) carrying multiple GPUs including an NVIDIA H100 and trained a tiny GPT model in orbit, then ran inference on SAR imagery—demonstrating both feasibility and utility for orbit-side processing. The company plans StarCloud-3 (≈200 kW, 3-ton chassis) sized to launch many units per Starship (≈50 per Starship → ~10 MW per launch), arguing falling heavy-launch costs (Starship cadence) plus cheap deployable radiators make orbital compute competitive for many new workloads. Practically, on-orbit processing cuts downlink needs (send insights, not raw terabytes), opens new edge use-cases for EO and defense, and reframes where future compute capacity will be built.
— Peter H. Diamandis · 2026-07-01 · guest: Philip Johnson (StarCloud) · [▶ 1:16:52](https://www.youtube.com/watch?v=XjOLz--C_nQ&t=4612) · `pi-XjOLz--C_nQ-05`
related: theme → [Tech frontier & abundance](tech-frontier-and-abundance.md) (SpaceX supplies the launch cadence StarCloud's scaling plan depends on, `pi-isd2y37j8v4-05`)

### Data-center-in-space economics become viable near $500 per kilogram
The founders reran break-even calculations and concluded that space-based data centers require about $500 per kilogram launch costs to make commercial sense — far higher than the $50/kg needed for space-based solar. That threshold motivated their pivot from beaming solar power down to placing compute in orbit, because compute doesn't require expensive re-entry and aligns with existing demand for new energy projects feeding data centers. This matters because it ties the business case directly to expected Starship-style launch-cost reductions rather than speculative long-term markets.
— Y Combinator · 2026-08-05 · guest: Philip (StarCloud) · [▶ 4:25](https://www.youtube.com/watch?v=A9JDkiYEhfY&t=265) · `pi-A9JDkiYEhfY-01`
related: [Space-based data centers are commercially viable and scaling now](#space-based-data-centers-are-commercially-viable-and-scaling-now) (the same StarCloud thesis, now with the specific $500/kg break-even threshold that earlier reporting only gestured at)

### High-power GPUs can run in orbit after proving thermal workarounds
On StarCloud 1 they validated that an NVIDIA H100 can operate in space by using an ad hoc immersion/phase-change cooling approach — the team thermal-cycled components with ice baths and heat guns during preflight and submerged payloads in phase-change material in orbit. The experiment proved the hardware survives and runs real workloads (they ran a Gemini fine-tune and high-power inference), showing feasibility even if that first solution isn't scalable. Demonstrating a full-power GPU in orbit collapses a major technical doubt and unlocks follow-on designs that use continuous liquid cooling and deployable radiators.
— Y Combinator · 2026-08-05 · guest: Philip (StarCloud) · [▶ 17:56](https://www.youtube.com/watch?v=A9JDkiYEhfY&t=1076) · `pi-A9JDkiYEhfY-02`
related: [Space-based data centers are commercially viable and scaling now](#space-based-data-centers-are-commercially-viable-and-scaling-now) (the earlier report of the same H100-in-orbit milestone; this insight adds the specific phase-change cooling workaround)

### Heat rejection and radiation are the two central engineering blockers
The team splits engineering effort roughly 50/50 between solving vacuum thermal dissipation and chip reliability in higher-radiation environments. For thermal management they designed a low-mass, low-cost deployable radiator they claim is ~10x lower mass per watt and ~500x lower cost per watt than the ISS radiator; for radiation they run accelerated tests (Brookhaven heavy-ion and a proton cyclotron) that simulate multi-year doses in hours to inform shielding and software mitigation. These are load-bearing problems: success determines whether long-duration, high-power orbital data centers are practical and economical.
— Y Combinator · 2026-08-05 · guest: Philip (StarCloud) · [▶ 10:46](https://www.youtube.com/watch?v=A9JDkiYEhfY&t=646) · `pi-A9JDkiYEhfY-03`

### Regulatory pressure on terrestrial data centers strengthens space demand
Philip argues that rising political and regulatory headwinds — for example, bans on building new data centers in places like New York — make orbital compute more attractive because space avoids local water and grid constraints. Initially customers will be government/military and space-native users (processing imagery on-orbit), then hyperscalers as launch capacity falls and political constraints tighten; the startup has already secured government contracts and is positioning its Starcloud 2 and 3 products accordingly. The implication is that space compute can be strategic (national security) and commercially driven even if it's not yet the cheapest per-unit compute on Earth.
— Y Combinator · 2026-08-05 · guest: Philip (StarCloud) · [▶ 15:15](https://www.youtube.com/watch?v=A9JDkiYEhfY&t=915) · `pi-A9JDkiYEhfY-05`
related: [Putting compute in orbit cuts latency and could become cheaper than ground data centers](#putting-compute-in-orbit-cuts-latency-and-could-become-cheaper-than-ground-data-centers) (Planet's economics argument for orbital compute; this insight adds the regulatory-push side of the same demand case)

## Related themes
- [Tech frontier & abundance](tech-frontier-and-abundance.md) — parent theme; the compute-supply-constraint backdrop this cluster responds to

## Source episodes
- [Y Combinator — Building the First Data Centers in Space (2026-08-05)](../episodes/2026/2026-08-05--yc--building-the-first-data-centers-in-space.md)
- [Peter H. Diamandis — The $10B Satellite Empire Putting AI in Orbit, Why Chips Beat Rockets & China's #1 Open Model | #266 (2026-06-26)](../episodes/2026/2026-06-26--diamandis--10b-satellite-empire-ai-in-orbit-ep-266.md)
- [Peter H. Diamandis — Sonnet 5 Drops, Fable 5 Will Return & Fusion's First Plant Gets Licensed W/ Philip Johnston | #268 (2026-07-01)](../episodes/2026/2026-07-01--diamandis--sonnet-5-drops-fable-5-fusion-plant-licensed-268.md)
