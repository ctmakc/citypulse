import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3096/api/v1'

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
})

// Auto-attach JWT token
api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('citypulse_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth helpers
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
  logout: () => { localStorage.removeItem('citypulse_token') },
}

// Dashboard
export const dashboardApi = {
  overview: (tenantId = 'meridian-tenant-id') =>
    api.get('/dashboard/overview', { headers: { 'x-tenant-id': tenantId } }),
  alerts: (tenantId = 'meridian-tenant-id') =>
    api.get('/dashboard/alerts', { headers: { 'x-tenant-id': tenantId } }),
}

// Assets
export const assetsApi = {
  list: (filters?: Record<string, string>) =>
    api.get('/assets', { params: filters }),
  map: () => api.get('/assets/map'),
  stats: () => api.get('/assets/stats'),
  get: (id: string) => api.get(`/assets/${id}`),
  create: (data: unknown) => api.post('/assets', data),
  update: (id: string, data: unknown) => api.patch(`/assets/${id}`, data),
}

// 311 Reports
export const reports311Api = {
  list: (filters?: Record<string, string>) =>
    api.get('/reports311', { params: filters }),
  stats: () => api.get('/reports311/stats'),
  submit: (data: unknown) => api.post('/reports311', data),
  updateStatus: (id: string, status: string) =>
    api.patch(`/reports311/${id}/status`, { status }),
}

// Alerts
export const alertsApi = {
  list: () => api.get('/alerts'),
  stats: () => api.get('/alerts/stats'),
  acknowledge: (id: string) => api.patch(`/alerts/${id}/acknowledge`),
}

// Work Orders
export const workOrdersApi = {
  list: (filters?: Record<string, string>) =>
    api.get('/work-orders', { params: filters }),
  stats: () => api.get('/work-orders/stats'),
  create: (data: unknown) => api.post('/work-orders', data),
  update: (id: string, data: unknown) => api.patch(`/work-orders/${id}`, data),
}

// Capital Projects
export const capitalApi = {
  list: () => api.get('/capital'),
  stats: () => api.get('/capital/stats'),
}

// AI Agents
export const agentsApi = {
  all: () => api.get('/agents'),
  briefing: () => api.get('/agents/briefing'),
  chat: (message: string, history: unknown[]) =>
    api.post('/agents/chat', { message, history }),
}

// Environment
export const environmentApi = {
  air: () => api.get('/environment/air'),
  water: () => api.get('/environment/water'),
  wildfire: () => api.get('/environment/wildfire'),
  flood: () => api.get('/environment/flood'),
}

// Traffic
export const trafficApi = {
  current: () => api.get('/traffic'),
  hourly: () => api.get('/traffic/hourly'),
  intersections: () => api.get('/traffic/intersections'),
  heatgrid: () => api.get('/traffic/heatgrid'),
}
