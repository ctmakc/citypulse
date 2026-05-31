"use client";

import { ReactNode, useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";

interface ScreenHeadProps {
  ico?: string;
  title: string;
  sub?: string;
  color?: string;
  actions?: ReactNode;
}

// Below this width the title/sub stack on top and actions wrap to a full-width row.
const STACK_BELOW = 620;

/**
 * Tracks whether the viewport is narrow enough to stack the header.
 * SSR-safe: renders desktop layout first, then corrects after mount so the
 * title is never crushed to "T..." on real mobile widths.
 */
function useIsNarrow(maxWidth: number): boolean {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const update = () => setNarrow(mq.matches);
    update();
    // addEventListener('change') is supported everywhere we target; fall back for older Safari.
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, [maxWidth]);
  return narrow;
}

export default function ScreenHead({ ico, title, sub, color = "var(--blue)", actions }: ScreenHeadProps) {
  const narrow = useIsNarrow(STACK_BELOW);

  return (
    <div
      style={{
        display: "flex",
        alignItems: narrow ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: narrow ? 12 : 16,
        padding: "22px 0 6px",
        // On narrow widths let the actions wrap onto their own line.
        flexWrap: narrow ? "wrap" : "nowrap",
      }}
    >
      {/* Left side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          // min-width:0 lets the title shrink and ellipsize gracefully instead of
          // forcing a tiny "T..."; flex:1 1 auto so it takes the available row.
          flex: "1 1 auto",
          minWidth: 0,
        }}
      >
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
              // When stacked, allow the title to wrap to 2 lines rather than truncate;
              // on desktop keep the original single-line ellipsis behavior.
              whiteSpace: narrow ? "normal" : "nowrap",
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

      {/* Right actions — wraps to a full-width row under the title on narrow widths. */}
      {actions && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
            ...(narrow
              ? { flexBasis: "100%", flexWrap: "wrap", justifyContent: "flex-start" }
              : null),
          }}
        >
          {actions}
        </div>
      )}
    </div>
  );
}
