import type { MetadataRoute } from 'next'

const BASE = 'https://citypulse-beta.vercel.app'

/* ============================================================
   CityPULSE — robots
   Allow crawling of the public marketing site + public tools,
   but keep the authenticated portal app out of the index.
   The portal lives under app/(portal) — a route group, so the
   URLs are top-level (/overview, /digital-twin, …). We disallow
   each portal segment explicitly.
   ============================================================ */

const PORTAL_PATHS = [
  '/overview',
  '/digital-twin',
  '/assets',
  '/tasks',
  '/reports',
  '/citizen-reports',
  '/air-quality',
  '/water',
  '/traffic',
  '/wildfire',
  '/flood-risk',
  '/emergency',
  '/capital-grants',
  '/ai-agents',
  '/data-sources',
  '/settings',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PORTAL_PATHS,
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
