# CityPulse — One-Pager

**AI civic-infrastructure intelligence for the cities that keep us safe.**

Live demo: **https://citypulse-beta.vercel.app** · Contact: **ctmakc@gmail.com**

---

## The problem

America's and Canada's public infrastructure is aging faster than cities can fund or even *see* its
decline. The 2025 ASCE Infrastructure Report Card gave U.S. infrastructure its highest grade ever — a
**"C"** — while projecting a **$3.7 trillion investment gap** through 2033, up from $2.59T four years
earlier. Roads sit at **D+**, stormwater at **D**, and wastewater at **D+**; combined, wastewater and
stormwater alone face a **~$690B 10-year funding gap**. Even with federal infrastructure dollars, the
U.S. is meeting only **~30%** of capital needs across water systems.

The cities that own this infrastructure run it on **spreadsheets, paper logs, and reactive
maintenance**. They learn a culvert is failing when a street floods, a pump fails when sewage backs up,
a bridge joint cracks when an inspector happens by. They cannot prioritize repairs they cannot
predict, and they cannot win the grants that exist because they cannot quantify the risk they carry.

## The solution

**CityPulse is the operating system for municipal infrastructure** — a single platform that gives a
city a live, predictive view of every asset it owns and the tools to act before things break.

- **Digital twin** of the city's assets and networks on an interactive PostGIS map.
- **Predictive asset-failure intelligence** that flags failures *before* they happen, with lead time.
- **311 / citizen-request intake** that auto-classifies, geolocates, and routes issues to the right crew.
- **AI agents** that triage, summarize, draft work orders, and surface the next best action for staff.
- **Emergency / incident mode** for coordinated response when conditions turn critical.
- **Capital & grant intelligence** that maps a city's asset risk to the funding programs that pay for it.

## How it works

City asset, sensor, and 311 data flow into CityPulse's spatial model (PostGIS). A prediction layer
scores assets for failure risk and lead time; AI agents convert raw signals into ranked, explainable
recommendations and ready-to-action work orders. Staff see it all through one accessible dashboard —
map, alerts, queues, and a capital/grant view — and citizens get a clean channel to report problems
that actually reach the right desk. Built production-grade: **Next.js + NestJS + PostGIS + Redis**,
**WCAG 2.1 AA** accessible, with automated tests, CI, and Docker deployment.

## Traction & demo

A **live, working demo** is online today at **https://citypulse-beta.vercel.app** — not slides, the
real product. Reference-deployment ("Meridian") figures used to size impact are **illustrative**, drawn
from a model municipality and our ROI methodology:

| Reference metric (illustrative) | Value |
|---|---|
| Avoided cost per year | **$4.2M** |
| Asset failures pre-detected | **82%** |
| Average predictive lead time | **9 minutes**¹ |
| 311 requests auto-routed | **47** |
| Grant funding pipeline surfaced | **$38.6M** |

¹ Lead time is sensor/event-class dependent; CityPulse also surfaces longer-horizon, condition-based
risk on slow-degrading assets. Figures are reference/illustrative and validated per city during pilot.

## Market

- **U.S. state & local infrastructure spend (2024): ~$463B/yr** — a 20-year high, with highways/streets
  (~$141B) and water/sewer systems among the largest categories.
- **U.S. investment gap: $3.7T** through 2033 (ASCE 2025).
- **Canada: ~$270B municipal infrastructure deficit**; local governments own **>60%** of core public
  infrastructure but receive only **8–10¢ of every tax dollar**. Municipal water/wastewater alone needs
  **>$50B**; Budget 2025's Build Communities Strong Fund commits **$51B over 10 years**.
- **Enabling tech is scaling:** the digital-twin market is ~**$33B (2025)** heading to **~$49B+ by 2030**
  (higher-end forecasts far above that); the broader smart-cities market is **~$700B (2025) → ~$1.45T by
  2030** (~15.6% CAGR).

There are **~19,000 incorporated municipalities** in the U.S. and **~3,700** in Canada — every one of
them owns infrastructure it must keep alive, document, and fund. CityPulse turns that mandate into
software.

## Business model

Tiered SaaS aligned to procurement: **Pilot → City → Region → Enterprise**, priced to population and
infrastructure footprint. A paid **pilot** lands fast and de-risks the buy; annual subscriptions follow,
with expansion across departments (water, roads, stormwater, emergency) and up to county/regional scope.
The platform's grant-intelligence layer also helps cities **fund their own subscription** out of the
capital programs it surfaces.

## The ask

We are raising / seeking grant support to convert a live product and reference impact model into
**funded municipal pilots across the U.S. and Canada**. Use of funds: pilot deployments, sensor/data
integrations, security & procurement readiness (SOC 2 path), and a public-benefit pricing track for
small and disadvantaged communities.

**Let's pilot CityPulse in your city. — ctmakc@gmail.com · https://citypulse-beta.vercel.app**

---
*Market and funding figures cited from ASCE (2025), U.S. Census / Brookings, FCM & Housing,
Infrastructure and Communities Canada, and MarketsandMarkets / Grand View Research. Meridian
reference-deployment metrics are illustrative and validated per city during pilot.*
