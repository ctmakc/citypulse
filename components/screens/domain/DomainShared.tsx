"use client"
import { ReactNode, CSSProperties } from 'react'
import ArcGauge from '@/components/charts/ArcGauge'
import Readouts from '@/components/charts/Readouts'
import Card from '@/components/ui/Card'
import CityMap from '@/components/map/CityMap'
import type { MapDot, MapHeat } from '@/lib/types'

// ─── SituationBand ──────────────────────────────────────────────────────────

interface SituationBandProps {
  gauge: number
  gaugeLabel: string
  gaugeColor: string
  eyebrow: string
  headline: string
  body?: string
  readouts: [string, string, string?, string?][]
  chart: ReactNode
}

export function SituationBand({
  gauge,
  gaugeLabel,
  gaugeColor,
  eyebrow,
  headline,
  body,
  readouts,
  chart,
}: SituationBandProps) {
  return (
    <div
      className="surface"
      style={{
        display: 'grid',
        gridTemplateColumns: '180px 1fr 1fr',
        gap: 0,
        overflow: 'hidden',
      }}
    >
      {/* Gauge column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 12px',
          borderRight: '1px solid var(--rule)',
          gap: 6,
        }}
      >
        <ArcGauge value={gauge} color={gaugeColor} label={gaugeLabel} size={120} />
      </div>

      {/* Text + readouts column */}
      <div
        style={{
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          borderRight: '1px solid var(--rule)',
          justifyContent: 'center',
        }}
      >
        <div>
          <div className="cap" style={{ marginBottom: 6, color: 'var(--ink-faint)' }}>{eyebrow}</div>
          <div
            className="serif"
            style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4 }}
          >
            {headline}
          </div>
          {body && (
            <p style={{ margin: '8px 0 0', fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{body}</p>
          )}
        </div>
        <Readouts items={readouts} cols={2} />
      </div>

      {/* Chart column */}
      <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {chart}
      </div>
    </div>
  )
}

// ─── Module ─────────────────────────────────────────────────────────────────

interface ModuleProps {
  title: string
  code?: string
  right?: ReactNode
  children: ReactNode
  style?: CSSProperties
  nopad?: boolean
}

export function Module({ title, code, right, children, style, nopad }: ModuleProps) {
  return (
    <Card title={title} code={code} right={right} pad={!nopad} style={style}>
      {children}
    </Card>
  )
}

// ─── MiniTable ──────────────────────────────────────────────────────────────

interface MiniTableProps {
  heads: string[]
  rows: (string | ReactNode)[][]
}

export function MiniTable({ heads, rows }: MiniTableProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr>
            {heads.map((h, i) => (
              <th
                key={i}
                style={{
                  textAlign: i === 0 ? 'left' : 'right',
                  padding: '6px 8px',
                  fontWeight: 600,
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-faint)',
                  borderBottom: '1px solid var(--rule)',
                  whiteSpace: 'nowrap',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              style={{ borderBottom: ri < rows.length - 1 ? '1px solid var(--rule-soft)' : undefined }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    textAlign: ci === 0 ? 'left' : 'right',
                    padding: '8px 8px',
                    color: 'var(--ink-soft)',
                    fontFamily: ci > 0 ? 'var(--mono)' : undefined,
                    fontSize: ci > 0 ? 11.5 : 12,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── SmallMap ────────────────────────────────────────────────────────────────

interface SmallMapProps {
  dots?: MapDot[]
  heat?: MapHeat[]
  title?: string
  height?: number
}

export function SmallMap({ dots = [], heat = [], title = 'Map', height = 240 }: SmallMapProps) {
  return (
    <Card title={title} pad={false} style={{ overflow: 'hidden' }}>
      <div style={{ height }}>
        <CityMap dots={dots} heat={heat} zoom={12} />
      </div>
    </Card>
  )
}

// ─── ExposureRow ─────────────────────────────────────────────────────────────

interface ExposureRowProps {
  icon?: ReactNode
  label: string
  count: string | number
  color?: string
}

export function ExposureRow({ icon, label, count, color = 'var(--ink)' }: ExposureRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 0',
        borderBottom: '1px solid var(--rule-soft)',
      }}
    >
      {icon && <div style={{ color: 'var(--ink-faint)', flexShrink: 0 }}>{icon}</div>}
      <span style={{ flex: 1, fontSize: 12.5, color: 'var(--ink-soft)' }}>{label}</span>
      <span className="mono" style={{ fontSize: 13, fontWeight: 700, color }}>{count}</span>
    </div>
  )
}

// ─── StatusDot ───────────────────────────────────────────────────────────────

interface StatusDotProps {
  color?: string
  label: string
}

export function StatusDot({ color = 'var(--green)', label }: StatusDotProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 11,
        fontWeight: 600,
        color,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: color,
          display: 'inline-block',
        }}
      />
      {label}
    </span>
  )
}
