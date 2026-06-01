# Microsoft for Startups Founders Hub — CityPulse application (submission-ready draft)

> **Status:** DRAFT — do not submit until Maksym reviews and applies under his own identity/account.
> **Program:** Microsoft for Startups Founders Hub (Azure + Azure OpenAI credits)
> **Apply at:** https://startups.microsoft.com (click **Get started**)
> **Est. value:** **$1,000** Azure (Basic) → up to **$5,000** (Enhanced, after business verification) → **$100,000+** (investor-affiliated). Includes access to **Azure OpenAI** via Azure credits; ~**$2,500 OpenAI** credits referenced for Founders Hub. Up to **$150,000** Azure overall across the program.
> **Why easy:** No VC backing, accelerator, or revenue required for the self-serve tiers. Globally open to bootstrapped/solo/pre-revenue founders.

---

## Program facts (verified May 2026)

| Item | Detail |
|------|--------|
| **Basic tier** | **$1,000** Azure credits. Email verification only. |
| **Enhanced tier** | Up to **$5,000** Azure credits after business verification. |
| **Investor-affiliated tier** | **$100,000+** initial Azure credits via a participating VC/accelerator. |
| **Overall ceiling** | Up to **$150,000** Azure across the program. |
| **AI** | Azure OpenAI Service usable with Azure sponsorship credits; ~$2,500 OpenAI credits referenced under Founders Hub. (Standalone OpenAI benefit has been wound down in favor of Azure OpenAI.) |
| **Eligibility** | Bootstrapped, solo, and pre-revenue startups welcome; must be building a software product/service. No VC/accelerator/revenue required for Basic/Enhanced. |
| **Credit validity** | Founders Hub credits ~1 year from activation. |

**Path for CityPulse:** Apply now → **Basic ($1,000)** instantly, then complete **business verification → Enhanced ($5,000)**. Pursue the **investor-affiliated tier ($100,000+)** once we take an angel/VC check.

---

## Application content (ready to paste)

### Company name
CityPulse

### Website / live product
https://citypulse-beta.vercel.app

### One-line description
AI civic-infrastructure SaaS: a live, map-based command center plus AI agents that detect, triage, and route municipal infrastructure problems before they fail.

### Company description
CityPulse is an early-stage SaaS company building the operating system for municipal infrastructure. Cities run roads, water, stormwater, traffic, air-quality, and wildfire/flood systems on disconnected spreadsheets, legacy GIS, and siloed 311 inboxes. CityPulse unifies these into one geospatial command center and adds AI agents that reason over asset condition, sensor data, and resident reports to surface what's failing, what it will cost, and what to do next — turning infrastructure data into prioritized, fundable action.

### Problem
Aging infrastructure plus thin staffing means failures are caught late and money is spent reactively. Cities lack one live operating picture, automated triage of incoming signals, and defensible cost/impact evidence to prioritize capital and satisfy audits and grant requirements.

### Product & stack
- **Frontend:** Next.js 16, 25 routes (5 public + 18 portal), map-based command center per domain, asset registry with filters/detail drawers, 311 intake, work-order workflow, capital planning, embedded AI dock. Live demo deployed today.
- **Backend:** NestJS, 12 modules, JWT + RBAC, Prisma over **PostgreSQL/PostGIS**, **Redis** for queues/cache.
- **AI:** LLM/agent layer (model-portable; Gemini today) for asset reasoning, incident triage/routing, and natural-language Q&A over a city's data. Designed to run equally well on **Azure OpenAI**.
- **Engineering:** Dockerized, GitHub Actions CI, Playwright e2e, SEO/GEO + GA4, security/compliance + accessibility pages.

### Stage & traction (honest)
- **Stage:** Pre-revenue, early-stage. Production-grade product with a **public live demo**; not yet generating revenue.
- **GTM:** Pricing (Pilot / City / Region / Enterprise), ROI calculator, lead pipeline, and grant kit live. Pursuing **paid municipal pilots** and public-benefit grants.
- **Reference scenario:** Flagship demo models a mid-size city ("Meridian"): ~$4.2M avoided costs, 82% detection rate, 9-minute lead time, 47 incidents auto-routed — the outcome profile the platform is built to deliver in a live pilot.

### Specific use of the credits
1. **Azure OpenAI Service** — production inference for the agent layer (asset-condition reasoning, triage/routing, NL Q&A). This is our largest variable cost; Azure OpenAI credits map straight to it and give us a second, redundant model provider.
2. **Azure Container Apps / AKS** — host the NestJS API and workers as isolated multi-tenant deployments per municipality.
3. **Azure Database for PostgreSQL (with PostGIS)** for geospatial asset/incident data; **Azure Cache for Redis** for queues/cache.
4. **Azure Blob Storage** — documents, inspection media, model artifacts; foundation for sensor/telemetry ingestion.
5. **Compliance for public-sector buyers** — Azure's government/compliance posture (audit logging, identity, network isolation) supports municipal procurement requirements.

Credits let us run real municipal pilots with infra + AI inference covered, and give CityPulse genuine multi-cloud resilience (Azure OpenAI alongside our current provider) — a real asset when selling to risk-averse governments.

### Why Microsoft for Startups
Municipal and public-sector buyers frequently standardize on Microsoft/Azure; being Azure-native (and Azure OpenAI-capable) shortens procurement and security review. Azure covers our full stack — Azure OpenAI for the agent layer, managed PostgreSQL/PostGIS for geospatial data, containers for multi-tenant hosting — and the self-serve credit tiers let us start immediately with zero affiliation.

### Requested tier
- **Now:** Basic ($1,000) → **Enhanced ($5,000)** after business verification — we qualify today as a bootstrapped pre-revenue software startup.
- **Target:** Investor-affiliated tier ($100,000+) upon angel/VC affiliation.

### Founder / contact
Maksym Stepanenko — _(insert email + LinkedIn at submission)_

---

## Sources
- [What is Microsoft for Startups? — Microsoft Learn](https://learn.microsoft.com/en-us/azure/signups/overview)
- [Azure for Startups — Microsoft Learn](https://learn.microsoft.com/en-us/startups/benefits/azure-for-startups)
- [Microsoft for Startups Founders Hub 2026 — Get AI Perks](https://www.getaiperks.com/en/ai/microsoft-for-startups-founders-hub)
- [Is OpenAI credits available as part of startup benefits? — Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/2275712/is-openai-credits-available-as-part-of-startup-ben)
