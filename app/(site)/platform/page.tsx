import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'

export default function PlatformPage() {
  return (
    <>
      {/* ===== STICKY HEADER ===== */}
      <SiteHeader />

      {/* ===== HERO ===== */}
      <section style={{
        background: 'var(--paper)',
        padding: '80px 24px 72px',
        borderBottom: '1px solid var(--rule)',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <span style={{
            display: 'inline-block',
            fontSize: 10.5, letterSpacing: '0.13em', textTransform: 'uppercase',
            fontWeight: 700, color: 'var(--blue)',
            background: 'var(--blue-wash)',
            padding: '4px 12px', borderRadius: 'var(--r-pill)',
            marginBottom: 22,
          }}>Platform</span>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(34px, 5vw, 52px)',
            fontWeight: 700,
            color: 'var(--ink)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: '0 0 22px',
          }}>
            Built on a digital twin, built for decision-makers.
          </h1>
          <p style={{
            fontFamily: 'var(--serif)',
            fontSize: 18,
            lineHeight: 1.65,
            color: 'var(--ink-soft)',
            margin: 0,
            maxWidth: 680,
          }}>
            CityPulse is not a BI tool or a GIS viewer. It is an operational system that combines sensor data, AI reasoning, and institutional workflows into one environment — so that problems get found before they cost money.
          </p>
        </div>
      </section>

      {/* ===== DIGITAL TWIN SECTION ===== */}
      <section style={{ background: 'var(--surface)', padding: '80px 24px', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--blue-wash)', display: 'grid', placeItems: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
              </svg>
            </span>
            <span style={{ fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--blue)' }}>Digital Twin</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(26px, 3.5vw, 38px)',
            fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em',
            margin: '0 0 16px',
          }}>The Territorial Digital Twin</h2>
          <p style={{
            fontFamily: 'var(--serif)', fontSize: 17, lineHeight: 1.65,
            color: 'var(--ink-soft)', maxWidth: 620, margin: '0 0 52px',
          }}>
            Full interactive map of your territory. Every road, bridge, pipe, sensor, incident and risk — layered, filterable and time-navigable.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            {/* Feature list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: '🗂', label: 'Asset layers', desc: 'Roads, bridges, pipes, signals, parks, and public facilities — all georeferenced with condition scores.' },
                { icon: '🌿', label: 'Environmental layers', desc: 'Air quality sensors, flood gauges, wildfire weather indices and vegetation health overlays.' },
                { icon: '🚦', label: 'Mobility layers', desc: 'Real-time traffic flow, transit occupancy, pedestrian counts and corridor congestion ranking.' },
                { icon: '⚠️', label: 'Hazard layers', desc: 'Active incident markers, predictive risk zones, evacuation routes and flood-inundation extents.' },
                { icon: '⏱', label: 'Timeline (−72h history to +72h forecast)', desc: 'Scrub backward through historical sensor readings or forward into AI-generated conditions.' },
                { icon: '🔥', label: 'Risk heatmaps', desc: 'Composite scoring overlays that surface the highest-priority areas before problems escalate.' },
              ].map((f) => (
                <div key={f.label} style={{ display: 'flex', gap: 14 }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: 'var(--r-sm)',
                    background: 'var(--blue-wash)',
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                    fontSize: 17,
                  }}>{f.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--ink)', marginBottom: 3 }}>{f.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mock map visual */}
            <div style={{
              borderRadius: 'var(--r-xl)', overflow: 'hidden',
              border: '1px solid var(--rule)', boxShadow: 'var(--sh-3)',
              background: '#2D3F4C',
              position: 'relative', aspectRatio: '4/3',
            }}>
              {/* Map grid lines */}
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.12 }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="#fff" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`v${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="#fff" strokeWidth="0.5" />
                ))}
              </svg>
              {/* Road network */}
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
                <polyline points="0,180 120,160 240,170 360,145 480,155 600,130" stroke="#8BA8BE" strokeWidth="3" fill="none" />
                <polyline points="80,0 100,80 120,160 140,240 160,320" stroke="#8BA8BE" strokeWidth="2" fill="none" />
                <polyline points="0,260 200,250 350,230 480,240 600,220" stroke="#8BA8BE" strokeWidth="2" fill="none" />
                <polyline points="300,0 310,100 330,200 350,300" stroke="#8BA8BE" strokeWidth="2" fill="none" />
                <polyline points="440,0 450,120 460,220 470,320" stroke="#8BA8BE" strokeWidth="1.5" fill="none" />
              </svg>
              {/* Risk heatmap blob */}
              <div style={{
                position: 'absolute', left: '22%', top: '52%',
                width: 100, height: 80,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(178,58,51,0.55) 0%, transparent 70%)',
                transform: 'translate(-50%,-50%)',
              }} />
              <div style={{
                position: 'absolute', left: '68%', top: '28%',
                width: 70, height: 60,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(188,126,21,0.45) 0%, transparent 70%)',
                transform: 'translate(-50%,-50%)',
              }} />
              {/* Incident pin — red */}
              <div style={{
                position: 'absolute', left: '23%', top: '60%',
                transform: 'translate(-50%,-50%)',
              }}>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: 'var(--red)', border: '2px solid #fff',
                  boxShadow: '0 0 0 4px rgba(178,58,51,0.28)',
                }} />
              </div>
              {/* Asset pin — amber */}
              <div style={{
                position: 'absolute', left: '68%', top: '25%',
                transform: 'translate(-50%,-50%)',
              }}>
                <div style={{
                  width: 12, height: 12, borderRadius: '50%',
                  background: 'var(--amber)', border: '2px solid #fff',
                  boxShadow: '0 0 0 3px rgba(188,126,21,0.28)',
                }} />
              </div>
              {/* Layer chip */}
              <div style={{
                position: 'absolute', top: 14, left: 14,
                background: 'rgba(0,0,0,0.54)', color: '#fff',
                borderRadius: 'var(--r-pill)', padding: '5px 12px',
                fontSize: 11.5, fontWeight: 600, backdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                Layers · Live
              </div>
              {/* Timeline scrubber */}
              <div style={{
                position: 'absolute', bottom: 14, left: 14, right: 14,
                background: 'rgba(0,0,0,0.54)', borderRadius: 'var(--r-sm)',
                padding: '8px 12px', backdropFilter: 'blur(6px)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--mono)' }}>−72h</span>
                  <span style={{ fontSize: 10, color: '#fff', fontFamily: 'var(--mono)', fontWeight: 700 }}>NOW</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--mono)' }}>+72h</span>
                </div>
                <div style={{ position: 'relative', height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
                  <div style={{ position: 'absolute', left: 0, width: '50%', height: '100%', background: 'var(--blue)', borderRadius: 2 }} />
                  <div style={{
                    position: 'absolute', left: '50%', top: '50%',
                    width: 10, height: 10, background: '#fff', borderRadius: '50%',
                    transform: 'translate(-50%,-50%)',
                    boxShadow: '0 0 0 2px var(--blue)',
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AI ARCHITECTURE SECTION ===== */}
      <section style={{ background: 'var(--paper)', padding: '80px 24px', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'rgba(44,122,82,0.12)', display: 'grid', placeItems: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1v1a2 2 0 0 1-2 2h-1v1a1 1 0 0 1-2 0v-1H8v1a1 1 0 0 1-2 0v-1H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
              </svg>
            </span>
            <span style={{ fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--green)' }}>AI Architecture</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(26px, 3.5vw, 38px)',
            fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em',
            margin: '0 0 14px',
          }}>Nine specialized AI agents, one supervisor</h2>
          <p style={{
            fontFamily: 'var(--serif)', fontSize: 17, lineHeight: 1.65,
            color: 'var(--ink-soft)', maxWidth: 620, margin: '0 0 52px',
          }}>
            Only the supervisor talks to the UI. Each agent monitors its domain continuously, explains its findings, and proposes actions that a human approves.
          </p>

          {/* Architecture diagram */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--rule)',
            borderRadius: 'var(--r-xl)', padding: '40px 32px',
            boxShadow: 'var(--sh-2)',
          }}>
            {/* Supervisor */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
              <div style={{
                background: 'var(--ink)', color: '#fff',
                borderRadius: 'var(--r)', padding: '14px 28px',
                textAlign: 'center', minWidth: 220,
                boxShadow: 'var(--sh-3)',
              }}>
                <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginBottom: 4 }}>Coordinator</div>
                <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em' }}>Supervisor Agent</div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Talks to UI · Prioritizes · Escalates</div>
              </div>
            </div>

            {/* Connector lines (CSS) */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              <div style={{ width: '80%', height: 24, position: 'relative' }}>
                {/* Vertical from supervisor */}
                <div style={{
                  position: 'absolute', left: '50%', top: 0,
                  width: 2, height: 24, background: 'var(--rule)',
                  transform: 'translateX(-50%)',
                }} />
                {/* Horizontal rail */}
                <div style={{
                  position: 'absolute', left: '5%', right: '5%', top: '100%',
                  height: 2, background: 'var(--rule)',
                }} />
              </div>
            </div>

            {/* Agents grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(9, 1fr)',
              gap: 8,
            }}>
              {[
                { label: 'Road', icon: '🛣', color: 'var(--slate)', wash: 'var(--slate-wash)' },
                { label: 'Water', icon: '💧', color: 'var(--blue)', wash: 'var(--blue-wash)' },
                { label: 'Fire', icon: '🔥', color: 'var(--red)', wash: 'var(--red-wash)' },
                { label: 'Traffic', icon: '🚦', color: 'var(--amber)', wash: 'var(--amber-wash)' },
                { label: 'Air', icon: '🌬', color: 'var(--green)', wash: 'var(--green-wash)' },
                { label: 'Flood', icon: '🌊', color: 'var(--blue)', wash: 'var(--blue-wash)' },
                { label: 'Emergency', icon: '🚨', color: 'var(--red)', wash: 'var(--red-wash)' },
                { label: 'Grants', icon: '📋', color: 'var(--green)', wash: 'var(--green-wash)' },
                { label: 'Citizen', icon: '👥', color: 'var(--slate)', wash: 'var(--slate-wash)' },
              ].map((agent) => (
                <div key={agent.label} style={{
                  background: agent.wash,
                  border: `1px solid ${agent.color}22`,
                  borderRadius: 'var(--r-sm)',
                  padding: '12px 6px',
                  textAlign: 'center',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                }}>
                  <span style={{ fontSize: 20 }}>{agent.icon}</span>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: agent.color, letterSpacing: '0.02em' }}>{agent.label}</span>
                </div>
              ))}
            </div>

            <p style={{
              textAlign: 'center', marginTop: 28, marginBottom: 0,
              fontSize: 13, color: 'var(--ink-faint)', fontFamily: 'var(--mono)',
              letterSpacing: '0.02em',
            }}>
              Each agent operates independently · Supervisor synthesizes · Human approves before any action is taken
            </p>
          </div>
        </div>
      </section>

      {/* ===== DATA PIPELINE SECTION ===== */}
      <section style={{ background: 'var(--surface-2)', padding: '80px 24px', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--amber-wash)', display: 'grid', placeItems: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </span>
            <span style={{ fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--amber)' }}>Data Pipeline</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(26px, 3.5vw, 38px)',
            fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em',
            margin: '0 0 14px',
          }}>Designed for real institutional data</h2>
          <p style={{
            fontFamily: 'var(--serif)', fontSize: 17, lineHeight: 1.65,
            color: 'var(--ink-soft)', maxWidth: 620, margin: '0 0 52px',
          }}>
            From raw sensor telemetry to actionable work orders — every step is auditable, versioned and explainable.
          </p>

          {/* Pipeline steps */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 0,
            background: 'var(--surface)', border: '1px solid var(--rule)',
            borderRadius: 'var(--r-xl)', overflow: 'hidden',
            boxShadow: 'var(--sh-2)',
          }}>
            {[
              { step: '01', label: 'Sensors & GIS', icon: '📡', desc: 'SCADA, IoT, satellite, 311, weather feeds', color: 'var(--blue)' },
              { step: '02', label: 'Normalize & deduplicate', icon: '🔄', desc: 'Schema mapping, deduplication, time-series alignment', color: 'var(--slate)' },
              { step: '03', label: 'Agent analysis', icon: '🤖', desc: 'Nine domain agents run inference on clean data', color: 'var(--green)' },
              { step: '04', label: 'Risk scoring', icon: '🎯', desc: 'Composite risk index per asset and zone', color: 'var(--amber)' },
              { step: '05', label: 'Actions & work orders', icon: '✅', desc: 'Human-approved recommendations create real work orders', color: 'var(--red)' },
              { step: '06', label: 'Reports', icon: '📊', desc: 'Regulatory, executive, grant-ready and council briefs', color: 'var(--ink)' },
            ].map((s, i) => (
              <div key={s.step} style={{
                padding: '28px 20px',
                borderRight: i < 5 ? '1px solid var(--rule)' : 'none',
                position: 'relative',
              }}>
                {/* Arrow connector */}
                {i < 5 && (
                  <div style={{
                    position: 'absolute', right: -12, top: '50%',
                    transform: 'translateY(-50%)',
                    width: 24, height: 24,
                    background: 'var(--surface-3)',
                    border: '1px solid var(--rule)',
                    borderRadius: '50%',
                    display: 'grid', placeItems: 'center',
                    zIndex: 1, fontSize: 10,
                  }}>→</div>
                )}
                <div style={{ fontSize: 9, fontFamily: 'var(--mono)', fontWeight: 700, color: s.color, letterSpacing: '0.1em', marginBottom: 10 }}>{s.step}</div>
                <div style={{ fontSize: 20, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.3 }}>{s.label}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MODULE DEEP-DIVE ===== */}
      <section style={{ background: 'var(--surface)', padding: '80px 24px', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 56px' }}>
            <span style={{
              display: 'inline-block',
              fontSize: 10.5, letterSpacing: '0.13em', textTransform: 'uppercase',
              fontWeight: 700, color: 'var(--blue)',
              background: 'var(--blue-wash)',
              padding: '4px 12px', borderRadius: 'var(--r-pill)',
              marginBottom: 18,
            }}>Core Modules</span>
            <h2 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(26px, 3.5vw, 38px)',
              fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em',
              margin: '0 0 14px',
            }}>Every department, one system</h2>
            <p style={{
              fontFamily: 'var(--serif)', fontSize: 16, lineHeight: 1.65,
              color: 'var(--ink-soft)', margin: 0,
            }}>
              Specialized modules for each function — connected by a shared asset graph and a unified approval workflow.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              {
                icon: '🏗',
                color: 'var(--blue)',
                wash: 'var(--blue-wash)',
                title: 'Asset Management',
                desc: 'Condition-scored inventory across every infrastructure class. Maintenance history, sensor readings, and AI-predicted failure windows — in one place.',
                bullets: [
                  'Unified asset registry across all infrastructure classes',
                  'Condition scoring from sensor telemetry and inspection records',
                  'Predictive maintenance windows with confidence ranges',
                  'Linked directly to capital project and grants pipeline',
                ],
              },
              {
                icon: '📱',
                color: 'var(--green)',
                wash: 'var(--green-wash)',
                title: 'Citizen Reports (311)',
                desc: 'Photo-based issue intake with AI classification, duplicate detection and automatic routing to the responsible department — with SLA tracking on every ticket.',
                bullets: [
                  'Photo classification: pothole, graffiti, flooding, hazard, and 30+ types',
                  'Duplicate detection against open work orders',
                  'Automatic severity scoring and department routing',
                  'Public-facing status tracking and SLA enforcement',
                ],
              },
              {
                icon: '💰',
                color: 'var(--amber)',
                wash: 'var(--amber-wash)',
                title: 'Capital Planning',
                desc: 'Risk-detected problems become shovel-ready capital projects with cost estimates, funding eligibility analysis, and AI-drafted grant narratives — ranked by fundability.',
                bullets: [
                  'Ranked project list from AI risk detection',
                  'Automatic eligibility matching against federal and state programs',
                  'Budget breakdown with cost-share and local funding split',
                  'One-click export of funder-ready application packages',
                ],
              },
              {
                icon: '🚨',
                color: 'var(--red)',
                wash: 'var(--red-wash)',
                title: 'Emergency Management',
                desc: 'Coordinated incident command: real-time resource tracking, automated alerting, evacuation routing and post-incident reporting — all tied to the live digital twin.',
                bullets: [
                  'Live incident board with resource assignments and status',
                  'AI-drafted situation reports and public notifications',
                  'Evacuation route optimization with shelter capacity',
                  'After-action reporting with root-cause chain tracing',
                ],
              },
            ].map((mod, i) => (
              <div key={mod.title} style={{
                display: 'grid', gridTemplateColumns: '1fr 2fr',
                gap: 40, padding: '40px 36px',
                background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)',
                border: '1px solid var(--rule)',
                borderRadius: 'var(--r-xl)',
                alignItems: 'start',
              }}>
                {/* Left: icon + title */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 'var(--r)',
                    background: mod.wash, display: 'grid', placeItems: 'center',
                    fontSize: 26,
                    border: `1px solid ${mod.color}22`,
                  }}>{mod.icon}</div>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 22, fontWeight: 700, color: 'var(--ink)',
                      margin: '0 0 10px', letterSpacing: '-0.01em',
                    }}>{mod.title}</h3>
                    <p style={{
                      fontFamily: 'var(--serif)', fontSize: 14.5, lineHeight: 1.6,
                      color: 'var(--ink-soft)', margin: 0,
                    }}>{mod.desc}</p>
                  </div>
                </div>

                {/* Right: bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>
                  {mod.bullets.map((b) => (
                    <div key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: mod.wash, display: 'grid', placeItems: 'center',
                        flexShrink: 0, marginTop: 1,
                      }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={mod.color} strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span style={{ fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.55 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section style={{ background: 'var(--paper)', padding: '80px 24px 72px', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            fontSize: 10.5, letterSpacing: '0.13em', textTransform: 'uppercase',
            fontWeight: 700, color: 'var(--green)',
            background: 'var(--green-wash)',
            padding: '4px 12px', borderRadius: 'var(--r-pill)',
            marginBottom: 22,
          }}>Get started</span>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em',
            margin: '0 0 18px', lineHeight: 1.2,
          }}>See it on your city&apos;s data.</h2>
          <p style={{
            fontFamily: 'var(--serif)', fontSize: 17, lineHeight: 1.65,
            color: 'var(--ink-soft)', margin: '0 0 36px',
          }}>
            We&apos;ll stand up a demo with a sample of your GIS and sensor feeds in weeks, not months.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 'var(--r-pill)',
              background: 'var(--green)', color: '#fff',
              fontWeight: 700, fontSize: 14, textDecoration: 'none',
              boxShadow: 'var(--sh-2)',
            }}>Request a municipal pilot →</a>
            <a href="/solutions" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 'var(--r-pill)',
              background: 'var(--surface)', color: 'var(--ink)',
              border: '1px solid var(--rule)',
              fontWeight: 600, fontSize: 14, textDecoration: 'none',
              boxShadow: 'var(--sh-1)',
            }}>See use cases</a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <SiteFooter />
    </>
  );
}
