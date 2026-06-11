---
name: context-update
description: Fold new artifacts into the context wiki (context/index.md + context/areas/<area>/) so it always reflects the live state of Alex's areas and projects. Three modes — sweep (no args: process everything new under context/areas/*/calls/, context/areas/*/docs/ and inbox/ via the ledger), single artifact (a path; also used headlessly by the call-pipeline after each note), pasted content. Detects new subprojects and areas and creates their pages, refreshes the Now snapshot, keeps provenance links, skips junk (mic tests, empty recordings). Use on /context-update, "update my context", "fold this in / into context", "sync the wiki", after Alex shares a meeting outcome, document, or draft notes worth remembering, or when context/index.md looks stale.
disable-model-invocation: false
user-invocable: true
---

# context-update — fold new artifacts into the context wiki

## The model

- **One tree per area** under `context/areas/<area>/`:
  - `README.md` — the area's live-state page (distilled current truth, rewritten in place).
  - `<subproject>.md` — optional subproject pages as the area grows.
  - `calls/[<sub-context>/]` — call notes, written by the call-pipeline (taxonomy owned by Axis 2 of `.claude/skills/classify/SKILL.md`).
  - `docs/` — manually added source materials (transcripts, documents Alex chose to commit).
- **Cross-area**: `context/index.md` (map + "Now" snapshot), `context/people/<slug>.md` (recurring people), `context/_meta/processed.txt` (ledger), `inbox/` (drop zone at repo root).
- **Raw artifacts are read-only inputs**: never edit anything in `calls/`, `docs/`, or `inbox/` — wiki pages link INTO them (provenance).
- **Ledger** = one repo-root-relative path per line = "already folded". Idempotency across runs and devices.
- Invariant to protect: an agent that reads `index.md` plus one area README has working context for that area without opening any raw note.

## Modes

1. **Sweep** (default, no input): discover unprocessed artifacts, fold them all.
2. **Single artifact** (a path was given): fold just that file. The call-pipeline invokes this headlessly after each new call note — in that mode there is **no Bash tool: never attempt git; update the ledger by Read + Write of `processed.txt`**; the pipeline commits for you.
3. **Pasted content** (text in chat, no file): distill and fold; cite source as `(chat, YYYY-MM-DD)`; no ledger entry.

## Procedure

**0. Orient.** Read `context/index.md`. Read the target area README (and subproject page, if any) once routing is known.

**1. Discover (sweep mode only):**
```bash
comm -23 <(find context/areas inbox -type f \( -name '*.md' -o -name '*.txt' -o -name '*.pdf' -o -name '*.docx' \) \( -path '*/calls/*' -o -path '*/docs/*' -o -path 'inbox/*' \) ! -name 'README.md' ! -path '*/processed/*' | sort) <(sort context/_meta/processed.txt 2>/dev/null)
```
If more than ~15 are new, process newest-first and report what was left for the next run — no silent truncation.

**2. Gate each artifact (cheap checks before folding):**
- **Junk gate**: mic/test recordings (counting, "приём, раз-два-три", explicit "don't transcribe"), empty or near-empty notes, purely personal calls with no project relevance → add to ledger, do not fold, count as "junk" in the summary.
- **Duplicate gate**: call-note filenames end in `_<src_id>` derived from the source recording; its leading `YYYYMMDDHHMMSS` digits are the recording-start timestamp. If the ledger already holds a note whose src_id starts with the same timestamp, this is a re-processing of the same call (suffixes may differ) → fold only genuinely new information (usually none) → ledger it. A path already present in the ledger verbatim = already folded → no-op beyond the summary line.

**3. Route.** The area is the path segment after `context/areas/` — its page is that area's `README.md`. Files under `calls/<sub-context>/` that match an existing subproject page fold there first, with the area README updated only if the area-level state shifts. `inbox/` files and notes in `areas/other/calls/` → judge by content (repo/tooling topics → `personal-os`).
- **New SUBPROJECT page** (`context/areas/<area>/<sub-slug>.md`): create when a thread has its own goal, counterpart(s), and cadence AND would bloat the area README past budget (e.g. a client program, a long interview loop). Add a one-line pointer in the area README under `## Subprojects`; suggest a matching Axis-2 subfolder for classify if calls will recur — don't edit classify yourself.
- **New AREA** (`context/areas/<slug>/README.md`): create only when content shows a distinct ongoing initiative that fits no existing area — its own goal, counterparts, expected continuation. A one-off call or topic is NOT an area. Create the README from the template, add an index row flagged `(new)`, suggest a top-level Axis-2 addition for classify, and announce it in the run summary. Unsure → fold into the closest area and add an open loop: "possible new area/subproject: <x>?".

**4. Merge into the page — curation rules (the heart):**
- **Rewrite in place.** `_status:`, Snapshot, and Active threads always describe current truth. Never stack "UPDATE:" lines; a newer fact replaces the older one. If the change itself matters (a decision, a closure, a pivot), record it as one line under Decisions or Activity.
- **Provenance**: every non-obvious claim links to its source, relative to the page — from an area README that's `calls/<file>.md`, `docs/<file>.md`, or `calls/<sub>/<file>.md`. Filenames with spaces use the `[text](<path with spaces.md>)` form.
- Repo conventions apply: evidence-bound, specific, no filler; mark inferences "(inferred)"; "-" for empty sections; dates as YYYY-MM-DD.
- **Open loops**: add new commitments/waiting-ons with owner (Mine/Theirs) and date when known; DELETE completed or expired ones — move to Activity only if noteworthy.
- **Activity**: prepend `- YYYY-MM-DD — [short label](path) — one line on what changed`; keep ≤10 lines, drop the oldest (the artifact stream is the archive).
- **Budget**: page ≤120 lines. Trim Activity and pruned loops first; if Snapshot/Threads genuinely outgrow it, split a subproject page and link it.
- Don't copy transcript quotes longer than one line — distill.
- Update the page's `_updated:` date.

**5. People pages.** Create `context/people/<first-last>.md` only when a person recurs across ≥2 artifacts or carries durable standing facts (role, relationship to Alex, preferences, history); otherwise a one-liner in the area's People section is enough.

**6. Update the index.** Refresh the area's row (status one-liner + last-artifact date). Rewrite the "Now" section — re-dated to today — whenever the folded events change what Alex is up to; keep it ≤7 bullets. Index stays ≤80 lines.

**7. Ledger.** Append every handled path (folded, junk, and duplicate alike):
```bash
printf '%s\n' "context/areas/<area>/calls/<...>.md" >> context/_meta/processed.txt && sort -o context/_meta/processed.txt context/_meta/processed.txt
```
(Headless single-artifact mode: Read the file, Write it back with the new line — no Bash.)

**8. Finish (sweep / interactive modes only).** Move folded `inbox/` files to `inbox/processed/`. Then commit deliberately — git-autosync would otherwise scoop the changes into a generic commit:
```bash
git add context/ && git commit -m "context: <one line on what changed>"
```

## Page template (area README and subproject pages alike)

```markdown
# <Area / subproject name>

_status: <one line — the live state>_
_updated: YYYY-MM-DD_

## Snapshot
(3–8 bullets: what this is, durable shape, why it matters)
## Active threads
(per workstream: state → next step → owner, with source links)
## Subprojects        ← area READMEs only, when subproject pages exist
(- [name](<sub-slug>.md) — one-line state)
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

- Everything under `outputs/` (`english-coaching/` is the language stream, `inbox-sweep/` is a run log) and book lists — never folded.
- Everything under `context/knowledge/` — a separate engine (`/podcast-insights`) with its own ledger owns that tree. The sweep `find` deliberately scans only `context/areas inbox`; never widen it to `context/knowledge/`, or the two engines will fight over the same files.
- Never edit raw artifacts (`calls/`, `docs/`, `inbox/` contents) — read-only inputs.
- Sensitivity: never copy the "Backend context" items of `context/areas/job-search/positioning.md` onto other pages — link to the doc instead; facts that must never leak externally live in exactly one place.

## Run summary (always output)

One short block: `processed N (folded F · junk J · dup D) — pages touched: … — new areas/subprojects: … — backlog: …`. In interactive mode add one line per substantive change so Alex can correct the folding.

## Self-check before finishing

- No invented facts; every new claim traceable to a source link that resolves.
- Superseded facts removed, not stacked; sections use "-" when empty; pages within budget.
- `index.md` "Now" is dated and consistent with the pages.
- Ledger updated for EVERY artifact handled, including junk and duplicates.
- Sweep/interactive: changes committed as `context: …`; headless: no git attempted.
