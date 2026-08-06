# Y Combinator — Building the First Data Centers in Space

_source: youtube · channel: Y Combinator · published: 2026-08-05_
_video: https://www.youtube.com/watch?v=A9JDkiYEhfY_
_guests: Philip (StarCloud)_
_captured: 2026-08-06 (Path A) · digest run 20260806T0404_

## Summary
The conversation explains why and how a startup pivoted to building data centers in low Earth orbit, arguing it's the most practical near-term business for dramatically cheaper launch costs. The team demonstrated running high-end GPUs (NVIDIA H100) on StarCloud 1 using unconventional thermal tricks, and is now engineering scalable thermal and radiation solutions while signing early government customers and preparing larger constellations.

## Insights extracted (5)

- `pi-A9JDkiYEhfY-01` — **Data-center-in-space economics become viable near $500 per kilogram** → theme [Orbital compute & earth observation](../../themes/orbital-compute-and-earth-observation.md)
  - detail: The founders reran break-even calculations and concluded that space-based data centers require about $500 per kilogram launch costs to make commercial sense — far higher than the $50/kg needed for space-based solar. That threshold motivated their pivot from beaming solar power down to placing compute in orbit, because compute doesn't require expensive re-entry and aligns with existing demand for new energy projects feeding data centers. This matters because it ties the business case directly to expected Starship-style launch-cost reductions rather than speculative long-term markets.
  - anchor: "a much closer to reality number of $500 a kilo" · t=265 · [▶ 4:25](https://www.youtube.com/watch?v=A9JDkiYEhfY&t=265)

- `pi-A9JDkiYEhfY-02` — **High-power GPUs can run in orbit after proving thermal workarounds** → theme [Orbital compute & earth observation](../../themes/orbital-compute-and-earth-observation.md)
  - detail: On StarCloud 1 they validated that an NVIDIA H100 can operate in space by using an ad hoc immersion/phase-change cooling approach — the team thermal-cycled components with ice baths and heat guns during preflight and submerged payloads in phase-change material in orbit. The experiment proved the hardware survives and runs real workloads (they ran a Gemini fine-tune and high-power inference), showing feasibility even if that first solution isn't scalable. Demonstrating a full-power GPU in orbit collapses a major technical doubt and unlocks follow-on designs that use continuous liquid cooling and deployable radiators.
  - anchor: "we submerged the entire thing in this phase change material" · t=1076 · [▶ 17:56](https://www.youtube.com/watch?v=A9JDkiYEhfY&t=1076)

- `pi-A9JDkiYEhfY-03` — **Heat rejection and radiation are the two central engineering blockers** → theme [Orbital compute & earth observation](../../themes/orbital-compute-and-earth-observation.md)
  - detail: The team splits engineering effort roughly 50/50 between solving vacuum thermal dissipation and chip reliability in higher-radiation environments. For thermal management they designed a low-mass, low-cost deployable radiator they claim is ~10x lower mass per watt and ~500x lower cost per watt than the ISS radiator; for radiation they run accelerated tests (Brookhaven heavy-ion and a proton cyclotron) that simulate multi-year doses in hours to inform shielding and software mitigation. These are load-bearing problems: success determines whether long-duration, high-power orbital data centers are practical and economical.
  - anchor: "The two biggest ones that are outstanding" · t=646 · [▶ 10:46](https://www.youtube.com/watch?v=A9JDkiYEhfY&t=646)

- `pi-A9JDkiYEhfY-04` — **Booking the earliest launch is a startup's most useful forcing function** → theme [Founders & fundraising](../../themes/founders-and-fundraising.md)
  - detail: They advise every space startup to reserve the first available launch as an MVP forcing function — StarCloud booked a SpaceX rideshare 18 months after founding (cost ~$300k) and used that deadline to prioritize engineering, testing, and product definition. That cadence compressed learning, attracted hires and partners, and turned an abstract idea into a verifiable in-orbit test (StarCloud 1), a pattern analogous to fast shipping in software. For founders, an early launch de-risks technical assumptions and accelerates customer conversations in ways that long design cycles don't.
  - anchor: "book the first available launch" · t=981 · [▶ 16:21](https://www.youtube.com/watch?v=A9JDkiYEhfY&t=981)

- `pi-A9JDkiYEhfY-05` — **Regulatory pressure on terrestrial data centers strengthens space demand** → theme [Orbital compute & earth observation](../../themes/orbital-compute-and-earth-observation.md)
  - detail: Philip argues that rising political and regulatory headwinds — for example, bans on building new data centers in places like New York — make orbital compute more attractive because space avoids local water and grid constraints. Initially customers will be government/military and space-native users (processing imagery on-orbit), then hyperscalers as launch capacity falls and political constraints tighten; the startup has already secured government contracts and is positioning its Starcloud 2 and 3 products accordingly. The implication is that space compute can be strategic (national security) and commercially driven even if it's not yet the cheapest per-unit compute on Earth.
  - anchor: "they just banned building new data centers in New York" · t=915 · [▶ 15:15](https://www.youtube.com/watch?v=A9JDkiYEhfY&t=915)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
