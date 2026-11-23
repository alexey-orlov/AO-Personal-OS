#!/usr/bin/env python3
"""Budget check for the jumpstart-account skill: SKILL.md at most 800 words, each card at most 300.

Run from anywhere: python3 .claude/skills/jumpstart-account/scripts/budget.py
Exit code 1 when a file is over budget (CLAUDE.md, "Skill design": cards of 300 words or fewer).
"""
import pathlib
import sys

root = pathlib.Path(__file__).resolve().parent.parent
limits = {root / "SKILL.md": 800}
for card in sorted((root / "references").glob("*.md")):
    limits[card] = 300
over = 0
for path, limit in limits.items():
    words = len(path.read_text(encoding="utf-8").split())
    flag = "OVER" if words > limit else "ok"
    over += words > limit
    print(f"{flag:4}  {words:4}/{limit}  {path.relative_to(root)}")
sys.exit(1 if over else 0)
