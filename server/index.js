const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error(" MongoDB connection error:", err));

// Define the Schema (Blueprint for your data)
const placeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: String,
  tags: [String],
  image: String,
  groupSize: [String]
});

const Place = mongoose.model('Place', placeSchema);

// API Route to get places
app.get('/api/places', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));