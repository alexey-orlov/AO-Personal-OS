# How I AI — How Gusto's CTO uses Claude Code to ship like a startup

_source: youtube · channel: How I AI · published: 2026-06-29_
_video: https://www.youtube.com/watch?v=5FKBkUCaLa8_
_guests: Eddie (CTO, Gusto)_
_captured: 2026-06-30 (Path A) · digest run 20260630T0402_

## Summary
Gusto's CTO describes how a five-person cross-functional team used Claude/Cloud Code, feature flags, and a minimal stack to prototype and ship "Gusto Co‑founder" from idea to production in ten weeks. The throughline is that modern AI tools plus a permissive, small-team process (no docs, perma-zoom, rapid PR cycles) make zero-to-one product work fast, cheap, and repeatable inside large R&D orgs. He argues this lowers the cost of experimentation, lets non-engineers ship code, and changes how companies should allocate risk and autonomy.

## Insights extracted (4)

- `pi-5FKBkUCaLa8-01` — **A five-person cross-functional team launched a production agent product in 10 weeks inside a large R&D org** → theme [Leadership, careers & teams](../../themes/leadership-careers-and-teams.md)
  - detail: Gusto Co‑founder was created by four engineers and one designer and moved from prototype to a tier‑one launch in about ten weeks. They started from a vibe‑coded prototype made on a layover, then iteratively shipped behind a feature flag on a hidden production page while chipping away at backend and frontend pieces. The result shows that a tiny, focused team plus AI tooling can deliver marketable, integrated B2B features extremely quickly inside a large company.
  - anchor: "we we built it over the course of 10 weeks" · t=258 · [▶ 4:18](https://www.youtube.com/watch?v=5FKBkUCaLa8&t=258)

- `pi-5FKBkUCaLa8-02` — **The cost of writing production code is low enough to build-and-trash experiments** → theme [Product discovery & strategy](../../themes/product-discovery-and-strategy.md)
  - detail: With AI-assisted development the team routinely opened full PRs as experiments and was comfortable deleting or rebuilding them if they didn't meet product or architectural standards. Eddie describes creating working pull requests that were ready for human review and then closing them when the idea changed, and even throwing away his original prototype to rebuild in TypeScript + Cloudflare Workers. That cheap iterative cycle (and willingness to trash code) shortens validation loops and makes higher‑risk, higher‑reward bets affordable.
  - anchor: "The cost to write code is now so low" · t=878 · [▶ 14:38](https://www.youtube.com/watch?v=5FKBkUCaLa8&t=878)

- `pi-5FKBkUCaLa8-03` — **Non-engineer designers can ship high-quality production PRs when paired with engineers** → theme [Leadership, careers & teams](../../themes/leadership-careers-and-teams.md)
  - detail: Their designer, Katie, shipped front-end experiences into production (initially faked UI responses) and, with active pairing and code review from engineers, ranked in the 94th percentile of PR throughput across R&D. The team invested in mentorship—engineers reviewed and taught prompting, testing, and quality judgment—so designers could write deployable code and iterate product UI directly in prod behind flags. This expands who can move product forward and accelerates delivery when review cycles are prioritized.
  - anchor: "she actually shipped started shipping to production like a a faked experience" · t=1213 · [▶ 20:13](https://www.youtube.com/watch?v=5FKBkUCaLa8&t=1213)

- `pi-5FKBkUCaLa8-04` — **Agentic AI products can run on a very simple stack: Cloudflare Workers + Vercel AI SDK** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Rather than a complex custom agent-platform, Gusto built the agent loop on Cloudflare Workers and used the Vercel AI SDK; other needs (memory, artifacts) were implemented as simple database columns or in‑house bits. Eddie says there was no heavy harness required—memory is just a DB column—demonstrating that the barrier to building agentic features is much lower than teams expect. This matters because simpler stacks reduce ops friction and let teams prototype real integrations (Slack/SMS, QuickBooks, Google Sheets) rapidly.
  - anchor: "We use Cloudflare worker for the actual agent loop" · t=1063 · [▶ 17:43](https://www.youtube.com/watch?v=5FKBkUCaLa8&t=1063)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
