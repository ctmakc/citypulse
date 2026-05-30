"use client";

interface StackPart {
  label: string;
  v: number;
  disp?: string;
  color: string;
}

interface StackBarProps {
  parts: StackPart[];
}

export default function StackBar({ parts }: StackBarProps) {
  const total = parts.reduce((sum, p) => sum + p.v, 0) || 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Bar */}
      <div
        style={{
          display: "flex",
          height: 12,
          borderRadius: "var(--r-pill)",
          overflow: "hidden",
          background: "var(--surface-3)",
        }}
      >
        {parts.map((part, i) => {
          const pct = (part.v / total) * 100;
          return (
            <div
              key={i}
              title={`${part.label}: ${part.disp ?? part.v}`}
              style={{
                width: `${pct}%`,
                background: part.color,
                transition: "width .3s ease",
                flexShrink: 0,
              }}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4px 12px",
        }}
      >
        {parts.map((part, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: part.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 11.5,
                color: "var(--ink-soft)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
              }}
            >
              {part.label}
            </span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink)", flexShrink: 0 }}>
              {part.disp ?? part.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
