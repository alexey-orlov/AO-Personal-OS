# Every — Microsoft's Vision for an Internet Made for Agents With CTO Kevin Scott (Best of the Pod)

_source: youtube · channel: Every · published: 2026-08-12_
_video: https://www.youtube.com/watch?v=jBGo33Jkids_
_guests: Kevin Scott (Microsoft)_
_captured: 2026-08-13 (Path A) · digest run 20260813T0402_

## Summary
Kevin Scott (Microsoft CTO) explains that current large models are more capable than the products built from them, creating a "capability overhang" that the industry must close. He argues the next wave is an "agentic web": simple, open protocols (like MCP and NL Web) plus persistent agent memory, identity and entitlements so agents can act on users' behalf and access distributed resources securely and at scale.

## Insights extracted (5)

- `pi-jBGo33Jkids-01` — **Model reasoning outpaces current product usage** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Scott calls a "capability overhang" the situation where the reasoning abilities of models exceed how they're actually used in products. He says that while scaling laws were a hot topic before, the practical work now is to bridge the gap between model capability and the real product-level engineering (memory, tooling, protocols) needed to unlock that capability. Closing that gap will determine how much value users actually get from large models.
  - anchor: "the reasoning capabilities of the models has" · t=169 · [▶ 2:49](https://www.youtube.com/watch?v=jBGo33Jkids&t=169)

- `pi-jBGo33Jkids-02` — **An agentic web needs simple open protocols like HTTP did** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Scott argues agents will only be broadly useful if there's an ecosystem—protocols and formats—that lets agents discover and interact with diverse services (APIs, sites, data sources) the same way the web did. He points to MCP and NL Web as nascent, lightweight primitives analogous to HTTP/HTML that let providers "wire up" to an agentic world without heavy vertical integration. If these primitives reach ubiquity, agents can compose capabilities across the internet rather than being locked into single-vendor stacks.
  - anchor: "super awesome simple open protocols like MCP" · t=333 · [▶ 5:33](https://www.youtube.com/watch?v=jBGo33Jkids&t=333)

- `pi-jBGo33Jkids-03` — **Agents require persistent memory and identities to delegate** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: Current agents tend to be transactional and forgetful across sessions, which prevents effective delegation of multi-step or long-running tasks. Scott emphasizes the need for "agentic memory" and standardized identities/entitlement checks so an agent can say which systems it must touch, request the permissions it needs from the user, and operate coherently over time. Microsoft is pushing for internal standard protocols so teams don't "ship their org chart" (Conway's law) and to enable consistent agent behavior across services.
  - anchor: "we need better agentic memory" · t=238 · [▶ 3:58](https://www.youtube.com/watch?v=jBGo33Jkids&t=238)

- `pi-jBGo33Jkids-04` — **MCP's simplicity lets the community build security and entitlements** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Rather than baking a proprietary security model into MCP, Scott says its coherent simplicity makes it easier for the community to layer identities, entitlement flows, and permission prompts on top. He describes concrete patterns: agents having identities, asking users for permission to access specific resources, and having administrators approve agent activity across systems, and even AI-assisted local agents that triangulate suspicious events (he gives his wife's 2FA incident as an example). The implication: open protocols plus standard entitlements can balance permissionless innovation with enterprise-grade safety.
  - anchor: "it is so coherently simple" · t=624 · [▶ 10:24](https://www.youtube.com/watch?v=jBGo33Jkids&t=624)

- `pi-jBGo33Jkids-05` — **Agents will shift from synchronous to asynchronous, long-running work** → theme [Agent delegation, loops & software factories](../../themes/agent-delegation-and-loops.md)
  - detail: Scott predicts a move away from the current prompt-and-wait interaction model toward agents that run tasks over time—making many calls, integrating diverse responses, iterating, and then reporting progress back to the user. That shift enables agents to coordinate complex workflows (fetching data, modifying systems, negotiating permissions) without the user attending every step, which materially expands the kinds of problems agents can solve. This asynchronous capability depends on the memory, identity, and web plumbing he describes.
  - anchor: "from this synchronous mode of interaction" · t=1560 · [▶ 26:00](https://www.youtube.com/watch?v=jBGo33Jkids&t=1560)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
