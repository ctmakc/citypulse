"use client";

interface CondBarProps {
  v: number;
}

export default function CondBar({ v }: CondBarProps) {
  const pct = Math.max(0, Math.min(100, v));
  const color =
    pct >= 75 ? "var(--green)" : pct >= 55 ? "var(--amber)" : "var(--red)";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 64,
          height: 6,
          borderRadius: 100,
          background: "var(--rule)",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 100,
            background: color,
            transition: "width .3s ease",
          }}
        />
      </div>
      <span className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", whiteSpace: "nowrap" }}>
        {pct}
      </span>
    </div>
  );
}
