# Київтеплоенерго hot-water readings: provider card

- **Meters:** `meters.json` → kte. Every account has hot-water meters only: Антоновича two, Победы
  and Смоленская one each. They are the same physical meters as Водоканал's hot meters, so a hot
  reading goes to both cabinets. No heat meters are on Alex's accounts.
- **Path:** from `https://kte.kmda.gov.ua/my-cabinet/userhome_new`, an account's «Передача показань
  лічильників» opens `/my-cabinet/send_counters/send_current_new/<cabinet_id>`. On a login page, Alex
  logs in; the browser autofills his password and the agent never presses «Увійти».
- **The table:** № ліч. · Місце розташування · Послуга (ГВ) · Одиниця виміру (м3) · Попередні
  показання, with the «Історія лічильника» link · Поточні показання* · Дата наступної повірки. The input
  is `counter_last_<meter_id>_1`, placeholder `00000.0000`, max 11 characters.
- **Format** (printed under the table): hot water 5 digits before the point and 4 after, e.g.
  `1.43` → `00001.4300`; heat 6 and 4.
- **Previous reading:** take the highest of three values.
  - The «Попередні показання» column is the last *subscriber* reading.
  - The input can come prefilled with a newer accepted reading, such as a KTE control reading.
  - The newest line of the meter's history is the third source.

  On 2026-11-19 Антоновича's kitchen meter showed 1.03 in the column, but the field held 1.16 from a
  «Контрольне знімання» dated 01.11.2026 (entered 05.11). Победы and Смоленская had empty fields.
- **Shared with Водоканал:** the same hot meter can hold different values in the two cabinets, and
  KTE's «Контрольне знімання» settles which one is real. On 2026-11-24 Победы read 13 on the meter
  and at KTE (inspection 30.10.2026) but 15.5 at Водоканал.
- **History:** `/my-cabinet/send_counters/history_counters/<cabinet_id>/<meter_id>`. Each line holds the
  date, «Зараховано», a code («> 50»), the reading, the kind («Поточні», or «Перерахунок» for a
  recalculation), the source and when it was entered (Kyiv time). The source is «ОК абонента» for
  the subscriber, «Контрольне знімання» for a KTE inspection or «Розрахункові» for a calculated
  value («Плановий показник», «Показник будинкового лічильника (не передача >3 місяців)» or «Норма
  (не передача >3 місяців)»). Смоленська had «Норма» bills for May–September 2026 until a
  «претензія» on 24.10.2026 recalculated them to 0. Победы had a 16.1 building-meter estimate from
  March 2025 until an inspection on 30.10.2026 recalculated 01.03.2025–30.09.2026 to 0.
- **Submit:** one «Передати показання» button sends every row of the account; there is no per-row
  selection. Send only when every meter of the account has a new value in hand. The page then says
  «Дякуємо за внесення показників! Останнього тижня наступного місяця заходьте сюди знову!».
- **When:** the thank-you text asks for the last week of the month, and the history shows the
  subscriber's readings landing then (22.06, 26.07, 30.08, 27.09, 25.01). A reading sent on
  20.11.2026 (Kyiv) was still accepted, «Зараховано».
