# Y Combinator — Circleback CEO Ali Haghani: Recording Company Meetings Will Become The Norm

_source: youtube · channel: Y Combinator · published: 2026-08-11_
_video: https://www.youtube.com/watch?v=4YWO4sSRrTE_
_guests: Ali Haghani (CircleBack)_
_captured: 2026-08-12 (Path A) · digest run 20260812T0402_

## Summary
Ali Haghani, CEO of CircleBack, argues that as LLMs and AI agents take on more work, companies will default to recording and sharing conversational context because agents need that history to act effectively. He explains how CircleBack uses recordings to replace manual workflows (hiring, CRM, prep), the product practices that make automatic notes useful, and the practical guardrails he enforces for AI agents in engineering and ops.

## Insights extracted (4)

- `pi-4YWO4sSRrTE-01` — **Recording meetings will become default because agents need conversational context** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Haghani says the marginal cost of not recording is rising as LLMs and AI agents are assigned tasks that require historical context; without recordings an agent "works in isolation" and makes worse decisions. He argues companies will increasingly "default to recording everything" and to sharing context selectively across teams, while investing in controls so sensitive one-on-ones aren't inadvertently broadcast. That shift makes meeting capture a foundational piece of knowledge infrastructure rather than an optional convenience.
  - anchor: "I think as LLMs become more capable" · t=784 · [▶ 13:04](https://www.youtube.com/watch?v=4YWO4sSRrTE&t=784)

- `pi-4YWO4sSRrTE-02` — **AI meeting notes must be opinionated, precise, and action-focused** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: CircleBack trains evals and prompts to produce notes that read like a person and avoid generic filler — they explicitly eliminate words like "discussed" because it adds no value. They also filter action items so things completed during the meeting aren't duplicated as follow-ups, reducing noise and improving signal for teammates. This product discipline is used as a key differentiator: better, concise notes make downstream automation and agent behavior reliable.
  - anchor: "we really try to never have our notes say" · t=617 · [▶ 10:17](https://www.youtube.com/watch?v=4YWO4sSRrTE&t=617)

- `pi-4YWO4sSRrTE-03` — **Recorded conversation data can replace traditional ATS/CRM workflows** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Haghani describes using CircleBack as his personal ATS and CRM: person pages show full timelines of emails and meetings, a YC company page aggregates all touchpoints, and action-item views surface outstanding follow-ups. He gave concrete examples — using CircleBack to prep for this interview by auto-reading past emails and meetings, and jumping to customer meeting recordings to extract wishes and tasks — showing recordings can centralize recruitment, sales, and customer feedback workflows.
  - anchor: "I kind of use it as my ATS." · t=176 · [▶ 2:56](https://www.youtube.com/watch?v=4YWO4sSRrTE&t=176)

- `pi-4YWO4sSRrTE-04` — **Let agents build code end-to-end, but humans must architect and approve** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Ali reports heavy use of orchestrating AI agents to write and scaffold code, with his role shifting toward review and high-leverage decisions. However, he enforces strict guardrails: agents can draft copy and implement features, but humans must design architecture and handle security or data-access decisions; for instance, agents never send emails autonomously. This balances productivity gains from automation with the need for human judgment on sensitive or structural work.
  - anchor: "Never send an email on its own." · t=746 · [▶ 12:26](https://www.youtube.com/watch?v=4YWO4sSRrTE&t=746)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
