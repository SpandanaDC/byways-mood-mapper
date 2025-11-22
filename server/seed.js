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
  groupSize: [String]
});

const Place = mongoose.model('Place', placeSchema);

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

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

// --- DATA ---

// Places Data (30 entries)
const placesData = [
  { id: 1, name: "Dyu Art Cafe", price: "300-600", tags: ["cozy", "instagramable", "chitchat", "romantic"], image: "https://placehold.co/600x400/f9d8b7/8f5b33?text=Dyu+Art+Cafe", groupSize: ["1", "2", "3"] },
  { id: 2, name: "Lalbagh Botanical Garden", price: "0-300", tags: ["nature", "peaceful", "instagramable", "pet-friendly"], image: "https://placehold.co/600x400/a8d8b9/3a5a40?text=Lalbagh", groupSize: ["1", "2", "3", "4", "5", "6", "7+"] },
  { id: 3, name: "Cubbon Park", price: "0-300", tags: ["nature", "peaceful", "pet-friendly", "meditation"], image: "https://placehold.co/600x400/b7f9c8/338f5b?text=Cubbon+Park", groupSize: ["1", "2", "3", "4", "5", "6", "7+"] },
  { id: 4, name: "Ramanagara Hills", price: "0-300", tags: ["adventurous", "nature", "fun"], image: "https://placehold.co/600x400/f9b7b7/8f3333?text=Ramanagara", groupSize: ["2", "3", "4", "5", "6", "7+"] },
  { id: 5, name: "Wonderla", price: "2000+", tags: ["adventurous", "fun", "lively"], image: "https://placehold.co/600x400/89c2d9/216869?text=Wonderla", groupSize: ["2", "3", "4", "5", "6", "7+"] },
  { id: 6, name: "PLaY Arena", price: "1000-2000", tags: ["adventurous", "fun", "minigames", "lively", "group"], image: "https://placehold.co/600x400/fca311/8338ec?text=PLaY+Arena", groupSize: ["3", "4", "5", "6", "7+"] },
  { id: 7, name: "Go Karting (Torp It)", price: "600-1000", tags: ["adventurous", "fun", "minigames", "lively"], image: "https://placehold.co/600x400/e56b6f/463f3a?text=Go+Karting", groupSize: ["2", "3", "4", "5", "6", "7+"] },
  { id: 8, name: "Art of Living", price: "0-300", tags: ["peaceful", "meditation", "historical", "nature"], image: "https://placehold.co/600x400/f4f1de/81b29a?text=Art+of+Living", groupSize: ["1", "2", "3", "4"] },
  { id: 9, name: "Pyramid Valley", price: "0-300", tags: ["peaceful", "meditation", "instagramable"], image: "https://placehold.co/600x400/e0b1cb/5a189a?text=Pyramid+Valley", groupSize: ["1", "2", "3"] },
  { id: 10, name: "Third Wave Coffee", price: "300-600", tags: ["cozy", "chitchat", "hungry"], image: "https://placehold.co/600x400/c0d6e4/468faf?text=Third+Wave", groupSize: ["1", "2", "3", "4"] },
  { id: 11, name: "Truffles (Ice & Spice)", price: "300-600", tags: ["hungry", "lively", "chitchat"], image: "https://placehold.co/600x400/f29492/691e1a?text=Truffles", groupSize: ["2", "3", "4", "5", "6"] },
  { id: 12, name: "Church Street", price: "300-600", tags: ["hungry", "lively", "chitchat", "fun", "instagramable"], image: "https://placehold.co/600x400/f9c74f/d62828?text=Church+Street", groupSize: ["2", "3", "4", "5", "6", "7+"] },
  { id: 13, name: "Bangalore Palace", price: "300-600", tags: ["historical", "instagramable", "romantic"], image: "https://placehold.co/600x400/d6ccc2/4c3228?text=Bangalore+Palace", groupSize: ["1", "2", "3", "4"] },
  { id: 14, name: "Bannerghatta National Park", price: "300-600", tags: ["nature", "adventurous", "fun"], image: "https://placehold.co/600x400/aacc00/446600?text=Bannerghatta", groupSize: ["2", "3", "4", "5", "6", "7+"] },
  { id: 15, name: "Visvesvaraya Museum", price: "0-300", tags: ["historical", "fun", "minigames"], image: "https://placehold.co/600x400/b7b7a4/5b5b5b?text=Museum", groupSize: ["1", "2", "3", "4", "5"] },
  { id: 16, name: "High Ultra Lounge", price: "2000+", tags: ["romantic", "classy", "lively", "instagramable"], image: "https://placehold.co/600x400/1d3557/f1faee?text=High+Ultra", groupSize: ["2", "3", "4"] },
  { id: 17, name: "The Hole In The Wall Cafe", price: "600-1000", tags: ["hungry", "chitchat", "cozy", "lively"], image: "https://placehold.co/600x400/ffb5a7/9d0208?text=Hole+In+Wall", groupSize: ["2", "3", "4", "5"] },
  { id: 18, name: "Sankey Tank", price: "0-300", tags: ["peaceful", "nature", "meditation"], image: "https://placehold.co/600x400/a9d6e5/013a63?text=Sankey+Tank", groupSize: ["1", "2", "3", "4", "5", "6", "7+"] },
  { id: 19, name: "Toit Brewpub (Indiranagar)", price: "1000-2000", tags: ["lively", "hungry", "chitchat", "fun", "group"], image: "https://placehold.co/600x400/f77f00/502b00?text=Toit", groupSize: ["3", "4", "5", "6", "7+"] },
  { id: 20, name: "Champaca Bookstore", price: "300-600", tags: ["cozy", "peaceful", "chitchat", "instagramable", "books"], image: "https://placehold.co/600x400/e0caca/704241?text=Champaca", groupSize: ["1", "2"] },
  { id: 21, name: "Windmills Craftworks", price: "2000+", tags: ["lively", "hungry", "chitchat", "classy", "romantic", "books"], image: "https://placehold.co/600x400/495057/dee2e6?text=Windmills", groupSize: ["2", "3", "4", "5"] },
  { id: 22, name: "Arbor Brewing Company", price: "1000-2000", tags: ["lively", "hungry", "chitchat", "fun", "group"], image: "https://placehold.co/600x400/2d6a4f/d8f3dc?text=Arbor+Brewing", groupSize: ["3", "4", "5", "6", "7+"] },
  { id: 23, name: "Snow City", price: "600-1000", tags: ["fun", "minigames", "lively", "group"], image: "https://placehold.co/600x400/caf0f8/0077b6?text=Snow+City", groupSize: ["2", "3", "4", "5", "6", "7+"] },
  { id: 24, name: "SkyJumper Trampoline Park", price: "600-1000", tags: ["fun", "minigames", "lively", "group", "adventurous"], image: "https://placehold.co/600x400/fdfcdc/ef476f?text=SkyJumper", groupSize: ["3", "4", "5", "6", "7+"] },
  { id: 25, name: "Dice N Dine", price: "600-1000", tags: ["fun", "minigames", "chitchat", "cozy", "group", "hungry"], image: "https://placehold.co/600x400/a2d2ff/003049?text=Dice+N+Dine", groupSize: ["2", "3", "4", "5", "6"] },
  { id: 26, name: "Atta Galatta", price: "300-600", tags: ["cozy", "peaceful", "chitchat", "books", "historical"], image: "https://placehold.co/600x400/d68c45/432818?text=Atta+Galatta", groupSize: ["1", "2", "3"] },
  { id: 27, name: "Olive Bar & Kitchen", price: "2000+", tags: ["romantic", "classy", "instagramable", "hungry", "cozy"], image: "https://placehold.co/600x400/f1faee/1d3557?text=Olive+Beach", groupSize: ["2", "3", "4"] },
  { id: 28, name: "Grasshopper Restaurant", price: "2000+", tags: ["romantic", "classy", "peaceful", "hungry"], image: "https://placehold.co/600x400/90a955/31572c?text=Grasshopper", groupSize: ["2"] },
  { id: 29, name: "Ebony, MG Road", price: "1000-2000", tags: ["romantic", "classy", "hungry"], image: "https://placehold.co/600x400/343a40/f8f9fa?text=Ebony", groupSize: ["2", "3", "4"] },
  { id: 30, name: "Rasta Cafe", price: "600-1000", tags: ["lively", "chitchat", "fun", "hungry", "group"], image: "https://placehold.co/600x400/e71d36/272727?text=Rasta+Cafe", groupSize: ["3", "4", "5", "6", "7+"] },
];

// Itinerary Data (19 entries)
const itinerariesData = [
  { type: "romantic", budget: "500-1500", plan: [
    { time: "4:00 PM", activity: "Stroll at Lalbagh", description: "Start with a romantic walk through the serene Lalbagh Botanical Garden.", image: "https://placehold.co/600x400/a8d8b9/3a5a40?text=Lalbagh" },
    { time: "6:30 PM", activity: "Coffee at Dyu Art Cafe", description: "Head to Koramangala for a cozy coffee and art session in a beautiful setting.", image: "https://placehold.co/600x400/f9d8b7/8f5b33?text=Dyu+Art+Cafe" },
    { time: "8:30 PM", activity: "Dinner at Truffles", description: "Enjoy a lively dinner with famous burgers and dishes at Truffles nearby.", image: "https://placehold.co/600x400/f29492/691e1a?text=Truffles" }
  ]},
  { type: "romantic", budget: "1500-3000", plan: [
    { time: "5:00 PM", activity: "Explore Bangalore Palace", description: "Begin your evening with a royal tour of the historic Bangalore Palace.", image: "https://placehold.co/600x400/d6ccc2/4c3228?text=Bangalore+Palace" },
    { time: "7:30 PM", activity: "Rooftop Drinks at High Ultra Lounge", description: "Witness a stunning sunset and city views from one of South India's highest lounges.", image: "https://placehold.co/600x400/1d3557/f1faee?text=High+Ultra" },
    { time: "9:00 PM", activity: "Fine Dining at Olive Beach", description: "Conclude your date with an exquisite Mediterranean dinner in a beautiful, candlelit ambiance.", image: "https://placehold.co/600x400/f1faee/1d3557?text=Olive+Beach" }
  ]},
  { type: "birthday", budget: "500-1500", plan: [
    { time: "1:00 PM", activity: "Group Lunch at Toit", description: "Start the celebration with great food and craft beer at Indiranagar's famous brewpub.", image: "https://placehold.co/600x400/f77f00/502b00?text=Toit" },
    { time: "3:30 PM", activity: "Bowling at PLaY Arena", description: "Get competitive with a few rounds of bowling and other arcade games.", image: "https://placehold.co/600x400/fca311/8338ec?text=PLaY+Arena" },
    { time: "6:00 PM", activity: "Cake & Snacks at Church Street", description: "Cut the cake at a lively cafe on Church Street and enjoy the bustling vibe.", image: "https://placehold.co/600x400/f9c74f/d62828?text=Church+Street" }
  ]},
  { type: "birthday", budget: "3000+", plan: [
    { time: "11:00 AM", activity: "Full Day at Wonderla", description: "Spend the entire day enjoying high-thrill rides, water slides, and fun shows.", image: "https://placehold.co/600x400/89c2d9/216869?text=Wonderla" },
    { time: "6:00 PM", activity: "Relax at Wonderla Resort", description: "Check into the resort, relax by the pool after a tiring day.", image: "https://placehold.co/600x400/00b4d8/0077b6?text=Wonderla+Resort" },
    { time: "8:00 PM", activity: "Celebratory Dinner at Resort", description: "Enjoy a special birthday dinner at the resort's restaurant.", image: "https://placehold.co/600x400/ade8f4/023e8a?text=Resort+Dining" }
  ]},
  { type: "group", budget: "500-1500", plan: [
    { time: "2:00 PM", activity: "Go Karting at Torq03", description: "Challenge your friends to an adrenaline-pumping go-karting race.", image: "https://placehold.co/600x400/e56b6f/463f3a?text=Go+Karting" },
    { time: "4:30 PM", activity: "Snacks at VV Puram Food Street", description: "Explore the legendary food street and try a variety of local delicacies.", image: "https://placehold.co/600x400/ffbf69/c66c00?text=VV+Puram" },
    { time: "7:00 PM", activity: "Movie at a Multiplex", description: "End the day by catching the latest blockbuster at a nearby mall.", image: "https://placehold.co/600x400/4a4e69/22223b?text=Cinema" }
  ]},
  { type: "adventurous", budget: "500-1500", plan: [
    { time: "6:00 AM", activity: "Drive to Ramanagara", description: "Start early for the 50km drive to the 'Sholay' hills.", image: "https://placehold.co/600x400/f9b7b7/8f3333?text=Ramanagara" },
    { time: "8:00 AM", activity: "Breakfast at a local place", description: "Have a hot breakfast at a local tiffin room in Ramanagara town.", image: "https://placehold.co/600x400/fcefb4/a5a58d?text=Idli+Dosa" },
    { time: "9:00 AM", activity: "Trekking & Rappelling", description: "Spend 4-5 hours trekking the monolithic hills and trying beginner's rappelling.", image: "https://placehold.co/600x400/d4a373/6f4518?text=Trekking" }
  ]},
  { type: "adventurous", budget: "1500-3000", plan: [
    { time: "10:00 AM", activity: "Day Out at Guhantara Resort", description: "Head to the underground cave resort for a day full of activities.", image: "https://placehold.co/600x400/a0937d/3c2f2f?text=Guhantara" },
    { time: "12:00 PM", activity: "Adventure Activities", description: "Engage in ziplining, quad biking, and explore the cave system.", image: "https://placehold.co/600x400/b09a85/584236?text=Zipline" },
    { time: "4:00 PM", activity: "Rain Dance & Pool", description: "Relax and have fun with the rain dance setup followed by a dip in the pool.", image: "https://placehold.co/600x400/80ed99/22577a?text=Rain+Dance" }
  ]},
  { type: "relaxing", budget: "0-500", plan: [
    { time: "11:00 AM", activity: "Picnic at Sankey Tank", description: "Pack a lunch and enjoy a peaceful picnic by the beautiful Sankey Tank lake.", image: "https://placehold.co/600x400/a9d6e5/013a63?text=Sankey+Tank" },
    { time: "2:00 PM", activity: "Visit ISKCON Temple", description: "Experience the serene and spiritual atmosphere at the grand ISKCON temple.", image: "https://placehold.co/600x400/ff9900/804d00?text=ISKCON" },
    { time: "4:30 PM", activity: "Filter Coffee at a local cafe", description: "End your day with an authentic cup of filter coffee at a local Malleshwaram cafe.", image: "https://placehold.co/600x400/c9ada7/6a453b?text=Filter+Coffee" }
  ]},
  { type: "relaxing", budget: "3000+", plan: [
    { time: "11:00 AM", activity: "Vineyard Tour & Tasting", description: "Take a trip to a nearby vineyard like Grover Zampa for a guided tour.", image: "https://placehold.co/600x400/a5a58d/588157?text=Vineyard" },
    { time: "1:00 PM", activity: "Wine Tasting Session", description: "Participate in a professional wine tasting session, sampling 5-6 different wines.", image: "https://placehold.co/600x400/f7d59c/7f5539?text=Wine+Tasting" },
    { time: "2:30 PM", activity: "Lunch at the Vineyard", description: "Enjoy a relaxed, gourmet lunch at the restaurant overlooking the beautiful vineyards.", image: "https://placehold.co/600x400/fdf0d5/c16709?text=Vineyard+Lunch" }
  ]},
  { type: "foodie", budget: "500-1500", plan: [
    { time: "10:00 AM", activity: "Breakfast at Vidyarthi Bhavan", description: "Start with a legendary Masala Dosa and coffee at this iconic Basavanagudi joint.", image: "https://placehold.co/600x400/fca311/8c5000?text=Vidyarthi+Bhavan" },
    { time: "1:00 PM", activity: "Traditional Lunch at MTR", description: "Experience an authentic, multi-course Karnataka meal at Mavalli Tiffin Rooms.", image: "https://placehold.co/600x400/e0e1dd/495057?text=MTR+Thali" },
    { time: "5:00 PM", activity: "Snacks at VV Puram Food Street", description: "Explore the bustling 'Thindi Beedhi' for endless varieties of chaats, sweets, and snacks.", image: "https://placehold.co/600x400/ffbf69/c66c00?text=VV+Puram" },
    { time: "8:00 PM", activity: "Dinner at Church Street Social", description: "Chill with unique cocktails and modern bar food in a lively atmosphere.", image: "https://placehold.co/600x400/5a189a/e0b1cb?text=Social" }
  ]},
  { type: "cultural", budget: "500-1500", plan: [
    { time: "10:00 AM", activity: "Tipu Sultan's Summer Palace", description: "Step back in time at this beautiful Indo-Islamic palace.", image: "https://placehold.co/600x400/d68c45/432818?text=Tipu+Sultan+Palace" },
    { time: "12:00 PM", activity: "Explore Bangalore Fort", description: "Visit the nearby fort ruins and understand the origins of the city.", image: "https://placehold.co/600x400/c19a6b/5a402a?text=Bangalore+Fort" },
    { time: "2:00 PM", activity: "Lunch at a local eatery", description: "Have a simple, authentic meal in the old city area.", image: "https://placehold.co/600x400/fcefb4/a5a58d?text=Local+Meal" },
    { time: "4:00 PM", activity: "Visvesvaraya Museum", description: "Engage with interactive science exhibits and learn about technological history.", image: "https://placehold.co/600x400/b7b7a4/5b5b5b?text=Museum" }
  ]},
  { type: "group", budget: "0-500", plan: [
      { time: "3:00 PM", activity: "Explore Commercial Street", description: "Go window shopping and street shopping with your group.", image: "https://placehold.co/600x400/f07167/8f2d28?text=Commercial+St" },
      { time: "6:00 PM", activity: "Snacks at Church Street", description: "Grab affordable bites from various cafes and street vendors.", image: "https://placehold.co/600x400/f9c74f/d62828?text=Church+Street" },
      { time: "8:00 PM", activity: "Chill at Cubbon Park", description: "End the day with a relaxing chat and stroll in the park (check closing times).", image: "https://placehold.co/600x400/b7f9c8/338f5b?text=Cubbon+Park" }
  ]},
  { type: "adventurous", budget: "3000+", plan: [
    { time: "10:00 AM", activity: "Microlight Flying at Jakkur", description: "Take a thrilling 20-minute flight over the city in a 2-seater aircraft.", image: "https://placehold.co/600x400/8eecf5/096b72?text=Microlight+Flying" },
    { time: "1:00 PM", activity: "Lunch at a nice restaurant", description: "Celebrate your adventure with a good lunch nearby.", image: "https://placehold.co/600x400/fdf0d5/c16709?text=Celebration+Lunch" },
    { time: "4:00 PM", activity: "Indoor Skydiving (Fun City)", description: "Experience the thrill of skydiving in a safe, indoor wind tunnel.", image: "https://placehold.co/600x400/f5a623/b06c00?text=Indoor+Skydiving" }
  ]},
  { type: "romantic", budget: "0-500", plan: [
    { time: "4:30 PM", activity: "Boating at Ulsoor Lake", description: "Enjoy a peaceful boat ride as the sun begins to set.", image: "https://placehold.co/600x400/c7dfff/1e6091?text=Ulsoor+Lake" },
    { time: "6:30 PM", activity: "Walk & Street Food", description: "Walk around the lake and grab some chaat or corn from nearby stalls.", image: "https://placehold.co/600x400/ffbf69/c66c00?text=Street+Food" },
    { time: "8:00 PM", activity: "Visit a local temple", description: "Experience the calm and beautiful architecture of a nearby temple like Halasuru Someshwara Temple.", image: "https://placehold.co/600x400/e6b8a2/8a4a2a?text=Temple" }
  ]},
  { type: "default", budget: "default", plan: [
    { time: "10:00 AM", activity: "Start at Cubbon Park", description: "Begin your day with a relaxing walk in the park.", image: "https://placehold.co/600x400/b7f9c8/338f5b?text=Cubbon+Park" },
    { time: "1:00 PM", activity: "Lunch at MTR", description: "Enjoy authentic local cuisine at an affordable price.", image: "https://placehold.co/600x400/e0e1dd/495057?text=MTR+Thali" },
    { time: "4:00 PM", activity: "Visit Bangalore Palace", description: "Explore local culture and history.", image: "https://placehold.co/600x400/d6ccc2/4c3228?text=Bangalore+Palace" }
  ]},
  { type: "books", budget: "500-1500", plan: [
    { time: "11:00 AM", activity: "Blossoms Book House", description: "Get lost for hours in one of India's largest second-hand book stores on Church Street.", image: "https://placehold.co/600x400/d5bdaf/5b483a?text=Blossoms" },
    { time: "2:00 PM", activity: "Lunch at Matteo Coffea", description: "Grab a delicious coffee and a quick bite at this popular cafe nearby.", image: "https://placehold.co/600x400/e3d5ca/7a5c4d?text=Matteo+Coffea" },
    { time: "4:00 PM", activity: "Read at Champaca Bookstore", description: "Find a quiet corner, order tea, and start reading your new books at this beautiful cafe-bookstore.", image: "https://placehold.co/600x400/e0caca/704241?text=Champaca" }
  ]},
  { type: "group", budget: "1500-3000", plan: [
    { time: "3:00 PM", activity: "Start at Toit, Indiranagar", description: "Begin your brewery tour at one of Bangalore's most iconic brewpubs.", image: "https://placehold.co/600x400/f77f00/502b00?text=Toit" },
    { time: "5:30 PM", activity: "Move to Arbor Brewing", description: "Walk down the road to ABC for another round and some great appetizers.", image: "https://placehold.co/600x400/2d6a4f/d8f3dc?text=Arbor+Brewing" },
    { time: "8:00 PM", activity: "Dinner at Big Brewsky", description: "End the night at this massive brewery with a stunning ambiance and a wide food menu.", image: "https://placehold.co/600x400/495057/dee2e6?text=Big+Brewsky" }
  ]},
  { type: "adventurous", budget: "0-500", plan: [
    { time: "4:00 AM", activity: "Drive to Nandi Hills", description: "Start very early to catch the sunrise. It's a 1.5-hour drive.", image: "https://placehold.co/600x400/011f4b/6497b1?text=Early+Drive" },
    { time: "6:00 AM", activity: "Watch Sunrise", description: "Witness the breathtaking sunrise above a sea of clouds from the viewpoint.", image: "https://placehold.co/600x400/ffcb77/e68600?text=Nandi+Sunrise" },
    { time: "7:30 AM", activity: "Explore & Breakfast", description: "Explore Tipu's Drop and the temple, then grab breakfast at a local stall.", image: "https://placehold.co/600x400/a5a58d/fcefb4?text=Nandi+Breakfast" }
  ]},
  { type: "adventurous", budget: "500-1500", plan: [
    { time: "11:00 PM", activity: "Meetup & Travel", description: "Meet your trek group (book with a guide) and travel to the Skandagiri base.", image: "https://placehold.co/600x400/001219/e9d8a6?text=Night+Travel" },
    { time: "2:00 AM", activity: "Start Night Trek", description: "Begin the 8km trek under the stars with flashlights.", image: "https://placehold.co/600x400/003049/669bbc?text=Night+Trek" },
    { time: "5:30 AM", activity: "Sunrise & Bonfire", description: "Reach the peak, enjoy a small bonfire, and watch the spectacular sunrise.", image: "https://placehold.co/600x400/f77f00/d62828?text=Skandagiri+Sunrise" }
  ]},
];


const seedDB = async () => {
  try {
    // Clear existing data
    await Place.deleteMany({}); 
    await Itinerary.deleteMany({});
    console.log(" Cleared existing data");
    
    // Insert new data
    await Place.insertMany(placesData);
    await Itinerary.insertMany(itinerariesData);
    console.log(" Database seeded successfully with Places and Itineraries!");
  } catch (error) {
    console.error(" Error seeding database:", error);
  } finally {
    mongoose.connection.close();
    console.log(" Connection closed");
  }
};

seedDB();