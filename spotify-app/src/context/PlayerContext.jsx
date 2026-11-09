import React, { createContext, useRef, useState, useEffect, useContext } from 'react';

export const PlayerContext = createContext();

// Awtomatikong gagamitin ang VITE_BACKEND_URL mula sa Vercel Environment Variables, o localhost kung local dev
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLyricsActive, setIsLyricsActive] = useState(false);
  const [currentLyrics, setCurrentLyrics] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/songs`);
        const data = await response.json();
        setSongs(data);
      } catch (error) { 
        console.error("Error fetching songs:", error); 
      }
    };
    fetchSongs();
  }, []);

  const playSong = async (song) => {
    if (!song || !song.file) return;
    if (currentSong?._id === song._id) {
      togglePlay();
    } else {
      setCurrentLyrics([]);
      let audioUrl = song.file;
      
      // I-format ang URL para gumana sa parehong local at live backend (Render)
      if (audioUrl.startsWith('http://localhost:5000')) {
        audioUrl = audioUrl.replace('http://localhost:5000', API_URL);
      } else if (!audioUrl.startsWith('http')) {
        audioUrl = `${API_URL}${audioUrl.startsWith('/') ? '' : '/'}${audioUrl}`;
      }

      audioRef.current.src = audioUrl;
      try {
        setCurrentSong(song);
        setIsPlaying(true);
        await audioRef.current.play();
        const lyricsResponse = await fetch(`${API_URL}/api/songs/${song._id}/lyrics`);
        const lyricsData = await lyricsResponse.json();
        setCurrentLyrics(lyricsData);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Play interrupted:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const index = songs.findIndex(s => s._id === currentSong?._id);
    if (index < songs.length - 1) playSong(songs[index + 1]);
  };

  const playPrev = () => {
    const index = songs.findIndex(s => s._id === currentSong?._id);
    if (index > 0) playSong(songs[index - 1]);
  };

  const updateVolume = (val) => { audioRef.current.volume = val; };

  const seekSong = (val) => {
    if (!audioRef.current.duration) return;
    const time = (val / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
    setProgress(val);
  };

  const seekToTime = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      if (audioRef.current.duration) {
        setProgress((seconds / audioRef.current.duration) * 100);
      }
    }
  };

  const toggleLyrics = () => setIsLyricsActive(!isLyricsActive);

  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const handleEnded = () => playNext();
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [songs, currentSong]);

  return (
    <PlayerContext.Provider value={{
      songs, currentSong, isPlaying, playSong, togglePlay,
      playNext, playPrev, updateVolume, progress, seekSong, seekToTime,
      currentTime, duration, isLyricsActive, toggleLyrics,
      currentLyrics
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);