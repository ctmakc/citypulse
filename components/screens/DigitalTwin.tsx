"use client"

import { useMemo, useState } from "react"
import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Icon from "@/components/ui/Icon"
import LayerPanel, { DEFAULT_LAYERS } from "@/components/ui/LayerPanel"
import TimeBar, { regimeForValue } from "@/components/ui/TimeBar"
import CityMap from "@/components/map/CityMap"
import { MAP_DOTS, MAP_HEAT, ALERTS, ASSETS } from "@/lib/data"
import { usePortalStore } from "@/lib/store"
import type { MapDot, MapLayer } from "@/lib/types"

const MODES = ["Street", "Satellite", "Infrastructure"] as const
type MapMode = (typeof MODES)[number]

// Extra markers surfaced only in the History regime — recently resolved items
// that are not part of the live "Now" picture.
const HISTORY_DOTS: MapDot[] = [
  { x: 42, y: 38, color: "#5E6973", size: 10, label: "Pothole repaired · Vine St", layer: "mobility" },
  { x: 30, y: 66, color: "#5E6973", size: 10, label: "Resolved leak · 4th St", layer: "assets" },
  { x: 58, y: 60, color: "#5E6973", size: 9, label: "Closed 311 · Westbank", layer: "citizen" },
]

// Extra marker surfaced only in the Forecast regime — a predicted second
// failure that escalates alongside the wildfire/water markers.
const FORECAST_DOTS: MapDot[] = [
  { x: 64, y: 72, color: "#B23A33", size: 14, pulse: true, crit: true, label: "Predicted: Westbank pump failure", layer: "hazards", assetId: "PMP-014" },
]

const LAYER_LABELS: Record<MapLayer, string> = {
  assets: "Assets",
  environment: "Environment",
  mobility: "Mobility",
  hazards: "Hazards",
  citizen: "Citizen",
}

export default function DigitalTwin() {
  const [mapMode, setMapMode] = useState<MapMode>("Infrastructure")
  const [layers, setLayers] = useState<Record<MapLayer, boolean>>(DEFAULT_LAYERS)
  const [timeVal, setTimeVal] = useState(0)
  const setPicked = usePortalStore((s) => s.setPicked)

  const regime = regimeForValue(timeVal)

  // Compose the dot set for the current time regime, then filter by enabled layers.
  const visibleDots = useMemo(() => {
    let base: MapDot[] = [...MAP_DOTS]
    if (regime === "History") base = [...MAP_DOTS, ...HISTORY_DOTS]
    if (regime === "Forecast") base = [...MAP_DOTS, ...FORECAST_DOTS]
    return base.filter((d) => (d.layer ? layers[d.layer] : true))
  }, [layers, regime])

  // Heat overlays follow the hazards/environment layers (wildfire + water + AQ footprints).
  const visibleHeat = useMemo(
    () => (layers.hazards || layers.environment ? MAP_HEAT : []),
    [layers.hazards, layers.environment],
  )

  // Marker click → inspector. If the dot maps to a known asset, open its full
  // AssetPanel card; otherwise synthesize a minimal record from the dot.
  function handlePick(d: MapDot) {
    const asset = d.assetId ? ASSETS.find((a) => a.id === d.assetId) : undefined
    if (asset) {
      setPicked(asset)
      return
    }
    setPicked({
      id: d.label ? d.label.toUpperCase().replace(/[^A-Z0-9]+/g, "-").slice(0, 12) : "MAP-DOT",
      name: d.label || "Map location",
      type: d.layer ? LAYER_LABELS[d.layer] : "Map marker",
      where: "Meridian",
      cond: d.crit || d.pulse ? 42 : 78,
      prob: d.crit || d.pulse ? "High" : "Low",
      dept: "Operations",
      risk: d.crit || d.pulse ? "Critical" : "Watch",
    })
  }

  // Legend counts reflect what is actually on the map now.
  const legend = useMemo(() => {
    const crit = visibleDots.filter((d) => d.crit || d.pulse).length
    const elevated = visibleDots.filter((d) => d.color === "#BC7E15").length
    const monitored = visibleDots.filter((d) => /^#18548|^#2A6C9/.test(d.color)).length
    const reports = visibleDots.filter((d) => d.layer === "citizen").length
    return [
      ["Critical", "var(--red)", crit],
      ["Elevated", "var(--amber)", elevated],
      ["Monitored", "var(--blue)", monitored],
      ["311 Reports", "var(--green)", reports],
    ] as [string, string, number][]
  }, [visibleDots])

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
          <LayerPanel value={layers} onChange={setLayers} />
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

          {/* Regime badge — makes the active timeline state explicit */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 10,
              fontSize: 11,
              fontWeight: 700,
              padding: "5px 12px",
              borderRadius: 100,
              background:
                regime === "Forecast" ? "var(--amber)" : regime === "History" ? "var(--slate)" : "var(--blue)",
              color: "#fff",
              boxShadow: "var(--sh-2)",
            }}
          >
            {regime === "Now" ? "Live · Now" : regime === "Forecast" ? `Forecast +${timeVal}h` : `History ${timeVal}h`}
          </div>

          <CityMap
            dots={visibleDots}
            heat={visibleHeat}
            mode={mapMode}
            regime={regime}
            cluster
            onPick={handlePick}
          />

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
            <TimeBar inline value={timeVal} onChange={setTimeVal} />
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
            {legend.map(([label, color, count]) => (
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
                {regime === "Forecast"
                  ? "Forecast view: wildfire spread and the predicted Westbank pump failure are escalated. Toggle layers to isolate overlays."
                  : regime === "History"
                  ? "History view: resolved items shown muted. Toggle layers to isolate overlays."
                  : "Wildfire risk, flood exposure, and air quality heat maps are live. Use the layer panel to toggle individual overlays."}
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
