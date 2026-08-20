# SBG PoC — objective, scope and success measures (draft)

_source: Dmytro Dundych's PoC discussion summary, supplied by Alex in chat 2026-08-20. Post-dates the [2026-08-17 workshop debrief](2026-08-17_sbg-poc-workshop-debrief.md) — it already adopts KFSC (King Fahd Stadium Complex) as the retrospective anchor case, which was that debrief's recommendation._
_type: source material — read-only. Distilled state lives in [sbg-poc.md](../sbg-poc.md)._

## PoC Objective

Validate whether historical project data can generate reliable package-level performance insights by identifying key variances, recurring patterns and their potential drivers, and validating the findings against available ground truth and SBG SME knowledge.

## In Scope

- KFSC as the retrospective anchor case.
- Static, raw exports from Primavera, Oracle and other available project data sources.
- Assessment and normalization of data completeness, consistency, granularity and gaps.
- Mapping cost, schedule, execution-model, subcontractor and issue data to the lowest reliable common level — ideally Work Package/WBS where supported by the data.
- Planned-versus-actual cost and schedule analysis.
- Identification of significant variances and recurring performance patterns.
- Identification of potential drivers based on available project evidence.
- Traceability of findings to supporting source data.
- Validation of variances, patterns and drivers against ground truth and SBG SME knowledge.
- Assessment of which insights can be generated reliably and where data limitations reduce confidence.

## Analytical Flow

Data → Quality and Completeness Assessment → Normalize and Map → Detect Variances → Identify Patterns and Drivers → Link Evidence → Validate

An inability to generate a reliable insight because of missing mapping, insufficient granularity or incomplete data will also be treated as a **valid PoC finding**.

## Expected Output

A structured view showing:

- available and normalized project/package data;
- identified cost and schedule variances;
- recurring performance patterns;
- potential variance and performance drivers;
- supporting source evidence;
- confidence level;
- ground-truth and SME validation status;
- identified data gaps and their impact on analytical reliability.

## Out of Scope

- Recommendations for packaging a new project.
- Automated Work Package design or decomposition.
- Automated self-perform versus subcontract recommendations.
- Automated subcontractor selection.
- Analysis of new-project inputs against historical projects.
- Live Primavera or Oracle integration.
- Real-time project planning.
- Production-scale workflows, permissions or continuous recommendations.

## Proposed Success Measures

1. **Variance Accuracy** — how accurately the PoC identifies known plan-versus-actual deviations.
2. **Driver Confirmation Rate** — the share of identified drivers confirmed by ground truth or SBG SMEs.
3. **Evidence Coverage** — the share of findings supported by sufficient traceable source evidence.

Can we detect it? → Can we explain it? → Can we prove it?
