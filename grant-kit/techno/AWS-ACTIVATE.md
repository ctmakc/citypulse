# AWS Activate — CityPulse application (submission-ready draft)

> **Status:** DRAFT — do not submit until Maksym reviews and applies under his own identity/account.
> **Program:** AWS Activate (Founders Package → upgrade to Portfolio / Generative AI tier when affiliated)
> **Apply at:** https://aws.amazon.com/startups/credits/ · https://aws.amazon.com/startups/lp/aws-activate-credits
> **Est. value:** $1,000 (Founders, self-serve, no funding/referral needed) → up to **$100,000** (Portfolio, via an AWS Activate Provider) → up to **$300,000** (generative-AI startup tier).
> **Decision time:** ~7–10 business days.

---

## Program facts (verified May 2026)

| Item | Detail |
|------|--------|
| **Founders Package** | Up to **$1,000** AWS credits + **$350** Developer Support credits. For unfunded / self-funded (bootstrapped) startups. **No referral or accelerator required.** |
| **Portfolio Package** | Up to **$100,000** in credits. Requires affiliation with an AWS Activate Provider (accelerator, VC, or angel) and their Organization ID. |
| **Generative-AI tier** | Eligible AI startups can qualify for up to **$300,000** in credits. |
| **Eligibility** | Pre-Series B; company website/profile; founded in the last 10 years; an AWS account on a paid tier plan linked to an AWS Builder ID. |
| **Credit validity** | Typically 2 years from issue. |

**Path for CityPulse:** Apply now for the **Founders Package** (we qualify today — bootstrapped, pre-revenue, live product). Then pursue the **Portfolio / Generative-AI tier** the moment we join an accelerator or take an angel/VC check, which is on our near-term roadmap (civic-tech and gov-tech accelerators are an explicit GTM target).

---

## Application content (ready to paste)

### Company name
CityPulse

### Website / live product
https://citypulse-beta.vercel.app

### One-line description
AI civic-infrastructure platform that gives municipalities a live operating picture of their physical assets and an AI agent layer that detects, triages, and routes infrastructure problems before they become failures.

### Company description
CityPulse is an early-stage SaaS company building the operating system for municipal infrastructure. Local governments run roads, water, stormwater, traffic, air-quality, and wildfire/flood-risk systems on disconnected spreadsheets, legacy GIS, and siloed 311 inboxes. CityPulse unifies these into one map-based command center and adds AI agents that continuously reason over asset condition, sensor signals, and resident reports to surface what is failing, what it will cost, and what to do next. Our thesis: cities don't need more dashboards — they need an always-on analyst that turns infrastructure data into prioritized, fundable action.

### Problem we solve
Aging infrastructure plus thin municipal staffing means problems are found late — after a water main breaks, a culvert floods, or an unmaintained asset becomes a safety incident. Cities lack (1) a single live view across asset classes, (2) automated triage of incoming signals (sensors + 311), and (3) defensible cost/impact evidence to prioritize capital and win grants. The result is reactive spending, avoidable failures, and audit/compliance gaps.

### Product
- **Frontend:** Next.js 16 (App Router), custom design system, 25 routes — 5 public pages + 18 portal screens. Map-based command center per domain (water, traffic, air, wildfire, flood, emergency), asset registry with filters and detail drawers, 311 intake, work-order workflow, capital-planning views, and an embedded AI dock.
- **Backend:** NestJS, 12 modules, JWT + role-based access control, Prisma over **PostgreSQL/PostGIS** for geospatial asset data, **Redis** for caching and queueing.
- **AI layer:** LLM/agent layer (Gemini today, model-portable) for asset-condition reasoning, incident triage/routing, and natural-language Q&A over a city's own data.
- **Production posture:** Dockerized, CI in GitHub Actions, end-to-end (Playwright) tests, SEO/GEO + GA4 instrumentation, security/compliance and accessibility pages. Live demo deployed and reachable today.

### Stage & traction (honest)
- **Stage:** Pre-revenue, early-stage. Working, production-grade product with a **public live demo**; not yet generating revenue.
- **Go-to-market:** Pricing tiers defined (Pilot / City / Region / Enterprise), an ROI calculator, lead-capture pipeline, and a grant/fundraising kit are in place. Actively pursuing **paid municipal pilots** and public-benefit grants (FEMA BRIC, EPA, USDOT SMART, FCM Green Municipal Fund).
- **Reference scenario:** Our flagship demo models a mid-size city ("Meridian"): ~$4.2M in avoided costs, 82% issue-detection rate, 9-minute lead time to flag emerging failures, and 47 incidents auto-routed — the outcome profile the platform is built to deliver in a live pilot.

### Specific use of the AWS credits
1. **Production hosting of pilot tenants** — ECS/Fargate or EKS for the NestJS API and workers; isolated, multi-tenant deployments per municipality.
2. **Managed PostgreSQL + PostGIS** on **Amazon RDS / Aurora PostgreSQL** for geospatial asset and incident data; **ElastiCache (Redis)** for queues and caching.
3. **AI inference** — **Amazon Bedrock** (Claude / Titan / others) for the agent layer, plus headroom for fine-tuning/eval; this is where the generative-AI credit tier directly funds our roadmap.
4. **Storage & data pipeline** — S3 for documents, inspection media, and model artifacts; foundations for sensor/telemetry ingestion.
5. **Security & compliance** for public-sector buyers — VPC isolation, KMS, CloudTrail audit logging, WAF — the controls municipal procurement requires.

Credits let us run real pilots with cities **without infra cost being the blocker**, which is exactly the gap between our live demo and a funded deployment.

### Why AWS Activate
CityPulse needs (a) compliant, isolated multi-tenant cloud for government data, (b) managed PostGIS for our geospatial core, and (c) scalable AI inference via Bedrock. AWS covers all three under one roof, and Bedrock keeps us model-portable (we already abstract the LLM layer). The generative-AI credit tier maps precisely to our largest variable cost — AI inference per pilot — making AWS the most direct accelerant for civic deployments.

### Requested tier
- **Now:** Founders Package (up to $1,000 + $350 Developer Support) — we qualify today as a bootstrapped pre-revenue startup.
- **Target:** Portfolio Package (up to $100,000) and the **generative-AI tier (up to $300,000)** upon accelerator/investor affiliation.

### Founder / contact
Maksym Stepanenko — _(insert email + LinkedIn at submission)_

---

## Sources
- [Apply for Activate Credits — AWS](https://aws.amazon.com/startups/credits/)
- [Apply for AWS Activate Credits today — AWS Startups](https://aws.amazon.com/startups/lp/aws-activate-credits)
- [AWS Credits Eligibility & How to Apply (2026) — SquareOps](https://squareops.com/knowledge/who-is-eligible-for-aws-startup-credits-and-how-to-apply-2026-guide/)
- [How to Get AWS Startup Credits in 2026 — Stormit](https://www.stormit.cloud/blog/aws-startup-credits/)
