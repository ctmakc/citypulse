'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api'
import Icon from '@/components/ui/Icon'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@meridian.city')
  const [password, setPassword] = useState('citypulse2026')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await authApi.login(email, password)
      localStorage.setItem('citypulse_token', res.data.access_token)
      router.push('/overview')
    } catch {
      setError('Invalid credentials. Try admin@meridian.city / citypulse2026')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      height: '100vh', display: 'flex', background: 'var(--paper)',
      fontFamily: 'var(--grotesk)',
    }}>
      {/* Left panel — dark brand */}
      <div style={{
        width: '45%', background: 'var(--ink)', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 60, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: 'rgba(255,255,255,.1)',
            display: 'grid', placeItems: 'center', color: '#fff', margin: '0 auto 20px',
          }}>
            <Icon name="assets" size={26} strokeWidth={1.5} />
          </div>
          <div className="serif" style={{ fontSize: 34, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Meridian
          </div>
          <div className="code" style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 6, letterSpacing: '0.12em' }}>
            Civil OS · CityPulse
          </div>
          <p style={{ marginTop: 24, fontSize: 14, color: 'rgba(255,255,255,.55)', lineHeight: 1.6, maxWidth: 300 }}>
            AI-powered operating system for resilient cities. Infrastructure intelligence, digital twin and climate risk in one platform.
          </p>
        </div>
      </div>

      {/* Right panel — login form */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60,
      }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <h1 className="serif" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 6 }}>
            Sign in
          </h1>
          <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginBottom: 32 }}>
            Sign in to your Meridian operations portal
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="cap" style={{ display: 'block', marginBottom: 6, fontSize: 10 }}>Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                style={{
                  width: '100%', height: 42, padding: '0 14px',
                  border: '1px solid var(--rule)', borderRadius: 'var(--r-sm)',
                  fontSize: 13.5, outline: 'none', boxSizing: 'border-box',
                  background: 'var(--surface)',
                }}
              />
            </div>
            <div>
              <label className="cap" style={{ display: 'block', marginBottom: 6, fontSize: 10 }}>Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)} required
                style={{
                  width: '100%', height: 42, padding: '0 14px',
                  border: '1px solid var(--rule)', borderRadius: 'var(--r-sm)',
                  fontSize: 13.5, outline: 'none', boxSizing: 'border-box',
                  background: 'var(--surface)',
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: '10px 14px', borderRadius: 'var(--r-sm)',
                background: 'var(--red-wash)', border: '1px solid var(--red)',
                fontSize: 12.5, color: 'var(--red)',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="btn"
              style={{ width: '100%', justifyContent: 'center', height: 44, fontSize: 14, marginTop: 8 }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="code" style={{ marginTop: 24, fontSize: 10, textAlign: 'center', color: 'var(--ink-faint)' }}>
            Demo: admin@meridian.city / citypulse2026
          </div>
        </div>
      </div>
    </div>
  )
}
