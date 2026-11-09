const express = require('express');
const router = express.Router();
const Song = require('../models/Song'); 
const axios = require('axios'); 

// HELPER FUNCTION: Convert LRC string to schema format
function parseLrcToSchema(lrcString) {
  if (!lrcString) return [];
  const lines = lrcString.split('\n');
  const parsedLyrics = [];
  const timeRegex = /\[(\d+):(\d+)(?:\.(\d+))?\]/;

  for (let line of lines) {
    const match = timeRegex.exec(line);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = match[3] ? parseInt(match[3].padEnd(3, '0').substring(0, 3), 10) : 0;
      const totalSeconds = minutes * 60 + seconds + (milliseconds / 1000);
      const text = line.replace(timeRegex, '').trim();
      
      if (text) {
        parsedLyrics.push({ time: Math.round(totalSeconds * 100) / 100, text: text });
      }
    }
  }
  return parsedLyrics;
}

router.get('/', async (req, res) => {
  try {
    const songs = await Song.find({});
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error pulling songs from database', error: error.message });
  }
});

router.get('/:id/lyrics', async (req, res) => { 
  try {
    const song = await Song.findById(req.params.id); 
    if (!song) return res.status(404).json({ message: 'Song not found' }); 

    // 1. KUNG MAY LYRICS NA SA DATABASE (Gaya ng Beast na nai-seed natin), ITO AGAD ANG IBABALIK
    if (song.lyrics && song.lyrics.length > 2) { 
      console.log(`✅ Using perfectly synced database lyrics for: ${song.name}`);
      return res.status(200).json(song.lyrics); 
    }

    // 2. KUNG WALANG LYRICS SA DB, DITO LANG MAG-SE-SEARCH SA LRCLIB
    const cleanSearchQuery = `${song.name} ${song.desc}`
        .replace(/ft\.|feat\.|&|\(.*?\)|\[.*?\]|color coded|lyrics|official/gi, '')
        .trim();
        
    console.log(`🔍 Searching full lyrics via LRCLIB for: ${cleanSearchQuery}`);

    const lrclibUrl = `https://lrclib.net/api/search?q=${encodeURIComponent(cleanSearchQuery)}`;
    
    try {
      const apiResponse = await axios.get(lrclibUrl);
      const data = apiResponse.data;
      
      const bestMatch = data.find(track => track.syncedLyrics);

      if (bestMatch && bestMatch.syncedLyrics) {
        const rawLyrics = parseLrcToSchema(bestMatch.syncedLyrics);
        
        song.lyrics = rawLyrics;
        await song.save(); 
        console.log(`💾 Successfully cached full synced lyrics for ${song.name}.`);
        
        return res.status(200).json(rawLyrics);
      } 
      else if (data.length > 0 && data[0].plainLyrics) {
        const fakeSyncLyrics = data[0].plainLyrics.split('\n').map((line, index) => ({
          time: index * 4, 
          text: line.trim()
        })).filter(item => item.text);
        
        console.log(`⚠️ Returning unsynced fallback lyrics for ${song.name} (Not cached in DB)`);
        return res.status(200).json(fakeSyncLyrics);
      }
    } catch (apiErr) {
      console.error("LRCLIB API Error:", apiErr.message); 
    }

    const fallbackLyrics = [ 
      { time: 0, text: `🎵 Playing: ${song.name} 🎵` }, 
      { time: 3, text: "Walang nakasave o nahanap na lyrics para sa kantang ito." } 
    ];
    res.status(200).json(fallbackLyrics); 

  } catch (error) { 
    res.status(500).json({ message: 'Error managing lyrics', error: error.message }); 
  }
});

module.exports = router;