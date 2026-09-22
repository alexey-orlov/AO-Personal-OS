# P1 — Domain Workflow: Account Intelligence & Signal-to-Action

**Research status:** IN PROGRESS (skeleton created 2026-09-22)

**The job, in a buyer's words:** "Keep up with what is happening at the companies we sell to or depend on, work out what each development means for us, and turn it into something an account team can act on before the next conversation."

**Names this job goes by today:** account research / account planning, pre-meeting briefing preparation, customer intelligence, market & account signal monitoring, trigger-event selling, relationship-manager coverage prep, portfolio monitoring.

**Source tiering:** T1 = primary vendor docs / filings / standards · T2 = analyst reports, reputable trade press, academic · T3 = marketing pages, blogs, secondary.

---

## Executive answer (the short version)

1. **Both trigger patterns are real and named in the market.** The account-triggered pattern is the older, dominant one in B2B sales and is called **account planning / account research / pre-call (pre-meeting) prep**. The signal-triggered pattern is younger, has exploded since ~2023, and is called **signal-based selling** (sales side) or **early warning systems / event-driven monitoring** (financial services side). Neither is a niche.
2. **They are not competing designs — they are two halves of one loop.** Signal-triggered systems produce the raw "this happened + which of your accounts it touches"; account-triggered systems consume it at plan or meeting time. Most mature deployments run both; the difference is which end holds the clock.
3. **The industry-standard term for the "so what" step is not one term.** Sales uses *trigger event*, *buying signal*, *intent*, *propensity*, *whitespace*. Intelligence/CI tradecraft uses *implications*, *analytic judgment*, *assessment*, *So What?*. Banking uses *early warning indicator (EWI)*, *alert*, *action plan*, *watchlist*.
4. The canonical workflow below is 10 steps. Steps 1–4 are largely universal; steps 5–7 (the reasoning and routing) are where the industry-specific logic lives; steps 8–10 (artifact, consumption, feedback) vary by whether the org is account-triggered or signal-triggered.

---

## 1. The canonical workflow (6–12 steps)

### Step table

| # | Industry-standard term | What actually happens | Universal / industry-specific | Where the human decision sits | How it's done without AI |
|---|---|---|---|---|---|
| 1 | **Coverage / book definition** (sales: *territory & account segmentation*; banking: *portfolio / book of business*) | Decide which accounts are in scope and at what tier — strategic vs. managed vs. long-tail. | Universal | Human owns it entirely — it is a resourcing decision, not an analytic one. | Annual/quarterly planning exercise by sales ops or the coverage head; spreadsheets + CRM hierarchy. Weeks per cycle. |
| 2 | **Source / watchlist configuration** (banking: *early warning indicator catalogue*; sales: *signal setup*) | Decide what counts as a watchable source and what counts as a watchable event type for each tier. | Universal in shape, industry-specific in content (EWIs in credit vs. funding/hiring in SaaS) | Human chooses the indicator catalogue and thresholds. | Google Alerts, news aggregator saved searches, LinkedIn Sales Nav alerts, RSS; credit teams hand-build indicator lists. Ongoing, ~hours/week per analyst. |
| 3 | **Collection / monitoring** (*market & account signal monitoring*, *account research*) | Pull filings, earnings calls, news, job postings, leadership changes, product launches, funding, regulatory notices, internal CRM and conversation history. | Universal | Almost none — pure gathering. This is the step everyone tries to automate first. | Manual reading. Analysts scan news/filings; reps Google the account + check LinkedIn. 30–60 min per account per touch (see §1 detail). |
| 4 | **Entity resolution & relevance filtering** (*deduplication*, *disambiguation*, *noise reduction*) | Work out whether "Acme" in the news is *your* Acme, which legal entity/subsidiary, and whether the item is material at all. | Universal | Human adjudicates edge cases (name collisions, subsidiaries, ticker vs. brand). | Reading and judgment. The single biggest silent time sink; nobody logs it separately. |
| 5 | **Impact / implication analysis** (*the "so what"*; CI: *implications*; banking: *alert triage*) | Move from "this happened" to "therefore this account is now more/less likely to buy, churn, default, or need us". | **Industry-specific** — the rulebook is the domain | **This is the core human decision.** Everything else is plumbing. | An experienced rep, analyst or RM reasons from the event to the account's situation. 10–30 min per material item. Rarely written down as a rule. |
| 6 | **Prioritization / scoring** (*lead & account scoring*, *propensity*, *severity rating*) | Rank what survived step 5 — which accounts to act on now, which to watch. | Universal in shape | Human sets the cut line; scoring model proposes the order. | Gut feel plus a spreadsheet. In banking, a severity band tied to a mandated action plan. |
| 7 | **Routing / assignment** (*alert routing*, *task assignment*, *case creation*) | Get the item to the person who owns that account, in the tool they work in. | Universal | Human overrides misroutes; owner accepts or rejects. | Email forwards, Slack/Teams messages, manual CRM task creation. Minutes each, but at volume it dominates. |
| 8 | **Synthesis into the artifact** (*account brief*, *pre-meeting brief*, *account plan*, *credit memo / watchlist entry*) | Write the thing the human will actually read — narrative brief, structured record, or a CRM task. | Universal in shape, industry-specific in template | Human writes or edits; this is where voice and judgment land. | Hand-written. A pre-meeting brief: 30–60 min. A full strategic account plan: multiple hours to days, often a facilitated workshop. |
| 9 | **Consumption / decision** (*account review*, *pipeline review*, *call plan*, *credit committee*, *QBR*) | The artifact is read and a decision is made — outreach angle, plan change, limit change, escalation. | Universal | Entirely human. | A meeting. Weekly pipeline review, quarterly account review, credit committee. |
| 10 | **Action capture & feedback** (*next best action*, *follow-up*, *plan refresh*, *closure of the alert*) | Log what was done, close the loop, and feed the outcome back so the indicator set improves. | Universal | Human decides whether the signal was actually useful. | CRM notes and the alert's disposition field. Chronically skipped — which is why signal quality rarely improves. |

### Step-by-step detail

**Step 3 — how long the manual version takes.** Two independent anchors:
- Microsoft's own adoption material and third-party write-ups put pre-call research at roughly **45 minutes for a standard account review** before AI assistance [T3]. LinkedIn positions Account IQ as letting sellers "complete account research in an easier and faster way", i.e. it is explicitly a research-compression product [T1].
- Salesforce's State of Sales data is the standard citation for the macro number: sellers spend the clear majority of their week on non-selling work, of which research is one named component [T1/T2 — see Sources]. The commonly circulated derivative figures (70–72% non-selling) are secondary restatements and are marked accordingly.

**Step 5 is the step that is actually hard.** Every vendor in both camps automates steps 3, 4, 6, 7 and 8 with high confidence and hedges on step 5. AlphaSense's positioning — "trained to think like an analyst", agents that "reason across qualitative insights, structured financial data, and your own internal knowledge" — is a claim about step 5, and it is the claim they wrap in citations and auditability rather than accuracy scores [T1/T3].

**Step 8's artifact is the deliverable, but step 9 is the product.** In every discipline examined, the brief has no standing of its own — it exists to make a specific recurring meeting go better (the call, the account review, the credit committee). This matters for packaging: the unit of value is *the meeting that went better*, not *the document that got generated*.

---

## 2. Account-triggered vs. signal-triggered — the central axis

_pending_

### 2a. Account-triggered pattern — evidence

_pending_

### 2b. Signal-triggered pattern — evidence

_pending_

### 2c. Which is more common, and where

_pending_

---

## 3. Standard output artifacts

_pending_

---

## 4. How quality is judged

### 4a. Golden report / benchmark-against-human-analyst practice

_pending_

### 4b. Confidence scoring & calibration

_pending_

---

## 5. Vocabulary of the "so what" step

_pending_

---

## 6. Industry variation

_pending_

---

## Sources

_pending_

## Unverified

_pending_
