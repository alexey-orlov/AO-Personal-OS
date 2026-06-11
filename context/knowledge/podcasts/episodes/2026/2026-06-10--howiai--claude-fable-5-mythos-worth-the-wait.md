# How I AI — Claude Fable 5 - is this Mythos model worth the wait?

_source: youtube · channel: How I AI · published: 2026-06-10_
_video: https://www.youtube.com/watch?v=IREnr4I89Ho_
_guests: —_
_captured: 2026-06-11 (Path A) · digest run 20260610T0402_

## Summary
The video tests Anthropic's Fable 5 (a Mythos-class model) across real tasks and product workflows, arguing it's a state-of-the-art, benchmark-crushing model that shines on long-horizon technical problems and vision/document formatting but comes with meaningful trade-offs. The host's throughline: use Fable for hard, detail-heavy execution and long-running agent work, but expect high token costs, conservative/overly thorough outputs that can be hard to read, and some orchestration stability issues.

## Insights extracted (5)

- `pi-IREnr4I89Ho-01` — **Fable 5 consumes roughly twice the tokens of other models** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Anthropic states Fable uses about 2x the rate limits and tokens compared with other models, and the reviewer observed heavy token burn while running on the highest 'extra high' setting. They recommend 'high' as the practical sweet spot because running at maximum quality rapidly increases cost without guaranteed proportional benefit. This matters because teams must match model "effort level" to task complexity to control cloud expense and ROI.
  - anchor: "—" · t=185 · [▶ 3:05](https://www.youtube.com/watch?v=IREnr4I89Ho&t=185)

- `pi-IREnr4I89Ho-02` — **Built for multi-day, long-running workflows but reliability still uneven** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Fable 5 is designed to run "for days," spin up sub-agents, and support dynamic multi-agent workflows; the reviewer ran sessions lasting several hours and successfully kicked off multi-agent runs. However, they also experienced stalls and orchestration errors (one run stalled after ~3 hours) and suspect some issues lie in Claude Code rather than the model itself. So while the model's long-horizon capability is real and valuable for complex planning, teams must expect engineering work to make persistent agent runs robust.
  - anchor: "—" · t=209 · [▶ 3:29](https://www.youtube.com/watch?v=IREnr4I89Ho&t=209)

- `pi-IREnr4I89Ho-03` — **Fable overthinks like a 'seasoned engineer,' producing unreadable specs** → theme [AI & the PM craft](../../themes/ai-and-the-pm-craft.md)
  - detail: Anthropic positions Fable as working "like a seasoned engineer," which the reviewer found led to extremely thorough but dense and hard-to-parse outputs—long Markdown docs with deep internal references that make it difficult to zoom out. In practice that means Fable is great when exhaustive detail and correctness matter, but it's poor for readable PRDs or strategy where clarity and concision are more valuable. The non-obvious consequence: for many product tasks you should pair Fable with cheaper models (Opus/Sonnet) or use those for spec writing and reserve Fable for execution or automated review.
  - anchor: "—" · t=256 · [▶ 4:16](https://www.youtube.com/watch?v=IREnr4I89Ho&t=256)

- `pi-IREnr4I89Ho-04` — **Outstanding vision and document formatting compared to peers** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: The reviewer repeatedly found Fable 5 strong on vision tasks and PDF/document formatting: in a simple handwriting worksheet test Fable produced clearer spacing and layout than Opus 4A, and it parsed and formatted documents reliably. These wins were consistent across other document/vision checks, suggesting the model is especially well-suited for UI/UX automation, PDF transformation, and any task where output layout quality matters. That makes Fable a good choice when visual fidelity or structured document generation is a priority.
  - anchor: "—" · t=610 · [▶ 10:10](https://www.youtube.com/watch?v=IREnr4I89Ho&t=610)

- `pi-IREnr4I89Ho-05` — **Built-in safety classifiers with graceful fallback to Opus 4.8** → theme [AI agents & applications](../../themes/ai-agents-and-applications.md)
  - detail: Fable includes classifiers for sensitive categories (cybersecurity, biology, chemistry) and implements a fallback that downgrades flagged requests to Opus 4.8 instead of outright blocking them; the API supports this parameter. Anthropic keeps 30-day retention logs for misuse detection and says 95% of sessions did not trigger fallbacks, and Mythos-level access remains restricted to vetted partners while Fable is generally available. Practically, that means enterprises get a safety-first fringe: high-capability outputs plus a controlled downgrade path that preserves continuity and pricing predictability.
  - anchor: "—" · t=423 · [▶ 7:03](https://www.youtube.com/watch?v=IREnr4I89Ho&t=423)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
