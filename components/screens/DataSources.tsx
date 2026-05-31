"use client"

import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Pill from "@/components/ui/Pill"
import { INTEGRATIONS } from "@/lib/data"

export default function DataSources() {
  const totalSources = INTEGRATIONS.reduce((sum, g) => sum + g.items.length, 0)
  const connectedSources = INTEGRATIONS.reduce(
    (sum, g) => sum + g.items.filter(([, status]) => status === "Connected").length,
    0
  )

  return (
    <Screen>
      <ScreenHead
        ico="data"
        title="Data Sources"
        sub={`${connectedSources} of ${totalSources} integrations connected — live feeds from sensors, operations systems and geospatial data providers.`}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {INTEGRATIONS.map((group) => (
          <div key={group.group}>
            {/* Group header */}
            <div className="cap" style={{ marginBottom: 10 }}>
              {group.group}
            </div>

            <div className="surface" style={{ overflow: "hidden" }}>
              {/* Column headers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 130px 120px",
                  padding: "8px 18px",
                  background: "var(--surface-2)",
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                <div className="cap">Source</div>
                <div className="cap">Status</div>
                <div className="cap">Records / streams</div>
              </div>

              {group.items.map(([name, status, count]) => (
                <div
                  key={name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 130px 120px",
                    padding: "11px 18px",
                    borderBottom: "1px solid var(--rule-soft)",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{name}</div>
                  <div>
                    <Pill sev={status === "Connected" ? "OK" : "Elevated"}>
                      {status}
                    </Pill>
                  </div>
                  <div
                    className="mono"
                    style={{ fontSize: 12.5, color: "var(--ink-soft)" }}
                  >
                    {count.toLocaleString("en-US")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Screen>
  )
}
