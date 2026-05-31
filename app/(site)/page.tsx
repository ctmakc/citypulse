// CityPULSE public marketing home — SERVER component

import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';

const INK = '#2A3037';
const PAPER = '#F3F0E8';
const RULE = '#E8E3D8';
const INK_SOFT = '#5A626B';
const INK_FAINT = '#5F666E'; // WCAG AA: was #939AA1 (failed 4.5:1)
const SURFACE = '#FFFFFF';
const SURFACE_2 = '#FBF9F4';
const BLUE = '#2A6C92';
const BLUE_WASH = '#E8EFF4';
const GREEN = '#2C7A52';
const SLATE_WASH = '#ECE8DE';
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
  fontSize: 13,
  fontWeight: 600,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '12px 24px',
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

// ── SVGs ─────────────────────────────────────────────────────────────────────

function ArrowRight({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke={color} strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Module / card icons
function IconDashboard() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={BLUE} strokeWidth={1.8}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconMap() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={GREEN} strokeWidth={1.8}>
      <path d="M12 2 3 7l9 5 9-5z" /><path d="M3 12l9 5 9-5" /><path d="M3 17l9 5 9-5" />
    </svg>
  );
}
function IconAsset() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#BC7E15" strokeWidth={1.8}>
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
    </svg>
  );
}
function IconReport() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#B23A33" strokeWidth={1.8}>
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function IconAgent() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={BLUE} strokeWidth={1.8}>
      <circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    </svg>
  );
}
function IconEnv() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={GREEN} strokeWidth={1.8}>
      <path d="M12 3c1 4 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 1-3s2 1 3-6z" />
    </svg>
  );
}
function IconTraffic() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={BLUE} strokeWidth={1.8}>
      <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
      <rect x="8" y="2" width="8" height="20" rx="2" />
    </svg>
  );
}
function IconEmergency() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#B23A33" strokeWidth={1.8}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    </svg>
  );
}
function IconCapital() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#BC7E15" strokeWidth={1.8}>
      <path d="M12 2l2.5 5 5.5.8-4 3.9 1 5.5L12 20l-5 2.6 1-5.5-4-3.9 5.5-.8z" />
    </svg>
  );
}
function IconGrant() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke={GREEN} strokeWidth={1.8}>
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2M12 12v5M9.5 14.5h5" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke={INK} strokeWidth={1.8}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

// ── App window mockup ────────────────────────────────────────────────────────

function AppWindowMockup() {
  const winStyle: React.CSSProperties = {
    background: SURFACE,
    border: `1px solid ${RULE}`,
    borderRadius: 14,
    boxShadow: '0 18px 48px rgba(28,33,39,.18)',
    overflow: 'hidden',
    fontFamily: grotesk,
    width: '100%',
    maxWidth: 520,
  };
  const barStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 14px',
    background: '#F6F3EC',
    borderBottom: `1px solid ${RULE}`,
  };
  const dotStyle = (bg: string): React.CSSProperties => ({
    width: 11,
    height: 11,
    borderRadius: '50%',
    background: bg,
  });
  const urlStyle: React.CSSProperties = {
    flex: 1,
    background: SURFACE,
    border: `1px solid ${RULE}`,
    borderRadius: 6,
    padding: '3px 10px',
    fontSize: 11,
    color: INK_FAINT,
    fontFamily: mono,
    marginLeft: 8,
  };
  const bodyStyle: React.CSSProperties = {
    display: 'flex',
    height: 340,
  };
  const railStyle: React.CSSProperties = {
    width: 44,
    background: '#F6F3EC',
    borderRight: `1px solid ${RULE}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    padding: '14px 0',
  };
  const railDot = (active: boolean): React.CSSProperties => ({
    width: 28,
    height: 28,
    borderRadius: 8,
    background: active ? BLUE_WASH : 'transparent',
    border: active ? `1.5px solid ${BLUE}` : `1px solid ${RULE}`,
  });
  const contentStyle: React.CSSProperties = {
    flex: 1,
    padding: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    background: PAPER,
    overflowY: 'hidden',
  };
  const mapAreaStyle: React.CSSProperties = {
    flex: 1,
    background: 'linear-gradient(135deg, #D0E8F0 0%, #B8D9C8 40%, #C8D8B0 100%)',
    borderRadius: 8,
    border: `1px solid ${RULE}`,
    position: 'relative',
    overflow: 'hidden',
  };
  const chipStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    background: 'rgba(255,255,255,0.88)',
    border: `1px solid ${RULE}`,
    borderRadius: 6,
    padding: '3px 8px',
    fontSize: 10,
    fontFamily: grotesk,
    fontWeight: 600,
    color: INK,
    position: 'absolute',
  };
  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.92)',
    border: `1px solid ${RULE}`,
    borderRadius: 8,
    padding: '7px 10px',
    position: 'absolute',
    backdropFilter: 'blur(4px)',
  };
  const statRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 8,
  };
  const statCardStyle: React.CSSProperties = {
    background: SURFACE,
    border: `1px solid ${RULE}`,
    borderRadius: 8,
    padding: '8px 10px',
  };
  const pinStyle = (color: string): React.CSSProperties => ({
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: color,
    border: '2px solid #fff',
    boxShadow: '0 1px 4px rgba(0,0,0,.25)',
  });

  return (
    <div style={winStyle}>
      {/* Title bar */}
      <div style={barStyle}>
        <span style={dotStyle('#E0635F')} />
        <span style={dotStyle('#E8A33A')} />
        <span style={dotStyle('#6FB78C')} />
        <span style={urlStyle}>meridian.citypulse.gov / overview</span>
      </div>
      {/* Body */}
      <div style={bodyStyle}>
        {/* Sidebar rail */}
        <div style={railStyle}>
          {[true, false, false, false, false, false].map((active, i) => (
            <span key={i} style={railDot(active)} />
          ))}
        </div>
        {/* Main content */}
        <div style={contentStyle}>
          {/* Stat cards */}
          <div style={statRowStyle}>
            <div style={statCardStyle}>
              <div style={{ fontSize: 9, color: INK_FAINT, fontFamily: mono, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Risk Index</div>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: serif, color: '#8F5F0D', lineHeight: 1.2 }}>62</div>
              <div style={{ fontSize: 9, color: '#8F5F0D', fontWeight: 600 }}>Elevated</div>
            </div>
            <div style={statCardStyle}>
              <div style={{ fontSize: 9, color: INK_FAINT, fontFamily: mono, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Alerts</div>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: serif, color: '#B23A33', lineHeight: 1.2 }}>4</div>
              <div style={{ fontSize: 9, color: '#B23A33', fontWeight: 600 }}>Critical</div>
            </div>
            <div style={statCardStyle}>
              <div style={{ fontSize: 9, color: INK_FAINT, fontFamily: mono, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Assets OK</div>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: serif, color: GREEN, lineHeight: 1.2 }}>94%</div>
              <div style={{ fontSize: 9, color: GREEN, fontWeight: 600 }}>On track</div>
            </div>
          </div>
          {/* Map area */}
          <div style={mapAreaStyle}>
            {/* grid lines */}
            {[20, 40, 60, 80].map((pct) => (
              <div key={pct} style={{ position: 'absolute', left: `${pct}%`, top: 0, bottom: 0, borderLeft: '1px solid rgba(255,255,255,0.3)' }} />
            ))}
            {[30, 60].map((pct) => (
              <div key={pct} style={{ position: 'absolute', top: `${pct}%`, left: 0, right: 0, borderTop: '1px solid rgba(255,255,255,0.3)' }} />
            ))}
            {/* Chips */}
            <span style={{ ...chipStyle, top: 8, left: 8 }}>
              <svg viewBox="0 0 24 24" width={10} height={10} fill="none" stroke={BLUE} strokeWidth={2}><path d="M12 2 3 7l9 5 9-5z"/><path d="M3 12l9 5 9-5"/></svg>
              Digital Twin
            </span>
            <span style={{ ...chipStyle, top: 8, right: 8, color: GREEN }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />
              Live
            </span>
            {/* Pins */}
            <span style={{ ...pinStyle('#B23A33'), left: '26%', top: '55%' }} />
            <span style={{ ...pinStyle('#B23A33'), left: '74%', top: '22%' }} />
            <span style={{ ...pinStyle('#BC7E15'), left: '50%', top: '45%' }} />
            <span style={{ ...pinStyle(BLUE), left: '62%', top: '65%' }} />
            {/* Floating card */}
            <div style={{ ...cardStyle, right: 10, bottom: 10, width: 100 }}>
              <div style={{ fontSize: 9, color: INK_FAINT, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Wildfire Risk</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#B23A33', fontFamily: serif }}>High</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Module card ──────────────────────────────────────────────────────────────

function ModuleCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  const cardSt: React.CSSProperties = {
    background: SURFACE,
    border: `1px solid ${RULE}`,
    borderRadius: 12,
    boxShadow: '0 2px 10px rgba(42,48,55,.055), 0 1px 2px rgba(42,48,55,.04)',
    padding: '20px 22px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  };
  return (
    <div style={cardSt}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: PAPER, border: `1px solid ${RULE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 14, color: INK, marginBottom: 4, fontFamily: grotesk }}>{title}</div>
        <div style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.55 }}>{desc}</div>
      </div>
    </div>
  );
}

// ── Security row ─────────────────────────────────────────────────────────────

function SecurityCheck({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: `1px solid ${RULE}` }}>
      <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#E6F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg viewBox="0 0 16 16" width={12} height={12} fill="none" stroke={GREEN} strokeWidth={2}>
          <path d="M3 8l3 3 7-6" />
        </svg>
      </span>
      <span style={{ fontSize: 13.5, color: INK, fontFamily: grotesk }}>{text}</span>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const modules = [
    { icon: <IconDashboard />, title: 'Executive Dashboard', desc: 'Real-time KPIs, alerts, risk scores and AI-prioritized actions in one view.' },
    { icon: <IconMap />, title: 'Digital Twin', desc: 'Interactive map of your entire territory with historical replay and 72h forecast.' },
    { icon: <IconAsset />, title: 'Asset Management', desc: 'Condition scoring, failure prediction and maintenance planning for every asset.' },
    { icon: <IconReport />, title: 'Citizen Reports', desc: 'AI-powered 311 intake with duplicate detection, routing and SLA tracking.' },
    { icon: <IconAgent />, title: 'AI Agents', desc: 'Specialized domain agents that explain findings and propose actions.' },
    { icon: <IconEnv />, title: 'Environmental Intelligence', desc: 'Air quality, water quality, heat islands, wildfire and flood risk.' },
    { icon: <IconTraffic />, title: 'Traffic Intelligence', desc: 'Congestion, transit delays, accidents and parking in real time.' },
    { icon: <IconEmergency />, title: 'Emergency Management', desc: 'Command center for wildfire, flood, storm and infrastructure emergencies.' },
    { icon: <IconCapital />, title: 'Capital Planning', desc: 'Risk-to-project pipeline with grant matching and application generation.' },
    { icon: <IconGrant />, title: 'Grants Management', desc: 'AI identifies funding programs and generates grant narratives and budgets.' },
  ];

  const securityCols = [
    ['SOC 2 Type II ready', 'End-to-end encryption', 'SSO & MFA'],
    ['Multi-tenant isolation', 'RBAC with 13 roles', 'Audit trail on every action'],
    ['GDPR compliant', 'Data residency options', '99.9% uptime SLA'],
  ];

  const customerTypes = [
    'City & regional governments',
    'Public works',
    'Emergency management',
    'Environment agencies',
    'Utilities',
    'Transportation',
    'Indigenous communities',
    'Infrastructure operators',
  ];

  const metrics = [
    { num: '$4.2M', label: 'Estimated avoided cost per year for Meridian' },
    { num: '82%', label: 'Infrastructure failure probability detected before failure' },
    { num: '9 min', label: 'Average early warning lead time for critical events' },
    { num: '47', label: '311 reports auto-routed without staff intervention' },
  ];

  return (
    <>
      {/* ── Google Fonts ── */}
      {/* Loaded via Next.js layout or globals — inline style tag for fallback */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Archivo:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:"Archivo",-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased;}
        a{text-decoration:none;color:inherit;}
        /* Section grids (.hero-grid/.grid-3/.grid-4) collapse via global utilities.
           Mobile-only tweaks that aren't grid utilities live here. */
        @media(max-width:760px){
          .hero-mockup{display:none!important;}
          .hero-copy h1{font-size:clamp(28px,8vw,34px)!important;}
        }
      `}</style>

      {/* ━━━━━━━━━━━━━━ 1. HEADER ━━━━━━━━━━━━━━ */}
      <SiteHeader />

      <main id="main-content">{/* ── semantic landmark for promo content ── */}

      {/* ━━━━━━━━━━━━━━ 2. HERO ━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPad, paddingTop: 72, paddingBottom: 80, background: PAPER }}>
        <div style={{ ...wrap }}>
          <div
            className="hero-grid"
            style={{ alignItems: 'center', gap: 60 }}
          >
            {/* Left copy */}
            <div className="hero-copy" style={{ flex: '1 1 480px', minWidth: 0 }}>
              <div style={{ ...codeStyle, marginBottom: 18 }}>Civic Infrastructure Intelligence</div>
              <h1 style={{
                fontFamily: serif,
                fontSize: 'clamp(32px, 5vw, 54px)',
                fontWeight: 600,
                color: INK,
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                marginBottom: 22,
                maxWidth: '18ch',
              }}>
                An AI-powered operating system for resilient cities.
              </h1>
              <p style={{
                fontFamily: serif,
                fontSize: 16,
                lineHeight: 1.65,
                color: INK_SOFT,
                marginBottom: 36,
                maxWidth: '52ch',
              }}>
                Monitor roads, water, traffic, air quality, wildfire, flood and citizen reports in one operational system — and turn real-time risks into prioritized maintenance, emergency response and grant-ready capital projects.
              </p>
              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 44 }}>
                <a href="/contact" style={btnPrimary}>Request a municipal pilot</a>
                <a href="/demo" style={btnGhost}>
                  View demo dashboard&nbsp;
                  <ArrowRight color={INK} />
                </a>
              </div>
              {/* Hero metrics */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, borderTop: `1px solid ${RULE}`, paddingTop: 28 }}>
                {[
                  { val: '9', label: 'departments, one picture' },
                  { val: '2,140', label: 'sensor nodes unified' },
                  { val: '$4.2M', label: 'avoided cost / year' },
                ].map((m, i) => (
                  <div key={i} style={{
                    paddingRight: 32,
                    paddingLeft: i > 0 ? 32 : 0,
                    borderLeft: i > 0 ? `1px solid ${RULE}` : 'none',
                    minWidth: 0,
                  }}>
                    <div style={{ fontFamily: serif, fontSize: 30, fontWeight: 700, color: INK, letterSpacing: '-0.03em', lineHeight: 1 }}>{m.val}</div>
                    <div style={{ fontFamily: mono, fontSize: 10, color: INK_FAINT, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 5 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: app window mockup */}
            <div className="hero-mockup" style={{ flex: '1 1 440px', minWidth: 0, display: 'flex', justifyContent: 'flex-end' }}>
              <AppWindowMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 3. BUILT FOR ━━━━━━━━━━━━━━ */}
      <div style={{ borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}`, background: SURFACE_2, padding: '22px 0' }}>
        <div style={{ ...wrap, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ ...codeStyle, flexShrink: 0 }}>Built for</span>
          <div style={{ width: 1, height: 16, background: RULE }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {customerTypes.map((t) => (
              <span key={t} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: grotesk,
                fontSize: 12,
                fontWeight: 600,
                color: INK_SOFT,
                background: SURFACE,
                border: `1px solid ${RULE}`,
                borderRadius: 100,
                padding: '5px 13px',
                letterSpacing: '0.01em',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━ 4. PRODUCT MODULES ━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPad, background: PAPER }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ ...codeStyle, marginBottom: 14 }}>The Platform</div>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 600, color: INK, letterSpacing: '-0.02em', marginBottom: 14 }}>
              The complete operating picture
            </h2>
            <p style={{ fontFamily: grotesk, fontSize: 15, color: INK_SOFT, maxWidth: '52ch', margin: '0 auto', lineHeight: 1.6 }}>
              Ten integrated modules — no integration tax, no switching between systems.
            </p>
          </div>
          <div
            className="grid-3"
            style={{ gap: 16 }}
          >
            {modules.map((m) => (
              <ModuleCard key={m.title} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 5. IMPACT METRICS (dark) ━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPad, background: DARK_BG }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ ...codeStyle, color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>Example impact</div>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>
              Measurable outcomes for a mid-size city.
            </h2>
          </div>
          <div
            className="grid-4"
            style={{ gap: 2 }}
          >
            {metrics.map((m, i) => (
              <div key={i} style={{
                padding: '40px 32px',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{ fontFamily: serif, fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 16 }}>
                  {m.num}
                </div>
                <div style={{ fontFamily: grotesk, fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, maxWidth: '18ch', margin: '0 auto' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 6. SECURITY ━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPad, background: PAPER }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ ...codeStyle, marginBottom: 14 }}>Government-ready</div>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 600, color: INK, letterSpacing: '-0.02em', marginBottom: 14 }}>
              Government-grade security by design
            </h2>
            <p style={{ fontFamily: grotesk, fontSize: 15, color: INK_SOFT, maxWidth: '52ch', margin: '0 auto', lineHeight: 1.6 }}>
              Built for the security, transparency and procurement requirements of public-sector IT, legal and grant evaluators.
            </p>
          </div>
          <div
            className="grid-3"
            style={{ gap: 24 }}
          >
            {securityCols.map((col, ci) => (
              <div key={ci} style={{
                background: SURFACE,
                border: `1px solid ${RULE}`,
                borderRadius: 12,
                padding: '24px 26px',
                boxShadow: '0 2px 10px rgba(42,48,55,.055)',
              }}>
                {col.map((item) => (
                  <SecurityCheck key={item} text={item} />
                ))}
              </div>
            ))}
          </div>

          {/* Compliance badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 36, justifyContent: 'center' }}>
            {['SOC 2 Type II', 'CJIS-aligned', 'GDPR compliant', 'US data residency', 'Full audit log', 'WCAG 2.1 AA'].map((b) => (
              <span key={b} style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                fontFamily: grotesk, fontSize: 12, fontWeight: 600, color: INK_SOFT,
                background: SURFACE, border: `1px solid ${RULE}`, borderRadius: 100,
                padding: '6px 14px',
              }}>
                <IconShield />
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ 7. CTA FOOTER SECTION ━━━━━━━━━━━━━━ */}
      <section style={{ background: SURFACE_2, borderTop: `1px solid ${RULE}`, padding: '80px 0' }}>
        <div style={{ ...wrap, textAlign: 'center' }}>
          <div style={{ ...codeStyle, marginBottom: 18 }}>Get started</div>
          <h2 style={{
            fontFamily: serif,
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 600,
            color: INK,
            letterSpacing: '-0.025em',
            marginBottom: 18,
            maxWidth: '20ch',
            margin: '0 auto 18px',
          }}>
            Ready to give your city a nervous system?
          </h2>
          <p style={{
            fontFamily: grotesk,
            fontSize: 15,
            color: INK_SOFT,
            maxWidth: '48ch',
            margin: '0 auto 36px',
            lineHeight: 1.65,
          }}>
            Start with a focused pilot in one department, or a full-territory deployment. We'll help you scope it and identify the grants that can fund it.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href="/contact" style={{ ...btnPrimary, padding: '13px 28px', fontSize: 14 }}>Request a municipal pilot</a>
            <a href="/demo" style={{ ...btnGhost, padding: '13px 28px', fontSize: 14 }}>View demo dashboard</a>
          </div>
        </div>
      </section>

      </main>

      {/* ━━━━━━━━━━━━━━ 8. FOOTER ━━━━━━━━━━━━━━ */}
      <SiteFooter />
    </>
  );
}
