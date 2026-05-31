"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Screen from "@/components/ui/Screen"
import Icon from "@/components/ui/Icon"
import ScreenHead from "@/components/ui/ScreenHead"
import Pill from "@/components/ui/Pill"
import CondBar from "@/components/ui/CondBar"
import EmptyState from "@/components/ui/EmptyState"
import { SkeletonRow } from "@/components/ui/Skeleton"
import { ASSETS } from "@/lib/data"
import { assetsApi, isLoggedIn } from "@/lib/api"
import { usePortalStore } from "@/lib/store"
import type { Asset } from "@/lib/types"

const GRID = "100px 130px 1.4fr 1fr 160px 110px 160px 100px"

const RISK_LEVELS = ["All", "Critical", "Elevated", "Watch", "OK"] as const
const ASSET_TYPES = ["All", "Bridge", "Road", "Water", "Hydrant", "Streetlight", "Signal", "Pump", "Building"] as const
const DISTRICTS = ["All", "Riverside", "Old Town", "Westbank", "Northgate", "Harbor", "Cedar Crossing"] as const

const TYPE_MATCH: Record<string, string[]> = {
  Bridge:      ["Bridge"],
  Road:        ["Road segment"],
  Water:       ["Water main"],
  Hydrant:     ["Hydrant"],
  Streetlight: ["Streetlight"],
  Signal:      ["Signal"],
  Pump:        ["Pump station"],
  Building:    ["Public building"],
}

export default function Assets() {
  const setDetail = usePortalStore((s) => s.setDetail)
  const [riskFilter, setRiskFilter] = useState<string>("All")
  const [typeFilter, setTypeFilter] = useState<string>("All")
  const [districtFilter, setDistrictFilter] = useState<string>("All")
  const [assets, setAssets] = useState<Asset[]>(ASSETS)
  // Skeletons only while an authenticated fetch is in flight; demo shows static data instantly.
  const [loading, setLoading] = useState(() => isLoggedIn())

  useEffect(() => {
    if (!isLoggedIn()) return
    setLoading(true)
    assetsApi.list()
      .then((res) => {
        if (Array.isArray(res.data)) setAssets(res.data as Asset[])
        else if (Array.isArray(res.data?.assets)) setAssets(res.data.assets as Asset[])
      })
      .catch(() => {}) // silent fail — keep static data
      .finally(() => setLoading(false))
  }, [])

  const filtered = assets.filter((a) => {
    if (riskFilter !== "All" && a.risk !== riskFilter) return false
    if (typeFilter !== "All") {
      const allowed = TYPE_MATCH[typeFilter] ?? []
      if (!allowed.some((t) => a.type.toLowerCase().includes(t.toLowerCase()))) return false
    }
    if (districtFilter !== "All" && a.where !== districtFilter) return false
    return true
  })

  return (
    <Screen>
      <ScreenHead
        ico="assets"
        title="Asset Registry"
        sub="Infrastructure assets tracked by condition, failure probability and department."
        color="var(--slate)"
      />

      {/* Filters */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {/* Risk Level pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Filter by risk level">
          <span className="cap" style={{ marginRight: 4, whiteSpace: "nowrap" }}>Risk</span>
          {RISK_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setRiskFilter(level)}
              aria-pressed={riskFilter === level}
              style={{
                padding: "4px 12px",
                borderRadius: 100,
                border: "1px solid",
                borderColor: riskFilter === level ? "var(--blue)" : "var(--rule)",
                background: riskFilter === level ? "var(--blue)" : "var(--surface-2)",
                color: riskFilter === level ? "#fff" : "var(--ink-soft)",
                fontSize: 12,
                fontWeight: riskFilter === level ? 600 : 400,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Type pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Filter by asset type">
          <span className="cap" style={{ marginRight: 4, whiteSpace: "nowrap" }}>Type</span>
          {ASSET_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              aria-pressed={typeFilter === t}
              style={{
                padding: "4px 12px",
                borderRadius: 100,
                border: "1px solid",
                borderColor: typeFilter === t ? "var(--blue)" : "var(--rule)",
                background: typeFilter === t ? "var(--blue)" : "var(--surface-2)",
                color: typeFilter === t ? "#fff" : "var(--ink-soft)",
                fontSize: 12,
                fontWeight: typeFilter === t ? 600 : 400,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* District pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Filter by district">
          <span className="cap" style={{ marginRight: 4, whiteSpace: "nowrap" }}>District</span>
          {DISTRICTS.map((d) => (
            <button
              key={d}
              onClick={() => setDistrictFilter(d)}
              aria-pressed={districtFilter === d}
              style={{
                padding: "4px 12px",
                borderRadius: 100,
                border: "1px solid",
                borderColor: districtFilter === d ? "var(--blue)" : "var(--rule)",
                background: districtFilter === d ? "var(--blue)" : "var(--surface-2)",
                color: districtFilter === d ? "#fff" : "var(--ink-soft)",
                fontSize: 12,
                fontWeight: districtFilter === d ? 600 : 400,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="surface" style={{ overflow: "hidden" }} role="table" aria-label="Asset registry" aria-busy={loading}>
        {/* Table header */}
        <div
          role="row"
          style={{
            display: "grid",
            gridTemplateColumns: GRID,
            padding: "10px 18px",
            background: "var(--surface-2)",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          {["ID", "Type", "Name", "Location", "Condition", "Fail prob.", "Department", "Risk"].map((h) => (
            <div key={h} role="columnheader" className="cap" style={{ padding: "0 6px" }}>
              {h}
            </div>
          ))}
        </div>

        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} cols={GRID} />)
        ) : filtered.length === 0 ? (
          <EmptyState title="No matching records" sub="Try adjusting your filters" />
        ) : (
          filtered.map((asset) => (
            <Link
              key={asset.id}
              href={`/assets/${encodeURIComponent(asset.id)}`}
              role="row"
              aria-label={`Open ${asset.name} (${asset.id})`}
              style={{
                display: "grid",
                gridTemplateColumns: GRID,
                padding: "12px 18px",
                borderBottom: "1px solid var(--rule-soft)",
                alignItems: "center",
                cursor: "pointer",
                color: "inherit",
                textDecoration: "none",
                transition: "background .15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            >
              <div role="cell" style={{ padding: "0 6px" }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--blue)" }}>
                  {asset.id}
                </span>
              </div>
              <div role="cell" style={{ padding: "0 6px", fontSize: 12, color: "var(--ink-soft)" }}>{asset.type}</div>
              <div role="cell" style={{ padding: "0 6px" }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{asset.name}</span>
              </div>
              <div role="cell" style={{ padding: "0 6px", fontSize: 12.5, color: "var(--ink-soft)" }}>{asset.where}</div>
              <div role="cell" style={{ padding: "0 6px" }}>
                <CondBar v={asset.cond} />
              </div>
              <div role="cell" style={{ padding: "0 6px" }}>
                <span
                  className="mono"
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    color:
                      parseFloat(asset.prob) >= 50
                        ? "var(--red)"
                        : parseFloat(asset.prob) >= 20
                        ? "var(--amber)"
                        : "var(--green)",
                  }}
                >
                  {asset.prob}
                </span>
              </div>
              <div role="cell" style={{ padding: "0 6px", fontSize: 12, color: "var(--ink-soft)" }}>{asset.dept}</div>
              <div role="cell" style={{ padding: "0 6px", display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
                <Pill sev={asset.risk} />
                {/* Quick peek — opens the side drawer without leaving the page. */}
                <button
                  type="button"
                  aria-label={`Quick peek at ${asset.name}`}
                  title="Quick peek"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setDetail({ type: "asset", data: asset })
                  }}
                  style={{
                    appearance: "none",
                    background: "transparent",
                    border: "1px solid var(--rule)",
                    borderRadius: "var(--r-sm)",
                    padding: "4px",
                    lineHeight: 0,
                    color: "var(--ink-faint)",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <Icon name="search" size={13} />
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </Screen>
  )
}
