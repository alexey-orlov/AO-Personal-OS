# Audit C — per-pack files, repo docs, fixtures & data

Started 2026-09-24. Read-only audit of /home/user/oracle-packaging-skills + AO-Personal-OS commit 6db97ef (Account Insights working folder).

## Status log
- [started] file created; exploring repo tree.

- [part 1, pass 1] Read the real AI working folder from 6db97ef^ (intake, inventory, grouping-draft, oracle-baseline-lens, decisions, research-brief, tools/polish_*.py, place_icon.py, visuals/credits.md + json). Only one import commit (cf17b2c) exists for outputs/oracle-packs, so no earlier states; the folder also had a git-ignored `*/sources/` dir.
- grep: `grouping-draft`, `oracle-baseline-lens`, `polish_`, `place_icon` = ZERO hits anywhere in the plugin repo -> ad hoc files from the 2026-09-22 session (decisions.md says so: "fine grain kept in oracle-baseline-lens.md", "built ... plus tools/polish_feature_list.py", "tools/place_icon.py").
- pack_paths.py docstring declares <work> contents: artifacts/, intake.md, inventory.md, inventory/ (extracts), sources/, research-brief.md, research/, decisions.md, any scratch. Repo: pack-spec.md, architecture.json, visuals/ (+ .json provenance + credits.md).


### architecture.json (verified)
- `python3 shared/tools/build_diagram.py packs/account-insights/pack-spec.md --out <scratch>` then `diff` with the committed packs/account-insights/architecture.json: **byte-identical**. Also identical to the old working-folder copy in 6db97ef^. So the committed file carries zero information beyond spec + catalog.
- Inputs of build_model(): architecture.inputs/stack/outputs, oracle_products[].why, catalog names, meta.name(+variants by channel), workflow.steps[] (last human step -> gate; its failure_path -> note). All in the spec.
- Risks of storing it: (1) `load_or_build()` returns the stored file whenever it has an `app` key — no spec-sha stamp, no staleness check (artifacts get CON006 via spec_stamp; the model does not); check_diagram only checks artifacts vs model, never model vs spec. A fast-path change to the architecture leaves every renderer drawing the old picture until someone re-runs build_diagram. (2) It ignores the `channel` argument: the deck (spec.channel) and one-pager pass a channel, but a stored partner_print model is returned for internal/site too, so the internal deck/site get the partner_print name variant ("Account insights by SoftServe" instead of "Account Insights App"/"Account Insights") (inferred from code; not run). (3) Renderers write the model into the repo's packs/<slug>/ as a side effect when absent (load_or_build write=True) — repair-or-replace has no model yet, so its first deck/one-pager build will create a repo file.
- The architecture-picture card says fix fails "in the pack brief" (check 1) but also "fixed in the model and re-rendered" (check 3; same in architecture-diagram.md) — a hand edit to the JSON would be silently overwritten by the next build_diagram run and never reach the spec.
- Verdict: derive, don't store. Keep build_model() as a library; replace the file with a `architecture.reviewed_sha` (or reviewed stamp) in the spec, or keep the file only as a generated cache stamped with spec sha + channel and rebuilt when stale.
- **Proven bug from the stored model (scratch copy of HEAD a3da314, scratch venv):** `test_build_deck_v2.py` builds `fixture-pack-spec.md` then `fixture-pack-spec_v2-variability.md`, both in `deck/tests/`. The first build writes `deck/tests/architecture.json` (WfO model) via load_or_build; the second build finds it and draws WfO's architecture on the Contract Intelligence deck. Result on a clean copy: **4 of 66 checks failed** ("engine box does not name NVIDIA NeMo Agent Toolkit / NIM / NeMo", "destination system is missing"). Counterfactual: cache removed, variability built alone -> its own model (Contract Intelligence, NeMo Agent Toolkit · NIM · NeMo, Obligation dashboard). The .gitignore line `plugins/*/skills/*/tests/architecture.json` exists precisely because test builds drop this file. (Observed: a stray tests/architecture.json appeared in the real repo at 13:02 and was gone at 13:03 — another process ran tests; I did not touch the repo.)

### visuals provenance (verified in code)
- apply_choice.py records each chosen picture FOUR times: (1) candidate's .json sidecar copied verbatim beside the copy in packs/<slug>/visuals/ (two for an icon: -ink and -white), (2) the spec key (file, name/creator, source, licence, source_url), (3) a credits.md row, (4) a `<work>/decisions.md` line. Readers after the step: spec key -> deck/one-pager builders; sidecars in the repo -> nothing (read_sidecar is only used on candidates in <work>/candidates by apply_choice + contact_sheet); credits.md -> nothing (no tool reads or checks it; "a picture with no row is not in the pack" is unenforced).
- Committed sidecars leak local paths: `vertical-3-chart-line-{ink,white}.json` have `"file": "<a local scratchpad path on the owner's Mac>"` (Alex's macOS user name and a session scratch path) — copy_in() never rewrites `file`. Photo sidecars carry a basename.
- credits.md has a row for the ink icon only (the white render has a sidecar but no row); the DHL logo has a free-text line and no sidecar (placed before the `supplied` slot existed).
- Verdict: one record. The spec key already holds file/source/creator/licence/url; add `download_url`/`fetched` to the spec entry (or keep ONE `visuals/credits.md` generated from the spec) and drop the committed sidecars. Sidecars stay on candidates in <work>/candidates only.

### More verified facts (part 1)
- **Industry icon pick is write-only.** Neither deck builder reads `verticals[i].icon` (the key apply_choice writes): build_deck_v2.py matches icons by keyword from `ICON_MAP_DEFAULT = deck/assets/icons/map.yaml`, a file that does not exist (my scratch build printed "verticals: assets/icons/map.yaml not present — every card keeps the exemplar's own icon"); legacy build_deck.py keyword-matches `shared/data/icons/` and ignores the pick too; one-pager and listing never draw industry icons. So place_icon.py's gap ("0.1.13, whose builder does not yet read verticals[].icon") is still open at 0.1.38, and the committed `vertical-3-chart-line-{ink,white}.png` + their sidecars are read by nothing. Photos/logo (deck.images.*) ARE read (build_deck_v2 l.365/530/544, one-pager).
- **polish scripts vs builders today:** polish_feature_list.py (footer row; ● ○ vs ◐ size) -> both now in build_feature_list.py (no footer, "one symbol face") -> obsolete. polish_deck.py: figure-less "illustrative" caveat, doubled tier glyph, catalog-id footnote, unlabelled connectors, slide-10 prose -> fixed in v2 and covered by run_figureless checks (0.1.19–0.1.33); "HOW THE PLAN GETS MADE" survives only in legacy build_deck.py:597. All three scripts = builder-gap bridges written ad hoc in the AO-Personal-OS session; the gaps were each handed to the skills session (decisions.md says so).
- **intake.md vs spec:** A1 inputs = spec provenance.inputs; A2 delivered case = spec Proof; B1 roadmap id = front matter; B2 verticals = Industries; B4 contact = Contacts.internal + open question; C1 clearance = Settings/Clearance **but stale** (intake: "anonymized outside"; spec since 2026-09-23: partner_print may name DHL); C2 figures = kpis "-"; C3 PoV 6–8 wk/price tbd = packages.pov duration+note+price; C4 internal-only = clearance.internal_only; the scope-drift answer = decisions.md bullet 1 + research brief. Only B3 (the artifact set) is not in the spec, and the schema has no key for it. build/plan-and-ask reads intake.md for the artifact set AND "who will see the printed documents" — so a stale intake can mis-set the channel.
- **decisions.md:** writers = spec stage 4 (story), apply_choice (per picture), each artifact skill's review-pack card ("Writes: the owner's approval ... into decisions.md": deck, feature-list, one-pager, exec-summary, listing), build per-artifact-review ("Writes: the approval ... with spec stamp"), build delivery ("one line per artifact ... spec stamp") -> up to 3 lines per approved artifact. Readers: none (no card lists it under Reads). The real AI log (45 lines) also carries rationale already in spec `Note:` fields and builder-defect reports addressed to the skills session (a bug tracker in the wrong place).
- **research/P1–P4 vs research-brief:** 2,371 lines vs 111. The brief cites [F, P1..P4]; after synthesis no card reads research/. The current research-brief-format.md adds a tiered **Sources** section, which makes the P-files archival. The research card says five agents; generalization-method §4 lists P1–P9; repair-or-replace ran P1–P11 + inventory E1–E3 — naming is not fixed.
- **oracle-baseline-lens.md / grouping-draft.md:** ad hoc; superseded by spec capabilities (24 rows = grouping-draft's fold path) and by the research-brief's "Where the pack differs from what we built" table (vendor pack · we built · stays custom, by area). The AI spec's open question `aiq_version` "Blocks: feature_list.oracle_pack_column" names a key the schema does not have.
- **provenance paths rot:** repair-or-replace spec `Research brief: packs/visual-damage-assessment/research-brief.md` (old slug, old repo-relative path); fixtures carry `packs/workforce-optimization/research-brief.md`. Nothing dereferences provenance paths.

## Part 1 table — per-pack files

| File | Written by | Read by (after its step) | Duplicates | Verdict | Reason |
|---|---|---|---|---|---|
| repo `pack-spec.md` | spec (packspec.py set), visuals apply_choice | every builder, linter, consistency, build_diagram | — | keep | single source of truth |
| repo `architecture.json` | build card architecture-picture (build_diagram.py); renderers' load_or_build as side effect | deck v2, one-pager, diagram_to_site, check_diagram | 100% derivable (byte-identical rebuild) | delete; derive at render; record "reviewed" as a spec-sha stamp in the spec | stale cache, ignores channel, breaks deck test 4/66 |
| repo `visuals/*.png,jpg` | apply_choice | deck v2 + one-pager (photos, logo); icons: nothing | — | keep photos/logo; icons only once the deck reads `verticals[].icon` | bytes are needed |
| repo `visuals/*.json` | apply_choice (verbatim candidate sidecar; ×2 per icon) | nothing | spec key + credits row + decisions line | delete | 4th copy; leaks a local scratchpad path from the owner's Mac paths |
| repo `visuals/credits.md` | apply_choice | nothing (rule unenforced) | spec keys | generate from spec, or drop | 3rd copy; already inconsistent (no row for white icon; logo free text) |
| `<work>/inventory.md` (+`inventory/`, `sources/`) | spec stage 1 | stage 1 itself; research agents (inferred) | spec provenance.inputs; gaps repeated in brief | scratch-only; delete after confirm | customer-document extracts |
| `<work>/intake.md` | spec stage 1 | build plan-and-ask | ~90% in spec + decisions; clearance already stale | merge artifact set into spec; drop file | stale answers steer the build's channel |
| `<work>/research/P*.md` | spec stage 2 agents | stage 2 synthesis only | the brief | scratch/archive | brief's Sources section carries the citations |
| `<work>/research-brief.md` | spec stage 2 | stage 3 + 4; cited as spec source | — | keep (local) | the one decision document |
| `<work>/decisions.md` | spec, apply_choice, 5 review-pack cards, build ×2 | nothing | spec notes; approvals ×2–3 | keep, one writer per event (build only) | human audit log |
| `<work>/grouping-draft.md` | ad hoc | nothing | spec capabilities | delete | superseded |
| `<work>/oracle-baseline-lens.md` | ad hoc | nothing | brief's "differs from what we built" | delete | no schema home |
| `<work>/tools/polish_*.py`, `place_icon.py` | ad hoc | — | — | delete; fix icon gap in build_deck_v2 | bridges for builder gaps; 2 of 3 closed |
| `<work>/candidates/<slot>/` | visuals fetch/search/contact_sheet | apply_choice, contact_sheet | — | scratch; delete after pick | |
| `<work>/artifacts/` | artifact skills | build gate + delivery | delivered copies | keep (local) | outputs |
| `<work>/demo/flow.md` | demo step 2 | nothing after the confirm widget | spec workflow | scratch | |

**Minimal footprint.** Repo: `packs/<slug>/pack-spec.md` + `visuals/<chosen files>` (bytes only; provenance in the spec). Local: `artifacts/`, `research-brief.md`, `decisions.md`; everything else (`sources/`, `inventory*`, `research/`, `candidates/`, `demo/flow.md`) is scratch, removable once the spec is confirmed / the pick applied.

## Part 2 — repo docs (notes as read)
- README.md (1,710 w): "How it works" still says spec = "12 components signed off one by one" (replaced 0.1.14 by 6 stages / ≤12 questions / one story pick / draft-all + reviewer / one confirm); build order omits the pictures step; command table has no `/oracle-packs:visuals`; Layout's docs list omits CONTEXT-BUDGET, DECK-FIDELITY, SPEC-MARKDOWN, packaging-approach.html; tools list omits build_diagram, check_diagram, context_budget, install_fonts, regen_roadmap; ~220-word release note for the owner's Mac. Otherwise current (portable install, env vars, degrade table, repo rules).
- docs/PLAN.md (1,476 w, 2026-09-18): build plan. §2/§3.4 describe "Component sign-off, one at a time" (stale); §5 ships "41 KB deck base" and a "relaxed checker" (deck now fills the WfO exemplar; the site's own checker replaced the port); §7 build sequence all done. Duplicates README's artifact table, pack-anatomy's 12 parts, DECISIONS' rules table. Only non-duplicated content: §4 model split, which running-agents.md now owns (inferred from shared/references/README description).
- docs/DECISIONS.md (5,111 w in 50 table rows): rationale log (legit role per the skill-design rule). Spot-check of "Where enforced":
  1. Component count -> `spec`, `signoff-flow.md`: STALE — signoff-flow.md is a 10-line stub saying the part-by-part sign-off moved to cards.
  2. PoV duration -> pov-rules.md, lint_spec.py: OK (SPEC007).
  3. Integration claims -> "`spec` sign-off card 9": STALE — cards are named, not numbered; rule lives in spec SKILL.md stage 5 + cards (oracle-products, feature-list footnotes, deck clearance-and-editorial).
  4. Workflow 5–7 -> SPEC019: OK.  5. Oracle products cap -> SPEC021/022: OK (warnings).  6. Feature list one page -> SPEC023: OK.  7. Metrics -> SPEC025–027: OK (warnings).  8. Retired family name -> SPEC028 + ART105: OK.
  9. Why references are rewritten -> "repo `CLAUDE.md`": WRONG — this repo has no CLAUDE.md (that's AO-Personal-OS).
  10. Cards for every skill: "≤1,000 words per SKILL.md" CONTRADICTS the tool (SKILL_WORDS = 1200) and the row "Cards and the context budget" (1,200).
  11. Architecture one model -> "three renderers that consume it and derive nothing": PARTIAL — renderers build+write the model when absent (load_or_build).
  12. Specs in the repo -> ".gitignore whitelists pack-spec.yaml ...": superseded by the next row (now pack-spec.md).
  -> 4 of 12 wrong/stale, 2 partial. Duplicate rows: "Propose before you ask" ×2 (evidence sentence verbatim twice); the card/budget rule ×3 (rows 30, 39, 51) + CONTEXT-BUDGET.md.
- docs/TEST-REPORT.md (3,687 w, 2026-09-18): measured legacy build_deck.py on pack-spec.yaml files; "65 assertions", "eight SKILL.md", versions 0.1.0; reproduce block uses `.yaml` paths (none exist), `.venv/bin/python` (replaced by shared/tools/py) and `check-grammar.js` (not in repo). §11 "human checks" (plugin spike, interactive spec walk) have since happened (Account Insights, RoR runs). Still-true item: deckkit.py duplicated (deck/ and exec-summary/ copies byte-identical, `cmp` clean) — belongs in an issue, not a report.
- docs/CONTEXT-BUDGET.md (1,293 w): current on caps (300/400/1,200 match context_budget.py); "the other seven are under 1,000" is stale (build 1,036, deck 1,017 words by wc; spec 1,183 near the cap). Before/after table and "where the big references went" are history. Duplicates DECISIONS rows 30/39/51.
- docs/DECK-FIDELITY.md (1,442 w, 2026-09-22): a plan whose four stages all say "landed". Claims "The icon library lives in shared/data/icons/, shared by the deck, the one-pager and the site" — false today (v2 deck defaults to a missing deck/assets/icons/map.yaml; one-pager and site draw no industry icons). Rationale duplicated in DECISIONS "Deck fidelity" row.
- docs/SPEC-MARKDOWN.md (1,312 w, 2026-09-24): design + migration plan, migration steps 1–5 done in a3da314. Scalar/layout rules duplicated in shared/schema/pack-spec.md (lines 5–27 table) and packspec.py; rationale duplicated in DECISIONS "The spec in Markdown" row.
- docs/packaging-approach.html (1,304 w): stakeholder explainer; says "sign off the 12 shared components one at a time" and "12 components in every one"; no pictures step. Stale since 0.1.14.
- examples/workforce-optimization/README.md (1,601 w): claims the example is "the acceptance fixture for the builder skills ... end-to-end test in docs/PLAN.md §7 step 4" — false: no builder test reads it; run_tests.sh only round-trips it. Most of the text is the 2026-09-18 reconciliation history ("was X").
- shared/references/README.md (874 w): current index + maintenance rules; overlaps README "Rules of the repo" (rewrite-not-append; subagents report) — fine as the home.

## Part 3 — fixtures, data (verified)
- Five spec fixtures; FOUR are the same WfO pack (example 674 lines draft; deck fixture 381 confirmed; one-pager fixture 412 confirmed; pack-spec.valid 234 confirmed) + one different pack (variability, Contract Intelligence, 278).
- Data-level overlap via packspec.load (leaf values > 12 chars): example∩onepager 49%, example∩deck 34%, deck∩onepager 30%, deck∩valid 37%, example∩valid 27%. They drifted: 3 different one-liners for one pack (example "…approved by dispatchers."; deck/one-pager "…exported to Oracle Fusion Field Service."; valid "Re-plan technician zones…"); KPI names differ ("Avoided staffing cost" vs "Staffing cost avoided" vs "Estimated savings at full launch"); vertical names differ between deck and one-pager fixtures.
- Who uses what: example -> run_tests round-trip only. deck fixture -> test_build_deck_v2 (fixture), test_lint_deck.sh (v2 + legacy + generated variants), run_tests diagram section (one-pager built from a COPY of the deck fixture with `levels` added programmatically), round-trip. variability -> test_build_deck_v2 (+ run_figureless mutates it in memory). one-pager fixture -> ONLY run_tests' feature-list page-count test (FL_FIX) + round-trip; no one-pager test uses it. pack-spec.valid -> run_tests lint_spec valid case, broken variants A–D generated from it (PYGEN/PYMETRICS/PYSTEPS), check_consistency, stamp test.
- So programmatic variants are already the pattern (run_tests PYGEN, the diagram copy with levels, run_figureless). One canonical WfO spec (+ the small valid spec, + variability as a mutation or kept) could replace deck/one-pager/example copies.
- shared/tools/tests/fixtures: catalog.yaml (49), roadmap.csv (3), artifact-{broken,clean,inconsistent}.md — small, targeted, used by run_tests (lint_spec --catalog/--roadmap, lint_artifact, check_consistency). Keep.
- shared/data readers: oracle-products.yaml -> spec skill, build_diagram, lint_spec, lint_artifact, packlint, deckkit (both copies). roadmap-items.csv -> spec skill, lint_spec (SPEC ids), packlint DEFAULT_ROADMAP. roadmap-l2-patterns.csv, pack-crosswalk.csv, pack-tracker.csv -> written by regen_roadmap.py, READ BY NOTHING (no skill card or tool). icons/ (11 PNG + map.yaml) -> read only by the legacy build_deck.py (ICON_DIRS) and appended by apply_choice --add-to-library; the current v2 deck never reads it (default points at non-existent deck/assets/icons/map.yaml).

### More part-2 facts
- plugins/oracle-packs/fonts/: only README.md is in git and on disk; no font files, and none ignored -> README.md §6, DECISIONS "Brand fonts shipped privately" and fonts/README claim files that a clone does not have (inferred: they live only in the owner's working tree, which the plugin cache copies "committed or not").
- deck/assets/README: "The one-pager and the mini-site listing draw from the same [icon] library" (false), "both specs, 49 assertions" (66 now), slide 8 "goes to the fresh-context diagram reviewer" (moved to build).
- visuals/assets/README slot table: `vertical:<n>` "Used by the sales deck's industries slide" (false — write-only).
- one-pager/assets/README: logo via `one_pager.proof_logo`; builder also falls back to deck.images.customer_logo (l.407–409) — one-line fix.
- examples/workforce-optimization/pack-spec.md under `lint_spec --strict`: 0 findings, **6 SPEC024 warnings** (feature entries whose source values were split at commas into bogus keys like `deck-2026-07-13`) — the reading model carries the exact corruption SPEC024 exists to catch.
- shared/tools/README: current; says renderers consume `build_model()` (they call `load_or_build()`); tool list omits install_fonts.py.

## FINAL ANSWER (as handed back)
See the SubagentHandback message; identical text.

# Audit C — per-pack files, docs, fixtures (final)

Evidence: the Account Insights (AI) working folder at AO-Personal-OS `6db97ef^` (one import commit, so no earlier states), the plugin repo at `a3da314`, and the repo's own tools run in a scratch venv and a scratch copy. Nothing in either repo was touched.

## (a) Per-pack files

| File | Written by | Read after its step | Duplicates | Verdict |
|---|---|---|---|---|
| repo `pack-spec.md` | spec (`packspec.py set`), visuals `apply_choice` | every builder, linter and gate | — | keep |
| repo `architecture.json` | build card `architecture-picture` (`build_diagram.py`); the deck and one-pager also write it silently when it is missing | deck v2, one-pager, `diagram_to_site`, `check_diagram` | fully derived: rebuilt from the AI spec it is byte-identical | delete; derive it at render time, store "reviewed" as a stamp in the spec |
| repo `visuals/*.png,jpg` | apply_choice | deck + one-pager (photos, logo); industry icons: nothing | — | keep photos and logo; keep icons only once the deck reads them |
| repo `visuals/*.json` | apply_choice (candidate sidecar copied verbatim, 2 per icon) | nothing | spec key + credits row + decisions line = 4 records per picture | delete |
| repo `visuals/credits.md` | apply_choice | nothing ("a picture with no row is not in the pack" is never checked) | spec keys | generate from the spec, or drop |
| `inventory.md`, `inventory/`, `sources/` | spec stage 1 | stage 1 only (research agents, inferred) | spec provenance; its gaps are repeated in the brief | scratch; delete at confirmation |
| `intake.md` | spec stage 1 | build `plan-and-ask` (artifact set, audience) | about 90% restated in the spec and decisions.md; its clearance answer is already stale ("anonymized outside"; the spec now names DHL on partner_print) | move the artifact set and audience into the spec; drop the file |
| `research/P*.md` | spec stage 2 agents | the synthesis only | the brief (2,371 lines vs 111) | scratch/archive (the current brief format has its own Sources section) |
| `research-brief.md` | spec stage 2 | stages 3–4; cited as a spec source | — | keep locally |
| `decisions.md` | spec story step, apply_choice, 5 review-pack cards, build per-artifact-review, build delivery | nothing | the spec's `Note:` rationale; each approval logged up to 3× | keep, with one writer per event |
| `grouping-draft.md`, `oracle-baseline-lens.md` | ad hoc (no skill mentions them) | nothing | spec capabilities (24 rows); the brief's "differs from what we built" table | delete |
| `tools/polish_*.py`, `place_icon.py` | ad hoc bridges, 2026-09-22 | — | — | delete; one gap is still open (below) |
| `candidates/<slot>/` | visuals fetch, search and contact-sheet tools | apply_choice, contact_sheet | — | scratch |
| `artifacts/` | artifact skills | build gate and delivery | the delivered copies | keep locally |
| `demo/flow.md` | demo step 2 | nothing after its confirm widget | spec workflow | scratch |

Findings:
- **The stored architecture model causes a real bug.** `load_or_build()` returns any saved model that has an `app` key. It never checks the model against the spec, although artifacts get that check through CON006. It also ignores the channel it is given, so internal and site builds get the partner_print name (inferred from the code, not run). Both deck fixtures sit in one folder, so the second test build draws the first fixture's architecture. On a clean scratch copy of HEAD, `test_build_deck_v2.py` fails 4 of 66 checks; built alone, the variability deck comes out correct. The cards also disagree on where a fix goes: "fix it in the brief" versus "fixed in the model".
- **The industry icon pick goes nowhere.** Neither deck builder reads `verticals[].icon`. The v2 builder looks for `deck/assets/icons/map.yaml`, which does not exist, and keeps the exemplar's icons. So the gap `place_icon.py` worked around is still open at 0.1.38. The other patches have since landed in the builders: the feature list has no footer and uses one glyph face; the v2 deck fixed the figure-less caveat, the doubled glyph and the catalog ids, and the `run_figureless` test covers them. "HOW THE PLAN GETS MADE" survives only in the legacy `build_deck.py`.
- **Local paths leaked into the repo.** The committed icon sidecars contain `<a local scratchpad path on the owner's Mac>`.
- **Missing and dangling keys.** The schema has no key for the artifact set. The AI spec cites a non-existent `feature_list.oracle_pack_column`, and the repair-or-replace spec's provenance points at an old slug path.

**Minimal footprint.** In the repo: `pack-spec.md` plus `visuals/` holding only the chosen image files, with their provenance kept in the spec. Locally: `artifacts/`, `research-brief.md` and `decisions.md`. Everything else is scratch, removed when the spec is confirmed or the picture is chosen.

## (b) Docs

| Doc | Reader | State | Verdict |
|---|---|---|---|
| README.md | a colleague installing it | "How it works" still says "12 components signed off one by one"; no visuals skill; the docs and tools lists are incomplete | keep; fix those |
| docs/PLAN.md | history | §2–3 describe the one-at-a-time sign-off; §5 ship list stale; §7 all done; repeats README, anatomy and DECISIONS | delete |
| docs/DECISIONS.md | maintainer (the why) | 5,111 words; its "where enforced" column is wrong in 4 of 12 spot-checked rows | rewrite shorter: merge duplicate rows, retire superseded ones, drop or regenerate the column |
| docs/TEST-REPORT.md | history | legacy builder, `.yaml` paths, "65 assertions", 0.1.0, in-plugin check-grammar | delete (log the deckkit duplication as an issue) |
| docs/CONTEXT-BUDGET.md | skill author | caps current; counts stale (build 1,036 and deck 1,017 words against "under 1,000") | rewrite to about 300 words |
| docs/DECK-FIDELITY.md | history | all stages landed; the shared-icon-library claim is false | delete |
| docs/SPEC-MARKDOWN.md | maintainer | migration finished; its rules now live in the schema and packspec | delete |
| docs/packaging-approach.html | stakeholders | describes the one-at-a-time sign-off; no pictures step | rewrite to the current flow, or delete |
| examples/…/README.md | spec reader | claims to be the builders' acceptance fixture (false) | cut to about 150 words, or delete with the example |
| shared/tools/README.md, shared/references/README.md | maintainers | current | keep; trim the diagram sections to pointers |
| deck/assets/README.md | maintainers | false icon claim, "49 assertions", reviewer on slide 8 | rewrite shorter |
| visuals/assets/README.md | maintainers | slot table says the deck uses the industry icon | fix that table |
| other asset and tool READMEs, data READMEs | maintainers | current (one-pager: the logo also comes from `deck.images.customer_logo`) | keep |
| fonts/README.md | colleagues | says four font files ship; only the README is in git | commit the fonts or fix the claim |

DECISIONS spot-check:
- **Correct:** SPEC007, SPEC019, SPEC021/022, SPEC023, SPEC025–027, SPEC028/ART105.
- **Wrong:**
  - "signoff-flow.md" is a 10-line stub that says the flow moved.
  - "sign-off card 9" does not exist; cards are no longer numbered.
  - "repo CLAUDE.md" does not exist in this repo.
  - "≤1,000 words per SKILL.md" contradicts the tool, which allows 1,200.
- **Partly right:** "renderers derive nothing"; ".gitignore whitelists pack-spec.yaml".
- **Duplicated:** "Propose before you ask" appears twice; the card rule appears in three rows plus CONTEXT-BUDGET.md.

## (c) Fixtures and data

- **Four of the five spec fixtures are the same Workforce Optimization pack, and they have drifted.** Example (674 lines), deck fixture (381), one-pager fixture (412) and pack-spec.valid (234) share only 27–49% of their long values. They carry three different one-liners, and their KPI and industry names differ.
- **What uses each one:**
  - Example: the round-trip test only. It also carries 6 SPEC024 warnings (values split at commas).
  - Deck fixture: test_build_deck_v2, test_lint_deck.sh, and run_tests' diagram section, which builds the one-pager from a copy with `levels` added in code.
  - One-pager fixture: only the feature-list page-count test.
  - pack-spec.valid: the linter, consistency and stamp tests; its broken variants are generated in code.
  - Variability fixture: the deck test, plus the in-memory `run_figureless` variant.
- **Variants built in code are already the pattern.** One canonical WfO spec, the small valid spec and the variability spec are enough. `tests/fixtures/*` is small and targeted: keep it.
- **Data files:** `oracle-products.yaml` and `roadmap-items.csv` are read by the spec skill, `lint_spec`, `packlint`, `build_diagram` and `deckkit`.
  - Unused: `roadmap-l2-patterns.csv`, `pack-crosswalk.csv` and `pack-tracker.csv` are written by `regen_roadmap.py` and read by nothing.
  - `icons/` is read only by the legacy deck builder (and added to by `apply_choice --add-to-library`).

## (d) Top 6 recommendations, by value

1. **Stop storing `architecture.json`.** Renderers call `build_model(spec, channel)`, and the spec records `architecture.reviewed: <spec sha>`. This removes a repo file, the stale-cache and channel bugs, the renderers writing into the repo, and the 4 failing checks. Make the "fix it in the brief" rule the only one.
2. **Keep one provenance record per picture, and make the icon pick count.** Keep the licence URL and attribution fields on the spec entry, drop the committed sidecars (they leak local paths), and generate credits from the spec if a human view is wanted. Make build_deck_v2 read `verticals[].icon`, with `shared/data/icons` as the fallback; until then the icon question wastes the owner's time.
3. **Move intake into the spec.** Add keys for the artifact set and the audience, so the build stops reading a local note that goes stale. Clean up scratch automatically at confirmation, down to the minimal footprint.
4. **Give each decisions.md event one writer.** The build logs each approval with its stamp; the artifact skills and delivery stop re-logging; rationale stays in the spec's notes; builder bugs go to the plugin repo.
5. **Docs.** Delete PLAN, TEST-REPORT, DECK-FIDELITY and SPEC-MARKDOWN (the history is in git). Fix README and packaging-approach.html to the six-stage flow. Rewrite DECISIONS as a short rationale log with no hand-kept "where enforced" column. Fix the false claims (fonts ship; one icon library everywhere).
6. **Fixtures and data.** Keep one WfO spec plus variants built in code, with each fixture in its own folder so cached models cannot collide. Delete the example and one-pager copies. Stop shipping the three unread CSVs in the plugins, and either wire `icons/` into the current deck builder or remove it.
