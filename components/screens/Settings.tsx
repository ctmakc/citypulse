"use client"

import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Card from "@/components/ui/Card"
import Icon from "@/components/ui/Icon"
import { CITY, ROLES } from "@/lib/data"
import { usePortalStore } from "@/lib/store"

function FieldRow({ label, value, editable = false }: { label: string; value: string; editable?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid var(--rule-soft)",
      }}
    >
      <span style={{ fontSize: 13, color: "var(--ink-soft)", minWidth: 160 }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, justifyContent: "flex-end" }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{value}</span>
        {editable && (
          <button className="btn-ghost btn" style={{ fontSize: 11.5, padding: "4px 10px" }}>
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

function Toggle({ label, on }: { label: string; on: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid var(--rule-soft)",
      }}
    >
      <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>{label}</span>
      <div
        style={{
          width: 36,
          height: 20,
          borderRadius: 100,
          background: on ? "var(--blue)" : "var(--rule)",
          position: "relative",
          cursor: "pointer",
          transition: "background .18s ease",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 3,
            left: on ? 18 : 3,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,.2)",
            transition: "left .18s ease",
          }}
        />
      </div>
    </div>
  )
}

export default function Settings() {
  const role = usePortalStore((s) => s.role)
  const setRole = usePortalStore((s) => s.setRole)

  return (
    <Screen>
      <ScreenHead
        ico="settings"
        title="Settings"
        sub="Platform configuration and preferences."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Organization */}
        <Card title="Organization">
          <FieldRow label="City name" value={CITY.name} editable />
          <FieldRow label="State / region" value={CITY.state} editable />
          <FieldRow label="Population" value={CITY.pop} editable />
          <FieldRow label="Timezone" value="America/Vancouver (UTC−7)" editable />
          <FieldRow label="Fiscal year start" value="January 1" editable />
        </Card>

        {/* Account */}
        <Card title="Account">
          <FieldRow label="Name" value="Jordan Reeves" editable />
          <FieldRow label="Email" value="j.reeves@meridian.gov" editable />
          <div style={{ padding: "12px 0", borderBottom: "1px solid var(--rule-soft)" }}>
            <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 8 }}>Role</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    padding: "5px 12px",
                    borderRadius: 100,
                    border: role === r ? "1.5px solid var(--blue)" : "1.5px solid var(--rule)",
                    background: role === r ? "var(--blue-wash)" : "transparent",
                    color: role === r ? "var(--blue)" : "var(--ink-soft)",
                    cursor: "pointer",
                    transition: "all .15s ease",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <FieldRow label="Language" value="English (US)" editable />
        </Card>

        {/* Notifications */}
        <Card title="Notifications">
          <Toggle label="Critical alerts (push + email)" on={true} />
          <Toggle label="Elevated alerts (email)" on={true} />
          <Toggle label="Watch-level alerts" on={false} />
          <Toggle label="AI agent findings" on={true} />
          <Toggle label="Grant deadline reminders" on={true} />
          <Toggle label="Daily briefing digest" on={false} />
          <div style={{ padding: "12px 0", borderBottom: "1px solid var(--rule-soft)" }}>
            <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 4 }}>Alert threshold</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["All", "Elevated+", "Critical only"].map((opt) => (
                <button
                  key={opt}
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    padding: "5px 12px",
                    borderRadius: 100,
                    border: opt === "Elevated+" ? "1.5px solid var(--blue)" : "1.5px solid var(--rule)",
                    background: opt === "Elevated+" ? "var(--blue-wash)" : "transparent",
                    color: opt === "Elevated+" ? "var(--blue)" : "var(--ink-soft)",
                    cursor: "pointer",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Integrations shortcut */}
        <Card title="Integrations">
          <div style={{ padding: "12px 0" }}>
            <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>
              Manage live data source connections, API keys and webhook configurations.
            </p>
            <a
              href="/data-sources"
              className="btn btn-ghost"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}
            >
              <Icon name="data" size={14} />
              Manage data sources
            </a>
          </div>
          <div style={{ borderTop: "1px solid var(--rule-soft)", paddingTop: 12, marginTop: 4 }}>
            <Toggle label="Auto-sync every 5 minutes" on={true} />
            <Toggle label="Degrade gracefully on source loss" on={true} />
          </div>
        </Card>
      </div>

      {/* Danger zone */}
      <div
        style={{
          padding: "16px 20px",
          borderRadius: "var(--r)",
          border: "1.5px solid var(--red-wash)",
          background: "rgba(178,58,51,.03)",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--red)", marginBottom: 6 }}>
          Danger zone
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>
            Reset all AI agent configurations to defaults
          </span>
          <button
            className="btn"
            style={{ background: "var(--red)", border: "none", color: "#fff", fontSize: 12 }}
          >
            Reset agents
          </button>
        </div>
      </div>
    </Screen>
  )
}
