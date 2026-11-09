import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Sun, Moon } from 'lucide-react'
import SpotifyLogo from '../components/SpotifyLogo'
import { useTheme } from '../context/ThemeContext'

export default function SignupPage({ onSignup, onGoLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const containerRef = useRef(null)
  const cardRef = useRef(null)
  const logoRef = useRef(null)
  const themeBtnRef = useRef(null)

  const handleThemeToggle = () => {
    gsap.to(themeBtnRef.current, {
      rotate: 180, duration: 0.4, ease: 'back.out(2)',
      onComplete: () => gsap.set(themeBtnRef.current, { rotate: 0 }),
    })
    toggleTheme()
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0, y: 40, scale: 0.96 })
      gsap.set(logoRef.current, { opacity: 0, y: -20 })
      const tl = gsap.timeline()
      tl.to(logoRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .to(cardRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'expo.out' }, '-=0.2')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const handleSignup = (e) => {
    e.preventDefault()
    if (!name || !email || !password) { setError('Please fill in all fields.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    setError('')

    gsap.to('.signup-btn', { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 })

    setTimeout(() => {
      setLoading(false)
      gsap.to(cardRef.current, {
        opacity: 0, y: -30, duration: 0.4, ease: 'power3.inOut',
        onComplete: () => onSignup()
      })
    }, 900)
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px',
    background: 'var(--bg-input)', color: 'var(--text-primary)',
    border: '1px solid var(--border)', borderRadius: 6,
    fontSize: 14, transition: 'border 0.2s',
  }

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh', background: 'var(--bg-secondary)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '24px', position: 'relative',
        overflowY: 'auto',
        transition: 'background 0.4s ease',
      }}
    >
      <button
        ref={themeBtnRef}
        onClick={handleThemeToggle}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          position: 'absolute', top: 20, right: 20,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          color: 'var(--text-secondary)', cursor: 'pointer',
          width: 38, height: 38, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'color 0.3s, border-color 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#1DB954'; e.currentTarget.style.borderColor = '#1DB954' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)' }}
      >
        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
      </button>

      <div ref={logoRef} style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <SpotifyLogo size={48} />
        <span style={{ color: 'var(--text-primary)', fontSize: 22, fontWeight: 900, letterSpacing: '-0.5px' }}>Spotify</span>
      </div>

      <div
        ref={cardRef}
        style={{
          background: 'var(--bg-card)', borderRadius: 16,
          padding: '40px 36px', width: '100%', maxWidth: 400,
          boxShadow: '0 8px 48px var(--shadow)',
          border: '1px solid var(--border)',
          marginBottom: 24,
        }}
      >
        <h1 style={{ color: 'var(--text-primary)', fontSize: 26, fontWeight: 900, marginBottom: 32, textAlign: 'center' }}>
          Sign up for free
        </h1>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              What's your name?
            </label>
            <input
              value={name} onChange={e => setName(e.target.value)}
              placeholder="Enter your profile name"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#1DB954'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              What's your email?
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#1DB954'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              Create a password
            </label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Create a password"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#1DB954'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {error && <p style={{ color: '#e74c3c', fontSize: 13, textAlign: 'center' }}>{error}</p>}

          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
            style={{
              marginTop: 8,
              background: '#1DB954', color: '#000',
              fontWeight: 700, fontSize: 15, padding: '14px',
              borderRadius: 500, cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'background 0.15s',
              letterSpacing: '0.5px',
              border: 'none',
            }}
            onMouseEnter={e => !loading && (e.target.style.background = '#1ed760')}
            onMouseLeave={e => e.target.style.background = '#1DB954'}
          >
            {loading ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 28, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            Already have an account?{' '}
            <button
              onClick={onGoLogin}
              style={{
                background: 'none', color: 'var(--text-primary)',
                fontWeight: 700, fontSize: 14, border: 'none',
                textDecoration: 'underline', cursor: 'pointer',
              }}
            >
              Log in here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}