# Podcast insights — map

Self-updating knowledge base of insights mined from Alex's tracked AI / product / startup / SaaS podcasts. Built by the `podcast-insights` skill (`/podcast-insights`) from the daily digest pipeline (`automations/podcast-streaming`). Insights are claim-shaped, evidence-bound, and deep-link to the exact moment in the source video. **Themes are the unit of navigation**; the per-episode cards under `episodes/` are provenance only.

**For agents:** to answer "what has Alex's podcast feed said about X" — `grep -ri "<concept>" context/knowledge/podcasts/themes/`, open the matching theme page, follow an insight's ▶ link to the source moment or its `episodes/` card for full context. An insight ID (`pi-…`) anywhere resolves with `grep -r pi-… context/knowledge/podcasts/`. Update only via `/podcast-insights` — don't hand-edit theme pages.

_updated: 2026-06-11 · 41 insights · 8 themes · 7 episodes — backfill in progress_

## Themes

| Theme | Insights | Last added | One-line |
|---|---|---|---|
| [AI agents & applications](themes/ai-agents-and-applications.md) | 13 | 2026-05-31 | what's being built with agents/LLMs and where value accrues |
| [AI & the PM craft](themes/ai-and-the-pm-craft.md) | 1 | 2026-05-26 | how AI reshapes product management work, skills, and roles |
| [Product discovery & strategy](themes/product-discovery-and-strategy.md) | 1 | 2026-05-30 | discovery, prioritization, roadmap, positioning, strategy |
| [Growth, GTM & pricing](themes/growth-gtm-and-pricing.md) | 3 | 2026-05-30 | self-service as a primary channel, "token path" as the GTM constraint |
| [Founders & fundraising](themes/founders-and-fundraising.md) | 10 | 2026-05-30 | mission-control governance + the AI cycle's lean, concentrated outcomes |
| [B2B SaaS & scaling](themes/b2b-saas-and-scaling.md) | 1 | 2026-05-26 | SaaS metrics, enterprise motion, scaling orgs and revenue |
| [Leadership, careers & teams](themes/leadership-careers-and-teams.md) | 2 | 2026-05-26 | the automation paradox: managers coach, total work goes up |
| [Tech frontier & abundance](themes/tech-frontier-and-abundance.md) | 10 | 2026-05-31 | algorithmic gains + token-price collapse + the social/policy catch-up |

## Recent (last 7 days)

- 2026-05-31 · Peter H. Diamandis — Pope Leo vs. AI, GPT 5.5 Beats Claude (5 insights → tech-frontier, ai-agents)
- 2026-05-30 · a16z — The Rule for Picking AI Winners (5 insights → founders, growth, tech-frontier)
- 2026-05-30 · Y Combinator — Why Two IIT Engineers Turned Down $550K Jobs (6 insights → founders, growth, ai-agents, discovery)
- 2026-05-29 · How I AI — No hype Claude Opus 4.8 review (5 insights → ai-agents)
- 2026-05-29 · Y Combinator — Inference, Diffusion, World Models | Paper Club (5 insights → tech-frontier)

## Cross-theme links

- AI agents ↔ B2B SaaS — Shipper's bifurcation (`pi-4D3hDmGhFhA-01`) ties to SaaS-for-agents (`pi-4D3hDmGhFhA-04`)
- AI agents ↔ Leadership — agent gardeners (`pi-4D3hDmGhFhA-02`) corroborate the automation paradox (`pi-4D3hDmGhFhA-05`)
- Founders ↔ Growth — native-AI lean firms (`pi-AiM9mZCmVPY-02`) and the DoorDash-win pattern (`pi-2Ap1dnv-GXA-04`) are the same story
- Tech frontier ↔ Growth — token-price collapse (`pi-dtuPovnf4XQ-04`) is the macro behind the "token path" GTM rule (`pi-AiM9mZCmVPY-04`)

## Channels tracked

a16z · Y Combinator · SaaStr AI · Lenny's Podcast · Peter H. Diamandis · How I AI · Aakash Gupta
_(the `channel` field on every insight; canonical name→slug map in `_meta/themes.json`)_

## Plumbing

- Engine: `.claude/skills/podcast-insights/` — sweep (`/podcast-insights`), single (a date or `_inbox/<file>.json`), pasted.
- Capture: n8n commits each morning's cards to `_inbox/<stamp>.json` (Path A). Fallback: parse the "Youtube podcasts digest" Gmail. See `automations/podcast-knowledge/README.md`.
- Ledger: `_meta/processed.txt` (one stable insight-ID per line). Theme registry + channel map: `_meta/themes.json`.
- Scheduler: daily claude.ai cloud routine ~08:03 Europe/Kyiv (laptop-independent); the same skill runs locally as fallback.
- Invariant: `index.md` + one theme page = everything Alex's feed has said on that theme, with clickable sources, without opening a single episode card.
