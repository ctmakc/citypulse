// CityPULSE — public Pricing page · SERVER component

import type { Metadata } from 'next'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import RoiCalculator from '@/components/site/RoiCalculator'

export const metadata: Metadata = {
  title: 'Pricing · CityPULSE Civil OS',
  description:
    'Transparent, public-budget-friendly pricing for CityPulse — from free 30-day pilots to multi-jurisdiction Region and on-prem Enterprise/Gov deployments. NET-30 invoicing and cooperative purchasing supported.',
}

/* ─── Tokens (mirror globals.css; inline to match the other promo pages) ─── */
const INK = 'var(--ink)'
const INK_SOFT = 'var(--ink-soft)'
const INK_FAINT = 'var(--ink-faint)'
const RULE = 'var(--rule)'
const SURFACE = 'var(--surface)'
const SURFACE_2 = 'var(--surface-2)'
const PAPER = 'var(--paper)'
const BLUE = 'var(--blue)'
const GREEN = 'var(--green)'

const serif = 'var(--serif)'
const grotesk = 'var(--grotesk)'
const mono = 'var(--mono)'

const wrap: React.CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }
const codeStyle: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 10,
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  color: INK_FAINT,
  fontWeight: 500,
}

/* ─── Pricing data ─────────────────────────────────────────────────────── */
interface Tier {
  name: string
  price: string
  priceNote: string
  who: string
  features: string[]
  ctaLabel: string
  ctaHref: string
  popular?: boolean
  ghost?: boolean
}

const TIERS: Tier[] = [
  {
    name: 'Pilot',
    price: 'Free',
    priceNote: '30-day pilot',
    who: 'Prove value in one department before any procurement.',
    features: [
      '1 department, 1 hazard',
      'Up to 5,000 assets',
      'Digital twin + executive dashboard',
      'Guided onboarding workshop',
      'No procurement required',
    ],
    ctaLabel: 'Start a pilot',
    ctaHref: '/contact',
    ghost: true,
  },
  {
    name: 'City',
    price: 'from $2,500',
    priceNote: 'per month',
    who: 'A single city or agency running the full platform.',
    features: [
      'Full platform, all departments',
      'Up to 250,000 assets',
      'All modules + AI agents',
      'Grants & capital planning',
      'Email support',
    ],
    ctaLabel: 'Talk to us',
    ctaHref: '/contact',
    popular: true,
  },
  {
    name: 'Region',
    price: 'from $7,500',
    priceNote: 'per month',
    who: 'Counties, regions and multi-jurisdiction operators.',
    features: [
      'Multi-jurisdiction tenancy',
      '1,000,000+ assets',
      'SSO (SAML / OIDC)',
      'Priority support',
      'Uptime SLA',
    ],
    ctaLabel: 'Talk to us',
    ctaHref: '/contact',
    ghost: true,
  },
  {
    name: 'Enterprise / Gov',
    price: 'Custom',
    priceNote: 'tailored agreement',
    who: 'National agencies and security-first deployments.',
    features: [
      'On-prem or region data residency',
      'Procurement & RFP support',
      'Dedicated success manager',
      'Audit & compliance package',
      'Custom integrations',
    ],
    ctaLabel: 'Contact sales',
    ctaHref: '/contact',
    ghost: true,
  },
]

const FAQS: { q: string; a: string }[] = [
  {
    q: 'How do pilots work?',
    a: 'A pilot is a free 30-day deployment scoped to one department and one hazard, with up to 5,000 assets. We run a guided onboarding workshop, connect a sample of your data, and stand up the digital twin and executive dashboard. No procurement, contract or payment is required to start — most pilots go live within two weeks.',
  },
  {
    q: 'Who owns the data?',
    a: 'You do. Your jurisdiction retains full ownership of all data you bring to or generate in CityPulse. Each tenant is isolated at the database level, and you can export everything in open formats at any time. If a pilot does not convert, your data is returned and then deleted on request.',
  },
  {
    q: 'How is it deployed?',
    a: 'City and Region run as a managed multi-tenant cloud service with per-tenant isolation. Enterprise / Gov can be deployed in a dedicated region, your own cloud account, or fully on-premise for data-residency or air-gap requirements. We support phased rollouts department by department.',
  },
  {
    q: 'Is it secure and compliant enough for government?',
    a: 'Yes — security is built in by design: end-to-end encryption (TLS 1.3 in transit, AES-256 at rest), role-based access with 13 named roles, SSO and enforced MFA, and a tamper-evident audit trail on every action by every user, API caller and AI agent. The platform is SOC 2 Type II ready, CJIS-aligned and GDPR compliant, with data-residency options.',
  },
  {
    q: 'What support is included?',
    a: 'City includes email support during business hours. Region adds priority support and a published uptime SLA. Enterprise / Gov adds a dedicated customer success manager, procurement and RFP assistance, and a compliance/audit package. Every plan includes onboarding and access to documentation and product updates.',
  },
]

/* ─── Small pieces ─────────────────────────────────────────────────────── */
function Check() {
  return (
    <span
      style={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: 'var(--green-wash)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: 1,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" width={11} height={11} fill="none" stroke={GREEN} strokeWidth={2.2}>
        <path d="M3 8l3 3 7-6" />
      </svg>
    </span>
  )
}

function PricingCard({ tier }: { tier: Tier }) {
  const cardStyle: React.CSSProperties = {
    background: SURFACE,
    border: tier.popular ? `1.5px solid ${BLUE}` : `1px solid ${RULE}`,
    borderRadius: 'var(--r-lg)',
    boxShadow: tier.popular ? 'var(--sh-3)' : 'var(--sh-2)',
    padding: '26px 24px 24px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '100%',
  }

  return (
    <div style={cardStyle}>
      {tier.popular && (
        <span
          style={{
            position: 'absolute',
            top: -11,
            left: 24,
            fontFamily: grotesk,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#fff',
            background: BLUE,
            borderRadius: 100,
            padding: '4px 12px',
          }}
        >
          Most popular
        </span>
      )}

      {/* Name */}
      <div style={{ fontFamily: grotesk, fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>
        {tier.name}
      </div>

      {/* Price */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: serif, fontSize: 32, fontWeight: 700, color: INK, letterSpacing: '-0.03em', lineHeight: 1 }}>
          {tier.price}
        </span>
        <span style={{ fontFamily: mono, fontSize: 11, color: INK_FAINT, letterSpacing: '0.04em' }}>
          {tier.priceNote}
        </span>
      </div>

      {/* Who it's for */}
      <p style={{ fontFamily: grotesk, fontSize: 13, color: INK_SOFT, lineHeight: 1.55, margin: '0 0 20px', minHeight: 40 }}>
        {tier.who}
      </p>

      {/* Features */}
      <ul style={{ listStyle: 'none', margin: '0 0 24px', padding: 0, display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
        {tier.features.map((f) => (
          <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <Check />
            <span style={{ fontFamily: grotesk, fontSize: 13, color: INK, lineHeight: 1.45 }}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={tier.ctaHref}
        className={tier.popular ? 'btn' : 'btn btn-ghost'}
        style={{ justifyContent: 'center', textDecoration: 'none', width: '100%' }}
      >
        {tier.ctaLabel}
      </a>
    </div>
  )
}

/* ─── Page ─────────────────────────────────────────────────────────────── */
export default function PricingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Archivo:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .pricing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; align-items: stretch; }
        @media (max-width: 1000px) { .pricing-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .pricing-grid { grid-template-columns: 1fr; } }
        details.pp-faq[open] .pp-faq-chevron { transform: rotate(180deg); }
      `}</style>

      <SiteHeader />

      <main id="main-content">
        {/* ── HERO ── */}
        <section style={{ background: PAPER, padding: '72px 0 56px' }}>
          <div style={{ ...wrap, textAlign: 'center' }}>
            <div style={{ ...codeStyle, marginBottom: 16 }}>Pricing</div>
            <h1
              style={{
                fontFamily: serif,
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 600,
                color: INK,
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                margin: '0 auto 20px',
                maxWidth: '18ch',
              }}
            >
              Pricing built for public budgets
            </h1>
            <p
              style={{
                fontFamily: serif,
                fontSize: 16,
                lineHeight: 1.65,
                color: INK_SOFT,
                maxWidth: '56ch',
                margin: '0 auto',
              }}
            >
              Start free, prove the value, then scale department by department. Transparent tiers, cooperative
              purchasing and NET-30 invoicing — designed for how cities actually buy.
            </p>
          </div>
        </section>

        {/* ── PRICING GRID ── */}
        <section style={{ background: PAPER, padding: '8px 0 64px' }}>
          <div style={wrap}>
            <div className="pricing-grid">
              {TIERS.map((t) => (
                <PricingCard key={t.name} tier={t} />
              ))}
            </div>

            {/* Procurement note */}
            <div
              style={{
                marginTop: 28,
                background: SURFACE_2,
                border: `1px solid ${RULE}`,
                borderRadius: 'var(--r)',
                padding: '16px 22px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px 26px',
              }}
            >
              {[
                'No procurement required for pilots',
                'Available via cooperative purchasing',
                'NET-30 invoicing',
              ].map((note) => (
                <span
                  key={note}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: grotesk, fontSize: 13, fontWeight: 600, color: INK_SOFT }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />
                  {note}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background: SURFACE_2, borderTop: `1px solid ${RULE}`, padding: '80px 0' }}>
          <div style={{ ...wrap, maxWidth: 820 }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ ...codeStyle, marginBottom: 14 }}>FAQ</div>
              <h2
                style={{
                  fontFamily: serif,
                  fontSize: 'clamp(26px, 4vw, 38px)',
                  fontWeight: 600,
                  color: INK,
                  letterSpacing: '-0.02em',
                }}
              >
                Questions cities ask
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FAQS.map((item) => (
                <details
                  key={item.q}
                  className="pp-faq"
                  style={{
                    background: SURFACE,
                    border: `1px solid ${RULE}`,
                    borderRadius: 'var(--r)',
                    boxShadow: 'var(--sh-1)',
                    overflow: 'hidden',
                  }}
                >
                  <summary
                    style={{
                      cursor: 'pointer',
                      listStyle: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: '18px 22px',
                      fontFamily: grotesk,
                      fontSize: 15,
                      fontWeight: 600,
                      color: INK,
                    }}
                  >
                    {item.q}
                    <svg
                      className="pp-faq-chevron"
                      viewBox="0 0 24 24"
                      width={18}
                      height={18}
                      fill="none"
                      stroke={INK_FAINT}
                      strokeWidth={2}
                      style={{ flexShrink: 0, transition: 'transform .18s ease' }}
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <div
                    style={{
                      padding: '0 22px 20px',
                      fontFamily: grotesk,
                      fontSize: 14,
                      color: INK_SOFT,
                      lineHeight: 1.7,
                    }}
                  >
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── ROI CALCULATOR ── */}
        <RoiCalculator />
      </main>

      <SiteFooter />
    </>
  )
}
