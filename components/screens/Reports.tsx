"use client"

import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Icon from "@/components/ui/Icon"
import { REPORT_TYPES } from "@/lib/data"

export default function Reports() {
  return (
    <Screen>
      <ScreenHead
        ico="exports"
        title="Reports & Export"
        sub="Generate and export reports for council briefings, department heads, grant funders and public transparency."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {REPORT_TYPES.map(([title, description, formats]) => (
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

            <button
              className="btn"
              style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}
            >
              <Icon name="download" size={14} />
              Generate
            </button>
          </div>
        ))}
      </div>
    </Screen>
  )
}
