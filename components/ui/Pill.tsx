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

function sevAriaLabel(sev?: string, children?: ReactNode): string {
  const label = children ? String(children) : sev ?? "";
  if (!sev) return label;
  const urgency =
    sev === "Critical" || sev === "High"
      ? "high urgency"
      : sev === "Elevated" || sev === "Medium" || sev === "Moderate"
      ? "medium urgency"
      : sev === "Watch"
      ? "watch"
      : sev === "OK"
      ? "normal"
      : "low urgency";
  return `${label} — ${urgency}`;
}

export function Pill({ sev, children, className, style }: PillProps) {
  return (
    <span
      className={`pill ${sevClass(sev)}${className ? ` ${className}` : ""}`}
      style={style}
      aria-label={sevAriaLabel(sev, children)}
    >
      <span className="dot" aria-hidden="true" />
      {children ?? sev}
    </span>
  );
}

export default Pill;
