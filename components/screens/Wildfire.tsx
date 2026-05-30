"use client"
import Screen from '@/components/ui/Screen'
import ScreenHead from '@/components/ui/ScreenHead'
import RecRow from '@/components/ui/RecRow'
import AreaChart from '@/components/charts/AreaChart'
import RankBars from '@/components/charts/RankBars'
import StackBar from '@/components/charts/StackBar'
import Readouts from '@/components/charts/Readouts'
import { SituationBand, Module, SmallMap, ExposureRow } from '@/components/screens/domain/DomainShared'
import { DOMAINS } from '@/lib/data'
import Link from 'next/link'

const fire = DOMAINS.fire

export default function Wildfire() {
  const dots = fire.dots.map(d => ({
    x: d.x, y: d.y, color: d.color,
    size: d.crit ? 14 : 10,
    pulse: d.crit,
    label: d.tag,
  }))

  return (
    <Screen>
      <ScreenHead
        ico="fire"
        title="Wildfire Risk"
        color="var(--red)"
        actions={
          <>
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: '8px 16px' }}>
              Report
            </button>
            <Link href="/emergency">
              <button className="btn" style={{ fontSize: 12, padding: '8px 16px', background: 'var(--red)', borderColor: 'var(--red)' }}>
                Open coordination
              </button>
            </Link>
          </>
        }
      />

      <SituationBand
        gauge={78}
        gaugeLabel="Extreme"
        gaugeColor="var(--red)"
        eyebrow="Fire weather index"
        headline="Ignition-risk zone expanding toward Northgate homes after wind shift"
        readouts={[
          ['Wind', '32 km/h NW', 'var(--amber)'],
          ['Humidity', '18%', 'var(--red)'],
          ['Fuel moisture', '9%', 'var(--red)'],
          ['Temp', '34°C', 'var(--amber)'],
        ]}
        chart={
          <AreaChart
            data={[180, 240, 310, 430, 540, 660, 760]}
            color="var(--red)"
            threshold={500}
            thrLabel="Evacuation trigger (500 homes)"
            labels={['now', '+1h', '+2h', '+3h', '+4h', '+5h', '+6h']}
            height={110}
          />
        }
      />

      {/* 3-column modules */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <Module title="Ignition-risk zones" code="CODE">
          <RankBars
            rows={[
              { label: 'NE Ridge (active)', v: 94, disp: '94 / 100', color: 'var(--red)' },
              { label: 'Dry Creek draw', v: 71, disp: '71 / 100', color: 'var(--amber)' },
              { label: 'Northgate buffer', v: 62, disp: '62 / 100', color: 'var(--amber)' },
              { label: 'Summit Road', v: 48, disp: '48 / 100', color: 'var(--amber)' },
              { label: 'Harbor bluffs', v: 29, disp: '29 / 100', color: 'var(--slate)' },
            ]}
            max={100}
          />
        </Module>

        <Module title="Structures in spread band" code="EXPOSURE">
          <StackBar
            parts={[
              { label: 'Homes', v: 430, disp: '430', color: 'var(--red)' },
              { label: 'Schools', v: 2, disp: '2', color: 'var(--amber)' },
              { label: 'Infrastructure', v: 8, disp: '8', color: 'var(--amber)' },
              { label: 'Commercial', v: 24, disp: '24', color: 'var(--slate)' },
            ]}
          />
          <div style={{ marginTop: 14 }}>
            <ExposureRow label="Homes (2-hr spread band)" count="430" color="var(--red)" />
            <ExposureRow label="Schools" count="2" color="var(--amber)" />
            <ExposureRow label="Critical infrastructure" count="8" color="var(--amber)" />
            <ExposureRow label="Commercial properties" count="24" color="var(--ink-soft)" />
          </div>
        </Module>

        <Module title="Detection & response" code="COVERAGE">
          <Readouts
            cols={2}
            items={[
              ['Crews available', '18 / 24', 'var(--green)'],
              ['Response time', '~11 min', 'var(--amber)'],
              ['Camera nodes', '12', 'var(--ink)'],
              ['Ridge sensors', 'None', 'var(--red)'],
            ]}
          />
          <div style={{ marginTop: 14 }}>
            <div className="cap" style={{ marginBottom: 8 }}>Fire-weather trend (last 24h)</div>
            <AreaChart
              data={[310, 340, 390, 460, 540, 620, 680, 720, 750, 760]}
              color="var(--red)"
              threshold={500}
              height={80}
            />
          </div>
        </Module>
      </div>

      {/* Recommendations + small map */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        <Module title="AI recommendations" code="ACTION">
          {fire.recs.map(([text, impact, c], i) => (
            <RecRow key={i} n={i + 1} text={text} impact={impact} c={c} />
          ))}
        </Module>

        <SmallMap
          dots={dots}
          heat={[
            { x: 78, y: 22, r: 200, color: 'rgba(178,58,51,.5)', o: 0.5 },
            { x: 72, y: 30, r: 120, color: 'rgba(188,126,21,.35)', o: 0.45 },
          ]}
          title="Wildfire risk map"
          height={240}
        />
      </div>
    </Screen>
  )
}
