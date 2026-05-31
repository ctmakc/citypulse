"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";

interface AssetPanelProps {
  a: any | null;
  onClose: () => void;
  isMobile?: boolean;
}

function riskPillClass(risk: string) {
  if (risk === "Critical") return "p-red";
  if (risk === "Elevated") return "p-amber";
  if (risk === "Watch") return "p-slate";
  return "p-green";
}

function condColor(cond: number) {
  if (cond < 50) return "var(--red)";
  if (cond < 70) return "var(--amber)";
  return "var(--green)";
}

export default function AssetPanel({ a, onClose, isMobile = false }: AssetPanelProps) {
  const [visible, setVisible] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (a) {
      restoreRef.current = document.activeElement as HTMLElement | null;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
    }
  }, [a]);

  // Focus into the sheet on open; Escape closes; focus returns to opener on close.
  useEffect(() => {
    if (!a) return;
    const id = requestAnimationFrame(() => closeBtnRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("keydown", onKey);
    };
  }, [a, onClose]);

  function handleClose() {
    onClose();
    restoreRef.current?.focus?.();
  }

  if (!a && !visible) return null;

  const shown = a;

  return (
    <>
      {/* Scrim */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 55,
          pointerEvents: visible ? "auto" : "none",
        }}
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="asset-panel-title"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: isMobile ? "100vw" : "auto",
          background: "var(--surface)",
          borderTop: "1px solid var(--rule)",
          boxShadow: "0 -4px 24px rgba(42,48,55,.12)",
          zIndex: 56,
          borderRadius: isMobile ? "var(--r-xl) var(--r-xl) 0 0" : "var(--r-xl) var(--r-xl) 0 0",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform .3s cubic-bezier(.32,.72,0,1)",
          padding: "16px 20px 24px",
          paddingBottom: isMobile ? "calc(24px + env(safe-area-inset-bottom, 0px))" : 24,
          maxHeight: isMobile ? "80vh" : "50vh",
          overflowY: "auto",
        }}
      >
        {/* Drag handle */}
        <div aria-hidden="true" style={{ width: 36, height: 4, borderRadius: 2, background: "var(--rule)", margin: "0 auto 16px" }} />

        {shown && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div className="code" style={{ marginBottom: 2 }}>{shown.id}</div>
                <div id="asset-panel-title" style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>{shown.name}</div>
                <div style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 2 }}>{shown.type} · {shown.where}</div>
              </div>
              <span className={`pill ${riskPillClass(shown.risk)}`}>
                <span className="dot" aria-hidden="true" />{shown.risk}
              </span>
              <button
                ref={closeBtnRef}
                className="btn btn-ghost"
                style={{ padding: "5px", gap: 0, flexShrink: 0 }}
                onClick={handleClose}
                aria-label={`Close ${shown.name} panel`}
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            {/* Condition bar */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span className="cap">Condition Index</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: condColor(shown.cond) }}>{shown.cond}/100</span>
              </div>
              <div style={{ height: 7, borderRadius: "var(--r-pill)", background: "var(--rule)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${shown.cond}%`,
                    borderRadius: "var(--r-pill)",
                    background: condColor(shown.cond),
                    transition: "width .5s ease",
                  }}
                />
              </div>
            </div>

            {/* Meta row */}
            <div style={{ display: "flex", gap: 20 }}>
              <div>
                <div className="cap" style={{ marginBottom: 2 }}>Department</div>
                <div style={{ fontSize: 13, color: "var(--ink)" }}>{shown.dept}</div>
              </div>
              <div>
                <div className="cap" style={{ marginBottom: 2 }}>Failure Prob.</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: shown.risk === "Critical" ? "var(--red)" : "var(--ink)" }}>
                  {shown.prob}
                </div>
              </div>
            </div>

            {/* AI snippet */}
            {shown.risk !== "OK" && (
              <div
                style={{
                  background: "var(--blue-wash)",
                  borderRadius: "var(--r)",
                  padding: "10px 14px",
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                  border: "1px solid rgba(42,108,146,.12)",
                }}
              >
                <span style={{ color: "var(--blue)", marginTop: 1, flexShrink: 0 }} aria-hidden="true">
                  <Icon name="sparkles" size={14} />
                </span>
                <span style={{ fontSize: 12.5, color: "var(--blue)", lineHeight: 1.5 }}>
                  {shown.risk === "Critical"
                    ? `AI recommends immediate inspection. Failure probability is ${shown.prob} — action within the week is advised to avoid emergency costs.`
                    : `This asset is being monitored. Condition is trending downward. Recommend scheduling a Tier-2 inspection.`}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
