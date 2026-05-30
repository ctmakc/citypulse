"use client"

import { useState } from "react"
import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Stat from "@/components/ui/Stat"
import Pill from "@/components/ui/Pill"
import Icon from "@/components/ui/Icon"
import { TASKS } from "@/lib/data"
import type { Task } from "@/lib/types"

const TABS = [
  { key: "list", label: "List", icon: "list" },
  { key: "calendar", label: "Calendar", icon: "calendar" },
  { key: "gantt", label: "Gantt", icon: "gantt" },
] as const

type TabKey = (typeof TABS)[number]["key"]

const PRI_COLOR: Record<string, string> = {
  Critical: "var(--red)",
  High: "var(--amber)",
  Medium: "var(--blue)",
  Low: "var(--slate)",
}

const STATUS_BG: Record<string, string> = {
  "In progress": "var(--blue-wash)",
  Scheduled: "var(--amber-wash)",
  Assigned: "var(--green-wash)",
  New: "var(--slate-wash)",
  Resolved: "var(--green-wash)",
}

// June 2026 calendar helpers
const JUNE_DAYS = 30
const JUNE_START_DOW = 1 // June 1, 2026 is a Monday

function calDay(day: number): number {
  return day - 1 // 0-indexed offset
}

function TasksByDay(day: number): Task[] {
  return TASKS.filter((t) => t.dueDay === day - 1 || (day === 1 && t.dueDay === 0))
}

function GanttBar({ task, weeks }: { task: Task; weeks: number }) {
  const leftPct = (task.gs / weeks) * 100
  const widthPct = (task.gl / weeks) * 100
  const color = PRI_COLOR[task.pri] ?? "var(--blue)"

  return (
    <div
      style={{ position: "relative", height: 20, background: "var(--surface-2)", borderRadius: 4, overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          left: `${leftPct}%`,
          width: `${widthPct}%`,
          top: 0,
          bottom: 0,
          background: color,
          borderRadius: 4,
          opacity: 0.8,
          minWidth: 4,
        }}
      />
    </div>
  )
}

export default function Tasks() {
  const [activeTab, setActiveTab] = useState<TabKey>("list")

  const openCount = TASKS.filter((t) => t.status !== "Resolved").length
  const critCount = TASKS.filter((t) => t.pri === "Critical").length
  const inProgressCount = TASKS.filter((t) => t.status === "In progress").length
  const scheduledCount = TASKS.filter((t) => t.status === "Scheduled").length
  const backlogCount = TASKS.filter((t) => t.status === "New").length

  const WEEKS = 8
  const weekLabels = Array.from({ length: WEEKS }, (_, i) => `Wk ${i + 1}`)

  // Calendar grid: 5 rows of 7 days
  const calCells: (number | null)[] = [
    ...Array(JUNE_START_DOW).fill(null),
    ...Array.from({ length: JUNE_DAYS }, (_, i) => i + 1),
  ]
  while (calCells.length % 7 !== 0) calCells.push(null)

  return (
    <Screen>
      <ScreenHead
        ico="tasks"
        title="Work & Tasks"
        sub="AI-generated work orders, field assignments and grant application tasks — unified across departments."
        color="var(--blue)"
        actions={
          <button className="btn" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="plus" size={14} />
            New work order
          </button>
        }
      />

      {/* Stat tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
        <Stat label="Open" value={openCount} sub="work orders" c="var(--ink)" />
        <Stat label="Critical" value={critCount} sub="urgent priority" c="var(--red)" />
        <Stat label="In progress" value={inProgressCount} sub="currently active" c="var(--blue)" />
        <Stat label="Scheduled" value={scheduledCount} sub="upcoming" c="var(--amber)" />
        <Stat label="Backlog" value={backlogCount} sub="unassigned" c="var(--slate)" />
      </div>

      {/* Tab switcher */}
      <div style={{ display: "flex", gap: 0 }}>
        <div
          style={{
            display: "inline-flex",
            background: "var(--surface)",
            border: "1px solid var(--rule)",
            borderRadius: 100,
            padding: 3,
            gap: 2,
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12.5,
                fontWeight: 600,
                padding: "6px 18px",
                borderRadius: 100,
                border: "none",
                background: activeTab === tab.key ? "var(--blue)" : "transparent",
                color: activeTab === tab.key ? "#fff" : "var(--ink-soft)",
                cursor: "pointer",
                transition: "all .15s ease",
              }}
            >
              <Icon name={tab.icon} size={13} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "list" && (
        <div className="surface" style={{ overflow: "hidden" }}>
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "90px 90px 1.6fr 1fr 1fr 90px 110px",
              gap: 0,
              padding: "10px 18px",
              background: "var(--surface-2)",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            {["Priority", "ID", "Task", "Department", "Assignee", "Due", "Status"].map((h) => (
              <div key={h} className="cap" style={{ padding: "0 8px" }}>
                {h}
              </div>
            ))}
          </div>
          {TASKS.map((task) => (
            <div
              key={task.id}
              style={{
                display: "grid",
                gridTemplateColumns: "90px 90px 1.6fr 1fr 1fr 90px 110px",
                gap: 0,
                padding: "11px 18px",
                borderBottom: "1px solid var(--rule-soft)",
                alignItems: "center",
              }}
            >
              <div style={{ padding: "0 8px" }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: PRI_COLOR[task.pri] ?? "var(--ink)",
                  }}
                >
                  {task.pri}
                </span>
              </div>
              <div style={{ padding: "0 8px" }}>
                <span className="mono" style={{ fontSize: 11.5, color: "var(--blue)" }}>
                  {task.id}
                </span>
              </div>
              <div style={{ padding: "0 8px" }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)", lineHeight: 1.4 }}>
                  {task.title}
                </div>
                <div style={{ fontSize: 10.5, color: "var(--ink-faint)", marginTop: 1 }}>{task.source}</div>
              </div>
              <div style={{ padding: "0 8px", fontSize: 12.5, color: "var(--ink-soft)" }}>{task.dept}</div>
              <div style={{ padding: "0 8px", fontSize: 12.5, color: "var(--ink)" }}>{task.assignee}</div>
              <div style={{ padding: "0 8px", fontSize: 12.5, color: "var(--ink-soft)" }}>{task.due}</div>
              <div style={{ padding: "0 8px" }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 100,
                    background: STATUS_BG[task.status] ?? "var(--slate-wash)",
                    color: "var(--ink-soft)",
                  }}
                >
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "calendar" && (
        <div className="surface" style={{ overflow: "hidden" }}>
          <div
            style={{
              padding: "12px 18px",
              borderBottom: "1px solid var(--rule)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span className="panel-title">June 2026</span>
            <span className="code">Work orders due</span>
          </div>
          {/* Day headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              background: "var(--surface-2)",
              borderBottom: "1px solid var(--rule-soft)",
            }}
          >
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div
                key={d}
                style={{
                  padding: "8px",
                  textAlign: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--ink-faint)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {d}
              </div>
            ))}
          </div>
          {/* Calendar cells */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
            {calCells.map((day, idx) => {
              const dayTasks = day ? TASKS.filter((t) => t.dueDay === day - 1 || (day === 1 && t.dueDay === 0)) : []
              return (
                <div
                  key={idx}
                  style={{
                    minHeight: 72,
                    padding: "6px 8px",
                    borderRight: "1px solid var(--rule-soft)",
                    borderBottom: "1px solid var(--rule-soft)",
                    background: day === 30 ? "var(--blue-wash)" : "transparent",
                  }}
                >
                  {day && (
                    <>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: day === 30 ? 700 : 500,
                          color: day === 30 ? "var(--blue)" : "var(--ink-soft)",
                          marginBottom: 4,
                        }}
                      >
                        {day}
                      </div>
                      {dayTasks.map((t) => (
                        <div
                          key={t.id}
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: PRI_COLOR[t.pri] ?? "var(--blue)",
                            color: "#fff",
                            marginBottom: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={t.title}
                        >
                          {t.id}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === "gantt" && (
        <div className="surface" style={{ overflow: "auto" }}>
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `240px repeat(${WEEKS}, 1fr)`,
              background: "var(--surface-2)",
              borderBottom: "1px solid var(--rule)",
              minWidth: 700,
            }}
          >
            <div className="cap" style={{ padding: "10px 18px" }}>
              Task
            </div>
            {weekLabels.map((w) => (
              <div
                key={w}
                className="cap"
                style={{ padding: "10px 4px", textAlign: "center", borderLeft: "1px solid var(--rule-soft)" }}
              >
                {w}
              </div>
            ))}
          </div>
          {TASKS.map((task) => (
            <div
              key={task.id}
              style={{
                display: "grid",
                gridTemplateColumns: `240px repeat(${WEEKS}, 1fr)`,
                borderBottom: "1px solid var(--rule-soft)",
                alignItems: "center",
                minWidth: 700,
              }}
            >
              <div style={{ padding: "10px 18px" }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink)" }}>{task.title}</div>
                <div style={{ fontSize: 10.5, color: "var(--ink-faint)", marginTop: 1 }}>{task.assignee}</div>
              </div>
              {weekLabels.map((_, wi) => (
                <div
                  key={wi}
                  style={{
                    padding: "10px 4px",
                    borderLeft: "1px solid var(--rule-soft)",
                  }}
                >
                  {task.gs <= wi && wi < task.gs + task.gl && (
                    <div
                      style={{
                        height: 18,
                        borderRadius: 4,
                        background: PRI_COLOR[task.pri] ?? "var(--blue)",
                        opacity: 0.75,
                        width: "100%",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </Screen>
  )
}
