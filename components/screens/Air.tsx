"use client"
import Screen from '@/components/ui/Screen'
import ScreenHead from '@/components/ui/ScreenHead'
import RecRow from '@/components/ui/RecRow'
import AreaChart from '@/components/charts/AreaChart'
import RankBars from '@/components/charts/RankBars'
import StackBar from '@/components/charts/StackBar'
import { SituationBand, Module, SmallMap } from '@/components/screens/domain/DomainShared'
import { DOMAINS } from '@/lib/data'

const air = DOMAINS.air

export default function Air() {
  const dots = air.dots.map(d => ({
    x: d.x, y: d.y, color: d.color,
    size: d.crit ? 14 : 10,
    pulse: d.crit,
    label: d.tag,
  }))

  return (
    <Screen>
      <ScreenHead
        ico="air"
        title="Air Quality & Public Health"
        color="var(--amber)"
        actions={
          <>
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: '8px 16px' }}>
              Alert schools
            </button>
            <button className="btn" style={{ fontSize: 12, padding: '8px 16px' }}>
              Advisory draft
            </button>
          </>
        }
      />

      <SituationBand
        gauge={84}
        gaugeLabel="Moderate"
        gaugeColor="var(--amber)"
        eyebrow="City AQI"
        headline="School-zone exceedance projected midday — AQI 104 near south corridor schools"
        readouts={[
          ['City AQI', '84', 'var(--amber)'],
          ['School-zone peak', '104', 'var(--red)', 'projected'],
          ['Heat-island delta', '+4.1°C', 'var(--amber)'],
          ['Sensors online', '96 / 98', 'var(--green)'],
        ]}
        chart={
          <AreaChart
            data={[72, 75, 78, 80, 84, 89, 96, 104, 98, 88, 79, 72]}
            color="var(--amber)"
            threshold={100}
            thrLabel="Sensitive groups threshold (AQI 100)"
            labels={['6am', '', '', '9am', '', '', '12pm', '', '', '3pm', '', '6pm']}
            height={110}
          />
        }
      />

      {/* 3-column modules */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <Module title="Air quality by zone" code="ZONES">
          <RankBars
            rows={[
              { label: 'South corridor (schools)', v: 104, disp: 'AQI 104', color: 'var(--red)' },
              { label: 'Old Town', v: 89, disp: 'AQI 89', color: 'var(--amber)' },
              { label: 'Harbor industrial', v: 82, disp: 'AQI 82', color: 'var(--amber)' },
              { label: 'Downtown', v: 77, disp: 'AQI 77', color: 'var(--amber)' },
              { label: 'Northgate residential', v: 61, disp: 'AQI 61', color: 'var(--green)' },
            ]}
            max={150}
          />
        </Module>

        <Module title="Hourly AQI forecast — today" code="TODAY">
          <AreaChart
            data={[72, 75, 78, 80, 84, 89, 96, 104, 98, 88, 79, 72]}
            color="var(--amber)"
            threshold={100}
            thrLabel="Sensitive groups (100)"
            labels={['6am', '', '', '9am', '', '', '12pm', '', '', '3pm', '', '6pm']}
            height={130}
          />
          <div className="cap" style={{ marginTop: 10 }}>
            Peak window: 11:00–13:00 · Schools at risk: 9
          </div>
        </Module>

        <Module title="Pollutant breakdown" code="SOURCES">
          <StackBar
            parts={[
              { label: 'Traffic emissions', v: 48, disp: '48%', color: 'var(--amber)' },
              { label: 'Industrial', v: 22, disp: '22%', color: 'var(--slate)' },
              { label: 'Background', v: 19, disp: '19%', color: 'var(--blue)' },
              { label: 'Wildfire smoke', v: 11, disp: '11%', color: 'var(--red)' },
            ]}
          />
          <div className="cap" style={{ marginTop: 14 }}>
            Primary driver: traffic + low wind dispersion today
          </div>
        </Module>
      </div>

      {/* Recommendations + small map */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        <Module title="AI recommendations" code="ACTION">
          {air.recs.map(([text, impact, c], i) => (
            <RecRow key={i} n={i + 1} text={text} impact={impact} c={c} />
          ))}
        </Module>

        <SmallMap
          dots={dots}
          heat={[
            { x: 50, y: 72, r: 160, color: 'rgba(188,126,21,.4)', o: 0.5 },
            { x: 44, y: 64, r: 100, color: 'rgba(188,126,21,.3)', o: 0.4 },
          ]}
          title="Air quality zones map"
          height={240}
        />
      </div>
    </Screen>
  )
}
