"use client";

interface HeatGridProps {
  matrix: number[][];
  rowLabels: string[];
  colLabels: string[];
  color?: string;
}

export default function HeatGrid({
  matrix,
  rowLabels,
  colLabels,
  color = "188,126,21",
}: HeatGridProps) {
  const allVals = matrix.flat();
  const maxVal = Math.max(...allVals, 1);
  const minVal = Math.min(...allVals, 0);
  const range = maxVal - minVal || 1;

  const labelColW = 32;
  const cellSize = 18;

  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: "fit-content" }}>
        {/* Col labels */}
        <div style={{ display: "flex", marginLeft: labelColW + 4 }}>
          {colLabels.map((lbl, j) => (
            <div
              key={j}
              style={{
                width: cellSize,
                textAlign: "center",
                fontSize: 8.5,
                color: "var(--ink-faint)",
                fontFamily: "var(--mono)",
                flexShrink: 0,
              }}
            >
              {lbl}
            </div>
          ))}
        </div>

        {/* Rows */}
        {matrix.map((row, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {/* Row label */}
            <div
              style={{
                width: labelColW,
                fontSize: 9,
                color: "var(--ink-faint)",
                fontFamily: "var(--mono)",
                textAlign: "right",
                flexShrink: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {rowLabels[i]}
            </div>

            {/* Cells */}
            {row.map((v, j) => {
              const intensity = (v - minVal) / range;
              return (
                <div
                  key={j}
                  title={`${rowLabels[i]} / ${colLabels[j]}: ${v}`}
                  style={{
                    width: cellSize,
                    aspectRatio: "1.6",
                    borderRadius: 3,
                    background: `rgba(${color}, ${Math.max(0.05, intensity * 0.9)})`,
                    flexShrink: 0,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
