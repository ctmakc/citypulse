# Infrastructure Startup Programs — CityPulse applications (submission-ready drafts)

> **Status:** DRAFT — do not submit until Maksym reviews and applies under his own identity/accounts.
> **Scope:** Developer-infra startup programs that map onto CityPulse's actual stack: **Vercel** (frontend hosting — we deploy here today), **Neon** (serverless Postgres), **Supabase** (Postgres + auth + storage), **MongoDB Atlas** (document data + Voyage AI), **Cloudflare** (CDN/WAF/edge/R2).
> **Why these:** they fund the exact components we run (Next.js hosting, Postgres/PostGIS, cache/edge, storage). Several require **no funding and no referral**, so they're among the fastest, highest-certainty wins in the whole kit.

---

## Shared pitch block (paste into any program's "describe your startup" field)

**CityPulse** is an early-stage, AI-first SaaS company building the operating system for municipal infrastructure. We unify a city's roads, water, stormwater, traffic, air-quality, and wildfire/flood systems into one geospatial command center and add AI agents that detect, triage, and route infrastructure problems before they fail. **Stack:** Next.js 16 (App Router) frontend deployed on Vercel; NestJS backend; PostgreSQL/**PostGIS** for geospatial data; Redis for queues/cache; an LLM/agent layer (model-portable). **Live demo:** https://citypulse-beta.vercel.app. **Stage:** pre-revenue, production-grade product (25 routes, e2e tests, CI), pursuing paid municipal pilots and public-benefit grants.

---

## 1. Vercel — Vercel for Startups

**Apply at:** https://vercel.com/startups/credits

**What it offers (verified May 2026)**
- Up to **$30,000** in platform credits for qualified startups (free Vercel Pro + platform credits).
- Apply via accelerator partnerships, VC referral, or directly.
- (Separately, the **Vercel AI Accelerator** runs periodically with large pooled credits across partners — worth tracking, but the standard startup credits are the direct ask.)

**CityPulse fit / plan:** **We already deploy CityPulse's frontend and live demo on Vercel** — this is the single most natural program in the kit. Apply directly now; strengthen with an accelerator/VC referral later for the higher end.

**The pitch (paste):** Shared block, then:
> CityPulse's entire public site and product frontend (Next.js 16, 25 routes) already run on Vercel, including our live demo. Credits let us move pilot tenants onto Vercel Pro (preview deployments per city, edge performance, analytics, and team seats) without hosting cost blocking municipal pilots.

**Requested:** Vercel for Startups credits (target up to $30,000) + Pro plan.

---

## 2. Neon — Neon Startup Program

**Apply at:** https://neon.tech/ (Startup Program) · also available via the Vercel Marketplace integration

**What it offers (verified May 2026)**
- Up to **$100,000** in serverless Postgres credits over **12 months**, plus priority support and early-feature access.

**CityPulse fit / plan:** CityPulse is Postgres-first (Prisma + **PostGIS**). Neon's serverless Postgres with branching is ideal for **per-pilot database branches** (one isolated branch per municipality, instant preview DBs for demos). Confirm current PostGIS/geospatial support level on Neon for our heaviest geospatial queries; use Neon for app/tenant data and keep a PostGIS-strong option where needed. Apply directly.

**The pitch (paste):** Shared block, then:
> CityPulse stores each city's assets, incidents, 311 reports, and work orders in PostgreSQL. Neon's branching lets us spin an isolated, instantly-provisioned database per municipal pilot and per preview deployment — matching our multi-tenant pilot model. $100K over 12 months covers our database layer across many simultaneous city pilots, with room to scale as data grows toward the PRD's 100k+-asset target.

**Requested:** Neon Startup Program credits (target up to $100,000 / 12 months) + priority support.

---

## 3. Supabase — Supabase Startup Program

**Apply at:** https://supabase.com/partners (Startup Program form)

**What it offers (verified May 2026)**
- **6 months of the Team plan free** (~$599/mo, ~$3,600 value), plus partner perks across the Supabase ecosystem.
- **No VC referral required** — open to bootstrapped / pre-seed / seed startups.
- Reviews in ~3–14 business days.

**CityPulse fit / plan:** Supabase is Postgres + auth + storage + realtime in one — a strong fit for fast pilot stand-up (Postgres with **PostGIS extension**, row-level security for tenant isolation, storage for inspection media, realtime for live command-center updates). **No funding required = we qualify today.** Apply directly.

**The pitch (paste):** Shared block, then:
> Supabase gives CityPulse managed Postgres (with PostGIS), row-level-security multi-tenant isolation, file storage for inspection media/documents, and realtime updates for the live command center — in one platform. 6 months of Team plan lets us run production-grade pilots with backups, higher limits, and support while we convert pilots to paid contracts.

**Requested:** Supabase Startup Program — 6 months Team plan + ecosystem perks.

---

## 4. MongoDB — MongoDB for Startups

**Apply at:** https://www.mongodb.com/solutions/startups

**What it offers (verified May 2026)**
- **$500** Atlas credits baseline; some channels cite up to **$5,000** across MongoDB Cloud products (valid 12 months).
- **Atlas credits + Voyage AI tokens**, technical expertise, dedicated onboarding/1:1 sessions.

**Eligibility:** **Series A or earlier** — includes a pre-revenue bootstrapped startup.

**CityPulse fit / plan (honest):** CityPulse's primary datastore is **PostgreSQL/PostGIS**, not MongoDB, so this is a **secondary / optional** application. The genuine hooks: (a) **Atlas Vector Search + Voyage AI** for the RAG/embeddings layer behind our agents, and (b) Atlas as a flexible store for **unstructured/semi-structured data** (raw sensor payloads, ingested documents, event logs). Apply if we adopt Atlas Vector Search for retrieval; otherwise deprioritize. Do not claim MongoDB is our core DB.

**The pitch (paste, only if pursuing):** Shared block, then:
> CityPulse is evaluating MongoDB **Atlas Vector Search + Voyage AI** for the retrieval layer that grounds our civic agents in each city's documents (inspection reports, capital plans, regulations) and for storing high-volume unstructured sensor/event data alongside our relational core. Credits + Voyage tokens let us prototype and run that retrieval layer in production pilots.

**Requested:** MongoDB for Startups — Atlas credits (target up to $5,000) + Voyage AI tokens + onboarding.

---

## 5. Cloudflare — Cloudflare for Startups

**Apply at:** https://www.cloudflare.com/startups/

**What it offers (verified May 2026)**
- Tiered credits up to **$350,000** for a year:
  - **Tier 1:** $10k — build/launch, **no minimum funding required**.
  - **Tier 2:** $100k — angel-backed; account manager + technical sessions.
  - **Tier 3:** $250k — seed-funded.
  - **Tier 4 (max):** up to $350k — Series A or later; office hours + priority support.
- Eligibility: company ≤5 years old; tier matched to funding stage.

**CityPulse fit / plan:** Cloudflare covers CDN, **WAF/DDoS** (critical for public-facing government tools), **R2** object storage (no egress fees — great for inspection media), Workers/edge, Zero Trust, and DNS. **Tier 1 ($10k) requires no funding — we qualify today.** Step up tiers as we raise. Apply directly.

**The pitch (paste):** Shared block, then:
> CityPulse serves public-facing municipal tools (resident 311 intake, status pages) and sensitive internal dashboards. Cloudflare gives us WAF/DDoS protection and Zero Trust for the security posture government procurement demands, R2 for cost-free egress on inspection media and document storage, and global CDN/edge performance. Tier 1 credits let us harden and scale pilots immediately, with a clear path up the tiers as we raise.

**Requested:** Cloudflare for Startups — **Tier 1 ($10,000)** now (no funding required); Tier 2+ ($100k–$350k) as funding stage advances.

---

## Summary — infra programs, ranked for CityPulse

| Program | Est. value | Funding required? | Stack fit | Effort | Priority |
|---------|-----------|-------------------|-----------|--------|----------|
| **Vercel for Startups** | up to **$30,000** | No (referral helps) | **Direct** — we deploy here today | Low | **1 — apply now** |
| **Neon Startup** | up to **$100,000** / 12 mo | No (varies) | High — Postgres core; per-pilot branches | Low–Med | **2 — apply now** |
| **Supabase Startup** | **6 mo Team** (~$3,600) | **No** | High — Postgres+auth+storage+realtime | Low | **3 — apply now** |
| **Cloudflare (Tier 1)** | **$10,000** (→ up to $350k) | **No** for Tier 1 | High — WAF/R2/edge for gov | Low | **4 — apply now (Tier 1)** |
| **MongoDB for Startups** | $500–**$5,000** + Voyage tokens | No (Series A or earlier) | Secondary — only if Atlas Vector Search adopted | Low | **5 — optional** |

**Recommended order:** Vercel → Neon → Supabase → Cloudflare (Tier 1) → MongoDB (only if we adopt Atlas Vector Search). The first four require no funding, fit the real stack, and together cover hosting, database, and edge/security for multiple municipal pilots.

---

## Sources
- [Vercel for Startups](https://vercel.com/startups/credits) · [Vercel AI Accelerator — blog](https://vercel.com/blog/the-vercel-ai-accelerator-is-back-with-6-million-in-credits)
- [Neon for Vercel — Vercel Marketplace](https://vercel.com/marketplace/neon)
- [Supabase Startup Program — guptadeepak.com](https://guptadeepak.com/startup-offers/programs/supabase-startups) · [Supabase credits docs](https://supabase.com/docs/guides/platform/credits)
- [MongoDB for Startups](https://www.mongodb.com/solutions/startups)
- [Cloudflare Startup Program](https://www.cloudflare.com/startups/) · [How to Get Cloudflare Startup Credits in 2026 — Credit for Startups](https://creditforstartups.com/resources/cloudflare-startup-credits)
