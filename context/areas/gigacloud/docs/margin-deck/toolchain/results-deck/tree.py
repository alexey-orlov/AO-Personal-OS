# -*- coding: utf-8 -*-
"""Native (editable) reproduction of Alex's Miro allocation tree.

Geometry is in the source image's pixel space (2048 x 1472, measured by colour
segmentation of the brief's PNG), regularised: equal gaps in the expense-type row,
every row centred on one axis (x = 1242 px), bucket columns on an exact 249 px pitch.
Connectors keep the drawing's style (fan apex just below the parent, small gap above
the child). draw_tree() maps it onto the slide.
"""
from pptx.enum.shapes import MSO_SHAPE
from lib import (P, R, FB, FL, TXT, TREE_LN, BUD, TYP, BKT, PRD, CMP, CHIP, CHIP_LN,
                 add_shape, set_paras, add_box, add_line)

AX = 1242                                   # common vertical axis
LABEL_X = 120
LABELS = {1: ('Budget', 181), 2: ('Expense types', 453), 3: ('Allocation buckets', 743),
          4: ('Products', 1000), 5: ('Components', 1245)}
BW, BH = 164, 169
BX = [AX - BW // 2 + k * 249 for k in (-2, -1, 0, 1, 2)]     # 662, 911, 1160, 1409, 1658
TX_ = [AX - BW // 2 + k * 240 for k in (-1, 0, 1)]           # COGS / CAC / General: 920, 1160, 1400

# (level, key, x, y, w, h, colours, lines[(text, em_px, bold)], chips[(text, x, y, w, h, em_px)])
BOXES = [
    (1, 'budget', AX - 155, 97, 310, 169, BUD, [('Budget', 38, False), ('expenses', 38, False)],
     [('ФОТ', AX - 111, 214, 106, 38, 15), ('Не-ФОТ', AX + 5, 214, 106, 38, 15)]),
    (2, 'cogs', TX_[0], 368, BW, 170, TYP, [('COGS', 46, False)],
     [('DIRECT', TX_[0] + 5, 488, 75, 42, 11), ('INDIRECT', TX_[0] + 84, 488, 75, 42, 11)]),
    (2, 'cac', TX_[1], 368, BW, 170, TYP, [('CAC', 46, False)], []),
    (2, 'general', TX_[2], 368, BW, 170, TYP, [('General', 31, False)], []),
]
for i, (t1, t2, t3) in enumerate([('Public', 'Cloud', '(low)'), ('Public', 'Cloud', '(high)'),
                                  ('Private', 'Infra', None), ('Licenses', None, None),
                                  ('Our', 'services', None)]):
    BOXES.append((3, f'b{i}', BX[i], 658, BW, BH, BKT,
                  [(t, 29, False) for t in (t1, t2, t3) if t], []))
for i, n in enumerate(['3', '7', '11', '54', '7']):
    BOXES.append((4, f'p{i}', BX[i], 915, BW, BH, PRD, [(n, 29, False), ('products', 29, False)], []))
for i, n in enumerate(['13', '52', '147', '202', '13']):
    BOXES.append((5, f'c{i}', BX[i], 1160, BW, BH, CMP, [(n, 23, True), ('components', 22, False)], []))

LINES = []  # (from_level, x1, y1, x2, y2)
for t in TX_:
    LINES.append((1, AX, 295, t + BW / 2, 359))
for t in TX_:
    for b in BX:
        LINES.append((2, t + BW / 2, 568, b + BW / 2, 648))
for b in BX:
    LINES.append((3, b + BW / 2, 860, b + BW / 2, 908))
    LINES.append((4, b + BW / 2, 1117, b + BW / 2, 1153))

LABEL_EM = 34


def _label_w(text):
    return len(text) * 0.66 * LABEL_EM


FRAG_LEFT = BX[0] - 70 - _label_w('Allocation buckets')      # one label column for every fragment


def draw_tree(slide, levels, area, labels='drawn', center=True, line_w=1.25, scale=None,
              left_px=None, first_row_y=None):
    """Draw the selected consecutive levels inside area=(x, y, w, h) inches.
    scale (in/px) forces a common scale; left_px forces the drawing's left edge (so fragments
    share one column grid); first_row_y (in) pins the first row's centre.
    Returns dict with scale, row centre y per level, and row right edge x per level."""
    boxes = [b for b in BOXES if b[0] in levels]
    minx = min(b[2] for b in boxes)
    maxx = max(b[2] + b[4] for b in boxes)
    miny = min(b[3] for b in boxes)
    maxy = max(b[3] + b[5] for b in boxes)
    if left_px is not None:
        left = left_px
    elif labels == 'drawn':
        left = LABEL_X
    else:
        left = minx
    ax, ay, aw, ah = area
    s = scale or min(aw / (maxx - left), ah / (maxy - miny))
    ox = ax + ((aw - (maxx - left) * s) / 2 if center else 0)
    oy = ay + (ah - (maxy - miny) * s) / 2
    if first_row_y is not None:
        l0 = min(levels)
        r0 = [b for b in boxes if b[0] == l0]
        c0 = (min(b[3] for b in r0) + max(b[3] + b[5] for b in r0)) / 2
        oy = first_row_y - (c0 - miny) * s

    def X(px):
        return ox + (px - left) * s

    def Y(py):
        return oy + (py - miny) * s

    def pt(em):
        return int(round(em * s * 72 * 2)) * 50   # hundredths of pt, rounded to 0.5 pt

    for (lv, x1, y1, x2, y2) in LINES:
        if lv in levels and lv + 1 in levels:
            add_line(slide, X(x1), Y(y1), X(x2), Y(y2), color=TREE_LN, w_pt=line_w)
    for (lv, key, x, y, w, h, cols, lines, chips) in boxes:
        add_shape(slide, MSO_SHAPE.RECTANGLE, X(x), Y(y), w * s, h * s, grad=cols, shadow=True)
        text_bottom = h
        if chips:
            text_bottom = min(c[2] for c in chips) - y
        paras = [P(R(t, sz=pt(em), font=FB if bold else FL, color=TXT), align='ctr', ln=int(pt(em) * 1.18))
                 for (t, em, bold) in lines]
        add_box(slide, X(x) + 4 * s, Y(y), (w - 8) * s, text_bottom * s, paras, anchor='m')
        for (ct, cx, cy, cw, chh, cem) in chips:
            c = add_shape(slide, MSO_SHAPE.ROUNDED_RECTANGLE, X(cx), Y(cy), cw * s, chh * s,
                          fill=CHIP, line=CHIP_LN, line_w=0.75, radius=0.22)
            set_paras(c, [P(R(ct, sz=pt(cem), font=FB, color=TXT), align='ctr')], anchor='m', wrap=False)
    rows, row_right = {}, {}
    for l in levels:
        text, _ = LABELS[l]
        rb = [b for b in boxes if b[0] == l]
        ly = min(b[3] for b in rb)
        lh = max(b[3] + b[5] for b in rb) - ly
        rows[l] = Y(ly + lh / 2)
        row_right[l] = X(max(b[2] + b[4] for b in rb))
        if labels in ('drawn', 'compact'):
            add_box(slide, X(left), Y(ly), (_label_w(text) + 40) * s, lh * s,
                    [P(R(text, sz=pt(LABEL_EM), font=FB, color=TXT))], anchor='m', wrap=False)
    return dict(scale=s, rows=rows, row_right=row_right, x_right=X(maxx), x_left=X(left),
                y_top=Y(miny), y_bottom=Y(maxy), X=X, Y=Y)
