"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { usePortalStore } from "@/lib/store";
import { ALERTS, ROLES, CITY } from "@/lib/data";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 760);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function severityColor(sev: string) {
  if (sev === "Critical") return "var(--red)";
  if (sev === "Elevated") return "var(--amber)";
  return "var(--slate)";
}

export default function TopBar() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { role, setRole, toggleAI, navOpen, setNavOpen } = usePortalStore();

  const [roleOpen, setRoleOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);

  const roleRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) setRoleOpen(false);
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 12,
        borderBottom: "1px solid var(--rule)",
        background: "var(--surface)",
        boxShadow: "var(--sh-1)",
        flexShrink: 0,
        position: "relative",
        zIndex: 50,
      }}
    >
      {/* Hamburger (mobile) */}
      {isMobile && (
        <button
          className="btn-quiet btn"
          style={{ padding: "7px", gap: 0 }}
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Open navigation"
        >
          <Icon name="menu" size={18} />
        </button>
      )}

      {/* Wordmark / seal — click → /overview */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }}
        onClick={() => router.push("/overview")}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "var(--r-sm)",
            background: "var(--ink)",
            display: "grid",
            placeItems: "center",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          <Icon name="assets" size={17} strokeWidth={1.6} />
        </div>
        <div style={{ lineHeight: 1.15 }}>
          <div className="serif" style={{ fontSize: 19, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em" }}>
            Meridian
          </div>
          <div className="code" style={{ fontSize: 9 }}>Civil OS</div>
        </div>
      </div>

      {/* Search (hidden mobile) */}
      {!isMobile && (
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 400,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ position: "absolute", left: 14, color: "var(--ink-faint)", display: "grid", placeItems: "center", pointerEvents: "none" }}>
              <Icon name="search" size={15} />
            </span>
            <input
              placeholder="Search assets, addresses, report IDs, projects…"
              style={{
                width: "100%",
                height: 36,
                paddingLeft: 40,
                paddingRight: 16,
                border: "1px solid var(--rule)",
                borderRadius: "var(--r-pill)",
                background: "var(--surface-2)",
                fontSize: 13,
                color: "var(--ink)",
                outline: "none",
              }}
            />
          </div>
        </div>
      )}

      {/* Spacer on mobile */}
      {isMobile && <div style={{ flex: 1 }} />}

      {/* Right cluster */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>

        {/* Role switcher (hidden mobile) */}
        {!isMobile && (
          <div ref={roleRef} style={{ position: "relative" }}>
            <button
              className="btn btn-ghost"
              style={{ padding: "6px 12px", fontSize: 12, gap: 6 }}
              onClick={() => setRoleOpen(!roleOpen)}
            >
              <Icon name="user" size={14} />
              {role}
              <Icon name="chevron" size={12} />
            </button>
            {roleOpen && (
              <div
                className="surface"
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  right: 0,
                  minWidth: 200,
                  zIndex: 100,
                  padding: "6px",
                  borderRadius: "var(--r)",
                }}
              >
                {ROLES.map((r) => (
                  <div
                    key={r}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 12px",
                      borderRadius: "var(--r-sm)",
                      cursor: "pointer",
                      fontSize: 13,
                      color: r === role ? "var(--blue)" : "var(--ink)",
                      fontWeight: r === role ? 600 : 400,
                      background: r === role ? "var(--blue-wash)" : "transparent",
                    }}
                    onClick={() => { setRole(r); setRoleOpen(false); }}
                  >
                    {r === role && <Icon name="check" size={13} />}
                    {r !== role && <span style={{ width: 13 }} />}
                    {r}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Ask Meridian AI button */}
        <button
          className="btn"
          style={{ padding: "7px 14px", fontSize: 12.5, gap: 7, background: "var(--blue)" }}
          onClick={toggleAI}
        >
          <Icon name="sparkles" size={14} />
          {!isMobile && "Ask Meridian"}
        </button>

        {/* Bell notifications */}
        <div ref={bellRef} style={{ position: "relative" }}>
          <button
            className="btn btn-ghost"
            style={{ padding: "7px", gap: 0, position: "relative" }}
            onClick={() => setBellOpen(!bellOpen)}
            aria-label="Notifications"
          >
            <Icon name="bell" size={17} />
            <span
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--red)",
                border: "1.5px solid var(--surface)",
              }}
            />
          </button>
          {bellOpen && (
            <div
              className="surface"
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                right: 0,
                width: 340,
                maxHeight: 360,
                overflowY: "auto",
                zIndex: 100,
                borderRadius: "var(--r)",
                padding: "8px 0",
              }}
            >
              <div style={{ padding: "4px 16px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>Alerts</span>
                <span className="code" style={{ fontSize: 9 }}>{ALERTS.length} active</span>
              </div>
              {ALERTS.map((a) => (
                <div
                  key={a.id}
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "8px 16px",
                    cursor: "pointer",
                    transition: "background .12s",
                  }}
                  onClick={() => {
                    setBellOpen(false);
                    if (a.cat === "Wildfire") router.push("/emergency");
                    else router.push("/digital-twin");
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: severityColor(a.sev),
                      flexShrink: 0,
                      marginTop: 4,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}>
                      <span className="mono">{a.id}</span> · {a.where}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* City Risk pill */}
        <div
          className="pill p-amber"
          style={{ cursor: "pointer", flexShrink: 0 }}
          onClick={() => router.push("/emergency")}
        >
          <span className="dot" />
          {CITY.riskScore} · {CITY.riskLabel}
        </div>

        {/* JR avatar */}
        <a
          href="/"
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "var(--blue)",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            fontSize: 12,
            fontWeight: 700,
            flexShrink: 0,
            textDecoration: "none",
          }}
          title="Profile"
        >
          JR
        </a>
      </div>
    </div>
  );
}
