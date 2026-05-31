import Link from 'next/link'

/* ============================================================
   CityPULSE — shared promo-site footer (rich version)
   Server component. Dark ink background.
   Brand + tagline, 3 link columns, bottom legal line.
   ============================================================ */

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Platform',
    links: [
      { label: 'Digital twin', href: '/platform' },
      { label: 'AI agents', href: '/platform' },
      { label: 'Capital & grants', href: '/platform' },
      { label: 'Integrations', href: '/platform' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'City managers', href: '/solutions' },
      { label: 'Emergency management', href: '/solutions' },
      { label: 'Utilities', href: '/solutions' },
      { label: 'Grants office', href: '/solutions' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Security', href: '/security' },
      { label: 'Request a pilot', href: '/contact' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--grotesk)',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.35)',
  margin: '0 0 14px',
}

const linkStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--grotesk)',
  fontSize: 13.5,
  color: 'rgba(255,255,255,0.6)',
  textDecoration: 'none',
  marginBottom: 10,
  lineHeight: 1.4,
}

export default function SiteFooter() {
  return (
    <footer style={{ background: '#1C2127', color: 'rgba(255,255,255,0.65)', padding: '56px 24px 32px' }}>
      <style>{`
        @media (max-width: 760px) {
          .sf-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .sf-bottom { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          className="sf-grid"
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}
        >
          {/* Brand column */}
          <div>
            <Link
              href="/"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}
              aria-label="CityPULSE home"
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 7,
                  background: 'rgba(255,255,255,0.12)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#fff" strokeWidth={2.1}>
                  <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
                </svg>
              </span>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                CityPULSE
              </span>
            </Link>
            <p style={{ fontFamily: 'var(--grotesk)', fontSize: 13.5, lineHeight: 1.65, maxWidth: 300, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              The civic operating system for infrastructure, climate and environmental resilience.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 style={headingStyle}>{col.heading}</h4>
              {col.links.map((l, i) => (
                <Link key={`${col.heading}-${l.label}-${i}`} href={l.href} style={linkStyle}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="sf-bottom"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span style={{ fontFamily: 'var(--grotesk)', fontSize: 12.5, color: 'rgba(255,255,255,0.4)' }}>
            © 2026 CityPULSE. A demonstration concept.
          </span>
          <span style={{ fontFamily: 'var(--grotesk)', fontSize: 12.5, color: 'rgba(255,255,255,0.4)' }}>
            Privacy · Accessibility (WCAG 2.1 AA) · Open data
          </span>
        </div>
      </div>
    </footer>
  )
}
