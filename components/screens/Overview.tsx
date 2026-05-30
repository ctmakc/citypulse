"use client"

import { useState } from "react"
import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Stat from "@/components/ui/Stat"
import Card from "@/components/ui/Card"
import Pill from "@/components/ui/Pill"
import RecRow from "@/components/ui/RecRow"
import Donut from "@/components/ui/Donut"
import ArcGauge from "@/components/charts/ArcGauge"
import TimeBar from "@/components/ui/TimeBar"
import CityMap from "@/components/map/CityMap"
import Icon from "@/components/ui/Icon"
import { KPIS, ALERTS, ACTIONS, PROJECTS, MAP_DOTS, MAP_HEAT, CITY } from "@/lib/data"
import type { MapDot } from "@/lib/types"

const STATUS_COLOR: Record<string, string> = {
  "s-critical": "var(--red)",
  "s-elevated": "var(--amber)",
  "s-ok": "var(--green)",
  "s-info": "var(--blue)",
}

const HAZ_FILTERS = ["All", "Wildfire", "Flood", "Water", "Traffic", "Air", "311"] as const
type HazFilter = (typeof HAZ_FILTERS)[number]

function filterDots(dots: MapDot[], haz: HazFilter): MapDot[] {
  if (haz === "All") return dots
  const tagMap: Record<string, string[]> = {
    Wildfire: ["Wildfire"],
    Flood: ["Flood", "Drainage", "Westbank"],
    Water: ["Water", "MX-118"],
    Traffic: ["Traffic", "Harbor", "Vine"],
    Air: ["Air", "School"],
    "311": ["311", "cluster"],
  }
  const tags = tagMap[haz] ?? []
  return dots.filter((d) =>
    d.label ? tags.some((t) => d.label!.toLowerCase().includes(t.toLowerCase())) : false
  )
}

const URGENCY_COLOR: Record<string, string> = {
  Immediate: "var(--red)",
  High: "var(--amber)",
  Medium: "var(--blue)",
  Low: "var(--slate)",
}

export default function Overview() {
  const [haz, setHaz] = useState<HazFilter>("All")
  const topKpis = KPIS.slice(0, 5)

  return (
    <Screen>
      <ScreenHead
        title="This morning in Meridian"
        sub="A shared operating picture across infrastructure, environment, mobility and citizen services — for Friday, May 30, 2026."
        actions={
          <>
            <button className="btn btn-ghost" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="exports" size={14} />
              Council briefing
            </button>
            <button className="btn" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="sparkles" size={14} />
              Ask Meridian
            </button>
          </>
        }
      />

      {/* KPI tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
        {topKpis.map((kpi) => (
          <Stat
            key={kpi.key}
            label={kpi.label}
            value={kpi.value}
            sub={kpi.sub}
            c={STATUS_COLOR[kpi.status] ?? "var(--ink)"}
          />
        ))}
      </div>

      {/* Main split: map + right column */}
      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 16, height: 600 }}>
        {/* Map panel */}
        <div className="surface" style={{ position: "relative", overflow: "hidden" }}>
          {/* Filter chips */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 10,
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              maxWidth: "calc(100% - 120px)",
            }}
          >
            {HAZ_FILTERS.map((h) => (
              <button
                key={h}
                onClick={() => setHaz(h)}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "4px 10px",
                  borderRadius: 100,
                  border: haz === h ? "1.5px solid var(--blue)" : "1.5px solid rgba(255,255,255,.6)",
                  background: haz === h ? "var(--blue)" : "rgba(255,255,255,.82)",
                  color: haz === h ? "#fff" : "var(--ink)",
                  cursor: "pointer",
                  backdropFilter: "blur(8px)",
                  transition: "all .15s ease",
                }}
              >
                {h}
              </button>
            ))}
          </div>

          {/* Digital Twin link */}
          <a
            href="/digital-twin"
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 10,
              fontSize: 11,
              fontWeight: 600,
              padding: "5px 12px",
              borderRadius: 100,
              border: "1.5px solid rgba(255,255,255,.7)",
              background: "rgba(255,255,255,.82)",
              color: "var(--blue)",
              textDecoration: "none",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Icon name="twin" size={12} />
            Digital Twin
          </a>

          {/* Map */}
          <CityMap dots={filterDots(MAP_DOTS, haz)} heat={MAP_HEAT} />

          {/* TimeBar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(255,255,255,.92)",
              borderTop: "1px solid var(--rule)",
              padding: "4px 16px",
              backdropFilter: "blur(8px)",
            }}
          >
            <TimeBar inline />
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 0, overflow: "auto" }}>
          {/* Risk summary */}
          <Card title="City Risk Score" style={{ flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <ArcGauge value={CITY.riskScore} max={100} size={110} label={CITY.riskLabel} />
              <div style={{ flex: 1, minWidth: 0 }}>
                {KPIS.slice(0, 5).map((kpi) => (
                  <div
                    key={kpi.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "5px 0",
                      borderBottom: "1px solid var(--rule-soft)",
                    }}
                  >
                    <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>{kpi.label}</span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: STATUS_COLOR[kpi.status] ?? "var(--ink)",
                        fontFamily: "var(--mono)",
                      }}
                    >
                      {kpi.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Alerts */}
          <Card title="Active Alerts" style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ overflow: "auto", flex: 1 }}>
              {ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    padding: "9px 0",
                    borderBottom: "1px solid var(--rule-soft)",
                  }}
                >
                  <div
                    style={{
                      width: 3,
                      height: 36,
                      borderRadius: 100,
                      background:
                        alert.sev === "Critical"
                          ? "var(--red)"
                          : alert.sev === "Elevated"
                          ? "var(--amber)"
                          : "var(--blue)",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <Pill sev={alert.sev} />
                      <span className="code" style={{ color: "var(--ink-ghost)" }}>
                        {alert.id}
                      </span>
                    </div>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink)", lineHeight: 1.4 }}>
                      {alert.title}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}>
                      {alert.where} · {alert.dept} · {alert.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom 2-column grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Priority actions */}
        <Card title="Priority Actions" code="AI">
          {ACTIONS.map((action) => (
            <RecRow
              key={action.p}
              n={action.p}
              text={action.text}
              impact={action.impact}
              c="var(--green)"
            />
          ))}
        </Card>

        {/* Grant pipeline */}
        <Card title="Grant Pipeline">
          {PROJECTS.slice(0, 4).map((proj) => (
            <div
              key={proj.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 0",
                borderBottom: "1px solid var(--rule-soft)",
              }}
            >
              <Donut v={proj.prob} size={36} color={URGENCY_COLOR[proj.urgency] ?? "var(--blue)"} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 }}>
                  {proj.title}
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}>
                  {proj.program} · {proj.cost}
                </div>
              </div>
              <Pill sev={proj.urgency}>{proj.urgency}</Pill>
            </div>
          ))}
        </Card>
      </div>
    </Screen>
  )
}
