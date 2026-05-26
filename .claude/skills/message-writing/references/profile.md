# Standing assets and about-me blurbs

Source of truth for the links Alex shares and the background blurbs he uses. Pull from here. Don't ask him for these. Don't invent them.

## Standing assets

| Asset      | Value                                            |
|------------|--------------------------------------------------|
| Calendly   | https://calendly.com/a-orlov/online-meeting      |
| Email      | orlov.alexej@gmail.com                           |
| LinkedIn   | https://linkedin.com/in/aorlov                   |
| CV         | https://bit.ly/cv-aorlov                         |
| Portfolio  | alexorlov.co (https://alexorlov.co)              |

**Per-asset usage rules:**

- **Calendly.** Paste the full URL when proposing meeting times or handing off scheduling, on any channel. Default pattern: "feel free to pick a time that works for you here in my Calendly: [URL] (or let me know if nothing works)" - the parenthetical safety valve is his real phrasing; keep it.
- **CV URL.** Share only when explicitly requested or when context makes it obviously expected (post-interview "as discussed" follow-up, recruiter pipeline ask, "could you send your CV?"). Don't pre-emptively attach to cold outreach.
- **LinkedIn URL.** In email signatures, render as a hyperlink on the word "Linkedin" in the existing signature block. In LinkedIn messages, never include (redundant).
- **Email address.** Share when the recipient may need to reach him off-platform (LinkedIn-to-email handoff, recruiter intake form, when someone asks where to send a document). Don't append it to email signatures - it's already in the From: header.
- **Portfolio (alexorlov.co).** Used less frequently than the others. Include only when genuinely relevant: a peer or interviewer asked to see work samples, a portfolio-led intro, an exec who'll Google him anyway and benefits from a curated landing page. Already in the email signature; don't double-include it in the body unless context calls for it.

## About-me blurbs

Two pre-approved versions. Use the right one for the channel and scenario. Don't write a new blurb from scratch.

### LinkedIn-length (short) blurb

Use in cold or warm **LinkedIn DMs** when the recipient needs a one-line "who is this person" grounding. Skip in transactional or scheduling threads where it's noise.

```
Quick background:
- 10 years at Creatio (workflow automation & CRM unicorn, $10M → $70M as HoP / Dir. PM / SVP);
- CPO at Jooble (new HR tech products, product innovation);
- Most recently fractional product leader for agentic AI B2B startups.
```

Position it **after** the opener and **before** the ask, not at the top. Skip when the relationship is established or when the message is purely transactional.

### Email-length (long) blurb

Use in formal or long outreach **emails** when credentials genuinely matter: recruiter intro reply with detail, exec cold email where credentials matter, advice request where context is needed, formal intro paragraph after a connection.

```
[Linkedin](https://linkedin.com/in/aorlov) | [CV](https://bit.ly/cv-aorlov) | [alexorlov.co (portfolio)](https://alexorlov.co)

Background:
- 10 years at Creatio (workflow automation & CRM unicorn, $10M → $70M as HoP / Dir. PM / SVP);
- CPO at Jooble (new HR tech products, product innovation);
- Most recently fractional product leader for agentic AI B2B startups;
- tech background (CS/DS), 14 years in software products;
- Seeking product leadership roles with an ideal opportunity being:
  - B2B SaaS company (particularly in workflow automation domains, incl. CRM, BizOps, etc.);
  - around $5-50M in revenue, key product leader (or 2-level product leader reporting into VP/CPO in larger orgs);
- Sweet spot challenges and topics:
  - enterprise B2B products;
  - agentic AI for enterprise (workflow automation, no-code app development);
  - platform products / ecosystems;
  - new products, product expansion;
  - scaling the B2B product org and processes;
  - GM-like roles;
  - efficient growth (aka "doing more with less").
```

**Rendering notes:**
- The top line is three hyperlinks (LinkedIn / CV / portfolio). Render as Markdown links so a modern email client converts them. In a plain-text-only context, fall back to bare URLs.
- Two-level bulleted list. Use `-` bullets with two-space indent for nesting (Markdown-standard). Gmail web, Outlook, and Apple Mail render this cleanly.
- The block sits in the **body** of the email - typically near the top or after the opening paragraph - **not** in the signature. The signature block (`Best regards, / Alex Orlov, / alexorlov.co | Linkedin`) still goes at the bottom.

## Decision rules: when to insert background

Default = **don't include the about-me.** The skill's existing rule ("Don't over-explain the user's background. Include a credential only where it directly supports the ask. The purpose must never get buried under the user's CV.") still wins. The blurbs are for the narrow set of cases where the recipient genuinely needs grounding.

| Scenario                                                          | Channel  | Use                                                              |
|-------------------------------------------------------------------|----------|------------------------------------------------------------------|
| Scheduling, follow-up, status check-in to existing contact        | any      | None                                                             |
| Cold LinkedIn DM to peer or recruiter (first message)             | LinkedIn | Short blurb if relevant; otherwise one in-line credential        |
| Network re-engagement on LinkedIn                                 | LinkedIn | Usually none; optional one-line self-update ("My updates: still actively looking ...") |
| Cold email to a senior decision-maker                             | Email    | Brief one-line credential in body; long blurb only if invited    |
| Recruiter asked for more context / wants to put forward           | Email    | Long blurb in the body                                           |
| Formal reference request to former colleague                      | Email    | None - the relationship is the credential                        |
| Live transactional one-liners                                     | any      | Never                                                            |

**Hard constraints:**
- Never produce both blurbs in the same message.
- Never auto-fire the long blurb on LinkedIn. It's email-only - LinkedIn doesn't render the Markdown bullets cleanly and the format itself reads off-channel.
- Never expand or rewrite the blurb content. If something is missing, flag it to the user rather than guessing.
