# 9 · Check and report

**Run the checker**
- Export the doc: `ArtifactData get accounts/<slug>` with an `out_dir` in the scratchpad.
- Run:
  `python3 .claude/skills/jumpstart-account/scripts/check_account.py --doc <out_dir>/accounts/<slug>.json --two-pager "<kit>/accounts/<slug>.json"`
- FAIL lines block delivery: fix them, then re-run.
- WARN lines need a decision. Fix the line, or say in the report why it stays.

**Deliver in stages, as each lands**
1. The tracker row (link the artifact) and the two or three findings that matter.
2. The two-pager (`SendUserFile`), with page 2 looked at.
3. The Teams note text, ready to paste.

**Final report**
- Lead with the answer: is it a fit, for which Jumpstart, and the strongest reason why now.
- A table, row by row, like the Horizon and Maximo reports: row · what was found or changed · now.
- Anything narrowed or dropped by the gate, in one line each.
- What only Alex can settle, as a short list. Example: "confirm the Unifier scope with Brian before citing it".
- Sources: the links behind every new fact.

**Then keep the homes in sync**
- Fold the account into the wiki through `context-update`, under the tracker contract.
- Update the registry's Folded version.
- Did a correction from Alex generalize? Write the rule to its home: `research-standards.md`, this skill's cards, or the message-writing playbook. Say in one line what you wrote and where.
