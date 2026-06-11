---
name: context-update
description: Fold new artifacts into the context wiki (context/index.md + context/projects/*) so it always reflects the live state of Alex's projects. Three modes — sweep (no args: process everything new in outputs/call-notes/ and inbox/ via the ledger), single artifact (a path; also used headlessly by the call-pipeline after each note), pasted content. Detects new projects and creates pages, refreshes the Now snapshot, keeps provenance links, skips junk (mic tests, empty recordings). Use on /context-update, "update my context", "fold this in / into context", "sync the wiki", after Alex shares a meeting outcome, document, or draft notes worth remembering, or when context/index.md looks stale.
disable-model-invocation: false
user-invocable: true
---

# context-update — fold new artifacts into the context wiki

## The model

- **Wiki = distilled current truth**: `context/index.md` (map + "Now" snapshot) and `context/projects/<slug>.md` (one live-state page per project), plus `context/people/<slug>.md` for recurring people. Curated and rewritten in place — never an append-only log.
- **Raw stream = `outputs/` and `inbox/`**: never edited, only read. Wiki claims link back into it (provenance).
- **Ledger = `context/_meta/processed.txt`**: one repo-root-relative path per line = "already folded". Idempotency across runs and devices.
- Invariant to protect: an agent that reads `index.md` plus one project page has working context for that project without opening any raw note.

## Modes

1. **Sweep** (default, no input): discover unprocessed artifacts, fold them all.
2. **Single artifact** (a path was given): fold just that file. The call-pipeline invokes this headlessly after each new call note — in that mode there is **no Bash tool: never attempt git; update the ledger by Read + Write of `processed.txt`**; the pipeline commits for you.
3. **Pasted content** (text in chat, no file): distill and fold; cite source as `(chat, YYYY-MM-DD)`; no ledger entry.

## Procedure

**0. Orient.** Read `context/index.md`. Read the target project page(s) once routing is known.

**1. Discover (sweep mode only):**
```bash
comm -23 <(find outputs/call-notes inbox -type f \( -name '*.md' -o -name '*.txt' -o -name '*.pdf' -o -name '*.docx' \) ! -name 'README.md' ! -path '*/processed/*' | sort) <(sort context/_meta/processed.txt 2>/dev/null)
```
If more than ~15 are new, process newest-first and report what was left for the next run — no silent truncation.

**2. Gate each artifact (cheap checks before folding):**
- **Junk gate**: mic/test recordings (counting, "приём, раз-два-три", explicit "don't transcribe"), empty or near-empty notes, purely personal calls with no project relevance → add to ledger, do not fold, count as "junk" in the summary.
- **Duplicate gate**: call-note filenames end in `_<src_id>` derived from the source recording. If the ledger already holds a note with the same src_id, this is a re-processing of the same call → fold only genuinely new information (usually none) → ledger it.

**3. Route to a project page.** Folder hints: `softserve` → `projects/softserve.md` · `gigacloud/*` → `gigacloud.md` · `job-search/*` → `job-search.md` · `laba` → `laba.md` · `other` and `inbox/` files → judge by content (repo/tooling topics → `personal-os.md`).
- **New-project rule**: create a new page only when the content shows a distinct ongoing initiative — its own goal, its own counterpart(s), expected continuation — that fits no existing page. A single call or one-off topic is NOT a project. Create from the template below, add an Active-projects row in `index.md` flagged `(new)`, and announce it in the run summary. Unsure → fold into the closest page and add an open loop: "possible new project: <x>?".
- A genuinely new recurring **meeting context** (not just project) may also warrant a new Axis-2 folder in `.claude/skills/classify/SKILL.md` — suggest it in the summary, don't edit classify yourself.

**4. Merge into the page — curation rules (the heart):**
- **Rewrite in place.** `_status:`, Snapshot, and Active threads always describe current truth. Never stack "UPDATE:" lines; a newer fact replaces the older one. If the change itself matters (a decision, a closure, a pivot), record it as one line under Decisions or Activity.
- **Provenance**: every non-obvious claim links to its source, relative to the page (from `projects/`: `../../outputs/...`). Filenames with spaces use the `[text](<path with spaces.md>)` form.
- Repo conventions apply: evidence-bound, specific, no filler; mark inferences "(inferred)"; "-" for empty sections; dates as YYYY-MM-DD.
- **Open loops**: add new commitments/waiting-ons with owner (Mine/Theirs) and date when known; DELETE completed or expired ones — move to Activity only if noteworthy.
- **Activity**: prepend `- YYYY-MM-DD — [short label](path) — one line on what changed`; keep ≤10 lines, drop the oldest (the artifact stream is the archive).
- **Budget**: page ≤120 lines. Trim Activity and pruned loops first; if Snapshot/Threads genuinely outgrow it, split a sub-page `projects/<slug>-<topic>.md` and link it.
- Don't copy transcript quotes longer than one line — distill.
- Update the page's `_updated:` date.

**5. People pages.** Create `context/people/<first-last>.md` only when a person recurs across ≥2 artifacts or carries durable standing facts (role, relationship to Alex, preferences, history); otherwise a one-liner in the project's People section is enough. Same template spirit: who they are, relation, key facts with sources.

**6. Update the index.** Refresh the project's row (status one-liner + last-artifact date). Rewrite the "Now" section — re-dated to today — whenever the folded events change what Alex is up to; keep it ≤7 bullets. Index stays ≤80 lines.

**7. Ledger.** Append every handled path (folded, junk, and duplicate alike):
```bash
printf '%s\n' "outputs/call-notes/<...>.md" >> context/_meta/processed.txt && sort -o context/_meta/processed.txt context/_meta/processed.txt
```
(Headless single-artifact mode: Read the file, Write it back with the new line — no Bash.)

**8. Finish (sweep / interactive modes only).** Move folded `inbox/` files to `inbox/processed/`. Then commit deliberately — git-autosync would otherwise scoop the changes into a generic commit:
```bash
git add context/ && git commit -m "context: <one line on what changed>"
```

## Page template

```markdown
# <Project name>

_status: <one line — the live state>_
_updated: YYYY-MM-DD_

## Snapshot
(3–8 bullets: what this is, durable shape, why it matters)
## Active threads
(per workstream: state → next step → owner, with source links)
## People
(name — role/relation; link a people/ page if it exists)
## Decisions
(- YYYY-MM-DD — decision — source; newest first, keep ~8)
## Open loops
(Mine / Theirs: commitment or waiting-on, owner, due date if known)
## Activity
(- YYYY-MM-DD — [label](path) — one line; ≤10 entries)
```

## Out of scope

- `outputs/english-coaching/` (language stream, not project state), `outputs/inbox-sweep/` logs, book lists — never folded.
- Never edit anything under `outputs/` or raw files in `inbox/` — read-only inputs.
- Sensitivity: never copy the "Backend context" items of `context/job-search.md` onto other pages — link to the doc instead; facts that must never leak externally live in exactly one place.

## Run summary (always output)

One short block: `processed N (folded F · junk J · dup D) — pages touched: … — new projects: … — backlog: …`. In interactive mode add one line per substantive change so Alex can correct the folding.

## Self-check before finishing

- No invented facts; every new claim traceable to a source link that resolves.
- Superseded facts removed, not stacked; sections use "-" when empty; pages within budget.
- `index.md` "Now" is dated and consistent with the pages.
- Ledger updated for EVERY artifact handled, including junk and duplicates.
- Sweep/interactive: changes committed as `context: …`; headless: no git attempted.
