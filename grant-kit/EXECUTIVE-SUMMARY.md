# CityPulse — Executive Summary

**AI civic-infrastructure intelligence platform**
Live demo: https://citypulse-beta.vercel.app · Contact: ctmakc@gmail.com

---

## The problem we exist to solve

The infrastructure that underpins public health and safety — water mains, sewers, stormwater systems,
roads, bridges, pumps, and the data behind them — is aging faster than the cities that own it can fund,
inspect, or even observe its decline. The 2025 ASCE Infrastructure Report Card awarded U.S.
infrastructure its highest grade in the report's history, a **"C,"** and in the same breath projected a
**$3.7 trillion gap** between planned investment and what good working order requires through 2033 — up
sharply from $2.59 trillion four years earlier. Roads remain at **D+**, wastewater at **D+**, and
stormwater at **D**; together, wastewater and stormwater carry an estimated **$690 billion** funding
gap over the next decade. Despite historic federal infrastructure spending, the country is meeting only
about **30%** of capital needs across its water systems, and many of those authorizations face
uncertainty as they approach expiry.

The structural problem is not only money — it is **visibility and prioritization**. The overwhelming
majority of the ~19,000 U.S. municipalities (and ~3,700 in Canada) manage critical assets through
spreadsheets, paper inspection logs, siloed GIS files, and fundamentally **reactive** maintenance. A
city typically learns an asset has failed *after* the flood, the backup, or the sinkhole. Staff cannot
prioritize repairs they cannot predict; finance teams cannot defend budgets they cannot quantify; and —
critically — cities routinely **miss the grant funding that already exists** because they cannot
translate the risk they carry into the language and evidence that funders require.

## What CityPulse is

**CityPulse is the operating system for municipal infrastructure.** It gives a city a single, live,
predictive view of every asset it owns, and the tools to act on that view before things break. Six
capabilities work as one system:

1. **Digital twin** — an interactive, spatially accurate model of the city's assets and networks
   (PostGIS), so staff see the real system, not a binder.
2. **Predictive asset-failure intelligence** — risk scoring and lead-time estimates that move the city
   from reactive to *pre-emptive* maintenance.
3. **311 / citizen-request intake** — issues are auto-classified, geolocated, and routed to the right
   crew, closing the loop between residents and operations.
4. **AI agents** — they triage signals, summarize conditions, draft work orders, and recommend the next
   best action, with explanations staff can trust and act on.
5. **Emergency / incident mode** — coordinated situational awareness and response when conditions turn
   critical.
6. **Capital & grant intelligence** — CityPulse maps a city's documented asset risk to the specific
   funding programs that pay to fix it, turning condition data into fundable projects.

This is not a prototype. CityPulse is **production-grade software**: **Next.js + NestJS + PostGIS +
Redis**, built to **WCAG 2.1 AA** accessibility (a procurement requirement in the public sector),
covered by automated tests and continuous integration, and deployable via Docker. A **live, working
demo is online today** at https://citypulse-beta.vercel.app — evaluators can use the real product, not
a slideshow.

## Evidence of impact

To size the value CityPulse creates, we use a reference-deployment model we call **"Meridian"** —
**illustrative figures** drawn from a representative municipality and our published ROI methodology,
validated per city during pilot:

- **$4.2M** in avoided cost per year (deferred emergency repairs, reduced overtime, extended asset life)
- **82%** of asset failures pre-detected before service impact
- **9-minute** average predictive lead time on time-critical, sensor-instrumented events (with
  longer-horizon, condition-based risk surfaced on slow-degrading assets)
- **47** citizen 311 requests auto-routed to the correct crew without manual triage
- **$38.6M** in capital and grant funding pipeline surfaced and mapped to the city's own asset risk

We present these as **reference/illustrative** by design. The point of a pilot is to replace them with
*that city's* numbers — and CityPulse is instrumented to measure exactly these outcomes from day one.

## Market and timing

The market is large, public, and growing. U.S. state and local governments spent roughly **$463
billion on infrastructure in 2024** — a 20-year high — with highways and streets (~$141B) and water/sewer
systems among the largest categories. In Canada, the municipal infrastructure deficit is estimated at
**~$270 billion**; local governments own **more than 60%** of the country's core public infrastructure
yet receive only **8–10 cents of every tax dollar**, and Budget 2025's Build Communities Strong Fund
commits **$51 billion over ten years**. The enabling technology is maturing in parallel: the digital-twin
market is roughly **$33B in 2025**, projected to **~$49B+ by 2030** (with far higher upside in
aggressive forecasts), inside a smart-cities market growing from **~$700B (2025) to ~$1.45T by 2030**.

The timing is unusually favorable. Historic infrastructure dollars are flowing now, but **funding is
constrained, scrutinized, and increasingly tied to documented need and resilience outcomes** — exactly
what CityPulse produces. Cities that can *quantify risk and show resilience impact* will win the funding;
those that cannot will fall further behind. CityPulse is the system that lets them quantify it.

## Business model and the ask

CityPulse sells as **tiered SaaS aligned to public procurement — Pilot → City → Region → Enterprise** —
priced to population and infrastructure footprint. A paid pilot lands quickly and de-risks the decision;
annual subscriptions follow, expanding across departments (water, roads, stormwater, emergency) and up
to regional scope. Notably, the platform's grant-intelligence layer can help a city **fund its own
subscription out of the capital programs CityPulse surfaces** — a self-reinforcing value loop.

We are seeking **grant support and partnership** to convert a live product and a validated impact model
into **funded municipal pilots across the U.S. and Canada**, with a deliberate **public-benefit track
for small, rural, and disadvantaged communities** that need this capability most and can least afford
to build it. Use of funds: pilot deployments and data/sensor integrations; security and procurement
readiness (including a SOC 2 path); and the equity pricing track that puts predictive infrastructure
intelligence within reach of under-resourced communities.

**The infrastructure is already failing in slow motion. CityPulse makes it visible, predictable, and
fundable — before the next failure becomes the next emergency.**

---
*Sources: ASCE 2025 Infrastructure Report Card; U.S. Census Bureau / Brookings public-infrastructure
spending analysis; Federation of Canadian Municipalities and Housing, Infrastructure and Communities
Canada; MarketsandMarkets and Grand View Research (digital twin / smart cities). "Meridian"
reference-deployment metrics are illustrative and validated per city during pilot.*
