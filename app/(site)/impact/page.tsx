// CityPULSE — Impact / Flagship case study (Meridian pilot) · SERVER component

import type { Metadata } from 'next';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'Impact · The Meridian pilot · CityPULSE Civil OS',
  description:
    'What a year of CityPULSE looks like: $4.2M in avoided cost, 82% of failures caught before failure, 9-minute early-warning lead, 47 reports auto-routed, and a $38.6M grant pipeline matched to FEMA BRIC, EPA and state funds — illustrated through the Meridian reference deployment.',
};

// ── Tokens (mirror globals.css; promo pages are inline-styled) ───────────────
const INK = '#2A3037';
const PAPER = '#F3F0E8';
const RULE = '#E8E3D8';
const INK_SOFT = '#5A626B';
const INK_FAINT = '#5F666E'; // WCAG AA on paper/white
const SURFACE = '#FFFFFF';
const SURFACE_2 = '#FBF9F4';
const BLUE = '#2A6C92';
const BLUE_WASH = '#E8EFF4';
const GREEN = '#2C7A52';
const GREEN_WASH = '#E6F0E8';
const AMBER = '#8F5F0D';
const RED = '#B23A33';
const DARK_BG = '#1C2027';

const serif = '"Spectral", Georgia, serif';
const grotesk = '"Archivo", -apple-system, BlinkMacSystemFont, sans-serif';
const mono = '"IBM Plex Mono", ui-monospace, Menlo, monospace';

// ── Shared style fragments ───────────────────────────────────────────────────
const codeStyle: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 10,
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  color: INK_FAINT,
  fontWeight: 500,
};

const btnPrimary: React.CSSProperties = {
  fontFamily: grotesk,
  fontSize: 14,
  fontWeight: 600,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '13px 28px',
  border: '1px solid transparent',
  borderRadius: 100,
  background: INK,
  color: '#fff',
  cursor: 'pointer',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
};

const btnGhost: React.CSSProperties = {
  ...btnPrimary,
  background: 'transparent',
  color: INK,
  border: `1.5px solid ${INK}`,
};

const wrap: React.CSSProperties = {
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 24px',
};

const sectionPad: React.CSSProperties = {
  padding: '96px 0',
};

const h2Style: React.CSSProperties = {
  fontFamily: serif,
  fontSize: 'clamp(26px, 4vw, 40px)',
  fontWeight: 600,
  color: INK,
  letterSpacing: '-0.02em',
  lineHeight: 1.15,
};

// ── SVGs ─────────────────────────────────────────────────────────────────────
function ArrowRight({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke={color} strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// ── Reusable: before/after vignette card ─────────────────────────────────────
function Vignette({
  tag,
  tagColor,
  tagWash,
  where,
  before,
  after,
  result,
}: {
  tag: string;
  tagColor: string;
  tagWash: string;
  where: string;
  before: string;
  after: string;
  result: string;
}) {
  return (
    <div
      style={{
        background: SURFACE,
        border: `1px solid ${RULE}`,
        borderRadius: 12,
        boxShadow: '0 2px 10px rgba(42,48,55,.055), 0 1px 2px rgba(42,48,55,.04)',
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: grotesk,
            fontSize: 11,
            fontWeight: 600,
            color: tagColor,
            background: tagWash,
            borderRadius: 100,
            padding: '4px 11px',
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: tagColor }} />
          {tag}
        </span>
        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: INK_FAINT }}>
          {where}
        </span>
      </div>

      <div>
        <div style={{ ...codeStyle, color: RED, marginBottom: 5 }}>Before</div>
        <div style={{ fontSize: 14, color: INK_SOFT, lineHeight: 1.6 }}>{before}</div>
      </div>
      <div>
        <div style={{ ...codeStyle, color: GREEN, marginBottom: 5 }}>With CityPULSE</div>
        <div style={{ fontSize: 14, color: INK_SOFT, lineHeight: 1.6 }}>{after}</div>
      </div>

      <div
        style={{
          marginTop: 4,
          paddingTop: 14,
          borderTop: `1px solid ${RULE}`,
          fontFamily: serif,
          fontSize: 15,
          fontWeight: 600,
          color: INK,
          lineHeight: 1.5,
        }}
      >
        {result}
      </div>
    </div>
  );
}

// ── Reusable: testimonial pull-quote ─────────────────────────────────────────
function Quote({ quote, role }: { quote: string; role: string }) {
  return (
    <figure
      style={{
        background: SURFACE,
        border: `1px solid ${RULE}`,
        borderRadius: 12,
        padding: '28px 30px',
        boxShadow: '0 1px 2px rgba(42,48,55,.05)',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      <span style={{ fontFamily: serif, fontSize: 40, lineHeight: 0.6, color: INK_FAINT }} aria-hidden="true">
        &ldquo;
      </span>
      <blockquote
        style={{
          margin: 0,
          fontFamily: serif,
          fontSize: 18,
          lineHeight: 1.55,
          color: INK,
          letterSpacing: '-0.01em',
        }}
      >
        {quote}
      </blockquote>
      <figcaption style={{ fontFamily: grotesk, fontSize: 12.5, fontWeight: 600, color: INK_SOFT, marginTop: 'auto' }}>
        {role}
      </figcaption>
    </figure>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function ImpactPage() {
  // Headline metrics — match the product's demo scenario (lib/data.ts)
  const headline = [
    { num: '$4.2M', label: 'Avoided cost per year, vs. reactive repair' },
    { num: '82%', label: 'Of infrastructure failures caught before failure' },
    { num: '9 min', label: 'Average early-warning lead on critical events' },
    { num: '47', label: 'Citizen reports auto-routed without staff' },
  ];

  // Concrete vignettes — drawn from the live demo scenario
  const vignettes = [
    {
      tag: 'Water · caught at 90 days',
      tagColor: RED,
      tagWash: '#F4E2DF',
      where: 'Trunk main MX-118 · Riverside',
      before:
        'A corroding trunk main would have ruptured with no warning, triggering an emergency dig, boil-water notice and roadway closure across a busy corridor.',
      after:
        'The Water Agent flagged MX-118 90 days out — corrosivity index 8.1, two joints showing pre-failure transients — and proposed a scheduled inspection and planned replacement.',
      result: '~$2.1M reactive repair avoided; 6,200 service connections protected.',
    },
    {
      tag: 'Wildfire · pre-staged',
      tagColor: AMBER,
      tagWash: '#F6EDD8',
      where: 'NE Ridge → Northgate',
      before:
        'A wind shift would expand the ignition-risk zone toward homes overnight, with crews and advisories scrambled only once a fire was visible.',
      after:
        'The Fire Agent detected the risk zone expanding ~340 m toward Northgate, put 430 homes inside the 2-hour spread band, and surfaced a ready pre-stage plan for crews and an advisory.',
      result: '430 homes inside an early advisory; crews and shelters staged before ignition.',
    },
    {
      tag: 'Drainage · before the storm',
      tagColor: BLUE,
      tagWash: BLUE_WASH,
      where: 'Westbank · Marsh & 9th',
      before:
        'A partial storm-drain blockage would surface only as flooded streets and property-damage claims after Tuesday’s rain.',
      after:
        'The Citizen Reports Agent clustered 9 separate 311 reports into one suspected drainage failure; the Flood Agent confirmed a 38 mm/3h storm would exceed capacity, and dispatched a survey to pre-clear inlets.',
      result: '210 properties in the flood zone protected; storm-claim exposure cut before the rain.',
    },
  ];

  // Impact-by-department table — each department + the metric it gained
  const deptRows: { dept: string; gained: string; metric: string; color: string }[] = [
    { dept: 'Public Works', gained: 'Drainage failure confirmed before Tuesday’s storm; 9-report cluster resolved as one work order', metric: '210 properties protected', color: BLUE },
    { dept: 'Water Authority', gained: 'Trunk main MX-118 caught 90 days before rupture and staged as a planned, grant-funded replacement', metric: '$2.1M repair avoided', color: RED },
    { dept: 'Fire & Rescue', gained: 'NE Ridge ignition zone tracked in real time; pre-stage plan ready before any ignition', metric: '430 homes pre-warned', color: AMBER },
    { dept: 'Transportation', gained: 'Vine & Harbor congestion and emissions spike surfaced with a modeled adaptive-signal fix', metric: '−18% delay, −12% NOx', color: BLUE },
    { dept: 'Grants Office', gained: 'Detected risks auto-matched to open federal and state programs, with applications pre-assembled', metric: '$38.6M pipeline surfaced', color: GREEN },
  ];

  // Grant outcomes — matched to real program names from the scenario
  const grants: { id: string; title: string; cost: string; program: string; match: string }[] = [
    { id: 'CP-118', title: 'Riverside trunk main replacement (MX-118)', cost: '$2.4M', program: 'State Water Resilience Fund', match: '80%' },
    { id: 'CP-091', title: 'NE Ridge wildfire buffer + sensor network', cost: '$3.1M', program: 'FEMA BRIC', match: '75%' },
    { id: 'CP-204', title: 'Lead service-line replacement — Westbank', cost: '$5.6M', program: 'EPA WIIN / DWSRF', match: '90%' },
    { id: 'CP-181', title: 'School-zone air monitoring + screening', cost: '$0.7M', program: 'EPA Community Air', match: '100%' },
    { id: 'CP-072', title: 'Cedar St bridge rehabilitation', cost: '$4.8M', program: 'State Bridge Rehab', match: '80%' },
  ];

  const testimonials = [
    {
      quote:
        'For the first time we were scheduling an inspection instead of standing over a ruptured main. The system told us which segment, and why, with the data behind it.',
      role: 'Public Works Director (illustrative)',
    },
    {
      quote:
        'It connected a risk we already had to a grant we would have missed. The application package was most of the way written before we sat down.',
      role: 'Grants Office Lead (illustrative)',
    },
    {
      quote:
        'Nine separate complaints became one work order with a map and an SLA. My team stopped triaging the inbox and started fixing the actual problem.',
      role: '311 / Citizen Support Manager (illustrative)',
    },
  ];

  const tdHead: React.CSSProperties = {
    textAlign: 'left',
    fontFamily: mono,
    fontSize: 10,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: INK_FAINT,
    fontWeight: 600,
    padding: '0 0 14px',
    borderBottom: `1px solid ${RULE}`,
  };
  const tdCell: React.CSSProperties = {
    padding: '18px 0',
    borderBottom: `1px solid ${RULE}`,
    verticalAlign: 'top',
    fontFamily: grotesk,
    fontSize: 14,
    color: INK_SOFT,
    lineHeight: 1.55,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Archivo:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:"Archivo",-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased;}
        a{text-decoration:none;color:inherit;}
        @media(max-width:760px){
          .impact-hero h1{font-size:clamp(28px,8vw,38px)!important;}
          .impact-table-wrap{overflow-x:auto;}
          .impact-table{min-width:560px;}
        }
      `}</style>

      {/* ━━━━━━━━━━━━━━ 1. HEADER ━━━━━━━━━━━━━━ */}
      <SiteHeader />

      <main id="main-content">

      {/* ━━━━━━━━━━━━━━ 2. HERO + HEADLINE METRICS ━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPad, paddingTop: 80, paddingBottom: 72, background: PAPER }}>
        <div style={wrap}>
          <div className="impact-hero" style={{ maxWidth: 880, marginBottom: 56 }}>
            <div style={{ ...codeStyle, marginBottom: 18 }}>Case study · The Meridian pilot</div>
            <h1
              style={{
                fontFamily: serif,
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 600,
                color: INK,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                marginBottom: 22,
                maxWidth: '18ch',
              }}
            >
              What a year of CityPULSE looks like.
            </h1>
            <p style={{ fontFamily: serif, fontSize: 17, lineHeight: 1.65, color: INK_SOFT, maxWidth: '62ch' }}>
              Meridian is an illustrative reference deployment — a mid-size city of 341,200 we
              use to show, end to end, what a year on CityPULSE produces. Every number below is
              drawn from the same operating scenario you can explore live in the demo.
            </p>
          </div>

          {/* Headline metrics — serif big */}
          <div
            className="grid-4"
            style={{
              gap: 0,
              background: SURFACE,
              border: `1px solid ${RULE}`,
              borderRadius: 14,
              boxShadow: '0 2px 10px rgba(42,48,55,.055), 0 1px 2px rgba(42,48,55,.04)',
              overflow: 'hidden',
            }}
          >
            {headline.map((m, i) => (
              <div
                key={i}
                style={{
                  padding: '32px 28px',
                  borderRight: i < 3 ? `1px solid ${RULE}` : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: serif,
                    fontSize: 'clamp(34px, 5vw, 48px)',
                    fontWeight: 700,
                    color: INK,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {m.num}
                </div>
                <div style={{ fontFamily: grotesk, fontSize: 13, color: INK_SOFT, lineHeight: 1.5, maxWidth: '22ch' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 3. THE STORY (before → after) ━━━━━━━━━━━━━━ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: SURFACE_2, ...sectionPad }}>
        <div style={wrap}>
          <div style={{ marginBottom: 48, maxWidth: 760 }}>
            <div style={{ ...codeStyle, marginBottom: 14 }}>The story</div>
            <h2 style={{ ...h2Style, marginBottom: 18, maxWidth: '20ch' }}>
              From reactive and siloed to predictive and unified.
            </h2>
            <p style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.7, color: INK_SOFT, maxWidth: '64ch' }}>
              Before CityPULSE, Meridian ran the way most cities do: nine departments, nine
              systems, and a signal for nearly every failure sitting in one of them — unseen
              until it became an emergency. After, the same feeds flow into one digital twin,
              agents watch the whole territory, and the city acts on three concrete events
              while there was still time to choose the cheaper path.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 16 }}>
            {vignettes.map((v) => (
              <Vignette key={v.tag} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 4. IMPACT BY DEPARTMENT (table) ━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPad, background: PAPER }}>
        <div style={wrap}>
          <div style={{ marginBottom: 40, maxWidth: 720 }}>
            <div style={{ ...codeStyle, marginBottom: 14 }}>Impact by department</div>
            <h2 style={{ ...h2Style, maxWidth: '22ch' }}>One platform, a result in every office.</h2>
          </div>

          <div
            className="impact-table-wrap"
            style={{
              background: SURFACE,
              border: `1px solid ${RULE}`,
              borderRadius: 14,
              padding: '8px 28px 8px',
              boxShadow: '0 2px 10px rgba(42,48,55,.055)',
            }}
          >
            <table className="impact-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ ...tdHead, width: '22%' }}>Department</th>
                  <th style={tdHead}>What it gained</th>
                  <th style={{ ...tdHead, width: '22%', textAlign: 'right' }}>Metric</th>
                </tr>
              </thead>
              <tbody>
                {deptRows.map((r, i) => (
                  <tr key={r.dept}>
                    <td style={{ ...tdCell, borderBottom: i === deptRows.length - 1 ? 'none' : tdCell.borderBottom }}>
                      <span style={{ fontWeight: 700, color: INK, fontSize: 14.5 }}>{r.dept}</span>
                    </td>
                    <td style={{ ...tdCell, borderBottom: i === deptRows.length - 1 ? 'none' : tdCell.borderBottom }}>
                      {r.gained}
                    </td>
                    <td
                      style={{
                        ...tdCell,
                        borderBottom: i === deptRows.length - 1 ? 'none' : tdCell.borderBottom,
                        textAlign: 'right',
                      }}
                    >
                      <span style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: r.color, letterSpacing: '-0.01em' }}>
                        {r.metric}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 5. GRANT OUTCOMES (grant-evaluator evidence) ━━━━━━━━━━━━━━ */}
      <section style={{ background: DARK_BG, ...sectionPad }}>
        <div style={wrap}>
          <div className="two-col" style={{ gap: 48, alignItems: 'center', marginBottom: 52 }}>
            <div>
              <div style={{ ...codeStyle, color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>Grant outcomes</div>
              <h2 style={{ ...h2Style, color: '#fff', maxWidth: '18ch' }}>
                Risk, surfaced as a funded project pipeline.
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                The Budget &amp; Grants Agent maps each detected risk to open federal and state
                programs, scores funding probability and pre-assembles the application — turning a
                quiet risk register into a&nbsp;
                <strong style={{ color: '#fff', fontWeight: 700 }}>$38.6M capital pipeline</strong>, matched
                to FEMA BRIC, EPA and state resilience funds.
              </p>
            </div>
          </div>

          {/* Headline pipeline figure */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0,
              borderTop: '1px solid rgba(255,255,255,0.12)',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
              marginBottom: 40,
            }}
          >
            {[
              { val: '$38.6M', label: 'Total pipeline surfaced' },
              { val: '11', label: 'Grant-eligible projects' },
              { val: '3', label: 'Federal & state funds matched' },
            ].map((m, i) => (
              <div
                key={i}
                style={{
                  padding: '28px 32px',
                  paddingLeft: i > 0 ? 32 : 0,
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                }}
              >
                <div style={{ fontFamily: serif, fontSize: 'clamp(30px, 4vw, 40px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {m.val}
                </div>
                <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 8 }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Matched projects */}
          <div className="grid-2" style={{ gap: 14 }}>
            {grants.map((g) => (
              <div
                key={g.id}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 12,
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 5 }}>
                    {g.id} · {g.program}
                  </div>
                  <div style={{ fontFamily: grotesk, fontSize: 14, fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>
                    {g.title}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                    {g.cost}
                  </div>
                  <div style={{ fontFamily: grotesk, fontSize: 11, fontWeight: 600, color: '#8FCBA8', marginTop: 2 }}>
                    {g.match} match
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 6. TESTIMONIALS ━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPad, background: PAPER }}>
        <div style={wrap}>
          <div style={{ marginBottom: 48, maxWidth: 720 }}>
            <div style={{ ...codeStyle, marginBottom: 14 }}>In their words</div>
            <h2 style={{ ...h2Style, marginBottom: 14, maxWidth: '20ch' }}>
              How the work changes on the ground.
            </h2>
            <p style={{ fontFamily: grotesk, fontSize: 13.5, color: INK_FAINT, maxWidth: '58ch', lineHeight: 1.6 }}>
              The quotes below are illustrative and role-attributed — composites of the operator
              experience CityPULSE is designed to deliver, not statements from named individuals.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 16 }}>
            {testimonials.map((t) => (
              <Quote key={t.role} quote={t.quote} role={t.role} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 7. CTA ━━━━━━━━━━━━━━ */}
      <section style={{ background: SURFACE_2, borderTop: `1px solid ${RULE}`, padding: '80px 0' }}>
        <div style={{ ...wrap, textAlign: 'center' }}>
          <div style={{ ...codeStyle, marginBottom: 18 }}>Your turn</div>
          <h2
            style={{
              ...h2Style,
              fontSize: 'clamp(28px, 5vw, 48px)',
              letterSpacing: '-0.025em',
              margin: '0 auto 18px',
              maxWidth: '22ch',
            }}
          >
            See it on your city&rsquo;s data.
          </h2>
          <p
            style={{
              fontFamily: grotesk,
              fontSize: 15,
              color: INK_SOFT,
              maxWidth: '50ch',
              margin: '0 auto 36px',
              lineHeight: 1.65,
            }}
          >
            We will stand up a focused pilot on your own feeds and show you the same picture
            Meridian gets — the risks you are carrying, and the grants that could fund the fix.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="/contact" style={btnPrimary}>
              See it on your city&rsquo;s data&nbsp;
              <ArrowRight color="#fff" />
            </a>
            <a href="/about" style={btnGhost}>
              Why we built this
            </a>
          </div>
        </div>
      </section>

      </main>

      {/* ━━━━━━━━━━━━━━ 8. FOOTER ━━━━━━━━━━━━━━ */}
      <SiteFooter />
    </>
  );
}
