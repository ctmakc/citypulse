"use client"
import Screen from '@/components/ui/Screen'
import ScreenHead from '@/components/ui/ScreenHead'
import RecRow from '@/components/ui/RecRow'
import AreaChart from '@/components/charts/AreaChart'
import Readouts from '@/components/charts/Readouts'
import { SituationBand, Module, MiniTable, SmallMap, StatusDot } from '@/components/screens/domain/DomainShared'
import { DOMAINS } from '@/lib/data'

const water = DOMAINS.water

export default function Water() {
  const dots = water.dots.map(d => ({
    x: d.x, y: d.y, color: d.color,
    size: d.crit ? 14 : 10,
    pulse: d.crit,
    label: d.tag,
  }))

  return (
    <Screen>
      <ScreenHead
        ico="water"
        title="Water System"
        color="var(--blue)"
        actions={
          <>
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: '8px 16px' }}>
              Work order
            </button>
            <button className="btn" style={{ fontSize: 12, padding: '8px 16px' }}>
              View SCADA
            </button>
          </>
        }
      />

      <SituationBand
        gauge={41}
        gaugeLabel="Critical"
        gaugeColor="var(--red)"
        eyebrow="Network risk"
        headline="Trunk main MX-118 in predicted-failure window — corrosivity index 8.1"
        readouts={[
          ['Network risk', 'Elevated', 'var(--amber)'],
          ['Predicted failures', '1 (MX-118)', 'var(--red)'],
          ['Non-revenue water', '12.4%', 'var(--ink)'],
          ['Pump uptime', '99.1%', 'var(--green)'],
        ]}
        chart={
          <AreaChart
            data={[52, 51, 53, 50, 49, 48, 46, 44, 41, 38]}
            color="var(--blue)"
            threshold={35}
            thrLabel="Critical pressure threshold"
            labels={['Mon', '', '', 'Thu', '', '', '', '', '', 'Today']}
            height={110}
          />
        }
      />

      {/* 3-column modules */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <Module title="Segment risk model" code="MODEL" nopad>
          <MiniTable
            heads={['Segment', 'Condition', 'Risk']}
            rows={[
              ['MX-118 Riverside', '41 / 100', <StatusDot color="var(--red)" label="Critical" />],
              ['Cedar St lateral', '58 / 100', <StatusDot color="var(--amber)" label="Elevated" />],
              ['Vine St run', '62 / 100', <StatusDot color="var(--amber)" label="Watch" />],
              ['Harbor main', '72 / 100', <StatusDot color="var(--green)" label="OK" />],
              ['Northgate loop', '81 / 100', <StatusDot color="var(--green)" label="OK" />],
            ]}
          />
        </Module>

        <Module title="Pressure telemetry" code="SCADA">
          <AreaChart
            data={[52, 51, 53, 50, 49, 48, 46, 44, 41, 38]}
            color="var(--blue)"
            threshold={35}
            thrLabel="Low-pressure alarm (35 psi)"
            height={110}
          />
          <div style={{ marginTop: 12 }}>
            <Readouts
              cols={2}
              items={[
                ['Zone A (Riverside)', '38 psi', 'var(--amber)'],
                ['Zone B (Old Town)', '51 psi', 'var(--green)'],
                ['Zone C (Northgate)', '54 psi', 'var(--green)'],
                ['Zone D (Harbor)', '49 psi', 'var(--green)'],
              ]}
            />
          </div>
        </Module>

        <Module title="Service quality" code="QUALITY">
          <Readouts
            cols={2}
            items={[
              ['Quality exceedances', '0', 'var(--green)', 'this week'],
              ['Lead lines known', '1,180', 'var(--amber)', 'Westbank'],
              ['Turbidity (avg)', '0.18 NTU', 'var(--green)'],
              ['pH', '7.4', 'var(--green)'],
              ['Pump uptime', '99.1%', 'var(--green)', '30-day'],
              ['Hydrant ops', '98.4%', 'var(--green)'],
            ]}
          />
        </Module>
      </div>

      {/* Recommendations + small map */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        <Module title="AI recommendations" code="ACTION">
          {water.recs.map(([text, impact, c], i) => (
            <RecRow key={i} n={i + 1} text={text} impact={impact} c={c} />
          ))}
        </Module>

        <SmallMap
          dots={dots}
          heat={[
            { x: 24, y: 58, r: 130, color: 'rgba(178,58,51,.4)', o: 0.45 },
            { x: 62, y: 66, r: 100, color: 'rgba(188,126,21,.3)', o: 0.4 },
          ]}
          title="Water network map"
          height={240}
        />
      </div>
    </Screen>
  )
}
