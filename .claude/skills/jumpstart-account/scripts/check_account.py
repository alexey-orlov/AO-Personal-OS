#!/usr/bin/env python3
"""Check one Jumpstart account before delivery: its tracker doc and, optionally, its two-pager file.

Usage:
  python3 check_account.py --doc <accounts/<slug>.json from ArtifactData get out_dir>
                           [--two-pager <one-pager-build/accounts/<slug>.json>]
                           [--tracking <tracking/<slug>.json>] [--today YYYY-MM-DD]

Prints FAIL / WARN / OK lines. FAIL blocks delivery (exit code 1); WARN needs a decision
(fix it, or say in the report why it stays). Standard library only.
The rules behind each check: research-standards.md (signals, second pass, sizing, the new-row
gate), the tracker page's fold, and the bulk two-pager workflow of 13 Nov 2026.
"""
import argparse
import datetime as dt
import json
import re
import sys

# The tracker page's MODULES list (keep in sync with the page if a module is renamed).
MODULES = ["Peripheral driver development", "Legacy code modernization",
           "Software optimization for target hardware", "Fault diagnosis",
           "Bench and HIL test automation", "Hypothesis → reproducible computation",
           "Evidence → hypothesis", "Resource allocation across pipelines",
           "Edge AI model adaptation"]
ROW3 = {"hw": "What their R&D builds", "bio": "What they research"}
MONEY = re.compile(r"\$|€|\b(?:revenue|royalt\w*|sales|costs?|costing|margins?|prices?|budget|downtime|lost|fines?|penalt\w*|recalls?|profits?|spend\w*)\b", re.I)
EXEC_SRC = re.compile(r"call|remark|interview|keynote|podcast|briefing|conference|panel|speech", re.I)
CLOSED = re.compile(r"closed|removed|no longer accepting|filled|inactive", re.I)
PLACEHOLDER = re.compile(r"<[^<>]{2,}>")
DATE_IN_TEXT = re.compile(r"\((?:[A-Z][a-z]{2,8}\.?\s*(?:[–-]\s*[A-Z][a-z]{2,8}\.?\s*)?\d{4}|\d{4})\)")
NAME = re.compile(r"^[A-Z][\w'’.-]+(?:\s+[A-Z][\w'’.-]+)+")
MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
TODAY = [dt.date.today()]

out = {"FAIL": [], "WARN": [], "OK": []}


def say(level, where, msg):
    out[level].append(f"{level:4}  [{where}] {msg}")


def load(path):
    with open(path, encoding="utf-8") as f:
        d = json.load(f)
    return d.get("data", d) if isinstance(d, dict) else d


def parse_date(s):
    s = str(s or "")
    m = re.match(r"(\d{4})-(\d{2})(?:-(\d{2}))?", s)
    if m:
        return dt.date(int(m.group(1)), int(m.group(2)), int(m.group(3) or 15))
    m = re.match(r"(\d{4})\b", s)
    return dt.date(int(m.group(1)), 7, 1) if m else None


def months(a, b):
    return (b.year - a.year) * 12 + (b.month - a.month)


def strings(obj, path=""):
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield from strings(v, f"{path}.{k}" if path else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from strings(v, f"{path}[{i}]")
    elif isinstance(obj, str):
        yield path, obj


def underscore_keys(obj, path=""):
    if isinstance(obj, dict):
        for k, v in obj.items():
            p = f"{path}.{k}" if path else k
            if str(k).startswith("_"):
                yield p
            yield from underscore_keys(v, p)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from underscore_keys(v, f"{path}[{i}]")


def sides(doc):
    o = doc.get("offer")
    return ["hw", "bio"] if o == "both" else [o] if o in ("hw", "bio") else []


def check_doc(doc, today):
    for path, s in strings(doc):
        if PLACEHOLDER.search(s):
            say("FAIL", path, f"template placeholder left: {PLACEHOLDER.search(s).group(0)}")
    for key_path in underscore_keys(doc):
        say("FAIL", key_path, "template key starting with '_' left in the doc")
    for f in ["account", "what_they_do", "sum_what", "hq_text", "tier", "ss_team", "angle", "sum_angle",
              "gaps", "people_source", "wiki_path", "teams_note"]:
        if not doc.get(f):
            say("FAIL", f, "missing or empty")
    if not isinstance(doc.get("priority"), int):
        say("FAIL", "priority", "must be an integer")
    if not (doc.get("headcount") or {}).get("value"):
        say("FAIL", "headcount", "no value")
    if doc.get("offer") not in ("hw", "bio", "both"):
        say("FAIL", "offer", "must be hw, bio or both")
    for f in ["research_status", "sizing_status"]:
        if doc.get(f) != "done":
            say("WARN", f, f"is '{doc.get(f)}', not 'done'")
    if "Sales Navigator" not in str(doc.get("people_source", "")):
        say("WARN", "people_source", "names should come from Sales Navigator, cross-checked on the web")

    for side in sides(doc):
        for f in [f"{side}_units", f"{side}_roles", f"{side}_people", f"{side}_signals"]:
            if not doc.get(f):
                say("FAIL", f, "missing or empty")
        if not str(doc.get(f"sum_units_{side}") or ""):
            say("FAIL", f"sum_units_{side}", "missing: the units column's one-line summary")
        for f in [f"sum_signals_{side}", f"sum_roles_{side}", f"sum_people_{side}"]:
            v = str(doc.get(f) or "")
            if not v:
                say("WARN", f, "empty: the row's one-line summary is what Alex reads to an AE")
            elif len(v) > 400:
                say("WARN", f, f"{len(v)} characters; keep the summary to one or two dated facts")
        check_signals(doc.get(f"{side}_signals") or [], side, today)
        check_people(doc.get(f"{side}_people") or [], side)
        check_size(doc.get(f"size_{side}"), side)

    for side in ("hw", "bio"):
        if side not in sides(doc):
            sz = doc.get(f"size_{side}")
            if not (isinstance(sz, dict) and sz.get("applies") is False):
                say("WARN", f"size_{side}", "the offer not taken keeps size_<side> {applies:false, note}, as on the reviewed rows")
    if "second-passed" not in str(doc.get("angle_note", "")).lower():
        say("WARN", "angle_note", "no record of the offer choice's second pass ('Offer second-passed DD Mon YYYY: …')")
    os_ = doc.get("oracle_short") or {}
    if os_.get("yes"):
        if not (doc.get("oracle_use") or {}).get("cross_checked"):
            say("FAIL", "oracle", "Yes without the independent second pass (oracle_use.cross_checked)")
        if not os_.get("products"):
            say("FAIL", "oracle_short", "Yes with no products")
    ea = doc.get("edge_ai") or {}
    if str(ea.get("verdict", "")).lower() == "yes":
        if not ea.get("one_liner"):
            say("FAIL", "edge_ai", "Yes with no one_liner")
        if re.match(r"\s*(weak|partner|plan only|indirect)\b", str(ea.get("one_liner", "")), re.I):
            say("FAIL", "edge_ai", "a weak fit is verdict no, evidence kept (the tracker page's Edge AI rule)")
        ev = ea.get("evidence") or []
        if not ev:
            say("FAIL", "edge_ai", "Yes with no dated evidence")
        recent = False
        for i, e in enumerate(ev):
            if not e.get("date") or not e.get("url"):
                say("WARN", f"edge_ai.evidence[{i}]", "missing date or url")
            d = parse_date(e.get("date"))
            if d and months(d, TODAY[0]) > 60:
                say("FAIL", f"edge_ai.evidence[{i}]", "older than five years: does not count")
            if d and months(d, TODAY[0]) <= 18:
                recent = True
        if ev and not recent:
            say("WARN", "edge_ai", "Yes rests only on evidence older than 18 months")
        if not str(ea.get("caveats", "")).startswith("Second pass"):
            say("WARN", "edge_ai.caveats", "no record of the Yes's second pass ('Second pass DD Mon YYYY: …')")
    if not any(m in str(doc.get("angle", "")) for m in MODULES):
        say("WARN", "angle", "names no module from the decks' MODULES list")
    check_note(doc.get("teams_note") or {})


def check_signals(sig, side, today):
    rank = {"S": 0, "M": 1, "W": 2}
    prev = -1
    warned_order = False
    for i, s in enumerate(sig):
        w = f"{side}_signals[{i}]"
        for f in ["date", "text", "strength", "strength_why", "url"]:
            if not s.get(f):
                say("FAIL" if f in ("text", "strength") else "WARN", w, f"missing {f}")
        g = str(s.get("strength", "")).upper()
        if g not in rank:
            say("FAIL", w, f"strength '{g}' is not S, M or W")
            continue
        if rank[g] < prev and not warned_order:
            say("WARN", f"{side}_signals", f"not in strongest-first order (first at [{i}])")
            warned_order = True
        prev = max(prev, rank[g])
        d = parse_date(s.get("date"))
        src = str(s.get("src", ""))
        text = str(s.get("text", ""))
        if d:
            age = months(d, today)
            if age > 60:
                say("FAIL", w, f"{age} months old: nothing older than five years counts")
            elif "job" in src.lower() and age > 18 and g in ("S", "M"):
                say("FAIL", w, f"job ad {age} months old graded {g}: ads count only within 18 months")
        if EXEC_SRC.search(src) and g == "S":
            say("FAIL", w, "an executive's remark graded S: it is W unless it names budget or a program in the exact work")
        elif EXEC_SRC.search(src) and g == "M":
            say("WARN", w, "remark-type source graded M: confirm it names intent in the exact work, not a general remark")
        if re.search(r"\bhiring\b", text, re.I) and CLOSED.search(text):
            say("FAIL", w, "says 'hiring' about a closed ad: use 'sought'")


def check_people(people, side):
    for i, p in enumerate(people):
        w = f"{side}_people[{i}]"
        for f in ["name", "title", "persona", "confidence", "url"]:
            if not p.get(f):
                say("WARN", w, f"missing {f}")
        if re.search(r"not checked|tbd|unknown|\?", str(p.get("name", "")), re.I):
            say("FAIL", w, f"placeholder name '{p.get('name')}': a name nobody can confirm stays out")


def check_size(s, side):
    w = f"size_{side}"
    if not isinstance(s, dict):
        say("FAIL", w, "missing")
        return
    if s.get("applies") is False:
        if not s.get("note"):
            say("FAIL", w, "applies:false needs a note with the LinkedIn evidence and the nearest group")
        return
    for f in ["estimate", "low", "high", "confidence", "basis"]:
        if s.get(f) in (None, ""):
            say("FAIL", w, f"missing {f}")
    m = s.get("methods") or {}
    for f in ["linkedin", "first_principles", "public"]:
        if f not in m:
            say("FAIL", w, f"missing methods.{f}: show all three estimates")
    li = m.get("linkedin") or {}
    if "not taken" in str(li.get("arithmetic", "")) or li.get("value") is None:
        say("WARN", w, "no LinkedIn count: run the Sales Navigator pass")


def check_note(t):
    w = "teams_note"
    for f in ["to", "lang", "attach", "msgs"]:
        if not t.get(f):
            say("FAIL", w, f"missing {f}")
    if t.get("lang") not in ("EN", "UA"):
        say("FAIL", w, "lang must be EN or UA")
    if t.get("author") not in (None, "agent", "alex"):
        say("FAIL", w, "author must be 'agent' or 'alex'")
    msgs = t.get("msgs") or []
    if len(msgs) != 3:
        say("FAIL", w, f"{len(msgs)} messages; the page has three slots (Hi, Pitch, 2-pager)")
    if t.get("author") == "alex":
        return  # Alex's own note, stored as he sent it: no playbook checks
    for i, m in enumerate(msgs + (t.get("alt") or {}).get("msgs", [])):
        if "—" in m:
            say("FAIL", f"{w}.msgs[{i}]", "em dash: use a hyphen with spaces or split the sentence")
    if len(msgs) == 3:
        if "?" not in msgs[1]:
            say("WARN", f"{w}.msgs[1]", "no question: ask for their view and offer a chat")
        if t.get("lang") == "EN" and "brief research" not in msgs[2]:
            say("WARN", f"{w}.msgs[2]", "the two-pager caption should mark the research as brief")


def check_two_pager(tp, doc):
    w = "two-pager"
    for path, s in strings(tp):
        if PLACEHOLDER.search(s):
            say("FAIL", f"{w}.{path}", f"template placeholder left: {PLACEHOLDER.search(s).group(0)}")
        if "—" in s:
            say("FAIL", f"{w}.{path}", "em dash")
    if any(str(k).startswith("_") for k in tp):
        say("FAIL", w, "template key starting with '_' left in the file")
    offer = tp.get("offer")
    if offer not in ("hw", "bio"):
        say("FAIL", w, "offer must be hw or bio (page 1 is one Jumpstart)")
    elif doc and doc.get("offer") not in (offer, "both"):
        say("FAIL", w, f"offer '{offer}' does not match the tracker's '{doc.get('offer')}'")
    rows = tp.get("rows") or []
    labels = [r[0] for r in rows]
    want = ["Account", "Est. R&D headcount", ROW3.get(offer, "?"), "Likely problem"]
    if labels[:4] != want or not (len(labels) == 4 or (len(labels) == 5 and labels[4] == "Need signals")):
        say("FAIL", f"{w}.rows", f"labels {labels}; expected {want} + optional 'Need signals'")
    text = {r[0]: r[1] for r in rows}
    for lab, s in text.items():
        n = len(s.split())
        if re.search(r"https?://", s):
            say("FAIL", f"{w}.{lab}", "bare URL: links print as captions")
        if (lab == "Account" and n > 30) or n > 40:
            say("WARN", f"{w}.{lab}", f"{n} words; aim for about 22, the page-length check decides")
    lp = text.get("Likely problem", "")
    if lp and "(inferred)" not in lp:
        say("WARN", f"{w}.Likely problem", "mark the inference '(inferred)'")
    if lp and not MONEY.search(lp):
        say("WARN", f"{w}.Likely problem", "does not end on what the pain costs the business")
    ns = text.get("Need signals", "")
    if ns and not DATE_IN_TEXT.search(ns):
        say("WARN", f"{w}.Need signals", "no '(Mon YYYY)' date")
    if re.search(r"\bhiring\b", ns, re.I):
        say("WARN", f"{w}.Need signals", "'hiring': confirm the ad is still open, else 'sought'")
    for mon, yr in re.findall(r"\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{4})\b", ns):
        d = dt.date(int(yr), MONTHS.index(mon) + 1, 15)
        if months(d, TODAY[0]) > 18:
            say("WARN", f"{w}.Need signals", f"'{mon} {yr}' is older than 18 months: context, not a hook")
    labels_other = [o.get("label") for o in tp.get("other") or []]
    for i, o in enumerate(tp.get("other") or []):
        ow = f"{w}.other[{i}]"
        if o.get("label") not in ("Oracle solutions", "Edge AI Kit"):
            say("FAIL", ow, f"label '{o.get('label')}' is not 'Oracle solutions' or 'Edge AI Kit'")
        if not str(o.get("url", "")).startswith("https://") or not o.get("url_label"):
            say("FAIL", ow, "needs an https url and a url_label caption")
        if re.search(r"https?://", str(o.get("text", ""))):
            say("FAIL", ow, "bare URL in the text")
        if o.get("label") == "Edge AI Kit" and str(o.get("text", "")).startswith("Edge AI Kit"):
            say("FAIL", ow, "must not start with the kit's name (the page prints it)")
    if doc:
        if bool((doc.get("oracle_short") or {}).get("yes")) != ("Oracle solutions" in labels_other):
            say("WARN", f"{w}.other", "Oracle bullet does not match the tracker's Oracle verdict")
        if (str((doc.get("edge_ai") or {}).get("verdict", "")).lower() == "yes") != ("Edge AI Kit" in labels_other):
            say("WARN", f"{w}.other", "Edge AI Kit bullet does not match the tracker's Edge AI verdict")
    ch = tp.get("champions") or []
    if not 2 <= len(ch) <= 3:
        say("WARN", f"{w}.champions", f"{len(ch)} champions; two or three high-confidence names")
    for c in ch:
        if ", " not in c or not NAME.match(c) or re.search(r"not checked|\(.*lead|^(VP|Head|Director|Manager|President)\b", c):
            say("WARN", f"{w}.champions", f"'{c}' is not 'Name, short title' for a named person")
    if not tp.get("champions_note"):
        say("FAIL", f"{w}.champions_note", "missing: the build crashes without it")
    if doc:
        people = {str(p.get("name", "")).split(",")[0].strip().lower(): p for s_ in ("hw", "bio") for p in (doc.get(f"{s_}_people") or [])}
        for c in ch:
            nm = c.split(",")[0].strip().lower()
            p = people.get(nm) or next((v for k, v in people.items() if k and (k.startswith(nm) or nm.startswith(k))), None)
            if not p:
                say("WARN", f"{w}.champions", f"'{c.split(',')[0]}' is not among the tracker's people")
            elif str(p.get("confidence", "")).lower() != "high":
                say("WARN", f"{w}.champions", f"'{c.split(',')[0]}' has {p.get('confidence') or 'no'} confidence in the tracker; only high goes on the page")
    if doc and offer in ("hw", "bio"):
        s = doc.get(f"size_{offer}") or {}
        est = s.get("estimate")
        hc = text.get("Est. R&D headcount", "")
        if s.get("applies") is not False and isinstance(est, (int, float)):
            if not re.search(rf"~{re.escape(f'{int(est):,}')}(?![\d,])", hc):
                say("WARN", f"{w}.Est. R&D headcount", f"does not show the tracker's estimate ~{int(est):,}")
            if est <= 10 and not tp.get("deal_prices"):
                say("WARN", f"{w}.deal_prices", "team of ten or fewer: set Essential 'from ~$75K'")
            if est > 15 and tp.get("deal_prices"):
                say("WARN", f"{w}.deal_prices", "the lower entry price is for small teams only")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--doc", required=True)
    ap.add_argument("--two-pager")
    ap.add_argument("--tracking")
    ap.add_argument("--today", default=dt.date.today().isoformat())
    a = ap.parse_args()
    today = dt.date.fromisoformat(a.today)
    TODAY[0] = today
    doc = load(a.doc)
    check_doc(doc, today)
    if a.two_pager:
        check_two_pager(load(a.two_pager), doc)
    if a.tracking:
        st = load(a.tracking).get("status", "not-started")
        if st != "not-started":
            say("WARN", "tracking", f"status '{st}': the Teams note was probably sent; draft a follow-up, never rewrite it")
    if not out["FAIL"] and not out["WARN"]:
        say("OK", "all", "no findings")
    for level in ("FAIL", "WARN", "OK"):
        for line in out[level]:
            print(line)
    print(f"-- {len(out['FAIL'])} FAIL, {len(out['WARN'])} WARN")
    sys.exit(1 if out["FAIL"] else 0)


if __name__ == "__main__":
    main()
