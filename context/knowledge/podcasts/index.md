# Podcast insights — map

Self-updating knowledge base of insights mined from Alex's tracked AI / product / startup / SaaS podcasts. Built by the `podcast-insights` skill (`/podcast-insights`) from the daily digest pipeline (`automations/podcast-streaming`). Insights are claim-shaped, evidence-bound, and deep-link to the exact moment in the source video. **Themes are the unit of navigation**; the per-episode cards under `episodes/` are provenance only.

**For agents:** to answer "what has Alex's podcast feed said about X" — `grep -ri "<concept>" context/knowledge/podcasts/themes/`, open the matching theme page, follow an insight's ▶ link to the source moment or its `episodes/` card for full context. An insight ID (`pi-…`) anywhere resolves with `grep -r pi-… context/knowledge/podcasts/`. Update only via `/podcast-insights` — don't hand-edit theme pages.

_updated: 2026-06-11 · 3 insights · 8 themes · 2 episodes_

## Themes

| Theme | Insights | Last added | One-line |
|---|---|---|---|
| [AI agents & applications](themes/ai-agents-and-applications.md) | 1 | 2026-06-11 | capability is solved; reliability is the 2026 product problem |
| [AI & the PM craft](themes/ai-and-the-pm-craft.md) | 2 | 2026-06-11 | PMs become taste-curators; write evals before the feature |
| Product discovery & strategy | 0 | - | discovery, prioritization, roadmap, positioning, strategy |
| Growth, GTM & pricing | 0 | - | growth loops, distribution, GTM motions, pricing, packaging |
| Founders & fundraising | 0 | - | founding, company building, YC-style playbooks, raising |
| B2B SaaS & scaling | 0 | - | SaaS metrics, enterprise motion, scaling orgs and revenue |
| Leadership, careers & teams | 0 | - | leadership, hiring, org design, careers, ways of working |
| Tech frontier & abundance | 0 | - | frontier/deep tech, longevity, energy, the big-picture future |

## Recent (last 7 days)

- 2026-06-11 · a16z — Agents in production (John Roe) → [AI agents & applications](themes/ai-agents-and-applications.md), [AI & the PM craft](themes/ai-and-the-pm-craft.md)
- 2026-06-10 · Lenny's Podcast — The AI PM playbook (Jane Doe) → [AI & the PM craft](themes/ai-and-the-pm-craft.md)

## Cross-theme links

- [AI & the PM craft](themes/ai-and-the-pm-craft.md) ↔ [AI agents & applications](themes/ai-agents-and-applications.md) — evals-first PM workflow ↔ reliability-as-product engineering

## Channels tracked

a16z · Y Combinator · SaaStr AI · Lenny's Podcast · Peter H. Diamandis · How I AI · Aakash Gupta
_(the `channel` field on every insight; canonical name→slug map in `_meta/themes.json`)_

## Plumbing

- Engine: `.claude/skills/podcast-insights/` — sweep (`/podcast-insights`), single (a date or `_inbox/<file>.json`), pasted.
- Capture: n8n commits each morning's cards to `_inbox/<stamp>.json` (Path A). Fallback: parse the "Youtube podcasts digest" Gmail. See `automations/podcast-knowledge/README.md`.
- Ledger: `_meta/processed.txt` (one stable insight-ID per line). Theme registry + channel map: `_meta/themes.json`.
- Scheduler: daily claude.ai cloud routine ~08:03 Europe/Kyiv (laptop-independent); the same skill runs locally as fallback.
- Invariant: `index.md` + one theme page = everything Alex's feed has said on that theme, with clickable sources, without opening a single episode card.
