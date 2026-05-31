import type { KPI, Alert, Action, Agent, Briefing, Report311, Project, Asset, IntegrationGroup, Domain, Task, MapDot, MapHeat } from "./types";

export const CITY = {
  name: "Meridian",
  state: "Cascadia",
  pop: "341,200",
  riskScore: 62,
  riskLabel: "Elevated",
  date: "Fri · May 30, 2026 · 07:40",
};

export const KPIS: KPI[] = [
  { key: "alerts",  label: "Critical Alerts",        value: "4",       sub: "2 new overnight",  status: "s-critical", trend: "+2" },
  { key: "infra",   label: "Infrastructure Health",   value: "78",      sub: "of 100 · −3 wk",  status: "s-elevated", trend: "−3" },
  { key: "traffic", label: "Traffic Delay Hours",     value: "1,240",   sub: "today · +14%",     status: "s-elevated", trend: "+14%" },
  { key: "water",   label: "Water Network Risk",      value: "Elevated", sub: "1 segment ≤90d",  status: "s-elevated", trend: "" },
  { key: "air",     label: "Air Quality Index",       value: "84",      sub: "Moderate",          status: "s-elevated", trend: "+9" },
  { key: "fire",    label: "Wildfire Risk",           value: "High",    sub: "NE ridge · ↑",      status: "s-critical", trend: "" },
  { key: "flood",   label: "Flood Risk",              value: "Moderate", sub: "Riverside",        status: "s-elevated", trend: "" },
  { key: "r311",    label: "Open 311 Reports",        value: "312",     sub: "47 unrouted",       status: "s-info",     trend: "+23" },
  { key: "cost",    label: "Est. Avoided Cost (YTD)", value: "$4.2M",   sub: "vs. reactive",      status: "s-ok",       trend: "+0.4M" },
  { key: "grants",  label: "Grant-Eligible Projects", value: "11",      sub: "$38.6M pipeline",   status: "s-ok",       trend: "+1" },
];

export const ALERTS: Alert[] = [
  { id: "WTR-2207",  sev: "Critical", cat: "Water",    title: "Trunk main MX-118 — failure predicted ≤ 90 days",           where: "Riverside / 4th St",  dept: "Water Authority",  time: "06:12" },
  { id: "FIRE-0461", sev: "Critical", cat: "Wildfire", title: "Ignition-risk zone expanding toward Northgate homes",        where: "NE Ridge",            dept: "Fire & Rescue",    time: "05:48" },
  { id: "TRF-3390",  sev: "Elevated", cat: "Traffic",  title: "Vine & Harbor intersection — delay + emissions spike",       where: "Old Town",            dept: "Transportation",   time: "07:02" },
  { id: "311-5521",  sev: "Elevated", cat: "Drainage", title: "Cluster of 9 reports indicates storm-drain failure",        where: "Westbank",            dept: "Public Works",     time: "06:55" },
  { id: "BRG-0072",  sev: "Watch",   cat: "Bridge",   title: "Cedar St bridge — condition trending down, grant-eligible",  where: "Cedar Crossing",      dept: "Public Works",     time: "Yesterday" },
];

export const ACTIONS: Action[] = [
  { p: 1, text: "Schedule emergency inspection of trunk main MX-118",              impact: "Avoids ~$2.1M emergency repair",    dept: "Water" },
  { p: 2, text: "Pre-position crews & issue advisory for NE Ridge fire zone",     impact: "Protects 430 homes",                dept: "Fire" },
  { p: 3, text: "Retime Vine & Harbor signals during AM peak",                    impact: "−18% delay, −12% local NOx",       dept: "Transport" },
  { p: 4, text: "Dispatch drainage survey to Westbank cluster",                   impact: "Confirms failure before storm Tue", dept: "Public Works" },
];

export const AGENTS: Agent[] = [
  { key: "water",    name: "Water Agent",           ico: "water",   color: "var(--blue)",  status: "Action required", esc: "Critical",    conf: 0.91, dept: "Water Authority",
    sources: ["SCADA pressure", "Acoustic leak sensors", "Soil-corrosivity model", "Inspection records"],
    finding: "Trunk main MX-118 (Riverside) predicted to fail within 90 days. Corrosivity index 8.1; two joints show pre-failure transients.",
    actions: ["Authorize emergency inspection", "Stage replacement as grant project"] },
  { key: "fire",     name: "Fire Agent",            ico: "fire",    color: "var(--red)",   status: "Action required", esc: "Critical",    conf: 0.86, dept: "Fire & Rescue",
    sources: ["Satellite thermal", "Weather (wind/RH)", "Fuel-moisture model", "Camera network"],
    finding: "Ignition-risk zone on NE Ridge expanded ~340 m toward Northgate after a wind shift. 430 homes inside the 2-hour spread band.",
    actions: ["Pre-position crews", "Issue resident advisory", "Open emergency coordination"] },
  { key: "traffic",  name: "Traffic Agent",         ico: "traffic", color: "var(--amber)", status: "Monitoring",      esc: "Elevated",    conf: 0.78, dept: "Transportation",
    sources: ["Signal controllers", "Loop detectors", "Probe/GPS speeds", "Incident feed"],
    finding: "Vine & Harbor running 2.4× baseline delay in AM peak; idling is driving a measurable local NOx increase.",
    actions: ["Retime AM signal plan", "Model detour for freight"] },
  { key: "flood",    name: "Flood Agent",           ico: "flood",   color: "var(--blue)",  status: "Watch",           esc: "Watch",       conf: 0.72, dept: "Public Works",
    sources: ["Gauge network", "Radar QPF", "Storm-drain telemetry", "Terrain model"],
    finding: "Tuesday storm (38 mm/3h) would exceed Westbank drain capacity; a 311 cluster already suggests a partial blockage.",
    actions: ["Dispatch drainage survey", "Pre-clear inlets in Westbank"] },
  { key: "road",     name: "Road & Bridge Agent",   ico: "assets",  color: "var(--slate)", status: "Monitoring",      esc: "Watch",       conf: 0.81, dept: "Public Works",
    sources: ["Structural sensors", "Inspection backlog", "Traffic loading", "Materials model"],
    finding: "Cedar St bridge condition index trending down (now 58/100). Crosses the threshold for state bridge-rehab grant eligibility.",
    actions: ["Schedule Tier-2 inspection", "Draft grant narrative"] },
  { key: "air",      name: "Air Quality Agent",     ico: "air",     color: "var(--amber)", status: "Action required", esc: "Elevated",    conf: 0.83, dept: "Environment",
    sources: ["Reference monitors", "Low-cost sensor mesh", "Traffic emissions", "Wind dispersion"],
    finding: "AQI near three south-corridor schools projected to exceed 100 (Unhealthy for Sensitive Groups) midday.",
    actions: ["Notify school district", "Recommend recess advisory"] },
  { key: "citizen",  name: "Citizen Reports Agent", ico: "message", color: "var(--green)", status: "Monitoring",      esc: "Watch",       conf: 0.88, dept: "Citizen Support",
    sources: ["311 intake", "Photo classifier", "Duplicate model", "Routing rules"],
    finding: "9 Westbank reports auto-clustered into one suspected drainage failure; 47 reports awaiting routing across the city.",
    actions: ["Confirm cluster as one work order", "Auto-route the backlog"] },
  { key: "grants",   name: "Budget & Grants Agent", ico: "capital", color: "var(--green)", status: "Opportunity",     esc: "Info",        conf: 0.79, dept: "Grants Office",
    sources: ["Federal/state programs", "Risk register", "Cost models", "Equity index"],
    finding: "Three detected risks now qualify for open grant programs totalling $28.4M; two deadlines fall within 6 weeks.",
    actions: ["Assemble application package", "Rank by funding probability"] },
  { key: "emergency",name: "Emergency Response Agent",ico: "alerts",color: "var(--red)",  status: "Standby",         esc: "Info",        conf: 0.84, dept: "Emergency Mgmt",
    sources: ["All hazard feeds", "Resource roster", "Shelter status", "Mutual aid"],
    finding: "No active activation. Pre-stage plan ready for the NE Ridge fire scenario; 3 shelters and 18 crews available.",
    actions: ["Review pre-stage plan", "Open coordination board"] },
];

export const BRIEFING: Briefing = {
  topRisks: [
    ["Water main MX-118 failure",    "Riverside",     "Critical"],
    ["NE Ridge wildfire spread",     "Northgate",     "Critical"],
    ["School-zone air quality",      "South corridor","Elevated"],
    ["Westbank drainage failure",    "Westbank",      "Elevated"],
    ["Vine & Harbor congestion",     "Old Town",      "Elevated"],
  ],
  overnight: [
    "Soil-corrosivity index on MX-118 rose 7.4 → 8.1.",
    "Wildfire-risk zone expanded ~340 m toward Northgate.",
    "23 new 311 reports; 9 cluster in Westbank.",
    "Air Quality Index rose 9 points to 84 near the south corridor.",
  ],
  attention: [
    ["Authorize MX-118 emergency inspection",          "Water Authority"],
    ["Approve NE Ridge advisory + crew pre-stage",     "Fire & Rescue"],
    ["Confirm Westbank drainage work order",           "Public Works"],
  ],
  expensive: [
    ["MX-118 reactive failure",           "$2.1M", "vs $0.4M inspection + planned fix"],
    ["Bridge deferral past grant window", "$1.6M", "loses 80% state cost-share"],
    ["Storm drainage backup",             "$0.9M", "property claims if not pre-cleared"],
  ],
};

export const CATS_311: [string, string][] = [
  ["Pothole", "var(--amber)"], ["Water leak", "var(--blue)"], ["Streetlight out", "var(--slate)"],
  ["Fallen tree", "var(--green)"], ["Illegal dumping", "var(--amber)"], ["Road ice", "var(--blue)"],
  ["Flooding", "var(--blue)"], ["Pollution", "var(--red)"], ["Noise", "var(--slate)"], ["Damaged sign", "var(--amber)"],
];

export const REPORTS_311: Report311[] = [
  { id: "311-5521", cat: "Flooding",        sev: "High",   where: "Westbank · Marsh & 9th",  dept: "Public Works",   sla: "2h left",   status: "Routing",     dup: 9, when: "06:55" },
  { id: "311-5519", cat: "Pothole",         sev: "Medium", where: "Old Town · Vine St",       dept: "Public Works",   sla: "On track",  status: "Assigned",    dup: 0, when: "06:40" },
  { id: "311-5517", cat: "Streetlight out", sev: "Low",    where: "Northgate · Birch Ave",    dept: "Utilities",      sla: "On track",  status: "Assigned",    dup: 2, when: "06:22" },
  { id: "311-5514", cat: "Water leak",      sev: "High",   where: "Riverside · 4th St",       dept: "Water Authority",sla: "1h left",   status: "In progress", dup: 4, when: "05:58" },
  { id: "311-5510", cat: "Illegal dumping", sev: "Medium", where: "Harbor · Dock Rd",         dept: "Sanitation",     sla: "On track",  status: "New",         dup: 0, when: "05:30" },
  { id: "311-5508", cat: "Fallen tree",     sev: "Medium", where: "Cedar Crossing",           dept: "Parks",          sla: "Breached",  status: "In progress", dup: 1, when: "Yesterday" },
  { id: "311-5505", cat: "Pollution",       sev: "High",   where: "South corridor",           dept: "Environment",    sla: "On track",  status: "New",         dup: 3, when: "Yesterday" },
  { id: "311-5501", cat: "Damaged sign",    sev: "Low",    where: "Midtown · 12th",           dept: "Transportation", sla: "On track",  status: "Resolved",    dup: 0, when: "Yesterday" },
];

export const PROJECTS: Project[] = [
  { id: "CP-118", title: "Riverside trunk main replacement",          cost: "$2.4M", urgency: "Immediate", program: "State Water Resilience Fund", elig: "Eligible",        match: "80%", climate: "Med",  safety: "High", equity: "High", ready: "Shovel-ready", deadline: "Jun 28", prob: 0.74, note: "Replaces failure-predicted main MX-118 before reactive rupture; protects 6,200 service connections." },
  { id: "CP-091", title: "NE Ridge wildfire buffer + sensor network", cost: "$3.1M", urgency: "High",      program: "FEMA BRIC",                   elig: "Eligible",        match: "75%", climate: "High", safety: "High", equity: "Med",  ready: "Design",       deadline: "Jul 15", prob: 0.61, note: "Fuel-reduction buffer and 40-node early-detection mesh protecting 430 Northgate homes." },
  { id: "CP-072", title: "Cedar St bridge rehabilitation",            cost: "$4.8M", urgency: "High",      program: "State Bridge Rehab",           elig: "Newly eligible", match: "80%", climate: "Low",  safety: "High", equity: "Med",  ready: "Design",       deadline: "Aug 02", prob: 0.68, note: "Condition index dropped to 58/100, crossing the grant threshold this week." },
  { id: "CP-204", title: "Lead service-line replacement — Westbank",  cost: "$5.6M", urgency: "High",      program: "EPA WIIN / DWSRF",            elig: "Eligible",        match: "90%", climate: "Low",  safety: "High", equity: "High", ready: "Shovel-ready", deadline: "Jun 30", prob: 0.71, note: "1,180 known lead lines in a high-equity-priority district; near-full federal cost share." },
  { id: "CP-150", title: "Smart signal modernization — Old Town",     cost: "$1.9M", urgency: "Medium",    program: "CMAQ",                        elig: "Eligible",        match: "70%", climate: "Med",  safety: "Med",  equity: "Med",  ready: "Shovel-ready", deadline: "Sep 10", prob: 0.66, note: "Adaptive signals at 14 intersections; modeled −18% delay and −12% corridor NOx." },
  { id: "CP-181", title: "School-zone air monitoring + screening",    cost: "$0.7M", urgency: "Medium",    program: "EPA Community Air",           elig: "Eligible",        match: "100%",climate: "Med",  safety: "Med",  equity: "High", ready: "Shovel-ready", deadline: "Jul 20", prob: 0.69, note: "Permanent monitors at 9 schools plus vegetative screening near the south corridor." },
];

export const ASSETS: Asset[] = [
  { id: "WTR-2207", type: "Water main",    name: "Trunk main MX-118",        where: "Riverside",     cond: 41, prob: "82%", dept: "Water Authority", risk: "Critical" },
  { id: "BRG-0072", type: "Bridge",        name: "Cedar St bridge",           where: "Cedar Crossing",cond: 58, prob: "34%", dept: "Public Works",    risk: "Elevated" },
  { id: "RD-1190",  type: "Road segment",  name: "Vine St (4th–9th)",         where: "Old Town",      cond: 62, prob: "21%", dept: "Public Works",    risk: "Watch" },
  { id: "SIG-3390", type: "Signal",        name: "Vine & Harbor controller",  where: "Old Town",      cond: 70, prob: "12%", dept: "Transportation",  risk: "Watch" },
  { id: "PMP-014",  type: "Pump station",  name: "Westbank storm pump",       where: "Westbank",      cond: 66, prob: "18%", dept: "Public Works",    risk: "Watch" },
  { id: "HYD-882",  type: "Hydrant",       name: "Hydrant cluster 88",        where: "Northgate",     cond: 88, prob: "4%",  dept: "Fire & Rescue",   risk: "OK" },
  { id: "LGT-455",  type: "Streetlight",   name: "Birch Ave run",             where: "Northgate",     cond: 74, prob: "9%",  dept: "Utilities",       risk: "OK" },
  { id: "BLD-007",  type: "Public building",name: "Harbor community center",  where: "Harbor",        cond: 79, prob: "7%",  dept: "Facilities",      risk: "OK" },
];

export const INTEGRATIONS: IntegrationGroup[] = [
  { group: "Geospatial & base",    items: [["City GIS / parcel", "Connected", 1240], ["Open data portal", "Connected", 86], ["Satellite imagery", "Connected", 12]] },
  { group: "Sensors & IoT",        items: [["Water SCADA", "Connected", 412], ["Air-quality mesh", "Connected", 96], ["Traffic loops & cameras", "Connected", 318], ["Structural sensors", "Connected", 74], ["Flood gauges", "Degraded", 28]] },
  { group: "Environment & weather", items: [["Weather API", "Connected", 4], ["Wildfire thermal feed", "Connected", 2], ["Radar QPF", "Connected", 1]] },
  { group: "Operations systems",   items: [["311 intake", "Connected", 3], ["Work-order system", "Connected", 1], ["Asset management", "Connected", 1], ["Emergency dispatch (CAD)", "Connected", 1], ["Public transit (GTFS-RT)", "Connected", 1]] },
];

export const REPORT_TYPES: [string, string, string][] = [
  ["Council briefing",            "Weekly operating picture for elected officials",              "PDF · PPTX"],
  ["Department report",           "Per-department asset, work-order and SLA summary",            "PDF · Excel"],
  ["Grant report",                "Funder-ready narrative, budget and KPIs",                     "PDF · Excel"],
  ["Climate resilience report",   "Hazard exposure, vulnerability and mitigation",               "PDF"],
  ["Infrastructure condition report","Asset inventory, condition and forecast",                  "PDF · Excel"],
  ["Emergency event report",      "After-action timeline and resource log",                      "PDF"],
  ["Public transparency report",  "Resident-facing dashboard and open data",                     "Public link · API"],
];

export const DOMAINS: Record<string, Domain> = {
  traffic: {
    title: "Traffic & Mobility", ico: "traffic", color: "var(--amber)",
    lede: "Network is running above baseline delay, concentrated in Old Town. One corridor is driving both congestion and local emissions.",
    metrics: [["Avg. delay", "+14%", "vs 30-day", "var(--amber)"], ["Congestion cost", "$182K", "this month", "var(--amber)"], ["Accident hotspots", "6", "active", "var(--red)"], ["Transit on-time", "88%", "−3 pts", "var(--amber)"], ["Parking used", "76%", "downtown", "var(--blue)"], ["Bike incidents", "3", "this week", "var(--slate)"]],
    recs: [["Retime Vine & Harbor AM plan", "−18% delay, −12% local NOx", "var(--green)"], ["Freight detour via Dock Rd 06:00–09:00", "Removes 240 heavy trips from Old Town", "var(--blue)"], ["Flag 9th & Vine for road-safety audit", "3 incidents in 30 days", "var(--amber)"]],
    dots: [{ x: 47, y: 44, color: "#BC7E15", crit: true, tag: "Vine & Harbor" }, { x: 35, y: 55, color: "#B23A33", tag: "9th & Vine" }, { x: 60, y: 35, color: "#BC7E15" }],
  },
  water: {
    title: "Water System", ico: "water", color: "var(--blue)",
    lede: "One trunk main is in a predicted-failure window. Network pressure and quality are otherwise nominal.",
    metrics: [["Network risk", "Elevated", "1 segment", "var(--amber)"], ["Predicted failures ≤90d", "1", "MX-118", "var(--red)"], ["Non-revenue water", "12.4%", "−0.6 pts", "var(--green)"], ["Quality exceedances", "0", "this week", "var(--green)"], ["Lead lines known", "1,180", "Westbank", "var(--amber)"], ["Pump uptime", "99.1%", "30-day", "var(--green)"]],
    recs: [["Emergency inspection of MX-118", "Avoids ~$2.1M reactive repair", "var(--green)"], ["Stage MX-118 as grant project CP-118", "80% state cost share", "var(--blue)"], ["Prioritize Westbank lead lines", "High-equity district, 90% federal match", "var(--blue)"]],
    dots: [{ x: 24, y: 58, color: "#B23A33", crit: true, tag: "MX-118" }, { x: 62, y: 66, color: "#BC7E15", tag: "Westbank lead" }, { x: 70, y: 48, color: "#2C7A52" }],
  },
  air: {
    title: "Air Quality & Public Health", ico: "air", color: "var(--amber)",
    lede: "A midday exceedance is projected near south-corridor schools, driven by traffic emissions and low dispersion.",
    metrics: [["City AQI", "84", "Moderate", "var(--amber)"], ["School-zone peak", "104", "projected", "var(--red)"], ["Heat-island delta", "+4.1°C", "South corridor", "var(--amber)"], ["Noise complaints", "12", "this week", "var(--slate)"], ["Sensitive pop.", "18,400", "in exposure zone", "var(--amber)"], ["Sensors online", "96", "of 98", "var(--green)"]],
    recs: [["Notify school district of midday peak", "9 schools, ~6,000 students", "var(--amber)"], ["Recommend recess advisory 11:00–14:00", "Protects sensitive groups", "var(--blue)"], ["Fund school-zone monitoring CP-181", "100% EPA community-air match", "var(--green)"]],
    dots: [{ x: 50, y: 72, color: "#B23A33", crit: true, tag: "School zone" }, { x: 44, y: 64, color: "#BC7E15" }, { x: 56, y: 78, color: "#BC7E15" }],
  },
  fire: {
    title: "Wildfire Risk", ico: "fire", color: "var(--red)",
    lede: "An ignition-risk zone on the NE ridge is expanding toward residential Northgate after a wind shift. Conditions are critical.",
    metrics: [["Risk level", "High", "rising", "var(--red)"], ["Homes in spread band", "430", "2-hour", "var(--red)"], ["Fuel moisture", "9%", "critical", "var(--red)"], ["Wind", "32 km/h", "NW gusting", "var(--amber)"], ["Detection nodes", "—", "none on ridge", "var(--amber)"], ["Crews available", "18", "of 24", "var(--green)"]],
    recs: [["Issue Northgate resident advisory", "430 homes, 2 schools", "var(--red)"], ["Pre-position crews at NE staging", "Cuts response by ~11 min", "var(--blue)"], ["Open emergency coordination board", "Multi-agency activation", "var(--amber)"]],
    dots: [{ x: 78, y: 20, color: "#B23A33", crit: true, tag: "Ignition zone" }, { x: 72, y: 28, color: "#BC7E15" }, { x: 82, y: 26, color: "#BC7E15" }],
  },
  flood: {
    title: "Flood Risk", ico: "flood", color: "var(--blue)",
    lede: "Tuesday's forecast storm would exceed Westbank drain capacity. A 311 cluster suggests an existing partial blockage.",
    metrics: [["Risk level", "Moderate", "Tue storm", "var(--amber)"], ["Forecast rain", "38mm", "in 3h", "var(--blue)"], ["At-capacity drains", "1", "Westbank", "var(--amber)"], ["Properties at risk", "210", "100-yr zone", "var(--amber)"], ["Gauges online", "27", "of 28", "var(--green)"], ["Pump readiness", "Ready", "Westbank", "var(--green)"]],
    recs: [["Dispatch drainage survey to Westbank", "Confirms blockage before Tue", "var(--green)"], ["Pre-clear inlets in flood zone", "Restores design capacity", "var(--blue)"], ["Stage stormwater upgrade CP-220", "Flood-prone district", "var(--amber)"]],
    dots: [{ x: 62, y: 70, color: "#BC7E15", crit: true, tag: "Westbank drain" }, { x: 55, y: 64, color: "#2A6C92" }, { x: 68, y: 76, color: "#2A6C92" }],
  },
};

export const ROLES = ["Mayor / Council", "City Manager", "Public Works", "Emergency Mgmt", "Environment", "Transportation", "Utilities", "Grants Office", "Citizen Support"];

export const TASKS: Task[] = [
  { id: "WO-2207", title: "Emergency inspection — MX-118 water main",      dept: "Water Authority",   pri: "Critical", status: "In progress", assignee: "G. Navarro",   due: "Today",    dueDay: 0,  gs: 0,  gl: 1,  source: "AI · WTR-2207" },
  { id: "WO-2208", title: "NE Ridge crew pre-positioning",                  dept: "Fire & Rescue",     pri: "Critical", status: "Scheduled",   assignee: "R. Park",      due: "Today",    dueDay: 0,  gs: 0,  gl: 1,  source: "AI · FIRE-0461" },
  { id: "WO-2209", title: "Westbank drainage survey",                       dept: "Public Works",      pri: "High",     status: "Scheduled",   assignee: "M. Okafor",    due: "Jun 2",    dueDay: 3,  gs: 1,  gl: 2,  source: "AI · 311-5521" },
  { id: "WO-2210", title: "Vine & Harbor signal retiming",                  dept: "Transportation",    pri: "High",     status: "Assigned",    assignee: "L. Chen",      due: "Jun 3",    dueDay: 4,  gs: 2,  gl: 2,  source: "AI · TRF-3390" },
  { id: "WO-2211", title: "Cedar St bridge Tier-2 inspection",              dept: "Public Works",      pri: "High",     status: "Scheduled",   assignee: "D. Walsh",     due: "Jun 5",    dueDay: 6,  gs: 3,  gl: 3,  source: "AI · BRG-0072" },
  { id: "WO-2212", title: "CP-118 grant application submission",            dept: "Grants Office",     pri: "High",     status: "In progress", assignee: "S. Marsh",     due: "Jun 28",   dueDay: 29, gs: 5,  gl: 6,  source: "CP-118" },
  { id: "WO-2213", title: "School district AQI notification",               dept: "Environment",       pri: "Medium",   status: "New",         assignee: "T. Reyes",     due: "Today",    dueDay: 0,  gs: 0,  gl: 1,  source: "AI · Air" },
  { id: "WO-2214", title: "Northgate streetlight repair — Birch Ave",       dept: "Utilities",         pri: "Low",      status: "Assigned",    assignee: "P. Kumar",     due: "Jun 4",    dueDay: 5,  gs: 4,  gl: 2,  source: "311-5517" },
];

export const MAP_DOTS: MapDot[] = [
  { x: 24, y: 58, color: "#B23A33", size: 15, pulse: true, label: "Water main MX-118", layer: "assets",      assetId: "WTR-2207" },
  { x: 78, y: 20, color: "#B23A33", size: 15, pulse: true, label: "Wildfire zone",      layer: "hazards" },
  { x: 47, y: 44, color: "#BC7E15", size: 13,              label: "Vine & Harbor",      layer: "mobility",    assetId: "SIG-3390" },
  { x: 62, y: 70, color: "#BC7E15", size: 13,              label: "Westbank drainage",  layer: "hazards",     assetId: "PMP-014" },
  { x: 38, y: 30, color: "#185486", size: 11,              label: "Cedar St bridge",    layer: "assets",      assetId: "BRG-0072" },
  { x: 55, y: 56, color: "#185486", size: 10,              label: "311 cluster",        layer: "citizen" },
  { x: 70, y: 48, color: "#2C7A52", size: 9,               label: "Sensor station",     layer: "environment" },
];

export const MAP_HEAT: MapHeat[] = [
  { x: 78, y: 22, r: 200, color: "rgba(178,58,51,.5)",  o: 0.5 },
  { x: 26, y: 60, r: 150, color: "rgba(188,126,21,.45)", o: 0.5 },
  { x: 60, y: 70, r: 130, color: "rgba(188,126,21,.4)",  o: 0.45 },
];
