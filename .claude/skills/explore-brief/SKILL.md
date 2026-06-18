---
name: explore-brief
description: Research one explore-queue item (a topic, question, or article URL) into a compact, source-labeled research brief at context/knowledge/explore/briefs/<slug>.md, link it from explore/queue.md, and deliver a summary with link buttons to the 🔭 Articles & Topics Telegram topic. Follows Alex's research standards (.claude/references/research-standards.md) — labeled claims, source tiers, named specifics, explicit gaps, answer first. Use on /explore-brief <topic|URL>, "research this explore topic", "brief me on X (for the queue)", or with no args to brief the oldest un-briefed Open item in the queue. Invoked automatically by context-update for every new Explore drop. For deep multi-source reports outside the queue workflow, prefer the deep-research skill; this one is deliberately bounded (~15-min-read brief, 4–8 sources).
disable-model-invocation: false
user-invocable: true
---

# explore-brief — research one explore item into a brief + Telegram summary

## Inputs

- A topic / question / article URL (argument or pasted), OR
- a path/line from `context/knowledge/explore/queue.md`, OR
- nothing → take the OLDEST `## Open` item in the queue without a `→ [brief]` link. If none, say so and stop.

## Hard rules

1. **Follow `.claude/references/research-standards.md`** — it governs claim labeling
   ([Fact/source] / [Practitioner consensus] / [Inference] / [Speculation]), source tiers,
   named specifics, explicit gaps, and answer-first structure. Read it before writing.
2. **Bounded by design**: 4–8 quality sources, brief ≤80 lines, one Telegram message.
   This is a queue-clearing tool, not deep-research — if the topic genuinely needs a
   full report, say so in the brief's Gaps section and suggest `/deep-research`.
3. **Never delete or reorder queue lines** — you only append the brief link to the item's
   line (and add the line first if the topic wasn't queued yet).
4. Slugs are immutable kebab-case from the topic (`agent-loop-architecture-karpathy`);
   if `briefs/<slug>.md` already exists, UPDATE it (rewrite in place, bump `_date:`)
   rather than creating a near-duplicate.

## Procedure

1. **Resolve the item.** For an article URL: WebFetch it first — the brief is then "what
   this article says + does it hold up", with 2–3 corroborating/contradicting sources.
   For a topic/question: research it fresh.
2. **Research.** WebSearch + WebFetch. Prefer primary sources (official docs, original
   talks/posts, engineering blogs) over commentary; note each source's tier. Stop at
   diminishing returns, not at a fixed count.
3. **Write the brief** to `context/knowledge/explore/briefs/<slug>.md`:

```markdown
# <Topic> — research brief

_question: <the queue item's actual question>_
_date: YYYY-MM-DD · sources: N · provenance: [drop](…) or (chat/queue)_

## TL;DR
(2–4 sentences — the answer itself, callable without reading further)

## What's known
(numbered points; every claim labeled + tier-cited; specifics named, no "typically")

## For Alex
(only REAL hooks into his work — areas, items in his Apple Notes todo snapshots (`context/areas/<area>/apple-notes/`), positioning; "-" if none)

## Go deeper
(- [title](url) — one line on why, ranked; the 2–4 best only)

## Gaps & caveats
(what's unverified, biased, or out of scope; "needs /deep-research" if true)
```

4. **Link it from the queue.** In `context/knowledge/explore/queue.md`, append
   ` → [brief](briefs/<slug>.md)` to the item's line (add the line under `## Open` first
   if this topic wasn't captured before). The line stays `- [ ]` — Alex checks it off
   himself after reading.
5. **Deliver to Telegram** — `TG_TOPIC=explore`, via
   `automations/telegram/telegram_send_with_button.sh`. **Button label and URL are
   SEPARATE shell arguments** — one `(text, url)` pair per button row:
   `… telegram_send_with_button.sh "Full brief" "<brief-url>" "Anthropic report" "<src-url>" …`
   (body on stdin). NEVER pass `"label url"` as one argument and NEVER hand-assemble the
   outbox card JSON — both produce a button whose `url` field carries a label prefix, which
   Telegram rejects (`BUTTON_URL_INVALID`) and which can poison a whole outbox-flush batch.
   Always go through the script; it builds the `{text,url}` objects correctly. Before
   committing a queued card, verify each `buttons[][].url` is a bare `https://…` with no
   spaces or label prefix.
   - Body (plain text, ≤3000 chars): `🔭 <topic>` + blank line + TL;DR + 2–4 key points
     (one line each, tier in parentheses).
   - Buttons: `Full brief` → `https://github.com/alexey-orlov/AO-Personal-OS/blob/main/context/knowledge/explore/briefs/<slug>.md`,
     then the top 1–3 source links.
   - In cloud/no-Keychain environments `export TG_OUTBOX=1` first (the send is queued to
     `context/_inbox/outbox/` and flushed by the n8n "Outbox flush (cloud)" workflow).
   - A send failure is non-fatal — report it, don't abort.
6. **Commit (standalone interactive runs only):** `git add context/knowledge/explore && git commit -m "context: explore brief — <slug>"`.
   When invoked from a `context-update` sweep or the cloud routine, the parent run commits.

## Out of scope

- Other capture homes (book shortlist, podcasts, the apple-notes queue) — if the
  research surfaces a book or a standalone insight worth keeping, SUGGEST it in the run
  output; don't file it yourself.
- Checking items off the queue — that's Alex's call after reading.

## Output (in chat)

The TL;DR + path to the brief + whether the Telegram message was sent or queued.
