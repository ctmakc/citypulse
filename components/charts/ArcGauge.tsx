"use client";

interface ArcGaugeProps {
  value: number;
  max?: number;
  size?: number;
  label?: string;
  color?: string;
}

export default function ArcGauge({
  value,
  max = 100,
  size = 130,
  label,
  color,
}: ArcGaugeProps) {
  const pct = Math.max(0, Math.min(1, value / max));

  const resolvedColor =
    color ??
    (pct > 0.7 ? "var(--red)" : pct > 0.45 ? "var(--amber)" : "var(--green)");

  const cx = size / 2;
  const cy = size / 2;
  const r = (size - 20) / 2;
  const arcFraction = 0.72;
  const startAngle = 140; // degrees
  const totalArc = 360 * arcFraction; // 259.2 deg
  const circ = 2 * Math.PI * r;
  const arcLen = circ * arcFraction;
  const fillLen = pct * arcLen;

  const severity =
    pct > 0.7 ? "critical" : pct > 0.45 ? "elevated" : "normal";
  const ariaLabel = `${label ? `${label}: ` : ""}${Math.round(value)} of ${max}, ${severity}`;

  // Convert to SVG strokeDasharray on a full circle
  // We rotate the whole SVG 140deg so the arc starts at bottom-left

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg
        width={size}
        height={size}
        style={{ display: "block", overflow: "visible" }}
        role="img"
        aria-label={ariaLabel}
      >
        <g style={{ transform: `rotate(${startAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
          {/* Track */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--rule)"
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={`${arcLen} ${circ - arcLen}`}
          />
          {/* Fill */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={resolvedColor}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={`${fillLen} ${circ - fillLen}`}
            style={{ transition: "stroke-dasharray .4s ease" }}
          />
        </g>

        {/* Center value */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: "var(--serif)",
            fontSize: size * 0.22,
            fontWeight: 700,
            fill: "var(--ink)",
          }}
        >
          {Math.round(value)}
        </text>
        {label && (
          <text
            x={cx}
            y={cy + size * 0.15}
            textAnchor="middle"
            style={{
              fontFamily: "var(--grotesk)",
              fontSize: 10,
              fill: "var(--ink-faint)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  );
}
