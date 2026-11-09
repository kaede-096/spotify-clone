import React from 'react'
import { Home, Search, Library, Plus } from 'lucide-react'
import SpotifyLogo from './SpotifyLogo'

export default function Sidebar({ onAddSong }) {
  return (
    <div style={{
      background: 'var(--sidebar-bg)',
      width: 240, flexShrink: 0,
      display: 'flex', flexDirection: 'column',
      padding: '12px 8px 8px',
      transition: 'background 0.4s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', marginBottom: 8 }}>
        <SpotifyLogo size={28} />
        <span style={{ color: 'var(--text-primary)', fontSize: 18, fontWeight: 900, letterSpacing: '-0.3px' }}>
          Spotify
        </span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 16 }}>
        {[
          { icon: Home, label: 'Home', active: true },
          { icon: Search, label: 'Search', active: false },
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '10px 12px', borderRadius: 8,
              background: active ? 'var(--bg-hover)' : 'none',
              color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: 600, fontSize: 14,
              transition: 'background 0.15s, color 0.15s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 2} />
            {label}
          </button>
        ))}
      </nav>

      <div style={{
        background: 'var(--bg-card)', borderRadius: 10,
        flex: 1, padding: '8px 0',
        transition: 'background 0.4s ease',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '6px 12px 10px',
        }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Library size={20} />
            Your Library
          </span>
          <button
            onClick={onAddSong}
            title="Add song"
            style={{
              background: 'none', color: 'var(--text-secondary)',
              width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'color 0.15s, background 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-hover)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'none' }}
          >
            <Plus size={20} />
          </button>
        </div>

        <div style={{ padding: '4px 12px' }}>
          <div style={{
            background: 'var(--bg-hover)', borderRadius: 8,
            padding: '12px', cursor: 'pointer',
            transition: 'background 0.15s',
          }}>
            <p style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
              My Playlist
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12 }}>Playlist • You</p>
          </div>
        </div>
      </div>
    </div>
  )
}