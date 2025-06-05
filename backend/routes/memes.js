// backend/routes/memes.js
const express = require('express');
const router = express.Router();
const Meme = require('../models/Meme');

// GET all memes
router.get('/', async (req, res) => {
  console.log("GET /memes called");
  try {
    const memes = await Meme.find().sort({ date: -1 });
    console.log("Sending memes:", memes);
    res.json(memes);
  } catch (err) {
    console.error("GET /memes error:", err);
    res.status(500).json({ error: "Failed to fetch memes" });
  }
});

// POST a meme
router.post('/', async (req, res) => {
  console.log("POST /memes called with:", req.body);
  try {
    const meme = await Meme.create(req.body);
    res.json(meme);
  } catch (err) {
    console.error("POST /memes error:", err);
    res.status(400).json({ error: "Failed to create meme" });
  }
});

// DELETE a meme
router.delete('/:id', async (req, res) => {
  console.log("DELETE /memes called for ID:", req.params.id);
  try {
    await Meme.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error("DELETE /memes error:", err);
    res.status(400).json({ error: "Failed to delete meme" });
  }
});

module.exports = router;
