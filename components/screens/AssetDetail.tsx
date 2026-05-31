"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Screen from "@/components/ui/Screen"
import Icon from "@/components/ui/Icon"
import Pill from "@/components/ui/Pill"
import RecRow from "@/components/ui/RecRow"
import Readouts from "@/components/charts/Readouts"
import ArcGauge from "@/components/charts/ArcGauge"
import AreaChart from "@/components/charts/AreaChart"
import Skeleton from "@/components/ui/Skeleton"
import EmptyState from "@/components/ui/EmptyState"
import { ASSETS } from "@/lib/data"
import { assetsApi, isLoggedIn } from "@/lib/api"
import { usePortalStore } from "@/lib/store"
import type { Asset } from "@/lib/types"

/* ─── Domain helpers ──────────────────────────────────────────────────────── */

// Map asset type string → icon name (mirrors the drawer peek view).
function assetIcon(type: string): string {
  const t = (type || "").toLowerCase()
  if (t.includes("bridge")) return "layers"
  if (t.includes("road")) return "traffic"
  if (t.includes("water")) return "water"
  if (t.includes("hydrant")) return "flood"
  if (t.includes("streetlight")) return "sparkles"
  if (t.includes("signal")) return "bell"
  if (t.includes("pump")) return "water"
  if (t.includes("building")) return "capital"
  return "assets"
}

function condColor(cond: number): string {
  return cond >= 75 ? "var(--green)" : cond >= 55 ? "var(--amber)" : "var(--red)"
}

function condRating(cond: number): string {
  return cond >= 75 ? "Good" : cond >= 55 ? "Fair" : "Poor"
}

function probColor(prob: number): string {
  return prob >= 50 ? "var(--red)" : prob >= 20 ? "var(--amber)" : "var(--green)"
}

function probNum(prob: string | number | undefined): number {
  if (typeof prob === "number") return prob
  return parseFloat(String(prob ?? "0")) || 0
}

/* ─── View model ──────────────────────────────────────────────────────────── */

interface Inspection {
  date: string
  inspector: string
  condition: number
  notes: string
}
interface Incident {
  id: string
  title: string
  severity: string
  status: string
  date: string
}
interface LinkedWorkOrder {
  id: string
  title: string
  dept: string
  priority: string
  status: string
}
interface AssetDoc {
  name: string
  kind: string
  size: string
  uploaded: string
}
interface AssetView {
  id: string
  externalId: string
  type: string
  name: string
  where: string
  dept: string
  cond: number
  failureProb: number
  risk: string
  replacementCost: string
  lastInspected: string
  installed: string
  material: string
  trend: number[]
  inspections: Inspection[]
  incidents: Incident[]
  workOrders: LinkedWorkOrder[]
  documents: AssetDoc[]
}

// Derive a stable, plausible condition trend ending at the current condition.
function deriveTrend(cond: number, risk: string): number[] {
  const drop = risk === "Critical" ? 11 : risk === "Elevated" ? 6 : risk === "Watch" ? 3 : 1
  const start = Math.min(100, cond + drop)
  const out: number[] = []
  const n = 10
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1)
    // Gentle accelerating decline toward `cond`.
    const v = start - (start - cond) * Math.pow(t, 1.25)
    out.push(Math.round(v))
  }
  out[out.length - 1] = cond
  return out
}

const REPLACEMENT_COST: Record<string, string> = {
  "water main": "$2.4M",
  bridge: "$4.8M",
  "road segment": "$1.2M",
  signal: "$0.3M",
  "pump station": "$1.6M",
  hydrant: "$0.04M",
  streetlight: "$0.08M",
  "public building": "$6.2M",
}

// Build the demo-side detail data from a base Asset (used as fallback + to fill
// fields the API doesn't return yet so all six tabs always render).
function deriveDetail(base: Asset): AssetView {
  const cond = base.cond
  const failureProb = probNum(base.prob)
  const typeKey = (base.type || "").toLowerCase()
  const risk = base.risk

  const inspections: Inspection[] =
    risk === "OK"
      ? [
          { date: "2026-03-18", inspector: "G. Navarro", condition: cond, notes: "Routine inspection — within normal parameters." },
          { date: "2025-09-02", inspector: "M. Okafor", condition: Math.min(100, cond + 2), notes: "No defects observed." },
        ]
      : [
          { date: "2026-04-22", inspector: "G. Navarro", condition: cond, notes: risk === "Critical" ? "Pre-failure transients detected at two joints; corrosivity elevated." : "Condition trending down; recommend follow-up within 30 days." },
          { date: "2025-11-14", inspector: "D. Walsh", condition: Math.min(100, cond + (risk === "Critical" ? 9 : 5)), notes: "Surface wear noted; monitor." },
          { date: "2025-05-30", inspector: "M. Okafor", condition: Math.min(100, cond + (risk === "Critical" ? 16 : 9)), notes: "Baseline structural assessment." },
        ]

  const incidents: Incident[] =
    risk === "Critical"
      ? [
          { id: `INC-${base.id}-2`, title: "Pressure anomaly — joint 4B", severity: "Critical", status: "Open", date: "2026-05-29" },
          { id: `INC-${base.id}-1`, title: "Acoustic leak signature detected", severity: "Elevated", status: "Investigating", date: "2026-05-21" },
        ]
      : risk === "Elevated"
      ? [{ id: `INC-${base.id}-1`, title: "Condition index crossed grant threshold", severity: "Elevated", status: "Open", date: "2026-05-27" }]
      : []

  const workOrders: LinkedWorkOrder[] =
    risk === "Critical"
      ? [
          { id: `WO-${base.id.replace(/\D/g, "") || "2207"}`, title: `Emergency inspection — ${base.name}`, dept: base.dept, priority: "Critical", status: "In progress" },
        ]
      : risk === "Elevated"
      ? [{ id: `WO-${base.id.replace(/\D/g, "") || "0072"}`, title: `Tier-2 inspection — ${base.name}`, dept: base.dept, priority: "High", status: "Scheduled" }]
      : []

  const documents: AssetDoc[] = [
    { name: `${base.id} — as-built drawings.pdf`, kind: "Drawing", size: "4.2 MB", uploaded: "2024-08-12" },
    { name: `${base.id} — latest inspection report.pdf`, kind: "Report", size: "1.1 MB", uploaded: inspections[0]?.date ?? "2026-04-22" },
    ...(risk !== "OK" ? [{ name: `${base.id} — condition assessment.xlsx`, kind: "Data", size: "320 KB", uploaded: "2026-04-23" }] : []),
  ]

  return {
    id: base.id,
    externalId: base.id,
    type: base.type,
    name: base.name,
    where: base.where,
    dept: base.dept,
    cond,
    failureProb,
    risk,
    replacementCost: REPLACEMENT_COST[typeKey] ?? "$1.0M",
    lastInspected: inspections[0]?.date ?? "—",
    installed: risk === "Critical" ? "1974" : risk === "Elevated" ? "1986" : "2004",
    material: typeKey.includes("water") || typeKey.includes("pump")
      ? "Cast iron"
      : typeKey.includes("bridge")
      ? "Reinforced concrete"
      : typeKey.includes("road")
      ? "Asphalt"
      : "Mixed",
    trend: deriveTrend(cond, risk),
    inspections,
    incidents,
    workOrders,
    documents,
  }
}

// Merge an API payload over the derived demo detail. The API may already carry
// rich arrays (inspections/incidents/workOrders/documents/readings); if so we
// prefer them, otherwise the derived demo values keep every tab populated.
function mergeApi(base: Asset, api: Record<string, unknown> | null): AssetView {
  const view = deriveDetail(base)
  if (!api) return view
  const pick = <T,>(k: string, fallback: T): T => (api[k] != null ? (api[k] as T) : fallback)
  const num = (k: string, fallback: number) => {
    const v = api[k]
    if (v == null) return fallback
    return typeof v === "number" ? v : parseFloat(String(v)) || fallback
  }

  return {
    ...view,
    externalId: pick("externalId", pick("external_id", view.externalId)),
    type: pick("type", view.type),
    name: pick("name", view.name),
    where: pick("district", pick("where", view.where)),
    dept: pick("department", pick("dept", view.dept)),
    cond: num("condition", num("cond", view.cond)),
    failureProb: num("failureProb", num("failure_prob", view.failureProb)),
    risk: pick("risk", view.risk),
    replacementCost: pick("replacementCost", pick("replacement_cost", view.replacementCost)),
    lastInspected: pick("lastInspected", pick("last_inspected", view.lastInspected)),
    installed: pick("installed", pick("installYear", view.installed)),
    material: pick("material", view.material),
    inspections: Array.isArray(api.inspections) && api.inspections.length ? (api.inspections as Inspection[]) : view.inspections,
    incidents: Array.isArray(api.incidents) && api.incidents.length ? (api.incidents as Incident[]) : view.incidents,
    workOrders: Array.isArray(api.workOrders) && (api.workOrders as unknown[]).length ? (api.workOrders as LinkedWorkOrder[]) : view.workOrders,
    documents: Array.isArray(api.documents) && api.documents.length ? (api.documents as AssetDoc[]) : view.documents,
  }
}

/* ─── AI risk explanation (derived from condition + failureProb + type) ─────── */

function aiExplanation(v: AssetView): string {
  const t = v.type.toLowerCase()
  if (v.risk === "Critical") {
    // Mirrors the design's water-main narrative, generalised by type.
    if (t.includes("water")) {
      return `${v.name} sits in a predicted-failure window: condition index ${v.cond}/100 with a ${Math.round(v.failureProb)}% probability of failure inside 90 days. Soil-corrosivity is elevated and two joints show pre-failure pressure transients. A reactive rupture here would cost an estimated ${v.replacementCost} versus a fraction of that for a planned inspection and staged replacement, so an emergency inspection is the recommended next step.`
    }
    return `${v.name} is in a critical condition band (${v.cond}/100) with a ${Math.round(v.failureProb)}% modelled failure probability. Recent sensor and inspection signals are trending the wrong way, and a reactive failure would carry a materially higher cost (≈${v.replacementCost}) than a planned intervention. An emergency inspection and work order are recommended.`
  }
  if (v.risk === "Elevated") {
    return `${v.name} is trending below safe thresholds (condition ${v.cond}/100, ${Math.round(v.failureProb)}% failure probability). It has crossed a level where a scheduled Tier-2 inspection within 30 days is warranted, and it may now qualify for a state rehabilitation grant — worth assessing before the condition declines further.`
  }
  if (v.risk === "Watch") {
    return `${v.name} is being monitored (condition ${v.cond}/100, ${Math.round(v.failureProb)}% failure probability). It is within tolerance but close enough to thresholds that it stays on the watch list; continue telemetry monitoring and queue a routine inspection.`
  }
  return `${v.name} is operating within normal parameters (condition ${v.cond}/100, ${Math.round(v.failureProb)}% failure probability). No action is required beyond the standard inspection cycle.`
}

// Risk-ranked recommended actions (RecRow inputs).
function recommendedActions(v: AssetView): { text: string; impact: string; c: string }[] {
  if (v.risk === "Critical")
    return [
      { text: `Schedule emergency inspection of ${v.name}`, impact: `Avoids ~${v.replacementCost} reactive repair`, c: "var(--green)" },
      { text: "Stage replacement as a capital / grant project", impact: "Up to 80% state cost share", c: "var(--blue)" },
      { text: "Issue service advisory to affected connections", impact: "Protects downstream customers", c: "var(--amber)" },
    ]
  if (v.risk === "Elevated")
    return [
      { text: `Schedule Tier-2 inspection of ${v.name}`, impact: "Confirms condition before further decline", c: "var(--green)" },
      { text: "Draft grant narrative for rehabilitation", impact: "Newly grant-eligible this cycle", c: "var(--blue)" },
    ]
  if (v.risk === "Watch")
    return [
      { text: "Continue telemetry monitoring", impact: "Early warning on threshold breach", c: "var(--blue)" },
      { text: "Queue for next routine inspection cycle", impact: "Keeps backlog current", c: "var(--slate)" },
    ]
  return [{ text: "Maintain standard inspection cycle", impact: "No elevated risk detected", c: "var(--green)" }]
}

/* ─── Small presentational helpers ────────────────────────────────────────── */

function SectionCard({
  title,
  code,
  children,
}: {
  title: string
  code?: string
  children: React.ReactNode
}) {
  return (
    <div className="surface" style={{ overflow: "hidden" }}>
      <div className="panel-head" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {code && (
            <span
              className="code"
              style={{
                background: "var(--surface-3)",
                border: "1px solid var(--rule)",
                borderRadius: "var(--r-sm)",
                padding: "2px 7px",
              }}
            >
              {code}
            </span>
          )}
          <span className="panel-title">{title}</span>
        </div>
      </div>
      <div style={{ padding: "16px 18px" }}>{children}</div>
    </div>
  )
}

// Generic table used by Inspections / Incidents tabs.
function DataTable({
  heads,
  rows,
  aligns,
}: {
  heads: string[]
  rows: React.ReactNode[][]
  aligns?: ("left" | "right")[]
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
        <thead>
          <tr>
            {heads.map((h, i) => (
              <th
                key={i}
                className="cap"
                style={{
                  textAlign: aligns?.[i] ?? "left",
                  padding: "8px 10px",
                  borderBottom: "1px solid var(--rule)",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? "1px solid var(--rule-soft)" : undefined }}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    textAlign: aligns?.[ci] ?? "left",
                    padding: "10px 10px",
                    color: "var(--ink-soft)",
                    verticalAlign: "top",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─── Tabs ────────────────────────────────────────────────────────────────── */

const TABS = ["Overview", "Inspections", "Sensors", "Incidents", "Work Orders", "Documents"] as const
type TabName = (typeof TABS)[number]

/* ─── Sensors tab (own component — fetches its own readings) ──────────────── */

function SensorsPanel({ id }: { id: string }) {
  const [series, setSeries] = useState<number[] | null>(null)
  const [labels, setLabels] = useState<string[] | undefined>(undefined)
  const [unit, setUnit] = useState<string>("")
  const [metric, setMetric] = useState<string>("Sensor reading")
  const [loading, setLoading] = useState(() => isLoggedIn())
  const [done, setDone] = useState(!isLoggedIn())

  useEffect(() => {
    if (!isLoggedIn()) return
    setLoading(true)
    assetsApi
      .readings(id)
      .then((res) => {
        const d = res.data
        const arr = Array.isArray(d) ? d : Array.isArray(d?.readings) ? d.readings : null
        if (arr && arr.length) {
          const nums = arr
            .map((r: unknown) =>
              typeof r === "number" ? r : Number((r as Record<string, unknown>).value ?? (r as Record<string, unknown>).v),
            )
            .filter((n: number) => !Number.isNaN(n))
          if (nums.length) {
            setSeries(nums)
            const labs = arr
              .map((r: unknown) => (r as Record<string, unknown>)?.t ?? (r as Record<string, unknown>)?.time ?? (r as Record<string, unknown>)?.at)
              .filter(Boolean) as string[]
            if (labs.length === nums.length) setLabels(labs)
          }
          if (d?.unit) setUnit(String(d.unit))
          if (d?.metric) setMetric(String(d.metric))
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
        setDone(true)
      })
  }, [id])

  if (loading)
    return (
      <SectionCard title="Sensor time series" code="TELEMETRY">
        <Skeleton h={120} />
        <div style={{ marginTop: 12 }}>
          <Skeleton w="40%" h={14} />
        </div>
      </SectionCard>
    )

  if (done && (!series || series.length < 2))
    return (
      <SectionCard title="Sensor time series" code="TELEMETRY">
        <EmptyState
          icon="data"
          title="No sensor readings"
          sub="This asset has no connected telemetry, or no readings have been recorded yet."
        />
      </SectionCard>
    )

  const latest = series ? series[series.length - 1] : 0

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, alignItems: "start" }}>
      <SectionCard title="Sensor time series" code="TELEMETRY">
        <AreaChart data={series!} color="var(--blue)" labels={labels} height={150} />
      </SectionCard>
      <SectionCard title="Latest reading" code="LIVE">
        <Readouts
          cols={1}
          items={[
            [metric, `${latest}${unit ? ` ${unit}` : ""}`, "var(--ink)"],
            ["Readings", String(series!.length), "var(--ink-soft)", "in window"],
            ["Min / Max", `${Math.min(...series!)} / ${Math.max(...series!)}`, "var(--ink-soft)"],
          ]}
        />
      </SectionCard>
    </div>
  )
}

/* ─── Main component ──────────────────────────────────────────────────────── */

export default function AssetDetail({ id }: { id: string }) {
  const setToast = usePortalStore((s) => s.setToast)
  const setDetail = usePortalStore((s) => s.setDetail)

  // Static fallback by externalId or id, so the demo always renders.
  const staticBase = useMemo<Asset | undefined>(
    () =>
      ASSETS.find(
        (a) => a.id === id || a.id.toLowerCase() === id.toLowerCase() || a.name.toLowerCase() === id.toLowerCase(),
      ),
    [id],
  )

  const [view, setView] = useState<AssetView | null>(() => (staticBase ? deriveDetail(staticBase) : null))
  const [loading, setLoading] = useState(() => isLoggedIn())
  const [tab, setTab] = useState<TabName>("Overview")
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (!isLoggedIn()) return
    setLoading(true)
    assetsApi
      .get(id)
      .then((res) => {
        const data = (res.data?.asset ?? res.data) as Record<string, unknown>
        if (data && typeof data === "object") {
          // Build a base Asset from the API row (falling back to static where missing).
          const base: Asset = {
            id: String(data.externalId ?? data.id ?? staticBase?.id ?? id),
            type: String(data.type ?? staticBase?.type ?? "Asset"),
            name: String(data.name ?? staticBase?.name ?? id),
            where: String(data.district ?? data.where ?? staticBase?.where ?? "—"),
            cond: Number(data.condition ?? data.cond ?? staticBase?.cond ?? 70),
            prob: String(data.failureProb ?? data.prob ?? staticBase?.prob ?? "0%"),
            dept: String(data.department ?? data.dept ?? staticBase?.dept ?? "—"),
            risk: String(data.risk ?? staticBase?.risk ?? "OK"),
          }
          setView(mergeApi(base, data))
        }
      })
      .catch(() => {
        // Silent fail — keep static fallback (already set if it exists).
      })
      .finally(() => setLoading(false))
  }, [id, staticBase])

  // Keyboard arrow navigation across the tablist.
  function onTabKey(e: React.KeyboardEvent, idx: number) {
    let next = idx
    if (e.key === "ArrowRight") next = (idx + 1) % TABS.length
    else if (e.key === "ArrowLeft") next = (idx - 1 + TABS.length) % TABS.length
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = TABS.length - 1
    else return
    e.preventDefault()
    setTab(TABS[next])
    tabRefs.current[next]?.focus()
  }

  // ── Not found (no static fallback and no successful fetch) ──
  if (!view && !loading) {
    return (
      <Screen>
        <div style={{ paddingTop: 22 }}>
          <Link href="/assets" className="btn btn-ghost" style={{ fontSize: 12, padding: "8px 14px" }}>
            <Icon name="arrowR" size={14} style={{ transform: "rotate(180deg)" }} />
            Back to Asset Registry
          </Link>
        </div>
        <div className="surface" style={{ overflow: "hidden" }}>
          <EmptyState title={`Asset "${id}" not found`} sub="It may have been removed, or the ID is incorrect." />
        </div>
      </Screen>
    )
  }

  // While the very first authenticated fetch is in flight and we have no fallback yet.
  if (!view) {
    return (
      <Screen>
        <div style={{ paddingTop: 22, display: "flex", flexDirection: "column", gap: 18 }}>
          <Skeleton w="280px" h={26} />
          <Skeleton h={150} />
          <Skeleton h={40} />
          <Skeleton h={220} />
        </div>
      </Screen>
    )
  }

  const v = view
  const cColor = condColor(v.cond)
  const recs = recommendedActions(v)

  return (
    <Screen>
      {/* Breadcrumb / back */}
      <div style={{ paddingTop: 22 }}>
        <Link
          href="/assets"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ink-soft)" }}
        >
          <Icon name="arrowR" size={13} style={{ transform: "rotate(180deg)" }} />
          Asset Registry
        </Link>
      </div>

      {/* ── ScreenHead-style header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "2px 0 6px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "var(--r-sm)",
              background: `color-mix(in srgb, ${cColor} 12%, transparent)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: cColor,
              flexShrink: 0,
            }}
          >
            <Icon name={assetIcon(v.type)} size={22} strokeWidth={1.7} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
              <span className="mono" style={{ fontSize: 12, color: "var(--blue)" }}>
                {v.externalId}
              </span>
              <span style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>{v.type}</span>
            </div>
            <h1
              className="serif"
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {v.name}
            </h1>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: "var(--ink-soft)" }}>
              {v.where} · {v.dept}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <Pill sev={v.risk} />
          <button
            className="btn"
            style={{ fontSize: 13 }}
            onClick={() => {
              setToast({ message: `Work order drafted for ${v.externalId}`, type: "success" })
            }}
          >
            <Icon name="tasks" size={15} />
            Create work order
          </button>
        </div>
      </div>

      {/* ── Summary band (SituationBand pattern) ── */}
      <div
        className="surface"
        style={{
          display: "grid",
          gridTemplateColumns: "190px 1fr 1fr",
          gap: 0,
          overflow: "hidden",
        }}
      >
        {/* Gauge */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 12px",
            borderRight: "1px solid var(--rule)",
            gap: 6,
          }}
        >
          <ArcGauge value={v.cond} color={cColor} label="Condition" size={128} />
          <span className="cap" style={{ color: cColor }}>
            {condRating(v.cond)}
          </span>
        </div>

        {/* AI explanation */}
        <div
          style={{
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            borderRight: "1px solid var(--rule)",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="sparkles" size={13} style={{ color: "var(--blue)" }} />
            <span className="cap">Why this asset is at risk</span>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>{aiExplanation(v)}</p>
        </div>

        {/* Readouts */}
        <div style={{ padding: "20px 22px", display: "flex", alignItems: "center" }}>
          <div style={{ width: "100%" }}>
            <Readouts
              cols={2}
              items={[
                ["Condition", `${v.cond}/100`, cColor],
                ["Failure prob.", `${Math.round(v.failureProb)}%`, probColor(v.failureProb)],
                ["Replacement cost", v.replacementCost, "var(--ink)"],
                ["Last inspected", v.lastInspected, "var(--ink-soft)"],
              ]}
            />
          </div>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div
        role="tablist"
        aria-label="Asset detail sections"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          borderBottom: "1px solid var(--rule)",
          flexWrap: "wrap",
        }}
      >
        {TABS.map((t, i) => {
          const active = tab === t
          return (
            <button
              key={t}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              id={`asset-tab-${i}`}
              aria-selected={active}
              aria-controls={`asset-tabpanel-${i}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setTab(t)}
              onKeyDown={(e) => onTabKey(e, i)}
              style={{
                appearance: "none",
                background: "transparent",
                border: "none",
                borderBottom: `2px solid ${active ? "var(--blue)" : "transparent"}`,
                color: active ? "var(--blue)" : "var(--ink-soft)",
                fontWeight: active ? 700 : 500,
                fontSize: 13,
                padding: "10px 14px",
                marginBottom: -1,
                cursor: "pointer",
                transition: "color .14s, border-color .14s",
              }}
            >
              {t}
            </button>
          )
        })}
      </div>

      {/* ── Tab panels ── */}
      <div
        role="tabpanel"
        id={`asset-tabpanel-${TABS.indexOf(tab)}`}
        aria-labelledby={`asset-tab-${TABS.indexOf(tab)}`}
        tabIndex={0}
        style={{ outline: "none" }}
      >
        {/* OVERVIEW */}
        {tab === "Overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, alignItems: "start" }}>
              <SectionCard title="Condition trend" code="12-MONTH">
                <AreaChart
                  data={v.trend}
                  color={cColor}
                  threshold={55}
                  thrLabel="Fair threshold"
                  labels={["Jun", "", "", "Sep", "", "", "Dec", "", "", "Mar", "", "Now"].slice(0, v.trend.length)}
                  height={150}
                />
                <div style={{ marginTop: 8, fontSize: 12, color: "var(--ink-faint)" }}>
                  Condition index has moved from {v.trend[0]} to {v.cond} over the trailing window.
                </div>
              </SectionCard>

              <SectionCard title="Key facts" code="REGISTRY">
                <Readouts
                  cols={2}
                  items={[
                    ["Asset type", v.type, "var(--ink)"],
                    ["District", v.where, "var(--ink)"],
                    ["Department", v.dept, "var(--ink)"],
                    ["Installed", v.installed, "var(--ink-soft)"],
                    ["Material", v.material, "var(--ink-soft)"],
                    ["Replacement", v.replacementCost, "var(--ink)"],
                  ]}
                />
              </SectionCard>
            </div>

            <SectionCard title="Recommended actions" code="AI · ACTION">
              {recs.map((r, i) => (
                <RecRow key={i} n={i + 1} text={r.text} impact={r.impact} c={r.c} />
              ))}
            </SectionCard>
          </div>
        )}

        {/* INSPECTIONS */}
        {tab === "Inspections" && (
          <SectionCard title="Inspection history" code="LOG">
            {v.inspections.length === 0 ? (
              <EmptyState icon="calendar" title="No inspections recorded" sub="This asset has not been inspected yet." />
            ) : (
              <DataTable
                heads={["Date", "Inspector", "Condition", "Notes"]}
                aligns={["left", "left", "right", "left"]}
                rows={v.inspections.map((ins) => [
                  <span key="d" className="mono" style={{ fontSize: 12 }}>
                    {ins.date}
                  </span>,
                  <span key="i" style={{ color: "var(--ink)" }}>
                    {ins.inspector}
                  </span>,
                  <span key="c" className="mono" style={{ fontWeight: 700, color: condColor(ins.condition) }}>
                    {ins.condition}
                  </span>,
                  <span key="n">{ins.notes}</span>,
                ])}
              />
            )}
          </SectionCard>
        )}

        {/* SENSORS */}
        {tab === "Sensors" && <SensorsPanel id={id} />}

        {/* INCIDENTS */}
        {tab === "Incidents" && (
          <SectionCard title="Incidents" code="EVENTS">
            {v.incidents.length === 0 ? (
              <EmptyState icon="alerts" title="No incidents" sub="No incidents have been logged against this asset." />
            ) : (
              <DataTable
                heads={["Title", "Severity", "Status", "Date"]}
                aligns={["left", "left", "left", "right"]}
                rows={v.incidents.map((inc) => [
                  <div key="t">
                    <div style={{ color: "var(--ink)", fontWeight: 500 }}>{inc.title}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-faint)", marginTop: 2 }}>
                      {inc.id}
                    </div>
                  </div>,
                  <Pill key="s" sev={inc.severity} />,
                  <span key="st">{inc.status}</span>,
                  <span key="d" className="mono" style={{ fontSize: 12 }}>
                    {inc.date}
                  </span>,
                ])}
              />
            )}
          </SectionCard>
        )}

        {/* WORK ORDERS */}
        {tab === "Work Orders" && (
          <SectionCard title="Linked work orders" code="OPS">
            {v.workOrders.length === 0 ? (
              <EmptyState
                icon="tasks"
                title="No linked work orders"
                sub="Create a work order to begin tracking maintenance on this asset."
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {v.workOrders.map((wo) => (
                  <div
                    key={wo.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      border: "1px solid var(--rule)",
                      borderRadius: "var(--r-sm)",
                      background: "var(--surface-2)",
                    }}
                  >
                    <span className="mono" style={{ fontSize: 11.5, color: "var(--blue)", flexShrink: 0 }}>
                      {wo.id}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{wo.title}</div>
                      <div style={{ fontSize: 11.5, color: "var(--ink-faint)", marginTop: 2 }}>{wo.dept}</div>
                    </div>
                    <Pill sev={wo.priority} />
                    <span style={{ fontSize: 12, color: "var(--ink-soft)", minWidth: 86, textAlign: "right" }}>
                      {wo.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        )}

        {/* DOCUMENTS */}
        {tab === "Documents" && (
          <SectionCard title="Documents" code="FILES">
            {v.documents.length === 0 ? (
              <EmptyState icon="exports" title="No documents" sub="No files have been attached to this asset." />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {v.documents.map((doc, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      border: "1px solid var(--rule)",
                      borderRadius: "var(--r-sm)",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "var(--r-sm)",
                        background: "var(--surface-2)",
                        border: "1px solid var(--rule)",
                        display: "grid",
                        placeItems: "center",
                        color: "var(--ink-soft)",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name="exports" size={15} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{doc.name}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}>
                        {doc.size} · uploaded {doc.uploaded}
                      </div>
                    </div>
                    <span
                      className="pill p-slate"
                      style={{ flexShrink: 0 }}
                    >
                      {doc.kind}
                    </span>
                    <button
                      className="btn btn-ghost"
                      style={{ padding: "7px", gap: 0, flexShrink: 0 }}
                      aria-label={`Download ${doc.name}`}
                      onClick={() => setToast({ message: `Preparing ${doc.name}…`, type: "success" })}
                    >
                      <Icon name="download" size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        )}
      </div>
    </Screen>
  )
}
