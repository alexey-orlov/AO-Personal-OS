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
      alt: "Flow diagram: signal feeds and client context enter the Account insights app and NVIDIA AI-Q on a dedicated AI cluster on Oracle Cloud Infrastructure, which filter, fan out, reason, score and cite; a reviewer approves before one JSON per account goes to the CRM"
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
    kpiTileTargets: "Targets from the proof of value; figures are illustrative, not contractual.",
    lakehousePricing: "Price indicative, confirmed in scoping; Oracle partner funding programs may reduce the net cost.",
    accountInsightsEvaluation: "The engine is a non-deterministic reasoning system, so a dedicated evaluation plan (correctness and confidence calibration) is part of the work.",
    publicPricingFootnote: "Figures are illustrative and confirmed in scoping.",
    modeledResults: "Results are modeled simulations against a historical baseline, not measured production outcomes.",
  },

  shared: {
    preFlightGate: {
      title: "Before the clock starts",
      body: "Sponsor named, two to three success metrics signed, source access approved in writing. The gate is what protects the fixed price."
    },
    engageLink: { label: "How we engage, in three packages →", route: "#/services#how-we-engage" },
    productTabs: [
      { id: "overview", label: "Overview" },
      { id: "technology", label: "Technology" },
      { id: "jumpstart", label: "Jumpstart", legacyId: "pov" },
      { id: "contacts", label: "Contacts", legacyId: "demo" },
      { id: "sellers", label: "For sellers", locked: true }
    ],
    contact: {
      name: "Karsten Tramborg",
      title: "Alliances & Partnerships Director, SoftServe",
      email: "oracle@softserveinc.com",
      photo: "assets/img/people/karsten-tramborg.jpg",
      blurb: "Bring the account and the workflow: a fit check, a live walkthrough, or the scope of a proof of value on your own data.",
      bringTitle: "Bring to the call",
      bring: [
        "The workflow you want fixed, and roughly how much of it runs in a month",
        "Which systems hold the data, and who can approve read-only access",
        "The timeline you are working to, and what a good result would look like"
      ]
    },
    ladderColumns: ["Proof of value", "Roll-out", "Scaling"],
    heroAsideTitle: "What you get",
    heroAsideFootLabel: "Proof of value",
    videoCaption: "Watch the demo",
    demoCta: "Try the interactive demo",
    videoPending: {
      body: "The demo recording is being prepared.",
      cta: "Request a live demo"
    },
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
    tagFamilies: {
      pattern: {
        tooltip: "Workflow pattern",
        icons: {
          "deep-research": "pattern-deep-research",
          "processing-pipelines": "pattern-processing-pipelines",
          "data-analysis": "pattern-data-analysis"
        }
      },
      tech: {
        tooltip: "Runs on",
        icons: {
          "oci-nvidia": "platform-oci-nvidia",
          "oracle-ai-data-platform": "platform-oracle-ai-data-platform",
          "oracle-autonomous-ai-lakehouse": "platform-oracle-autonomous-ai-lakehouse",
          "other": "platform-other"
        }
      },
      availability: {
        demo: { label: "Demo", tooltip: "Demo available", icon: "play" },
        marketplace: { label: "Oracle Marketplace", tooltip: "Available on Oracle Marketplace", icon: "storefront" }
      }
    },
    caseStudyStatus: {
      "measured": {
        chip: "Measured in the proof of value",
        tooltip: "The figures were measured during a completed proof of value on the customer’s own data."
      },
      "in-progress": {
        chip: "Proof of value in progress",
        tooltip: "The engagement is under way; the figures are what it is set up to measure, not results."
      }
    },
    sectionLabels: {
      metrics: "Metrics improved",
      metricsPlanned: "What the proof of value measures",
      roi: "ROI",
      scope: "Scope",
      scopeIn: "In scope",
      scopeOut: "Out of scope",
      moreDetail: "More detail",
      moreDetailFeatures: "Every feature, in full",
      architecture: "Architecture",
      stack: "Solution stack",
      capabilities: "Capabilities",
      stateSupported: "Supported",
      statePartial: "Partial",
      stateRoadmap: "Roadmap",
      howItWorks: "How it works",
      industryCases: "Industry use cases",
      caseProblem: "The problem",
      caseSolution: "The solution",
      outcomes: "Outcomes & ROI",
      caseStudy: "Case study",
      layerRequired: "Required",
      layerOptional: "Optional",
      directionInbound: "Inbound",
      directionOutbound: "Outbound",
      contacts: "Contacts",
      jumpstartOutcomes: "What you get",
      jumpstartTimeline: "How it runs",
      jumpstartNeeds: "What we need from you",
      jumpstartInvestment: "Investment",
      jumpstartScoped: "Scope, price and duration are set in scoping.",
      jumpstartNext: "After the Jumpstart"
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
        alt: "A tall oval of light standing open in a dark wall, its reflection running out across still water",
        focal: "50% 45%"
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
        { value: "30 days–3 months", label: "from kickoff to a measured proof of value on your own data" },
        { value: "30", label: "Fortune 500 clients in SoftServe’s data and analytics practice" }
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
      body: "Seven packaged applications, each built on a repeatable workflow pattern rather than a one-off build: deep research and investigation, per-item processing pipelines, and data analysis and decision-making. Every one runs in the customer’s own Oracle tenancy and keeps a human in the decision. Each is sold as a scoped proof of value on the customer’s own data — fixed-price where the package is published.",
      cta: { label: "See all seven →", route: "#/products" }
    },

    caseStudiesIntro: {
      title: "CASE STUDIES",
      body: "Four engagements behind these applications. Two have been through a completed proof of value and carry measured figures; two are under way and carry the outcomes they are set up to measure. Every customer is under NDA, so each one is described by industry and scale.",
      cta: { label: "How we measure it, and what is still in preparation", route: "#/services#proof" }
    },

    caseStudies: [
      {
        id: "workforce-proof",
        descriptor: "A global home-appliance manufacturer",
        area: "Field-service operations across three countries",
        industry: "manufacturing",
        status: "measured",
        metricEyebrow: "Measured",
        metric: { value: "+4.5%", label: "median gain in jobs per technician per day, against the current plan" },
        line: "Dispatchers built the four-week field-service plan by hand, region by region; NVIDIA cuOpt on Oracle Cloud Infrastructure now builds it and a dispatcher approves it.",
        footnote: "Modeled simulations against a historical baseline, not measured production outcomes; figures are illustrative, not contractual.",
        product: { slug: "workforce-optimization", name: "Workforce optimization" }
      },
      {
        id: "extraction-proof",
        descriptor: "An international airline",
        area: "Ground-handling contract management",
        industry: "travel-transport",
        status: "measured",
        metricEyebrow: "Measured",
        metric: { value: "5–15 min", label: "to extract a 60–100-page agreement end to end, down from 3–5 days" },
        line: "Contract rates were keyed into a cost-management system page by page; reviewers now validate AI-extracted rates beside the source PDF, every value cited to its page, and export.",
        footnote: "Targets from the proof of value; figures are illustrative, not contractual.",
        product: { slug: "large-document-extraction", name: "Large docs processing and review" }
      },
      {
        id: "account-insights-engagement",
        descriptor: "A global logistics and supply-chain operator",
        area: "Account planning across a global enterprise account base",
        industry: "logistics",
        status: "in-progress",
        metricEyebrow: "Target outcomes",
        metric: { value: "One signal", label: "fanned out to every account it affects, not only the one it names" },
        line: "A first engagement is under way on the customer’s own account base, scoring each generated opportunity for magnitude and confidence and citing the evidence behind it.",
        footnote: "Target outcomes the proof of value is set up to measure, not results; figures are illustrative, not contractual.",
        product: { slug: "account-insights", name: "Account insights" }
      },
      {
        id: "plan-vs-actual-engagement",
        descriptor: "A major construction and engineering contractor",
        area: "Plan versus actual across completed work packages",
        industry: "construction",
        status: "in-progress",
        metricEyebrow: "Target outcomes",
        metric: { value: "Hours, not weeks", label: "of expert time to produce an equivalent plan-versus-actual analysis" },
        line: "A first engagement is under way on one completed project sample, reconstructing historical cost, schedule and contract records into one package-level view.",
        footnote: "Target outcomes the proof of value is set up to measure, not results; figures are illustrative, not contractual.",
        product: { slug: "plan-vs-actual-investigation", name: "Plan vs actual investigation" }
      }
    ],

    servicesTeaser: {
      title: "THE PRACTICE",
      body: "SoftServe’s Oracle practice focuses on two things: joint delivery with Oracle’s AI & Data organization, and repeatable accelerator packs on four Oracle platforms.",
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
    intro: "Seven packaged AI applications on the Oracle stack. Filter by the Oracle platform each one is built on, or search by the workflow you are trying to fix. Each one is sold as a scoped proof of value on your own data, in your own tenancy — fixed-price where the package is published.",
    searchPlaceholder: "Search products or workflows…",
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
    availability: {
      label: "Availability",
      options: [
        { id: "demo", label: "Demo available" },
        { id: "marketplace", label: "On Oracle Marketplace" }
      ]
    },
    allLabel: "All",
    clearLabel: "Clear filters",
    noResults: "No product matches these filters. Clear one and try again, or tell us the workflow you need fixed."
  },

  products: [
    {
      slug: "account-insights",
      name: "Account insights",
      headline: { accent: "ACCOUNT", rest: "INSIGHTS" },
      category: "deep-research",
      categoryChip: "Deep research",
      facet: "oci-nvidia",
      oneLiner: "Turns news, filings and market signals into cited, per-account opportunities and risks that sales and account teams can act on.",
      tags: ["Deep research", "OCI + NVIDIA", "AI-Q"],
      hero: {
        image: {
          file: "assets/img/heroes/account-insights.jpg",
          alt: "A web of linked signal nodes glowing above an out-of-focus night city, seen past a silhouetted figure",
          focal: "50% 48%"
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
            text: "One signal becomes a scored, cited brief of the opportunities and risks it creates for every affected account, each mapped to a service line, including the ripple onto neighbouring accounts.",
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
        industriesNote: "Any business that needs to turn market and customer developments into pursuable opportunities across its account base, quickly.",
        steps: [
          {
            n: 1,
            title: "Bring in the signal",
            text: "News, filings and disclosures arrive on a scheduled scan or by manual submit, grounded in your CRM context, service catalog and public filings.",
            image: "assets/img/steps/account-insights-1.svg",
            features: ["Signal ingestion grounded in CRM context, service catalog and public filings"]
          },
          {
            n: 2,
            title: "Filter it, then fan it out",
            text: "One story across many sources is de-duplicated into a single signal, and every in-scope account it touches gets its own record.",
            image: "assets/img/steps/account-insights-2.svg",
            features: [
              "Relevance filter and de-duplication: one story becomes one signal",
              "Account fan-out — one JSON per affected account"
            ]
          },
          {
            n: 3,
            title: "Reason the “so what” per account",
            text: "Opportunities and material risks are derived for each account and mapped to a real service line, with ripples traced across suppliers, customers and competitors.",
            image: "assets/img/steps/account-insights-3.svg",
            features: [
              "Opportunity and risk reasoning, mapped to a real service line",
              "Cross-account ripples across suppliers, customers and competitors"
            ]
          },
          {
            n: 4,
            title: "Score, cite, review",
            text: "Every item carries a magnitude and confidence score and a citation to its evidence; a reviewer approves or rejects before anything moves downstream.",
            image: "assets/img/steps/account-insights-4.svg",
            features: [
              "Magnitude and confidence scored 0–10, with a configurable threshold",
              "Reviewer UI with citations, approve or reject with a comment"
            ]
          }
        ],
        industryCases: [
          {
            industry: "logistics",
            label: "Logistics & supply chain",
            image: "assets/img/industries/logistics.jpg",
            problem: "A shipper announces a plant expansion or a new market, and the account team hears about it once the logistics has already been scoped by somebody else. Disruptions move the same way: a strike, a port closure or a supplier fire hits many accounts at once, and working out which ones is manual.",
            solution: "One signal is resolved to every in-scope shipper account it touches, and the “so what” is reasoned per account — warehousing, forwarding, an inbound or a mitigation play. Each candidate is mapped to a service line you actually sell, scored, and cited back to the filing or article it came from."
          },
          {
            industry: "financial-services",
            label: "Financial services",
            image: "assets/img/industries/financial-services.jpg",
            problem: "Coverage teams read the same few feeds as everyone else. An event at a counterparty or a portfolio company usually matters for several related names as well, and nobody has time to trace the holdings before the opening closes.",
            solution: "The engine reasons what an issuer or counterparty event means for each in-scope relationship, then follows the cross-holding ripples to the related names — up to two levels, descriptively. Every opportunity is scored for magnitude and confidence and cited, and a reviewer approves before anything reaches the CRM."
          },
          {
            industry: "manufacturing",
            label: "Manufacturing",
            image: "assets/img/industries/manufacturing.jpg",
            problem: "A signal at a supplier or an OEM customer reshapes supply chains, production sites and trade lanes at the same time. Deciding which accounts are affected, and how, is slow enough that the reallocation conversation happens after the decision has been taken.",
            solution: "Each in-scope account is reasoned against the signal — supply-chain exposure, reallocation opportunities, second-order effects on sites and lanes — with every item tied to a real service line. The magnitude and confidence scores let the team work the top of the list first."
          }
        ],
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
          { title: "How the reasoning is grounded", body: "For each in-scope account it reasons \"so what\" for that account’s business, derives candidate opportunities and flags material risks (each mapped to a specific client service line where relevant), foresees descriptive second-order and cross-account ripples — suppliers, customers, competitors, up to two levels — scores each item by magnitude and confidence, and cites the source evidence. The reasoning is grounded in the client’s own data: CRM and account framing, capability catalog, public filings, with a human review step. Output is one JSON per affected account that flows into downstream sales systems." },
          { title: "What the system does not do", body: "The system produces scored, cited reasoning — both opportunities and risks — for a human to review; it informs decisions and downstream systems, it does not act on them." },
          { title: "Evaluation is part of the work", body: "The engine is a non-deterministic reasoning system, so a dedicated evaluation plan — correctness and confidence calibration — is part of the work." },
          { title: "Private equity funds", body: "A market or regulatory signal turned into thesis-relevant opportunities across portfolio companies; event-driven screening of pipeline targets." }
        ],
        caseStudy: {
          descriptor: "A global logistics and supply-chain operator",
          area: "Account planning across a global enterprise account base",
          industry: "logistics",
          image: "assets/img/industries/logistics.jpg",
          status: "in-progress",
          metricsEyebrow: "Target outcomes",
          metrics: [
            { value: "One signal", label: "fanned out to every account it affects, not only the one it names" },
            { value: "Calibrated", label: "opportunity confidence, scored against reviewer approve and reject decisions" }
          ],
          story: "A first engagement is under way on the customer’s own account base — CRM and account framing, the capability catalog and public filings — with NVIDIA AI-Q on Oracle Cloud Infrastructure. It measures the accuracy and the confidence calibration of the generated opportunities against reviewer approve and reject decisions. The figures above are target outcomes the proof of value is set up to measure, not results; they are illustrative, not contractual.",
          scope: [
            { label: "Stage", value: "Proof of value under way" },
            { label: "Data footprint", value: "CRM, capability catalog, public filings" },
            { label: "Human gate", value: "A reviewer approves or rejects every item" }
          ],
          ndaLine: "Customer under NDA · results follow at the end of the proof of value",
          downloadLabel: "Download the case summary"
        }
      },
      technology: {
        narrative: "The app runs on a dedicated AI cluster in your own Oracle Cloud Infrastructure tenancy. NVIDIA AI-Q grounds every conclusion in a cited first-party or public source, and nothing reaches the CRM until a reviewer approves it.",
        stack: [
          {
            key: "application",
            label: "Application / accelerator",
            summary: "The SoftServe pack: filter, fan-out, reasoning, scoring and the reviewer UI.",
            vendors: ["softserve"],
            items: [
              { name: "Filter, fan-out, reason and score pipeline", required: true },
              { name: "Reviewer UI with citations and the reasoning behind every item", required: true },
              { name: "Evaluation harness — correctness and confidence calibration", required: true },
              { name: "CRM export connector", required: false, note: "After the Jumpstart" }
            ]
          },
          {
            key: "ai-engine",
            label: "AI engine",
            summary: "NVIDIA AI-Q supplies the retrieval baseline every conclusion is grounded in.",
            vendors: ["nvidia"],
            items: [
              { name: "NVIDIA AI-Q retrieval baseline — vector search and reranking", required: true }
            ]
          },
          {
            key: "data-platform",
            label: "Data & platform",
            summary: "Object storage holds the signals, the context and the output; a lakehouse only where the runs are scheduled workflows.",
            vendors: ["oracle"],
            items: [
              { name: "OCI Object Storage for signals, first-party context and output", required: true },
              { name: "Oracle AI Data Platform — sources landed and curated, dossiers run as scheduled workflows", required: false }
            ]
          },
          {
            key: "infrastructure",
            label: "Infrastructure",
            summary: "A dedicated AI cluster inside your own OCI tenancy, in a delivered landing zone.",
            vendors: ["oracle"],
            items: [
              { name: "OCI dedicated AI cluster (GPU)", required: true },
              { name: "Landing zone — VCN, IAM, networking", required: true }
            ]
          },
          {
            key: "custom",
            label: "Configuration & integrations",
            summary: "The sources, the mappings, the scoring rubric and where the output lands — set per engagement.",
            vendors: ["softserve"],
            items: [
              { name: "Signal feeds — news, filings, disclosures — and commercial data feeds", required: true, direction: "inbound" },
              { name: "First-party CRM records and account framing", required: true, direction: "inbound" },
              { name: "Capability / service-line catalog, public filings, the in-scope account list", required: true, direction: "inbound" },
              { name: "One JSON per affected account, into the CRM or sales system", required: false, direction: "outbound", note: "After the Jumpstart" },
              { name: "Trigger: scheduled scan by default, plus manual submit", required: true },
              { name: "Client field mapping and the scoring rubric", required: true }
            ]
          }
        ],
        capabilities: [
          {
            stage: "Inputs & grounding",
            items: [
              { name: "Signal ingestion — news, filings and disclosures as the trigger" },
              { name: "First-party context: CRM records and account framing" },
              { name: "Service-line capability catalog" },
              { name: "Public filings" },
              { name: "Commercial data feeds" },
              { name: "The in-scope account list" }
            ]
          },
          {
            stage: "Trigger & filtering",
            items: [
              { name: "Scheduled scan by default, plus manual submit" },
              { name: "Relevance filter and de-duplication — one story becomes one signal" },
              { name: "Account fan-out — one record per affected account" }
            ]
          },
          {
            stage: "Reasoning",
            items: [
              { name: "Account resolution — which in-scope accounts the signal affects" },
              { name: "Opportunity and risk reasoning per account" },
              { name: "Each opportunity mapped to a real service line" },
              { name: "Cross-account ripple reasoning, up to two levels" },
              { name: "Magnitude and confidence scoring, 0–10" },
              { name: "Retrieval grounding — vector search and reranking" }
            ]
          },
          {
            stage: "Review & output",
            items: [
              { name: "Reviewer UI — read the items, follow the source links, approve or reject with a comment" },
              { name: "Citations and the reasoning behind every item" },
              { name: "Configurable confidence threshold that filters low-confidence output" },
              { name: "Evaluation harness — correctness and confidence calibration" },
              { name: "One JSON per affected account, for the CRM or sales system" }
            ]
          }
        ]
      },
      jumpstart: {
        title: "Jumpstart Proof-of-Value",
        promise: "Pilot account insights on your own account list and signal sources, at a scope agreed before the clock starts, and measure how many of the generated opportunities a reviewer actually accepts.",
        pillars: [
          { key: "fast", title: "Fast", text: "One signal set, one account list. The proof is deliberately as small as it can honestly be, and the duration is set at scoping." },
          { key: "low-risk", title: "Low-risk", text: "Fixed scope, signed before the clock starts. It runs in your own Oracle tenancy, and nothing is written back to your CRM." },
          { key: "tangible", title: "Tangible", text: "A measured accuracy readout: the share of generated opportunities a reviewer accepts, and how well the confidence scores track those decisions." }
        ],
        outcomes: [
          "Scored, cited opportunities and risks across your in-scope account list — including the ones a seller would not otherwise have seen.",
          "An accuracy readout against a golden set your own people prepared, plus the reviewer accept rate.",
          "The reviewer UI running in your tenancy, with the citations and the reasoning behind every item.",
          "A costed plan for the next step: CRM export, pipeline validation, a persistent signal store."
        ],
        timeline: [
          { label: "Week 0 · Gate", text: "Sponsor named, two to three success metrics signed, source access approved in writing." },
          { label: "Build", text: "Signal feeds, CRM context and the service catalog connected; filter, fan-out, reasoning and scoring configured to your domain." },
          { label: "Review", text: "Your reviewers work the output in the UI; accuracy is measured against the agreed golden set." },
          { label: "Decision", text: "Readout on correctness and confidence calibration, and a costed proposal for the next step." }
        ],
        needs: [
          "The in-scope account list, your CRM context and the service-line catalog",
          "A business owner, and reviewers who will accept or reject the output",
          "A golden set of manually prepared briefs to measure the output against"
        ],
        investment: {
          price: null,
          duration: null,
          includes: [
            "Signal ingestion and grounding, the relevance filter and account fan-out",
            "Opportunity and risk reasoning, cross-account ripples, scoring and citations",
            "The reviewer UI and the evaluation harness, deployed in your tenancy",
            "One SoftServe team: AI, data and OCI architects, a product manager and a project manager, senior AI and data engineers"
          ],
          footnote: "Figures are illustrative and confirmed in scoping."
        },
        next: [
          { tier: "Integration", text: "CRM export, validation against the deals already in flight, and a persistent signal store — live for one account book.", duration: "3–5 months", price: "Scoped per engagement" },
          { tier: "Scale", text: "More account books and service lines, more signal sources, and regional rule sets.", duration: "3–12 months", price: "Scoped per engagement" }
        ],
        cta: { label: "Start a Jumpstart conversation", route: "#/products/account-insights/contacts" }
      },
      sellers: {
        materials: [
          { key: "accelerator-pack-onepager", title: "Accelerator pack one-pager", description: "Three pages: scope, verticals, the full capability matrix (Oracle baseline vs SoftServe vs custom work), in/out of scope.", state: "link-pending" },
          { key: "sales-deck", title: "Sales deck", description: "The pack’s sales narrative — problem, solution, architecture and the engagement shape.", state: "coming-soon" },
          { key: "one-pager", title: "Sales one-pager", description: "The single-page version: problem, solution, proof, engagement.", state: "coming-soon" },
          { key: "feature-list", title: "Feature list", description: "The capability matrix: baseline, built, custom per engagement.", state: "coming-soon" },
          { key: "demo-video", title: "Demo video", description: "A recorded walkthrough of the reviewer UI.", state: "coming-soon" }
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
      oneLiner: "Assembles the evidence trail for a case or complaint out of every system that holds a piece of it — cited, time-stamped, and ready for an investigator to decide on.",
      statusNote: "Packaged offering in preparation — scoping conversations are open.",
      tags: ["Deep research", "OCI + NVIDIA", "AI-Q"],
      hero: {
        image: {
          file: "assets/img/heroes/case-evidence-collection.jpg",
          alt: "A long row of upright panels standing edge to edge and curving away into the dark, each lit along its leading edge",
          focal: "50% 42%"
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
          { value: null, label: "Assembling versus judging", qualifier: "How investigator time splits between gathering and deciding", icon: "gauge" }
        ],
        metricsNote: "No published metrics yet — the first engagement has not started. What the proof of value will measure: elapsed time and person-hours to produce an equivalent case file; the share of assembled findings a subject-matter expert confirms; the share of material findings linked to sufficient source evidence.",
        roi: {
          icon: "roi",
          text: "Investigation cost is almost entirely person-hours spent gathering, not deciding. The proof of value measures that ratio before and after, on real historical cases the customer’s own experts have already adjudicated."
        },
        features: [
          "Multi-source evidence assembly across systems, correspondence and documents",
          "Chronological case timeline with timestamps and clickable source references",
          "Sentence- and field-level citation on every statement",
          "Draft response sections the investigator amends and approves",
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
        industriesNote: "The pattern is the same wherever an event opens a case and the evidence sits in several systems at once.",
        steps: [
          {
            n: 1,
            title: "A case opens",
            text: "An event — or a batch sweep over many at once — opens a case in one of the categories agreed for your engagement.",
            image: "assets/img/steps/case-evidence-collection-1.svg",
            features: ["Case categories scoped and configured per engagement"]
          },
          {
            n: 2,
            title: "Assemble the evidence",
            text: "Exports from operational systems, correspondence and document stores are read together, and every piece is bound to the case it belongs to.",
            image: "assets/img/steps/case-evidence-collection-2.svg",
            features: ["Multi-source evidence assembly across systems, correspondence and documents"]
          },
          {
            n: 3,
            title: "Build the case file",
            text: "A summary, a chronological timeline and draft response sections — every statement cited to the exact source sentence or field.",
            image: "assets/img/steps/case-evidence-collection-3.svg",
            features: [
              "Chronological case timeline with timestamps and clickable source references",
              "Sentence- and field-level citation on every statement",
              "Draft response sections the investigator amends and approves"
            ]
          },
          {
            n: 4,
            title: "Investigate and decide",
            text: "The investigator navigates to source, amends, approves or flags — and every decision is written to the audit log.",
            image: "assets/img/steps/case-evidence-collection-4.svg",
            features: [
              "Investigator UI: navigate to source, amend, approve or flag",
              "Full audit log of every review decision"
            ]
          }
        ],
        industryCases: [
          {
            industry: "financial-services",
            label: "Financial services",
            image: "assets/img/industries/financial-services.jpg",
            problem: "A flagged transaction or an alert has to be investigated across parties, accounts and linked cases before anything can be filed. The analyst pulls the same records out of the same systems every time, and the filing is drafted from scratch under a deadline.",
            solution: "The evidence is assembled across those systems into one file with a chronological timeline, and the regulatory response sections arrive drafted for an analyst to amend and approve. Every statement is bound to the record it came from, so a second reviewer can retrace the finding independently."
          },
          {
            industry: "manufacturing",
            label: "Manufacturing",
            image: "assets/img/industries/manufacturing.jpg",
            problem: "A customer complaint sends a quality manager back through batch records, supplier history and operational logs kept in systems that were never designed to be read together. The root-cause report varies with whoever writes it.",
            solution: "Batch records, supplier history and the correspondence around the complaint are assembled into one cited file with a draft root-cause narrative. The quality manager amends and approves; the system assembles and drafts, it does not decide the outcome."
          },
          {
            industry: "professional-services",
            label: "Professional services",
            image: "assets/img/industries/professional-services.jpg",
            problem: "A grievance or employee-relations intake means rebuilding a chronology out of tickets, mail threads and policy references. It is slow, it varies by handler, and the evidence trail is hard to reconstruct later.",
            solution: "The chronology is built automatically from those sources with timestamps and clickable references, and the response sections are drafted for amendment. The audit log records every review decision, so the handling itself stands up to scrutiny."
          },
          {
            industry: "public-sector",
            label: "Public sector",
            image: "assets/img/industries/public-sector.jpg",
            problem: "Complaint handling runs to a statutory clock, and the evidence sits across case management, correspondence and operational records. Most of that clock goes on gathering the file before anyone can judge it.",
            solution: "Each case arrives as a summary, a timeline and draft response sections, every claim cited to its source sentence or field. Investigators spend the time on judgement, and the full audit log shows how the file was built."
          }
        ],
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
            "Anonymization and masking of source records — a data-supply precondition",
            "Sending or filing the drafted response",
            "Live source integration and production approval workflow — after the Jumpstart",
            "Additional case categories and source systems — at scale"
          ]
        },
        moreDetail: [
          { title: "The pattern", body: "An event or a batch sweep opens a case → evidence assembled across systems and documents → an evidence file with a draft finding. A person decides the outcome; the system only retrieves and assembles." },
          { title: "Case summary", body: "A concise narrative of the case, the key facts and an investigative overview, with every claim cited to the exact source sentence or document field." },
          { title: "Chronological event timeline", body: "All recorded actions, communications and decisions from intake to resolution, with timestamps and clickable source references." },
          { title: "Draft response sections", body: "Draft text for the sections of the formal response, with clear citations and provenance for every statement, presented for review, amendment and approval before any use." },
          { title: "The investigator UI is the deliverable", body: "The central deliverable is a human-in-the-loop investigator UI through which investigators interact with the outputs, navigate to cited source evidence, amend content, and record approval decisions." },
          { title: "Scope boundary", body: "The system assembles and drafts; a person decides. Anonymization and masking of source records are a data-supply precondition: historical, non-production data is supplied already fit for processing." },
          { title: "Case investigator", body: "A new complaint triggers evidence collection and summary from multiple systems, presented for approval." },
          { title: "Financial-crime analyst", body: "A flagged transaction or AML alert investigated across parties, accounts and linked cases into one file, with the regulatory filing drafted for review." },
          { title: "Employee-relations partner", body: "A grievance intake builds a chronology from tickets, mail and policy references." },
          { title: "Quality manager", body: "A customer complaint triggers a batch-record and supplier-history review with a draft root-cause report." }
        ],
        caseStudy: null
      },
      technology: {
        narrative: "Exports from your operational systems land read-only in your own OCI tenancy. NVIDIA AI-Q reasons across them, and every statement in the assembled case is bound to the source record it came from.",
        stack: [
          {
            key: "application",
            label: "Application / accelerator",
            summary: "The SoftServe pack: evidence assembly, timeline construction, citation binding and the investigator UI.",
            vendors: ["softserve"],
            items: [
              { name: "Evidence assembly across systems, correspondence and documents", required: true },
              { name: "Chronological timeline construction", required: true },
              { name: "Citation binding at sentence and field level", required: true },
              { name: "Investigator UI — amend, approve or flag, with a full audit log", required: true }
            ]
          },
          {
            key: "ai-engine",
            label: "AI engine",
            summary: "NVIDIA AI-Q reasons across many documents at once and generates the draft sections.",
            vendors: ["nvidia"],
            items: [
              { name: "NVIDIA AI-Q Blueprint — multi-document reasoning and output generation", required: true }
            ]
          },
          {
            key: "data-platform",
            label: "Data & platform",
            summary: "Where the exports land, plus the optional route that reconciles the evidence base in the data layer.",
            vendors: ["oracle"],
            items: [
              { name: "OCI Object Storage for the read-only source exports", required: true },
              { name: "Oracle enterprise AI services for multi-tool orchestration over live systems", required: false },
              { name: "Oracle AI Data Platform — evidence reconciled in the data layer rather than at query time", required: false }
            ]
          },
          {
            key: "infrastructure",
            label: "Infrastructure",
            summary: "Your own OCI tenancy, with the AI cluster the reasoning runs on.",
            vendors: ["oracle"],
            items: [
              { name: "OCI dedicated AI cluster (GPU)", required: true },
              { name: "Tenancy, IAM and read-only source access", required: true }
            ]
          },
          {
            key: "custom",
            label: "Configuration & integrations",
            summary: "Source mapping, case categories, citation granularity and the approval workflow.",
            vendors: ["softserve"],
            items: [
              { name: "Exports from case management, correspondence and operational records", required: true, direction: "inbound" },
              { name: "Document stores and rostering exports", required: false, direction: "inbound" },
              { name: "The assembled case file and draft sections, plus the approval record", required: true, direction: "outbound" },
              { name: "Trigger: an event opens a case, or a batch sweep opens many", required: true },
              { name: "Case categories, citation granularity and the approval workflow", required: true }
            ]
          }
        ],
        capabilities: [
          {
            stage: "Intake & scoping",
            items: [
              { name: "Case categories scoped and configured per engagement" },
              { name: "Trigger: an event opens a case, or a batch sweep opens many" },
              { name: "Source mapping across case management, correspondence and operational records" }
            ]
          },
          {
            stage: "Evidence assembly",
            items: [
              { name: "Multi-source evidence assembly across systems, correspondence and documents" },
              { name: "Multi-document reasoning across the assembled sources" },
              { name: "Read-only source exports landed in your own tenancy" },
              { name: "Every piece of evidence bound to the case it belongs to" }
            ]
          },
          {
            stage: "Case file",
            items: [
              { name: "Case summary — the key facts and an investigative overview" },
              { name: "Chronological timeline with timestamps and clickable source references" },
              { name: "Sentence- and field-level citation on every statement" },
              { name: "Draft response sections the investigator amends and approves" }
            ]
          },
          {
            stage: "Investigate & decide",
            items: [
              { name: "Investigator UI — navigate to source, amend, approve or flag" },
              { name: "Full audit log of every review decision" },
              { name: "Citation granularity and the approval workflow, configured per engagement" }
            ]
          }
        ]
      },
      jumpstart: {
        title: "Jumpstart Proof-of-Value",
        promise: "Pilot case evidence collection on historical cases your own experts have already adjudicated, at a scope agreed before the clock starts, and see how the assembled evidence file compares with the answer they reached.",
        pillars: [
          { key: "fast", title: "Fast", text: "One case category, one historical sample. The duration is set at scoping, against the sample you pick." },
          { key: "low-risk", title: "Low-risk", text: "Historical, non-production records only, in your own Oracle tenancy, with read-only source access. The system assembles and drafts; a person decides the outcome." },
          { key: "tangible", title: "Tangible", text: "Elapsed time and person-hours for an equivalent case file, measured before and after — on cases whose answer is already known." }
        ],
        outcomes: [
          "Assembled, cited case files for your sample — a summary, a chronological timeline and draft response sections per case.",
          "A measured readout on three criteria: time to an equivalent file, the share of findings your experts confirm, and evidence coverage.",
          "The investigator UI running in your tenancy, with amend, approve or flag and a full audit log.",
          "A costed proposal for the next step."
        ],
        timeline: [
          { label: "Week 0 · Gate", text: "Sponsor named, two to three success metrics signed, source access approved in writing." },
          { label: "Build", text: "Exports landed read-only; evidence assembly, timeline construction and citation binding configured for one case category." },
          { label: "Review", text: "Your investigators work the assembled files in the UI, against cases their own experts already adjudicated." },
          { label: "Decision", text: "Measured readout against the three criteria, and a costed proposal for the next step." }
        ],
        needs: [
          "An agreed case category and a historical, non-production sample",
          "A validation sample of cases your own experts have already adjudicated",
          "Named subject-matter experts and data owners, and an agreed transfer route"
        ],
        investment: {
          price: null,
          duration: null,
          includes: [
            "One case category, assembled and cited across the agreed sample",
            "Case summary, chronological timeline and draft response sections per case",
            "The investigator UI and its audit log, deployed in your tenancy",
            "One SoftServe team: AI, data and OCI architects, a product manager and a project manager, senior AI and data engineers"
          ],
          footnote: "Figures are illustrative and confirmed in scoping."
        },
        next: [
          { tier: "Integration", text: "Live source integration, the production approval workflow and its audit trail, live for one case category.", duration: "3–5 months", price: "Scoped per engagement" },
          { tier: "Scale", text: "More case categories and source systems, with regional rule and retention sets.", duration: "3–12 months", price: "Scoped per engagement" }
        ],
        cta: { label: "Start a Jumpstart conversation", route: "#/products/case-evidence-collection/contacts" }
      },
      sellers: {
        materials: [
          { key: "sales-deck", title: "Sales deck", description: "Problem, the three per-case outputs, architecture, the engagement shape.", state: "coming-soon" },
          { key: "one-pager", title: "One-pager", description: "Scope, where it applies, what the proof of value measures.", state: "coming-soon" },
          { key: "feature-list", title: "Feature list", description: "The capability matrix: baseline, built, custom per engagement.", state: "coming-soon" },
          { key: "demo-video", title: "Demo video", description: "A recorded walkthrough of the investigator UI.", state: "coming-soon" }
        ],
        emptyPanelCopy: "Materials in preparation. This pack is being packaged now. For a scoping conversation, or a walkthrough of how the pattern works on a live system landscape, use the contact below."
      }
    },
    {
      slug: "plan-vs-actual-investigation",
      name: "Plan vs actual investigation",
      headline: { accent: "PLAN", rest: "VS ACTUAL INVESTIGATION" },
      category: "deep-research",
      categoryChip: "Deep research",
      facet: "oci-nvidia",
      oneLiner: "Compares plan against actual across completed projects, orders and engagements, and assembles each variance with its candidate drivers and the source evidence behind them.",
      statusNote: "Packaged offering in preparation — scoping conversations are open.",
      tags: ["Deep research", "OCI + NVIDIA", "AI-Q"],
      hero: {
        image: {
          file: "assets/img/heroes/plan-vs-actual-investigation.jpg",
          alt: "Robotic arms working an assembly line that recedes down a long, dimly lit factory hall",
          focal: "50% 48%"
        }
      },
      tile: {
        outcomes: [
          "Plan-versus-actual at the level of a project, work package, order, engagement or campaign",
          "Variances and candidate drivers presented as evidence-backed candidates, never as conclusions",
          "Unresolved records are reported as coverage gaps, each with the reason it could not be resolved"
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
          { value: null, label: "Coverage gaps reported", qualifier: "Every unresolved record surfaced, with the reason it could not be resolved", icon: "alert" }
        ],
        metricsNote: "No published metrics yet. The proof of value measures three things, with the thresholds agreed at discovery.",
        roi: {
          icon: "roi",
          text: "The output is a standing ability to ask which completed units went wrong and what the record says about why, with sources attached, across all of them."
        },
        features: [
          "Ingest and profile approved static exports, preserving lineage",
          "Configuration-driven mapping to project, zone and unit level",
          "Unresolved records reported as coverage gaps, with their reason",
          "Plan-versus-actual comparison at unit level, on cost and schedule",
          "Variances, recurring patterns and candidate drivers as evidence-backed candidates",
          "An evidence layer over documents: extraction, embeddings, entity retrieval",
          "A purpose-built lightweight review app for findings, citations and gaps"
        ],
        featuresDetail: [
          { title: "Ingest and profile", body: "Approved static exports from the available source systems, preserving lineage." },
          { title: "Configuration-driven mapping layer", body: "Resolves records to project, zone and unit at the lowest reliable level, and reports whatever stays unresolved as a coverage gap with its reason." },
          { title: "Plan-versus-actual comparison", body: "At unit level, on cost and schedule." },
          { title: "Supported variances, recurring patterns and candidate drivers", body: "Each one carries the evidence a reviewer needs to confirm or reject it." },
          { title: "An evidence layer over documents", body: "Text extraction, chunking, embeddings and entity extraction, with semantic, lexical and entity retrieval routed per question." },
          { title: "A purpose-built lightweight application", body: "Where the results are presented and reviewed." }
        ],
        industriesNote: "Wherever completed units of work — projects, work packages, orders, engagements, campaigns — have to be compared against what was planned for them.",
        steps: [
          {
            n: 1,
            title: "Ingest the exports",
            text: "Approved static exports from the available source systems are landed and profiled, with lineage preserved from the file through to the finding.",
            image: "assets/img/steps/plan-vs-actual-investigation-1.svg",
            features: ["Ingest and profile approved static exports, preserving lineage"]
          },
          {
            n: 2,
            title: "Resolve records to the unit",
            text: "A configuration-driven mapping layer resolves records to project, zone and unit at the lowest reliable level. Anything left unresolved is reported as a coverage gap, with its reason.",
            image: "assets/img/steps/plan-vs-actual-investigation-2.svg",
            features: [
              "Configuration-driven mapping to project, zone and unit level",
              "Unresolved records reported as coverage gaps, with their reason"
            ]
          },
          {
            n: 3,
            title: "Compare plan against actual",
            text: "Cost and schedule are compared at unit level, and variances, recurring patterns and candidate drivers are assembled as evidence-backed candidates.",
            image: "assets/img/steps/plan-vs-actual-investigation-3.svg",
            features: [
              "Plan-versus-actual comparison at unit level, on cost and schedule",
              "Variances, recurring patterns and candidate drivers as evidence-backed candidates"
            ]
          },
          {
            n: 4,
            title: "Review the evidence",
            text: "An evidence layer over the documents backs each finding, and a purpose-built review app presents findings, citations and the coverage-gap report.",
            image: "assets/img/steps/plan-vs-actual-investigation-4.svg",
            features: [
              "An evidence layer over documents: extraction, embeddings, entity retrieval",
              "A purpose-built lightweight review app for findings, citations and gaps"
            ]
          }
        ],
        industryCases: [
          {
            industry: "construction",
            label: "Construction",
            image: "assets/img/industries/construction.jpg",
            problem: "Historical package performance is spread across a schedule tool, cost reports, progress reports and scanned contracts, at inconsistent granularity. Nobody can say reliably which work packages deviated from plan, by how much, and what the record says about why.",
            solution: "The records are reconstructed into a consistent package-level view: plan versus actual on cost and schedule, supported variances, recurring patterns and candidate drivers — each material finding tied to source evidence and validated by your own planning experts. Whatever could not be resolved is reported as a coverage gap."
          },
          {
            industry: "manufacturing",
            label: "Manufacturing",
            image: "assets/img/industries/manufacturing.jpg",
            problem: "Completed orders are measured against what was planned for them only in aggregate. The ledger shows the gap; the systems that could explain it — scheduling, cost, progress reporting — are not joined to it.",
            solution: "Every order in the sample is compared plan against actual at unit level, and the cost and schedule gaps are traced back to the records that explain them. Findings arrive as evidence-backed candidates for a reviewer to confirm, each with its analytical basis and a review status."
          },
          {
            industry: "professional-services",
            label: "Professional services",
            image: "assets/img/industries/professional-services.jpg",
            problem: "Closed engagements are reviewed one at a time, usually by the person who ran them. Where effort and schedule diverged from the plan is known anecdotally, and the pattern across a portfolio is never assembled.",
            solution: "The whole sample is swept at once: plan versus actual per engagement, the recurring patterns across them, and the candidate drivers assembled from the systems that hold the effort, the schedule and the outcome. A subject-matter expert validates before anything is acted on."
          }
        ],
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
            "Live source feeds in place of static exports — after the Jumpstart",
            "Contracting or packaging decisions taken on the proof’s output"
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
        caseStudy: {
          descriptor: "A major construction and engineering contractor",
          area: "Plan versus actual across completed work packages",
          industry: "construction",
          image: "assets/img/industries/construction.jpg",
          status: "in-progress",
          metricsEyebrow: "Target outcomes",
          metrics: [
            { value: "Hours, not weeks", label: "of expert time to produce an equivalent plan-versus-actual analysis" },
            { value: "Evidence-backed", label: "every material finding tied to a source record, with a review status" }
          ],
          story: "A first engagement is under way on one completed project sample, on the customer’s own schedule, cost and contract exports. The records are reconstructed into one package-level view of plan versus actual on Oracle Cloud Infrastructure — NVIDIA AI-Q over an evidence layer, Oracle AI Vector Search and Oracle AI Database 26ai — and whatever cannot be resolved is reported as a coverage gap. The figures above are target outcomes the proof of value is set up to measure, not results; they are illustrative, not contractual.",
          scope: [
            { label: "Sample", value: "One completed project" },
            { label: "Data footprint", value: "Schedule, cost and contract exports" },
            { label: "Human gate", value: "Expert validation on every material finding" }
          ],
          ndaLine: "Customer under NDA · results follow at the end of the proof of value",
          downloadLabel: "Download the case summary"
        }
      },
      technology: {
        narrative: "Static exports land in zoned OCI storage with lineage preserved. A conformed model resolves records to the lowest reliable unit, plan and actual are compared with cited drivers, and anything that could not be resolved is reported as a coverage gap.",
        stack: [
          {
            key: "application",
            label: "Application / accelerator",
            summary: "The SoftServe pack: the conformed model, the comparison, the driver assembly and the review app.",
            vendors: ["softserve"],
            items: [
              { name: "Conformed data model and the mapping layer", required: true },
              { name: "Plan-versus-actual comparison and driver assembly", required: true },
              { name: "Context manager and response handler", required: true },
              { name: "The review app — findings, citations and the coverage-gap report", required: true }
            ]
          },
          {
            key: "ai-engine",
            label: "AI engine",
            summary: "NVIDIA AI-Q with NIM-served models does the reasoning, the embedding and the reranking.",
            vendors: ["nvidia"],
            items: [
              { name: "NVIDIA AI-Q framework", required: true },
              { name: "NVIDIA NIM serving the Nemotron model family", required: true },
              { name: "NVIDIA NIM embedding and reranker models", required: true }
            ]
          },
          {
            key: "data-platform",
            label: "Data & platform",
            summary: "Zoned storage with lineage, plus hybrid semantic and lexical retrieval over the evidence base.",
            vendors: ["oracle"],
            items: [
              { name: "Oracle AI Database 26ai with Oracle AI Vector Search for semantic retrieval", required: true },
              { name: "OCI Search with OpenSearch for lexical retrieval (hybrid)", required: true },
              { name: "OCI Object Storage, zoned, with lineage preserved", required: true },
              { name: "Oracle Document Understanding for OCR and layout", required: true },
              { name: "Oracle AI Data Platform — where the reconciled evidence base is built in the data layer", required: false }
            ]
          },
          {
            key: "infrastructure",
            label: "Infrastructure",
            summary: "GPU compute and the serving plumbing, in your own OCI tenancy.",
            vendors: ["oracle"],
            items: [
              { name: "OCI GPU compute", required: true },
              { name: "OCI Functions and Streaming, API Gateway, Functions/OKE", required: true }
            ]
          },
          {
            key: "custom",
            label: "Configuration & integrations",
            summary: "Source mapping, the unit identifier, variance rules and the evidence thresholds.",
            vendors: ["softserve"],
            items: [
              { name: "Approved static exports — schedule, cost and forecast reporting, progress reporting", required: true, direction: "inbound" },
              { name: "Layouts, contracts, bills of quantity and amendments", required: true, direction: "inbound" },
              { name: "The unit-level performance view and its evidence pack, in the review app", required: true, direction: "outbound" },
              { name: "A unified work-unit identifier across the exported datasets", required: true, note: "The one hard input requirement" },
              { name: "Variance rules, evidence thresholds and the coverage-gap report", required: true }
            ]
          }
        ],
        capabilities: [
          {
            stage: "Ingest & profile",
            items: [
              { name: "Approved static exports ingested and profiled, with lineage preserved" },
              { name: "Zoned storage — no live system access at proof of value" },
              { name: "OCR and layout for scanned material" },
              { name: "Text extraction, chunking, embeddings and entity extraction over the documents" }
            ]
          },
          {
            stage: "Map & resolve",
            items: [
              { name: "Conformed data model across the exported datasets" },
              { name: "Configuration-driven mapping to project, zone and unit level" },
              { name: "Records resolved at the lowest reliable level" },
              { name: "Unresolved records reported as coverage gaps, with their reason" }
            ]
          },
          {
            stage: "Compare & explain",
            items: [
              { name: "Plan-versus-actual comparison at unit level, on cost and schedule" },
              { name: "Supported variances and recurring patterns across the sample" },
              { name: "Candidate drivers, each carrying the evidence that supports it" },
              { name: "Confidence and review status on every material finding" }
            ]
          },
          {
            stage: "Review & evidence",
            items: [
              { name: "Semantic, lexical and entity retrieval routed per question" },
              { name: "A purpose-built lightweight review app, not a chat interface" },
              { name: "Citations to the source file, its version and the supporting passage" },
              { name: "The coverage-gap report" }
            ]
          }
        ]
      },
      jumpstart: {
        title: "Jumpstart Proof-of-Value",
        promise: "Pilot plan vs actual investigation on one anchor portfolio in 12 weeks, plus a two-week acceptance phase, and get every material variance back with its likely drivers and the evidence behind them.",
        durationShort: "12 weeks plus a two-week acceptance phase",
        pillars: [
          { key: "fast", title: "Fast", text: "Twelve weeks from kickoff to an expert-validated readout, plus a two-week acceptance phase. Discovery is compressed into the first two weeks and ends at a gate." },
          { key: "low-risk", title: "Low-risk", text: "Approved static exports in your own Oracle tenancy, with stage gates at framework readiness, analytical review and evidence output." },
          { key: "tangible", title: "Tangible", text: "A unit-level plan-versus-actual view over your own sample, with every material finding tied to the record it came from." }
        ],
        outcomes: [
          "A unit-level plan-versus-actual view over your sample, on cost and schedule, with lineage from the source file to the finding.",
          "Variances, recurring patterns and candidate drivers, each evidence-backed and reviewed by your own experts.",
          "A coverage-gap report — what could not be resolved, and why.",
          "A measured readout on operational efficiency, output validation rate and evidence coverage."
        ],
        timeline: [
          { label: "Weeks 1–2 · Discovery", text: "Sample, sources and success thresholds agreed. The phase ends at a gate before the build starts." },
          { label: "Weeks 3–4 · Framework", text: "Exports landed in zoned storage with lineage; the conformed model and the mapping layer built against your unit identifier." },
          { label: "Weeks 5–10 · Analysis", text: "Plan against actual at unit level, then the evidence-backed output: variances, patterns and candidate drivers with their citations." },
          { label: "Weeks 11–12 · Validate", text: "Validation with your experts, demo and roadmap. Acceptance runs in weeks 13–14, after the twelve-week build." }
        ],
        needs: [
          "An agreed portfolio or project sample, with historical periodic records per unit",
          "A unified work-unit identifier across the exported datasets, at the lowest reliable level",
          "A validation sample of known variance cases, confirmed by your own experts"
        ],
        investment: {
          price: "Scoped per engagement",
          duration: "12 weeks, plus a two-week acceptance phase",
          includes: [
            "One anchor portfolio or project, one agreed sample",
            "Ingestion with lineage, the conformed model and the mapping layer",
            "Plan-versus-actual comparison, variances, patterns and candidate drivers with their evidence",
            "The review app and the coverage-gap report, running in your tenancy",
            "Stage gates at framework readiness, analytical review and evidence output"
          ],
          footnote: "Figures are illustrative and confirmed in scoping."
        },
        next: [
          { tier: "Integration", text: "Live source feeds in place of static exports, extension beyond the anchor sample, production hardening.", duration: "3–5 months", price: "Scoped per engagement" },
          { tier: "Scale", text: "More portfolios and unit types, regional variance rules, multi-entity evidence retention.", duration: "3–12 months", price: "Scoped per engagement" }
        ],
        cta: { label: "Start a Jumpstart conversation", route: "#/products/plan-vs-actual-investigation/contacts" }
      },
      sellers: {
        materials: [
          { key: "sales-deck", title: "Sales deck", description: "The class of work, the evidence definition, architecture, the phased engagement shape.", state: "coming-soon" },
          { key: "one-pager", title: "One-pager", description: "Scope, prerequisites, the three success criteria.", state: "coming-soon" },
          { key: "feature-list", title: "Feature list", description: "The capability matrix: baseline, built, custom per engagement.", state: "coming-soon" },
          { key: "demo-video", title: "Demo video", description: "A recorded walkthrough of the review app.", state: "coming-soon" }
        ],
        emptyPanelCopy: "Materials in preparation. This pack is being packaged now. For a scoping conversation, or a walkthrough of how the pattern works on a live system landscape, use the contact below."
      }
    },
    {
      slug: "large-document-extraction",
      name: "Large docs processing and review",
      headline: { accent: "LARGE", rest: "DOCS PROCESSING AND REVIEW" },
      category: "processing-pipelines",
      categoryChip: "Processing pipelines",
      facet: "oci-nvidia",
      oneLiner: "Turns long, complex documents into validated, structured data — every extracted value carries a confidence score and a citation to its source page.",
      heroCaption: "100-page contract in minutes.",
      tags: ["Processing pipelines", "OCI + NVIDIA", "AI-Q"],
      hero: {
        image: {
          file: "assets/img/heroes/large-document-extraction.jpg",
          alt: "A deep stack of thin plates seen end-on, receding into darkness with light caught between the layers",
          focal: "50% 50%"
        }
      },
      tile: {
        outcomes: [
          "A 60–100-page contract extracted end to end in 5–15 minutes, down from 3–5 days",
          "Every extracted value carries a confidence score and a citation to its source page",
          "Reviewers validate in a split-view UI and export — they review the data, they don’t type it"
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
          { value: null, label: "Business-rule validators", qualifier: "Flag what a human must look at, before anything is exported", icon: "alert" },
          { value: null, label: "Confidence and a page citation", qualifier: "On every extracted value, before anything is exported", icon: "shield" }
        ],
        metricsNote: "The figures the delivered proof of value produced are in the Riyadh Air story on this page.",
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
        industriesNote: "Wherever the terms that drive a downstream system are locked inside long, semi-structured documents.",
        steps: [
          {
            n: 1,
            title: "Upload and classify",
            text: "A PDF or DOCX — native or scanned — is classified by document type, then routed page by page to the right extractor.",
            image: "assets/img/steps/large-document-extraction-1.jpg",
            features: ["Document-type gate, then page-level routing to the right extractor"]
          },
          {
            n: 2,
            title: "Extract against the rules",
            text: "The target fields are pulled against the schema and business rules for that document type, and modeled into normalized rows.",
            image: "assets/img/steps/large-document-extraction-2.jpg",
            features: [
              "Field schema and business rules defined per document type",
              "Structured data model: ranges and tiers expanded, relationships preserved"
            ]
          },
          {
            n: 3,
            title: "Score, cite, validate",
            text: "Every value carries a confidence score and a citation to its source page, and business-rule validators flag what a human must look at.",
            image: "assets/img/steps/large-document-extraction-3.jpg",
            features: [
              "Per-field confidence scoring with tuned thresholds and fallback logic",
              "Source-page citation on every extracted value",
              "Business-rule validators that flag what a human must look at"
            ]
          },
          {
            n: 4,
            title: "Review and export",
            text: "Reviewers validate row by row beside the source PDF, then export against your reference template. Nothing leaves unapproved.",
            image: "assets/img/steps/large-document-extraction-4.jpg",
            features: [
              "Split-view reviewer UI with bulk actions, auto-save and an audit trail",
              "Export to JSON, CSV or XLSX against a reference template"
            ]
          }
        ],
        industryCases: [
          {
            industry: "travel-transport",
            label: "Travel & transport",
            image: "assets/img/industries/travel-transport.jpg",
            problem: "Ground-handling agreements run to 60–100 pages, and their rate cards are keyed into the cost system by hand — 3–5 days per contract, about a month to bring a new station online. A rate keyed wrong surfaces late, at invoice matching, and ground handling carries 7–12% of an airline's direct operating cost.",
            solution: "Rate-card pricing is extracted from the agreement with a confidence score and a page citation on every value, and a reviewer validates it beside the source PDF before export. The same pipeline pulls rates, terms and return conditions from aircraft lease and MRO agreements."
          },
          {
            industry: "professional-services",
            label: "Professional services",
            image: "assets/img/industries/professional-services.jpg",
            problem: "Key terms, obligations, pricing and renewal dates sit inside master agreements and supplier contracts that nobody has time to re-read. Obligations are tracked in a spreadsheet built once, by hand, and drifting ever since.",
            solution: "The agreed fields are extracted per contract type against business rules, each value cited to the clause it came from, and reviewed before they reach the system that acts on them. Property leases run through the same path for rent schedules, break clauses and escalation terms."
          },
          {
            industry: "insurance",
            label: "Insurance",
            image: "assets/img/industries/insurance.jpg",
            problem: "Coverage, limits, deductibles and endorsements are re-keyed from policy schedules, and loss details and reserve amounts from claim packs and loss-adjuster reports. Throughput depends on scarce specialists, so backlogs build.",
            solution: "Policy and claim documents are classified and routed page by page, the target fields extracted against your rules with ranges and tiers expanded into normalized rows. Validators flag the exceptions, and the reviewer validates only those against the cited page."
          },
          {
            industry: "financial-services",
            label: "Financial services",
            image: "assets/img/industries/financial-services.jpg",
            problem: "Financial line items and disclosures are pulled out of annual reports by hand, and covenants, interest terms and repayment schedules out of loan and credit agreements. The work is slow, and an error is found downstream rather than at the source.",
            solution: "Each document type gets its own field schema and validator set, and every extracted value arrives with a confidence score and a page reference. The human validates by design — unattended extraction is explicitly out of scope."
          }
        ],
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
            "Write-back and system integration — delivered after the Jumpstart",
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
          { title: "Why the error class is expensive", body: "In aviation, ground-handling contracts carry 7–12% of an airline’s direct operating cost — so a rate keyed wrong is expensive, and it surfaces late." },
          { title: "Use-case boundaries", body: "The boundary of this solution is extraction of structured data from complex documents into a validated, human-reviewed output." }
        ],
        successStory: {
          customer: "Riyadh Air",
          logo: "assets/img/logos/riyadh-air.svg",
          logoStacked: true,
          headline: "Ground-handling agreements, from days to minutes",
          metrics: [
            { value: "5–15 min", label: "to extract a 60–100-page agreement end to end, down from 3–5 days" },
            { value: "up to −20%", label: "targeted reduction in manual data-entry effort" }
          ],
          story: "Ground-handling contract rates were keyed into a cost-management system by hand — 60–100-page agreements read page by page, 3–5 days per contract. With the extraction app on Oracle Cloud Infrastructure, reviewers now validate AI-extracted rates beside the source PDF, every value cited to its page, and export in minutes. Targets from the proof of value; figures are illustrative, not contractual.",
          downloadLabel: "Download the case summary"
        }
      },
      technology: {
        narrative: "Contracts land from your repository into the extraction app on a dedicated AI cluster in your own Oracle Cloud Infrastructure tenancy. NVIDIA AI-Q returns every field with a confidence score and a page citation; only approved rows are exported.",
        stack: [
          {
            key: "application",
            label: "Application / accelerator",
            summary: "The SoftServe pack: the extraction pipeline, the validator set, the split-view reviewer UI and export.",
            vendors: ["softserve"],
            items: [
              { name: "Extraction pipeline and field schema", required: true },
              { name: "Validator set and confidence thresholds", required: true },
              { name: "Split-view reviewer UI with bulk actions, auto-save and an audit trail", required: true },
              { name: "Export and target-system integration", required: false, note: "After the Jumpstart" }
            ]
          },
          {
            key: "ai-engine",
            label: "AI engine",
            summary: "NVIDIA AI-Q reads the pages — vision-language models plus retrieval, GPU-accelerated.",
            vendors: ["nvidia"],
            items: [
              { name: "NVIDIA AI-Q for GPU-accelerated extraction — vision-language models plus retrieval", required: true }
            ]
          },
          {
            key: "data-platform",
            label: "Data & platform",
            summary: "The extraction store, plus OCR and layout where the input is scanned.",
            vendors: ["oracle"],
            items: [
              { name: "Oracle Autonomous Database as the extraction store", required: true },
              { name: "Oracle Document Understanding for OCR and layout, where scanned input needs it", required: false },
              { name: "Oracle AI Data Platform — only where extractions also feed analytics", required: false, note: "Not the system of record for this pack" }
            ]
          },
          {
            key: "infrastructure",
            label: "Infrastructure",
            summary: "A dedicated GenAI cluster in your own tenancy, with the landing zone delivered as code.",
            vendors: ["oracle"],
            items: [
              { name: "A dedicated GenAI AI cluster (H100 class)", required: true },
              { name: "The landing zone (VCN, OKE, storage) delivered as Terraform", required: true }
            ]
          },
          {
            key: "custom",
            label: "Configuration & integrations",
            summary: "The field schema, the business rules, the thresholds and the target-system integration.",
            vendors: ["softserve"],
            items: [
              { name: "Source contracts from your repository — PDF and DOCX, including scanned", required: true, direction: "inbound" },
              { name: "Extracted data, rates and terms, cited, into the cost or ERP system", required: true, direction: "outbound", note: "After the Jumpstart" },
              { name: "Field schema and business rules per document type", required: true },
              { name: "Confidence thresholds and fallback logic", required: true },
              { name: "Export formats: JSON, CSV or XLSX against a reference template", required: true }
            ]
          }
        ],
        capabilities: [
          {
            stage: "Classification & routing",
            items: [
              { name: "PDF and DOCX upload, including scanned input" },
              { name: "Format handling, OCR and page splitting" },
              { name: "Document-type gate" },
              { name: "Page-level routing to the right extractor" }
            ]
          },
          {
            stage: "Extraction",
            items: [
              { name: "Field schema and business rules per document type" },
              { name: "Document header and metadata extraction" },
              { name: "Per-field confidence scoring with tuned thresholds" },
              { name: "Fallback logic when a page label or a field scores low" },
              { name: "Structured data model — ranges and tiers expanded, parent-child relationships preserved" },
              { name: "Source-page citation on every extracted value" }
            ]
          },
          {
            stage: "Review & export",
            items: [
              { name: "Split-view reviewer UI — source PDF beside the extracted rows" },
              { name: "Per-row confidence badges" },
              { name: "Approve, edit or reject per row, with bulk actions, auto-save and an audit trail" },
              { name: "Exception routing for low-confidence and flagged items" },
              { name: "Export to JSON, CSV or XLSX against a reference template" }
            ]
          },
          {
            stage: "Quality & integrations",
            items: [
              { name: "Business-rule validators and reviewer warnings" },
              { name: "Accuracy measured against an annotated ground-truth set" },
              { name: "Effort-savings KPIs against today’s cycle time" },
              { name: "Contract repository as the source, the cost or ERP system as the target" }
            ]
          }
        ]
      },
      jumpstart: {
        title: "Jumpstart Proof-of-Value",
        promise: "Pilot large-document processing and review on your own contracts in 2 months, at a fixed price, and see extraction accuracy and effort saved measured against the baseline you signed.",
        durationShort: "2 months",
        pillars: [
          { key: "fast", title: "Fast", text: "Two months from kickoff to a measured accuracy and effort readout on your own contracts." },
          { key: "low-risk", title: "Low-risk", text: "Fixed scope at a fixed price: manual upload, one document type, the core field schema. It runs sandboxed in your own Oracle tenancy, and nothing is written into your cost or ERP system." },
          { key: "tangible", title: "Tangible", text: "A 60–100-page contract extracted end to end in minutes, every value cited to its page and validated by your own reviewer before export." }
        ],
        outcomes: [
          "Your own contracts extracted end to end, with per-field confidence and a page citation on every value.",
          "Accuracy measured against an annotated ground-truth set, plus an effort-savings readout against today’s cycle time.",
          "The split-view reviewer UI running in your tenancy.",
          "A costed plan for integration: the target system, the second document type, production hardening."
        ],
        timeline: [
          { label: "Week 0 · Gate", text: "Sponsor named, two to three success metrics signed, source access approved in writing." },
          { label: "Weeks 1–4 · Build", text: "One document type: field schema, business rules, confidence thresholds and validators configured on your own contracts." },
          { label: "Weeks 5–7 · Review", text: "Your reviewers validate in the split-view UI; accuracy is measured against the annotated ground truth." },
          { label: "Week 8 · Decision", text: "Accuracy and effort-savings readout against the signed baseline, and a costed proposal for the next step." }
        ],
        needs: [
          "A sample of real contracts of one document type, and the fields you need out of them",
          "An annotated ground-truth set to measure accuracy against",
          "A business owner and the reviewers who will validate the output"
        ],
        investment: {
          price: "€75K services · €0/mo infrastructure",
          duration: "2 months",
          includes: [
            "Classification and page-level routing",
            "Extraction rules and the core field schema",
            "Confidence scoring, validators and the human-in-the-loop review UI",
            "Accuracy benchmarking and the KPI readout",
            "Sandboxed deployment in your own tenancy"
          ],
          footnote: "Figures are illustrative and confirmed in scoping."
        },
        next: [
          { tier: "Integration", text: "Full setup and integration, live for one document type: source and target systems connected, the full field schema, production deployment.", duration: "3–5 months", price: "€300–500K services · ~€10K/mo infrastructure, depending on document volume, page counts and pipeline complexity" },
          { tier: "Scale", text: "Across document types, volume and business units, with type-specific schemas and validation.", duration: "3–12 months", price: "Scoped per engagement" }
        ],
        cta: { label: "Start a Jumpstart conversation", route: "#/products/large-document-extraction/contacts" }
      },
      sellers: {
        materials: [
          { key: "sales-deck", title: "Sales deck — service packages", description: "10 slides: problem/solution, where it applies, the reviewer flow today vs tomorrow, solution layers, reference architecture, the three packages, pricing and feature detail.", state: "link-pending" },
          { key: "one-pager", title: "Sales overview — 3 pages", description: "Problem, solution, architecture, case study, the three packages with pricing, CTA.", state: "link-pending" },
          { key: "feature-list", title: "Accelerator pack one-pager (capability matrix)", description: "The full matrix — what the Oracle + NVIDIA baseline provides, what SoftServe has built, and the custom work per engagement — plus use-case boundaries.", state: "superseded" },
          { key: "demo-video", title: "Demo video", description: "A recorded walkthrough of the split-view reviewer UI.", state: "coming-soon" },
          { key: "marketplace-package", title: "Oracle Marketplace package", description: "The listing package for the product’s Oracle Marketplace entry.", state: "planned" }
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
      oneLiner: "Optimizes field-service work zones and schedules with NVIDIA cuOpt — a region’s four-week plan built in minutes, approved by dispatchers, exported to Oracle Field Service.",
      heroCaption: "What if dispatchers reviewed the plan, not built it?",
      tags: ["Data analysis & optimization", "OCI + NVIDIA", "cuOpt", "Oracle Field Service"],
      hero: {
        image: {
          file: "assets/img/heroes/workforce-optimization.jpg",
          alt: "An overhead field of interlocking hexagonal plates, with loose ones still settling into the pattern from above",
          focal: "50% 55%"
        }
      },
      tile: {
        outcomes: [
          "A region’s four-week plan optimized and approved in ~30 minutes, down from ~2 days",
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
          { value: "~30 min", label: "To optimize and approve a region’s four-week plan", qualifier: "Down from ~2 days", icon: "clock" }
        ],
        metricsNote: "KPIs measured before/after on proof-of-value data; figures are illustrative, not contractual.",
        roi: {
          icon: "roi",
          text: "The gain lands in the field: the same technicians complete more jobs per day, with less travel and less waiting. A single-digit percentage runs across every region."
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
        industriesNote: "Any mobile field force planned against skills, availability and geography.",
        steps: [
          {
            n: 1,
            title: "Load the period's data",
            text: "Demand, technician availability, skills, work zones and the period's bookings come in from Oracle Field Service.",
            image: "assets/img/steps/workforce-optimization-1.svg",
            features: [
              "Work-zone and availability rules, with skill-based allocation",
              "Planned-vacation reallocation and same-day sickness handling"
            ]
          },
          {
            n: 2,
            title: "Set the rules",
            text: "Zone, forecast and commitment rules are configured, then weighted as hard or soft constraints against the objectives that matter.",
            image: "assets/img/steps/workforce-optimization-2.svg",
            features: [
              "Default, neighboring and cross-zone allocation",
              "Forecast-based allocation against a demand forecast you supply",
              "Commitment rules: non-movable appointments and SLA types per appointment *"
            ]
          },
          {
            n: 3,
            title: "Solve the plan",
            text: "cuOpt computes the technician-to-zone-to-job plan against every constraint at once, in minutes rather than days.",
            image: "assets/img/steps/workforce-optimization-3.svg",
            features: ["Multi-objective optimization with hard and soft rule weighting"]
          },
          {
            n: 4,
            title: "Review, approve, measure",
            text: "The dispatcher compares plans on a live map, approves or re-runs, and the KPI readout shows what changed.",
            image: "assets/img/steps/workforce-optimization-4.svg",
            features: [
              "Dispatcher review UI: map and table views, approve, reject, re-run",
              "KPIs and analytics: productivity, utilization, travel, workload balance"
            ]
          }
        ],
        industryCases: [
          {
            industry: "manufacturing",
            label: "Manufacturing",
            image: "assets/img/industries/manufacturing.jpg",
            problem: "In-home repair of manufactured goods is planned by hand: work zones and technician allocations, region by region, juggling skills, spare parts, travel and absences. Urgent call-outs and no-shows mean re-planning the day.",
            solution: "The solver plans the whole region against skills, parts, travel and existing bookings at once, and the dispatcher reviews and approves the result. Rules that differ by market — working time, holidays, service commitments — are configuration, so setting up a new region is a configuration job."
          },
          {
            industry: "utilities",
            label: "Utilities",
            image: "assets/img/industries/utilities.jpg",
            problem: "Water, gas and electric crews are scheduled across service territories against SLAs, crew certifications and outage spikes. Planned and emergency work compete for the same capacity, and the balance is struck manually by a handful of senior dispatchers.",
            solution: "Territories, certifications and SLA commitments become weighted constraints, and the plan is re-solved as the day's demand changes. Planned and emergency work are balanced against the objectives you weight, and no allocation reaches a crew until a dispatcher approves it."
          },
          {
            industry: "telecom",
            label: "Telecom & cable",
            image: "assets/img/industries/telecom.jpg",
            problem: "Install-and-repair technicians have to be routed to tight appointment windows across regions, matched to line skills. Missed windows cost customer satisfaction directly, and launching a new service zone depends on scarce planning expertise.",
            solution: "Appointment windows and line skills are modeled as commitment and skill rules, and the solver routes against them while minimizing travel. Launching a new zone comes down to a configuration change."
          },
          {
            industry: "healthcare",
            label: "Healthcare",
            image: "assets/img/industries/healthcare.jpg",
            problem: "Medical-device and equipment service engineers are allocated to contracted assets by skill, SLA and location. Uptime on high-value machines is contractual, and the allocation is worked out by hand against a rising number of installed assets.",
            solution: "Contracted SLAs, engineer certifications and asset locations become the constraint set the solver works against, with uptime-critical commitments weighted as hard rules. The KPI readout compares the current and the optimized plan on identical definitions."
          }
        ],
        scope: {
          in: [
            "Foundational allocation with the recurring, most-typical constraints — zones, skills, planned absences",
            "Core KPIs predicted at scheduling and measured against the signed benchmark",
            "The dispatcher review UI, with approve, reject and re-run",
            "Sandboxed deployment on your own tenancy",
            "A before/after KPI readout computed identically on both plans"
          ],
          out: [
            "Oracle Field Service integration — delivered after the Jumpstart",
            "Additional data sources and BI integration — delivered after the Jumpstart",
            "The re-optimization feedback loop — delivered after the Jumpstart",
            "Live-traffic travel rules, within-day reassignment, spare-parts and crew-based assignment — on the roadmap"
          ]
        },
        moreDetail: [
          { title: "Today", body: "Dispatchers maintain work zones and technician allocations by hand, region by region, juggling ZIP-code coverage, skills, working days and absences, with little room to optimize." },
          { title: "Tomorrow", body: "The dispatcher uploads the period’s data, runs cuOpt on OCI, and reviews the optimized allocation on a live map — comparing, approving or re-running before export to Oracle Field Service. The solver returns the schedule that scores best against the weighted objectives." },
          { title: "Suboptimal efficiency", body: "Uneven workloads and under-used capacity." },
          { title: "Lower customer satisfaction", body: "Longer wait times from suboptimal allocations." },
          { title: "Poor scalability", body: "Planning hinges on scarce senior dispatchers; new zones launch slowly." },
          { title: "How the KPIs are defined", body: "Time to plan: how long to optimize and approve a region’s four-week plan. Productivity: jobs per technician per working day. Capacity utilization: booked activity time against available capacity. Customer wait time: calendar days between booking and appointment. Each is computed identically for the current plan and the optimized plan." },
          { title: "Delivered after the Jumpstart", body: "Oracle Field Service integration — staff, availability and booking data in; optimized allocations (zones, visits) out; factual durations and times back. The architecture is native to Oracle Field Service; the integration itself comes after the Jumpstart, not inside it. Also after the Jumpstart: additional data sources and BI integration (up to five typical integrations — booking, inventory for parts availability, HR/WFM for people availability, demand forecasting, BI), and the re-optimization feedback loop." },
          { title: "On the roadmap, not in the pack today", body: "Distance and travel-time rules with live traffic · within-day dynamic reassignment and urgent-request handling · spare-parts and crew-based assignment · the human-feedback learning loop." }
        ],
        successStory: {
          customer: "Bosch",
          logo: "assets/img/logos/bosch.png",
          headline: "A field force planned by a solver, approved by dispatchers",
          metrics: [
            { value: "+4.5%", label: "median gain in jobs per technician per day, optimized against the current plan" },
            { value: "~5x", label: "return within three years on the modeled rollout" }
          ],
          story: "Dispatchers planned a residential appliance-repair field force by hand — ZIP-code work zones and technician allocations, region by region. A three-month proof of value across three countries modeled around thirty real-world constraints: 83% of the simulations came out positive, and dispatcher productivity improved 15–20% during the pilot. Results are modeled simulations against a historical baseline, not measured production outcomes.",
          downloadLabel: "Download the case summary"
        }
      },
      technology: {
        narrative: "Oracle Field Service is both the source and the destination. NVIDIA cuOpt computes the allocation on a dedicated AI cluster on Oracle Cloud Infrastructure, and the approved plan is written back — nothing reaches the field until a dispatcher approves it.",
        stack: [
          {
            key: "application",
            label: "Application / accelerator",
            summary: "The SoftServe pack: the dispatcher UI, the approval workflow, the re-solve loop and the KPI layer.",
            vendors: ["softserve"],
            items: [
              { name: "Dispatcher review UI and approval workflow", required: true },
              { name: "Re-solve loop", required: true },
              { name: "KPI and analytics layer — productivity, utilization, travel, workload balance", required: true },
              { name: "Write-back to Oracle Field Service", required: false, note: "After the Jumpstart" }
            ]
          },
          {
            key: "ai-engine",
            label: "AI engine",
            summary: "NVIDIA cuOpt solves the technician-to-zone-to-job plan on GPUs.",
            vendors: ["nvidia"],
            items: [
              { name: "NVIDIA cuOpt, the GPU-accelerated optimization solver", required: true }
            ]
          },
          {
            key: "data-platform",
            label: "Data & platform",
            summary: "Oracle Field Service is both the source and the destination; storage holds the period's data.",
            vendors: ["oracle"],
            items: [
              { name: "Oracle Field Service, as source and destination", required: true },
              { name: "OCI Object Storage for the period's data", required: true }
            ]
          },
          {
            key: "infrastructure",
            label: "Infrastructure",
            summary: "A dedicated GPU cluster in your own tenancy, with its networking and IAM.",
            vendors: ["oracle"],
            items: [
              { name: "A dedicated AI cluster (4–8 NVIDIA A100 GPUs)", required: true },
              { name: "Object storage, networking and IAM", required: true }
            ]
          },
          {
            key: "custom",
            label: "Configuration & integrations",
            summary: "Client rules, constraints, KPI definitions and the data integrations.",
            vendors: ["softserve"],
            items: [
              { name: "From Oracle Field Service: staff, availability and booking data", required: true, direction: "inbound" },
              { name: "Back from Oracle Field Service: factual durations and times", required: false, direction: "inbound" },
              { name: "To Oracle Field Service: optimized allocations — zones and visits", required: true, direction: "outbound", note: "After the Jumpstart" },
              { name: "Up to five further integrations — booking, inventory, HR/WFM, demand forecasting, BI", required: false, direction: "inbound", note: "After the Jumpstart" },
              { name: "Client rules, constraints and KPI definitions", required: true }
            ]
          }
        ],
        capabilities: [
          {
            stage: "Load the period's data",
            items: [
              { name: "Oracle Field Service as the source for demand, availability, skills and bookings — delivered after the Jumpstart" },
              { name: "Demand forecasting, booking, inventory, HR/WFM and BI sources — delivered after the Jumpstart" },
              { name: "Skill-based allocation", state: "supported" },
              { name: "Maximum load per day", state: "supported" },
              { name: "Planned-vacation reallocation and same-day sickness handling", state: "supported" }
            ]
          },
          {
            stage: "Set the rules",
            items: [
              { name: "Default work zones per technician, and work-zone-level demand", state: "supported" },
              { name: "Neighboring work zones and cross-zone allocation", state: "supported" },
              { name: "Forecast-based allocation against a demand forecast you supply", state: "supported" },
              { name: "Non-movable appointments and SLA types per appointment", state: "partial" },
              { name: "Client rules, constraints and KPI definitions, configured per engagement" },
              { name: "Distance and travel-time rules with live traffic data", state: "roadmap" },
              { name: "Spare-parts availability and crew-based assignment", state: "roadmap" }
            ]
          },
          {
            stage: "Solve the plan",
            items: [
              { name: "Multi-objective optimization with hard and soft rule weighting", state: "supported" },
              { name: "Minimal disruption of the current allocation", state: "supported" },
              { name: "A region's four-week plan solved on GPU-accelerated cuOpt, in minutes" },
              { name: "Within-day job reassignment and urgent-request handling", state: "roadmap" }
            ]
          },
          {
            stage: "Review, approve, measure",
            items: [
              { name: "Dispatcher UI with map and table views", state: "supported" },
              { name: "Dispatcher approval or rejection before anything reaches the field", state: "supported" },
              { name: "Model-decision explanations and recommendations", state: "supported" },
              { name: "KPI readout: jobs per technician per working day, capacity utilization, travel reduction, workload balance", state: "supported" },
              { name: "The current plan against the optimized plan, computed on identical definitions" },
              { name: "The approved plan written back to Oracle Field Service — delivered after the Jumpstart" },
              { name: "Iterative feedback-based re-optimization", state: "roadmap" },
              { name: "Human-feedback-driven tuning and what-if alternatives", state: "roadmap" }
            ]
          }
        ]
      },
      jumpstart: {
        title: "Jumpstart Proof-of-Value",
        promise: "Pilot workforce optimization on your own historical data in 2 months, at a fixed price, and take away a before/after KPI readout your dispatchers have signed off.",
        durationShort: "2 months",
        pillars: [
          { key: "fast", title: "Fast", text: "Two months from kickoff to a before/after KPI readout on a real region of your own." },
          { key: "low-risk", title: "Low-risk", text: "Fixed scope at a fixed price: manual data import, the recurring constraints, a sandboxed environment on your own tenancy. A dispatcher approves every plan before anything reaches the field." },
          { key: "tangible", title: "Tangible", text: "An optimized four-week plan for one region, measured against your current plan on identical KPI definitions." }
        ],
        outcomes: [
          "An optimized four-week plan for one real region, computed on your own historical data.",
          "A before/after KPI readout — productivity, capacity utilization and wait time — computed identically on the current and the optimized plan.",
          "The dispatcher review UI running in a sandboxed environment on your tenancy.",
          "A costed plan for the next step: integration scope, additional sources, timeline."
        ],
        timeline: [
          { label: "Week 0 · Gate", text: "Sponsor named, two to three success metrics signed, the baseline and source access approved in writing." },
          { label: "Weeks 1–4 · Build", text: "The period’s data imported; zones, skills, absences and commitment rules configured and weighted against your objectives." },
          { label: "Weeks 5–7 · Review", text: "Dispatchers compare the current and the optimized plan on a live map, approve or re-run." },
          { label: "Week 8 · Decision", text: "Before/after KPI readout against the signed benchmark, and a costed proposal for the next step." }
        ],
        needs: [
          "One real region and a period of historical planning data — demand, availability, skills, work zones and bookings",
          "The allocation rules that actually apply: zones, skills, absences, service commitments",
          "A dispatcher and a business owner who will review the plan and sign the baseline"
        ],
        investment: {
          price: "€90K services · €4K/mo infrastructure",
          duration: "2 months",
          includes: [
            "Foundational allocation with the recurring, most-typical constraints — zones, skills, planned absences",
            "Core KPIs predicted at scheduling and measured against the signed benchmark",
            "The dispatcher review UI, with approve, reject and re-run",
            "Sandboxed deployment on your own tenancy"
          ],
          footnote: "Figures are illustrative and confirmed in scoping."
        },
        next: [
          { tier: "Integration", text: "Full setup and integration, live at one location: Oracle Field Service integration, additional data sources and BI, the re-optimization feedback loop, on a dedicated landing zone with IAM and observability.", duration: "3–5 months", price: "€300–500K services · ~€25K/mo infrastructure, depending on usage and rule complexity" },
          { tier: "Scale", text: "Across locations, with per-region rule sets and data workflows, deployed multi-zone.", duration: "3–12 months", price: "Scoped per engagement" }
        ],
        cta: { label: "Start a Jumpstart conversation", route: "#/products/workforce-optimization/contacts" }
      },
      sellers: {
        materials: [
          { key: "sales-deck", title: "Sales deck — service packages", description: "10 slides: verticals, today/tomorrow, proof of value, solution layers, reference architecture, the three packages and the capability-by-tier matrix.", state: "link-pending" },
          { key: "one-pager", title: "Sales overview (one-pager)", description: "Problem, solution, architecture, proof strip, the three packages with pricing, CTA.", state: "link-pending" },
          { key: "feature-list", title: "Accelerator pack one-pager (feature list)", description: "The full capability matrix: what is out of the box, what is roadmap, and the standard customization scope per area.", state: "link-pending" },
          { key: "demo-video", title: "Demo video", description: "A recorded walkthrough of the dispatcher review UI.", state: "coming-soon" },
          { key: "marketplace-package", title: "Oracle Marketplace package", description: "The listing package for the product’s Oracle Marketplace entry.", state: "planned" }
        ]
      }
    },
    {
      slug: "cross-system-erp-qa",
      name: "Cross-system ERP Q&A",
      headline: { accent: "CROSS-SYSTEM", rest: "ERP Q&A" },
      category: "data-analysis",
      categoryChip: "Data analysis & optimization",
      facet: "oracle-autonomous-ai-lakehouse",
      oneLiner: "Answers plain-language questions that span the ERP, the CRM and the systems around them, from one governed layer on Oracle Autonomous AI Lakehouse.",
      heroLine: "Your ERP + everything around it.",
      badges: ["ERP + CRM + THE SYSTEMS AROUND THEM", "PREBUILT PIPELINES", "ANSWERS IN MINUTES"],
      tags: ["Data analysis & optimization", "Oracle Autonomous AI Lakehouse", "Select AI"],
      hero: {
        image: {
          file: "assets/img/heroes/cross-system-erp-qa.jpg",
          alt: "Many parallel metal ribs sweeping together into one continuous curved surface",
          focal: "50% 50%"
        }
      },
      tile: {
        outcomes: [
          "Routine answers without report requests",
          "One decision domain shaped into certified views, with sensitive fields masked by role",
          "A governed foundation that persists after the proof: certified views, definitions and security policies you keep"
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
        industriesNote: "The same two pains in every industry, regardless of stack — what varies is the system landscape.",
        steps: [
          {
            n: 1,
            title: "Connect the applications",
            text: "The pipelines that ship with the Oracle products are switched on; one or two non-Oracle sources are linked or landed alongside. Read-only access.",
            image: "assets/img/steps/cross-system-erp-qa-1.svg",
            features: [
              "Prebuilt pipelines from Oracle applications — no extract engineering",
              "One or two non-Oracle sources joined in, by link or by pipeline"
            ]
          },
          {
            n: 2,
            title: "Shape one decision domain",
            text: "One domain — order-to-cash exceptions, say — is modeled into certified views, on definitions the business owner signs off.",
            image: "assets/img/steps/cross-system-erp-qa-2.svg",
            features: [
              "Certified views for one decision domain, on signed-off definitions",
              "A governed foundation that persists after the proof"
            ]
          },
          {
            n: 3,
            title: "Guard it in the data layer",
            text: "Masking and row-level rules are applied to every query — including the ones AI writes — and every interaction is logged.",
            image: "assets/img/steps/cross-system-erp-qa-3.svg",
            features: ["Sensitive fields masked by role, enforced in the data layer"]
          },
          {
            n: 4,
            title: "Ask in plain language",
            text: "Select AI answers over the governed schema, with two to three operational dashboards over the same joined data.",
            image: "assets/img/steps/cross-system-erp-qa-4.svg",
            features: [
              "Plain-English question answering over the governed schema",
              "Two to three operational dashboards over the joined data"
            ]
          }
        ],
        industryCases: [
          {
            industry: "cross-industry",
            label: "Every industry",
            image: "assets/img/industries/cross-industry.jpg",
            problem: "The same two pains turn up in every sector, whatever the stack. Every answer is a project — the BI backlog runs in weeks, so the business answers itself in a spreadsheet, and the same KPI comes back as two different numbers from two dashboards. Every acquisition and every new application adds another island nobody has integrated.",
            solution: "The join is done once, in the data, and every question reads from it: one governed layer under the applications, filled from Oracle applications by pipelines that already exist, with a plain-English answer surface on top. What shapes the work is the system landscape, so the same shape fits wherever the applications sit."
          },
          {
            industry: "manufacturing",
            label: "Manufacturing",
            image: "assets/img/industries/manufacturing.jpg",
            problem: "Supplier spend sits in the ERP, supplier performance in a second system and the contracts in a third. A procurement lead asking which suppliers are driving the overrun files a report request and waits, and the answer lands after the negotiation.",
            solution: "Purchase-order, invoice-status and supplier-spend questions are answered in plain language over ERP data joined with the systems around it. The standing report requests stop, and the certified views the answers run on are the same ones the dashboards use."
          },
          {
            industry: "logistics",
            label: "Logistics & supply chain",
            image: "assets/img/industries/logistics.jpg",
            problem: "The ERP knows orders and invoices, the CRM knows customers, and carriers, e-commerce and spreadsheets know the rest. A question as ordinary as which delayed orders are hurting the best accounts crosses two systems or more, lands in a queue, and comes back already stale.",
            solution: "Those sources are joined into one governed layer, and an operations lead slices SLA, backlog and throughput metrics without waiting on a data engineer. Sensitive fields stay masked by role, enforced by the database rather than by the prompt."
          }
        ],
        scope: {
          in: [
            "Prebuilt Oracle application pipelines switched on",
            "One or two non-Oracle sources linked or landed alongside",
            "One decision domain shaped into certified views",
            "Plain-English Q&A plus two to three operational dashboards",
            "Masking and row-level access enforced in the data layer"
          ],
          out: [
            "Live production integration — after the Jumpstart",
            "More sources and more decision domains — after the Jumpstart",
            "Production SLAs — after the Jumpstart",
            "Multi-entity rollout and per-region governance — at scale",
            "Write-back to the source applications: the system retrieves, it does not act"
          ]
        },
        moreDetail: [
          { title: "The pattern", body: "A request asked in plain language → a governed schema, single-source or federated across systems and clouds → numbers and charts back, no report request. No human gate; the system retrieves, it does not act." },
          { title: "Today", body: "The ERP knows orders and invoices; the CRM knows customers; carriers, e-commerce and spreadsheets know the rest. Every real question — which delayed orders are hurting our best accounts? — crosses two systems or more, lands in a BI queue, and comes back days later, already stale." },
          { title: "Tomorrow", body: "Business-app data flows into one governed layer — for Oracle applications through pipelines that exist out of the box — joined with one or two non-Oracle sources. On top: plain-English answers and dashboards that treat it all as one system, using definitions the business signed off." },
          { title: "Why the join is the value", body: "App-embedded analytics stops at each app’s border — the value is in the join." },
          { title: "Procurement lead", body: "Supplier spend, purchase-order and invoice-status questions answered in plain language over ERP data joined with the systems around it; standing report requests stop." },
          { title: "Operations lead", body: "Self-serve slicing of SLA, backlog and throughput metrics without waiting on the BI queue." }
        ],
        caseStudy: null
      },
      technology: {
        narrative: "Oracle Autonomous AI Lakehouse is the governed layer. Data from Oracle applications arrives through pipelines that ship with the products, one or two other sources are linked alongside, and Select AI answers in plain language over that model.",
        stack: [
          {
            key: "application",
            label: "Application / accelerator",
            summary: "What SoftServe builds on top: the decision domain, its certified views, the question set and the dashboards.",
            vendors: ["softserve"],
            items: [
              { name: "The decision domain and its certified views", required: true },
              { name: "Business definitions signed off with the owner", required: true },
              { name: "The agreed question set, tuned with the business", required: true },
              { name: "Two to three operational dashboards over the joined data", required: true }
            ]
          },
          {
            key: "data-platform",
            label: "Data & platform",
            summary: "Oracle Autonomous AI Lakehouse is the governed layer, with Select AI answering over it.",
            vendors: ["oracle"],
            items: [
              { name: "Oracle Autonomous AI Database 26ai as the governed layer", required: true },
              { name: "Select AI and Select AI Agent for natural-language querying", required: true },
              { name: "Data Studio for ELT", required: true },
              { name: "Database links for federation", required: true },
              { name: "Apache Iceberg", required: false },
              { name: "Vector search", required: false }
            ]
          },
          {
            key: "infrastructure",
            label: "Infrastructure",
            summary: "A managed service in your own tenancy — nothing to size, nothing to run.",
            vendors: ["oracle"],
            items: [
              { name: "Your own tenancy — OCI, or Autonomous inside AWS, Azure or Google Cloud regions", required: true },
              { name: "The managed Autonomous service — no cluster to size or operate", required: true }
            ]
          },
          {
            key: "custom",
            label: "Configuration & integrations",
            summary: "The sources connected, the governance configured, and how answers come back.",
            vendors: ["softserve"],
            items: [
              { name: "Oracle application data through the pipelines that ship with the products", required: true, direction: "inbound" },
              { name: "One or two non-Oracle sources, by link or by pipeline; read-only access", required: true, direction: "inbound" },
              { name: "Plain-English answers, certified views and operational dashboards", required: true, direction: "outbound" },
              { name: "Dynamic masking, row-level policies and the SQL firewall", required: true },
              { name: "Tenancy choice — OCI, or Autonomous inside AWS, Azure or Google Cloud regions", required: true }
            ]
          }
        ],
        capabilities: [
          {
            stage: "Connect",
            items: [
              { name: "Prebuilt pipelines from Oracle applications — no extract engineering" },
              { name: "One or two non-Oracle sources joined in, by link or by pipeline" },
              { name: "Data Studio for ELT" },
              { name: "Database links for federation" },
              { name: "Read-only source access" }
            ]
          },
          {
            stage: "Model",
            items: [
              { name: "Certified views for one decision domain" },
              { name: "Business definitions signed off with the owner" },
              { name: "Apache Iceberg tables where the estate already uses them" },
              { name: "Vector search over the governed schema" }
            ]
          },
          {
            stage: "Govern",
            items: [
              { name: "Dynamic masking of sensitive fields by role" },
              { name: "Row-level access policies" },
              { name: "SQL firewall applied to every query, including the ones AI writes" },
              { name: "Every interaction logged" },
              { name: "The same question asked in two roles returns two correctly filtered answers, enforced by the database itself" }
            ]
          },
          {
            stage: "Answer",
            items: [
              { name: "Select AI and Select AI Agent for plain-English question answering" },
              { name: "The agreed question set, tuned with the business owner" },
              { name: "Two to three operational dashboards over the joined data" },
              { name: "A governed foundation that persists after the proof" }
            ]
          }
        ]
      },
      jumpstart: {
        title: "Jumpstart Proof-of-Value",
        promise: "Pilot cross-system ERP Q&A on your own data in 30–45 days, at a fixed price, and let your own analysts put questions that span the systems to the test.",
        durationShort: "30–45 days",
        pillars: [
          { key: "fast", title: "Fast", text: "30 days for one clean source system; 45 for up to three sources or a stricter security setup." },
          { key: "low-risk", title: "Low-risk", text: "A fixed price per use case, in your own tenancy — OCI, or Autonomous inside AWS, Azure or Google Cloud regions. Source access is read-only, and every feature used is generally available." },
          { key: "tangible", title: "Tangible", text: "One decision domain answered end to end in plain language, measured against a baseline signed before the clock starts." }
        ],
        outcomes: [
          "A working AI use case — an agent plus certified views — live on your data, in your tenancy.",
          "Two to three operational dashboards over the same joined data, on definitions the business signed off.",
          "A measured readout against the signed baseline: time-to-answer versus today, and the share of questions served without a data engineer.",
          "A governed foundation that persists: the semantic model and the security policies stay with you."
        ],
        timeline: [
          { label: "Week 0 · Gate", text: "Sponsor named, two to three success metrics signed, source access approved in writing." },
          { label: "Weeks 1–2 · Connect", text: "Oracle application pipelines switched on; one or two non-Oracle sources linked or landed. Read-only access." },
          { label: "Weeks 2–4 · Model and guard", text: "One decision domain — order-to-cash exceptions, say — shaped into certified views, with sensitive fields masked by role." },
          { label: "Weeks 3–6 · Prove", text: "Plain-English Q&A and dashboards tuned on the agreed question set, then measured against the signed baseline." }
        ],
        needs: [
          "One decision domain, and a business owner who can sign off its definitions",
          "Read-only access to the Oracle applications and one or two systems around them",
          "Two to three success metrics and today’s baseline, agreed before the clock starts"
        ],
        investment: {
          price: "€30–50K fixed per use case",
          duration: "30–45 days",
          includes: [
            "One use case, up to three data sources",
            "Prebuilt Oracle application pipelines switched on",
            "Certified views, masking and row-level access enforced in the data layer",
            "Plain-English Q&A plus two to three operational dashboards",
            "100% of the fee credits into a roll-out signed within 90 days",
            "Every feature used is generally available — nothing in scope waits on a roadmap item"
          ],
          footnote: "Price indicative, confirmed in scoping; Oracle partner funding programs may reduce the net cost."
        },
        next: [
          { tier: "Integration", text: "Live integration, more sources and decision domains, production SLAs.", duration: "3–5 months", price: "Scoped against the integration depth" },
          { tier: "Scale", text: "Multi-entity rollout, with per-region governance and definitions.", duration: "3–12 months", price: "Scoped per engagement" }
        ],
        cta: { label: "Start a Jumpstart conversation", route: "#/products/cross-system-erp-qa/contacts" }
      },
      sellers: {
        materials: [
          { key: "lakehouse-jumpstart-deck", title: "AI Lakehouse Jumpstart — event showcase deck", description: "10 slides; the \"Your ERP + everything around it\" proof is this product.", state: "link-pending" },
          { key: "lakehouse-quickstart-deck", title: "AI Lakehouse Quick Start — offer deck", description: "6 slides; the Oracle-installed-base use case is this product’s doorway.", state: "link-pending" },
          { key: "one-pager", title: "Product one-pager", description: "The single-page version: problem, offer, what you keep.", state: "coming-soon" },
          { key: "feature-list", title: "Feature list", description: "The capability matrix: baseline, built, custom per engagement.", state: "coming-soon" },
          { key: "demo-video", title: "Demo video", description: "A recorded walkthrough of the governed Q&A layer.", state: "coming-soon" }
        ]
      }
    },
    {
      slug: "business-metrics-qa",
      name: "Business metrics Q&A",
      headline: { accent: "BUSINESS", rest: "METRICS Q&A" },
      category: "data-analysis",
      categoryChip: "Data analysis & optimization",
      facet: "oracle-autonomous-ai-lakehouse",
      oneLiner: "Answers plain-language questions about business metrics from one governed gold layer over the catalogs and databases you already run — consistent definitions, no data moved.",
      heroLine: "Ask once, every cloud answers.",
      badges: ["MULTI-CLOUD", "ON-PREM TOO", "NO MIGRATION"],
      tags: ["Data analysis & optimization", "Oracle Autonomous AI Lakehouse", "Select AI"],
      hero: {
        image: {
          file: "assets/img/heroes/business-metrics-qa.jpg",
          alt: "Rolling waves of fine blue data points, brighter points picked out along the ridges",
          focal: "50% 52%"
        }
      },
      tile: {
        outcomes: [
          "Cross-cloud answers in seconds, under your access rules",
          "The answer layer moves to your data — your data does not move to it",
          "A governed gold layer that persists after the proof: definitions and security policies you keep"
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
        industriesNote: "The same two pains in every industry, regardless of stack — what varies is the data estate.",
        steps: [
          {
            n: 1,
            title: "Mount what you already run",
            text: "Existing Iceberg catalogs are mounted and the databases outside them are linked, on-prem included. Nothing is copied.",
            image: "assets/img/steps/business-metrics-qa-1.svg",
            features: [
              "Catalog federation: mount the Iceberg catalogs you already run",
              "Database links to the systems not in a catalog, on-prem included",
              "Zero data movement — queries run where the data lives"
            ]
          },
          {
            n: 2,
            title: "Build the gold layer",
            text: "A small governed model over those sources carries the business definitions the organization signs off.",
            image: "assets/img/steps/business-metrics-qa-2.svg",
            features: [
              "A governed gold layer with definitions the organization signs off",
              "Converged data in one database: relational, JSON, spatial, graph, vector"
            ]
          },
          {
            n: 3,
            title: "Scope it by role",
            text: "Masking, row-level policies and a full audit trail are enforced by the database itself, on every query the assistant writes.",
            image: "assets/img/steps/business-metrics-qa-3.svg",
            features: ["Role-scoped answers and a full audit trail, enforced in the data layer"]
          },
          {
            n: 4,
            title: "Answer across every source",
            text: "Select AI answers plain-English questions across each connected source, tuned live with your analysts against an agreed question set.",
            image: "assets/img/steps/business-metrics-qa-4.svg",
            features: ["Plain-English question answering via Select AI over that layer"]
          }
        ],
        industryCases: [
          {
            industry: "cross-industry",
            label: "Every industry",
            image: "assets/img/industries/cross-industry.jpg",
            problem: "Two pains recur whatever the sector. Time: a cross-cloud question takes a data engineer, three extracts and a week, so the business answers itself in a spreadsheet. Trust: AI pilots die in security review, because nobody can prove what the model can see or show, and when auditors ask who saw what through AI there is no answer.",
            solution: "One governed engine mounts the catalogs already in place and links the databases outside them, then answers under the access rules those systems already enforce. What shapes the work here is the data estate, so the same shape fits wherever the data sits."
          },
          {
            industry: "retail",
            label: "Retail",
            image: "assets/img/industries/retail.jpg",
            problem: "Sales sit in one platform, stock in another, promotions in a third, and each acquisition adds an island nobody has integrated. Comparing sales by SKU, region and promotion means an extract per system and a wait.",
            solution: "A merchandiser asks the comparison in plain language and gets it back from the governed gold layer, across every connected source, with no data moved. The definitions behind the numbers are the ones the organization signed off, so two dashboards stop disagreeing."
          },
          {
            industry: "manufacturing",
            label: "Manufacturing",
            image: "assets/img/industries/manufacturing.jpg",
            problem: "Revenue, inventory and churn questions span plants, regions and the systems that came with each acquisition. Each platform has its own catalog, its own security model and its own team, so no single system sees enough of the picture for AI to be useful on it.",
            solution: "The existing catalogs are mounted and the remaining databases linked, including on-prem, with the answer layer moving to wherever the data already sits. An assistant answers across all of it in plain language, role-scoped and fully audited."
          }
        ],
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
            "Live production integration and more catalogs — after the Jumpstart",
            "Additional decision domains and production SLAs — after the Jumpstart",
            "Multi-entity rollout and per-region governance — at scale",
            "Write-back to the source systems: the system retrieves, it does not act"
          ]
        },
        moreDetail: [
          { title: "The pattern", body: "A request asked in plain language → a governed schema, single-source or federated across systems and clouds → numbers and charts back, no report request. No human gate; the system retrieves, it does not act." },
          { title: "Today", body: "Data lives in AWS, Azure, Google and on-prem databases. Each platform has its own catalog, its own security model, its own team. So a cross-cloud question — group revenue by product, all regions, today — takes a data engineer, three extracts and a week. AI initiatives stall: no single system sees the whole picture." },
          { title: "Tomorrow", body: "One governed engine mounts the catalogs you already have — AWS Glue, Databricks Unity, Snowflake — and links your databases, querying data where it lives. No migration. On top: an AI assistant answers plain-English questions across all of it, and obeys your access rules. The platform runs inside whichever cloud you prefer; your apps stay where they are." },
          { title: "Why the answer layer moves", body: "The answer layer moves to your data — your data does not move to it." },
          { title: "TIME — every answer is a project", body: "The BI backlog runs in weeks, so the business answers itself in Excel. Same KPI, two dashboards, two different numbers — nobody trusts either. Every acquisition and every new app adds an island nobody has integrated." },
          { title: "TRUST — AI is stuck in security review", body: "Pilots die in review: no one can prove what the model can see or show. Access rules live app by app; AI cuts across all of them at once. When auditors ask who saw what through AI, there is no answer today." },
          { title: "Business manager", body: "Ask revenue, churn or inventory questions in plain language; get charts back from governed data, no report request." },
          { title: "Merchandiser", body: "Sales by SKU, region and promotion compared on demand." }
        ],
        caseStudy: null
      },
      technology: {
        narrative: "Bronze and silver stay where they are. Oracle Autonomous AI Lakehouse becomes the governed gold layer — existing catalogs mounted, other databases linked — and Select AI answers across all of them with no data movement.",
        stack: [
          {
            key: "application",
            label: "Application / accelerator",
            summary: "What SoftServe builds on top: the gold model, its definitions, and the question set it is tuned against.",
            vendors: ["softserve"],
            items: [
              { name: "The governed gold model and its business definitions", required: true },
              { name: "Catalog mounting and database links, configured", required: true },
              { name: "The agreed 30-question set and accuracy tuning with your analysts", required: true }
            ]
          },
          {
            key: "data-platform",
            label: "Data & platform",
            summary: "Oracle Autonomous AI Lakehouse becomes the governed gold layer; bronze and silver stay where they are.",
            vendors: ["oracle"],
            items: [
              { name: "Oracle Autonomous AI Database 26ai as the governed gold layer", required: true },
              { name: "Select AI and Select AI Agent", required: true },
              { name: "Apache Iceberg for catalog federation", required: true },
              { name: "Database links", required: true },
              { name: "Vector search", required: false },
              { name: "Data Studio", required: false },
              { name: "Exadata", required: false }
            ]
          },
          {
            key: "infrastructure",
            label: "Infrastructure",
            summary: "A managed service in whichever cloud you prefer — your applications stay where they are.",
            vendors: ["oracle"],
            items: [
              { name: "Your own tenancy — OCI, or Autonomous inside AWS, Azure or Google Cloud regions", required: true },
              { name: "The managed Autonomous service — no cluster to size or operate", required: true }
            ]
          },
          {
            key: "custom",
            label: "Configuration & integrations",
            summary: "The catalogs mounted, the databases linked, and the governance that scopes every answer.",
            vendors: ["softserve"],
            items: [
              { name: "Existing Iceberg catalogs mounted — AWS Glue, Databricks Unity Catalog, Snowflake", required: true, direction: "inbound" },
              { name: "Databases linked, including on-prem; read-only access", required: true, direction: "inbound" },
              { name: "Plain-English answers and charts across every connected source", required: true, direction: "outbound" },
              { name: "Dynamic masking, row-level policies and the SQL firewall", required: true },
              { name: "Zero data movement — queries run where the data lives", required: true }
            ]
          }
        ],
        capabilities: [
          {
            stage: "Mount",
            items: [
              { name: "Catalog federation — mount the Iceberg catalogs you already run" },
              { name: "Database links to the systems not in a catalog, on-prem included" },
              { name: "Zero data movement — queries run where the data lives" },
              { name: "Read-only source access" }
            ]
          },
          {
            stage: "Model",
            items: [
              { name: "A governed gold layer with definitions the organization signs off" },
              { name: "Bronze and silver stay where they are" },
              { name: "Converged data in one database — relational, JSON, spatial, graph and vector" }
            ]
          },
          {
            stage: "Govern",
            items: [
              { name: "Dynamic masking of sensitive fields by role" },
              { name: "Row-level access policies" },
              { name: "SQL firewall applied to every query, including the ones AI writes" },
              { name: "Role-scoped answers with a full audit trail" },
              { name: "The same question asked in two roles returns two correctly filtered answers, enforced by the database itself" }
            ]
          },
          {
            stage: "Answer",
            items: [
              { name: "Select AI and Select AI Agent for plain-English question answering" },
              { name: "An agreed 30-question set, accuracy tuned live with your analysts" },
              { name: "Answers across every connected source, with no data moved" },
              { name: "A governed foundation that persists after the proof" }
            ]
          }
        ]
      },
      jumpstart: {
        title: "Jumpstart Proof-of-Value",
        promise: "Pilot business metrics Q&A on your own data in 30–45 days, at a fixed price, and see your KPIs answered from one set of certified definitions.",
        durationShort: "30–45 days",
        pillars: [
          { key: "fast", title: "Fast", text: "30 days for one clean source system; 45 for up to three sources or a stricter security setup." },
          { key: "low-risk", title: "Low-risk", text: "A fixed price per use case, in whichever cloud you prefer. Nothing is migrated or copied: queries run where the data lives, under read-only access. Every feature used is generally available." },
          { key: "tangible", title: "Tangible", text: "An assistant answering an agreed 30-question set across every connected source, measured against a baseline signed before the clock starts." }
        ],
        outcomes: [
          "A working AI use case — an agent plus curated views — live on your data, in your tenancy.",
          "Answers across two to three mounted catalogs and a linked database, with no data moved.",
          "A measured readout against the signed baseline: time-to-answer versus today, and the share of questions served without a data engineer.",
          "A governed foundation that persists: the gold model and the security policies stay with you."
        ],
        timeline: [
          { label: "Week 0 · Gate", text: "Sponsor named, two to three success metrics signed, source access approved in writing." },
          { label: "Weeks 1–2 · Connect", text: "Your teams grant read-only access; two to three existing catalogs are mounted and one on-prem database linked. Zero data movement." },
          { label: "Weeks 2–4 · Model and guard", text: "A small governed model: business definitions, masking and row-level access." },
          { label: "Weeks 3–6 · Prove", text: "The assistant answers the agreed 30-question set, accuracy tuned with your analysts, then measured against the signed baseline." }
        ],
        needs: [
          "Two to three existing catalogs, and one database outside them worth linking",
          "An agreed 30-question set, and the analysts who will judge the answers",
          "Two to three success metrics and today’s baseline, agreed before the clock starts"
        ],
        investment: {
          price: "€30–50K fixed per use case",
          duration: "30–45 days",
          includes: [
            "One use case, up to three data sources",
            "Two to three existing catalogs mounted, one on-prem database linked",
            "A governed gold model with masking and row-level access in the data layer",
            "An assistant answering an agreed 30-question set across every connected source",
            "100% of the fee credits into a roll-out signed within 90 days",
            "Every feature used is generally available — nothing in scope waits on a roadmap item"
          ],
          footnote: "Price indicative, confirmed in scoping; Oracle partner funding programs may reduce the net cost."
        },
        next: [
          { tier: "Integration", text: "Live integration, more catalogs, databases and decision domains, production SLAs.", duration: "3–5 months", price: "Scoped against the integration depth" },
          { tier: "Scale", text: "Multi-entity rollout, with per-region governance and definitions.", duration: "3–12 months", price: "Scoped per engagement" }
        ],
        cta: { label: "Start a Jumpstart conversation", route: "#/products/business-metrics-qa/contacts" }
      },
      sellers: {
        materials: [
          { key: "lakehouse-jumpstart-deck", title: "AI Lakehouse Jumpstart — event showcase deck", description: "10 slides; the \"Ask once, every cloud answers\" proof is this product.", state: "link-pending" },
          { key: "lakehouse-quickstart-deck", title: "AI Lakehouse Quick Start — offer deck", description: "6 slides; the AI-grade gold-layer use case is this product’s doorway.", state: "link-pending" },
          { key: "one-pager", title: "Product one-pager", description: "The single-page version: problem, offer, what you keep.", state: "coming-soon" },
          { key: "feature-list", title: "Feature list", description: "The capability matrix: baseline, built, custom per engagement.", state: "coming-soon" },
          { key: "demo-video", title: "Demo video", description: "A recorded walkthrough of the cross-cloud assistant.", state: "coming-soon" }
        ]
      }
    }

  ],

  services: {
    hero: {
      image: {
        file: "assets/img/heroes/services.jpg",
        alt: "An engineer seen from behind at a wall of code on dark monitors in a low-lit workspace",
        focal: "50% 50%"
      },
      headline: { accent: "ORACLE", rest: "DEDICATED PRACTICE" },
      lead: "SoftServe’s Oracle practice pairs the delivery depth of a 500-strong data and analytics practice with architects and engineers dedicated to the Oracle AI stack.",
      secondParagraph: "The practice focuses on two things: joint delivery with Oracle’s AI & Data organization, and repeatable accelerator packs on four Oracle platforms.",
      stats: [
        { value: "500+", label: "data experts in SoftServe’s data and analytics practice" },
        { value: "150+", label: "active projects in that practice" },
        { value: "30", label: "Fortune 500 clients in SoftServe’s data and analytics practice" },
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
          duration: "30–45 days on the Lakehouse Jumpstart · about 2 months on the packaged Oracle Cloud Infrastructure + NVIDIA packs · scoped per engagement on the deep-research investigations",
          pricing: "A fixed price for the packaged scope; scoped per engagement on the deep-research investigations"
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
      ladderFootnote: "Figures are illustrative and confirmed in scoping.",
      howAPovRuns: {
        title: "HOW A PROOF OF VALUE RUNS",
        steps: [
          { title: "Before the clock", body: "The use case is picked, two to three success metrics are signed, and source access is approved in writing." },
          { title: "Connect", body: "The platform is provisioned and data is connected, often zero-copy." },
          { title: "Model and guard", body: "A small governed model, or the pack configured against your rules: business definitions, masking, row-level access." },
          { title: "Prove", body: "Measurement against the signed baseline, an executive readout, and a costed expansion plan." }
        ],
        closing: "30–45 days on the Lakehouse Jumpstart; about two months on the packaged Oracle Cloud Infrastructure + NVIDIA accelerator packs; scoped per engagement where the work is a deep-research investigation over historical records."
      }
    },

    whySoftServe: {
      title: "WHY SOFTSERVE",
      items: [
        { title: "Transferred lakehouse depth", body: "500+ data experts, 150+ active projects and 30 Fortune 500 clients in the Data & Analytics practice. A Databricks partner since 2022 with 100+ certified data engineers; a Snowflake consulting partner since 2018 with 50+ certified data engineers. That practice is now pointed at the Oracle stack." },
        { title: "Joint delivery with Oracle", body: "We deliver alongside Oracle’s AI & Data organization, in joint teams — not as a vendor bolted on afterwards." },
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
      heading: "LET’S TALK",
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
      label: "I agree to SoftServe processing this inquiry. See the privacy policy.",
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
      submitRequest: "Send the request",
      submitContact: "Request a scoping call",
      required: "Required",
      invalidEmail: "Enter a valid work email address."
    },
    demo: {
      anchor: "request-a-demo",
      heading: "REQUEST A DEMO",
      sub: "Tell us the account or workflow you have in mind. One scoping conversation starts it — we come back with what a proof of value would cover, on your data.",
      submitLabel: "Request a demo",
      secondaryHeading: "SEND A REQUEST",
      secondarySub: "Tell us the account or workflow you have in mind. We come back with what a proof of value would cover, on your data."
    },
    contact: {
      anchor: "contact",
      heading: "LET’S TALK",
      sub: "Tell us the workflow, the volume and the current cycle time. We come back with what a proof of value would cover, what it would cost, and what it would measure.",
      submitLabel: "Send"
    },
    confirmations: {
      posted: {
        title: "Thanks — your request is in.",
        body: "Someone from the Oracle practice will come back within two working days with a proposed scoping call. If you already know which workflow you want proved, bring a rough volume and a current cycle time — that’s most of what the first conversation needs."
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
        title: "That didn’t send.",
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
    notesHeading: "Seller notes",
    stateLegend: {
      "link-pending": "Link pending — the document exists, the share link does not yet",
      "coming-soon": "Coming soon — not written yet",
      "superseded": "Superseded — do not distribute",
      "planned": "Planned — scoped, not started"
    },
    cta: {
      heading: "SEE THE FIT IN ONE OF YOUR ACCOUNTS?",
      body: "Let’s discuss a Proof of Value on the customer’s own data — {duration}, ending in measurable KPIs.",
      bodyFallback: "Let’s discuss a Proof of Value on the customer’s own data: a fixed-scope engagement with signed success metrics.",
      contactLabel: "SoftServe Oracle practice — alliances and partnerships",
      action: "Request a demo"
    }
  }
};
