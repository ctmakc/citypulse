import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'

export const metadata: Metadata = {
  title: 'Security · CityPULSE Civil OS',
  description:
    'CityPulse is designed to meet the security, privacy and compliance requirements of public sector organizations.',
}

/* ─── Data ──────────────────────────────────────────────────────────── */
const pillars = [
  {
    title: 'Multi-tenant isolation',
    desc: 'Each city\'s data is fully isolated at the database level. Row-level security is enforced on every query — no shared tables, no accidental cross-tenant reads.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'End-to-end encryption',
    desc: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256. Encryption keys are managed separately per tenant.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Role-based access',
    desc: '13 named roles with granular permission scopes. Every write action is authenticated, authorized, and logged — no anonymous mutations.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'SSO & MFA',
    desc: 'Integrate with your existing government identity provider via SAML 2.0 or OIDC. Multi-factor authentication is enforced by policy for all privileged roles.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    title: 'Full audit trail',
    desc: 'Every action by every user, API caller, or AI agent is recorded with timestamp, actor identity, IP address, and affected resource. Logs are tamper-evident and exportable.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: 'Data residency',
    desc: 'Deploy in your preferred region. Data stays within your chosen jurisdiction — no cross-border transfer without explicit configuration and consent.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'SOC 2 Type II',
    desc: 'Our security controls are designed to meet SOC 2 Type II requirements across all five Trust Service Criteria: security, availability, processing integrity, confidentiality, and privacy.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: 'Penetration testing',
    desc: 'Regular third-party security assessments by CREST-accredited firms. Findings are remediated within defined SLAs and disclosed to enterprise customers.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
]

const complianceBadges = [
  { label: 'GDPR', desc: 'EU General Data Protection Regulation', color: 'var(--blue)', wash: 'var(--blue-wash)' },
  { label: 'CCPA', desc: 'California Consumer Privacy Act', color: 'var(--blue)', wash: 'var(--blue-wash)' },
  { label: 'FedRAMP Ready', desc: 'Federal Risk and Authorization Mgmt Program', color: 'var(--green)', wash: 'var(--green-wash)' },
  { label: 'PIPEDA', desc: 'Personal Information Protection (Canada)', color: 'var(--slate)', wash: 'var(--slate-wash)' },
  { label: 'ISO 27001', desc: 'Information Security Management alignment', color: 'var(--amber)', wash: 'var(--amber-wash)' },
  { label: 'NIST CSF', desc: 'NIST Cybersecurity Framework', color: 'var(--green)', wash: 'var(--green-wash)' },
]

const responseRows = [
  { severity: 'Critical (P0)', sla: '< 1 hour', channels: 'Phone + email + status page' },
  { severity: 'High (P1)', sla: '< 4 hours', channels: 'Email + status page' },
  { severity: 'Medium (P2)', sla: '< 24 hours', channels: 'Email + status page' },
  { severity: 'Low (P3)', sla: '< 5 business days', channels: 'Email' },
]

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function SecurityPage() {
  return (
    <>
      <SiteHeader />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
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
            background: 'var(--green-wash)',
            color: 'var(--green)',
            padding: '5px 14px',
            borderRadius: 'var(--r-pill)',
            fontSize: 10,
            letterSpacing: '0.12em',
            marginBottom: 22,
          }}
        >
          SECURITY
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
            maxWidth: 680,
          }}
        >
          Government-grade.
          <br />Enterprise-proven.
        </h1>
        <p
          className="lede"
          style={{ maxWidth: 560, margin: '0 auto', fontSize: 16, lineHeight: 1.65 }}
        >
          CityPulse is designed to meet the security, privacy and compliance
          requirements of public sector organizations.
        </p>

        {/* Uptime callout */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            marginTop: 36,
            padding: '10px 20px',
            background: 'var(--surface)',
            border: '1px solid var(--rule)',
            borderRadius: 'var(--r-pill)',
            boxShadow: 'var(--sh-1)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--green)',
              display: 'block',
              boxShadow: '0 0 0 3px var(--green-wash)',
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
            99.9% uptime SLA
          </span>
          <span style={{ width: 1, height: 14, background: 'var(--rule)' }} />
          <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>
            All systems operational
          </span>
        </div>
      </section>

      {/* ── Security pillars ─────────────────────────────────────────── */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px 80px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))',
            gap: 16,
          }}
        >
          {pillars.map((p, i) => (
            <div
              key={p.title}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--rule)',
                borderRadius: 'var(--r-lg)',
                padding: '24px',
                boxShadow: 'var(--sh-1)',
                display: 'flex',
                gap: 18,
                alignItems: 'flex-start',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: i % 3 === 0 ? 'var(--blue-wash)' : i % 3 === 1 ? 'var(--green-wash)' : 'var(--slate-wash)',
                  color: i % 3 === 0 ? 'var(--blue)' : i % 3 === 1 ? 'var(--green)' : 'var(--slate)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                {p.icon}
              </div>
              {/* Text */}
              <div>
                <h3
                  style={{
                    margin: '0 0 7px',
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: 'var(--ink)',
                    lineHeight: 1.25,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: 'var(--ink-soft)',
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Compliance badges ────────────────────────────────────────── */}
      <section style={{ background: 'var(--surface-2)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', padding: '64px 28px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div
              className="cap"
              style={{ fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.12em', marginBottom: 10 }}
            >
              COMPLIANCE COVERAGE
            </div>
            <h2
              className="serif"
              style={{
                fontSize: 'clamp(24px,3.5vw,36px)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
                margin: 0,
              }}
            >
              Built around the frameworks you already use.
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 14,
            }}
          >
            {complianceBadges.map((b) => (
              <div
                key={b.label}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--rule)',
                  borderRadius: 'var(--r)',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  boxShadow: 'var(--sh-1)',
                }}
              >
                <div
                  style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--r-pill)',
                    background: b.wash,
                    color: b.color,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {b.label}
                </div>
                <span style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.45 }}>
                  {b.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Incident response ────────────────────────────────────────── */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: '72px 28px 80px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            alignItems: 'start',
          }}
        >
          {/* Left — copy */}
          <div>
            <div
              className="cap"
              style={{ fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.12em', marginBottom: 14 }}
            >
              INCIDENT RESPONSE
            </div>
            <h2
              className="serif"
              style={{
                fontSize: 'clamp(24px,3vw,38px)',
                fontWeight: 600,
                letterSpacing: '-0.022em',
                lineHeight: 1.1,
                color: 'var(--ink)',
                margin: '0 0 16px',
              }}
            >
              99.9% uptime SLA, backed by a real response process.
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)', margin: '0 0 24px' }}>
              Every incident is categorized by severity and routed to on-call engineers
              within minutes. Enterprise customers receive dedicated incident management
              and post-incident reports.
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {[
                { label: 'Dedicated status page', icon: '↗' },
                { label: 'Automated alerting to subscribers', icon: '↗' },
                { label: 'Post-incident reports for P0–P1', icon: '↗' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 13.5,
                    color: 'var(--ink-soft)',
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: 'var(--green-wash)',
                      color: 'var(--green)',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 10,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — response table */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--r-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--sh-2)',
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1.5fr',
                padding: '13px 20px',
                borderBottom: '1px solid var(--rule)',
                background: 'var(--surface-3)',
              }}
            >
              {['Severity', 'Response SLA', 'Notification channels'].map((h) => (
                <span
                  key={h}
                  className="cap"
                  style={{ fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.09em' }}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {responseRows.map((row, i) => (
              <div
                key={row.severity}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1.5fr',
                  padding: '14px 20px',
                  borderBottom: i < responseRows.length - 1 ? '1px solid var(--rule-soft)' : 'none',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: i === 0 ? 'var(--red)' : i === 1 ? 'var(--amber)' : i === 2 ? 'var(--blue)' : 'var(--ink-soft)',
                  }}
                >
                  {row.severity}
                </span>
                <span
                  className="mono"
                  style={{ fontSize: 12.5, color: 'var(--ink)', fontWeight: 600 }}
                >
                  {row.sla}
                </span>
                <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>
                  {row.channels}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA footer ───────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--ink)',
          padding: '72px 28px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(28px,4vw,44px)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: '#fff',
              marginBottom: 16,
            }}
          >
            Security questions? Talk to our team.
          </h2>
          <p
            style={{
              fontSize: 15,
              fontFamily: 'var(--serif)',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 36,
            }}
          >
            We work directly with your IT security and compliance teams to
            answer every question before you sign — and stay accountable after.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="#demo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--grotesk)',
                fontSize: 14,
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: 'var(--r-pill)',
                background: '#fff',
                color: 'var(--ink)',
                textDecoration: 'none',
              }}
            >
              Request a security review
            </Link>
            <Link
              href="/solutions"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--grotesk)',
                fontSize: 14,
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: 'var(--r-pill)',
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.15)',
                textDecoration: 'none',
              }}
            >
              View solutions
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <SiteFooter />
    </>
  )
}
