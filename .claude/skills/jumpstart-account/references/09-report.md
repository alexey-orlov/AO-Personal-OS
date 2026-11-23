# 9 · Check and report

**Run the checks**
1. `ArtifactData get accounts/<slug>` with an `out_dir`.
2. Run:
   `python3 .claude/skills/jumpstart-account/scripts/check_account.py --doc <out_dir>/accounts/<slug>.json --two-pager "<kit>/accounts/<slug>.json"`
   - Add `--tracking <file>` when re-checking a sent account.
3. FAIL blocks delivery: fix it and re-run.
4. WARN needs a decision: fix it, or say in the report why it stays.

**Deliver as each part lands**
1. The tracker row: a link, plus the two or three findings that matter.
2. The two-pager (`SendUserFile`), with page 2 looked at.
3. The Teams note, ready to paste.

**Final report**
- Lead with the answer: fit or not, which Jumpstart, and the strongest reason why now.
- A row-by-row table: row, what was found or changed, and what it says now.
- One line for each claim the gate narrowed or dropped.
- What only Alex can settle, e.g. "confirm the Unifier scope with Brian".
- Sources for every new fact.

**Keep the homes in sync**
- Fold the account into the wiki with `context-update`, and update the registry's Folded version.
- When Alex corrects something that generalizes, write the rule to its home and say where in one line:
  - `research-standards.md`;
  - a card here;
  - the message-writing playbook.
