"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import Icon from "@/components/ui/Icon"
import { reports311Api } from "@/lib/api"

/* ============================================================
   CityPULSE — Public Citizen 311 page
   Top-level route (/report) — NO portal layout, NO sidebar, NO auth.
   Warm, public-friendly, mobile-first. Uses the CALM tokens.
   ============================================================ */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3096/api/v1"

// Public submissions are not authenticated, so the tenant must be supplied in
// the body. Defaults to the seeded demo tenant; override per-deployment via env.
const PUBLIC_TENANT_ID =
  process.env.NEXT_PUBLIC_TENANT_ID || "meridian-tenant-id"

// ─── Domain constants ─────────────────────────────────────────────────────────

type Severity = "Low" | "Medium" | "High"

// The backend Severity enum is upper-case (LOW | MEDIUM | HIGH | CRITICAL).
const SEVERITY_ENUM: Record<Severity, "LOW" | "MEDIUM" | "HIGH"> = {
  Low: "LOW",
  Medium: "MEDIUM",
  High: "HIGH",
}

// The 10 public categories (per spec). Emoji give residents a quick visual anchor.
const CATEGORIES: { name: string; emoji: string; color: string }[] = [
  { name: "Pothole",        emoji: "🕳️", color: "var(--amber)" },
  { name: "Water leak",     emoji: "💧", color: "var(--blue)" },
  { name: "Streetlight out",emoji: "💡", color: "var(--slate)" },
  { name: "Fallen tree",    emoji: "🌳", color: "var(--green)" },
  { name: "Illegal dumping",emoji: "🗑️", color: "var(--amber)" },
  { name: "Road ice",       emoji: "🧊", color: "var(--blue)" },
  { name: "Flooding",       emoji: "🌊", color: "var(--blue)" },
  { name: "Pollution",      emoji: "🏭", color: "var(--red)" },
  { name: "Noise",          emoji: "🔊", color: "var(--slate)" },
  { name: "Damaged sign",   emoji: "🚧", color: "var(--amber)" },
]

const SEVERITIES: { value: Severity; label: string; hint: string }[] = [
  { value: "Low",    label: "Low",    hint: "Minor — no rush" },
  { value: "Medium", label: "Medium", hint: "Should be looked at" },
  { value: "High",   label: "High",   hint: "Urgent / unsafe" },
]

const SEV_COLORS: Record<Severity, { bg: string; color: string; border: string }> = {
  Low:    { bg: "var(--green-wash)", color: "var(--green)", border: "var(--green)" },
  Medium: { bg: "var(--amber-wash)", color: "var(--amber)", border: "var(--amber)" },
  High:   { bg: "var(--red-wash)",   color: "var(--red)",   border: "var(--red)" },
}

// Canonical status timeline shown on the Track tab.
const STATUS_FLOW = ["New", "Routing", "Assigned", "In progress", "Resolved"] as const
type FlowStatus = (typeof STATUS_FLOW)[number]

// Map various backend status strings onto our 5-step flow.
function normalizeStatus(raw?: string): FlowStatus {
  const s = (raw || "").toLowerCase().trim()
  if (s.includes("resolv") || s.includes("closed") || s.includes("complete")) return "Resolved"
  if (s.includes("progress") || s.includes("working") || s.includes("dispatch")) return "In progress"
  if (s.includes("assign")) return "Assigned"
  if (s.includes("rout") || s.includes("triage") || s.includes("review")) return "Routing"
  return "New"
}

// ─── Tracked report shape (loose — backend may vary) ───────────────────────────

interface TrackedReport {
  trackingCode: string
  category?: string
  location?: string
  severity?: string
  status?: string
  submittedAt?: string
  description?: string
}

/* reports311Api.track is being added by another agent. We import the whole
   reports311Api object (which always exists) and feature-detect .track at call
   time — so the build never breaks on a missing named export, yet we use the
   real method the instant it lands. Fallback hits the endpoint directly. */
async function trackReport(code: string): Promise<TrackedReport | null> {
  const trimmed = code.trim()
  if (!trimmed) return null

  // Preferred path: the shared API client method (added by api.ts owner).
  const maybeTrack = (reports311Api as unknown as {
    track?: (c: string) => Promise<{ data: unknown }>
  }).track
  if (typeof maybeTrack === "function") {
    const res = await maybeTrack(trimmed)
    return coerceReport(res?.data, trimmed)
  }

  // Local fallback: call the public endpoint directly with fetch.
  const res = await fetch(
    `${API_BASE}/reports311/track/${encodeURIComponent(trimmed)}`,
    { headers: { Accept: "application/json" } }
  )
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`track_failed_${res.status}`)
  const data = await res.json().catch(() => null)
  return coerceReport(data, trimmed)
}

// Normalize whatever the backend returns into TrackedReport (or null = not found).
function coerceReport(data: unknown, code: string): TrackedReport | null {
  if (!data || typeof data !== "object") return null
  const d = data as Record<string, unknown>
  const inner = (d.report && typeof d.report === "object" ? d.report : d) as Record<string, unknown>
  if (inner.found === false || inner.notFound === true) return null
  // If the payload carries no recognizable report fields, treat as not found.
  const hasAny = ["status", "category", "cat", "location", "where", "trackingCode", "id"].some(
    (k) => inner[k] != null
  )
  if (!hasAny) return null
  const str = (v: unknown) => (v == null ? undefined : String(v))
  return {
    trackingCode: str(inner.trackingCode) || str(inner.id) || code,
    category:     str(inner.category)  || str(inner.cat),
    location:     str(inner.location)  || str(inner.where),
    severity:     str(inner.severity)  || str(inner.sev),
    status:       str(inner.status),
    submittedAt:  str(inner.submittedAt) || str(inner.createdAt) || str(inner.when),
    description:  str(inner.description),
  }
}

// ─── Shared field styles (bigger touch targets for phones) ─────────────────────

const fieldBase: React.CSSProperties = {
  width: "100%",
  padding: "13px 15px",
  borderRadius: "var(--r)",
  border: "1.5px solid var(--rule)",
  background: "var(--surface)",
  color: "var(--ink)",
  fontSize: 15,
  fontFamily: "var(--grotesk)",
  outline: "none",
  boxSizing: "border-box",
}

const labelBase: React.CSSProperties = {
  display: "block",
  fontSize: 12.5,
  fontWeight: 700,
  color: "var(--ink)",
  marginBottom: 8,
  letterSpacing: "0.01em",
}

const hintBase: React.CSSProperties = {
  fontWeight: 400,
  textTransform: "none",
  letterSpacing: 0,
  color: "var(--ink-faint)",
  fontSize: 12,
}

// ─── Page ──────────────────────────────────────────────────────────────────────

type Mode = "submit" | "track"

export default function ReportPage() {
  const [mode, setMode] = useState<Mode>("submit")

  // Submit state
  const [category, setCategory]       = useState("")
  const [location, setLocation]       = useState("")
  const [severity, setSeverity]       = useState<Severity>("Medium")
  const [description, setDescription] = useState("")
  const [email, setEmail]             = useState("")
  const [photoName, setPhotoName]     = useState<string | null>(null)
  const photoRef = useRef<HTMLInputElement>(null)

  const [submitting, setSubmitting]   = useState(false)
  const [submitErr, setSubmitErr]     = useState<string | null>(null)
  const [doneCode, setDoneCode]       = useState<string | null>(null)

  // Track state
  const [trackInput, setTrackInput]   = useState("")
  const [tracking, setTracking]       = useState(false)
  const [trackErr, setTrackErr]       = useState<string | null>(null)
  const [result, setResult]           = useState<TrackedReport | null>(null)
  const [searched, setSearched]       = useState(false)

  function resetSubmit() {
    setCategory(""); setLocation(""); setSeverity("Medium")
    setDescription(""); setEmail(""); setPhotoName(null)
    if (photoRef.current) photoRef.current.value = ""
    setSubmitErr(null); setDoneCode(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitErr(null)
    if (!category)        { setSubmitErr("Please choose what kind of problem you're reporting."); return }
    if (!location.trim()) { setSubmitErr("Please tell us where the problem is."); return }

    setSubmitting(true)
    try {
      // Shape the body to the backend CreateReport311Dto: tenantId is required
      // for public (unauthenticated) submissions, severity is the upper-case
      // enum, and the email field is `submitterEmail`. (Photo upload isn't wired
      // to storage yet — we keep the picked filename in the UI only.)
      const res = await reports311Api.submit({
        tenantId: PUBLIC_TENANT_ID,
        category,
        location: location.trim(),
        severity: SEVERITY_ENUM[severity],
        description: description.trim() || undefined,
        submitterEmail: email.trim() || undefined,
      })
      const data = res?.data as { trackingCode?: string; id?: string } | undefined
      const code =
        data?.trackingCode ||
        data?.id ||
        `RPT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
      setDoneCode(code)
    } catch {
      setSubmitErr(
        "We couldn't submit your report just now. Please check your connection and try again."
      )
    } finally {
      setSubmitting(false)
    }
  }

  const runTrack = useCallback(async (code: string) => {
    const trimmed = code.trim()
    if (!trimmed) { setTrackErr("Enter a tracking code to look up your report."); return }
    setTracking(true); setTrackErr(null); setResult(null); setSearched(false)
    try {
      const found = await trackReport(trimmed)
      setResult(found)
      setSearched(true)
    } catch {
      setTrackErr("Something went wrong looking that up. Please try again in a moment.")
    } finally {
      setTracking(false)
    }
  }, [])

  function handleTrack(e: React.FormEvent) {
    e.preventDefault()
    void runTrack(trackInput)
  }

  // From the success card → jump to Track tab pre-filled and look it up.
  function goTrack(code: string) {
    setMode("track")
    setTrackInput(code)
    void runTrack(code)
  }

  // Scroll to top when switching to a fresh success / track view (mobile nicety).
  useEffect(() => {
    if (doneCode || (mode === "track" && tracking)) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [doneCode, mode, tracking])

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)", display: "flex", flexDirection: "column" }}>
      <PublicHeader />

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 620,
          margin: "0 auto",
          padding: "26px 18px 64px",
          boxSizing: "border-box",
        }}
      >
        {/* Intro line */}
        <div style={{ marginBottom: 22 }}>
          <h1
            className="serif"
            style={{
              margin: 0,
              fontSize: 30,
              lineHeight: 1.15,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            {mode === "submit" ? "Report a problem in your city" : "Track your report"}
          </h1>
          <p className="lede" style={{ margin: "9px 0 0", fontSize: 15 }}>
            {mode === "submit"
              ? "See a pothole, a broken streetlight, a fallen tree? Tell us where it is and we'll route it to the right city department."
              : "Enter the tracking code from your report to see exactly where it is in the queue."}
          </p>
        </div>

        {/* Mode toggle */}
        <div
          role="tablist"
          aria-label="Report mode"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 6,
            padding: 5,
            background: "var(--surface-3)",
            border: "1px solid var(--rule)",
            borderRadius: "var(--r-pill)",
            marginBottom: 22,
          }}
        >
          {(["submit", "track"] as Mode[]).map((m) => {
            const active = mode === m
            return (
              <button
                key={m}
                role="tab"
                aria-selected={active}
                onClick={() => { setMode(m); setSubmitErr(null); setTrackErr(null) }}
                style={{
                  padding: "11px 14px",
                  borderRadius: "var(--r-pill)",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 700,
                  background: active ? "var(--ink)" : "transparent",
                  color: active ? "#fff" : "var(--ink-soft)",
                  transition: "background .15s, color .15s",
                }}
              >
                {m === "submit" ? "Submit a report" : "Track a report"}
              </button>
            )
          })}
        </div>

        {/* ── SUBMIT ─────────────────────────────────────────────────────────── */}
        {mode === "submit" && (
          doneCode ? (
            <SuccessCard
              code={doneCode}
              onTrack={() => goTrack(doneCode)}
              onAnother={resetSubmit}
            />
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="surface" style={{ padding: "22px 20px", display: "flex", flexDirection: "column", gap: 24 }}>

                {/* Category — tap grid */}
                <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                  <legend style={{ ...labelBase, padding: 0 }}>
                    What&apos;s the problem? <span style={{ color: "var(--red)" }}>*</span>
                  </legend>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                      gap: 9,
                    }}
                  >
                    {CATEGORIES.map((c) => {
                      const active = category === c.name
                      return (
                        <button
                          key={c.name}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setCategory(c.name)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 9,
                            padding: "12px 13px",
                            borderRadius: "var(--r)",
                            border: `1.5px solid ${active ? c.color : "var(--rule)"}`,
                            background: active
                              ? `color-mix(in srgb, ${c.color} 12%, var(--surface))`
                              : "var(--surface-2)",
                            color: active ? c.color : "var(--ink)",
                            fontSize: 13.5,
                            fontWeight: 600,
                            cursor: "pointer",
                            textAlign: "left",
                            transition: "border-color .14s, background .14s",
                          }}
                        >
                          <span aria-hidden="true" style={{ fontSize: 17, lineHeight: 1 }}>{c.emoji}</span>
                          {c.name}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                {/* Location */}
                <div>
                  <label htmlFor="loc" style={labelBase}>
                    Where is it? <span style={{ color: "var(--red)" }}>*</span>
                  </label>
                  <input
                    id="loc"
                    type="text"
                    placeholder="Street address, intersection or landmark"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={fieldBase}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      marginTop: 9,
                      fontSize: 12.5,
                      color: "var(--ink-faint)",
                    }}
                  >
                    <Icon name="map" size={15} strokeWidth={1.7} />
                    <span>or drop a pin on the map (coming soon)</span>
                  </div>
                </div>

                {/* Severity pills */}
                <div>
                  <span style={labelBase}>How urgent is it?</span>
                  <div role="group" aria-label="Severity" style={{ display: "flex", gap: 9 }}>
                    {SEVERITIES.map((s) => {
                      const active = severity === s.value
                      const sc = SEV_COLORS[s.value]
                      return (
                        <button
                          key={s.value}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSeverity(s.value)}
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            padding: "11px 6px",
                            borderRadius: "var(--r)",
                            border: `2px solid ${active ? sc.border : "var(--rule)"}`,
                            background: active ? sc.bg : "var(--surface-2)",
                            color: active ? sc.color : "var(--ink-soft)",
                            cursor: "pointer",
                            transition: "all .15s",
                          }}
                        >
                          <span style={{ fontSize: 14, fontWeight: 700 }}>{s.label}</span>
                          <span style={{ fontSize: 10.5, fontWeight: 500, opacity: 0.85 }}>{s.hint}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="desc" style={labelBase}>
                    Describe it <span style={hintBase}>(optional)</span>
                  </label>
                  <textarea
                    id="desc"
                    placeholder="A few words about what you're seeing helps the crew arrive prepared."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    style={{ ...fieldBase, resize: "vertical", minHeight: 96, lineHeight: 1.5 }}
                  />
                </div>

                {/* Photo */}
                <div>
                  <label htmlFor="photo" style={labelBase}>
                    Add a photo <span style={hintBase}>(optional)</span>
                  </label>
                  <input
                    ref={photoRef}
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? null)}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="photo"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 16px",
                      borderRadius: "var(--r)",
                      border: "1.5px dashed var(--rule)",
                      background: "var(--surface-2)",
                      cursor: "pointer",
                      color: "var(--ink-soft)",
                    }}
                  >
                    <span
                      style={{
                        width: 38, height: 38, borderRadius: "var(--r-sm)",
                        background: "var(--blue-wash)", color: "var(--blue)",
                        display: "grid", placeItems: "center", flexShrink: 0,
                      }}
                    >
                      <Icon name="exports" size={18} strokeWidth={1.7} />
                    </span>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: photoName ? "var(--ink)" : "var(--ink-soft)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {photoName ?? "Tap to add a photo from your phone"}
                    </span>
                    {photoName && (
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); setPhotoName(null); if (photoRef.current) photoRef.current.value = "" }}
                        aria-label="Remove photo"
                        style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--ink-faint)", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 4 }}
                      >
                        ×
                      </button>
                    )}
                  </label>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" style={labelBase}>
                    Your email <span style={hintBase}>(optional — we&apos;ll send you updates)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={fieldBase}
                  />
                </div>

                {/* Error */}
                {submitErr && (
                  <div
                    role="alert"
                    style={{
                      display: "flex", alignItems: "center", gap: 9,
                      padding: "12px 15px", borderRadius: "var(--r)",
                      background: "var(--red-wash)", border: "1px solid var(--red)",
                      color: "var(--red)", fontSize: 13.5, fontWeight: 500,
                    }}
                  >
                    <Icon name="warning" size={17} strokeWidth={1.8} />
                    <span>{submitErr}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn"
                  style={{
                    width: "100%", justifyContent: "center", height: 52,
                    fontSize: 15.5, borderRadius: "var(--r)",
                    background: submitting ? "var(--ink-faint)" : "var(--ink)",
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  {submitting ? (
                    <>
                      <Spinner /> Sending your report…
                    </>
                  ) : (
                    <>
                      <Icon name="send" size={17} strokeWidth={1.8} /> Submit report
                    </>
                  )}
                </button>

                <p style={{ margin: 0, fontSize: 11.5, color: "var(--ink-faint)", textAlign: "center", lineHeight: 1.5 }}>
                  No account needed. You&apos;ll get a tracking code to follow your report.
                </p>
              </div>
            </form>
          )
        )}

        {/* ── TRACK ──────────────────────────────────────────────────────────── */}
        {mode === "track" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <form onSubmit={handleTrack}>
              <div className="surface" style={{ padding: "20px" }}>
                <label htmlFor="track" style={labelBase}>Tracking code</label>
                <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
                  <input
                    id="track"
                    type="text"
                    placeholder="e.g. RPT-7K4F2A"
                    value={trackInput}
                    onChange={(e) => setTrackInput(e.target.value.toUpperCase())}
                    autoCapitalize="characters"
                    spellCheck={false}
                    style={{ ...fieldBase, flex: "1 1 200px", fontFamily: "var(--mono)", letterSpacing: "0.04em" }}
                  />
                  <button
                    type="submit"
                    disabled={tracking}
                    className="btn"
                    style={{
                      height: 50, padding: "0 22px", borderRadius: "var(--r)", fontSize: 14.5,
                      background: tracking ? "var(--ink-faint)" : "var(--blue)",
                      cursor: tracking ? "not-allowed" : "pointer",
                    }}
                  >
                    {tracking ? <Spinner /> : <Icon name="search" size={16} strokeWidth={2} />}
                    {tracking ? "Looking…" : "Track"}
                  </button>
                </div>

                {trackErr && (
                  <div
                    role="alert"
                    style={{
                      display: "flex", alignItems: "center", gap: 9, marginTop: 14,
                      padding: "12px 15px", borderRadius: "var(--r)",
                      background: "var(--red-wash)", border: "1px solid var(--red)",
                      color: "var(--red)", fontSize: 13.5, fontWeight: 500,
                    }}
                  >
                    <Icon name="warning" size={17} strokeWidth={1.8} />
                    <span>{trackErr}</span>
                  </div>
                )}
              </div>
            </form>

            {/* Result / empty / not-found */}
            {result ? (
              <TrackResult report={result} />
            ) : searched && !trackErr ? (
              <NotFoundCard code={trackInput} onSwitch={() => setMode("submit")} />
            ) : !searched && !trackErr ? (
              <TrackEmptyState />
            ) : null}
          </div>
        )}

        {/* Reassurance / footer note */}
        <p style={{ marginTop: 30, fontSize: 12, color: "var(--ink-faint)", textAlign: "center", lineHeight: 1.6 }}>
          For life-threatening emergencies, always call <strong style={{ color: "var(--ink-soft)" }}>911</strong>.
          <br />This service is for non-emergency city maintenance requests.
        </p>
      </main>
    </div>
  )
}

// ─── Public header (the CityPULSE seal + back link) ────────────────────────────

function PublicHeader() {
  return (
    <header
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--rule)",
        boxShadow: "var(--sh-1)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 620,
          margin: "0 auto",
          padding: "13px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          {/* Seal */}
          <div
            aria-hidden="true"
            style={{
              width: 38, height: 38, borderRadius: "var(--r-sm)",
              background: "var(--ink)", color: "#fff",
              display: "grid", placeItems: "center", flexShrink: 0,
            }}
          >
            <Icon name="assets" size={20} strokeWidth={1.6} />
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div className="serif" style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--ink)" }}>
              CityPULSE
            </div>
            <div className="code" style={{ fontSize: 9.5, letterSpacing: "0.12em", color: "var(--ink-faint)" }}>
              Report a problem
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="btn btn-ghost"
          style={{ height: 38, padding: "0 14px", fontSize: 13, borderRadius: "var(--r-pill)" }}
        >
          <Icon name="chevron" size={15} strokeWidth={2} style={{ transform: "rotate(90deg)" }} />
          Back to CityPulse
        </Link>
      </div>
    </header>
  )
}

// ─── Success card ──────────────────────────────────────────────────────────────

function SuccessCard({ code, onTrack, onAnother }: { code: string; onTrack: () => void; onAnother: () => void }) {
  return (
    <div
      className="surface"
      style={{
        padding: "34px 24px 28px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        borderTop: "3px solid var(--green)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "var(--green-wash)", color: "var(--green)",
          display: "grid", placeItems: "center", marginBottom: 6,
        }}
      >
        <Icon name="check" size={32} strokeWidth={2.4} />
      </div>
      <h2 className="serif" style={{ margin: 0, fontSize: 25, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ink)" }}>
        Thank you — report received
      </h2>
      <p className="lede" style={{ margin: "6px 0 0", fontSize: 14.5, maxWidth: 400 }}>
        Your report is now in the queue. We&apos;ve assigned it a tracking code so you can follow its progress.
      </p>

      <div
        style={{
          margin: "20px 0 8px",
          padding: "16px 24px",
          borderRadius: "var(--r)",
          background: "var(--surface-3)",
          border: "1px dashed var(--rule)",
          width: "100%",
          maxWidth: 320,
        }}
      >
        <div className="cap" style={{ fontSize: 10, marginBottom: 6 }}>Your tracking code</div>
        <div className="mono" style={{ fontSize: 24, fontWeight: 700, color: "var(--ink)", letterSpacing: "0.06em" }}>
          {code}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 320, marginTop: 8 }}>
        <button
          onClick={onTrack}
          className="btn"
          style={{ width: "100%", justifyContent: "center", height: 50, fontSize: 15, borderRadius: "var(--r)", background: "var(--blue)" }}
        >
          <Icon name="search" size={16} strokeWidth={2} /> Track this report
        </button>
        <button
          onClick={onAnother}
          className="btn btn-ghost"
          style={{ width: "100%", justifyContent: "center", height: 48, fontSize: 14.5, borderRadius: "var(--r)" }}
        >
          Report another problem
        </button>
      </div>
    </div>
  )
}

// ─── Track result (status timeline + details) ──────────────────────────────────

function TrackResult({ report }: { report: TrackedReport }) {
  const current = normalizeStatus(report.status)
  const currentIdx = STATUS_FLOW.indexOf(current)
  const cat = CATEGORIES.find((c) => c.name === report.category)

  return (
    <div className="surface" style={{ overflow: "hidden", borderTop: "3px solid var(--blue)" }}>
      {/* Header strip */}
      <div style={{ padding: "18px 20px 16px", borderBottom: "1px solid var(--rule-soft)" }}>
        <div className="cap" style={{ fontSize: 10, marginBottom: 5 }}>Tracking code</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <span className="mono" style={{ fontSize: 19, fontWeight: 700, color: "var(--ink)", letterSpacing: "0.05em" }}>
            {report.trackingCode}
          </span>
          <span
            style={{
              fontSize: 12.5, fontWeight: 700, padding: "5px 14px", borderRadius: "var(--r-pill)",
              background: current === "Resolved" ? "var(--green-wash)" : "var(--blue-wash)",
              color: current === "Resolved" ? "var(--green)" : "var(--blue)",
            }}
          >
            {current === "Resolved" ? "✓ Resolved" : current}
          </span>
        </div>
      </div>

      {/* Vertical timeline */}
      <div style={{ padding: "22px 20px 8px" }}>
        {STATUS_FLOW.map((step, i) => {
          const done = i < currentIdx
          const isCurrent = i === currentIdx
          const reached = i <= currentIdx
          const last = i === STATUS_FLOW.length - 1
          const dotColor = isCurrent
            ? (current === "Resolved" ? "var(--green)" : "var(--blue)")
            : done ? "var(--green)" : "var(--rule)"
          return (
            <div key={step} style={{ display: "flex", gap: 14, minHeight: last ? "auto" : 46 }}>
              {/* Marker column */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div
                  style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: reached ? dotColor : "var(--surface-2)",
                    border: `2px solid ${reached ? dotColor : "var(--rule)"}`,
                    display: "grid", placeItems: "center",
                    color: "#fff", flexShrink: 0,
                    boxShadow: isCurrent ? `0 0 0 5px color-mix(in srgb, ${dotColor} 18%, transparent)` : "none",
                    transition: "all .2s",
                  }}
                >
                  {done || (isCurrent && current === "Resolved")
                    ? <Icon name="check" size={14} strokeWidth={3} />
                    : isCurrent
                    ? <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
                    : null}
                </div>
                {!last && (
                  <div style={{ width: 2, flex: 1, minHeight: 24, background: i < currentIdx ? "var(--green)" : "var(--rule)" }} />
                )}
              </div>
              {/* Label */}
              <div style={{ paddingBottom: last ? 0 : 14, paddingTop: 2 }}>
                <div
                  style={{
                    fontSize: 14.5,
                    fontWeight: isCurrent ? 700 : reached ? 600 : 500,
                    color: isCurrent ? "var(--ink)" : reached ? "var(--ink)" : "var(--ink-faint)",
                  }}
                >
                  {step}
                </div>
                {isCurrent && (
                  <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 2 }}>
                    {STEP_BLURB[current]}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Details */}
      <div style={{ padding: "14px 20px 20px", borderTop: "1px solid var(--rule-soft)", display: "flex", flexDirection: "column", gap: 12 }}>
        {report.category && (
          <DetailRow label="Category" value={`${cat ? cat.emoji + " " : ""}${report.category}`} />
        )}
        {report.location && <DetailRow label="Location" value={report.location} />}
        {report.severity && <DetailRow label="Severity" value={report.severity} />}
        {report.submittedAt && <DetailRow label="Submitted" value={formatDate(report.submittedAt)} />}
        {report.description && <DetailRow label="Description" value={report.description} />}
      </div>
    </div>
  )
}

const STEP_BLURB: Record<FlowStatus, string> = {
  "New":         "We've received your report and it's awaiting triage.",
  "Routing":     "We're matching your report to the right department.",
  "Assigned":    "A city crew has been assigned to handle this.",
  "In progress": "Work is underway on your report.",
  "Resolved":    "This report has been resolved. Thank you for helping.",
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
      <div className="cap" style={{ fontSize: 10, width: 92, flexShrink: 0, paddingTop: 1 }}>{label}</div>
      <div style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.5 }}>{value}</div>
    </div>
  )
}

// ─── Empty / not-found states ──────────────────────────────────────────────────

function TrackEmptyState() {
  return (
    <div
      className="surface-flat"
      style={{ padding: "34px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
    >
      <div
        aria-hidden="true"
        style={{ width: 52, height: 52, borderRadius: "var(--r)", background: "var(--surface-3)", color: "var(--ink-faint)", display: "grid", placeItems: "center" }}
      >
        <Icon name="search" size={24} strokeWidth={1.7} />
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>Look up a report</div>
      <p style={{ margin: 0, fontSize: 13, color: "var(--ink-soft)", maxWidth: 340, lineHeight: 1.55 }}>
        Paste the tracking code you received when you submitted your report — it looks like <span className="mono" style={{ color: "var(--ink)" }}>RPT-7K4F2A</span> — to see its current status.
      </p>
    </div>
  )
}

function NotFoundCard({ code, onSwitch }: { code: string; onSwitch: () => void }) {
  return (
    <div
      className="surface"
      style={{ padding: "30px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, borderTop: "3px solid var(--amber)" }}
    >
      <div
        aria-hidden="true"
        style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--amber-wash)", color: "var(--amber)", display: "grid", placeItems: "center" }}
      >
        <Icon name="info" size={26} strokeWidth={1.9} />
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>We couldn&apos;t find that report</div>
      <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-soft)", maxWidth: 360, lineHeight: 1.55 }}>
        No report matches <span className="mono" style={{ color: "var(--ink)", fontWeight: 600 }}>{code || "that code"}</span>. Double-check the code from your confirmation — it&apos;s case-sensitive.
      </p>
      <button
        onClick={onSwitch}
        className="btn btn-ghost"
        style={{ marginTop: 6, height: 44, padding: "0 18px", fontSize: 13.5, borderRadius: "var(--r)" }}
      >
        Submit a new report instead
      </button>
    </div>
  )
}

// ─── Small primitives ──────────────────────────────────────────────────────────

function Spinner() {
  return (
    <>
      <span
        aria-hidden="true"
        style={{
          width: 16, height: 16,
          border: "2px solid rgba(255,255,255,.4)",
          borderTopColor: "#fff",
          borderRadius: "50%",
          display: "inline-block",
          animation: "rp-spin .7s linear infinite",
        }}
      />
      <style>{`@keyframes rp-spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}

function formatDate(raw: string): string {
  const d = new Date(raw)
  if (isNaN(d.getTime())) return raw
  return d.toLocaleString(undefined, {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}
