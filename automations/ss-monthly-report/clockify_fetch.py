#!/usr/bin/env python3
"""clockify_fetch.py — Clockify REST API -> the same entries JSON pdf_parse.py emits.

    ./clockify_fetch.py --month 2026-07 --project SS [-o entries.json]

Reads CLOCKIFY_API_KEY from the environment (config.sh pulls it from the macOS
Keychain). Stdlib only, so it runs under launchd with no venv.

Why this exists alongside pdf_parse.py: the PDF route needs a logged-in browser
and a human to press "Print PDF", which cannot happen at 08:00 unattended. The
API returns the same data with no browser at all. pdf_parse.py stays as the
fallback for when the key is absent or the API is down.

Timezone matters: the API reports every instant in UTC, while the PDF (and the
Excel the client reads) is in the user's own zone. Entries are converted to the
Clockify profile timezone before formatting, so an evening entry does not shift
onto the wrong calendar day.
"""
import argparse
import calendar
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

API = 'https://api.clockify.me/api/v1'
ISO_DUR = re.compile(r'^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:([\d.]+)S)?$')


def get(path, key, **params):
    url = f'{API}{path}'
    if params:
        url += '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'X-Api-Key': key, 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:300]
        sys.exit(f'clockify_fetch: HTTP {e.code} on {path} -- {body}')
    except urllib.error.URLError as e:
        sys.exit(f'clockify_fetch: network error on {path} -- {e.reason}')


def iso_dur(s):
    m = ISO_DUR.match(s or '')
    if not m:
        raise ValueError(f'unparsable duration {s!r}')
    d, h, mi, sec = (int(x) if x else 0 for x in (m.group(1), m.group(2), m.group(3),
                                                  float(m.group(4) or 0)))
    return timedelta(days=d, hours=h, minutes=mi, seconds=sec)


def fmt(td):
    s = int(round(td.total_seconds()))
    return f'{s // 3600:02d}:{s % 3600 // 60:02d}:{s % 60:02d}'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--month', required=True, help='YYYY-MM to report on')
    ap.add_argument('--project', default='SS', help='Clockify project name (default SS)')
    ap.add_argument('-o', '--out', default='-')
    a = ap.parse_args()

    key = os.environ.get('CLOCKIFY_API_KEY', '').strip()
    if not key:
        sys.exit('clockify_fetch: CLOCKIFY_API_KEY not set -- '
                 'store it with:  security add-generic-password -U -a "$USER" '
                 '-s CLOCKIFY_API_KEY -w <key>')

    me = get('/user', key)
    uid, ws = me['id'], me['activeWorkspace']
    tz = ZoneInfo(me.get('settings', {}).get('timeZone') or 'Europe/Kyiv')

    projects = get(f'/workspaces/{ws}/projects', key, name=a.project, **{'page-size': 200})
    match = [p for p in projects if p['name'] == a.project] or \
            [p for p in projects if p['name'].lower() == a.project.lower()]
    if not match:
        sys.exit(f'clockify_fetch: no project named {a.project!r} in workspace '
                 f'(saw: {[p["name"] for p in projects][:10]})')
    pid = match[0]['id']

    y, mo = (int(x) for x in a.month.split('-'))
    start_local = datetime(y, mo, 1, tzinfo=tz)
    end_local = datetime(y, mo, calendar.monthrange(y, mo)[1], 23, 59, 59, tzinfo=tz)
    z = lambda d: d.astimezone(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

    raw, page = [], 1
    while True:
        batch = get(f'/workspaces/{ws}/user/{uid}/time-entries', key,
                    start=z(start_local), end=z(end_local), project=pid,
                    page=page, **{'page-size': 200})
        raw.extend(batch)
        if len(batch) < 200:
            break
        page += 1
        if page > 50:
            sys.exit('clockify_fetch: pagination runaway (>10k entries)')

    entries, total = [], timedelta()
    for e in raw:
        iv = e['timeInterval']
        if not iv.get('end'):
            continue                                    # tracker still running -- not billable yet
        s = datetime.fromisoformat(iv['start'].replace('Z', '+00:00')).astimezone(tz)
        en = datetime.fromisoformat(iv['end'].replace('Z', '+00:00')).astimezone(tz)
        dur = iso_dur(iv['duration'])
        total += dur
        entries.append({'date': s.strftime('%d/%m/%Y'),
                        'desc': (e.get('description') or '').strip(),
                        'start': s.strftime('%H:%M:%S'),
                        'end': en.strftime('%H:%M:%S'),
                        'dur': fmt(dur)})

    entries.sort(key=lambda e: (datetime.strptime(e['date'], '%d/%m/%Y'), e['start']), reverse=True)
    payload = {'source': 'clockify-api', 'period_total': fmt(total), 'entries': entries}

    if a.out == '-':
        json.dump(payload, sys.stdout, indent=1, ensure_ascii=False)
    else:
        with open(a.out, 'w') as fh:
            json.dump(payload, fh, indent=1, ensure_ascii=False)
    print(f'clockify_fetch: {len(entries)} entries for {a.month} '
          f'({a.project}), total {fmt(total)}', file=sys.stderr)


if __name__ == '__main__':
    main()
