"use client";

import { useEffect } from "react";
import { usePortalStore } from "@/lib/store";

export default function Toast() {
  const { toast, clearToast } = usePortalStore();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(clearToast, 4000);
    return () => clearTimeout(t);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 300,
        background: toast.type === "error" ? "var(--red)" : "var(--ink)",
        color: "#fff",
        padding: "14px 20px",
        borderRadius: "var(--r)",
        boxShadow: "var(--sh-pop)",
        fontSize: 13.5,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: 10,
        minWidth: 260,
        maxWidth: 400,
      }}
    >
      <span aria-hidden="true">{toast.type === "success" ? "✓" : "✕"}</span>
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button
        onClick={clearToast}
        aria-label="Dismiss notification"
        style={{
          background: "none",
          border: "none",
          color: "rgba(255,255,255,.7)",
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        ×
      </button>
    </div>
  );
}
