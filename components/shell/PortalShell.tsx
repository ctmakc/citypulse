"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePortalStore } from "@/lib/store";
import TopBar from "@/components/shell/TopBar";
import Sidebar from "@/components/shell/Sidebar";
import AssistantDock from "@/components/shell/AssistantDock";
import DetailDrawer from "@/components/shell/DetailDrawer";
import AssetPanel from "@/components/shell/AssetPanel";
import Icon from "@/components/ui/Icon";

const BOTTOM_TABS: [string, string, string][] = [
  ["overview", "Overview", "overview"],
  ["digital-twin", "Map", "twin"],
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

export default function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();

  const { aiOpen, setAIOpen, picked, setPicked, detail, setDetail, navOpen, setNavOpen } = usePortalStore();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
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

        {/* Mobile sidebar overlay */}
        {isMobile && (
          <>
            {/* Scrim */}
            {navOpen && (
              <div
                onClick={() => setNavOpen(false)}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(42,48,55,.28)",
                  zIndex: 45,
                }}
              />
            )}
            {/* Slide-over */}
            <div
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
              }}
              onClick={() => setNavOpen(false)}
            >
              <Sidebar currentPath={pathname} />
            </div>
          </>
        )}

        {/* Main content area */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            overflowY: "auto",
          }}
        >
          {children}
        </main>

        {/* AI Dock — right side push panel */}
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
              <AssistantDock open={aiOpen} onClose={() => setAIOpen(false)} />
            </div>
          )}
        </div>

        {/* Mobile AI overlay */}
        {isMobile && aiOpen && (
          <>
            <div
              onClick={() => setAIOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(42,48,55,.18)",
                zIndex: 58,
              }}
            />
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 59,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <AssistantDock open={aiOpen} onClose={() => setAIOpen(false)} />
            </div>
          </>
        )}
      </div>

      {/* Asset bottom panel */}
      <AssetPanel a={picked} onClose={() => setPicked(null)} />

      {/* Detail drawer */}
      <DetailDrawer detail={detail} onClose={() => setDetail(null)} />

      {/* Mobile bottom tabs */}
      {isMobile && (
        <div
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
        </div>
      )}
    </div>
  );
}
