# Podcast insights — map

Self-updating knowledge base of insights mined from Alex's tracked AI / product / startup / SaaS podcasts. Built by the `podcast-insights` skill (`/podcast-insights`) from the daily digest pipeline (`automations/podcast-streaming`). Insights are claim-shaped, evidence-bound, and deep-link to the exact moment in the source video. **Themes are the unit of navigation**; the per-episode cards under `episodes/` are provenance only.

**For agents:** to answer "what has Alex's podcast feed said about X" — `grep -ri "<concept>" context/knowledge/podcasts/themes/`, open the matching theme page, follow an insight's ▶ link to the source moment or its `episodes/` card for full context. An insight ID (`pi-…`) anywhere resolves with `grep -r pi-… context/knowledge/podcasts/`. Update only via `/podcast-insights` — don't hand-edit theme pages.

_updated: 2026-06-11 · 86 insights · 8 themes · 18 episodes — backfill in progress_

## Themes

| Theme | Insights | Last added | One-line |
|---|---|---|---|
| [AI agents & applications](themes/ai-agents-and-applications.md) | 31 | 2026-06-07 | what's being built with agents/LLMs and where value accrues |
| [AI & the PM craft](themes/ai-and-the-pm-craft.md) | 8 | 2026-06-06 | PMs ride coding agents; prototypes replace PRDs; non-techs ship apps |
| [Product discovery & strategy](themes/product-discovery-and-strategy.md) | 5 | 2026-06-06 | feature moats died; durable moats are data, workflow, network, brand |
| [Growth, GTM & pricing](themes/growth-gtm-and-pricing.md) | 5 | 2026-06-06 | self-service as primary channel, token-path GTM, premium brand creative |
| [Founders & fundraising](themes/founders-and-fundraising.md) | 14 | 2026-06-07 | mission-control governance + the AI cycle's lean, concentrated outcomes |
| [B2B SaaS & scaling](themes/b2b-saas-and-scaling.md) | 1 | 2026-05-26 | SaaS economics survive if products are built for agent consumption |
| [Leadership, careers & teams](themes/leadership-careers-and-teams.md) | 4 | 2026-06-01 | tasks automate, jobs are bundles — total work goes up, not down |
| [Tech frontier & abundance](themes/tech-frontier-and-abundance.md) | 18 | 2026-06-07 | algorithmic gains + token-collapse + 1B-user/trillion-cap labs + policy catch-up |

## Recent (last 7 days)

- 2026-06-07 · Peter H. Diamandis — Anthropic Files $965B IPO, ChatGPT Crosses 1B Users (5 insights → tech-frontier, ai-agents, founders)
- 2026-06-07 · Y Combinator — Emergent: Six Months of Tinkering → $100M ARR (4 insights → founders, ai-agents)
- 2026-06-06 · SaaStr AI — Feature Differentiation Is Dead (Elena Verna / Lovable) (4 insights → discovery, ai-agents, ai-and-pm)
- 2026-06-06 · Y Combinator — How Legora Went From YC to $100M ARR in 18 Months (5 insights → growth, founders, discovery, ai-agents)
- 2026-06-05 · How I AI — Conductor CEO Charlie Holtz's AI Coding Setup (5 insights → ai-agents)
- 2026-06-04 · How I AI — I cloned myself with Gemini Omni in 15 minutes (5 insights → ai-agents)
- 2026-06-04 · Aakash Gupta — I Made an OpenAI PM Teach Me Codex For 67 Minutes (5 insights → ai-and-pm, ai-agents)

## Cross-theme links

- AI agents ↔ B2B SaaS — Shipper's bifurcation (`pi-4D3hDmGhFhA-01`) ties to SaaS-for-agents (`pi-4D3hDmGhFhA-04`)
- AI agents ↔ Leadership — agent gardeners (`pi-4D3hDmGhFhA-02`) corroborate the automation paradox (`pi-4D3hDmGhFhA-05`)
- Founders ↔ Growth — native-AI lean firms (`pi-AiM9mZCmVPY-02`) and the DoorDash-win pattern (`pi-2Ap1dnv-GXA-04`) are the same story
- Tech frontier ↔ Growth — token-price collapse (`pi-dtuPovnf4XQ-04`) is the macro behind the "token path" GTM rule (`pi-AiM9mZCmVPY-04`); Evans's commodity-foundation-models claim (`pi-BD3vLtWhT5A-03`) is the same story from the app-layer side
- Tech frontier ↔ Founders — OpenAI Foundation $130–260B (`pi-aMyubFA106U-03`) + Anthropic S-1 trillion caps (`pi-hyeoYsVl1No-04`) = the same capital-concentration arc
- AI agents ↔ Tech frontier — Opus 4.8 benchmark wins (`pi-aMyubFA106U-01`) vs. the hands-on Opus 4.8 review finding the "last 10%" gap (`pi-h0gZf1hL4D4-01..05`): same release, opposite story
- Discovery ↔ AI agents — proprietary context as the moat (`pi-kdHU-jPxDHw-03`) is the agent-side mirror of "data + workflows" durability (`pi-mjmswQurIU4-05`, `pi-kdHU-jPxDHw-02`)
- Tech frontier internal — two federal-review attempts (`pi-dtuPovnf4XQ-02` scuttled 90-day → `pi-hyeoYsVl1No-01` voluntary 30-day) bracket the regulatory range

## Channels tracked

a16z · Y Combinator · SaaStr AI · Lenny's Podcast · Peter H. Diamandis · How I AI · Aakash Gupta
_(the `channel` field on every insight; canonical name→slug map in `_meta/themes.json`)_

## Plumbing

- Engine: `.claude/skills/podcast-insights/` — sweep (`/podcast-insights`), single (a date or `_inbox/<file>.json`), pasted.
- Capture: n8n commits each morning's cards to `_inbox/<stamp>.json` (Path A). Fallback: parse the "Youtube podcasts digest" Gmail. See `automations/podcast-knowledge/README.md`.
- Ledger: `_meta/processed.txt` (one stable insight-ID per line). Theme registry + channel map: `_meta/themes.json`.
- Scheduler: daily claude.ai cloud routine ~08:03 Europe/Kyiv (laptop-independent); the same skill runs locally as fallback.
- Invariant: `index.md` + one theme page = everything Alex's feed has said on that theme, with clickable sources, without opening a single episode card.
