"use client";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { usePortalStore } from "@/lib/store";

const NAV_GROUPS: [string, [string, string, number?][]][] = [
  ["Operations", [
    ["overview",      "Overview"],
    ["digital-twin",  "Digital Twin"],
    ["assets",        "Assets"],
    ["tasks",         "Work & Tasks"],
  ]],
  ["Domains", [
    ["traffic",       "Traffic"],
    ["water",         "Water"],
    ["air-quality",   "Air Quality"],
  ]],
  ["Safety & climate", [
    ["wildfire",      "Wildfire"],
    ["flood-risk",    "Flood Risk"],
    ["emergency",     "Emergency"],
  ]],
  ["Engagement", [
    ["citizen-reports", "Citizen Reports", 47],
  ]],
  ["Intelligence", [
    ["ai-agents",     "AI Agents"],
  ]],
  ["Planning", [
    ["capital-grants", "Capital & Grants"],
    ["reports",        "Reports & Export"],
  ]],
  ["System", [
    ["data-sources",  "Data Sources"],
  ]],
];

const ICON_MAP: Record<string, string> = {
  "overview":        "overview",
  "digital-twin":    "twin",
  "assets":          "assets",
  "tasks":           "tasks",
  "traffic":         "traffic",
  "water":           "water",
  "air-quality":     "air",
  "wildfire":        "fire",
  "flood-risk":      "flood",
  "emergency":       "shield",
  "citizen-reports": "message",
  "ai-agents":       "ai",
  "capital-grants":  "capital",
  "reports":         "exports",
  "data-sources":    "data",
  "settings":        "settings",
};

interface SidebarProps {
  currentPath: string;
}

function isActive(slug: string, currentPath: string): boolean {
  const clean = currentPath.replace(/^\//, "").split("?")[0];
  return clean === slug;
}

export default function Sidebar({ currentPath }: SidebarProps) {
  const router = useRouter();
  const { currentUser } = usePortalStore();

  return (
    <nav
      style={{
        width: 218,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: 8,
        paddingBottom: 16,
        overflowY: "auto",
        overflowX: "hidden",
        flexShrink: 0,
      }}
    >
      <div style={{ flex: 1 }}>
        {NAV_GROUPS.map(([group, items]) => (
          <div key={group} style={{ marginBottom: 4 }}>
            <div
              className="cap"
              style={{
                padding: "10px 14px 4px",
                fontSize: 9,
                letterSpacing: "0.1em",
              }}
            >
              {group}
            </div>
            {items.map(([slug, label, badge]) => {
              const active = isActive(slug, currentPath);
              const isEmergency = slug === "emergency";
              return (
                <div
                  key={slug}
                  className={`nav-item${active ? " active" : ""}`}
                  onClick={() => router.push(`/${slug}`)}
                  style={{ margin: "0 8px", position: "relative" }}
                >
                  <span className="nav-ico" style={{ position: "relative" }}>
                    <Icon name={ICON_MAP[slug] || "info"} size={16} />
                    {isEmergency && (
                      <span
                        style={{
                          position: "absolute",
                          top: -2,
                          right: -2,
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: "var(--red)",
                          display: "block",
                        }}
                      />
                    )}
                  </span>
                  <span style={{ flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {label}
                  </span>
                  {badge != null && (
                    <span
                      className="mono"
                      style={{
                        fontSize: 10,
                        background: "var(--amber-wash)",
                        color: "var(--amber)",
                        borderRadius: "var(--r-pill)",
                        padding: "1px 6px",
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* User profile */}
      {currentUser && (
        <div style={{
          borderTop: "1px solid var(--rule)", padding: "10px 12px",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "var(--blue)", color: "#fff",
            display: "grid", placeItems: "center",
            fontSize: 12, fontWeight: 700, flexShrink: 0,
          }}>
            {currentUser.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 12.5, fontWeight: 600, color: "var(--ink)",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {currentUser.name}
            </div>
            <div className="code" style={{ fontSize: 9 }}>{currentUser.role}</div>
          </div>
        </div>
      )}

      {/* Settings separator */}
      <div style={{ borderTop: "1px solid var(--rule)", margin: "0 8px 0", paddingTop: 8 }}>
        <div
          className={`nav-item${isActive("settings", currentPath) ? " active" : ""}`}
          onClick={() => router.push("/settings")}
          style={{ margin: "0" }}
        >
          <span className="nav-ico">
            <Icon name="settings" size={16} />
          </span>
          Settings
        </div>
      </div>
    </nav>
  );
}
