// models/Meme.js
const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  date: Date
});

module.exports = mongoose.model('Meme', memeSchema);
