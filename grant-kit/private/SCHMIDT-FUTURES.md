# CityPulse — Schmidt (Schmidt Sciences / Eric & Wendy Schmidt Fund) Narrative

**Funder:** Schmidt Sciences and the **Eric & Wendy Schmidt Fund for Strategic Innovation**
*(Schmidt Futures was dissolved in 2024 and its programs consolidated under Schmidt Sciences — this
narrative is written for the successor structure.)*
**Program fit:** **AI2050** thesis (a future in which AI has benefited society) · applied / trustworthy
AI for public good · high-leverage technical infrastructure for institutions
**Positioning:** **Applied AI as public-interest infrastructure** — concrete, deployed evidence that AI
can make the public institutions that keep people safe measurably better and more trustworthy.
**Ask range:** **$175K–$750K** (Schmidt grant sizes: median ~$174K, average ~$628K, individual grants
$600–$15.8M) — best pursued as an **RFP response or an institutional research–practice partnership**,
not a cold proposal.
**Live demo:** https://citypulse-beta.vercel.app · **Contact:** ctmakc@gmail.com

> Status: **Draft ready, path-dependent.** Schmidt **does not accept unsolicited proposals.** Funding
> flows through three channels only: (1) competitive **RFPs** posted on schmidtsciences.smapply.io, (2)
> **institutional nominations** for fellowship programs, or (3) **proactive invitation** from program
> staff. Schmidt's center of gravity is **scientific research** (AI2050 fellowships, Trustworthy AI,
> HAVI, unconventional compute), often requiring a university/non-profit co-PI. **Realistic route for
> CityPulse: partner with a university civic-tech / public-policy lab on a Schmidt RFP**, contributing
> the deployed platform as the applied testbed. Use this narrative for that partnership conversation
> and to be ready when an applied-AI-for-public-good RFP opens.

---

## 1. Why Schmidt (alignment to published priorities)

Schmidt's flagship AI thesis, **AI2050**, asks researchers and builders to **"imagine a future in which
AI has benefited society"** and to do the hard work to make it real; the Schmidts have committed **$125M
over five years** to it. Schmidt Sciences also funds **Trustworthy AI** research (a $10M program, 27
projects) and other high-leverage, "unconventional" science and technology. The Eric & Wendy Schmidt
Fund for Strategic Innovation is described as **talent-first and impact-obsessed**, backing exceptional
people and **high-leverage infrastructure** over conventional project grants.

CityPulse is a **proof of the AI2050 thesis in one of the highest-stakes, least-glamorous, most
consequential domains: the public infrastructure that keeps communities safe.** It is not AI for
engagement or AI for ads — it is AI applied to **water systems, stormwater, roads, and emergency
response**, where being right *before* something breaks saves money, services, and lives. And because
the domain is public and safety-critical, **trustworthy, explainable AI is not optional** — which puts
CityPulse squarely at the intersection of Schmidt's AI2050 *and* Trustworthy AI lines.

## 2. The research-and-impact problem

There is a credibility gap between **"AI will transform government"** (asserted constantly) and
**deployed, measured evidence that it does** (rare). Civic AI suffers from three hard, *researchable*
problems that Schmidt is unusually positioned to fund:

1. **Trust and explainability under public accountability.** When an AI system tells a city *which*
   culvert to fix first, the recommendation must be **explainable, auditable, and contestable** — a
   resident, a council member, or a journalist may demand to know *why*. This is exactly the trustworthy-
   AI frontier, instantiated in a real institution with real stakes.
2. **AI that improves a public good measurably.** Most AI deployment lacks a clean counterfactual.
   Municipal infrastructure offers rare, *measurable* outcomes — failures averted, lead time gained,
   dollars saved, response equity across neighborhoods — making it an ideal testbed for **rigorous study
   of AI's public benefit.**
3. **Generalizable civic infrastructure, not a one-off.** ~19,000 U.S. municipalities share the same
   problem on different data. A platform that generalizes across them is a **high-leverage piece of
   public-interest infrastructure** — the kind Schmidt prefers to back.

## 3. What CityPulse is

**CityPulse is an AI-native operating system for municipal infrastructure** — a live, predictive,
explainable view of every asset a city owns:

- **Digital twin** of city assets and networks (PostGIS spatial model).
- **Predictive asset-failure intelligence** — failures flagged *before* they happen, with lead time
  and an explainable "why at risk."
- **AI agents** that read live context and produce **ranked, explainable recommendations with
  confidence and recommended actions** — designed for human-in-the-loop accountability.
- **311 / citizen-request intake** with closed-loop routing.
- **Emergency / incident mode** for coordinated response.
- **Capital & grant intelligence** mapping asset risk to funding.

Real and online today: a **live, working demo** at https://citypulse-beta.vercel.app — deployed
evidence, not a research slide deck. Built production-grade (Next.js + NestJS + PostGIS + Redis), WCAG
2.1 AA accessible, with tests, CI, and Docker deployment.

## 4. What Schmidt funding (via partnership) would enable

Framed as an **applied-AI-for-public-good research–practice project** with a university partner:

1. **An open, peer-reviewable methodology** for predictive municipal infrastructure risk — models,
   features, and validation published, not locked in a vendor.
2. **A trustworthy-AI evaluation harness for civic recommendations** — measuring explainability,
   calibration, contestability, and fairness of CityPulse's agent outputs against public-accountability
   standards. *This is the Schmidt-distinct research contribution.*
3. **A multi-city evidence base** — deploy across a small cohort of cities and rigorously measure AI's
   public benefit (failures averted, lead time, cost avoided, response equity), with a real
   counterfactual.
4. **An equity-and-explainability layer** released as public-interest infrastructure other
   municipalities and researchers can build on.

## 5. Reference impact & measurement

Reference-deployment ("Meridian") figures are **illustrative**, from a model municipality and our ROI
methodology — they size the opportunity and would be replaced by rigorously measured, multi-city
results under a Schmidt-funded study:

| Reference metric (illustrative) | Value | Schmidt / AI2050 relevance |
|---|---|---|
| Asset failures pre-detected | **82%** | Measurable AI public benefit |
| Average predictive lead time | **9 minutes**¹ | AI acting before harm — quantifiable counterfactual |
| Avoided cost per year | **$4.2M** | Clean economic outcome for rigorous study |
| 311 / resident requests auto-routed | **47** (reference run) | Human-AI loop in a public institution |
| Grant funding pipeline surfaced | **$38.6M** | AI improving public capital allocation |

¹ Sensor/event-class dependent; CityPulse also surfaces longer-horizon, condition-based risk.

**Research outcomes for a funded study:** published trustworthy-AI evaluation results for civic
recommendations (explainability, calibration, fairness); a multi-city measured estimate of AI's effect
on infrastructure outcomes vs. counterfactual; open methodology + evaluation harness as reusable
public-interest infrastructure.

## 6. Why us, why now

Schmidt backs **exceptional builders doing high-leverage work**, and prizes **deployed reality over
promises.** CityPulse is already real, running, and accessible — a rare case of applied civic AI that
exists today and produces *measurable* outcomes in a safety-critical public domain. Paired with the
right academic partner, it is a turnkey testbed for the AI2050 question — *what does it look like when
AI genuinely benefits society?* — answered not in theory but in the infrastructure that keeps
communities safe.

**Let's turn deployed civic AI into the public-benefit, trustworthy-AI evidence base AI2050 is asking
for.** **ctmakc@gmail.com · https://citypulse-beta.vercel.app**

---
*Program facts current as of May 2026: Schmidt Futures dissolved (2024) → **Schmidt Sciences** +
**Eric & Wendy Schmidt Fund for Strategic Innovation** (~$1.59B assets, ~$228.7M FY2024 giving; grant
median ~$174K, average ~$628K, range $600–$15.8M). **No unsolicited proposals** — RFPs on
schmidtsciences.smapply.io, institutional nominations, or invitation only. AI2050 ($125M/5yr);
Trustworthy AI ($10M, 27 projects); HAVI; unconventional compute. Realistic route = university
research–practice partnership on an applied-AI RFP. Meridian reference metrics are illustrative. Sources:
schmidtsciences.org, en.wikipedia.org/wiki/Schmidt_Futures, fconline.foundationcenter.org.*
