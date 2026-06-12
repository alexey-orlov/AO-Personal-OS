# Knowledge tree — the second brain

Everything Alex captures and learns, parallel to `context/areas/` ("things I'm working
on" vs. this, "things I'm capturing and learning"). Four capture categories plus one
automated source — each with exactly ONE home here and a mirrored Telegram topic. The
repo file is always the source of truth; Telegram is the notification/interaction view.

| Category | Home | Telegram topic | Engine |
|---|---|---|---|
| Goals & tasks | [goals-tasks.md](goals-tasks.md) | 🎯 Goals & Tasks — one message per item (🎯/☑️); 👍 = done | `context-update` + n8n item post/sync |
| My insights | [insights/](insights/index.md) — theme pages | 💡 My Insights — one message per insight, theme emoji | `context-update` |
| Books | [book-shortlist.md](book-shortlist.md) | 📚 Books — book-finder results per new book | `context-update` → `book-shortlist` format + `book-finder` |
| Articles & topics | [explore/queue.md](explore/queue.md) + [explore/briefs/](explore/briefs/) | 🔭 Articles & Topics — research brief + link buttons | `context-update` → `explore-brief` |
| Podcasts (automated) | [podcasts/](podcasts/index.md) | 📰 Daily Digest | `automations/podcast-streaming` → `/podcast-insights` |

Flow: Telegram 📥 Drop Zone → n8n capture → `context/_inbox/` → daily cloud fold
(`context-update` sweep) routes each drop by TYPE to its home above and queues the
category-matched Telegram notification in `context/_inbox/outbox/` (flushed by the n8n
"Second-brain delivery" workflow when the fold ran without Telegram credentials).

Rules that keep this tree clean:

- **One home per item — no duplication.** An item lives in exactly one category file;
  area pages and other categories may link to it (by id or path), never restate it.
- **Capture is area-agnostic.** Even an item clearly tied to an area lands here first
  (tagged `area: <slug>`) so nothing disappears into an area page unnoticed.
- **Ownership boundaries:** `podcasts/` belongs to the `/podcast-insights` engine;
  everything else here belongs to `context-update` and its helper skills
  (`book-shortlist`, `book-finder`, `explore-brief`). Engines never write into each
  other's subtrees.

Future sources (courses, talks, books read) join as sibling folders under the same
pattern: an index/map + curated self-updating pages, raw provenance kept separate.
