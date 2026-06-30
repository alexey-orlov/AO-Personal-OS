# Agentic AI minimal stack (Gusto: Cloudflare Workers + Vercel AI SDK) — research brief

_question: Can agentic AI products run on a minimal stack without a custom agent platform? What did Gusto actually build?_
_date: 2026-06-30 · sources: 5 · provenance: [drop](../../../../context/_inbox/processed/tg-20260630-074509-168.md)_

## TL;DR

Yes, confirmed. Gusto's Cofounder product (launched June 2, 2026) runs its entire agent loop on Cloudflare Workers + Vercel AI SDK, with memory and artifacts as simple database columns or custom in-house bits — no proprietary orchestration layer, no third-party agent framework. Built by 4 engineers + 1 designer in 9–10 weeks. Source: Eddie Kim (CTO) directly on Lenny's Newsletter. The broader pattern — abandoning LangChain/custom platforms for Vercel AI SDK's built-in tool loop — is documented practitioner consensus. Cloudflare formalized the architecture with its own Agents SDK (Agents Week, Apr–Jun 2026).

## What's known

1. **Gusto Cofounder stack confirmed** [Fact / primary — Eddie Kim, CTO, Lenny's Newsletter "No Figma. No Jira. No docs."]: agent loop on Cloudflare Workers (compute) + Vercel AI SDK (`generateText`/`streamText` with `maxSteps`); memory and artifacts as DB columns or bespoke in-house bits; no proprietary orchestration layer. LLM routes to Anthropic API (team built with Claude Code throughout) [Inference — not stated explicitly in available excerpts].
2. **Vercel AI SDK agent loop mechanics** [Fact / vendor primary — Vercel docs]: `maxSteps` / `stopWhen` handle the loop natively — SDK appends tool results to conversation history and re-calls the model until a text response or step limit. Architecturally simpler than LangChain-style graph orchestration; no custom loop code required.
3. **Cloudflare Workers + Vercel AI SDK integration is official** [Fact / vendor primary — Cloudflare docs + `cloudflare/workers-ai-provider` GitHub]: Cloudflare maintains a dedicated Vercel AI SDK section in Workers AI docs. Known friction: SDK assumes `process.env`; Workers require factory functions + environment bindings. [Practitioner commentary — Indie Hackers community]
4. **Cloudflare formalized the pattern post-Gusto** [Fact / vendor primary — Cloudflare Agents Week Apr–Jun 2026]: Agents SDK on Durable Objects adds built-in SQLite per agent, WebSocket, scheduling, hibernation — the "platform" version of what Gusto hand-built with DB columns.
5. **Broader movement away from heavy frameworks** [Practitioner consensus — Indie Hackers, practitioner blogs]: teams abandoning LangChain/custom orchestration for Vercel AI SDK's built-in tool loop; pattern recurring across multiple independent practitioner accounts.
6. **Build context** [Fact / primary — Gusto PR Newswire, June 2 2026]: Gusto Cofounder = proactive AI teammate for SMBs (payroll / compliance / HR); 20+ pre-built automations; 4 engineers + 1 designer, 9–10 weeks from zero code to launch, no PM / Figma / Jira / specs.

## For Alex

- **SoftServe agentic SME**: clean counterexample to "you need a custom agent platform." When advising Oracle/NVIDIA clients or scoping a Bosch-type POC — the minimal CF Workers + Vercel AI SDK stack is a credible, production-proven starting point for S-tier ("prove AI value") engagements.
- **SoftServe packaging**: the base-pack / S-tier model maps well to this architecture — worth naming as the default stack reference in the AI-use-case pod definition (due week of Jun 29).
- **Personal OS**: validates the "in-house bits" approach Alex is already running — no dedicated memory/artifact platform needed at this scale.

## Go deeper

- [Lenny's Newsletter — Eddie Kim, CTO of Gusto](https://www.lennysnewsletter.com/p/no-figma-no-jira-no-docs-how-gusto) — primary source; paywalled but definitive account of the stack and build philosophy.
- [Cloudflare: Building AI Agents on Cloudflare](https://blog.cloudflare.com/build-ai-agents-on-cloudflare/) — vendor-primary; Agents SDK formalizes what Gusto built by hand.
- [Cloudflare Workers AI — Vercel AI SDK integration docs](https://developers.cloudflare.com/workers-ai/configuration/ai-sdk/) — technical integration guide; friction points documented here.

## Gaps & caveats

- Lenny's Newsletter is paywalled; "database columns" wording sourced from search-engine excerpts, not the article text directly. High confidence given consistency across independent queries. ⚠ verbatim not verified.
- "In-house bits" underspecified — what exactly was custom (tool dispatch, streaming UI, auth layer?) has no public documentation beyond the Lenny's episode. ⚠ gap.
- Cloudflare Workers (compute) ≠ Cloudflare Workers AI (inference) — the agent loop runs on Workers; the LLM call almost certainly goes to Anthropic's API directly, not Workers AI inference. Distinction matters when replicating the architecture.
- No Gusto engineering blog post on this topic exists as of 2026-06-30 — the Lenny's interview is the sole detailed public source.
