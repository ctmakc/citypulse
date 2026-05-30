"use client";

interface ColBarsProps {
  data: number[];
  labels?: string[];
  color?: string;
  height?: number;
  highlight?: number;
}

export default function ColBars({
  data,
  labels,
  color = "var(--blue)",
  height = 96,
  highlight,
}: ColBarsProps) {
  const max = Math.max(...data, 1);
  const barW = 100 / (data.length * 1.4);
  const gap = (100 - barW * data.length) / (data.length + 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ position: "relative", height, display: "flex", alignItems: "flex-end", gap: 3 }}>
        {data.map((v, i) => {
          const pct = (v / max) * 100;
          const isHighlight = highlight === i;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${pct}%`,
                minHeight: 2,
                borderRadius: "3px 3px 0 0",
                background: isHighlight ? "var(--red)" : color,
                opacity: isHighlight ? 1 : 0.8,
                transition: "height .3s ease",
              }}
            />
          );
        })}
      </div>
      {labels && labels.length > 0 && (
        <div style={{ display: "flex", gap: 3 }}>
          {labels.map((lbl, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 9,
                color: "var(--ink-faint)",
                fontFamily: "var(--mono)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {lbl}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
