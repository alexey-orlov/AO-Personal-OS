# Oracle packaging plugin — architecture review and simplification plan

_2026-09-24 · reviewed at `alexey-orlov/Oracle-Packaging-Skills@a3da314` (0.1.38) · read-only: nothing in the plugin or site repositories was changed · evidence in this folder: [A code](A-code.md) · [B skills, cards, references](B-instructions.md) · [C per-pack files, docs, fixtures](C-pack-files-docs.md) · [D web skills vs the mini-site](D-web-vs-site.md) · [E how Claude Code loads plugins](E-plugin-mechanics.md). Claims marked ✔ were re-run by hand after the audits; (inferred) marks inference._

## The answer

**Refactor: yes. High value, low-to-medium risk, about 3–4 working days (inferred).** Most facts in the plugin live in 2 to 10 places, and the copies already disagree: **11 defects** below come from a second copy drifting from the first, including €2M printing as "€2000K" on the deck. Your two hunches hold:
- **Per-pack files:** a pack run leaves 20 working files beside its artifacts and pictures, and once the spec is confirmed only 4 of them are ever read again.
- **Over-built skills:** four of the nine skills run one skeleton and restate one review protocol across 12 cards.

Four moves carry most of the gain:

1. **One plugin instead of two.** `shared/` then lives once instead of three times.
2. **Five skills instead of nine.** The four document skills become steps of `build`.
3. **One home per fact.** A rule lives in one file and a linter; a site fact is read from the site.
4. **Lean pack folders.** A pack leaves only its spec and chosen pictures in the repo.

## Size today

| Measure | Now | Source |
|---|---|---|
| Plugins · skills | 2 · 9 (`oracle-packs` 7, `oracle-packs-web` 2) | repo |
| Copies of `shared/` | 3: the source plus two rsync mirrors (141 files, 1.8 MB) | repo |
| Tracked files | 417 (20 MB, of which the exemplar deck is 15 MB) | repo |
| Instruction layer | 153 `.md` files, 103,232 words: 85 cards, 19 anatomy cards, 9 manifests | B |
| — loaded by no step | 52,092 words; 27,668 of them unreachable from anything a skill reads | B |
| Tool code | ~21,300 lines + 2,014 lines of tests; `packspec.py` alone is 3,600 | A |
| Checks | 62 rule ids (32 SPEC · 22 ART · 8 CON) + 11 deck checks + 9 diagram checks | A |
| Test suite | 347 passed, 0 failed, ~80 s. `test_build_deck_v2.py` sits outside the suite and fails 4 of 66 | A, C |
| Churn since 2026-09-18 | 53 commits; 38 version bumps in each plugin manifest (0.1.0 → 0.1.38); +52.8K / −9.8K lines, mirrors excluded | git log |
| Paid on every turn | 9 skill descriptions, ~740 words, in every session with the plugin enabled | E |

## The copies already disagree — 11 defects

| # | What goes wrong | The second copy behind it | Evidence |
|---|---|---|---|
| 1 | €2,000,000 prints "€2000K" on the deck and executive summary but "€2M" on the one-pager. A €300K–1.5M range prints "€300K–1500K" and "€300K–€1.5M" respectively | two money formatters; `deckkit._money` tests `% 1000` before `≥ 1M` | ✔ ran both |
| 2 | A pack's architecture picture can be stale, or cut for the wrong channel, and the deck test fails 4 of 66 checks | `packs/<slug>/architecture.json` is byte-identical to a fresh derivation from the spec, and `load_or_build()` (`build_diagram.py:386-407`) returns any stored model without checking spec version or channel | ✔ rebuilt and compared; test run A, C |
| 3 | The owner picks an icon per industry, and every deck still shows the reference deck's icons | `apply_choice.py` writes `verticals[].icon`; `build_deck_v2.py:54` reads `deck/assets/icons/map.yaml`, which does not exist | ✔ |
| 4 | A new product's architecture figure never appears on the mini-site, and nothing reports it | the inserter writes the figure into `diagrams.js` but not the `content.js` `media` entry that the site's `figure()` needs (`app.js:439-455`) | ✔ |
| 5 | The site's customer-name gate misses 6 of the practice's 19 names, and "an unconfigured list is a failed gate" can never fire | the plugin writes a deny-list JSON the site checker never reads; the checker hard-codes 13 names (`check-grammar.js:101`) | ✔ |
| 6 | The spec skill's cards tell the model to fill keys the spec writer does not know: `hitl`, `packages[]`, `price_services`, `internal_only[]` and more | key names retyped by hand on the cards, not read from the schema | ✔ `hitl`; rest B |
| 7 | The site's own exemplar entry fails the plugin's linter 14 times | the site checker requires "Jumpstart Proof-of-Value"; the plugin's linter requires "PoV Jumpstart" | D |
| 8 | Nine rules say different things in different files: ICP, prices by channel, the em-dash in the deck header, solution-ladder rungs, H1 length, vendor logos and others | the same rule written in 2–10 files | B |
| 9 | The listing skill's copy of the site contract is wrong on 8 facts, for example accent colour, null duration, which tab holds the case study, and platform labels | `listing-schema.md` and the cards restate the site's `SCHEMA.md` and checker | D |
| 10 | The four copies of the Workforce Optimization spec used as test fixtures carry three different one-liners | fixtures copied instead of derived | C |
| 11 | The committed icon provenance files carry a local scratchpad path from the owner's Mac | the picker's sidecar JSON is copied verbatim into the repo | C |

Two more issues are not output bugs:
- `docs/DECISIONS.md`'s "where enforced" column is wrong in 4 of 12 rows checked.
- `fonts/README.md` says the brand fonts ship, but only the README is in git (inferred: the fonts exist only in the owner's working tree, so a colleague's install measures fit on stand-ins). (C)

## Your hypotheses, checked

**1. "Abundance in per-pack md files" — confirmed.** The Account Insights run left 20 working files beside its artifacts and pictures: the spec, 11 Markdown files, 3 one-off patch scripts, 4 provenance JSON files and a stored architecture model. Once the spec is confirmed, only 4 of them are read again: the spec, the research brief, two facts from the intake note, and the architecture model, which is a derived copy (C):

| File | Read after its own step by | Verdict |
|---|---|---|
| `research/P1–P4.md` (2,371 lines) | only the synthesis into the 111-line brief | scratch |
| `inventory.md` + extracts, `sources/` | stage 1 only | scratch |
| `intake.md` | `build` reads two facts (artifact set, audience); ~90% is restated in the spec and log, and its clearance answer is already stale | put the two facts into the spec; drop the file |
| `grouping-draft.md`, `oracle-baseline-lens.md` | nothing; no skill writes them (ad hoc, 2026-09-22) | delete |
| `tools/polish_*.py`, `place_icon.py` | none: workarounds for builder gaps. All but one landed in the builders; the icon one is defect 3 | delete |
| `visuals/*.json` + `credits.md` | nothing; each picture is recorded 4 times (spec key, sidecar, credits row, log line) | provenance lives on the spec's picture entry |
| `architecture.json` | the renderers, but it is a derived copy (defect 2) | derive at render time |
| `decisions.md` | nothing reads it, and each approval is logged up to 3 times by different skills | keep; one writer per event |
| `pack-spec.md`, `research-brief.md`, `artifacts/` | yes | keep |

**2. "Overengineering in skills" — confirmed, and the larger cost is structural.**
- **Two plugins** mean three copies of `shared/` and two version bumps per release. They were split for two audiences, but sales and presales do not run Claude Code at all (the [packaging-skills](../../packaging-skills.md) page), so both plugins serve the same R&D users (inferred).
- **Four document skills** (feature list, deck, one-pager, executive summary) run one skeleton: build → fit → checks → editorial pass → review → fast path.
  - They restate one review protocol across 12 cards (3,090 words), and `build` restates it a thirteenth time.
  - They really differ in only three places: how a misfit is handled, which checks run, and the editorial pass. The feature list has no editorial pass, probably by accident (inferred).
- **`SKILL.md` boilerplate** is 22–28% of 8,993 words. The `spec` skill's file stands at 1,198 of its 1,200-word cap. (B)
- **The step→card map exists twice:** in each `SKILL.md` ("Card: `build`") and in 9 `manifest.yaml` files that the model also reads at start-up.
- **Long forms kept beside the cards** (16,518 words) are loaded by no step, and they contradict the cards in 6 places checked against the code. For example, `deck-anatomy.md` gives slide 5 two proof blocks where the builder fills four. (B)
- **Copies of the mini-site:**
  - The listing skill restates the site's contract (defect 9).
  - The demo skill ships a byte-identical copy of the site's Workforce optimization walkthrough (✔ `diff -rq`).

**3. "Lives in one place, doesn't repeat itself" — this is already the repo's written rule, and the implementation drifted from it.** Examples (B):

| Rule | Files that state it |
|---|---|
| "PoV 4–8 weeks, 10-week cap" | at least 10 |
| "Deferred, never not found" | at least 10 |
| "Technical criteria → 'Proof accepted when …'" | 8 |
| "Every integration claim states its tier" | 8 |
| "One metric set" | 7 |

Each of the 12 pack parts is described in 5–9 places: anatomy card, spec card, schema, generalization method, research format, coaching rules, and the artifact cards.

## Where I go further than your read

- **This is correctness work, not tidiness.** The 11 defects are what the duplication costs, and several of them reach a customer or a seller: a wrong price format, missing icons, a missing figure, and gaps in the name gate.
- **The biggest duplications are not the per-pack files.** They are the plugin mirror, the listing skill's copy of the site, and the pairs of long form and card.
- **The loop that turns each review finding into a rule has no subtraction step.** A correction adds a card line, an anatomy line, a long-form line, a linter rule, a self-check bullet and a DECISIONS row. Restructures add the new home and keep the old one: the long forms say "Long form; the runtime cards are …", and two stubs say "moved to the cards".

## Where I would hold back — keep these

- **The single spec as the spine,** and today's Markdown decision. Slim the 3,600-line codec later, not during the restructure.
- **The linters for names, prices, clearance and channel:** merge them, do not drop them.
- **The exemplar-filled deck and its linter.**
- **One architecture model per pack.** Derive it rather than store it; the intent, "don't create it from scratch each time", is kept by deterministic derivation.
- **Per-step cards with word and token budgets** (your skill-design rule). Only the second copy of the step map goes.
- **The 347-assertion suite as the safety net for the refactor.** Rewriting it in pytest can wait.
- **The site-manifest handshake.**

## Why it grew this way

1. **Two plugins for two audiences, one of which never installs anything.** This produced `shared/` three times, `sync-shared.sh` and its drift check, two manifests to bump, and `${CLAUDE_PLUGIN_ROOT}` pointing at different copies.
2. **A rule is written where the incident happened, not where the rule lives,** and restructures keep the old home. The card restructure in 0.1.17 added the runtime home but kept the long forms and the 19 anatomy cards beside it.
3. **Knowledge another repo owns was copied instead of read.** The site describes itself: its manifest, `SCHEMA.md` and checker. The plugin kept its own contract, exemplar, reference demo and, until 0.1.34, a checker port.
4. **Every step saves its intermediate output, and nothing is scratch by default,** so the pack folder is the run's log.
5. **The release loop rewarded patching (inferred).** A cache snapshot plus a version bump turned every fix into a release, 38 of them in six days. On the terminal this constraint has gone: a local-directory marketplace now loads in place ([E](E-plugin-mechanics.md) facts 1–2).

## Target shape

```
Oracle-Packaging-Skills/
  .claude-plugin/marketplace.json      one plugin
  plugins/oracle-packs/
    .claude-plugin/plugin.json         one version (or none: see Release)
    skills/
      spec/      SKILL.md + one card per pack part (the only home of that part's rules)
      visuals/   SKILL.md + cards + tools (the deck reads what it records)
      build/     SKILL.md + one review-protocol card + one card per artifact
                 (feature list · deck · one-pager · executive summary) + their tools
      listing/   SKILL.md + ~6 cards + 3 tools; the site's contract, exemplar and budgets read from the site
      demo/      SKILL.md + cards + tour engine + capture tool; the reference demo read from the site
    shared/      rules/ (cross-cutting: owner language, naming and clearance, client documents,
                 slide design, research standards, running agents; one file each)
                 data/ · schema/ · tools/ (packspec, one packcheck CLI, build_diagram, deckkit,
                 one spec-format module, py)
    fonts/
  packs/<slug>/   pack-spec.md + visuals/<the chosen files>
  tests/          the suite + one Workforce Optimization fixture spec, variants built in code
  docs/DECISIONS.md   one line per owner decision
  README.md
```

A pack's footprint:

- **In the repo:** `pack-spec.md` and the chosen pictures.
  - Each picture's source, licence and creator sit on its spec entry.
  - `architecture.json` is not stored. The renderers call `build_model(spec, channel)`, and the spec records that the picture was reviewed, against which spec hash.
- **Locally, in `~/oracle-packs/<slug>/`:** `research-brief.md`, `decisions.md` (one writer per event: `build` logs each approval with its stamp) and `artifacts/`.
- **Everything else is scratch:** the inventory and extracts, sources, the raw research, the picture candidates and the demo flow. They go into `.scratch/`, deleted once the spec is confirmed or the picture chosen.

## One home per fact

| Fact | Its one home | What goes |
|---|---|---|
| A pack part's rules (problem and solution … proof) | the spec card for that part | the 11 component anatomy cards; `pov-rules.md`; `packaging-coaching-rules.md` (read by nothing; its quotes go to DECISIONS); the rule restatements in `generalization-method.md` |
| Spec keys and their allowed values | `packspec.py`'s layout (`SCHEMA`) | hand-typed "Fills:" lines, replaced by a test that every key a card names exists; the allowed-value lists repeated in `lint_spec`, `packlint`, `deckkit` and the one-pager builder |
| An artifact's layout | that artifact's card in `build` | `deck-anatomy.md`; `anatomy/artifact-*.md`. Maintainer notes (geometry, CSS) move beside their tool |
| How to talk to the owner | one shared card | `talking-to-the-owner.md`; three card copies; the "Talking to the owner" block in 9 `SKILL.md` files |
| The review protocol: show before asking · approve / change / stop · changes go through the spec · one log line | one shared card | 12 protocol cards; the "Showing it to the owner" block ×9; `review-loop.md` §3 citations |
| The site's contract: schema, budgets, paths, gates, publish | the site repo (manifest, `SCHEMA.md`, checker) | `listing-schema.md` §1–9 and §13, `listing-rules.md`, `preview-and-publish.md`; the `switches`, `preview` and `publish` cards (folded into `site`); the stored exemplar and its refresh tool |
| The reference demo | the site repo | `demo/assets/reference-demo/` |
| Customer names | `shared/tools/denylist.txt`, read by the site checker as well (a site change) | the JSON converter and its example, unless the site starts reading that JSON |
| Price, duration, "results to follow", clearance wording | one spec-format module | 3–5 copies across the builders (defect 1) |
| `deckkit` | `shared/tools/deckkit.py` | the executive-summary copy |
| The architecture model | `build_diagram.build_model(spec, channel)` | the stored `architecture.json` (defect 2) |
| Picture provenance | the spec's picture entry | sidecars, `credits.md`, log lines |
| Owner decisions | `docs/DECISIONS.md`, one line each | the "where enforced" column, the rationale essays, `PLAN.md`, `TEST-REPORT.md`, `DECK-FIDELITY.md`, `SPEC-MARKDOWN.md` (7,917 words of finished plans) |
| Which card a step reads | the `SKILL.md` | 9 `manifest.yaml` files; `context_budget.py` reads the `SKILL.md` "Card:" lines instead |

## Plan

Everything goes on one branch in the plugin repo, one commit per step. The suite runs green before and after every step, and each phase ends in a release.

| Phase | What | Removes (est.) | Changes how you work? | Risk |
|---|---|---|---|---|
| 0 · Defects | the money formatter (1); architecture derived at render, stale-model fix (2); the deck reads the icon picks (3); the inserter writes `media` (4); spec cards' key names checked against the schema (6); the deck v2 test fixed and added to the suite; the leaked path scrubbed (11) | — | no: decks start showing the icons you picked | low |
| 1 · Dead weight | the legacy deck builder with its flags, tests and mentions (−1,376 lines); the `deckkit` copy (−862); the YAML fallback; dead functions and 12 unused flags; the 3 CSVs nothing reads; the two stubs; the orphan references; the four finished-plan docs; the long forms no step loads | ~2.4K code lines, ~27K words | no | low |
| 2 · One plugin | merge `oracle-packs-web` into `oracle-packs`; `shared/` once; delete `sync-shared.sh` and both mirrors | 141 files, 1.8 MB, one manifest | yes: `/oracle-packs-web:listing` becomes `/oracle-packs:listing` | low–medium |
| 3 · Five skills | the feature list, deck, one-pager and executive summary become `build` steps (one protocol card plus one card per artifact); one shared preamble card; manifests go; component rules live only in the spec cards | 4 `SKILL.md`, 9 manifests, ~22 cards, ~8K words (inferred) | yes: `/oracle-packs:deck` becomes `/oracle-packs:build <pack> deck` | medium |
| 4 · Lean pack folders | spec keys for the artifact set and the audience; picture provenance in the spec; `.scratch/` cleaned at confirmation; one log writer per event | per pack: ~20 files → spec + pictures in the repo; brief + log + artifacts locally | yes: fewer files | low |
| 5 · One checker, one Spec | a `packcheck` CLI (spec · artifact · consistency · diagram · gate) that takes the channel from the file name; one Spec accessor and format module for the four builders; allowed values declared once; the listing reads the site at run time | ~1.5–2K code lines (A, inferred) | no | medium |

Sequencing:
- **Phase 0 goes first.** Its fixes are small, independent of the restructure, and worth shipping even if everything else stops.
- **Other sessions changed the plugin repo five times today,** the latest at 15:22 +03:00. While phases 2 and 3 move files, other plugin work should pause, or rebase onto the branch after each phase.
- **The listing half of phase 5 has prerequisites in the site repo:**
  - the checker derives its product list, demo slugs and unpackaged slugs from the data instead of hard-coding them (today an eighth product cannot pass);
  - one deny-list decision (defect 5);
  - the tier-title decision below (defect 7).

## Conflicts only you can settle

These are defect 8, the rules whose homes disagree, with a recommended default for each.

| # | Rule | Homes that disagree | Recommended |
|---|---|---|---|
| 1 | Tier 1 title | site checker: "Jumpstart Proof-of-Value" · plugin linter and your 2026-09-18 decision: "PoV Jumpstart" | your 2026-09-18 wording everywhere, with the site checker following, unless the site wording was a later ruling of yours |
| 2 | Prices by channel | `naming-and-clearance.md` and the 2026-09-23 executive-summary round: partner print carries every tier, with disclaimers · packages card and anatomy: nothing beyond the PoV is published externally | the 2026-09-23 ruling: every tier on partner print with disclaimers; the PoV only on the site |
| 3 | ICP | `anatomy/icp.md`: never a seller ICP, never "owns product X" · generalization method and coaching rule 17: name the partner's system in the ICP | the buyer's role, company and pain; the system they run as a qualifier, never as the definition |
| 4 | Em-dash | `client-documents.md` bans it · `lint_deck.py` enforces "Oracle AI & Data Solutions — <pack>" | treat the header as a lockup and exempt it; keep the ban for copy |
| 5 | Vendor logos | `slide-design.md` rule 12: official logos · `naming-and-clearance.md` §3: the wordmark as text | text, unless you hold the vendor's logo files and usage terms |
| 6 | Raw research after confirmation | — | delete it; the brief keeps its sources |
| 7 | `docs/packaging-approach.html` | describes the retired part-by-part flow and the retired brand | delete, unless you still send it to people |
| 8 | Brand fonts in git | the README says they ship; only the README is committed (inferred) | commit them to the private repo if the licence allows practice-internal sharing; otherwise correct the claim |

Four more conflicts already have a later ruling or the site as their owner, and I resolve them to that source in the phase that merges their homes:
- solution-ladder rungs;
- a roadmap row with nothing behind it;
- the stage view dropping features;
- H1 length.

A fifth goes the same way: the default for naming the customer. `engagement-context.md` still says "no customer has consented", while the 2026-09-23 proof decision says ask, and propose yes for our team and for sellers.

## Guardrails so it does not grow back

These are mechanisms, per your skill-design rule, not more prose:
- **An orphan test:** every file under the plugin is referenced by a `SKILL.md`, a card, a tool or a test. It fails on stubs and dead tools.
- **A duplicate test:** no byte-identical files, and no card sentence of 12 or more words repeated in another card (threshold inferred).
- **A key test:** every spec key a card names exists in `packspec.py`'s layout.
- **A one-line DECISIONS format:** date · decision · at most one line of why, with no "where enforced" column.
- **A release in one command,** or none (below).

## Release

- **Terminal sessions** on your Mac load the local-directory marketplace in place: edits apply at the next session or `/reload-plugins`, with no version bump (E, documented).
- **The desktop app** still runs its install-time cache copy (E, secondary source).
- **Colleagues' git installs** would update on every commit if `version` is dropped from `plugin.json` (E, documented). Whether the desktop app then refreshes from a directory marketplace is untested.
- **So:** one plugin, one `tools/release.sh` that refuses a dirty tree and bumps the one version, and a Mac test of the versionless setup before relying on it. README line 41 ("re-copies only when the version is higher") gets corrected in phase 1.

## Result, estimated

| Measure | Now | After |
|---|---|---|
| Plugins · skills | 2 · 9 | 1 · 5 |
| Copies of `shared/` | 3 | 1 |
| Tracked files | 417 | ~200 (inferred) |
| Instruction words | 103K, half never loaded | ~65–75K, every runtime file loaded by some step (inferred) |
| Tool code | ~21.3K lines | ~16.5–17K (A) |
| Files stating "PoV 4–8 weeks" | ≥ 10 | 1, plus the linter |
| A pack in the repo | spec + model + 4 JSON + credits + pictures | spec + pictures |
| A pack locally | 11 `.md` + scripts + `research/` | brief + log + `artifacts/` |
| Skill descriptions paid every turn | ~740 words | ~350 (inferred) |

Effort (inferred):
- **Best, 2 working days:** phases 0–4, with the site prerequisites deferred.
- **Likely, 3–4 days:** including your review pauses and a release per phase.
- **Worst, 6 days:** if the conflicts table stalls phase 3, or the site checker changes have to land first.

The anchor: the 2026-09-22/23 rounds shipped about 35 releases in two days, and this work is mostly deletions and moves, checked by a green suite.

## Gaps

- **The listing and demo were not run end to end:** no Mac, no local site run. Defects 4, 5 and 7 are read from the code and the checker, not observed on a rendered page.
- **PDF lint was skipped in the suite run** (no `pdftotext` here), and so was the live-site check (`ORACLE_SITE_ROOT` is a macOS path).
- **The desktop app's refresh behaviour** without a plugin version is undocumented.
- **Whether the brand fonts are licensed** for a private repo is your call; the audit only saw that they are not committed.
