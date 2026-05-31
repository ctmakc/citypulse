# CityPulse — Deep Analysis & Sprint Roadmap

_Audit date: 2026-05-31 · Author: Claude (autonomous build)_

This document is the source of truth for bringing CityPulse from "impressive demo" to
"production-grade, design-faithful, PRD-complete platform."

---

## 1. Where we are today

**Frontend** — Next.js 16 App Router, 25 routes, ~21.7k LOC TS/TSX, custom CALM design system
(Spectral + Archivo + IBM Plex Mono, no Tailwind). 5 promo pages + 18 portal screens + login.

**Backend** — NestJS, ~4.4k LOC, 12 modules, 13 Prisma models, JWT+RBAC, seeded Meridian tenant.
PostGIS 16 + Redis 7 in Docker. All 9 domain endpoints return 200.

**What genuinely works**
- Every design screen is implemented and visually faithful to the handoff
- Real auth + DB-backed data (assets, alerts, 311, work orders, capital, agents)
- Asset filters, detail drawers, 311 submit form, work-order modal, AI dock chat (scripted fallback)
- API guarded so no 401 spam when logged out

**What is demo-deep, not production-deep**
- AI agents are scripted, not reasoning over live data
- PostGIS is installed but unused — assets store `lat/lng` floats, not geometry
- Redis runs but BullMQ queues are not wired
- Report "Generate" buttons simulate; no real PDF/Excel/PPTX
- Role switcher changes a label but gates/re-prioritizes nothing
- Maps re-initialize (bug), timeline slider and layer toggles are visual-only

---

## 2. Confirmed defects (evidence-based)

| # | Severity | Defect | Evidence |
|---|----------|--------|----------|
| D1 | **P0** | Leaflet `Map container is already initialized` PAGEERR on every domain page + emergency | `pageerror` captured on /wildfire /water /traffic /air /emergency /flood |
| D2 | **P0** | Hydration mismatch ("tree hydrated but attributes didn't match") on wildfire/water/air/flood | console error captured |
| D3 | **P0** | Promo nav inconsistent — 2 different headers/logos/CTAs across pages, no shared component | grep diff: home="Platform/Solutions/Security + Request a pilot", solutions/security="Solutions/Security/Pricing/Docs + Request demo" |
| D4 | P1 | Role switcher is cosmetic — does not gate nav or re-prioritize dashboard | code review |
| D5 | P1 | Digital Twin layer toggles + timeline slider are visual-only (don't filter markers / scrub state) | screenshot + code |
| D6 | P1 | Asset detail drawer lacks PRD-required tabs (inspection history, sensor data, incidents, work orders, attached docs) | PRD §3 vs current drawer |
| D7 | P1 | No mobile verification; CSS breakpoints exist but untested at 390px | not yet driven at mobile width |
| D8 | P1 | Accessibility unverified despite footer claiming "WCAG 2.1 AA" | no focus rings, aria, skip-link, keyboard nav audit |
| D9 | P2 | List endpoints have no pagination — won't hold the PRD's "100k+ assets" claim | code review |
| D10 | P2 | No audit trail table despite BUILD.md requiring "every action stored" | schema review |

---

## 3. PRD coverage gap (modules → reality)

| PRD Module | UI | Backend | Gap to "ideal" |
|---|----|---------|----------------|
| Executive Dashboard | ✅ | ✅ live | role-based re-prioritization |
| Digital Twin | ✅ | partial | layer filtering, timeline state, asset inspector, clustering |
| Asset Management | ✅ | ✅ | full detail page (inspections/sensors/incidents/WOs/docs/AI), PostGIS geometry |
| Citizen Reports 311 | ✅ +form | ✅ | public citizen-facing submit page, photo upload, AI auto-classify |
| AI Agents | ✅ | scripted | real Gemini reasoning over live DB context, agent run history |
| Environmental Intelligence | air only | partial | water quality detail, heat-island map, emissions, real readings |
| Traffic Intelligence | ✅ | static | live-ish feed simulation, forecast model |
| Emergency Management | ✅ | partial | evacuation zones, resource tracking, command-center workflow |
| Capital Planning | ✅ | ✅ | risk→project pipeline visualization, AI cost estimate |
| Grants Management | ✅ | partial | AI grant-narrative generation, deadline engine, funder report |
| Reports/Export | ✅ buttons | none | real PDF/Excel/PPTX generation |

---

## 4. Sprint plan

Each sprint is independently shippable and ends with a green build + clean console.

### Sprint 0 — Stabilize (P0) · _half-day_
Goal: zero runtime errors, one consistent promo shell.
- Fix Leaflet double-init (guard with ref + cleanup, or `key` per route) — kills D1
- Fix hydration mismatches on domain pages (no nondeterministic render) — kills D2
- Extract `SiteHeader` + `SiteFooter` shared components; apply to all 5 promo pages — kills D3
- Verify: clean console on all 22 pages, no Next.js "issues" badge
- **DoD:** `pageerror` count = 0 across all routes; one promo header everywhere

### Sprint 1 — Fidelity & polish · _1 day_
Goal: it feels finished and accessible.
- Mobile responsive pass (390 / 768 / 1440) — sidebar slide-over, bottom tabs, stacked grids
- Accessibility: focus rings, aria-labels, keyboard nav, skip-to-content, color-contrast audit (the footer claims WCAG 2.1 AA — make it true)
- Wire Skeleton loaders + EmptyState into every data screen
- Consistent iconography + hover/active micro-interactions
- **DoD:** Lighthouse a11y ≥ 95, usable at 390px, no layout breaks

### Sprint 2 — Functional depth (close UI gaps to PRD) · _2 days_
- Full **Asset Detail** route `/assets/[id]` — tabs: Overview · Inspections · Sensors · Incidents · Work Orders · Documents · "Why at risk" (AI)
- **Digital Twin** interactivity — layer toggles filter markers, timeline scrubs −72h…+72h state, marker click → asset inspector, marker clustering
- **Capital** risk→project pipeline flow (Asset risk → cost estimate → funding source → grant draft → project)
- **Emergency** command-center depth — evacuation zones, resource roster, escalation workflow
- **Role-based** dashboard re-prioritization + nav gating (D4)
- **DoD:** every PRD module's primary user flow is clickable end-to-end

### Sprint 3 — Backend depth · _2 days_
- Real **PostGIS** geometry columns on Asset/Report/Alert; spatial queries (bbox, nearest, ST_Cluster)
- **BullMQ** job queues — agent runs, report generation, data ingest as background jobs
- Real **Gemini** agent reasoning — each agent reads live DB context, produces finding+confidence+actions
- **Pagination + filtering** on all list endpoints (cursor-based) — D9
- **Audit trail** table + interceptor logging every mutation (actor, entity, payload) — D10
- **DoD:** 100k seeded assets render on map via spatial query < 300ms

### Sprint 4 — Real outputs & integrations · _2 days_
- **PDF/Excel** report generation (puppeteer for PDF, exceljs for xlsx) wired to Reports buttons
- **CSV/GeoJSON import** for assets (bulk onboarding a real city)
- **Public 311** citizen page (no auth, photo upload, tracking-code lookup)
- **Notifications** — webhook + email (nodemailer) on critical alerts
- **DoD:** download a real Council Briefing PDF; import 500 assets from CSV

### Sprint 5 — Production hardening · _2 days_
- **Tests** — Playwright E2E (login→portal→key flows), Jest unit (backend services)
- **CI** — GitHub Actions (lint + typecheck + build + test on PR)
- **Dockerfiles** — frontend + backend; full `docker-compose up` brings up the stack
- **Hardening** — env validation (zod), rate limiting, React error boundaries, health checks, security headers, structured logging
- **DoD:** `docker compose up` → working stack; CI green; E2E suite passes

---

## 5. Definition of "ideal" (from BUILD.md, made measurable)

- [ ] Every design screen implemented (✅ done)
- [ ] All flows clickable end-to-end (Sprint 2)
- [ ] Responsive at 390/768/1440 (Sprint 1)
- [ ] Role-based navigation actually gates (Sprint 2)
- [ ] Maps function — no init errors, layers + timeline live (Sprint 0 + 2)
- [ ] No placeholder screens (✅) and no stub buttons (Sprint 4)
- [ ] Real data path, spatial + paginated (Sprint 3)
- [ ] Tested + CI + containerized (Sprint 5)
- [ ] WCAG 2.1 AA verified (Sprint 1)
