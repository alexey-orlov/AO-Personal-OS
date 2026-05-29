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

**Context:** Kyiv-based in fact, but position myself as San Francisco-based for US audience (open to relocate across the US; never mention Ukraine externally); works in EN/UA/RU languages. Domain depth in enterprise B2B SaaS, product expansion, agentic AI. Full job-search positioning (public vs. backend framing, recruiter story, target roles) lives in `context/job-search.md` — pull from there.

## Location & remote
- Local: `~/Documents/GitHub/AO-Personal-OS` (macOS, case-insensitive filesystem)
- Remote: `github.com/<user>/AO-Personal-OS` 

## Structure (where things go)
- `.claude/skills/<name>/SKILL.md` — reusable agent skills with frontmatter (`name`, `description`, `disable-model-invocation`, `user-invocable`). Discoverable as slash commands (`/<name>`) in Claude Code AND inlined by automations as plain prompt text.
- `automations/<name>/` — two kinds of subdirs live here:
  - **Workflow automations** (e.g. `call-pipeline/`, `inbox-sweep/`): self-contained units with scripts + `config.sh` + `setup.sh` + `README.md` + a git-ignored `.work/` runtime dir.
  - **Shared libraries by domain** (e.g. `telegram/`, `crm-spreadsheet/`, `chrome-mcp/`, `gmail/`): cross-skill resources. Hold bash/Python helpers AND/OR markdown procedure docs that multiple skills cite. Skills cite procedure docs with a one-line "Follow the procedure in `automations/<domain>/<file>.md`" reference at the relevant step — the canonical algorithm + constants live only there. Use this when ≥2 skills share a procedure/constant and divergence would be a real risk (e.g. Gmail search filters, Chrome MCP preflight, the `r-…` URL gotcha). Wait for the third caller before extracting — premature DRY hurts skill readability.
- `outputs/<type>/` — produced artefacts. COMMITTED, so they sync across devices. `outputs/call-notes/` is foldered by meeting context (`softserve/`, `gigacloud/{product-issues-sukhenko,product-team-weekly,other}/`, `job-search/{intro-chats,vacancy-interviews/<company>}/`, `laba/`, `other/`); the `classify` skill assigns the folder and the call-pipeline routes the note there. `outputs/english-coaching/` stays flat.
- `context/` — durable reference material (people, companies, frameworks).
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
- NEVER commit `.work/` — it holds venvs, audio copies, transcripts, and per-machine state, and may contain private call content.
- Only analysis outputs are committed; raw audio and transcripts stay local by design (privacy).
- Conventional-commit-style messages (`feat:`, `fix:`, `call-note:`).

## Conventions for generated content
Evidence-bound, specific, no filler or praise. Mark inferences as "(inferred)". Use "-" for empty sections.

## Adding things
- New skill → new folder `.claude/skills/<name>/` with a `SKILL.md` that starts with the frontmatter block (`name`, `description`, `disable-model-invocation: false`, `user-invocable: true`) followed by the prompt body. Directory name MUST match the `name:` value. If it's a new call type for the call-pipeline, also add the label + definition to Axis 1 of `.claude/skills/classify/SKILL.md`. To add a new meeting-context output folder, add it to Axis 2 of the same file — the pipeline creates folders on demand, so no script change is needed.
- New automation → new folder under `automations/` with its own `setup.sh`, `README.md`, and `.work/` for runtime/secret files.

## Active automations
- `automations/call-pipeline/` — Voice Memo → AssemblyAI → Claude → note. See its `CLAUDE.md`.
- `automations/book-finder/` — shared config + helpers (Google Books search, epub/fb2 downloader) for the `book-finder` skill. Downloads land in iCloud Drive/Books (outside the repo). See its `README.md`.
