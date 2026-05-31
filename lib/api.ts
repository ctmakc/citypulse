import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3096/api/v1'

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 8000,
})

// Returns token from localStorage (client-only)
export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('citypulse_token')
}

export function isLoggedIn(): boolean {
  return !!getToken()
}

// Auto-attach JWT token on every request
api.interceptors.request.use(config => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Suppress 401 console noise — portal screens use static fallback anyway
api.interceptors.response.use(
  res => res,
  err => {
    if (err?.response?.status === 401) {
      // Silent 401 — caller .catch(() => {}) handles it
      return Promise.reject(err)
    }
    return Promise.reject(err)
  }
)

// Helper: only call API if logged in, otherwise skip silently
function ifAuth<T>(fn: () => Promise<T>): Promise<T> {
  if (!isLoggedIn()) return Promise.reject(new Error('not_authenticated'))
  return fn()
}

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
  logout: () => {
    if (typeof window !== 'undefined') localStorage.removeItem('citypulse_token')
  },
}

// Dashboard — guarded so no 401 spam when not logged in
export const dashboardApi = {
  overview: () => ifAuth(() => api.get('/dashboard/overview')),
  alerts:   () => ifAuth(() => api.get('/dashboard/alerts')),
}

// Assets
export const assetsApi = {
  list:     (filters?: Record<string, string>) => ifAuth(() => api.get('/assets', { params: filters })),
  map:      () => ifAuth(() => api.get('/assets/map')),
  stats:    () => ifAuth(() => api.get('/assets/stats')),
  get:      (id: string) => ifAuth(() => api.get(`/assets/${id}`)),
  readings: (id: string) => ifAuth(() => api.get(`/assets/${id}/readings`)),
  create:   (data: unknown) => ifAuth(() => api.post('/assets', data)),
  update:   (id: string, data: unknown) => ifAuth(() => api.patch(`/assets/${id}`, data)),
}

// 311 Reports
export const reports311Api = {
  list:         (filters?: Record<string, string>) => ifAuth(() => api.get('/reports311', { params: filters })),
  stats:        () => ifAuth(() => api.get('/reports311/stats')),
  submit:       (data: unknown) => api.post('/reports311', data), // public
  updateStatus: (id: string, status: string) => ifAuth(() => api.patch(`/reports311/${id}/status`, { status })),
}

// Alerts
export const alertsApi = {
  list:        () => ifAuth(() => api.get('/alerts')),
  stats:       () => ifAuth(() => api.get('/alerts/stats')),
  acknowledge: (id: string) => ifAuth(() => api.patch(`/alerts/${id}/acknowledge`)),
}

// Work Orders
export const workOrdersApi = {
  list:   (filters?: Record<string, string>) => ifAuth(() => api.get('/work-orders', { params: filters })),
  stats:  () => ifAuth(() => api.get('/work-orders/stats')),
  create: (data: unknown) => ifAuth(() => api.post('/work-orders', data)),
  update: (id: string, data: unknown) => ifAuth(() => api.patch(`/work-orders/${id}`, data)),
}

// Capital
export const capitalApi = {
  list:  () => ifAuth(() => api.get('/capital')),
  stats: () => ifAuth(() => api.get('/capital/stats')),
}

// AI Agents
export const agentsApi = {
  all:      () => ifAuth(() => api.get('/agents')),
  briefing: () => ifAuth(() => api.get('/agents/briefing')),
  chat:     (message: string, history: unknown[]) =>
    ifAuth(() => api.post('/agents/chat', { message, history })),
}

// Environment
export const environmentApi = {
  air:      () => ifAuth(() => api.get('/environment/air')),
  water:    () => ifAuth(() => api.get('/environment/water')),
  wildfire: () => ifAuth(() => api.get('/environment/wildfire')),
  flood:    () => ifAuth(() => api.get('/environment/flood')),
}

// Traffic
export const trafficApi = {
  current:       () => ifAuth(() => api.get('/traffic')),
  hourly:        () => ifAuth(() => api.get('/traffic/hourly')),
  intersections: () => ifAuth(() => api.get('/traffic/intersections')),
  heatgrid:      () => ifAuth(() => api.get('/traffic/heatgrid')),
}
