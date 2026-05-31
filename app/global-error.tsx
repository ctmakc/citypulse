"use client";

/* ============================================================
   CityPULSE — Global (root) error boundary
   Last-resort fallback. This boundary REPLACES the root layout when
   the layout itself (or something above every page) throws, so it must
   render its own <html>/<body>. globals.css / design tokens are not
   guaranteed here, so styles use literal CALM-palette values.
   ============================================================ */

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[CityPULSE] fatal error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#F3F0E8",
          color: "#2A3037",
          fontFamily:
            "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          WebkitFontSmoothing: "antialiased",
          padding: "24px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            background: "#FFFFFF",
            border: "1px solid #E8E3D8",
            borderRadius: 12,
            boxShadow: "0 2px 10px rgba(42,48,55,.055), 0 1px 2px rgba(42,48,55,.04)",
            borderTop: "3px solid #B23A33",
            padding: "34px 30px 28px",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          {/* CityPULSE seal */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "#2A3037",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
                <path d="M3 8l9 5 9-5" />
                <path d="M12 13v8" />
              </svg>
            </div>
            <div
              style={{
                fontFamily: "Spectral, Georgia, serif",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "#2A3037",
              }}
            >
              CityPULSE
            </div>
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily: "Spectral, Georgia, serif",
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#2A3037",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              margin: "10px 0 0",
              fontFamily: "Spectral, Georgia, serif",
              fontSize: 14.5,
              lineHeight: 1.6,
              color: "#5A626B",
            }}
          >
            The application ran into an unexpected problem and couldn&apos;t recover this screen. Reloading
            usually fixes it.
          </p>

          {error?.digest && (
            <div
              style={{
                marginTop: 16,
                fontFamily: "'IBM Plex Mono', ui-monospace, Menlo, monospace",
                fontSize: 10.5,
                letterSpacing: "0.04em",
                color: "#5F666E",
              }}
            >
              Ref: {error.digest}
            </div>
          )}

          <button
            onClick={() => reset()}
            style={{
              marginTop: 24,
              height: 46,
              padding: "0 22px",
              border: "1px solid transparent",
              borderRadius: 12,
              background: "#2A3037",
              color: "#fff",
              fontFamily: "Archivo, -apple-system, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload CityPulse
          </button>
        </div>
      </body>
    </html>
  );
}
