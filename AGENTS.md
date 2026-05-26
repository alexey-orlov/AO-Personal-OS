# AO-Personal-OS — agent working notes

Personal "OS" for AI-assisted work: reusable skills, automations that run them, and the artefacts they produce. Versioned in Git, synced across devices.


## Message-writing skill preference

For any written-communication drafting, editing, reply, follow-up, or "de-AI-ify" request - across **email, LinkedIn DM, InMail, Slack, WhatsApp, or SMS** - always invoke the personal `message-writing` skill at `.Codex/skills/message-writing/` (in this repo).

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

**Context:** Kyiv-based in fact, but position myself as Boston-based for US audience; works in EN/UA/RU languages. Domain depth in enterprise B2B SaaS, product expansion, agentic AI.

## Location & remote
- Local: `~/Documents/GitHub/AO-Personal-OS` (macOS, case-insensitive filesystem)
- Remote: `github.com/<user>/AO-Personal-OS` 

## Structure (where things go)
- `.Codex/skills/<name>/SKILL.md` — reusable agent skills with frontmatter (`name`, `description`, `disable-model-invocation`, `user-invocable`). Discoverable as slash commands (`/<name>`) in Codex AND inlined by automations as plain prompt text.
- `automations/<name>/` — self-contained units: scripts + `config.sh` + `setup.sh` + `README.md`, plus a git-ignored `.work/` runtime dir.
- `outputs/<type>/` — produced artefacts. COMMITTED, so they sync across devices. `outputs/call-notes/` is foldered by meeting context (`softserve/`, `gigacloud/{product-issues-sukhenko,product-team-weekly,other}/`, `job-search/{intro-chats,vacancy-interviews/<company>}/`, `laba/`, `other/`); the `classify` skill assigns the folder and the call-pipeline routes the note there. `outputs/english-coaching/` stays flat.
- `context/` — durable reference material (people, companies, frameworks).
## Memory / persistent learnings

Do NOT maintain a top-level `memory/` folder. Distribute learnings to where they apply:
- **Skill-specific** rules, voice corrections, procedural changes → into that skill's folder (`.Codex/skills/<name>/SKILL.md` or a new file under `.Codex/skills/<name>/references/`).
- **Project-wide** facts and people → in `context/` (per the structure section above).
- **Cross-cutting agent rules** (file layout, hard rules, conventions) → in this `AGENTS.md`.

Never write to the global `~/.Codex/projects/<encoded-repo>/memory/` location — it's per-machine and not synced. If an automated process writes there, migrate the content into the right repo location and delete the global copy.

## Hard rules
- NEVER commit secrets. API keys live in macOS Keychain (e.g. `ASSEMBLYAI_API_KEY`) and are read at runtime.
- NEVER commit `.work/` — it holds venvs, audio copies, transcripts, and per-machine state, and may contain private call content.
- Only analysis outputs are committed; raw audio and transcripts stay local by design (privacy).
- Conventional-commit-style messages (`feat:`, `fix:`, `call-note:`).

## Conventions for generated content
Evidence-bound, specific, no filler or praise. Mark inferences as "(inferred)". Use "-" for empty sections.

## Adding things
- New skill → new folder `.Codex/skills/<name>/` with a `SKILL.md` that starts with the frontmatter block (`name`, `description`, `disable-model-invocation: false`, `user-invocable: true`) followed by the prompt body. Directory name MUST match the `name:` value. If it's a new call type for the call-pipeline, also add the label + definition to Axis 1 of `.Codex/skills/classify/SKILL.md`. To add a new meeting-context output folder, add it to Axis 2 of the same file — the pipeline creates folders on demand, so no script change is needed.
- New automation → new folder under `automations/` with its own `setup.sh`, `README.md`, and `.work/` for runtime/secret files.

## Active automations
- `automations/call-pipeline/` — Voice Memo → AssemblyAI → Codex → note. See its `AGENTS.md`.
