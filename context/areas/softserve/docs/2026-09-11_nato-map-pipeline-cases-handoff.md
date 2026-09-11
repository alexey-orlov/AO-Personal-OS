# Handoff — NATO map: place the pipeline cases (SBG · DHL · NHS) and build the review deck

_Written 2026-09-11 by the cloud session that built the NATO AI use-case map deck (v7 → v10 → v11). The task moves to a
local session because the inputs that matter now — the Sep 10–11 "Account Insights" packaging of DHL and the current
SBG / NHS files — live in the SoftServe OneDrive on Alex's Mac, unreachable from the cloud. Everything the local
session needs that is NOT on the Mac is in this repo (branch `claude/nato-ai-use-cases-map-rmpxg0`)._

## 1. The ask (Alex, 2026-09-11, verbatim)

> Now I have this slide [the neutral map, his working copy]. Think where SBG use case, DHL use case and NHS use cases
> might fit as relevant? If that will require adding one more NATO-relevant item or regrouping propose. Use latest
> status on SBG, DHL (+ how we packaged it as Account Insights just today and yesterday for the internal SS meeting) +
> NHS case. Create new deck with the copy of that slide for my review. Think following all the rules and context of
> our previous work in this session.

His working copy of the map still carries the v7-era chip spellings ("OCI + AIQ", "OCI + QOpt") and the v7 footnote
("demand signals on slide 1, FreeTech deliveries on slide 2"); v11 corrected the spellings (cuOpt, AI-Q) — apply the
corrected data, and say so in the delivery note so he can reject it.

## 2. Where everything is

| What | Where | Notes |
|---|---|---|
| Deck builder + data | `.claude/references/nato-map-deck/` (`build_slide.py`, `slide_data.json`, `case_slides.json`, `README.md`) | Builds the 12-slide v11 deck into `out/` (git-ignored). `DECK_DATA=<variant>.json` builds a variant deck with its own `out` name and `views` — that is how the review deck should be made. Font stand-ins resolve automatically (Liberation, else Arial / Courier New); `DECK_FONT_DIR` overrides. |
| Template base + design rules | `.claude/references/softserve-deck-base.pptx` · `slide-design.md` · `softserve-deck-kit.md` (pill grammar, contrast thresholds, what two QA rounds caught) · `document-rendering.md` (soffice → pdftoppm QA on this Mac, the brand-font trap) | Read the deck-kit bullet "Opener · case · close" and the one above it before touching the map. |
| Working report | `context/areas/softserve/docs/2026-09-03_nato-ai-use-case-map.md` — §0 menu, §3.1 map + deck paragraph (still says v10), §3.1.4 AIDP / Patterns v2, §9 case cards, §10 bench, §11 open questions | Exec brief: `2026-09-06_nato-ai-use-case-map-exec.md`. Stream page: `oracle-defense.md`. |
| Pipeline truth | `oracle-pipeline.md` (2026-08-18 SteerCo status + June board) · `sbg-poc.md` (2026-08-29) · `oracle.md` 2026-07-10 entry (pattern taxonomy: which pattern each pipeline customer is) | Nothing in the wiki is dated after 2026-08-29 for DHL / NHS / SBG — see §3. |
| Deck lineage | v10 (2026-09-07) = what Alex edited · v11 (2026-09-08, sent 2026-09-11) = v10 + the 20-finding design-QA pass: shared case-slide geometry, red 4.2 tile at 2 pt, spellings cuOpt / AI-Q / AI Lakehouse / "on OCI", criteria matrix with 4.2 last, next-steps reflow | v11 is what the checked-in data builds. The report / wiki still describe v10 — fold v11 in with the outcome of this task. |
| Artifacts | Report: `https://claude.ai/code/artifact/e3f76edc-33ad-40c8-878f-9213f3270530` (one version behind: the v10 text in the md was never republished after a container restart) · exec brief artifact (find it with the Artifact list action) | Republish = `read` the URL, then `publish` the rebuilt HTML to the same URL. Generators `build_report.py` / `build_exec.py` were scratchpad-only and are lost; the report artifact can be regenerated from the md with a small markdown → HTML script (the artifact's head shows the CSS it used). Low priority. |

## 3. Status per case — what the wiki holds, and the gap

| Case | Pipeline status (wiki, dated) | The use case as sold | ⚠ Gap — fetch locally first |
|---|---|---|---|
| **DHL — Client Compass → "Account Insights"** | AI-Q pack, €226k → 192k / 12 wks, full commercial stack closed (PO ✅). Kickoff slipped to Aug 27 (workshops 27 · 28 · 31 Aug), September start on a 3-month engagement; OCI set up by Oracle's BlackBelt team; open then: accelerator vs fully custom on AI-Q, who builds the UI. [oracle-pipeline 2026-08-18] | Deep-research / customer-profile build on AI-Q over SharePoint + CRM data → account insight briefings for sales. Pattern: Company research agent / "Account insight briefings". [oracle.md 2026-07-10] | **The Sep 10–11 packaging as "Account Insights" for the internal SS meeting is not in the wiki** (no call note, no drop, Gmail has nothing for "Account Insights" / "Client Compass" in 14 days). Look in `~/Library/CloudStorage/OneDrive-SoftServe,Inc/Projects/Oracle/DHL/` and `…/General/` for the meeting deck / one-pager; fold it into `oracle-pipeline.md` + `oracle.md` via `context-update` before using it. Also: did the Aug 27–31 workshops settle scope, is delivery running? |
| **NHS (Sheffield Trust) — complaints review** | AI-Q, €198.5k / 15 wks, Gero owns; NDA ✖ SOW ✖ PO ✖ on the June board; still no start date on 2026-08-18 (October likely), blocker = data-privacy alignment; masking a hard requirement (Lakehouse policy tooling relevant). [oracle-pipeline 2026-08-18; oracle-ai-offerings] | "AI-assisted research analysis of operational complaints" — pattern: Case investigation / "Complaint evidence assembly" (AI-Q multi-source case agent). [oracle.md 2026-07-10] | Current start date and any scope one-pager: `Projects/Oracle/NHS/`. |
| **SBG (Saudi Binladin) — AI-Powered Document Intelligence** | AI-Q, ~€171k / 12 wks; SoW sprint in flight on 2026-08-29: **UC 1 "Historical Package Performance Insights" only** (package-normalisation layer as its foundation; forecast stability index as primary output, early warning secondary; P6 XER + monthly cost reports per work package + scanned subcontracts / BOQ / responsibility matrices; AI-Q framework, Nemotron 3 Super under evaluation, workflow UI); kickoff target Sep 1 (few days' slip); **critical path = SBG data access**, cost release needs a director's sign-off. Second SBG deal = cuOpt Workforce Planning & Scheduling, ~€120k, *Pending*. [sbg-poc 2026-08-29] | Evidence-backed package-performance insights for the project director: which work packages deviate from plan, how stable their forecasts are, early warning — human decides; sold as a recommendation workflow, **never "agent", never "single source of truth"** in SBG-facing text. | Did the SoW go to Oracle, did kickoff happen, is data access resolved: `Projects/Oracle/SBG/` and the Teams thread. |

## 4. The fit — analysis so far (cloud session), for the local session to confirm or overturn

**Pill grammar on the map today:** outlined ink pill = NATO / NCIA demand · solid violet = FreeTech proof · solid orange
(ink text) = delivered on Oracle (Riyadh Air → 1.2, Bosch → 4.2) · no tag = an empty pill instance. Pipeline cases in
delivery (DHL, Channel 4 / Belron) were deliberately left untagged: solid = delivered.

**Proposed extension — one new state, no new hue:** **outlined orange = SoftServe case in delivery on Oracle**
(contracted, not yet delivered). Hue = source family (SoftServe on the Oracle stack), fill = maturity — the same logic
as ink-outlined demand next to solid proof. Text in ink (orange on white is 3.0:1, fails at 7 pt); outline 0.75 pt.
Key entry: sample "DHL", label "in delivery on Oracle". Rejected: a third hue (rule 10's two-meanings budget; blue and
green already mean Oracle cloud / NVIDIA on the case slides). Check the render on the orange-tinted first-wave tiles —
a white-filled pill stays legible there, a tinted one would vanish. On slide 1's matrix a case in delivery is a
**partial** proof dot, never strong.

| Case | Where it fits | Tag | New tile? | Confidence |
|---|---|---|---|---|
| **DHL / Account Insights** | **2.1 Open-source intelligence briefing** — the §9 card already names Client Compass as "the same architecture, in delivery"; the NATO job is the same job on different entities (nations, suppliers, actors → cited dossiers and briefs). "Account Insights" is the productised form — it tightens the story ("an account dossier is an entity dossier"), it does not move the case. | outlined orange "DHL" on 2.1 | No | [Inference, strong] — segregation rule: object = entities, job = brief → archetype 2, tile 2.1 |
| **SBG UC 1** | Two options. **(a) Minimal:** 4.1 Fleet readiness analytics — the report's §9 reuse line for #5 already lists "SBG project intelligence"; both are forecast-and-exception analytics over operational time series with document evidence. **(b) New tile 4.3 "Programme & contract performance insights"** (object = programmes / work packages; job = performance insights; archetype 4 "forecasts and plans from operational data"). NATO analogue: NSIP-funded infrastructure and capability programmes executed through host nations, NCIA and NSPA with subcontract chains; the pain is real (IBAN's audits of NSIP delays and cost growth are a recurring theme) but **no named AI programme was found — ⚠ demand unverified**, and the tile would carry an empty demand slot. | outlined orange "SBG" on 4.1 (a) or on 4.3 (b). The cuOpt workforce deal stays untagged while *Pending*; if it moved, it goes on 4.2 next to Bosch. | (b) only if SBG UC 1 has actually kicked off and Alex wants the construction-style story visible to Oracle; otherwise (a) | [Inference] — check the local SBG status first; the tile name must follow the `<object> + <job>` grammar of §3.1.2 |
| **NHS complaints review** | The report maps the complaints case-agent to #11 (2.2 Cyber alert investigation) as a *pattern* and to #17 (1.3 Personnel & entitlements casework) as *reuse*; neither is the same job. Options: **(a) 1.3 casework** — a complaint is a case file: evidence assembled from several sources, adjudication assisted, reviewer decides — the closest existing tile. **(b) Promote the bench item "after-action mining" to a new 2.5 "Incident & lessons-learned analysis"** (observation / occurrence / complaint reports → evidence-assembled findings; buyers: JALLC, flight-safety boards, inspector-general functions) with NHS as the pipeline proof. Legitimate under the segregation rule (object = reports, job = analyse → archetype 2), but it overlaps the bench's "#18 phase 2" placement and **⚠ no NATO AI programme for lessons-learned analysis was found**. **(c)** NHS as harness proof on 1.1 — already in that case slide's proof strip; weakest. | outlined orange "NHS" on 1.3 (a) | (b) only if Alex wants a non-cyber case-investigation tile on the map | [Inference] — (a) recommended now |
| **Regrouping** | None needed. A lane takes a fifth tile without layout changes (lane 3 already has five; tiles are justified per lane). Do not move DHL or NHS into a new "commercial proofs" group — the L1 grouping is by AI archetype, proof source is a tag (the 2026-09-06 red team rejected a source-based axis). | — | — | — |

Tag-row width to check in the FIT report: 4.1 would carry FT C4 + SBG; 2.1 FT C2 + DHL; 1.3 NCIA + NHS — all inside
the 4-tile lanes, so the widths should pass; the 5-tile lane 3 is not touched.

## 5. Deliverable — the review deck

1. **Data variant** `.claude/references/nato-map-deck/slide_data_pipeline.json` (copy of `slide_data.json`): `out` =
   `"NATO map — pipeline cases (review).pptx"`; `views` = `[neutral map, pipeline evidence slide]` (nothing else);
   add `"pipe": "DHL" | "SBG" | "NHS"` on the chosen tiles (and the new tile if chosen, with its chips per the §3.1
   rules: lit = the case's analytical engine); a `pipe_slide` block in the FreeTech-slide skeleton (`render_rows`
   with `tag_style="pipe"`, `wrap=True`): one card per case — the outlined-orange pill, the case name, a
   plain-language line, a status line (stage · pack · start), and "MAP CASES" = the tile(s). Note text generated
   with `{pipe}` for the cross-reference. Write the SBG card without client-internal specifics (no KFSC, no
   contract values, no "agent").
2. **Builder** (`build_slide.py`): `pipe_pill(slide, x, y, text)` = white fill, ORANGE outline 9525, INK bold, width
   `text_w() + 60000` (same as `oracle_pill`); `tile()` draws it in the pill slot between the FT pill and the
   Oracle pill (outer → inner: demand · FT · pipe · oracle); `key_row` gets a `"pipe"` sample; `render_rows`
   accepts `tag_style="pipe"`; the `kind` dispatch gets `"pipe"` → `render_rows(slide, DATA["pipe_slide"], …, "pipe",
   wrap=True)`. Keep every other renderer untouched; the full deck must still build with 0 OVERFLOW.
3. **Build + QA:** `DECK_DATA=….json python3 build_slide.py` → FIT report 0 OVERFLOW → render the `-qa.pptx` twin
   (per `document-rendering.md`) → look at both slides; the empty pill instance must remain on tiles that carry no
   tag; the key must show the new sample in family order (chips → pills).
4. **Deliver** the pptx + the two previews to Alex with a 5-line note: what was tagged where, the one new tile if
   any, the chip-spelling correction, and the two ⚠ demand gaps.
5. **Then fold it back:** report §3.1 deck paragraph (v11 + the pipeline pills, the grammar extension), §9 cards for
   2.1 / 1.3 / 4.1 (add the pipeline proof lines), §10 bench (if a bench item was promoted), `oracle-defense.md`
   (status + Activity), `context/index.md` Now; republish both artifacts; commit `context:` / `feat:` messages.
   Add the "outlined = in delivery" rule to the pill-grammar bullet in `softserve-deck-kit.md`.

## 6. Standing constraints (do not relearn these)

- Nothing goes to Oracle without Alex; the NVIDIA decks are confidential; GigaCloud is never named externally.
- The FreeTech 06 slide text deliberately omits AWS Greengrass (§11 Q3).
- Labeled claims ([Fact / source], [Inference], ⚠ gap); no "typically"; a wiki gap is a gap, never "Alex is mistaken".
- Living documents: Alex hand-edits delivered decks — read his current file before matching anything to it.
- Model split: Opus for the builder edits, renders, doc updates and the wiki fold; Fable only for the placement
  judgement and the final review. Do not exceed the Fable 93 % limit.
