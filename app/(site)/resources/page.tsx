import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'

export const metadata: Metadata = {
  title: 'Insights · CityPULSE Civil OS',
  description:
    'Field notes on AI for civic infrastructure — predicting water-main failure, funding predictive monitoring with FEMA BRIC grants, and 311 systems that route themselves.',
}

/* Lightweight index of the articles rendered by /resources/[slug].
   Kept in-file so this hub stays self-contained (no shared lib). The full
   article bodies live in resources/[slug]/page.tsx under the same slugs. */
const ARTICLE_INDEX: {
  slug: string
  title: string
  dek: string
  topic: string
  readMins: number
  accent: { color: string; wash: string }
}[] = [
  {
    slug: 'how-ai-predicts-water-main-failure',
    title: 'How AI predicts water-main failure before it happens',
    dek: 'Soil corrosivity, acoustic sensors and failure-probability models turn buried pipe into a forecastable asset — and break-before-it-breaks maintenance.',
    topic: 'Predictive maintenance',
    readMins: 7,
    accent: { color: 'var(--blue)', wash: 'var(--blue-wash)' },
  },
  {
    slug: 'fema-bric-grants-for-smart-infrastructure',
    title: 'FEMA BRIC grants for smart infrastructure',
    dek: 'What BRIC funds, why predictive monitoring qualifies as resilience, and a practical way to assemble a competitive application.',
    topic: 'Funding & grants',
    readMins: 8,
    accent: { color: 'var(--green)', wash: 'var(--green-wash)' },
  },
  {
    slug: '311-that-routes-itself',
    title: '311 that routes itself',
    dek: 'AI classification, duplicate detection and SLA-aware routing that move citizen reports to the right crew without a dispatcher in the middle.',
    topic: 'Citizen services',
    readMins: 7,
    accent: { color: 'var(--amber)', wash: 'var(--amber-wash)' },
  },
]

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function ArticleCard({ a }: { a: (typeof ARTICLE_INDEX)[number] }) {
  return (
    <Link
      href={`/resources/${a.slug}`}
      className="lift"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface)',
        border: '1px solid var(--rule)',
        borderRadius: 'var(--r-lg)',
        boxShadow: 'var(--sh-2)',
        overflow: 'hidden',
        textDecoration: 'none',
        height: '100%',
      }}
    >
      {/* Accent header band */}
      <div
        style={{
          height: 88,
          background: a.accent.wash,
          borderBottom: '1px solid var(--rule)',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0 20px 14px',
        }}
      >
        {/* faint cartographic grid */}
        {[25, 50, 75].map((p) => (
          <span
            key={`v${p}`}
            style={{ position: 'absolute', top: 0, bottom: 0, left: `${p}%`, borderLeft: '1px solid rgba(255,255,255,0.5)' }}
          />
        ))}
        {[50].map((p) => (
          <span
            key={`h${p}`}
            style={{ position: 'absolute', left: 0, right: 0, top: `${p}%`, borderTop: '1px solid rgba(255,255,255,0.5)' }}
          />
        ))}
        <span
          style={{
            position: 'relative',
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: a.accent.color,
          }}
        >
          {a.topic}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h2
          className="serif"
          style={{
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: '-0.015em',
            color: 'var(--ink)',
            lineHeight: 1.25,
            margin: '0 0 10px',
          }}
        >
          {a.title}
        </h2>
        <p
          style={{
            fontFamily: 'var(--grotesk)',
            fontSize: 13.5,
            lineHeight: 1.6,
            color: 'var(--ink-soft)',
            margin: '0 0 18px',
            flex: 1,
          }}
        >
          {a.dek}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--rule-soft)',
            paddingTop: 14,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10.5,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--ink-faint)',
            }}
          >
            {a.readMins} min read
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--grotesk)',
              fontSize: 13,
              fontWeight: 600,
              color: a.accent.color,
            }}
          >
            Read <ArrowRight />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function ResourcesPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        {/* Hero */}
        <section style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ maxWidth: 1140, margin: '0 auto', padding: '80px 28px 56px' }}>
            <div className="code" style={{ marginBottom: 16 }}>Insights</div>
            <h1
              className="serif"
              style={{
                fontSize: 'clamp(34px,5vw,52px)',
                fontWeight: 600,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                color: 'var(--ink)',
                margin: '0 0 18px',
                maxWidth: '20ch',
              }}
            >
              Field notes on AI for civic infrastructure.
            </h1>
            <p className="lede" style={{ fontSize: 17, lineHeight: 1.65, maxWidth: '64ch' }}>
              Practical guidance for the people who keep cities running — public works directors,
              emergency managers, utility engineers and the grants offices that fund them. No hype:
              how the technology actually works, how to pay for it, and how to put it to work.
            </p>
          </div>
        </section>

        {/* Card grid */}
        <section style={{ background: 'var(--paper)' }}>
          <div style={{ maxWidth: 1140, margin: '0 auto', padding: '56px 28px 40px' }}>
            <div className="grid-3" style={{ gap: 22, alignItems: 'stretch' }}>
              {ARTICLE_INDEX.map((a) => (
                <ArticleCard key={a.slug} a={a} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section style={{ background: 'var(--surface-2)', borderTop: '1px solid var(--rule)', padding: '72px 0' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>
            <h2
              className="serif"
              style={{
                fontSize: 'clamp(24px,4vw,34px)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
                margin: '0 0 14px',
              }}
            >
              Want this working in your city?
            </h2>
            <p
              style={{
                fontFamily: 'var(--grotesk)',
                fontSize: 15,
                lineHeight: 1.65,
                color: 'var(--ink-soft)',
                maxWidth: '52ch',
                margin: '0 auto 28px',
              }}
            >
              Start with a focused pilot in one department. We will help you scope it and identify the
              grants that can fund it.
            </p>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '13px 28px',
                fontFamily: 'var(--grotesk)',
                fontSize: 14,
                fontWeight: 600,
                background: 'var(--ink)',
                color: '#fff',
                borderRadius: 'var(--r-pill)',
                textDecoration: 'none',
              }}
            >
              Request a municipal pilot <ArrowRight />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
