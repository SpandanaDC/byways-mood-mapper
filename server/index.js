const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads .env file if running locally

const app = express();
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
// This is the critical part for your deployment.
// It looks for the environment variable 'MONGO_URI' injected by Docker/Jenkins.
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ FATAL ERROR: MONGO_URI is not defined in environment variables.");
  console.error("   - If running locally, check your .env file.");
  console.error("   - If running in Jenkins/Docker, check the -e flag in your Jenkinsfile.");
  process.exit(1); // Stop the app so Docker restarts it or logs the crash
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


// --- SCHEMAS ---

// 1. Place Schema
const placeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: String,
  tags: [String],
  image: String,
  groupSize: [String],
  description: String,
  location: String,
  reviews: Number,
  rating: Number
});

const Place = mongoose.model('Place', placeSchema, 'places');

// 2. Itinerary Schema
const itinerarySchema = new mongoose.Schema({
  type: String,
  budget: String,
  plan: [{
    time: String,
    activity: String,
    description: String,
    image: String
  }]
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema, 'itineraries');

// 3. User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  locality: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema, 'users');


// --- API ROUTES ---

// 1. Get all places
app.get('/api/places', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Get single place by ID
app.get('/api/places/:id', async (req, res) => {
  try {
    const place = await Place.findOne({ id: parseInt(req.params.id) });
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.json(place);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Get all itineraries
app.get('/api/itineraries', async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.json(itineraries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Register User
app.post('/api/register', async (req, res) => {
  const { name, email, password, age, locality } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password, // In a real app, please hash this!
      age,
      locality
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. Login User
app.post('/api/login', async (req, res) => {
  const { userId, password } = req.body; // userId is the email

  try {
    const user = await User.findOne({ email: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));