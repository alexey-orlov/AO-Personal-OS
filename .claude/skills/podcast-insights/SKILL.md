---
name: podcast-insights
description: Fold daily podcast-digest insights into the self-updating knowledge base at context/knowledge/podcasts/ — route each insight to a theme (or create one), dedup/merge near-duplicates across episodes, and refresh only the touched theme pages + the index map + the ledger. Modes — sweep (no args: process every unprocessed insight in context/knowledge/podcasts/_inbox/*.json via the ledger; if none, fall back to the latest "Youtube podcasts digest" Gmail), single (a date or an _inbox/<file>.json path), pasted (digest text/JSON in chat). Idempotent and bounded — only touched themes + the index are rewritten, never the whole base; zero-episode days are a complete no-op. Use on /podcast-insights, "fold the podcast digest", "update podcast knowledge / insights", or from the daily cloud routine.
disable-model-invocation: false
user-invocable: true
---

# podcast-insights — fold podcast-digest insights into the knowledge base

Sibling of `context-update`, applied to a clustered insight corpus instead of area wikis. Source insights are produced upstream by `automations/podcast-streaming` (already concrete, claim-shaped, evidence-bound, with timestamped deep-links). **This skill never re-summarizes** — it routes, dedups, and curates structure. Keep `headline` and `detail` **verbatim** from the pipeline; never blandify them.

## The model

- Base lives under `context/knowledge/podcasts/`:
  - `index.md` — the **map** (theme table + Recent + cross-links + channel legend). Always refreshed; stays ≤ ~90 lines.
  - `themes/<slug>.md` — one durable page per theme. **The unit of navigation.** Rewritten in place. Created on first populated insight.
  - `episodes/<year>/<date>--<chan>--<titleslug>.md` — per-episode provenance cards. **Write-once per insight; never hand-edited or rewritten** (only appended if a video gains late insights).
  - `_inbox/*.json` — capture buffer (n8n drops `<stamp>.json`); consumed files move to `_inbox/processed/`.
  - `_meta/processed.txt` — idempotency ledger: one stable insight-ID per line.
  - `_meta/themes.json` — theme registry (`slug → {title,status,created,mergedInto?,aliases,hint}`) + the canonical `channels` name→slug map. **Read this first.**
- **Insight ID** = `pi-<videoId>-<NN>`: the 11-char YouTube videoId + the insight's 1-based, zero-padded position in that episode's insight list (`pi-dQw4w9WgXcQ-01`). Deterministic, needs no hashing, identical across re-runs and both capture paths (videoId comes from the JSON, or from the `watch?v=` of the email link). This ID is the whole idempotency + dedup key.
- **Bounded by design**: a run reads `index.md` + registry + ledger + only the theme pages it will touch — never the whole base. Cost scales with *new insights + the themes they hit*, not base size. Structural change (split/merge) is event-driven and local, never a global re-cluster.
- Invariant to protect: `index.md` + one theme page = everything Alex's feed has said on that theme, with clickable sources, without opening a single episode card.

## Modes

1. **Sweep** (default, no input): fold every unprocessed insight in `_inbox/*.json` (files not yet in `_inbox/processed/`). If `_inbox/` has no unprocessed JSON, **fall back to Path B**: read the most recent Gmail thread titled `Youtube podcasts digest` and parse its cards.
2. **Single** (a path or date given): fold just that `_inbox/<file>.json`, or that date's inbox file / Gmail digest.
3. **Pasted** (digest text/JSON in chat): parse and fold; cite captured-source `(chat, YYYY-MM-DD)`; ledger the insight IDs but move no file.

Headless (cloud routine / `run.sh`): **no Bash** — never attempt git; update the ledger by Read + Write; the orchestrator commits. Interactive `/podcast-insights` has Bash (for `sort`/commit). Permissions when headless: `Read,Glob,Grep,Edit,Write` (+ the Gmail MCP search/get tools for Path B).

## Procedure

**0. Orient.** Read `_meta/themes.json` (active themes + their `hint`/title = clustering anchors; the channel map), `index.md`, and `_meta/processed.txt`. Do **not** read theme pages yet — only the ones you'll touch (step 5).

**1. Acquire + normalize input.**
- *Path A (JSON):* each `_inbox/*.json` is `{schema, runStamp, episodes:[{videoId,videoTitle,videoUrl,channelName,publishedAt?,guests[],summary,insights:[{headline,detail,anchorQuote,tSeconds,link}]}]}`.
- *Path B (Gmail):* parse the digest HTML — each `<h3>` is `channel · title` with the video link; the italic line is `with <guests>`; the `<p>` is the summary; each `<li>` is `headline` (the `<a>` text, linked to `…&t=NNN`) ` — ` `detail`. Recover `videoId` from the link's `watch?v=` (or `youtu.be/`), `tSeconds` from `&t=`. `anchorQuote` is absent on this path → record `-`. Skip the header/footer/heartbeat lines.
- Normalize every card to the canonical record; compute each insight's ID (`pi-<videoId>-<NN>`, NN = its position in that episode's list).
- **Idempotency cut (before any write):** drop every insight whose ID is already in the ledger. If a whole batch is already ledgered → no-op, emit the summary, stop.
- **Backfill cap:** if > ~40 new insights remain (first run / big backlog), process the newest episodes up to ~40 and report the rest as `backlog:` — no silent truncation.

**2. Quality-gate each surviving insight** (cheap, before folding):
- **Empty/degenerate**: no headline, or headline == detail, or detail empty AND no link → drop.
- **Over-generalized** (Alex's explicit pain): headline is a topic not a claim ("On defense software") AND detail carries no concrete handle (no proper noun, number, or named example) → drop. When in doubt and the detail IS concrete, keep it.
- **Zero-episode / heartbeat day** (digest with no episodes, or the "No new episode summaries" body): nothing to fold → **complete no-op on the base**, just report `processed 0`. Do not touch any file.
- Dropped insights are ledgered (so they're never re-judged) and counted as `dropped:` in the summary.

**3. Write/append episode cards (provenance first).** For each distinct `videoId` with ≥1 surviving insight: if its `episodes/<year>/<date>--<chan>--<titleslug>.md` doesn't exist, create it from the template (year/date from `publishedAt` else the digest date; chan from the channel map; titleslug = lowercased, hyphenated, ≤ ~50 chars). If it exists (late-transcript re-run), append only the genuinely new insight blocks. Never rewrite existing card content.

**4. Cluster — assign each insight to a theme.**
- Candidate set = `active` themes from the registry (title + `hint` + aliases). For a closer read, lazily open a candidate theme page's `## The throughline` only when needed; cache within the run.
- Pick the **single best-fit existing theme** by claim-similarity to the throughline/hint + existing headlines — **bias to an existing theme over creating a new one** (this damps non-deterministic drift).
- **Near-dup check inside the chosen theme** (read that one page, cache it): same claim + same source → already covered, skip (just ledger). Same claim + a *different* source → **corroboration-merge**: append a second attribution line under the existing insight, don't add a new block. Sharper / sharper-contradicting version → keep as a distinct insight + plan a `related:` cross-link.
- **New theme** only when **≥3 insights in this batch form a coherent cluster that fits no active theme** (or ≥2 in-batch + ≥1 already-filed insight clearly mis-homed). A lone orphan does **not** birth a theme → file it in the closest theme with an `(inferred fit)` note (and, if the fit is weak, a line under that theme's `## Open questions`). New theme → allocate an immutable slug, add a registry row (`status: active`, `created: today`, `hint`), create `themes/<slug>.md` from the template, queue it for the index.

**5. Apply edits to touched theme pages only (rewrite in place).** For each theme that gained/merged an insight:
- Insert each new insight block under `## Insights` (the throughline stays first).
- Corroboration-merge → second attribution line under the existing insight, not a duplicate block.
- Add planned `related:` cross-links (both directions if the sibling is also touched).
- Refresh `## The throughline` **only if** the new insights genuinely shift it — otherwise leave the prose (don't churn).
- Update `_updated:` + the count line.
- **Page budget ≤ ~30 insights.** If exceeded, see Structure lifecycle — flag a split; do not auto-butcher.
- Untouched theme pages are not opened or rewritten.

**6. Refresh the index map.** Rewrite only: affected theme rows (count + last-added + one-liner), the "Recent (last 7 days)" block (add this batch, prune > 7 d), any new cross-theme links, new theme rows, and the header `_updated:` + totals (count insights/themes/episodes). Index is small and fully rewritten each run.

**7. Ledger + registry + inbox.** Append every handled insight ID — folded, merged, AND dropped — to `_meta/processed.txt`. Interactive: `sort -o … …` after. Headless: Read, add lines, Write back (keep sorted-unique). Persist `_meta/themes.json` if themes were created/merged/renamed. Move consumed `_inbox/*.json` → `_inbox/processed/` (pasted mode: ledger only, no move).

**8. Finish (sweep / interactive only).** Commit deliberately so git-autosync doesn't scoop a generic message:
```bash
git add context/knowledge/podcasts && git commit -m "feat(podcasts): fold <stamp> — <F> insights · themes: <…>"
```
Headless leaves git to the orchestrator.

## Structure lifecycle (event-driven, never a global re-cluster)

- **Slugs are immutable.** A **rename** edits only the registry `title` + the page `# H1` + the index row; the slug/filename never change, so old links and IDs keep resolving.
- **Split** (a theme > ~30 insights *and* a clean seam): create the child theme(s) with fresh slugs, **move** the relevant insight blocks (IDs don't change → ledger stays valid), leave a one-line pointer in the parent's `## Related themes`, record `note: split` in both registry rows. A fuzzy overgrown page is **flagged in the run summary** for Alex to split interactively — not auto-split.
- **Merge** (two themes are one): pick the survivor slug (older/larger), move the loser's blocks in (dedup per step 4), set the loser `status: merged` + `mergedInto` + add its slug to the survivor's `aliases` (tombstone kept forever). Replace `themes/<loser>.md` with a 2-line stub pointing to the survivor.
- `/podcast-insights recluster <theme>` is the manual maintenance op for the above; normal daily runs never trigger them.

## Templates

**Theme page** (`themes/<slug>.md`):
```markdown
# <Theme title>

_status: live theme — <one-line gist>_
_slug: <slug>_
_updated: YYYY-MM-DD · <N> insights from <M> episodes_

## The throughline
<2–4 sentences synthesizing the cluster — the ONLY place generalization is allowed; mark synthesis, not evidence>

## Insights

### <verbatim headline>
<verbatim detail>
— <channel> · <YYYY-MM-DD> · guest: <guest(s) or —> · [▶ mm:ss](<deep-link>) · `<id>`
related: [<sibling headline>](#<anchor>) · theme → [<other theme>](<other-slug>.md)   ← omit if none

## Open questions          ← optional; omit when empty
- <cross-episode tension or weak-fit note>

## Related themes          ← optional
- [<other theme>](<other-slug>.md) — why related

## Source episodes
- [<channel> — <title> (<date>)](../episodes/<year>/<file>.md)
```

**Episode card** (`episodes/<year>/<date>--<chan>--<titleslug>.md`):
```markdown
# <channel> — <title>

_source: youtube · channel: <channel> · published: <YYYY-MM-DD>_
_video: <videoUrl>_
_guests: <guest(s) or —>_
_captured: <YYYY-MM-DD> (Path A|B) · digest run <runStamp or —>_

## Summary
<verbatim pipeline summary>

## Insights extracted (<n>)

- `<id>` — **<headline>** → theme [<theme title>](../../themes/<slug>.md)
  - detail: <verbatim detail>
  - anchor: "<anchorQuote or —>" · t=<tSeconds> · [▶ mm:ss](<deep-link>)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
```

## Out of scope

- Everything under `context/areas/`, `context/people/`, `inbox/`, and `outputs/` — owned by `context-update` and others; this skill touches only `context/knowledge/podcasts/`.
- Raw `_inbox/*.json`, `_inbox/processed/`, and `episodes/*` content are read-only inputs/archives — theme pages link INTO them; never edit them by hand.
- No re-summarizing: never paraphrase `headline`/`detail` into something blander. Generalization is allowed only in a theme's `## The throughline`.

## Run summary (always output)

One block: `podcasts: processed N (folded F · merged M · dropped D · already-had A) — themes touched: … — new themes: … — backlog: …`. Interactive mode adds one line per new theme and per merge/inferred-fit so Alex can correct the clustering. When Alex corrects a clustering decision, apply the CLAUDE.md feedback loop — generalize the rule and add it to the Self-check below, don't just fix the one instance.

## Self-check before finishing

- IDs computed as `pi-<videoId>-<NN>`; ledger updated for EVERY insight handled (folded, merged, dropped) → re-running is a clean no-op.
- `headline`/`detail` copied verbatim; nothing blandified; over-generalized/empty insights dropped, not folded.
- Only touched theme pages + `index.md` changed (`git diff --stat` proves it); zero-episode days touched nothing.
- Every insight has a resolving deep-link + ID; every theme page links its source episodes; pages ≤ ~30 insights, index ≤ ~90 lines.
- New theme only on a ≥3 cluster; a lone orphan went to the closest theme with `(inferred fit)`.
- `index.md` totals + `_updated:` consistent with the registry and pages.
- Sweep/interactive: committed as `feat(podcasts): …`; headless: no git attempted.
