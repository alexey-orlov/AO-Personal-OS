# How I AI — How the OpenAI team uses ChatGPT Sites daily

_source: youtube · channel: How I AI · published: 2026-10-05_
_video: https://www.youtube.com/watch?v=kz5Cpomk3HA_
_guests: Kat (Product Manager, Sites)_
_captured: 2026-10-06 (Path A) · digest run 20261006T0402_

## Summary
An OpenAI product manager demonstrates how the internal team uses ChatGPT Sites and connected plugins to build workflows, apps, and playful projects. The throughline is that Sites + Codex turn static web pages into deployable, connector-backed applications that show per-team data, host plugins, and can be used for everything from incident dashboards to automated playlists and games. The talk emphasizes practical examples, deployment and infrastructure choices, and creative uses that reveal Sites as both a productivity and creative platform.

## Insights extracted (6)

- `pi-kz5Cpomk3HA-01` — **Sites let visitors use a site's connected plugins and only see their data** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Sites support connected plugins so any visitor can interact with the integrations attached to that site, and the site surfaces only the visitor's own data. This design removes the need for users to provision API keys or manual integration steps—connections are authorized when a user logs in and the site fetches data for that user's team. It's important because it preserves data isolation while making third-party data sources (Slack, Notion, calendars) feel native in a shared site.
  - anchor: "تتيح هذه الميزة لأي شخص زيارة موقعك واستخدام الإضافات المتصلة به" · t=- · [▶ video](https://www.youtube.com/watch?v=kz5Cpomk3HA)

- `pi-kz5Cpomk3HA-02` — **A single shared Site can display different data per team** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: When you share a Site across teams, everyone sees the same pages and UX, but the content is populated from the connectors tied to their team, so each team gets its own dataset. Kat shows that if the Decider incident site is opened by another team, the site will query that team's Slack, Notion, or data warehouse and render their incidents, not OpenAI's. This lets organizations reuse one deployed UI while maintaining team-level isolation of sensitive data.
  - anchor: "سيشاهدون نفس الموقع تمامًا، لكن المحتوى سيُعرض لهم بناءً على فريقهم" · t=- · [▶ video](https://www.youtube.com/watch?v=kz5Cpomk3HA)

- `pi-kz5Cpomk3HA-03` — **Teams use Sites as internal, connector-backed incident dashboards** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: OpenAI's Decider team built a Sites-based incident management UI that aggregates Slack channels, Notion runbooks, calendar events and shows a detailed timeline and ownership for each incident. The Site opens the relevant runbooks from Notion and lists which team members and tools are involved, letting managers monitor progress without interrupting the responders. This demonstrates Sites' value for synchronous and asynchronous operations where visibility and minimal interruption matter.
  - anchor: "أوامر إدارة الحوادث التي يستخدمها فريقي" · t=- · [▶ video](https://www.youtube.com/watch?v=kz5Cpomk3HA)

- `pi-kz5Cpomk3HA-04` — **Sites are becoming deployable infrastructure that can host plugins** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Beyond hosting pages, OpenAI announced Sites can host MCP plugins and serve as the runtime and distribution layer for apps built with Codex. Kat explains they moved from only generating files locally to providing publishing, storage (R2), and a database so Sites handle the last-mile deployment and hosting workloads. That makes Sites not just a front-end but a deployable platform for connectors, plugins, and small apps—reducing developer operational burden.
  - anchor: "أنه بإمكانكم استضافة إضافات MCP عبر Sites" · t=734 · [▶ 12:14](https://www.youtube.com/watch?v=kz5Cpomk3HA&t=734)

- `pi-kz5Cpomk3HA-05` — **People build personal automations—e.g., scheduled playlists that scrape Reddit** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Kat built a personal Site that scrapes Reddit for trending music, queries Spotify/Apple Music, and then automatically creates a playlist every Monday at 8am. She runs a scheduled job on her machine to assemble and play the list through Spotify, showing Sites can combine web scraping, connectors, scheduling and personal compute to automate recurring tasks. This example highlights how Sites aren't just internal tools but enable lightweight, personal applications that integrate many services.
  - anchor: "قمتُ ببرمجة التطبيق ليبحث في ريديت" · t=- · [▶ video](https://www.youtube.com/watch?v=kz5Cpomk3HA)

- `pi-kz5Cpomk3HA-06` — **Codex + Sites enable end-to-end app building from intent to deployment** → theme [Vibe Coding & Non-Technical Builders](../../themes/vibe-coding-and-non-technical-builders.md)
  - detail: Codex understands developer intent and can generate a complete Site that uses connectors (Notion, Slack, Snowflake) when asked, and Sites handle publishing and hosting, so the workflow goes from a natural-language request to a live app. Kat describes Codex asking follow-ups, wiring connectors automatically, and then Sites taking care of deployment and storage, which shortens prototype-to-production cycles. The non-obvious gain is reducing the manual glue work (file uploads, hosting, connector wiring) that usually slows internal tooling.
  - anchor: "تكمن روعة Sites و Codex في أن Sites كان أحد الأسباب" · t=408 · [▶ 6:48](https://www.youtube.com/watch?v=kz5Cpomk3HA&t=408)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
