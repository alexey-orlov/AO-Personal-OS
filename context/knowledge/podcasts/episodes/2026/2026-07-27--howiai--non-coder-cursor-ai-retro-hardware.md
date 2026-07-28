# How I AI — How this "non-coder" used Cursor to add AI to retro hardware

_source: youtube · channel: How I AI · published: 2026-07-27_
_video: https://www.youtube.com/watch?v=KCGKb3huDsY_
_guests: MaddieDReese (maker)_
_captured: 2026-07-28 (Path A) · digest run 20260728T0404_

## Summary
A maker named Maddie explains how she used Cursor (a conversational coding/IDE tool) to brainstorm, plan purchases, and implement playful hardware projects that integrate AI. She demonstrates three concrete builds—a web-to-thermal-printer message system, a Twitter→pager bridge, and a personal "Maddie API"—and argues that no-code/AI tooling lowers the barrier to building meaningful physical experiences. The throughline: accept messy multi-step engineering when it gets you a delightful endpoint, but apply a trust‑but‑verify discipline to hardware buys and designs.

## Insights extracted (4)

- `pi-KCGKb3huDsY-01` — **No-code AI tools let non-coders design hardware-integrated products** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: Maddie used Cursor as a conversational design and implementation partner—dumping her project idea into it, brainstorming questions, and getting a shopping list and implementation plan—then wired a Raspberry Pi to a mini thermal receipt printer to accept web messages (maddiedeere.com/message). The evidence is concrete: she built a public message form that logs to a Convex database and prints instantly on her desk, showing that modern LLM-driven tools can turn high-level ideas into end-to-end physical prototypes without deep formal coding skills. That matters because it changes who can invent interactive hardware experiences: not just professional firmware engineers but curious makers.
  - anchor: "I just dumped everything out from my brain into Cursor." · t=428 · [▶ 7:08](https://www.youtube.com/watch?v=KCGKb3huDsY&t=428)

- `pi-KCGKb3huDsY-02` — **Trust-but-verify with AI prevents bad hardware purchases** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: She relies on Cursor to recommend parts but always double- or triple-checks before buying—catching a few wrong wire or part suggestions during that verification step. The procedure is pragmatic: ask the agent targeted 'what if' questions to probe edge cases, then validate compatibility manually, which minimized wasted purchases while still letting the AI accelerate decision-making. The non-obvious takeaway is that AI accelerates procurement only when paired with simple human QA practices.
  - anchor: "I make sure to double or triple check." · t=533 · [▶ 8:53](https://www.youtube.com/watch?v=KCGKb3huDsY&t=533)

- `pi-KCGKb3huDsY-03` — **Messy multi-step cloud chains can connect modern APIs to retro pagers** → theme [Physical abundance signals](../../themes/physical-abundance-signals.md)
  - detail: To revive a 1990s pager on the Spok paging network, Maddie accepted an inelegant but working chain: Twitter events → Cloudflare Worker → Resend email → Gmail → pager email address → pager display. She bought the pager from an authorized reseller (the paging network won't sell end-user devices directly) and tolerated legacy quirks like restrictive pager email domains to reach the physical endpoint. The practical insight: when the goal is a delightful endpoint (a beeping pager), coherence and elegance of the pipeline can be sacrificed for feasibility—especially for playful projects.
  - anchor: "every interaction that anyone has with my Twitter account" · t=831 · [▶ 13:51](https://www.youtube.com/watch?v=KCGKb3huDsY&t=831)

- `pi-KCGKb3huDsY-04` — **Personal APIs let agents handle small social coordination tasks** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Maddie built a 'Maddie API' to expose preferred social details—coffee order, pets, favorite restaurants, time zone—so others (or their software agents) can personalize gestures without interrupting her. She frames this as reducing friction: instead of asking someone for their coffee order, an agent can hit the API and arrange a treat or reservation automatically. The implication is forward-looking: as agents take on scheduling and gifting tasks, small personal APIs become useful primitives for frictionless, human-centered automation.
  - anchor: "hit an API and you get all of this" · t=1188 · [▶ 19:48](https://www.youtube.com/watch?v=KCGKb3huDsY&t=1188)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
