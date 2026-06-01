# CityPulse — Go-To-Market & Grant-Readiness Plan

_Started 2026-05-31. Goal: make CityPulse sellable to municipalities and ready to win government,
private, and techno (free-credit) grants. Builds on the production-grade platform (Sprints 0–5)._

**Live demo:** https://citypulse-beta.vercel.app (Vercel) · GA4 `G-H6B139TQTT`

A live, working demo is necessary but not sufficient. To convert it into something a city will pilot
and a grant committee will fund, we need four layers on top of the product:

1. **Credibility & conversion** — the pages a buyer/evaluator needs before they trust + act.
2. **Lead pipeline** — capture demand that actually reaches us.
3. **Discoverability** — SEO/GEO/analytics so it's found and measured.
4. **Fundraising kit** — submission-ready grant & pitch artifacts.

---

## Layer 1 — Credibility & conversion (public site)
| Page | Why it sells / funds |
|------|----------------------|
| **Pricing** (Pilot / City / Region / Enterprise) | Municipalities need a procurement path; grants need a sustainability/business model |
| **ROI calculator** (population + infra budget → avoided cost, response-time gain) | The single strongest sales + grant-impact tool |
| **About / Company** (mission, civic thesis, team) | Evaluators fund teams + missions, not just software |
| **Case study / Impact** (Meridian pilot: $4.2M avoided, 82% detection, 9-min lead, 47 auto-routed) | The flagship grant + sales narrative |
| **Privacy · Terms · Accessibility statement** | Procurement and public-sector RFPs *require* these |
| **Security / compliance** (have it) + **FAQ** | De-risks the buy |
| **Resources / Insights** (3+ articles) | SEO/GEO surface + thought leadership |

## Layer 2 — Lead pipeline
- `/api/lead` Vercel route handler (webhook-ready via `LEAD_WEBHOOK_URL`) — "Request a pilot",
  "Book a demo", and public "Report a problem" all deliver and confirm. Works on Vercel with no
  backend. GA4 events on submit.

## Layer 3 — Discoverability (SEO / GEO / Analytics)
- GA4 (`G-H6B139TQTT`) consent-gated + event tracking · GSC verification + sitemap.
- `sitemap.ts`, `robots.ts`, `llms.txt` (GEO for AI answer engines), per-page metadata,
  OpenGraph/Twitter cards, JSON-LD (Organization, SoftwareApplication, FAQPage, BreadcrumbList).

## Layer 4 — Fundraising kit (`/grant-kit/`, submission-ready drafts)
**Pitch core:** one-pager · executive summary · pitch-deck outline (10–12 slides) · impact narrative.

**Government grants** (public-benefit / climate / resilience framing):
- FEMA BRIC (hazard mitigation) · EPA (Community Air, water resilience) · USDOT Smart City /
  SMART grants · Infrastructure Canada / FCM Green Municipal Fund · EU civic-tech / Horizon.

**Private / philanthropic** (civic-tech framing):
- Knight Foundation · Bloomberg Philanthropies (city data / Mayors Challenge) · Schmidt Futures ·
  Mozilla / Ford civic tech.

**Techno-grants (free credits — directly useful, realistic to win):**
- AWS Activate · Google for Startups Cloud · Microsoft for Startups Founders Hub · NVIDIA Inception ·
  Anthropic / OpenAI / Cohere credits · Vercel / Neon / MongoDB startup programs.
- Each: ready-to-paste application (company desc, problem, use of credits, traction) + `GRANTS.md`
  index (program, eligibility, deadline, est. value, status, link to draft).

> NOTE: this kit produces **submission-ready drafts only**. Actually creating accounts / submitting
> is an external action that stays with Maksym (his identity, his commitments).

---

## Execution
- **Workflow A** (parallel): pricing+ROI · about+impact · legal+resources · SEO/GEO/analytics+lead.
- **Workflow B** (parallel): pitch core · gov grants · private grants · techno-grant drafts.
- **Then**: redeploy to Vercel, submit GSC sitemap, attempt public backend deploy (VPS docker) so
  login + live API work on the public URL; point `NEXT_PUBLIC_API_URL` at it.
