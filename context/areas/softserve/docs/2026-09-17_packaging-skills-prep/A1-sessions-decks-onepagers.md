# A1 — Sessions: decks, one-pagers, packaging (Aug–Sep 2026)

_Research pass for the Oracle accelerator-pack packaging skills. Read-only. Compiled 2026-09-17. COMPLETE._
_Sources: seven local Claude Code session transcripts (`~/.claude/projects/-Users-olekorlov-Documents-GitHub-AO-Personal-OS/`), the context wiki (`context/areas/softserve/oracle.md`, `oracle-packs.md`, `oracle-ai-offerings.md`, `calls/oracle/*`, `docs/2026-09-16_wfo-pack-spec-for-demo.md`), and `.claude/references/slide-design.md` + `client-documents.md`._

**Method note:** Alex's messages in the big deck sessions are sparse text; most of his decisions were made through **decision widgets** (AskUserQuestion) and **annotated screenshots**. The widget answers are verbatim and are quoted below — they are the highest-signal record of his taste.

---

## 1. Session-by-session log

### S1 · 2026-09-10/11 · `deb798ac` (29 MB) — the 10-slide internal Oracle-packs section deck
**This is the closest existing thing to a "sales deck" skill and it already encodes the 13 components.**

**Alex's brief (verbatim structure, his own ordering):**
> "I need to create deck for internal presentation for SS delivery and sales teams, the part on the Oracle packs specifically. I want the following structure: Title · Oracle dedicated practice: one-liner about practice + name 4 Oracle platforms we focus on (colored big cards with name and 3-5 words one-liner) … · Oracle packs roadmap … · 3 packs we cover today (numbered big cards …) · **2 slides per each of the packs**."
> "For the WF pack I have 2 slides in WF_draft presentation (actually they are 100% complete content wise, just fix layouts a bit)."
> "The remaining two I want to have in **the same structure (problem, solution, verticals, arch levels, packages, reference commercial case, artifacts + architecture, features, screenshot)**. **If smth is not available for one of the blocks suggest me relevant smart replacement (approve with me, then implement).** Use Fable to come up with replacement options."
> "The content you may need: Local pack's folders … Screenshots — they are there in WF_draft … the draft of the full deck where I will add my slides … Roadmap slide from AI use cases map red-team session."
> "Decide what parts of the process including slides may require Fable, and split work accordingly if needed."

Follow-up two minutes later:
> "Important note: the 2nd slide should contain additional block: **Commercial proof: logo of the company (real image, not text) + 3-5 words one-liner. So that the 2nd slide of each pack looks like a customer story.**"

**Resulting two-slide anatomy per pack** (from `oracle-packs.md`): Slide A = goal · use case · solution layers · proof · verticals · service packages · artifacts. Slide B = architecture · capabilities · product screenshot · commercial proof (customer logo + one line) · contacts.

**Alex's decision-widget answers (verbatim option labels he picked):**
| Question | His answer | The rule it encodes |
|---|---|---|
| Proof block across three packs when only some have results (rule 11 would say drop for all) | **"Keep WfO untouched, vary the headings"** | Don't touch slides he has already signed off. Honest variation of the *label* ("PROOF OF VALUE · BOSCH" / "FIRST ENGAGEMENT · DHL") beats forcing one uniform label or deleting the strongest numbers. |
| What goes in the SERVICE PACKAGES block for a pack with no S/M/L | **"Reframe the block: 'What the PoC buys'"** (rejecting "One real number + To be defined" and "Indicative ranges by analogy") | **Never invent indicative tiers.** When a pack has no tier model, change the block's question rather than fake the answer: PoC · 12 weeks · €192.5K with IN / NOT IN SCOPE lists. |
| Pack 3 name: "Account Insights" (folder/slide) vs "AI Signal-Impact Engine" (PDF/tracker) | **"Account Insights"** | The pack name is Alex's call and one name wins everywhere; the files follow. |
| Platform card for the Fusion layer | **"Oracle AI for Fusion Apps"** | Use Oracle's own H1/umbrella name, not the URL slug "Oracle Fusion AI". |
| WfO PoV price €100K on slide vs €90K on the one-pager | **"€90K — the slide is a slip"** | Collateral is the source of truth; the deck must never contradict the artifact thumbnail shown on the same slide. |
| "PROVEN WITH BOSCH / RIYADH AIR" over caveated figures | **"Rename to 'PROOF OF VALUE · <customer>'"** | Never write "PROVEN" over PoV targets; one grammatical family across peers. |
| Infra run-rate asymmetric across packs (Large Doc had ~€10K/mo, WfO slide had none) | **"Drop it from the Large Document slide"** | Symmetry across peer packs beats completeness on one. |

**Other outcomes worth baking in:**
- The **editorial pass was the highest-value step** — it caught the €100K/€90K contradiction, the "PROVEN" overclaim, and a slide claiming DHL had bought the pack's scope when the signed SoW contracts something else. The deck now states on-slide *"the scope below is the pack's PoC, not the DHL SoW deliverable."*
- Naming research corrected **two of Alex's own four platform labels** ("Oracle AI Lakehouse" → **Oracle Autonomous AI Lakehouse**; "NVIDIA NeMo Agents" → **NVIDIA NeMo Agent Toolkit**), and established that Oracle never writes "AIDP" in customer-facing copy. Durable home: `context/areas/softserve/oracle-ai-offerings.md` §Naming.
- Two real content bugs inherited from his "content-complete" slides: **vertical icons were white-on-transparent PNGs on a white slide (invisible, not missing)** and **the capabilities table overflowed off the bottom of the slide**.
- Deck was built on the **parent deck's own master** (`master3` / `Title-1Column`) so the slides paste in without restyling.
- Model split, as instructed: **Fable only for replacement-option generation and the final editorial pass; everything mechanical on Opus.**
- ⚠️ Deck is **internal-only by construction** — it carries package prices, DHL's €192.5K and DHL's named accounts (Meta, HPE, Vertiv) inside a screenshot. Must be stripped for any external cut.

### S2 · 2026-09-10/11 · `d5a67a5b` (19 MB) — sibling block, "Agentic OS for Knowledge Workers"
Not an Oracle pack, but the **process** is the same and Alex stated his standing expectations explicitly:
> "I encourage u to **reuse existing content from numerous [existing] decks and not to invent new visualizations**."
> "**Delegate to Opus wherever possible to not use Fable where that doesn't bring much extra value.**"
> "**Clarify expectations with me before building when not sure / vague req-s.**"
> Positioning instruction: "it should be **positioned as a PoV of a general one** for Knowledge Workers + **it should not be tightened to SDLC** (because in SS, SDLC AI solutions is a different stream not covered by this session)."
Widget answers: "All 8 as listed", "**Separate pptx, same idiom**", "Fill the scratch copy", "Payworks demo", "Download [the logo] from payworks.ca".
Process learnings: the session ran a **clarification round grounded in an inventory of what actually exists** (decks inventoried, logos hunted, master idiom dumped) *before* building; the deliverable was a **contact sheet of renders** for review, then a **polish round** (equal list slots, uncramped labels, two-line captions). Alex's only text messages during the build: **"u are asking for too many permissions - can we fix it fast? spin opus subagent for this question"** and, hours later, **"alive?"** — permission-prompt storms and long silent fan-outs are both real failure modes for a skill that fans out.

### S3 · 2026-09-10 · `99e4dea1` (2.7 MB) — Account Insights one-pager (Vlad's) + SBG scope
> "@…/Packs/Account Insights/AI Signal-Impact Engine - Accelerator One-pager.pdf — Pls process latest updates related to the scope of SBG project (see newest SOW + UC I just uploaded) + **DHL-based pack (it has slightly shifted from original idea; working name for package is either Account insights or AI Signal-Impact Engine)**."
Learnings: the pack **drifted from the customer engagement that spawned it** — DHL's signed UC #6 delivers per-account executive briefings + discussion guides; the pack delivers **one signal → structured opportunity/risk JSON per affected account**. A packaging skill must record (a) the working name, (b) the divergence from the source SoW, and (c) that the pack is being **written ahead of its own evidence** ("Proof: none yet — PoC in preparation").
Also: the Account Insights one-pager carries a **capability matrix with three lenses** — *Oracle pack provides / SoftServe status / custom work per engagement* — plus a **fourth column naming the artifact that would accelerate development**. That fourth column is the productization to-do list. Honest read printed in the pack: almost nothing comes from the Oracle+NVIDIA AI-Q baseline.

### S4 · 2026-08-21 → 08-25 · `1c693a2e` (13 MB) — packaging the AI Lakehouse quick start (**the packaging METHOD session**)
**Brief:**
> "we need to prepare a couple of options of how we could pack AI-Lakehouse quick start programs - smth like **30-45days enablement offer allowing company to get early first PoV at fixed price**. It should be **generic offer conveying that message, while having 3 specific use cases**."
> "It could be **inspired by packaging we've done for Workforce optimization with Oracle, but this was quite detailed**."
> "Consider the tailored option for customers who already have Fusion Apps … **connection shouldn't be vague and boilerplate, but specific**."
> "**Define thorough plan** to handle this preparation and research given all the uncertainties, **ask me anything you really need**, then produce your suggestion in a form of slidedeck (4-5 slides - 1-2 for general idea, 3 slides 1 per specific case)."

**The sequence he actually ran — this is the packaging pipeline he expects:**
1. **Candidate table before any slide**: "what the use case is / what Oracle products (except AI lakehouse) are used / what is in the scope of quickstart", and "**As you create the list, challenge it yourself from different angles (define angles from my criteria above + beyond). Improve if needed.**"
2. **TLDR of the differences**: "what different pains / business cases those options present?"
3. **Red team**: "Challenge each one in terms: is AI lakehouse really the right answer to that challenge? is it feasible to build that in 1 month? Also, the 4 and 5 - I didn't fully get them; **check if they are not the AI slop and real stuff, red team thoroughly, and update / remove or defend for me.**"
4. **Revised table into a Google Sheet** with a risk column: "case / what can be build / pain it solves / why AI lakehouse is a good response / what is the scope of 30days POC / **your own unresolved issues and risks**".
5. **Compress**: "**Too much text; less is more; condense to the essence of meaning, TLDR**."
6. **Product research** with strict anti-fluff rule: "**Only items that are true essential uses / features of the product should be included, no far-fetched ('theoretically can also do this') items**"; every row evidence-linked; capabilities → verticals/use cases → overlap with sibling products → competitors in 3 classes (direct / indirect-substitute / same-vendor overlap) → TLDR.
7. **Scope of work table** split into **PoV vs everything else**: "table: name, real groundwork that should happen, duration from - to."
8. **Timeline challenge + explain the jargon + visualize**: "Challenge the timelines you have for PoV phase; are they realistic based on industry practice?" · "some underlying technology is mentioned but not explained. There should be a **separate section at the very beginning** to describe each such technology, very briefly" · "visualizations are also welcomed … **Not too much, only when needed**" · "**make sure the breakdowns of items in all tables are not too much** (maybe some items makes no sense to separate in the eyes of the customer, always go hand-in-hand)."
9. **Tier the PoVs**: "Add column to that table with the POV size tier (each tier should mean some amount of weeks). **Not random inference, thoughtful thinking behind.**"
10. **Only then the deck** — 3–4 cases picked for "**diversity / how acute and relevant they will be to the audience**", "**They should be general, not a specific customer**", two slides per case:
    - Slide 1: **Problem (how it is now) · Solution (imagine how it could turn)**
    - Slide 2: **schematic PoV scope as a real sequence** ("Collect which data (one-liner explanation of who does what here **making it evident and convincing that it's easy**) → Build semantic layer → …"), plus **duration metric + cost metric + "the description of the value at the end of POV (in 4-5 words so it's also kind of a metric)"**, with "**a foot note that [the price] should be confirmed**".
    - Preceded by two offer slides: **3 key pains it solves that customers struggle to solve now**, and **how the jumpstart could be set up "to make sure that value could be proven fast, and that sounds credible"**.
    - "In terms of slides format **get inspired with our SoftServe templates + deck we built on Workforce optimization**."
11. **Audience reset**: "Slides should be for business audience, **knowing nothing about this session and our research, just independent examples**… **Ground in our research, but still keep in mind nobody read that research, that's just your artifact.**"
12. **Final pass**: "revise the slide where we talk about typical pains; **use different layout (3 different separate blocks)** + make sure it picks **real pains and problems CIO / CDO will recognize and use**. Revise other slides for **no fluff and exec audience looking for clear true points**."

**Pricing decision (widget, verbatim):** asked whether to show fixed numbers, given precedent (WfO deck €90K PoV; GTM deck €120–180K; the model proposed €60–80K), Alex typed **"should be 30-50K, and that means it should be really fast go live"** — i.e. the price and the promise are one decision.
**Fusion angle (widget):** **"One offer, two doorways"**.
**Long-document formatting rule:** "make sure document is better structured and formatted for easy scanning and reading: **all best practice like numbers, bullets, highlights + less words for the same meaning; showing arrows for sequences**."
**Delivery reality:** "Upload both pptx and pdf to my GDrive" / "i don't have access to that mac that does the work now. either upload files somewhere (gdrive, or elsewhere) or drop them me here."

### S5 · 2026-08-18 · `0b0729c0` (1.2 MB) — external GenAI Digest copy about the packs
Marketing generated a blurb leading on co-funding. Alex's rewrite instruction (UA, verbatim):
> "**не має бути фокусу на фандінг**" — no focus on the Oracle/NVIDIA funding in external copy.
> "**назва має бути Oracle OCI Accelerator Apps** (або Oracle Cloud Accelerator Apps, якщо вони називають OCI також Oracle Cloud)" — external name is not "Oracle AI Packs".
> "**Згадай 3 tier packages (PoC + Integration + Scaling), та конкретні пакети** (Workforce opt, Doc intel …, + DHL …); **кожен пакет як XYZ що може тобі дати ABC бенефіт, з цифрами але щоб не weird**."
> Second round: "just **focus workforce optimization case not on dispatcher time saved but efficiency improvements**."
Rules: external copy names the **three tiers and the concrete packs**; each pack is phrased as *"X that gives you Y benefit"* with numbers that don't read as weird; pick the **generalising** outcome metric over the narrow operational one.

### S6 · 2026-09-03 · `712eb0b3` (17 MB) — Oracle partnership slides for a partner audience (Toyota/Oracle)
Brief shape (his own): section header styled as the host deck · Oracle dedicated practice · **"SoftServe's solutions focus" as two layers** (Oracle platforms layer; SoftServe AI & Data Apps layer with sub-items and a **"+ more" appendix "to not look like that's complete list"**) · Bosch case study (before/after + the colourful pack-structure slide) · list of current solutions incl. "6 apps in progress".
**Corrections, verbatim:**
- "**i need just new slides as separate pptx**"
- "**Great slides in terms of content; pls review them in terms of information UX**; i think on slide 2 use of blocks and colors is not ideal to **structure the information in reader's mind quickly and properly**"
- "slide 3 - i would **add official Oracle and SoftServe logo images** + **place oracle above softserve layer** + make some difference between the platform oracle layer tiles and SS layer and tiles, **not just color (heavier vs lighter, or smth different - u're designer)**"
- "Slide 5 - **remove business outcomes claims, as we have them proven just for 2, so showing other 2 'pending' is not good**"
- "In the last slide - **remove Stack info also, as it is all focused now on OCI and Nvidia - too much**"
- (typed while the agent was working) "**I need only extra slides pptx to be updated, no need for full toyota deck**" · "**no need to mention nvidia in that slide at all**" · "**and focusing reader on OCI specifically**"
- He pasted a screenshot of the exact block to delete: the two stat bands *"IN PLACE TODAY — 17 FTE · 4 PODs, upskilled on OCI AI Accelerator Packs, AIDP and Oracle AI products"* and *"COMMITTED SCALE · Q3–Q4 2026 — ≥10 dedicated Oracle PODs · 1 Packs POD, scaling with joint-pipeline demand"*. **Pointing at the block is his correction format** — the words are minimal, the screenshot carries the target.
**Persisted:** these became `slide-design.md` **rules 10–13** (hierarchy over tinting; peer claims all-or-none; partner-first stacks with official logos and weight-differentiated layers; **external slides carry no internal operating numbers** — headcount, PODs, capacity were all stripped). The session explicitly asked Alex to correct the generalizations.

### S7 · 2026-09-03 · `688a9993` (3.6 MB) — one slide listing 3 Lakehouse use cases
> "please 1 slide that will list all 3 proposed use cases in 1 slide; **think about slide UX to make it easily readable. Maybe worth applying colorcoding / or numbers / or icons**."
> "**Try again**" (first cut rejected with no explanation).
> "**cases not really time money trust; it's multi-cloud Q&A, Oracle multi-system ERP Q&A, Shared security layer.** Let's remove speed/latency use case and related stuff (pain etc.) entirely."
> "**I only have 8 minutes for this rebuild**."
> (after the agent flagged the deck actually held four cases, not three) "**ok, 4, my bad**" — then he cut one, so the count in his brief was the *target*, not a fact. **Verify counts against the file before building to them.**
Rules: never re-abstract his concrete use-case names into a generic triad (time/money/trust) — the **names are the content**; removing a use case means removing **its pain, its proof and its slides**, not just the card; and a skill must support a **fast single-slide rebuild**. Judgment kept: numbers + colour-coding were added, **icons were skipped because the deck has none anywhere** — don't introduce a visual language the deck doesn't speak.

---

## 2. July 2026 WfO learnings recovered from the wiki and references

The original WfO artifacts were built off this Mac; here is what survives, with sources.

**2026-06-26 — the S/M/L model itself** (`context/areas/softserve/calls/oracle/2026-06-26_sales-call_gero-tshirt-packaging.md`, co-designed live with Gero Gunkel, Oracle):
- Tiers map to **level of integration, not feature count**. S = PoC/PoV "Proving AI value" (you give us data, we prove value on your data; **zero integration**, separate/test env, ~6–10 weeks, ~$100K). M = Integration "Delivering real business impact" (live, fully-integrated MVP, ~1–2 API integrations, ~1–2 markets / ~500 users). L = Scale "Scaling the impact" (many markets, local customizations, advanced AI telemetry).
- **S and L are optional** — a bought-in customer goes straight to M; a uniform global customer may never need L. Colour-code them as optional.
- Sized as a **"menu" / quasi rate card so the "most lazy account executive" can explain it**.
- **"Hardening" stays implicit** — never label L "hardening the integration"; it invites "what was wrong before?". Frame L as telemetry + local tailoring.
- Anchor the pack to **Oracle Fusion Apps** (known API endpoints, warm path to the app owner, rep compensated on OCI consumption).
- Variable/complex cases stay **opportunistic, not structured packages**.

**2026-07-07 — the feature list's method** (`calls/oracle/2026-07-07_222059_default_…md`): a working session classifying every feature of the delivered product as **Bosch-specific / reusable / vendor-specific**, yielding the standard-vs-custom split. Findings that became the feature-list artifact: business logic (allocation rules, constraints, KPI formulas, forecasting) is hardcoded → **per-client custom**; **UI + approval workflow are the most reusable** but only for zone-based planners; KPI *titles* are universal, **formulas are custom**; the team used **almost nothing** from Oracle's own package. Alex's three intended messages for the stakeholder summary: (1) we used almost nothing from Oracle's package (neutral fact); (2) the custom-vs-OOTB split; (3) **honestly flag that no item is yet a polished, reusable "MVP-ready" module**. Packaging tiers floated the same day: S = nothing configurable, M = change constraint/KPI calc & counts, L = custom KPIs.

**2026-07-09 — the offering-deck review with Oracle sales** (`calls/oracle/2026-07-09_102708_default_…md`): three tiers presented with **price ranges, not fixed numbers** (and Oracle asked which they prefer); commitments taken on the call — **"correct the KPI figure to 15 min (optimization run) / 30 min (full use case incl. manual review), and use 30 min as the headline vs ~2 days"** and **"always pair the 'up to 5%' metric with an explanation that 5% is significant"**; plus **add target OCI-consumption levels on top of the packages** (the Oracle rep's own quota is the buying motive). Gero's ask at that review produced the one-pager.

**2026-07-11/13 — the WfO sales one-pager** (`oracle.md`): the service-packages deck **condensed to one A4 page**. Anatomy: SoftServe-brand hero · problem/solution + the data-flow line · a **"Why it sells: for Oracle account teams" card** (OFS cross-sell · net-new OCI GPU consumption on top of the SaaS seat · repeatable across OFS accounts) + 4 vertical chips · Bosch proof strip (~30 min vs ~2 days · up to +26% productivity · €190K/mo estimated savings, **caveated as illustrative**) · the full S/M/L table with the **◐ / ● / ●● capability matrix** · CTA bar "See the fit in one of your accounts?" + a named contact. **Cut by design per Alex's brief: Oracle-duplicated problem/solution detail, the tech-stack slide, the detailed feature matrix.** Built as HTML → PDF with an editable twin.

**2026-07-17 — the executive summary**: the packaged offering compressed to **one slide, drafted in two variants (with / without the capability-matrix thumbnail)**, then **restyled into the host deck's own style** and slotted into its section as a placeholder-filler.

**Reference-doc rules dated July 2026 (the WfO-era learnings, now standing):**
- `.claude/references/slide-design.md` — header states rules **1–8 are 2026-07-10** (from design feedback on the Oracle partnership deck) and **rule 9 is 2026-07-20** (from one-pager feedback). Rules 10–14 are September.
  1 size containers to content · 2 same-level elements identical geometry · 3 absence = empty instance of the same container · 4 no free-floating side text · 5 colour semantics from the source outline, two stages of one dimension = two tints of one hue · 6 all-grey compositions read weak · 7 shape semantics are load-bearing (questions = outlined, answers = filled, peers share one colour) · 8 no heavy black fills for small badges/CTAs · **9 compositional variety — "don't render every section as another full-width row of same-shaped cards"; content at different abstraction layers should read as visually different forms** (this one is explicitly one-pager feedback).
- `.claude/references/client-documents.md` — **"Offers / proposals (2026-07-07)"**: third person · keep internal strategic framings out · don't echo the brief back verbatim, restate and add an educated read · **de-AI the typography and vocabulary (no em-dashes, no "↔", no cutesy names, "customers" not "users")** · **never include internal reference pricing** · **summary altitude is read as the whole offering — never put a part's number in an at-a-glance strip**. Plus **(2026-07-14)** annotation lines are one short complete sentence, industry-standard term names over invented blends; **(2026-07-19)** client-facing identity block, and **generated deliverables are living documents — read the current file from disk before updating, never regenerate over hand edits.**
- Both files were carved out of root `CLAUDE.md` on 2026-08-09 (`ab02bfc1`); their July dates are the feedback dates.

---

## 3. Consolidated rulebook for the skills

### 3.1 Content / messaging
| # | Rule | Evidence |
|---|---|---|
| C1 | **Never invent a tier, a price or a proof point that doesn't exist.** When a pack has no S/M/L, reframe the block ("What the PoC buys" — scope IN / NOT IN, real duration, real contract value); when a use case has no evidence, say "PoC in preparation, results to follow". | S1 widget answer; `oracle-packs.md` Pack 3 |
| C2 | **"PROVEN" is reserved for delivered results.** PoV figures get "PROOF OF VALUE · <customer>" and carry the source's own caveat ("figures are illustrative, not contractual"). A PoC *target* must never be typeset as an outcome. | S1 widget; `oracle-packs.md` |
| C3 | **Peer claims are all-or-none** — never show "—"/"pending"/"NEW" next to proven peers; drop the row for everyone. *But* when one peer's slide is already signed off, vary the **label** honestly instead of forcing uniformity or deleting the strongest numbers (Alex's actual choice). | S6 ("remove business outcomes claims… showing other 2 'pending' is not good"); slide-design rule 11; S1 widget |
| C4 | **The pack is generalized past its origin customer, and the divergence is stated.** Name the source engagement, then say plainly where the pack differs from the signed scope. | S3; `oracle-packs.md` Pack 3, section-deck slide 9 |
| C5 | **A "why it sells" block written for the partner's seller** is a first-class component: cross-sell path into a known product, **net-new OCI/GPU consumption on top of the existing estate**, repeatability across similar accounts. Add target OCI consumption levels alongside the packages. | Jul-11 one-pager; Jul-9 call commitments |
| C6 | **Verticals are named with one concrete line each** (what the work looks like there), not as a chip row of industry nouns. | WfO deck slide 3; `wfo-pack-spec` §1 |
| C7 | **Pick the generalising outcome metric**, not the narrow operational one ("efficiency improvements", not "dispatcher time saved"). Pair any small-looking % with the explanation of why it is large at scale. | S5; Jul-9 call ("always pair the 'up to 5%' metric with an explanation that 5% is significant") |
| C8 | **No fluff, no AI slop, no "theoretically can also do this" features.** Only true essential capabilities; red-team the list and remove or defend each item. | S4 steps 3 and 6 |
| C9 | **Audience reset before the artifact ships:** the reader has not read the research. Ground in it, write for someone who knows nothing about it. For exec audiences: "clear true points", pains a CIO/CDO would recognise and use. | S4 steps 11–12 |
| C10 | **External copy drops the funding story, uses the external product name, and names the three tiers + the concrete packs**, each as "X that gives you Y", with numbers that don't read as weird. | S5 |
| C11 | **Internal-only content is flagged and strippable**: prices, contract values, named customer accounts, headcount/POD/capacity numbers never cross to a partner- or customer-facing cut. | slide-design rule 13; S1 handover note; S6 |
| C12 | **Get the vendor's product names right from the vendor's own current page**, and re-check them each build — two of four labels Alex supplied were wrong. No internal acronyms (e.g. "AIDP") in anything a partner reads. | S1; `oracle-ai-offerings.md` §Naming |
| C13 | **Reuse existing content and visualizations; don't invent new ones.** Pull the diagram from the deck that already has it. | S2 ("reuse existing content … and not to invent new visualizations") |

### 3.2 Structure / sequence of production
| # | Rule | Evidence |
|---|---|---|
| P1 | **Inventory the real sources first** (pack folder, existing decks, screenshots, the customer's SoW, the tracker), then clarify, then build. Clarification questions must be grounded in what exists, not asked blind. | S1, S2, S6 |
| P2 | **Tables before slides.** The content is settled in a challengeable table (use case / what gets built / pain / why this product / PoC scope / **unresolved issues and risks**) and compressed to a TLDR before any layout work. | S4 steps 1–5 |
| P3 | **Red-team the candidate set before committing**: is this product really the answer? is it feasible in the stated window? which items are AI slop? Update, remove, or defend. | S4 step 3 |
| P4 | **Gap handling is an approval gate, not an improvisation**: "If smth is not available for one of the blocks **suggest me relevant smart replacement (approve with me, then implement)**." | S1 brief |
| P5 | **One structure, applied identically to every pack.** The per-pack slide pair is a template; packs differ in content, never in anatomy. | S1 brief ("the same structure") |
| P6 | **Derive the one-pager by condensing the deck**, cutting what the partner already knows (their own product's problem/solution detail), the tech-stack slide, and the detailed feature matrix. The exec summary is a further condensation to one slide, in the host deck's style. | Jul-11 / Jul-17 wiki entries |
| P7 | **Deliver new slides as a standalone .pptx on the host deck's own master**, so they paste in unchanged and renumber themselves. | S6 ("i need just new slides as separate pptx"); S1; S2 widget |
| P8 | **A dedicated editorial / fact-check pass at the end, on the strongest model** — checking every number against the source collateral and every claim against the signed scope. It is the step that earns its keep. | S1 |
| P9 | **Support a fast path.** Alex sometimes has 8 minutes. A single-slide or single-block rebuild must not require the full pipeline. | S7 |
| P10 | **Model routing:** Fable only for option generation, the final editorial pass and the messaging decisions; everything mechanical (extraction, research, asset sourcing, building) on Opus. | S1, S2, root `CLAUDE.md` |

### 3.3 Design / layout
| # | Rule | Evidence |
|---|---|---|
| D1 | The nine July rules stand as the baseline (containers sized to content · identical peer geometry · absence as an empty container · no free-floating text · colour semantics · no all-grey · shape semantics · no heavy black badges · **compositional variety on one-pagers**). | `slide-design.md` 1–9 |
| D2 | **"Information UX" is a separate review axis from content** — Alex approves content and rejects layout independently; the test is whether the structure lands in the reader's mind quickly. | S6 |
| D3 | **Structure by hierarchy, not by tinting every group**; ≤2 colour meanings per slide. | slide-design 10 (from S6) |
| D4 | **Partner-facing stacks: partner layer on top, official logo images (not text), layers differing in weight and shape, not tint alone.** | slide-design 12 (from S6) |
| D5 | **Real logo images for commercial proof** — "logo of the company (real image, not text) + 3-5 words one-liner", so the second slide reads as a customer story. | S1 brief |
| D6 | **Colour-code / number a peer set, but don't import a visual language the deck doesn't already speak** (no icons in a deck that has none). | S7 |
| D7 | **Card-grid craft** (two-line panel headers, one gutter value, emphasised cards never in the smallest type, no double-width card, legends right-anchored, no legend row for the default/empty state). | slide-design 14 |
| D8 | **QA is render-based and per-slide**: contact sheet of renders, overflow checks with real font metrics, package validation; QuickLook substitutes glyphs so trust geometry, not glyph widths. | S1, S2, `.claude/references/document-rendering.md` |
| D9 | **Long documents:** numbers, bullets, highlights, arrows for sequences, fewer words for the same meaning; a "what these technologies are" section at the very beginning; visualizations only where needed; don't over-split table rows the customer sees as one thing. | S4 steps 7–8 |

### 3.4 Numbers / pricing / naming
| # | Rule | Evidence |
|---|---|---|
| N1 | **Collateral is the price source of truth.** Re-read the current one-pager/deck from disk before printing any price; a deck must never contradict the artifact thumbnail on its own slide. | S1 (€100K → €90K) |
| N2 | **Price and promise are one decision** — "should be 30-50K, and that means it should be really fast go live". | S4 widget |
| N3 | **Ranges are legitimate where the scope is uncertain**, and any unconfirmed number carries a footnote saying so. | Jul-9 call; S4 ("add a foot note that it should be confirmed") |
| N4 | **Symmetry across peer packs beats completeness on one** (infra run-rate dropped rather than added unevenly). | S1 widget |
| N5 | **One settled name, applied everywhere; files follow the decision.** Track which artifacts still carry the old name. External name ≠ internal name (e.g. "Oracle OCI Accelerator Apps" externally). | S1 widget; S5; `oracle-packs.md` |
| N6 | **Customer names and contract values are internal.** External cuts anonymize ("a global home-appliance manufacturer") and publish only cleared ratios. | `oracle-packs.md` Decisions 2026-09-14 |
| N7 | **KPI headline discipline**: use the end-to-end figure, not the engine figure (30 min incl. review, not 15 min), against the honest baseline (~2 days). | Jul-9 call |

### 3.5 Process (review loop, what Alex wants to see, approval gates)
| # | Rule | Evidence |
|---|---|---|
| R1 | **Clarify before building when the requirement is vague** — explicitly requested. | S2 |
| R2 | **Put choices to him as a small set of concrete options with trade-offs, and recommend one.** He answers fast, often overriding the recommendation (he picked the non-recommended option in 3 of 7 widget answers in S1). | S1, S2, S4 widgets |
| R3 | **Never silently change something he authored** — content he calls complete is layout-only; flag rather than fix ("I left your text rather than changing it silently"). | S1 |
| R4 | **Show renders, not descriptions** — a contact sheet of the built slides is the review artifact; "done" means rendered, validated, deployed to the OneDrive/GDrive folder beside its source, and folded into the wiki. | S1, S2, S6, S7 |
| R5 | **Expect at least one rebuild round** on his review, usually the same day, and sometimes a wholesale re-spine. Build so a re-spine is cheap. | `oracle-packs.md` (v2/v3 mini-site, two demos rebuilt same day); S6; S7 |
| R6 | **Hand back an explicit open-items list** (what still needs his decision, what was inferred, what has no source) rather than burying it. | S1, S6 ("Insights Extraction has no source anywhere … is my inference") |
| R7 | **Close the learning loop out loud**: generalize the correction, write it to the right reference file, and ask him to correct the generalization. | S6 ("Tell me if any of those four over- or under-reaches") |
| R8 | **Deliver where he can reach it** — he is often on a different machine than the one doing the work (GDrive / OneDrive / in-chat attachment; pptx + pdf twin). | S4, S6 |
| R9 | **Long fan-outs must report progress.** "alive?" is the failure signal; write intermediate output early. Fan-out also multiplies permission prompts — use prefix allowlist rules, never one-shot ones. | S2; root `CLAUDE.md` |
| R10 | **His correction format is a screenshot of the offending block plus a few words.** Expect terse pointers ("Slide 5 - remove business outcomes claims (the block on screenshot)"), and resolve the target from the image, not from a full written spec. | S6, S1, S2 |
| R11 | **Verify his stated counts against the source file** — "all 3 use cases" turned out to be four ("ok, 4, my bad"). | S7 |

---

## 4. Facts confirmed (for the skills' defaults)

**Pricing — Workforce Optimization (authoritative: the Jul-13 sales one-pager, re-read 2026-09-11)**
| | PoV · S | Roll-out · M | Scaling · L |
|---|---|---|---|
| Services (one-time) | **€90K** (not €100K — Alex confirmed the slide was a slip) | **€300–500K** | to be defined |
| Infrastructure (monthly) | **€4K** | **~€25K** | to be defined |
| Timeline | **2 months** | **3–5 months** | **3–12 months** |

**Pricing — Large docs processing and review** (the first pack with real numbers): PoV·S **€75K** services · **€0** infra · 2 months; Roll-out·M **€300–500K** · **~€10K/mo*** · 3–5 months; Scaling·L TBD · 3–12 months. *Infra price indicative — depends on volume, page counts, pipeline complexity.
**Account Insights**: no S/M/L. Block reframed as **"WHAT THE POC BUYS"** — PoC · **12 weeks** · **€192.5K** (the DHL SoW value, €192,525) with IN / NOT IN SCOPE lists.
**AI Lakehouse quick start**: Alex's price band **€30–50K**, 30–45 days, "really fast go live". (Model had proposed €60–80K; precedent quoted: WfO €90K PoV, a GTM deck €120–180K; Gero's original S sizing was ~$100K / 6–10 weeks.)

**Capability matrix notation:** **◐ partial → ● included → ●● multi-type/advanced** across tiers; on the feature list, **● available OOTB · ◐ partial · ○ roadmap/not available**, with a **"Standard customization scope"** column. Account Insights uses a three-lens matrix (*Oracle pack provides / SoftServe status / custom work per engagement*) plus a fourth column naming **the reusable artifact that would accelerate development**.

**Tier semantics (Gero, 2026-06-26):** S = "Proving AI value" (zero integration, test env) · M = "Delivering real business impact" (live integrated MVP, 1–2 integrations, 1–2 markets / ~500 users) · L = "Scaling the impact" (many markets, local customizations, AI telemetry). Tiers = **integration depth, not feature count**. S and L optional. Never say "hardening".

**Pack names (settled):** Pack 1 **Workforce Optimization** (cuOpt ← Bosch/BSH) · Pack 2 **Large docs processing and review** (AIQ ← Riyadh Air; artifacts still say "Large Document Extraction and Validation") · Pack 3 **Account Insights** (AIQ ← DHL; the PDF still says "AI Signal-Impact Engine"). External family name per Alex: **Oracle OCI Accelerator Apps** / Oracle Cloud Accelerator Apps.

**Oracle/NVIDIA product names:** Oracle **Autonomous AI Lakehouse** · **Oracle AI Data Platform** (never "AIDP" externally) · **Oracle AI for Fusion Applications** (umbrella) / **Oracle AI Agent Studio for Fusion Applications** (build surface) · **NVIDIA NeMo Agent Toolkit**. There is **no joint OCI+NVIDIA product brand**.

**Standard artifact set per pack (the tracker, `Packs/Oracle packages.xlsx`, "Packaging activities"):** Sales deck · Sales one-pager · Feature list · Demo video · Package for Oracle Marketplace · **Oracle Marketplace listing**. The mini-site and the interactive walkthroughs are a newer artifact class with no row in that tracker.

**Cleared external-safe WfO figures:** 83% of 12 simulations positive · median **+4.5%** jobs/technician/day · 15–20% dispatcher productivity · ~5× three-year ROI · **no € figures**. The one-pager's "~30 min vs ~2 days", "up to +26%" and "€190K/month" are illustrative PoV claims, not for external demos.

**Named CTA contact:** Karsten Tramborg, Alliances & Partnerships Director (`ktram@softserveinc.com` on the one-pagers; the mini-site uses the shared `oracle@softserveinc.com`). The section deck's `RnDrequest@softserveinc.com` is **unverified** and appears in no source file.

---

## 5. Gaps

1. **The July WfO build sessions are not on this Mac** — the feature-list xlsx/docx (07-07), the service-packages deck (07-13), the one-pager HTML→PDF (07-11/13) and the executive-summary deck (07-17). Everything above is second-hand from the wiki and the call notes. If the verbatim feedback matters, it is on **Alex's other Mac (`Alexs-MacBook-Air`)** under `~/.claude/projects/…`, or in **claude.ai chat history** (several July folds are cited as "(chat, 2026-07-11)" etc., which means they happened in a session, not a call).
2. **Most of Alex's screenshot feedback is unrecoverable.** In `deb798ac` and `d5a67a5b` several of his turns are images with no text, and **the image bytes are not stored in those transcripts** — only a `[Image: WxH]` placeholder survives. What those corrections were is visible only in what the assistant did next (e.g. the S2 polish round: equal list slots, uncramped diagram labels, two-line captions, larger arrow captions). One image *was* recoverable (`712eb0b3`, a queued-command attachment) and is quoted in S6. If the precise visual objections matter, they are only in Alex's own screen history.
3. **No transcript survives for the 2026-09-13/17 mini-site and demo sessions** in the seven files I was given; their learnings are captured second-hand in `oracle-packs.md` Decisions and in `.claude/references/interactive-demo-playbook.md` (requirements 9 and 10 are the newest, 2026-09-17). Another agent's scope, but the demo component overlaps the deck/one-pager components on numbers-clearance.
4. **The actual artifacts live in OneDrive, not the repo** — `Projects/Oracle/Packs/<pack>/` holds the real decks, one-pagers, feature-list docx and the tracker xlsx. Any skill that produces these must read the current files from disk (living-documents rule); I did not open them in this pass.
5. **Unresolved in the wiki, not by me:** the DHL scope divergence; whether the one-pager series converges on one anatomy (WfO feature matrix vs narrative sales page) before the Marketplace round — that open loop is directly relevant to a "one-pager" skill's template choice.
