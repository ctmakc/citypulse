"use client";

interface SkeletonProps {
  w?: string | number;
  h?: number;
  rounded?: boolean;
}

export default function Skeleton({ w = "100%", h = 16, rounded = false }: SkeletonProps) {
  return (
    <div
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
