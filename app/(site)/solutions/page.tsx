import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'

export const metadata: Metadata = {
  title: 'Solutions · CityPULSE Civil OS',
  description:
    "CityPulse is designed so that every department — from public works to the grant office — sees what they need, without seeing what they don't.",
}

/* ─── Department data ──────────────────────────────────────────────── */
const departments = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    dept: 'City Manager',
    title: 'The operating picture at the top.',
    desc: 'A single pane of glass across every department, so city leadership always knows what\'s happening and what needs attention.',
    features: ['Full-city risk score with trend history', 'AI morning briefing, generated daily', 'Cross-department priority action queue'],
    accent: 'var(--blue)',
    wash: 'var(--blue-wash)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    dept: 'Public Works',
    title: 'Infrastructure before it fails.',
    desc: 'Continuous sensor feeds, AI failure prediction, and automated work orders — shifting from reactive repairs to proactive maintenance.',
    features: ['Asset condition monitoring at scale', 'Failure probability scoring and alerts', 'Scheduled maintenance + digital work orders'],
    accent: 'var(--green)',
    wash: 'var(--green-wash)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    dept: 'Emergency Management',
    title: 'Respond before it escalates.',
    desc: 'Real-time hazard monitoring and a shared command board that keeps every agency — fire, police, utilities — on the same page.',
    features: ['Hazard monitoring across flood, fire, and weather', 'Evacuation route planning and resident alerts', 'Multi-agency coordination board'],
    accent: 'var(--red)',
    wash: 'var(--red-wash)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12c0-2.76 1.12-5.26 2.93-7.07" />
        <path d="M12 12c0-2.21 1.79-4 4-4" />
      </svg>
    ),
    dept: 'Environment',
    title: 'Air, water, climate in one view.',
    desc: 'Sensor networks, satellite imagery, and climate models combined into a single environmental intelligence layer.',
    features: ['AQI monitoring and exceedance alerts', 'Water quality sensor network and alerts', 'Heat island mapping and emissions tracking'],
    accent: 'var(--green)',
    wash: 'var(--green-wash)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    dept: 'Transportation',
    title: 'Move people, reduce emissions.',
    desc: 'Live congestion data, signal optimization recommendations, and transit performance metrics — all in one dashboard.',
    features: ['Congestion analytics and hotspot mapping', 'Traffic signal optimization recommendations', 'Accident detection and transit performance KPIs'],
    accent: 'var(--amber)',
    wash: 'var(--amber-wash)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    dept: 'Utilities',
    title: 'Water, power, streetlights, sewers.',
    desc: 'A unified asset health dashboard for every utility system, with sensor alerts and automated scheduled maintenance.',
    features: ['Unified asset health across all utility types', 'Sensor alerts for anomalies and threshold breaches', 'Scheduled maintenance tracking and outage response'],
    accent: 'var(--amber)',
    wash: 'var(--amber-wash)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    dept: 'Grants Office',
    title: 'Turn risk into funding.',
    desc: 'CityPulse surfaces the grant opportunities most aligned to your city\'s live risk profile, then helps you apply.',
    features: ['AI grant matching against real-time city risk data', 'Application generation from existing reports', 'Deadline tracking and funder-ready export'],
    accent: 'var(--blue)',
    wash: 'var(--blue-wash)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    dept: 'Citizen Support',
    title: '311 that routes itself.',
    desc: 'Incoming service requests are automatically classified, deduplicated, and routed to the right department — with SLA tracking built in.',
    features: ['AI classification and auto-routing of 311 requests', 'Duplicate detection across channels', 'SLA tracking and resident status communication'],
    accent: 'var(--slate)',
    wash: 'var(--slate-wash)',
  },
]

const impactStats = [
  { value: '62%', label: 'reduction in emergency response time' },
  { value: '8×', label: 'faster grant application turnaround' },
  { value: '41%', label: 'fewer reactive maintenance events' },
  { value: '99.9%', label: 'platform uptime SLA' },
]

/* ─── Page ─────────────────────────────────────────────────────────── */
export default function SolutionsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 1140,
          margin: '0 auto',
          padding: '88px 28px 72px',
          textAlign: 'center',
        }}
      >
        <div
          className="cap"
          style={{
            display: 'inline-block',
            background: 'var(--blue-wash)',
            color: 'var(--blue)',
            padding: '5px 14px',
            borderRadius: 'var(--r-pill)',
            fontSize: 10,
            letterSpacing: '0.12em',
            marginBottom: 22,
          }}
        >
          SOLUTIONS
        </div>
        <h1
          className="serif"
          style={{
            fontSize: 'clamp(36px,5vw,58px)',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 1.08,
            color: 'var(--ink)',
            margin: '0 auto 20px',
            maxWidth: 720,
          }}
        >
          One platform,<br />every department.
        </h1>
        <p
          className="lede"
          style={{ maxWidth: 560, margin: '0 auto', fontSize: 16, lineHeight: 1.65 }}
        >
          CityPulse is designed so that every department — from public works to
          the grant office — sees what they need, without seeing what they
          don&apos;t.
        </p>
      </section>

      {/* ── Department grid ─────────────────────────────────────────── */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px 96px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
          }}
        >
          {departments.map((d) => (
            <div
              key={d.dept}
              className="lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--rule)',
                borderRadius: 'var(--r-lg)',
                padding: '26px 24px 24px',
                boxShadow: 'var(--sh-2)',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
              }}
            >
              {/* Icon + dept label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: d.wash,
                    color: d.accent,
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  {d.icon}
                </div>
                <span
                  className="cap"
                  style={{ fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.1em' }}
                >
                  {d.dept}
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: 16.5,
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.25,
                  color: 'var(--ink)',
                  margin: '0 0 8px',
                }}
              >
                {d.title}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  color: 'var(--ink-soft)',
                  margin: '0 0 18px',
                }}
              >
                {d.desc}
              </p>

              {/* Feature bullets */}
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
                {d.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 9,
                      fontSize: 13,
                      color: 'var(--ink-soft)',
                      lineHeight: 1.45,
                    }}
                  >
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: d.wash,
                        color: d.accent,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5.5l2.2 2L8 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Impact metrics strip ─────────────────────────────────────── */}
      <section style={{ background: 'var(--ink)', padding: '64px 28px' }}>
        <div
          style={{
            maxWidth: 1140,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
            textAlign: 'center',
          }}
        >
          {impactStats.map((s) => (
            <div key={s.label}>
              <div
                className="serif"
                style={{
                  fontSize: 46,
                  fontWeight: 600,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.45,
                  maxWidth: 180,
                  margin: '0 auto',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA footer ──────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 1140,
          margin: '0 auto',
          padding: '80px 28px 72px',
          textAlign: 'center',
        }}
      >
        <h2
          className="serif"
          style={{
            fontSize: 'clamp(28px,4vw,44px)',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            color: 'var(--ink)',
            marginBottom: 16,
          }}
        >
          Ready to see your city
          <br />in a single view?
        </h2>
        <p
          className="lede"
          style={{ marginBottom: 32, fontSize: 15 }}
        >
          Join the growing number of municipalities using CityPulse to move from
          reactive to resilient.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="#demo"
            className="btn"
            style={{ fontSize: 14, padding: '12px 24px', textDecoration: 'none' }}
          >
            Request a demo
          </Link>
          <Link
            href="/security"
            className="btn-ghost btn"
            style={{ fontSize: 14, padding: '12px 24px', textDecoration: 'none' }}
          >
            Security overview
          </Link>
        </div>
      </section>

      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <SiteFooter />
    </>
  )
}
