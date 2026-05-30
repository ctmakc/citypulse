"use client";

import { ReactNode } from "react";

interface ScreenProps {
  children?: ReactNode;
  scroll?: boolean;
  pad?: boolean;
}

export default function Screen({ children, scroll = true, pad = true }: ScreenProps) {
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
        style={{
          padding: pad ? "0 24px 28px" : 0,
          gap: 18,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
