export interface KPI {
  key: string;
  label: string;
  value: string;
  sub: string;
  status: string;
  trend: string;
  unit?: string;
}

export interface Alert {
  id: string;
  sev: 'Critical' | 'Elevated' | 'Watch';
  cat: string;
  title: string;
  where: string;
  dept: string;
  time: string;
}

export interface Action {
  p: number;
  text: string;
  impact: string;
  dept: string;
}

export interface Agent {
  key: string;
  name: string;
  ico: string;
  color: string;
  status: string;
  esc: string;
  conf: number;
  dept: string;
  sources: string[];
  finding: string;
  actions: string[];
}

export interface Briefing {
  topRisks: [string, string, string][];
  overnight: string[];
  attention: [string, string][];
  expensive: [string, string, string][];
}

export interface Report311 {
  id: string;
  cat: string;
  sev: 'High' | 'Medium' | 'Low';
  where: string;
  dept: string;
  sla: string;
  status: string;
  dup: number;
  when: string;
}

export interface Project {
  id: string;
  title: string;
  cost: string;
  urgency: string;
  program: string;
  elig: string;
  match: string;
  climate: string;
  safety: string;
  equity: string;
  ready: string;
  deadline: string;
  prob: number;
  note: string;
}

export interface Asset {
  id: string;
  type: string;
  name: string;
  where: string;
  cond: number;
  prob: string;
  dept: string;
  risk: string;
}

export interface IntegrationGroup {
  group: string;
  items: [string, string, number][];
}

export interface DomainMetric {
  label: string;
  value: string;
  sub: string;
  color: string;
}

export interface DomainDot {
  x: number;
  y: number;
  color: string;
  crit?: boolean;
  tag?: string;
}

export interface Domain {
  title: string;
  ico: string;
  color: string;
  lede: string;
  metrics: [string, string, string, string][];
  recs: [string, string, string][];
  dots: DomainDot[];
}

export interface Task {
  id: string;
  title: string;
  dept: string;
  pri: 'Critical' | 'High' | 'Medium' | 'Low';
  status: string;
  assignee: string;
  due: string;
  dueDay: number;
  gs: number;
  gl: number;
  source: string;
}

export interface MapDot {
  x: number;
  y: number;
  color: string;
  size?: number;
  pulse?: boolean;
  label?: string;
  id?: string;
  tag?: string;
  crit?: boolean;
}

export interface MapHeat {
  x: number;
  y: number;
  r: number;
  color: string;
  o: number;
}
