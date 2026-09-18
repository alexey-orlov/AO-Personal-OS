# Packaging-skills prep — Alex's decisions (2026-09-18)

Answers Alex gave (chat + question widget) to the open questions raised by the research in this folder. These override anything the research files (A1, A2, B, C, D) list as open or recommended.

## Reference artifacts and inputs

| Topic | Decision |
|---|---|
| Canonical WfO sales one-pager | The **Jul 17** version (`Workforce Optimization - Sales one-pager - Oracle.html/.pdf`, PoV infra "~€2K *", "Oracle Fusion Field Service"). Done 2026-09-18: the Jul 13 PDF in OneDrive `Projects/Oracle/Packs/Workforce optimization package/` was overwritten in place with the Jul 17 file under the same name (share link preserved); the Jul 13 file is kept as `~/Documents/Documents/SoftServe/Oracle/Workforce Optimization - Sales one-pager - Oracle (2026-07-13, superseded).pdf`. The HTML build source still lives only in that old local folder. |
| WfO figure set | The one-pager set is most likely right, but **the WfO artifacts are not being updated in this project** — the goal is the skills, not a WfO rebuild. |
| July build sessions | Not recoverable. Alex has nothing beyond the Jul 24 Vlad recording (`~/Downloads/Oracle Productization & BA JumpStart Sync-20260724_133119-Meeting Recording`, download in progress on 2026-09-18). The July learnings stay second-hand (wiki, call notes, July-dated reference rules). |
| Vlad recordings | Only the Jul 24 recording exists on Alex's side; use it in place of the partial pasted transcript. |

## Skill design decisions

| Topic | Decision |
|---|---|
| Component count | 12 components (Alex's list). |
| Tier vocabulary | One set everywhere: **PoV Jumpstart / Integration / Scaling**; S/M/L only as size tags in internal tables. Existing print artifacts get relabelled at their next rebuild. |
| PoV duration | Set per package, ideally **4–8 weeks**; **10 weeks is a hard cap**. The skill pushes back on longer PoVs and explains why. |
| Outcome figures | **One metric set per pack**, taken from the customer study. Attribution varies by approval and channel: under the customer logo where approved and appropriate, anonymized otherwise. Two contradicting / overlapping / different sets of metrics for one pack are unacceptable. |
| Features | **Area > Category > Feature** with **● available / ◐ partial / ○ roadmap** glyphs; the feature list is the master; the site's workflow-stage view is derived from it per pack. |
| Optional Oracle products | Mostly the per-item **required / optional flag inside the architecture stack**. Required = the pack is built on it or fully relies on it; optional = could logically be used (additional data source or destination system). "Oracle products" = OCI products (e.g. Object Storage), Fusion apps, anything else relevant. **Requirement: a distilled shared catalog of Oracle products** with canonical names, from which every pack picks, so products are named and aggregated identically across packs. |
| Pack naming by channel | Mini-site: "Workforce Optimization". Internal exec slide: "Workforce Optimization App". External one-pager and sales deck: "Workforce optimization" with a small "Accelerator App by SoftServe" subheading if needed. |
| Integration claims | State the tier next to every integration claim. WfO example: the PoV uses file export/import; API integration is Integration-tier scope (both the one-pager and the feature list are right at different tiers). |
| Standard artifact set | The five (feature list · sales deck · sales one-pager · interactive demo · mini-site listing) plus the **executive summary slide** (reference: the most recent AI Days deck, `Oracle AI Packages - section slides.pptx`). Demo video and Marketplace package/listing are part of the pack's end state but **not built by the skills** for now. The internal scoping one-pager (Vlad's anatomy) is not a standard artifact. |
| Sales one-pager length | **One A4 page, always**; the skill pushes back when content does not fit and proposes cuts. |
| Contact / CTA | As today, made explicit: sales one-pager and deck → Karsten Tramborg, ktram@softserveinc.com; mini-site → oracle@softserveinc.com with Karsten named; internal deck → the person doing the packaging (name), RnDrequest@softserveinc.com. Emails are right as they stand. |
| Delivery model | **Standalone GitHub repo as a Claude Code plugin marketplace, two plugins** (`pack-docs`: feature list, one-pager, deck, exec summary; `pack-web`: listing, demo); pilot with Vlad as a plain skills copy first; run the 30-minute plugin spike before committing. |
