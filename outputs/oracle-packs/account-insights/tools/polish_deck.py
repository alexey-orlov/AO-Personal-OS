#!/usr/bin/env python3
"""polish_deck.py <deck.pptx> <descriptor> <cx-name> — builder defects patched on the file until the deck builder carries the fixes
(2026-09-22): (1) the workflow band label is a workforce-pack string; (2) the proof footnote assumes figures exist;
(3) the architecture footnote prints a catalog id; (4) the detailed packages table prints the tier glyph twice."""
import sys, re; from pptx import Presentation
path, desc, cx = sys.argv[1], sys.argv[2], sys.argv[3]; prs = Presentation(path); hits = 0
def fix_para(p, fn):
    t = "".join(r.text for r in p.runs); u = fn(t)
    if u != t and p.runs:
        p.runs[0].text = u
        for r in p.runs[1:]: r.text = ""
        return 1
    return 0
def walk(shape):
    if shape.has_text_frame:
        for p in shape.text_frame.paragraphs: yield p
    if shape.has_table:
        for row in shape.table.rows:
            for c in row.cells:
                for p in c.text_frame.paragraphs: yield p
for sl in prs.slides:
    for sh in sl.shapes:
        for p in walk(sh):
            hits += fix_para(p, lambda t: t.replace("HOW THE PLAN GETS MADE", "HOW IT WORKS"))
            hits += fix_para(p, lambda t: re.sub(r"^Source: proof of value at [^.]+\. Figures are illustrative and subject to confirmation\. ",
                                                  f"First engagement: {desc}, contracted; results follow the proof of value. ", t))
            hits += fix_para(p, lambda t: re.sub(r"^Figures from proof of value at [^.]+\. Figures are illustrative and subject to confirmation\. ",
                                                  f"First engagement: {desc}, contracted; results follow the proof of value. ", t))
            hits += fix_para(p, lambda t: t.replace("— oracle-cx —", f"— {cx} —"))
            hits += fix_para(p, lambda t: re.sub(r"^(◐|●●|●|—)\s+\1\s", r"\1  ", t))
prs.save(path); print(f"polish_deck: {hits} paragraphs patched")
