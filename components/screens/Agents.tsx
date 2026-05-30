"use client"

import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Card from "@/components/ui/Card"
import Pill from "@/components/ui/Pill"
import Donut from "@/components/ui/Donut"
import Icon from "@/components/ui/Icon"
import { AGENTS, BRIEFING } from "@/lib/data"
import { usePortalStore } from "@/lib/store"
import type { Agent } from "@/lib/types"

function AgentCard({ agent }: { agent: Agent }) {
  const setDetail = usePortalStore((s) => s.setDetail)

  return (
    <div
      className="surface lift"
      style={{ display: "flex", flexDirection: "column", gap: 0, overflow: "hidden" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 16px 12px",
          borderBottom: "1px solid var(--rule-soft)",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "var(--r-sm)",
            background: `color-mix(in srgb, ${agent.color} 15%, transparent)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: agent.color,
            flexShrink: 0,
          }}
        >
          <Icon name={agent.ico} size={17} strokeWidth={1.7} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>
            {agent.name}
          </div>
          <div className="code" style={{ marginTop: 2 }}>{agent.dept}</div>
        </div>
        <Pill sev={agent.esc}>{agent.status}</Pill>
        <button
          onClick={() => setDetail({ type: "agent", data: agent })}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--ink-faint)",
            padding: 4,
            display: "flex",
          }}
        >
          <Icon name="chevron" size={14} style={{ transform: "rotate(-90deg)" }} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
          {agent.finding}
        </p>

        {/* Source tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {agent.sources.map((src) => (
            <span
              key={src}
              style={{
                fontSize: 10.5,
                fontWeight: 500,
                padding: "2px 8px",
                borderRadius: 100,
                background: "var(--surface-3)",
                color: "var(--ink-faint)",
                border: "1px solid var(--rule-soft)",
              }}
            >
              {src}
            </span>
          ))}
        </div>

        {/* Confidence + actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Donut v={agent.conf} size={38} color={agent.color} />
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>
              {Math.round(agent.conf * 100)}% confidence
            </div>
            <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>
              Escalation: {agent.esc}
            </div>
          </div>
          <div style={{ flex: 1 }} />
          {agent.actions.slice(0, 1).map((act) => (
            <button key={act} className="btn btn-quiet" style={{ fontSize: 11.5 }}>
              {act}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Agents() {
  return (
    <Screen>
      <ScreenHead
        ico="ai"
        title="AI Agents"
        sub="Specialized agents monitor every domain continuously — water, fire, traffic, flood, air quality, citizen reports and grants. Each surfaces findings, confidence and recommended actions."
        color="var(--blue)"
        actions={
          <button className="btn btn-ghost" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="settings" size={14} />
            Agent settings
          </button>
        }
      />

      {/* Morning Briefing */}
      <Card title="Morning Briefing" code="AI">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {/* Top Risks */}
          <div style={{ padding: "0 16px 0 0", borderRight: "1px solid var(--rule-soft)" }}>
            <div className="cap" style={{ marginBottom: 8 }}>Top risks</div>
            {BRIEFING.topRisks.map(([risk, where, sev]) => (
              <div
                key={risk}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 7,
                  padding: "5px 0",
                  borderBottom: "1px solid var(--rule-soft)",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: sev === "Critical" ? "var(--red)" : "var(--amber)",
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)", lineHeight: 1.4 }}>{risk}</div>
                  <div style={{ fontSize: 10.5, color: "var(--ink-faint)" }}>{where}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Overnight */}
          <div style={{ padding: "0 16px", borderRight: "1px solid var(--rule-soft)" }}>
            <div className="cap" style={{ marginBottom: 8 }}>Overnight changes</div>
            {BRIEFING.overnight.map((item) => (
              <div
                key={item}
                style={{
                  fontSize: 12,
                  color: "var(--ink-soft)",
                  padding: "5px 0",
                  borderBottom: "1px solid var(--rule-soft)",
                  lineHeight: 1.45,
                }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Attention */}
          <div style={{ padding: "0 16px", borderRight: "1px solid var(--rule-soft)" }}>
            <div className="cap" style={{ marginBottom: 8 }}>Needs attention</div>
            {BRIEFING.attention.map(([action, dept]) => (
              <div
                key={action}
                style={{
                  padding: "5px 0",
                  borderBottom: "1px solid var(--rule-soft)",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)", lineHeight: 1.4 }}>{action}</div>
                <div style={{ fontSize: 10.5, color: "var(--ink-faint)" }}>{dept}</div>
              </div>
            ))}
          </div>

          {/* Expensive */}
          <div style={{ padding: "0 0 0 16px" }}>
            <div className="cap" style={{ marginBottom: 8 }}>Cost of inaction</div>
            {BRIEFING.expensive.map(([risk, cost, note]) => (
              <div
                key={risk}
                style={{
                  padding: "5px 0",
                  borderBottom: "1px solid var(--rule-soft)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>{risk}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--red)", fontFamily: "var(--mono)" }}>
                    {cost}
                  </span>
                </div>
                <div style={{ fontSize: 10.5, color: "var(--ink-faint)", marginTop: 2 }}>{note}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Agent grid */}
      <div className="cap">Specialized agents</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {AGENTS.map((agent) => (
          <AgentCard key={agent.key} agent={agent} />
        ))}
      </div>
    </Screen>
  )
}
