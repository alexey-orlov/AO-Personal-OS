# Y Combinator — See How Customers Actually Use Your Product

_source: youtube · channel: Y Combinator · published: 2026-07-09_
_video: https://www.youtube.com/watch?v=e5-6rEwzxLs_
_guests: —_
_captured: 2026-07-10 (Path A) · digest run 20260710T0404_

## Summary
The video teaches founders how to use per-user "dot plots" (a grid of days × users with dots for key events) to see real behavior patterns that aggregate metrics hide. The central argument is that dot plots reveal weekday/weekend segments, retention failures, feature-driven engagement, and at-risk contracts — insights you can't get from DAU or cohort curves alone — and they scale by sampling.

## Insights extracted (4)

- `pi-e5-6rEwzxLs-01` — **Dot plots expose user-level patterns hidden by aggregates** → theme [Product discovery & strategy](../../themes/product-discovery-and-strategy.md)
  - detail: Plot each user as a row and mark a dot for a meaningful daily event (e.g., "listen to a song"). Doing so surfaces clusters — weekday listeners vs weekend listeners, one-off trialers versus habitual users, and how individual feature use (search, playlists) correlates with sustained activity — that a DAU line would flatten into noise. The video shows a Spotify example and notes GitHub's contribution graph as a familiar implementation, arguing these visual patterns suggest product and marketing changes you would otherwise miss.
  - anchor: "we're going to put a dot." · t=183 · [▶ 3:03](https://www.youtube.com/watch?v=e5-6rEwzxLs&t=183)

- `pi-e5-6rEwzxLs-02` — **Dot plots can flag at-risk B2B contracts before churn** → theme [Product discovery & strategy](../../themes/product-discovery-and-strategy.md)
  - detail: In a concrete YC example a company sold a $80,000/year contract for 10 seats but only three seats ever activated; usage was sporadic and limited to ≤2 days/week. A dot plot of that account would have revealed the low penetration and weak engagement early, signaling the customer was at high risk (which later materialized when the internal champion left and the buyer chose not to renew). This shows dot plots aren't just for consumer apps — they surface renewal risk and seat adoption issues in enterprise deals.
  - anchor: "The company bought 10 seats, but only three seats ever activated." · t=675 · [▶ 11:15](https://www.youtube.com/watch?v=e5-6rEwzxLs&t=675)

- `pi-e5-6rEwzxLs-03` — **Chart the right event and use fine time granularity** → theme [Product discovery & strategy](../../themes/product-discovery-and-strategy.md)
  - detail: The most common mistake is plotting easy but meaningless events like "opened the app" or coarse bins like weeks; those hide whether value is created. Instead, choose events that represent real user value (listen to a song, shared a photo, joined a playlist) and use day or sub-day granularity so behavioral patterns and feature causality become visible. The speaker emphasizes that until you have hundreds of users, a dot plot can be your primary dashboard because it's just a parsed-log visualization.
  - anchor: "U the number one thing is to just chart the wrong event." · t=715 · [▶ 11:55](https://www.youtube.com/watch?v=e5-6rEwzxLs&t=715)

- `pi-e5-6rEwzxLs-04` — **Use dot plots alongside cohort retention curves, not instead** → theme [Product discovery & strategy](../../themes/product-discovery-and-strategy.md)
  - detail: Cohort retention curves tell you in aggregate whether groups of users stick over time, but they don't show how or why users behave day-to-day. Dot plots provide the qualitative color — where to probe, which features correlate with retention, and which user segments behave differently — so you can ask targeted questions, build the right features, and fix onboarding problems. The two tools together guide both measurement and investigation.
  - anchor: "These are best used in conjunction with cohort retention curves." · t=783 · [▶ 13:03](https://www.youtube.com/watch?v=e5-6rEwzxLs&t=783)

_Provenance archive — generated, never hand-edited. Theme pages are the curated view._
