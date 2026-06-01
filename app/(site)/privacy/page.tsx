import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'

export const metadata: Metadata = {
  title: 'Privacy Policy · CityPULSE Civil OS',
  description:
    'How CityPULSE collects, uses, stores and protects data on behalf of the public-sector organizations it serves — including resident (311) data, sub-processors, data residency and your rights.',
}

const LAST_UPDATED = 'May 31, 2026'

/* ─── Reusable prose primitives ──────────────────────────────────────────────
   A readable, editorial legal layout: ~760px column, generous line-height,
   serif body where it helps long-form reading, CALM tokens throughout. */

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

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: 'var(--grotesk)',
        fontSize: 15.5,
        fontWeight: 700,
        color: 'var(--ink)',
        margin: '28px 0 8px',
      }}
    >
      {children}
    </h3>
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

/* A small definition-style table used for the sub-processor + retention sections */
function DataTable({
  head,
  rows,
}: {
  head: string[]
  rows: string[][]
}) {
  return (
    <div
      style={{
        border: '1px solid var(--rule)',
        borderRadius: 'var(--r)',
        overflow: 'hidden',
        margin: '8px 0 24px',
        background: 'var(--surface)',
        boxShadow: 'var(--sh-1)',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'var(--grotesk)',
            fontSize: 13,
          }}
        >
          <thead>
            <tr style={{ background: 'var(--surface-3)' }}>
              {head.map((h) => (
                <th
                  key={h}
                  scope="col"
                  style={{
                    textAlign: 'left',
                    padding: '11px 14px',
                    fontSize: 10.5,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-faint)',
                    fontWeight: 700,
                    borderBottom: '1px solid var(--rule)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} style={{ borderTop: ri ? '1px solid var(--rule-soft)' : 'none' }}>
                {r.map((cell, ci) => (
                  <td
                    key={ci}
                    style={{
                      padding: '11px 14px',
                      color: ci === 0 ? 'var(--ink)' : 'var(--ink-soft)',
                      fontWeight: ci === 0 ? 600 : 400,
                      lineHeight: 1.5,
                      verticalAlign: 'top',
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        {/* Hero band */}
        <section style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '72px 28px 48px' }}>
            <div className="code" style={{ marginBottom: 16 }}>Legal · Privacy</div>
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
              Privacy Policy
            </h1>
            <p className="lede" style={{ fontSize: 17, lineHeight: 1.65, maxWidth: '60ch' }}>
              This policy explains how CityPULSE collects, uses, stores and protects information
              when we operate the Civil Operating System on behalf of the governments and
              public-sector organizations that subscribe to it.
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
            CityPULSE (&ldquo;CityPULSE,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) provides a
            business-to-government (B2G) software-as-a-service platform that unifies infrastructure,
            environmental and citizen-reporting data into a single operational system. In almost all
            of our processing, the subscribing government is the <strong>data controller</strong> and
            CityPULSE acts as a <strong>data processor</strong> acting only on that customer&rsquo;s
            documented instructions. Where we determine the purposes and means of processing — for
            example, account administration and platform security — we act as a controller for that
            limited activity.
          </P>
          <P>
            This page is a transparency document for residents, evaluators and procurement teams. It
            does not replace the Data Processing Agreement (DPA) executed with each customer, which
            governs the contractual relationship and prevails in the event of any conflict.
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
                ['#data-collected', 'Data we collect'],
                ['#purpose', 'Purpose of processing'],
                ['#legal-basis', 'Legal basis'],
                ['#residency', 'Data residency'],
                ['#subprocessors', 'Sub-processors'],
                ['#retention', 'Retention'],
                ['#resident-data', 'Resident (311) data'],
                ['#rights', 'Your rights'],
                ['#security', 'Security'],
                ['#contact', 'Contact'],
              ].map(([href, label]) => (
                <li key={href} style={{ breakInside: 'avoid' }}>
                  <a href={href} style={{ color: 'var(--blue)' }}>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* 1. Data collected */}
          <H2 id="data-collected">1. Data we collect</H2>
          <P>
            The categories of data present in the platform depend on which modules a customer
            enables. Broadly, we process the following:
          </P>

          <H3>Operational and infrastructure data</H3>
          <P>
            Sensor telemetry (water flow and pressure, air-quality readings, traffic counts,
            weather and hydrological data), asset inventories and condition records, GIS and
            digital-twin geometry, maintenance work orders, and model outputs such as
            failure-probability scores and risk indices. This data is predominantly about physical
            infrastructure rather than people.
          </P>

          <H3>Account and personnel data</H3>
          <P>
            Names, work email addresses, job titles, role assignments, authentication identifiers
            (including SSO subject identifiers), and audit metadata (timestamps, IP address, user
            agent, and the actions taken) for the city staff, contractors and operators who use the
            platform.
          </P>

          <H3>Resident-reported data (311)</H3>
          <P>
            When a customer enables the Citizen Reports module, the platform ingests service
            requests submitted by members of the public. These may contain a description of an
            issue, a location, optional photos, and — only where the resident provides it — contact
            details such as a name, phone number or email used to follow up on the request. See{' '}
            <a href="#resident-data" style={{ color: 'var(--blue)' }}>
              Resident (311) data
            </a>{' '}
            for how this category is handled with additional care.
          </P>

          <H3>Website and product analytics</H3>
          <P>
            On our public marketing site we collect limited, privacy-respecting usage data (pages
            viewed, approximate region, device type) to understand demand and improve the site. We
            do not sell personal data and we do not use it for cross-site advertising.
          </P>

          {/* 2. Purpose */}
          <H2 id="purpose">2. Purpose of processing</H2>
          <P>We process data only for the following purposes:</P>
          <ul style={ulStyle}>
            <LI>
              <strong>Delivering the service</strong> — operating the digital twin, dashboards,
              alerting, predictive models, capital-planning and grant tooling that the customer has
              subscribed to.
            </LI>
            <LI>
              <strong>Routing and resolving citizen reports</strong> — classifying, de-duplicating,
              prioritizing and routing 311 requests to the responsible department, and tracking them
              against service-level targets.
            </LI>
            <LI>
              <strong>Security, integrity and abuse prevention</strong> — authentication,
              authorization, audit logging, anomaly detection and protecting the platform and its
              tenants.
            </LI>
            <LI>
              <strong>Support and service improvement</strong> — diagnosing issues, maintaining
              reliability, and improving features. Model improvement uses customer data only where
              permitted by the customer&rsquo;s contract, and never to train models that benefit
              other tenants without explicit agreement.
            </LI>
            <LI>
              <strong>Legal and contractual compliance</strong> — meeting our obligations under the
              customer agreement and applicable law.
            </LI>
          </ul>
          <P>
            We do not use resident or operational data for advertising, profiling of individuals
            unrelated to a service request, or any purpose incompatible with the one for which it was
            collected.
          </P>

          {/* 3. Legal basis */}
          <H2 id="legal-basis">3. Legal basis</H2>
          <P>
            Because our customers are public bodies, the lawful basis for most processing rests with
            the customer as controller. Depending on the jurisdiction and module, the typical bases
            are:
          </P>
          <ul style={ulStyle}>
            <LI>
              <strong>Public task / official authority</strong> — the operation of public
              infrastructure and the handling of service requests is part of a government&rsquo;s
              statutory duties (e.g. GDPR Art. 6(1)(e) and equivalent provisions).
            </LI>
            <LI>
              <strong>Legitimate interests</strong> — for platform security, fraud and abuse
              prevention, and account administration, balanced against the rights of data subjects
              (GDPR Art. 6(1)(f)).
            </LI>
            <LI>
              <strong>Contract</strong> — to provide the service to authorized users under the
              customer agreement (GDPR Art. 6(1)(b)).
            </LI>
            <LI>
              <strong>Consent</strong> — where a resident voluntarily provides contact details so the
              city can follow up on their report, or for optional analytics where required by law.
            </LI>
          </ul>
          <P>
            CityPULSE relies on the customer&rsquo;s determination of the appropriate basis for the
            data it controls, and processes that data only under the DPA.
          </P>

          {/* 4. Residency */}
          <H2 id="residency">4. Data residency</H2>
          <P>
            Customer data is stored and processed in the region the customer selects at the start of
            the engagement. We offer US, EU and Canada hosting regions, with additional regions
            available for larger deployments. By default, customer data does not leave its selected
            region.
          </P>
          <P>
            Each tenant&rsquo;s data is logically isolated at the database level and protected by
            row-level security so that no tenant can read another tenant&rsquo;s records.
            Cross-border transfer occurs only where a customer explicitly configures it, and where it
            does, we rely on recognized transfer mechanisms such as Standard Contractual Clauses.
          </P>

          {/* 5. Sub-processors */}
          <H2 id="subprocessors">5. Sub-processors</H2>
          <P>
            We use a small set of vetted infrastructure sub-processors to deliver the service. Each
            is bound by a data-processing agreement, is restricted to the region the customer
            selected, and is permitted to process data only as needed to provide its function. The
            categories are:
          </P>
          <DataTable
            head={['Category', 'Purpose', 'Region scope']}
            rows={[
              ['Cloud infrastructure', 'Compute, storage and managed databases that run the platform', 'Customer-selected region'],
              ['Email & notifications', 'Transactional email, status alerts and report acknowledgements', 'Customer-selected region'],
              ['Error & performance monitoring', 'Diagnosing faults and maintaining reliability', 'Customer-selected region'],
              ['Mapping & geocoding', 'Base maps and address resolution for the digital twin', 'Aggregate / non-identifying'],
            ]}
          />
          <P>
            A current, named list of sub-processors is provided to customers under the DPA and is
            available on request via{' '}
            <a href="/contact" style={{ color: 'var(--blue)' }}>
              our contact page
            </a>
            . We maintain a notification process so customers can object to a material change to the
            sub-processor list before it takes effect.
          </P>

          {/* 6. Retention */}
          <H2 id="retention">6. Retention</H2>
          <P>
            We retain data for as long as needed to provide the service and to meet the
            customer&rsquo;s records-retention obligations, then delete or anonymize it. Customers
            can configure shorter retention periods. Indicative defaults:
          </P>
          <DataTable
            head={['Data type', 'Default retention']}
            rows={[
              ['Sensor & operational telemetry', 'Duration of the subscription (often aggregated over time)'],
              ['Citizen (311) report contact details', 'Until the request is resolved + customer-defined window'],
              ['Audit logs', 'Up to 24 months (configurable for records-management rules)'],
              ['Account data', 'Life of the account; deleted after off-boarding'],
              ['Backups', 'Rolling window, then expired on a fixed schedule'],
            ]}
          />
          <P>
            On termination, we return or delete customer data in accordance with the agreement,
            typically within 30&ndash;90 days, except where law requires longer retention.
          </P>

          {/* 7. Resident data */}
          <H2 id="resident-data">7. Resident (311) data</H2>
          <P>
            Citizen reports deserve special care because they can include personal data submitted by
            members of the public who are not platform users. We apply the following practices to
            this category:
          </P>
          <ul style={ulStyle}>
            <LI>
              <strong>Minimization.</strong> Contact details are optional. A resident can file a
              report anonymously; we only store the contact information they choose to provide.
            </LI>
            <LI>
              <strong>Purpose limitation.</strong> Report data is used to triage, route and resolve
              the request and to measure service quality — not for unrelated profiling.
            </LI>
            <LI>
              <strong>Automated classification with human oversight.</strong> AI is used to
              categorize, detect duplicates and route reports. These are operational aids;
              accountable city staff retain control over outcomes, and the system does not make
              legally significant decisions about individuals on its own.
            </LI>
            <LI>
              <strong>Access controls.</strong> Resident contact details are visible only to the
              staff responsible for the relevant service, and access is logged.
            </LI>
            <LI>
              <strong>Open-data safety.</strong> When a city publishes 311 data as open data,
              CityPULSE supports redaction and aggregation so personal details are not exposed.
            </LI>
          </ul>

          {/* 8. Rights */}
          <H2 id="rights">8. Your rights</H2>
          <P>
            Depending on where you live, you may have rights to access, correct, delete, restrict or
            object to the processing of your personal data, and to data portability. Because the
            subscribing government is the controller of most data, the most direct route is to
            contact that organization. If you submit a request to us, we will route it to the
            relevant customer and assist them in responding.
          </P>
          <P>
            For data where CityPULSE is the controller (such as marketing-site analytics), you can
            exercise your rights directly with us using the contact details below. You also have the
            right to lodge a complaint with your local data-protection authority.
          </P>

          {/* 9. Security */}
          <H2 id="security">9. Security</H2>
          <P>
            We protect data with encryption in transit (TLS 1.3) and at rest (AES-256), multi-tenant
            isolation with row-level security, role-based access control, enforced multi-factor
            authentication for privileged roles, and a tamper-evident audit trail covering every
            action by every user, API caller and AI agent. For a full description of our controls,
            certifications and incident-response commitments, see the{' '}
            <Link href="/security" style={{ color: 'var(--blue)' }}>
              Security page
            </Link>
            .
          </P>

          {/* 10. Contact */}
          <H2 id="contact">10. Contact</H2>
          <P>
            For privacy questions, sub-processor lists, or to exercise your rights, contact our
            privacy team:
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
              CityPULSE — Privacy &amp; Data Protection
            </div>
            <div>
              Email:{' '}
              <a href="mailto:privacy@citypulse.gov" style={{ color: 'var(--blue)' }}>
                privacy@citypulse.gov
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
            CityPULSE is a demonstration concept. This policy is provided as a representative example
            of the privacy commitments a production B2G platform would publish, and may be updated as
            the product evolves. When we make material changes we will revise the &ldquo;last
            updated&rdquo; date above and, where appropriate, notify customers.
          </p>
        </article>
      </main>

      <SiteFooter />
    </>
  )
}
