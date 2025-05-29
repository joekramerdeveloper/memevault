// backend/routes/memes.js
const express = require('express');
const router = express.Router();
const Meme = require('../models/Meme');

router.get('/', async (req, res) => {
  const memes = await Meme.find().sort({ date: -1 });
  res.json(memes);
});

router.post('/', async (req, res) => {
  const meme = await Meme.create(req.body);
  res.json(meme);
});

router.delete('/:id', async (req, res) => {
  await Meme.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
