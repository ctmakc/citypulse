"use client";

import Spark from "./Spark";

interface StatProps {
  label: string;
  value: string | number;
  sub: string;
  c?: string;
  spark?: number[];
}

export default function Stat({ label, value, sub, c = "var(--ink)", spark }: StatProps) {
  const valStr = String(value);
  const fontSize = valStr.length > 8 ? 18 : valStr.length > 5 ? 22 : 28;

  return (
    <div className="surface lift" style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
      <div className="cap" style={{ marginBottom: 2 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
        <div
          className="serif"
          style={{
            fontSize,
            fontWeight: 700,
            color: c,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {value}
        </div>
        {spark && spark.length > 1 && (
          <Spark data={spark} color={c === "var(--ink)" ? "var(--blue)" : c} />
        )}
      </div>
      <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 2 }}>{sub}</div>
    </div>
  );
}
