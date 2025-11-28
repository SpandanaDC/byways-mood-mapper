import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

// --- OPTIONS ---
const tripTypes = [
  { value: "romantic", label: "Romantic Date" },
  { value: "birthday", label: "Birthday Bash" },
  { value: "group", label: "Group Fun" },
  { value: "adventurous", label: "Adventurous" },
  { value: "relaxing", label: "Relaxing Escape" },
  { value: "foodie", label: "Foodie Tour" },
  { value: "cultural", label: "Cultural/Historical" },
  { value: "books", label: "Bookworm Trail" },
];

const budgetRanges = [
  { value: "0-500", label: "₹0 - ₹500 (Thrifty)" },
  { value: "500-1500", label: "₹500 - ₹1500 (Standard)" },
  { value: "1500-3000", label: "₹1500 - ₹3000 (Premium)" },
  { value: "3000+", label: "₹3000+ (Splurge)" }
];

// --- MOCK DATA FALLBACK (Your extensive list) ---
const mockItineraries = [
  // 1. Romantic - Standard Budget
  { type: "romantic", budget: "500-1500", plan: [
    { time: "4:00 PM", activity: "Stroll at Lalbagh", description: "Start with a romantic walk through the serene Lalbagh Botanical Garden.", image: "https://placehold.co/600x400/a8d8b9/3a5a40?text=Lalbagh" },
    { time: "6:30 PM", activity: "Coffee at Dyu Art Cafe", description: "Head to Koramangala for a cozy coffee and art session in a beautiful setting.", image: "https://placehold.co/600x400/f9d8b7/8f5b33?text=Dyu+Art+Cafe" },
    { time: "8:30 PM", activity: "Dinner at Truffles", description: "Enjoy a lively dinner with famous burgers and dishes at Truffles nearby.", image: "https://placehold.co/600x400/f29492/691e1a?text=Truffles" }
  ]},
  // 2. Romantic - Premium Budget
  { type: "romantic", budget: "1500-3000", plan: [
    { time: "5:00 PM", activity: "Explore Bangalore Palace", description: "Begin your evening with a royal tour of the historic Bangalore Palace.", image: "https://placehold.co/600x400/d6ccc2/4c3228?text=Bangalore+Palace" },
    { time: "7:30 PM", activity: "Rooftop Drinks at High Ultra Lounge", description: "Witness a stunning sunset and city views from one of South India's highest lounges.", image: "https://placehold.co/600x400/1d3557/f1faee?text=High+Ultra" },
    { time: "9:00 PM", activity: "Fine Dining at Olive Beach", description: "Conclude your date with an exquisite Mediterranean dinner in a beautiful, candlelit ambiance.", image: "https://placehold.co/600x400/f1faee/1d3557?text=Olive+Beach" }
  ]},
  // 3. Birthday - Standard Budget
  { type: "birthday", budget: "500-1500", plan: [
    { time: "1:00 PM", activity: "Group Lunch at Toit", description: "Start the celebration with great food and craft beer at Indiranagar's famous brewpub.", image: "https://placehold.co/600x400/f77f00/502b00?text=Toit" },
    { time: "3:30 PM", activity: "Bowling at PLaY Arena", description: "Get competitive with a few rounds of bowling and other arcade games.", image: "https://placehold.co/600x400/fca311/8338ec?text=PLaY+Arena" },
    { time: "6:00 PM", activity: "Cake & Snacks at Church Street", description: "Cut the cake at a lively cafe on Church Street and enjoy the bustling vibe.", image: "https://placehold.co/600x400/f9c74f/d62828?text=Church+Street" }
  ]},
  // 4. Birthday - Splurge
  { type: "birthday", budget: "3000+", plan: [
    { time: "11:00 AM", activity: "Full Day at Wonderla", description: "Spend the entire day enjoying high-thrill rides, water slides, and fun shows.", image: "https://placehold.co/600x400/89c2d9/216869?text=Wonderla" },
    { time: "6:00 PM", activity: "Relax at Wonderla Resort", description: "Check into the resort, relax by the pool after a tiring day.", image: "https://placehold.co/600x400/00b4d8/0077b6?text=Wonderla+Resort" },
    { time: "8:00 PM", activity: "Celebratory Dinner at Resort", description: "Enjoy a special birthday dinner at the resort's restaurant.", image: "https://placehold.co/600x400/ade8f4/023e8a?text=Resort+Dining" }
  ]},
  // 5. Group Fun - Standard Budget
  { type: "group", budget: "500-1500", plan: [
    { time: "2:00 PM", activity: "Go Karting at Torq03", description: "Challenge your friends to an adrenaline-pumping go-karting race.", image: "https://placehold.co/600x400/e56b6f/463f3a?text=Go+Karting" },
    { time: "4:30 PM", activity: "Snacks at VV Puram Food Street", description: "Explore the legendary food street and try a variety of local delicacies.", image: "https://placehold.co/600x400/ffbf69/c66c00?text=VV+Puram" },
    { time: "7:00 PM", activity: "Movie at a Multiplex", description: "End the day by catching the latest blockbuster at a nearby mall.", image: "https://placehold.co/600x400/4a4e69/22223b?text=Cinema" }
  ]},
  // 6. Adventurous - Standard Budget
  { type: "adventurous", budget: "500-1500", plan: [
    { time: "6:00 AM", activity: "Drive to Ramanagara", description: "Start early for the 50km drive to the 'Sholay' hills.", image: "https://placehold.co/600x400/f9b7b7/8f3333?text=Ramanagara" },
    { time: "8:00 AM", activity: "Breakfast at a local place", description: "Have a hot breakfast at a local tiffin room in Ramanagara town.", image: "https://placehold.co/600x400/fcefb4/a5a58d?text=Idli+Dosa" },
    { time: "9:00 AM", activity: "Trekking & Rappelling", description: "Spend 4-5 hours trekking the monolithic hills and trying beginner's rappelling.", image: "https://placehold.co/600x400/d4a373/6f4518?text=Trekking" }
  ]},
  // 7. Adventurous - Premium
  { type: "adventurous", budget: "1500-3000", plan: [
    { time: "10:00 AM", activity: "Day Out at Guhantara Resort", description: "Head to the underground cave resort for a day full of activities.", image: "https://placehold.co/600x400/a0937d/3c2f2f?text=Guhantara" },
    { time: "12:00 PM", activity: "Adventure Activities", description: "Engage in ziplining, quad biking, and explore the cave system.", image: "https://placehold.co/600x400/b09a85/584236?text=Zipline" },
    { time: "4:00 PM", activity: "Rain Dance & Pool", description: "Relax and have fun with the rain dance setup followed by a dip in the pool.", image: "https://placehold.co/600x400/80ed99/22577a?text=Rain+Dance" }
  ]},
  // 8. Relaxing - Thrifty
  { type: "relaxing", budget: "0-500", plan: [
    { time: "11:00 AM", activity: "Picnic at Sankey Tank", description: "Pack a lunch and enjoy a peaceful picnic by the beautiful Sankey Tank lake.", image: "https://placehold.co/600x400/a9d6e5/013a63?text=Sankey+Tank" },
    { time: "2:00 PM", activity: "Visit ISKCON Temple", description: "Experience the serene and spiritual atmosphere at the grand ISKCON temple.", image: "https://placehold.co/600x400/ff9900/804d00?text=ISKCON" },
    { time: "4:30 PM", activity: "Filter Coffee at a local cafe", description: "End your day with an authentic cup of filter coffee at a local Malleshwaram cafe.", image: "https://placehold.co/600x400/c9ada7/6a453b?text=Filter+Coffee" }
  ]},
  // 9. Relaxing - Premium
  { type: "relaxing", budget: "3000+", plan: [
    { time: "11:00 AM", activity: "Vineyard Tour & Tasting", description: "Take a trip to a nearby vineyard like Grover Zampa for a guided tour.", image: "https://placehold.co/600x400/a5a58d/588157?text=Vineyard" },
    { time: "1:00 PM", activity: "Wine Tasting Session", description: "Participate in a professional wine tasting session, sampling 5-6 different wines.", image: "https://placehold.co/600x400/f7d59c/7f5539?text=Wine+Tasting" },
    { time: "2:30 PM", activity: "Lunch at the Vineyard", description: "Enjoy a relaxed, gourmet lunch at the restaurant overlooking the beautiful vineyards.", image: "https://placehold.co/600x400/fdf0d5/c16709?text=Vineyard+Lunch" }
  ]},
  // 10. Foodie Tour - Standard
  { type: "foodie", budget: "500-1500", plan: [
    { time: "10:00 AM", activity: "Breakfast at Vidyarthi Bhavan", description: "Start with a legendary Masala Dosa and coffee at this iconic Basavanagudi joint.", image: "https://placehold.co/600x400/fca311/8c5000?text=Vidyarthi+Bhavan" },
    { time: "1:00 PM", activity: "Traditional Lunch at MTR", description: "Experience an authentic, multi-course Karnataka meal at Mavalli Tiffin Rooms.", image: "https://placehold.co/600x400/e0e1dd/495057?text=MTR+Thali" },
    { time: "5:00 PM", activity: "Snacks at VV Puram Food Street", description: "Explore the bustling 'Thindi Beedhi' for endless varieties of chaats, sweets, and snacks.", image: "https://placehold.co/600x400/ffbf69/c66c00?text=VV+Puram" },
    { time: "8:00 PM", activity: "Dinner at Church Street Social", description: "Chill with unique cocktails and modern bar food in a lively atmosphere.", image: "https://placehold.co/600x400/5a189a/e0b1cb?text=Social" }
  ]},
  // 11. Cultural/Historical - Standard
  { type: "cultural", budget: "500-1500", plan: [
    { time: "10:00 AM", activity: "Tipu Sultan", description: "Step back in time at this beautiful Indo-Islamic palace.", image: "https://placehold.co/600x400/d68c45/432818?text=Tipu+Sultan+Palace" },
    { time: "12:00 PM", activity: "Explore Bangalore Fort", description: "Visit the nearby fort ruins and understand the origins of the city.", image: "https://placehold.co/600x400/c19a6b/5a402a?text=Bangalore+Fort" },
    { time: "2:00 PM", activity: "Lunch at a local eatery", description: "Have a simple, authentic meal in the old city area.", image: "https://placehold.co/600x400/fcefb4/a5a58d?text=Local+Meal" },
    { time: "4:00 PM", activity: "Visvesvaraya Museum", description: "Engage with interactive science exhibits and learn about technological history.", image: "https://placehold.co/600x400/b7b7a4/5b5b5b?text=Museum" }
  ]},
  // 12. Group - Thrifty
  { type: "group", budget: "0-500", plan: [
      { time: "3:00 PM", activity: "Explore Commercial Street", description: "Go window shopping and street shopping with your group.", image: "https://placehold.co/600x400/f07167/8f2d28?text=Commercial+St" },
      { time: "6:00 PM", activity: "Snacks at Church Street", description: "Grab affordable bites from various cafes and street vendors.", image: "https://placehold.co/600x400/f9c74f/d62828?text=Church+Street" },
      { time: "8:00 PM", activity: "Chill at Cubbon Park", description: "End the day with a relaxing chat and stroll in the park (check closing times).", image: "https://placehold.co/600x400/b7f9c8/338f5b?text=Cubbon+Park" }
  ]},
  // 13. Adventurous - Splurge
  { type: "adventurous", budget: "3000+", plan: [
    { time: "10:00 AM", activity: "Microlight Flying at Jakkur", description: "Take a thrilling 20-minute flight over the city in a 2-seater aircraft.", image: "https://placehold.co/600x400/8eecf5/096b72?text=Microlight+Flying" },
    { time: "1:00 PM", activity: "Lunch at a nice restaurant", description: "Celebrate your adventure with a good lunch nearby.", image: "https://placehold.co/600x400/fdf0d5/c16709?text=Celebration+Lunch" },
    { time: "4:00 PM", activity: "Indoor Skydiving (Fun City)", description: "Experience the thrill of skydiving in a safe, indoor wind tunnel.", image: "https://placehold.co/600x400/f5a623/b06c00?text=Indoor+Skydiving" }
  ]},
  // 14. Romantic - Thrifty
  { type: "romantic", budget: "0-500", plan: [
    { time: "4:30 PM", activity: "Boating at Ulsoor Lake", description: "Enjoy a peaceful boat ride as the sun begins to set.", image: "https://placehold.co/600x400/c7dfff/1e6091?text=Ulsoor+Lake" },
    { time: "6:30 PM", activity: "Walk & Street Food", description: "Walk around the lake and grab some chaat or corn from nearby stalls.", image: "https://placehold.co/600x400/ffbf69/c66c00?text=Street+Food" },
    { time: "8:00 PM", activity: "Visit a local temple", description: "Experience the calm and beautiful architecture of a nearby temple like Halasuru Someshwara Temple.", image: "https://placehold.co/600x400/e6b8a2/8a4a2a?text=Temple" }
  ]},
  // 15. Default Fallback
  { type: "default", budget: "default", plan: [
    { time: "10:00 AM", activity: "Start at Cubbon Park", description: "Begin your day with a relaxing walk in the park.", image: "https://placehold.co/600x400/b7f9c8/338f5b?text=Cubbon+Park" },
    { time: "1:00 PM", activity: "Lunch at MTR", description: "Enjoy authentic local cuisine at an affordable price.", image: "https://placehold.co/600x400/e0e1dd/495057?text=MTR+Thali" },
    { time: "4:00 PM", activity: "Visit Bangalore Palace", description: "Explore local culture and history.", image: "https://placehold.co/600x400/d6ccc2/4c3228?text=Bangalore+Palace" }
  ]},
  // 16. Bookworm Trail - Standard
  { type: "books", budget: "500-1500", plan: [
    { time: "11:00 AM", activity: "Blossoms Book House", description: "Get lost for hours in one of India's largest second-hand book stores on Church Street.", image: "https://placehold.co/600x400/d5bdaf/5b483a?text=Blossoms" },
    { time: "2:00 PM", activity: "Lunch at Matteo Coffea", description: "Grab a delicious coffee and a quick bite at this popular cafe nearby.", image: "https://placehold.co/600x400/e3d5ca/7a5c4d?text=Matteo+Coffea" },
    { time: "4:00 PM", activity: "Read at Champaca Bookstore", description: "Find a quiet corner, order tea, and start reading your new books at this beautiful cafe-bookstore.", image: "https://placehold.co/600x400/e0caca/704241?text=Champaca" }
  ]},
  // 17. Brewery Hopping - Premium
  { type: "group", budget: "1500-3000", plan: [
    { time: "3:00 PM", activity: "Start at Toit, Indiranagar", description: "Begin your brewery tour at one of Bangalore's most iconic brewpubs.", image: "https://placehold.co/600x400/f77f00/502b00?text=Toit" },
    { time: "5:30 PM", activity: "Move to Arbor Brewing", description: "Walk down the road to ABC for another round and some great appetizers.", image: "https://placehold.co/600x400/2d6a4f/d8f3dc?text=Arbor+Brewing" },
    { time: "8:00 PM", activity: "Dinner at Big Brewsky", description: "End the night at this massive brewery with a stunning ambiance and a wide food menu.", image: "https://placehold.co/600x400/495057/dee2e6?text=Big+Brewsky" }
  ]},
  // 18. Nandi Hills Sunrise - Thrifty
  { type: "adventurous", budget: "0-500", plan: [
    { time: "4:00 AM", activity: "Drive to Nandi Hills", description: "Start very early to catch the sunrise. It's a 1.5-hour drive.", image: "https://placehold.co/600x400/011f4b/6497b1?text=Early+Drive" },
    { time: "6:00 AM", activity: "Watch Sunrise", description: "Witness the breathtaking sunrise above a sea of clouds from the viewpoint.", image: "https://placehold.co/600x400/ffcb77/e68600?text=Nandi+Sunrise" },
    { time: "7:30 AM", activity: "Explore & Breakfast", description: "Explore Tipu's Drop and the temple, then grab breakfast at a local stall.", image: "https://placehold.co/600x400/a5a58d/fcefb4?text=Nandi+Breakfast" }
  ]},
  // 19. Skandagiri Night Trek - Standard
  { type: "adventurous", budget: "500-1500", plan: [
    { time: "11:00 PM", activity: "Meetup & Travel", description: "Meet your trek group (book with a guide) and travel to the Skandagiri base.", image: "https://placehold.co/600x400/001219/e9d8a6?text=Night+Travel" },
    { time: "2:00 AM", activity: "Start Night Trek", description: "Begin the 8km trek under the stars with flashlights.", image: "https://placehold.co/600x400/003049/669bbc?text=Night+Trek" },
    { time: "5:30 AM", activity: "Sunrise & Bonfire", description: "Reach the peak, enjoy a small bonfire, and watch the spectacular sunrise.", image: "https://placehold.co/600x400/f77f00/d62828?text=Skandagiri+Sunrise" }
  ]},
];


// Sample itinerary data - UPDATED LOGIC
const getItinerary = (tripType: string, budget: string, allItineraries: any[]) => {
  // Find a matching plan
  let plan = allItineraries.find(item => item.type === tripType && item.budget === budget);

  // If no exact match, try matching just type
  if (!plan) {
    plan = allItineraries.find(item => item.type === tripType);
  }

  // If still no match, return default
  if (!plan) {
    plan = allItineraries.find(item => item.type === "default");
  }
  
  return plan?.plan || [];
};

const PlanDay = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripType, setTripType] = useState("romantic"); // Changed from occasion
  const [budget, setBudget] = useState("500-1500"); // Updated default
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [allItineraries, setAllItineraries] = useState<any[]>([]);
  const { toast } = useToast();

  // --- CONNECTED TO BACKEND WITH MOCK FALLBACK ---
  useEffect(() => {
    fetch('/api/itineraries')
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        console.log("Fetched itineraries from DB:", data);
        setAllItineraries(data);
      })
      .catch(err => {
        console.warn("DB Connection failed, using Mock Data:", err);
        setAllItineraries(mockItineraries); // <--- FALLBACK: Load mock data on error
        toast({
            title: "Offline Mode",
            description: "Using offline data as database is unreachable.",
            variant: "default"
        });
      });
  }, []);
  
  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate itinerary using the fetched (or mock) data
      const plan = getItinerary(tripType, budget, allItineraries); 
      setItinerary(plan);
      setCurrentStep(3);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleReset = () => {
    setCurrentStep(1);
    setTripType("romantic"); // Changed from occasion
    setBudget("500-1500"); // Updated default
    setItinerary([]);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream"> {/* Removed bg-brand-cream */}
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center md:text-left"> {/* Center text on mobile */}
              <Link to="/home" className="text-byways-primary hover:underline flex items-center mb-2 justify-center md:justify-start">
                <ArrowRight className="mr-1 rotate-180" size={16} /> Back to Home
              </Link>
              <h1 className="text-4xl md:text-5xl font-brand text-byways-dark">Plan Your Perfect Day</h1> {/* Apply brand font */}
              <p className="text-byways-accent mt-1 text-lg">
                Let us create a perfect itinerary for your special day
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="w-full bg-muted h-2 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-byways-primary transition-all duration-500 ease-out rounded-full"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
            
            {/* Step 1: Select occasion/trip type */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-brand text-stone-700 mb-4 text-center">What's the plan?</h2> {/* Apply brand font */}
                <p className="text-stone-500 mb-6 text-center">Select the type of day you're planning</p>
                
                <RadioGroup value={tripType} onValueChange={setTripType} className="grid grid-cols-1 sm:grid-cols-2 gap-3"> {/* Use new state */}
                  {tripTypes.map((item) => ( // Use new options
                    <div key={item.value} className="flex items-center">
                      <Label
                        htmlFor={`trip-${item.value}`}
                        className={`w-full p-4 rounded-2xl border text-left cursor-pointer transition-all filter-chip ${ // Use filter-chip class
                            tripType === item.value // Use new state
                              ? "chip-selected" // Use chip-selected class
                              : "border-stone-300 hover:border-byways-accent"
                          }`}
                      >
                        <RadioGroupItem 
                          id={`trip-${item.value}`}
                          value={item.value}
                          className="sr-only"
                        />
                        <span className="font-semibold">{item.label}</span> {/* Removed emoji, added font-semibold */}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Step 2: Budget */}
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-brand text-stone-700 mb-4 text-center">What's your budget?</h2> {/* Apply brand font */}
                <p className="text-stone-500 mb-6 text-center">Select a budget range for your day</p>
                
                <RadioGroup value={budget} onValueChange={setBudget} className="space-y-3">
                  {budgetRanges.map((range) => (
                    <div key={range.value} className="flex items-center">
                      <Label
                        htmlFor={`budget-${range.value}`}
                        className={`w-full p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all filter-chip ${ // Use filter-chip class
                            budget === range.value 
                              ? "chip-selected" // Use chip-selected class
                              : "border-stone-300 hover:border-byways-accent"
                          }`}
                      >
                        <span className="ml-2 text-base font-semibold">{range.label}</span> {/* Bolder font */}
                        <RadioGroupItem 
                          id={`budget-${range.value}`}
                          value={range.value}
                          className="h-5 w-5" // Make radio button larger
                        />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Step 3: Itinerary */}
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-3xl font-brand text-stone-700 mb-1 text-center sm:text-left">Your Day Plan</h2> {/* Apply brand font */}
                    <p className="text-stone-500 text-center sm:text-left">
                      A perfect {tripTypes.find(t => t.value === tripType)?.label} with a budget of {budgetRanges.find(b => b.value === budget)?.label}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="border-byways-primary text-byways-primary hover:bg-byways-primary hover:text-white rounded-lg" // Style update
                  >
                    Plan Another Day
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {itinerary.map((item, index) => (
                    <Card key={index} className="border-2 border-stone-200 shadow-lg overflow-hidden bg-white"> {/* Style update */}
                      <div className="flex flex-col md:flex-row">
                        <div 
                          className="h-40 md:h-auto md:w-1/3 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${item.image})` }}
                          onError={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundImage = `url(https://placehold.co/600x400/f9d8b7/8f5b33?text=${item.activity.replace(/ /g, '+')})` }}
                        ></div>
                        <CardContent className="p-5 md:w-2/3">
                          <div className="flex items-center mb-2">
                            <div className="bg-byways-primary text-white text-sm font-brand px-3 py-1 rounded-full mr-3 text-base"> {/* Apply brand font */}
                              {item.time}
                            </div>
                            <h3 className="font-brand text-byways-dark text-2xl"> {/* Apply brand font */}
                              {item.activity}
                            </h3>
                          </div>
                          <p className="text-stone-600 text-sm"> {/* Style update */}
                            {item.description}
                          </p>
                          <div className="mt-4 flex justify-end">
                            {/* Updated View Details to Google Search */}
                            <a href={`https://www.google.com/search?q=${encodeURIComponent(item.activity + " Bangalore")}`} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="text-byways-primary border-byways-primary rounded-lg">View Details</Button>
                            </a>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                  
                  <div className="mt-8 bg-white/70 p-5 rounded-2xl border-2 border-stone-200"> {/* Style update */}
                    <h4 className="text-byways-dark font-brand text-2xl mb-2">Need More Suggestions?</h4> {/* Apply brand font */}
                    <p className="text-stone-600 text-sm mb-4">
                      This is just a sample itinerary. For more personalized recommendations, log in or sign up to access our full features.
                    </p>
                    <Link to="/register">
                      <Button className="bg-byways-primary hover:bg-byways-dark rounded-lg"> {/* Style update */}
                        Sign Up for Free
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation buttons */}
            {currentStep < 3 && (
              <div className="flex justify-between mt-10">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  disabled={currentStep === 1}
                  className="border-stone-300 bg-white rounded-lg px-6 py-5 text-base font-semibold" // Style update
                >
                  Back
                </Button>
                <Button onClick={handleNext} className="btn-brand !w-auto px-8"> {/* Apply btn-brand style */}
                  {currentStep < 2 ? "Next" : "Create Plan!"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-byways-dark text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm">
          <p className="text-white/80">© 2025 ByWays. Your personalized local guide for Bengaluru</p>
        </div>
      </footer>
    </div>
  );
};

export default PlanDay;