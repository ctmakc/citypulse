"use client"
import Screen from '@/components/ui/Screen'
import ScreenHead from '@/components/ui/ScreenHead'
import RecRow from '@/components/ui/RecRow'
import AreaChart from '@/components/charts/AreaChart'
import StackBar from '@/components/charts/StackBar'
import { SituationBand, Module, MiniTable, SmallMap, StatusDot } from '@/components/screens/domain/DomainShared'
import { DOMAINS } from '@/lib/data'
import Link from 'next/link'

const flood = DOMAINS.flood

export default function Flood() {
  const dots = flood.dots.map(d => ({
    x: d.x, y: d.y, color: d.color,
    size: d.crit ? 14 : 10,
    pulse: d.crit,
    label: d.tag,
  }))

  return (
    <Screen>
      <ScreenHead
        ico="flood"
        title="Flood Risk"
        color="var(--blue)"
        actions={
          <>
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: '8px 16px' }}>
              Report
            </button>
            <Link href="/emergency">
              <button className="btn" style={{ fontSize: 12, padding: '8px 16px' }}>
                Open coordination
              </button>
            </Link>
          </>
        }
      />

      <SituationBand
        gauge={54}
        gaugeLabel="Moderate"
        gaugeColor="var(--amber)"
        eyebrow="Storm flood risk · Tuesday"
        headline="Forecast storm would exceed Westbank drain capacity — 311 cluster confirms partial blockage"
        readouts={[
          ['Forecast rain', '38 mm / 3h', 'var(--blue)'],
          ['Drain capacity', 'Exceeded', 'var(--red)'],
          ['River stage', '3.4 m', 'var(--amber)'],
          ['Flood stage', '4.5 m', 'var(--ink)'],
        ]}
        chart={
          <AreaChart
            data={[2, 6, 14, 26, 38, 31, 18, 8]}
            color="var(--blue)"
            threshold={29}
            thrLabel="Westbank drain limit (29 mm/h)"
            labels={['18:00', '21:00', '00:00', '03:00', '06:00', '09:00', '12:00', '15:00']}
            height={110}
          />
        }
      />

      {/* 3-column modules */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <Module title="Drainage network status" code="TELEMETRY" nopad>
          <MiniTable
            heads={['Catchment', 'Usage', 'Status']}
            rows={[
              ['Westbank', '103%', <StatusDot color="var(--red)" label="At capacity" />],
              ['Old Town', '71%', <StatusDot color="var(--amber)" label="Elevated" />],
              ['Harbor', '58%', <StatusDot color="var(--green)" label="Normal" />],
              ['Riverside', '44%', <StatusDot color="var(--green)" label="Normal" />],
              ['Northgate', '39%', <StatusDot color="var(--green)" label="Normal" />],
            ]}
          />
        </Module>

        <Module title="River gauge — Meridian R." code="GAUGE">
          <AreaChart
            data={[2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.4, 3.9]}
            color="var(--blue)"
            threshold={4.5}
            thrLabel="Flood stage 4.5 m"
            labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon']}
            height={130}
          />
          <div className="cap" style={{ marginTop: 10 }}>
            Current: 3.4 m · Forecast peak: 4.1 m (Tue 06:00)
          </div>
        </Module>

        <Module title="Properties at risk by depth" code="MODEL">
          <StackBar
            parts={[
              { label: 'Nuisance (0–0.3 m)', v: 120, disp: '120', color: 'var(--amber)' },
              { label: 'Significant (0.3–1 m)', v: 68, disp: '68', color: 'var(--red)' },
              { label: 'Severe (> 1 m)', v: 22, disp: '22', color: '#7A1E1A' },
            ]}
          />
          <div className="cap" style={{ marginTop: 14 }}>
            210 total properties in 100-yr flood zone
          </div>
        </Module>
      </div>

      {/* Recommendations + small map */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        <Module title="AI recommendations" code="ACTION">
          {flood.recs.map(([text, impact, c], i) => (
            <RecRow key={i} n={i + 1} text={text} impact={impact} c={c} />
          ))}
        </Module>

        <SmallMap
          dots={dots}
          heat={[
            { x: 62, y: 70, r: 150, color: 'rgba(42,108,146,.4)', o: 0.5 },
            { x: 55, y: 64, r: 100, color: 'rgba(42,108,146,.3)', o: 0.4 },
          ]}
          title="Flood risk map"
          height={240}
        />
      </div>
    </Screen>
  )
}
