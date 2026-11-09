const mongoose = require('mongoose');

const lyricSchema = new mongoose.Schema({
  time: { type: Number, required: true },
  text: { type: String, required: true }
}, { _id: false }); 

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  file: { type: String, required: true },
  color: { type: String, required: true },
  lyrics: [lyricSchema]
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);