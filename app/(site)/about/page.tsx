// CityPULSE — About / Mission · SERVER component

import type { Metadata } from 'next';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';

export const metadata: Metadata = {
  title: 'About · CityPULSE Civil OS',
  description:
    'CityPULSE gives cities a nervous system — an AI operating system that turns siloed infrastructure data into early warnings, explainable actions and grant-ready capital projects. Public benefit first, data sovereignty, human-approved AI.',
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

const proseStyle: React.CSSProperties = {
  fontFamily: serif,
  fontSize: 16,
  lineHeight: 1.7,
  color: INK_SOFT,
  margin: '0 0 20px',
};

// ── SVGs ─────────────────────────────────────────────────────────────────────
function ArrowRight({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke={color} strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function IconBenefit() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={BLUE} strokeWidth={1.8}>
      <path d="M12 21C7 17 3 13.5 3 9a4 4 0 0 1 7-2.6A4 4 0 0 1 17 9c0 4.5-4 8-5 12z" />
    </svg>
  );
}
function IconSovereignty() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={GREEN} strokeWidth={1.8}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function IconExplain() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#BC7E15" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
    </svg>
  );
}
function IconProcurement() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#B23A33" strokeWidth={1.8}>
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
    </svg>
  );
}
function IconAccessible() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={BLUE} strokeWidth={1.8}>
      <circle cx="12" cy="4" r="1.6" />
      <path d="M4 8h16M12 8v6M12 14l-3 6M12 14l3 6" />
    </svg>
  );
}

// ── Reusable: principle card ─────────────────────────────────────────────────
function PrincipleCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
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
        gap: 12,
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 8,
          background: PAPER,
          border: `1px solid ${RULE}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, color: INK, marginBottom: 6, fontFamily: grotesk }}>
          {title}
        </div>
        <div style={{ fontSize: 13.5, color: INK_SOFT, lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

// ── Reusable: 3-step ─────────────────────────────────────────────────────────
function StepCard({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: BLUE_WASH,
          border: `1px solid ${RULE}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: serif,
          fontSize: 20,
          fontWeight: 700,
          color: BLUE,
        }}
        aria-hidden="true"
      >
        {n}
      </div>
      <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 600, color: INK, letterSpacing: '-0.01em' }}>
        {title}
      </div>
      <div style={{ fontSize: 14, color: INK_SOFT, lineHeight: 1.6 }}>{desc}</div>
    </div>
  );
}

// ── Reusable: team role card (no fabricated named people) ────────────────────
function RoleCard({
  role,
  focus,
}: {
  role: string;
  focus: string;
}) {
  return (
    <div
      style={{
        background: SURFACE,
        border: `1px solid ${RULE}`,
        borderRadius: 12,
        padding: '22px 24px',
        boxShadow: '0 1px 2px rgba(42,48,55,.05)',
      }}
    >
      {/* generic avatar seal — deliberately not a photo of a real person */}
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #D0E8F0 0%, #B8D9C8 100%)',
          border: `1px solid ${RULE}`,
          marginBottom: 16,
        }}
        aria-hidden="true"
      />
      <div style={{ fontFamily: grotesk, fontWeight: 700, fontSize: 14.5, color: INK }}>{role}</div>
      <div style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.55, marginTop: 6 }}>{focus}</div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const principles = [
    {
      icon: <IconBenefit />,
      title: 'Public benefit first',
      desc: 'We optimize for outcomes residents can feel — fewer failures, faster response, dollars kept in service — not for engagement metrics or lock-in.',
    },
    {
      icon: <IconSovereignty />,
      title: 'Data sovereignty',
      desc: 'Your data stays yours. Multi-tenant isolation, configurable residency, and a clean export path. We are a tenant of your data, never its owner.',
    },
    {
      icon: <IconExplain />,
      title: 'Explainable AI (human approves)',
      desc: 'Every agent shows its sources and reasoning, and proposes — it never acts alone. A named person approves before anything moves in the real world.',
    },
    {
      icon: <IconProcurement />,
      title: 'Built for procurement',
      desc: 'Security posture, audit trails, role-based access and pricing designed to clear public-sector IT, legal and finance review — not to route around it.',
    },
    {
      icon: <IconAccessible />,
      title: 'Accessible by default',
      desc: 'WCAG 2.1 AA is a baseline, not an add-on. Keyboard-navigable, screen-reader-aware and high-contrast, because civic software serves everyone.',
    },
  ];

  const steps = [
    {
      n: '1',
      title: 'Connect your data',
      desc: 'Sensors, SCADA, asset registries, 311, GIS, permits and weather feeds flow into one unified digital twin — no rip-and-replace.',
    },
    {
      n: '2',
      title: 'Agents find risk',
      desc: 'Domain agents continuously watch for the failures, hazards and funding windows hidden across departments, and surface them early.',
    },
    {
      n: '3',
      title: 'Approve actions, money saved',
      desc: 'Each finding arrives with a recommended action and a dollar impact. Staff approve; CityPULSE routes the work and tracks the outcome.',
    },
  ];

  const founders = [
    { role: 'Founder & CEO', focus: 'Sets product direction and carries the relationship with the public officials we serve.' },
    { role: 'Head of Civic Partnerships', focus: 'Runs pilots, procurement and the day-to-day partnership with city and agency teams.' },
    { role: 'Lead ML Engineer', focus: 'Owns the forecasting and risk models, and the explainability layer behind every agent.' },
  ];

  const advisors = [
    { role: 'Public Works Advisor', focus: 'Three decades of capital planning and asset management in mid-size municipalities.' },
    { role: 'Emergency Management Advisor', focus: 'Former county EM director; grounds our hazard and pre-staging logic in real operations.' },
    { role: 'Grants & Funding Advisor', focus: 'Federal and state infrastructure funding; keeps the grant-matching honest and current.' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Archivo:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:"Archivo",-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased;}
        a{text-decoration:none;color:inherit;}
        @media(max-width:760px){
          .about-hero h1{font-size:clamp(30px,8vw,40px)!important;}
        }
      `}</style>

      {/* ━━━━━━━━━━━━━━ 1. HEADER ━━━━━━━━━━━━━━ */}
      <SiteHeader />

      <main id="main-content">

      {/* ━━━━━━━━━━━━━━ 2. HERO ━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPad, paddingTop: 80, paddingBottom: 72, background: PAPER }}>
        <div style={wrap}>
          <div className="about-hero" style={{ maxWidth: 880 }}>
            <div style={{ ...codeStyle, marginBottom: 18 }}>Our mission</div>
            <h1
              style={{
                fontFamily: serif,
                fontSize: 'clamp(34px, 5.5vw, 60px)',
                fontWeight: 600,
                color: INK,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                marginBottom: 26,
                maxWidth: '16ch',
              }}
            >
              We give cities a nervous system.
            </h1>
            <p
              style={{
                fontFamily: serif,
                fontSize: 18,
                lineHeight: 1.65,
                color: INK_SOFT,
                maxWidth: '60ch',
              }}
            >
              Our mission is to help public institutions sense and act on risk to their
              infrastructure before it becomes a crisis — turning the data cities already
              collect into early warnings, explainable decisions and funded projects that
              keep communities safe and solvent.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 3. THE THESIS ━━━━━━━━━━━━━━ */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: SURFACE_2, ...sectionPad }}>
        <div style={wrap}>
          <div
            className="two-col-13"
            style={{ gap: 56, alignItems: 'start' }}
          >
            <div>
              <div style={{ ...codeStyle, marginBottom: 14 }}>The thesis</div>
              <h2 style={{ ...h2Style, maxWidth: '14ch' }}>
                Civic infrastructure fails silently.
              </h2>
            </div>
            <div style={{ maxWidth: '64ch' }}>
              <p style={proseStyle}>
                A water main does not announce its failure. A corroding joint, a drainage
                culvert at capacity, a bridge dropping a point of condition each year — these
                degrade quietly, in separate systems owned by separate departments, until the
                day they rupture, flood or close. By then the only options left are expensive
                and reactive, and the public is already paying for them.
              </p>
              <p style={proseStyle}>
                The deeper problem is fragmentation. The signal that something is wrong almost
                always exists somewhere — in a SCADA feed, an inspection record, a cluster of
                311 complaints, a shift in the weather — but it sits trapped in a silo where no
                one is positioned to connect it to the asset at risk or the budget that could
                fix it. Cities do not lack data. They lack a shared operating picture and the
                capacity to act on it in time.
              </p>
              <p style={proseStyle}>
                An AI operating system changes the economics of that problem. When every feed
                flows into one digital twin, software can watch the whole territory at once,
                correlate weak signals across domains, and forecast where the next failure is
                most likely — months before it happens. The work shifts from reacting to
                ruptures to scheduling inspections; from emergency repairs to planned ones;
                from missed grant deadlines to funded capital projects.
              </p>
              <p style={proseStyle}>
                We are deliberate about what that does and does not mean. CityPULSE does not
                replace the judgment of public servants — it earns their trust by showing its
                sources and reasoning, and by proposing actions a named person must approve.
                The goal is not an autonomous city. It is a public institution that finally
                sees clearly and acts in time, with accountability intact at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 4. PRINCIPLES ━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPad, background: PAPER }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ ...codeStyle, marginBottom: 14 }}>What we stand for</div>
            <h2 style={{ ...h2Style, marginBottom: 14 }}>Principles we build against</h2>
            <p style={{ fontFamily: grotesk, fontSize: 15, color: INK_SOFT, maxWidth: '54ch', margin: '0 auto', lineHeight: 1.6 }}>
              Civic software carries public trust. These five commitments are not marketing —
              they are constraints we hold ourselves to in every release.
            </p>
          </div>
          <div className="grid-3" style={{ gap: 16 }}>
            {principles.map((p) => (
              <PrincipleCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 5. HOW IT WORKS ━━━━━━━━━━━━━━ */}
      <section style={{ background: DARK_BG, ...sectionPad }}>
        <div style={wrap}>
          <div style={{ marginBottom: 56, maxWidth: 720 }}>
            <div style={{ ...codeStyle, color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>How it works</div>
            <h2 style={{ ...h2Style, color: '#fff', maxWidth: '20ch' }}>
              Three steps from raw data to dollars saved.
            </h2>
          </div>
          <div className="grid-3" style={{ gap: 40 }}>
            {steps.map((s, i) => (
              <div
                key={s.n}
                style={{
                  paddingLeft: i > 0 ? 40 : 0,
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: serif,
                      fontSize: 20,
                      fontWeight: 700,
                      color: '#fff',
                    }}
                    aria-hidden="true"
                  >
                    {s.n}
                  </div>
                  <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '32ch' }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 6. TEAM ━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPad, background: PAPER }}>
        <div style={wrap}>
          <div style={{ marginBottom: 48, maxWidth: 720 }}>
            <div style={{ ...codeStyle, marginBottom: 14 }}>The team</div>
            <h2 style={{ ...h2Style, marginBottom: 14 }}>Builders and public-sector operators.</h2>
            <p style={{ fontFamily: grotesk, fontSize: 15, color: INK_SOFT, maxWidth: '58ch', lineHeight: 1.6 }}>
              CityPULSE pairs a small engineering team with advisors who have run the
              departments we serve. Roles are shown below; named team members are introduced
              directly during a pilot conversation.
            </p>
          </div>

          {/* Founders */}
          <div style={{ ...codeStyle, marginBottom: 16 }}>Core team</div>
          <div className="grid-3" style={{ gap: 16, marginBottom: 44 }}>
            {founders.map((f) => (
              <RoleCard key={f.role} role={f.role} focus={f.focus} />
            ))}
          </div>

          {/* Advisors */}
          <div style={{ ...codeStyle, marginBottom: 16 }}>Advisors</div>
          <div className="grid-3" style={{ gap: 16 }}>
            {advisors.map((a) => (
              <RoleCard key={a.role} role={a.role} focus={a.focus} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 7. CTA ━━━━━━━━━━━━━━ */}
      <section style={{ background: SURFACE_2, borderTop: `1px solid ${RULE}`, padding: '80px 0' }}>
        <div style={{ ...wrap, textAlign: 'center' }}>
          <div style={{ ...codeStyle, marginBottom: 18 }}>Work with us</div>
          <h2
            style={{
              ...h2Style,
              fontSize: 'clamp(28px, 5vw, 48px)',
              letterSpacing: '-0.025em',
              margin: '0 auto 18px',
              maxWidth: '20ch',
            }}
          >
            Give your city a nervous system.
          </h2>
          <p
            style={{
              fontFamily: grotesk,
              fontSize: 15,
              color: INK_SOFT,
              maxWidth: '48ch',
              margin: '0 auto 36px',
              lineHeight: 1.65,
            }}
          >
            Start with a focused pilot in one department, or a full-territory deployment.
            We will help you scope it and identify the grants that can fund it.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="/contact" style={btnPrimary}>
              Request a municipal pilot
            </a>
            <a href="/impact" style={btnGhost}>
              See the impact&nbsp;
              <ArrowRight color={INK} />
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
