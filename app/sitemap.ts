import type { MetadataRoute } from 'next'

const BASE = 'https://citypulse-beta.vercel.app'

/* ============================================================
   CityPULSE — sitemap
   Lists only PUBLIC (marketing + public-tool) routes. The
   authenticated portal app (/overview, /digital-twin, /assets,
   /tasks, …) is intentionally excluded and also blocked in
   robots.ts.
   ============================================================ */

type Entry = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}

const ROUTES: Entry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/platform', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/solutions', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/security', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/impact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/resources', priority: 0.7, changeFrequency: 'weekly' },
  // Resource articles
  { path: '/resources/digital-twin-guide', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/resources/grant-funding-playbook', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/resources/311-modernization', priority: 0.6, changeFrequency: 'monthly' },
  // Conversion
  { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/report', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/login', priority: 0.3, changeFrequency: 'yearly' },
  // Legal
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/accessibility', priority: 0.3, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
