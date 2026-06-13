# Every — How Anthropic Uses Claude Fable 5 With Mike Krieger

_source: youtube · channel: Every · published: 2026-06-10_
_video: https://www.youtube.com/watch?v=XWpTgCvgYaE_
_guests: Mike Krieger (Instagram co-founder)_
_captured: 2026-06-13 (Path A) · digest run 20260613T0402_

## Summary
Mike Krieger describes how Anthropic's Claude Fable 5 has shifted his day-to-day engineering: it can be delegated long-running, complex tasks, orchestrate multi-step engineering work, and even modify software. He argues this changes what software engineering looks like (more parallelism, more product/ownership emphasis) while raising new needs for verification, workflow abstractions, and sensible pricing.

## Insights extracted (5)

- `pi-XWpTgCvgYaE-01` — **You can safely delegate long-running engineering tasks to the model** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Krieger recounts routinely giving Fable complex jobs overnight—"wish Claude a good night, set it up on like a pretty complex task"—and waking to a completed implementation or a scaffolded fallback (e.g., temporary backend, documented caveats) that it tracked until dependent services returned. That persistent session capability turns the model into a teammate you can offload big chunks of work to, reducing iterative back-and-forth and enabling multi-hour or multi-day executions that previously required human supervision.
  - anchor: "wish Claude a good night, set it up on like a pretty complex task" · t=211 · [▶ 3:31](https://www.youtube.com/watch?v=XWpTgCvgYaE&t=211)

- `pi-XWpTgCvgYaE-02` — **Software engineering is becoming a different craft, not dead** → theme [Leadership, careers & teams](../../themes/leadership-careers-and-teams.md)
  - detail: Krieger says "software engineering is different. It is like dramatically changed," explaining that many traditional coding chores collapse into model-driven work while ownership, architecture decisions, incident response, and product intent remain human responsibilities. Engineers now spend more time on alignment, high-level design, production incident handling, and verifying model outputs rather than typing every line of code—so the role shifts toward orchestration and systems thinking.
  - anchor: "software engineering is different. It is like dramatically changed" · t=1144 · [▶ 19:04](https://www.youtube.com/watch?v=XWpTgCvgYaE&t=1144)

- `pi-XWpTgCvgYaE-03` — **Trusting models requires new verification and judgment workflows** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: He emphasizes that although Fable often 'does it right' in one shot, teams must build verification loops: attach screenshots, video captures, end-to-end test flows, and staging accounts to each model-generated pull request to confirm behavior in production. Krieger also highlights model discernment—Fable can push back on code-review feedback or choose pragmatic quick fixes versus long-term rearchitecting—so verification combines automated artifacts plus human review of trade-offs.
  - anchor: "there's still like a whole verification thing" · t=262 · [▶ 4:22](https://www.youtube.com/watch?v=XWpTgCvgYaE&t=262)

- `pi-XWpTgCvgYaE-04` — **Dynamic workflows let the model orchestrate multi-step engineering conversions** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: He describes creating a dynamic workflow that ported a Python codebase to TypeScript over a weekend: the workflow decomposed the job into spec, module-by-module translation, incremental testing, adversarial checks, and follow-up fixes. That orchestration—expressed as executable workflow code and runnable by the model—enables long-horizon, verified transformations that would be costly or impractical to do manually.
  - anchor: "it was the workflow was so cool" · t=2908 · [▶ 48:28](https://www.youtube.com/watch?v=XWpTgCvgYaE&t=2908)

- `pi-XWpTgCvgYaE-05` — **High per-run model cost restricts who uses the most capable models** → theme [Model reviews & benchmarks](../../themes/model-reviews-and-benchmarks.md) (corroboration of `pi-IREnr4I89Ho-01`)
  - detail: Krieger notes bluntly, "Fable is also very expensive," which forces users and companies to weigh per-turn costs against the value of fewer follow-ups because the model often completes tasks in one run. The expense shapes adoption: big professional teams can justify it when it delivers outsized productivity, personal/hobbyist use becomes more measured, and product design must include sticky default model choices per surface to avoid runaway bills.
  - anchor: "Fable is also very expensive." · t=1610 · [▶ 26:50](https://www.youtube.com/watch?v=XWpTgCvgYaE&t=1610)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
