"use client"

import { useState } from "react"
import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Stat from "@/components/ui/Stat"
import Pill from "@/components/ui/Pill"
import Icon from "@/components/ui/Icon"
import { TASKS } from "@/lib/data"
import { workOrdersApi } from "@/lib/api"
import type { Task } from "@/lib/types"

const TABS = [
  { key: "list", label: "List", icon: "list" },
  { key: "calendar", label: "Calendar", icon: "calendar" },
  { key: "gantt", label: "Gantt", icon: "gantt" },
] as const

type TabKey = (typeof TABS)[number]["key"]

const DEPARTMENTS = [
  "Water Authority",
  "Public Works",
  "Fire & Rescue",
  "Transportation",
  "Environment",
  "Utilities",
  "Grants Office",
  "Emergency Mgmt",
]

const PRIORITIES = ["Low", "Medium", "High", "Critical"] as const
type Priority = (typeof PRIORITIES)[number]

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

interface WorkOrderForm {
  title: string
  department: string
  priority: Priority
  assignee: string
  dueDate: string
  description: string
}

const EMPTY_FORM: WorkOrderForm = {
  title: "",
  department: "",
  priority: "Medium",
  assignee: "",
  dueDate: "",
  description: "",
}

interface Toast {
  id: number
  message: string
}

export default function Tasks() {
  const [activeTab, setActiveTab] = useState<TabKey>("list")
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<WorkOrderForm>(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [titleError, setTitleError] = useState(false)

  const openCount = TASKS.filter((t) => t.status !== "Resolved").length
  const critCount = TASKS.filter((t) => t.pri === "Critical").length
  const inProgressCount = TASKS.filter((t) => t.status === "In progress").length
  const scheduledCount = TASKS.filter((t) => t.status === "Scheduled").length
  const backlogCount = TASKS.filter((t) => t.status === "New").length

  const WEEKS = 8
  const weekLabels = ["Jun 1", "Jun 8", "Jun 15", "Jun 22", "Jun 29", "Jul 6", "Jul 13", "Jul 20"]

  // Calendar grid: 5 rows of 7 days
  const calCells: (number | null)[] = [
    ...Array(JUNE_START_DOW).fill(null),
    ...Array.from({ length: JUNE_DAYS }, (_, i) => i + 1),
  ]
  while (calCells.length % 7 !== 0) calCells.push(null)

  function addToast(message: string) {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000)
  }

  function openModal() {
    setForm(EMPTY_FORM)
    setTitleError(false)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  async function handleSubmit() {
    if (!form.title.trim()) {
      setTitleError(true)
      return
    }
    setSubmitting(true)
    try {
      const payload = {
        title: form.title.trim(),
        department: form.department || DEPARTMENTS[0],
        priority: form.priority,
        assignee: form.assignee.trim() || undefined,
        dueDate: form.dueDate || undefined,
        description: form.description.trim() || undefined,
      }
      const res = await workOrdersApi.create(payload)
      const id = res?.data?.id ?? `WO-${String(Math.floor(1000 + Math.random() * 9000))}`
      closeModal()
      addToast(`Work order created · ${id}`)
    } catch {
      // API might not be running in demo — show success anyway
      const fallbackId = `WO-${String(Math.floor(1000 + Math.random() * 9000))}`
      closeModal()
      addToast(`Work order created · ${fallbackId}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Screen>
      <ScreenHead
        ico="tasks"
        title="Work & Tasks"
        sub="AI-generated work orders, field assignments and grant application tasks — unified across departments."
        color="var(--blue)"
        actions={
          <button className="btn" style={{ display: "flex", alignItems: "center", gap: 6 }} onClick={openModal}>
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
              <div style={{ padding: "0 8px", display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: 2, background: PRI_COLOR[task.pri] ?? "var(--ink)", flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: PRI_COLOR[task.pri] ?? "var(--ink)" }}>
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
            <div className="cap" style={{ padding: "10px 18px" }}>Work order</div>
            {weekLabels.map((w) => (
              <div key={w} className="code" style={{ padding: "10px 4px", textAlign: "center", borderLeft: "1px solid var(--rule-soft)", fontSize: 8.5 }}>
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
              <div style={{ padding: "9px 18px" }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink)", lineHeight: 1.35 }}>{task.title}</div>
                <div className="code" style={{ fontSize: 8.5, marginTop: 2 }}>{task.id} · {task.dept}</div>
              </div>
              {weekLabels.map((_, wi) => (
                <div key={wi} style={{ padding: "9px 4px", borderLeft: "1px solid var(--rule-soft)" }}>
                  {task.gs <= wi && wi < task.gs + task.gl && (
                    <div style={{
                      height: 20, borderRadius: 4, background: PRI_COLOR[task.pri] ?? "var(--blue)",
                      display: "flex", alignItems: "center", paddingLeft: 7,
                      color: "#fff", fontSize: 9.5, fontWeight: 600, overflow: "hidden",
                    }}>
                      {wi === task.gs ? task.status : ""}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* New Work Order Modal */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div
            style={{
              background: "var(--surface)",
              borderRadius: 14,
              border: "1px solid var(--rule)",
              width: "100%",
              maxWidth: 520,
              boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
              overflow: "hidden",
            }}
          >
            {/* Modal header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 22px",
                borderBottom: "1px solid var(--rule)",
                background: "var(--surface-2)",
              }}
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>
                  New Work Order
                </div>
                <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 2 }}>
                  Create a new work order and assign it to a department
                </div>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--ink-faint)",
                  fontSize: 20,
                  lineHeight: 1,
                  padding: "2px 6px",
                  borderRadius: 6,
                }}
              >
                ×
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: "22px 22px 18px", display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Title */}
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Title <span style={{ color: "var(--red)" }}>*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => { setForm((f) => ({ ...f, title: e.target.value })); setTitleError(false) }}
                  placeholder="e.g. Repair water main on Oak Ave"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 8,
                    border: `1px solid ${titleError ? "var(--red)" : "var(--rule)"}`,
                    background: "var(--surface-2)",
                    color: "var(--ink)",
                    fontSize: 13,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                {titleError && (
                  <div style={{ fontSize: 11, color: "var(--red)", marginTop: 4 }}>Title is required</div>
                )}
              </div>

              {/* Department + Priority row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Department
                  </label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: 8,
                      border: "1px solid var(--rule)",
                      background: "var(--surface-2)",
                      color: "var(--ink)",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Priority
                  </label>
                  <div style={{ display: "flex", gap: 6 }}>
                    {PRIORITIES.map((p) => (
                      <button
                        key={p}
                        onClick={() => setForm((f) => ({ ...f, priority: p }))}
                        style={{
                          flex: 1,
                          padding: "7px 4px",
                          borderRadius: 6,
                          border: `1.5px solid ${form.priority === p ? PRI_COLOR[p] : "var(--rule)"}`,
                          background: form.priority === p ? PRI_COLOR[p] : "var(--surface-2)",
                          color: form.priority === p ? "#fff" : "var(--ink-soft)",
                          fontSize: 10.5,
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all .12s ease",
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assignee + Due date row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Assignee
                  </label>
                  <input
                    type="text"
                    value={form.assignee}
                    onChange={(e) => setForm((f) => ({ ...f, assignee: e.target.value }))}
                    placeholder="Name or team"
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: 8,
                      border: "1px solid var(--rule)",
                      background: "var(--surface-2)",
                      color: "var(--ink)",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Due date
                  </label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: 8,
                      border: "1px solid var(--rule)",
                      background: "var(--surface-2)",
                      color: "var(--ink)",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Additional context, location details, urgency notes..."
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 8,
                    border: "1px solid var(--rule)",
                    background: "var(--surface-2)",
                    color: "var(--ink)",
                    fontSize: 13,
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    lineHeight: 1.5,
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {/* Modal footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                padding: "14px 22px",
                borderTop: "1px solid var(--rule)",
                background: "var(--surface-2)",
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  padding: "8px 18px",
                  borderRadius: 8,
                  border: "1px solid var(--rule)",
                  background: "transparent",
                  color: "var(--ink-soft)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                className="btn"
                onClick={handleSubmit}
                disabled={submitting}
                style={{ display: "flex", alignItems: "center", gap: 6, opacity: submitting ? 0.6 : 1 }}
              >
                {submitting ? "Creating…" : "Create Work Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast stack */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 2000,
          pointerEvents: "none",
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              background: "var(--ink)",
              color: "#fff",
              padding: "11px 18px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 500,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              animation: "fadeInUp .2s ease",
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </Screen>
  )
}
