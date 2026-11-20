#!/usr/bin/env python3
"""Check rendered statement PDFs against their file names before anything is uploaded.

usage: python3 -I qa.py --accounts references/<provider>-accounts.json OUT_DIR

Every PDF: no page is blank (only the print header/footer); its folder's account number is in
the text.
Yasno
  receipts ("... платіж YYYY-MM-DD AMOUNT грн"): the amount and the date are in the text;
  "Історія платежів YYYY": payment rows exist and all of them are from YYYY;
  "Абонентська книжка YYYY": "YYYY рік" shown, no other year group, Сплачено/Баланс columns present.
Київводоканал (statements filtered by account and period)
  no other account's number in the text;
  "Абонентська книжка YYYY": month rows ("листопад-2026") exist and are all from YYYY,
  Оплачено/Борг на кін. columns present;
  "Здійснені платежі YYYY": every payment date is in YYYY (or the table says "Немає даних"),
  the РАЗОМ total is shown.
Київтеплоенерго
  "Усі адреси - Стан оплат DATE" (the status page, one copy per apartment): every account of the
  JSON is on it, with its Фінансовий стан column;
  "Звіт про оплати - SERVICE YYYY": no other account's number; the service shows in the filter and
  in the caption («Послуга: …»); the period is Січень YYYY – Грудень YYYY; month rows exist, are
  all from YYYY and none repeats; the first and last columns (ПОЧАТОК / КІНЕЦЬ) are not clipped.
Київгаз
  "Рахунки та оплати YYYY": no other account's number; both year selects show YYYY (the gas bills
  and the building's ТО ВБСГ bills); bill rows exist and no month repeats; every payment date is in
  YYYY; the last bill column (До сплати) is not clipped.
Exit 1 when anything fails; the run stops there.
"""
import argparse, json, os, re, subprocess, sys

MON = {"01": "січ", "02": "лют", "03": "бер", "04": "квіт", "05": "трав", "06": "черв",
       "07": "лип", "08": "серп", "09": "вер", "10": "жовт", "11": "лист", "12": "груд"}
MONTHS_FULL = "січень|лютий|березень|квітень|травень|червень|липень|серпень|вересень|жовтень|листопад|грудень"
PRINT_TIME = r"\d\d\.\d\d\.\d{4}, \d\d:\d\d"


def page_texts(pdf):
    info = subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout
    n = int(re.search(r"Pages:\s+(\d+)", info).group(1))
    return [subprocess.run(["pdftotext", "-f", str(i), "-l", str(i), "-layout", pdf, "-"],
                           capture_output=True, text=True).stdout for i in range(1, n + 1)]


def check_yasno(f, y_text, text, problems, folder, ps):
    m = re.search(r"платіж (\d{4})-(\d\d)-(\d\d) (-?[\d.]+) грн", f)
    if m:
        y, mo, d, amt = m.groups()
        whole, frac = amt.split(".")
        spaced = f"{int(whole):,}".replace(",", " ") + "." + frac
        if f"{spaced} ₴" not in text and f"{amt} ₴" not in text:
            problems.append(f"{f}: amount {spaced} not in text")
        if f"{int(d)} {MON[mo]} {y}" not in text:
            problems.append(f"{f}: date {int(d)} {MON[mo]} {y} not in text")
        return
    m = re.search(r"(Історія платежів|Абонентська книжка) (\d{4})", f)
    if not m:
        return
    kind, y = m.groups()
    if kind == "Історія платежів":
        years = re.findall(r"\b\d{1,2} [а-яії]+ (\d{4})\b", text)
        if not years:
            problems.append(f"{f}: no payment rows")
        other = sorted({x for x in years if x != y})
        if other:
            problems.append(f"{f}: rows from other years {other}")
    else:
        if f"{y} рік" not in text:
            problems.append(f"{f}: '{y} рік' missing")
        if re.search(r"\b(?!%s)\d{4} рік" % y, text):
            problems.append(f"{f}: another year's group is shown")
        if "Баланс" not in text or "Сплачено" not in text:
            problems.append(f"{f}: table columns clipped")
        months = len(re.findall(r"\b(?:%s) %s\b" % ("|".join(MON.values()), y), text))
        print(f"  {folder} · {kind} {y}: {months} month rows, {len(ps)} pages")


def check_vodokanal(f, text, problems, folder, ps, acct, all_accts):
    others = sorted(a for a in all_accts if a != acct and re.search(r"\b%s\b" % a, text))
    if others:
        problems.append(f"{f}: other accounts in the text {others}")
    m = re.search(r"(Абонентська книжка|Здійснені платежі) (\d{4})", f)
    if not m:
        return
    kind, y = m.groups()
    if kind == "Абонентська книжка":
        years = re.findall(r"\b(?:%s)-(\d{4})\b" % MONTHS_FULL, text, re.I)
        if not years:
            problems.append(f"{f}: no month rows")
        other = sorted({x for x in years if x != y})
        if other:
            problems.append(f"{f}: months from other years {other}")
        # pdftotext splits the two-line header cells; the last column's "кін" proves no clipping
        if "Оплачено" not in text or not re.search(r"\bкін\b", text):
            problems.append(f"{f}: table columns clipped")
        print(f"  {folder} · {kind} {y}: {len(years)} rows, {len(ps)} pages")
    else:
        body = re.sub(PRINT_TIME, " ", text)
        years = re.findall(r"\b\d\d\.\d\d\.(\d{4})\b", body)
        if "Немає даних" not in text:
            other = sorted({x for x in years if x != y})
            if other:
                problems.append(f"{f}: payment dates from other years {other}")
            if len(years) < 3:  # the period field alone holds two dates
                problems.append(f"{f}: no payment rows")
        total = re.search(r"Разом:\s*([\d\s.,]+?)\s*грн", text, re.I)  # shown upper-cased by CSS only
        if not total:
            problems.append(f"{f}: Разом total missing")
        print(f"  {folder} · {kind} {y}: {max(len(years) - 2, 0)} payments, total {total.group(1).strip() if total else '-'}, {len(ps)} pages")


# file-name service → the name the report prints («Послуга: …»); kte.js K_SERVICES holds the same
KTE_CAPTION = {"Гаряча вода": "Гаряча вода", "Теплова енергія": "Теплова енергія",
               "Абонплата ГВ": "Плата за абонентське обслуговування ГВ",
               "Абонплата ТЕ": "Плата за абонентське обслуговування ТЕ"}
# a month row: month, seven amounts ("-" when empty), year; the month and the year share a cell on
# two lines, so pdftotext puts the amounts between them
KTE_ROW = r"(?<!\S)(1[0-2]|[1-9]) (?:(?:-?\d+\.\d\d|-) ){7}(\d{4})(?!\S)"


def check_kte(f, text, problems, folder, ps, acct, all_accts):
    if " - Стан оплат " in f:
        missing = sorted(a for a in all_accts if f"Особовий рахунок: {a}" not in text)
        if missing:
            problems.append(f"{f}: accounts missing {missing}")
        if "Фінансовий" not in text:
            problems.append(f"{f}: Фінансовий стан column missing")
        print(f"  {folder} · Стан оплат: {len(all_accts) - len(missing)} accounts, {len(ps)} pages")
        return
    m = re.search(r"Звіт про оплати - (.+) (\d{4})\.pdf$", f)
    if not m:
        problems.append(f"{f}: unexpected file name")
        return
    svc, y = m.groups()
    others = sorted(a for a in all_accts if a != acct and a in text)
    if others:
        problems.append(f"{f}: other accounts in the text {others}")
    cap = KTE_CAPTION.get(svc)
    if not cap or text.count(f"Послуга: {cap}") < 2:  # the filter and the caption
        problems.append(f"{f}: service {cap or svc!r} not in both the filter and the caption")
    if not re.search(r"Період: з Січень %s по Грудень %s" % (y, y), text):
        problems.append(f"{f}: period is not Січень–Грудень {y}")
    rows = re.findall(KTE_ROW, text)
    if not rows:
        problems.append(f"{f}: no month rows")
    other = sorted({yy for _, yy in rows if yy != y})
    if other:
        problems.append(f"{f}: months from other years {other}")
    if len({mm for mm, _ in rows}) != len(rows):
        problems.append(f"{f}: a month appears twice")
    if "ПОЧАТОК" not in text or "КІНЕЦЬ" not in text:
        problems.append(f"{f}: table columns clipped")
    print(f"  {folder} · {svc} {y}: {len(rows)} months, {len(ps)} pages")


# a gas bill row: month, На початок, Об'єм (3 decimals), Тариф, Нараховано, Сплачено, Пеня, До сплати
GAS_ROW = r"\b(%s) -?\d+\.\d\d \d+\.\d{3} \d+\.\d{3} -?\d+\.\d\d -?\d+\.\d\d -?\d+\.\d\d -?\d+\.\d\d" % MONTHS_FULL.title()


def check_kyivgaz(f, text, problems, folder, ps, acct, all_accts):
    m = re.search(r"Рахунки та оплати (\d{4})\.pdf$", f)
    if not m:
        problems.append(f"{f}: unexpected file name")
        return
    y = m.group(1)
    others = sorted(a for a in all_accts if a != acct and a in text)
    if others:
        problems.append(f"{f}: other accounts in the text {others}")
    if f"Рахунки {y}" not in text:
        problems.append(f"{f}: the bills' year select does not show {y}")
    if f"будинку {y}" not in text:
        problems.append(f"{f}: the ТО ВБСГ year select does not show {y}")
    months = [mm for mm in re.findall(GAS_ROW, text)]
    if not months:
        problems.append(f"{f}: no bill rows")
    if len(set(months)) != len(months):
        problems.append(f"{f}: a month appears twice")
    body = re.sub(PRINT_TIME, " ", text)
    dates = re.findall(r"\b\d\d\.\d\d\.(\d{4})\b", body)
    other = sorted({x for x in dates if x != y})
    if other:
        problems.append(f"{f}: payment dates from other years {other}")
    if "До сплати" not in text:
        problems.append(f"{f}: table columns clipped")
    print(f"  {folder} · Рахунки та оплати {y}: {len(months)} bill months, {len(dates)} payments, {len(ps)} pages")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--accounts", required=True)
    ap.add_argument("out")
    a = ap.parse_args()
    cfg = json.load(open(a.accounts, encoding="utf-8"))
    provider = cfg["provider"]
    acct = {x["folder"]: x["account_number"] for x in cfg["accounts"]}
    problems, count = [], 0
    for dp, _, fs in os.walk(a.out):
        for f in sorted(fs):
            if not f.endswith(".pdf"):
                continue
            count += 1
            pdf = os.path.join(dp, f)
            folder = os.path.relpath(pdf, a.out).split(os.sep)[0]
            ps = page_texts(pdf)
            text = re.sub(r"[\s\u00a0\u202f]+", " ", " ".join(ps))
            # blank = nothing but the print header line (print time + title) and the URL/page footer;
            # a last page carrying only the site's own footer is a normal print and passes
            for i, p in enumerate(ps, 1):
                lines = [l for l in p.splitlines() if l.strip()]
                body = [l for l in lines[1:] if "://" not in l]
                if not body:
                    problems.append(f"{f}: page {i} is blank")
            if folder in acct and acct[folder] not in text:
                problems.append(f"{f}: account {acct[folder]} not in text")
            if provider == "Yasno":
                check_yasno(f, None, text, problems, folder, ps)
            elif provider == "Київводоканал":
                check_vodokanal(f, text, problems, folder, ps, acct.get(folder), set(acct.values()))
            elif provider == "Київтеплоенерго":
                check_kte(f, text, problems, folder, ps, acct.get(folder), set(acct.values()))
            elif provider == "Київгаз":
                check_kyivgaz(f, text, problems, folder, ps, acct.get(folder), set(acct.values()))
            else:
                problems.append(f"{f}: qa.py has no checks for provider {provider!r}")
    print(f"{count} PDFs checked, {len(problems)} problems")
    for p in problems:
        print(" -", p)
    sys.exit(1 if problems or not count else 0)


if __name__ == "__main__":
    main()
