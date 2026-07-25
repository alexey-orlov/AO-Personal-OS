# note-map — `_ToDo` Apple Notes ↔ areas ↔ snapshots

Maintained by the `apple-notes-sync` skill (rows added/removed as notes appear in /
leave the `_ToDo` folder; Alex may correct an `area` by hand — the skill respects it).
Note names are VERBATIM (mind "Other  Todo"'s double space).

| Note (exact name) | Area | Snapshot | Routing hints |
|---|---|---|---|
| SS Todo | softserve | context/areas/softserve/apple-notes/ss-todo.md | SoftServe engagement; blocks: "Oracle" (Goal / Layers / Bosch case / What I want to get from it / Misc), "Strategic session", "Oracle todo", "Open questions (internally)", "Packages scoping", "JUMPSTART" ("Jumpstart program topics", "Artifacts"). **Checklist status changed:** the former native checklists ("Oracle todo", "Jumpstart todo") are gone as of 2026-07-25 — AX read matched `plaintext` 86/86 lines, no hidden items. It still carries one stray empty `<li>`, so `notes_set_body.sh` will refuse by default. Do NOT treat this as standing body-write permission: Alex can re-add checklists at any time, so re-run the AX-vs-plaintext check per SKILL.md step 5a every time before writing |
| JS todo | job-search | context/areas/job-search/apple-notes/js-todo.md | job search; blocks: Campaigns, Connection campaign, General efficiency (English, LinkedIn posting, Market researches, Outreach) |
| GC Todo | gigacloud | context/areas/gigacloud/apple-notes/gc-todo.md | GigaCloud CPO ops (RU); blocks: Новые стримы, Квартальные проекты, Текучка, Передача задач |
| AI Product expertise ToDo | personal-os | context/areas/personal-os/apple-notes/ai-product-expertise-todo.md | AI/agentic expertise + Personal OS build; blocks: Goals, Tools to build, LIN Posts — default home for AI insights and automation/build ideas |
| Visa todo | other | context/areas/other/apple-notes/visa-todo.md | US visa / relocation logistics (life-admin; relates to job-search relocation timing) |
| apelsin.net 157328 | softserve | context/areas/softserve/apple-notes/apelsin-net-157328.md | field-service workforce scheduling/optimization scoping (Bosch-relevant); no relevance marker — full-note snapshot |
| Other  Todo | other | context/areas/other/apple-notes/other-todo.md | catch-all when nothing else fits |
