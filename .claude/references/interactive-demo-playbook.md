# Interactive demo playbook — the mini-site walkthroughs

_Distilled 2026-09-16 from the two builds (Large docs processing and review, 2026-09-15/16; Workforce optimization, 2026-09-16, three rounds) — Alex's standing requirements, the procedure that worked, the mistakes paid for. Read before building or changing any walkthrough under `outputs/oracle-solutions-site/site/demo/`. The per-build records are `outputs/oracle-solutions-site/docs/PROVENANCE.md` §16 and §19; the handoff pattern is `docs/HANDOFF-workforce-demo.md`._

## Alex's standing requirements (as given, across rounds)

1. **Keep the real product's flow, screens and information model; generalise the content** to what the pack sells (its S/M/L rows and feature matrix), never to the one customer case it was built on. Where there is no delivered product (third demo onwards), the "real product" is the platform the use case runs on — its interfaces must be recognisable, not made up, and styled like the product rather than like our own SaaS shells.
2. **Brand-agnostic and industry-neutral, on synthetic data with ground-truth specifics**: invented geography, ids, names, documents; no SoftServe / Oracle / NVIDIA / customer mark inside the demo; no figure outside the cleared band; no time-to-deliver claims unless cleared.
3. **No integrations, no real inputs**: upload, export, write-back mocked; a short guided flow (six steps); hints that allow only the designated control; free exploration after; a cleaner UI than the real product.
4. **Red-team the first cut against the pack specs before delivering** — the first Large docs cut covered rates only, one document type, one validator, and had to be widened.
5. **Lead with the value, not the screens** (pushback on the first WfO cut, 2026-09-16): the improvement must be the first thing the viewer sees after the run — before → after on the product's own KPIs, in one band — then a drill-down from each number to the concrete changes that produced it (rule + effect), then a manual override that recomputes the numbers. A faithful screen tour that buries the gain fails the brief.
6. **A dedicated tour step pauses on the improved metrics** even when no action is taken there (passive step with a Next control), then a step that opens where the gain comes from.
7. **Figures**: reproduce the cleared figure (the +4.5% median on WfO); companions synthetic and modest; the shipped stills show the state that carries the cleared figure; every synthetic figure is listed for Alex in the report.
8. **Model routing**: Opus by default — research, builds from a spec, QA loops, captures, conversions, doc mechanics. Fable only for the design decisions, the data model where numbers must reconcile, the red-team pass and the final review; say which. On the third demo: Fable under ~7% of its limit, 10% hard cap.

## The procedure that worked

1. **Orient**: `context/index.md` → the area page → the distilled spec doc → the site copy for the product (`site/data/content.js`) → the reference demo code.
2. **Reconstruct the source**: get the recording (a Google Drive "anyone with the link" share + `curl` works above 100 MB); probe, a frame every 6 s at 960 px, 4 × 5 contact sheets, then key frames at native resolution cropped to the shared window; transcribe narration on-device (macOS 26 Speech framework — no key); read any spec sheet shown in the video. Without a recording: product videos on YouTube (screenshot them in Chrome at timestamps), docs pages with screenshots, the vendor's own demo environments.
3. **Write the generalisation before coding** (10 lines): world, period, the rules that visibly matter, the plans (current · v1 · v2 after feedback), KPIs by the methodology, the exceptions, the explanations, integration surfaces, the settings surface, the tour.
4. **Data model = current state + named changes with additive KPI effects**; flags as a function of what is applied; KPIs computed in the page so every number reconciles and an undo recomputes them.
5. **Build on the shared tour engine** (`STEPS[]` with target / anchor / side / auto / passive, the click guard, Skip = auto-perform, Next on passive steps, the end card, URL switches `?tour=off&ui=clean&state=…`).
6. **QA by scripted click-through**: `tools/capture-demo-frames.mjs` in `MODE=script` with a scenario JSON; `LOGS: none` is the gate; look at the shots.
7. **Red-team** against the S/M/L rows, the feature matrix and the site copy; close the gaps that do not change the flow.
8. **Capture**: `DPR=2`; 640 × 400 CSS-px crops → 1600 × 1000 JPEG q86 ≤ 300 KB (`docs/ASSETS.md` §1); the final state in the stills; `sips` crop offsets are Y then X and `0 0` means centred.
9. **Wire**: `config.js` (`demoUrl`, `demoPreviewUrl`, `videoPoster`), `content.js` step images; `node --check`; `node tools/check-grammar.js`.
10. **Publish**: the standalone demo as its own artifact (wrapper-free copy under `.work/`, supporting files as a map) → `demoPreviewUrl`; the site artifact with `url` + `root` + a files map. Read the artifact in the session first; publish the **full tree** when another session may have changed renderer files (a partial publish once shipped a new `content.js` against an old `overview.js` and broke the home page); on a refusal, re-read and republish on top.
11. **Docs and wiki**: README, `CONFIG.md` §3, `ASSETS.md` §1, a PROVENANCE section; fold the outcome with `context-update`; mark the handoff done.

## Pitfalls paid for

- **Machines differ.** The MacBook Air has no Homebrew, ffmpeg or Node on the PATH: a 60-line Swift/AVFoundation tool did probe / frames / contact sheets; Node runs from `/Applications/Codex.app/Contents/Resources/cua_node/bin/node`; `sips` does crops and JPEGs; the Speech framework transcribes. Check `which node ffmpeg` before planning around them.
- **Capture tool**: SVG elements have no `.click()` — dispatch a `MouseEvent`; `W`/`H` env set the viewport; Google Fonts are blocked on purpose.
- **Tour engine**: call the state-changing action *before* `tour.after()` when that action sets `busy`, or the tour advances a step early and then blocks the real click; keep "pick" and "open" as separate steps; a passive step needs a Next control and a guard that blocks every page click.
- **Layout**: an inline-SVG map needs `preserveAspectRatio="xMidYMid meet"` and a viewBox with label margins; keep markers off the label band; a generic `th b {display:block}` rule will eat inline `<b>` elsewhere.
- **Numbers**: compute deltas from raw means, not from rounded displays, or the headline drifts by a tenth of a point.
- **Shared working tree and artifact**: another session may be editing the same repo and publishing the same artifact at the same time — check `git log` on renderer files, expect PROVENANCE section numbers to collide (renumber), expect publish refusals (re-read, merge, republish).
- **Verification limits**: the Chrome extension cannot click inside an artifact's iframe; verify the product page headlessly on `file://` and the demo artifact in the viewer (it shows a grey skeleton for ~10 s before rendering).
- **The review lens**: a screen tour is not a demo; the viewer must see what got better, drill into why, and be able to overrule it.

## Reusable parts

- `site/demo/workforce-optimization/` — the KPI band, the changes list with Show / Undo / Note, additive-effect data model, passive tour steps.
- `site/demo/large-document-extraction/` — documents list, split-view review, validator kinds, export tab.
- `tools/capture-demo-frames.mjs` with `tools/capture-wfo-tour.json` (tour regression) and `tools/capture-wfo-frames.json` (frames + poster).
