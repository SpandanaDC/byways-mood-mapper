const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected for seeding..."))
  .catch(err => console.log(err));

// --- SCHEMAS ---

// 1. Place Schema (For Mood Discovery)
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

// 2. Itinerary Schema (For Plan A Day)
const itinerarySchema = new mongoose.Schema({
  type: String,      // e.g., "romantic", "adventure"
  budget: String,    // e.g., "500-1500"
  plan: [{
    time: String,
    activity: String,
    description: String,
    image: String
  }]
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema, 'itineraries');

// 3. User Schema (For Profile & Auth)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  locality: String,
  createdAt: { type: Date, default: Date.now },
  favorites: [Number], // Array of Place IDs
  reviews: [{ placeId: Number, text: String, rating: Number, date: String }]
});

const User = mongoose.model('User', userSchema, 'users');

// --- DATA ---

// Places Data - Ensure you have these images in public/images/
const placesData = [
  { id: 1, name: "Dyu Art Cafe", price: "300-600", tags: ["cozy", "instagramable", "chitchat", "romantic"], image: "/images/dyu-art-cafe.jpg", groupSize: ["1", "2", "3"], location: "Koramangala, Bengaluru", rating: 4.5, reviews: 1200, description: "A beautiful art cafe in an old bungalow style setting." },
  { id: 2, name: "Lalbagh Botanical Garden", price: "0-300", tags: ["nature", "peaceful", "instagramable", "pet-friendly"], image: "/images/lalbagh.jpg", groupSize: ["1", "2", "3", "4", "5", "6", "7+"], location: "Mavalli, Bengaluru", rating: 4.6, reviews: 5000, description: "A botanical garden with an aquarium and glass house." },
  { id: 3, name: "Cubbon Park", price: "0-300", tags: ["nature", "peaceful", "pet-friendly", "meditation"], image: "/images/cubbon-park.jpg", groupSize: ["1", "2", "3", "4", "5", "6", "7+"], location: "Central Bengaluru", rating: 4.7, reviews: 8000, description: "A landmark 'lung' area of the Bengaluru city." },
  { id: 4, name: "Ramanagara Hills", price: "0-300", tags: ["adventurous", "nature", "fun"], image: "/images/ramanagara.jpg", groupSize: ["2", "3", "4", "5", "6", "7+"], location: "Ramanagara", rating: 4.4, reviews: 300, description: "Famous for trekking and rock climbing." },
  { id: 5, name: "Wonderla", price: "2000+", tags: ["adventurous", "fun", "lively"], image: "/images/wonderla.jpg", groupSize: ["2", "3", "4", "5", "6", "7+"], location: "Mysore Road, Bengaluru", rating: 4.6, reviews: 15000, description: "One of the largest amusement parks in India." },
  { id: 6, name: "PLaY Arena", price: "1000-2000", tags: ["adventurous", "fun", "minigames", "lively", "group"], image: "/images/play-arena.jpg", groupSize: ["3", "4", "5", "6", "7+"], location: "Sarjapur Road", rating: 4.3, reviews: 800, description: "Sports and entertainment center." },
  { id: 7, name: "Go Karting (Torp It)", price: "600-1000", tags: ["adventurous", "fun", "minigames", "lively"], image: "/images/go-karting.jpg", groupSize: ["2", "3", "4", "5", "6", "7+"], location: "Marathahalli", rating: 4.2, reviews: 200, description: "Thrilling go-karting track." },
  { id: 8, name: "Art of Living", price: "0-300", tags: ["peaceful", "meditation", "historical", "nature"], image: "/images/art-of-living.jpg", groupSize: ["1", "2", "3", "4"], location: "Kanakapura Road", rating: 4.8, reviews: 2000, description: "Spiritual center and ashram." },
  { id: 9, name: "Pyramid Valley", price: "0-300", tags: ["peaceful", "meditation", "instagramable"], image: "/images/pyramid-valley.jpg", groupSize: ["1", "2", "3"], location: "Kanakapura Road", rating: 4.7, reviews: 1000, description: "Home to the world's largest meditational pyramid." },
  { id: 10, name: "Third Wave Coffee", price: "300-600", tags: ["cozy", "chitchat", "hungry"], image: "/images/third-wave.jpg", groupSize: ["1", "2", "3", "4"], location: "Indiranagar", rating: 4.5, reviews: 500, description: "Artisanal coffee roasters." },
  { id: 11, name: "Truffles (Ice & Spice)", price: "300-600", tags: ["hungry", "lively", "chitchat"], image: "/images/truffles.jpg", groupSize: ["2", "3", "4", "5", "6"], location: "St. Marks Road", rating: 4.6, reviews: 10000, description: "Famous for burgers and steaks." },
  { id: 12, name: "Church Street", price: "300-600", tags: ["hungry", "lively", "chitchat", "fun", "instagramable"], image: "/images/church-street.jpg", groupSize: ["2", "3", "4", "5", "6", "7+"], location: "Central Bengaluru", rating: 4.4, reviews: 5000, description: "Bustling street with cafes, bookshops, and restaurants." },
  { id: 13, name: "Bangalore Palace", price: "300-600", tags: ["historical", "instagramable", "romantic"], image: "/images/bangalore-palace.jpg", groupSize: ["1", "2", "3", "4"], location: "Vasanth Nagar", rating: 4.4, reviews: 8000, description: "Tudor-style architecture inspired by Windsor Castle." },
  { id: 14, name: "Bannerghatta National Park", price: "300-600", tags: ["nature", "adventurous", "fun"], image: "/images/bannerghatta.jpg", groupSize: ["2", "3", "4", "5", "6", "7+"], location: "Bannerghatta", rating: 4.3, reviews: 6000, description: "Biological park with a safari." },
  { id: 15, name: "Visvesvaraya Museum", price: "0-300", tags: ["historical", "fun", "minigames"], image: "/images/visvesvaraya.jpg", groupSize: ["1", "2", "3", "4", "5"], location: "Kasturba Road", rating: 4.5, reviews: 3000, description: "Industrial and technological museum." },
  { id: 16, name: "High Ultra Lounge", price: "2000+", tags: ["romantic", "classy", "lively", "instagramable"], image: "/images/high-ultra.jpg", groupSize: ["2", "3", "4"], location: "Malleshwaram", rating: 4.4, reviews: 1500, description: "Rooftop lounge with city views." },
  { id: 17, name: "The Hole In The Wall Cafe", price: "600-1000", tags: ["hungry", "chitchat", "cozy", "lively"], image: "/images/hole-in-wall.jpg", groupSize: ["2", "3", "4", "5"], location: "Koramangala", rating: 4.5, reviews: 4000, description: "Popular breakfast and brunch spot." },
  { id: 18, name: "Sankey Tank", price: "0-300", tags: ["peaceful", "nature", "meditation"], image: "/images/sankey-tank.jpg", groupSize: ["1", "2", "3", "4", "5", "6", "7+"], location: "Malleshwaram", rating: 4.5, reviews: 2000, description: "Man-made lake with a park." },
  { id: 19, name: "Toit Brewpub", price: "1000-2000", tags: ["lively", "hungry", "chitchat", "fun", "group"], image: "/images/toit.jpg", groupSize: ["3", "4", "5", "6", "7+"], location: "Indiranagar", rating: 4.6, reviews: 12000, description: "Famous microbrewery." },
  { id: 20, name: "Champaca Bookstore", price: "300-600", tags: ["cozy", "peaceful", "chitchat", "instagramable", "books"], image: "/images/champaca.jpg", groupSize: ["1", "2"], location: "Vasanth Nagar", rating: 4.7, reviews: 500, description: "Independent bookstore and cafe." },
  { id: 21, name: "Windmills Craftworks", price: "2000+", tags: ["lively", "hungry", "chitchat", "classy", "romantic", "books"], image: "/images/windmills.jpg", groupSize: ["2", "3", "4", "5"], location: "Whitefield", rating: 4.6, reviews: 3000, description: "Microbrewery, jazz theater, and restaurant." },
  { id: 22, name: "Arbor Brewing Company", price: "1000-2000", tags: ["lively", "hungry", "chitchat", "fun", "group"], image: "/images/arbor.jpg", groupSize: ["3", "4", "5", "6", "7+"], location: "Brigade Road", rating: 4.5, reviews: 5000, description: "American-style brewpub." },
  { id: 23, name: "Snow City", price: "600-1000", tags: ["fun", "minigames", "lively", "group"], image: "/images/snow-city.jpg", groupSize: ["2", "3", "4", "5", "6", "7+"], location: "Jayamahal", rating: 3.8, reviews: 1000, description: "Indoor snow theme park." },
  { id: 24, name: "SkyJumper Trampoline Park", price: "600-1000", tags: ["fun", "minigames", "lively", "group", "adventurous"], image: "/images/skyjumper.jpg", groupSize: ["3", "4", "5", "6", "7+"], location: "Electronic City", rating: 4.4, reviews: 500, description: "Trampoline park for all ages." },
  { id: 25, name: "Dice N Dine", price: "600-1000", tags: ["fun", "minigames", "chitchat", "cozy", "group", "hungry"], image: "/images/dice-n-dine.jpg", groupSize: ["2", "3", "4", "5", "6"], location: "Koramangala", rating: 4.3, reviews: 800, description: "Board game cafe." },
  { id: 26, name: "Atta Galatta", price: "300-600", tags: ["cozy", "peaceful", "chitchat", "books", "historical"], image: "/images/atta-galatta.jpg", groupSize: ["1", "2", "3"], location: "Indiranagar", rating: 4.5, reviews: 600, description: "Bookstore and performance space." },
  { id: 27, name: "Olive Beach", price: "2000+", tags: ["romantic", "classy", "instagramable", "hungry", "cozy"], image: "/images/olive-beach.jpg", groupSize: ["2", "3", "4"], location: "Ashok Nagar", rating: 4.6, reviews: 2000, description: "Mediterranean restaurant in a villa." },
  { id: 28, name: "Grasshopper", price: "2000+", tags: ["romantic", "classy", "peaceful", "hungry"], image: "/images/grasshopper.jpg", groupSize: ["2"], location: "Bannerghatta Road", rating: 4.7, reviews: 500, description: "Farmhouse setting with set-course meals." },
  { id: 29, name: "Ebony", price: "1000-2000", tags: ["romantic", "classy", "hungry"], image: "/images/ebony.jpg", groupSize: ["2", "3", "4"], location: "MG Road", rating: 4.4, reviews: 1500, description: "Rooftop restaurant with city views." },
  { id: 30, name: "Rasta Cafe", price: "600-1000", tags: ["lively", "chitchat", "fun", "hungry", "group"], image: "/images/rasta-cafe.jpg", groupSize: ["3", "4", "5", "6", "7+"], location: "Mysore Road", rating: 4.2, reviews: 5000, description: "Late-night cafe destination." },
];

// Itinerary Data
const itinerariesData = [
  { 
    type: "romantic", 
    budget: "500-1500", 
    plan: [
      { time: "4:00 PM", activity: "Stroll at Lalbagh", description: "Start with a romantic walk through the serene Lalbagh Botanical Garden.", image: "/images/lalbagh.jpg" },
      { time: "6:30 PM", activity: "Coffee at Dyu Art Cafe", description: "Head to Koramangala for a cozy coffee and art session in a beautiful setting.", image: "/images/dyu-art-cafe.jpg" },
      { time: "8:30 PM", activity: "Dinner at Truffles", description: "Enjoy a lively dinner with famous burgers and dishes at Truffles nearby.", image: "/images/truffles.jpg" }
    ]
  },
  { 
    type: "adventurous", 
    budget: "500-1500", 
    plan: [
      { time: "6:00 AM", activity: "Drive to Ramanagara", description: "Start early for the 50km drive to the 'Sholay' hills.", image: "/images/ramanagara.jpg" },
      { time: "8:00 AM", activity: "Breakfast at a local place", description: "Have a hot breakfast at a local tiffin room in Ramanagara town.", image: "https://placehold.co/600x400/fcefb4/a5a58d?text=Idli+Dosa" },
      { time: "9:00 AM", activity: "Trekking & Rappelling", description: "Spend 4-5 hours trekking the monolithic hills and trying beginner's rappelling.", image: "https://placehold.co/600x400/d4a373/6f4518?text=Trekking" }
    ]
  },
  { 
    type: "adventurous", 
    budget: "3000+", 
    plan: [
      { time: "10:00 AM", activity: "Microlight Flying at Jakkur", description: "Take a thrilling 20-minute flight over the city in a 2-seater aircraft.", image: "https://placehold.co/600x400/8eecf5/096b72?text=Microlight+Flying" },
      { time: "1:00 PM", activity: "Lunch at a nice restaurant", description: "Celebrate your adventure with a good lunch nearby.", image: "https://placehold.co/600x400/fdf0d5/c16709?text=Celebration+Lunch" },
      { time: "4:00 PM", activity: "Indoor Skydiving (Fun City)", description: "Experience the thrill of skydiving in a safe, indoor wind tunnel.", image: "https://placehold.co/600x400/f5a623/b06c00?text=Indoor+Skydiving" }
    ]
  },
  { 
    type: "relaxing", 
    budget: "0-500", 
    plan: [
      { time: "11:00 AM", activity: "Picnic at Sankey Tank", description: "Pack a lunch and enjoy a peaceful picnic by the beautiful Sankey Tank lake.", image: "/images/sankey-tank.jpg" },
      { time: "2:00 PM", activity: "Visit ISKCON Temple", description: "Experience the serene and spiritual atmosphere at the grand ISKCON temple.", image: "https://placehold.co/600x400/ff9900/804d00?text=ISKCON" },
      { time: "4:30 PM", activity: "Filter Coffee at a local cafe", description: "End your day with an authentic cup of filter coffee at a local Malleshwaram cafe.", image: "https://placehold.co/600x400/c9ada7/6a453b?text=Filter+Coffee" }
    ]
  },
  {
    type: "group",
    budget: "1500-3000",
    plan: [
      { time: "3:00 PM", activity: "Start at Toit, Indiranagar", description: "Begin your brewery tour at one of Bangalore's most iconic brewpubs.", image: "/images/toit.jpg" },
      { time: "5:30 PM", activity: "Move to Arbor Brewing", description: "Walk down the road to ABC for another round and some great appetizers.", image: "/images/arbor.jpg" },
      { time: "8:00 PM", activity: "Dinner at Big Brewsky", description: "End the night at this massive brewery with a stunning ambiance and a wide food menu.", image: "https://placehold.co/600x400/495057/dee2e6?text=Big+Brewsky" }
    ]
  }
];

// Sample Users Data
const usersData = [
  {
    name: "Namma Traveller",
    email: "user@example.com",
    password: "password123", // In a real app, this would be hashed
    age: 25,
    locality: "Indiranagar",
    favorites: [1, 3], // IDs of places
    reviews: [{ placeId: 3, text: "Amazing place for a morning walk!", rating: 5, date: "2023-10-27" }]
  },
  {
    name: "Bangalore Explorer",
    email: "explorer@example.com",
    password: "securepass", 
    age: 30,
    locality: "Koramangala",
    favorites: [2, 5],
    reviews: []
  }
];

const seedDB = async () => {
  try {
    // Clear existing data
    await Place.deleteMany({});
    await Itinerary.deleteMany({});
    await User.deleteMany({});
    console.log("🧹 Cleared existing data");
    
    // Insert new data
    await Place.insertMany(placesData);
    await Itinerary.insertMany(itinerariesData);
    await User.insertMany(usersData);
    
    console.log("✅ Database seeded successfully with Places, Itineraries, and Users!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    mongoose.connection.close();
    console.log("🔌 Connection closed");
  }
};

seedDB();