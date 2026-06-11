# podcast-streaming — daily YouTube podcast digest (n8n)

Cloud automation (runs in n8n cloud, not on this machine): watches 7 YouTube channels, transcribes new videos (RapidAPI youtube-transcript3), summarizes them (gpt-5-mini), and delivers a daily digest to Telegram + Gmail at 07:00 Kyiv.

This folder holds the exported workflow JSON (disaster-recovery copy + reviewable diff history) and this doc. The live system is in n8n: <https://alexorlovco.app.n8n.cloud>

## Workflows in n8n

| Workflow | ID | State |
|---|---|---|
| Podcast streaming v3 (resilient) | `Qh5MoiJAkZRxtzhE` | **active** (the live one) |
| Podcast streaming — error alerts | `k2xuGa0yG0pQFVff` | active (Telegram alert + bounded auto-retry) |
| Podcast streaming v2 (HTTP fetch) | `n080pOslXURMbcRY` | deactivated 2026-06-11, kept as rollback |
| Podcast streaming (v1) | `OK7wK3MTUlSfoLeN` | inactive, historical |

## Why v3 exists (incident 2026-06-09..11)

YouTube throttles n8n cloud's shared egress IP for `youtube.com/feeds/videos.xml`. On Jun 9 and Jun 10 six of seven feeds silently failed (only "How I AI" got through); on Jun 11 all seven failed and the run errored. v2 only alerted when **all** feeds failed, used a fixed 24h window, and had a dedup map that was read but never written — so any video missed once was lost forever. Videos without a ready transcript were silently dropped too ("Transcript empty?" false branch led nowhere).

## v3 design — reliability via redundancy + a persistent ledger

- **Dual-path fetch.** Every feed is fetched twice in parallel: direct XML and via `api.rss2json.com` (their servers fetch YouTube from a different IP pool). Results are merged and deduped per videoId; a feed counts as healthy if either path succeeded.
- **Persistent ledger** in `workflowStaticData`: every discovered video gets `status: discovered`; only after its Telegram message actually delivers does it become `sent`. Entries pruned after 14 days.
- **Discovery 3×/day** (07:00 digest run + 13:00 + 19:00 discovery-only runs, Europe/Kyiv), 72h lookback. A video is permanently missed only if every fetch on both paths fails for 3 days straight.
- **Digest at 07:00** sends everything still unsent (oldest first, max 15/run). A failed morning self-heals: videos simply ride along in the next digest.
- **No-transcript videos** are retried at each digest for 36h, then delivered link-only. Nothing is silently dropped.
- **Per-feed health**: channels with no successful fetch on either path for 36h+ get a ⚠️ line appended to the digest. No separate alert spam; the daily digest message itself is the heartbeat (it arrives even when there are no new episodes).
- **Failure handling**: feed/transcript/model/send nodes all `continueRegularOutput` + retries, so one bad item can't kill the run. A genuine crash fires the error-alerts workflow → Telegram alert; if it's the 07:00 digest run, it auto-retriggers the webhook after 30 min (bounded: the retry condition is `hour == 7`, so at most ~2 retries).

## Ops

- **Manual full run** (discovery + digest, idempotent thanks to the ledger):
  `curl "https://alexorlovco.app.n8n.cloud/webhook/podcast-stream-v3-run"`
- **Ops parameters**: `?lookbackHours=96` (1–240, default 72) widens the discovery window; `&markSent=<id1>,<id2>` seeds videoIds as already-sent (used for the 2026-06-11 backfill to avoid re-sending the two episodes v2 did deliver).
- **Add/remove a channel**: edit the `FEEDS` array in the `Split feeds` code node (channel name + channel ID). Then re-export the JSON here.
- **Canvas "Execute workflow" caveat**: manual executions don't persist `workflowStaticData` in n8n, so sent-marks from a canvas test run are discarded (the next scheduled run would re-send). For real runs use the webhook above — production executions persist the ledger.
- **Rollback**: deactivate v3, reactivate v2 (`n080pOslXURMbcRY`) — and note you're back to the silent-loss behavior.

## Dependencies (single points of failure, by design tolerated)

- RapidAPI `youtube-transcript3` (transcripts) — failure degrades to link-only entries, never drops videos.
- OpenAI `gpt-5-mini` (summaries) — failure degrades to link-only entries.
- Telegram bot (AO) — delivery failure leaves videos unsent; they resend next digest.
- Gmail OAuth — email failure is non-fatal (Telegram is primary).
- `api.rss2json.com` — fallback path only; if it dies, direct fetch still works (and vice versa).

## Files

- `workflow-v3.json` — export of the live workflow (name, nodes, connections, settings). Re-export after any change in the n8n UI:
  `security find-generic-password -s N8N_API_KEY -w` → `GET /api/v1/workflows/Qh5MoiJAkZRxtzhE` → keep `name,nodes,connections,settings`.
