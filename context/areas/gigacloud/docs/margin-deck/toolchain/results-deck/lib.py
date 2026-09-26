# -*- coding: utf-8 -*-
"""Helper library for the GigaCloud margin-results deck (2x-scale GigaCloud template)."""
from pptx.util import Emu
from pptx.enum.shapes import MSO_SHAPE, MSO_CONNECTOR
from pptx.enum.text import MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.oxml.ns import qn
from lxml import etree

IN = 914400
W_IN, H_IN = 24387175 / IN, 13716000 / IN        # 26.667 x 15.0
XL = 1955800 / IN                                  # 2.139  left content edge
XR = W_IN - XL                                     # 24.528 right content edge
CW = XR - XL                                       # 22.389
SAFE_R = 21.80                                     # one content right edge for every slide (clear of the logomark)
LOGO_Y = 10.90
CWC = SAFE_R - XL                                  # 19.661 content width
CW_SAFE = CWC

RED, RED_L = 'C00000', 'E06666'
INK, GREY, MID, LTGREY = '101010', '595959', '7F7F7F', 'BFBFBF'
LINE, PANEL, WHITE = 'E3E3E3', 'F4F4F4', 'FFFFFF'
# tree (sticky-note) palette, sampled from Alex's Miro drawing
BUD = ('FDF59D', 'FFF8AC')
TYP = ('FDE66C', 'FFEB80')
BKT = ('FDB474', 'FFC08A')
PRD = ('69DE8C', '7FE59D')
CMP = ('B2E45F', 'BEEA77')
CHIP = 'FFDC4A'
CHIP_LN = 'D9B52C'
TXT = '1A1A1A'
TREE_LN = '8C8C8C'

FB = 'e-Ukraine Bold'
FL = 'e-Ukraine Light'
XML_SPACE = '{http://www.w3.org/XML/1998/namespace}space'


def E(v):
    return Emu(int(round(v * IN)))


# ---------------------------------------------------------------- text
def R(t, sz=1700, font=FL, color=INK, bold=False, italic=False, keep=True):
    return dict(t=t, sz=sz, font=font, color=color, bold=bold, italic=italic, keep=keep)


def P(runs, align=None, spc_bef=None, spc_aft=None, ln=None, bullet=None, marL=None, indent=None):
    if isinstance(runs, dict):
        runs = [runs]
    return dict(runs=runs, align=align, spc_bef=spc_bef, spc_aft=spc_aft, ln=ln,
                bullet=bullet, marL=marL, indent=indent)


NB_RULES = [('1 шт.', '1\u00a0шт.'), ('1 грн', '1\u00a0грн'), ('Direct COGS', 'Direct\u00a0COGS'),
            ('Indirect COGS', 'Indirect\u00a0COGS'), ('add-on', 'add\u2011on'), ('60 %', '60\u00a0%'),
            ('1 білінговий', '1\u00a0білінговий'), ('1 цикл', '1\u00a0цикл')]


def nb(t):
    for a, b in NB_RULES:
        t = t.replace(a, b)
    return t


def make_p(spec):
    p = etree.Element(qn('a:p'))
    pPr = etree.SubElement(p, qn('a:pPr'))
    if spec['align']:
        pPr.set('algn', spec['align'])
    if spec['marL'] is not None:
        pPr.set('marL', str(int(spec['marL'] * IN)))
    if spec['indent'] is not None:
        pPr.set('indent', str(int(spec['indent'] * IN)))
    if spec['ln']:
        ln = etree.SubElement(pPr, qn('a:lnSpc'))
        etree.SubElement(ln, qn('a:spcPts')).set('val', str(int(spec['ln'])))
    for key, tag in (('spc_bef', 'a:spcBef'), ('spc_aft', 'a:spcAft')):
        if spec[key]:
            el = etree.SubElement(pPr, qn(tag))
            etree.SubElement(el, qn('a:spcPts')).set('val', str(int(spec[key])))
    if spec['bullet']:
        if spec['marL'] is None:
            pPr.set('marL', str(int(0.30 * IN)))
        if spec['indent'] is None:
            pPr.set('indent', str(int(-0.30 * IN)))
        etree.SubElement(pPr, qn('a:buFont')).set('typeface', 'Arial')
        etree.SubElement(pPr, qn('a:buChar')).set('char', spec['bullet'])
    else:
        etree.SubElement(pPr, qn('a:buNone'))
    for r in spec['runs']:
        rEl = etree.SubElement(p, qn('a:r'))
        rPr = etree.SubElement(rEl, qn('a:rPr'))
        rPr.set('lang', 'uk-UA')
        rPr.set('sz', str(int(r['sz'])))
        rPr.set('dirty', '0')
        if r['bold']:
            rPr.set('b', '1')
        if r['italic']:
            rPr.set('i', '1')
        fill = etree.SubElement(rPr, qn('a:solidFill'))
        etree.SubElement(fill, qn('a:srgbClr')).set('val', r['color'])
        etree.SubElement(rPr, qn('a:latin')).set('typeface', r['font'])
        etree.SubElement(rPr, qn('a:cs')).set('typeface', r['font'])
        tEl = etree.SubElement(rEl, qn('a:t'))
        tEl.text = nb(r['t']) if r.get('keep', True) else r['t']
        if r['t'] != r['t'].strip():
            tEl.set(XML_SPACE, 'preserve')
    return p


def set_paras(owner, paras, anchor='t', wrap=True, ins=(0, 0, 0, 0)):
    txBody = owner.text_frame._txBody
    for p in txBody.findall(qn('a:p')):
        txBody.remove(p)
    bodyPr = txBody.find(qn('a:bodyPr'))
    for k, v in zip(('lIns', 'tIns', 'rIns', 'bIns'), ins):
        bodyPr.set(k, str(int(v * IN)))
    bodyPr.set('wrap', 'square' if wrap else 'none')
    bodyPr.set('anchor', {'t': 't', 'm': 'ctr', 'b': 'b'}[anchor])
    for tag in ('a:normAutofit', 'a:spAutoFit', 'a:noAutofit'):
        f = bodyPr.find(qn(tag))
        if f is not None:
            bodyPr.remove(f)
    etree.SubElement(bodyPr, qn('a:noAutofit'))
    for spec in paras:
        txBody.append(make_p(spec))


def add_box(slide, x, y, w, h, paras, anchor='t', wrap=True, ins=(0, 0, 0, 0)):
    tb = slide.shapes.add_textbox(E(x), E(y), E(w), E(h))
    set_paras(tb, paras, anchor=anchor, wrap=wrap, ins=ins)
    return tb


def text_w(s, sz, font=FL):
    """Rough rendered width (inches) of a one-line string in e-Ukraine."""
    per = 0.0089 if font == FB else 0.0083
    return len(s) * per * sz / 100.0


# ---------------------------------------------------------------- shapes
def _spPr_style(sh, fill_xml=None, ln_xml=None, effect_xml=None):
    spPr = sh._element.spPr
    for tag in ('a:noFill', 'a:solidFill', 'a:gradFill', 'a:blipFill', 'a:pattFill', 'a:ln', 'a:effectLst'):
        for el in spPr.findall(qn(tag)):
            spPr.remove(el)
    anchor = spPr.find(qn('a:prstGeom'))
    if anchor is None:
        anchor = spPr.find(qn('a:xfrm'))
    idx = list(spPr).index(anchor) + 1
    for xml in (fill_xml, ln_xml, effect_xml):
        if xml is None:
            continue
        el = etree.fromstring(xml)
        spPr.insert(idx, el)
        idx += 1


NS = 'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"'


def fill_xml(color):
    if color is None:
        return f'<a:noFill {NS}/>'
    return f'<a:solidFill {NS}><a:srgbClr val="{color}"/></a:solidFill>'


def grad_xml(top, bot):
    return (f'<a:gradFill {NS} rotWithShape="1"><a:gsLst>'
            f'<a:gs pos="0"><a:srgbClr val="{top}"/></a:gs>'
            f'<a:gs pos="100000"><a:srgbClr val="{bot}"/></a:gs>'
            f'</a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill>')


def ln_xml(color=None, w_pt=1.0, dash=None, head=None, tail=None):
    if color is None:
        return f'<a:ln {NS}><a:noFill/></a:ln>'
    d = f'<a:prstDash val="{dash}"/>' if dash else ''
    h = f'<a:headEnd type="{head}" w="med" len="med"/>' if head else ''
    t = f'<a:tailEnd type="{tail}" w="med" len="med"/>' if tail else ''
    return (f'<a:ln {NS} w="{int(w_pt * 12700)}" cap="flat"><a:solidFill><a:srgbClr val="{color}"/></a:solidFill>'
            f'{d}<a:round/>{h}{t}</a:ln>')


def shadow_xml(alpha=22000, blur_pt=5, dist_pt=2.5):
    return (f'<a:effectLst {NS}><a:outerShdw blurRad="{int(blur_pt * 12700)}" dist="{int(dist_pt * 12700)}" '
            f'dir="5400000" algn="t" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="{alpha}"/></a:srgbClr>'
            f'</a:outerShdw></a:effectLst>')


NO_FX = f'<a:effectLst {NS}/>'


def add_shape(slide, kind, x, y, w, h, fill=WHITE, line=None, line_w=1.0, dash=None,
              radius=None, grad=None, shadow=False):
    shp = slide.shapes.add_shape(kind, E(x), E(y), E(w), E(h))
    if radius is not None:
        shp.adjustments[0] = radius
    _spPr_style(shp,
                grad_xml(*grad) if grad else fill_xml(fill),
                ln_xml(line, line_w, dash),
                shadow_xml() if shadow else NO_FX)
    set_paras(shp, [P(R('', sz=200))])
    return shp


def rect(slide, x, y, w, h, fill=WHITE, line=None, **kw):
    return add_shape(slide, MSO_SHAPE.RECTANGLE, x, y, w, h, fill=fill, line=line, **kw)


def card(slide, x, y, w, h, fill=WHITE, line=LINE, radius=0.06, **kw):
    return add_shape(slide, MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h, fill=fill, line=line,
                     radius=radius, **kw)


def add_line(slide, x1, y1, x2, y2, color=TREE_LN, w_pt=1.0, dash=None, tail=None, head=None):
    c = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, E(x1), E(y1), E(x2), E(y2))
    spPr = c._element.spPr
    for el in spPr.findall(qn('a:ln')):
        spPr.remove(el)
    spPr.append(etree.fromstring(ln_xml(color, w_pt, dash, head=head, tail=tail)))
    return c


def chip(slide, x, y, text, sz=1500, fill=WHITE, color=INK, line=LTGREY, font=FL, h=None,
         padx=0.20, w=None, radius=0.5, line_w=1.0, align='ctr', max_w=None):
    h = h or (sz / 100.0) * 0.0305 + 0.16
    w = w or text_w(text, sz, font) + 2 * padx
    while max_w and w > max_w and sz > 1000:          # never let a chip spill out of its container
        sz -= 50
        w = text_w(text, sz, font) + 2 * padx
    s = add_shape(slide, MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h, fill=fill, line=line,
                  line_w=line_w, radius=radius)
    set_paras(s, [P(R(text, sz=sz, font=font, color=color), align=align)], anchor='m',
              wrap=False, ins=(0.02, 0, 0.02, 0))
    return s, w


def chips_flow(slide, x, y, max_w, items, sz=1500, gap=0.14, row_gap=0.12, **kw):
    """Lay chips left->right, wrapping inside max_w. Returns bottom y."""
    cx, cy = x, y
    h = (sz / 100.0) * 0.0305 + 0.16
    for it in items:
        w = text_w(it, sz, kw.get('font', FL)) + 2 * kw.get('padx', 0.20)
        if cx > x and cx + w > x + max_w:
            cx = x
            cy += h + row_gap
        chip(slide, cx, cy, it, sz=sz, h=h, **kw)
        cx += w + gap
    return cy + h


def badge(slide, x, y, n, d=0.62, sz=2000, color=INK, line=INK, fill=WHITE):
    s = add_shape(slide, MSO_SHAPE.OVAL, x, y, d, d, fill=fill, line=line, line_w=1.5)
    set_paras(s, [P(R(str(n), sz=sz, font=FB, color=color), align='ctr')], anchor='m', wrap=False)
    return s


def callout(slide, x, y, w, h, lead, text, sz=1900, lead_color=RED):
    c = card(slide, x, y, w, h, fill=PANEL, line=None, radius=0.12)
    runs = [R(lead, sz=sz, font=FB, color=lead_color)]
    if isinstance(text, list):
        runs += text
    else:
        runs.append(R(text, sz=sz, font=FL, color=INK))
    set_paras(c, [P(runs, ln=int(sz * 1.3))], anchor='m', ins=(0.35, 0.10, 0.35, 0.10))
    return c


# ---------------------------------------------------------------- tables
def add_table(slide, x, y, col_w, row_h):
    gf = slide.shapes.add_table(len(row_h), len(col_w), E(x), E(y), E(sum(col_w)), E(sum(row_h)))
    tbl = gf.table
    tblPr = tbl._tbl.find(qn('a:tblPr'))
    tblPr.set('firstRow', '0')
    tblPr.set('bandRow', '0')
    for i, w in enumerate(col_w):
        tbl.columns[i].width = E(w)
    for i, h in enumerate(row_h):
        tbl.rows[i].height = E(h)
    return gf, tbl


def cell_set(cell, paras, fill=WHITE, anchor='m', mL=0.10, mR=0.10, mT=0.05, mB=0.05):
    if fill is None:
        cell.fill.background()
    else:
        cell.fill.solid()
        cell.fill.fore_color.rgb = RGBColor.from_string(fill)
    cell.vertical_anchor = {'t': MSO_ANCHOR.TOP, 'm': MSO_ANCHOR.MIDDLE, 'b': MSO_ANCHOR.BOTTOM}[anchor]
    cell.margin_left, cell.margin_right = E(mL), E(mR)
    cell.margin_top, cell.margin_bottom = E(mT), E(mB)
    txBody = cell._tc.find(qn('a:txBody'))
    for p in txBody.findall(qn('a:p')):
        txBody.remove(p)
    if isinstance(paras, dict):
        paras = [paras]
    for spec in paras:
        txBody.append(make_p(spec))


def cell_borders(cell, color=LINE, w_pt=0.75, edges='lrtb'):
    tcPr = cell._tc.get_or_add_tcPr()
    tags = {'l': 'a:lnL', 'r': 'a:lnR', 't': 'a:lnT', 'b': 'a:lnB'}
    for t in tags.values():
        for old in tcPr.findall(qn(t)):
            tcPr.remove(old)
    new = []
    for k in 'lrtb':
        ln = etree.Element(qn(tags[k]))
        if k in edges and color:
            ln.set('w', str(int(w_pt * 12700)))
            ln.set('cap', 'flat')
            f = etree.SubElement(ln, qn('a:solidFill'))
            etree.SubElement(f, qn('a:srgbClr')).set('val', color)
        else:
            ln.set('w', '0')
            etree.SubElement(ln, qn('a:noFill'))
        new.append(ln)
    for i, ln in enumerate(new):
        tcPr.insert(i, ln)


def all_borders(tbl, color=LINE, w_pt=0.75):
    for r in range(len(tbl.rows)):
        for c in range(len(tbl.columns)):
            cell_borders(tbl.cell(r, c), color, w_pt)


def TX(t, sz=1600, color=INK, align='l', font=FL, bold=False, ln=None, italic=False):
    return P(R(t, sz=sz, font=FB if bold else font, color=color, italic=italic), align=align,
             ln=ln or int(sz * 1.22))


# ---------------------------------------------------------------- numbers (UA)
NB = ' '


def fint(v):
    s = f"{int(round(v)):,}".replace(',', NB)
    return s.replace('-', '−')


def fdec(v, d=2):
    s = f"{v:,.{d}f}".replace(',', 'X').replace('.', ',').replace('X', NB)
    return s.replace('-', '−')


def fpct(v, d=0, sign=False):
    s = f"{v * 100:.{d}f}".replace('.', ',')
    if sign and v > 0:
        s = '+' + s
    return s.replace('-', '−') + NB + '%'


def lr_round(vals, total=100):
    """Largest-remainder rounding of shares (0..1) to integer percents summing to total."""
    raw = [v * total for v in vals]
    fl = [int(x) for x in raw]
    rem = total - sum(fl)
    order = sorted(range(len(raw)), key=lambda i: raw[i] - fl[i], reverse=True)
    for i in order[:rem]:
        fl[i] += 1
    return fl


def set_notes(slide, text):
    """The template's notes master has no placeholders, so add a body placeholder when missing."""
    ns = slide.notes_slide
    tf = ns.notes_text_frame
    if tf is None:
        sp_xml = (
            '<p:sp xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" '
            'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">'
            '<p:nvSpPr><p:cNvPr id="3" name="Notes Placeholder 2"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr>'
            '<p:nvPr><p:ph type="body" idx="1"/></p:nvPr></p:nvSpPr>'
            '<p:spPr><a:xfrm><a:off x="685800" y="4400550"/><a:ext cx="5486400" cy="3600450"/></a:xfrm>'
            '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>'
            '<p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:endParaRPr lang="uk-UA"/></a:p></p:txBody></p:sp>')
        ns.shapes._spTree.append(etree.fromstring(sp_xml))
        tf = ns.notes_text_frame
    tf.text = text
