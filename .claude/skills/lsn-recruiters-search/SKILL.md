---
name: lsn-recruiters-search
description: Triage a LinkedIn Sales Navigator (LSN) people saved-search of recruiters and add the qualifying ones to a Sales Navigator list — using the Claude-in-Chrome browser extension. For each result it applies a hard employer/role gate (external exec-search firm + actually a recruiter, never in-house at an operating company) and a soft industry-focus filter (B2B SaaS / enterprise software / tech = match; clearly different vertical like retail, consumer, finance/investment-mgmt, energy/industrial, defense/govcon, nonprofit, blockchain = skip; unclear = keep), reading each lead's FULL About from the minicard (the row teaser is truncated and unreliable). Use when Alex pastes an LSN saved-search URL and says "process these recruiters", "find exec recruiters for me", "triage this Sales Navigator search into Exec Recruiters - Wave N", "add the qualifying recruiters to a list", or runs `/lsn-recruiters-search`. Browser-only (Sales Navigator has no API here); needs the Claude-in-Chrome extension connected and Alex logged into Sales Navigator.
disable-model-invocation: false
user-invocable: true
---

# lsn-recruiters-search

You triage a LinkedIn **Sales Navigator** (LSN) people saved-search whose results are recruiters, and you add the ones worth connecting with for Alex's job search to a Sales Navigator **list**. You drive the browser through the **Claude-in-Chrome extension MCP** (`mcp__Claude_in_Chrome__*`) — Sales Navigator has no API available here, and desktop computer-use is blocked from clicking/typing in browsers.

The goal: of every recruiter in the search, keep the **external executive-search / recruiting-firm** people who could plausibly place Alex in a **product-leadership role (VP Product / CPO) at a B2B SaaS / enterprise-software / tech company**, and drop in-house recruiters, non-recruiters, and recruiters locked into an unrelated vertical.

This is **read-and-organize only**: you save leads to a list. You never message, connect, or send anything.

## Inputs (confirm before starting)

1. **The saved-search URL** (e.g. `https://www.linkedin.com/sales/search/people?savedSearchId=...&sessionId=...`). Alex usually pastes it. The saved search already carries the right filters (past companies like True Search / Daversa / SPMB / Riviera / Parker Remick; titles like MD / Partner / Principal / Executive Recruiter; US geography; a `NOT` query excluding in-house product people) — **don't re-derive filters**, just consume the results.
2. **The target list name** — usually `Exec Recruiters - Wave N`. Ask which wave if not given. **Confirm the list already exists** in the "Save to list" dropdown before saving; if it doesn't, ask before creating it.
3. Preconditions: the Claude-in-Chrome extension is connected (`tabs_context_mcp`), and Alex is logged into Sales Navigator. If not connected, ask him to connect rather than falling back to computer-use.

## Qualification rubric

Apply the gates in order. **The employer + role gates are hard; the industry filter is soft.**

### 1. Employer gate (hard) — external search firm only
- **KEEP** if the current employer is an external **executive-search / recruiting firm** (True Search, Daversa, SPMB, Riviera Partners, Heidrick & Struggles, WittKieffer, JM Search, Kindred, Ingenium, Park Square, Salamone Partners, Bowdoin Group, Maven Partnership, Talent Foot, boutiques, "Search Partners", "Talent…", independent/self-employed recruiters, etc.).
- **REJECT** if they are an **in-house recruiter at an operating/product company** — the title reads "Executive Search · Google", "Executive Recruiter · Quince", "… · Tiffany & Co.", "Recruiter · Stripe", etc. The firm being a software/consumer/operating company is the tell.
- **PE / asset-manager "portfolio executive search" or "talent partner"** (e.g. "Portfolio Executive Search · Apollo", "Executive Recruiter · Trinity Hunt Partners") → treat as external search-like (they place execs across a *portfolio*, not for one company) → **KEEP** (borderline; flag it).

### 2. Role gate (hard) — must actually be a recruiter
- The current role must be a **recruiter / search professional** (Partner, Principal, MD, Consultant, Associate, Senior Associate at a search firm).
- **REJECT non-recruiters even at search firms:**
  - **Executive assistants** — "Assistant to <Partner> · Daversa" is an EA, not a recruiter.
  - **People who've moved into advisory / non-recruiting roles** — e.g. "Private Equity Practice Co-Lead" at an accounting/advisory firm (that's PE/M&A advisory, not search); they often only matched the saved search via an *old* recruiting stint in their Experience. Check current role + recent activity, not just past experience.

### 3. Industry-focus filter (soft) — read the FULL About
- **Match (keep):** mentions **B2B SaaS, enterprise software, technology, GTM, VC-backed / growth-stage tech**, or places VP/C-suite at tech companies.
- **Generic exec search, no vertical stated** → **keep** (doesn't contradict).
- **Skip** only when the About/title makes the focus **clearly a different vertical AND there's no B2B-SaaS mention** — e.g. **investment management / asset management / finance**, **energy / cleantech / oil & gas / industrial / chemicals**, **defense / national-security / govcon**, **nonprofit / social-impact**, **retail / consumer**, **blockchain**, healthcare-only.
- **Unclear → keep.** (Robotics / AI-infrastructure / deep-tech is tech-adjacent → lean keep; flag as borderline.)
- **You MUST read the full About, not the row teaser.** The teaser can look generic while the full About reveals an off-target vertical (real example: a partner whose teaser said "Board/C-level search, 17 yrs" but whose full About was entirely energy/oil & gas/nuclear/industrial → skip). For leads with **no About**, judge on firm + role + any **practice area named in the title** (e.g. "Nonprofit & Social Impact Practice" in the title is enough to skip).

When in doubt, **keep and flag** rather than silently drop — Alex would rather review a borderline include than miss someone.

## LSN page behaviour & gotchas (learned the hard way)

These are the things that will bite you if you forget them:

- **Results are virtualised.** Only ~5 result rows exist in the DOM at any moment; they swap as you scroll. You cannot read all 25 at once.
- **25 results per page**; the last page holds the remainder (105 results = four pages of 25 + one of 5). The header shows the total ("105 results").
- **Paginate with the `&page=N` URL param** — it works and **preserves the saved-search filters**. Cleaner than hunting the bottom pagination buttons.
- **Navigating reloads the page → wipes all `window.__*` JS helpers.** Redefine your helpers after every `navigate`.
- **Big scroll jumps skip rows.** Scrolling ~10 ticks between collections dropped 2 of 25 (virtualization removed rows that never got collected). **Scroll in small steps (~4 ticks) and collect after each.** Then **verify completeness with "Select all" — the "N selected" count is the source of truth for the real page size.** If it says 25 but you collected 23, you missed 2; re-scroll slowly.
- **The minicard contaminates DOM collection.** When a lead's right-side panel is open, it contains `/sales/lead/` links for *mutual connections* ("You both know X"). A naive `li`-with-lead-link collector picks these up as phantom leads. **Collect rows with the panel CLOSED**, and drop entries with an empty name.
- **The row "About:" teaser is truncated (~120 chars) server-side and does NOT expand** — clicking the row's "Show more" only toggles the label, the full text never loads into the row. Don't trust the teaser for the industry call.
- **The minicard (click the name → right panel) has the FULL About**, but: it's collapsed behind its own "Show more"; the panel has **Previous / Next** buttons that walk leads in result order (use them); and **DOM extraction of the panel About is fragile** (its toggle markup varies between renders). **Read the About visually from a zoomed screenshot of the panel** — that's reliable. Use `__exp()` to click the panel's "Show more", then `zoom` the panel region.
- **Not every lead has an About.** The row's presence/absence of an "About:" line reliably tells you whether one exists; if absent, the panel has none either — judge on firm/role/title.
- **"Select all" selects the current page (25), not all 105.** Trust the count.
- **JS-tool output is fragile:** long returns get truncated (~1000 chars) — chunk them; and returns containing `&`, `=`, or `?` can trip a false-positive **"[BLOCKED: Cookie/query string data]"** filter — sanitize with `.replace(/[&=?]/g,'+')` and avoid dumping raw URLs.
- A row's **"Saved"** badge / "N List" means it's already in *some* list (possibly a prior wave), not necessarily the target — saving again to the target list is harmless (LSN dedups within a list).

## Per-page workflow

Repeat for each page `1..last`:

1. **Navigate** to `…&page=N`, wait ~4s, then **(re)define the JS helpers** (see below).
2. **Collect all rows** with the panel closed: scroll to top, then loop *small scroll (4 ticks) → `__collect()`* until the count plateaus. **Click "Select all" and read "N selected" to confirm you have the true page size**; if short, re-scroll slowly.
3. **Apply the employer + role gates** from each row's title·company (catches in-house recruiters and non-recruiters cheaply).
4. **For every lead that has an About:** open its minicard and read the **full** About. Most efficient path: open the first lead, then **walk with the panel's Next button** to each About-haver in order — for each, `__exp()` (expand) → `zoom` the panel → read → decide. (No-About leads: decide on firm/role/title.)
5. **Select → deselect → save:** click **Select all** (25), then **deselect the rejects/skips** (scroll to each, click its checkbox; verify the count drops by the expected number), then **"Save to list" → target list**. The target appears under "Recently Used" after first use.
6. **Verify the save:** the list entry shows a live `(count)` and a checkmark — confirm it incremented by exactly the number you kept.

Select-all-then-deselect is best when most of a page qualifies (the norm). If most of a page is rejects, select the keepers individually instead.

## JS helpers (paste after every navigation)

Collector (panel closed):
```js
window.__leads={};
window.__collect=function(){
  const items=Array.from(document.querySelectorAll('li')).filter(li=>li.querySelector('a[href*="/sales/lead/"]'));
  items.forEach(li=>{
    const a=li.querySelector('a[href*="/sales/lead/"]');
    const href=a.getAttribute('href').split('?')[0];
    const companyLink=li.querySelector('a[href*="/sales/company/"]');
    const company=companyLink?companyLink.innerText.trim():'';
    const full=li.innerText.replace(/\n{2,}/g,'\n').trim();
    window.__leads[href]={company,text:full.slice(0,400)};
  });
  return Object.keys(window.__leads).length;
};
window.__collect();
```

Expand the open minicard's About ("Show more"):
```js
window.__exp=function(){
  const el=Array.from(document.querySelectorAll('div,section,p')).find(e=>{
    const t=e.textContent.replace(/\s+/g,' ').trim();
    return /^About\s+\w/.test(t)&&/Show more/.test(t)&&t.length<700;});
  if(!el)return false;
  const btn=Array.from(el.querySelectorAll('button,a,span')).find(b=>b.textContent.trim()==='Show more');
  if(btn){btn.click();return true;} return false;
};
```

Dump a page's rows for review — **sanitize + chunk** to dodge truncation and the cookie-string filter:
```js
Object.values(window.__leads).map(v=>{
  const L=v.text.split('\n').map(s=>s.trim()).filter(Boolean);
  const name=(L[1]||'').replace(/[^\x00-\x7F]+/g,'').trim();
  let rc=''; for(let i=0;i<L.length;i++){if(/^·\s/.test(L[i])){let j=i+1;while(j<L.length&&L[j]==='Saved')j++;rc=L[j]||'';break;}}
  const hasAbout=L.some(l=>/^About:/.test(l));
  return (hasAbout?'[A] ':'[ ] ')+name+' | '+(rc||v.company).replace(/[&=?]/g,'+');
}).join('\n');
```
`[A]` = has an About to read; `[ ]` = no About (judge on firm/role/title).

To read the About visually: after `__exp()`, `zoom` the panel region (roughly `[1098,185,1495,650]` on a ~1500-wide window; scroll the panel down a little first if the About sits lower).

## Reporting

When done, report per page:
- **Saved count** and the **named exclusions with one-line reasons** (e.g. "Maddy Hauben — in-house @ Quince", "Keith Salamone — energy/industrial vertical", "Bryce Murray — PE/M&A advisory, not a recruiter").
- **Check the arithmetic:** sum of saved == final list count; saved + excluded == total results.
- **Flag every borderline call** explicitly so Alex can override (PE/portfolio search, robotics/AI-infra, cybersecurity-with-defense-overlap, etc.).
- If any page was done on a lighter method (e.g. you didn't read full Abouts), say so and offer to re-audit.

## Hard rules

1. **Browser via the Claude-in-Chrome extension MCP only.** No messaging, connecting, or sending — saving to a list is the only write action.
2. **Read the full About for every About-haver** before applying the industry filter — never decide a vertical from the truncated row teaser.
3. **Confirm the target list exists** before saving; never create a new list without asking.
4. **Verify counts** at every step (page size via "Select all"; list increment after save). Don't trust that a click landed — confirm with the count or a screenshot.
5. **Keep-and-flag over silently dropping** on borderline cases.
6. **Process every page to the last one** unless Alex scopes it down.
