"use client"

import { useState, useEffect } from "react"
import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Stat from "@/components/ui/Stat"
import Pill from "@/components/ui/Pill"
import { CATS_311, REPORTS_311 } from "@/lib/data"
import { reports311Api } from "@/lib/api"

// ─── Types ───────────────────────────────────────────────────────────────────

type Severity = "Low" | "Medium" | "High"

interface FormData {
  category: string
  location: string
  severity: Severity
  description: string
  email: string
}

const CATEGORIES = [
  "Pothole",
  "Water leak",
  "Streetlight out",
  "Fallen tree",
  "Illegal dumping",
  "Road ice",
  "Flooding",
  "Pollution",
  "Noise complaint",
  "Damaged sign",
]

const SEVERITIES: Severity[] = ["Low", "Medium", "High"]

const SEV_COLORS: Record<Severity, { bg: string; color: string; border: string }> = {
  Low:    { bg: "var(--green-wash)",  color: "var(--green)",  border: "var(--green)" },
  Medium: { bg: "var(--amber-wash)",  color: "var(--amber)",  border: "var(--amber)" },
  High:   { bg: "#fee2e2",            color: "var(--red)",    border: "var(--red)" },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CitizenReports() {
  const highSev = REPORTS_311.filter((r) => r.sev === "High").length

  // Modal & form state
  const [isModalOpen, setIsModalOpen]   = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg]         = useState<string | null>(null)
  const [successCode, setSuccessCode]   = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    category:    "",
    location:    "",
    severity:    "Medium",
    description: "",
    email:       "",
  })

  // Auto-hide toast after 4 s
  useEffect(() => {
    if (!successCode) return
    const t = setTimeout(() => setSuccessCode(null), 4000)
    return () => clearTimeout(t)
  }, [successCode])

  // Close modal on Escape
  useEffect(() => {
    if (!isModalOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isModalOpen])

  function openModal() {
    setFormData({ category: "", location: "", severity: "Medium", description: "", email: "" })
    setErrorMsg(null)
    setIsModalOpen(true)
  }

  function closeModal() {
    if (isSubmitting) return
    setIsModalOpen(false)
    setErrorMsg(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg(null)

    if (!formData.category) { setErrorMsg("Please select a category."); return }
    if (!formData.location.trim()) { setErrorMsg("Location is required."); return }

    setIsSubmitting(true)
    try {
      const res = await reports311Api.submit({
        category:    formData.category,
        location:    formData.location.trim(),
        severity:    formData.severity,
        description: formData.description.trim() || undefined,
        email:       formData.email.trim() || undefined,
      })
      const code: string =
        (res.data as { trackingCode?: string; id?: string })?.trackingCode ||
        (res.data as { trackingCode?: string; id?: string })?.id ||
        `RPT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
      setIsModalOpen(false)
      setSuccessCode(code)
    } catch {
      setErrorMsg("Submission failed — please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ─── Input helpers ──────────────────────────────────────────────────────────

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 12px",
    borderRadius: "var(--r, 8px)",
    border: "1.5px solid var(--rule)",
    background: "var(--surface-2)",
    color: "var(--ink)",
    fontSize: 13.5,
    outline: "none",
    boxSizing: "border-box",
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "var(--ink-soft)",
    textTransform: "uppercase",
    letterSpacing: ".04em",
    marginBottom: 6,
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <Screen>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        <ScreenHead
          ico="message"
          title="Citizen Reports — 311"
          sub="Incoming reports from residents with AI-powered classification, duplicate detection, severity scoring and department routing."
          color="var(--green)"
        />
        <button
          onClick={openModal}
          style={{
            flexShrink: 0,
            marginTop: 4,
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "9px 18px",
            borderRadius: "var(--r, 8px)",
            border: "none",
            background: "var(--green)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: "var(--sh-pop)",
          }}
        >
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> New Report
        </button>
      </div>

      {/* ── Stat tiles ─────────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <Stat label="Total reports" value="312" sub="open this week" c="var(--ink)" />
        <Stat label="High severity" value={highSev} sub="requiring fast response" c="var(--red)" />
        <Stat label="Unrouted" value="47" sub="awaiting assignment" c="var(--amber)" />
        <Stat label="Avg SLA" value="4.2h" sub="resolution time" c="var(--green)" />
      </div>

      {/* ── Category pills ──────────────────────────────────────────────────── */}
      <div
        className="surface"
        style={{ padding: "12px 18px", display: "flex", flexDirection: "column", gap: 10 }}
      >
        <div className="cap">Category breakdown</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, overflowX: "auto" }}>
          {CATS_311.map(([cat, color]) => (
            <span
              key={cat}
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "5px 14px",
                borderRadius: 100,
                border: `1.5px solid ${color}44`,
                background: `${color}18`,
                color,
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* ── Reports table ───────────────────────────────────────────────────── */}
      <div className="surface" style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px 130px 100px 1fr 140px 100px 120px 80px",
            padding: "10px 18px",
            background: "var(--surface-2)",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          {["ID", "Category", "Severity", "Location", "Dept", "SLA", "Status", "Dups"].map((h) => (
            <div key={h} className="cap" style={{ padding: "0 6px" }}>
              {h}
            </div>
          ))}
        </div>

        {REPORTS_311.map((report) => (
          <div
            key={report.id}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 130px 100px 1fr 140px 100px 120px 80px",
              padding: "11px 18px",
              borderBottom: "1px solid var(--rule-soft)",
              alignItems: "center",
            }}
          >
            <div style={{ padding: "0 6px" }}>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--blue)" }}>
                {report.id}
              </span>
            </div>
            <div style={{ padding: "0 6px", fontSize: 12.5, color: "var(--ink)" }}>{report.cat}</div>
            <div style={{ padding: "0 6px" }}>
              <Pill sev={report.sev} />
            </div>
            <div style={{ padding: "0 6px", fontSize: 12.5, color: "var(--ink-soft)" }}>
              {report.where}
            </div>
            <div style={{ padding: "0 6px", fontSize: 12, color: "var(--ink-soft)" }}>{report.dept}</div>
            <div
              style={{
                padding: "0 6px",
                fontSize: 12,
                color:
                  report.sla === "Breached"
                    ? "var(--red)"
                    : report.sla.includes("left")
                    ? "var(--amber)"
                    : "var(--ink-soft)",
                fontWeight: report.sla === "Breached" ? 700 : 400,
              }}
            >
              {report.sla}
            </div>
            <div style={{ padding: "0 6px" }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 100,
                  background:
                    report.status === "In progress"
                      ? "var(--blue-wash)"
                      : report.status === "Resolved"
                      ? "var(--green-wash)"
                      : report.status === "Routing"
                      ? "var(--amber-wash)"
                      : "var(--slate-wash)",
                  color:
                    report.status === "In progress"
                      ? "var(--blue)"
                      : report.status === "Resolved"
                      ? "var(--green)"
                      : report.status === "Routing"
                      ? "var(--amber)"
                      : "var(--ink-soft)",
                }}
              >
                {report.status}
              </span>
            </div>
            <div
              style={{
                padding: "0 6px",
                fontSize: 12,
                fontWeight: report.dup > 0 ? 700 : 400,
                color: report.dup > 0 ? "var(--amber)" : "var(--ink-faint)",
                fontFamily: "var(--mono)",
              }}
            >
              {report.dup > 0 ? `×${report.dup}` : "—"}
            </div>
          </div>
        ))}
      </div>

      {/* ── Modal overlay ───────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.45)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          {/* Panel — stop propagation so clicks inside don't close */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--surface)",
              borderRadius: "var(--r, 12px)",
              boxShadow: "var(--sh-pop)",
              width: "100%",
              maxWidth: 520,
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "28px 28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)" }}>
                  Submit a 311 Report
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 3 }}>
                  Reports are triaged by AI and routed to the right department.
                </div>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  color: "var(--ink-soft)",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: "2px 6px",
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Category */}
              <div>
                <label style={labelStyle}>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((f) => ({ ...f, category: e.target.value }))}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  required
                >
                  <option value="" disabled>Select a category…</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label style={labelStyle}>Location *</label>
                <input
                  type="text"
                  placeholder="Street address or intersection"
                  value={formData.location}
                  onChange={(e) => setFormData((f) => ({ ...f, location: e.target.value }))}
                  style={inputStyle}
                  required
                />
              </div>

              {/* Severity pills */}
              <div>
                <label style={labelStyle}>Severity</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {SEVERITIES.map((sev) => {
                    const active = formData.severity === sev
                    const sc = SEV_COLORS[sev]
                    return (
                      <button
                        key={sev}
                        type="button"
                        onClick={() => setFormData((f) => ({ ...f, severity: sev }))}
                        style={{
                          flex: 1,
                          padding: "8px 0",
                          borderRadius: 100,
                          border: `2px solid ${active ? sc.border : "var(--rule)"}`,
                          background: active ? sc.bg : "var(--surface-2)",
                          color: active ? sc.color : "var(--ink-soft)",
                          fontSize: 12.5,
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all .15s",
                        }}
                      >
                        {sev}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={labelStyle}>Description <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                <textarea
                  placeholder="Describe the issue…"
                  value={formData.description}
                  onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 72 }}
                />
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Your email <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional — for updates)</span></label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              {/* Error message */}
              {errorMsg && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "var(--r, 8px)",
                    background: "#fee2e2",
                    color: "var(--red)",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {errorMsg}
                </div>
              )}

              {/* Actions */}
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  style={{
                    padding: "9px 20px",
                    borderRadius: "var(--r, 8px)",
                    border: "1.5px solid var(--rule)",
                    background: "var(--surface-2)",
                    color: "var(--ink-soft)",
                    fontSize: 13.5,
                    fontWeight: 600,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: "9px 24px",
                    borderRadius: "var(--r, 8px)",
                    border: "none",
                    background: isSubmitting ? "var(--ink-faint)" : "var(--green)",
                    color: "#fff",
                    fontSize: 13.5,
                    fontWeight: 700,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    minWidth: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          border: "2px solid rgba(255,255,255,.4)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          display: "inline-block",
                          animation: "spin .7s linear infinite",
                        }}
                      />
                      Submitting…
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Success toast ────────────────────────────────────────────────────── */}
      {successCode && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 300,
            background: "var(--ink)",
            color: "#fff",
            padding: "14px 20px",
            borderRadius: "var(--r)",
            boxShadow: "var(--sh-pop)",
            fontSize: 13.5,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          ✓ Report submitted · Tracking: {successCode}
        </div>
      )}

      {/* Spinner keyframe — injected once, scoped to this component */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </Screen>
  )
}
