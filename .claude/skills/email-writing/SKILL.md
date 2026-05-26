---
name: email-writing
description: Write, reply to, edit, or rewrite professional messages (email, LinkedIn DM, WhatsApp, Slack, SMS) that sound like a real senior professional, not a template or a chatbot. Use this whenever the user wants to draft outreach, a cold or warm intro, a follow-up, a reply inside an existing thread, a reference/introduction, a scheduling message, a decline, bad news, a negotiation note, or wants an existing draft tightened or de-AI-ified. Trigger even when the user just pastes a thread and says "respond to this," "write back," "follow up," "reach out to X," "fix this email," or "make this less AI." Calibrates tone to the real social relationship (cold/warm, peer/senior/report) and reads the prior thread before writing.
---

# Email & message writing

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
2. **The prior thread** — if this is a reply or follow-up, read it. Note: what the recipient actually asked, their tone and register, their last open question, anything you owe them, and how they sign off. Match their formality, don't impose yours.
3. **Relationship** — who is the recipient relative to the user? Cold (never met) / warm-but-distant (one prior touch, mutual connection, or replied once) / established peer / close colleague / report / someone senior the user is courting. This sets warmth and deference. See `references/register-calibration.md`.
4. **Channel** — email, LinkedIn, WhatsApp, Slack, SMS. Drives length and formatting (LinkedIn/WhatsApp/Slack = shorter, no subject line, no formal sign-off; email = subject line, light sign-off).
5. **Purpose / the one ask** — what does the user want to happen? There should be exactly one. If the draft has three asks, flag it.
6. **The user's own voice** — if they pasted a draft or past examples, that is the target voice. Preserve it (see Step 4, editing rules). If not, default to the house style below.
7. **Constraints** — availability, Calendly link, deadlines, names/titles, language.

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
- Match the recipient's language. If the user writes in Russian or Ukrainian, draft in that language. When drafting a message the user will send to someone else, match the recipient's register, not the user's.
- **In Russian or Ukrainian, do not translate English professional, product, or tech terms.** Keep them in English inside the Cyrillic text. The user writes "VP of Product," "reference," "intro," "B2B SaaS," "Series B," "product leader," "marketplace," "direct manager," "co-founder," "CTO" in English mid-sentence. Translating these ("рекомендация," "соучредитель") reads wrong and unlike him.
- **Emoji**: allowed and natural in warm or personal messages, especially Russian/Ukrainian to people the user knows (🙏 😊 🤞 are in his real vocabulary). Keep them out of cold outreach, messages to senior strangers, formal/official correspondence, subject lines, and any high-stakes message. One or two, never a string.

**Banned vocabulary** (hard tells he never uses; full list and the "actually-his-voice" exceptions in `references/banned-phrases.md`): excited to connect, passionate about, driven growth, unlock value, synergies, game-changing, leverage (as a verb), "I came across your profile," "pick your brain," "let's connect / sync," as per, kindly, "I hope this email finds you well." If a phrase sounds like a LinkedIn motivational post or a sales sequence, cut it. But do NOT strip ordinary warmth: "Thanks for reaching out," "just following up," "touching base," "circle back," "Hope you're doing well," "feel free to grab a slot," and "looking forward to connecting" are genuinely his voice in warm and transactional contexts. Trim those only for cold outreach to senior strangers.

**Subject lines** (email only): 4-7 words, sentence case, specific to the recipient or the thread. The subject earns the open; it is not the pitch. "Intro re: [mutual name]" or "Question on [their specific thing]" beats "Exploring synergies." No emoji, no "Quick question."

Length targets: cold outreach under ~120 words. Replies and follow-ups: as short as the content allows, usually 3-6 sentences. Density beats length.

**Standing signature** (email only): the user signs off with a fixed block. Default to it for email, in any language:

```
Best regards,
Alex Orlov,
alexorlov.co | Linkedin
```

Use "Best regards," as the closer (not "Best," / "Thanks,"). Drop the whole block on chat channels (LinkedIn, WhatsApp, Slack, SMS), where it's redundant. For a quick reply deep in an existing thread, "Best regards," alone is fine without the full block.

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
