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
import Card from "@/components/ui/Card"
import { PROJECTS, ASSETS } from "@/lib/data"
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

// ─── Risk → project pipeline (PRD §9) ────────────────────────────────────────
// Concrete worked example, grounded in the live data: predicted-failure main
// MX-118 (asset WTR-2207, 82% failure) becomes funded capital project CP-118.
type PipeStage = {
  code: string
  label: string
  value: string
  detail: string
  ico: string
  color: string
  wash: string
}

const PIPE_STAGES: PipeStage[] = [
  { code: "Asset", label: "Detected risk", value: "MX-118", detail: "Trunk main · Riverside", ico: "water", color: "var(--red)", wash: "var(--red-wash)" },
  { code: "Model", label: "Failure probability", value: "82%", detail: "≤90-day window", ico: "warning", color: "var(--red)", wash: "var(--red-wash)" },
  { code: "Cost", label: "Cost estimate", value: "$2.4M", detail: "vs ~$2.1M reactive", ico: "capital", color: "var(--amber)", wash: "var(--amber-wash)" },
  { code: "Funding", label: "Funding source", value: "80% match", detail: "State Water Resilience Fund", ico: "shield", color: "var(--blue)", wash: "var(--blue-wash)" },
  { code: "Draft", label: "Grant draft", value: "Ready", detail: "Narrative + budget + KPIs", ico: "exports", color: "var(--green)", wash: "var(--green-wash)" },
  { code: "Project", label: "Capital project", value: "CP-118", detail: "Shovel-ready · Jun 28", ico: "check", color: "var(--green)", wash: "var(--green-wash)" },
]

function PipeArrow() {
  return (
    <div
      className="pipe-arrow"
      aria-hidden="true"
      style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-ghost)", flexShrink: 0 }}
    >
      <Icon name="arrowR" size={18} />
    </div>
  )
}

function StageCard({ stage, isLast }: { stage: PipeStage; isLast: boolean }) {
  return (
    <div
      className="surface-flat"
      style={{
        flex: "1 1 150px",
        minWidth: 0,
        padding: "12px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        borderLeft: `3px solid ${stage.color}`,
        borderTopLeftRadius: isLast ? "var(--r)" : "var(--r-sm)",
        borderBottomLeftRadius: isLast ? "var(--r)" : "var(--r-sm)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            background: stage.wash,
            color: stage.color,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <Icon name={stage.ico} size={14} />
        </span>
        <span className="cap" style={{ fontSize: 9.5, lineHeight: 1.2 }}>{stage.code}</span>
      </div>
      <div>
        <div style={{ fontSize: 10.5, color: "var(--ink-faint)", fontWeight: 600, marginBottom: 3 }}>
          {stage.label}
        </div>
        <div className="serif" style={{ fontSize: 17, fontWeight: 700, color: stage.color, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          {stage.value}
        </div>
      </div>
      <div style={{ fontSize: 10.5, color: "var(--ink-soft)", lineHeight: 1.35 }}>{stage.detail}</div>
    </div>
  )
}

function RiskPipeline({ onOpen }: { onOpen: () => void }) {
  return (
    <Card
      title="Risk → project pipeline"
      code="AI"
      right={
        <span style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>
          Transforms detected problems into funded capital projects
        </span>
      }
      pad
    >
      <div
        role="list"
        aria-label="Risk to capital-project pipeline: MX-118 detected risk, 82% failure probability, $2.4M cost estimate, State Water Resilience Fund 80% match, grant draft ready, capital project CP-118"
        style={{ display: "flex", alignItems: "stretch", gap: 6, flexWrap: "wrap" }}
      >
        {PIPE_STAGES.map((stage, i) => (
          <div
            role="listitem"
            key={stage.code}
            style={{ display: "contents" }}
          >
            <StageCard stage={stage} isLast={i === PIPE_STAGES.length - 1} />
            {i < PIPE_STAGES.length - 1 && <PipeArrow />}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <p style={{ margin: 0, fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.5, maxWidth: 560 }}>
          The water model flagged trunk main <strong className="mono" style={{ color: "var(--ink)" }}>MX-118</strong> as a predicted failure.
          CityPULSE matched it to a grant program, drafted the funder-ready package, and staged it as capital project{" "}
          <strong className="mono" style={{ color: "var(--green)" }}>CP-118</strong> — shovel-ready before a reactive rupture.
        </p>
        <button
          className="btn btn-ghost"
          onClick={onOpen}
          style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, flexShrink: 0 }}
        >
          <Icon name="external" size={13} />
          Open CP-118
        </button>
      </div>
    </Card>
  )
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

  // Funder share = each project's cost × its grant match%, summed across the pipeline.
  const grantAvailable = projects.reduce((sum, p) => {
    const cost = parseFloat(p.cost.replace("$", "").replace("M", "")) || 0
    const match = parseFloat(p.match.replace("%", "")) || 0
    return sum + cost * (match / 100)
  }, 0)

  return (
    <Screen>
      <ScreenHead
        ico="capital"
        title="Capital & Grants"
        sub="Grant-eligible projects identified by the AI — ranked by funding probability, urgency and climate/safety/equity scores."
      />

      {/* Risk → project pipeline (PRD §9) */}
      <RiskPipeline onOpen={() => { const cp118 = projects.find((p) => p.id === "CP-118"); if (cp118) setDetail({ type: "project", data: cp118 }) }} />

      {/* Pipeline summary stat strip */}
      <div className="grid-4" style={{ gap: 12 }}>
        <Stat label="Detected risks" value={ASSETS.length} sub="assets under AI watch" c="var(--red)" />
        <Stat label="Converted to projects" value={projects.length} sub="risks staged as capital" c="var(--blue)" />
        <Stat label="$ pipeline" value={`$${totalCost.toFixed(1)}M`} sub="estimated project cost" c="var(--ink)" />
        <Stat label="Grant $ available" value={`$${grantAvailable.toFixed(1)}M`} sub="matched funder share" c="var(--green)" />
      </div>

      {/* Summary stats */}
      <div className="grid-3" style={{ gap: 12 }}>
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
