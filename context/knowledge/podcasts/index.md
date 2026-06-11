# Podcast insights — map

Self-updating knowledge base of insights mined from Alex's tracked AI / product / startup / SaaS podcasts. Built by the `podcast-insights` skill (`/podcast-insights`) from the daily digest pipeline (`automations/podcast-streaming`). Insights are claim-shaped, evidence-bound, and deep-link to the exact moment in the source video. **Themes are the unit of navigation**; the per-episode cards under `episodes/` are provenance only.

**For agents:** to answer "what has Alex's podcast feed said about X" — `grep -ri "<concept>" context/knowledge/podcasts/themes/`, open the matching theme page, follow an insight's ▶ link to the source moment or its `episodes/` card for full context. An insight ID (`pi-…`) anywhere resolves with `grep -r pi-… context/knowledge/podcasts/`. Update only via `/podcast-insights` — don't hand-edit theme pages.

_updated: 2026-06-11 · 0 insights · 8 themes (seeded) · 0 episodes — awaiting first digest_

## Themes

| Theme | Insights | Last added | One-line |
|---|---|---|---|
| AI agents & applications | 0 | - | what's being built with agents/LLMs and where value accrues |
| AI & the PM craft | 0 | - | how AI reshapes product management work, skills, and roles |
| Product discovery & strategy | 0 | - | discovery, prioritization, roadmap, positioning, strategy |
| Growth, GTM & pricing | 0 | - | growth loops, distribution, GTM motions, pricing, packaging |
| Founders & fundraising | 0 | - | founding, company building, YC-style playbooks, raising |
| B2B SaaS & scaling | 0 | - | SaaS metrics, enterprise motion, scaling orgs and revenue |
| Leadership, careers & teams | 0 | - | leadership, hiring, org design, careers, ways of working |
| Tech frontier & abundance | 0 | - | frontier/deep tech, longevity, energy, the big-picture future |

_Seeded themes anchor day-1 clustering; their pages appear under `themes/` once the first insight lands. New themes are born when ≥3 insights in a digest form a coherent cluster that fits none of these._

## Recent (last 7 days)

- _(none yet)_

## Cross-theme links

- _(none yet)_

## Channels tracked

a16z · Y Combinator · SaaStr AI · Lenny's Podcast · Peter H. Diamandis · How I AI · Aakash Gupta
_(the `channel` field on every insight; canonical name→slug map in `_meta/themes.json`)_

## Plumbing

- Engine: `.claude/skills/podcast-insights/` — sweep (`/podcast-insights`), single (a date or `_inbox/<file>.json`), pasted.
- Capture: n8n commits each morning's cards to `_inbox/<stamp>.json` (Path A). Fallback: parse the "Youtube podcasts digest" Gmail. See `automations/podcast-knowledge/README.md`.
- Ledger: `_meta/processed.txt` (one stable insight-ID per line). Theme registry + channel map: `_meta/themes.json`.
- Scheduler: daily claude.ai cloud routine ~08:03 Europe/Kyiv (laptop-independent); the same skill runs locally as fallback.
- Invariant: `index.md` + one theme page = everything Alex's feed has said on that theme, with clickable sources, without opening a single episode card.
