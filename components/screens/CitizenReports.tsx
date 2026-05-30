"use client"

import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Stat from "@/components/ui/Stat"
import Pill from "@/components/ui/Pill"
import { CATS_311, REPORTS_311 } from "@/lib/data"

export default function CitizenReports() {
  const highSev = REPORTS_311.filter((r) => r.sev === "High").length

  return (
    <Screen>
      <ScreenHead
        ico="message"
        title="Citizen Reports — 311"
        sub="Incoming reports from residents with AI-powered classification, duplicate detection, severity scoring and department routing."
        color="var(--green)"
      />

      {/* Stat tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <Stat label="Total reports" value="312" sub="open this week" c="var(--ink)" />
        <Stat label="High severity" value={highSev} sub="requiring fast response" c="var(--red)" />
        <Stat label="Unrouted" value="47" sub="awaiting assignment" c="var(--amber)" />
        <Stat label="Avg SLA" value="4.2h" sub="resolution time" c="var(--green)" />
      </div>

      {/* Category pills */}
      <div
        className="surface"
        style={{ padding: "12px 18px", display: "flex", flexDirection: "column", gap: 10 }}
      >
        <div className="cap">Category breakdown</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, overflowX: "auto" }}>
          {CATS_311.map(([cat, color]) => (
            <span
              key={cat}
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "5px 14px",
                borderRadius: 100,
                border: `1.5px solid ${color}44`,
                background: `${color}18`,
                color,
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Reports table */}
      <div className="surface" style={{ overflow: "hidden" }}>
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px 130px 100px 1fr 140px 100px 120px 80px",
            padding: "10px 18px",
            background: "var(--surface-2)",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          {["ID", "Category", "Severity", "Location", "Dept", "SLA", "Status", "Dups"].map((h) => (
            <div key={h} className="cap" style={{ padding: "0 6px" }}>
              {h}
            </div>
          ))}
        </div>

        {REPORTS_311.map((report) => (
          <div
            key={report.id}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 130px 100px 1fr 140px 100px 120px 80px",
              padding: "11px 18px",
              borderBottom: "1px solid var(--rule-soft)",
              alignItems: "center",
            }}
          >
            <div style={{ padding: "0 6px" }}>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--blue)" }}>
                {report.id}
              </span>
            </div>
            <div style={{ padding: "0 6px", fontSize: 12.5, color: "var(--ink)" }}>{report.cat}</div>
            <div style={{ padding: "0 6px" }}>
              <Pill sev={report.sev} />
            </div>
            <div style={{ padding: "0 6px", fontSize: 12.5, color: "var(--ink-soft)" }}>
              {report.where}
            </div>
            <div style={{ padding: "0 6px", fontSize: 12, color: "var(--ink-soft)" }}>{report.dept}</div>
            <div
              style={{
                padding: "0 6px",
                fontSize: 12,
                color: report.sla === "Breached" ? "var(--red)" : report.sla.includes("left") ? "var(--amber)" : "var(--ink-soft)",
                fontWeight: report.sla === "Breached" ? 700 : 400,
              }}
            >
              {report.sla}
            </div>
            <div style={{ padding: "0 6px" }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 100,
                  background:
                    report.status === "In progress"
                      ? "var(--blue-wash)"
                      : report.status === "Resolved"
                      ? "var(--green-wash)"
                      : report.status === "Routing"
                      ? "var(--amber-wash)"
                      : "var(--slate-wash)",
                  color:
                    report.status === "In progress"
                      ? "var(--blue)"
                      : report.status === "Resolved"
                      ? "var(--green)"
                      : report.status === "Routing"
                      ? "var(--amber)"
                      : "var(--ink-soft)",
                }}
              >
                {report.status}
              </span>
            </div>
            <div
              style={{
                padding: "0 6px",
                fontSize: 12,
                fontWeight: report.dup > 0 ? 700 : 400,
                color: report.dup > 0 ? "var(--amber)" : "var(--ink-faint)",
                fontFamily: "var(--mono)",
              }}
            >
              {report.dup > 0 ? `×${report.dup}` : "—"}
            </div>
          </div>
        ))}
      </div>
    </Screen>
  )
}
