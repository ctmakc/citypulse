import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'

/* ============================================================================
   CityPULSE — Insights article template
   A small in-file ARTICLES map drives 3 statically-generated articles. Each
   article is authored as structured "blocks" (heading / paragraph / list /
   callout) so the body reads as real prose while staying type-safe JSX.
   ============================================================================ */

type Block =
  | { kind: 'p'; text: React.ReactNode }
  | { kind: 'h2'; id: string; text: string }
  | { kind: 'ul'; items: React.ReactNode[] }
  | { kind: 'ol'; items: React.ReactNode[] }
  | { kind: 'callout'; title: string; text: React.ReactNode }

type Faq = { q: string; a: React.ReactNode }

type Article = {
  slug: string
  title: string
  dek: string
  topic: string
  readMins: number
  accent: { color: string; wash: string }
  metaDescription: string
  blocks: Block[]
  faqs: Faq[]
}

const ARTICLES: Record<string, Article> = {
  /* ───────────────────────── 1. WATER MAIN FAILURE ───────────────────────── */
  'how-ai-predicts-water-main-failure': {
    slug: 'how-ai-predicts-water-main-failure',
    title: 'How AI predicts water-main failure before it happens',
    dek: 'Buried pipe is invisible until it fails. Soil corrosivity, acoustic sensing and failure-probability models turn it into a forecastable asset — so crews can fix the riskiest segments before they break.',
    topic: 'Predictive maintenance',
    readMins: 7,
    accent: { color: 'var(--blue)', wash: 'var(--blue-wash)' },
    metaDescription:
      'How AI predicts water-main failure using soil corrosivity, acoustic leak sensors and failure-probability models — and how cities act on the forecast.',
    blocks: [
      {
        kind: 'p',
        text: (
          <>
            A water main does not usually fail without warning. It fails after years of slow
            corrosion, ground movement, pressure cycling and temperature swings — a long story
            written underground where no one can see it. The promise of AI for water utilities is not
            magic; it is the ability to read that story from the data a city already has, and to rank
            every pipe segment by how likely it is to break in the next year.
          </>
        ),
      },
      { kind: 'h2', id: 'why-pipes-fail', text: 'Why pipes fail — and why it is predictable' },
      {
        kind: 'p',
        text: (
          <>
            Most main breaks come from a handful of compounding factors. Old cast iron and asbestos-
            cement pipe corrodes; the metal loses wall thickness until normal pressure cracks it. The
            soil around the pipe matters as much as the pipe itself: wet, low-resistivity, chloride-
            rich or acidic soils are far more corrosive. Add freeze-thaw cycles, heavy traffic
            loading, and pressure transients (&ldquo;water hammer&rdquo;), and certain segments
            become statistically far more likely to fail than their neighbors.
          </>
        ),
      },
      {
        kind: 'p',
        text: (
          <>
            Because these drivers are measurable, failure is a prediction problem rather than a
            mystery. The job is to combine what we know about each pipe with what we know about its
            environment and its history, and to express the result as a probability a planner can act
            on.
          </>
        ),
      },
      { kind: 'h2', id: 'corrosivity', text: 'Soil corrosivity: the map under the map' },
      {
        kind: 'p',
        text: (
          <>
            Two identical pipes installed the same year can have wildly different fates depending on
            what surrounds them. A soil-corrosivity model scores the ground along each pipe using
            inputs such as soil resistivity, moisture, pH, chloride and sulfate content, and known
            soil series from geological surveys. Overlay that corrosivity surface on the pipe network
            and patterns jump out: a corridor crossing a former wetland, or a stretch in chloride-
            laden soil near a coast or a road that is heavily salted in winter, lights up as
            high-risk long before any leak appears.
          </>
        ),
      },
      {
        kind: 'callout',
        title: 'The data you probably already have',
        text: (
          <>
            Pipe material, diameter, install year, prior break history, soil maps, pressure-zone
            boundaries and work orders are usually sitting in a GIS, a CMMS and a SCADA historian.
            A predictive model&rsquo;s first job is simply to unify them so the pipe and its
            environment can be reasoned about together.
          </>
        ),
      },
      { kind: 'h2', id: 'acoustic', text: 'Acoustic sensors: hearing a leak before you see it' },
      {
        kind: 'p',
        text: (
          <>
            A pressurized pipe that develops a small leak makes noise — a faint, characteristic hiss
            that travels along the pipe wall and the water column. Acoustic sensors and correlating
            loggers placed on hydrants and valves listen for that signature continuously. By
            comparing the sound arriving at two sensors and the speed it travels, the system can
            localize a leak to within a few feet, often weeks or months before it surfaces as a
            visible break or a spike in non-revenue water.
          </>
        ),
      },
      {
        kind: 'p',
        text: (
          <>
            Acoustic data is powerful on its own, but it is most valuable as a feature in a larger
            model. A segment that is acoustically &ldquo;loud,&rdquo; sits in corrosive soil, and has
            broken twice before is not a maybe — it is a work order waiting to be written.
          </>
        ),
      },
      { kind: 'h2', id: 'models', text: 'Failure-probability models' },
      {
        kind: 'p',
        text: (
          <>
            The modeling layer turns all of this into a single, comparable number: the probability
            that a given segment will fail within a defined horizon. Common approaches include:
          </>
        ),
      },
      {
        kind: 'ul',
        items: [
          <>
            <strong>Survival / hazard models</strong>, which estimate time-to-failure from age and
            condition and handle pipes that have not failed yet (censored data) correctly.
          </>,
          <>
            <strong>Gradient-boosted trees</strong> and similar machine-learning models, which learn
            non-linear interactions between material, soil, pressure and break history.
          </>,
          <>
            <strong>Ensembles</strong> that blend the above and are calibrated so a &ldquo;15%
            chance&rdquo; really means roughly fifteen in a hundred — essential if the score is going
            to drive budget.
          </>,
        ],
      },
      {
        kind: 'p',
        text: (
          <>
            Good models are validated the boring, trustworthy way: train on history up to a cutoff
            date, then check how well the predicted high-risk segments matched the breaks that
            actually happened afterward. A model that concentrates real failures into the top slice
            of its risk ranking is one a city can plan around.
          </>
        ),
      },
      { kind: 'h2', id: 'acting', text: 'From a score to a dispatched crew' },
      {
        kind: 'p',
        text: (
          <>
            A risk score is only useful if it changes what happens next week. In practice that means
            turning the ranked list into decisions:
          </>
        ),
      },
      {
        kind: 'ol',
        items: [
          <>Target leak-detection surveys at the highest-risk corridors first, instead of walking the whole system on a fixed cycle.</>,
          <>Bundle the worst segments into replacement and rehabilitation projects, coordinated with planned road work to cut restoration costs.</>,
          <>Feed the avoided-failure case and the segment list straight into capital planning — and into grant applications, where a defensible risk model is exactly the kind of evidence funders reward.</>,
        ],
      },
      {
        kind: 'p',
        text: (
          <>
            This is the core idea behind CityPULSE&rsquo;s water and asset modules: unify the data,
            score every asset, explain why each segment is risky, and hand operators a prioritized,
            fundable plan — so the city fixes the pipe before the street floods, not after.
          </>
        ),
      },
    ],
    faqs: [
      {
        q: 'Do we need to install sensors on every pipe?',
        a: (
          <>
            No. A useful model can be built from data most utilities already hold — material, age,
            break history, soil maps and pressure zones. Acoustic sensors meaningfully sharpen the
            picture, but they are typically deployed first on the highest-risk corridors the model
            identifies, not everywhere at once.
          </>
        ),
      },
      {
        q: 'How accurate are failure predictions?',
        a: (
          <>
            Accuracy is best understood as concentration of risk: a well-calibrated model places a
            large share of the breaks that actually occur into a small share of the network. Quality
            depends on data history and is validated by back-testing against breaks that happened
            after the training cutoff.
          </>
        ),
      },
      {
        q: 'Is this only for large utilities?',
        a: (
          <>
            No. Smaller systems often benefit most, because they have limited crews and cannot afford
            to inspect everything. Prioritizing the riskiest 5&ndash;10% of pipe stretches a small
            budget much further.
          </>
        ),
      },
      {
        q: 'How does this connect to funding?',
        a: (
          <>
            A documented, data-driven risk model is strong supporting evidence for infrastructure and
            resilience grants. See our guide to{' '}
            <Link href="/resources/fema-bric-grants-for-smart-infrastructure" style={{ color: 'var(--blue)' }}>
              FEMA BRIC grants for smart infrastructure
            </Link>
            .
          </>
        ),
      },
    ],
  },

  /* ───────────────────────── 2. FEMA BRIC GRANTS ─────────────────────────── */
  'fema-bric-grants-for-smart-infrastructure': {
    slug: 'fema-bric-grants-for-smart-infrastructure',
    title: 'FEMA BRIC grants for smart infrastructure',
    dek: 'Federal hazard-mitigation dollars can fund the predictive monitoring that prevents disasters. Here is what BRIC funds, why smart infrastructure qualifies, and how to assemble an application that scores.',
    topic: 'Funding & grants',
    readMins: 8,
    accent: { color: 'var(--green)', wash: 'var(--green-wash)' },
    metaDescription:
      'A practical guide to FEMA BRIC grants for smart infrastructure: what BRIC funds, how predictive monitoring qualifies as hazard mitigation, and how to assemble a competitive application.',
    blocks: [
      {
        kind: 'p',
        text: (
          <>
            Cities rarely struggle to find risks worth mitigating; they struggle to pay for the
            mitigation. FEMA&rsquo;s hazard-mitigation programs exist precisely to close that gap —
            funding proactive work that reduces future disaster losses. The Building Resilient
            Infrastructure and Communities (BRIC) program is the flagship for that idea, and
            predictive monitoring is increasingly a natural fit for it.
          </>
        ),
      },
      {
        kind: 'callout',
        title: 'A note on program names',
        text: (
          <>
            Federal mitigation funding is delivered through several programs (BRIC, the Hazard
            Mitigation Grant Program, Flood Mitigation Assistance and others), and program names,
            funding levels and cycles change over time. Treat the dollar figures and deadlines as
            things to confirm against the current FEMA and grants.gov notices for your cycle — the
            strategy below holds regardless.
          </>
        ),
      },
      { kind: 'h2', id: 'what-bric-funds', text: 'What BRIC funds' },
      {
        kind: 'p',
        text: (
          <>
            BRIC supports state, local, tribal and territorial governments in undertaking
            hazard-mitigation projects that reduce risk from future natural disasters. In broad
            terms, eligible activities tend to fall into a few buckets:
          </>
        ),
      },
      {
        kind: 'ul',
        items: [
          <><strong>Capability- and capacity-building</strong> — planning, risk assessments, codes and standards adoption, and project scoping that sets up future mitigation.</>,
          <><strong>Mitigation projects</strong> — physical works that reduce risk, such as flood-control improvements, infrastructure hardening and utility resilience.</>,
          <><strong>Project scoping and design</strong> — funding to develop a shovel-worthy project, including the analysis needed to justify it.</>,
        ],
      },
      {
        kind: 'p',
        text: (
          <>
            A common requirement across these programs is a cost share (the applicant contributes a
            portion of the total), with more favorable terms often available for smaller or
            disadvantaged communities. Projects also generally need to be consistent with a FEMA-
            approved hazard-mitigation plan — which is itself something earlier-stage funding can help
            you produce.
          </>
        ),
      },
      { kind: 'h2', id: 'why-monitoring-qualifies', text: 'Why predictive monitoring qualifies' },
      {
        kind: 'p',
        text: (
          <>
            It is easy to assume mitigation means concrete — a levee, a culvert, a hardened
            substation. But the purpose of the funding is risk reduction, and predictive monitoring
            reduces risk in two reinforcing ways. First, it is the analytical backbone that justifies
            and targets physical mitigation: a calibrated risk model tells you which assets to harden
            first and quantifies the losses avoided. Second, early-warning monitoring directly
            reduces the consequences of an event — detecting a failing flood barrier, an overtopping
            risk, or a water-main weakness in time to act.
          </>
        ),
      },
      {
        kind: 'p',
        text: (
          <>
            Framed correctly, sensors and analytics are not &ldquo;IT&rdquo; — they are the
            risk-assessment and consequence-reduction components of a mitigation project. The
            strongest applications usually pair monitoring with the physical work it enables, so the
            reviewer sees a complete arc from detection to durable risk reduction.
          </>
        ),
      },
      {
        kind: 'callout',
        title: 'The benefit-cost analysis is the heart of it',
        text: (
          <>
            FEMA mitigation funding leans heavily on benefit-cost analysis (BCA): the expected future
            losses avoided, divided by project cost. Predictive monitoring helps on both sides of
            that ratio — it produces the loss-and-probability evidence the BCA needs, and it lowers
            expected losses by enabling earlier intervention.
          </>
        ),
      },
      { kind: 'h2', id: 'assemble', text: 'How to assemble a competitive application' },
      {
        kind: 'p',
        text: (
          <>
            Winning applications are not written the week before the deadline. They are assembled from
            evidence the city should be gathering anyway. A workable sequence:
          </>
        ),
      },
      {
        kind: 'ol',
        items: [
          <><strong>Anchor to your hazard-mitigation plan.</strong> Identify the specific hazard and the assets at risk, and show the project advances an objective already in your approved plan.</>,
          <><strong>Quantify the risk.</strong> Use data — historical losses, failure probabilities, exposure maps — to size the problem. This is exactly where a predictive model earns its keep.</>,
          <><strong>Define a concrete project with a credible budget.</strong> Scope deliverables, schedule and costs; identify your cost-share source up front.</>,
          <><strong>Build the benefit-cost case.</strong> Translate avoided losses into dollars and document your assumptions so a reviewer can follow them.</>,
          <><strong>Address the scoring criteria explicitly.</strong> Map your narrative to how applications are evaluated — risk reduction, community impact (including disadvantaged populations), and feasibility.</>,
          <><strong>Show capacity to deliver.</strong> Demonstrate the team, governance and data foundation to execute and measure results.</>,
        ],
      },
      {
        kind: 'p',
        text: (
          <>
            This is where a platform helps disproportionately. CityPULSE&rsquo;s capital-planning and
            grants modules turn the risk model into the exact artifacts an application needs — ranked
            assets, avoided-cost estimates, maps and narrative drafts — so the grants office spends
            its time strengthening the case rather than assembling it from scratch.
          </>
        ),
      },
      { kind: 'h2', id: 'takeaway', text: 'The takeaway for buyers and grant-seekers' },
      {
        kind: 'p',
        text: (
          <>
            If you are evaluating predictive infrastructure tools and worrying about the budget, the
            tool and the funding are two halves of one story. The same risk analysis that justifies
            the purchase justifies the grant. Start by confirming the current BRIC notice and your
            eligibility, then build the evidence base — the monitoring you fund will keep paying back
            in every cycle that follows.
          </>
        ),
      },
    ],
    faqs: [
      {
        q: 'Can software and sensors really be funded as hazard mitigation?',
        a: (
          <>
            When they are framed as the risk-assessment and consequence-reduction components of a
            mitigation effort — especially paired with the physical work they enable — analytics and
            monitoring fit the intent of mitigation funding. Always confirm eligibility against the
            specific program notice for your cycle.
          </>
        ),
      },
      {
        q: 'What is the single most important part of the application?',
        a: (
          <>
            The benefit-cost case. FEMA mitigation funding weighs future losses avoided against
            project cost, so credible, well-documented numbers — exactly what a predictive risk model
            produces — do the heavy lifting.
          </>
        ),
      },
      {
        q: 'We do not have an approved hazard-mitigation plan. Are we out?',
        a: (
          <>
            Not necessarily. Earlier-stage capability-building and planning funding can help you
            produce the plan and scope projects. Check the current program options before assuming a
            given activity is ineligible.
          </>
        ),
      },
      {
        q: 'How does CityPULSE help with grants specifically?',
        a: (
          <>
            It converts the underlying risk model into application-ready material — ranked assets,
            avoided-cost estimates, maps and narrative drafts — and tracks deadlines. Pair this with
            the analytics in{' '}
            <Link href="/resources/how-ai-predicts-water-main-failure" style={{ color: 'var(--blue)' }}>
              how AI predicts water-main failure
            </Link>{' '}
            for a complete picture.
          </>
        ),
      },
    ],
  },

  /* ───────────────────────── 3. SELF-ROUTING 311 ─────────────────────────── */
  '311-that-routes-itself': {
    slug: '311-that-routes-itself',
    title: '311 that routes itself',
    dek: 'A pothole report should not wait in a queue for a human to read it, categorize it, check for duplicates and forward it. AI can do the triage in seconds — and route by SLA to the crew that owns the fix.',
    topic: 'Citizen services',
    readMins: 7,
    accent: { color: 'var(--amber)', wash: 'var(--amber-wash)' },
    metaDescription:
      'How AI turns 311 into a self-routing system: automatic classification, duplicate detection and SLA-aware routing that move citizen reports to the right crew without a dispatcher.',
    blocks: [
      {
        kind: 'p',
        text: (
          <>
            Most 311 systems are good at collecting reports and bad at moving them. A resident submits
            a pothole, a downed sign or an overflowing catch basin, and the request lands in a queue
            where a staff member eventually reads it, decides what it is, checks whether it is a
            duplicate, and forwards it to the right department. Multiply that by thousands of requests
            and the bottleneck is not the crews — it is the triage in the middle.
          </>
        ),
      },
      {
        kind: 'p',
        text: (
          <>
            Modern AI removes that bottleneck. The same request can be understood, de-duplicated and
            routed in seconds, so the first time a human touches it, they are fixing the problem
            rather than sorting the mail.
          </>
        ),
      },
      { kind: 'h2', id: 'classification', text: 'Classification: understanding the report' },
      {
        kind: 'p',
        text: (
          <>
            Residents do not file in your taxonomy. They write &ldquo;big hole on Main near the
            bridge, almost hit it,&rdquo; attach a photo, and expect the city to figure it out.
            Natural-language models read that free text — and, increasingly, the attached image — and
            map it to the correct service category, suggest a priority, and extract the structured
            details a work order needs: location, asset type, severity cues.
          </>
        ),
      },
      {
        kind: 'p',
        text: (
          <>
            Done well, classification also captures uncertainty. When the model is confident, the
            report flows straight through; when it is ambiguous, it is flagged for a quick human
            check rather than guessed. That keeps automation honest and builds staff trust.
          </>
        ),
      },
      { kind: 'h2', id: 'duplicates', text: 'Duplicate detection: one pothole, not forty tickets' },
      {
        kind: 'p',
        text: (
          <>
            A single bad pothole on a busy street can generate dozens of reports in a day. Treated
            naively, that is dozens of tickets, dozens of crew dispatches considered, and a frustrated
            public who all get told &ldquo;we&rsquo;re looking into it&rdquo; for the same hole.
            Duplicate detection clusters reports that describe the same issue using location proximity,
            timing, category and the semantic similarity of the text and photos.
          </>
        ),
      },
      {
        kind: 'callout',
        title: 'Why de-duplication is worth so much',
        text: (
          <>
            Collapsing forty reports into one tracked issue does three things at once: it stops
            redundant dispatches, it gives every reporter a single honest status to follow, and it
            turns &ldquo;volume of complaints&rdquo; into a real signal of severity instead of noise.
          </>
        ),
      },
      { kind: 'h2', id: 'routing', text: 'SLA-aware routing: the right crew, on the clock' },
      {
        kind: 'p',
        text: (
          <>
            Once a report is understood and de-duplicated, it has to reach the team that actually owns
            the fix — and start a clock. SLA-aware routing combines the service category, the
            location (which maps to a maintenance zone or jurisdiction), and the priority to assign
            the request to the responsible department and apply the right service-level target.
          </>
        ),
      },
      {
        kind: 'ul',
        items: [
          <><strong>Ownership routing</strong> — a streetlight goes to facilities, a water leak to the utility, a parks issue to parks — automatically, based on category and location.</>,
          <><strong>SLA timers</strong> — each category carries a target response and resolution time, so the system knows when something is at risk of breaching and can escalate before it does.</>,
          <><strong>Escalation and load-awareness</strong> — aging or high-priority reports surface to supervisors, and routing can account for backlog so urgent work is not buried.</>,
        ],
      },
      {
        kind: 'p',
        text: (
          <>
            Crucially, this is decision-support with a human in the loop. The system proposes the
            category, the duplicate cluster and the route; accountable staff retain oversight and can
            override. The point is not to remove judgment, but to spend it where it matters.
          </>
        ),
      },
      { kind: 'h2', id: 'outcomes', text: 'What changes when 311 routes itself' },
      {
        kind: 'p',
        text: (
          <>
            The visible result is speed: reports reach the right crew in seconds instead of days, and
            residents get accurate status because duplicates are unified. The less visible result is
            better management. When every report is cleanly categorized, de-duplicated and timed
            against an SLA, the city finally has trustworthy data on what is breaking, where, how
            often, and how fast it gets fixed — which feeds directly back into maintenance planning
            and capital priorities.
          </>
        ),
      },
      {
        kind: 'p',
        text: (
          <>
            That is the design behind CityPULSE&rsquo;s Citizen Reports module: AI intake with
            duplicate detection, ownership routing and SLA tracking, wired into the same operating
            picture as the city&rsquo;s assets and risk models — so a citizen&rsquo;s report and the
            infrastructure it concerns are never two separate systems again.
          </>
        ),
      },
    ],
    faqs: [
      {
        q: 'Does this replace 311 call-takers and dispatchers?',
        a: (
          <>
            No — it changes what they spend time on. Routine, unambiguous reports flow through
            automatically, while staff focus on ambiguous cases, complex coordination and resident
            relationships. Humans stay accountable for outcomes.
          </>
        ),
      },
      {
        q: 'How does duplicate detection avoid merging two genuinely different problems?',
        a: (
          <>
            It clusters on multiple signals together — location proximity, timing, category and the
            semantic similarity of text and photos — and leaves borderline cases for human
            confirmation rather than merging aggressively.
          </>
        ),
      },
      {
        q: 'Can it handle photos and multiple languages?',
        a: (
          <>
            Yes. Modern models can read attached images for additional context and interpret reports
            written in everyday language, including across languages — useful for serving diverse
            communities equitably.
          </>
        ),
      },
      {
        q: 'How does routed 311 data help beyond faster fixes?',
        a: (
          <>
            Clean, de-duplicated, SLA-timed data becomes a reliable signal of what is failing and how
            fast it is resolved, feeding maintenance and capital planning — the same evidence base
            described in{' '}
            <Link href="/resources/how-ai-predicts-water-main-failure" style={{ color: 'var(--blue)' }}>
              how AI predicts water-main failure
            </Link>
            .
          </>
        ),
      },
    ],
  },
}

const SLUGS = Object.keys(ARTICLES)

/* ─── Static generation + metadata ───────────────────────────────────────── */
export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = ARTICLES[slug]
  if (!article) {
    return { title: 'Insight not found · CityPULSE' }
  }
  return {
    title: `${article.title} · CityPULSE Insights`,
    description: article.metaDescription,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: 'article',
    },
  }
}

/* ─── Block renderer ─────────────────────────────────────────────────────── */
const bodyP: React.CSSProperties = {
  fontFamily: 'var(--serif)',
  fontSize: 17,
  lineHeight: 1.78,
  color: 'var(--ink-soft)',
  margin: '0 0 20px',
}

function renderBlock(block: Block, i: number) {
  switch (block.kind) {
    case 'h2':
      return (
        <h2
          key={i}
          id={block.id}
          className="serif"
          style={{
            fontSize: 'clamp(21px,2.8vw,27px)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            lineHeight: 1.22,
            margin: '46px 0 14px',
            scrollMarginTop: 88,
          }}
        >
          {block.text}
        </h2>
      )
    case 'p':
      return (
        <p key={i} style={bodyP}>
          {block.text}
        </p>
      )
    case 'ul':
      return (
        <ul
          key={i}
          style={{
            margin: '0 0 22px',
            paddingLeft: 24,
            fontFamily: 'var(--serif)',
            fontSize: 17,
            lineHeight: 1.7,
            color: 'var(--ink-soft)',
          }}
        >
          {block.items.map((it, j) => (
            <li key={j} style={{ marginBottom: 10 }}>
              {it}
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol
          key={i}
          style={{
            margin: '0 0 22px',
            paddingLeft: 24,
            fontFamily: 'var(--serif)',
            fontSize: 17,
            lineHeight: 1.7,
            color: 'var(--ink-soft)',
          }}
        >
          {block.items.map((it, j) => (
            <li key={j} style={{ marginBottom: 10 }}>
              {it}
            </li>
          ))}
        </ol>
      )
    case 'callout':
      return (
        <aside
          key={i}
          style={{
            margin: '8px 0 24px',
            padding: '18px 20px',
            background: 'var(--surface-3)',
            border: '1px solid var(--rule)',
            borderLeft: '3px solid var(--blue)',
            borderRadius: 'var(--r-sm)',
          }}
        >
          <div className="cap" style={{ color: 'var(--blue)', marginBottom: 6 }}>
            {block.title}
          </div>
          <div
            style={{
              fontFamily: 'var(--grotesk)',
              fontSize: 14,
              lineHeight: 1.65,
              color: 'var(--ink-soft)',
            }}
          >
            {block.text}
          </div>
        </aside>
      )
  }
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = ARTICLES[slug]
  if (!article) notFound()

  const others = SLUGS.filter((s) => s !== slug).map((s) => ARTICLES[s])

  return (
    <>
      <SiteHeader />

      <main id="main-content">
        {/* Article header */}
        <header style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 28px 44px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <Link
                href="/resources"
                style={{
                  fontFamily: 'var(--grotesk)',
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: 'var(--ink-soft)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
                Insights
              </Link>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 11px',
                  background: article.accent.wash,
                  color: article.accent.color,
                  borderRadius: 'var(--r-pill)',
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {article.topic}
              </span>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10.5,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-faint)',
                }}
              >
                {article.readMins} min read
              </span>
            </div>

            <h1
              className="serif"
              style={{
                fontSize: 'clamp(30px,4.6vw,46px)',
                fontWeight: 600,
                letterSpacing: '-0.025em',
                lineHeight: 1.12,
                color: 'var(--ink)',
                margin: '0 0 18px',
              }}
            >
              {article.title}
            </h1>
            <p className="lede" style={{ fontSize: 17.5, lineHeight: 1.6, maxWidth: '62ch' }}>
              {article.dek}
            </p>
          </div>
        </header>

        {/* Article body */}
        <article style={{ maxWidth: 760, margin: '0 auto', padding: '40px 28px 8px' }}>
          {article.blocks.map((b, i) => renderBlock(b, i))}
        </article>

        {/* FAQ */}
        <section style={{ maxWidth: 760, margin: '0 auto', padding: '8px 28px 0' }}>
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(22px,3vw,28px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              margin: '40px 0 8px',
              paddingTop: 36,
              borderTop: '1px solid var(--rule)',
            }}
          >
            Frequently asked questions
          </h2>
          <div style={{ marginTop: 18 }}>
            {article.faqs.map((f, i) => (
              <div
                key={i}
                style={{
                  borderTop: i ? '1px solid var(--rule-soft)' : 'none',
                  padding: '20px 0',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--grotesk)',
                    fontSize: 16,
                    fontWeight: 700,
                    color: 'var(--ink)',
                    margin: '0 0 8px',
                  }}
                >
                  {f.q}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: 'var(--ink-soft)',
                  }}
                >
                  {f.a}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 760, margin: '0 auto', padding: '40px 28px 16px' }}>
          <div
            style={{
              background: 'var(--ink)',
              borderRadius: 'var(--r-lg)',
              padding: '36px 32px',
              textAlign: 'center',
            }}
          >
            <h2
              className="serif"
              style={{
                fontSize: 'clamp(22px,3.2vw,30px)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#fff',
                margin: '0 0 12px',
              }}
            >
              See it on your own city&rsquo;s data
            </h2>
            <p
              style={{
                fontFamily: 'var(--grotesk)',
                fontSize: 14.5,
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '50ch',
                margin: '0 auto 24px',
              }}
            >
              Start with a focused pilot in one department. We will help you scope it — and identify
              the grants that can fund it.
            </p>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '13px 28px',
                fontFamily: 'var(--grotesk)',
                fontSize: 14,
                fontWeight: 600,
                background: '#fff',
                color: 'var(--ink)',
                borderRadius: 'var(--r-pill)',
                textDecoration: 'none',
              }}
            >
              Request a municipal pilot
              <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Related */}
        <section style={{ maxWidth: 760, margin: '0 auto', padding: '40px 28px 88px' }}>
          <div className="cap" style={{ marginBottom: 14 }}>Keep reading</div>
          <div className="grid-2" style={{ gap: 16 }}>
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/resources/${o.slug}`}
                className="lift"
                style={{
                  display: 'block',
                  background: 'var(--surface)',
                  border: '1px solid var(--rule)',
                  borderRadius: 'var(--r)',
                  boxShadow: 'var(--sh-1)',
                  padding: '18px 20px',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: o.accent.color,
                    marginBottom: 8,
                  }}
                >
                  {o.topic}
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: 16.5,
                    fontWeight: 600,
                    letterSpacing: '-0.015em',
                    color: 'var(--ink)',
                    lineHeight: 1.3,
                  }}
                >
                  {o.title}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
