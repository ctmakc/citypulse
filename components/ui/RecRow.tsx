"use client";

interface RecRowProps {
  n: number;
  text: string;
  impact: string;
  c?: string;
}

export default function RecRow({ n, text, impact, c = "var(--green)" }: RecRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "10px 0",
        borderBottom: "1px solid var(--rule-soft)",
      }}
    >
      {/* Badge */}
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "var(--blue-wash)",
          color: "var(--blue)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 700,
          flexShrink: 0,
          fontFamily: "var(--mono)",
        }}
      >
        {n}
      </div>

      {/* Text block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)", lineHeight: 1.4 }}>
          {text}
        </div>
        <div style={{ fontSize: 11.5, color: c, fontWeight: 600, marginTop: 3 }}>
          {impact}
        </div>
      </div>

      {/* Act button */}
      <button className="btn btn-ghost" style={{ fontSize: 12, padding: "6px 14px", flexShrink: 0 }}>
        Act
      </button>
    </div>
  );
}
