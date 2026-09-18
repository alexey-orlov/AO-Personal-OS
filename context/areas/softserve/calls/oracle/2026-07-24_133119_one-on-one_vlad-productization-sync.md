# one-on-one — 2026-07-24_133119
_source: Oracle Productization & BA JumpStart Sync-20260724_133119-Meeting Recording.mp4 (Teams, `~/Downloads/`)_

> **Meeting**: Oracle Productization & BA JumpStart Sync
> **When**: 2026-07-24 13:31 EEST (31 min, Microsoft Teams)
> **Attendees**: Oleksii (Alex) Orlov — SoftServe R&D product lead / advisor (coach) · Vladyslav (Vlad) Butenko — R&D product manager, joined 2026-07-06
> **Language**: Russian. AssemblyAI transcript, speaker-labelled (Speaker A = Alex, Speaker B = Vlad); customer and vendor names are mangled throughout (see "Transcript quality" below).
> **Transcript**: `automations/call-pipeline/.work/transcripts/Oracle Productization and BA JumpStart Sync-20260724_133119-Meeting Recording.txt`
> **Screen shared**: Vlad's generalized capability/step table (left) against the delivered Riyadh Air extraction-pipeline diagram — "the purple scheme" (right).

Recurring coaching sync. ~28 of 31 minutes are Alex walking Vlad's capability table for the **Large Document Extraction** pack (generalized from the delivered Riyadh Air SGHA-contract extraction case on NVIDIA AI-Q); the last ~2 minutes touch the **Payworks PM Jumpstart** discovery.

## Topics covered

**1. Mapping our workflow steps onto the market's vocabulary (opening, 0:03–0:35).**
Alex works through a vendor capability taxonomy on screen and finds three of its terms unaccounted for in our table: *exception handling*, *decisioning*, *validation*. "Their human-in-the-loop is not validation, it's human-in-the-loop exception handling." He turns each into a numbered open question, with a research method attached for the one nobody can define: *"Write it down as the third question — we need to understand what people mean here by Validation… I'd dig in; you don't even have to reach out, speak-to-expert; google it, or rather Claude it, and something will clarify. And they'll probably be part of our pipeline too. And then our table has to cover that."*

**2. The failure path, and probing it with an absurd input.**
"We don't do any exception handling now, do we? What do we do with a document where we expected 5 parameters and didn't find them? We don't foresee that flow." He stress-tests the boundary — *"and if you put a restaurant menu in there, what happens?"* Vlad predicts the classifier rejects it as not an SGHA contract but flags it as untested: "that's my hypothesis." Alex's conclusion is a feature, not an answer: a configurable **exceptions** set — criteria we tune, after which the system surfaces the bad extractions ("5 parameters expected, 2 found, we can't move on — go look"). He credits the source explicitly: *"if you lean on HyperScience, they've clearly invested more thought into this topic than we have — I'd take inspiration from that example."*

**3. Is the generalized table actually universal? (the call's core question).**
"The question came to me looking at the purple scheme. It concerns the universality of what we built there… I see it rests on a set of constraints that clearly aren't universal, and I want to understand whether we realised that and whether we reflect that variability in this table." Vlad reports he collapsed the earlier 37-row version into a generalized set (intake & processing · extraction · post-processing · review · human-in-the-loop · evaluation · integrations) but admits he never ran the mapping exercise between his table and the delivered pipeline diagram: "it isn't synchronized." Alex takes that as the homework.

**4. Row-by-row review of the capability table.** The substantive feedback:
- **Split `upload` and `preprocessing` into separate rows** in the intake block — "upload implies a future API import too, there's room to grow, it's a separate feature; upload, import"; preprocessing may grow new formats we don't do. Granularity follows where the product can extend.
- **Order the rows in the logical flow of the workflow** ("a trifle, but probably important") — classification and service identification come first in the flow, so they come first in the table.
- **Feature names must point at the task being solved**, at an altitude between two failure modes: *"'Classifier' — you have to guess what classifier"*; and the delivered diagram's "contract header extraction" is too concrete — *"that already implies it's a contract and that it has a header. Maybe they won't be contracts and won't have headers."*
- **Don't name the model in a feature.** "I wouldn't write in the features that it's Llama — first, it's not a property of the feature, and second, why hard-wire ourselves to it."
- **The custom-work column means what stays custom after the feature is finished** — not the remaining backlog. Alex reads Vlad's classification row back as a sentence: "even if we build it fully, there will always be custom work to *use a better model for classification*? So the feature is perfect, we come to a client, and the custom work we perform is: use a better model for classification. Is that a true statement?" Vlad: "No — I interpreted the last column as what we still have to build." Alex supplies the correct cell: get the client's own classification nomenclature and configure (prompt, or more than a prompt) so it classifies correctly.
- **Verify status claims against the delivery.** Vlad says the classifier is binary (SGHA / not SGHA); two minutes later he describes it mapping against contract types held in AltraDocs. Alex catches it: "then we've already built non-binary classification — you said binary." Vlad: "I haven't seen their AltraDocs, I'm assuming."
- **Merge steps that are conceptually the same task.** Passes 4A (header fields) and 4C (extraction) — "conceptually the same thing: finding the fields we need. The fact they sit in the header probably makes the task easier, but…" When Vlad defends the split on "header fields always exist, the others may not", Alex pushes for the consequence: "and what does that lead to? What does it affect? If we don't find the vendor we break, and if we don't find the formula value we don't break — is that what it affects?" — which turns the distinction into a real feature: configuring mandatory vs. optional parameters.
- **There is no row for the core job.** Alex asks where field extraction lives in the table and gets "Confidence scoring… scoring, coverage": *"My task is direct. There are fields scattered in the document that we need, and they have to be recognised — and something else is written here."*
- **Untested is not a capability.** On the `native multilanguage` row — the solution is English-only; Vlad asks whether it can be wrapped as a selling point. "We have no guarantee, no testing that it will work that way. Theoretically the LLM can do it, but… we can't guarantee it." Alex: "There was no testing, OK" — and later parks both multi-language and non-document data sources as out-of-scope for the *project*, not for the pack.
- **Enumerate the nuance space of each step.** Alex's control question — "imagine the abstract task of any documents, we're looking for some fields: what else can there be?" — and his worked example: an aircraft-type lookup field where the text reads `большо` (a typo), `гигантский` (a synonym of an allowed value), or `A549` (wrong format entirely). "How does the system behave in these three scenarios? It should presumably be configured somehow… the client should write the set of rules and approaches for what it does with mismatched values. That's a separate functionality block, which either exists or doesn't. If it doesn't — that's a row in your table with an empty circle." He also separates requirement from mechanism: "maybe not even a confidence score — that's already an implementation method."
- **The smell test, repeated from the previous sync:** "It still raises the same question as last time — almost all rows are done, some half, some fully, and there are no undone ones. There must be one that is definitely not done."

**5. Scope of the delivered project vs. scope of the pack.** Write-back is out of scope in Riyadh Air and in the PoC, "but at the next stage it will be done — and any client in life needs this not as a standalone thing; it has to be integrated with something at the entry and at the exit." Alex's split: a standard import/export API is on our side and belongs in the product; every actual integration is individual. On the two remaining boundary rows: "that looks to me like out-of-scope in the Riyadh Air project, not in our package, honestly."

**6. Anchoring the integration to the partner's own product.** The reasoning he transfers from the Bosch workforce case: the data source and destination there is a workforce-management system, Oracle has its own — Oracle Field Service, in the Fusion line — and the go-to-market is to OFS customers. "So we don't write 'integration from somewhere to some workforce-management system of yours', we write specifically OFS, so everything is clear. Because we decided straight away that the ICP is those who have OFS. Although in fact nothing is wired to OFS at all, zero. But it simplifies perception and positions it under a concrete story." He asks Vlad to find the equivalent anchor for the document case: the lead came from an existing Oracle customer, so there is probably an Oracle system on one end — "we need to find that out."

**7. Why the whole exercise exists (the rationale Alex states outright).** "We're in a situation where we don't know — or rather we do know — that there will be few of them. This is Enterprise. They're all different. So we must… we can't say we have a ball and we'll make soup out of it. No. But wherever that boundary can be drawn, we must describe it as universally as possible, at least **envision** it. Otherwise the client wants X, we show them Y, so it doesn't fit — when actually, damn, there was only something small to finish off. **Our vision must be complete.** That's the point of this exercise."

**8. The prescribed three-step prompting process (closing, 27:02–30:52).** Alex hands Vlad a method for the generalization, executable with Claude:
- *Step 0 (appended after):* an up-front vendor gap task — "here's how I see the steps; look at such-and-such vendors, and from how they structure their set of capabilities, highlight which steps I'm missing." Expect it to be poorly structured; harvest the gaps.
- *Step 1:* "I see 10 steps, I see 4 principally different vertical cases — validate, maybe I'm missing an important fifth one." His own example of what the model might return: "in all your cases everything goes through validation; there could be a scenario where no validation is possible at all — in insurance."
- *Step 2:* "now here are my 10 steps — challenge them against these 5, 6, 7 patterns we found. Are the steps exactly the same everywhere, or am I missing one?"
- *Step 3:* "help me generate, for each of the 10 steps, what the specific differences may be across each of the scenarios" — with examples seeded by hand ("in contracts with vendors this matters, here it doesn't — develop the theme and think where else there may be differences").
- *The gate:* "naturally there will be a lot of water and Claude trying to satisfy you and find differences; you then need to work out which of those actually are differences — but then you'll be more confident that you really did consider all these different scenarios and generalized enough."
- On what counts as a scenario: "think about which scenarios are, in your view, **different in their entities** — not different industries that are identical under the hood."

**9. Payworks PM Jumpstart (last ~2 min, deliberately deferred).** Vlad: a workshop with the client every Monday; the work itself is planned to start in the second half of August, workshops until then. Alex defers the substance to the next sync and asks only the meta-question: are you building skills off your own discovery in parallel? Vlad: "it's in projects in Claude, it converts into skills easily — I take the history and convert it into a skill so it can be used later." Alex: "we'll look at that system next time."

## Decisions and rationale

- **The capability table is the spine, and its contents get finished before any formatting** → "let's aim next time to definitely finish this table — maybe except the styling — so that we have the table with the contents. I'd set myself that goal." Everything else derives from it.
- **The table gets mapped, row by row, against the delivered pipeline diagram** → Vlad never did the mapping, so the table and the delivery are not synchronized; features have to flow from the real workflow ("features arise from the real workflow, don't they?").
- **The generalization is driven by non-universal constraints, not by feature count** → the delivered solution rests on constraints (one customer's contract type, one language, one classification nomenclature) that the table must expose as variability rather than hide.
- **"Not done" rows are mandatory output** → a table with no unbuilt rows is evidence the list was derived from what we built, not from what the product needs.
- **Multi-language and non-document data sources move from the pack's out-of-scope to the project's** → pack scope ≠ PoC scope.
- **Write-back stays out of the PoC but enters the pack** → every client needs the thing integrated at both ends; standard import/export API is product, each concrete integration is custom.
- **Exception handling, decisioning and validation are added as pipeline concerns** → the market taxonomy carries them; ours must too, once the terms are understood.
- **Payworks discussion postponed to the next sync** → no time left; only the skills question was worth asking now.

## Action items

**Mine (Alex):**
- Consider assembling an analysis skill out of his own 5–6 Claude sessions from the Bosch workforce case and share it with Vlad if it happens — explicitly not promised ("не факт, не буду обещать").
- Bring the Payworks Jumpstart discovery to the next sync as a real agenda item, and look at Vlad's Claude-projects → skills setup.

**Theirs (Vlad):**
- Map his generalized table to the delivered pipeline diagram (4A/4B/4C ↔ table rows) — taken as homework.
- Research what the vendor taxonomy means by *validation*, cross-check *decisioning*, and cover exception handling / decisioning / validation in the table.
- Add a row for extraction fallback / mismatched-value handling (empty circle if not built), a row for the core field-extraction job, and a row for configuring mandatory vs. optional parameters.
- Split upload / import / preprocessing; reorder rows into flow order; rename features to the task altitude; drop the model name from feature names; rewrite the custom-work column to post-completion custom work.
- Add write-back to the pack (out of PoC scope, in pack scope); reflect Full Automation / Product Hardening / Enterprise Scale in the Platform & Infrastructure rows.
- Find out whether the document case has an Oracle system at the data-source/destination end, the way the workforce case has OFS — and if so, name it concretely in the integration story.
- Run the three-step prompting process (validate the scenario set → challenge the steps against the scenarios → generate per-step differences), plus the up-front vendor-gap task, and adjudicate the output himself.
- Finish the table's contents by the next sync.

## Morale / concern signals

- Alex checks that the *method* landed, not just the fixes: "Are there any questions to my questions? Am I managing to convey to you the goal, and the way of moving toward it that I'm trying to implement?" Vlad's response is not about the method but about the go-to-market ("our strategy is that we share this whole deck with Oracle, and they look for clients among theirs?") — i.e. he wanted the *why*, and Alex then gave it (topic 7).
- The same finding recurs across syncs ("it still raises the same question as last time — there are no undone rows"), which Alex names rather than lets slide — a coaching pattern, not a one-off.
- Vlad answers several status questions from assumption rather than from the delivered artifact ("I haven't seen their AltraDocs, I'm assuming"; "that's my hypothesis"; "I don't know how it is on Riyadh Air, I presume"). Alex never rejects the assumption — he converts each into a task or a table row. (inferred: this is deliberate; he corrects the process, not the person.)
- No friction, no time pressure beyond the clock; the sync ends with Alex's "Дякую" and Vlad's "Сделаем" ("will do").

## Follow-up next time

- Finished capability table (contents complete; formatting may lag).
- The table ↔ delivered-pipeline mapping, and the rows it produces.
- Answers on *validation* / *decisioning* in the vendor taxonomy.
- Whether the document case has an Oracle anchor system at either end (the OFS analogue).
- Payworks PM Jumpstart in substance — discovery progress, the Monday workshop series, and Vlad's discovery-to-skills conversion, reviewed on his actual Claude setup.

## Transcript quality

Whole-call RU with heavy AssemblyAI mangling of names: **Riyadh Air** appears as "Рио-де-Тейре / риотейры / вриотейре / ReaTear"; **AltraDocs** as "альтадок"; **ICP** as "CA"; **Llama** as "лама"; **Bosch** as "Боша"; **UI** as "QI"; **Oracle** once as "лзы". A handful of Vlad's shorter replies are garbled past recovery (e.g. "может клиент истер", "И на звездочку, и на следующий день"), and the screen-share content itself (the table and the purple diagram) is never read aloud in full — row names are known only where one of them speaks them.
