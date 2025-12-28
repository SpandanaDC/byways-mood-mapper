const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected for seeding..."))
  .catch(err => console.log(err));

// --- SCHEMAS ---
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

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  locality: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema, 'users');

// --- PLACES DATA ---
const placesData = [
  { id: 1, name: "Cubbon Park", price: "0-300", tags: ["nature", "peaceful", "meditation", "pet-friendly", "fun", "chitchat"], image: "/images/cubbon-park.jpg", groupSize: ["1", "2", "3", "4", "5", "6", "7+"], location: "Central Bengaluru", rating: 4.7, reviews: 8000, description: "Green lung of the city." },
  { id: 2, name: "Lalbagh Botanical Garden", price: "0-300", tags: ["nature", "peaceful", "instagramable", "romantic", "historical", "fun"], image: "/images/lalbagh.jpg", groupSize: ["1", "2", "3", "4", "5", "6", "7+"], location: "Mavalli", rating: 4.6, reviews: 5000, description: "Historic garden." },
  { id: 3, name: "VV Puram Food Street", price: "0-300", tags: ["hungry", "lively", "fun", "group", "chitchat"], image: "/images/vv-puram.jpg", groupSize: ["1", "2", "3", "4", "5", "6", "7+"], location: "Basavanagudi", rating: 4.5, reviews: 12000, description: "Street food lovers paradise." },
  { id: 4, name: "Sankey Tank", price: "0-300", tags: ["peaceful", "nature", "romantic", "meditation"], image: "/images/sankey-tank.jpg", groupSize: ["1", "2", "3", "4"], location: "Malleshwaram", rating: 4.5, reviews: 2000, description: "Serene man-made lake." },
  { id: 5, name: "Ramanagara Hills", price: "0-300", tags: ["adventurous", "nature", "fun", "group"], image: "/images/ramanagara.jpg", groupSize: ["2", "3", "4", "5", "6", "7+"], location: "Ramanagara", rating: 4.4, reviews: 300, description: "Trekking spot." },
  { id: 6, name: "Visvesvaraya Museum", price: "0-300", tags: ["historical", "fun", "minigames", "chitchat"], image: "/images/visvesvaraya.jpg", groupSize: ["1", "2", "3", "4", "5", "6", "7+"], location: "Kasturba Road", rating: 4.5, reviews: 3000, description: "Science museum." },
  { id: 7, name: "Dyu Art Cafe", price: "300-600", tags: ["cozy", "instagramable", "chitchat", "romantic", "books", "classy"], image: "/images/dyu-art-cafe.avif", groupSize: ["1", "2", "3", "4"], location: "Koramangala", rating: 4.5, reviews: 1200, description: "Art cafe." },
  { id: 8, name: "Champaca Bookstore", price: "300-600", tags: ["books", "peaceful", "cozy", "chitchat", "classy"], image: "/images/champaca.jpg", groupSize: ["1", "2"], location: "Vasanth Nagar", rating: 4.8, reviews: 600, description: "Bookstore cafe." },
  { id: 9, name: "Third Wave Coffee", price: "300-600", tags: ["cozy", "chitchat", "hungry", "lively"], image: "/images/third-wave.jpg", groupSize: ["1", "2", "3", "4"], location: "Indiranagar", rating: 4.4, reviews: 800, description: "Coffee roasters." },
  { id: 10, name: "Bangalore Palace", price: "300-600", tags: ["historical", "instagramable", "romantic", "classy"], image: "/images/bangalore-palace.jpg", groupSize: ["1", "2", "3", "4", "5", "6", "7+"], location: "Vasanth Nagar", rating: 4.5, reviews: 9000, description: "Royal palace." },
  { id: 11, name: "Truffles", price: "300-600", tags: ["hungry", "lively", "fun", "group", "chitchat"], image: "/images/truffles.avif", groupSize: ["2", "3", "4", "5", "6"], location: "St. Marks Road", rating: 4.6, reviews: 15000, description: "Burgers and steaks." },
  { id: 12, name: "Atta Galatta", price: "300-600", tags: ["books", "peaceful", "cozy", "chitchat"], image: "/images/atta-galatta.jpg", groupSize: ["1", "2", "3"], location: "Indiranagar", rating: 4.5, reviews: 700, description: "Performance space." },
  { id: 13, name: "Go Karting", price: "600-1000", tags: ["adventurous", "fun", "minigames", "lively", "group"], image: "/images/go-karting.jpg", groupSize: ["2", "3", "4", "5", "6", "7+"], location: "Marathahalli", rating: 4.2, reviews: 500, description: "Go-karting track." },
  { id: 14, name: "Dice N Dine", price: "600-1000", tags: ["minigames", "fun", "chitchat", "cozy", "group", "hungry"], image: "/images/dice-n-dine.jpg", groupSize: ["2", "3", "4", "5", "6", "7+"], location: "Koramangala", rating: 4.3, reviews: 1200, description: "Board game cafe." },
  { id: 15, name: "Snow City", price: "600-1000", tags: ["fun", "minigames", "lively", "group", "adventurous", "instagramable"], image: "/images/snow-city.jpg", groupSize: ["2", "3", "4", "5", "6", "7+"], location: "Jayamahal", rating: 3.9, reviews: 2000, description: "Snow park." },
  { id: 16, name: "Hole in the Wall", price: "600-1000", tags: ["hungry", "chitchat", "lively", "cozy", "instagramable"], image: "/images/hole-in-wall.jpg", groupSize: ["2", "3", "4", "5"], location: "Koramangala", rating: 4.6, reviews: 5000, description: "Breakfast spot." },
  { id: 17, name: "SkyJumper", price: "600-1000", tags: ["fun", "adventurous", "minigames", "lively", "group"], image: "/images/skyjumper.avif", groupSize: ["3", "4", "5", "6", "7+"], location: "Electronic City", rating: 4.5, reviews: 600, description: "Trampoline park." },
  { id: 18, name: "Rasta Cafe", price: "600-1000", tags: ["lively", "chitchat", "fun", "group", "hungry"], image: "/images/rasta-cafe.jpeg", groupSize: ["3", "4", "5", "6", "7+"], location: "Mysore Road", rating: 4.2, reviews: 8000, description: "Highway cafe." },
  { id: 19, name: "Toit Brewpub", price: "1000-2000", tags: ["lively", "hungry", "chitchat", "fun", "group", "classy"], image: "/images/toit.jpeg", groupSize: ["2", "3", "4", "5", "6", "7+"], location: "Indiranagar", rating: 4.7, reviews: 15000, description: "Microbrewery." },
  { id: 20, name: "Arbor Brewing", price: "1000-2000", tags: ["lively", "hungry", "group", "fun", "chitchat"], image: "/images/arbor.jpg", groupSize: ["3", "4", "5", "6", "7+"], location: "Brigade Road", rating: 4.5, reviews: 6000, description: "Brewpub." },
  { id: 21, name: "PLaY Arena", price: "1000-2000", tags: ["adventurous", "fun", "minigames", "lively", "group"], image: "/images/play-arena.jpg", groupSize: ["3", "4", "5", "6", "7+"], location: "Sarjapur Road", rating: 4.4, reviews: 3000, description: "Sports center." },
  { id: 22, name: "Ebony", price: "1000-2000", tags: ["romantic", "classy", "hungry", "instagramable"], image: "/images/ebony.jpg", groupSize: ["2", "3", "4"], location: "MG Road", rating: 4.4, reviews: 2000, description: "Rooftop dining." },
  { id: 23, name: "Wonderla", price: "2000+", tags: ["adventurous", "fun", "lively", "group", "minigames"], image: "/images/Wonderla.jpg", groupSize: ["2", "3", "4", "5", "6", "7+"], location: "Mysore Road", rating: 4.7, reviews: 20000, description: "Amusement park." },
  { id: 24, name: "High Ultra Lounge", price: "2000+", tags: ["romantic", "classy", "lively", "instagramable", "chitchat"], image: "/images/high-ultra.jpeg", groupSize: ["2", "3", "4", "5", "6"], location: "Malleshwaram", rating: 4.5, reviews: 3000, description: "Sky lounge." },
  { id: 25, name: "Windmills", price: "2000+", tags: ["classy", "romantic", "books", "lively", "hungry"], image: "/images/windmills.avif", groupSize: ["2", "3", "4", "5"], location: "Whitefield", rating: 4.8, reviews: 4000, description: "Jazz theater." },
  { id: 26, name: "Olive Beach", price: "2000+", tags: ["romantic", "classy", "instagramable", "cozy", "hungry"], image: "/images/olive-beach.jpg", groupSize: ["2", "3", "4"], location: "Ashok Nagar", rating: 4.6, reviews: 3500, description: "Mediterranean." },
  { id: 27, name: "Grasshopper", price: "2000+", tags: ["romantic", "peaceful", "classy", "nature", "hungry"], image: "/images/grasshopper.avif", groupSize: ["2"], location: "Bannerghatta Road", rating: 4.8, reviews: 600, description: "Farmhouse dining." }
];

// --- COMPLETE ITINERARY MAPPING (ALL 32 COMBINATIONS) ---
const itinerariesData = [
  // --- 1. ROMANTIC ---
  { type: "romantic", budget: "0-500", plan: [{ time: "4:30 PM", activity: "Ulsoor Lake", description: "Boating.", image: "/images/ulsoor-lake.jpg" }, { time: "7:00 PM", activity: "Temple Visit", description: "Peaceful evening.", image: "/images/iskcon.jpg" }] },
  { type: "romantic", budget: "500-1500", plan: [{ time: "4:00 PM", activity: "Lalbagh", description: "Garden walk.", image: "/images/lalbagh.jpg" }, { time: "7:00 PM", activity: "Dyu Art Cafe", description: "Coffee date.", image: "/images/dyu-art-cafe.avif" }] },
  { type: "romantic", budget: "1500-3000", plan: [{ time: "5:00 PM", activity: "Bangalore Palace", description: "Royal tour.", image: "/images/bangalore-palace.jpg" }, { time: "8:00 PM", activity: "Ebony", description: "Rooftop dinner.", image: "/images/ebony.jpg" }] },
  { type: "romantic", budget: "3000+", plan: [{ time: "4:00 PM", activity: "Couple Spa", description: "Relaxation.", image: "/images/spa.jpg" }, { time: "8:00 PM", activity: "Grasshopper", description: "7-course meal.", image: "/images/grasshopper.avif" }] },

  // --- 2. BIRTHDAY ---
  { type: "birthday", budget: "0-500", plan: [{ time: "3:00 PM", activity: "Cubbon Park", description: "Group picnic.", image: "/images/cubbon-park.jpg" }, { time: "6:00 PM", activity: "Cake Cutting", description: "By the park.", image: "/images/church-street.jpg" }] },
  { type: "birthday", budget: "500-1500", plan: [{ time: "1:00 PM", activity: "Toit", description: "Lunch.", image: "/images/toit.jpeg" }, { time: "4:00 PM", activity: "Bowling", description: "PLaY Arena.", image: "/images/play-arena.jpg" }] },
  { type: "birthday", budget: "1500-3000", plan: [{ time: "6:00 PM", activity: "Bar Hopping", description: "Indiranagar.", image: "/images/arbor.jpg" }, { time: "9:00 PM", activity: "Big Brewsky", description: "Dinner.", image: "/images/big-brewsky.jpg" }] },
  { type: "birthday", budget: "3000+", plan: [{ time: "11:00 AM", activity: "Wonderla", description: "Full day fun.", image: "/images/Wonderla.jpg" }, { time: "7:00 PM", activity: "Resort Stay", description: "Luxury stay.", image: "/images/Wonderla.jpg" }] },

  // --- 3. ADVENTUROUS ---
  { type: "adventurous", budget: "0-500", plan: [{ time: "4:00 AM", activity: "Nandi Hills", description: "Sunrise drive.", image: "/images/nandi-hills.jpg" }, { time: "8:00 AM", activity: "Breakfast", description: "Local eatery.", image: "/images/vidyarthi-bhavan.jpg" }] },
  { type: "adventurous", budget: "500-1500", plan: [{ time: "6:00 AM", activity: "Ramanagara", description: "Trekking.", image: "/images/ramanagara.jpg" }, { time: "12:00 PM", activity: "Rasta Cafe", description: "Lunch.", image: "/images/rasta-cafe.jpeg" }] },
  { type: "adventurous", budget: "1500-3000", plan: [{ time: "10:00 AM", activity: "Guhantara", description: "Cave resort.", image: "/images/guhantara.jpg" }, { time: "3:00 PM", activity: "Paintball", description: "Group game.", image: "/images/play-arena.jpg" }] },
  { type: "adventurous", budget: "3000+", plan: [{ time: "10:00 AM", activity: "Microlight Flying", description: "Jakkur.", image: "/images/microlight.jpg" }, { time: "2:00 PM", activity: "Skydiving", description: "Indoor.", image: "/images/skyjumper.avif" }] },

  // --- 4. GROUP FUN ---
  { type: "group", budget: "0-500", plan: [{ time: "3:00 PM", activity: "Commercial St", description: "Shopping.", image: "/images/church-street.jpg" }, { time: "6:00 PM", activity: "Street Food", description: "Local snacks.", image: "/images/vv-puram.jpg" }] },
  { type: "group", budget: "500-1500", plan: [{ time: "2:00 PM", activity: "Go Karting", description: "Race.", image: "/images/go-karting.jpg" }, { time: "5:00 PM", activity: "Movie", description: "Multiplex.", image: "/images/high-ultra.jpeg" }] },
  { type: "group", budget: "1500-3000", plan: [{ time: "4:00 PM", activity: "Brewery Tour", description: "Beer tasting.", image: "/images/toit.jpeg" }, { time: "8:00 PM", activity: "Dinner", description: "Arbor Brewing.", image: "/images/arbor.jpg" }] },
  { type: "group", budget: "3000+", plan: [{ time: "12:00 PM", activity: "Escape Room", description: "Mystery solving.", image: "/images/dice-n-dine.jpg" }, { time: "8:00 PM", activity: "High Ultra", description: "Party.", image: "/images/high-ultra.jpeg" }] },

  // --- 5. RELAXING ---
  { type: "relaxing", budget: "0-500", plan: [{ time: "10:00 AM", activity: "Sankey Tank", description: "Morning walk.", image: "/images/sankey-tank.jpg" }, { time: "4:00 PM", activity: "Coffee", description: "Local cafe.", image: "/images/hole-in-wall.jpg" }] },
  { type: "relaxing", budget: "500-1500", plan: [{ time: "11:00 AM", activity: "Bookstore", description: "Champaca.", image: "/images/champaca.jpg" }, { time: "2:00 PM", activity: "Lunch", description: "Quiet cafe.", image: "/images/dyu-art-cafe.avif" }] },
  { type: "relaxing", budget: "1500-3000", plan: [{ time: "10:00 AM", activity: "Spa", description: "Massage.", image: "/images/spa.jpg" }, { time: "2:00 PM", activity: "Olive Beach", description: "Lunch.", image: "/images/olive-beach.jpg" }] },
  { type: "relaxing", budget: "3000+", plan: [{ time: "10:00 AM", activity: "Vineyard", description: "Wine tour.", image: "/images/vineyard.jpg" }, { time: "2:00 PM", activity: "Lunch", description: "Vineyard restaurant.", image: "/images/vineyard.jpg" }] },

  // --- 6. FOODIE ---
  { type: "foodie", budget: "0-500", plan: [{ time: "8:00 AM", activity: "Vidyarthi Bhavan", description: "Dosa.", image: "/images/vidyarthi-bhavan.jpg" }, { time: "5:00 PM", activity: "VV Puram", description: "Street food.", image: "/images/vv-puram.jpg" }] },
  { type: "foodie", budget: "500-1500", plan: [{ time: "1:00 PM", activity: "MTR", description: "Thali.", image: "/images/mtr.jpg" }, { time: "5:00 PM", activity: "Corner House", description: "Ice cream.", image: "/images/corner-house.jpg" }] },
  { type: "foodie", budget: "1500-3000", plan: [{ time: "12:00 PM", activity: "Buffet", description: "Black Pearl.", image: "/images/black-pearl.jpg" }, { time: "8:00 PM", activity: "Toit", description: "Beer & Pizza.", image: "/images/toit.jpeg" }] },
  { type: "foodie", budget: "3000+", plan: [{ time: "8:00 PM", activity: "Karavalli", description: "Coastal dining.", image: "/images/olive-beach.jpg" }, { time: "10:00 PM", activity: "Dessert", description: "Milano.", image: "/images/corner-house.jpg" }] },

  // --- 7. CULTURAL ---
  { type: "cultural", budget: "0-500", plan: [{ time: "10:00 AM", activity: "Bangalore Fort", description: "Ruins.", image: "/images/tipu-palace.jpg" }, { time: "12:00 PM", activity: "Tipu Palace", description: "History.", image: "/images/tipu-palace.jpg" }] },
  { type: "cultural", budget: "500-1500", plan: [{ time: "10:00 AM", activity: "Museum", description: "Visvesvaraya.", image: "/images/visvesvaraya.jpg" }, { time: "2:00 PM", activity: "Art Gallery", description: "Chitrakala.", image: "/images/bangalore-palace.jpg" }] },
  { type: "cultural", budget: "1500-3000", plan: [{ time: "5:00 PM", activity: "Dance Show", description: "Nrityagram.", image: "/images/atta-galatta.jpg" }, { time: "8:00 PM", activity: "Dinner", description: "Traditional.", image: "/images/mtr.jpg" }] },
  { type: "cultural", budget: "3000+", plan: [{ time: "9:00 AM", activity: "Heritage Walk", description: "Guided tour.", image: "/images/church-street.jpg" }, { time: "1:00 PM", activity: "Royal Lunch", description: "Taj West End.", image: "/images/ebony.jpg" }] },

  // --- 8. BOOKS ---
  { type: "books", budget: "0-500", plan: [{ time: "10:00 AM", activity: "Central Library", description: "Cubbon Park.", image: "/images/cubbon-park.jpg" }, { time: "4:00 PM", activity: "Bookworm", description: "Used books.", image: "/images/blossoms.jpg" }] },
  { type: "books", budget: "500-1500", plan: [{ time: "11:00 AM", activity: "Blossoms", description: "Browsing.", image: "/images/blossoms.jpg" }, { time: "2:00 PM", activity: "Champaca", description: "Reading.", image: "/images/champaca.jpg" }] },
  { type: "books", budget: "1500-3000", plan: [{ time: "10:00 AM", activity: "Atta Galatta", description: "Workshop.", image: "/images/atta-galatta.jpg" }, { time: "1:00 PM", activity: "Lunch", description: "Literary cafe.", image: "/images/dyu-art-cafe.avif" }] },
  { type: "books", budget: "3000+", plan: [{ time: "11:00 AM", activity: "Windmills", description: "Library.", image: "/images/windmills.avif" }, { time: "2:00 PM", activity: "Fine Dining", description: "With books.", image: "/images/olive-beach.jpg" }] },

  // --- FALLBACK ---
  { type: "default", budget: "default", plan: [{ time: "10:00 AM", activity: "Cubbon Park", description: "Morning walk.", image: "/images/cubbon-park.jpg" }] }
];

const usersData = [
  { name: "Namma Traveller", email: "user@example.com", password: "password123", age: 25, locality: "Indiranagar" }
];

const seedDB = async () => {
  try {
    await Place.deleteMany({});
    await Itinerary.deleteMany({});
    await User.deleteMany({});
    console.log("🧹 Cleared existing data");
    
    await Place.insertMany(placesData);
    await Itinerary.insertMany(itinerariesData);
    await User.insertMany(usersData);
    
    console.log("✅ Database seeded successfully with LOCAL IMAGES!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    mongoose.connection.close();
    console.log("🔌 Connection closed");
  }
};

seedDB();