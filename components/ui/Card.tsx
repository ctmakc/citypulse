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
            {code && <span className="code">{code}</span>}
            {title && <span className="panel-title">{title}</span>}
          </div>
          {right && <div style={{ flexShrink: 0 }}>{right}</div>}
        </div>
      )}
      <div style={pad ? { padding: "16px 18px" } : undefined}>{children}</div>
    </div>
  );
}
