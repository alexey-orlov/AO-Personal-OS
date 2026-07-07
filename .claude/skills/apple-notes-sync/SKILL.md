---
name: apple-notes-sync
description: File captured goals, tasks, and insights into Alex's pinned Apple Notes (the _ToDo folder) and refresh their repo snapshots. Two jobs — (1) consume queue cards from context/_inbox/apple-notes/ (written by the daily drop-zone fold for every goal/task/insight drop) by inserting each item into the best-matching note's best-matching bulleted block with a trailing 📥 marker; (2) snapshot every _ToDo note into context/areas/<area>/apple-notes/<slug>.md so agents can see Alex's live todo state. macOS-local only (AppleScript via automations/apple-notes-sync/ helpers) — never runs in cloud sandboxes. Use on /apple-notes-sync, "sync my apple notes", "process the apple-notes queue", "file this to my todo note", "add this to my notes", "refresh the notes snapshots", or headlessly from automations/apple-notes-sync/run.sh (launchd, every 30 min).
disable-model-invocation: false
user-invocable: true
---

# apple-notes-sync — queued captures → pinned Apple Notes (+ repo snapshots)

Alex's working todo lists live in Apple Notes, folder **`_ToDo`** (one pinned note per
work area). This skill is the ONLY thing that writes into them programmatically, and
the only bridge that makes them visible to agents (snapshots in the repo).

## Modes

1. **Sweep** (default): process every card in `context/_inbox/apple-notes/`, then refresh snapshots.
2. **Snapshot** ("snapshot mode" / queue empty): only refresh snapshots, no insertions.
3. **Direct** (interactive): Alex pastes/dictates an item ("add X to my notes") — classify kind (goal/task vs insight), insert it the same way, no queue card involved.

## Queue card format (written by `context-update` step 3b)

`context/_inbox/apple-notes/an-<stamp>-<msgid>[-<k>].md`:

```markdown
---
kind: goal | task | insight
area: <area slug, or none>
source: context/_inbox/processed/tg-<stamp>-<msgid>.md
date: YYYY-MM-DD
---
<item text VERBATIM — exactly what should appear in the note, no commentary>
```

## Procedure (sweep)

**0. Environment gate.** This skill needs macOS + the helper scripts. If `automations/apple-notes-sync/notes_list.sh` is unavailable or errors (cloud sandbox, TCC not granted), STOP: leave the queue untouched and report — cards are never lost, the local leg picks them up.

**1. Read the queue + the notes.**
- Queue cards: `context/_inbox/apple-notes/*.md` (skip `.gitkeep`).
- Notes: `automations/apple-notes-sync/notes_list.sh --full` → name + plaintext of every `_ToDo` note. Consult `references/note-map.md` (note ↔ area ↔ snapshot path).

**2. Pick the target NOTE for each card.** Decide by content; the card's `area:` tag and the note-map are strong hints (e.g. `area: job-search` → "JS todo"). One item → exactly one note. Genuinely no fit → "Other  Todo" (note the double space in its name).

**3. Pick the target BLOCK inside the note.** A block = a heading-ish line (usually bold) followed by a list — either a bulleted list or a NATIVE CHECKLIST (Alex's todo blocks). Match the item to the block whose heading/contents share its topic (e.g. a LinkedIn-post idea → "LIN Posts:", a build idea → "Tools to build:", a durable ambition → "Goals:", an Oracle action → "Oracle todo"). Insert at the END of that block's list.
- **CRITICAL — checklist blindness:** AppleScript cannot see native checklist content AT ALL (`body` shows empty `<li>`s, `plaintext` omits the item text; verified 2026-06-12). A note CONTAINING any checklist must be read via the AX/UI path (`notes_ax_read.sh`, or screenshots in a desktop session) and written ONLY via the UI insertion path — a body write would destroy the checklist. Detection: empty `<li><br></li>` runs in `body`, or lines visible on screen/AX that are missing from `plaintext`.
- **No matching block** → create a new block at the TOP of the note (immediately after the title div): `<div><b>📥 Inbox</b></div><ul><li>…</li></ul>` (+ a `<div><br></div>` spacer after). Goals/tasks and insights alike land there as bullets — Apple Notes strips checkbox markup on scripted writes, so native checklist items are impossible (see automation README).
- Insertions always go ABOVE the note's relevance marker (`## BELOW INFO IS NOT RELEVANT …`) — never into the private section below it.

**4. Compose the item.** `<li><item text verbatim> 📥</li>` — the `📥` suffix marks integration-arrived items; NEVER alter, translate, shorten, or annotate the item text itself.

**5. Write — insert-only, verify, archive.** Pick the path by note class:

**5a. Bullet-only notes (no checklist anywhere)** — background body rewrite:
- **Dedup**: if the note's plaintext already contains the item text (or a near-identical line), skip the insert; archive the card as `dup`.
- Get current HTML: `notes_body.sh "<note name>"`. Produce the new HTML by pure INSERTION — never reorder, rewrite, or delete existing markup. Write the new HTML to a temp file under `automations/apple-notes-sync/.work/`, then `notes_set_body.sh "<note name>" <file>` (it backs up the old body first, refuses notes with empty-`<li>` signatures, and prints the new plaintext).
- **Verify**: new plaintext == old plaintext + exactly the inserted line(s). On mismatch → restore the backup (`notes_set_body.sh "<note>" .work/backups/<stamp>-<slug>.html`), leave the card queued, report as `failed`.
- Batch: multiple items for one note go in ONE write.

**5b. Checklist-bearing notes** — UI insertion (real checkbox/bullet rows, needs unlocked screen):
- Headless / CLI: `notes_ax_insert.sh "<note>" "<anchor line text>" "<item> 📥"` — find-navigates to the anchor (last non-empty line of the target block), presses Return at its end (Notes continues the list: checkbox row in a checklist, bullet in a bullet list), pastes the item, self-verifies via AX read, undoes on mismatch. Requires Accessibility for osascript; exits 3 when the GUI isn't available → leave the card queued.
- Desktop session with computer-use tools: same maneuver visually — screenshot, click the end of the block's last item line (or an empty trailing checklist row — click it and just type), Return, type the item, screenshot-verify. ALWAYS take a fresh screenshot immediately before clicking (the note may scroll/change — Alex may be editing live) and verify after; ⌘Z stepwise if the text landed wrong.
- Dedup for these notes checks the AX/screen text, NOT `plaintext` (which is blind).

- Archive consumed cards → `context/_inbox/processed/`. **Headless:** `automations/apple-notes-sync/archive_card.sh <card.md> …` — this is the ONLY sanctioned headless delete (the Write/Edit tools can't remove a file and Bash is gated to these helpers, so copying a card without deleting the queue original leaves a permanent dup that re-forces a Notes-activating run every cycle). **Interactively:** `git mv`. A failed/ungated card stays in the queue.

**6. Snapshots (every run, all `_ToDo` notes).** Alex marks the agent-relevant part of each note: everything ABOVE the line `## BELOW INFO IS NOT RELEVANT FOR AGENT'S KNOWLEDGE BASE ##` (and the `————` separator right before it). Snapshot ONLY that part — the content below is private/operational and must never reach the repo. No marker → snapshot the whole note. Source text: `plaintext` for bullet-only notes; for checklist-bearing notes use `notes_ax_read.sh` (or the screen) so checklist items are included — prefix them `☐ `/`☑ ` when the state is visible; if the GUI is unavailable, keep the previous snapshot rather than writing a blind one. For each note, write `context/areas/<area>/apple-notes/<slug>.md` (area + slug from the note-map; new/renamed notes: classify into an area yourself, add the map row):

```markdown
---
note: <exact note name>
area: <slug>
snapshot: YYYY-MM-DD HH:MM
chars: <full length>
---
<full plaintext; if > 12000 chars, truncate and end with "… [truncated]">
```

Snapshots are a READ-ONLY mirror for agent visibility — never edit them by hand, never treat them as the editable source (the note is the source of truth). Stale snapshot files for notes no longer in `_ToDo` are deleted (the map row goes too).

**7. Mode rules.**
- **Headless** (run.sh): no git, no Telegram — the wrapper commits/pushes. Bash only for `automations/apple-notes-sync/` helpers.
- **Interactive**: commit deliberately — `git add context/ && git commit -m "notes-sync: <what changed>"` (git-autosync would scoop it otherwise). No Telegram notifications either way: the 📥 marker in the note IS the surfacing.

## Hard rules

- Body writes ONLY via `notes_set_body.sh`, ONLY to notes in `_ToDo`, ONLY when the note is verified checklist-free. Never `set body` by raw osascript, never touch other folders.
- NEVER body-write a note that contains (or might contain) a native checklist — AppleScript is blind to checklist content and the write destroys it. When in doubt, use the UI path or leave the card queued.
- Insert-only edits: existing note content is Alex's — byte-for-byte untouched.
- Item text verbatim + ` 📥` suffix; nothing else added or removed.
- A failed/refused card stays in the queue (it must survive to the next run); only verified-inserted or dup cards are archived.
- Every UI insertion is verified (AX read or screenshot) and undone (⌘Z) on mismatch before anything is archived.

## Run summary (always output)

`queue N → inserted I (notes: …) · dup D · failed F (left queued) — snapshots refreshed: S — map changes: …`
One line per inserted item (note + block) in interactive mode so Alex can correct routing.
