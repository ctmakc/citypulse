"use client"

import { useRef, useState } from "react"
import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Icon from "@/components/ui/Icon"
import { REPORT_TYPES } from "@/lib/data"
import { reportsApi, isLoggedIn } from "@/lib/api"
import { usePortalStore } from "@/lib/store"

type GenState = "idle" | "generating" | "ready" | "failed"

// Map each report ROW (by its title) to the backend type slug.
const TYPE_SLUGS: Record<string, string> = {
  "Council briefing": "council-briefing",
  "Department report": "department",
  "Grant report": "grant",
  "Climate resilience report": "climate",
  "Infrastructure condition report": "infrastructure-condition",
  "Emergency event report": "emergency-event",
  "Public transparency report": "public-transparency",
}

const POLL_INTERVAL = 1200 // ms
const POLL_TIMEOUT = 20000 // ms — give up after ~20s

// Derive the filename the backend wants us to download from the status `url`.
// Backend may return a bare filename or a path like "/reports/download/<file>".
function fileFromUrl(url: string): string {
  const clean = url.split("?")[0].split("#")[0]
  const parts = clean.split("/").filter(Boolean)
  return parts[parts.length - 1] || clean
}

export default function Reports() {
  const [states, setStates] = useState<Record<string, GenState>>({})
  const [files, setFiles] = useState<Record<string, string>>({})
  const jobIds = useRef<Record<string, string>>({})
  // Per-row run token — lets a fresh click / reset cancel an in-flight poll loop.
  const runTokens = useRef<Record<string, number>>({})
  const setToast = usePortalStore((s) => s.setToast)

  function getState(key: string): GenState {
    return states[key] ?? "idle"
  }

  // Fallback used when not signed in OR the real API fails: keep the static
  // demo feeling alive by simulating a successful generation.
  function simulateSuccess(key: string, signInHint: boolean) {
    setStates((s) => ({ ...s, [key]: "generating" }))
    setFiles((f) => {
      const next = { ...f }
      delete next[key]
      return next
    })
    if (signInHint) {
      setToast({
        message: "Showing a demo report — sign in to download the real file.",
        type: "success",
      })
    }
    window.setTimeout(() => {
      setStates((s) => ({ ...s, [key]: "ready" }))
    }, 1500)
  }

  async function generate(key: string, type: string) {
    const current = getState(key)
    if (current === "generating") return

    // Open the per-row run; any earlier poll loop becomes stale and bails.
    const token = (runTokens.current[key] ?? 0) + 1
    runTokens.current[key] = token
    const isLive = () => runTokens.current[key] === token

    // Not signed in → graceful simulated success (static demo stays alive).
    if (!isLoggedIn()) {
      simulateSuccess(key, true)
      return
    }

    setStates((s) => ({ ...s, [key]: "generating" }))
    setFiles((f) => {
      const next = { ...f }
      delete next[key]
      return next
    })

    try {
      const { data } = await reportsApi.generate(type)
      const jobId = data?.jobId
      if (!jobId) throw new Error("no_job_id")
      if (!isLive()) return
      jobIds.current[key] = jobId

      const startedAt = Date.now()

      // Poll status until completed / failed / timeout.
      const poll = async () => {
        if (!isLive()) return
        try {
          const res = await reportsApi.status(jobId)
          if (!isLive()) return
          const { state, url } = res.data || {}

          if (state === "completed") {
            const file = url ? fileFromUrl(url) : ""
            if (file) setFiles((f) => ({ ...f, [key]: file }))
            setStates((s) => ({ ...s, [key]: file ? "ready" : "failed" }))
            return
          }
          if (state === "failed") {
            setStates((s) => ({ ...s, [key]: "failed" }))
            setToast({ message: "Report generation failed — please retry.", type: "error" })
            return
          }
          // waiting | active → keep polling unless we've run out of time.
          if (Date.now() - startedAt >= POLL_TIMEOUT) {
            setStates((s) => ({ ...s, [key]: "failed" }))
            setToast({ message: "Report timed out — please retry.", type: "error" })
            return
          }
          window.setTimeout(poll, POLL_INTERVAL)
        } catch {
          // Status call failed mid-flight → fall back to simulated success.
          if (!isLive()) return
          simulateSuccess(key, true)
        }
      }
      window.setTimeout(poll, POLL_INTERVAL)
    } catch {
      // generate() failed (incl. silent 401) → graceful simulated success.
      if (!isLive()) return
      simulateSuccess(key, true)
    }
  }

  function download(key: string) {
    const file = files[key]
    if (!file) return
    window.open(reportsApi.downloadUrl(file), "_blank", "noopener,noreferrer")
  }

  return (
    <Screen>
      <ScreenHead
        ico="exports"
        title="Reports & Export"
        sub="Generate and export reports for council briefings, department heads, grant funders and public transparency."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {REPORT_TYPES.map(([title, description, formats]) => {
          const key = title
          const type = TYPE_SLUGS[title]
          const state = getState(key)
          return (
            <div
              key={title}
              className="surface"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                gap: 16,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--ink)",
                    letterSpacing: "-0.01em",
                    marginBottom: 4,
                  }}
                >
                  {title}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.4 }}>{description}</div>
              </div>

              {/* Format badges */}
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                {formats.split(" · ").map((fmt) => (
                  <span
                    key={fmt}
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: 100,
                      background: "var(--surface-2)",
                      color: "var(--ink-faint)",
                      border: "1px solid var(--rule)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {fmt}
                  </span>
                ))}
              </div>

              {state === "idle" && (
                <button
                  className="btn"
                  onClick={() => generate(key, type)}
                  style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}
                >
                  <Icon name="download" size={14} />
                  Generate
                </button>
              )}

              {state === "generating" && (
                <button
                  className="btn"
                  disabled
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flexShrink: 0,
                    opacity: 0.65,
                    cursor: "default",
                    background: "var(--surface-2)",
                    color: "var(--ink-soft)",
                    border: "1px solid var(--rule)",
                  }}
                >
                  <span style={{ display: "inline-block", animation: "spin 0.8s linear infinite", fontSize: 13 }}>⟳</span>
                  Generating…
                </button>
              )}

              {state === "ready" && (
                <button
                  onClick={() => download(key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flexShrink: 0,
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: "none",
                    background: "var(--green)",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  ↓ Download
                </button>
              )}

              {state === "failed" && (
                <button
                  className="btn"
                  onClick={() => generate(key, type)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flexShrink: 0,
                    background: "var(--surface-2)",
                    color: "var(--red)",
                    border: "1px solid var(--rule)",
                  }}
                >
                  <span style={{ fontSize: 13 }}>↻</span>
                  Retry
                </button>
              )}
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </Screen>
  )
}
