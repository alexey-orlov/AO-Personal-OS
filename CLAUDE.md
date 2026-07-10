# AO-Personal-OS — agent working notes

Personal "OS" for AI-assisted work: reusable skills, automations that run them, and the artefacts they produce. Versioned in Git, synced across devices.


## Message-writing skill preference

For any written-communication drafting, editing, reply, follow-up, or "de-AI-ify" request - across **email, LinkedIn DM, InMail, Slack, WhatsApp, or SMS** - always invoke the personal `message-writing` skill at `.claude/skills/message-writing/` (in this repo).

The personal skill is calibrated to Alex's real sent mail and LinkedIn messages: voice, banned phrases, register matrix, message playbooks, LinkedIn-specific norms, RU/UA register, standing signature block, and his actual links and about-me blurbs. The bundled Anthropic `anthropic-skills:email-writing` is generic and will produce off-voice drafts.

**Trigger phrasings to map to `message-writing`** (not exhaustive): "write an email", "draft an email", "reply to this email/thread", "follow up on this", "fix this email", "make this less AI", "respond to this", "write back", "reach out to X", "draft a LinkedIn message", "write a LinkedIn DM", "reply to this DM", "follow up on LinkedIn", "send him a check-in on LinkedIn", "send a quick Slack to ...", "WhatsApp ...", "draft an intro / reference / decline / scheduling note", "tighten this draft", any paste-a-thread-and-respond ask.

**Hard rules:**
- Always call the Skill tool with `skill: "message-writing"` (unqualified). This resolves to the personal skill.
- **Never** invoke `anthropic-skills:email-writing` or any other bundled / namespaced `email-writing` variant, regardless of how the request is phrased. The personal `message-writing` skill is the authoritative tool for **all** message-drafting requests, including those phrased as "write an email."
- If the bundled `anthropic-skills:email-writing` ever auto-fires, stop immediately and re-invoke the personal `message-writing` skill. Do not blend the two.
- The skill's reference files (`references/linkedin.md`, `references/profile.md`, etc.) contain Alex's standing assets (Calendly, CV URL, email, LinkedIn URL, portfolio) and his about-me blurbs. Pull from there; never ask the user for these and never invent them.


## About me

My name is Alex Orlov (Alexey Orlov, Oleksii Orlov).
Product leader, B2B SaaS. 
Currently job-searching for product leadership roles (VP Product / CPO) at US companies.

**Roles**

- CPO — GigaCloud (cloud infrastructure) (current)

- Product advisor / Distinguished R&D advisor — SoftServe (current)

- PM course tutor — Laba (current)

- CPO, Innovations — Jooble (former)

- VP of Product — Creatio (former)

**Context:** Kyiv-based in fact, but position myself as San Francisco-based for US audience (open to relocate across the US; never mention Ukraine externally); works in EN/UA/RU languages. Domain depth in enterprise B2B SaaS, product expansion, agentic AI. Full job-search positioning (public vs. backend framing, recruiter story, target roles) lives in `context/areas/job-search/positioning.md` — pull from there.

## Location & remote
- Local: `~/Documents/GitHub/AO-Personal-OS` (macOS, case-insensitive filesystem)
- Remote: `github.com/<user>/AO-Personal-OS` 
- **Document rendering on this Mac (`KN7X2Y65NX`):** LibreOffice / `soffice` is blocked by Gatekeeper (unsigned → SIGKILLed, exit 137), so the `anthropic-skills:docx`/`pptx`/`pdf` helpers can't use it for PDF conversion or previews here — don't retry it. To verify a generated doc visually, build a geometry-faithful HTML twin and render it with **headless Google Chrome** (`--headless --print-to-pdf`, then `pdftoppm`); this doubles as a reliable one-page-fit check. MS Word is installed for true docx→PDF (AppleScript export) but may hang on first-launch dialogs. Default: deliver the editable file and let Alex export the PDF himself.

## Structure (where things go)
- `.claude/skills/<name>/SKILL.md` — reusable agent skills with frontmatter (`name`, `description`, `disable-model-invocation`, `user-invocable`). Discoverable as slash commands (`/<name>`) in Claude Code AND inlined by automations as plain prompt text.
- `automations/<name>/` — two kinds of subdirs live here:
  - **Workflow automations** (e.g. `call-pipeline/`, `inbox-sweep/`): self-contained units with scripts + `config.sh` + `setup.sh` + `README.md` + a git-ignored `.work/` runtime dir.
  - **Shared libraries by domain** (e.g. `telegram/`, `crm-spreadsheet/`, `chrome-mcp/`, `gmail/`): cross-skill resources. Hold bash/Python helpers AND/OR markdown procedure docs that multiple skills cite. Skills cite procedure docs with a one-line "Follow the procedure in `automations/<domain>/<file>.md`" reference at the relevant step — the canonical algorithm + constants live only there. Use this when ≥2 skills share a procedure/constant and divergence would be a real risk (e.g. Gmail search filters, Chrome MCP preflight, the `r-…` URL gotcha). Wait for the third caller before extracting — premature DRY hurts skill readability.
- `outputs/<type>/` — produced artefact streams that are NOT project context. COMMITTED. Currently: `outputs/english-coaching/` (flat; correlates to call notes by `${stamp}_${type}_${src_id}` filename) and `outputs/inbox-sweep/` (run log). Call notes do NOT live here — they are context (see below).
- `context/` — the knowledge tree, organized by AREA. `index.md` (map + "Now" snapshot). `areas/<area>/` per area — `README.md` (live-state wiki page), optional `<subproject>.md` pages, `calls/[<sub-context>/]` (pipeline-routed call notes; taxonomy owned by Axis 2 of `.claude/skills/classify/SKILL.md`), `docs/` (manually added source materials Alex chose to commit). Areas: `softserve`, `gigacloud`, `job-search`, `laba`, `personal-os`, `other` (classifier catch-all). Cross-area: `people/` (person pages), `_meta/processed.txt` (ingestion ledger), `_meta/external-sources.md` (registry of where each area's out-of-repo source files live — local path / GDrive / OneDrive; consult it for an area's raw materials, and add a row when Alex says an area's files live somewhere), `_inbox/` (cloud Drop Zone staging — committed; folded daily by the cloud routine, processed drops archived in `_inbox/processed/`; `_inbox/outbox/` holds queued Telegram notifications for n8n to flush; `_inbox/apple-notes/` holds queued goal/task/insight cards for the local `apple-notes-sync` leg).
- `context/knowledge/` — the SECOND BRAIN remainder: `book-shortlist.md` (📚), `explore/` (🔭 queue + research briefs), `podcasts/` (automated, owned by `/podcast-insights`). Goals, tasks, and insights do NOT live in the repo (retired 2026-06-12): they flow to Alex's pinned Apple Notes (`_ToDo` folder) via queue cards in `context/_inbox/apple-notes/` (written by `context-update`, consumed by the `apple-notes-sync` skill's launchd leg on this Mac — inserted as bullets with a `📥` suffix, silent, no Telegram). Read-only note snapshots for agent visibility: `context/areas/<area>/apple-notes/<slug>.md` (map: `.claude/skills/apple-notes-sync/references/note-map.md`). Map + rules: `context/knowledge/README.md`. Everything here except `podcasts/` is written ONLY by `context-update` and its helper skills (`book-shortlist`, `book-finder`, `explore-brief`).
- There is NO local drop zone — the root `inbox/` dir was retired 2026-06-12. The only capture path is Telegram 📥 Drop Zone → n8n → `context/_inbox/`. Material that must never reach GitHub is pasted into a session ("fold this into context"), never dropped as a file.

## Context wiki (live project state)

`context/index.md` + `context/areas/<area>/README.md` form a curated wiki of what Alex is working on **right now**, distilled from the artifact stream with provenance links back to source notes — which live next to the page in `areas/<area>/calls/` and `docs/`.

- **Read rule:** for any task touching Alex's work (drafting, prep, advice, status questions), read `context/index.md` first, then the relevant area README (and subproject page, if any). Don't ask Alex for context the wiki holds, and don't re-derive it from raw notes. When you need an area's **raw source files** (decks, spreadsheets, PDFs, recordings), consult `context/_meta/external-sources.md` for that area's source root and read from there FIRST — do not fan out to Google Drive / OneDrive search as a default (e.g. SoftServe/Oracle materials live locally at `~/Documents/Documents/SoftServe`, not in any cloud drive). Only reach for a cloud-MCP search when the registry has no entry for the area or its entry is itself a cloud root. **When a task turns on the exact membership or spelling of a roster** — a pipeline / client list, people, an inventory — verify it against the source-of-truth files even if the wiki appears to already hold it. Distilled pages are built from voice-memo transcripts and can carry name-level errors (e.g. a mis-heard client name surfacing as a phantom "extra" account) and lag the real list; the source root is authoritative for who/what is actually in scope.
- **Write rule:** wiki updates flow through the `context-update` skill only — sweep (`/context-update`), single artifact (a path), or pasted content. When Alex shares a meeting outcome, document, or draft notes in a session, fold it in via the skill after the main task. Pages are rewritten to current truth — never stack "UPDATE:" lines.
- The call-pipeline auto-runs it after every new call note (`context:` commits), so calls reach the wiki with no manual step. Telegram 📥 Drop Zone posts are captured to `context/_inbox/` by n8n within seconds and folded by the "Daily drop-zone & context fold" cloud routine (~08:33 Kyiv, laptop-independent) — drops route by TYPE (step 3b of the skill): goal/task/insight → queue cards in `context/_inbox/apple-notes/` → pinned Apple Notes via the local `apple-notes-sync` leg (silent, no Telegram); book → 📚 notification via book-finder; explore → 🔭 brief via explore-brief (those two send directly, or queue in `context/_inbox/outbox/` for the n8n "Outbox flush (cloud)" workflow when the run has no Telegram credentials). Cloud routines can't push to `main` — their `main-*` branches are auto-merged by `.github/workflows/auto-merge-routine.yml`.
- Areas are big and may grow subprojects: a thread with its own goal/cadence gets `areas/<area>/<sub-slug>.md` (and, if its calls recur, its own Axis-2 sub-context in `classify`). The `context-update` skill owns when to split.
- Durable reference docs (e.g. `areas/job-search/positioning.md`) keep living next to their area's README; pages link to them instead of duplicating.

## Memory / persistent learnings

Do NOT maintain a top-level `memory/` folder. Distribute learnings to where they apply:
- **Skill-specific** rules, voice corrections, procedural changes → into that skill's folder (`.claude/skills/<name>/SKILL.md` or a new file under `.claude/skills/<name>/references/`).
- **Project-wide** facts and people → in `context/` (per the structure section above).
- **Cross-cutting agent rules** (file layout, hard rules, conventions) → in this `CLAUDE.md`.

Never write to the global `~/.claude/projects/<encoded-repo>/memory/` location — it's per-machine and not synced. If an automated process writes there, migrate the content into the right repo location and delete the global copy.

## Learning from feedback (self-correction loop)

Whenever Alex pushes back on, corrects, or rejects something I produced (a draft, an edit, an approach, a suggestion) — treat it as a durable signal, not a one-off fix. Run this loop every time, not only when asked:

1. **Find the root, not the phrase.** Generalize the correction to the underlying principle or failure mode. "Don't say 'thanks for the whole process'" is the symptom; "vague gestural gratitude reads as hollow — name the specific thing" is the root. Fix the class of mistake, not the single instance.
2. **Apply it to the work in hand** first.
3. **Decide if it's worth persisting.** Persist if it's a generalizable rule likely to recur. Skip if it's specific to this one message, already covered by an existing rule, or pure ephemeral preference.
4. **Write it to the right home** (same routing as Memory above): skill-specific voice/style/procedure → that skill's `SKILL.md` or `references/`; project facts/people → `context/`; cross-cutting agent rules → this file. Phrase the rule generally (cover the class), and add it to a self-check list where the skill has one — so it's actually consulted, not just filed.
5. **Don't duplicate.** Check for an existing rule to sharpen before adding a new one.
6. **Close the loop out loud.** In my reply, state in one line what I generalized and where I wrote it, so Alex can correct the generalization itself if I over- or under-reached.

The bar is the root cause: if I only patch the exact phrase Alex flagged, I'll reproduce the same mistake in a new disguise next time.

## Hard rules
- NEVER commit secrets. API keys live in macOS Keychain (e.g. `ASSEMBLYAI_API_KEY`) and are read at runtime.
- NEVER commit a live trigger URL (webhook endpoint, n8n `/webhook/...` path, Zapier/Make hook, etc.) for any side-effectful or paid automation — not in docs, not in exported workflow JSON. git-autosync pushes within ~30s and GitHub-commit-scraping bots probe new URLs within the hour; an unauthenticated trigger then gets fired by strangers (this happened 2026-06-11 with the podcast webhook). If a programmatic trigger is genuinely needed, require auth (Header-Auth credential) AND keep the URL out of the repo; otherwise prefer schedule/manual triggers.
- NEVER commit `.work/` — it holds venvs, audio copies, transcripts, and per-machine state, and may contain private call content.
- Keep `telegram@claude-plugins-official` DISABLED and run the chat bridge on the gated fork `telegram@ao-personal-os` (`automations/telegram-chat/plugin/`, polls only when `TELEGRAM_CHANNEL_POLL=1`, set solely by the bridge's `run.sh` — every other session is tools-only). Reason: Telegram allows ONE getUpdates consumer per bot; the un-gated upstream plugin's server steals that slot from the bridge and silently eats Alex's messages (2026-06-12 incident; [claude-code#39808](https://github.com/anthropics/claude-code/issues/39808)). This is the default, NOT permanent: re-enabling the official plugin is allowed once it stops polling the bot in non-bridge sessions — but only after the rollback test in `automations/telegram-chat/README.md` ("Single-poller invariant") passes. Don't flip it on a hunch (the failure is silent); read that section before touching any of this.
- Only analysis outputs are committed; raw audio and pipeline transcripts stay local in `.work/` by design (privacy). The only committed transcripts are ones Alex explicitly places in `context/areas/<area>/docs/`.
- Conventional-commit-style messages (`feat:`, `fix:`, `call-note:`).

## Conventions for generated content
Evidence-bound, specific, no filler or praise. Mark inferences as "(inferred)". Use "-" for empty sections. When filling into an existing table/template that already has an exemplar row/cell, match that exemplar's altitude, length, and phrasing — the existing cells are the spec, not the source docs. Distill to the reference's register; don't dump every detail you found.

For any research, analysis, or comparative output (explore briefs, company/topic research, vacancy analysis, decision memos) follow `.claude/references/research-standards.md` — Alex's standing rules for labeled claims, source tiers, named specifics, explicit gaps, and lead-with-the-answer structure.

Client-facing offers/proposals (2026-07-07): write in third person ("the instructor" — never I/we/my); keep Alex's internal strategic framings out of the document (e.g. "part-advisory" is an internal read, not client language); don't echo the client's brief back verbatim — restate it in own words and add Alex's educated read of their underlying challenge (moderate inference, no invented specifics). De-AI the typography and vocabulary: no em-dashes (use ":" or "-" instead), no "↔"-style glyphs (write "<>"), no cutesy workshop names ("clinic"), say "customers" not "users" in B2B docs. Never include internal reference pricing/benchmarks (e.g. what another client paid) in a client document. Don't describe capabilities at a promise-making summary level that only one session actually delivers (e.g. counting "demos" in format totals when there's one demo inside one module).

Slide decks (2026-07-10, from Alex's design feedback on the Oracle partnership deck): (1) Size containers to content — a box more than ~half empty means the type is too small or the box too big; prefer large editorial statements over small text floating in big cards. (2) Same-level elements get identical size and geometry — never mix wide and narrow cells for peers; if one cell holds several items, keep the outer cell equal and vary the inside. (3) Show absence as an empty instance of the same container (e.g. a "not filled in yet" panel next to a filled one), never as missing/shrunken structure or a bare gap. (4) No free-floating side text — annotations/principles live inside a structured panel or card. (5) Color semantics follow the source outline's own coding mapped to brand hues: two stages of the same dimension = lighter vs fuller tint of ONE hue (e.g. ramp-up = light orange, strategic = orange), reserving a contrasting hue for a different dimension (e.g. blue = pipeline/content emphasis). (6) Large all-grey compositions read weak — give repeated panels a light brand tint or frames.

## Adding things
- New skill → new folder `.claude/skills/<name>/` with a `SKILL.md` that starts with the frontmatter block (`name`, `description`, `disable-model-invocation: false`, `user-invocable: true`) followed by the prompt body. Directory name MUST match the `name:` value. If it's a new call type for the call-pipeline, also add the label + definition to Axis 1 of `.claude/skills/classify/SKILL.md`. To add a new call-note context (a new area, or a sub-context under one — lands at `context/areas/<area>/calls/<sub>`), add it to Axis 2 of the same file — the pipeline creates folders on demand, so no script change is needed. A new area should also get its `context/areas/<area>/README.md` page (the `context-update` skill creates it on first fold otherwise).
- New automation → new folder under `automations/` with its own `setup.sh`, `README.md`, and `.work/` for runtime/secret files.

## Active automations
- `automations/call-pipeline/` — Voice Memo → AssemblyAI → Claude → note, then auto-folds the note into the context wiki. See its `CLAUDE.md`.
- `automations/git-autosync/` — launchd agent that auto-commits + pushes any local repo change (and pulls periodically), so devices stay in sync. See its `README.md`. Implication for agents: uncommitted changes get swept into an `autosync:` commit within ~30s — if a semantic commit message matters, commit immediately after editing; otherwise just leave changes and let autosync take them.
- `automations/book-finder/` — shared config + helpers (Google Books search, epub/fb2 downloader) for the `book-finder` skill. Downloads land in iCloud Drive/Books (outside the repo). See its `README.md`.
- `automations/podcast-streaming/` — daily YouTube podcast digest. Runs in n8n cloud (workflow "Podcast streaming v3 (resilient)"), not on this machine; the folder holds the exported workflow JSON + ops doc. Edit via the n8n MCP, then re-export the JSON. See its `README.md`. A side-channel branch also commits each morning's insight cards to `context/knowledge/podcasts/_inbox/` (feeds the podcast knowledge base, below).
- `automations/podcast-knowledge/` — turns the podcast digest into a self-updating, clustered insight base at `context/knowledge/podcasts/` via the `/podcast-insights` skill. A daily claude.ai cloud routine (~08:03 Kyiv, laptop-independent) folds new cards into themes; `run.sh` is the local fallback. See its `README.md`.
- `automations/telegram-chat/` — interactive Telegram ↔ Claude Code chat bridge via this repo's gated fork of the official Channels plugin (`telegram@ao-personal-os`; the upstream plugin stays disabled — see the single-poller hard rule above), bot `@ao_personal_os_conversation_bot` (dedicated DM bot — the main bot's update stream is taken by the Drop Zone webhook; single-consumer rule). The bot 👀-reacts to each message on receipt; no 👀 = not delivered yet. launchd + tmux keep an always-fresh session alive in this repo; the bot only works while this Mac is awake. **Rule for channel sessions:** when a message arriving via the Telegram channel says `/new` or "new session", first send a short confirmation reply through the channel, THEN run `automations/telegram-chat/new_session.sh` — it kills the current session so the wrapper starts a fresh one (the script never returns; don't await it). See its `README.md`.
- `automations/telegram-inbox/` — 📥 Drop Zone capture, cloud-first: the n8n workflow "Drop Zone capture (cloud)" commits anything Alex posts in the Drop Zone topic to `context/_inbox/` within seconds (text → `.md` card, media downloaded alongside); the claude.ai cloud routine "Daily drop-zone & context fold" (~08:33 Kyiv) folds drops into the wiki by Second-Brain type — no laptop involved. The old local launchd watcher is decommissioned but kept as documented fallback (Telegram allows webhook XOR getUpdates — they can't run together). See its `README.md`.
- `automations/outbox-flush/` — n8n workflow "Outbox flush (cloud)" (daily ~08:50 Kyiv): sends queued Telegram notifications from `context/_inbox/outbox/` (written by credential-less cloud fold runs — book/explore notifications) and deletes the cards. Formerly "Second-brain delivery (cloud)"; the goals-posting + 👍-reaction halves were removed 2026-06-12 with the goals-tasks retirement. See its `README.md`.
- `automations/apple-notes-sync/` — launchd agent (daily at 08:00, this Mac): files queued goal/task/insight cards from `context/_inbox/apple-notes/` into Alex's pinned Apple Notes (`_ToDo` folder; bullets with `📥` suffix, insert-only, backed up before every write) and refreshes the read-only note snapshots under `context/areas/<area>/apple-notes/`. Runs only when the queue has cards or snapshots are stale — otherwise it exits without opening Notes. Cards that can't be filed headlessly (checklist notes needing an Accessibility grant for `osascript`) are parked in `context/_inbox/apple-notes/_blocked/` so they don't force a Notes-activating run every cycle. Engine = the `apple-notes-sync` skill; Apple Notes is Mac-only, hence local. See its `README.md`.
- `automations/calendar-sync/` — two-way busy sync between **SoftServe** (Apple Calendar/EventKit) and **Google**. Forward: mirrors SS meetings into Google as `SS:` copies (real Busy/Free status + organizer/participants). Reverse: blocks SS time wherever Alex is busy in any Google calendar (GigaCloud/Family/personal) with content-free "Busy" placeholders **visible to SS colleagues** — both legs break feedback loops (`SS:`/`ssSync` and `[[gcal-busy]]` markers). Pure-code launchd daemon (hourly, Mon–Fri 08:00–20:00 EET, via Terminal for EventKit TCC); no browser, no Claude session. Writes to a live work calendar — read its `README.md` before touching.

## Telegram notifications — topic routing
**Interaction style rule (Alex's standing preference, 2026-06-12):** for anything Alex tracks or acts on in Telegram, prefer ONE MESSAGE PER ITEM with his native reactions (👍 = done/ack) over aggregate messages with custom inline-button UI. Buttons are fine for opening links; not for state changes.

All agent→Alex Telegram messages go to the "AO Personal OS" forum group; topics are the "folders". When sending via `automations/telegram/telegram_send*.sh`, ALWAYS set `TG_TOPIC=<slug>` to the topic that matches the content: `english-coaching`, `inbox-drafts` (inbox sweeps + message drafts), `daily-digest`, `books`, `explore` (🔭 research briefs), or leave unset for General (uncategorized). Slug → thread-id map: `automations/telegram/topics.env`; full table in `automations/telegram/README.md`. The `dropzone` topic is inbound-only (Alex → agent; consumed by `telegram-inbox`) — never send notifications there. The `goals-tasks` and `insights` topics were deleted 2026-06-12 — goal/task/insight captures surface as 📥 items in Alex's pinned Apple Notes instead (via `apple-notes-sync`). New recurring notification stream → create a new topic via `automations/telegram/setup_group.sh` (add it to `TOPIC_DEFS`) rather than dumping into General.
