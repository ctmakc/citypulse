"use client";

interface ReadoutsProps {
  items: [string, string, string?, string?][];
  cols?: number;
}

export default function Readouts({ items, cols = 4 }: ReadoutsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        border: "1px solid var(--rule)",
        borderRadius: "var(--r-sm)",
        overflow: "hidden",
      }}
    >
      {items.map(([lbl, val, color, sublabel], i) => (
        <div
          key={i}
          style={{
            padding: "10px 14px",
            borderRight: (i + 1) % cols !== 0 ? "1px solid var(--rule)" : undefined,
            borderBottom: i < items.length - cols ? "1px solid var(--rule)" : undefined,
            background: "var(--surface)",
          }}
        >
          <div className="cap" style={{ marginBottom: 4 }}>{lbl}</div>
          <div
            className="mono"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: color ?? "var(--ink)",
              lineHeight: 1.2,
            }}
          >
            {val}
          </div>
          {sublabel && (
            <div style={{ fontSize: 10.5, color: "var(--ink-faint)", marginTop: 2 }}>
              {sublabel}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
