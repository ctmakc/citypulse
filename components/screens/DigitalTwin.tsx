"use client"

import { useState } from "react"
import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Icon from "@/components/ui/Icon"
import LayerPanel from "@/components/ui/LayerPanel"
import TimeBar from "@/components/ui/TimeBar"
import CityMap from "@/components/map/CityMap"
import { MAP_DOTS, MAP_HEAT, ALERTS } from "@/lib/data"

const MODES = ["Street", "Satellite", "Infrastructure"] as const
type MapMode = (typeof MODES)[number]

const LEGEND_ITEMS: [string, string, number][] = [
  ["Critical", "var(--red)", 2],
  ["Elevated", "var(--amber)", 3],
  ["Monitored", "var(--blue)", 2],
  ["311 Reports", "var(--green)", 1],
]

export default function DigitalTwin() {
  const [mapMode, setMapMode] = useState<MapMode>("Infrastructure")

  return (
    <Screen pad={false} scroll={false}>
      <div style={{ padding: "0 24px" }}>
        <ScreenHead
          ico="twin"
          title="Digital Twin"
          sub="Operational map of Meridian — assets, environment, mobility and hazards on one canvas, from −72h history to +72h forecast."
          color="var(--blue)"
          actions={
            <button className="btn btn-ghost" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="exports" size={14} />
              Export view
            </button>
          }
        />
      </div>

      <div style={{ display: "flex", gap: 16, flex: 1, minHeight: 0, padding: "0 24px 24px" }}>
        {/* Left: layer panel */}
        <div
          className="surface"
          style={{ width: 244, flexShrink: 0, overflow: "auto", display: "flex", flexDirection: "column" }}
        >
          <div
            className="panel-head"
            style={{ borderBottom: "1px solid var(--rule)", position: "sticky", top: 0, background: "var(--surface)", zIndex: 1 }}
          >
            <span className="panel-title">Map layers</span>
          </div>
          <LayerPanel />
        </div>

        {/* Center: map */}
        <div className="surface" style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {/* Mode switcher */}
          <div
            role="group"
            aria-label="Map view mode"
            style={{
              position: "absolute",
              top: 12,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              display: "flex",
              background: "rgba(255,255,255,.9)",
              borderRadius: 100,
              padding: 3,
              gap: 2,
              border: "1px solid var(--rule)",
              backdropFilter: "blur(8px)",
              boxShadow: "var(--sh-2)",
            }}
          >
            {MODES.map((mode) => (
              <button
                key={mode}
                onClick={() => setMapMode(mode)}
                aria-pressed={mapMode === mode}
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  padding: "5px 14px",
                  borderRadius: 100,
                  border: "none",
                  background: mapMode === mode ? "var(--blue)" : "transparent",
                  color: mapMode === mode ? "#fff" : "var(--ink-soft)",
                  cursor: "pointer",
                  transition: "all .15s ease",
                }}
              >
                {mode}
              </button>
            ))}
          </div>

          <CityMap dots={MAP_DOTS} heat={MAP_HEAT} />

          {/* TimeBar overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(255,255,255,.92)",
              borderTop: "1px solid var(--rule)",
              padding: "6px 16px",
              backdropFilter: "blur(8px)",
            }}
          >
            <TimeBar inline />
          </div>
        </div>

        {/* Right: legend */}
        <div
          className="surface"
          style={{ width: 244, flexShrink: 0, overflow: "auto", display: "flex", flexDirection: "column" }}
        >
          <div
            className="panel-head"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            <span className="panel-title">On the map now</span>
          </div>
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {LEGEND_ITEMS.map(([label, color, count]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  borderRadius: "var(--r-sm)",
                  background: "var(--surface-2)",
                  border: "1px solid var(--rule-soft)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: color,
                      boxShadow: `0 0 0 3px ${color}33`,
                    }}
                  />
                  <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink)" }}>{label}</span>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color,
                    fontFamily: "var(--mono)",
                  }}
                >
                  {count}
                </span>
              </div>
            ))}

            <div
              style={{
                marginTop: 8,
                padding: "10px 12px",
                borderRadius: "var(--r-sm)",
                background: "var(--blue-wash)",
                border: "1px solid rgba(42,108,146,.15)",
              }}
            >
              <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--blue)", marginBottom: 4 }}>
                Active hazard overlays
              </div>
              <p style={{ fontSize: 11.5, color: "var(--ink-soft)", margin: 0, lineHeight: 1.5 }}>
                Wildfire risk, flood exposure, and air quality heat maps are live. Use layer panel to toggle individual overlays.
              </p>
            </div>

            <div style={{ marginTop: 8 }}>
              <div className="cap" style={{ marginBottom: 8 }}>Recent alerts</div>
              {ALERTS.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    padding: "6px 0",
                    borderBottom: "1px solid var(--rule-soft)",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background:
                        alert.sev === "Critical"
                          ? "var(--red)"
                          : alert.sev === "Elevated"
                          ? "var(--amber)"
                          : "var(--blue)",
                      flexShrink: 0,
                      marginTop: 4,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 500, color: "var(--ink)", lineHeight: 1.4 }}>
                      {alert.title}
                    </div>
                    <div style={{ fontSize: 10.5, color: "var(--ink-faint)", marginTop: 1 }}>
                      {alert.where} · {alert.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
