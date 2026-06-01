import { NextResponse } from 'next/server'

/* ============================================================
   CityPULSE — lead capture route
   POST /api/lead
   ------------------------------------------------------------
   Accepts a JSON lead: { type: 'pilot' | 'demo' | '311', ...fields }.
   - Validates minimally (must be an object with a known `type`).
   - If LEAD_WEBHOOK_URL is set, forwards the lead there with a
     short timeout; webhook failures are swallowed (never block
     or fail the user's submit).
   - Always logs and returns { ok: true, id }.
   - Never returns 500 on a normal submit.

   GET /api/lead → { ok: true }  (health check)
   ============================================================ */

export const runtime = 'nodejs'
// Always handled at request time (uses crypto + optional outbound fetch).
export const dynamic = 'force-dynamic'

type LeadType = 'pilot' | 'demo' | '311'
const KNOWN_TYPES: LeadType[] = ['pilot', 'demo', '311']

const WEBHOOK_TIMEOUT_MS = 2500

async function forwardToWebhook(payload: Record<string, unknown>): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL
  if (!url) return

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
  } catch {
    // Swallow: a flaky/unreachable webhook must never break lead capture.
  } finally {
    clearTimeout(timer)
  }
}

export async function POST(request: Request) {
  // A deterministic-per-request id (server-side, not render).
  const id = crypto.randomUUID()

  let body: Record<string, unknown> = {}
  try {
    const parsed = await request.json()
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      body = parsed as Record<string, unknown>
    }
  } catch {
    // Malformed/empty body — still 200 so a normal submit never 500s.
    return NextResponse.json({ ok: true, id, note: 'empty_or_invalid_body' })
  }

  const rawType = typeof body.type === 'string' ? body.type : 'demo'
  const type: LeadType = (KNOWN_TYPES as string[]).includes(rawType)
    ? (rawType as LeadType)
    : 'demo'

  const lead = {
    ...body,
    // Normalized/server-owned fields take precedence over anything in the body.
    id,
    type,
    receivedAt: new Date().toISOString(),
    source: 'citypulse-web',
  }

  // Structured server log (shows up in Vercel function logs).
  console.log('[lead]', JSON.stringify({ id, type, hasWebhook: !!process.env.LEAD_WEBHOOK_URL }))

  await forwardToWebhook(lead)

  return NextResponse.json({ ok: true, id })
}

export async function GET() {
  return NextResponse.json({ ok: true })
}
