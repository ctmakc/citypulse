# EPA — Community Air Monitoring & Water-Sector Resilience

**Grant narrative draft — CityPulse**
_Programs targeted: EPA air-monitoring grants (IRA / ARP lineage) + Drinking Water System Infrastructure Resilience & Sustainability_
_Drafted 2026-05-31 · Submission-ready draft_

---

## Eligibility & Fit (read first)

This file targets **two adjacent EPA funding lines** because CityPulse fits both, and the air-monitoring competitions run in irregular cycles — pairing them with the recurring water-resilience line gives a live target year-round.

### Track A — Community / Enhanced Air Quality Monitoring
| Item | Detail (verified May 2026) |
|------|----------------------------|
| **Lineage / status** | EPA's community air-monitoring funding has run through two main vehicles: **ARP Enhanced Air Quality Monitoring for Communities** (selected **132 projects in 37 states, $53.4M**) and **IRA air-monitoring & air-quality-sensor grants** (~**$81M** non-competitive to air agencies + ~**$2M** for sensors in low-income/disadvantaged communities). EPA has also run a **~$20M competitive community air-pollution monitoring** competition. ⚠️ These are episodic; confirm the **current open NOFO on Grants.gov / EPA Air Grants** before submitting, as exact FY2026 competition status changes. |
| **Who applies** | Community-based nonprofits, Tribes, states, and **local governments**; air-pollution control agencies for the network-operations funds. |
| **Typical award** | Community/competitive awards have historically ranged roughly **$100K–$500K+** per project; agency network funding larger. |
| **Equity core** | Explicitly targets communities with **environmental-justice and health-outcome disparities** from pollution. |

### Track B — Drinking Water System Infrastructure Resilience & Sustainability
| Item | Detail (verified May 2026) |
|------|----------------------------|
| **Status** | **ACTIVE.** Authorized by the Safe Drinking Water Act; designed to help public water systems serving **underserved, small, and disadvantaged communities** increase resilience to **natural hazards**. In **January 2026** EPA announced **$25.5M** in grants under this program (plus $35M+ to reduce lead in drinking water). |
| **Who applies** | Public water systems / owners-operators serving underserved, small, and disadvantaged communities; states. |
| **Eligible uses** | Planning, design, construction, implementation, operation, **or maintenance** of programs/projects that increase resilience to natural hazards — including **water conservation / use-efficiency** and relocating/modifying impaired infrastructure. |
| **Related** | $50B+ via IIJA to EPA for water infrastructure; DWSRF (~$11.7B) with ~half as grants/principal-forgiveness to disadvantaged communities. |

**Fit summary:** CityPulse fits EPA as the **data, monitoring-integration, and equity-prioritization layer**. For **air**, CityPulse ingests and operationalizes low-cost sensor networks into a public, equity-aware civic dashboard with a 311 reporting channel — turning raw sensor data into community decisions and alerts. For **water**, CityPulse's predictive-maintenance and hazard-resilience engine targets resilience investment toward the small/disadvantaged systems and assets most at risk from natural hazards, and tracks water-use efficiency. As with most EPA community grants, the **strongest applicant is a local government or a community-based nonprofit partner**; CityPulse is the technology that makes the monitoring and resilience program work and last.

---

## 1. Problem Statement

Two of the most acute environmental-equity gaps at the local level are **air-quality blind spots** and **fragile water systems in under-resourced communities** — and both share a root cause: data that is sparse, slow, and disconnected from community action.

- **Air:** Regulatory monitors are few and far between. Low-income and overburdened neighborhoods — often nearest highways, ports, and industry — frequently have **no nearby monitor at all**, so pollution episodes and health disparities go undetected and unaddressed. When sensors *are* deployed, the data often sits in dashboards residents never see and decision-makers don't act on.
- **Water:** Small and disadvantaged water systems face rising natural-hazard exposure (flooding, drought, extreme weather, freeze events) with the least engineering capacity to anticipate failures. They learn an asset was vulnerable only when it fails — endangering safe drinking water for the residents least able to absorb the shock.

In both cases the missing layer is the same: **continuous monitoring fused with predictive analytics, equity-aware prioritization, and a public channel that turns data into protective action.**

## 2. Project Description

**CityPulse** is an AI civic-infrastructure platform. For EPA-funded work it delivers:

**For air monitoring (Track A):**
- Integrates **low-cost air-quality sensor networks** sited in disadvantaged communities into one live, public-facing platform.
- Provides **equity-aware hotspot detection** — surfacing where pollution burden concentrates and which residents are most exposed.
- Powers **public alerts and a 311 reporting channel** so residents see local air quality, report odor/dust/smoke events, and trigger response.
- Generates the **community-accessible data products** EPA community-monitoring grants require (open data, plain-language reporting, neighborhood views).

**For water-sector resilience (Track B):**
- **Predictive maintenance & failure modeling** for drinking-water assets (mains, pumps, storage, treatment), prioritizing the highest-risk components.
- **Climate & hazard-resilience overlay** to identify assets exposed to flooding, drought, and extreme weather — the natural-hazard resilience EPA funds.
- **Water-use-efficiency / conservation analytics** (leak/loss detection, demand insight) — an explicitly eligible use.
- **Equity-aware prioritization** steering resilience investment toward small, underserved, and disadvantaged systems.

**Live demo:** https://citypulse-beta.vercel.app
**Illustrative impact (pilot-modeled):** **$4.2M/yr avoided cost** and **82% pre-detection** of failures before service interruption — directly relevant to water-system reliability and to demonstrating program effectiveness.

## 3. How CityPulse Meets EPA's Stated Goals

| EPA goal / criterion | How CityPulse responds |
|---|---|
| **Monitor air quality in communities with EJ & health-outcome disparities** | Operationalizes sensor networks in those exact neighborhoods; equity engine identifies and prioritizes overburdened areas. |
| **Make monitoring data community-accessible & actionable** | Public dashboard, plain-language neighborhood views, alerts, and a 311 reporting loop — data residents can actually use. |
| **Increase water-system resilience to natural hazards** | Predictive + hazard-overlay models target resilience investment at the most at-risk assets in small/disadvantaged systems. |
| **Water conservation / use efficiency** | Leak/loss detection and demand analytics — an explicitly eligible activity. |
| **Serve underserved, small & disadvantaged communities** | Equity-aware prioritization is built into the platform, not bolted on; produces the distributional evidence reviewers score. |
| **Sustainability / capacity of grantee** | Trains local staff and community partners to operate the monitoring + resilience program after the grant. |

## 4. Public Benefit

- **Healthier air for the most exposed residents** through visibility, alerts, and faster response to pollution episodes.
- **Safer, more reliable drinking water** for small and disadvantaged systems via pre-failure detection.
- **Community empowerment**: residents gain transparent data and a direct reporting channel into local environmental decisions.
- **Public savings**: avoided emergency repairs and water loss; better-targeted capital.

## 5. Climate & Equity Framing

Climate change intensifies both hazards CityPulse addresses: heat and wildfire smoke worsen air-quality episodes, while flooding, drought, and extreme weather threaten water systems. CityPulse is fundamentally an **environmental-justice instrument** — its equity engine directs federal monitoring and resilience dollars toward overburdened and underserved communities, and its public data + 311 layer gives those communities a voice in environmental decisions. This aligns with EPA's environmental-justice mission and Justice40-style commitments to benefit disadvantaged communities.

## 6. Work Plan (24-month period of performance)

| Phase | Months | Activities | Deliverables |
|---|---|---|---|
| **1. Community + data scoping** | 1–4 | Partner with community orgs; map EJ priority areas; identify sensor sites / water assets; stand up secure tenant. | Engagement plan; priority-area map; data inventory. |
| **2. Deploy & integrate** | 3–9 | Integrate air sensors / water-asset data; build models; configure public dashboard + 311. | Live monitoring platform; public dashboard. |
| **3. Activate community channel** | 7–14 | Launch alerts + reporting in priority neighborhoods; plain-language reporting; training. | Public alerts live; resident training sessions. |
| **4. Analyze & target investment** | 12–20 | Hotspot / failure analysis; prioritized resilience or mitigation actions; equity reporting. | Prioritized action list; equity-distribution report. |
| **5. Evaluate & sustain** | 18–24 | Measure coverage, detection, equity reach; transition to local operations. | Outcome report; sustainment plan. |

## 7. Budget Outline (illustrative — sized to a community/competitive award)

| Category | Share | Notes |
|---|---|---|
| CityPulse platform deployment & hosting (multi-year) | ~30% | Core monitoring + analytics. |
| Sensors / data integration & calibration | ~22% | Air sensors or water-asset onboarding. |
| Community engagement & EJ outreach | ~18% | Partner orgs, priority-neighborhood rollout. |
| Local staff time, training & capacity | ~15% | Enduring grantee capability. |
| Data products, public dashboard & QA | ~10% | Open data, plain-language reporting, QA/QC. |
| Evaluation, reporting & project management | ~5% | M&E, EPA reporting. |

_Scale to the specific NOFO ceiling; community/competitive air awards have historically been in the ~$100K–$500K range, water-resilience awards larger. Match (if required) via local in-kind staff and existing systems._

## 8. Expected Outcomes & Metrics

| Metric | Target |
|---|---|
| Priority (EJ / disadvantaged) areas with new continuous monitoring | 100% of identified gaps in scope |
| Residents with public access to local air-quality / system data | Full coverage of served community |
| Pollution episodes / asset failures detected before harm | **≥ 80%** (pilot-modeled 82%) |
| Avoided annual cost (water reliability + efficiency) | **$4M+ / yr** (pilot-modeled $4.2M) |
| Community reports received + actioned via 311 | Tracked + reported |
| Share of benefit reaching disadvantaged communities | Tracked + reported (Justice40-aligned) |

## 9. Sustainability

CityPulse persists as a multi-year subscription with a defined municipal business model; EPA funds the **setup, integration, community activation, and capacity building**, while the local government / utility / community partner sustains operation from operating budgets — justified by documented avoided costs (water) and by the public-health value of continuous monitoring (air). Community partners and staff are trained to own the program, open data products remain publicly available, and the monitoring network endures beyond the grant period.

---

### Sources
- [Air Monitoring and Air Quality Sensors Grants under the IRA | US EPA](https://www.epa.gov/grants/air-monitoring-and-air-quality-sensors-grants-under-inflation-reduction-act)
- [EPA Opens $20 Million Grant Competition for Community Air Pollution Monitoring | US EPA](https://www.epa.gov/newsreleases/epa-opens-20-million-grant-competition-community-air-pollution-monitoring)
- [ARP Enhanced Air Quality Monitoring for Communities — Competitive Grant | US EPA](https://www.epa.gov/arp/arp-enhanced-air-quality-monitoring-communities-competitive-grant)
- [Drinking Water System Infrastructure Resilience and Sustainability | US EPA](https://www.epa.gov/dwcapacity/drinking-water-system-infrastructure-resilience-and-sustainability)
- [Funding Water Sector Resilience | US EPA](https://www.epa.gov/waterutilityresponse/funding-water-sector-resilience)
- [Air Grants and Funding | US EPA](https://www.epa.gov/grants/air-grants-and-funding)
