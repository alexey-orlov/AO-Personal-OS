# LinkedIn-specific norms and playbooks

Deltas from the email-default in `SKILL.md` and `message-playbooks.md`. Everything in the main skill (voice, banned phrases, register matrix, signature discipline) still applies. This file overrides only where LinkedIn diverges from email.

## Why LinkedIn is different

LinkedIn is read on a phone, in a feed-adjacent context, by someone who gets dozens of templated DMs a week. The bar for "this is a real human writing to me" is higher than email, and the tolerance for length is lower. **If a LinkedIn message would also work as an email, it is almost certainly too long.** Cut.

## Channel norms (deltas vs. email)

- **No subject line.** The first sentence earns the read.
- **Length:**
  - First message after a connection is accepted: 50-90 words.
  - Cold InMail or DM: 60-110 words.
  - Reply in an active thread: as short as the content allows, often one or two sentences.
  - For very senior or visibly busy recipients: lean shorter, not longer.
- **Signature:** no signature block on LinkedIn. Alex's real LinkedIn sign-offs are `- Alex.`, `-Alex.`, `Alex.`, `Alex`, or no signature on quick replies. Pick from these. Never paste the `Best regards, / Alex Orlov, / alexorlov.co | Linkedin` block on LinkedIn (that block lives in Gmail's auto-signature on email, not in any draft body, and never on LIN).
- **Greeting:** "Hi [First]," for first contact. Once a thread is going, often drop "Hi" and open with just "[First], ..." ("Christopher, no worries at all!", "Lorraine, thanks for your response!", "Scott, thanks for the update"). Use the bare-name opener for continuing replies.
- **Telegraphic register.** Compact sentences. Don't overexplain. Avoid overusing "I" - vary openers, cut "I just wanted to / I'd like to / I'm reaching out to" where they add nothing. Reduce repeated "I've / I'm / I would / I wanted" across the message.
- **Hard rule reminder:** no em dashes. This is already global, but doubly important on LinkedIn where one em dash flags AI immediately. Hyphen with spaces, comma, or split the sentence.
- **Emoji:** more tolerated on LinkedIn than in email, especially in transactional or warm threads. Alex's real LIN usage: 🙏 😊 🙃 🤞 occasionally 😐 - always one at a time, never a string. Skip emoji entirely in cold outreach to senior strangers.
- **Calendly link:** paste the URL inline. Pair it with the soft safety valve "(or let me know if nothing works)" - his actual phrasing.
- **One ask. One.** Multi-ask messages that work in email do not work in LinkedIn DMs. If you have two possible topics, pick the stronger one.

## CTA library (low-friction asks)

These are the asks that actually get replies. Pick by relationship.

- **"Would be happy to hop on a quick chat sometime next week if you're up for it 😊"** - warm, established or warm-but-distant.
- **"Would be great to compare notes."** - peer, no pressure.
- **"Curious to hear how you think about this market."** - peer, intellectual framing.
- **"Would appreciate your perspective."** - asking up, balanced (not mentor-seeking).
- **"Worth a 20-minute call, or easier over email?"** - always-an-easy-no framing.
- **"Wondering if you had any interesting product leadership opportunities on your radar so far?"** - recruiter check-in (his exact phrasing).
- **"Have you got any interesting B2B product leadership opportunities on your radar?"** - recruiter re-engagement variant (his exact phrasing).

Avoid: "Let's connect / sync", "Quick question", "Pick your brain", anything that sounds like a sales sequence.

## LinkedIn-specific banned tells

In addition to the global `banned-phrases.md` kill list, these are LinkedIn-fatal:

- **"I came across your profile" / "I stumbled upon your profile"** - already banned globally; on LinkedIn this is the #1 cold-template tell.
- **"I'd love to connect" / "Let's connect"** as the ask - vague and template-y. State the actual reason.
- **"Saw your work and was impressed" / "Your profile is impressive"** - over-praise from a stranger reads as a sales sequence opener.
- **"I'm actively exploring opportunities"** when used generically - reads as an "open to work" stamp. Use only when it adds info. Prefer "still actively looking for B2B SaaS product leadership roles" (his phrasing) or just describe the kind of role.
- **"Quick question on..."** as opener - overused sales template.
- **The credential dump as opener.** On LinkedIn, who Alex is can be checked on his profile in two clicks. Don't recite his CV. One sentence of relevance at most, and only if it directly supports the ask.
- **"As a fellow [role] in [industry]..."** - flattery framing that reads as a template.
- **Multi-paragraph cold DMs.** If it has three paragraphs, it should have been an email.

## Per-relationship register tweaks (LinkedIn)

The main register matrix in `register-calibration.md` still applies. LinkedIn-specific add-ons:

- **Recruiter (warm-but-distant).** Mention his product leadership focus in one line - "B2B SaaS product leadership," "workflow automation, CRM, BizOps." Don't recap the CV. Don't sound like a cover letter. Don't beg.
- **Recruiter (cold / first contact).** Even shorter. Make their search-relevance the hook, not his background.
- **Peer product leader.** Keep the narrative of why he followed or connected with them. Feel like an exchange between peers. Don't bundle two purposes; pick the stronger.
- **Senior / decision-maker the user is courting.** Lean shortest. No presumption on their time. The ask should be easy to decline.
- **Referral / hiring-team contact.** Very concise, polite. One sentence of prior context. Ask for help connecting or advice; don't make it sound like "please give me a job." Slight self-irony is OK; keep it subtle.

## Channel routing — when a LIN thread becomes an email thread

LinkedIn is the entry point for a lot of Alex's conversations, but not always the right place to keep them. If the recipient signals that the next substantive step belongs over email (or phone), respect that signal. The default is still LIN→LIN, but the exception is common enough that it needs its own pattern.

**Signals that the next reply should go to email, not LinkedIn:**

- They share their email address with a meeting / next-step framing. Daniel's "When works best for you? My email is daniel@startuptap.com" is the canonical pattern.
- They explicitly say "let's continue over email" or "feel free to email me at X."
- They share a work email in the context of scheduling, document exchange, or anything substantive.
- They sign off with their email in a way that's clearly "here's where to reach me next."

Phone numbers ARE sometimes shared the same way, but treat phone as a meeting-medium signal (use it for the actual call), not a "switch the thread off LIN" signal. Stay on LIN/email for written correspondence unless the recipient specifically asks for SMS / WhatsApp.

**The two-artifact response pattern (LIN inbound → email reply):**

When the channel switches, produce TWO drafts:

1. **The substantive reply, in email.** This is the real reply — full content, proper subject line, email-channel formatting per `SKILL.md`. In inbox-sweep this path uses `signature: gmail-auto` (Path A): the draft body ends with the last substantive line — no closer, no name, no contact block — because Gmail iOS auto-appends the signature when the user sends from the prefilled compose. About-me / blurb decisions per `profile.md`.
2. **A short LinkedIn confirmation message.** Posted in the LIN thread after the email is sent. Its job is to acknowledge the LIN thread (so the recipient sees a notification on LIN and doesn't think Alex went dark) and to tell them to check their email. One short sentence.

The LIN confirmation goes AFTER the email. The user sends the email first, then sends the short LIN note. Both are produced upfront so the user can fire them in sequence.

**LIN confirmation templates — make them self-standing.**

The LIN confirmation has to read correctly **even if the recipient reads it BEFORE the email arrives** (mobile notifications often surface LinkedIn before Gmail). Don't assume the email's "thank you / acknowledgment / context" is already in their head when they see the LIN note. Bake the basics into the LIN message too.

**Pattern:** brief acknowledgment of their message → say where the substantive reply is → light close. Two to three sentences. Not one.

**Worked examples** (cold/warm-outreach recipient finally replied — see Timing rule in `SKILL.md` Step 1.8: do NOT acknowledge their delay, only your own if applicable):

> Daniel, thanks for the note, and apologies for the slow reply! Just sent you a note via email so we can pick this up there. Looking forward to connecting!

> Lorraine, thanks for getting back to me! Just sent you an email with the details and a Calendly link. Looking forward to chatting!

> Mickael, thanks for the note! I replied over email with a Calendly so we can grab a time that works. Speak soon!

What to keep:
- Acknowledgment of THEIR last message (thanks for getting back / no worries on the delay / etc.) — so the LIN message stands on its own.
- A clear pointer to email ("sent you a note via email", "replied over email").
- A light warm close ("looking forward", "speak soon", "👋"). Optional emoji, on-voice.
- The mini-signature is optional in this register — "Alex" or no signature is fine for a follow-up note.

What to avoid:
- One-liners that only make sense AFTER the recipient has read the email. ("Replied via email 🙏" on its own is too thin.)
- Restating the entire email content on LIN (that defeats the purpose of moving to email).
- Repeating the email's sign-off block.

**When the channel does NOT switch (default — stay on LIN):**

- They didn't share an email.
- They asked a quick clarifying question that's easier to answer in-thread.
- The reply is a one-line acknowledgement.
- They're a peer where LIN is the natural medium.

If the recipient's email is visible elsewhere (their LIN profile, a mutual intro), do NOT pre-emptively jump to email. Wait for them to signal it.

## Playbook: Cold DM / first message after connection accepted

**Goal:** get a reply, not a meeting booked from line one.

**Structure:**
1. Natural opener: thanks for connecting / good to connect / one specific concrete reference to their work.
2. One short reason this person is relevant to him.
3. One compact sentence about him, only if it adds something.
4. One low-friction ask.
5. Light close.

**Worked example - peer product leader, post-connection-accept (~70 words):**
> Hi Dana, thanks for connecting! Saw [Company] is pushing into vertical CRM - that's a transition I went through at Creatio, including the horizontal-vs-vertical roadmap tension.
>
> Currently CPO at GigaCloud, looking at agentic AI in this space.
>
> Would be great to compare notes if you're up for a quick chat.
>
> - Alex.

**Worked example - recruiter, cold (~85 words, his real "Mickael" voice):**
> Hi Mickael, hope you're doing well!
>
> Still actively looking for B2B SaaS product leadership roles at growth/scaling-stage SaaS companies, with a focus on workflow automation, CRM, and BizOps.
>
> Wondering if you've got any interesting product leadership opportunities on your radar at the moment?
>
> - Alex.

## Playbook: Recruiter thread management

His highest-volume LinkedIn use. Four sub-cases.

**Scheduling handoff (sending Calendly):**
> Lorraine, thanks for your response! Sure, please feel free to pick a time that works for you here in my Calendly: https://calendly.com/a-orlov/online-meeting (or let me know if nothing works).
>
> Looking forward to connecting!
> - Alex.

Note the "(or let me know if nothing works)" graceful safety valve. Keep it.

**This is also the default response to an inbound recruiter cold-pitch.** When a recruiter cold-pings Alex about a role (with or without a link to the JD), the right move is to accept the call and send the Calendly — **not** to pre-qualify with questions about level, scope, comp, remote, etc. Those belong in the call, not in the LIN reply. The recruiter reached out, so they've already decided Alex is worth a conversation; turning the reply into an intake form is friction. Skip status preambles too ("still actively looking" presupposes shared history — see SKILL.md Step 5 cold-inbound check); a warm "thanks, happy to chat" + Calendly is enough.

**Proposing a specific slot when nothing else works:**
> Hi Deborah - thanks for getting back to me! I couldn't find any spots that worked this week, so I just grabbed a time for next Tuesday on your Calendly.
>
> Looking forward to our chat. Enjoy your week!
>
> Alex

**Status check-in on an open process:**
> Hi Chitra, hope you are doing well! Just touching base to see if you have any updates from Root so far?
>
> Have a great day!
> -Alex.

**Missed-meeting / reschedule:**
> Hi Christopher, I believe we were scheduled for today at 3PM ET - perhaps we missed each other. Would you have some other slots that work for you (maybe next week)? If that's convenient, please feel free to pick a slot here in my Calendly: https://calendly.com/a-orlov/online-meeting.
>
> Looking forward to meeting you!
> Alex.

## Playbook: Network re-engagement on LinkedIn

**Goal:** reopen a warm-but-dormant relationship (recruiters, VCs, past contacts) and ask if anything relevant has come up.

**Structure:** warm seasonal or personal opener → one line acknowledging the gap → soft ask → easy out. Same shape as the email version in `message-playbooks.md`, but shorter and with the LIN mini-signature.

**Worked example (his real "Ardavan" pattern):**
> Hi Ardavan, hope you're doing well!
>
> It's been a while since we last spoke, so I was wondering if you had any interesting product leadership opportunities on your radar so far?
>
> Would be happy to hop on a quick chat sometime next week if you're up for it 😊

**Variant with optional self-update (his real "Mickael" pattern):**
> Hi Mickael, hope you're doing well!
>
> It's been a while since we last spoke, so I was wondering if you've got any interesting B2B product leadership opportunities on your radar?
>
> My updates: still actively looking for B2B SaaS product leadership roles at growth/scaling-stage SaaS companies + on an interim basis, partnered with an early-stage GenAI B2B startup as fractional CPO.
>
> -Alex.

The warm connectors banned for cold outreach ("Hope you're doing well," "It's been a while," "just wanted to check in") are correct and on-voice here. Don't strip them.

## Playbook: Live transactional one-liners

When a thread is actively moving (scheduling in the moment, confirming a detail, reacting to news), drop the full structure. One or two sentences. Often no greeting, just the name. No signature, or just `Alex.` / `- Alex.`

**His real markers:**

Confirmation: `Hi Babur, thank you, that's correct! Wish you a productive week! )` (The `)` smile is his - keep it if it appears in his draft, don't invent it.)

Quick decline + counter: `Christopher, no worries at all! I'm fully booked today, unfortunately 🙃 Any chance you have some time tomorrow or early next week? Ideally in the morning or by 2-3pm ET.`

Warm acknowledgement + reschedule: `Scott, thanks for the update, really appreciate it. Happy to reconnect if anything comes up. Hope you have a great week! Alex.`

Polite "you ghosted me" nudge: `Hi Kristina, I believe we were scheduled for today at 1PM ET. I was there on the call, but it seems we weren't able to connect. I've just rescheduled for another slot on Wednesday 9/17 - let me know if that time works for you or if you'd prefer a different one. Thanks a lot! Alex.`

Defer-and-loop: `Thanks for taking the time to reply, Meg. I hope things ease up on your side. I'll reach out again later in September or October as you suggested 🙏 Best regards, Alex.`

**Structural notes:**
- Short warm close ("Have a great day!", "Enjoy your weekend!", "Wish you a productive week!", "Looking forward to chatting with you soon!") followed by the mini-signature.
- Bare-name opener is fine and frequent ("Christopher, ...", "Scott, ...", "Andrew, ...") once a thread is going.
- Emoji are in-voice in this register. One at a time.

## Editing an existing LinkedIn draft

Same rule as email (Step 4 in `SKILL.md`): minimum change, preserve voice, flag don't fix silently. The LinkedIn-specific caveat: **don't "upgrade" a draft to email length when the channel is LinkedIn.** If a draft is 40 words, the edited version should also be ~40 words. Don't paste a signature block — the `Best regards, / Alex Orlov, / ...` block is email-only (auto-appended by Gmail or inline in a Gmail API draft; see `SKILL.md` Step 3), never on LIN. Don't add a subject line.
