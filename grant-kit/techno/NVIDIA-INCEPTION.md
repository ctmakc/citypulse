# NVIDIA Inception — CityPulse application (submission-ready draft)

> **Status:** DRAFT — do not submit until Maksym reviews and applies under his own identity/account.
> **Program:** NVIDIA Inception (free startup program; no fees, no deadlines, no cohorts)
> **Apply at:** https://www.nvidia.com/en-us/startups/
> **Est. value:** Program is **free to join**. Benefits include partner cloud credits (e.g., AWS Activate up to $100K, Nebius up to $150K), free DLI training credits, SDK access, **preferred/discounted NVIDIA hardware & software pricing**, DGX Cloud Innovation Lab access (2 months) for select members, and VC introductions (Inception Capital Connect).
> **Effort:** Low — one application, accept any funding stage. Mostly **enabling/discount value** rather than a single direct cash-credit drop.

---

## Program facts (verified May 2026)

| Item | Detail |
|------|--------|
| **Cost / structure** | Free. No application fees, no deadlines, no cohorts. 19,000+ member companies. |
| **Eligibility** | Must employ ≥1 developer, have a working website, be officially incorporated, and be <10 years old. **Any funding stage** is fine. |
| **NOT eligible** | Consulting firms, crypto companies, cloud service providers, resellers/distributors, public companies. (CityPulse is none of these — we are a product company.) |
| **Cloud credits** | Access to partner credits: up to **$100,000** AWS Activate packages, up to **$150,000** Nebius AI cloud credits, plus other partner offers. |
| **Training / SDKs** | Free **Deep Learning Institute (DLI)** training credits, SDK access, preferred pricing on select hardware/software. |
| **DGX Cloud** | DGX Cloud Innovation Lab — 2 months hands-on DGX Cloud + software + expert support for **select** members. Members get **30% off** standard DGX Cloud (min four nodes/one month; $75k min spend — relevant later, not now). |
| **VC access** | Inception Capital Connect links members to NVIDIA's VC network. |

**Path for CityPulse:** Join now (we qualify today). Inception is primarily a **force-multiplier**: it unlocks partner cloud credits (AWS/Nebius), free training, hardware/software discounts, co-marketing, and investor intros — all useful even though the core value is enabling/discount rather than a one-shot cash credit. We will **not** pursue DGX Cloud (the $75k-min commitment) until we need dedicated GPU training; for now we run LLM inference via managed APIs.

---

## Application content (ready to paste)

### Company name
CityPulse

### Website / live product
https://citypulse-beta.vercel.app

### One-line description
AI civic-infrastructure platform — a live, map-based command center plus AI agents that detect, triage, and route municipal infrastructure problems before they fail.

### Company description
CityPulse is an early-stage, product-focused AI company (not a consultancy or reseller) building the operating system for municipal infrastructure. We unify a city's roads, water, stormwater, traffic, air-quality, and wildfire/flood systems into one geospatial command center and add AI agents that reason continuously over asset condition, sensor signals, and resident 311 reports — surfacing what is failing, what it will cost, and the next action.

### Problem
Aging infrastructure plus thin municipal staffing means failures are caught late and capital is spent reactively. Cities lack a single live operating picture, automated triage of incoming signals, and defensible cost/impact evidence to prioritize spending and win grants.

### Product & AI/compute profile
- **Frontend:** Next.js 16, 25 routes (5 public + 18 portal), map-based command center per domain, asset registry, 311 intake, work orders, capital planning, embedded AI dock. Live demo deployed today.
- **Backend:** NestJS, 12 modules, JWT + RBAC, Prisma over **PostgreSQL/PostGIS**, **Redis**.
- **AI / accelerated compute:** LLM/agent layer (model-portable; Gemini today) for asset-condition reasoning, incident triage/routing, and natural-language Q&A. Roadmap includes geospatial/vision models on imagery (satellite/drone/CCTV) for asset condition detection and anomaly spotting — workloads that benefit directly from NVIDIA accelerated compute (Triton inference, TensorRT-LLM, NIM microservices, and DLI training).
- **Engineering:** Dockerized, GitHub Actions CI, Playwright e2e, SEO/GEO + GA4, security/compliance + accessibility pages.

### Number of developers
≥1 developer actively building the product (frontend + backend + AI). _(Confirm headcount at submission.)_

### Stage (any stage accepted)
Pre-revenue, early-stage. Production-grade product with a **public live demo**; pursuing paid municipal pilots and public-benefit grants. Reference scenario (flagship demo, mid-size city "Meridian"): ~$4.2M avoided costs, 82% detection, 9-minute lead time, 47 incidents auto-routed — the outcome the platform is built to deliver.

### How we'll use NVIDIA Inception benefits
1. **Partner cloud credits** (AWS Activate / Nebius) — run pilot infrastructure and AI inference for municipalities without infra cost being the blocker.
2. **DLI training credits + SDKs** — upskill the team and adopt NVIDIA inference tooling (Triton, TensorRT-LLM, NIM) to cut latency and cost on our agent/vision workloads.
3. **Preferred hardware/software pricing** — for future on-prem/edge inference where a city requires data to stay in-jurisdiction (a common public-sector constraint).
4. **DGX Cloud (later)** — model fine-tuning/eval for geospatial/vision models once volume justifies the commitment.
5. **Co-marketing + Capital Connect** — visibility with the AI ecosystem and introductions to investors aligned with civic/climate tech.

### Why NVIDIA Inception
Our roadmap moves from API-based LLM agents toward geospatial/vision inference on city imagery — exactly where NVIDIA's stack (Triton, TensorRT-LLM, NIM, DGX Cloud) and DLI training add the most value. Inception also stacks with the cloud credits we're pursuing (AWS/Nebius), multiplying the runway for real municipal pilots, and the climate/infrastructure focus of recent Inception expansions aligns squarely with CityPulse's mission.

### Founder / contact
Maksym Stepanenko — _(insert email + LinkedIn at submission)_

---

## Sources
- [Inception Program for Startups — NVIDIA](https://www.nvidia.com/en-us/startups/)
- [AI Startup Innovation with NVIDIA DGX Cloud Innovation Lab](https://www.nvidia.com/en-us/data-center/dgx-cloud/innovation-lab/)
- [NVIDIA Inception Program for AI Startups (2026) — Thundercompute](https://www.thundercompute.com/blog/nvidia-inception-program-guide)
- [NVIDIA Inception Introduces New and Updated Benefits — NVIDIA Blog](https://blogs.nvidia.com/blog/inception-expands-beyond-10k-with-omniverse-climate-startups/)
