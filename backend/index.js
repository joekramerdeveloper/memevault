const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Meme model
const Meme = mongoose.model('Meme', {
  url: String,
  caption: String,
  date: Date
});

// Routes
app.get('/memes', async (req, res) => {
  const memes = await Meme.find().sort({ date: -1 });
  res.json(memes);
});

app.post('/memes', async (req, res) => {
  const meme = await Meme.create(req.body);
  res.json(meme);
});

app.delete('/memes/:id', async (req, res) => {
  await Meme.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(3000, () => console.log("API running on port 3000"));
