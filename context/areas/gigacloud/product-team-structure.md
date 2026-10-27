# Product team structure — CPO part-time transition

_status: proposal deck v1 (10 slides, UA; 2026-10-16, fork and hiring slides added 2026-10-20) from Alex's Miro board; management tasks split by owner (AO / EK / VS) in Alex's table; Edik's Product Lead job description drafted 2026-10-27; next step — Alex's own part-time terms and Edik's offer_
_updated: 2026-10-27_

## Snapshot

- **Why:** Alex's US move ([relocation](../relocation/README.md)). He goes part-time at GigaCloud in Q3'FY2026 and to ad-hoc consulting after that ("like Misha Sakun"); the proposal redistributes the product function's work around that. (chat, 2026-10-16)
- **Q3'FY2026 = Oct–Dec 2026** (inferred: the board tags the margin project Q3'FY2026 and dates its steps 11'2026–12'2026; Alex's FY2026 actuals pass is set for April 2027).
- **Plan, Q3'FY2026 → later** (chat, 2026-10-16):
  - Alex — part-time, focused on four projects + helping Edik → later ad-hoc consults.
  - **Fork into Q4'FY2026** (Alex's Miro picture, 2026-10-20): no replacement found → Alex stays part-time CPO; Product Operations moved into Operations / a Head of Product found → Alex becomes **Advisor** (product strategy, automation architecture). Advisor is the same role as the plan's ad-hoc consults and the TO BE «Advisor?» for Product Strategy (the deck now says Advisor in all three places).
  - Edik — becomes Product Lead, with a review of his terms ("Product Lead + перегляд"; the next step is an offer).
  - Vacancies (plan slide, synced with the hiring slide 2026-10-20) — the three hiring roles below + a Product manager as a transfer, ideally from Presales. The board's earlier «Аналітик в Operations» is now just «Analyst», as on the hiring slide.
  - **Hiring, three roles** (chat, 2026-10-20): 1 Head of Product — only if we decide to hire; 2 Analyst — the company's unit-economics tasks; 3 Business analyst — automating the Product Operations backlog, CRM team.
  - C-level / org structure — think about hiring a strong COO + a new org structure that splits the product function → later consider moving Product Operations into Operations and the Product Lead into the CTO function.
- **Availability, CA ↔ Kyiv** (chat, 2026-10-16): the overlapping hours are 07:00–09:00 CA = 17:00–19:00 Kyiv, and sometimes 23:00–24:00 CA = 09:00–10:00 Kyiv (next day); they are for the team weeklies and the ongoing project calls. The gap is 10 h, 9 h on 25.10–1.11.2026 and 14–28.03.2027 (tzdata 2026b), when the morning window lands at 16:00–18:00 Kyiv.
- **Edik and the team (Q3):** launches (new products / quarterly projects) + current tasks (team coordination: backlog, ad-hoc decisions). (chat, 2026-10-16)
- **Management & leadership split by owner** (Alex's table, a fragment; chat, 2026-10-27):
  - Стратегія — Alex (AO): GTM strategy with Sales and Marketing; annual and quarterly product plans (KRs and projects) from the GTM strategy and the other departments' expectations; people management (PDP, mentoring, compensation); automation architecture (data model, specs); business-process design around the products.
  - Операційний контроль — Edik (EK): the project portfolio (progress, deadlines); mentoring, training and upskilling the team; the team's organisational matters (hybrid work, vacations, the security situation, bonus calculation). Mentoring sits in both Alex's and Edik's rows.
  - Продуктова аналітика — VS: product insights from all data sources, lost-deal reasons, sales pipelines by product. Market analytics with Marketing is Edik's.
- **Alex's four projects (Q3'FY2026):** «Квоти і ціни 2.0» — owner COO (CRM operating model: quotas for existing and new customers, ad-hoc cases, sales convenience, historical prices); the CPO designs the pricing architecture and extra price rules and helps automate. «Оновлення PLM» — owner CPO, the product team's Q3 focus → [publication-process](publication-process.md). «Синергія з Київстар» — added by Alex 2026-10-20, name only (owner, scope and role TBD on the slide). «Маржинальність» — owner CPO; the first part is done, from here mostly coordinating COO, CFO and Country Director → roadmap on [pricing-unit-economics](pricing-unit-economics.md). (chat, 2026-10-16)
- **Product function, NOW → TO BE** (share of Product's tasks, per the board):
  - Product Operations 65 % — costing and prices, catalog data and its automation, contract and delivery processes, publication control, ad-hoc technical-process decisions: CPO → product team ⇒ **COO → Product Operations**.
  - Product Strategy 20 % — product strategy, coordinating technical solutions (implementation ↔ strategy ↔ deliverability and support), customer feedback: CPO ⇒ **Product Lead + CTO + Advisor?** (the board says «Consultant?»)
  - Product Marketing 15 % — interviews, market research, mystery shopping, sales enablement: Marketing Director + Product Marketing Manager, unchanged.
- **Deck:** `GigaCloud_Product Team Structure_16-OCT-2026.pptx` on Alex's MacBook Air (`~/Desktop/GigaCloud/`), built by `~/Desktop/GigaCloud/toolchain/team/build_team.py` (all wordings as constants; GigaCloud 2× template from `../plm/base_margin_v25.pptx`; render with the margin deck's `pp_render.sh`). Slides: cover · План дій · Розвилка на Q4’FY2026 · Едік і команда · Льоша: фокус на проєктах · Проєкт «Маржинальність» (Gantt) · Графік доступності (час CA / час Київ, the overlapping hours highlighted) · Задачі Product загалом (NOW → TO BE) · Наступні кроки · Найм: три ролі. The pre-2026-10-20 builder is kept as `build_team_2026-10-16.py`. Not committed (people and terms). Living-documents rule applies once Alex edits it.

## Active threads

- **Next steps (Alex's list, 2026-10-16, in his order):** 1 Alex's part-time hours / availability / financial terms · 2 an offer for Edik · 3 talk to Edik · 4 talk to the product team and the leadership team · 5 agree who owns the «Прибутковість / маржинальність / ефективність» direction · 6 decide the updated org structure · 7 open the vacancies. Owner: Mine. (chat, 2026-10-16)
- **Edik's offer — job description drafted** (chat, 2026-10-27): UA text for the Product Lead position, written as the current role in two blocks. Product management (9 items): his product-manager duties merged with market analytics with Marketing, pricing and discount policy, margin input data and the annual catalog price and data refresh. Team leadership (5 items): plans with the CPO and the project portfolio, technical solutions with the CTO, team coordination, mentoring, organisational matters incl. bonus calculation. PDP and compensation stay with Alex, as in the split table. Not committed (people and terms). Next: Alex's edits, then the offer. Owner: Mine.

## People

- Edik (Eduard, inferred the same Eduard who corrects the Юніт workbook) — product team; proposed Product Lead (job description drafted 2026-10-27); operational control and market analytics in the split table; owns input validation and the price update in the margin roadmap.
- VS — owns product analytics in the split table; not otherwise in the wiki, identity unknown. (chat, 2026-10-27)
- Misha Sakun — the precedent for ad-hoc consulting (role not on the board).

## Decisions

- -

## Open loops

- Mine — the seven next steps above.
- Theirs (Alex) — owner, scope and CPO / team role for «Синергія з Київстар» (TBD on the projects slide). (chat, 2026-10-20)
- Theirs (Alex) — for Edik's job description: whether he takes the CRM's Head of Product approvals (product revisions, publication exceptions) and his reports' PDP, and his position's official Ukrainian title. (chat, 2026-10-27)
- Mine — questions on the deck v1 for Alex: the two near-identical «Координація команди» stickies (merged), «Product Lead + перегляд» read as a review of terms, the duplicated description of the two long-term COO projects, the Gantt's November start and April 2027 annual refresh (not on the board), what the 65 / 20 / 15 % measure, Country Director named on the projects slide but owning nothing on the Gantt. (chat, 2026-10-16)

## Activity

- 2026-10-27 — management & leadership split table folded (AO strategy · EK operational control · VS product analytics); Edik's Product Lead job description drafted for his offer. (chat)
- 2026-10-20 — «Синергія з Київстар» added to Alex's Q3 projects (owner / scope / role TBD); the plan now says 4 projects. (chat)
- 2026-10-20 — plan's «Вакансії» synced with «Найм: три ролі»; Product manager kept as a transfer from Presales (Alex). (chat)
- 2026-10-20 — fork slide (Q3 part-time CPO → Q4 part-time CPO or Advisor) after the plan, hiring slide (three roles) last; «Advisor» unified on the plan and the TO BE slide — 10 slides. (chat)
- 2026-10-16 — deck v1 + availability slide (CA / Kyiv hours, weeklies and project calls in the overlap) — 8-slide UA deck from the Miro board («Frame 62») + Alex's next steps; Gantt for the margin project. (chat)
