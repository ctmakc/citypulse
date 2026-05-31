"use client"

import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Card from "@/components/ui/Card"
import Pill from "@/components/ui/Pill"
import Icon from "@/components/ui/Icon"
import TimeBar from "@/components/ui/TimeBar"
import CityMap from "@/components/map/CityMap"
import { MAP_DOTS, MAP_HEAT } from "@/lib/data"
import type { MapDot } from "@/lib/types"

const TASKS: [string, string, boolean][] = [
  ["Issue Northgate evacuation advisory (Zone A)", "Emergency Mgmt", true],
  ["Pre-position Engine 4 & 7 at NE staging", "Fire & Rescue", true],
  ["Open 3 shelters (capacity 1,200)", "Red Cross / City", false],
  ["Close Ridge Rd at mile 2–5", "Transportation", false],
  ["Protect Northgate water pump station", "Water Authority", false],
  ["Notify 2 schools in spread band", "School District", false],
]

const FACILITIES: [string, string, string][] = [
  ["Northgate Elementary", "In spread band", "var(--red)"],
  ["Ridge View High School", "In spread band", "var(--red)"],
  ["Northgate Community Center", "Designated shelter", "var(--amber)"],
  ["Westbrook Care Home", "Evacuation priority", "var(--red)"],
  ["Northgate Water Station", "Protection required", "var(--amber)"],
]

const RESOURCES: [string, string][] = [
  ["Engine companies", "18 of 24 available"],
  ["Ladder trucks", "6 available"],
  ["Water tenders", "3 pre-positioned"],
  ["Shelter capacity", "1,200 (3 sites)"],
  ["Mutual aid (county)", "On standby"],
  ["Air support", "1 helicopter ready"],
]

const AGENCIES = ["Fire & Rescue", "Emergency Mgmt", "Transportation", "Public Works", "Red Cross", "School District"]

// ─── Evacuation zones (PRD §8) ───────────────────────────────────────────────
// status drives the Pill severity colour: Order→red, Warning→amber,
// Advisory→blue (Watch), Clear→green (OK). Pills always carry their text.
type ZoneStatus = "Order" | "Warning" | "Advisory" | "Clear"
const ZONE_SEV: Record<ZoneStatus, string> = {
  Order: "High",
  Warning: "Elevated",
  Advisory: "Watch",
  Clear: "OK",
}
const ZONES: { zone: string; area: string; status: ZoneStatus; households: number; population: number }[] = [
  { zone: "Zone A", area: "Northgate", status: "Warning", households: 430, population: 1840 },
  { zone: "Zone B", area: "Ridge View / Birch Ave", status: "Advisory", households: 610, population: 2510 },
  { zone: "Zone C", area: "Westbrook", status: "Advisory", households: 290, population: 980 },
  { zone: "Zone D", area: "Harbor (downwind buffer)", status: "Clear", households: 1120, population: 4360 },
]

// ─── Resource roster (PRD §8) ────────────────────────────────────────────────
// available / committed per resource type, with a small utilization bar.
type Resource = { label: string; available: number; committed: number; unit: string; color: string }
const ROSTER: Resource[] = [
  { label: "Engine companies", available: 24, committed: 6, unit: "engines", color: "var(--red)" },
  { label: "Ladder trucks", available: 8, committed: 2, unit: "trucks", color: "var(--amber)" },
  { label: "Field crews", available: 16, committed: 9, unit: "crews", color: "var(--amber)" },
  { label: "Shelters", available: 5, committed: 3, unit: "sites", color: "var(--blue)" },
  { label: "Mutual aid (county)", available: 12, committed: 0, unit: "units", color: "var(--slate)" },
]

// ─── Escalation ladder (PRD §8) ──────────────────────────────────────────────
const LADDER: { level: string; desc: string }[] = [
  { level: "Monitoring", desc: "Routine watch · feeds nominal" },
  { level: "Pre-activation", desc: "Checklist running · staging" },
  { level: "Partial", desc: "Partial EOC · field command" },
  { level: "Full activation", desc: "Full EOC · unified command" },
]
const CURRENT_LEVEL = 1 // Pre-activation

// Wildfire-specific dots
const FIRE_DOTS: MapDot[] = MAP_DOTS.filter(
  (d) => d.label && (d.label.toLowerCase().includes("wildfire") || d.label.toLowerCase().includes("ne"))
)

export default function Emergency() {
  return (
    <Screen>
      {/* Red alert banner */}
      <div
        style={{
          background: "var(--red-wash)",
          border: "1.5px solid var(--red)",
          borderRadius: "var(--r)",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "var(--red)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon name="warning" size={18} style={{ color: "#fff" }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--red)", letterSpacing: "-0.01em" }}>
              Pre-activation · NE Ridge wildfire scenario
            </div>
            <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 2 }}>
              Ignition-risk zone expanding toward 430 Northgate homes. Pre-activation checklist in progress. Activate when Zone A evacuation order is confirmed.
            </div>
          </div>
        </div>
        <button
          className="btn"
          style={{
            background: "var(--red)",
            color: "#fff",
            border: "none",
            flexShrink: 0,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Icon name="fire" size={14} />
          Activate response
        </button>
      </div>

      <ScreenHead
        ico="fire"
        title="Emergency Coordination"
        sub="Multi-agency coordination board for the NE Ridge wildfire scenario. Track task completion, resources, and resident notifications."
        color="var(--red)"
      />

      {/* Map + tasks grid — desktop 1.6fr/1fr, collapses to 1-col < 760px */}
      <div className="em-map-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, height: 420 }}>
        {/* Map */}
        <div className="surface" style={{ position: "relative", overflow: "hidden", minHeight: 280 }}>
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 10,
              fontSize: 11,
              fontWeight: 700,
              padding: "5px 12px",
              borderRadius: 100,
              background: "var(--red)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#fff",
                animation: "blink 1s infinite",
              }}
            />
            Live hazard
          </div>
          <CityMap dots={FIRE_DOTS.length > 0 ? FIRE_DOTS : MAP_DOTS.slice(0, 2)} heat={MAP_HEAT.slice(0, 1)} />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(255,255,255,.92)",
              borderTop: "1px solid var(--rule)",
              padding: "4px 16px",
            }}
          >
            <TimeBar inline />
          </div>
          <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} } @media (max-width:760px){ .em-map-grid{ grid-template-columns:1fr !important; height:auto !important; } }`}</style>
        </div>

        {/* Task checklist */}
        <Card title="Response checklist">
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {TASKS.map(([title, dept, done]) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "10px 0",
                  borderBottom: "1px solid var(--rule-soft)",
                  opacity: done ? 0.7 : 1,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    border: done ? "none" : "2px solid var(--rule)",
                    background: done ? "var(--green)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {done && <Icon name="check" size={12} style={{ color: "#fff" }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: "var(--ink)",
                      lineHeight: 1.4,
                      textDecoration: done ? "line-through" : "none",
                    }}
                  >
                    {title}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}>{dept}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Escalation ladder — activation-level stepper (PRD §8) */}
      <Card
        title="Escalation ladder"
        code="EOC"
        right={
          <span style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>
            Current: <strong style={{ color: "var(--amber)" }}>{LADDER[CURRENT_LEVEL].level}</strong>
          </span>
        }
      >
        <div
          role="list"
          aria-label="Emergency activation levels; current level is Pre-activation"
          style={{ display: "flex", alignItems: "stretch", gap: 6, flexWrap: "wrap" }}
        >
          {LADDER.map((step, i) => {
            const isCurrent = i === CURRENT_LEVEL
            const isPast = i < CURRENT_LEVEL
            const isNext = i === CURRENT_LEVEL + 1
            const accent = isCurrent ? "var(--red)" : isPast ? "var(--green)" : "var(--slate)"
            return (
              <div role="listitem" key={step.level} style={{ display: "contents" }}>
                <div
                  className="surface-flat"
                  aria-current={isCurrent ? "step" : undefined}
                  style={{
                    flex: "1 1 160px",
                    minWidth: 0,
                    padding: "12px 14px",
                    borderLeft: `3px solid ${accent}`,
                    background: isCurrent ? "var(--red-wash)" : "var(--surface)",
                    opacity: i > CURRENT_LEVEL && !isNext ? 0.7 : 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: isCurrent || isPast ? accent : "transparent",
                        border: isCurrent || isPast ? "none" : "2px solid var(--rule)",
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      {isPast ? <Icon name="check" size={12} style={{ color: "#fff" }} /> : (
                        <span style={{ color: isCurrent ? "#fff" : "var(--ink-faint)" }}>{i + 1}</span>
                      )}
                    </span>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: isCurrent ? "var(--red)" : "var(--ink)" }}>
                      {step.level}
                    </span>
                    {isCurrent && <Pill sev="High" style={{ marginLeft: "auto" }}>Current</Pill>}
                    {isNext && <Pill sev="Elevated" style={{ marginLeft: "auto" }}>Next</Pill>}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.35 }}>{step.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div
          style={{
            marginTop: 12,
            padding: "10px 12px",
            borderRadius: "var(--r-sm)",
            background: "var(--amber-wash)",
            border: "1px solid rgba(143,95,13,.2)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon name="arrowR" size={14} style={{ color: "var(--amber)", flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.4 }}>
            <strong style={{ color: "var(--amber)" }}>Recommended next step:</strong> escalate to{" "}
            <strong style={{ color: "var(--ink)" }}>{LADDER[CURRENT_LEVEL + 1].level}</strong> when the Zone A evacuation order is confirmed.
          </span>
        </div>
      </Card>

      {/* Evacuation zones + Resource roster */}
      <div className="grid-2" style={{ gap: 16 }}>
        {/* Evacuation zones */}
        <Card title="Evacuation zones" code="EVAC">
          {ZONES.map(({ zone, area, status, households, population }) => (
            <div
              key={zone}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "10px 0",
                borderBottom: "1px solid var(--rule-soft)",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>
                  {zone} <span style={{ color: "var(--ink-faint)", fontWeight: 500 }}>· {area}</span>
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
                  {households.toLocaleString()} households · {population.toLocaleString()} people
                </div>
              </div>
              <Pill sev={ZONE_SEV[status]} style={{ flexShrink: 0 }}>{status}</Pill>
            </div>
          ))}
        </Card>

        {/* Resource roster */}
        <Card title="Resource roster" code="UNITS">
          {ROSTER.map(({ label, available, committed, unit, color }) => {
            const pct = available > 0 ? Math.round((committed / available) * 100) : 0
            return (
              <div
                key={label}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid var(--rule-soft)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{label}</span>
                  <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>
                    {committed} <span style={{ color: "var(--ink-faint)", fontWeight: 500 }}>/ {available} {unit}</span>
                  </span>
                </div>
                <div
                  role="meter"
                  aria-label={`${label} utilization: ${committed} of ${available} committed`}
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ height: 6, borderRadius: 100, background: "var(--surface-3)", overflow: "hidden" }}
                >
                  <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 100, transition: "width .3s" }} />
                </div>
              </div>
            )
          })}
        </Card>
      </div>

      {/* Bottom 3-column grid */}
      <div className="grid-3" style={{ gap: 16 }}>
        {/* Vulnerable facilities */}
        <Card title="Vulnerable facilities">
          {FACILITIES.map(([name, status, color]) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                padding: "8px 0",
                borderBottom: "1px solid var(--rule-soft)",
              }}
            >
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink)" }}>{name}</div>
                <div style={{ fontSize: 11, color, fontWeight: 600, marginTop: 1 }}>{status}</div>
              </div>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: color,
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </Card>

        {/* Resources & shelters */}
        <Card title="Resources & shelters">
          {RESOURCES.map(([key, val]) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid var(--rule-soft)",
              }}
            >
              <span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{key}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{val}</span>
            </div>
          ))}
        </Card>

        {/* Notifications */}
        <Card title="Notifications">
          <div style={{ marginBottom: 16 }}>
            <div className="cap" style={{ marginBottom: 6 }}>Resident advisory</div>
            <div
              style={{
                padding: "10px 12px",
                borderRadius: "var(--r-sm)",
                background: "var(--amber-wash)",
                border: "1px solid rgba(188,126,21,.2)",
              }}
            >
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--amber)" }}>Draft ready</div>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.4 }}>
                Northgate Zone A advisory prepared. Awaiting supervisor approval before SMS/email blast to 1,840 residents.
              </p>
            </div>
          </div>
          <div>
            <div className="cap" style={{ marginBottom: 6 }}>Agency notifications</div>
            {AGENCIES.map((agency) => (
              <div
                key={agency}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: "1px solid var(--rule-soft)",
                }}
              >
                <span style={{ fontSize: 12.5, color: "var(--ink)" }}>{agency}</span>
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    color: "var(--green)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Icon name="check" size={11} />
                  Notified
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Screen>
  )
}
