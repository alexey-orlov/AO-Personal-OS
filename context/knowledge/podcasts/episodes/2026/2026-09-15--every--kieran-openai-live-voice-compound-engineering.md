# Every — Experiments with Kieran, OpenAI Live Voice inside Compound Engineering

_source: youtube · channel: Every · published: 2026-09-15_
_video: https://www.youtube.com/watch?v=lfKTjlI2Tmw_
_guests: —_
_captured: 2026-09-16 (Path A) · digest run 20260916T0405_

## Summary
The speaker prototypes adding real-time, voice-driven feedback into their Compound Engineering toolchain by combining a capture library (riffre) with OpenAI's Live Voice API and a 'polish' workflow. The throughline is moving from offline recordings (zip) to a streaming, low-latency pipeline that lets a front-end voice agent capture annotations and either apply small fixes immediately or batch work to a coding agent, with UX safeguards and evidence capture to keep changes understandable and safe.

## Insights extracted (5)

- `pi-lfKTjlI2Tmw-01` — **Riffre shifts from zip capture to live streaming for immediate signals** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Riffre started as a React package that records screen/DOM interactions and packaged them as zip files for later processing, but the presenter is converting it to a streaming mode so agents can act while the user interacts. Streaming delivers the 'golden' moments (clicks, annotations, audio) in near-real time, enabling an agent to fix or iterate the UI instantly rather than only after a postmortem review. This matters because low-latency capture makes AI-driven polishing feel instant and usable during design sessions instead of being an offline analytic step.
  - anchor: "I have a library called riffre and the idea" · t=201 · [▶ 3:21](https://www.youtube.com/watch?v=lfKTjlI2Tmw&t=201)

- `pi-lfKTjlI2Tmw-02` — **Polish command gets a live voice mode to edit UIs in real time** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: The developer proposes adding a 'live mode' to the polish command inside Compound Engineering so you can talk to the agent while it opens a site, accepts clicks/annotations, and applies changes on the fly. The live mode mirrors human designer workflows — say 'make this color darker' and the agent either applies the change immediately or queues it — speeding iteration and lowering the friction of polishing AI-generated UI. It reframes polish from a manual review pass into an interactive conversational editing session.
  - anchor: "it will add a live mode." · t=774 · [▶ 12:54](https://www.youtube.com/watch?v=lfKTjlI2Tmw&t=774)

- `pi-lfKTjlI2Tmw-03` — **Replace zip API with a streaming contract as the public interface** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Rather than rewriting existing APIs wholesale, the plan is to make a stream contract the new public API (replacing the zip-schema delivery) so events and evidence arrive continuously to listeners and agents. Streaming lets client code, overlay layers, and agents subscribe to incremental event data (DOM events, clicks, drawings, audio) and enables tunneling or remote runs without huge video payloads. This architectural move prioritizes low-latency UX and reusability across frameworks while keeping a clear separation between capture library and application logic.
  - anchor: "The stream contract becomes the new public API" · t=1237 · [▶ 20:37](https://www.youtube.com/watch?v=lfKTjlI2Tmw&t=1237)

- `pi-lfKTjlI2Tmw-04` — **Capture structured evidence (screenshots, DOM/events) not full video** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: For evidentiary context the speaker recommends minimizing heavy video and instead capturing periodic screenshots, DOM snapshots, structured event data, and transcripts so the agent clearly understands the user's intent. This approach balances fidelity (so the agent can reliably reproduce or explain changes) with bandwidth and privacy concerns, and it enables offline replay or experiments to test what evidence improves agent accuracy. The guideline is pragmatic: capture as much helpful evidence as possible without turning sessions into huge raw video stores.
  - anchor: "we should definitely like take screenshots" · t=1600 · [▶ 26:40](https://www.youtube.com/watch?v=lfKTjlI2Tmw&t=1600)

- `pi-lfKTjlI2Tmw-05` — **A front-end voice agent should decide when to wake coding agents** → theme [Agent engineering & production infra](../../themes/agent-engineering-patterns.md)
  - detail: Rather than letting every utterance create a coding job, the speaker suggests a two-tier flow: a live front-end agent extracts 'units' from voice interactions and then decides—based on mode settings (instant, smart, never) or heuristics—when to wake a coding agent to implement them. That design reduces collisions and unnecessary refactors by batching or triaging small fixes, while preserving the option for immediate edits for trivial changes. The model provides a practical balance between responsiveness and safety when multiple concurrent edits could conflict.
  - anchor: "when the voice agent extracts a unit" · t=512 · [▶ 8:32](https://www.youtube.com/watch?v=lfKTjlI2Tmw&t=512)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
