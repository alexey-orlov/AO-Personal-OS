# Intake — Account Insights pack

_Run: 2026-09-22. Skill: `/oracle-packs:spec`. Owner: Alex Orlov._

## Block A — raw inputs

**A1 · Where are the raw inputs?** — answered from context, confirmed on disk.
- `OneDrive/Projects/Oracle/Customers/DHL/UC #6 DHL Client Compass - #2.docx` — the signed SoW (€192,525 / 12 weeks).
- `OneDrive/Projects/Oracle/Packs/Account Insights/AI Signal-Impact Engine - Accelerator One-pager.pdf` — Vlad Butenko's packaging attempt, 3 pp., 2026-09-10.
- `OneDrive/Monthly AI products overviews/AI Solutions review - Sep/Oracle AI Packages - section slides.pptx`, **slides 9–10** — located 2026-09-22 after Alex flagged that the WIP customer-story slides existed outside the pack folder. Carries the reviewer-UI screenshot, the verticals, the "what the PoC buys" block and two facts in no other source (below).

**A2 · The delivered case** — DHL "Client Compass", AI-Q on OCI, contracted 12-week PoC at €192,525, kickoff slipped to Aug-27 workshops → September start. **No results yet**: the pack is written ahead of its own evidence.

**A3 · Prior packaging attempt** — yes, Vlad's one-pager (above) plus slides 9–10. Reconciled, not restarted. Alex's standing instruction on it: _"we still need to drill — I assume Vlad's scope might be overly narrowed down."_ (user:2026-09-22)

**Not found, recorded as a gap:** no recording, transcript or note exists for the 2026-09-10 "SS: Oracle: RIyahdAir / DHL packages" working session where the packaging decisions were made — checked `OneDrive/Recordings/`, `OneDrive/Meetings/` and the repo's call tree. Alex asked for it to be chased; it is not on this machine.
**Deliberately not read:** `Packs/Use case maps/…SS-work split + packaging.xlsx` (the wiki records it as still describing DHL as "per-account insight briefings" with no Account Insights packaging sheet — a reconciliation item, not an input).

## Block B — the pack's frame

- **B1 · Roadmap item** — `account-insights` (block *Deep research & investigation*, L2 *Company research agent*, status **Available**). Read from `shared/data/roadmap-items.csv`; unambiguous, not asked.
- **B2 · Verticals** — deferred to the post-research adjudication. Vlad's four (logistics & supply chain · financial services & banking · industrial & manufacturing · private equity funds) are the incumbent set; the scenario research returns eight candidates against an entity test.
- **B3 · Artifacts** — all six, in order. ("run it through the whole workflow", user:2026-09-22)
- **B4 · Internal contact** — the section deck prints **Bohdan Khomych / RnDrequest@softserveinc.com**; the wiki flags that address as appearing in no source file (Khomych's address on record is `bkhomy@`). **Open — must be confirmed before any artifact prints a contact.**

## Block C — clearance and numbers

- **C1 · Customer name** — **internal only; anonymized outside.** DHL may be named on internal decks (as the Sep section deck already does, "FIRST ENGAGEMENT · DHL"); externally the descriptor is anonymized. (user:2026-09-22)
- **C2 · Cleared figures** — none. The engagement has no results. Every metric prints "results to follow". The €190K/€192,525 contract value and the 12-week duration are **internal-only facts**.
- **C3 · PoV duration and price** — **6–8 weeks, scope narrower than the DHL SoW; price `tbd` with a footnote.** The 12-week SoW sits a tier above as the full-scope engagement. (user:2026-09-22) — resolves the SoW's breach of the 10-week cap.
- **C4 · Internal-only facts** — the contract value; the named accounts in the reviewer-UI screenshot (Meta Platforms, HPE, Vertiv); the customer name outside internal channels.

## The scope-drift question — answered

Alex's answer (user:2026-09-22): **the DHL engagement's own scope moved to the signal → opportunity shape.** Vlad's pack tracks current reality; the signed SoW document is stale. There is no product divergence to resolve — there is a SoW that no longer describes what is being built.

Two facts on slide 9 corroborate this independently of the answer:
- **"Focus: accuracy + confidence — what the PoC measures, against reviewer approve / reject."** The SoW's stated evaluation is benchmarking against manually written "golden" briefings. These are different evaluation designs; the slide's is the signal-shape one.
- **"7 external data sources"** — news on target customers, DHL's product offering, firmographic data, organization insights, CRM data, and more.

**Consequence for the wiki:** `oracle-packs.md` and `oracle-pipeline.md` both carry the divergence as an unresolved ⚠ open loop. It is resolved. To fold after the run.

**Consequence for the pack:** the remaining question is not *which shape* but *how far Vlad narrowed it* — carried into the generalization adjudication.
