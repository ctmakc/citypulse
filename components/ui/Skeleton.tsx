"use client";

interface SkeletonProps {
  w?: string | number;
  h?: number;
  rounded?: boolean;
}

export default function Skeleton({ w = "100%", h = 16, rounded = false }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: w,
        height: h,
        borderRadius: rounded ? "100px" : "4px",
        background: "linear-gradient(90deg, var(--rule) 0%, var(--surface-2) 50%, var(--rule) 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s infinite",
      }}
    />
  );
}

/**
 * A grid-shaped skeleton row, sized to match a real table row.
 * `cols` mirrors the gridTemplateColumns of the table it stands in for.
 */
export function SkeletonRow({
  cols,
  padding = "12px 18px",
}: {
  cols: string;
  padding?: string;
}) {
  const count = cols.trim().split(/\s+/).length;
  return (
    <div
      aria-hidden="true"
      style={{
        display: "grid",
        gridTemplateColumns: cols,
        padding,
        borderBottom: "1px solid var(--rule-soft)",
        alignItems: "center",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ padding: "0 6px" }}>
          <Skeleton w={i === 0 ? "60%" : "78%"} h={12} />
        </div>
      ))}
    </div>
  );
}
