const mongoose = require('mongoose');
const Song = require('../models/Song'); 
require('dotenv').config();

const songsData = [
  { name: 'Blinding Lights', desc: 'The Weeknd', image: 'http://localhost:5000/assets/Blinding Lights/Blinding Lights.png', file: 'http://localhost:5000/assets/Blinding Lights/The Weeknd - Blinding Lights (Official Audio).mp3', color: 'linear-gradient(180deg, #741114 0%, #200405 100%)', lyrics: [] },
  { name: 'As It Was', desc: 'Harry Styles', image: 'http://localhost:5000/assets/as it was/As it was.png', file: 'http://localhost:5000/assets/as it was/Harry Styles - As It Was (Lyrics).mp3', color: 'linear-gradient(180deg, #1e3d59 0%, #0f1e2b 100%)', lyrics: [] },
  { name: 'Stay', desc: 'The Kid LAROI, Justin Bieber', image: 'http://localhost:5000/assets/Stay/Stay.png', file: 'http://localhost:5000/assets/Stay/The Kid LAROI, Justin Bieber - Stay (Lyrics).mp3', color: 'linear-gradient(180deg, #2b86c5 0%, #0d324d 100%)', lyrics: [] },
  { name: 'BOOMPALA', desc: 'LE SSERAFIM', image: 'http://localhost:5000/assets/Boompala/Boompala.png', file: 'http://localhost:5000/assets/Boompala/LE SSERAFIM (르세라핌) BOOMPALA (Color Coded Lyrics).mp3', color: 'linear-gradient(180deg, #b02a5c 0%, #2e0b18 100%)', lyrics: [] },
  { name: 'Smart', desc: 'LE SSERAFIM', image: 'http://localhost:5000/assets/Smart/Smart.png', file: 'http://localhost:5000/assets/Smart/LE SSERAFIM Smart Lyrics.mp3', color: 'linear-gradient(180deg, #8e9e2f 0%, #2c3b12 100%)', lyrics: [] },
  { name: 'Love Me Harder', desc: 'Ariana Grande & ft. The Weeknd', image: 'http://localhost:5000/assets/love me harder/Love Me Harder.png', file: 'http://localhost:5000/assets/love me harder/Ariana Grande - Love Me Harder (Lyrics) ft. The Weeknd.mp3', color: 'linear-gradient(180deg, #595959 0%, #111111 100%)', lyrics: [] },
  { name: 'Nightly', desc: '(feat. Fly By Midnight) - 1989', image: 'http://localhost:5000/assets/nightly 1989/nightly 1989.png', file: 'http://localhost:5000/assets/nightly 1989/Nightly (feat. Fly By Midnight) - 1989 (Official Lyric Video).mp3', color: 'linear-gradient(180deg, #9d4edd 0%, #240046 100%)', lyrics: [] },
  { name: 'The Fate of Ophelia', desc: 'Taylor Swift', image: 'http://localhost:5000/assets/The Fate of Ophelia/The Fate of Ophelia.png', file: 'http://localhost:5000/assets/The Fate of Ophelia/Taylor Swift - The Fate of Ophelia.mp3', color: 'linear-gradient(180deg, #14746f 0%, #032523 100%)', lyrics: [] },
  { name: 'Daylight', desc: 'Taylor Swift', image: 'http://localhost:5000/assets/daylight/daylight.png', file: 'http://localhost:5000/assets/daylight/Taylor Swift - Daylight (Official Audio).mp3', color: 'linear-gradient(180deg, #f3c68f 0%, #462c03 100%)', lyrics: [] },
  { name: 'After LIKE', desc: 'IVE', image: 'http://localhost:5000/assets/after Like/After LIKE.png', file: 'http://localhost:5000/assets/after Like/IVE After LIKE Lyrics (아이브 After LIKE 가사) (Color Coded Lyrics).mp3', color: 'linear-gradient(180deg, #3a0ca3 0%, #0a012c 100%)', lyrics: [] },
  { name: 'Perfect Night', desc: 'LE SSERAFIM', image: 'http://localhost:5000/assets/Perfect Night/Perfect Night.png', file: 'http://localhost:5000/assets/Perfect Night/LE SSERAFIM (르세라핌) Perfect Night (Color Coded Lyrics).mp3', color: 'linear-gradient(180deg, #4cc9f0 0%, #0b2545 100%)', lyrics: [] },
  { name: 'Drag Path', desc: 'twenty one pilots', image: 'http://localhost:5000/assets/Drag Path/Drag Path.png', file: 'http://localhost:5000/assets/Drag Path/Drag Path.mp3', color: 'linear-gradient(180deg, #d62828 0%, #1c0505 100%)', lyrics: [] },
  { name: 'The Line', desc: 'twenty one pilots', image: 'http://localhost:5000/assets/The Line/The Line.png', file: 'http://localhost:5000/assets/The Line/Twenty One Pilots - The Line (from Arcane Season 2) [Official Audio].mp3', color: 'linear-gradient(180deg, #4361ee 0%, #0b1340 100%)', lyrics: [] },
  { name: 'What Did I Do', desc: 'Arthur Nery', image: 'http://localhost:5000/assets/what did i do/What Did I Do.png', file: 'http://localhost:5000/assets/what did i do/Arthur Nery- What Did I Do (Official Text Performance Film).mp3', color: 'linear-gradient(180deg, #8a5a44 0%, #2c1a11 100%)', lyrics: [] },
  { name: 'back to friends', desc: 'sombr', image: 'http://localhost:5000/assets/back to friends/back to friends.png', file: 'http://localhost:5000/assets/back to friends/sombr - back to friends (official video).mp3', color: 'linear-gradient(180deg, #4a5759 0%, #111617 100%)', lyrics: [] },
  { name: 'seasons', desc: 'wave to earth', image: 'http://localhost:5000/assets/seasons/seasons.png', file: 'http://localhost:5000/assets/seasons/wave to earth - seasons (Lyrics).mp3', color: 'linear-gradient(180deg, #d4a373 0%, #3d2612 100%)', lyrics: [] },
  { name: 'undressed', desc: 'sombr', image: 'http://localhost:5000/assets/undressed/undressed.png', file: 'http://localhost:5000/assets/undressed/sombr - undressed (official lyric video).mp3', color: 'linear-gradient(180deg, #3d5a80 0%, #0f1b29 100%)', lyrics: [] },
  { name: 'swim', desc: 'BTS', image: 'http://localhost:5000/assets/SWIM/SWIM.png', file: 'http://localhost:5000/assets/SWIM/SWIM.mp3', color: 'linear-gradient(180deg, #0077b6 0%, #03045e 100%)', lyrics: [] },
  { name: 'Love Me Not', desc: 'Ravyn Lenae', image: 'http://localhost:5000/assets/Love Me Not/Love Me Not.png', file: 'http://localhost:5000/assets/Love Me Not/Ravyn Lenae - Love Me Not.mp3', color: 'linear-gradient(180deg, #e07a5f 0%, #3d1308 100%)', lyrics: [] },
  { name: 'supernatural', desc: 'Ariana Grande', image: 'http://localhost:5000/assets/supernatural/supernatural.png', file: 'http://localhost:5000/assets/supernatural/Ariana Grande - supernatural (lyric visualizer).mp3', color: 'linear-gradient(180deg, #b388eb 0%, #2c114d 100%)', lyrics: [] },
  { name: 'Soft Spot', desc: 'keshi', image: 'http://localhost:5000/assets/Soft Spot/soft spot.png', file: 'http://localhost:5000/assets/Soft Spot/Soft Spot.mp3', color: 'linear-gradient(180deg, #83c5be 0%, #143634 100%)', lyrics: [] },
  { name: 'Like a Rose', desc: 'a1', image: 'http://localhost:5000/assets/Like a Rose/Like a Rose.png', file: 'http://localhost:5000/assets/Like a Rose/Like a Rose.mp3', color: 'linear-gradient(180deg, #9e0059 0%, #2b0018 100%)', lyrics: [] },
  { name: 'Your Love', desc: 'JISOO', image: 'http://localhost:5000/assets/Your Love/Your Love.png', file: 'http://localhost:5000/assets/Your Love/JISOO - Your Love (Official Audio).mp3', color: 'linear-gradient(180deg, #ff85a1 0%, #4a0e17 100%)', lyrics: [] },
  { name: 'EYES CLOSED', desc: 'JISOO X ZAYN', image: 'http://localhost:5000/assets/EYES CLOSED/EYES CLOSED.png', file: 'http://localhost:5000/assets/EYES CLOSED/JISOO X ZAYN - EYES CLOSED (OFFICIAL LYRIC VIDEO).mp3', color: 'linear-gradient(180deg, #560bad 0%, #140126 100%)', lyrics: [] },
  { name: 'Supernova Love', desc: 'IVE, David Guetta', image: 'http://localhost:5000/assets/Supernova Love/Supernova Love.png', file: 'http://localhost:5000/assets/Supernova Love/IVE, David Guetta - Supernova Love (Official Lyric Video).mp3', color: 'linear-gradient(180deg, #7209b7 0%, #10002b 100%)', lyrics: [] },
  { name: 'Sour Grapes', desc: 'LE SSERAFIM', image: 'http://localhost:5000/assets/Sour Grapes/Sour Grapes.png', file: 'http://localhost:5000/assets/Sour Grapes/LE SSERAFIM (르세라핌) - Sour Grapes Lyrics (HanRomEngColor CodedLyrics가사)  bingsoosh.mp3', color: 'linear-gradient(180deg, #a7c957 0%, #1a2e05 100%)', lyrics: [] }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await Song.deleteMany({}); 
    await Song.insertMany(songsData);
    
    console.log('✨ Successfully Seeded Songs with Exact Folder Structures to MongoDB Atlas!');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDB();