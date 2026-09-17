/* Internal review list: TEMPORARY, for the prototype only.
   assets/review.js renders it as the "Internal" button and panel. Anyone with
   the preview link can see it; set enabled: false to hide it. Before launch,
   delete this file, assets/review.js and their two <script> tags
   (docs/START-HERE.md §8).

   status: "open" (still to be confirmed) · "confirmed" · "changed" (write
           what was decided in `decision`)
   flag:   "Site differs" (the site does not match the item yet) ·
           "Conflict" (the item clashes with another item on this list)
   site:   where the site stands against the item today */
window.SITE_REVIEW = {
  enabled: true,
  updated: "17 Sep 2026",
  eyebrow: "Internal · prototype only",
  title: "To confirm",
  intro: "The working assumptions this prototype is built on. Each one needs a yes, or a change, before launch.",
  footer: "This panel comes off before launch.",
  groups: [
    {
      title: "Target audience",
      items: [
        {
          id: "audience-oracle",
          text: "Priority 1: Oracle sellers and partners.",
          status: "open",
          flag: "Conflict",
          site: "For sellers, in the header and on every product, serves them, and the demo form lists Oracle seller and Oracle partner as separate roles. Partners cannot get the sales kit: it goes only to @oracle.com and @softserveinc.com addresses."
        },
        {
          id: "audience-softserve",
          text: "Priority 2: SoftServe sellers.",
          status: "open",
          site: "The same For sellers page; @softserveinc.com addresses get the kit."
        },
        {
          id: "audience-customers",
          text: "Priority 3: end customers.",
          status: "open",
          site: "Home, Products and Services are written for a buyer on Oracle and lead to the demo and scoping-call forms."
        }
      ]
    },
    {
      title: "Positioning",
      items: [
        {
          id: "positioning-experts",
          text: "We are experts in AI and in Oracle platforms, with a multi-year, top-class enterprise track record.",
          status: "open",
          site: "Services opens on Frontier AI on Oracle, with three figures: founded in 1993, 1,000+ experts in AI, data and R&D, and 30 Fortune 500 clients in data and analytics."
        },
        {
          id: "positioning-offer",
          text: "Ready-made solutions, fast proofs of value and a dedicated practice.",
          status: "open",
          site: "The home page offers two ways in, the agents and the practice; Services covers the practice, the method and the proof of value."
        },
        {
          id: "positioning-both",
          text: "We offer both products and services.",
          status: "open",
          site: "The header leads with Products and Services."
        }
      ]
    },
    {
      title: "Commitments and disclosures",
      items: [
        {
          id: "pov-duration",
          text: "A proof of value takes 4–8 weeks, to be agreed with delivery.",
          status: "open",
          site: "Stated on every product, the home page and Services; the site's checker rejects any other duration. Plan vs actual investigation was originally scoped longer and was shortened to fit."
        },
        {
          id: "prices",
          text: "Only the proof-of-value price is on the site. Every other package price goes in the sales materials.",
          status: "open",
          flag: "Site differs",
          site: "Four products print a proof-of-value price. Two of them, Large docs processing and review and Workforce optimization, also print an Integration price (€300–500K services plus infrastructure) on their Jumpstart tab."
        },
        {
          id: "customer-names",
          text: "No customer names: no customer has confirmed yet that we may use theirs.",
          status: "open",
          site: "No names or logos anywhere. Case studies describe each customer by industry and scale, and the checker blocks known names."
        },
        {
          id: "planned-products",
          text: "The catalog includes both existing products and planned ones.",
          status: "open",
          flag: "Site differs",
          site: "Nothing marks a product as planned, so all seven read as available today."
        }
      ]
    },
    {
      title: "Communication flow",
      items: [
        {
          id: "mailbox",
          text: "One shared mailbox: oracle@softserveinc.com.",
          status: "open",
          site: "It is the address on the contact card and the destination of every form."
        },
        {
          id: "contact-karsten",
          text: "Karsten is the contact for communications.",
          status: "open",
          site: "Karsten Tramborg, Alliances & Partnerships Director, is the person on the contact card."
        },
        {
          id: "requests",
          text: "All requests land in the shared mailbox.",
          status: "open",
          site: "No form endpoint yet: each form opens the visitor's own mail client, addressed to the mailbox, so a request arrives only if they press Send. The forms promise an answer within two working days."
        },
        {
          id: "materials",
          text: "Sales materials go only to corporate addresses at softserveinc.com or oracle.com.",
          status: "open",
          flag: "Conflict",
          site: "The kit form accepts only those two domains, subdomains included, so partners are turned away. Nothing sends the kit automatically yet, and most kit links are still pending."
        }
      ]
    },
    {
      title: "Also open from earlier rounds",
      items: [
        {
          id: "site-name",
          text: "The name Oracle AI & Data Solutions can be used.",
          status: "open",
          site: "The name is built on Oracle's trademark. Check it against Oracle's trademark guidelines for third parties before launch."
        },
        {
          id: "frontier-ai",
          text: "Frontier AI is a claim the practice can stand behind.",
          status: "open",
          site: "Today it rests on the 1,000+ experts and the measurement method. The stronger proof points in the decks are not yet cleared for the site."
        }
      ]
    }
  ]
};
