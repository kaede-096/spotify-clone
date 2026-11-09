import React from 'react'
import SpotifyLogo from '../components/SpotifyLogo'

export default function LoginPage({ onLogin, onGoSignup }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
      <SpotifyLogo size={60} />
      <h1 style={{ marginTop: 24, marginBottom: 24, fontSize: '28px', fontWeight: 'bold' }}>Log in to Spotify</h1>
      <button onClick={onLogin} style={{ padding: '14px 48px', background: '#1DB954', color: '#000', borderRadius: 50, fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: 16 }}>
        Log In
      </button>
      <p style={{ marginTop: 32, color: 'var(--text-secondary)' }}>
        Don't have an account? <button onClick={onGoSignup} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold', fontSize: 16 }}>Sign up</button>
      </p>
    </div>
  )
}