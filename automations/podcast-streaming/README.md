# podcast-streaming — daily YouTube podcast digest (n8n)

Cloud automation (runs in n8n cloud, not on this machine): watches 7 YouTube channels, transcribes new videos (RapidAPI youtube-transcript3), summarizes them (gpt-5-mini), and delivers a daily digest to Telegram + Gmail at 07:00 Kyiv.

**Telegram routing (since 2026-06-11):** all three sends — the digest, the ⚠️ feed-health alert, and the 🎙️ crash alert from the error-alerts workflow — go to the **"AO Personal OS" forum group → 📰 Daily Digest topic** (`message_thread_id` from `automations/telegram/topics.env`, slug `daily-digest`), not the legacy 1:1 DM. The group chat id is set directly in the n8n nodes but **redacted to `REDACTED_GROUP_CHAT_ID` in the exported JSON here** (same convention as `telegram-inbox/export.sh`); on re-import, restore it from Keychain (`TELEGRAM_GROUP_CHAT_ID`).

This folder holds the exported workflow JSON (disaster-recovery copy + reviewable diff history) and this doc. The live system is in n8n: <https://alexorlovco.app.n8n.cloud>

## Workflows in n8n

| Workflow | ID | State |
|---|---|---|
| Podcast streaming v3 (resilient) | `Qh5MoiJAkZRxtzhE` | **active** (the live one) |
| Podcast streaming — error alerts | `k2xuGa0yG0pQFVff` | active (Telegram alert on crash) |
| Podcast streaming v2 (HTTP fetch) | `n080pOslXURMbcRY` | deactivated 2026-06-11, kept as rollback |
| Podcast streaming (v1) | `OK7wK3MTUlSfoLeN` | inactive, historical |

## Why v3 exists (incident 2026-06-09..11)

YouTube throttles n8n cloud's shared egress IP for `youtube.com/feeds/videos.xml`. On Jun 9 and Jun 10 six of seven feeds silently failed (only "How I AI" got through); on Jun 11 all seven failed and the run errored. v2 only alerted when **all** feeds failed, used a fixed 24h window, and had a dedup map that was read but never written — so any video missed once was lost forever. Videos without a ready transcript were silently dropped too ("Transcript empty?" false branch led nowhere).

## v3 design — reliability via redundancy + a persistent ledger

- **Dual-path fetch.** Every feed is fetched twice in parallel: direct XML and via `api.rss2json.com` (their servers fetch YouTube from a different IP pool). Results are merged and deduped per videoId; a feed counts as healthy if either path succeeded.
- **Persistent ledger** in `workflowStaticData`: every discovered video gets `status: discovered`; only after its Telegram message actually delivers does it become `sent`. Entries pruned after 14 days.
- **Discovery 3×/day** (07:00 digest run + 13:00 + 19:00 discovery-only runs, Europe/Kyiv), 72h lookback. As long as *any* of those ~6 daily fetch attempts (3 runs × 2 paths) succeeds within 72h of publish, the video lands in the ledger and is delivered at the next digest. A video is lost only if every attempt fails for 3 days straight.
- **Digest at 07:00** sends everything still unsent (oldest first, max 15/run). A failed morning self-heals with zero loss: the videos stay `discovered` in the ledger and ride along in the next successful 07:00 digest. (No active retry — the ledger + 72h lookback *is* the retry.)
- **No-transcript videos** are retried at each digest for 36h, then delivered link-only. Nothing is silently dropped.
- **Quiet by default — only pings when there's something to act on.** Sends the digest when there are new episodes; sends a standalone ⚠️ feed-health alert when a channel has had no successful fetch (either path) for 36h+; otherwise **silent**. There is deliberately no "all good / nothing new" heartbeat (removed 2026-06-11 at Alex's request). Liveness signal = the near-daily real digest + the crash alert below.
- **Failure handling**: feed/transcript/model/send nodes all `continueRegularOutput` + retries, so one bad item can't kill the run. A genuine crash (e.g. a Code node throwing) fires the error-alerts workflow → Telegram alert.

## Security note — no public trigger (incident 2026-06-11)

v3 originally had a public `webhook` trigger (`/webhook/podcast-stream-v3-run`) for manual/backfill runs. The URL got committed to this repo, git-autosync pushed it to GitHub, and within the hour a GitHub-commit-scraping bot probed it — firing a digest-mode run that sent a spurious "no new episodes" message at a random hour. The webhook has been **removed**: that path now 404s, neutralizing the already-leaked URL. Lesson (now a hard rule in the root `CLAUDE.md`): never commit a live trigger URL for a side-effectful/paid automation.

## Ops

- **Manual run**: open v3 in the n8n canvas and click **Execute workflow** (the manual trigger runs in digest mode). Caveat: manual canvas executions don't persist `workflowStaticData`, so sent-marks from a canvas run are discarded and the next scheduled run may re-send those items. Fine for a one-off test; for anything that must persist the ledger, let a scheduled run do it.
- **One-off backfill / seeding** (rare — e.g. the 2026-06-11 recovery): temporarily add a `webhook` trigger with a fresh random path + Header-Auth credential → `Mode: digest`, run it with `?markSent=<id1>,<id2>` / `?lookbackHours=96` (the `Parse + discover` node still reads those query params), then delete the webhook again. Do **not** leave a public webhook active or commit its URL.
- **Add/remove a channel**: edit the `FEEDS` array in the `Split feeds` code node (channel name + channel ID), then re-export the JSON here.
- **Change schedule / timezone**: the two Schedule Trigger nodes (`triggerAtHour` 7, and 13+19); workflow timezone is set to `Europe/Kyiv` in settings.
- **Rollback**: deactivate v3, reactivate v2 (`n080pOslXURMbcRY`) — and note you're back to the silent-loss behavior.

## Knowledge-base capture (side-channel → repo)

A side-channel branch off `Build Digest` persists the morning's insight cards to the repo so the `podcast-insights` knowledge base can fold them (see `automations/podcast-knowledge/`). Strictly additive and isolated from delivery:

- `Build Digest` → **`Build KB JSON`** (Code) → **`PUT to GitHub`** (HTTP Request). The digest's own branches (`Email digest?`, `Build Telegram Digest`) are untouched.
- `Build KB JSON` reads `$('Resolve insights').all()` (the pristine per-video output — has `videoId` + `anchorQuote`, which `Build Digest` drops) and emits `{schema,runStamp,episodes:[…]}`; returns nothing on zero-episode mornings.
- `PUT to GitHub` `PUT`s it to `contents/context/knowledge/podcasts/_inbox/<runStamp>.json` on `main`. Path is keyed on the run stamp, so a re-run 422s harmlessly (no clobber).
- **Both nodes are `onError: continueRegularOutput`** — a GitHub/auth failure is swallowed, so the digest always sends; the curator's Gmail fallback (Path B) covers any skipped capture.
- Auth: n8n credential **`GitHub PAT (AO-Personal-OS)`** (`httpHeaderAuth`, id `7RNS9ta0huNTPTFz`), header `Authorization: Bearer <fine-grained PAT>`. **Until the PAT value is filled in, `PUT to GitHub` fails silently every morning (no alert, no digest impact).** Create the token (Contents:R/W, this repo only) and paste `Bearer github_pat_…` into that credential's value — see `automations/podcast-knowledge/README.md` § Setup.

## Dependencies (single points of failure, by design tolerated)

- RapidAPI `youtube-transcript3` (transcripts) — failure degrades to link-only entries, never drops videos.
- OpenAI `gpt-5-mini` (summaries) — failure degrades to link-only entries.
- Telegram bot (AO) — delivery failure leaves videos unsent; they resend next digest.
- Gmail OAuth — email failure is non-fatal (Telegram is primary).
- `api.rss2json.com` — fallback path only; if it dies, direct fetch still works (and vice versa).

## Files

- `workflow-v3.json` — export of the live workflow (name, nodes, connections, settings). Re-export after any change in the n8n UI:
  `security find-generic-password -s N8N_API_KEY -w` → `GET /api/v1/workflows/Qh5MoiJAkZRxtzhE` → keep `name,nodes,connections,settings`.
- `workflow-error-alerts.json` — export of the error-alerts workflow (`k2xuGa0yG0pQFVff`), same shape.
- **Redaction rule for both exports:** replace the group chat id with `REDACTED_GROUP_CHAT_ID` before committing (the id lives in Keychain as `TELEGRAM_GROUP_CHAT_ID` and in the live n8n nodes; never commit it — see `telegram-inbox/export.sh` for the same convention).
