"use client"

import { useState, useEffect } from "react"
import Screen from "@/components/ui/Screen"
import ScreenHead from "@/components/ui/ScreenHead"
import Pill from "@/components/ui/Pill"
import Donut from "@/components/ui/Donut"
import Icon from "@/components/ui/Icon"
import Skeleton from "@/components/ui/Skeleton"
import { AGENTS, BRIEFING } from "@/lib/data"
import { agentsApi, isLoggedIn } from "@/lib/api"
import { usePortalStore } from "@/lib/store"
import { SEV_COLOR } from "@/components/ui/Pill"
import type { Agent } from "@/lib/types"

function AgentCard({ agent }: { agent: Agent }) {
  const setDetail = usePortalStore(s => s.setDetail)

  return (
    <div
      className="surface lift"
      style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      onClick={() => setDetail({ type: "agent", data: agent })}
    >
      {/* Header row */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "14px 16px 12px", borderBottom: "1px solid var(--rule-soft)",
        cursor: "pointer",
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: "var(--r-sm)",
          background: "var(--surface-2)", border: "1px solid var(--rule)",
          display: "grid", placeItems: "center",
          color: agent.color, flexShrink: 0,
        }}>
          <Icon name={agent.ico} size={18} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13.5 }}>{agent.name}</div>
          <div className="code" style={{ fontSize: 9, marginTop: 2 }}>{agent.dept}</div>
        </div>
        <Pill sev={agent.esc}>{agent.status}</Pill>
        <span style={{ color: "var(--ink-faint)" }}><Icon name="chevron" size={15} style={{ transform: "rotate(-90deg)" }} /></span>
      </div>

      {/* Body */}
      <div style={{ padding: "13px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
          {agent.finding}
        </p>

        {/* Source tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {agent.sources.map(s => (
            <span key={s} style={{
              fontSize: 10.5, padding: "2px 8px", borderRadius: 100,
              background: "var(--surface-2)", border: "1px solid var(--rule)", color: "var(--ink-faint)",
            }}>{s}</span>
          ))}
        </div>

        {/* Confidence + escalation + actions */}
        <div style={{ paddingTop: 12, borderTop: "1px solid var(--rule-soft)", display: "flex", alignItems: "center", gap: 12 }}>
          <Donut v={agent.conf} size={40} color={agent.color} />
          <div style={{ flex: 1 }}>
            <div className="cap" style={{ fontSize: 9 }}>Confidence · Escalation</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: SEV_COLOR[agent.esc] ?? "var(--ink)", marginTop: 2 }}>
              {Math.round(agent.conf * 100)}% · {agent.esc}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {agent.actions.map((act, i) => (
            <button key={i} className="btn btn-ghost" style={{
              justifyContent: "space-between", width: "100%", fontSize: 12,
            }}>
              {act}
              <Icon name="chevron" size={13} style={{ transform: "rotate(-90deg)" }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Skeleton shaped like an AgentCard, shown during in-flight fetch
function AgentCardSkeleton() {
  return (
    <div className="surface" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }} aria-hidden="true">
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "14px 16px 12px", borderBottom: "1px solid var(--rule-soft)",
      }}>
        <Skeleton w={34} h={34} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <Skeleton w="60%" h={13} />
          <Skeleton w="40%" h={9} />
        </div>
        <Skeleton w={64} h={18} rounded />
      </div>
      <div style={{ padding: "13px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        <Skeleton w="100%" h={12} />
        <Skeleton w="85%" h={12} />
        <div style={{ display: "flex", gap: 5 }}>
          <Skeleton w={60} h={16} rounded />
          <Skeleton w={70} h={16} rounded />
        </div>
      </div>
    </div>
  )
}

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>(AGENTS)
  // Skeletons only while an authenticated fetch is in flight; demo shows static data instantly.
  const [loading, setLoading] = useState(() => isLoggedIn())

  useEffect(() => {
    if (!isLoggedIn()) return
    setLoading(true)
    agentsApi.all()
      .then((res) => {
        if (Array.isArray(res.data)) setAgents(res.data as Agent[])
        else if (Array.isArray(res.data?.agents)) setAgents(res.data.agents as Agent[])
      })
      .catch(() => {}) // silent fail — keep static data
      .finally(() => setLoading(false))
  }, [])

  return (
    <Screen>
      <ScreenHead
        ico="ai"
        title="AI Agents"
        sub="Specialized agents monitor each domain continuously, explain what they find, and propose actions for the responsible department to approve."
        color="var(--blue)"
        actions={
          <button className="btn btn-ghost" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="settings" size={14} />
            Agent settings
          </button>
        }
      />

      {/* Morning Briefing panel — 4 columns, matching design */}
      <div className="surface" style={{ overflow: "hidden" }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px", borderBottom: "1px solid var(--rule)",
          display: "flex", alignItems: "center", gap: 12,
          background: "var(--surface-2)",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "var(--blue-wash)", color: "var(--blue)",
            display: "grid", placeItems: "center",
          }}>
            <Icon name="sparkles" size={19} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="serif" style={{ fontSize: 18, fontWeight: 600 }}>Morning briefing</div>
            <div className="code" style={{ fontSize: 9.5, marginTop: 2 }}>
              Generated 07:40 · 9 agents · 2,140 sensor nodes
            </div>
          </div>
          <button className="btn btn-ghost" style={{ fontSize: 12, gap: 6, display: "flex", alignItems: "center" }}>
            <Icon name="exports" size={14} />
            Send to council
          </button>
        </div>

        {/* 4-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>

          {/* 1. Top risks */}
          <div style={{ padding: "16px 18px", borderRight: "1px solid var(--rule)" }}>
            <div className="cap" style={{ fontSize: 9.5, marginBottom: 11 }}>Top risks today</div>
            {BRIEFING.topRisks.map(([risk, where, sev], i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 9 }}>
                <span className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", flexShrink: 0 }}>{i + 1}</span>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.3 }}>{risk}</div>
                  <div style={{ fontSize: 10.5, color: SEV_COLOR[sev] ?? "var(--slate)", marginTop: 1 }}>
                    {where} · {sev}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Overnight changes */}
          <div style={{ padding: "16px 18px", borderRight: "1px solid var(--rule)" }}>
            <div className="cap" style={{ fontSize: 9.5, marginBottom: 11 }}>What changed overnight</div>
            {BRIEFING.overnight.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 9 }}>
                <span style={{ color: "var(--blue)", marginTop: 2, flexShrink: 0 }}>
                  <Icon name="arrowR" size={12} />
                </span>
                <span style={{ fontSize: 12, lineHeight: 1.4, color: "var(--ink-soft)" }}>{t}</span>
              </div>
            ))}
          </div>

          {/* 3. Needs attention (checkboxes) */}
          <div style={{ padding: "16px 18px", borderRight: "1px solid var(--rule)" }}>
            <div className="cap" style={{ fontSize: 9.5, marginBottom: 11 }}>Needs attention</div>
            {BRIEFING.attention.map(([action, dept], i) => (
              <div key={i} style={{ display: "flex", gap: 9, marginBottom: 11 }}>
                <span style={{
                  width: 16, height: 16, borderRadius: 5, flexShrink: 0, marginTop: 1,
                  border: "1.5px solid var(--ink-faint)",
                }} />
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.35 }}>{action}</div>
                  <div className="code" style={{ fontSize: 9 }}>{dept}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Expensive if ignored — red-wash background */}
          <div style={{ padding: "16px 18px", background: "var(--red-wash)" }}>
            <div className="cap" style={{ fontSize: 9.5, marginBottom: 11, color: "var(--red)" }}>
              Expensive if ignored
            </div>
            {BRIEFING.expensive.map(([risk, cost, note], i) => (
              <div key={i} style={{ marginBottom: 11 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>{risk}</span>
                  <span className="serif" style={{ fontSize: 15, fontWeight: 700, color: "var(--red)", flexShrink: 0 }}>
                    {cost}
                  </span>
                </div>
                <div style={{ fontSize: 10.5, color: "var(--ink-faint)", marginTop: 1 }}>{note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent cards grid */}
      <div className="cap" style={{ marginTop: 4 }}>Specialized agents</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} aria-busy={loading}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <AgentCardSkeleton key={i} />)
          : agents.map(agent => <AgentCard key={agent.key} agent={agent} />)}
      </div>
    </Screen>
  )
}
