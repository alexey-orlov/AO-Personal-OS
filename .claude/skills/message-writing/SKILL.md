---
name: message-writing
description: Write, reply to, edit, or rewrite professional messages across channels (email and LinkedIn DM are first-class; also WhatsApp, Slack, SMS) that sound like a real senior professional, not a template or a chatbot. Use this whenever the user wants to draft outreach, a cold or warm intro, a follow-up, a reply inside an existing thread, a reference/introduction, a scheduling message, a decline, bad news, a negotiation note, or wants an existing draft tightened or de-AI-ified. Trigger even when the user just pastes a thread and says "respond to this," "write back," "follow up," "reach out to X," "fix this email," "draft a LinkedIn message," "reply to this DM," or "make this less AI." Output is text in chat — for the user to read, edit, copy. Calibrates tone to the real social relationship (cold/warm, peer/senior/report) and reads the prior thread before writing. **For "save / prep / set up a draft to send" intent — saving to Gmail Drafts or pushing a LinkedIn draft to Telegram for mobile review — use `draft-message` instead. It calls this skill internally for the voice and adds the delivery layer on top.**
---

# Message writing

Produce a message the user can paste and send with no edits. The default failure mode is sounding like AI or a marketing template; the second is misjudging the relationship. This skill exists to prevent both.

## Operating principle

Read before you write. Calibrate before you draft. Output the send-ready version first.

Never reconstruct a thread, a relationship, or prior commitments from memory. If the prior conversation exists, read the actual text. If you're guessing at who the recipient is or what was last said, you will get the tone wrong.

## Output discipline — draft only, never send

Produce text for the user to review and send. Never send, and never auto-fire a connected tool to send, on your own. If asked to save it, save as a draft (e.g. a Gmail draft), not a sent message.

Flag high-financial / legal exposure. If the message touches **compensation, an offer, a contract, equity, legal terms, hiring/firing, board matters, or money owed**, prepend a single line `[REVIEW - sensitive]` above the draft and keep one line on why it needs his eyes before sending. Don't commit to numbers, terms, or concessions on the user's behalf, draft them as his position for him to confirm.

## Step 1 — Gather context (do this silently, don't narrate)

Collect these before drafting. Pull what you can from the conversation, attached threads, or connected tools (e.g. Gmail thread history) before asking the user anything.

1. **Message type** — outreach / reply-in-thread / follow-up / intro or reference / scheduling / decline / bad news / negotiation / edit-existing. Determines structure. See `references/message-playbooks.md`.
2. **The prior thread** — if this is a reply or follow-up, read it. Note: what the recipient actually asked, what they handed you (a link, an attachment, a specific detail), their tone and register, their last open question, anything you owe them, and how they sign off. Match their formality, don't impose yours. **Your reply has to engage with what they shared** — don't ask a question whose answer is in the link or file they just sent. Either reference what's in it ("saw the page — which of the roles do you have in mind?"), or skip the question entirely and move to the next step.
3. **Relationship** — who is the recipient relative to the user? Cold (never met) / warm-but-distant (one prior touch, mutual connection, or replied once) / established peer / close colleague / report / someone senior the user is courting. This sets warmth and deference. See `references/register-calibration.md`.
4. **Channel** — email, LinkedIn, WhatsApp, Slack, SMS. Drives length and formatting (LinkedIn/WhatsApp/Slack = shorter, no subject line, no formal sign-off; email = subject line, light sign-off). If the channel is LinkedIn (DM, InMail, or post-connection message), also load `references/linkedin.md` — that's where the LinkedIn-specific length, signature, opener, CTA, and banned-tells rules live.

   **Channel routing across platforms.** The draft channel is not always the prior-thread channel. If a LinkedIn thread implies the recipient prefers email for the next substantive step (shares their email with a meeting / next-step framing, says "let's move to email", etc.), the substantive reply goes to **email**, not LinkedIn. In that case, ALSO produce a short LinkedIn confirmation message (e.g. "Daniel, sent you a note via email - looking forward!") that the user sends in the LIN thread after the email goes out. See the "Channel routing" section in `references/linkedin.md` for signals, the two-artifact pattern, and the LIN confirmation template.

   **HTML for emails saved as Gmail API drafts.** When the email is going to be saved as a real Gmail draft (the inbox-sweep flow for LIN→email channel-switch, and re-engagement-outreach in Phase 2), produce TWO body variants: a plain-text version (for `body` and TG display) and an HTML version (for `htmlBody`). The HTML version uses `<p>`, `<ul>`/`<li>`, `<a>` per the conventions in `references/profile.md` "HTML formatting in email drafts" — this is what makes inline links (Calendly, portfolio, etc.) clickable and lets longer messages use bullets. Both versions must be substantively identical; the HTML is just a markup of the plain. Don't add content in HTML that isn't in the plain version.
5. **Purpose / the one ask** — what does the user want to happen? There should be exactly one. If the draft has three asks, flag it.
6. **The user's own voice** — if they pasted a draft or past examples, that is the target voice. Preserve it (see Step 4, editing rules). If not, default to the house style below.
7. **Constraints** — availability, deadlines, names/titles, language. Alex's standing assets (Calendly link, CV URL, email, LinkedIn URL, portfolio URL, brief and long about-me blurbs) live in `references/profile.md`. Load it whenever the message needs to share a link, propose a meeting, or include a background line. Don't ask the user for these and don't invent them.
8. **Timing** — note how long ago the recipient's last message arrived. Timing is part of the context that defines the reply's approach:
   - **0-2 days:** no acknowledgment needed.
   - **3-7 days:** a light note is fine if relevant.
   - **7-14 days:** clear acknowledgment of YOUR delay ("apologies for the slow reply") when you're the one who took time.
   - **14+ days:** clear acknowledgment plus a brief reason if there's a genuine one.
   - **Cold or warm outreach — ignore the recipient's apology for THEIR delay.** When the recipient is responding (late) to YOUR cold or warm outreach AND they apologized for being slow, do **not** acknowledge their apology. Their response is a favor to you; commenting on their delay — even sympathetically ("no worries on the delay") — reads as condescending or over-acknowledging. Skip phrases like "no worries on the delay", "thanks for finally getting back", "appreciate you coming back to me". You can still acknowledge YOUR OWN delay if you took time replying — but standalone: "apologies for the slow reply" or "sorry for my slow reply", NOT "no worries on yours, sorry for mine too" and NOT "apologies for my own slow reply too" (the "too" implies they were also slow).
   - **Established peer relationship, both slow:** different context. Here it's fine to match the frame ("no worries on the delay, and apologies for my own slow reply") because the relationship is mutual and acknowledging both delays reads as candid, not condescending.
   - Compute the gap from the message timestamp using the current date in the conversation context. Don't guess.

**Ask only when a wrong guess forces a rebuild.** Scope/audience/purpose ambiguity (e.g. "is this to the CEO or the recruiter?") warrants one tight question. Small ambiguities: state the assumption inline and proceed. Never ask more than 2 questions.

## Step 2 — Calibrate register

Set warmth and formality from the relationship and message type, not from a generic "professional" default. A note to a close peer and a note to a senior stranger are not the same email with different names swapped in. Load `references/register-calibration.md` for the relationship × warmth matrix, the signals to read off a prior thread, and the specific dials (greeting, contractions, directness of the ask, sign-off).

High-stakes messages (declining, bad news, negotiation, anything with conflict) tighten: shorter, plainer, fewer adjectives, no over-apology. Celebratory or rapport messages can loosen.

## Step 3 — Draft in the house style

This is the always-on default voice. It applies unless the user's own pasted voice overrides it.

**Sound like a senior product/exec peer writing to another professional.** Human, concise, confident, and genuinely warm. Business-casual: polite, friendly, direct. The voice is warm, not cold-corporate: a real "Thanks again for doing this," a real exclamation when something is good news, plain gratitude. What's banned is *manufactured* enthusiasm and salesy gloss, not real warmth. Calibrate the warmth to the relationship (see Step 2): warmer with people the user knows, plainer and more measured with cold or senior strangers.

**Hard rules:**
- **No em dashes. Ever.** Use a simple hyphen with spaces, a comma, or split the sentence. This is the single most reliable AI tell to remove.
- One clear ask. Make the next step obvious without being pushy.
- Short paragraphs (1-3 sentences). Easy to scan on a phone.
- Concrete and specific over polished and corporate. Insider wording beats agency wording.
- Don't over-explain the user's background. Include a credential only where it directly supports the ask. The purpose must never get buried under the user's CV.
- Don't overpraise the recipient. One grounded, specific reference beats three compliments.
- **Re-anchor context when the thread isn't live; reference it obliquely only mid-conversation.** How much prior context you can lean on depends on the thread's liveness. In an active back-and-forth, an oblique reference is natural and correct. But when the message is a follow-up after a pause, a re-open, or it lands in a different channel than the recent exchange, the recipient is no longer holding that context in mind — so don't open with a phrase that assumes continuity ("thanks for the whole process", "thanks again", "following up on that", "re: our chat"). Re-establish it directly in the opener: what it was, roughly when, and what about it ("thank you for the time over the past few weeks - the conversations and getting to know the business"). The colder or more cross-channel the gap, the more explicit the re-anchor. This is the sibling of the cold-inbound rule in Step 5: there the shared history doesn't exist and you must drop the reference; here it exists but is dormant, so you must name it rather than gesture at it.
- **Don't impose the user's hoped-for next step on the recipient as a settled fact.** For *optional, low-obligation* social gestures (grabbing coffee, a catch-up, staying in touch, a future visit), frame them as the user's own openness or wish, left conditional — "if I'm in town, it'd be great to grab a coffee", "would love to stay in touch" — not as a unilateral plan the recipient must now accommodate: "I'll give you a shout", "I'll call you when I'm there", "let's definitely meet up". The fait-accompli framing presumes the recipient's consent and time, which reads as entitled, especially toward someone senior or someone doing the user a favor. (This is the inverse of a *real* ask or a scheduling message, where a concrete proposed next step is correct — see `references/message-playbooks.md`. The rule is about soft optional offers, not firm asks.)
- **No echo-mirroring.** Don't repeat the recipient's specific phrases back at them ("AI-driven transformation", "agentic AI in customer support", "platform play", "product-led growth", their job-description bullet points). It reads as overeager paraphrasing or manipulative mirroring — exactly what a sales sequence does. Reference the topic in your own words, or just signal interest in the substance without listing back what they said.
- **Calibrate enthusiasm to the relationship and stage.** Real interest shows in specifics, not in adjectives. "really excited", "дуже цікаво", "amazing opportunity", "would love to" early in a cold or warm-distant exchange reads as desperate. Default to lukewarm-but-engaged: "happy to chat", "цікаво поспілкуватись", "looking forward to learning more". Save real enthusiasm for when there's a concrete grounded reason. Note that "Looking forward to connecting!" / "Looking forward to chatting!" as a sign-off is fine — those read as polite closers, not as enthusiasm in the body.
- Match the recipient's language. If the user writes in Russian or Ukrainian, draft in that language. When drafting a message the user will send to someone else, match the recipient's register, not the user's.
- **In Russian or Ukrainian, do not translate English professional, product, or tech terms.** Keep them in English inside the Cyrillic text. The user writes "VP of Product," "reference," "intro," "B2B SaaS," "Series B," "product leader," "marketplace," "direct manager," "co-founder," "CTO" in English mid-sentence. Translating these ("рекомендация," "соучредитель") reads wrong and unlike him.
- **Emoji**: allowed and natural in warm or personal messages, especially Russian/Ukrainian to people the user knows (🙏 😊 🤞 are in his real vocabulary). Keep them out of cold outreach, messages to senior strangers, formal/official correspondence, subject lines, and any high-stakes message. One or two, never a string.

**Banned vocabulary** (hard tells he never uses; full list and the "actually-his-voice" exceptions in `references/banned-phrases.md`): excited to connect, passionate about, driven growth, unlock value, synergies, game-changing, leverage (as a verb), "I came across your profile," "pick your brain," "let's connect / sync," as per, kindly, "I hope this email finds you well." If a phrase sounds like a LinkedIn motivational post or a sales sequence, cut it. But do NOT strip ordinary warmth: "Thanks for reaching out," "just following up," "touching base," "circle back," "Hope you're doing well," "feel free to grab a slot," and "looking forward to connecting" are genuinely his voice in warm and transactional contexts. Trim those only for cold outreach to senior strangers.

**Subject lines** (email only): 4-7 words, sentence case, specific to the recipient or the thread. The subject earns the open; it is not the pitch. "Intro re: [mutual name]" or "Question on [their specific thing]" beats "Exploring synergies." No emoji, no "Quick question."

Length targets: cold outreach under ~120 words. Replies and follow-ups: as short as the content allows, usually 3-6 sentences. Density beats length.

**Signature handling for email — depends on how the draft will be delivered.** Two paths, two rules. The caller signals which one via a `signature` parameter; if unspecified, default to `gmail-auto`.

**Path A — `signature: gmail-auto`** (default for ad-hoc email drafts the user will paste into Gmail himself; also inbox-sweep's LIN→email channel-switch, which uses the `googlegmail://co?…` URL scheme to prefill a fresh Gmail iOS compose). Gmail is configured to auto-append Alex's standing signature block (`Best regards, / Alex Orlov, / alexorlov.co | Linkedin`) on send. **Do NOT include any closer, name, or contact line in the draft body** — they'd duplicate the auto-signature. The body ends with the last substantive sentence.

**Path B — `signature: inline`** (Gmail API drafts saved via `create_draft`: inbox-sweep email-to-email replies, re-engagement-outreach email contacts). Gmail does NOT auto-append the signature to API-created drafts. **Include Alex's standing signature block inline** at the bottom of the body, using both variants from `references/profile.md`: the plain-text version in `body`, the HTML version in `htmlBody` (so `alexorlov.co` and `Linkedin` are clickable). Same block, same wording — just rendered for both body fields.

**The closer line is part of the signature block, never standalone.** Both `Best regards,` and the contact line live together in the standing block. Path A: Gmail appends the whole thing. Path B: you paste the whole thing. Either way, never type a bare `Best regards,` / `Best,` / `Thanks,` as a closer in the body — in Path A it duplicates the auto-signature; in Path B it stranded above the block. A warm semi-closer ("Looking forward to connecting!", "Thanks!", "Talk soon!") can still be the last line of body content when the register calls for it — it's a wave-goodbye, not a sign-off, and the signature follows it naturally in both paths.

**Chat channels (LinkedIn, WhatsApp, Slack, SMS)** have no auto-signature and no inline signature block. Follow the per-channel signature norms (e.g. `references/linkedin.md` for LinkedIn's `Alex.` / `- Alex.` / no-signature pattern).

## Step 4 — If editing the user's existing draft

The user's draft is the source of truth, not your sense of a better email.

- Re-read their draft fully before changing anything. Don't act on a remembered version.
- Make the **minimum** necessary change. Preserve their wording, structure, tone, and nuance.
- Don't add details, claims, or flourish they didn't write.
- Don't make it more formal, more polished, or more "marketing" than the original.
- If they say "fix grammar only," fix grammar and only genuinely broken wording. Do not rewrite.
- If you change wording beyond grammar, stay extremely close to their intent.
- Flag, don't silently fix: if their draft has a wrong name, a contradiction, a stale reference, or two competing asks, name it before/after the draft rather than quietly papering over it.

## Step 5 — Self-check before output

Run this pass on your own draft. It catches the errors that lose trust:
- Right name, right company, right title? (Most common AI error.)
- Does it actually answer what the recipient asked / address their last open question?
- Exactly one ask, and is the next step unambiguous?
- Any em dash? Any banned phrase? Any sentence that sounds like a brochure?
- Would a busy senior person read this in 15 seconds and know what to do?
- Does the register match the relationship, or did it default to generic-professional?
- Does any phrase presuppose context the recipient doesn't have? On **cold inbound** (the recipient is reaching out for the first time), they know nothing about Alex — "still", "as I mentioned", "continuing our chat", "circling back", "as discussed" all silently assume shared history that doesn't exist. Drop the temporal marker, or drop the status preamble entirely (often answering their question — "yes, happy to chat" — is enough; the status is implicit).
- If this is a follow-up after a pause or in a new channel (not a live exchange), does the opener re-establish the context directly, or does it lean on prior context as if mid-conversation ("thanks for the whole process", "following up on that")? Re-anchor it explicitly.
- Did I state an optional social next step (coffee, catch-up, visit) as a done deal the recipient must accommodate ("I'll give you a shout") instead of my own conditional openness ("if I'm in town, a coffee would be great")?
- If it touches comp / an offer / contract / equity / legal / hiring / money: did I prepend `[REVIEW - sensitive]` and avoid committing to terms on his behalf?

## Step 6 — Output format

1. **The send-ready version first.** For email, include the subject line. No preamble, no "here's a draft," no explanation of your choices.
2. If genuinely useful, **2 short alternatives** with a different tone or angle (e.g. warmer vs. more direct), clearly labeled. Don't pad with near-identical variants.
3. When you **edited an existing draft**, add 2-3 lines at the end listing what changed and why. When writing from scratch, skip this.
4. Keep the whole response compact. The message is the product; commentary is overhead.

## Reference files

- `references/register-calibration.md` — relationship × warmth matrix, how to read register off a thread, per-dial tone settings, follow-up cadence and decline/bad-news handling.
- `references/message-playbooks.md` — structures for outreach, reply-in-thread, follow-up, intro/reference, scheduling, decline, negotiation, with short worked examples.
- `references/banned-phrases.md` — the full kill list, why each is a tell, and concrete replacements; AI-tells beyond vocabulary (rhythm, structure, fake enthusiasm).
- `references/linkedin.md` — LinkedIn-specific length/signature/CTA norms, four playbooks (cold DM, recruiter thread, re-engagement, live transactional), LinkedIn-only banned tells. Load when channel is LinkedIn.
- `references/profile.md` — Alex's standing assets (Calendly, CV, email, LinkedIn, portfolio URLs) and the LIN-length / email-length about-me blurbs, with decision rules for when to insert which. Load whenever the message needs to share a link, propose a meeting, or include a background line.
