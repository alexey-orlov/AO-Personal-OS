# Every — How I Built an AI Software Factory With Fable 5

_source: youtube · channel: Every · published: 2026-06-11_
_video: https://www.youtube.com/watch?v=rYX6m4gIys0_
_guests: —_
_captured: 2026-06-13 (Path A) · digest run 20260613T0402_

## Summary
A developer demos an automated "software factory" built around Fable that turns Slack feedback and rich recordings into pull requests and code fixes. He explains the pipeline: capture rich feedback with an open-source recorder, schedule batch processing of Slack input, have Fable/compound engineering generate and refine PRs, and then review/merge—sometimes fully automated overnight. The central claim is that this combo turns tedious triage and many small PRs into a manageable, improving flow that can ship while you sleep.

## Insights extracted (5)

- `pi-rYX6m4gIys0-01` — **Fable can automatically turn feedback into fixes and PRs** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: He uses Fable to read structured feedback, synthesize fixes, and create pull requests that include video walkthroughs of changes. In practice he kicks off the pipeline, Fable applies fixes in a branch and produces an artifact showing what changed, and he often just reviews and merges rather than hand-coding each fix. The result is a dramatic increase in feature-velocity: multiple reported items become a single, reviewable PR instead of many separate manual tasks.
  - anchor: "And with Fable it's very good at doing that" · t=387 · [▶ 6:27](https://www.youtube.com/watch?v=rYX6m4gIys0&t=387)

- `pi-rYX6m4gIys0-02` — **Rifreck captures richer feedback than a plain screen recording** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Rifreck is an open-source wrapper for React that records clicks, spoken narration, network requests, and errors into a sharable file instead of just a video. That richer trace makes automated analysis possible: the pipeline can replay interactions or inspect requests and errors to produce more precise fixes. Having structured recordings in Slack is the input that lets the automation reason about what to change rather than guessing from a short video.
  - anchor: "It uh records what you're clicking on. It records what you're saying." · t=171 · [▶ 2:51](https://www.youtube.com/watch?v=rYX6m4gIys0&t=171)

- `pi-rYX6m4gIys0-03` — **Batch-processing Slack feedback twice daily keeps review manageable** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: He runs a scheduled task that scrapes Slack messages in the morning and evening, classifies items, downloads recordings, and writes YAML/markdown records for each issue. Those batches are then fed into a Cursor/compound-engineering flow that attempts fixes and leaves notes where human input is required, turning dozens of small reports into a few reviewable PRs. The batching reduces context-switching and makes it feasible for one person to validate many fixes rather than reviewing many tiny PRs.
  - anchor: "it goes through slack just reads everything and structures it" · t=119 · [▶ 1:59](https://www.youtube.com/watch?v=rYX6m4gIys0&t=119)

- `pi-rYX6m4gIys0-04` — **Compound engineering prevents repeating the same automation mistakes** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: The pipeline includes a compound step that uses prior runs to refine behavior, so when the system makes an error it learns not to repeat that same mistake on subsequent runs. He notes that iterative refinement means the automation improves over time, reducing the manual corrections you must make during review. That learning loop is what turns a brittle script into an increasingly reliable assistant.
  - anchor: "it will also not make the same mistake the next time" · t=404 · [▶ 6:44](https://www.youtube.com/watch?v=rYX6m4gIys0&t=404)

- `pi-rYX6m4gIys0-05` — **You can safely auto-merge overnight if CI passes** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: He demonstrated kicking off the flow with an instruction like 'if everything looks good and the CI is green, merge it,' letting the system work overnight and waking to merged changes. In his example, the automated run finished while he slept and a teammate reported the design looked good the next morning—showing the process can produce deployable, high-quality updates without active daytime supervision. He does note the runs can take a few hours, but that latency is an acceptable tradeoff for asynchronous automation.
  - anchor: "if everything looks good uh and the CI is green, merge it" · t=429 · [▶ 7:09](https://www.youtube.com/watch?v=rYX6m4gIys0&t=429)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
