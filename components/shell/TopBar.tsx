"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { usePortalStore } from "@/lib/store";
import { ALERTS as STATIC_ALERTS, ROLES, CITY } from "@/lib/data";
import { alertsApi } from "@/lib/api";

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

function sevColor(sev: string) {
  if (sev === "Critical") return "var(--red)";
  if (sev === "Elevated") return "var(--amber)";
  return "var(--slate)";
}

export default function TopBar() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { role, setRole, toggleAI, aiOpen, navOpen, setNavOpen, currentUser } = usePortalStore();

  const [roleOpen, setRoleOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [liveAlerts, setLiveAlerts] = useState(STATIC_ALERTS);

  useEffect(() => {
    alertsApi.list()
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) setLiveAlerts(res.data);
      })
      .catch(() => {});
  }, []);

  const roleRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);
  const roleBtnRef = useRef<HTMLButtonElement>(null);
  const bellBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) setRoleOpen(false);
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // Escape closes whichever dropdown is open, and returns focus to its trigger.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (roleOpen) { setRoleOpen(false); roleBtnRef.current?.focus(); }
      if (bellOpen) { setBellOpen(false); bellBtnRef.current?.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [roleOpen, bellOpen]);

  const criticalCount = liveAlerts.filter(a => a.sev === "Critical").length;

  return (
    <div style={{
      height: 56, display: "flex", alignItems: "center",
      padding: isMobile ? "0 12px" : "0 18px", gap: isMobile ? 6 : 10,
      borderBottom: "1px solid var(--rule)",
      background: "var(--surface)",
      boxShadow: "var(--sh-1)",
      flexShrink: 0, position: "relative", zIndex: 50,
    }}>

      {/* Hamburger (mobile) */}
      {isMobile && (
        <button
          className="btn-quiet"
          style={{ padding: 8, borderRadius: 8, background: "none", border: "none", cursor: "pointer", display: "grid", placeItems: "center" }}
          onClick={() => setNavOpen(!navOpen)}
          aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={navOpen}
          aria-controls="primary-navigation"
        >
          <Icon name="menu" size={20} />
        </button>
      )}

      {/* Seal + wordmark */}
      <button
        onClick={() => router.push("/overview")}
        aria-label="Meridian Civil OS — go to Overview"
        style={{
          display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0,
          background: "none", border: "none", padding: 0, font: "inherit", textAlign: "left",
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: "var(--r-sm)",
          background: "var(--ink)", display: "grid", placeItems: "center",
          color: "#fff", flexShrink: 0,
        }}>
          <Icon name="assets" size={18} strokeWidth={1.6} />
        </div>
        <div style={{ lineHeight: 1.1 }}>
          <div className="serif" style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>
            Meridian
          </div>
          <div className="code" style={{ fontSize: 9, marginTop: 1 }}>Civil OS</div>
        </div>
      </button>

      {/* Search (desktop only) */}
      {!isMobile && (
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
            <span style={{
              position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
              color: "var(--ink-faint)", display: "grid", placeItems: "center", pointerEvents: "none",
            }}>
              <Icon name="search" size={14} />
            </span>
            <input
              aria-label="Search assets, addresses, report IDs, and projects"
              placeholder="Search assets, addresses, report IDs, projects…"
              style={{
                width: "100%", height: 36, paddingLeft: 38, paddingRight: 14,
                border: "1px solid var(--rule)", borderRadius: "var(--r-pill)",
                background: "var(--surface-2)", fontSize: 13, color: "var(--ink)", outline: "none",
              }}
            />
          </div>
        </div>
      )}

      {isMobile && <div style={{ flex: 1 }} />}

      {/* Right cluster */}
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 4 : 6, flexShrink: 0 }}>

        {/* Role switcher — desktop only ("Viewing as / Role") */}
        {!isMobile && (
          <div ref={roleRef} style={{ position: "relative" }}>
            <button
              ref={roleBtnRef}
              onClick={() => setRoleOpen(!roleOpen)}
              aria-haspopup="menu"
              aria-expanded={roleOpen}
              aria-label={`Viewing as ${role}. Change role`}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 10px 6px 14px",
                border: "1px solid var(--rule)", borderRadius: "var(--r-pill)",
                background: "var(--surface)", boxShadow: "var(--sh-1)",
                cursor: "pointer",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div className="code" style={{ fontSize: 8.5, letterSpacing: "0.1em" }}>Viewing as</div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", lineHeight: 1.1 }}>{role}</div>
              </div>
              <span aria-hidden="true" style={{
                color: "var(--ink-faint)",
                transform: roleOpen ? "rotate(180deg)" : "none",
                transition: "transform .15s",
              }}>
                <Icon name="chevron" size={14} />
              </span>
            </button>

            {roleOpen && (
              <div
                role="menu"
                aria-label="Select role"
                className="surface"
                style={{
                  position: "absolute", top: "calc(100% + 6px)", right: 0,
                  width: 220, zIndex: 100, padding: 6, maxHeight: 340, overflowY: "auto",
                }}
              >
                {ROLES.map(r => (
                  <button
                    key={r}
                    role="menuitemradio"
                    aria-checked={r === role}
                    onClick={() => { setRole(r); setRoleOpen(false); roleBtnRef.current?.focus(); }}
                    style={{
                      width: "100%", border: "none", font: "inherit", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "8px 12px", borderRadius: "var(--r-sm)",
                      fontSize: 12.5,
                      color: r === role ? "var(--blue)" : "var(--ink-soft)",
                      fontWeight: r === role ? 600 : 400,
                      background: r === role ? "var(--blue-wash)" : "transparent",
                      textAlign: "left",
                    }}
                  >
                    {r}
                    {r === role && <Icon name="check" size={13} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Ask Meridian — icon-only on mobile */}
        <button
          onClick={toggleAI}
          aria-label="Ask Meridian AI"
          aria-pressed={aiOpen}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: isMobile ? 8 : "8px 14px 8px 12px",
            border: `1px solid ${aiOpen ? "var(--blue)" : "var(--rule)"}`,
            borderRadius: "var(--r-pill)",
            background: aiOpen ? "var(--blue)" : "var(--surface)",
            color: aiOpen ? "#fff" : "var(--blue)",
            cursor: "pointer", fontWeight: 600, fontSize: 12.5,
            boxShadow: "var(--sh-1)",
          }}
        >
          <Icon name="sparkles" size={15} strokeWidth={1.5} />
          {!isMobile && "Ask Meridian"}
        </button>

        {/* Bell */}
        <div ref={bellRef} style={{ position: "relative" }}>
          <button
            ref={bellBtnRef}
            onClick={() => setBellOpen(!bellOpen)}
            aria-label={`Notifications${criticalCount ? `, ${criticalCount} critical` : ""}`}
            aria-haspopup="menu"
            aria-expanded={bellOpen}
            style={{
              position: "relative", width: 36, height: 36, borderRadius: "50%",
              background: "none", border: "1px solid var(--rule)", cursor: "pointer",
              display: "grid", placeItems: "center", color: "var(--ink-soft)",
            }}
          >
            <Icon name="bell" size={17} />
            <span aria-hidden="true" style={{
              position: "absolute", top: 7, right: 8,
              width: 7, height: 7, borderRadius: "50%",
              background: "var(--red)", border: "1.5px solid var(--surface)",
            }} />
          </button>

          {bellOpen && (
            <div
              role="menu"
              aria-label="Notifications"
              className="surface"
              style={{
                position: "absolute", top: "calc(100% + 6px)", right: 0,
                width: isMobile ? "calc(100vw - 24px)" : 340,
                maxWidth: 340,
                maxHeight: 360, overflowY: "auto", zIndex: 100,
              }}
            >
              <div className="panel-head" style={{ borderBottom: "1px solid var(--rule)" }}>
                <span className="panel-title">Notifications</span>
                <span className="pill p-red"><span className="dot" />{criticalCount} critical</span>
              </div>
              {liveAlerts.map(a => (
                <button
                  key={a.id}
                  role="menuitem"
                  onClick={() => { setBellOpen(false); router.push(a.cat === "Wildfire" ? "/emergency" : "/digital-twin"); }}
                  style={{
                    width: "100%", border: "none", font: "inherit", cursor: "pointer", textAlign: "left",
                    display: "flex", gap: 10, padding: "11px 16px",
                    borderBottom: "1px solid var(--rule-soft)", background: "transparent",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-2)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: sevColor(a.sev), flexShrink: 0, marginTop: 4 }} />
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.35 }}>{a.title}</div>
                    <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-faint)", marginTop: 3 }}>
                      {a.id} · {a.where}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* City Risk pill — kept on mobile (condensed) */}
        <button
          onClick={() => router.push("/emergency")}
          aria-label={`City risk score ${CITY.riskScore}, ${CITY.riskLabel}. View emergency dashboard`}
          style={{
            display: "flex", alignItems: "center", gap: isMobile ? 6 : 10,
            padding: isMobile ? "4px 10px 4px 9px" : "5px 14px 5px 12px", borderRadius: "var(--r-pill)",
            background: "var(--amber-wash)", cursor: "pointer",
            border: "none", font: "inherit",
          }}
        >
          <div className="serif" style={{ fontSize: isMobile ? 18 : 22, fontWeight: 600, color: "var(--amber)", lineHeight: 1 }}>
            {CITY.riskScore}
          </div>
          {!isMobile && (
            <div style={{ lineHeight: 1.15 }}>
              <div className="code" style={{ fontSize: 8.5, color: "var(--amber)" }}>City Risk</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--amber)" }}>{CITY.riskLabel}</div>
            </div>
          )}
        </button>

        {/* User avatar — desktop only (role switcher hidden on mobile shows identity via menu) */}
        {!isMobile && (
          <div
            role="img"
            aria-label={`Signed in as ${currentUser?.name ?? "Jordan Rivera"}`}
            title={currentUser?.name ?? "Jordan Rivera"}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "var(--blue)", color: "#fff",
              display: "grid", placeItems: "center",
              fontSize: 12, fontWeight: 700, flexShrink: 0, cursor: "pointer",
            }}
          >
            {currentUser?.initials ?? "JR"}
          </div>
        )}
      </div>
    </div>
  );
}
