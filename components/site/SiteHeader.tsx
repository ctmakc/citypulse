'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* ============================================================
   CityPULSE — shared promo-site header (canonical "seal" version)
   Sticky, --paper background, 1px --rule bottom border.
   Active-link highlight via usePathname. Mobile burger < 760px.
   ============================================================ */

const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Platform', href: '/platform' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
  { label: 'Security', href: '/security' },
  { label: 'Sign in', href: '/login' },
]

function SealLogo() {
  return (
    <Link
      href="/"
      style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--ink)', flexShrink: 0 }}
      aria-label="CityPULSE home"
    >
      {/* Seal: ink square + building/house icon */}
      <span
        style={{
          width: 34,
          height: 34,
          background: 'var(--ink)',
          borderRadius: 8,
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
        }}
      >
        <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="#fff" strokeWidth={2.1}>
          <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
        </svg>
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
          CityPULSE
        </span>
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 9,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-faint)',
            fontWeight: 500,
            marginTop: 2,
          }}
        >
          Civil Operating System
        </span>
      </span>
    </Link>
  )
}

const ctaStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '9px 18px',
  fontSize: 13,
  fontWeight: 600,
  fontFamily: 'var(--grotesk)',
  background: 'var(--ink)',
  color: '#fff',
  borderRadius: 'var(--r-pill)',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}

export default function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--paper)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      {/* Skip link — first focusable element, jumps past nav to <main> */}
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* Scoped responsive rules for the burger / desktop nav swap */}
      <style>{`
        @media (max-width: 760px) {
          .sh-desktop-nav { display: none !important; }
          .sh-desktop-cta { display: none !important; }
          .sh-burger { display: inline-flex !important; }
        }
        @media (min-width: 761px) {
          .sh-mobile-menu { display: none !important; }
        }
        .sh-link:hover { color: var(--ink) !important; }
      `}</style>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <SealLogo />

        {/* Desktop nav */}
        <nav className="sh-desktop-nav" aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href)
            return (
              <Link
                key={label}
                href={href}
                className="sh-link"
                style={{
                  fontFamily: 'var(--grotesk)',
                  fontSize: 13.5,
                  fontWeight: active ? 600 : 500,
                  color: active ? 'var(--blue)' : 'var(--ink-soft)',
                  padding: '6px 12px',
                  borderRadius: 'var(--r-sm)',
                  textDecoration: 'none',
                  transition: 'color .15s',
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link className="sh-desktop-cta" href="/contact" style={ctaStyle}>
            Request a pilot
          </Link>

          {/* Burger (mobile only) */}
          <button
            className="sh-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
            }}
          >
            <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="var(--ink)" strokeWidth={2}>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {open && (
        <nav
          className="sh-mobile-menu"
          aria-label="Mobile"
          style={{
            borderTop: '1px solid var(--rule)',
            background: 'var(--paper)',
            padding: '12px 24px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href)
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'var(--grotesk)',
                  fontSize: 15,
                  fontWeight: active ? 600 : 500,
                  color: active ? 'var(--blue)' : 'var(--ink-soft)',
                  padding: '10px 4px',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            style={{ ...ctaStyle, marginTop: 8, justifyContent: 'center' }}
          >
            Request a pilot
          </Link>
        </nav>
      )}
    </header>
  )
}
