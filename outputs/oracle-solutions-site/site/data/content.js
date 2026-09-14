window.SITE_CONTENT = {
  site: {
    name: "Oracle AI Solutions",
    owner: "SoftServe",
    title: "Oracle AI Solutions — SoftServe",
    tagline: "Packaged AI applications for Oracle customers",
    metaDescription: "Packaged AI applications for Oracle customers — built on Oracle Cloud Infrastructure with NVIDIA and on Oracle Autonomous AI Lakehouse. From a fixed-scope proof of value to enterprise scale.",
    headerLockup: {
      wordmark: "assets/img/softserve-wordmark-white.svg",
      wordmarkAlt: "SoftServe",
      divider: "assets/img/header-divider-white.svg",
      productName: "Oracle AI Solutions"
    },
    nav: [
      { label: "Overview", route: "#/" },
      { label: "Products", route: "#/products" },
      { label: "Services", route: "#/services" }
    ],
    primaryCta: { label: "Request a demo", route: "#/#request-a-demo" },
    dividerLabels: {
      builtOn: "Built on",
      whatWeBuild: "What we build",
      proof: "Proof",
      howWeProveIt: "How we prove it",
      howWeEngage: "How we engage"
    },
    footer: {
      heading: "CONTACT US",
      description: "Tell us which account or workflow you have in mind. One scoping conversation starts it.",
      contactCta: { label: "Request a scoping call", route: "#/services#contact" },
      socialLabel: "Follow SoftServe",
      social: [
        { label: "SoftServe", url: "https://www.softserveinc.com/en-us" },
        { label: "LinkedIn", url: "https://www.linkedin.com/company/softserve" },
        { label: "Facebook", url: "https://www.facebook.com/SoftServeCompany" },
        { label: "YouTube", url: "https://www.youtube.com/@SoftServeInc" }
      ],
      legalLinks: [
        { label: "Privacy policy", url: "https://www.softserveinc.com/en-us/privacy-policy" },
        { label: "Terms and conditions", url: "https://www.softserveinc.com/en-us/terms-and-conditions" }
      ],
      legalLine: "SoftServe · All rights reserved",
      builtWith: "Built with Oracle and NVIDIA",
      trademarkLine: "Built with Oracle and NVIDIA. Oracle, Oracle Cloud Infrastructure and Oracle Autonomous AI Lakehouse are trademarks of Oracle Corporation. NVIDIA, AI-Q and cuOpt are trademarks of NVIDIA Corporation."
    }
  },

  media: {
    "account-insights": {
      diagram: "account-insights",
      alt: "Flow diagram: signal feeds and client context enter the Account Insights app and NVIDIA AI-Q on a dedicated AI cluster on Oracle Cloud Infrastructure, which filter, fan out, reason, score and cite; a reviewer approves before one JSON per account goes to the CRM"
    },
    "case-evidence-collection": {
      diagram: "case-evidence-collection",
      alt: "Flow diagram: source exports enter evidence assembly and NVIDIA AI-Q multi-document reasoning on a dedicated AI cluster on Oracle Cloud Infrastructure, and the assembled case reaches an investigator UI with amend, approve and a full audit log"
    },
    "plan-vs-actual-investigation": {
      diagram: "plan-vs-actual-investigation",
      alt: "Flow diagram: approved exports enter a conformed data model and hybrid retrieval on Oracle Cloud Infrastructure, and the review app presents variances, drivers and citations, with unresolved records reported as coverage gaps"
    },
    "large-document-extraction": {
      diagram: "large-document-extraction",
      alt: "Flow diagram: contracts from the repository enter the extraction pipeline and NVIDIA AI-Q vision-language models on a dedicated AI cluster on Oracle Cloud Infrastructure, and a reviewer validates in a split view before approved rows export to the cost or ERP system"
    },
    "workforce-optimization": {
      diagram: "workforce-optimization",
      alt: "Flow diagram: Oracle Field Service data enters the workforce app and the NVIDIA cuOpt solver on a dedicated AI cluster on Oracle Cloud Infrastructure, a dispatcher approves the plan, and the approved plan is written back to Oracle Field Service"
    },
    "cross-system-erp-qa": {
      diagram: "cross-system-erp-qa",
      alt: "Diagram: Oracle applications and one or two other sources connect into Oracle Autonomous AI Lakehouse — governed data model, masking and row rules, SQL firewall, Select AI — which answers in plain language over certified views and dashboards"
    },
    "business-metrics-qa": {
      diagram: "business-metrics-qa",
      alt: "Diagram: existing catalogs, linked databases and existing platforms stay where they are and connect into Oracle Autonomous AI Lakehouse as the governed gold layer, which answers across every source with no data movement"
    }
  },

  disclaimers: {
    kpiTile: "KPIs measured before/after on proof-of-value data; figures are illustrative, not contractual.",
    kpiTileTargets: "Targets from the proof-of-value; figures are illustrative, not contractual.",
    packageTable: "Figures are illustrative and subject to confirmation.",
    lakehousePricing: "*Price indicative, to be confirmed per scope; Oracle partner funding programs may reduce the customer's net cost. All features used are generally available product.",
    accountInsightsEvaluation: "The engine is a non-deterministic reasoning system, so a dedicated evaluation plan (correctness and confidence calibration) is part of the work.",
    publicPricingFootnote: "Framed scope, flexible add-ons. Each package's price and timing are set by specific constraints. Custom features beyond the frame are added for additional price and time.",
    modeledResults: "Results are modeled simulations against a historical baseline, not measured production outcomes.",
    ladderFallback: "No fixed package price is published for this application yet. The scope above is the shape every engagement follows; the price is set once the sample, the sources and the success metrics are agreed."
  },

  shared: {
    preFlightGate: {
      title: "Before the clock starts",
      body: "Sponsor named, two to three success metrics signed, source access approved in writing. The gate is what protects the fixed price."
    },
    credibilityBlock: {
      heading: "BUILT TO PROVE, NOT PROMISE",
      items: [
        { title: "Fixed scope", body: "One use case, narrow enough to be honest." },
        { title: "Shipping product only", body: "Everything used is generally available; nothing in scope waits on a roadmap item." },
        { title: "Metrics signed up front", body: "The readout is a measurement, not a story." },
        { title: "Yours either way", body: "Built in your tenancy, under your security rules. It stays." }
      ]
    },
    engageLink: { label: "How we engage, in three packages →", route: "#/services#how-we-engage" },
    productTabs: [
      { id: "overview", label: "Overview" },
      { id: "technology", label: "Technology" },
      { id: "pov", label: "POV Jumpstart" },
      { id: "demo", label: "Request a demo" },
      { id: "sellers", label: "For sellers", locked: true }
    ],
    ladderColumns: ["Proof of value", "Roll-out", "Scaling"],
    heroAsideTitle: "What you get",
    heroAsideFootLabel: "Proof of value",
    videoCaption: "Watch the demo",
    industryLabels: {
      "manufacturing": "Manufacturing",
      "logistics": "Logistics & supply chain",
      "utilities": "Utilities",
      "telecom": "Telecom & cable",
      "healthcare": "Healthcare",
      "financial-services": "Financial services",
      "insurance": "Insurance",
      "retail": "Retail",
      "energy": "Energy",
      "public-sector": "Public sector",
      "automotive": "Automotive",
      "life-sciences": "Pharma & life sciences",
      "professional-services": "Professional services",
      "construction": "Construction",
      "travel-transport": "Travel & transport",
      "cross-industry": "Every industry"
    },
    sectionLabels: {
      metrics: "Metrics improved",
      roi: "ROI",
      features: "Key features",
      industries: "Industries",
      scope: "Scope",
      scopeIn: "In scope",
      scopeOut: "Out of scope",
      moreDetail: "More detail",
      moreDetailFeatures: "Every feature, in full",
      architecture: "Architecture",
      flow: "How it runs",
      components: "Components",
      stack: "Solution stack",
      notUsed: "Not used by this application",
      integration: "Integration",
      security: "Security and deployment",
      povHeading: "What the proof of value buys",
      povFactDuration: "Duration",
      povFactTeam: "Team",
      povFactPrice: "Price",
      povFactDeliverables: "Deliverables",
      deliverables: "Deliverables",
      pricing: "Pricing",
      terms: "The terms, in full",
      matrix: "What is included at each step",
      ladder: "From proof of value to scale",
      povScopeIn: "In scope",
      povScopeOut: "Not in the proof of value",
      povRollout: "Then at roll-out",
      povPhases: "Phases",
      povMeasured: "How it is measured"
    },
    materialStates: {
      "link-pending": "Link pending",
      "coming-soon": "Coming soon",
      "superseded": "Superseded — do not distribute",
      "planned": "Planned",
      "available": "Open"
    }
  },

  overview: {
    hero: {
      image: {
        file: "assets/img/heroes/overview.jpg",
        alt: "Abstract dark composition of connected data planes over a deep blue field",
        focal: "50% 50%"
      },
      headline: { accent: "ORACLE", rest: "AI SOLUTIONS" },
      subhead: "Packaged AI applications for Oracle customers — built on Oracle Cloud Infrastructure with NVIDIA and on Oracle Autonomous AI Lakehouse. Each one an accelerator pack plus tailored SoftServe services, delivered in three steps: a fixed-scope proof of value on your own data, roll-out at one site, then scale.",
      ctas: [
        { label: "Request a demo", route: "#/#request-a-demo", kind: "primary" },
        { label: "Browse the products", route: "#/products", kind: "secondary" }
      ],
      stats: [
        { value: "7", label: "applications on the Oracle stack — three packaged today, two sellable as a fixed-price offer, two in preparation" },
        { value: "4", label: "Oracle platforms the practice focuses on" },
        { value: "30 days–4 months", label: "from kickoff to a measured proof of value on your own data" },
        { value: "30", label: "Fortune 500 clients in SoftServe's data and analytics practice" }
      ]
    },

    trustStrip: {
      dividerLabel: "Built on",
      logos: [
        { name: "Oracle", file: "assets/img/oracle-wordmark-white.svg" },
        { name: "NVIDIA", file: "assets/img/nvidia-wordmark.svg" },
        { name: "SoftServe", file: "assets/img/softserve-wordmark-white.svg" }
      ]
    },

    productsIntro: {
      title: "THE PRODUCTS",
      count: 7,
      body: "Seven packaged applications, each built on a repeatable workflow pattern rather than a one-off build: deep research and investigation, per-item processing pipelines, and data analysis and decision-making. Every one runs in the customer's own Oracle tenancy, keeps a human in the decision, and ships with a fixed-scope proof of value.",
      cta: { label: "See all seven →", route: "#/products" }
    },

    evidenceIntro: {
      title: "PROOF",
      body: "Two of these applications have been through a delivered proof of value. We say so where it is true, and we say what is still in preparation where it is not."
    },

    evidence: [
      {
        id: "workforce-proof",
        band: 1,
        label: "PROOF OF VALUE",
        customer: "A global home-appliance manufacturer",
        industry: "Manufacturing — residential appliance and white-goods field service",
        body: "Dispatchers planned a residential appliance-repair field force by hand: ZIP-code work zones and technician allocations, region by region. With the cuOpt-powered dispatcher app on OCI, they now review, approve or re-run an optimized plan and export it straight to Oracle Field Service.",
        scopeLine: "A three-month proof of value across three countries, with around thirty real-world constraints modeled — skills, availability, existing bookings, travel and holidays — and dispatcher approval in the loop.",
        metrics: [
          { value: "~30 min", label: "to optimize and approve a region's four-week plan: down from ~2 days" },
          { value: "83%", label: "of twelve modeled simulations positive, at a median of +4.5% jobs per technician per day" },
          { value: "15–20%", label: "dispatcher productivity gain observed in the pilot; the case was built on the conservative 15%" },
          { value: "~5x", label: "modeled ROI within three years on a phased rollout" }
        ],
        footnotes: [
          "Results are modeled simulations against a historical baseline, not measured production outcomes.",
          "KPIs measured before/after on proof-of-value data; figures are illustrative, not contractual."
        ],
        product: { slug: "workforce-optimization", name: "Workforce optimization" }
      },
      {
        id: "extraction-proof",
        band: 1,
        label: "PROOF OF VALUE",
        customer: "A Gulf carrier",
        industry: "Aviation — ground-handling contract management",
        body: "Ground-handling contract rates were keyed into a cost-management system by hand — 60–100-page agreements read page by page, 3–5 days per contract. With the extraction app on OCI (NVIDIA AI-Q), reviewers now validate AI-extracted rates side-by-side with the source PDF — every value cited to its page — and export in minutes.",
        metrics: [
          { value: "3–5 days → 5–15 min", label: "to extract a 60–100-page ground-handling contract end to end" },
          { value: "up to −20%", label: "targeted reduction in manual data-entry effort (proof of value)" }
        ],
        footnotes: [
          "Targets from the proof-of-value; figures are illustrative, not contractual."
        ],
        product: { slug: "large-document-extraction", name: "Large Docs Extraction and Review" }
      },
      {
        id: "account-insights-first-engagement",
        band: 2,
        label: "FIRST ENGAGEMENT",
        industry: "Logistics and supply chain",
        body: "A first engagement for Account Insights is under way with a global logistics and supply-chain operator, on the customer's own account base. What it measures: the accuracy and the confidence calibration of the generated opportunities, against reviewer approve/reject decisions. Results to follow.",
        product: { slug: "account-insights", name: "Account Insights" }
      },
      {
        id: "method-like-for-like",
        band: 2,
        label: "METHOD",
        title: "Like-for-like measurement",
        body: "Every KPI is computed identically for the current plan and the optimized plan, so the comparison holds: jobs per technician per working day; booked activity time against available capacity; calendar days between booking and appointment. Success metrics and the baseline are signed before the clock starts."
      },
      {
        id: "method-accuracy-journey",
        band: 2,
        label: "METHOD",
        title: "Accuracy as a journey, with a threshold",
        body: "We start by measuring. On one engagement, a production evaluation framework plus work on the data took a customer's existing AI solution from well below usable to 81% accuracy. Around 80% is the practical threshold: past it, reviewing the output is faster than doing the work from scratch."
      }
    ],

    servicesTeaser: {
      title: "THE PRACTICE",
      body: "SoftServe's Oracle practice focuses on two things: joint delivery with Oracle's AI & Data organization, and repeatable accelerator packs on four Oracle platforms.",
      platforms: [
        { name: "Oracle Cloud Infrastructure + NVIDIA NeMo Agent Toolkit", body: "GPU cloud plus agent tooling" },
        { name: "Oracle AI Data Platform", body: "Governed enterprise data for AI" },
        { name: "Oracle Autonomous AI Lakehouse", body: "Self-managing warehouse with Iceberg" },
        { name: "Oracle AI for Fusion Applications", body: "AI agents inside Fusion applications" }
      ],
      secondParagraph: "Oracle provides the platforms; SoftServe builds, integrates and runs the application layer on top — packaged, verticalized AI and data applications that turn platform consumption into outcomes.",
      cta: { label: "How we engage →", route: "#/services" }
    }
  },

  productsPage: {
    title: "PRODUCTS",
    count: 7,
    intro: "Seven packaged AI applications on the Oracle stack. Filter by the Oracle platform each one is built on, or search by the workflow you are trying to fix. Every product ships with a fixed-scope proof of value on your own data, in your own tenancy.",
    searchPlaceholder: "Search products, patterns, industries…",
    bottomBlock: {
      heading: "NOT SEEING YOUR WORKFLOW?",
      body: "These seven are the patterns packaged so far. New ones are packaged after their first live customer — tell us the workflow you need fixed and we will say whether it is close to something we already run.",
      cta: { label: "Request a scoping call", route: "#/services#contact" }
    }
  },

  facets: {
    technologyLabel: "Oracle platform",
    technology: [
      {
        id: "oci-nvidia",
        label: "OCI + NVIDIA",
        fullLabel: "Oracle Cloud Infrastructure + NVIDIA",
        description: "GPU cloud plus the NVIDIA agent, extraction and optimization engines — AI-Q, cuOpt, NeMo.",
        emptyState: "No packaged offering on this platform yet — the practice delivers on it; see Services"
      },
      {
        id: "oracle-ai-data-platform",
        label: "Oracle AI Data Platform",
        fullLabel: "Oracle AI Data Platform",
        description: "Governed enterprise data for AI — structured, unstructured and real-time, multi-cloud.",
        emptyState: "No packaged offering on this platform yet — the practice delivers on it; see Services"
      },
      {
        id: "oracle-autonomous-ai-lakehouse",
        label: "Oracle Autonomous AI Lakehouse",
        fullLabel: "Oracle Autonomous AI Lakehouse",
        description: "The self-managing governed gold layer, with Iceberg, vector search and Select AI.",
        emptyState: "No packaged offering on this platform yet — the practice delivers on it; see Services"
      },
      {
        id: "other",
        label: "Other",
        fullLabel: "Other Oracle platforms",
        description: "Everything outside the three above, including Oracle AI for Fusion Applications.",
        emptyState: "No packaged offering on this platform yet — the practice delivers on it; see Services"
      }
    ],
    footnote: "We also deliver on Oracle AI Data Platform and on Oracle AI for Fusion Applications. Packaged applications are published here as each one completes its first engagement.",
    categoryLabel: "Workflow pattern",
    categories: [
      { id: "deep-research", chip: "Deep research", full: "Deep research & investigation" },
      { id: "processing-pipelines", chip: "Processing pipelines", full: "Per-item processing pipelines" },
      { id: "data-analysis", chip: "Data analysis & optimization", full: "Data analysis & decision agents" }
    ],
    marketplace: {
      label: "Available on Oracle Marketplace",
      badge: "On Oracle Marketplace",
      heroCta: "View on Oracle Marketplace"
    },
    allLabel: "All",
    clearLabel: "Clear filters",
    noResults: "No product matches these filters. Clear one and try again, or tell us the workflow you need fixed."
  },

  availability: {
    "available": {
      chip: "Available now",
      tooltip: "A packaged offering exists — collateral and a scoped proof of value, with a first engagement delivered or under way."
    },
    "fixed-price-offer": {
      chip: "Fixed-price offer",
      tooltip: "A fixed-scope, fixed-price proof of value is sellable today on Oracle Autonomous AI Lakehouse; the packaged product is still being assembled."
    },
    "in-preparation": {
      chip: "In preparation",
      tooltip: "Packaged offering in preparation; scoping conversations are open today."
    }
  },

  products: [
    {
      slug: "account-insights",
      name: "Account Insights",
      headline: { accent: "ACCOUNT", rest: "INSIGHTS" },
      category: "deep-research",
      categoryChip: "Deep research",
      facet: "oci-nvidia",
      availability: "available",
      availabilityChip: "Available now",
      availabilityTooltip: "A packaged offering exists — collateral and a scoped proof of value, with a first engagement delivered or under way.",
      oneLiner: "Market signals into per-account opportunities.",
      subLine: "Turns one real-world signal — news, filing, disclosure — into structured, cited opportunities and risks for every account it touches.",
      tags: ["Deep research", "OCI + NVIDIA", "AI-Q", "Available now"],
      hero: {
        image: {
          file: "assets/img/heroes/account-insights.jpg",
          alt: "Abstract dark field of scattered signal points resolving into connected clusters",
          focal: "50% 45%"
        }
      },
      tile: {
        outcomes: [
          "One real-world signal — news, filing, disclosure — turned into structured opportunities and risks per affected account",
          "Every item scored for magnitude and confidence, and cited to its evidence",
          "It informs decisions and does not act on them: a reviewer approves or rejects before anything moves"
        ]
      },
      overview: {
        problemSolution: {
          problem: {
            title: "THE PROBLEM",
            text: "Commercial teams work out by hand what a market development means for each account — slow, inconsistent, and blind to second-order effects across the portfolio.",
            icon: "alert"
          },
          solution: {
            title: "THE SOLUTION",
            text: "One signal becomes a scored, cited brief of the opportunities and risks it creates for every affected account — each mapped to a service line, with cross-account ripples foreseen.",
            icon: "spark"
          }
        },
        metrics: [
          { value: null, label: "Reviewer accept rate", qualifier: "The share of generated opportunities a reviewer approves", icon: "check" },
          { value: null, label: "Confidence calibration", qualifier: "Scores checked against reviewer approve/reject decisions", icon: "gauge" },
          { value: null, label: "Time to a qualified opportunity", qualifier: "Hours, rather than the next quarterly review", icon: "clock" },
          { value: null, label: "Coverage of the account base", qualifier: "Every in-scope account a signal touches", icon: "network" }
        ],
        metricsNote: "No published metrics yet. The first engagement is under way; what it measures is accuracy and confidence calibration, against reviewer approve/reject decisions. Results to follow.",
        roi: {
          icon: "roi",
          text: "The unit of value is a qualified opportunity a seller would not otherwise have seen, and a material risk surfaced before it becomes a renewal conversation. Because the output is scored and cited, the proof of value can measure what matters: the share of generated opportunities a reviewer accepts."
        },
        features: [
          "Signal ingestion grounded in CRM context, service catalog and public filings",
          "Relevance filter and de-duplication: one story becomes one signal",
          "Account fan-out — one JSON per affected account",
          "Opportunity and risk reasoning, mapped to a real service line",
          "Cross-account ripples across suppliers, customers and competitors",
          "Magnitude and confidence scored 0–10, with a configurable threshold",
          "Reviewer UI with citations, approve or reject with a comment"
        ],
        featuresDetail: [
          { title: "Signal ingestion and grounding", body: "News, filings and disclosures as the trigger, grounded in first-party CRM context, a service-line capability catalog and public filings." },
          { title: "Relevance filter, de-duplication and account fan-out", body: "One story becomes one signal, and one JSON per affected account." },
          { title: "Opportunity and risk reasoning", body: "The \"so what\" per account, with each opportunity mapped to a real service line." },
          { title: "Cross-account ripple reasoning", body: "Descriptive second-order effects across suppliers, customers and competitors, up to two levels." },
          { title: "Magnitude and confidence scoring", body: "0–10 per item, with a configurable threshold that filters low-confidence output." },
          { title: "Reviewer UI with citations and the reasoning behind every item", body: "Read the opportunities, follow the source links, approve or reject with a comment." }
        ],
        industries: ["logistics", "financial-services", "manufacturing", "professional-services"],
        industriesNote: "Any business that needs to turn market and customer developments into pursuable opportunities across its account base, quickly.",
        scope: {
          in: [
            "A signal plus first-party CRM context, the service catalog and the in-scope account list",
            "Filtering for genuine signals, and identifying which in-scope accounts are affected",
            "Reasoning \"so what\" per account: opportunities and material risks mapped to a service line",
            "Descriptive second-order and cross-account ripples, up to two levels",
            "Magnitude and confidence scoring, citations, one JSON per affected account"
          ],
          out: [
            "Acting on opportunities — auto-outreach, CRM tasks, workflow automation; decisioning is downstream",
            "Validating candidates against deals already in flight — a post-proof step",
            "Monetary sizing, and conversational follow-up over the output",
            "CRM write-back, a persistent historical signal store, and the feedback loop",
            "Deep financial modeling — the engine reasons over disclosures, it does not compute them",
            "Native multilingual processing — single-language primary; more languages are a future extension"
          ]
        },
        moreDetail: [
          { title: "How the reasoning is grounded", body: "For each in-scope account it reasons \"so what\" for that account's business, derives candidate opportunities and flags material risks (each mapped to a specific client service line where relevant), foresees descriptive second-order and cross-account ripples — suppliers, customers, competitors, up to two levels — scores each item by magnitude and confidence, and cites the source evidence. The reasoning is grounded in the client's own data: CRM and account framing, capability catalog, public filings, with a human review step. Output is one JSON per affected account that flows into downstream sales systems." },
          { title: "What the system does not do", body: "The system produces scored, cited reasoning — both opportunities and risks — for a human to review; it informs decisions and downstream systems, it does not act on them." },
          { title: "Evaluation is part of the work", body: "The engine is a non-deterministic reasoning system, so a dedicated evaluation plan — correctness and confidence calibration — is part of the work." },
          { title: "Logistics & supply chain", body: "A signal about a shipper (plant expansion, new-market entry) turned into a concrete logistics opportunity; a disruption (strike, port closure, supplier fire) turned into an inbound or mitigation opportunity across affected accounts." },
          { title: "Financial services & banking", body: "A signal about a counterparty or portfolio company turned into a relationship or coverage opportunity; cross-holding ripples, where one issuer's event opens opportunities with related names." },
          { title: "Industrial & manufacturing", body: "A signal at a supplier or OEM customer turned into supply-chain and reallocation opportunities; second-order effects on production sites and trade lanes, each tied to an opportunity." },
          { title: "Private equity funds", body: "A market or regulatory signal turned into thesis-relevant opportunities across portfolio companies; event-driven screening of pipeline targets." }
        ],
        successStory: {
          title: "SUCCESS STORY",
          state: "first-engagement",
          blurb: "A first engagement is under way with a global logistics and supply-chain operator, on the customer's own account base. What it measures: the accuracy and the confidence calibration of the generated opportunities, against reviewer approve/reject decisions.",
          emptyLabel: "Results to follow",
          evidenceId: "account-insights-first-engagement"
        }
      },
      technology: {
        narrative: "The app runs on a dedicated AI cluster in your own Oracle Cloud Infrastructure tenancy. NVIDIA AI-Q grounds every conclusion in a cited first-party or public source, and nothing reaches the CRM until a reviewer approves it.",
        flow: [
          { step: "Sources", label: "News, filings, CRM context, service catalog" },
          { step: "Ingest", label: "Relevance filter, de-duplication, account fan-out" },
          { step: "Reason", label: "Opportunity and risk reasoning, ripples, scoring" },
          { step: "Deliver", label: "Reviewer approves; one JSON per account to the CRM" }
        ],
        groups: [
          { vendor: "oracle", label: "Oracle Cloud Infrastructure", items: ["Dedicated AI cluster", "Object storage", "Landing zone"] },
          { vendor: "nvidia", label: "NVIDIA", items: ["AI-Q retrieval baseline — vector search and reranking"] },
          { vendor: "oracle", label: "Oracle AI Data Platform", items: ["Optional — sources landed and curated in a lakehouse, dossiers run as scheduled workflows"] },
          { vendor: "softserve", label: "SoftServe application layer", items: ["Filter, fan-out, reason and score pipeline", "Reviewer UI with citations and reasoning", "Evaluation harness", "CRM export connector"] }
        ],
        notUsed: ["Oracle Autonomous AI Lakehouse"],
        layers: [
          { layer: "OCI infrastructure + GPUs", providedBy: "Oracle", body: "Oracle OCI with NVIDIA GPUs — compute, storage, networking, security" },
          { layer: "NVIDIA AI-Q engine", providedBy: "NVIDIA", body: "The retrieval baseline — vector search and reranking" },
          { layer: "Accelerator business app", providedBy: "Oracle + SoftServe", body: "Pre-built, reusable pack: filter, fan-out, reason, score, reviewer UI" },
          { layer: "Custom configuration", providedBy: "SoftServe", body: "Signal sources, client field mapping, the service-line catalog, scoring rubric, CRM export" }
        ],
        integration: [
          { icon: "inbound", text: "In: signal feeds (news, filings, disclosures), commercial data feeds, first-party CRM records and account framing, a capability/service-line catalog, public filings, the in-scope account list" },
          { icon: "outbound", text: "Out: one JSON per affected account — account, trigger, article summary, impact reasoning, and an opportunities array with each item flagged as opportunity or risk — into the CRM or sales system" },
          { icon: "trigger", text: "Trigger: scheduled scan by default, plus manual submit" }
        ],
        security: [
          { icon: "shield", text: "Runs in the customer's own OCI tenancy." },
          { icon: "lock", text: "The reviewer gate is architectural, not optional: nothing is pushed downstream unapproved." },
          { icon: "eye", text: "Citations and the reasoning behind every item, so a reviewer can check the conclusion rather than trust it." },
          { icon: "audit", text: "A dedicated evaluation plan — correctness and confidence calibration — is part of every engagement." }
        ]
      },
      pov: {
        heading: "WHAT THE PROOF OF VALUE BUYS",
        facts: {
          duration: "~12 weeks",
          team: "One SoftServe team",
          price: "Scoped per engagement",
          deliverablesCount: 4
        },
        scope: "Signal ingestion and grounding, the filter and account fan-out, opportunity and risk reasoning, cross-account ripples, scoring and citations, and the reviewer UI with its evaluation harness — run across your in-scope account list.",
        duration: "about 12 weeks, scoped per engagement",
        durationShort: "about 12 weeks",
        team: "One team: AI, data and OCI architects, a product manager and a project manager, and senior AI and data engineers. The team grows with the scope.",
        inScope: "Signal ingestion and grounding · filter and account fan-out · opportunity and risk reasoning · cross-account ripples · scoring and citations · reviewer UI and evaluation.",
        notInScope: "Acting on opportunities · pipeline validation · monetary sizing · CRM write-back and persistence · financial modeling · native multilingual.",
        thenRollout: "CRM export · pipeline validation · persistent store.",
        howMeasured: "AI-generated output is compared against a manually prepared \"golden\" set, agreed before the project starts, per account — and against reviewer approve/reject decisions in live use.",
        deliverables: [
          "Signal-to-opportunity output across your in-scope account list, scored and cited",
          "An evaluation readout: correctness and confidence calibration against the agreed golden set, plus the reviewer accept rate",
          "The reviewer UI running on your tenancy",
          "A costed proposal for Roll-out: CRM export, pipeline validation, a persistent signal store"
        ],
        pricing: [
          { label: "Services (one-time)", value: "Scoped per engagement", note: "No package price is published for this application." },
          { label: "Timeline", value: "about 12 weeks, scoped per engagement" }
        ],
        disclaimers: [
          "Framed scope, flexible add-ons. Each package's price and timing are set by specific constraints. Custom features beyond the frame are added for additional price and time."
        ],
        ladder: [
          {
            tier: "proof-of-value",
            title: "Proof of value",
            scope: "Prove the gains on your own data and rules, in a separate environment. Zero integration.",
            includes: ["Signal ingestion, fan-out, reasoning and scoring", "Reviewer UI and the evaluation harness", "Sandboxed deployment on your tenancy"],
            duration: "about 12 weeks",
            pricing: "Scoped per engagement"
          },
          {
            tier: "rollout",
            title: "Roll-out",
            scope: "Full setup, data integration and go-live for one domain or one location — no manual work, embedded in the workflow.",
            includes: ["CRM export", "Pipeline validation", "A persistent signal store"],
            duration: "3–5 months",
            pricing: "Scoped per engagement"
          },
          {
            tier: "scaling",
            title: "Scaling",
            scope: "Scaling across locations, domains or document types, with heterogeneous rules and data workflows per region.",
            includes: ["Additional account books and service lines", "Additional signal sources", "Regional rule sets"],
            duration: "3–12 months",
            pricing: "Scoped per engagement"
          }
        ],
        ladderFootnote: "No fixed package price is published for this application yet. The scope above is the shape every engagement follows; the price is set once the sample, the sources and the success metrics are agreed."
      },
      sellers: {
        materials: [
          { key: "accelerator-pack-onepager", title: "Accelerator pack one-pager", description: "Three pages: scope, verticals, the full capability matrix (Oracle baseline vs SoftServe vs custom work), in/out of scope.", state: "link-pending" },
          { key: "sales-deck", title: "Sales deck", description: "The pack's sales narrative — problem, solution, architecture and the engagement shape.", state: "coming-soon" },
          { key: "one-pager", title: "Sales one-pager", description: "The single-page version: problem, solution, proof, engagement.", state: "coming-soon" },
          { key: "feature-list", title: "Feature list", description: "The capability matrix: baseline, built, custom per engagement.", state: "coming-soon" },
          { key: "demo-video", title: "Demo video", description: "A recorded walkthrough of the reviewer UI.", state: "coming-soon" }
        ],
        notes: [
          "Earlier product name on the cover; the content is current."
        ]
      }
    },
    {
      slug: "case-evidence-collection",
      name: "Case evidence collection",
      headline: { accent: "CASE", rest: "EVIDENCE COLLECTION" },
      category: "deep-research",
      categoryChip: "Deep research",
      facet: "oci-nvidia",
      availability: "in-preparation",
      availabilityChip: "In preparation",
      availabilityTooltip: "Packaged offering in preparation; scoping conversations are open today.",
      oneLiner: "An event opens a case; the evidence is assembled from every system that holds a piece of it, into one cited file a person decides on.",
      tags: ["Deep research", "OCI + NVIDIA", "AI-Q", "In preparation"],
      hero: {
        image: {
          file: "assets/img/heroes/case-evidence-collection.jpg",
          alt: "Layered records and correspondence converging into a single assembled file",
          focal: "50% 50%"
        }
      },
      tile: {
        outcomes: [
          "A case summary, a chronological timeline and draft response sections, per case",
          "Every statement cited to the exact source sentence or field",
          "An investigator UI with navigate-to-source, amend, approve or flag, and a full audit log"
        ]
      },
      overview: {
        problemSolution: {
          problem: {
            title: "THE PROBLEM",
            text: "Investigators rebuild the same case file by hand out of systems never designed to be read together — tickets, correspondence, operational records, scans. It is slow, it varies by investigator, and the evidence trail is hard to reconstruct.",
            icon: "alert"
          },
          solution: {
            title: "THE SOLUTION",
            text: "Per case: a summary, a chronological timeline and draft response sections, every statement cited to the exact source sentence or field — presented in an investigator UI for amendment and approval.",
            icon: "spark"
          }
        },
        metrics: [
          { value: null, label: "Time to an equivalent case file", qualifier: "Elapsed time and person-hours, measured before and after", icon: "clock" },
          { value: null, label: "Findings your experts confirm", qualifier: "The share a subject-matter expert accepts on review", icon: "check" },
          { value: null, label: "Evidence coverage", qualifier: "Material findings linked to sufficient source evidence", icon: "link" },
          { value: null, label: "Assembling versus judging", qualifier: "How much investigator time goes to gathering, not deciding", icon: "gauge" }
        ],
        metricsNote: "No published metrics yet — the first engagement has not started. What the proof of value will measure: elapsed time and person-hours to produce an equivalent case file; the share of assembled findings a subject-matter expert confirms; the share of material findings linked to sufficient source evidence.",
        roi: {
          icon: "roi",
          text: "Investigation cost is almost entirely person-hours spent gathering, not deciding. The proof of value measures that ratio before and after, on real historical cases the customer's own experts have already adjudicated."
        },
        features: [
          "Multi-source evidence assembly across systems, correspondence and documents",
          "Chronological case timeline with timestamps and clickable source references",
          "Sentence- and field-level citation on every statement",
          "Draft response sections generated for review, not for sending",
          "Investigator UI: navigate to source, amend, approve or flag",
          "Full audit log of every review decision",
          "Case categories scoped and configured per engagement"
        ],
        featuresDetail: [
          { title: "Multi-source evidence assembly", body: "Across operational systems, correspondence and documents." },
          { title: "Chronological case timeline", body: "With timestamps and clickable source references." },
          { title: "Sentence- and field-level citation", body: "On every statement." },
          { title: "Draft response sections", body: "Generated for review rather than for sending." },
          { title: "Investigator UI", body: "Navigate to source, amend, approve or flag." },
          { title: "Full audit log", body: "Of every review decision." }
        ],
        industries: ["financial-services", "manufacturing", "professional-services", "public-sector"],
        industriesNote: "The pattern is the same wherever an event opens a case and the evidence sits in several systems at once.",
        scope: {
          in: [
            "One agreed case category, on historical non-production records",
            "Evidence assembled across operational systems, correspondence and documents",
            "Case summary, chronological timeline and draft response sections per case",
            "Sentence- and field-level citation on every statement",
            "The investigator UI, with amend, approve or flag and a full audit log"
          ],
          out: [
            "Deciding the outcome — the system assembles and drafts, a person decides",
            "Anonymization and masking of source records: a data-supply precondition, not a feature",
            "Sending or filing the drafted response",
            "Live source integration and production approval workflow — Roll-out scope",
            "Additional case categories and source systems — Scaling scope"
          ]
        },
        moreDetail: [
          { title: "The pattern", body: "An event or a batch sweep opens a case → evidence assembled across systems and documents → an evidence file with a draft finding. A person decides the outcome; the system only retrieves and assembles." },
          { title: "Case summary", body: "A concise narrative of the case, the key facts and an investigative overview, with every claim cited to the exact source sentence or document field." },
          { title: "Chronological event timeline", body: "All recorded actions, communications and decisions from intake to resolution, with timestamps and clickable source references." },
          { title: "Draft response sections", body: "Draft text for the sections of the formal response, with clear citations and provenance for every statement, presented for review, amendment and approval before any use." },
          { title: "The investigator UI is the deliverable", body: "The central deliverable is a human-in-the-loop investigator UI through which investigators interact with the outputs, navigate to cited source evidence, amend content, and record approval decisions." },
          { title: "Scope boundary", body: "The system assembles and drafts; a person decides. Anonymization and masking of source records are a data-supply precondition, not a feature of the pack — historical, non-production data is supplied already fit for processing." },
          { title: "Case investigator", body: "A new complaint triggers evidence collection and summary from multiple systems, presented for approval." },
          { title: "Financial-crime analyst", body: "A flagged transaction or AML alert investigated across parties, accounts and linked cases into one file, with the regulatory filing drafted for review." },
          { title: "Employee-relations partner", body: "A grievance intake builds a chronology from tickets, mail and policy references." },
          { title: "Quality manager", body: "A customer complaint triggers a batch-record and supplier-history review with a draft root-cause report." }
        ],
        successStory: {
          title: "SUCCESS STORY",
          state: "none",
          blurb: "",
          emptyLabel: "First engagement in preparation — proof points will be published here."
        }
      },
      technology: {
        narrative: "Exports from your operational systems land read-only in your own OCI tenancy. NVIDIA AI-Q reasons across them, and every statement in the assembled case is bound to the source record it came from.",
        flow: [
          { step: "Sources", label: "Case management, correspondence, operational records, document stores" },
          { step: "Ingest", label: "Exports landed in your tenancy, read-only" },
          { step: "Reason", label: "Multi-document reasoning, timeline construction, citation binding" },
          { step: "Deliver", label: "Investigator UI: amend, approve or flag, fully audited" }
        ],
        groups: [
          { vendor: "oracle", label: "Oracle Cloud Infrastructure", items: ["Tenancy, object storage and the AI cluster", "Oracle enterprise AI services for multi-tool orchestration over live systems"] },
          { vendor: "nvidia", label: "NVIDIA", items: ["AI-Q Blueprint for multi-document reasoning and output generation"] },
          { vendor: "oracle", label: "Oracle AI Data Platform", items: ["Optional — where the evidence base is reconciled in the data layer rather than at query time"] },
          { vendor: "softserve", label: "SoftServe application layer", items: ["Evidence assembly", "Timeline construction", "Citation binding", "Investigator UI"] }
        ],
        notUsed: ["Oracle Autonomous AI Lakehouse"],
        layers: [
          { layer: "OCI infrastructure + GPUs", providedBy: "Oracle", body: "Oracle OCI with NVIDIA GPUs, plus Oracle enterprise AI services for multi-tool orchestration" },
          { layer: "NVIDIA AI-Q engine", providedBy: "NVIDIA", body: "Multi-document reasoning and output generation" },
          { layer: "Accelerator business app", providedBy: "Oracle + SoftServe", body: "Evidence assembly, timeline construction, citation binding, investigator UI" },
          { layer: "Custom configuration", providedBy: "SoftServe", body: "Source mapping, case categories, citation granularity, approval workflow" }
        ],
        integration: [
          { icon: "inbound", text: "In: exports from the systems that hold case evidence — case management, correspondence, operational records, rostering, document stores" },
          { icon: "outbound", text: "Out: the assembled case file and draft sections, plus the approval record" },
          { icon: "trigger", text: "Trigger: an event opens a case, or a batch sweep opens many" }
        ],
        security: [
          { icon: "shield", text: "Runs in the customer's own tenancy; source access is read-only." },
          { icon: "lock", text: "Access rules must hold in the data layer, not in the prompt — governance is configured, not requested." },
          { icon: "audit", text: "Every review action is logged; findings are traceable independently by a second reviewer." },
          { icon: "eye", text: "Every statement is bound to the exact source sentence or field it came from." }
        ]
      },
      pov: {
        heading: "PROOF-OF-VALUE SCOPE",
        facts: {
          duration: "12–15 weeks",
          team: "One SoftServe team",
          price: "Scoped per engagement",
          deliverablesCount: 4
        },
        scope: "One case category, on historical non-production records, with a validated sample the customer's experts have already adjudicated. Prove that an assembled, cited case file is faster to produce and holds up to review.",
        duration: "12–15 weeks (indicative; scoped per engagement)",
        durationShort: "12–15 weeks",
        team: "One team: AI, data and OCI architects, a product manager and a project manager, and senior AI and data engineers. The team grows with the scope.",
        prerequisites: {
          title: "PREREQUISITES WE ASK OF YOU",
          items: [
            "An agreed case category and a historical sample",
            "A validation sample of adjudicated cases, confirmed by your own experts",
            "Named subject-matter experts and data owners",
            "An agreed transfer route, and the security and processing requirements that apply",
            "Tenancy and access provisioned before the start date"
          ]
        },
        deliverables: [
          "Assembled, cited case files for the sample",
          "A measured readout against the three criteria: operational efficiency, output validation rate, evidence coverage",
          "The investigator UI running on your tenancy",
          "A costed proposal for the next step"
        ],
        pricing: [
          { label: "Services (one-time)", value: "Scoped per engagement", note: "No package price is published for this application." },
          { label: "Timeline", value: "12–15 weeks (indicative; scoped per engagement)" }
        ],
        disclaimers: [
          "Framed scope, flexible add-ons. Each package's price and timing are set by specific constraints. Custom features beyond the frame are added for additional price and time."
        ],
        ladder: [
          {
            tier: "proof-of-value",
            title: "Proof of value",
            scope: "Prove the gains on your own data and rules, in a separate environment. Zero integration.",
            includes: ["One case category on historical, non-production records", "Assembled, cited case files for the agreed sample", "The investigator UI, sandboxed on your tenancy"],
            duration: "12–15 weeks (indicative; scoped per engagement)",
            pricing: "Scoped per engagement"
          },
          {
            tier: "rollout",
            title: "Roll-out",
            scope: "Full setup, data integration and go-live for one domain or one location — no manual work, embedded in the workflow.",
            includes: ["Live source integration", "Production approval workflow and audit", "Production hardening"],
            duration: "3–5 months",
            pricing: "Scoped per engagement"
          },
          {
            tier: "scaling",
            title: "Scaling",
            scope: "Scaling across locations, domains or document types, with heterogeneous rules and data workflows per region.",
            includes: ["Additional case categories", "Additional source systems", "Regional rule and retention sets"],
            duration: "3–12 months",
            pricing: "Scoped per engagement"
          }
        ],
        ladderFootnote: "No fixed package price is published for this application yet. The scope above is the shape every engagement follows; the price is set once the sample, the sources and the success metrics are agreed."
      },
      sellers: {
        materials: [
          { key: "sales-deck", title: "Sales deck", description: "Problem, the three per-case outputs, architecture, the engagement shape.", state: "coming-soon" },
          { key: "one-pager", title: "One-pager", description: "Scope, where it applies, what the proof of value measures.", state: "coming-soon" },
          { key: "feature-list", title: "Feature list", description: "The capability matrix: baseline, built, custom per engagement.", state: "coming-soon" },
          { key: "demo-video", title: "Demo video", description: "A recorded walkthrough of the investigator UI.", state: "coming-soon" }
        ],
        emptyPanelCopy: "Materials in preparation. This pack is being packaged now. For a scoping conversation, or a walkthrough of how the pattern works on a live system landscape, use the contact below.",
        notes: []
      }
    },
    {
      slug: "plan-vs-actual-investigation",
      name: "Plan vs actual investigation",
      headline: { accent: "PLAN", rest: "VS ACTUAL INVESTIGATION" },
      category: "deep-research",
      categoryChip: "Deep research",
      facet: "oci-nvidia",
      availability: "in-preparation",
      availabilityChip: "In preparation",
      availabilityTooltip: "Packaged offering in preparation; scoping conversations are open today.",
      oneLiner: "Sweep completed units of work, compare plan against actual, and assemble the variances and their candidate drivers — with evidence — out of fragmented source systems.",
      tags: ["Deep research", "OCI + NVIDIA", "AI-Q", "In preparation"],
      hero: {
        image: {
          file: "assets/img/heroes/plan-vs-actual-investigation.jpg",
          alt: "Planned and actual progress lines diverging across a dark technical grid",
          focal: "50% 50%"
        }
      },
      tile: {
        outcomes: [
          "Plan-versus-actual at the level of a project, work package, order, engagement or campaign",
          "Variances and candidate drivers presented as evidence-backed candidates, never as conclusions",
          "Unresolved records are reported as coverage gaps rather than quietly dropped"
        ]
      },
      overview: {
        problemSolution: {
          problem: {
            title: "THE PROBLEM",
            text: "Historical performance records sit in incompatible systems — a schedule tool, cost reports, progress reports, scanned contracts — at inconsistent granularity. Nobody can say reliably which units of work deviated from plan, by how much, and why.",
            icon: "alert"
          },
          solution: {
            title: "THE SOLUTION",
            text: "Reconstruct the records into a consistent unit-level performance view: plan versus actual on cost and schedule, supported variances, recurring patterns and candidate drivers — each material finding tied to source evidence and validated by your own experts.",
            icon: "spark"
          }
        },
        metrics: [
          { value: null, label: "Operational efficiency", qualifier: "Elapsed time and person-hours for an equivalent unit-level analysis", icon: "clock" },
          { value: null, label: "Output validation rate", qualifier: "Variances, patterns and drivers confirmed by ground truth or your experts", icon: "check" },
          { value: null, label: "Evidence coverage", qualifier: "Material findings linked to sufficient source evidence, with a review status", icon: "link" },
          { value: null, label: "Coverage gaps reported", qualifier: "Unresolved records surfaced, never quietly dropped", icon: "alert" }
        ],
        metricsNote: "No published metrics yet. The proof of value measures three things, with the thresholds agreed at discovery rather than asserted up front.",
        roi: {
          icon: "roi",
          text: "The output is not a report; it is the ability to ask \"which of these went wrong, and what does the record actually say about why\" and get an answer with sources attached. Value shows up as the analysis that used to be too expensive to run — across every completed unit, not the three someone had time for."
        },
        features: [
          "Ingest and profile approved static exports, preserving lineage",
          "Configuration-driven mapping to project, zone and unit level",
          "Unresolved records reported as coverage gaps, not dropped",
          "Plan-versus-actual comparison at unit level, on cost and schedule",
          "Variances, recurring patterns and candidate drivers as evidence-backed candidates",
          "An evidence layer over documents: extraction, embeddings, entity retrieval",
          "A purpose-built lightweight review app, not a chat interface"
        ],
        featuresDetail: [
          { title: "Ingest and profile", body: "Approved static exports from the available source systems, preserving lineage." },
          { title: "Configuration-driven mapping layer", body: "Resolves records to project, zone and unit at the lowest reliable level — and reports unresolved records as coverage gaps rather than dropping them." },
          { title: "Plan-versus-actual comparison", body: "At unit level, on cost and schedule." },
          { title: "Supported variances, recurring patterns and candidate drivers", body: "Presented as evidence-backed candidates, never as conclusions." },
          { title: "An evidence layer over documents", body: "Text extraction, chunking, embeddings and entity extraction, with semantic, lexical and entity retrieval routed per question." },
          { title: "A purpose-built lightweight application", body: "Where the results are presented and reviewed." }
        ],
        industries: ["construction", "manufacturing", "professional-services", "retail"],
        industriesNote: "Wherever completed units of work — projects, work packages, orders, engagements, campaigns — have to be compared against what was planned for them.",
        scope: {
          in: [
            "One anchor portfolio or project, one agreed sample",
            "Approved static exports ingested and profiled with lineage preserved",
            "Records resolved to the lowest reliable unit level, with a coverage-gap report",
            "Plan-versus-actual comparison on cost and schedule, at unit level",
            "Evidence-backed variances, recurring patterns and candidate drivers, expert-reviewed"
          ],
          out: [
            "Ranking suppliers, selecting vendors, or making planning decisions",
            "Enterprise-wide normalization or master-data remediation",
            "Cross-project benchmarking beyond the agreed sample",
            "Live source feeds in place of static exports — Roll-out scope",
            "Contracting or packaging decisions taken on the proof's output"
          ]
        },
        moreDetail: [
          { title: "What this covers", body: "Completed units of work — projects, work packages, orders, engagements, campaigns — swept and compared plan versus actual, with variances and candidate drivers assembled from fragmented sources. Ledger-only budget-versus-actual commentary stays with your EPM system; this is the layer that explains the number." },
          { title: "\"Evidence-backed\" has a testable definition", body: "Every finding carries: the project and unit context · a traceable source file and version, plus the supporting record or passage · the analytical basis · a confidence and review status · and the visible gaps. A reviewer must be able to trace any finding independently." },
          { title: "Decision ownership stays with you", body: "Reconstruct historical records into a consistent unit-level performance view: plan versus actual cost and schedule per unit, supported variances, recurring patterns, candidate drivers and execution outcomes — each material finding tied to source evidence and validated by a subject-matter expert. The system does not make planning or execution-model decisions." },
          { title: "Explicit exclusions", body: "The system assembles evidence; it does not rank suppliers, select vendors, or make planning decisions. Normalization is scoped to the sample and designed for extension — not enterprise-wide normalization or master-data remediation." },
          { title: "Project controller", body: "Completed projects and work packages swept and compared plan-versus-actual; each cost or schedule variance and its candidate drivers cited to source records, reviewed with planning experts before use." },
          { title: "Operations manager, order portfolios", body: "Completed orders compared against what was planned for them, with the cost and schedule gaps traced back to the records that explain them." },
          { title: "Delivery lead, client engagements", body: "Closed engagements swept for where effort and schedule diverged from the plan, and what the record says about why." },
          { title: "Campaign owner", body: "Completed campaigns measured against plan, with the candidate drivers assembled from the systems that hold the spend, the schedule and the outcome." }
        ],
        successStory: {
          title: "SUCCESS STORY",
          state: "none",
          blurb: "",
          emptyLabel: "First engagement in preparation — proof points will be published here.",
          adjacentMethodId: "method-accuracy-journey"
        }
      },
      technology: {
        narrative: "Static exports land in zoned OCI storage with lineage preserved. A conformed model resolves records to the lowest reliable unit, plan and actual are compared with cited drivers, and anything that could not be resolved is reported as a coverage gap.",
        flow: [
          { step: "Sources", label: "Schedule, cost and progress reporting, layouts, contracts, amendments" },
          { step: "Ingest", label: "Zoned OCI storage with lineage; conformed model and mapping layer" },
          { step: "Reason", label: "Plan-versus-actual comparison, drivers, hybrid retrieval over evidence" },
          { step: "Deliver", label: "Review app: findings, citations and the coverage-gap report" }
        ],
        groups: [
          { vendor: "oracle", label: "Oracle Cloud Infrastructure", items: ["Object Storage (zoned, with lineage)", "Document Understanding for OCR and layout", "Functions and Streaming, API Gateway, Functions/OKE", "GPU compute"] },
          { vendor: "nvidia", label: "NVIDIA", items: ["AI-Q framework", "NIM serving the Nemotron model family", "NIM embedding and reranker models"] },
          { vendor: "oracle", label: "Oracle data layer", items: ["Oracle AI Database 26ai with Oracle AI Vector Search for semantic retrieval", "OCI Search with OpenSearch for lexical retrieval (hybrid)", "Oracle AI Data Platform, optionally, where the reconciled evidence base is built in the data layer"] },
          { vendor: "softserve", label: "SoftServe application layer", items: ["Conformed data model and the mapping layer", "Plan-versus-actual comparison and driver assembly", "Context manager and response handler", "The review app"] }
        ],
        notUsed: ["Oracle Autonomous AI Lakehouse"],
        layers: [
          { layer: "OCI infrastructure + GPUs", providedBy: "Oracle", body: "Oracle OCI with NVIDIA GPUs — compute, zoned object storage with lineage, networking, security; Oracle Document Understanding for OCR and layout" },
          { layer: "NVIDIA engine", providedBy: "NVIDIA", body: "AI-Q, with NIM serving the Nemotron model family and NIM embedding and reranker models" },
          { layer: "Accelerator business app", providedBy: "Oracle + SoftServe", body: "Conformed data model, the mapping layer, plan-versus-actual comparison, hybrid retrieval over Oracle AI Vector Search and OCI Search with OpenSearch on Oracle AI Database 26ai, and the review app" },
          { layer: "Custom configuration", providedBy: "SoftServe", body: "Source mapping, the unit identifier, variance rules, evidence thresholds and the coverage-gap report" }
        ],
        integration: [
          { icon: "inbound", text: "In: approved static exports — schedule, cost and forecast reporting, progress reporting, layouts, contracts, bills of quantity, amendments" },
          { icon: "outbound", text: "Out: the unit-level performance view and its evidence pack, in the review app" },
          { icon: "link", text: "A unified work-unit identifier across the exported datasets is the one hard input requirement" }
        ],
        security: [
          { icon: "shield", text: "Runs in your own OCI tenancy on exported, approved data — no live system access required at proof of value." },
          { icon: "audit", text: "Lineage preserved from the source file through to the finding." },
          { icon: "eye", text: "The proof produces analytical output for review; it is not relied on as the basis for contracting or packaging decisions during the engagement." },
          { icon: "lock", text: "Unresolved records are reported as coverage gaps, so nothing disappears silently from the evidence base." }
        ]
      },
      pov: {
        heading: "PROOF-OF-VALUE SCOPE",
        facts: {
          duration: "12 weeks + 2",
          team: "One SoftServe team",
          price: "Scoped per engagement",
          deliverablesCount: 5
        },
        scope: "One anchor portfolio or project, one agreed sample. Reconstruct, compare, and produce evidence-backed findings a subject-matter expert can validate.",
        duration: "12 weeks, plus a two-week acceptance phase",
        durationShort: "12 weeks plus a two-week acceptance phase",
        durationNote: "Discovery is compressed into the first two weeks and ends at a gate.",
        phases: "Discovery (2 weeks, gated) → technical framework setup (2 weeks) → analysis logic and orchestration (4 weeks) → evidence-backed output (2 weeks) → validation, demo and roadmap.",
        team: "One team: AI, data and OCI architects, a product manager and a project manager, and senior AI and data engineers. The team grows with the scope.",
        prerequisites: {
          title: "PREREQUISITES WE ASK OF YOU",
          items: [
            "An agreed project or portfolio sample",
            "Historical periodic records per unit since start — cost, schedule, quantity, execution model, issues, evidence",
            "A unified work-unit identifier across the exported datasets, at the lowest reliable level",
            "A validation sample of at least ten known variance cases each for scope and schedule, confirmed by your experts",
            "Named subject-matter experts and data owners",
            "An agreed transfer route, plus the security and processing requirements that apply",
            "Tenancy, access and the accelerator pack provisioned before the start date"
          ]
        },
        deliverables: [
          "A unit-level plan-versus-actual view over the sample, with lineage",
          "Supported variances, recurring patterns and candidate drivers, each evidence-backed and expert-reviewed",
          "A measured readout against operational efficiency, output validation rate and evidence coverage",
          "A coverage-gap report — what could not be resolved, and why",
          "A costed proposal for extension beyond the sample"
        ],
        pricing: [
          { label: "Services (one-time)", value: "Scoped per engagement", note: "No package price is published for this application." },
          { label: "Timeline", value: "12 weeks, plus a two-week acceptance phase" }
        ],
        disclaimers: [
          "Framed scope, flexible add-ons. Each package's price and timing are set by specific constraints. Custom features beyond the frame are added for additional price and time."
        ],
        gateNote: "Stage gates at framework readiness, analytical review and evidence output.",
        ladder: [
          {
            tier: "proof-of-value",
            title: "Proof of value",
            scope: "Prove the gains on your own data and rules, in a separate environment. Zero integration.",
            includes: ["One anchor portfolio or project, one agreed sample", "Unit-level plan-versus-actual view with lineage", "Evidence-backed variances, patterns and candidate drivers", "A coverage-gap report"],
            duration: "12 weeks, plus a two-week acceptance phase",
            pricing: "Scoped per engagement"
          },
          {
            tier: "rollout",
            title: "Roll-out",
            scope: "Full setup, data integration and go-live for one domain or one location — no manual work, embedded in the workflow.",
            includes: ["Live source feeds in place of static exports", "Extension beyond the anchor sample", "Production hardening"],
            duration: "3–5 months",
            pricing: "Scoped per engagement"
          },
          {
            tier: "scaling",
            title: "Scaling",
            scope: "Scaling across locations, domains or document types, with heterogeneous rules and data workflows per region.",
            includes: ["Additional portfolios and unit types", "Regional variance rules", "Multi-entity evidence retention"],
            duration: "3–12 months",
            pricing: "Scoped per engagement"
          }
        ],
        ladderFootnote: "No fixed package price is published for this application yet. The scope above is the shape every engagement follows; the price is set once the sample, the sources and the success metrics are agreed."
      },
      sellers: {
        materials: [
          { key: "sales-deck", title: "Sales deck", description: "The class of work, the evidence definition, architecture, the phased engagement shape.", state: "coming-soon" },
          { key: "one-pager", title: "One-pager", description: "Scope, prerequisites, the three success criteria.", state: "coming-soon" },
          { key: "feature-list", title: "Feature list", description: "The capability matrix: baseline, built, custom per engagement.", state: "coming-soon" },
          { key: "demo-video", title: "Demo video", description: "A recorded walkthrough of the review app.", state: "coming-soon" }
        ],
        emptyPanelCopy: "Materials in preparation. This pack is being packaged now. For a scoping conversation, or a walkthrough of how the pattern works on a live system landscape, use the contact below.",
        notes: []
      }
    },
    {
      slug: "large-document-extraction",
      name: "Large Docs Extraction and Review",
      headline: { accent: "LARGE", rest: "DOCS EXTRACTION AND REVIEW" },
      category: "processing-pipelines",
      categoryChip: "Processing pipelines",
      facet: "oci-nvidia",
      availability: "available",
      availabilityChip: "Available now",
      availabilityTooltip: "A packaged offering exists — collateral and a scoped proof of value, with a first engagement delivered or under way.",
      oneLiner: "Turn long, complex documents into trusted, validated structured data with NVIDIA AI-Q on Oracle OCI: packaged from proof of value to enterprise scale.",
      heroCaption: "100-page contract in minutes.",
      tags: ["Processing pipelines", "OCI + NVIDIA", "AI-Q", "Available now"],
      hero: {
        image: {
          file: "assets/img/heroes/large-document-extraction.jpg",
          alt: "Dense printed contract pages resolving into clean structured rows",
          focal: "50% 45%"
        }
      },
      tile: {
        outcomes: [
          "A 60–100-page contract extracted end to end in 5–15 minutes, down from 3–5 days",
          "Every extracted value carries a confidence score and a citation to its source page",
          "Reviewers validate in a split-view UI and export — they review the data, they don't type it"
        ]
      },
      overview: {
        problemSolution: {
          problem: {
            title: "THE PROBLEM",
            text: "Operations teams read long, complex contracts and key the data into downstream systems by hand — page by page, transcribing rates, rules and terms. Slow, error-prone, and dependent on scarce specialists.",
            icon: "alert"
          },
          solution: {
            title: "THE SOLUTION: REVIEW THE DATA, NOT TYPE IT",
            text: "NVIDIA AI-Q on Oracle OCI classifies each document, routes it page by page and extracts the target fields against business rules — scoring confidence and citing the source page for every value. Reviewers validate in a split-view UI, then export.",
            icon: "spark"
          }
        },
        metrics: [
          { value: "5–15 min", label: "To extract a 60–100-page contract end to end", qualifier: "Down from 3–5 days by hand", icon: "clock" },
          { value: "up to −20%", label: "Manual data-entry effort", qualifier: "Targeted reduction at proof of value", icon: "trendDown" },
          { value: "7–12%", label: "Of an airline's direct operating cost", qualifier: "Carried in ground-handling rates — the error class this protects", icon: "alert" },
          { value: null, label: "Confidence and a page citation", qualifier: "On every extracted value, before anything is exported", icon: "shield" }
        ],
        metricsNote: "Targets from the proof-of-value; figures are illustrative, not contractual.",
        roi: {
          icon: "roi",
          text: "Two effects compound. Cycle time collapses — a document that took days moves in minutes, so onboarding a new counterparty stops being a month-long project. And the error class that costs the most, a rate keyed wrong and found at invoice reconciliation, is caught at review against a cited source page instead."
        },
        features: [
          "Document-type gate, then page-level routing to the right extractor",
          "Field schema and business rules defined per document type",
          "Per-field confidence scoring with tuned thresholds and fallback logic",
          "Source-page citation on every extracted value",
          "Structured data model: ranges and tiers expanded, relationships preserved",
          "Business-rule validators that flag what a human must look at",
          "Split-view reviewer UI with bulk actions, auto-save and an audit trail",
          "Export to JSON, CSV or XLSX against a reference template"
        ],
        featuresDetail: [
          { title: "Document-type gate and page-level routing", body: "Classify the document, then route each page to the right extractor." },
          { title: "Field schema and business rules", body: "The target fields and the rules they must satisfy, defined per document type." },
          { title: "Per-field confidence scoring", body: "With tuned thresholds, and fallback logic when a page label or a field scores low." },
          { title: "Source-page citations", body: "Every extracted value points back to the page or section it came from." },
          { title: "Structured data model", body: "Complex entities modeled into normalized rows, with ranges and tiers expanded and parent-child relationships preserved." },
          { title: "Validators and reviewer warnings", body: "A business-rule validator set that flags what a human must look at." },
          { title: "Split-view reviewer UI", body: "Source PDF beside extracted rows, per-row confidence badges, approve/edit/reject with bulk actions, auto-save and an audit trail." },
          { title: "Export", body: "JSON, CSV or XLSX against a reference template, into the cost or ERP system." }
        ],
        industries: ["travel-transport", "professional-services", "insurance", "financial-services"],
        industriesNote: "Wherever the terms that drive a downstream system are locked inside long, semi-structured documents.",
        scope: {
          in: [
            "Ingestion — accept a document (PDF or DOCX, including scanned)",
            "Classification and extraction of the agreed fields against business rules",
            "Per-value source citations and per-field confidence scoring",
            "Human review and correction in the split-view UI before export",
            "Export to JSON, CSV or XLSX against a reference template"
          ],
          out: [
            "Matching or reconciliation against another system of record",
            "Non-document data sources — reference tables, catalogs or external systems, not document text",
            "Full automation without human validation — a human validates by design",
            "Write-back and system integration — delivered at Roll-out",
            "Native multi-language processing — English at proof of value; more is custom work",
            "Production hardening: enterprise scale, security audit, HA/DR, IAM/SSO"
          ]
        },
        moreDetail: [
          { title: "Scope, in one paragraph", body: "The pack pulls structured data out of long, complex, semi-structured documents — classifying the document, routing it page-by-page, extracting the target fields against agreed business rules, scoring confidence, and presenting the result in a human-in-the-loop review UI. It is a decision-support system: all output is human-validated before downstream use." },
          { title: "Today", body: "Operators read each contract and key rate cards in by hand." },
          { title: "Tomorrow", body: "The reviewer uploads a contract, the extraction pipeline runs on OCI, and the reviewer validates extracted rates side-by-side with the source PDF before export." },
          { title: "Slow onboarding", body: "3–5 days per contract, ~1 month to bring a new station online." },
          { title: "Costly errors", body: "Manual transcription causes rate mismatches and duplicate billing that surface late, at invoice matching." },
          { title: "Poor scalability", body: "Throughput hinges on scarce specialists, so contract backlogs build up." },
          { title: "Why the error class is expensive", body: "In aviation, ground-handling contracts carry 7–12% of an airline's direct operating cost — so a rate keyed wrong is expensive, and it surfaces late." },
          { title: "Use-case boundaries", body: "The boundary of this solution is extraction of structured data from complex documents into a validated, human-reviewed output." },
          { title: "Aviation — ground-handling and operational contracts", body: "Extract rate-card pricing from Standard Ground Handling Agreements; pull rates, terms and return conditions from aircraft lease and MRO agreements." },
          { title: "Legal & commercial contracts", body: "Extract key terms, obligations, pricing and renewal/termination dates from MSAs and supplier agreements; capture rent schedules, break clauses and escalation terms from property leases." },
          { title: "Insurance — policies & claims", body: "Extract coverage, limits, deductibles and endorsements from policy schedules; pull loss details and reserve amounts from claim packs and loss-adjuster reports." },
          { title: "Financial & regulatory filings", body: "Extract financial line items and disclosures from annual reports; capture covenants, interest terms and repayment schedules from loan and credit agreements." }
        ],
        successStory: {
          title: "SUCCESS STORY",
          state: "published",
          blurb: "Ground-handling contract rates were keyed into a cost-management system by hand — 60–100-page agreements read page by page, 3–5 days per contract. With the extraction app on OCI (NVIDIA AI-Q), reviewers now validate AI-extracted rates side-by-side with the source PDF — every value cited to its page — and export in minutes.",
          results: [
            { value: "3–5 days → 5–15 min", label: "to extract a 60–100-page ground-handling contract end to end" },
            { value: "up to −20%", label: "targeted reduction in manual data-entry effort (proof of value)" }
          ],
          footnotes: [
            "Targets from the proof of value; figures are illustrative, not contractual."
          ],
          evidenceId: "extraction-proof"
        }
      },
      technology: {
        narrative: "Contracts land from your repository into the extraction app on a dedicated AI cluster in your own Oracle Cloud Infrastructure tenancy. NVIDIA AI-Q returns every field with a confidence score and a page citation; only approved rows are exported.",
        flow: [
          { step: "Sources", label: "Contract repository — PDF and DOCX, including scanned" },
          { step: "Extract", label: "Document-type gate, page-level routing, field extraction" },
          { step: "Validate", label: "Confidence scoring, business-rule validators, page citations" },
          { step: "Deliver", label: "Split-view review, then export to the cost or ERP system" }
        ],
        groups: [
          { vendor: "oracle", label: "Oracle Cloud Infrastructure", items: ["A dedicated GenAI AI cluster (H100 class)", "Oracle Autonomous Database for the extraction store", "The landing zone (VCN, OKE, storage) delivered as Terraform", "Oracle Document Understanding for OCR and layout, where scanned input needs it"] },
          { vendor: "nvidia", label: "NVIDIA", items: ["AI-Q for GPU-accelerated extraction — vision-language models plus retrieval"] },
          { vendor: "oracle", label: "Oracle AI Data Platform", items: ["Only where extractions also feed analytics; not the system of record for this pack"] },
          { vendor: "softserve", label: "SoftServe application layer", items: ["Extraction pipeline and field schema", "Validator set and confidence thresholds", "Split-view reviewer UI", "Export and target-system integration"] }
        ],
        notUsed: ["Oracle Autonomous AI Lakehouse"],
        layers: [
          { layer: "OCI infrastructure + GPUs", providedBy: "Oracle", body: "Oracle OCI with NVIDIA GPUs — compute, storage, networking, security" },
          { layer: "NVIDIA AI-Q engine", providedBy: "NVIDIA", body: "GPU-accelerated extraction — vision-language models plus retrieval" },
          { layer: "Accelerator business app", providedBy: "Oracle + SoftServe", body: "Pre-built, reusable pack: extraction pipeline, validators, split-view reviewer UI, export" },
          { layer: "Custom configuration", providedBy: "SoftServe", body: "Field schema, business rules, thresholds, target-system integration" }
        ],
        integration: [
          { icon: "inbound", text: "In: contract repository (source PDFs), field rules" },
          { icon: "outbound", text: "Out: extracted data, rates and terms — cited — to cost / ERP systems" },
          { icon: "link", text: "Export formats: JSON, CSV, XLSX against a reference template" }
        ],
        security: [
          { icon: "shield", text: "Runs in the customer's own OCI tenancy on a dedicated AI cluster." },
          { icon: "lock", text: "Human-in-the-loop by design: unattended extraction is explicitly out of scope." },
          { icon: "audit", text: "Full audit trail on review actions; every value traceable to its source page." },
          { icon: "eye", text: "Production hardening — enterprise scale, security audit, HA/DR, IAM/SSO — is Roll-out scope, not proof-of-value scope." }
        ]
      },
      pov: {
        heading: "PROOF-OF-VALUE SCOPE",
        facts: {
          duration: "2 months",
          team: "One SoftServe team",
          price: "€75K services · €0/mo infra",
          deliverablesCount: 4
        },
        scope: "Manual upload, core field schema: prove accuracy and effort savings on the customer's contracts.",
        duration: "2 months",
        durationShort: "2 months",
        team: "One team: AI, data and OCI architects, a product manager and a project manager, and senior AI and data engineers. The team grows with the scope.",
        deliverables: [
          "Your own contracts extracted end to end, with per-field confidence and page citations",
          "Accuracy measured against an annotated ground-truth set, plus an effort-savings readout",
          "The split-view reviewer UI running on your tenancy",
          "A costed Roll-out proposal: integration to the target system, the second document type, production hardening"
        ],
        pricing: [
          { label: "Services (one-time)", value: "€75K" },
          { label: "Infrastructure (monthly, consumption)", value: "€0" },
          { label: "Timeline", value: "2 months" }
        ],
        disclaimers: [
          "* Indicative; depends on document volume, page counts and pipeline complexity",
          "Figures are illustrative and subject to confirmation.",
          "Framed scope, flexible add-ons. Each package's price and timing are set by specific constraints. Custom features beyond the frame are added for additional price and time."
        ],
        ladder: [
          {
            tier: "proof-of-value",
            title: "Proof of value",
            scope: "Manual upload, core field schema: prove accuracy and effort savings on the customer's contracts.",
            includes: ["Classification & routing", "Extraction rules & field schema (partial)", "Confidence scoring & validation (partial)", "Human-in-the-loop review UI", "Accuracy benchmarking & KPIs", "Deployment (partial)"],
            duration: "2 months",
            pricing: "Services €75K · Infrastructure €0/mo"
          },
          {
            tier: "rollout",
            title: "Roll-out",
            scope: "Full setup and integration, live for one document type: no manual plumbing, embedded in the workflow.",
            includes: ["Classification & routing", "Extraction rules & field schema", "Confidence scoring & validation", "Human-in-the-loop review UI", "Accuracy benchmarking & KPIs", "Source / target integration", "Deployment"],
            duration: "3–5 months",
            pricing: "Services €300–500K · Infrastructure ~€10K/mo *"
          },
          {
            tier: "scaling",
            title: "Scaling",
            scope: "Scaling across document types, volume and business units: type-specific schemas and validation.",
            includes: ["Every Roll-out capability, multi-type / advanced", "Type-specific schemas and validation", "Multi-business-unit deployment"],
            duration: "3–12 months",
            pricing: "Scoped per engagement"
          }
        ],
        capabilityMatrix: {
          legend: "◐ partial · ● included · ●● multi-type / advanced",
          rows: [
            { label: "Classification & routing", pov: "●", rollout: "●", scaling: "●●" },
            { label: "Extraction rules & field schema", pov: "◐", rollout: "●", scaling: "●●" },
            { label: "Confidence scoring & validation", pov: "◐", rollout: "●", scaling: "●●" },
            { label: "Human-in-the-loop review UI", pov: "●", rollout: "●", scaling: "●●" },
            { label: "Accuracy benchmarking & KPIs", pov: "●", rollout: "●", scaling: "●●" },
            { label: "Source / target integration", pov: "—", rollout: "●", scaling: "●●" },
            { label: "Deployment", pov: "◐", rollout: "●", scaling: "●●" }
          ]
        }
      },
      sellers: {
        materials: [
          { key: "sales-deck", title: "Sales deck — service packages", description: "10 slides: problem/solution, where it applies, the reviewer flow today vs tomorrow, solution layers, reference architecture, the three packages, pricing and feature detail.", state: "link-pending" },
          { key: "one-pager", title: "Sales overview — 3 pages", description: "Problem, solution, architecture, case study, the three packages with pricing, CTA.", state: "link-pending" },
          { key: "feature-list", title: "Accelerator pack one-pager (capability matrix)", description: "The full matrix — what the Oracle + NVIDIA baseline provides, what SoftServe has built, and the custom work per engagement — plus use-case boundaries.", state: "superseded" },
          { key: "demo-video", title: "Demo video", description: "A recorded walkthrough of the split-view reviewer UI.", state: "coming-soon" },
          { key: "marketplace-package", title: "Oracle Marketplace package", description: "The listing package for the product's Oracle Marketplace entry.", state: "planned" }
        ],
        notes: [
          "Titled \"Large Document Extraction and Validation\" in the deck — same product, earlier name."
        ]
      }
    },
    {
      slug: "workforce-optimization",
      name: "Workforce optimization",
      headline: { accent: "WORKFORCE", rest: "OPTIMIZATION" },
      category: "data-analysis",
      categoryChip: "Data analysis & optimization",
      facet: "oci-nvidia",
      availability: "available",
      availabilityChip: "Available now",
      availabilityTooltip: "A packaged offering exists — collateral and a scoped proof of value, with a first engagement delivered or under way.",
      oneLiner: "Intelligent field-service planning with NVIDIA cuOpt on Oracle OCI: packaged from proof of value to enterprise scale.",
      heroCaption: "What if dispatchers reviewed the plan, not built it?",
      tags: ["Data analysis & optimization", "OCI + NVIDIA", "cuOpt", "Oracle Field Service", "Available now"],
      hero: {
        image: {
          file: "assets/img/heroes/workforce-optimization.jpg",
          alt: "Service territory rendered as routes and coverage zones over a dark map",
          focal: "55% 50%"
        }
      },
      tile: {
        outcomes: [
          "A region's four-week plan optimized and approved in ~30 minutes, down from ~2 days",
          "Dispatchers review the plan instead of building it — then export it straight to Oracle Field Service",
          "Native Oracle Field Service integration: known endpoints, no requirement engineering"
        ]
      },
      overview: {
        problemSolution: {
          problem: {
            title: "THE PROBLEM",
            text: "Field-service operators plan their mobile workforce by hand: work zones, technician assignments, dozens of rules and constraints. Workloads come out uneven, wait times long, and new zones launch slowly.",
            icon: "alert"
          },
          solution: {
            title: "THE SOLUTION: REVIEW THE PLAN, NOT BUILD IT",
            text: "NVIDIA cuOpt ingests demand, availability, skills and constraints and computes the best technician-to-zone-to-job plan in minutes. Dispatchers review it on a live map, re-optimize, and write the approved plan back to Oracle Field Service.",
            icon: "spark"
          }
        },
        metrics: [
          { value: "~30 min", label: "To optimize and approve a region's four-week plan", qualifier: "Down from ~2 days", icon: "clock" },
          { value: "+4.5%", label: "Median jobs per technician per day", qualifier: "83% of twelve modeled simulations positive", icon: "trendUp" },
          { value: "15–20%", label: "Dispatcher productivity gain in the pilot", qualifier: "The case was built on the conservative 15%", icon: "users" },
          { value: "~5x", label: "Modeled ROI within three years", qualifier: "On a phased rollout", icon: "roi" }
        ],
        metricsNote: "Results are modeled simulations against a historical baseline, not measured production outcomes. KPIs measured before/after on proof-of-value data; figures are illustrative, not contractual.",
        roi: {
          icon: "roi",
          text: "The gain is not a faster dispatcher — it is the same field force doing more jobs per day, with less travel and less waiting. A single-digit percentage improvement in technician productivity is a large absolute number once it runs across every region, which is why the proof measures productivity, capacity utilization and wait time before and after on your own historical data."
        },
        features: [
          "Work-zone and availability rules, with skill-based allocation",
          "Planned-vacation reallocation and same-day sickness handling",
          "Default, neighboring and cross-zone allocation",
          "Forecast-based allocation against a demand forecast you supply",
          "Commitment rules: non-movable appointments and SLA types per appointment *",
          "Multi-objective optimization with hard and soft rule weighting",
          "Dispatcher review UI: map and table views, approve, reject, re-run",
          "KPIs and analytics: productivity, utilization, travel, workload balance"
        ],
        featuresNote: "* Commitment-rule coverage is partial out of the box; the exact constraint set is confirmed in scoping.",
        featuresDetail: [
          { title: "Work-zone and availability rules", body: "Skill-based allocation, maximum load per day, planned-vacation reallocation, same-day sickness handling, default and neighboring work zones, cross-zone allocation." },
          { title: "Forecast-based allocation", body: "Allocate against a demand forecast you supply." },
          { title: "Commitment rules", body: "Non-movable appointments and different SLA types per appointment.*" },
          { title: "Multi-objective optimization", body: "Productivity, waiting time and workload balance, with hard/soft rule weighting and minimal disruption of the current allocation." },
          { title: "Dispatcher review UI", body: "Map and table views, approve or reject, with model-decision explanations and recommendations." },
          { title: "KPIs and analytics", body: "Productivity, capacity utilization, travel reduction and workload balance." }
        ],
        industries: ["manufacturing", "utilities", "telecom", "healthcare"],
        industriesNote: "Any mobile field force planned against skills, availability and geography.",
        scope: {
          in: [
            "Foundational allocation with the recurring, most-typical constraints — zones, skills, planned absences",
            "Core KPIs predicted at scheduling and measured against the signed benchmark",
            "The dispatcher review UI, with approve, reject and re-run",
            "Sandboxed deployment on your own tenancy",
            "A before/after KPI readout computed identically on both plans"
          ],
          out: [
            "Oracle Field Service integration — delivered at Roll-out",
            "Additional data sources and BI integration — delivered at Roll-out",
            "The re-optimization feedback loop — delivered at Roll-out",
            "Distance and travel-time rules with live traffic — on the roadmap",
            "Within-day dynamic reassignment and urgent-request handling — on the roadmap",
            "Spare-parts and crew-based assignment, and the human-feedback learning loop — on the roadmap"
          ]
        },
        moreDetail: [
          { title: "Today", body: "Dispatchers maintain work zones and technician allocations by hand, region by region, juggling ZIP-code coverage, skills, working days and absences, with little room to optimize." },
          { title: "Tomorrow", body: "The dispatcher uploads the period's data, runs cuOpt on OCI, and reviews the optimized allocation on a live map — comparing, approving or re-running before export to Oracle Field Service. The model finds the most optimal schedules, maximizing KPIs." },
          { title: "Suboptimal efficiency", body: "Uneven workloads and under-used capacity." },
          { title: "Lower customer satisfaction", body: "Longer wait times from suboptimal allocations." },
          { title: "Poor scalability", body: "Planning hinges on scarce senior dispatchers; new zones launch slowly." },
          { title: "How the KPIs are defined", body: "Time to plan: how long to optimize and approve a region's four-week plan. Productivity: jobs per technician per working day. Capacity utilization: booked activity time against available capacity. Customer wait time: calendar days between booking and appointment. Each is computed identically for the current plan and the optimized plan." },
          { title: "Delivered at roll-out", body: "Oracle Field Service integration — staff, availability and booking data in; optimized allocations (zones, visits) out; factual durations and times back. The architecture is native to Oracle Field Service; the integration itself is Roll-out scope, not proof-of-value scope. Also at Roll-out: additional data sources and BI integration (up to five typical integrations — booking, inventory for parts availability, HR/WFM for people availability, demand forecasting, BI), and the re-optimization feedback loop." },
          { title: "On the roadmap, not in the pack today", body: "Distance and travel-time rules with live traffic · within-day dynamic reassignment and urgent-request handling · spare-parts and crew-based assignment · the human-feedback learning loop." },
          { title: "Residential appliance & white-goods repair", body: "Dispatch home-repair technicians by skill, spare parts and travel — absorbing urgent call-outs and no-shows without re-planning the day." },
          { title: "Utilities — water, gas, electric", body: "Schedule field crews across service territories against SLAs, outage spikes and crew certifications, balancing planned and emergency work." },
          { title: "Telecom & cable", body: "Route install-and-repair technicians to tight appointment windows across regions, matching line skills and cutting customer wait time." },
          { title: "Industrial, medical-device & IT equipment service", body: "Allocate asset-based service engineers to contracted equipment by skill, SLA and location — keeping high-value machines uptime-critical." }
        ],
        successStory: {
          title: "SUCCESS STORY",
          state: "published",
          blurb: "Dispatchers at a global home-appliance manufacturer planned a residential appliance-repair field force by hand: ZIP-code work zones and technician allocations, region by region. With the cuOpt-powered dispatcher app on OCI, they now review, approve or re-run an optimized plan and export it straight to Oracle Field Service.",
          scopeLine: "A three-month proof of value across three countries, with around thirty real-world constraints modeled — skills, availability, existing bookings, travel and holidays — and dispatcher approval in the loop.",
          results: [
            { value: "~30 min", label: "to optimize and approve a region's four-week plan: down from ~2 days" },
            { value: "83%", label: "of twelve modeled simulations positive, at a median of +4.5% jobs per technician per day" },
            { value: "15–20%", label: "dispatcher productivity gain observed in the pilot; the case was built on the conservative 15%" },
            { value: "~5x", label: "modeled ROI within three years on a phased rollout" }
          ],
          footnotes: [
            "Results are modeled simulations against a historical baseline, not measured production outcomes.",
            "KPIs measured before/after on proof-of-value data; figures are illustrative, not contractual."
          ],
          emptyLabel: "No case summary is published yet.",
          evidenceId: "workforce-proof"
        }
      },
      technology: {
        narrative: "Oracle Field Service is the primary data source and the destination: technician, availability and booking data flows into a dedicated AI cluster on Oracle Cloud Infrastructure. NVIDIA cuOpt computes the allocation and the workforce-optimization app presents it to a dispatcher on a live map. Nothing reaches the field until a person approves it, and the approved plan is written back to Oracle Field Service.",
        flow: [
          { step: "Sources", label: "Oracle Field Service: staff, availability, bookings" },
          { step: "Ingest", label: "Demand, skills, work zones and constraints loaded" },
          { step: "Optimize", label: "cuOpt solves the technician-to-zone-to-job plan" },
          { step: "Deliver", label: "Dispatcher approves; plan written back to Oracle Field Service" }
        ],
        groups: [
          { vendor: "oracle", label: "Oracle Cloud Infrastructure", items: ["A dedicated AI cluster (4–8 NVIDIA A100 GPUs)", "Object storage, networking, IAM"] },
          { vendor: "nvidia", label: "NVIDIA", items: ["cuOpt, the GPU-accelerated optimization solver"] },
          { vendor: "oracle", label: "Oracle Fusion Applications", items: ["Oracle Field Service, as source and destination"] },
          { vendor: "softserve", label: "SoftServe application layer", items: ["Dispatcher review UI and approval workflow", "Re-solve loop", "Client rules, constraints and KPIs", "Write-back to Oracle Field Service"] }
        ],
        notUsed: ["Oracle AI Data Platform", "Oracle Autonomous AI Lakehouse"],
        layers: [
          { layer: "OCI infrastructure + GPUs", providedBy: "Oracle", body: "Oracle OCI with NVIDIA GPUs — compute, storage, networking, security" },
          { layer: "NVIDIA cuOpt engine", providedBy: "NVIDIA", body: "GPU-accelerated solver for large-scale workforce and route optimization" },
          { layer: "Accelerator business app", providedBy: "Oracle + SoftServe", body: "Pre-built, reusable pack: dispatcher UI, approval workflow, re-solve loop, write-back to Oracle Field Service" },
          { layer: "Custom configuration", providedBy: "SoftServe", body: "Client rules, constraints, KPIs, data integrations" }
        ],
        integration: [
          { icon: "inbound", text: "In from Oracle Field Service: staff, availability, booking data" },
          { icon: "outbound", text: "Out to Oracle Field Service: optimized allocations — zones, visits" },
          { icon: "trigger", text: "Back in from Oracle Field Service: factual durations and times" },
          { icon: "link", text: "Optional at Roll-out, up to five typical integrations: booking system, inventory for parts availability, HR/WFM for people availability, demand forecasting, BI" }
        ],
        security: [
          { icon: "shield", text: "Proof of value: sandboxed deployment." },
          { icon: "lock", text: "Roll-out: enterprise-integrated — dedicated landing zone, IAM, observability." },
          { icon: "audit", text: "Scaling: enterprise-integrated, multi-zone." },
          { icon: "eye", text: "The optimizer proposes; a dispatcher approves. No allocation reaches the field unreviewed." }
        ]
      },
      pov: {
        heading: "PROOF-OF-VALUE SCOPE",
        facts: {
          duration: "2 months",
          team: "One SoftServe team",
          price: "€90K services · €4K/mo infra",
          deliverablesCount: 4
        },
        scope: "Manual data import, limited rule set: prove the KPI gains on the customer's data.",
        inScope: "Foundational allocation with the recurring, most-typical constraints — zones, skills, planned absences · core KPIs predicted at scheduling against benchmarks · the dispatcher review UI · sandboxed deployment.",
        notInScope: "Oracle Field Service integration · additional data sources and BI · the re-optimization feedback loop.",
        duration: "2 months",
        durationShort: "2 months",
        team: "One team: AI, data and OCI architects, a product manager and a project manager, and senior AI and data engineers. The team grows with the scope.",
        deliverables: [
          "An optimized plan for a real region, computed on your own historical data",
          "A before/after KPI readout — productivity, capacity utilization, wait time — measured identically on both plans",
          "The dispatcher review UI, running in a sandboxed environment on your tenancy",
          "A costed proposal for Roll-out: integration scope, additional sources, timeline"
        ],
        pricing: [
          { label: "Services (one-time)", value: "€90K" },
          { label: "Infrastructure (monthly, consumption)", value: "€4K" },
          { label: "Timeline", value: "2 months" }
        ],
        disclaimers: [
          "* Indicative; depends on the usage and optimization rules complexity",
          "Figures are illustrative and subject to confirmation.",
          "Framed scope, flexible add-ons. Each package's price and timing are set by specific constraints. Custom features beyond the frame are added for additional price and time."
        ],
        ladder: [
          {
            tier: "proof-of-value",
            title: "Proof of value",
            scope: "Manual data import, limited rule set: prove the KPI gains on the customer's data.",
            includes: ["Optimization rules & guardrails (partial)", "Analytics & efficiency KPIs", "Dispatcher review UI", "Deployment (partial, sandboxed)"],
            duration: "2 months",
            pricing: "Services €90K · Infrastructure €4K/mo"
          },
          {
            tier: "rollout",
            title: "Roll-out",
            scope: "Full setup and integration, live at one location: no manual work, embedded in the workflow.",
            includes: ["Optimization rules & guardrails", "Re-optimization & feedback loop", "Analytics & efficiency KPIs", "Oracle Field Service integration", "Additional data sources & BI", "Deployment"],
            duration: "3–5 months",
            pricing: "Services €300–500K · Infrastructure ~€25K/mo *"
          },
          {
            tier: "scaling",
            title: "Scaling",
            scope: "Scaling across locations: heterogeneous rules and data workflows per region.",
            includes: ["Every Roll-out capability, multi-region / advanced", "Per-region rule sets and data workflows", "Multi-zone deployment"],
            duration: "3–12 months",
            pricing: "Scoped per engagement"
          }
        ],
        capabilityMatrix: {
          legend: "◐ partial · ● included · ●● multi-region / advanced",
          rows: [
            { label: "Optimization rules & guardrails", pov: "◐", rollout: "●", scaling: "●●" },
            { label: "Re-optimization & feedback loop", pov: "—", rollout: "●", scaling: "●●" },
            { label: "Analytics & efficiency KPIs", pov: "●", rollout: "●", scaling: "●●" },
            { label: "Oracle Field Service integration", pov: "—", rollout: "●", scaling: "●●" },
            { label: "Additional data sources & BI", pov: "—", rollout: "●", scaling: "●●" },
            { label: "Deployment", pov: "◐", rollout: "●", scaling: "●●" }
          ]
        }
      },
      sellers: {
        materials: [
          { key: "sales-deck", title: "Sales deck — service packages", description: "10 slides: verticals, today/tomorrow, proof of value, solution layers, reference architecture, the three packages and the capability-by-tier matrix.", state: "link-pending" },
          { key: "one-pager", title: "Sales overview (one-pager)", description: "Problem, solution, architecture, proof strip, the three packages with pricing, CTA.", state: "link-pending" },
          { key: "feature-list", title: "Accelerator pack one-pager (feature list)", description: "The full capability matrix: what is out of the box, what is roadmap, and the standard customization scope per area.", state: "link-pending" },
          { key: "demo-video", title: "Demo video", description: "A recorded walkthrough of the dispatcher review UI.", state: "coming-soon" },
          { key: "marketplace-package", title: "Oracle Marketplace package", description: "The listing package for the product's Oracle Marketplace entry.", state: "planned" }
        ],
        notes: []
      }
    },
    {
      slug: "cross-system-erp-qa",
      name: "Cross-system ERP Q&A",
      headline: { accent: "CROSS-SYSTEM", rest: "ERP Q&A" },
      category: "data-analysis",
      categoryChip: "Data analysis & optimization",
      facet: "oracle-autonomous-ai-lakehouse",
      availability: "fixed-price-offer",
      availabilityChip: "Fixed-price offer",
      availabilityTooltip: "A fixed-scope, fixed-price proof of value is sellable today on Oracle Autonomous AI Lakehouse; the packaged product is still being assembled.",
      oneLiner: "ERP, CRM and the systems around them joined in one governed layer — prebuilt pipelines for Oracle applications — answered as one system.",
      heroLine: "Your ERP + everything around it.",
      badges: ["ERP + CRM + THE SYSTEMS AROUND THEM", "PREBUILT PIPELINES", "ANSWERS IN MINUTES"],
      tags: ["Data analysis & optimization", "Oracle Autonomous AI Lakehouse", "Select AI", "Fixed-price offer"],
      hero: {
        image: {
          file: "assets/img/heroes/cross-system-erp-qa.jpg",
          alt: "Separate enterprise systems converging into one governed layer",
          focal: "50% 50%"
        }
      },
      tile: {
        outcomes: [
          "Routine answers without report requests",
          "One decision domain shaped into certified views, with sensitive fields masked by role",
          "The Quick Start offer is live today: 30–45 days, fixed price, in your own tenancy"
        ]
      },
      overview: {
        problemSolution: {
          problem: {
            title: "THE PROBLEM",
            text: "Business questions cross application boundaries; the reporting does not. Every real question — which delayed orders are hurting our best accounts? — becomes a request in a BI queue and lands after the decision it was meant to inform.",
            icon: "alert"
          },
          solution: {
            title: "THE SOLUTION",
            text: "Do the join once, in the data, rather than once per question: one governed layer under the applications — filled from Oracle applications by pipelines that ship with the products — and a plain-English answer surface on top of it.",
            icon: "spark"
          }
        },
        metrics: [
          { value: "30–45 days", label: "To a governed answer layer live on your data", qualifier: "One use case, up to three data sources", icon: "calendar" },
          { value: null, label: "Time to answer", qualifier: "Versus today, against a baseline signed before the clock starts", icon: "clock" },
          { value: null, label: "Questions served without a data engineer", qualifier: "The share that stops becoming a report request", icon: "users" },
          { value: null, label: "One decision domain, end to end", qualifier: "Certified views with sensitive fields masked by role", icon: "shield" }
        ],
        metricsNote: "No customer metrics published yet — this is a new fixed-price offer. What the readout measures, against a baseline signed before the clock starts: time-to-answer versus today, and the share of questions served without a data engineer.",
        roi: {
          icon: "roi",
          text: "The cost being removed is the report request: the analyst hours, the queue, and the decision that waited on both. One decision domain, end to end — narrow enough to finish, real enough to matter."
        },
        features: [
          "Prebuilt pipelines from Oracle applications — no extract engineering",
          "One or two non-Oracle sources joined in, by link or by pipeline",
          "Certified views for one decision domain, on signed-off definitions",
          "Plain-English question answering over the governed schema",
          "Two to three operational dashboards over the joined data",
          "Sensitive fields masked by role, enforced in the data layer",
          "A governed foundation that persists after the proof"
        ],
        featuresDetail: [
          { title: "Prebuilt pipelines from Oracle applications", body: "Into the governed layer — no extract engineering." },
          { title: "One or two non-Oracle sources joined in", body: "By link or by pipeline." },
          { title: "Certified views for one decision domain", body: "Using definitions the business signed off." },
          { title: "Plain-English question answering", body: "Over the governed schema." },
          { title: "Two to three operational dashboards", body: "Over the joined data." },
          { title: "Sensitive fields masked by role", body: "Enforced in the data layer." }
        ],
        industries: ["cross-industry"],
        industriesNote: "The same two pains in every industry, regardless of stack — the constraint is the system landscape, not the sector.",
        scope: {
          in: [
            "Prebuilt Oracle application pipelines switched on",
            "One or two non-Oracle sources linked or landed alongside",
            "One decision domain shaped into certified views",
            "Plain-English Q&A plus two to three operational dashboards",
            "Masking and row-level access enforced in the data layer"
          ],
          out: [
            "Live production integration — Roll-out scope",
            "More sources and more decision domains — Roll-out scope",
            "Production SLAs — Roll-out scope",
            "Multi-entity rollout and per-region governance — Scaling scope",
            "Write-back to the source applications: the system retrieves, it does not act"
          ]
        },
        moreDetail: [
          { title: "The pattern", body: "A request asked in plain language → a governed schema, single-source or federated across systems and clouds → numbers and charts back, no report request. No human gate; the system retrieves, it does not act." },
          { title: "Today", body: "The ERP knows orders and invoices; the CRM knows customers; carriers, e-commerce and spreadsheets know the rest. Every real question — which delayed orders are hurting our best accounts? — crosses two systems or more, lands in a BI queue, and comes back days later, already stale." },
          { title: "Tomorrow", body: "Business-app data flows into one governed layer — for Oracle applications through pipelines that exist out of the box — joined with one or two non-Oracle sources. On top: plain-English answers and dashboards that treat it all as one system, using definitions the business signed off." },
          { title: "Why the join is the value", body: "App-embedded analytics stops at each app's border — the value is in the join." },
          { title: "Procurement lead", body: "Supplier spend, purchase-order and invoice-status questions answered in plain language over ERP data joined with the systems around it; standing report requests stop." },
          { title: "Operations lead", body: "Self-serve slicing of SLA, backlog and throughput metrics without waiting on the BI queue." }
        ],
        successStory: {
          title: "SUCCESS STORY",
          state: "none",
          blurb: "",
          emptyLabel: "No customer engagement published yet — this is a new fixed-price offer. Proof points will be published here."
        }
      },
      technology: {
        narrative: "Oracle Autonomous AI Lakehouse is the governed layer: data from Oracle applications arrives through pipelines that ship with the products — no extract engineering — and one or two non-Oracle sources are linked or landed alongside. A small governed data model (business definitions, masking, row-level access) sits over it, and Select AI answers questions against that model in plain language. Everything runs in the customer's own tenancy, and the governed foundation persists after the proof.",
        flow: [
          { step: "Sources", label: "Oracle applications, plus one or two non-Oracle systems" },
          { step: "Ingest", label: "Prebuilt pipelines switched on; other sources linked or landed" },
          { step: "Govern", label: "Certified views, business definitions, masking and row rules" },
          { step: "Deliver", label: "Select AI answers in plain language, plus operational dashboards" }
        ],
        groups: [
          { vendor: "oracle", label: "Oracle Autonomous AI Lakehouse", items: ["Oracle Autonomous AI Database 26ai as the governed layer", "Select AI and Select AI Agent for natural-language querying", "Vector search", "Apache Iceberg", "Data Studio for ELT", "Database links for federation"] },
          { vendor: "oracle", label: "Oracle Cloud Infrastructure", items: ["The tenancy the platform runs in — OCI, or Autonomous inside AWS, Azure or Google Cloud regions"] },
          { vendor: "oracle", label: "Oracle Fusion Applications", items: ["The prebuilt extract path from Oracle business applications — what makes this the fastest of the two Lakehouse routes when Oracle apps are already in place"] },
          { vendor: "softserve", label: "SoftServe delivery layer", items: ["The decision domain and its certified views", "Business definitions signed off with the owner", "Masking, row-level access and the SQL firewall configuration", "The agreed question set and the dashboards"] }
        ],
        notUsed: ["NVIDIA — not required; Lakehouse first, GPU optional", "Oracle AI Data Platform — coexists where the customer already runs one"],
        layers: [],
        governance: {
          title: "GOVERNANCE LAYER — THE PART SECURITY ASKS ABOUT",
          body: "Masking, row-level access and a SQL firewall live in the data layer itself, applied to every query — including the ones AI writes. Every interaction is logged. Proof you can watch: the same question asked in two roles returns two different, correctly filtered answers — enforced by the database, not by the prompt."
        },
        integration: [
          { icon: "inbound", text: "In: Oracle application data via prebuilt pipelines; one or two non-Oracle sources by link or pipeline; read-only source access" },
          { icon: "outbound", text: "Out: plain-English answers, certified views and operational dashboards" },
          { icon: "link", text: "Runs on OCI, or on Autonomous inside AWS, Azure or Google Cloud regions" }
        ],
        security: [
          { icon: "shield", text: "In your tenancy: OCI, or Autonomous inside AWS, Azure or Google Cloud regions." },
          { icon: "lock", text: "Source access is read-only." },
          { icon: "eye", text: "Governed by design from day one — dynamic masking, row-level policies and a SQL firewall, the same controls across database, Iceberg and the AI layer." },
          { icon: "audit", text: "Generally available features only: Select AI agent, NL2SQL, vector search, Iceberg. Nothing in scope waits on a roadmap item." }
        ]
      },
      pov: {
        heading: "THE OFFER",
        facts: {
          duration: "30–45 days",
          team: "One SoftServe team",
          price: "€30–50K fixed *",
          deliverablesCount: 4
        },
        scope: "A fixed-scope enablement program on Oracle Autonomous AI Lakehouse: one use case, up to three data sources, and a working, governed AI solution live on your own data.",
        statStrip: "30–45 days · €30–50K fixed · 1 use case",
        statNotes: [
          { title: "30 or 45 days", body: "30 for one clean source system; 45 for up to three sources or a stricter security setup." },
          { title: "€30–50K fixed per use case", body: "Indicative — aligned per use case and Oracle funding; infrastructure runs on trial credits or the customer's tenancy." },
          { title: "In your tenancy", body: "OCI, or Autonomous inside AWS / Azure / Google Cloud regions; source access is read-only." },
          { title: "Governed by design", body: "Dynamic masking, row-level policies and SQL firewall from day one — the same controls across database, Iceberg and AI." },
          { title: "GA features only", body: "Select AI agent, NL2SQL, vector search, Iceberg — nothing in scope waits on a roadmap item." }
        ],
        duration: "30–45 days",
        durationShort: "30–45 days",
        team: "One team: AI, data and OCI architects, a product manager and a project manager, and senior AI and data engineers. The team grows with the scope.",
        howItRuns: {
          title: "HOW IT RUNS",
          steps: [
            { title: "Before the clock", body: "Sponsor named, two to three success metrics signed, source access approved in writing." },
            { title: "CONNECT · W1–2", body: "Oracle application pipelines switched on; one or two non-Oracle sources linked or landed. Read-only access." },
            { title: "MODEL + GUARD · W2–4", body: "One decision domain, say order-to-cash exceptions, shaped into certified views; sensitive fields masked by role." },
            { title: "AI LAYER · W3–5", body: "Plain-English Q&A plus two to three operational dashboards over the joined data; the question set agreed with the business owner." },
            { title: "PROVE · W5–6", body: "Measured against the signed baseline; executive readout plus a costed expansion plan." }
          ],
          closing: "One domain, end to end — narrow enough to finish, real enough to matter."
        },
        deliverables: [
          "A working AI use case — agent plus curated views — live on your data, in your tenancy.",
          "A measured KPI readout against success criteria signed before the clock starts.",
          "A governed foundation that persists: semantic model and security policies.",
          "A costed expansion proposal: what Roll-out takes and what it returns."
        ],
        deliverablesTitle: "WHAT YOU KEEP",
        pricing: [
          { label: "Fixed price", value: "€30–50K fixed per use case", note: "Indicative — aligned per use case and Oracle funding; infrastructure runs on trial credits or the customer's tenancy." },
          { label: "Duration", value: "30–45 days", note: "30 for one clean source system; 45 for up to three sources or a stricter security setup." },
          { label: "Scope", value: "1 use case, up to 3 data sources" }
        ],
        disclaimers: [
          "*Price indicative, to be confirmed per scope; Oracle partner funding programs may reduce the customer's net cost. All features used are generally available product.",
          "Framed scope, flexible add-ons. Each package's price and timing are set by specific constraints. Custom features beyond the frame are added for additional price and time."
        ],
        creditNote: "100% of the Quick Start fee credits into Roll-out signed within 90 days; stackable with Oracle and NVIDIA funding programs.",
        ladder: [
          {
            tier: "proof-of-value",
            title: "Proof of value",
            scope: "Quick Start: one use case, up to three data sources, a working governed AI solution live on your own data.",
            includes: ["Prebuilt Oracle application pipelines switched on", "Certified views for one decision domain", "Plain-English Q&A plus two to three dashboards", "Masking and row-level access in the data layer"],
            duration: "30–45 days",
            pricing: "€30–50K fixed per use case"
          },
          {
            tier: "rollout",
            title: "Roll-out",
            scope: "Live integration, more sources and domains, production SLAs.",
            includes: ["Live integration", "More sources and decision domains", "Production SLAs"],
            duration: "3–5 months",
            pricing: "Scoped against the integration depth"
          },
          {
            tier: "scaling",
            title: "Scaling",
            scope: "Multi-entity, per case.",
            includes: ["Multi-entity rollout", "Per-region governance and definitions"],
            duration: "3–12 months",
            pricing: "Scoped per engagement"
          }
        ]
      },
      sellers: {
        materials: [
          { key: "lakehouse-jumpstart-deck", title: "AI Lakehouse Jumpstart — event showcase deck", description: "10 slides; the \"Your ERP + everything around it\" proof is this product.", state: "link-pending" },
          { key: "lakehouse-quickstart-deck", title: "AI Lakehouse Quick Start — offer deck", description: "6 slides; the Oracle-installed-base use case is this product's doorway.", state: "link-pending" },
          { key: "one-pager", title: "Product one-pager", description: "The single-page version: problem, offer, what you keep.", state: "coming-soon" },
          { key: "feature-list", title: "Feature list", description: "The capability matrix: baseline, built, custom per engagement.", state: "coming-soon" },
          { key: "demo-video", title: "Demo video", description: "A recorded walkthrough of the governed Q&A layer.", state: "coming-soon" }
        ],
        notes: []
      }
    },
    {
      slug: "business-metrics-qa",
      name: "Business metrics Q&A",
      headline: { accent: "BUSINESS", rest: "METRICS Q&A" },
      category: "data-analysis",
      categoryChip: "Data analysis & optimization",
      facet: "oracle-autonomous-ai-lakehouse",
      availability: "fixed-price-offer",
      availabilityChip: "Fixed-price offer",
      availabilityTooltip: "A fixed-scope, fixed-price proof of value is sellable today on Oracle Autonomous AI Lakehouse; the packaged product is still being assembled.",
      oneLiner: "One governed engine mounts the catalogs you already have — AWS, Azure, Google, on-prem — and an AI assistant answers across all of it. No migration.",
      heroLine: "Ask once, every cloud answers.",
      badges: ["MULTI-CLOUD", "ON-PREM TOO", "NO MIGRATION"],
      tags: ["Data analysis & optimization", "Oracle Autonomous AI Lakehouse", "Select AI", "Fixed-price offer"],
      hero: {
        image: {
          file: "assets/img/heroes/business-metrics-qa.jpg",
          alt: "Data catalogs across several clouds linked into a single answer layer",
          focal: "50% 50%"
        }
      },
      tile: {
        outcomes: [
          "Cross-cloud answers in seconds, under your access rules",
          "The answer layer moves to your data — your data does not move to it",
          "The Quick Start offer is live today: 30–45 days, fixed price, in your own tenancy"
        ]
      },
      overview: {
        problemSolution: {
          problem: {
            title: "THE PROBLEM",
            text: "Every cloud governs its own data, so a question that spans them is an engineering project rather than a query — three extracts and a week — and no single system sees enough of the picture for AI to be useful on it.",
            icon: "alert"
          },
          solution: {
            title: "THE SOLUTION",
            text: "Move the answer layer to the data instead of the data to the answer layer: one governed engine mounts the catalogs and links the databases already in place, and answers under the access rules those systems already enforce.",
            icon: "spark"
          }
        },
        metrics: [
          { value: "30–45 days", label: "To a governed gold layer live on your data", qualifier: "Up to three sources, zero data movement", icon: "calendar" },
          { value: null, label: "Time to answer", qualifier: "Versus three extracts and a week, against a signed baseline", icon: "clock" },
          { value: null, label: "Questions served without a data engineer", qualifier: "The share that stops being an engineering project", icon: "users" },
          { value: null, label: "Role-scoped answers, fully audited", qualifier: "Enforced in the data layer, not in the prompt", icon: "shield" }
        ],
        metricsNote: "No customer metrics published yet. What the readout measures, against a baseline signed before the clock starts: time-to-answer versus today, and the share of questions served without a data engineer.",
        roi: {
          icon: "roi",
          text: "A governed gold layer that answers is cheaper than three extracts and a week — and it is the same layer every subsequent question, dashboard and agent runs on. The proof measures the first question set; the foundation stays for the rest."
        },
        features: [
          "Catalog federation: mount the Iceberg catalogs you already run",
          "Database links to the systems not in a catalog, on-prem included",
          "A governed gold layer with definitions the organization signs off",
          "Plain-English question answering via Select AI over that layer",
          "Converged data in one database: relational, JSON, spatial, graph, vector",
          "Role-scoped answers and a full audit trail, enforced in the data layer",
          "Zero data movement — queries run where the data lives"
        ],
        featuresDetail: [
          { title: "Catalog federation", body: "Mount the Iceberg catalogs you already run (Glue, Unity, Polaris) rather than copying data." },
          { title: "Database links", body: "To the systems that are not in a catalog, including on-prem." },
          { title: "A governed gold layer", body: "With business definitions the organization signs off." },
          { title: "Plain-English question answering", body: "Via Select AI over that layer." },
          { title: "Converged data in one database", body: "Relational, JSON, spatial, graph and vector." },
          { title: "Role-scoped answers and a full audit trail", body: "Enforced in the data layer." }
        ],
        industries: ["cross-industry"],
        industriesNote: "The same two pains in every industry, regardless of stack — the constraint is the data estate, not the sector.",
        scope: {
          in: [
            "Two to three existing catalogs mounted, one on-prem database linked",
            "A small governed model: business definitions, masking, row-level access",
            "An assistant answering an agreed 30-question set across every connected source",
            "Accuracy tuned live with your analysts",
            "Zero data movement — queries run where the data lives"
          ],
          out: [
            "Migrating or copying data into the platform — by design",
            "Live production integration and more catalogs — Roll-out scope",
            "Additional decision domains and production SLAs — Roll-out scope",
            "Multi-entity rollout and per-region governance — Scaling scope",
            "Write-back to the source systems: the system retrieves, it does not act"
          ]
        },
        moreDetail: [
          { title: "The pattern", body: "A request asked in plain language → a governed schema, single-source or federated across systems and clouds → numbers and charts back, no report request. No human gate; the system retrieves, it does not act." },
          { title: "Today", body: "Data lives in AWS, Azure, Google and on-prem databases. Each platform has its own catalog, its own security model, its own team. So a cross-cloud question — group revenue by product, all regions, today — takes a data engineer, three extracts and a week. AI initiatives stall: no single system sees the whole picture." },
          { title: "Tomorrow", body: "One governed engine mounts the catalogs you already have — AWS Glue, Databricks Unity, Snowflake — and links your databases, querying data where it lives. No migration. On top: an AI assistant answers plain-English questions across all of it, and obeys your access rules. The platform runs inside whichever cloud you prefer; your apps stay where they are." },
          { title: "Why the answer layer moves", body: "The answer layer moves to your data — your data does not move to it." },
          { title: "TIME — \"Every answer is a project.\"", body: "The BI backlog runs in weeks, so the business answers itself in Excel. Same KPI, two dashboards, two different numbers — nobody trusts either. Every acquisition and every new app adds an island nobody has integrated." },
          { title: "TRUST — \"AI is stuck in security review.\"", body: "Pilots die in review: no one can prove what the model can see or show. Access rules live app by app; AI cuts across all of them at once. When auditors ask who saw what through AI, there is no answer today." },
          { title: "Business manager", body: "Ask revenue, churn or inventory questions in plain language; get charts back from governed data, no report request." },
          { title: "Merchandiser", body: "Sales by SKU, region and promotion compared on demand." }
        ],
        successStory: {
          title: "SUCCESS STORY",
          state: "none",
          blurb: "",
          emptyLabel: "No customer engagement published yet — this is a new fixed-price offer. Proof points will be published here."
        }
      },
      technology: {
        narrative: "Bronze and silver stay where they are: Oracle Autonomous AI Lakehouse becomes the governed gold layer, mounting existing Iceberg catalogs and linking the databases that are not in one, querying data where it lives. A small governed model — business definitions, masking, row-level access — sits on top, and Select AI answers in plain language against it. It is coexistence, not migration: unlike the ERP route, nothing here depends on prebuilt Oracle pipelines, because the join happens at the catalog.",
        flow: [
          { step: "Sources", label: "Existing catalogs and databases across clouds and on-prem" },
          { step: "Mount", label: "Catalogs mounted, databases linked — zero data movement" },
          { step: "Govern", label: "Gold layer: definitions, masking, row-level access" },
          { step: "Deliver", label: "Select AI answers across every connected source, role-scoped" }
        ],
        groups: [
          { vendor: "oracle", label: "Oracle Autonomous AI Lakehouse", items: ["Oracle Autonomous AI Database 26ai", "Select AI and Select AI Agent", "Apache Iceberg", "Vector search", "Data Studio", "Database links", "Exadata"] },
          { vendor: "oracle", label: "Oracle Cloud Infrastructure", items: ["The tenancy the platform runs in — OCI, or Autonomous inside AWS, Azure or Google Cloud regions"] },
          { vendor: "other", label: "Existing platforms, unchanged", items: ["AWS Glue", "Databricks Unity Catalog", "Snowflake", "On-prem databases"] },
          { vendor: "softserve", label: "SoftServe delivery layer", items: ["Catalog mounting and database links", "The governed gold model and its definitions", "Masking, row-level policies and the SQL firewall configuration", "The agreed 30-question set and accuracy tuning"] }
        ],
        notUsed: ["NVIDIA — not required; Lakehouse first, GPU optional", "Oracle AI Data Platform — coexists where one is already in place"],
        layers: [],
        governance: {
          title: "GOVERNANCE LAYER — THE PART SECURITY ASKS ABOUT",
          body: "Masking, row-level access and a SQL firewall live in the data layer itself, applied to every query — including the ones AI writes. Every interaction is logged. Proof you can watch: the same question asked in two roles returns two different, correctly filtered answers — enforced by the database, not by the prompt."
        },
        integration: [
          { icon: "inbound", text: "In: up to three sources at proof scope — existing catalogs mounted and databases linked, zero data movement; read-only source access" },
          { icon: "outbound", text: "Out: plain-English answers and charts across every connected source" },
          { icon: "link", text: "Runs on OCI, or on Autonomous inside AWS, Azure or Google Cloud regions" }
        ],
        security: [
          { icon: "shield", text: "In your tenancy: OCI, or Autonomous inside AWS, Azure or Google Cloud regions." },
          { icon: "lock", text: "Source access is read-only." },
          { icon: "eye", text: "Governed by design from day one — dynamic masking, row-level policies and a SQL firewall, the same controls across database, Iceberg and the AI layer." },
          { icon: "audit", text: "Generally available features only: Select AI agent, NL2SQL, vector search, Iceberg. Nothing in scope waits on a roadmap item." }
        ]
      },
      pov: {
        heading: "THE OFFER",
        facts: {
          duration: "30–45 days",
          team: "One SoftServe team",
          price: "€30–50K fixed *",
          deliverablesCount: 4
        },
        scope: "A fixed-scope enablement program on Oracle Autonomous AI Lakehouse: one use case, up to three data sources, and a working, governed AI solution live on your own data.",
        statStrip: "30–45 days · €30–50K fixed · 1 use case",
        statNotes: [
          { title: "30 or 45 days", body: "30 for one clean source system; 45 for up to three sources or a stricter security setup." },
          { title: "€30–50K fixed per use case", body: "Indicative — aligned per use case and Oracle funding; infrastructure runs on trial credits or the customer's tenancy." },
          { title: "In your tenancy", body: "OCI, or Autonomous inside AWS / Azure / Google Cloud regions; source access is read-only." },
          { title: "Governed by design", body: "Dynamic masking, row-level policies and SQL firewall from day one." },
          { title: "GA features only", body: "Select AI agent, NL2SQL, vector search, Iceberg." }
        ],
        duration: "30–45 days",
        durationShort: "30–45 days",
        team: "One team: AI, data and OCI architects, a product manager and a project manager, and senior AI and data engineers. The team grows with the scope.",
        howItRuns: {
          title: "HOW IT RUNS",
          steps: [
            { title: "Before the clock", body: "Sponsor named, two to three success metrics signed, source access approved in writing." },
            { title: "CONNECT · W1–2", body: "Your teams grant read-only access; we mount two to three existing catalogs and link one on-prem database. Zero data movement." },
            { title: "MODEL + GUARD · W2–4", body: "A small governed model: business definitions, masking and row-level access." },
            { title: "AI LAYER · W3–5", body: "An assistant answers an agreed 30-question set in plain English across every connected source; accuracy tuned live with your analysts." },
            { title: "PROVE · W5–6", body: "Measured against the signed baseline: time-to-answer versus today, share of questions served without a data engineer. Executive readout plus a costed expansion plan." }
          ]
        },
        deliverablesTitle: "WHAT YOU KEEP",
        deliverables: [
          "A working AI use case — agent plus curated views — live on your data, in your tenancy.",
          "A measured KPI readout against success criteria signed before the clock starts.",
          "A governed foundation that persists: semantic model and security policies.",
          "A costed expansion proposal: what Roll-out takes and what it returns."
        ],
        pricing: [
          { label: "Fixed price", value: "€30–50K fixed per use case", note: "Indicative — aligned per use case and Oracle funding; infrastructure runs on trial credits or the customer's tenancy." },
          { label: "Duration", value: "30–45 days", note: "30 for one clean source system; 45 for up to three sources or a stricter security setup." },
          { label: "Scope", value: "1 use case, up to 3 data sources" }
        ],
        disclaimers: [
          "*Price indicative, to be confirmed per scope; Oracle partner funding programs may reduce the customer's net cost. All features used are generally available product.",
          "Framed scope, flexible add-ons. Each package's price and timing are set by specific constraints. Custom features beyond the frame are added for additional price and time."
        ],
        creditNote: "100% of the Quick Start fee credits into Roll-out signed within 90 days; stackable with Oracle and NVIDIA funding programs.",
        ladder: [
          {
            tier: "proof-of-value",
            title: "Proof of value",
            scope: "Quick Start: one use case, up to three data sources, a working governed AI solution live on your own data.",
            includes: ["Two to three existing catalogs mounted, one on-prem database linked", "A small governed model: definitions, masking, row-level access", "An assistant answering an agreed 30-question set", "Zero data movement"],
            duration: "30–45 days",
            pricing: "€30–50K fixed per use case"
          },
          {
            tier: "rollout",
            title: "Roll-out",
            scope: "Live integration, more sources and domains, production SLAs.",
            includes: ["Live integration", "More catalogs, databases and decision domains", "Production SLAs"],
            duration: "3–5 months",
            pricing: "Scoped against the integration depth"
          },
          {
            tier: "scaling",
            title: "Scaling",
            scope: "Multi-entity, per case.",
            includes: ["Multi-entity rollout", "Per-region governance and definitions"],
            duration: "3–12 months",
            pricing: "Scoped per engagement"
          }
        ]
      },
      sellers: {
        materials: [
          { key: "lakehouse-jumpstart-deck", title: "AI Lakehouse Jumpstart — event showcase deck", description: "10 slides; the \"Ask once, every cloud answers\" proof is this product.", state: "link-pending" },
          { key: "lakehouse-quickstart-deck", title: "AI Lakehouse Quick Start — offer deck", description: "6 slides; the AI-grade gold-layer use case is this product's doorway.", state: "link-pending" },
          { key: "one-pager", title: "Product one-pager", description: "The single-page version: problem, offer, what you keep.", state: "coming-soon" },
          { key: "feature-list", title: "Feature list", description: "The capability matrix: baseline, built, custom per engagement.", state: "coming-soon" },
          { key: "demo-video", title: "Demo video", description: "A recorded walkthrough of the cross-cloud assistant.", state: "coming-soon" }
        ],
        notes: []
      }
    }

  ],

  services: {
    hero: {
      image: {
        file: "assets/img/heroes/services.jpg",
        alt: "Abstract dark data landscape suggesting an engineering practice at work",
        focal: "50% 50%"
      },
      headline: { accent: "ORACLE", rest: "DEDICATED PRACTICE" },
      lead: "SoftServe's Oracle practice pairs the delivery depth of a 500-strong data and analytics practice with architects and engineers dedicated to the Oracle AI stack.",
      secondParagraph: "The practice focuses on two things: joint delivery with Oracle's AI & Data organization, and repeatable accelerator packs on four Oracle platforms.",
      stats: [
        { value: "500+", label: "data experts in SoftServe's data and analytics practice" },
        { value: "150+", label: "active projects in that practice" },
        { value: "30", label: "Fortune 500 clients in SoftServe's data and analytics practice" },
        { value: "4", label: "Oracle platforms the practice focuses on" }
      ],
      platformsTitle: "ORACLE PLATFORMS WE FOCUS ON",
      platforms: [
        { name: "Oracle Cloud Infrastructure + NVIDIA NeMo Agent Toolkit", short: "GPU cloud plus agent tooling", long: "OCI GPU compute with NVIDIA accelerated computing, NIM microservices and AI blueprints — AI-Q, cuOpt, VSS." },
        { name: "Oracle AI Data Platform", short: "Governed enterprise data for AI", long: "Unified lakehouse for structured, unstructured and real-time enterprise data — governed, AI-ready, multi-cloud." },
        { name: "Oracle Autonomous AI Lakehouse", short: "Self-managing warehouse with Iceberg", long: "Oracle Autonomous AI Database 26ai as the governed gold layer — Iceberg, vector search, Select AI and Select AI Agents." },
        { name: "Oracle AI for Fusion Applications", short: "AI agents inside Fusion applications", long: "Embedded AI agents and AI Agent Studio across ERP, SCM, HCM and CX — including Oracle Field Service." }
      ],
      cta: { label: "Request a scoping call", route: "#/services#contact" }
    },

    whatWeDo: {
      title: "WHAT WE DO",
      lead: "Oracle provides the platforms; SoftServe builds, integrates and runs the application layer on top — packaged, verticalized AI and data applications that turn platform consumption into outcomes.",
      layering: [
        { band: "APPLICATION LAYER · AI & data applications", body: "Packaged, verticalized business apps — use-case discovery, agentic and data engineering, integration into Fusion applications and Oracle Field Service, value realization and run. Delivered as OCI AI Accelerator Packs plus tailored proof-of-value → roll-out → scaling services." },
        { band: "PLATFORM LAYER · AI platform products", body: "The data, database, application and infrastructure products every SoftServe app is built on." }
      ],
      familiesTitle: "APPLICATION FAMILIES WE PACKAGE",
      families: [
        "Enterprise knowledge assistants",
        "Real-time human augmentation",
        "Data analysis and decision agents",
        "Deep research and investigation",
        "Task and transaction agents",
        "Per-item processing pipelines",
        "Closed-loop ops agents"
      ],
      familiesSuffix: "+ more — new patterns are packaged after their first live customer.",
      solutionStack: {
        title: "THE SOLUTION STACK",
        layers: [
          { layer: "Custom configuration — client rules, constraints, KPIs, data integrations", providedBy: "SoftServe" },
          { layer: "Accelerator business app — pre-built, reusable pack per use case", providedBy: "Oracle + SoftServe" },
          { layer: "NVIDIA engine — cuOpt, AI-Q, VSS", providedBy: "NVIDIA" },
          { layer: "OCI infrastructure + GPUs — compute, storage, networking, security", providedBy: "Oracle" }
        ]
      },
      whoYouWorkWith: {
        title: "WHO YOU WORK WITH",
        body: "Architects who own the Oracle reference architecture and the scoping. Engineers upskilled on the Oracle AI stack — AI-Q, cuOpt, VSS, PINNs — who build the accelerator packs and deliver them. One contract and one accountable team, from scoping through run."
      },
      whoDeliversIt: {
        title: "WHO DELIVERS IT",
        body: "A proof of value runs with one team: AI, data and OCI architects, a product manager and a project manager, and senior AI and data engineers. The team grows with the scope."
      },
      wrapAroundServices: {
        title: "WRAP-AROUND SERVICES",
        items: [
          { title: "Customer CoE build-out", body: "Build your internal CoE to maintain and expand what we deliver: OCI and NVIDIA platform training and certification, custom-solution training (architecture, rules, operations), an AI operating model with governance and intake/prioritization, knowledge transfer and runbooks." },
          { title: "Managed service", body: "Ongoing support for the production solution: SLA support and incident response, monitoring and health operations, rules and model maintenance and re-tuning, platform and pack version upgrades, periodic accuracy/KPI review and cost optimization." }
        ]
      },
      attachesToEvery: {
        title: "WHAT ATTACHES TO EVERY ENGAGEMENT",
        body: "Evaluation, observability and model routing · guardrails and governance hardening · model customization (distillation, fine-tuning) · CoE build-out · managed run. Scoped and priced on top of whichever package you choose."
      }
    },

    howWeEngage: {
      title: "HOW WE ENGAGE",
      anchor: "how-we-engage",
      lead: "One accelerator pack, three service packages by integration depth. A proof of value is deliberately as small as it can honestly be — not just on cost, but on the calendar.",
      ladder: [
        {
          tier: "proof-of-value",
          title: "Proof of value",
          whatItIs: "Prove the gains on your own data and rules — manual imports, a limited rule set, a separate environment. Zero integration.",
          duration: "30–45 days on the Lakehouse Quick Start · about 2 months on the packaged Oracle Cloud Infrastructure + NVIDIA packs · 12–15 weeks on the deep-research investigations",
          pricing: "A fixed price for the packaged scope; scoped per engagement where no package price is published"
        },
        {
          tier: "rollout",
          title: "Roll-out",
          whatItIs: "Full setup, data integration and go-live at one location or for one document type — no manual work, embedded in the workflow.",
          duration: "3–5 months",
          pricing: "€300–500K on the packaged products; scoped against the integration depth"
        },
        {
          tier: "scaling",
          title: "Scaling",
          whatItIs: "Multi-location or multi-type scaling with heterogeneous rule sets and data workflows per region.",
          duration: "3–12 months",
          pricing: "Scoped per engagement"
        }
      ],
      ladderRules: [
        "Proof of value and Scaling are both optional. A customer who is already bought in can start at Roll-out; a customer whose process is uniform everywhere may never need Scaling.",
        "Integration means background data exchange over existing APIs — not a new screen inside an Oracle application."
      ],
      ladderFootnote: "Framed scope, flexible add-ons. Each package's price and timing are set by specific constraints. Custom features beyond the frame are added for additional price and time.",
      howAPovRuns: {
        title: "HOW A PROOF OF VALUE RUNS",
        steps: [
          { title: "Before the clock", body: "The use case is picked, two to three success metrics are signed, and source access is approved in writing." },
          { title: "Connect", body: "The platform is provisioned and data is connected, often zero-copy." },
          { title: "Model and guard", body: "A small governed model, or the pack configured against your rules: business definitions, masking, row-level access." },
          { title: "Prove", body: "Measurement against the signed baseline, an executive readout, and a costed expansion plan." }
        ],
        closing: "Six weeks on the Lakehouse Quick Start; about two months on the packaged Oracle Cloud Infrastructure + NVIDIA accelerator packs; 12–15 weeks where the work is a deep-research investigation over historical records."
      }
    },

    whySoftServe: {
      title: "WHY SOFTSERVE",
      items: [
        { title: "Transferred lakehouse depth", body: "500+ data experts, 150+ active projects and 30 Fortune 500 clients in the Data & Analytics practice. A Databricks partner since 2022 with 100+ certified data engineers; a Snowflake consulting partner since 2018 with 50+ certified data engineers. That practice is now pointed at the Oracle stack." },
        { title: "Joint delivery with Oracle", body: "We deliver alongside Oracle's AI & Data organization, in joint teams — not as a vendor bolted on afterwards." },
        { title: "AI-driven SDLC", body: "Product, engineering and QA collaborate on specs rather than each running isolated AI tools: specs as agent input, automated ticket creation and triage, generated code with expert review where it matters. It pays off past the proof stage, once integration and application complexity appear." },
        { title: "Value realization, not promises", body: "Scope and acceptance criteria are signed by the customer, Oracle and SoftServe before build starts, and every person on the engagement is tied to specific deliverables." }
      ]
    },

    proof: {
      title: "PROOF",
      dividerLabel: "How we prove it",
      evidenceIds: ["workforce-proof", "extraction-proof", "account-insights-first-engagement", "method-like-for-like", "method-accuracy-journey"]
    },

    contact: {
      anchor: "contact",
      heading: "LET'S TALK",
      sub: "Tell us the workflow, the volume and the current cycle time. We come back with what a proof of value would cover, what it would cost, and what it would measure."
    }
  },

  forms: {
    roles: [
      { value: "customer", label: "An Oracle customer" },
      { value: "oracle-seller", label: "An Oracle seller or partner" },
      { value: "softserve", label: "SoftServe" },
      { value: "other", label: "Other" }
    ],
    roleLabel: "I am a…",
    consent: {
      label: "I agree to SoftServe processing this enquiry. See the privacy policy.",
      linkLabel: "privacy policy",
      linkUrl: "https://www.softserveinc.com/en-us/privacy-policy"
    },
    productPlaceholder: "Not sure yet",
    labels: {
      name: "Full name",
      email: "Work email",
      company: "Company",
      role: "I am a…",
      product: "Product of interest",
      message: "What are you trying to fix?",
      messagePlaceholder: "The workflow, the volume, and what \"good\" would look like.",
      submitDemo: "Request a demo",
      submitContact: "Request a scoping call",
      required: "Required",
      invalidEmail: "Enter a valid work email address."
    },
    engagementSteps: {
      title: "WHAT HAPPENS NEXT",
      steps: [
        { title: "One scoping conversation", body: "Bring the workflow, a rough volume and the current cycle time. That is most of what the first call needs." },
        { title: "A shaped proof of value", body: "We come back with the scope, the success metrics and what the fixed-price engagement covers." },
        { title: "Built in your tenancy", body: "The proof runs on your own data, under your security rules, and what is built stays with you." }
      ],
      responseLine: "Someone from the Oracle practice comes back within two working days."
    },
    demo: {
      anchor: "request-a-demo",
      heading: "REQUEST A DEMO",
      sub: "Tell us the account or workflow you have in mind. One scoping conversation starts it — we come back with what a proof of value would cover, on your data.",
      submitLabel: "Request a demo"
    },
    contact: {
      anchor: "contact",
      heading: "LET'S TALK",
      sub: "Tell us the workflow, the volume and the current cycle time. We come back with what a proof of value would cover, what it would cost, and what it would measure.",
      submitLabel: "Send"
    },
    confirmations: {
      posted: {
        title: "Thanks — your request is in.",
        body: "Someone from the Oracle practice will come back within two working days with a proposed scoping call. If you already know which workflow you want proved, bring a rough volume and a current cycle time — that's most of what the first conversation needs."
      },
      mailto: {
        title: "Your mail client opened with the request.",
        body: "Send the message that was composed and someone from the Oracle practice will come back within two working days. If nothing opened, your browser is blocking mail links — allow them for this page and submit the form again."
      },
      contactPosted: {
        title: "Thanks — we have it.",
        body: "Someone from the Oracle practice will come back within two working days."
      },
      error: {
        title: "That didn't send.",
        body: "Please try again, or reach us through the contact form."
      }
    }
  },

  sellerGate: {
    heading: "FOR SELLERS",
    lockedBody: "Sales deck, one-pager, feature list and demo assets for Oracle and SoftServe account teams.",
    accessNote: "Access is limited to SoftServe and Oracle teams.",
    emailLabel: "Work email",
    emailPlaceholder: "you@softserveinc.com",
    unlockLabel: "Unlock",
    lockLabel: "Lock again",
    rejected: "That domain is not on the list. Use a SoftServe or Oracle work address.",
    linkPendingLabel: "Link pending",
    downloadLabel: "Open",
    unlockedIntro: "Materials for Oracle and SoftServe account teams.",
    stateLegend: {
      "link-pending": "Link pending — the document exists, the share link does not yet",
      "coming-soon": "Coming soon — not written yet",
      "superseded": "Superseded — do not distribute",
      "planned": "Planned — scoped, not started"
    },
    packagingNotes: [
      "Packages compress over time. Service-delivery packages are expected to compress as the accelerator pack matures and absorbs more of the work.",
      "Pricing assumes the accelerator pack already exists — a first-of-kind engagement is scoped separately."
    ],
    cta: {
      heading: "SEE THE FIT IN ONE OF YOUR ACCOUNTS?",
      body: "Let's discuss a Proof of Value on the customer's own data — {duration}, ending in measurable KPIs.",
      bodyFallback: "Let's discuss a Proof of Value on the customer's own data: a fixed-scope engagement with signed success metrics.",
      contactLabel: "SoftServe Oracle practice — alliances and partnerships",
      action: "Request a demo"
    }
  }
};
