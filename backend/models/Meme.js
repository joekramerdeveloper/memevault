// models/Meme.js
const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  url: String,
  caption: String,
  date: Date
});

module.exports = mongoose.model('Meme', memeSchema);
