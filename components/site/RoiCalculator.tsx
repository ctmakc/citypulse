'use client'

import { useState } from 'react'

/* ============================================================
   CityPULSE — interactive ROI calculator (promo site)
   Client component. CALM design tokens, inline styles + the
   shared responsive grid utilities (.grid-2 / .grid-4).

   The math is intentionally transparent + deterministic — no
   network calls, no Math.random. Every result is a pure
   function of the four inputs, so the same inputs always
   produce the same illustrative figures.
   ============================================================ */

/* ---- model constants (documented + tunable) -------------------------------
   These encode the "illustrative" thesis: predictive maintenance shifts a
   share of spend away from expensive reactive repairs, and the size of that
   shift scales with how reactive a jurisdiction is today.                    */
const MODEL = {
  /* Reactive repairs typically cost a large multiple of the same work done
     proactively. We assume the predictive program reclaims this premium on
     the portion of the reactive backlog it converts. */
  REACTIVE_COST_PREMIUM: 0.45, // 45% of converted reactive spend is waste we recover
  /* Share of the *current* reactive bucket the platform realistically helps
     convert to planned work in year one. */
  REACTIVE_CONVERSION: 0.6,
  /* Response-time improvement scales with reactive share: the more reactive
     a city is today, the more early-warning helps. Capped for realism. */
  RESPONSE_MIN: 0.18, // 18% faster at best-case (already proactive) cities
  RESPONSE_MAX: 0.41, // 41% faster for heavily reactive cities
  /* Grant-eligible value: predictive condition data surfaces a pipeline of
     fundable resilience projects. Modeled as a share of annual budget,
     lifted slightly by portfolio size (more assets → more discrete projects). */
  GRANT_BASE_SHARE: 0.08,
  GRANT_ASSET_BONUS_MAX: 0.06, // up to +6% for very large asset portfolios
  ASSET_BONUS_SATURATION: 1_000_000, // assets at which the bonus is ~maxed
} as const

/* ---- pure, deterministic compute ---- */
export interface RoiInputs {
  population: number
  budget: number // annual infrastructure budget, $
  assets: number
  reactiveShare: number // 0–100 (%)
}

export interface RoiResult {
  avoidedCost: number // $/yr
  responseImprovement: number // 0–1 (fraction faster)
  grantValue: number // $ pipeline surfaced
  perCapita: number // avoided $/resident/yr
}

export function computeRoi(input: RoiInputs): RoiResult {
  const budget = Math.max(0, input.budget)
  const reactive = Math.min(1, Math.max(0, input.reactiveShare / 100))
  const assets = Math.max(0, input.assets)
  const population = Math.max(1, input.population)

  // 1) Avoided cost — recover the reactive premium on converted reactive spend.
  const reactiveSpend = budget * reactive
  const convertedSpend = reactiveSpend * MODEL.REACTIVE_CONVERSION
  const avoidedCost = convertedSpend * MODEL.REACTIVE_COST_PREMIUM

  // 2) Response-time improvement — interpolate between MIN and MAX by reactive share.
  const responseImprovement =
    MODEL.RESPONSE_MIN + (MODEL.RESPONSE_MAX - MODEL.RESPONSE_MIN) * reactive

  // 3) Grant-eligible pipeline — base share of budget + asset-scale bonus.
  const assetBonus =
    MODEL.GRANT_ASSET_BONUS_MAX *
    Math.min(1, assets / MODEL.ASSET_BONUS_SATURATION)
  const grantValue = budget * (MODEL.GRANT_BASE_SHARE + assetBonus)

  // 4) Per-capita avoided cost.
  const perCapita = avoidedCost / population

  return { avoidedCost, responseImprovement, grantValue, perCapita }
}

/* ---- formatters ---- */
const fmtUSD = (n: number): string => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`
  return `$${Math.round(n)}`
}
const fmtUSDPrecise = (n: number): string =>
  '$' + Math.round(n).toLocaleString('en-US')
const fmtInt = (n: number): string => Math.round(n).toLocaleString('en-US')

/* ---- tokens (mirror globals.css; inline so the server/client split stays simple) ---- */
const INK = 'var(--ink)'
const INK_SOFT = 'var(--ink-soft)'
const INK_FAINT = 'var(--ink-faint)'
const RULE = 'var(--rule)'
const SURFACE = 'var(--surface)'
const SURFACE_2 = 'var(--surface-2)'
const PAPER = 'var(--paper)'
const BLUE = 'var(--blue)'
const GREEN = 'var(--green)'
const AMBER = 'var(--amber)'

const serif = 'var(--serif)'
const grotesk = 'var(--grotesk)'
const mono = 'var(--mono)'

const wrap: React.CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }
const codeStyle: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 10,
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  color: INK_FAINT,
  fontWeight: 500,
}

/* ---- one input row ---- */
function InputRow({
  label,
  hint,
  value,
  min,
  max,
  step,
  prefix,
  suffix,
  display,
  onChange,
}: {
  label: string
  hint?: string
  value: number
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
  display: string
  onChange: (v: number) => void
}) {
  const id = 'roi-' + label.toLowerCase().replace(/[^a-z]+/g, '-')
  const clamp = (v: number) => Math.min(max, Math.max(min, v))
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 9 }}>
        <label
          htmlFor={id}
          style={{ fontSize: 12.5, fontWeight: 600, color: INK, fontFamily: grotesk }}
        >
          {label}
        </label>
        <span style={{ fontFamily: mono, fontSize: 13.5, fontWeight: 600, color: BLUE, fontVariantNumeric: 'tabular-nums' }}>
          {display}
        </span>
      </div>

      {/* Number field */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: `1px solid ${RULE}`,
          borderRadius: 'var(--r-sm)',
          background: SURFACE,
          height: 40,
          padding: '0 12px',
          marginBottom: 10,
        }}
      >
        {prefix && <span style={{ color: INK_FAINT, fontFamily: mono, fontSize: 13, marginRight: 4 }}>{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value) || 0))}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: mono,
            fontSize: 13.5,
            color: INK,
            width: '100%',
            fontVariantNumeric: 'tabular-nums',
          }}
        />
        {suffix && <span style={{ color: INK_FAINT, fontFamily: mono, fontSize: 13, marginLeft: 4 }}>{suffix}</span>}
      </div>

      {/* Slider */}
      <input
        type="range"
        aria-label={label + ' slider'}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value)))}
        style={{ width: '100%', accentColor: '#2A6C92', cursor: 'pointer', display: 'block' }}
      />
      {hint && (
        <div style={{ fontSize: 11.5, color: INK_FAINT, marginTop: 7, lineHeight: 1.5, fontFamily: grotesk }}>
          {hint}
        </div>
      )}
    </div>
  )
}

/* ---- one big result number ---- */
function ResultCard({
  value,
  label,
  sub,
  accent,
}: {
  value: string
  label: string
  sub: string
  accent: string
}) {
  return (
    <div
      style={{
        background: SURFACE,
        border: `1px solid ${RULE}`,
        borderRadius: 'var(--r)',
        padding: '20px 22px',
        boxShadow: 'var(--sh-1)',
        borderTop: `3px solid ${accent}`,
      }}
    >
      <div style={{ ...codeStyle, marginBottom: 12 }}>{label}</div>
      <div
        style={{
          fontFamily: serif,
          fontSize: 'clamp(30px, 4vw, 40px)',
          fontWeight: 700,
          color: INK,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 12.5, color: INK_SOFT, marginTop: 10, lineHeight: 1.5, fontFamily: grotesk }}>
        {sub}
      </div>
    </div>
  )
}

export default function RoiCalculator() {
  const [population, setPopulation] = useState(120_000)
  const [budget, setBudget] = useState(45_000_000)
  const [assets, setAssets] = useState(60_000)
  const [reactiveShare, setReactiveShare] = useState(55)

  const r = computeRoi({ population, budget, assets, reactiveShare })

  return (
    <section style={{ background: SURFACE_2, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}`, padding: '88px 0' }}>
      {/* Local style for the slider thumbs/tracks so they read as CALM, not OS-default chrome */}
      <style>{`
        .roi-grid { display: grid; grid-template-columns: 420px 1fr; gap: 40px; align-items: start; }
        @media (max-width: 900px) { .roi-grid { grid-template-columns: 1fr; gap: 32px; } }
        input[type="range"].roi-range,
        .roi-panel input[type="range"] {
          -webkit-appearance: none; appearance: none;
          height: 4px; border-radius: 100px; background: var(--rule); outline-offset: 4px;
        }
        .roi-panel input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--blue); border: 2px solid var(--surface);
          box-shadow: var(--sh-2); cursor: pointer;
        }
        .roi-panel input[type="range"]::-moz-range-thumb {
          width: 16px; height: 16px; border-radius: 50%;
          background: var(--blue); border: 2px solid var(--surface);
          box-shadow: var(--sh-2); cursor: pointer;
        }
      `}</style>

      <div style={wrap}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ ...codeStyle, marginBottom: 14 }}>ROI Calculator</div>
          <h2
            style={{
              fontFamily: serif,
              fontSize: 'clamp(26px, 4vw, 40px)',
              fontWeight: 600,
              color: INK,
              letterSpacing: '-0.02em',
              marginBottom: 14,
            }}
          >
            Estimate the value of going predictive
          </h2>
          <p style={{ fontFamily: grotesk, fontSize: 15, color: INK_SOFT, maxWidth: '54ch', margin: '0 auto', lineHeight: 1.6 }}>
            Move four sliders to see how shifting from reactive repairs to predictive maintenance could pay off in your jurisdiction.
          </p>
        </div>

        <div className="roi-grid roi-panel">
          {/* ── Inputs ── */}
          <div
            style={{
              background: SURFACE,
              border: `1px solid ${RULE}`,
              borderRadius: 'var(--r-lg)',
              padding: '26px 26px 22px',
              boxShadow: 'var(--sh-2)',
            }}
          >
            <div style={{ ...codeStyle, marginBottom: 20 }}>Your jurisdiction</div>

            <InputRow
              label="Population"
              value={population}
              min={1_000}
              max={2_000_000}
              step={1_000}
              display={fmtInt(population)}
              onChange={setPopulation}
              hint="Residents served by the infrastructure you operate."
            />
            <InputRow
              label="Annual infrastructure budget"
              value={budget}
              min={500_000}
              max={1_000_000_000}
              step={500_000}
              prefix="$"
              display={fmtUSDPrecise(budget)}
              onChange={setBudget}
              hint="Operating + capital spend on roads, water, transit and facilities."
            />
            <InputRow
              label="Number of assets"
              value={assets}
              min={500}
              max={2_000_000}
              step={500}
              display={fmtInt(assets)}
              onChange={setAssets}
              hint="Pipes, road segments, signals, pumps, bridges, facilities — anything tracked."
            />
            <InputRow
              label="Current reactive-repair share"
              value={reactiveShare}
              min={0}
              max={100}
              step={1}
              suffix="%"
              display={`${reactiveShare}%`}
              onChange={setReactiveShare}
              hint="Portion of maintenance spend that responds to failures rather than preventing them."
            />
          </div>

          {/* ── Results ── */}
          <div>
            <div className="grid-2" style={{ gap: 16 }}>
              <ResultCard
                accent={GREEN}
                label="Est. avoided cost / yr"
                value={fmtUSD(r.avoidedCost)}
                sub="Reactive-repair premium recovered by converting failures into planned work."
              />
              <ResultCard
                accent={BLUE}
                label="Faster response"
                value={`${Math.round(r.responseImprovement * 100)}%`}
                sub="Modeled improvement in time-to-response from early-warning on critical assets."
              />
              <ResultCard
                accent={AMBER}
                label="Grant-eligible pipeline"
                value={fmtUSD(r.grantValue)}
                sub="Fundable resilience projects surfaced from condition data in the first year."
              />
              <ResultCard
                accent={'var(--slate)'}
                label="Avoided cost / resident"
                value={r.perCapita >= 1 ? fmtUSDPrecise(r.perCapita) : `$${r.perCapita.toFixed(2)}`}
                sub="Annual avoided cost spread across the residents you serve."
              />
            </div>

            {/* Disclaimer + CTA */}
            <div
              style={{
                marginTop: 20,
                background: PAPER,
                border: `1px solid ${RULE}`,
                borderRadius: 'var(--r)',
                padding: '18px 20px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              <p style={{ margin: 0, fontSize: 12, color: INK_FAINT, lineHeight: 1.6, fontFamily: grotesk, maxWidth: '58ch' }}>
                <strong style={{ color: INK_SOFT }}>Illustrative estimate only.</strong> Figures are modeled from your
                inputs using transparent, fixed assumptions and are not a quote, forecast, or guarantee of savings.
                Actual results depend on asset mix, data quality and local conditions.
              </p>
              <a href="/contact" className="btn" style={{ whiteSpace: 'nowrap', textDecoration: 'none' }}>
                Get a tailored estimate
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            {/* How it's computed — keeps the math transparent for procurement/grant reviewers */}
            <details
              style={{
                marginTop: 14,
                background: SURFACE,
                border: `1px solid ${RULE}`,
                borderRadius: 'var(--r)',
                padding: '4px 0',
              }}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  listStyle: 'none',
                  padding: '14px 20px',
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: INK,
                  fontFamily: grotesk,
                }}
              >
                How this is calculated
              </summary>
              <div style={{ padding: '0 20px 18px', fontSize: 12.5, color: INK_SOFT, lineHeight: 1.7, fontFamily: grotesk }}>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>
                    <strong>Avoided cost</strong> = budget × reactive share ×{' '}
                    {Math.round(MODEL.REACTIVE_CONVERSION * 100)}% converted ×{' '}
                    {Math.round(MODEL.REACTIVE_COST_PREMIUM * 100)}% reactive premium recovered.
                  </li>
                  <li>
                    <strong>Faster response</strong> scales with reactive share from{' '}
                    {Math.round(MODEL.RESPONSE_MIN * 100)}% to {Math.round(MODEL.RESPONSE_MAX * 100)}%.
                  </li>
                  <li>
                    <strong>Grant pipeline</strong> = budget × ({Math.round(MODEL.GRANT_BASE_SHARE * 100)}% base +
                    up to {Math.round(MODEL.GRANT_ASSET_BONUS_MAX * 100)}% for large asset portfolios).
                  </li>
                  <li>
                    <strong>Per resident</strong> = avoided cost ÷ population.
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  )
}
