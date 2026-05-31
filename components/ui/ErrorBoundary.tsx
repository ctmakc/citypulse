"use client";

/* ============================================================
   CityPULSE — Reusable widget error boundary
   A small class-component boundary for wrapping individual risky
   widgets (e.g. the Leaflet map, charts) so that one failing panel
   renders a compact inline fallback instead of taking down the whole
   page. React error boundaries must be class components.

   Usage:
     <ErrorBoundary label="Map">
       <CityMap ... />
     </ErrorBoundary>
   ============================================================ */

import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Short noun for the failing panel, e.g. "Map" or "Chart". */
  label?: string;
  /** Optional custom fallback; overrides the default inline panel. */
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error(
      `[CityPULSE] ${this.props.label ?? "widget"} boundary caught:`,
      error,
    );
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    const what = this.props.label ? `${this.props.label}` : "This panel";

    return (
      <div
        role="alert"
        style={{
          width: "100%",
          height: "100%",
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "24px 18px",
          textAlign: "center",
          background: "var(--surface-2)",
          border: "1px solid var(--rule)",
          borderRadius: "var(--r)",
          color: "var(--ink-faint)",
          fontFamily: "var(--grotesk)",
          boxSizing: "border-box",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "var(--surface-3)",
            color: "var(--ink-faint)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <circle cx={12} cy={12} r={10} />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-soft)" }}>
          {what} failed to load
        </div>
        <button
          onClick={this.handleRetry}
          style={{
            marginTop: 2,
            border: "1px solid var(--rule)",
            background: "var(--surface)",
            color: "var(--ink-soft)",
            borderRadius: "var(--r-pill)",
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--grotesk)",
          }}
        >
          Retry
        </button>
      </div>
    );
  }
}
