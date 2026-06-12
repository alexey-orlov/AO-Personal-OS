---
name: context-update
description: Fold new artifacts into the context wiki (context/index.md + context/areas/<area>/) and route drop-zone captures by type — goals/tasks/insights become queue cards in context/_inbox/apple-notes/ (filed into Alex's pinned Apple Notes by the apple-notes-sync local leg), books go to context/knowledge/book-shortlist.md + book-finder, explore topics to context/knowledge/explore/ + explore-brief, plus area pages and people/. Three modes — sweep (no args: process everything new under context/areas/*/calls/, context/areas/*/docs/ and context/_inbox/ via the ledger), single artifact (a path; also used headlessly by the call-pipeline after each note), pasted content. Detects new subprojects and areas and creates their pages, refreshes the Now snapshot, keeps provenance links, skips junk (mic tests, empty recordings), and sends Telegram notifications for books (📚 via book-finder) and explore briefs (🔭 via explore-brief) — goal/task/insight drops are silent by design (they surface as 📥 items in Apple Notes). Use on /context-update, "update my context", "fold this in / into context", "sync the wiki", after Alex shares a meeting outcome, document, or draft notes worth remembering, or when context/index.md looks stale. Also the engine behind the daily drop-zone fold cloud routine.
disable-model-invocation: false
user-invocable: true
---

# context-update — fold new artifacts into the context wiki + second brain

## The model

- **One tree per area** under `context/areas/<area>/`:
  - `README.md` — the area's live-state page (distilled current truth, rewritten in place).
  - `<subproject>.md` — subproject pages, one per thread Alex truly engages in (auto-created — see 3a); slug matches the calls sub-context when one exists.
  - `calls/[<sub-context>/]` — call notes, written by the call-pipeline (taxonomy owned by Axis 2 of `.claude/skills/classify/SKILL.md`).
  - `docs/` — manually added source materials (transcripts, documents Alex chose to commit).
- **Cross-area**: `context/index.md` (map + "Now" snapshot), `context/people/<slug>.md` (recurring people), `context/_meta/processed.txt` (ledger).
- **Drop zone (input)**: `context/_inbox/` — cloud captures from the Telegram 📥 Drop Zone (committed; one `.md` card per drop, media alongside). There is no local drop zone (root `inbox/` retired 2026-06-12); sensitive material arrives as pasted content only.
- **Second-Brain destinations (outputs, owned by this skill)** — goal/task/insight drops become QUEUE CARDS in `context/_inbox/apple-notes/` (consumed by the `apple-notes-sync` skill's local leg, which files them into Alex's pinned Apple Notes — map: `context/knowledge/README.md`); books → `context/knowledge/book-shortlist.md`; explore topics → `context/knowledge/explore/queue.md` (+ `explore/briefs/` via the `explore-brief` skill) — plus area pages and `context/people/`.
- **Raw artifacts are read-only inputs**: never edit anything in `calls/`, `docs/`, or `_inbox/` cards — wiki pages link INTO them (provenance).
- **Ledger** = one repo-root-relative path per line = "already folded". Idempotency across runs and devices.
- Invariant to protect: an agent that reads `index.md` plus one area README has working context for that area without opening any raw note.

## Modes

1. **Sweep** (default, no input): discover unprocessed artifacts, fold them all, notify.
2. **Single artifact** (a path was given): fold just that file. The call-pipeline invokes this headlessly after each new call note — in that mode there is **no Bash tool: never attempt git or Telegram; update the ledger by Read + Write of `processed.txt`**; the pipeline commits for you.
3. **Pasted content** (text in chat, no file): distill and fold; cite source as `(chat, YYYY-MM-DD)`; no ledger entry. This is also the ONLY path for material that must never reach GitHub — distilled facts land on wiki pages, no raw file is created.

## Procedure

**0. Orient.** Read `context/index.md`. Read the target area README (and subproject page, if any) once routing is known.

**1. Discover (sweep mode only):**
```bash
comm -23 <(find context/areas context/_inbox -type f \( -name '*.md' -o -name '*.txt' -o -name '*.pdf' -o -name '*.docx' \) \( -path '*/calls/*' -o -path '*/docs/*' -o -path 'context/_inbox/*' \) ! -name 'README.md' ! -path '*/processed/*' ! -path '*/outbox/*' ! -path '*/apple-notes/*' 2>/dev/null | sort) <(sort context/_meta/processed.txt 2>/dev/null)
```
If more than ~15 are new, process newest-first and report what was left for the next run — no silent truncation.

**2. Gate each artifact (cheap checks before folding):**
- **Junk gate**: mic/test recordings (counting, "приём, раз-два-три", explicit "don't transcribe"), empty or near-empty notes, purely personal calls with no project relevance → add to ledger, do not fold, count as "junk" in the summary.
- **Duplicate gate (calls)**: call-note filenames end in `_<src_id>` derived from the source recording; its leading `YYYYMMDDHHMMSS` digits are the recording-start timestamp. If the ledger already holds a note whose src_id starts with the same timestamp, this is a re-processing of the same call (suffixes may differ) → fold only genuinely new information (usually none) → ledger it.
- **Duplicate gate (drops)**: Alex sometimes re-sends the same Drop Zone message (e.g. when the 👍 capture reaction didn't show). Identical or near-identical drop bodies in one batch, or matching an item already in its destination file → ONE routed item; ledger every duplicate card, count as "dup". Never create two goals/tasks/queue lines for the same text.
- A path already present in the ledger verbatim = already folded → no-op beyond the summary line.

**3. Route.** The area is the path segment after `context/areas/` — its page is that area's `README.md`. Then route within the area:
- **Slug mapping**: a subproject page shares its slug with its calls sub-context — `calls/vacancy-interviews/zipify/` ↔ `zipify.md`, `calls/iris-bootcamp/` ↔ `iris-bootcamp.md`. A note matching an existing subproject page folds there FIRST; touch the area README only when area-level state shifts (status line, Subprojects one-liner, anything Now-worthy).
- `job-search` specifics: `calls/intro-chats/` and recruiter-pipeline/campaign artifacts → `outreach.md`; vacancy calls → that vacancy's page.
- `context/_inbox/` files route by TYPE first — see step 3b. Notes in `areas/other/calls/` → judge by content (repo/tooling topics → `personal-os`).

**3a. Auto-create subproject pages — detect projects Alex truly engages in. Don't wait for the README to bloat:**
- **Vacancy rule (deterministic):** a substantive note lands in `calls/vacancy-interviews/<slug>/` (a real interview / case / recruiter touchpoint, not a passing mention) and `<slug>.md` doesn't exist → CREATE it from the template and list it under `## Subprojects` in the area README. Every vacancy Alex actually interviews for gets a page from its first call.
- **Engagement rule (general):** create `<sub-slug>.md` when the content shows TRUE engagement — Alex carries his own commitments/deliverables in the thread, AND it has its own counterpart(s) + expected continuation (a recurring program, an offering he's building, a named mandate). A topic merely discussed, a one-off call, or someone else's project does NOT qualify. When in doubt after a single artifact, fold into the README and add an open loop "possible subproject: <x>?" — promote on the second artifact at the latest.
- On creation: add the README pointer + an index-table entry, and if its calls will recur outside an existing sub-context, SUGGEST a matching Axis-2 entry for classify in the run summary — don't edit classify yourself.
- **Closing:** when a thread ends (vacancy rejected/withdrawn, program delivered), set `_status: closed — <outcome>` on its page, mark it `(closed)` in the README Subprojects list and the index, and prune its open loops. Closed pages stay — they hold the record and lessons.
- **New AREA** (`context/areas/<slug>/README.md`): create only when content shows a distinct ongoing initiative that fits no existing area — its own goal, counterparts, expected continuation. A one-off call or topic is NOT an area. Create the README from the template, add an index row flagged `(new)`, suggest a top-level Axis-2 addition for classify, and announce it in the run summary.

**3b. Drop taxonomy — Second-Brain routing (artifacts from `context/_inbox/` only; call notes and `docs/` skip this).** Classify each drop by TYPE first; a mixed drop is split — each part goes to its home, one ledger entry for the file. Prefix labels (`goal:`, `todo:`, `task:`, `book:`, `look into…`, `done…`) are HINTS, not law — content decides (e.g. "todo: explore X (Karpathy)" is an Explore item, not a Task).

| Type | Signal | Destination + follow-through |
|---|---|---|
| Goal | durable direction, multi-month ambition | queue card `kind: goal` in `context/_inbox/apple-notes/` (format below) — the local `apple-notes-sync` leg files it into the matching pinned Apple Note |
| Task | concretely doable item — automation idea, post/content idea, errand | queue card `kind: task` in `context/_inbox/apple-notes/` |
| Completion | "done X" / "сделал X" naming a finished item | no programmatic home (Alex ticks/edits his Apple Notes himself) — ledger the drop, mention in the run summary, route nothing |
| Insight | a claim, idea, article, screenshot worth keeping | queue card `kind: insight` in `context/_inbox/apple-notes/` — distill to ONE self-contained claim line first (fetch URLs, read screenshots; the card body is what will appear verbatim in the note) |
| Book | a title to read, a rec, a cover screenshot | `knowledge/book-shortlist.md` per the `book-shortlist` skill's rules (resolve Title + Author, categorize, dedup), then INVOKE the `book-finder` skill for the new title — its Telegram delivery lands in 📚 Books. Skip file downloads when running headless/cloud. |
| Explore topic | "look into X", a URL to digest, an open question | `knowledge/explore/queue.md` `## Open` line, then INVOKE the `explore-brief` skill for it — brief + 🔭 Telegram delivery |
| Area/project material | meeting outcome, document, fact about an active thread | `context/areas/…` per steps 3–5 |
| People fact | durable fact about a person | step 5 (people pages) |
| Junk | accidental forward, empty, test message | ledger + count as junk |

- **Knowledge categories beat area routing.** A goal/task/insight/book/explore item that clearly belongs to an area still lands in its `knowledge/` home, tagged ` · area: <slug>` — so every capture stays visible in one general place. The area page gets at most a one-line pointer (id or link), and only when area-level state actually changed. Never restate the item on the area page.
- *Reading the drop:* a bare URL → fetch it (WebFetch) and distill what's actually at the link, don't file naked URLs; an image attachment → Read the image (screenshots usually carry the whole payload); an `attachment:` voice file with no transcript → cannot fold: report as `pending-voice` in the summary and do NOT ledger it (stays in the backlog until transcribed).
- *Provenance for drops:* link cards at their FINAL home — `context/_inbox/processed/<file>` (they move there in step 8).

**Apple-notes queue card rules (goals / tasks / insights):**
- One card per item at `context/_inbox/apple-notes/an-<stamp>-<msgid>[-<k>].md` (`<stamp>-<msgid>` from the source drop's filename; `-<k>` counter when one drop splits into several items):

```markdown
---
kind: goal | task | insight
area: <area slug, or none>
source: context/_inbox/processed/tg-<stamp>-<msgid>.md
date: YYYY-MM-DD
---
<item text VERBATIM — exactly what should appear in the note, one line>
```

- The card body is what lands in Alex's pinned Apple Note byte-for-byte (plus a `📥` suffix added by the inserter) — no ids, no `· added` metadata, no commentary. Goals/tasks: keep Alex's own wording. Insights: distill to ONE self-contained claim line (fetch the URL / read the screenshot first); put provenance in the frontmatter, not the body.
- Goal vs task test: a goal survives months and has no "definition of done" yet; a task you could start this week and finish. When genuinely unclear, file as a task. `kind` only affects routing hints — both end up as bullets.
- The queue is consumed by the `apple-notes-sync` skill on Alex's Mac (launchd leg, ~30 min cadence while the Mac is awake; see `automations/apple-notes-sync/`). NEVER attempt Apple Notes access from this skill — cloud runs can't reach it; writing the card IS the job. Cards survive in the queue until inserted.

**4. Merge into the page — curation rules (the heart):**
- **Rewrite in place.** `_status:`, Snapshot, and Active threads always describe current truth. Never stack "UPDATE:" lines; a newer fact replaces the older one. If the change itself matters (a decision, a closure, a pivot), record it as one line under Decisions or Activity.
- **Provenance**: every non-obvious claim links to its source, relative to the page — from an area README that's `calls/<file>.md`, `docs/<file>.md`, or `calls/<sub>/<file>.md`. Filenames with spaces use the `[text](<path with spaces.md>)` form.
- Repo conventions apply: evidence-bound, specific, no filler; mark inferences "(inferred)"; "-" for empty sections; dates as YYYY-MM-DD.
- **Open loops**: add new commitments/waiting-ons with owner (Mine/Theirs) and date when known; DELETE completed or expired ones — move to Activity only if noteworthy. Captured goals/tasks do NOT live here (they live in goals-tasks.md) — open loops are for commitments arising from calls/threads.
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

**8. Archive + commit (sweep / interactive modes only).** Move folded `context/_inbox/` files — card AND any attachments — to `context/_inbox/processed/` (`git mv` — committed; provenance links point there). Then commit deliberately — git-autosync would otherwise scoop the changes into a generic commit:
```bash
git add context/ && git commit -m "context: <one line on what changed>"
```
When running as the daily cloud routine, also `git push` — the push lands on a `main-*` branch which `.github/workflows/auto-merge-routine.yml` auto-merges into `main`; that is expected, don't fight it.

**9. Notify (sweep / interactive modes only — never headless).** Every routed Second-Brain item produces a Telegram notification in its category topic, via `automations/telegram/` scripts. **Cloud/no-Keychain environments: `export TG_OUTBOX=1` first** — sends are then queued as JSON files in `context/_inbox/outbox/` (include them in the commit) and flushed by the n8n "Second-brain delivery" workflow; locally they send immediately.
- **Goals / tasks / completions** — do NOT send anything yourself. The n8n "Second-brain delivery" workflow posts each new item as its own 🎯/☑️ message (and syncs ✅ state for completions) from the file at ~08:50 Kyiv — your only job is writing the lines correctly. Count these as "queued (via file)" in the run summary.
- **Insights** — one message per insight: `TG_TOPIC=insights`, body `<theme emoji> <claim headline>` + the 2–3 distilled lines + `— theme: <slug>`.
- **Books** — handled by the invoked `book-finder` run (`TG_TOPIC=books`); don't double-send.
- **Explore** — handled by the invoked `explore-brief` run (`TG_TOPIC=explore`); don't double-send.
- Treat any send failure as non-fatal: report it in the run summary, never abort the fold.

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

- Everything under `outputs/` (`english-coaching/` is the language stream, `inbox-sweep/` is a run log) — never folded.
- `context/knowledge/podcasts/` — a separate engine (`/podcast-insights`) with its own ledger owns that subtree; never touch it. This skill owns the REST of `context/knowledge/` as OUTPUTS only — the sweep `find` scans `context/areas` and `context/_inbox` and must never scan any part of `context/knowledge/` as input, or the engines will fight over files.
- `context/_inbox/outbox/` is a delivery queue, not input — never fold it, never scan it.
- Never edit raw artifacts (`calls/`, `docs/`, `_inbox/` cards) — read-only inputs.
- Sensitivity: never copy the "Backend context" items of `context/areas/job-search/positioning.md` onto other pages — link to the doc instead; facts that must never leak externally live in exactly one place.

## Run summary (always output)

One short block: `processed N (folded F · junk J · dup D · pending-voice V) — pages touched: … — drops routed: goals G · tasks T · done C · insights K · books B · explore E · areas A — notifications: sent S / queued Q — new areas/subprojects/themes: … — backlog: …`. In interactive mode add one line per substantive change so Alex can correct the folding.

## Self-check before finishing

- No invented facts; every new claim traceable to a source link that resolves.
- Superseded facts removed, not stacked; sections use "-" when empty; pages within budget.
- `index.md` "Now" is dated and consistent with the pages.
- Ledger updated for EVERY artifact handled, including junk and duplicates (but NOT pending-voice — those stay in the backlog).
- Drops routed by TYPE (step 3b): no goal/task/insight/book/explore item buried in an area page; prefix hints overridden where content said otherwise; duplicates collapsed to one item.
- Bare URLs were fetched, images were read.
- Every routed knowledge item produced its notification (sent or queued; books/explore via their skills); outbox files, if any, are committed.
- Folded `context/_inbox/` files moved to `processed/` so the staging dir holds only the backlog.
- Sweep/interactive: changes committed as `context: …`; headless: no git, no Telegram.
