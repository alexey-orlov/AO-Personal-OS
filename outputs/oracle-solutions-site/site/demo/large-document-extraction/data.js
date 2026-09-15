/* Demo data — one prepared supplier agreement, its extracted values, and the
   mock document pages. Everything here is synthetic. */
window.DEMO_DATA = (function () {
  var doc = {
    id: "MSA-2026-014",
    name: "Meridian Facility Services — Master Services Agreement",
    file: "MSA-2026-014_Meridian_Facility_Services.pdf",
    size: "3.1 MB",
    pages: 48,
    counterparty: "Meridian Facility Services Ltd",
    category: "Supplier services agreement",
    schedule: "Schedule B — Rate card, rev. 3",
    sites: "Northgate Campus (NGC) · Riverside DC (RDC)",
    from: "2026-04-01",
    to: "2029-03-31",
    currency: "EUR"
  };

  /* Service groups: one per part of the rate schedule. `page` is where the
     values sit in the source; each row cites it. */
  var groups = [
    { id: "cleaning", name: "Routine cleaning", page: 7, section: "B.1", conf: "High", rows: [
      { service: "Office areas — daily clean", sites: "NGC, RDC", basis: "Per m² per month", value: "1.85", section: "B.1.1", scenario: "Open-plan and cellular office space, five visits per week", conf: 97 },
      { service: "Sanitary areas", sites: "NGC, RDC", basis: "Per visit", value: "42.00", section: "B.1.2", scenario: "All washrooms on a floor, one visit", conf: 96 },
      { service: "Kitchens and break areas", sites: "NGC, RDC", basis: "Per visit", value: "28.50", section: "B.1.3", scenario: "Includes appliance surfaces, excludes deep clean", conf: 94 },
      { service: "Reception and lobby", sites: "NGC", basis: "Per visit", value: "36.00", section: "B.1.4", scenario: "Ground-floor public areas, weekday mornings", conf: 95 }
    ]},
    { id: "deep", name: "Periodic deep clean", page: 8, section: "B.2", conf: "High", rows: [
      { service: "Carpet extraction clean", sites: "NGC, RDC", basis: "Per m²", value: "3.40", section: "B.2.1", scenario: "Quarterly, outside business hours", conf: 93 },
      { service: "Hard-floor strip and seal", sites: "NGC, RDC", basis: "Per m²", value: "6.10", section: "B.2.2", scenario: "Twice a year, on request", conf: 92 }
    ]},
    { id: "discount", name: "Volume discounts", page: 9, section: "B.3", conf: "Medium", rows: [
      { service: "Tier 1 — 1 to 7 visits per week", sites: "All", basis: "Discount on routine cleaning", value: "0%", section: "B.3", scenario: "Full rate applies", conf: 91 },
      { service: "Tier 2 — 8 to 14 visits per week", sites: "All", basis: "Discount on routine cleaning", value: "5%", section: "B.3", scenario: "Applied to the monthly invoice total", conf: 90 },
      { service: "Tier 3 — 15 to 21 visits per week", sites: "All", basis: "Discount on routine cleaning", value: "10%", section: "B.3", scenario: "Applied to the monthly invoice total", conf: 89 },
      { service: "Tier 4 — 23 to 28 visits per week", sites: "All", basis: "Discount on routine cleaning", value: "15%", section: "B.3", scenario: "Applied to the monthly invoice total", conf: 71,
        flag: { rule: "Tier ranges must be contiguous", detail: "Tier 3 ends at 21 visits; the extracted Tier 4 starts at 23, leaving 22 uncovered.", suggested: "Tier 4 — 22 to 28 visits per week", field: "service" } }
    ]},
    { id: "waste", name: "Waste collection", page: 10, section: "B.4", conf: "High", rows: [
      { service: "General waste — 1100 L container", sites: "NGC, RDC", basis: "Per lift", value: "18.20", section: "B.4.1", scenario: "Scheduled lifts, twice a week", conf: 96 },
      { service: "Recycling — mixed dry", sites: "NGC, RDC", basis: "Per lift", value: "12.40", section: "B.4.2", scenario: "Scheduled lifts, weekly", conf: 95 },
      { service: "Confidential shredding", sites: "NGC", basis: "Per console", value: "9.80", section: "B.4.3", scenario: "Locked consoles, monthly exchange", conf: 93 }
    ]},
    { id: "guarding", name: "Manned guarding", page: 12, section: "B.5", conf: "High", rows: [
      { service: "Security officer — weekday day shift", sites: "NGC, RDC", basis: "Per hour", value: "24.50", section: "B.5.1", scenario: "06:00–18:00 Monday to Friday", conf: 98 },
      { service: "Security officer — night shift", sites: "NGC, RDC", basis: "Per hour", value: "27.80", section: "B.5.2", scenario: "18:00–06:00, any day", conf: 97 },
      { service: "Security officer — weekend", sites: "NGC, RDC", basis: "Per hour", value: "31.20", section: "B.5.3", scenario: "Saturday and Sunday day shift", conf: 96 },
      { service: "Security officer — public holiday", sites: "NGC, RDC", basis: "Per hour", value: "38.90", section: "B.5.4", scenario: "National public holidays, any shift", conf: 95 }
    ]},
    { id: "callout", name: "Maintenance call-out", page: 14, section: "B.6", conf: "High", rows: [
      { service: "Standard call-out", sites: "NGC, RDC", basis: "Per call", value: "85.00", section: "B.6.1", scenario: "Attend within 8 working hours", conf: 96 },
      { service: "Emergency call-out", sites: "NGC, RDC", basis: "Per call", value: "140.00", section: "B.6.2", scenario: "Attend within 4 hours, any time", conf: 95 },
      { service: "Engineer labour", sites: "NGC, RDC", basis: "Per hour", value: "48.00", section: "B.6.3", scenario: "On site, after the first hour", conf: 94 }
    ]},
    { id: "ooh", name: "Out-of-hours surcharge", page: 15, section: "B.7", conf: "Medium", rows: [
      { service: "Weekday evening (18:00–22:00)", sites: "All", basis: "Uplift on labour rates", value: "25%", section: "B.7.1", scenario: "Planned work requested by the client", conf: 84 },
      { service: "Night, weekend and public holiday", sites: "All", basis: "Uplift on labour rates", value: "50%", section: "B.7.2", scenario: "Planned work requested by the client", conf: 82 }
    ]},
    { id: "cancel", name: "Cancellation charges", page: 21, section: "B.9", conf: "High", rows: [
      { service: "Cancelled with 48 hours' notice or more", sites: "All", basis: "Share of the visit rate", value: "0%", section: "B.9.1", scenario: "Written notice to the service desk", conf: 95 },
      { service: "Cancelled between 24 and 48 hours", sites: "All", basis: "Share of the visit rate", value: "50%", section: "B.9.2", scenario: "Written notice to the service desk", conf: 94 },
      { service: "Cancelled with less than 24 hours' notice", sites: "All", basis: "Share of the visit rate", value: "100%", section: "B.9.3", scenario: "Including no-access on arrival", conf: 94 }
    ]}
  ];

  /* Files offered by the mock picker. Only the first is the walkthrough's. */
  var pickerFiles = [
    { name: doc.file, kind: "PDF · 48 pages", size: doc.size, main: true },
    { name: "SLA-2025-081_Halcyon_IT_Support.pdf", kind: "PDF · 31 pages", size: "1.9 MB" },
    { name: "LSA-2024-207_Riverside_DC_lease.pdf", kind: "PDF · 64 pages", size: "4.6 MB" },
    { name: "FRM-2026-002_Catering_framework.docx", kind: "DOCX · 22 pages", size: "0.8 MB" }
  ];

  /* Documents already in the workspace before the walkthrough starts. */
  var existingDocs = [
    { id: "SLA-2025-081", name: "Halcyon IT Support — Service Level Agreement", counterparty: "Halcyon Technology Services", category: "Service level agreement", pages: 31, uploaded: "2026-09-08", status: "Exported", values: 17 },
    { id: "LSA-2024-207", name: "Riverside DC — Lease Schedule", counterparty: "Greyfield Estates plc", category: "Property lease", pages: 64, uploaded: "2026-09-11", status: "Approved", values: 22 }
  ];

  /* ---- Mock document pages ------------------------------------------- */
  var clauses = [
    ["Interpretation", "Capitalised terms have the meanings given in Schedule A. References to a clause are to a clause of this Agreement unless stated otherwise. The singular includes the plural and the headings do not affect interpretation."],
    ["Term", "This Agreement commences on the Commencement Date and continues for the Initial Term, after which it renews for successive periods of twelve months unless either party gives not less than ninety days' written notice."],
    ["Services", "The Supplier shall provide the Services described in Schedule C at the Sites listed in Schedule D, in accordance with the Service Levels in Schedule E and with reasonable skill and care."],
    ["Ordering", "The Client may order Services by issuing a Purchase Order that references this Agreement. No terms in a Purchase Order vary this Agreement unless expressly agreed in writing by both parties."],
    ["Charges", "The Client shall pay the Charges set out in Schedule B. Charges are exclusive of value added tax, which shall be added at the prevailing rate. No other charges are payable unless agreed in writing."],
    ["Invoicing", "The Supplier shall invoice monthly in arrears. Each invoice shall itemise the Services by Site, quantity and applicable rate, and shall reference the Purchase Order under which the Services were ordered."],
    ["Payment", "Undisputed invoices are payable within thirty days of receipt. The Client may withhold payment of any disputed amount pending resolution under the dispute procedure, and shall notify the Supplier of the dispute within ten Business Days."],
    ["Indexation", "Rates in Schedule B are fixed for the first contract year and may thereafter be adjusted once per year by the lesser of the published consumer price index and three per cent, on ninety days' written notice."],
    ["Personnel", "The Supplier shall ensure that all personnel deployed to a Site are suitably qualified, vetted in accordance with Schedule F, and hold a valid site pass issued by the Client."],
    ["Service credits", "Where the Supplier fails to meet a Service Level, the service credits in Schedule E apply and shall be deducted from the next invoice. Service credits are the Client's sole remedy for the failure to which they relate, save in the case of persistent failure."],
    ["Change control", "Either party may propose a change to the Services or the Charges by issuing a change request. No change takes effect until a change note is signed by both parties."],
    ["Insurance", "The Supplier shall maintain public liability, employer's liability and professional indemnity insurance at the levels set out in Schedule G for the Term and for two years after."],
    ["Confidentiality", "Each party shall keep the other's Confidential Information confidential and shall not use it except for the purposes of this Agreement. This clause survives termination."],
    ["Termination", "Either party may terminate this Agreement on written notice if the other commits a material breach that is not remedied within thirty days of notice, or becomes insolvent."],
    ["Exit", "On expiry or termination the Supplier shall co-operate with the Client and any replacement supplier to ensure an orderly transfer of the Services, and shall return all Client property and data."],
    ["Governing law", "This Agreement is governed by the laws of the jurisdiction stated in Schedule A, and the parties submit to the exclusive jurisdiction of its courts."]
  ];

  function pageContent(n) {
    if (n === 1) return { kind: "cover" };
    if (n === 2) return { kind: "toc" };
    if (n === 6) return { kind: "schedule-intro" };
    var g = groups.filter(function (x) { return x.page === n; })[0];
    if (g) return { kind: "table", group: g };
    var start = ((n * 3) % clauses.length);
    var items = [];
    for (var i = 0; i < 3; i++) items.push(clauses[(start + i) % clauses.length]);
    var clauseNo = n < 6 ? n + 1 : n - 20 > 0 ? 8 + ((n - 20) % 9) : 3 + (n % 4);
    return { kind: "clauses", items: items, clauseNo: clauseNo };
  }

  return { doc: doc, groups: groups, pickerFiles: pickerFiles, existingDocs: existingDocs, pageContent: pageContent, clauses: clauses };
})();
