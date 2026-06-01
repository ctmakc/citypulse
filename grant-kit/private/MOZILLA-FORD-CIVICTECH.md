# CityPulse — Mozilla / Ford Public-Interest-Technology Narrative

**Funders:** **Mozilla Foundation** (Incubator / Fellows) and the **Ford Foundation** (Public-Interest
Technology; Critical Digital Infrastructure) — plus the adjacent **Humanity AI** coalition (Ford,
Mozilla + 8 foundations, $500M/5yr, grants flowing in 2026).
**Program fit:** Mozilla **Democracy x AI Cohort** (government data infrastructure; institutional
transparency & accountability) · Mozilla **Fellows** · Ford/Mozilla/Sloan/OSF/Omidyar **Critical
Digital Infrastructure** · Public-Interest Technology (PIT) field-building.
**Positioning:** **Open, public-interest civic infrastructure** — an accountable, AI-native commons for
the public systems communities depend on, built and stewarded in the open.
**Ask range:** **$50K** (Mozilla Democracy x AI Cohort) with a path to **+$250K Sustain Track**
(up to **$300K** total); or **$50K–$300K** PIT / critical-digital-infrastructure project support.
**Live demo:** https://citypulse-beta.vercel.app · **Contact:** ctmakc@gmail.com

> Status: **Draft ready.** Strongest near-term fit is the **Mozilla Foundation Incubator — Democracy x
> AI Cohort** ($1M total; 10 projects at $50K; two advance to a $250K Sustain Track; most recent
> deadline March 16, 2026), whose published categories include **institutional transparency &
> accountability — "government data infrastructure, public records tools."** To fit Mozilla/Ford fully,
> CityPulse commits to an **open-source public-interest core** (see §4). Verify the live cohort window;
> Mozilla Fellows nominations and Ford PIT grants are relationship/RFP-driven.

---

## 1. Why Mozilla & Ford (alignment to published priorities)

**Mozilla** funds **technologists building in the public interest** — most directly, in 2026, the
**Democracy x AI Cohort**, a **$1M** investment in AI tools that strengthen democratic institutions
across three categories: (1) **information-ecosystem resilience**, (2) **institutional transparency &
accountability** — explicitly *"government data infrastructure, public records tools"* — and (3)
**civic-space protection.** It funds **10 projects at $50K**, with two advancing to a **$250K Sustain
Track** (max $300K).

**Ford** anchors the **public-interest technology (PIT)** field and, with Mozilla, Sloan, the Open
Society Foundations, and Omidyar, funds **critical digital infrastructure** — the under-maintained code
and systems society quietly depends on. Ford and Mozilla are also among the ten foundations behind
**Humanity AI** ($500M over five years) to "ensure people have a stake in AI's trajectory."

CityPulse is a **public-interest technology project in the most literal sense**: technology built in the
public interest, for public institutions, owned in part by the public it serves. It is **government
data infrastructure** (Mozilla's category 2, verbatim) for the physical systems — water, stormwater,
roads, emergency response — that communities depend on, made **transparent and accountable to
residents.**

## 2. The public-interest problem

The infrastructure that keeps communities safe is **opaque, privately tooled, and inaccessible to the
public.** Where it is digitized at all, it runs on **closed, enterprise "smart city" systems** sold to
the largest metros — proprietary black boxes that residents cannot see into and small cities cannot
afford. This is a public-interest-technology failure on three fronts Mozilla and Ford care about:

1. **No transparency or accountability.** Residents cannot see the condition of the infrastructure they
   fund, which neighborhoods get prioritized, or what happened to the problem they reported. Decisions
   about public safety are made in systems the public cannot inspect.
2. **Critical infrastructure with no public stewardship.** The software cities increasingly rely on to
   run physical infrastructure is itself **critical digital infrastructure** — and it is almost
   entirely proprietary, vendor-locked, and unmaintainable by the public sector.
3. **AI deployed *on* the public without the public having a stake.** As cities adopt AI to triage and
   prioritize, the models, data, and logic are hidden — exactly the "people have no stake in AI's
   trajectory" problem Humanity AI exists to counter.

## 3. What CityPulse is

**CityPulse is an AI-native operating picture for municipal infrastructure** — and, in its
public-interest form, a **transparent, open commons** rather than a black box:

- **Digital twin** of city assets and networks (PostGIS spatial model).
- **Predictive asset-failure intelligence** — failures flagged *before* they happen, with explainable,
  inspectable "why at risk."
- **311 / citizen-request intake** — auto-classifies, geolocates, routes, and **closes the loop** with
  residents via a public tracking code.
- **AI agents** producing **explainable, auditable** recommendations — designed for human-in-the-loop
  accountability, not opaque automation.
- **Emergency / incident mode** for coordinated response.
- **Capital & grant intelligence** mapping asset risk to funding programs.

Real and online today: a **live, working demo** at https://citypulse-beta.vercel.app. Built
production-grade (Next.js + NestJS + PostGIS + Redis), **WCAG 2.1 AA** accessible, with tests, CI, and
Docker deployment — designed from the start to be self-hostable by a city.

## 4. The public-interest commitment (what makes this a Mozilla/Ford project)

This is the core of the Mozilla/Ford fit. Grant support funds an **open public-interest core** that a
purely commercial path would not prioritize:

1. **Open-source civic core under an OSI-approved license.** The 311 intake, public transparency
   portal, open-data feed, and the explainability layer are released open-source so any city — and any
   resident, journalist, or researcher — can run, inspect, and extend them. *Sustained commercially by
   premium tiers for larger cities; free and open for the public-interest base.*
2. **Transparency & accountability by design.** A resident-facing portal + open civic-data feed (asset
   condition, 311 outcomes, environmental readings, neighborhood-level response times) so the public can
   *see into* the systems that serve them — Mozilla's "institutional transparency & accountability,"
   instantiated.
3. **Explainable, contestable AI.** Every agent recommendation ships with its reasoning and confidence,
   inspectable and challengeable — giving residents a genuine stake in the AI deciding their services.
4. **Open standards & data portability.** GeoJSON / open formats and documented schemas so cities are
   never locked in — directly serving the "critical digital infrastructure" thesis.
5. **A public-interest pricing track** so the smallest and most disinvested communities adopt the open
   tools at near-zero cost.

## 5. Reference impact & measurement

Reference-deployment ("Meridian") figures are **illustrative**, from a model municipality and our ROI
methodology; re-measured per city:

| Reference metric (illustrative) | Value | Mozilla / Ford relevance |
|---|---|---|
| 311 / resident requests auto-routed | **47** (reference run) | Accountable, closed-loop public input |
| Asset failures pre-detected | **82%** | Public benefit, transparently measured |
| Average predictive lead time | **9 minutes**¹ | Explainable AI acting before public harm |
| Avoided cost per year | **$4.2M** | Public dollars freed for residents |
| Grant funding pipeline surfaced | **$38.6M** | Open tooling helps under-resourced cities compete |

¹ Sensor/event-class dependent; CityPulse also surfaces longer-horizon, condition-based risk.

**PIT-aligned outcomes for the grant period:** an open-source civic core released and documented;
≥1 city running the public transparency portal + open-data feed; an open explainability spec for civic
AI recommendations; resident-reported trust before vs. after; community/newsroom reuse of the open data.

## 6. Why us, why now

Mozilla and Ford fund **technologists who build accountable, public-interest infrastructure in the
open** — and they are deploying serious capital (Democracy x AI, Critical Digital Infrastructure,
Humanity AI's $500M) precisely as AI reshapes public institutions. CityPulse is a working,
public-interest-technology platform *today*, ready to commit its civic core to the open and to give
residents a genuine stake in the AI that increasingly runs their cities. This is the moment to make the
software behind public infrastructure a transparent commons rather than another proprietary black box.

**Let's make the infrastructure cities run on open, accountable, and owned in part by the public.**
**ctmakc@gmail.com · https://citypulse-beta.vercel.app**

---
*Program facts current as of May 2026: Mozilla Democracy x AI Cohort ($1M; 10 × $50K; +$250K Sustain
Track, max $300K; categories incl. "government data infrastructure, public records tools"; recent
deadline March 16, 2026); Mozilla Fellows 2026; Ford/Mozilla/Sloan/OSF/Omidyar Critical Digital
Infrastructure ($1.3M / 13 projects round); Humanity AI coalition ($500M/5yr, grants flowing 2026).
Public-interest open-source commitment is required for full fit. Meridian reference metrics are
illustrative. Sources: mozillafoundation.org, fordfoundation.org, public-interest-tech.com.*
