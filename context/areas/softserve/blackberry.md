# BlackBerry: Secure Communications services account, QNX and AI-adoption pursuits

_status: a 10+-year services account on BlackBerry's Secure Communications products that keeps renewing (FY27 extensions ~$1.15M won 2026-03) but has lost every recent new bid, the latest being AtHoc's $600K follow-on and $85K POC on 2026-11-05 ("client priorities/org change"). Two expansion pursuits, neither with revenue: QNX embedded (three CRM opportunities at 1-Qualify, closes pushed to Jan–Feb 2027) and AI adoption (VP Paul O'Hagan's 2025 ask). Next: a meeting with Jason Whissell, VP of IT for QNX, at AWS re:Invent (proposed Tue 2026-12-01, TAO meeting space), with the AI Jumpstart for Hardware & Embedded R&D as the pitch (inferred)._
_updated: 2026-11-20_

## Snapshot

- **Base account.** SoftServe has supported BlackBerry's Secure Communications business (the UEM products, SecuSmart, the Dynamics SDK) for more than 10 years. Renewals: FY2026 $1.09M (won 2025-03) · SecuSmart support $309K (2025-08) · FY27 extensions, SecuSmart $600K and SDK $547K (both 2026-03). Lost: Workspaces support (the client built it in-house) · Access Desktop support · the Azure-to-AWS migration · AtHoc SQL Server migration, whose $50K assessment was won in 2026-07 but whose $600K follow-on and $85K POC were lost on 2026-11-05. (chat, 2026-11-19)
- **Pursuit 1, QNX / embedded (since 2025-03).** The aim is to move from Secure Communications into BlackBerry's IoT division, QNX. Oksana Sharonina ran an internal "BlackBerry QNX – embedded systems brainstorming" on 2025-03-11. In 2025-04 Kristen Kearon (AWS, Sr. AM ISV Canada) introduced the team to Sat Gill, QNX's Strategic Alliances Director; the paste credits its reader ("your guidance", not named) with bringing Dmytro Dudchenko into the intro call and keeping an external automotive expert for later. Three CRM opportunities, all at 1-Qualify, none won: "Embedded systems development for QNX" $100K (open since 2025-03) · "IoT implementation for QNX" $600K · "QNX – Intro to SoftServe follow-up" $100K. The outreach sheet's Evidence tab and the two-pager count only the first two (~$700K, "= legacy code change use case"). (chat, 2026-11-19)
- **Pursuit 2, AI-adoption advisory (2025-09 to 2025-11).** At the 2025-09-24 QBR Paul O'Hagan (VP) asked SoftServe for advice on AI adoption at a strategic level. BlackBerry used GenAI for coding but no agents yet; with ~2,000 employees and 17+ products the answer had to work across the whole organisation; teams adopted AI in different ways with different tools; and they worried about licence compliance of AI-generated code (relayed by Mykhailo Zhelieznov). The paste stops there: what SoftServe answered and how the pursuit ended isn't in the wiki. (chat, 2026-11-19)
- **In the Jumpstart outreach.** On the 2026-11-16 sheet BlackBerry (QNX) is a hardware row: tier "HW: Next", segment "Semiconductor & edge", owner Alex Bekh, delivery Oleg Khomyk, no R&D owner → [jumpstart-science](jumpstart-science.md#active-threads). Alex had a hardware two-pager built on 2026-11-18 (OneDrive `Projects/Jumpstart for scientists/Current offerings/AI Jumpstart for Hardware & Embedded R&D/Account two-pagers/`; data in `one-pager-build/accounts/blackberry.json`): QNX makes the safety-certified OS and board support software inside cars, robots and medical devices; ~190 BSP, driver, kernel and safety-test engineers of 1,749 staff; likely problem, a stream of new chips to bring up and drivers to port from SDP 7.1 to 8.0 and safety-test, with royalties paid only as customers' products ship (inferred); signals, the 10-K (2026-04: AI-assisted code must show human review) and driver and safety-test hiring in Hyderabad and Ottawa (2026-03 to 07); champions from quick research, Justin Moon, Rajkumar Jain, Jordan Edgecombe. The same day Alex drafted a note to Alex Bekh pitching the firmware program for BlackBerry; whether it was sent isn't recorded. (chat, 2026-11-18) **Corrected 2026-11-20:** the account row now reads "SoftServe client for 10+ years; three QNX opportunities open (~$800K)", where it said "QNX legacy deal open (~$700K)" (the 6 Nov hardware session deck's count of two of them, read as the legacy-code use case), and the need signals lead with the Sep 2025 QBR ask; the tracker record says the same, and `one-pager-build/PROVENANCE.md` holds the sources. (chat, 2026-11-20)
- **Fit with the hardware Jumpstart (analysis, chat 2026-11-19; inferred until tested with the account team).** Only the QNX side fits it; Secure Communications builds enterprise software, which is the AI Jumpstart for SDLC. The QNX opportunities sell embedded capacity to the world's RTOS specialists, who staff that work in-house; the Jumpstart sells enablement of their own engineers instead, and its legacy-code module already names QNX code (`Current offerings/Agentic Engineering for Hardware Teams.pptx`, 37 slides, 2026-11-18). BlackBerry's own worry, licence compliance of AI-written code, is the entry; the decks check a licence only when an agent reuses an existing driver. QNX also runs on AWS Graviton instances (since re:Invent 2022), so agents can test against cloud targets before boards. Abbott's QNX/RTOS legacy-code discovery ($93K) was lost in 2026-01 to "client priorities" (Evidence tab).

## Active threads

- **The re:Invent meeting with Jason Whissell, VP of IT for QNX.** On 2026-11-04 Oksana reported that he had registered for the AWS re:Invent LAVO event on 2026-12-02 (re:Invent runs 11-30 to 12-04 in Las Vegas); RJ Bibby proposed meeting him "on the Tuesday" in the TAO meeting space, which makes it 2026-12-01, since 12-02 is a Wednesday. The paste's closing line puts Alex on the meeting ("…you can help to make the meeting with this guy"); who wrote it isn't stated. He owns IT, not engineering, so the ask is an introduction to QNX engineering leadership and a discovery workshop in January, when the opportunities are due to close (inferred). A web search found no public trace of him; the title is Oksana's. (chat, 2026-11-19)

## People

- Alex Bekh — account owner (also Generac's) → [people page](../../people/alex-bekh.md).
- Oksana Sharonina — Client Partner; ran the 2025 QNX brainstorm and reported the re:Invent opening.
- Oleg Khomyk — Delivery Director · Mykhailo Zhelieznov — delivery manager, who relayed Pursuit 2's context.
- Client: Domenic Memmolo and Michko Ristovic (the bi-weekly sync) · Paul O'Hagan (VP; the 2025 AI-adoption ask) · Sat Gill (QNX Strategic Alliances Director) · Jason Whissell (VP of IT, QNX). The two-pager's QNX engineering champions (unverified): Justin Moon, head of Core Product Engineering · Rajkumar Jain, VP QNX Engineering (Hyderabad) · Jordan Edgecombe, Senior Manager, BSP Framework.
- Kristen Kearon — AWS, Sr. AM ISV Canada; made the QNX introduction · RJ Bibby — proposed the re:Invent slot (role not stated).
- Dmytro Dudchenko — joined the 2025 QNX intro call → [people page](../../people/dmytro-dudchenko.md).

## Decisions

-

## Open loops

Mine:
- **Help make the Jason Whissell meeting at re:Invent** (proposed Tue 2026-12-01, TAO meeting space): the pitch, the ask and a leave-behind. (chat, 2026-11-19)

Theirs:
- **RJ Bibby / Oksana** — confirm the slot with Jason Whissell. (chat, 2026-11-19)

Gaps:
- How Pursuit 2 ended: what SoftServe answered Paul O'Hagan in 2025-09 to 11 (the paste stops mid-way).
- Paul O'Hagan's title: "VP" per the account team; public sources place him at BlackBerry without one.

## Activity

- 2026-11-20 — Two-pager corrected (chat, 2026-11-20) — three QNX opportunities (~$800K) instead of a "~$700K legacy deal", the Sep 2025 QBR ask as the lead need signal; rebuilt on two pages, the tracker record synced.
- 2026-11-19 — Account history (chat, 2026-11-19) — the base account, both pursuits and the re:Invent opening; page created, with the fit to the hardware Jumpstart.
- 2026-11-18 — Hardware two-pager (chat, 2026-11-18) — BlackBerry researched and two-pagered for the hardware Jumpstart; a note to Alex Bekh drafted.
