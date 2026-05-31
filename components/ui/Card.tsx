"use client";

import { CSSProperties, ReactNode } from "react";

interface CardProps {
  title?: string;
  code?: string;
  right?: ReactNode;
  children?: ReactNode;
  pad?: boolean;
  style?: CSSProperties;
  className?: string;
}

export default function Card({
  title,
  code,
  right,
  children,
  pad = true,
  style,
  className,
}: CardProps) {
  const hasHead = title || code || right;

  return (
    <div className={`surface${className ? ` ${className}` : ""}`} style={style}>
      {hasHead && (
        <div
          className="panel-head"
          style={{ borderBottom: "1px solid var(--rule)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            {code && (
              <span
                className="code"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "var(--ink-faint)",
                  fontWeight: 500,
                  background: "var(--surface-3)",
                  border: "1px solid var(--rule)",
                  borderRadius: "var(--r-sm)",
                  padding: "2px 7px",
                }}
              >
                {code}
              </span>
            )}
            {title && <span className="panel-title">{title}</span>}
          </div>
          {right && <div style={{ flexShrink: 0 }}>{right}</div>}
        </div>
      )}
      <div style={pad ? { padding: "16px 18px" } : undefined}>{children}</div>
    </div>
  );
}
