import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'

export const metadata: Metadata = {
  title: 'Terms of Service · CityPULSE Civil OS',
  description:
    'The terms that govern use of the CityPULSE Civil Operating System — pilots and subscriptions, acceptable use, service levels, liability, governing law and termination.',
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
export default function TermsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        {/* Hero band */}
        <section style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '72px 28px 48px' }}>
            <div className="code" style={{ marginBottom: 16 }}>Legal · Terms</div>
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
              Terms of Service
            </h1>
            <p className="lede" style={{ fontSize: 17, lineHeight: 1.65, maxWidth: '60ch' }}>
              These terms govern access to and use of the CityPULSE Civil Operating System,
              including pilots and paid subscriptions. By using the platform you agree to them on
              behalf of the organization you represent.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 26,
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
            </div>
          </div>
        </section>

        {/* Body */}
        <article style={{ maxWidth: 760, margin: '0 auto', padding: '8px 28px 96px' }}>
          <P>
            These Terms of Service (the &ldquo;Terms&rdquo;) are a binding agreement between
            CityPULSE (&ldquo;CityPULSE,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) and the
            government body or organization that subscribes to or pilots the platform (the
            &ldquo;Customer,&rdquo; &ldquo;you&rdquo;). Where you have signed a separate master
            services agreement (MSA), order form or pilot agreement with us, that document governs
            and these Terms supplement it; in the event of a conflict, the signed agreement prevails.
          </P>

          {/* Quick nav */}
          <nav
            aria-label="On this page"
            style={{
              border: '1px solid var(--rule)',
              borderRadius: 'var(--r)',
              background: 'var(--surface)',
              padding: '18px 20px',
              margin: '24px 0 8px',
              boxShadow: 'var(--sh-1)',
            }}
          >
            <div className="cap" style={{ marginBottom: 10 }}>On this page</div>
            <ol
              style={{
                margin: 0,
                paddingLeft: 18,
                columns: 2,
                columnGap: 28,
                fontFamily: 'var(--grotesk)',
                fontSize: 13.5,
                lineHeight: 1.9,
                color: 'var(--ink-soft)',
              }}
            >
              {[
                ['#acceptance', 'Acceptance'],
                ['#pilots', 'Pilots'],
                ['#subscriptions', 'Subscriptions & fees'],
                ['#acceptable-use', 'Acceptable use'],
                ['#customer-data', 'Customer data'],
                ['#sla', 'Service levels'],
                ['#ip', 'Intellectual property'],
                ['#warranties', 'Warranties & disclaimers'],
                ['#liability', 'Limitation of liability'],
                ['#indemnity', 'Indemnification'],
                ['#term', 'Term & termination'],
                ['#law', 'Governing law'],
                ['#changes', 'Changes & contact'],
              ].map(([href, label]) => (
                <li key={href} style={{ breakInside: 'avoid' }}>
                  <a href={href} style={{ color: 'var(--blue)' }}>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* 1. Acceptance */}
          <H2 id="acceptance">1. Acceptance of terms</H2>
          <P>
            By accessing the platform, creating an account, or accepting a pilot, you confirm that
            you have authority to bind your organization and that you accept these Terms. If you do
            not agree, do not use the platform. The individuals you authorize as users must also
            comply with these Terms.
          </P>

          {/* 2. Pilots */}
          <H2 id="pilots">2. Pilots and evaluations</H2>
          <P>
            We frequently begin engagements with a focused pilot in a single department or
            jurisdiction. Unless an order form states otherwise:
          </P>
          <ul style={ulStyle}>
            <LI>A pilot runs for the period named in the pilot agreement (typically 60&ndash;120 days).</LI>
            <LI>
              Pilots may include limited data volumes, modules and user seats, and may use
              pre-release or beta features provided &ldquo;as is.&rdquo;
            </LI>
            <LI>
              Either party may end a pilot on written notice. At the end of a pilot we will return or
              delete pilot data in line with the{' '}
              <Link href="/privacy" style={{ color: 'var(--blue)' }}>
                Privacy Policy
              </Link>
              , unless the pilot converts to a subscription.
            </LI>
            <LI>
              Service-level commitments and uptime targets are best-effort during a pilot and become
              contractual on conversion to a paid subscription.
            </LI>
          </ul>

          {/* 3. Subscriptions */}
          <H2 id="subscriptions">3. Subscriptions, fees and renewals</H2>
          <ul style={ulStyle}>
            <LI>
              <strong>Term &amp; renewal.</strong> Subscriptions run for the term stated on the order
              form and renew for successive equal terms unless either party gives notice of
              non-renewal before the renewal date.
            </LI>
            <LI>
              <strong>Fees.</strong> Fees are set out in the order form and are payable per the
              stated schedule. Unless stated otherwise, fees are exclusive of taxes, which you are
              responsible for except for taxes on our income.
            </LI>
            <LI>
              <strong>Scope changes.</strong> Adding modules, regions, data volume or seats may
              change fees; we will agree any change in writing.
            </LI>
            <LI>
              <strong>Public-sector terms.</strong> We can accommodate appropriation-dependent
              funding, purchase-order workflows and standard government procurement clauses where
              agreed in the order form.
            </LI>
          </ul>

          {/* 4. Acceptable use */}
          <H2 id="acceptable-use">4. Acceptable use</H2>
          <P>You agree that you and your users will not:</P>
          <ul style={ulStyle}>
            <LI>Use the platform other than for the legitimate operations of the Customer organization.</LI>
            <LI>
              Upload unlawful content, malware, or data you do not have the right to process; or use
              the platform to infringe the rights of others.
            </LI>
            <LI>
              Attempt to access another tenant&rsquo;s data, defeat security controls, reverse
              engineer the platform, or probe it for vulnerabilities without our written
              authorization (responsible disclosure is welcomed — see the{' '}
              <Link href="/security" style={{ color: 'var(--blue)' }}>
                Security page
              </Link>
              ).
            </LI>
            <LI>
              Resell, sublicense or provide the platform as a service to third parties outside the
              Customer organization without our consent.
            </LI>
            <LI>
              Use AI outputs as the sole basis for legally significant decisions about individuals;
              outputs are decision-support and require accountable human review.
            </LI>
          </ul>
          <P>
            We may suspend access where necessary to protect the platform, comply with law, or
            address a material breach, and will use reasonable efforts to give prior notice.
          </P>

          {/* 5. Customer data */}
          <H2 id="customer-data">5. Customer data and privacy</H2>
          <P>
            As between the parties, you retain all rights to the data you and your residents submit
            (&ldquo;Customer Data&rdquo;). You grant us a limited license to host and process
            Customer Data solely to provide and secure the service. Our handling of personal data is
            governed by the{' '}
            <Link href="/privacy" style={{ color: 'var(--blue)' }}>
              Privacy Policy
            </Link>{' '}
            and the Data Processing Agreement, under which we act as your processor. You are
            responsible for having a lawful basis for the data you provide and for the accuracy of
            that data.
          </P>

          {/* 6. SLA */}
          <H2 id="sla">6. Service levels</H2>
          <P>
            For paid subscriptions we target <strong>99.9% monthly uptime</strong> for the
            production platform, excluding scheduled maintenance and events outside our reasonable
            control. Incident response follows tiered targets (for example, a one-hour response
            target for critical P0 incidents). The full Service Level Agreement — including the
            uptime definition, exclusions, support channels and any service credits — is provided in
            the order form or a referenced SLA exhibit, and is summarized on the{' '}
            <Link href="/security" style={{ color: 'var(--blue)' }}>
              Security page
            </Link>
            . The signed SLA controls.
          </P>

          {/* 7. IP */}
          <H2 id="ip">7. Intellectual property</H2>
          <P>
            CityPULSE and its licensors own all rights in the platform, including its software,
            models, design and documentation. Subject to these Terms, we grant you a non-exclusive,
            non-transferable right to access and use the platform during your subscription. No rights
            are granted except as expressly stated. If you provide feedback, you grant us a perpetual
            license to use it to improve the platform, without obligation to you.
          </P>

          {/* 8. Warranties */}
          <H2 id="warranties">8. Warranties and disclaimers</H2>
          <P>
            We warrant that we will provide the service with reasonable skill and care and in
            material conformance with our documentation. <strong>Except as expressly stated, the
            platform is provided &ldquo;as is.&rdquo;</strong> We do not warrant that the service
            will be uninterrupted or error-free, or that AI-generated predictions, risk scores or
            recommendations will be accurate or complete. Such outputs are probabilistic
            decision-support and must be validated by qualified personnel before action is taken.
          </P>

          {/* 9. Liability */}
          <H2 id="liability">9. Limitation of liability</H2>
          <P>
            To the maximum extent permitted by law, neither party will be liable for indirect,
            incidental, special, consequential or punitive damages, or for lost profits, revenue or
            data, arising out of or relating to these Terms. Except for liability that cannot be
            excluded by law (such as for death or personal injury caused by negligence, or for a
            party&rsquo;s willful misconduct), each party&rsquo;s total aggregate liability is limited
            to the fees paid or payable by the Customer in the twelve months preceding the event
            giving rise to the claim. Nothing in this section limits your payment obligations.
          </P>

          {/* 10. Indemnity */}
          <H2 id="indemnity">10. Indemnification</H2>
          <P>
            Subject to applicable law and any limits in a signed agreement, we will defend you
            against third-party claims that the platform, as provided by us and used in accordance
            with these Terms, infringes that third party&rsquo;s intellectual-property rights, and
            will pay resulting costs finally awarded. You will defend us against claims arising from
            Customer Data or your use of the platform in breach of these Terms. Public-sector
            customers&rsquo; indemnity obligations apply only to the extent permitted by applicable
            law.
          </P>

          {/* 11. Term & termination */}
          <H2 id="term">11. Term and termination</H2>
          <ul style={ulStyle}>
            <LI>These Terms apply for as long as you use the platform or have an active order form.</LI>
            <LI>
              Either party may terminate for material breach that remains uncured 30 days after
              written notice.
            </LI>
            <LI>
              On termination, your right to use the platform ends, and we will make Customer Data
              available for export and then delete or return it in accordance with the Privacy
              Policy and the agreement (typically within 30&ndash;90 days).
            </LI>
            <LI>
              Sections that by their nature should survive — including data rights, confidentiality,
              IP, disclaimers, liability limits and governing law — survive termination.
            </LI>
          </ul>

          {/* 12. Governing law */}
          <H2 id="law">12. Governing law</H2>
          <P>
            These Terms are governed by the laws of the jurisdiction specified in the applicable
            order form{' '}
            <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-faint)' }}>
              [governing law / venue placeholder]
            </span>
            , without regard to conflict-of-laws rules, and the parties submit to the exclusive
            jurisdiction of the courts in that location. For public-sector customers, governing law
            and venue may be set to the customer&rsquo;s own jurisdiction as required by procurement
            rules.
          </P>

          {/* 13. Changes & contact */}
          <H2 id="changes">13. Changes and contact</H2>
          <P>
            We may update these Terms from time to time. For material changes affecting active
            subscriptions, we will provide notice and, where required, the changes take effect at the
            next renewal. The &ldquo;last updated&rdquo; date above reflects the current version.
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
              marginTop: 8,
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
              CityPULSE — Contracts &amp; Legal
            </div>
            <div>
              Email:{' '}
              <a href="mailto:legal@citypulse.gov" style={{ color: 'var(--blue)' }}>
                legal@citypulse.gov
              </a>
            </div>
            <div>
              General enquiries:{' '}
              <Link href="/contact" style={{ color: 'var(--blue)' }}>
                citypulse.gov/contact
              </Link>
            </div>
          </div>

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
            CityPULSE is a demonstration concept. These Terms are provided as a representative example
            of the contractual framework a production B2G platform would use, and are not a
            substitute for legal advice or a signed agreement.
          </p>
        </article>
      </main>

      <SiteFooter />
    </>
  )
}
