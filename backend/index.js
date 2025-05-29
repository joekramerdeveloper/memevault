// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Meme = require('./models/Meme'); // ✅ Import the Meme model

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.get('/memes', async (req, res) => {
  try {
    const memes = await Meme.find().sort({ date: -1 });
    res.json(memes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch memes' });
  }
});

app.post('/memes', async (req, res) => {
  try {
    const meme = await Meme.create(req.body);
    res.status(201).json(meme);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create meme' });
  }
});

app.delete('/memes/:id', async (req, res) => {
  try {
    await Meme.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: 'Meme not found' });
  }
});

app.listen(3000, () => console.log("API running on port 3000"));
