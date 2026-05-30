"use client";

interface RankRow {
  label: string;
  v: number;
  disp?: string;
  color?: string;
}

interface RankBarsProps {
  rows: RankRow[];
  max?: number;
}

export default function RankBars({ rows, max }: RankBarsProps) {
  const effectiveMax = max ?? Math.max(...rows.map((r) => r.v), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {rows.map((row, i) => {
        const pct = Math.min(100, (row.v / effectiveMax) * 100);
        const color = row.color ?? "var(--blue)";

        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 12, color: "var(--ink-soft)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {row.label}
              </span>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--ink)", flexShrink: 0 }}>
                {row.disp ?? row.v}
              </span>
            </div>
            <div
              style={{
                height: 7,
                borderRadius: 100,
                background: "var(--surface-2)",
                overflow: "hidden",
                border: "1px solid var(--rule-soft)",
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
          </div>
        );
      })}
    </div>
  );
}
