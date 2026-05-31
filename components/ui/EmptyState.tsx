export default function EmptyState({
  icon = "search",
  title,
  sub,
}: {
  icon?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        color: "var(--ink-faint)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: "var(--surface-2)",
          display: "grid",
          placeItems: "center",
          marginBottom: 14,
        }}
      >
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
        >
          <circle cx={11} cy={11} r={8} />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>
      <div
        style={{
          fontWeight: 600,
          fontSize: 14,
          color: "var(--ink-soft)",
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      {sub && (
        <div style={{ fontSize: 12.5, color: "var(--ink-faint)" }}>{sub}</div>
      )}
    </div>
  );
}
