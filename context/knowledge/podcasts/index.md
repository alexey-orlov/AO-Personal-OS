# Podcast insights — map

Self-updating knowledge base of insights mined from Alex's tracked AI / product / startup / SaaS podcasts. Built by the `podcast-insights` skill (`/podcast-insights`) from the daily digest pipeline (`automations/podcast-streaming`). Insights are claim-shaped, evidence-bound, and deep-link to the exact moment in the source video. **Themes are the unit of navigation**; the per-episode cards under `episodes/` are provenance only.

**For agents:** to answer "what has Alex's podcast feed said about X" — `grep -ri "<concept>" context/knowledge/podcasts/themes/`, open the matching theme page, follow an insight's ▶ link to the source moment or its `episodes/` card for full context. An insight ID (`pi-…`) anywhere resolves with `grep -r pi-… context/knowledge/podcasts/`. Update only via `/podcast-insights` — don't hand-edit theme pages.

_updated: 2026-06-11 · 123 insights · 8 themes · 26 episodes — backfill complete_

## Themes

| Theme | Insights | Last added | One-line |
|---|---|---|---|
| [AI agents & applications](themes/ai-agents-and-applications.md) | 48 | 2026-06-11 | **split candidate** — production agents do employee-level work, infra discipline is the moat, consumer agents repeat the context-is-moat rule |
| [AI & the PM craft](themes/ai-and-the-pm-craft.md) | 12 | 2026-06-11 | PMs ride coding agents; VP-level craft is choosing sources + target form and restraining the model |
| [Product discovery & strategy](themes/product-discovery-and-strategy.md) | 9 | 2026-06-11 | feature moats died; taste-led 1.0s, system-not-feature, vertical apps capture value, AI-first refounding |
| [Growth, GTM & pricing](themes/growth-gtm-and-pricing.md) | 5 | 2026-06-11 | self-service as primary channel, token-path GTM, Evans's mobile-era analogy for token economics |
| [Founders & fundraising](themes/founders-and-fundraising.md) | 14 | 2026-06-07 | mission-control governance + the AI cycle's lean, concentrated outcomes |
| [B2B SaaS & scaling](themes/b2b-saas-and-scaling.md) | 1 | 2026-05-26 | SaaS economics survive if products are built for agent consumption |
| [Leadership, careers & teams](themes/leadership-careers-and-teams.md) | 9 | 2026-06-11 | tasks automate, jobs are bundles; CEO must be the chief AI officer; engineer-as-shepherd |
| [Tech frontier & abundance](themes/tech-frontier-and-abundance.md) | 23 | 2026-06-11 | recursive self-improvement signals + token-collapse vs. mobile-era capex + golden-shares/Argentina policy mechanisms |

## Recent (last 7 days)

- 2026-06-11 · Y Combinator — The CEO Must Be the Chief AI Officer (Brex/Pedro) (5 insights → leadership, ai-agents, discovery)
- 2026-06-11 · Aakash Gupta — The Claude Workflow Nobody at the VP Level Is Showing You (Customer.io) (4 insights → ai-and-pm, ai-agents)
- 2026-06-11 · SaaStr AI — What Agents That Actually Work Look Like (Replit/Amjad) (5 insights → ai-agents, leadership)
- 2026-06-11 · Peter H. Diamandis — Anthropic's Global Pause, Recursive Self-Improvement, AI Personhood (5 insights → tech-frontier, leadership)
- 2026-06-11 · a16z — Economics of AI Usage and What's Next For SaaS (Benedict Evans) (4 insights → growth [merged with `pi-BD3vLtWhT5A-03`], ai-agents, tech-frontier, discovery)
- 2026-06-10 · How I AI — Claude Fable 5 - is this Mythos model worth the wait? (5 insights → ai-agents, ai-and-pm)
- 2026-06-09 · How I AI — She built a Claude shopping assistant to stop buying cheap junk (4 insights → ai-agents)
- 2026-06-08 · Lenny's Podcast — Tony Fadell: How to build real taste (5 insights → discovery, leadership, ai-agents [merged with `pi-fQmlML9Lay4-02`], tech-frontier)
- 2026-06-07 · Peter H. Diamandis — Anthropic Files $965B IPO, ChatGPT Crosses 1B Users (5 insights → tech-frontier, ai-agents, founders)
- 2026-06-07 · Y Combinator — Emergent: Six Months of Tinkering → $100M ARR (4 insights → founders, ai-agents)
- 2026-06-06 · SaaStr AI — Feature Differentiation Is Dead (Elena Verna / Lovable) (4 insights → discovery, ai-agents, ai-and-pm)
- 2026-06-06 · Y Combinator — How Legora Went From YC to $100M ARR in 18 Months (5 insights → growth, founders, discovery, ai-agents)
- 2026-06-05 · How I AI — Conductor CEO Charlie Holtz's AI Coding Setup (5 insights → ai-agents)
- 2026-06-04 · How I AI — I cloned myself with Gemini Omni in 15 minutes (5 insights → ai-agents)
- 2026-06-04 · Aakash Gupta — I Made an OpenAI PM Teach Me Codex For 67 Minutes (5 insights → ai-and-pm, ai-agents)

## Cross-theme links

- AI agents ↔ B2B SaaS — Shipper's bifurcation (`pi-4D3hDmGhFhA-01`) ties to SaaS-for-agents (`pi-4D3hDmGhFhA-04`)
- AI agents ↔ Leadership — agent gardeners (`pi-4D3hDmGhFhA-02`) corroborate the automation paradox (`pi-4D3hDmGhFhA-05`); Replit's "engineer-as-shepherd" (`pi-RdalLtvn2-M-05`) is the operational continuation; Anthropic's "80% coding done by models, humans = research taste" (`pi-P2HJEz3oqLs-02`) is the same story at the lab scale
- Founders ↔ Growth — native-AI lean firms (`pi-AiM9mZCmVPY-02`) and the DoorDash-win pattern (`pi-2Ap1dnv-GXA-04`) are the same story
- Tech frontier ↔ Growth — token-price collapse (`pi-dtuPovnf4XQ-04`) is the demand-side; Evans's mobile-data analogy (`pi-ktl8mNiWqMM-03`) is the supply-side mechanism; the "token path" GTM rule (`pi-AiM9mZCmVPY-04`) operationalizes both; Evans's commodity-foundation-models claim now spans two episodes (`pi-BD3vLtWhT5A-03` + corroborator `pi-ktl8mNiWqMM-01`)
- Tech frontier ↔ Founders — OpenAI Foundation $130–260B (`pi-aMyubFA106U-03`) + Anthropic S-1 trillion caps (`pi-hyeoYsVl1No-04`) = the same capital-concentration arc
- Tech frontier ↔ AI agents — recursive self-improvement at lab scale (Anthropic pause, `pi-P2HJEz3oqLs-01`) and at product scale (Replit's nightly closed-loop, `pi-RdalLtvn2-M-03`) are the same mechanism at different altitudes
- AI agents ↔ Tech frontier — Opus 4.8 benchmark wins (`pi-aMyubFA106U-01`) vs. the hands-on Opus 4.8 review finding the "last 10%" gap (`pi-h0gZf1hL4D4-01..05`) and Fable 5's long-horizon stalls (`pi-IREnr4I89Ho-02`): same release/model class, opposite story
- Discovery ↔ AI agents — proprietary context as the moat (`pi-kdHU-jPxDHw-03`) is the agent-side mirror of "data + workflows" durability (`pi-mjmswQurIU4-05`, `pi-kdHU-jPxDHw-02`); the consumer-side replay is Nicole's vetted-vendors Claude project (`pi-OOPganyUinE-01`)
- Discovery ↔ Leadership ↔ AI agents — Brex's "CEO must be the chief AI officer" (`pi-mPAHvz8kW24-01`) + "minimize surface area, refound boundaries" (`pi-mPAHvz8kW24-05`) + "agentic loops with tools" (`pi-mPAHvz8kW24-03`) are the same playbook from three angles
- Discovery ↔ Growth — Evans's "chatbot isn't a product" / vertical-apps thesis (`pi-ktl8mNiWqMM-04`) is the same thread as the commodity-foundation-models pair in growth
- Tech frontier internal — three federal-review attempts now bracket the regulatory range: scuttled 90-day mandate (`pi-dtuPovnf4XQ-02`) → voluntary 30-day window (`pi-hyeoYsVl1No-01`) → proposed golden shares (`pi-P2HJEz3oqLs-03`); Argentina's nonhuman-corporation pitch (`pi-P2HJEz3oqLs-04`) is the jurisdictional-race countercurrent

## Channels tracked

a16z · Y Combinator · SaaStr AI · Lenny's Podcast · Peter H. Diamandis · How I AI · Aakash Gupta
_(the `channel` field on every insight; canonical name→slug map in `_meta/themes.json`)_

## Plumbing

- Engine: `.claude/skills/podcast-insights/` — sweep (`/podcast-insights`), single (a date or `_inbox/<file>.json`), pasted.
- Capture: n8n commits each morning's cards to `_inbox/<stamp>.json` (Path A). Fallback: parse the "Youtube podcasts digest" Gmail. See `automations/podcast-knowledge/README.md`.
- Ledger: `_meta/processed.txt` (one stable insight-ID per line). Theme registry + channel map: `_meta/themes.json`.
- Scheduler: daily claude.ai cloud routine ~08:03 Europe/Kyiv (laptop-independent); the same skill runs locally as fallback.
- Invariant: `index.md` + one theme page = everything Alex's feed has said on that theme, with clickable sources, without opening a single episode card.
