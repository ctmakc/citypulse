"use client"
import Screen from '@/components/ui/Screen'
import ScreenHead from '@/components/ui/ScreenHead'
import RecRow from '@/components/ui/RecRow'
import ColBars from '@/components/charts/ColBars'
import RankBars from '@/components/charts/RankBars'
import HeatGrid from '@/components/charts/HeatGrid'
import { SituationBand, SmallMap } from '@/components/screens/domain/DomainShared'
import Card from '@/components/ui/Card'
import { DOMAINS } from '@/lib/data'

const traffic = DOMAINS.traffic

// Mon–Sun × hourly heat (7 rows × 12 cols = 84 values, each col = 2h)
const HEAT_MATRIX = [
  [2, 4, 8, 18, 14, 6, 4, 10, 16, 14, 6, 3],   // Mon
  [2, 3, 9, 20, 15, 7, 5, 11, 17, 15, 7, 3],   // Tue
  [2, 4, 8, 19, 16, 8, 6, 12, 18, 16, 8, 4],   // Wed
  [2, 4, 9, 22, 18, 9, 7, 14, 20, 18, 9, 5],   // Thu
  [3, 5, 10, 24, 20, 10, 9, 16, 22, 20, 11, 6], // Fri
  [1, 2, 3, 6, 10, 14, 16, 14, 10, 7, 4, 2],   // Sat
  [1, 1, 2, 4, 8, 12, 14, 12, 8, 5, 3, 2],     // Sun
]

// Intersection performance table
const INTERSECTIONS = [
  { name: "Vine & Harbor", loc: "F", delay: "118s" },
  { name: "9th & Vine",    loc: "E", delay: "74s" },
  { name: "Dock & 4th",   loc: "C", delay: "32s" },
  { name: "Cedar & Main", loc: "B", delay: "21s" },
]

const GRADE_COLOR: Record<string, string> = {
  F: "var(--red)", E: "var(--amber)", D: "var(--amber)",
  C: "var(--blue)", B: "var(--green)", A: "var(--green)",
}

export default function Traffic() {
  const dots = traffic.dots.map(d => ({
    x: d.x, y: d.y, color: d.color, size: d.crit ? 14 : 10, pulse: d.crit, label: d.tag,
  }))

  return (
    <Screen>
      <ScreenHead
        ico="traffic"
        title="Traffic & Mobility"
        color="var(--amber)"
        sub="Corridor congestion, intersection performance and the emissions cost of idling across the network."
        actions={
          <>
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: '8px 16px' }}>Signal ops</button>
            <button className="btn" style={{ fontSize: 12, padding: '8px 16px' }}>Incident log</button>
          </>
        }
      />

      {/* Situation band: gauge + headline + 24h ColBars */}
      <SituationBand
        gauge={64}
        gaugeLabel="Elevated"
        gaugeColor="var(--amber)"
        eyebrow="Network delay index"
        headline="One corridor drives both congestion and emissions"
        body="Vine & Harbor is running 2.4× baseline delay in the AM peak. Idling is producing a measurable local NOx increase — a combined mobility and air-quality problem."
        readouts={[
          ['Avg. delay', '+14%', 'var(--amber)', 'vs 30-day'],
          ['Congestion cost', '$182K/mo', 'var(--amber)'],
          ['Transit on-time', '88%', 'var(--amber)', '−3 pts'],
          ['Accident hotspots', '6', 'var(--red)'],
        ]}
        chart={
          <ColBars
            data={[4, 6, 9, 28, 54, 72, 66, 48, 36, 34, 42, 60, 68, 74, 62, 48, 40, 30, 22, 16, 12, 9, 7, 6]}
            color="var(--amber)"
            height={118}
            highlight={13}
            labels={['', '', '', '', '', '', '6a', '', '', '', '', '', '12p', '', '', '', '', '', '6p', '', '', '', '', '']}
          />
        }
      />

      {/* 3-column modules — matching design */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>

        {/* 1. Most congested corridors (RankBars) */}
        <Card title="Most congested corridors" code="PRESS DATA">
          <RankBars
            rows={[
              { label: 'Vine & Harbor', v: 74, disp: '2.4× baseline', color: 'var(--red)' },
              { label: '4th St viaduct', v: 58, disp: '1.8× baseline', color: 'var(--amber)' },
              { label: 'Harbor Bridge',  v: 46, disp: '1.5× baseline', color: 'var(--amber)' },
              { label: 'Midtown loop',   v: 36, disp: '1.2× baseline', color: 'var(--slate)' },
            ]}
            max={100}
          />
        </Card>

        {/* 2. Intersection performance — letter grades */}
        <Card title="Intersection performance" code="GLOBALS">
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 44px 60px', padding: '0 0 8px', borderBottom: '1px solid var(--rule)' }}>
            {['Intersection', 'LOS', 'Delay'].map((h, i) => (
              <span key={h} className="cap" style={{ fontSize: 8.5, textAlign: i === 0 ? 'left' : 'right' }}>{h}</span>
            ))}
          </div>
          {INTERSECTIONS.map(row => (
            <div key={row.name} style={{
              display: 'grid', gridTemplateColumns: '1fr 44px 60px',
              padding: '11px 0', borderBottom: '1px solid var(--rule-soft)', alignItems: 'center',
            }}>
              <span style={{ fontSize: 12.5, fontWeight: 500 }}>{row.name}</span>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{
                  width: 22, height: 22, borderRadius: 6,
                  background: `color-mix(in srgb, ${GRADE_COLOR[row.loc]} 18%, transparent)`,
                  color: GRADE_COLOR[row.loc],
                  display: 'grid', placeItems: 'center',
                  fontSize: 11.5, fontWeight: 800, fontFamily: 'var(--mono)',
                }}>
                  {row.loc}
                </span>
              </div>
              <span className="mono" style={{ fontSize: 13, fontWeight: 700, textAlign: 'right', color: GRADE_COLOR[row.loc] }}>
                {row.delay}
              </span>
            </div>
          ))}
          <div style={{ paddingTop: 10, borderTop: '1px solid var(--rule-soft)', marginTop: 4 }}>
            <p className="code" style={{ fontSize: 8.5, margin: 0 }}>Average AM peak — delay per intersection cycle</p>
          </div>
        </Card>

        {/* 3. Congestion pattern HeatGrid */}
        <Card title="Congestion pattern" code="HOUR × DAY">
          <HeatGrid
            matrix={HEAT_MATRIX}
            rowLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            colLabels={['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p']}
            color="188,126,21"
          />
          <div className="code" style={{ fontSize: 8.5, marginTop: 10 }}>
            Average AM & PM peaks concentrate the delay
          </div>
        </Card>
      </div>

      {/* Recommendations + small map */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        <Card title="AI recommendations" code="ACTION">
          {traffic.recs.map(([text, impact, c], i) => (
            <RecRow key={i} n={i + 1} text={text} impact={impact} c={c} />
          ))}
        </Card>

        <SmallMap
          dots={dots}
          heat={[
            { x: 47, y: 44, r: 120, color: 'rgba(188,126,21,.4)', o: 0.5 },
            { x: 35, y: 55, r: 80,  color: 'rgba(178,58,51,.3)',  o: 0.4 },
          ]}
          title="Traffic & congestion map"
          height={240}
        />
      </div>
    </Screen>
  )
}
