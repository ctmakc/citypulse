"use client";

/* ============================================================
   CityPULSE — Route-segment error boundary
   Catches render/runtime errors in the route subtree and shows a
   calm, branded recovery screen. We never surface a raw stack trace
   to the user; the digest is logged for ops correlation only.
   ============================================================ */

import { useEffect } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to the console (and whatever monitoring hooks onto it) — not the UI.
    console.error("[CityPULSE] route error:", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--paper)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "var(--grotesk)",
        color: "var(--ink)",
      }}
    >
      <div
        className="surface"
        style={{
          width: "100%",
          maxWidth: 460,
          padding: "36px 32px 30px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderTop: "3px solid var(--red)",
        }}
      >
        {/* CityPULSE seal */}
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 22 }}>
          <div
            aria-hidden="true"
            style={{
              width: 38,
              height: 38,
              borderRadius: "var(--r-sm)",
              background: "var(--ink)",
              color: "#fff",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <Icon name="assets" size={20} strokeWidth={1.6} />
          </div>
          <div style={{ lineHeight: 1.1, textAlign: "left" }}>
            <div
              className="serif"
              style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--ink)" }}
            >
              CityPULSE
            </div>
            <div className="code" style={{ fontSize: 9.5, letterSpacing: "0.12em", color: "var(--ink-faint)" }}>
              Civil OS
            </div>
          </div>
        </div>

        {/* Status icon */}
        <div
          aria-hidden="true"
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--red-wash)",
            color: "var(--red)",
            display: "grid",
            placeItems: "center",
            marginBottom: 18,
          }}
        >
          <Icon name="warning" size={28} strokeWidth={1.8} />
        </div>

        <h1
          className="serif"
          style={{ margin: 0, fontSize: 25, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ink)" }}
        >
          Something went wrong
        </h1>
        <p className="lede" style={{ margin: "10px 0 0", fontSize: 14.5, maxWidth: 360 }}>
          We hit an unexpected error loading this view. Your data is safe — try again, or head back to the
          overview.
        </p>

        {/* Digest (correlation id) — quiet, mono, no stack trace */}
        {error?.digest && (
          <div
            className="mono"
            style={{
              marginTop: 16,
              fontSize: 10.5,
              letterSpacing: "0.04em",
              color: "var(--ink-faint)",
            }}
          >
            Ref: {error.digest}
          </div>
        )}

        {/* Actions */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            width: "100%",
            marginTop: 24,
          }}
        >
          <button
            onClick={() => reset()}
            className="btn"
            style={{ height: 46, padding: "0 20px", fontSize: 14, borderRadius: "var(--r)" }}
          >
            <Icon name="arrowR" size={16} strokeWidth={2} />
            Try again
          </button>
          <Link
            href="/overview"
            className="btn btn-ghost"
            style={{ height: 46, padding: "0 18px", fontSize: 14, borderRadius: "var(--r)" }}
          >
            <Icon name="overview" size={16} strokeWidth={1.8} />
            Back to overview
          </Link>
        </div>
      </div>
    </div>
  );
}
