"use client";

interface DonutProps {
  v: number;
  size?: number;
  color?: string;
  label?: string;
}

export default function Donut({ v, size = 42, color = "var(--blue)", label }: DonutProps) {
  const r = (size - 6) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const dash = Math.max(0, Math.min(1, v)) * circ;
  const pct = Math.round(v * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <svg width={size} height={size} style={{ display: "block" }}>
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--rule)"
          strokeWidth={4}
        />
        {/* Arc */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ / 4}
          style={{ transition: "stroke-dasharray .4s ease" }}
        />
        {/* Center text */}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: "var(--mono)",
            fontSize: size * 0.24,
            fontWeight: 600,
            fill: "var(--ink)",
          }}
        >
          {pct}
        </text>
      </svg>
      {label && (
        <span className="cap" style={{ textAlign: "center" }}>
          {label}
        </span>
      )}
    </div>
  );
}
