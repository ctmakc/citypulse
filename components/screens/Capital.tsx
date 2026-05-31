"use client"

import { useState, useEffect } from "react"
import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Stat from "@/components/ui/Stat"
import Pill from "@/components/ui/Pill"
import Donut from "@/components/ui/Donut"
import Icon from "@/components/ui/Icon"
import EmptyState from "@/components/ui/EmptyState"
import Skeleton from "@/components/ui/Skeleton"
import { PROJECTS } from "@/lib/data"
import { capitalApi, isLoggedIn } from "@/lib/api"
import { usePortalStore } from "@/lib/store"
import type { Project } from "@/lib/types"

// Skeleton shaped like a project card, shown during in-flight fetch
function ProjectCardSkeleton() {
  return (
    <div className="surface" style={{ padding: 0, overflow: "hidden" }} aria-hidden="true">
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 20px 12px", borderBottom: "1px solid var(--rule-soft)", background: "var(--surface-2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Skeleton w={60} h={12} />
          <Skeleton w={70} h={18} rounded />
          <Skeleton w={80} h={18} rounded />
        </div>
        <Skeleton w={44} h={44} rounded />
      </div>
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        <Skeleton w="70%" h={18} />
        <Skeleton w="90%" h={12} />
        <Skeleton w="55%" h={12} />
      </div>
    </div>
  )
}

const SCORE_COLOR: Record<string, string> = {
  High: "var(--green)",
  Med: "var(--amber)",
  Low: "var(--slate)",
}

const SCORE_DOT_BG: Record<string, string> = {
  High: "var(--green-wash)",
  Med: "var(--amber-wash)",
  Low: "var(--slate-wash)",
}

const URGENCY_DONUT_COLOR: Record<string, string> = {
  Immediate: "var(--red)",
  High: "var(--amber)",
  Medium: "var(--blue)",
  Low: "var(--slate)",
}

export default function Capital() {
  const setDetail = usePortalStore((s) => s.setDetail)
  const [projects, setProjects] = useState<Project[]>(PROJECTS)
  // Skeletons only while an authenticated fetch is in flight; demo shows static data instantly.
  const [loading, setLoading] = useState(() => isLoggedIn())

  useEffect(() => {
    if (!isLoggedIn()) return
    setLoading(true)
    capitalApi.list()
      .then((res) => {
        if (Array.isArray(res.data)) setProjects(res.data as Project[])
        else if (Array.isArray(res.data?.projects)) setProjects(res.data.projects as Project[])
      })
      .catch(() => {}) // silent fail — keep static data
      .finally(() => setLoading(false))
  }, [])

  const totalCost = projects.reduce((sum, p) => {
    const num = parseFloat(p.cost.replace("$", "").replace("M", ""))
    return sum + num
  }, 0)

  return (
    <Screen>
      <ScreenHead
        ico="capital"
        title="Capital & Grants"
        sub="Grant-eligible projects identified by the AI — ranked by funding probability, urgency and climate/safety/equity scores."
      />

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        <Stat label="Grant-eligible projects" value={projects.length} sub="AI-identified" c="var(--blue)" />
        <Stat label="Total pipeline" value={`$${totalCost.toFixed(1)}M`} sub="estimated project cost" c="var(--green)" />
        <Stat label="Nearest deadline" value="Jun 28" sub="CP-118 · State Water Fund" c="var(--amber)" />
      </div>

      {/* Project cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }} aria-busy={loading}>
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <ProjectCardSkeleton key={i} />)
        ) : projects.length === 0 ? (
          <EmptyState title="No matching records" sub="Try adjusting your filters" />
        ) : projects.map((proj) => (
          <div
            key={proj.id}
            className="surface lift"
            style={{ padding: 0, overflow: "hidden" }}
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px 12px",
                borderBottom: "1px solid var(--rule-soft)",
                background: "var(--surface-2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="mono" style={{ fontSize: 12, color: "var(--blue)" }}>
                  {proj.id}
                </span>
                <Pill sev={proj.urgency}>{proj.urgency}</Pill>
                <span
                  style={{
                    fontSize: 11.5,
                    color: "var(--ink-faint)",
                    background: "var(--slate-wash)",
                    padding: "2px 8px",
                    borderRadius: 100,
                  }}
                >
                  {proj.ready}
                </span>
              </div>
              <Donut
                v={proj.prob}
                size={44}
                color={URGENCY_DONUT_COLOR[proj.urgency] ?? "var(--blue)"}
                label="match"
              />
            </div>

            {/* Card body */}
            <div style={{ padding: "16px 20px" }}>
              <h2
                className="serif"
                style={{
                  margin: "0 0 8px",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                }}
              >
                {proj.title}
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 12,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>
                  <strong style={{ color: "var(--ink)" }}>{proj.program}</strong>
                </span>
                <span style={{ fontSize: 12.5, color: "var(--green)", fontWeight: 700 }}>
                  {proj.match} federal match
                </span>
                <span
                  style={{
                    fontSize: 12.5,
                    color: "var(--amber)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Icon name="calendar" size={13} />
                  Deadline: {proj.deadline}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--mono)" }}>
                  {proj.cost}
                </span>
              </div>

              {/* Climate / Safety / Equity badges */}
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {[
                  { label: "Climate", val: proj.climate },
                  { label: "Safety", val: proj.safety },
                  { label: "Equity", val: proj.equity },
                ].map(({ label, val }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "4px 10px",
                      borderRadius: 100,
                      background: SCORE_DOT_BG[val] ?? "var(--slate-wash)",
                    }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: SCORE_COLOR[val] ?? "var(--slate)",
                      }}
                    />
                    <span style={{ fontSize: 11, fontWeight: 600, color: SCORE_COLOR[val] ?? "var(--slate)" }}>
                      {label}: {val}
                    </span>
                  </div>
                ))}
              </div>

              <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.55 }}>
                {proj.note}
              </p>

              <button
                className="btn btn-ghost"
                onClick={() => setDetail({ type: "project", data: proj })}
                style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5 }}
              >
                <Icon name="external" size={13} />
                Open project
              </button>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  )
}
