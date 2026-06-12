# Knowledge tree — the second brain

Everything Alex captures and learns, parallel to `context/areas/` ("things I'm working
on" vs. this, "things I'm capturing and learning"). Since 2026-06-12, goals, tasks, and
raw insights do NOT live here — they flow into Alex's pinned **Apple Notes** (`_ToDo`
folder), which are his real working surface. This tree keeps the capture categories
that benefit from repo files + Telegram delivery.

| Capture | Home | Delivery | Engine |
|---|---|---|---|
| Goals, tasks, insights | Alex's pinned Apple Notes (`_ToDo`) — NOT in the repo; queue: `context/_inbox/apple-notes/` | `📥`-marked bullet in the matching note (silent — no Telegram) | `context-update` (writes queue cards) → `apple-notes-sync` (local leg, files them + snapshots) |
| Books | [book-shortlist.md](book-shortlist.md) | 📚 Books topic — book-finder results per new book | `context-update` → `book-shortlist` format + `book-finder` |
| Articles & topics | [explore/queue.md](explore/queue.md) + [explore/briefs/](explore/briefs/) | 🔭 Articles & Topics topic — research brief + link buttons | `context-update` → `explore-brief` |
| Podcasts (automated) | [podcasts/](podcasts/index.md) | 📰 Daily Digest topic | `automations/podcast-streaming` → `/podcast-insights` |

Flow: Telegram 📥 Drop Zone → n8n capture → `context/_inbox/` → daily cloud fold
(`context-update` sweep) routes each drop by TYPE — goal/task/insight → queue card in
`context/_inbox/apple-notes/` (the Mac-local `apple-notes-sync` leg inserts it into the
right pinned note within ~30 min of the laptop being awake); book/explore → the homes
above, with their Telegram notifications queued in `context/_inbox/outbox/` (flushed by
the n8n "Outbox flush (cloud)" workflow when the fold ran without Telegram credentials).

Agent visibility into the Apple Notes: read-only snapshots at
`context/areas/<area>/apple-notes/<slug>.md`, refreshed by `apple-notes-sync` on every
run (map: `.claude/skills/apple-notes-sync/references/note-map.md`). Treat the note as
the source of truth and the snapshot as possibly a few days stale.

Rules that keep this tree clean:

- **One home per item — no duplication.** An item lives in exactly one place; area
  pages and other categories may link to it, never restate it.
- **Capture is area-agnostic.** Even an item clearly tied to an area routes by TYPE
  first (queue card carries an `area:` tag for note matching).
- **Ownership boundaries:** `podcasts/` belongs to the `/podcast-insights` engine;
  `book-shortlist.md` + `explore/` belong to `context-update` and its helper skills
  (`book-shortlist`, `book-finder`, `explore-brief`); the apple-notes queue is written
  by `context-update` and consumed ONLY by `apple-notes-sync`. Engines never write
  into each other's subtrees.

Retired 2026-06-12: `goals-tasks.md` (the 🎯 Goals & Tasks Telegram board) and
`insights/` (💡 theme pages) — superseded by the Apple Notes flow above; their content
as of retirement lives in git history, and all open items already existed in the notes.

Future sources (courses, talks, books read) join as sibling folders under the same
pattern: an index/map + curated self-updating pages, raw provenance kept separate.
