import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

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

const mockItineraries = [
  { type: "romantic", budget: "500-1500", plan: [{ time: "4:00 PM", activity: "Stroll at Lalbagh", description: "Start with a romantic walk.", image: "/images/lalbagh.jpg" }, { time: "6:30 PM", activity: "Coffee at Dyu Art Cafe", description: "Cozy coffee.", image: "/images/dyu-art-cafe.avif" }, { time: "8:30 PM", activity: "Dinner at Truffles", description: "Lively dinner.", image: "/images/truffles.avif" }]},
  { type: "romantic", budget: "1500-3000", plan: [{ time: "5:00 PM", activity: "Bangalore Palace", description: "Royal tour.", image: "/images/bangalore-palace.jpg" }, { time: "7:30 PM", activity: "High Ultra Lounge", description: "Sunset drinks.", image: "/images/high-ultra.jpeg" }, { time: "9:00 PM", activity: "Olive Beach", description: "Fine dining.", image: "/images/olive-beach.jpg" }]},
  { type: "birthday", budget: "500-1500", plan: [{ time: "1:00 PM", activity: "Lunch at Toit", description: "Craft beer.", image: "/images/toit.jpeg" }, { time: "3:30 PM", activity: "Bowling at PLaY Arena", description: "Arcade games.", image: "/images/play-arena.jpg" }, { time: "6:00 PM", activity: "Church Street", description: "Cake and vibes.", image: "/images/church-street.jpg" }]},
  { type: "birthday", budget: "3000+", plan: [{ time: "11:00 AM", activity: "Wonderla", description: "Full day fun.", image: "/images/Wonderla.jpg" }, { time: "6:00 PM", activity: "Resort Stay", description: "Relax by pool.", image: "/images/Wonderla.jpg" }, { time: "8:00 PM", activity: "Gala Dinner", description: "Celebration.", image: "/images/olive-beach.jpg" }]},
  { type: "group", budget: "500-1500", plan: [{ time: "2:00 PM", activity: "Go Karting", description: "Race your friends.", image: "/images/go-karting.jpg" }, { time: "4:30 PM", activity: "VV Puram", description: "Street food.", image: "/images/vv-puram.jpg" }, { time: "7:00 PM", activity: "Movie", description: "Catch a blockbuster.", image: "/images/high-ultra.jpeg" }]},
  { type: "adventurous", budget: "500-1500", plan: [{ time: "6:00 AM", activity: "Ramanagara Drive", description: "Sholay hills.", image: "/images/ramanagara.jpg" }, { time: "9:00 AM", activity: "Trekking", description: "Rock climbing.", image: "/images/ramanagara.jpg" }]},
  { type: "adventurous", budget: "1500-3000", plan: [{ time: "10:00 AM", activity: "Guhantara Resort", description: "Cave resort.", image: "/images/guhantara.jpg" }, { time: "2:00 PM", activity: "Ziplining", description: "Adventure sports.", image: "/images/play-arena.jpg" }]},
  { type: "relaxing", budget: "0-500", plan: [{ time: "11:00 AM", activity: "Sankey Tank", description: "Picnic.", image: "/images/sankey-tank.jpg" }, { time: "2:00 PM", activity: "ISKCON Temple", description: "Spiritual visit.", image: "/images/iskcon.jpg" }, { time: "4:30 PM", activity: "Filter Coffee", description: "Local cafe.", image: "/images/dyu-art-cafe.avif" }]},
  { type: "foodie", budget: "500-1500", plan: [{ time: "10:00 AM", activity: "Vidyarthi Bhavan", description: "Masala Dosa.", image: "/images/vidyarthi-bhavan.jpg" }, { time: "1:00 PM", activity: "MTR", description: "Thali.", image: "/images/mtr.jpg" }, { time: "5:00 PM", activity: "VV Puram", description: "Street food.", image: "/images/vv-puram.jpg" }]},
  { type: "cultural", budget: "500-1500", plan: [{ time: "10:00 AM", activity: "Tipu Sultan Palace", description: "History.", image: "/images/tipu-palace.jpg" }, { time: "12:00 PM", activity: "Bangalore Fort", description: "Ruins.", image: "/images/tipu-palace.jpg" }, { time: "4:00 PM", activity: "Museum", description: "Science & History.", image: "/images/visvesvaraya.jpg" }]},
  { type: "group", budget: "0-500", plan: [{ time: "3:00 PM", activity: "Commercial Street", description: "Shopping.", image: "/images/church-street.jpg" }, { time: "6:00 PM", activity: "Street Food", description: "Local snacks.", image: "/images/vv-puram.jpg" }]},
  { type: "adventurous", budget: "3000+", plan: [{ time: "10:00 AM", activity: "Microlight Flying", description: "Jakkur.", image: "/images/microlight.jpg" }, { time: "4:00 PM", activity: "Indoor Skydiving", description: "Zero gravity.", image: "/images/skyjumper.avif" }]},
  { type: "romantic", budget: "0-500", plan: [{ time: "4:30 PM", activity: "Ulsoor Lake", description: "Boating.", image: "/images/ulsoor-lake.jpg" }, { time: "8:00 PM", activity: "Temple Visit", description: "Peaceful evening.", image: "/images/iskcon.jpg" }]},
  { type: "books", budget: "500-1500", plan: [{ time: "11:00 AM", activity: "Blossoms", description: "Used books.", image: "/images/blossoms.jpg" }, { time: "2:00 PM", activity: "Matteo Coffee", description: "Read and chill.", image: "/images/dyu-art-cafe.avif" }, { time: "4:00 PM", activity: "Champaca", description: "Bookstore cafe.", image: "/images/champaca.jpg" }]},
  { type: "default", budget: "default", plan: [{ time: "10:00 AM", activity: "Cubbon Park", description: "Morning walk.", image: "/images/cubbon-park.jpg" }, { time: "1:00 PM", activity: "MTR", description: "Lunch.", image: "/images/mtr.jpg" }]}
];

const getItinerary = (tripType: string, budget: string, allItineraries: any[]) => {
  let plan = allItineraries.find(item => item.type === tripType && item.budget === budget);
  if (!plan) plan = allItineraries.find(item => item.type === tripType);
  if (!plan) plan = allItineraries.find(item => item.type === "default");
  return plan?.plan || [];
};

const PlanDay = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripType, setTripType] = useState("romantic");
  const [budget, setBudget] = useState("500-1500");
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [allItineraries, setAllItineraries] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/itineraries')
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => { setAllItineraries(data); })
      .catch(err => { setAllItineraries(mockItineraries); toast({ title: "Offline Mode", description: "Using offline data.", variant: "default" }); });
  }, []);
  
  const saveToHistory = () => {
    const typeLabel = tripTypes.find(t => t.value === tripType)?.label || "Day Trip";
    const budgetLabel = budgetRanges.find(b => b.value === budget)?.label || budget;
    const newHistoryItem = { id: Date.now(), title: `${typeLabel} Plan`, details: `Budget: ${budgetLabel}`, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), type: 'plan' };
    const existingHistory = JSON.parse(localStorage.getItem("userHistory") || "[]");
    localStorage.setItem("userHistory", JSON.stringify([newHistoryItem, ...existingHistory]));
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      const plan = getItinerary(tripType, budget, allItineraries); 
      setItinerary(plan);
      saveToHistory();
      setCurrentStep(3);
    }
  };
  
  const handleBack = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
  const handleReset = () => { setCurrentStep(1); setTripType("romantic"); setBudget("500-1500"); setItinerary([]); };
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center md:text-left">
              <Link to="/home" className="text-primary hover:underline flex items-center mb-2 justify-center md:justify-start font-semibold">
                <ArrowRight className="mr-1 rotate-180" size={16} /> Back to Home
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold font-brand text-stone-800">Plan Your Perfect Day</h1>
              <p className="text-orange-500 mt-1 text-lg font-medium">Let us create a perfect itinerary for your special day</p>
            </div>
            
            <div className="w-full bg-stone-200 h-2 rounded-full mb-8 overflow-hidden">
              <div className="h-full bg-primary transition-all duration-500 ease-out rounded-full" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
            </div>
            
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold font-brand text-stone-700 mb-4 text-center">What's the plan?</h2>
                <p className="text-stone-500 mb-6 text-center">Select the type of day you're planning</p>
                <RadioGroup value={tripType} onValueChange={setTripType} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tripTypes.map((item) => (
                    <div key={item.value} className="flex items-center">
                      <Label htmlFor={`trip-${item.value}`} className={`w-full p-5 rounded-2xl border-2 text-left cursor-pointer transition-all duration-200 relative group ${tripType === item.value ? "bg-primary border-primary text-white shadow-lg scale-[1.02]" : "bg-white border-stone-200 text-stone-600 hover:border-primary/40 hover:bg-primary/5"}`}>
                        <RadioGroupItem id={`trip-${item.value}`} value={item.value} className="sr-only" />
                        <span className="font-bold text-lg">{item.label}</span>
                        {tripType === item.value && <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-1 rounded-full"><Check className="w-5 h-5 text-white" /></div>}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold font-brand text-stone-700 mb-4 text-center">What's your budget?</h2>
                <p className="text-stone-500 mb-6 text-center">Select a budget range for your day</p>
                <RadioGroup value={budget} onValueChange={setBudget} className="space-y-3">
                  {budgetRanges.map((range) => (
                    <div key={range.value} className="flex items-center">
                      <Label htmlFor={`budget-${range.value}`} className={`w-full p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all duration-200 ${budget === range.value ? "bg-primary border-primary text-white shadow-lg scale-[1.02]" : "bg-white border-stone-200 text-stone-600 hover:border-primary/40 hover:bg-primary/5"}`}>
                        <span className="ml-2 text-lg font-bold">{range.label}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${budget === range.value ? "border-white" : "border-stone-300"}`}>{budget === range.value && <div className="w-3 h-3 bg-white rounded-full" />}</div>
                        <RadioGroupItem id={`budget-${range.value}`} value={range.value} className="sr-only" />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                  <div><h2 className="text-3xl font-bold font-brand text-stone-800 mb-1 text-center sm:text-left">Your Day Plan</h2><p className="text-stone-500 text-center sm:text-left font-medium">A perfect {tripTypes.find(t => t.value === tripType)?.label} with a budget of {budgetRanges.find(b => b.value === budget)?.label}</p></div>
                  <Button variant="outline" onClick={handleReset} className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-6 font-bold">Plan Another Day</Button>
                </div>
                <div className="space-y-6">
                  {itinerary.map((item, index) => (
                    <Card key={index} className="border border-stone-200 shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="h-48 md:h-auto md:w-1/3 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} onError={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundImage = `url(https://placehold.co/600x400/f9d8b7/8f5b33?text=${item.activity.replace(/ /g, '+')})` }}></div>
                        <CardContent className="p-6 md:w-2/3">
                          <div className="flex items-center mb-3"><div className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full mr-3 text-sm">{item.time}</div><h3 className="font-bold font-brand text-stone-800 text-2xl">{item.activity}</h3></div>
                          <p className="text-stone-600 text-base leading-relaxed mb-4">{item.description}</p>
                          <div className="flex justify-end"><a href={`https://www.google.com/search?q=${encodeURIComponent(item.activity + " Bangalore")}`} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/5 rounded-full">View Details</Button></a></div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                  <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center"><h4 className="text-blue-900 font-bold font-brand text-xl mb-2">Need More Suggestions?</h4><p className="text-blue-700 text-sm mb-4">This is just a sample itinerary. Sign up to save your plans!</p><Link to="/register"><Button className="bg-primary hover:bg-primary/90 rounded-full px-8 font-bold">Sign Up for Free</Button></Link></div>
                </div>
              </div>
            )}
            
            {currentStep < 3 && (
              <div className="flex justify-between mt-10">
                <Button onClick={handleBack} variant="outline" disabled={currentStep === 1} className="border-stone-300 bg-white rounded-full px-8 py-6 text-base font-bold text-stone-500 hover:text-stone-800">Back</Button>
                <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 rounded-full px-10 py-6 text-lg font-bold shadow-lg shadow-primary/20">{currentStep < 2 ? "Next" : "Create Plan!"}</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-stone-900 text-white py-6 mt-auto"><div className="container mx-auto px-4 text-center text-sm text-stone-400"><p>© 2025 ByWays. Your personalized local guide for Bengaluru</p></div></footer>
    </div>
  );
};

export default PlanDay;