"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePortalStore } from "@/lib/store";
import TopBar from "@/components/shell/TopBar";
import Sidebar from "@/components/shell/Sidebar";
import AssistantDock from "@/components/shell/AssistantDock";
import DetailDrawer from "@/components/shell/DetailDrawer";
import AssetPanel from "@/components/shell/AssetPanel";
import Icon from "@/components/ui/Icon";
import Toast from "@/components/ui/Toast";
import { authApi } from "@/lib/api";

const BOTTOM_TABS: [string, string, string][] = [
  ["overview", "Overview", "overview"],
  ["digital-twin", "Twin", "twin"],
  ["tasks", "Tasks", "tasks"],
  ["ai-agents", "Agents", "ai"],
];

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

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

export default function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();

  const { aiOpen, setAIOpen, picked, setPicked, detail, setDetail, navOpen, setNavOpen, setCurrentUser, role } = usePortalStore();

  const [skipFocused, setSkipFocused] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Load current user — only if token exists, otherwise use placeholder immediately
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('citypulse_token') : null;

    if (!token) {
      setCurrentUser({ name: "Jordan Rivera", email: "j.rivera@meridian.gov", role, initials: "JR" });
      return;
    }

    authApi.me()
      .then((res) => {
        const data = res.data?.user ?? res.data;
        if (data?.name) {
          setCurrentUser({ name: data.name, email: data.email ?? "", role: data.role ?? role, initials: getInitials(data.name) });
        } else {
          setCurrentUser({ name: "Jordan Rivera", email: "j.rivera@meridian.gov", role, initials: "JR" });
        }
      })
      .catch(() => {
        setCurrentUser({ name: "Jordan Rivera", email: "j.rivera@meridian.gov", role, initials: "JR" });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close the mobile slide-over whenever we leave mobile width.
  useEffect(() => {
    if (!isMobile && navOpen) setNavOpen(false);
  }, [isMobile, navOpen, setNavOpen]);

  // Mobile drawer: move focus inside on open, restore to the hamburger on close,
  // and close on Escape. The hamburger lives in TopBar so we restore by querying it.
  useEffect(() => {
    if (!isMobile) return;
    if (navOpen) {
      const id = requestAnimationFrame(() => {
        drawerRef.current?.querySelector<HTMLElement>("button, a, [tabindex]")?.focus();
      });
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setNavOpen(false);
          (document.querySelector('[aria-controls="primary-navigation"]') as HTMLElement | null)?.focus();
        }
      };
      document.addEventListener("keydown", onKey);
      return () => {
        cancelAnimationFrame(id);
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [navOpen, isMobile, setNavOpen]);

  function closeNav() {
    setNavOpen(false);
    (document.querySelector('[aria-controls="primary-navigation"]') as HTMLElement | null)?.focus();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Skip to content — first focusable element. Visually hidden until focused.
          `.skip-link` is styled globally; inline state is a self-contained fallback. */}
      <a
        href="#main-content"
        className="skip-link"
        onFocus={() => setSkipFocused(true)}
        onBlur={() => setSkipFocused(false)}
        style={
          skipFocused
            ? {
                position: "fixed", top: 8, left: 8, zIndex: 9999,
                background: "var(--ink)", color: "#fff",
                padding: "8px 14px", borderRadius: "var(--r-sm)",
                fontSize: 13, fontWeight: 600, textDecoration: "none",
                boxShadow: "var(--sh-3)",
              }
            : {
                position: "absolute", width: 1, height: 1,
                padding: 0, margin: -1, overflow: "hidden",
                clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0,
              }
        }
      >
        Skip to content
      </a>

      {/* Top bar */}
      <TopBar />

      {/* Main body row */}
      <div style={{ display: "flex", flex: 1, minHeight: 0, position: "relative" }}>

        {/* Desktop sidebar — hidden on mobile */}
        {!isMobile && (
          <div
            style={{
              padding: "0 0 16px 16px",
              flexShrink: 0,
              overflowY: "auto",
            }}
          >
            <Sidebar currentPath={pathname} />
          </div>
        )}

        {/* Mobile sidebar slide-over */}
        {isMobile && (
          <>
            {/* Scrim */}
            <div
              onClick={closeNav}
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(42,48,55,.28)",
                zIndex: 45,
                opacity: navOpen ? 1 : 0,
                pointerEvents: navOpen ? "auto" : "none",
                transition: "opacity .28s",
              }}
            />
            {/* Slide-over */}
            <div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Primary navigation"
              aria-hidden={!navOpen}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                zIndex: 46,
                background: "var(--surface)",
                borderRight: "1px solid var(--rule)",
                boxShadow: "var(--sh-3)",
                transform: navOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform .28s cubic-bezier(.32,.72,0,1)",
                paddingBottom: 16,
                visibility: navOpen ? "visible" : "hidden",
              }}
            >
              {/* Closes on nav click (onNavigate) or scrim tap (above). */}
              <Sidebar currentPath={pathname} onNavigate={closeNav} />
            </div>
          </>
        )}

        {/* Main content area */}
        <main
          id="main-content"
          tabIndex={-1}
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            overflowY: "auto",
            outline: "none",
          }}
        >
          {children}
        </main>

        {/* AI Dock — right side push panel (desktop) */}
        <div
          style={{
            width: aiOpen ? 392 : 0,
            transition: "width .36s cubic-bezier(.32,.72,0,1)",
            overflow: "hidden",
            flexShrink: 0,
            display: isMobile ? "none" : "block",
          }}
        >
          {aiOpen && (
            <div style={{ width: 392, height: "100%" }}>
              <AssistantDock open={aiOpen} onClose={() => setAIOpen(false)} isMobile={false} />
            </div>
          )}
        </div>

        {/* Mobile AI overlay — full-screen slide-in */}
        {isMobile && (
          <>
            <div
              onClick={() => setAIOpen(false)}
              aria-hidden="true"
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(42,48,55,.18)",
                zIndex: 58,
                opacity: aiOpen ? 1 : 0,
                pointerEvents: aiOpen ? "auto" : "none",
                transition: "opacity .3s",
              }}
            />
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 59,
                display: "flex",
                flexDirection: "column",
                transform: aiOpen ? "translateX(0)" : "translateX(100%)",
                transition: "transform .32s cubic-bezier(.32,.72,0,1)",
                pointerEvents: aiOpen ? "auto" : "none",
                visibility: aiOpen ? "visible" : "hidden",
              }}
            >
              {aiOpen && <AssistantDock open={aiOpen} onClose={() => setAIOpen(false)} isMobile />}
            </div>
          </>
        )}
      </div>

      {/* Asset bottom panel */}
      <AssetPanel a={picked} onClose={() => setPicked(null)} isMobile={isMobile} />

      {/* Detail drawer */}
      <DetailDrawer detail={detail} onClose={() => setDetail(null)} isMobile={isMobile} />

      {/* Global toast notifications */}
      <Toast />

      {/* Mobile bottom tabs */}
      {isMobile && (
        <nav
          aria-label="Bottom navigation"
          style={{
            display: "flex",
            borderTop: "1px solid var(--rule)",
            background: "var(--surface)",
            flexShrink: 0,
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          {BOTTOM_TABS.map(([slug, label, ico]) => {
            const active = pathname.replace(/^\//, "") === slug;
            return (
              <button
                key={slug}
                onClick={() => router.push(`/${slug}`)}
                aria-current={active ? "page" : undefined}
                aria-label={label}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  padding: "10px 4px 8px",
                  border: "none",
                  background: "transparent",
                  color: active ? "var(--blue)" : "var(--ink-faint)",
                  fontSize: 10,
                  fontWeight: active ? 600 : 400,
                  cursor: "pointer",
                  fontFamily: "var(--grotesk)",
                  transition: "color .14s",
                }}
              >
                <Icon name={ico} size={20} strokeWidth={active ? 2 : 1.7} />
                {label}
              </button>
            );
          })}
          <button
            onClick={() => setNavOpen(true)}
            aria-label="More — open full navigation menu"
            aria-haspopup="dialog"
            aria-expanded={navOpen}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "10px 4px 8px",
              border: "none",
              background: "transparent",
              color: "var(--ink-faint)",
              fontSize: 10,
              fontWeight: 400,
              cursor: "pointer",
              fontFamily: "var(--grotesk)",
            }}
          >
            <Icon name="menu" size={20} strokeWidth={1.7} />
            More
          </button>
        </nav>
      )}
    </div>
  );
}
