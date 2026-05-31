"use client";

import { ReactNode, useEffect, useRef } from "react";

interface ScreenProps {
  children?: ReactNode;
  scroll?: boolean;
  pad?: boolean;
}

export default function Screen({ children, scroll = true, pad = true }: ScreenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(8px)";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "opacity .3s ease, transform .3s ease";
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    });
  }, []);

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        minHeight: 0,
        overflow: scroll ? "auto" : "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        ref={ref}
        style={{
          padding: pad ? "0 24px 28px" : 0,
          gap: 18,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
