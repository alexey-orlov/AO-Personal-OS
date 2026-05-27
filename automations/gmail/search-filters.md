# Gmail search filters — canonical filter sets

Two named filter sets used in Gmail MCP `search_threads` queries across skills. Defined here so changes propagate to one place.

## `BASE_NOISE_FILTERS`

```
-category:promotions -category:social -category:updates
```

Excludes Gmail's auto-categorized noise tabs. Use on any inbox-wide query.

Used by: inbox-sweep (Step 1.2 — new unread scan).

## `STRICT_NOISE_FILTERS`

```
-from:noreply -from:no-reply -from:notifications -from:calendar-notification@google.com -category:promotions -category:social -category:updates
```

Superset of `BASE_NOISE_FILTERS`, additionally excludes auto-sender mail (noreply, calendar invitations, generic notifications). Use when looking up a specific human contact's prior thread, where calendar invites and noreply chatter would pollute the result.

Used by: draft-message (Step 3a), re-engagement-outreach (Step 6a.1).

## When to use which

- **Looking at the inbox at large** (e.g. new unread, recent activity) → `BASE_NOISE_FILTERS`.
- **Looking for a specific contact's human-to-human thread** → `STRICT_NOISE_FILTERS`. The `-from:calendar-notification@google.com` filter is the important one here — calendar-invite emails can look like a thread with the contact but contain no human exchange.
- **Deliberately searching calendar-invite emails as a fallback** (re-engagement-outreach Step 6a.3) → use NEITHER filter set; the calendar notifications are what you want.

## Adding a new filter

If a new category of noise consistently pollutes results across skills, add it to the appropriate set here and the callers automatically inherit it on next read. Keep the two sets minimal — over-filtering hides real threads. If a new filter is only relevant to one skill, leave it inline there; only promote to this file when ≥2 skills need it.

## Skills that use this

Citations should be one-line: `Apply [STRICT_NOISE_FILTERS](../../automations/gmail/search-filters.md#strict_noise_filters)` (or `BASE_NOISE_FILTERS`).

Current callers:
- `.claude/skills/inbox-sweep/SKILL.md` Step 1.2 — `BASE_NOISE_FILTERS`
- `.claude/skills/draft-message/SKILL.md` Step 3a — `STRICT_NOISE_FILTERS`
- `.claude/skills/re-engagement-outreach/SKILL.md` Step 6a.1 — `STRICT_NOISE_FILTERS`
