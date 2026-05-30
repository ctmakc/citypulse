"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import Donut from "@/components/ui/Donut";

interface DetailDrawerProps {
  detail: any | null;
  onClose: () => void;
}

function AgentDetail({ d }: { d: any }) {
  return (
    <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: "var(--r)", background: d.color + "22", display: "grid", placeItems: "center", color: d.color }}>
          <Icon name={d.ico || "ai"} size={20} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{d.name}</div>
          <div style={{ fontSize: 12, color: "var(--ink-faint)" }}>{d.dept}</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <span className={`pill ${d.esc === "Critical" ? "p-red" : d.esc === "Elevated" ? "p-amber" : "p-slate"}`}>
            <span className="dot" />{d.esc}
          </span>
        </div>
      </div>

      <div>
        <div className="cap" style={{ marginBottom: 8 }}>Finding</div>
        <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-soft)" }}>{d.finding}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <div className="cap" style={{ marginBottom: 8 }}>Confidence</div>
          <Donut v={d.conf} size={72} color={d.color} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="cap" style={{ marginBottom: 8 }}>Data Sources</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {(d.sources || []).map((s: string, i: number) => (
              <div key={i} style={{ fontSize: 12, color: "var(--ink-soft)", display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--ink-ghost)", flexShrink: 0 }} />
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="cap" style={{ marginBottom: 8 }}>Recommended Actions</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {(d.actions || []).map((action: string, i: number) => (
            <button
              key={i}
              className="btn btn-ghost"
              style={{ justifyContent: "flex-start", fontSize: 13, padding: "10px 14px" }}
            >
              <Icon name="check" size={14} />
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectDetail({ d }: { d: any }) {
  const matchNum = parseInt(d.match ?? "0");
  return (
    <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <div className="code" style={{ marginBottom: 4 }}>{d.id}</div>
        <div style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.3 }}>{d.title}</div>
        <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {d.climate && <span className={`pill ${d.climate === "High" ? "p-green" : "p-slate"}`}><span className="dot" />Climate</span>}
          {d.safety && <span className={`pill ${d.safety === "High" ? "p-red" : "p-amber"}`}><span className="dot" />Safety</span>}
          {d.equity && <span className={`pill ${d.equity === "High" ? "p-blue" : "p-slate"}`}><span className="dot" />Equity</span>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          ["Cost", d.cost],
          ["Program", d.program],
          ["Eligibility", d.elig],
          ["Federal Match", d.match],
          ["Readiness", d.ready],
          ["Deadline", d.deadline],
        ].map(([label, val]) => (
          <div key={label}>
            <div className="cap" style={{ marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div>
          <div className="cap" style={{ marginBottom: 6 }}>Funding Probability</div>
          <Donut v={d.prob} size={72} color="var(--green)" />
        </div>
        <div>
          <div className="cap" style={{ marginBottom: 6 }}>Grant Match</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--green)" }}>{d.match}</div>
        </div>
      </div>

      {d.note && (
        <div style={{ background: "var(--surface-2)", borderRadius: "var(--r)", padding: "14px 16px", fontSize: 13, lineHeight: 1.6, color: "var(--ink-soft)", border: "1px solid var(--rule-soft)" }}>
          {d.note}
        </div>
      )}

      <button className="btn" style={{ background: "var(--green)", justifyContent: "center" }}>
        <Icon name="exports" size={15} />
        Submit Application
      </button>
    </div>
  );
}

function ReportDetail({ d }: { d: any }) {
  return (
    <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span className="code">{d.id}</span>
        <span className={`pill ${d.sev === "High" ? "p-red" : d.sev === "Medium" ? "p-amber" : "p-slate"}`}>
          <span className="dot" />{d.sev}
        </span>
      </div>
      <div style={{ fontWeight: 700, fontSize: 15 }}>{d.cat}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          ["Location", d.where],
          ["Department", d.dept],
          ["Status", d.status],
          ["SLA", d.sla],
          ["Reported", d.when],
          ["Duplicates", d.dup],
        ].map(([label, val]) => (
          <div key={label}>
            <div className="cap" style={{ marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{String(val)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FallbackDetail({ d }: { d: any }) {
  return (
    <div style={{ padding: "20px 24px" }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>{d.title ?? d.name ?? "Detail"}</div>
      <pre style={{ fontSize: 11, color: "var(--ink-soft)", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
        {JSON.stringify(d, null, 2)}
      </pre>
    </div>
  );
}

export default function DetailDrawer({ detail, onClose }: DetailDrawerProps) {
  const [visible, setVisible] = useState(false);
  const prevDetail = useRef<any>(null);

  useEffect(() => {
    if (detail) {
      prevDetail.current = detail;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
    }
  }, [detail]);

  const shown = detail || prevDetail.current;

  if (!shown && !visible) return null;

  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(42,48,55,.18)",
          zIndex: 60,
          opacity: visible ? 1 : 0,
          transition: "opacity .28s",
        }}
      />
      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "min(540px, 100vw)",
          height: "100%",
          background: "var(--surface)",
          borderLeft: "1px solid var(--rule)",
          boxShadow: "var(--sh-pop)",
          zIndex: 61,
          overflowY: "auto",
          transform: visible ? "translateX(0)" : "translateX(100%)",
          transition: "transform .3s cubic-bezier(.32,.72,0,1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 20px",
            borderBottom: "1px solid var(--rule)",
            flexShrink: 0,
          }}
        >
          <div style={{ flex: 1, fontWeight: 700, fontSize: 13.5 }}>
            {shown?.type === "agent" ? "Agent Detail" :
             shown?.type === "project" ? "Grant Project" :
             shown?.type === "report" ? "311 Report" : "Detail"}
          </div>
          <button
            className="btn btn-ghost"
            style={{ padding: "5px", gap: 0 }}
            onClick={onClose}
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {shown?.type === "agent"   && <AgentDetail d={shown} />}
          {shown?.type === "project" && <ProjectDetail d={shown} />}
          {shown?.type === "report"  && <ReportDetail d={shown} />}
          {shown && !["agent","project","report"].includes(shown.type) && <FallbackDetail d={shown} />}
        </div>
      </div>
    </>
  );
}
