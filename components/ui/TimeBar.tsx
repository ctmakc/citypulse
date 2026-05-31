"use client";

import { useState } from "react";

interface TimeBarProps {
  inline?: boolean;
  /**
   * Notifies the parent when the slider moves (−72 … 0 … +72, in hours).
   * Optional so existing callers (Overview, Emergency) that just want a
   * decorative slider keep working with the component's own internal state.
   */
  onChange?: (value: number) => void;
  /** Optional controlled value. When omitted, TimeBar manages its own state. */
  value?: number;
}

export function regimeForValue(val: number): "History" | "Now" | "Forecast" {
  if (val < -12) return "History";
  if (val > 12) return "Forecast";
  return "Now";
}

export default function TimeBar({ inline, onChange, value }: TimeBarProps) {
  const [internal, setInternal] = useState(0);
  // Controlled when a `value` prop is supplied; otherwise self-managed.
  const val = value ?? internal;

  const label = regimeForValue(val);

  function handleChange(next: number) {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: inline ? 8 : 12,
        flexWrap: "wrap",
        padding: inline ? 0 : "10px 0",
      }}
    >
      <span className="code" style={{ whiteSpace: "nowrap", color: "var(--ink-faint)" }}>
        −72h
      </span>
      <input
        type="range"
        min={-72}
        max={72}
        value={val}
        onChange={(e) => handleChange(Number(e.target.value))}
        aria-label="Time horizon: history to forecast, in hours"
        aria-valuetext={`${val > 0 ? "+" : ""}${val}h — ${label}`}
        style={{
          flex: 1,
          minWidth: 80,
          accentColor: "var(--blue)",
          cursor: "pointer",
        }}
      />
      <span
        className="code"
        style={{
          whiteSpace: "nowrap",
          color: val > 12 ? "var(--amber)" : val < -12 ? "var(--slate)" : "var(--blue)",
          minWidth: 52,
          textAlign: "center",
        }}
      >
        {label}
      </span>
      <span className="code" style={{ whiteSpace: "nowrap", color: "var(--amber)" }}>
        +72h
      </span>
    </div>
  );
}
