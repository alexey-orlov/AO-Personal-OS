# AO-Personal-OS — agent working notes

Personal "OS" for AI-assisted work: reusable skills, automations that run them, and the artefacts they produce. Versioned in Git, synced across devices.


## Email skill preference

For any email or message drafting, editing, or "de-AI-ify" request, always invoke the personal `email-writing` skill at `.claude/skills/email-writing/` (in this repo). Never invoke `anthropic-skills:email-writing` (the bundled Anthropic version), even if it appears in the skills list.

The personal skill is calibrated to the user's real sent mail (voice, banned phrases, register matrix, message playbooks, RU/UA register, his standing signature block). The bundled Anthropic version is generic and will produce off-voice drafts.

When a request triggers an email-writing skill (drafting outreach, replies, follow-ups, intros, scheduling, declines, bad news, negotiations, edits, "make this less AI"), call the Skill tool with `skill: "email-writing"` (the unqualified name, which resolves to this project's personal skill). If the bundled one ever auto-fires instead, stop and re-invoke the personal one. Do not blend the two.


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
- `.claude/skills/<name>/SKILL.md` — reusable agent skills with frontmatter (`name`, `description`, `disable-model-invocation`, `user-invocable`). Discoverable as slash commands (`/<name>`) in Claude Code AND inlined by automations as plain prompt text.
- `automations/<name>/` — self-contained units: scripts + `config.sh` + `setup.sh` + `README.md`, plus a git-ignored `.work/` runtime dir.
- `outputs/<type>/` — produced artefacts. COMMITTED, so they sync across devices. `outputs/call-notes/` is foldered by meeting context (`softserve/`, `gigacloud/{product-issues-sukhenko,product-team-weekly,other}/`, `job-search/{intro-chats,vacancy-interviews/<company>}/`, `laba/`, `other/`); the `classify` skill assigns the folder and the call-pipeline routes the note there. `outputs/english-coaching/` stays flat.
- `context/` — durable reference material (people, companies, frameworks).

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
