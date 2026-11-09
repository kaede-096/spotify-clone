import React, { useEffect, useRef } from 'react'
import { Moon, Sun } from 'lucide-react'
import gsap from 'gsap'
import Sidebar from '../components/Sidebar'
import PlayerBar from '../components/PlayerBar'
import TrackList from '../components/TrackList'
import { useTheme } from '../context/ThemeContext'
import { usePlayer } from '../context/PlayerContext' 
import './AppPage.css'

export default function AppPage({ onLogout }) {
  const { theme, toggleTheme } = useTheme()
  const { isLyricsActive, currentLyrics, currentTime, seekToTime, currentSong } = usePlayer()
  const lyricsContainerRef = useRef(null)

  let activeIdx = -1;
  if (currentLyrics && currentLyrics.length > 0) {
    for (let i = 0; i < currentLyrics.length; i++) {
      const lyricTime = Number(currentLyrics[i].time);
      if (currentTime >= lyricTime) {
        activeIdx = i;
      }
    }
  }

  useEffect(() => {
    if (isLyricsActive && lyricsContainerRef.current) {
      const activeElement = lyricsContainerRef.current.querySelector('.active-lyric');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeIdx, isLyricsActive]);

  useEffect(() => {
    if (isLyricsActive && currentLyrics && currentLyrics.length > 0) {
      gsap.fromTo(".lyric-line", { opacity: 0 }, { opacity: 0.3, stagger: 0.02, duration: 0.4, ease: "power1.out" })
    }
  }, [isLyricsActive, currentLyrics])

  const songBackgroundColor = currentSong?.color || 'var(--bg-base)';

  return (
    <div className="app-container">
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <Sidebar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <header className="app-header">
              <button onClick={onLogout} className="logout-btn">Log out</button>
              <button onClick={toggleTheme} style={{ background: 'transparent', border: 'none', color: theme === 'light' ? '#000' : '#fff', cursor: 'pointer' }}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </header>
            <div style={{ padding: '24px', flex: 1 }}>
              <TrackList />
            </div>
          </div>
          <div className={`lyrics-overlay ${isLyricsActive ? 'active' : ''}`}>
            <div className="lyrics-bg-blur" style={{ background: songBackgroundColor }} />
            <div className="lyrics-scroll-container" ref={lyricsContainerRef}>
              <div className="lyrics-content">
                {currentLyrics && currentLyrics.length > 0 ? (
                  currentLyrics.map((lyric, idx) => (
                    <p 
                      key={idx} 
                      className={`lyric-line ${idx === activeIdx ? 'active-lyric' : ''}`}
                      onClick={() => seekToTime(Number(lyric.time))} 
                    >
                      {lyric.text}
                    </p>
                  ))
                ) : (
                  <p className="lyric-line active-lyric" style={{ opacity: 1, color: '#fff' }}>
                    Walang lyrics na available sa ngayon.
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <PlayerBar />
    </div>
  )
}