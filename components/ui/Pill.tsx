"use client";

import { CSSProperties, ReactNode } from "react";

export const SEV_COLOR: Record<string, string> = {
  Critical: "var(--red)",
  High: "var(--red)",
  Elevated: "var(--amber)",
  Medium: "var(--amber)",
  Watch: "var(--blue)",
  Moderate: "var(--amber)",
  Low: "var(--slate)",
  OK: "var(--green)",
  Info: "var(--slate)",
};

function sevClass(sev?: string): string {
  if (!sev) return "p-slate";
  if (sev === "Critical" || sev === "High") return "p-red";
  if (sev === "Elevated" || sev === "Medium" || sev === "Moderate") return "p-amber";
  if (sev === "Watch") return "p-blue";
  if (sev === "OK") return "p-green";
  return "p-slate";
}

interface PillProps {
  sev?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Pill({ sev, children, className, style }: PillProps) {
  return (
    <span
      className={`pill ${sevClass(sev)}${className ? ` ${className}` : ""}`}
      style={style}
    >
      <span className="dot" />
      {children ?? sev}
    </span>
  );
}

export default Pill;
