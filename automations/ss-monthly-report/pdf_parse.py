#!/usr/bin/env python3
"""pdf_parse.py — Clockify "Detailed report" PDF -> normalised entries JSON.

    ./pdf_parse.py <report.pdf> [-o entries.json]

Emits {"source":"pdf","period_total":"HH:MM:SS","entries":[...]} where each entry is
    {"date":"dd/mm/yyyy","desc":str,"start":"HH:MM:SS","end":"HH:MM:SS","dur":"HH:MM:SS"}

The layout is deceptively hostile. Every rule below exists because it silently
dropped or corrupted rows during the 2026-08-02 build; do not "simplify" them:

  * pdftotext -layout emits a form-feed (\f) at each page break, glued to the
    first date on the new page. Unstripped, the leading ^ anchor fails and the
    FIRST ENTRY OF EVERY PAGE vanishes (cost: 2 of 46 entries, 6h48m).
  * On wide descriptions the gap before the duration collapses to ONE space,
    so `\\s{2,}` column-splitting fails. Anchor on the trailing user token instead.
  * The start-end range shares its line with the project code ("SS   13:09 - 20:20"),
    so the range must be matched with .search(), never .match().
  * Descriptions wrap onto following lines, sometimes after the range line.

The parsed total is checked against the PDF's own "Total:" header and a mismatch
is fatal. That gate is the only reason the two bugs above were caught -- keep it.
"""
import argparse
import json
import re
import shutil
import subprocess
import sys
from datetime import timedelta

DATE_RE = re.compile(r'^(\d{2}/\d{2}/\d{4})\s+(.*?)\s+(\d{2}:\d{2}:\d{2})\s+(\S+)\s*$')
RANGE_RE = re.compile(r'(\d{2}:\d{2}:\d{2}) - (\d{2}:\d{2}:\d{2})')
TOTAL_RE = re.compile(r'^Total:\s*(\d+:\d{2}:\d{2})', re.M)
NOISE = ('Created with Clockify', 'Detailed report')


def to_td(hms):
    h, m, s = map(int, hms.split(':'))
    return timedelta(hours=h, minutes=m, seconds=s)


def fmt(td):
    s = int(td.total_seconds())
    return f'{s // 3600:02d}:{s % 3600 // 60:02d}:{s % 60:02d}'


def pdf_to_text(pdf):
    if not shutil.which('pdftotext'):
        sys.exit('pdf_parse: pdftotext not found (brew install poppler)')
    out = subprocess.run(['pdftotext', '-layout', str(pdf), '-'],
                         capture_output=True, text=True, check=True)
    return out.stdout


def parse(text):
    text = text.replace('\f', '')                 # page-break guard -- see module docstring
    stated = TOTAL_RE.search(text)
    entries, cur = [], None

    for line in text.split('\n'):
        if any(n in line for n in NOISE):
            continue
        m = DATE_RE.match(line)
        if m:
            cur = {'date': m.group(1), 'desc': m.group(2).strip(),
                   'dur': m.group(3), 'start': None, 'end': None}
            entries.append(cur)
            continue
        if cur is None:
            continue
        r = RANGE_RE.search(line)                 # .search: shares the line with the project code
        if r:
            if cur['start'] is None:
                cur['start'], cur['end'] = r.group(1), r.group(2)
            continue
        rest = line.strip()
        if rest and rest not in ('SS', '+1'):     # wrapped description tail
            rest = re.sub(r'^[A-Z]{2,4}\b\s*', '', rest).strip()
            if rest:
                cur['desc'] = f"{cur['desc']} {rest}".strip()

    for e in entries:
        e['desc'] = re.sub(r'\s+', ' ', e['desc']).strip()

    return entries, (stated.group(1) if stated else None)


def validate(entries, stated):
    if not entries:
        sys.exit('pdf_parse: no entries parsed -- is this a Clockify detailed report?')

    missing = [e for e in entries if not e['start'] or not e['end']]
    if missing:
        sys.exit(f'pdf_parse: {len(missing)} entr(y/ies) missing start/end, '
                 f'first: {missing[0]["date"]} {missing[0]["desc"][:60]!r}')

    # Per-entry: the printed duration must equal end-start (midnight-crossing allowed).
    for e in entries:
        d = to_td(e['end']) - to_td(e['start'])
        if d.total_seconds() < 0:
            d += timedelta(days=1)
        if fmt(d) != e['dur']:
            sys.exit(f'pdf_parse: duration mismatch on {e["date"]} {e["desc"][:50]!r}: '
                     f'printed {e["dur"]}, start/end imply {fmt(d)}')

    total = sum((to_td(e['dur']) for e in entries), timedelta())
    if stated:
        want = fmt(to_td(stated))
        if fmt(total) != want:
            sys.exit(f'pdf_parse: FATAL total mismatch -- parsed {fmt(total)} from '
                     f'{len(entries)} entries but the PDF header says {want}. '
                     f'Entries were dropped or misread; do NOT bill from this run.')
    return fmt(total)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('pdf')
    ap.add_argument('-o', '--out', default='-')
    a = ap.parse_args()

    entries, stated = parse(pdf_to_text(a.pdf))
    total = validate(entries, stated)
    payload = {'source': 'pdf', 'period_total': total, 'entries': entries}

    if a.out == '-':
        json.dump(payload, sys.stdout, indent=1, ensure_ascii=False)
    else:
        with open(a.out, 'w') as fh:
            json.dump(payload, fh, indent=1, ensure_ascii=False)
    print(f'pdf_parse: {len(entries)} entries, total {total} (matches PDF header)',
          file=sys.stderr)


if __name__ == '__main__':
    main()
