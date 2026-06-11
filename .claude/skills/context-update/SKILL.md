---
name: context-update
description: Fold new artifacts into the context wiki (context/index.md + context/areas/<area>/) and route drop-zone captures to their Second-Brain homes (area pages, context/knowledge/notes/, book-shortlist.md, explore-queue.md). Three modes — sweep (no args: process everything new under context/areas/*/calls/, context/areas/*/docs/, context/_inbox/ and inbox/ via the ledger), single artifact (a path; also used headlessly by the call-pipeline after each note), pasted content. Detects new subprojects and areas and creates their pages, refreshes the Now snapshot, keeps provenance links, skips junk (mic tests, empty recordings). Use on /context-update, "update my context", "fold this in / into context", "sync the wiki", after Alex shares a meeting outcome, document, or draft notes worth remembering, or when context/index.md looks stale. Also the engine behind the daily drop-zone fold cloud routine.
disable-model-invocation: false
user-invocable: true
---

# context-update — fold new artifacts into the context wiki

## The model

- **One tree per area** under `context/areas/<area>/`:
  - `README.md` — the area's live-state page (distilled current truth, rewritten in place).
  - `<subproject>.md` — subproject pages, one per thread Alex truly engages in (auto-created — see 3a); slug matches the calls sub-context when one exists.
  - `calls/[<sub-context>/]` — call notes, written by the call-pipeline (taxonomy owned by Axis 2 of `.claude/skills/classify/SKILL.md`).
  - `docs/` — manually added source materials (transcripts, documents Alex chose to commit).
- **Cross-area**: `context/index.md` (map + "Now" snapshot), `context/people/<slug>.md` (recurring people), `context/_meta/processed.txt` (ledger).
- **Drop zones (inputs)**: `context/_inbox/` — cloud captures from the Telegram Drop Zone (committed; one `.md` card per drop, media alongside); `inbox/` at repo root — local/manual drops (git-ignored, for anything that must not reach GitHub). Drops route by TYPE (step 3b), not only by area.
- **Drop destinations (outputs, owned by this skill)**: area pages, `context/knowledge/notes/` (external insights, themed), `context/book-shortlist.md`, `context/knowledge/explore-queue.md`, `context/people/`.
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
comm -23 <(find context/areas context/_inbox inbox -type f \( -name '*.md' -o -name '*.txt' -o -name '*.pdf' -o -name '*.docx' \) \( -path '*/calls/*' -o -path '*/docs/*' -o -path 'inbox/*' -o -path 'context/_inbox/*' \) ! -name 'README.md' ! -path '*/processed/*' 2>/dev/null | sort) <(sort context/_meta/processed.txt 2>/dev/null)
```
If more than ~15 are new, process newest-first and report what was left for the next run — no silent truncation.

**2. Gate each artifact (cheap checks before folding):**
- **Junk gate**: mic/test recordings (counting, "приём, раз-два-три", explicit "don't transcribe"), empty or near-empty notes, purely personal calls with no project relevance → add to ledger, do not fold, count as "junk" in the summary.
- **Duplicate gate**: call-note filenames end in `_<src_id>` derived from the source recording; its leading `YYYYMMDDHHMMSS` digits are the recording-start timestamp. If the ledger already holds a note whose src_id starts with the same timestamp, this is a re-processing of the same call (suffixes may differ) → fold only genuinely new information (usually none) → ledger it. A path already present in the ledger verbatim = already folded → no-op beyond the summary line.

**3. Route.** The area is the path segment after `context/areas/` — its page is that area's `README.md`. Then route within the area:
- **Slug mapping**: a subproject page shares its slug with its calls sub-context — `calls/vacancy-interviews/zipify/` ↔ `zipify.md`, `calls/iris-bootcamp/` ↔ `iris-bootcamp.md`. A note matching an existing subproject page folds there FIRST; touch the area README only when area-level state shifts (status line, Subprojects one-liner, anything Now-worthy).
- `job-search` specifics: `calls/intro-chats/` and recruiter-pipeline/campaign artifacts → `outreach.md`; vacancy calls → that vacancy's page.
- `inbox/` and `context/_inbox/` files route by TYPE first — see step 3b. Notes in `areas/other/calls/` → judge by content (repo/tooling topics → `personal-os`).

**3a. Auto-create subproject pages — detect projects Alex truly engages in. Don't wait for the README to bloat:**
- **Vacancy rule (deterministic):** a substantive note lands in `calls/vacancy-interviews/<slug>/` (a real interview / case / recruiter touchpoint, not a passing mention) and `<slug>.md` doesn't exist → CREATE it from the template and list it under `## Subprojects` in the area README. Every vacancy Alex actually interviews for gets a page from its first call.
- **Engagement rule (general):** create `<sub-slug>.md` when the content shows TRUE engagement — Alex carries his own commitments/deliverables in the thread, AND it has its own counterpart(s) + expected continuation (a recurring program, an offering he's building, a named mandate). A topic merely discussed, a one-off call, or someone else's project does NOT qualify. When in doubt after a single artifact, fold into the README and add an open loop "possible subproject: <x>?" — promote on the second artifact at the latest.
- On creation: add the README pointer + an index-table entry, and if its calls will recur outside an existing sub-context, SUGGEST a matching Axis-2 entry for classify in the run summary — don't edit classify yourself.
- **Closing:** when a thread ends (vacancy rejected/withdrawn, program delivered), set `_status: closed — <outcome>` on its page, mark it `(closed)` in the README Subprojects list and the index, and prune its open loops. Closed pages stay — they hold the record and lessons.
- **New AREA** (`context/areas/<slug>/README.md`): create only when content shows a distinct ongoing initiative that fits no existing area — its own goal, counterparts, expected continuation. A one-off call or topic is NOT an area. Create the README from the template, add an index row flagged `(new)`, suggest a top-level Axis-2 addition for classify, and announce it in the run summary.

**3b. Drop taxonomy — Second-Brain routing (artifacts from `context/_inbox/` or `inbox/` only; call notes and `docs/` skip this).** Classify each drop by TYPE first; a mixed drop is split — each part goes to its home, one ledger entry for the file.

*Reading the drop:* a bare URL → fetch it (WebFetch) and distill what's actually at the link, don't file naked URLs; an image attachment → Read the image (screenshots usually carry the whole payload); an `attachment:` voice file with no transcript → cannot fold: report as `pending-voice` in the summary and do NOT ledger it (stays in the backlog until transcribed).

| Type | Signal | Destination |
|---|---|---|
| Area/project material | relates to an active area / subproject / vacancy / engagement | `context/areas/…` per steps 3–5 |
| External insight | a claim, idea, article, screenshot worth keeping — not tied to an area | `context/knowledge/notes/themes/<slug>.md` (rules below) |
| Book | a title to read, a rec, a cover screenshot | `context/book-shortlist.md` — resolve real Title + Author, categorize, dedup (the `book-shortlist` skill's format); never auto-run book-finder |
| Explore topic | a question or topic to dig into ("look into X") | `context/knowledge/explore-queue.md` — `- [ ] YYYY-MM-DD — topic — why (provenance)` |
| People fact | durable fact about a person | step 5 (people pages) |
| Junk | accidental forward, empty, test message | ledger + count as junk |

*Provenance for drops:* `context/_inbox/` files are linked at their FINAL home — `context/_inbox/processed/<file>` (they move there in step 8). Local `inbox/` files are NOT in git on other machines — cite `(local drop: <filename>, YYYY-MM-DD)` without a link.

**knowledge/notes rules (bounded by design — built to survive years of drops):**
- `notes/index.md` is the map: theme table (theme · one-liner · count · last added), header `_updated:` + totals. Fully rewritten when touched; ≤60 lines.
- `themes/<slug>.md` — one page per theme, created on demand, rewritten in place. Insight block: `### <claim-shaped headline>` + ≤3 distilled lines + `— YYYY-MM-DD · source: <link and/or provenance>`. Headlines are claims, not topics ("Agents fail on long-horizon memory", not "On agents").
- **Bias to an existing theme** (claim-similarity to its one-liner + headlines); create a new theme only for a clearly distinct domain — never a near-synonym of an existing one. Slugs are immutable.
- **Dedup inside the chosen theme**: same claim, new source → add a corroboration line under the existing insight, not a new block; a sharper version → replace the block, keeping both sources.
- **Page budget ~25 insights**: when exceeded, flag `⚠ split candidate` in the index row + the run summary — never auto-split.
- A run opens only the theme pages it touches — never the whole tree. Cost scales with new insights, not base size.

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

**8. Finish (sweep / interactive modes only).** Move folded `inbox/` files to `inbox/processed/` (plain `mv` — local-only dir) and folded `context/_inbox/` files — card AND any attachments — to `context/_inbox/processed/` (`git mv` — committed; provenance links point there). Then commit deliberately — git-autosync would otherwise scoop the changes into a generic commit:
```bash
git add context/ && git commit -m "context: <one line on what changed>"
```
When running as the daily cloud routine, also `git push` (no autosync in the cloud).

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
- `context/knowledge/podcasts/` — a separate engine (`/podcast-insights`) with its own ledger owns that subtree; never touch it. This skill owns `context/knowledge/notes/` and `explore-queue.md` as OUTPUTS only — the sweep `find` scans `context/areas`, `context/_inbox`, `inbox` and must never scan any part of `context/knowledge/` as input, or the engines will fight over files.
- Never edit raw artifacts (`calls/`, `docs/`, `inbox/` contents) — read-only inputs.
- Sensitivity: never copy the "Backend context" items of `context/areas/job-search/positioning.md` onto other pages — link to the doc instead; facts that must never leak externally live in exactly one place.

## Run summary (always output)

One short block: `processed N (folded F · junk J · dup D · pending-voice V) — pages touched: … — drops routed: areas A · notes K · books B · explore E — new areas/subprojects/themes: … — backlog: …`. In interactive mode add one line per substantive change so Alex can correct the folding.

## Self-check before finishing

- No invented facts; every new claim traceable to a source link that resolves.
- Superseded facts removed, not stacked; sections use "-" when empty; pages within budget.
- `index.md` "Now" is dated and consistent with the pages.
- Ledger updated for EVERY artifact handled, including junk and duplicates (but NOT pending-voice — those stay in the backlog).
- Drops routed by TYPE (step 3b), not dumped into an area page by default; bare URLs were fetched, images were read.
- Folded `context/_inbox/` files moved to `processed/` so the staging dir holds only the backlog.
- Sweep/interactive: changes committed as `context: …`; headless: no git attempted.
