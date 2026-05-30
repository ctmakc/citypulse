"use client"

import { useState } from "react"
import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Spark from "@/components/ui/Spark"
import Card from "@/components/ui/Card"
import Pill from "@/components/ui/Pill"
import RecRow from "@/components/ui/RecRow"
import Donut from "@/components/ui/Donut"
import TimeBar from "@/components/ui/TimeBar"
import CityMap from "@/components/map/CityMap"
import Icon from "@/components/ui/Icon"
import { KPIS, ALERTS, ACTIONS, PROJECTS, MAP_DOTS, MAP_HEAT } from "@/lib/data"
import type { MapDot } from "@/lib/types"

const STATUS_COLOR: Record<string, string> = {
  "s-critical": "var(--red)",
  "s-elevated": "var(--amber)",
  "s-ok":       "var(--green)",
  "s-info":     "var(--blue)",
}

const SPARKS: Record<string, number[]> = {
  alerts:  [1, 2, 1, 3, 2, 4, 4],
  infra:   [84, 83, 82, 81, 80, 79, 78],
  traffic: [900, 980, 1050, 1100, 1180, 1210, 1240],
  water:   [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
  air:     [72, 74, 76, 78, 80, 82, 84],
  fire:    [0.4, 0.5, 0.5, 0.6, 0.7, 0.8, 0.9],
  flood:   [0.3, 0.3, 0.4, 0.4, 0.5, 0.5, 0.5],
  r311:    [240, 255, 270, 285, 295, 304, 312],
  cost:    [3.2, 3.5, 3.6, 3.8, 3.9, 4.0, 4.2],
  grants:  [8, 9, 9, 10, 10, 11, 11],
}

// 5 tiles matching the design exactly
const OVERVIEW_KPIS = ["infra", "fire", "water", "r311", "cost"]

const HAZ_FILTERS = ["All", "Wildfire", "Flood", "Water", "Traffic", "Air", "311"] as const
type HazFilter = (typeof HAZ_FILTERS)[number]

function filterDots(dots: MapDot[], haz: HazFilter): MapDot[] {
  if (haz === "All") return dots
  const tagMap: Record<string, string[]> = {
    Wildfire: ["Wildfire", "wildfire", "fire"],
    Flood:    ["drainage", "Westbank", "drain"],
    Water:    ["Water", "MX-118", "main"],
    Traffic:  ["Harbor", "Vine", "Traffic"],
    Air:      ["Air", "School", "school"],
    "311":    ["311", "cluster", "sensor"],
  }
  const tags = tagMap[haz] ?? []
  return dots.filter(d =>
    d.label ? tags.some(t => d.label!.toLowerCase().includes(t.toLowerCase())) : false
  )
}

// KPI tile — matching design: label row + value + sub + spark
function KpiTile({ kpi }: { kpi: (typeof KPIS)[0] }) {
  const color = STATUS_COLOR[kpi.status] ?? "var(--ink)"
  const spark = SPARKS[kpi.key] ?? [1, 1, 1, 1, 1, 1, 1]
  return (
    <div className="surface" style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Label + trend */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="cap" style={{ fontSize: 9.5 }}>{kpi.label}</span>
        {kpi.trend && (
          <span className="mono" style={{ fontSize: 10, fontWeight: 700, color }}>{kpi.trend}</span>
        )}
      </div>
      {/* Value */}
      <div style={{ marginTop: 9 }}>
        <span className="serif" style={{
          fontSize: String(kpi.value).length > 6 ? 22 : 28,
          fontWeight: 600,
          color,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}>
          {kpi.value}
        </span>
      </div>
      {/* Sub + spark */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 8 }}>
        <span style={{ fontSize: 11, color: "var(--ink-faint)", lineHeight: 1.3 }}>{kpi.sub}</span>
        <Spark data={spark} color={color} w={44} h={16} />
      </div>
    </div>
  )
}

export default function Overview() {
  const [haz, setHaz] = useState<HazFilter>("All")
  const topKpis = KPIS.filter(k => OVERVIEW_KPIS.includes(k.key))

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

      {/* 5 KPI tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
        {topKpis.map(kpi => <KpiTile key={kpi.key} kpi={kpi} />)}
      </div>

      {/* Main split: 1.7fr map + 1fr right column */}
      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 16, height: 580 }}>

        {/* Map panel */}
        <div className="surface" style={{ position: "relative", overflow: "hidden" }}>
          {/* Hazard filter chips */}
          <div style={{
            position: "absolute", top: 12, left: 12, zIndex: 10,
            display: "flex", gap: 5, flexWrap: "wrap", maxWidth: "calc(100% - 140px)",
          }}>
            {HAZ_FILTERS.map(h => (
              <button
                key={h}
                onClick={() => setHaz(h)}
                style={{
                  fontSize: 11.5, fontWeight: 600,
                  padding: "5px 12px", borderRadius: 100,
                  border: `1px solid ${haz === h ? "var(--ink)" : "rgba(255,255,255,.7)"}`,
                  background: haz === h ? "var(--ink)" : "rgba(255,255,255,.88)",
                  color: haz === h ? "#fff" : "var(--ink-soft)",
                  cursor: "pointer",
                  backdropFilter: "blur(6px)",
                  transition: "all .14s",
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
              position: "absolute", top: 12, right: 12, zIndex: 10,
              display: "flex", alignItems: "center", gap: 5,
              fontSize: 11.5, fontWeight: 600, padding: "5px 12px",
              borderRadius: 100, border: "1px solid rgba(255,255,255,.7)",
              background: "rgba(255,255,255,.88)", color: "var(--blue)",
              textDecoration: "none", backdropFilter: "blur(6px)",
            }}
          >
            <Icon name="twin" size={12} />
            Digital Twin
          </a>

          <CityMap dots={filterDots(MAP_DOTS, haz)} heat={MAP_HEAT} />

          {/* TimeBar */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "rgba(255,255,255,.92)", borderTop: "1px solid var(--rule)",
            padding: "4px 16px", backdropFilter: "blur(8px)",
          }}>
            <TimeBar inline />
          </div>
        </div>

        {/* Right column: narrative summary + alerts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 0, overflow: "auto" }}>
          {/* AI narrative block — matches design exactly */}
          <div className="surface" style={{ padding: "18px 20px", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: "var(--blue-wash)", color: "var(--blue)",
                display: "grid", placeItems: "center", flexShrink: 0,
              }}>
                <Icon name="sparkles" size={14} />
              </div>
              <div className="serif" style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>
                This morning in Meridian
              </div>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.65 }}>
              Risk is{" "}
              <span style={{ color: "var(--amber)", fontWeight: 700 }}>elevated</span>.
              Two situations need a decision today: a water main in Riverside predicted to fail
              within 90 days, and a wildfire-risk zone expanding toward Northgate homes.
            </p>
          </div>

          {/* Active Alerts */}
          <Card
            title="Active Alerts"
            style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
          >
            <div style={{ overflow: "auto", flex: 1 }}>
              {ALERTS.map(alert => {
                const c = alert.sev === "Critical" ? "var(--red)" : alert.sev === "Elevated" ? "var(--amber)" : "var(--blue)"
                return (
                  <div key={alert.id} style={{
                    display: "flex", gap: 10, alignItems: "flex-start",
                    padding: "10px 0", borderBottom: "1px solid var(--rule-soft)",
                  }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%", background: c,
                      flexShrink: 0, marginTop: 4,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 2 }}>
                        <Pill sev={alert.sev} />
                        <span className="code" style={{ color: "var(--ink-ghost)", fontSize: 9 }}>{alert.id}</span>
                      </div>
                      <div style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.4 }}>{alert.title}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}>
                        {alert.where} · {alert.time}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom 2-column: Priority actions + Grant pipeline */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Priority actions" code="AI" right={<span className="code">Generated 07:40</span>}>
          {ACTIONS.map(a => (
            <RecRow key={a.p} n={a.p} text={a.text} impact={a.impact} c="var(--green)" />
          ))}
        </Card>

        <Card
          title="Where the money is"
          code="$"
          right={
            <a href="/capital-grants" style={{ fontSize: 12, color: "var(--blue)", fontWeight: 600 }}>
              Open Capital & Grants
            </a>
          }
        >
          {PROJECTS.slice(0, 4).map(proj => (
            <div key={proj.id} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 0", borderBottom: "1px solid var(--rule-soft)",
              cursor: "pointer",
            }}>
              <Donut v={proj.prob} size={36} color="var(--green)" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{proj.title}</div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-faint)", marginTop: 2 }}>
                  {proj.cost} · {proj.program} · {proj.match} match
                </div>
              </div>
              <Pill sev="OK">{proj.elig}</Pill>
            </div>
          ))}
        </Card>
      </div>
    </Screen>
  )
}
