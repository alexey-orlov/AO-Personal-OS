#!/usr/bin/env python3
"""NATO AI use-case map — slides on the SoftServe base (softserve-deck-base.pptx), v7 (2026-09-07).

Slide order follows Alex's edited deck (2026-09-07): 1 the NATO demand signals · 2 the FreeTech delivered cases ·
3 the map, neutral · 4 the same map with the recommended first wave highlighted. Slide numbers in the map footnote are
derived from the view order, so reordering views cannot leave a stale cross-reference.

Map slide: title → four rows of L1 containers (lanes 4 and 5 share the last row) → hairline → visual key + note.
Container = tinted, hairline-framed panel; header line 1 = outlined number badge + bold name, line 2 = plain-language
one-liner; below it a justified row of white L2 tiles. Tile tag row = stack chips left (OCI + AI-Q / VSS / cuOpt / NeMo ·
AIDP · Lakehouse; ghosted when unused) · pills right, outer to inner: demand (NATO / NCIA, outlined) · FreeTech proof
(FT Cn, solid violet) · Oracle delivery (Riyadh Air / Bosch, solid brand orange, width follows the name).
Evidence slides (demand, FreeTech) share one renderer: a container per source with the pill it puts on the map, a
plain-language line, and rows (signal or delivered scope) with the map case(s) at the right.
Case slides (one per entry of case_slides.json, after the two map views): title = "num  name", a mono lane label +
one-liner subtitle, then a two-column band — THE PROBLEM (intro + three lead-in bullets) against THE SOLUTION: headline
(three KPI pills over a paragraph) — a source → OCI diagram band (source panel · in/out arrows · a container holding the
app box, a bidirectional arrow and the engine box), and a PROOF & DEMAND strip. Identical geometry on every case slide
(rule 2); a field the JSON omits still gets its empty container (rule 3).
Data-driven: edit slide_data.json (map, evidence, views) and case_slides.json (the case slides, written separately and
merged in at build time as DATA["case_slides"]). Writes a *-qa.pptx twin with metric-similar open fonts for headless QA
renders (never delivered) and prints a fit report (Liberation metrics ≈ Replica, +6 % safety)."""
import copy, json, math, pathlib, re, zipfile
from PIL import ImageFont
from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.oxml import parse_xml

import os
HERE = pathlib.Path(__file__).resolve().parent             # lives in .claude/references/nato-map-deck/ (repo); data files sit next to it
BASE = pathlib.Path(os.environ.get("DECK_BASE", HERE.parent / "softserve-deck-base.pptx"))
DATA_FILE = pathlib.Path(os.environ.get("DECK_DATA", HERE / "slide_data.json"))   # DECK_DATA=<variant>.json builds a variant deck
DATA = json.loads(DATA_FILE.read_text(encoding="utf-8"))
CASES_FILE = DATA_FILE.with_name(DATA.get("cases_file", "case_slides.json"))       # one entry per case slide; merged in below
try:
    DATA["case_slides"] = json.loads(CASES_FILE.read_text(encoding="utf-8"))["case_slides"]
except Exception as e:                                     # missing/malformed → build the rest, loudly (never a silent skip)
    DATA["case_slides"] = []
    print("WARNING: no case slides —", CASES_FILE.name, "|", type(e).__name__, e)
OUT_DIR = pathlib.Path(os.environ.get("DECK_OUT_DIR", HERE / "out")); OUT_DIR.mkdir(parents=True, exist_ok=True)   # git-ignored
OUT = OUT_DIR / DATA.get("out", "NATO AI use-case map.pptx")
# metric stand-ins for the brand fonts (Replica ≈ Helvetica ≈ Liberation Sans / Arial; Roboto Mono ≈ Liberation Mono / Courier New)
FONT_DIRS = [d for d in [os.environ.get("DECK_FONT_DIR"), "/usr/share/fonts/truetype/liberation",
                         str(pathlib.Path.home() / "Library/Fonts"), "/Library/Fonts", "/System/Library/Fonts/Supplemental"] if d]
FONT_NAMES = {(False, False): ["LiberationSans-Regular.ttf", "Arial.ttf"], (False, True): ["LiberationSans-Bold.ttf", "Arial Bold.ttf"],
              (True, False): ["LiberationMono-Regular.ttf", "Courier New.ttf"], (True, True): ["LiberationMono-Bold.ttf", "Courier New Bold.ttf"]}
_FONT_CACHE = {}


def font_file(mono, bold):
    """first installed stand-in for (mono, bold); set DECK_FONT_DIR when none of the default directories has one"""
    key = (mono, bold)
    if key not in _FONT_CACHE:
        hits = [pathlib.Path(d) / n for d in FONT_DIRS for n in FONT_NAMES[key] if (pathlib.Path(d) / n).exists()]
        if not hits:
            raise FileNotFoundError(f"no stand-in font for mono={mono} bold={bold}; looked in {FONT_DIRS} — set DECK_FONT_DIR")
        _FONT_CACHE[key] = str(hits[0])
    return _FONT_CACHE[key]

# brand tokens (softserve-deck-kit.md) — greys only from the token set
ORANGE = RGBColor(0xF3, 0x69, 0x49); ORANGE_TINT = RGBColor(0xFD, 0xED, 0xE8)   # SoftServe — the delivery layer
RED = RGBColor(0xC7, 0x46, 0x34); RED_TINT = RGBColor(0xF8, 0xDB, 0xD7)    # Oracle red — the second highlight on the first-wave map
BLUE = RGBColor(0x2E, 0x6D, 0xB4); BLUE_TINT = RGBColor(0xE6, 0xEE, 0xF8)  # Oracle cloud — the OCI container, the solution column
GREEN = RGBColor(0x5B, 0x8C, 0x00); GREEN_TINT = RGBColor(0xEE, 0xF5, 0xE0)  # NVIDIA — the engine layer
GREY_LBL = RGBColor(0x80, 0x80, 0x80); HAIR = RGBColor(0xDC, 0xDC, 0xDC); FOOT = RGBColor(0x59, 0x59, 0x59)
GREY_MID = RGBColor(0xB0, 0xB0, 0xB0)                      # empty-state outline — a hairline dot reads as a printing artefact
INK = RGBColor(0x00, 0x00, 0x00); PANEL = RGBColor(0xF1, 0xF2, 0xF5); WHITE = RGBColor(0xFF, 0xFF, 0xFF)
VIOLET = RGBColor(0x6A, 0x4C, 0x9C)                        # FreeTech proof — the one hue outside the brand set (asked 2026-09-07)
BODY_FONT = "ReplicaLLTT-Regular"; MONO_FONT = "Roboto Mono"

# geometry (EMU) — canvas 12192000 × 6858000; content column x 358732 / w 11493500; title y 1081987
X0, W = 358732, 11493500
TITLE_Y, TITLE_H = 1081987, 396858
TOP = TITLE_Y + TITLE_H + 100000
BOTTOM = 5620000                                           # last container's bottom edge
KEY_HAIR_Y = BOTTOM + 90000                                # hairline that closes the map
KEY_Y = KEY_HAIR_Y + 80000                                 # visual key, line 1 (line 2 one TAG_H + KEY_LINE_GAP below)
KEY_LINE_GAP = 45000
EV_HAIR_Y, EV_NOTE_Y = 5790000, 5860000                    # evidence slides keep their v7 footer geometry
ROWS = DATA["layout"]; N_ROWS = len(ROWS)
ROW_GAP_Y, LANE_GAP_X = 220000, 200000                     # air between L1 containers (≈3.7× the tile gap)
ROW_H = (BOTTOM - TOP - ROW_GAP_Y * (N_ROWS - 1)) // N_ROWS
PAD_X, PAD_TOP, PAD_BOTTOM = 70000, 35000, 35000           # container inner padding
BADGE = 170000
HEAD_NAME_H, HEAD_DESC_H = 185000, 145000; HEAD_H = HEAD_NAME_H + HEAD_DESC_H; HEAD_GAP = 20000
TILE_H = ROW_H - PAD_TOP - HEAD_H - HEAD_GAP - PAD_BOTTOM
TILE_GAP = 60000
TILE_MX, TILE_MY = 50000, 35000                            # tile inner margins
TAG_H, TAG_PT = 130000, 7                                  # 7pt: the 5-tile lane must carry 3 chips + 2 pills on one row
# NV_W: one width for every stack chip in the slot; the widest label ("OCI + cuOpt") needs 642060 and the 5-tile lane
# leaves at most 642700 before the 60000 chip↔pill air fails, so the slot is set to that bound
NV_W, AIDP_W, LH_W, FT_W, DEM_W = 642700, 255000, 535000, 310000, 255000
CHIP_GAP, PILL_GAP, KEY_GAP = 10000, 45000, 130000
NAME_PT, LANE_PT, DESC_PT, KEY_PT, NOTE_PT = 9.5, 13, 9, 8, 8.5
# demand slide
D_SRC_PT, D_SIG_PT, D_REF_PT = 7.5, 9.5, 8
LANES = {l["n"]: l for l in DATA["lanes"]}
FIT = []                                                   # (label, need, have) — printed at the end


def text_w(text, pt, bold=False, mono=False):
    """width in EMU with the Liberation stand-ins (+6 % for the brand fonts)"""
    f = ImageFont.truetype(font_file(mono, bold), size=int(pt * 20))
    return int(f.getlength(text) / 20 * 12700 * 1.06)


def spc_w(text, spc):
    """extra width letter-spacing adds (spc is in 1/100 pt per character, as in the rPr attribute)"""
    return int(len(text) * spc / 100 * 12700)


def para_w(runs, pt):
    """width of one paragraph given [(text, bold), ...]"""
    return sum(text_w(t, pt, b) for t, b in runs)


def block_need(paras, box_w, pt, space_after=0):
    """wrapped block: lines = ceil(width × 1.1 / box_w) per paragraph, height = lines × pt × 1.2 (+ space_after).
    The measurement on its own, so a pre-pass can size shared geometry without logging a fit check."""
    need = 0
    for runs in paras:
        need += max(1, -(-int(para_w(runs, pt) * 1.1) // box_w)) * int(pt * 1.2 * 12700) + int(space_after * 12700)
    return need


def block_fit(label, paras, box_w, box_h, pt, space_after=0):
    need = block_need(paras, box_w, pt, space_after)
    FIT.append((label, need, box_h))
    return need


def wrap_h(paras, box_w, pt, line_spacing=1.1, space_after=0):
    """height a wrapped block REALLY takes: greedy word wrap on the Liberation stand-ins (+6 % brand safety), at the
    line spacing set_text actually applies. block_fit stays the conservative overflow check — deliberately over-counting
    so one geometry clears every case slide; this is for accents that must stop at the last line, not dangle past it."""
    need = 0
    for runs in paras:
        words = []
        for t, b in runs:
            parts = t.split(" ")
            words += [(p + (" " if i < len(parts) - 1 else ""), b) for i, p in enumerate(parts)]
        lines, cur = 1, 0
        for w, b in words:
            if cur and cur + text_w(w.rstrip(), pt, b) > box_w:
                lines += 1; cur = text_w(w, pt, b)
            else:
                cur += text_w(w, pt, b)
        need += lines * int(pt * line_spacing * 12700) + int(space_after * 12700)
    return need


def set_text(tf, paras, size, color=INK, bold=False, font=BODY_FONT, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, line_spacing=None, space_after=None, hanging=0):
    """paras: list of paragraphs; each = str or list of (text, overrides).
    hanging: EMU of hanging indent applied to every paragraph AFTER the first — an intro followed by bullets whose
    wrapped lines line up under the text, not under the glyph."""
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    first = True
    for para in paras:
        p = tf.paragraphs[0] if first else tf.add_paragraph()
        if hanging and not first:
            pPr = p._pPr if p._pPr is not None else p._p.get_or_add_pPr()
            pPr.set("marL", str(hanging)); pPr.set("indent", str(-hanging))
        first = False
        p.alignment = align
        if line_spacing: p.line_spacing = line_spacing
        if space_after is not None: p.space_after = Pt(space_after)
        items = para if isinstance(para, list) else [(para, {})]
        for text, ov in items:
            r = p.add_run(); r.text = text
            f = r.font; f.size = Pt(ov.get("size", size)); f.bold = ov.get("bold", bold)
            f.color.rgb = ov.get("color", color); f.name = ov.get("font", font)
            if ov.get("spc"): f._rPr.set("spc", str(ov["spc"]))   # letter-spacing (1/100 pt) — no python-pptx API for it


def box(slide, x, y, w, h, fill=None, line=None, line_w=9525, shape=MSO_SHAPE.RECTANGLE, margins=(0, 0)):
    s = slide.shapes.add_shape(shape, Emu(x), Emu(y), Emu(w), Emu(h))
    s.shadow.inherit = False
    if fill is None: s.fill.background()
    else: s.fill.solid(); s.fill.fore_color.rgb = fill
    if line is None: s.line.fill.background()
    else: s.line.color.rgb = line; s.line.width = Emu(line_w)
    tf = s.text_frame; tf.margin_left = tf.margin_right = Emu(margins[0]); tf.margin_top = tf.margin_bottom = Emu(margins[1])
    tf.word_wrap = False
    return s


def rule(slide, x, y, w, color=HAIR, width=9525):
    c = slide.shapes.add_connector(1, Emu(x), Emu(y), Emu(x + w), Emu(y))
    c.line.color.rgb = color; c.line.width = Emu(width)
    return c


def pill(slide, x, y, w, text, fill, line, color, bold=False, shape=MSO_SHAPE.ROUNDED_RECTANGLE, line_w=9525, font=MONO_FONT, pt=TAG_PT):
    s = box(slide, x, y, w, TAG_H, fill=fill, line=line, line_w=line_w, shape=shape)
    if shape == MSO_SHAPE.ROUNDED_RECTANGLE:
        s.adjustments[0] = 0.5
    set_text(s.text_frame, [[(text, {"size": pt, "color": color, "bold": bold, "font": font})]], pt, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    FIT.append(("tag " + text, text_w(text, pt, bold, mono=(font == MONO_FONT)) + 20000, w))
    return s


def chip(slide, x, y, w, label, lit):
    """stack chip: lit = mid-grey fill + white text; unused = hairline outline + label grey (no ink fills on small badges — rule 8)"""
    if lit:
        return pill(slide, x, y, w, label, fill=FOOT, line=None, color=WHITE, shape=MSO_SHAPE.RECTANGLE)
    return pill(slide, x, y, w, label, fill=None, line=HAIR, color=GREY_LBL, shape=MSO_SHAPE.RECTANGLE)


def ft_pill(slide, x, y, text):
    """FreeTech proof — solid violet, white text (solid pill = delivered proof; outlined pill = demand)"""
    return pill(slide, x, y, FT_W, text, fill=VIOLET, line=None, color=WHITE, bold=True)


def ora_w(text):
    return text_w(text, TAG_PT, True, mono=True) + 60000


def oracle_pill(slide, x, y, text):
    """SoftServe delivery on Oracle (Riyadh Air, Bosch) — solid brand orange, ink text (white on F36949 is 3.0:1 at 7 pt;
    ink is 5.7:1 — design QA 2026-09-07); width follows the name"""
    return pill(slide, x, y, ora_w(text), text, fill=ORANGE, line=None, color=INK, bold=True)


def demand_pill(slide, x, y, text="NCIA"):
    """named demand signal from a NATO body (NCIA, or another alliance body) — detail on the demand slide;
    hairline stroke so the outlined 'question' does not out-weigh the filled 'proof' pills (rules 7, 8)"""
    return pill(slide, x, y, DEM_W, text, fill=WHITE, line=INK, color=INK, bold=True, line_w=9525)


def ghost_pill(slide, x, y, w=DEM_W):
    """an empty instance of the pill slot — no tag here (rule 3: absence as an empty container, never a gap)"""
    s = box(slide, x, y, w, TAG_H, fill=None, line=HAIR, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    s.adjustments[0] = 0.5
    return s


def stack_chips(slide, x, y, nv, aidp, lakehouse):
    chip(slide, x, y, NV_W, DATA["nvidia_labels"][nv], lit=(nv != "off")); x += NV_W + CHIP_GAP
    chip(slide, x, y, AIDP_W, "AIDP", lit=aidp); x += AIDP_W + CHIP_GAP
    chip(slide, x, y, LH_W, "Lakehouse", lit=lakehouse); x += LH_W
    return x


HL = {"orange": (ORANGE_TINT, ORANGE), "red": (RED_TINT, RED)}   # highlight: None | "orange" (first wave) | "red" (added)


def tile(slide, x, y, w, c, highlight=None):
    fill, line = HL.get(highlight, (WHITE, HAIR))
    # the added case differs from the first wave in kind, not only in hue: a 2 pt frame and its number in red
    lw = 25400 if highlight == "red" else (12700 if highlight else 9525)
    box(slide, x, y, w, TILE_H, fill=fill, line=line, line_w=lw)
    inner = w - 2 * TILE_MX
    nb = box(slide, x + TILE_MX, y + TILE_MY, inner, TILE_H - 2 * TILE_MY - TAG_H)
    nb.text_frame.word_wrap = True
    hb = bool(highlight)                                   # a highlighted tile of either colour carries a bold name
    num_col = RED if highlight == "red" else GREY_LBL
    set_text(nb.text_frame, [[(c["num"] + "  ", {"bold": True, "size": NAME_PT, "color": num_col}), (c["name"], {"bold": hb, "size": NAME_PT})]], NAME_PT, line_spacing=1.0)
    FIT.append(("name " + c["num"], text_w(c["num"] + "  ", NAME_PT, True) + text_w(c["name"], NAME_PT, hb), inner))
    # tag row: stack chips left · proof and demand pills right
    ty = y + TILE_H - TILE_MY - TAG_H
    right = stack_chips(slide, x + TILE_MX, ty, c.get("nvidia", "off"), bool(c.get("aidp")), bool(c.get("lakehouse")))
    rx = x + w - TILE_MX
    if c.get("demand"):
        rx -= DEM_W; demand_pill(slide, rx, ty, c["demand"]); rx -= PILL_GAP
    if c.get("ft"):
        rx -= FT_W; ft_pill(slide, rx, ty, "FT " + c["ft"]); rx -= PILL_GAP
    if c.get("oracle"):
        rx -= ora_w(c["oracle"]); oracle_pill(slide, rx, ty, c["oracle"]); rx -= PILL_GAP
    if c.get("demand") or c.get("ft") or c.get("oracle"):  # min 60000 EMU of air between the chip group and the pills
        FIT.append(("tag row " + c["num"], 60000, (rx + PILL_GAP) - right))
    else:                                                  # no tag at all: an empty pill in the slot, not a bare gap (rule 3)
        ghost_pill(slide, rx - DEM_W, ty)


def container(slide, x, y, w, h, name, desc=None, badge_text=None, right_label=None, tag=None, tag_style="demand"):
    """tinted, hairline-framed panel with a header; returns the y where content may start"""
    box(slide, x, y, w, h, fill=PANEL, line=HAIR)
    hy = y + PAD_TOP
    hx = x + PAD_X
    if tag is not None:                                    # the same pill this source puts on the map
        slot = DEM_W if tag_style == "demand" else FT_W
        py = hy + (HEAD_NAME_H - TAG_H) // 2
        if tag:
            (demand_pill if tag_style == "demand" else ft_pill)(slide, hx, py, tag)
        else:                                              # "": this source drives no tag — an empty instance keeps the slot (rule 3)
            ghost_pill(slide, hx, py, slot)
        hx += slot + 70000
    if badge_text is not None:
        b = box(slide, hx, hy + (HEAD_NAME_H - BADGE) // 2, BADGE, BADGE, fill=WHITE, line=INK, line_w=12700, shape=MSO_SHAPE.OVAL)
        set_text(b.text_frame, [[(badge_text, {"bold": True, "size": 9})]], 9, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        hx += BADGE + 60000
    hw = x + w - PAD_X - hx
    if right_label:                                        # column heading, right-aligned on the name line
        rl_w = text_w(right_label, D_SRC_PT, mono=True) + 20000
        rb = box(slide, x + w - PAD_X - rl_w, hy, rl_w, HEAD_NAME_H)
        set_text(rb.text_frame, [[(right_label, {"size": D_SRC_PT, "color": GREY_LBL, "font": MONO_FONT})]], D_SRC_PT, align=PP_ALIGN.RIGHT, anchor=MSO_ANCHOR.MIDDLE)
        hw -= rl_w + 60000
    nb = box(slide, hx, hy, hw, HEAD_NAME_H)
    set_text(nb.text_frame, [[(name, {"bold": True, "size": LANE_PT})]], LANE_PT, anchor=MSO_ANCHOR.MIDDLE)
    FIT.append(("head " + name[:18], text_w(name, LANE_PT, True), hw)) if desc is None else None
    if desc is None:
        return hy + HEAD_NAME_H + HEAD_GAP
    dw = w - 2 * PAD_X
    db = box(slide, x + PAD_X, hy + HEAD_NAME_H, dw, HEAD_DESC_H)              # plain-language line spans the panel
    set_text(db.text_frame, [[(desc, {"size": DESC_PT, "color": FOOT})]], DESC_PT, anchor=MSO_ANCHOR.MIDDLE)
    FIT.append(("desc " + name[:18], text_w(desc, DESC_PT) + 200000, dw))      # one line, ≥ 200000 EMU clear
    return hy + HEAD_H + HEAD_GAP


def lane_container(slide, x, y, w, lane, fw):
    """fw: {case number: highlight colour} — empty on the neutral view"""
    ty = container(slide, x, y, w, ROW_H, lane["name"], desc=lane["desc"], badge_text=lane["n"])
    n = len(lane["cases"])
    tw = (w - 2 * PAD_X - TILE_GAP * (n - 1)) // n
    tx = x + PAD_X
    for c in lane["cases"]:
        tile(slide, tx, ty, tw, c, fw.get(c["num"]))
        tx += tw + TILE_GAP


def key_row(slide, y, items, fit_label):
    """visual legend line: sample tag + short label per family, tile order (chips → pills)"""
    x = X0
    for it in items:
        s = it["sample"]
        if s == "lit":
            x = stack_chips(slide, x, y, "aiq", True, True)
        elif s == "ghost":                                 # one sample each of an unused chip and an empty pill slot
            chip(slide, x, y, NV_W, DATA["nvidia_labels"]["off"], lit=False); x += NV_W + CHIP_GAP
            ghost_pill(slide, x, y); x += DEM_W
        elif s == "ft":
            ft_pill(slide, x, y, it.get("sample_text", "FT C1")); x += FT_W
        elif s == "oracle":
            t = it.get("sample_text", "Bosch"); oracle_pill(slide, x, y, t); x += ora_w(t)
        elif s == "demand":
            demand_pill(slide, x, y, it.get("sample_text", "NCIA")); x += DEM_W
        elif s in ("wave", "wave_red"):                    # a highlighted tile in miniature, not an empty swatch (rule 1)
            red = s == "wave_red"
            ft, ln = HL["red" if red else "orange"]         # the added case's sample carries the tile's 2 pt frame and red number
            pill(slide, x, y, FT_W, it.get("sample_text", "4.1"), fill=ft, line=ln, color=(RED if red else INK), bold=True,
                 shape=MSO_SHAPE.RECTANGLE, line_w=(25400 if red else 12700), font=BODY_FONT, pt=8.5); x += FT_W
        x += 45000
        bold = bool(it.get("bold"))
        lw = text_w(it["label"], KEY_PT, bold) + 30000
        lb = box(slide, x, y - 10000, lw, TAG_H + 20000)
        set_text(lb.text_frame, [[(it["label"], {"size": KEY_PT, "color": (INK if bold else FOOT), "bold": bold})]], KEY_PT, anchor=MSO_ANCHOR.MIDDLE)
        x += lw + KEY_GAP
    FIT.append((fit_label, x - KEY_GAP - X0, W))


def set_header(slide, title, title_txbody):
    """title + running label: reuse the base slide's title text body (keeps its run formatting)"""
    for sh in slide.shapes:
        if not sh.is_placeholder: continue
        t = sh.placeholder_format.type
        if t is not None and "TITLE" in str(t):
            sh.left, sh.top, sh.width, sh.height = Emu(X0), Emu(TITLE_Y), Emu(W), Emu(TITLE_H)
            sp = sh._element
            sp.remove(sp.txBody); sp.append(copy.deepcopy(title_txbody))
            p0 = sh.text_frame.paragraphs[0]
            p0.runs[0].text = title
            for r in p0.runs[1:]: r.text = ""
        elif t is not None and "BODY" in str(t):
            p0 = sh.text_frame.paragraphs[0]
            if p0.runs:
                p0.runs[0].text = DATA["running"]
                for r in p0.runs[1:]: r.text = ""
            else:
                p0.text = DATA["running"]


def footnote(slide, y, text):
    nb = box(slide, X0, y, W, 320000)
    nb.text_frame.word_wrap = True
    set_text(nb.text_frame, [[(text, {"size": NOTE_PT, "color": FOOT})]], NOTE_PT, line_spacing=1.0)


def render_map(slide, view, title_txbody):
    first = view["key"] == "first_wave"
    fw = {}
    if first:                                              # the recommended wave in orange, the added case in its own colour
        fw = {n: "orange" for n in DATA["first_wave"]}
        fw.update(DATA.get("first_wave_extra", {}))
    set_header(slide, DATA["title"], title_txbody)
    y = TOP
    for row in ROWS:
        k = len(row)
        cw = (W - LANE_GAP_X * (k - 1)) // k
        x = X0
        for n in row:
            lane_container(slide, x, y, cw, LANES[n], fw)
            x += cw + LANE_GAP_X
        y += ROW_H + ROW_GAP_Y
    rule(slide, X0, KEY_HAIR_Y, W)                         # closes the map before the key
    ky = KEY_Y
    if first:                                              # line 1 = the highlight samples (read before any chip or pill)
        key_row(slide, ky, [DATA["key_first_wave"], DATA["key_added"]], "key row first_wave line 1")
        ky += TAG_H + KEY_LINE_GAP
        key_row(slide, ky, list(DATA["key"]), "key row first_wave line 2")
    else:
        key_row(slide, ky, list(DATA["key"]), "key row neutral line 1")
    footnote(slide, ky + TAG_H + KEY_LINE_GAP, NOTE)


def render_rows(slide, d, title_txbody, tag_style="demand", wrap=False):
    """evidence slides — one container per source (a NATO body, or a FreeTech case): who / what it is in plain words,
    then its rows (signal, or delivered scope) with the map case(s) at the right. wrap=True lets a row run to several lines."""
    set_header(slide, d["title"], title_txbody)
    cols = d["columns"]; src = d["sources"]; label = d.get("cases_label", "MAP CASES")
    ref_w = max(text_w(i["refs"], D_REF_PT) for s in src.values() for i in s["items"])
    ref_w = max(ref_w, text_w(label, D_SRC_PT, mono=True)) + 20000
    chrome = PAD_TOP + HEAD_H + HEAD_GAP + PAD_BOTTOM      # header = source name + plain-language line
    gap = 150000
    # ONE row pitch across the whole slide; each container is as tall as its own signal count
    ih = min((BOTTOM - TOP - gap * (len(c) - 1) - chrome * len(c)) // sum(len(src[s]["items"]) for s in c) for c in cols)
    cw = (W - LANE_GAP_X * (len(cols) - 1)) // len(cols)
    inner_w = cw - 2 * PAD_X
    sig_w = inner_w - ref_w - 60000
    line_h = int(D_SIG_PT * 1.2 * 12700)

    def need(it):                                          # row height a wrapped body needs (+10 % for ragged wrapping)
        return -(-int(text_w(it["signal"], D_SIG_PT) * 1.1) // sig_w) * line_h + 2 * TILE_MY

    if wrap:                                               # size rows to their content, not to the column (rule 1)
        ih = min(ih, max(need(i) for s in src.values() for i in s["items"]) + 160000)
    x = X0
    for col in cols:
        y = TOP
        for sid in col:
            s = src[sid]
            n = len(s["items"])
            h = chrome + n * ih
            iy = container(slide, x, y, cw, h, s["name"], desc=s["desc"], right_label=label, tag=s.get("tag") or "", tag_style=tag_style)
            for j, it in enumerate(s["items"]):
                # one-liners sit on the row's centre line; wrapped bodies hang from a shared top edge so row-mates align (rule 2)
                gb = box(slide, x + PAD_X, iy + j * ih, sig_w, ih, margins=(0, TILE_MY if wrap else 0))
                gb.text_frame.word_wrap = True
                set_text(gb.text_frame, [[(it["signal"], {"size": D_SIG_PT})]], D_SIG_PT, anchor=(MSO_ANCHOR.TOP if wrap else MSO_ANCHOR.MIDDLE), line_spacing=1.0)
                if wrap:
                    FIT.append(("body " + sid + f" ({(need(it) - 2 * TILE_MY) // line_h} lines)", need(it), ih))
                else:
                    FIT.append(("signal " + it["signal"][:16], text_w(it["signal"], D_SIG_PT), sig_w))
                rb = box(slide, x + cw - PAD_X - ref_w, iy + j * ih, ref_w, ih, margins=(0, TILE_MY if wrap else 0))
                set_text(rb.text_frame, [[(it["refs"], {"size": D_REF_PT, "color": FOOT})]], D_REF_PT, align=PP_ALIGN.RIGHT, anchor=(MSO_ANCHOR.TOP if wrap else MSO_ANCHOR.MIDDLE))
                if j:
                    rule(slide, x + PAD_X, iy + j * ih, inner_w, color=RGBColor(0xE6, 0xE7, 0xEA))
            FIT.append(("src desc " + s["name"][:14], text_w(s["desc"], DESC_PT), inner_w))
            y += h + gap
        x += cw + LANE_GAP_X
    rule(slide, X0, EV_HAIR_Y, W)
    footnote(slide, EV_NOTE_Y, d["note"])


# ---- case slides -------------------------------------------------------------------------------------------------
SUB_Y, SUB_H = TITLE_Y + TITLE_H + 30000, 250000           # lane label + one-liner under the title
COL_Y, COL_B = 1900000, 3700000                            # the problem / solution band
COL_L_W, COL_R_X = 5350000, X0 + 5650000
COL_R_W = W - 5650000
SEC_H = 200000                                             # section-label height, both columns
KPI_H, KPI_PAD, KPI_GAP = 230000, 240000, 100000
SRC_W, ARROW_PAD = 2450000, 130000                         # source → OCI diagram band (its y/h follow the text columns)
CONT_X = X0 + 4760000; CONT_W = W - 4760000
INNER_W = 2950000                                          # app / engine boxes inside the container (height fills the band)
PROOF_HAIR_Y, PROOF_Y, PROOF_LBL_W, PROOF_H = 5620000, 5700000, 1600000, 330000
CASE_PT, SEC_PT, KPI_PT, DIA_PT, DIA_SUB_PT = 10, 8.5, 9, 10.5, 8.5
BAND_GAP, BAND_B, BAND_MIN_H = 220000, PROOF_HAIR_Y - 170000, 1550000   # the band picks up where the columns end
HEAD_BAND_H, BAND_PAD = 290000, 120000                     # OCI container header strip · air above/below the inner boxes
BAR_W, BAR_DX = 38100, 38100 + 120000                      # column accent rule (problem / solution) + the text offset it buys
OWNER_BAR_W = 50800                                        # owner rule down the left edge of an app / engine box
# who owns each layer of the diagram — the one colour code the case slides carry, spelled out in the legend below
ENGINE_OWNER = {"AI Lakehouse + AIDP": ("Oracle", RED)}    # every other engine in the set is NVIDIA's
APP_CAPTION = "SoftServe on the Oracle pack"
OWNER_LEGEND = [("SoftServe", ORANGE), ("Oracle cloud", BLUE), ("Oracle data platform", RED), ("NVIDIA", GREEN)]
LEG_Y, LEG_H, LEG_SQ, LEG_PT, LEG_GAP = 6050000, 150000, 110000, 7.5, 200000
SRC_HEAD = "SOURCE SYSTEMS"                                # the source panel's header — mirrors the OCI container's
FLOW_LBL_H, FLOW_LBL_GAP, FLOW_PT = 130000, 40000, 7       # app ↔ engine arrow labels: height · clear air · size


def problem_measures(p):
    """the problem column as measurable runs — one construction shared by the pre-pass and the renderer"""
    meas = [[(p.get("intro", ""), False)]]
    for lead, clause in [(b + ["", ""])[:2] for b in p.get("bullets", [])]:
        meas.append([("•  ", False), (lead, True), (" " + clause, False)])
    return meas


def shared_band_y(cases):
    """PRE-PASS, no drawing: the diagram band's top edge, measured once for the whole set. Each case's p_need / s_need
    come from the same wrap_h calls the renderer would make for its own two columns; the band starts BAND_GAP below the
    deepest of the six, so band_h — and with it the inner app / engine box height — is identical on every case slide
    (rule 2). block_fit stays the conservative overflow check; this is the measure that decides real geometry."""
    lw, rw = COL_L_W - BAR_DX, COL_R_W - BAR_DX
    py, sy = COL_Y + SEC_H, COL_Y + 260000 + KPI_H + 120000
    deepest = 0
    for case in cases:
        p_need = wrap_h(problem_measures(case.get("problem", {})), lw, CASE_PT, space_after=3)
        s_need = wrap_h([[(case.get("solution", {}).get("text", ""), False)]], rw, CASE_PT)
        deepest = max(deepest, py + p_need, sy + s_need)
    return deepest + BAND_GAP


BAND_Y = shared_band_y(DATA["case_slides"]) if DATA["case_slides"] else COL_B + BAND_GAP
BAND_H = max(BAND_MIN_H, BAND_B - BAND_Y)


def sec_label(slide, x, y, w, text, color=INK):
    """column heading — mono, bold, letter-spaced (the one caps line per column)"""
    b = box(slide, x, y, w, SEC_H)
    set_text(b.text_frame, [[(text, {"size": SEC_PT, "bold": True, "font": MONO_FONT, "spc": 200, "color": color})]], SEC_PT, anchor=MSO_ANCHOR.MIDDLE)
    FIT.append(("sec " + text[:16], text_w(text, SEC_PT, True, mono=True) + spc_w(text, 200), w))


def stack_box(slide, x, y, w, h, name, sub, fill=None, line=None, caption=None, bar=None):
    """centred name + sub, vertically centred — the source / app / engine panels share this form (rule 2).
    bar: owner colour drawn as a rule down the left edge; caption: who owns this box, in the legend's words"""
    b = box(slide, x, y, w, h, fill=fill, line=line, margins=(60000, 0))
    b.text_frame.word_wrap = True
    paras = [[(name, {"size": DIA_PT, "bold": True})], [(sub, {"size": DIA_SUB_PT, "color": FOOT})]]
    if caption:
        paras.append([(caption, {"size": LEG_PT, "color": FOOT, "font": MONO_FONT})])
    set_text(b.text_frame, paras, DIA_PT, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.05)
    if caption:
        b.text_frame.paragraphs[-1].space_before = Pt(5)   # the owner caption reads as a footer, not a third body line
        FIT.append(("dia cap " + caption[:14], text_w(caption, LEG_PT, mono=True), w - 120000))
    if bar is not None:
        box(slide, x, y, OWNER_BAR_W, h, fill=bar)
    FIT.append(("dia " + name[:16], text_w(name, DIA_PT, True), w - 120000))
    return b


def owner_legend(slide, eng_col):
    """the diagram's colour code, spelled out — four entries at the same four positions on every case slide (rule 2).
    An owner this slide does not use keeps its slot as an empty instance: white swatch, hairline frame, label greyed (rule 3).
    eng_col is the engine bar's colour, so the data-platform / NVIDIA pair lights up with the engine it names."""
    x = X0
    for label, col in OWNER_LEGEND:
        on = True                                          # SoftServe and the Oracle cloud carry every case
        if col is RED: on = eng_col is RED                 # Oracle data platform — only the AI Lakehouse engine
        elif col is GREEN: on = eng_col is GREEN           # NVIDIA — every other engine in the set
        box(slide, x, LEG_Y + (LEG_H - LEG_SQ) // 2, LEG_SQ, LEG_SQ, fill=(col if on else WHITE), line=(None if on else HAIR))
        x += LEG_SQ + 60000
        lw = text_w(label, LEG_PT, mono=True) + 20000
        lb = box(slide, x, LEG_Y, lw, LEG_H)
        set_text(lb.text_frame, [[(label, {"size": LEG_PT, "color": (FOOT if on else GREY_LBL), "font": MONO_FONT})]], LEG_PT, anchor=MSO_ANCHOR.MIDDLE)
        x += lw + LEG_GAP
    FIT.append(("case owner legend", x - LEG_GAP - X0, W))


def arrow(slide, x1, x2, y, label, zone_w):
    """straight connector with a triangle head at its END point; label in a box sitting 160000 above the line"""
    conn = slide.shapes.add_connector(1, Emu(x1), Emu(y), Emu(x2), Emu(y))
    conn.line.color.rgb = FOOT; conn.line.width = Emu(12700)
    ln = conn.line._get_or_add_ln()
    ln.append(parse_xml('<a:tailEnd xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" type="triangle" w="med" len="med"/>'))
    lb = box(slide, min(x1, x2), y - 160000, zone_w, 160000, margins=(0, 22000))   # inset keeps descenders off the line
    set_text(lb.text_frame, [[(label, {"size": DIA_SUB_PT, "color": FOOT})]], DIA_SUB_PT, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.BOTTOM)
    FIT.append(("arrow " + label[:16], text_w(label, DIA_SUB_PT), zone_w))


def flow_label(slide, x, w, y, text, tag):
    """what travels over the app ↔ engine arrow — one line, centred on the arrow, clear of it and of both boxes"""
    b = box(slide, x, y, w, FLOW_LBL_H)
    set_text(b.text_frame, [[(text, {"size": FLOW_PT, "color": FOOT, "font": MONO_FONT})]], FLOW_PT, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    FIT.append((tag + " flow " + text, text_w(text, FLOW_PT, mono=True) + 2 * FLOW_LBL_GAP, w))


def render_case(slide, case, title_txbody):
    """one delivered-case slide: subtitle · problem | solution · source → OCI diagram · proof strip"""
    num = case.get("num", ""); tag = "case " + num
    set_header(slide, f"{num}  {case.get('name', '')}", title_txbody)
    # subtitle: mono lane label, then the plain-language one-liner
    l1 = case.get("l1", ""); one = case.get("one_liner", "")
    sb = box(slide, X0, SUB_Y, W, SUB_H)
    set_text(sb.text_frame, [[(l1 + "   ", {"size": SEC_PT, "color": GREY_LBL, "font": MONO_FONT, "spc": 150}),
                              (one, {"size": 11, "color": FOOT})]], 11, anchor=MSO_ANCHOR.MIDDLE)
    FIT.append((tag + " subtitle", text_w(l1 + "   ", SEC_PT, mono=True) + spc_w(l1, 150) + text_w(one, 11), W))

    # left column — the problem: intro paragraph, then three lead-in bullets, behind a red rule
    lx, lw = X0 + BAR_DX, COL_L_W - BAR_DX
    sec_label(slide, lx, COL_Y, lw, "THE PROBLEM", color=RED)
    p = case.get("problem", {})
    py = COL_Y + SEC_H
    meas = problem_measures(p)
    paras = [[(p.get("intro", ""), {"size": CASE_PT})]]
    for lead, clause in [(b + ["", ""])[:2] for b in p.get("bullets", [])]:
        paras.append([("•  ", {"size": CASE_PT, "color": FOOT}), (lead, {"size": CASE_PT, "bold": True}), (" " + clause, {"size": CASE_PT})])
    pb = box(slide, lx, py, lw, COL_B - py)
    pb.text_frame.word_wrap = True
    set_text(pb.text_frame, paras, CASE_PT, line_spacing=1.1, space_after=3, hanging=text_w("•  ", CASE_PT))
    p_need = block_fit(tag + " problem", meas, lw, COL_B - py, CASE_PT, space_after=3)

    # right column — the solution: headline, three KPI pills, the paragraph, behind a blue rule
    rx, rw = COL_R_X + BAR_DX, COL_R_W - BAR_DX
    s = case.get("solution", {})
    sec_label(slide, rx, COL_Y, rw, "THE SOLUTION: " + s.get("headline", ""), color=BLUE)
    kx, ky = rx, COL_Y + 260000
    kpis = (list(s.get("kpis", [])) + ["", "", ""])[:3]     # always three peer slots, empty ones included (rules 2, 3)
    total = 0
    for k in kpis:
        kw = text_w(k, KPI_PT, True) + KPI_PAD
        kb = box(slide, kx, ky, kw, KPI_H, fill=BLUE_TINT, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
        kb.adjustments[0] = 0.5
        set_text(kb.text_frame, [[(k, {"size": KPI_PT, "bold": True, "color": BLUE})]], KPI_PT, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        kx += kw + KPI_GAP; total += kw + KPI_GAP
    FIT.append((tag + " kpis", total - KPI_GAP, rw))
    sy = COL_Y + 260000 + KPI_H + 120000
    stx = s.get("text", "")
    tb = box(slide, rx, sy, rw, COL_B - sy)
    tb.text_frame.word_wrap = True
    set_text(tb.text_frame, [[(stx, {"size": CASE_PT})]], CASE_PT, line_spacing=1.1)
    s_need = block_fit(tag + " solution", [[(stx, False)]], rw, COL_B - sy, CASE_PT)
    # both rules stop at the shared column bottom, so the two accents are the same length on every case slide (rule 2)
    bar_b = BAND_Y - BAND_GAP
    box(slide, X0, COL_Y, BAR_W, bar_b - COL_Y, fill=RED)
    box(slide, COL_R_X, COL_Y, BAR_W, bar_b - COL_Y, fill=BLUE)

    # diagram band: source panel · in/out arrows · the OCI container (app ↔ engine); colour = who owns the layer.
    # top and height come from the pre-pass, so all six case slides share one band and one inner box height (rule 2)
    band_y, band_h = BAND_Y, BAND_H
    FIT.append((tag + " band", band_y + band_h, PROOF_HAIR_Y))
    d = case.get("diagram", {}); src = d.get("source", {})
    box(slide, X0, band_y, SRC_W, band_h, fill=PANEL, line=HAIR)                # the source panel, headed like the OCI container
    shb = box(slide, X0, band_y + 90000, SRC_W, 200000)
    set_text(shb.text_frame, [[(SRC_HEAD, {"size": 8, "color": FOOT, "font": MONO_FONT, "spc": 150})]], 8, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    FIT.append((tag + " src header", text_w(SRC_HEAD, 8, mono=True) + spc_w(SRC_HEAD, 150), SRC_W))
    # name / sub sit in the middle of what is left below the header — the same centre line as the app and engine boxes
    stack_box(slide, X0, band_y + HEAD_BAND_H, SRC_W, band_h - HEAD_BAND_H, src.get("name", ""), src.get("sub", ""))
    zx1 = X0 + SRC_W + ARROW_PAD; zx2 = CONT_X - ARROW_PAD; zw = zx2 - zx1
    mid = band_y + band_h // 2
    arrow(slide, zx1, zx2, mid - 230000, d.get("in", ""), zw)                 # source → OCI
    arrow(slide, zx2, zx1, mid + 230000, d.get("out", ""), zw)                # OCI → source (drawn backwards: head on the left)
    box(slide, CONT_X, band_y, CONT_W, band_h, fill=BLUE_TINT, line=BLUE)     # the Oracle cloud the case runs in
    hb = box(slide, CONT_X, band_y + 90000, CONT_W, 200000)
    head = d.get("oci_header", "")
    set_text(hb.text_frame, [[(head, {"size": 8, "color": BLUE, "font": MONO_FONT, "spc": 150})]], 8, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    FIT.append((tag + " oci header", text_w(head, 8, mono=True) + spc_w(head, 150), CONT_W))
    iy = band_y + HEAD_BAND_H + BAND_PAD
    ih = band_h - HEAD_BAND_H - 2 * BAND_PAD
    ax = CONT_X + 150000; ex = CONT_X + CONT_W - 150000 - INNER_W
    app = d.get("app", {}); eng = d.get("engine", {})
    eng_cap, eng_col = ENGINE_OWNER.get(eng.get("name", ""), ("NVIDIA", GREEN))
    stack_box(slide, ax, iy, INNER_W, ih, app.get("name", ""), app.get("sub", ""), fill=WHITE, line=HAIR, caption=APP_CAPTION, bar=ORANGE)
    stack_box(slide, ex, iy, INNER_W, ih, eng.get("name", ""), eng.get("sub", ""), fill=WHITE, line=HAIR, caption=eng_cap, bar=eng_col)
    gx, gw = ax + INNER_W, ex - (ax + INNER_W)                                 # the gap the two-way arrow lives in
    ay = iy + (ih - 140000) // 2
    box(slide, gx + (gw - 420000) // 2, ay, 420000, 140000, fill=FOOT, shape=MSO_SHAPE.LEFT_RIGHT_ARROW)
    flow_label(slide, gx, gw, ay - FLOW_LBL_GAP - FLOW_LBL_H, "requests", tag)  # what the app sends…
    flow_label(slide, gx, gw, ay + 140000 + FLOW_LBL_GAP, "results", tag)       # …and what comes back

    # proof strip
    rule(slide, X0, PROOF_HAIR_Y, W)
    sec_label(slide, X0, PROOF_Y, PROOF_LBL_W, "PROOF & DEMAND", color=BLUE)
    pr = case.get("proof", "")
    prb = box(slide, X0 + 1700000, PROOF_Y, W - 1700000, PROOF_H)
    prb.text_frame.word_wrap = True
    set_text(prb.text_frame, [[(pr, {"size": DIA_SUB_PT, "color": FOOT})]], DIA_SUB_PT, line_spacing=1.1)
    lines = max(1, -(-int(text_w(pr, DIA_SUB_PT) * 1.1) // (W - 1700000)))
    FIT.append((tag + " proof (%d lines)" % lines, lines, 2))
    owner_legend(slide, eng_col)


CRIT_TXT_PT = 6.5      # the one criterion whose slot is a caption, not a tag: sized to clear the empty pill in the card


def render_criteria(slide, d, title_txbody):
    """slide 1 — how the use cases were selected: four criterion panels (each pointing at the map tag that evidences it)
    over a matrix scoring the highlighted cases (dot filled = strong · outlined = partial · empty = none; evidence per cell)"""
    set_header(slide, d["title"], title_txbody)
    crit = d["criteria"]; n = len(crit)
    gap = 200000
    cw = (W - gap * (n - 1)) // n
    ch = 1300000
    y = TOP
    x = X0
    inner = cw - 2 * PAD_X
    for c in crit:
        box(slide, x, y, cw, ch, fill=PANEL, line=HAIR)
        hy = y + PAD_TOP
        b = box(slide, x + PAD_X, hy + 30000, BADGE, BADGE, fill=WHITE, line=INK, line_w=12700, shape=MSO_SHAPE.OVAL)
        set_text(b.text_frame, [[(c["n"], {"bold": True, "size": 9})]], 9, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        nx = x + PAD_X + BADGE + 60000
        nb = box(slide, nx, hy, x + cw - PAD_X - nx, 380000)
        nb.text_frame.word_wrap = True
        set_text(nb.text_frame, [[(c["name"], {"bold": True, "size": 11})]], 11, anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.0)
        block_fit("crit %s name" % c["n"], [[(c["name"], True)]], x + cw - PAD_X - nx, 380000, 11)
        db = box(slide, x + PAD_X, hy + 360000, inner, 420000)
        db.text_frame.word_wrap = True
        set_text(db.text_frame, [[(c["desc"], {"size": DESC_PT, "color": FOOT})]], DESC_PT, line_spacing=1.1)
        block_fit("crit %s desc" % c["n"], [[(c["desc"], False)]], inner, 420000, DESC_PT)
        sy = y + ch - PAD_BOTTOM - TAG_H - 30000                      # "On the map:" + the map's own tag samples
        lw = text_w("On the map:", 7.5, mono=True) + 20000
        lb = box(slide, x + PAD_X, sy - 10000, lw, TAG_H + 20000)
        set_text(lb.text_frame, [[("On the map:", {"size": 7.5, "color": GREY_LBL, "font": MONO_FONT})]], 7.5, anchor=MSO_ANCHOR.MIDDLE)
        sx = x + PAD_X + lw + 60000
        for s in c["samples"]:
            kind, _, val = s.partition(":")
            if kind == "ft":
                ft_pill(slide, sx, sy, val); sx += FT_W + PILL_GAP
            elif kind == "oracle":
                oracle_pill(slide, sx, sy, val); sx += ora_w(val) + PILL_GAP
            elif kind == "demand":
                demand_pill(slide, sx, sy, val); sx += DEM_W + PILL_GAP
            elif kind == "chips":
                sx = stack_chips(slide, sx, sy, "aiq", True, True) + PILL_GAP
            elif kind == "ghost":                             # this criterion puts no tag on the map — the empty slot says so (rule 3)
                ghost_pill(slide, sx, sy); sx += DEM_W + PILL_GAP
            elif kind == "text":
                tb = box(slide, sx, sy - 10000, x + cw - PAD_X - sx, TAG_H + 20000)
                set_text(tb.text_frame, [[(val, {"size": CRIT_TXT_PT, "font": MONO_FONT})]], CRIT_TXT_PT, anchor=MSO_ANCHOR.MIDDLE)
                FIT.append(("crit %s sample" % c["n"], text_w(val, CRIT_TXT_PT, mono=True), x + cw - PAD_X - sx))
        FIT.append(("crit %s samples" % c["n"], sx - PILL_GAP - (x + PAD_X), inner))
        x += cw + gap
    # the matrix: highlighted cases × criteria
    my = y + ch + 200000
    label_w = 2450000
    col_w = (W - label_w) // n
    hdr_h = 200000
    rows = d["rows"]
    rh = (BOTTOM - my - hdr_h) // len(rows)
    for j, c in enumerate(crit):
        hb = box(slide, X0 + label_w + j * col_w, my, col_w, hdr_h)
        set_text(hb.text_frame, [[(c["short"], {"size": 7.5, "font": MONO_FONT, "color": GREY_LBL, "spc": 100})]], 7.5, anchor=MSO_ANCHOR.MIDDLE)
    rule(slide, X0, my + hdr_h, W)
    dot = 120000
    for i, r in enumerate(rows):
        ry = my + hdr_h + i * rh
        if i:
            rule(slide, X0, ry, W, color=RGBColor(0xE6, 0xE7, 0xEA))
        ft, ln = HL[r["hl"]]                                          # the map's highlight colour links the row to the map
        pill(slide, X0, ry + (rh - TAG_H) // 2, FT_W, r["num"], fill=ft, line=ln, color=INK, bold=True, shape=MSO_SHAPE.RECTANGLE, line_w=12700, font=BODY_FONT, pt=8.5)
        nb = box(slide, X0 + FT_W + 60000, ry, label_w - FT_W - 60000, rh)
        set_text(nb.text_frame, [[(r["name"], {"size": NAME_PT, "bold": True})]], NAME_PT, anchor=MSO_ANCHOR.MIDDLE)
        FIT.append(("crit row " + r["num"], text_w(r["name"], NAME_PT, True), label_w - FT_W - 60000))
        for j, (status, text) in enumerate(r["cells"]):
            cx = X0 + label_w + j * col_w
            dy = ry + (rh - dot) // 2
            if status == "strong":
                box(slide, cx, dy, dot, dot, fill=FOOT, shape=MSO_SHAPE.OVAL)
            elif status == "partial":
                box(slide, cx, dy, dot, dot, fill=WHITE, line=FOOT, line_w=12700, shape=MSO_SHAPE.OVAL)
            else:                                             # empty: a mid-grey ring, so the state reads as a state, not a print flaw
                box(slide, cx, dy, dot, dot, fill=None, line=GREY_MID, line_w=12700, shape=MSO_SHAPE.OVAL)
            tw = col_w - dot - 140000
            tb = box(slide, cx + dot + 60000, ry, tw, rh)
            cell_col = INK if status == "strong" else (FOOT if status == "partial" else GREY_LBL)
            set_text(tb.text_frame, [[(text, {"size": 8.5, "color": cell_col})]], 8.5, anchor=MSO_ANCHOR.MIDDLE)
            FIT.append(("crit cell %s/%d" % (r["num"], j + 1), text_w(text, 8.5), tw))
    rule(slide, X0, EV_HAIR_Y, W)
    footnote(slide, EV_NOTE_Y, d["note"])


# ---- next-steps slide --------------------------------------------------------------------------------------------
NX_GAP, NX_BOTTOM = 200000, EV_HAIR_Y - 200000              # air between the two blocks · where the last block ends
NX_Q_PT, NX_A_PT = 10.5, 9


def nx_pitch(d):
    """ONE row pitch for both blocks, sized so the two of them fill the band from TOP to NX_BOTTOM (no dead strip
    above the footnote hairline). Each row is two lines: the question, then what its answer changes."""
    chrome = PAD_TOP + HEAD_H + HEAD_GAP + PAD_BOTTOM
    blocks = d["blocks"]
    rows = sum(len(b["rows"]) for b in blocks)
    return (NX_BOTTOM - TOP - NX_GAP * (len(blocks) - 1) - chrome * len(blocks)) // rows


def render_next(slide, d, title_txbody):
    """closing slide — the discovery questions and what each answer changes, in the evidence-slide idiom:
    a badged container per step, a plain-language line, then question / consequence rows on hairlines"""
    set_header(slide, d["title"], title_txbody)
    chrome = PAD_TOP + HEAD_H + HEAD_GAP + PAD_BOTTOM
    inner_w = W - 2 * PAD_X
    row_h = nx_pitch(d)
    y = TOP
    for blk in d["blocks"]:
        rows = blk["rows"]
        h = chrome + row_h * len(rows)
        iy = container(slide, X0, y, W, h, blk["name"], desc=blk["desc"], badge_text=blk["badge"])
        for j, r in enumerate(rows):
            ry = iy + j * row_h
            qb = box(slide, X0 + PAD_X, ry, inner_w, row_h)
            qb.text_frame.word_wrap = True
            set_text(qb.text_frame, [[(r["q"], {"size": NX_Q_PT, "bold": True})], [(r["a"], {"size": NX_A_PT, "color": FOOT})]],
                     NX_Q_PT, anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.0)
            qb.text_frame.paragraphs[0].space_after = Pt(4)   # the answer hangs off its question, not a second row
            FIT.append(("next q " + r["q"][:14], text_w(r["q"], NX_Q_PT, True), inner_w))
            FIT.append(("next a " + r["a"][:14], text_w(r["a"], NX_A_PT), inner_w))
            if j:
                rule(slide, X0 + PAD_X, ry, inner_w, color=RGBColor(0xE6, 0xE7, 0xEA))
        y += h + NX_GAP
        FIT.append(("next block " + blk["name"][:12] + " bottom", y - NX_GAP, NX_BOTTOM))
    rule(slide, X0, EV_HAIR_Y, W)
    footnote(slide, EV_NOTE_Y, d["note"])


prs = Presentation(str(BASE))
base_slide = prs.slides[0]
layout = base_slide.slide_layout
title_txbody = None; sldnum = None
for sh in base_slide.shapes:
    if sh.is_placeholder and "TITLE" in str(sh.placeholder_format.type):
        title_txbody = copy.deepcopy(sh._element.txBody)
    if sh.is_placeholder and "SLIDE_NUMBER" in str(sh.placeholder_format.type):
        sldnum = sh._element                               # the base slide carries a number; every added slide gets a copy

# slide 1 = the base slide, stripped of its placeholder table + footnote
for sh in list(base_slide.shapes):
    if sh.shape_type == 19 or sh.name == "Footnote":
        sh._element.getparent().remove(sh._element)
CASES = {c["num"]: c for c in DATA["case_slides"]}
VIEWS = [v for v in DATA["views"] if v.get("kind") != "case" or v["num"] in CASES]   # a case view with no data draws no slide
VIEWS += [{"key": "case-" + c["num"], "kind": "case", "num": c["num"]}              # …and a case with no view still gets one
          for c in DATA["case_slides"] if not any(v.get("num") == c["num"] for v in VIEWS)]

slides = [base_slide]
for _ in VIEWS[1:]:
    s = prs.slides.add_slide(layout)
    for sh in list(s.shapes):
        if sh.is_placeholder and "OBJECT" in str(sh.placeholder_format.type):
            sh._element.getparent().remove(sh._element)
    if sldnum is not None:
        el = copy.deepcopy(sldnum)
        el.nvSpPr.cNvPr.id = s.shapes._next_shape_id       # unique shape id — a duplicate makes PowerPoint "repair" the file
        s.shapes._spTree.append(el)
    slides.append(s)

POS = {v["key"]: i + 1 for i, v in enumerate(VIEWS)}       # slide number per view — the footnote cross-references use these
NOTE = DATA["note"].format(**POS)

for slide, view in zip(slides, VIEWS):
    kind = view.get("kind", "map")
    if kind == "map":
        render_map(slide, view, title_txbody)
    elif kind == "demand":
        render_rows(slide, DATA["demand_slide"], title_txbody, "demand")
    elif kind == "ft":
        render_rows(slide, DATA["ft_slide"], title_txbody, "ft", wrap=True)
    elif kind == "case":
        render_case(slide, CASES[view["num"]], title_txbody)
    elif kind == "criteria":
        render_criteria(slide, DATA["criteria_slide"], title_txbody)
    elif kind == "next":
        render_next(slide, DATA["next_slide"], title_txbody)

prs.save(str(OUT))

# QA twin with metric-similar open fonts (Replica ≈ Helvetica widths → Liberation Sans) — headless renders only, never delivered
qa = OUT.with_name(OUT.stem + "-qa.pptx")
with zipfile.ZipFile(OUT) as zin, zipfile.ZipFile(qa, "w", zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename.endswith(".xml"):
            data = data.replace(b'typeface="ReplicaLLTT-Regular"', b'typeface="Liberation Sans"').replace(b'typeface="Roboto Mono"', b'typeface="Liberation Mono"')
        zout.writestr(item, data)

print("saved", OUT.name, "+ QA twin | map rows", N_ROWS, "| row_h", ROW_H, "| tile_h", TILE_H, "| slides", len(slides))
seen = set()
for label, need, have in FIT:
    if label in seen: continue
    seen.add(label)
    flag = "  OVERFLOW" if need > have else ""
    if flag or label.startswith(("desc", "key", "body", "case", "next")):
        print(f"  {label:26} need {need:>8} have {have:>8}{flag}")
