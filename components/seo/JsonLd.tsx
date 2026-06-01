/* ============================================================
   CityPULSE — JSON-LD structured data (schema.org)
   ------------------------------------------------------------
   Server components. Each renders a <script type="application/ld+json">.
   We use dangerouslySetInnerHTML with JSON.stringify (the canonical,
   XSS-safe way to embed JSON-LD in React).

   Exports:
     <OrganizationJsonLd/>        — site-wide org identity
     <SoftwareApplicationJsonLd/> — the product
     <FaqJsonLd items={...}/>     — FAQPage helper (per-page use)
   ============================================================ */

const SITE_URL = 'https://citypulse-beta.vercel.app'

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is XSS-safe for JSON-LD; React won't escape inside a script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CityPULSE',
        alternateName: 'CityPULSE Civil Operating System',
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        description:
          'CityPULSE is an AI-powered civil operating system for resilient cities — unifying infrastructure intelligence, a live digital twin, climate and environmental risk, and citizen 311 in one platform.',
        slogan: 'The civil operating system for resilient cities.',
        sameAs: [],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'pilots@citypulse.city',
          url: `${SITE_URL}/contact`,
          availableLanguage: ['English'],
        },
      }}
    />
  )
}

export function SoftwareApplicationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CityPULSE',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Smart City / Civic Infrastructure Platform',
        operatingSystem: 'Web',
        url: SITE_URL,
        description:
          'An AI-native operating system for municipal governments: a live digital twin of city assets, infrastructure condition monitoring, traffic, air and water quality, wildfire and flood risk, AI operations agents, capital planning and grant management, and a public 311 reporting channel.',
        featureList: [
          'Digital twin',
          'Infrastructure asset intelligence',
          'Traffic & mobility',
          'Air & water quality',
          'Wildfire & flood risk',
          'Citizen 311 reporting',
          'AI operations agents',
          'Capital planning & grants',
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: '30-day municipal pilot — no procurement required.',
        },
        provider: {
          '@type': 'Organization',
          name: 'CityPULSE',
          url: SITE_URL,
        },
      }}
    />
  )
}

export type FaqItem = { question: string; answer: string }

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  if (!items?.length) return null
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((it) => ({
          '@type': 'Question',
          name: it.question,
          acceptedAnswer: { '@type': 'Answer', text: it.answer },
        })),
      }}
    />
  )
}
