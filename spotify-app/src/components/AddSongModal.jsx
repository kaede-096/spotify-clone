import React, { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'
import gsap from 'gsap'
import { usePlayer } from '../context/PlayerContext'

export default function AddSongModal({ onClose }) {
  const { addTrack } = usePlayer() // Note: make sure `addTrack` is defined in PlayerContext if you use it
  const [name, setName] = useState('')
  const [artist, setArtist] = useState('')
  const [dur, setDur] = useState('')
  const [emoji, setEmoji] = useState('')

  const overlayRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
      gsap.fromTo(cardRef.current, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'expo.out' })
    })
    return () => ctx.revert()
  }, [])

  const close = () => {
    gsap.to(cardRef.current, { opacity: 0, y: 20, scale: 0.96, duration: 0.25, ease: 'power3.in' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: onClose })
  }

  const handleAdd = () => {
    if (!name.trim() || !artist.trim()) return
    if(addTrack) addTrack({ name: name.trim(), artist: artist.trim(), dur: dur.trim() || '3:00', emoji: emoji.trim() || '🎵' })
    close()
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: 'var(--bg-input)', color: 'var(--text-primary)',
    border: '1px solid var(--border)', borderRadius: 8,
    fontSize: 14,
  }

  return (
    <div
      ref={overlayRef}
      onClick={e => e.target === overlayRef.current && close()}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        ref={cardRef}
        style={{
          background: 'var(--bg-card)', borderRadius: 16,
          padding: '32px 28px', width: '100%', maxWidth: 380,
          boxShadow: '0 16px 64px rgba(0,0,0,0.6)',
          border: '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: 20, fontWeight: 800 }}>Add a Song</h2>
          <button onClick={close} style={{ background: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <X size={22} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Song title" style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#1DB954'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
          <input value={artist} onChange={e => setArtist(e.target.value)} placeholder="Artist name" style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#1DB954'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
          <input value={dur} onChange={e => setDur(e.target.value)} placeholder="Duration (e.g. 3:24)" style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#1DB954'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
          <input value={emoji} onChange={e => setEmoji(e.target.value)} placeholder="Emoji cover (e.g. 🎸)" style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#1DB954'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />

          <button
            onClick={handleAdd}
            style={{
              marginTop: 6,
              background: '#1DB954', color: '#000',
              fontWeight: 700, fontSize: 15, padding: '13px',
              borderRadius: 500, cursor: 'pointer',
              transition: 'background 0.15s, transform 0.1s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1ed760'; e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1DB954'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Add to Playlist
          </button>
        </div>
      </div>
    </div>
  )
}