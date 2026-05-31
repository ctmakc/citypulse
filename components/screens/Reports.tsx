"use client"

import { useState } from "react"
import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Icon from "@/components/ui/Icon"
import { REPORT_TYPES } from "@/lib/data"

type GenState = "idle" | "generating" | "ready"

export default function Reports() {
  const [states, setStates] = useState<Record<number, GenState>>({})

  function generate(idx: number) {
    if (states[idx] && states[idx] !== "idle") return
    setStates((s) => ({ ...s, [idx]: "generating" }))
    setTimeout(() => {
      setStates((s) => ({ ...s, [idx]: "ready" }))
      setTimeout(() => {
        setStates((s) => ({ ...s, [idx]: "idle" }))
      }, 2000)
    }, 1500)
  }

  function getState(idx: number): GenState {
    return states[idx] ?? "idle"
  }

  return (
    <Screen>
      <ScreenHead
        ico="exports"
        title="Reports & Export"
        sub="Generate and export reports for council briefings, department heads, grant funders and public transparency."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {REPORT_TYPES.map(([title, description, formats], idx) => {
          const state = getState(idx)
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
                  onClick={() => generate(idx)}
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
