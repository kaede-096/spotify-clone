import React, { useState, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { 
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, 
  Mic2, ListMusic, MonitorSpeaker, Volume2, Maximize2 
} from 'lucide-react';

export default function PlayerBar() {
  const { 
    currentSong, isPlaying, togglePlay, playNext, playPrev, updateVolume, 
    progress, seekSong, currentTime, duration, isLyricsActive, toggleLyrics 
  } = usePlayer();
  const [localVolume, setLocalVolume] = useState(70);

  useEffect(() => {
    updateVolume(localVolume / 100);
  }, [localVolume, updateVolume]);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ 
      height: '90px', background: '#000', display: 'flex', alignItems: 'center', 
      justifyContent: 'space-between', padding: '0 16px', color: '#fff',
      borderTop: '1px solid #282828', zIndex: 20, position: 'relative'
    }}>
      
      {/* LEFT SECTION */}
      <div style={{ width: '30%', display: 'flex', alignItems: 'center', gap: '14px' }}>
        {currentSong ? (
          <>
            <img src={currentSong.image} style={{ width: 56, height: 56, borderRadius: '4px', objectFit: 'cover' }} alt="Cover" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>{currentSong.name}</span>
              <span style={{ fontSize: '12px', color: '#b3b3b3' }}>{currentSong.desc}</span>
            </div>
          </>
        ) : <div style={{ width: 56, height: 56, background: '#282828', borderRadius: '4px' }} />}
      </div>

      {/* CENTER SECTION */}
      <div style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Shuffle size={16} color="#b3b3b3" style={{ cursor: 'pointer' }} />
          <SkipBack size={20} fill="#fff" onClick={playPrev} style={{ cursor: 'pointer' }} />
          <div onClick={togglePlay} style={{ 
            width: 32, height: 32, borderRadius: '50%', background: '#fff', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' 
          }}>
            {isPlaying ? <Pause size={16} fill="#000" color="#000" /> : <Play size={16} fill="#000" color="#000" style={{ marginLeft: 2 }} />}
          </div>
          <SkipForward size={20} fill="#fff" onClick={playNext} style={{ cursor: 'pointer' }} />
          <Repeat size={16} color="#b3b3b3" style={{ cursor: 'pointer' }} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', fontSize: '11px', color: '#b3b3b3' }}>
          <span>{formatTime(currentTime)}</span>
          <input 
            type="range" min="0" max="100" 
            value={progress || 0} 
            onChange={(e) => seekSong(Number(e.target.value))}
            className="my-spotify-slider"
            style={{ flex: 1, '--slider-progress': `${progress || 0}%` }}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div style={{ width: '30%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
        <Mic2 
          size={18} 
          color={isLyricsActive ? '#1db954' : '#b3b3b3'} 
          onClick={toggleLyrics} 
          style={{ cursor: 'pointer' }} 
        />
        <ListMusic size={18} color="#b3b3b3" style={{ cursor: 'pointer' }} />
        <MonitorSpeaker size={18} color="#b3b3b3" style={{ cursor: 'pointer' }} />
        <Volume2 size={18} color="#b3b3b3" />
        <input 
          type="range" min="0" max="100" 
          value={localVolume} 
          onChange={(e) => setLocalVolume(Number(e.target.value))}
          className="my-spotify-slider"
          style={{ width: '93px', '--slider-progress': `${localVolume}%` }} 
        />
        <Maximize2 size={16} color="#b3b3b3" style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
}