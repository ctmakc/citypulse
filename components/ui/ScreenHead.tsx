"use client";

import { ReactNode } from "react";
import Icon from "@/components/ui/Icon";

interface ScreenHeadProps {
  ico?: string;
  title: string;
  sub?: string;
  color?: string;
  actions?: ReactNode;
}

export default function ScreenHead({ ico, title, sub, color = "var(--blue)", actions }: ScreenHeadProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "22px 0 6px",
      }}
    >
      {/* Left side */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
        {ico && (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "var(--r-sm)",
              background: `color-mix(in srgb, ${color} 12%, transparent)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color,
              flexShrink: 0,
            }}
          >
            <Icon name={ico} size={20} strokeWidth={1.7} />
          </div>
        )}
        <div style={{ minWidth: 0 }}>
          <h1
            className="serif"
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: "var(--ink)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </h1>
          {sub && (
            <p
              style={{
                margin: "3px 0 0",
                fontSize: 13,
                color: "var(--ink-soft)",
                lineHeight: 1.4,
              }}
            >
              {sub}
            </p>
          )}
        </div>
      </div>

      {/* Right actions */}
      {actions && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {actions}
        </div>
      )}
    </div>
  );
}
