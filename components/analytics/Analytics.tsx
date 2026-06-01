'use client'

/* ============================================================
   CityPULSE — GA4 analytics + lightweight cookie consent
   ------------------------------------------------------------
   - GA4 (G-H6B139TQTT) is loaded via next/script (afterInteractive)
     ONLY after the visitor clicks "Accept" on the consent banner.
   - The choice ("granted" | "denied") is persisted in localStorage
     under CONSENT_KEY, so the banner shows once.
   - Declining stores "denied" and never injects gtag.
   - track(event, params) is a tiny safe wrapper over window.gtag;
     it no-ops until consent is granted + gtag is present.
   ============================================================ */

import { useEffect, useState, useCallback } from 'react'
import Script from 'next/script'

export const GA_MEASUREMENT_ID = 'G-H6B139TQTT'
const CONSENT_KEY = 'citypulse_analytics_consent'

type Consent = 'granted' | 'denied' | null

/* ------------------------------------------------------------------
   track(event, params)
   Safe, SSR-proof event helper. Importable anywhere:
       import { track } from '@/components/analytics/Analytics'
       track('generate_lead', { lead_type: 'pilot' })
   No-ops on the server, before consent, or if gtag hasn't loaded.
------------------------------------------------------------------- */
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  if (typeof w.gtag !== 'function') return
  try {
    w.gtag('event', event, params)
  } catch {
    /* never let analytics throw into the app */
  }
}

/* Read the stored consent choice (client-only). */
function readConsent(): Consent {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

export default function Analytics() {
  // Tri-state: undefined = not yet read from storage (initial render, avoids
  // SSR/CSR flash); null = read, no choice made yet (show banner);
  // 'granted'/'denied' = the visitor's persisted choice.
  const [consent, setConsent] = useState<Consent | undefined>(undefined)

  useEffect(() => {
    setConsent(readConsent())
  }, [])

  const choose = useCallback((choice: 'granted' | 'denied') => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice)
    } catch {
      /* ignore storage failures (private mode etc.) */
    }
    setConsent(choice)
  }, [])

  const showBanner = consent === null // read, but undecided
  const loadGa = consent === 'granted'

  return (
    <>
      {/* GA4 — only mounted once consent is granted. afterInteractive keeps it
          off the critical path. The two scripts are split so the inline init
          runs after the gtag library is requested. */}
      {loadGa && (
        <>
          <Script
            id="ga4-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('consent', 'default', { analytics_storage: 'granted' });
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {showBanner && <ConsentBanner onAccept={() => choose('granted')} onDecline={() => choose('denied')} />}
    </>
  )
}

/* ---------------------------------------------------------------- */
/* Cookie-consent banner — fixed, bottom, unobtrusive               */
/* ---------------------------------------------------------------- */
function ConsentBanner({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 9999,
        margin: '0 auto',
        maxWidth: 720,
        background: 'var(--ink, #1C2127)',
        color: '#fff',
        borderRadius: 14,
        boxShadow: '0 12px 40px rgba(0,0,0,0.28)',
        padding: '18px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 16,
        fontFamily: 'var(--grotesk, sans-serif)',
      }}
    >
      <p style={{ flex: '1 1 320px', margin: 0, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.82)' }}>
        We use privacy-respecting analytics (Google Analytics 4) to understand how CityPULSE is used.
        No data is collected until you accept. See our{' '}
        <a href="/privacy" style={{ color: '#fff', textDecoration: 'underline' }}>privacy notice</a>.
      </p>
      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <button
          type="button"
          onClick={onDecline}
          style={{
            padding: '9px 16px',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'inherit',
            background: 'transparent',
            color: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(255,255,255,0.28)',
            borderRadius: 999,
            cursor: 'pointer',
          }}
        >
          Decline
        </button>
        <button
          type="button"
          onClick={onAccept}
          style={{
            padding: '9px 18px',
            fontSize: 13,
            fontWeight: 700,
            fontFamily: 'inherit',
            background: '#fff',
            color: '#1C2127',
            border: 'none',
            borderRadius: 999,
            cursor: 'pointer',
          }}
        >
          Accept
        </button>
      </div>
    </div>
  )
}
