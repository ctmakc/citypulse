"use client"
import Screen from '@/components/ui/Screen'
import ScreenHead from '@/components/ui/ScreenHead'
import RecRow from '@/components/ui/RecRow'
import ColBars from '@/components/charts/ColBars'
import RankBars from '@/components/charts/RankBars'
import Readouts from '@/components/charts/Readouts'
import { SituationBand, Module, SmallMap } from '@/components/screens/domain/DomainShared'
import { DOMAINS } from '@/lib/data'

const traffic = DOMAINS.traffic

export default function Traffic() {
  const dots = traffic.dots.map(d => ({
    x: d.x, y: d.y, color: d.color,
    size: d.crit ? 14 : 10,
    pulse: d.crit,
    label: d.tag,
  }))

  // 24-hour delay data (index = hour 0–23)
  const hourlyDelay = [12, 18, 42, 68, 74, 62, 45, 34, 28, 31, 38, 56, 64, 72, 58, 42, 38, 29, 24, 18, 14, 12, 10, 8]

  // Show labels only at key hours
  const hourLabels = hourlyDelay.map((_, i) => {
    if (i === 6) return '6am'
    if (i === 12) return '12pm'
    if (i === 18) return '6pm'
    if (i === 23) return '12am'
    return ''
  })

  return (
    <Screen>
      <ScreenHead
        ico="traffic"
        title="Traffic & Mobility"
        color="var(--amber)"
        actions={
          <>
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: '8px 16px' }}>
              Signal ops
            </button>
            <button className="btn" style={{ fontSize: 12, padding: '8px 16px' }}>
              Incident log
            </button>
          </>
        }
      />

      <SituationBand
        gauge={68}
        gaugeLabel="Elevated"
        gaugeColor="var(--amber)"
        eyebrow="Congestion index"
        headline="Network running 14% above baseline delay — Old Town corridor driving emissions spike"
        readouts={[
          ['Avg delay', '+14%', 'var(--amber)'],
          ['Congestion cost', '$182K', 'var(--amber)', 'this month'],
          ['Accident hotspots', '6 active', 'var(--red)'],
          ['Transit on-time', '88%', 'var(--amber)', '−3 pts'],
        ]}
        chart={
          <ColBars
            data={[12, 18, 42, 68, 74, 62, 45, 34, 28, 31, 38, 56]}
            color="var(--amber)"
            height={110}
            labels={['', '2am', '', '5am', '7am', '9am', '11am', '1pm', '3pm', '5pm', '7pm', '9pm']}
          />
        }
      />

      {/* 3-column modules */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <Module title="Congestion hotspots" code="RANKING">
          <RankBars
            rows={[
              { label: 'Vine & Harbor (Old Town)', v: 74, disp: '2.4× baseline', color: 'var(--red)' },
              { label: '9th & Vine', v: 58, disp: '1.9× baseline', color: 'var(--amber)' },
              { label: 'Harbor & Dock', v: 47, disp: '1.6× baseline', color: 'var(--amber)' },
              { label: 'Cedar Crossing', v: 38, disp: '1.3× baseline', color: 'var(--amber)' },
              { label: 'Northgate Ave', v: 24, disp: '1.1× baseline', color: 'var(--slate)' },
            ]}
            max={100}
          />
        </Module>

        <Module title="Hourly delay pattern — today" code="TODAY">
          <ColBars
            data={hourlyDelay}
            color="var(--amber)"
            height={120}
            labels={hourLabels}
            highlight={7}
          />
          <div className="cap" style={{ marginTop: 10 }}>
            Peak: 74 delay-min · 07:00–08:00 · Vine & Harbor
          </div>
        </Module>

        <Module title="Transit performance" code="TRANSIT">
          <Readouts
            cols={2}
            items={[
              ['On-time rate', '88%', 'var(--amber)', '−3 pts wk'],
              ['Avg headway', '9.2 min', 'var(--ink)'],
              ['Ridership', '14,200', 'var(--green)', 'today est.'],
              ['Detours active', '2', 'var(--amber)'],
              ['Accessibility', '97.1%', 'var(--green)', 'stops OK'],
              ['Complaints', '18', 'var(--amber)', 'this week'],
            ]}
          />
        </Module>
      </div>

      {/* Recommendations + small map */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        <Module title="AI recommendations" code="ACTION">
          {traffic.recs.map(([text, impact, c], i) => (
            <RecRow key={i} n={i + 1} text={text} impact={impact} c={c} />
          ))}
        </Module>

        <SmallMap
          dots={dots}
          heat={[
            { x: 47, y: 44, r: 120, color: 'rgba(188,126,21,.4)', o: 0.5 },
            { x: 35, y: 55, r: 80, color: 'rgba(178,58,51,.3)', o: 0.4 },
          ]}
          title="Traffic & congestion map"
          height={240}
        />
      </div>
    </Screen>
  )
}
