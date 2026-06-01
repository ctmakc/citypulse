import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'

export const metadata: Metadata = {
  title: 'Accessibility Statement · CityPULSE Civil OS',
  description:
    'CityPULSE conforms to WCAG 2.1 Level AA. How we design and test for accessibility, known limitations, and how to give feedback or request an accommodation.',
}

const LAST_UPDATED = 'May 31, 2026'

/* ─── Reusable prose primitives (shared CALM legal layout) ───────────────── */

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="serif"
      style={{
        fontSize: 'clamp(20px,2.6vw,26px)',
        fontWeight: 600,
        letterSpacing: '-0.02em',
        color: 'var(--ink)',
        lineHeight: 1.2,
        margin: '52px 0 14px',
        scrollMarginTop: 88,
      }}
    >
      {children}
    </h2>
  )
}

const pStyle: React.CSSProperties = {
  fontFamily: 'var(--serif)',
  fontSize: 16,
  lineHeight: 1.75,
  color: 'var(--ink-soft)',
  margin: '0 0 16px',
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={pStyle}>{children}</p>
}

const ulStyle: React.CSSProperties = {
  margin: '0 0 16px',
  paddingLeft: 22,
  fontFamily: 'var(--serif)',
  fontSize: 16,
  lineHeight: 1.7,
  color: 'var(--ink-soft)',
}

function LI({ children }: { children: React.ReactNode }) {
  return <li style={{ marginBottom: 8 }}>{children}</li>
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function AccessibilityPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        {/* Hero band */}
        <section style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '72px 28px 48px' }}>
            <div className="code" style={{ marginBottom: 16 }}>Legal · Accessibility</div>
            <h1
              className="serif"
              style={{
                fontSize: 'clamp(32px,5vw,48px)',
                fontWeight: 600,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                color: 'var(--ink)',
                margin: '0 0 18px',
              }}
            >
              Accessibility Statement
            </h1>
            <p className="lede" style={{ fontSize: 17, lineHeight: 1.65, maxWidth: '60ch' }}>
              Public services must work for everyone. CityPULSE is built to conform with the Web
              Content Accessibility Guidelines (WCAG) 2.1 at Level AA, and we treat accessibility as
              a procurement-grade requirement, not an afterthought.
            </p>

            {/* Conformance badge + date */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 26 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  background: 'var(--green-wash)',
                  color: 'var(--green)',
                  border: '1px solid var(--rule)',
                  borderRadius: 'var(--r-pill)',
                  fontFamily: 'var(--grotesk)',
                  fontSize: 12.5,
                  fontWeight: 700,
                }}
              >
                <svg viewBox="0 0 16 16" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path d="M3 8l3 3 7-6" />
                </svg>
                WCAG 2.1 Level AA
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  background: 'var(--surface)',
                  border: '1px solid var(--rule)',
                  borderRadius: 'var(--r-pill)',
                  boxShadow: 'var(--sh-1)',
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: 'var(--ink-faint)',
                  letterSpacing: '0.04em',
                }}
              >
                Last updated: {LAST_UPDATED}
              </span>
            </div>
          </div>
        </section>

        {/* Body */}
        <article style={{ maxWidth: 760, margin: '0 auto', padding: '8px 28px 96px' }}>
          {/* Conformance */}
          <H2 id="conformance">Conformance status</H2>
          <P>
            The CityPULSE marketing site and the operator platform are designed and tested to
            conform with <strong>WCAG 2.1 Level AA</strong>. &ldquo;Conformant&rdquo; means the
            content meets the success criteria at that level. Accessibility is an ongoing practice:
            as we ship features we continue to audit them against the same standard.
          </P>

          {/* Measures */}
          <H2 id="measures">How accessibility is built in</H2>
          <P>Accessibility is addressed in the product itself, not bolted on. Concrete measures include:</P>
          <ul style={ulStyle}>
            <LI>
              <strong>Visible focus.</strong> Every interactive control shows a clear, high-contrast
              focus ring for keyboard users (a 2px outline plus a halo), while mouse clicks keep a
              clean UI.
            </LI>
            <LI>
              <strong>Skip-to-content link.</strong> The first focusable element on every page lets
              keyboard and screen-reader users jump past the navigation straight to the main content.
            </LI>
            <LI>
              <strong>Semantic landmarks.</strong> Pages use proper <code>&lt;header&gt;</code>,{' '}
              <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code> and <code>&lt;footer&gt;</code>{' '}
              regions and a logical heading order so assistive technology can navigate by structure.
            </LI>
            <LI>
              <strong>Color contrast.</strong> Text and meaningful UI colors are tuned to meet the
              4.5:1 (and 3:1 for large text) contrast ratios. We deliberately darkened our muted ink
              tone so secondary text passes AA on every surface.
            </LI>
            <LI>
              <strong>Respect for motion preferences.</strong> When a visitor enables
              &ldquo;reduce motion&rdquo; in their OS, we disable shimmer, pulse and entrance
              animations site-wide.
            </LI>
            <LI>
              <strong>Labels and names.</strong> Buttons, links and form controls have accessible
              names; the menu toggle exposes its expanded/collapsed state via{' '}
              <code>aria-expanded</code>.
            </LI>
            <LI>
              <strong>Responsive and zoom-friendly.</strong> Layouts reflow to a single column on
              small screens and remain usable at high zoom without loss of content.
            </LI>
          </ul>

          {/* Testing */}
          <H2 id="testing">How we test</H2>
          <P>We combine automated and manual testing, because each catches different issues:</P>
          <ul style={ulStyle}>
            <LI>
              <strong>Automated audits with axe.</strong> We run <code>@axe-core/playwright</code> in
              our end-to-end test suite so accessibility violations are caught in continuous
              integration on key pages before they ship.
            </LI>
            <LI>
              <strong>Keyboard-only testing.</strong> We navigate the entire experience using only
              the keyboard — tabbing through controls, operating menus, and confirming focus order
              and visible focus.
            </LI>
            <LI>
              <strong>Screen-reader testing.</strong> We verify key flows with screen readers
              (such as VoiceOver and NVDA) to confirm names, roles, states and reading order make
              sense.
            </LI>
            <LI>
              <strong>Contrast and zoom checks.</strong> We verify color contrast against WCAG
              ratios and test the UI at 200% zoom and at narrow viewport widths.
            </LI>
          </ul>

          {/* Compatibility */}
          <H2 id="compatibility">Compatibility</H2>
          <P>
            CityPULSE is built to work with current versions of major browsers (Chrome, Edge,
            Firefox and Safari) and with the assistive technologies commonly paired with them. We
            do not support browsers that are no longer maintained by their vendors.
          </P>

          {/* Known limitations */}
          <H2 id="limitations">Known limitations</H2>
          <P>
            We are candid about where work remains. Despite our efforts, some content may not yet be
            fully accessible:
          </P>
          <ul style={ulStyle}>
            <LI>
              <strong>Interactive maps.</strong> The digital-twin and geospatial map views are
              inherently visual. We provide accessible data tables and text summaries as
              alternatives, and continue to improve keyboard interaction within the map itself.
            </LI>
            <LI>
              <strong>Complex data visualizations.</strong> Some charts convey dense information
              visually; we pair them with accessible underlying data, and are extending text
              descriptions across all visualizations.
            </LI>
            <LI>
              <strong>Customer-supplied content.</strong> Documents and media uploaded by a customer
              (for example, attachments on a citizen report) are outside our control; we provide
              tooling to help customers keep their own content accessible.
            </LI>
          </ul>
          <P>
            If you encounter a barrier that is not listed here, please tell us — your report helps us
            prioritize fixes.
          </P>

          {/* Feedback */}
          <H2 id="feedback">Feedback and accommodations</H2>
          <P>
            We welcome your feedback on the accessibility of CityPULSE. If you need information in an
            alternative format, or you run into an accessibility barrier, contact us and we will work
            with you to provide the information or a suitable accommodation. We aim to acknowledge
            accessibility feedback within five business days.
          </P>
          <div
            style={{
              border: '1px solid var(--rule)',
              borderRadius: 'var(--r)',
              background: 'var(--surface)',
              padding: '20px 22px',
              boxShadow: 'var(--sh-1)',
              fontFamily: 'var(--grotesk)',
              fontSize: 14.5,
              lineHeight: 1.7,
              color: 'var(--ink-soft)',
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
              CityPULSE — Accessibility
            </div>
            <div>
              Email:{' '}
              <a href="mailto:accessibility@citypulse.gov" style={{ color: 'var(--blue)' }}>
                accessibility@citypulse.gov
              </a>
            </div>
            <div>
              Or use our{' '}
              <Link href="/contact" style={{ color: 'var(--blue)' }}>
                contact page
              </Link>{' '}
              and mark your message &ldquo;Accessibility.&rdquo;
            </div>
          </div>

          {/* Assessment approach */}
          <H2 id="assessment">Assessment approach</H2>
          <P>
            This statement reflects our own evaluation against WCAG 2.1 Level AA, combining automated
            tooling, manual expert review and assistive-technology testing as described above. For
            formal procurement, we can provide a current accessibility conformance report (such as a
            VPAT) on request via the contact above.
          </P>

          <p
            style={{
              fontFamily: 'var(--grotesk)',
              fontSize: 12.5,
              color: 'var(--ink-faint)',
              lineHeight: 1.6,
              marginTop: 40,
              paddingTop: 20,
              borderTop: '1px solid var(--rule)',
            }}
          >
            CityPULSE is a demonstration concept. This statement describes the accessibility
            practices applied to this build and the standard a production deployment is held to. We
            review it as the product changes and update the &ldquo;last updated&rdquo; date above.
          </p>
        </article>
      </main>

      <SiteFooter />
    </>
  )
}
