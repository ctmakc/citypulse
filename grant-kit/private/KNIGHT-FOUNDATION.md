# CityPulse — Knight Foundation Grant Narrative

**Funder:** John S. and James L. Knight Foundation
**Program fit:** Communities / Community Impact · Knight Cities Challenge · Smart Cities ("Responsive
Cities") · Emerging City Champions (8 80 Cities + Knight)
**Positioning:** Civic technology that helps a city's government be *responsive to residents* —
informed, engaged communities built on infrastructure people can see, report on, and trust.
**Ask range:** **$150K–$200K** (project grant / Knight Cities Challenge scale, up to $200K) — or a
**$5K–$25K Emerging City Champions**-style civic-leadership micro-grant for a single-city pilot.
**Live demo:** https://citypulse-beta.vercel.app · **Contact:** ctmakc@gmail.com

> Status: **Draft ready.** Knight does not run a standing open-application portal for Communities;
> entry points are (1) the **Knight Cities Challenge** (cohort cycles — most recent application window
> April 1–30, 2026, $10M over three years across 26 Knight communities, grants up to $200K) and (2)
> proactive program-officer relationships in a Knight resident city. Verify the live cycle and whether
> CityPulse's target pilot city is a Knight city before submitting.

---

## 1. Why Knight (alignment to published priorities)

Knight invests in **journalism, the arts, and the success of cities** where the Knight brothers once
published, in service of one mission: **informed and engaged communities are essential to a healthy
democracy.** Knight's cities work frames "smart cities" explicitly as **Responsive Cities** — *"helping
cities make decisions that are more responsive to residents as digital technology reshapes our lives
and shifts the ways in which communities are informed and engaged."*

CityPulse is, at its core, a **responsiveness engine for local government.** It does three things Knight
cares about:

1. **Turns city infrastructure into shared, legible information.** A resident reports a flooded culvert
   or a dark streetlight; CityPulse auto-classifies it, geolocates it, routes it to the right crew, and
   gives the resident a tracking code. The city, in turn, sees a live operating picture of every asset
   it owns. The gap between "what residents experience" and "what city hall knows" closes.
2. **Makes municipal decision-making faster and more accountable to residents.** Predictive
   asset-failure intelligence means the city fixes the culvert *before* it floods the street, and can
   show residents *why* a given block was prioritized. Decisions become explainable, not opaque.
3. **Strengthens the local information ecosystem about public infrastructure.** Open, structured civic
   data (asset condition, 311 outcomes, environmental readings) is exactly the substrate local
   newsrooms, community groups, and residents need to understand and hold their city accountable.

The 2025–2026 Knight Cities Challenge funds work that **strengthens local information ecosystems,
expands economic opportunity, and deepens community connection.** CityPulse's primary fit is the
**information-ecosystem** line: reliable, navigable civic information about the infrastructure residents
depend on, surfaced through a channel any resident can use.

## 2. The civic problem (public-interest framing)

The infrastructure that keeps communities safe — water, stormwater, roads, bridges, the systems behind
emergency response — is **aging faster than cities can fund or even *see* its decline.** Most cities
run it on **spreadsheets, paper logs, and reactive maintenance.** They learn a pump has failed when
sewage backs up into a basement, that a culvert is gone when a street floods.

This is not only an engineering failure; it is a **democratic and equity failure.**

- **Residents are left in the dark.** When you report a problem, you rarely learn whether anyone heard
  you or what happened next. Trust in local government erodes one unanswered 311 call at a time.
- **The burden falls hardest on under-resourced neighborhoods.** Wealthier areas get attention because
  they know whom to call; lower-income and historically disinvested communities absorb the failures.
  Without data, a city cannot even *see* that pattern, let alone correct it.
- **Small and mid-size cities are excluded from the tools that exist.** Enterprise "smart city" systems
  are built for, and priced for, the largest metros. The ~19,000 U.S. municipalities that most need
  help can least afford it.

An informed, engaged community needs to *see* its infrastructure, *report* on it, and *trust* that the
report goes somewhere. Today, in most cities, it cannot.

## 3. What CityPulse is

**CityPulse is civic infrastructure for civic infrastructure** — an AI-native operating picture that
gives a city a live, predictive view of every asset it owns, and gives residents a real channel into
it:

- **Digital twin** of the city's assets and networks on an interactive map.
- **Predictive asset-failure intelligence** — flags failures *before* they happen, with lead time and
  an explainable "why at risk."
- **311 / citizen-request intake** — auto-classifies, geolocates, and routes resident reports to the
  right crew, with a public tracking code so residents see what happened.
- **AI agents** that triage signals, summarize conditions, and surface the next best action for staff.
- **Emergency / incident mode** for coordinated multi-agency response when conditions turn critical.
- **Capital & grant intelligence** that maps a city's asset risk to the funding programs that pay for
  it — so a small city can actually compete for the dollars that exist.

It is real and online today: a **live, working demo** at https://citypulse-beta.vercel.app — not
slides. Built production-grade (Next.js + NestJS + PostGIS + Redis), **WCAG 2.1 AA** accessible, with
automated tests, CI, and Docker deployment so any city can run it.

## 4. What Knight funding would do

Knight support funds a **public-interest, resident-facing layer** that a commercial pilot alone would
under-prioritize:

1. **Open civic-data + public transparency layer.** A resident-facing 311/infrastructure portal and an
   open-data feed (asset condition, 311 outcomes, environmental readings) so residents, community
   organizations, and local newsrooms can see and use the same information the city does. *This is the
   Knight-distinct deliverable.*
2. **One Knight-city pilot, run as a civic engagement project** — not just a software deployment.
   Resident co-design sessions, accessibility testing with real residents, and a public dashboard the
   community helped shape.
3. **Equity instrumentation.** Reporting that surfaces *which neighborhoods* get faster response and
   *where* infrastructure risk concentrates — turning CityPulse into a tool for equitable service, not
   just efficient service.
4. **A public-benefit pricing track** so the smallest and most disinvested communities can adopt the
   resident-facing tools at near-zero cost, sustained by the commercial tiers serving larger cities.

## 5. Reference impact & measurement

A live demo is necessary but not sufficient; here is the impact model we would validate *with the
Knight city, with residents in the room.* Reference-deployment ("Meridian") figures below are
**illustrative**, drawn from a model municipality and our ROI methodology — they size the opportunity
and will be re-measured per city during the grant:

| Reference metric (illustrative) | Value | Knight relevance |
|---|---|---|
| 311 / resident requests auto-routed | **47** (reference run) | Residents reach the right desk, faster |
| Asset failures pre-detected | **82%** | Fewer failures residents experience as crises |
| Average predictive lead time | **9 minutes**¹ | Decisions made *before*, not after, the harm |
| Avoided cost per year | **$4.2M** | Public dollars freed for resident services |
| Grant funding pipeline surfaced | **$38.6M** | Small cities compete for the funding that exists |

¹ Lead time is sensor/event-class dependent; CityPulse also surfaces longer-horizon, condition-based
risk on slow-degrading assets.

**Knight-aligned outcome metrics for the grant period:** number of residents who submit and *resolve* a
report through the portal; median resident-report response time, tracked by neighborhood (equity lens);
volume and reuse of the open civic-data feed; resident-reported trust/satisfaction before vs. after.

## 6. Why us, why now

Knight funds **teams and missions, not just software.** CityPulse is built by an operator who ships:
the platform exists, runs, and is accessible today. The civic thesis is explicit — **public
infrastructure should be legible to the public that depends on it.** The timing is set by Knight's own
framing of the Responsive City and by a national infrastructure moment (a $3.7T U.S. investment gap,
federal and provincial dollars flowing) in which the cities that can *see and explain* their
infrastructure will be the ones that earn resident trust and win the funding to fix it.

**Let's make one Knight city's infrastructure legible to the people who live there.**
**ctmakc@gmail.com · https://citypulse-beta.vercel.app**

---
*Program facts current as of May 2026: Knight Cities Challenge ($10M over three years, up to $200K per
grant, 26 Knight communities; most recent window April 1–30, 2026); Knight's "Responsive Cities" smart-
cities framing; Emerging City Champions fellowship (8 80 Cities + Knight). Verify the live cycle and
Knight-city eligibility before submission. Meridian reference metrics are illustrative and validated
per city during the grant. Sources: knightfoundation.org, emergingcitychampions.org.*
