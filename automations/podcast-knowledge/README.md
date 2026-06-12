# podcast-knowledge — podcast insights → self-updating knowledge base

Turns the daily `podcast-streaming` digest into a navigable, clustered insight base under `context/knowledge/podcasts/`. Two stages, both cloud (laptop-independent):

```
n8n  (07:00 Kyiv, cloud) ──PUT JSON──▶  context/knowledge/podcasts/_inbox/<stamp>.json   (Path A capture)
claude.ai routine (~08:03 Kyiv, cloud) ─▶  /podcast-insights sweep  → folds into themes/, refreshes index.md, commits
```

- **Engine** = the `podcast-insights` skill (`.claude/skills/podcast-insights/SKILL.md`). It routes each insight to a theme (or creates one), dedups/merges across episodes, rewrites only touched theme pages + the index, and updates the ledger. Idempotent; zero-episode days are a no-op.
- **Schedulers** (two, same engine): the daily **claude.ai cloud routine** (primary), and **`run.sh`** here (local fallback). Engine-vs-scheduler, so the cloud and local paths never diverge.
- **Capture**: Path A — n8n commits the morning's insight cards as JSON to `_inbox/`. Path B (fallback) — the curator parses the "Youtube podcasts digest" Gmail. Path A is primary (pristine data incl. verbatim anchor quotes); Path B exists so a missed commit still gets folded.

The knowledge base itself is documented in `context/knowledge/podcasts/index.md`.

## Why this layout
The only time-sensitive step (capturing summaries before they scroll out of Telegram/email) runs in **n8n cloud** — so a sleeping laptop loses nothing. The clustering step runs as a **cloud routine**, but even if it ever lags it self-heals: the per-insight ledger means the next run folds whatever's still unprocessed. Same philosophy as the v3 digest self-heal and the `context/_inbox/`→`context-update` flow.

## Setup

### 1. GitHub token for n8n (Path A capture)
Create a **fine-grained** personal access token so n8n can commit the JSON:
1. GitHub → Settings → Developer settings → **Fine-grained tokens** → Generate new token.
2. Resource owner: your account. **Repository access → Only select repositories → `alexey-orlov/AO-Personal-OS`**.
3. Permissions → **Repository permissions → Contents: Read and write** (nothing else). Expiration: your call (set a calendar reminder to rotate).
4. Copy the token (starts `github_pat_…`).
5. In n8n → **Credentials → New → "Header Auth"**: Name = `GitHub PAT (AO-Personal-OS)`; Header **Name** = `Authorization`; Header **Value** = `Bearer github_pat_…`. Save.

The token lives only in the n8n credential — **never** in the exported `workflow-v3.json` or this repo (per CLAUDE.md "NEVER commit secrets").

### 2. n8n capture nodes
Added to **Podcast streaming v3** after `Build Digest` (see `automations/podcast-streaming/README.md` for the node details). Side-channel + `continueRegularOutput`, so a GitHub hiccup can never affect Telegram/Gmail delivery — the cloud routine's Path B covers the gap.

### 3. claude.ai cloud routine (clustering) — the chosen scheduler
Runs the fold in the cloud, laptop-independent. Enable it once (it needs your claude.ai account, so it can't be created from a local CLI session):

1. **Connect the repo:** claude.ai → Settings → Connectors/Integrations → **GitHub** → grant access to `alexey-orlov/AO-Personal-OS`. (This is the gate — the routine can't read/push the repo without it.)
2. **Create the routine:** claude.ai → **Code → Routines** (scheduled agents) → New → pick the `AO-Personal-OS` repo + `main` branch → **schedule daily 08:03, timezone Europe/Kyiv** (≈1 h after the 07:00 digest) → paste the prompt below.
3. **Dry-run it once** off-schedule to confirm it reads `_inbox/`, folds, and pushes a `feat(podcasts):` commit; then let the schedule run unattended.

> **Model.** Both cloud routines (daily fold + bi-weekly recluster) share one claude.ai Code **environment** (`env_01BNzuaijoXLrxA9Gfw8k6Wt`), and the model is set on that environment — **not** settable per-routine via the triggers API (a per-trigger `model` is ignored/rejected). Set it once in the claude.ai Code environment settings. **Recommended: Fable 5 (`claude-fable-5`)** — the work is semantic clustering / dedup / anti-generalization judgment (daily) and consequential split/merge restructuring (bi-weekly), both of which want the flagship; daily token volume is small enough (~5–15k in/run) that cost is negligible, so the optimum is the strongest model, not a cheaper one. The two routines can only differ in model if placed in separate environments — not worth it for the pennies involved. The local fallback `run.sh` pins the same model via `PODCAST_MODEL` (default `claude-fable-5`).

> Once step 1 is done you can also ask Claude (in a session with the repo) to create it for you via the claude.ai routines API — the local CLI can't, because the API requires the repo already connected to your account.

- Prompt:
  > Run the `podcast-insights` skill in **sweep** mode. Fold today's podcast digest into `context/knowledge/podcasts/`: use unprocessed `_inbox/*.json` if present (Path A), else read the latest Gmail thread titled "Youtube podcasts digest" and parse its cards (Path B). Route each insight to a theme or create one per the skill's thresholds, dedup/merge across episodes, refresh only touched theme pages + `index.md`, update `_meta/processed.txt` and `_meta/themes.json`. If there are zero new insights (heartbeat/zero-episode day), make no changes and just report. Then commit `feat(podcasts): …` and push. Output only the skill's run-summary block.

## Local fallback — `run.sh`
If the cloud routine is ever down, fold locally with the same skill:
```bash
automations/podcast-knowledge/run.sh
# or unattended in an open Claude Code session:
/loop 1d automations/podcast-knowledge/run.sh
```
It runs the skill headlessly (Path A; no Bash for the skill → it won't git), then commits + pushes best-effort. For the Path B (Gmail) fallback locally, export `GMAIL_TOOLS=mcp__<gmail-server>__search_threads,mcp__<gmail-server>__get_thread` (server name is environment-specific). `PODCAST_MODEL` overrides the model.

## Ops
- **Manual cloud run**: trigger the claude.ai routine off-schedule (it folds whatever's unprocessed).
- **Re-run safety**: idempotent — the per-insight ledger (`_meta/processed.txt`) means a repeat run changes nothing.
- **Correcting clustering**: run `/podcast-insights` interactively; corrections to theme assignment/splits feed back into the skill's self-check (CLAUDE.md feedback loop).
- **Reclustering**: a second cloud routine, **"Bi-weekly podcast knowledge recluster"** (11th & 25th of each month, 15:55 UTC = 18:55 Kyiv), runs the skill's Structure-lifecycle maintenance: splits theme pages over ~30 insights along clean seams, merges duplicate themes, refreshes the index. Daily fold runs still never restructure — they only flag split candidates in `index.md`, which the bi-weekly routine acts on. `/podcast-insights recluster <theme>` remains the manual override for an ad-hoc split/merge.

## Files
- `run.sh` — local fallback scheduler (runs the skill headlessly + commits).
- The engine lives in `.claude/skills/podcast-insights/`; the base in `context/knowledge/podcasts/`; the capture nodes in `automations/podcast-streaming/`.
