"use client"

import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Pill from "@/components/ui/Pill"
import CondBar from "@/components/ui/CondBar"
import { ASSETS } from "@/lib/data"

export default function Assets() {
  return (
    <Screen>
      <ScreenHead
        ico="assets"
        title="Asset Registry"
        sub="Infrastructure assets tracked by condition, failure probability and department."
        color="var(--slate)"
      />

      <div className="surface" style={{ overflow: "hidden" }}>
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px 130px 1.4fr 1fr 160px 110px 160px 100px",
            padding: "10px 18px",
            background: "var(--surface-2)",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          {["ID", "Type", "Name", "Location", "Condition", "Fail prob.", "Department", "Risk"].map((h) => (
            <div key={h} className="cap" style={{ padding: "0 6px" }}>
              {h}
            </div>
          ))}
        </div>

        {ASSETS.map((asset) => (
          <div
            key={asset.id}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 130px 1.4fr 1fr 160px 110px 160px 100px",
              padding: "12px 18px",
              borderBottom: "1px solid var(--rule-soft)",
              alignItems: "center",
            }}
          >
            <div style={{ padding: "0 6px" }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--blue)" }}>
                {asset.id}
              </span>
            </div>
            <div style={{ padding: "0 6px", fontSize: 12, color: "var(--ink-soft)" }}>{asset.type}</div>
            <div style={{ padding: "0 6px" }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{asset.name}</span>
            </div>
            <div style={{ padding: "0 6px", fontSize: 12.5, color: "var(--ink-soft)" }}>{asset.where}</div>
            <div style={{ padding: "0 6px" }}>
              <CondBar v={asset.cond} />
            </div>
            <div style={{ padding: "0 6px" }}>
              <span
                className="mono"
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  color:
                    parseFloat(asset.prob) >= 50
                      ? "var(--red)"
                      : parseFloat(asset.prob) >= 20
                      ? "var(--amber)"
                      : "var(--green)",
                }}
              >
                {asset.prob}
              </span>
            </div>
            <div style={{ padding: "0 6px", fontSize: 12, color: "var(--ink-soft)" }}>{asset.dept}</div>
            <div style={{ padding: "0 6px" }}>
              <Pill sev={asset.risk} />
            </div>
          </div>
        ))}
      </div>
    </Screen>
  )
}
