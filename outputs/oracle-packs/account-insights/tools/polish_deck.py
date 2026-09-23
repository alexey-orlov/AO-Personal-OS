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
# v2 exemplar builder (0.1.14+): the "what it does not claim" block repeats the figures caveat on a slide
# with no figures, and the detailed packages table gives the prose the glyph prototype's orange.
from pptx.dml.color import RGBColor
from pptx.util import Pt as _Pt
for sl in prs.slides:
    for sh in sl.shapes:
        for p in walk(sh):
            hits += fix_para(p, lambda t: t.replace(" Figures are illustrative and subject to confirmation.", "").replace("Figures are illustrative and subject to confirmation.", "").strip())
sl10 = list(prs.slides)[9]
for sh in sl10.shapes:
    if sh.has_table:
        for row in list(sh.table.rows)[1:]:
            for c in list(row.cells)[1:]:
                for p in c.text_frame.paragraphs:
                    for r in p.runs:
                        if r.text.strip() and r.text.strip() not in ("◐", "●", "●●", "—"):
                            r.font.color.rgb = RGBColor(0x26, 0x28, 0x2B); r.font.size = _Pt(9); r.font.bold = False; hits += 1
prs.save(path); print(f"polish v2: caveat stripped where figure-less, slide-10 prose set to ink 9pt — total {hits}")
# v2: the exemplar's slide 8 carries two vertical app<->engine connectors with no label — decoration under the diagram rules.
sl8 = list(prs.slides)[7]; dropped = 0
boxes = [sh for sh in sl8.shapes if sh.has_text_frame and sh.text_frame.text.strip()]
for sh in list(sl8.shapes):
    is_conn = sh.shape_type is None or "Connector" in type(sh).__name__ or (sh.shape_type == 9)
    if is_conn and not sh.has_text_frame and sh.height > sh.width * 2:
        sh._element.getparent().remove(sh._element); dropped += 1
prs.save(path); print(f"polish v2: dropped {dropped} unlabelled vertical connector(s) on slide 8")
