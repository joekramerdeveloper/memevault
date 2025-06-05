const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const memeRoutes = require('./routes/memes');
    app.use('/memes', memeRoutes);

    app.get('/ping', (req, res) => {
      res.send('pong');
    });

    app.listen(3001, () => console.log("API running on port 3001"));

  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });
