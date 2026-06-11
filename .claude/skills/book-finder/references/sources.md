# book-finder — routing matrix & source recipes

The canonical preferences and per-source how-to. SKILL.md cites this; keep the
algorithm + constants here so the skill body stays lean.

## Table of contents
1. Routing matrix (area → language → media → source order)
2. Language decision for Fiction (the one judgment call)
3. Source recipes: Audible · Google Play Books · knigavuhe.org · fb2/epub download
4. Verifying a link actually resolves
5. Telegram delivery snippets
6. EPUB vs fb2 (Play Books upload)

---

## 1. Routing matrix

Decide the **language** first (per area + the Fiction rule below), then walk the
**source priority** left-to-right; the first source that yields a verified result wins.
If Alex explicitly names a language, format, or source in his request, that override
beats these defaults — say so out loud.

| Area | Language | Media | Source priority |
|------|----------|-------|-----------------|
| **1. Fiction** — philosophical novels, historical novels with philosophical meaning | **Always RU** (knigavuhe). **Also EN** when original is English AND prose is accessible to a strong non-native reader (see §2). If English is complex or not the original language → RU only. Search both in parallel; deliver all verified links. | **Audio ONLY — reading is not acceptable** | RU audio: **knigavuhe → Google Play (audiobook)**. EN audio (when applicable): **Audible → Google Play (audiobook)**. |
| **2. Non-fiction** — psychology, business, technology | EN preferred | Audio preferred, reading OK | EN audio: **Audible → Google Play (audiobook)**. Reading fallback: **Google Play (ebook) → fb2/epub download** |
| **3. History** — countries, events, biographies, memoirs. *Only genuinely great, well-reviewed books.* | RU preferred | Audio preferred, reading OK | RU audio: **knigavuhe → Google Play (audiobook)**. Reading fallback: **fb2/epub download → Google Play (ebook)** |
| **4. Non-fiction philosophy** — popular/general, *not* academic | RU preferred | **Reading preferred** | RU reading: **Google Play (ebook) → fb2/epub download** |

Notes:
- "Audio preferred, reading OK" (areas 2–3): try the audio sources first; only fall to
  reading sources if no audio edition exists in the wanted language.
- Area 3 quality bar is real: for History, only surface books with a strong, verifiable
  review signal (see §3 Audible/Play ratings + WebSearch for critics' lists). Skip filler.
- Area 4 leans reading, so lead with Google Play ebook / epub; an audiobook is a last resort.

## 2. Language decision for Fiction (area 1 only; areas 2–4 follow the table)

Russian is **always** searched for Fiction — knigavuhe first, Google Play audiobook as fallback.

English is searched **additionally** when BOTH hold:
- the book was **originally written in English**, and
- the prose is **accessible to a strong non-native reader** — no heavy era-specific
  vocabulary, no very dense/experimental narration, no thick domain jargon.

If either condition fails → RU only (don't waste a search slot on a non-existent or unreadable EN audio).

Always state both calls out loud, e.g.:
- *"Originally English, plain prose → RU audio (knigavuhe) + EN audio (Audible)."*
- *"Originally English but dense Victorian diction → RU audio only (knigavuhe)."*
- *"Originally Russian → RU audio only (knigavuhe)."*

When unsure how hard the prose is, include EN and note the uncertainty so Alex can drop it.

## 3. Source recipes

For every source: **never invent an identifier or link.** Find the real page, then verify
it resolves to the right title+author (see §4) before handing it over. If you can't find a
real one, fall to the next source — don't fabricate.

### Audible (English audio; US store — audible.com)
- Find the product page with WebSearch: `<title> <author> audiobook site:audible.com`.
- Product URL shapes (both open the Audible iOS app via universal links when tapped):
  - `https://www.audible.com/pd/<slug>/<ASIN>`
  - `https://www.audible.com/pd/<ASIN>`  (ASIN = 10-char id, usually starts `B0`)
- Audible's catalog is overwhelmingly English — don't use it for Russian titles.
- Audible product pages also carry a star rating + review count → useful quality signal for
  area-2/3 curation.

### Google Play Books — ebook
- Use the bundled script (covers ebooks):
  ```bash
  python3 automations/book-finder/scripts/gbooks_search.py --lang <en|ru> "<title> <author>"
  ```
- Pick the candidate matching title+author with `ebook_available: true`; its `play_books_url`
  is `https://play.google.com/store/books/details?id=<volumeId>` (opens the Play Books iOS app).
- The script also returns `averageRating` / `ratingsCount` — one objective review signal for curation.

### Google Play Books — audiobook
- The Books API does **not** cover audiobooks. Find via WebSearch:
  `<title> <author> site:play.google.com/store/audiobooks`.
- URL shape: `https://play.google.com/store/audiobooks/details?id=<id>` (opens Play Books app).

### knigavuhe.org (Russian audio — free streaming; the primary RU listening source)
- Russian queries work best — translate/transliterate the title+author to Russian if needed.
- Search: WebSearch `<russian title> <author> site:knigavuhe.org`, or fetch
  `https://knigavuhe.org/search/?q=<url-encoded RU query>` and take the first real book result.
- Book page shape: `https://knigavuhe.org/book/<slug>/`. This is the link to return (free
  streaming audio — there's nothing to download; Alex opens the page and listens).

### fb2/epub download (reading; saved to the iCloud Books dir)
- Find a free, ideally **legitimate** copy first: Project Gutenberg (`gutenberg.org`, public
  domain, epub), Standard Ebooks, or a publisher/author free edition. For Russian titles that
  aren't public-domain in EN catalogs, well-known RU ebook libraries host fb2/epub.
- Get a **direct file URL**, then:
  ```bash
  python3 automations/book-finder/scripts/download_book.py --name "<Author> - <Title>" "<file-url>"
  ```
- The script saves into `$BOOKS_DIR`, **prefers EPUB, rejects PDF**, skips dups, and prints a
  JSON result with the final `path`. Prefer an EPUB url over an fb2 url when both exist (see §6).
- This is for Alex's personal reading — prefer public-domain / legitimately-free copies.

## 4. Verifying a link actually resolves

A search result is a *candidate*, not a confirmed link. Before delivering:
- WebFetch the URL (or the script's returned URL) and confirm the page is the **right book**
  — title and author appear, it's not a 404, a search-results page, or a "no longer available".
- For Audible/Play, confirm it's the wanted **format** (audiobook vs ebook) and, where it matters,
  the wanted **language**.
- If verification fails, drop that candidate and try the next source.

## 5. Telegram delivery snippets

Links → one message per book with a tappable button (opens the app on the phone):
```bash
echo "<HTML body: title · author · why · source>" | \
  TG_TOPIC=books TG_PARSE_MODE=HTML automations/telegram/telegram_send_with_button.sh \
  "🎧 Audible: <Short Title>" "<product-url>"
```
Button-label emoji by source: 🎧 Audible · 🎧 knigavuhe · 📚 Play Books (ebook) ·
🎧 Play Books (audio). Escape `& < >` in the HTML body.

Downloaded files (a local path isn't a URL → no button):
```bash
echo "📥 Downloaded: <filename>
→ <full iCloud path>
Open Files → Books on your phone to import into Play Books." | \
  TG_TOPIC=books automations/telegram/telegram_send.sh
```
Telegram failures are non-fatal — the in-chat result still stands.

## 6. EPUB vs fb2 (Play Books upload)

Google Play Books upload accepts **EPUB and PDF, not fb2**. So when a reading source offers both,
take the **EPUB**. fb2 is still fine for other readers and Alex listed it as acceptable, so keep
it if that's all that's available — but prefer epub for the upload-to-Play path. If only fb2 exists
and Alex wants it in Play Books, calibre's `ebook-convert` can convert it (optional; see the
automation README).
