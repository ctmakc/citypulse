# Google for Startups Cloud Program — CityPulse application (submission-ready draft)

> **Status:** DRAFT — do not submit until Maksym reviews and applies under his own identity/account.
> **Program:** Google for Startups Cloud Program (Start tier → AI track / Scale tier)
> **Apply at:** https://cloud.google.com/startup · https://startup.google.com/cloud/ · AI track: https://cloud.google.com/startup/ai
> **Est. value:** **Start tier** self-serve credits (no affiliation needed) → up to **$200,000** (standard, accelerator/VC-affiliated) → up to **$350,000** (AI-first track).
> **Strategic fit:** Highest — we already build on Google's stack (Gemini) and our live demo runs on Vercel; Firebase/Cloud credits drop straight into our roadmap.

---

## Program facts (verified May 2026)

| Item | Detail |
|------|--------|
| **Start tier** | Self-serve credits for early-stage startups not yet affiliated with a partner. Lower amount, no accelerator/VC required — the on-ramp we can take **today**. |
| **Standard / Scale tier** | Up to **$200,000** in Google Cloud + Firebase credits over the first 2 years. Requires association with an approved accelerator, incubator, or partner VC. |
| **AI-first track** | Up to **$350,000** in credits for AI-first startups (AI central to the product), Seed–Series A, building on Google Cloud AI/ML (Vertex AI, Gemini). |
| **Eligibility** | Under 5 years old (from incorporation); affiliation required for the higher tiers. |
| **Extras** | Google technical experts / architecture reviews, training, startup events, and partner perks. |

**Path for CityPulse:** We are **AI-first by definition** (our product is an AI agent layer over civic infrastructure data) and already use **Gemini** in production. Apply via the **Start tier** now, then move to the **AI track** the moment we affiliate with a partner accelerator/VC — which is on the roadmap. The AI track is where the largest value ($350K) and the best strategic fit sit.

---

## Application content (ready to paste)

### Company name
CityPulse

### Website / live product
https://citypulse-beta.vercel.app

### One-line description
The AI operating system for municipal infrastructure — a live, map-based command center plus AI agents that detect, triage, and route infrastructure problems before they fail.

### Company description
CityPulse is an early-stage, AI-first SaaS company. Cities manage roads, water, stormwater, traffic, air quality, and wildfire/flood risk across disconnected tools. CityPulse unifies them into one geospatial command center and layers AI agents that reason continuously over asset condition, sensor signals, and resident 311 reports — surfacing what is failing, what it will cost, and the next action. AI is not a feature bolted on; the agent layer **is** the product.

### Problem
Municipal infrastructure is aging while staffing is thin, so failures are caught late and capital is spent reactively. Cities lack a single live operating picture, automated triage of incoming signals, and defensible cost/impact evidence to prioritize spending and win grants.

### Product & stack
- **Frontend:** Next.js 16, 25 routes (5 public + 18 portal), map-based command center per infrastructure domain, asset registry, 311 intake, work-order workflow, capital planning, embedded AI dock. Live demo deployed today.
- **Backend:** NestJS, 12 modules, JWT + RBAC, Prisma over **PostgreSQL/PostGIS** for geospatial data, **Redis** for queues/cache.
- **AI:** LLM/agent layer running on **Gemini** today (model-portable), doing asset-condition reasoning, incident triage/routing, and natural-language Q&A over a city's own data. Natural fit for **Vertex AI** + Gemini at scale.
- **Engineering:** Dockerized, GitHub Actions CI, Playwright e2e, SEO/GEO + GA4, security/compliance + accessibility pages.

### Why we're AI-first
The core value — autonomous detection, triage, prioritization, and explanation of infrastructure risk — is delivered by LLM agents reasoning over each city's data. Remove the AI and the product is just another GIS dashboard. We already run on Gemini; Google Cloud AI is our natural scaling path.

### Stage & traction (honest)
- **Stage:** Pre-revenue, early-stage. Production-grade product with a **public live demo**; not yet generating revenue. Fits the Seed–Series A profile the AI track targets.
- **GTM:** Pricing (Pilot / City / Region / Enterprise), ROI calculator, lead pipeline, and a grant kit are live. Pursuing **paid municipal pilots** and public-benefit grants.
- **Reference scenario:** Flagship demo models a mid-size city ("Meridian"): ~$4.2M avoided costs, 82% detection rate, 9-minute lead time, 47 incidents auto-routed — the outcome the platform is built to deliver in a live pilot.

### Specific use of the credits
1. **Vertex AI + Gemini** — production inference for the agent layer (asset reasoning, triage, NL Q&A), plus eval/tuning headroom. This is our **single largest variable cost** and where the AI-track credits matter most.
2. **Cloud Run / GKE** — host the NestJS API and workers as isolated multi-tenant deployments per municipality.
3. **Cloud SQL for PostgreSQL + PostGIS** for geospatial asset/incident data; **Memorystore (Redis)** for queues/cache.
4. **BigQuery** — analytics over historical asset condition, incidents, and outcomes; powers the ROI/impact evidence cities and grant committees need.
5. **Firebase / Cloud Storage** — documents, inspection media, model artifacts; foundation for sensor/telemetry ingestion.

Credits let us run real municipal pilots with infra + AI inference fully covered — closing the gap between our live demo and funded deployments.

### Why Google for Startups Cloud
We are already on Gemini; Vertex AI keeps our AI roadmap on one platform with managed PostGIS, BigQuery for impact analytics, and Firebase for fast iteration. The AI-first track's credit ceiling directly offsets our biggest cost (AI inference per pilot), and Google's technical/architecture support de-risks scaling to multiple cities.

### Requested tier
- **Now:** Start tier (self-serve credits) — we qualify today.
- **Target:** **AI-first track, up to $350,000** upon partner affiliation (Seed–Series A, AI-central, building on Google Cloud AI — all true for CityPulse).

### Founder / contact
Maksym Stepanenko — _(insert email + LinkedIn at submission)_

---

## Sources
- [Startups — Google Cloud](https://cloud.google.com/startup)
- [Startups program eligibility and benefits — Google Cloud](https://cloud.google.com/startup/benefits)
- [AI startup program — Google Cloud](https://cloud.google.com/startup/ai)
- [Cloud — Google for Startups](https://startup.google.com/cloud/)
