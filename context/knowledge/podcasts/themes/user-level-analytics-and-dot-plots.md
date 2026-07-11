# User-level analytics & dot plots

_status: live theme — visualizing individual user/account behavior (dot plots, event-level granularity) to surface patterns aggregate metrics hide_
_slug: user-level-analytics-and-dot-plots_
_updated: 2026-07-11 · 4 insights from 1 episode · (split from product-discovery-and-strategy, 2026-07-11)_

## The throughline
Plotting each user or account as a row with a dot per meaningful event exposes clusters — weekday vs. weekend usage, one-off trialers vs. habitual users, at-risk enterprise seats — that DAU lines and cohort retention curves flatten into noise. The discipline has two rules: chart an event that represents real value (not "opened the app"), at day or sub-day granularity; and use dot plots alongside cohort curves, not instead — cohorts tell you whether groups stick, dot plots tell you why and where to probe. The method generalizes past consumer products to B2B: an $80K/year, 10-seat contract with only 3 seats ever active would have shown its renewal risk in a dot plot months before the champion left and the deal didn't renew.

## Insights

### Dot plots expose user-level patterns hidden by aggregates
Plot each user as a row and mark a dot for a meaningful daily event (e.g., "listen to a song"). Doing so surfaces clusters — weekday listeners vs weekend listeners, one-off trialers versus habitual users, and how individual feature use (search, playlists) correlates with sustained activity — that a DAU line would flatten into noise. The video shows a Spotify example and notes GitHub's contribution graph as a familiar implementation, arguing these visual patterns suggest product and marketing changes you would otherwise miss.
— Y Combinator · 2026-07-09 · guest: — · [▶ 3:03](https://www.youtube.com/watch?v=e5-6rEwzxLs&t=183) · `pi-e5-6rEwzxLs-01`

### Dot plots can flag at-risk B2B contracts before churn
In a concrete YC example a company sold a $80,000/year contract for 10 seats but only three seats ever activated; usage was sporadic and limited to ≤2 days/week. A dot plot of that account would have revealed the low penetration and weak engagement early, signaling the customer was at high risk (which later materialized when the internal champion left and the buyer chose not to renew). This shows dot plots aren't just for consumer apps — they surface renewal risk and seat adoption issues in enterprise deals.
— Y Combinator · 2026-07-09 · guest: — · [▶ 11:15](https://www.youtube.com/watch?v=e5-6rEwzxLs&t=675) · `pi-e5-6rEwzxLs-02`
related: theme → [Product discovery & strategy](product-discovery-and-strategy.md) (validate depth by whether you could run the customer's business — both: granular, ground-level observation surfaces risk/depth that summary metrics or conversations alone miss)

### Chart the right event and use fine time granularity
The most common mistake is plotting easy but meaningless events like "opened the app" or coarse bins like weeks; those hide whether value is created. Instead, choose events that represent real user value (listen to a song, shared a photo, joined a playlist) and use day or sub-day granularity so behavioral patterns and feature causality become visible. The speaker emphasizes that until you have hundreds of users, a dot plot can be your primary dashboard because it's just a parsed-log visualization.
— Y Combinator · 2026-07-09 · guest: — · [▶ 11:55](https://www.youtube.com/watch?v=e5-6rEwzxLs&t=715) · `pi-e5-6rEwzxLs-03`

### Use dot plots alongside cohort retention curves, not instead
Cohort retention curves tell you in aggregate whether groups of users stick over time, but they don't show how or why users behave day-to-day. Dot plots provide the qualitative color — where to probe, which features correlate with retention, and which user segments behave differently — so you can ask targeted questions, build the right features, and fix onboarding problems. The two tools together guide both measurement and investigation.
— Y Combinator · 2026-07-09 · guest: — · [▶ 13:03](https://www.youtube.com/watch?v=e5-6rEwzxLs&t=783) · `pi-e5-6rEwzxLs-04`
related: theme → [Product discovery & strategy](product-discovery-and-strategy.md) (Pincus's ASN metric is an aggregate retention signal; dot plots are the day-to-day qualitative complement to it)

## Related themes
- [Product discovery & strategy](product-discovery-and-strategy.md) — parent theme; the broader discovery-discipline this measurement method serves

## Source episodes
- [Y Combinator — See How Customers Actually Use Your Product (2026-07-09)](../episodes/2026/2026-07-09--yc--see-how-customers-actually-use-your-product.md)
