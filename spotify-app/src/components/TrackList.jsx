import React from 'react'
import { usePlayer } from '../context/PlayerContext'

export default function TrackList() {
  const { songs, playSong, currentSong } = usePlayer()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {songs.map((song) => (
        <div 
          key={song._id} 
          onClick={() => playSong(song)}
          style={{ 
            display: 'flex', alignItems: 'center', padding: '12px 16px', cursor: 'pointer',
            // Static background state (Active = 0.1 opacity, Inactive = transparent)
            background: currentSong?._id === song._id ? 'rgba(255,255,255,0.1)' : 'transparent',
            borderRadius: '4px',
            transition: 'background 0.2s ease',
            border: currentSong?._id === song._id ? '1px solid rgba(255,255,255,0.1)' : 'none'
          }}
        >
          <img 
            src={song.image ? encodeURI(song.image) : "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2"} 
            alt={song.name}
            style={{ width: 40, height: 40, borderRadius: 4, marginRight: 16, objectFit: 'cover' }} 
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2"; 
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: currentSong?._id === song._id ? '#1DB954' : '#fff', fontWeight: 500, fontSize: 16 }}>
                {song.name}
            </span>
            <span style={{ color: '#b3b3b3', fontSize: 14, marginTop: 4 }}>
                {song.artist || song.desc || 'Unknown Artist'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}