# -*- coding: utf-8 -*-
"""Build GigaCloud margin-calculation action-plan deck from the HR Committee template."""
import copy, shutil
from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.oxml.ns import qn
from lxml import etree

IN = 914400
SLIDE_W = 24387175
SLIDE_H = 13716000
X0 = 1955800            # 2.14" left margin (template)
CW = SLIDE_W - 2 * X0   # 22.39" content width
TITLE_Y = 1133475
RED = 'C00000'
INK = '101010'
GREY = '595959'
LINEGREY = 'E3E3E3'
PANEL = 'F4F4F4'
WHITE = 'FFFFFF'
XLGRID = 'BFBFBF'
HILITE = 'FBEAEA'
FB = 'e-Ukraine Bold'
FL = 'e-Ukraine Light'
XLF = 'Calibri'
XML_SPACE = '{http://www.w3.org/XML/1998/namespace}space'

def E(v_in):
    return int(v_in * IN)

# ---------- paragraph / run builders ----------
def R(t, sz=2000, font=FL, color=INK, bold=False, alpha=None):
    return dict(t=t, sz=sz, font=font, color=color, bold=bold, alpha=alpha)

def P(runs, align=None, spc_bef=None, spc_aft=None, ln_pts=None, bullet=False,
      marL=None, indent=None):
    if isinstance(runs, dict):
        runs = [runs]
    return dict(runs=runs, align=align, spc_bef=spc_bef, spc_aft=spc_aft,
                ln_pts=ln_pts, bullet=bullet, marL=marL, indent=indent)

def make_p(spec):
    p = etree.Element(qn('a:p'))
    pPr = etree.SubElement(p, qn('a:pPr'))
    if spec['align']:
        pPr.set('algn', spec['align'])
    if spec['marL'] is not None:
        pPr.set('marL', str(spec['marL']))
    if spec['indent'] is not None:
        pPr.set('indent', str(spec['indent']))
    if spec['ln_pts']:
        ln = etree.SubElement(pPr, qn('a:lnSpc'))
        etree.SubElement(ln, qn('a:spcPts')).set('val', str(spec['ln_pts']))
    if spec['spc_bef']:
        sb = etree.SubElement(pPr, qn('a:spcBef'))
        etree.SubElement(sb, qn('a:spcPts')).set('val', str(spec['spc_bef']))
    if spec['spc_aft']:
        sa = etree.SubElement(pPr, qn('a:spcAft'))
        etree.SubElement(sa, qn('a:spcPts')).set('val', str(spec['spc_aft']))
    if spec['bullet']:
        if spec['marL'] is None:
            pPr.set('marL', '342900')
        if spec['indent'] is None:
            pPr.set('indent', '-342900')
        bf = etree.SubElement(pPr, qn('a:buFont'))
        bf.set('typeface', 'Arial')
        bc = etree.SubElement(pPr, qn('a:buChar'))
        bc.set('char', '•')
    else:
        etree.SubElement(pPr, qn('a:buNone'))
    for r in spec['runs']:
        rEl = etree.SubElement(p, qn('a:r'))
        rPr = etree.SubElement(rEl, qn('a:rPr'))
        rPr.set('lang', 'uk-UA')
        rPr.set('sz', str(r['sz']))
        rPr.set('dirty', '0')
        if r['bold']:
            rPr.set('b', '1')
        fill = etree.SubElement(rPr, qn('a:solidFill'))
        clr = etree.SubElement(fill, qn('a:srgbClr'))
        clr.set('val', r['color'])
        if r['alpha']:
            etree.SubElement(clr, qn('a:alpha')).set('val', str(r['alpha']))
        lat = etree.SubElement(rPr, qn('a:latin'))
        lat.set('typeface', r['font'])
        tEl = etree.SubElement(rEl, qn('a:t'))
        tEl.text = r['t']
        if r['t'] != r['t'].strip():
            tEl.set(XML_SPACE, 'preserve')
    return p

def set_paras(txBody_owner, paras, word_wrap=True, anchor='t'):
    tf = txBody_owner.text_frame
    txBody = tf._txBody
    for p in txBody.findall(qn('a:p')):
        txBody.remove(p)
    bodyPr = txBody.find(qn('a:bodyPr'))
    for k in ('lIns', 'tIns', 'rIns', 'bIns'):
        bodyPr.set(k, '0')
    bodyPr.set('wrap', 'square' if word_wrap else 'none')
    bodyPr.set('anchor', {'t': 't', 'm': 'ctr', 'b': 'b'}[anchor])
    for tag in ('a:normAutofit', 'a:spAutoFit'):
        f = bodyPr.find(qn(tag))
        if f is not None:
            bodyPr.remove(f)
    for spec in paras:
        txBody.append(make_p(spec))

def add_box(slide, x, y, w, h, paras, anchor='t', wrap=True):
    tb = slide.shapes.add_textbox(Emu(int(x)), Emu(int(y)), Emu(int(w)), Emu(int(h)))
    set_paras(tb, paras, word_wrap=wrap, anchor=anchor)
    return tb

def _set_fill(shape, color, alpha=None):
    shape.fill.solid()
    shape.fill.fore_color.rgb = RGBColor.from_string(color)
    if alpha is not None:
        clr = shape.fill.fore_color._xFill.find(qn('a:srgbClr'))
        etree.SubElement(clr, qn('a:alpha')).set('val', str(alpha))

def _set_line(shape, color=None, w_emu=12700, dash=None):
    ln = shape.line
    if color is None:
        ln.fill.background()
        return
    ln.color.rgb = RGBColor.from_string(color)
    ln.width = Emu(w_emu)
    if dash:
        lnEl = shape._element.spPr.find(qn('a:ln'))
        d = etree.SubElement(lnEl, qn('a:prstDash'))
        d.set('val', dash)

def add_card(slide, x, y, w, h, fill=WHITE, line=LINEGREY, radius=6000,
             dash=None, line_w=12700):
    sh = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE,
                                Emu(int(x)), Emu(int(y)), Emu(int(w)), Emu(int(h)))
    sh.adjustments[0] = radius / 100000
    if fill is None:
        sh.fill.background()
    else:
        _set_fill(sh, fill)
    _set_line(sh, line, w_emu=line_w, dash=dash)
    sh.shadow.inherit = False
    set_paras(sh, [P(R('', sz=200))])
    return sh

def add_rect(slide, x, y, w, h, fill, alpha=None, line=None, dash=None):
    sh = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE,
                                Emu(int(x)), Emu(int(y)), Emu(int(w)), Emu(int(h)))
    if fill is None:
        sh.fill.background()
    else:
        _set_fill(sh, fill, alpha)
    _set_line(sh, line, w_emu=25400, dash=dash)
    sh.shadow.inherit = False
    set_paras(sh, [P(R('', sz=200))])
    return sh

def add_title(slide, text):
    add_box(slide, X0, TITLE_Y, CW, E(1.75),
            [P(R(text, sz=9600, font=FB, color=INK), ln_pts=9600)])

def add_label(slide, text, y, x=X0, sz=4000, color=RED, w=None):
    add_box(slide, x, y, w if w else CW - (x - X0), E(0.62),
            [P(R(text, sz=sz, font=FB, color=color))])

# ---------- table helpers ----------
def add_table(slide, rows, cols, x, y, w, h):
    gf = slide.shapes.add_table(rows, cols, Emu(int(x)), Emu(int(y)),
                                Emu(int(w)), Emu(int(h)))
    tbl = gf.table
    el = tbl._tbl
    tblPr = el.find(qn('a:tblPr'))
    tblPr.set('firstRow', '0')
    tblPr.set('bandRow', '0')
    return gf, tbl

def cell_set(cell, paras, fill=WHITE, anchor='m', mL=0.10, mR=0.10, mT=0.045, mB=0.045):
    if fill is None:
        cell.fill.background()
    else:
        cell.fill.solid()
        cell.fill.fore_color.rgb = RGBColor.from_string(fill)
    cell.vertical_anchor = {'t': MSO_ANCHOR.TOP, 'm': MSO_ANCHOR.MIDDLE,
                            'b': MSO_ANCHOR.BOTTOM}[anchor]
    cell.margin_left = Emu(E(mL))
    cell.margin_right = Emu(E(mR))
    cell.margin_top = Emu(E(mT))
    cell.margin_bottom = Emu(E(mB))
    tc = cell._tc
    txBody = tc.find(qn('a:txBody'))
    for p in txBody.findall(qn('a:p')):
        txBody.remove(p)
    for spec in paras:
        txBody.append(make_p(spec))

def cell_borders(cell, color=LINEGREY, w_emu=9525, edges='lrtb'):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    order = {'l': 'a:lnL', 'r': 'a:lnR', 't': 'a:lnT', 'b': 'a:lnB'}
    for tag in order.values():
        old = tcPr.find(qn(tag))
        if old is not None:
            tcPr.remove(old)
    for key in 'lrtb':
        if key not in edges:
            continue
        ln = etree.SubElement(tcPr, qn(order[key]))
        ln.set('w', str(w_emu))
        ln.set('cap', 'flat')
        fill = etree.SubElement(ln, qn('a:solidFill'))
        etree.SubElement(fill, qn('a:srgbClr')).set('val', color)
    lns = [c for c in tcPr if c.tag in {qn(t) for t in order.values()}]
    for ln in reversed(lns):
        tcPr.remove(ln)
        tcPr.insert(0, ln)
    return cell

def TH(t, sz=1500, color=WHITE, align='ctr', font=None):
    return P(R(t, sz=sz, font=font or FB, color=color), align=align, ln_pts=int(sz*1.12))

def TD(t, sz=1600, color=INK, align='ctr', font=None, bold=False):
    return P(R(t, sz=sz, font=font or FL, color=color, bold=bold),
             align=align, ln_pts=int(sz*1.15))

# ---------- open template ----------
shutil.copy('template.pptx', 'work.pptx')
prs = Presentation('work.pptx')

layout1 = None
for lay in prs.slide_masters[0].slide_layouts:
    if lay.part.partname.endswith('slideLayout1.xml'):
        layout1 = lay
        break
assert layout1 is not None

def new_slide():
    return prs.slides.add_slide(layout1)

# ---------- Slide 1: title (edit in place) ----------
s1 = prs.slides[0]
runs = [r for p in s1.shapes[0].text_frame.paragraphs for r in p.runs]
runs[0].text = 'Маржинальність продуктів'
runs[0].font.size = Pt(78)
runs[1].text = 'План дій із розрахунку юніт-економіки продуктів'
runs[2].text = 'Серпень 2026'
p0 = s1.shapes[0].text_frame.paragraphs[0]._p
ln = p0.find(qn('a:pPr')).find(qn('a:lnSpc'))
ln.find(qn('a:spcPts')).set('val', '8400')

# ---------- Slide 2: Мета і ключові результати ----------
s = new_slide()
add_title(s, 'Мета і ключові результати')
add_label(s, 'Мета', E(3.30))
add_box(s, X0, E(4.05), CW, E(1.9),
        [P([R('Кожна витрата компанії — атрибутована до компонентів продуктів і закладена в ціни. ',
             sz=2600, font=FL, color=INK),
           R('Бачимо реальну маржинальність кожного продукту і керуємо цінами свідомо.',
             sz=2600, font=FB, color=INK)], ln_pts=3400)])
add_label(s, 'Ключові результати', E(6.55))
cards2 = [
    ('01', 'Методологія атрибуції', '4 моделі рознесення витрат, погоджені з фінансами та керівниками відділів'),
    ('02', 'Бейзлайн собівартості', 'Собівартість і маржинальність кожного компонента та продукту'),
    ('03', 'Реальна профітабельність', 'Фактична прибутковість продуктів сьогодні — на основі бейзлайну'),
    ('04', 'Пропозиції щодо цін', 'Перегляд цін там, де маржа не відповідає цільовій'),
    ('05', 'Постійний облік', 'Модель обліку годин і витрат: дашборди, актуальні дані в CRM'),
]
cw2, gap2 = E(4.278), E(0.25)
for i, (num, head, body) in enumerate(cards2):
    cx = X0 + i * (cw2 + gap2)
    add_card(s, cx, E(7.55), cw2, E(3.7))
    add_box(s, cx + E(0.28), E(7.83), cw2 - E(0.56), E(3.15), [
        P(R(num, sz=3600, font=FB, color=RED), ln_pts=3800),
        P(R(head, sz=2000, font=FB, color=INK), spc_bef=500, ln_pts=2300),
        P(R(body, sz=1600, font=FL, color=GREY), spc_bef=400, ln_pts=2000),
    ])

# ---------- Slide 3: складові ціни компонента (2 стовпчики) ----------
s = new_slide()
add_title(s, 'Складові ціни компонента')
C1X, C2X, COLW = E(3.3), E(8.9), E(3.5)
add_box(s, C1X - E(0.5), E(3.15), (C2X + COLW + E(0.5)) - (C1X - E(0.5)), E(0.55),
        [P(R('Ціна компонента', sz=2000, font=FB, color=RED), align='ctr')])
add_box(s, C1X - E(0.3), E(3.78), COLW + E(0.6), E(0.42),
        [P(R('Спрощено', sz=1500, font=FL, color=GREY), align='ctr')])
add_box(s, C2X - E(0.3), E(3.78), COLW + E(0.6), E(0.42),
        [P(R('Повна розбивка', sz=1500, font=FL, color=GREY), align='ctr')])

Y_BOT = 12.55
FAM_GAP = 0.12
families = [  # bottom -> top: (name, total_h, simple_fill(color,alpha), text_color)
    ('Собівартість (COGS)', 3.60, (RED, None), WHITE),
    ('Витрати на збут', 1.90, (GREY, None), WHITE),
    ('Загальні витрати', 1.45, (XLGRID, None), INK),
    ('Прибуток', 1.15, (INK, None), WHITE),
]
# simplified column
yc = Y_BOT
for name, hh, (fc, fa), tcol in families:
    yc -= hh
    r = add_rect(s, C1X, E(yc), COLW, E(hh), fc, alpha=fa)
    set_paras(r, [P(R(name, sz=1600, font=FB, color=tcol), align='ctr', ln_pts=1950)],
              anchor='m')
    yc -= FAM_GAP
# full column: sub-blocks bottom->top per family
SUB_GAP = 0.035
subs = [
    [('Обладнання', 1.13, (RED, 100000), WHITE),
     ('Ліцензії', 0.84, (RED, 86000), WHITE),
     ('Колокейшн', 0.60, (RED, 72000), WHITE),
     ('Канали звʼязку', 0.42, (RED, 58000), WHITE),
     ('ФОТ доставки і супроводу', 0.47, (RED, 44000), INK)],
    [('Sales', 0.94, ('595959', None), WHITE),
     ('Маркетинг', 0.50, ('7F7F7F', None), WHITE),
     ('Інше', 0.39, ('9E9E9E', None), WHITE)],
    [('ФОТ адміністрації', 0.61, ('BFBFBF', None), INK),
     ('Оренда офісу', 0.42, ('D0D0D0', None), INK),
     ('Інше', 0.34, ('DEDEDE', None), INK)],
    [('Прибуток', 1.15, (INK, None), WHITE)],
]
label_rows = []  # (center_y, text)
yc = Y_BOT
for fam, (fam_name, fam_h, _f, _t) in zip(subs, families):
    n = len(fam)
    scale = (fam_h - (n - 1) * SUB_GAP) / sum(x[1] for x in fam)
    for j, (name, hh, (fc, fa), tcol) in enumerate(fam):
        hh = hh * scale
        yc -= hh
        add_rect(s, C2X, E(yc), COLW, E(hh), fc, alpha=fa)
        label_rows.append((yc + hh / 2, name))
        if j < n - 1:
            yc -= SUB_GAP
    yc -= FAM_GAP
for cy, name in label_rows:
    add_box(s, C2X + COLW + E(0.25), E(cy - 0.19), E(3.6), E(0.38),
            [P(R(name, sz=1300, font=FL, color=INK), ln_pts=1500)], anchor='m')
# legend cards right
LGX = E(16.55)
LGW = SLIDE_W - X0 - LGX
leg = [
    (INK, None, 'Прибуток', 'цільова маржа компонента'),
    (XLGRID, None, 'Загальні витрати (General)', 'адміністрація, оренда офісу, інше — модель D'),
    (GREY, None, 'Витрати на збут', 'Sales, Маркетинг, інше — моделі B і C; one-time частина — через customer lifetime'),
    (RED, None, 'Собівартість (COGS)', 'обладнання, ліцензії, колокейшн, канали + ФОТ доставки і супроводу (модель A)'),
]
lh, lgap = 1.72, 0.2
ly = 3.95
for fc, fa, name, desc in leg:
    add_card(s, LGX, E(ly), LGW, E(lh))
    add_rect(s, LGX + E(0.28), E(ly + 0.33), E(0.45), E(0.45), fc, alpha=fa)
    add_box(s, LGX + E(1.0), E(ly + 0.22), LGW - E(1.3), E(lh - 0.4), [
        P(R(name, sz=1700, font=FB, color=INK), ln_pts=2000),
        P(R(desc, sz=1400, font=FL, color=GREY), spc_bef=200, ln_pts=1750),
    ])
    ly += lh + lgap
bar = add_card(s, X0, E(12.95), E(18.9), E(1.25), fill=PANEL, line=None)
set_paras(bar, [P([
    R('Важливо: ', sz=1700, font=FB, color=RED),
    R('one-time витрати (інсталяція, залучення клієнта) розкладаються на customer lifetime; '
      'ongoing — напряму в місячну ціну.', sz=1700, font=FL, color=INK)], ln_pts=2100)],
    anchor='m')
bp = bar.text_frame._txBody.find(qn('a:bodyPr'))
bp.set('lIns', str(E(0.35))); bp.set('rIns', str(E(0.3)))

# ---------- Slide 4: Ключові підходи ----------
s = new_slide()
add_title(s, 'Ключові підходи')
appr = [
    ('01', 'Рахуємо від точки 0',
     'Юніт-економіка продуктів визначається сьогодні — без огляду на попередню історію.'),
    ('02', 'Історичні клієнти — фаза 2',
     'Аналіз маржинальності наявної бази — окремий проєкт; не блокує нову модель.'),
    ('03', 'Всі витрати — в компоненти',
     'Кожна стаття витрат атрибутується до компонентів і в певній пропорції закладається в ціни.'),
    ('04', 'Враховуємо customer lifetime',
     'Витрати на залучення й утримання клієнта розносяться на термін його життя.'),
    ('05', 'ФОТ зростає разом із lifetime',
     'У lifetime закладаємо зростання ФОТ — готові піднімати ціни в разі зростання курсів.'),
    ('06', 'Бейзлайн, потім точність',
     '100% точного обліку немає: фіксуємо бейзлайн, далі покращуємо якість обліку і цифр.'),
]
cw4, gap4 = E(7.197), E(0.4)
ch4 = E(3.0)
for i, (num, head, body) in enumerate(appr):
    r, c = divmod(i, 3)
    cx = X0 + c * (cw4 + gap4)
    cy = E(4.9) + r * (ch4 + E(0.55))
    add_card(s, cx, cy, cw4, ch4)
    add_box(s, cx + E(0.4), cy + E(0.38), cw4 - E(0.8), ch4 - E(0.76), [
        P([R(num + '  ', sz=3000, font=FB, color=RED),
           R(head, sz=2200, font=FB, color=INK)], ln_pts=3200),
        P(R(body, sz=2000, font=FL, color=INK), spc_bef=600, ln_pts=2550),
    ])

# ---------- Slide 5: 4 моделі атрибуції — 3 групи, симетричні картки ----------
s = new_slide()
add_title(s, '4 моделі атрибуції витрат')
CARD_W5 = 4.9
PAD5 = 0.25
IGAP5 = 0.3
X0IN = X0 / IN
CWIN = CW / IN
PW_A = CARD_W5 + 2 * PAD5
PW_BC = 2 * CARD_W5 + IGAP5 + 2 * PAD5
PW_D = CARD_W5 + 2 * PAD5
PGAP5 = (CWIN - PW_A - PW_BC - PW_D) / 2
PY5, HB5 = 3.85, 0.66
CH5 = 6.95
PH5 = HB5 + 0.18 + CH5 + 0.2
panels5 = [
    (X0IN, PW_A, 'Собівартість (COGS)', RED, WHITE),
    (X0IN + PW_A + PGAP5, PW_BC, 'Витрати на збут', GREY, WHITE),
    (X0IN + PW_A + PGAP5 + PW_BC + PGAP5, PW_D, 'Загальні витрати (General)', XLGRID, INK),
]
for px, pw, htxt, hfill, htcol in panels5:
    add_card(s, E(px), E(PY5), E(pw), E(PH5), fill=PANEL, line=None)
    hb = add_rect(s, E(px + 0.06), E(PY5 + 0.06), E(pw - 0.12), E(HB5 - 0.06), hfill)
    set_paras(hb, [P(R(htxt, sz=2000, font=FB, color=htcol), align='ctr')], anchor='m')
models5 = [
    # (panel_x, card_slot, letter, name, example, types[(text,color)], bridge, verify)
    (panels5[0][0], 0, 'A', 'Пряма атрибуція FTE',
     'Delivery, Support — ФОТ доставки і супроводу',
     [('One-time (інсталяція) → на lifetime', INK),
      ('Ongoing (супровід) → у місячну ціну', INK)],
     'Напряму: FTE-частки × ЗП команд = собівартість компонента',
     'Σ витрат на FTE за період ≈ Σ атрибутованого в продажі'),
    (panels5[1][0], 0, 'B', 'Витрати конкретних продуктів',
     'Sales — залучення клієнтів (CAC)',
     [('One-time (новий акаунт) → на lifetime', INK),
      ('Ongoing (Growth team) — відкрите питання, best practice', RED)],
     'Частка компонента в ціні продукту, усереднена за білінгом',
     'План продажів × ставки vs ФОТ відділу'),
    (panels5[1][0], 1, 'C', 'Витрати груп продуктів',
     'ВОК → група Resell',
     [('Ongoing (щомісячні) → у місячну ціну', INK)],
     'Пул ÷ дохід групи → % від ціни кожного компонента групи',
     'Σ по групі за місяць = бюджет відділу'),
    (panels5[2][0], 0, 'D', 'Загальні витрати',
     'CFO, Operations, офіс',
     [('Ongoing (постійні) → розподіл на всі продукти', INK)],
     'Погоджена база (тут — % маржі груп) → % від ціни компонента',
     'Σ розподіленого = загальний пул'),
]
CY5 = PY5 + HB5 + 0.18
for px, slot, let, name, ex, types, bridge, verify in models5:
    cx = px + PAD5 + slot * (CARD_W5 + IGAP5)
    add_card(s, E(cx), E(CY5), E(CARD_W5), E(CH5))
    bx, bw = cx + 0.26, CARD_W5 - 0.52
    add_box(s, E(bx), E(CY5 + 0.20), E(bw), E(0.60),
            [P(R(let, sz=3600, font=FB, color=RED), ln_pts=3700)])
    add_box(s, E(bx), E(CY5 + 0.86), E(bw), E(0.88),
            [P(R(name, sz=2100, font=FB, color=INK), ln_pts=2450)])
    add_box(s, E(bx), E(CY5 + 1.80), E(bw), E(0.72),
            [P(R(ex, sz=1700, font=FL, color=GREY), ln_pts=2050)])
    add_box(s, E(bx), E(CY5 + 2.62), E(bw), E(0.34),
            [P(R('Типи витрат', sz=1600, font=FB, color=RED))])
    tp = [P(R(tt, sz=1800, font=FL, color=cc), bullet=True,
            spc_bef=250, ln_pts=2150) for tt, cc in types]
    add_box(s, E(bx), E(CY5 + 3.00), E(bw), E(1.44), tp)
    add_box(s, E(bx), E(CY5 + 4.52), E(bw), E(0.34),
            [P(R('У ціну компонента', sz=1600, font=FB, color=RED))])
    add_box(s, E(bx), E(CY5 + 4.90), E(bw), E(0.98),
            [P(R(bridge, sz=1800, font=FL, color=INK), ln_pts=2150)])
    add_box(s, E(bx), E(CY5 + 5.94), E(bw), E(0.34),
            [P(R('Перевірка', sz=1600, font=FB, color=RED))])
    add_box(s, E(bx), E(CY5 + 6.30), E(bw), E(0.58),
            [P(R(verify, sz=1700, font=FL, color=INK), ln_pts=2000)])
tie = add_card(s, X0, E(12.15), E(18.9), E(1.3), fill=PANEL, line=None)
set_paras(tie, [P([
    R('Міст до компонента (B, C): ', sz=1700, font=FB, color=RED),
    R('пропорційно частці компонента в ціні продукту чи групи, усередненій за білінгом. '
      'Чому ціна, а не COGS чи маржа: ціни є для всіх компонентів, сума точно повертає пул, '
      'знижки враховуються автоматично.', sz=1700, font=FL, color=INK)], ln_pts=2100)], anchor='m')
bp = tie.text_frame._txBody.find(qn('a:bodyPr'))
bp.set('lIns', str(E(0.35))); bp.set('rIns', str(E(0.3)))

# ---------- Slide 6: зміни у структурі P&L (Excel-мімікрія) ----------
s = new_slide()
add_title(s, 'Зміни у структурі P&L')
add_box(s, X0, E(3.0), CW, E(1.1), [
    P([R('Один рядок P&L може містити витрати різних типів атрибуції. Приклад — ', sz=2000, font=FL, color=INK),
       R('2.1.3 «ЗП Відділ Інформаційної Безпеки»', sz=2000, font=FB, color=INK),
       R(': проєктні години на продукти безпеки — модель B, загальна безпека компанії — модель D.',
         sz=2000, font=FL, color=INK)], ln_pts=2500)])

XL_COLS = ['', 'РАЗОМ', 'АПРЕЛЬ 26', 'МАЙ 26', 'ИЮНЬ 26', 'Attribution', 'Model']
XL_W = [7.1, 2.6, 2.35, 2.35, 2.35, 3.0, 2.64]

def excel_table(slide, y, rows_spec, nrows):
    gf, t = add_table(slide, nrows, 7, X0, y, CW, E(0.58 + 0.62 * (nrows - 1)))
    for i, wdt in enumerate(XL_W):
        t.columns[i].width = Emu(E(wdt))
    t.rows[0].height = Emu(E(0.58))
    for c, name in enumerate(XL_COLS):
        cell_set(t.cell(0, c), [P(R(name, sz=1600, font=XLF, color=INK, bold=True),
                                  align='l' if c == 0 else 'ctr', ln_pts=1850)], fill=PANEL)
    for ri, spec in enumerate(rows_spec, start=1):
        t.rows[ri].height = Emu(E(0.62))
        vals, style = spec['vals'], spec.get('style', 'normal')
        fill = HILITE if style == 'hilite' else WHITE
        for c, v in enumerate(vals):
            if style == 'hilite':
                colr = RED if c >= 5 else INK
                bold = (c == 0 or c >= 5)
            elif style == 'dim':
                colr, bold = GREY, False
            else:
                colr, bold = INK, False
            algn = 'l' if c == 0 else ('r' if 1 <= c <= 4 else 'ctr')
            cell_set(t.cell(ri, c), [P(R(v, sz=1600, font=XLF, color=colr, bold=bold),
                                       align=algn, ln_pts=1850)], fill=fill)
    for ri in range(nrows):
        for ci in range(7):
            cell_borders(t.cell(ri, ci), color=XLGRID, w_emu=6350)
    return t

add_label(s, 'Зараз у файлі — один рядок', E(4.2), sz=1800, color=GREY)
excel_table(s, E(4.78), [
    dict(vals=['2.1.2   ЗП Департамент розвитку продуктів', '2 439 518', '797 000', '815 000', '827 518', '', ''], style='dim'),
    dict(vals=['2.1.3   ЗП Відділ Інформаційної Безпеки', '1 912 936', '610 682', '580 000', '722 254', 'COGS + GENERAL', 'B + D'], style='hilite'),
    dict(vals=['2.1.4   ЗП Відділ білінгу', '1 211 460', '405 760', '402 420', '403 280', '', ''], style='dim'),
], 4)
ar = s.shapes.add_shape(MSO_SHAPE.DOWN_ARROW, Emu(X0 + E(10.5)), Emu(E(7.34)), Emu(E(0.75)), Emu(E(0.65)))
_set_fill(ar, RED)
_set_line(ar, None)
ar.shadow.inherit = False
add_label(s, 'Після — рядок розщеплено за моделями атрибуції', E(8.1), sz=1800, color=GREY)
excel_table(s, E(8.68), [
    dict(vals=['2.1.2   ЗП Департамент розвитку продуктів', '2 439 518', '797 000', '815 000', '827 518', '', ''], style='dim'),
    dict(vals=['2.1.3.1   ЗП ВІБ — проєкти (продукти безпеки)', 'X', '·', '·', '·', 'COGS', 'B'], style='hilite'),
    dict(vals=['2.1.3.2   ЗП ВІБ — загальна безпека', '1 912 936 − X', '·', '·', '·', 'GENERAL', 'D'], style='hilite'),
    dict(vals=['2.1.4   ЗП Відділ білінгу', '1 211 460', '405 760', '402 420', '403 280', '', ''], style='dim'),
], 5)
add_box(s, X0, E(11.95), CW, E(0.5),
        [P([R('X ', sz=1700, font=FB, color=INK),
            R('— пропорція з обліку годин відділу; сьогодні цих даних немає → запроваджуємо облік годин (крок 4 наступних кроків).',
              sz=1700, font=FL, color=GREY)], ln_pts=2050)])
bar = add_card(s, X0, E(12.65), E(18.9), E(1.25), fill=PANEL, line=None)
set_paras(bar, [P([
    R('Висновок: ', sz=1800, font=FB, color=RED),
    R('структуру P&L треба розщепити за типами атрибуції — інакше модель не звести з фінансовою звітністю.',
      sz=1800, font=FL, color=INK)], ln_pts=2200)], anchor='m')
bp = bar.text_frame._txBody.find(qn('a:bodyPr'))
bp.set('lIns', str(E(0.35))); bp.set('rIns', str(E(0.3)))

# ---------- helpers for example slides ----------
def intro(slide, text):
    add_box(slide, X0, E(3.05), CW, E(0.8),
            [P(R(text, sz=2100, font=FL, color=GREY), ln_pts=2500)])

def caption(slide, runs_spec, y=12.95, w=18.9, h=1.35):
    bar = add_card(slide, X0, E(y), E(w), E(h), fill=PANEL, line=None)
    set_paras(bar, [P(runs_spec, ln_pts=1950)], anchor='m')
    bp = bar.text_frame._txBody.find(qn('a:bodyPr'))
    bp.set('lIns', str(E(0.35))); bp.set('rIns', str(E(0.3)))
    return bar

# ---------- Slide 7: Модель A приклад ----------
s = new_slide()
add_title(s, 'Модель A — приклад')
intro(s, 'ФОТ команд доставки і супроводу атрибутується на компоненти через частки FTE.')
COLS7 = ['Компонент', 'Категорія', 'LT, міс',
         'VMware', 'Openstack', 'Network', 'Capacity', 'Monitoring', 'Coord & Ops',
         'L1', 'L2', 'COGS без LT, у.о.', 'COGS з LT, у.о./міс']
w7 = [4.35, 1.85, 1.15, 1.52, 1.62, 1.45, 1.5, 1.68, 1.75, 1.0, 1.0, 1.86, 1.86]
data7 = [
    ['L2 Private Line Kyiv–Lviv, 1 Mbit/s', 'Internet', '48',
     '0,05', '0,05', '0,70', '0,05', '0,05', '0,10', '0,30', '0,70', '11 200', '233'],
    ['Node for Private Cloud on VMware (2×16 cores, 256 GB)', 'VMware nodes', '60',
     '0,60', '0', '0,10', '0,10', '0,10', '0,10', '0,30', '0,70', '12 900', '215'],
    ['vCPU', 'E-Cloud resources', '48',
     '0,60', '0', '0,10', '0,10', '0,10', '0,10', '0,50', '0,50', '12 700', '265'],
    ['…'] + ['…'] * 12,
]
salary7 = ['ЗП, у.о./міс', '', '', '12 000', '10 000', '8 000', '4 000', '4 000',
           '4 000', '3 000', '4 000', '', '']
nrows7 = 3 + len(data7)
gf, t = add_table(s, nrows7, 13, X0, E(4.15), CW, E(6.9))
for i, wdt in enumerate(w7):
    t.columns[i].width = Emu(E(wdt))
t.cell(0, 3).merge(t.cell(0, 8))
t.cell(0, 9).merge(t.cell(0, 10))
t.cell(0, 11).merge(t.cell(0, 12))
for c in (0, 1, 2):
    cell_set(t.cell(0, c), [TH('', sz=1300)], fill=RED)
cell_set(t.cell(0, 3), [TH('Delivery — FTE на компонент', sz=1600)], fill=RED)
cell_set(t.cell(0, 9), [TH('Support — FTE', sz=1600)], fill=RED)
cell_set(t.cell(0, 11), [TH('Собівартість ФОТ', sz=1600)], fill=RED)
for c, name in enumerate(COLS7):
    cell_set(t.cell(1, c), [TH(name, sz=1500, align='l' if c == 0 else 'ctr')], fill=RED)
for c, v in enumerate(salary7):
    cell_set(t.cell(2, c), [TD(v, sz=1600, color=GREY, align='l' if c == 0 else 'ctr')], fill=PANEL)
for ri, row in enumerate(data7):
    for c, v in enumerate(row):
        bold = c >= 11 and v != '…'
        cell_set(t.cell(3 + ri, c),
                 [TD(v, sz=1600 if c == 0 else 1700, align='l' if c == 0 else 'ctr',
                     font=FB if bold else FL, color=INK if v != '…' else GREY)],
                 fill=WHITE)
for ri in range(nrows7):
    for ci in range(13):
        cell_borders(t.cell(ri, ci))
caption(s, [
    R('Механіка: ', sz=1700, font=FB, color=RED),
    R('COGS без LT = Σ (FTE × ЗП команди). One-time частина (інсталяція) розкладається '
      'на customer lifetime → колонка «з LT». Цифри ілюстративні (аркуш Models, блок Model A).',
      sz=1700, font=FL, color=INK)])

# ---------- Slide 8: Модель B приклад ----------
s = new_slide()
add_title(s, 'Модель B — приклад')
intro(s, 'ФОТ каналів продажів атрибутується на продукти і розкладається на кількість продажів (Jul’25–Jul’26).')
COLS8 = ['Продукт', 'LT, міс', 'FTE', 'Продажі', 'FTE', 'Продажі', 'FTE', 'Продажі',
         'CAC без LT, у.о.', 'CAC з LT, у.о./міс']
w8 = [6.7, 1.35, 1.35, 1.62, 1.35, 1.62, 1.35, 1.62, 2.7, 2.73]
data8 = [
    ['Private Cloud on VMware / vSAN', '60', '0', '0', '0,10', '1', '0,40', '5', '320', '5,3'],
    ['Private Cloud on Azure Local', '60', '0', '0', '0,10', '1', '0,20', '2', '350', '5,8'],
    ['Private Cloud on Openstack HCI', '60', '0', '0', '0,05', '0', '0,20', '2', '150', '2,5'],
    ['Public Cloud on VMware', '48', '0,35', '24', '0,40', '30', '0,10', '10', '56', '1,2'],
    ['Public Cloud on Openstack', '36', '0,50', '50', '0,20', '15', '0,05', '10', '44', '1,2'],
    ['MS365 license', '24', '0,10', '12', '0,10', '12', '0,02', '3', '35', '1,5'],
    ['Architect services, 1 год', '1', '0,05', '3', '0,05', '3', '0,03', '3', '65', '65'],
    ['…'] + ['…'] * 9,
]
nrows8 = 3 + len(data8)
gf, t = add_table(s, nrows8, 10, X0, E(4.15), CW, E(7.3))
for i, wdt in enumerate(w8):
    t.columns[i].width = Emu(E(wdt))
t.cell(0, 2).merge(t.cell(0, 3))
t.cell(0, 4).merge(t.cell(0, 5))
t.cell(0, 6).merge(t.cell(0, 7))
t.cell(0, 8).merge(t.cell(0, 9))
cell_set(t.cell(0, 0), [TH('', sz=1300)], fill=RED)
cell_set(t.cell(0, 1), [TH('', sz=1300)], fill=RED)
cell_set(t.cell(0, 2), [TH('Inbound', sz=1600)], fill=RED)
cell_set(t.cell(0, 4), [TH('Outbound', sz=1600)], fill=RED)
cell_set(t.cell(0, 6), [TH('Enterprise', sz=1600)], fill=RED)
cell_set(t.cell(0, 8), [TH('Вартість залучення (CAC)', sz=1600)], fill=RED)
for c, name in enumerate(COLS8):
    cell_set(t.cell(1, c), [TH(name, sz=1500, align='l' if c == 0 else 'ctr')], fill=RED)
sal8 = ['ЗП каналу, у.о./міс', '', '12 000', '', '24 000', '', '18 000', '', '', '']
t.cell(2, 2).merge(t.cell(2, 3))
t.cell(2, 4).merge(t.cell(2, 5))
t.cell(2, 6).merge(t.cell(2, 7))
for c in (0, 1, 2, 4, 6, 8, 9):
    cell_set(t.cell(2, c), [TD(sal8[c], sz=1600, color=GREY, align='l' if c == 0 else 'ctr')], fill=PANEL)
for ri, row in enumerate(data8):
    for c, v in enumerate(row):
        bold = c >= 8 and v != '…'
        cell_set(t.cell(3 + ri, c),
                 [TD(v, sz=1700, align='l' if c == 0 else 'ctr',
                     font=FB if bold else FL, color=INK if v != '…' else GREY)],
                 fill=WHITE)
for ri in range(nrows8):
    for ci in range(10):
        cell_borders(t.cell(ri, ci))
caption(s, [
    R('Механіка: ', sz=1700, font=FB, color=RED),
    R('CAC = ФОТ каналу, віднесений на продажі продукту. One-time (новий акаунт) → амортизація '
      'на lifetime: «CAC з LT» = CAC ÷ LT — щомісячна складова ціни. Далі до компонентів — '
      'пропорційно частці компонента в ціні продукту (усередненій за білінгом). '
      'Цифри ілюстративні (аркуш Models).', sz=1700, font=FL, color=INK)], y=12.8, h=1.5)

# ---------- Slide 9: Модель C приклад ----------
s = new_slide()
add_title(s, 'Модель C — приклад')
intro(s, 'Витрати відділу атрибутуються на групу продуктів і розкладаються всередині групи пропорційно доходу.')
add_label(s, 'ВОК → група Resell (ongoing, щомісяця)', E(4.0), sz=2200, color=INK)
COLS9 = ['Продукт групи Resell', 'Дохід, ₴/міс (чер’26)', 'Частка групи',
         'Атрибутовано ВОК, ₴/міс', '% до ціни']
w9 = [6.4, 4.6, 3.3, 4.9, 3.19]
data9 = [
    ['Licences', '5 138 332', '51,6 %', '177 300', '+3,45 %'],
    ['Backup Licences', '4 820 151', '48,4 %', '166 271', '+3,45 %'],
]
total9 = ['Разом — група Resell', '9 958 483', '100 %', '343 571', '']
gf, t = add_table(s, 2 + len(data9), 5, X0, E(4.8), CW, E(3.8))
for i, wdt in enumerate(w9):
    t.columns[i].width = Emu(E(wdt))
for c, name in enumerate(COLS9):
    cell_set(t.cell(0, c), [TH(name, sz=1700, align='l' if c == 0 else 'ctr')], fill=RED)
for ri, row in enumerate(data9):
    for c, v in enumerate(row):
        cell_set(t.cell(1 + ri, c), [TD(v, sz=1900, align='l' if c == 0 else 'ctr')], fill=WHITE)
for c, v in enumerate(total9):
    cell_set(t.cell(3, c), [TD(v, sz=1900, align='l' if c == 0 else 'ctr', font=FB)], fill=PANEL)
for ri in range(4):
    for ci in range(5):
        cell_borders(t.cell(ri, ci))
add_box(s, X0, E(9.2), CW - E(3.5), E(2.6), [
    P([R('Ставка групи: ', sz=2000, font=FB, color=INK),
       R('343 571 ÷ 9 958 483 = 3,45 % від місячної ціни кожного продукту групи.',
         sz=2000, font=FL, color=INK)], ln_pts=2550),
    P([R('Перевірка: ', sz=2000, font=FB, color=INK),
       R('сума атрибутованого по групі за місяць = бюджет відділу (343 571 ₴).',
         sz=2000, font=FL, color=INK)], spc_bef=550, ln_pts=2550),
])
caption(s, [
    R('Приклад: ', sz=1700, font=FB, color=RED),
    R('ЗП ВОК — факт Q2’26 (1 030 714 ₴/кв → 343 571 ₴/міс), доходи груп — аркуш «Продукти». '
      'Частку ВОК на Resell для ілюстрації взято 100 % — реальну дасть FTE-опитування. '
      'Кожен компонент групи несе 3,45 % своєї місячної ціни.',
      sz=1700, font=FL, color=INK)], y=12.8, h=1.5)

# ---------- Slide 10: Модель D приклад ----------
s = new_slide()
add_title(s, 'Модель D — приклад')
intro(s, 'Пул загальних витрат розподіляється на групи продуктів за погодженою базою — тут % прогнозної маржі FY2026.')
PLX, PLW = X0, E(6.6)
add_card(s, PLX, E(4.3), PLW, E(6.2))
pool_items = ['Internal IT', 'Operations', 'HR', 'Legal', 'Finance', 'Адмін-госп. відділ',
              'Оренда офісу', 'Банківські послуги', 'Страховка', 'ПО для персоналу',
              '… разом 18 статей × 10 000']
pool_paras = [P(R('Пул загальних витрат', sz=2100, font=FB, color=INK), ln_pts=2500)]
for it in pool_items:
    pool_paras.append(P(R(it, sz=1750, font=FL, color=INK if not it.startswith('…') else GREY),
                        bullet=not it.startswith('…'), spc_bef=250, ln_pts=2100))
pool_paras.append(P([R('180 000 у.о./міс = ', sz=1900, font=FL, color=INK),
                     R('2 160 000 у.о./рік', sz=1900, font=FB, color=RED)],
                    spc_bef=550, ln_pts=2350))
add_box(s, PLX + E(0.35), E(4.62), PLW - E(0.7), E(5.7), pool_paras)
TX = X0 + E(7.1)
TW = CW - E(7.1)
COLS10 = ['Група продуктів', 'Маржа FY26, у.о.', '% маржі', 'Алоковано, у.о./рік',
          'Продажів', 'На продаж, у.о./рік', 'у.о./міс']
w10 = [3.35, 2.6, 1.55, 2.75, 1.55, 1.8, 1.69]
data10 = [
    ['IaaS — Public', '15 000 000', '30 %', '648 000', '139', '4 662', '388'],
    ['IaaS — Private', '25 000 000', '50 %', '1 080 000', '11', '98 182', '8 182'],
    ['Resell', '6 000 000', '12 %', '259 200', '27', '9 600', '800'],
    ['Prof. services', '4 000 000', '8 %', '172 800', '9', '19 200', '1 600'],
]
total10 = ['Разом', '50 000 000', '100 %', '2 160 000', '186', '', '']
gf, t = add_table(s, 6, 7, TX, E(4.3), TW, E(4.6))
for i, wdt in enumerate(w10):
    t.columns[i].width = Emu(E(wdt))
for c, name in enumerate(COLS10):
    cell_set(t.cell(0, c), [TH(name, sz=1500, align='l' if c == 0 else 'ctr')], fill=RED)
for ri, row in enumerate(data10):
    for c, v in enumerate(row):
        cell_set(t.cell(1 + ri, c),
                 [TD(v, sz=1700, align='l' if c == 0 else 'ctr',
                     font=FB if c == 6 else FL)], fill=WHITE)
for c, v in enumerate(total10):
    cell_set(t.cell(5, c), [TD(v, sz=1700, align='l' if c == 0 else 'ctr', font=FB)], fill=PANEL)
for ri in range(6):
    for ci in range(7):
        cell_borders(t.cell(ri, ci))
add_box(s, TX, E(9.7), TW, E(2.3), [
    P([R('Механіка: ', sz=1900, font=FB, color=INK),
       R('пул × % маржі групи → алокація на групу; далі ÷ кількість продажів '
         'групи → навантаження на один продаж, у.о./рік і у.о./міс.',
         sz=1900, font=FL, color=INK)], ln_pts=2400),
    P([R('База розподілу — рішення: ', sz=1900, font=FB, color=INK),
       R('% маржі, % доходу або інша база — узгоджується з фінансами.',
         sz=1900, font=FL, color=INK)], spc_bef=500, ln_pts=2400),
])
caption(s, [
    R('Джерело: ', sz=1700, font=FB, color=RED),
    R('аркуш Models — прогноз FY2026 (маржа 50 млн у.о.), кількість продажів з прикладу '
      'моделі B. Цифри ілюстративні.', sz=1700, font=FL, color=INK)])

# ---------- Slide 11: Наступні кроки ----------
s = new_slide()
add_title(s, 'Наступні кроки')
steps = [
    ('band', 'Узгодження'),
    ('1', 'Алокація бюджетів з керівниками відділів',
     'Оцінка, якою моделлю йде відділ, + стартова механіка атрибуції: Delivery · InfoSec · Support · '
     'R&D · Internal IT · Finance · ВОК · Operations · Product · Sales (Corp, Ent) · Sales (BizDev) · '
     'Sales (Growth) · Marketing · HR · Legal'),
    ('2', 'Розбиття витрат за типами атрибуції', 'Узгодження з фінансами: кожен рядок P&L → модель A / B / C / D'),
    ('3', 'Узгодження принципів', 'Підходи зі слайда «Ключові підходи» — зафіксувати з CEO та CFO'),
    ('4', 'Модель обліку годин надалі', 'Action plan по відділах: як рахуємо й атрибутуємо години, де дашборди'),
    ('band', 'Розрахунок і дані'),
    ('5', 'Розрахунки', 'Собівартість і маржинальність компонентів за чотирма моделями'),
    ('6', 'Контрольні звірки', 'Атрибутовані суми ↔ фактичні бюджети відділів і P&L'),
    ('7', 'Актуалізація даних у CRM', 'Компоненти, ціни, привʼязки продуктів — синхронно з розрахунком'),
    ('band', 'Результат'),
    ('8', 'Поточна профітабельність продуктів', 'Реальна маржа кожного продукту на розрахованому бейзлайні'),
    ('9', 'Пропозиції щодо перегляду цін', 'Там, де маржа нижча за цільову — нові ціни та умови'),
]
nrows11 = len(steps)
gf, t = add_table(s, nrows11, 3, X0, E(3.5), CW, E(9.3))
t.columns[0].width = Emu(E(1.2))
t.columns[1].width = Emu(E(7.6))
t.columns[2].width = Emu(E(13.59))
for ri, item in enumerate(steps):
    if item[0] == 'band':
        t.rows[ri].height = Emu(E(0.56))
        t.cell(ri, 0).merge(t.cell(ri, 2))
        cell_set(t.cell(ri, 0), [P(R(item[1], sz=1800, font=FB, color=RED), align='l')],
                 fill=PANEL, anchor='m', mL=0.25)
        cell_borders(t.cell(ri, 0))
    else:
        num, head, det = item
        t.rows[ri].height = Emu(E(1.4 if num == '1' else 0.72))
        cell_set(t.cell(ri, 0), [TD(num, sz=1900, font=FB, align='ctr')], fill=WHITE)
        cell_set(t.cell(ri, 1), [TD(head, sz=1800, font=FB, align='l')], fill=WHITE)
        cell_set(t.cell(ri, 2), [TD(det, sz=1700, align='l')], fill=WHITE)
        for ci in range(3):
            cell_borders(t.cell(ri, ci))

# ---------- remove template content slides (2..6) ----------
sldIdLst = prs.slides._sldIdLst
all_ids = list(sldIdLst)
for sldId in all_ids[1:6]:
    rId = sldId.get(qn('r:id'))
    prs.part.drop_rel(rId)
    sldIdLst.remove(sldId)

prs.save('out.pptx')
print('saved out.pptx, slides:', len(prs.slides._sldIdLst))
