#!/usr/bin/env python3
"""Regenerate the eight generated hero backgrounds in site/assets/img/heroes/.

Run: python3 tools/gen-heroes.py   (needs Pillow; writes 1920x900 JPEGs in place)
`cross-system-erp-qa.jpg` is NOT generated here - it is the reference image the
rest of the set was matched to, and is left untouched.

One visual register for every hero: near-black ground, a single soft teal core,
thin 1px teal line work, no representational subject matter, no text glyphs,
no depicted people or devices. Composition keeps its interest in the centre-right
(where the hero veil is thinnest) and falls to near-black at the bottom edge so
the page ground picks it up cleanly.
"""

import math
import os
import random

from PIL import Image, ImageDraw, ImageFilter

W, H = 1920, 900
S = 2                      # supersample factor
BW, BH = W * S, H * S

ACCENT = (53, 204, 186)    # --accent #35CCBA
PANEL_FILL = (9, 15, 15)
CORNER = (4, 8, 8)
MID = (7, 14, 14)

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   "site", "assets", "img", "heroes")


# ——— ground ————————————————————————————————————————————————————————————

def ground(core=(0.62, 0.42), core_r=(0.52, 0.78), core_strength=0.9):
    """Near-black field with one soft teal core, computed low-res then upscaled."""
    lw, lh = 192, 90
    img = Image.new("RGB", (lw, lh))
    px = img.load()
    cx, cy = core
    rx, ry = core_r
    for y in range(lh):
        fy = y / (lh - 1)
        for x in range(lw):
            fx = x / (lw - 1)
            # base vignette: darkest at the corners, marginally lifted mid-frame
            d = math.hypot((fx - 0.5) / 0.75, (fy - 0.5) / 0.85)
            t = max(0.0, 1.0 - d)
            r = CORNER[0] + (MID[0] - CORNER[0]) * t
            g = CORNER[1] + (MID[1] - CORNER[1]) * t
            b = CORNER[2] + (MID[2] - CORNER[2]) * t
            # teal core
            dc = math.hypot((fx - cx) / rx, (fy - cy) / ry)
            k = max(0.0, 1.0 - dc)
            k = (k ** 2.2) * core_strength
            r += 14 * k
            g += 54 * k
            b += 48 * k
            # bottom fall-off into the page ground
            if fy > 0.66:
                f = (fy - 0.66) / 0.34
                f = f ** 1.5
                r *= 1 - 0.85 * f
                g *= 1 - 0.85 * f
                b *= 1 - 0.85 * f
            px[x, y] = (int(r), int(g), int(b))
    return img.resize((BW, BH), Image.BICUBIC)


def fade_alpha(layer, factor):
    r, g, b, a = layer.split()
    a = a.point(lambda v: int(v * factor))
    return Image.merge("RGBA", (r, g, b, a))


def compose(base, ink, bloom_radius=9, bloom_alpha=0.55):
    canvas = base.convert("RGBA")
    bloom = fade_alpha(ink.filter(ImageFilter.GaussianBlur(bloom_radius * S)), bloom_alpha)
    canvas.alpha_composite(bloom)
    canvas.alpha_composite(ink)
    return canvas.convert("RGB").resize((W, H), Image.LANCZOS)


def save(name, img):
    os.makedirs(OUT, exist_ok=True)
    img.save(os.path.join(OUT, name + ".jpg"), "JPEG", quality=88, optimize=True, progressive=True)
    print(name, img.size)


def teal(alpha):
    return ACCENT + (alpha,)


def new_ink():
    ink = Image.new("RGBA", (BW, BH), (0, 0, 0, 0))
    return ink, ImageDraw.Draw(ink)


def P(fx, fy):
    """Fractional coords -> supersampled pixels."""
    return (fx * BW, fy * BH)


def lw(px):
    return max(1, int(round(px * S)))


def dot(d, fx, fy, r_px, alpha):
    x, y = P(fx, fy)
    r = r_px * S
    d.ellipse([x - r, y - r, x + r, y + r], fill=teal(alpha))


def panel(d, fx, fy, fw, fh, stroke=110, fill=235, radius=10, rows=0, row_alpha=70):
    x, y = P(fx, fy)
    w, h = fw * BW, fh * BH
    box = [x, y, x + w, y + h]
    d.rounded_rectangle(box, radius=radius * S, fill=PANEL_FILL + (fill,), outline=teal(stroke), width=lw(1))
    for i in range(rows):
        ry = y + h * (0.3 + 0.22 * i)
        rw = w * (0.62 if i % 2 == 0 else 0.44)
        d.line([x + w * 0.12, ry, x + w * 0.12 + rw, ry], fill=teal(row_alpha), width=lw(1))


def curve(d, pts, alpha, width=1, steps=90):
    """Smooth Catmull-Rom-ish polyline through pts (fractional coords)."""
    if len(pts) < 3:
        d.line([P(*p) for p in pts], fill=teal(alpha), width=lw(width), joint="curve")
        return
    ext = [pts[0]] + list(pts) + [pts[-1]]
    out = []
    for i in range(len(ext) - 3):
        p0, p1, p2, p3 = ext[i], ext[i + 1], ext[i + 2], ext[i + 3]
        for s in range(steps):
            t = s / steps
            t2, t3 = t * t, t * t * t
            x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t +
                       (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
                       (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3)
            y = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t +
                       (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
                       (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)
            out.append(P(x, y))
    out.append(P(*pts[-1]))
    d.line(out, fill=teal(alpha), width=lw(width), joint="curve")


def dashed(d, p_from, p_to, alpha, width=1, dash=14, gap=10):
    x0, y0 = P(*p_from)
    x1, y1 = P(*p_to)
    total = math.hypot(x1 - x0, y1 - y0)
    if total == 0:
        return
    ux, uy = (x1 - x0) / total, (y1 - y0) / total
    t = 0.0
    while t < total:
        e = min(total, t + dash * S)
        d.line([x0 + ux * t, y0 + uy * t, x0 + ux * e, y0 + uy * e],
               fill=teal(alpha), width=lw(width))
        t = e + gap * S


def elbow(d, a, b, alpha, width=1, first="h"):
    """Right-angled route between two fractional points."""
    ax, ay = P(*a)
    bx, by = P(*b)
    if first == "h":
        mid = [(ax, ay), (bx, ay), (bx, by)]
    else:
        mid = [(ax, ay), (ax, by), (bx, by)]
    d.line(mid, fill=teal(alpha), width=lw(width), joint="curve")


def ring(d, fx, fy, r_fx, alpha, width=1):
    x, y = P(fx, fy)
    r = r_fx * BW
    d.ellipse([x - r, y - r, x + r, y + r], outline=teal(alpha), width=lw(width))


# ——— heroes ————————————————————————————————————————————————————————————

def overview():
    """Concentric apertures opening from the centre-right, nodes riding the arcs."""
    random.seed(11)
    base = ground(core=(0.68, 0.40), core_r=(0.50, 0.72), core_strength=1.0)
    ink, d = new_ink()
    cx, cy = 0.72, 0.40
    for i, r in enumerate([0.055, 0.10, 0.155, 0.215, 0.28, 0.35, 0.425]):
        a = int(150 - i * 17)
        ring(d, cx, cy, r, max(28, a), width=1)
    for i in range(7):
        ang = math.radians(-118 + i * 27)
        r0, r1 = 0.06, 0.44
        p0 = (cx + math.cos(ang) * r0, cy + math.sin(ang) * r0 * (BW / BH))
        p1 = (cx + math.cos(ang) * r1, cy + math.sin(ang) * r1 * (BW / BH))
        dashed(d, p0, p1, 46, dash=18, gap=16)
    for i in range(26):
        ang = random.uniform(-3.05, 0.45)
        r = random.choice([0.10, 0.155, 0.215, 0.28, 0.35, 0.425])
        fx = cx + math.cos(ang) * r
        fy = cy + math.sin(ang) * r * (BW / BH)
        if -0.02 < fx < 1.02 and -0.02 < fy < 0.92:
            dot(d, fx, fy, random.choice([2.0, 2.6, 3.4]), random.randint(90, 200))
    dot(d, cx, cy, 7, 235)
    ring(d, cx, cy, 0.018, 210, width=1)
    return compose(base, ink, bloom_radius=11, bloom_alpha=0.6)


def services():
    """Layered platform planes receding into the frame, teal edge light."""
    random.seed(23)
    base = ground(core=(0.66, 0.46), core_r=(0.55, 0.80), core_strength=0.85)
    ink, d = new_ink()
    layers = 6
    half, skew = 0.232, 0.048
    for i in range(layers):
        t = i / (layers - 1)
        y = 0.735 - t * 0.395
        cxp = 0.690 + t * 0.045
        a = int(58 + t * 175)
        pts = [
            P(cxp - half, y),
            P(cxp, y - skew),
            P(cxp + half, y),
            P(cxp, y + skew),
        ]
        d.polygon(pts, fill=PANEL_FILL + (int(105 + t * 70),), outline=teal(a))
        d.line(pts + [pts[0]], fill=teal(a), width=lw(1))
        if i:
            d.line([P(cxp, y + skew), P(cxp - t * 0.055, y + 0.079 - skew)],
                   fill=teal(int(a * 0.35)), width=lw(1))
    for i in range(4):
        fx = 0.640 + i * 0.070
        dot(d, fx, 0.340 + (i % 2) * 0.016, 2.4, 120 + i * 22)
    for i in range(14):
        fx = random.uniform(0.48, 0.97)
        fy = random.uniform(0.14, 0.30)
        dot(d, fx, fy, random.choice([1.7, 2.2]), random.randint(40, 105))
    dot(d, 0.748, 0.286, 6, 235)
    return compose(base, ink, bloom_radius=10, bloom_alpha=0.55)


def account_insights():
    """Scattered peripheral signals resolving into one lit lens."""
    random.seed(37)
    base = ground(core=(0.705, 0.43), core_r=(0.46, 0.70), core_strength=1.0)
    ink, d = new_ink()
    hub = (0.705, 0.43)
    nodes = []
    for i in range(30):
        ang = random.uniform(-math.pi, math.pi)
        r = random.uniform(0.13, 0.46)
        fx = hub[0] + math.cos(ang) * r
        fy = hub[1] + math.sin(ang) * r * (BW / BH) * 0.92
        if 0.06 < fx < 0.97 and 0.06 < fy < 0.80:
            nodes.append((fx, fy))
    for fx, fy in nodes:
        mx = (fx + hub[0]) / 2 + random.uniform(-0.03, 0.03)
        my = (fy + hub[1]) / 2 + random.uniform(-0.05, 0.05)
        curve(d, [(fx, fy), (mx, my), hub], random.randint(72, 140))
    for fx, fy in nodes:
        dot(d, fx, fy, random.choice([2.0, 2.8, 3.6]), random.randint(110, 215))
    for r, a in ((0.030, 185), (0.048, 120), (0.070, 74), (0.098, 44)):
        ring(d, hub[0], hub[1], r, a)
    dot(d, hub[0], hub[1], 8, 240)
    return compose(base, ink, bloom_radius=12, bloom_alpha=0.6)


def case_evidence():
    """Fragments drawn down onto one reconstructed spine."""
    random.seed(53)
    base = ground(core=(0.63, 0.50), core_r=(0.58, 0.72), core_strength=0.8)
    ink, d = new_ink()
    spine_y = 0.545
    d.line([P(0.16, spine_y), P(0.965, spine_y)], fill=teal(120), width=lw(1))
    marks = [0.24, 0.35, 0.46, 0.57, 0.68, 0.79, 0.90]
    frags = [
        (0.205, 0.215), (0.315, 0.155), (0.425, 0.255), (0.525, 0.135),
        (0.645, 0.235), (0.745, 0.165), (0.855, 0.245),
    ]
    for i, mx in enumerate(marks):
        fx, fy = frags[i]
        panel(d, fx, fy, 0.088, 0.115, stroke=int(70 + i * 10), fill=232, rows=3,
              row_alpha=int(42 + i * 6))
        d.line([P(fx + 0.044, fy + 0.115), P(mx, spine_y)], fill=teal(52), width=lw(1))
        dot(d, mx, spine_y, 3.4, 175)
        d.line([P(mx, spine_y), P(mx, spine_y + 0.055 + (i % 3) * 0.030)],
               fill=teal(44), width=lw(1))
        dot(d, mx, spine_y + 0.055 + (i % 3) * 0.030, 1.9, 90)
    panel(d, 0.585, 0.635, 0.155, 0.150, stroke=175, fill=242, rows=4, row_alpha=105)
    dot(d, 0.57, spine_y, 5.0, 225)
    return compose(base, ink, bloom_radius=9, bloom_alpha=0.5)


def plan_vs_actual():
    """Two traces, one variance band, markers at the widest divergence."""
    random.seed(71)
    base = ground(core=(0.62, 0.44), core_r=(0.60, 0.78), core_strength=0.8)
    ink, d = new_ink()
    for i in range(13):
        fx = 0.18 + i * 0.065
        d.line([P(fx, 0.155), P(fx, 0.745)], fill=teal(16), width=lw(1))
    for i in range(5):
        fy = 0.20 + i * 0.135
        d.line([P(0.16, fy), P(0.975, fy)], fill=teal(13), width=lw(1))

    xs = [0.18 + i * 0.0885 for i in range(10)]
    plan = [0.590, 0.566, 0.545, 0.523, 0.503, 0.482, 0.462, 0.441, 0.421, 0.400]
    actual = [0.590, 0.581, 0.572, 0.549, 0.557, 0.523, 0.535, 0.493, 0.506, 0.463]

    band = [P(x, y) for x, y in zip(xs, plan)] + [P(x, y) for x, y in zip(reversed(xs), reversed(actual))]
    d.polygon(band, fill=ACCENT + (15,))

    for i in range(len(xs) - 1):
        dashed(d, (xs[i], plan[i]), (xs[i + 1], plan[i + 1]), 95, dash=11, gap=8)
    d.line([P(x, y) for x, y in zip(xs, actual)], fill=teal(205), width=lw(2), joint="curve")
    for x, y in zip(xs, actual):
        dot(d, x, y, 3.2, 200)
    for i in (2, 4, 6):
        d.line([P(xs[i], plan[i]), P(xs[i], actual[i])], fill=teal(110), width=lw(1))
        ring(d, xs[i], (plan[i] + actual[i]) / 2, 0.0125, 150)
    return compose(base, ink, bloom_radius=9, bloom_alpha=0.5)


def large_document():
    """A deep stack of thin plates, a few rows lifting out into a lit grid."""
    random.seed(97)
    base = ground(core=(0.70, 0.44), core_r=(0.52, 0.76), core_strength=0.85)
    ink, d = new_ink()
    plates = 26
    for i in range(plates):
        t = i / (plates - 1)
        y = 0.795 - t * 0.545
        x0 = 0.215 + t * 0.085
        x1 = 0.645 + t * 0.052
        a = int(24 + t * 145)
        d.line([P(x0, y), P(x1, y - t * 0.012)], fill=teal(a), width=lw(1))
        if i % 4 == 0:
            d.line([P(x0, y), P(x0 + 0.012, y - 0.022)], fill=teal(int(a * 0.55)), width=lw(1))
    cells = [(0.735, 0.245), (0.735, 0.355), (0.735, 0.465),
             (0.855, 0.245), (0.855, 0.355), (0.855, 0.465)]
    for i, (fx, fy) in enumerate(cells):
        panel(d, fx, fy, 0.095, 0.082, stroke=int(90 + i * 16), fill=238, rows=2,
              row_alpha=int(55 + i * 12), radius=8)
    for i, fy in enumerate((0.286, 0.396, 0.506)):
        d.line([P(0.680, fy + 0.055), P(0.735, fy)], fill=teal(70), width=lw(1))
        dot(d, 0.680, fy + 0.055, 2.6, 130)
    dot(d, 0.700, 0.300, 5.0, 215)
    return compose(base, ink, bloom_radius=9, bloom_alpha=0.5)


def workforce():
    """One dispatch core, routed assignments reaching a field of endpoints."""
    random.seed(131)
    base = ground(core=(0.55, 0.46), core_r=(0.52, 0.76), core_strength=0.9)
    ink, d = new_ink()
    core = (0.545, 0.455)
    ends = [
        (0.755, 0.205), (0.880, 0.275), (0.815, 0.395), (0.930, 0.470),
        (0.760, 0.545), (0.870, 0.635), (0.690, 0.665), (0.320, 0.255),
        (0.245, 0.395), (0.330, 0.585), (0.235, 0.645),
    ]
    for i, e in enumerate(ends):
        assigned = i in (0, 2, 4, 6, 8)
        elbow(d, core, e, 150 if assigned else 46, width=1,
              first="h" if i % 2 == 0 else "v")
    for i, e in enumerate(ends):
        assigned = i in (0, 2, 4, 6, 8)
        d.rectangle([P(e[0] - 0.0085, e[1] - 0.018)[0], P(e[0] - 0.0085, e[1] - 0.018)[1],
                     P(e[0] + 0.0085, e[1] + 0.018)[0], P(e[0] + 0.0085, e[1] + 0.018)[1]],
                    fill=PANEL_FILL + (235,), outline=teal(175 if assigned else 62), width=lw(1))
        if assigned:
            dot(d, e[0], e[1], 2.2, 200)
    for r, a in ((0.026, 165), (0.042, 95), (0.062, 50)):
        ring(d, core[0], core[1], r, a)
    dot(d, core[0], core[1], 7, 235)
    for i in range(14):
        fx = random.uniform(0.20, 0.95)
        fy = random.uniform(0.14, 0.72)
        dot(d, fx, fy, 1.7, random.randint(28, 70))
    return compose(base, ink, bloom_radius=10, bloom_alpha=0.55)


def business_metrics():
    """One question resolving into a measured series."""
    random.seed(157)
    base = ground(core=(0.60, 0.42), core_r=(0.58, 0.76), core_strength=0.85)
    ink, d = new_ink()
    baseline = 0.700
    bars = [0.120, 0.185, 0.155, 0.245, 0.210, 0.300, 0.265, 0.355, 0.320, 0.415, 0.385, 0.470]
    x0, bw, gap = 0.235, 0.0405, 0.0195
    tops = []
    for i, hgt in enumerate(bars):
        bx = x0 + i * (bw + gap)
        top = baseline - hgt
        tops.append((bx + bw / 2, top))
        a = int(55 + i * 12)
        d.rectangle([P(bx, top)[0], P(bx, top)[1], P(bx + bw, baseline)[0], P(bx + bw, baseline)[1]],
                    fill=ACCENT + (int(16 + i * 4),), outline=teal(a), width=lw(1))
    d.line([P(0.215, baseline), P(0.975, baseline)], fill=teal(105), width=lw(1))
    curve(d, tops, 195, width=2)
    for fx, fy in tops:
        dot(d, fx, fy, 2.6, 150)
    # the answered point
    dot(d, tops[-1][0], tops[-1][1], 5.6, 235)
    ring(d, tops[-1][0], tops[-1][1], 0.019, 140)
    # the question, as an abstract prompt rule
    d.line([P(0.235, 0.185), P(0.470, 0.185)], fill=teal(85), width=lw(1))
    d.line([P(0.235, 0.222), P(0.385, 0.222)], fill=teal(52), width=lw(1))
    dashed(d, (0.480, 0.185), (0.905, 0.185), 40, dash=16, gap=14)
    for i in range(18):
        fx = random.uniform(0.25, 0.95)
        fy = random.uniform(0.12, 0.40)
        dot(d, fx, fy, 1.7, random.randint(24, 62))
    return compose(base, ink, bloom_radius=9, bloom_alpha=0.5)


BUILDERS = {
    "overview": overview,
    "services": services,
    "account-insights": account_insights,
    "case-evidence-collection": case_evidence,
    "plan-vs-actual-investigation": plan_vs_actual,
    "large-document-extraction": large_document,
    "workforce-optimization": workforce,
    "business-metrics-qa": business_metrics,
}

if __name__ == "__main__":
    for name, fn in BUILDERS.items():
        save(name, fn())
