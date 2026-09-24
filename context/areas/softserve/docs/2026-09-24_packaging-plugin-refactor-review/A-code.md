# A — Code audit of oracle-packaging-skills (READ-ONLY)

Started 2026-09-24. Repo: /home/user/oracle-packaging-skills. Mirrors under plugins/*/shared/** ignored.

## 0. Inventory — line counts (wc -l)

| File | LOC |
|---|---|
| shared/tools/packspec.py | 3600 |
| shared/tools/tests/run_tests.sh | 1420 |
| shared/tools/lint_spec.py | 924 |
| shared/tools/packlint.py | 707 |
| shared/tools/regen_roadmap.py | 651 |
| shared/tools/lint_artifact.py | 643 |
| shared/tools/build_diagram.py | 499 |
| shared/tools/check_consistency.py | 498 |
| shared/tools/pack_paths.py | 254 |
| shared/tools/check_diagram.py | 248 |
| shared/tools/context_budget.py | 218 |
| shared/tools/spec_stamp.py | 185 |
| shared/tools/py (launcher) | 172 |
| shared/tools/install_fonts.py | 135 |
| deck/tools/build_deck_v2.py | 1567 |
| feature-list/tools/build_feature_list.py | 1454 |
| deck/tools/build_deck.py (legacy) | 1376 |
| one-pager/tools/build_one_pager.py | 993 |
| deck/tools/deckkit.py | 862 |
| exec-summary/tools/deckkit.py (copy) | 862 |
| deck/tools/lint_deck.py | 674 |
| deck/tools/exemplar.py | 655 |
| exec-summary/tools/build_exec_summary.py | 603 |
| visuals/tools/apply_choice.py | 426 |
| visuals/tools/visuals_common.py | 381 |
| visuals/tools/search_photos.py | 281 |
| visuals/tools/fetch_icon.py | 247 |
| visuals/tools/contact_sheet.py | 223 |
| visuals/tools/suggest_icons.py | 143 |
| deck/tools/render_probe.sh | 176 |
| deck/tools/pair_sheet.py | 71 |
| deck/tests/test_lint_deck.sh | 324 |
| deck/tests/test_build_deck_v2.py | 270 |
| listing/tools/insert-product.mjs | 349 |
| listing/tools/refresh-exemplar.mjs | 333 |
| listing/tools/derive-stage-view.py | 291 |
| listing/tools/diagram_to_site.py | 216 |
| listing/tools/denylist-to-json.py | 125 |
| demo/tools/capture-demo-frames.mjs | 217 |
| tools/sync-shared.sh | 29 |

(progress sections appended below as each question is finished)

## 6. Tests — RUN RESULT (done first, in background)

- Venv: scratch/venv, `pip install -r shared/tools/requirements.txt` OK (PyYAML, python-docx, python-pptx, Pillow, pypdf).
- Command: `ORACLE_PACKS_PY=<venv>/bin/python CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome TMPDIR=<scratch>/tmp bash shared/tools/tests/run_tests.sh`
- Result: **`run_tests: 347 passed, 0 failed`**, exit 0, **~82 s** wall (start 1790254806, log mtime 1790254888).
  - 347 top-level assertions + 33 inside the deck sub-suite (`deck/tests/test_lint_deck.sh`, counted as 1 top-level ok) = 380 ok lines.
- Skipped/degraded in this env: `refresh-exemplar.mjs` live-site check "(skipped: no site root)" (ORACLE_SITE_ROOT points to a macOS path); `.pdf` lint "skipped when pdftotext is absent" (poppler not installed; the suite asserts the skip). node v22 present, Chromium used for the one-pager PDF, LibreOffice (soffice) present.
- Side effects IN THE REPO (all git-ignored, so `git status --short` looked clean): 13 `.pyc` in 6 `__pycache__/` dirs + `plugins/oracle-packs/skills/deck/tests/architecture.json` (hidden by `.gitignore:22 plugins/*/skills/*/tests/architecture.json` — a gitignore patch over a test that writes into the repo). All created inside the run window (mtime-checked); removed with `git clean -fdX -- <those paths>`; repo verified clean after.
- **`deck/tests/test_build_deck_v2.py` is NOT run by run_tests.sh or test_lint_deck.sh** (only referenced in deck/assets/README.md:22,85, which claims "49 assertions"). Run manually: **4 of 66 checks FAIL**:
  - the engine box does not name NVIDIA NeMo Agent Toolkit / NVIDIA NIM / NVIDIA NeMo; the destination system is missing (test lines 164-166, `run_variability`).
  - Root cause verified: `build_diagram.load_or_build` (build_diagram.py:386-407) returns ANY existing `architecture.json` beside the spec (model_path = spec folder, :381-383) without checking slug/sha. The two fixture specs share `deck/tests/`, so the variability build reuses the first fixture's model. Re-running `run_variability` alone with no stale file: 14/14 pass.

## 1. Checker overlap

### Inventory (rule ids counted from each docstring + code)
| Tool | LOC | Codes | What it checks |
|---|---|---|---|
| lint_spec.py | 924 | 32: SPEC001-029 + SPEC900/901/902 | spec completeness (001/002/014/902), statuses/enums (015 status, 016 role, 011 figure_status, 025 kind), first-order `user:<date>` sources (003), catalog ids + vendor (004/018), roadmap id (005), PoV weeks 8/10 (006/007), one metric set (008), tier ids/names/order (009), deny-listed names in spec copy (010), caveat (012), clearance channels (013), name-variant derivation (017), workflow 3..7 steps (019/020), product counts (021/022), capability tree size (023), unknown record keys (024, reads packspec.RECORD_LISTS), technical-name regex (026), owner_role (027), retired family name in 4 header keys (028), parse error (029). Prints a 17-row completeness table. |
| lint_artifact.py | 643 | 22: ART001-003, 101-105, 201-206, 301-303, 401-403, 900/901 | deny-list names (001) / asset paths (002) / partner-standing claims (003); catalog `not_this` (101), AIDP (102), near-miss vendor names (103), channel name variant (104), retired family name (105); vocabulary regexes on customer channels (201-205), packaging words in the one-liner (206); price disclaimer (301), non-PoV price on site (302), price in demo (303); "proven" w/o delivered figure (401), tier names (402), S/M/L (403). |
| check_consistency.py | 498 | 8: CON001-007 + CON900 | one-liner verbatim (001), legacy tier names (002), week figures vs tier durations (003, with 2 exemptions), EUR figures vs spec prices (004), KPI figures (005), stamp sha (006) / no stamp (007). |
| check_diagram.py | 248 | 0 codes (3 checks x 3 artifacts) | model node names present, edge labels present, no box unknown to the model — for deck (.pptx via python-pptx), one-pager (regex on HTML), site (regex on diagrams.js). Own output format `artifact: message`. |
| lint_deck.py | 674 | 0 codes; 11 numbered checks | ten slides; header on 2-10; no tier line on cover; cover hero layout + picture; allowed faces; rounded corners/pill caps; icon count + no numbers on industry cards; proof slide 4 labels / 3 tiles / logo-vs-clearance; architecture names pack, engine product, outputs, arrows >= inputs; table font floor; ladder rows. |
| spec_stamp.py | 185 | 0 (library + tiny CLI) | computes/reads `pack-spec sha256:<12> commit:<..>` in docx/pptx core props, HTML meta, PDF info. CON006/007 live in check_consistency. |
| context_budget.py | 218 | 0 codes; 3 checks | per-step token budget (6000 start-up / 2000 step), word caps (card 300, owner-language 400, SKILL.md 1200), missing files. Own PyYAML guard, own output format. |
| packlint.py | 707 | helpers only | PyYAML guard, line-preserving YAML loader, `load_spec` via packspec, Report (`file:line: CODE`), deny-list reader, docx/pptx/pdf/html text extraction, catalog + roadmap readers, MONEY_RE, money_value, norm_ws/norm_loose. |

Total rule ids: **62** (32 SPEC + 22 ART + 8 CON) plus 11 deck checks, 9 diagram checks (3x3), 3 budget checks.

### Overlaps / duplicates (file:line)
1. **Retired family name — 5 regex copies, 2 behaviours.** lint_spec.py:137-138 (SPEC028), lint_artifact.py:150-152 (ART105, the only one exempting the real catalog product "OCI AI Accelerator Packs"), build_one_pager.py:525-526, build_exec_summary.py:50-51, build_deck_v2.py:56-59. The 4 identical copies would also hit "OCI AI Accelerator Packs". Brand literal "Oracle AI & Data Solutions" in 8 code files (incl. build_feature_list.py:214 LOCKUP_NAME, lint_deck.py:252, build_deck.py).
2. **Tier vocabulary — 3 checkers, 2 near-identical regex sets.** SPEC009 (lint_spec.py:417-456 via PL.TIER_IDS/TIER_NAMES), ART402 TIER_RULES (lint_artifact.py:130-139), CON002 LEGACY_TIER (check_consistency.py:78-80). ART402 and CON002 match the same strings (Jumpstart w/o PoV, Quick Start, PoC package, Integration & Scale, Scale..tier) — the build/listing gate runs both tools on the same files (cards/consistency-gate.md, listing cards/gates.md), so one slip = 2 findings. Tier names also re-declared in build_feature_list.py:216 TIER_LABELS.
3. **Spec price set extracted twice.** lint_artifact._prices (lint_artifact.py:251-271) vs check_consistency._prices (check_consistency.py:182-203): same loop tiers x (services_price, infra_price_monthly) x (value, range).
4. **Deny-list scanning twice.** SPEC010 (lint_spec.py:727-755, spec copy) and ART001 (lint_artifact.py:324-336, artifact text) — same DenyEntry.regex loop; reasonable split by input, but the "which spec fields are customer-facing" list differs from the prose: lint_spec.py:213 DENY_SCAN + docstring :35-37 include `icp` and `kpis attribution.otherwise`; pack-spec.md:693 lists only one_liner, problem_solution, verticals, name (doc drift).
5. **Name-variant rule in 4 places.** lint_spec.check_name_variants (757-778, SPEC017 derives site / "<name> App" / sentence case), lint_artifact CHANNEL_VARIANT (85-86) + ART104 (552-579), deckkit.Spec.name (deckkit.py:690-694), build_one_pager.build_context (329-335) — each with its own fallback chain.
6. **Clearance lookup `clearance.customer_name_allowed.<channel>` in 5 places:** lint_artifact._cleared (245-249), deckkit.Spec.customer_name_allowed (702-703), build_one_pager.py:325, build_exec_summary.py:422-423, lint_deck.expectations (244, via deckkit). Default anonymized descriptor differs: "an enterprise customer" (deckkit.py:711, build_exec_summary.py:420) vs "the delivery customer" (build_one_pager.py:327).
7. **String walkers x2:** lint_spec.walk_strings (836-845) and check_consistency._strings (121-129).
8. **One-liner located in artifact text twice, two methods:** ART206 (lint_artifact.py:468-501, 1-3 line windows + norm_loose) and CON001 (check_consistency.py:295-327, 4-word anchor + window).
9. **Two line-preserving YAML loaders:** packlint.load_yaml (packlint.py:95-135, LineDict/LineList) — only caller is load_catalog (:584), which discards the line info — vs packspec.loads_yaml (packspec.py:137-206). packlint's is dead weight: `yaml.safe_load` would do.
10. **Unknown-key check twice:** `packspec.py check` -> unknown_keys over the whole SCHEMA (packspec.py:1129-1148, 3505-3509) and SPEC024 over record lists only (lint_spec.py:515-548). Parse errors likewise: packspec check + SPEC029.
11. **Four output conventions:** packlint.Report `file:line: CODE` (3 tools), check_diagram `artifact: message`, lint_deck `N problem(s)` bullets/no codes, context_budget table. Four PyYAML guards: packlint.require_yaml (63-69), packspec._yaml (127-133), context_budget (113-117), deckkit/builders import yaml inline.
12. **Spec wrappers:** packlint.load_spec (LineDict view), deckkit.Spec (dotted get), build_one_pager.dig/need, build_feature_list.dig/need, build_diagram.dig, visuals_common.load_spec (369), derive-stage-view.load_spec (77) — 7 ways to read the same packspec.load() output.

### Could packlint + lint_spec + lint_artifact (+ check_consistency) be one module?
Yes, mechanically: all three import only packlint (lint_spec.py:113, lint_artifact.py:80, check_consistency.py:63-64) and share Report/load_spec/deny-list/catalog. A single `packcheck.py spec|artifact|consistency` would drop 3 argparse mains, 3 spec-load preambles, 2 price extractors, 2 tier regex sets, 2 retired-header regexes. (inferred) ~400-500 LOC saving of 2,772 (924+707+643+498). Keep the three CLIs as subcommands because skills call them by name (~30 references in SKILL.md/cards).

### One-off incident patches vs general rules (evidence = dated comments)
- Narrow incident exemptions: CON003's two exemptions (next_steps text + engagement weeks, check_consistency.py:145-151, 234-248, "DHL executive summary ... 2026-09-23"); ART103's prefix-completion and extracted-line-break skips (lint_artifact.py:431-445, "2026-09-23"); pdftotext column separator (packlint.py:510-513, 2026-09-23); base64 stripping (packlint.py:420-423, "YEt read as yet"); covered_by_good_name case rule (lint_artifact.py:199-227, cuOpt/NeMo); ART105 "Packs" lookahead (lint_artifact.py:147-152); SPEC025 "nothing marked" branch (lint_spec.py:697-708, "the DHL one-pager, 2026-09-23"); lint_deck check 8 and 11 (2026-09-23 owner reviews); CON004 KPI-money exemption (check_consistency.py:152-158).
- General rules: SPEC001-005, 009, 011-016, 019, 024, 029; ART001-003, 101, 104, 301-303, 402/403; CON001, 002, 004-007.

## 2. packspec.py (3,600 lines) — breakdown

| Lines | Section | ~LOC |
|---|---|---|
| 1-70 | module docstring (format + CLI contract) | 70 |
| 72-134 | imports, SpecError, LineMap, Misfit, `_yaml` guard | 63 |
| 136-233 | YAML codec: `loads_yaml` (line-preserving), `_dumper`, `_flow` | 98 |
| 235-321 | key paths: `format_path`, `parse_path` | 87 |
| 323-799 | scalar codec: text escaping, numbers, money (`_fmt_money`/`_parse_money` 558-627), duration (629-690), inline lists, `enc_scalar`/`dec_scalar` | 477 |
| 801-1157 | **LAYOUT**: F/Rec, 40+ Rec declarations (802-1007), TOP_KEYS/SECTIONS (1009-1016), **SCHEMA** (1035-1111), RECORD_LISTS, `unknown_keys`, `field_for` | 357 |
| 1159-2162 | **writer**: `_Writer` (1184-2156, 16 `sec_*` methods + table/records/pairs/paragraph forms) + `dump` | 1,004 |
| 2164-3172 | **reader**: `_Reader` (2174-3167, mirror of the writer's 16 sections) + `loads_markdown` | 1,009 |
| 3174-3304 | loader: `spec_format`, `loads`, `twin_of`, `_note_yaml`, `load`, `canonical_json`, `data_sha`, `differences`, `roundtrip_problems` | 131 |
| 3306-3600 | CLI: `get` / `set` / `check` / `convert`, `resolve_path`, `save`, `check_spec` | 295 |

Writer + reader + scalar codec = 2,490 lines (69%). `Misfit` appears 100 times: the writer's cascade "try this form, else the next form down, else park it under `## Other fields`" — the price of the "lossless for any data" contract (docstring :17-25), with two forms per record list (table when every row fits RECORD_LIMITS 220/8/160, else one heading per record: packspec.py:1018-1020, pack-spec.md:30).

### Facts stated in 2-3 places
| Fact | packspec.py | pack-spec.md | lint_spec.py / packlint.py | other |
|---|---|---|---|---|
| key names + labels (~250 keys) | Rec/SCHEMA 802-1111 | template 36-470 + contract 472-681 | SPEC024 reads RECORD_LISTS (no dup) | drift guarded by run_tests.sh:397-433 (template == writer output; every SCHEMA key documented) |
| meta.status values | TEXT, no enum | :481 | STATUS_VALUES :117 | — |
| figure_status values | TEXT | :246, :613 | FIGURE_STATUSES :119 | — |
| kpis[].kind values + default | TEXT | :234, :598-610 | KPI_KINDS/DEFAULT :124-125 | deckkit.py:767-770, build_one_pager.py:568-570 |
| oracle_products[].role | TEXT | :591 | :357 | — |
| tier ids pov/integration/scaling | `_tiers` 824-832 | :624 | packlint TIER_IDS :50 | — |
| tier display names | — | :623 | packlint TIER_NAMES :51 | build_feature_list.py:216 |
| channels (4) | CHANNEL_LABELS 957-958 | :664 | packlint CHANNELS :54 | lint_artifact.py:84-86, 587; build_one_pager.py:67; build_exec_summary.py:83 |
| name_variants keys | NAME_VARIANTS 840-842 | :487 | lint_spec :265, :766-770 | lint_artifact.py:85-86 |
| money keys / duration keys | _MONEY_KEYS 558, _DURATION_KEYS 629 | :26-27, :626 | lint_spec reads duration_weeks.max/justification :467-493 | — |
| required keys per component | — | "every component key present" :685 only | REQUIRED_KEYS/LIST_ITEM_KEYS :153-174 (single home) | deckkit.Spec.need, build_one_pager.need, build_feature_list.need (per-builder "missing" errors) |
| empty marker `-` set | — | :604, :689 | EMPTY_MARKERS :145 | deckkit.py:745, build_one_pager.py:546, build_deck_v2.py:64 |
| workflow 3-7 steps, PoV 8/10 weeks | — | :564, :688 | :504-513, :486-493 | — |
Enums, thresholds and required-ness are NOT covered by the template test — only key names/labels are.

### Dead / soon-dead code
- The YAML spec path, "for one release" (decision "The spec in Markdown (2026-09-24)", DECISIONS.md:56): spec_format yaml branch (3187-3189), `loads` yaml branch (3196-3197), `twin_of` (3204-3211), `_note_yaml` (3214-3225), `load` yaml branch (3240-3241), `cmd_set` YAML refusals (3423-3432), `cmd_convert` + its parser (3529-3570, 3587-3590) ≈ 85 lines; pack_paths.py YAML_SPEC_NAME + `spec_file` fallback (60, 176-182); apply_choice.py YAML refusal (~100-110); run_tests.sh YAML cases (~479-540, 565-569, 579-591, 1236-1243, 1287-1300). No `pack-spec.yaml` exists in the repo (all 3 packs + example are .md) — only the tests exercise it. `loads_yaml` itself stays (front matter 2697, Other fields 3120).
- packlint.load_yaml (95-135) duplicates loads_yaml for a caller that ignores lines (see §1.9).

### What a minimal version would need (inferred)
Consumers use only: `load()` -> (data, linemap) (every builder + packlint), `dump`/`save`/`roundtrip_problems` (set, apply_choice, tests), `data_sha` (stamp), SCHEMA/RECORD_LISTS (SPEC024), `get`/`set`/`check` CLI. Options, largest first:
1. Keep Markdown but one form per record list (always a table, or always headings) and refuse undocumented shapes at write time instead of the 100-site Misfit cascade + Other-fields residuals: writer+reader could plausibly halve (~1,000-1,200 lines saved).
2. Derive enum values (status, figure_status, kind, role, tier ids, channels) into SCHEMA field declarations (e.g. `F("status","Status", enum=STATUS_VALUES)`) so lint_spec, builders and the template test read one list.
3. Drop the YAML path after the release (~85 + ~20 + ~40 test lines).

## 3. Deck builders

**Who calls build_deck.py (legacy, 1,376 LOC):** no SKILL.md step runs it (deck/SKILL.md runs only build_deck_v2.py). Mentioned as a fallback in deck cards/build.md:17, cards/lint.md:19, SKILL.md:63 (checklist mentions `--legacy-cover-ok`), deck-anatomy.md:458-471, brand-tokens.md:3,24, assets/README.md:16,90-105; stale mention in render_probe.sh:175 ("the fit report in build_deck.py"). Executed only by deck/tests/test_lint_deck.sh:95-108 (8 assertions). Docs: DECK-FIDELITY.md:24,37; TEST-REPORT.md; DECISIONS.md:55.

**Removing the legacy path takes:**
1. delete build_deck.py (1,376) — it also carries a *second* architecture model (arch_node/arch_label/layer_catalog_names/arch_model/arch_summary, build_deck.py:719-860) that bypasses build_diagram ("the one model"), and its own icon lookup (icon_library/icon_for 156-196).
2. lint_deck.py: drop `--legacy-cover-ok` (docstring 43-49; 281; 376-381; 461; 488-491; 621-626 ≈ 25 lines).
3. test_lint_deck.sh: drop the legacy section (95-110, 8 assertions).
4. docs/cards: the 9 mentions above.
5. deckkit.py names used only by the legacy builder become dead: CONTENT_W, DECK_TITLE_BOX, MARGIN_L, FONT_TITLE (legacy only); already dead today: HEADER_BOX (72), FONT_MONO (65), line_h() (456), wrap_to() (855), sibling_kit_path() (860).
6. **softserve-deck-base.pptx must stay**: build_exec_summary.py:45 BASE_DEFAULT uses it whenever `--host-deck` is absent (exec-summary-anatomy.md:162, exec-summary/assets/README.md:12). deck/assets/README.md:9 "Only the legacy builder uses it" is wrong.

**build_deck_v2.py (1,567) imports from deckkit only** FitLog, Spec, SpecError, fmt_duration, fmt_price, product_name (+ wrap_count lazily) — build_deck_v2.py:39-41; everything else comes from exemplar.py (655).
- exemplar.py dead functions (defined, never called anywhere): slide_count (53), fill_lead (348), fill_points (354; both still listed as API in exemplar-builder.md:121,187), copy_cell_runs (587), table_frame (604), shape_text (lint_deck.py has its own).
- **Defect (inferred, strong):** build_deck_v2.py:54 `ICON_MAP_DEFAULT = deck/assets/icons/map.yaml` does not exist (deck/assets holds only README, exemplar/, softserve-deck-base.pptx), and v2 never reads `verticals[].icon` (no match for `icon` other than the slot id, :452). So every industry card keeps the exemplar's own icon (the note at :483-484 fires), although deck/SKILL.md:19 says "the industry icons come from shared/data/icons/", slides-1-5.md:16 lists `verticals[].{name, what_matters_here, icon}`, and the visuals skill writes `verticals[].icon` "for the deck". No builder or listing tool reads `verticals[].icon` at all (grep: only visuals/tools/* mention it). lint_deck check 7 and test_build_deck_v2 only count pictures, so neither catches it.
- **Defect (verified):** build_diagram.load_or_build (381-407) reuses any `architecture.json` beside the spec regardless of slug/sha -> test_build_deck_v2 fails 4/66 (see §6); in real use a spec edit never refreshes the model unless someone deletes the file (inferred: that is the intended "reviewed model wins" rule, but nothing warns when the model and spec diverge).

**deckkit.py (862) byte-identical in deck/tools and exec-summary/tools** (`cmp` clean). Import resolution: build_exec_summary.py:25-28 and build_deck.py/lint_deck.py try `_HERE` first, then `../deck/tools` — so exec-summary imports its own copy; deck tools import deck's. Stated reason: "so each skill copies standalone" (deck/assets/README.md:139-140, exec-summary/assets/README.md:9,77 "Keep the two in sync"). The reason does not hold: exec-summary already depends on the deck skill for softserve-deck-base.pptx (build_exec_summary.py:45) and render_probe.sh (exec-summary SKILL.md, cards/check.md), and deckkit itself reaches into shared/tools for packspec (deckkit.py:639-651). No test asserts the copies are identical (run_tests.sh has a cmp for requirements.txt at :114-115, none for deckkit). -> move to shared/tools/deckkit.py (synced to both plugins by sync-shared.sh; python-pptx is already in the shared requirements) and delete both copies: -862 LOC and one manual sync rule.

pair_sheet.py (71) and render_probe.sh (176): referenced by deck cards/render-qa.md and exec-summary SKILL.md/check.md — keep.

## 4. Cross-builder duplication (feature list / deck v2 / one-pager / exec summary)

| Cluster | Copies (file:lines) | Shared home |
|---|---|---|
| dotted spec access + "missing" error | deckkit.Spec.get/need (deckkit.py:670-687); build_one_pager.dig/need (205-218); build_feature_list.dig/need (517-530, identical text to one-pager's); build_diagram.dig (81); packlint.dig (246) | one `specview.py` (or packspec.get) in shared/tools |
| SpecError classes | packspec.py:89, deckkit.py:635, build_one_pager.py:114, build_feature_list.py:222 (+ build_diagram.DiagramError) | packspec.SpecError |
| channel name variant | deckkit.Spec.name (690-694: internal_slide→site→name / external→site→name); build_one_pager.build_context (329-335: no `site` fallback) | Spec.name |
| clearance + descriptor | deckkit.Spec.customer_name_allowed/customer_label (702-712, default "an enterprise customer"); build_one_pager.py:325-327 (default "the delivery customer"); build_exec_summary.py:420-434 | Spec |
| metric kind routing | deckkit.Spec.kpi_kind/sales_kpis/technical_kpis/pov_success_line/has_figure (745-788); build_one_pager EMPTY_FIGURES/has_figure/kpi_kind/sales_kpis/technical_kpis/pov_success_line (546-590) — same logic twice, plus lint_spec KPI_KINDS (124), build_deck_v2 EMPTY_MARKS/is_empty (64, 107) | Spec |
| price formatting | deckkit._CUR/_money/fmt_price (816-842) vs build_one_pager CURRENCY/money/_short (110, 238-265). **Divergent:** deckkit._money checks `v % 1000 == 0` before `>= 1_000_000`, so €2,000,000 prints "€2000K" on deck/exec summary and "€2M" on the one-pager (inferred from code, not run). Third codec in packspec._fmt_amount/_fmt_money (516-590) for the file format | one `fmt_price(price, html=False)` |
| duration formatting | deckkit.fmt_duration (845-852) vs build_one_pager.duration (268-278, adds duration_label) — same min–max/target logic | one helper |
| "results to follow" wording | build_exec_summary.py:80 FIGURELESS_CAVEAT; build_one_pager.py:406 literal copy; build_deck_v2.py:606, :638 (comments say "the same words as the one-pager and the executive summary") | one constant |
| retired header / brand | build_deck_v2.py:56-59, build_exec_summary.py:50-51, build_one_pager.py:525-544 (eyebrow), build_feature_list.py:214 LOCKUP_NAME, build_deck.py:57, lint_deck.py:252 | one constant + one rewrite fn |
| tier ids / names / glyphs | build_deck_v2 TIER_ORDER/TIER_DEFAULT_GLYPH/GLYPH_KIND (61-63); build_one_pager GLYPH/GLYPH_BY_CHAR/level_for/_normalise_level (101-108, 281-312); build_feature_list TIER_LABELS (216); build_deck._glyph (1011); packlint TIER_IDS/NAMES | packlint/packspec |
| font-fit measurement | deckkit (85-233: shipped faces, candidates, SAFETY 1.06/1.02, LINE_FACTOR 1.22, wrap_count, autofit_pt) vs build_feature_list (129-137, 231-391: FONT_DIRS, Symbols, Measurer, LINE_FACTOR 1.20). Both Pillow, both read plugin fonts/. One-pager measures in Chrome instead (BUDGETS/measure 74-100, 690-747) | shared `fontfit.py` (inferred ~150 LOC saved) |
| output naming | `{slug}-sales-deck.pptx` (deck_v2:1507, legacy:1322), `{slug}-exec-summary.pptx` (exec:541), `{slug}-feature-list.docx` (fl:1361), `{slug}-one-pager-{channel}` (op:916) — 4 inline f-strings, and the channel suffix only on the one-pager | pack_paths.artifact_name() |
| stamp writing | `core_properties.identifier = spec_stamp.stamp()` in deck_v2 (1509/1542), exec (544/585), feature list (1362/1383), legacy (1324/1355); HTML meta + PDF /PackSpec written in build_one_pager (STAMP_META 65, ensure_stamp_meta 829-840, stamp_pdf 843-867) while spec_stamp.py only reads them (its own META_TAG/HTML_META 52-53) | spec_stamp.write() beside read_stamp() |
| renderer discovery / page count | build_one_pager.find_chrome (750-776) + page_report (819-826); capture-demo-frames.mjs:66-80 (JS, no PATH search); build_feature_list find_soffice/pypdf_page_count/soffice_page_count (1197-1250); render_probe.sh (bash) | shared `render.py` for the Python two (inferred ~80 LOC) |
| shared/tools path search | `for _up in range(2, 6)` blocks: build_deck_v2 x2 (33-37, 45-49), build_feature_list x2 (82-93), build_one_pager x3 (52-63, 602-609 via importlib), build_exec_summary (38-42), build_deck (41-45), apply_choice (57-58), deckkit (642-649), visuals_common (360), derive-stage-view (68) — 14 copies, 3 import styles | one `_bootstrap` idiom, or have `shared/tools/py` set PYTHONPATH |
| catalog readers | packlint.load_catalog (576-613), deckkit.catalog/product_name (578-632, x2 copies), build_diagram.catalog/product_name (124-160) | one catalog module |

## 5. Dead or unreferenced code

**Every tool file is referenced** by at least one SKILL.md, card, README, doc or test (grep map above). No orphan scripts. But:

- **Untested tools** (not mentioned in run_tests.sh or test_lint_deck.sh): regen_roadmap.py 651, search_photos.py 281, derive-stage-view.py 291, fetch_icon.py 247, contact_sheet.py 223, capture-demo-frames.mjs 217, render_probe.sh 176, suggest_icons.py 143, install_fonts.py 135, denylist-to-json.py 125, pair_sheet.py 71 = **2,560 LOC**; plus test_build_deck_v2.py (270) never run and currently failing.
- **Write-only data:** regen_roadmap.py writes 4 CSVs; only `roadmap-items.csv` is read by code (packlint.load_roadmap_ids -> SPEC005; spec/SKILL.md:21). `pack-tracker.csv` (18 rows), `pack-crosswalk.csv` (9 rows) and `roadmap-l2-patterns.csv` (26 rows) have **no reader** in any tool, SKILL.md or card — only roadmap.README.md documents them.
- **Write-only spec key:** `verticals[].icon` is written by visuals/apply_choice.py and read by no builder or listing tool (see §3).
- **Dead functions/constants (grep returns only the definition):** deckkit HEADER_BOX, FONT_MONO, line_h(), wrap_to(), sibling_kit_path() (x2 copies); exemplar.py slide_count, fill_lead, fill_points, copy_cell_runs, table_frame, shape_text; packlint SUPPORTED_EXT is only used inside packlint (fine), packlint.load_yaml's line tracking unused by its sole caller.
- **Unreferenced CLI flags** (no card, test or doc outside the tool mentions them): install_fonts `--from`; lint_deck `--geometry`, `--header`; pair_sheet `--scale`; apply_choice `--depicts`, `--library`, `--provenance`; contact_sheet `--label-from`, `--max-width`; suggest_icons `--keywords`; denylist-to-json `--print`; derive-stage-view `--state-all`. (Chrome/git switches the scan also listed are false positives.)
- **Deny-list parsed 3 ways:** packlint.DenyEntry/load_denylist (316-353), denylist-to-json.convert (55-77, own loop), run_tests.sh reading it for fixtures.
- **"Import packspec from the right folder" implemented 6 times:** packlint._packspec (157-162), pack_paths.packspec_module (133-139), deckkit.packspec_module (639-651, x2 copies), visuals_common.packspec_module (349-366), derive-stage-view._packspec (59-74, identical to visuals_common's). PyYAML guards: 5, with exit 2 except derive-stage-view (exit 3).
- **Stale docs:** deck/assets/README.md:9 (base "only the legacy builder"), :85 ("49 assertions"; actual 66); render_probe.sh:175 (build_deck.py fit report); deck/SKILL.md:19 (icons from shared/data/icons — false for v2); pack-spec.md:693 (deny-scan list omits icp, kpis attribution).

## 6. Tests — structure (the run itself is at the top of this file)

run_tests.sh = 1,420 lines of bash: 4 helpers (run_case/expect/expect_absent/warn, :37-73), a PyYAML guard (:76-86), then 24 sections, **217 assertion call sites** (run_case/expect/expect_absent lines) producing **347 assertions** at run time (loops over specs/files), **43 inline Python heredocs / `-c` blocks** that generate broken variants through packspec and fake binaries (a stand-in `soffice`, :149-179).

| Section (log header) | ok | lines (approx) |
|---|---|---|
| interpreter resolver (`py`) | 19 | 92-125 |
| API keys from the environment | 2 | 127-143 |
| feature list page count | 5 | 144-199 |
| generated fixture variants + artifacts | (setup) | 200-333 |
| lint_spec.py | 34 | 334-371 |
| packspec.py (round-trip every spec, template-vs-writer, 4 broken specs, CLI incl. YAML, unknown keys) | 8+15+33+12 = 68 | 372-574 |
| apply_choice.py | 8 | 575-593 |
| lint_artifact.py (+ one-pager.pdf generation) | 32+16 | 594-700 |
| check_consistency.py (+ engagement-weeks variant) | 10+8 | 701-767 |
| build_diagram / diagram_to_site / check_diagram | 17 | 768-893 |
| figure-less caveat (greps builder SOURCE for a duplicated string) | 5 | 894-910 |
| insert-product.mjs (links, backups, contactPerson) | 13+5+7 | 911-1004, 1145-1182 |
| refresh-exemplar.mjs | 22 | 1005-1144 |
| the repo keeps only the spec / pack_paths.py | 12+31 | 1183-1266 |
| spec_stamp.py, CON006/007 | 21 | 1267-1362 |
| context_budget.py | 11 | 1363-1394 |
| deck sub-suite (test_lint_deck.sh, 324 lines, 33 checks incl. 8 legacy) | 1 (33) | 1395-1410 |

Fixtures: shared/tools/tests/fixtures/ (pack-spec.valid.md 234 lines, 3 artifact .md, catalog.yaml, roadmap.csv); deck/tests fixture-pack-spec.md (381) + _v2-variability (278); one-pager/tests/fixture-pack-spec.md (412, shares ~219 lines with the deck fixture); examples/workforce-optimization/pack-spec.md (674) — three hand-maintained WFO variants. Broken variants are generated, not committed (good).
Gaps: no `tools/sync-shared.sh --check` (context_budget measures the mirror copy); no deckkit-copies cmp; test_build_deck_v2.py not wired in; the suite writes `deck/tests/architecture.json` + __pycache__ into the repo (masked by .gitignore:4,22).

## 7. Size table and verdicts

Tool code ≈ 21,260 LOC (shared/tools 8,734 incl. `py`; plugin tools 12,525) + tests 2,014 (run_tests.sh 1,420 + deck tests 594).

| Tool | LOC | Verdict | Reason |
|---|---|---|---|
| shared/tools/packspec.py | 3,600 | **shrink** | drop YAML-spec path (~85); one form per record list instead of the 100-site Misfit cascade (inferred −1,000..1,200); declare enums in SCHEMA |
| shared/tools/lint_spec.py | 924 | **merge** → packcheck | shares packlint; enums should come from SCHEMA |
| shared/tools/packlint.py | 707 | **merge** → packcheck core | drop load_yaml (catalog needs no lines) |
| shared/tools/lint_artifact.py | 643 | **merge** → packcheck | ART402 = CON002; `_prices` dup; infer channel from file name |
| shared/tools/check_consistency.py | 498 | **merge** → packcheck | same spec/price/tier plumbing |
| shared/tools/regen_roadmap.py | 651 | shrink | 3 of 4 outputs have no reader; untested; owner-drive only |
| shared/tools/build_diagram.py | 499 | keep (fix) | load_or_build ignores slug/sha of an existing model |
| shared/tools/pack_paths.py | 254 | keep | drop YAML fallback later; add artifact_name() |
| shared/tools/check_diagram.py | 248 | keep | distinct check; could adopt Report format |
| shared/tools/context_budget.py | 218 | keep | distinct |
| shared/tools/spec_stamp.py | 185 | keep (grow) | add write(); builders stop writing stamps themselves |
| shared/tools/py | 172 | keep | resolver |
| shared/tools/install_fonts.py | 135 | keep | manual, untested |
| deck/build_deck_v2.py | 1,567 | keep (fix) | icon map path dead, `verticals[].icon` ignored |
| feature-list/build_feature_list.py | 1,454 | shrink | own dig/need, font measurer, soffice/pypdf page count -> shared |
| deck/build_deck.py | 1,376 | **delete** | legacy; no SKILL step runs it; 2nd architecture model; own icon lookup |
| one-pager/build_one_pager.py | 993 | shrink | dig/need, money/duration, kpi routing, retired header, stamp write -> shared |
| deck/deckkit.py | 862 | **move** → shared/tools | single copy; drop 5 dead + 4 legacy-only names |
| exec-summary/deckkit.py | 862 | **delete** | byte-identical copy; "standalone" reason already false |
| deck/lint_deck.py | 674 | keep | drop `--legacy-cover-ok` (~25) |
| deck/exemplar.py | 655 | keep | drop 6 dead functions (~52) |
| exec-summary/build_exec_summary.py | 603 | keep | import shared constants |
| visuals/apply_choice.py | 426 | keep | drop YAML refusal later |
| visuals/visuals_common.py | 381 | keep | packspec import dup |
| visuals/search_photos.py | 281 | keep | untested |
| visuals/fetch_icon.py | 247 | keep | untested |
| visuals/contact_sheet.py | 223 | keep | untested |
| visuals/suggest_icons.py | 143 | keep | untested |
| deck/render_probe.sh | 176 | keep | fix stale :175 |
| deck/pair_sheet.py | 71 | keep | small |
| listing/insert-product.mjs | 349 | keep | tested |
| listing/refresh-exemplar.mjs | 333 | keep | tested |
| listing/derive-stage-view.py | 291 | keep | packspec import dup; untested |
| listing/diagram_to_site.py | 216 | keep | tested |
| listing/denylist-to-json.py | 125 | shrink | reuse packlint.load_denylist |
| demo/capture-demo-frames.mjs | 217 | keep | untested |
| tools/sync-shared.sh | 29 | keep | add `--check` to the suite |
| tests/run_tests.sh | 1,420 | shrink | −YAML cases, −grep-the-source caveat test; + test_build_deck_v2, + sync check |
| deck/tests/test_build_deck_v2.py | 270 | keep (fix+wire) | 4/66 failing from shared-folder model reuse |
| deck/tests/test_lint_deck.sh | 324 | shrink | −legacy section |

### Addendum to §1
13. **lint_deck check 9 vs check_diagram on the same slide 8:** lint_deck.expectations (233-273) derives names/outputs/engine products from the spec (architecture.outputs, stack catalog ids) while check_diagram (158-172, 204-212) derives them from architecture.json. The build gate runs both (build/cards/consistency-gate.md:9-10). When the model is stale (see §6) the two disagree by construction.
14. **The gate is 4 commands with 4 output formats**, and lint_artifact runs once per artifact with a hand-picked channel; card rule "never lint a whole output directory on one channel" (consistency-gate.md:14) exists only because the channel is not inferred from the file name the builders already encode (`-feature-list.docx`, `-sales-deck.pptx`, `-one-pager-<channel>.html`, `-exec-summary.pptx`).

### Housekeeping note
After my runs I removed only files created inside my own run windows (mtime-checked). One `shared/tools/__pycache__/packspec.cpython-311.pyc` (mtime 1790254988) that I removed may have come from a concurrent process (my runs used PYTHONDONTWRITEBYTECODE=1) — a git-ignored, regenerable cache, no effect. A `shared/tools/__pycache__/` now present (packspec/packlint .pyc, mtimes 1790255339/1790255422) is not mine and was left in place.

---

# FINAL REPORT — code audit, oracle-packaging-skills (read-only)

The codebase has about 21,300 lines of tool code (8,734 in shared/tools, 12,525 in plugin tools) and 2,014 lines of tests. The checkers carry 62 rule ids (32 SPEC, 22 ART, 8 CON), plus 11 deck checks and 9 diagram checks. Certain removals come to about 2,400 lines. Adding the inferred merges brings the total to about 4,000–4,500 lines, roughly 20%.

## (a) Top 8 findings, ranked by simplification value

1. **Delete the legacy deck builder (−1,376 lines, certain).**
   - No SKILL.md step runs `deck/tools/build_deck.py`. Only test_lint_deck.sh:95-108 (8 assertions) and 9 doc or card mentions refer to it.
   - It carries a second architecture model (build_deck.py:719-860) that bypasses build_diagram, plus its own icon lookup (156-196).
   - Removing it also removes `--legacy-cover-ok` from lint_deck.py (about 25 lines). It makes four deckkit names dead: CONTENT_W, DECK_TITLE_BOX, MARGIN_L, FONT_TITLE.
   - **Keep `softserve-deck-base.pptx`.** build_exec_summary.py:45 uses it whenever `--host-deck` is absent. deck/assets/README.md:9 wrongly says only the legacy builder uses it.

2. **Keep one deckkit, in shared/tools (−862 lines, certain).**
   - The deck and exec-summary copies are byte-identical, and each skill imports its own (build_exec_summary.py:25-28).
   - The stated reason is "so this skill stands alone" (exec-summary/assets/README.md:9). That is already false: exec-summary needs the deck skill's base .pptx and render_probe.sh, and deckkit already imports packspec from shared/tools (deckkit.py:639-651).
   - No test checks that the two copies match.
   - Dead today: HEADER_BOX, FONT_MONO, line_h(), wrap_to(), sibling_kit_path().

3. **packspec.py (3,600 lines): move enum values into SCHEMA, drop the YAML path, and consider one form per list.**
   - Size by section: writer 1,004, reader 1,009, scalar codec 477, layout/SCHEMA 357, CLI 295, loader 131.
   - Key names and labels are stated twice, in SCHEMA and in pack-spec.md. run_tests.sh:397-433 keeps them in step.
   - Allowed values, required-ness and thresholds are stated 2–5 times, and no test ties them together:
     - `status`: pack-spec.md:481, lint_spec.py:117
     - `figure_status`: pack-spec.md:613, lint_spec.py:119
     - `kind`: pack-spec.md:610, lint_spec.py:124, deckkit.py:767, build_one_pager.py:568
     - tier ids: packlint.py:50, packspec.py:824, pack-spec.md:624
     - channels: 6 files; the empty-marker set: 4 files
   - The `.yaml` spec path (about 85 lines, plus pack_paths.py:60/176-182, apply_choice and about 40 test lines) serves no pack in the repo. Only tests exercise it.
   - The writer's 100 `Misfit` fallbacks exist so any data round-trips, with two forms per record list (a table or one heading per record). (inferred) Writing one form per list, and refusing anything else, would cut about 1,000 lines.

4. **Merge packlint, lint_spec, lint_artifact and check_consistency (2,772 lines) into one `packcheck`.** (inferred −400 to 500 lines.) It would have subcommands, plus a `gate` that infers each file's channel from its name.
   - ART402 (lint_artifact.py:130-139) and CON002 (check_consistency.py:78-80) are the same tier regexes. The build gate runs both on the same files, so one slip is reported twice.
   - Both read the spec's price set with the same loop (lint_artifact.py:251-271, check_consistency.py:182-203).
   - The retired family-name regex has 5 copies that behave 2 ways. Only ART105 spares the real product "OCI AI Accelerator Packs".
   - lint_deck check 9 and check_diagram both judge slide 8, from different sources: the spec and architecture.json.
   - The gate card's rule "never lint a directory on one channel" exists only because the channel is passed by hand.
   - packlint.load_yaml (95-135) is a second line-preserving YAML loader. Its only caller ignores the line numbers.

5. **Give the four builders one shared `Spec` (inferred −300 to 450 lines; also fixes a verified bug).**
   - dig/need exists 5 times: deckkit.py:670-687, build_one_pager.py:205-218, build_feature_list.py:517-530 (identical text), build_diagram.py:81, packlint.py:246.
   - SpecError is defined 4 times. Metric-kind routing is written twice (deckkit.py:745-788, build_one_pager.py:546-590).
   - The clearance lookup is written 5 times, with different default descriptors: "an enterprise customer" versus "the delivery customer".
   - The wording "to be measured in the proof of value; results to follow" appears 3 times. A 5-assertion test keeps the copies in step by grepping builder source (run_tests.sh:894-910).
   - **Price formatting diverges.** I verified this by running both functions:
     - €2,000,000 prints "€2000K" on the deck and exec summary but "~€2M" on the one-pager.
     - A 300K–1.5M range prints "€300K–1500K" versus "€300K–€1.5M".
     - Cause: deckkit._money tests `% 1000` before `>= 1M` (deckkit.py:819-825).
   - Two Pillow font measurers (deckkit.py:85-233 and build_feature_list.py:231-391) use different line factors, 1.22 and 1.20.

6. **Some outputs are written but never read.**
   - **`verticals[].icon`:** visuals/apply_choice.py writes it, and no builder or listing tool reads it.
     - build_deck_v2.py:54 defaults to `deck/assets/icons/map.yaml`, which does not exist. Every industry card keeps the exemplar's icon (the note at :483).
     - This contradicts deck/SKILL.md:19 and slides-1-5.md:16. lint_deck and the v2 test only count pictures, so neither catches it.
     - Fix: fill the cards from `verticals[i].icon.file`, or drop the icon step.
   - **regen_roadmap.py (651 lines, untested):** it writes 4 CSVs, but only roadmap-items.csv has a reader (SPEC005). pack-tracker.csv, pack-crosswalk.csv and roadmap-l2-patterns.csv have none.

7. **Use one bootstrap and one stamp module.**
   - The `for _up in range(2, 6)` search for shared/tools appears 14 times, in 3 import styles. The packspec import appears 6 times.
   - There are 5 PyYAML guards. All exit 2 except derive-stage-view, which exits 3.
   - spec_stamp.py reads the stamp, but 5 builders write it. The one-pager keeps its own copy of the HTML meta pattern (build_one_pager.py:65, 829-867).
   - Artifact file names are 4 separate inline f-strings.
   - Proposal: have `py` export PYTHONPATH, and add `spec_stamp.write()` and `pack_paths.artifact_name()`.
   - Also removable:
     - 6 dead exemplar.py functions (about 52 lines): slide_count, fill_lead, fill_points, copy_cell_runs, table_frame, shape_text.
     - 12 unreferenced flags, for example lint_deck `--geometry/--header` and apply_choice `--depicts/--library/--provenance`.
     - denylist-to-json.py's own deny-list parser.

8. **Test gaps.**
   - `deck/tests/test_build_deck_v2.py` is not wired into any runner and fails 4 of 66 checks (its README claims 49 assertions).
     - Verified cause: build_diagram.load_or_build (381-407) reuses any existing `architecture.json` beside the spec, whatever its slug or sha. The two fixtures share one folder.
     - Run on its own, `run_variability` passes 14 of 14.
     - The main suite writes that file into the repo, and `.gitignore:22` hides it.
   - The suite never runs `tools/sync-shared.sh --check`, although context_budget measures the plugin's mirrored copy of shared/.
   - 2,560 lines of tools are untested: regen_roadmap, the visuals search/fetch/contact/suggest tools, render_probe, pair_sheet, install_fonts, denylist-to-json, derive-stage-view, capture-demo-frames.
   - The three Workforce optimization spec variants (examples, the deck fixture, the one-pager fixture) are maintained by hand.

## (b) Per-tool verdicts

| Tool (LOC) | Verdict |
|---|---|
| deck/tools/build_deck.py (1,376) | **delete** |
| exec-summary/tools/deckkit.py (862) | **delete** (copy) |
| deck/tools/deckkit.py (862) | **move** to shared/tools; drop 9 dead or legacy-only names |
| shared/tools/packspec.py (3,600) | **shrink**: enums in SCHEMA; YAML path out; (inferred) one form per list |
| packlint (707), lint_spec (924), lint_artifact (643), check_consistency (498) | **merge** into packcheck |
| build_one_pager (993), build_feature_list (1,454), build_exec_summary (603) | **shrink** through a shared Spec, formatting, font-fit and render helpers |
| build_deck_v2 (1,567) | keep; fix icons |
| build_diagram (499) | keep; fix stale-model reuse |
| spec_stamp (185), pack_paths (254) | keep; add write() and artifact_name(); drop the YAML fallback |
| lint_deck (674) | keep; drop `--legacy-cover-ok` |
| exemplar (655) | keep; drop 6 dead functions |
| regen_roadmap (651) | shrink: stop writing 3 unread CSVs |
| denylist-to-json (125) | shrink: reuse packlint.load_denylist |
| run_tests.sh (1,420) | shrink YAML, legacy and grep-source cases; add the sync check and the v2 test |
| test_build_deck_v2.py (270) | keep; give each fixture its own folder; wire it into the suite |
| test_lint_deck.sh (324) | shrink: drop the legacy section |
| Keep as is | check_diagram 248, context_budget 218, py 172, install_fonts 135, the 6 visuals tools (1,701), insert-product/refresh-exemplar/diagram_to_site/derive-stage-view (1,189), capture-demo-frames 217, render_probe 176 (fix stale :175), pair_sheet 71, sync-shared 29 |

## (c) Test-suite status

- **Result:** 347 passed, 0 failed, exit 0, about 80 s. The 33 checks inside test_lint_deck.sh count as one of those 347.
- **Setup:** a venv in the scratch dir, `ORACLE_PACKS_PY` pointing at it, `CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, and `TMPDIR` in scratch.
- **Structure:** 24 sections, 217 assertion call sites and 43 inline Python blocks. Broken spec variants are generated by the suite, not committed.
- **Skipped here, and the suite asserts both skips:**
  - the live-site exemplar check, because ORACLE_SITE_ROOT is a macOS path
  - the .pdf lint, because pdftotext is not installed
- **Files written into the repo:** 13 .pyc files and deck/tests/architecture.json, all git-ignored. I removed only those, with `git clean -fdX` limited to their paths. The repo was clean afterwards.
- **Cleanup caveat:** one packspec.pyc I removed after my own manual deck-test runs may have come from a concurrent process. It is a regenerable cache, so there is no effect. A `shared/tools/__pycache__/` present now is not mine, and I left it in place.
- **test_build_deck_v2.py, run by hand:** 62 of 66 pass (see finding 8).
