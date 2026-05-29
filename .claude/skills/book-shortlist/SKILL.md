---
name: book-shortlist
description: Capture a book into Alex's persistent reading shortlist at context/book-shortlist.md — resolve the (possibly shortened or misspelled) title to its real Title + Author, categorize it into one of his areas of interest (Fiction / History / Non-fiction psychology-business-technology / Non-fiction philosophy / Other), dedup, and append it. Use whenever Alex wants to remember a book for later — "save this book", "add <X> to my reading list", "shortlist <X>", "note down <book> to read later", "add this to my books", "remember <title>", or the /book-shortlist command — including when he just drops a bare title with intent to save it. This is the CAPTURE skill; it does not search or download. To actually find/acquire a book (links, audiobook, epub) use book-finder instead. After saving, it offers book-finder as the next step but never auto-runs it.
disable-model-invocation: false
user-invocable: true
---

# book-shortlist

You keep Alex's reading shortlist. He sends a book — often just a rough name — and you record it
cleanly in `context/book-shortlist.md`: resolved to its real title and author, filed under the right
area of interest, with no duplicates. That's it. You don't search stores or download anything — saving
a book is not the same as getting it. When the save is done, you can point him at `book-finder` to
actually acquire it, but only as a one-line offer.

## Hard rules

1. **Always record something.** The point is that nothing Alex flags gets lost. Resolve fuzzy input to
   a canonical `Title — Author`; if you genuinely cannot tell which book he means, save the raw input
   under **Other** with a `note: needs disambiguation` rather than dropping it — or ask one tight
   question if a quick answer would fix it.
2. **Resolve, don't mangle.** Misspelled or shortened names are expected ("sapiens", "thinkin fast n slow",
   "that Ferris four hour book"). Identify the real book from what you know; do a quick web/`gbooks_search`
   check only if you're unsure. Record the canonical title + author (+ year if confident). When your
   correction changed the input materially, keep the original as `was: "<raw input>"`.
3. **One category per book.** File it under exactly one of the five sections (see below). When in doubt
   between two areas, pick the better fit and move on — this is a personal list, not a taxonomy exam.
4. **Dedup.** Read the file first. If the book is already listed (match on title + author, case- and
   punctuation-insensitive), don't add it again — tell Alex it's already there and under which section.
5. **Append-only.** Add new entries under the right section; never reorder, rewrite, or delete his
   existing entries. Preserve the file's header and structure.
6. **No side effects.** No store searches, no downloads, no Telegram. Capture is local and instant.
7. **Committed context.** This file is synced across devices — keep entries clean and human-readable.

## Paths

- Shortlist file: `context/book-shortlist.md`. If it's missing, recreate it with the header + the five
  category sections (copy the structure that's already there). The file header documents the canonical
  categories and entry format — treat it as the source of truth.

## Categories (must match the file's sections)

1. **Fiction** — philosophical novels, historical novels with philosophical meaning
2. **History** — countries, events, biographies, memoirs
3. **Non-fiction (psychology / business / technology)**
4. **Non-fiction (philosophy)** — popular/general, not academic
5. **Other** — fits none of the above

This is the same area taxonomy `book-finder` routes on
(`.claude/skills/book-finder/references/sources.md` §1) — keep them consistent.

## Entry format

```
- **<Title>** — <Author>[, <year>] · added <YYYY-MM-DD>[ · was: "<raw input>"][ · <short note>]
```

Use today's date (from the environment) for `added`. `year` and `note` are optional; include `was:`
only when you corrected the input.

## Steps

1. **Parse.** Pull one or more book references out of Alex's message; strip the wrapper words
   ("save", "add to my list", "shortlist", etc.). A message may carry several books.
2. **Resolve each** to canonical `Title — Author` (+ year if confident), per Hard rules 1–2.
3. **Categorize** into one of the five sections.
4. **Dedup** against the current file contents (Hard rule 4).
5. **Append** each new entry under its `## <Category>` section using the entry format. Create the file
   or a missing section if needed.
6. **Confirm in-chat** — a tight summary: what was saved and under which category, any title corrections
   you made, and any duplicates skipped. End with a single-line offer:
   *"Want me to find any of these now? → `/book-finder`."* Don't run book-finder yourself.

## Notes

- Several books at once → process them all, then give one combined summary.
- This skill is the capture half of the pair; `book-finder` is the find/acquire half. If Alex's message
  is clearly "go get me this book" rather than "remember it", that's `book-finder`, not this.
