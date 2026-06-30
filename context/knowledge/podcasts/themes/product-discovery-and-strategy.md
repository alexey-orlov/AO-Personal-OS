# Product discovery & strategy

_status: live theme — discovery, prioritization, roadmap, positioning, product strategy_
_slug: product-discovery-and-strategy_
_updated: 2026-06-30 · 23 insights from 14 episodes_

## The throughline
The strategy conversation organizes around three beats. (1) Discovery discipline: the fastest signal is money — demand WTP before building, because most "ChatGPT ideas" are fake problems; category-creating 1.0s need a 'benevolent dictatorship of taste' instead (Fadell/Jobs). Consumer discovery runs on a complementary protocol: copy proven UX patterns first before adding novelty (Pincus's Proven/Better/New — fake onboarding killed Sid Meier's Facebook Civ), 'kill hope before hope kills you' by building intentionally cheap/wrong prototypes for fast signal, and track day-365 retention + social loops as the north star rather than short viral spikes (Zynga's ASN metric: 0→1 gives ~80% return next month; ASN 4 → active 22/30 days). (2) Moats: feature differentiation has gone short-lived (AI writes ~80%+ of code in AI-native orgs, so feature gaps close in weeks), and what remains durable is proprietary inputs/outputs, enterprise workflows, user behavior, network effects, hardware, compliance, and brand. Legora's bundled multi-feature roadmap beating a single-feature competitor with 50× the early ARR is the operational lesson — longer-horizon platform bets compound where point solutions get cloned. (3) Shape the whole system, not just the feature: products are ecosystems (installation, distribution, marketing language — Fadell's iPod/Nest cases), the chatbot isn't a product (Evans: real work needs tooling/domain data/UIs, so vertical apps and consultancies capture the value above commoditized models), and AI-first builders should *refound* boundaries rather than tack models onto legacy flows — minimize customer-facing surface area, concentrate one core interaction (Brex/Pedro, Stripe/Airbnb analogies). A Groww-pattern complements beat (1): full product transparency (every option, frictionless choice) tripled expected signups on launch day and triggered organic PMF; a deliberate four-year 'zero revenue' phase deepened customer love until monetization was the natural next step — the counter-case to charge-early when consumer trust is the scarce resource. Ambrosino (OpenAI Codex) adds a fourth beat: model capability timing can flip PMF — the same product shape that failed in November 2025 succeeded in February 2026 after months of model progress; teams should preserve ambitious artifacts rather than discarding them as failures, keep long-range plans fuzzy enough to capitalize on future capability leaps, and choose artifact type by the question being resolved (documents for fuzzy strategy, prototypes for interaction assumptions — abundant prototypes can falsely signal readiness if they haven't derisked the core assumptions).

## Insights

### Charge customers early — get commitments before building
They learned the hard way that many ideas are 'fake problems' unless someone will pay for the solution, so they now require a payment commitment or a clear signal of willingness to pay before building. The founder emphasizes it's not about cool ideas from ChatGPT; it's about validating customer willingness to exchange money (or time) for value. This discipline reduces wasted engineering and ensures product work targets real commercial demand.
— Y Combinator · 2026-05-30 · guest: — · [▶ 15:30](https://www.youtube.com/watch?v=2Ap1dnv-GXA&t=930) · `pi-2Ap1dnv-GXA-06`
related: theme → [Founders & fundraising](founders-and-fundraising.md) (pivot mechanics)

### A bundled, multi-feature product roadmap beat single-feature specialists over time
Legora deliberately focused on being best in three integrated areas — an assistant/agent, tabular review, and a Word add-in — rather than optimizing one point-solution. Early on a competitor focused on tabular review was doing ~50x the company's revenue, but by holding a longer horizon and bundling complementary capabilities Legora ultimately surpassed them, illustrating a strategic trade-off between short-term ARR and long-term platform defensibility.
— Y Combinator · 2026-06-06 · guest: — · [▶ 14:50](https://www.youtube.com/watch?v=mjmswQurIU4&t=890) · `pi-mjmswQurIU4-03`

### Long-term defensibility depends on proprietary data, workflows, and user behavior — not just model parity
Rather than fretting that OpenAI/Anthropic will copy them, Legora frames the core question as what remains defensible as models improve: proprietary inputs/outputs, enterprise workflows, and the behaviors taught to users. The founder cites analogies like MongoDB vs AWS and stresses building around unique data access and workflow hooks (e.g., matter context, firm templates) that large general-model players are less likely to replicate quickly.
— Y Combinator · 2026-06-06 · guest: — · [▶ 22:04](https://www.youtube.com/watch?v=mjmswQurIU4&t=1324) · `pi-mjmswQurIU4-05`
related: [Durable moats are data, network effects, hardware, compliance, and brand](#durable-moats-are-data-network-effects-hardware-compliance-and-brand) · theme → [AI agents & applications](ai-agents-and-applications.md) (proprietary context differentiates agents)

### Feature differentiation is a short-lived moat
Because AI and "vibe coding" make it fast and cheap for anyone to generate working features, feature gaps close in weeks or months instead of years. Verna says AI now writes the bulk of code in AI-native orgs (she cites ~80%+), so product teams that rely solely on novel features will be copied quickly and cannot depend on that as a predictable long-term growth strategy.
— SaaStr AI · 2026-06-06 · guest: Elena Verna · [▶ 7:13](https://www.youtube.com/watch?v=kdHU-jPxDHw&t=433) · `pi-kdHU-jPxDHw-01`

### Durable moats are data, network effects, hardware, compliance, and brand
Verna identifies the long-lasting defenses that still matter: hardware (hard to replicate), network effects (hard to build but self-reinforcing), customer data, and security/compliance requirements. These require heavy investment or unique assets that AI alone won't commoditize, so companies should prioritize those areas when planning defensibility and go-to-market.
— SaaStr AI · 2026-06-06 · guest: Elena Verna · [▶ 8:45](https://www.youtube.com/watch?v=kdHU-jPxDHw&t=525) · `pi-kdHU-jPxDHw-02`
related: [Long-term defensibility depends on proprietary data, workflows, and user behavior — not just model parity](#long-term-defensibility-depends-on-proprietary-data-workflows-and-user-behavior--not-just-model-parity)

### Innovative 1.0s require opinion-led decision makers with 'taste'
When you build a first-of-its-kind product you often lack clear data and must rely on a small set of experienced decision-makers to choose the direction. Fadell describes how Apple tested virtual vs hardware keyboards and concluded via informed experiments and leadership opinion (Steve Jobs) that a sufficiently good virtual keyboard would win — the point is you need a benevolent dictatorship of taste to push through risky, opinion-based choices. This matters because relying only on data or committees kills differentiation for category-creating products.
— Lenny's Podcast · 2026-06-08 · guest: Tony Fadell · [▶ 8:42](https://www.youtube.com/watch?v=RJjl1TwyfWM&t=522) · `pi-RJjl1TwyfWM-01`
related: [Charge customers early — get commitments before building](#charge-customers-early--get-commitments-before-building) (the inverse case: when data is thin, taste outranks signal-hunting) · theme → [Leadership, careers & teams](leadership-careers-and-teams.md) (micromanaging the right details)

### A product is a system; marketing and distribution matter equally
Fadell repeatedly argues that successful products are not single devices but ecosystems: installation, sales channels, marketing language, and supporting services all shape adoption. He uses iPod (Windows support and iTunes store) and Nest (installation and sensor context for AI) to show that the hardware alone wouldn't have changed markets without rethinking purchase, install and messaging. The implication is that early teams should 'work backwards' (press release first) to design the whole customer journey, not just the engineering.
— Lenny's Podcast · 2026-06-08 · guest: Tony Fadell · [▶ 25:36](https://www.youtube.com/watch?v=RJjl1TwyfWM&t=1536) · `pi-RJjl1TwyfWM-03`
related: [Minimize surface area — design AI-first products by refounding boundaries](#minimize-surface-area--design-ai-first-products-by-refounding-boundaries) (same instinct, AI-era framing)

### The chatbot is a poor end-product; value will sit in vertical apps
Evans says 'I don't think a chatbot is a product' because most real-world tasks need tooling, configuration, domain data, and tailored UIs that models alone don't provide. He reasons that companies buying software will prioritize integrated workflows, guardrails, and industry-specific functionality — the same way Windows/iOS gave rise to thousands of apps — so the economic rents are more likely to accrue to specialized apps, consultancies, and services that package models into reliable business outcomes. That creates opportunity for vertical AI startups and consultancies to capture value by translating domain expertise into productized workflows.
— a16z · 2026-06-11 · guest: Benedict Evans · [▶ 16:33](https://www.youtube.com/watch?v=ktl8mNiWqMM&t=993) · `pi-ktl8mNiWqMM-04`
related: [Long-term defensibility depends on proprietary data, workflows, and user behavior — not just model parity](#long-term-defensibility-depends-on-proprietary-data-workflows-and-user-behavior--not-just-model-parity) · theme → [Growth, GTM & pricing](growth-gtm-and-pricing.md) (Evans's commodity-foundation-models claim, `pi-BD3vLtWhT5A-03` + `pi-ktl8mNiWqMM-01`, is the parent framing) · theme → [Leadership, careers & teams](leadership-careers-and-teams.md) (top AI labs are buying consultancies, not firing them)

### Minimize surface area — design AI-first products by refounding boundaries
Pedro urges keeping customer-facing interactions minimal and concentrating founder bandwidth on one core interaction (Stripe/Brex/early Airbnb examples) rather than sprawling UIs. He contrasts merely layering AI onto old flows with rethinking flows end-to-end (e.g., redesigning KYC so you can KYC leads upstream), which changes who you target and what the product even is.
— Y Combinator · 2026-06-11 · guest: Pedro (Brex) · [▶ 18:47](https://www.youtube.com/watch?v=mPAHvz8kW24&t=1127) · `pi-mPAHvz8kW24-05`
related: [A product is a system; marketing and distribution matter equally](#a-product-is-a-system-marketing-and-distribution-matter-equally) · theme → [Leadership, careers & teams](leadership-careers-and-teams.md) (CEO as chief AI officer)

### Ship fast, learn, and kill bad ideas quickly — don't iterate for years
Meesho's first product targeted local fashion — it was built, tested on hundreds of users, and shut down in three months when consumer feedback showed it was worse than a mall or e‑commerce. That ruthless short cycle meant the founders avoided wasting years on a dead end and redirected resources toward better hypotheses; the habit of rapid shutdowns shaped every subsequent pivot.
— Y Combinator · 2026-06-11 · guest: Vidit Aatrey (Meesho) · [▶ 7:44](https://www.youtube.com/watch?v=49L8lVe_PVo&t=464) · `pi-49L8lVe_PVo-01`
related: [Charge customers early — get commitments before building](#charge-customers-early--get-commitments-before-building) (the same validation discipline, demand-side vs. speed-side)

### Find and serve the power users — the online‑native resellers — to discover product‑market fit
When broad small retailers wouldn't pay for software, Meesho identified a subset of active users — online‑native drop shippers/resellers who used WhatsApp daily — and built Misho Supply to give them reliable suppliers. That focus produced true PMF: zero marketing spend, month‑over‑month doubling, intense daily retention (users opening the app 15–20 times a day), and rapid organic growth.
— Y Combinator · 2026-06-11 · guest: Vidit Aatrey (Meesho) · [▶ 12:26](https://www.youtube.com/watch?v=49L8lVe_PVo&t=746) · `pi-49L8lVe_PVo-03`

### When the environment shifts, you must fully commit to a new direction, not experiment tentatively
When India's data costs collapsed and the pandemic accelerated app adoption, Meesho decided to move from enabling resellers to a direct consumer app; the founders argued a half‑measure would alienate resellers and fail to win consumers. They launched a consumer app in July 2021, hit #1 in Play Store shopping and reached ~100 million consumers within five months — evidence that committed, large bets can win when fundamentals change.
— Y Combinator · 2026-06-11 · guest: Vidit Aatrey (Meesho) · [▶ 18:55](https://www.youtube.com/watch?v=49L8lVe_PVo&t=1135) · `pi-49L8lVe_PVo-04`
related: [Minimize surface area — design AI-first products by refounding boundaries](#minimize-surface-area--design-ai-first-products-by-refounding-boundaries) (same instinct at different altitude: committed full-pivot vs. AI-era boundary refounding)

### Successful products start by copying proven patterns, then add polish and novelty
Pincus's "Proven, Better, New" rule says build on best‑of‑breed, copy proven UX and mechanics first, then make small, undeniably better improvements, and finally layer on one experimental new hook. He argues founders should be 'PhD' level students of the proven patterns (e.g., mobile onboarding) because great innovation dies if users never reach it—Sid Meier's Facebook Civ failed from a poor first‑time experience—while Words with Friends combined proven Scrabble mechanics, mobile polish, and a social graph twist to hit 14M DAU.
— Lenny's Podcast · 2026-06-14 · guest: Mark Pincus (Zynga) · [▶ 4:50](https://www.youtube.com/watch?v=7eh9C3TUotc&t=290) · `pi-7eh9C3TUotc-01`
— also: Y Combinator · 2026-06-25 · guest: Mark Pincus (Zynga) · [▶ 9:58](https://www.youtube.com/watch?v=oHwUD9b9_pg&t=598) · `pi-oHwUD9b9_pg-02` (applied to AI note-taking: legally copy proven parts, make 'better' undeniable by testing until 10/10 users agree, treat the always-listening 'new' hook as a hypothesis expected to fail often — same framework, new product domain)
related: [Innovative 1.0s require opinion-led decision makers with 'taste'](#innovative-10s-require-opinion-led-decision-makers-with-taste) (complementary: Pincus copies proven; Fadell invents where no proof exists) · [Kill hope: test many cheap ideas instead of one hopeful bet](#kill-hope-test-many-cheap-ideas-instead-of-one-hopeful-bet)

### Kill hope: test many cheap ideas instead of one hopeful bet
Rather than persisting on optimistic releases, Pincus urges teams to 'kill hope before hope kills you'—trade beliefless hope for rapid experiments and decisive shut‑downs. He recommends building intentionally 'wrong' and cheap prototypes to get signal fast, using AI as a failure‑machine to test many variants, and cites a FarmVille example where in‑game preorders/test placements (not external ads) produced both product insight and $19M in early key sales.
— Lenny's Podcast · 2026-06-14 · guest: Mark Pincus (Zynga) · [▶ 33:43](https://www.youtube.com/watch?v=7eh9C3TUotc&t=2023) · `pi-7eh9C3TUotc-02`
related: [Ship fast, learn, and kill bad ideas quickly — don't iterate for years](#ship-fast-learn-and-kill-bad-ideas-quickly--dont-iterate-for-years) (same kill-fast discipline, B2B pivot vs. consumer prototype) · [Charge customers early — get commitments before building](#charge-customers-early--get-commitments-before-building) (complementary validation mechanic)

### Long‑term retention (day‑365) and social loops predict durable success
Pincus insists durable consumer products are defined by deep retention, not short viral spikes: Zynga uniquely tracked day‑365 retention and designed toward it. He also invented an ASN (active social network) metric showing strong predictive power—moving a user from 0→1 ASN gave ~80% chance of return next month, and at ASN 4 you saw users 22 of the next 30 days—demonstrating that small social reciprocity loops create habitual engagement.
— Lenny's Podcast · 2026-06-14 · guest: Mark Pincus (Zynga) · [▶ 46:35](https://www.youtube.com/watch?v=7eh9C3TUotc&t=2795) · `pi-7eh9C3TUotc-03`
related: [Find and serve the power users — the online‑native resellers — to discover product‑market fit](#find-and-serve-the-power-users--the-online-native-resellers--to-discover-product-market-fit) (both: design toward deep behavioral engagement, not growth-hacking)

### Opening the platform with full transparency created rapid product-market fit
Groww began as a robo-advisor that failed, then pivoted to showing customers every product with clear choice and frictionless onboarding. After launching the transparent, choice-first product in May 2017 they expected ~100 customers but got 600 in the first month, signaling strong PMF through organic uptake and high NPS. The lesson: revealing product options and why they matter can convert vocal customer curiosity into word-of-mouth growth.
— Y Combinator · 2026-06-15 · guest: La Kishray (Groww) · [▶ 5:09](https://www.youtube.com/watch?v=ObBAxL2dFzw&t=309) · `pi-ObBAxL2dFzw-01`
related: [Find and serve the power users — the online‑native resellers — to discover product‑market fit](#find-and-serve-the-power-users--the-online-native-resellers--to-discover-product-market-fit) (both: a clear focus on a specific user need unlocks organic growth)

### Prioritize customer love and organic growth over early monetization
The team deliberately accepted monetization uncertainty: for the first four years Groww operated effectively as a 'zero revenue company' while driving down CAC, increasing retention and engagement. That customer-first traction (high retention, word-of-mouth) later made monetization easier — adding stocks and direct mutual funds unlocked sustainable revenue. The non-obvious point: earning deep customer love can be a safer long-term bet than squeezing early fees.
— Y Combinator · 2026-06-15 · guest: La Kishray (Groww) · [▶ 15:38](https://www.youtube.com/watch?v=ObBAxL2dFzw&t=938) · `pi-ObBAxL2dFzw-02`
related: [Charge customers early — get commitments before building](#charge-customers-early--get-commitments-before-building) (complementary tension: charge early for B2B validation; invest in love first for consumer trust) · [Long‑term retention (day‑365) and social loops predict durable success](#long-term-retention-day-365-and-social-loops-predict-durable-success)

### Founders must be power users and talk directly to customers
The founders personally used the app daily, created WhatsApp groups, engaged on forums like Kora and even approached people in movie theaters to get signals beyond the first 20 users. They put each new signup into a personal WhatsApp group to stay accessible, read between the lines of requests, and iterate features that actually mattered. That hands-on customer work produced the buzz, retention and product improvements that sustained organic growth.
— Y Combinator · 2026-06-15 · guest: La Kishray (Groww) · [▶ 10:27](https://www.youtube.com/watch?v=ObBAxL2dFzw&t=627) · `pi-ObBAxL2dFzw-03`
related: [Find and serve the power users — the online‑native resellers — to discover product‑market fit](#find-and-serve-the-power-users--the-online-native-resellers--to-discover-product-market-fit) (both: granular personal customer contact is the discovery method)

### Validate depth by whether you could run the customer's business
The best test of product-market understanding is practical: could you operate the customer's business tomorrow and handle its daily crises? John uses the example of voice agents for cleaning services — it's not enough to have 20 conversations; you must know if answering the phone is a top problem, how much revenue is lost to missed calls, and what customers would actually pay to fix it. Reach that level by combining customer conversations with doing the work yourself and iterating product and learning in a tight loop.
— Y Combinator · 2026-06-17 · guest: — · [▶ 4:43](https://www.youtube.com/watch?v=R56RJFZBasQ&t=283) · `pi-R56RJFZBasQ-03`
related: [Founders must be power users and talk directly to customers](#founders-must-be-power-users-and-talk-directly-to-customers) (Groww's WhatsApp groups and theater outreach is the same hands-on instinct — this insight gives the test to know when you've gone deep enough) · [Charge customers early — get commitments before building](#charge-customers-early--get-commitments-before-building) (complementary heuristics: WTP validates the problem exists; running-their-business validates you understand it deeply enough to solve it)

### Optimizing models for engagement drives addictive, metric‑hacking behavior
Many models and product teams optimize for engagement metrics (session length, minutes used, flashy leaderboard wins), which creates pressure for models to keep users talking rather than to finish tasks efficiently or uplift humans. Examples include chatbots ending turns with clickbait-style hooks ("one weird trick") and models learning to output flashy metaphors to score better on lightweight human leaderboards; those incentives produce worse real-world utility. The implication is that product objectives matter: engagement optimization can turn helpful assistants into attention traps unless companies explicitly choose different goals.
— Every · 2026-06-24 · guest: Edwin · [▶ 15:52](https://www.youtube.com/watch?v=omX6wrLuX08&t=952) · `pi-omX6wrLuX08-02`
related: [Feature differentiation is dead; stickiness and workflows drive retention](#feature-differentiation-is-dead-stickiness-and-workflows-drive-retention) (complementary tension — engagement-driven design and workflow-lock are different product bets; this insight warns that the former produces attention traps while the latter drives durable retention) · theme → [AI agents & applications](ai-agents-and-applications.md) (delegation-vs.-engagement framing maps to the autonomy/tool-use patterns in that cluster)

### Prototypes don't replace documents; choose medium to fit uncertainty
Ambrosino rejects the binary claim that "PRDs are dead" and argues the right artifact depends on the question: use documents to clarify fuzzy strategy or product intent, and prototypes to stress-test interaction and implementation assumptions. He warns that abundant prototypes can falsely signal readiness—teams may over-anchor to a polished-looking prototype that hasn't derisked the right assumptions. Picking the correct medium prevents premature decisions and better guides downstream work.
— Lenny's Podcast · 2026-06-28 · guest: Andrew Ambrosino (OpenAI) · [▶ 7:11](https://www.youtube.com/watch?v=P3KDebPTUrw&t=431) · `pi-P3KDebPTUrw-02`
related: theme → [AI & the PM craft](ai-and-the-pm-craft.md) — [Prototypes are replacing PRDs as the primary communication artifact](ai-and-the-pm-craft.md#prototypes-are-replacing-prds-as-the-primary-communication-artifact) (that insight reports the prototype-wins trend; this one is the pushback — both are true depending on the question being resolved)

### Model timing can flip product–market fit; build artifacts to revisit later
Ambrosino recounts that the Codex app released in February succeeded where the same shape would have failed in November—mere months of model progress changed outcomes dramatically. His team intentionally prototypes and preserves features that aren't yet successful so they can be re-evaluated when models improve, rather than discarding them as failures. Practically, this means long-range plans must stay fuzzy and teams should keep ambitious artifacts alive to capitalize on future capability leaps.
— Lenny's Podcast · 2026-06-28 · guest: Andrew Ambrosino (OpenAI) · [▶ 33:38](https://www.youtube.com/watch?v=P3KDebPTUrw&t=2018) · `pi-P3KDebPTUrw-05`
related: [Kill hope: test many cheap ideas instead of one hopeful bet](#kill-hope-test-many-cheap-ideas-instead-of-one-hopeful-bet) (Pincus: kill bad experiments fast; Ambrosino: don't kill experiments that hit a capability wall — the difference is whether the constraint is product-market fit or model capability)

### Building and discarding production PRs is now an affordable experimentation loop
Gusto's team routinely opened full PRs as experiments and discarded or rebuilt them when ideas didn't pan out — including trashing a working prototype to rebuild in TypeScript + Cloudflare Workers. Eddie's framing: "The cost to write code is now so low" that higher-risk, higher-reward bets become affordable because the failure cost is a few hours, not months. That cheap iterative cycle at production quality (not toy prototypes) shortens validation loops for B2B product teams.
— How I AI · 2026-06-29 · guest: Eddie (CTO, Gusto) · [▶ 14:38](https://www.youtube.com/watch?v=5FKBkUCaLa8&t=878) · `pi-5FKBkUCaLa8-02`
related: [Kill hope: test many cheap ideas instead of one hopeful bet](#kill-hope-test-many-cheap-ideas-instead-of-one-hopeful-bet) (Pincus: intentionally wrong/cheap consumer prototypes; Gusto: production-quality PRs as experiments — same kill-fast discipline, different artifact tier) · [Model timing can flip product–market fit; build artifacts to revisit later](#model-timing-can-flip-productmarket-fit-build-artifacts-to-revisit-later) (Ambrosino: preserve artifacts that hit a capability wall; Gusto: trash experiments that hit a product wall — complementary discard strategies)

## Related themes
- [Founders & fundraising](founders-and-fundraising.md) — pivot decisions are how the discipline shows up at company level
- [Growth, GTM & pricing](growth-gtm-and-pricing.md) — pilots and pricing close the loop on willingness-to-pay
- [AI agents & applications](ai-agents-and-applications.md) — proprietary context/workflow is where defensibility manifests

## Source episodes
- [Y Combinator — Why Two IIT Engineers Turned Down $550K Jobs (2026-05-30)](../episodes/2026/2026-05-30--yc--two-iit-engineers-turned-down-550k-jobs.md)
- [Y Combinator — How Legora Went From YC to $100M ARR in 18 Months (2026-06-06)](../episodes/2026/2026-06-06--yc--legora-yc-to-100m-arr-18-months.md)
- [SaaStr AI — Feature Differentiation Is Dead. Here's What Actually Wins Now (2026-06-06)](../episodes/2026/2026-06-06--saastr--feature-differentiation-dead-lovable-elena-verna.md)
- [Lenny's Podcast — Tony Fadell: How to build real taste (2026-06-08)](../episodes/2026/2026-06-08--lenny--tony-fadell-real-taste-ai-matters-more.md)
- [a16z — The Economics of AI Usage and What's Next For SaaS | Benedict Evans (2026-06-11)](../episodes/2026/2026-06-11--a16z--economics-ai-usage-saas-evans.md)
- [Y Combinator — The CEO Must Be the Chief AI Officer (Brex) (2026-06-11)](../episodes/2026/2026-06-11--yc--ceo-must-be-chief-ai-officer-brex.md)
- [Y Combinator — How Meesho Became India's Biggest Shopping App (2026-06-11)](../episodes/2026/2026-06-11--yc--meesho-became-indias-biggest-shopping-app.md)
- [Lenny's Podcast — The hidden pattern behind successful products | Mark Pincus (2026-06-14)](../episodes/2026/2026-06-14--lenny--hidden-pattern-behind-successful-products-mark-pincus.md)
- [Y Combinator — Groww: If Your Customers Don't Love It or Hate It, You've Already Lost (2026-06-15)](../episodes/2026/2026-06-15--yc--groww-customers-dont-love-hate-already-lost.md)
- [Y Combinator — How To Pick A Startup Idea (2026-06-17)](../episodes/2026/2026-06-17--yc--how-to-pick-a-startup-idea.md)
- [Every — Building a School Where AI Models Learn About Humanity (2026-06-24)](../episodes/2026/2026-06-24--every--building-school-ai-models-learn-humanity.md)
- [Y Combinator — Zynga Founder: Consumer Is Not Investible Right Now (2026-06-25)](../episodes/2026/2026-06-25--yc--zynga-founder-consumer-not-investible-right-now.md)
- [Lenny's Podcast — OpenAI Codex lead on the new shape of product work | Andrew Ambrosino (2026-06-28)](../episodes/2026/2026-06-28--lenny--openai-codex-lead-on-the-new-shape-of-product-work.md)
- [How I AI — How Gusto's CTO uses Claude Code to ship like a startup (2026-06-29)](../episodes/2026/2026-06-29--howiai--gusto-cto-claude-code-ship-like-startup.md)
