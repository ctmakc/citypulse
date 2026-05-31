'use client'
import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'

/* ---------- Small reusable styled field wrappers ---------- */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display: 'block',
      marginBottom: 6,
      fontSize: 10.5,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--ink-soft)',
    }}>
      {children}
    </label>
  )
}

const inputBase: React.CSSProperties = {
  width: '100%',
  height: 42,
  padding: '0 14px',
  border: '1px solid var(--rule)',
  borderRadius: 'var(--r-sm)',
  fontSize: 13.5,
  fontFamily: 'var(--grotesk)',
  background: 'var(--surface)',
  color: 'var(--ink)',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color .15s, box-shadow .15s',
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <FieldLabel>
        {label}
        {required && <span style={{ color: 'var(--red)', marginLeft: 3 }}>*</span>}
      </FieldLabel>
      {children}
    </div>
  )
}

/* ---------- Checkbox item ---------- */
function CheckItem({
  id,
  label,
  checked,
  onChange,
}: {
  id: string
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label htmlFor={id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13.5, color: 'var(--ink)', userSelect: 'none' }}>
      <span style={{
        width: 18, height: 18, borderRadius: 5, flexShrink: 0,
        border: checked ? '2px solid var(--blue)' : '1.5px solid var(--rule)',
        background: checked ? 'var(--blue)' : 'var(--surface)',
        display: 'grid', placeItems: 'center',
        transition: 'background .15s, border-color .15s',
      }}>
        {checked && (
          <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="#fff" strokeWidth="2.2">
            <path d="M2 6l3 3 5-5" />
          </svg>
        )}
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      />
      {label}
    </label>
  )
}

/* ---------- Main page ---------- */
const CHALLENGES = [
  'Infrastructure monitoring',
  'Traffic & mobility',
  'Air & water quality',
  'Wildfire risk',
  'Flood management',
  'Citizen 311 reports',
  'Capital planning',
  'Grant management',
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [challenges, setChallenges] = useState<Record<string, boolean>>({})

  const toggleChallenge = (c: string, v: boolean) =>
    setChallenges(prev => ({ ...prev, [c]: v }))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  /* focus helpers — we handle via inline onFocus/onBlur on each input */
  function onFocusEl(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = 'var(--blue)'
    e.currentTarget.style.boxShadow = '0 0 0 3px var(--blue-wash)'
  }
  function onBlurEl(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = 'var(--rule)'
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <div style={{ fontFamily: 'var(--grotesk)', minHeight: '100vh', background: 'var(--paper)', overflow: 'auto' }}>
      <SiteHeader />

      {/* ---- Page hero strip ---- */}
      <div style={{ background: 'var(--ink)', padding: '56px 28px 52px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: 14 }}>
            Request a pilot
          </div>
          <h1 className="serif" style={{ fontSize: 36, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15, margin: 0 }}>
            Start with one department or hazard.
          </h1>
          <p style={{ marginTop: 14, fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.65, maxWidth: 520, margin: '14px 0 0' }}>
            Tell us about your city or agency and what you're trying to solve. We'll follow up to scope a focused pilot — and flag the grant programs that could fund it.
          </p>
        </div>
      </div>

      {/* ---- 2-col body ---- */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 28px 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '55fr 45fr',
          gap: 48,
          alignItems: 'start',
        }}>

          {/* ============ LEFT: FORM ============ */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--rule)',
            borderRadius: 'var(--r-lg)',
            boxShadow: 'var(--sh-2)',
            padding: '36px 36px 40px',
          }}>
            {!submitted ? (
              <>
                <h2 className="serif" style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
                  Request a municipal pilot
                </h2>
                <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.6, margin: '0 0 32px' }}>
                  Tell us about your city. We'll reach out within 1 business day.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                  {/* Row 1: First + Last name */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Field label="First name" required>
                      <input
                        type="text" required placeholder="Jordan"
                        style={inputBase}
                        onFocus={onFocusEl} onBlur={onBlurEl}
                      />
                    </Field>
                    <Field label="Last name" required>
                      <input
                        type="text" required placeholder="Rivera"
                        style={inputBase}
                        onFocus={onFocusEl} onBlur={onBlurEl}
                      />
                    </Field>
                  </div>

                  {/* Email */}
                  <Field label="Email address" required>
                    <input
                      type="email" required placeholder="jrivera@meridian.gov"
                      style={inputBase}
                      onFocus={onFocusEl} onBlur={onBlurEl}
                    />
                  </Field>

                  {/* Phone */}
                  <Field label="Phone number">
                    <input
                      type="tel" placeholder="+1 (555) 000-0000"
                      style={inputBase}
                      onFocus={onFocusEl} onBlur={onBlurEl}
                    />
                  </Field>

                  {/* Organization */}
                  <Field label="Organization / City name" required>
                    <input
                      type="text" required placeholder="City of Meridian"
                      style={inputBase}
                      onFocus={onFocusEl} onBlur={onBlurEl}
                    />
                  </Field>

                  {/* Your role */}
                  <Field label="Your role">
                    <select
                      style={{ ...inputBase, cursor: 'pointer', appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23939AA1' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 36 }}
                      onFocus={onFocusEl} onBlur={onBlurEl}
                    >
                      <option value="">Select your role…</option>
                      <option>Mayor/Council</option>
                      <option>City Manager</option>
                      <option>Public Works Director</option>
                      <option>Emergency Management</option>
                      <option>Environment</option>
                      <option>Transportation</option>
                      <option>Utilities</option>
                      <option>Grants Office</option>
                      <option>IT/CTO</option>
                      <option>Other</option>
                    </select>
                  </Field>

                  {/* City/region type */}
                  <Field label="City / region type">
                    <select
                      style={{ ...inputBase, cursor: 'pointer', appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23939AA1' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 36 }}
                      onFocus={onFocusEl} onBlur={onBlurEl}
                    >
                      <option value="">Select type…</option>
                      <option>City</option>
                      <option>County/District</option>
                      <option>Province/State</option>
                      <option>Regional government</option>
                      <option>Utility</option>
                      <option>Airport</option>
                      <option>University</option>
                      <option>Other</option>
                    </select>
                  </Field>

                  {/* Population */}
                  <Field label="Population">
                    <select
                      style={{ ...inputBase, cursor: 'pointer', appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23939AA1' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 36 }}
                      onFocus={onFocusEl} onBlur={onBlurEl}
                    >
                      <option value="">Select population…</option>
                      <option>{'< 10,000'}</option>
                      <option>10K–50K</option>
                      <option>50K–250K</option>
                      <option>250K–1M</option>
                      <option>1M+</option>
                    </select>
                  </Field>

                  {/* Challenges checkboxes */}
                  <div>
                    <FieldLabel>Which challenges interest you most?</FieldLabel>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px', marginTop: 4 }}>
                      {CHALLENGES.map(c => (
                        <CheckItem
                          key={c}
                          id={`ch-${c.replace(/\s/g, '-').toLowerCase()}`}
                          label={c}
                          checked={!!challenges[c]}
                          onChange={v => toggleChallenge(c, v)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Tell us more */}
                  <Field label="Tell us more (optional)">
                    <textarea
                      rows={4}
                      placeholder="e.g. We need to prioritize aging water mains and assemble a grant application before the summer deadline."
                      style={{
                        ...inputBase,
                        height: 'auto',
                        padding: '12px 14px',
                        resize: 'vertical',
                        lineHeight: 1.6,
                      } as React.CSSProperties}
                      onFocus={onFocusEl} onBlur={onBlurEl}
                    />
                  </Field>

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      height: 48,
                      background: 'var(--ink)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 'var(--r-pill)',
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: 'var(--grotesk)',
                      cursor: 'pointer',
                      letterSpacing: '-0.01em',
                      transition: 'background .15s, transform .05s',
                      marginTop: 4,
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = '#1f242a')}
                    onMouseOut={e => (e.currentTarget.style.background = 'var(--ink)')}
                    onMouseDown={e => (e.currentTarget.style.transform = 'translateY(1px)')}
                    onMouseUp={e => (e.currentTarget.style.transform = 'none')}
                  >
                    Request a pilot
                  </button>

                  <p style={{ fontSize: 12, color: 'var(--ink-faint)', margin: 0, lineHeight: 1.6, textAlign: 'center' }}>
                    By submitting, you agree to be contacted about CityPULSE. We never share your information.
                  </p>
                </form>
              </>
            ) : (
              /* ---- Thank-you state ---- */
              <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: 'var(--green)', display: 'grid', placeItems: 'center',
                  margin: '0 auto 20px',
                }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#fff" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="serif" style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 10px' }}>
                  Request received
                </h2>
                <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.65, maxWidth: 360, margin: '0 auto 28px' }}>
                  We'll be in touch within 1 business day.
                </p>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'var(--green-wash)', border: '1px solid var(--green)',
                  borderRadius: 'var(--r)', padding: '14px 22px',
                }}>
                  <span style={{ fontSize: 13.5, color: 'var(--green)', fontWeight: 500 }}>
                    Our team will review your city profile and reach out to schedule a discovery call.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ============ RIGHT: INFO PANEL ============ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 80 }}>

            {/* What to expect */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--r-lg)',
              boxShadow: 'var(--sh-2)',
              padding: '28px 28px 32px',
            }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em', margin: '0 0 6px' }}>
                What to expect after you request a pilot:
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 24 }}>
                {[
                  {
                    n: '1',
                    title: 'Our team reviews your city profile',
                    detail: '1 business day',
                  },
                  {
                    n: '2',
                    title: 'We schedule a 30-min discovery call',
                    detail: 'Scoped to your priorities',
                  },
                  {
                    n: '3',
                    title: 'We configure a demo with your city\'s data',
                    detail: 'Representative regional data',
                  },
                  {
                    n: '4',
                    title: '30-day pilot agreement',
                    detail: 'No procurement required',
                  },
                ].map((step, i, arr) => (
                  <div key={step.n} style={{ display: 'flex', gap: 16, paddingBottom: i < arr.length - 1 ? 20 : 0 }}>
                    {/* Step number + connector */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: 'var(--blue)', color: '#fff',
                        display: 'grid', placeItems: 'center',
                        fontSize: 12, fontWeight: 700, flexShrink: 0,
                      }}>
                        {step.n}
                      </div>
                      {i < arr.length - 1 && (
                        <div style={{ width: 2, flex: 1, background: 'var(--rule-soft)', marginTop: 6 }} />
                      )}
                    </div>
                    {/* Content */}
                    <div style={{ paddingTop: 4 }}>
                      <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.35 }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: 12.5, color: 'var(--ink-faint)', marginTop: 3 }}>
                        {step.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Already have an account */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--r)',
              padding: '20px 24px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>
                Already have a demo account?
              </div>
              <Link
                href="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13.5,
                  color: 'var(--blue)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Sign in to your portal
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>

            {/* Questions */}
            <div style={{
              background: 'var(--blue-wash)',
              border: '1px solid rgba(42,108,146,.18)',
              borderRadius: 'var(--r)',
              padding: '20px 24px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
                Questions?
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: '0 0 10px', lineHeight: 1.55 }}>
                Reach our pilot team directly:
              </p>
              <a
                href="mailto:pilots@citypulse.city"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontSize: 13.5, color: 'var(--blue)', fontWeight: 600, textDecoration: 'none',
                }}
              >
                <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2 4h16v12H2zM2 4l8 7 8-7" />
                </svg>
                pilots@citypulse.city
              </a>
            </div>

            {/* Trusted by strip */}
            <div style={{
              background: 'var(--surface-3)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--r)',
              padding: '18px 24px',
            }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 14 }}>
                Trusted approach for
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Cities & counties', 'First Nations', 'National parks', 'Utilities', 'Airports & campuses', 'Emergency services'].map(t => (
                  <span key={t} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: 11.5, fontWeight: 600, color: 'var(--ink-soft)',
                    background: 'var(--surface)', border: '1px solid var(--rule)',
                    borderRadius: 'var(--r-pill)', padding: '5px 12px',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
