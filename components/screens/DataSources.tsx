"use client"

import { useRef, useState } from "react"
import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Pill from "@/components/ui/Pill"
import Icon from "@/components/ui/Icon"
import { INTEGRATIONS } from "@/lib/data"

// API base + auth token — read locally (lib/api.ts is owned by another agent).
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3096/api/v1"

function authHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem("citypulse_token") : null
  return token ? { Authorization: `Bearer ${token}` } : {}
}

interface ImportResult {
  imported: number
  skipped: number
  errors: number
  errorDetails?: string[]
}

type ImportState =
  | { kind: "idle" }
  | { kind: "uploading" }
  | { kind: "success"; result: ImportResult }
  | { kind: "error"; message: string }

export default function DataSources() {
  const totalSources = INTEGRATIONS.reduce((sum, g) => sum + g.items.length, 0)
  const connectedSources = INTEGRATIONS.reduce(
    (sum, g) => sum + g.items.filter(([, status]) => status === "Connected").length,
    0
  )

  // ── Asset import state ──────────────────────────────────────────────────────
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [state, setState] = useState<ImportState>({ kind: "idle" })

  async function handleImport() {
    if (!file || state.kind === "uploading") return
    setState({ kind: "uploading" })
    try {
      const body = new FormData()
      body.append("file", file)
      const res = await fetch(`${API_BASE}/import/assets`, {
        method: "POST",
        headers: authHeaders(), // do NOT set Content-Type — browser sets multipart boundary
        body,
      })
      if (!res.ok) {
        const detail = await res.text().catch(() => "")
        throw new Error(
          res.status === 401
            ? "You need to be signed in to import assets."
            : `Import failed (${res.status})${detail ? ` — ${detail.slice(0, 120)}` : ""}`
        )
      }
      // Backend shape: { imported, skipped, errors: [{ row, message }] }.
      const data = (await res.json().catch(() => ({}))) as {
        imported?: number
        skipped?: number
        errors?: Array<{ row?: number; message?: string }>
      }
      const errs = Array.isArray(data.errors) ? data.errors : []
      setState({
        kind: "success",
        result: {
          imported: Number(data.imported ?? 0),
          skipped: Number(data.skipped ?? 0),
          errors: errs.length,
          errorDetails: errs.length
            ? errs.map((e) =>
                e.row ? `Row ${e.row}: ${e.message ?? "error"}` : e.message ?? "error",
              )
            : undefined,
        },
      })
      // Clear the chosen file so a repeat import is a deliberate action.
      setFile(null)
      if (fileRef.current) fileRef.current.value = ""
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Import failed — please try again.",
      })
    }
  }

  function chooseFile(f: File | null) {
    setFile(f)
    if (state.kind !== "idle") setState({ kind: "idle" }) // reset previous result on new pick
  }

  return (
    <Screen>
      <ScreenHead
        ico="data"
        title="Data Sources"
        sub={`${connectedSources} of ${totalSources} integrations connected — live feeds from sensors, operations systems and geospatial data providers.`}
      />

      {/* ── Import assets ──────────────────────────────────────────────────────── */}
      <div>
        <div className="cap" style={{ marginBottom: 10 }}>
          Bulk import
        </div>

        <div className="surface" style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "var(--r-sm)",
                background: "var(--blue-wash)",
                color: "var(--blue)",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="exports" size={20} strokeWidth={1.7} />
            </div>

            <div style={{ flex: "1 1 280px", minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Import assets</div>
              <p style={{ margin: "3px 0 0", fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                Upload a CSV or GeoJSON file of infrastructure assets (pipes, lights, signals, sensors).
                Each row becomes a tracked asset.{" "}
                <a href={`${API_BASE}/import/template`} download style={{ fontWeight: 600 }}>
                  Download CSV template
                </a>
                .
              </p>
            </div>
          </div>

          {/* Picker + action */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginTop: 16,
            }}
          >
            <input
              ref={fileRef}
              id="asset-import-file"
              type="file"
              accept=".csv,.geojson,.json,text/csv,application/geo+json,application/json"
              onChange={(e) => chooseFile(e.target.files?.[0] ?? null)}
              style={{ display: "none" }}
            />
            <label
              htmlFor="asset-import-file"
              className="btn btn-ghost"
              style={{ height: 40, cursor: "pointer" }}
            >
              <Icon name="exports" size={16} strokeWidth={1.7} />
              {file ? "Change file" : "Choose CSV / GeoJSON"}
            </label>

            {file && (
              <span
                className="mono"
                style={{
                  fontSize: 12,
                  color: "var(--ink-soft)",
                  maxWidth: 240,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={file.name}
              >
                {file.name}
              </span>
            )}

            <button
              type="button"
              onClick={handleImport}
              disabled={!file || state.kind === "uploading"}
              className="btn"
              style={{
                height: 40,
                marginLeft: "auto",
                background: !file || state.kind === "uploading" ? "var(--ink-faint)" : "var(--ink)",
                cursor: !file || state.kind === "uploading" ? "not-allowed" : "pointer",
              }}
            >
              {state.kind === "uploading" ? (
                <>
                  <span
                    aria-hidden="true"
                    style={{
                      width: 14,
                      height: 14,
                      border: "2px solid rgba(255,255,255,.4)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "ds-spin .7s linear infinite",
                    }}
                  />
                  Importing…
                </>
              ) : (
                <>
                  <Icon name="download" size={16} strokeWidth={1.8} style={{ transform: "rotate(180deg)" }} />
                  Import
                </>
              )}
            </button>
          </div>

          {/* Inline result */}
          {state.kind === "success" && (
            <div
              role="status"
              style={{
                marginTop: 14,
                padding: "12px 14px",
                borderRadius: "var(--r)",
                background: "var(--green-wash)",
                border: "1px solid var(--green)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <Icon name="check" size={16} strokeWidth={2.4} style={{ color: "var(--green)" }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--green)" }}>Import complete</span>
                <span style={{ display: "inline-flex", gap: 6, marginLeft: 4, flexWrap: "wrap" }}>
                  <Pill sev="OK">{state.result.imported} imported</Pill>
                  <Pill sev="Watch">{state.result.skipped} skipped</Pill>
                  <Pill sev={state.result.errors > 0 ? "Critical" : "Neutral"}>
                    {state.result.errors} errors
                  </Pill>
                </span>
              </div>
              {state.result.errorDetails && state.result.errorDetails.length > 0 && (
                <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: 12, color: "var(--ink-soft)" }}>
                  {state.result.errorDetails.slice(0, 5).map((e, i) => (
                    <li key={i} style={{ marginBottom: 2 }}>{e}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {state.kind === "error" && (
            <div
              role="alert"
              style={{
                marginTop: 14,
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 14px",
                borderRadius: "var(--r)",
                background: "var(--red-wash)",
                border: "1px solid var(--red)",
                color: "var(--red)",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <Icon name="warning" size={16} strokeWidth={1.9} />
              <span>{state.message}</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {INTEGRATIONS.map((group) => (
          <div key={group.group}>
            {/* Group header */}
            <div className="cap" style={{ marginBottom: 10 }}>
              {group.group}
            </div>

            <div className="surface" style={{ overflow: "hidden" }}>
              {/* Column headers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 130px 120px",
                  padding: "8px 18px",
                  background: "var(--surface-2)",
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                <div className="cap">Source</div>
                <div className="cap">Status</div>
                <div className="cap">Records / streams</div>
              </div>

              {group.items.map(([name, status, count]) => (
                <div
                  key={name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 130px 120px",
                    padding: "11px 18px",
                    borderBottom: "1px solid var(--rule-soft)",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{name}</div>
                  <div>
                    <Pill sev={status === "Connected" ? "OK" : "Elevated"}>
                      {status}
                    </Pill>
                  </div>
                  <div
                    className="mono"
                    style={{ fontSize: 12.5, color: "var(--ink-soft)" }}
                  >
                    {count.toLocaleString("en-US")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Spinner keyframe — scoped, injected once. */}
      <style>{`@keyframes ds-spin { to { transform: rotate(360deg); } }`}</style>
    </Screen>
  )
}
